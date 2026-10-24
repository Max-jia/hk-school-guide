import classifications from "@/content/kindergarten-classifications-2026.json";
import type { PilotSchool, SchoolSource } from "./school-directory-pilot";

type CampusClassification = { nature?: string; curriculum?: string };
const bySchool = new Map<string, CampusClassification[]>();
for (const [campus, value] of Object.entries(classifications.campuses)) {
  const id = campus.slice(0, 6);
  bySchool.set(id, [...(bySchool.get(id) || []), value]);
}

/** Nature and curriculum are separate facts; never classify from a school's name. */
export function classifyKindergarten(school: PilotSchool): Partial<PilotSchool> {
  if (school.stage !== "kindergarten") return {};
  const records = bySchool.get(String(school.schoolNumber || "").slice(0, 6)) || [];
  const natures = [...new Set(records.flatMap((record) => record.nature ? [record.nature] : []))];
  const curricula = [...new Set(records.flatMap((record) => record.curriculum ? [record.curriculum] : []))];
  const categories = natures.length ? natures.map((nature) => nature === "私立獨立" ? "私立" : nature) : /非牟利/.test(school.schoolType) ? ["非牟利"] : /私立/.test(school.schoolType) ? ["私立"] : [];
  const nonLocal = curricula.some((value) => value.includes("非本地"));
  if (nonLocal || (!curricula.length && /國際/.test(school.schoolType))) categories.push("國際／非本地課程");
  if (!categories.length) categories.push("類別待核實");
  const categorySources: SchoolSource[] = [...natures, ...curricula].map((label) => ({
    label: `幼稚園概覽2026/27｜${label}`,
    url: classifications.sources[label as keyof typeof classifications.sources],
    scope: `按學校及校址編號配對的${natures.includes(label) ? "辦學" : "課程"}類別；核對日期 ${classifications.checkedAt}。不同校址資料分別適用。`,
  }));
  return {
    schoolType: natures.length ? natures.join("／") : categories.filter((value) => value !== "國際／非本地課程").join("／") || school.schoolType,
    schoolCategories: categories,
    curriculumType: curricula.length ? curricula.join("；") : undefined,
    classificationSources: categorySources,
    sources: [...new Map([...school.sources, ...categorySources].map((source) => [source.url, source])).values()],
  };
}
