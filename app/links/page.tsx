"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { categories } from "@/lib/links";

type Card = {
  href: string;
  title: string;
  blurb: string;
  meta: string;
  big?: boolean;
};

const cards: Card[] = [
  { href: "/links/develop", title: "Develop", blurb: "Testnet, faucet, scanners & docs.", meta: `${categories.develop.items.length} links`, big: true },
  { href: "/about", title: "About 0G", blurb: "The decentralized AI OS.", meta: "Overview" },
  { href: "/links/ecosystem", title: "Ecosystem", blurb: "Programs & partners.", meta: `${categories.ecosystem.items.length} links` },
  { href: "/links/learn", title: "Learn", blurb: "Blog, AMAs, FAQs, whitepaper.", meta: `${categories.learn.items.length} links`, big: true },
  { href: "/links/social", title: "Social", blurb: "Discord, X, GitHub & more.", meta: `${categories.social.items.length} links` },
  { href: "/roadmap", title: "Roadmap", blurb: "Shipped & what's next.", meta: "Timeline" },
];

export default function CommunityHubPage() {
  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <div className="px-5 pt-7 animate-fade-up">
        <span className="eyebrow">Hub</span>
        <h1 className="text-[30px] font-extrabold tracking-tightest text-ink mt-3 leading-none">
          Community
        </h1>
        <p className="text-[13px] text-body mt-2 font-medium">
          Tools, content, channels, and people — all of 0G in one place.
        </p>
      </div>

      <div className="px-5 mt-7 grid grid-cols-2 gap-3 stagger">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className={`hover-lift surface rounded-3xl p-5 flex flex-col justify-between animate-fade-up min-h-[152px] ${
              c.big ? "col-span-2 min-h-[120px]" : ""
            }`}
          >
            <div>
              <div className="text-[20px] font-extrabold tracking-tight text-ink leading-none">
                {c.title}
              </div>
              <div className="text-[12px] text-muted mt-2 leading-snug font-medium">
                {c.blurb}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="eyebrow">{c.meta}</span>
              <span className="w-8 h-8 rounded-full bg-brand-tint flex items-center justify-center text-brand">
                <Icon name="chevron-right" size={15} strokeWidth={2.2} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
