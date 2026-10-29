# 第28批 B组原始来源核验

核对日：2026-10-28。仅修改tt、ttskg、tutor及本档；未修改来源注册表、台账，未build或commit。保持八章及原有评级图。以下仅登记实际读取正文的HTTPS来源，失败入口不计已核。

## 修订摘要

- **tt是幼稚园部**：ACK资助后4280、EPK53900；母语教师30英语／34普通话属幼小全校。取消70%TTCA保底、ACK约半数升小等无当届分母推断。当前2027/28只据KGP确认全年申请，不使用打不开的具体日历。页首重复“幼稚园部”已收敛为一次。
- **ttskg是小学部**：基础费69000／99000，拔尖22000／44000另列；教师83为2025/26，2026/27共26班，有保姆车、两个操场。分清课程、评估届别、2027首轮已过日期与未来11/21面试；插班B+、50费用、21工作天。TTCA优先不等于直属；升中乙部按小学地区而非家住址。原结果仅有名单不算比例。
- **tutor是四校区品牌总览**：分校K班费用、期数和2025年9月师资分别列；半山KGP158730与当前可读2025费证151030冲突，且证书仅K1，不虚算三年。已公开2024–2026品牌78／17.1／4.9，校区92.1、80多offer、43／43不混分母；90%是学生来源构成，非升班成功率。删合成匿名长引文和固定10%加价预测，历史论坛只留有边界的主题。

## 证据缺口

- 崇真幼稚园ACK2027须知、具体日历、候补／插班与内部升小细则旧站多404或仅可见导航，未作为已核政策。未证实当届ACK／EPK升小人数、TTCA70%条件或班级英普分钟数。2016／2017旧招生PDF未取得全文，未挂新来源。
- 崇真小学2027/28新课程完整说明、所有额外费适用、减免、教师留任率及逐校升中人数未取得；不把班数当学额、经验当本校服务年数。2026统一派位FAQ只用于现行校网制度解释，未升级其日期。
- 多多半山最新批准费证及K1后班制、各校PN及婴幼儿费用、逐校区逐届升小人数与计算法、实时空缺、教师留任率未取得；FAQ旧防疫内容不引用为当前统一规则。历史论坛未重新逐帖核实，不登记为新原始来源。

## 检查

三校逐校validate通过；最终三校合验、表格列数及diff空白检查见交付状态。来源类型仅school-profile、school-official、government；checkedOn统一2026-10-28。

## 来源登记对象

