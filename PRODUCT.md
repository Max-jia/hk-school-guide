# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

内地来港家庭（高才通 / 优才 / 专才）的家长，孩子即将或正在升读香港小学 / 幼稚园。处于信息不对称、不熟悉本地学校体系的决策情境。香港本地家长为顺带受众，不作主要目标。

## Product Purpose

帮助内地来港家庭选对香港学校：免费择校工具（匹配引擎）引流，深度择校报告（付费内容）变现。现阶段成功指标为**报告付费转化**。

## Positioning

数据可核实 + 深度报告。学校数据来自香港教育局 CHSC 开放数据、每月同步；第三方估算一律标注「参考·非官方」；评级为四因子模型（锚点分），不编造、不夸大。区别于小红书上无法核实的中介攻略与只做排名不做的内容平台。

## Operating Context

- 纯静态站（HTML/CSS/JS + 结构化数据文件），Vercel 部署，域名 hkschool.guide
- 简繁双版（`-tc.html` 繁体镜像），内地家庭为主
- 数据：669 所小学 / 962 所幼稚园，评级名校长约 126 份深度报告
- 付费墙已预埋（`reports.html` 的 premium 标记与解锁检查），**支付尚未接入**——金流接入需逐次授权
- 免费工具：校网 / 预算 / 性格匹配（小学），地区 / 时段 / PN 匹配（幼稚园）
- Blog 引流：Google Trends 热搜选题，13+ 篇文章，日期分散

## Capabilities and Constraints

- 能力：择校匹配、深度报告（8 章：教学 / 升中通路 / 入读攻略 / 家长口碑 / 同类对比等）、面试题库、Blog
- 报告付费模式：**单份买断**（已定，未实现支付）
- 约束：静态站无后端；金流未接；数据诚实铁律（只写可核实，第三方标来源）；「免费工具引流 → 付费报告转化」漏斗必须保持
- 术语：锚点分（四因子：锚点 45% / 共识 25% / 竞争 10% / 世袭 20%）、S/A+/A/B 评级（参考·非官方）、一条龙 / 直属 / 联系（升中通路）

## Brand Commitments

- 名称：港学荟（hkschool.guide）
- 语气：**专家顾问型**——客观、权威、数据说话；文案去 AI 味（无 emoji 装饰、无三连排比腔）
- 视觉方向（2026-08 用户确认）：极简 Editorial——近黑墨色 + 纸白 + 沉稳蓝（`#2563EB`），不用 AI 紫粉、不用渐层装饰、不用 emoji 徽章
- 数据诚实为品牌底线（CLAUDE.md 铁规矩）

## Evidence on Hand

- 126 份深度报告（`reports.html` 内嵌列表，120 个唯一校名映射于 `data/report-index.js`）
- 669 所小学 / 962 所幼稚园数据（`data/schools_primary.json` / `data/schools_kindergarten.json`）
- 四因子评级 v9（`data/primary_tiers_v9.json` / `primary_anchor_scores.json`）
- 13+ 篇 Blog（`blog/`），2026-08 热搜系列 8/6–8/18
- 竞品研究（`docs/competitive-analysis-2026-07.md`）、决策记录（`docs/decisions.md` D1–D23）
- 数据来源页（`data-sources.html`）
- 缺失且不得虚构：报告销量、家长评价数字、升学率官方数据

## Product Principles

1. 数据诚实优先于转化——任何不可核实的数字不上线（D6 铁律）
2. 付费报告是产品，免费工具是漏斗——首页设计服务付费转化
3. 内地来港家庭优先——简体为主、繁体镜像、语境讲清香港制度差异
4. 单份买断，报告即商品——每份报告独立价值，首页要让用户快速找到目标学校
5. 去 AI 味是品牌资产——视觉与文案都要人做的感觉

## Accessibility & Inclusion

无产品级特殊要求记录。站内已含基础无障碍实践（focus ring、对比度注意）。
