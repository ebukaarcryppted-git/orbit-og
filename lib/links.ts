export type LinkItem = {
  text: string;
  label: string;
  href: string | null;
  description?: string;
};

export type CategoryKey = "develop" | "ecosystem" | "learn" | "social";

export type Category = {
  key: CategoryKey;
  title: string;
  blurb: string;
  items: LinkItem[];
};

export const categories: Record<CategoryKey, Category> = {
  develop: {
    key: "develop",
    title: "Develop",
    blurb: "Everything builders need to ship on 0G.",
    items: [
      { text: "TN", label: "Testnet",
        description: "Connect to the 0G testnet",
        href: "https://docs.0g.ai/developer-hub/testnet/testnet-overview" },
      { text: "FC", label: "Faucet",
        description: "Claim testnet tokens",
        href: "https://faucet.0g.ai/" },
      { text: "DC", label: "Docs",
        description: "Developer documentation",
        href: "https://docs.0g.ai/" },
      { text: "SS", label: "Storage Scan",
        description: "Explore stored data on 0G",
        href: "https://storagescan.0g.ai/" },
      { text: "CS", label: "Chain Scan",
        description: "Inspect chain transactions",
        href: "https://chainscan.0g.ai/" },
      { text: "EX", label: "Explorer",
        description: "Full network explorer",
        href: "https://explorer.0g.ai/" },
    ],
  },
  ecosystem: {
    key: "ecosystem",
    title: "Ecosystem",
    blurb: "Programs, partners, and resources.",
    items: [
      { text: "AC", label: "Accelerator",
        description: "Builder accelerator program",
        href: "https://0g.ai/accelerator" },
      { text: "PT", label: "Partner",
        description: "Browse 0G partner integrations",
        href: "https://0g.ai/partners" },
      { text: "PR", label: "Press",
        description: "Press releases and media",
        href: "https://0g.ai/press" },
      { text: "CT", label: "Contact",
        description: "Get in touch with the team",
        href: "https://0g.ai/contact" },
      { text: "BK", label: "Brand Kit",
        description: "Logos, colors, guidelines",
        href: "https://0g.ai/brandkit" },
      { text: "EF", label: "Ecosystem Fund",
        description: "0G Foundation growth fund",
        href: "https://0gfoundation.ai/" },
    ],
  },
  learn: {
    key: "learn",
    title: "Learn",
    blurb: "Get up to speed on the ØG ecosystem.",
    items: [
      { text: "BG", label: "Blog",
        description: "News, announcements, deep dives",
        href: "https://0g.ai/blog" },
      { text: "PD", label: "Product",
        description: "Explore the 0G product suite",
        href: "https://0g.ai/product" },
      { text: "AM", label: "AMAs",
        description: "Recorded ask-me-anything sessions",
        href: "https://0g.ai/ama" },
      { text: "FQ", label: "FAQs",
        description: "Common questions answered",
        href: "https://0g.ai/faq" },
      { text: "WP", label: "Whitepaper",
        description: "The technical foundation of 0G",
        href: "https://cdn.jsdelivr.net/gh/0glabs/0g-doc/static/whitepaper.pdf" },
      { text: "ND", label: "Node Disclaimer",
        description: "Operating a 0G node",
        href: "https://0g.ai/disclaimer" },
      { text: "PV", label: "Privacy",
        description: "How your data is handled",
        href: "https://0g.ai/privacy-policy" },
      { text: "TM", label: "Terms",
        description: "Platform usage terms",
        href: "https://0g.ai/terms-of-service" },
    ],
  },
  social: {
    key: "social",
    title: "Social",
    blurb: "Official channels — pick where to connect.",
    items: [
      { text: "DC", label: "Discord",
        description: "discord.gg/0glabs",
        href: "https://discord.gg/0glabs" },
      { text: "X", label: "X / Twitter",
        description: "@0G_labs",
        href: "https://x.com/0G_labs" },
      { text: "GH", label: "GitHub",
        description: "github.com/0glabs",
        href: "https://github.com/0glabs" },
      { text: "WB", label: "Website",
        description: "0g.ai",
        href: "https://0g.ai" },
      { text: "CT", label: "Contact",
        description: "Get in touch with the team",
        href: "https://0g.ai/contact" },
      { text: "LI", label: "LinkedIn",
        description: "linkedin.com/company/0g-labs",
        href: "https://www.linkedin.com/company/0g-labs/" },
      { text: "TG", label: "Telegram",
        description: "t.me/web3_0glabs",
        href: "https://t.me/web3_0glabs" },
      { text: "RD", label: "Reddit",
        description: "reddit.com/r/0GLabs",
        href: "https://www.reddit.com/r/0GLabs/" },
      { text: "YT", label: "YouTube",
        description: "youtube.com/@0G_Labs",
        href: "https://www.youtube.com/@0G_Labs" },
    ],
  },
};
