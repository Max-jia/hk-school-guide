# SEO／GEO 点击评估执行规范

2026-10-27。用于本轮优化发布后的观察；不是已经取得的效果报告。当前现有GSC导出截至2026-10-17，早于32指南上线和本轮优化，不能用来判定新版有无提升。此规范不更改GA代码、GSC账户或机器人授权。

## 1. 先建立发布记录

将每次实际发布的提交、生产部署ID、UTC时间及香港时间、受影响页面族、标题／摘要／正文／导航各自改动记入一份change manifest。32指南发布与本轮CTR优化分开记录，不能把同一天所有流量变化归为同一种修改。

保存改前／改后实际HTML的title、description、canonical、H1及首段。抽查Google实际展示的标题摘要并注明查询、国家／地区、语言、设备和查看日；它可能与源代码meta不同，不能把本地预览称作真实SERP展示。Google重抓时间可能不同，观察窗口从可确认已更新的页面开始标记。

## 2. 导出数据与字段

|数据|需要的字段|范围与注意|
|---|---|---|
|GSC Web按日期|date、clicks、impressions、CTR、position|站点总体趋势，不把页面曝光总和替代站点曝光；日期以GSC报告时区为准。|
|GSC查询×页面|query、page、clicks、impressions、position；能取得时再分date、country、device|保留表的过滤条件、时区、行数与导出限制。隐私隐藏／缺失查询不能补猜；多维数据不全时分别报告，不拿独立边际表硬拼成联合数据。|
|GSC Pages／Devices／Countries|同一搜索类型与日期窗口的对应维度|用于覆盖率、迁移和样本构成核查；不把独立设备表分摊到每个页面。|
|生成式AI performance|如账户出现该报告，导出其chart、pages、devices、countries|当前官方说明以AI Overviews／AI Mode曝光为主，是Web数据子集；不与Web合计相加，没有点击字段就不算AI CTR。|
|GA4 Traffic acquisition|Session source/medium、landing page规范化路径、sessions、engaged sessions、engagement rate、相关key events|先核对后台是否真实收集。导出时不保留可能含个人资料的自由查询参数；来源不明保留direct／unknown。|
|站内事件|article_slug、placement、group、target_path、position、event_name、event_count|已有blog_related_view/click可复用，另按目标路径判断下一步去资料页、报告、工具还是规划。|

