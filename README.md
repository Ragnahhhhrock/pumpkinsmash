# Pumpkin Smash

A mobile-first Halloween game. Smash pumpkins, dodge black cats, climb the high score table.

Static site: `index.html` plus `music.mp3`. No build step.

## Deploy (Cloudflare Pages)

- Framework preset: None
- Build command: leave empty
- Build output directory: `/`
- Custom domain: pumpkinsmash.me

## Config

`COFFEE_URL` near the top of the script in `index.html` holds the Stripe Payment Link for the $5 coffee button. The button stays hidden until it is set.

## Design system and style guide

`design-system/` holds the brand: `README.md` (style guide), `tokens.json` / `tokens.css` (colours, type, spacing, radii, shadows), `components/` (guidelines and previews for each UI piece) and the self-hosted fonts (OFL).

## Metadata and share images

- `index.html` head: description, canonical, theme colour, Open Graph, Twitter/X card (`summary_large_image`) and VideoGame JSON-LD.
- `assets/brand/`: `og-image.png` (1200×630), `twitter-card.png` (1200×600), app icons, `jack.svg` master mark.
- `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml` at the root.
