# Styling & Theming

## Design Tokens

All colors are defined as CSS custom properties in `src/index.css` under `@layer base`. Two themes are supported via the `.dark` class on `<html>`:

### Light (default)

```css
--brand-primary: #1c1917    /* Main text */
--brand-secondary: #78716c  /* Muted text */
--brand-accent: #0a578a     /* Accent/links */
--brand-bg: #fcfaf7         /* Page background */
--brand-border: #e7e2de     /* Borders */
--brand-muted: #f4f0ec      /* Card backgrounds */
--brand-nav: rgba(252, 250, 247, 0.82)  /* Nav backdrop */
```

### Dark

```css
--brand-primary: #e7e5e4
--brand-secondary: #a8a29e
--brand-accent: #2395ff
--brand-bg: #0c0a09
--brand-border: #292524
--brand-muted: #1c1917
--brand-nav: rgba(12, 10, 9, 0.82)
```

To change colors, edit the values in `src/index.css` — both the `:root` and `.dark` blocks.

## Tailwind v4 Setup

This project uses **Tailwind CSS v4** loaded as a Vite plugin (`@tailwindcss/vite`). There is no `postcss.config.js` or `tailwind.config.js`.

Configuration lives in `src/index.css`:

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
  --font-serif: "Playfair Display", serif;

  --color-brand-primary: var(--brand-primary);
  --color-brand-secondary: var(--brand-secondary);
  --color-brand-accent: var(--brand-accent);
  --color-brand-bg: var(--brand-bg);
  --color-brand-border: var(--brand-border);
  --color-brand-muted: var(--brand-muted);
}
```

This registers `text-brand-primary`, `bg-brand-bg`, etc. as valid Tailwind utilities that respond to theme changes.

## Fonts

Loaded via Google Fonts in `index.css`:

| Token | Font | Weights |
|-------|------|---------|
| `font-sans` | Inter | 300–700 |
| `font-mono` | JetBrains Mono | 400, 500 |
| `font-serif` | Playfair Display | 400, 700, italic 400 |

## Custom CSS Classes

Defined in `src/index.css` after the Tailwind import:

| Class | Purpose |
|-------|---------|
| `.glass-panel` | Frosted glass card: `bg-brand-muted/50 backdrop-blur-md border border-brand-border` |
| `.text-gradient` | Gradient text effect (white fade) |
| `.mono-label` | Monospace uppercase label styling |
| `.custom-scrollbar` | Thin 4px scrollbar with accent color |
| `.bg-dot-grid` | Dot grid background pattern |
| `.bg-noise` | SVG noise texture overlay |
| `.scanline` | CRT-style scanline effect |
| `.animate-gradient` | Slow gradient background animation |
| `.desktop-nav` / `.mobile-nav` | Nav visibility toggle (864px breakpoint) |

## Theme Toggle

The `theme` state in `App.tsx` toggles the `.dark` class on `<html>` and persists to `localStorage`. The toggle button uses Lucide's `Sun`/`Moon` icons.

## Responsive Breakpoints

Standard Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`) plus one custom breakpoint:

- **864px** — Nav switches between desktop/mobile layout (defined in `index.css` as a media query on `.desktop-nav` / `.mobile-nav`)

## Animation Library

Uses `motion/react` (v12) — import from `motion/react`, **not** `framer-motion`.

Key patterns:
- `AnimatePresence` with `mode="popLayout"` for filter transitions
- `layout` prop on `motion.div` for automatic layout animations
- `layoutScroll` on scroll containers for correct layout measurement
- `useScroll` + `useSpring` for scroll progress bar
- Avoid `transition-all` on elements with `layout` — use `transition-colors` instead (see [experience-animation-fix.md](./fixes/experience-animation-fix.md))