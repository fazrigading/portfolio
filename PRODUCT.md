# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

(delegated from existing codebase) Astro 7 static MPA + TypeScript, Tailwind v4, React 19 islands (max 2 `.tsx`), MDX collections, GitHub Pages deploy at `/portfolio/` base path. Keep the existing stack; no framework change.

## Users

1. **Primary — recruiters / hiring teams / research collaborators.** Arrive from LinkedIn, resume links, referrals. Judge AI/systems engineering fit: research publications, work history, tech breadth, direct contact.
2. **Secondary — developer community, peers, personal connections.** Explore the persona side: games, art, terminal, blog.
3. A visitor should never be confused about which side they are in. The zone choice must be obvious and re-choosable.

## Product Purpose

Personal portfolio of Fazri Gading (Applied AI + Systems Engineer), presenting two deliberately distinct identities:

- **Professional zone** — everything a recruiter, hiring team, or research collaborator needs: editorial bio, experience, certifications, research, direct contact. Clean, modern, elegant, big type.
- **Personal zone** — the DedSec/hacker persona: terminal, ASCII, gaming library, art/photography hobbies, glitch aesthetic.

Success = a primary visitor (recruiter) reaches the contact CTA within ~2 interactions; a personal visitor finds the persona delightful and explores games/art/blog.

## Positioning

Two-worlds portfolio: a single homepage acts as a fullsize split doorway — top side open to the polished professional presentation, bottom side open to the persona presentation. No peer site carries both an executive-grade editorial presence and a fully committed hacker terminal world. The mechanism: **one page, two worlds, hover-to-expand choice** — not tabs, not a toggle, a physically split surface.

## Operating Context

- Hosted on GitHub Pages at `BASE_URL=/portfolio/`; all links must include `import.meta.env.BASE_URL`.
- Static MPA; no server. Interactive pieces are ≤2 React islands — everything else ships as HTML/JS.
- Data flows from `src/data/*.json` and MDX frontmatter; visual content is separated from code.
- CI: lint (`tsc --noEmit`) + build on all branches except master; deploy on push to master.
- No test framework. Verification = lint + build pass + visual inspection.

## Capabilities and Constraints

Confirmed:

- Direct reach-out CTAs on Professional side: **E-mail** (mailto:fazrigading@gmail.com), **LinkedIn** (linkedin.com/in/fazrigading), **GitHub** (github.com/fazrigading); Google Dev profile + ORCID as secondary proof links.
- Homepage: fullsize vertical split (top = Professional, bottom = Personal). Hover expands hovered panel toward ~70–75% viewport while the other recedes; both panels clickable. Boot animation first paint, panels readable immediately after.
- Zone nav: one-time choice on the split homepage; a persistent zone badge/toggle lets you switch back later. Each zone carries its own nav + skin.
- Professional pages (~4): split-landing CTA presence, editorial bio/works, experience+certifications, research list, contact CTA.
- Personal pages (~4): immersive hub with interactive terminal, games covers wall, art/photography masonry, persona-flavored comms.
- Projects page: **shared neutral** — one page, but skinned per entry zone (opens light when the visitor came from Professional, dark when from Personal).
- Blog: exists in **both** zones, cross-linked; one content source, two skins.
- Research papers appear in **both** zones (clean scholarly list in Pro, archive rows in Personal).
- Skin separation is **hard**: Professional zone has no terminal shell, no ASCII art, no CRT overlay; Personal zone keeps the full persona.
- Professional zone gets **dark default + light toggle**; Personal zone keeps single dark identity.
- Terminal verbs trimmed to core (goto/cat/clear); palette/accents move to UI controls.
- Per-route accent switching stays on Personal zone only; Professional zone gets one fixed elegant accent.
- Professional zone: solid backgrounds, no wallpaper photos. Personal zone keeps the wallpaper pool.
- Professional zone typography: fresh sans for body/readability; monospace reserved for code/labels only.
- Animation: frontend animation library for the split intro and hover expansion; reduced-motion must disable boot animation and heavy effects.
- URL plan: fresh `/pro/...` (professional) and `/dev/...` (personal) prefixes for zone pages; homepage `/` is the split doorway itself. Redirects: existing routes map old→Pro (`about`→`/pro/about`, `experience`→`/pro/experience`, `research`→`/pro/research`, `blog`→`/pro/blog`, `contact`→`/pro/contact`).
- Content/data plumbing: split JSON per zone (professional copy sharpened separately from `personal.json` copy).
- Art/photography gallery: real photographs in `public/gallery`, browsable as a slideshow with All, Nature, and Objects filters.
- Data source for game covers/art already exists in `public/game-covers`, `public/music-covers`, `src/assets/wallpapers`.

Deliberately undecided (do this work during design, not init):

- Exact page names/slug list inside `/pro` and `/dev`.
- Which single font family replaces the sans body in Professional zone.
- Exact accent hue for Professional zone.
- Whether terminal lives on Personal hub home page or a dedicated `/dev/terminal`.

## Brand Commitments

- **Name:** Fazri Gading — used across both worlds, professional honorific absent.
- **Persona:** DedSec (Watch Dogs 2–inspired) owns the Personal zone — terminal shell, glitch flourishes, CRT overlay. Explicitly preserved; a future rebrand away from this persona must be asked for.
- **Factual claims stay tied to real data:** published Scopus-indexed papers, teaching/mentorship totals from `profile.json`. Never inflate; never invent testimonials.

## Evidence on Hand

- Published Scopus-indexed papers (some Q1 journals) with working links — `src/data/research.json`.
- GitHub profile (code evidence) + LinkedIn.
- 100+ Steam game covers + genres scraped to `public/game-covers` + `games.json` seed.
- Wallpaper pool: `src/assets/wallpapers/{desktop,mobile}` for Personal zone.
- Portfolio portrait photo: `src/assets/images/fazrigading-large.webp`.
- Professional intro copy already drafted in `profile.json` (reuse / sharpen, don't rewrite from scratch).
- Absence: no real art/photography files yet (see placeholder plan). No logos/badges to respect.

## Product Principles

1. **Two worlds, full commitment.** Each zone commits its skin completely; no half-zines inside the editorial world, no corporate tint inside DedSec.
2. **Recruiters reach contact in ≤2 clicks.** Every Professional page keeps one obvious direct-contact affordance.
3. **Persona as experience, not decoration.** The Personal zone is a playable artifact (terminal, covers wall, glitch), not a filtered skin.
4. **Data-driven, code-lean.** Page content edits land in JSON/MDX, not component files; islands stay ≤2.
5. **Respect motion and contrast.** Boot animation disabled by user motion preference; body copy always high contrast in both skins.
