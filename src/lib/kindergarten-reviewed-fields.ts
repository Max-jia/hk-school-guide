import evidence from "@/content/kindergarten-official-fields-2026-10-26.json";
import type { PilotSchool, SchoolDetail } from "./school-directory-pilot";
import type { DirectoryFact } from "./kindergarten-directory";

type ReviewedFact = DirectoryFact & { values?: string[]; mode?: string };
type ReviewedFields = { sessions?: ReviewedFact; language?: ReviewedFact; fee?: ReviewedFact; pn?: DirectoryFact & { value: "yes" | "no" | "unknown" }; closed?: boolean; sources: PilotSchool["sources"] };
const fields = evidence.schools as Record<string, ReviewedFields>;

export function kindergartenReviewedFields(number: string): ReviewedFields | undefined {
  return fields[number];
}

/** Profiles and their directory rows consume the same independently sourced facts.
 * Historical observations and existing curriculum prose remain in their own scope.
 */
export function applyKindergartenReviewedFields(school: PilotSchool): PilotSchool {
  if (school.stage !== "kindergarten") return school;
  const number = school.schoolNumber?.match(/^\d{6}/)?.[0];
  const reviewed = number ? kindergartenReviewedFields(number) : undefined;
  if (!reviewed) return school;
  const details: SchoolDetail[] = [];
  for (const [key, label] of [["sessions", "登記班制"], ["language", "語言安排核對"], ["fee", "全年學費核對"], ["pn", "PN服務記錄"]] as const) {
    const fact = reviewed[key];
    if (fact?.sourceUrl) details.push({ label, value: fact.detail, period: fact.period, sourceUrl: fact.sourceUrl });
  }
  // Replace generated shorthand that cited a new overview URL without retaining
  // the original source wording. Leave dated staffing/PN and researched prose intact.
  const replaced = new Set(["班制與 PN", "授課語言", "語言安排", ...(reviewed.fee ? ["學費", "核准學費", "K1至K3全年學費與期數", "全年學費與期數"] : [])]);
  const sections = (school.detailSections || []).map((section) => ({
    ...section,
    details: section.details.filter((detail) => !(replaced.has(detail.label) && (detail.sourceUrl.includes("kgp2026.kindergartenprofile.com") || detail.sourceUrl.includes(`/schoolfee/${number}.pdf`)))),
  })).filter((section) => section.details.length);
  return {
    ...school,
    ...(reviewed.language ? { language: `${reviewed.language.text}；詳細安排及證據見下方`, languageSourceUrl: reviewed.language.sourceUrl } : {}),
    ...(reviewed.fee ? { tuition: `${reviewed.fee.text}（${reviewed.fee.period}）；各級、班別及期數見下方` } : {}),
    reviewedAt: evidence.checkedAt,
    sourceNote: `${school.sourceNote} 本輪於${evidence.checkedAt}核對班制、語言及學費；其他資料仍按各欄原有來源與年度理解。`,
    detailSections: [{ title: "班制、語言與學費核對", note: "班制是教育局登記記錄，不等同現有學位；學費分清全年、期數及資助基礎，語言活動不等於主要授課語言。", details }, ...sections],
    sources: [...new Map([...school.sources, ...reviewed.sources].map((source) => [source.url, source])).values()],
  };
}
