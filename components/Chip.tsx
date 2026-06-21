"use client";

import { ReactNode } from "react";

export default function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`press flex-shrink-0 rounded-full px-4 py-2 text-[12px] font-bold whitespace-nowrap transition-colors duration-300 ${
        active
          ? "bg-brand text-white"
          : "bg-white border border-line text-muted hover:text-ink hover:border-brand-soft"
      }`}
    >
      {children}
    </button>
  );
}
