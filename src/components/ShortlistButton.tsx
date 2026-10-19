"use client";

import { useEffect, useState } from "react";
import { L, type Locale } from "@/lib/i18n";
import {
  readShortlist,
  shortlistId,
  SHORTLIST_CHANGE_EVENT,
  toggleShortlist,
  type ShortlistKind,
} from "@/lib/shortlist";

export default function ShortlistButton({
  name,
  kind,
  href,
  routes,
  locale = "tc",
}: {
  name: string;
  kind: ShortlistKind;
  href?: string;
  routes?: string[];
  locale?: Locale;
}) {
  const id = shortlistId(kind, name);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readShortlist().some((entry) => entry.id === id));
    sync();
    window.addEventListener(SHORTLIST_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(SHORTLIST_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [id]);

  function toggle() {
    toggleShortlist({ name, kind, href, routes });
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      title={L(saved ? "从我的候选移除" : "加入我的候选", locale)}
      className={`inline-flex min-h-11 items-center gap-1 rounded-[6px] border px-3 py-2 font-mono text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--p-fg)] ${
        saved
          ? "border-[#0F766E] bg-[#E7F6F2] text-[#0F766E]"
          : "border-[var(--p-fg)] text-[var(--p-fg)] hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
      }`}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      {L(saved ? "已加入候选" : "加入候选", locale)}
    </button>
  );
}
