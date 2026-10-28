# Pumpkin Smash

A mobile-first Halloween game. Smash pumpkins, dodge black cats, climb the high score table.

Static site: `index.html` plus `music.mp3`. No build step. Pages Functions power the global smash counter (`functions/api/smashes.js`) and the world high score table (`functions/api/scores.js`).

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

## World high score table

`functions/api/scores.js` stores every submitted score in the same D1 database (`DB` binding, `scores` table created automatically).

- `GET /api/scores?limit=10` → `{ scores: [{ name, score, date }] }`
- `POST /api/scores { name, score }` → `{ rank, entry, scores }`. Names are cleaned and cut to 10 characters; scores must be 1–1,000,000; 6 submissions per IP per minute.

The home and game-over tables show "World high scores" when the API answers, otherwise the device's local top 10. Failed submissions queue in localStorage and retry on the next visit. Personal best (HUD) stays on the device.

## Config

`COFFEE_URL` near the top of the script in `index.html` holds the Stripe Payment Link for the $5 coffee button. The button stays hidden until it is set.

## Design system and style guide

`design-system/` holds the brand: `README.md` (style guide), `tokens.json` / `tokens.css` (colours, type, spacing, radii, shadows), `components/` (guidelines and previews for each UI piece) and the self-hosted fonts (OFL).

## Metadata and share images

- `index.html` head: description, canonical, theme colour, Open Graph, Twitter/X card (`summary_large_image`) and VideoGame JSON-LD.
- `assets/brand/`: `og-image.png` (1200×630), `twitter-card.png` (1200×600), app icons, `jack.svg` master mark.
- `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml` at the root.
