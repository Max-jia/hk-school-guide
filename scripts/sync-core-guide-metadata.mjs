import fs from "node:fs";
import path from "node:path";

// Deliberately explicit: only merge IDs that have passed the editor's review.
const arg = process.argv.indexOf("--ids");
const ids = new Set((process.argv[arg + 1] ?? "").split(",").filter(Boolean));
if (arg < 0 || !ids.size) throw new Error("Use --ids K01,K02,... after editorial review");
const folder = "docs/research/school-directory-guides-plan-2026-10-27/implementation";
const read = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const catalog = read("src/content/core-guides.json");
const old = read("src/content/blog-meta.json");
const approved = [];
const fields = ["cat", "slug", "date", "tag", "cover", "title", "tease", "scTitle", "scTease", "seoTitle", "scSeoTitle", "updatedAt", "verifiedAt"];
for (const id of ids) {
  const guide = catalog.find((g) => g.id === id);
  if (!guide) throw new Error(`Unknown ID: ${id}`);
  const category = { kindergarten: "kg", primary: "primary", secondary: "secondary" }[guide.stage];
  const sideDir = path.join(folder, `${category}-remaining`);
  const individual = [path.join(sideDir, `${id}-metadata.json`), path.join(sideDir, `${id}-meta.json`)].find((file) => fs.existsSync(file));
  const combined = path.join(sideDir, "metadata.json");
  const data = individual ? read(individual) : fs.existsSync(combined) ? read(combined).find((r) => r.slug === guide.slug) : null;
  if (!data || data.slug !== guide.slug) throw new Error(`Missing matching metadata: ${id}`);
  const article = read(`src/content/blog/${guide.slug}.json`);
  if (article.title !== data.title) throw new Error(`Article/metadata title mismatch: ${id}`);
  const previous = old.find((row) => row.slug === guide.slug);
  const row = Object.fromEntries(fields.filter((field) => data[field] !== undefined).map((field) => [field, data[field]]));
  row.date = previous?.date ?? "10月27日";
  row.updatedAt = "2026-10-27";
  row.verifiedAt = "2026-10-27";
  row.cat = "guide";
  row.tag = { kindergarten: "幼稚园指南", primary: "小学指南", secondary: "中学指南" }[guide.stage];
  row.cover = `/covers/blog_${guide.slug}.svg`;
  if (!row.tease || !row.scTitle) throw new Error(`Incomplete metadata: ${id}`);
  approved.push(row);
}
const bySlug = new Map(approved.map((row) => [row.slug, row]));
const additions = approved.filter((row) => !old.some((prev) => prev.slug === row.slug));
fs.writeFileSync("src/content/blog-meta.json", JSON.stringify([...additions, ...old.map((row) => bySlug.get(row.slug) ?? row)], null, 2) + "\n");
console.log(`Merged ${approved.length} reviewed guides (${additions.length} new URLs); original publication dates preserved.`);
