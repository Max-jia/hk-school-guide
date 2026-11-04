/* eslint-disable @typescript-eslint/no-require-imports -- Node-only build tool uses a CommonJS TypeScript loader for existing server data modules. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const crypto = require("node:crypto");
const path = require("node:path");
require("./generate-directory-assets.cjs");
const root = path.resolve(__dirname, "..");
const manifest = require("../src/content/generated/directory-assets.json");
const { kgDirectoryRows, stageDirectoryRows } = require("../src/lib/school-directory-rows.ts");
const { emptyKgFilters, filterKindergartens } = require("../src/lib/kindergarten-directory.ts");
for (const [key, asset] of Object.entries(manifest)) {
  const bytes = fs.readFileSync(path.join(root, "public", asset.url));
  const rows = JSON.parse(bytes);
  assert.equal(rows.length, asset.total);
  assert.equal(new Set(rows.map(row => row.slug)).size, rows.length);
  assert.ok(asset.url.includes(crypto.createHash("sha256").update(bytes).digest("hex").slice(0, 16)));
  const [stage, locale] = key.split("-");
  assert.equal(JSON.stringify(rows), JSON.stringify(stage === "kindergarten" ? kgDirectoryRows() : stageDirectoryRows(stage, locale)), `${key}: serialized public facts changed`);
  if (stage === "kindergarten") {
    const filtered = filterKindergartens(rows, { ...emptyKgFilters(), q: "維多利亞" }, "维多利亚");
    assert.equal(filtered.length, 12);
    assert.ok(filtered.every(row => !rows.slice(0, 50).some(first => row.slug === first.slug)));
  }
  if (key === "primary-sc") assert.equal(rows.filter(row => row.schoolNet === "41").length, 9);
}
console.log("PASS: five versioned datasets, complete unchanged facts, unique schools, and searches beyond the first page");
