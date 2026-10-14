import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [schoolsJson, evidenceJson] = await Promise.all([
  readFile(new URL("../src/content/schools.json", import.meta.url), "utf8"),
  readFile(new URL("../src/content/primary-school-ib-evidence.json", import.meta.url), "utf8"),
]);
const primarySchools = JSON.parse(schoolsJson);
const evidence = JSON.parse(evidenceJson);
const directoryBySchoolNo = new Map(primarySchools.map((school) => [String(school.school_no), school]));
const ids = evidence.schools.map((school) => String(school.schoolNo));
const officialHostPattern = /(^|\.)(ibo\.org|edb\.gov\.hk|esf\.edu\.hk|malverncollege\.org\.hk|finalsite\.net|cdnis\.edu\.hk|hkacademy\.edu\.hk|vsa\.edu\.hk|luac\.edu\.hk|plkis\.edu\.hk|montessori-ami\.edu\.hk|jis\.edu\.hk|ichk\.edu\.hk|kingston\.edu\.hk|creativeprisch\.edu\.hk|carmel\.edu\.hk|ykpaoschool\.hk)$/i;

assert.ok(evidence.metadata.checked, "IB evidence must record a verification date");
assert.ok(evidence.schools.length >= 20, "the IB primary shortlist should extend beyond the original small pilot");
assert.equal(new Set(ids).size, ids.length, "each IB PYP record must map to one unique school record");

for (const school of evidence.schools) {
  assert.ok(directoryBySchoolNo.has(String(school.schoolNo)), `schoolNo ${school.schoolNo} must exist in the primary directory`);
  assert.ok(school.programmes.includes("PYP"), `${school.schoolNo} must have a primary-stage PYP signal`);

  const sources = [
    { sourceLabel: school.sourceLabel, sourceUrl: school.sourceUrl },
    ...(school.relatedSources ?? []),
    ...(school.progression?.sources ?? []),
    ...(school.gradeScope?.sources ?? []),
  ];
  assert.ok(sources.length > 0, `${school.schoolNo} needs a source`);
  for (const source of sources) {
    assert.ok(source.sourceLabel?.trim(), `${school.schoolNo} source needs a descriptive label`);
    const url = new URL(source.sourceUrl);
    assert.equal(url.protocol, "https:", `${school.schoolNo} source must use HTTPS`);
    assert.ok(officialHostPattern.test(url.hostname), `${school.schoolNo} source must be an official school, IB, ESF, or EDB page: ${url.hostname}`);
  }

  if (school.progression) {
    assert.equal(school.progression.priority, 1, `${school.schoolNo} progression clue must rank after full same-school IB continuum`);
    assert.ok(school.progression.checkedOn, `${school.schoolNo} progression source needs its own checked date`);
    assert.ok(/IBDP/u.test(school.progression.note ?? ""), `${school.schoolNo} progression note must distinguish the secondary route from later IBDP admission`);
    assert.ok(/不代表|不等于|不等於|不是保證|不是保证|而非保證|而非保证|不保證|不保证|不是對|不是对/u.test(school.progression.note ?? ""), `${school.schoolNo} progression note must explicitly limit any admission or IBDP implication`);
  }
}

const esfPrimarySchoolNos = [
  170348000123, // Beacon Hill
  170747000123, // Bradbury
  171034000123, // Clearwater Bay
  170887000123, // Glenealy
  170879000123, // Kennedy
  170909000123, // Kowloon Junior
  170860000123, // Peak
  170895000123, // Quarry Bay
  190543000123, // Shatin Junior
];
for (const schoolNo of esfPrimarySchoolNos) {
  const school = evidence.schools.find((item) => item.schoolNo === schoolNo);
  assert.ok(school, `ESF primary school ${schoolNo} should be represented`);
  assert.ok(school.progression?.sources?.some((source) => source.sourceUrl.includes("join-us.esf.edu.hk/admissions-primary-secondary") || source.sourceUrl.includes("join-us.esf.edu.hk/primary-secondary-online-application")), `ESF primary school ${schoolNo} needs the official secondary-admissions source`);
  assert.match(school.progression.label, /學位保障|学位保障/u, `ESF primary school ${schoolNo} should accurately disclose ESF's guaranteed secondary-place policy`);
  assert.match(school.progression.note, /不等於可任擇某一所中學|不等于可任择某一所中学|不是對任一志願學校|不是对任一志愿学校|任一指定志願學校|任一指定志愿学校/u, `ESF primary school ${schoolNo} must distinguish a guaranteed ESF place from a school-of-choice guarantee`);
}

const kingstonEvidence = evidence.schools.find((item) => item.schoolNo === 541915000123);
assert.match(kingstonEvidence.progression.note, /Guaranteed Secondary Placement/u, "Kingston's own guarantee claim must be represented rather than silently generalized");
assert.match(kingstonEvidence.progression.note, /按入學年度|按入学年度/u, "Kingston's transition claim must be qualified by current annual terms");

