export type ShortlistKind = "primary" | "kindergarten" | "secondary";

export type ShortlistEntry = {
  id: string;
  name: string;
  kind: ShortlistKind;
  href?: string;
  routes?: string[];
  addedAt: number;
};

export const SHORTLIST_KEY = "hksg_shortlist_v1";
export const SHORTLIST_CHANGE_EVENT = "hksg:shortlist-change";
const MAX_SHORTLIST_SIZE = 60;

export function shortlistId(kind: ShortlistKind, name: string): string {
  return `${kind}:${name.trim()}`;
}

export function readShortlist(): ShortlistEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(window.localStorage.getItem(SHORTLIST_KEY) || "[]") as unknown;
    if (!Array.isArray(raw)) return [];
    return raw.filter(isShortlistEntry).slice(0, MAX_SHORTLIST_SIZE);
  } catch {
    return [];
  }
}

export function writeShortlist(entries: ShortlistEntry[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(entries.slice(0, MAX_SHORTLIST_SIZE)));
  window.dispatchEvent(new Event(SHORTLIST_CHANGE_EVENT));
}

export function toggleShortlist(entry: Omit<ShortlistEntry, "id" | "addedAt">): ShortlistEntry[] {
  const current = readShortlist();
  const id = shortlistId(entry.kind, entry.name);
  const exists = current.some((item) => item.id === id);
  const next = exists
    ? current.filter((item) => item.id !== id)
    : [{ ...entry, id, addedAt: Date.now() }, ...current];
  writeShortlist(next);
  return next;
}

function isShortlistEntry(value: unknown): value is ShortlistEntry {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<ShortlistEntry>;
  return (
    typeof item.id === "string" &&
    typeof item.name === "string" &&
    item.name.trim().length > 0 &&
    (item.kind === "primary" || item.kind === "kindergarten" || item.kind === "secondary") &&
    typeof item.addedAt === "number" &&
    (item.href === undefined || typeof item.href === "string") &&
    (item.routes === undefined || (Array.isArray(item.routes) && item.routes.every((route) => typeof route === "string")))
  );
}
