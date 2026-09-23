# DESIGN.md - DedSec / Watch Dogs 2 Portfolio Design System (v2 buildable spec)

Vibe unchanged: low-fi zine + CRT terminal + glitch over dark cyber-UI. This v2 pins what v1 left as "or": exact primitives, Astro-vs-React mapping, tokens, fonts, content schemas, v1/v2 cut. Terms defined in `CONTEXT.md`; decisions in `docs/adr/`.

## 1. Visual Pillars (frozen)

- **Glitch & Distortion:** scanlines, chromatic aberration on hover only. No page shake v1.
- **Zine Collage:** halftone dots + torn-paper SVG edges on cards.
- **Terminal Shell:** one `Layout` + `SystemBar` + `CRTOverlay` on all routes; content swaps per route.
- **Legibility rule:** glitch on display titles/hover only; body text always high-contrast, no flicker.

## 2. Color System (locked, see ADR-0003)

Base: bg `#08090D`, card `#10121B` @80% + noise, grid `#232738`, text `#F0F4F8`, muted `#7C849B`.

| `data-route` | Accent `--accent` | Surface `--accent-surface` |
| :--- | :--- | :--- |
| `/` (home) | Cyan `#00F0FF` | `#02141C` |
| `projects` | Green `#00FF66` | `#021A0E` |
| `about` | Yellow `#FFE600` | `#1A1800` |
| `experience` | Orange `#FF6B00` | `#1F0E00` |
| `research` | Purple `#A822FF` | `#13021F` |
| `blog` | Red `#FF1744` | `#1F0307` |
| `contact` | Pink `#FF007A` | `#1C000F` |

Mechanism: `<body data-route>` sets `--accent` / `--accent-surface`; Tailwind v4 `@theme` maps to `text-accent`, `border-accent`, `bg-accentsurface`. `SystemBar` theme selector overrides via inline var.

## 3. Typography (locked, see ADR-0002)

- **Display / terminal:** `VT323` — hero banners, `AsciiHeader`, badges, readouts.
- **Sub / punk:** `Syne` bold, uppercase + displaced text-shadow — card titles, section labels.
- **Body / code:** `JetBrains Mono` — prose, abstracts, specs, code blocks.
- Hover text-glitch: `clip-path` + `::before/::after` red/cyan offsets, display only. `AsciiHeader` uses `clamp()` fluid sizing. No text-scramble v1 (deferred).

## 4. Primitives (the only 9 — all new UI composes these)

| Primitive | File | Runtime |
| :--- | :--- | :--- |
| `Layout` | `src/layouts/Layout.astro` | Astro static, holds `data-route`, vars, slot |
| `SystemBar` | `src/components/SystemBar.astro` | Astro static + vanilla toggle script |
| `CRTOverlay` | `src/components/CRTOverlay.astro` | Astro static CSS (`repeating-linear-gradient` + vignette) |
| `AsciiHeader` | `src/components/AsciiHeader.astro` | Astro static, `title` + `art` props |
| `ZineCard` | `src/components/ZineCard.astro` | Astro static, halftone + torn edge |
| `RetroWindow` | `src/components/RetroWindow.astro` | Astro static, `tag` prop (`ERR_0x99`, `PAYLOAD_LOADED`) |
| `HalftoneImage` | `src/components/HalftoneImage.astro` | Astro static, `src` + `alt` props, WebP |
| `TerminalHero` | `src/components/TerminalHero.tsx` | **React island** `client:load`, `/` only |
| `CommandPalette` | `src/components/CommandPalette.tsx` | **React island** `client:idle`, `Ctrl+K` |

Page compositions (props only, no new primitives): `FilterMatrix`, `SkillsBar`, `TimelineGraph`, `ArchiveList`, `BroadcastCard`, `CommsForm` live in-route or under `src/components/` as `.astro` wrappers. `NodeGraph` Canvas = v2.

Layout shell (all routes):

