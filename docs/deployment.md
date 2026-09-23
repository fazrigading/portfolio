# Deployment

## GitHub Pages (Automatic)

The site deploys via GitHub Actions on every push to `master` (or manual dispatch from the Actions tab).

### Workflows

| File | Trigger | Steps |
|------|---------|-------|
| `.github/workflows/ci.yml` | Push (non-`master`) + PRs | `npm ci` → `lint` → `build` |
| `.github/workflows/deploy.yml` | Push to `master` + manual dispatch | `npm ci` → `build` → deploy `dist/` |

**Requirements:**
- GitHub Pages enabled in repo Settings → Pages → Source: **GitHub Actions**
- `pages: write` + `id-token: write` permissions (set in `deploy.yml`)
- Node.js 24, npm cache (both workflows)

### Base Path

The site serves from `/portfolio/`, set in `astro.config.mjs`:

```js
export default defineConfig({ base: '/portfolio/', /* … */ });
```

Every internal link must go through `import.meta.env.BASE_URL` (Astro emits it with trailing slash). Root-absolute links 404 on Pages. If moving sub-paths, change `base` and rebuild.

## Manual Build

```bash
npm ci          # exact lockfile versions
npm run build   # → dist/ (12 pages)
npm run preview # serve production build locally
```

`ASTRO_TELEMETRY_DISABLED=1` is set in deploy — no telemetry pings from CI.

## Environment Variables

None required. (The old `DISABLE_HMR` was Vite-era and is dead — nothing reads it. `.env.example` is vestigial.)

## CI/CD Notes

- **Lockfile committed** — CI uses `npm ci`
- **No tests** — `lint` is `tsc --noEmit` only; strict mode OFF
- **No ESLint/Prettier**

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on GitHub Pages | `base: '/portfolio/'` must match the repo's Pages URL |
| Assets not loading | Links bypassing `BASE_URL` — grep for `href="/` in `src/pages` |
| `Invalid hook call` after dep changes | Stale dev prebundle serving a second React: `npm run stop`, delete `node_modules/.vite` + `.astro`, restart dev |
| Build fails | `npm run lint` locally for type errors |
| Clean build | `npm run clean`, then `npm run build` |
