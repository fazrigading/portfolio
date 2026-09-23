# Per-route accent via data-route + CSS vars + Tailwind @theme

Seven routes need distinct glows without seven stylesheets. Decided: `<html data-route="projects">` sets `--accent` / `--accent-surface`; Tailwind v4 `@theme` maps them to utilities; palette/terminal paint overrides as inline vars on the same `<html>` element (inline beats stylesheet — painting `<body>` loses to the route rules). Route default returns on navigation unless an override is stored.

## Consequences

No per-page CSS files. New route = one row in the accent table + one `data-route` value. Reduced-motion and contrast rules stay global, never per-accent.
