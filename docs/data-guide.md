# Data Guide

All portfolio content is driven by JSON files in `src/data/`. To update the site, edit these files — no React code changes needed.

## Files

### `profile.json`

Personal info, hero content, about section, and footer.

| Field | Type | Used In |
|-------|------|---------|
| `name` | `string` | Nav, footer |
| `nameShort` | `string` | Nav logo monogram |
| `email` | `string` | Contact button |
| `roles` | `string[]` | Hero rotating text (random cycle) |
| `techs` | `string[]` | Hero rotating text (random cycle) |
| `heroBadge` | `string` | Hero badge label |
| `heroTagline` | `string` | Hero subtitle |
| `about.title` | `string` | About heading |
| `about.intro` | `string` | First paragraph (`**bold**` → `<span class="text-brand-primary font-medium italic">`) |
| `about.detailed` | `string` | Second paragraph (`**bold**` → `<span class="text-brand-accent">`) |
| `about.highlights` | `{ title, desc, icon }[]` | Highlight cards |
| `footer.tagline` | `string` | Footer text |
| `footer.copyright` | `string` | Footer copyright |

### `experience.json`

Array of work/volunteer entries.

| Field | Type | Notes |
|-------|------|-------|
| `id` | `string` | Display number ("01", "02", …) |
| `role` | `string` | Job title |
| `company` | `string` | Organization name |
| `period` | `string` | Date range display text |
| `type` | `string` | Filter category: `Technical`, `Research`, `Organizational`, `Design`, `Other` |
| `skills` | `string[]` | Skill chips; first 6 shown, rest behind "+N more" button |
| `description` | `string` | Role description |

### `research.json`

Array of publications.

| Field | Type | Notes |
|-------|------|-------|
| `title` | `string` | Paper title (also used as React key) |
| `authors` | `string` | Semicolon-separated; `Gading, F.R.N.` gets bold highlight |
| `journal` | `string` | Journal/conference name |
| `journalUrl` | `string` | Link to journal page |
| `articleUrl` | `string` | Direct link to article; `#` hides the "View" link |
| `year` | `number` | Publication year (used for sorting) |
| `category` | `string` | Filter: `Scopus Q1`–`Q4`, `IEEE Conference`, `Community Service` |
| `status` | `string` | Badge: `Published`, `Accepted`, `On-Review`, `Submitted`, `Draft` |

### `learning.json`

Array of certifications, bootcamps, and courses.

| Field | Type | Notes |
|-------|------|-------|
| `title` | `string` | Certification/course name |
| `provider` | `string` | Issuing organization |
| `type` | `string` | Filter: `Certification`, `Bootcamp`, `Course` |
| `tags` | `string[]` | Tag filter chips (see tag list in App.tsx) |
| `date` | `string` | Date display text |
| `icon` | `string` | Lucide icon name (resolved by `icons.tsx`) |
| `credentialId` | `string?` | Optional credential ID shown on card |

### `projects.json`

Array of featured projects.

| Field | Type | Notes |
|-------|------|-------|
| `title` | `string` | Project name |
| `subtitle` | `string?` | Optional subtitle |
| `category` | `string` | Filter: `AI / Computer Vision`, `AI / Retrieval-Augmented Generation`, `Software Engineering` |
| `desc` | `string` | Project description |
| `tech` | `string[]` | Tech tags |
| `link` | `string` | Project URL |
| `icon` | `string` | Lucide icon name |

### `navigation.json`

Array of nav links.

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Display label |
| `href` | `string` | Hash anchor (`#about`, `#experience`, etc.) |

### `social.json`

Two arrays: `socialLinks` (hero + footer) and `scholarProfiles` (research section).

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Display label |
| `icon` | `string` | Lucide icon name or custom key from `icons.tsx` |
| `href` | `string` | URL |
| `color` | `string` | Tailwind hover color class (e.g. `hover:text-blue-500`) |

## Icons

Icon names in data files are resolved by `src/data/icons.tsx`. The `getIcon(name, size)` function maps string names to Lucide React components. Custom SVG icons (like `Orcid`, `Scopus`, etc.) are rendered as `<img>` elements pointing to SVGs in `src/data/icon/`.

To add a new icon:
1. If it exists in Lucide: add a mapping in `iconMap` inside `icons.tsx`
2. If custom: add the SVG file to `src/data/icon/` and add an `<img>` fallback in `getIcon`

## Adding a New Entry

1. Edit the relevant JSON file in `src/data/`
2. Follow the existing schema exactly
3. For experience/research, ensure `type`/`category` matches an existing filter value (or add the new filter to the button array in `App.tsx`)
4. Run `npm run lint` to verify no type errors
5. Run `npm run dev` to preview changes