# 深度择校报告生成规则

## 一、数据来源

| 数据 | 文件 | 提取字段 |
|------|------|---------|
| 小学基础数据 | `data/schools_primary.json` | `school_no, name_zh, name_display, name_en, finance_type, district_zh, gender, religion_zh, address_zh, tel, website, lat, lng, school_net, fees, teaching_language, through_train, teacher_ratio, school_bus, progression, features, sessions` |
| 小学四因子评级 | `data/primary_tiers_v9.json` | `tier, anchor, consensus, competition, hereditary, total, relation, best_sec` |
| 中学 Banding 参考 | `data/sec_school_banding_v2.json` | `score_map`（Band 1A++=100, 1A+=92, 1A=85, 1B+=75, 1B=65） |
| 校网覆盖区域 | `data/nets.js` | 校网号 → 覆盖地区 |

---

## 二、报告结构（8 章）

### 小学报告

| 章节 | 标题 | 核心内容 |
|------|------|---------|
| 0 | 数据可靠性声明 | 固定模板，不可省略 |
| 1 | 学校定位与核心竞争力 | 档案表 + 四因子解读 + 雷达图 + 专家定位 + 适合/不适合 |
| 2 | 教学深度解读 | 课程体系 + 考试与功课量 + 师资分析 + 校舍设施 + 教学局限(≥3条) |
| 3 | 升中通路全景 | 联系中学体系 + 升中派位数据 + 风险提示(≥2条) |
| 4 | 小一入读攻略 | 录取难度 + 自行分配 + 统一派位 + 叩门攻略 + 提升概率建议(≥5条) |
| 5 | 插班与叩门攻略 | 插班流程 + 叩门攻略 + 求位信策略 + 核心原则 |
| 6 | 在读家庭真实画像 | 口碑采样标注 + 👍 Top 5 + 👎 Top 5 + 匿名分享(≥2条) |
| 7 | 同类校横向对比 | 同区/同网对比表 + 决策树 |
| 8 | 专家总结与建议 | 价值判断 + 投入vs回报 + 风险提示 + Plan B + 一句话建议 |

### 幼稚园报告

与小学报告结构相同，但：
- 第 3 章改为「升小通路全景」
- 第 4 章改为「K1 入读攻略」
- 雷达图为五维（无四因子）

---

## 三、核实度标注体系（强制）

报告中每个事实性断言必须标注：

| 标记 | 含义 | 示例 |
|------|------|------|
| ✅ | 官方数据 / 多源交叉确认 | `✅ CHSC_2025` |
| 🟡 | 单一可靠来源（正规媒体/官方） | `🟡 TOPick 校长专访 2024` |
| 🔴 | 有限来源（家长讨论区/匿名帖） | `🔴 教育王国 BK 家长分享` |
| 💬 | 主观分析 / 专家观点 | `💬 专家分析` |

---

## 四、写作规则

### 必须遵守

1. **不编造数据** — 无法核实的写「校方未公开」或「暂无数据」
2. **不写绝对化语言** — 禁止「一定」「100%」「足矣」「必进」
3. **诚实指出局限** — 第 2 章至少 3 条教学局限，第 3 章至少 2 条风险提示
4. **来源必标注** — 每个数据点标注 ✅🟡🔴💬
5. **简体中文写作** — 学校官方名称保留繁体原文

### 禁止

- 小红书、知乎、百度作为唯一口碑源（须优先引用 BK/教育王国等 HK 本地源）
- 跨校复制粘贴残留（如单一校舍出现「各校做法不同」）
- 章节标题重复
- 占位符文字残留（「[待补充]」「TODO」等）

---

## 五、报告 HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-HK" data-report-code="{code}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{校名} · 深度择校报告 | 港校指南</title>
  <link rel="stylesheet" href="./assets/style.css" />
  <link rel="stylesheet" href="./assets/report.css" />
  <style>
    /* 雷达图/评分条专用样式（根据学校数据调整） */
  </style>
  <link rel="stylesheet" href="./assets/paywall.css">
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"></script>
  <script src="./assets/auth.js"></script>
  <script src="./assets/paywall.js"></script>
</head>
<body>
<header class="report-hero hero-tier-{tier_class}">
  <div class="container">
    <div class="tier-mega">{等级标签}</div>
    <div class="hero-title-row">
      <h1>{校名} 深度择校报告</h1>
      <div class="lang-switch"><a href="./report-{code}-tc.html">繁</a></div>
    </div>
    <p class="sub">{英文名} · {地区}({校网}) · {创校年份} · {关键特征}</p>
  </div>
