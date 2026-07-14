# Architecture

## Overview

Single-page portfolio built with **React 19 + TypeScript 5.8 + Vite 6**. No router — navigation uses hash anchors (`#about`, `#experience`, etc.) with smooth scrolling.

## Entry Points

| File | Purpose |
|------|---------|
| `index.html` | HTML shell, loads `main.tsx` |
| `src/main.tsx` | React root mount (`StrictMode`) |
| `src/App.tsx` | Monolithic component (~870 lines) — all sections in one file |
| `src/index.css` | Tailwind v4 import, theme tokens, custom utilities |

## Section Breakdown (App.tsx)

All sections live in `App.tsx` as inline JSX, in this order:

1. **Nav** — Fixed top bar, desktop/mobile toggle at 864px, theme switcher
2. **Hero** — Rotating `roles`/`techs` with `AnimatePresence`, social links, CTA
3. **About** — Photo + bio + highlight cards
4. **Experience** — Filterable timeline with expandable skill chips
5. **Research** — Sortable/filterable publication list with status badges
6. **Learning** — Certifications grid with type + tag filters
7. **Projects** — Filterable project cards
8. **Footer** — Name, tagline, social links, copyright

## State Management

All state is local (`useState`). No context, no store, no reducer.

| State | Type | Purpose |
|-------|------|---------|
| `isMenuOpen` | `boolean` | Mobile nav overlay |
| `theme` | `'dark' \| 'light'` | Dark/light mode, persisted to `localStorage` |
| `activeFilter` | `string` | Research category filter |
| `researchSortBy` | `'year' \| 'title'` | Research sort order |
| `activeExpFilter` | `string` | Experience type filter |
| `activeLearningFilter` | `string` | Learning type filter |
| `activeTagFilter` | `string` | Learning tag filter |
| `activeProjectFilter` | `string` | Project category filter |
| `expandedSkills` | `Record<string, boolean>` | Which experience cards have skills expanded |
| `activeSection` | `string` | Currently visible section (for nav highlight) |
| `expScroll` / `researchScroll` / `learningScroll` | `{ top, bottom }` | Scroll shadow indicators |
| `roleIndex` / `techIndex` | `number` | Hero rotating text index |

## Data Layer

All content is driven by JSON files in `src/data/`. See [data-guide.md](./data-guide.md) for editing instructions.

| File | Shape | Used In |
|------|-------|---------|
| `profile.json` | Personal info, roles, techs, about, footer | Hero, About, Footer |
| `experience.json` | Array of `{ id, role, company, period, type, skills[], description }` | Experience |
| `research.json` | Array of `{ title, authors, year, category, status, journal, ... }` | Research |
| `learning.json` | Array of `{ title, provider, type, tags[], icon, ... }` | Learning |
| `projects.json` | Array of `{ title, category, desc, tech[], icon, link }` | Projects |
| `navigation.json` | Array of `{ name, href }` | Nav |
| `social.json` | `{ socialLinks[], scholarProfiles[] }` | Hero, Research, Footer |

## Animation

- **Library:** `motion/react` (v12) — not `framer-motion`
- **Layout animations:** `layout` prop on `motion.div` for filter transitions
- **Scroll containers:** Use `motion.div` with `layoutScroll` for correct layout measurement
- **Exit animations:** `AnimatePresence` with `mode="popLayout"` for filter changes
- **Hero rotation:** `setInterval` swaps `roleIndex`/`techIndex` every 3.5s with `AnimatePresence`
- **Scroll progress:** `useScroll` + `useSpring` for top progress bar

## Key Patterns

- **Icon resolution:** `getIcon(name, size)` in `src/data/icons.tsx` maps string names to Lucide React components or custom SVG `<img>` fallbacks
- **Scroll shadows:** `handleScroll(setter)` callback detects top/bottom scroll position to show/hide gradient overlays
- **Title auto-fit:** `handleTitleRef` callback shrinks font size until text fits without overflow
- **Theme toggle:** CSS class `.dark` on `<html>`, colors defined as CSS custom properties in `index.css`

## Build

- **Bundler:** Vite 6 with `@vitejs/plugin-react` and `@tailwindcss/vite`
- **Base path:** `/portfolio/` (GitHub Pages)
- **Path alias:** `@` → project root
- **Output:** `dist/`