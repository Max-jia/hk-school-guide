# GEO 平台与点击测量审计

日期：2026-10-27。范围：只读检查当前代码、上一轮已上线 HTML 快照与官方外部文档；没有另行抓取本站，也没有修改代码、账户设置或发布内容。现行生产提交 e689884d，资料来自同一任务保存的生产快照。使用 geo-platform-optimizer、geo-crawlers、geo-citability 的检查框架；不采用 skill 内缺少当次核验的市场占比、固定段落字数、词数门槛或 GEO 评分。

## 结论

本站的主要缺口已经不是“缺一个 AI 文件”。公开正文服务端可读，robots 允许公开路径，三学段与32篇核心指南已有真实内链。当前最值得做的是：让报告、资料页和制度指南分别承诺清楚且有证据的价值；减少重复推广文字污染摘要；把新版效果测量分为搜索点击、AI 曝光／引用、到站及站内下一步。

Google 官方现行指导支持准确而有区分的标题、与页面相符的摘要，以及可见正文。它也明确没有专用 GEO schema 或理想段落长度，llms.txt 不是 Google 排名因素。OpenAI 当前公开说明将 OAI-SearchBot 定义为搜索抓取，GPTBot 定义为可能用于训练的抓取，两种设置独立。不能为了“GEO”擅自改变训练授权。[Google 标题](https://developers.google.com/search/docs/appearance/title-link) · [Google 摘要](https://developers.google.com/search/docs/appearance/snippet) · [Google 生成式搜索指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [OpenAI bots](https://developers.openai.com/api/docs/bots)

## 已核实的本站情况

|位置|实际观察|判断与建议|
|---|---|---|
|src/app/robots.ts|`User-agent: *`允许`/`，只禁止`/api/`；没有单独的 AI bot 规则|公开文章、报告和资料页不存在代码层面的机器人全面阻断。保留现有政策，不把“没有单列 OAI-SearchBot”误报成被阻止；CDN 对真实机器人 IP 的情况尚未测量。|
|src/components/GoogleAnalytics.tsx；两语种 layout|存在一个 GoogleAnalytics 组件，设置 GA4 并异步加载 gtag|代码存在不等于 GA 后台已收数据，未进入账户核验。GA ID 在 HTML 出现两次（config及脚本URL）不等于重复触发page_view。|
|src/components/blog/BlogRelatedLinksAnalytics.tsx|有`blog_related_view`与`blog_related_click`，附文章、位置、组别和目标路径；折叠内容展开并进入可视范围才记录view|这已经可以度量侧栏的站内阅读路径。不要重做一套埋点，亦不要把click/view当作GSC搜索CTR。|
|public/llms.txt|日期为10/25，仍只有幼稚园和小学六个专题，未列中学申请／选校／课程三个新专题|可补齐现有中学专题和三学段完整指南入口，使用真实当前日期。收益是导航一致，不能称作Google排名或AI引用率提升。|
|src/components/SiteFooter.tsx|所有页面重复“669所小学 +949所幼稚园”，没有说明这是旧工具范围；当前名录为648／958／587|优先消除口径歧义。可改成描述真实工具用途的句子，或明确写工具快照范围；不要把旧工具覆盖数当当前学校名录总数。|
|报告meta（stcat、braemar-hill生产快照）|标题共用“课程、学费与K1入读”，摘要共用“深度择校报告，整理…附家庭适配…以当届为准”|页面类型虽有区分，但缺少各校具体价值。可由已有核实字段／报告判断提炼一项差异，保留学段身份，避免为所有学校自动套“排名、升学率、入读难度”等不一定有充分证据的词。|
|32篇核心指南生产快照（K09/P05/S12）|已有明确问题、开头判断、目录、比较表、具体动作、FAQ及来源|保留已确认的顾问语气，不为GEO机械改成每段同长或每个标题问句。制度、年度、统计分母仍要与结论同段可读。|
|src/components/MethodologyPage.tsx|有来源、日期、责任、评级非官方、引用及更正说明|保留。没有实际专家履历／第三方背书时，不补造Person、学历、评分共识或百科条目。|

## 本轮适合落地的共同修订

1. **报告与资料页区分价值。** 资料页标题／摘要优先识别学校、地区、类别及确实已公开的费用／语言；报告优先表达已经论证的课程或路径取舍。制度指南回答申请行动，不能让三类页面都争同一句泛标题。标题不承诺取录、不把平台 Banding 写成官方，也不单纯添加新年份伪装更新。
2. **控制重复推广片段。** 可在重复页脚推广文字、咨询二维码宣传句等外围内容的`div`／`section`／`span`上使用`data-nosnippet`，保持内容对用户可见。Google对此只支持这三类元素，不直接加在`footer`上；不要将学校事实、来源、收费年份、风险限制或整篇正文排除。实际Google摘要是否变化必须再观察，不能保证采用meta description。
3. **补齐机器导航，保持小规模。** llms.txt只补三个中学专题和现有10／10／12指南入口，不批量生成数千份“AI专用摘要页”，不新建与现有页面竞争的近重复内容。
4. **事实摘要与必要限制相邻。** 涉及学费写适用年度、升学比例写分母及考获／入读，评级写参考性质。不能为了让答案“更肯定”删掉关键条件；那会增加AI误引和家庭误判风险。
5. **保留准确术语。** “332A”“22222”“自行／统派”“免费计划”等首次解释的做法继续使用；不要把术语密度高当专业度或可引用性。

以上只是可实施的页面改良，没有预测CTR提升百分点，没有把示意样本当真实家长访谈，也没有把代码存在当Google收录或AI引用证据。

## 官方文档出现的新变化与边界

- [Google AI-features页](https://developers.google.com/search/docs/appearance/ai-features)仍写AI功能流量计入Search Console的Web搜索数据。
- 但Google的[现行生成式搜索指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)已链接[Generative AI performance report帮助页](https://support.google.com/webmasters/answer/16984139)。后者当次全文明确写2026-08-31起全球提供，列AI Overviews／AI Mode曝光、页面、国家、日期和设备，并说明它属于Web Performance数据子集；曝光不足可能不显示。**这次不应继续断言“GSC没有可单独看AI曝光的报告”。** 账户是否已有报告及是否已纳入相关生成式功能尚未查看，不能宣称已开启或有数据。
- 此新报告文档描述的是曝光，不能仅据它计算AI点击率；不能与Web合计相加当成额外曝光。没有当期导出，不推断本站AI曝光为零。
- OpenAI此前的`help.openai.com/en/articles/12627856`（含旧publisher FAQ slug）本次均重定向Atlas retirement，搜索结果仍返回旧FAQ缓存。**不再用该URL支持“所有ChatGPT引荐都会自动带utm_source”的当期断言。** 当前[ChatGPT Search官方页](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt)和[bots文档](https://developers.openai.com/api/docs/bots)仍明确搜索抓取条件与不保证展示；未据搜索缓存补推平台归因规则。

## 以点击率为目标的测量方案

### 四种指标必须分开

|目标|数据源与计算|不能据此宣称|
|---|---|---|
|Google搜索点击率|GSC Web：点击数÷曝光数；按查询×页面、设备、国家及排名区间观察|站内点击增多就是搜索CTR提高；平均排名不变就等于每个查询排名没变|
|Google生成式功能曝光|如账户可用，导出Generative AI performance report，分页面／设备／国家观察|曝光就是引用准确或有人到站；与Web曝光相加|
|AI引荐到站与阅读|GA4 Traffic acquisition的Session source/medium及landing page；核对实际referrer／UTM，观察engaged sessions和后续动作|所有direct都来自AI；所有引用都产生访问；候选来源域名等于当期实际来源|
|站内继续阅读|现有blog_related_click、blog_related_view按article/placement/group/target分析；必要时再扩到名录的已确定入口|此比率是Google搜索CTR；某次鼠标点击是一个独立用户|

GA4已有归因处理，先做报表／探索，不必新增冗余的“AI到访”事件。若要补充事件，只传分类与规范化路径，不采集孩子资料、自由文本、完整搜索词或不必要的完整referrer。[GA4 Traffic acquisition](https://support.google.com/analytics/answer/12923437?co=GENIE.Platform%3DDesktop&hl=en) · [GA4来源维度](https://support.google.com/analytics/answer/15567068?hl=en)

### 固定观察口径

1. 项目10/20导出实际覆盖9/20—10/17，Filters为`Web (text-based)`／Last28days，不能衡量10/27刚上线的32指南或这次优化效果。
2. 当前旧设备表是移动端184点击／5081曝光、桌面93／2804，但平均位置分别9.55／14.4；不能把两种CTR直接作为同排名设备实验结论。
3. 上线日记录准确提交、修改页面族与真实改动范围，不以抓取日重写全站lastmod。待Google实际重抓后比较相同完整周期；优先同查询×页面×设备×国家及相近位置区间。
4. 报告Σ点击／Σ曝光，不平均各行CTR。同步报告点击与有效曝光；新主题扩展造成总体CTR下降但点击增加时，不以删页／noindex压低曝光制造好看的CTR。
5. 低样本先汇总同意图页面族，避免根据一两次点击反复改标题。全站统一修改缺少随机对照，只能先报告观察差异，不能归因为优化的因果效果或统计显著提升。
6. AI可见性另固定一组真实家长问题，分语言、平台、日期记录是否引用本站、引用URL、支持结论是否准确，以及独立的到站记录。不在问题中先塞本站URL再将复述算自然命中。未执行外部AI测试时，保留“未测”，不造GEO总分。

## 验收建议

- 批量验证所有改过模板的标题／摘要唯一性、实际字段存在、两语种与页面类型区分、canonical／hreflang不回归。
- 看真实桌面及手机文字，不以字符数阈值替代可读性。Google标题与摘要显示按设备宽度变化，没有固定英文50—60字符规则可机械套中文。
- `data-nosnippet`仅落在允许的外围元素，重要正文和来源仍可索引、可摘录、可阅读。
- 对llms新增链接验证200和实际主题相符，不用它的更新当效果证据。
- 埋点修改如有，确认一次可见曝光／一次点击的事件语义、原有planning事件兼容；GA后台送达与界面收集另核验，不从构建通过推断。

本审计没有访问Search Console／GA后台、外链库或AI回答产品，没有更改机器人策略，也没有部署。页面具体CTR改动应结合主任务的查询数据分析及内容／技术审计一起定稿。
