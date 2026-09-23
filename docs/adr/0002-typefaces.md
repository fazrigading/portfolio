# Lock typefaces to VT323 / Syne / JetBrains Mono

DESIGN.md listed 3 pixel fonts + 3 punk/sans + 2 monos as "or" — unbuildable, 5+ webfont loads. Decided: Display `VT323`, Sub `Syne` bold uppercase, Body `JetBrains Mono`. All three load from Google Fonts in `Layout.astro` head (single `<link>`).
