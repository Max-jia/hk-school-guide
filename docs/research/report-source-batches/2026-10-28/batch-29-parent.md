# 第29批父校：聖公會仁立小學（ylaps）

状态：报告已按原件修改，单校规则0错误0提醒、7表列数一致。待第29批统一注册／构建／浏览器验收。HTTP仅使用CHSC所列校方域名6个已读原件；HTTPS连接失败，未绕过证书验证。

核对日2026-10-28；研究已完成，待第28批验收后落稿，尚未登记／构建／验收入账。详batch-29-parent-research.md。不是元朗公立校友会，slug不作认校依据。

拟保留8章、四因子条与五维图，修正关联制度、百分比分母、2027自行及结束轮次、费用/语言/师资/分班、非官方评级语气和未经追溯的人物化口碑，保留有证据的好内容。实际源码修订脚本/tmp/update-ylaps-batch29.py尚待执行。

## 官方HTTP例外的证据

PSP173列官网www.yanlaap.edu.hk；本轮HTTPS Exa失败、curl443报SSL_ERROR_SYSCALL，原始HTTP同域页面及PDF/images公开可读。未绕过TLS校验、未登录或提交，不能将来源协议擅改为打不开的HTTPS。后续登记应为ylaps的此官方域名和已读公开路径作狭窄例外，不放宽其他学校、不允许任意HTTP；单独记录验收。这不是证明原件每个口径都无误。

## 关键口径

- 英语中学93、68/68.4%、林护46、49.5%分母英语93、首三91/91.2%，全级分母未明列不反推。
- 联系25%分母扣除自行及留班后中一余额；不是小学毕业生率，也不是两校各25%或两次专属抽签。
- 63自行配额非最终126；前五项互斥，旧生及首名不叠；上午旧生、父母宗教证明限本校当届原件，不随意跨校套用。
- 老2019–2023统计未读原始帖，不继续假称已核长期趋势；2017口碑保留年代、亲历与转述边界。
- 未取得逐班流动/功课时长、当前空缺/2027候补及逐人最终注册，不臆测。

## 可登记来源（待整批）

