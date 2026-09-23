import { useEffect, useRef, useState } from 'react';
import { applyNavbar, getNavbar } from './navbarPref';
import { ACCENTS, currentAccent, paintAccent, resetAccent } from './accentPref';

const ROUTES = ['/', '/projects', '/about', '/experience', '/research', '/blog', '/contact'];
const FILES = ['about.txt', 'roles.txt', 'stack.txt', 'contact.txt'];
const base = import.meta.env.BASE_URL;

type Line = { text: string; kind: 'in' | 'out' | 'err' };

const HELP: Line[] = [
  { text: 'DEDSEC secure shell v1 — NAV_BAR is OFF on desktop. drive with:', kind: 'out' },
  { text: 'help\t\tshow this readout', kind: 'out' },
  { text: 'goto <route>\tjump to one of:', kind: 'out' },
  { text: '\t/\t\t\thome (this terminal)', kind: 'out' },
  { text: '\tprojects\tpayload index (PORT filter)', kind: 'out' },
  { text: '\tabout\t\tdossier + stack + uplinks', kind: 'out' },
  { text: '\texperience\twork + learning timelines', kind: 'out' },
  { text: '\tresearch\tpaper archive', kind: 'out' },
  { text: '\tblog\t\ttransmissions', kind: 'out' },
  { text: '\tcontact\t\tcomms form', kind: 'out' },
  { text: 'cat <file>\tprint a dossier file:', kind: 'out' },
  { text: '\tabout.txt\twhoami, one screen', kind: 'out' },
  { text: '\troles.txt\toperator roles', kind: 'out' },
  { text: '\tstack.txt\tcore stack', kind: 'out' },
  { text: '\tcontact.txt\treach me', kind: 'out' },
  { text: 'navbar <on|off>\tenable/disable desktop navbar (mobile always on)', kind: 'out' },
  { text: 'accent <color|default>\tswitch theme: cyan green yellow orange purple red pink', kind: 'out' },
  { text: 'clear\t\twipe the terminal', kind: 'out' },
];

export default function TerminalHero() {
  const [lines, setLines] = useState<Line[]>(HELP);
  const [value, setValue] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines]);

  const run = async (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [...lines, { text: `visitor@dedsec:~$ ${cmd}`, kind: 'in' }];
    if (!cmd) {
      setLines(next);
      return;
    }
    const [c, ...rest] = cmd.split(/\s+/);
    const arg = (rest[0] ?? '').replace(/^\//, '');
    if (c === 'clear') {
      setLines([]);
      return;
    }
    if (c === 'help') {
      next.push(...HELP);
    } else if (c === 'goto') {
      const target = arg === '' ? '/' : `/${arg}`;
      if (ROUTES.includes(target)) {
        next.push({ text: `tunneling → ${target} ...`, kind: 'out' });
        setLines(next);
        window.location.href = target === '/' ? base : `${base}${arg}`;
        return;
      }
      next.push({ text: `ERR_0x99: unknown route '${arg}'. routes: ${ROUTES.join(' ')}`, kind: 'err' });
    } else if (c === 'navbar') {
      if (arg === 'on' || arg === 'off') {
        applyNavbar(arg);
        next.push({ text: `NAV_BAR: ${arg === 'on' ? 'ONLINE' : 'OFFLINE'} (persisted)`, kind: 'out' });
      } else {
        next.push({ text: `NAV_BAR: ${getNavbar() === 'on' ? 'ONLINE' : 'OFFLINE'} — usage: navbar <on|off>`, kind: 'out' });
      }
    } else if (c === 'accent') {
      const hit = ACCENTS.find((a) => a.color.toLowerCase() === arg.toLowerCase());
      if (hit) {
        paintAccent(hit.accent, hit.surface);
        next.push({ text: `ACCENT: ${hit.color} (persisted)`, kind: 'out' });
      } else if (arg === 'default') {
        resetAccent();
        next.push({ text: 'ACCENT: route default (override cleared)', kind: 'out' });
      } else {
        next.push({ text: `ACCENT: ${currentAccent()} — usage: accent <color|default>`, kind: 'out' });
      }
    } else if (c === 'cat') {
      if (!arg) {
        next.push({ text: `usage: cat <file> — files: ${FILES.join(' ')}`, kind: 'err' });
      } else if (!FILES.includes(arg)) {
        next.push({ text: `ERR_0x99: no such file '${arg}'. files: ${FILES.join(' ')}`, kind: 'err' });
      } else {
        try {
          const res = await fetch(`${base}txt/${arg}`);
          if (!res.ok) throw new Error(String(res.status));
          const body = (await res.text()).trimEnd();
          next.push(...body.split('\n').map((text) => ({ text, kind: 'out' as const })));
        } catch {
          next.push({ text: `ERR_0x99: could not read '${arg}'. retry.`, kind: 'err' });
        }
      }
    } else {
      next.push({ text: `ERR_0x99: command not found '${c}'. try help`, kind: 'err' });
    }
    setLines(next);
  };

  return (
    <div className="border border-grid bg-void/80">
      <div className="border-b border-grid bg-accentsurface px-3 py-1.5 font-display text-sm tracking-widest text-accent">
        [TERMINAL_ACTIVE]
      </div>
      <div ref={boxRef} className="h-64 overflow-y-auto p-4 text-[13px] leading-relaxed">
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              l.kind === 'in'
                ? 'whitespace-pre-wrap text-ink'
                : l.kind === 'err'
                  ? 'whitespace-pre-wrap text-[#ff1744]'
                  : 'whitespace-pre-wrap text-dim'
            }
          >
            {l.text}
          </p>
        ))}
        <form
          className="flex items-center gap-2 pt-1"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue('');
          }}
        >
          <span className="shrink-0 text-accent">visitor@dedsec:~$</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="terminal input"
            autoComplete="off"
            spellCheck={false}
            className="w-full bg-transparent text-ink outline-none placeholder:text-dim/50"
            placeholder="help"
          />
        </form>
      </div>
    </div>
  );
}