for (const schoolNo of [230979000123, 522775000123, 541915000123]) {
  const school = evidence.schools.find((item) => item.schoolNo === schoolNo);
  assert.ok(school?.progression?.sources?.some((source) => source.sourceUrl === "https://www.ichk.edu.hk/join/admissions-info"), `${schoolNo} needs ICHK's current admissions conditions`);
  assert.match(school.progression.note, /班級空缺|班级空缺/u, `${schoolNo} must disclose ICHK's current availability condition`);
  assert.match(school.progression.note, /入學要求|入学要求/u, `${schoolNo} must disclose ICHK's admissions requirements`);
  assert.match(school.progression.note, /校長決定|校长决定/u, `${schoolNo} must disclose ICHK's final-decision caveat`);
}

assert.equal(evidence.schools.some((school) => school.schoolNo === 216275000623), false, "AISHK Australian Curriculum primary stage must not be added as PYP without authorization evidence");
assert.equal(evidence.schools.some((school) => school.schoolNo === 325147000223), false, "YCIS English/Putonghua primary curriculum must not be added as PYP without authorization evidence");
assert.equal(evidence.schools.some((school) => school.schoolNo === 216003000223), false, "SISHK Singapore-curriculum primary must not be added as PYP without authorization evidence");
assert.equal(evidence.schools.some((school) => [214949000523, 214949000723].includes(school.schoolNo)), false, "FIS campus-level English International Stream routes must not be mislabeled primary PYP");

const continuumCount = evidence.schools.filter((school) => school.programmes.includes("MYP") && school.programmes.includes("DP")).length;
const pypCount = evidence.schools.filter((school) => school.programmes.includes("PYP")).length;
const plannedPypCount = evidence.schools.filter((school) => school.programmeStatus === "planned").length;
const verifiedPypCount = pypCount - plannedPypCount;
assert.equal(pypCount, 24, "the primary IB route evidence should include 23 authorized PYP schools plus the mapped YK Pao planned-PYP record");
assert.equal(verifiedPypCount, 23, "planned PYP must not be counted as an authorized programme");
assert.equal(plannedPypCount, 1, "the current primary route dataset should isolate one planned/candidate PYP record");
const ykPaoEvidence = evidence.schools.find((school) => school.schoolNo === 629685000123);
assert.equal(ykPaoEvidence.programmeStatus, "planned", "YK Pao's PYP must remain explicitly planned pending authorization-status clarification");
assert.equal(ykPaoEvidence.priority, 99, "planned PYP should rank below authorized IB route evidence");
assert.match(ykPaoEvidence.note, /教育局.*PYP|教育局.*PYP/u, "YK Pao's source-status discrepancy must remain visible");
assert.match(ykPaoEvidence.note, /不.*已獲 PYP 授權|不.*已获 PYP 授权/u, "planned PYP must not be presented as already authorized");
const progressionCount = evidence.schools.filter((school) => Boolean(school.progression)).length;
assert.ok(continuumCount >= 7, "the data should include the identified full PYP/MYP/DP schools");
assert.ok(progressionCount >= 12, "the data should include ESF and partner-school progression evidence");

