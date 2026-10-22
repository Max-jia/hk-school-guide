# 真道书院中学报告编辑与发布前验收

**日期：** 2026-10-21  
**报告：** `src/content/reports/logos-academy-secondary.json`  
**状态：** 内容、来源、结构、构建及浏览器验收通过；未部署。

## 内容与证据

- 复核 8 章、10 张表、24 项来源。新增国际文凭组织课程框架来源，与校方课程页互补。
- 为首次出现的香港中学文凭（HKDSE）、国际文凭大学预科课程（IBDP）、知识论（TOK）、拓展论文（Extended Essay）、创意/活动/服务（CAS）、HL/SL、BAFS、ICT、SEN、CSSA 补中文释义；将 AFI 改为全称表达。
- 将 Level 3+ 解释为单科第 3 级或以上门槛，明确不能当作达到该成绩的学生比例。保留 DSE 分科分母、IB 四舍五入、毕业生去向口径等限制。
- 现行招生轮次、申请费用/日期、2026/27 学费、2026 DSE 与 2026 IBDP 结果的年份和不确定性边界维持分开呈现。

## 自动验收

- `node scripts/validate-reports.mjs logos-academy-secondary`：通过，0 错误、0 提醒。
- `node scripts/audit-report-sources.mjs`：通过，77 份报告、154 个简繁页面的可见来源链接与 JSON-LD 引用一致。
- `npm run build -- --webpack`：通过，TypeScript 通过，生成 656 个静态页面。
- `git diff --check`：通过。

## 浏览器验收

Playwright 打开 `/cn/reports/logos-academy-secondary` 与 `/reports/logos-academy-secondary`，分别在 1440px 和 390px 视口检查：

- 四种组合 HTTP 200，八章目录与正文齐全，页面和 body 宽度不超过视口。
- 390px 下 8 张宽表在独立 358px 横向滚动容器中，2 张表适配容器；无页面级横向溢出。
- 新增术语在简体正文可检索；繁体页 `lang=zh-Hant-HK` 且术语释义有繁体转换。
- 控制台页面异常为 0；桌面报告首屏及第 2 章截图目视检查通过。

## 动态维护

2027/28 DS4 申请截止时间为 2026-11-12 上午 9 时。截止后应将首页“当前申请窗口”改为历史状态，除非校方另行延期。此记录不代表公开部署。
