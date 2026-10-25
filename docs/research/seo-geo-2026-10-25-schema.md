# SEO / GEO 结构化数据审计（2026-10-25）

基线：`6007a7d1`，正式部署 `dpl_98wSWe4ECQeFpf9LidnAwbELpZtu`。范围为现有首页、学校总入口、三学段入口及名录、简明资料页、深度报告、博客与专题集合。此文为代码审计；上线 HTML 抽样和验证器结果由总审计另行记录，不将源代码检查当作线上验收。

## 结论

旧的文章标记已具备基础，新增学校资料体系尚未接入完整实体关系：School 与资料网页、报告、来源之间没有机器可识别的稳定链接。优先统一图谱模型和面包屑，不能靠增加 FAQ、虚构作者或星级评价解决。

不使用 skill 的机械总分作为搜索表现：`sameAs` 数量、是否存在 Wikipedia、是否有 speakable 都不是本网站必须满足的评分指标。JSON-LD 语法有效、Schema.org 属性语义正确、Google 富结果资格、被搜索或 AI 引用是四个不同层次。

## 已有基础

| 范围 | 当前实现 | 证据 |
|---|---|---|
| 首页 | Organization + WebSite，统一 organization / website ID | `src/app/(tc)/page.tsx:14-50` |
| 博客文章 | Article、真实日期元数据、组织作者、图片、面包屑 | `src/lib/blog.ts:119-145` |
| 报告 | Article、公开访问声明、来源 citation | `src/lib/reports.ts:159-190` |
| 简明资料页 | School、英文名、电话、官方网站 sameAs、单校址地址 | `src/components/schools/SchoolProfilePage.tsx:57-76` |
| 方法页 | AboutPage、组织关系、面包屑 | `src/components/MethodologyPage.tsx:6-28` |

这些 JSON-LD 均由服务端组件直接输出；没有发现必须等待客户端请求才出现标记的问题。多校址 School 不输出拼接成一个地址的 PostalAddress，是正确的边界，应保留。

## 优先修复

### P1：资料页的学校实体没有稳定标识，也未区分网页和学校

位置：`SchoolProfilePage.tsx:57-76`。目前仅 School 对象，`url` 是本站资料页，未设置 `@id`、教育局编号 identifier、WebPage / mainEntity、引用来源、面包屑。已有学校编号、来源与核对日期在模型和页面可见处，无须新研究即可准确表达。

建议共享 helper 构建 `@graph`：

- School：稳定 ID（按已有 stage + 唯一学校 slug，或现有 registryKey；不要按可变显示名），`identifier` 用教育局学校编号的原有已验证六位值，不擅自解释旧式登记号码。`url` 表示本站资料入口；已核实官方站使用 `sameAs`，不伪装平台为办学方。
- WebPage：本语种 URL、`inLanguage`、`isPartOf`、`publisher`、`mainEntity` 指向 School。网页 ID 与学校 ID 分离；繁简网页链接同一学校实体。
- `citation` 放在 WebPage（CreativeWork）上，从现有可见 `sources` 读取去重来源；不将评论来源转为学校官方确认。
- BreadcrumbList：与可见路径一致，包含首页、学段、学校名录、学校名。
- `reviewedAt` 只用于审核信息或可见审核记录；不能直接当作内容修改日期或招生资料更新日期。

### P1：文章的 breadcrumb 挂错层级

位置：`src/lib/blog.ts:137-143`、`src/lib/reports.ts:180-187`。当前在 Article 上直接使用 `breadcrumb`；Schema.org 该属性适用于 WebPage，不是 Article。JSON 可以解析并不等于语义正确。

建议在图谱中分别输出 Article、WebPage 和 BreadcrumbList；WebPage.breadcrumb 引用面包屑，Article.mainEntityOfPage 引用 WebPage。最低限度也可以独立输出 BreadcrumbList，避免错误 Article 属性。

### P2：文章/报告内组织作者仅有外部 ID 引用，页面缺少自足的作者信息

位置：`blog.ts:132-133`、`reports.ts:170-171`；Organization 具体定义只在首页。引用 ID 本身并不是 JSON-LD 语法错误，但单页抽取时无法直接获取作者名称。

建议共享 organization node：只使用已可见的“港学荟 / 港學薈”、网站 URL、真实方法页，不虚构专家姓名、学历、机构背书、电话号码、社交账号。Article.author / publisher 指向这个节点。加组织作者信息不会证明专业资质；如需真人署名，须真实人工提供。

### P2：新集合页尚无 CollectionPage / ItemList

位置：`SchoolStagesLanding.tsx:10-54`、`SchoolStageHub.tsx:9-89`、`SchoolDirectoryPage.tsx:9-42`、`BlogClusterPage.tsx:10-61`。目前可见列表已有链接，但没有对应集合语义。

