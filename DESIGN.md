# DESIGN.md - Two-World Portfolio Design System

One homepage, two complete grammars: an editorial Professional zone (`/pro/*`) and a DedSec terminal Personal zone (`/dev/*`). Split-scroll doorway on `/` sends the visitor into whichever world they choose. Design tokens, route accents, fonts, content schemas, and component catalog. Terms in `CONTEXT.md`; decisions in `docs/adr/`.

## 1. Visual Pillars (frozen)

- **Two-zone grammar:** Professional is clean editorial (dark/light, solid backgrounds, zero-JS pages). Personal is DedSec terminal (CRT scanlines, glitch hover, wallpapers, ASCII art). Each zone renders the same writing and projects in its own language — never half-and-half.
- **Glitch & Distortion:** hover-only chromatic aberration on display titles (Personal zone). No page shake, no loading scramble.
- **Zine Collage:** halftone dot overlays + torn-paper SVG edges on `ZineCard` (Personal zone).
- **Terminal Shell:** `DevLayout` holds `SystemBar` + per-route wallpaper pool + scanlines; `ProLayout` holds a top rail + theme toggle. Content swaps per route.
- **Legibility rule:** glitch on display titles/hover only; body text always high-contrast, no flicker.

## 2. Color System

Two independent systems — one per zone.

### Professional Zone — champagne gold on ink

Deep ink ground with an ivory page, champagne-gold accent. Dual dark/light theme persisted in `localStorage` under `pro-theme`. `data-theme="light"` on `<html>` flips the live `--pro-*` vars (see `src/styles/pro.css`).

| Var | Dark | Light |
|-----|------|-------|
| `--pro-ground` | `#0b0d10` | `#f2ede4` |
| `--pro-ink` | `#f2ede4` | `#14161a` |
| `--pro-panel` | `#12151a` | `#faf7f0` |
| `--pro-page` | `#1a1e25` | `#ffffff` |
| `--pro-rule` | `#2b313b` | `#d6cec0` |
| `--pro-dim` | `#8d94a2` | `#6a6558` |
| `--pro-gold` | `#c8a96a` | `#8a6d2f` |
| `--pro-goldsoft` | `#6b5a37` | `#cdb98a` |

These live in `@theme` (not indirection vars) so Tailwind utilities like `text-pro-gold` are emitted on demand.

### Personal Zone — per-route accent on dark

Base: bg `#08090D`, card `#10121B` @80% + noise, grid `#232738`, text `#F0F4F8`, muted `#7C849B`.

| `data-route` | Accent `--accent` | Surface `--accent-surface` | Route |
|:---:|:---:|:---:|:---|
| `/dev` | Blue `#0CCBFD` | `#02141C` | Hub |
| `dev/games` | Green `#A8FF00` | `#021A0E` | Library |
| `dev/art` | Magenta `#FF056F` | `#1F0E00` | Gallery |
| `dev/projects` | Purple `#C83CFF` | `#13021F` | Payloads |
| `dev/blog` | Red `#D40000` | `#1F0307` | Broadcast |

Mechanism: `<html data-route>` sets `--accent` / `--accent-surface` on the root; Tailwind v4 `@theme inline` maps to `text-accent`, `border-accent`, `bg-accentsurface`. Inline-var overrides from the palette/terminal paint on the **same `<html>` element** — inline beats stylesheet, so the route rules always win over body-level inheritance (the past silent no-op bug).

## 3. Typography (frozen)

### Personal Zone (VT323 / Syne / JetBrains Mono)

- **Display / terminal:** `VT323` — hero ASCII banners, `AsciiHeader`, badges, readouts.
- **Sub / punk:** `Syne` bold, uppercase + displaced text-shadow — card titles, section labels.
- **Body / code:** `JetBrains Mono` — prose, abstracts, code blocks.

### Professional Zone (Bodoni Moda / Archivo / IBM Plex Mono / DM Serif Display)

