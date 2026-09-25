import { useEffect, useRef, useState } from 'react';
import { go, runVerb, type TermLine } from './commands';

const base = import.meta.env.BASE_URL;

export default function TerminalHero() {
  const [lines, setLines] = useState<TermLine[]>([
    { text: 'DEDSEC secure shell — type `help`', kind: 'out' },
  ]);
  const [value, setValue] = useState('');
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
  }, [lines]);

  const run = async (raw: string) => {
    const cmd = raw.trim();
    const next: TermLine[] = [...lines, { text: `visitor@dedsec:~$ ${cmd}`, kind: 'in' }];
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
    const { lines: result, navigate } = await runVerb(c, arg, base);
    setLines([...next, ...result]);
    if (navigate) go(navigate);
  };

  return (
    <div className="border border-grid bg-void/80">
      <div className="border-b border-grid bg-accentsurface px-3 py-1.5 font-display text-sm tracking-widest text-accent">
        [TERMINAL_ACTIVE]
      </div>
      <div ref={boxRef} className="h-96 overflow-y-auto p-4 text-[13px] leading-relaxed">
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