const gradeScopeTokens = new Map([
  [170348000123, "Year 1–6"],
  [170747000123, "Year 1–6"],
  [170860000123, "Year 1–6"],
  [170879000123, "Year 1–6"],
  [170887000123, "Year 1–6"],
  [170895000123, "Year 1–6"],
  [170909000123, "Year 1–6"],
  [171034000123, "Year 1–6"],
  [190543000123, "Year 1–6"],
  [216011000523, "Grade 6–10"],
  [216186000323, "Grade 11–12"],
  [230979000123, "Year 6"],
  [325279000123, "P6"],
  [522775000123, "International Section"],
  [539155000323, "Grade 11–12"],
  [541915000123, "Year 1–6"],
  [560138000223, "Year 1–5"],
  [567485000123, "Year 1–6"],
  [569747000223, "Year 1–6"],
  [606766000123, "Prep 1–6"],
  [579530000123, "Year 1–6"],
  [607290000123, "3–12 岁"],
  [600814000123, "Lower Primary 6–9 岁"],
]);
for (const [schoolNo, token] of gradeScopeTokens) {
  const school = evidence.schools.find((item) => item.schoolNo === schoolNo);
  assert.ok(school?.gradeScope, `${schoolNo} same-school IB continuum needs a grade-scope summary`);
  assert.ok(school.gradeScope.sources.length > 0, `${schoolNo} grade-scope summary needs official sources`);
  assert.ok(school.gradeScope.label.includes(token), `${schoolNo} grade scope should include ${token}`);
}
const hkaScope = evidence.schools.find((item) => item.schoolNo === 539155000323).gradeScope;
assert.match(hkaScope.note, /不是每名學生都自動修讀完整 IBDP|不是每名学生都自动修读完整 IBDP/u, "HKA's Grade 11–12 course options must not be presented as universal full-DP participation");
const discoveryScope = evidence.schools.find((item) => item.schoolNo === 569747000223).gradeScope;
assert.match(discoveryScope.note, /individual Diploma Courses/u, "Discovery College's DP course-only option should remain visible");
const jisEvidence = evidence.schools.find((item) => item.schoolNo === 522775000123);
assert.match(jisEvidence.gradeScope.label, /只適用.*International Section|只适用.*International Section/u, "JIS PYP must be limited to its International Section");
assert.match(jisEvidence.progression.note, /Japanese Section.*International Section/u, "JIS progression must preserve the distinction between its sections");
const creativeEvidence = evidence.schools.find((item) => item.schoolNo === 325279000123);
assert.match(creativeEvidence.gradeScope.label, /完整逐級範圍未公開列明|完整逐级范围未公开列明/u, "Creative Primary's unconfirmed year-by-year programme coverage must remain explicit");
const ichkHlyEvidence = evidence.schools.find((item) => item.schoolNo === 230979000123);
assert.match(ichkHlyEvidence.gradeScope.note, /2017/u, "ICHK HLY's older grade-scope source must be visibly qualified");

const lutheranEvidence = evidence.schools.find((item) => item.schoolNo === 579530000123);
assert.deepEqual(lutheranEvidence.programmes, ["PYP", "MYP", "DP"], "Lutheran Academy should expose its school-documented PYP/MYP/DP continuum");
assert.equal(lutheranEvidence.sourceUrl, "https://www.luac.edu.hk/school-profile/", "Lutheran Academy's official profile should substantiate all three IB programme authorizations");
assert.ok(lutheranEvidence.relatedSources.some((source) => source.sourceUrl === "https://www.luac.edu.hk/prospectus/"), "Lutheran Academy's through-train and dual-exit claims need the official prospectus");
assert.ok(lutheranEvidence.relatedSources.some((source) => source.sourceUrl === "https://www.luac.edu.hk/admissions/"), "Lutheran Academy's transition caveat needs its official Year 7 admissions page");
assert.match(lutheranEvidence.gradeScope.label, /Year 1–6/u, "Lutheran Academy's PYP grade scope should remain explicit");
assert.match(lutheranEvidence.gradeScope.label, /未确认逐级年级安排/u, "Lutheran Academy's unverified MYP/DP grade-level scope must remain explicit");
assert.match(lutheranEvidence.gradeScope.note, /香港课程与 PYP/u, "Lutheran Academy's primary curriculum must remain described as an integration, not PYP-only");
assert.match(lutheranEvidence.gradeScope.note, /IBDP 与 HKDSE 双出口/u, "Lutheran Academy's two senior-school route options should be disclosed");
assert.match(lutheranEvidence.gradeScope.note, /小六升中资格、过渡门槛/u, "Lutheran Academy's undocumented transition criteria must remain unknown");
assert.match(lutheranEvidence.gradeScope.note, /不代表自动升中/u, "Lutheran Academy's through-train wording must not become an automatic-admission promise");
assert.match(lutheranEvidence.gradeScope.note, /不代表自动升中.*不代表保证入读 IBDP/u, "Lutheran Academy's IB route must not become an IBDP admission guarantee");

const dmaEvidence = evidence.schools.find((item) => item.schoolNo === 600814000123);
assert.equal(dmaEvidence.displayName, "Discovery Montessori Academy", "DMA should use its official proper-case name rather than the all-caps directory import");
assert.match(dmaEvidence.gradeScope.note, /年齡組別|年龄组别/u, "DMA's age bands must not be converted into unsupported grade numbers");
assert.match(evidence.schools.find((item) => item.schoolNo === 579530000123).gradeScope.note, /香港課程與 PYP 的整合|香港课程与 PYP 的整合/u, "Lutheran Academy should not be described as pure PYP-only curriculum");
assert.match(evidence.schools.find((item) => item.schoolNo === 607290000123).gradeScope.note, /不應誤讀.*年級|不应误读.*年级/u, "HKCA framework age range must not be misrepresented as its admissions grade range");

console.log(`IB primary-route evidence: ${evidence.schools.length} primary records, ${verifiedPypCount} authorized PYP records + ${plannedPypCount} planned PYP clue, ${continuumCount} same-school PYP/MYP/DP continuum, ${progressionCount} documented progression clues, ${gradeScopeTokens.size} grade scopes; sources and directory mapping: OK`);
