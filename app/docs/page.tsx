"use client";

import BottomNav from "@/components/BottomNav";
import ScreenHeader from "@/components/ScreenHeader";
import Icon from "@/components/Icon";

type Resource = {
  title: string;
  sub: string;
  href: string;
};

const developLinks: Resource[] = [
  { title: "Testnet", sub: "Connect to the 0G testnet", href: "https://docs.0g.ai/developer-hub/testnet/testnet-overview" },
  { title: "Faucet", sub: "Claim testnet tokens", href: "https://faucet.0g.ai/" },
  { title: "Docs", sub: "Developer documentation", href: "https://docs.0g.ai/" },
  { title: "Storage Scan", sub: "Explore stored data on 0G", href: "https://storagescan.0g.ai/" },
  { title: "Chain Scan", sub: "Inspect chain transactions", href: "https://chainscan.0g.ai/" },
  { title: "Explorer", sub: "Full network explorer", href: "https://explorer.0g.ai/" },
  { title: "GitHub", sub: "Source code & SDKs", href: "https://github.com/0glabs" },
];

export default function DevelopPage() {
  return (
    <div className="min-h-screen pb-28 bg-white">
      <ScreenHeader title="Develop" back />

      <p className="px-4 text-xs text-muted mb-3">
        Everything you need to build on 0G.
      </p>

      <div className="px-4 flex flex-col gap-2 stagger">
        {developLinks.map((d) => (
          <a
            key={d.title}
            href={d.href}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl px-4 py-4 flex items-center gap-3 hover-lift animate-fade-up"
          >
            <div className="flex-1 min-w-0">
              <div className="text-base font-black text-ink">{d.title}</div>
              <div className="text-[11px] text-muted truncate mt-0.5">{d.sub}</div>
            </div>
            <span className="text-purple-bright">
              <Icon name="arrow-up-right" size={18} strokeWidth={2.2} />
            </span>
          </a>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
