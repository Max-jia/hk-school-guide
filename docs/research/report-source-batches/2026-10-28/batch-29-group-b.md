# 第29批 B组来源核验

核对日2026-10-28。已完成原件研究及三校修订，保留八章和原有评级图。仅处理wkf、ycis、ycis-kt；不动注册表台账、不build/commit。

## 已核与修订

- **wkf跨学段**：小学现费46600，高中GCE52400不能当小学国际部；非本地学生签证路径另价且不等于受养人。小一零测考，小二已两次期终、小三至六一次测验两次期终；第三语言G5起。2027 G1申请已截止、二轮当前10月底至11月、12月结果，官方15%沙田居民上限与不设派位校网并存。2026 DSE达标80与本科85口径不同；72A*是科目个数、19G5是offers，不编个人录取率或DSE保底Band。原匿名长引文及70/20/10口碑比例无证据须移除。
- **ycis品牌**：当前校历五个地址／注册条目，不是3分校；两个Somerset注册须分清。EYFS幼教、英粤双语、普通话到访，不套IB幼稚园。2026/27品牌费表与EDB学费加餐费分别列；3岁以上债券15万，两岁不适用；TKO20%学费折扣非每年42000建校费。五岁半日2027/28不适用。香港2024IB122注册与网络／幼稚园分开，不能假装某幼儿园的长期成果。
- **ycis-kt实体**：566128/0001、29Kent、2005/9注册；1932不能写当前原址。2025/9教师11、AM1:1.4／PM1:1.2，不换算每人一对一时数；K班只有K1／K2全日，PN半日是幼儿服务，四岁后通常接五岁Y1路径，不能凭没有K3推断必须转校补一年。收费证最新2026/8学费235730／244233，餐7403，合计243133／251636。

## 缺口及读取边界

普通本地插班当前独立须知、WKF当届160及7000分母／实际入读、内部直升>90分母、AL分流准入未取得，不用通用惯例补成校规。校方2026结果74.6%及52%未说明完整统计分母，仅保留文字边界或不使用。YCIS校址各年龄实际编班、具体内部升小评估与保留条件、幼儿园单校升小人数和留任率未取得。KGP部分收费为旧额，优先现行EDB证书；Kent Exa曾返回2025缓存，已用web直接读同URL2026/8/1证书，不登记为真实政策冲突。Somerset325147餐费比品牌总表合计多77元，须问适用校址。2016耀中论坛未注明校区，2014WKF论坛要剔除混入其他浸会校的叙述；仅保留可定位自述与历史边界。失败Exa/旧站入口不登记已核。

## 交付检查

三校逐校及合验0错误0提醒；全部表格逐行列数一致，章节1至8连续，评级雷达图均保留。新文字已按humanizer审查，去合成经历、虚构比例及回报保证。定义DSE、GCE A-Level、A*、EYFS、IGCSE、IBDP、PN、ITLP及债券意义。来源schema及git diff --check通过，未build/commit。

## 唯一来源登记对象

