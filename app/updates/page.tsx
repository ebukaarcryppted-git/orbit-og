"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { sourceStyles } from "@/lib/updates";
import { relativeTime } from "@/lib/relativeTime";

type FeedItem = {
  id: string;
  slug: string;
  source: "blog" | "discord" | "x";
  title: string;
  summary?: string;
  date: string;
  dateLabel?: string;
};

const CURATED_SOCIAL: FeedItem[] = [
  {
    id: "qwen-37-max-launch-discord",
    slug: "qwen-37-max-launch-discord",
    source: "discord",
    title: "Qwen 3.7 Max is now serving requests — try it tonight",
    summary: "Pinged @everyone: Qwen 3.7 Max is live on 0G Private Computer. Open the playground and ship something tonight.",
    date: "2026-06-09",
  },
  {
    id: "mainnet-milestone-x",
    slug: "mainnet-milestone-x",
    source: "x",
    title: "28M blocks. 346K accounts. 300+ partners. Mainnet is humming.",
    summary: "Stat snapshot from @0G_labs: mainnet health check with fresh ecosystem numbers.",
    date: "2026-05-20",
  },
];

const filters: Array<{ key: "all" | FeedItem["source"]; label: string }> = [
  { key: "all", label: "All" },
  { key: "blog", label: "Blog" },
  { key: "discord", label: "Discord" },
  { key: "x", label: "X" },
];

export default function UpdatesPage() {
  const [feed, setFeed] = useState<FeedItem[] | null>(null);
  const [active, setActive] = useState<"all" | FeedItem["source"]>("all");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch("/api/feed", { cache: "no-store" });
        const j = await r.json();
        if (cancelled || !j.ok) return;
        const blogPosts: FeedItem[] = (j.posts || []).map((p: any) => ({
          id: p.slug,
          slug: p.slug,
          source: "blog",
          title: p.title,
          date: p.date,
          dateLabel: p.dateLabel,
        }));
        setFeed(
          [...blogPosts, ...CURATED_SOCIAL].sort((a, b) => (a.date < b.date ? 1 : -1)),
        );
      } catch {}
    }
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const visible = (feed ?? []).filter((u) => active === "all" || u.source === active);

  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <div className="px-5 pt-7 animate-fade-up">
        <span className="eyebrow">Newsroom</span>
        <h1 className="text-[30px] font-extrabold tracking-tightest text-ink mt-3 leading-none">
          Latest Updates
        </h1>
        <p className="text-[13px] text-body mt-2 font-medium">
          Live from 0g.ai/blog, plus curated Discord & X drops.
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

      <div className="px-5 mt-5 flex flex-col gap-3 stagger" key={`${tick}-${visible.length}`}>
        {feed === null && [0, 1, 2, 3].map((i) => (
          <div key={i} className="surface rounded-3xl p-5 min-h-[110px] animate-fade-up" />
        ))}
        {visible.map((u) => {
          const style = sourceStyles[u.source];
          return (
            <Link
              key={u.id}
              href={`/updates/${u.slug || u.id}`}
              className="hover-lift surface rounded-3xl p-5 flex flex-col gap-2.5 animate-fade-up"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: style.bg, color: style.text }}
                >
                  {style.label}
                </span>
                <span className="text-[10px] text-muted font-semibold ml-auto">
                  {relativeTime(u.date)}
                </span>
              </div>
              <div className="text-[16px] font-bold text-ink leading-snug tracking-tight">
                {u.title}
              </div>
              {u.summary && (
                <div className="text-[12px] text-body leading-relaxed">{u.summary}</div>
              )}
            </Link>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
