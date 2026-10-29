# Batch 17｜2026-10-28｜三份旧报告来源补齐与关键事实更新

## 范围

- 九龍塘學校（小學部）（`kts`）
- 救恩學校（幼稚園部）（`ky`）
- 獅子會何德心小學（`lchhds`）

本批优先修正会直接影响家庭选择的当届课程、班级、收费、招生及升学数据，并补上可追溯的官方来源。未公开的申请分母、升学比例和费用不作推算；未复核的横向比较明确标为待核对。

## 主要核对与改动

### 九龍塘學校（小學部）

- 以教育局《小学概览2026》更新学校类别、教学语言、2026/27学费、班级与师资资料；区分中文科普通话授课和常识/科学英语授课，不写成全科英语。
- 以校方2026升中去向清单更新逐校人数，说明名单无毕业生分母及名单覆盖口径，不计算升中率或Band比例。
- 以校方2027/28招生页更新小一申请、两轮面试及放榜时间；插班年级、空缺和考核细节未见完整公开，改为按当届公告核对。
- 校方来源：[教育局《小学概览2026》](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=114)、[2026升中去向](https://www.ktsps.edu.hk/3/02_4.html)、[2027/28小一招生](https://www.ktsps.edu.hk/9/01_2.html)。

### 救恩學校（幼稚園部）

- 以2026/27基本资料更新学费HK$10,930、上午/下午班各9班、师生比例分别为1:11及1:9、广东话为主及英语/普通话专责教师安排。
- 以2027/28招生准则与行事历明确申请期限、面试安排和已截止状态；约800为预计面谈人数而非招生学额。
- 以2025/26升小统计只呈现去向范围，不推算比例；FAQ确认报读联繫小学可获额外分数，但仍须同一标准面试及达标，没有固定取录配额。
- 第7章删去旧稿未经核实的学校评级、收费、英文课时、Band 1A与“直升保障”比较；对未复核的竞品资料明确标示待官方核对。
- 校方来源：[2026/27学校基本资料](https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/10/2026-27_%E5%AD%B8%E6%A0%A1%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99_r2_20261012.pdf)、[2027/28招生行事历](https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/08/2027-28_%E6%8B%9B%E6%94%B6%E5%B9%BC%E5%85%92%E7%8F%AD%E6%96%B0%E7%94%9F%E8%A1%8C%E4%BA%8B%E6%9B%86v2.pdf)、[收生准则](https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/08/2027-28_K1-%E6%94%B6%E7%94%9F%E6%BA%96%E5%89%87Admission-criteria.pdf)、[升小统计](https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/08/2025-2026%E5%B9%B4%E5%BA%A6%E9%AB%98%E7%8F%AD%E5%8D%87%E5%B0%8F%E4%B8%80%E7%B5%B1%E8%A8%88.pdf)、[升小与插班FAQ](https://www.kauyan.edu.hk/kindergarten/admissions/faq/)。

### 獅子會何德心小學

- 以教育局《小学概览2026》核实：全校25班、2026/27小一5班、7位外籍英语教师；小一双班主任安排仅按校方原文说明，不外推至其他年级。
- 修正分班信息：一至三年级随机编班（英语增润计划的两个班除外）；四至六年级按整体学业成绩分班。更新小一全年0测0考、二至六年级每年3次考试、没有测验等安排。
- 以校务报告说明2023–2025届107人中87人（81%）获第一志愿或自行分配阶段学位。这是合并指标，不是Band 1升读率或单一派位阶段比例。
- 删除由63个自行分配学额推导的申请胜算、旧班额推算与家庭承担境外交流费用等无原始依据断言；相关未知项改为建议向校方确认。
- 校方来源：[教育局《小学概览2026》](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&return_page=sch_list.php%3Flang_id%3D1%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D18%26sort_id%3D-1&sch_id=474)、[2024/25周年校务报告](https://www.htsps.edu.hk/attachment/upload/files/01%E5%AD%B8%E6%A0%A1%E6%A6%82%E8%A6%BDPDF/%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83%E5%8F%8A%E5%A0%B1%E5%91%8A/%E5%91%A8%E5%B9%B4%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8A/2024-2025%E5%B9%B4%E5%BA%A6%E5%91%A8%E5%B9%B4%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8Aa.pdf)、[入学申请入口](https://www.htsps.edu.hk/tc/content.php?wid=135)、[升中结果入口](https://www.htsps.edu.hk/tc/content.php?wid=270)。

## 验收

- `npm run build -- --webpack`：通过，生成5,197个静态页面，TypeScript阶段通过。
- `node scripts/validate-reports.mjs kts ky lchhds`：3份报告通过、0失败；保留3条非阻断提醒，均为评级标签中的“本平台”措辞。
- `node scripts/audit-report-sources.mjs --slugs kts,ky,lchhds`：通过，3份报告、6个繁简页面；可见来源链接与JSON-LD引用一致。
- `git diff --check`：通过。

## 边界

本批不是对三份报告所有历史家长口碑、评级维度及全部竞品字段逐句重做认证。救恩第7章其他学校数据标明未在本批复核；獅子會何德心小學报告内未触及的细节仍应视为原稿既有内容，不因本批通过结构与来源验收而自动获得重新认证。