```json
{
  "wkf": [
    {
      "label": "家校会小学概览2026：王锦辉",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=326",
      "scope": "小学直资一条龙身份、46600、30班；2025/26教师81、师训95／学士99／硕博49／SEN43；小一无测考，小二期终评估、小三至六一次测验两次期终；校车设施及减免",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025/26"
    },
    {
      "label": "教育局王锦辉收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/567353.pdf",
      "scope": "2026/9/1：本地小学及中学本地课程46600，GCEAL52400；中六／AL第二年8期，其他一般10期；非本地小学127143、初中122826、高中136207、AL142007，分身份学段",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2027/28 G1收生",
      "url": "https://www.hkbuas.edu.hk/admissions/admissions/g1-admission",
      "scope": "6/6–7/21已截止、9/19–20首轮、10/16结果、10月底至11月二轮、12月最终；个别面试及家庭关系理念；沙田居民15%上限；3000简介会票不是申请数",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方2027/28 G7收生",
      "url": "https://www.hkbuas.edu.hk/admissions/admissions/g7-admission",
      "scope": "2026/11/14至12/9申请，11/14简介会；未见对外名额30–35的现行原件，不把活动名额当学额",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方小学课程重点",
      "url": "https://www.hkbuas.edu.hk/primary/curriculum/curriculum-highlights",
      "scope": "PBL、形成性及总结性评估、分组与调适；不把活动教学等于没有考试",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方小学语言环境",
      "url": "https://www.hkbuas.edu.hk/primary/curriculum/language-environment",
      "scope": "除中文及Liberal Arts外英文授课；第三语言G5选择四语，不能宣称小一起四语必修",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方现代语言课程",
      "url": "https://www.hkbuas.edu.hk/primary/curriculum/modern-languages",
      "scope": "G5–8四语选项，一般每周2课、法德进阶5课；目标不等同全体达到",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方国际高中课程",
      "url": "https://www.hkbuas.edu.hk/secondary/igcse-gcea-level/curriculum",
      "scope": "G11–12 GCE AL/IAL，四AS再三至四AL；不是小学国际收费或IB课程",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方2026 DSE／GCE及升学结果",
      "url": "https://www.hkbuas.edu.hk/achievements/academic-examination-results-of-hkdse-and-gce-al-2026",
      "scope": "DSE80%达大学入学要求、85%本科升学；GCE1人5A*、3人4A*、4人3A*、合计72个A*科目；95%QS100属GCE组学校自述；19G5及大学表是offers非人数；74.6分母未解释不擅指全级",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26，2026考试"
    },
    {
      "label": "校方非本地G4–11收生",
      "url": "https://www.hkbuas.edu.hk/admissions/admissions/grade-4-11-non-local",
      "scope": "实际已读网页正文；Exa失败的是另一错误长路径，未登记错误路径；仅需学生签证者，3000报名、rolling、无寄宿、监护及签证注册时限；不套受养人或普通本地插班",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国：王锦辉用家交流区",
      "url": "https://www.edu-kingdom.com/forum.php?action=printable&mod=viewthread&tid=2829584",
      "scope": "实读2014 benpod自称G1家长及cp1234cp1234自称G2插班两子家庭的语言、项目、通勤与课后交通；不采用混入另一浸会校叙述，不作2026普遍口碑",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "主要引用2014年6至7月历史自述"
    },
    {
      "label": "教育局2027小一入学资料",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "接受直资小一学位后取消官津派位权；不以无校网推断地区限制不存在",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局2027升中一般常见问题",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "一条龙外报及保留权边界；不把超过90%直升当已核当届人数",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/2027"
    }
  ],
  "ycis": [
    {
      "label": "家校会幼概2026/27：耀中根德道29号",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5661280001",
      "scope": "2025/9教师11、学位11，上午1:1.4／下午1:1.2；全年2027/28申请、报名0、全日注册1570；KGP收费有旧额，不覆盖最新证书；非牟利未参加计划，1932为档案创校年不能证当前校址1932已使用",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025年9月"
    },
    {
      "label": "家校会幼概2026/27：耀中窝打老道151–153地下",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5661100001",
      "scope": "2025/9教师20、学位20，上午1:3.7／下午1:3.4；K1／K2全日；不套Kent；非牟利未参加计划，1932为档案创校年不能证当前校址1932已使用",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025年9月"
    },
    {
      "label": "家校会幼概2026/27：耀中森麻实道20号",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5671400001",
      "scope": "2025/9教师11、学位11，上午下午均1:4.3；与3251470006是不同注册；非牟利未参加计划，1932为档案创校年不能证当前校址1932已使用",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025年9月"
    },
    {
      "label": "家校会幼概2026/27：耀中森麻实道3／3A及22号",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3251470006",
      "scope": "2025/9教师11、学位10，上午下午均1:4.5，容量83；不同于20号；非牟利未参加计划，1932为档案创校年不能证当前校址1932已使用",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025年9月"
    },
    {
      "label": "家校会幼概2026/27：耀中将军澳Savannah Place",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=6135170001",
      "scope": "2025/9教师17、学位17，上午1:4.2／下午1:1.4，容量79；K1至K3费用均有列；非牟利未参加计划，1932为档案创校年不能证当前校址1932已使用",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025年9月"
    },
    {
      "label": "教育局：耀中根德道收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/566128.pdf",
      "scope": "以web直接读最新2026/8/1版覆盖Exa旧缓存：K1全日235730、K2全日244233，另膳食7403，11期；仅K1／K2无K3，不把PN半日当K班",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "教育局：耀中窝打老道收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/566110.pdf",
      "scope": "2026/8/1：K1全日235730、K2全日244233，另膳食7403，11期",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "教育局：耀中森麻实道20号收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/567140.pdf",
      "scope": "2026/8/1：K1全日235730、K2全日244233，另膳食7403，11期",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "教育局：耀中森麻实道3／3A／22及小学收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/325147.pdf",
      "scope": "幼稚园2026/8/1半日K1至K3均136070，全日235730／244233／256674，另膳食7480；与品牌总表午膳合计有77差异，须确认校址实际开班；小学2026/9/1年费273380，10期",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "教育局：耀中将军澳收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/613517.pdf",
      "scope": "2026/8/1：K1至K3半日136070，全日235730／244233／256674，另膳食7403；不称没有K3",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2026/27学费及付款政策（2026年10月14日）",
      "url": "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/2026/Admissions%20Tuitions%20and%20Fees/YCIS-HK_Parent_School%20Fees%20and%20Payment%20Policies%20(Parents)_%2014%20Oct%202026.pdf",
      "scope": "两岁半日136070／全日225214，三岁243133、四岁251636，11期含午膳；债券三岁以上首名15万、两岁不适用；TKO20%学费折扣、一般不叠加、非学费不减；2027/28五岁半日不适用；退学需完整历月通知",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026年10月更新"
    },
    {
      "label": "校方幼儿课程",
      "url": "https://www.ycis-hk.com/en/academics/early-childhood",
      "scope": "EYFS及校本游戏学习；ITLP需成人、英粤、两岁3教员1:8、三四岁2教员1:12、普通话老师到访、四岁过渡小学；不同于KGP时段统计，非幼稚园IB",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行网页未署年"
    },
    {
      "label": "校方招生及分班概览",
      "url": "https://www.ycis-hk.com/en/admissions/tuition-n-fees",
      "scope": "网页返回招生总览：年龄／语言／发展等评估、waiting pool、兄姊旧生优先；跨网络转校仍评估；未取得无条件直升条文",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行网页未署年"
    },
    {
      "label": "校方2026/27幼教校历",
      "url": "https://object.ycyw.com/media-library/ycis-hk/school-calendar/2026-2027/YCIS%20HK%20School%20calendar%202026-2027_ECE_School_with%20color%20index_R02.pdf",
      "scope": "列29Kent、151Waterloo、3及20Somerset、TKO；2026/12/12开放日，非报名截止或新增学位承诺",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2024香港中学IB结果",
      "url": "https://www.ycis-hk.com/en/article/school-news/ycis-celebrates-remarkable-ib-results-of-the-2024-cohort-with-two-perfect-scorers",
      "scope": "香港122注册考生、27人40+、2人45、76双语；不属全网络或某幼稚园追踪，全球比较使用2023口径不能称同届",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2024"
    },
    {
      "label": "校方香港中学2025/26升学简介",
      "url": "https://object.ycyw.com/media-library/ycis-hk/resources/CUGO/YCIS_HK_CUGO%20Profile%202025.pdf",
      "scope": "Y10–11 IGCSE、Y12–13 IBDP、亦有YCIS Diploma；2023–25大学offer／matriculation混合名单未列人数；IB34/96/56%图未署考试届别，不升级成2025或2026考试",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "教育王国：耀中家长请分享（2016）",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3365808",
      "scope": "gthchau指early learning、etpianist自称该年8月入读家长、Moonlight819自称曾读nursery：关顾／开心／词汇／家校沟通；未注明Kent，不能归根德道现届",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2016年10月历史自述"
    }
  ],
  "ycis-kt": [
    {
      "label": "家校会幼概2026/27：根德道",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5661280001",
      "scope": "2025/9教师11、学位11，上午1:1.4／下午1:1.2；全年2027/28申请、报名0、全日注册1570；KGP收费有旧额，不覆盖最新证书；本篇实体566128/0001",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资2025年9月"
    },
    {
      "label": "教育局：根德道现行收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/566128.pdf",
      "scope": "以web直接读最新2026/8/1版覆盖Exa旧缓存：K1全日235730、K2全日244233，另膳食7403，11期；仅K1／K2无K3，不把PN半日当K班",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026-08-01生效"
    },
    {
      "label": "校方2026/27学费及付款政策（2026年10月14日）",
      "url": "https://object.ycyw.com/media-library/ycis-hk/resources/admissions/2026/Admissions%20Tuitions%20and%20Fees/YCIS-HK_Parent_School%20Fees%20and%20Payment%20Policies%20(Parents)_%2014%20Oct%202026.pdf",
      "scope": "两岁半日136070／全日225214，三岁243133、四岁251636，11期含午膳；债券三岁以上首名15万、两岁不适用；TKO20%学费折扣、一般不叠加、非学费不减；2027/28五岁半日不适用；退学需完整历月通知",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026年10月更新"
    },
    {
      "label": "校方幼儿课程",
      "url": "https://www.ycis-hk.com/en/academics/early-childhood",
      "scope": "EYFS及校本游戏学习；ITLP需成人、英粤、两岁3教员1:8、三四岁2教员1:12、普通话老师到访、四岁过渡小学；不同于KGP时段统计，非幼稚园IB",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行网页未署年"
    },
    {
      "label": "校方招生及分班概览",
      "url": "https://www.ycis-hk.com/en/admissions/tuition-n-fees",
      "scope": "网页返回招生总览：年龄／语言／发展等评估、waiting pool、兄姊旧生优先；跨网络转校仍评估；未取得无条件直升条文",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行网页未署年"
    },
    {
      "label": "校方2026/27幼教校历",
      "url": "https://object.ycyw.com/media-library/ycis-hk/school-calendar/2026-2027/YCIS%20HK%20School%20calendar%202026-2027_ECE_School_with%20color%20index_R02.pdf",
      "scope": "列29Kent、151Waterloo、3及20Somerset、TKO；2026/12/12开放日，非报名截止或新增学位承诺",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2024香港中学IB结果",
      "url": "https://www.ycis-hk.com/en/article/school-news/ycis-celebrates-remarkable-ib-results-of-the-2024-cohort-with-two-perfect-scorers",
      "scope": "香港122注册考生、27人40+、2人45、76双语；不属全网络或某幼稚园追踪，全球比较使用2023口径不能称同届",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2024"
    },
    {
      "label": "校方香港中学2025/26升学简介",
      "url": "https://object.ycyw.com/media-library/ycis-hk/resources/CUGO/YCIS_HK_CUGO%20Profile%202025.pdf",
      "scope": "Y10–11 IGCSE、Y12–13 IBDP、亦有YCIS Diploma；2023–25大学offer／matriculation混合名单未列人数；IB34/96/56%图未署考试届别，不升级成2025或2026考试",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "教育王国：耀中家长请分享（2016）",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3365808",
      "scope": "gthchau指early learning、etpianist自称该年8月入读家长、Moonlight819自称曾读nursery：关顾／开心／词汇／家校沟通；未注明Kent，不能归根德道现届",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2016年10月历史自述"
    },
    {
      "label": "教育局：根德道学校注册资料",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=566128000113",
      "scope": "566128/0001、29Kent地下及一楼、全日、注册日期2005/9/1；品牌1932不是此址原址证明",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    }
  ]
}
```
