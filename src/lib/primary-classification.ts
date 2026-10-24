import type { PilotSchool } from "./school-directory-pilot";

// Display labels only. Preserve the published schoolType and its evidence in full.
const PRIMARY_CATEGORIES: Record<string, string> = {
  "資助小學": "資助",
  "資助全日制小學": "資助",
  "官立小學": "官立",
  "直接資助計劃小學": "直資",
  "私立小學": "私立",
  "國際學校（小學）": "國際",
  "英基學校協會（小學）": "英基",
  "資助特殊學校": "特殊學校",
};

export function classifyPrimary(school: PilotSchool): Partial<PilotSchool> {
  if (school.stage !== "primary") return {};
  const category = PRIMARY_CATEGORIES[school.schoolType] || "類別待核實";
  const source = school.sources.find((item) => item.url.endsWith("SCH_LOC_EDB.csv"));
  return {
    schoolCategories: [category],
    classificationSources: source ? [source] : undefined,
  };
}
