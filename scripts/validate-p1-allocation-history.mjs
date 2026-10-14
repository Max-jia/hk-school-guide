import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { computeSlideLine } from "../src/lib/sim-engine.ts";

const history = JSON.parse(
  await readFile(new URL("../src/content/p1-allocation-history.json", import.meta.url), "utf8"),
);
const roster = JSON.parse(
  await readFile(new URL("../src/content/p1-nets.json", import.meta.url), "utf8"),
);
const rosterNets = roster.nets.map(({ net }) => Number(net)).sort((a, b) => a - b);

assert.deepEqual(
  history.systemTotals.map(({ year }) => year),
  Array.from({ length: 11 }, (_, index) => 2015 + index),
  "system-wide allocation series should cover 2015–2025 without gaps",
);

for (const row of history.systemTotals) {
  assert.equal(row.discretionaryAllocated + row.centralAllocated, row.totalAllocated, `system totals ${row.year}`);
}

const expectedNetTotals = {
  2024: [10874, 9602, 20476, 2129, 13834, 1987, 1058, 19008, 39484],
  2025: [10414, 9611, 20025, 2157, 13218, 2597, 1273, 19245, 39270],
};
const fields = [
  "typeA", "typeB", "discretionarySubtotal", "unrestrictedTop3", "homeNetTop3",
  "homeNet4to10", "homeNetBeyond10", "centralSubtotal", "totalAllocated",
];

for (const [year, rows] of Object.entries(history.netResultsByYear)) {
  assert.equal(rows.length, 36, `${year} should contain all 36 school nets`);
  assert.equal(new Set(rows.map((row) => row.net)).size, 36, `${year} should not duplicate school nets`);
  assert.deepEqual(rows.map((row) => row.net).sort((a, b) => a - b), rosterNets, `${year} nets should match the current official roster net ids`);

  for (const row of rows) {
    assert.equal(row.typeA + row.typeB, row.discretionarySubtotal, `${year} net ${row.net}: discretionary subtotal`);
    assert.equal(
      row.unrestrictedTop3 + row.homeNetTop3 + row.homeNet4to10 + row.homeNetBeyond10,
      row.centralSubtotal,
      `${year} net ${row.net}: central allocation subtotal`,
    );
    assert.equal(row.discretionarySubtotal + row.centralSubtotal, row.totalAllocated, `${year} net ${row.net}: total`);
  }

  assert.deepEqual(
    fields.map((field) => rows.reduce((sum, row) => sum + row[field], 0)),
    expectedNetTotals[year],
    `${year} net rows should reconcile to Appendix V(a) All Nets totals`,
  );
}

assert.equal(history.meta.schoolDemandDataStatus.verifiedRecords.length, 0);
const sample = computeSlideLine(
  [{ name: "小名额校" }, { name: "大名额校" }],
  (name) => name === "小名额校" ? 25 : 75,
  [25, 50, 75],
);
assert.equal(sample.slideLineIndex, null, "capacity alone must never produce a safety line");
assert.match(sample.note, /2024、2025 年度报告/);
assert.equal(sample.worstFall, null, "capacity alone must never produce a worst-case school");
assert.deepEqual(sample.positions.map(({ capacityBand }) => capacityBand), ["相对偏小", "相对偏大"]);
assert.ok(sample.positions.every(({ demandStatus }) => demandStatus === "暂无校级核实数据"));

const reordered = computeSlideLine(
  [{ name: "大名额校" }, { name: "小名额校" }],
  (name) => name === "小名额校" ? 25 : 75,
  [25, 50, 75],
);
assert.deepEqual(reordered.positions.map(({ capacityBand }) => capacityBand), ["相对偏大", "相对偏小"]);
assert.equal(reordered.slideLineIndex, null, "reordering must not invent a line");

console.log("P1 allocation history and evidence-aware capacity model: OK");
