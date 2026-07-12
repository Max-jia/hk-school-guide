# 幼稚园深度择校报告生成技能

为任何一所评级幼稚园生成与宝山/创价同质量的深度择校报告（8 章结构，HTML 格式，含核实度标注体系）。

## 调用方式

```
/skill kindergarten-report 学校名称
```

或直接说「用 kindergarten-report 技能生成 XX 幼稚园的报告」。

---

## 流程（6 步）

### 步骤 1：数据采集

从项目数据库 `data/schools_kindergarten.json` 拉取目标学校的所有字段：
- `name_zh / name_display / district_zh / tier / kg_type / fees / fee_year / teacher_ratio / teaching_language / has_pn / sessions / feeder_primary / note / is_free_scheme / lang_mand / lang_eng / category_zh`

### 步骤 2：社交媒体口碑搜索

**必须搜索的关键词组合**（每所学校至少 3 组）：

1. `site:edu-kingdom.com {校名} 評價 好唔好 用家 2023 2024 2025`
2. `site:edu-kingdom.com {校名} 面試 入學 經驗 分享`
3. `{校名} 面試 報名 2025 2026 入學 攻略 家長`

**香港本地权威来源**（优先引用）：
- 教育王国 (edu-kingdom.com) / 亲子王国 (baby-kingdom.com) —— 最核心的 HK 家长口碑源
- GoStudy (gostudy.hk) —— 面试攻略
- TOPick (topick.hket.com) —— 学校专题报道
- 星岛头条 (stheadline.com) —— 教育新闻
- HK01 (hk01.com) —— 家长访问

**不用**：小红书、知乎、百度（内地来源不可作为 HK 本地口碑的唯一依据）

### 步骤 3：报告写作（8 章结构）

每章写作规范：

**第 1 章：学校定位与核心竞争力**
- 档案表：至少包含全名/地区/等级/类型/学费/师生比/授课语言/PN班/时段，每条核实数据标 ✅🟡🔴
- 专家定位分析（💬 主观）：一句话定调 + 2-3 段深度分析
- 五维雷达图（SVG）：用学校实际数据填入雷达
- 适合/不适合的孩子类型

**第 2 章：教学深度解读**
- 课程体系详解（不是罗列，是解读"为什么"）
- 师资分析（师生比 → 班级规模 → 关注度推算）
- 语言环境详解
- ⚠️ 教学局限（诚实指出，至少 3 条）

**第 3 章：升学通路全景**
- 直属/联系小学 → 升学路径
- 近年升小去向（有数据就写，没就诚实说"校方未公开"）
- ⚠️ 风险提示（至少 2 条）

**第 4 章：入读攻略**
- 录取难度评估
- 报名时间线
- 面试拆解（形式/重点/考官在找什么样的孩子）
- 专家建议

**第 5 章：插班与求位攻略**（独立成章·必须包含）
- ⚠️ 诚实说明插班机会大小（视学校而定——宝山极小 / St. Cat 有机会）
- Waiting List 求位策略（时机·内容 9 要素·频率·形式）
- K2 插班路径（申请方式·时机·面试·成功案例·如果学校接受 K2 入学）
- K3 插班（最后机会·可能性评估）
- 核心原则提示框：匹配度 > 文笔 · 有新内容才寄新信 · 一页 A4 · Reject vs Waiting 的区别
- 来源标注：Champimom 求位信指南 / 新城教育+叩门策略 / BK「過來人分享求位信」多帖交叉验证

**第 6 章：在读家庭真实画像**
- 口碑采样标注（平台/帖数/时间跨度）
- 👍 Top 5（每条标注来源）
- 👎 Top 5（每条标注来源）
- 「希望你入学前就知道」匿名分享（至少 2 条）

**第 7 章：同类校横向对比**
- 至少 3 所同级别/同区竞品
- 一表对比（等级/学费/英语/学术/特征）
- 选择决策树

**第 8 章：专家总结与建议**
- 价值判断（值不值？投入 vs 回报）
- 风险提示
- Plan B 推荐
- 一句话行动建议

