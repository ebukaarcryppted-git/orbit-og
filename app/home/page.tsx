"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { relativeTime } from "@/lib/relativeTime";

type FeedItem = {
  id: string;
  slug: string;
  source: "blog" | "discord" | "x";
  sourceLabel: string;
  title: string;
  date: string;
  dateLabel?: string;
  summary?: string;
  externalUrl?: string;
};

const sourcePillBg: Record<FeedItem["source"], string> = {
  blog: "#6d28d9",
  discord: "#5865f2",
  x: "#15111f",
};
const sourcePillLabel: Record<FeedItem["source"], string> = {
  blog: "Blog",
  discord: "Discord",
  x: "X",
};

// Curated X/Discord items — these get blended with the live blog feed by date.
// (X/Discord have no free public API; this stays curated and is intentionally short.)
const CURATED_SOCIAL: FeedItem[] = [
  {
    id: "qwen-37-max-launch-discord",
    slug: "qwen-37-max-launch-discord",
    source: "discord",
    sourceLabel: "Discord",
    title: "Qwen 3.7 Max is now serving requests — try it tonight",
    summary:
      "Pinged @everyone — Qwen 3.7 Max is live on 0G Private Computer. Open the playground and ship something tonight.",
    date: "2026-06-09",
  },
  {
    id: "mainnet-milestone-x",
    slug: "mainnet-milestone-x",
    source: "x",
    sourceLabel: "X",
    title: "28M blocks. 346K accounts. 300+ partners. Mainnet is humming.",
    summary:
      "Stat snapshot from @0G_labs: a quick mainnet health check.",
    date: "2026-05-20",
  },
];

