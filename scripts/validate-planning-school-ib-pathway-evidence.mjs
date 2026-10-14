import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Converter } from "opencc-js";

const [schoolsJson, secondaryJson, pathwaysJson, planningDataSource] = await Promise.all([
  readFile(new URL("../src/content/schools.json", import.meta.url), "utf8"),
  readFile(new URL("../src/content/secondary-school-planning-candidates.json", import.meta.url), "utf8"),
  readFile(new URL("../src/content/primary-school-ib-pathway-evidence.json", import.meta.url), "utf8"),
  readFile(new URL("../src/lib/planning-school-data.ts", import.meta.url), "utf8"),
]);
const primarySchools = JSON.parse(schoolsJson);
const secondarySchools = JSON.parse(secondaryJson).schools;
const pathways = JSON.parse(pathwaysJson);
const directoryBySchoolNo = new Map(primarySchools.map((school) => [String(school.school_no), school]));
const schoolNos = pathways.schools.map((school) => String(school.schoolNo));
const officialHostPattern = /(^|\.)(sscps\.edu\.hk|ssc\.edu\.hk|spccps\.edu\.hk|spcc\.edu\.hk|dbspd\.edu\.hk|dbs\.edu\.hk|logos\.edu\.hk|logosacademy\.edu\.hk|sais\.edu\.hk|gtcollege\.edu\.hk|chsc\.hk|vsa\.edu\.hk|ibo\.org|academy\.isf\.edu\.hk|edb\.gov\.hk|cis\.edu\.hk|gsis\.edu\.hk|luac\.edu\.hk|nordangliaeducation\.com|aishk\.edu\.hk|ycis-hk\.com|ycef\.com|singapore\.edu\.hk|fis\.edu\.hk|esf\.edu\.hk|cdnis\.edu\.hk|hkacademy\.edu\.hk|malverncollege\.org\.hk|carmel\.edu\.hk|finalsite\.net|ichk\.edu\.hk)$/i;
const normalizeName = (value) => String(value ?? "").normalize("NFC").toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
const toTraditional = Converter({ from: "cn", to: "hk" });
const toSimplified = Converter({ from: "hk", to: "cn" });
const normalizedNameVariants = (value) => {
  const text = String(value ?? "");
  return new Set([text, toTraditional(text), toSimplified(text)].map(normalizeName).filter(Boolean));
};
const namesMatch = (left, right) => [...normalizedNameVariants(left)].some((name) => normalizedNameVariants(right).has(name));

assert.ok(pathways.metadata.checked, "IB pathway evidence must record its check date");
assert.equal(new Set(schoolNos).size, schoolNos.length, "each primary-school IB pathway must map to one unique school");
for (const [schoolNo, candidateId] of [
  ["606766000123", "malvern-college-hong-kong"],
  ["216186000323", "carmel-school-hong-kong-elsa-high-school"],
  ["230979000123", "international-college-hong-kong"],
]) {
  assert.ok(planningDataSource.includes(`"${schoolNo}": ["${candidateId}"]`), `${schoolNo} pathway must map to the secondary candidate so its route signal reaches the primary recommendation UI`);
}


