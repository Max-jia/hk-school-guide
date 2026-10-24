import registeredDirectory from "@/content/all-registered-school-directory.json";
import type { PilotSchool } from "./school-directory-pilot";

type DetailSection = NonNullable<PilotSchool["detailSections"]>[number];

/** A missing current overview must not make legacy annual figures appear current. */
export function reviewedKindergartenWithoutOverview(
  id: string,
  facts: Partial<PilotSchool> & { detailSections: DetailSection[]; sources: PilotSchool["sources"] },
): PilotSchool {
  const matches = (registeredDirectory as PilotSchool[]).filter((s) => s.stage === "kindergarten" && s.schoolNumber === id);
  if (matches.length !== 1) throw new Error(`Expected one kindergarten ${id}`);
  const school = matches[0];
  return {
    ...school, reportSlug: undefined, tuition: undefined, language: undefined, principal: undefined,
    reviewedAt: "2026-10-24", replaceDirectoryDetails: true, replaceDirectorySources: true,
    omitDirectoryDetailTitles: school.detailSections?.filter((section) => section.title !== "教育局登記校址").map((section) => section.title),
    ...facts,
    sources: [...new Map([
      ...school.sources.filter((s) => s.url.includes("edb.gov.hk") && !s.url.includes("schoolfee")),
      ...facts.sources,
    ].map((s) => [s.url, s])).values()],
  };
}

export type ReviewedKindergartenSpec = {
  schoolNumber: string;
  locationId: string;
  website: string;
  telephone: string;
  schoolType?: string;
  gradeSpan?: string;
  principal?: string;
  establishedYear?: string;
  language: string;
  ratio: string;
  ratioIncludesPn?: boolean;
  teacherCount?: number;
  classroomCount?: number;
  spaces: string;
  pn: string;
  fees: string;
  feeSummary: string;
  sourceNote: string;
  sources: PilotSchool["sources"];
  features: DetailSection;
};

/** Build from explicitly reviewed facts, never from the undated legacy KG fields. */
export function reviewedKindergartenProfile(spec: ReviewedKindergartenSpec): PilotSchool {
  const matches = (registeredDirectory as PilotSchool[]).filter((school) => school.stage === "kindergarten" && school.schoolNumber === spec.schoolNumber);
  if (matches.length !== 1) throw new Error(`Expected one registered kindergarten for ${spec.schoolNumber}`);
  const school = matches[0];
  const campusKey = `${spec.schoolNumber}${spec.locationId}`;
  if (!/^\d{10}$/.test(campusKey) || !(school.detailSections || []).some((section) => section.details.some((detail) => detail.sourceUrl.includes(`schid=${campusKey}`)))) {
    throw new Error(`Reviewed kindergarten campus ${campusKey} does not match the directory`);
  }
  const overviewUrl = `https://kgp2026.kindergartenprofile.com/school/?schid=${campusKey}`;
  return {
    ...school,
    // Match the registered school by its identifier, not a shared brand-report slug.
    reportSlug: undefined,
    reviewedAt: "2026-10-24",
    website: spec.website,
    telephone: spec.telephone,
    schoolType: spec.schoolType || "非牟利幼稚園",
    gradeSpan: spec.gradeSpan || "K1至K3；開設班別按當屆招生安排",
    principal: spec.principal,
    establishedYear: spec.establishedYear,
    language: spec.language,
    tuition: `2026/27：${spec.feeSummary}`,
    dataYear: "教育局位置資料截至2026-09-30；概覽2026/27（人員及幼兒服務統計：2025年9月）",
    sourceNote: `${school.sourceNote} 本頁於2026-10-24按校號${spec.schoolNumber}、校址${spec.locationId}讀取2026/27概覽原表；人員、師生比例及幼兒服務為2025年9月統計，K1至K3學費為2026/27學年。${spec.sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    omitDirectoryDetailTitles: (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽") || section.title === "聯絡與授課資料").map((section) => section.title),
    sources: [...new Map([
      ...school.sources.filter((source) => source.label !== "學校官方網站" && !source.url.includes("kgp2026.kindergartenprofile.com")),
      { label: `教育局《幼稚園概覽2026/27》：校址${spec.locationId}`, scope: "核對校號及校址、2025年9月師資與分時段師生比、幼兒服務，以及2026/27學費；校方申報的課程與理念另列。", url: overviewUrl },
      ...(spec.website ? [{ label: "學校官方網站", scope: "校方聯絡及課程入口；多校舍網站須按本頁校號／校址核對適用範圍。", url: spec.website }] : []),
      ...spec.sources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [
      spec.features,
      {
        title: `幼稚園概覽2026/27｜校址${spec.locationId}`,
        note: "分開列出統計日期與學費學年；師生比例按時段計算，並非每班人數。核准學費表不等於所有班別均有開設或仍有學位。",
        details: [
          { label: "PN／2至3歲服務", value: spec.pn, period: "幼兒服務及其費率：2025年9月資料", sourceUrl: overviewUrl },
          { label: "分時段師生比例", value: `${spec.ratio}；${spec.ratioIncludesPn === undefined ? "概覽未列是否包括2至3歲班級" : spec.ratioIncludesPn ? "統計包括2至3歲班級" : "統計不包括2至3歲班級"}。此數字不是班額或每班教師數。`, period: "2025年9月", sourceUrl: overviewUrl },
          { label: "師資與課室", value: `${spec.teacherCount === undefined ? "概覽未列校長及教學人員總數" : `校長及教學人員共${spec.teacherCount}人（不包括任職0至2歲級別的教師）`}；${spec.classroomCount === undefined ? "概覽未列註冊課室數目" : `註冊課室${spec.classroomCount}間`}。`, period: "人員統計：2025年9月；課室按2026/27概覽", sourceUrl: overviewUrl },
          { label: "校舍學習空間", value: spec.spaces, period: "2026/27概覽所列資料", sourceUrl: overviewUrl },
          { label: "K1至K3全年學費與期數", value: spec.fees, period: "2026/27學年", sourceUrl: overviewUrl },
        ],
      },
    ],
  };
}
