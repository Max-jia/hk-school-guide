import fs from "node:fs";
import sharp from "sharp";

const catalog = JSON.parse(fs.readFileSync("src/content/core-guides.json", "utf8"));
const meta = JSON.parse(fs.readFileSync("src/content/blog-meta.json", "utf8"));
const arg = process.argv.indexOf("--ids");
const ids = arg >= 0 ? new Set(process.argv[arg + 1].split(",")) : null;
const esc = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
function wrap(text, width) {
  const tokens = text.match(/[A-Za-z0-9]+(?:[/-][A-Za-z0-9]+)*|./gu) ?? [];
  const weight = (token) => [...token].reduce((sum, ch) => sum + (ch.charCodeAt(0) <= 127 ? .55 : 1), 0);
  const rows = []; let line = [], size = 0;
  for (const token of tokens) {
    const units = weight(token);
    if (size + units > width && line.length) { rows.push(line); line = []; size = 0; }
    line.push(token); size += units;
  }
  if (line.length) rows.push(line);
  if (rows.length > 1) {
    const last = rows.at(-1), previous = rows.at(-2);
    while (last.reduce((sum, token) => sum + weight(token), 0) < 4 && previous.length > 4) last.unshift(previous.pop());
  }
  return rows.map((row) => row.join(""));
}
const themes = { kindergarten: { color: "#526860", label: "幼稚园", mark: "幼" }, primary: { color: "#7A654F", label: "小学", mark: "小" }, secondary: { color: "#6D6658", label: "中学", mark: "中" } };
const text = (s, x, y, size, color, weight = 500) => `<text x="${x}" y="${y}" font-family="'Songti SC', 'STHeiti', serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
fs.mkdirSync("public/covers/og", { recursive: true });
let count = 0;
for (const guide of catalog.filter((g) => !ids || ids.has(g.id))) {
  const post = meta.find((m) => m.slug === guide.slug);
  if (!post) throw new Error(`Register reviewed article first: ${guide.id}`);
  const theme = themes[guide.stage];
  const lines = wrap(guide.label, 10);
  const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700"><rect width="600" height="700" fill="${theme.color}"/><rect x="48" y="128" width="504" height="482" rx="8" fill="#FCFAF5"/>${text("港学荟 · 择校指南", 48, 58, 20, "#fff")}${text(theme.label, 78, 192, 21, theme.color, 700)}${lines.map((line, index) => text(line, 78, 290 + index * 60, 41, "#20201F", 700)).join("")}${wrap(guide.question, 17).map((line, index) => text(line, 78, 475 + index * 34, 22, "#57534B")).join("")}${text("规则 · 取舍 · 家庭行动", 48, 660, 20, "#fff")}</svg>`;
  fs.writeFileSync(`public/covers/blog_${guide.slug}.svg`, cover);
  const title = wrap(post.title, 17);
  const desc = wrap(post.tease, 40).slice(0, 2);
  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="${theme.color}"/><rect x="48" y="118" width="1104" height="425" rx="8" fill="#FCFAF5"/>${text("港学荟 · " + theme.label + "指南", 64, 70, 25, "#fff")}${text(theme.mark, 930, 490, 235, "#E9E5DC", 700)}${title.slice(0, 3).map((line, index) => text(line, 80, 210 + index * 57, 45, "#20201F", 700)).join("")}${desc.map((line, index) => text(line, 80, 420 + index * 34, 22, "#57534B")).join("")}${text("hkschool.guide · 资料与年度见正文", 64, 592, 21, "#fff")}</svg>`;
  await sharp(Buffer.from(og)).png().toFile(`public/covers/og/${guide.slug}.png`);
  count++;
}
console.log(`Generated ${count} matched SVG covers and 1200×630 PNG share images.`);