for (const evidence of pathways.schools) {
  const schoolNo = String(evidence.schoolNo);
  const primary = directoryBySchoolNo.get(schoolNo);
  assert.ok(primary, `${schoolNo} must exist in the primary school directory`);
  assert.equal(evidence.route, "ib", `${schoolNo} must use the IB route key`);
  assert.ok(evidence.linkedSchoolName?.trim(), `${schoolNo} needs the linked secondary-school name`);
  if (evidence.relationshipType === "same-school") {
    const expectedSameSchoolName = new Map([
      ["605638000123", "STAMFORD AMERICAN SCHOOL HONG KONG"],
      ["553190000323", "THE INDEPENDENT SCHOOLS FOUNDATION ACADEMY"],
      ["215589000123", "CHINESE INTERNATIONAL SCHOOL"],
      ["216011000523", "CANADIAN INTERNATIONAL SCHOOL OF HONG KONG"],
      ["539155000323", "HONG KONG ACADEMY"],
      ["214558000123", "GERMAN SWISS INTERNATIONAL SCHOOL"],
      ["214558000221", "GERMAN SWISS INTERNATIONAL SCHOOL"],
      ["598356000223", "NORD ANGLIA INTERNATIONAL SCHOOL, HONG KONG"],
      ["567485000123", "RENAISSANCE COLLEGE"],
      ["560138000223", "VICTORIA SHANGHAI ACADEMY"],
      ["606766000123", "MALVERN COLLEGE HONG KONG"],
      ["216186000323", "CARMEL SCHOOL"],
      ["230979000123", "INTERNATIONAL COLLEGE HONG KONG HONG LOK YUEN (PRIMARY SECTION)"],
      ["216275000623", "AUSTRALIAN INTERNATIONAL SCHOOL HONG KONG"],
      ["325147000223", "YEW CHUNG INTERNATIONAL SCHOOL"],
      ["216003000223", "SINGAPORE INTERNATIONAL SCHOOL (HONG KONG)"],
      ["569747000223", "DISCOVERY COLLEGE"],
      ["214949000523", "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)"],
      ["214949000723", "LYC'EE FRANCAIS INTERNATIONAL (FRENCH INTERNATIONAL SCHOOL)"],
    ]).get(schoolNo);
    assert.ok(expectedSameSchoolName, `${schoolNo} same-school link needs an explicit primary-directory identity mapping`);
    assert.equal(primary.name_en, expectedSameSchoolName, `${schoolNo} same-school link must map to its matching primary record`);
  } else {
    const throughTrainDestination = primary.through_train?.replace(/^(?:一条龙直升|一條龍直升|一条龙|一條龍|直属|直屬|联系|聯繫|附属小学|附屬小學)\s*/u, "");
    assert.ok(namesMatch(throughTrainDestination, evidence.linkedSchoolName), `${schoolNo} directory must document the attached / linked school relation`);
  }
  assert.ok(evidence.label?.trim() && evidence.note?.trim(), `${schoolNo} needs a visible label and qualification note`);
  assert.ok(/無條件/u.test(evidence.note) && /保證/u.test(evidence.note), `${schoolNo} must explicitly avoid an unconditional admission or IBDP guarantee`);
  assert.ok(/優先|一條龍|聯繫中學|同校/u.test(evidence.label), `${schoolNo} label must describe the documented school relationship`);
  assert.ok(/IBDP/.test(evidence.note), `${schoolNo} note must distinguish secondary-school admission from later IBDP entry`);
  assert.ok(evidence.checkedOn, `${schoolNo} needs a row-level check date`);
  assert.ok(Number.isFinite(evidence.priority) && evidence.priority >= 0, `${schoolNo} needs a non-negative priority rank`);

  const linkedNames = normalizedNameVariants(evidence.linkedSchoolName);
  const secondary = secondarySchools.find((school) => [school.fallbackName, school.names?.tc, school.names?.sc, school.names?.en]
    .some((name) => [...normalizedNameVariants(name)].some((variant) => linkedNames.has(variant))));
  assert.ok(secondary?.routes.includes("ib"), `${schoolNo} linked secondary candidate must actually carry an IB route`);
  assert.ok(secondary.routeEvidence?.some((item) => item.route === "ib"), `${schoolNo} linked secondary candidate needs IB route evidence`);

  for (const source of [{ sourceLabel: evidence.sourceLabel, sourceUrl: evidence.sourceUrl }, ...(evidence.relatedSources ?? [])]) {
    assert.ok(source.sourceLabel?.trim(), `${schoolNo} source needs a descriptive label`);
    const url = new URL(source.sourceUrl);
    assert.equal(url.protocol, "https:", `${schoolNo} source must use HTTPS`);
    assert.ok(officialHostPattern.test(url.hostname), `${schoolNo} pathway evidence must use official school sources: ${url.hostname}`);
  }
}

const stStephen = pathways.schools.find((school) => school.schoolNo === 517372000123);
assert.ok(stStephen, "St Stephen's College Preparatory School conditional feeder route should be recorded");
assert.equal(stStephen.linkedSchoolName, "聖士提反書院", "St Stephen's College must remain the linked destination");
assert.ok(stStephen.relatedSources.some((source) => /IBDP|IB Diploma/u.test(source.sourceLabel)), "the linked college's IBDP programme source must be provided");

const spccPrimary = pathways.schools.find((school) => school.schoolNo === 514187000323);
assert.ok(spccPrimary, "SPCC Primary's conditional one-dragon link to the IB-offering secondary school should be recorded");
assert.equal(spccPrimary.linkedSchoolName, "聖保羅男女中學", "SPCC Primary must map to the correct secondary school");
assert.equal(spccPrimary.priority, 3, "a conditional one-dragon link should not outrank direct primary PYP evidence");
assert.match(spccPrimary.note, /學業及品德/u, "SPCC's one-dragon academic and conduct conditions must remain explicit");
assert.match(spccPrimary.note, /不代表小學開辦 PYP/u, "SPCC's IB route must not be misrepresented as primary PYP");
assert.ok(spccPrimary.relatedSources.some((source) => /預備年收生要求/u.test(source.sourceLabel)), "SPCC's later IBDP application requirements need an official source");

const dbsPrimary = pathways.schools.find((school) => school.schoolNo === 510777000123);
assert.ok(dbsPrimary, "DBSPD's qualified through-train link and later IB pathway should be recorded");
assert.equal(dbsPrimary.linkedSchoolName, "拔萃男書院", "DBSPD must map to Diocesan Boys' School secondary division");
assert.equal(dbsPrimary.priority, 3, "a through-train connection with a separate G10 IB assessment should not outrank direct primary PYP evidence");
assert.match(dbsPrimary.note, /符合資格/u, "DBSPD's transition must retain its qualified-student limitation");
assert.match(dbsPrimary.note, /中學 G7 收生由校方辦理/u, "DBS secondary school's own G7 admissions process must remain visible");
assert.match(dbsPrimary.note, /內部及外部申請人均須參加/u, "DBS IB G10 assessment must be visible for internal students too");
assert.match(dbsPrimary.note, /不代表小學開辦 PYP/u, "DBS's secondary IB pathway must not be misrepresented as primary PYP");
assert.ok(dbsPrimary.relatedSources.some((source) => /G11–12 IBDP/u.test(source.sourceLabel)), "DBS's actual IBDP grade scope needs an official source");
assert.ok(dbsPrimary.relatedSources.some((source) => /G7 中一校本收生及 SSPA/u.test(source.sourceLabel)), "DBS's current G7 school-based admission process needs an official source");

