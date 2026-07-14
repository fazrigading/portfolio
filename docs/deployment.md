# Deployment

## GitHub Pages (Automatic)

The site deploys automatically via GitHub Actions on every push to `master`.

### Workflow: `.github/workflows/deploy.yml`

```
Push to master → npm ci → npm run build → deploy dist/ to GitHub Pages
```

**Requirements:**
- GitHub Pages must be enabled in repo Settings → Pages → Source: **GitHub Actions**
- The `pages: write` and `id-token: write` permissions are set in the workflow
- Node.js 24 is used (configured in the workflow)

### Base Path

The site is deployed to `/portfolio/` (not root). This is configured in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/portfolio/',
  // ...
});
```

If deploying to a different sub-path or root, update the `base` value and rebuild.

## Manual Build

```bash
npm ci          # Install exact dependencies from lockfile
npm run build   # Production build → dist/
```

The output goes to `dist/`. To preview locally:

```bash
npm run preview
```

## Environment Variables

- `DISABLE_HMR=true` — Disables Hot Module Replacement during dev (useful for debugging layout shifts)

No other environment variables are required. The `.env.example` file exists but is currently empty.

## CI/CD Notes

- **Lockfile committed** — CI uses `npm ci` for deterministic installs
- **No tests** — The `lint` script only runs `tsc --noEmit` (type checking)
- **No ESLint/Prettier** — Only TypeScript type checking is enforced
- **Strict mode is OFF** — `tsconfig.json` does not enable `strict`

## Troubleshooting

| Issue | Fix |
|-------|-----|
| 404 on GitHub Pages | Ensure `base: '/portfolio/'` in `vite.config.ts` matches your repo's Pages URL |
| Assets not loading | Check that `base` path is correct; Vite uses it for all asset URLs |
| Build fails | Run `npm run lint` locally to check for type errors |
| HMR issues | Try `DISABLE_HMR=true npm run dev` |
| Clean build | Run `npm run clean` to remove `dist/`, then `npm run build` |