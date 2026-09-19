// 生成「深度择校报告」列表封面(600×700 竖版 SVG)
//
// 背景:旧站 era 的报告封面是逐个手写的 SVG,新报告没有封面,
// 报表页 <img src="/covers/{code}.svg"> 就会开天窗。
// 这里按 docs/report-rules.md 的报告封面版式(深底 + 米白卡 + 三条黑条)重制,
// 并把「缺封面的报告」自动补齐。
//
// 用法:
//   node scripts/gen-report-covers.mjs            只补缺的
//   node scripts/gen-report-covers.mjs --force    全部重生成(会覆盖人工封面)

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

const ROOT = process.cwd();
const COVERS = path.join(ROOT, "public/covers");
const TMP = "/tmp/report-cover-og";
const META = JSON.parse(fs.readFileSync(path.join(ROOT, "src/content/report-meta.json"), "utf8"));
const force = process.argv.includes("--force");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

// 横版 OG 分享图(1200×630)由同一套配色/大字生成,让新报告分享出去不再回退到首页图。
function ogSvg({ bg, tierLabel, big, name, title, bars }) {
  const wrap = (text, maxW) => {
    const lines = [];
    let cur = "";
    let w = 0;
    for (const ch of text) {
      const cw = ch.charCodeAt(0) < 0x3000 && ch.charCodeAt(0) > 0x20 ? 0.55 : 1;
      if (w + cw > maxW && cur) { lines.push(cur); cur = ch; w = cw; } else { cur += ch; w += cw; }
    }
    if (cur) lines.push(cur);
    return lines;
  };
  const titleLines = wrap(title, 16).slice(0, 2);
  let y = 250;
  const titleMarkup = titleLines
    .map((ln) => {
      const t = `<text x="64" y="${y}" font-family="Georgia, 'Songti SC', serif" font-size="46" font-weight="800" fill="#FFFFFF" letter-spacing="1">${esc(ln)}</text>`;
      y += 58;
      return t;
    })
    .join("");
  let ty = y + 34;
  const teaseMarkup = wrap(bars[2], 38)
    .slice(0, 2)
    .map((ln) => {
      const t = `<text x="64" y="${ty}" font-family="Menlo, monospace" font-size="17" fill="rgba(255,255,255,.82)">${esc(ln)}</text>`;
      ty += 26;
      return t;
    })
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${bg}"/>
<rect x="60" y="48" width="${200 + tierLabel.length * 13}" height="36" fill="#1C1C1C"/>
<text x="${76 + tierLabel.length * 6}" y="72" text-anchor="middle" font-family="Menlo, monospace" font-size="14" font-weight="800" fill="#FFFFFF" letter-spacing="1">報告 · ${esc(tierLabel)}</text>
<text x="1136" y="600" text-anchor="end" font-family="Georgia, 'Songti SC', serif" font-size="400" font-weight="800" fill="rgba(255,255,255,.85)" letter-spacing="-24">${esc(big)}</text>
<text x="64" y="172" font-family="Menlo, monospace" font-size="15" font-weight="600" fill="rgba(255,255,255,.75)" letter-spacing="2">${esc(name)}</text>
${titleMarkup}
${teaseMarkup}
<text x="64" y="596" font-family="Menlo, monospace" font-size="11" fill="rgba(255,255,255,.6)" letter-spacing="1">港學薈 · 深度擇校報告 · 數據為參考（非官方）</text>
</svg>`;
}

function renderChrome(svgPath, outPng, size) {
  execFileSync(
    CHROME,
    ["--headless", "--disable-gpu", "--hide-scrollbars", `--window-size=${size}`,
     `--screenshot=${outPng}`, `file://${svgPath}`],
    { stdio: "pipe" }
  );
}

// 等级 → 底色。沿用旧站封面的同一组色值,保持整墙风格一致。
const TIER_BG = {
  S: ["#B03A2E", "#C2453B", "#D4523D"],
  "A+": ["#0F766E", "#6A4E93", "#7A5BA8"],
  A: ["#1F5F8C", "#2B6A8F", "#3A7CA5"],
  B: ["#6E7259", "#7A7F66", "#5F6B52", "#7C7462", "#556B5E"],
};