const saisPrimary = pathways.schools.find((school) => school.schoolNo === 605638000123);
assert.ok(saisPrimary, "Stamford American's documented same-school IB option should be recorded");
assert.equal(saisPrimary.relationshipType, "same-school", "Stamford American's link should be explicit and not inferred from a directory through-train field");
assert.equal(saisPrimary.linkedSchoolName, "香港斯坦福美国学校", "Stamford primary must map to its correct secondary-school candidate");
assert.equal(saisPrimary.priority, 4, "a non-PYP same-school pathway should rank below direct primary PYP and documented one-dragon evidence");
assert.match(saisPrimary.label, /K–12 一條龍/u, "Stamford's school-described K–12 progression should be visible");
assert.match(saisPrimary.note, /美式標準課程/u, "Stamford's primary curriculum must not be misrepresented as PYP");
assert.match(saisPrimary.note, /沒有把小學稱為 PYP/u, "Stamford must not be presented as an authorized primary PYP school");
assert.match(saisPrimary.note, /Grade 9–12/u, "Stamford's IB option should be tied to the documented high-school grades");
assert.match(saisPrimary.note, /個別 IB 課程不等於完整 IBDP/u, "Stamford's individual IB courses must not be equated with a full Diploma");
assert.match(saisPrimary.note, /不應延伸解讀為無條件入學保證/u, "Stamford's through-train description must not be overstated as guaranteed progression");
assert.match(saisPrimary.note, /不保證獲准修讀完整 IBDP/u, "Stamford must not be described as guaranteeing access to the full Diploma");
assert.ok(saisPrimary.relatedSources.some((source) => /Elementary School/u.test(source.sourceLabel)), "Stamford's primary curriculum claim needs an official elementary-school source");
assert.ok(saisPrimary.relatedSources.some((source) => /High School Curriculum/u.test(source.sourceLabel)), "Stamford's secondary IB options need an official high-school source");

const logosPrimary = pathways.schools.find((school) => school.schoolNo === 543314000223);
assert.ok(logosPrimary, "Logos Academy's documented through-train IB option should be recorded");
assert.equal(logosPrimary.linkedSchoolName, "香港華人基督教聯會真道書院", "Logos Primary must map to the same-school secondary candidate");
assert.equal(logosPrimary.priority, 3, "a same-school secondary IBDP option should not outrank direct primary PYP evidence");
assert.match(logosPrimary.note, /HKDSE 與 IBDP/u, "Logos route evidence must retain its documented parallel routes");
assert.match(logosPrimary.note, /IBDP 為兩年制課程/u, "Logos IBDP duration must remain accurate");
assert.match(logosPrimary.note, /MS3、MS4 分列為 DSE 與 IB 路線/u, "Logos route evidence must preserve the official pathway grade labels");
assert.match(logosPrimary.note, /未列明內部升中資格/u, "undocumented Logos progression criteria must stay explicitly unknown");
assert.match(logosPrimary.note, /不代表小學開辦 IB PYP/u, "Logos secondary IBDP must not be misrepresented as primary PYP");
assert.match(logosPrimary.note, /不延伸推定為教育局指定派位保障/u, "the school's self-described through-train wording must not be confused with EDB-designated allocation protection");
assert.ok(logosPrimary.relatedSources.some((source) => /School-based Curriculum Plan/u.test(source.sourceLabel)), "Logos' DSE and IB pathway levels need a direct official curriculum source");
assert.ok(logosPrimary.relatedSources.some((source) => /Annual School Plan 2025–2026/u.test(source.sourceLabel)), "Logos' eleven-year through-train curriculum needs a dated official source");

const gtPrimaryCampuses = [543292000323, 543292000223].map((schoolNo) => {
  const school = pathways.schools.find((candidate) => candidate.schoolNo === schoolNo);
  assert.ok(school, `G.T. College primary campus ${schoolNo} should be recorded`);
  assert.equal(school.linkedSchoolName, "優才（楊殷有娣）書院", "G.T. College primary campuses must map to the correct secondary-school candidate");
  assert.equal(school.priority, 3, "a one-dragon pathway to a secondary IBDP option should not outrank direct primary PYP evidence");
  assert.match(school.note, /男女校 through-train school/u, "G.T. College's school-described through-train relationship must remain visible");
  assert.match(school.note, /未列明內部升中資格/u, "G.T. College progression conditions must not be invented");
  assert.match(school.note, /無條件升中保證/u, "G.T. College's one-dragon relationship must not be described as unconditional promotion");
  assert.match(school.note, /未證明小學部採用 IB PYP/u, "secondary IBDP must not be presented as proof of primary PYP");
  assert.match(school.note, /未說明學生進入中學後修讀 IBDP 的年級、條件或名額/u, "G.T. College's IBDP participation requirements must remain explicitly unknown");
  assert.ok(school.relatedSources.some((source) => /International Baccalaureate/u.test(source.sourceLabel)), "G.T. College's secondary IB route needs an official IB source");
  return school;
});
assert.equal(gtPrimaryCampuses.length, 2, "both G.T. College primary campus records must be accounted for");

