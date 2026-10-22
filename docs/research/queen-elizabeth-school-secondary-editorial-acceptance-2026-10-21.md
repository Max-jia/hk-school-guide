# 伊利沙伯中学深度报告验收记录

核对日期：2026-10-21  
报告：`src/content/reports/queen-elizabeth-school-secondary.json`  
本地预览：`http://127.0.0.1:3131/cn/reports/queen-elizabeth-school-secondary?review=accept-qes-final2-20261021` 与繁体 `/reports/queen-elizabeth-school-secondary?review=accept-qes-final2-20261021`

## 内容与来源门槛

- 固定八章顺序完整：定位与竞争力、中一入读、教学与路线、升学出口、费用与投入、在读体验、同类校比较、专家结论；均以事实为起点，落到家庭取舍和下一步核查。
- 坊间 Band 1A–1B 明确标为非官方估算；由于估值方法与底层数据独立性未证，平台综合评级暂缓。
- 首次出现时解释 SSPA、DP、CA、332A+2、Level 4+/5+、M1/M2、SEN、JUPAS/SNDAS 等术语；33222、成绩项比例、学位 offer 与最终入读分别说明统计边界。
- 2027/28 当届招生规则与旧轮次资料分开；旧学额、权重和面试安排没有外推。DSE 与 offer 数字注明年份、分母和校方统计时点。
- 家长讨论只作为适配问题线索，注明匿名、年代及样本限制；没有把稀疏帖子包装成 Top 5 或现届家长共识。
- 第七章比较同一年度三所九龙区官立男女校，并给不同家庭情境的核查动作和 Plan B。
- 来源登记覆盖政府、学校官方、家校会、第三方 Band 估算及教育王国讨论；报告内来源链接、核验日期与 JSON-LD 引用按本校登记核对。

## 验收结果

- `node scripts/validate-reports.mjs queen-elizabeth-school-secondary`：通过，0 错误、0 提醒。
- `git diff --check`：通过。
- `node_modules/.bin/next build --webpack`：通过，TypeScript 完成，生成 656 个静态页面。
- 本地浏览器实测简体和繁体页面：标题、学校定位、二维码、PDF 按钮、目录、八章和来源区均渲染；章节锚点顺序完整，表格有横向查看提示。桌面首屏截图检查通过。
- 线上部署未进行。当前未做独立窄屏视口验收，不据此声称手机布局已验收。

## 已知资料边界

2027/28 校本正式申请须知、当届学额及筛选细则尚待学校更新；2026 学位 offer 后最终注册人数、完整且具代表性的现届家长意见亦未见可核实公开数据。报告据此保留未知，不作录取率或家长共识推算。
