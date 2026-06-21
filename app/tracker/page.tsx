"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";

type Tab = "network" | "wallet";

/* ===================== TYPES ===================== */
type NetworkData = {
  ok: true;
  chainId: number;
  network: string;
  block: {
    number: number;
    numberLabel: string;
    age: number;
    txCount: number;
    gasUsed: number;
    gasLimit: number;
    utilization: number;
    miner: string;
    hash: string;
    timestamp: number;
  };
  gas: { priceGwei: string; baseFeeGwei: string };
  performance: { blockTime: number; tps: number; txPerBlock: number; sampleSize: number };
  readAt: number;
};

type WalletData = {
  ok: true;
  address: string;
  chain: string;
  balance: string;
  symbol: string;
  txCount: number;
  blockNumber: number;
  timestamp: number;
};

const hubLinks = [
  { title: "Overview", sub: "Top-level mainnet KPIs", href: "https://hub.0g.ai/analytics/overview?network=mainnet" },
  { title: "Network", sub: "Blocks, TPS, validators", href: "https://hub.0g.ai/analytics/network?network=mainnet" },
  { title: "Gas", sub: "Transaction gas trends", href: "https://hub.0g.ai/analytics/transaction-gas?network=mainnet" },
  { title: "Revenue", sub: "Revenue & valuation", href: "https://hub.0g.ai/analytics/revenue-valuation?network=mainnet" },
];

