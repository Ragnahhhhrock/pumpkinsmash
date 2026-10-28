# Hud

The in-game heads-up row: score, lives, best, mute, with the stage name under it.

## Rules
- Four columns `1fr auto 1fr auto`, `space-3` gap. Pills are glass with `radius-lg`.
- Labels use `caption` in `muted`; values use `score-hud` with tabular numerals. Score is `ember` with glow; best is right-aligned `text`.
- Lost hearts stay in place, greyed (`grayscale(1) brightness(.45)`), so the count never reflows.
- The mute button is `tap-min` wide and always has an `aria-label`.
- Stage name: `stage` style in `ember`.
