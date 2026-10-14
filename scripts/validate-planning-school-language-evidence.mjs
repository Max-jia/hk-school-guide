import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [schoolsJson, ibEvidenceJson, languageEvidenceJson] = await Promise.all([
  readFile(new URL("../src/content/schools.json", import.meta.url), "utf8"),
  readFile(new URL("../src/content/primary-school-ib-evidence.json", import.meta.url), "utf8"),
  readFile(new URL("../src/content/primary-school-language-evidence.json", import.meta.url), "utf8"),
]);
const primarySchools = JSON.parse(schoolsJson);
const ibEvidence = JSON.parse(ibEvidenceJson);
const languageEvidence = JSON.parse(languageEvidenceJson);
const directoryBySchoolNo = new Map(primarySchools.map((school) => [String(school.school_no), school]));
const languageBySchoolNo = new Map(languageEvidence.schools.map((school) => [String(school.schoolNo), school]));
const pypSchoolNos = ibEvidence.schools.map((school) => String(school.schoolNo));
const officialHostPattern = /(^|\.)(edb\.gov\.hk|ibo\.org|esf\.edu\.hk|creativeprisch\.edu\.hk|cdnis\.edu\.hk|hkacademy\.edu\.hk|vsa\.edu\.hk|luac\.edu\.hk|plkis\.edu\.hk|montessori-ami\.edu\.hk|jis\.edu\.hk|ykpaoschool\.hk|cis\.edu\.hk|sscps\.edu\.hk|academy\.isf\.edu\.hk|nordangliaeducation\.com|aishk\.edu\.hk|ycis-hk\.com|singapore\.edu\.hk|fis\.edu\.hk)$/i;

assert.ok(languageEvidence.metadata.checked, "primary language evidence must record a verification date");
assert.ok(languageEvidence.metadata.note.includes("not every language taught as a subject"), "language scope must distinguish a medium of instruction from a language subject");
assert.equal(languageEvidence.schools.length, 33, "all 24 PYP or planned-PYP records plus nine additional sourced primary language records should be covered");
assert.equal(languageBySchoolNo.size, languageEvidence.schools.length, "language evidence must map to unique primary directory records");
assert.ok(pypSchoolNos.every((schoolNo) => languageBySchoolNo.has(schoolNo)), "the language overlay must cover every PYP or planned-PYP primary record");
assert.equal(ibEvidence.schools.some((school) => String(school.schoolNo) === "215589000123"), false, "CIS should not be mislabeled as a primary PYP school");
assert.equal(ibEvidence.schools.some((school) => String(school.schoolNo) === "598356000223"), false, "NAIS's English National Curriculum should not be mislabeled as a primary PYP school");
assert.equal(ibEvidence.schools.some((school) => String(school.schoolNo) === "216275000623"), false, "AISHK's ACARA primary curriculum should not be mislabeled as a primary PYP school");
assert.equal(ibEvidence.schools.some((school) => String(school.schoolNo) === "325147000223"), false, "YCIS English/Putonghua primary curriculum should not be mislabeled as a primary PYP school");
assert.equal(ibEvidence.schools.some((school) => String(school.schoolNo) === "216003000223"), false, "SISHK Singapore-curriculum primary should not be mislabeled as a primary PYP school");

const ichkHlyLanguage = languageEvidence.schools.find((school) => school.schoolNo === 230979000123);
assert.ok(ichkHlyLanguage, "ICHK HLY's primary language evidence should be checked independently from its partner secondary school");
assert.deepEqual(ichkHlyLanguage.mediums, ["english"]);
assert.equal(ichkHlyLanguage.checkedOn, "2026-10-12");
assert.match(ichkHlyLanguage.note, /只描述小學/u);

const carmelLanguage = languageEvidence.schools.find((school) => school.schoolNo === 216186000323);
assert.ok(carmelLanguage, "Carmel primary language facts should stay scoped to its Borrett Road campus");
assert.deepEqual(carmelLanguage.mediums, ["english"]);
assert.equal(carmelLanguage.checkedOn, "2026-10-12");
assert.match(carmelLanguage.note, /只描述小學/u);

const malvernLanguage = languageEvidence.schools.find((school) => school.schoolNo === 606766000123);
assert.ok(malvernLanguage, "Malvern primary language of instruction should remain scoped to its EDB-listed primary stage");
assert.deepEqual(malvernLanguage.mediums, ["english"]);
assert.equal(malvernLanguage.checkedOn, "2026-10-12");
assert.match(malvernLanguage.note, /只描述小學階段/u);

