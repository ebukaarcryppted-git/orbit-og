import { NextResponse } from "next/server";

const RPC = "https://evmrpc.0g.ai";
const SAMPLE_BLOCKS = 30;

async function rpc<T = string>(method: string, params: any[] = []): Promise<T> {
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

function gwei(weiHex: string) {
  const wei = hex(weiHex);
  // 9 decimals
  const g = Number(wei) / 1e9;
  if (g < 0.01) return g.toFixed(4);
  if (g < 1) return g.toFixed(3);
  return g.toFixed(2);
}

function compactNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toString();
}

export async function GET() {
  try {
    const [tipHex, gasPriceHex] = await Promise.all([
      rpc<string>("eth_blockNumber"),
      rpc<string>("eth_gasPrice"),
    ]);
    const tip = num(tipHex);
    const old = tip - SAMPLE_BLOCKS;

    const [latestBlock, oldBlock] = await Promise.all([
      rpc<any>("eth_getBlockByNumber", [tipHex, false]),
      rpc<any>("eth_getBlockByNumber", ["0x" + old.toString(16), false]),
    ]);

    const tipTs = num(latestBlock.timestamp);
    const oldTs = num(oldBlock.timestamp);
    const elapsedSec = Math.max(1, tipTs - oldTs);
    const blockTime = elapsedSec / SAMPLE_BLOCKS;
    const txCount = (latestBlock.transactions?.length as number) || 0;

    // Sample 3 random recent blocks for tx total estimate
    const sampleIdx = [tip - 1, tip - 5, tip - 15];
    const sampled = await Promise.all(
      sampleIdx.map(i =>
        rpc<any>("eth_getBlockByNumber", ["0x" + i.toString(16), false]).catch(() => null),
      ),
    );
    const txPerBlockAvg =
      sampled.filter(Boolean).reduce((a, b) => a + (b.transactions?.length || 0), 0) /
      Math.max(1, sampled.filter(Boolean).length);
    const tps = txPerBlockAvg / blockTime;

    const gasUsed = num(latestBlock.gasUsed);
    const gasLimit = num(latestBlock.gasLimit);
    const utilization = gasLimit > 0 ? (gasUsed / gasLimit) * 100 : 0;

    return NextResponse.json(
      {
        ok: true,
        chainId: 16661,
        network: "0G Mainnet",
        block: {
          number: tip,
          numberLabel: compactNumber(tip),
          age: Math.max(0, Math.floor(Date.now() / 1000 - tipTs)),
          txCount,
          gasUsed,
          gasLimit,
          utilization: Number(utilization.toFixed(2)),
          miner: latestBlock.miner,
          hash: latestBlock.hash,
          timestamp: tipTs,
        },
        gas: {
          price: gasPriceHex,
          priceGwei: gwei(gasPriceHex),
          baseFeeGwei: gwei(latestBlock.baseFeePerGas || "0x0"),
        },
        performance: {
          blockTime: Number(blockTime.toFixed(2)),
          tps: Number(tps.toFixed(1)),
          txPerBlock: Number(txPerBlockAvg.toFixed(1)),
          sampleSize: SAMPLE_BLOCKS,
        },
        readAt: Date.now(),
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
