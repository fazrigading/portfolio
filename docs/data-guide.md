# Data Guide

All portfolio content is driven by JSON files in `src/data/` (+ `public/txt/` for the terminal). To update the site, edit data — no page code changes needed. Blog posts are MDX in `src/content/blog/` (see schemas in `src/content.config.ts`).

## Files

### `profile.json`

Personal info, dossier, stack, stats, footer. (No `heroBadge`/`heroTagline` — removed.)

| Field | Type | Used In |
|-------|------|---------|
| `name` / `nameShort` | `string` | Layout title, meta, AsciiHeader |
| `email` | `string` | Contact form relay, `contact.txt` |
| `roles` | `string[]` | Meta description, `roles.txt` |
| `techs` | `string[]` | About CPU_USAGE bars |
| `about.title` / `intro` / `detailed` | `string` | About dossier |
| `about.research` / `hobbies` | `string` | About research + hobbies windows |
| `about.highlights` | `{ title, desc, icon }[]` | About what-i-do cards |
| `about.stack` | `{ category, items[] }[]` | About FULL_LOADOUT table |
| `about.stats` | `{ label, src }[]` | About telemetry cards (remote images, self-hide on error) |
| `footer.tagline` / `copyright` | `string` | Footer |

### `experience.json`

Array of work entries: `{ id, role, company, period, type, skills[], description }`. Rendered on `/experience` with click-to-toggle clamped descriptions. (`skills[]` currently data-only — chips not rendered.)

### `research.json`

Array of publications: `{ title, authors, journal, journalUrl?, articleUrl?, year, category, status }` plus optional `repo`, `abstract`, `dataset_tags` (rendered when present). Sorted as-file — keep newest first.

### `learning.json`

Array of `{ title, provider, type, tags[], date, icon, credentialId? }`. Rendered on `/experience`; `icon` must be a valid lucide-react export name (unknown names fall back to `Link`).

### `projects.json`

Array of `{ title, subtitle, category, desc, tech[], link, icon }`. On `/pro/projects`, `category` drives the exact category filter via `slugify(category)`; on `/dev/projects`, it contributes to the ML/CV, WEB, and optional PORT groupings. Title feeds detail-page slugs via `slugify()`; keep titles URL-unique.

### `navigation.json`

Array of `{ name, href }` with **legacy anchor hrefs** (`#about`, …). `SystemBar.astro` maps them to routes via `anchorMap` — JSON stays untouched. Blog/Contact links are appended in code.

### `social.json`

| Key | Shape | Used In |
|-----|-------|---------|
| `socialLinks` | `{ name, icon, href, color }[]` | Footer icons + About uplinks |
| `scholarProfiles` | same | About research window |
| `extraSocials` | `{ name, icon, href }[]` | About uplinks only |
| `gaming` | `{ name, href }[]` | About hobbies window |

`icon` names resolve through `LucideIcon.astro` (lucide-react; non-Lucide legacy names fall back to `Link`). Prefix a name with `si:` to pull a Simple Icons brand mark by slug (`si:discord`, `si:x`, …). The `color` hover classes are legacy and currently unused by the accent-driven theme.

### `public/txt/*.txt`

Plain-text dossier files served statically for terminal `cat` (`about`, `roles`, `stack`, `contact`). Duplicates small slices of `profile.json`/`social.json` by design — keep them in sync when those change.

## Icons

No icon map file. `src/components/LucideIcon.astro` looks the name up on the `lucide-react` export map at render time — put its exact export name in JSON (`Zap`, `Sprout`, `GraduationCap`, …). Brand icons come from Simple Icons (`simple-icons`) via `si:`-prefixed slugs (`si:discord`, `si:reddit`, …) — prefer those, since lucide's own brand icons are deprecated. Unknown names fall back to `Link`.

## Adding Content

1. Edit the relevant JSON (or add an MDX post under `src/content/blog/` with `title/slug/date/tags/excerpt` frontmatter).
2. New project: add to `projects.json`, verify the slug is unique (`slugify(title)`), link appears on home + `/projects` automatically.
3. Run `npm run lint` then `npm run dev` to preview.
