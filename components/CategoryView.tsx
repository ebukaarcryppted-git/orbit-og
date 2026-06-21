"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import type { Category } from "@/lib/links";

export default function CategoryView({ category }: { category: Category }) {
  return (
    <div className="min-h-[100dvh] pb-28 bg-white">
      <div className="px-5 pt-7 flex items-start gap-3 animate-fade-up">
        <Link
          href="/links"
          className="press w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink flex-shrink-0"
          aria-label="Back"
        >
          <Icon name="back" size={17} strokeWidth={1.8} />
        </Link>
        <div className="flex-1">
          <span className="eyebrow">{category.items.length} links</span>
          <h1 className="text-[28px] font-extrabold tracking-tightest text-ink mt-2.5 leading-none">
            {category.title}
          </h1>
          <p className="text-[12px] text-muted mt-2 font-medium">{category.blurb}</p>
        </div>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-2.5 stagger">
        {category.items.map((item) => {
          const disabled = !item.href;
          const Wrapper: any = disabled ? "div" : "a";
          return (
            <Wrapper
              key={item.label}
              {...(disabled ? {} : { href: item.href!, target: "_blank", rel: "noreferrer" })}
              className={`surface rounded-3xl px-5 py-4 flex items-center gap-3 animate-fade-up ${
                disabled ? "opacity-45" : "hover-lift"
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-bold tracking-tight text-ink">
                  {item.label}
                </div>
                <div className="text-[11px] text-muted truncate mt-0.5 font-medium">
                  {item.description}
                </div>
              </div>
              {disabled ? (
                <span className="eyebrow">Soon</span>
              ) : (
                <span className="w-8 h-8 rounded-full bg-brand-tint flex items-center justify-center text-brand flex-shrink-0">
                  <Icon name="arrow-up-right" size={15} strokeWidth={2.1} />
                </span>
              )}
            </Wrapper>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
}
