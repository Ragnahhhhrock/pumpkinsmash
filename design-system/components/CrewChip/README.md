# CrewChip

Glass tile that teaches one game piece: emoji face, name, and the rule.

## Variants by border
`good` pumpkin 50%, `gold` gold 60%, `ghost` slime 50%, `bad` blood 60% (its rule text in `blood-soft`).

## Rules
- Glass fill, `line` border tinted per variant, `radius-lg`, grid `minmax(74px, 1fr)` with `space-3` gaps.
- Rule text is the verb plus the reward: "Tap it, +5". Danger says what to do, not just the colour: "Leave it".
- Hide the rule line (`small`) when the viewport is under 700px tall.
