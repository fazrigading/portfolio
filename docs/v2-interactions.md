# V2 Interactions (deferred from DESIGN.md v1)

Build only after v1 ships. Each item lists trigger, behavior, constraints. Motion-gating (`prefers-reduced-motion` disables all below) and contrast rules from DESIGN.md §1 apply throughout.

## 1. Web Audio 8-bit bleeps

- **Trigger:** keypress in `TerminalHero` / contact comms form, palette open/close, `[MESSAGE_TRANSMITTED]` confirm.
- **Behavior:** vanilla Web Audio oscillators only (square/triangle, short envelopes). No audio assets. Global mute toggle in `SystemBar`, persisted `localStorage`, default ON but silent until first user gesture (autoplay policy).
- **Out of scope:** background music, per-route themes.

## 2. Screen-shake + chromatic aberration

- **Trigger:** hover on `ZineCard` / `HalftoneImage` only, max 200ms momentary.
- **Behavior:** CSS keyframes: `translate` ≤2px + `::before/::after` red/cyan offset. Never on body text, never on load, never loops.
- **Constraint:** disabled entirely under `prefers-reduced-motion`; no JS-driven shake.

## 3. Retro error popups

- **Trigger:** easter eggs only (`goto null`, `sudo` in terminal, Konami-style sequence in palette). Never on normal navigation or link clicks.
- **Behavior:** `RetroWindow` modal (`[SITE_UNAVAILABLE]`, `[FIREWALL_BYPASSED]`), dismiss via `X` / `Esc` / backdrop. Max one at a time, no queue.
- **Out of scope:** blocking confirms, marketing modals.

## 4. Load text-scramble

- **Trigger:** `AsciiHeader` on first paint per route only (not on re-render).
- **Behavior:** chars decrypt from hex/binary to plain, ≤600ms, single run. Skipped if reduced-motion.
- **Out of scope:** body copy scramble, scroll-triggered scramble.

## 5. Research NodeGraph Canvas

- **Trigger:** `/research` section render, static `ArchiveList` stays primary; graph is progressive enhancement.
- **Behavior:** lightweight Canvas (no lib): nodes = `category` + `dataset_tags` from research frontmatter, edges = shared tags. Hover highlights neighbors. Static SVG/noscript fallback with same nodes.
- **Constraint:** no layout animation loop when idle; pause offscreen via IntersectionObserver.
