# AI 可发现性与可引用性审计

审计日期：2026-10-25（香港）。基线：6007a7d1，对应已核实的生产版本 dpl_98wSWe4ECQeFpf9LidnAwbELpZtu。范围：公开页面模板、robots、llms 导航、资料方法及共享的线上 HTML 快照。此文是可访问性与内容准备度审计，不是实际 AI 引用率、排名或流量效果评测。

采用 geo-audit 的爬虫、可引用性和平台检查方法。skill 中把 GPTBot 当作 ChatGPT Search 爬虫、把 ClaudeBot 当作 Claude 搜索爬虫的表述不正确，本轮以运营商最新文档校正；不采用未经验证的“固定段落词数即可提升引用率”或固定增长承诺。

## 结论

共享线上抽样共44个URL（其中一个错误猜测的专题路径是审计探测项，不是站内坏链），sitemap含5,038个唯一URL，语言对应条目无缺失；三学段学校资料页为幼稚园958、小学648、中学587。这是该部署目录数量，不推定等于所有在营校址数量。

未发现 robots 级别的公开页面屏蔽。最明确的共性缺口是：机器导航和资料方法仍按旧版小学／幼稚园数据库描述站点，不能准确解释已上线的三学段学校资料与深度报告。旧数据资产本身保留历史价值，但必须标明范围，避免被人或模型误当作当前全量目录。

| 优先级 | 基线证据 | 对引用的影响 | 处理 |
|---|---|---|---|
| 高 | `public/llms.txt:16-26` 未提中学或三学段资料页，称旧 JSON 为“全量”，把 API 作为入口 | 容易沿旧资产理解全站，且 `/api/` 被 robots 阻止 | 本地修复：改为现有三学段、报告、文章、方法页导航；API 不再作为爬取入口 |
| 高 | `MethodologyPage.tsx` 基线第35行只说明 PSP/KGP，第96行用2026-09-04统称网站快照 | 与学校位置2026-09-30及登记2026-10-23不一致，削弱日期可解释性 | 本地修复：分开位置、登记、概览、报告与历史 JSON 的日期和范围 |
| 中 | 学校资料页头是全校通用说明，核心事实在后方；元描述只替换校名 | 独立摘取时学校、地区、办学类别、语言的关系不够直接 | 建议按已有事实生成短摘要，不填充未知字段，不把校方理念写成外部成效 |
| 中 | 旧 JSON `meta.updated=2026-09-04`，reports 数组实际126 | 若直接改导航中的126为228，会制造数据资产范围错误 | 保留真实126，明确“旧版工具快照”，现有名录和报告页为查阅入口 |
| 待测 | 无本轮经过验证的 AI 引用、引荐转化或爬虫请求历史 | 不能判断是否已被 AI 使用及优化是否有效 | 建立平台、问题、URL、时间、引用、点击、转化分开记录的基线 |

## 共享线上样本核对

- 已保存样本44个，HTTP200为43个；其中 `/shortlist`、`/unlock` 的noindex是低价值个人/交易界面控制，非学校内容屏蔽。其余41个成功HTML样本未标noindex。
- 共享快照的来源：`audit.json` 保存抓取URL、时间、响应、canonical、语言对应、schema和本地HTML文件名。单次抓取耗时不作CWV或用户真实体验成绩。
- 生产sitemap有5,038个唯一URL，语言对应条目缺失0；它不能证明这些URL已进入Google/Bing索引。

## 机器人访问判断

线上共享快照 `/private/tmp/hkschool-seo-geo-20261025/robots.txt` 与 `src/app/robots.ts` 相符：`User-Agent: *`、`Allow: /`、`Disallow: /api/`，指向正式 sitemap。以下只代表 robots 规则允许公开 HTML；不代表已经收到真实爬虫访问，也不代表 WAF、网络或搜索平台一定能抓取。

