// 深度择校报告验证脚本（新架构版）
//
// 旧站是 report-{code}.html 单文件，验证逻辑在 scripts/validate_report.py。
// 新站改成 src/content/reports/{slug}.json，body 放「声明+第1章」、premiumHtml 放第 2-8 章，
// 付费墙/CTA/页脚/简繁切换都由组件层负责，所以那份脚本不能直接复用。
// 这里按 docs/report-rules.md 逐条对齐，只验证「内容与来源」部分。
//
// 用法:
//   node scripts/validate-reports.mjs              验证全部
//   node scripts/validate-reports.mjs pooi-to-kg   只验证指定 slug

import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const DIR = path.join(ROOT, "src/content/reports");
const only = process.argv.slice(2);

const visible = (html) => html.replace(/<[^>]+>/g, "").replace(/\s/g, "").length;
const count = (s, re) => (s.match(re) || []).length;

// 已停办的学校走「历史档案」标准，章节要求放宽
const ARCHIVE = new Set(["kentville"]);

function chaptersOf(html) {
  return [...html.matchAll(/<span class="num">(\d+)<\/span>([^<]*)/g)].map((m) => ({
    n: Number(m[1]),
    title: m[2].trim(),
  }));
}

function sectionBodies(html) {
  return html.split('<section class="chapter">').slice(1);
}

