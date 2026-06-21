"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { IconName } from "@/components/Icon";

type Item = { href: string; icon: IconName; label: string };

const homeItem: Item = { href: "/home", icon: "home", label: "Home" };
const trackerItem: Item = { href: "/tracker", icon: "chip", label: "Tracker" };

function NavLink({ item, active }: { item: Item; active: boolean }) {
  return (
    <Link
      href={item.href}
      className="flex flex-col items-center justify-center gap-1.5 flex-1 py-2.5 group select-none"
    >
      <span
        className={`transition-all duration-500 ease-spring ${
          active ? "text-brand scale-110" : "text-muted group-hover:text-ink"
        }`}
      >
        <Icon name={item.icon} size={23} strokeWidth={active ? 2.1 : 1.6} />
      </span>
      <span
        className={`text-[11px] tracking-tight transition-colors duration-300 ${
          active ? "text-brand font-extrabold" : "text-muted font-semibold group-hover:text-ink"
        }`}
      >
        {item.label}
      </span>
      <span
        className={`h-[3px] rounded-full bg-brand transition-all duration-500 ease-spring ${
          active ? "w-5 opacity-100" : "w-0 opacity-0"
        }`}
      />
    </Link>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const onHome = pathname === "/home";
  const onTracker = pathname === "/tracker";
  const onLinks = pathname === "/links";

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 animate-fade-in">
      <div className="relative px-4 pb-5 pt-2">
        <div className="surface-strong flex items-stretch relative overflow-hidden">
          <NavLink item={homeItem} active={onHome} />
          <div className="w-24 flex-shrink-0" aria-hidden />
          <NavLink item={trackerItem} active={onTracker} />
        </div>

        {/* Center floating action — solid purple, flat */}
        <Link
          href="/links"
          className="press absolute left-1/2 w-[68px] h-[68px] rounded-full bg-brand flex items-center justify-center text-white border-[5px] border-white"
          style={{ top: "-16px", transform: "translateX(-50%)" }}
          aria-label="Open Community"
        >
          {onLinks && (
            <span
              className="absolute rounded-full"
              style={{
                inset: -5,
                border: "2px solid var(--brand)",
                animation: "ring-breathe 2.4s ease-out infinite",
              }}
              aria-hidden
            />
          )}
          <span
            className={`transition-transform duration-700 ease-spring ${
              onLinks ? "rotate-90" : "rotate-0"
            }`}
          >
            <Icon name="grid" size={28} strokeWidth={2} />
          </span>
        </Link>
      </div>
    </div>
  );
}
