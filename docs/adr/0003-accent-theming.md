# Per-route accent via data-route + CSS vars + Tailwind @theme

Six routes need distinct glows without six stylesheets. Decided: `<body data-route="projects">` sets `--accent` / `--accent-surface`; Tailwind v4 `@theme` maps them to utilities; `SystemBar` selector overrides route default via inline var. Route default wins on navigation.

## Consequences

No per-page CSS files. New route = one row in the accent table + one `data-route` value. Reduced-motion and contrast rules stay global, never per-accent.
