/** Script conversion, when needed, happens separately from lightweight matching. */
export function normalizeSearch(value: string): string {
  return value.normalize("NFKC").toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, " ").replace(/\s+/g, " ").trim();
}
