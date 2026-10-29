/** Small, source-scoped records shared by the directory UI and its validation. */
export type DirectoryFact = { text: string; detail: string; period?: string; sourceUrl?: string };
export type KindergartenRow = {
  slug: string; number: string; name: string; nameEn: string; district: string; districts: string[];
  address: string; multiCampus: boolean; nature: string[]; curriculum: string[];
  sessions: DirectoryFact & { values: string[] };
  pn: DirectoryFact & { value: "yes" | "no" | "unknown" };
  scheme: DirectoryFact & { value: "yes" | "no" | "unknown" };
  language: DirectoryFact & { values: string[] };
  fee: DirectoryFact;
  reports: string[]; searchText: string;
};

export type KindergartenFilters = {
  q: string; districts: string[]; nature: string; scheme: string; session: string; pn: string;
  language: string; curriculum: string; report: boolean; sort: string; page: number;
};

export const emptyKgFilters = (page = 1): KindergartenFilters => ({
  q: "", districts: [], nature: "", scheme: "", session: "", pn: "", language: "", curriculum: "", report: false, sort: "name", page,
});

export function readKgFilters(search: string, initialPage = 1): KindergartenFilters {
  const p = new URLSearchParams(search);
  const page = p.get("resultPage");
  return {
    q: (p.get("q") || "").slice(0, 160), districts: p.getAll("district"), nature: p.get("nature") || "", scheme: p.get("scheme") || "",
    session: p.get("session") || "", pn: p.get("pn") || "", language: p.get("language") || "",
    curriculum: p.get("curriculum") || "", report: p.get("report") === "1",
    sort: ["name", "name-desc", "district"].includes(p.get("sort") || "") ? p.get("sort")! : "name",
    page: page && /^[1-9]\d{0,4}$/.test(page) ? Number(page) : initialPage,
  };
}

export function kgQuery(filters: KindergartenFilters, initialPage = 1): string {
  const p = new URLSearchParams();
  if (filters.q.trim()) p.set("q", filters.q.trim());
  filters.districts.forEach((d) => p.append("district", d));
  for (const key of ["nature", "scheme", "session", "pn", "language", "curriculum"] as const) if (filters[key]) p.set(key, filters[key]);
  if (filters.report) p.set("report", "1");
  if (filters.sort !== "name") p.set("sort", filters.sort);
  if (filters.page !== initialPage) p.set("resultPage", String(filters.page));
  return p.size ? `?${p.toString()}` : "";
}

export function filterKindergartens(rows: KindergartenRow[], f: KindergartenFilters, normalizedQuery: string): KindergartenRow[] {
  const result = rows.filter((r) =>
    (!normalizedQuery || r.searchText.includes(normalizedQuery)) &&
    (!f.districts.length || f.districts.some((d) => r.districts.includes(d))) &&
    (!f.nature || r.nature.includes(f.nature)) &&
    (!f.scheme || r.scheme.value === f.scheme) &&
    (!f.session || (f.session === "unknown" ? !r.sessions.values.length : r.sessions.values.includes(f.session))) &&
    (!f.pn || r.pn.value === f.pn) &&
    (!f.language || (f.language === "unknown" ? !r.language.values.length : r.language.values.includes(f.language))) &&
    (!f.curriculum || r.curriculum.includes(f.curriculum)) && (!f.report || r.reports.length > 0));
  // The server provides a stable name order, also used by the unfiltered ItemList.
  if (f.sort === "name-desc") result.reverse();
  if (f.sort === "district") result.sort((a, b) => a.district.localeCompare(b.district, "zh-Hant"));
  return result;
}