```json
{
  "tt": [
    {
      "label": "家校会幼稚园概览2026/27：崇真本地课程",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5146590001",
      "scope": "学校身份、本地课程；2025年9月教师55、学位49、上午1:8.7／下午1:5.7；2027/28全年申请；不据混合收费栏误算EPK资助",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资为2025年9月"
    },
    {
      "label": "教育局：崇真现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/514659.pdf",
      "scope": "ACK资助后4280、EPK53900，均10期；与小学69000／99000分学段，不把补助前金额当家庭净费",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026-09-01生效"
    },
    {
      "label": "校方2025/26学校报告",
      "url": "https://ttpskg.edu.hk/primary-school/attachment/upload/files/TT%20Newsletter/2526_School_Report.pdf",
      "scope": "ACK18班540人、EPK6班180人；30英语／34普通话母语教师属幼小全校；观察评估、家校及社工支援，不证明K1录取率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "校方幼稚园学习评估",
      "url": "https://www.ttpskg.edu.hk/it-school/php/webcms/public/index.php3?menuid=4&mode=published&refid=482",
      "scope": "持续观察、儿童历程档案与学期综合评价；页面未署学年，非当前招生细则",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会小学概览2026：崇真小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=283",
      "scope": "仅核小学正式一条龙／直属／联系均为“-”及TTCA优先取录陈述，不作幼稚园中学保底",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方小学招生及插班说明",
      "url": "https://www.ttpskg.edu.hk/primary-school/tc/content.php?wid=59",
      "scope": "幼小分学段：小学有独立2027/28小一申请面试，P1至P6插班条件不适用于幼稚园",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一、2026/27插班"
    },
    {
      "label": "校方2025/26小学升中结果",
      "url": "https://www.ttpskg.edu.hk/primary-school/tc/content.php?wid=101",
      "scope": "英文／国际小学部分列中学名单，未列人数；不能倒推ACK／EPK升学率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26，2026-07-07发布"
    },
    {
      "label": "教育局2027/28 K1收生安排常见问题",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/202728%20K1%20Admission%20Arrangements/FAQ%202027_28_TC.pdf",
      "scope": "电子注册、转校先取消原注册、一人不占多位；适用参加计划及相关非计划本地课程，不能自动套EPK",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局2027小一入学资料",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "官津小一住所校网、私立自主申请及注册边界，幼稚园地址不赋派位校网",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    }
  ],
  "ttskg": [
    {
      "label": "家校会小学概览2026：崇真小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=283",
      "scope": "小学身份、69000／99000、2025/26教师83及经验结构、26班、26课室、2礼堂2操场、有保姆车、P4至P6自选电子书包、每年3次考试及中学关系",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资为2025/26"
    },
    {
      "label": "教育局：崇真现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/514659.pdf",
      "scope": "小学英文69000、国际99000；拔尖单语22000／双语44000另列，须问适用及是否另加",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026-09-01生效"
    },
    {
      "label": "校方2025/26学校报告",
      "url": "https://ttpskg.edu.hk/primary-school/attachment/upload/files/TT%20Newsletter/2526_School_Report.pdf",
      "scope": "小学PS19班567人／IJSS7班205人、全校母语团队、适应活动、社工及TTCA衔接；不把全校母语团队当小学独享",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "校方2027/28小一及2026/27插班说明",
      "url": "https://www.ttpskg.edu.hk/primary-school/tc/content.php?wid=59",
      "scope": "首轮2026/6/1至7/17，9/12及11/21面试；P1至P6插班操行B+、申请费50、柜台另30、面试后21工作天；不把插班费当小一费",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一、2026/27插班"
    },
    {
      "label": "校方班级结构",
      "url": "https://www.ttpskg.edu.hk/primary-school/en/content.php?wid=51",
      "scope": "2026/27 PS19班、IJSS7班，各级结构；2027/28小一计划4班，不当实际入读或开放学额",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27及2027/28计划"
    },
    {
      "label": "校方2025/26升中结果",
      "url": "https://www.ttpskg.edu.hk/primary-school/tc/content.php?wid=101",
      "scope": "两部分列中学名单、无逐校人数和毕业生分母，不能计算TTCA或Band1入读率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26，2026-07-07发布"
    },
    {
      "label": "校方评估政策",
      "url": "https://www.ttpskg.edu.hk/primary-school/attachment/upload/files/Assessment/Assessment_Policy.pdf",
      "scope": "日常20／考试80等科目组合、外语评估；2026/27小五及2027/28小六权重与2026/27小六分开，是校方政策表述",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "正文含2026/27及2027/28届别"
    },
    {
      "label": "教育局2027升中一般常见问题",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "自行最多两校、直属85／联系25分母为扣除重读自行后的余额，跨网与非派位直资边界；不适用于TTCA校本优先比率",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/2027"
    },
    {
      "label": "教育局2026升中统一派位常见问题",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Apr_CA_TC.pdf",
      "scope": "第22及29题：升中校网原则上按小学坐落行政区而非住所，跨网须批准；仅采用制度解释，不将2026日期升级2027",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2024/2026，2026年4月"
    },
    {
      "label": "教育局2027小一入学资料",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "私立不参加小一统筹、直资接受后取消派位权、私立取录仍参加名单将交校方；核对注册承诺",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    }
  ],
  "tutor": [
    {
      "label": "家校会幼稚园概览2026/27：多多宝马山",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5758520001",
      "scope": "2025年9月教师8、学位7、上午1:7.5／下午1:1.1；幼稚园注册低层地下6–10铺；2026/27 K班158730／11期；私立独立、不参加计划；不作PN或全校园统计",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资为2025年9月"
    },
    {
      "label": "家校会幼稚园概览2026/27：多多半山",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5931330001",
      "scope": "2025年9月教师4、学位3、上午1:3.3；B铺；2026/27只列K1 158730／11期，与现行可读费证冲突；私立独立、不参加计划；不作PN或全校园统计",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资为2025年9月"
    },
    {
      "label": "家校会幼稚园概览2026/27：多多九龙塘",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5425040001",
      "scope": "多实街1号1楼；2025年9月教师7、学位6、上午1:5.6／下午1:1.4；K班上午166080／下午161760，12期；仅本篇品牌比较；私立独立、不参加计划；不作PN或全校园统计",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资为2025年9月"
    },
    {
      "label": "家校会幼稚园概览2026/27：多多形点",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=6057940001",
      "scope": "YOHO I G011地下及夹层；2025年9月教师7、学位5、上午1:7.7／下午1:2.2；K班上午133760／下午120890，11期；私立独立、不参加计划；不作PN或全校园统计",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资为2025年9月"
    },
    {
      "label": "教育局：多多宝马山现行可读收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/575852.pdf",
      "scope": "K1至K3上午／下午158730，11期；不作PN及活动组收费",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026-09-01生效"
    },
    {
      "label": "教育局：多多半山现行可读收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/593133.pdf",
      "scope": "当前可读证书只列K1上午／下午151030，11期，生效2025-09-01；与KGP2026金额158730不符，未擅改成2026批准；不作PN及活动组收费",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26，2025-09-01生效"
    },
    {
      "label": "教育局：多多九龙塘现行可读收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/542504.pdf",
      "scope": "K1至K3上午166080／下午161760，12期；不作PN及活动组收费",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026-09-01生效"
    },
    {
      "label": "教育局：多多形点现行可读收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/605794.pdf",
      "scope": "K1至K3上午133760／下午120890，11期；不作PN及活动组收费",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，2026-09-01生效"
    },
    {
      "label": "多多官网品牌及课程",
      "url": "https://www.tutortime.com.hk/",
      "scope": "2001年来港、四校区、现行英普50/50、年龄课程与家校观看服务；不独立证实全港唯一或母语级成效",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：宝马山校区",
      "url": "https://www.tutortime.com.hk/locations/braemar-hill/",
      "scope": "全校园逾20000呎、9课室，校园范围大于KGP幼稚园注册部分；英普品牌定位",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：半山校区",
      "url": "https://www.tutortime.com.hk/locations/caine-road/",
      "scope": "坚道A／B铺校园、粤语课程、部分时间PN；年龄／K1后年级说明不一致，不承诺K1至K3全开",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：形点校区",
      "url": "https://www.tutortime.com.hk/locations/yoho/",
      "scope": "逾20000呎、双室内空间及不同年龄层分区；不把校区配置推广全集团",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多2027/28新生申请",
      "url": "https://www.tutortime.com.hk/admission/2027-2028-nursery-kindergarten-application-new-students/",
      "scope": "30至60分钟一对一观察、2至5工作天、滚动按龄收生；90%为在读学生来源构成，不是PG升PN成功率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "多多FAQ",
      "url": "https://www.tutortime.com.hk/about-us/faq/",
      "scope": "现有生优先、年龄及适应一般说明；包含旧防疫段落，不将全篇当现行政策；师资宣传不能盖过KGP统计",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多Our Approach",
      "url": "https://www.tutortime.com.hk/about-us/our-approach/",
      "scope": "持续观察、小组、英普、Second Step及Emomo社交情感教学；学校理念不保证个体成效",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多升小统计及校区结果",
      "url": "https://www.tutortime.com.hk/about-us/school-placement/",
      "scope": "2024–2026品牌国际78／直私17.1／本地官立4.9%；宝马山半山合计92.1、九龙塘80多offer、形点43／43及首志愿分口径；均未列人数，不当个人概率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2024–2026品牌统计，校区段未另署届别"
    },
    {
      "label": "教育局2027小一入学资料",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "官津资格、住址校网与私立／直资接受学位边界；幼稚园校区地址不赋校网",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    }
  ]
}
```