- **Display:** `DM Serif Display` — page headings (`pro-display`).
- **Serif accents:** `Bodoni Moda` (variable, optical size axis) — experience organizations, spec-sheet body emphasis.
- **Body:** `Archivo` (variable, 100–900) — all prose, hero statements.
- **Mono:** `IBM Plex Mono` — labels, data, captions (`pro-eyebrow`, `pro-label`, `pro-spec`).

Hover text-glitch: `clip-path` + `::before/::after` red/cyan offsets, display only. `AsciiHeader` uses `clamp()` fluid sizing. No text-scramble (deferred).

All faces are self-hosted in `public/fonts/` and declared via `@font-face` in CSS — no external stylesheet anywhere. The homepage (`index.astro`) declares fallback faces inline (`Archivo Fallback`, `Plex Mono Fallback`) with metric-matched overrides so the first-viewport paint doesn't reflow.

## 4. Primitives

The component catalog. Everything new on a page composes these — no ad-hoc UI.

| Primitive | File | Runtime | Zone |
|:---|:---|:---|:---|
| `ProLayout` | `src/layouts/ProLayout.astro` | Astro static | Pro |
| `DevLayout` | `src/layouts/DevLayout.astro` | Astro static | Dev |
| `SystemBar` | `src/components/SystemBar.astro` | Astro static + vanilla toggle | Dev |
| `AsciiHeader` | `src/components/AsciiHeader.astro` | Astro static | Dev |
| `ZineCard` | `src/components/ZineCard.astro` | Astro static | Dev |
| `RetroWindow` | `src/components/RetroWindow.astro` | Astro static | Dev |
| `GameCover` | `src/components/GameCover.astro` | Astro static | Dev |
| `Carousel` | `src/components/Carousel.astro` | Astro static + vanilla scroll | Dev |
| `HalftoneImage` | `src/components/HalftoneImage.astro` | Astro static | Dev |
| `SmoothScroll` | `src/components/SmoothScroll.astro` | Astro static + Lenis | Both |
| `ZoneRedirect` | `src/components/ZoneRedirect.astro` | Astro static + client JS | Shims |
| `LucideIcon` | `src/components/LucideIcon.astro` | Astro static | Both |
| `TerminalHero` | `src/components/TerminalHero.tsx` | React island, `client:load` | Dev `/` |
| `CommandPalette` | `src/components/CommandPalette.tsx` | React island, `client:idle` | Both |

Shared non-visual modules: `commands.ts` (single terminal + palette registry), `accentPref.ts` (persisted accent override), `slug.ts` (shared slugify), `LucideIcon.astro` (static icon render — pass `className`, not `class`).

Layout shells:

**Professional** — `ProLayout` renders a top rail (home icon + name + nav + theme toggle), `<main>` with slot, editorial footer (copyright + social links), and a cross-zone exit link to the Personal zone. Theme toggle persists `localStorage` under `pro-theme`, re-applied on every View Transition swap via `astro:page-load` / `astro:after-swap`.

**Personal** — `DevLayout` renders `SystemBar`, a fixed wallpaper `<div>` with per-route desktop/mobile pools (crossfade on transition), `<main>` with slot, footer (system log + telemetry), and a cross-zone exit. CRT scanlines are inline CSS (`.scanlines` class in `global.css`), not a separate component. `data-navbar="on"` is hardcoded — the CSS kill-switch (`html[data-navbar="off"]`) exists but is not wired to a command; the `navbar` verb returns an error.

## 5. Routes

24 route pages across three zones (root, professional, personal).

### Split-scroll Homepage

**`/`** — `index.astro`. Two 100svh views in one scroll track: Professional panel (identity, metrics, rolling ledger, CTA to `/pro`) on scroll-down, Personal panel (fastfetch ASCII + status readout, hub links, CTA to `/dev`) on scroll-up. Remembers which door the visitor walked through via `localStorage` key `dedsec-zone`.

### Professional Zone (`/pro/*`)

