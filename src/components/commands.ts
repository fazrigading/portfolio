// Single command registry driving TerminalHero AND CommandPalette.
// Same verbs, same options, both surfaces — add a command here, never in
// the islands. Terminal-only I/O (clear, cat output) stays in the terminal;
// the palette's audio stub is a v2 placeholder with no terminal twin.
import { applyNavbar, getNavbar } from './navbarPref';
import { ACCENTS, currentAccent, paintAccent, resetAccent } from './accentPref';
import { applyCrt, getCrt } from './crtPref';

export const ROUTES = ['/', '/projects', '/about', '/experience', '/research', '/blog', '/contact'];
export const FILES = ['about.txt', 'roles.txt', 'stack.txt', 'contact.txt'];
export const ROUTE_KEYS: Record<string, string> = {
  p: 'projects',
  a: 'about',
  e: 'experience',
  r: 'research',
  b: 'blog',
  c: 'contact',
};

export type TermLine = { text: string; kind: 'in' | 'out' | 'err' };

export const HELP: TermLine[] = [
  {
    text: "DEDSEC secure shell v1 — NAV_BAR is OFF on desktop. drive with:",
    kind: "out",
  },
  { text: "help\t\t\t\tshow this readout", kind: "out" },
  { text: "goto <route>\t\tjump to one of (letter shortcuts):", kind: "out" },
  { text: "\t/\t\t\t\thome (this terminal)", kind: "out" },
  { text: "\tprojects (p)\t\tpayload index (PORT filter)", kind: "out" },
  { text: "\tabout (a)\t\tdossier + stack + uplinks", kind: "out" },
  { text: "\texperience (e)\t\twork + learning timelines", kind: "out" },
  { text: "\tresearch (r)\t\tpaper archive", kind: "out" },
  { text: "\tblog (b)\t\ttransmissions", kind: "out" },
  { text: "\tcontact (c)\t\tcomms form", kind: "out" },
  { text: "cat <file>\t\t\tprint a dossier file:", kind: "out" },
  { text: "\tabout.txt\t\twhoami, one screen", kind: "out" },
  { text: "\troles.txt\t\toperator roles", kind: "out" },
  { text: "\tstack.txt\t\tcore stack", kind: "out" },
  { text: "\tcontact.txt\t\treach me", kind: "out" },
  { text: "navbar <on|off>\t\ttoggle navbar (mobile always on)", kind: "out" },
  { text: "accent <color>\t\tswitch theme color", kind: "out" },
  { text: "\tdefault\t\t\tclear override, route default", kind: "out" },
  { text: "\tc\t\t\t\tcyan", kind: "out" },
  { text: "\tg\t\t\t\tgreen", kind: "out" },
  { text: "\ty\t\t\t\tyellow", kind: "out" },
  { text: "\to\t\t\t\torange", kind: "out" },
  { text: "\tp\t\t\t\tpurple", kind: "out" },
  { text: "\tr\t\t\t\tred", kind: "out" },
  { text: "\tk\t\t\t\tpink", kind: "out" },
  { text: "crt <on|off>\t\ttoggle scanline overlay", kind: "out" },
  { text: "clear\t\t\t\twipe the terminal", kind: "out" },
];

export type TResult = { lines: TermLine[]; navigate?: string };

const out = (text: string): TermLine => ({ text, kind: 'out' });
const err = (text: string): TermLine => ({ text, kind: 'err' });

export async function runVerb(verb: string, arg: string, base: string): Promise<TResult> {
  switch (verb) {
    case 'help':
      return { lines: HELP };
    case 'goto': {
      if (!arg) {
        return { lines: [err(`usage: goto <route> — routes: ${ROUTES.join(' ')}`)] };
      }
      const dest = ROUTE_KEYS[arg.toLowerCase()] ?? arg;
      const target = `/${dest}`;
      if (!ROUTES.includes(target)) {
        return { lines: [err(`ERR_0x99: unknown route '${arg}'. routes: ${ROUTES.join(' ')}`)] };
      }
      return { lines: [out(`tunneling → ${target} ...`)], navigate: target === '/' ? base : `${base}${arg}` };
    }
    case 'cat': {
      if (!arg) return { lines: [err(`usage: cat <file> — files: ${FILES.join(' ')}`)] };
      if (!FILES.includes(arg)) {
        return { lines: [err(`ERR_0x99: no such file '${arg}'. files: ${FILES.join(' ')}`)] };
      }
      try {
        const res = await fetch(`${base}txt/${arg}`);
        if (!res.ok) throw new Error(String(res.status));
        const body = (await res.text()).trimEnd();
        return { lines: body.split('\n').map((text) => out(text)) };
      } catch {
        return { lines: [err(`ERR_0x99: could not read '${arg}'. retry.`)] };
      }
    }
    case 'navbar': {
      if (arg === 'on' || arg === 'off') {
        applyNavbar(arg);
        return { lines: [out(`NAV_BAR: ${arg === 'on' ? 'ONLINE' : 'OFFLINE'} (persisted)`)] };
      }
      return { lines: [err(`usage: navbar <on|off> (now: ${getNavbar() === 'on' ? 'ONLINE' : 'OFFLINE'})`)] };
    }
    case 'accent': {
      const want = arg.toLowerCase();
      const hit = ACCENTS.find((a) => a.color.toLowerCase() === want || a.key === want);
      if (hit) {
        paintAccent(hit.accent, hit.surface);
        return { lines: [out(`ACCENT: ${hit.color} (persisted)`)] };
      }
      if (arg === 'default') {
        resetAccent();
        return { lines: [out('ACCENT: route default (override cleared)')] };
      }
      return { lines: [err(`usage: accent <color|default> (now: ${currentAccent()})`)] };
    }
    case 'crt': {
      if (arg === 'on' || arg === 'off') {
        applyCrt(arg);
        return { lines: [out(`CRT: ${arg === 'on' ? 'ONLINE' : 'OFFLINE'} (persisted)`)] };
      }
      return { lines: [err(`usage: crt <on|off> (now: ${getCrt() === 'on' ? 'ONLINE' : 'OFFLINE'})`)] };
    }
    default:
      return { lines: [err(`ERR_0x99: command not found '${verb}'. try help`)] };
  }
}

export type PItem = { label: string; hint: string; run: () => void };

// nav maps a route ('/', '/about', …) to a full href — the palette owns base.
export function paletteItems(nav: (route: string) => void): PItem[] {
  return [
    ...ROUTES.map((r) => ({
      label: `goto ${r === '/' ? 'home' : r.slice(1)}`,
      hint: 'route',
      run: () => nav(r),
    })),
    { label: 'crt: display on', hint: 'display', run: () => applyCrt('on') },
    { label: 'crt: display off', hint: 'display', run: () => applyCrt('off') },
    { label: 'navbar: enable desktop nav', hint: 'display', run: () => applyNavbar('on') },
    { label: 'navbar: disable desktop nav', hint: 'display', run: () => applyNavbar('off') },
    ...ACCENTS.map((v) => ({
      label: `accent: ${v.color} (${v.key})`,
      hint: 'theme',
      run: () => paintAccent(v.accent, v.surface),
    })),
    { label: 'accent: route default', hint: 'theme', run: () => resetAccent() },
    { label: 'audio bleeps (v2 — not wired)', hint: 'soon', run: () => {} },
  ];
}
