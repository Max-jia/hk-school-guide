"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type SchoolOpt = {
  name: string;
  simp?: string;
  quota?: number | null;
  net?: string;
  area_short?: string;
};

export default function SchoolCombobox({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: SchoolOpt[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const map = new Map<string, SchoolOpt[]>();
    for (const o of options) {
      if (
        q &&
        !(
          o.name.toLowerCase().includes(q) ||
          (o.simp || o.name).toLowerCase().includes(q) ||
          (o.net || "").toLowerCase().includes(q) ||
          (o.area_short || "").toLowerCase().includes(q)
        )
      ) {
        continue;
      }
      const g = o.net || "全部";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(o);
    }
    return [...map.entries()];
  }, [options, query]);

  return (
    <div ref={rootRef} className="relative flex min-w-0 flex-1">
      <input
        value={value}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          onChange(e.target.value);
        }}
        onFocus={() => {
          if (value) setQuery(value);
          setOpen(true);
        }}
        placeholder={placeholder || "搜索学校…"}
        className="w-full min-w-0 flex-1 rounded-l-[6px] border border-[var(--p-gray-300)] border-r-0 bg-[var(--p-bg)] px-3 py-2 text-sm text-[var(--p-fg)] outline-none"
      />
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setOpen((v) => !v);
        }}
        className="w-10 shrink-0 rounded-r-[6px] border border-[var(--p-gray-300)] bg-[var(--p-bg)] text-sm text-[var(--p-secondary)] hover:bg-[var(--p-gray-300)]"
        aria-label="展开学校下拉"
      >
        ▾
      </button>
      {open && groups.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-[8px] border border-[var(--p-gray-300)] bg-white shadow-[0_4px_14px_rgba(0,0,0,.12)]">
          {groups.map(([net, items]) => (
            <div key={net}>
              <div className="bg-[var(--p-bg)] px-3 py-1.5 font-mono text-[11px] font-bold uppercase text-[var(--p-secondary)]">
                {net} 网
              </div>
              {items.slice(0, 30).map((o) => (
                <button
                  key={o.name}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onChange(o.name);
                    setQuery("");
                    setOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-[var(--p-fg)] hover:bg-[var(--p-bg)]"
                >
                  {o.name}
                  {o.quota ? <span className="text-[var(--p-secondary)]">（学额{o.quota}）</span> : null}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
