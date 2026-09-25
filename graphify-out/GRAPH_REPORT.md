# Graph Report - portfolio  (2026-09-26)

## Corpus Check
- Large corpus: 177 files · ~1,540,175 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 260 nodes · 272 edges · 55 communities (17 shown, 37 thin omitted)
- Extraction: 89% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Terminal Command System
- Build Config & Deps
- Pages & Components
- TypeScript Config
- Career & Credentials
- Green Wallpaper #5
- Architecture Concepts
- Runtime Dependencies
- NPM Scripts
- AI Identity & Stack
- Content Collections
- Accent & Typeface ADRs
- CI/CD & Deployment
- Citation Index Icons
- Full-Stack Decision
- React Islands Shell
- Pink Collage Artwork
- Extraction Noise (prompt leak)
- Reaper ASCII Art
- Green Alt-2 Artwork
- Base Path
- CI Pipeline
- Command Registry
- Data Layer
- Circular Logo Art
- Pink Hackerspace Art
- Red Holy Lulz Art
- Red Mobile Collage
- Design System
- Scholar Social Icons
- Dev Profile Icons
- Researcher ID Icons
- Skull ASCII Art
- Logged-In Skull Art
- Reaper Character Art
- Green Alt-1080p Art
- Green Alt-1 Art
- Green-Magenta Remix Art
- Blue Wallpaper #2
- IEEE Icon
- Unmul Degree
- Contact Email
- Roles File
- Systems Engineer Role
- Site Overview
- ML Foundations Creds
- Blue-Alt Collage
- Blue-Alt Mobile Art
- Magenta Alt Art
- Magenta Official #3
- Purple Glitch Skull
- Purple Alt Collage
- Purple Official #1
- Yellow Official #4

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Official green wallpaper #5 artwork — Expect Us skeleton composition` - 15 edges
3. `runVerb()` - 12 edges
4. `scripts` - 7 edges
5. `paletteItems()` - 7 edges
6. `go()` - 5 edges
7. `slugify()` - 5 edges
8. `react` - 4 edges
9. `paintAccent()` - 4 edges
10. `resetAccent()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Conference speaking portrait of Fazri Gading` --conceptually_related_to--> `AI Trainer EBIT Co Seoul 2026`  [INFERRED]
  src/data/fazrigading-large.webp → resources/Fazri-Gading-Linkedin-Profile.md
- `Interactive scope v1 shipped vs v2 deferred` --conceptually_related_to--> `React 19 islands TerminalHero and CommandPalette`  [AMBIGUOUS]
  DESIGN.md → AGENTS.md
- `ADR-0001 full Astro stack decision` --conceptually_related_to--> `Astro 7 static MPA plus TypeScript stack`  [INFERRED]
  docs/adr/0001-full-stack.md → AGENTS.md
- `React 19 islands TerminalHero and CommandPalette` --conceptually_related_to--> `Layout SystemBar CRTOverlay shell on all routes`  [INFERRED]
  AGENTS.md → DESIGN.md
- `Single command registry in commands.ts` --shares_data_with--> `Shared commands.ts terminal and palette registry`  [INFERRED]
  AGENTS.md → DESIGN.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **DedSec design token flow** — design_dedsec_system, design_accent_theming, design_typography_system [EXTRACTED 1.00]
- **Static MPA plus islands architecture** — agents_astro_stack, agents_react_islands, docs_adr_0001_full_stack_stack_decision [EXTRACTED 1.00]
- **CI CD Pipeline Group** — github_workflows_ci_ci_workflow, github_workflows_deploy_deploy_workflow, docs_deployment_github_pages [EXTRACTED 1.00]
- **Content Migration Placeholders** — src_content_projects_placeholder_projects_placeholder, src_content_research_placeholder_research_placeholder, docs_data_guide_content_collections [INFERRED 0.85]
- **terminal identity stack** — public_txt_about_computer_vision, public_txt_stack_vision_stack, public_txt_stack_data_stack [EXTRACTED 0.75]
- **oil palm vision research threads** — resources_fazri_gading_linkedin_profile_ganoderma_detection, resources_fazri_gading_orcid_profile_oil_palm_counting, resources_fazri_gading_orcid_profile_ganoderma_dataset [EXTRACTED 0.75]
- **public_icon_scholar_profiles** — public_icon_academia_academia_edu, public_icon_gs_google_scholar, public_icon_researchgate_researchgate, public_icon_orcid_orcid, public_icon_smsc_semantic_scholar [INFERRED 0.85]
- **public_icon_bibliometric_indexes** — public_icon_scopus_scopus, public_icon_wos_web_of_science, src_data_icon_elsevier_elsevier, public_icon_ieee_ieee [INFERRED 0.85]

## Communities (55 total, 37 thin omitted)

