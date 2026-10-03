// Single command registry driving TerminalHero AND CommandPalette.
// Same verbs, same options, both surfaces — add a command here, never in
// the islands. Terminal-only I/O (clear, cat output) stays in the terminal.
import { ACCENTS, currentAccent, paintAccent, resetAccent } from './accentPref';
import { navigate } from 'astro:transitions/client';

// Router-aware navigation for the islands: animated transition when the
// ClientRouter is active, plain full load otherwise (navigate() falls back).
// Call this, never window.location.href, so page changes always crossfade.
export function go(href: string) {
  navigate(href);
}

export const ROUTES = ['/dev', '/dev/games', '/dev/art', '/projects', '/blog'];
export const FILES = ['about.txt', 'roles.txt', 'stack.txt', 'contact.txt'];
export const ROUTE_KEYS: Record<string, string> = {
  d: 'dev',
  g: 'dev/games',
  a: 'dev/art',
  p: 'projects',
  b: 'blog',
};

export type TermLine = { text: string; kind: 'in' | 'out' | 'err' };

export const HELP: TermLine[] = [
  {
    text: "DEDSEC secure shell v2 — the Professional zone is quiet. drive with:",
    kind: "out",
  },
  { text: "help\t\t\t\tshow this readout", kind: "out" },
  { text: "goto <route>\t\tjump to one of (letter shortcuts):", kind: "out" },
  { text: "\tdev (d)\t\tpersonal hub — you are here", kind: "out" },
  { text: "\tdev/games (g)\t47-game library wall", kind: "out" },
  { text: "\tdev/art (a)\tgallery + books", kind: "out" },
  { text: "\tprojects (p)\tpayload index (PORT filter)", kind: "out" },
  { text: "\tblog (b)\t\ttransmissions", kind: "out" },
  { text: "cat <file>\t\t\tprint a dossier file:", kind: "out" },
  { text: "\tabout.txt\t\twhoami, one screen", kind: "out" },
  { text: "\troles.txt\t\toperator roles", kind: "out" },
  { text: "\tstack.txt\t\tcore stack", kind: "out" },
  { text: "\tcontact.txt\t\treach me", kind: "out" },
  { text: "accent <color>\t\tswitch theme color", kind: "out" },
  { text: "\tdefault (d)\t\tclear override, route default", kind: "out" },
  { text: "\tblue (c)\t\thub accent color", kind: "out" },
  { text: "\tgreen (g)\tlibrary accent color", kind: "out" },
  { text: "\tmagenta (m)\tgallery accent color", kind: "out" },
  { text: "\tpurple (p)\tprojects accent color", kind: "out" },
  { text: "\tred (r)\t\tblog accent color", kind: "out" },
  { text: "clear\t\t\t\twipe the terminal", kind: "out" },
];

export type TResult = { lines: TermLine[]; navigate?: string };

const out = (text: string): TermLine => ({ text, kind: 'out' });
const err = (text: string): TermLine => ({ text, kind: 'err' });

export async function runVerb(verb: string, arg: string, base: string, currentRoute = '/'): Promise<TResult> {
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
      if (target === currentRoute) {
        return { lines: [err(`ERR_0x99: already on '${target}' — this terminal lives on home. goto <route> to leave.`)] };
      }
      return { lines: [out(`tunneling → ${target} ...`)], navigate: `${base}${target.slice(1)}` };
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
      // Navbar is a UI control now (see the rail), not a terminal verb.
      return { lines: [err('navbar moved to the top rail — use the button there.')] };
    }
    case 'accent': {
      const want = arg.toLowerCase();
      const hit = ACCENTS.find((a) => a.color.toLowerCase() === want || a.key === want);
      if (hit) {
        paintAccent(hit.accent, hit.surface);
        return { lines: [out(`ACCENT: ${hit.color} (persisted)`)] };
      }
      if (arg === 'default' || want === 'd') {
        resetAccent();
        return { lines: [out('ACCENT: route default (override cleared)')] };
      }
      return { lines: [err(`usage: accent <color|default> (now: ${currentAccent()})`)] };
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
      label: `goto ${r}`,
      hint: 'route',
      run: () => nav(r),
    })),
    ...ACCENTS.map((v) => ({
      label: `accent: ${v.color} (${v.key})`,
      hint: 'theme',
      run: () => paintAccent(v.accent, v.surface),
    })),
    { label: 'accent: route default', hint: 'theme', run: () => resetAccent() },
  ];
}