// 地区简→繁(封面用繁体,与站内繁体主版本一致)
const AREA_TC = {
  东区: "東區", 湾仔区: "灣仔區", 黄大仙区: "黃大仙區", 沙田区: "沙田區",
  荃湾区: "荃灣區", 观塘区: "觀塘區", 九龙城: "九龍城", 九龙城區: "九龍城區",
  深水埗区: "深水埗區", 元朗区: "元朗區", 葵青区: "葵青區", 屯门区: "屯門區",
  中西区: "中西區", 南区: "南區", 油尖旺区: "油尖旺區", 大埔区: "大埔區",
  北区: "北區", 西贡区: "西貢區", 离岛: "離島", 九龙城: "九龍城",
};

// 每份报告卡片里的三条黑条(第一二条为标识信息,第三条为卖点)与大字。
// 新写报告时在这里加一行即可,其余全部自动。
const CARD = {
  canossahk: { no: 77, big: "嘉", tagline: "Canossa School Hong Kong · 14 校網", bars: ["B 級 · 東區", "資助 · 男女校 · 免費", "聯繫嘉諾撒書院 · 午息後課程特色"] },
  tsbcps: { no: 78, big: "慈", tagline: "Tsz Wan Shan St. Bonaventure Catholic PS", bars: ["B 級 · 黃大仙區 45 校網", "資助 · 男女校 · 免費", "聯繫聖文德書院 · 開放課堂參觀"] },
  stts: { no: 79, big: "崇", tagline: "Shatin Tsung Tsin School", bars: ["B 級 · 沙田區 91 校網", "資助 · 男女校 · 免費", "聯繫馬鞍山崇真中學 · 生命教育主線"] },
  twgps: { no: 80, big: "荃", tagline: "Tsuen Wan Government Primary School", bars: ["B 級 · 荃灣區 62 校網", "官立 · 男女校 · 免費", "聯繫荃灣官立中學 · 校際體育突出"] },
  stgps: { no: 81, big: "沙", tagline: "Sha Tin Government Primary School", bars: ["B 級 · 沙田區 88 校網", "官立 · 男女校 · 免費", "聯繫沙田官立中學 · 梁文燕紀念中學"] },
  sfcs: { no: 82, big: "方", tagline: "St. Francis' Canossian School", bars: ["B 級 · 灣仔區 12 校網", "資助 · 女校 · 直屬", "直屬嘉諾撒聖方濟各書院"] },
  sjacps: { no: 83, big: "瑟", tagline: "St. Joseph's Anglo-Chinese Primary School", bars: ["B 級 · 觀塘區", "私立 · 男校 · $46,000／年", "直屬聖若瑟英文中學"] },
  pkps: { no: 84, big: "培", tagline: "Pui Kiu Primary School · 16 校網", bars: ["B 級 · 東區 16 校網", "資助 · 男女校 · 免費", "中英數三科獲行政長官卓越教學獎"] },
  cneclmc: { no: 85, big: "呂", tagline: "CNEC Lui Ming Choi Primary School", bars: ["B 級 · 葵青區 66 校網", "資助 · 男女校 · 免費", "青衣長發邨 · 無聯繫中學 · 戶外設施豐富"] },
  cblmc: { no: 86, big: "宣", tagline: "Conservative Baptist Lui Ming Choi PS", bars: ["B 級 · 觀塘區 46 校網", "資助 · 男女校 · 免費", "九龍灣彩霞道 · 無聯繫中學 · 兩科卓越教學獎"] },
  skhlmcmps: { no: 87, big: "役", tagline: "S.K.H. Lui Ming Choi Memorial PS", bars: ["B 級 · 中西區 11 校網", "資助 · 男女校 · 免費", "堅尼地城 · 1960 創校 · 無聯繫中學"] },
  ngwah: { no: 88, big: "慎", tagline: "Ng Wah Catholic Primary School", bars: ["B 級 · 黃大仙區 43 校網", "資助 · 男女校 · 免費", "直屬天主教伍華中學 · 最多 85% 學額"] },
  plkshsn: { no: 89, big: "愛", tagline: "Po Leung Kuk Stanley Ho Sau Nan PS", bars: ["B 級 · 九龍城區 34 校網", "資助 · 男女校 · 免費", "聯繫保良局第一張永慶中學 · 無宗教分"] },
  sylgps: { no: 90, big: "樂", tagline: "South Yuen Long Government Primary", bars: ["B 級 · 元朗區 73 校網", "官立 · 男女校 · 免費", "聯繫三所中學 · 1904 年創校"] },
  skhykkgps: { no: 91, big: "編", tagline: "S.K.H. Yautong Kei Hin Primary School", bars: ["B 級 · 觀塘區 48 校網", "資助 · 男女校 · 免費", "油塘道 · 36 班 · 8,000 ㎡ · 無聯繫中學"] },
  skhlsks: { no: 92, big: "兆", tagline: "S.K.H. Lee Shiu Keung Primary School", bars: ["B 級 · 觀塘區 48 校網", "資助 · 男女校 · 免費", "藍田平田邨 · 四高課堂 · 無聯繫中學"] },
  sts: { no: 93, big: "公", tagline: "St. Antonius Primary School", bars: ["B 級 · 觀塘區 48 校網", "資助 · 男女校 · 免費", "油塘 · 1959 創校 · 10 年+ 年資教師 80%"] },
  ltmps: { no: 94, big: "循", tagline: "Lam Tin Methodist Primary School", bars: ["B 級 · 觀塘區 48 校網", "資助 · 男女校 · 免費", "藍田平田邨 · 體驗式學習 · STEAM 獎項"] },
  skhttlsks: { no: 95, big: "德", tagline: "S.K.H. Tak Tin Lee Shiu Keung PS", bars: ["B 級 · 觀塘區 48 校網", "資助 · 男女校 · 免費", "11,254 ㎡ 全批最大 · 球場群"] },
  tkocps: { no: 96, big: "澳", tagline: "Tseung Kwan O Catholic Primary School", bars: ["B 級 · 西貢區 95 校網", "資助 · 男女校 · 免費", "將軍澳唐賢街 · 無聯繫中學"] },
  skhsas: { no: 97, big: "安", tagline: "S.K.H. St. Andrew's Primary School", bars: ["B 級 · 深水埗區 40 校網", "資助 · 男女校 · 免費", "7 個球場 + 全天候跑道 · 自行分配 90 名額"] },
  skhkfp: { no: 98, big: "福", tagline: "S.K.H. Kei Fook Primary School", bars: ["B 級 · 深水埗區 40 校網", "資助 · 男女校 · 免費", "3 間英語教學室 · 三年級起設精英班"] },
  kcskps: { no: 99, big: "堅", tagline: "Christian & Missionary Alliance Sun Kei PS", bars: ["B 級 · 觀塘區 48 校網", "資助 · 男女校 · 免費", "秀茂坪 · 資優班普教中 · 小組活動室 5 個"] },
  tswcs: { no: 100, big: "慈", tagline: "Tsz Wan Shan Catholic Primary School", bars: ["B 級 · 黃大仙區 45 校網", "資助 · 男女校 · 免費", "校舍 10,000 ㎡ · 輔導室 4 間 · 無聯繫中學"] },
  ycmc: { no: 101, big: "夢", tagline: "S.K.H. Yuen Chen Maun Chen Primary", bars: ["B 級 · 大埔區 84 校網", "資助 · 男女校 · 免費", "1984 創校 · 可選廣教中或普教中"] },
  ycmcj: { no: 102, big: "禧", tagline: "S.K.H. Yuen Chen Maun Chen Jubilee PS", bars: ["B 級 · 大埔區 84 校網", "資助 · 男女校 · 免費", "活動教學 · 領袖訓練 · 不設精英班"] },
  hkbaptist: { no: 103, big: "誠", tagline: "HK Baptist Convention Primary School", bars: ["B 級 · 荃灣區 62 校網", "資助 · 男女校 · 免費", "小三起 BYOD · 六年級數學五班六組"] },
  wflst: { no: 104, big: "泳", tagline: "W F Joseph Lee Primary School", bars: ["B 級 · 元朗區·天水圍", "直資 · 男女校 · $19,300／年", "英語與普通話授課 · 冷暖水泳池"] },
  plkflpy: { no: 105, big: "創", tagline: "PLK Fung Lee Pui Yiu Primary School", bars: ["B 級 · 屯門區 71 校網", "資助 · 男女校 · 免費", "聯繫兩所中學 · 機械人賽香港區冠軍"] },
  fkgs: { no: 106, big: "崇", tagline: "Fuk Wing Street Government Primary School", bars: ["B 級 · 深水埗區 40 校網", "官立 · 男女校 · 免費 · 1958 創校", "聯繫四所官立中學 · 無宗教分"] },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// 按字宽截断(中文 1 字宽,ASCII 约 0.55)
function clip(text, maxW) {
  let w = 0;
  let out = "";
  for (const ch of text) {
    const cw = ch.charCodeAt(0) < 0x3000 && ch.charCodeAt(0) > 0x20 ? 0.55 : 1;
    if (w + cw > maxW) return out + "…";
    out += ch;
    w += cw;
  }
  return out;
}

function coverSvg({ bg, tierLabel, no, big, name, tagline, bars }) {
  const bar = (i, text) =>
    `<rect x="104" y="${250 + i * 72}" width="392" height="58" fill="#1C1C1C"/>` +
    `<text x="300" y="${285 + i * 72}" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" font-weight="800" fill="#FFFFFF">${esc(text)}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700" viewBox="0 0 600 700">` +
    `<rect width="600" height="700" fill="${bg}"/>` +
    `<rect x="400" y="24" width="168" height="34" fill="#1C1C1C"/>` +
    `<text x="484" y="47" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="12" font-weight="800" fill="#FFFFFF" letter-spacing="1">${esc(tierLabel)}</text>` +
    `<text x="372" y="710" font-family="Georgia, 'Times New Roman', serif" font-size="290" font-weight="800" fill="rgba(255,255,255,.85)" letter-spacing="-16">${esc(big)}</text>` +
    `<text x="36" y="46" font-family="ui-monospace, Menlo, monospace" font-size="13" font-weight="600" fill="rgba(255,255,255,.75)" letter-spacing="2">${esc(no)}</text>` +
    `<rect x="76" y="150" width="448" height="470" fill="#FBF6EC" stroke="#1C1C1C" stroke-width="3"/>` +
    `<text x="104" y="192" font-family="Georgia, 'Times New Roman', serif" font-size="23" font-weight="800" fill="#1C1C1C" letter-spacing="-1">${esc(name)}</text>` +
    `<text x="104" y="218" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="rgba(28,28,28,.62)">${esc(tagline)}</text>` +
    bars.map((b, i) => bar(i, clip(b, 26))).join("") +
    `<text x="36" y="682" font-family="ui-monospace, Menlo, monospace" font-size="11" fill="rgba(255,255,255,.7)" letter-spacing="1">數據：香港教育局 CHSC · 評級為參考（非官方）</text>` +
    `</svg>`;
}

const all = [...(META.PS_REPORTS || []), ...(META.KG_REPORTS || [])];
const used = new Set(
  fs.readdirSync(COVERS)
    .filter((f) => f.endsWith(".svg") && !f.startsWith("blog_") && !f.startsWith("iq_") && !f.startsWith("tool_"))
    .map((f) => f.replace(/\.svg$/, ""))
);

// 序号接在现有封面之后
let nextNo = 1;
for (const f of fs.readdirSync(COVERS)) {
  if (!f.endsWith(".svg")) continue;
  const s = fs.readFileSync(path.join(COVERS, f), "utf8");
  const m = s.match(/letter-spacing="2">NO\.(\d+)/);
  if (m) nextNo = Math.max(nextNo, Number(m[1]) + 1);
}

let made = 0;
for (const r of all) {
  const cfg = CARD[r.c];
  if (!cfg) continue;
  const out = path.join(COVERS, `${r.c}.svg`);
  if (fs.existsSync(out) && !force) continue;
  const palette = TIER_BG[r.t] || TIER_BG.B;
  const bg = palette[made % palette.length];
  const areaTc = AREA_TC[r.d] || r.d;
  const tagline = clip(cfg.tagline || areaTc, 30);
  const no = cfg.no || nextNo;
  fs.writeFileSync(
    out,
    coverSvg({
      bg,
      tierLabel: `${r.t} · 小學`,
      no: `NO.${String(no).padStart(3, "0")} — ${r.c.toUpperCase()}`,
      big: cfg.big,
      name: r.n,
      tagline,
      bars: cfg.bars,
    })
  );
  // 同步出横版 OG 图(1200×630),报告页 meta 引用 /covers/{code}.png
  fs.mkdirSync(TMP, { recursive: true });
  const ogPath = path.join(TMP, `${r.c}-og.svg`);
  fs.writeFileSync(
    ogPath,
    ogSvg({
      bg,
      tierLabel: `${r.t} 級 · ${areaTc}`,
      big: cfg.big,
      name: r.n,
      title: r.n,
      bars: cfg.bars,
    })
  );
  renderChrome(ogPath, path.join(COVERS, `${r.c}.png`), "1200,630");
  nextNo += 1;
  made += 1;
  console.log(`✓ public/covers/${r.c}.svg  (${r.t} · ${areaTc})`);
}
console.log(`完成:新增 ${made} 张报告封面`);
