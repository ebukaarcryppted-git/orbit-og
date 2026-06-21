"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { updates, sourceStyles } from "@/lib/updates";

type Featured = {
  title: string;
  tagline: string;
  metric: string;
  metricLabel: string;
};

const featured: Featured[] = [
  { title: "0G Storage", tagline: "AI-optimized decentralized storage", metric: "Live", metricLabel: "Mainnet since Sep 2025" },
  { title: "0G Compute", tagline: "Trustless AI inference, on-chain", metric: "4 Models", metricLabel: "GLM · Qwen · DeepSeek · 0GM" },
  { title: "Zero Cup", tagline: "0G's global vibe coding tournament", metric: "$17K", metricLabel: "Prize pool · Jun 15–23" },
  { title: "0G DA", tagline: "Infinitely scalable data availability", metric: "Live", metricLabel: "High-speed verifiable AI" },
];

export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const f = featured[slide];
  const recent = updates.slice(0, 4);

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

      {/* Featured */}
      <div className="px-5 mt-8 flex items-end justify-between animate-fade-up" style={{ animationDelay: "0.12s" }}>
        <div>
          <span className="eyebrow">Top Announcements</span>
          <h2 className="text-[22px] font-extrabold tracking-tightest text-ink mt-2.5 leading-none">
            Built on 0G
          </h2>
        </div>
        <span className="text-[11px] font-bold text-muted">
          {slide + 1} / {featured.length}
        </span>
      </div>

      <div className="px-5 mt-4 animate-scale-in" style={{ animationDelay: "0.16s" }}>
        <div className="press relative h-56 rounded-3xl overflow-hidden hover-shine">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/og-ecosystem.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          {/* flat scrim, no gradient */}
          <div className="absolute inset-0" style={{ background: "rgba(13,8,24,0.52)" }} />

          <div className="absolute left-0 right-0 bottom-0 p-5">
            <div className="text-white text-[28px] font-extrabold tracking-tightest leading-none">
              {f.title}
            </div>
            <div className="text-white/75 text-[12px] font-medium mt-1.5">
              {f.tagline}
            </div>
            <div className="flex items-center gap-2.5 mt-4">
              <span className="bg-white text-brand text-[11px] font-extrabold px-3 py-1.5 rounded-full">
                {f.metric}
              </span>
              <span className="text-white/80 text-[11px] font-semibold">
                {f.metricLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mt-4">
          {featured.map((_, idx) => (
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
      </div>

      {/* CTA grid — Build / Launch app */}
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
            <div className="text-[22px] font-extrabold tracking-tightest leading-none">
              Build
            </div>
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
            <div className="text-[22px] font-extrabold tracking-tightest leading-none">
              Launch app
            </div>
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

      <div className="px-5 mt-4 grid grid-cols-2 gap-3 stagger">
        {recent.map((u) => {
          const style = sourceStyles[u.source];
          return (
            <Link
              key={u.id}
              href={`/updates/${u.id}`}
              className="hover-lift surface rounded-3xl p-4 flex flex-col gap-3 animate-fade-up"
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: style.bg, color: style.text }}
                >
                  {u.source === "blog" ? "Blog" : u.source === "discord" ? "Discord" : "X"}
                </span>
                <span className="text-[10px] text-muted font-semibold">{u.relative}</span>
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
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