| Route | Layout | Purpose |
|:---|:---|:---|
| `/pro` | `ProLayout` | Landing: metrics, key roles, Q1 research preview, reach-out CTA |
| `/pro/about` | `ProLayout` | Editorial bio, method (4-step), strengths (4 cards), tech stack table, research profiles |
| `/pro/experience` | `ProLayout` | Timeline (10 entries, grouped by type) + certifications (32 items) |
| `/pro/research` | `ProLayout` | Publications (6 papers, status-sorted: Published / On-Review / Submitted) |
| `/pro/projects` | `ProLayout` | 10 case studies, category filter (All + per category) |
| `/pro/projects/[slug]` | `ProLayout` | Project detail: spec sheet + "more work" siblings |
| `/pro/blog` | `ProLayout` | Writing list (1 post), editorial grammar |
| `/pro/blog/[slug]` | `ProLayout` | Article with `pro-essay` styles |
| `/pro/contact` | `ProLayout` | Direct email + external profile links |

### Personal Zone (`/dev/*`)

| Route | Layout | Purpose |
|:---|:---|:---|
| `/dev` | `DevLayout` | Terminal shell (`TerminalHero`) + fastfetch status + hub cards |
| `/dev/games` | `DevLayout` | 47-game library wall, genre filter (real `<details>` disclosure) |
| `/dev/art` | `DevLayout` | Photo slideshow (auto-rotate + manual + filter), book shelves |
| `/dev/projects` | `DevLayout` | Payload index, PORT filter (80 / 443 / 8080 + misc categories) |
| `/dev/projects/[slug]` | `DevLayout` | Project detail in `RetroWindow` terminal grammar |
| `/dev/blog` | `DevLayout` | Transmissions list (1 post), terminal grammar |
| `/dev/blog/[slug]` | `DevLayout` | Article in `RetroWindow` with `post-body` styles |

### Redirect Shims (root)

| Route | Behavior |
|:---|:---|
| `/about` | `Astro.redirect` 301 → `/pro/about` |
| `/experience` | `Astro.redirect` 301 → `/pro/experience` |
| `/research` | `Astro.redirect` 301 → `/pro/research` |
| `/contact` | `Astro.redirect` 301 → `/pro/contact` |
| `/projects` | `ZoneRedirect` — sends to `/pro/projects` or `/dev/projects` based on `dedsec-zone` pref, with no-JS fallback links |
| `/projects/[slug]` | `ZoneRedirect` with slug — mirrors detail pages |
| `/blog` | `ZoneRedirect` — sends to `/pro/blog` or `/dev/blog` |
| `/blog/[slug]` | `ZoneRedirect` with slug — mirrors article pages |

## 6. Content Schemas

### MDX Collections (`src/content.config.ts`)

```yaml
# blog/*.md — shared across both zones, same MDX renders through different grammars
title: string
slug: string
date: YYYY-MM-DD
tags: string[]       # default: []
excerpt: string
```

```yaml
# projects/*.mdx — placeholder, real data in projects.json
title: string
subtitle: string
category: "ML/CV" | "WEB" | "ALL"
desc: string
tech: string[]
link: { repo?: url, demo?: url }
cover: path
payload: string
```

```yaml
# research/*.mdx — placeholder, real data in research.json
title: string
authors: string
journal: string
journalUrl?: url
articleUrl?: url
year: number
category: string
status: "published" | "draft"
abstract: string
repo?: url
dataset_tags: string[]   # default: []
```

### JSON Data (`src/data/*.json`)

| File | Used By |
|:---|:---|
| `profile.json` | All pages — name, roles, techs, about (intro/detailed/research/hobbies/highlights/stack/stats), footer |
| `navigation.json` | `SystemBar.astro` — legacy anchor hrefs (`#about`) mapped to routes via `anchorMap` |
| `social.json` | ProLayout, Pro pages — `socialLinks`, `scholarProfiles`, `extraSocials`, `gaming` |
| `pro.json` | Pro pages — headline, standfirst, positioning, metrics, roles, strengths, method, contact copy, publications note |
| `dev.json` | Dev pages — ASCII banners, boot sequence, fastfetch status, hub cards, about, reading note |
| `experience.json` | `/pro/experience` — 10 work/learning entries (20 items, grouped by type: Research / Technical / Design / Organizational / Other) |
| `learning.json` | `/pro/experience` — 32 certifications/bootcamps (type: Certification / Bootcamp) |
| `research.json` | `/pro/research`, `/` — 6 publications with Scopus indexing, status, abstract, venue links |
| `projects.json` | `/pro/projects`, `/dev/projects`, `/` — 10 projects with tech, categories, source links |
| `showcase.json` | `/dev/games`, `/dev/art` — gaming library (47 games), photo gallery (17 photos), literature (4 books), music placeholders |

