<div align="center">
  <br />
  <h1>Fazri Gading · Portfolio</h1>
  <p>
    <strong>Applied AI & Systems Engineer</strong>
  </p>
  <p>
    <em>DedSec-inspired themed portofolio site, navigate with the terminal or Ctrl+K.</em>
  </p>
  <br />
</div>

## Overview

Personal portfolio site built with **Astro 7**, **React 19 islands**, **TypeScript**, and **Tailwind v4**. Static multipage build (12 pages) with a DedSec / Watch Dogs 2 terminal aesthetic: per-route accent colors, CRT overlay, zine cards, and a working in-page shell (`help`, `goto`, `cat`, `navbar`, `accent`, `crt`).

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 7 (static MPA, no router) |
| Islands | React 19 — `TerminalHero`, `CommandPalette` only |
| Styling | Tailwind CSS v4 (`@theme inline` tokens) |
| Content | MDX collections + `src/data/*.json` + `public/txt/*.txt` |
| Code highlighting | Shiki (`github-dark`) |
| Icons | Lucide React (static render) |

## Routes

| Route | Content |
|-------|---------|
| `/` | Terminal shell + featured projects |
| `/projects` | PORT-filtered payload index |
| `/projects/:slug` | Per-project detail page |
| `/about` | Dossier, stack, research, socials, stats |
| `/experience` | Work + learning timelines |
| `/research` | Paper archive |
| `/blog`, `/blog/:slug` | Transmissions (MDX + Shiki) |
| `/contact` | Terminal comms form (mailto relay) |

## Getting Started

```bash
npm install        # or npm ci for exact lockfile versions
npm run dev        # dev server → http://localhost:3000/portfolio/
npm run stop       # stop the background dev server
```

> Base path is `/portfolio/` — the site 404s at server root by design.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 (exposed to `0.0.0.0`) |
| `npm run stop` | Stop the dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` directory |

## Project Structure

```
src/
├── pages/             # Routes (index, about, experience, projects(+slug), research, blog(+slug), contact)
├── layouts/           # Layout.astro — shell, SystemBar, footer, CRT, palette
├── components/        # 7 static .astro primitives + commands.ts + *Pref.ts + 2 islands
├── content/           # Blog MDX posts (projects/research collections typed, JSON-backed for now)
├── content.config.ts  # Collection schemas
├── data/              # profile/experience/research/projects/learning/navigation/social JSON
└── styles/            # global.css — tokens, CRT, glitch, halftone, post styles
public/txt/            # Dossier files for terminal `cat`
```

Content edits go in `src/data/*.json` (see `docs/data-guide.md`). Design tokens and behavior contracts live in `DESIGN.md`.

## CI/CD

- Push/PR (non-`master`): `ci.yml` runs typecheck + build.
- Push to `master` (or manual dispatch): `deploy.yml` builds and deploys `dist/` to GitHub Pages.

## License

Apache 2.0
