export type UpdateSource = "blog" | "discord" | "x" | "github";

export type Update = {
  id: string;
  source: UpdateSource;
  sourceLabel: string;
  sourceHandle: string;
  title: string;
  date: string; // ISO
  dateLabel: string;
  relative: string;
  summary: string;
  body: string[];
  externalUrl: string;
  tags: string[];
};

export const updates: Update[] = [
  {
    id: "glm-5-2-live-on-0g",
    source: "blog",
    sourceLabel: "Blog Post",
    sourceHandle: "0g.ai/blog",
    title: "GLM-5.2 is live on 0G",
    date: "2026-06-17",
    dateLabel: "June 17, 2026",
    relative: "3 days ago",
    summary:
      "GLM-5.2 — the latest open-weight reasoning model from Zhipu AI — is now available for verifiable inference on 0G Compute.",
    body: [
      "GLM-5.2 has officially gone live on 0G Compute, joining our growing roster of open-weight frontier models that builders can call directly from their on-chain applications.",
      "With GLM-5.2 you get a state-of-the-art reasoning model running inside the 0G TEE-secured compute layer — every inference is cryptographically attested, so downstream contracts can trust the output without a third-party oracle.",
      "Pricing follows the same per-token model as our other deployments and works out of the box with the 0G SDK. Drop the model id into your inference call and you're done.",
      "This is the third major model addition to 0G Compute this quarter, following Qwen 3.7 Max and DeepSeek V4 Pro.",
    ],
    externalUrl: "https://0g.ai/blog/glm-5-2-live-on-0g",
    tags: ["AI", "Compute", "GLM"],
  },
  {
    id: "zero-cup-hackathon",
    source: "blog",
    sourceLabel: "Blog Post",
    sourceHandle: "0g.ai/blog",
    title: "The Zero Cup: 0G's Global Vibe Coding Tournament",
    date: "2026-06-15",
    dateLabel: "June 15, 2026",
    relative: "5 days ago",
    summary:
      "0G's online, global vibe coding tournament. No prior coding required — ship an app, agent, companion, or game on 0G Studio and compete for a share of a $17,000 prize pool.",
    body: [
      "The Zero Cup is 0G's online, global vibe coding tournament — a World Cup-style single-knockout bracket for founders, creators, students, developers, and anyone sitting on one good idea. No prior coding experience required.",
      "Submissions are open from June 15 to June 23. The top 32 entries advance on June 27, the top 8 are announced on July 7 when community voting opens, and the champion is crowned on July 19.",
      "What to ship: apps, agents, companions, or games — built on 0G using 0G Studio, with a live preview that runs entirely in the browser and one-click deployment.",
      "Prize pool: $17,000 total. Champion takes $8,500, runner-up gets $3,500, third and fourth places get $1,500 each, and fifth through eighth places each receive $500.",
      "Register at 0g.ai/arena/zero-cup with your 0G Builder Profile.",
    ],
    externalUrl: "https://0g.ai/blog/the-zero-cup",
    tags: ["Hackathon", "Zero Cup", "Vibe Coding"],
  },
  {
    id: "qwen-37-max-launch-discord",
    source: "discord",
    sourceLabel: "Discord Announcement",
    sourceHandle: "discord.gg/0glabs · #announcements",
    title: "Qwen 3.7 Max is now serving requests — try it tonight",
    date: "2026-06-09",
    dateLabel: "June 9, 2026",
    relative: "11 days ago",
    summary:
      "Pinged the community: Qwen 3.7 Max is live on 0G Private Computer. Open the playground and ship something tonight.",
    body: [
      "Hey @everyone — Qwen 3.7 Max just went live on 0G Private Computer about 20 minutes ago. You can call it from the SDK using the model id `qwen-3.7-max` right now.",
      "For folks who want to kick the tires before integrating: head to the builder playground at hub.0g.ai, paste a prompt, and you'll see verifiable inference logs in real time.",
      "Office hours tomorrow at 16:00 UTC in the voice channel — bring your benchmarks and questions. We'll be comparing latency vs the GLM and DeepSeek deployments.",
      "Big thanks to the Alibaba Cloud team for shipping this alongside us. The full technical breakdown is on the blog.",
    ],
    externalUrl: "https://0g.ai/blog/qwen-3-7-max-live-on-0g",
    tags: ["Discord", "Qwen", "Compute"],
  },
  {
    id: "alibaba-cloud-qwen-onchain",
    source: "blog",
    sourceLabel: "Blog Post",
    sourceHandle: "0g.ai/blog",
    title: "0G to make Alibaba's Qwen models accessible to AI agents via blockchain",
    date: "2026-06-03",
    dateLabel: "June 3, 2026",
    relative: "17 days ago",
    summary:
      "Strategic integration brings Alibaba Cloud's Qwen family directly on-chain — AI agents on 0G can now call frontier Chinese models with verifiable outputs.",
    body: [
      "Today we're announcing a deep technical integration with Alibaba Cloud that brings the full Qwen model family — including Qwen-Max, Qwen-Plus, and the upcoming Qwen-Vision line — natively into the 0G compute layer.",
      "For the first time, AI agents living entirely on-chain can call a top-tier closed-source-quality model and get back a cryptographically signed result, all without a centralized inference API in the trust path.",
      "This unlocks a category of applications that simply weren't viable before: autonomous trading agents, on-chain copilots, verifiable RAG over decentralized storage, and a lot more.",
      "Qwen 3.7 Max is the first model in the family to ship; the rest of the catalog follows over the next two months.",
    ],
    externalUrl: "https://0g.ai/blog/alibaba-cloud-qwen-onchain",
    tags: ["Partnership", "Alibaba", "Qwen"],
  },
  {
    id: "0g-builder-hub-spotlight",
    source: "blog",
    sourceLabel: "Blog Post",
    sourceHandle: "0g.ai/blog",
    title: "Inside the rebuilt 0G Builder Hub",
    date: "2026-06-03",
    dateLabel: "June 3, 2026",
    relative: "17 days ago",
    summary:
      "A tour of the new Builder Hub — model catalog, SDK explorer, inference playground, and one-click deploy to mainnet.",
    body: [
      "We rebuilt the 0G Builder Hub from the ground up, and the result is a single workspace where you can go from idea to a deployed AI agent in well under an hour.",
      "Highlights: a live model catalog with latency / cost / capability comparisons, an interactive SDK explorer that generates working snippets in TypeScript and Rust, a no-account-needed inference playground, and a deploy button that ships your contract to mainnet from the same screen.",
      "Everything is wired to the 0G testnet by default — flip a switch to point at mainnet when you're ready.",
      "Open it at hub.0g.ai and tell us what's missing.",
    ],
    externalUrl: "https://0g.ai/blog/0g-builder-hub-spotlight",
    tags: ["Tools", "Builder Hub"],
  },
  {
    id: "consensus-miami-2026-recap",
    source: "blog",
    sourceLabel: "Blog Post",
    sourceHandle: "0g.ai/blog",
    title: "Consensus Miami 2026 Recap: A Week of Building with 0G",
    date: "2026-05-28",
    dateLabel: "May 28, 2026",
    relative: "23 days ago",
    summary:
      "Recap of 0G's keynote, the on-stage Qwen demo, and our partner builder lounge from Consensus Miami 2026.",
    body: [
      "Consensus Miami 2026 wrapped up last week and 0G had its biggest presence at the show yet. Here's what happened.",
      "The Tuesday keynote covered the September mainnet milestone, the 28M+ block production milestone, and our roadmap for verifiable AI through 2027. Recording is on YouTube.",
      "We demoed the Qwen integration live on stage — first time an on-chain agent has called a tier-1 Chinese model in front of a crowd. The room reacted exactly how you'd hope.",
      "Our builder lounge hosted 600+ developers across three days. Workshop materials and SDK starter kits are now public.",
    ],
    externalUrl: "https://0g.ai/blog/consensus-miami-2026-recap",
    tags: ["Events", "Consensus", "Recap"],
  },
  {
    id: "mainnet-milestone-x",
    source: "x",
    sourceLabel: "X Post",
    sourceHandle: "@0G_labs",
    title: "28M blocks. 346K accounts. 300+ partners. Mainnet is humming.",
    date: "2026-05-20",
    dateLabel: "May 20, 2026",
    relative: "1 month ago",
    summary:
      "Stat snapshot from @0G_labs: mainnet health update with a fresh batch of ecosystem numbers.",
    body: [
      "GM. Quick mainnet health check 🟢",
      "0G Mainnet — online since September 2025",
      "→ 28M+ blocks produced",
      "→ 11K+ peak TPS per shard",
      "→ 346K+ unique accounts",
      "→ 300+ ecosystem partners now integrated",
      "Every one of these numbers is verifiable on-chain right now. No marketing fluff. Open chainscan.0g.ai and check.",
      "Decentralized AI is here. Build something.",
    ],
    externalUrl: "https://x.com/0G_labs",
    tags: ["X", "Mainnet", "Stats"],
  },
  {
    id: "deepseek-v4-pro-live",
    source: "blog",
    sourceLabel: "Blog Post",
    sourceHandle: "0g.ai/blog",
    title: "DeepSeek V4 Pro is live on 0G Private Computer",
    date: "2026-05-15",
    dateLabel: "May 15, 2026",
    relative: "1 month ago",
    summary:
      "DeepSeek's V4 Pro model is now serving verifiable inference requests on 0G's private compute layer.",
    body: [
      "DeepSeek V4 Pro just went live on 0G Private Computer, giving builders access to one of the strongest open-source reasoning models available anywhere.",
      "Like our other deployments, V4 Pro runs inside the 0G TEE-secured environment — outputs are cryptographically attested so downstream smart contracts can rely on them without trusting a centralized API.",
      "Throughput on the V4 Pro deployment averages 38 tokens/sec at p50 latency under 900ms — good enough for the majority of agentic workloads we see today.",
      "Drop the model id `deepseek-v4-pro` into your SDK call to start using it.",
    ],
    externalUrl: "https://0g.ai/blog/deepseek-v4-pro-live-on-0g-private-computer",
    tags: ["AI", "DeepSeek", "Compute"],
  },
];

export function getUpdate(id: string): Update | undefined {
  return updates.find((u) => u.id === id);
}

export const sourceStyles: Record<UpdateSource, { bg: string; text: string; label: string }> = {
  blog: { bg: "#6d28d9", text: "#ffffff", label: "Blog Post" },
  discord: { bg: "#5865f2", text: "#ffffff", label: "Discord Announcement" },
  x: { bg: "#15111f", text: "#ffffff", label: "X Post" },
  github: { bg: "#15111f", text: "#ffffff", label: "GitHub Update" },
};
