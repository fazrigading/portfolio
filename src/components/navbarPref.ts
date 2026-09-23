// Shared desktop-navbar preference. Default OFF (mobile nav always on, CSS-gated).
// Persists to localStorage; applied as <html data-navbar>.
export type NavbarState = 'on' | 'off';

export function getNavbar(): NavbarState {
  try {
    return localStorage.getItem('dedsec-navbar') === 'on' ? 'on' : 'off';
  } catch {
    return 'off';
  }
}

export function applyNavbar(s: NavbarState) {
  document.documentElement.dataset.navbar = s;
  try {
    localStorage.setItem('dedsec-navbar', s);
  } catch {}
}