当前Google帮助页说明生成式AI performance已于2026-08-31起推出，但曝光不足时可能不显示。本项目账户是否出现、相关功能是否纳入尚未访问确认，不能写“已开通”或“AI曝光为零”。[官方报告说明](https://support.google.com/webmasters/answer/16984139)

## 3. 页面族与搜索需求映射

按规范化URL生成四类：学校资料页、深度报告、制度／比较指南、学段／名录／专题集合。繁简页面保留各自URL和语言，不因学校名相同就合并成一个观察单元。

查询意图至少分：学校身份／地区、学费与资助、教学语言与课程、入学申请／插班、升学结果、评价／比较、品牌或网址导航。相同学校可有不同意图，不能将“某校学费”与“某校地址”合并成一个标题胜负结论。每条变化同时标识该URL属于旧页改动还是新页面。

排名区间使用1—3、4—10、11—20、20以后。这里用的是GSC给定区间平均位置作诊断，不等于知道每次搜索的固定排名。

## 4. 计算规则

- 总体或分组CTR＝Σclicks÷Σimpressions。不要对每行CTR或每个页面CTR求简单平均。
- 某组曝光为0，CTR记为不可计算；不是0%表现。
- 同时报点击数、曝光数、CTR及位置变化。一次新增需求带来的曝光增多可能拉低总体CTR，不能因此删掉有价值页面来“优化”比率。
- 以查询×页面×设备×国家为稳定单元比较，再看同排名区间。不能仅因全站平均位置相同，就声称排名因素已被控制。
- 需要跨组汇总时，报告固定基准权重的标准化CTR及实际CTR，并说明新增查询被排除还是独立展示；不自行补出缺失单元。
- 平均位置可按对应曝光权重做汇总诊断，但不当作真实逐次位置，也不混合不同搜索类型。

低样本的页面不要逐日追涨杀跌。可以把不足100次曝光的单元标“样本少”，按同意图页面族汇总；100只是执行排队门槛，不是统计显著性线。一次两次点击、空白查询或匿名化查询不足以支持改题成功结论。

## 5. 比较节奏与行动

|时间|执行|结论边界|
|---|---|---|
|发布当天|库存、标题摘要、正文一致性、繁简、移动端、robots、canonical和链接验收|只说明发布正确，不说明CTR已经上升。|
|发布后7天|确认抓取／展示是否更新，有无索引或点击异常；记SERP标题改写样本|样本小或尚未重抓时，不连续再改标题。|
|有完整28天新数据后|与可比完整28天窗口按上述单元／排名分层比较；同时列绝对点击与曝光|招生季、考试、假期和Google变动可能影响结果，前后观察不证明因果。|
|再一个完整周期|复核方向是否持续，针对仍有需求但低CTR的页面族迭代|没有足够样本则继续观察，不能套“提升百分比”营销结论。|

如果是在季节性明显的申请窗口，应在解释中列出阶段变化；不要把已过报名期与开放报名期当成完全可比的对照。新页面没有改前CTR，用首个完整周期建立基准，不凭空写提升。

行动优先级：

1. 有稳定曝光、位置在前十但同意图点击偏低：检查Google实际标题／摘要是否识别学校和学段、是否承诺页面真正提供的答案。
2. 同需求位置较后：先查正文是否有具体证据、比较和执行建议，以及入口是否可抓取；不能只改标题。
3. 资料页／报告／文章互相争同一意图：查查询×URL分布及各自内容职责，先区分价值；不未经证实就canonical合并或noindex其中一类。
4. 低曝光新页：先核验索引与内链，继续观察需求，不将少量数据断言为“内容无用”。

## 6. GA4与站内点击的操作口径

先在Traffic acquisition按Session source/medium看Google organic及实际出现的AI相关来源，再以landing page观察后续阅读。chatgpt.com、perplexity.ai、claude.ai、copilot.microsoft.com、gemini.google.com仅作为待核对的候选来源，不保证每个平台、每个访问都会保留referrer／UTM；没有来源信息时不反推AI。

建立一份探索报表：行＝文章路径与相关链接目标，列＝desktop/mobile位置，值＝blog_related_view和blog_related_click次数。当前view表示内链模块达到可见阈值，click表示点击事件，不等于独立人数。若将click/view命名为“站内继续阅读率”，需说明单位、可能重复点击、跨视口情况；不要称为Google点击率。

这轮不新增冗余AI到访事件。后续如扩展名录／报告的内链事件，建议复用独立的contextual_link_view、contextual_link_click语义和受控字段：page_type、page_path、target_type、target_path、placement、stage、locale；不传孩子资料、自由文本、完整referrer或不必要的查询参数。真正咨询提交等转化只在用户实际完成时记录，不能用按钮点击冒充咨询成功。

Google Analytics脚本在源代码存在，不代表账户收到数据；真实后台收集、DebugView／Realtime和事件自定义维度登记需要另行验证。GA同意、广告拦截及缺失referrer都会令它与GSC点击不相等。[GA4流量获取](https://support.google.com/analytics/answer/12923437?co=GENIE.Platform%3DDesktop&hl=en) · [来源维度](https://support.google.com/analytics/answer/15567068?hl=en)

## 7. AI引用与到站分开记录

固定一组家长问题，覆盖三学段、制度、学校身份、费用语言和比较。每次记录平台、模式、语言、日期、题目、是否引用本站、实际引用URL、引用是否支持原回答和年份是否正确。不得先在问题里提供本站URL，再把模型复述当自然引用。

引用率仅是这一固定测试集的观察比例，不推成全市场占有率；平台回答可能随时间、地点和账号改变。另用GA实际来源记录到站与后续动作，二者没有一一对应关系。没有执行AI产品测试时写“未测”，没有账户导出时写“暂无当期导出”，不编造GEO评分或零值。

OpenAI早前publisher FAQ地址目前已重定向其他页面，旧搜索摘要的自动UTM说法不作为本轮当期承诺。当前[ChatGPT Search说明](https://help.openai.com/en/articles/9237897-searching-the-web-with-chatgpt)强调可核验的来源与不保证排名；[bots文档](https://developers.openai.com/api/docs/bots)区分搜索与训练抓取。此轮维持现有robots与训练政策。