</header>
<main class="report-body">
  <!-- ===== 0 数据可靠性声明 ===== -->
  <div class="callout warn" style="margin-bottom:24px;background:#fff8e8;border-left-color:#e6a817">
    <strong>本报告数据可靠性声明</strong><br />
    （固定模板）
  </div>
  <!-- ===== 1~8 章 ===== -->
  <!-- 第 1 章... -->
  
  <!-- ===== 付费墙 ===== -->
  <!-- 付费墙 HTML（固定模板） -->
  
  <div id="premium-content" style="display:none">
    <!-- 第 2~8 章... -->
  </section>
  </div>
  
  <!-- CTA -->
  <div class="cta-banner" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;border-radius:12px;padding:32px 28px;margin:48px 0 0;text-align:center">
    <h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 8px;color:#fff">获取更多学校的深度择校报告</h3>
    <p style="font-size:15px;color:rgba(255,255,255,.85);margin:0 auto 24px;max-width:520px">我们为全港 90+ 所评级学校准备了同等深度的择校报告——每一份都包含专家解读、入读攻略、家长口碑和横向对比。找到最适合你家的那一所。</p>
    <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一键解锁全部 112 份报告（含后续新增）</span></a>
  </div>
</main>
<footer class="footer">
  <div class="container" style="text-align:center">
    <strong>港校指南</strong> · 帮助内地来港家庭解决香港升学信息不对称<br />
    <span style="font-size:12px">本报告事实性数据来自香港教育局/家校会官方数据及公开报道，已标注来源。主观分析部分由教育研究团队撰写，仅供参考，不构成入学建议。各校招生政策以学校最新公布为准。</span>
  </div>
</footer>
</body>
</html>
```

---

## 六、必备组件清单（每份报告强制包含）

| # | 组件 | 位置 | 说明 |
|---|------|------|------|
| 1 | **数据可靠性声明** | 第 0 节 | 固定模板，不可省略 |
| 2 | **付费墙** | 第 1 章之后、第 2 章之前 | 3 个按钮：HK$198 全解锁 + HK$19.9 单份 + 创建帐号 |
| 3 | **premium-content 包裹** | 付费墙之后 → `</main>` 之前 | `<div id="premium-content" style="display:none">` 包裹第 2-8 章 |
| 4 | **底部 CTA 横幅** | `</main>` 之前 | HK$198 一键解锁全部报告 |
| 5 | **页脚** | `</main>` 之后 | 固定模板：港校指南 · 帮助内地来港家庭… |
| 6 | **简繁切换** | Hero 标题旁 | `<div class="lang-switch"><a href="./report-{code}-tc.html">繁</a></div>` |

### 付费墙固定模板

```html
<!-- ===== 付费墙 ===== -->
<div class="paywall-overlay" id="paywall">
  <h3>解锁全部 8 章深度分析</h3>
  <p class="pw-sub">试读结束。购买后解锁教学解读、升学通路、入读攻略等全部内容</p>
  <div class="pw-all-access">
    <div class="pw-badge">🔥 最划算 · 含后续新增</div>
    <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03">
      <span class="pw-price">HK$198</span>
      <span class="pw-label">一键解锁全部 112 份报告</span>
    </a>
    <div class="pw-strike"><s>原价 HK$399</s> 省 HK$201</div>
  </div>
  <div class="pw-features">
    ✅ 教学解读 &nbsp; ✅ 升学通路 &nbsp; ✅ 入读攻略<br>
    ✅ 插班叩门 &nbsp; ✅ 家庭画像 &nbsp; ✅ 同类对比 &nbsp; ✅ 专家总结
  </div>
  <div class="pw-buttons">
    <a class="pw-btn pw-btn-primary" target="_blank" rel="noopener" href="https://buy.stripe.com/bJe6oG1XJ3lbd7G8Pm3sI02">
      <span class="pw-price">HK$19.9</span>
      <span class="pw-label">单份解锁 · 本报告</span>
    </a>
    <a class="pw-btn pw-btn-secondary" target="_blank" rel="noopener" href="https://buy.stripe.com/bJe6oG1XJ3lbd7G8Pm3sI02">
      <span class="pw-price">HK$19.9</span>
      <span class="pw-label">注册购买 · 永久保存</span>
    </a>
  </div>
  <div class="pw-single-strike"><s>原价 HK$29.9</s></div>
  <div class="pw-recover">已购买？<a href="/unlock.html">点此恢复 →</a></div>
