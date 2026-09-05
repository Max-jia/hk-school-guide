# pudding.cool 首页逆向 spec（2026-08-24）

目标：https://pudding.cool/（Pudding 工作室主站，SvelteKit）
用途：港学荟 Pudding 风格首页（内容用港学荟自己的）

## 设计系统 token（提取自 0.C2Vp5USR.css）

### 颜色
- 黑白：--color-black #000 / --color-white #fff
- 灰阶 11 档：gray-50 rgb(247,247,247) → gray-1000 rgb(25,25,25)
- 强调色：purple #a239ca / electric-green #3AE660 / blue #4717f6 / green #3AE660 / red #ff533d / yellow #e5e338
- --color-bg: white；--color-fg: gray-900 rgb(38,38,38)；--color-secondary-gray: gray-600 rgb(109,109,109)
- 暗色模式：prefers-color-scheme dark 自动切换（bg gray-1000 / fg gray-100）

### 字体
- --sans: "Atlas Grotesk"（正文卡片标题下文字/导航）
- --serif: "Gooper SemiCondensed"（--font-body，页面主体字体，故事卡 h3）
- --mono: "Atlas Typewriter"（编号胶囊/月份/按钮/筛选栏，14px 大写）
- 圆角 --border-radius: 3px（胶囊 pill 除外：border-radius 2em）

### 字号
- giant clamp(3rem,4vw,5rem) / large clamp(1.5rem,2.5vw,2.5rem) / medium clamp(1rem,1.75vw,1.5rem) / small clamp(15px,1.25vw,1rem) / xsmall clamp(12px,1vw,.8rem)

## 首页布局（Stories 页）

### header（column-wide 1280px）
- sans 字体，padding-top 32px / bottom 16px，max-height 120px，flex space-between
- 左（≥960px 显示）：tagline 文字 14px（"A digital publication that..."）
- 中：wordmark，rotate(-4deg)，hover rotate(-2deg) scale(1.05)
- 右：menu 按钮（图标旋转 -3deg 左右，hover 倾斜）

### promo 黑条
- bg = fg（黑），color = bg（白），居中，padding 16px，链接用 mono 14px

### 吸顶筛选栏（.ui，sticky top-0）
- bg white、z 1000、mono 14px bold uppercase、flex space-between、padding 16px
- 左：搜索图标（旋转贴纸）+ input（140px→180px，border 1px rgba(48,48,48,.4)，radius 6px，shadow 0 2px 1px rgba(0,0,0,.3)）
- 右：分类按钮（uppercase，未选 opacity .33，选中 opacity 1；按钮前有旋转贴纸图）

### 故事卡网格（section#stories）
- ul flex wrap；li 宽度 100% / 50%（≥600px）/ 33.3%（≥960px）；padding 32px 16px
- 每卡 .story 有 --story-bg（每张卡独立亮色背景）
- .info：mono，flex space-between，mb 8px，hover translateY(-4px)
  - .id 胶囊：border 1px fg、width 4em、radius 2em、居中、padding 4px（"#224"）
  - .month：14px uppercase（"Aug 2026"）
- a.inner：block、无下划线
- .screenshot：aspect-ratio 1 方块、bg var(--story-bg)、relative overflow hidden
  - img：absolute bottom-0 left-1/2 translate(-50%)、width calc(100% - 2*--padding)、aspect 6/7、hover scale(1.05)
  - --padding: clamp(16px,12vw,48px) 移动 / clamp(24px,4vw,56px) 桌面
- .text：sans，margin-top 12px
  - h3：serif，clamp(24px,6vw,28px)，line-height 1（中文用 1.1），letter-spacing -.8px，mb 8px
  - p.tease：gray-600 16px

### footer
- 顶部大字 serif 文案（28px 桌面 / 20px 移动，居中，max-width 900px）
- 4 张图 flex wrap（≥720px 四列），卡片 hover 旋转归零
- .bottom：CTA 区（2 张旋转贴纸图 + 文字，带 hover 效果）占 2/3 + 链接列（mono 大写标题 + 2px 下划线链接）占 1/3
- 底部小字免责声明

## 港学荟内容映射（12 张故事卡）
1. S-01 圣保罗男女中学 · 报告 · bg red · → reports/spcs.html
2. S-02 拔萃男书院 · 报告 · bg blue · → reports/dbs.html
3. S-03 玛利诺修院学校 · 报告 · bg purple · → reports/mcs.html
4. S-04 喇沙书院 · 报告 · bg yellow · → reports/la.html
5. H-01 40 校网到底有多强 · 热文 · bg green · → blog/net40-ranking.html
6. H-02 计分制逐项拆解 · 热文 · bg red · → blog/p1-scoring-guide.html
7. H-03 叩门信怎么写 · 热文 · bg blue · → blog/knocking-letter-guide.html
8. H-04 高才通插班全攻略 · 热文 · bg gray · → blog/talent-scheme-school-guide.html
9. H-05 一条龙/直属/联系 · 热文 · bg yellow · → blog/through-train-guide.html
10. H-06 41 vs 12 校网 · 热文 · bg green · → blog/school-net-41-vs-12.html
11. T-01 小学择校匹配 · 工具 · bg purple · → explore.html
12. T-02 幼稚园择校匹配 · 工具 · bg gray · → explore.html

实现：src/app/page.tsx（header/promo/footer，服务端组件）+ src/components/StoryGrid.tsx（use client，搜索+筛选可交互）+ globals.css --p-* token
