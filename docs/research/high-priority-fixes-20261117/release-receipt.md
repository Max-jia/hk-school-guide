# 三项优先修订发布验收

发布日：2026年11月17日。应用提交：`63ea21c4`，已推送至`codex/school-net-humanizer-20261115`。

生产基线：`dpl_DgJ87k3uoEFaJFZWnZAu7oadx88B`。本次生产部署：`dpl_BvhVpd9x1WcLswjQWoWaoz9eKi2Z`，READY，正式域名hkschool.guide已指向该部署。

- 上线前比对生产源码1,593个文件，仅9个获准应用文件存在差异；实际候选上传1,593个文件全部匹配准备快照。
- 云端完整构建及TypeScript通过，生成5,439个页面。候选与基线输出路径均27,197项，无缺失或新增路径。
- 14个繁简关键页面线上检查通过：正文、当届官方引用、description、JSON-LD的dateModified和citation、单一H1、自引用canonical及可索引性。
- 上线前后站点地图均5,414条，URL集合一致。
- 浏览器实测线上对比页：选择幼稚园并搜索高主教后，显示全年40,800元、上午1:10.3／下午1:6.1、2025年9月统计和两种班制；显示已核资料与待核事项，无原保障评分条。报告链接保留/cn，正文8章及当届引用存在。
- 本地390px手机检查：页面宽度390px，无页面级横向溢出，8章、单一H1。其他未授权稿件及研究目录未纳入部署。

既有技术债：对比页42处no-explicit-any错误在基线与本次修改中相同。本次TypeScript及云端构建通过；未宣称全仓ESLint通过。

官方原件保存在official-sources.zip，逐文件SHA256见official-source-hashes.json。原稿及核验记录已保留。逐项HTTP结果见live-verification.json，上传源码及输出路径验收见candidate-verification.json。
