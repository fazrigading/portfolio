# Full Astro stack: Tailwind v4 + React islands + MDX + Lucide

Bare `astro ^7.1.0` starter can't build DESIGN.md v2 (6 MDX routes, terminal state, `Ctrl+K` palette, token theming). Decided: Tailwind v4 (`@theme` accent tokens), React islands (only `TerminalHero`, `CommandPalette`), MDX collections (projects/research/blog), Lucide + custom ASCII icons.

## Considered Options

- Lean (Astro + custom CSS + MDX, vanilla `client:` islands): less JS, but terminal/palette state hand-rolled.
- Bare (Astro only): kills MDX/blog/research scope the owner kept.

## Consequences

`npm i` adds tailwind, react, mdx integrations; all other components stay `.astro` static. No new frameworks without a new ADR.