const shanghaiAlumni = pathways.schools.find((school) => school.schoolNo === 513822000123);
assert.ok(shanghaiAlumni, "Shanghai Alumni Primary's directory-listed VSA connection should be recorded as a low-confidence clue");
assert.equal(shanghaiAlumni.relationshipType, "linked", "the CHSC relationship must not be upgraded to attached or one-dragon status");
assert.equal(shanghaiAlumni.linkedSchoolName, "滬江維多利亞學校", "Shanghai Alumni Primary must map to the VSA candidate");
assert.equal(shanghaiAlumni.priority, 6, "a directory-listed linked school must remain below stronger progression evidence");
assert.match(shanghaiAlumni.label, /聯繫中學/u, "the visible label must match CHSC's exact relationship category");
assert.match(shanghaiAlumni.note, /不代表優先取錄或無條件升中保證/u, "a directory relationship must not imply preferential or guaranteed admission");
assert.match(shanghaiAlumni.note, /不能據此推定滬江小學開辦 PYP/u, "VSA's PYP programme must not be misattributed to Shanghai Alumni Primary");
assert.match(shanghaiAlumni.note, /不等於保證日後修讀 IBDP/u, "secondary admission must not imply future IBDP participation");
assert.equal(shanghaiAlumni.sourceUrl, "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=38", "the linked-school label must cite the matching CHSC 2026 profile");
assert.ok(shanghaiAlumni.relatedSources.some((source) => source.sourceUrl === "https://www.vsa.edu.hk/learning/ib-continuum"), "VSA's IB programmes must be substantiated by its official IB page");

const isf = pathways.schools.find((school) => school.schoolNo === 553190000323);
assert.ok(isf, "ISF Academy's same-school MYP/DP route should be recorded");
assert.equal(isf.relationshipType, "same-school");
assert.equal(isf.linkedSchoolName, "弘立書院");
assert.equal(isf.priority, 4, "same-school MYP/DP continuity must remain below direct PYP signals");
assert.match(isf.label, /中學部開辦 MYP／DP/u);
assert.match(isf.note, /不應把小學課程稱為 IB PYP/u, "ISF's primary programme must not be mislabeled as PYP");
assert.match(isf.note, /無條件升中保證/u, "ISF's same-school relation must not imply unconditional internal progression");
assert.match(isf.note, /不等於保證日後修讀 IBDP/u, "ISF MYP continuity must not guarantee DP entry");
assert.ok(isf.relatedSources.some((source) => source.sourceUrl === "https://www.ibo.org/en/school/002876/"), "ISF's secondary IB route needs an official IB World School source");
assert.ok(isf.sourceUrl === "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/admissions-policy/"
  || isf.relatedSources.some((source) => source.sourceUrl === "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/admissions-policy/"), "ISF's primary curriculum statement needs an official school source");

const cis = pathways.schools.find((school) => school.schoolNo === 215589000123);
assert.ok(cis, "CIS's same-school MYP/DP route should be recorded");
assert.equal(cis.relationshipType, "same-school");
assert.equal(cis.linkedSchoolName, "漢基國際學校");
assert.equal(cis.priority, 4, "CIS's same-school route must remain below direct PYP signals");
assert.match(cis.label, /MYP／DP/u);
assert.match(cis.note, /沒有把它稱為 IB PYP/u, "CIS's bilingual inquiry-based primary curriculum must not be mislabeled as PYP");
assert.match(cis.note, /Year 10 必須赴杭州/u, "CIS's compulsory Year 10 Hangzhou stage must remain visible");
assert.match(cis.note, /不代表無條件升中保證/u, "CIS's same-school relationship must not imply guaranteed internal progression");
assert.match(cis.note, /不等於保證日後修讀 IBDP/u, "CIS's MYP pathway must not imply guaranteed DP placement");
assert.ok(cis.relatedSources.some((source) => source.sourceUrl === "https://www.cis.edu.hk/academics/secondary/overview"), "CIS's IB stages need a school-published secondary curriculum source");
assert.ok(cis.relatedSources.some((source) => source.sourceUrl === "https://www.cis.edu.hk/admissions/admissions-process/secondary"), "CIS's external Year 7 intake context must be sourced without inferring an internal guarantee");

const gsisPrimaryCampuses = [214558000123, 214558000221].map((schoolNo) => {
  const school = pathways.schools.find((candidate) => candidate.schoolNo === schoolNo);
  assert.ok(school, `GSIS primary directory campus ${schoolNo} must have a route-specific record`);
  assert.equal(school.relationshipType, "same-school");
  assert.equal(school.linkedSchoolName, "德国瑞士国际学校");
  assert.equal(school.priority, 4, "GSIS same-school secondary route must remain below direct PYP signals");
  assert.match(school.label, /EIS 才銜接 IGCSE／IBDP/u, "GSIS IB recommendation must be restricted to the English International Stream");
  assert.match(school.label, /GIS 為 DIA/u, "GSIS German International Stream must not be presented as IB");
  assert.match(school.note, /不能據此推定學生已選 EIS/u, "a school-directory identity must not imply stream selection");
  assert.match(school.note, /不代表小學開辦 IB PYP/u, "GSIS primary English curriculum must not be mislabeled PYP");
  assert.match(school.note, /不能據此推定.*獲同校升中名額/u, "same-school identity must not imply an admission guarantee");
  assert.match(school.note, /保證日後入讀 IBDP/u, "GSIS route evidence must not guarantee later DP entry");
  assert.ok(school.relatedSources.some((source) => source.sourceUrl === "https://www.gsis.edu.hk/english-stream/academics/english-international-stream/secondary"), "GSIS EIS route needs an official secondary programme source");
  assert.ok(school.relatedSources.some((source) => source.sourceUrl === "https://www.gsis.edu.hk/english-stream/academics/german-international-stream/secondary/DIA"), "GSIS GIS exit must be distinguished by an official source");
  assert.ok(school.relatedSources.some((source) => source.sourceUrl === "https://www.gsis.edu.hk/english-stream/admissions/how-to-apply?section=assessment"), "GSIS stream admissions evidence needs an official admissions source");
  assert.equal(school.sourceUrl, "https://www.gsis.edu.hk/english-stream/academics/english-international-stream/primary");
  return school;
});
assert.equal(gsisPrimaryCampuses.length, 2, "both GSIS primary directory records must be accounted for separately");

