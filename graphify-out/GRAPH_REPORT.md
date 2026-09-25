# Graph Report - portfolio  (2026-09-26)

## Corpus Check
- 54 files · ~465,910 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 208 nodes · 239 edges · 36 communities (16 shown, 19 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98cf9144`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- commands.ts
- package.json
- Layout.astro
- compilerOptions
- LinkedIn profile Fazri Gading
- devDependencies
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
2. `runVerb()` - 12 edges
3. `paletteItems()` - 7 edges
4. `scripts` - 7 edges
5. `go()` - 5 edges
6. `slugify()` - 5 edges
7. `paintAccent()` - 4 edges
8. `resetAccent()` - 4 edges
9. `applyCrt()` - 4 edges
10. `applyNavbar()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Conference speaking portrait of Fazri Gading` --conceptually_related_to--> `AI Trainer EBIT Co Seoul 2026`  [INFERRED]
  src/data/fazrigading-large.webp → resources/Fazri-Gading-Linkedin-Profile.md
- `Interactive scope v1 shipped vs v2 deferred` --conceptually_related_to--> `React 19 islands TerminalHero and CommandPalette`  [AMBIGUOUS]
  DESIGN.md → AGENTS.md
- `ADR-0003 accent theming mechanism` --conceptually_related_to--> `Per-route accent via data-route and CSS vars`  [INFERRED]
  docs/adr/0003-accent-theming.md → DESIGN.md
- `ADR-0002 typeface lock decision` --conceptually_related_to--> `Typography lock VT323 Syne JetBrains Mono`  [INFERRED]
  docs/adr/0002-typefaces.md → DESIGN.md
- `Base Path Portfolio` --conceptually_related_to--> `Deploy Workflow`  [INFERRED]
  docs/deployment.md → .github/workflows/deploy.yml

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **terminal identity stack** — public_txt_about_computer_vision, public_txt_stack_vision_stack, public_txt_stack_data_stack [EXTRACTED 0.75]
- **oil palm vision research threads** — resources_fazri_gading_linkedin_profile_ganoderma_detection, resources_fazri_gading_orcid_profile_oil_palm_counting, resources_fazri_gading_orcid_profile_ganoderma_dataset [EXTRACTED 0.75]
- **CI CD Pipeline Group** — github_workflows_ci_ci_workflow, github_workflows_deploy_deploy_workflow, docs_deployment_github_pages [EXTRACTED 1.00]
- **DedSec design token flow** — design_dedsec_system, design_accent_theming, design_typography_system [EXTRACTED 1.00]
- **Static MPA plus islands architecture** — agents_astro_stack, agents_react_islands, docs_adr_0001_full_stack_stack_decision [EXTRACTED 1.00]
- **Content Migration Placeholders** — src_content_projects_placeholder_projects_placeholder, src_content_research_placeholder_research_placeholder, docs_data_guide_content_collections [INFERRED 0.85]
- **public_icon_bibliometric_indexes** — public_icon_scopus_scopus, public_icon_wos_web_of_science, src_data_icon_elsevier_elsevier, public_icon_ieee_ieee [INFERRED 0.85]
- **public_icon_scholar_profiles** — public_icon_academia_academia_edu, public_icon_gs_google_scholar, public_icon_researchgate_researchgate, public_icon_orcid_orcid, public_icon_smsc_semantic_scholar [INFERRED 0.85]

## Communities (36 total, 19 thin omitted)

### Community 0 - "commands.ts"
Cohesion: 0.13
Nodes (25): ACCENTS, currentAccent(), paintAccent(), resetAccent(), CommandPalette(), Item, err(), FILES (+17 more)

### Community 1 - "package.json"
Cohesion: 0.09
Nodes (20): allowScripts, esbuild@0.28.2, name, private, type, version, astro, @astrojs/mdx (+12 more)

### Community 2 - "Layout.astro"
Cohesion: 0.15
Nodes (7): slugify(), links, string, string, posts, featured, getStaticPaths()

### Community 3 - "compilerOptions"
Cohesion: 0.12
Nodes (16): compilerOptions, allowImportingTsExtensions, allowJs, allowSyntheticDefaultImports, experimentalDecorators, isolatedModules, jsx, lib (+8 more)

### Community 4 - "LinkedIn profile Fazri Gading"
Cohesion: 0.12
Nodes (16): contact.txt channels, github.com/fazrigading and linkedin/in/fazrigading, Applied AI Engineer, Researcher, Certifications.md 39 credentials, DeepLearning.AI TensorFlow and ML courses, TensorFlow Developer Certificate 86486958 Nov 2023, Bangkit Academy ML mentor 25 students (+8 more)

### Community 5 - "devDependencies"
Cohesion: 0.33
Nodes (6): devDependencies, tailwindcss, @types/node, @types/react, @types/react-dom, typescript

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
Cohesion: 0.50
Nodes (4): Google Scholar brand icon, scholar profile link, Scopus brand icon, author citation profile link, Web of Science brand icon, researcher citation profile link, Elsevier brand icon, publisher profile link

### Community 14 - "ADR-0001 full Astro stack decision"
Cohesion: 0.67
Nodes (3): Astro 7 static MPA plus TypeScript stack, Locked tech stack Astro Tailwind React MDX Lucide Shiki, ADR-0001 full Astro stack decision

### Community 15 - "React 19 islands TerminalHero and CommandPalette"
Cohesion: 0.67
Nodes (3): React 19 islands TerminalHero and CommandPalette, Interactive scope v1 shipped vs v2 deferred, Layout SystemBar CRTOverlay shell on all routes

## Ambiguous Edges - Review These
- `React 19 islands TerminalHero and CommandPalette` → `Interactive scope v1 shipped vs v2 deferred`  [AMBIGUOUS]
  DESIGN.md · relation: conceptually_related_to

## Knowledge Gaps
- **111 isolated node(s):** `Item`, `TResult`, `CrtState`, `NavbarState`, `FILES` (+106 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 122 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `React 19 islands TerminalHero and CommandPalette` and `Interactive scope v1 shipped vs v2 deferred`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `react` connect `package.json` to `commands.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **What connects `Item`, `TResult`, `CrtState` to the rest of the system?**
  _111 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `commands.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13118279569892474 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09420289855072464 - nodes in this community are weakly interconnected._