# 港学荟线上网站 SEO 审计｜2026-10-19

## 范围与判断口径

本次审计直接读取 `https://hkschool.guide` 的线上响应，不把本地工作区当作已发布内容。依据 `seo-review` 的五步框架检查搜索意图、页面信息、直接答案、内链与技术信号。该技能原为英文 JavaScript 教程设计，其「标题 50–60 字符」「首 200 字有代码」「1,500 英文词」「标题以 in JavaScript 结尾」及满分 30 分不适用于香港学校报告；这里不制造总分。Google 对标题和摘要也没有技能所写的固定字数限制，关键是准确、清楚、对应页面和查询。[Google 标题说明](https://developers.google.com/search/docs/appearance/title-link) · [Google 摘要说明](https://developers.google.com/search/docs/appearance/snippet)

实际覆盖：线上 `robots.txt`、`sitemap.xml` 全部 516 个网址及语言配对；逐页抓取繁体版 178 份报告、51 篇博客、23 个首页／索引／分区入口和其余工具页；另查简体对应页与个人功能页。检查 HTTP 状态、标题、摘要、H1、canonical、robots、JSON-LD 和 HTML 内链。旧 Google Search Console CSV 覆盖 2026-10-11 至 10-17；本次线上抓取在 10 月 19 日，因此旧点击率不能证明当前标题版本的效果。CSV 的查询表只导出 2 次点击／374 次曝光，不能将某个查询可靠地归到某个页面。

## 总览

| 检查项 | 线上结果 | 判断 |
| --- | --- | --- |
| sitemap | 516 个唯一 URL，繁简各 258；178 份报告、51 篇博客 | 语言版本齐全，无重复网址 |
| hreflang | 516 项均有互相对应的 `zh-Hant-HK`、`zh-Hans` 和 `x-default`；抽查页面的 `html lang` 也对应 | 已具备基本双语结构 |
| 内容页可用性 | 178 份报告、51 篇博客全数 HTTP 200、各有 1 个 H1、各自 canonical 指向自身 | 主内容页没有发现系统性阻收录问题 |
| 搜索流量 | 上期页面表中报告详情页 57 次点击／1,452 次曝光，约占全站 81 次点击的 70%；博客 23／649 | 报告是点击主力，不能把短期低 CTR 个例当作整站结论 |
| 移动端性能 | PageSpeed Insights 公开接口对首页和报告页均返回 HTTP 429 | 本次无法给出 Core Web Vitals 或 Lighthouse 结论；不以 HTML 体积冒充性能分数 |

## P0｜先修的线上问题

### 1. 独立页面错误指向首页 canonical

- [`/compare`](https://hkschool.guide/compare) 在 sitemap 内，有独立的「2–3 所学校并排对比」内容，却输出首页标题、首页摘要和 `https://hkschool.guide` canonical；[`/cn/compare`](https://hkschool.guide/cn/compare) 则有独立标题和 self-canonical。繁简信号不一致。
- [`/planning`](https://hkschool.guide/planning) 与 [`/cn/planning`](https://hkschool.guide/cn/planning) 都有独立的升学规划内容，却使用首页标题、首页摘要并 canonical 到各语言首页；两者均不在 sitemap。
- 处理：分别生成与页面内容相符的繁简标题、摘要和 self-canonical；将规划页列入 sitemap，并确认双向 hreflang。Google 将 canonical 视为较强信号，sitemap 中列出与 canonical 不一致的网址会互相矛盾。[Google 规范网址说明](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) · [sitemap 说明](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

建议标题方向：`香港學校對比｜學費、評級與升學通路｜港學薈`；`香港升學規劃｜K1 至中學的擇校路線｜港學薈`。正式文案应以页面当前功能为准，不加入页面没有提供的录取预测。

### 2. 个人／退役工具页仍显示可收录

- [`/cn/tools/p1-simulator/report`](https://hkschool.guide/cn/tools/p1-simulator/report) 是用户个人志愿体检结果页，线上输出 `index, follow`；繁体对应页输出 `noindex, nofollow`。
- [`/unlock`](https://hkschool.guide/unlock)、[`/cn/unlock`](https://hkschool.guide/cn/unlock)、[`/shortlist`](https://hkschool.guide/shortlist)、[`/cn/shortlist`](https://hkschool.guide/cn/shortlist) 在线上仍可收录。繁体的 `/unlock`、`/shortlist` 还继承首页标题及 canonical；简体有自己的标题和 canonical。`robots.txt` 禁止抓取 `/unlock`，但 Google 如不能抓取页面，便看不到其 `noindex`。[`/redeem`](https://hkschool.guide/redeem) 已有 noindex；简体兑换页虽 noindex，标题仍是旧「兑换码兑换」。
- 处理：个人结果及清单页输出可被爬虫看到的 `noindex`；已退役的解锁／兑换流程按真实产品去向决定永久跳转、410 或 noindex。不要仅靠 robots 禁止抓取来阻止索引。[Google noindex 说明](https://developers.google.com/search/docs/crawling-indexing/block-indexing)

### 3. 高需求学校文章存在可核实的过期事实

- [`德望小学攻略`](https://hkschool.guide/blog/good-hope-primary-guide) 的线上标题、摘要及正文仍写学费「$47,500 起」，而校方公布的 2026/27 收费为小一至小三每月 $5,650、小四至小六每月 $5,750，分 10 期，即每年 $56,500／$57,500。[德望小学收费与校情](https://www1.ghs.edu.hk/admission/schoolinformation/)。GSC 上期该页 183 次曝光、1 次点击，但页面查询归属不能从本次导出证明。
- [`学之园攻略`](https://hkschool.guide/blog/lh-kg) 的线上繁简标题／摘要及正文仍写 K1–K3 学费「$84,000 起」；校方 2026/27 表按 12 期列出，最低的半日粤英班为 $7,300×12＝$87,600，普英班最低 $7,600×12＝$91,200，不同校区还有更高收费。[学之园校方收费表](https://www.learninghabitat.org/zh-hk/admission/fees)。
- [`拔萃男书院报告`](https://hkschool.guide/reports/dbs) 在网页 `<title>` 和 H1 中只写「拔萃男書院」，但正文及搜索意图是小学部；《小学概览2026》的正式校名是「拔萃男書院附屬小學」。[小学概览2026](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=78)。
- 处理：先改事实、时间和学校身份，再改标题与摘要；同步检查可见 H1、正文表格及相关报告，避免搜索摘要和内容互相矛盾。不可只换关键词。上述事实修订已存在于本地工作区的部分文件，但**这次线上审计证实它们尚未体现在受检线上页面**。

## P1｜内容与标记的系统性问题

### 4. FAQ 结构化资料与可见问答不一致

51 篇线上博客中，20 篇输出 `FAQPage` JSON-LD。抽查 [`St. Catherine 面试`](https://hkschool.guide/blog/stcat-interview)、德望、学之园及 [`幼稚园资助`](https://hkschool.guide/blog/kg-subsidy-guide) 四篇时，结构化资料分别包含 5、5、7、5 组问题；在各自服务器返回的可见 HTML 文本中，完整问题和答案都没有出现。应只为页面上确实呈现的问答输出标记，或撤掉这类 FAQ 标记，保留准确的 Article 标记。Google 要求结构化资料代表读者可见内容；正确标记本身也不保证富结果。[Google 结构化资料准则](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### 5. 标题机械截断与报告摘要同质化

- 51 篇线上博客中，33 篇 `<title>` 含实际字符 `…`，例如 St. Catherine 面试、德望及学之园文章；这不是浏览器视觉截断，而是 HTML 标题本身被截断。应逐页写完整、简洁的标题，尤其保留学校名、学段、年份和用户要解决的问题。
- 178 份报告的标题全部落在两种后缀模板：小学 120 份为「評級、學費與升學」，幼稚园 58 份为「評級、學費與面試」。摘要也分别复用两段几乎相同的模板，只有校名和学段变化。Google 建议避免重复样板标题并生成具体、准确的页面描述。[标题建议](https://developers.google.com/search/docs/appearance/title-link) · [摘要建议](https://developers.google.com/search/docs/appearance/snippet)
- **不建议立刻批量改写 178 个报告标题。** GSC 10 月 11–17 日数据显示报告为主要点击来源，其中 `rcps` 9／93、`stcat` 8／67、`braemar-hill` 3／32；旧表现不能直接用于评估 10 月 19 日看到的当前标题。先取「查询 × 页面」组合数据，对事实有误或高曝光低点击的页面逐个修订，记录上线日期，再看 28 天趋势。

### 6. 两份报告缺少可抓取的 HTML 内链

对线上 sitemap 的全部 258 个繁体 URL，外加 `/planning` 与资料方法页，逐页检查服务器返回的 `<a href>`。未找到任何指向 [`保良局譚歐陽少芳紀念幼稚園`](https://hkschool.guide/reports/plk-tam-au-yeung-siu-fong) 和 [`德萃幼稚園`](https://hkschool.guide/reports/st-hilarys-kg) 的内部 HTML 链接；它们只在 sitemap 中被发现。JavaScript 交互后生成的链接不在本次 HTML 计数内，因此这里称「HTML 内链缺口」，不断言 Google 完全无法抓取。其余 176 份报告至少从一个受检入口或内容页可达。应在报告目录、所属分区和相关学校对比中加入描述性链接。

### 7. 页面开头的直接答案可以更贴近家长搜索

报告正文有丰富章节和评级，但多份页面首屏在校名后先出现咨询二维码、下载／收藏和较长的核验说明，家庭最关心的「学段与办学类别、所在地区、当届学费、升学路线的判断」需要再往下看。可在报告头部用短表或 2–3 句放置**已核实事实 + 专家判断 + 适合的家庭条件**，并标学年与来源。幼稚园报告应优先回答教学语言、升小成果与入读难度；小学报告应优先回答升中通路、收生类别与成本。此为内容可读性和搜索意图建议，不保证获取精选摘要，也不应照搬技能要求的 JavaScript 代码示例或英文定义长度。

## P2｜结构清理与未测事项

- 首页繁简两版各有两个 H1：「港學薈 · 香港擇校數據與學校報告」及「先看方向，再選學校」。两者不是重复文案，但主标题层级不够明确。保留最能概括首页搜索意图的一个 H1，其余改为 H2；这是结构清理，不能单独推断会提升排名。[Google 标题来源说明](https://developers.google.com/search/docs/appearance/title-link)
- [`资料来源与评估方法`](https://hkschool.guide/about/data-methodology) 有独立标题、self-canonical 和内部链接，却未列入线上 sitemap。可在修复 `/planning` 时一并纳入；sitemap 是发现和规范网址信号，不是收录保证。
- 旧 Search Console 页面表有 14 个 `.html` URL，合计 55 次曝光、4 次点击。本地上次核查均永久跳转，但本轮没有逐个重新验证线上旧 URL；需要在 GSC URL 检查中确认 Google 选择的新规范网址。旧 URL 的短期曝光不能单独证明重复索引。
- PageSpeed Insights 未返回指标（HTTP 429）。尚未审计真实 LCP、INP、CLS、移动端可用性或 JS 渲染后的交互路径；不应把本报告当作性能验收。

## 执行顺序与复核

1. 修复规划和对比页面的 canonical／标题／摘要及 sitemap；确认繁简互指。
2. 处理个人结果、清单及退役解锁页面的索引规则，按真实去向选择 noindex、跳转或 410；线上再次读取响应。
3. 发布经过事实核对的德望、学之园和男拔小学内容更新，并对照学校官方资料逐项验收。
4. 让 FAQ 标记与可见正文一致；给两份缺少 HTML 入口的报告增加自然内链。
5. 对博客的硬截断标题及报告模板做**逐页**改写，优先高曝光学校；保存原题、上线日期和页面级 GSC 基线。至少观察 28 天，分繁简与设备分析。

本报告是线上 SEO 审计，没有修改或发布网站代码。当前本地工作区包含大量其他未验收报告；实施时需隔离本轮修复，不能直接将整个工作区部署。
