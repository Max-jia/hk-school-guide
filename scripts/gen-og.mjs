// 生成横版 OG 分享图(1200×630 PNG):读 blog-meta.json + 封面 SVG 的配色/字符,套横版模板
// 用 qlmanage(系统 QuickLook)渲染 SVG→PNG——sharp 的 librsvg 不渲染文字
// 用法:node scripts/gen-og.mjs
import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const ROOT = process.cwd();
const META = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/blog-meta.json"), "utf8"));
const TMP = "/tmp/og-svgs";
const OUT = path.join(ROOT, "public/covers/og");
fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// 按字宽换行(CJK 1 字宽,ASCII 0.55)
function wrap(text, maxW) {
  const lines = [];
  let cur = "";
  let w = 0;
  for (const ch of text) {
    const cw = ch.charCodeAt(0) < 0x3000 && ch.charCodeAt(0) > 0x20 ? 0.55 : 1;
    if (w + cw > maxW && cur) {
      lines.push(cur);
      cur = ch;
      w = cw;
    } else {
      cur += ch;
      w += cw;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function landscapeSvg({ bg, tag, num, date, title, tease, bigChar }) {
  const titleLines = wrap(title, 16); // serif 46px,约 16 字/行
  const teaseLines = wrap(tease, 40).slice(0, 3); // mono 17px,约 40 字/行
  let titleY = 250;
  let titleMarkup = "";
  for (const ln of titleLines.slice(0, 3)) {
    titleMarkup += `<text x="64" y="${titleY}" font-family="Georgia, 'Songti SC', serif" font-size="46" font-weight="800" fill="#FFFFFF" letter-spacing="1">${esc(ln)}</text>`;
    titleY += 58;
  }
  let teaseY = titleY + 30;
  let teaseMarkup = "";
  for (const ln of teaseLines) {
    teaseMarkup += `<text x="64" y="${teaseY}" font-family="Menlo, monospace" font-size="17" fill="rgba(255,255,255,.82)">${esc(ln)}</text>`;
    teaseY += 26;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${bg}"/>
<rect x="60" y="48" width="${200 + tag.length * 13}" height="36" fill="#1C1C1C"/>
<text x="${76 + tag.length * 6}" y="72" text-anchor="middle" font-family="Menlo, monospace" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1">BLOG · ${esc(tag)}</text>
<text x="1136" y="596" text-anchor="end" font-family="Georgia, 'Songti SC', serif" font-size="400" font-weight="800" fill="rgba(255,255,255,.85)" letter-spacing="-24">${esc(bigChar)}</text>
<text x="64" y="172" font-family="Menlo, monospace" font-size="15" font-weight="600" fill="rgba(255,255,255,.75)" letter-spacing="2">${num} · ${esc(date)}</text>
${titleMarkup}
${teaseMarkup}
<text x="64" y="596" font-family="Menlo, monospace" font-size="11" fill="rgba(255,255,255,.6)" letter-spacing="1">港学荟 Blog · 内容仅供参考</text>
</svg>`;
}

function render(svgPath, pngPath) {
  // qlmanage -t -s 1200 输出同目录 {name}.svg.png
  execFileSync("qlmanage", ["-t", "-s", "1200", "-o", TMP, svgPath], { stdio: "pipe" });
  fs.renameSync(pngPath, path.join(OUT, path.basename(pngPath)));
}

async function main() {
  const newest = META.length; // meta[0] 最新,编号 = 总数 - 下标
  for (let i = 0; i < META.length; i++) {
    const p = META[i];
    const coverSvg = fs.readFileSync(path.join(ROOT, "public", p.cover.replace(/^\//, "")), "utf8");
    const bgMatch = coverSvg.match(/<rect width="600" height="700" fill="([^"]+)"/);
    const charMatch = coverSvg.match(/font-size="290"[^>]*>([^<]+)</);
    const bg = bgMatch ? bgMatch[1] : "#1C1C1C";
    const bigChar = charMatch ? charMatch[1].trim() : "荟";
    const svg = landscapeSvg({
      bg, tag: p.tag, num: newest - i, date: p.date,
      title: p.title.split("——")[0].trim(), tease: p.tease, bigChar,
    });
    const svgPath = path.join(TMP, `${p.slug}.svg`);
    fs.writeFileSync(svgPath, svg);
    render(svgPath, svgPath + ".png");
  }
  const homeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#1C1C1C"/>
<text x="80" y="300" font-family="Georgia, 'Songti SC', serif" font-size="96" font-weight="800" fill="#FFFFFF" letter-spacing="2">港学荟</text>
<text x="80" y="372" font-family="Menlo, monospace" font-size="24" fill="rgba(255,255,255,.75)" letter-spacing="3">香港择校的数据工作室</text>
<text x="80" y="540" font-family="Menlo, monospace" font-size="15" fill="rgba(255,255,255,.5)" letter-spacing="2">hkschool.guide · 校网排名 / 计分制 / 热搜学校 / 择校工具</text>
</svg>`;
  fs.writeFileSync(path.join(TMP, "og-home.svg"), homeSvg);
  render(path.join(TMP, "og-home.svg"), path.join(TMP, "og-home.svg.png"));
  console.log(`OK: ${META.length} 篇文章图 + og-home.png`);
}

main().catch((e) => {
  console.error("FAIL:", e.message);
  process.exit(1);
});
