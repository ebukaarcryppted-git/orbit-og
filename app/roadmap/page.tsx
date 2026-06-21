"use client";

import BottomNav from "@/components/BottomNav";
import ScreenHeader from "@/components/ScreenHeader";

type Milestone = {
  date: string;
  title: string;
  desc: string;
  status: "done" | "active" | "upcoming";
};

const milestones: Milestone[] = [
  { date: "Q1 2024", title: "Testnet Launch", desc: "0G Storage & DA testnet live", status: "done" },
  { date: "Q3 2024", title: "Seed Round", desc: "$35M raised from Hack VC & others", status: "done" },
  { date: "Q3 2025", title: "Mainnet Live", desc: "Production network goes live", status: "done" },
  { date: "Jun–Jul 2026", title: "Zero Cup Tournament", desc: "Vibe coding bracket · $17K prize pool", status: "active" },
  { date: "Q3 2026", title: "0G Compute GA", desc: "Verifiable AI compute, general availability", status: "upcoming" },
  { date: "Q4 2026", title: "Full L1 Mainnet", desc: "Unified 0G chain launch", status: "upcoming" },
];

const dotStyle: Record<Milestone["status"], string> = {
  done: "bg-brand",
  active: "bg-brand",
  upcoming: "bg-line border border-line-strong",
};

export default function RoadmapPage() {
  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <ScreenHeader title="Roadmap" eyebrow="Milestones" back />

      <p className="px-5 text-[13px] text-body mt-1 mb-6 font-medium">
        Where 0G has been, and where it's going.
      </p>

      <div className="px-5 relative">
        <div className="absolute left-[27px] top-3 bottom-3 w-px bg-line" />

        <div className="flex flex-col gap-3 stagger">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-4 relative animate-slide-right">
              <div className="flex-shrink-0 w-3 flex justify-center pt-5">
                <div className={`w-3 h-3 rounded-full relative z-10 ${dotStyle[m.status]}`} />
              </div>
              <div className="hover-lift surface rounded-3xl px-5 py-4 flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand">
                    {m.date}
                  </span>
                  {m.status === "active" && (
                    <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-brand text-white uppercase tracking-wider">
                      Now
                    </span>
                  )}
                  {m.status === "done" && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-brand-tint text-brand uppercase tracking-wider">
                      Done
                    </span>
                  )}
                </div>
                <div className="text-[15px] font-bold text-ink tracking-tight">{m.title}</div>
                <div className="text-[12px] text-muted mt-1 font-medium">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
