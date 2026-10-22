# 香港浸会大学附属学校王锦辉中小学（中学部）报告验收记录

核对日期：2026-10-21  
报告：`src/content/reports/hkbuas-wong-kam-fai-secondary.json`  
本地预览：`http://127.0.0.1:3137/cn/reports/hkbuas-wong-kam-fai-secondary?review=full-audit-20261021`；繁体：`http://127.0.0.1:3137/reports/hkbuas-wong-kam-fai-secondary?review=full-audit-tc-20261021`

## 内容与来源门槛

- 八章顺序及标题完整；正文按学校事实、家庭价值与代价、申请或核实动作组织。
- Band 首次出现解释为学生派位组别而非教育局学校等级；多家第三方估算分歧标为低置信度参考，不以英语授课反推等级，也不虚构平台总分。
- 第 3 章解释 332A+2、JUPAS、录取通知、cohort 与成绩项；成绩比例和学生比例分开，保留分母及最终注册人数未公开的限制。[教育局 2026/27 一般入学要求](https://applications.edb.gov.hk/circular/upload/EDBCM/EDBCM26090E.pdf)
- 正文包括当届 G7 申请与资讯日入口、旧轮次数据、DSE／GCE 结果边界、课程语言、预算及三校比较。G8–G12 插班机会无公开规则时按“先查空缺、再准备材料”处理。
- 家长讨论限于可追溯的教育王国帖子，按年份、身份和中小学部范围说明；2024 年小学部家长疑问不外推为中学口碑。没有足够样本支持好评／差评 Top 5，故未伪造排名。

## 验收结果

- `node scripts/validate-reports.mjs hkbuas-wong-kam-fai-secondary`：通过，0 错误、0 提醒。
- `node scripts/audit-report-sources.mjs`：通过，77 份报告、154 个繁简页的可见来源链接和 JSON-LD 引用与登记一致。
- `npm run build -- --webpack`：通过，656 个静态页面，TypeScript 阶段通过。
- `git diff --check`：通过。
- 本地浏览器分别检查简体、繁体页面的目录、八章、Band 解释、二维码、PDF 按钮、来源面板及升学章节。桌面截图中表格与文字正常；窄屏请求 390×844，浏览器有效 CSS 视口宽 433 px，文档宽 416 px，无页面级横向溢出；第 3 章宽表可在容器内横向滚动。
- 未部署。

## 尚未公开、因此不作推断的事项

2027/28 外校 G7 学额、甄选细则与面谈安排；当前收费网页适用学年的正式确认；2026 DSE／GCE 结果各自完整分母、统一统计日期及最终注册去向；OSSD 当届适用年级、结构和费用；具有代表性的现届家长口碑样本。
