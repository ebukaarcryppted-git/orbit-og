"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { getUpdate, sourceStyles } from "@/lib/updates";

export default function UpdateDetailPage() {
  const params = useParams<{ id: string }>();
  const update = getUpdate(params.id);

  if (!update) {
    notFound();
  }

  const style = sourceStyles[update.source];

  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      {/* Header */}
      <div className="px-5 pt-7 flex items-center gap-3 animate-fade-up">
        <Link
          href="/updates"
          className="press w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink flex-shrink-0"
          aria-label="Back"
        >
          <Icon name="back" size={17} strokeWidth={1.8} />
        </Link>
        <span
          className="text-[10px] font-extrabold uppercase tracking-[0.16em] px-3 py-1.5 rounded-full"
          style={{ background: style.bg, color: style.text }}
        >
          {style.label}
        </span>
      </div>

      {/* Title block */}
      <div className="px-5 mt-6 animate-fade-up" style={{ animationDelay: "0.06s" }}>
        <h1 className="text-[28px] font-extrabold text-ink leading-[1.12] tracking-tightest">
          {update.title}
        </h1>
        <div className="text-[11px] text-muted mt-3 font-semibold">
          {update.sourceHandle} · {update.dateLabel}
        </div>
      </div>

      {/* Tags */}
      {update.tags.length > 0 && (
        <div className="px-5 mt-4 flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {update.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-line text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Lede */}
      <div className="px-5 mt-6 animate-fade-up" style={{ animationDelay: "0.14s" }}>
        <p className="text-[15px] text-ink leading-relaxed font-semibold">
          {update.summary}
        </p>
      </div>

      {/* hairline divider */}
      <div className="mx-5 mt-6 border-t border-line animate-fade-up" style={{ animationDelay: "0.18s" }} />

      {/* Body */}
      <div className="px-5 mt-6 flex flex-col gap-4 stagger">
        {update.body.map((para, i) => (
          <p key={i} className="text-[13.5px] text-body leading-[1.75] animate-fade-up">
            {para}
          </p>
        ))}
      </div>

      {/* External CTA */}
      <div className="px-5 mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <a
          href={update.externalUrl}
          target="_blank"
          rel="noreferrer"
          className="magnet group flex w-full bg-brand text-white rounded-full pl-6 pr-2 py-2 items-center justify-between font-bold text-[14px]"
        >
          Open original
          <span className="magnet-icon w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
            <Icon name="arrow-up-right" size={16} strokeWidth={2.2} />
          </span>
        </a>
      </div>

      {/* More */}
      <div className="px-5 mt-8 animate-fade-up" style={{ animationDelay: "0.46s" }}>
        <Link href="/updates" className="hover-lift surface rounded-3xl px-5 py-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[14px] font-bold text-ink tracking-tight">Browse all updates</div>
            <div className="text-[11px] text-muted mt-0.5 font-medium">
              Blog posts, Discord drops & X
            </div>
          </div>
          <span className="w-8 h-8 rounded-full bg-brand-tint flex items-center justify-center text-brand">
            <Icon name="chevron-right" size={15} strokeWidth={2.2} />
          </span>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
}
