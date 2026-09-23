# AGENTS.md — Fazri Gading Portfolio

## Stack
- **Framework:** Astro 7 (static MPA) + TypeScript 5.8
- **Islands:** React 19 (`TerminalHero` `client:load`, `CommandPalette` `client:idle` — the only 2 `.tsx` files)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` + `@theme inline` tokens, no PostCSS config — loaded as Vite plugin via `astro.config.mjs`)
- **Content:** MDX collections (`src/content.config.ts`) + `src/data/*.json`; Shiki `github-dark` for blog code
- **Icons:** `lucide-react` rendered statically via `src/components/LucideIcon.astro` (passes `className`, not `class`)

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Dev server on `:3000`, bound to `0.0.0.0` |
| `npm run stop` | Stop the background dev server (`astro dev stop`) |
| `npm run build` | Production build → `dist/` (12 pages) |
| `npm run preview` | Preview production build |
| `npm run lint` | `tsc --noEmit` (typecheck only — no ESLint/Prettier) |
| `npm run clean` | `rm -rf dist` |

## Quirks & conventions
- **No tests** exist. No test framework configured.
- **Strict mode is OFF** in `tsconfig.json` — typecheck is lenient.
- **Base path** is `/portfolio/` (deployed on GitHub Pages sub-path) — set in `astro.config.mjs`; always prefix links with `import.meta.env.BASE_URL`.
- **No router** — Astro multipage app: `src/pages/*.astro` (+ `projects/[...slug]`, `blog/[...slug]`). Old hash-anchor SPA is gone.
- **Single command registry** — `src/components/commands.ts` owns every terminal verb and palette item. Add commands there, never in the islands. Prefs live in `*Pref.ts` (`localStorage`: `dedsec-crt`, `dedsec-navbar`, `dedsec-accent`).
- **Desktop nav is OFF by default** — `<html data-navbar>`, mobile always on. Don't re-add a desktop nav without asking.
- **Data-driven:** page content lives in `src/data/*.json` (+ `public/txt/*.txt` for terminal `cat`) — edit data, not pages.
- **`@` path alias** is declared in `tsconfig.json` but unused — imports are relative.
- **Stale dev server trap:** after dependency changes, `astro dev stop`, delete `node_modules/.vite` + `.astro`, restart. A stale prebundle serves a second React copy → invalid-hook-call on hydration.
- **Lockfile committed** — CI runs `npm ci`.

## CI/CD
- `.github/workflows/ci.yml` — all branches except `master` + PRs: `npm ci` → `lint` → `build`.
- `.github/workflows/deploy.yml` — push to `master` (or manual dispatch) → `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages.

## Resources
Professional profiles, certifications, and ORCID PDFs live in `resources/`.