const lutheranAcademy = pathways.schools.find((school) => school.schoolNo === 579530000123);
assert.ok(lutheranAcademy, "ELCHK Lutheran Academy's documented primary-to-secondary IB route should be recorded");
assert.equal(lutheranAcademy.linkedSchoolName, "基督教香港信义会宏信书院");
assert.equal(lutheranAcademy.priority, 3, "the school-described through-train IB option must remain below direct PYP signals");
assert.match(lutheranAcademy.label, /直資一條龍/u);
assert.match(lutheranAcademy.note, /香港課程與 IB PYP 整合/u, "Lutheran Academy's primary programme must not be simplified to pure PYP");
assert.match(lutheranAcademy.note, /HKDSE 與 IBDP 兩類高中出口/u, "both documented senior routes must remain visible");
assert.match(lutheranAcademy.note, /不代表無條件升中保證/u, "school-described through-train must not imply guaranteed internal promotion");
assert.match(lutheranAcademy.note, /不等於保證日後修讀 IBDP/u, "the IB programme must not imply guaranteed DP placement");
assert.match(lutheranAcademy.note, /未清楚列明本校小六升中資格/u, "undocumented progression requirements must remain unknown");
assert.equal(lutheranAcademy.sourceUrl, "https://www.luac.edu.hk/la-curriculum/#PrimarySchool");
assert.ok(lutheranAcademy.relatedSources.some((source) => source.sourceUrl === "https://www.luac.edu.hk/school-profile/"), "the official school profile must support the programme continuum");
assert.ok(lutheranAcademy.relatedSources.some((source) => source.sourceUrl === "https://www.luac.edu.hk/admissions/"), "the Year 7 admissions source must not be mistaken for internal transition rules");

const nais = pathways.schools.find((school) => school.schoolNo === 598356000223);
assert.ok(nais, "NAIS's same-school IGCSE-to-IBDP route should be recorded");
assert.equal(nais.relationshipType, "same-school");
assert.equal(nais.linkedSchoolName, "Nord Anglia International School Hong Kong");
assert.equal(nais.priority, 4, "NAIS's secondary route must remain below direct PYP signals");
assert.match(nais.label, /IGCSE/u);
assert.match(nais.label, /小學非 PYP/u, "NAIS English National Curriculum must not be mislabeled PYP");
assert.match(nais.note, /Years 1–6/u);
assert.match(nais.note, /IBDP 與 A-Level 選項/u, "NAIS's two senior routes must both remain visible");
assert.match(nais.note, /不代表無條件升中保證/u, "same-school identity must not imply automatic internal progression");
assert.match(nais.note, /不等於保證日後修讀 IBDP/u, "NAIS's IB route must not guarantee entry to Year 12");
assert.match(nais.note, /未確認小學升讀中學的內部資格/u, "undocumented transition criteria must remain explicitly unknown");
assert.ok(nais.relatedSources.some((source) => source.sourceUrl === "https://www.nordangliaeducation.com/nais-hong-kong/academic-excellence/ib-diploma-programme"));
assert.ok(nais.relatedSources.some((source) => source.sourceUrl === "https://www.nordangliaeducation.com/nais-hong-kong/academic-excellence/a-levels"));

const aishk = pathways.schools.find((school) => school.schoolNo === 216275000623);
assert.ok(aishk, "AISHK's same-school secondary IB route should be recorded");
assert.equal(aishk.relationshipType, "same-school");
assert.equal(aishk.linkedSchoolName, "Australian International School Hong Kong");
assert.equal(aishk.priority, 4, "AISHK's later-stage route must remain below direct PYP signals");
assert.match(aishk.label, /Prep–Year 10/u);
assert.match(aishk.label, /小学未列 PYP/u, "ACARA primary curriculum must not be mislabeled PYP");
assert.match(aishk.note, /ACARA澳洲(?:课程|課程)/u);
assert.match(aishk.note, /IB Diploma Programme或NSW HSC/u, "the parallel HSC exit must not be hidden or conflated with IB");
assert.match(aishk.note, /不代表無條件升中保證/u, "same-school identity must not imply automatic internal progression");
assert.match(aishk.note, /不等於保證日後修讀或獲頒\s*IBDP/u, "AISHK's route must not guarantee later diploma entry or completion");
assert.match(aishk.note, /未(?:在公開資料中)?列明小學內部升中資格/u, "undocumented transition rules must remain explicitly unknown");
assert.ok(aishk.relatedSources.some((source) => source.sourceUrl === "https://www.aishk.edu.hk/learning/senior-years"));
assert.ok(aishk.relatedSources.some((source) => source.sourceUrl === "https://www.aishk.edu.hk/admissions"));
assert.equal(aishk.sourceUrl, "https://www.aishk.edu.hk/learning/primary-school");