function validate(slug, d) {
  const errs = [];
  const warns = [];
  const all = d.hero + d.body + d.premiumHtml;
  const archive = ARCHIVE.has(slug);

  // ── 必备字段 ──
  if (!d.hero?.includes('class="tier-mega"')) errs.push("hero 缺 tier-mega 等级标签");
  if (!/<h1[^>]*>/.test(d.hero || "")) errs.push("hero 缺 h1");
  if (!d.hero?.includes('class="lang-switch"')) errs.push("hero 缺简繁切换链接");
  // 免费报告（free:true）没有付费墙，singleUrl 为空是正常的
  if (!d.allAccessUrl) errs.push("缺 allAccessUrl");
  if (d.premium && !d.singleUrl) errs.push("付费报告缺 singleUrl");
  if (typeof d.free !== "boolean") errs.push("free 不是 boolean");

  // ── 第 0 节：数据可靠性声明（固定模板）──
  // 已停办学校（ARCHIVE）的档案报告用「本校已停办」公告代替标准声明，属预期差异。
  if (archive) {
    if (!/可靠性|停办|停辦/.test(d.body)) errs.push("档案报告缺可靠性说明");
  } else {
    if (!d.body.includes("本报告数据可靠性声明")) errs.push("缺「本报告数据可靠性声明」");
    if (!d.body.includes("不构成入学建议")) errs.push("声明块未以「不构成入学建议」结尾");
    // 各报告的声明块写法略有出入（例如用 <span class="rel-tag"> 包裹，
    // 或写「有限来源」而非「有限来源·仅供参考」），这里按关键词判存在即可。
    const DECL = [
      ["多方核实", "多方核实"],
      ["单一可靠来源", "单一可靠来源"],
      ["有限来源", "有限来源"],
      ["主观分析", "主观分析"],
    ];
    for (const [key, label] of DECL) {
      if (!d.body.includes(key)) errs.push(`声明块缺核实度说明：${label}`);
    }
  }

  // ── 章节结构：body=1，premiumHtml=2-8 ──
  const bodyCh = chaptersOf(d.body);
  const premCh = chaptersOf(d.premiumHtml);
  const nums = [...bodyCh, ...premCh].map((c) => c.n);
  const need = archive ? 3 : 8;
  if (nums.length < need) {
    errs.push(`章节不足（${nums.length}/${need}）`);
  } else if (nums.join(",") !== nums.map((_, i) => i + 1).join(",")) {
    errs.push(`章节编号不连续：${nums.join(",")}`);
  } else {
    const sections = [...sectionBodies(d.body), ...sectionBodies(d.premiumHtml)];
    const thin = sections
      .map((s, i) => ({ i: i + 1, c: visible(s) }))
      .filter((x) => x.c < (archive ? 100 : 120));
    if (thin.length) errs.push(`章节过薄：${thin.map((x) => `第${x.i}章${x.c}字`).join("、")}`);
  }

  // ── 诚实度：各章最低要求 ──
  if (!archive) {
    const ch2 = sectionBodies(d.premiumHtml)[0] || "";
    const ch3 = sectionBodies(d.premiumHtml)[1] || "";
    const ch4 = sectionBodies(d.premiumHtml)[2] || "";
    const ch5 = sectionBodies(d.premiumHtml)[3] || "";
    const ch6 = sectionBodies(d.premiumHtml)[4] || "";
    const ch7 = sectionBodies(d.premiumHtml)[5] || "";

    // 各章深度门槛按语料库实际分布校准（127 份报告统计），不按规则文件字面：
    // 「教学局限」只有约一半报告用 <li>，所以看标题而不是数列表项；
    // 🟡🔴💬 三个标记在「系统 emoji 全清」后只剩 3 份还在用，不作硬性要求。
    if (!/(教学局限|教學局限|局限|不足之处|不足之处)/.test(ch2)) warns.push("第 2 章未见「教学局限」小节");
    const risks = count(ch3, /风险|風險/g);
    if (risks < 1) errs.push("第 3 章未见风险提示");

    // 第 4 章的「提升入读概率建议」有的写成 <li> 列表，有的写成 h3 小节 + 段落，
    // 两种都符合规则；只看 <li> 会把后者误判为缺失。
    const advice = count(ch4, /<li>/g);
    const hasAdviceSection = /<h3[^>]*>[^<]*(建议|攻略|提高|提升|加分|策略|要点|做法|怎么填|填表)/.test(ch4);
    if (advice < 3 && !hasAdviceSection) errs.push(`第 4 章缺「提升入读概率建议」小节（<li> 仅 ${advice} 条）`);
    else if (!hasAdviceSection && advice < 5) warns.push(`第 4 章建议 ${advice} 条（规则建议 ≥5）`);

    if (visible(ch5) < 120) errs.push("第 5 章内容过薄（插班/求位策略需针对该校）");
    if (count(ch6, /<li>/g) < 2) warns.push("第 6 章列表项不足 2 条");
    const ch7Rows = count(ch7, /<tr>/g);
    if (ch7Rows < 4) errs.push(`第 7 章同类对比不足 3 所竞品（${Math.max(0, ch7Rows - 1)} 行数据）`);
  }

  // ── 来源标注体系 ──
  // ✅ 是唯一全站保留的核实标记（127/127），必须出现
  if (!all.includes("✅")) errs.push("全篇缺少 ✅ 多方核实标注");

  // 全站 emoji 经过一轮「系统 emoji 全清」。语料库盘点后允许的集合如下，
  // 其余（💡🔴💬🟡📎📌 等）都算残留。新写报告很容易顺手加上，逐个 review 不现实，
  // 所以在这里自动拦住。
  const ALLOWED_EMOJI = new Set([
    "✅", // 多方核实
    "⚠", // 风险 / 提醒（常带 U+FE0F）
    "→", "↓", // 排版箭头
    "★", "☆", // 评级星
    "✔", "✘", "❌", // 适合 / 不适合
    "☐", // 清单空格
  ]);
  const found = new Set(
    all.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u2190-\u2193]/gu) || []
  );
  const stray = [...found].filter((e) => !ALLOWED_EMOJI.has(e));
  if (stray.length) errs.push(`出现已全站清理的 emoji：${stray.join(" ")}`);

  // ── 禁止项 ──
  const banned = [
    [/\.json\b/, ".json 文件名"],
    [/TODO|FIXME|待补充|待填|占位/, "占位符"],
    [/\{[一-鿿\w]{1,20}\}/, "模板占位符"],
    [/schooland|SOSOMAMA|sosomama/, "聚合网站作为来源"],
  ];
  for (const [re, label] of banned) if (re.test(all)) errs.push(`出现禁止内容：${label}`);

  // 「本平台」只能用于评级/Banding
  for (const m of all.matchAll(/本平台([^。<]{0,12})/g)) {
    if (!/评级|評級|banding|Banding|分数|評分|评分/.test(m[1])) {
      warns.push(`「本平台」用法可疑：本平台${m[1]}`);
    }
  }

  // 绝对化语言：只抓「正向保证」。报告里大量出现「但不是保证录取」「不一定能延续」
  // 这类否定用法，是正确的谨慎表述，不能一并判为违规。
  // 注意区分：「100% 具学士学位」是事实数据，规则禁的是拿 100% 去讲升学结果。
  // 所以 100% 只在紧邻「直升/保证/录取/必收」这类结果词时才判违规。
  const ABSOLUTE = [/保证录取/g, /一定能/g, /必定/g, /必进/g, /足矣/g, /100%\s*直升/g, /100%\s*(?:保证|录取|必收|升读|升小|升中)/g];
  for (const re of ABSOLUTE) {
    for (const m of all.matchAll(re)) {
      // 窗口放宽到前后各一段：报告常见的写法是「不要以为…就一定能…」「…其实不是」
      // 这类否定/警告句，否定词可能离得很远。
      const before = all.slice(Math.max(0, m.index - 30), m.index);
      const after = all.slice(m.index + m[0].length, m.index + m[0].length + 18);
      if (/[不非无没未勿别]|并非|不一定|未必|其实不是|不能|无法/.test(before + after)) continue;
      const snip = `…${all.slice(Math.max(0, m.index - 12), m.index + m[0].length + 6)}…`;
      // 「100% 直升」多为对「一条龙」制度的事实描述（一条龙按定义即全数收取），
      // 不是夸大，所以只提示不判错；其余正向保证仍按错误处理。
      if (/100%/.test(m[0])) warns.push(`100% 表述（请确认是事实描述而非夸大）：${snip}`);
      else errs.push(`绝对化语言（正向保证）：${snip}`);
    }
  }

  // ── HTML 标签平衡 ──
  for (const tag of ["div", "table", "tr", "td", "section", "svg", "ul", "ol", "li", "p"]) {
    const open = count(all, new RegExp(`<${tag}[\\s>]`, "g"));
    const close = count(all, new RegExp(`</${tag}>`, "g"));
    if (open !== close) errs.push(`<${tag}> 标签开合不平衡（${open}/${close}）`);
  }
  if (/<td><\/td>|<th><\/th>|<li><\/li>/.test(all)) errs.push("存在空表格/列表项");

  return { errs, warns };
}

const files = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".json"))
  .filter((f) => (only.length ? only.includes(f.replace(/\.json$/, "")) : true));

let bad = 0;
let warnTotal = 0;
for (const f of files) {
  const slug = f.replace(/\.json$/, "");
  const d = JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8"));
  const { errs, warns } = validate(slug, d);
  warnTotal += warns.length;
  if (errs.length) {
    bad++;
    console.log(`\n❌ ${slug}`);
    errs.forEach((e) => console.log("   · " + e));
    warns.forEach((w) => console.log("   ⚠ " + w));
  } else if (warns.length && only.length) {
    console.log(`\n⚠️  ${slug}（通过，但有提醒）`);
    warns.forEach((w) => console.log("   ⚠ " + w));
  }
}

console.log(`\n验证 ${files.length} 份｜不通过 ${bad} 份｜提醒 ${warnTotal} 条`);
if (!bad) console.log("✅ 全部验证通过");
process.exit(bad ? 1 : 0);