export default function HomePage() {
  const [feed, setFeed] = useState<FeedItem[] | null>(null);
  const [slide, setSlide] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await fetch("/api/feed", { cache: "no-store" });
        const j = await r.json();
        if (cancelled) return;
        if (j.ok) {
          const blogPosts: FeedItem[] = (j.posts || []).map((p: any) => ({
            id: p.slug,
            slug: p.slug,
            source: "blog",
            sourceLabel: "Blog",
            title: p.title,
            date: p.date,
            dateLabel: p.dateLabel,
            externalUrl: p.externalUrl,
          }));
          const blended = [...blogPosts, ...CURATED_SOCIAL].sort(
            (a, b) => (a.date < b.date ? 1 : -1),
          );
          setFeed(blended);
        }
      } catch {}
    }
    load();
    const refresh = setInterval(load, 5 * 60_000); // refetch every 5 min
    return () => { cancelled = true; clearInterval(refresh); };
  }, []);

  // re-render relative times every minute
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60_000);
    return () => clearInterval(id);
  }, []);

  const banner = (feed ?? []).slice(0, 4);
  const updates = (feed ?? []).slice(0, 6);
  const featured = banner[slide];

  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      {/* Header */}
      <div className="px-5 pt-7 flex items-center gap-3 animate-fade-up">
        <div className="w-11 h-11 rounded-2xl bg-brand flex items-center justify-center text-white text-lg font-extrabold">
          Ø
        </div>
        <div className="flex-1">
          <div className="text-[18px] font-extrabold tracking-tightest text-ink leading-none">
            Orbit<span className="text-brand">ØG</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-5 mt-5 animate-fade-up" style={{ animationDelay: "0.06s" }}>
        <div className="surface rounded-full pl-2 pr-4 py-2 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center text-white">
            <Icon name="search" size={16} strokeWidth={1.9} />
          </div>
          <input
            type="text"
            placeholder="Search the 0G ecosystem"
            className="bg-transparent flex-1 text-[13px] font-medium text-ink placeholder:text-muted outline-none"
          />
        </div>
      </div>

      {/* Featured banner */}
      <div className="px-5 mt-8 flex items-end justify-between animate-fade-up" style={{ animationDelay: "0.12s" }}>
        <div>
          <span className="eyebrow">Top Announcements</span>
          <h2 className="text-[22px] font-extrabold tracking-tightest text-ink mt-2.5 leading-none">
            Built on 0G
          </h2>
        </div>
        <span className="text-[11px] font-bold text-muted">
          {banner.length > 0 ? `${slide + 1} / ${banner.length}` : "loading"}
        </span>
      </div>

      <div className="px-5 mt-4 animate-scale-in" style={{ animationDelay: "0.16s" }}>
        {featured ? (
          <Link
            href={featured.source === "blog" ? `/updates/${featured.slug}` : `/updates/${featured.id}`}
            className="press relative block h-56 rounded-3xl overflow-hidden hover-shine"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/og-ecosystem.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0" style={{ background: "rgba(13,8,24,0.58)" }} />

            <div className="absolute top-4 left-4">
              <span
                className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white px-2.5 py-1 rounded-full"
                style={{ background: sourcePillBg[featured.source] }}
              >
                {sourcePillLabel[featured.source]}
              </span>
            </div>

            <div className="absolute left-0 right-0 bottom-0 p-5">
              <div className="text-white text-[22px] font-extrabold tracking-tightest leading-tight line-clamp-2">
                {featured.title}
              </div>
              <div className="flex items-center gap-2 mt-3" key={tick}>
                <span className="bg-white text-brand text-[11px] font-extrabold px-2.5 py-1 rounded-full">
                  {relativeTime(featured.date)}
                </span>
                {featured.dateLabel && (
                  <span className="text-white/75 text-[11px] font-semibold">
                    {featured.dateLabel}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ) : (
          <div className="h-56 rounded-3xl border border-line bg-[var(--bg-sunken)]" />
        )}

        {banner.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-4">
            {banner.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 ease-spring ${
                  idx === slide ? "w-6 bg-brand" : "w-1.5 bg-line"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA tiles */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <a
          href="https://build.0g.ai/"
          target="_blank"
          rel="noreferrer"
          className="magnet group bg-brand text-white rounded-3xl p-5 flex flex-col justify-between min-h-[120px]"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
            Builders
          </span>
          <div className="flex items-end justify-between mt-3">
            <div className="text-[22px] font-extrabold tracking-tightest leading-none">Build</div>
            <span className="magnet-icon w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="arrow-up-right" size={15} strokeWidth={2.2} />
            </span>
          </div>
        </a>
        <a
          href="https://app.0g.ai/"
          target="_blank"
          rel="noreferrer"
          className="magnet group bg-brand text-white rounded-3xl p-5 flex flex-col justify-between min-h-[120px]"
        >
          <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/70">
            Use 0G
          </span>
          <div className="flex items-end justify-between mt-3">
            <div className="text-[22px] font-extrabold tracking-tightest leading-none">Launch app</div>
            <span className="magnet-icon w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="arrow-up-right" size={15} strokeWidth={2.2} />
            </span>
          </div>
        </a>
      </div>

      {/* Latest Updates */}
      <div className="px-5 mt-8 flex items-end justify-between animate-fade-up" style={{ animationDelay: "0.26s" }}>
        <div>
          <span className="eyebrow">Latest</span>
          <h2 className="text-[22px] font-extrabold tracking-tightest text-ink mt-2.5 leading-none">
            Updates
          </h2>
        </div>
        <Link href="/updates" className="hover-slide-right text-[12px] font-bold text-brand">
          See all
          <Icon name="chevron-right" size={13} strokeWidth={2.2} />
        </Link>
      </div>

      <div className="px-5 mt-4 grid grid-cols-2 gap-3 stagger" key={`${tick}-${updates.length}`}>
        {updates.length === 0 && [0, 1, 2, 3].map((i) => (
          <div key={i} className="surface rounded-3xl p-4 min-h-[160px] animate-fade-up" />
        ))}
        {updates.map((u) => (
          <Link
            key={u.id}
            href={`/updates/${u.slug || u.id}`}
            className="hover-lift surface rounded-3xl p-4 flex flex-col gap-3 animate-fade-up"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                style={{ background: sourcePillBg[u.source] }}
              >
                {sourcePillLabel[u.source]}
              </span>
              <span className="text-[10px] text-muted font-semibold">
                {relativeTime(u.date)}
              </span>
            </div>
            <div className="text-[13px] font-bold text-ink leading-snug tracking-tight flex-1">
              {u.title}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-brand">Read</span>
              <span className="w-7 h-7 rounded-full bg-brand-tint flex items-center justify-center text-brand">
                <Icon name="arrow-up-right" size={13} strokeWidth={2.1} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
