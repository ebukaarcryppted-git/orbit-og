import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6d28d9",
          press: "#5b21b6",
          tint: "#f4f0fd",
          soft: "#e7ddf9",
        },
        purple: {
          mid: "#6d28d9",
          bright: "#6d28d9",
          glow: "#6d28d9",
        },
        ink: "#15111f",
        body: "#3c3550",
        muted: "#928aa3",
        line: "#ecebf1",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "26px",
      },
      transitionTimingFunction: {
        ease: "cubic-bezier(0.32, 0.72, 0, 1)",
        spring: "cubic-bezier(0.34, 1.4, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
