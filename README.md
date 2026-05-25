<div align="center">
  <br />
  <h1>Fazri Gading · Portfolio</h1>
  <p>
    <strong>AI Engineer & Computer Vision Specialist</strong>
  </p>
  <p>
    <em>Architecting vision-centric intelligence to bridge the gap between academic theory and agricultural impact.</em>
  </p>
  <br />
</div>

## Overview

Personal portfolio site built with **Vite**, **React 19**, **TypeScript**, and **Tailwind v4**. Showcases research publications, professional experience, certifications, and engineering projects with a focus on agricultural AI and computer vision.

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (motion.dev) |
| Icons | Lucide React + Custom SVG |

## Sections

- **Home** — Rotating role/tech showcase with social links and theme toggle
- **About** — Background, highlights, and mission statement
- **Experience** — Filterable professional timeline (Technical, Research, Organizational)
- **Research** — Sortable/filterable academic publications with status badges
- **Learning** — Certifications, bootcamps, and courses (filterable by type and tag)
- **Projects** — Filterable project grid with tech tags

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Dev server runs at `http://localhost:3000`.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 (exposed to 0.0.0.0) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | TypeScript type check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` directory |


## Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Entry point
├── index.css            # Tailwind theme + custom styles
└── data/
    ├── profile.json     # Personal info, roles, about
    ├── experience.json  # Work experience entries
    ├── research.json    # Publications list
    ├── projects.json    # Featured projects
    ├── learning.json    # Certifications & training
    ├── navigation.json  # Nav link definitions
    ├── social.json      # Social & scholar profiles
    ├── icons.tsx        # Icon resolver component
    └── icon/            # Custom SVG icons
```

## License

Apache 2.0
