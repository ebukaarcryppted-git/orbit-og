"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { updates, sourceStyles, UpdateSource } from "@/lib/updates";

const filters: Array<{ key: "all" | UpdateSource; label: string }> = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "discord", label: "Discord" },
  { key: "x", label: "X" },
];

export default function UpdatesPage() {
  const [active, setActive] = useState<"all" | UpdateSource>("all");
  const visible = updates.filter((u) => active === "all" || u.source === active);

  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <div className="px-5 pt-7 animate-fade-up">
        <span className="eyebrow">Newsroom</span>
        <h1 className="text-[30px] font-extrabold tracking-tightest text-ink mt-3 leading-none">
          Latest Updates
        </h1>
        <p className="text-[13px] text-body mt-2 font-medium">
          Everything 0G shipped, said, or shouted about.
        </p>
      </div>

      <div className="px-5 mt-5 flex gap-2 overflow-x-auto scroll-hide animate-fade-up" style={{ animationDelay: "0.06s" }}>
        {filters.map((f) => {
          const isActive = f.key === active;
          return (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`press flex-shrink-0 rounded-full px-4 py-2 text-[12px] font-bold whitespace-nowrap transition-colors ${
                isActive ? "bg-brand text-white" : "border border-line text-muted hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="px-5 mt-5 flex flex-col gap-3 stagger">
        {visible.map((u) => {
          const style = sourceStyles[u.source];
          return (
            <Link
              key={u.id}
              href={`/updates/${u.id}`}
              className="hover-lift surface rounded-3xl p-5 flex flex-col gap-2.5 animate-fade-up"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: style.bg, color: style.text }}
                >
                  {style.label}
                </span>
                <span className="text-[10px] text-muted font-semibold ml-auto">{u.relative}</span>
              </div>
              <div className="text-[16px] font-bold text-ink leading-snug tracking-tight">
                {u.title}
              </div>
              <div className="text-[12px] text-body leading-relaxed">
                {u.summary}
              </div>
            </Link>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
