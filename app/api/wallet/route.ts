import { NextResponse } from "next/server";

const RPC = "https://evmrpc.0g.ai";

async function rpc(method: string, params: any[]) {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method, params, id: 1 }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`RPC ${method} failed: ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result as string;
}

function hexToBig(hex: string): bigint {
  return BigInt(hex);
}

function formatOg(weiHex: string): string {
  const wei = hexToBig(weiHex);
  // Convert wei -> OG (18 decimals)
  const whole = wei / 10n ** 18n;
  const frac = wei % 10n ** 18n;
  const fracStr = frac.toString().padStart(18, "0").slice(0, 6).replace(/0+$/, "");
  return fracStr ? `${whole}.${fracStr}` : `${whole}`;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const address = url.searchParams.get("address");

  if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return NextResponse.json(
      { error: "Invalid EVM address" },
      { status: 400 },
    );
  }

  try {
    const [balanceHex, txCountHex, blockHex] = await Promise.all([
      rpc("eth_getBalance", [address, "latest"]),
      rpc("eth_getTransactionCount", [address, "latest"]),
      rpc("eth_blockNumber", []),
    ]);

    const balanceOg = formatOg(balanceHex);
    const txCount = Number(hexToBig(txCountHex));
    const blockNumber = Number(hexToBig(blockHex));

    return NextResponse.json(
      {
        ok: true,
        address,
        chain: "0G Mainnet",
        balance: balanceOg,
        symbol: "OG",
        txCount,
        blockNumber,
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
