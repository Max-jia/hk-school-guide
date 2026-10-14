import assert from "node:assert/strict";
import { filterPlanningSchoolCandidates, filterPlanningSchoolCandidatesByRouteSignal, parsePlanningSchoolThroughTrain, prioritizePlanningSchoolCandidates } from "../src/lib/planning-school-matching.ts";
import { normalizePlanningDistrict } from "../src/lib/planning-district.ts";

const criteria = (overrides = {}) => ({
  stage: "primary",
  query: "",
  district: "all",
  studentGender: "all",
  language: "all",
  kindergartenType: "all",
  kindergartenSession: "all",
  primaryFinance: "all",
  primarySchoolNet: "all",
  primaryP1Participation: "all",
  ...overrides,
});

assert.equal(normalizePlanningDistrict("西贡区"), "西貢區", "secondary simplified district should normalize to the planning district key");
assert.equal(normalizePlanningDistrict("香港东区"), "東區", "international-school district aliases should share the primary district key");

function candidate(id, stage, overrides = {}) {
  return {
    id,
    stage,
    names: { zh: id, en: null, sc: null },
    aliases: [],
    district: "沙田區",
    gender: "男女校",
    teachingLanguage: "中文及英文",
    kindergartenType: stage === "kindergarten" ? "券校" : null,
    kindergartenSessions: stage === "kindergarten" ? ["上午", "下午"] : null,
    primaryFinance: stage === "primary" ? "資助" : null,
    primarySchoolNet: stage === "primary" ? "91" : null,
    primaryP1Participation: stage === "primary" ? true : null,
    kindergartenEnglishFlag: stage === "kindergarten" ? true : null,
    kindergartenMandarinFlag: stage === "kindergarten" ? false : null,
    freeScheme: stage === "kindergarten" ? true : null,
    fees: null,
    annualFeeAmount: null,
    address: null,
    website: null,
    routeSignals: [],
    ...overrides,
  };
}

const kindergartens = [
  candidate("kg-coed-voucher", "kindergarten"),
  candidate("kg-girls-private", "kindergarten", { gender: "女校", kindergartenType: "私立", freeScheme: false }),
  candidate("kg-voucher-unknown-free-flag", "kindergarten", { freeScheme: null }),
  candidate("kg-unknown", "kindergarten", { district: null, gender: null, kindergartenType: null, kindergartenSessions: null, teachingLanguage: null, kindergartenEnglishFlag: null, kindergartenMandarinFlag: null, freeScheme: null }),
];
assert.deepEqual(
  filterPlanningSchoolCandidates(kindergartens, criteria({ stage: "kindergarten", district: "沙田區", studentGender: "boy", kindergartenType: "voucher", kindergartenSession: "上午" })).matches.map((item) => item.id),
  ["kg-coed-voucher"],
  "kindergarten filters should combine district, inclusive gender, free-scheme category, and session",
);
assert.deepEqual(
  filterPlanningSchoolCandidates([candidate("cross-stage-district", "primary", { district: "西貢區" })], criteria({ district: "西贡区" })).matches.map((item) => item.id),
  ["cross-stage-district"],
  "simplified and Traditional district values must match across planning stages",
);
assert.deepEqual(
  filterPlanningSchoolCandidates(kindergartens, criteria({ stage: "kindergarten", studentGender: "boy", kindergartenType: "private" })).matches,
  [],
  "girl-only private kindergarten must not match a boy",
);
assert.deepEqual(
  filterPlanningSchoolCandidates([
    candidate("english-girls-only", "primary", { gender: "Girls School" }),
    candidate("english-boys-only", "primary", { gender: "Boys School" }),
    candidate("english-coed", "primary", { gender: "Co-ed" }),
  ], criteria({ studentGender: "boy" })).matches.map((item) => item.id),
  ["english-boys-only", "english-coed"],
  "English gender labels must be inclusive without matching female-only schools to boys",
);
assert.equal(
  filterPlanningSchoolCandidates(kindergartens, criteria({ stage: "kindergarten", district: "沙田區", kindergartenType: "private" })).unclassifiedCount,
  1,
  "unknown kindergarten data must be excluded and counted, not guessed",
);
assert.equal(
  filterPlanningSchoolCandidates(kindergartens, criteria({ stage: "kindergarten", kindergartenType: "voucher" })).unclassifiedCount,
  2,
  "a voucher-category record with a missing free-scheme flag must be unknown, not a known mismatch",
);
assert.deepEqual(
  filterPlanningSchoolCandidates(kindergartens, criteria({ stage: "kindergarten", language: "bilingual" })).matches.map((item) => item.id),
  ["kg-coed-voucher", "kg-girls-private", "kg-voucher-unknown-free-flag"],
  "bilingual language evidence should require both Chinese and English signals",
);

