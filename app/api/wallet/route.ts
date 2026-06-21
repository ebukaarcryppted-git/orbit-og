import { NextResponse } from "next/server";

const RPC = "https://evmrpc.0g.ai";
const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"; // ERC-20/721 Transfer
const LOG_WINDOW = 8_000; // last ~2.5h of mainnet history
const LOG_CHUNK = 2_000;

async function rpc<T = any>(method: string, params: any[] = []): Promise<T> {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${method} ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

function hex(v: string) { return BigInt(v); }
function num(v: string) { return Number(hex(v)); }

function formatOg(weiHex: string): string {
  const wei = hex(weiHex);
  const whole = wei / 10n ** 18n;
  const frac = wei % 10n ** 18n;
  const fracStr = frac.toString().padStart(18, "0").slice(0, 6).replace(/0+$/, "");
  return fracStr ? `${whole}.${fracStr}` : `${whole}`;
}

function pad32(addr: string) {
  return "0x" + addr.toLowerCase().replace(/^0x/, "").padStart(64, "0");
}

type TokenTransfer = {
  blockNumber: number;
  txHash: string;
  contract: string;
  direction: "in" | "out";
  counterparty: string;
  type: "ERC-20" | "ERC-721";
};

async function fetchTransfers(
  address: string,
  fromBlock: number,
  toBlock: number,
  direction: "in" | "out",
): Promise<TokenTransfer[]> {
  const topicIdx = direction === "in" ? 2 : 1; // topic1=from, topic2=to (in Transfer event)
  const topics: (string | null)[] = [TRANSFER_TOPIC, null, null];
  topics[topicIdx] = pad32(address);

  const out: TokenTransfer[] = [];
  // chunk to avoid RPC limits
  for (let start = fromBlock; start <= toBlock; start += LOG_CHUNK + 1) {
    const end = Math.min(start + LOG_CHUNK, toBlock);
    try {
      const logs: any[] = await rpc("eth_getLogs", [{
        fromBlock: "0x" + start.toString(16),
        toBlock: "0x" + end.toString(16),
        topics,
      }]);
      for (const log of logs) {
        const isErc721 = log.topics.length === 4; // ERC-721 has 4 indexed topics
        const counterparty = "0x" + (direction === "in" ? log.topics[1] : log.topics[2]).slice(-40);
        out.push({
          blockNumber: num(log.blockNumber),
          txHash: log.transactionHash,
          contract: log.address.toLowerCase(),
          direction,
          counterparty,
          type: isErc721 ? "ERC-721" : "ERC-20",
        });
      }
    } catch {
      // skip chunk on error (rate limit or range too wide)
    }
    if (out.length >= 50) break;
  }
  return out;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");

  if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return NextResponse.json({ error: "Invalid EVM address" }, { status: 400 });
  }
  const addr = address.toLowerCase();

  try {
    const [balanceHex, txCountHex, blockHex, code] = await Promise.all([
      rpc<string>("eth_getBalance", [addr, "latest"]),
      rpc<string>("eth_getTransactionCount", [addr, "latest"]),
      rpc<string>("eth_blockNumber"),
      rpc<string>("eth_getCode", [addr, "latest"]),
    ]);

    const blockNumber = num(blockHex);
    const txCount = Number(hex(txCountHex));
    const accountType = code && code !== "0x" ? "Contract" : "EOA";

    // Pull recent transfers in parallel (bounded window).
    const fromBlock = Math.max(0, blockNumber - LOG_WINDOW);
    const [inflow, outflow] = await Promise.all([
      fetchTransfers(addr, fromBlock, blockNumber, "in"),
      fetchTransfers(addr, fromBlock, blockNumber, "out"),
    ]);

    const transfers = [...inflow, ...outflow]
      .sort((a, b) => b.blockNumber - a.blockNumber)
      .slice(0, 30);

    // Aggregate token holdings = unique ERC-20 contracts that touched this wallet (best-effort)
    const erc20Set = new Set<string>();
    const nftSet = new Set<string>();
    for (const t of transfers) {
      if (t.type === "ERC-721") nftSet.add(t.contract);
      else erc20Set.add(t.contract);
    }

    return NextResponse.json(
      {
        ok: true,
        address: addr,
        chain: "0G Mainnet",
        chainId: 16661,
        accountType,
        balance: formatOg(balanceHex),
        symbol: "OG",
        txCount,
        blockNumber,
        windowBlocks: LOG_WINDOW,
        transfers,
        tokenContractsSeen: Array.from(erc20Set),
        nftContractsSeen: Array.from(nftSet),
        timestamp: Date.now(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "RPC error" },
      { status: 502 },
    );
  }
}
