# Styling & Theming

## Design Tokens

Single dark theme. Base vars in `src/styles/global.css`; per-route accents switch on `<html data-route>`:

```css
--bg: #08090D; --card: #10121B; --gridline: #232738;
--text: #F0F4F8; --muted: #7C849B;
html[data-route="projects"] { --accent: #00FF66; --accent-surface: #021A0E; }
/* … one row per route, see DESIGN.md §2 for the full table */
```

## Tailwind v4 Setup

Tailwind loads as a Vite plugin in `astro.config.mjs` — no PostCSS config, no `tailwind.config.js`. `global.css` maps runtime vars to utilities via `@theme inline`:

```css
@theme inline {
  --color-accent: var(--accent);
  --color-accentsurface: var(--accent-surface);
  /* … void/card/grid/ink/dim + font-display/punk/term */
}
```

This gives `text-accent`, `bg-accentsurface`, `border-accent`, `font-display`, etc. Accent overrides (palette/terminal) paint inline vars on `<html>` — same element the route rules target, so inline wins. Never paint `<body>`; route rules beat inheritance there (past silent no-op bug).

## Fonts

Three Google Fonts loads in `Layout.astro` head:

| Token | Font | Use |
|-------|------|-----|
| `font-display` | VT323 | Hero banners, AsciiHeader, badges, readouts |
| `font-punk` | Syne 700/800 | Card titles, section labels (uppercase) |
| `font-term` | JetBrains Mono | Body, prose, code (also `body` default) |

## Custom CSS Classes

All in `src/styles/global.css`:

| Class | Purpose |
|-------|---------|
| `.card` | Translucent dark card shell |
| `.halftone::after` | Dot overlay (cards + photos) |
| `.torn` | Jagged paper top edge (clip-path strip) |
| `.crt-overlay` | Fixed scanlines + vignette; hidden via `html[data-crt="off"]` |
| `.glitch` | Hover-only chromatic split on display titles; contained (`overflow: hidden`, wraps with text) |
| `.print-img` | Grayscale photo → color on hover |
| `.post-body` | Blog article typography (replaces the typography plugin — deliberately not installed) |
| `.sysnav` / `.sysctl` / `.nav-hint` | Desktop nav kill-switch: hidden on `md+` while `html[data-navbar="off"]`; mobile always visible |
| `.ascii-title` | Fluid `clamp()` display sizing |

Glitch/flicker/shake are display-only and hover-gated; body text never flickers. `prefers-reduced-motion` kills all animation/transition plus the glitch layers.

## Responsive

Standard Tailwind breakpoints only (`md: 768px` gates the desktop nav). The old 864px custom breakpoint is gone. Nav collapses to a full-width horizontal scroll strip on mobile.
