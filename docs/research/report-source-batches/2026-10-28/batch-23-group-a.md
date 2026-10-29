# 第23批 A组原始来源复核记录

核对日：2026-10-28。范围：`pc`、`pcps`、`pkcps`。仅修改三个报告JSON及此记录，不修改来源注册表、backlog、其他报告，不commit、不build。

## 方法及证据边界

采用deep-research流程，先拆分学校类别/收费、课程/师资、招生/升学三类问题，使用Web及Exa检索后读取官方完整页与教育局收费PDF。Firecrawl未调用。Web无法直接读取KGP2026时，Exa取得对应学校完整正文；培侨招生若干页Web返回403，但Exa取得正文。以下数组只收录实际读过并用于具体字段的原件。未将全文2025来源批量升级。

## pc 培正幼稚园

- 2026/27年费53500（5350×10）及2025年9月师生比例上午1:11.2、下午1:10.6；教员41人。注明比例时段及统计期，撤去单一1:10.4。
- 学校资料确认直属小学、中文及半日制；「一条龙中学」为无。撤去幼升小85%/100%及其互为补数15%的无原件保证，亦撤去从幼稚园一路读到中学85%的跨学段误推。
- 补入2027/28 K1真实日程及已截止状态、K2下午/K3上午班的接送考虑。校方100元报名费与KGP200元待批不同，明确查询，不取待批作实批。
- 校费静态三年160500；不写成花学费购买中学概率。幼稚园注册不能概括成放弃未来小一大抽奖，幼稚园地点不赋予小一校网。
- 保留口碑、专家比较及8章结构，注明原帖未重访；培中2026两位高分考生只作个案，不当作全体幼儿升学成果。

## pcps 培正小学

- 2026/27年费69500（6950×10）；2025/26教师97人及49班，2026/27为50班（9/9/8/8/8/8）。撤去无支持1600学生/150教职员、班师比推出双师同时上课。
- PSP2026明确直属培中而非一条龙。85%以扣除留级及自行分配后剩余中一学额为分母，不是小六毕业生入读率。培中2027/28官方自行65个、只接受培小学生已读；旧约118直属位/21公开位不当成未来学额。
- 用2027/28小一现行公告替代推测2025日程；2026/27插班截止4月30日、5-6月笔试及亲子面试，旧固定3月31日撤去。未列报名起止日或考试科目处不补猜。
- 最新英文课程使用Family and Friends文法基础教材，纠正「Big Book、不设传统文法书」；普教中、高阶思维、螺旋课程由对应校方学科页核对。NET每生10分钟换算撤去。
- 六年学费静态417000；加英文12个月×6年的情景108000-216000、交通膳杂情景60000-120000，总585000-753000，明确不是校方未来报价。保留历史BK观察及8章结构。

## pkcps 培侨书院小学部

- PSP2026仍列30000，教育局2026-09-01生效证书及官网2026/27表一致为本地31260、非本地111803，采用生效证书并交代冲突。12年本地学费静态419790，非锁价。
- 同统计年度师资77人、硕博56%、年资14%/16%/70%；30班、每级5班，不能从班数推出164学额。概览考试每年2次，免呈分不等于无考试。
- 2026 DSE官方128名考生、5+科次46.9%、4+74.5%、核心5+42.3%；英48.4/数53.5/中25.0。撤去全港第7排名和把55%/88%/IFY offer比例写成个人大学入读保证。SNDAS两人分别医学和计量金融，原稿均医学错误已改。
- 2027/28申请7月24日至9月18日、10月2日通知、10月17/18日面见已过；旧短片题型经验保留历史标签，不将50小时窗口写成当届。简介会约4000为家长及学生合计，非申请人数。
- 插班页仅能确认当前关闭，未核未来轮次/名额。IFY已读官方EAP+3模块、1年、30%作业/70%考试及各专业自定标准；达标NCUK保障不等于QS前20/指定专业。
- 保留旧口碑与8章结构，标明未重访原帖及采样数量。明确一般官津15%外校位条文不能直接套培侨直资收生承诺。

## 未确认项（不得标为本轮已核事实）

