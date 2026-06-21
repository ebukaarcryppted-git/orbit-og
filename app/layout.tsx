import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OrbitØG — The 0G Mainnet in one app",
  description:
    "Orbit the 0G Labs universe. Live mainnet tracker, wallet insights, ecosystem links, blog & community — all in one premium mobile app.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OrbitØG",
  },
};

export const viewport: Viewport = {
  themeColor: "#6d28d9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body>
        <div className="min-h-screen w-full flex justify-center bg-white">
          <div className="w-full max-w-md min-h-screen relative bg-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
