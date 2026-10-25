import "server-only";

import reportMeta from "@/content/report-meta.json";
import { DIRECTORY_SCHOOLS, type SchoolStage } from "@/lib/school-directory-pilot";

/** Only these small records cross the server/client boundary, never the directory dataset. */
export type ReportSchoolProfileLink = {
  name: string;
  district: string;
  stage: SchoolStage;
  href: string;
};

const reportStages = new Map<string, SchoolStage>([
  ...reportMeta.KG_REPORTS.map((report): [string, SchoolStage] => [report.c, "kindergarten"]),
  ...reportMeta.PS_REPORTS.map((report): [string, SchoolStage] => [report.c, "primary"]),
  ...reportMeta.SS_REPORTS.map((report): [string, SchoolStage] => [report.c, "secondary"]),
]);

const profilesByReport = new Map<string, ReportSchoolProfileLink[]>();
for (const school of DIRECTORY_SCHOOLS) {
  const slugs = new Set([
    ...(school.relatedReportSlugs || []),
    ...(school.reportSlug ? [school.reportSlug] : []),
  ]);
  for (const slug of slugs) {
    // Shared names and through-train relationships do not make two stages interchangeable.
    if (reportStages.get(slug) !== school.stage) continue;
    const href = `/schools/${school.stage}/${school.slug}`;
    const links = profilesByReport.get(slug) || [];
    if (links.some((link) => link.href === href)) continue;
    links.push({ name: school.name, district: school.district, stage: school.stage, href });
    profilesByReport.set(slug, links);
  }
}

/** Reverse only the catalogue's explicit links; unmatched reports stay unmatched. */
export function reportSchoolProfiles(slug: string): ReportSchoolProfileLink[] {
  return profilesByReport.get(slug) || [];
}