- 培正幼小、小中及培侨小中当届毕业生总数、获offer人数、实际入读人数及流失追踪；保留机制、在读人数、学额和入读率不可互代。
- 培正幼稚园KGP学生人数表的完整单元格对齐未取得，不在正文重报数字；幼稚园K2/K3插班名额和固定申请期未取得原件。
- 培正小学当届外校生学额、申请人数、每班人数、NET课时及双班主任配置；2027/28原报名起止日不由旧日期补猜。
- 培侨2025大学去向及IFY数值原件、QS分组分母、2027/28后续面试/结果/注册日、现届短片评分比重、幼稚园优先取录及85%说法、插班开放年级/考试范围。
- 各竞品的旧收费、Banding、课程与历史口碑均非本轮逐句重核范围；正文保留旧写法但不将旧来源批量改2026。尚待全篇独立审计，不应将本批等同整站或所有客观事实已完成核验。

## 验证

- `node scripts/validate-reports.mjs pc`：通过，0错误、0提醒。
- `node scripts/validate-reports.mjs pcps`：通过，0错误、0提醒。
- `node scripts/validate-reports.mjs pkcps`：通过，0错误、2提醒。两项分别为旧评级出处「本平台 tier 数据库」及口碑立场声明「本平台立场」，均是明确主体语义，无占位或数据缺项；未为消除提醒篡改含义。
- 每份保留8个chapter与hero/body/premiumHtml付费结构；不改付费/链接配置。未build、未commit；来源面板登记交父代理完成，此处未声称面板审计已通过。

## 供父代理登记的原始来源数组

