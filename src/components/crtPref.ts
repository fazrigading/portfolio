// CRT overlay preference. Source of truth is <html data-crt>, seeded pre-paint
// by the Layout head script. Default ON.
export type CrtState = 'on' | 'off';

export function getCrt(): CrtState {
  try {
    return document.documentElement.dataset.crt === 'off' ? 'off' : 'on';
  } catch {
    return 'on';
  }
}

export function applyCrt(s: CrtState) {
  document.documentElement.dataset.crt = s;
  try {
    localStorage.setItem('dedsec-crt', s);
  } catch {}
}
