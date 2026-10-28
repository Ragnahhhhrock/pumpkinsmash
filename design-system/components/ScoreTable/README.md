# ScoreTable

Local high-score list shown on Home and Game Over.

## Rules
- Glass panel, `radius-xl`, max width `panel`. Heading in `section` style, `ember`.
- Rows: rank / name / points grid; points in `ember` 700 tabular. Ranks 1–3 use 🥇🥈🥉, then numbers in `muted`.
- The just-saved row gets `.me`: `gold` text on a gold-to-transparent wash, `radius-sm`.
- Names are capped at 10 characters and ellipsised. Empty state: "No scores yet. Play a round to claim first place." in `muted`.
