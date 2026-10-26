/* Source extraction and filtering acceptance, including unsafe inference cases. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);

const { schoolsForStage } = require("../src/lib/school-directory-pilot.ts");
const { kindergartenDirectoryRows } = require("../src/lib/kindergarten-directory-data.ts");
const { emptyKgFilters, filterKindergartens, kgQuery, readKgFilters } = require("../src/lib/kindergarten-directory.ts");
const schools = schoolsForStage("kindergarten");
const rows = kindergartenDirectoryRows(schools);
const byId = (id) => rows.find((row) => row.number === id);
const checks = [];
function check(name, run) { run(); checks.push(name); }

check("958 unique schools, other stages retained", () => {
  assert.equal(rows.length, 958);
  assert.equal(new Set(rows.map((r) => r.slug)).size, 958);
  assert.equal(schoolsForStage("primary").length, 648);
  assert.equal(schoolsForStage("secondary").length, 587);
});
check("Canaan KLT annual fee is 5440, not free", () => {
  assert.match(byId("531910").fee.text, /5,440/);
  assert.equal(byId("531910").pn.value, "no");
});
check("Stcat Kowloon Tong does not inherit Hung Hom PN", () => {
  assert.equal(byId("215120").pn.value, "no");
  assert.match(byId("215120").pn.period, /2025年9月/);
  assert.match(byId("215120").fee.text, /80,234/);
  assert.deepEqual(byId("215120").language.values, ["英粵／英普班"]);
});
check("Full-day fee does not make MOS a full-day session", () => {
  assert.deepEqual(byId("520071").sessions.values, ["上午", "下午"]);
  assert.match(byId("520071").fee.detail, /沒有開辦全日班/);
});
check("Two period ratios do not turn a full-day nursery into half-day sessions", () => {
  assert.deepEqual(byId("563692").sessions.values, ["全日"]);
  assert.equal(byId("563692").pn.value, "yes");
});
check("Dated PN observations retain observation date", () => {
  assert.equal(byId("619850").pn.value, "yes");
  assert.match(byId("619850").pn.period, /2025年9月/);
  assert.match(byId("619850").fee.text, /117,370/);
});
check("Source-explicit negative PN is dated, not an inference from school names", () => {
  assert.equal(byId("324078").pn.value, "no");
  assert.match(byId("324078").pn.period, /2025年9月/);
});
check("Multicampus filters only use arrangements shared by every campus", () => {
  const evidence = require("../src/content/kindergarten-official-fields-2026-10-26.json").schools;
  for (const row of rows.filter((r) => r.multiCampus && r.number !== "215120")) {
    const campus = evidence[row.number].campuses;
    if (row.sessions.values.length) for (const c of campus) assert.deepEqual(row.sessions.values, c.sessions.values);
    if (row.language.values.length) for (const c of campus) assert.deepEqual(row.language.values, c.language?.values);
    if (row.pn.value !== "unknown") for (const c of campus) assert.equal(row.pn.value, c.pn?.value);
  }
});
check("Unrelated school source and ratios/fee alone cannot define PN/sessions", () => {
  const input = { ...schools[0], schoolNumber: "999998", registryLocations: 1, gradeSpan: "K1–K3", tuition: "2026/27全日班全年30,000元", language: undefined,
    sources: [], detailSections: [{ title: "核對", details: [
      { label: "PN／2至3歲服務", value: "2025年9月提供2至3歲服務", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1234560001" },
      { label: "分時段師生比例", value: "上午1:8；下午1:8", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=9999980001" },
    ] }] };
  const row = kindergartenDirectoryRows([input])[0];
  assert.equal(row.pn.value, "unknown");
  assert.deepEqual(row.sessions.values, []);
});
check("Same family of filters composes with district union and other intersections", () => {
  const filters = { ...emptyKgFilters(), districts: ["九龍城區", "沙田區"], nature: "非牟利", pn: "yes" };
  check("Language activities and future primary-medium advice are not a kindergarten medium", () => {
  assert.deepEqual(byId("519812").language.values, []);
  assert.deepEqual(byId("534790").language.values, []);
  assert.deepEqual(byId("138177").language.values, []); // Chinese is not automatically Cantonese.
  assert.match(byId("138177").language.text, /粵普未分/);
  assert.deepEqual(byId("542199").language.values, ["粵語"]);
  assert.deepEqual(byId("564770").language.values, ["英語"]);
});
check("New Quarry Bay fee belongs to 630640, not a sibling campus", () => {
  assert.match(byId("630640").fee.detail, /63,600/);
  assert.match(byId("630640").fee.detail, /100,440/);
  assert.match(byId("630640").fee.period, /2026-09-17/);
  assert.match(byId("630640").fee.sourceUrl, /630640\.pdf$/);
});
check("All new facts carry dated sources and profile/directory agree", () => {
  const evidence = require("../src/content/kindergarten-official-fields-2026-10-26.json").schools;
  for (const row of rows) {
    const record = evidence[row.number];
    assert.ok(record);
    for (const key of ["sessions", "language", "fee"]) if (record[key]) {
      assert.ok(record[key].sourceUrl.startsWith("https://") || record[key].sourceUrl.startsWith("http://"));
      assert.ok(record[key].period);
      assert.equal(row[key].text, record[key].text);
    }
    if (record.fee) assert.ok(schools.find((s) => s.slug === row.slug).tuition.includes(row.fee.text));
  }
});
check("Fee ranges preserve their different instalment counts", () => {
  assert.match(byId("526100").fee.text, /50,000.*83,556/);
  assert.match(byId("526100").fee.detail, /50,000 \(10\).*83,556 \(12\)/);
});
check("Blank cells do not shift Stcat grade fees", () => {
  const record = require("../src/content/kindergarten-official-fields-2026-10-26.json").schools["215120"];
  const am = record.campuses.find((c) => c.campus === "2151200001").fee.rows.find((r) => r.session === "上午班");
  assert.equal(am.K2, "-");
  assert.equal(am.K3, "$87,241 (11)");
});
check("New fee certificates replace pending overview amounts only in their scope", () => {
  for (const number of ["604445", "616290"]) {
    assert.match(byId(number).fee.text, /76,780/);
    assert.match(byId(number).fee.sourceUrl, new RegExp(number + "\\.pdf$"));
    assert.match(byId(number).language.detail, /普通話或廣東話/);
  }
});
check("Calendar-year and preparatory fees are not recast as HK K1-K3", () => {
  assert.match(byId("216275").fee.period, /2026年度/);
  assert.match(byId("216275").fee.detail, /Reception.*156,200/);
  assert.match(byId("215406").fee.text, /Reception/);
});
check("Unverified or pending fees are not converted to free", () => {
  const evidence = require("../src/content/kindergarten-official-fields-2026-10-26.json").schools;
  for (const [number, record] of Object.entries(evidence)) if (["unresolved", "pending", "not-published"].includes(record.fee?.status)) {
    assert.deepEqual(record.fee.annualAmounts, []);
    assert.doesNotMatch(byId(number).fee.text, /免費|\$0/);
  }
});
const result = filterKindergartens(rows, filters, "");
  assert.ok(result.length > 0);
  for (const row of result) {
    assert.ok(row.districts.some((d) => filters.districts.includes(d)));
    assert.ok(row.nature.includes("非牟利"));
    assert.equal(row.pn.value, "yes");
  }
});
check("Shared URLs preserve repeated district values and page", () => {
  const filters = { ...emptyKgFilters(), q: "迦南", districts: ["九龍城區", "沙田區"], pn: "unknown", report: true, sort: "district", page: 2 };
  assert.deepEqual(readKgFilters(kgQuery(filters)), filters);
  assert.equal(readKgFilters("?resultPage=-1").page, 1);
});
check("Name sorting stable across locales", () => {
  const sc = kindergartenDirectoryRows(schoolsForStage("kindergarten", "tc"));
  assert.deepEqual(rows.map((r) => r.slug), sc.map((r) => r.slug));
});
const result = { checkedAt: "2026-10-26", checks, passed: checks.length, schools: rows.length,
  fieldPresence: { sessions: rows.filter((r) => r.sessions.values.length).length, pnYes: rows.filter((r) => r.pn.value === "yes").length, pnNo: rows.filter((r) => r.pn.value === "no").length, language: rows.filter((r) => r.language.values.length).length },
  limitation: "These counts describe source-scoped extracted records, not a new independent verification of all schools or current vacancies." };
if (process.argv.includes("--write")) fs.writeFileSync(path.join(root, "docs/research/kindergarten-directory-data-acceptance-2026-10-26.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
