import { useEffect, useRef, useState } from 'react';

const ROUTES = ['/', '/projects', '/about', '/research', '/blog', '/contact'];
const base = import.meta.env.BASE_URL;

type Line = { text: string; kind: 'in' | 'out' | 'err' };

const HELP = [
  'commands:',
  '  help            this readout',
  '  goto <route>   / projects about research blog contact',
  '  cat about.txt  one-line dossier',
  '  clear           wipe terminal',
];

export default function TerminalHero() {
  const [lines, setLines] = useState<Line[]>([
    { text: 'DEDSEC secure shell — type `help`', kind: 'out' },
  ]);
  const [value, setValue] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines]);

  const run = (raw: string) => {
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
    if (c === 'help') next.push(...HELP.map((text) => ({ text, kind: 'out' as const })));
    else if (c === 'goto') {
      const target = arg === '' ? '/' : `/${arg}`;
      if (ROUTES.includes(target)) {
        next.push({ text: `tunneling → ${target} ...`, kind: 'out' });
        setLines(next);
        window.location.href = target === '/' ? base : `${base}${arg}`;
        return;
      }
      next.push({ text: `ERR_0x99: unknown route '${arg}'. try help`, kind: 'err' });
    } else if (c === 'cat' && arg === 'about.txt') {
      next.push({ text: 'AI engineer — vision-centric intelligence for agriculture + medical imaging.', kind: 'out' });
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
              l.kind === 'in' ? 'text-ink' : l.kind === 'err' ? 'text-[#ff1744]' : 'text-dim'
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
          <span className="text-accent">visitor@dedsec:~$</span>
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
