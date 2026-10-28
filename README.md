# Pumpkin Smash

A mobile-first Halloween game. Smash pumpkins, dodge black cats, climb the high score table.

Static site: `index.html` plus `music.mp3`. No build step. One Pages Function (`functions/api/smashes.js`) powers the global smash counter.

## Deploy (Cloudflare Pages)

- Framework preset: None
- Build command: leave empty
- Build output directory: `/`
- Custom domain: pumpkinsmash.me

## Global smash counter

The home screen shows the total pumpkins smashed by all players across all games. Each game reports its smashes (regular and golden pumpkins count 1 each) to `/api/smashes` at game over, or when the tab is closed mid-game. Unsent counts are queued in localStorage and retried on the next visit.

One-time setup in Cloudflare:

1. Workers & Pages → D1 → Create database (e.g. `pumpkinsmash`).
2. Pages project → Settings → Bindings → Add → D1 database: variable name `DB`, select that database (Production, and Preview if wanted).
3. Redeploy. The table is created automatically on first request.

Until the binding exists the API returns 503 and the counter stays hidden.

## Config

`COFFEE_URL` near the top of the script in `index.html` holds the Stripe Payment Link for the $5 coffee button. The button stays hidden until it is set.

## Design system and style guide

`design-system/` holds the brand: `README.md` (style guide), `tokens.json` / `tokens.css` (colours, type, spacing, radii, shadows), `components/` (guidelines and previews for each UI piece) and the self-hosted fonts (OFL).

## Metadata and share images

- `index.html` head: description, canonical, theme colour, Open Graph, Twitter/X card (`summary_large_image`) and VideoGame JSON-LD.
- `assets/brand/`: `og-image.png` (1200×630), `twitter-card.png` (1200×600), app icons, `jack.svg` master mark.
- `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml` at the root.
