"use client";

import BottomNav from "@/components/BottomNav";
import ScreenHeader from "@/components/ScreenHeader";
import Icon from "@/components/Icon";

type Resource = {
  title: string;
  sub: string;
  href: string;
};

const knowledge: Resource[] = [
  { title: "Blog", sub: "News, announcements, deep dives", href: "https://0g.ai/blog" },
  { title: "AMAs", sub: "Recorded ask-me-anything sessions", href: "https://0g.ai/ama" },
  { title: "FAQs", sub: "Common questions answered", href: "https://0g.ai/faq" },
  { title: "Whitepaper", sub: "The technical foundation of 0G", href: "https://cdn.jsdelivr.net/gh/0glabs/0g-doc/static/whitepaper.pdf" },
];

const legal: Resource[] = [
  { title: "Node Disclaimer", sub: "Operating a 0G node", href: "https://0g.ai/disclaimer" },
  { title: "Privacy Policy", sub: "How your data is handled", href: "https://0g.ai/privacy-policy" },
  { title: "Terms of Service", sub: "Platform usage terms", href: "https://0g.ai/terms-of-service" },
];

function ResourceRow({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noreferrer"
      className="glass rounded-2xl px-4 py-4 flex items-center gap-3 hover-lift animate-fade-up"
    >
      <div className="flex-1 min-w-0">
        <div className="text-base font-black text-ink">{r.title}</div>
        <div className="text-[11px] text-muted truncate mt-0.5">{r.sub}</div>
      </div>
      <span className="text-purple-bright">
        <Icon name="arrow-up-right" size={18} strokeWidth={2.2} />
      </span>
    </a>
  );
}

export default function LearnPage() {
  return (
    <div className="min-h-screen pb-28 bg-white">
      <ScreenHeader title="Learn" back />

      <p className="px-4 text-xs text-muted mb-3">
        Get up to speed on the ØG ecosystem.
      </p>

      <div className="px-4 mb-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] brand-text mb-2">
          Knowledge
        </div>
        <div className="flex flex-col gap-2 stagger">
          {knowledge.map((r) => <ResourceRow key={r.title} r={r} />)}
        </div>
      </div>

      <div className="px-4">
        <div className="text-[10px] font-bold uppercase tracking-[0.14em] brand-text mb-2">
          Legal
        </div>
        <div className="flex flex-col gap-2 stagger">
          {legal.map((r) => <ResourceRow key={r.title} r={r} />)}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
