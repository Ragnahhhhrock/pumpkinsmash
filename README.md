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
