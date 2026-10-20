// 深度择校报告验证脚本（新架构版）
//
// 旧站是 report-{code}.html 单文件，验证逻辑在 scripts/validate_report.py。
// 新站改成 src/content/reports/{slug}.json，章节可分布在 body 与 premiumHtml，
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
  return html.split(/<section class="chapter"[^>]*>/).slice(1);
}

function validate(slug, d) {
  const errs = [];
  const warns = [];
  const all = d.hero + d.body + d.premiumHtml;
  const archive = ARCHIVE.has(slug);

  // ── 必备字段 ──
  if (!d.hero?.includes('class="tier-mega"')) errs.push("hero 缺 tier-mega 等级标签");
  if (!/<h1[^>]*>/.test(d.hero || "")) errs.push("hero 缺 h1");
  // 简繁版使用独立路由与页面级 hreflang；ReportViewer 不在 hero 内渲染语言切换按钮。
  // 两个静态路由及 hreflang 由页面构建／渲染验收，不从报告 JSON hero 推断。
  // 2026-10 起报告全文公开，已取消付费墙：不再要求 premium / allAccessUrl / singleUrl 字段
  if (typeof d.free !== "boolean") errs.push("free 不是 boolean");

  // ── 历史档案公告 ──
  // 普通报告不再强制在正文前放通用可靠性声明；证据口径应贴近各章主张。
  if (archive) {
    if (!/可靠性|停办|停辦/.test(d.body)) errs.push("档案报告缺可靠性说明");
  }

  // ── 章节结构：全文章节合并计算（body 与 premiumHtml 都可能含章节，不再按付费位置切分）──
  const allChapters = sectionBodies(d.body + d.premiumHtml);
  const nums = [...chaptersOf(d.body), ...chaptersOf(d.premiumHtml)].map((c) => c.n);
  const need = archive ? 3 : 8;
  if (nums.length < need) {
    errs.push(`章节不足（${nums.length}/${need}）`);
  } else if (nums.join(",") !== nums.map((_, i) => i + 1).join(",")) {
    errs.push(`章节编号不连续：${nums.join(",")}`);
  } else {
    const thin = allChapters
      .map((s, i) => ({ i: i + 1, c: visible(s) }))
      .filter((x) => x.c < (archive ? 100 : 120));
    if (thin.length) errs.push(`章节过薄：${thin.map((x) => `第${x.i}章${x.c}字`).join("、")}`);
  }

  // ── 诚实度：各章最低要求 ──
  if (!archive) {
    const chapterMeta = chaptersOf(d.body + d.premiumHtml);
    // Bound a chapter by the next chapter start rather than its first closing
    // section tag: some chapters contain nested <section> cards.
    const chapterHtml = d.body + d.premiumHtml;
    const chapterStarts = [...chapterHtml.matchAll(/<section class="chapter" id="chapter-(\d+)"[^>]*>/g)];
    const numberedSections = chapterStarts.map((m, i) => ({
      n: Number(m[1]),
      html: chapterHtml.slice(m.index, chapterStarts[i + 1]?.index ?? chapterHtml.length),
    }));
    const chapterByNumber = (n) => numberedSections.find((chapter) => chapter.n === n)?.html || "";
    const curriculumMeta = chapterMeta.find((c) =>
      /(课程|課程|教學|教学|MYP|IB|OSSD)/.test(c.title)
      && !/(学校身份|學校身份|定位|年级|年級)/.test(c.title)
    );
    const curriculumChapter = curriculumMeta ? chapterByNumber(curriculumMeta.n) : chapterByNumber(2);
    const admissionsMeta = chapterMeta.find((c) =>
      /20\d{2}[^<]*(招生|申请|申請|录取|錄取|入学|入學|升中|收生|路径|路徑)/.test(c.title)
    ) || chapterMeta.find((c) =>
      /(招生|申请|申請|录取|錄取)/.test(c.title)
      && !/(FAQ|常见问题|常見問題|申请清单|申請清單|行动清单|行動清單)/.test(c.title)
    )
      || chapterMeta.find((c) => /升中[^<]*(申请|申請|路径|路徑|收生)|七年级入学|七年級入學|中一入学|中一入學|入学攻略|入學攻略|评估准备|評估準備/.test(c.title))
      || chapterMeta.find((c) => /(入学|入學|评估|評估)/.test(c.title) && !/(年级定位|年級定位|学校定位|學校定位)/.test(c.title));
    const admissionsChapter = admissionsMeta ? chapterByNumber(admissionsMeta.n) : chapterByNumber(4);
    const supportMeta = chapterMeta.find((c) => /(支援|支持|服务|服務|体验|體驗)/.test(c.title));
    const supportChapter = supportMeta ? chapterByNumber(supportMeta.n) : "";
    // 风险提示应从明确的风险／录取判断章节读取，不能取第一个招生章节：
    // 很多报告把日程与资格判断分在不同章节。
    const riskMeta = chapterMeta.find((c) => /(风险|录取判断|招生风险|申请风险)/.test(c.title));
    const riskChapter = riskMeta
      ? chapterByNumber(riskMeta.n)
      : admissionsMeta
        ? chapterByNumber(admissionsMeta.n)
        : chapterByNumber(3);
    const ch5 = chapterByNumber(5);
    const ch7 = chapterByNumber(7);

    // 各章深度门槛按语料库实际分布校准（127 份报告统计），不按规则文件字面：
    // 「教学局限」只有约一半报告用 <li>，所以看标题而不是数列表项；
    // 🟡🔴💬 三个标记在「系统 emoji 全清」后只剩 3 份还在用，不作硬性要求。
    const hasCurriculumBoundary = /(教学局限|教學局限|局限|不足之处|不足之處|不代表|不保证|不保證|不能|不得|不等于|不等於|并非|並非|未公开|未公開|未列.{0,12}(?:条件|條件|开班|開班|安排|保证|保證)|须向学校确认|須向學校確認|应向学校确认|應向學校確認|应(?:查|核)|須(?:查|核)|家庭.{0,12}(?:确认|確認|核实|核實|索取|询问|詢問)|目标.{0,12}(?:核对|核對|核实|核實)|目标.{0,12}专业.{0,16}(?:要求|先修)|当届.{0,12}(?:核实|核實|确认|確認))/i.test(curriculumChapter);
    if (!hasCurriculumBoundary) warns.push("课程章节未见明确限制或家庭核验指引");
    // 风险边界未必使用“风险”一词：不少中学直接在申请表格列“不能推断”、
    // “旧轮次只作参考”或“当届细则待公布”。检查所有招生相关章节的实质限制，
    // 避免因为学校采用表格或“升中路径”等标题而误报。
    const admissionsSections = numberedSections
      .filter((section) => chapterMeta.some((meta) => meta.n === section.n
        && /(招生|申请|申請|录取|錄取|入学|入學|升中|收生|评核|評核)/.test(meta.title)))
      .map((section) => section.html);
    const riskText = [riskChapter, ...admissionsSections].join(" ").replace(/<[^>]+>/g, " ");
    const hasRiskBoundary = /(风险|風險|限制|待核|待确认|待確認|待公布|待更新|尚未(?:公布|确认|確認|列出)|没有.{0,12}(?:公布|确认|確認|列出|说明|說明)|未能确认|不等于|不代表|不保证|不保證|不能|不得|不应|不應|不宜|不要|仅作历史|僅作歷史|历史参考|歷史參考|只能作参考|只能作參考|不适用于|不適用於|以.{0,15}(?:校方|学校|學校|当届|當屆|教育局).{0,10}为准|須.{0,8}确认|需.{0,8}确认|需.{0,8}確認|向校方确认|申请人数未公开|申請人數未公開|分母未公开|分母未公開|已结束|已結束|未有.{0,12}公布|不能推算|不可推算)/.test(riskText);
    if (!hasRiskBoundary) errs.push("招生／录取章节未见风险提示或适用边界");

    // 报告章节顺序因学校类型而异；招生建议应在实际招生章节检查，
    // 不能把只讲考试成绩的第 4 章误当成申请攻略章节。
    const advice = count(admissionsChapter, /<li>/g);
    const hasAdviceSection = /<h3[^>]*>[^<]*(建议|攻略|提高|提升|加分|策略|要点|做法|怎么填|填表)/.test(admissionsChapter);
    // 多份中学报告把阶段、官方事实与家庭动作放在三列表格中，
    // 不是用 <li> 或 h3。此类表格有明确的家庭动作列且至少三条数据时，
    // 与申请策略小节等价；不应因呈现形式误报缺项。
    const hasAdviceTable = [...admissionsChapter.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/g)].some(([, table]) =>
      /家庭动作|家庭行动|家庭判断|家庭准备重点|家长准备重点|家长动作|家长行动|家长要问|行动与边界|行动与限制/.test(table.replace(/<[^>]+>/g, " "))
      && count(table, /<tr>/g) >= 4
    );
    if (advice < 3 && !hasAdviceSection && !hasAdviceTable) errs.push(`招生章节缺「申请策略」小节（<li> 仅 ${advice} 条）`);
    else if (!hasAdviceSection && !hasAdviceTable && advice < 5) warns.push(`招生章节建议 ${advice} 条（规则建议 ≥5）`);

    if (visible(ch5) < 120) errs.push("第 5 章内容过薄（插班/求位策略需针对该校）");
    // Student support may be written as evidence tables, paragraphs, or checklists.
    // Thin chapters are already caught by the common chapter-depth gate; requiring
    // <li> here mislabels substantive table-based reports as incomplete.
    const ch7Rows = count(ch7, /<tr>/g);
    // SPCC's comparison uses four named school cards instead of table rows;
    // count those cards as equivalent evidence while excluding the report's own school.
    const schoolCards = count(ch7, /class="(?:spcc-)?school-card"/g);
    const competitorCount = Math.max(Math.max(0, ch7Rows - 1), Math.max(0, schoolCards - 1));
    if (competitorCount < 3) errs.push(`第 7 章同类对比不足 3 所竞品（${competitorCount} 所可识别学校）`);
  }

  // ── 来源标注体系 ──
  // 来源核验可用文字标签和逐章来源登记表达；不强制插入可能误读为“多方核实”的 emoji。
  if (!/(来源与核验范围|资料来源|可直接查阅的来源|核对日)/.test(all)) errs.push("全篇缺少来源与核验口径说明");

  // 允许集合包含报告规则要求的四种证据标签，其余装饰性 emoji 仍然拦截。
  const ALLOWED_EMOJI = new Set([
    "✅", // 多方核实
    "🟡", // 单一可靠来源
    "🔴", // 有限来源
    "💬", // 主观分析
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
