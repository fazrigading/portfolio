// Shared accent-theme override. Route vars live on <html data-route>, so
// overrides paint inline on the SAME element (inline beats stylesheet) and
// restore in <head> before <body> exists. Painting <body> loses to the
// route rules — that was the silent no-op bug.
export const ACCENTS = [
  { key: 'c', color: 'Blue', accent: '#0ccbfd', surface: '#02141c' },
  { key: 'g', color: 'Green', accent: '#a8ff00', surface: '#021a0e' },
  { key: 'y', color: 'Yellow', accent: '#feb705', surface: '#1a1800' },
  { key: 'm', color: 'Magenta', accent: '#ff056f', surface: '#1f0e00' },
  { key: 'p', color: 'Purple', accent: '#c83cff', surface: '#13021f' },
  { key: 'r', color: 'Red', accent: '#d40000', surface: '#1f0307' },
  { key: 'k', color: 'Pink', accent: '#fe38fa', surface: '#1c000f' },
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
