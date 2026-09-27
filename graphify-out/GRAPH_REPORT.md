# Graph Report - portfolio  (2026-09-27)

## Corpus Check
- 56 files · ~765,793 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 212 nodes · 243 edges · 37 communities (17 shown, 19 thin omitted)
- Extraction: 89% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `744aed4b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- commands.ts
- package.json
- Layout.astro
- compilerOptions
- LinkedIn profile Fazri Gading
- extract-games-data.py
- Astro Static MPA
- dependencies
- scripts
- about.txt terminal bio
- content.config.ts
- Per-route accent via data-route and CSS vars
- Deploy Workflow
- Scopus brand icon, author citation profile link
- ADR-0001 full Astro stack decision
- React 19 islands TerminalHero and CommandPalette
- devDependencies
- graphify.js
- reaper-ascii-art-tiled-mobile.webp file
- Base path /portfolio/ on GitHub Pages sub-path
- CI lint-build and deploy pipelines
- Single command registry in commands.ts
- Data-driven content in src/data JSON and txt
- Dedsec circular logo mobile artwork
- DedSec Watch Dogs 2 portfolio design system v2
- Academia.edu brand icon, scholar profile link
- Google for Developers brand icon, developer profile link
- ORCID brand icon, researcher identifier profile link
- Skull ASCII tiled artwork
- IEEE brand icon, member and publication profile link
- BCS Universitas Mulawarman
- fazrigading@gmail.com
- roles.txt role rotation
- Systems Engineer
- Fazri Gading portfolio site overview
- ML math Python Git data analytics credentials

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `runVerb()` - 10 edges
3. `scripts` - 7 edges
4. `paletteItems()` - 6 edges
5. `process_game_list()` - 6 edges
6. `go()` - 5 edges
7. `slugify()` - 5 edges
8. `paintAccent()` - 4 edges
9. `resetAccent()` - 4 edges
10. `applyNavbar()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Interactive scope v1 shipped vs v2 deferred` --conceptually_related_to--> `React 19 islands TerminalHero and CommandPalette`  [AMBIGUOUS]
  DESIGN.md → AGENTS.md
- `ADR-0003 accent theming mechanism` --conceptually_related_to--> `Per-route accent via data-route and CSS vars`  [INFERRED]
  docs/adr/0003-accent-theming.md → DESIGN.md
- `ADR-0002 typeface lock decision` --conceptually_related_to--> `Typography lock VT323 Syne JetBrains Mono`  [INFERRED]
  docs/adr/0002-typefaces.md → DESIGN.md
- `Base Path Portfolio` --conceptually_related_to--> `Deploy Workflow`  [INFERRED]
  docs/deployment.md → .github/workflows/deploy.yml
- `Deploy Workflow` --implements--> `GitHub Pages Deployment`  [INFERRED]
  .github/workflows/deploy.yml → docs/deployment.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **terminal identity stack** — public_txt_about_computer_vision, public_txt_stack_vision_stack, public_txt_stack_data_stack [EXTRACTED 0.75]
- **oil palm vision research threads** — resources_fazri_gading_linkedin_profile_ganoderma_detection, resources_fazri_gading_orcid_profile_oil_palm_counting, resources_fazri_gading_orcid_profile_ganoderma_dataset [EXTRACTED 0.75]
- **CI CD Pipeline Group** — github_workflows_ci_ci_workflow, github_workflows_deploy_deploy_workflow, docs_deployment_github_pages [EXTRACTED 1.00]
- **DedSec design token flow** — design_dedsec_system, design_accent_theming, design_typography_system [EXTRACTED 1.00]
- **Static MPA plus islands architecture** — agents_astro_stack, agents_react_islands, docs_adr_0001_full_stack_stack_decision [EXTRACTED 1.00]
- **Content Migration Placeholders** — src_content_projects_placeholder_projects_placeholder, src_content_research_placeholder_research_placeholder, docs_data_guide_content_collections [INFERRED 0.85]
- **public_icon_scholar_profiles** — public_icon_academia_academia_edu, public_icon_gs_google_scholar, public_icon_researchgate_researchgate, public_icon_orcid_orcid, public_icon_smsc_semantic_scholar [INFERRED 0.85]

## Communities (37 total, 19 thin omitted)

### Community 0 - "commands.ts"
Cohesion: 0.14
Nodes (23): react, ACCENTS, currentAccent(), paintAccent(), resetAccent(), CommandPalette(), Item, err() (+15 more)

### Community 1 - "package.json"
Cohesion: 0.11
Nodes (18): allowScripts, esbuild@0.28.2, name, private, type, version, astro, @astrojs/mdx (+10 more)

### Community 2 - "Layout.astro"
Cohesion: 0.14
Nodes (7): slugify(), links, string, repeat(), posts, featured, getStaticPaths()

### Community 3 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, allowJs, allowSyntheticDefaultImports, experimentalDecorators, isolatedModules, jsx, lib (+8 more)

### Community 4 - "LinkedIn profile Fazri Gading"
Cohesion: 0.13
Nodes (15): contact.txt channels, github.com/fazrigading and linkedin/in/fazrigading, Applied AI Engineer, Researcher, Certifications.md 39 credentials, DeepLearning.AI TensorFlow and ML courses, TensorFlow Developer Certificate 86486958 Nov 2023, Bangkit Academy ML mentor 25 students (+7 more)

### Community 5 - "extract-games-data.py"
Cohesion: 0.24
Nodes (11): download_image(), get_game_details(), get_steam_app_id(), load_existing_results(), process_game_list(), Remove special characters for safe file naming., Search Steam store API for the game title to find its App ID [Medium…, Fetch genres object array and high-resolution library hero image from Steam… (+3 more)

### Community 6 - "Astro Static MPA"
Cohesion: 0.22
Nodes (11): Astro Static MPA, Single Command Registry, MDX Content Collections, JSON Data Layer, Design Tokens Single Dark Theme, Tailwind v4 Theming, V2 Deferred Interactions, Research NodeGraph Canvas (+3 more)

### Community 7 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, astro, @astrojs/mdx, @astrojs/react, lucide-react, react, react-dom, sharp (+1 more)

### Community 8 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, clean, dev, lint, preview, stop

### Community 9 - "about.txt terminal bio"
Cohesion: 0.33
Nodes (6): about.txt terminal bio, Computer Vision Specialist and AI Engineer, PyTorch plus TensorFlow with YOLO, Python Pandas NumPy Scikit-learn MLflow, stack.txt loadout, YOLO PyTorch TensorFlow Keras OpenCV

### Community 10 - "content.config.ts"
Cohesion: 0.40
Nodes (4): blog, collections, projects, research

### Community 11 - "Per-route accent via data-route and CSS vars"
Cohesion: 0.50
Nodes (4): Per-route accent via data-route and CSS vars, Typography lock VT323 Syne JetBrains Mono, ADR-0002 typeface lock decision, ADR-0003 accent theming mechanism

### Community 12 - "Deploy Workflow"
Cohesion: 0.67
Nodes (4): Base Path Portfolio, GitHub Pages Deployment, CI Workflow, Deploy Workflow

### Community 13 - "Scopus brand icon, author citation profile link"
Cohesion: 0.67
Nodes (3): Google Scholar brand icon, scholar profile link, Scopus brand icon, author citation profile link, Web of Science brand icon, researcher citation profile link

### Community 14 - "ADR-0001 full Astro stack decision"
Cohesion: 0.67
Nodes (3): Astro 7 static MPA plus TypeScript stack, Locked tech stack Astro Tailwind React MDX Lucide Shiki, ADR-0001 full Astro stack decision

### Community 15 - "React 19 islands TerminalHero and CommandPalette"
Cohesion: 0.67
Nodes (3): React 19 islands TerminalHero and CommandPalette, Interactive scope v1 shipped vs v2 deferred, Layout SystemBar CRTOverlay shell on all routes

### Community 16 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, tailwindcss, @types/node, @types/react, @types/react-dom, typescript

## Ambiguous Edges - Review These
- `React 19 islands TerminalHero and CommandPalette` → `Interactive scope v1 shipped vs v2 deferred`  [AMBIGUOUS]
  DESIGN.md · relation: conceptually_related_to

## Knowledge Gaps
- **106 isolated node(s):** `string`, `links`, `ROUTES`, `FILES`, `ROUTE_KEYS` (+101 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 122 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `React 19 islands TerminalHero and CommandPalette` and `Interactive scope v1 shipped vs v2 deferred`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `react` connect `commands.ts` to `package.json`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `string`, `links`, `ROUTES` to the rest of the system?**
  _106 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `commands.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11052631578947368 - nodes in this community are weakly interconnected._