```
+---------------------------------------------------------------+
| SystemBar: ONLINE | route accent | ASCII logo | audio CRT      |
+---------------------------------------------------------------+
| AsciiHeader + page content (ZineCard / RetroWindow grids)      |
+---------------------------------------------------------------+
| Footer: system log line + telemetry              CRTOverlay   |
+---------------------------------------------------------------+
```

## 5. Routes (7 — experience split from about)

1. **`/`:** `TerminalHero` (`help`, `clear`, `goto <route>`, `cat about.txt`) + `ZineCard` featured grid.
2. **`/projects`:** `FilterMatrix` (`PORT 80: ALL`, `443: ML/CV`, `8080: WEB`) + `RetroWindow` > `HalftoneImage` cards.
3. **`/about`:** dossier `RetroWindow` (from `data/profile.json`) + `SkillsBar` (`CPU_USAGE`) + full tech-stack table + research/scholar + socials/gaming uplinks + hobbies + GH stats. No timelines.
4. **`/experience`:** `TimelineGraph` (`data/experience.json`, `data/learning.json`). Orange accent. Nav `Experience` points here.
4. **`/research`:** `ArchiveList` rows (status/abstract/repo/datasets). Static list v1; `NodeGraph` v2.
5. **`/blog`:** `BroadcastCard` rows with line numbers + Shiki code blocks (MDX).
6. **`/contact`:** `CommsForm` terminal form, confirm `[MESSAGE_TRANSMITTED]`.

## 6. Content Schemas (frontmatter; keys reuse `data/*.json` where present)

```yaml
# projects/*.mdx — extends data/projects.json shape
title: string        # = title
subtitle: string     # = subtitle
category: "ML/CV" | "WEB" | "ALL"   # maps to PORT filter; = category
desc: string         # = desc
tech: string[]       # = tech
link: { repo?: url, demo?: url }     # = link
cover: path          # HalftoneImage src
payload: string      # RetroWindow tag, e.g. ERR_0x99
```

```yaml
# research/*.mdx — extends data/research.json shape
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
dataset_tags: string[]
```

```yaml
# blog/*.mdx
title: string
slug: string
date: YYYY-MM-DD
tags: string[]
excerpt: string
```

`data/profile.json`, `experience.json`, `learning.json`, `navigation.json`, `social.json` stay as-is (about/footer source). No `icon` free-for-all: Lucide names only.

## 7. Interactive Scope (v1 must vs v2)

**v1 must:** `CommandPalette` (goto + accent switch + audio/CRT toggle placeholders), `CRTOverlay` toggle (CSS, persists `localStorage`), halftone-to-color hover (CSS/SVG), `prefers-reduced-motion` kills glitch/flicker/shake.
**v1 shipped:** palette + CRT toggle + halftone hover + motion-gating all live. Audit fixes applied: mobile nav scroll strip (SND placeholder removed), `.post-body` styles instead of typography plugin, glitch contained to title box, `:focus-visible` accent ring, stats `<img>` self-hide fallback.
**v2 deferred:** Web Audio 8-bit bleeps, screen-shake + chromatic aberration animation, retro error popups, load text-scramble, research `NodeGraph` Canvas. Spec: `docs/v2-interactions.md`.

## 8. Tech Stack (locked, see ADR-0001)

Astro 7 + Tailwind v4 (`@theme` tokens) + React islands (2 files only) + MDX collections + Lucide + Shiki (blog code). Images: compressed WebP + SVG halftone overlay. A11y: contrast-held body, motion-gated effects, `:focus-visible` accent ring. Single `esbuild`/`vite` lineage (no leftover nesting).

## 9. Roadmap

1. `astro add tailwind react mdx` + Lucide + Shiki; `@theme` accent tokens; `Layout` `data-route` vars.
2. `SystemBar`, `CRTOverlay`, `AsciiHeader`, `RetroWindow`, `ZineCard`, `HalftoneImage` (.astro).
3. `TerminalHero`, `CommandPalette` (React islands, minimal commands).
4. MDX collections + 6 routes with schemas above; wire `data/*.json` into about/projects.
5. Motion-gating + contrast pass + WebP pass. v2: audio, shake, popups, scramble, `NodeGraph`.
