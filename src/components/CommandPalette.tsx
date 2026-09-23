import { useEffect, useMemo, useState } from 'react';

const base = import.meta.env.BASE_URL;

const ACCENTS: Record<string, { accent: string; surface: string }> = {
  home: { accent: '#00f0ff', surface: '#02141c' },
  projects: { accent: '#00ff66', surface: '#021a0e' },
  about: { accent: '#ffe600', surface: '#1a1800' },
  research: { accent: '#a822ff', surface: '#13021f' },
  blog: { accent: '#ff1744', surface: '#1f0307' },
  contact: { accent: '#ff007a', surface: '#1c000f' },
};

type Item = { label: string; hint: string; run: () => void };

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items: Item[] = useMemo(
    () => [
      ...['/', '/projects', '/about', '/research', '/blog', '/contact'].map((r) => ({
        label: `goto ${r === '/' ? 'home' : r.slice(1)}`,
        hint: 'route',
        run: () => {
          window.location.href = r === '/' ? base : `${base}${r.slice(1)}`;
        },
      })),
      {
        label: 'toggle CRT overlay',
        hint: 'display',
        run: () => {
          const html = document.documentElement;
          const off = html.dataset.crt !== 'off';
          html.dataset.crt = off ? 'off' : 'on';
          try {
            localStorage.setItem('dedsec-crt', off ? 'off' : 'on');
          } catch {}
        },
      },
      ...Object.entries(ACCENTS).map(([name, v]) => ({
        label: `accent: ${name}`,
        hint: 'theme',
        run: () => {
          document.documentElement.style.setProperty('--accent', v.accent);
          document.documentElement.style.setProperty('--accent-surface', v.surface);
          try {
            localStorage.setItem('dedsec-accent', JSON.stringify(v));
          } catch {}
        },
      })),
      { label: 'audio bleeps (v2 — not wired)', hint: 'soon', run: () => {} },
    ],
    []
  );

  const shown = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 p-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-label="command palette"
    >
      <div
        className="mx-auto mt-24 max-w-lg border border-grid bg-void"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="> type command…"
          aria-label="command input"
          className="w-full border-b border-grid bg-transparent p-3 text-sm text-ink outline-none placeholder:text-dim/50"
        />
        <ul className="max-h-72 overflow-y-auto text-sm">
          {shown.map((i) => (
            <li key={i.label}>
              <button
                className="flex w-full items-center justify-between px-3 py-2 text-left text-dim hover:bg-accentsurface hover:text-accent"
                onClick={() => {
                  i.run();
                  setOpen(false);
                }}
              >
                <span>{i.label}</span>
                <span className="text-[11px] uppercase tracking-widest opacity-60">{i.hint}</span>
              </button>
            </li>
          ))}
          {shown.length === 0 && <li className="px-3 py-4 text-dim">ERR_0x99: no match</li>}
        </ul>
      </div>
    </div>
  );
}