### 步骤 4：核实度标注

报告中每个事实性断言必须标注：
- ✅ = 官方数据（KGP/EDB）或多个独立来源交叉
- 🟡 = 单一正规来源（媒体报道/官方信息），未经交叉
- 🔴 = 单一匿名帖/讨论区，可信度有限
- 💬 = 主观分析/专家观点

报告顶部必须有「数据可靠性声明」提示框。

### 步骤 5：自检清单（强制逐条核对，交报告前必须全部打勾）

#### A. 文件完整性
- [ ] 文件最后一行是 `</html>`，未被截断
- [ ] 声明块完整——以「不构成入学建议。」结尾（不能是「所有客观数据一经更新。」）
- [ ] 写完立即在浏览器打开验证——确认页面完整渲染

#### B. 校属性准确性（写前必核）
- [ ] 分校数：单一校舍还是连锁？几个校区？（禁止对单一校舍写「各校」「分校」等词）
- [ ] 学段：有 K1 吗？有 PN 吗？只设 K2-K3？（如基督堂）
- [ ] 性别限制：男/女/男女？（如 SPK 小學只收女生）
- [ ] 学费：以 KGP_2025 官方数字为准（禁止约数代替，除非 KGP 确实无数据）
- [ ] K1 学位数：若特定（如协恩 66、基督堂 84），必须写准确

#### C. 内容充实度
- [ ] 8 章齐全，每章有实质性内容（非一两行占位）
- [ ] 第 1 章含雷达图 SVG
- [ ] 第 4 章含面试拆解表 + 报名策略 callout + 提升录取概率建议（≥3 条）
- [ ] 第 5 章含插班/求位信攻略（针对该校校属性写，非通用模板）
- [ ] 对比表至少含 3 所竞品，附决策树

#### D. 核实度与来源
- [ ] 所有 ✅ 标注的字段确实来自官方数据(KGP/EDB)
- [ ] 🟡 标注的字段注明具体来源（哪个媒体报道/平台）
- [ ] 所有 🔴 标注的内容已改写为 hedging 语言（「据家长讨论…」「可能…」）
- [ ] 家长口碑有采样数据标注（时间跨度/帖数/平台/帖名）
- [ ] 所有金额/数字/比例标注来源
- [ ] 报告中不存在自相矛盾的陈述

#### E. 诚实度
- [ ] 「教学局限」至少列出 3 条
- [ ] 「风险提示」至少列出 2 条
- [ ] 不编造数据——无法核实的标「校方未公开」或「暂无数据」
- [ ] 不写绝对化语言（「一定」「100%」「足矣」）

#### F. 技术检查
- [ ] HTML 文件可独立打开（含完整 CSS）
- [ ] 未出现跨校复制粘贴的残留文字（如单一校舍出现「各校做法不同」）

### 步骤 6：自动验证（强制·禁止跳过）

**写完报告后立即运行验证脚本——不通过不提交给用户。**

```bash
python3 scripts/validate_report.py web/report-xxx.html
```

验证规则涵盖以下几大类：
- 文件完整性（截断检测）
- 声明块完整性
- 校属性准确性（检测「各校」等跨校复制残留）
- 内容充实度（章节数≥8 / 雷达图 / **按真实字数**：每章≥120字、入读攻略与插班章≥250字 / 对比表）
- 核实度标注（✅🟡🔴 存在 + 来源标注数）
- 诚实度（⚠️ callout 数量）
- **格式检查（章节编号连续1→8 / 无残留占位符 / HTML标签配对 / 必备区块 / 章节标题不重复）**
- 技术检查（空表格/列表项）

> 📁 **历史档案例外**：报告若含「已停办」或「历史档案」字样（如根德园），自动改用**存档标准**验证——不强求招生/插班/面试等「在校」专属章节，只保证结构健全、每章有实质内容。

**只有跑出 `✅ 全部验证通过！` 才可提交文件给用户。**

### 步骤 7：输出

