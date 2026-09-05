# 港学荟 · 部署清单与踩坑记录

> 最后更新：2026-09-03
> 用途：本仓库（Next.js 新站）每次部署前对照执行，避免重犯历史错误。

## 一、部署前必查（5 分钟）

1. **确认当前链接的项目**
   ```bash
   cat .vercel/project.json
   ```
   线上域名 `hkschool.guide` 绑定的是 **hk-school-guide** 项目（不是 pudding-clone）。
   若显示 `pudding-clone`，先执行：
   ```bash
   vercel link --yes --project hk-school-guide
   ```

2. **确认项目框架是 nextjs**
   ```bash
   vercel api "/v9/projects/hk-school-guide" | python3 -c "import sys,json;print(json.load(sys.stdin)['framework'])"
   ```
   必须输出 `nextjs`。若为 `null` 或 `None`，会导致部署被当成静态文件上传、全站 404，必须修复：
   ```bash
   echo '{"framework":"nextjs"}' | vercel api "/v9/projects/hk-school-guide" -X PATCH --input -
   ```

3. **确认生产环境变量已配置**
   ```bash
   vercel env ls production
   ```
   至少要有（缺一不可）：
   - `STRIPE_SECRET_KEY`（付款 / verify 接口）
   - `KV_REST_API_TOKEN`、`KV_REST_API_URL`（分享额度）
   - `KV_REST_API_READ_ONLY_TOKEN`、`KV_URL`、`REDIS_URL`（Upstash Redis）
   如果为空，用本地 `.env.local` 里的值补：
   ```bash
   vercel env add STRIPE_SECRET_KEY production --project hk-school-guide --yes
   # 粘贴值时不要回显到聊天/日志
   ```

4. **本地先构建验证**
   ```bash
   npm run build
   ```
   报告页数量口径：首页/报告页/详情页 CTA 统一为 126 份（小学 75 + 幼稚园 51）。

## 二、部署命令

```bash
vercel deploy --prod --force
```

- 无 git 仓库，直接用 CLI 部署（不要用 `git push`）。
- 如果提示 `Not authorized`，加 `--force --debug` 重试一次即可（CLI 偶发问题，不是权限问题）。

## 三、部署后必验（3 分钟）

```bash
# 1. 报告页内容是否为新版（检查新增章节关键词）
curl -s "https://hkschool.guide/reports/york-montessori-yl" | grep -o "评估方式与学习档案\|专家一句话建议" | sort -u
curl -s "https://hkschool.guide/reports/topkids-yl" | grep -o "Deborah 体系背景" 
curl -s "https://hkschool.guide/reports/veo-op" | grep -o "VEO 体系升小官方数据"

# 2. 首页/报告页数量是否统一 126
curl -s "https://hkschool.guide/" | grep -o "浏览全部 126 份报告"
curl -s "https://hkschool.guide/reports" | grep -o "全港 126 份小学及幼稚园深度择校报告"

# 3. API 是否可用（env 缺失会 500）
curl -s -X POST "https://hkschool.guide/api/verify" -H "Content-Type: application/json" -d '{}'
# 正常返回 {"ok":false} 或业务错误；出现 {"error":"server not configured"} 说明 env 丢了
```

## 四、历史踩坑记录

### 2026-09-03 三份报告部署事故（重要）
**症状**：用户反馈「3 个报告内容还是之前的版本，单薄」；线上 `/reports/veo-op` 等显示旧版内容。
**根因链**：
1. 本地 `.vercel/project.json` 当时指向 `pudding-clone`，第一次部署到了错误项目，域名无变化；
2. 重新 link 到 `hk-school-guide` 后，发现该项目 `framework=null`，CLI 把 Next.js 源码当静态文件上传，全站 404；
3. 部署看似成功（构建日志正常、READY），但线上任何路径都 `NOT_FOUND`；
4. 修复框架为 `nextjs` 后线上恢复，但又发现 `hk-school-guide` 项目 env 为空，`/api/verify` 返回 500「server not configured」。
**修复**：框架改 nextjs + 补全 env + 重新 `vercel deploy --prod --force`。
**教训**：部署成功 ≠ 生效。项目归属、framework、env 三者缺一都会出现「部署了但线上不对」。

### 2026-08-28 域名切换
- 域名原由旧站 `hk-school-guide`（静态）持有，曾用 `vercel alias set` 切到新站。
- 新站代码在本目录（`/Users/maxjia/hkschool.guide`），旧静态站仍在 Vercel，勿删。

