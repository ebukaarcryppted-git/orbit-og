# Orbit ØG

A premium mobile web app that puts the entire 0G Labs universe in your pocket.

Built for the [**Zero Cup** hackathon](https://0g.ai/blog/the-zero-cup).

---

## What's inside

- **Home** — Top announcements carousel + latest blog / Discord / X updates pulled from the 0g.ai newsroom
- **Community hub** — Develop · Ecosystem · Learn · Social grids with every official 0G link, plus About and Roadmap
- **Tracker** — Live 0G Mainnet dashboard with real-time block height, block time, gas price, TPS, and block fill (streamed via `evmrpc.0g.ai` JSON-RPC)
- **Wallet tracker** — Paste any EVM address for live balance, tx count and scanner deep-links from 0G Mainnet
- **Quick-link tiles** — Build, Launch app, Get ØG one-tap CTAs
- **PWA** — installable on iOS / Android home screens

## Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind
- Plus Jakarta Sans
- Live data from `https://evmrpc.0g.ai`

Open [OrbitOG Vercel link.](https://orbit-og.vercel.app)

## Core Features

1. **Onboarding**	- 3-slide intro with Panda astronaut hero, spring animations, "Enter the Universe" CTA
2. **Home Feed** - Live blog scraping from 0g.ai/blog, blended with curated Discord/X drops, auto-refreshes every 5 min
3. **Updates** - Full newsroom with All/Blog/Discord/X filter chips, deep-link to individual post pages
4. **Community Hub** - 6-card bento: Develop, About 0G, Ecosystem, Learn, Social, Roadmap
5. **0G Tracker** - Network tab (live block stats, TPS, gas) + Wallet tab (balance, transfers, ERC-20/721 detection)

## Key Decisions & Tradeoffs

- **No RSS Feed from 0g.ai** - 0G Labs doesn't publish an RSS feed. Solution: HTML scraping of the blog listing page with regex extraction for slug, title, and date.
- **No Public X/Discord API** - No free API for either platform. Solution: maintain a small curated list of significant announcements as static data with real ISO dates — relative timestamps stay accurate as time passes.
- **hub.0g.ai Analytics API Locked** - The xangle.io-backed analytics API requires private auth. Solution: build /api/network directly from the public evmrpc.0g.ai RPC, and deep-link out to hub.0g.ai for full analytics.
- **Wallet Staking = Cosmos Layer** - 0G's consensus/staking is Cosmos SDK, not EVM-readable. Solution: show all EVM data (balance, transfers, token/NFT contracts), and provide a deep-link CTA to explorer.0g.ai for staking details.
