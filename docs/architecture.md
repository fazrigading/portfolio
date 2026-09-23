# Architecture

## Overview

Static multipage portfolio built with **Astro 7 + TypeScript 5.8**. No router, no client framework by default — pages are zero-JS `.astro` except two React islands. Design contract lives in `DESIGN.md`; ADRs in `docs/adr/`.

## Request Flow

```
request → dist/<route>/index.html (pre-rendered)
  Layout.astro: <html data-route data-crt data-navbar> + head pref restore
  ├─ SystemBar.astro (static; nav gated by data-navbar on desktop)
  ├─ page composition (ZineCard / RetroWindow / …)
  ├─ footer (profile + socials)
  ├─ CRTOverlay.astro (CSS only)
  └─ CommandPalette.tsx (client:idle island)
`/` also mounts TerminalHero.tsx (client:load island)
```

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | `base: '/portfolio/'`, react + mdx integrations, Shiki `github-dark`, Tailwind Vite plugin |
| `src/content.config.ts` | MDX collection schemas (projects / research / blog) |
| `src/layouts/Layout.astro` | Shell: fonts, meta, pref restore script, SystemBar, footer, CRT, palette |
| `src/components/commands.ts` | **Single command registry** — every terminal verb + palette item. Edit here, never in the islands |
| `src/components/*Pref.ts` | `localStorage`-backed prefs: `crtPref` (`dedsec-crt`), `navbarPref` (`dedsec-navbar`), `accentPref` (`dedsec-accent`) |
| `src/components/slug.ts` | `slugify()` shared by home, projects index, `projects/[...slug]` |
| `src/components/LucideIcon.astro` | Static lucide-react render — must pass `className`, React drops `class` |
| `src/pages/*` | 8 routes (12 pages with `projects/[...slug]` + `blog/[...slug]`) |
| `public/txt/*.txt` | Dossier files served statically for terminal `cat` |

## State Management

No store. Three persisted prefs (`*Pref.ts`, restored pre-paint in `Layout` head script) plus local island state (`TerminalHero` lines/input, palette open/query/selection). Server-rendered HTML never depends on prefs — CSS attribute gates (`data-crt`, `data-navbar`) apply them.

## Data Layer

Page content is JSON in `src/data/` (see [data-guide.md](./data-guide.md)); blog posts are MDX in `src/content/blog/`. Projects/research pages read JSON today — the typed MDX collections exist for migration when entries outgrow JSON.

## Styling

Tailwind v4 with `@theme inline` tokens mapped to CSS vars; per-route accents via `<html data-route>` (see [styling.md](./styling.md)). No dark/light toggle — single dark theme.

## Build

- **Output:** static `dist/` (12 pages), deployed to GitHub Pages sub-path `/portfolio/`
- **Links:** always prefix with `import.meta.env.BASE_URL` — root-absolute links 404 in production
- **Images:** imported assets hashed by Astro (`src/data/*.webp`); remote stat badges lazy + self-hiding on error
