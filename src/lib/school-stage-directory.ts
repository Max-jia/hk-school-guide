import type { SchoolStage } from "@/lib/school-directory-pilot";

export type DirectorySchoolStage = Exclude<SchoolStage, "kindergarten">;

export type SchoolStageDirectoryFilters = {
  q: string;
  districts: string[];
  category: string;
  gender: string;
  religion: string;
  schoolNet: string;
  tuition: string;
  report: boolean;
  sort: "name" | "name-desc" | "district" | "category";
  page: number;
};

export function emptySchoolStageFilters(page = 1): SchoolStageDirectoryFilters {
  return { q: "", districts: [], category: "", gender: "", religion: "", schoolNet: "", tuition: "", report: false, sort: "name", page };
}

export function readSchoolStageFilters(search: string, initialPage = 1): SchoolStageDirectoryFilters {
  const query = new URLSearchParams(search);
  const resultPage = query.get("resultPage");
  const sort = query.get("sort");
  return {
    q: (query.get("q") || "").slice(0, 160),
    districts: [...new Set(query.getAll("district"))],
    category: query.get("category") || "",
    gender: query.get("gender") || "",
    religion: query.get("religion") || "",
    schoolNet: query.get("schoolNet") || "",
    tuition: query.get("tuition") || "",
    report: query.get("report") === "1",
    sort: sort === "name-desc" || sort === "district" || sort === "category" ? sort : "name",
    page: resultPage && /^[1-9]\d{0,4}$/.test(resultPage) ? Number(resultPage) : initialPage,
  };
}

export function schoolStageFiltersQuery(filters: SchoolStageDirectoryFilters, initialPage = 1): string {
  const query = new URLSearchParams();
  if (filters.q.trim()) query.set("q", filters.q.trim());
  filters.districts.forEach((district) => query.append("district", district));
  for (const key of ["category", "gender", "religion", "schoolNet", "tuition"] as const) {
    if (filters[key]) query.set(key, filters[key]);
  }
  if (filters.report) query.set("report", "1");
  if (filters.sort !== "name") query.set("sort", filters.sort);
  if (filters.page !== initialPage) query.set("resultPage", String(filters.page));
  return query.size ? `?${query.toString()}` : "";
}