const primaryLanguageCandidates = [
  candidate("primary-english-medium", "primary", { teachingLanguage: "英文為主要授課語言", teachingLanguageMediums: ["english"] }),
  candidate("primary-chinese-medium", "primary", { teachingLanguage: "中文為主要授課語言", teachingLanguageMediums: ["chinese"] }),
  candidate("primary-bilingual-medium", "primary", { teachingLanguage: "中、英文授課", teachingLanguageMediums: ["chinese", "english"] }),
  candidate("primary-language-unknown", "primary", { teachingLanguage: null, teachingLanguageMediums: null }),
];
assert.deepEqual(
  filterPlanningSchoolCandidates(primaryLanguageCandidates, criteria({ language: "english" })).matches.map((item) => item.id),
  ["primary-english-medium", "primary-bilingual-medium"],
  "the verified medium overlay should include bilingual primary schools in the English filter",
);
assert.deepEqual(
  filterPlanningSchoolCandidates(primaryLanguageCandidates, criteria({ language: "chinese" })).matches.map((item) => item.id),
  ["primary-chinese-medium", "primary-bilingual-medium"],
  "the verified medium overlay should include bilingual primary schools in the Chinese filter",
);
assert.deepEqual(
  filterPlanningSchoolCandidates(primaryLanguageCandidates, criteria({ language: "bilingual" })).matches.map((item) => item.id),
  ["primary-bilingual-medium"],
  "the bilingual filter should require explicitly verified Chinese and English media",
);
assert.equal(
  filterPlanningSchoolCandidates(primaryLanguageCandidates, criteria({ language: "bilingual" })).unclassifiedCount,
  1,
  "unknown teaching-medium evidence should remain unclassified rather than be inferred",
);

const primary = [
  candidate("p1-funded-net91", "primary"),
  candidate("p1-dss-net91", "primary", { primaryFinance: "直資" }),
  candidate("private-no-net", "primary", { primaryFinance: "私立", primarySchoolNet: "不限校網", primaryP1Participation: false }),
  candidate("p1-unknown", "primary", { primaryFinance: null, district: null, gender: null, teachingLanguage: null, primarySchoolNet: null, primaryP1Participation: null }),
];
assert.deepEqual(
  filterPlanningSchoolCandidates(primary, criteria({ district: "沙田區", studentGender: "boy", primaryFinance: "funded", primarySchoolNet: "91", primaryP1Participation: "listed" })).matches.map((item) => item.id),
  ["p1-funded-net91"],
  "primary finance, school net, 2027/28 roster, and inclusive gender filters should combine",
);
assert.deepEqual(
  filterPlanningSchoolCandidates(primary, criteria({ primaryFinance: "international" })).matches,
  [],
  "a missing school category should not be presumed international",
);
assert.equal(
  filterPlanningSchoolCandidates(primary, criteria({ primarySchoolNet: "91" })).unclassifiedCount,
  1,
  "unknown primary net participation must be reported separately",
);
assert.deepEqual(
  filterPlanningSchoolCandidates(primary, criteria({ query: "p1 FUNDED" })).matches.map((item) => item.id),
  ["p1-funded-net91"],
  "case and punctuation-insensitive school search should work",
);

const routeRanked = [
  candidate("unmarked", "primary"),
  candidate("linked", "primary", { routeSignals: [{ route: "ib", kind: "linked", priority: 6 }] }),
  candidate("attached", "primary", { routeSignals: [{ route: "ib", kind: "attached", priority: 5 }] }),
  candidate("pyp-only", "primary", { routeSignals: [{ route: "ib", kind: "primary-programme", priority: 2 }] }),
  candidate("same-school", "primary", { routeSignals: [{ route: "ib", kind: "same-school", priority: 4 }] }),
  candidate("one-dragon", "primary", { routeSignals: [{ route: "ib", kind: "one-dragon", priority: 3 }] }),
  candidate("pyp-pathway", "primary", { routeSignals: [{ route: "ib", kind: "primary-programme", priority: 1 }] }),
  candidate("pyp-continuum", "primary", { routeSignals: [{ route: "ib", kind: "primary-programme", priority: 0 }] }),
];
assert.deepEqual(
  prioritizePlanningSchoolCandidates(routeRanked, "ib").map((item) => item.id),
  ["pyp-continuum", "pyp-pathway", "pyp-only", "one-dragon", "same-school", "attached", "linked", "unmarked"],
  "IB preference should rank full PYP/MYP/DP continuum, documented PYP progression, PYP-only schools, then non-PYP secondary pathway clues while retaining all matches",
);
assert.deepEqual(
  filterPlanningSchoolCandidatesByRouteSignal(routeRanked, "ib").map((item) => item.id),
  ["linked", "attached", "pyp-only", "same-school", "one-dragon", "pyp-pathway", "pyp-continuum"],
  "when the selected route is the only primary constraint, the initial recommendation set should include only schools with that route's evidence signal",
);
assert.deepEqual(
  prioritizePlanningSchoolCandidates(routeRanked, "dse").map((item) => item.id),
  ["unmarked", "linked", "attached", "pyp-only", "same-school", "one-dragon", "pyp-pathway", "pyp-continuum"],
  "signals for other routes must not affect this route's ranking",
);

assert.deepEqual(
  parsePlanningSchoolThroughTrain("一条龙 優才（楊殷有娣）書院")?.destinations,
  ["優才（楊殷有娣）書院", "優才書院"],
  "official school names in parentheses must survive through-train matching",
);
assert.deepEqual(
  parsePlanningSchoolThroughTrain("附属小学 聖保羅書院（中一 210 学额留 110 个）")?.destinations,
  ["聖保羅書院（中一 210 学额留 110 个）", "聖保羅書院"],
  "the matcher should also retain a full campus/quota note and a clean fallback name",
);

console.log("Kindergarten and primary filters, missing-data handling, route-specific prioritization, inclusive gender, language and POA roster scope: OK");
