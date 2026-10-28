# Button

The chunky 3D pill that starts or restarts a round; one primary per screen.

## Variants
- **Primary** (`.ps-btn`): one Creepster word (`button` style) in `ink-on-pumpkin` on the pumpkin gradient (`pumpkin-light` → `pumpkin` → `pumpkin-dark`) with `shadow-button`. Add `.pulse` on the home screen only.
- **Secondary** (`.ps-btn.secondary`): Fredoka 600 (`button-secondary`) in `text` on `night-700`, `shadow-button-secondary`.

## Rules
- Width `min(100%, button-width)`, min height 60px (primary) / `tap-min` (secondary), `radius-pill`.
- Pressed state drops the button 4px and shrinks the lip — never a colour change.
- Labels are one or two words, sentence case in the markup (Creepster renders caps): "Play", "Play again", "Home".
- The consumer supplies the label and click handler; nothing else.
