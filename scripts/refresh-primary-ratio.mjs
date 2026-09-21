// 重算小学「班师比」（教师总人数 ÷ 上学年总班数），并刷新到最新一版《小学概览》。
//
// 背景（2026-09 修正）：
//   站上小学的 teacher_ratio 一直沿用 2022 年版《小学概览》的「教师总人数 ÷ 总班数」，
//   但 UI 把它标成了「师生比」。1:2.4 这个量级不可能是师生比（香港小学实际师生比约 1:12–1:15），
//   它其实是「每班平均可分到的教师人数」，即班师比。
//   同站幼稚园那一栏的 teacher_ratio 来自《幼稚园概览》的「上午时段师生比例」，
//   那是真的师生比（例如 1:8.9），所以幼稚园字段保持不动。
//
// 这次修正做两件事：
//   1. 字段改名 teacher_ratio → class_teacher_ratio，让两种指标不再共用一个字段名；
//   2. 数值全部用最新一版概览重算，并把概览里查不到的学校清空（不保留旧数字冒充新数据）。
//
// 用法:
//   node scripts/refresh-primary-ratio.mjs [PSP_CSV 路径]
//   默认读取 /Users/maxjia/hk-school-guide/data/raw/PSP_2025_tc.csv

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const SCHOOLS = path.join(ROOT, "src/content/schools.json");
const CSV = process.argv[2] || "/Users/maxjia/hk-school-guide/data/raw/PSP_2025_tc.csv";

if (!fs.existsSync(CSV)) {
  console.error(`找不到概览 CSV：${CSV}`);
  process.exit(1);
}

// ── 最小 CSV 解析（处理引号包裹与双引号转义）──
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// ── 校名归一化：全角转半角、去空白、去括号、统一「幼稚園/幼兒園」──
function norm(s) {
  return String(s || "")
    .normalize("NFKC")
    .replace(/[\s\u3000]/g, "")
    .replace(/[()（）]/g, "")
    .replace(/幼稚園/g, "幼稚园")
    .replace(/幼兒園/g, "幼儿园");
}

const raw = fs.readFileSync(CSV, "utf8").replace(/^\uFEFF/, "");
const [header, ...body] = parseCsv(raw);
const iName = header.indexOf("學校名稱");
const iTch = header.indexOf("上學年教師總人數");
const iCls = header.indexOf("上學年總班數");
if (iName < 0 || iTch < 0 || iCls < 0) {
  console.error("CSV 缺少必要栏位（學校名稱／上學年教師總人數／上學年總班數）");
  process.exit(1);
}

const psp = new Map();
for (const r of body) {
  const key = norm(r[iName]);
  if (!key || psp.has(key)) continue;
  const tch = Number(r[iTch]);
  const cls = Number(r[iCls]);
  if (!tch || !cls) continue;
  psp.set(key, tch / cls);
}

const schools = JSON.parse(fs.readFileSync(SCHOOLS, "utf8"));
let added = 0;
let changed = 0;
let unchanged = 0;
let cleared = 0;
let none = 0;
const clearedNames = [];

for (const s of schools) {
  const prev = s.teacher_ratio ?? null;
  delete s.teacher_ratio;

  const ratio = psp.get(norm(s.name_zh)) ?? psp.get(norm(s.name_display));
  if (ratio === undefined) {
    s.class_teacher_ratio = null;
    if (prev) {
      cleared++;
      clearedNames.push(s.name_zh);
    } else {
      none++;
    }
    continue;
  }

  const next = `1:${ratio.toFixed(1)}`;
  s.class_teacher_ratio = next;
  if (!prev) added++;
  else if (prev !== next) changed++;
  else unchanged++;
}

fs.writeFileSync(SCHOOLS, JSON.stringify(schools, null, 1) + "\n", "utf8");

console.log(`概览来源：${CSV}`);
console.log(`小学总数 ${schools.length}`);
console.log(`  新增 ${added}｜更新 ${changed}｜未变 ${unchanged}｜清空（概览查不到）${cleared}｜本来就无值 ${none}`);
if (clearedNames.length) console.log(`  清空名单：${clearedNames.join("、")}`);
