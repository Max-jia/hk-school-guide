# Batch 16｜2026-10-28｜三份小学报告来源复核与关键事实修订

## 范围

- 九龍塘天主教華德學校（`ktbwcs`）
- 九龍塘官立小學（`ktgps`）
- 九龍真光中學（小學部）（`ktl`）

本批针对报告已有重要事实补入可追溯官方来源，更新容易影响家庭选择的过时收费、招生、评估与升中表述。没有把旧稿出现的升读比例、申请竞争倍数或匿名评论当作已核实事实。

## 主要核对与改动

### 九龍塘官立小學

- 以教育局《小学概览2026》确认校网41、官立男女校、教学语言、2026/27收费、师资、班级、评估安排及三所提名中学。
- 区分教育局“提名中学”和校方“联繫中学”两个原始用语；说明都不能解读为自动录取或一条龙。
- 引入校方2024–2026升中去向名单。名单公开学校名称，但没有逐校人数和毕业生分母；移除旧稿7.5%、6人、逐校人数估算及“每年仅三四个”等不能从当前可访问原件验证的比例/数量。

### 九龍真光中學（小學部）

- 以教育局《小学概览2026》确认男女校、中文及英文教学语言、2026/27学费HK$68,270、其他列明费用、教师数、班级、每年三次考试、没有定期测验及P1首学期多元评估。
- 校方招生文件确认2027/28小一申请期、费用邮寄期限、两轮面试及放榜日期；报告注明截至核对日申请已截止，后续节点待公布。
- 校方插班网页只确认P1–P3的文件要求、个案审阅和笔试；删除未获官方依据的P2–P6全年开放、固定考试科目和确定空缺推断。
- 删除未证实的约半数／90%升中比例、性别构成推测、男生社交结论、三测三考误述和同学实际班额推算。六年静态学费估算更新为HK$409,620（按HK$68,270固定六年，不含其他收费，非未来收费承诺）。

### 九龍塘天主教華德學校

- 以教育局《小学概览2026》来源确认学校基础资料，并保留其余报告未在本轮核查范围内的评价边界。

## 官方来源

- [九龍塘天主教華德學校｜教育局《小学概览2026》](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&return_page=sch_list.php?lang_id%3D1%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D6%26sort_id%3D-1&sch_id=72)
- [九龍塘官立小學｜教育局《小学概览2026》](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=109)
- [九龍塘官立小學｜校方升中资讯](https://www.klntong.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&refid=3252)
- [九龍塘官立小學｜2024–2026升中去向名单](https://www.klntong.edu.hk/it-school/php/webcms/files/upload/tinymce//20252026/_1672026_1784700348.pdf)
- [九龍真光中學（小學部）｜教育局《小学概览2026》](https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=91)
- [九龍真光小學｜2027/28小一招生专页](https://www.ktlsps.edu.hk/202728p1-admission/)
- [九龍真光小學｜2027/28招生时间表](https://www.ktlsps.edu.hk/wp-content/uploads/2026/09/2027-2028-P1-Admission-Schedule-1.pdf)
- [九龍真光小學｜小一至小三插班申请](https://www.ktlsps.edu.hk/admission/primary-one-to-three-admission/)
- [九龍真光小學｜校方官网](https://www.ktlsps.edu.hk/)

## 验收

- `npm run build -- --webpack`：通过，生成5,197个静态页面；Next.js TypeScript阶段通过。
- `node scripts/validate-reports.mjs ktbwcs ktgps ktl`：3份报告通过、0结构失败；6条文字提醒均指向允许用于评级的“本平台”评级标签或口碑引文边界提示。
- `node scripts/audit-report-sources.mjs --slugs ktbwcs,ktgps,ktl`：通过，3份报告、6个繁简页面；可见来源链接与JSON-LD引用一致。
- `git diff --check`：通过。

## 边界

这次只更新有官方依据的关键事实和误导性数字，没有重新审计三份报告中所有历史口碑、同类校比较或平台自评评级。仍不能称为对整份报告所有事实的逐句重新认证。后续批次沿用此边界，并继续优先处理会改变家长选择的收费、招生、课程、派位及升中数据。