for (const school of languageEvidence.schools) {
  const schoolNo = String(school.schoolNo);
  assert.ok(directoryBySchoolNo.has(schoolNo), `schoolNo ${schoolNo} must map to the primary directory`);
  assert.ok(school.sourceLabel?.trim(), `${schoolNo} needs a named source`);
  assert.ok(school.displayLabel?.trim(), `${schoolNo} needs a user-readable language description`);
  assert.ok(Array.isArray(school.mediums) && school.mediums.length >= 1 && school.mediums.length <= 2, `${schoolNo} needs one or two explicitly verified media`);
  assert.equal(new Set(school.mediums).size, school.mediums.length, `${schoolNo} must not repeat a medium`);
  for (const medium of school.mediums) assert.ok(["chinese", "english"].includes(medium), `${schoolNo} has unsupported medium ${medium}`);

  const sources = [school, ...(school.relatedSources ?? [])];
  for (const source of sources) {
    assert.ok(source.sourceLabel?.trim(), `${schoolNo} related source needs a label`);
    const url = new URL(source.sourceUrl);
    assert.equal(url.protocol, "https:", `${schoolNo} source must use HTTPS`);
    assert.ok(officialHostPattern.test(url.hostname), `${schoolNo} source must be an official EDB, IB, ESF, or school domain: ${url.hostname}`);
  }
}

for (const schoolNo of [
  170348000123, 170747000123, 170860000123, 170879000123, 170887000123,
  170895000123, 170909000123, 171034000123, 190543000123, 567485000123,
]) {
  assert.deepEqual(languageBySchoolNo.get(String(schoolNo)).mediums, ["english"], `ESF primary ${schoolNo} should use its declared English medium`);
}

assert.deepEqual(languageBySchoolNo.get("325279000123").mediums, ["chinese", "english"], "Creative Primary's two stated teaching languages should match Chinese, English, and bilingual filters, with the caveat displayed");
assert.deepEqual(languageBySchoolNo.get("216011000523").mediums, ["chinese", "english"], "CDNIS primary medium entry should retain its grade-specific bilingual caveat");
assert.ok(languageBySchoolNo.get("216011000523").note.includes("2026/27") && languageBySchoolNo.get("216011000523").note.includes("兩個官方頁面") && languageBySchoolNo.get("216011000523").note.includes("Grade 1"), "CDNIS language evidence must state the checked school-year scope and disclose the official-page grade-scope discrepancy");
assert.deepEqual(languageBySchoolNo.get("541915000123").mediums, ["chinese", "english"], "Kingston should be classified as bilingual based on its primary medium evidence");
assert.deepEqual(languageBySchoolNo.get("560138000223").mediums, ["chinese", "english"], "VSA should be classified as bilingual based on its primary medium evidence");
assert.deepEqual(languageBySchoolNo.get("598356000223").mediums, ["english"], "NAIS primary should use the EDB-listed English medium without treating its other languages as teaching media");
assert.match(languageBySchoolNo.get("598356000223").note, /中文、法文、西班牙文列作其他(?:語|语)言/u, "NAIS language subjects must not be misreported as teaching media");
assert.deepEqual(languageBySchoolNo.get("216275000623").mediums, ["english"], "AISHK primary should use only the EDB-listed English medium");
assert.match(languageBySchoolNo.get("216275000623").note, /不据此推定中学各科授课语言/u, "AISHK primary language must not be generalized to secondary subject language");
assert.deepEqual(languageBySchoolNo.get("325147000223").mediums, ["english", "chinese"], "YCIS primary should map its EDB-listed English and Putonghua media");
assert.match(languageBySchoolNo.get("325147000223").note, /普通话/u, "YCIS's Chinese-language filter must be understood specifically as Putonghua, not Cantonese");
const vsaLanguage = languageBySchoolNo.get("560138000223");
assert.deepEqual(vsaLanguage.mediums, ["chinese", "english"], "VSA primary should retain EDB-listed English and Putonghua media");
assert.equal(vsaLanguage.checkedOn, "2026-10-12");
assert.match(vsaLanguage.note, /小學.*英文.*普通話.*中學/u);
assert.ok(vsaLanguage.relatedSources.some((source) => source.sourceUrl === "https://www.vsa.edu.hk/"));

const rchkLanguage = languageBySchoolNo.get("567485000123");
assert.deepEqual(rchkLanguage.mediums, ["english"], "RCHK primary should be classified using its EDB-listed English medium");
assert.match(rchkLanguage.note, /只用於小學候選篩選，不推定中學各科授課媒介/u);
assert.equal(rchkLanguage.checkedOn, "2026-10-12");

const hkaLanguage = languageBySchoolNo.get("539155000323");
assert.deepEqual(hkaLanguage.mediums, ["english"], "HKA primary English MOI should stay separate from the unknown secondary subject medium");
assert.match(hkaLanguage.note, /HKA小學網頁確認英語為授課語言，普通話為附加語言/u);
assert.match(hkaLanguage.note, /不能推定中學各科授課語言/u);
assert.equal(hkaLanguage.checkedOn, "2026-10-12");
assert.ok(hkaLanguage.relatedSources.some((source) => source.sourceUrl === "https://hkacademy.edu.hk/primary-school/"));