</div>

<div id="premium-content" style="display:none">
```

### 底部 CTA 固定模板

```html
<div class="cta-banner" style="background:linear-gradient(135deg,#4338ca,#6366f1);color:#fff;border-radius:12px;padding:32px 28px;margin:48px 0 0;text-align:center">
  <h3 style="font-family:Newsreader,serif;font-size:22px;font-weight:700;margin:0 0 8px;color:#fff">获取更多学校的深度择校报告</h3>
  <p style="font-size:15px;color:rgba(255,255,255,.85);margin:0 auto 24px;max-width:520px">我们为全港 90+ 所评级学校准备了同等深度的择校报告——每一份都包含专家解读、入读攻略、家长口碑和横向对比。找到最适合你家的那一所。</p>
  <a class="pw-btn-all" target="_blank" rel="noopener" href="https://buy.stripe.com/7sY8wO6dZ5tj0kU0iQ3sI03" style="display:inline-block;text-decoration:none"><span class="pw-price">HK$198</span><span class="pw-label">一键解锁全部 112 份报告（含后续新增）</span></a>
</div>
```

### 繁体版报告

每份简体报告需要同步生成繁体版 `report-{code}-tc.html`，内容与简体版一致（仅文字转换为繁体中文）。

---

## 七、验证流程（强制）

### 自检清单

写完报告后逐条核对：

**必备组件**
- [ ] 数据可靠性声明（第 0 节）
- [ ] 付费墙（第 1 章之后）+ premium-content 包裹（第 2-8 章）
- [ ] 底部 CTA 横幅（`</main>` 之前，含 HK$198 按钮）
- [ ] 页脚（固定模板）
- [ ] 简繁切换链接

**内容质量**
- [ ] 文件最后一行是 `</html>`，未被截断
- [ ] 声明块以「不构成入学建议。」完整结尾
- [ ] 8 章齐全，每章有实质性内容（非一两行占位）
- [ ] 第 1 章含雷达图/四因子评分条
- [ ] 第 2 章含 ≥3 条教学局限
- [ ] 第 3 章含 ≥2 条风险提示
- [ ] 第 4 章含 ≥5 条入读建议
- [ ] 第 5 章插班/求位策略针对该校（非通用模板）
- [ ] 第 7 章对比表 ≥3 所竞品 + 决策树
- [ ] 所有 ✅ 标注字段来自官方数据
- [ ] 🟡 标注注明具体来源
- [ ] 无跨校复制粘贴残留
- [ ] 无残留占位符（TODO/待补充）
- [ ] HTML 标签全部闭合
- [ ] 章节编号 1→8 连续

**繁体版**
- [ ] 简体版通过验证后，同步生成繁体版 `report-{code}-tc.html`
- [ ] 繁体版仅文字转繁，结构完全一致

### 自动验证

```bash
python3 scripts/validate_report.py report-xxx.html
```

必须跑出 `✅ 全部验证通过！` 才可提交。

---

## 七、批次处理计划

### 第一批（10 所）：A 级 + B 级高分
优先级：A 级 1 所 + B 级总分≥40 的学校

| # | 学校 | 等级 | 总分 | 联系中学 |
|---|------|------|------|---------|
| 1 | 聖羅撒學校 | A | 56 | 聖羅撒書院 |
| 2 | 救恩學校 | B | 46 | 匯基書院 |
| 3 | 聖類斯中學(小學部) | B | 45 | 聖類斯中學 |
| 4 | 九龍塘學校 | B | 43 | 无 |
| 5 | 循道學校 | B | 37 | 无 |
| 6 | 油蔴地天主教小學(海泓道) | B | 36 | 无 |
| 7 | 大埔舊墟公立學校 | B | 36 | 无 |
| 8 | 塘尾道官立小學 | B | 35 | 伊利沙伯中學 |
| 9 | 聖母小學 | B | 35 | 聖母書院 |
| 10 | 佐敦道官立小學 | B | 35 | 伊利沙伯中學 |

### 第二批（10 所）：B 级联系 Band 1A 中学的学校

### 第三批及以后：其余 B 级学校

### 每批流程
1. 逐所生成报告 HTML
2. 运行验证脚本
3. 浏览器打开验证
4. 自检清单逐条核对
5. 确认通过后提交部署