```json
{
  "pc": [
    {
      "label": "教育局《幼稚园概览2026/27》：香港培正小学",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5133500001",
      "scope": "没有参加2026/27幼稚园教育计划；2026/27年费$53,500（10期）；2025年9月教员41人、上午1:11.2/下午1:10.6。表格文本未完整保留学生人数的年级及班别对齐，不据此重报K1人数。2027/28申请栏须依校方最新公告；报名费列$200待批，不能当作已批收费。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资和比例为2025年9月",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局收费证明书：香港培正小学及幼稚园",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/513350.pdf",
      "scope": "2026年9月1日起，幼儿班上午/下午、低班下午及高班上午均$53,500（$5,350×10）；小一至小六均$69,500（$6,950×10）。不包含2027/28未来收费承诺。",
      "sourceType": "government",
      "academicYear": "2026/27（2026-09-01生效）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正幼稚园：学校资料",
      "url": "https://www.pcps.edu.hk/kg/tc/school-information",
      "scope": "私立非牟利半日、中文主要语言、直属小学为香港培正小学、一条龙中学栏为无；全年$53,500十期。当前K1上午5班/下午4班、K2下午9班、K3上午9班。班数不换算学额。",
      "sourceType": "school-official",
      "academicYear": "现行页面（未标独立学年）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正幼稚园：2027/28 K1招生公告",
      "url": "https://www.pcps.edu.hk/kg/tc/2027-2028-%E5%B9%BC%E5%85%92%E7%8F%ADk1%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B",
      "scope": "2026年7月2日10时至8月5日报名、11月1-7日首轮、11月16日次轮名单、11月亲子面试、12月8日10时放榜及12月8-11日注册；校方列报名费$100并注明以最终批核为准，与概览待批$200须向校方确认。",
      "sourceType": "school-official",
      "academicYear": "2027/28 K1",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "香港培正中学：2027/28中一入学申请",
      "url": "https://www.puiching.edu.hk/tc/%E4%B8%AD%E4%B8%80",
      "scope": "自行分配65个，只接受香港培正小学学生、纸本申请、不需小学推荐信；统一派位依政府机制。页面两个评分表分别用于挑选面试与收生，不合并。",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "香港培正中学：2026文凭试放榜",
      "url": "https://www.puiching.edu.hk/tc/latest_news/2026-%E6%96%87%E6%86%91%E8%A9%A6%E6%94%BE%E6%A6%9C",
      "scope": "2026年7月15日公告两名顶尖考生：熊铠荞6科5**及数学延伸5**，何卓诺6科5**。未提供整体科次5+率或大学实际入读率，不用个案推全体成果。",
      "sourceType": "school-official",
      "academicYear": "2026 HKDSE",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2014年第7号通告：直属及一条龙安排",
      "url": "https://applications.edb.gov.hk/circular/upload/EDBC/EDBC14007S.pdf",
      "scope": "附录4直属85%保留位分母为扣除留级及自行分配后剩余中一学额，非毕业生升读率；通告说明幼稚园不纳入官津一条龙模式，官津15%外校位规则不可直接移用于培侨直资当届承诺。",
      "sourceType": "government",
      "academicYear": "现行机制文件（2014年公布）",
      "checkedOn": "2026-10-28"
    }
  ],
  "pcps": [
    {
      "label": "教育局《小学概览2026》：香港培正小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=79",
      "scope": "私立全日男女校、中文、6600平方米、直属培中而非一条龙；2026/27学费69500、50班（9/9/8/8/8/8）；2025/26为97名教师及49班；P1及P2-P6全年考试3次、测验0次。教师/班数不能推出双师同时上课、班额或师生比。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资为2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局收费证明书：香港培正小学及幼稚园",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/513350.pdf",
      "scope": "2026年9月1日起，幼儿班上午/下午、低班下午及高班上午均$53,500（$5,350×10）；小一至小六均$69,500（$6,950×10）。不包含2027/28未来收费承诺。",
      "sourceType": "government",
      "academicYear": "2026/27（2026-09-01生效）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正小学：2027/28小一入学申请",
      "url": "https://www.pcps.edu.hk/tc/2027%E8%87%B32028%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%EF%BB%BF",
      "scope": "当前页首轮已结束；9月11日10时查首轮结果、第二轮个人系统通知及一张双面A4档案、11月3日10时结果、11月6日注册。当前原件未保留报名起止日，不补猜旧届日期。",
      "sourceType": "school-official",
      "academicYear": "2027/28 P1",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正小学：2026/27小二至小五入学申请",
      "url": "https://www.pcps.edu.hk/tc/2026%E8%87%B32027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%BA%8C%E8%87%B3%E5%B0%8F%E4%BA%94%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B",
      "scope": "少量学位，2026年4月30日截止、5-6月笔试及亲子面试、先甄选后电话通知；申请表/出生证/最近成绩/一页双面A4档案，亲身或电邮。已过期，非未来固定3月31日。未列当届科目或面试语言。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班（已结束）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "香港培正中学：2027/28中一入学申请",
      "url": "https://www.puiching.edu.hk/tc/%E4%B8%AD%E4%B8%80",
      "scope": "自行分配65个，只接受香港培正小学学生、纸本申请、不需小学推荐信；统一派位依政府机制。页面两个评分表分别用于挑选面试与收生，不合并。",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2014年第7号通告：直属及一条龙安排",
      "url": "https://applications.edb.gov.hk/circular/upload/EDBC/EDBC14007S.pdf",
      "scope": "附录4直属85%保留位分母为扣除留级及自行分配后剩余中一学额，非毕业生升读率；通告说明幼稚园不纳入官津一条龙模式，官津15%外校位规则不可直接移用于培侨直资当届承诺。",
      "sourceType": "government",
      "academicYear": "现行机制文件（2014年公布）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正小学：课程理念",
      "url": "https://www.pcps.edu.hk/tc/subject/curriculum-rationale",
      "scope": "校本课程螺旋递进、连贯幼小中及当前科目列表；不支持以名校校友证明当前课堂效果。",
      "sourceType": "school-official",
      "academicYear": "现行课程页面",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正小学：中文科课程简介",
      "url": "https://www.pcps.edu.hk/tc/subject/chinese-about-curriculum",
      "scope": "九个学习范畴、普教中及汉语拼音；未列全校园日常语境或分年级课时。",
      "sourceType": "school-official",
      "academicYear": "现行课程页面",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正小学：英文科课程简介",
      "url": "https://www.pcps.edu.hk/tc/subject/english-about-curriculum",
      "scope": "当前Family and Friends为文法基础教材，另有读本及校本任务式材料；纠正旧稿Big Book/不设传统文法书。未提供NET每周接触分钟数，不从家长旧帖换算每人10分钟。",
      "sourceType": "school-official",
      "academicYear": "现行课程页面",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培正小学：数学科课程简介",
      "url": "https://www.pcps.edu.hk/tc/subject/maths-about-curriculum",
      "scope": "五大学习范畴、基本概念逐渐增加深广、高阶思维及不同解难策略。",
      "sourceType": "school-official",
      "academicYear": "现行课程页面",
      "checkedOn": "2026-10-28"
    }
  ],
  "pkcps": [
    {
      "label": "教育局《小学概览2026》：培侨书院",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=327",
      "scope": "直资全日男女校、一条龙、普英主要语言及全级普教中；2025/26教师77人/硕博56%/教龄分布14%、16%、70%；2025/26及2026/27各30班、每级5班；P1及P2-P6年考试2次。概览收费仍30000，已由生效收费证书更新，不能再作为实际收费。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资为2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局收费证明书：培侨书院",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/560553.pdf",
      "scope": "2026-09-01生效：本地小学31260；非本地小学111803；本地初中34280、高中DSE及IFY43130。完整分期见6页原件；按当前价格不变估小学6年187560、12年419790，不含未来加费或其他费用。",
      "sourceType": "government",
      "academicYear": "2026/27（2026-09-01生效）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：2026/27学费",
      "url": "https://www.puikiu.edu.hk/tc/school.php?id=35",
      "scope": "校方收费表本地P1-6为3126×10、非本地首11183及随后11180×9，与教育局证明书一致；取得永久居民身份后的学费调整须提交证明及按校方生效程序。",
      "sourceType": "school-official",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：2027/28小一入学申请",
      "url": "https://www.puikiu.edu.hk/tc/news_detail.php?id=234",
      "scope": "2026年7月24日至9月18日报名，10月2日18时后发面见通知，10月17/18日面见，不改期；截至核对日已过首轮。公告未给后续结果日，不照搬2025短片窗口。此页web403，但Exa取得完整正文并与申请详情页一致。",
      "sourceType": "school-official",
      "academicYear": "2027/28 P1",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：2026/27插班申请状态",
      "url": "https://www.puikiu.edu.hk/tc/achievements_detail.php?cate=31&cid=75&id=1190&page=1",
      "scope": "Exa取得官方页显示Register Now (Closed)。仅证明当前关闭，不支持开放年级、每年两轮、考试科目或下一轮截止日期。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：2026年HKDSE成绩公告",
      "url": "https://www.puikiu.edu.hk/tc/news_detail.php?id=466",
      "scope": "128考生；整体科次5+46.9%、4+74.5%、核心科5+42.3%，英48.4%/数53.5%/中25.0%；4人实名推荐获清华北大复旦取录、2人SNDAS港大分别医学及计量金融。无55%三大实际入读率，不能将科次转学生比例或把两名均写医科。",
      "sourceType": "school-official",
      "academicYear": "2026 HKDSE",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：2027/28小一简介会报道",
      "url": "https://www.puikiu.edu.hk/tc/news_detail.php?id=468",
      "scope": "2026年9月12日简介会，校方9月14日报道近4000家长及学生出席；不是4000个申请人，不能据此推录取率。",
      "sourceType": "school-official",
      "academicYear": "2027/28 P1",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：国际组介绍",
      "url": "https://www.puikiu.edu.hk/tc/school.php?id=137",
      "scope": "学校国际组2+1路径；IFY达到录取条件者的NCUK成员大学取录保障有条件，不是指定大学/专业或QS前20保证。页面含2017/18创办背景，不将其日期改作2026。",
      "sourceType": "school-official",
      "academicYear": "现行课程页；含2017/18创办背景",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培侨书院：NCUK IFY课程原件",
      "url": "https://www.puikiu.edu.hk/tc/school.php?id=143",
      "scope": "1学年、EAP加3科模块、平时作业30%/考试70%；各大学专业自定入学标准。不能概括为省略预科、比IB/A-Level必然容易、任何目标大学无条件免IELTS。",
      "sourceType": "school-official",
      "academicYear": "现行IFY课程页面",
      "checkedOn": "2026-10-28"
    }
  ]
}
```
