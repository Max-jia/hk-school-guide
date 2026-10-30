/* Check factual boundaries rather than prescribing one sentence template. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const load = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, parent, ...rest);
};
Module._extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);

const { registeredPhone, schoolProfileSummary } = load("../src/lib/school-profile-summary.ts");
const { DIRECTORY_SCHOOLS } = load("../src/lib/school-directory-pilot.ts");
const { L } = load("../src/lib/i18n.ts");
const snapshot = JSON.stringify(DIRECTORY_SCHOOLS);
const fixture = { stage: "primary", slug: "boundary-fixture", name: "測試學校", nameEn: "", district: "九龍城區", schoolType: "資助小學", gradeSpan: "小一至小六", address: "測試地址", website: "", dataYear: "2026", sourceNote: "", sources: [] };
const check = (name, fn) => { fn(); console.log(`PASS ${name}`); };
check("special primary schools do not inherit ordinary school nets", () => {
  const special = DIRECTORY_SCHOOLS.filter((school) => school.stage === "primary" && school.schoolType === "資助特殊學校");
  assert.ok(special.length > 0);
  for (const school of special) {
    assert.equal(school.schoolNet, undefined, school.name);
    assert.notEqual(school.tuition, "免费（政府资助）", school.name);
    assert.ok(!(school.detailSections || []).some((section) => section.title.startsWith("小學概覽｜")), school.name);
    const details = (school.detailSections || []).flatMap((section) => section.details);
    assert.ok(!details.some((detail) => detail.label === "小一校網與班制" && /\d+\s*校[網网]/.test(detail.value)), school.name);
  }
});
check("primary relationship labels match the recorded relationship", () => {
  for (const school of DIRECTORY_SCHOOLS.filter((item) => item.stage === "primary")) {
    for (const detail of (school.detailSections || []).flatMap((section) => section.details)) {
      assert.ok(!(detail.label === "直屬中學" && /^(联系|聯繫|一条龙|一條龍)/.test(detail.value)), school.name);
    }
  }
});
check("generic overview transport fields do not infer no school bus", () => {
  for (const school of DIRECTORY_SCHOOLS.filter((item) => item.stage === "primary")) {
    for (const detail of (school.detailSections || []).flatMap((section) => section.details)) {
      if (detail.label === "學費與校車" && /chsc\.hk\/psp2026\/?$/.test(detail.sourceUrl || "")) {
        assert.doesNotMatch(detail.value, /校車[：:]無/, school.name);
      }
    }
  }
});
check("reviewed school facts retain their school and evidence boundaries", () => {
  const school = (stage, number) => DIRECTORY_SCHOOLS.find((item) => item.stage === stage && item.schoolNumber === number);
  assert.match(school("secondary", "630381").gradeSpan, /待核實/);
  assert.match(school("primary", "154105").gradeSpan, /小二至小六/);
  assert.match(school("primary", "250210").gradeSpan, /小五及小六/);
  assert.match(schoolProfileSummary(school("primary", "250210")), /服務類別：群育學校/);
  assert.match(school("secondary", "250384").curriculumType, /嚴重智障/);
  assert.match(schoolProfileSummary(school("secondary", "313343")), /服務類別：嚴重智障兒童特殊學校/);
  assert.match(schoolProfileSummary(school("primary", "260290")), /服務類別：聽障兒童特殊學校/);
  assert.match(school("secondary", "516961").language, /數學、科學等以中文/);
  assert.match(school("secondary", "560480").language, /非華語學生/);
  assert.match(school("primary", "543292").tuition, /35,310/);
  assert.match(school("primary", "511927").tuition, /3,000/);
  assert.match(school("primary", "575399").tuition, /64,200/);
  assert.match(school("primary", "579319").tuition, /45,800/);
  assert.equal(school("primary", "511722").reportSlug, undefined);
  assert.ok(!school("primary", "511722").relatedReportSlugs.includes("dbs"));
  assert.ok(!school("primary", "511722").sources.some((source) => source.url.includes("sch_id=78")));
  assert.equal(school("primary", "510777").reportSlug, "dbs");
  assert.match(school("primary", "510777").tuition, /60,630/);
  assert.ok(!(school("primary", "511927").detailSections || []).flatMap((section) => section.details).some((detail) => detail.label === "直屬中學"));
  assert.match(school("secondary", "557528").gradeSpan, /成人教育中心.*待核實/);
  assert.equal(school("secondary", "557528").tuition, undefined);
  assert.match(school("secondary", "170690").language, /部分初中學生.*中文/);
  assert.match(school("secondary", "190837").languageSourceUrl, /ssp2025\/sch_detail\.php.*sch_id=393/);
  assert.match(school("secondary", "132918").language, /英語延展/);
  assert.match(school("secondary", "112526").curriculumType, /輕度智障/);
  assert.match(school("secondary", "608491").curriculumType, /群育/);
  assert.match(school("secondary", "615471").curriculumType, /輕、中及嚴重/);
  assert.match(school("secondary", "514128").language, /中史以外/);
  assert.match(school("secondary", "524867").gradeSpan, /待核實/);
  assert.match(school("primary", "543314").gradeSpan, /五年小學/);
  assert.match(school("primary", "543314").schoolNet, /不參加/);
  assert.match(school("secondary", "578789").gradeSpan, /Year 7–13/);
  assert.match(school("secondary", "230030").language, /中文班及英語/);
  assert.match(school("primary", "250333").curriculumType, /肢體傷殘/);
  assert.match(schoolProfileSummary(school("secondary", "519162")), /實地考察中心.*多個登記校址/);
  assert.match(schoolProfileSummary(school("secondary", "510220")), /2025\/26.*中一及中二無開班.*2026年9月/);
  assert.match(schoolProfileSummary(school("primary", "511676")), /2025\/26.*停收小一.*2026年8月31日.*停辦/);
  assert.equal(school("primary", "511676").schoolNet, undefined);
  assert.doesNotMatch(school("secondary", "510220").gradeSpan, /^中一至中六/);
  assert.match(schoolProfileSummary(school("secondary", "270040")), /2025\/26.*中六.*預計.*停辦.*核實/);
  assert.doesNotMatch(school("secondary", "270040").gradeSpan, /^中一至中六/);
  assert.match(schoolProfileSummary(school("primary", "260215")), /住院.*轉介.*教學/);
  assert.doesNotMatch(school("secondary", "519162").gradeSpan, /^中一至中六/);

});

check("unconfirmed preview text is not promoted to a factual search description", () => {
  const result = schoolProfileSummary({ ...fixture, schoolType: "類別待核實", language: "主要語言待核實；詳細安排及證據見下方", schoolNet: "待確認" });
  assert.doesNotMatch(result, /待核實|待確認|見下方|詳細安排/);
});
check("a long language policy is not cut before a later exception", () => {
  const result = schoolProfileSummary({ ...fixture, stage: "secondary", schoolType: "資助中學", language: "英文課以英語授課。".repeat(12) + "其他科目並非全部使用英語。", languageSourceUrl: "https://www.chsc.hk/ssp2025/example" });
  assert.doesNotMatch(result, /英文課以英語授課/);
  assert.match(result, /教學語言政策/);
});
check("multiple campuses retain their limitation and do not share a campus net or language", () => {
  const result = schoolProfileSummary({ ...fixture, registryLocations: 2, schoolNet: "41", language: "英語", tuition: "2026/27全年HK$50,000" });
  assert.match(result, /多個登記校址/);
  assert.match(result, /資料年度/);
  assert.doesNotMatch(result, /校網：41|教學語言：英語|50,000/);
});
check("a monthly fee is never multiplied or represented as annual", () => {
  const result = schoolProfileSummary({ ...fixture, stage: "kindergarten", schoolNumber: "999999", schoolType: "私立獨立", tuition: "2026/27每月HK$7,000，未列期數" });
  assert.doesNotMatch(result, /7,000|84,000|全年學費/);
});
check("register sessions retain the observation date and are not called available places", () => {
  const result = schoolProfileSummary({ ...fixture, detailSections: [{ title: "登記", details: [{ label: "校址", value: "某校址；授課時間：全日", period: "註冊資料截至2026-10-23", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/test.xml" }] }] });
  assert.match(result, /登記班制：全日（2026-10-23）/);
  assert.doesNotMatch(result, /有位|招生名額|延長照顧/);
});
check("a non-EDB URL cannot establish an EDB registration statement", () => {
  const result = schoolProfileSummary({ ...fixture, detailSections: [{ title: "資料", details: [{ label: "校址", value: "授課時間：全日", period: "2026-10-23", sourceUrl: "https://example.com/?source=applications.edb.gov.hk" }] }] });
  assert.doesNotMatch(result, /登記班制/);
});
check("registration phone requires a dated EDB record and a single campus", () => {
  const detail = { label: "校址", value: "地址；電話 23456789；授課時間：全日", period: "註冊資料截至2026-10-23", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/test.xml" };
  const school = { ...fixture, registryLocations: 1, detailSections: [{ title: "登記", details: [detail] }] };
  assert.deepEqual(registeredPhone(school), { value: "23456789", date: "2026-10-23", sourceUrl: detail.sourceUrl });
  assert.match(schoolProfileSummary(school), /電話：23456789（登記資料截至2026-10-23）/);
  assert.equal(registeredPhone({ ...school, registryLocations: 2 }), undefined);
  assert.match(schoolProfileSummary({ ...school, telephone: "2345 6789" }), /電話：23456789（登記資料截至2026-10-23）/);
  assert.doesNotMatch(schoolProfileSummary({ ...school, telephone: "2345 6780" }), /23456789/);
  assert.equal(registeredPhone({ ...school, detailSections: [{ title: "登記", details: [{ ...detail, period: undefined }] }] }), undefined);
  assert.equal(registeredPhone({ ...school, detailSections: [{ title: "登記", details: [{ ...detail, sourceUrl: "https://example.com/" }] }] }), undefined);
});
check("short secondary language statements remain labelled as policy", () => {
  const result = schoolProfileSummary({ ...fixture, stage: "secondary", language: "推行英語日活動" });
  assert.match(result, /語言安排與政策：推行英語日活動/);
  assert.doesNotMatch(result, /教學語言：推行/);
});
check("Chinese-medium evidence does not silently become Cantonese-medium", () => {
  const school = DIRECTORY_SCHOOLS.find((s) => s.stage === "kindergarten" && s.schoolNumber === "138177");
  assert.ok(school);
  const result = schoolProfileSummary(school);
  assert.doesNotMatch(result, /粵語授課|粵語為主/);
});
check("subsidised zero annual fees keep the year, basis and class scope", () => {
  const school = DIRECTORY_SCHOOLS.find((s) => s.stage === "kindergarten" && (s.registryLocations || 1) === 1 && /\$0／年（2026\/27學年・扣資助後）/.test(s.tuition || ""));
  assert.ok(school);
  const result = schoolProfileSummary(school);
  assert.match(result, /全年學費：\$0／年/);
  assert.match(result, /2026\/27學年・扣資助後；按年級及班別/);
  assert.doesNotMatch(result, /完全免費|所有費用免費/);
});
check("a certificate intake year and subsidy basis are not lost", () => {
  const school = DIRECTORY_SCHOOLS.find((s) => s.stage === "kindergarten" && s.schoolNumber === "531910");
  const result = schoolProfileSummary(school);
  assert.match(result, /5,440／年/);
  assert.match(result, /2026\/27・2026-09-01生效；扣資助後/);
});
check("a fee table which cannot be matched to registered classes is not presented as a family price", () => {
  const school = DIRECTORY_SCHOOLS.find((s) => s.stage === "kindergarten" && s.schoolNumber === "577987");
  assert.doesNotMatch(schoolProfileSummary(school), /全年學費|8,382/);
});

const rows = DIRECTORY_SCHOOLS.map((school) => ({ stage: school.stage, slug: school.slug, summary: schoolProfileSummary(school), simplifiedSummary: L(schoolProfileSummary(school), "sc") }));
check("all 2,193 profiles have complete, locale-safe summaries without preview placeholders", () => {
  assert.equal(rows.length, 2193);
  for (const row of rows) {
    assert.ok(row.summary.endsWith("。"), row.slug);
    assert.doesNotMatch(row.summary, /待(?:核實|確認)|見下[方表]|詳細安排及證據|主要語言待/, row.slug);
    assert.doesNotMatch(row.simplifiedSummary, /待(?:核实|确认)|见下[方表]|详细安排及证据|主要语言待/, row.slug);
    if (row.summary.includes("全年學費")) assert.match(row.summary, /\d{4}\/\d{2}/, row.slug);
  }
  assert.equal(JSON.stringify(DIRECTORY_SCHOOLS), snapshot, "Summary generation changed original profile fields");
});
const arg = process.argv.indexOf("--output");
if (arg >= 0) fs.writeFileSync(process.argv[arg + 1], JSON.stringify({ checked: rows.length, errors: [], rows }, null, 2) + "\n");
console.log(`Profile summary boundaries: ${rows.length} profiles checked.`);
