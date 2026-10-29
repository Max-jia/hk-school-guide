# Batch 18｜2026-10-28｜三份旧报告来源补齐与关键事实更新

## 范围

- 學之園幼稚園（海翩康城）（`lh-hp`）
- 靈糧堂秀德小學（`lht`）
- 靈光小學（荃灣深井）（`lkps`）

本批重点处理会影响费用、语言与教学判断、入学安排、升学去向和家庭通勤选择的旧数字。没有公开分母、可读附件或当届数据的项目改为明确待核，不以旧年份数值或推算替代。

## 主要核对与改动

### 學之園幼稚園（海翩康城）

- 以校方2026/27收费页更新PN、粤英班、普英班月费及教材杂费；正文区分收费与杂费，不再沿用2024/25旧学费。
- 以校方2027/28招生页更新申请和面试日期，并标示自行分配阶段已结束；校方未公开校区学额、申请人数或录取率，不再推断PN入读可保证K1升班。
- 以教育局2025/26幼稚园概览补列基础人事与师生比例来源，注明人数快照为2024年9月；校方毕业生去向是品牌层面数据，不当作海翩康城校区升小率。
- 清除未有同年度官方收费依据的竞品学费、师生比例比较值。
- 来源：[教育局学校资料](https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=612391000111)、[教育局《幼稚园概览2025/26》](https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=7007)、[校方2026/27学费](https://www.learninghabitat.org/en/admission/fees)、[校方招生页](https://www.learninghabitat.org/en/admission/online-application)、[校方课程与班制](https://www.learninghabitat.org/en/admission/programmes)、[校方升小去向](https://www.learninghabitat.org/en/p1-placement-results)。

### 靈糧堂秀德小學

- 以《小学概览2026》更新2025/26实际及2026/27核准班数、教师人数、收费和师资数据；把旧的57名教师改为62名，更新学历和特殊教育培训比例。
- 重写同区比较表，统一采用《小学概览2026》的收费年度、教师年度、班数年度和校舍面积口径；删除同行学校未经证实的Banding、旧面积数字及“最佳选择”式结论。
- 保留校方确认的一条龙关系，但说明公开结果页面没有可读取的当届毕业生分母和逐校升读人数；不再沿用旧升读比例或以第三方Banding估算替代。
- 来源：[《小学概览2026》秀德资料](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&return_page=sch_list.php%3Flang_id%3D2%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D3%26sort_id%3D-1&sch_id=68)、[《小学概览2026》东涌天主教学校](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&return_page=sch_list.php%3Flang_id%3D2%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D3%26sort_id%3D-1&sch_id=58)、[《小学概览2026》黄楚标学校](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&return_page=sch_list.php%3Flang_id%3D2%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D3%26sort_id%3D-1&sch_id=64)、[《小学概览2026》可誉](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=70)、[校方一条龙说明](https://www.llcst.edu.hk/primary/tc/secondary-cohesion)、[校方升中结果入口](https://www.llcst.edu.hk/primary/tc/allocation-s1-places-result)。

### 靈光小學（荃灣深井）

- 明确区分目标学校与九龍靈光小學；更新2025/26师资比例为师资培训95%、硕士或以上25%、十年以上年资45%。修正旧稿把95%换算成约3人、把当前比例写成30%及50%的错误。
- 移除未能从可读官方名册核实的2027年度自行分配学额“13个”及“全网最少”结论；删除升中比较表中的当届学额数字。2026年度统一派位暂定学额单独保留并标明年度和类别，不作为总收生数或录取率。
- 移除用全校面积除以班数推导“每班可用面积”、以及由班数推算插班成功率的说法；把家长口碑部分改为明确说明近期独立样本不足。
- 来源：[《小学概览2026》靈光小學](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&return_page=sch_list.php%3Flang_id%3D3%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D16%26sort_id%3D-1&sch_id=393)、[校方2027年度自行分配安排](https://www.emm.edu.hk/%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D-%E7%AC%AC%E4%B8%80%E9%9A%8E%E6%AE%B5)、[校方升中派位入口](https://www.emm.edu.hk/%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D)、[教育局2026年度62校网统一派位名册](https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net62.pdf)。

## 验收

- `npm run build -- --webpack`：通过，TypeScript阶段通过，生成5,197个静态页面。
- `node scripts/validate-reports.mjs lh-hp lht lkps`：3份报告通过，0失败、0提醒。
- `node scripts/audit-report-sources.mjs --slugs lh-hp,lht,lkps`：通过；3份报告、6个繁简页面，可见来源链接与JSON-LD引用一致。
- `git diff --check`：通过。
- 对本批已修正的旧学额、师资、面积及比较结论作定向残留扫描：未发现目标旧断言。

## 边界

本批更新了明确列出的官方基础事实与高影响决策数据；没有把通过结构和来源验收表述为三份报告全部历史评论、评级模型或每条旧描述均重新认证。学之园家长论坛体验、秀德及靈光近期独立家长口碑仍缺少足够可归属样本；秀德和靈光升学结果中的附件/分母亦未能读取，因此保留为未核实。