生成的 HTML 文件保存到 `web/report-{slug}.html`，同时：
- 更新 `web/kindergarten.html` 中的卡片按钮逻辑，让该校链接到手工报告（而非生成器版本）
- 确保文件中的 `{校名}` 全部替换为实际校名

---

## 报告 HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-HK">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>{校名} · 深度择校报告 | 港校指南</title>
<link rel="stylesheet" href="./assets/style.css"/>
<style>
/* 报告专用样式（雷达图/表格/标注） */
.report-hero {background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);color:#fff;padding:48px 0;}
.report-hero .tier-mega {font-size:18px;font-weight:800;background:rgba(255,255,255,.15);padding:6px 16px;border-radius:20px;display:inline-block;margin-bottom:16px;}
.report-hero h1 {font-size:36px;margin:0 0 8px;color:#fff;}
.report-body {max-width:820px;margin:0 auto;padding:32px 20px 64px;}
.chapter {margin:36px 0 0;padding-top:28px;border-top:1px solid var(--border);}
.chapter:first-of-type {border-top:none;margin-top:0;}
.chapter h2 {font-size:22px;margin:0 0 16px;display:flex;align-items:center;gap:10px;}
.chapter h2 .num {background:var(--primary);color:#fff;border-radius:50%;width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
table.dt {width:100%;border-collapse:collapse;margin:12px 0;font-size:14px;}
table.dt td,table.dt th {padding:10px 12px;border-bottom:1px solid var(--border);text-align:left;}
table.dt th {background:var(--soft);font-weight:700;width:140px;color:var(--muted);}
.callout {background:var(--primary-soft);border-left:4px solid var(--primary);padding:14px 18px;border-radius:0 10px 10px 0;margin:16px 0;font-size:14.5px;}
.callout.warn {background:#fef3e2;border-left-color:var(--accent);}
.callout strong {color:var(--primary-dark);}
.callout.warn strong {color:#a0522d;}
.expert-tag {display:inline-block;font-size:11px;font-weight:700;padding:2px 8px;border-radius:12px;background:#ede7f6;color:#5b3fa0;margin-left:8px;vertical-align:middle;}
.source-note {font-size:12px;color:var(--muted);margin:4px 0;}
.radar-wrap {display:flex;gap:32px;align-items:center;flex-wrap:wrap;margin:16px 0;}
.radar-svg {flex-shrink:0;}
.radar-legend {display:flex;flex-direction:column;gap:8px;font-size:14px;}
.radar-legend .rleg-item {display:flex;align-items:center;gap:8px;}
.radar-legend .rleg-dot {width:10px;height:10px;border-radius:50%;}
.radar-legend .rleg-val {font-weight:700;margin-left:auto;}
.cta-banner {background:linear-gradient(135deg,#1f6f5c,#2a9d8f);color:#fff;border-radius:16px;padding:28px 24px;margin:40px 0 0;text-align:center;}
.pros-cons {display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.pro-box {background:#e6f0ec;border-radius:10px;padding:14px;}
.con-box {background:#fbeee1;border-radius:10px;padding:14px;}
@media(max-width:600px){.pros-cons{grid-template-columns:1fr;}}
</style></head>
<body>
<!-- 报告内容——按 7 章结构填充 -->
</body></html>
```

---

## 已完成报告清单

| 学校 | 文件 | 等级 |
|---|---|---|
| 寶山幼兒園 | report-braemar-hill.html | S |
| 香港創價幼稚園 | report-soka.html | A+ |
| 基督堂幼稚園 | report-cckg.html | S |
| 國際英文幼稚園 | report-stcat.html | S |

后续按此技能标准生成的报告应追加到此清单。

---

## 重要提醒

- **不要**在报告中编造数据。无法核实的数据诚实标注为「校方未公开」或「暂无数据」。
- **不要**用绝对化语言（"每天 20 分钟就够""100% 能进"）。
- **不要**忽略学校的负面评价——诚实比完美更重要。
- 每份报告生成后，用**步骤 5 的自检清单**逐条核对。


---

## ⚠️ 强制规则：报告语言

所有报告内容**只用简体中文**撰写。学校官方名称（name_zh）保留繁体原文不变。