建议三学段入口、名录、博客专题使用 CollectionPage + ItemList，并附面包屑。ItemList 只能列出该请求实际可见的学校/文章，不能在只显示 50 所的第一页 schema 中宣称展示全部 900 多个条目；分页后 position 应保持真实偏移、numberOfItems 与当前列表范围语义一致。

### P2：报告尚未关联到已核实的学校实体

位置：`reports.ts:164-189`。正文标题有 schoolName，但没有 `about` 指向 School，也没有反向资料页关系。学校资料模型已经包含 reportSlug / relatedReportSlugs，可复用人工校验过的映射，不需要模糊匹配同名学校。

建议明确映射时 Article.about 指向统一 School ID；不能把多校区报告强行对应一个校区，不能只按标题字符串猜同一实体。报告页可见区域也应提供“学校资料”链接，支持用户和爬虫走同一条路径。

## 不应为过审而添加

- 不将平台 S/A/B 或 Band 定位包装成 AggregateRating / Review 星级；不是独立用户评分，亦没有可靠评分人数。
- 不为所有学校硬造 FAQ。只有真实页面可见的完整问答才适合标记。
- 不承诺 FAQ 富结果；Google 目前主要限于知名政府、医疗站点。
- 不凭 skill 添加无实际搜索入口的 SearchAction，不为搜索框过时展示功能制造虚假 URL。
- 不用当日时间批量刷新 dateModified。博客只取已有 updatedAt，报告没有明确发布日期就留空；缺少推荐字段不构成伪造日期的理由。
- 不强制 JSON-LD 必须在 head。Google 支持 head 或 body 内 JSON-LD；当前服务端输出方式可保留。
- 不伪造 sameAs 社交资料、学校地址、专家资格或机构 logo；只引用已经存在且匹配的资源。

## 验收建议

1. 对全量模型运行结构化数据生成校验：JSON 可解析、绝对 URL、稳定且唯一的 ID、繁简同一实体、来源去重、没有未知 School 映射。
2. 抽样三学段 × 两种语言的首页/尾页/资料页；确认返回初始 HTML 就含 JSON-LD，不依赖执行 JS。
3. 检查 Article 没有 breadcrumb 属性；WebPage / CollectionPage 引用正确 BreadcrumbList。
4. 文章/报告作者节点能在同一文档解析到 Organization；不添加 Person / AggregateRating。
5. 检查所有 schema 清单项存在于可见列表，页面 canonical 与 WebPage.url 一致。
6. 用 Schema.org Validator 查语义，用 Google Rich Results Test 查 Google 支持的展示资格；分别保存结果，不能把任一通过写成已获收录或 AI 引用。

## 官方依据

- [Schema.org breadcrumb 的适用类型是 WebPage](https://schema.org/breadcrumb)。本次实际读取。
- [Google Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)：作者可用 Person 或 Organization，并应提供名称、可消歧 URL；标记帮助理解，不保证展示。本次实际读取。
- [Google 结构化数据入门](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)：语法、内容与支持类型需要分开判断。本次实际读取。
- 已读本仓库 `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`；metadata / generateMetadata 限服务端组件，保留目前服务端生成模式。

## 本轮已实施与校验

经主任务确认后，修改 `src/lib/reports.ts`、`src/lib/blog.ts`，新增 `src/lib/structured-data.ts`：

- 文章与报告输出独立 Organization / WebSite / Article / WebPage / BreadcrumbList 图谱；Article 的 `mainEntityOfPage` 与 WebPage 的 `mainEntity` 双向指向。
- 每份文档包含真实的组织作者名称和站点节点，消除只给外部 ID 的单页消歧缺口。
- `breadcrumb` 仅挂 WebPage，不再挂 Article。保留所有原有报告标题、摘要、引用与免费声明、博客已记录日期。
- 不导入学校大模型；报告到学校实体的 `about` 映射留待避免循环依赖的显式映射实现。
- 共享安全序列化 helper 将字面 `<` 转义为 JSON Unicode 字符，避免外部来源文字意外关闭 script 元素；内容解析后仍一致。

验证：scoped ESLint 通过；`npm run typecheck` 通过；临时全量函数校验 `/private/tmp/check-hkschool-schema.cjs` 对 **228 份报告 + 54 篇博客 × 2 语种 = 564 份图谱** 检查：必备节点、唯一 ID、组织作者可解析、双向网页/文章关联、面包屑末项与网页 URL 一致、标题与原生成器相同、报告免费声明保留、日期不编造，**0 失败**。字面 closing-script 安全序列化往返校验通过。

此处仍不声称已通过第三方线上验证器或已产生流量提升。页面渲染及整站构建由主任务统一验收。
