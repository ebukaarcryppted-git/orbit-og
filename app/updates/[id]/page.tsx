"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { getUpdate, sourceStyles, Update } from "@/lib/updates";
import { relativeTime, formatDateLabel } from "@/lib/relativeTime";

type LivePost = {
  ok: true;
  slug: string;
  source: "blog";
  sourceLabel: "Blog Post";
  sourceHandle: "0g.ai/blog";
  title: string;
  summary: string;
  date: string | null;
  dateLabel: string | null;
  body: string[];
  externalUrl: string;
};

export default function UpdateDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || "";

  // Static (curated) item lookup
  const staticItem = getUpdate(id) as Update | undefined;
  const [livePost, setLivePost] = useState<LivePost | null>(null);
  const [loading, setLoading] = useState(!staticItem);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (staticItem) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/post/${id}`)
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        if (j.ok) {
          setLivePost(j);
          setError(null);
        } else {
          setError(j.error || "Not found");
        }
      })
      .catch((e) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id, staticItem]);

  // Loading state
  if (!staticItem && loading) {
    return (
      <div className="min-h-[100dvh] pb-28 bg-white px-5 pt-7">
        <div className="surface rounded-3xl px-5 py-8 animate-fade-up">
          <div className="text-[12px] text-muted font-semibold">Loading post…</div>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Not-found state
  if (!staticItem && (error || !livePost)) {
    return (
      <div className="min-h-[100dvh] pb-28 bg-white px-5 pt-7">
        <Link
          href="/updates"
          className="press w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink"
          aria-label="Back"
        >
          <Icon name="back" size={17} strokeWidth={1.8} />
        </Link>
        <div className="mt-6">
          <h1 className="text-[24px] font-extrabold text-ink tracking-tightest">Post not found</h1>
          <p className="text-[13px] text-body mt-2">{error || "We couldn't load that post."}</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Normalize fields
  const source = (staticItem?.source ?? livePost!.source) as "blog" | "discord" | "x" | "github";
  const style = sourceStyles[source];
  const title = staticItem?.title ?? livePost!.title;
  const summary = staticItem?.summary ?? livePost!.summary;
  const body = staticItem?.body ?? livePost!.body;
  const externalUrl = staticItem?.externalUrl ?? livePost!.externalUrl;
  const sourceHandle = staticItem?.sourceHandle ?? livePost!.sourceHandle;
  const dateIso = staticItem?.date ?? livePost!.date ?? "";
  const dateLabel = dateIso ? formatDateLabel(dateIso) : (staticItem?.dateLabel ?? livePost!.dateLabel ?? "");
  const tags = staticItem?.tags ?? [];

  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
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

      <div className="px-5 mt-6 animate-fade-up" style={{ animationDelay: "0.06s" }}>
        <h1 className="text-[28px] font-extrabold text-ink leading-[1.12] tracking-tightest">
          {title}
        </h1>
        <div className="text-[11px] text-muted mt-3 font-semibold">
          {sourceHandle} · {dateLabel} {dateIso && <span>· {relativeTime(dateIso)}</span>}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="px-5 mt-4 flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {tags.map((t) => (
            <span
              key={t}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-line text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {summary && (
        <div className="px-5 mt-6 animate-fade-up" style={{ animationDelay: "0.14s" }}>
          <p className="text-[15px] text-ink leading-relaxed font-semibold">
            {summary}
          </p>
        </div>
      )}

      <div className="mx-5 mt-6 border-t border-line animate-fade-up" style={{ animationDelay: "0.18s" }} />

      <div className="px-5 mt-6 flex flex-col gap-4 stagger">
        {body.map((p, i) => (
          <p key={i} className="text-[13.5px] text-body leading-[1.75] animate-fade-up">{p}</p>
        ))}
      </div>

      <div className="px-5 mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <a
          href={externalUrl}
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

      <div className="px-5 mt-8 animate-fade-up" style={{ animationDelay: "0.46s" }}>
        <Link href="/updates" className="hover-lift surface rounded-3xl px-5 py-4 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[14px] font-bold text-ink tracking-tight">Browse all updates</div>
            <div className="text-[11px] text-muted mt-0.5 font-medium">
              Latest from 0G blog, Discord & X
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