const ycis = pathways.schools.find((school) => school.schoolNo === 325147000223);
assert.ok(ycis, "YCIS primary's documented same-network secondary IB route should be recorded");
assert.equal(ycis.relationshipType, "same-school");
assert.equal(ycis.linkedSchoolName, "Yew Chung International School - Secondary");
assert.equal(ycis.priority, 3, "YCIS documented through-train route should rank below direct PYP signals");
assert.match(ycis.label, /同教育網絡/u);
assert.match(ycis.label, /小學未列 PYP/u, "YCIS primary curriculum must not be mislabeled as PYP");
assert.match(ycis.note, /through-train/u);
assert.match(ycis.note, /內部網絡轉校.*並非自動升中規則/u, "YCIS admission priority must not be overstated as automatic progression");
assert.match(ycis.note, /不代表無條件升中保證/u);
assert.match(ycis.note, /不等於保證日後修讀或獲頒\s*IBDP/u);
assert.match(ycis.note, /未公開本校小六升中名額/u, "undocumented internal transition terms must remain explicit");
assert.ok(ycis.relatedSources.some((source) => source.sourceUrl === "https://www.ycis-hk.com/en/academics/secondary/ib-programme-years-12-13"));
assert.ok(ycis.relatedSources.some((source) => source.sourceUrl === "https://www.ycef.com/sister-school/ycis-hk/"));
assert.equal(ycis.sourceUrl, "https://internationalschools.edb.gov.hk/en/schools/107.html");

const sishk = pathways.schools.find((school) => school.schoolNo === 216003000223);
assert.ok(sishk, "SISHK's documented same-school Singapore-curriculum-to-IB route should be recorded");
assert.equal(sishk.relationshipType, "same-school");
assert.equal(sishk.linkedSchoolName, "Singapore International School (Hong Kong)");
assert.equal(sishk.priority, 3, "SISHK's documented same-school route should remain below direct PYP signals");
assert.match(sishk.label, /同校/u);
assert.match(sishk.label, /小(?:學|学)未列 PYP/u, "SISHK Singapore curriculum must not be mislabeled PYP");
assert.match(sishk.note, /IGCSE/u);
assert.match(sishk.note, /多數本校小學學生繼續升讀中學與IBDP|多数本校小学学生继续升读中学与IBDP/u, "the school's stated continuation pattern should be recorded with its proper scope");
assert.match(sishk.note, /不代表無條件升中保證/u, "same-school identity must not imply automatic secondary admission");
assert.match(sishk.note, /不等於保證日後修讀或獲頒\s*IBDP/u, "the IB route must not guarantee later diploma entry or completion");
assert.match(sishk.note, /仍接受Secondary 1–3及IBDP Year 1獨立申請|仍接受Secondary 1–3及IBDP Year 1独立申请/u, "independent admissions must remain explicit");
assert.ok(sishk.relatedSources.some((source) => source.sourceUrl === "https://www.singapore.edu.hk/secondary-admissions/"));
assert.equal(sishk.sourceUrl, "https://internationalschools.edb.gov.hk/en/schools/105.html");

const fisTko = pathways.schools.find((school) => school.schoolNo === 214949000723);
const fisChaiWan = pathways.schools.find((school) => school.schoolNo === 214949000523);
assert.ok(fisTko && fisChaiWan, "the two FIS primary campuses with a documented International Stream should be represented separately");
for (const fis of [fisTko, fisChaiWan]) {
  assert.equal(fis.relationshipType, "same-school");
  assert.equal(fis.linkedSchoolName, "香港法国国际学校");
  assert.match(fis.label, /同校/u);
  assert.match(fis.note, /International Stream/u);
  assert.match(fis.note, /French Stream/u, "FIS IB route must not be generalized to the French curriculum stream");
  assert.match(fis.note, /不代表無條件/u);
  assert.match(fis.note, /不等於保證日後修讀或獲頒\s*IBDP/u);
  assert.match(fis.note, /校區|校区/u, "campus transitions must remain visible");
  assert.ok(fis.relatedSources.some((source) => source.sourceUrl === "https://www.fis.edu.hk/international-stream"));
  assert.ok(fis.relatedSources.some((source) => source.sourceUrl === "https://www.fis.edu.hk/french-stream"));
}
assert.match(fisTko.note, /Tseung Kwan O.*Nursery–Y6/u);
assert.match(fisChaiWan.note, /Chai Wan.*Nursery–Y2/u);
assert.equal(pathways.schools.some((school) => school.schoolNo === 214949000123), false, "Blue Pool Road is a current middle/high campus and must not be used as a primary pathway starting campus");

const vsa = pathways.schools.find((school) => school.schoolNo === 560138000223);
assert.ok(vsa, "Victoria Shanghai Academy's documented PYP-to-MYP-to-DP route should be recorded");
assert.equal(vsa.relationshipType, "same-school");
assert.equal(vsa.linkedSchoolName, "滬江維多利亞學校");
assert.equal(vsa.priority, 0, "VSA's official PYP/MYP/DP continuum should rank as a direct IB pathway signal");
assert.match(vsa.label, /同校.*PYP.*Year 1–5.*MYP.*Year 6–10.*DP.*Year 11–12/u);
assert.match(vsa.note, /through-train|一條龍|直通/u);
assert.match(vsa.note, /70%.*香港永久居民/u, "the 70% Hong Kong Permanent Resident places requirement should remain visible");
assert.match(vsa.note, /入學評估|入学评估/u, "VSA's published entrance assessment process must remain visible");
assert.match(vsa.note, /不代表無條件升中保證/u);
assert.match(vsa.note, /不等於保證日後修讀或獲頒完整\s*IBDP/u);
assert.ok(vsa.sourceUrl === "https://www.vsa.edu.hk/learning/ib-continuum");
assert.ok(vsa.relatedSources.some((source) => source.sourceUrl === "https://www.vsa.edu.hk/learning/primary-school"));
assert.ok(vsa.relatedSources.some((source) => source.sourceUrl === "https://www.vsa.edu.hk/learning/secondary-school"));
assert.ok(vsa.relatedSources.some((source) => source.sourceUrl === "https://www.vsa.edu.hk/admissions/how-to-apply"));
assert.ok(vsa.relatedSources.some((source) => source.sourceUrl === "https://www.vsa.edu.hk/admissions/how-to-apply/key-dates"));

