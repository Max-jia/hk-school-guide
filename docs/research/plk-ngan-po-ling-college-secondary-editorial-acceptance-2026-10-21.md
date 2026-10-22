# 保良局颜宝铃书院报告验收记录

核对日期：2026-10-21  
本地生产预览：`http://127.0.0.1:3122/cn/reports/plk-ngan-po-ling-college-secondary?review=accept-npl-20261021`  
繁体预览：`http://127.0.0.1:3122/reports/plk-ngan-po-ling-college-secondary?review=accept-npl-20261021`

## 内容与研究验收

- 报告按八章标准重新排为：定位与竞争力、中一入读、教学与路线、升学出口、费用与投入、在读体验、同类比较、专家结论；保留原有官方招生、双路线、分母、预算及三校比较资料。
- 第 1 章补充 Big Exam 与 SchoolBanding 的 Band 1B 估算，同时解释 Band 是非官方学术位置估算，不是教育局学校等级、学生个人派位组别或录取机会；平台综合评级仍暂缓。
- 第 6 章记录教育王国 2014、2020 年讨论和 2009–2026 论坛意见聚合页，明确其历史、匿名、二次整理与代表性限制。Agent-Reach 小红书搜索因本机用户目录不可写而失败；没有把检索失败说成没有评论。
- 第 8 章给出有条件结论：适合重视英语、愿意比较两条高中路线、预算能覆盖潜在 IB 成本的家庭；同时保留路线、学额和数据分母风险，并给出 SSPA 与其他学校 Plan B。
- 2026/27 学费与 2027/28 招生状态直接重开校方页面核对。2026 DSE/IB/JUPAS 数字继续区分考试人群、offer 份数和最终注册；未公开分母仍标明不作推算。

## 验收结果

- `node scripts/validate-reports.mjs plk-ngan-po-ling-college-secondary`：通过，0 错误、0 提醒。
- Next.js 16.3 webpack 生产构建通过；TypeScript 通过，生成 656 个静态页面。
- 对目标报告定向核对登记来源、繁简可见链接和 JSON-LD citations：两种语言各 19 项，来源均匹配。
- 简体及繁体实页在 390×844 CSS px 检查：页面与 body 的 scrollWidth 均为 390 px，无页面级横向溢出；报告内 9 张表均可在 358 px 容器滚动，滚到最右时末列可见。两种语言首屏已截图目视检查。
- `git diff --check`：通过。
- 全库 `scripts/audit-report-sources.mjs` 未能完成，因为来源登记表中已有孤立的 `our-ladys-kindergarten` 项而该报告 JSON 不存在；这与颜宝铃 19 条目标来源审计无关，未改动该无关登记。
- 未部署。

## 尚待校方公开或后续确认

2027/28 中一学额、申请人数及完整后续日程；BYP 收费类别、校内 IB 选拔规则和实际开班；2026 DSE/IB 可复算 cohort 分母及按路线最终注册；有代表性且可直接核验的近年家长评论。报告已把这些列为未知，不据此估算录取概率或路线保证。
