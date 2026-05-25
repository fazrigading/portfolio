# AGENTS.md — Fazri Gading Portfolio

## Stack
- **Framework:** React 19 + TypeScript 5.8 + Vite 6
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`, no PostCSS config — loaded as Vite plugin)
- **Animation:** `motion/react` (v12, **not** framer-motion)
- **Icons:** Lucide React + custom SVG `<img>` fallbacks via `src/data/icons.tsx`

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Dev server on `:3000`, bound to `0.0.0.0` |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | `tsc --noEmit` (typecheck only — no ESLint/Prettier) |
| `npm run clean` | `rm -rf dist` |

## Quirks & conventions
- **No tests** exist. No test framework configured.
- **Strict mode is OFF** in `tsconfig.json` — typecheck is lenient.
- **Base path** is `/portfolio/` (deployed on GitHub Pages sub-path).
- **Path alias:** `@` maps to project root (e.g. `@/src/data/profile.json`).
- **No router** — single-page app with hash anchor nav (`#about`, `#experience`, etc.) + smooth scrolling.
- **`App.tsx`** (~867 lines) is monolithic — all sections (Nav, Hero, About, Experience, Research, Learning, Projects, Footer) in one file. No component extraction yet.
- **Data-driven:** All content lives in `src/data/*.json` — edit JSON to change profile, experience, research, projects, etc.
- **Dummy data:** `src/data/projects_dummy.json` exists alongside `projects.json` but is unused.
- **Hooks directory** (`src/hooks/`) is empty.
- **Custom breakpoint** at 864px for nav toggle (not a standard Tailwind bp).
- **HMR** can be disabled: `DISABLE_HMR=true npm run dev`.
- **Lockfile committed** — CI runs `npm ci`.

## CI/CD (`.github/workflows/deploy.yml`)
Push to `master` → `npm ci` → `npm run build` → deploy `dist/` to GitHub Pages.

## Resources
Professional profiles, certifications, and ORCID PDFs live in `resources/`.
