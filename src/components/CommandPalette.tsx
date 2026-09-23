import { useEffect, useMemo, useState } from 'react';
import { paletteItems, type PItem } from './commands';

const base = import.meta.env.BASE_URL;

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

  const items: PItem[] = useMemo(
    () =>
      paletteItems((r) => {
        window.location.href = r === '/' ? base : `${base}${r.slice(1)}`;
      }),
    []
  );

  const shown = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));
  const [sel, setSel] = useState(0);

  useEffect(() => {
    setSel(0);
  }, [q, open]);

  const choose = (i: PItem) => {
    i.run();
    setOpen(false);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (shown.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSel((s) => (s + 1) % shown.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSel((s) => (s - 1 + shown.length) % shown.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const active = shown[Math.min(sel, shown.length - 1)];
      if (active) choose(active);
    }
  };

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
          onKeyDown={onInputKey}
          placeholder="> type command… (↑↓ + enter)"
          aria-label="command input"
          aria-activedescendant={shown.length ? `cmd-${Math.min(sel, shown.length - 1)}` : undefined}
          className="w-full border-b border-grid bg-transparent p-3 text-sm text-ink outline-none placeholder:text-dim/50"
        />
        <ul className="max-h-72 overflow-y-auto text-sm" role="listbox">
          {shown.map((i, idx) => (
            <li key={i.label} role="option" id={`cmd-${idx}`} aria-selected={idx === sel}>
              <button
                ref={(el) => {
                  if (el && idx === sel) el.scrollIntoView({ block: 'nearest' });
                }}
                className={
                  idx === sel
                    ? 'flex w-full items-center justify-between bg-accentsurface px-3 py-2 text-left text-accent'
                    : 'flex w-full items-center justify-between px-3 py-2 text-left text-dim hover:bg-accentsurface hover:text-accent'
                }
                onClick={() => choose(i)}
                onMouseMove={() => {
                  if (idx !== sel) setSel(idx);
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
