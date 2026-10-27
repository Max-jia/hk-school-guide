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

const { schoolProfileSummary } = load("../src/lib/school-profile-summary.ts");
const { DIRECTORY_SCHOOLS } = load("../src/lib/school-directory-pilot.ts");
const { L } = load("../src/lib/i18n.ts");
const snapshot = JSON.stringify(DIRECTORY_SCHOOLS);
const fixture = { stage: "primary", slug: "boundary-fixture", name: "測試學校", nameEn: "", district: "九龍城區", schoolType: "資助小學", gradeSpan: "小一至小六", address: "測試地址", website: "", dataYear: "2026", sourceNote: "", sources: [] };
const check = (name, fn) => { fn(); console.log(`PASS ${name}`); };

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