/* ===================== HELPERS ===================== */
function shortAddr(a: string) {
  return `${a.slice(0, 6)}…${a.slice(-4)}`;
}
function fmtAge(s: number) {
  if (s < 1) return "just now";
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

/* ===================== NETWORK TAB ===================== */
function NetworkTab() {
  const [data, setData] = useState<NetworkData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const prevBlock = useRef<number | null>(null);

  async function fetchNet() {
    try {
      const r = await fetch("/api/network", { cache: "no-store" });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j.error || "RPC error");
      if (prevBlock.current && j.block.number !== prevBlock.current) {
        setPulseKey((k) => k + 1);
      }
      prevBlock.current = j.block.number;
      setData(j);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }

  useEffect(() => {
    fetchNet();
    const id = setInterval(fetchNet, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Mainnet hero */}
      <div className="px-5 mt-5 animate-scale-in">
        <div className="relative h-40 rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/og-ecosystem.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(13,8,24,0.58)" }} />
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                0G Mainnet · Chain {data ? data.chainId : "16661"}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5ee08a] animate-pulse-dot" />
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-white/80">100% uptime</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-white text-[26px] font-extrabold tracking-tightest leading-none">
                  Mainnet Live
                </div>
                <div className="text-white/70 text-[11px] font-medium mt-1.5">
                  Online since September 2025
                </div>
              </div>
              <div className="text-right" key={pulseKey}>
                <div className="text-white text-[26px] font-extrabold tracking-tightest leading-none animate-fade-in">
                  {data ? `#${data.block.numberLabel}` : "—"}
                </div>
                <div className="text-white/60 text-[10px] font-semibold mt-1">
                  {data ? `Block · ${fmtAge(data.block.age)}` : "Loading"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live network stats */}
      <div className="px-5 mt-3 grid grid-cols-2 gap-3 stagger">
        <div className="surface rounded-3xl p-4 animate-fade-up hover-lift">
          <div className="text-[26px] font-extrabold text-brand tracking-tightest leading-none">
            {data ? `${data.performance.blockTime}s` : "—"}
          </div>
          <div className="text-[12px] text-ink font-bold mt-2.5 leading-tight">Block Time</div>
          <div className="text-[10px] text-muted font-semibold mt-1">
            avg over last {data ? data.performance.sampleSize : 30} blocks
          </div>
        </div>
        <div className="surface rounded-3xl p-4 animate-fade-up hover-lift">
          <div className="text-[26px] font-extrabold text-brand tracking-tightest leading-none">
            {data ? `${data.gas.priceGwei}` : "—"}
            <span className="text-[14px] font-bold ml-1 text-muted">gwei</span>
          </div>
          <div className="text-[12px] text-ink font-bold mt-2.5 leading-tight">Gas Price</div>
          <div className="text-[10px] text-muted font-semibold mt-1">
            base {data ? data.gas.baseFeeGwei : "—"} gwei
          </div>
        </div>
        <div className="surface rounded-3xl p-4 animate-fade-up hover-lift">
          <div className="text-[26px] font-extrabold text-brand tracking-tightest leading-none">
            {data ? data.performance.tps : "—"}
          </div>
          <div className="text-[12px] text-ink font-bold mt-2.5 leading-tight">Live TPS</div>
          <div className="text-[10px] text-muted font-semibold mt-1">
            {data ? `${data.performance.txPerBlock} tx / block` : "Loading"}
          </div>
        </div>
        <div className="surface rounded-3xl p-4 animate-fade-up hover-lift">
          <div className="text-[26px] font-extrabold text-brand tracking-tightest leading-none">
            {data ? `${data.block.utilization}%` : "—"}
          </div>
          <div className="text-[12px] text-ink font-bold mt-2.5 leading-tight">Block Fill</div>
          <div className="text-[10px] text-muted font-semibold mt-1">
            gas used / limit
          </div>
        </div>
      </div>

      {/* Latest block detail */}
      {data && (
        <div className="px-5 mt-3 animate-fade-up">
          <div className="surface rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Latest Block</span>
              <span className="text-[10px] font-bold text-muted">{fmtAge(data.block.age)}</span>
            </div>
            <div className="text-[22px] font-extrabold text-ink tracking-tightest mt-3 leading-none font-mono">
              #{data.block.number.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
              <div>
                <div className="text-muted font-semibold uppercase tracking-wider text-[9px]">Validator</div>
                <div className="text-ink font-bold font-mono mt-0.5">{shortAddr(data.block.miner)}</div>
              </div>
              <div className="text-right">
                <div className="text-muted font-semibold uppercase tracking-wider text-[9px]">Transactions</div>
                <div className="text-ink font-bold mt-0.5">{data.block.txCount}</div>
              </div>
            </div>
            <a
              href={`https://chainscan.0g.ai/block/${data.block.number}`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 text-[11px] font-bold text-brand hover-slide-right inline-flex"
            >
              View on Chain Scan
              <Icon name="arrow-up-right" size={12} strokeWidth={2.2} />
            </a>
          </div>
        </div>
      )}

      {error && (
        <div className="px-5 mt-3 text-[11px] text-[#c92a4e] font-bold">⚠ {error}</div>
      )}

      {/* Get ØG */}
      <div className="px-5 mt-5 animate-fade-up">
        <a
          href="https://get.0g.ai/"
          target="_blank"
          rel="noreferrer"
          className="magnet group bg-brand text-white rounded-3xl px-5 py-4 flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
              Token
            </span>
            <div className="text-[20px] font-extrabold tracking-tightest mt-1.5 leading-none">
              Get ØG
            </div>
          </div>
          <span className="magnet-icon w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Icon name="arrow-up-right" size={16} strokeWidth={2.2} />
          </span>
        </a>
      </div>

      {/* Hub analytics deep dive */}
      <div className="px-5 mt-8 animate-fade-up">
        <span className="eyebrow">Hub Analytics</span>
        <h2 className="text-[20px] font-extrabold tracking-tightest text-ink mt-2.5 mb-4 leading-none">
          Deep Dive
        </h2>
        <div className="grid grid-cols-2 gap-2.5 stagger">
          {hubLinks.map((l) => (
            <a
              key={l.title}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="hover-lift surface rounded-3xl p-4 flex flex-col justify-between min-h-[92px] animate-fade-up"
            >
              <div>
                <div className="text-[14px] font-bold text-ink tracking-tight">{l.title}</div>
                <div className="text-[10px] text-muted mt-1 font-medium leading-tight">{l.sub}</div>
              </div>
              <span className="w-7 h-7 rounded-full bg-brand-tint flex items-center justify-center text-brand self-end mt-2">
                <Icon name="arrow-up-right" size={13} strokeWidth={2.1} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Live indicator strip */}
      <div className="px-5 mt-5 flex items-center justify-center gap-2 animate-fade-in">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2a9050] animate-pulse-dot" />
        <span className="text-[10px] font-extrabold text-[#2a9050] uppercase tracking-wider">
          Live · streaming 0g mainnet · refresh 4s
        </span>
      </div>
    </>
  );
}

/* ===================== WALLET TAB ===================== */
function WalletTab() {
  const [address, setAddress] = useState("");
  const [tracking, setTracking] = useState<string | null>(null);
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isValid = /^0x[0-9a-fA-F]{40}$/.test(address.trim());

  async function fetchWallet(a: string, isRefresh = false) {
    if (!isRefresh) setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/wallet?address=${a}`, { cache: "no-store" });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Unable to fetch");
      setData(json);
    } catch (e: any) {
      setError(e.message || "Network error");
      if (!isRefresh) setData(null);
    } finally {
      if (!isRefresh) setLoading(false);
    }
  }

  function track() {
    if (!isValid) return;
    const a = address.trim();
    setTracking(a);
    fetchWallet(a);
  }
  function untrack() { setTracking(null); setData(null); setError(null); }
  async function paste() { try { setAddress((await navigator.clipboard.readText()).trim()); } catch {} }
  async function copyAddr() {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  useEffect(() => {
    if (!tracking) return;
    const id = setInterval(() => fetchWallet(tracking, true), 12000);
    return () => clearInterval(id);
  }, [tracking]);

  return (
    <div className="px-5 mt-5">
      <div className="surface rounded-3xl p-5 animate-fade-up">
        <span className="eyebrow">Wallet Tracker</span>
        <p className="text-[12px] text-body mt-3 font-medium leading-relaxed">
          Paste any EVM address for live insights into its 0G mainnet activity.
        </p>
        <div className="mt-4 flex gap-2 items-center">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="flex-1 min-w-0 sunken rounded-2xl px-4 py-3 text-[12px] font-mono text-ink placeholder:text-muted outline-none focus:border-brand-soft transition-colors"
            onKeyDown={(e) => e.key === "Enter" && track()}
          />
          <button
            onClick={paste}
            type="button"
            className="press text-[11px] font-bold uppercase tracking-wider px-4 py-3 rounded-2xl border border-line text-brand"
          >
            Paste
          </button>
        </div>
        <button
          disabled={!isValid || loading}
          onClick={track}
          className={`magnet group mt-3 w-full rounded-full pl-6 pr-2 py-2 flex items-center justify-between font-bold text-[14px] transition-colors ${
            isValid && !loading ? "bg-brand text-white" : "bg-brand-tint text-muted"
          }`}
        >
          {loading ? "Tracking…" : tracking ? "Re-track" : "Track Wallet"}
          <span className={`magnet-icon w-10 h-10 rounded-full flex items-center justify-center ${isValid && !loading ? "bg-white/15" : "bg-white/40"}`}>
            <Icon name="arrow-up-right" size={16} strokeWidth={2.2} />
          </span>
        </button>
        {error && (
          <div className="mt-3 text-[11px] text-[#c92a4e] font-bold">⚠ {error}</div>
        )}
      </div>

      {data && (
        <>
          <div className="mt-4 animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden p-5">
              <div className="absolute inset-0" style={{ background: "var(--brand)" }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <span className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                      Tracking · {data.chain}
                    </span>
                    <button
                      onClick={copyAddr}
                      className="press block text-white text-[18px] font-extrabold mt-1.5 font-mono tracking-tight"
                    >
                      {shortAddr(data.address)}
                    </button>
                    <div className="text-white/65 text-[10px] font-semibold mt-1">
                      {copied ? "Copied to clipboard" : "Tap address to copy"}
                    </div>
                  </div>
                  <button
                    onClick={untrack}
                    className="press w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ background: "rgba(255,255,255,0.16)" }}
                    aria-label="Stop tracking"
                  >
                    <Icon name="close" size={14} strokeWidth={2.2} />
                  </button>
                </div>

                <div className="mt-6 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-white/55 text-[9px] font-extrabold uppercase tracking-wider">Balance</div>
                    <div className="text-white text-[30px] font-extrabold tracking-tightest leading-none mt-1.5">
                      {data.balance}
                    </div>
                    <div className="text-white/70 text-[11px] font-bold mt-1">{data.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/55 text-[9px] font-extrabold uppercase tracking-wider">Tx Count</div>
                    <div className="text-white text-[30px] font-extrabold tracking-tightest leading-none mt-1.5">
                      {data.txCount.toLocaleString()}
                    </div>
                    <div className="text-white/70 text-[11px] font-bold mt-1">on-chain</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2a9050] animate-pulse-dot" />
            <span className="text-[10px] font-bold text-[#2a9050] uppercase tracking-wider">
              Live · auto-refresh every 12s
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 stagger">
            <div className="surface rounded-3xl p-4 animate-fade-up hover-lift">
              <div className="text-[22px] font-extrabold text-brand tracking-tightest leading-none">
                {data.txCount > 0 ? "Active" : "Dormant"}
              </div>
              <div className="text-[12px] text-ink font-bold mt-2.5">Wallet Status</div>
              <div className="text-[10px] text-muted font-medium mt-1">
                {data.txCount > 0 ? `${data.txCount} on-chain actions` : "No outbound txs yet"}
              </div>
            </div>
            <div className="surface rounded-3xl p-4 animate-fade-up hover-lift">
              <div className="text-[22px] font-extrabold text-brand tracking-tightest leading-none">
                #{data.blockNumber.toLocaleString()}
              </div>
              <div className="text-[12px] text-ink font-bold mt-2.5">Current Block</div>
              <div className="text-[10px] text-muted font-medium mt-1">
                Read {new Date(data.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>

          <div className="mt-8 animate-fade-up">
            <span className="eyebrow">Deep Dive</span>
            <h2 className="text-[20px] font-extrabold tracking-tightest text-ink mt-2.5 mb-4 leading-none">Scanners</h2>
            <div className="flex flex-col gap-2.5 stagger">
              {[
                { title: "Chain Scan", sub: "Full transaction history", href: `https://chainscan.0g.ai/address/${data.address}` },
                { title: "Storage Scan", sub: "Data uploaded by this wallet", href: `https://storagescan.0g.ai/address/${data.address}` },
                { title: "0G Explorer", sub: "Validator & staking info", href: `https://explorer.0g.ai/address/${data.address}` },
              ].map((s) => (
                <a key={s.title} href={s.href} target="_blank" rel="noreferrer"
                  className="hover-lift surface rounded-3xl px-5 py-4 flex items-center gap-3 animate-fade-up">
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-bold text-ink tracking-tight">{s.title}</div>
                    <div className="text-[11px] text-muted mt-0.5 font-medium">{s.sub}</div>
                  </div>
                  <span className="w-8 h-8 rounded-full bg-brand-tint flex items-center justify-center text-brand flex-shrink-0">
                    <Icon name="arrow-up-right" size={15} strokeWidth={2.1} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </>
      )}

      {!data && !loading && !error && (
        <div className="mt-10 flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-full border border-line flex items-center justify-center text-brand mb-1">
            <Icon name="search" size={22} strokeWidth={1.6} />
          </div>
          <div className="text-[13px] font-bold text-ink">Track any 0G wallet</div>
          <div className="text-[11px] text-muted font-medium max-w-[240px]">
            Balance · tx count · activity · holdings — live from 0G mainnet.
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== PAGE ===================== */
export default function TrackerPage() {
  const [tab, setTab] = useState<Tab>("network");

  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <div className="px-5 pt-7 flex items-start justify-between animate-fade-up">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1 className="text-[30px] font-extrabold tracking-tightest text-ink mt-3 leading-none">
            Tracker
          </h1>
          <p className="text-[12px] text-body mt-2 font-medium">
            All-in-one to explore and use 0G Mainnet.
          </p>
        </div>
        <div className="flex items-center gap-1.5 border border-line rounded-full px-3 py-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2a9050] animate-pulse-dot" />
          <span className="text-[10px] font-extrabold text-[#2a9050] uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="px-5 mt-5 animate-fade-up" style={{ animationDelay: "0.06s" }}>
        <div className="sunken rounded-full p-1 flex gap-1">
          {(["network", "wallet"] as Tab[]).map((t) => {
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`press flex-1 rounded-full py-2.5 text-[12px] font-bold uppercase tracking-wider transition-all duration-400 ease-spring ${
                  active ? "bg-brand text-white" : "text-muted"
                }`}
              >
                {t === "network" ? "Network" : "Wallet"}
              </button>
            );
          })}
        </div>
      </div>

      {tab === "network" ? <NetworkTab /> : <WalletTab />}

      <BottomNav />
    </div>
  );
}
