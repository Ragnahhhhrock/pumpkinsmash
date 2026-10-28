Pumpkin Smash is a cartoon-spooky night: a deep violet sky, a warm moon, and one glowing jack-o'-lantern. Everything is chunky, rounded and tappable. Spooky, never scary; playful, never childish.

## Voice and copy

- Short, imperative, second person. Rules are verb + reward: "Tap it, +5". Danger says what to do: "Leave it".
- Sentence case in markup ("Play again", "High scores"). Creepster renders its own caps, so never type all-caps.
- Headlines are one to three words: "Pumpkin Smash", "Game over", "Combo x3!". Exclamation marks only on rewards.
- Tagline: "Smash the pumpkins before they hide." Credit, exactly: "Another Mal Gordon creation".
- Emoji are the game pieces and HUD icons (🎃 👻 🐈‍⬛ ❤️ 🔊 🥇). Use them as content, never as decoration in copy.

## Colour

- Ground is always `night-900`; full screens sit on the sky gradient `night-900` → `sky-low` → `sky-mid` → `sky-horizon`. There is no light theme.
- `pumpkin` is the brand: wordmark, primary button, Save. Put `ink-on-pumpkin` on any pumpkin, `ember`, `gold` or `coffee` fill — never white.
- Colour carries game meaning, consistently: `ember` = live numbers and headings; `gold` = rewards and "you"; `slime` = ghosts and extra life; `blood` = danger and Game Over. Pair `blood` with a word every time.
- Body text is `text`; secondary text is `muted`. Both pass 4.5:1 on `night-900` and on `glass`.
- Panels are `glass` with a 1px `line` border. Never a solid card without the hairline.
- Scenery (`hill`, `silhouette`, `stone`, `stone-dark`) is shape only and never holds text.

## Type

- Two families. `display` (Creepster) for the wordmark, headlines, the primary button, toasts, score pops, panel and stage headings. `ui` (Fredoka) for everything else.
- Creepster is always paired with a hard drop shadow: `shadow-wordmark` for pumpkin/ember/gold, `blood-shadow` for the Game Over headline.
- Numbers use Fredoka 700 with `font-variant-numeric: tabular-nums` (`score-hud`, `score-final`) so scores never jitter.
- Never set Creepster below 19px (`stage`) or in paragraphs.

## Layout and spacing

- Mobile first: one centred column, max `column` (520px), side gutter `space-6` or the safe-area inset, whichever is larger.
- Stack gap is `space-5`. Grids (crew, HUD) use `space-3`.
- Every control is at least `tap-min` (48px). Buttons cap at `button-width`; panels at `panel`.
- The board is a square 3×3 graveyard, `radius-board`, sized by the viewport height so it never scrolls.
- Under 700px tall: shrink the hero jack to 104px and hide the chip rule lines.

## Shape, depth and motion

- Radii are generous: `radius-lg` for chips and pills, `radius-xl` for panels, `radius-pill` for buttons.
- Depth comes from hard bottom lips (`shadow-button`, `shadow-button-secondary`, `shadow-coffee`) plus a soft coloured glow. Pressing moves the element down and shrinks the lip.
- Motion is ambient and slow (moon glow breathing, bats, fog, jack bob) or instant and punchy (critter pop in 110ms, smash bits, score pop). The Play button pulses on Home only.
- Respect `prefers-reduced-motion`: all animation and transitions off.

## Imagery and iconography

- The mark is the jack-o'-lantern (`Logos/jack.svg`): orange gourd, green stem and tendril, gold-lit triangle eyes and zigzag grin. Never recolour, outline or put it on a light ground.
- Favicon and app icons are the jack centred on a `plum` → `night-900` vignette with an orange glow.
- Scenery is flat CSS/SVG silhouettes: moon, stars, bats, witch, house, dead tree, fog, cobwebs. No photos, no gore.
- Share images (`Social/`) put the jack left and the wordmark right on the night scene, with the crew chips and the domain pill.

## Focus and accessibility

- Focus ring: 3px solid `ember`, 3px offset, on every interactive element.
- Every icon-only control has an `aria-label`; decorative scenery is `aria-hidden`.