### 2026-08-28 SEO 上线
- hkschool.guide 是手动 alias 绑定具体 deployment，每次部署后要确认 alias 指向最新 deployment（本次已改为项目级域名绑定，CLI 部署会自动更新）。

## 五、常见问答

**Q：为什么 `vercel --prod --yes` 会报 Not authorized？**
A：CLI 偶发，改用 `vercel deploy --prod --force --debug` 即可，不要因此误判权限。

**Q：报告数量到底是多少？**
A：126 份 = 小学 75 + 幼稚园 51。首页「浏览全部 126 份报告」、报告页「全港 126 份小学及幼稚园深度择校报告」、详情页 CTA 动态计算，三处必须一致。若改数据，同步改 `src/content/report-meta.json` 后全站自动更新。

**Q：部署后如何回滚？**
A：`vercel ls hk-school-guide` 找到上一个 READY 的生产 deployment，然后：
```bash
vercel promote <deployment-url> --yes
```

## 六、2026-09-04 站点升级发布（P0/P1/P2）

### 本次上线内容

**P0 · SEO 基础补强**
- 列表页 `/reports` `/questions` `/tools` 各补一段数据来源/方法论说明，首页补数据覆盖说明
- 低文本报告页（kts / mc / sls / tpom）补「这份报告讲什么」导语
- 旧站 `.html` → 新路由 308 永久重定向确认，属预期收敛，不改 200

**P1 · 趋势与 GEO**
- 4 篇趋势文章上线：灵粮堂系爆搜、幼稚园开放日、马鞍山幼稚园、协恩幼稚园热搜
- 红雨文标题改为直接给答案，FAQ 补齐「中学/幼稚园红雨」关键词
- `public/llms.txt` 增强（数据资产 + 问答锚点）
- 新增公开结构化数据 `public/data/school-data.json`（669 小学 / 949 幼稚园 / 126 报告元数据）
- 工具页新增「只看有深度报告的学校」开关

**P2 · 功能板块**
- 18 区地区页体系：`/districts` 列表 + `/districts/{slug}` 详情（数据驱动，blurb 已按真实数据核对）
- 学校对比工具：`/compare`（小学/幼稚园双 tab，2-3 所并排对比，含报告直达链接）
- 导航新增「分区盘点」「学校对比」入口，sitemap 同步

### 上线后验证命令
```bash
curl -s "https://hkschool.guide/districts" | grep -o "香港 18 区小学与幼稚园盘点"
curl -s "https://hkschool.guide/districts/kowloon-city" | grep -o "喇沙小學"
curl -s "https://hkschool.guide/compare" | grep -o "2-3 所学校并排对比"
curl -s "https://hkschool.guide/data/school-data.json" -o /tmp/sd.json && python3 -c "import json;print(json.load(open('/tmp/sd.json'))['meta']['counts'])"
curl -s "https://hkschool.guide/llms.txt" | grep -o "school-data.json"
curl -s "https://hkschool.guide/blog/rainstorm-class-guide" | grep -o "中学红雨使唔使返学"
```

### 本次部署踩坑记录
- Vercel 部署偶发卡在 Queued 超 10 分钟未开始构建：中断本地 `vercel deploy` 进程后重试即成功，疑似并发构建排队，非代码问题。
- 修改 `src/app/sitemap.ts` 新增动态路由时，`changeFrequency` 需显式 `as const`，否则 TS 报类型错误。
- 新增地区页后，确认 `generateStaticParams` 覆盖全部 18 区 slug，构建产物 `.next/server/app/districts/` 下逐区生成 `.html`。

## 七、P3 长期项（2026-09-04）

### 已完成
- **家长问答 UGC**：`/questions` 顶部新增提问入口，`/api/questions` 读写 Redis（`qa:list`），同 IP 60 秒 1 条限流；公开列表展示最近问题。
- **开放数据 API**：`/api/schools` 支持 `type/district/net/tier/q/limit/offset` 筛选，返回小学+幼稚园公开字段；已写入 llms.txt 供 AI 引用。

### 已撤下（不放在公开站）
- **小红书分发**：曾做成 `/xhs` 公开页并加入导航/sitemap，后确认属运营内部工具，已从站内移除（页面 404、导航/sitemap 无残留）。
- 素材数据保留在本地 `src/content/xhs-pack.json`（22 篇趋势文：标题/正文/话题标签），供发布时取用；不在公开站渲染。
