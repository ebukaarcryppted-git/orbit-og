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

## Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Deploy to Vercel

1. Push this repo to GitHub
2. Visit <https://vercel.com/new>, select the repo
3. Framework preset: **Next.js** (auto-detected)
4. No env vars needed
5. Click **Deploy** — first build is ~60 seconds

## API routes

| Route | Source | Notes |
|---|---|---|
| `GET /api/network` | `evmrpc.0g.ai` | Aggregated mainnet metrics: block, TPS, gas, fill % |
| `GET /api/wallet?address=0x…` | `evmrpc.0g.ai` | Balance, tx count, current block for an EVM address |
