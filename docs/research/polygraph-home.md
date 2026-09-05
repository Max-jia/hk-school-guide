# polygraph.cool 首页逆向 spec（2026-08-24）

目标：https://polygraph.cool/（Pudding 工作室站，SvelteKit）
用途：港学荟 Pudding 风格参考版首页骨架（内容用港学荟自己的）

## 设计系统 token（提取自 0.DDwt0AV3.css）

### 6 色系 × 4 档
| 色系 | lightest | light | dark | darkest |
|------|----------|-------|------|---------|
| yellow | #f7f0e7 | #ffd489 | #f1a51f | #5e5041 |
| red | #ffe4ed | #f7adbb | #dd4467 | #671c4a |
| green | #def0e5 | #9bdfbf | #2c9d6f | #245242 |
| blue | #e6eaff | #a0abf1 | #4560c2 | #1d357a |
| purple | #f5e6ff | #b9a6ee | #815dc7 | #382953 |
| gray | #eef1f3 | #c6d0d7 | #8c979c | #40484d |

### 字体
- --sans-cond: "GT America Condensed Bold", Helvetica, Arial, sans-serif（大写标签）
- --serif: "Ivar Text", Georgia, Times, serif（正文/大标题）
- --serif-hed: "Ivar Headline Bold", Georgia, Times, serif
- 正文 --font-body: var(--serif)
- 数字特性: tnum 1（等宽数字）

### 其他
- --color-bg: white；--color-fg: #40484d（gray-darkest）
- border-radius: 0（直角）
- 字号阶梯: 12/14/16/18/20/22/24/28/32/36/40/44/48/56/64/80/96/112/128px

## 首页布局

### header
- 固定顶部，--header-height；左侧 logo；右侧 .filters（category 下拉 select）悬浮右上

### hero（#intro）
- padding: 96px（桌面）/ 64px 32px（≤1200）/ 32px（≤800）
- 两段 serif 大文案 p：clamp(22px, 2.5vw, 44px)，行高默认

### 项目条（.project × N，一条一行）
- flex column（每项目独立行），桌面 .left{width:40%; padding:96px; flex:1}
- .left 内：
  - .company：sans-cond 大写、clamp(14px,1.25vw,24px)、color gray(#657175)、letter-spacing .05em、uppercase、padding-top 32px + bottom 16px
  - .description：serif、clamp(16px,1.25vw,28px)、line-height 1.625
  - .link a：inline-flex、background var(--accent-color-fg, #1a1a1a)、padding 12px、hover 变 var(--accent-color)
- .media：max-width min(40em,80%)、margin 64px 0、图圆角 16px + 大阴影（0 16px 16px 4px rgba(0,0,0,.25)）
- 每卡 --accent-color 变量（dark 档色）
- 移动端（≤800）：.left 100% 宽、padding 32px、media 全宽

## 港学荟内容映射（6 条）
1. DEEP REPORTS · 深度择校报告 — red — 126 份评级报告：评级定背景色、亮点自动排版、8 章讲透一所学校
2. SCHOOL MATCHER · 择校工具 — green — 输入校网、预算、孩子性格，从 669 所小学 + 962 所幼稚园排出最合适的几所
3. INTERVIEW BANK · 面试题库 — blue — 25 所名校真题：插班、叩门、直升面试问答与高频考点
4. BLOG · 热文与趋势 — purple — 26 篇搜索趋势热文：计分制、校网排名、叩门信，每周更新
5. SCHOOL NETS · 校网攻略 — yellow — 40 校网、41 vs 12、升中通路，排名之外看联系与直属
6. TALENT SCHEME · 高才通插班 — gray — 高才通子女插班指南：直资私立选择与申请时间表