### Community 0 - "Terminal Command System"
Cohesion: 0.13
Nodes (25): ACCENTS, currentAccent(), paintAccent(), resetAccent(), CommandPalette(), Item, err(), FILES (+17 more)

### Community 1 - "Build Config & Deps"
Cohesion: 0.07
Nodes (26): allowScripts, esbuild@0.28.2, devDependencies, tailwindcss, @types/node, @types/react, @types/react-dom, typescript (+18 more)

### Community 2 - "Pages & Components"
Cohesion: 0.13
Nodes (7): slugify(), links, string, string, posts, featured, getStaticPaths()

### Community 3 - "TypeScript Config"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, allowJs, allowSyntheticDefaultImports, experimentalDecorators, isolatedModules, jsx, lib (+8 more)

### Community 4 - "Career & Credentials"
Cohesion: 0.12
Nodes (16): contact.txt channels, github.com/fazrigading and linkedin/in/fazrigading, Applied AI Engineer, Researcher, Certifications.md 39 credentials, DeepLearning.AI TensorFlow and ML courses, TensorFlow Developer Certificate 86486958 Nov 2023, Bangkit Academy ML mentor 25 students (+8 more)

### Community 6 - "Architecture Concepts"
Cohesion: 0.22
Nodes (11): Astro Static MPA, Single Command Registry, MDX Content Collections, JSON Data Layer, Design Tokens Single Dark Theme, Tailwind v4 Theming, V2 Deferred Interactions, Research NodeGraph Canvas (+3 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.22
Nodes (9): dependencies, astro, @astrojs/mdx, @astrojs/react, lucide-react, react, react-dom, sharp (+1 more)

### Community 8 - "NPM Scripts"
Cohesion: 0.29
Nodes (7): scripts, build, clean, dev, lint, preview, stop

### Community 9 - "AI Identity & Stack"
Cohesion: 0.33
Nodes (6): about.txt terminal bio, Computer Vision Specialist and AI Engineer, PyTorch plus TensorFlow with YOLO, Python Pandas NumPy Scikit-learn MLflow, stack.txt loadout, YOLO PyTorch TensorFlow Keras OpenCV

### Community 10 - "Content Collections"
Cohesion: 0.40
Nodes (4): blog, collections, projects, research

### Community 11 - "Accent & Typeface ADRs"
Cohesion: 0.50
Nodes (4): Per-route accent via data-route and CSS vars, Typography lock VT323 Syne JetBrains Mono, ADR-0002 typeface lock decision, ADR-0003 accent theming mechanism

### Community 12 - "CI/CD & Deployment"
Cohesion: 0.67
Nodes (4): Base Path Portfolio, GitHub Pages Deployment, CI Workflow, Deploy Workflow

### Community 13 - "Citation Index Icons"
Cohesion: 0.50
Nodes (4): Google Scholar brand icon, scholar profile link, Scopus brand icon, author citation profile link, Web of Science brand icon, researcher citation profile link, Elsevier brand icon, publisher profile link

### Community 14 - "Full-Stack Decision"
Cohesion: 0.67
Nodes (3): Astro 7 static MPA plus TypeScript stack, Locked tech stack Astro Tailwind React MDX Lucide Shiki, ADR-0001 full Astro stack decision

### Community 15 - "React Islands Shell"
Cohesion: 0.67
Nodes (3): React 19 islands TerminalHero and CommandPalette, Interactive scope v1 shipped vs v2 deferred, Layout SystemBar CRTOverlay shell on all routes

### Community 16 - "Pink Collage Artwork"
Cohesion: 0.67
Nodes (3): The Return of Dedsec pink collage artwork, dedsec-pink-1080p.webp file, dedsec-pink-1536p.webp file

### Community 18 - "Reaper ASCII Art"
Cohesion: 0.67
Nodes (3): Reaper ASCII art artwork, reaper-ascii-art.webp file, reaper-ascii-art-tiled-mobile.webp file

## Ambiguous Edges - Review These
- `React 19 islands TerminalHero and CommandPalette` → `Interactive scope v1 shipped vs v2 deferred`  [AMBIGUOUS]
  DESIGN.md · relation: conceptually_related_to

## Knowledge Gaps
- **136 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+131 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 169 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **37 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `React 19 islands TerminalHero and CommandPalette` and `Interactive scope v1 shipped vs v2 deferred`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `react` connect `Build Config & Deps` to `Terminal Command System`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Runtime Dependencies` to `Build Config & Deps`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM Scripts` to `Build Config & Deps`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _136 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Terminal Command System` be split into smaller, more focused modules?**
  _Cohesion score 0.13118279569892474 - nodes in this community are weakly interconnected._
- **Should `Build Config & Deps` be split into smaller, more focused modules?**
  _Cohesion score 0.0735632183908046 - nodes in this community are weakly interconnected._