```json
{
  "ylaps": [
    {
      "label": "家校会《小学概览2026》：圣公会仁立小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=173",
      "scope": "全文；葵盛围399、65网、资助男女基督教、1970、非以役人乃役于人，罗春凤/严志成，约3000平方米、30班各5、中文主栏/每级一普教中班、联系林护、校车及保姆车。2025/26教师57含校长、核准56，师训学士100/硕博38/SEN68/十年67；PTA30核准300。P1零全科测2考、P2–6零测3考、能力分班，8:00–14:50。STEAM/飞行学院/VR及高小NET读写协作、抽离补底等；周五六部分兴趣自费。",
      "academicYear": "2026/27；教师2025/26",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2027年65校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net65.pdf",
      "scope": "完整一页，113972自行63、仁纪543195亦63，按暂定基准非最终总招生126。65含葵盛葵芳荔景等所列范围，不等全葵青/青衣/荃湾；乙部按实际居所，自行和甲部跨网可申请。",
      "academicYear": "2027年度；2026-08版",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2027年9月小一入学单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页已读，甲类须取录/计分类别、前五项互斥、宗教与团体互斥、适龄；自行正常不笔试面试。2026/11/23结果25–26注册；2027统一网上1/18–24及中心1/23–24，结果6/2–3注册6/10–11。",
      "academicYear": "2027/28小一",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2025/2027升中FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；联系25%分母为扣除留班及自行后中一余额，附适用网Band1/2及乙部首选/跨网/超额等条件，不是小学毕业生25%或每联系校各25%、非两次专属抽签。",
      "academicYear": "2025/2027周期；2026-09版",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立2027小一自行申请报名须知",
      "url": "http://www.yanlaap.edu.hk/it-school/php/webcms/files/upload/tinymce//www/2027_p1%20know_1788485646.pdf",
      "scope": "已下载全文；113972、65、电子2026/9/17–25 23:59、纸本21–24到16:30/25中秋到16。身份住址、银行税单非居所证明；父母兄姊旧生非全日要上午校证明。儿童或父或母已受洗/注册教友的正统基督教天主教可证明，主办团体限执行委员，与宗教互斥。CHSC官方所列学校域名，HTTPS连接经curl及Exa均失败，仅公开HTTP可用，不伪改协议。",
      "academicYear": "2027/28小一",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立2027小一自行申请注意事项",
      "url": "http://www.yanlaap.edu.hk/it-school/php/webcms/files/upload/tinymce//www/2027_p1_1788485601.pdf",
      "scope": "已下载全文；同分EDB中央处理，不笔试面试；11/23 10时电子/校网/壁报板，11/25–26 9–12/14–16注册。网页和须知中的甲类简写不替代EDB父母本校任职条件。只可用HTTP的官方原件，不改假HTTPS。",
      "academicYear": "2027/28小一",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立2026/27小二至五插班原须知",
      "url": "http://www.yanlaap.edu.hk/it-school/php/webcms/files/upload/tinymce/www/2627_p1%20know_1772672175.pdf",
      "scope": "全文；3/9–21中午12交或寄回、三年成绩、身份居留、活动；操行B+及原校/活动表现筛选，3/27前电话笔试邀，无电话落选；4/11 9–12中英数各50分钟，4/29前邀面试。班别校方定，有普教中意愿。该轮结束不作当前空缺；HTTPS失败用官方公开HTTP原件。",
      "academicYear": "2026/27；已结束",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立2026/27小一候补原须知",
      "url": "http://www.yanlaap.edu.hk/it-school/php/webcms/files/upload/tinymce/www/2627_p1%20know_1778729834.pdf",
      "scope": "全文；5/30及6/1–5分时段、6/5 16截止；K3成绩/身份/两阶段存根/适用奖项、履历如有不多于4页双面，6/10 10时网公布，6/12 16–18首面，恶劣天气才改6/13，理想邀次轮。111为首轮优先，非拒收硬线，非65乙部豁免；不套2027新届。公开HTTP官方原件，HTTPS失败。",
      "academicYear": "2026/27；已结束",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立2025/26升中结果原图",
      "url": "http://www.yanlaap.edu.hk/it-school/php/webcms/files/upload/tinymce//www/new/allocation/25_26website_1784769890.jpg",
      "scope": "从官方升中页原HTML取得、下载直接看整图；更新2026/7/17，主要英语中学93、摘要68/图饼68.4，林护46、英语去向内部49.5%，非全级49.5。首三摘要91/图饼91.2。完整全级分母未明列不由百分比反推；名单不是注册跟踪、不等Band1或各人概率。包括荃官4/萧明6/陈兆民5/全完4、英华3/皇仁英皇各2/喇沙协恩各1等，非只单一路线。HTTPS失败、官方HTTP原图。",
      "academicYear": "2025/26毕业；2026-07-17更新",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立升中资讯原页",
      "url": "http://www.yanlaap.edu.hk/it-school/php/webcms/public/index.php?lang=zh&mode=published&refid=3275",
      "scope": "全文及原HTML已读，2025/26正文放榜照片不是统计；定位allocation原图再目读，不能把页面宣传段当比例证据。学校所列中学活动2025日期不自动升级2026；官方HTTP可读HTTPS失败。",
      "academicYear": "历年入口至2025/26",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：仁立纪念（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=154",
      "scope": "全文于26批已读；65网资助男女基督教、联系林护、各级5；PTA30/设施310/额外NET390。P1一测一考、P2–6两测两考；P3–6能力班与普教中标签可能重叠，不硬相加6班，不笼统说比仁立轻松。",
      "academicYear": "2026/27",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：主恩（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=152",
      "scope": "全文及HTTPS原HTML；非梨木树或青衣同名，65资助基督教、无三中学关系、各级4、PTA30核准300；初小粤普中文班、高小能力分班，P1零测1考/P2–6零测3考。不能说完全无分流、20分九成或比仁立必然愉快。",
      "academicYear": "2026/27",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：荃湾官立（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=398",
      "scope": "全文及HTTPS原HTML；62网、官立无宗教、中文、联系荃湾官立及何文田官立两校，每级5，PTA70核准300；小三起学业成绩编班。联系仍条件化，不同小一乙部居所范围。",
      "academicYear": "2026/27",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国仁立与仁纪历史讨论",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3444393",
      "scope": "已读前后有效评论：2017P1家长自述4–5项及活动/气氛，对精英班是朋友转述；另一人称科任/精英稍多。区分亲历转述、不套当届；其中21联系位等2017推算不作2026制度，未把所有回复当独立家庭或十多帖。",
      "academicYear": "2017历史评论",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28"
    }
  ]
}
```
