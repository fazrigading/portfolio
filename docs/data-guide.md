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

Array of `{ title, subtitle, category, desc, tech[], link, icon }`. Title feeds the detail-page slug via `slugify()` — keep titles URL-unique. `category` maps to the PORT filter (`ML/CV` ↔ 443, `WEB` ↔ 8080, everything shows on ALL).

### `navigation.json`

Array of `{ name, href }` with **legacy anchor hrefs** (`#about`, …). `SystemBar.astro` maps them to routes via `anchorMap` — JSON stays untouched. Blog/Contact links are appended in code.

### `social.json`

| Key | Shape | Used In |
|-----|-------|---------|
| `socialLinks` | `{ name, icon, href, color }[]` | Footer icons + About uplinks |
| `scholarProfiles` | same | About research window |
| `extraSocials` | `{ name, href }[]` | About uplinks only |
| `gaming` | `{ name, href }[]` | About hobbies window |

`icon` names resolve through `LucideIcon.astro` (lucide-react; non-Lucide legacy names fall back to `Link`). The `color` hover classes are legacy and currently unused by the accent-driven theme.

### `public/txt/*.txt`

Plain-text dossier files served statically for terminal `cat` (`about`, `roles`, `stack`, `contact`). Duplicates small slices of `profile.json`/`social.json` by design — keep them in sync when those change.

## Icons

No icon map file. `src/components/LucideIcon.astro` looks the name up on the `lucide-react` export map at render time. To use an icon, put its exact export name in JSON (`Zap`, `Sprout`, `GraduationCap`, …). Brand icons (Discord, Steam, …) don't exist in Lucide — those entries render as text links, never icons.

## Adding Content

1. Edit the relevant JSON (or add an MDX post under `src/content/blog/` with `title/slug/date/tags/excerpt` frontmatter).
2. New project: add to `projects.json`, verify the slug is unique (`slugify(title)`), link appears on home + `/projects` automatically.
3. Run `npm run lint` then `npm run dev` to preview.
