# 港大同学会书院中学报告：内容与交付验收

复核日期：2026-10-21  
报告范围：港大同学会书院中学部；中文及繁体页面

## 本轮修订

- 重整第 1 章学校定位：把英语为主的课堂、校本探究课程、DSE／IAL 两条路线、直资费用与承诺，转成家庭适配及取舍判断。
- 重写第 3 章升学结果：先解释 332A、选修科 3+、科次、IAL 成绩比例、JUPAS、UGC 资助学士学位，再拆分考试结果、申请者 offer 与最终注册；补上两届对照和家庭如何使用数据。
- 加强第 6 章家庭体验证据边界：并列校方年度自评、历史发展计划与单一匿名家长留言；没有把校方自评当作独立调查，也没有把单一留言写成整体口碑。
- 第 8 章先给有条件的专家结论，再列家庭下一步。
- 把 Banding 表述为坊间估算范围；来源分列 Big Exam、SchoolBanding，并写明方法及资料独立性未充分公开，不冒称官方评级或一致的 Band 1A 共识。
- 2026-10-21 增补 2024 年匿名择校讨论并标明其证据边界；复查 2027/28 招生、学额及 2026/27 收费。将入学章正文和来源说明的校方页面复核日期同步至 2026-10-21。
- 补充教育局 332A 定义、中文大学 SALSA 计划等可直接查阅来源；报告来源注册表及中、繁体页面来源栏和 JSON-LD 共登记 22 项。

## 内容审计

- 八章顺序完整，标题与目录一致；没有付费墙段落。
- 专家叙述按“事实—解释—家庭影响—行动”展开，覆盖课程语言与分流、申请承诺、费用、家庭体验和可执行备选。
- 332A 的三个数字指中文、英文、数学最低等级；A 指公民与社会发展科“达标”，不是第四个数字等级。
- HKDSE、IAL、JUPAS 结果按各自统计单位呈现。DSE 与 IAL 的学生／科目分母未公开之处均标明，不由科次、offer 数或宣传比例推算录取人数或最终入读人数。
- Banding 是非官方参考，未把学校估算等级写成学生个人派位组别。
- 口碑样本不足以做正负面 Top 5，正文说明样本局限并改列访校核对问题。
- 2027/28 申请日期、2026/27 学费、考试年份分开标注；新学年尚未公布的费用与安排留作待复核事项。

## 验收结果

- `node scripts/validate-reports.mjs hkuga-college-secondary`：1 份报告通过，0 失败，0 提醒。
- `git diff --check`：通过。
- 定向来源核对：简体与繁体构建页均有 22 个可见来源链接、22 个 JSON-LD citation，与注册表一致。
- 实际浏览器渲染：本机预览 `http://127.0.0.1:3105/cn/reports/hkuga-college-secondary?review=editorial-20261020` 可打开；已检查顶部报告题头、目录、八章、表格提示、来源栏及咨询二维码。
- 2026-10-21 在本机预览 `http://127.0.0.1:3188/cn/reports/hkuga-college-secondary` 和繁体 `/reports/hkuga-college-secondary` 重新检查渲染及无障碍树：八章顺序、报告更新时间、两条家长讨论、来源日期、目录与二维码均已载入；繁体首屏窄屏截图目视检查通过。
- 桌面浏览器视口为 1422 CSS px；窄屏浏览器实测有效视口为 433 CSS px，页面 documentElement 宽 416px、body 宽 417px，无页面级横向溢出。宽表位于 `report-table-scroll__viewport` 横向滚动容器中；窄屏首屏、题头与咨询卡可见，八章和来源均加载。
- 全库 `scripts/audit-report-sources.mjs` 仍被既存孤立条目阻断：注册表存在 `our-ladys-kindergarten`，但此工作树无对应报告 JSON。该项不属于 HKUGA 定向核对，未删除或改写其他学校资料。

## 来源边界

- [教育局：332A 相关说明](https://www.edb.gov.hk/tc/edu-system/postsecondary/policy-doc/musss/)
- [HKUGA College：Annual School Report 2024–25](https://www.hkugac.edu.hk/f/news/1138/ASR_24-25_v2.pdf)（校方自评）
- [HKUGA College：School Development Plan 2021–2024](https://www.hkugac.edu.hk/f/news/734/SDP_21-24.pdf)（历史校方计划）
- [教育王国：港大同学会书院讨论串](https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3878856)（单一匿名家长个案）
- [Big Exam：港大同学会书院 Banding 估算](https://dse.bigexam.hk/zh-hk/ssp/school/109)；[SchoolBanding：港大同学会书院估算](https://www.schoolbanding.com/s/hkuga-college)（第三方、非官方）

## 状态

本报告内容、来源定向核对及窄屏浏览器验收通过，可供用户审阅。本次没有部署上线。全库来源审计仍被既存孤立条目阻断，详情见上文；这不影响本校定向来源核对结论。
