# 元朗商会中学深度报告验收记录

日期：2026-10-21  
报告：`src/content/reports/yuen-long-merchants-association-secondary.json`  
状态：本地验收完成；未部署。

## 内容与证据

- 重核校方现行招生栏目、2026/27 英文中一原页、2026 HKDSE 公告、课程／报告索引、教育局外评名单及校长后记。
- Band 1C 仅作为多家第三方平台的非官方估算；校方 2026 DSE 汇总未列分母，报告不把科目比例写成学生比例。
- 第 6 章纳入一项媒体报道、校长转述的外评重点和一条 2023 年家长讨论，并分别标注来源与证据边界。评论样本不足以归纳正负 Top 5。
- 报告已将 2026/27 旧轮次学额、评分与面谈和 2027/28 统一申请时间分开；新届细则、完整 DSE／升学分母及个别支援安排仍列待核，不作外推。
- 逐章检查事实、对家庭的影响、代价与行动；8 章及来源区齐全，23 个来源链接可见。

## 结构修复与验收

- 修复第 6 章三条表格数据行多于表头列数的问题，将其统一成两栏，并增加移动端横向滚动提示。
- `node scripts/validate-reports.mjs yuen-long-merchants-association-secondary`：0 错误／0 提醒。
- `npm run build -- --webpack`：通过，656 个静态页面，TypeScript 通过。
- `node scripts/audit-report-sources.mjs`：通过，77 份报告／154 个简繁页，正文与 JSON-LD 来源一致。
- Chrome 生产预览中繁版于 390×844 与 1440×1000 CSS px 实测：均 HTTP 200、无页面级横向溢出、8 章及来源区齐全、页面错误 0；窄屏 8 张宽表均能在各自容器滚至末列；第 6 章全部数据行与表头列数一致。目视复核第 1、6、8 章。
- `git diff --check`：通过。

本地预览：
- 简体：`http://127.0.0.1:3101/cn/reports/yuen-long-merchants-association-secondary?review=accept-20261021`
- 繁体：`http://127.0.0.1:3101/reports/yuen-long-merchants-association-secondary?review=accept-20261021-tc`
