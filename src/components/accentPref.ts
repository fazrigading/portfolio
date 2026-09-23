// Shared accent-theme override. Route vars live on <html data-route>, so
// overrides paint inline on the SAME element (inline beats stylesheet) and
// restore in <head> before <body> exists. Painting <body> loses to the
// route rules — that was the silent no-op bug.
export const ACCENTS = [
  { color: 'Cyan', accent: '#00f0ff', surface: '#02141c' },
  { color: 'Green', accent: '#00ff66', surface: '#021a0e' },
  { color: 'Yellow', accent: '#ffe600', surface: '#1a1800' },
  { color: 'Orange', accent: '#ff6b00', surface: '#1f0e00' },
  { color: 'Purple', accent: '#a822ff', surface: '#13021f' },
  { color: 'Red', accent: '#ff1744', surface: '#1f0307' },
  { color: 'Pink', accent: '#ff007a', surface: '#1c000f' },
];

export function paintAccent(accent: string, surface: string) {
  document.documentElement.style.setProperty('--accent', accent);
  document.documentElement.style.setProperty('--accent-surface', surface);
  try {
    localStorage.setItem('dedsec-accent', JSON.stringify({ accent, surface }));
  } catch {}
}

export function resetAccent() {
  document.documentElement.style.removeProperty('--accent');
  document.documentElement.style.removeProperty('--accent-surface');
  try {
    localStorage.removeItem('dedsec-accent');
  } catch {}
}

export function currentAccent(): string {
  try {
    const a = JSON.parse(localStorage.getItem('dedsec-accent') || 'null');
    if (a?.accent) {
      const hit = ACCENTS.find((c) => c.accent === a.accent);
      return hit ? hit.color : a.accent;
    }
  } catch {}
  return 'route default';
}
