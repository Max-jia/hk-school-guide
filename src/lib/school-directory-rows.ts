import { schoolsForStage, type SchoolStage } from "./school-directory-pilot";
import { kindergartenDirectoryRows } from "./kindergarten-directory-data";
import type { Locale } from "./i18n";
import type { SchoolStageDirectoryRow } from "../components/schools/SchoolStageDirectory";

export function stageDirectoryRows(stage: SchoolStage, locale: Locale): SchoolStageDirectoryRow[] {
  const schools = schoolsForStage(stage, locale);
  return schools.map((school) => ({
    stage: school.stage as Exclude<SchoolStage, "kindergarten">,
    slug: school.slug,
    name: school.name,
    nameEn: school.nameEn,
    district: school.district,
    districts: school.districts || [],
    address: school.address,
    schoolNumber: school.schoolNumber || "",
    schoolType: school.schoolType,
    categories: school.schoolCategories || [school.schoolType],
    gender: school.gender || "",
    religion: school.religion || "",
    schoolNet: school.schoolNet || "",
    language: school.language || "",
    tuition: school.tuition || "",
    gradeSpan: school.gradeSpan,
    sponsoringBody: school.sponsoringBody || "",
    dataYear: school.dataYear,
    reviewedAt: school.reviewedAt || "",
    sourceNote: school.sourceNote,
    website: school.website,
    reportSlugs: [...new Set([school.reportSlug, ...(school.relatedReportSlugs || [])].filter((slug): slug is string => Boolean(slug)))],
    sources: (school.sources || []).slice(0, 5).map(({ label, scope, url }) => ({ label, scope, url })),
  })).sort((a, b) => a.name.localeCompare(b.name, locale === "sc" ? "zh-Hans" : "zh-Hant"));
}

export function kgDirectoryRows() {
  return kindergartenDirectoryRows(schoolsForStage("kindergarten", "tc"));
}