`public/txt/*.txt` — plain-text dossier files served statically for terminal `cat` (`about`, `roles`, `stack`, `contact`). Duplicates small slices of JSON by design; keep in sync.

Icons: names resolve through `LucideIcon.astro` (lucide-react export map; `si:`-prefix pulls Simple Icons). Unknown names fall back to `Link`.

## 7. Interactive Scope

**Shipped (zero-framework vanilla):**
- `CommandPalette` — `Ctrl+K` in both zones. Arrow-key navigation, live filter, `ERR_0x99` no-match.
- `TerminalHero` — working shell on `/dev`. Verbs: `help`, `goto` (letter shortcuts d/g/a/p/b), `cat` (dossier files), `accent` (7 colors + default), `clear`.
- `SmoothScroll` — single Lenis owner shared by both zones. Re-inits on every View Transition swap; skipped under `prefers-reduced-motion`; same-page anchors bypass native jump.
- Gallery slideshow — auto-rotate (5s), manual prev/next, play/pause, filter (all/nature/objects), pointer + focus + visibility gating.
- Games genre filter — one-tag selection, live count updates, no framework.
- Projects category filter (both zones) — click-to-show, empty-state message.
- Pro theme toggle — dark/light persisted in `localStorage` (`pro-theme`), re-applied through View Transitions.
- Wallpaper crossfade — `transition:name="wallpaper"` on DevLayout, CSS animation 0.45s.
- Zone exit persistence — `localStorage` key `dedsec-zone` records which door was chosen, drives `ZoneRedirect` and the split-scroll CTAs.

**v1 shipped audit fixes applied:**
- Mobile nav scroll strip (SND placeholder removed), `.post-body` styles instead of typography plugin, glitch contained to title box, stats `<img>` self-hide fallback, single `commands.ts` registry, palette arrow-key nav, color-named accents + route-default reset, one-letter keys for `goto`/`accent`, red `ERR_0x99` errors, `goto` guard against no-op self-navigation.

**Deferred to v2:**
- Web Audio 8-bit bleeps, screen-shake + chromatic aberration animation, retro error popups, load text-scramble, research `NodeGraph` Canvas. Spec: `docs/v2-interactions.md`.

## 8. Tech Stack (frozen)

| Layer | Technology |
|:---||
| Framework | Astro 7 + TypeScript 5.8 (strict OFF) |
| Islands | React 19 — exactly two `.tsx` files: `TerminalHero` (`client:load`), `CommandPalette` (`client:idle`) |
| Routing | Static multipage — one `.astro` per route, no client-side router |
| Transitions | Astro View Transitions (`ClientRouter`) + Lenis smooth scroll |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin, no config file) |
| Content | MDX collections + JSON data |
| Code blocks | Shiki (`github-dark`) |
| Icons | `lucide-react` + `simple-icons` via static `LucideIcon.astro` |
| Images | WebP wallpapers, game covers, gallery photos, book covers |
| Base path | `/portfolio/` (GitHub Pages sub-path) — all links use `import.meta.env.BASE_URL` |
| Lint | `tsc --noEmit` only (no ESLint, no Prettier) |

## 9. Roadmap

The two-zone architecture is live. Remaining work:

1. Wire `navbar` toggle command (CSS kill-switch exists; `data-navbar` is currently hardcoded `"on"`).
2. Wire CRT toggle command (scanlines currently always-on; no persisted `dedsec-crt` pref).
3. Migrate placeholder MDX content in `src/content/projects/` and `src/content/research/` to typed JSON entries.
4. v2 interactions from `docs/v2-interactions.md` (audio, shake, popups, scramble, NodeGraph).
5. Remove `data-guide.md` gaps: document `pro.json`, `dev.json`, `showcase.json`.
