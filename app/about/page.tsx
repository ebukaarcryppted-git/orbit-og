"use client";

import BottomNav from "@/components/BottomNav";
import ScreenHeader from "@/components/ScreenHeader";
import Icon from "@/components/Icon";

const stack = [
  { tag: "Storage", desc: "AI-optimized decentralized data layer" },
  { tag: "DA", desc: "Infinitely scalable data availability" },
  { tag: "Compute", desc: "Trustless, verifiable AI inference" },
  { tag: "Chain", desc: "Modular L1 unifying the stack" },
];

const facts = [
  { value: "50,000×", label: "Throughput vs legacy data layers" },
  { value: "100×", label: "Lower cost" },
  { value: "Sep 2025", label: "Mainnet live" },
  { value: "300+", label: "Ecosystem partners" },
];

export default function AboutPage() {
  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <ScreenHeader title="About 0G" eyebrow="Overview" back />

      <div className="px-5 mt-3 flex flex-col gap-3">
        <div className="surface rounded-3xl p-5 animate-fade-up">
          <h2 className="text-[18px] font-extrabold text-ink tracking-tight leading-snug">
            The decentralized AI operating system
          </h2>
          <p className="text-[13px] text-body leading-relaxed mt-3">
            0G (Zero Gravity) is building the world's first decentralized AI
            operating system — a modular, infinitely scalable Layer-1 designed to
            make on-chain AI both performant and verifiable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 stagger">
          {facts.map((f) => (
            <div key={f.label} className="surface rounded-3xl p-4 animate-fade-up hover-lift">
              <div className="text-[24px] font-extrabold text-brand tracking-tightest leading-none">
                {f.value}
              </div>
              <div className="text-[11px] text-muted font-semibold mt-2 leading-tight">
                {f.label}
              </div>
            </div>
          ))}
        </div>

        <div className="surface rounded-3xl p-5 animate-fade-up">
          <span className="eyebrow">Core Stack</span>
          <ul className="flex flex-col gap-3 mt-4">
            {stack.map((s) => (
              <li key={s.tag} className="flex items-baseline gap-3">
                <span className="text-[13px] font-extrabold text-brand w-[68px] flex-shrink-0">
                  {s.tag}
                </span>
                <span className="text-[12px] text-body font-medium">{s.desc}</span>
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://0g.ai"
          target="_blank"
          rel="noreferrer"
          className="magnet group flex w-full bg-brand text-white rounded-full pl-6 pr-2 py-2 items-center justify-between font-bold text-[14px] animate-fade-up"
        >
          Visit 0g.ai
          <span className="magnet-icon w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Icon name="arrow-up-right" size={16} strokeWidth={2.2} />
          </span>
        </a>
      </div>

      <BottomNav />
    </div>
  );
}
