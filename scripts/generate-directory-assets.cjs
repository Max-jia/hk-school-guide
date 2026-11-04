/* eslint-disable @typescript-eslint/no-require-imports -- Node-only build tool uses a CommonJS TypeScript loader for existing server data modules. */
// Run before dev/build. Reuse the exact server row builders without another runtime dependency.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const Module = require("node:module");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, parent, ...rest);
};
require.extensions[".ts"] = (module, filename) => {
  const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  module._compile(code, filename);
};
const { stageDirectoryRows, kgDirectoryRows } = require("../src/lib/school-directory-rows.ts");
const publicDir = path.join(root, "public/directory-data");
fs.mkdirSync(publicDir, { recursive: true });
const manifest = {};
const unique = (values, locale = "zh-Hant") => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, locale));
for (const key of ["kindergarten", "primary-tc", "primary-sc", "secondary-tc", "secondary-sc"]) {
  const [stage, locale] = key.split("-");
  const rows = stage === "kindergarten" ? kgDirectoryRows() : stageDirectoryRows(stage, locale);
  const json = JSON.stringify(rows);
  const hash = crypto.createHash("sha256").update(json).digest("hex").slice(0, 16);
  const file = `${key}.${hash}.json`;
  fs.writeFileSync(path.join(publicDir, file), json);
  const display = value => value?.trim() || "資料未列";
  const options = stage === "kindergarten" ? { districts: unique(rows.flatMap(s => s.districts)) } : {
    districts: [...new Set(rows.flatMap(s => s.districts.length ? s.districts : [s.district]).filter(Boolean))].sort((a, b) => require("../src/lib/i18n.ts").L(a, "sc").localeCompare(require("../src/lib/i18n.ts").L(b, "sc"), "zh-Hans")),
    categories: unique(rows.flatMap(s => s.categories)), genders: unique(rows.map(s => display(s.gender))),
    religions: unique(rows.map(s => display(s.religion))), schoolNets: unique(rows.map(s => display(s.schoolNet))),
  };
  manifest[key] = { url: `/directory-data/${file}`, total: rows.length, options };
}
const generated = path.join(root, "src/content/generated");
fs.mkdirSync(generated, { recursive: true });
fs.writeFileSync(path.join(generated, "directory-assets.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Generated ${Object.keys(manifest).length} versioned static directory datasets`);