const ichk = pathways.schools.find((school) => school.schoolNo === 230979000123);
assert.ok(ichk, "ICHK Hong Lok Yuen's documented partner-school IB route should be recorded");
assert.equal(ichk.relationshipType, "same-school");
assert.equal(ichk.linkedSchoolName, "International College Hong Kong · Secondary");
assert.equal(ichk.priority, 1, "partner-school priority is below direct same-campus continuum and is not admission guarantee");
assert.match(ichk.label, /伙伴校.*PYP.*IBDP/u);
assert.match(ichk.note, /優先考慮不等於保證中學學位/u);
assert.match(ichk.note, /兩校為不同校區/u);
assert.match(ichk.note, /Year 10–11.*IGCSE／BTEC.*Year 12–13.*IBDP/u);
assert.match(ichk.note, /不等於保證日後修讀或獲頒完整\s*IBDP/u);
assert.ok(ichk.relatedSources.some((source) => source.sourceUrl === "https://www.ichk.edu.hk/join/admissions-info"));
assert.ok(ichk.relatedSources.some((source) => source.sourceUrl === "https://internationalschools.edb.gov.hk/en/schools/18.html"));
assert.ok(ichk.relatedSources.some((source) => source.sourceUrl === "https://www.ichk.edu.hk/assets/resources/years-12-13-brochure-2025-27.pdf"));

const carmel = pathways.schools.find((school) => school.schoolNo === 216186000323);
assert.ok(carmel, "Carmel's documented same-school PYP/MYP/DP route should be recorded");
assert.equal(carmel.relationshipType, "same-school");
assert.equal(carmel.linkedSchoolName, "Carmel School Hong Kong · Elsa High School");
assert.equal(carmel.priority, 0);
assert.match(carmel.label, /同校系.*PYP.*Nursery–Grade 5.*MYP.*Grade 6–10.*DP.*Grade 11–12/u);
assert.match(carmel.note, /不同校區/u);
assert.match(carmel.note, /不代表無條件升中保證/u);
assert.match(carmel.note, /不等於保證日後修讀或獲頒完整\s*IBDP/u);
assert.ok(carmel.relatedSources.some((source) => source.sourceUrl.includes("CarmelSchoolAcademicProfile2025-26")));
assert.ok(carmel.relatedSources.some((source) => source.sourceUrl === "https://www.carmel.edu.hk/contact"));
assert.ok(carmel.relatedSources.some((source) => source.sourceUrl === "https://www.carmel.edu.hk/admissions"));

const malvern = pathways.schools.find((school) => school.schoolNo === 606766000123);
assert.ok(malvern, "Malvern College Hong Kong's same-school IB continuum should be recorded");
assert.equal(malvern.relationshipType, "same-school");
assert.equal(malvern.linkedSchoolName, "香港墨爾文國際學校");
assert.equal(malvern.priority, 0);
assert.match(malvern.label, /同校.*PYP.*Prep 1–6.*MYP.*Year 7–11.*DP.*Year 12–13/u);
assert.match(malvern.note, /不代表無條件升中保證/u);
assert.match(malvern.note, /不等於保證日後修讀或獲頒完整\s*IBDP/u);
assert.ok(malvern.relatedSources.some((source) => source.sourceUrl === "https://malverncollege.org.hk/prep/"));
assert.ok(malvern.relatedSources.some((source) => source.sourceUrl === "https://malverncollege.org.hk/senior/"));
assert.ok(malvern.relatedSources.some((source) => source.sourceUrl === "https://malverncollege.org.hk/sixth-form/"));
assert.ok(malvern.relatedSources.some((source) => source.sourceUrl === "https://malverncollege.org.hk/admissions-process/age-guidelines/"));
assert.ok(malvern.relatedSources.some((source) => source.sourceUrl === "https://internationalschools.edb.gov.hk/en/schools/30.html"));

const rchk = pathways.schools.find((school) => school.schoolNo === 567485000123);
assert.ok(rchk, "Renaissance College's same-school IB continuum and Year 6-to-7 placement evidence should be recorded");
assert.equal(rchk.relationshipType, "same-school");
assert.equal(rchk.linkedSchoolName, "英基啟新書院");
assert.equal(rchk.priority, 0, "RCHK's authorized PYP/MYP/DP/CP continuum and documented Year 7 place should be a direct pathway signal");
assert.match(rchk.label, /同校.*PYP.*Year 1–6.*MYP.*Year 7–11.*DP／CP.*Year 12–13.*Year 7.*保證/u);
assert.match(rchk.note, /Year 6.*Year 7.*保證/u, "the ESF guarantee should be shown with its exact year-group scope");
assert.match(rchk.note, /不代表無條件/u);
assert.match(rchk.note, /不等於保證日後修讀或獲頒完整\s*IBDP/u);
assert.match(rchk.note, /IBDP、IBCP.*不同高中課程/u, "Year 7 placement must not imply later DP or CP placement");
assert.ok(rchk.relatedSources.some((source) => source.sourceUrl === "https://www.esf.edu.hk/internal-transfer/"));
assert.equal(rchk.sourceUrl, "https://rchk.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview");
assert.ok(rchk.relatedSources.some((source) => source.sourceUrl === "https://internationalschools.edb.gov.hk/en/schools/91.html"));

