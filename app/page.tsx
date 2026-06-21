"use client";

import Link from "next/link";
import { useState } from "react";
import PandaHero from "@/components/PandaHero";
import Icon, { IconName } from "@/components/Icon";

type Slide = {
  type: "panda" | "icon";
  icon?: IconName;
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
};

const slides: Slide[] = [
  {
    type: "panda",
    eyebrow: "Welcome",
    title: "Your gateway to",
    highlight: "ØG Labs",
    body: "Projects, news, tools, and community — the entire 0G universe in one premium place.",
  },
  {
    type: "icon",
    icon: "globe",
    eyebrow: "Explore",
    title: "The decentralized",
    highlight: "AI ecosystem",
    body: "300+ partners and a live mainnet building the operating system for on-chain AI.",
  },
  {
    type: "icon",
    icon: "feed",
    eyebrow: "Stay current",
    title: "Never miss a",
    highlight: "single drop",
    body: "Blog posts, Discord announcements, and X updates — aggregated and readable in-app.",
  },
];

export default function OnboardingPage() {
  const [i, setI] = useState(0);
  const last = i === slides.length - 1;
  const slide = slides[i];

  return (
    <div className="min-h-[100dvh] flex flex-col px-6 pt-14 pb-9 bg-white">
      <div className="flex justify-between items-center animate-fade-in">
        <div className="text-sm font-extrabold tracking-tight text-ink">
          ØG<span className="text-brand">Hub</span>
        </div>
        {!last && (
          <Link href="/home" className="press text-xs font-bold text-muted">
            Skip
          </Link>
        )}
      </div>

      <div className="flex-1 flex flex-col items-center justify-center" key={i}>
        <div className="mb-10 animate-scale-in">
          {slide.type === "panda" ? (
            <PandaHero size={236} />
          ) : (
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center text-brand animate-float"
              style={{ border: "1px solid var(--line)" }}
            >
              <Icon name={slide.icon!} size={62} strokeWidth={1.4} />
            </div>
          )}
        </div>

        <div className="text-center animate-fade-up" style={{ animationDelay: "0.12s" }}>
          <span className="eyebrow mb-4">{slide.eyebrow}</span>
          <h1 className="mt-4 text-[34px] font-extrabold tracking-tightest text-ink leading-[1.05]">
            {slide.title}
            <br />
            <span className="text-brand">{slide.highlight}</span>
          </h1>
          <p className="mt-4 text-[14px] text-body leading-relaxed max-w-[300px] mx-auto">
            {slide.body}
          </p>
        </div>
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "0.24s" }}>
        <div className="flex justify-center gap-2 mb-7">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ease-spring ${
                idx === i ? "w-7 bg-brand" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>

        {last ? (
          <Link
            href="/home"
            className="magnet group flex w-full bg-brand text-white rounded-full pl-7 pr-2 py-2 items-center justify-between font-bold text-[15px]"
          >
            Enter the Hub
            <span className="magnet-icon w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="arrow-up-right" size={18} strokeWidth={2.2} />
            </span>
          </Link>
        ) : (
          <button
            onClick={() => setI(i + 1)}
            className="magnet group flex w-full bg-brand text-white rounded-full pl-7 pr-2 py-2 items-center justify-between font-bold text-[15px]"
          >
            Continue
            <span className="magnet-icon w-11 h-11 rounded-full bg-white/15 flex items-center justify-center">
              <Icon name="chevron-right" size={18} strokeWidth={2.2} />
            </span>
          </button>
        )}

        {i > 0 && !last && (
          <button
            onClick={() => setI(i - 1)}
            className="press block w-full text-xs text-muted font-bold mt-3.5"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}
