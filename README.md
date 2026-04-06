# Mini Carlo

A pixel-art interactive web date game. A chaotic narrator named "Mini Carlo" guides a player through a real-world date itinerary with coffee, activities, and dinner stages.

Built with React + Vite + TypeScript. Deployed to GitHub Pages.

## Getting Started

```bash
pnpm install
pnpm dev
```

## Build & Deploy

```bash
pnpm build
```

Deploys automatically to GitHub Pages via GitHub Actions on push to `main`.

## Pre-Date Checklist

Before the actual date, update these:

- [ ] **Quiz answers** — Edit `src/content/quizConfig.ts`
  - What did Carlo order? (correct answer + options)
  - What is Carlo's favorite color? (correct answer + options)
  - How old is Carlo? (correct answer + options)
- [ ] **Payment proof screenshot** — Replace `public/assets/fake-payment-proof.png` with your real screenshot
- [ ] **Smiski coupon image** — Replace `public/assets/smiski-coupon.png` with your real coupon image
- [ ] **GitHub Pages base path** — Verify `base` in `vite.config.ts` matches your repo name (`/mini-carlo/`)
- [ ] **Deploy** — Push to `main` and enable GitHub Pages (Settings > Pages > Source: GitHub Actions)
- [ ] **Test on phone** — Open the deployed URL on mobile Safari/Chrome and do a full playthrough
- [ ] **Clear localStorage** — Reset any test progress before the date (use the restart button or clear browser data)

## Tech Stack

- React 19 + TypeScript
- Vite 8
- IndexedDB (local photo storage)
- Press Start 2P pixel font (self-hosted)
- GitHub Pages (static hosting)