const discoveryLanguage = languageBySchoolNo.get("569747000223");
assert.deepEqual(discoveryLanguage.mediums, ["english"], "Discovery College's Year 1–13 English-medium statement should map to English only");
assert.match(discoveryLanguage.displayLabel, /Year 1–13.*英語.*主要授課媒介/u);
assert.match(discoveryLanguage.note, /全部科目.*英語/u, "Discovery's English-medium scope must explicitly cover all subjects across Years 1–13");
assert.match(discoveryLanguage.note, /Chinese Language Acquisition.*Chinese Language and Literature/u, "Chinese language courses must not be misclassified as Chinese medium");
assert.equal(discoveryLanguage.checkedOn, "2026-10-12");
assert.ok(discoveryLanguage.relatedSources.some((source) => source.sourceUrl === "https://discovery.esf.edu.hk/en/outstanding_education/language/"));

assert.deepEqual(languageBySchoolNo.get("216003000223").mediums, ["english", "chinese"], "SISHK primary should map its EDB-listed English and Putonghua media");
assert.match(languageBySchoolNo.get("216003000223").note, /普通话/u, "SISHK Chinese-language mapping should be understood as Putonghua");
for (const schoolNo of ["214949000523", "214949000723"]) {
  assert.deepEqual(languageBySchoolNo.get(schoolNo).mediums, ["english"], `FIS International Stream ${schoolNo} should use its verified English medium`);
  assert.match(languageBySchoolNo.get(schoolNo).note, /仅覆盖International Stream|仅覆盖International Stream/u, `FIS ${schoolNo} must not generalize English medium to the French Stream`);
}
assert.match(languageBySchoolNo.get("522775000123").displayLabel, /International Section/u, "JIS language evidence must name the section it applies to");
assert.match(languageBySchoolNo.get("522775000123").note, /Japanese Section/u, "JIS language evidence must distinguish the Japanese Section");
assert.equal(languageBySchoolNo.get("522775000123").checkedOn, "2026-10-11", "JIS section and language data should show its current row-specific check date");

assert.deepEqual(languageBySchoolNo.get("600814000123").mediums, ["chinese", "english"], "DMA's explicitly bilingual primary language curriculum should map to both language filters");
assert.match(languageBySchoolNo.get("600814000123").note, /不標示普通話或粵語|不标示普通话或粤语/u, "DMA's Chinese variant must not be inferred");
assert.deepEqual(languageBySchoolNo.get("579530000123").mediums, ["english"], "Lutheran Academy Chinese subject instruction should not imply bilingual whole-school medium");
assert.deepEqual(languageBySchoolNo.get("607290000123").mediums, ["english"], "HKCA Chinese subject instruction should not imply bilingual whole-school medium");
assert.match(languageBySchoolNo.get("579530000123").note, /不據此把學校標為中英雙語|不据此把学校标为中英双语/u, "Lutheran Academy language-medium boundary should be explicit");
assert.match(languageBySchoolNo.get("607290000123").note, /不據此把學校標為中英雙語|不据此把学校标为中英双语/u, "HKCA language-medium boundary should be explicit");
assert.deepEqual(languageBySchoolNo.get("629685000123").mediums, ["chinese", "english"], "YK Pao's school-described bilingual environment should map to both language filters");
assert.match(languageBySchoolNo.get("629685000123").note, /不代表每科|不代表每科/u, "YK Pao bilingual evidence must not overclaim subject-by-subject language proportions");
assert.equal(languageBySchoolNo.get("629685000123").checkedOn, "2026-10-11", "YK Pao bilingual evidence must have a row-level verification date");
assert.deepEqual(languageBySchoolNo.get("215589000123").mediums, ["chinese", "english"], "CIS's primary bilingual curriculum should map to both language filters");
assert.match(languageBySchoolNo.get("215589000123").note, /小學階段不是 IB PYP/u, "CIS language evidence must not imply a primary PYP programme");
assert.match(languageBySchoolNo.get("215589000123").note, /Year 10–11/u, "CIS route note must preserve the non-IB years between MYP and DP");
assert.equal(languageBySchoolNo.get("215589000123").checkedOn, "2026-10-11", "CIS language evidence must have a row-level verification date");
assert.deepEqual(languageBySchoolNo.get("517372000123").mediums, ["english"], "St Stephen's primary English-medium subjects should remain separate from Chinese/Putonghua subject teaching");
assert.match(languageBySchoolNo.get("517372000123").note, /不是全校中英雙語|不把個別中文科.*擴大/u, "St Stephen's language evidence must not imply a whole-school bilingual medium");
assert.equal(languageBySchoolNo.get("517372000123").checkedOn, "2026-10-11", "St Stephen's language evidence must have a row-level verification date");
assert.deepEqual(languageBySchoolNo.get("553190000323").mediums, ["chinese", "english"], "ISF's official primary programme should remain filterable as bilingual");
assert.match(languageBySchoolNo.get("553190000323").note, /小學課程.*雙語沉浸式.*不推定各科語言比例/u, "ISF's bilingual-primary claim must not imply equal or fixed subject-language ratios");
assert.equal(languageBySchoolNo.get("553190000323").checkedOn, "2026-10-12", "ISF's language evidence must record the current check date");

console.log(`Primary language evidence: ${languageEvidence.schools.length} mapped records (${pypSchoolNos.length} PYP/planned-PYP plus linked IB-route primaries), ${languageEvidence.schools.filter((school) => school.mediums.length === 2).length} classified as bilingual, all records have official sources: OK`);
