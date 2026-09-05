## 2026-09-03 三份报告部署事故与修复
- **问题**:约克蒙特梭利(元朗)/德怡(元朗)/海之恋 VEO 三份报告线上仍为旧版薄内容;部署"成功"但未生效,后续修复中又出现全站 404、API 500。
- **根因**:① 本地 `.vercel/project.json` 指向 pudding-clone,部署到错误项目;② hk-school-guide 项目 `framework=null`,Next.js 被当静态上传全站 404;③ 该项目生产 env 为空,`/api/verify` 返回 500。
- **修复**:项目重新 link 到 hk-school-guide;framework PATCH 为 nextjs;补全 STRIPE_SECRET_KEY + KV/REDIS env;`vercel deploy --prod --force` 重部署;验证报告页新内容 + 126 份数量统一 + API 正常。
- **沉淀**:完整部署清单见 `docs/deploy-checklist.md`,后续部署前对照执行。

# 港学荟 · 产品决策记录

## 2026-08-29 设计审计修复(A+B 批)
- **数字纠正**:「26 篇热文」→「33 篇」全站 4 处(首页区头、导航菜单、页脚 CTA、页脚链接),报告数 124 验证无误。
- **暗色模式适配**:文章强调块(黄/蓝/绿三色框、FAQ 灰字)原为写死的亮色,夜间模式刺眼。全部改为 CSS 变量 + 暗色档深色版(26 篇文章正文一次性批量替换);报告页组件(callout/优缺点/雷达图/表格头)同样补暗色覆盖。
- **故事卡日期自动读**:热文卡右上角月份原手写(41vs12 显示「6 月」实际 8月28日),改为从 blog-meta 自动读取。
- **故事卡副文渲染修复**:发现卡片 tease 字段此前从未显示(原站设计有灰副文),补上渲染。
- **内链改同窗口**:故事卡链接去掉新窗口打开。
- **页脚去重**:删「校网攻略」重复链接(与「40 校网排名」同址)。
- 41vs12 卡片简介同步新文案。

## 2026-08-28(第三轮)
- **41校网 vs 12校网 文章重写替换上线**(用户授权「替换 并部署吧」)。原 7月7日「真实体验」风格旧文有 3 处事实错误(塘尾道官立小学误列 41 网、圣若瑟误标「联系」实为直属、圣保禄天主教误标联系圣保禄学校实为直属圣保禄中学),全部修正;新文为数据版:两网名单全表、2024/25 学年首三志愿率(41 网 79.6% 全港第三 vs 12 网 70.4%)、首志愿率(41 网约 55% 全港最低)、直属/联系通路、边界陷阱(又一村属 40 网、华仁在 14 网)。slug 不变(URL 保住),meta 条目移到最前(编号 33),33 张 OG 图全量重生成。部署后已重绑 alias。

## 2026-08-28
- **7 篇 blog 文章上线,发布日期分散** 8月22日–8月28日每天一篇(与正文时效自洽:红雨文章 27 日事件当天、德萃面试文章 28 日、资助申请文章 26 日距截止 5 天)。
- **hkschool.guide 域名切换到 pudding-clone 新站**(用户明确授权)。原域名由旧 hk-school-guide 项目持有,已通过 `vercel alias set` 转移到新站;旧站内容未删除,仍在 Vercel(hk-school-guide.vercel.app 路径)。
- 部署方式:无 git 仓库,直接 `vercel --prod --yes` CLI 部署。

## 2026-08-28(第二轮)
- **SEO 基础优化上线**:33 篇文章页独立 title(截短+「| 港学荟」品牌尾)/description(正文自动提取 ~150 字)/canonical/OG 1200×630 横版分享图/JSON-LD Article 结构化数据;/blog 列表页独立标题;sitemap.xml(38 条);robots.txt(允许爬虫,挡 /api、/unlock)。待用户提交 Google Search Console + Bing Webmaster。
- 发现并修复:hkschool.guide 是手动 alias 绑定具体 deployment,每次部署后必须重绑(与 oopssubs 相同模式)。
- **用户已完成**:Google Search Console + Bing Webmaster 均已添加 hkschool.guide 并提交 sitemap.xml(2026-08-28)。
