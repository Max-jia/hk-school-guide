# 沪江维多利亚学校深度报告内容审计

**核对日期：** 2026-10-18（本审计更新）<br>
**报告文件：** `src/content/reports/victoria-shanghai-academy-secondary.json`<br>
**状态：** 2027/28 Year 2–11 申请现已明确将于 2026 年 11 月开放；2027/28 学费、各级空位、完整文凭人数及最终注册去向待核。

## 招生与年级

- [教育局名录](https://internationalschools.edb.gov.hk/en/schools/93.html)列学校为南区非牟利私立独立男女校，地址香港仔深湾道 19 号。名录全校学位 1,900–2,000，不能当目标年级空位。[校方年龄表](https://www.vsa.edu.hk/admissions/how-to-apply/age-requirements)的 Year 6 最低年龄为入学年 8 月前 10 岁 8 个月；VSA Year 编号与本地中一至中六不能机械对应。
- [校方 2027/28 时间线](https://www.vsa.edu.hk/admissions/how-to-apply/key-dates)明确写 Year 2–11 申请将于 2026 年 11 月开放，具体年级空位、截止日与评估日期未列。[Year 6–11 信息活动](https://www.vsa.edu.hk/admissions/booking-of-school-tour-information-session)可报名，但不是正式申请。
- [招生政策](https://www.vsa.edu.hk/admissions/how-to-apply)列香港永久居民或有效香港签证居民资格、整体不少于 70% 学位给永久居民、Year 6–11 中英数笔试和可能的英语／普通话面谈。申请需最近两年成绩及身份材料，HK$2,000 申请费不退、不转让。上述条件不构成个别录取保证。

## 课程、语言与支持

- [中学课程页](https://www.vsa.edu.hk/learning/secondary-school)列 MYP Year 6–10、DP Year 11–12，并区分完整 IB 文凭与个别 Diploma Courses 证书。[双语页](https://www.vsa.edu.hk/learning/bilingualism)列 MYP 主要英语授课，中文科例外，另有第三语言路径；DP 学生的中英语言文学能力是校方期望，个别路径仍须确认。
- [学生服务页](https://www.vsa.edu.hk/student-life/student-services)列学习／语言支持、辅导与大学申请建议；未列个别学生可获时数或 2026 届最终入读人数。

## 费用与退款

- [2026/27 收费页](https://www.vsa.edu.hk/admissions/school-fees)列 Year 6 HK$212,300、Year 7 HK$215,500、Year 8–10 HK$217,300、Year 11–12 HK$270,450；后两年费用不能按 Year 6 价格外推。2027/28 费率待更新。页面列 CAS、杂项及电脑等额外支出。
- 现行收费页链接的[Year 2–11 发展金协议](https://www.vsa.edu.hk/fs/resource-manager/view/96e4f3ad-c20d-4e68-b576-02a2e917d7b3)写非债券家庭接受学位时缴 HK$60,000，完成首学期退 HK$30,000，余款毕业或提前至少 45 个上课日通知退学后退；开学前弃位不退。协议模板未标 2027/28 学年，签约前须核当届原件。
- [2026/27 财政援助文件](https://www.vsa.edu.hk/fs/resource-manager/view/6e27115f-003c-4f78-a9be-ea00c1571f4b)列学费减免 25%–75%，依家庭年收入、子女数及资产审核，资产须低于 HK$500 万；2027/28 条件与个人获批待核。

## 2026 考试与升学口径

- [校方成绩页](https://www.vsa.edu.hk/learning/academic-results/myp-dp-results)文字写 2026 届 122 人均参加 IB 考试、10 人 45 分、11 人 44 分及 11 人 43 分；表格列平均 39.1、40 分以上 51%、24 分以上 100%。**10／122 约 8.2%，而同页表格列 45 分 8.5%**。若 8.5% 按一位小数取整，10 人与 117 或 118 的分母都相符；这是可能解释，校方未公布表格分母，不能视为已确认。报告保留校方原值并列出此算术边界。参加考试及 24 分以上不自动证明取得完整 IB 文凭。
- [University Placements 页](https://www.vsa.edu.hk/learning/academic-results/university-placements)本次可读取内容只有标题，没有 2026 届按最终注册统计的人数；不发布“升大学率”或目的地比例。

## 本地校验

- `npm run build -- --webpack` 通过，TypeScript 检查通过，生成 603 个静态页面。
- `npm run audit:report-sources` 通过：59 份报告、118 个简繁页面；可见来源链接与 JSON-LD 引用一致。
- 简繁构建 HTML 均有 8 个正文章节、1 个来源章节、7 张决策表和 16 条 FAQ；未见「麵試」「學生髮展」、校名后误加「中学」或 `%25E4` 错误编码。
- `git diff --check` 通过；真实浏览器与线上验收尚未进行。
- 工作区原有未提交改动须保留。

## 发布前待核

- 2027/28 Year 6–11 实际空位、申请截止、评估和录取规则；当届费用、发展金协议与全部附加开支。
- DP 具体开班、完整文凭与证书人数、中文路径和个案支持。
- 2026 成绩页 45 分比例差异及按毕业届统计的最终大学注册去向。

## 2026-10-18 成绩比例算术边界

- 重开校方 MYP & DP Results 页，仍见 122 名参加者、10 名 45 分考生及表格 8.5%。补充算术检查：若表格以一位小数显示，分母 117 或 118 均可能对应 10／分母＝8.5%；校方没有公开该分母，报告不把这两个候选值当作事实。
- 同页叙述将 40 分以上概称为 half of all students，而表格列 51%。报告保留表格精确比例，并标明文字是概述，未自行反推人数。

## 2026-10-17 第 7 章同制度比较复核

- 以教育局[私立独立学校名录](https://internationalschools.edb.gov.hk/en/schools/pis.html)确认 VSA、弘立及英基启新属于同一学校类别，新增三校课程、教学语言、2026/27 学费与 2027/28 申请动作对照。三校 Year／Grade 编号和年龄对应不同，未按编号直接比较费用或入学阶段。
- [VSA 收费](https://www.vsa.edu.hk/admissions/school-fees)列 Year 6 HK$212,300、Year 7 HK$215,500、Year 8–10 HK$217,300、Year 11–12 HK$270,450；[弘立收费](https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/fees-tuition/)列 Grade 6–10 HK$291,770、Grade 11–12 HK$317,190；[英基启新收费公告](https://www.esf.edu.hk/fee-levels-for-academic-year-2026-27-esf-rc/)列 Year 7–11 HK$201,500、Year 12–13 HK$203,700，但公告发布时注明须待教育局批准。均为 2026/27 快照，资本、发展金与其他费用另核。
- [弘立 2027/28 招生公告](https://academy.isf.edu.hk/index.php/news/applications-for-the-2027-28-academic-year/)列 Grade 6–11 申请截止 2026-11-22；VSA Year 2–11 将于 2026 年 11 月开放，逐级空位与截止仍未公开；英基启新当届申请资格、空位及优先次序待核。课程依据各校中学课程页，VSA 完整 DP 与单科证书、英基启新 DP 与 CP 保持分开。
- 五类家庭情境分别处理转轨定级、双语、完整 IB 文凭、费用现金流及个别支援，并给三条可执行备选路径。三校可比的完整文凭人数及最终大学注册数据不足，不作升学率排名。
- 已建立 `victoria-shanghai-academy-secondary-claim-ledger-2026-10-18.md`，记录 56 项主张及年份、统计单位和缺项。报告补充首页 offer 宣传数据的口径限制。
- 本轮仅做 JSON 解析、报告来源与来源登记链接集合检查、结构计数及 `git diff --check`；未运行构建或浏览器视觉验收。


## 2026-10-18 奖学金与设备交叉核对

- 校方奖学金页：外部申请 Year 6–11，奖额为年学费四分之一、半额或全额，按一年颁发；页面列通常 5 月底申请、6 月底通知，并以中英数笔试及面试遴选。页面无学年标签，不能当作 2027/28 已公布日期。
- 设备口径：2026/27 收费页写 Year 7–12 须自备 MacBook；新生设备页写 Year 6 及以上须拥有并使用 MacBook。报告明确并列，不自行消解口径差异，也不把 2026/27 型号或价格外推到下届。
- 限制：2027/28 招生尚待开放；学费、电脑具体要求、奖学金窗口和援助政策均需按当届书面通知核对。


## 2026-10-18：第 43 所续核

- 重开 VSA 2027/28 Key Dates：页面目前明确写 Year 2–11 申请将于 2026 年 11 月开放（已不是此前较早页面的预计表述）；仍未给中学各年级空位、截止日或评估日期，评估安排会个别通知。报告、账本与来源登记同步将“预计开放”改为“将开放”。
- 重核 2026/27 收费页：Year 6 HK$212,300、Year 7 HK$215,500、Year 8–10 HK$217,300、Year 11–12 HK$270,450；Development Scheme 仍需与学费分别说明，额外活动与 MacBook 支出不作推算。
- 重核 MYP/DP Results：仍列 122 人参加 IB 考试、10 人 45 分、表格 8.5%、40+ 为 51%、平均表列 39.1；介绍文字仍用 45 分均分 39、40+“half”。报告已有并列表格口径与算术边界，没有新依据可消解分母或取整差异。
- 校方首页与大学去向页的 offer 宣传不替代独立学生数、offer 接受数或最终注册分母。本轮未找到可更新这些缺口的正式注册统计。
- 本轮复核后的 JSON 可解析；未重跑整站来源审计、构建或浏览器验收。

## 2026-10-19 固定验收复核

本轮重开校方 Key Dates、How to Apply、IB 成绩、学费、MYP/DP 课程、双语、大学去向及学生服务页面。报告已加入申请行动清单、课程资料局限与要向校方书面确认的问题；公开资料未列的空位、评估权重、逐年课程容量、个别支援时数和最终大学注册人数继续明确标注未知。成绩保留校方 10 名 45 分与表格 8.5% 的未解释分母差异，不反推完整文凭人数。

- 定向验证：`node scripts/validate-reports.mjs victoria-shanghai-academy-secondary` 通过，1 份报告、0 错误、0 提醒。
- 整站生产构建、来源审计、繁简页浏览器检查和窄屏表格操作仍待本轮执行；在这些检查完成前不标记本校验收收口。

## 2026-10-19 最终构建与桌面浏览器检查（当时窄屏待验）

修正繁体转换中“参加”被渲染为“蔘加”的用词：将相关考试口径统一写为“应考”，繁体生产页现显示“應考”。简繁报告均在本机生产构建中打开；首屏、八章、成绩口径、来源列表均可见，桌面截图未见页面内容被裁切。

- `node scripts/validate-reports.mjs victoria-shanghai-academy-secondary`：0 错误、0 提醒。
- `npm run audit:report-sources`：81 份报告、162 个繁简页通过，页面链接与 JSON-LD 引用一致。
- `npm run build -- --webpack`：成功生成 657 个静态页面，TypeScript 通过。
- `git diff --check`：通过。
- **当时窄屏验收未完成（状态已由下方记录更正）。** 初始浏览器控制接口未能设置视口宽高，因此当时没有把桌面检查冒充 390×844 手机检查，也未提前收口 #43。

## 2026-10-19 窄屏验收收口

随后使用 Chrome DevTools 设备模拟，在简体和繁体生产页面分别设置并实测 390×844 CSS px。两版 `innerWidth/innerHeight` 均为 390/844，`documentElement.scrollWidth` 与 `body.scrollWidth` 均为 390；每版 8 张表格均可在各自滚动容器内实际滚至末端。图片容器的 3px 内部宽差仍在页面边界内，不造成页面级横向溢出。简繁页的章节、咨询卡、数据表与来源区均正常显示；VSA 达到固定收口门槛。#43 已收口，未部署。

### 2026-10-20 官方页面复核
直接打开沪江维多利亚学校申请 Key Dates。2027/28 Year 1 已关闭；Year 2–11 申请将于 2026 年 11 月开放，当前页未给各级具体截止或空位；评估日期个别通知，结果于评估后一个月内。报告写申请尚未开放、未列各级空位/截止，与页面一致。