const hka = pathways.schools.find((school) => school.schoolNo === 539155000323);
assert.ok(hka, "Hong Kong Academy's documented same-school PYP-to-secondary IB pathway should be recorded");
assert.equal(hka.relationshipType, "same-school");
assert.equal(hka.linkedSchoolName, "香港學堂");
assert.equal(hka.priority, 0, "HKA's PYP/MYP/DP continuum should rank as a direct IB pathway signal");
assert.match(hka.label, /同校.*PYP.*Grade 5.*MYP.*Grade 6–10.*DP.*Grade 11–12/u);
assert.match(hka.note, /Grade 11–12.*IB DP level.*High School level/u, "HKA's Grade 11–12 per-subject course options must remain explicit");
assert.match(hka.note, /不代表每名學生.*完整\s*IBDP|不等於保證.*完整\s*IBDP/u, "course availability must not imply that each student takes the full Diploma");
assert.match(hka.note, /HKA Diploma.*Global Citizen Diploma|HKA Diploma.*GCD/u, "HKA's own diplomas must remain distinct from the IB Diploma");
assert.match(hka.note, /不代表無條件升中保證/u);
assert.ok(hka.sourceUrl === "https://hkacademy.edu.hk/ib-curriculum/");
assert.ok(hka.relatedSources.some((source) => source.sourceUrl === "https://hkacademy.edu.hk/secondary-school/"));
assert.ok(hka.relatedSources.some((source) => source.sourceUrl === "https://hkacademy.edu.hk/pathways-to-graduation/"));
assert.ok(hka.relatedSources.some((source) => source.sourceUrl === "https://hkacademy.edu.hk/admissions/"));

const cdnis = pathways.schools.find((school) => school.schoolNo === 216011000523);
assert.ok(cdnis, "CDNIS's documented same-school IB continuum should be recorded");
assert.equal(cdnis.relationshipType, "same-school");
assert.equal(cdnis.linkedSchoolName, "香港加拿大国际学校");
assert.equal(cdnis.priority, 0, "CDNIS's verified PYP/MYP/DP continuum should rank as a direct IB pathway signal");
assert.match(cdnis.label, /同校.*PYP.*Grade 5.*MYP.*Grade 6–10.*DP.*Grade 11–12/u);
assert.match(cdnis.note, /OSSD.*Grade 9–12/u, "CDNIS's additional Ontario credential should retain its actual grade scope");
assert.match(cdnis.note, /不是DSE或A-Level/u, "OSSD must not be conflated with DSE or A-Level");
assert.match(cdnis.note, /不代表無條件升中保證/u);
assert.match(cdnis.note, /不等於保證日後修讀或獲頒完整\s*IBDP/u);
assert.match(cdnis.note, /評估/u, "admission assessment conditions must remain visible");
assert.equal(cdnis.sourceUrl, "https://www.cdnis.edu.hk/en/our-programmes/ib-programmes/");
assert.ok(cdnis.relatedSources.some((source) => source.sourceUrl === "https://www.cdnis.edu.hk/en/our-programmes/lower-school/"));
assert.ok(cdnis.relatedSources.some((source) => source.sourceUrl === "https://www.cdnis.edu.hk/en/our-programmes/upper-school/"));
assert.ok(cdnis.relatedSources.some((source) => source.sourceUrl === "https://www.cdnis.edu.hk/upload/page/15/self/CDNIS_Admissions_eng.pdf"));

const discovery = pathways.schools.find((school) => school.schoolNo === 569747000223);
assert.ok(discovery, "Discovery College's PYP-to-secondary IB continuum should be recorded");
assert.equal(discovery.relationshipType, "same-school");
assert.equal(discovery.linkedSchoolName, "愉景湾国际学校");
assert.equal(discovery.priority, 0, "Discovery College's verified PYP/MYP/DP/CP continuum should rank as a direct IB pathway signal");
assert.match(discovery.label, /PYP.*Y1–6.*MYP.*Y7–11.*DP／CP.*Y12–13/u);
assert.match(discovery.note, /不代表無條件升中保證/u);
assert.match(discovery.note, /不等於保證日後修讀完整IBDP/u, "individual Diploma Courses must not be presented as guaranteed full Diploma placement");
assert.match(discovery.note, /香港永久居民比例/u, "the ESF 70% resident-population constraint must stay visible");
assert.ok(discovery.relatedSources.some((source) => source.sourceUrl === "https://internationalschools.edb.gov.hk/en/schools/87.html"));
assert.ok(discovery.relatedSources.some((source) => source.sourceUrl === "https://discovery.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/PYP/"));
assert.ok(discovery.relatedSources.some((source) => source.sourceUrl === "https://discovery.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/MYP/"));
assert.ok(discovery.relatedSources.some((source) => source.sourceUrl === "https://discovery.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/DP_CP/"));

console.log(`Primary IB pathway evidence: ${pathways.schools.length} verified linked-school routes, official relationship + secondary IB evidence + conditional wording: OK`);