| 爬虫或控制项 | 角色（按官方文档） | 本站公开页 robots |
|---|---|---|
| Googlebot | Google Search 与其中的 AI 功能抓取控制 | 通配规则允许 |
| Bingbot | Bing 搜索索引 | 通配规则允许 |
| OAI-SearchBot | ChatGPT 搜索 | 通配规则允许 |
| GPTBot | 可用于模型训练的抓取，与搜索独立 | 通配规则允许；本轮不改变训练偏好 |
| ChatGPT-User | 用户发起访问；不是搜索索引控制项 | 无特定限制，不能由此判断搜索展示 |
| Claude-SearchBot | Claude 搜索索引 | 通配规则允许 |
| Claude-User | 用户发起访问 | 无特定限制 |
| ClaudeBot | Anthropic 模型训练相关 | 通配规则允许；本轮不改变训练偏好 |
| PerplexityBot | Perplexity 搜索展示 | 通配规则允许 |
| Google-Extended | Google 部分非搜索训练及 grounding 控制 | 不用它判断 Google Search / AI Overview 收录 |

不增加单独的“Allow all”组：如果专用组没有重复 `/api/` 限制，反而可能绕开现有低价值路径限制。也不因 GEO 而修改训练爬虫策略或放宽安全防护。若有实际拒绝日志，应先核对官方爬虫验证方式及请求 IP，再定位规则。

## 可引用内容标准

1. 学校事实摘要至少独立包含校名及学段；办学类别、地区等只从已核实字段提取。
2. 关键比例保留学年、分母、统计口径；成绩门槛不等于录取率，在读人数不等于年度招生名额。
3. 校方课程理念注明学校自述；匿名评论保留平台、时间、样本边界，不能推为整体共识。
4. 简明资料页解决身份、校址、收费、语言等事实检索；深度报告解决家庭取舍、代价及行动。标题和摘要按此分工，不能互相 canonical 到另一种页面。
5. 来源与日期应靠近对应事实；已有 `ReportSourcePanel` 的来源类型、适用资料和查阅日期应保留，不能只把一串链接移到机器文件中。
6. 不为追求某个英语词数把中文报告改成长模板；清晰的短结论、条件和证据比机械段落长度更有用。

## 本轮已实施的限定修复

- `public/llms.txt`：三学段、资料页与深度报告用途分开；增加现有专题、方法和 sitemap；删除旧 API 抓取入口；保留旧 JSON 的真实126份报告范围。
- `src/components/MethodologyPage.tsx`：补教育局位置、登记、SSP来源；分别说明快照、概览及报告日期；保留原版式和原有评级限制；把 JSON 按钮标明历史资产。
- 以上为本地变更，未发布，不据此声称搜索结果已更新。

## 证据限制

- 普通 HTTP200或更换 User-Agent 只能测请求结果，不能证明是真实 AI 爬虫通过；本轮未改变 WAF。
- 搜索样本中旧 `/cn` 摘要仍出现126份与旧付费文案，搜索工具标为上月抓取。这是缓存时效信号，不能据此宣称当前页面仍有付费墙。
- 品牌检索出现保险资料中的同名「港學薈」服务，没有证据与本站相关；不能把其权威或组织关系归到本站，不能加入 sameAs。
- 本轮不输出合成 GEO 分数；真实索引、平台引用、品牌外部覆盖和引荐转化缺少完整测量，不能用技术准备度替代。

## 本轮核对的官方依据

- [Google：AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)：传统 SEO 原则继续适用，无额外专用 AI 文件或特殊 schema 要求；AI功能仍需可索引并允许摘要。Search Console 的 Web 数据包含这些流量，不能直接拆为独立 AI 曝光。
- [OpenAI：Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)：OAI-SearchBot 用于搜索，GPTBot 用于训练相关抓取，两者设置独立；ChatGPT-User不是搜索收录控制项。
- [Anthropic：网站爬虫及控制说明](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)：区分 ClaudeBot、Claude-SearchBot 和 Claude-User。
- [Perplexity：Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)：区分搜索机器人与用户发起访问；如定位WAF拒绝，应结合官方IP与UA核对。
