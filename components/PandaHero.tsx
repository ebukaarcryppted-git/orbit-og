"use client";

import { useState } from "react";

export default function PandaHero({ size = 280 }: { size?: number }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative" style={{ width: size, height: size }} aria-hidden>
      {/* concentric flat ring — no shadow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid var(--line)" }}
      />
      <div
        className="absolute rounded-full"
        style={{ inset: 14, border: "1px solid var(--brand-soft)" }}
      />

      <div className="absolute rounded-full overflow-hidden animate-float" style={{ inset: 22 }}>
        {!error ? (
          <img
            src="/og-panda.png"
            alt="0G astronaut panda"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}

        {(!loaded || error) && (
          <div
            className="absolute inset-0 flex items-center justify-center text-white font-extrabold"
            style={{ background: "var(--brand)", fontSize: size * 0.28 }}
          >
            ØG
          </div>
        )}
      </div>
    </div>
  );
}
