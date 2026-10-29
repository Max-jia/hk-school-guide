export type ReportSourceReference = {
  label: string;
  url: string;
  scope: string;
  sourceType: "school-profile" | "school-official" | "school-attributed-social" | "government" | "operator-official" | "exam-authority" | "independent-inspection" | "third-party-estimate" | "parent-discussion" | "media-report" | "university-official";
  academicYear?: string;
  checkedOn: string;
};

/** Explicit, reviewed source links for reports. Keep this separate from report copy. */
const REPORT_SOURCES: Record<string, ReportSourceReference[]> = {
  "york": [
    {
      "label": "教育局《幼稚园概览2026/27》：约克国际幼稚园51号",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5818520001",
      "scope": "全文及HTML；581852/0001、51金巴伦、2010、私立独立非本地不参加计划；2025年9月38教学人员18学位及38幼教证书以上、AM1:10.3/PM1:10.8不含2–3、12课室/656容额、AM288/PM302、无PN全日；2026/27费用57596–87996、报名40/注册970。校方课程及自报外部考试未列考试年和参试全届分母；用品/教师年资无数据不作零。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；师生及服务2025年9月"
    },
    {
      "label": "教育局学校资料：约克国际幼稚园注册实体",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=581852000111",
      "scope": "正文；51 Cumberland Road不包括天台、581852/0001、私立男女上午；临时2010-01-29、注册2011-06-30。只核该注册班次，不把独立49号及14号当同校数据。",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局现行收费证书：约克国际幼稚园",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/581852.pdf",
      "scope": "完整三页；K1–3AM/PM一般5236×11=57596、双语7333×12=87996，2013-08-01；MI6650×12=79800，2020-11-01。课程另列不代表可直接相加或最新选修条件；51不包括天台及2 Essex地下地址，后者现行分班未证。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "现行证书；2013及2020生效"
    },
    {
      "label": "约克官网：校址与不同学校实体",
      "url": "https://york.edu.hk/en/addresses.html",
      "scope": "全文重读；51 Cumberland国际幼稚园23361483；49 Cumberland英文小学暨幼稚园、14 Stafford预备班分别列示；品牌另有元朗/将军澳/屯门/湿地，不能沿用仅两或三校舍说法。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "约克官网：招生及出生后申请安排",
      "url": "https://york.edu.hk/en/admissions.html",
      "scope": "全文重读；2–6岁秋入学及个别迟入，出生后可线上申请为行政安排，仍须申请及面试，非先到先得/保录；各校报名原件分别链接。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "约克国际及预备班：2027年8月入学须知",
      "url": "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO.pdf",
      "scope": "完整两页；51国际与14 Stafford预备班共同文件，PN不能套51。2027入学N1/L2/U3出生2024/23/22、申请40/材料、获录简介及L2/U3会面、有限候补、暂定班时、学校分配校址及升班可转、30天退学排除7/8月及5月30日条款。虽文件名含fees/debenture，无具体学费或债券数。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28；2027年8月入学"
    },
    {
      "label": "约克官网：面试过程与样题边界",
      "url": "https://york.edu.hk/applicationform/interview_process.pdf",
      "scope": "完整一页；样题不保证题数难度，反对操练，学习准备/社交情绪/成长情况并看，不要求答懂所有题，不支持全英固定线或交费保录。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "约克官网：语言教学",
      "url": "https://york.edu.hk/en/languages.html",
      "scope": "全文重读；母语英语教师、小组/共读/角色扮演；中文粤语及普通话认写。没有51各课程英语分钟数或全天NET班主任比例。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "约克官网：毕业生升小展示",
      "url": "https://york.edu.hk/en/grad-satistics.html",
      "scope": "正文重读；文字over70%毕业生获24所小学之一offer；未列年份、全届数、分校分母，不能当51校本实际入读率。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "约克官网原图：直私与官津比例",
      "url": "https://york.edu.hk/static/assets/images/graduation-statistics-content-1-en.png",
      "scope": "实际view_image目读；69%直资/私立、30%官立/资助，余1%未标；示例学校没有各校人数，图无年份、总数或分校，未说明offer/实读。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "约克官网原图：24所小学名单",
      "url": "https://york.edu.hk/static/assets/images/graduation-statistics-content-2-en.png",
      "scope": "实际view_image目读；24校名称，无逐校人数、年份或分校，不可编前三/各校录取概率。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国：York约克幼稚园四年总结（2020主帖）",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3816822",
      "scope": "实际读取第一页主帖；islz2020-03-24发、11-25更，自述PN–K3、曾51面试但非四年校址证明；英语/老师/活动正面，家庭比赛功课投入、收费推介个人意见。未读全串，不能把个案升小及未定位ORT9/Starters盾数作全校统计。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020年历史自述"
    },
    {
      "label": "教育王国：跪求York N真实用家分享（2020）",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3847015",
      "scope": "实际读取第一页相关回复；gamtrulia入读三周语言进步及行政意见、校区不明；fadgare明确美孚不能套51；朋友转述与“系人都收”无分母。非2026校本满意度或收生率。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020年10月27日历史回复"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "同一工作流前批已完整读取四页；统一派位乙部按儿童住址校网，读九龙塘幼稚园不赋予41小一校网；自行不限住址网，直资与官津POA的持位规则须分开。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    }
  ],
  "york-klt": [
    {
      "label": "家校会幼稚园概览2026/27：约克英文九龙塘",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3228220002",
      "scope": "322822/0002、49金巴伦；2025/9教师21、学位14、幼教证21、上午1:12.4／下午1:7.7、容量277、14课室；没有2–3岁服务、无全日；本地及非本地课程；每年1及5月校内评估；K1最低79800，不能拿70200套各级",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27，师资容量为2025年9月"
    },
    {
      "label": "教育局：约克英文九龙塘现行可读收费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/322822.pdf",
      "scope": "web直接读3页：Montessori87996、Bilingual70200、MI79800，12期，课程生效分别2013/14/15/20；共同列10York与49Cumberland，不自动证明旧地址当前招生；非本地描述课程不等非本地学生身份收费",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "现行在载证书；各课程批准日期2013至2020"
    },
    {
      "label": "教育局：约克英文49金巴伦注册学校",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=322822000211",
      "scope": "322822/0002，幼稚园、私立、男女、49金巴伦地下一楼，注册日期1972/1/4；与KGP1979起办年不同口径，不推定现址1972创校",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方2027/28英文幼稚园招生及退学原件",
      "url": "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO_8-10.pdf",
      "scope": "已读父端保存的原PDF全文转文：明列49Cumberland；N1出生2024、L2 2023、U3 2022，2027/8入学，AM9:15–12:15／PM13:55–16:55暂定；40报名；L2/U3校长非正式会面、可候补；可分配及升班转校区；退学30日排除7/8月，8月不回须5/30前；正文无债券金额",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28，文件名26不是适用2026/27"
    },
    {
      "label": "校方Interview Process原件",
      "url": "https://york.edu.hk/applicationform/interview_process.pdf",
      "scope": "已读父端保存原件全文；样题仅题型不代表数量难度，反对操练补习；全面看准备、社交情绪与家庭情况，不编通过线或来者不拒",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方Admissions",
      "url": "https://york.edu.hk/en/admissions.html",
      "scope": "已读保存网页全文：2至6岁秋入学、特别迟入、可出生后网上申请；需安排面试，不能推早报必入；不同注册校园分列",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方Addresses",
      "url": "https://york.edu.hk/en/addresses.html",
      "scope": "已读保存网页全文：49英文、51国际、14Stafford国际／英文预备部，及元朗/TKO/TuenMun/Wetland；不把多实体合成三校或把PN套49",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方Languages",
      "url": "https://york.edu.hk/en/languages.html",
      "scope": "已读保存网页全文：英语母语老师、小组共读角色扮演，中文含粤语普通话及认写高频字；无英语课时百分比或必获母语级承诺",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方Graduation Statistics文字",
      "url": "https://york.edu.hk/en/grad-satistics.html",
      "scope": "已读保存网页全文：Over70%毕业生取得所列24校offer，未署年度、人数及分校，不等49单校入读率或top3排名",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方升小统计图1",
      "url": "https://york.edu.hk/static/assets/images/graduation-statistics-content-1-en.png",
      "scope": "已目读原图：69%直资／私立、30%官津，余1%未标；仅例校无人数、无年份分母，不能与文字70%相加或当个人成功率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方升小统计图2：24校名单",
      "url": "https://york.edu.hk/static/assets/images/graduation-statistics-content-2-en.png",
      "scope": "已目读原图：24所学校名称、无逐校人数；不能虚构考入最多前三或给单校概率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国：York四年总结问答第10页",
      "url": "https://www.edu-kingdom.com/forum.php?extra=page%3D1&mod=viewthread&page=10&tid=3816822",
      "scope": "2020/5/22 fadgare自称几名子女曾读49、51、10York、Stafford及美孚，分享语言、家长跟进、校车、老师及行政差别；跨校园历史自述，身份未独立认证，不作现届49统计",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020年5月历史讨论"
    },
    {
      "label": "大公报：约克总校长向家长退款",
      "url": "https://www.tkww.hk/epaper/view/newsDetail/1372953968296202240.html",
      "scope": "2010/10/1原报道，涉及品牌三幼稚园通告及收费慕道班退款、校方及教区回应；纠正原稿2013日期，仅历史归属，不等当前违法或已经定罪",
      "sourceType": "media-report",
      "checkedOn": "2026-10-28",
      "academicYear": "2010年10月历史报道"
    },
    {
      "label": "东方日报：警调查约克收费慕道班",
      "url": "https://orientaldaily.on.cc/cnt/news/20101230/00176_037.html",
      "scope": "2010/12/30报道教育局转介、警方跟进，当时无人被捕；不是2013、也不是最终司法结论",
      "sourceType": "media-report",
      "checkedOn": "2026-10-28",
      "academicYear": "2010年12月历史报道"
    },
    {
      "label": "教育局2027小一入学资料",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "此前已全文读取复用：幼稚园宗教不决定申请人宗教分，兄姊在本小学读及父母本校任职为甲类；旧生10分、首名5分首五项选一；住址校网用于统一派位不是幼稚园地址",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    }
  ],
  "york-montessori-yl": [
    {
      "label": "家校會KGP2026/27：約克蒙特梭利元朗完整條目",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=6054410001",
      "scope": "已讀完整原HTML：605441/0001、元朗錦田潭尾段18峻巒商場地下、2017、私立獨立不參計劃、本地及非本地、蘇綺華／鄭綺玲；2025-09容額215、18教師學位7幼教18、師比1:7.9/1:6.9含PN、K上午56下午78、PN89；有戶外／室內遊戲及音樂室。2026/27 K1為60,000–87,600，K2/3為84,000–87,600（各12期），PN102,000另屬2025-09服務欄；報名40／半日註冊970。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（統計2025-09）"
    },
    {
      "label": "教育局現用605441收費證明書（3頁）",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/605441.pdf",
      "scope": "全文3頁已讀：非本地K1–3上午下午7,000×12=84,000（2017-06-13）；本地NON-KGS K1–3上午下午5,000×12=60,000（2020-07-13）；非本地多元智能7,300×12=87,600（2021-03-08）。生效日期舊不等失效歷史檔；需核實際錄取課程及開班，不能以PN102,000覆蓋K班，亦不代表2027/28新核准價。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "現用費證（各課程生效2017／2020／2021）"
    },
    {
      "label": "約克官網校址與校區清單",
      "url": "https://york.edu.hk/en/addresses.html",
      "scope": "復用已保存官方原HTML並讀全文：元朗Pre-school／Playschool同址潭尾18號及2368-9738；九龍塘51國際／49英文／14Stafford預備部，另將軍澳、屯門、濕地等，不是三間分校或元朗唯一新界西約克。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "約克官網英中語言課程",
      "url": "https://york.edu.hk/en/languages.html",
      "scope": "已讀保存全文：母語英師、小組／共享閱讀／角色扮演；中文包括粵語與普通話、認讀寫高頻字，另有國際交流及年度戲劇。品牌說明未有元朗各語言課時或蒙氏混齡／連續工作周期／AMI師資認證，不把品牌說明當校本成果保證。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "約克官網當用一般招生頁",
      "url": "https://york.edu.hk/en/admissions.html",
      "scope": "已讀保存全文及原HTML連結：2–6歲、每年秋入學與特別遲入、可出生後網上先交申請；元朗獨立Admission Information及Application Form。出生後可報名不等出生入學或早報必入，未列元朗固定截止／面試放榜日／候補優先。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "元朗2027/28招生須知及退學條款",
      "url": "https://york.edu.hk/applicationform/26_SCHOOL_FEES_AND_DEBENTURE_INFO_YL.pdf",
      "scope": "完整2頁原PDF文字：N1出生2024、L2 2023、U3 2022，2027-08入學；PN開始須滿2。暫定AM9:10–12:10/PM13:40–16:40、報名40及文件；N1獲錄後家長簡介，L2/U3非正式校長會面，不能推PN或K1無評估。至少30天書面退學，7/8月不計、8月不回須5-30前通知、遲通知按天levy；沒有具體學費／債券金額。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "元朗官網當用入學申請表（4頁）",
      "url": "https://york.edu.hk/applicationform/application%20form_YORK_YL.pdf",
      "scope": "完整PDF：前3頁渲染原圖目讀，第4頁聲明讀文字。PN／N1／L2／U3選項、AM/PM第一二志願，**U3註PM Session Only**，校用面試欄；家長學歷職業／語言與York舊生、兄姊、住址等欄。欄位不是錄取加分表，不能從要求職業斷定背景取錄；表未標年度，與2027須知及KGP2025-09上午K3為0並列，目標年班制仍須書面確認。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "約克面試流程與練習題用途原PDF",
      "url": "https://york.edu.hk/applicationform/interview_process.pdf",
      "scope": "完整1頁：練習題只示題型、不代表數量難度，反對操練／補習、不需全部答對；看學術準備、社交情緒、家庭情況等全人匹配。不是固定詞彙線／保證低門檻，也不提供元朗當屆集體及個別考核時間表。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "約克官方升小統計文字頁",
      "url": "https://york.edu.hk/en/grad-satistics.html",
      "scope": "已讀保存全文：Over70% of York graduates obtained offers from one of following24schools；未標年度、全屆分母及元朗分拆。頁腳Choose campus是導覽，並非按校區篩選統計；offer不等最終入讀、24校不是有錄取人數排名。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "約克官方升小統計圖1",
      "url": "https://york.edu.hk/static/assets/images/graduation-statistics-content-1-en.png",
      "scope": "已用view_image目讀原圖：69%DirectSubsidy/Private、30%Aided/Gov；餘下小扇形未標類別／1%文字，不自行命名Other。右側只例校，沒有年度、總人數、校區或各校人數；不與文字Over70%互換、相加或套元朗當屆。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "約克官方升小24所學校名單圖2",
      "url": "https://york.edu.hk/static/assets/images/graduation-statistics-content-2-en.png",
      "scope": "已目讀整圖24校名：喇沙、英華、培僑、女拔、陳守仁、聖瑪利、九龍塘官立、男拔、瑪利諾、KTS、宣道等；只有名單，無逐校錄取數、名次／校區／年度。不能編Top3或指定元朗常見入讀學校。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王國2020元朗York原帖",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3844340",
      "scope": "已讀2020-09-15主帖及兩回覆原文：PN家長對溝通和教師觀察有疑慮，另一前PN家長說孩子開心、老師關愛及疫情一對一聯繫；是有分歧的歷史個案，未經獨立查證，不作現任人員／2026管理品質事實，不放大成多帖共識或合成訪談。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020（歷史個案）"
    },
    {
      "label": "教育王國2020 York N班選校原帖（已讀首四樓）",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3848646",
      "scope": "已讀2020-12-01首四樓：有SK大B班說法，但回覆明言經驗來自九龍塘49號及後轉美孚、不知道其他分校是否相同；因此不能據此核元朗混齡／SK班／PN優先／錄取率。未宣稱讀完第二頁或整個39回覆串。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020（歷史討論，首四樓）"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "ywps": [
    {
      "label": "家校会《小学概览2026》：英华小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=276",
      "scope": "全文；2003复办/直资男校/无POA网/一条龙、2026/27班数费用、2025/26含校长66师资、测考及兴趣分班。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局英华小学收费证明书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/550477.pdf",
      "scope": "完整2页，2026-09-01生效，P1–6每期1970、10期全年19700；非旧19000。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学官方奖助学金",
      "url": "https://www.yingwaps.edu.hk/tc/content.php?wid=23",
      "scope": "全文，19700学费与三类助学/活动支持；不能把学费减免等同交通全免。",
      "sourceType": "school-official",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学历史",
      "url": "https://www.yingwaps.edu.hk/tc/content.php?wid=77",
      "scope": "全文，1818书院而非小学现阶段；2003小学复办、2008转直资。",
      "sourceType": "school-official",
      "academicYear": "历史",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学中文课程",
      "url": "https://www.yingwaps.edu.hk/tc/content.php?wid=41",
      "scope": "全文普教中、校本拼音、初小说话写话/中高阅写文学历史/戏剧电子资源；不把中文科等于全科普通话。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未列年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学英文课程",
      "url": "https://www.yingwaps.edu.hk/tc/content.php?wid=43",
      "scope": "全文，面向男生选书、阅读策略、Language Arts、创作戏剧演说与拔尖，非全日英语比例证明。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未列年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学校车路线",
      "url": "https://www.yingwaps.edu.hk/tc/content.php?wid=73",
      "scope": "完整路线页未明学年，不从历史帖子推出无港岛服务；具体站点车程及活动后安排另核。",
      "sourceType": "school-official",
      "academicYear": "网页未列服务年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学2027/28小一招生官方专页",
      "url": "https://sites.google.com/yingwa.hk/ywps-2728-p1?usp=sharing",
      "scope": "由学校招生入口直接链接，全文及原HTML；7/15–19申请、8/22起首轮、10/13起二轮、2027一月底结果。简介会仅一成人不带孩子，FCFS仅会场。",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学2027/28招生简报原PDF",
      "url": "https://drive.google.com/file/d/10HB1Y0lB2cMRINatAaIsiwRc6kxB0iFY/preview",
      "scope": "嵌于官方专页，公开PDF实际下载并提取；只有一页议程，未含165额/4000人数或题库，不以标题冒充已核。",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学学生就学政策原PDF",
      "url": "https://drive.google.com/file/d/1aZqJjtQlEyHZNDzyiamiSrB7zzYMFurh/view?usp=drive_link",
      "scope": "官网公开原PDF全文；两轮面试/六类申请类别；全年不定期插班中英各60分数45分；P5第三/P6第一次与第二次呈分四科及格、操行B的分阶段条件。原件常识科名且无年度，不套新分科未经确认。",
      "sourceType": "school-official",
      "academicYear": "文件未明适用年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华小学2024/25完整校务报告",
      "url": "https://drive.google.com/file/d/1AvxyLwe2Si3-ehgaQebH999VRIhcUEqR/view?usp=drive_link",
      "scope": "学校报告入口公开链接实际下载全文。第1页P6=164；第8页P6=144、116选择英华书院，原件内部差异不算成功率；104教职不等教师。森林自然/健康支持有原件，自评非独立口碑。",
      "sourceType": "school-official",
      "academicYear": "2024/25",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "英华书院当届中一收生",
      "url": "https://www.yingwa.edu.hk/index.php?s=3_48",
      "scope": "完整读：外校60位、2026/11/14–28申请、2027/1/16面试/3月结果；一般学费27000保持至2027/28。1400简介会座位非申请人数。",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局英华书院现行费证",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/515027.pdf",
      "scope": "完整2页2026-09-01生效：一般S1–6全年27000、IAL S5/6全年58000，期数分级；搜索旧缓存25300不可替代当前原件。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会英华书院概览",
      "url": "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=418",
      "scope": "已读课程栏2026/27：2024/25 S4混合预备、2025/26 S5首IAL；DSE与IAL解释，不做小学自动升任何高中轨保证。",
      "sourceType": "school-profile",
      "academicYear": "2025/26概览；2026/27拟开科",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国英华课外活动校车历史讨论",
      "url": "https://www.edu-kingdom.com/forum.php?goto=nextoldset&mod=redirect&tid=2853508",
      "scope": "搜索抓取到完整2014/9问答：CARMA问活动后校车，PassionC称当时自行接送；普通详情工具读失败，保留真实读取范围，不当2026政策或多个已核在读样本。",
      "sourceType": "parent-discussion",
      "academicYear": "2014历史评论",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国英华小学家长历史讨论第102页",
      "url": "https://www.edu-kingdom.com/forum.php?archiver=1&mod=viewthread&page=102&tid=52540",
      "scope": "搜索返回全文有效评论，2005家长分享TKO车程与另一家早起体验；普通抓取失败，不转写当届时刻或20多帖共识。",
      "sourceType": "parent-discussion",
      "academicYear": "2005历史评论",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "喇沙小学《小学概览2026》",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=87",
      "scope": "工具提取失败后公开curl原HTML全文：41/资助男天主教/直属喇沙非一条龙/中含普通话及英/每级6班；非标准3300+PTA800六年，免学费非零成本。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣保罗书院小学2027/28家长须知",
      "url": "https://www.spc-ps.edu.hk/page.php?id=14&mid=18",
      "scope": "完整读：直资男校、维多利亚道777；2026/27学费32000/10，招生校本。",
      "sourceType": "school-official",
      "academicYear": "2027/28招生；费用2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣保罗书院小学课程",
      "url": "https://www.spc-ps.edu.hk/page.php?id=69&mid=86",
      "scope": "完整读：小四起普教中、常识低年20/高年80英语、宗教英语；仍用常识旧科名不直接推新分科当届课时。",
      "sourceType": "school-official",
      "academicYear": "课程页未列年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣方济各英文小学学校资料",
      "url": "https://www.sfaeps.edu.hk/en/school-information",
      "scope": "完整读：石硖尾街58/私立全日英文/天主教/中文普教中，不编竞品学费或阶层画像。",
      "sourceType": "school-official",
      "academicYear": "现行学校资料",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣方济各英文小学2027/28小一原通知",
      "url": "https://www.sfaeps.edu.hk/sites/default/files/sites/default/files/information_of_primary_one_application_2027-2028.pdf",
      "scope": "完整2页；约160额、8/21–9/14、10月面试、11/17结果；人文科学英语/中文普通话/P3–6法日。未套作英华流程。",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "veo-cwb": [
    {
      "label": "教育局《幼稚园概览2026/27》：铜锣湾维多利亚国际幼稚园",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3256510001",
      "scope": "全文与原始HTML；325651/0001、三楼及天台、非牟利、男女、1965、丁毓珠/李美珠、不参加计划。2025年9月26教学人员、25学位/20幼教证书以上、7课室/容额420、AM1:7.2/PM1:6.6且不含2–3岁；K1–3学生AM84/52/50、PM25/52/94。2026/27半日96480/88360/90710十期；全日K3有获批171930但2025在读零，不能当当前开办；无PN。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；师生在读2025年9月"
    },
    {
      "label": "教育局概览：同址另一注册的铜锣湾维多利亚幼稚园",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3247790001",
      "scope": "全文；324779/0001为G–2楼，8课室、2025年9月34教学人员、师生AM/PM1:6.2且包括2–3岁，PN人数176，非牟利且不参加计划。不能与325651的26人、7课室混成单一学部；也不直接相加教师作独立人数。PN99847属2025幼儿服务数据，现行收费以校方2026/27表交叉。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；幼儿服务及师生2025年9月"
    },
    {
      "label": "教育局现行收费证书：铜锣湾维多利亚国际幼稚园",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/325651.pdf",
      "scope": "完整两页；K1半日9648×10=96480，2025-09-01生效；K2 8836×10=88360、K3 9071×10=90710，全日K3 17193×10=171930，2022-09-01生效。旧生效日与2026/27适用资料分开，获批课程不等当年实际开班。中文地址三楼及天台、英文2/F & ROOF，按原件并列不擅改。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "现行证书；2022及2025生效"
    },
    {
      "label": "铜锣湾校方：2026/27全年学费表",
      "url": "https://www.cbvictoria.edu.hk/uploaded_files/page/35/Tuition%2026-27_TC_1.pdf",
      "scope": "全文一页；PN104830十一期，K1 96480、K2 88360、K3 90710各十期，分楼层与注册列示。含学生证/通讯/中英文阅读图书/平台/评估毕业证/生日节日礼物/手册/茶点/亲子教材套；不把已包含项目再列成必另收费，不保证校车校服及所有活动全包。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "铜锣湾校方：学校一瞥与注册实体",
      "url": "https://www.cbvictoria.edu.hk/sc/quick_facts/",
      "scope": "全文；分别列CBVK324779、CBVIK325651、CBVIN CCC/767，办学团体铜锣湾街坊福利促进会，1965、非牟利、兴发街32号、25789998。15课室/2户外场/1545平方米是整座校舍合并介绍，不是325651单一学部；不可写成当前VEO八校舍之一。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日所见；2026/27收费链接"
    },
    {
      "label": "铜锣湾校方：2027/28班别、活动时间与PN计划学额",
      "url": "https://www.cbvictoria.edu.hk/sc/activity_time/",
      "scope": "全文与HTML格式；2027/28红粗下划线招收PN双语和三语AM/PM，K1/K2三语AM/PM、K3三语PM为黑字。PN计划三语78+78/英普26+26=208可调整，非实收或申请分母；英普PN母语须普或英。PN–K2 AM8:45–11:45/PM13–16，K3 PM13–16:30周一四、周五16；没有当前全日班表。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28招生；活动时间当日所见"
    },
    {
      "label": "铜锣湾校方：2027/28 PN申请须知",
      "url": "https://www.cbvictoria.edu.hk/sc/pn_application/",
      "scope": "全文；出生2024-09-01至2025-08-31，2026-09-14十时至11-30十七时网申、40费；见2027-01-15/16，2027三月结果/八月开学。适龄申请皆见、中英老师小组15–20分钟/一成人入课室、最多两成人入校；本校亲兄姊在读或三年内毕业豁免家长接见，非保证取录；教职员或校董子女优先，至少懂中或英一种指令。自身注明K3优先入VSA，须与VSA甄选条件并读。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "铜锣湾校方：K1–K3及当年PN插班初步登记",
      "url": "https://www.cbvictoria.edu.hk/sc/k1k2k3_application/",
      "scope": "正文全文；K3/K2/K1及2026/27 PN通过电子登记作初步记录，现阶段无须任何费用。未列固定空缺、放榜窗口、寄信语言/频率或保证面见；未打开登记表内部，不冒称已核其中额外文件。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27 PN与K1–K3滚动登记"
    },
    {
      "label": "铜锣湾校方：报名FAQ",
      "url": "https://www.cbvictoria.edu.hk/sc/faq/",
      "scope": "全文；明确报名不分先后，适龄期内网申皆获接见；2025-09-01以后出生等2027九月查2028/29，不以早报加分。确认信、资料更正可邮件联络，不能写必须打印邮寄、不能电邮。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "铜锣湾校方：本校毕业生小一去向人数",
      "url": "https://www.cbvictoria.edu.hk/sc/school_placement/",
      "scope": "正文全表已读；全校毕业生122，VSA60、圣士提反附小12、蔡继有4、SPCC3等，与VEO集团四年offer表不同。学年由同页官方图明确2024/25，按60/122计算约49.2%仅该届公布去向占比，非申请成功率；未分324779/325651，不能当国际学部独立结果。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2024/25"
    },
    {
      "label": "铜锣湾校方：2024/25 K3毕业生入读小学图表",
      "url": "https://www.cbvictoria.edu.hk/uploaded_files/page/22/Piechart_Primary%20School%20Placement%20for%20Upper%20Class%20(K3)%20Graduates%20(AY%202024-2025).jpg",
      "scope": "已下载目读原图；标题2024–2025高班毕业生入读小学一年级概况，官津16%、私立/直资77%、国际7%。属于该校公布的毕业去向分类；不拿分类77%当VSA或名校比例，也未独立核最终注册。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2024/25"
    },
    {
      "label": "IB官方名录：铜锣湾维多利亚",
      "url": "https://www.ibo.org/school/003716/",
      "scope": "web全文已读，直接请求403但web成功；IB003716、2012-03-06起获授权，校名合并Kindergarten and International Kindergarten，校长Sabrina Lee、授课English/Chinese。课程授权不代表升小一条龙或录取率。",
      "sourceType": "exam-authority",
      "checkedOn": "2026-10-28",
      "academicYear": "2012-03-06起；核对日现行名录"
    },
    {
      "label": "铜锣湾校方：IB课程",
      "url": "https://www.cbvictoria.edu.hk/sc/ib/",
      "scope": "全文；PYP探究、以学生为中心、老师引导资料搜集分析整理汇报，两文三语及中国文化/国际意识。未公布可推全部学生学术深浅、抄写数量或外补必要性的指标。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日所见"
    },
    {
      "label": "铜锣湾校方：读写计划与语言政策",
      "url": "https://www.cbvictoria.edu.hk/sc/RWP/",
      "scope": "全文；一老师一语言；中文IB框架、喜阅写意、核心经验与哥伦比亚读写策略，精读泛读及家校共读。不能由英语沉浸直接推中文最弱、每家K2必须补习。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日所见"
    },
    {
      "label": "VSA校方：Year1申请、甄选及优先安排",
      "url": "https://www.vsa.edu.hk/admissions/how-to-apply",
      "scope": "官方正文已读；相近水平才考虑债券/校董/教职员/兄姊/feeder幼稚园/校友等联系；Y1两轮小组、家长首轮面见，兄姊免家长面见，Y1/2至少中或英一种强项。书面中英数评估明确在Y2–11，不能套成Y1必笔试；Victoria幼稚园或债券优先，不是100%直升。新入Victoria K3者要待空缺；当前Y1巡视指2028/29，通用九月至二月并有提前申请例子。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行通用办法；Y1入口2028/29"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整四页已于前批同一工作流读取；统一派位乙部按儿童居住地址校网，读湾仔或何文田幼稚园不赋予12/41小一校网资格。自行不限住址网；接受直资小学学位后不可再获官津POA学位，私立持位规则须分开。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    }
  ],
  "veo-hmt": [
    {
      "label": "VSA校方：Year1申请、甄选及优先安排",
      "url": "https://www.vsa.edu.hk/admissions/how-to-apply",
      "scope": "官方正文已读；相近水平才考虑债券/校董/教职员/兄姊/feeder幼稚园/校友等联系；Y1两轮小组、家长首轮面见，兄姊免家长面见，Y1/2至少中或英一种强项。书面中英数评估明确在Y2–11，不能套成Y1必笔试；Victoria幼稚园或债券优先，不是100%直升。新入Victoria K3者要待空缺；当前Y1巡视指2028/29，通用九月至二月并有提前申请例子。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行通用办法；Y1入口2028/29"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整四页已于前批同一工作流读取；统一派位乙部按儿童居住地址校网，读湾仔或何文田幼稚园不赋予12/41小一校网资格。自行不限住址网；接受直资小学学位后不可再获官津POA学位，私立持位规则须分开。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    },
    {
      "label": "教育局概览：何文田地下国际幼稚园",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=6180390001",
      "scope": "全文；618039/0001、君逸山地下、2021创校、周慧生/郭惠仪、私立独立/非本地、不参加计划。2025年9月15教学人员/15学位/12幼教证书以上、4课室/容额198、AM/PM1:5.1不含PN；AM K2 77、PM K1 35/K2 42，无K3在读。2026/27费120934/109490/110790，未开全日；无户外及音乐室指该注册，不是整个校区。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；师生在读2025年9月"
    },
    {
      "label": "教育局概览：何文田一楼国际幼儿园",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5669000001",
      "scope": "全文；566900/0001、君逸山1楼、2005、8课室/容额248、音乐室有/无户外。2025年9月35教学人员/33学位/29幼教证书以上、AM1:4.7/PM1:4.2含PN，PN102；K1 AM98/K3 PM83/全日15。校方课程自2010-05起IB授权，不能称PN楼只有PN。2026/27 K3全日获批214770，2025实际15人不等当前开办。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；幼儿服务及师生2025年9月"
    },
    {
      "label": "教育局现行收费证书：何文田地下幼稚园",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/618039.pdf",
      "scope": "完整两页；K1 10994×11=120934，2026-08-01生效；K2 10949×10=109490/K3 11079×10=110790，2026-09-01生效；无全日项。不是把PN叫K1，也不将K2/3十期套至K1。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；2026八月及九月生效"
    },
    {
      "label": "教育局现行收费证书：何文田一楼幼儿园",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/566900.pdf",
      "scope": "完整两页；K1–3半日与地下同价/期数，另K3全日21477×10=214770、膳食1295×10=12950获批，2026-09-01生效。当前校方收费和班别页全日均未列，可收费证书不能当作确实提供全日服务。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "VEO官方：何文田校舍与领导团队",
      "url": "https://www.victoria.edu.hk/campus/homantin-campus/",
      "scope": "全文；校区2005，合并幼儿园及幼稚园G/F+1/F，PN1岁10个月起、K1–3 PYP、两文三语、校长Blanche Kwok/PYP协调Angel Chiu。校车多区但按人数地址调整，不能保证某路线六年不变；官网菜单八VEO校舍不含兴发街独立铜锣湾。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日现行校舍页"
    },
    {
      "label": "VEO官方：2026/27各校舍收费",
      "url": "https://www.victoria.edu.hk/tution/?tab=Nursery_Kindergarten",
      "scope": "全文；HMT一楼PN未满2岁147466/已满2岁142901，K1 120934/K2 109490/K3 110790；地下一样K1–3。全日K3两楼皆“-”，与获批证书、旧全日人数有时间口径差；PN及K1十一期、K2/3十期。不能继续写2025费或当前K3全日206510。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "VEO官方：2026/27班别与上课时间",
      "url": "https://www.victoria.edu.hk/programme-class-schedule/?tab=Nursery_Kindergarten",
      "scope": "全文；HMT PN under2/over2及K1/2均AM/PM，K3只有PM，三语英普粤。PN–K2 8:45–11:45或13–16；K3周一四13–16:30/周五13–16。当前英普双语只写Belcher，不套HMT；未列全日。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "VEO官方：2027/28及2026/27滚动申请程序",
      "url": "https://www.victoria.edu.hk/application-procedure/",
      "scope": "全文（含滚动页签）；2027K1网申2026-09-07十时至10-26十七时已过，PN09-14十时至12-14十七时。K1见11-07、次轮11-17至26工作日、12-04结果；PN见2027-01-08/09、次轮01-18至29排除25日、03-05结果。40报名/六志愿/首志愿校面见，兄姊在读或曾读免次轮非免取录；在读PN无需另申K1属VEO。滚动2026/27 PN–K3正式网申，先留档按余位联系，无位不通知，不是K2渠道未知。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28常规招生；2026/27滚动"
    },
    {
      "label": "VEO官方：招生与语言FAQ",
      "url": "https://www.victoria.edu.hk/faq/?tab=1",
      "scope": "全文；不先到先得，适龄期内皆首轮，最多六校一表首选见。三语英/粤/普教师课堂等份、双语英普等份；机构平均1:7–9非HMT注册1:5.1同口径数字。校区共课程框架但主题活动可异；PN/K1八月中、K2/3九月。不能说英语为主体因此中文必弱。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日所见；招生2027/28"
    },
    {
      "label": "VEO官方：2022/23–2025/26小学offer统计",
      "url": "https://www.victoria.edu.hk/school-placement/",
      "scope": "全文含全部表格及脚注；截至2026-09-04，四学年692名完成VEO K3者获VSA offer，其他学校数也为获offer学生；非所有校录取合计的人头、非实际入读，不按HMT拆分，不是铜锣湾兴发街的结果，不可推每校20%或个人成功率。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2022/23–2025/26；2026-09-04数据"
    },
    {
      "label": "VEO官方：升小360支援",
      "url": "https://www.victoria.edu.hk/primary-transition/",
      "scope": "全文；K2/K3有小学选择、申请、档案、面试支援、家长分享及活动册，路线包括VSA/其他本地/国际。可以据此描述衔接支援，不能写课程不作任何本地面试准备或必须一律外补。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日所见"
    },
    {
      "label": "IB官方名录：何文田幼儿园及幼稚园",
      "url": "https://www.ibo.org/school/002865/",
      "scope": "web全文已读；校名Victoria (Homantin) Int’l Nursery and Kindergarten、IB002865、2010-05-13授权、校长Blanche Kwok、English。与地下注册2021及校区2005分开，不再称2021才首次成为IB或仅次CWB；原件不证明PN为独立授权年龄。",
      "sourceType": "exam-authority",
      "checkedOn": "2026-10-28",
      "academicYear": "2010-05-13起；核对日现行名录"
    },
    {
      "label": "教育王国：2007年何文田用家讨论",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=1210592",
      "scope": "实际读到2007-11-23/26/28 Radiomama自称K1家长：照顾、读书/亲子材料、家校接触、3:27及教师稳定；费用和校车路线取舍。3:27来自2007个案，不是2026官方配置，也早于地下KG2021注册；作者身份仅自述，不能升级多年多帖共识或现行护士/年资保证。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2007历史自述"
    },
    {
      "label": "教育王国：2015年维多利亚与他校课程讨论",
      "url": "https://m.edu-kingdom.com/post.php?fid=6&page=3&tid=3191766",
      "scope": "实际读第三页2015-12-06；mamaishere自称K3家长认为课程及家课有加深、老师友善、家校参与，Jolly333自称孩子K3/PN称须外补；回复中申请者仍追问是哪校。不可全归HMT/铜锣湾，意见有分歧，历史费用、VSA留位五个月及申请安排不当现行。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2015历史；部分回复校区未明确"
    }
  ],
  "wflst": [
    {
      "label": "家校会《小学概览2026》：李宗德小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=492",
      "scope": "全文及HTML；直资全日男女/无宗教、2002/天晖路9号/7200平方米、无三中学关系、POA网不适用。2026/27年费20100/PTA50/试75/注册630；2025/26教师71、师训94/学士100/硕博32/SEN83/教龄31/20/49%，两年30班各级5。P1零测考/P2–6零测两考、平均编班、有拔尖和补底及融合支援；科目语言英普粤分开。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；教师2025/26；2026-09-01修订"
    },
    {
      "label": "教育局现行收费证书：李宗德小学",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/539961.pdf",
      "scope": "完整两页；学校539961、天晖路9号，本地P1–6各2010×10=20100，2026-09-01生效。不是仍待批准19300涨20100，下一学年亦不得无资料保证不变。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；2026-09-01生效"
    },
    {
      "label": "李宗德校方：学费及减免入口",
      "url": "https://www.wfjlps.edu.hk/tc/admission.php?id=885",
      "scope": "全文；学校非牟利直资、年费20100十期，公布当届减免通告和申请表，不能继续称幅度条件完全未公开。奖学金/减免须视拨备及资格，非入校即批。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "李宗德校方：2026/27学费减免通告",
      "url": "https://www.wfjlps.edu.hk/attachment/upload/files/2526_SC499_%E5%AD%B8%E8%B2%BB%E6%B8%9B%E5%85%8D%E8%A8%88%E5%8A%832026-2027_LKN.pdf",
      "scope": "全文两页中英，2026-07-06署日；全免/75/50/25%，三人家庭月收入18681/24260/29840/31240阶梯，首边界中英与邻档有重叠，不能自行定资格。CSSA全免、合资格学生资助者不低于资助率、单亲计人数+1。09-30前交收入证明，收入其后不利变化可学年中申请；不把三人门槛套所有户数。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "李宗德校方：奖学金类别及条件",
      "url": "https://www.wfjlps.edu.hk/tc/admission.php?id=813",
      "scope": "全文；公布每级第一/第二至二十、每班进步、各科首名、操行/阅读/服务及体艺科创等16项；没有公开每项现金金额，不把奖项误作自动全费豁免。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "核对日现行页面"
    },
    {
      "label": "李宗德校方：2027/28小一申请须知",
      "url": "https://www.wfjlps.edu.hk/tc/admission.php?id=595",
      "scope": "全文；2027九月入学5岁8个月/2021-12-31前出生、本港居民/未读小/未获派小一。网申2026-06-15午12至07-10午12、75费；半年照/出生居留/最近幼评/适用兄姊手册、才艺最多10页单档。首见09-04/05备11/12、09-16结果；次见及家长09-19备10-03；10-07结果备15；10-09/10注册备16/17。全部已过，未列人数、题型权重或保证候补。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "李宗德校方：2026/27插班状态",
      "url": "https://www.wfjlps.edu.hk/tc/admission.php?id=801",
      "scope": "全文；现明确插班申请期已结束，未来轮次留意官网；没有当前新轮日期/科目/分科时长或人数。不能继续用一般直私校模式推本校全年收表、五月六月固定面试。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；核对日已结束"
    },
    {
      "label": "李宗德校方：2025/26小六升中结果",
      "url": "https://www.wfjlps.edu.hk/tc/admission.php?id=815",
      "scope": "全文与完整名单；校方称40所中学、74%毕业生入直资、95.56%首志愿、98.52%首三、98.5%英中，名单无各校人数。全届/各比例分母、英中定义及独立最终注册未标，不反推135、Band1或成绩因果；有SPCC/圣保罗/协恩等去向，不能说完全无结果。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整四页同一工作流已读；直资小学独立收生、接受直资小一后不能再获派POA官津学位，仅提交申请不等接受；不与私立持位混同。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    },
    {
      "label": "教育局：2025/2027升中办法简介",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/SSPA_2027_leaflet_TC.pdf",
      "scope": "完整四页同一工作流已读；升中网原则按小六就读小学行政区，跨网须申请，不直接按住址。呈分小五下/小六上下；参加派位自行最多两所，非参加派位直资另申，统一按组别/意愿/随机编号；不能说只按学校成绩或住址决定。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/2027升中周期"
    },
    {
      "label": "亲子王国：2023年李宗德与宏信用家讨论",
      "url": "https://www.baby-kingdom.com/forum.php?mod=viewthread&tid=23674979",
      "scope": "web已读2023-06-01原帖1页；alicewtw自称在读赞功课活动及语言，亦忧当时新校长安排；Flyingelephant自称在读赞活动但提醒课堂纪律严；菲比108/29XX86为已毕业家长，提语言/负担与旧体验。Calaci只是朋友传闻，不作亲历。个案有分歧，无人数代表性；直接curl403不等web失败。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2023-06-01；在读及已毕业自述分开"
    }
  ],
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
  ],
  "ycmc": [
    {
      "label": "家校會PSP2026：聖公會阮鄭夢芹小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=375",
      "scope": "已讀完整官方HTML：廣福邨84網、1984、資助男女基督教、中文、校長鄧依萍；2026/27費項20/470/補證25、30班；2025/26教師58含校長、師訓100%、學位97%、碩博39%、SEN84%、教齡10年以上81%；初小平均分班、高小精英及廣教中／普教中；小一0測2考、小二六0測3考，操場2及課程支援。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（教師2025/26）"
    },
    {
      "label": "教育局2027小一自行分配學位：84網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net84.pdf",
      "scope": "完整2026-08名冊，114995廣福邨、自行63；84網19所列校，非約25含特殊校；暫定班級計算基準及小班25備註，不反推全級126或取錄率。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方夢芹歷史原圖",
      "url": "https://www.skhycmcps.edu.hk/uploads/images/%E6%9C%AA%E5%91%BD%E5%90%8D-5%283%29.jpg",
      "scope": "已讀歷史整圖：1984-09-01開課、1985-01-25揭幕；2009上午留廣福邨、下午遷富亨邨與神託會培賢合併成銀禧。阮母鄭夫人夢芹與維楊先生捐校紀念的原文；歷史圖不代表當屆編班或舊生分認定。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方英文科目標與關注事項",
      "url": "https://www.skhycmcps.edu.hk/site/view?name=Objectives--English",
      "scope": "完整英文頁，語文運用、自主及正向學習、豐富語境；沒有NET總人數或每週英文課時，不把目標當成效。PSP另有Space Town讀寫課程。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方2026/27升小二至五插班須知原圖",
      "url": "https://www.skhycmcps.edu.hk/uploads/images/%E6%8F%92%E7%8F%AD%E7%94%9F%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5%28%E7%B6%B2%E4%B8%8A%29_2026-2027%281%29.jpg",
      "scope": "完整原圖：2026-04-14至05-22已過，9–12／13–16；親交或郵寄、報名40、出生／兩學年成績／最多四獎／回郵信封；空缺及綜合發展甄選、個別考試或會見、最遲08-15通知。沒有必考中英數、不得把舊窗口當現在仍收。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2026/27插班申請表",
      "url": "https://www.skhycmcps.edu.hk/uploads/files/2025-2026/%E6%8F%92%E7%8F%AD%E7%94%9F%E7%94%B3%E8%AB%8B%E8%A1%A8_2026-2027.pdf",
      "scope": "完整1頁：升小二至五、學生／家長／兄姊及轉校原因；出生證、成績、獎狀、回郵信封，非港出生需入境居留文件審閱；不自行加推薦信、在讀證明或固定考科。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2025/26畢業生升中資料原圖",
      "url": "https://www.skhycmcps.edu.hk/uploads/images/%E5%8D%87%E4%B8%AD2026.9.2%281%29.jpg",
      "scope": "已視讀整圖：首三志願90%；派往EMI中學及設有英文班中學75%，附各校人數與EMI／英文班註記。未獨立列畢業總數或百分比分母，表列人數不可強作同一分母；75%不是純EMI率或Band1率。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "校方歷屆畢業生喜訊（2024/25）",
      "url": "https://www.skhycmcps.edu.hk/site/view?name=%E5%A4%A2%E8%8A%B9%E7%95%A2%E6%A5%AD%E7%94%9F%E5%96%9C%E8%A8%8A%282024-2025%29",
      "scope": "完整正文為不同屆校友中學成績、大學去向及個別DSE狀元，與當屆小六派位表不同，不用個別校友升大學反推小學整體升中率。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2024/25（歷屆校友）"
    },
    {
      "label": "教育王國2012：阮鄭夢芹小學討論原帖",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2363010",
      "scope": "讀原帖2012-01至03：對學術強度、功課與舊校舍有不同回覆，亦有人區分學術要求與功課多；只能保留歷史議題，不能當2026共識／年資留任證據或多帖調查。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2012（歷史討論）"
    },
    {
      "label": "親子講場2020：大埔小學討論原帖",
      "url": "https://www.babydiscuss.com/t/topic/15631",
      "scope": "已讀2020-04至05完整正文：有富亨邨家庭把銀禧、聖心、循道並列的個人建議，亦有自行估算多校Band1比例的回覆；推算非官方、未回原始年度分母，不能拿46/101或42/130作當屆學校成果；部分只說阮鄭而未分兩校。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020（歷史討論）"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "ycmcj": [
    {
      "label": "家校會PSP2026：聖公會阮鄭夢芹銀禧小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=376",
      "scope": "完整PSP2026官方HTML，修訂2026-10-16：富亨邨84網、2009、校長曾卓龍；2026/27家教30／非標準特定用途470、25班（小三5、其他4）；2025/26教師51含校長、師訓100%、學位98%、碩博34%、SEN58%、10年以上64%；小二三語文／思維、小四六英文／思維、小五起按成績分班；STEAM ROOM未再標發展中、操場2、三層支援及資優課。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（教師2025/26）"
    },
    {
      "label": "教育局2027小一自行分配學位：84網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net84.pdf",
      "scope": "完整2026-08名冊，575844富亨邨第四期、自行50；與廣福邨114995分開；暫定名額不是實際申請、錄取或空缺。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方夢芹歷史原圖",
      "url": "https://www.skhycmcps.edu.hk/uploads/images/%E6%9C%AA%E5%91%BD%E5%90%8D-5%283%29.jpg",
      "scope": "已视读广福邨学校完整历史原图：2009上午校留广福、下午校迁富亨并与神托会培贤合并成银禧。支持两校沿革辨认；不由此推前身旧生计分一律通用或不通用。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "親子講場2020：大埔小學討論原帖",
      "url": "https://www.babydiscuss.com/t/topic/15631",
      "scope": "已讀2020-04至05完整正文：有富亨邨家庭把銀禧、聖心、循道並列的個人建議，亦有自行估算多校Band1比例的回覆；推算非官方、未回原始年度分母，不能拿46/101或42/130作當屆學校成果；部分只說阮鄭而未分兩校。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2020（歷史討論）"
    },
    {
      "label": "校方2027小一入學申請須知",
      "url": "https://www.skhycmcj.edu.hk/zh_tw/site/view?name=%E9%81%9E%E4%BA%A42027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8%E9%A0%88%E7%9F%A5",
      "scope": "完整正文：紙本2026-09-21至25 8:30–12／14–16、電子09-17至25 23:59；575844、身份／近三月地址／在讀及畢業兄姊／父母畢業證；宗教接受父母或兒童其中一方基督教或天主教證明及指定登記教會，不限聖公宗。未提供中港跨境校車。前身校友資格未明，不自行斷言通用或不通用。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方英語校本課程全文",
      "url": "https://www.skhycmcj.edu.hk/zh_tw/site/view?name=Curriculum",
      "scope": "完整課程段落：OWLS校本讀寫、HOT／4C／電子學習、探究及跨科；列EDB資優教育學校網絡、English Wednesday／English Club等。沒有列當屆NET總數或每周課時，頁腳2025不改成2026成效。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方課業政策PDF",
      "url": "https://www.skhycmcj.edu.hk/uploads/files/%E8%AA%B2%E6%A5%AD%E6%94%BF%E7%AD%96.pdf",
      "scope": "完整2頁：每天中英數適量課業、科任協調數量、導修可完成部分、按個別需要調適、教師回饋與家長問卷；未列統一每日份數或時間，不能給精確負擔排名。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方2026/27插班入學申請表",
      "url": "https://www.skhycmcj.edu.hk/uploads/files/%E6%8F%92%E7%8F%AD%E7%94%9F%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8A4_15022027(2).pdf",
      "scope": "完整1頁，正文標2026-2027（內文學校為銀禧，PDF元標題誤作老校）；轉校原因必填、出生證／近期成績／兩回郵信封、非港出生審居留文件；學校專用評核欄有中英數及英／普會話。未列報名費金額、確切截止日或所有人必考四項，檔名15022027不當考試日。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "ycps": [
    {
      "label": "家校會PSP2026：油蔴地天主教小學（海泓道）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=518",
      "scope": "完整PSP2026官方HTML：海泓道10號31網、535796、1968、資助男女天主教、無三類中學關係、中文含普及英文；2026/27家教80／非標準750另雜費、30班；2025/26教師62含校長、師訓92%、學位98%、碩博32%、SEN29%、10年以上65%；小一0測2考、小二六0測3考、平均分班、3操場、STR²EA²M及學習支援。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（教師2025/26）"
    },
    {
      "label": "教育局2027小一自行分配學位：31網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net31.pdf",
      "scope": "完整2026-08名冊，535796海泓道與511021東莞街各自行63，不能說海泓道必較多；31網共10列校，油尖旺另有32網，非全區唯一校網；嘉諾撒聖瑪利與天神及聖瑪利書院屬U3一條龍，非85%直屬。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方2025/26升中概況兩頁原表",
      "url": "https://www.ycps.edu.hk/attachment/upload/files/%E6%9C%80%E6%96%B0%E6%B6%88%E6%81%AF/202608/25-26%20%E6%B4%BE%E4%BD%8D%E7%B0%A1%E5%A0%B1_0714.pdf",
      "scope": "完整兩頁文字並渲染原圖校對，2026-07-14更新：各中學去向長條圖及首三志願99%、其他1%。非多offer表，亦無官方Band1或全英中合計；未明示全屆總分母或各申請渠道。刪未公開年度派位統計舊結論，不能99%當名校率。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "校方2027/28小一入學申請須知",
      "url": "https://www.ycps.edu.hk/tc/content.php?wid=255",
      "scope": "完整PDF1頁：紙本2026-09-21至25、9–12／14–16；身份居留／父母或兄姊本校畢業證／天主教領洗紙（延誤可本堂神父書面證明）／兄姊在讀證／地址／回郵信封；11-23電郵、大堂、網站及平台放榜。未列最低錄取分或111候補規則。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方2026/27小一至小五插班須知",
      "url": "https://www.ycps.edu.hk/tc/content.php?wid=110",
      "scope": "完整PDF：2026-10-16至11-04、平日8–16:30／六9–12親交，郵電傳真逾期不接；75報名、近兩次成績、證明最多5張10頁、居留及領洗證。11-14 8:45報到9:15–11:15中英數筆試（繁體印刷不讀卷），12-01至15電話通知通過者面試；無通知落選。非泛稱4–6月或小二五。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方2026/27插班申請表",
      "url": "https://www.ycps.edu.hk/tc/content.php?wid=111",
      "scope": "完整PDF正文，實際小一至五、家長／學生／地址及本校兄姊舊生關係；與當用須知同屆，不用表格欄位推宗教額外加分或保證面試。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "校方中文科課程及普教中安排",
      "url": "https://www.ycps.edu.hk/tc/content.php?wid=300",
      "scope": "完整正文：一年級下開始普通話教授中文、二至四全普教中、五六全粵教中；小一上調適中普及漢拼，中文自學冊／實用文／寫作校本教材。不是全六年統一普教中，也不是僅開普通話科。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王國2012：新舊油天比較原帖",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2425046",
      "scope": "原帖2012-08至11全文已讀：校舍、上課時段、功課及兩校差異的零散看法；其中上午／下午沿革互相矛盾，不能當官方歷史或2026滿意度。不能回填成2016–2025約20帖或2021–24合成引語。",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28",
      "academicYear": "2012（歷史討論）"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
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
  ],
  "tsbcps": [
    {
      "label": "家校会《小学概览2026》：慈云山圣文德",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=429",
      "scope": "全文及原始HTML；资助全日男女天主教/方济会、1966、7908平方米、宁华街/45，联系圣文德书院。2025/26教师46/编制36、师训学士100/硕博37/SEN85%，教龄8/11/81；17班→2026/27十四班(2/1/2/3/2/4)。两外籍教师，小一双英语老师其一外籍；P5/6各精英及电子学习班、P5一班外籍教英，拔尖人才库及辅导均有。P1零测零考/P2–6零测三考，8:10–15:40。PTA入学后一次100/核准470，免学费非零支出。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度45校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net45.pdf",
      "scope": "完整一页；慈云山圣文德535788与慈云山天主教543268均45网、自行63，校址不同。暂定名额不能倍增作最终126；实际班数按需求批核。名册涵盖慈云山、凤德、钻石山等，不等黄大仙全区，也不是升中网编号。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "慈云山圣文德：官网及实体联络",
      "url": "https://www.tsbcps.edu.hk/",
      "scope": "全文；PSP列HTTP官网，经web实际打开自动解析至HTTPS，再用HTTPS原始请求成功读取，非擅改失败链接。宁华街慈正邨第二期，23206226；2026-09-04小一开放课堂消息及当前升中/入学链接，宗教及成长栏目可作为校园取向材料。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28所见",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "慈云山圣文德：2027自行申请",
      "url": "https://www.tsbcps.edu.hk/tc/小一自行分配學位申請",
      "scope": "原始HTTPS全文；网上2026-09-17至25 23:59/纸本09-21至25、9-12及14-16，11-23结果/11-25至26注册。三个月地址、身份居留及适用兄姊/校友证明；宗教栏明确申请儿童天主教及领洗等证明。兄姊在本小学属必收，非20分；同分交教育局。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "慈云山圣文德：2027统一注册及候补",
      "url": "https://www.tsbcps.edu.hk/tc/202728小一統一派位註冊須知及小一後備生叩門生申請",
      "scope": "原始HTTPS全文；2027-06-10至11注册9-12及14-17，一楼校务处，含38元姓名胶印。候补06-02至11，周一至五9-12/14-17、六9-12，索表填妥亲交；出生/自行存根/统一选择存根/注册证/高班成绩正副本，电话约面及通知成功。没有111必要门槛/指定卷科/权重或名额；不写放榜后两三天通用窗口。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一候补及统一注册",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "慈云山圣文德：P2–6插班申请",
      "url": "https://www.tsbcps.edu.hk/tc/小二至小六插班生申請",
      "scope": "原始HTTPS全文；登记十二月上旬或六月上旬交表，先按年级余位致电确认；出生证明/原校成绩副本及表，校方面试笔试、时间及结果另通知。页面无学年及确日，不能保证当前有位或推具体卷科/比重。表格链接Google Drive未读取，不登记为已核。",
      "sourceType": "school-official",
      "academicYear": "未标学年；核对日所见",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "慈云山圣文德：2024/26升中结果",
      "url": "https://www.tsbcps.edu.hk/tc/升中派位結果202426",
      "scope": "原始HTTPS全文且web复读；校方首三96/首志愿94，全港比较95/84，不要混数字归属。中学名单含圣文德、保一、协和、沙田崇真等，并写及本区其他学校；无人数/毕业及参与分母、不代表Band1或最终注册。",
      "sourceType": "school-official",
      "academicYear": "2024/2026升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "已在第27批读取完整四页；必收／计分、校友与首名互斥、普通自行禁面试笔试、统一按儿童居住地址校网与选择／随机编号；当届申请注册日期，接受直资学位即不能再获派官津学位，私立规则不同。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中办法简介单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/SSPA_2027_leaflet_TC.pdf",
      "scope": "完整四页；呈分用小五下及小六上下，不是小四；自行最多两所参加派位中学，非参加派位直资另行申请；统一校网原则按小六学校行政区，按组别／意愿／随机编号。联系25/直属85分母为扣除留班及自行后余额，组别/乙部首选/跨网限制；自行与统一不是单凭原始校内分数。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    }
  ],
  "tsl": [
    {
      "label": "家校会《小学概览2026》：陈守仁",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=529",
      "scope": "全文及原始HTML；1999直资全日男女、海庭道6号/4000平方米、校网不适用、无三中学关系，校长周智铭/校监吕钧尧。2025/26教师77非54、培训97/学士100/硕博28/SEN68%，教龄32/22/46；30班每级5。20500十期/PTA150；中英数协作分班、P1一测一考/P2–6一测两考，中文粤普、其他英，8–15:25；SEN与非华语支援，非所有学生必精英。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局现行收费证书：陈守仁",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/529796.pdf",
      "scope": "一页全文；学校529796、海庭道6号、P1–6各2050×10=20500，2023-09-01生效。与2026/27概览及校方收费页交叉，不能说2026新批或2027/28已经获批同价。",
      "sourceType": "government",
      "academicYear": "现行证书；2023-09-01生效",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：2026/27学费",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=149",
      "scope": "完整正文；20500分十期2050，不含校服、校车、午膳、书簿及特别兴趣班；每年可能申请调整，不把旧价承诺覆盖下一届。",
      "sourceType": "school-official",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：2026/27减免及奖学金",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=29",
      "scope": "完整正文至各奖项；减免100/60/40，年度申请，九月优先十月结果；AFI不是月均家庭收入，组别46292/89515/99121及三四人全免特例，原文>99122边界有一元缺口须确认、不擅改。合资格活动费全免仍须正常甄选；P1–5全级首五名下一年100/90/80/70/60%，P6首五名各3000，非人人成绩第一即本届自动免。",
      "sourceType": "school-official",
      "academicYear": "2026/27减免组别；奖项现行",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：班级架构及课程",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=49",
      "scope": "完整正文；各级五班、每班最多33，部分科目分组约12–25并双班主任，不等实际每班165学生或全课12人。中国语文粤语及普通话，其他科英文；所有华语/非华语须正规中文及第三语。列各组课时，但不据单科课数推全天语言使用比例。",
      "sourceType": "school-official",
      "academicYear": "现行课表及班制",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：第三语言",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=125",
      "scope": "完整正文；所有学生必修第三语言、每周两节，小一全年体验法日西，小二起选修其中一种；旧稿小三才开始及可有可无选修错误。",
      "sourceType": "school-official",
      "academicYear": "现行课程",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：2027/28小一入学",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=87",
      "scope": "完整正文；网申2026-08-05 10时至08-17午12，100报名/出生证+半年相；09-22邮件首轮安排，10-17/24/25见一日，12-03次轮名单/12-12次轮，2027-01-19录取与备取/一月下旬注册/3–8月衔接。未公布当届申请人数/名额/各轮通过率、试题、权重、家长出席规定；不把旧媒体题库升级。申请须足龄及香港居留要求。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：2026年9月插班",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=89",
      "scope": "完整正文；2026-04-14 10时至05-11 16时网申、六月笔面试、09-01入学，已结束。现2025/26 P1–4者申请下学年P2–5；中英数笔试、数学英文，只邀部分合资格者/电邮短讯，无通知不成功。身份证明居留/半年相/2023–26所有成绩如有、其他证书最多十页，获邀笔试日现金50。不列GS、具体题型、英语权重、面试形式或个位数空缺。",
      "sourceType": "school-official",
      "academicYear": "2026/27上学期插班，已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "陈守仁：2025/26升中结果",
      "url": "https://www.plkctslps.edu.hk/tc/content.php?wid=191",
      "scope": "完整名单更新2026-08-27，共41行含其他4、列数合计128（仅表内合计，非已核全届/参加人数）。例如男拔5/女拔2/SPCC4/德望2/HKUGA8/喇沙2/玛利曼8/圣士提反10/李国宝13；未列英中或Band1比例、自行offer人数、注册口径。不能以表内128作默认分母或把旧98.2%/九成自行当当届。",
      "sourceType": "school-official",
      "academicYear": "2025/26；截至2026-08-27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "已在第27批读取完整四页；必收／计分、校友与首名互斥、普通自行禁面试笔试、统一按儿童居住地址校网与选择／随机编号；当届申请注册日期，接受直资学位即不能再获派官津学位，私立规则不同。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中办法简介单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/SSPA_2027_leaflet_TC.pdf",
      "scope": "完整四页；呈分用小五下及小六上下，不是小四；自行最多两所参加派位中学，非参加派位直资另行申请；统一校网原则按小六学校行政区，按组别／意愿／随机编号。联系25/直属85分母为扣除留班及自行后余额，组别/乙部首选/跨网限制；自行与统一不是单凭原始校内分数。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    }
  ],
  "tswcs": [
    {
      "label": "家校会《小学概览2026》：慈云山天主教",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=442",
      "scope": "web简洁URL失败但HTTPS原始HTML成功、已读全文；教区资助全日男女/2002/蒲岗村道172号/10000平方米/45，无三中学关系。2025/26教师58/编制55，师训91/学士100/硕博33/SEN74%，教龄34/19/47；29班→2026/27二十六班(2/5/4/5/5/5)。P1双班主任、P2/3混合、P4–6各两拔尖班需中英数前列及操行B级或以上。中文粤普、P1零测零考/P2–6一测两考。三层资优、增润、奥数等均有，特色栏非空白；30课室/一礼堂/三操场/一图书馆。PTA60/核准400。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：慈云山圣文德",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=429",
      "scope": "全文及原始HTML；资助全日男女天主教/方济会、1966、7908平方米、宁华街/45，联系圣文德书院。2025/26教师46/编制36、师训学士100/硕博37/SEN85%，教龄8/11/81；17班→2026/27十四班(2/1/2/3/2/4)。两外籍教师，小一双英语老师其一外籍；P5/6各精英及电子学习班、P5一班外籍教英，拔尖人才库及辅导均有。P1零测零考/P2–6零测三考，8:10–15:40。PTA入学后一次100/核准470，免学费非零支出。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度45校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net45.pdf",
      "scope": "完整一页；慈云山圣文德535788与慈云山天主教543268均45网、自行63，校址不同。暂定名额不能倍增作最终126；实际班数按需求批核。名册涵盖慈云山、凤德、钻石山等，不等黄大仙全区，也不是升中网编号。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "慈云山天主教：2026/27插班须知及申请表",
      "url": "https://twscps.edu.hk/download/directLinkFile/35779020c8dd424eaf2d1c19850c1f62.pdf?nnnid=685&v=202605270142",
      "scope": "web实际读取四页PDF全文。升P2–5、操行B或以上、各科合格，06-12截止，06-15前电话邀笔试、06-18 14:15–16:30中英数，06-25前电话邀面试，注册另通知；交B门，所需申请表/身份居留/最近一年成绩/手册首页，后页表格含父母证明/适用领洗。已结束非当前全年收生，无权重/时长分科或名额。",
      "sourceType": "school-official",
      "academicYear": "2026/27；2026年六月轮已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "已在第27批读取完整四页；必收／计分、校友与首名互斥、普通自行禁面试笔试、统一按儿童居住地址校网与选择／随机编号；当届申请注册日期，接受直资学位即不能再获派官津学位，私立规则不同。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中办法简介单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/SSPA_2027_leaflet_TC.pdf",
      "scope": "完整四页；呈分用小五下及小六上下，不是小四；自行最多两所参加派位中学，非参加派位直资另行申请；统一校网原则按小六学校行政区，按组别／意愿／随机编号。联系25/直属85分母为扣除留班及自行后余额，组别/乙部首选/跨网限制；自行与统一不是单凭原始校内分数。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    }
  ],
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
  ],
  "tutor-klt": [
    {
      "label": "家校會KGP2026/27：多多國際幼稚園（九龍塘）",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5425040001",
      "scope": "完整讀取並取原HTML逐欄核對：542504/0001、多實街1號1樓、2001、不參加計劃、非本地、4室容額100；教師2025-09為7含校長、6學位／6幼教證書以上；K1–3上午29、下午7合36，另PN10；師生1:5.6／1:1.4含2–3歲，不算個別關注時間。2027/28申請欄未有提供，另讀校方當屆頁。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師生2025-09",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：多多九龍塘現行收費證明書",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/542504.pdf",
      "scope": "全文2頁：2026-09-01生效、同址542504、K1–3上午13840×12=166080、下午13480×12=161760；非PN／PlayLab／延伸課價，不據此補齊所有服務費用。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：九龍塘Dorset Crescent校本頁",
      "url": "https://www.tutortime.com.hk/locations/dorset-crescent/",
      "scope": "全文讀取：香港首校區、1 Dorset、兩個戶外／兩個室內遊戲場、感官花園、Kideowatch全課室直播、6月齡至6歲PG→K3；沒有小學一條龍保證、不寫24/7開鏡／所有其他校都無同類場地。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：Our Approach課程說明",
      "url": "https://www.tutortime.com.hk/our-approach/",
      "scope": "全文讀取：英普各半沉浸、按語言時段包括遊戲用目標語言；個人化小組與Cycle of Intentional Planning；Emomo／Second Step及Positive Behavioral Support。文內示例明示改名，不冒充獨立家長案例。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：K1–K3課程與升小支援",
      "url": "https://www.tutortime.com.hk/our-programs/kindergarten/",
      "scope": "全文讀取：3–6歲、上午9–12／下午13:30–16:30；LifeSmart混合蒙氏／華德福／多元智能，10發展尺度含中文認字讀寫、數學；公開面試準備／模擬與一對一升小諮詢。品牌頁1:8、4角色與全日說法不覆蓋KGP九龍塘註冊統計，當校另核。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用課程",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：School Placement升小統計",
      "url": "https://www.tutortime.com.hk/about-us/school-placement/",
      "scope": "全文讀取：Primary School Enrollment Statistics 2024–2026整體圖78%國際、17.1%私立直資、4.9%本地官津，未列總人數／逐年／各校區拆分；同頁九龍塘段80%獲多個offer，無該段年度或人數分母，不能當入讀率／英小率。原頁部分學校分類需另核，不照抄為法定分類。",
      "sourceType": "school-official",
      "academicYear": "品牌統計2024–2026；九龍塘offer段無獨立年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：2027/28新生申請原文",
      "url": "https://www.tutortime.com.hk/admission/2027-2028-nursery-kindergarten-application-new-students/",
      "scope": "全文讀取：申請及付款→親身觀察30–60分鐘一對一→2–5工作天決定；無傳統正式面試、家長毋須專門準備；滾動入學，稱NSY/KG通常90%由現有學生組成、10%外部，這是組成不是PG升班率／90%錄取率。支援能力按個案決定。",
      "sourceType": "school-official",
      "academicYear": "2027/28 NSY/KG",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：Admission一般申請與現有生安排",
      "url": "https://www.tutortime.com.hk/admission/",
      "scope": "全文讀取：在讀生翌年學位及優先enrolment說明；Playgroup全年視空缺；NSY–K3約見／觀察按個案發offer、無位候補。優先不等於升小保送，具體續讀仍須當屆註冊。",
      "sourceType": "school-official",
      "academicYear": "2026/27及2027/28入口",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：FAQ語言／收生／教師角色",
      "url": "https://www.tutortime.com.hk/about-us/faq/",
      "scope": "全文讀取：半日英普各1.5小時、教師角色、PG／PN內部優先、先到先得一般說法；FAQ另有過去五年75%去國際及明顯疫情段落，故不當2024–2026統計或當屆防疫要求；師資全學位宣傳不取代KGP6/7數據。",
      "sourceType": "school-official",
      "academicYear": "未標年度FAQ；限定使用當用課程／優先說明",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "多多：Extended Program九龍塘可選",
      "url": "https://www.tutortime.com.hk/our-programs/extended-program/",
      "scope": "全文讀取：3–6歲可選全部或部分下午支援／興趣／升小面試準備，列Dorset、Braemar、YOHO；不能把KGP無註冊全日班寫成完全沒有下午延伸選擇，亦不反向證明延伸等於全日班或費用已含。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "twghscws": [
    {
      "label": "家校會PSP2026：東華三院蔡榮星小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=541",
      "scope": "完整讀取：2018／2023-01遷水泉澳、91網、中英、資助、無中學關係、31班（2026/27小一6班）；2025/26教師65、師訓91%、碩博22%、10年25%。小一測驗／考試0/0、小二至六0/2，平均分班但五六中英按語文分組；費用／保姆車／特色體驗及正向支援。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "蔡榮星：英語科課程",
      "url": "https://www.twghtwsps.edu.hk/tc/subject/english",
      "scope": "全文讀取：聽說表達、phonic／閱讀、Big Writing及作品編修；每位小一學生首年最少6節Expert in Class戲劇課。未列NET數／英語總課時／全英學科比例，不把中英文欄當雙語50/50。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "蔡榮星：2025/26第五屆升中結果",
      "url": "https://www.twghtwsps.edu.hk/tc/latest_new/2025-2026-secondary-school-placement-allocation-results",
      "scope": "完整讀取2026-07-07：明寫第五屆、99%首三志願；分類列直資／英中／設英語班中學，未列各校人數／畢業總數，不能當99%英中或Band1率。可據第五屆撤銷首屆約2024的錯誤推論。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026升中",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "蔡榮星：2027/28小一自行原PDF",
      "url": "https://www.twghtwsps.edu.hk/sites/default/files/files/shen_qing_2027-28nian_du_xiao_yi_zi_xing_fen_pei_xue_wei_an_pai_web.pdf",
      "scope": "全文讀取：紙本2026-09-21至25、9–12／14–16，電子09-17至25 23:59、11-23放榜；身份／三月內住址／在讀及畢業兄姊證明。新校亦可用兄姊畢業關係，不因非官方世襲分0否定制度。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "蔡榮星：2026/27插班四階段原表",
      "url": "https://www.twghtwsps.edu.hk/sites/default/files/files/1_shen_qing_2026-2027_nian_du_cha_ban_sheng_shi_jian_biao_092026_0.pdf",
      "scope": "全文提取並目視原圖09.2026：第一階段小一五2026-11入學、10-09截止；第二小一五2027-01入學、11-02至11-30收；第三小一四2027-04入學、01-11至02-19收；第四升小二五2027-09入學、03-01至05-31收。逐輪甄選／筆試／面試／通知，不保證有空位。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班；延至2027/28九月入學",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "蔡榮星：2026/27插班須知原PDF",
      "url": "https://www.twghtwsps.edu.hk/sites/default/files/files/2_shen_qing_2026-2027_nian_du_cha_ban_sheng_xu_zhi_092026_0.pdf",
      "scope": "完整中英2頁09.2026：6–12歲居留資格、按實歲考卷；親交週一五8:30–16、最近兩次成績及各學期操行B以上、身份家長文件；評估／兩次專項證明自願；有位且成績操行合標才通知筆試，無通知作落選，不接受逾期。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "蔡榮星：2026/27插班申請表原PDF",
      "url": "https://www.twghtwsps.edu.hk/sites/default/files/files/3_2026-2027_twsps_cha_ban_sheng_ru_xue_shen_qing_biao_092026_0.pdf",
      "scope": "全文讀取2頁：正文明蔡榮星（檔案屬性舊名水泉澳不混另一校）；表格／報名免費、兩次成績／近照／身份、家長聯絡及在讀或畢業兄姊欄。未列中英數必考，不自行補題型或分數線。",
      "sourceType": "school-official",
      "academicYear": "09.2026版本",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一91網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net91.pdf",
      "scope": "完整1頁8/2026：610160蔡榮星自行63、校址博泉19；學額按暫定開班基準，不能反推實際125/126入讀、以63或校網數算命中率。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "twgps": [
    {
      "label": "家校會PSP2026：荃灣官立小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=398",
      "scope": "完整讀取：62網、青山公路600、1961、30班5班各級、中文、校車、荃官／何文田官立聯繫；教師2025/26含校長57、師訓100%、學士91%、碩博35%、10年87%；2026/27家教70／非標準300、評估0/2及0/3、分班與課程支援。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "荃官：2025/26升中去向原PDF",
      "url": "https://www.twgps.edu.hk/attachment/upload/files/%E5%AD%B8%E6%A0%A1%E6%A6%82%E8%A6%BD/%E5%8D%87%E4%B8%AD%E8%B3%87%E8%A8%8A/%E5%AD%B8%E7%94%9F%E5%8D%87%E4%B8%AD%E6%83%85%E6%B3%812025-2026_(Revised%20on%2013-7-2026).pdf",
      "scope": "全文讀取1頁、修訂2026-07-13：小六總150，各校列人數合計150；荃官34、何傳耀18、李城璧15、林百欣12、何文田1、SPCC1、DBS1、DGS1等。34/150約22.7%僅校方該中學去向比例，不是聯繫渠道錄取率；不自行標Band1總比例。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026升中",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "荃官：2027小一自行申請原PDF",
      "url": "https://www.twgps.edu.hk/attachment/upload/files/2027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E9%81%9E%E4%BA%A4%E7%94%B3%E8%AB%8B%E8%A1%A8%E9%A0%88%E7%9F%A5.pdf",
      "scope": "完整2頁：2026-09-17至25電子、21至25紙本；身份／住址及在讀／舊生文件、1999前海壩街官立下午舊生、遺失畢業證預5工作天。甲類必收、乙類計分、同分EDB抽籤，先交不影響。列自行申請本校且統一首選者於2027-05候補優先，未細分甲乙或列必須1-1-1，不擴成硬門檻。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "荃官：2027小一自行公告",
      "url": "https://www.twgps.edu.hk/tc/news-details.php?cid=1&id=737",
      "scope": "全文讀取2026-09-09：自行紙本9–12／14–16、電子09-17 8時至25 23:59；11-23校方9時／電子10時結果，11-25至26註冊；連回已讀PDF與附件。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "荃官：入學資訊與2026候補窗口",
      "url": "https://www.twgps.edu.hk/tc/content.php?wid=16",
      "scope": "全文讀取：2026/27小二五插班04-27至05-27、小一候補05-28至06-05，均已過；不能移到2027或寫放榜後兩三天。所鏈id698現只剩頁框，未把它當已讀材料清單或面試細則。",
      "sourceType": "school-official",
      "academicYear": "2026/27入學歷史輪次",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "荃官：評估與編班政策",
      "url": "https://www.twgps.edu.hk/tc/content.php?wid=33",
      "scope": "全文讀取：進展評估不計成績表；三學段小一首段不總結評估、二三各一次，小二六每段一次；呈分時點及2026/27小五下人文／科學／體育加入。網頁編班一二混合、三五按成績、六按小五原班；與PSP三六按成績概述並列，不假裝已讀加密新通告。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用政策頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "荃官：家課政策",
      "url": "https://www.twgps.edu.hk/tc/content.php?wid=32",
      "scope": "全文讀取：家課種類／中英文默書家長簽名、未完成可補做或另加輔助、教師回饋及各科作業；無每日份數或必須補習時數，不能從活動總冠軍推斷人人校隊廣參與。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用政策頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一62網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net62.pdf",
      "scope": "完整1頁8/2026：528773荃灣官立自行63、青山600；與510513海壩街官立（啟志街1）分開實體，不把歷史下午校與現海壩街混為同校。暫定學額不等於入讀人數。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "veo-bcy": [
    {
      "label": "教育局《幼稚园概览2026/27》：维多利亚宝翠园",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5421640001",
      "scope": "全文及原HTML单元格复核；5421640001、2001、私立独立不参加计划，周慧生／何绮玲，8课室/使用容额300、无户外有室内音乐等。2025-09校长教学25、学位25、幼教证以上20、其他师训2/其他3；AM1:6.7/PM1:5.9含2–3岁。K1 55/24、K2 47/41、K3 24/52共243，PN另71，全日0，均非招生额或当前空缺；PN139579为历史服务费。观察档案/家校/学习支援归因校方。",
      "academicYear": "2026/27；师资学生2025-09",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局宝翠园收费证明书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/542164.pdf",
      "scope": "完整2页；K1每期12100×11=133100自2026-08-01，K2 11874×10=118740、K3半日12097×10=120970、全日22654×10=226540及餐1301×10=13010自9/1。核准全日收费不能证明当届实际开班。",
      "academicYear": "2026/27；8月及9月生效",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO2026/27全年学费表",
      "url": "https://www.victoria.edu.hk/zh-hk/tution/",
      "scope": "完整表；宝翠PN两岁以上145156/11、K1 133100/11、K2 118740/10、K3 120970/10，全日“-”；海峰143495/130450/132900，君汇港118327/107930/111940、海之恋117370/106390/109360。宝翠不是集团最高K1费；PN不套K1；当前费用证全日栏与网页未列开班分清。",
      "academicYear": "2026/27",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO宝翠校舍介绍",
      "url": "https://www.victoria.edu.hk/belcher-campus/",
      "scope": "全文；2001、中西区、PN above2、IB PYP K1–3、三语英普粤/双语英普；LovanHo及SharonLui、LeeNewton、CarmenFong，地址电话25427001、HKU B2约5min为校方参考。校车六区按人数及站点调整，不证明住附近录取加分。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO课程班制及活动时间表",
      "url": "https://www.victoria.edu.hk/programme-class-schedule/",
      "scope": "全文；宝翠三语PNAMPM、K1AM/K2AM/K3PM，另K1–3PM英普双语。PN–K2上午8:45–11:45/下午13–16、K3周一至四13–16:30及五至16；班制可变。海峰有under2PN、君汇港海之恋above2。未列全日，不能从费用证推开班。",
      "academicYear": "2026/27",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO FAQ",
      "url": "https://www.victoria.edu.hk/faq/",
      "scope": "全文；三语英粤普教师等份、双语英普各半，平均1:7–9为集团口径不能替分校KGP；同框架但主题/活动/社区与PTA不同；观察与较大儿童正式评估。最多6志愿首选面试，非先到先得，海外另视频，2027/28出生区间与报名；未给分校成功率。",
      "academicYear": "2027/28申请及当前课程",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO集团历史",
      "url": "https://www.victoria.edu.hk/history/",
      "scope": "全文；三语班3位专业母语老师、one-teacher-one-language，PYP及MCL等集团历史。不能据三位老师或平均比率推每班实际人数/固定个别关注，也不把集团创办1965作宝翠创校。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO语文课程",
      "url": "https://www.victoria.edu.hk/nursery-kindergarten/language-literacy-programme/",
      "scope": "全文；聆听、表达、阅读写作与分享、真实生活沟通。只支持课程安排，不保证孩子输出三语均衡，不推较其他学校时数多。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO2027/28申请程序及滚动申请",
      "url": "https://www.victoria.edu.hk/application-procedure/",
      "scope": "全文；K1 2026/9/7–10/26、PN9/14–12/14、各首轮次轮结果与KeyDates交叉；表1份最多6偏好首选面试、40报名、身份照片适用家人曾读证明、1–2成人入校园仅1入课室。现PN无需重申K1；兄姊在读/曾读免次轮不保录。K1获录970注册、2027/3中再首期，PN首期；非计划不套统一注册。滚动有位才联系，无位不通知，不虚构空缺数或求位频率。",
      "academicYear": "2027/28新生、2026/27滚动",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO Key Dates",
      "url": "https://www.victoria.edu.hk/key-dates/",
      "scope": "全文时间表；K1首轮2026/11/7，次轮11/17–26不含周末、12/4结果；PN2027/1/8或9、次轮1/18–29不含周末及1/25，3/5结果。2027/28K2–3自2026/9/7起，2026/27PN–K3全年滚动。纠正申请页残留AY2026/27标题不改变正文年份。",
      "academicYear": "2027/28及2026/27滚动",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO Student Roadmap",
      "url": "https://www.victoria.edu.hk/student-roadmap/",
      "scope": "全文；2027/28PN→2028/29同校K1自动续读，不等VSA小学直升；K2增加家庭学习材料、K3有小学面试与过渡准备，因此不支持旧文“完全不做升小准备/家长必须外补”。互动多分支按适用年级，不混时间线。",
      "academicYear": "2027/28及后续路径",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO四年小学获录结果",
      "url": "https://www.victoria.edu.hk/school-placement/",
      "scope": "全文及各表；2022/23–2025/26集团四年，692完成K3并获VSAoffer；私立苏浙76/SSCPS69/ICQM65，直资DBSPD22/SPCC19等，弘立36/SIS20。无宝翠独立分母或单届数据，不是最终注册；不能排分校成功率或把集团获录数套单校。",
      "academicYear": "2022/23–2025/26集团四年",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VSA招生准则及Year1程序",
      "url": "https://www.vsa.edu.hk/admissions/how-to-apply",
      "scope": "全文；同等条件feeder/兄姊等可考虑优先、Year1维多利亚幼稚园及债券优先，仍儿童及家长面试；Y1/2至少中英一项强。新入VEO K3申请翌年Y1只空位时通知；70%永久居民是VSA制度不套宝翠成功率。含2000报名等，仅使用适用主张。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VSA当届申请时间",
      "url": "https://www.vsa.edu.hk/admissions/how-to-apply/key-dates",
      "scope": "全文；2027/28Year1closed，2028/29Year1至2027-02-16；Y2–11不同。幼稚园K1不能机械等到K2晚期再看小学，按目标入学年核。",
      "academicYear": "2027/28及2028/29",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO君汇港校舍（比较）",
      "url": "https://www.victoria.edu.hk/campus/harbour-green-campus/",
      "scope": "全文；奥运、2008、above2PN、K1–3IBPYP、三语；深旺道8号，交通与活动场景参考，校车按需求。没有独立升小率，不推比宝翠容易。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO海之恋校舍（比较）",
      "url": "https://www.victoria.edu.hk/campus/ocean-pride-campus/",
      "scope": "全文；荃湾西2022、above2PN、K1–3IBPYP三语，海之恋商场100大河道地面、校车按需求，课程框架相同不等日常活动完全一样。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "VEO海峰园校舍（比较）",
      "url": "https://www.victoria.edu.hk/campus/harbour-heights-campus/",
      "scope": "全文；北角2005、under2及above2PN、K1–3IBPYP三语，5福荫道，与宝翠双语选择及PN年龄不同；没有分校胜算、独立升小率，不把历史口碑排第一。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国海峰园或宝翠园讨论",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3861557",
      "scope": "全文；2021–2022自称宝翠用家说规模小/上午满可能下午，另有认为小校未必易入；有人说学校多年汇总难比较，VSA比例高是转述。SU及旧3志愿不是当届规定，不能造20+样本或2026满意度。",
      "academicYear": "2021–2022历史评论",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国三校舍选择历史帖",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2322035",
      "scope": "全文；2011ftcl明确自述宝翠K1孩子开心、老师周六电话汇报、就近省路；其他分校/转述不混用。年代久，非当前每周电话承诺或教师统一评价。",
      "academicYear": "2011历史评论",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页已在前批读取；官津小一正常自行与统一制度、甲乙部居所边界，幼稚园地址不授予其所在小一校网；不从集团官津录取推幼稚园保送。",
      "academicYear": "2027小一；2026年8月版",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    }
  ],
  "ssgc": [
    {
      "label": "教育局《幼稚园概览2026/27》：圣士提反女幼",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=1328960001",
      "scope": "全文及原始HTML；学校132896/校址0001，非牟利、男女、1906、柏道33号，校长郑俨娥/校监管浩鸣；2025年9月教学人员15、学位14、幼教证书或以上15、AM/PM均1:6；在读K1上午30/下午30，K2上午60，K3下午60，总容额180/3课室。没有PN、全日班或延长服务。2025/26用品价格与2026/27报名40/注册970分开，时段比例不能推一对一分钟。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；师资在读为2025年9月"
    },
    {
      "label": "教育局现行收费证明书：圣士提反女幼",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/132896.pdf",
      "scope": "两页全文，校名校址相符；扣减政府资助后AM K1/K2及PM K1/K3免费，十期，列2018-09-01生效。不能把证书旧生效日写成2026新批，也不能把免费推成校服、用品全包。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "现行证书；2018-09-01生效"
    },
    {
      "label": "校方：2027/28幼稚园入学申请须知",
      "url": "https://ssgckg.edu.hk/wp-content/uploads/2026/08/二零二七年度幼稚園入學申請須知.pdf",
      "scope": "全文三页，第二、三页另下载渲染目读。K1招60/总容额180，K2/K3按空缺；中文为主，各级英普活动。2026-10-01至15只网申，K1/2/3分别2024/23/22出生，40报名；10-27前通知，K1见11-05/06/07、K2/3十一月中；一名家庭成员陪同小组粤语，合资格网申均获面见，翻译可查询。姊在附小优先、其余参考所列小一互斥计分，仍按面见取录；附小按教育局小一机制，未必全升。K1结果12-04至11、K2/3为12-11，2027-01-07至09注册/970；候补名单写不存在的9月31日，须确认不传播为有效日。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28；2026-09-01署日"
    },
    {
      "label": "校方：招生入口及当届申请日期",
      "url": "https://ssgckg.edu.hk/admissions/",
      "scope": "全文；页首2027/28申请为2026-10-01至15，上午K1/K2、下午K1/K3；下方流程图仍夹2022/23与2023注册日期，不能据页标题把旧流程当当届，具体面见结果以当届PDF交叉。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "页首2027/28；下方旧流程混年须排除"
    },
    {
      "label": "校方：课程、儿童支援与家校合作",
      "url": "https://ssgckg.edu.hk/objectives/",
      "scope": "全文；主题艺术教育、观察作品及总结评估、新生适应、小一模拟/附小参观、中学生跨级共读、非华语中文支援及家校联络；未列母语教师人数、每日英普课时或K1不执笔的明确承诺。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "现行页面；含2024/25活动"
    },
    {
      "label": "教育局：2023质素评核报告",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StStephenGirls.pdf",
      "scope": "全文；评核2023-01-09/10/12并通过，肯定儿童投入、自理互助与价值教育；同时要求修正高班衔接语数部分过深课业、调整自选活动编排。历史观察，不当2026现况保证，不能只取正面段落。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2023年1月评核"
    },
    {
      "label": "家校会《小学概览2026》：附属小学身份与关系",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=11",
      "scope": "全文；附小为柏道33号资助全日女校、11小一网；直属圣士提反女子中学，无一条龙／联系栏位；中小幼定期交流不等幼稚园保证录取。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27"
    },
    {
      "label": "附属小学：2027/28自行申请须知",
      "url": "https://www.ssgps.edu.hk/page/670/",
      "scope": "全文；纸本2026-09-21至25/9-12及14-16、电子09-17至25、11-23结果；宗教分仅接受圣公会教会领洗纸，外文需有效中英翻译。没有支持只接受本幼候补或幼稚园生全数升读的规定。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28；2026-09-08"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整四页；必收与计分类别、五选一／二选一互斥、普通自行不可面试笔试、统一派位按住址校网／选择／随机编号，宗教及校友分不适用统一阶段；当届日期、注册及直资与私立的不同处理。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局：2025/2027升中常见问题",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "完整FAQ；联系25%／直属85%以扣除留班及自行学额后的余额为分母；一般Net Band1/2、乙部首选，超额按组别及随机编号，获准跨网失去保留资格。私立与非参加派位直资不能混写，后者须签承诺及交学生资料表。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/2027升中周期，2026年9月"
    }
  ],
  "stgps": [
    {
      "label": "家校会《小学概览2026》：沙田官立小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=294",
      "scope": "全文；现址新田围邨/88小一网/7511平方米、1981、中文、男女官立全日，校长曾国伟/主席叶秀媚，联系沙官及梁文燕。2025/26编制53/总教师55、师训100/学士96/硕博46/SEN48%，教龄4/18/78。两年29班：2025/26P4四班、2026/27P5四班，其余五班；P1全年免测考默书、P2–6一测两考；P1–3混合/P4–6成绩较高A/B，其余CDE文字与P5四班有口径边界。PTA70/核准280，8–15时、9节35分钟；三层支援、资优、STEAM精神健康计划。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；教师2025/26；2026-09-08修订"
    },
    {
      "label": "沙官小：现行入学申请页",
      "url": "https://www.stgps.edu.hk/tc/content.php?wid=441",
      "scope": "全文及原始HTML；明确本年度各级学位已满、暂不接受插班；无具体发布日期，不能保证永久暂停，也没有当前科目/空缺/材料清单。内嵌当届P1图另直接读取。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026-10-28所见，未标发布日期"
    },
    {
      "label": "沙官小：2027小一日程原图",
      "url": "https://www.stgps.edu.hk/attachment/upload/files/news/%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8.jpg",
      "scope": "实际下载视觉读取全图；网上09-17至25、纸本09-21至25、2026-11-23结果及11-25至26注册，2027-01-18至24/01-23至24统一选择，06-02至03结果/06-10至11注册。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    },
    {
      "label": "沙官小：升中资讯页",
      "url": "https://www.stgps.edu.hk/tc/content.php?wid=442",
      "scope": "全文与原始HTML，内含2026升中结果原图及2026/27行事历；网页纯文本本身无比例，不能据无文字便断言校方未公布结果。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26结果及2026/27升中资讯"
    },
    {
      "label": "沙官小：2026年7月升中派位概况原图",
      "url": "https://www.stgps.edu.hk/attachment/upload/files/news/%E5%8D%87%E4%B8%ADPOSTER.jpg",
      "scope": "实际下载并视觉读整图；第一91.2/首三98.4/首四100/英中77.4%，英中指以英语为主要授课语言。名单列沙官33、沙崇15、沙培英8、曾肇添5等，没有全届/参与总人数，不能反推分母、等同Band1或替校方保证最终注册。原图用入读字样，但无另列注册核验方法。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026年7月"
    },
    {
      "label": "教育局：2027年度88校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net88.pdf",
      "scope": "完整一页；88列大围范围，沙官小510602自行63，地址新田围；暂定班数/最终获准视需要及小班教学备注，不将63翻倍当最终126。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一；2026年8月"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整四页；必收与计分类别、五选一／二选一互斥、普通自行不可面试笔试、统一派位按住址校网／选择／随机编号，宗教及校友分不适用统一阶段；当届日期、注册及直资与私立的不同处理。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局：2025/2027升中常见问题",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "完整FAQ；联系25%／直属85%以扣除留班及自行学额后的余额为分母；一般Net Band1/2、乙部首选，超额按组别及随机编号，获准跨网失去保留资格。私立与非参加派位直资不能混写，后者须签承诺及交学生资料表。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/2027升中周期，2026年9月"
    }
  ],
  "sts": [
    {
      "label": "家校会《小学概览2026》：圣安当小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=140",
      "scope": "全文；油塘道1号/48、资助男女全日天主教、1959、7760平方米，校监李美群/校长李伟锋，无三类中学关系；2025/26编制55/总教师58，师训97/学士100/硕博38/SEN26%，教龄10/12/78，均30班各级5。每级每周至少一节NET，小一普通话拼音/P2–6中文用普通话，P4–6每级两高能力班/其余平均，列资优增润拔尖推中补底。P1–6零测三考，小一上进展评估。PTA30/每学期核准120。2024/25升中只写理想、不列旧2023/24首三95。",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27；教师2025/26；2026-09-01修订"
    },
    {
      "label": "圣安当：2027/28自行申请程序原件",
      "url": "https://www.saps.edu.hk/CustomPage/55/2728自行分配學位階段_申請程序簡介.pdf",
      "scope": "完整两页；PDF元标题残留2017但页内2027/28。纸本2026-09-21至25/9-12及14-16，电子09-17至25 23:59、11-23结果、11-25/26注册；宗教天主教领洗纸；旧生明确本校下午校或全日制父母/兄姊，身份及居留/地址/相关亲属文件。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    },
    {
      "label": "圣安当：2027小一入学行事历",
      "url": "https://www.saps.edu.hk/CustomPage/paragraphGroup.aspx?webPageId=55&pageId=444",
      "scope": "全文；当届自行、11-27备取注册，2027-01-18至24电子/01-23至24中心统一选择，06-02电子结果、06-02至03邮递短讯、06-10至11注册。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一"
    },
    {
      "label": "圣安当：2026/27小一候补须知",
      "url": "https://www.saps.edu.hk/CustomPage/55/2627小一候補生申請須知_0607.pdf",
      "scope": "全文；PDF元标题旧年但内容2026/27，已截止。网上06-03 9时至06-07 23:59，亲交06-03至05/9-16、06-06/9-12二楼校务处；注册证/自行表/统一选择/身份/适用领洗/报告奖项/相片。所有申请学生均面见，06-10前电邮、06-12下午或13上午；英语粤语、数学概念、沟通自理常识；07-03前电话录取，不录不另通知；没有111门槛或固定候补数，非2027新公告。",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27小一候补，已结束"
    },
    {
      "label": "教育局：2027年度48校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net48.pdf",
      "scope": "完整两页；圣安当513962自行63，油塘道1号，暂定学额不能倍增作最终总额。小学48网不等于升中校网，不代表所有家庭有宗教分。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28小一；2026年8月"
    },
    {
      "label": "教育局：2027小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整四页；必收与计分类别、五选一／二选一互斥、普通自行不可面试笔试、统一派位按住址校网／选择／随机编号，宗教及校友分不适用统一阶段；当届日期、注册及直资与私立的不同处理。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局：2025/2027升中常见问题",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "完整FAQ；联系25%／直属85%以扣除留班及自行学额后的余额为分母；一般Net Band1/2、乙部首选，超额按组别及随机编号，获准跨网失去保留资格。私立与非参加派位直资不能混写，后者须签承诺及交学生资料表。",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/2027升中周期，2026年9月"
    }
  ],
  "stts": [
    {
      "label": "家校会《小学概览2026》：沙田崇真学校",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=322",
      "scope": "1975、91网、联系马鞍山崇真；2026/27收费PTA20/核准300及25班；2025/26教师53含校长、评估分班、中文语言选择及支援",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（教师统计2025/26）"
    },
    {
      "label": "校方：首页",
      "url": "https://www.stts.edu.hk/",
      "scope": "首页校训经文及2026年7月希声杯辩论冠军等实际活动入口；不由校队成绩推全体学生能力",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026网页消息"
    },
    {
      "label": "校方：2025/26基督少年军暑期活动",
      "url": "https://stts.edu.hk/tc/latest_new/2025-26基督少年軍暑期活動",
      "scope": "2026-09-14介绍282分队成立16年、成员90、周六10至11:30全年集会与毕业小导师；未列全校参与分母",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26活动（2026年9月发布）"
    },
    {
      "label": "校方：2027/28自行分配学位",
      "url": "https://www.stts.edu.hk/tc/自行分配學位",
      "scope": "9月电子/纸本窗口、11/23结果，学生/家长身份住址及旧生证明；明确接受儿童或父母相同宗教证明",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方：2025/26中学学位分配结果",
      "url": "https://www.stts.edu.hk/sites/default/files/files/sheng_zhong_shu_ju_2526_1.pdf",
      "scope": "首志愿89.83%、首三97.46%及多元学校名单，无人数分母或逐校人数；不算Band1率、个人取录率或联系位使用率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "校方：2027/28小一后补学位",
      "url": "https://www.stts.edu.hk/tc/小一後補學位",
      "scope": "2027年6/2至5申请、6/15下午儿童面试及家长面谈，家长须出席；详细办法预告5月下旬",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方链接：新生入学申请表2526",
      "url": "https://drive.google.com/file/d/1UlwDPimrP5QU7va2Rffa50DezaapMcN7/view?usp=sharing",
      "scope": "全文提取可读申请年级、原校、希望转校日期、照片及家长身份证副本、交回校务处并带正本核对；部分字段提取缺失；文件名2526，不作2026/27即时空缺依据",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "文件名2526，未标当前适用轮次"
    },
    {
      "label": "教育局：2027自行分配阶段91网名册",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net91.pdf",
      "scope": "本校自行50及暂定班数脚注；自行学额不当实际入读人数或最终总额",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28（2026年8月版）"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "甲类必收、旧生与首名不能叠加、宗教与主办社团择一；自行不受校网限制、统一随机及2027注册日",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局：2025/2027升中FAQ（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "联系25%与直属85%以扣除自行/重读后余额为分母；学校网组别、乙部首选、超额随机及跨网资格",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局：2027自行分配阶段88网名册（比较）",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net88.pdf",
      "scope": "沙田官立小学在新田围邨、88网，配额63；与沙崇91网分开，不用于核实该校其他课程及关系",
      "sourceType": "government",
      "academicYear": "2027/28（2026年8月版）",
      "checkedOn": "2026-10-28"
    }
  ],
  "sylgps": [
    {
      "label": "家校会《小学概览2026》：南元朗官立小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=505",
      "scope": "73网榄口村路21号、三所联系中学；2026/27PTA20/校本管理300及30班；2025/26教师55含校长/硕博39/十年86；分班、评估及支援",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（教师统计2025/26）"
    },
    {
      "label": "校方：学校简介与历史",
      "url": "https://www.sylgps.edu.hk/dev/sylgps/學校簡介",
      "scope": "1904校史、1966分上午下午、2008/09由坳头迁现址并改名；学校历史不等于现校舍楼龄",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "校史及现行介绍"
    },
    {
      "label": "校方：英文科",
      "url": "https://www.sylgps.edu.hk/dev/sylgps/英文科-0",
      "scope": "PLP-RW、任务学习、P4至6电子学习、语文竞赛活动；2026/27教师表可读栏无具体NET人数，不推师资效果",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "页面含2026/27"
    },
    {
      "label": "校方：评估制度",
      "url": "https://www.sylgps.edu.hk/dev/sylgps/評估制度",
      "scope": "当前全文P1一测一考、P2至4一测两考、P5一测一考及呈分一、P6呈分二三与毕业试；与旧网页缓存区分",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "当前页面未注明学年"
    },
    {
      "label": "校方：2027小一自行须知PDF",
      "url": "https://www.sylgps.edu.hk/dev/sylgps/sites/default/files/files/shen_qing_2027nian_xiao_yi_zi_xing_fen_pei_xue_wei_xu_zhi_.pdf",
      "scope": "当届申请/公布/注册、同分中央抽签、住址文件；明确原元朗官立上午小学旧生适用、遗失证书查册及两工作天预留",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "校方：2026/27一至五年级插班须知及表格",
      "url": "https://www.sylgps.edu.hk/dev/sylgps/sites/default/files/files/shen_qing_2026-27nian_du_yi_zhi_wu_nian_ji_cha_ban_xu_zhi_ji_biao_ge_a.pdf",
      "scope": "全年亲递、不接邮电；文件、中英数笔试及面试、空缺月下旬电邮邀请、通常一周电话结果；下一学年2027-05-03至06-04窗口",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（另预告2027/28申请）"
    },
    {
      "label": "校方：2025/26中一派位结果",
      "url": "https://www.sylgps.edu.hk/dev/sylgps/latest_new/中一派位結果",
      "scope": "2026-07-07原件毕业131、首志愿114、首三120及部分学校名单，无逐校或分途径人数，不算Band1率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26"
    },
    {
      "label": "教育局：2027自行分配阶段73网名册",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net73.pdf",
      "scope": "本校自行63及比较学校配额、暂定班数脚注；不翻倍为126或推抽签机会",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28（2026年8月版）"
    },
    {
      "label": "教育局：2027自行分配阶段74网名册（比较）",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net74.pdf",
      "scope": "坳头元朗官立小学属74网、配额63，与本校73网区分；不据此核对该校其他最新课程/关系",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28（2026年8月版）"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "官立同适用旧生10与适龄10=20、不能再叠首名5；自行无校网限制及统一/注册日程",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    },
    {
      "label": "教育局：2025/2027升中FAQ（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "联系25%为中学扣除后余额而非毕业生；第一/二学校网组别、乙部首选与随机、跨网；小一校网不能当升中校网",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    }
  ],
  "think": [
    {
      "label": "家校会《幼稚园概览2026/27》：朗思丽港城",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=2162670001",
      "scope": "主实体蓝田216267/0001，1994、私立独立未参加计划；2025年9月教师12（学位9）、上午1:9.3/下午1:1.3、已使用容量210；2027/28全年申请。学生表标签不完整不编总数",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（师资容量2025年9月）"
    },
    {
      "label": "家校会《幼稚园概览2026/27》：朗思马鞍山",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5333600002",
      "scope": "533360/0002，新港城广场2楼，私立独立未参加计划；2025年9月教师11、上午1:7.2/下午1:3.4、容量168。独立校区不用作丽港城数据",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（师资容量2025年9月）"
    },
    {
      "label": "家校会《幼稚园概览2026/27》：朗思南昌",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=6127820001",
      "scope": "612782/0001，V WALK G26，私立独立未参加计划；概览创校2020、2025年9月教师15、上午1:8.5/下午1:5.8、容量224。品牌沿革2019与登记创校年分开",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（师资容量2025年9月）"
    },
    {
      "label": "教育局：朗思丽港城现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/216267.pdf",
      "scope": "一般/国际上午79200、一般/国际下午52800、英普下午79200，全日132000另膳食8635，11期；不能用PN或其他校区费用代替",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（2026-09-01生效）"
    },
    {
      "label": "教育局：朗思马鞍山现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/533360.pdf",
      "scope": "一般/国际上午79200、下午52800、英普下午79200，国际K1/K2全日132000另膳食8635；全日项目未列K3，不承诺全级开班",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（2026-09-01生效）"
    },
    {
      "label": "教育局：朗思南昌现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/612782.pdf",
      "scope": "双语半日84480，其他非本地按年级/时段62920至92400，全日147400另膳食8635，11期；K1下午非双语92400与K2/K3下午62920分开",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2026/27（2026-09-01生效）"
    },
    {
      "label": "校方：首页与校区沿革",
      "url": "https://www.think.edu.hk/",
      "scope": "当前列丽港城/马鞍山/南昌及2027/28招生入口；1994创办，品牌沿革南昌2019；旧历史叙述不作现在小学直升或未来续营保证",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "页面含2027/28入口与历史叙述"
    },
    {
      "label": "校方：Application",
      "url": "https://www.think.edu.hk/services-7",
      "scope": "每名孩子只申请一个校区、40费用、出生证明相片信封、ARN；2岁班开课首日满2岁；页面仍列2024/2023出生例，与首页2027/28不一致，未擅改新年度年龄",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "当前流程页未明列适用学年，出生例仍2024/2023"
    },
    {
      "label": "校方：Philosophy & Curriculum",
      "url": "https://www.think.edu.hk/philosophy-curriculum",
      "scope": "儿童主导项目、母语教师语言环境、游戏探究、听说读写及参观；品牌理念不证明每校每班配置、成效或IB认证",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "当前网页未注明学年"
    },
    {
      "label": "校方：P1 Allocation / Learning outcomes",
      "url": "https://www.think.edu.hk/learning-outcomes",
      "scope": "Statistics by NC, Feb 2026，2025/26小学分流官津18/直私70/国际12；未列人数分母、逐校与offer，不能套丽港城或集团录取率",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28",
      "academicYear": "2025/26分流（2026年2月统计）"
    },
    {
      "label": "Now新闻：朗思小学疑停办、教育局回应",
      "url": "https://news.now.com/home/local/player?newsId=609253",
      "scope": "2025-06-29转述EDB当时未接小学结业通知、已收美孚4月停办通知及敦促退款；只作历史，不证当前三园营运风险",
      "sourceType": "media-report",
      "checkedOn": "2026-10-28",
      "academicYear": "2025年6月历史报道"
    },
    {
      "label": "东网：朗思小学通知拟7月底停办",
      "url": "https://hk.on.cc/hk/bkn/cnt/news/20250629/bkn-20250629180430569-0629_00822_001.html",
      "scope": "2025-06-29报道小学向家长电邮拟7/31停办及债券争议，EDB当时未收结业通知；未亲读电邮，不把债券当幼稚园义务",
      "sourceType": "media-report",
      "checkedOn": "2026-10-28",
      "academicYear": "2025年6月历史报道"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "幼稚园品牌及地址不赋官津派位优先；自行计分及统一派位住址校网、随机与注册边界",
      "sourceType": "government",
      "checkedOn": "2026-10-28",
      "academicYear": "2027/28"
    }
  ],
  "tkocps": [
    {
      "label": "家校會PSP2026：將軍澳天主教小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=229",
      "scope": "完整讀取學校條目：身份、95校網、收費、班級、語言、評估、分班、課程與支援；教師為2025/26統計。學校特色有完整內容，不能把「其他」欄的橫線誤作整個特色空白。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "將天：課程特色",
      "url": "https://www.tkocps.edu.hk/tc/subject/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2",
      "scope": "完整讀取：小二下至小六普教中、小一拼音、低年級RWI、高年級讀寫、初中英數、英語Science、一至六年級編程與分級STEAM、四層輔導、週一二四導修、週三課外活動及智趣星期五。未提供NET人數或英語總課時。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "將天：2025/26中學派位成績公布原PDF",
      "url": "https://www.tkocps.edu.hk/sites/default/files/files/gong_bu_26_14_7.pdf",
      "scope": "全文讀取2頁：校方稱97%學生獲派首三志願；列本區／他區中學名稱及英文中學例子，沒有畢業總人數、各校人數或英中率，不換算Band1率、offer率或最終入讀率。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026升中",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "將天：當用插班入學申請表及須知原PDF",
      "url": "https://www.tkocps.edu.hk/sites/default/files/files/ru_xue_shen_qing_biao_2526_a4.pdf",
      "scope": "全文讀取2頁：當用表寫各級現暫無空缺；如有空缺及成績合要求才電話約試，甄選部分申請人、考試費40；表格／近照、最近成績、獎項副本如有、出生證明。不列固定4–7月窗口或中英數科目，不能把常設表格寫成即時開位。",
      "sourceType": "school-official",
      "academicYear": "檔名2526；2026-10-28當用表",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "將天：第16/2026號小一文件備忘通告",
      "url": "https://www.tkocps.edu.hk/sites/default/files/notice/circular2026_16_suo_qu_shen_qing_ben_xiao_xiao_yi_xue_wei_suo_xu_cheng_jiao_zhi_wen_jian_bei_wang_.pdf",
      "scope": "全文讀取2026-09-08通告：2027小一紙本9月21–25日、電子9月17–25日；兄姊在本校／父母本校就職屬必收，仍須交表及證明。此文件是索取備忘通告，未取得備忘本身，不自行補宗教證明認定規格。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一95校網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net95.pdf",
      "scope": "完整讀取2頁8/2026名冊：將天529257、自行學額63；此為暫定開班基準學額，不能乘二寫126實際入讀。#16原則批准2029/30起與另一資助小學合併、續在將天校址營辦，最終批准視詳細計劃及進度，未以新聞推定合併對象或全部過渡安排。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2029/30合併原則批准",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "tmrgps": [
    {
      "label": "家校會PSP2026：塘尾道官立小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=526",
      "scope": "完整讀取：32校網、1959創校、2380平方米、四所聯繫中學；2026/27共20班、小一2班，2025/26共22班、43教師及各項百分比；年度收費、評估、STREAM、英語活動、姊妹交流與支援。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一32校網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net32.pdf",
      "scope": "完整讀取1頁8/2026名冊：塘尾道510688列32網、自行學額50，校網為旺角／大角咀。名冊學額按暫定開班基準，不能由50反推當屆實際小一人數100或取錄難度。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "塘尾道：2027/28自行分配學位申請事宜原PDF",
      "url": "https://tmr.edu.hk/it-school/php/webcms/files/upload/tinymce//2627/self_apply_notice_1789961197.pdf",
      "scope": "全文讀取：紙本2026-09-21至25、8時至16時；電子09-17至25 23:59；文件與3個月住址證明要求，父母／兄姊本校畢業證明；11-23結果、25至26註冊、27備取生補註冊。無「全體最多15分」或校友不起作用的說法。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "塘尾道：2026小一候補生須知原PDF",
      "url": "https://tmr.edu.hk/it-school/php/webcms/files/upload/tinymce//2526/%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8/p1apply_info_1779160772.pdf",
      "scope": "全文讀取：2026-05-19至06-10中午收表、06-11 14:30–15:30面試；之後遞表視學額約面試。列派位證、K2及K3上學期成績、身份文件、活動或推薦如有；這是2026輪已過日期，不當作2027叩門日程。",
      "sourceType": "school-official",
      "academicYear": "2026/27小一候補",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "塘尾道：當用插班生申請須知原PDF",
      "url": "https://tmr.edu.hk/it-school/php/webcms/files/upload/tinymce//%E5%AD%B8%E6%A0%A1%E8%B3%87%E8%A8%8A/2025-2026/%E6%8F%92%E7%8F%AD%E7%94%9F/guidelines_for_new_student_admissionc_1767844809.pdf",
      "scope": "全文讀取：身份／最近兩學年成績及相關證書如適用／監護人身份副本，辦公時間親交；審核後通知合適申請人參加中英數筆試及面試、取錄電話通知，無固定月份／開放年級／分數線。PDF文件屬性舊標題2015-2016不當新招生年度，頁內須知無年度。",
      "sourceType": "school-official",
      "academicYear": "無年度須知；2026-10-28官網當用",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "塘尾道：當用插班生入學申請表原PDF",
      "url": "https://tmr.edu.hk/it-school/php/webcms/files/upload/tinymce//%E5%85%A5%E5%AD%B8%E8%A1%A8%E6%A0%BC/Interim%20Admission%20Application%20Form(C_20260413)_1776219118.pdf",
      "scope": "全文讀取2頁：擬入學年月與年級欄可填、現校及年級、在港修讀記錄、合資格留港身份、特殊教育需要、投考原因及文件真確聲明。不推定所有年級現有空缺。",
      "sourceType": "school-official",
      "academicYear": "表名2026-04-13版本",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "塘尾道：2024/2026升中派位結果原PDF",
      "url": "https://tmr.edu.hk/it-school/php/webcms/files/upload/tinymce//2627/20242026_1788916732.pdf",
      "scope": "全文提取並下載原圖目視：標題確為2024/2026，首志願92%、首三志願97%；列伊利沙伯、聖言、聖芳濟等。未列人數、逐年拆分、是否合併兩屆；保留原題年份，不自行改為2025/26單屆、不計QES或Band1率。",
      "sourceType": "school-official",
      "academicYear": "原表標示2024/2026",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月原件，特別核第1–5及10題：自行最多兩校；統一按派位組別、選校意願與隨機編號；聯繫保留是扣除自行／重讀後餘額25%，不等於小學畢業生比例，須合資格且乙部首選、跨網失保留資格。",
      "sourceType": "government",
      "academicYear": "2027/28中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "topkids-yl": [
    {
      "label": "家校會KGP2026/27：德怡國際幼稚園（元朗）",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=6020000001",
      "scope": "完整讀取並下載HTML逐欄核對：602000/0001、2015、私立獨立、不參加2026/27幼稚園教育計劃、非本地課程、校址及師資。2025-09學生AM53／PM1／WD14、總68（不含2–3歲33人）；使用中課室容額118、6室；師生比含2–3歲。2026/27費用、2027/28全年收表；2026-03教師年資及多項課程欄沒有資料，不掛舊89%到新年。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師生2025-09；申請2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局現行收費證明書：德怡元朗",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/602000.pdf",
      "scope": "完整讀取2頁：2026-08-01生效、602000同址、K1–K3上午／下午6300×12=75600、全日8650×12=103800、全日膳費328×12=3936。證書課程行為LOCALNONKGS，與KGP課程類別「非本地」各按其欄位表達，不由校名推定法定國際學校身份。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德寶教育機構：德怡元朗校頁",
      "url": "https://www.deborah.edu.hk/topkids-international-kindergarten",
      "scope": "完整讀取校本頁：元朗泰祥街14號盛發1樓、電話24472669、註冊602000/CCC887、2–6歲、International課程；母語英／粵／普通話教師、全日加設Cambridge課、正念、互動白板、可安排照顧員交通。AM9–12:15／PM13:15–16:30／WD9–16:30。沒有英語佔比、Cambridge考試成績或畢業升小統計。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德寶教育機構：課程說明",
      "url": "https://www.deborah.edu.hk/curriculums",
      "scope": "完整讀取機構Mainstream/Bilingual/International三套課程，德怡校頁指定International，故只引用International部分的寫作／閱讀／phonics／數理活動／思考／體能／科學科技；不把Mainstream中文主導或其他校語言比例套入元朗。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德寶教育機構：入學申請說明",
      "url": "https://www.deborah.edu.hk/registration",
      "scope": "完整讀取：到所選學校頁下載表格、郵寄、4相片、出生證明副本、針卡雙面副本、4個貼郵自址信封。無本校2027/28精確截止日、面試日或插班優先規則。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月原件：自行甲類必收與乙類計分、首五項只能擇一、宗教／主辦社團擇一、父母或兄姊舊生10分；統一派位按兒童住址而非幼稚園地址；已核2027申請、結果及註冊日期。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "tpom": [
    {
      "label": "家校会《小学概览2026》：大埔舊墟公立學校",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=368",
      "scope": "全文；安祥路10号、84网、资助无宗教男女、1964／谦慎诚敏／张丽珠、6400平方米，保姆车、无三类中学关系；2026/27各级4班全24班，非宝湖道30班。2025/26教师57含校长／核准49，师训100/学士98/硕博51/SEN49/10年以上58%。2026/27家教会30、核准450、泳课350；8:15–15:15；P1全科0测2考并有初期进展评估、P2–6零测3考，高小按成绩分班。全级全班普教中，生活科技P1–6及AI／编程，P4–6BYOD、活动及合作学习，心理及言语支援。",
      "academicYear": "2026/27；教师2025/26",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "本校2025/26升中结果原PDF",
      "url": "https://tpomps.goodschool.hk/upload/2026/09/ccf44f4df356f8765a79a6b8a1bb6c4e.pdf",
      "scope": "全文并下载渲染看图；截至2026-09-08，共44校人数相加121，与全级121一致。沐恩17／迦密柏雨15／恩主教8／圆玄二7／莫寿增6等；协恩、曾肇添、培基各3，喇沙英华吕中各2。摘要标设英语教学中学97约80%、全英约65%，非Band1率或个别概率；星号30行人数相加100，与摘要97不一致，报告就近注明，不自改摘要或查无原因下推分子。原件用获派，不作逐校最终注册。",
      "academicYear": "2025/26毕业；截至2026-09-08",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "本校2027/28小一自行申请原PDF",
      "url": "https://tpomps.goodschool.hk/upload/2026/09/c6db8e16bfe9996fb95fde700df90297.pdf",
      "scope": "完整原文；电子2026-09-17至25，纸本21–25 9–12及14–16:30；校号113328；身份居留、近3月住址、适用父母兄姊旧生材料。同分EDB中央抽签；自行结果公布前不面见儿童家长。不按无宗教推所有人同分，不把旧生10与首名5相加。",
      "academicYear": "2027/28小一",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "本校2026/27小二至五插班通知原PDF",
      "url": "https://tpomps.goodschool.hk/upload/2026/05/1f4e316fd6a4b7109b322f7b5488a52a.pdf",
      "scope": "全文；2026-06-05截止额满止，50元不退、2照片，身份居留正副本、24/25及25/26报告记录／适用奖项、回邮信封，亲交1F咨询中心。6/13 9:30–12:45笔试、自备文具及低年级颜色笔，需要时面见学生家长，7/20前不论录取均书面通知。没有明确逐科考纲；该轮已结束，不能当当前空缺或2027/28候补。",
      "academicYear": "2026/27插班，已结束",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "本校中文科介绍",
      "url": "https://tpomps.goodschool.hk/page/967/?m=547634856977&mid=9&s=576186213356",
      "scope": "全文；普通话教授中文、读写结合、真实文本阅读策略、电子资源，幼小衔接避免机械抄写；按年级开展语文及资优支持，未给课业每日分钟或每个学生参与量。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "本校英文科介绍",
      "url": "https://tpomps.goodschool.hk/page/968/?m=547634856977&mid=9&s=9835723720230",
      "scope": "全文；读写听说、文本阅读、数字资源、英语日、英语大使及交流等。未列每班NET人数／时数及其他各科授课语言，不能推比其他资助校课时多或全日沉浸。",
      "academicYear": "现行资料",
      "sourceType": "school-official",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2027年84校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net84.pdf",
      "scope": "完整名册；本校113328安祥路10号，自行50，非全级学额。宝湖道543225为63须分别；小一网号不能套升中。",
      "academicYear": "2027年度；2026年8月版",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：宝湖道旧墟（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=369",
      "scope": "全文；84网、资助无宗教、宝湖道7号、2026/27各级5班全30班、中文、保姆车、无三关系。PTA50、核准470、泳课200／补证31。不能借其30班或语言／成绩套安祥路。",
      "academicYear": "2026/27",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：大埔官立小学（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=380",
      "scope": "全文；84网、官立无宗教、中文、保姆车，联系新界乡议局大埔区中学与粉岭官中；2026/27全9班小一1班、PTA40／核准200。联系不当入读保证。",
      "academicYear": "2026/27",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：孙方中小学（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=379",
      "scope": "全文；84网资助无宗教、中文含普通话及英文、一条龙孙方中书院、2026/27小一4班、PTA50／核准450、校车及保姆车。一条龙与联系分开，须另核升读条件。",
      "academicYear": "2026/27",
      "sourceType": "school-profile",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "已读完整4页；当届电子与纸本、自行结果11/23和注册11/25–26、2027统一网申1/18–24及中心1/23–24、结果6/2–3、注册6/10–11。甲类须取录与计分类别、前五项互斥、适龄等，不把无宗教推同分；正常自行不可笔试面试。",
      "academicYear": "2027年度；2026年8月版",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局2025/2027中学学位分配FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；公营自行可申请最多两所，统一派位按组别、家长选择及随机编号。直属85%联系25%分母扣除重读及自行余额，另有资格与选择条件。本校无三关系，不能保留中学学额；小一网不能直接套升中。",
      "academicYear": "2025/2027周期；2026年9月版",
      "sourceType": "government",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国：“旧墟公立”历史讨论",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2908216",
      "scope": "全文已读；2014–2015主帖问宝湖道，多回复转谈八旧，须限明确实体片段。正面谈成绩纪律，也有教师耐心负评及相反回复；身份未充分确认、年代久，不作2026全体满意度。",
      "academicYear": "2014–2015历史评论",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国：旧墟旧校与阮郑旧校比较",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2982876",
      "scope": "全文已读；2015一位未入小一家长担心要求与压力，另一留言谈反复习作、活动及考前练习。未入学担心不作在读体验；当届评估按PSP，不迁移历史政策。",
      "academicYear": "2015历史评论",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育王国：“英文能力”提问",
      "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3687929",
      "scope": "正文只见2018提问“英文能力如何”，未见有内容回复。仅支持家长在意英文这一问题，不作英文好评、差评或共识。",
      "academicYear": "2018历史提问，非口碑结论",
      "sourceType": "parent-discussion",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhttlsks": [
    {
      "label": "家校会《小学概览2026》：圣公会德田李兆强小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=136",
      "scope": "全文；资助全日男女、48网、2003、庆田街3号/11254平方米，无三类中学关系。2025/26教师59/编制59，师训98/学士98/硕博38/SEN59%，教龄10/19/71；2026/27全校31班，P1-5各5班/P6六班。两名NET专责英语读说；中英数拔尖为课外抽离，能力平均编班；2026/27小二起中文逐年改全粤语，非全校即刻完成。P1一测一考、P2-6两测两考。PTA20、特定用途370，免学费不等零支出；音乐2026金奖、第77届集诵冠军、2025/26女子甲跳远冠军。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26；2026-09-25修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度48校网自行分配学额名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net48.pdf",
      "scope": "全文两页；德田550400及油塘基显560430各75个，李兆强518425为63个。学额依暂定班数计算，最终获准班数视需求；不能倍增作最终总学额，或据学额多推算录取容易。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德田李兆强小学：学校历史",
      "url": "https://www.skhttlsk.edu.hk/tc/TTLSK_history.php",
      "scope": "全文；1970兆强上午部、1976扩下午部，1996搬李兆强，2003全日制时下午部迁德田；不能称1970即下午校或把现校仍写成半日制。只支持已列历史，未复证旧稿2001分拆。",
      "sourceType": "school-official",
      "academicYear": "现行资料",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德田李兆强小学：2027小一自行分配申请须知",
      "url": "https://www.skhttlsk.edu.hk/tc/ApplicationForAdmission.php",
      "scope": "全文；网上2026-09-17至25、纸本09-21至25/9-12及14-16，结果11-23/注册11-25至26。同分教育局电脑抽签；明确前身李兆强下午部、再前兆强下午部，旧生不可仅按现校名一律排除；认可宗教及证明。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德田李兆强小学：2026/27上学期插班申请",
      "url": "https://www.skhttlsk.edu.hk/tc/TransferApplication.php",
      "scope": "全文；P1至5，2026-05-19 9时至06-10 17时，只收网申/免费；相片、最近期含操行成绩、最多5张证书；首轮06-13上午、次轮06-20下午个别通知；笔试/原校成绩操行/活动服务/次轮面试，未列评分比例、各级空缺、具体卷科或时长。该轮已结束，不作10月正在收表。",
      "sourceType": "school-official",
      "academicYear": "2026/27上学期；2026-09-01入学",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德田李兆强小学：2026年7月7日较早升中新闻",
      "url": "https://www.skhttlsk.edu.hk/tc/news_detail.php?id=1532",
      "scope": "全文；该版英中67%、首志愿85%、首三90%，无人数分母；不能把67%覆盖7月13日已更新图70%。只作版本边界，不作Band1或实际入读比例。",
      "sourceType": "school-official",
      "academicYear": "2024/2026升中周期；2026-07-07",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "德田李兆强小学：2026年7月13日升中原图",
      "url": "https://www.skhttlsk.edu.hk/attachment/upload/files/2526/2026/%E6%94%BE%E6%A6%9C3.png",
      "scope": "直接下载并视觉读取整图；截至13/7/2026，英中70%、首志愿85%、首三90%。全港去向列56、观塘列50，并明示名单未尽录；未列完整分母，不能以106/70%反推人数，也不等于Band1或最终注册比例。",
      "sourceType": "school-official",
      "academicYear": "2025/26毕业；截至2026-07-13",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页；自行网上2026-09-17至25、纸本09-21至25，结果11-23、注册11-25至26；统一派位网上2027-01-18至24、中心01-23至24，结果06-02至03、注册06-10至11。正常自行不得笔试或面试；甲乙部10%/90%分母为统一派位学额。接受直资与私校的规定不同，私校获录继续参与统筹者名单会交有关私校参考，不能一概说接受私校offer便失去官津派位资格。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中学学位分配一般事项FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；公营自行最多两所中学，统一派位按派位组别、家长选择及随机编号。直属85%/联系25%分母是扣除留班及自行分配后的余额；一般校网Band1/2、乙部首选等条件，超额仍按组别及随机编号，跨网失去保留资格。不能当作小学毕业生入读率或保证；小一网号不可直接套入升中。",
      "sourceType": "government",
      "academicYear": "2025/2027周期；2026年9月版",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhykkgps": [
    {
      "label": "家校会《小学概览2026》：圣公会油塘基显小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=137",
      "scope": "全文；资助全日男女、2005、油塘道23号/8000平方米/48网，无三类中学关系；校监王紫薇/校长苏咏思。两学年36班各级6；2025/26编制68/总教师70，培训99/学士100/硕博50/SEN73%，教龄8/19/73。全校平均能力分班，兼分层抽离、拔尖辅导；语言中文含普通话及英文，小六增英文数，不能简化纯中文或全英。P1零测两考、P2-6零测三考；PTA40/特定用途380。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26；2026-09-21修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度48校网自行分配学额名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net48.pdf",
      "scope": "全文两页；德田550400及油塘基显560430各75个，李兆强518425为63个。学额依暂定班数计算，最终获准班数视需求；不能倍增作最终总学额，或据学额多推算录取容易。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "油塘基显小学：2027小一自行分配申请原图",
      "url": "https://www.skhykh.edu.hk/CustomPage/10/2027_p1_app.jpg",
      "scope": "实际下载并视觉读全文；纸本2026-09-21至25、9-12及14-16:30，住址最近3个月，证明清单；明确前身为基显上午校，其旧生可按相关准则获分，不能笼统写基显旧生不适用。宗教认可基督教及天主教正统宗派，学生或父母领洗/注册教友证明。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "油塘基显小学：2027小一行事历及机制",
      "url": "https://www.skhykh.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=20&pageId=8&webPageId=10",
      "scope": "全文；当届电子/纸本申请、11-23结果、11-25至26注册、11-27备取注册、2027-01-18至24网上统一选择/01-23至24中心、06-02至03结果及06-10至11注册。普通自行不可笔试面试，10/90分母为统一派位学额；宗教证明须校方核实。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "油塘基显小学：2026/27十月插班表及须知",
      "url": "https://www.skhykh.edu.hk/CustomPage/10/sub_2627_2nd_app_3.pdf",
      "scope": "完整两页，虽PDF元标题误作基显，页内校名明确油塘基显。P1-5、2026-10-06至11-03，周一至五9-16亲交，不收邮件/邮递；照片、出生居留证明/手册/最近一年成绩正副本及适用证书。筛选原校成绩及体艺优秀、操行B+以上，11-04前电话通知笔试；未获电话落选。未列笔试具体时间/卷科/时长/评分比例或兄姊优先。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班；10月轮",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "油塘基显小学：2025/26去向及2025/2027升中行事历",
      "url": "https://www.skhykh.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=21&pageId=9&webPageId=12",
      "scope": "全文；当届心仪学校人数列圣言10/观塘玛利诺10/梁式芝10/圣杰灵9等，另SPCC/德望/DGS/协恩各1。没有毕业/参与派位总人数，不将表内人数合计作全届或Band1分母；未分最终入读。另列2027升中时间表，未将其当小一申请日。",
      "sourceType": "school-official",
      "academicYear": "2025/26升中结果及2025/2027升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页；自行网上2026-09-17至25、纸本09-21至25，结果11-23、注册11-25至26；统一派位网上2027-01-18至24、中心01-23至24，结果06-02至03、注册06-10至11。正常自行不得笔试或面试；甲乙部10%/90%分母为统一派位学额。接受直资与私校的规定不同，私校获录继续参与统筹者名单会交有关私校参考，不能一概说接受私校offer便失去官津派位资格。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中学学位分配一般事项FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；公营自行最多两所中学，统一派位按派位组别、家长选择及随机编号。直属85%/联系25%分母是扣除留班及自行分配后的余额；一般校网Band1/2、乙部首选等条件，超额仍按组别及随机编号，跨网失去保留资格。不能当作小学毕业生入读率或保证；小一网号不可直接套入升中。",
      "sourceType": "government",
      "academicYear": "2025/2027周期；2026年9月版",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhyl2": [
    {
      "label": "家校会《小学概览2026》：圣公会仁立纪念小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=154",
      "scope": "全文；2002/10700平方米/上角街13号、65网、资助全日男女、中文；仅联系林护，校训非以役人乃役于人。2025/26编制57/教师63，培训学士100/硕博50/SEN60%，教龄20/10/70，两学年30班各级5。P1一测一考/P2-6两测两考。P3-6每级两能力较佳班、一普教中，又称其余三班，标签重叠或文句口径未明，不能合计六班；不支持现稿小二分流/前80-100淘汰线。PTA30/设施310/额外NET390；新奖励名幸仁甜心。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度65校网自行分配学额名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net65.pdf",
      "scope": "全文一页；仁纪543195自行63，与仁立113972不同编号；名册覆盖丽瑶荔景祖尧大窝口葵盛葵芳葵兴下葵涌等，不等于整个葵青/青衣/荃湾。不能由63推最终总学额或最低录取分。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：学校历史",
      "url": "https://www.ylm.edu.hk/site/view?name=%E5%AD%B8%E6%A0%A1%E6%AD%B7%E5%8F%B2",
      "scope": "全文；1970前身仁立下午校，2002-09迁上角街改全日制。页内教职员71/学生1100为未标日期叙述，不能覆盖PSP教师63或当届分母。",
      "sourceType": "school-official",
      "academicYear": "校史；未标更新年份的人数不作现况",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：校训校歌",
      "url": "https://www.ylm.edu.hk/site/view?name=%E6%A0%A1%E8%A8%93%E3%80%81%E6%A0%A1%E6%AD%8C",
      "scope": "全文；明确校训非以役人，乃役于人，纠正现稿无依据的仁德齐家立志勉己；未将校歌歌词用于新事实。",
      "sourceType": "school-official",
      "academicYear": "现行资料",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：2027/28小一自行分配申请须知",
      "url": "https://www.ylm.edu.hk/latestNews/179",
      "scope": "完整两页；纸本2026-09-21至25/9-17；前身仁立下午校旧生须另附下午部证明；宗教要求父/母洗礼、认可基督教或天主教，不接受祖父母等亲属，未要求申请者额外受浸/恒常聚会证明。学校不约见申请人或家长，同分中央处理；11-23校内9时/网站12时后，11-25至26 9-16:30注册。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：2026/27第一阶段插班须知",
      "url": "https://www.ylm.edu.hk/latestNews/177",
      "scope": "全文且下载渲染视觉复核；P1-5，截至2026-11-12星期四17时；中英数两科A或85+、操行B+或乙+。表/申请信/身份证明/最近两年成绩/适用证书，交回校务处；按履历空缺邀请，中英数每科35-40分钟，按笔试个别邀学生及家长面试；考后一个月内电话通知获录，不通知落选。未公开评分比例/各级人数。",
      "sourceType": "school-official",
      "academicYear": "2026/27第一阶段插班",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：2024/2026升中分配结果",
      "url": "https://www.ylm.edu.hk/latestNews/173",
      "scope": "一页PDF全文及渲染视觉复核；7月16日更新，参与人数126，英中86、68.3%，首三志愿96%，林护28。英中为语言分类非Band1，名单为考获/分配口径，未证明最终注册或全部毕业生分母。纠正旧98%、50-60%及校方无详细公开数据。",
      "sourceType": "school-official",
      "academicYear": "2024/2026周期；2026-07-16更新",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：2026/27候补申请公告",
      "url": "https://www.ylm.edu.hk/latestNews/168",
      "scope": "全文；2026-04-27至06-09 16时，周六9-12，已结束；公告可校正附件申请段2025的排版残留。未取得2027/28新候补公告，不把放榜后3-5天当通用窗口。",
      "sourceType": "school-official",
      "academicYear": "2026/27小一候补，已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "仁立纪念小学：2026/27候补须知附件",
      "url": "https://www.ylm.edu.hk/uploads/files/2.%E5%B0%8F%E4%B8%80%E5%80%99%E8%A3%9C%E7%94%9F%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A52627%281%29.pdf",
      "scope": "完整一页；申请信、表、出生及居留证明、自行申请记录、统一派位选择表如有、成绩/适用证书；06-10前邀、首轮06-11/次轮06-13/必要第三轮6月下旬，7月中旬电话录取、08-31前无电话为落选。未列111必要条件、固定笔试或评分比重。表内年份2025及星期三残留不当作真实日期，以同届公告2026-06-09交叉。",
      "sourceType": "school-official",
      "academicYear": "2026/27小一候补，历史安排",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页；自行网上2026-09-17至25、纸本09-21至25，结果11-23、注册11-25至26；统一派位网上2027-01-18至24、中心01-23至24，结果06-02至03、注册06-10至11。正常自行不得笔试或面试；甲乙部10%/90%分母为统一派位学额。接受直资与私校的规定不同，私校获录继续参与统筹者名单会交有关私校参考，不能一概说接受私校offer便失去官津派位资格。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中学学位分配一般事项FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；公营自行最多两所中学，统一派位按派位组别、家长选择及随机编号。直属85%/联系25%分母是扣除留班及自行分配后的余额；一般校网Band1/2、乙部首选等条件，超额仍按组别及随机编号，跨网失去保留资格。不能当作小学毕业生入读率或保证；小一网号不可直接套入升中。",
      "sourceType": "government",
      "academicYear": "2025/2027周期；2026年9月版",
      "checkedOn": "2026-10-28"
    }
  ],
  "sls": [
    {
      "label": "家校会《小学概览2026》：圣类斯中学（小学部）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=18",
      "scope": "私立男校身份、地址、直属关系；2026/27学费57000及13班、课程评估；2025/26教师24含校长及培训年资统计",
      "sourceType": "school-profile",
      "academicYear": "2026/27（教师统计2025/26）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：圣类斯中学（小学部）现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/591904.pdf",
      "scope": "P1至P6每期5700、10期；2026-09-01生效，合年费57000",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：入学申请",
      "url": "https://www.stlouisps.edu.hk/tc/入學申請",
      "scope": "2027/28小一网上申请日期及原件入口；2026/27小二至小五少量插班、面试、文件与100元费用",
      "sourceType": "school-official",
      "academicYear": "2027/28小一、2026/27插班",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2027/28小一新生简介",
      "url": "https://www.stlouisps.edu.hk/sites/default/files/files/2728xiao_yi_xin_sheng_jian_jie_.pdf",
      "scope": "小一60学额、2026/27年费57000引用；英语英数科学、普通话中文、其余科粤语；2026申请截止、两轮面试、公布与留位日程；7:40至14:50",
      "sourceType": "school-official",
      "academicYear": "2027/28（收费引用2026/27）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2025/26小六升中派位结果",
      "url": "https://www.stlouisps.edu.hk/sites/default/files/files/2526xiao_liu_sheng_zhong_pai_wei_jie_guo_.pdf",
      "scope": "明确全级57人、25获派圣类斯中学及其他学校人数；学校称接近80%获派以英文为主要教学语言中学，非Band1率或录取概率",
      "sourceType": "school-official",
      "academicYear": "2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：学费减免计划",
      "url": "https://www.stlouisps.edu.hk/sites/default/files/files/xue_fei_jian_mian_ji_hua_.pdf",
      "scope": "全额/半额学生资助、综援及突发经济困难等减免条件；正式注册时约6月申请、约三周通知，最多全免",
      "sourceType": "school-official",
      "academicYear": "现行链接文件未注明学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中常见问题（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "直属85%以扣除自行及重读后的余额为分母；学校网组别、乙部首选、超额随机及跨网资格边界，不是毕业生升读率",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "smcs": [
    {
      "label": "家校会《小学概览2026》：嘉诺撒圣玛利学校",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=513",
      "scope": "31网、柯士甸道162号、资助全日女校；一条龙圣玛利书院而非直属；2026/27收费及24班；2025/26小学教师45含校长，分班、评估与支援",
      "sourceType": "school-profile",
      "academicYear": "2026/27（教师统计2025/26）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2027/28小一自行分配学位申请须知",
      "url": "https://www.smcs.edu.hk/download/LatestNews/524/202609041712196634744-126509560c.pdf",
      "scope": "2026年9月电子与纸本申请窗口、身份住址与亲属旧生文件、儿童天主教领洗证明及海外领洗附加材料、11月23日公布",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2026/27小二至小六插班申请须知",
      "url": "https://www.smcs.edu.hk/download/LatestNews/440/202603251152236143297182599762c.pdf",
      "scope": "已结束4月30日截止、5月16日首轮甄选、合适者再面试、电话通知及两工作天注册；按实际空缺、文件清单，不含85分门槛或固定三轮",
      "sourceType": "school-official",
      "academicYear": "2026/27（已结束申请轮次）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2026/27小一候补生申请须知",
      "url": "https://www.smcs.edu.hk/download/LatestNews/439/2026032511483794251811558968376c.pdf",
      "scope": "已结束6月4日截止、6月20日首轮甄选、合适者面试与电话通知、两工作天注册；没有1-1-1必需或固定候补人数",
      "sourceType": "school-official",
      "academicYear": "2026/27（已结束申请轮次）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027自行分配阶段31网名册",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net31.pdf",
      "scope": "本校自行50为按暂定班数计算的阶段配额；U3与天神、圣玛利书院一条龙脚注，不倒推最终总学额",
      "sourceType": "government",
      "academicYear": "2027/28（2026年8月版）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2026/27一条龙学校名单",
      "url": "https://www.edb.gov.hk/tc/edu-system/primary-secondary/applicable-to-primary-secondary/through-train/sch-list.html",
      "scope": "圣玛利学校及天神嘉诺撒学校同与嘉诺撒圣玛利书院结龙；其他资助一条龙存在，不可称唯一免费一条龙",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：天神嘉诺撒学校（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=106",
      "scope": "35网、鹤园街21号、2300平方米、18班；一条龙嘉诺撒圣玛利书院，直属及联系均无，用于比较关系与校网",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "甲类必收与计分区别；旧生10与首名5不能相加，适龄10、宗教与主办社团择一；统一派位随机机制与2027日程",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中常见问题（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "一条龙毕业生直接升读选择及外报后不能保留直升权；不套直属85%或联系25%分母",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "smm": [
    {
      "label": "家校会《幼稚园概览2026/27》：天主教圣玛加利大幼稚园",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3253680001",
      "scope": "1986、乐活道2A号3至4楼、非牟利参加计划半日园；2025年9月教师23、学位16、师生比上午下午各1:10.9、学生上午239下午239；课程评估及支援自述",
      "sourceType": "school-profile",
      "academicYear": "2026/27（师生统计2025年9月）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：圣玛加利大幼稚园现行收费证书",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/325368.pdf",
      "scope": "K1至K3上午下午获政府资助后免费、10期、没有全日班；证书2021-09-01生效，不能说2026新核",
      "sourceType": "government",
      "academicYear": "现行证书（2021-09-01生效）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：首页",
      "url": "https://www.stmkg.edu.hk/",
      "scope": "当前2027/28入学申请入口、办学目标、地址及联系方式；首页旧发布日期不当申请学年，未读到附件不登记附件内细节",
      "sourceType": "school-official",
      "academicYear": "网页含2027/28招生入口",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：当前网上收生系统",
      "url": "https://dki-stmkg.catholic.edu.hk/admission",
      "scope": "2026-10-29至31收件时段；40元费用；网上填表与亲递文件核验、相片/出生/住址/疫苗/领洗及旧生亲属证明、11月6日补充资料；未列面试日期或语言",
      "sourceType": "school-official",
      "academicYear": "2027/28申请轮次（2026年10月）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2026/27湾仔区幼稚园K1至K3空缺表",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Wan%20Chai_K1-K3%20Vacancy.pdf",
      "scope": "2026-10-13快照本园K1/K2/K3均N（无空缺）；不代表2027/28申请或未来插班概率，须直接确认即时变化",
      "sourceType": "government",
      "academicYear": "2026/27（2026-10-13快照）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：圣玛加利大幼稚园2022质素评核报告",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StMargaretMary_Catholic.pdf",
      "scope": "2022年10至11月评核通过；关爱、家校与语言生活能力观察，以及K1写字家课、活动选择和体育轮候改进建议，仅作历史基线",
      "sourceType": "government",
      "academicYear": "2022/23（2022年实地评核）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：幼稚园教育计划常见问题（2024年11月）",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/FAQ_KG%20Scheme_20241113_TC.pdf",
      "scope": "第15至16题容许在半日免费等原则下灵活配置英语/普通话教师等人手；不能由参加计划推定没有NET，也不能证明本园有NET",
      "sourceType": "government",
      "academicYear": "2024年11月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027/28K1收生安排入口",
      "url": "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/index-2728.html",
      "scope": "已读取当届安排、表格、空缺与非华语支援入口；没有由入口页推算具体统一注册日或本园面试日",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "官津小一按住址校网而非幼稚园地址；自行宗教、旧生及首名计分边界，不把就读本园视为12网优先",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "snicholas": [
    {
      "label": "家校會KGP2026/27：金巴倫英文幼稚園",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=2148680001",
      "scope": "完整讀取本校條目，並下載原始HTML核對逐行學生人數與全年學費，避免提取器漏0／免費／空白欄。身份、校址、2026/27計劃及收費、課程／支援；教師、師生比、學生為2025年9月資料，教育用品收費屬2025/26。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師生資料2025-09",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局現行收費證明書：金巴倫英文幼稚園",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/214868.pdf",
      "scope": "全文讀取1頁：2026-08-01生效，K1／K2上午、K1／K2／K3下午每期$6,500、11期全年$71,500。沒有上午K3列，核准課程不等於每班當屆開辦或即時空缺；沒有用Nursery英文名稱推定2歲PN。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "沿用本研究會話完整讀取的2026年8月原件：官津統一派位校網按兒童唯一或主要住址，不按幼稚園地址；幼稚園名稱、同辦學背景或小學體驗不賦予保留學額。自行計分／統一派位與校本直私申請分開。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "soka": [
    {
      "label": "家校會KGP2026/27：香港創價幼稚園",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3258560001",
      "scope": "完整讀取本校條目，並下載原始HTML核對逐行學生人數與全年學費，避免提取器漏0／免費／空白欄。身份、校址、2026/27計劃及收費、課程／支援；教師、師生比、學生為2025年9月資料，教育用品收費屬2025/26。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師生資料2025-09",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局現行收費證明書：香港創價幼稚園",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/325856.pdf",
      "scope": "全文讀取2頁：2026-09-01生效，K1–K3上午／下午扣減政府資助後每期$197、11期全年$2,167；這是學費，非茶點／雜費，參加計劃不等於免費。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "沿用本研究會話完整讀取的2026年8月原件：官津統一派位校網按兒童唯一或主要住址，不按幼稚園地址；幼稚園名稱、同辦學背景或小學體驗不賦予保留學額。自行計分／統一派位與校本直私申請分開。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "創價：招生詳情（2026/27輪次）",
      "url": "https://www.soka.edu.hk/admission",
      "scope": "完整讀取中英兩版本正文，採中文頁登記：2026/27K1申請2025-10-02至19、11月面見、2025-12-12結果、2026-01-08至10註冊；K2/K3申請2026-01-05至02-05、04-18面見、05-29結果、06-06註冊。均為已結束輪次，不移植2027/28。2025/26K1計劃AM90/PM90，舊195元學費不同於2026/27證書；註冊、候補、文件、兄姊／父母員工優先及褓母車中介角色。",
      "sourceType": "school-official",
      "academicYear": "2026/27招生；含2025/26、2024/25歷史資料",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "創價：幼稚園簡介",
      "url": "https://www.soka.edu.hk/about-us",
      "scope": "完整讀取：1992創校、非牟利、香港國際創價學會辦學、人本教育及格言，並從該頁取得當用2024/25周年報告原PDF連結；未把簡介652人當2026年10月即時人數。",
      "sourceType": "school-official",
      "academicYear": "當用簡介；2026-10-28查閱",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "創價：2024/25學校報告及發展計劃",
      "url": "https://www.soka.edu.hk/uploads/pages_blocks/9JNmgUAtO7woG5Gkc7DpFWIXfEQ8A8ZUfnyuFvTR.pdf",
      "scope": "PDF下載並pdftotext提取；實讀兒童／師資第1–2頁、組織圖、親子英語活動及第35–36頁幼小支援。2024/25共652人、20班；除校長外45位全職教師、離職10人／22%，與KGP2025年9月45人（包括校長）時點口徑不同；現任馮婉惠。親子英語由四位英文教師帶領不證明四人均NET；K2直私資訊、K3小一申請及適應家長講座不等於升小率。沒有宣稱逐頁核實全部活動或取得升小入讀分母。",
      "sourceType": "school-official",
      "academicYear": "2024/25",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：創價2022質素評核報告",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/HKSoka.pdf",
      "scope": "完整讀取：2022-11-22、23、24、29視學，結果「通過」，不是A++官方排名。肯定人本、提問與互動，亦指出低高班部分閱讀理解／重組句子／標點課業過深及每日音樂安排須改善。保留2022觀察邊界，不當2026現況。",
      "sourceType": "government",
      "academicYear": "2022年11月視學",
      "checkedOn": "2026-10-28"
    }
  ],
  "spc": [
    {
      "label": "家校會KGP2026/27：聖保羅堂幼稚園",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=1314660001",
      "scope": "完整讀取本校條目，並下載原始HTML核對逐行學生人數與全年學費，避免提取器漏0／免費／空白欄。身份、校址、2026/27計劃及收費、課程／支援；教師、師生比、學生為2025年9月資料，教育用品收費屬2025/26。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師生資料2025-09",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局現行收費證明書：聖保羅堂幼稚園",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/131466.pdf",
      "scope": "全文讀取2頁：2026-09-01生效，具資助資格的K1–K3上午／下午學費FREE、10期；第二頁另列下午各級未扣資助前每期$3,315、10期全年$33,150，沒有把此數套作合資格學童需付學費。地址為中環己連拿利及約翰馬利樓地下至三樓。",
      "sourceType": "government",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "沿用本研究會話完整讀取的2026年8月原件：官津統一派位校網按兒童唯一或主要住址，不按幼稚園地址；幼稚園名稱、同辦學背景或小學體驗不賦予保留學額。自行計分／統一派位與校本直私申請分開。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖保羅堂：聯絡我們",
      "url": "https://www.stpaulchurchkg.edu.hk/index.php/section/school/1096",
      "scope": "完整讀取現行校址：己連拿利聖保羅堂伍庭芳堂及活動室、約翰馬利樓地下至三樓，電話24533766；英普查詢服務不等於已公開語言課時。當用官方頁只列中環，不把舊北角作當屆可選校區。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28當用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖保羅堂：入學申請及升小資訊",
      "url": "https://www.stpaulchurchkg.edu.hk/index.php/section/page/1106",
      "scope": "靜態提取僅有標題，另實讀官網公開JS的sub_list及get_page_content呼叫；按頁面已列ID15319與37443，以只讀公開POST取得招生PDF與2025/26、2024/25升小原圖連結並逐件閱讀。沒有把頁面空白誤判沒有資料，也未提交申請或個資。",
      "sourceType": "school-official",
      "academicYear": "2027/28招生；2025/26及2024/25升小",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖保羅堂：2027/28 K1入學資訊原PDF",
      "url": "https://mykiddie.ephhk.com/upload/6411/section/page269435341384625106/ef3f11d91e84b096827da6b4b20ea1f9.pdf?ckeditor",
      "scope": "下載並全文讀取4頁：2023-01-01至2024-12-31出生；2026-09-09零時至10-09午夜申請，已截止；10-30或之前電郵約見、11月其中星期六面見；12-11結果、2027-01-07至09註冊。申請無上限但約見最多1000人，列篩選與收生準則；40報名費／970註冊、文件、轉校退註冊文件五工作天及費用不退。1000不是K1學額，早交表未列優先。",
      "sourceType": "school-official",
      "academicYear": "2027/28 K1",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖保羅堂：2025/26小一派位原表",
      "url": "https://mykiddie.ephhk.com/upload/6411/section/page417334900405694128/26759faa0a66200e9a0aecbc788ab4de.jpg?ckeditor",
      "scope": "下載原圖目視兩欄逐校派位人數：聖彼得10、基恩8、英皇二校7、英皇同學會5、聖保羅書院4、SPCCPS4、聖若瑟4、聖心私立4、男拔1等。報告表明只節選部分，原圖未列畢業總分母、渠道去重及最終註冊定義，不自行算名校／直私入讀率。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026升小",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖保羅堂：2024/25小一派位統計原圖",
      "url": "https://mykiddie.ephhk.com/upload/6411/section/page417334900405694128/64ab342f9e384b83ed00db4de5b3191c.jpg",
      "scope": "下載原圖目視：自行28%、統一47%、私立直資13%、叩門12%；另一統一派位志願圖首志願78%、第二14%、其他8%。兩圖分母不同、未列總人數，不反推人數或搬到2025/26，亦不改成offer率。",
      "sourceType": "school-official",
      "academicYear": "2024/25畢業；2025升小",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：聖保羅堂2026質素評核報告",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/StPaulsCh.pdf",
      "scope": "下載並全文讀取：2026-04-13、15、16、21視學、通過。記載自上學年接收停辦同系園學生並整合兩園資源（未點名北角、不用此句自行補停辦精確日期）；生活主題、每日音體自選美藝、自由探索、戶外籃球場、非華語兒童粵語溝通；改善可塑材料、音樂學習目標與發展計劃量度。",
      "sourceType": "government",
      "academicYear": "2026年4月視學",
      "checkedOn": "2026-10-28"
    }
  ],
  "srl": [
    {
      "label": "教育局《小学概览2026》：聖羅撒學校",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=76",
      "scope": "完整正文：34网非41；基堤道4及公爵街1、1948、忠诚仁爱、陈慧贤、资助全日女校、直属圣罗撒书院、中文及英文。2026/27 PTA100／核准450、各级4全24班、占地2872、24课室1礼堂3操场1图书馆。2025/26教师52含校长、核准48、师训学士98%／硕博40%／10年70%／SEN76%。小一0测2考、二至六0测3考，混合能力及小二展翅；7:45–15:15。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：官网及联系地址",
      "url": "https://www.srols.edu.hk/",
      "scope": "页脚基堤道4及电话23382807，与概览及EDB名册交叉；主页展示2026/27旧招生／插班通知，不代表当前持续开放。",
      "sourceType": "school-official",
      "academicYear": "现行联系资料，招生消息分别看正文",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：中文课程",
      "url": "https://www.srols.edu.hk/%E4%B8%AD%E6%96%87",
      "scope": "完整中文页：读写结合、说话及校本写作、古诗文、辩论／小记者、电子学习与自评互评；有2014–19支援及2025活动，年份不批量更新。没有逐级粤普授课表，不凭中文科断言全校粤教中或非普教中。",
      "sourceType": "school-official",
      "academicYear": "现行学科页；历史项目有原年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：英文课程与外籍协作",
      "url": "https://www.srols.edu.hk/%E8%8B%B1%E6%96%87",
      "scope": "完整英文页：主题文本、阅读工作坊、拼读／词汇、自主与分层读本、各级表达及高小小辩论；General English与NET协作，介绍NET及ELTA但未标现行编制年，不推2026/27全职人数。真实文本替代课本的介绍不等同所有学科全英。",
      "sourceType": "school-official",
      "academicYear": "现行学科页，未统一标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：2024/25学校周年报告",
      "url": "https://srols.edu.hk/sites/default/files/download/2024-25%E5%AD%B8%E6%A0%A1%E5%91%A8%E5%B9%B4%E5%A0%B1%E5%91%8A.pdf",
      "scope": "已读取全文相关部分并下载PDF、pdftotext核对与目视印刷第17页。学生资料表小六104、全校694为2024/25非现届；升中段称全级P6首三100%，同段印P4-P6字样，保留异常不扩写为小四至六或直属升读率。无逐校人数。英语文教育17.8%是学习领域课时而非MOI比例；家长自评逾九成自律等及P6情绪关注不当独立满意度或临床诊断，未有相关样本回收结构。",
      "sourceType": "school-official",
      "academicYear": "2024/25；104及首三结果保留原口径",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：2027年度小一自行原始PDF",
      "url": "https://srols.edu.hk/sites/default/files/download/2027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5_%E4%B8%8A%E8%BC%89%E7%B6%B2%E9%A0%81.pdf",
      "scope": "通过官方网页HTML定位附件并下载当前文件核对：电子9/17–26与EDB9/25截止有差异，不擅认延长；纸本9/21–25，基堤道入一楼科学室；身份、适用姊在读／母姊小学旧生、儿童天主教领洗与海外查核、真实近三月住址；11/23结果。不能以中学旧生当小学计分或父母领洗自动加分。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：2026/27小二至五插班表及须知",
      "url": "https://srols.edu.hk/sites/default/files/download/2025-26_P2-5%E6%8F%92%E7%8F%AD%E7%94%9F%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8%E5%8F%8A%E9%A0%88%E7%9F%A5.pdf",
      "scope": "URL旧2025-26，正文清楚2026/27小二至五：2026/5/23前邮寄／亲交，身份／居留、最近成绩、适用领洗，其他暂不用交；不收电邮传真重复逾期欠文件。视空缺及学术要求中英数笔试，6/14未获通知落选；不补细分题型、宗教加分权重或即时空缺。",
      "sourceType": "school-official",
      "academicYear": "2026/27入学，已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：2026/27小一候补表及须知",
      "url": "https://srols.edu.hk/sites/default/files/download/2026_27%E5%AD%B8%E5%B9%B4%E5%B0%8F%E4%B8%80%E5%80%99%E8%A3%9C%E7%94%9F%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8%E5%8F%8A%E9%A0%88%E7%9F%A5.pdf",
      "scope": "6/3–6 8–16亲交表照、身份、K3或近期成绩和适用领洗，其他资料暂不用交；6/17未收到面试通知落选。询问自行及甲乙部选择但没有硬性1-1-1、面试全邀或固定个位数名额，学校可要求选校表核实。",
      "sourceType": "school-official",
      "academicYear": "2026/27入学，已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：2026/27插班评估延期通知",
      "url": "https://www.srols.edu.hk/latest_news/st-rose-lima%E2%80%99s-school-202627-interim-admission",
      "scope": "2026/6/18因小学停课，已获邀评估改6/24 14–16:45、13:45报到；只是当轮改期，不作下一届考期、考试时长或当前空缺。",
      "sourceType": "school-official",
      "academicYear": "2026/27入学；2026-06-18通知",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣罗撒学校：2026/27小一候补面试延期通知",
      "url": "https://www.srols.edu.hk/latest_news/st-rose-lima%E2%80%99s-school-p1-admission-202627-first-round-interview",
      "scope": "2026/6/18因幼稚园停课，已邀候补首轮改6/22 14:30–16:30、14:15报到；不与插班6/24混用，不套2027/28。",
      "sourceType": "school-official",
      "academicYear": "2026/27入学；2026-06-18通知",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度小一入学单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "当届电子9/17–25、纸本9/21–25、自行11/23结果11/25–26注册；统一电子2027/1/18–24、6/2–3结果6/10–11注册。甲类必收与乙类计分、旧生与首名择一、宗教社团择一。真实住址及阶段比例不能换个人概率。",
      "sourceType": "government",
      "academicYear": "2027年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度34校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net34.pdf",
      "scope": "完整两页：圣罗撒514250、34网、自行50、基堤道4，与PSP交叉；不是41网。50为阶段计划不是最终全级或统一余额。另确认协恩附小同34网供Plan B定位。",
      "sourceType": "government",
      "academicYear": "2027年度，8/2026名册",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中制度FAQ",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "直属85%为扣除自行与重读后的剩余中一学额；一般学校网第一二组及乙部首选，超额组别随机、跨网失资格，非只限Band1、非全港一试排名或个人概率。一条龙选择外校自行／非派位直资申请或统派影响保留权，和直属不同。",
      "sourceType": "government",
      "academicYear": "2025/2027周期，2026-09文件",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "中学概览2025/26：圣罗撒书院",
      "url": "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=302",
      "scope": "沙田银城街29、资助天主教女子、英语主要教学，分科中文例外及2026/27拟开科表；升中暑期／英语衔接。不是大围地址或人人30–40分钟通勤；Band1B为非官方而非概览字段。不将中学教师或收费贴小学。",
      "sourceType": "school-profile",
      "academicYear": "2025/26；2026/27拟开科表",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "小学概览2026：玛利诺修院小学部（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=88",
      "scope": "比较使用41网、英文、资助女、直属同名中学；2026/27免学费但堂费6000／PTA100，不简单写所有资助女校零费用。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "小学概览2026：嘉诺撒圣玛利学校（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=513",
      "scope": "比较使用31网、资助女、中文含普通话及英文、一条龙圣玛利书院，非直属85%；免学费、PTA50。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "小学概览2026：天神嘉诺撒学校（比较）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=106",
      "scope": "比较使用35网非41，资助女、中文、一条龙圣玛利书院非联系25%；PTA150／核准100／补卡33按需，P3–6每级一普教中班，非全校全普通话。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "小学概览2026：协恩附小（备选）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=99",
      "scope": "仅用于34网女校Plan B身份、基督教与三种正式中学关系皆无；不能从中学附属校名推成直升或替代圣罗撒直属路径。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhhs": [
    {
      "label": "家校会《小学概览2026》：圣三一堂小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=113",
      "scope": "私立全日男女、英文、1952年、富宁街57号/17252平方米；仅联系圣公会圣三一堂中学。2025/26与2026/27均18班各级3班，每班不多于25；2025/26教师33，培训88%、学士100%、硕博41%、SEN24%。中文全普通话，数及科学英文教材英语教授；音乐ICT视艺采用英文教材，不能等同全英语授课。2026/27概览年费60000/10期，与现行收费证书61640不同。小一0测1考，小二至六0测3考；列多元活动及自设厨房。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局收费证明书：圣三一堂小学",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/131350.pdf",
      "scope": "原件一页；小一至小六每期6164、10期，总61640，自2026-09-01生效。预算按此现行核准额，不能继续写55000，也不能将概览60000作为核准最终金额。",
      "sourceType": "government",
      "academicYear": "2026/27；2026-09-01生效",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣三一堂小学：2027/28小一中文招生须知",
      "url": "https://www.htps.edu.hk/?lang=zh&page_id=814",
      "scope": "完整中文正文；2021-12-31或以前出生，2026-08-01至09-30申请；网上或亲交、近照/出生证明及非港出生护照/K2评估；100元报名不退或转让。电邮通知面试，无具体面试日；面试后两星期内电邮结果。未列现行注册金额、放弃派位承诺或固定面试题型。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣三一堂小学：2026/27插班现行简页",
      "url": "https://www.htps.edu.hk/?lang=en&page_id=1494",
      "scope": "正文现列2026/27少量学额、请向校务处查询；未列当前年级、人数、考核时长及固定截止。搜索缓存曾显示4至5月旧流程，不用于断言现时继续接受相同网申或6月考试。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣三一堂小学：S1 Allocation历年结果入口",
      "url": "https://www.htps.edu.hk/?lang=en&page_id=1476",
      "scope": "Exa读取到历年入口2025、2024至2018；仅支持学校设有历年结果入口，不支持2025图片中的具体人数或当届完整分母。本次没有读出图中名单，不用于证明56%、名校人数或无人入读某校。",
      "sourceType": "school-official",
      "academicYear": "历年入口列至2025；非当届比例证据",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页；自行网上2026-09-17至25、纸本09-21至25，结果11-23、注册11-25至26；统一派位网上2027-01-18至24、中心01-23至24，结果06-02至03、注册06-10至11。正常自行不得笔试或面试；甲乙部10%/90%分母为统一派位学额。接受直资与私校的规定不同，私校获录继续参与统筹者名单会交有关私校参考，不能一概说接受私校offer便失去官津派位资格。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中学学位分配一般事项FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；公营自行最多两所中学，统一派位按派位组别、家长选择及随机编号。直属85%/联系25%分母是扣除留班及自行分配后的余额；一般校网Band1/2、乙部首选等条件，超额仍按组别及随机编号，跨网失去保留资格。不能当作小学毕业生入读率或保证；小一网号不可直接套入升中。",
      "sourceType": "government",
      "academicYear": "2025/2027周期；2026年9月版",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhke": [
  {
    "label": "家校会《小学概览2026》：圣公会基恩小学",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=14",
    "scope": "资助全日男女、基督教、1955年、中环荷李活道109号、11小一校网、4700平方米；校长杨冠如，无一条龙/直属/联系中学。2025/26与2026/27均18班各级3；教师37，培训/学士/SEN100%、硕博46%、10年教龄86%。中文主要教学、NET与本地协作；混合能力编班；P1一测一考、P2-6一测两考。2026/27免学费，PTA50、特定用途450、补成绩表35。 2026-10-29再读全文：混合能力班、NET与本地教师协作、导修、抽离及拔尖、个别支援、早祷团契、每班家长代表会议等；未给逐科英语时数，不由中文/每级3班推英语弱或活动天然受限。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教师2025/26；2026-09-01修订",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "圣公会基恩小学：2027/28小一自行分配申请原件",
    "url": "https://www.skhkyps.edu.hk/attachment/upload/Admission/id7/attach1_2728P1Webinfo.pdf",
    "scope": "一页原件；小一3班总学额75、自行38；网上2026-09-17至25、纸本09-21至25；11-23大堂9时/电子10时公布，11-25至26注册；身份证明/住址及计分证明，宗教项包含基督教及天主教并须核实。75是公布总学额，非入读人数，38不全是计分类别对外学额。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "圣公会基恩小学：小一至小五插班程序及申请表",
    "url": "https://www.skhkyps.edu.hk/attachment/upload/files/%E6%8B%9B%E6%94%B6%E6%8F%92%E7%8F%AD%E7%94%9F%E7%B6%B2%E4%B8%8A%E5%85%A7%E5%AE%B9.pdf",
    "scope": "两页全文；小一至五；官网/校务处索表，邮寄或亲交，附申请信、身份证明、最近两年成绩及适用优秀表现纪录；交表后两星期内按空缺/原校成绩/操行/活动决定是否笔试，中英数各30至45分钟，必要时个别邀学生家长面试。未列固定申请季、保证两周录取、兄姊插班优先。",
    "sourceType": "school-official",
    "academicYear": "现行无独立学年标注的插班程序",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "圣公会基恩小学：2026/27评估政策",
    "url": "https://www.skhkyps.edu.hk/information.php?id=17",
    "scope": "正文列2026/27；P1上学期无总结性评估，下学期1测1考；P2-6全年1测2考，权重40/20/40，P1下学期测/考40/60。以个别测考通告为准。可与PSP2026交叉，未以旧校历推断本届测考次数。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "圣公会基恩小学：2025/26中学学位分配统计",
    "url": "https://www.skhkyps.edu.hk/attachment/upload/files/Admission/2025%E8%87%B32026%E5%B9%B4%E5%BA%A6%E4%B8%AD%E5%AD%B8%E5%AD%B8%E4%BD%8D%E5%88%86%E9%85%8D%E7%B5%B1%E8%A8%88_%E6%A0%A1%E7%B6%B2.pdf",
    "scope": "完整两页正文，内部PDF旧元标题虽写2008至2010，页内正文明确2025至2026。80名参与派位（男41女39）；首志愿90%、第2为1.25%、第3为3.75%、首三合计95%；超过六成获派英文主要教学或设英文班学校，不是Band1比例。列学校人数；是获派而非最终入读，是否涵盖全部毕业生及直资计入口径须确认。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整4页；自行网上2026-09-17至25、纸本09-21至25，结果11-23、注册11-25至26；统一派位网上2027-01-18至24、中心01-23至24，结果06-02至03、注册06-10至11。正常自行不得笔试或面试；甲乙部10%/90%分母为统一派位学额。接受直资与私校的规定不同，私校获录继续参与统筹者名单会交有关私校参考，不能一概说接受私校offer便失去官津派位资格。",
    "sourceType": "government",
    "academicYear": "2027/28小一；2026年8月版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/2027中学学位分配一般事项FAQ",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
    "scope": "全文已读；公营自行最多两所中学，统一派位按派位组别、家长选择及随机编号。直属85%/联系25%分母是扣除留班及自行分配后的余额；一般校网Band1/2、乙部首选等条件，超额仍按组别及随机编号，跨网失去保留资格。不能当作小学毕业生入读率或保证；小一网号不可直接套入升中。",
    "sourceType": "government",
    "academicYear": "2025/2027周期；2026年9月版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《小學概覽2026》：般咸道官立小學（基恩报告比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=21",
    "scope": "仅用于基恩第7/8章比较；沿用本批已读原件，不冒称2026-10-29重新访谈：核對11校網、校址、官立男女校、中文授課、沒有直屬中學、四所聯繫中學、校舍約3,765平方米、12間課室及2026/27每級兩班；2025/26共28名教師。這些資料不支持把校舍面積推稱為約1,700平方米，也不支持由教職員人數自行換算班師比。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班級結構；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "家校会《小学概览2026》：圣类斯中学（小学部）（基恩报告比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=18",
    "scope": "仅用于基恩第7/8章比较；沿用本批已读原件，不冒称2026-10-29重新访谈：私立男校身份、地址、直属关系；2026/27学费57000及13班、课程评估；2025/26教师24含校长及培训年资统计",
    "sourceType": "school-profile",
    "academicYear": "2026/27（教师统计2025/26）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小學概覽2026》：救恩學校（基恩报告比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=19",
    "scope": "仅用于基恩第7/8章比较；沿用本批已读原件，不冒称2026-10-29重新访谈：核對私立男女校、基督教、1946年創校、中文（包括普通話）授課、2026/27學費$75,550及2025/26教師46人與資歷。教育局列匯基書院（東九龍）為提名中學；概覽未公布固定預留學額、錄取比例或班師比。",
    "sourceType": "school-profile",
    "academicYear": "2026/27學費；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  }
],
  "skhkfp": [
    {
      "label": "家校会《小学概览2026》：圣公会基福小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=272",
      "scope": "资助全日男女、基督教、2005、40小一校网、长沙湾道555号、8000平方米，无一条龙/直属/联系；校长黄悦明博士。2025/26及2026/27各36班/各级6；编制70、教师71，师训100%、学士99%、硕博37%、SEN74%、10年以上教龄73%。P1-2学业表现平均分配，P3-6每级两班精英班；P1-3每级一位NET教读写，P1-6粤教中。免学费，非标准400，PTA每家庭50直至毕业。STEAM Lab+等设施；P1零测两考、P2-6零测三考。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26；2026-09-01修订",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度40校网自行分配学位名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net40.pdf",
      "scope": "完整两页；2026年8月版、基福学校编号554626，自行分配90；圣安德烈亦90；校网并非只有这两所圣公会学校。名额依据暂定班数，最终开班视需求，不能把90倍增当已核准总学额或最终入读数。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣公会基福小学：2026中一派位结果",
      "url": "https://www.keifook.edu.hk/it-school/php/webcms/public/index.php?lang=zh&mode=published&refid=1369",
      "scope": "全文；截至2026-08-20，参与教育局中一派位毕业生178，首志愿约89.9%、首三94.4%、首五98.3%。去向名单为举隅且明言未尽录，不能加总作完整分母、Band1比例或实际入读比例。包括SPCC1/DGS1/LSC4/上智4/铭贤8/长沙湾天主教7等。",
      "sourceType": "school-official",
      "academicYear": "2026年升中；截至2026-08-20",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣公会基福小学：2026年11月插班申请预告",
      "url": "https://www.keifook.edu.hk/it-school/php/webcms/public/index.php?lang=zh&mode=published&refid=1566",
      "scope": "实际打开正文为二至五年级申请表2026-11-02上载并开始报名；搜索摘要旧缓存写二至六，不采信摘要。10月28日尚未开放，未取得截止日/文件清单/考核/评分/各级空缺，不把通用插班做法当本校规定。",
      "sourceType": "school-official",
      "academicYear": "2026/27插班预告",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣公会基福小学：小一全年流程与旧生承继证明",
      "url": "https://www.keifook.edu.hk/it-school/php/webcms/public/index.php?lang=zh&mode=published&refid=1368",
      "scope": "原页全文读取版本仍标2026/27，列基福、基爱下午及圣纪文下午校旧生计分证明、宗教证明等。搜索缓存标2027/28，但原页读到旧时间，不能把旧正文挂新学年；此来源只用于承继校旧生关系需核实的提醒，2027日期另按教育局原件。",
      "sourceType": "school-official",
      "academicYear": "所读取正文2026/27；承继关系待当届校方核实",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整4页；自行网上2026-09-17至25、纸本09-21至25，结果11-23、注册11-25至26；统一派位网上2027-01-18至24、中心01-23至24，结果06-02至03、注册06-10至11。正常自行不得笔试或面试；甲乙部10%/90%分母为统一派位学额。接受直资与私校的规定不同，私校获录继续参与统筹者名单会交有关私校参考，不能一概说接受私校offer便失去官津派位资格。",
      "sourceType": "government",
      "academicYear": "2027/28小一；2026年8月版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中学学位分配一般事项FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "全文已读；公营自行最多两所中学，统一派位按派位组别、家长选择及随机编号。直属85%/联系25%分母是扣除留班及自行分配后的余额；一般校网Band1/2、乙部首选等条件，超额仍按组别及随机编号，跨网失去保留资格。不能当作小学毕业生入读率或保证；小一网号不可直接套入升中。",
      "sourceType": "government",
      "academicYear": "2025/2027周期；2026年9月版",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhlmc": [
    {
      "label": "家校会《小学概览2026》：浸信会沙田围吕明才小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=325",
      "scope": "学校身份与91网；2026/27收费1776及PTA50、30班；2025/26教师66含校长、年资62%；教学、BYOD、评估与联系关系",
      "sourceType": "school-profile",
      "academicYear": "2026/27（教师统计2025/26）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：入学资讯",
      "url": "https://www.bstwlmc.edu.hk/CP/pG/71/146",
      "scope": "当前2027统一派位6月2日公布；后补及插班均暂未开放，不能把已结束插班轮次作当前机会",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2027年9月小一自行分配学位递交安排",
      "url": "https://www.bstwlmc.edu.hk/CustomPage/71/小一自行分配學位遞交申請表格安排%202027九月入學.pdf",
      "scope": "电子及纸本时间、9月25日半天收件、父母宗教证明、毕业证明与同分交教育局中央处理",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2026/27上学期插班须知（2026-03-03更新）",
      "url": "https://www.bstwlmc.edu.hk/CustomPage/71/2026-2027年度上學期插班生學位申請須知_(20260303).pdf",
      "scope": "已结束小二至小五插班轮次；3月7日至4月11日、考试费75且不退、材料、邀请通知、5月笔试面试；无85分或B+门槛",
      "sourceType": "school-official",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2025–2026年度升中概况",
      "url": "https://www.bstwlmc.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=206&webPageId=117",
      "scope": "2025/26毕业生各校升读人数，包括浸信会吕明才中学40人；未拆分入读途径或另列毕业分母",
      "sourceType": "school-official",
      "academicYear": "2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2023–2025年度升中概况",
      "url": "https://www.bstwlmc.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=206&pageId=346&webPageId=117",
      "scope": "历史标题2023–2025，吕中30人；与当前页面分届保留，不能互换届别",
      "sourceType": "school-official",
      "academicYear": "2023/2025",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：评估政策",
      "url": "https://www.bstwlmc.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=204&pageId=352&webPageId=160",
      "scope": "多元评估、P1–3学期试与P4–6测验安排；与PSP2026的P2–6整体测验次数分级口径不同，需校方解释",
      "sourceType": "school-official",
      "academicYear": "网页未注明适用学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027自行分配阶段91网名册（2026年8月）",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net91.pdf",
      "scope": "本校63、一吕50、培基50、胡素贞50自行学额；暂定班数计算脚注与91网范围",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：培基小学（比较项）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=323",
      "scope": "仅更新沙吕报告比较项：无正式中学关系、小一4班、数科英语和中文普通话教学；不能保留旧联系25%承诺",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校会《小学概览2026》：浸信会吕明才小学（比较项）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=304",
      "scope": "仅比较项：1982创校、小一4班、联系浸信会吕明才中学及教学取向",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "甲类必收、计分首五项择一、宗教与社团择一、适龄分；2027统一派位与注册日期；自行不受校网限制",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中学学位分配办法常见问题（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "保留位85%／25%的扣除后余额分母、资格、乙部首选、随机编号、跨网及自行申请边界",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhlmcmps": [
    {
      "label": "家校会《小学概览2026》：圣公会吕明才纪念小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=16",
      "scope": "2026/27共20班、PTA50与核准450、无堂费；2025/26教师43含校长/编制41；分班评估、NET与无正式中学关系；EMI约65%未注明毕业年度分母",
      "sourceType": "school-profile",
      "academicYear": "2026/27（教师统计2025/26）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2027小一入学家长备忘",
      "url": "https://skhlmcmps.edu.hk/sites/default/files/download/2027年度申請小一入學家長備忘%20.pdf",
      "scope": "当届自行、注册、统一派位及6月2–8日候补安排、附选校申请表副本",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：递交2027自行分配申请注意事项",
      "url": "https://www.skhlmcmps.edu.hk/sites/default/files/download/遞交「2027年度自行分配學位申請表」注意事項.pdf",
      "scope": "旧生/兄姊证明；儿童宗教证明，未受浸儿童的父母领洗证及儿童恒常参加活动证明",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2026年度插班须知（一及二年级）",
      "url": "https://www.skhlmcmps.edu.hk/sites/default/files/download/招收2026年度插班生_一及二年級.pdf",
      "scope": "只列小一、小二；交表渠道、时间、文件、笔试面试；未列截止及即时空缺",
      "sourceType": "school-official",
      "academicYear": "2026年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2026年度插班申请表",
      "url": "https://www.skhlmcmps.edu.hk/sites/default/files/download/插班生入學申請表_2026年度.pdf",
      "scope": "材料及身份文件；内部成绩栏中、英、数，不等于公布题型或合格线",
      "sourceType": "school-official",
      "academicYear": "2026年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2024/2026六年级升中派位结果",
      "url": "https://www.skhlmcmps.edu.hk/sites/default/files/2025網頁橫額(LMCMPS升中資訊).pdf",
      "scope": "内部标题2024/2026；英皇9、圣嘉勒13、同名中学7等获派人数；不作offer或Band1概率，文件名2025不替代内文届别",
      "sourceType": "school-official",
      "academicYear": "2024/2026",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：NETs Action Plan",
      "url": "https://www.skhlmcmps.edu.hk/校本課程：nets-action-plan",
      "scope": "外籍教师早读、语文游戏、STEAM、写作、戏剧与KEYS2示例；未列2026/27全职人数及课时",
      "sourceType": "school-official",
      "academicYear": "网页未注明适用学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：评估政策",
      "url": "https://www.skhlmcmps.edu.hk/評估政策",
      "scope": "每学段考试、小一首段不考、中英默书与听说写多元评估",
      "sourceType": "school-official",
      "academicYear": "网页未注明适用学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027自行分配阶段11网名册（2026年8月）",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net11.pdf",
      "scope": "本校50及比较学校自行学额；按暂定班数计算，不能翻倍或倒推当届实际开班",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "甲类必收、计分首五项择一、宗教与社团择一、适龄分；2027统一派位与注册日期；自行不受校网限制",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中学学位分配办法常见问题（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "保留位85%／25%的扣除后余额分母、资格、乙部首选、随机编号、跨网及自行申请边界",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhlsks": [
    {
      "label": "家校会《小学概览2026》：圣公会李兆强小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=135",
      "scope": "平田校身份48网；2026/27收费PTA30核准350、30班、18特别室和礼堂；2025/26教师58含校长/编制56、硕博44%、十年80%；P1一考P2–6三考、无正式中学关系",
      "sourceType": "school-profile",
      "academicYear": "2026/27（教师统计2025/26）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2027/28小一自行分配报名须知",
      "url": "https://www.skhlsk.edu.hk/_files/ugd/a31623_559d33fbf7ff47969076d69ff9187955.pdf",
      "scope": "交表日期时间、受认可上午校旧生证明；父母或学生基督教/天主教受洗或教友证明；监理会员工文件",
      "sourceType": "school-official",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：2026/27下学期转校学位申请",
      "url": "https://www.skhlsk.edu.hk/學位申請",
      "scope": "2026-12-18截止、亲递材料、过去两年成绩、如有面试另联络；未列级别空缺或笔试门槛",
      "sourceType": "school-official",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：以英语为母语的英语教师计划",
      "url": "https://www.skhlsk.edu.hk/小學以英語為母語的英語教師計劃",
      "scope": "按初小高小协作与小组支持，网页人物不等于2026/27即时NET统计",
      "sourceType": "school-official",
      "academicYear": "网页未注明适用学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "校方：升中概况及资讯",
      "url": "https://www.skhlsk.edu.hk/升中概況",
      "scope": "已读取页面正文与图表入口；确认刊有结果图片及资讯，图片内人数未读出，不登记数字、比例或具体去向",
      "sourceType": "school-official",
      "academicYear": "页面含2025结果图片及2026资讯",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027自行分配阶段48网名册（2026年8月）",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net48.pdf",
      "scope": "本校63、德田75及比较学校自行学额；平田/德田地址分辨与暂定班额脚注",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "甲类必收、计分首五项择一、宗教与社团择一、适龄分；2027统一派位与注册日期；自行不受校网限制",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中学学位分配办法常见问题（2026年9月）",
      "url": "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf",
      "scope": "保留位85%／25%的扣除后余额分母、资格、乙部首选、随机编号、跨网及自行申请边界",
      "sourceType": "government",
      "academicYear": "2027/28",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhmfps": [
    {
      "label": "家校會《小學概覽2026》：聖公會主風小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=311",
      "scope": "完整讀取本校頁；學校身份、校址／校網、2026/27收費與班級、設施、教學語言、分班及支援、評估、三類中學關係；教師統計為2025/26學年並包括校長。頁面2026-09-01修訂。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度小一自行分配學位第91校網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net91.pdf",
      "scope": "完整讀取8/2026版；本校自行計劃學額50個；名冊註明按暫定小一班數計算、最終開班視實際需求，並非申請／取錄／實際入讀人數。本校標S小班教學，與PSP2026校本大班表述不一致，報告保留差異請校方澄清。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版（沿用同一研究會話已讀原件）；甲類必收、乙類計分、首五項只選一、舊生10與首名5不能疊加、宗教與主辦社團只選一、適齡10；申請／公布／註冊／統一派位日程及住址校網規則。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月版；自行最多兩所、統一派位按組別／志願／隨機編號；三類中學關係以概覽欄位判斷，同辦學團體不是保留通道；區分參加與非參加派位直資。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "主風：2026升中派位結果頁",
      "url": "https://www.skhhsps.edu.hk/zh_tw/site/view?name=%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D%E7%B5%90%E6%9E%9C2026",
      "scope": "讀取官方頁，並循原圖連結下載放大核對；不是只讀頁面標題。",
      "sourceType": "school-official",
      "academicYear": "2026派位（2024/2026周期）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "主風：2024/2026年度升中原圖",
      "url": "https://www.skhhsps.edu.hk/uploads/images/0710%E5%A4%A7%E5%9C%96(1).jpg",
      "scope": "下載原圖並目視全文：六年級107人、截至7月10日入讀英文授課中學55人／51%；曾肇添12、林裘謀2、喇沙1、聖傑靈1等。統一派位首志願77%、首三94%是另一口徑，沒有以107人推算志願人數。2024/2026是派位周期，不誤當兩個學年合計。",
      "sourceType": "school-official",
      "academicYear": "2026派位（2024/2026周期）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "主風：中文科課程目標",
      "url": "https://www.skhhsps.edu.hk/zh_tw/subjects/view?id=1",
      "scope": "完整讀取中文科宗旨與本年度目標，AI自主學習及價值教育；未列普教中選班細則或高小授課語言，未自行補齊。",
      "sourceType": "school-official",
      "academicYear": "未註明學年；2026-10-28在用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "主風：英文科課程目標",
      "url": "https://www.skhhsps.edu.hk/zh_tw/subjects/view?id=2",
      "scope": "完整讀取英文科目標，智能科技、數碼素養、多模態資源及自主學習；沒有公布NET人數／每周課時，不當作EMI證據。",
      "sourceType": "school-official",
      "academicYear": "未註明學年；2026-10-28在用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "主風：2025/26下學期小一及小二插班公告",
      "url": "https://www.skhhsps.edu.hk/zh_tw/news/view?id=203",
      "scope": "完整讀取2025-11-11公告內容及可供下載提示；確認屬已過期的小一小二插班輪次。附件正文未完成讀取，未登記附件，未把它套用到2026/27空缺／考核。",
      "sourceType": "school-official",
      "academicYear": "2025/26下學期；歷史公告",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhsas": [
    {
      "label": "家校會《小學概覽2026》：聖公會聖安德烈小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=274",
      "scope": "完整讀取本校頁；學校身份、校址／校網、2026/27收費與班級、設施、教學語言、分班及支援、評估、三類中學關係；教師統計為2025/26學年並包括校長。頁面2026-09-01修訂。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度小一自行分配學位第40校網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net40.pdf",
      "scope": "完整讀取8/2026版；本校自行計劃學額90個；名冊註明按暫定小一班數計算、最終開班視實際需求，並非申請／取錄／實際入讀人數。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版（沿用同一研究會話已讀原件）；甲類必收、乙類計分、首五項只選一、舊生10與首名5不能疊加、宗教與主辦社團只選一、適齡10；申請／公布／註冊／統一派位日程及住址校網規則。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月版；自行最多兩所、統一派位按組別／志願／隨機編號；三類中學關係以概覽欄位判斷，同辦學團體不是保留通道；區分參加與非參加派位直資。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：2027小一自行分配學位家長注意事項",
      "url": "https://www.skhstandrews.edu.hk/index.php?route=file/download&file_id=221",
      "scope": "下載並全文提取兩頁PDF：2026-09-21至25日紙本、09-17至25日電子；出生證／家長證／住址等；聖多馬下午校、基榮下午校及本校畢業的父母或兄姊可申報舊生10分；自行及統一均首選而未獲派者翌年六月備取時特別處理，未等同保證錄取或擴寫為甲乙部1-1-1。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：小一入學申請頁",
      "url": "https://www.skhstandrews.edu.hk/%E5%85%A5%E5%AD%B8%E8%B3%87%E8%A8%8A/%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B",
      "scope": "完整讀取官方申請頁並取得2027招生原PDF連結；未把其他未讀下載文件當已核。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：插班生申請",
      "url": "https://www.skhstandrews.edu.hk/%E5%85%A5%E5%AD%B8%E8%B3%87%E8%A8%8A/%E6%8F%92%E7%8F%AD%E7%94%9F%E7%94%B3%E8%AB%8B",
      "scope": "完整讀取：小二至小五；親身交表、出生證副本、最近兩次考試成績與活動／服務證明；面試及中英數筆試、初選再通知第二次面試。沒有截止日、即時空缺與錄取率。",
      "sourceType": "school-official",
      "academicYear": "未註明學年；2026-10-28在用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：課程特色",
      "url": "https://www.skhstandrews.edu.hk/%E5%AD%B8%E7%94%9F%E5%AD%B8%E7%BF%92/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2",
      "scope": "完整讀取：中文KWLH、小一至三繪本／高小跨課程閱讀；英文跨課程閱讀、分層寫作、表達及AR／VR／STEM／STREAM；普通話科拼音及普通話日／周。不能由活動推定普教中或全英沉浸。",
      "sourceType": "school-official",
      "academicYear": "未註明學年；2026-10-28在用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：2025/26升中概況",
      "url": "https://www.skhstandrews.edu.hk/%E5%AD%B8%E7%94%9F%E6%88%90%E5%B0%B1/%E5%8D%87%E4%B8%AD%E6%A6%82%E6%B3%81/2025-2026",
      "scope": "讀取官方頁後解析原始圖片連結，兩張原圖均下載並目視；不以文字擷取空白當作沒有公開數據。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026派位",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：2025/26升中原圖1",
      "url": "https://www.skhstandrews.edu.hk/image/catalog/2025-2026%E6%A0%A1%E5%9C%92%E7%9B%B8%E7%B0%BF/1.jpg",
      "scope": "原圖目視：首志願91%、首三志願96%；深水埗區去向及人數（黃棣珊15、張明添10、莫慶堯11、銘賢7、長天6、上智3等）。圖沒有整體畢業生總數、渠道去重與最終註冊定義，不加總拼湊Band 1率或EMI率。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026派位",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖安德烈：2025/26升中原圖2",
      "url": "https://www.skhstandrews.edu.hk/image/catalog/2025-2026%E6%A0%A1%E5%9C%92%E7%9B%B8%E7%B0%BF/2.jpg",
      "scope": "原圖目視：首志願91%、首三志願96%；跨區中學逐校人數列表。圖沒有整體畢業生總數、渠道去重與最終註冊定義，不加總拼湊Band 1率或EMI率。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026派位",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhsc": [
    {
      "label": "家校會《小學概覽2026》：聖公會聖匠小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=100",
      "scope": "完整讀取本校頁；學校身份、校址／校網、2026/27收費與班級、設施、教學語言、分班及支援、評估、三類中學關係；教師統計為2025/26學年並包括校長。頁面2026-09-01修訂。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度小一自行分配學位第34校網名冊",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net34.pdf",
      "scope": "完整讀取8/2026版；本校自行計劃學額38個；名冊註明按暫定小一班數計算、最終開班視實際需求，並非申請／取錄／實際入讀人數。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版（沿用同一研究會話已讀原件）；甲類必收、乙類計分、首五項只選一、舊生10與首名5不能疊加、宗教與主辦社團只選一、適齡10；申請／公布／註冊／統一派位日程及住址校網規則。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取2026年9月版；自行最多兩所、統一派位按組別／志願／隨機編號；三類中學關係以概覽欄位判斷，同辦學團體不是保留通道；區分參加與非參加派位直資。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：2027/28小一自行招生公告",
      "url": "https://www.hcps.edu.hk/article/563",
      "scope": "讀取2026-09-21官方公告並解析附圖；公告文字本身僅有標題，具體時間由附圖核對。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：2027小一招生原圖",
      "url": "https://www.hcps.edu.hk/upload/2026/09/fae0b371234eca13407b30060e6b0cfc.png",
      "scope": "下載目視：2026-09-21至25日親身交申請及所需文件，9:00–11:30／14:00–16:30，校址貴州街14號；不據此增補未公開候補／插班考核。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：2025/26小六升中派位結果公告",
      "url": "https://www.hcps.edu.hk/article/537",
      "scope": "讀取2026-07-07公告並取得原PDF，PDF大小19MB使web快取失敗後改公開GET下載、文字提取及整頁渲染，未把失敗本身登記為核實。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026派位",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：2025/26小六升中派位結果原PDF",
      "url": "https://www.hcps.edu.hk/upload/2026/07/0c4e88e8f2d1bf13b13ef2b521f3c44e.pdf",
      "scope": "全文文字提取並渲染目視：總65人、首志願56／86.2%、首三59／90.8%、首五63／97%、其餘2／3%；「以英語為主要教學語言中學及開設英文班中學」88%須合併口徑，不改為Band 1、全英中學或最終註冊比例。去向無逐校人數，聖匠中學在名單不等於中學關係。",
      "sourceType": "school-official",
      "academicYear": "2025/26畢業；2026派位",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：插班生申請表頁",
      "url": "https://www.hcps.edu.hk/page/735/?m=8814246636853&mid=9&s=5347969587866",
      "scope": "讀取官方頁並解析通用表格原PDF；頁沒有當屆空缺或筆試公告，未由可下載推定有位。",
      "sourceType": "school-official",
      "academicYear": "2026-10-28在用頁；表格2022-06更新",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：通用插班生申請表原PDF",
      "url": "https://www.hcps.edu.hk/upload/2023/06/006900959a97e530c5d4c40cfdc2739c.pdf",
      "scope": "全文讀取兩頁，表內標2022年6月更新、申請年度留空；身份／相片／成績表正副本／監護人證件／住址／授權書清單及家庭語言、學習需要欄。上傳2023不是招生學年，不推定2026/27空缺、開放級別、截止或考核。",
      "sourceType": "school-official",
      "academicYear": "表格2022-06更新；年度留空",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖匠：英文科Curriculum Introduction",
      "url": "https://www.hcps.edu.hk/page/822/?m=5819187532651&mid=9&s=9954172090692",
      "scope": "完整讀取英文科：校本閱讀／拼音、跨課程閱讀、電子學習、高階思維；英語日／早會、小三至六英語大使、小四至六話劇。未列NET人數及每周課時，不能當全英教學。",
      "sourceType": "school-official",
      "academicYear": "未註明學年；2026-10-28在用頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校會《小學概覽2026》：協恩中學附屬小學（比較關係）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=99",
      "scope": "完整讀取；僅用於聖匠報告同網比較中的中學關係糾錯：2026一條龍／直屬／聯繫三欄全為「-」，不能因附屬校名視為直屬協恩中學。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "家校會《小學概覽2026》：聖羅撒學校（比較關係）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=76",
      "scope": "完整讀取；僅用於聖匠報告同網比較：2026直屬中學為聖羅撒書院，不能把它與協恩附小統稱兩所帶直屬女校。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhsm": [
    {
      "label": "教育局《小学概览2026》：聖公會聖彼得小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=17",
      "scope": "核对11网、山道70及88号、1884创校、资助全日男女、无三种正式中学关系、中文教学；2026/27家教会50／核准450／补证40、36班每级6班、36课室2礼堂4操场2图书馆、占地7960平方米。2025/26教师75含校长、核准67、学士100%／硕博44%／10年以上60%／SEN65%。小一1测1考且上学期多元评估，二至六2测2考；7:55上学，周一至四15:05／周五13:30放学。教师与班数不换算课堂师生比。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：学校联系资料",
      "url": "https://www.spps.edu.hk/",
      "scope": "校方页脚确认矶法楼山道70号、彼得楼88号及联络方式，与概览交叉；首页新闻有旧日期，不能只凭首页早期插班消息代替更新的插班专题及PDF。",
      "sourceType": "school-official",
      "academicYear": "现行联系资料",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：班级结构",
      "url": "https://www.spps.edu.hk/tc/content.php?ispoint=1&wid=145",
      "scope": "校方列各级6班，与PSP2026核准36班交叉；没有实际学生总人数或当前逐级空位。",
      "sourceType": "school-official",
      "academicYear": "现行页面，未另标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：中文课程特色",
      "url": "https://www.spps.edu.hk/tc/content.php?ispoint=1&wid=339",
      "scope": "古典诗文、以西游记三国演义作语文经典、电子互动、自主学习、四至六中文写作拔尖。未列逐级粤普教学时数，不把有普通话科等同全校普教中。",
      "sourceType": "school-official",
      "academicYear": "现行学科页",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：英文Curriculum",
      "url": "https://www.spps.edu.hk/tc/content.php?ispoint=1&wid=351",
      "scope": "完整正文含高频词／拼读／词汇、DTS文本集跨科阅读、General English与NET读本、NET表达讨论辩论训练。没有逐班每日外教课表，不推每日固定时数或英文小学身份。",
      "sourceType": "school-official",
      "academicYear": "现行学科页",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：普通话课程特色",
      "url": "https://www.spps.edu.hk/tc/content.php?ispoint=1&wid=401",
      "scope": "核对三至六报幕、五六分享与小主播、游戏区、电视台、拼音与比赛。个别段落有跨科重复文字，只采用清楚对应普通话的内容，不当作每名学生同样参与量。",
      "sourceType": "school-official",
      "academicYear": "现行学科页",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2025/26升中结果8月4日更新",
      "url": "https://www.spps.edu.hk/attachment/upload/files/news/2526/25-26%E8%8B%B1%E4%B8%AD%E8%A1%A8(%E5%B1%95%E7%A4%BA)_20260804.pdf",
      "scope": "原题派往有英文班中学82%，29校获分配学额逐项列：英皇15、英华女14、圣类斯及圣嘉勒各12、圣士提反女子7、圣士提反书院4、协恩3、SPCC／DBS／皇仁／圣若瑟书院／港同各2、喇沙1等。没有完整毕业生或性别分母、逐校最终注册；不倒算人数、不重算官方Band1率。",
      "sourceType": "school-official",
      "academicYear": "2025/26，2026-08-04更新",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2025/26升中结果7月7日版本",
      "url": "https://www.spps.edu.hk/attachment/upload/files/news/2526/25-26_20260707.pdf",
      "scope": "同届早期派往有英文班中学79.2%，部分人数随后更新；保留版本差异，不把两个版本当两届或猜修订原因。报告采用8月4日82%较新版。",
      "sourceType": "school-official",
      "academicYear": "2025/26，2026-07-07",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2024/25升中结果",
      "url": "https://www.spps.edu.hk/attachment/upload/files/news/2425/2425%E8%8B%B1%E4%B8%AD%E8%A1%A803092025.pdf",
      "scope": "原题派往有英文班中学82%，2025-09-03；英皇和英华女各18等逐校获分配数。无毕业生完整分母及性别分母，不把82%等同Band1或个人概率。",
      "sourceType": "school-official",
      "academicYear": "2024/25，2025-09-03",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2023/24升中结果",
      "url": "https://intranet.spps.edu.hk/2notice&news/23-24/news/%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D%E7%B5%90%E6%9E%9C2324.pdf",
      "scope": "原题入读有英文班中学约77%、2024-07-15更新，纠正旧文把77%标成2025。分项英华女14／英皇15等，不沿用旧文15／15／14等混配表。无完整毕业生分母，不支持旧文82/144=56.94%官方Band1率。",
      "sourceType": "school-official",
      "academicYear": "2023/24，2024-07-15",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2027年9月小一入学原件",
      "url": "https://www.spps.edu.hk/attachment/upload/files/news/2627/2027_09v2.pdf",
      "scope": "2026电子9/17–25、纸本9/21–25、11/23结果、11/25–26注册、11/27备取、2027电子1/18–24、6/2–3结果6/10–11注册。唯一／主要居所及住址文件；旧生10和首名5不得叠加。宗教可儿童基督教／天主教领洗或奉献礼，或经审核父母监护人受洗加牧者证明恒常跟随聚会；非父母自动加分，非只限圣公会。自行阶段不收学习档案。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2026/27小一候补须知",
      "url": "https://www.spps.edu.hk/attachment/upload/files/news/2526/%E6%8B%9B%E6%94%B62026-2027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%80%99%E8%A3%9C%E7%94%9F_%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5.pdf",
      "scope": "2026/6/3–6亲交山道70号，不邮寄；6/13上午面试，交表即获随机场次，提前10分钟，一成人陪同；身份、学习评估、适用活动／选校存根，学生简介非必需且最多4页A4。未列固定6学额或1-1-1硬门槛；该轮已结束，不能移植2027。",
      "sourceType": "school-official",
      "academicYear": "2026/27入学，已结束轮次",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：插班资讯专题",
      "url": "https://www.spps.edu.hk/tc/content.php?ispoint=1&wid=231",
      "scope": "现行专题写2026/27下学期插班2026-10-27至11-01，与PDF交叉；比首页旧2026春季三至五消息更新。",
      "sourceType": "school-official",
      "academicYear": "2026/27下学期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣彼得小学：2026/27下学期一至五年级插班PDF",
      "url": "https://www.spps.edu.hk/attachment/upload/files/news/2627/2026-2027%E5%B9%B4%E5%BA%A6%E4%B8%8B%E5%AD%B8%E6%9C%9F%E6%8F%92%E7%8F%AD%E7%94%9F%E5%B0%87%E6%96%BC2026%E5%B9%B410%E6%9C%8827%E6%97%A5%E8%87%B311%E6%9C%881%E6%97%A5%E6%8E%A5%E5%8F%97%E5%A0%B1%E5%90%8Dv2.pdf",
      "scope": "正文一至五年级网上申请11/1 23:59截止，只收网上；初选合资格SMS及电邮邀笔试、11/27举行、通过再面试。未列75元、固定科目语言、考试时长、面试和结果日期，未进入表单递交，不沿用2025旧细则。",
      "sourceType": "school-official",
      "academicYear": "2026/27下学期；截至2026-10-28开放",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027小一入学单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "核对当届日期、甲类必收与计分、前五项择一、宗教／社团择一、适龄10、统一10%不限校网90%按居所。阶段比例不是个人概率；父母在本小学任职非额外计分项；未规定提前3–6月搬家。",
      "sourceType": "government",
      "academicYear": "2027年度，2026-08出版",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年度11校网名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net11.pdf",
      "scope": "校号513628圣彼得自行配额75，不是旧90–96或全级180–190实收。册中般咸道25、圣心资助63、基本小班派位每班25属制度额不等于课堂小组及最终人数；不倒算当前实际班额。",
      "sourceType": "government",
      "academicYear": "2027年度，8/2026名册",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中制度FAQ",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "核对自行及统一派位机制。直属85%／联系25%分母扣除重读及自行后的中一余额，须适用组别及乙部首选等条件，不是小学毕业生获录比例；跨网或超额影响资格。圣彼得无正式关系，不可把主要获派学校当联系。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局《小学概览2026》：般咸道官立小学（比较校）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=21",
      "scope": "比较用11网、官立男女、中文、2026/27每级2班；联系英皇／庇理罗士／金文泰／邓肇坚维多利亚4校。小一全科测考0、二至六表列一测两考但正文说明小六两次呈分与毕业试；仅用小学一评估与规模，不推保证。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局《小学概览2026》：嘉诺撒圣心学校资助部（比较校）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=9",
      "scope": "比较用11网、资助女、天主教、每级5班、中文含普通话及英文，直属嘉诺撒圣心书院；小一2考。纠正旧表把直属误作联系25%，不套私立部升中数字。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局《小学概览2026》：轩尼诗道官立小学（比较校）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=421",
      "scope": "比较用湾仔谭臣道169号／12网／官立男女／中文／每级5班，小一1考。联系皇仁、庇理罗士、金文泰、邓肇坚维多利亚、何东5校。不是铜锣湾同名校；不单列皇仁保证或旧65–70%估算。",
      "sourceType": "school-profile",
      "academicYear": "2026/27",
      "checkedOn": "2026-10-28"
    }
  ],
  "py2": [
  {
    "label": "教育局《小学概览2026》：香港培道小学",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=92",
    "scope": "私立全日男女校、中文/粤教中、创校1888、面积14660平方米、联系培道中学且无直属或一条龙；2026/27年费65000/PTA50、25班（4/4/5/4/4/4）；2025/26教师50及25班，学历和教龄按该年；小一零测零考、P2-P6三考。约30人是校方编制说明，非逐班实收。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；师资为2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局收费证明书：香港培道小学",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/324477.pdf",
    "scope": "小一至小六2026-09-01起年费65000，每期6500共10期；同证书幼稚园免费条款的生效日为2020-09-01，不能把幼教资助用于小学。",
    "sourceType": "government",
    "academicYear": "小学2026/27（2026-09-01生效）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "培道小学：2027/28小一入学申请",
    "url": "https://www.ptps.edu.hk/blog/news/2027-28%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/",
    "scope": "2026-08-01起报名、10-02中午12时截止、10-03上午9时起面试，时间电邮通知不可更改；2021-12-31或前出生、2027-09-01入学。截至核对日已过申请/面试日，未公布当前后补日期。",
    "sourceType": "school-official",
    "academicYear": "2027/28 P1",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "培道小学：网上小一申请指引",
    "url": "https://www.ptps.edu.hk/blog/2025/09/02/%E9%A6%99%E6%B8%AF%E5%9F%B9%E9%81%93%E5%B0%8F%E5%AD%B8-%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E6%8C%87%E5%BC%95/",
    "scope": "选择年级、电邮验证、证件及居留/入境标签、递交后仍须Visa/Mastercard或FPS缴费才完成报名；约3工作天审批为网上报名程序，不等同正式取录或面试结果。现行页面发布日期2025-09-02，不把日期升级成2026。",
    "sourceType": "school-official",
    "academicYear": "现行网上流程（2025-09-02发布）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "培道小学：2025/26毕业生升读中学一览",
    "url": "https://www.ptps.edu.hk/blog/2026/07/07/2025-2026-%E7%95%A2%E6%A5%AD%E7%94%9F%E5%8D%87%E8%AE%80%E4%B8%AD%E5%AD%B8%E4%B8%80%E8%A6%BD/",
    "scope": "官方表头入读中学/人数，49所中学逐项合计123；培道25、彭学高12、颜宝铃5、协恩2、英华1、华英2、黄笏南3、旅港开平3。合计为表内记录，不另称全届人数；未说明路径或男女分母，不能推联系学额、Band1率或offer率。",
    "sourceType": "school-official",
    "academicYear": "2025/26毕业生（2026-07-07公布）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "培道小学：中文科课程",
    "url": "https://www.ptps.edu.hk/blog/2025/09/02/chinese/",
    "scope": "当前页明确实行粤教中、中华经典及广泛阅读；不将二手语言印象当全校园英语接触时数。",
    "sourceType": "school-official",
    "academicYear": "现行课程页（2025-09-02发布）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "培道小学：英文科课程",
    "url": "https://www.ptps.edu.hk/blog/2025/09/02/%E8%8B%B1%E6%96%87%E7%A7%91/",
    "scope": "小一至小三融入Read Write Inc.，44英语音及拼合拆音；未公布每周NET分钟数或普通话教师当届测试等级。",
    "sourceType": "school-official",
    "academicYear": "现行课程页（2025-09-02发布）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/2027升中一般事项常见问题",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
    "scope": "直属85%/联系25%的分母均是扣除留级及自行分配后剩余中一学额；一般须校网Band1/2及乙部首志愿，超额依组别及随机编号，跨网会失去保留资格。不是小学毕业生实际入读率，不能保证取录。",
    "sourceType": "government",
    "academicYear": "2025/2027派位周期（2027年9月升中）",
    "checkedOn": "2026-10-28"
  }
],
  "rc": [
    {
      "label": "教育局《幼稚园概览2026/27》：高主教书院幼稚园部",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=2155380001",
      "scope": "不参加计划、当届年费40800十期；2025年9月教员26、22持学位及26具幼儿教育证书以上、上午1:10.3/下午1:6.1；校长郑美宝、9课室、北角建华街30号地下至2楼。22/26约84.6%为持学位比例，非89%幼教学士；分时段比例不作班额。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资/比例为2025年9月",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局收费证明书：高主教幼稚园部",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/215538.pdf",
      "scope": "K1-K3上午及下午均40800（4080×10），现行证书生效2023-09-01。与KGP2026/27一致，但不可将旧生效日期改成2026新证书。",
      "sourceType": "government",
      "academicYear": "现行收费，2023-09-01生效；KGP2026/27仍同额",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "高主教幼稚园部：教区官方网上收生系统",
      "url": "https://dki-rckg.catholic.edu.hk/admission",
      "scope": "2026-10-05 09时至10-16 17时网上申请，40元FPS，文件为证件照/出生及居留证明/针卡/领洗纸及校友或兄姊关系证明（如有）；按申请顺序编面见及电邮通知。页面未列具体面见日、结果日或学额，不补猜。",
      "sourceType": "school-official",
      "academicYear": "2026年秋季申请（页面正文未标独立入读学年）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "高主教幼稚园部：2025年旧届K1申请原件",
      "url": "https://www.rckg.edu.hk/?page_id=3933",
      "scope": "该页仍列2025-10-06至15申请、11-15/22面见；仅作历史收生准则：面试、在读兄姊优先、就近、天主教及校友，同时明示优先不保证取录。不能作为2026年秋季日程或当前面试日。Exa已成功读取全文。",
      "sourceType": "school-official",
      "academicYear": "2026/27 K1（2025年申请的历史页）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "高主教小学部：2024/2026升中获派情况",
      "url": "https://rcps.raimondi.edu.hk/wordpress/achievement/secondary-school-places-allocation/",
      "scope": "校方页面正文列79名小六学生获派高主教书院；是获派人数，非最终入读，未另列全届分母，不能换成79%或85%幼小中升读率。图片未读部分不算新增证据。",
      "sourceType": "school-official",
      "academicYear": "2024/2026升中周期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中一般事项常见问题",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "直属85%/联系25%的分母均是扣除留级及自行分配后剩余中一学额；一般须校网Band1/2及乙部首志愿，超额依组别及随机编号，跨网会失去保留资格。不是小学毕业生实际入读率，不能保证取录。",
      "sourceType": "government",
      "academicYear": "2025/2027派位周期（2027年9月升中）",
      "checkedOn": "2026-10-28"
    }
  ],
  "scps": [
    {
      "label": "教育局《小学概览2026》：圣嘉勒小学",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=23",
      "scope": "私立全日女校、天主教、般咸道光景台3-6号/2509平方米，直属圣嘉勒女书院；2026/27年费51000/PTA90，2025/26及2026/27各18班；2025/26教师32，培训90%、学士100%、硕博25%、SEN0，教龄41/18/41。除中文视艺体育法语外英语授课；P1-P6两测两考，小一上学期以进展评估替代测考栏为无。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资为2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局收费证明书：圣嘉勒小学",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/210021.pdf",
      "scope": "小学P1-P6每期5100×10=51000，生效日2023-09-01；同证书幼稚园2026-09-01条款与小学分开，不能把幼教免费或资助前42970用于小学。",
      "sourceType": "government",
      "academicYear": "现行小学收费2023-09-01生效；2026/27仍执行",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "圣嘉勒小学：小一、插班及学费减免原件",
      "url": "https://pri.scps.edu.hk/admission/",
      "scope": "2027/28小一3班，女孩出生2020-09-01至2021-12-31，2026-09-14至25亲交、不收邮寄/速递、10-03母语面试、11-02邮寄结果；报名100现金，补充最多2页单面A4。插班为全年邮寄，先筛选再试/面见，最多5张双面A4；不保证所有人获邀；结果电话/电邮，下学年需重申请。2026/27年费51000、2027/28可能调整，插班段旧2024收费不重标年份。减免全/半/四分一须审核。",
      "sourceType": "school-official",
      "academicYear": "2027/28 P1及现行插班；含2024/25旧收费段",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027升中一般事项常见问题",
      "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      "scope": "直属85%/联系25%的分母均是扣除留级及自行分配后剩余中一学额；一般须校网Band1/2及乙部首志愿，超额依组别及随机编号，跨网会失去保留资格。不是小学毕业生实际入读率，不能保证取录。",
      "sourceType": "government",
      "academicYear": "2025/2027派位周期（2027年9月升中）",
      "checkedOn": "2026-10-28"
    }
  ],
  "sfcs": [
    {
      "label": "家校会《小学概览2026》：嘉諾撒聖方濟各學校",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=411",
      "scope": "核对12校网、资助全日女校、湾仔圣佛兰士街42及44号、校训行仁爱显真理、直属嘉诺撒圣方济各书院；2026/27每级4班共24，家教会100/特定用途450；2025/26教师56含校长、师训学士100%、硕博31%、SEN79%、十年以上67%；7:55上课、周一至四15:30/周五14:30放学，小一2次/二至六3次考试、全科测验0。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师为2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖方濟各學校：2027/28小一与插班申请",
      "url": "https://www.sfcs.edu.hk/入學申請",
      "scope": "读取完整招生正文：2027/28ePOA9/17–25、纸本9/21–25、11/23结果，同分交教育局中央抽签；宗教证明列申请儿童领洗纸。小二至小五插班须家长信、近照、身份证明、适用领洗纸、两年各学期成绩、活动服务证明最多5页双面；先笔试后面试须家长陪同，可校务处或电邮递交，页面未列截止日期。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一；插班页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：12校网自行分配配额名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net12.pdf",
      "scope": "核对2027/28圣方济各、圣保禄天主教及玛利曼各50个自行分配配额；不是全级总学额，最终实际开班按需求批核。",
      "sourceType": "government",
      "academicYear": "2027/28；8/2026名册",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖方濟各學校：校方首页与课程入口",
      "url": "https://www.sfcs.edu.hk/",
      "scope": "读取首页经文若13:34，区分于正式校训；菜单列英语辩论、数学挑战站、IT、体艺及制服团体等16项，学生支援有灵修、训辅、公民教育、活动、学生支援分组。不由活动存在推断每名学生可自由入选。",
      "sourceType": "school-official",
      "academicYear": "现行官网未标统一学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2026中学学位分配常见问题",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
      "scope": "已读取第2–5题：一般扣除重读生及自行分配后，直属中学保留剩余学额85%，一般资格为学校网第一／第二组别及乙部首选；超额按组别及随机编号，获批跨网失去相关资格。85%不是中一总额、毕业生入读比例或自动直升保证。",
      "sourceType": "government",
      "academicYear": "2024/2026周期；2026中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "shck": [
    {
      "label": "家校会《小学概览2026》：嘉諾撒聖心學校（资助部）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=9",
      "scope": "核对坚道26号、11校网、资助全日女校、直属圣心书院；2026/27每级5班共30，家教会100/特定用途250，教师统计2025/26为59含校长、师训学士100%、硕博53%、SEN86%、十年以上64%；8:35至15:30，P1两次/P2–6三次考试、全科测验0，不混同34号私立部两测两考。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师为2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：11校网自行分配配额名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net11.pdf",
      "scope": "核对本校2027/28自行分配63、圣士提反女子附小50；不是全级总学额或实际录取人数；不能倒推统一派位余位。",
      "sourceType": "government",
      "academicYear": "2027/28；8/2026名册",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校：中文课程特色",
      "url": "https://www.shcs.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&refid=2451",
      "scope": "本校资助部中文科说明P1–3全班、P4–6部分班主要普通话授课；童书/桥梁书、六年级文言文衔接、五年级小记者及高年级粤语辩论拔尖。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校：英文课程特色",
      "url": "https://www.shcs.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&refid=2466",
      "scope": "本校资助部P1–6英文课程以阅读为基础、语境词汇语法拼读、定期外籍英语教师课与大小组活动；未宣称英文统一超前一年或无NET。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校：数学课程特色",
      "url": "https://www.shcs.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&refid=2470",
      "scope": "本校资助部以情境实作探究、解难册、分层课业与电子评估；P1–5 Fun With Maths英语词汇册、P6英文数学中小衔接；没有据此推断统一超前半年。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校：2026/27小一候补原件",
      "url": "https://www.shcs.edu.hk/it-school/php/webcms/files/upload/tinymce/202627P1_1779410297.pdf",
      "scope": "全文经Exa读取：2026/6/3–6亲临坚道26号递表，需出生证明、手册、本学年成绩、领洗纸如适用、活动证明、选校表及小一注册证；6/20面试、6/18未获电话作落选。该轮已结束，不能套为2027/28日期。",
      "sourceType": "school-official",
      "academicYear": "2026/27候补；2026年6月已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2026中学学位分配常见问题",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
      "scope": "已读取第2–5题：一般扣除重读生及自行分配后，直属中学保留剩余学额85%，一般资格为学校网第一／第二组别及乙部首选；超额按组别及随机编号，获批跨网失去相关资格。85%不是中一总额、毕业生入读比例或自动直升保证。",
      "sourceType": "government",
      "academicYear": "2024/2026周期；2026中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "shckps": [
    {
      "label": "家校会《小学概览2026》：嘉諾撒聖心學校私立部",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=10",
      "scope": "核对坚道34号、校网不适用、私立上午女校、直属圣心书院、校训道路真理生命；2026/27为18班(4/3/3/3/3/2)，学费53680十期、家教会120/报名150；2025/26教师31含校长、师训87%、学士100%、硕博29%、SEN13%、十年以上52%；7:40至12:45、每周5.5天，P1–6两测两考。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教师为2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：私立部现行收费证明210315",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/210315.pdf",
      "scope": "完整两页：P1–P6均A.M.SESSION，每期5368、十期全年53680，2025-09-01生效；2026/27概览同价。证明不应写成2026新批准，亦不混同资助部免费及全日制。",
      "sourceType": "government",
      "academicYear": "2025-09-01生效；2026/27概览同价",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校私立部：2027/28小一申请",
      "url": "https://www.shcsps.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=64&pageId=213&webPageId=53",
      "scope": "2026/8/1 09:00至9/12 17:00网上申请、近照/身份居留证明/K2下学期成绩、报名150不退，10/3面试不改不补，10/26–31电邮结果；截至10/28处于结果通知期，报名和面试均已结束。未列正式Portfolio权重或宗教计分。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校私立部：2026/27插班申请",
      "url": "https://www.shcsps.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=75&pageId=214&webPageId=53",
      "scope": "只招小三和小四、其他年级已满；2026/5/4 09:00至6/4 23:59报名，6/20笔试面试，7月上旬电邮，报名150不退；需近照、身份居留文件、上一学期成绩。该轮已结束，不作实时空缺。",
      "sourceType": "school-official",
      "academicYear": "2026/27上学期；2026年6月已结束",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "嘉諾撒聖心學校私立部：2025/26及历年升中派位原表",
      "url": "https://www.shcsps.edu.hk/CP/pG/39/45/76",
      "scope": "2025/26总76人：圣心39、英华11、圣士提反10、圣保禄5、港同4、玛利曼2、其余五校各1，合计76；首志愿92.1%、首三100%，39/76约51.3%为报告计算。2024/25为73/44，2023/24为72/38；均属私立部，不得移植资助部，不把首三100%写成Band1比例，名单含直资不能全称统一派位结果。",
      "sourceType": "school-official",
      "academicYear": "2025/26；兼列2024/25、2023/24历史数据",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2026中学学位分配常见问题",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
      "scope": "已读取第2–5题：一般扣除重读生及自行分配后，直属中学保留剩余学额85%，一般资格为学校网第一／第二组别及乙部首选；超额按组别及随机编号，获批跨网失去相关资格。85%不是中一总额、毕业生入读比例或自动直升保证。",
      "sourceType": "government",
      "academicYear": "2024/2026周期；2026中一",
      "checkedOn": "2026-10-28"
    }
  ],
  "sjacps": [
    {
      "label": "教育局《小學概覽2026》：聖若瑟英文小學（觀塘）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=148",
      "scope": "完整讀取：觀塘道57號、私立全日男校、天主教香港教區、1958創校、直屬聖若瑟英文中學、教學語言英文；2026/27全校18班每級3班；2025/26教師35人含校長；PTA$30、補發學生證$70；P1–6零次全科測驗及三次全科考試、平均編班；英文／數學／常識／科學／人文英語，中文普通話加粵語輔助；P5–6外語選修、周三及周五多元活動。未以班師比推算課堂人手。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師為2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：聖若瑟英文小學現行收費證明書（211303）",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/211303.pdf",
      "scope": "完整讀取兩頁：2026年9月1日起P1–6每期$5,870、10期全年$58,700。另列報名費$200（2024-06-03起）及註冊按金$2,500（2024-09-01起），不把不同生效日期合併寫成新批核費用。六年$352,200只為固定年費的情景，並非不加價承諾。",
      "sourceType": "government",
      "academicYear": "2026/27學費；其他費用分列2024生效",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟英文小學：2026升中分配結果",
      "url": "https://www.sjacps.edu.hk/attachment/upload/files/award/SSPA-result_2026.pdf",
      "scope": "完整讀取2021–2026圖表，另下載PDF渲染並放大核對2026版：直屬31%、其他官津英文中學37%、直資25%；三類合計93%，未公開總人數及餘下7%分類，不自行補齊、正常化或寫成Band 1比率。2026列其他主要分配聖言11%、觀塘瑪利諾11%、聖若瑟書院10%。圖注85%為中學中一餘額預留，不是小學畢業生升讀比例；圖表分配不等於offer或最終註冊。",
      "sourceType": "school-official",
      "academicYear": "2026升中；含2021–2025歷史結果",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟英文小學：2027/28小一申請系統",
      "url": "https://application.sjacps.edu.hk/",
      "scope": "完整讀取公開登入前頁面：2027/28小一網申已CLOSED；已參加面試者2026年11月16–28日查申請結果。未登入、不填表；頁面未列申請分母或當前插班空缺。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟英文小學：語境學習政策",
      "url": "https://www.sjacps.edu.hk/en/content.php?wid=45",
      "scope": "完整讀取Language-rich Environment正文：政策希望學生課內外自然使用英語與普通話，屬語境目標，不能當作固定授課百分比或每名學生實際能力。",
      "sourceType": "school-official",
      "academicYear": "校方現行網頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟英文小學：P1–6特別申請舊文件",
      "url": "https://www.sjacps.edu.hk/attachment/upload/files/admission/SpecialApplication.pdf",
      "scope": "完整讀取校方現行入口所鏈接舊文件，底部標2025–2026：身份文件、近期成績、最多5張獎狀及天主教領洗文件等。只作歷史材料參考，不證明2026/27現有空缺或受理窗口。",
      "sourceType": "school-official",
      "academicYear": "2025/26舊申請文件",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取第2、4、5題：一般扣除自行分配及重讀生學位後，直屬中學保留餘額85%；合資格須屬學校網第一或第二派位組別並在乙部首選，超額按組別與隨機編號分配，跨網失保留資格。85%不是小學畢業生實際升讀率；自行收生面試不等於統一派位保留學額程序。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期；2027年9月中一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版：甲乙類及計分互斥，校友與首名子女只擇一、父母在本小學任職為甲類；官津統一派位按真實唯一或主要住址，而非幼稚園地址。私立與官津可並行申請，但私校留位及退款條款須另確認；教育局會把私校取錄而續參加派位的名單交私校參考。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "sjps": [
    {
      "label": "教育局《小學概覽2026》：聖若瑟小學（灣仔）",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=424",
      "scope": "完整讀取：活道48號、12校網、資助男校、喇沙修士會、1968創校、校訓勤奮向善、直屬聖若瑟書院；2026/27 PTA$160及非標準項目$470、30班；2025/26教師59人含校長／教席56、師訓100%、碩博48%、十年以上65%；P1–6兩測一考、平均能力分班；35分鐘一節、每日9節、7:50–14:50。免學費不是全部開支免費。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師為2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟小學：School Profile",
      "url": "https://sjps.edu.hk/school-profile/",
      "scope": "完整讀取：資助全日男校、主要教學語言英文、1968創校、30班每級5班、現址活道48號、校監譚敏儀及校長林美琪、直屬聖若瑟書院；不與觀塘私立英文小學混同。",
      "sourceType": "school-official",
      "academicYear": "校方現行網頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟小學：中文科課程",
      "url": "https://sjps.edu.hk/2022/08/09/chinese-language/",
      "scope": "完整讀取校方現行中文科頁：中文以粵語教授、單元教學、低小繪本及先說後寫、高小指定讀本及讀寫結合。據此糾正「全科英文」；URL含2022日期，不改標成2026新文件。",
      "sourceType": "school-official",
      "academicYear": "校方現行頁；URL日期2022年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟小學：2027小一入學申請原件",
      "url": "https://storage.googleapis.com/sjps-prod-stateless/2026/09/966727dd-p1-poa-2027-school-web.pdf",
      "scope": "完整讀取四頁：2026年9月21–25日紙本（9:00–11:30及14:00–16:00）、9月17–25日電子，身份／出生與居港文件、兄長在讀及父兄畢業、領洗文件、真實唯一或主要住址證明及授權書。兩種方式起始日不同，申請已截止；沒有規定須提前3–6個月搬家。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟小學：2026/27小一特別收生面試須知",
      "url": "https://storage.googleapis.com/sjps-prod-stateless/2026/06/a4b01306-notes-on-p1-special-admission-2026-15-june.pdf",
      "scope": "完整讀取兩頁：只適用已獲電話通知者；2026年6月15日13:15報到、16:00解散、活道48號，學生單獨面試且沒有筆試；限一位家長陪同報到，有近照的幼稚園手冊／學生證及$70現金。該輪已結束，不套作2027/28安排。",
      "sourceType": "school-official",
      "academicYear": "2026/27小一特別收生歷史輪次",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟小學：2026/27小二至小五插班筆試須知",
      "url": "https://storage.googleapis.com/sjps-prod-stateless/2026/06/f00d790b-26-27網頁_插班筆試須知.pdf",
      "scope": "完整讀取兩頁：只適用校方已通知考生；2026年6月22日12:30報到、15:50解散，中文／英文／英文數學筆試，文具、附相手冊或學生證及$70現金。未列實時空缺、當前全年申請承諾或完整報名材料；不把小二至小五筆試套成小一考核。",
      "sourceType": "school-official",
      "academicYear": "2026/27 P2–5歷史輪次",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟書院：2027/28中一自行收生",
      "url": "https://www.sjc.edu.hk/admission/",
      "scope": "完整讀取：54個自行學額，2027年1月4–18日申請、2月27日全體申請者獲邀面試；學業及EDB次第25%、活動15%、操行10%、面試50%，毋須校長或教師推薦信；3月31日自行正取通知、7月6日派位結果。本小學學生按小學指示取表；54不是另保證給本小學，不與85%保留機制相加當畢業生人數。",
      "sourceType": "school-official",
      "academicYear": "2027/28中一自行",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "聖若瑟小學：校舍重建計劃官方募款頁",
      "url": "https://sites.google.com/sjps.edu.hk/e-book/home",
      "scope": "完整讀取校方首頁所連募款頁：可用空間較標準30班校舍少約30%；原目標2025年第二季撥款、第三季動工、2028年第二季完成及2028/29入新校舍，募款目標$5,000萬。屬原計劃，不足證明實際已動工或已遷黄大仙；現行校方及2027文件仍列活道48號，最新遷出及暫遷安排須另核。",
      "sourceType": "school-official",
      "academicYear": "原有重建目標時程；非當屆工程進度證據",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取第2、4、5題：一般扣除自行分配及重讀生學位後，直屬中學保留餘額85%；合資格須屬學校網第一或第二派位組別並在乙部首選，超額按組別與隨機編號分配，跨網失保留資格。85%不是小學畢業生實際升讀率；自行收生面試不等於統一派位保留學額程序。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期；2027年9月中一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版：甲乙類及計分互斥，校友與首名子女只擇一、父母在本小學任職為甲類；官津統一派位按真實唯一或主要住址，而非幼稚園地址。私立與官津可並行申請，但私校留位及退款條款須另確認；教育局會把私校取錄而續參加派位的名單交私校參考。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "skh": [
    {
      "label": "教育局《幼稚園概覽2026/27》：聖公會幼稚園新址0003",
      "url": "https://kgp2026.kindergartenprofile.com/school/?schid=1316360003",
      "scope": "完整讀取並下載原始HTML核對學校131636／校址0003：香港畢拉山金文泰道2號、12註冊課室、非牟利且不參加教育計劃。2025年9月快照校長及教師40人、上午師生比1:6.7及下午1:6.6，非新校舍即時點名。課程列全語文／英語／普通話、螺旋課程、小組及專題、持續觀察；有升小座談、小一適應及參觀、駐校社工、到校學前康復。2027/28申請欄全年接受申請，不推斷K1全年開放或各級有空缺。未列每日語言分鐘數，不採聚合站雙語沉浸比例作官方事實。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師資及比例為2025年9月快照",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：聖公會幼稚園現行收費證明書（131636）",
      "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/131636.pdf",
      "scope": "完整讀取兩頁：2026年9月1日起K1–K3上午及下午每期$10,000、10期全年$100,000，堂費欄為「-」。證書仍印中環鐵崗／東院道7號舊地址，地址不能覆蓋新KGP0003新址；費用與地址證據分開用。沒有把舊茶點$300/月、2025/26學費$71,830直接延用為當屆費用；三年$300,000只為不加價情景。",
      "sourceType": "government",
      "academicYear": "2026/27；生效2026-09-01，證書地址尚為舊址",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版：甲乙類及計分互斥，校友與首名子女只擇一、父母在本小學任職為甲類；官津統一派位按真實唯一或主要住址，而非幼稚園地址。私立與官津可並行申請，但私校留位及退款條款須另確認；教育局會把私校取錄而續參加派位的名單交私校參考。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "skhcf": [
    {
      "label": "教育局《小学概览2026》：港九街坊婦女會孫方中小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=379",
      "scope": "核对84校网、资助全日男女、1987创校、一条龙孙方中书院、2026/27核准24班每级4班；2025/26教师49、核准教席46、硕博47%、10年以上教龄49%；2026/27家教会费50／非标准450。小一2考，二至六3考，全科测验0；小五小六按成绩分班。人数与班数不是课堂师生比。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：课程特色",
      "url": "https://www.sfc.edu.hk/zh_tw/site/view?name=%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2",
      "scope": "校方列普通话与英语为教学语言，合作学习、高阶思维、各级STREAM／编程及互动黑板与移动装置。未列逐科课时，不能补猜全部数学常识只用粤语或全校全普通话。",
      "sourceType": "school-official",
      "academicYear": "现行课程页",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：中文科",
      "url": "https://www.sfc.edu.hk/zh_tw/site/view?name=%E4%B8%AD%E6%96%87",
      "scope": "核对中普结合、校本拼音教材、故事书及幼小衔接阅读识字。未量化每名学生语言成果，不使用全港最高或无缝适应的保证。",
      "sourceType": "school-official",
      "academicYear": "现行学科页",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：英文科",
      "url": "https://www.sfc.edu.hk/zh_tw/site/view?name=%E8%8B%B1%E6%96%87",
      "scope": "核对低小展示和对话到高小说故事／公开表达／辩论，NET参与Space Town及KEYS2，拼读、阅读与过程写作。未列每日NET时数，不声称每班每天固定外教授课。",
      "sourceType": "school-official",
      "academicYear": "现行学科页",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：2025/26升中志愿概况",
      "url": "https://www.sfc.edu.hk/zh_tw/site/view?name=%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D2025-2026%E5%B9%B4%E5%BA%A6",
      "scope": "官方原表2023/24首志愿87／第二7／第三4／其他2%；2024/25为91／5／3／1%；2025/26为89／4／4／3%。没有毕业生人数、逐校人数或一条龙升读与派位分项，不将前三项加总约97%写成Band1率。",
      "sourceType": "school-official",
      "academicYear": "2023/24至2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：2027/28小一入学须知",
      "url": "https://www.sfc.edu.hk/uploads/pages/8/files/27-28_AdmissionInstructions.pdf",
      "scope": "2026-09-17至25电子、21至25亲交，已结束；核对身份、住址及适用兄姊旧生证明。文件列本校84网，自行申请可跨网。不得将主办团体同名幼稚园推为小学优先权。",
      "sourceType": "school-official",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：2027/28小一时间表",
      "url": "https://www.sfc.edu.hk/site/view?name=2026-2027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E6%97%A5%E7%A8%8B%E6%99%82%E9%96%93%E8%A1%A8",
      "scope": "URL保留旧2026-2027文字，但页面标题及日期已更新2027/28；11/23自行结果、11/25–26注册、2027/1/18–24电子选校、6/2–3结果及6/10–11注册，已和教育局单张交叉。以页面正文年度为准，不从URL猜年度。",
      "sourceType": "school-official",
      "academicYear": "2027/28（页面标题及正文）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "孙方中小学：插班常设申请程序",
      "url": "https://www.sfc.edu.hk/zh_tw/site/view?name=%E6%8F%92%E7%8F%AD%E7%94%9F%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B",
      "scope": "到校／下载表后亲交；出生证明及最近成绩正副本、两张照片、回邮信封和30元行政费；获准考证和日期，考后约两周通知，一般9月初／1月中入学。页面未列本轮年级空缺或固定题型，不能写成每年4–6月全级开放。",
      "sourceType": "school-official",
      "academicYear": "常设页，未标具体招生轮次",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年九月小一入学资料单张",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "核对甲类与乙类、适龄、计分项目不可随意叠加，自行不可面试笔试；乙部按儿童住址所属校网。核对本届日程及2027/1/22补交申请截止；不按校网热度猜个人命中率。",
      "sourceType": "government",
      "academicYear": "2027年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：84校网自行分配名册",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net84.pdf",
      "scope": "孙方中学校编号115290、自行分配配额50；不是统一派位余额、实际入读人数或全级实收，不据此计算个人录取率。",
      "sourceType": "government",
      "academicYear": "2027年度小一；8/2026名册",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局第7/2014号通告：一条龙模式安排",
      "url": "https://applications.edb.gov.hk/circular/upload/EDBC/EDBC14007S.pdf",
      "scope": "一条龙中一学额应容纳小学选择升读的学生并预留外校学额；与直属／联系剩余学额85%／25%区别。政策关系不等于实际入读率、公开试或大学保证；具体手续及留级按当届学校安排确认。",
      "sourceType": "government",
      "academicYear": "现行机制文件（2014公布）",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "中学概览2025/26：孙方中书院",
      "url": "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=113",
      "scope": "核对资助男女中学、另一大埔滘校址、2025/26已开及2026/27拟开科表的中英语分科；普通话教授多门中文科目、英文教授英文电脑科学等。未提供支持旧文港三大40%／八大80%的全届分母，不作为当前大学去向来源。",
      "sourceType": "school-profile",
      "academicYear": "2025/26；2026/27为拟开科表",
      "checkedOn": "2026-10-28"
    }
  ],
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
],
  "pkps": [
    {
      "label": "家校会《小学概览2026》：培僑小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=44",
      "scope": "核对16校网、资助全日男女校、2000年创校、中文教学；三种中学关系均为“-”；2026/27为29班（小一4班、其余各5班），2025/26为30班；2025/26教师57人（含校长）、师训100%、学士98%、硕博44%；2026/27家教会费30、核准收费200、补学生证40；概览列九项行政长官卓越教学奖。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培僑小學：本校特色",
      "url": "https://www.pkps.edu.hk/#/enrollment/features",
      "scope": "已读真实网页：普通话学中文选择、Phonics/Sight Word/PLPR、外籍教师、关怀训辅；网页95.5%学位、27%已获或正修读硕士及七项外评优异未标年份，不能作现届师资及当前外评结论。",
      "sourceType": "school-official",
      "academicYear": "现行网页；介绍未标统计年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培僑小學：班级结构",
      "url": "https://www.pkps.edu.hk/#/enrollment/structure",
      "scope": "已读真实网页：官网仍称30班、每级5班、近750人，每级2至3普通话班，设班主任课及部分双班主任制；此未标年规模与2026概览29班不同，不作为当前在读快照。",
      "sourceType": "school-official",
      "academicYear": "网页未标统计年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培僑小學：入学申请方法",
      "url": "https://www.pkps.edu.hk/#/enrollment/application",
      "scope": "已读真实网页：携学生身份证明正副本、最近成绩表副本、照片一张、回邮信封亲临报名。页面未列申请年级、实时空缺、笔试或录取权重，不将清单推断为择优标准。",
      "sourceType": "school-official",
      "academicYear": "现行网页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：16校网自行分配学位名册（8/2026）",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net16.pdf",
      "scope": "核对2027/28培侨自行分配配额63（并非全级总学额）；同表爱秩序湾63、基湾50、慈幼38；名册按暂定开班数计算，实际开班按需要批核。",
      "sourceType": "government",
      "academicYear": "2027/28 小一；8/2026名册",
      "checkedOn": "2026-10-28"
    }
  ],
  "plkcastar": [
    {
      "label": "保良局建造商會學校：2026/27入学政策原件（2026-07-31）",
      "url": "https://www.plkis.edu.hk/wp-content/uploads/2026/08/2026-2027-HKCA-Po-Leung-Kuk-School-Admission-Policy-Procedures-1.pdf",
      "scope": "完整读取7页：2026/27幼稚园93200、小学125000、10期，申请费800；获offer一般5至10工作天付不退首月学费；英语能力门槛及可能自费校外ESL；非本地、兄姊、全职员工子女优先而非保证；至少70%外国护照为策略目标，非当前国籍占比；按出生日期/评估编级、持续招生、班满waiting pool。",
      "sourceType": "school-official",
      "academicYear": "2026/27；含2027/28年龄指引",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局建造商會學校：收费与额外开支",
      "url": "https://www.plkis.edu.hk/our-fees-other-costs/",
      "scope": "核对小学年费125000、幼稚园93200、申请费800；无年度征费及债券，小学另计参观、部分课外活动、车、午餐、文具校服；幼稚园另杂费6000分两期，不把无征费理解为没有额外开支。",
      "sourceType": "school-official",
      "academicYear": "现行收费页；与2026/27政策一致",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局建造商會學校：官方FAQ",
      "url": "https://www.plkis.edu.hk/frequently-asked-questions/",
      "scope": "核对Early Years/G1首轮通常45分钟，较高年级60至70分钟，G2至G5有读写及数理评估；家长问卷及面试；学校自称采用非本地课程的私立学校、拟申请国际学校地位；PLK转介措辞是working on，不能宣称正式保留学额或保证录取。FAQ亦含2022/23旧段落，未把整页视作2026全面更新。",
      "sourceType": "school-official",
      "academicYear": "现行FAQ；页面部分段落属历史",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局建造商會學校：官方课程",
      "url": "https://www.plkis.edu.hk/our-curriculum/",
      "scope": "核对英语主教学语言、普通话中文使用繁体字、数学直接教学与探究并行，按需要分层；班主任负责英语、数学、社会研究、科学。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局建造商會學校：学生曾获取录学校名单",
      "url": "https://www.plkis.edu.hk/",
      "scope": "首页列GSIS、CKY、West Island、KIS、Sha Tin College、Island School、CIS等曾获录取去向，也混列小学和海外学校；没有届别、分母、逐校人数或实际入读数，不当作完整升中成绩或成功率。",
      "sourceType": "school-official",
      "academicYear": "现行主页；名单未标届别",
      "checkedOn": "2026-10-28"
    }
  ],
  "plkcy": [
    {
      "label": "家校会《小学概览2026》：保良局陳溢小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=158",
      "scope": "核对66校网、资助全日男女、1984创校、三种中学关系均“-”；2026/27为22班（小一2班其余各4），上年24班；2025/26教师48人（含校长），师训/学士100%、硕博38%、SEN83%、十年以上65%；家教会费20、特定用途450、补卡6.90；2操场1礼堂、雨天操场空调及AI设备；小一2次、二至六4次考试，0次全年全科测验，不能等同无日常评估。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；师资2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局陳溢小學：2027小一及2026/27插班资讯",
      "url": "https://www.plkcy.edu.hk/學校資訊/入學及升中/入學資訊/",
      "scope": "完整读取2027小一行事历：6月2至3公布统一派位、6月10至11注册、6月10至16小一备取申请；网页已提供2026/27插班申请表链接。PDF下载读取失败，不宣称核实表内材料、考核或截止。",
      "sourceType": "school-official",
      "academicYear": "2027/28 小一；2026/27插班",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局陳溢小學：中文科",
      "url": "https://www.plkcy.edu.hk/學與教/課程特色/中文科/",
      "scope": "明确小一、小五小六主要粤语，二至四主要普通话；初小分层支援、一年级课后伴读、各级分层工作纸。不能由语言安排推断校方设计理由。",
      "sourceType": "school-official",
      "academicYear": "现行课程页未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局陳溢小學：上课及评估安排",
      "url": "https://www.plkcy.edu.hk/學與教/上課及評估安排/",
      "scope": "核对全日制每周49节、每日一般10节、30分钟，8:10上课，周一至四3:15、周五2:35放学；全年4次评估，一年级下学期2次。网页也保留半日制表，未将其当现行资助学校类别。",
      "sourceType": "school-official",
      "academicYear": "现行页面未标学年",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "保良局陳溢小學：2025/26升中派位结果原始海报",
      "url": "https://www.plkcy.edu.hk/wp-content/uploads/2026/10/2526%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D%E7%B5%90%E6%9E%9C%E6%94%BE%E7%B6%B2poster-1.jpg",
      "scope": "浏览器打开763×1080原图人工核看：首志愿85.42%、首三志愿97.92%，列圣保禄、德望、香岛九龙塘、佛教善德、安柱、萧明等；无总毕业人数、统计分母及逐校人数，名单含直资，不作全属统一派位或Band1比例，也不倒算人数。",
      "sourceType": "school-official",
      "academicYear": "2025/26 毕业生；2026年10月上传",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：66校网自行分配学位名册（8/2026）",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net66.pdf",
      "scope": "核对陳溢2027/28自行分配配额50，青衣共11所列校；配额依暂定开班数，不把50乘2作为2026/27实际总人数，不混同当年22班或小一2班。",
      "sourceType": "government",
      "academicYear": "2027/28 小一；8/2026名册",
      "checkedOn": "2026-10-28"
    }
  ],
  "plkflpy": [
    {
      "label": "教育局《小學概覽2026》：保良局西區婦女福利會馮李佩瑤小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=341",
      "scope": "完整讀取：71校網、資助男女校、聯繫兩所中學、校監鍾偉棠及校長胡國柱；2025/26教師48人、師訓100%、碩博15%、十年以上年資76%；2026/27全校24班；PTA$40及非標準項目$450；小一零測零考、小二至小六零測三考；初小平均分班、高小按學業成績分班；創科專才及STEAM Maker活動。2025 Robofest世界賽冠軍僅作校方概覽自述，未另讀賽事官方成績表。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師為2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "馮李佩瑤小學：2026/27下學期小二至小四插班申請表及須知",
      "url": "https://www.plkflpy.edu.hk/wp-content/uploads/2026/10/26-27二至四年級下學期插班生入學申請表格.pdf",
      "scope": "完整讀取：限P2–4、2026年11月20日截止；親交或郵寄，所需身份及居港證明、2025/26和2026/27成績等副本；11月27日15:00–17:00中英數筆試、14:45報到；12月7日或前電話通知，未獲通知作落選；曾參加本校插班試而未獲取錄毋須再申請。未公開各級學額及錄取率。",
      "sourceType": "school-official",
      "academicYear": "2026/27下學期",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取第2、4、5題：聯繫中學保留扣除自行分配及重讀生學位後餘額25%，一般須屬學校網第一或第二派位組別、乙部首選；超額按組別及隨機編號分配，跨網失保留資格。25%不是本校畢業生升讀率。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期；2027年9月中一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版：自行甲乙類及計分互斥規則；校友10分與首名子女5分只擇一，不能累加成25分；2027統一派位電子選校1月18–24日、紙本1月23–24日、6月2–3日郵遞結果及6月10–11日註冊。個別學校學額名冊並非本文件核對範圍。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "plklht": [
  {
    "label": "教育局《小學概覽2026》：保良局陸慶濤小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=214",
    "scope": "完整讀取：直資男女校、1988創校、寶林邨現址約4500平方米、一條龍羅氏基金中學；2025/26教師63人、師訓97%、碩博41%、十年以上年資63%；2026/27核准24班、雙班主任及小班；小一1測1考、小二至小六2測2考；一般35分鐘一節，每日9節，8:00–15:35。概覽學費$13,700與較新校方2026/27學費表$14,260有差，本文採後者。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：2026/27各級學費表",
    "url": "https://www.plklht.edu.hk/upload/2026/09/349f9f854d4b8e29cd797016fe56393d.pdf",
    "scope": "完整讀取2026年9月校方原件：P1–P6每月$1,426、全年$14,260、10期。與PSP2026有差，採此較新且明列學年的原件；本文件不作未來六年學費保證。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：2027年9月小一入學申請最新消息",
    "url": "https://www.plklht.edu.hk/article/519",
    "scope": "完整讀取：網上6月30日11:00至9月30日18:00；親交9月29–30日；首輪10月24或25日、11月13日或前電郵首輪結果；次輪12月5日；2027年1月上旬結果、中旬註冊。頁面一處簡介會日期有27-6-2025筆誤，下方備忘列2026年6月27日；本文不採用該錯誤日期。沒有滾動錄取或早報優先公告。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：2027/28小一申請表及須知",
    "url": "https://www.plklht.edu.hk/upload/2026/06/b9ed3c2858dc6059d78e0299f78e38be.pdf",
    "scope": "完整讀取四頁：親交日期9月29–30日、申請費$75、身份文件／成績／活動及語言能力證明（如適用）、首輪日期；2027/28學費$14,260並註明待教育局批核。不能將此表待批標示混作2026/27已發布學費表的狀態。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：2026/27下學期小一至小六插班公告",
    "url": "https://www.plklht.edu.hk/article/448",
    "scope": "完整讀取：網上10月27日12:00至11月6日18:00，親交11月5–6日；11月28日9:30–12:30評估、9:15前到校；12月10日階段結果、12月14–15日次輪、12月18–19日註冊。公告正文未列完整試卷考綱、各級空缺或申請分母；未讀附件內容，不把舊中英數題目拆解寫成當屆考綱。",
    "sourceType": "school-official",
    "academicYear": "2026/27下學期",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：一條龍政策",
    "url": "https://www.plklht.edu.hk/article/405",
    "scope": "完整讀取：校方明列不設呈分試、不參加教育局中學統一派位、100%小六畢業生直升羅氏基金，提供12年銜接課程。100%為校方路徑表述，沒有當屆實際畢業及註冊分母；報告改寫成可選擇直升，不用作實際升讀率。",
    "sourceType": "school-official",
    "academicYear": "校方現行政策頁",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：新校舍資訊",
    "url": "https://www.plklht.edu.hk/article/451",
    "scope": "完整讀取：安達臣道新址約7000平方米、30課室，STEAM創客、科學探索／實驗室、環境教育、溫室及劇院演奏空間；2025年8月18日開工、預計2028/29落成及遷入，附至2026年8月工地相。屬預期，未啟用，不把規劃設施當作現址設備。",
    "sourceType": "school-official",
    "academicYear": "預計2028/29；頁面更新至2026年",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "陸慶濤小學：教學語言政策",
    "url": "https://www.plklht.edu.hk/upload/2023/03/68fbba5c865131bafaf647a881235279.pdf",
    "scope": "完整讀取官網現行連結的政策原件：P1–6中文普通話；英文、科學、音樂英語；數學粵語配以英語；綜合人文、視藝、體育粵語，STEAM為P3–6粵語。上傳路徑為2023/03，不改標成2026年新文件；與PSP2026全面普教中及科學英語授課欄互相參照。",
    "sourceType": "school-official",
    "academicYear": "官網現行文件；上傳2023年3月",
    "checkedOn": "2026-10-28"
  }
],
  "plkshsn": [
    {
      "label": "教育局《小學概覽2026》：保良局何壽南小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=447",
      "scope": "完整讀取：34校網、資助男女校、聯繫保良局第一張永慶中學、校監黎惠蓮及校長陳紫霞；2025/26教師60人、師訓98%、碩博55%、十年以上年資72%；2026/27全校30班、PTA$30及非標準項目$450；P1粵教中，P2–6每級兩班普教中；P4–6按成績及語言班分流，P6原班升級；P1零測兩考、P2–6零測三考。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；教師為2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2025/2027年度中學學位分配辦法常見問題",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
      "scope": "完整讀取第2、4、5題：聯繫中學保留扣除自行分配及重讀生學位後餘額25%，一般須屬學校網第一或第二派位組別、乙部首選；超額按組別及隨機編號分配，跨網失保留資格。25%不是本校畢業生升讀率。",
      "sourceType": "government",
      "academicYear": "2025/2027升中周期；2027年9月中一",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "完整讀取2026年8月版：自行甲乙類及計分互斥規則；校友10分與首名子女5分只擇一，不能累加成25分；2027統一派位電子選校1月18–24日、紙本1月23–24日、6月2–3日郵遞結果及6月10–11日註冊。個別學校學額名冊並非本文件核對範圍。",
      "sourceType": "government",
      "academicYear": "2027/28小一",
      "checkedOn": "2026-10-28"
    }
  ],
  "puikei": [
    {
      "label": "教育局《小學概覽2026》：培基小學",
      "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=323",
      "scope": "核對91校網、資助男女校、2025/26教師56人、核准教席48個、10年以上教齡45%、2026/27核准24班及收費。三種中學關係均未列，不能將同辦學團體培基書院套用25%保留制度；中文普通話、數學科學主要用英語，高小另有能力分組。教齡不是本校服務年資或流失率。",
      "sourceType": "school-profile",
      "academicYear": "2026/27；師資2025/26",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培基小學：數學科教學語言與支援",
      "url": "https://www.pooikei.edu.hk/tc/content.php?wid=71",
      "scope": "校方寫以英語授課；部分小四至小六學生以粵語分組，另設補底和增潤。與中文概覽的主要英語教學互證，但不寫作每名學生全程全英文。",
      "sourceType": "school-official",
      "academicYear": "校方現行學科頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培基小學：科學科",
      "url": "https://www.pooikei.edu.hk/tc/content.php?wid=73",
      "scope": "核對以英語作教學語言及探究式實驗、參觀和專題學習；未據此量化英文課時或超前教學年數。",
      "sourceType": "school-official",
      "academicYear": "校方現行學科頁",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培基小學：2024/2026年度中學學位分配結果節錄",
      "url": "https://www.pooikei.edu.hk/attachment/upload/files/%E6%88%90%E6%9E%9C%E5%88%86%E4%BA%AB/%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D/2026_%E7%B6%B2%E9%A0%81%E6%B4%BE%E4%BD%8D%E6%88%90%E7%B8%BE%E5%85%AC%E4%BD%88_%E6%9B%B4%E6%96%B0_1__1791172413.pdf",
      "scope": "截至2026-07-17；自行分配及首三志願合併口徑96.4%、英語主要授課中學約76.57%；去向前三沙田崇真13、培基書院11、曾肇添7人。標題為節錄，沒有全屆分母，不倒算Band1率或個人錄取率。",
      "sourceType": "school-official",
      "academicYear": "2024/2026年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "教育局：申請2027年9月小一入學資料單張",
      "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
      "scope": "核對自行必收類別、計分各項不能任意疊加、適齡10分；自行階段不可筆試面試；統一派位乙部以居住地址所屬小一校網為準。核對2027選校及放榜註冊日期。",
      "sourceType": "government",
      "academicYear": "2027年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培基小學：2027年度自行分配申請通知",
      "url": "https://www.pooikei.edu.hk/attachment/news/1788824282x2sXy.pdf",
      "scope": "標題2027，列2026年9月17至25日電子、21至25日紙本及11月23日放榜；部分內文誤寫2026年度，日期已與教育局2027單張交叉，不照抄年度筆誤。",
      "sourceType": "school-official",
      "academicYear": "2027年度",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培基小學：2026/27小一上學期插班程序",
      "url": "https://www.pooikei.edu.hk/attachment/news/1788748098kba0l.pdf",
      "scope": "本輪2026-09-11中午截止；近照、兩年成績及最多4頁活動證明；視學額安排入學試，獲邀後HK$40；9月30日前未獲通知即未安排，不推斷全年空缺。",
      "sourceType": "school-official",
      "academicYear": "2026/27上學期；本輪已截止",
      "checkedOn": "2026-10-28"
    },
    {
      "label": "培基小學：2026/27小五上學期插班程序",
      "url": "https://www.pooikei.edu.hk/attachment/news/1788752567CPTfu.pdf",
      "scope": "小五、2026-09-11中午截止、文件和入學試通知規定。原件另寫8月安排考試，與截止日期時序衝突，報告不自行指定考試日，須按校方個別確認。",
      "sourceType": "school-official",
      "academicYear": "2026/27上學期；本輪已截止",
      "checkedOn": "2026-10-28"
    }
  ],
  "mtc": [
  {
    "label": "教育局《小學概覽2026》：馬頭涌官立小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=74",
    "scope": "核對34校網、官立全日男女校、中文教學、無直屬或一條龍中學、聯繫伊利沙伯中學／何文田官立中學／賽馬會官立中學、2026/27 PTA費HK$80、2025/26教師55人及核准教席54個、2026/27核准30班、P1零測零考及P2-P6每年兩次考試。未提供班師比，不作換算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；師資為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "馬頭涌官立小學：小一入學及候補資訊",
    "url": "https://www.mtcgps.edu.hk/",
    "scope": "校方網站列有2027小一入學、自行分配、統一派位、候補及插班資訊入口；具體日期按當屆公告核對，不能沿用2026/27候補生日期。",
    "sourceType": "school-official",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  }
],
  "mtcps": [
  {
    "label": "教育局《小學概覽2026》：馬頭涌官立小學（紅磡灣）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=102",
    "scope": "核對35校網、官立全日男女校、中文教學、無直屬或一條龍中學、聯繫伊利沙伯中學／何文田官立中學／賽馬會官立中學、2026/27 PTA費HK$50及校本管理費HK$200、視藝費HK$70、2025/26教師54人及核准教席53個、2026/27核准30班、P1零測零考及P2-P6每年三次考試。未提供班師比，不作換算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；師資為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "馬頭涌官立小學（紅磡灣）：2026/27小一候補生須知",
    "url": "https://www.mtcgps.edu.hk/attachment/upload/files/%E5%AD%B8%E6%A0%A1%E8%B3%87%E8%A8%8A/%E5%B0%8F%E4%B8%80%E8%B3%87%E8%A8%8A/2026%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8_%E5%B0%8F%E4%B8%80%E5%80%99%E8%A3%9C%E7%94%9F%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5_2.pdf",
    "scope": "核對2026/27小一候補申請於2026年6月4日至11日收件，須交註冊證、派位記錄及K1-K3成績等。此輪已結束，只作歷史流程參考，不代表2027/28安排。",
    "sourceType": "school-official",
    "academicYear": "2026/27小一候補",
    "checkedOn": "2026-10-28"
  }
],
  "munsang": [
    {
      label: "教育局《幼稚園概覽2026/27》：民生書院幼稚園",
      url: "https://kgp2026.kindergartenprofile.com/school/?schid=5754100001",
      scope: "核對學校登記、PN、2026/27 K1-K3半日全年學費HK$53,390（10期），以及2025年9月上午594人、下午584人的在讀快照；人數不是申請學額、競爭比例或畢業生分母。",
      sourceType: "school-profile",
      academicYear: "2026/27；在讀人數快照為2025年9月",
      checkedOn: "2026-10-28",
    },
    {
      label: "民生書院幼稚園：班制與師生比例",
      url: "https://kindergarten.munsang.edu.hk/index.php?pid=np-69",
      scope: "校方2026/27頁列師生比例1:10.3，K1-K3上午及下午均為英語／粵語雙語班；該比例不是每班人數，也不證明固定NET或助教配置。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "民生書院幼稚園：2027/28 K1招生安排",
      url: "https://kindergarten.munsang.edu.hk/index.php?lang=zh&pid=np-80",
      scope: "核對2027/28出生日期範圍、網上申請已截止、2026年10月29日查面見時段、11月7日或14日個別及小組面見、學校明列收生考慮、12月12日放榜及12月19日註冊。未公布申請人數、名額或錄取率。",
      sourceType: "school-official",
      academicYear: "2027/28 K1",
      checkedOn: "2026-10-28",
    },
    {
      label: "民生書院幼稚園：小一銜接",
      url: "https://kindergarten.munsang.edu.hk/index.php?lang=zh&pid=np-65",
      scope: "校方稱民生書院小學預留不少於85%小一學額，優先取錄本校幼稚園學生；这是小学学额预留比例，不是毕业生升读率或录取保证，资格细则及届别分母未公开。",
      sourceType: "school-official",
      academicYear: "校方現行網頁",
      checkedOn: "2026-10-28",
    },
  ],
  "ngwah": [
    {
      label: "教育局《小學概覽2026》：天主教伍華小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=446",
      scope: "核對43校網、資助全日男女校、天主教、中文教學、直屬天主教伍華中學、2025/26學年教師43人及2026/27核准23班；概覽註明2026年9月起與天主教博智小學合併。班數按學年分列，不把合併前資料當作合併後校況。",
      sourceType: "school-profile",
      academicYear: "2026/27；師資為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "天主教伍華小學官方網站",
      url: "https://www.nwcps.edu.hk/",
      scope: "校方當屆活動與學校公告入口；有關合併後安排，以學校最新通告為準。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
  ],
  "olps": [
    {
      label: "教育局《小學概覽2026》：聖母小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=455",
      scope: "核對私立全日女校、非適用校網、天主教、聖母書院為feeder secondary school、2026/27全年學費HK$48,300（10期）、PTA費HK$70、非標準項目費HK$9,000、2025/26教師20人、2026/27核准13班、中文及英文教學及校車資料。教師人數不換算為班師比。",
      sourceType: "school-profile",
      academicYear: "2026/27；師資為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "聖母小學：入學方法及2025/26學費",
      url: "https://www.olps.edu.hk/CP/pG/8/9/12",
      scope: "校方公開入學方法及舊年度學費資料；當屆收生日期和費用以校方最新公告及教育局概覽為準。本批不以舊學費覆蓋2026/27教育局數字。",
      sourceType: "school-official",
      academicYear: "校方網頁；舊學費標示2025/26",
      checkedOn: "2026-10-28",
    },
  ],
  "pb": [
  {
    "label": "教育局《幼稚園概覽2026/27》：寶血幼稚園（跑馬地）",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=1330190001",
    "scope": "按校號133019及校址0001核對跑馬地地址、非牟利、2026/27半日免費學費；2025年9月教師20人、師生比例上午1:13.6／下午1:4.8，幼兒服務列沒有提供2–3歲服務。現行原件未列完整語言課時，不用舊目錄的1:13.8取代現行資料。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；師資及在讀人數為2025年9月快照",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "寶血幼稚園：課程特色",
    "url": "https://www.pbk.edu.hk/curriculum/curriculum.html",
    "scope": "校方課程自述；只按校方公布介紹教學理念，不延伸成家長口碑或升小成效證據。",
    "sourceType": "school-official",
    "academicYear": "校方現行網頁",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "寶血幼稚園：2024/25學校報告及2025/26發展計劃",
    "url": "https://pbk.edu.hk/site/publicinfo/report/%E5%AF%B6%E8%A1%80%E5%B9%BC%E7%A8%9A%E5%9C%92_%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A24-25%E5%8F%8A%E5%AD%B8%E6%A0%A1%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%8325-26.pdf",
    "scope": "只用於呈現2024/25學年內的特定支援與活動記錄；不當作2026/27每年必然延續的服務承諾。",
    "sourceType": "school-official",
    "academicYear": "2024/25報告；2025/26計劃",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "寶血幼稚園：2024/25升讀小一概況",
    "url": "https://info.pbk.edu.hk/primary1.php",
    "scope": "校方145份問卷、120人參加派位、14人自行投考；寶血小學35人（自行19、統一7、叩門9），並列其他實際去向。問卷數不是全屆畢業生分母，叩門人數不證明優先取錄或成功率。",
    "sourceType": "school-official",
    "academicYear": "2024/25",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "寶血幼稚園：普通話科",
    "url": "https://pbk.edu.hk/curriculum/mandarin.html",
    "scope": "普通話作初步接觸及聽說興趣培養，設遊戲、兒歌及活動；頁面未標完整時數及適用學年，不能把獨立科目延伸為普通話主導或英普沉浸課程。",
    "sourceType": "school-official",
    "academicYear": "校方現行網頁；未列完整年度課時",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度小一入學資料單張",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "小一學校網按兒童居住地址填報；幼稚園所在地及就讀學籍不會賦予12校網乙部資格。宗教分須符合辦學團體定義，並非讀同團體幼稚園便可取得。",
    "sourceType": "government",
    "academicYear": "2027年度",
    "checkedOn": "2026-10-28"
  }
],
  "mc": [
    {
      label: "教育局《小學概覽2026》：循道學校",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=507",
      scope: "核對31校網、資助全日男女校、基督教、中文教學、無直屬／聯系／一條龍中學、校車及保姆車、2026/27 PTA費HK$50與非標準項目費HK$450；教師資料為2025/26學年49人、核准教席47個；2025/26與2026/27各24班；P1每年2次考試、P2-P6每年3次。教師數字不換算為師生比。",
      sourceType: "school-profile",
      academicYear: "2026/27；師資及實際班數為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "循道學校：2024/2026年度升中派位概況",
      url: "https://www.kmsch.edu.hk/tc/content.php?wid=245",
      scope: "校方頁面列稱超過75%學生獲派EMI或設英文班中學、94.5%獲派首志願，並列出逐校括號人數；頁面沒有畢業生總數、分母、計算口徑或個別學生錄取率，故只作校方公布結果呈現，不推算升中率或個人機會。",
      sourceType: "school-official",
      academicYear: "校方頁標示2024/2026年度；更新至7月30日",
      checkedOn: "2026-10-28",
    },
    {
      label: "教育局：2027年度小一入學統籌辦法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/primary-1-admission/",
      scope: "核對2027年度自行分配學位申請已結束、2026-11-23公布結果、11-25至26註冊，以及尚未遞交申請者須於2027-01-22前遞交方可參與統一派位。時間表只適用2027年度，不外推至下一屆。",
      sourceType: "government",
      academicYear: "2027年度小一入學",
      checkedOn: "2026-10-28",
    },
  ],
  "mingwai": [
  {
    "label": "教育局《幼稚園概覽2026/27》：明慧國際幼稚園（北角主校）",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5669770001",
    "scope": "核對北角主校名稱、地址、PN服務及2026/27 K1-K3半日全年學費HK$62,810、全日HK$71,060（11期）。本轮收费表按概览记录呈现；PN费用不在可核对记录中，未作推算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；在读人数快照为2025年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《幼稚園概覽2026/27》：明慧國際幼稚園（北角分校）",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5673290001",
    "scope": "核对北角分校名称、地址、PN服务及2026/27 K1-K3半日全年学费HK$78,980、全日HK$136,972（11期）；在读人数为2025年9月快照，不代表学额或申请竞争程度。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；在读人数快照为2025年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《幼稚園概覽2026/27》：明慧國際幼稚園（太子分校）",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5834210001",
    "scope": "核对太子分校名称、地址、PN服务及2026/27 K1-K3半日全年学费HK$78,760、全日HK$135,850（11期）；在读人数为2025年9月快照，不代表学额或申请竞争程度。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；在读人数快照为2025年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "明慧：校舍、课程及招生资料",
    "url": "https://www.mingwai.edu.hk/",
    "scope": "校方网站区分三所幼稚园及另设的preschool单位；介绍课程依香港幼儿教育指引、融入Cambridge English，并列英语／粤语或英语／普通话教师及日语课程。校方没有在该简介中提供各校舍统一课时或相同比例，故报告不将其概括为三校舍完全相同的四语沉浸课程。",
    "sourceType": "school-official",
    "academicYear": "校方现行网页资料",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "明慧：学生小学去向名单",
    "url": "https://www.mingwai.edu.hk/primary-school-placement-list/",
    "scope": "校方公布按国际、私立、直资、资助及官立分类的小学名单；网页未标毕业年度、校舍分项、毕业生人数或各校录取／最终入读人数。只可视为曾列去向学校，不作成功率、毕业生比例或逐校竞争力推断。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "明慧：北角及太子招生资料",
    "url": "https://www.mingwai.edu.hk/how-to-apply/north-point-admissions/admissions-information/",
    "scope": "核对校方公开的申请方式及申请材料：现场／邮寄或网上递交、出生证明、住址证明及HK$40申请费。页面未提供当前学年统一截止日期或录取率，报告不外推往年日程。",
    "sourceType": "school-official",
    "academicYear": "校方现行招生网页",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：明慧幼稚園家長討論（歷史留言）",
    "url": "https://m.edu-kingdom.com/post.php?fid=6&page=2&tid=3859842",
    "scope": "歷史家長討論只作個別經驗及家長訪校提問線索；樣本身份和代表性未能確認，不支持現時教學質素、全體家長口碑或錄取難度結論。",
    "sourceType": "parent-discussion",
    "academicYear": "2021年討論",
    "checkedOn": "2026-10-28"
  }
],
  "mosllps": [
  {
    "label": "教育局《小學概覽2026》：馬鞍山靈糧小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=320",
    "scope": "核對89校網、資助男女校、中文及英文、沒有一條龍／直屬／聯系中學、保姆車、2026/27非標準項目校本管理費HK$450（每學期HK$225）、校舍與設施；師資為2025/26學年63人、核准教席60個，教師培訓及學士100%、碩博36%、十年以上年資56%；2026/27核准31班（P4六班，其餘各五班）；P1每年1次考試、P2-P6每年3次。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班數為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度小一入學統籌辦法及校網小學名冊",
    "url": "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/primary-1-admission/",
    "scope": "核對2027年度自行分配學位程序與當屆時程；本校63個自行分配學額作暫定名額呈現，不等同全校小一容量、實際申請人數或錄取率。自行申請已結束，結果於2026-11-23公布；未遞交申請者須於2027-01-22前遞交以參與統一派位。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "馬鞍山靈糧小學：小一自行分配學位講座及校園體驗日",
    "url": "https://mosllps.edu.hk/",
    "scope": "校方首頁列出2026-08-03自行分配學位選校策略講座暨校園生活體驗日。這是已結束活動資訊，不構成招生偏好或個別申請結果的證據。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一招生宣傳活動",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "馬鞍山靈糧小學：升中派位資料入口",
    "url": "https://mosllps.edu.hk/index.php?s=1_318",
    "scope": "校方設有升中派位資訊頁；本輪未能從該頁取得可核實的最新屆別畢業生分母、逐校人數及升中組別統計，因此不更新升中比例、不替代為估算值。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/2027中学学位分配常见问题原件",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "已读全文并复用同批政策原件：中一自行最多两所参加派位中学；统一按派位组别、家长志愿与随机编号，乙部中学学校网原则按小学行政区；不是小一网号。非派位直资及一条龙外报后果分别按条款，不能统一当所有私立路线。",
    "sourceType": "government",
    "academicYear": "2027年9月中一；2026年9月文件",
    "checkedOn": "2026-10-28"
  }
],
  "edujcps": [
  {
    "label": "教育局《小學概覽2026》：香港教育大學賽馬會小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=370",
    "scope": "核對84校網、資助男女校、辦學團體、創校、校舍、收費、教學語言、無一條龍／直屬／聯繫中學、2025/26學年教師50人（師訓96%、碩博48%、特殊教育培訓80%、十年以上年資54%）及兩學年均24班。數字以概覽所列年度為準，不據教師比例推斷教學成效。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "香港教育大學賽馬會小學：中學學位分配概況",
    "url": "https://edujcps.edu.hk/CP/pG/2/2/16",
    "scope": "校方頁面列出2025/26屆升中概況入口，標示日期2026-07-07；本輪未能讀取附件中的逐校人數與畢業生分母，因此不轉寫派位比例或Banding分布。頁面亦列出更早年度資料。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：香港教育大學賽馬會小學家長討論",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3834773",
    "scope": "舊有升中及家長討論，只作歷史線索；年代久遠、非現時家庭經驗樣本，不據此形成當前口碑共識。",
    "sourceType": "parent-discussion",
    "academicYear": "約2020年討論",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  }
],
  "evangel": [
  {
    "label": "教育局《小學概覽2026》：播道書院",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=235",
    "scope": "核對直資、一條龍中學、英文為主要教學語言、校址及設施；2026/27小學學費$26,000、PTA費$60；2025/26教師73人（師訓99%、學士64%、碩博36%、特殊教育培訓95%、十年以上年資69%）；2025/26及2026/27均30班。官方概覽列有校車服務。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費及核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "播道書院：2027/28年度小一招生安排",
    "url": "https://www.evangel.edu.hk/admission2728_p1_chi.html",
    "scope": "校方列明申請期為2026-06-15至2026-07-31，現已截止；小學2026/27全年學費$26,000，分10期；校方稱小六學生原校升讀中學部，並自2022/23學年小一開始不參加統一派位及呈分試。不可将单一届别制度假设外推到其他入学年份。",
    "sourceType": "school-official",
    "academicYear": "2027/28入學；2026/27學費",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "播道書院：中一招生安排",
    "url": "https://www.evangel.edu.hk/admission2627_s1_eng.html",
    "scope": "校方列明2027/28中一申請期為2026-10-23至2026-11-20，並說明申請不受校網限制、不參加中一派位；不將中一年度的學費與小學學費混淆。",
    "sourceType": "school-official",
    "academicYear": "2027/28中一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：播道書院家長討論",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3882116",
    "scope": "2024年討論主要涉及小一第二輪面試與申請資訊，未提供可代表整體家長的校內體驗結論；不得支持現時師資流動、教學質素或錄取率判斷。",
    "sourceType": "parent-discussion",
    "academicYear": "2024年討論",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：播道書院家長分享（舊討論）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2180379",
    "scope": "約2010年的個別用家討論，年代久遠且樣本有限，只作歷史口碑線索；不据此写作现时普遍体验或教师流动结论。",
    "sourceType": "parent-discussion",
    "academicYear": "約2010年討論",
    "checkedOn": "2026-10-28"
  }
],
  "fkgs": [
  {
    "label": "教育局《小學概覽2026》：福榮街官立小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=261",
    "scope": "核對40校網、官立男女校、中文授課、四所聯繫中學、校址、設施及收費；2025/26教師46人（師訓100%、碩博40%、特殊教育培訓82%、十年以上年資78%），實際22班；2026/27核准20班，其中小一2班。中學Banding不屬教育局評級。",
    "sourceType": "school-profile",
    "academicYear": "2026/27核准班數；教師及實際班數為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：中學學位分配辦法家長須知",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/NotesForParents_tc_2025.pdf",
    "scope": "核對聯繫中學保留學額的算法：扣除重讀生與自行分配學位後，從餘額中為聯繫小學保留25%；資格受派位組別、志願次序和派位規則約束。不能寫成中一總學額的25%，也不代表保證入讀。",
    "sourceType": "government",
    "academicYear": "2025/27中學學位分配周期",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "福榮街官立小學：2025–2028學校發展計劃",
    "url": "https://www.fwsgps.edu.hk/wp-content/uploads/2025/07/2025-28%E5%AD%B8%E6%A0%A1%E4%B8%89%E5%B9%B4%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83.pdf",
    "scope": "校方文件說明學校近年發展重點與教學方向，屬學校規劃文件，不能視作已實現的學習成效。",
    "sourceType": "school-official",
    "academicYear": "2025–2028",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：40校網選校討論（含福榮街官立小學）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3883182",
    "scope": "2026年校網選校及派位資訊討論，不是校內家長體驗評價；口碑樣本仍不足，不據此形成家長滿意度結論。",
    "sourceType": "parent-discussion",
    "academicYear": "2026年討論",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  }
],
"fssas": [
  {
    "label": "教育局《小學概覽2026》：福建中學附屬學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=150",
    "scope": "核對直資男女校、英語為主要教學語言、一條龍中學、校車、2026/27學費$45,800、教師86人（2025/26）、19位外籍教師、24班及小班安排。教師總數不能換算為個別課堂師生比。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費及核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "福建中學附屬學校：升讀中學說明",
    "url": "https://www.fssas.edu.hk/en/content.php?wid=227",
    "scope": "校方稱達到要求的學生多數獲福建中學錄取，亦可選擇參加中學學位分配；未公布直升比例及分母，不據此估算80%或20%。",
    "sourceType": "school-official",
    "academicYear": "當前校方招生說明",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "福建中學附屬學校：招生安排",
    "url": "https://www.fssas.edu.hk/tc/content.php?wid=115",
    "scope": "核對校方公開的小一當屆招生流程；日期逐年更新。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：福建中學附屬學校家長討論",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2210159",
    "scope": "舊討論只作歷史個別意見，不支持現時師資、課業或錄取比例的普遍結論。",
    "sourceType": "parent-discussion",
    "academicYear": "約2010年",
    "checkedOn": "2026-10-28"
  }
],
"goodhealth": [
  {
    "label": "康傑：馬鞍山校舍課程與學制",
    "url": "https://mos.good-health.edu.hk/class/",
    "scope": "校方列半日及全日課程、中英雙語、粵語及英語教學，中文課程含普通話活動；未列固定英語時數。",
    "sourceType": "school-official",
    "academicYear": "現行網站資料",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "康傑：青衣校舍課程與學制",
    "url": "https://ty.good-health.edu.hk/class/",
    "scope": "校方列半日及全日課程、中英雙語及兩文三語安排；未公布固定英語分鐘數。",
    "sourceType": "school-official",
    "academicYear": "現行網站資料",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "康傑：青衣南校舍課程與學制",
    "url": "https://tys.good-health.edu.hk/class/",
    "scope": "核對青衣南分校課程、半日及全日班、語言安排與校址；不把幼兒中心計作幼稚園分校。",
    "sourceType": "school-official",
    "academicYear": "現行網站資料",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：康傑馬鞍山校舍2025/26收費證明",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/231657.pdf",
    "scope": "核對半日班每年學費$58,850（11期），只適用此校舍及班制。",
    "sourceType": "government",
    "academicYear": "2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：康傑青衣校舍2025/26收費證明",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/231614.pdf",
    "scope": "核對半日班每年學費$54,890（11期），只適用此校舍及班制。",
    "sourceType": "government",
    "academicYear": "2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：康傑青衣南校舍2025/26收費證明",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/609919.pdf",
    "scope": "核對半日班學費$60,500、全日班學費$89,100（每年）；膳食費另計。",
    "sourceType": "government",
    "academicYear": "2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "康傑：分校及招生資料",
    "url": "https://tys.good-health.edu.hk/admission/",
    "scope": "校方列馬鞍山、青衣、青衣南三所幼稚園；機構另有幼兒中心，不合併計作幼稚園分校。",
    "sourceType": "school-official",
    "academicYear": "2027/28入學資料",
    "checkedOn": "2026-10-28"
  }
],
"hacs": [
  {
    "label": "教育局《小學概覽2026》：天神嘉諾撒學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=106",
    "scope": "全文核对35网、资助天主教女校、中文及保姆车；2026/27共18班，2025/26教师35。小一0测2考、小二至六0测3考；小三至六一高能力普教中及两混合班。概览创校栏1958与校史1890创立/1958重建分别归属原件，不混写。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2026/27學年一條龍學校名單",
    "url": "https://www.edb.gov.hk/tc/edu-system/primary-secondary/applicable-to-primary-secondary/through-train/sch-list.html",
    "scope": "確認天神、嘉諾撒聖瑪利學校及嘉諾撒聖瑪利書院列於一條龍名單；適用年級依當屆名單說明，不推稱所有學生無條件直升。",
    "sourceType": "government",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "天神嘉諾撒學校：學校簡介",
    "url": "https://hacs.edu.hk/學校簡介",
    "scope": "校方記載三校於2011年結成一條龍學校並協調課程銜接；辦學模式不等同未附條件的保證。",
    "sourceType": "school-official",
    "academicYear": "現行網站資料",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "天神嘉諾撒學校：2023/24學校報告",
    "url": "https://www.hacs.edu.hk/sites/default/files/files/2023-2024_school_report_web.pdf",
    "scope": "校方稱該屆所有畢業生均選擇升讀一條龍中學；這是當屆選擇，不是長期錄取率或未來承諾。",
    "sourceType": "school-official",
    "academicYear": "2023/24升中",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：天神嘉諾撒家長討論",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3734962",
    "scope": "已读2019-01-28/29及02-10原帖：有家庭补习、有家庭停掉学术补习只保留乐器；历史个案不扩成全校普遍补习或20多个样本。旧小二精英班及两测两考经验不可套现届。",
    "sourceType": "parent-discussion",
    "academicYear": "2019年1–2月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：天神嘉诺撒（中文原件）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=106",
    "scope": "复用父端完整HTML/text并逐项读正文：35网、鹤园街21号、1958概览创校栏、天主教资助女校、一条龙圣玛利书院而非直属/联系、保姆车。2025/26教师35含校长、师训100%/学士97%/硕博29%/SEN57%/10年以上57%；2026/27核准18班。小一0测2考、P2–6零测3考；P3–6每级一高能力普教中班，其余混合；辅导、读写/专注/社交小组、言语及心理支援、课程评估调适。2026/27免学费堂费、PTA150、核准100、补卡33按需。不以官方政策推断课堂效果或每人补习需要。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班数收费；教师2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "天神：小班教学",
    "url": "https://www.hacs.edu.hk/%E5%B0%8F%E7%8F%AD%E6%95%99%E5%AD%B8",
    "scope": "已读本地完整正文并通过Exa读取相同HTTPS页：六原则、小组活动、分层课业、提问及回馈、讨论主持与回应训练。纠正无探究/无分层或只有抄写背诵的绝对判断，不据政策说明保证执行效果。",
    "sourceType": "school-official",
    "academicYear": "现行未统一标年课程说明",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "天神：2027年度自行分配学位须知",
    "url": "https://www.hacs.edu.hk/latest_news/2027%E5%B9%B4%E5%BA%A6%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E3%80%8C%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E3%80%8D%E9%A0%88%E7%9F%A5",
    "scope": "已读2026-09-07公告全文：电子9/17–25 23:59；纸本9/21–25 9:00–11:30及13:30–16:00，申请期已完；11/23结果、电子10:00起、不另函，同分交EDB。儿童天主教，海外领洗需儿童及一父母领洗证明；母亲/亲姊旧生资料；毕业证明补领至少7工作天；住址清单不收银行信、税单、手机账单等。只支持正式计分及文件条件，不推叩门宗教加分。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一入学；2026-09-07公告",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "天神：2026/27小一候补申请PDF",
    "url": "https://hacs.edu.hk/sites/default/files/files/2026-2027_xiao_yi_hou_bu_xue_wei_shen_qing_xue_xiao_wang_ye_geng_xin_ban_.pdf",
    "scope": "已读两页PDF：6/5网申、6/8 noon纸件（邮寄以6/8或前邮戳）、6/20分组评估、按评估结果再通知家长同出席面见、7/31前无电作落选。网上纸件双完成、不受理电邮/传真、一次申请、不能重读小一、材料清单及$2.4回邮信封，海外领洗需本地堂区证明。已结束旧届安排；没有111硬门槛、700人分母、笔试权重或固定三级面试，不套作2027/28。",
    "sourceType": "school-official",
    "academicYear": "2026/27小一候补；已结束",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读4页原件，复用同组证据：本校小学同胞在读或父母任职甲类必收；首五项只择一，旧生10与首名5不可相加，适龄10；宗教/主办社团二项择一；自行禁止笔面试、统一按志愿和随机编号。不设111额外分数。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/2027升中FAQ（中文）",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "Exa读取全文：第6题一条龙可选择直升，申请参加派位中学自行、非派位直资中一（不论录取与否）或统派不能保留直升权；第2至5题直属85%/联系25%均为扣除重读及自行后的余额，资格及乙部首选、超额组别随机、跨网失资格。正文比较不把制度比例当毕业生升读率。",
    "sourceType": "government",
    "academicYear": "2027年9月中一；2026年9月文件",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：圣玛利学校（比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=513",
    "scope": "已读完整正文；比较只使用31网、柯士甸道162号、资助女校、同一条龙圣玛利书院、2026/27核准24班、免学费PTA50、中文（含普通话）及英文、校车。不据不同学校班制或收费推轻松或易入。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：圣家九龙城（比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=85",
    "scope": "复用本组已读完整中文原件：41网（非34/35）、联合道102号、资助天主教女、直属圣家书院、2026/27核准18班、PTA50/特定用途100、中文、校车。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：圣家九龙塘（比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=103",
    "scope": "复用本组已读完整中文原件：41网、添福道8号、资助天主教女、直属圣家书院、2026/27核准24班、PTA120/核准350、中文、校车。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  }
],
"aps": [
  {
    "label": "教育局《小學概覽2026》：九龍塘宣道小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=89",
    "scope": "核對校名、地址、私立男女校、宗教、教學語言、2026/27學費$64,250（十期）、24班及2026/27班級結構；私校不設小一校網。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘宣道小學：小一入學安排",
    "url": "https://www.apskt.edu.hk/application.php",
    "scope": "核對2027/28小一申請期、費用、學額約168及當屆面試與註冊日期。2026年申請時程已過，報告須標明年度，不能當作下一屆安排。",
    "sourceType": "school-official",
    "academicYear": "2027/28入學；2026年申請",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘宣道小學：升中派位及歷屆去向",
    "url": "https://www.apskt.edu.hk/secondary.php",
    "scope": "校方称平均每年逾95%获派英文中学；2024/2026是升中派位周期，所列2026届105名小六生（62男43女）并非两届合计。历史2025届108人另列。没有最新Band 1A率或个人录取概率，不沿用旧69%。",
    "sourceType": "school-official",
    "academicYear": "2024/2026升中派位周期（2026届）及历史资料",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  }
],
"aspcps": [
  {
    "label": "教育局《小學概覽2026》：聖伯多祿天主教小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=239",
    "scope": "全文核对18网利东邨资助男女天主教小学、中文、直属圣伯多禄中学；2026/27共16班小一2班、PTA35及非标准350，2025/26教师39。小一0测1考、小二至六0测3考、合作混能及小五六能力分班；中文主栏不证明所有班普教中。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "聖伯多祿天主教小學：2024/25學校周年報告",
    "url": "https://www.spcps.edu.hk/CustomPage/48/2024_2025%E5%AD%B8%E6%A0%A1%E5%91%A8%E5%B9%B4%E5%A0%B1%E5%91%8A.pdf",
    "scope": "完整25页年报：第12页2023–2025年度为升中派位周期，首志愿（含自行投考）99%、首二100%，不能解作两届合计。校本问卷关爱4.5/5、品德4.4/5缺样本，不当独立口碑；另读活动参与及课室空间反思。",
    "sourceType": "school-official",
    "academicYear": "2024/25年报；2023–2025升中派位周期（原文标示）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "聖伯多祿天主教小學：升中派位概況",
    "url": "https://www.spcps.edu.hk/CP/pG/46/90/55",
    "scope": "已打开2024–2026年度原图并读取：首志愿100%含自行投考；列20所中学，没有逐校人数、全届分母或阶段分拆。升中周期不是两届合计，也不是名校率或未来保证。",
    "sourceType": "school-official",
    "academicYear": "2024–2026及歷屆",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/27中學學位分配辦法常見問題",
    "url": "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQs.html",
    "scope": "核對直屬及聯繫學校保留學位的制度條件。85%是扣除自行分配及重讀生後統一派位階段的保留比例上限口徑，仍須符合派位組別與選校條件；不等於直升率或本校實際錄取比例。",
    "sourceType": "government",
    "academicYear": "2025/27中學學位分配周期",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局2027小一入学单张原件",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整4页已读：甲类同胞在读/父母本小学任职，计分首五互斥/宗教社团互斥/适龄，电子与纸本、11/23结果、统一甲乙及直资私校差别。不能父母旧生5或同团体任职20。",
    "sourceType": "government",
    "academicYear": "2027/28",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局2027年18网名册",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net18.pdf",
    "scope": "完整8/2026一页：本校514233利东DP50、石排湾560529另校63；海怡宝血男女/50、培德男女/25、南官男女/50与地址。无香港仔浸信会吕明才小学，不把中学校名混作该网小学；DP不倍增全年或班人数。",
    "sourceType": "government",
    "academicYear": "2027/28",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "校方25-26升中喜讯原JPEG",
    "url": "https://www.spcps.edu.hk/CustomPage/47/25-26_%E5%8D%87%E4%B8%AD%E5%96%9C%E8%A8%8Anew.jpg",
    "scope": "官网2024–2026年度结果页直接图片，实际下载/view_image目读：首志愿100%包括自行投考，20校名单无逐校人数、全届分母及阶段分拆；周期标签不解成两届合计，也不称名校率或未来承诺。",
    "sourceType": "school-official",
    "academicYear": "2024–2026升中派位周期（2026届）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "校方2026/27小一候补须知原PDF",
    "url": "https://www.spcps.edu.hk/CustomPage/44/%E5%B0%8F%E4%B8%80%E5%80%99%E8%A3%9C%E7%94%9F%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5.pdf",
    "scope": "完整1页：申请表、出生证明、原小一申请或选择学校表副本，收到后安排面试；未给统一截止或111/宗教录取加分。不套下一届开放或实时空缺。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "校方2026插班报名表原PDF",
    "url": "https://www.spcps.edu.hk/CustomPage/44/%E9%99%84%E4%BB%B6A5.8.1_%E6%8F%92%E7%8F%AD%E7%94%9F%E7%94%B3%E8%AB%8B%E8%A1%A8_2026ver.pdf",
    "scope": "完整1页空白公开表：目标年级、最近学校、家属概况，身份/成绩/照片；没有当前分年级空缺、固定4–6月、笔试时间或排名门槛，不凭表可下载推出有位。",
    "sourceType": "school-official",
    "academicYear": "2026版本；即时轮次待核",
    "checkedOn": "2026-10-28"
  }
],
"brgps": [
  {
    "label": "教育局《小學概覽2026》：般咸道官立小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=21",
    "scope": "核對11校網、校址、官立男女校、中文授課、沒有直屬中學、四所聯繫中學、校舍約3,765平方米、12間課室及2026/27每級兩班；2025/26共28名教師。這些資料不支持把校舍面積推稱為約1,700平方米，也不支持由教職員人數自行換算班師比。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班級結構；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "般咸道官立小學：官方校網",
    "url": "https://www.brgps.edu.hk/tc/content.php?wid=1",
    "scope": "校方學校資料頁，用於核對學校定位、辦學理念、校舍及教學安排；若內容與《小學概覽2026》不同，以具體欄目及較新日期為準。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/27中學學位分配辦法常見問題",
    "url": "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQs.html",
    "scope": "核對聯繫中學保留學位制度及資格條件：通常為扣除自行分配及重讀生後餘額的25%，學生須符合派位組別、首志願及校網等條件；不是保送或確保入讀某一Banding中學。",
    "sourceType": "government",
    "academicYear": "2025/27中學學位分配周期",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2027年度小一入学常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/FAQ_TC.pdf",
    "scope": "完整五页读取；第8题明确甲类必收与乙类分数排序，同分超额由学校自行抽签或交教育局随机处理；第12题不设笔面试。第4题只交一份官津自行申请，重复电子/纸本亦不可；第7题接受直资学位的统筹后果。只支持制度，不证明本校某分数稳入。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；2026年9月更新"
  }
],
"lh": [
  {
    "label": "學之園：2025/26升小去向",
    "url": "https://www.learninghabitat.org/en/p1-placement-results",
    "scope": "校方公布2025/26畢業生去向；DSS及私立小學697人、官立及津貼小學128人，合計825人。此為校方按學校類別列出的去向人數；84.5%只表示該統計合計中的組成，不是錄取率或個別申請成功率。各校區沒有分開列出分母。",
    "sourceType": "school-official",
    "academicYear": "2025/26畢業屆；資料於2026年更新",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "學之園：2026/27學費",
    "url": "https://www.learninghabitat.org/zh-hk/admission/fees",
    "scope": "核對八個校舍2026/27每月學費及全年十二期；PN、英粵班、英普班費用按校舍不同，另有教材雜費。報告使用年化學費並保留班別差異，不把學費等同總支出。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/26幼稚園概覽：學之園青衣灝景資料",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6247",
    "scope": "用作核對青衣灝景校舍的登記資料、2024年課室容量及師資等KGP_2025歷史截面；不是2026/27新生名額，也不能推算錄取率。其他校舍資料須按各自概覽頁確認，校方當屆課程、收費及招生安排優先採用官網更新資料。",
    "sourceType": "school-profile",
    "academicYear": "2025概覽；資料截面為2024年",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "學之園：課程與雙語班安排",
    "url": "https://www.learninghabitat.org/en/admission/programmes",
    "scope": "校方列PN至K3的英粵班、K1至K3的英普班，以及各班由英語教師和相應中文教師共同帶班；不據此推算語言課時百分比或NET外籍教師比例。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "學之園：2027/28網上申請安排",
    "url": "https://www.learninghabitat.org/en/admission/online-application",
    "scope": "核對2027/28 PN與K1申請年齡、申請期及面見日期；PN申請期將於2026年12月公布，K1申請期為2026年8月1日至10月16日，面見安排為11月9或10日。其他年級只登記意向，待有學額時聯絡。",
    "sourceType": "school-official",
    "academicYear": "2027/28；2026年申請",
    "checkedOn": "2026-10-28"
  }
],
"veo-op": [
  {
    "label": "VEO：海之戀校舍資料與課程理念",
    "url": "https://www.victoria.edu.hk/zh-hk/campus/ocean-pride-campus/",
    "scope": "核對校舍地址、2022辦學、PN（2歲以上）及K1至K3、IB PYP級別、兩文三語及校長所述自主探究／創客教育理念；校車路線只作參考，實際路線與收費須向校方確認。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/26幼稚園概覽：海之戀校舍",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=7046",
    "scope": "核對2024年課室及師資資料等KGP_2025歷史截面；註冊容量不是單一年度新生學額，不能據此推算競爭度或錄取率。",
    "sourceType": "school-profile",
    "academicYear": "2025概覽；資料截面為2024年",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "VEO：2026/27校舍學費",
    "url": "https://www.victoria.edu.hk/zh-hk/tution/",
    "scope": "海之戀校舍2026/27全年學費：2歲以上小組班$132,902、K1半日$117,370、K2半日$106,390、K3半日$109,360；頁面未列全日班收費，勿和其他校舍級別混用。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "VEO：2026/27班級時段與語言",
    "url": "https://www.victoria.edu.hk/zh-hk/programme-class-schedule/",
    "scope": "海之戀列PN（2歲以上）上午及下午、K1和K2上午及下午、K3下午；列兩文三語課程。校方註明實際安排可調整。這確認有PN時段，但不代表公布了PN招生名額。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "國際文憑組織：海之戀IB世界學校資料",
    "url": "https://www.ibo.org/school/063055/",
    "scope": "核對IB學校代碼063055、PYP授權日期2024年12月20日及官方列出的教學語言；IB資料支援課程授權，不代表錄取率或升小結果。",
    "sourceType": "university-official",
    "academicYear": "自2024-12-20授權",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "VEO：2022/23至2025/26升小去向",
    "url": "https://www.victoria.edu.hk/school-placement/",
    "scope": "校方頁面列四屆VEO畢業生共692人獲VSA取錄，資料截至2026-09-04；為機構整體累計offer數，沒有校舍別分母，不可換算為海之戀錄取率或保證。",
    "sourceType": "school-official",
    "academicYear": "2022/23–2025/26；截至2026-09-04",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "VEO：2027/28招生日期與面見安排",
    "url": "https://www.victoria.edu.hk/zh-hk/key-dates/",
    "scope": "核對2027/28 K1及PN申請期、首次面見、部分申請者的第二次面見與結果日期；列明只有部分獲選申請者參與第二次面見。日期是機構安排，不等同海之戀個別校舍學額。",
    "sourceType": "school-official",
    "academicYear": "2027/28；2026–2027年申請與面見",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：海之戀學校登記",
    "url": "https://applications.edb.gov.hk/schoolsearch/registeredpremises.aspx?langno=2&scrn=619850000111",
    "scope": "核對教育局登記校名、校址及學校編號619850；不以登記資料推斷校方未公開的招生名額。",
    "sourceType": "government",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "VEO官方：2027/28招生常见问题",
    "url": "https://www.victoria.edu.hk/zh-hk/faq/?tab=1",
    "scope": "官方全文；一份表按校舍/级别/学制最多六个选择，首选安排面见；报名非先到先得，适龄按时申请均获首次面见。PN续K1优先/保证未在已读FAQ确认；教学平均比例不替代海之恋校本截面，未用来更新旧师资。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28申请与通用FAQ"
  },
  {
    "label": "IBO：何文田维多利亚授权名录",
    "url": "https://www.ibo.org/school/002865/",
    "scope": "实际读官方名录；IB学校002865、PYP授权2010-05-13，纠正海之恋比较表误写何文田2021认证。不据名录推断当前全日开班。",
    "sourceType": "exam-authority",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "铜锣湾维多利亚校方：办学实体及学校资料",
    "url": "https://www.cbvictoria.edu.hk/sc/quick_facts/",
    "scope": "全文再次读；铜锣湾街坊福利促进会、324779/325651/CCC767、1965、兴发街32号；不是VEO现列八校舍之一。只用于纠正海之恋比较表实体，未把整座15课室套给单一注册。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  }
],
"cckg": [
  {
    label: "基督堂：K2、K3入学申请",
    url: "https://www.cckg.edu.hk/application-for-admission",
    scope: "校方明确只设K2、K3，不设K1；现页列2027年9月入学安排。此页支持招生级别与相应年度安排，不用于证明升小成绩或录取机会。",
    sourceType: "school-official",
    academicYear: "2027/28",
    checkedOn: "2026-10-27",
  },
  {
    label: "基督堂：教学语言与开办级别",
    url: "https://www.cckg.edu.hk/medium-of-instruction",
    scope: "官网列英语教学及每日中文课，并列Lower Kindergarten（KG2）与Upper Kindergarten（KG3）。未用外教人数推课时比例。",
    sourceType: "school-official",
    checkedOn: "2026-10-27",
  },
],
"stcat": [
  {
    "label": "教育局登记：国际英文幼稚园215120",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=215120000111",
    "scope": "核对九龙塘学校身份、两校址及私立类型；红磡586625不并入同一学校编号。",
    "sourceType": "government",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "2026/27幼稚园概览：罗福道",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=2151200001",
    "scope": "核课程、持续观察、升小支援及2025年9月师生比1:7.4；整体比例不等于班额；收费与教育局证书交叉。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27；人员统计2025年9月"
  },
  {
    "label": "2026/27幼稚园概览：雅息士道",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=2151200002",
    "scope": "核课程、持续观察、升小支援及2025年9月师生比1:7.9；整体比例不等于班额；收费与教育局证书交叉。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27；人员统计2025年9月"
  },
  {
    "label": "教育局：九龙塘2026/27收费证",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/215120.pdf",
    "scope": "2026-09-01生效；K1 7294×11=80234，K2下午及K3上午7931×11=87241。Nursery在本证为K1，非PN。三年254716为费率不变的静态估算。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "校方：2027/28 K1招生须知",
    "url": "https://admission.ekinder.com.hk/stcikg/",
    "scope": "核报名8月28日至9月8日、40元、生日范围、11月2/3日两部分面见、英/粤面见及英普另加普通话、11月26日结果。只用本校明确须知，不把共用表单隐藏字段当招生政策。面见通知日中英文有差异，未择一发布。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28；2026年申请"
  },
  {
    "label": "2026/27概览：红磡海滨南岸586625",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5866250001",
    "scope": "PN幼儿服务栏为2025年9月，年费90244仅该旧快照；在读382不是可申请学额，不与九龙塘合算。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27概览；PN统计2025年9月"
  },
  {
    "label": "教育局：红磡幼稚园级别收费证",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/586625.pdf",
    "scope": "2026-08-01生效64328列K1/K2/K3，不列PN，不能拿这笔费用当PN新报价。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "教育王国：2014/15升小讲座的2016讨论",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3236355",
    "scope": "家长转述旧讲座，讨论名小offer与重复录取；小学整体学额不是St. Cat毕业分母。仅说明历史路线，不作当前前三或录取率。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-25",
    "academicYear": "2016年讨论；2014/15历史届"
  },
  {
    "label": "教育局：基督堂2026/27收费证",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/210196.pdf",
    "scope": "用于同类对比；2026-09-01生效，K2/K3上午7650×10=76500。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "基督堂：年级与2027年申请",
    "url": "https://www.cckg.edu.hk/application-for-admission",
    "scope": "核只有K2/K3、不设K1；用于转校代价比较，不把取录等同升两拔保证。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28申请"
  },
  {
    "label": "学之园：2026/27分校费用",
    "url": "https://www.learninghabitat.org/en/admission/fees",
    "scope": "凯帆薈K1–K3英粤7500×12=90000、英普7800×12=93600；杂费另计。不是所有分校一致价格。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "VEO：2026/27分校学费",
    "url": "https://www.victoria.edu.hk/tution/",
    "scope": "同类比较按K1半日111221–143495、11期；不将PN、K2/K3或独立铜锣湾学校混作集团同价。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "親子講場：有冇st cat用家分享（2020）",
    "url": "https://www.babydiscuss.com/t/topic/11823",
    "scope": "已读原帖；2020年自述用家／毕业生家长谈上学快乐、表达与家长阅读参与，也有课程深度顾虑；校区未明，账号身份未独立核实，不代表现届满意度或升学率。",
    "sourceType": "parent-discussion",
    "academicYear": "2020年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：請問SC用英式定美式英文?（2012）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2370402",
    "scope": "已读原帖；校本phonics及家庭辅助方式的历史讨论，不能作2026课时、NET配置或相对其他学校的成效证明。",
    "sourceType": "parent-discussion",
    "academicYear": "2012年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：sc英文勁???!!!!靠補習????（2010）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2181645",
    "scope": "已读原帖；同帖含外补、无外补和家庭语言互动的不同自述，不能归因所有升小成绩来自外补，不能默认所有回复来自同校舍。",
    "sourceType": "parent-discussion",
    "academicYear": "2010年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  }
],
"rcps": [
  {
    "label": "高主教小学：PSP2026",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=409",
    "scope": "深读身份、2026/27学费与班级、2025/26教师、教学语言、评估、校园、直属关系和支援；资料由学校提供及核实，并非独立教学评鉴。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27；教师统计为2025/26"
  },
  {
    "label": "教育局：高主教小学学校登记",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=575240000123",
    "scope": "核对EDB编号575240、校名、司徒拔道地址、私立全日男女校；登记日期不替代1958创校历史。",
    "sourceType": "government",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育局：高主教小学收费证明",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/575240.pdf",
    "scope": "2026-09-01生效，小一至小六每期$6,000，10期共$60,000；不能用作2027/28已核准收费。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "高主教小学：中文科",
    "url": "https://rcps.raimondi.edu.hk/wordpress/curriculum/中文科/",
    "scope": "深读小一至小六普教中、阅读口语与朗诵安排；不支持整校普通话授课或课时占比。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "高主教小学：英文科",
    "url": "https://rcps.raimondi.edu.hk/wordpress/curriculum/english/",
    "scope": "深读英语阅读、口语、活动室与外籍教师参与；网页含2021/22及2022/23内容，不将历史两名NET写为当前编制。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "网页含2021/22及2022/23历史内容"
  },
  {
    "label": "高主教小学：数学科",
    "url": "https://rcps.raimondi.edu.hk/wordpress/curriculum/mathematics/",
    "scope": "本地数学课程并融入英文内容和词汇；未公开70%粤语／30%英语，不作量化推断。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "高主教小学：2026届升中派位",
    "url": "https://rcps.raimondi.edu.hk/wordpress/achievement/secondary-school-places-allocation/",
    "scope": "深读2024/2026周期79人获派高主教書院；未列毕业总人数，不能计算升读率。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2025/26毕业届；2024/2026派位周期"
  },
  {
    "label": "高主教小学：2026派位首志愿原图",
    "url": "https://rcps.raimondi.edu.hk/wordpress/wp-content/uploads/2026/07/WhatsApp-Image-2026-07-09-at-2.53.36-PM.jpeg",
    "scope": "实际下载并视觉检查，图列First Choice 95.2%；该数字为首志愿匹配，不是指定中学录取率。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026届"
  },
  {
    "label": "教育局：2026中学学位分配办法常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
    "scope": "深读直属85%与联系25%的分母、Band 1/2、乙部首选及跨网条件；比例为扣除重读和自行分配后的中学余下学额，不是小学毕业生直升率。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2024/2026派位周期；2026年9月入读中一"
  },
  {
    "label": "高主教書院：2026 HKDSE",
    "url": "https://www.raimondi.edu.hk/en/latest_new/2026-hkdse",
    "scope": "2026-08-05校方结果：89%达332A、逾87%获JUPAS学位课程offer；基本门槛、录取通知与实际入读须区分，不能归因给小学。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026 HKDSE"
  },
  {
    "label": "高主教小学：当届招生入口",
    "url": "https://rcps.raimondi.edu.hk/wordpress/information/admission/",
    "scope": "深读当前2027/28小一入口及2026/27小二至小五插班PDF链接，核对不同年度。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28小一；2026/27插班"
  },
  {
    "label": "高主教校方链接：2027/28小一申请规则",
    "url": "https://rcps.ievent.hk/event/2027-28?lang=zh",
    "scope": "深读2026年7–8月申请、9/12及10/17两轮面试、11月上旬结果、$100、档案上限、交件及注册限制；截至10/25报名及面试已结束。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28招生"
  },
  {
    "label": "高主教小学：2026/27小二至小五插班原文件",
    "url": "https://drive.google.com/file/d/1kGyyBYcpeHQ8s0jDJH_URS6oQ6uDFI4B/view?usp=sharing",
    "scope": "由官网招生入口链接，Exa深读2页：邮寄／亲交、$100、两封$2.4邮资信封、中英数笔试、电话通知、两周内结果。无空缺或录取率。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "聖保羅書院小學：PSP2026对照",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=2",
    "scope": "深读2026/27性别、类别、学费、班级及中学关系。依次$32,000／$97,150／$57,000；三校均列直属，聖保羅不误作教育局一条龙。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "聖士提反書院附屬小學：PSP2026对照",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=252",
    "scope": "深读2026/27性别、类别、学费、班级及中学关系。依次$32,000／$97,150／$57,000；三校均列直属，聖保羅不误作教育局一条龙。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "聖類斯中學（小學部）：PSP2026对照",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=18",
    "scope": "深读2026/27性别、类别、学费、班级及中学关系。依次$32,000／$97,150／$57,000；三校均列直属，聖保羅不误作教育局一条龙。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "教育王國：高主教谷嗎？（2018–2019）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3650084",
    "scope": "已读原帖；自述小一、小三家长及亲友转述混合，谈适应、功课及高年级顾虑；分清直接体验与二手意见，不证明当届全校压力。",
    "sourceType": "parent-discussion",
    "academicYear": "2018–2019年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：今年學校的改變（2015）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3185856",
    "scope": "已读原帖；自述小一／小二家长谈抄写、阅读、默书及进度，不据旧经验宣称2026仍有相同安排。",
    "sourceType": "parent-discussion",
    "academicYear": "2015年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：請問高主教的家長們（2016）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3378135",
    "scope": "已读原帖；一名自述小二家长描述个别日子功课较多，另有外甥在读的亲属转述；不将两小时或较深英文推成全校统一负担。",
    "sourceType": "parent-discussion",
    "academicYear": "2016年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：求教高主教小学用家（2022）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3868054",
    "scope": "已读原帖；回复者具体描述高年级帮助低年级记手册、功课及测验节奏，身份未独立核实；不用于确认当前班额、语文百分比或全部支援。",
    "sourceType": "parent-discussion",
    "academicYear": "2022年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  }
],
"tlps": [
  {
    "label": "香港真光小学：PSP2026",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=420",
    "scope": "深读身份、收费、22班、2025/26教师43人、两测两考、小一首学期进展评估、30,000平方米及联系女中；校方填报非独立质量评鉴。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27；教师统计为2025/26"
  },
  {
    "label": "教育局：香港真光登记",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=132047000123",
    "scope": "核对大坑道50号、EDB编号132047、私立全日男女校；区别九龙真光。",
    "sourceType": "government",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育局：香港真光收费证明",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/132047.pdf",
    "scope": "2026-09-01生效小学每期$6,500×10=$65,000；同一文件幼稚园收费不混入小学。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "香港真光小学：中文科",
    "url": "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=38",
    "scope": "深读普教中、阅读、诗歌、写作及衔接；不能写成粤语教中文，未量化逐级课时。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "香港真光小学：英文科",
    "url": "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=23",
    "scope": "深读第二语言课程、读物、语法练习、讨论及表演；不支持英语弱于某校或当前NET频率比较。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "香港真光小学：电脑科",
    "url": "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=28",
    "scope": "深读Scratch、micro:bit、3D打印、智能家居等STREAM内容；旧报告电脑科小四才开始和STEAM弱不成立为当前客观事实。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "香港真光小学：学习支援",
    "url": "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=21",
    "scope": "深读分层、辅导、朋辈、专业机构协作；没有个人服务频率或成效分母，不能作强弱保证。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "香港真光小学：2024/25升中结果",
    "url": "https://www.tlhkps.edu.hk/primary/tc/content.php?wid=107",
    "scope": "校方列87%升Band 1英文中学、男生83%女生87%、约75%升真中、92%首志愿；未列完整毕业和分组分母、逐校人数及分途径数据。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2024/25毕业届"
  },
  {
    "label": "香港真光小学：2025年7月派位记录",
    "url": "https://www.tlhkps.edu.hk/primary/tc/album_details.php?id=303&page=1",
    "scope": "2025-07-09日期佐证结果学年；与结果页同一校方来源，不能算独立交叉验证。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2024/25毕业届；2025-07-09"
  },
  {
    "label": "教育局：2026中学学位分配办法常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
    "scope": "深读直属85%与联系25%的分母、Band 1/2、乙部首选及跨网条件；比例为扣除重读和自行分配后的中学余下学额，不是小学毕业生直升率。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2024/2026派位周期；2026年9月入读中一"
  },
  {
    "label": "香港真光中學：2026公开试与升学",
    "url": "https://www.tlmshk.edu.hk/academic/public-exam-results-university-offer/",
    "scope": "深读2026年96.5%达332A及两科选修2级以上，官方解释332A；这是门槛达标，不是大学入读率。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026 HKDSE"
  },
  {
    "label": "香港真光小学：2027/28小一公告",
    "url": "https://www.tlhkps.edu.hk/tc/content.php?wid=17",
    "scope": "深读内校6/17–30、外校7/7–8/31；10/21与10/16个人面试，11/13与11/16结果；约160–180学额、$80、能力要求、官津学位限制；2027年6–7月后续视需要。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28招生"
  },
  {
    "label": "香港真光小学：2026/27插班公告",
    "url": "https://www.tlhkps.edu.hk/tc/content.php?wid=18",
    "scope": "深读小二至小五，2026-06-05截止、6/20三科笔试、7月面试及结果、$80、两学期成绩；截至10/25正常周期已结束。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "嘉諾撒聖家學校：PSP2026对照",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=85",
    "scope": "逐校深读性别、类别、学费、中学关系和正式评估；聖家及聖保祿天主教为直属；培道联系，2026/27学费$65,000。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "聖保祿天主教小學：PSP2026对照",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=412",
    "scope": "逐校深读性别、类别、学费、中学关系和正式评估；聖家及聖保祿天主教为直属；培道联系，2026/27学费$65,000。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "香港培道小學：PSP2026对照",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=92",
    "scope": "逐校深读性别、类别、学费、中学关系和正式评估；聖家及聖保祿天主教为直属；培道联系，2026/27学费$65,000。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "香港培道中學：SSP2025/2026",
    "url": "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=378",
    "scope": "核对培道联系中学为资助女校；不能推荐小学男生利用这条女中路径。",
    "sourceType": "school-profile",
    "academicYear": "2025/26；含2026/27拟开科目",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育局：2026中一自行学位九龙城手册",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/DPHB-KL3_KC-2026.pdf",
    "scope": "独立政府手册核对香港培道中學编号235、女校身份，纠正旧稿男生可直升的错误。",
    "sourceType": "government",
    "academicYear": "2026年9月中一",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：坑真 vs 優才（最後選擇）（2024）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3879950",
    "scope": "已读原帖；择校者与自述家长讨论并存，有家长谈校内功课时间、教师关顾与中文深度，也有朋友转述负担较重。不可写压力共识或以帖子估计升中率。",
    "sourceType": "parent-discussion",
    "academicYear": "2024年发帖；个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：聖心私 vs 坑真（2024–2025）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3883184",
    "scope": "已读原帖；OP为择校询问，严格／谷的看法有分歧，部分在读身份未明；朋友不开心的回复指圣心，不能误归真光。",
    "sourceType": "parent-discussion",
    "academicYear": "2024–2025年发帖；择校讨论",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：大坑真小好嗎?（2015）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3024078",
    "scope": "已读原帖；大宮松鼠自述女儿小学在读，谈朴实纪律和课后接送；其他长清单有爬文者及仍在K3家长，不能均称小学用家或用旧三测三考覆盖现行。",
    "sourceType": "parent-discussion",
    "academicYear": "2015年发帖；历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "星岛头条：香港真光小学暨幼稚园简介（2026-02-25）",
    "url": "https://www.stheadline.com/admission-guide/3547453/",
    "scope": "已读正文；转述校方2024/25届首志愿及原校升中比例，未提供完整毕业分母。属于媒体引用校方数据，不能当独立复核、个人保证或家长满意度。",
    "sourceType": "media-report",
    "academicYear": "2026年报道；数据注明2024/25届",
    "checkedOn": "2026-10-25"
  }
],
"victoria": [
  {
    "label": "VEO：现行校区目录",
    "url": "https://www.victoria.edu.hk/campuses/",
    "scope": "目录列八校区；用于机构范围、地区及与铜锣湾独立网站区分，不代表每校区只有一项注册。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行网页"
  },
  {
    "label": "VEO：2026/27年度学费",
    "url": "https://www.victoria.edu.hk/tution/",
    "scope": "逐校区逐年级半日费用；PN/K1为11期、K2/K3为10期。三年相加只能作为同年费率静态情景。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "VEO：2026/27班制与活动时间",
    "url": "https://www.victoria.edu.hk/programme-class-schedule/?tab=Nursery_Kindergarten",
    "scope": "核对三语/英普双语、可收PN年龄、各年级上午下午及K3下午延长时间；年度班表优先于无年度的校区简介。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "VEO：2027/28申请程序",
    "url": "https://www.victoria.edu.hk/application-procedure/",
    "scope": "统一最多六志愿、申请年龄、费用、PN同校区升K1、两轮面见、兄姊第二轮豁免及滚动插班；非录取保证。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28；兼列2026/27滚动收生"
  },
  {
    "label": "VEO：招生关键日期",
    "url": "https://www.victoria.edu.hk/key-dates/",
    "scope": "交叉核对K1/PN申请、两轮面见与公布日期；与申请页同属机构，属于内部一致性核对，非独立招生审计。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28"
  },
  {
    "label": "VEO：学生升班路线",
    "url": "https://www.victoria.edu.hk/student-roadmap/",
    "scope": "明确现读PN自动升同校区K1，不把它推成跨校转班或VSA保证。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "现行升班说明"
  },
  {
    "label": "VEO：K1–K3 IB PYP课程",
    "url": "https://www.victoria.edu.hk/nursery-kindergarten/ib-primary-years-programme-k1-k3/",
    "scope": "K1–K3跨主题探究课程；不把课程框架视为学生成效、排名或PN认证。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "VEO：语言与读写课程",
    "url": "https://www.victoria.edu.hk/nursery-kindergarten/language-literacy-programme/",
    "scope": "校方的生活化听说读写目标；没有逐语言课时比例，不据此编造50%/25%/25%。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "VEO：创客学习",
    "url": "https://www.victoria.edu.hk/nursery-kindergarten/maker-centered-learning/",
    "scope": "校方说明创客与STEAM及研究合作；作为课程设计说明，不转化为个体成效承诺。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "VEO：四届毕业生小学录取结果",
    "url": "https://www.victoria.edu.hk/school-placement/",
    "scope": "2022/23–2025/26：VSA692、蘇浙76、聖士提反附小69等获offer人数；截至2026-09-04。缺毕业分母和逐校区分母，不算录取率；多校offer不能累加成毕业人数。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2022/23–2025/26四届；数据截至2026-09-04"
  },
  {
    "label": "VSA：现行招生政策",
    "url": "https://www.vsa.edu.hk/admissions/how-to-apply",
    "scope": "一年级优先考虑维多利亚学生/债券持有人、评估、同等能力下优先类别、K3新生仅空缺时获接纳。70%指香港永久居民保留学位，不是幼园升读率。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行；页面另列2028/29一年级活动"
  },
  {
    "label": "铜锣湾维多利亚：独立初步申请登记",
    "url": "https://www.cbvictoria.edu.hk/en/k1k2k3_application/",
    "scope": "独立K1–K3初步登记及2026/27 PN，不把旧媒体“不收K1”当现行绝对规定。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "现行；兼列2026/27"
  },
  {
    "label": "铜锣湾维多利亚：2026/27收费PDF",
    "url": "https://www.cbvictoria.edu.hk/uploaded_files/page/35/Tuition%2026-27_Eng.pdf",
    "scope": "独立学校半日自动转账K1$96,480；不能套用VEO各校区。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27"
  },
  {
    "label": "铜锣湾维多利亚：小学去向明细",
    "url": "https://www.cbvictoria.edu.hk/en/school_placement/",
    "scope": "表列122毕业生、VSA60/聖士提反附小12/蔡繼有4，属该校去向人数，不外推VEO。年度由配套官方图标题标识。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2024/25（配套官方图片标题）"
  },
  {
    "label": "铜锣湾维多利亚：2024/25去向图",
    "url": "https://www.cbvictoria.edu.hk/uploaded_files/page/22/Piechart_Primary%20School%20Placement%20for%20Upper%20Class%20%28K3%29%20Graduates%20%28AY%202024-2025%29.jpg",
    "scope": "同页官方配图资源名标明AY2024–2025，结合明细表说明届别；49.2%/9.8%/3.3%为60/122、12/122、4/122四舍五入。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2024/25"
  },
  {
    "label": "IB组织：维多利亚何文田学校记录",
    "url": "https://ibo.org/en/school/002865/",
    "scope": "独立核对IB授权日为2010-05-13，修正旧稿2021；不把授权等同教学排名。",
    "sourceType": "exam-authority",
    "checkedOn": "2026-10-25",
    "academicYear": "授权日2010-05-13"
  },
  {
    "label": "IB组织：维多利亚海之恋学校记录",
    "url": "https://www.ibo.org/en/school/063055",
    "scope": "独立核对海之恋地址及IB授权日2024-12-20。",
    "sourceType": "exam-authority",
    "checkedOn": "2026-10-25",
    "academicYear": "授权日2024-12-20"
  },
  {
    "label": "VEO校区原页：宝翠园",
    "url": "https://www.victoria.edu.hk/campus/belcher-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：君汇港",
    "url": "https://www.victoria.edu.hk/campus/harbour-green-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：海峰园",
    "url": "https://www.victoria.edu.hk/campus/harbour-heights-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：何文田",
    "url": "https://www.victoria.edu.hk/campus/homantin-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：下康",
    "url": "https://www.victoria.edu.hk/campus/lower-kornhill-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：中康",
    "url": "https://www.victoria.edu.hk/campus/middle-kornhill-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：海之恋",
    "url": "https://www.victoria.edu.hk/campus/ocean-pride-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "VEO校区原页：海怡",
    "url": "https://www.victoria.edu.hk/campus/south-horizons-campus/",
    "scope": "核对该校区位置、PN/K1–K3、语言课程及教学团队；现行年度班别以2026/27班表为准。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年现行校区简介"
  },
  {
    "label": "教育王國：維多利亞VEO足夠考本地名小嗎？（2023–2024）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3878019",
    "scope": "已读原帖；Adiezz自认VEO家长、pkjanel自述孩子已小二，谈学习模式、语言信心及中文数学衔接；分校未明、身份未独立核实，亲友转述及商业化指控不等于学校事实。",
    "sourceType": "parent-discussion",
    "academicYear": "2023–2024年发帖；个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：升本地小學適應到嗎？何文田专版（2014–2016）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2738672",
    "scope": "已读原帖；2015年自述K3家长谈开心、功课少与本地小学衔接，十校面试是当时进度而非最终失败结果。不能外推所有分校或当前课程。",
    "sourceType": "parent-discussion",
    "academicYear": "2014–2016年发帖；何文田历史经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：Victoria or寶血（2023）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3876550",
    "scope": "已读原帖；准家长按害羞性格、兄姐津校路径和预算取舍，回复者Adiezz与另一讨论同一账号，不能重复算独立用家。",
    "sourceType": "parent-discussion",
    "academicYear": "2023年发帖；择校讨论",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "HK01：幼稚园学费调整报道（2022-09-19）",
    "url": "https://www.hk01.com/sns/article/816440",
    "scope": "已读全文；仅供2022/23调费历史背景，分校收费须区分，不作现价、富裕家庭占比、升学成果或口碑共识证据。",
    "sourceType": "media-report",
    "academicYear": "2022/23收费历史报道",
    "checkedOn": "2026-10-25"
  }
],
"canaan-klt": [
  {
    "label": "教育局：迦南九龙塘收费证明书",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/531910.pdf",
    "scope": "学校531910、金巴伦道9/11号；2026-09-01起K1–K3 AM/PM扣资助后$544×10=$5,440，纠正免费。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026-09-01生效"
  },
  {
    "label": "教育局：迦南九龙塘概览2026/27",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5319100001",
    "scope": "核校区5319100001、非牟利、1999创办、PN及全日服务；2025年9月教师41、学位34、幼教证41、比例9.3/9.4、容额784；收费5440与教育局收费证一致。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27；人力与容额2025年9月"
  },
  {
    "label": "教育局：迦南九龙塘质素评核PDF",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Cannan_KlnTong.pdf",
    "scope": "2025-01实地评核：故事游戏、户外/生活常规、教师协作及提问/活动设计改善；不支持67%高年资、教小一、英语课时等旧断言。",
    "sourceType": "independent-inspection",
    "checkedOn": "2026-10-25",
    "academicYear": "2025-01-13/14/15/17评核"
  },
  {
    "label": "迦南品牌：幼稚园课程",
    "url": "https://www.cannan.edu.hk/kindergarten",
    "scope": "故事/全语言/高广度计划工作回顾、母语英语教师拼读、普通话教师；品牌级说明不证明九龙塘具体课时与固定人手。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "迦南品牌：招生与插班",
    "url": "https://www.cannan.edu.hk/admission",
    "scope": "现行导航列2027/28新生、2026/27插班及PN升K1；收费正文仍标2020/21不可当当前。第二轮图片日期本次未读，不声称已核实具体截止日或面试题。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25",
    "academicYear": "2027/28新生；2026/27插班；正文旧收费为2020/21"
  },
  {
    "label": "迦南品牌：分校目录",
    "url": "https://www.cannan.edu.hk/campuses/",
    "scope": "品牌说明12校区、其中8有PN；不能据此推断其他校区PN可自动转九龙塘K1。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育局：小一选校表格须知",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/Notes_Choice_Form_TC.pdf",
    "scope": "统一派位乙部按居住地址所属校网；只用于解释制度，不以旧年表格列本届招生日期。",
    "sourceType": "government",
    "checkedOn": "2026-10-25",
    "academicYear": "2026年度小一入学"
  },
  {
    "label": "比较校：香港創價概览2026/27",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3258560001",
    "scope": "2026/27扣资助后2167=197×11；人本游戏；2025年9月师生比1:7.2。与校方招生页收费核对，校方概括1:8为不同口径。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2026/27；师生比2025年9月"
  },
  {
    "label": "比较校：香港培道小学幼稚园概览",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6051",
    "scope": "2025/26半日免费、故事游戏、专职英/普通话教师；不能证明全体100%直升小学。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2025/26"
  },
  {
    "label": "比较校：金巴倫英文幼稚園概览",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6093",
    "scope": "2025/26半日$69,300/11期、蒙氏与主题课程、语言教师；不混作2026/27报价，亦不支持原稿PN断言。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-25",
    "academicYear": "2025/26"
  },
  {
    "label": "比较校：香港創價官方招生与费用",
    "url": "https://soka.edu.hk/admission",
    "scope": "2026/27扣资助后197×11=2167，与概览一致；校方另列概括师生比1:8，不与概览的时段比混算。",
    "sourceType": "school-official",
    "academicYear": "2026/27费用；2027/28招生",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：金巴倫道迦南幼稚園4年用家總結1（2018）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3711706",
    "scope": "已读原帖；2018-11-17同一名自述女儿N至K3家长谈关爱、快乐、约一小时功课和家庭语言辅助。另两篇3711711/3711713为同人同日拆帖／转发，非独立样本，旧报告标2024有误。",
    "sourceType": "parent-discussion",
    "academicYear": "2018年发帖；金巴伦道历史个人经验",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：金巴倫道迦南四年总结2（同一作者补充）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3711711",
    "scope": "已读原帖；与3711706同人同日，谈孩子能力、校名及家长升小考虑；不得再算一位用家或据此推估升学率。",
    "sourceType": "parent-discussion",
    "academicYear": "2018年发帖；与总结1同一家庭样本",
    "checkedOn": "2026-10-25"
  },
  {
    "label": "教育王國：九龍塘迦南（金巴倫道）與富榮比較（2012）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2381821",
    "scope": "已读原帖；按回复区分校区，chanwendy自述金巴伦道两个孩子分别N1/K3，谈功课、阅读、校车减少当面沟通和用品更换；2012金额及任务不能作现行数据。",
    "sourceType": "parent-discussion",
    "academicYear": "2012年发帖；金巴伦道历史个人经验",
    "checkedOn": "2026-10-25"
  }
],
"canaan": [
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：迦南幼稚園（九龍塘）",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=&lang=en&otherkeywords=&schid=6021&schoolname=&schoolno=&voucher=",
    "scope": "核對九龍塘分校參加幼稚園教育計劃、非牟利、男女校、1999年創校、2024年9月校舍容額784及校長與教學人員44人；該校資料不能代表品牌所有分校。",
    "sourceType": "school-profile",
    "academicYear": "2025/26；容額及教職員數據截至2024年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：迦南幼稚園（中環堅道）",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=7064",
    "scope": "核對中環堅道校舍2024年9月容額104、教職員6人、上午師生比例1:4、下午1:9.3、學生數20及56人；均屬該日期截面，比例不等於每名學生固定獲得的個別照顧時間。",
    "sourceType": "school-profile",
    "academicYear": "2025/26概覽；人力、師生比例及在讀人數截至2024年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "迦南幼稚園：官方課程介紹",
    "url": "https://www.cannan.edu.hk/kindergarten",
    "scope": "核對品牌課程中的全語言活動、英語拼音、普通話、High/Scope計劃—工作—回顧、多感官及遊戲學習；校方沒有在該頁列出各分校的固定授課比例或個別課時。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：迦南幼稚園（九龍塘）收費證明書",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/531910.pdf",
    "scope": "核對2025年9月1日起九龍塘校舍K1至K3上午及下午班扣減政府資助後每年$5,440、分10期；不代表其他分校或其他年度收費。",
    "sourceType": "government",
    "academicYear": "2025/26；2025-09-01生效",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "迦南官方：新生、PN升K1与插班申请入口",
    "url": "https://www.cannan.edu.hk/admission",
    "scope": "实际读取招生页正文；列2027/28新生、PN升K1及2026/27插班入口，只能证明有相关申请渠道，不能当PN保录或中环坚道所选级别必接收。该页有2020/21旧用品及费用，不能作当前账单；第二轮流程图片下载不完整，未读成功，不引用图片日期或细则。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28入口；2026/27插班，旧费用2020/21不沿用"
  }
],
"canaan-cd": [
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：迦南幼稚園（中環堅道）",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=7064",
    "scope": "核對校舍非牟利、男女校、2023年創校、2024年9月容額104、四間註冊課室、教職員6人及資格、分時段師生比例、學生數、課程模式和學習評估；所有人數均為2024年9月截面，不能作現屆招生名額或未來人手預測。",
    "sourceType": "school-profile",
    "academicYear": "2025/26概覽；人力及學生數據截至2024年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：迦南幼稚園（中環堅道）收費證明書",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/619841.pdf",
    "scope": "核對中環堅道校舍K1至K3上午及下午班扣減政府資助後每年$6,490、分10期，2025年9月1日起生效；不是2024/25收費，也不代表其他迦南分校。",
    "sourceType": "government",
    "academicYear": "2025/26；2025-09-01生效",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：中環堅道校舍核准課室容額",
    "url": "https://applications.edb.gov.hk/schoolsearch/permittedaccommodation.aspx?langno=2&scrn=619841000111",
    "scope": "核對四間課室半日班核准容額合計79；教育局2025/26概覽所列總容額104是另一欄目的口徑，兩者不應混為同一數字或等同實際在讀人數。",
    "sourceType": "government",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "迦南幼稚園：官方課程介紹",
    "url": "https://www.cannan.edu.hk/kindergarten",
    "scope": "核對品牌課程說明中的High/Scope、繪本、英語原音拼合及普通話活動；屬品牌層面說明，沒有公布中環校舍各語言授課比例或每週課時。",
    "sourceType": "operator-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "迦南官方：新生、PN升K1与插班申请入口",
    "url": "https://www.cannan.edu.hk/admission",
    "scope": "实际读取招生页正文；列2027/28新生、PN升K1及2026/27插班入口，只能证明有相关申请渠道，不能当PN保录或中环坚道所选级别必接收。该页有2020/21旧用品及费用，不能作当前账单；第二轮流程图片下载不完整，未读成功，不引用图片日期或细则。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28入口；2026/27插班，旧费用2020/21不沿用"
  }
],
"cblmc": [
  {
    "label": "教育局《小學概覽2026》：浸信宣道會呂明才小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=117",
    "scope": "核對校名、地址、46校網、資助男女校、教學語言、2026/27核准收費、2025/26教師資料與班級結構。概覽所列逾九成首三志願及逾50%英文中學描述未標示屆別，故升中比例改用校方2025/26畢業屆公告，不沿用作當屆結論。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "浸信宣道會呂明才小學：2025/26年度學生升中取錄情況",
    "url": "https://blmcps.edu.hk/news/detail?post_id=93",
    "scope": "校方公布全級120人（4班）中，98人（81.7%）獲本區及外區英文中學取錄，22人（18.3%）獲其他中學取錄。這是校方的取錄分類，不代表最終入讀比例、獨立學生人數的offer數或個人成功概率。",
    "sourceType": "school-official",
    "academicYear": "2025/26畢業屆；公告日期2026-07-08",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "浸信宣道會呂明才小學：2027/28小一入學安排",
    "url": "https://blmcps.edu.hk/news/detail?post_id=21",
    "scope": "校方網站公布2027/28小一申請及遴選時程。報告應標示2027/28入學年度；已過期日期不得表述為未來截止日。",
    "sourceType": "school-official",
    "academicYear": "2027/28；2026年申請",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2025/2027中学学位分配简介",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/SSPA_2027_leaflet_TC.pdf",
    "scope": "完整四页再读；升中网原则按就读小学行政区，跨网须申请，不能套小一按住址规则。统一按派位组别、选择及随机编号；自行最多两所参加派位中学、条件及比重各校公布，不把原校成绩当唯一凭据。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2025/2027升中周期"
  },
  {
    "label": "教育局：2027年度46网自行分配学位名册",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net46.pdf",
    "scope": "父代理提供并本代理再完整读取一页（8/2026）；浸宣吕明才、迦密梁省德、道联云泉、柏德、九湾圣若翰、基乐各63；慈敬、坪石天主教、佐敦谷圣若瑟各50。DP依暂定班数，最终班数按实际需求，小班25为基本派位数而非实到/固定教学组人数；不反推126全年总位或同分胜算。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2027年度小一入学常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/FAQ_TC.pdf",
    "scope": "完整五页读取；第8题明确甲类必收与乙类分数排序，同分超额由学校自行抽签或交教育局随机处理；第12题不设笔面试。第4题只交一份官津自行申请，重复电子/纸本亦不可；第7题接受直资学位的统筹后果。只支持制度，不证明本校某分数稳入。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；2026年9月更新"
  }
],
"ccc": [
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：基督教中心幼稚園",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6024",
    "scope": "核對學校編號315907、非牟利及參加教育計劃、課室容量210（2024年9月）、2024年9月在讀人數及師生比例、2025/26 K1-K3半日班資助學費，以及校方填報的三語課程與教學理念。2024年9月的K1在讀40人不是招生名額；PN收費$54,060為2024年9月記錄。",
    "sourceType": "school-profile",
    "academicYear": "2025/26；學生、人手及幼兒服務資料截至2024年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "基督教中心幼稚園：九龍塘校舍入學申請",
    "url": "https://www.cyckg.edu.hk/kowloontong/?lang=en&page_id=1160",
    "scope": "核對2026/27 K1申請頁所列申請表不設限額、報名費、面見及註冊安排；頁面列出的N1收生準則不得轉用為K1優先政策。該屆申請時程已結束，不能代表下一屆安排。",
    "sourceType": "school-official",
    "academicYear": "2026/27；2025年申請",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：九龍塘基督教中心幼稚園在讀家長分享",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3883115",
    "scope": "2026-10-29重读全文：2024-11-17自称N班家长认可孩子适应、教师沟通及亲子活动；2025-01-20为邻居转述课堂/身体不适观察及退学疑虑。区分亲历与转述，未独立核实，不当现届全体共识或已证实事故；不支持阅读计划/普通话配置等误归。",
    "sourceType": "parent-discussion",
    "academicYear": "2024年11月—2025年1月历史N班经验",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "教育王國：基督教中心幼稚園討論區索引",
    "url": "https://www.edu-kingdom.com/forum.php?fid=778&mod=forumdisplay",
    "scope": "公开论坛索引，不作为独立口碑样本或当届事实认证；具体经验仅使用已读并列明的tid3883115原帖。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "Champimom：幼稚園候補名單求位信建議（2025）",
    "url": "https://experts.champimom.com/article/champimom/%E5%B9%BC%E7%A8%9A%E5%9C%92_waiting_list_%E6%B1%82%E4%BD%8D%E4%BF%A1",
    "scope": "只支持一般候補名單求位信的內容與寫法建議，不代表基督教中心幼稚園的個別候補政策、候補高峰月份或錄取概率。",
    "sourceType": "media-report",
    "academicYear": "2025",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局幼稚園質素評核報告：基督教中心幼稚園",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChristianYouthCentre.pdf",
    "scope": "核對教育局質素評核結果；報告中的課程觀察不等同現行招生名額、語言課時或NET人數。",
    "sourceType": "government",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  }
],
"cccwhcsw": [
  {
    "label": "教育局《小學概覽2026》：中華基督教會協和小學（長沙灣）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=287",
    "scope": "核對校網40、資助男女校、2026/27核准收費及30班、2025/26教師資料（65人、師資培訓100%、碩博或以上37%、十年以上年資44%）、普通話教中文安排。一至二年級全級普教中；三至六年級每級兩班用普通話；概覽沒有列班別字母或成績分班規則。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班級結構；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "中華基督教會協和小學（長沙灣）：2024/25學校周年報告",
    "url": "https://www.heepwohcsw.edu.hk/wp-content/uploads/2025/10/2024-2025%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf",
    "scope": "核對2024/25升中去向名單及校方稱約50%升讀以英語為主要教學語言中學的說法。周年報告未列清楚總畢業生分母，故只作該屆校方公布的概況，不推算個人錄取率。",
    "sourceType": "school-official",
    "academicYear": "2024/25",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "中華基督教會協和小學（長沙灣）：歷屆升中派位資料",
    "url": "https://www.heepwohcsw.edu.hk/?page_id=399",
    "scope": "校方頁列有2025/26、2024/25等年度派位資料入口。最新2025/26結果以圖像呈現，本批未把圖表轉錄為數字；本報告精確名單與比例仍依可讀取的2024/25周年報告，兩屆不混算。",
    "sourceType": "school-official",
    "academicYear": "2025/26及歷屆；本報告數值核對至2024/25",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  }
],
"canossahk": [
  {
    "label": "家庭與學校合作事宜委員會《小學概覽2026》：香港嘉諾撒學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=33",
    "scope": "核對14校網、資助男女校、天主教、創校年份、中文及英文教學、聯繫中學嘉諾撒書院、2026/27班級結構、教師數據、考試次數與校方自述學與教安排。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "香港嘉諾撒學校：教學特色",
    "url": "https://canossahk.edu.hk/%E6%95%99%E5%AD%B8%E7%89%B9%E8%89%B2",
    "scope": "核對合作學習、體驗式及多感官教學、自主學習與電子學習的校方說明；用於支持課程安排的描述，不當作成效評估或家長共識。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "香港嘉諾撒學校：2024–2026年度小六升中概況",
    "url": "https://canossahk.edu.hk/%E5%8D%87%E4%B8%AD%E6%A6%82%E6%B3%81",
    "scope": "校方升中概況頁列有2024–2026及歷屆資料入口；數字應按各屆原始圖表逐年讀取，不能把跨屆圖表描述成單屆比率或保證升學結果。",
    "sourceType": "school-official",
    "academicYear": "2024–2026及歷屆",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "香港嘉諾撒學校：學校發展計劃及周年報告",
    "url": "https://canossahk.edu.hk/%E5%AD%B8%E6%A0%A1%E7%99%BC%E5%B1%95-%E8%A8%88%E5%8A%83%E6%9B%B8%E5%A0%B1%E5%91%8A%E6%9B%B8",
    "scope": "校方列出2025/26周年計劃、2024/25學校報告及2024–2027發展計劃，供報告中的校務方向與年度成效查證。",
    "sourceType": "school-official",
    "academicYear": "2024–2027；2025/26年度計劃",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2027年度小一入学常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/FAQ_TC.pdf",
    "scope": "完整五页读取；第8题明确甲类必收与乙类分数排序，同分超额由学校自行抽签或交教育局随机处理；第12题不设笔面试。第4题只交一份官津自行申请，重复电子/纸本亦不可；第7题接受直资学位的统筹后果。只支持制度，不证明本校某分数稳入。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；2026年9月更新"
  }
],

luaaps: [
    { label: "教育局学校登记：嶺南大學香港同學會小學", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=569895000123", scope: "核对正式校名、EDB编号、地址及学校身份；不用于评价教学质量。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "教育局《小学概览2026》：嶺南大學香港同學會小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=286", scope: "核对2026/27类型、收费、班级、教师、教学语言、评估与中学关系；概览注明资料由学校提供及核实。", sourceType: "school-profile", academicYear: "2026/27；教师统计为2025/26", checkedOn: "2026-10-18" },
    { label: "嶺南学校官网：升中派位结果", url: "https://www.luaaps.edu.hk/article/277?m=&s=", scope: "2026届只列去向学校，没有毕业分母、逐校人数、offer与最终入读口径；不可据此推算录取率。", sourceType: "school-official", academicYear: "2025/26升中结果；2026届", checkedOn: "2026-10-18" },
    { label: "Oh!爸妈／星岛：嶺南2025届升中派位报道", url: "https://www.ohpama.com/957986/%E6%9C%AC%E5%9C%B0%E5%8D%87%E5%AD%B8/%E4%B8%AD%E5%AD%B8/%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D-%E5%B6%BA%E5%8D%97%E5%A4%A7%E5%AD%B8%E9%A6%99%E6%B8%AF%E5%90%8C%E5%AD%B8%E6%9C%83%E5%B0%8F%E5%AD%B8-%E5%8F%A9%E9%96%80/", scope: "媒体于2025-07-08转述学校当届88%首志愿及近七成Band 1/英中数据；没有毕业分母及重复offer口径，报告注明为单届媒体转述。", sourceType: "media-report", academicYear: "2024/25毕业届；2025年报道", checkedOn: "2026-10-18" },
    { label: "GoStudy：嶺南2026届派位专题", url: "https://www.gostudy.hk/68946/%E4%B8%BB%E9%A0%81%E7%BD%AE%E9%A0%821/%E5%8D%87%E4%B8%AD%EF%B8%B3%E5%B6%BA%E5%8D%97%E5%A4%A7%E5%AD%B8%E9%A6%99%E6%B8%AF%E5%90%8C%E5%AD%B8%E6%9C%83%E5%B0%8F%E5%AD%B8%E5%8D%87%E4%B8%AD%E5%86%8D%E5%89%B5%E4%BD%B3%E7%B8%BE-%E3%80%8C%E6%84%89%E5%BF%AB%E5%AD%B8%E7%BF%92%E3%80%8D%E8%A6%8B%E6%88%90%E6%95%88%E7%8D%B2%E6%B4%BE%E9%A6%96%E4%B8%89/", scope: "2026-07-06学校专题转述首志愿94.2%、首三志愿98.1%及一人获派第四志愿；未公布毕业生分母、统计范围或去重方式，不能视为独立审计或最终注册率。", sourceType: "media-report", academicYear: "2025/26毕业届；2026年报道", checkedOn: "2026-10-18" },
    { label: "荷花亲子：嶺南小学课程与学习活动专题", url: "https://www.eugenebaby.com/articleList/%E5%8D%87%E5%AD%B8%E6%95%99%E8%82%B2/%E5%B6%BA%E5%8D%97%E5%A4%A7%E5%AD%B8%E9%A6%99%E6%B8%AF%E5%90%8C%E5%AD%B8%E6%9C%83%E5%B0%8F%E5%AD%B8", scope: "2026-07-01媒体到校访问，转述校方课程及学生活动例子；不是独立课堂评估或家长满意度调查，教师人数口径与PSP2026不同。", sourceType: "media-report", academicYear: "2026-07-01专题", checkedOn: "2026-10-18" },
    { label: "香港01：校长谈2027/28小一面试", url: "https://www.hk01.com/%E8%A6%AA%E5%AD%90/60356214/%E5%B6%BA%E5%B0%8F%E9%9D%A2%E8%A9%A6-%E9%9D%A2%E8%A9%A6%E9%87%8D%E8%A6%96%E8%8B%B1%E8%AA%9E%E8%83%BD%E5%8A%9B%E5%97%8E-%E6%A0%A1%E9%95%B7%E6%8B%86%E8%A7%A33%E9%A1%9E%E5%B8%B8%E8%A6%8B%E9%A1%8C%E5%9E%8B%E5%8F%8A%E5%8F%96%E9%8C%84%E9%87%8D%E9%BB%9E", scope: "2026-08-13校长访谈转述面试流程和形式；非公开评分表，也不保证每届安排不变。", sourceType: "media-report", academicYear: "2027/28招生；2026-08-13报道", checkedOn: "2026-10-18" },
    { label: "嶺南学校官网：本地插班申请", url: "https://www.luaaps.edu.hk/article/46", scope: "核对本地插班材料、递交方式及报名费；各级空缺和评核安排未公开。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "嶺南学校官网：非本地学生插班申请", url: "https://www.luaaps.edu.hk/article/281?m=&mid=9&s=", scope: "仅适用于符合特定护照及学生签证资格的非本地申请者；2026/27费用不适用于所有本地学生。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-18" },
    { label: "嶺南学校官网：2026/27学费减免", url: "https://www.luaaps.edu.hk/article/47/23?mid=9&m=9466101888324&s=2410847089242", scope: "核对AFI机制、全额资助门槛及截止日期；2026/27申请已截止。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-18" },
    { label: "教育王国：嶺南小学家长讨论（2008）", url: "https://www.edu-kingdom.com/forum.php?action=printable&mod=viewthread&tid=1670741", scope: "个别家长历史体验，只作问题线索，不代表当前家庭整体意见。", sourceType: "parent-discussion", academicYear: "2008讨论", checkedOn: "2026-10-18" },
    { label: "教育王国：校园、语言及支援讨论（2013）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2572333", scope: "匿名讨论包含不同意见；只能作为家长关注问题，不能当作现行课时或服务事实。", sourceType: "parent-discussion", academicYear: "2013讨论", checkedOn: "2026-10-18" },
    { label: "教育王国：2026匿名毕业生负面帖", url: "https://www.edu-kingdom.com/forum.php?goto=lastpost&mod=redirect&tid=3886909", scope: "单一匿名自称毕业生发帖者的指控未独立核实；报告不将其当成事实或代表性口碑。", sourceType: "parent-discussion", academicYear: "2026讨论", checkedOn: "2026-10-18" },
    { label: "教育王国：高小學校學術程度讨论主题", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3886915&extra=page%3D1", scope: "2026-06-02家长提问主题，抓取时未见回复；只证明存在该问题，不作为教学评价或在读体验。", sourceType: "parent-discussion", academicYear: "2026讨论", checkedOn: "2026-10-18" },
    { label: "教育王国：嶺小插班讨论主题", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3883127&extra=page%3D1", scope: "2024-11-15插班询问主题，专版索引未见回复；不能用于推断插班空缺或录取难度。", sourceType: "parent-discussion", academicYear: "2024讨论", checkedOn: "2026-10-18" },
    { label: "同区比较：英华小学 PSP2026", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=276", scope: "比较2026/27类型、费用、教学语言及一条龙关系；资料由学校提供及核实。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-18" },
    { label: "同区比较：圣玛加利男女英文中小学 PSP2026", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=281", scope: "比较2026/27类型、费用、教学语言及一条龙关系；资料由学校提供及核实。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-18" },
    { label: "同区比较：玛利诺神父教会学校（小学部）PSP2026", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=265", scope: "比较2026/27资助类型、校网、学费、教学语言及直属中学；资料由学校提供及核实。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-18" },
  ],
la: [
    {
      label: "宏信書院官方網站：學校簡介",
      url: "https://www.luac.edu.hk/school-profile/",
      scope: "查閱校方發布的學校概況及課程架構；報告中的評級、比較和升學分析屬平台整理，不代表校方背書。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "宏信書院官方網站：小學課程",
      url: "https://www.luac.edu.hk/la-curriculum/#PrimarySchool",
      scope: "查閱校方發布的小學課程內容；課程及升學安排以校方最新公布為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
logos: [
    {
      label: "真道書院官方網站：IB 課程簡介",
      url: "https://www.logosacademy.edu.hk/tc/ib-curriculum",
      scope: "查閱校方發布的 IB 課程及相關學段安排；報告中的評級、比較和升學分析屬平台整理，不代表校方背書。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "真道書院官方網站：中學課程架構",
      url: "https://www.logosacademy.edu.hk/en/school-based-curriculum-plan",
      scope: "查閱校方公布的校本課程架構及不同高中路線；具體選科和修讀資格以校方當屆安排為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "真道書院官方網站：中一（拓階四）入學資訊",
      url: "https://www.logosacademy.edu.hk/tc/secondary-1-ds4",
      scope: "查閱校方公布的中一入學申請要求及程序；申請日期按學年更新，請以當屆公告為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "真道書院官方網站：學費",
      url: "https://www.logosacademy.edu.hk/tc/school-fee",
      scope: "查閱校方公布的學費；金額會按學年及修讀路線變動，報名前應核對最新收費表。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
lsps: [
    {
      label: "小學概覽 PSP2026：喇沙小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=87",
      scope: "查閱學校類別、校網、學生性別、直屬中學、課程、班級和學校生活等；資料由學校提供及核實，反映截至 2026 年 5 月的情況。",
      sourceType: "school-profile",
      academicYear: "2026/27 學年；概覽資料截至 2026 年 5 月",
      checkedOn: "2026-10-15",
    },
    {
      label: "喇沙小學官方網站",
      url: "https://www.la-salle.edu.hk/tc/",
      scope: "查閱校方發布的學校概覽、課程、活動和最新公告；小一申請安排以校方當屆公告為準，報告分析不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
ghps: [
    {
      label: "德望學校官方網站：小一入學資訊",
      url: "https://www1.ghs.edu.hk/admission/new_students_admission/",
      scope: "查閱校方發布的小一入學資訊；各屆申請日期、資格和程序可能不同，請以當屆公告為準。報告中的評級、比較和家長經驗不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
aogps: [
    {
      label: "教育局小學概覽 PSP2026：愛秩序灣官立小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=40",
      scope: "查閱 2026/27 學校資料，包括校網、學校類別、學生性別、教學語言和班級等；概覽頁註明資料由學校提供及核實。",
      sourceType: "school-profile",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-15",
    },
    {
      label: "愛秩序灣官立小學官方網站",
      url: "https://www.abgps.edu.hk/",
      scope: "查閱校方發布的學校簡介、課程活動和最新公告；當屆招生日期及要求以校方最新公告為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "教育局：小一入學統籌辦法",
      url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/index.html",
      scope: "核對小一入學制度與程序，不用作推斷個別學生的取錄或派位機會。",
      sourceType: "government",
      academicYear: "2027 年度安排",
      checkedOn: "2026-10-15",
    },
  ],
sppcs2: [
    {
      label: "小學概覽 PSP2026：滬江小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=38",
      scope: "查閱學校類別、校網、課程、教學語言、收費、評估和學校生活等欄位；概覽資料反映學校截至 2026 年 5 月的情況，個別欄位以頁面標示年度為準。",
      sourceType: "school-profile",
      academicYear: "2026 版《小學概覽》；資料截至 2026 年 5 月，個別欄位另有年度",
      checkedOn: "2026-10-15",
    },
    {
      label: "滬江小學官方網站",
      url: "https://www.sap.edu.hk/",
      scope: "查閱校方發布的學校概覽、課程、學生支援和最新消息；平台分析和家長經驗不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "滬江小學：2027 年 9 月小一自行分配學位申請須知",
      url: "https://www.sap.edu.hk/CP/pG/78/293/96",
      scope: "校方列明網上申請日期為 2026 年 9 月 17 至 25 日，親身遞交日期為 9 月 21 至 25 日；截至查閱日申請期已結束，結果及註冊安排以教育局與校方最新通知為準。",
      sourceType: "school-official",
      academicYear: "2027 年 9 月入學（自行分配學位申請已截止）",
      checkedOn: "2026-10-15",
    },
  ],
sppcs: [
    {
      label: "聖保祿天主教小學官方網站",
      url: "https://www.sppcs.edu.hk/",
      scope: "查閱校方發布的學校簡介、課程、學生支援和最新消息；報告中的平台分析不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "聖保祿天主教小學：2027/28 小一自行分配學位申請須知",
      url: "https://www.sppcs.edu.hk/uploads/news/files/2027-2028%E5%B9%B4%E5%BA%A6%20%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B_%E3%80%8C%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E3%80%8D%E9%9A%8E%E6%AE%B5%E6%B3%A8%E6%84%8F%E4%BA%8B%E5%AE%9C%281%29.pdf",
      scope: "校方列明 2027/28 小一自行分配學位申請已於 2026 年 9 月 25 日截止，結果預計於 2026 年 11 月 23 日公布；截至查閱日仍待放榜。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請已截止，預計 2026-11-23 放榜）",
      checkedOn: "2026-10-15",
    },
    {
      label: "聖保祿天主教小學：入學資訊",
      url: "https://www.sppcs.edu.hk/site/view?name=%E5%85%A5%E5%AD%B8%E8%B3%87%E8%A8%8A",
      scope: "查閱校方最新小一及插班入學公告；申請資格、日期和程序以相應年度公告為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
hyps: [
    {
      label: "協恩中學附屬小學官方網站",
      url: "https://www.hyps.edu.hk/",
      scope: "查閱校方發布的學校資訊、課程、學生支援和最新消息；報告中的平台分析不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "協恩中學附屬小學：辦學宗旨及校訓",
      url: "https://www.hyps.edu.hk/site/view?name=%E8%BE%A6%E5%AD%B8%E5%AE%97%E6%97%A8%E5%8F%8A%E6%A0%A1%E8%A8%93",
      scope: "查閱校方公布的辦學宗旨和校訓；內容屬校方自述。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "協恩中學附屬小學：2027 年度小一入學須知",
      url: "https://www.hyps.edu.hk/news/137",
      scope: "校方公布的 2027 年度小一自行分配學位申請期為 2026 年 9 月 17 日至 25 日（電子申請）及 9 月 21 日至 25 日（紙本）；截至查閱日申請期已結束。後續派位安排依教育局程序及校方最新公告。",
      sourceType: "school-official",
      academicYear: "2027 年度入學（自行分配學位申請已截止）",
      checkedOn: "2026-10-15",
    },
  ],
hkups: [
    {
      label: "小學概覽 PSP2026：港大同學會小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=51",
      scope: "查閱學校類別、性別、課程、教學語言、收費、班級和學校生活等欄位；資料由學校提供及核實，注意各項資料適用學年。",
      sourceType: "school-profile",
      academicYear: "2026 版《小學概覽》；學費為 2026/27 學年，部分欄位另標示年度",
      checkedOn: "2026-10-15",
    },
    {
      label: "港大同學會小學官方網站：課程架構",
      url: "https://www.hkugaps.edu.hk/tc/learning-and-teaching/curriculum-framework",
      scope: "查閱校方公布的課程架構、課時和閱讀安排；實際課程以校方最新說明為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "港大同學會小學：2027/28 小一入學申請",
      url: "https://www.hkugaps.edu.hk/tc/about-us/admissions/p1-admission",
      scope: "校方目前公布 2027/28 小一第二階段面試日期為 2026 年 10 月 12 日至 11 月 12 日；截至查閱日程序進行中，個別安排和結果以校方通知為準。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（第二階段面試進行中）",
      checkedOn: "2026-10-15",
    },
  ],
ltmps: [
    {
      label: "小學概覽 PSP2026：藍田循道衞理小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=125",
      scope: "查閱校網、學校類別、課程、教學語言、收費和學校生活等欄位；資料由學校提供及核實，注意各欄標示的適用年度。",
      sourceType: "school-profile",
      academicYear: "2026 版《小學概覽》；各欄適用年度以頁面標示為準",
      checkedOn: "2026-10-15",
    },
  ],
munsangps: [
    {
      label: "小學概覽 PSP2026：民生書院小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=104",
      scope: "查閱學校類別、教學語言、課程、學生支援、學校生活及收費等資料；概覽資料截至 2026 年 5 月，部分欄位另有標示年度。",
      sourceType: "school-profile",
      academicYear: "2026 版《小學概覽》；資料截至 2026 年 5 月，收費為 2026/27 學年",
      checkedOn: "2026-10-15",
    },
    {
      label: "民生書院小學官方網站",
      url: "https://primary.munsang.edu.hk/",
      scope: "查閱校方發布的學校資訊、學與教和校園最新消息；報告中的平台評級、比較和家長經驗不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "民生書院小學：2027/28 小一及插班申請",
      url: "https://primary.munsang.edu.hk/primary/php/webcms/public/index.php3?mode=published&refid=1540",
      scope: "校方目前列明 2027/28 小一及小二至小四申請安排：預計 2027 年 5 月初接受網上申請、6 月初面試或入學試，詳情預計 2027 年 3 月底公布。這些日期尚未到，申請前請再核對校方更新。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請安排；詳情預計 2027 年 3 月底公布）",
      checkedOn: "2026-10-15",
    },
  ],
mps: [
    {
      label: "瑪利曼小學官方網站",
      url: "https://www.mps.edu.hk/",
      scope: "查閱校方發布的學校資訊和公告；報告中的評級、比較和家長經驗不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "瑪利曼小學：課程",
      url: "https://www.mps.edu.hk/curriculum.php?id=1",
      scope: "查閱校方公布的課程資訊；實際課程安排以校方最新說明為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "瑪利曼小學：校方公告",
      url: "https://www.mps.edu.hk/news.php",
      scope: "查閱校方發布的公告；招生日期及程序以相應年度的公告為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
gt: [
    {
      label: "優才（楊殷有娣）書院官方網站",
      url: "https://www.gtcollege.edu.hk/",
      scope: "查閱校方發布的學校概況和最新公告；報告中的評級、比較及升學分析屬平台整理，不代表校方背書。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "優才書院：學術課程",
      url: "https://www.gtcollege.edu.hk/academic/",
      scope: "查閱校方公布的學術課程安排；各年級實際修讀科目以校方最新課程資料為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "優才書院：國際文憑課程（IB）",
      url: "https://www.gtcollege.edu.hk/international-baccalaureate/",
      scope: "查閱校方公布的 IB 課程資訊；修讀資格、名額及安排以校方當屆政策為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "優才書院：學費及費用",
      url: "https://www.gtcollege.edu.hk/tuition-fees/",
      scope: "查閱校方公布的學費和相關費用；金額可能按學年及級別調整，報名前應核對最新收費資料。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "優才小一招生：2027/28 入學",
      url: "https://main.gtschool.hk/admission/g1-2728/",
      scope: "查閱校方公布的 2027/28 小一申請及程序資訊；本輪只核對頁面入口可用，申請日期、資格和安排請以招生頁最新公告為準。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-15",
    },
  ],
spccps: [
    {
      label: "聖保羅男女中學附屬小學官方網站",
      url: "https://www.spccps.edu.hk/tc/",
      scope: "查閱校方發布的學校簡介、課程、校園資訊和最新公告；報告中的評級、比較和家長經驗不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "聖保羅男女中學附屬小學：課程簡介",
      url: "https://www.spccps.edu.hk/tc/subject/introduction",
      scope: "查閱校方介紹的小學課程及升中銜接安排；具體升學條件以校方現行政策為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "聖保羅男女中學附屬小學：2027/28 小一入學申請",
      url: "https://www.spccps.edu.hk/tc/latest_new/2027-28-%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B-0",
      scope: "校方於 2026 年 9 月 2 日公布 2027/28 小一申請；官方招生頁列明申請期為 2026 年 9 月 7 日上午 9 時至 9 月 11 日下午 4 時，截至查閱日已截止。下屆日期及安排須待校方另行公布。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請期已結束）",
      checkedOn: "2026-10-15",
    },
  ],
spcps: [
    {
      label: "聖保羅書院小學官方網站：2027/28 小一入學程序",
      url: "https://www.spc-ps.edu.hk/page.php?id=47&lang=tchi&mid=65",
      scope: "校方公布 2027/28 小一網上申請期為 2026-07-27 至 2026-08-14 晚上 10 時，親身辦理時段為 2026-08-14；截至查閱日申請期已結束。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請期已結束）",
      checkedOn: "2026-10-15",
    },
    {
      label: "聖保羅書院小學官方網站",
      url: "https://www.spc-ps.edu.hk/",
      scope: "查閱校方發布的學校概覽、課程及公告；報告中的平台評級、升學推算和家長經驗不代表校方背書。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
sfa: [
    {
      label: "聖方濟各英文小學官方網站：2027/28 小一入學資料",
      url: "https://www.sfaeps.edu.hk/en/admission",
      scope: "校方公布 2027/28 小一約 160 個學額，申請期為 2026-08-21 至 2026-09-14；截至查閱日已截止。面試、放榜及課程資料以招生頁及公告為準。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請期已結束）",
      checkedOn: "2026-10-15",
    },
    {
      label: "聖方濟各英文小學官方網站",
      url: "https://www.sfaeps.edu.hk/en",
      scope: "查閱校方發布的學校概覽、課程、校務公告及學生發展資訊；不代表報告中的平台評級或升學分析由校方背書。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
dgjs: [
    {
      label: "拔萃女小學官方網站：小一入學",
      url: "https://admission.dgjs.edu.hk/",
      scope: "校方列明 2027/28 小一申請期為 2026-08-14 至 2026-08-25 中午，並公告 2026-09-21 起可登入帳戶查看首次面試時間；截至查閱日申請期已結束。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請期已結束）",
      checkedOn: "2026-10-15",
    },
    {
      label: "拔萃女小學官方網站",
      url: "https://www.dgjs.edu.hk/",
      scope: "查閱校方發布的課程、學校發展及最新公告；報告中的平台評級、分析及家長經驗不代表校方立場。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
alliance: [
    {
      label: "九龍塘宣道小學官方網站",
      url: "https://www.apskt.edu.hk/",
      scope: "查閱校方發布的學校概覽、課程、學生活動及公告；不代表報告中的評級或升學分析由校方背書。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
    {
      label: "九龍塘宣道小學：小一入學及各級插班",
      url: "https://www.apskt.edu.hk/application.php",
      scope: "校方目前列出的 2027/28 小一申請期為 2026-09-01 至 2026-09-15，並列約 168 個學額；截至查閱日申請期已結束，勿視作仍可申請。",
      sourceType: "school-official",
      academicYear: "2027/28 入學（申請期已結束）",
      checkedOn: "2026-10-15",
    },
  ],
"braemar-hill": [
    {
      label: "幼稚園及幼稚園暨幼兒中心概覽 2025/26：寶山幼兒園",
      url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?lang=tc&schid=6667",
      scope: "核對學校名稱、2025/26 學年學費及 2024 年 9 月在讀人數：PN 84 人，K1 上午班及下午班各 79 人。這些是該時點學生人數，不是每年招生名額；校方未公開 PN/K1 每屆招生配額。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年；在讀人數截至 2024 年 9 月",
      checkedOn: "2026-10-22",
    },
    {
      label: "寶山幼兒園：入學申請",
      url: "https://braemarhillnurseryschool.com/tc/admissions.html",
      scope: "核對校方列出的 PN 及 K1–K3 上午／下午班申請方式；頁面說明以書信索取初步入學申請表，未公布每屆招生名額或固定申請日期。",
      sourceType: "school-official",
      academicYear: "校方招生頁；查閱 2026-10-22",
      checkedOn: "2026-10-22",
    },
    {
      label: "教育局收費證明書：寶山幼兒園",
      url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/565938.pdf",
      scope: "證明書列明半日班每月 $11,550、全年 12 期（全年 $138,600），並於 2026 年 8 月 1 日起生效。報告正文仍列 2025/26 學年每年 $135,000，屬較早年度數字；請以證明書核對現屆學費。",
      sourceType: "government",
      academicYear: "2026/27 學年（2026-08-01 起生效）",
      checkedOn: "2026-10-15",
    },
  ],
  "spcc-secondary": [
    {
          label: "聖保羅男女中學：University Offers（Class of 2023–2026）",
          url: "https://www.spcc.edu.hk/academic/culture-of-excellence/university-offers",
          scope: "以真實瀏覽器展開官方頁面的 Class of 2023–2026 區塊，核對各屆敘述與所列院校 offer 次數。2023 屆 headline 為 19 個 Oxbridge offers，表列 Cambridge 17、Oxford 2；其美國敘述列 UCLA 3，但表格列 UCLA 4，保留此頁內差異。2024 屆 headline 16 個 Oxbridge offers，表列 Cambridge 13、Oxford 3；英國院校例子、獎學金及非 JUPAS 表數字按逐屆區塊記錄。2025 屆頁面稱 12 名學生獲 Cambridge offer、2 名將赴 Oxford、3 名將赴 Pennsylvania；其中一名將入讀 Wharton，並列 full scholarship、HKSAF Scholarship 及 AmCham Charitable Foundation Lyn Edinger U.S. Studies Scholarship。2026 屆列部分英國 offer 次數與 Oxford/Cambridge 屆別敘述；頁面另列美國院校（Northeastern 3、UC Berkeley 2）、Berklee、Duke-Kunshan、HKU–Peking University 雙學位法律、UCL–Sciences Po 及加拿大院校，並稱兩名學生將赴 Sciences Po。2026-10-19 以真實瀏覽器直接打開官方頁面，確認 Class of 2026 區塊已展開並讀取其內容；同日亦展開核對 Class of 2025，報告數字與頁面一致。未標次數的院校不外推 offer 數。這些是校方公布的屆別 offer 數及敘述，不是完整畢業生去向；頁面沒有各屆完整畢業生分母、申請人、獨立 offer 持有人、接受數、獎學金金額或最終註冊名單。",
          sourceType: "school-official",
          academicYear: "Class of 2023–2026 大學 offers 與個別去向敘述",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學：2027/28 中一入學常見問題",
          url: "https://www.spcc.edu.hk/f/page/1820/10434/FAQs%2027-28.pdf",
          scope: "核對 2027/28 中一總學額 245、附小約 140、外校申請約 100、預計約 450 人獲邀面試、收生不考慮性別及宗教背景（宗教科屬德育一部分）、Q8 小五各學期成績表只可上載至一個檔案欄位、可先合併為一個檔案；Q11 已完成但未公布成績的比賽或考試可在申請表相關部分說明，截止後不接受補交；Q9 成績表未列分數／等級／名次時按申請人所交資料考慮、Q18 七月領取派位證與入學註冊證並將註冊證交回學校的程序、甄選四項分值、面試形式、結果及承諾書時程、Q49 不會單以成績差為由勒令退學的政策邊界、Q23 才藝計劃未獲取錄者仍納入一般申請考慮、Q23–Q24 相關證明、毋須交作品及可用報章報道等獲獎紀錄、Q25 才藝獎學金 HK$4,000 及體育／音樂總監評審（必要時校外專家協助，未公布獲獎人數）、Q30 合資格提名獎學計劃申請者獲優先考慮、獎學金另經文件／提名表／面試評核且於開學後首學期發放；Q25 說明才藝獎學金評審方式但未列獲獎人數；Q26 合資格才藝申請人獲邀面試、示範按個別情況處理，Q27 校方有專責老師協助才藝學生平衡課外活動／比賽與學業（未列支援方式、頻率或年級）；與同屆申請須知「計劃取錄者將獲獎學金」的表述一併核對，未能確認兩文件描述的取錄與獲獎關係，Q35 獎學金與費用減免可同時申請但分別審批、Q37 可同時申請校方費用減免與學資處書簿／車船津貼、Q40 公職人員及申請政府學費津貼的家庭仍可申請校方減免或接受獎學金、Q48 校方規定活動可能收取全部或部分費用，自願課外活動由學生支付，獲費用減免學生可獲海外交流及課外活動津貼但未列金額與個案資格、學校提名獎學計劃不考慮家庭經濟狀況及取錄後仍可另申費用減免、IB 約 60 人與分班、樂器及初中分組安排；並核對 Q51 所列所有中一新生須參加兩星期舍堂體驗、F1–F6 可申請長期寄宿及 F6 可申請於備試假期入住，以及獲學費減免學生可獲海外交流及課外活動津貼（未列金額或個別項目資格）。第 6 頁 Q45 列日語、韓語興趣班及法語、德語、西班牙語公開試班；初級班無須相關基礎，完成四年課程並通過年度考核後可參加官方文化機構公開考試；未列對象年級、當年開班、時段、費用與名額。Q15 列 2026-12-12 學校提名計劃申請人及通過初審的才藝獎勵計劃申請人面試、2027-03-13 一般申請面試，提名／才藝組結果預計 2027 年 3 月中旬、一般結果 3 月下旬；是否獲面試均電郵通知；面試詳情於面試日期前兩天內發送。另依 PDF 第 1–2 頁核對上載格式 GIF/JPG/PNG/PDF、每檔上限 10 MB、影像寬度下限 1,000 像素、證件近照至少 240×300 像素或同比例、來自未參加統一派位小學、沒有 STRN 的申請人填 N/A，以及申請期內可修改、截止後不改不補；均只適用 2027/28。第 6 頁 Q50 列 12A 城巴及 1A 小巴往返學校的公共交通資訊，概述約每 10 分鐘一班；並說明保姆車由私人經營、學校不管理。該班次是 FAQ 的概述，不代表特定上學日的實際班次或車程。城巴官方 12A 班表按時段及上學日列出不同班距，惟班表日期為 2022-06-13，不能作為 2027/28 現行班次證據；運輸署 HKeMobility 路線資料於 2026-10-19 查閱時列出 1A 工作日班距 7–30 分鐘、週末及公眾假期 20–30 分鐘，並稱工作日早晚繁忙時段加派車；該頁未標明適用學年，不能替代當屆校日班次。約數不計算錄取率。",
          sourceType: "school-official",
          academicYear: "2027/28 入學",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學：2024/25 學校報告",
          url: "https://www.spcc.edu.hk/f/plans_and_reports/4711/Annual%20School%20Report%202024-25.pdf",
          scope: "核對學生人數快照：年報列 Secondary School 於 2024-09-01 有 1,219 人、2025-08-31 有 1,177 人，並列 42 人離校；未說明與 2025/26 School Profile 所列 1,259 總人數的統計時點／口徑差異。另核對第六章學生支援紀錄，以及第 18 頁 2025 屆 DSE 5** 數（年報列 138，現行 Public Exams 頁列 139；兩者均列 n=109 及 474 個 5 或以上，校方未解釋差異）；第 19 頁 2025 屆 IBDP 均分及高分人數（年報列 42.4、3／14／22 人達 45／44／43 分，現行 Public Exams 頁列 42.5、3／17／19 人，較早 School Profile 亦列 42.4 但為 3／16／20 人；校方未解釋版本差異）；第 19–20 頁 2024/25 F6 HKDSE 109 人／IBDP 59 人 cohort、Student Exit 地區分類（本地大學/專上院校 123、USA 8、UK 33、中國 1、其他 3）、103 名 JUPAS 申請者的本地 offers 百分比分布和 57 名 IBDP 個別大學申請者的 HKU/CUHK/HKUST offer 數。年報未定義 Student Exit 是 offer、接受或註冊，也未給獨立 offer 持有人及最終註冊數；不據此計算錄取率或驗證 Profile 的概述性 100% entry。另核第 3 頁 2024/25 學費減免實績：173 名成功學生申請人及各減免比例人數，並列 57 名課本／交通津貼與 98 名學校助學金受助學生；未提供總申請數，亦未說明不同援助項目是否去重，不計申請成功率或獨立受助人總數。第 5–6 頁記載 2024/25 全體 F3 學生完成 28 天 Rites of Passage，分布於三個寄宿營地及四類活動；年報稱參與者反饋正面，但未列實際費用、參與者數、資助額、回饋方法或量化效果。第 8–10 頁核支援團隊及教師支援多元學習者紀錄；年報全文抽取文本檢索 “Non-Chinese” 與 “NCS” 均無匹配（不據此推斷沒有其他支援）；未列服務對象總數、輪候時間或個別服務強度，不作個人服務承諾。",
          sourceType: "school-official",
          academicYear: "2024/25 學年",
          checkedOn: "2026-10-19",
        },
    {
          label: "拔萃男書院：2026/27 學費",
          url: "https://www.dbs.edu.hk/index.php?m=schoolfee&s=admission",
          scope: "只作本地生 2026/27 年費比較：G7–G12 每年 HK$65,980、IB G11–G12 每年 HK$151,180；G10 bridging course 的 HK$65,980 由另一筆 DBS 2027/28 中一招生公告直接證實。不可視為 2027/28 報價。",
          sourceType: "school-official",
          academicYear: "2026/27 學年",
          checkedOn: "2026-10-19",
        },
    {
          label: "拔萃女書院：2027/28 中一申請",
          url: "https://www.dgs.edu.hk/admissions/s1-application",
          scope: "核對 2027/28 中一申請期已於 2026-10-03 結束；招生流程列第一階段 50%（學業／操行與校內外經歷各 25%）、第二階段入圍者 11-03 前交文件、11-14 面見及 11-21 邀請制技能測試、第三階段於 2027 年 1 月上旬通知並於 1–2 月面見校長、3 月上旬通知取錄。頁面同時公布本地生現行學費 HK$42,000，以及中五起 HKDSE/GCE A-Level 路線；按 2026-10-19 核對日期，current academic year 對應 2026/27，不能外推為 2027/28 報價，校方明言 2027/28 費率可能調整。",
          sourceType: "school-official",
          academicYear: "2027/28 入學；費用為核對日現行學年（2026/27）",
          checkedOn: "2026-10-19",
        },
    {
          label: "港大同學會書院：2026/27 學費",
          url: "https://www.hkugac.edu.hk/engage/as-a-student/school-fees",
          scope: "只作本地生年費比較：S1–S3 HK$48,450、S4–S6 HK$51,265；不可視為 2027/28 報價。",
          sourceType: "school-official",
          academicYear: "2026/27 學年",
          checkedOn: "2026-10-18",
        },
    {
          label: "港大同學會書院：My Alternative Curriculum（IAL）",
          url: "https://www.hkugac.edu.hk/nurture/quest-for-truth/the-quest/my-alternative-curriculum",
          scope: "核對學校公開提供 Pearson Edexcel International AS/A-Level，並稱自 2024/25 學年起 S5 學生可選 DSE 或 IAL；頁面未保證後續 cohort 的課程安排，實際選科和分流以當屆手冊為準。",
          sourceType: "school-official",
          academicYear: "頁面所列自 2024/25 起的 S5 課程路徑；後續 cohort 待當屆確認",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學：2027/28 中一招生及申請須知",
          url: "https://www.spcc.edu.hk/admissions/local-admissions/secondary/f1",
          scope: "核對 2027/28 中一申請期、約 100 個外校申請位置與招生簡介會；HK$75 報名費和文件要求見另列申請須知 PDF，面試權重及約 17 個提名位置見另列中一 FAQ。",
          sourceType: "school-official",
          academicYear: "2027/28 入學",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學官方網站：HKDSE 課程",
          url: "https://www.spcc.edu.hk/academic/curriculum/dse",
          scope: "核對 HKDSE 四個考試核心科、另列的校本非考試科 Introduction to Knowledge（頁面列 F4 每個 10 日課節週期 1 節）、選修安排、F3 選科程序、M1/M2 門檻及第四選修條件；校方 FAQ 明確稱完成 F4 IB 預備課程後不可轉修 DSE，但網頁未標適用學年。至少五人盡量開班、成績加權、數學延伸門檻及第四選修規定均按該無年份 FAQ 引用，下一屆執行和實際開班須再確認。FAQ 另稱部分大學課程要求數學延伸部分但未指定單元；學校不提供丙類其他語言課程，相關考試、學習證明與學校申請程序亦按該 FAQ 記錄，家庭須確認當屆要求。頁面另附明確標為 2025–2026、供參考的 42 組 DSE 選修組合，僅作該屆快照，不外推至 2027/28。",
          sourceType: "school-official",
          academicYear: "按校方最新課程頁",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學官方網站：公開考試結果（HKDSE 及 IBDP）",
          url: "https://www.spcc.edu.hk/academic/culture-of-excellence/public-exams",
          scope: "核對校方更新至 2026-08-12 的 DSE 各屆考生人數、JUPAS 學位課程資格比例及成績摘要，以及更新至 2026-08-24 的 IBDP cohort 結果；2025 IBDP 較新頁面與舊 School Profile 的均分、44 分和 43 分人數及 44 分以上比例不同，以較新頁面為準。2026-10-19 直接重開校方 Public Exams 頁面核對；2023 屆兩名學生四科核心、三科選修及數學延伸部分均獲 5**，另兩人六科及數學延伸部分獲 5**；2024 屆兩名六科 5** 並獲公民科達標的 perfect scorers 均在數學延伸部分獲 5**，另有一名五科 5**、公民科達標學生在數學延伸部分獲 5**；2026 屆另有 2 名五科 5**、公民科達標學生，其中 1 人數學延伸部分亦獲 5**；2025 屆四名 perfect scorers 為六門考試科目均獲 5**、公民科達標，其中三人數學延伸部分亦獲 5**；不把公民科達標誤計為第六門 5**；資格比例不是實際取錄或個人升學機會。",
          sourceType: "school-official",
          academicYear: "Class of 2025–2026 公考結果",
          checkedOn: "2026-10-19",
        },
    {
          label: "JUPAS：2027 入學甄選程序及最低資格限制",
          url: "https://www.jupas.edu.hk/en/application-procedures/post-hkdse-exam-results-announcement/iteration-process/",
          scope: "說明達到院校及個別課程最低要求不保證錄取，課程按各自甄選準則評估；家長須查當屆課程要求及院校網頁。",
          sourceType: "government",
          academicYear: "2027 JUPAS Admissions Exercise",
          checkedOn: "2026-10-18",
        },
    {
          label: "聖保羅男女中學官方網站：Subjects Offered",
          url: "https://www.spcc.edu.hk/academic/subjects-offered",
          scope: "核對 F1-F3、HKDSE、F4 IBDP 預備年及 IBDP 的科目類別。現行頁面未標適用學年或 cohort，只能作科目目錄；不可據此確認 2027/28 實際組合、開班或個別學生可選資格，須依當屆校方安排核實。",
          sourceType: "school-official",
          academicYear: "網頁未標示；頁面內容於 2026-10-19 核對",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學官方網站：學費減免及財務援助",
          url: "https://www.spcc.edu.hk/admissions/fee-remission-and-financial-aid",
          scope: "核對 2026/27 中學學費與四人家庭五檔減免；費用頁列 S4 年費 HK$84,100、S5–S6 DSE／IBDP 學費。F2–F5 登記通知列 F4 DSE／Prep Yr 9 月缴 HK$8,410，但未说明 F4 IBDP 预备年本地全年学费，不能据 S4 年费推定预备年费率。按已公布费率冻结已知项目：DSE 六年学费 HK$505,500；IBDP 已知项目 HK$520,400，另加未公开的预备年学费，因此总额及两路线差额无法确认。于 2026-10-19 直接重开核对 BDI 按家庭人数基准、收入及资产计算、单亲调整、每年申请、获批后同一学年内不因收入增减调整（重大资料失实除外）、最高 HK$12,000 中学助学金及紧急援助；净学费为静态算术，个案由校方审核，后续学年需重核。",
          sourceType: "school-official",
          academicYear: "2026/27 學年",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學官方網站：IBDP 及 F4 預備年招生",
          url: "https://www.spcc.edu.hk/admissions/local-admissions/secondary/ibdp",
          scope: "核對 F4 IBDP 預備年申請資格及 2026/27 輪次：申請期為 2026-04-27 09:00 至 05-08 16:00；校方列出 6-27 中英數筆試及 7-08 面試，兩者均標為暫定，該輪現已結束。校方稱課程供 F5/F6 IBDP 學生，須完成 F3 或同等課程並具良好學術潛力；同頁稱全級排名前 15% 且操行 B 或以上的學生獲學業優秀獎學金，但未列金額、續領年限或 2027/28 是否延續。頁面未列本地預備年全年學費；登記通知列出的 HK$8,410 僅為 F4 DSE/Prep Yr 9 月繳款，不能與 S4 HK$84,100 年費相互推定。全年度金額待校方確認（Claim Ledger SPCC-78）。未公布 2027/28 下一輪日期與要求。",
          sourceType: "school-official",
          academicYear: "2026/27 招生（該輪已結束）",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學官方網站：F2–F5 插班招生",
          url: "https://www.spcc.edu.hk/admissions/local-admissions/secondary/f2-f5",
          scope: "核對 F2–F5 插班渠道及 2026/27 招生安排：F2–F4 可全年滾動申請，文件保留一年；下一學年須重新遞交期末申請，該輪於 2026-05-08 截止。頁面列 2026-06-27 中英數筆試及 2026-07-08 面試均為 tentative；所有 F3 申請人及擬修讀任何科學選修科的 F4/F5 DSE 申請人另須應考科學；不把這項規定延伸至 F4 Preparatory Year 或 F5 IBDP 申請者。這些是 2026/27 輪次，日期不外推。另核對 F2/F3 插班學生須參加 F3 夏季澳洲 Rites of Passage，校方標為 self-funded；費用與資助個案仍按當屆條件向校方確認。",
          sourceType: "school-official",
          academicYear: "2026/27 招生（該輪已結束）",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學：School Profile 2025–2026",
          url: "https://www.spcc.edu.hk/f/page/1066/10680/School%20Profile_2025.pdf",
          scope: "核對學校類別、課程分流、教學語言、2025/26 學生總人數 1,259（年報另列 2024-09-01 1,219、2025-08-31 1,177，數字與日期無法直接對齊；詳見年報來源範圍）、Class of 2025 DSE/IBDP cohort、DSE 各科 5*/5**（公民科為 Attained）比例及 SPCC 應考人數、全港參照、IBDP 第 3 頁各科 HL/SL 平均和 SPCC 應考人數、2020–2025 海外大學 offer 次數、成績單／GPA 說明、Further Studies Office、課外活動和外校中一名額描述。Further Studies Office 部分原文稱該辦公室支持計劃到香港以外升學學生的申請，並與 HKDSE 和 IBDP 學生合作；未說明本地 JUPAS 申請是否由該辦公室負責。分科人數是各科應考生數，並非全級統一分母；IBDP 全球參照為 May 2024，不能與 Class of 2025 直接比較。校方 School Profile 索引頁於 2026-10-19 重開，仍只連結至此 2025–2026 版本（頁面標示更新日期 2025-10-23）；報告所列 10 個例子已逐項按第 4 頁核對（KCL 225、UCL 191、Edinburgh 122、Manchester 117、Warwick 111、Imperial 93、UCLA 17、UC San Diego 25、Toronto 51、UBC 25）；Offer 次數不等於學生人數或最終入讀，申請/接受/註冊分母未公開；100% 本科去向概述未提供可重算分母。",
          sourceType: "school-official",
          academicYear: "2025/26 學年；Class of 2025；海外 offers 2020–2025",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學：2027/28 中一申請須知（PDF）",
          url: "https://www.spcc.edu.hk/f/page/1820/10434/F1%20Notes%20to%20Applicants%20(OPS)_27-28.pdf",
          scope: "核對 P5 成績與活動證明、毋須提交小學推薦信、HK$75 申請費、不可補件規則、助學（FN）與杰出（OS）兩類提名門檻、面試日期及獎助安排；Notes 寫明經 OS 計劃取錄者將獲 HK$2,000 入學獎學金、經才藝計劃取錄者將獲 HK$4,000 才藝獎學金，與同屆 FAQ 對獎學金評核及結果通知的描述並列核對；兩份文件未清楚說明取錄與獎學金審批的關係，報告將其列為待校方釐清的文件說明差異。記錄升讀 F2 至 F6、全級前 15% 且操行 B 或以上者可獲 HK$2,000–6,000 學業優異獎學金（按年級及表現）；助學計劃取錄者 F1 可獲 100% 學費減免，但須每年續辦，文件未承諾後續學年必定繼續全免。全額減免學生可獲額外助學金支付課本、校服及膳食，該屆文件未列金額；現行費用頁的中學助學金最高 HK$12,000 不視作 2027/28 F1 保證。該學業獎與 F4 IBDP 招生頁同名獎學金是否完全同一方案未明示。兩類提名約 17 個位置不包括另列的才藝計劃；規則只適用 2027/28 入學。另記錄才藝計劃資格描述的中英文差異：英文版稱 national/regional junior level，中文版稱‘國際或地區認可水平之才藝’，申請者須向校方確認當屆資格。Notes 列招生查詢 2523 1187（週一至五 9:00–16:00；週六 9:00–12:00，公眾假期除外）及 eAdmissions 技術支援 1833 282（週一至五 9:00–18:00；週末及公眾假期無服務）；技術支援只處理系統操作，聯絡時間以當屆 Notes 為準。",
          sourceType: "school-official",
          academicYear: "2027/28 入學",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學：2025/26–2027/28 學校發展計劃",
          url: "https://www.spcc.edu.hk/f/plans_and_reports/4709/School%20Development%20Plan_2025-26%20to%202027-28.pdf",
          scope: "核對第 10 頁校內表現檢討所述約 90% 學生獲提供最優先科目組合，以及按大學擬修課程加強學術諮詢的可改善方向；該自評未列 cohort/分母，不代表個人首選或未來保證。另核對第 10–11 頁學生情緒支援及資源改善方向、第 15 頁身心健康策略，以及第 19 頁 2025/26–2027/28 AI 輔助閱讀／寫作評估、自評與檢視 AI 解答的計劃。這些為校方自評及三年計劃，不證明措施已全部落實、成效已達成或每名學生均獲個別支援。",
          sourceType: "school-official",
          academicYear: "2025/26–2027/28 發展周期",
          checkedOn: "2026-10-19",
        },
    {
          label: "聖保羅男女中學官方網站：校舍及校園設施",
          url: "https://www.spcc.edu.hk/about/the-school/campus",
          scope: "核對 SPCC 校址為 33 MacDonnell Road, Hong Kong；地區歸納用於比較，不代表通勤時間。校園設施按校方清單描述；Campus 頁列 12A Citybus 由 Admiralty (Tamar Street) 開出、1A 小巴由 Hong Kong Station 開出，不代表當屆班次或通勤時間。",
          sourceType: "school-official",
          checkedOn: "2026-10-19",
        },
    {
          label: "教育王國：SPCC 家長作業與測驗體驗討論",
          url: "https://www.edu-kingdom.com/forum.php?extra=page%3D1%26orderby%3Dlastpost&mod=viewthread&page=30&tid=3876675",
          scope: "一條 2024-11 至 2025-01 討論串中兩名網名使用者自述中一首學期及中四的功課、測驗體驗；身份、課程路線與代表性無法獨立核實，只作家庭追問線索，不作全校結論或排名。",
          sourceType: "parent-discussion",
          academicYear: "2024-11 至 2025-01 討論",
          checkedOn: "2026-10-19",
        },
    {
          label: "教育局：圣保罗男女中学 2026/27 收费证明书",
          url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/510980.pdf",
          scope: "核对 2026-09-01 生效的本地生 F1–F3、F4、F5–F6 DSE/IBDP 学费；不同年级及路线分列，不将寄宿或非本地费用混入本地学费，也不外推为 2027/28 收费。",
          sourceType: "government",
          academicYear: "2026/27",
          checkedOn: "2026-10-20",
        },
    {
          label: "圣保罗男女中学：课程概览",
          url: "https://www.spcc.edu.hk/academic/overview",
          scope: "核对现行中学英语授课安排、初中中文科普通话授课及分科小组教学人数；小组人数不视为全校班额或师生比，页面未标适用学年。",
          sourceType: "school-official",
          academicYear: "网页未标示；核对日 2026-10-20",
          checkedOn: "2026-10-20",
        },
    {
          label: "TOPick：圣保罗男女中学入学简介会报道",
          url: "https://topick.hket.com/article/3852395",
          scope: "2024-11-04 报道记者称简介会现场约 1,300 人，并转述校方介绍的舍堂体验和澳洲活动；仅作招生关注度及校方活动介绍背景，不作家长满意度或在读体验证据。",
          sourceType: "media-report",
          academicYear: "2024-11-04 报道；12-28 更新",
          checkedOn: "2026-10-20",
        },
    {
      label: "SchoolBanding：2026 全港中學 Banding 估算",
      url: "https://schoolbanding.com/rankings/2026",
      scope: "該站 2026 排名頁將 SPCC 列為 Band 1A。屬第三方估算，方法與底層資料未完全公開，不作官方評級、學校排名結論或學生個人派位組別。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-20",
    },
    {
      label: "香港導師聯會：中學 Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/banding",
      scope: "該站中學 Banding 頁將 SPCC 列為 Band 1A（2026 estimate）。屬第三方估算，未能確認其與其他估算站的資料獨立性，不作官方評級或個人派位機會。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-20",
    },
    {
      label: "SchoolDays：聖保羅男女中學 Banding 估算",
      url: "https://www.schooldays.com.hk/secondary/e1c0d957",
      scope: "該站將 SPCC 列為 Band 1A，並說明是依教學語言、教師資歷等公開資料估算。屬第三方估算，不是校方或教育局評級，也不能代表學生個人派位組別。",
      sourceType: "third-party-estimate",
      academicYear: "頁面未標估算年度；核對日 2026-10-20",
      checkedOn: "2026-10-20",
    }
  ],
dbs: [
    {
      label: "中學概覽 2025/26：拔萃男書院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=2",
      scope: "查閱學校類別、學生性別、學費、班級、科目及中一入學等概覽欄位；資料由學校提供及核實，僅代表 2025/26 學年。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-15",
    },
    {
      label: "拔萃男書院官方網站",
      url: "https://www.dbs.edu.hk/index.php?m=g7app&s=admission",
      scope: "核對校方公布的中一申請方式、選生準則和 2027 年 9 月入學安排；申請日期及要求以頁面最新公告為準。",
      sourceType: "school-official",
      academicYear: "2027 年 9 月入學",
      checkedOn: "2026-10-15",
    },
    {
      label: "拔萃男書院 IB Diploma Programme：入學與申請",
      url: "https://www.ib.dbs.edu.hk/",
      scope: "核對校方公布的 IB Diploma Programme、科目選擇和申請資訊；注意 IB 課程與校內其他課程的適用年級不同。",
      sourceType: "school-official",
      checkedOn: "2026-10-15",
    },
  ],
"dbs-secondary": [
    {
      label: "拔萃男書院：2023/24 學校報告（學生表現統計）",
      url: "https://www.dbs.edu.hk/administration/DBS%20School%20Report%202023-2024.pdf",
      scope: "列出 2021–2023 HKDSE 學生達本地學士學位課程最低入學要求及副學位課程最低入學要求的比例；校方表格未列考生分母。2022 年學士資格比例採用較新 2023/24 報告的 66.2%，並在報告註明 2022/23 舊報告曾列 69.3%。這是資格比例，不是實際取錄或入讀率。",
      sourceType: "school-official",
      academicYear: "2023/24 學校報告；HKDSE 2021–2023 屆",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院：2022/23 學校報告（2022 年歷史數字版本比對）",
      url: "https://www.dbs.edu.hk/administration/DBS%20School%20Report%202022-2023.pdf",
      scope: "只用於記錄該舊版學校報告曾把 2022 HKDSE 達本地學士學位課程最低入學要求比例列為 69.3%；較新 2023/24 報告改列 66.2%。不採舊值作現行趨勢值，亦不推測修訂原因；兩版本均未列該指標分母。",
      sourceType: "school-official",
      academicYear: "2022/23 學校報告；HKDSE 2022 屆",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院：2024/25 學校報告",
      url: "https://www.dbs.edu.hk/administration/DBS%20School%20Report%202024-2025.pdf",
      scope: "核對學校當年學生人數、校方自評的情緒支援與輔導措施；不將服務存在推斷為個別學生的實際成效，也不以當年 G12 在校人數充當 2025 應考分母。",
      sourceType: "school-official",
      academicYear: "2024/25 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃男書院：2026/27 學生資助計劃",
      url: "https://www.dbs.edu.hk/index.php?m=sfas&s=welfare",
      scope: "核對中學 G7–G12 學費減免、廉價午膳、課本及校服津貼四項申請入口；2026/27 舊截止日不可沿用至 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃男書院：2027/28 學生資助計劃（2026 年 10 月版）",
      url: "https://www.dbs.edu.hk/admission/2027G7/5.%20Fee%20Remission%20Scheme%20for%202027%E2%80%932028.pdf",
      scope: "核對適用 G7–G12 的年度申請與收入審查、按家庭人數計算的 25%/50%/75%/100% 學費減免級距，以及廉價午膳、最高 HK$4,500 書本津貼和最高 HK$2,500 校服津貼。文件為 2026 年 10 月版；未列 2027/28 申請截止日或新學年學費，不能沿用 2026/27 日期或費率。",
      sourceType: "school-official",
      academicYear: "2027/28 學年；2026 年 10 月版",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院：2027/28 中一招生最新公告",
      url: "https://www.dbs.edu.hk/index.php?m=latestnews&s=admission",
      scope: "2026-10-19 重核申請表提供期 2026-10-17 至 11-17、11 月 17 日收件截止、2026/27 費率、學費分期、面試語言和 2027 年 3 月底至 4 月初預計結果；兩場 2026-10-17 粵語講座已舉行，公告稱錄影會於活動後上載，但本次頁面未提供錄影直鏈，不視為已可觀看。",
      sourceType: "school-official",
      academicYear: "2027/28 入學；2026/27 參考年費",
      checkedOn: "2026-10-20",
    },
    {
      label: "聖保羅男女中學：2026/27 學費與助學",
      url: "https://www.spcc.edu.hk/admissions/fee-remission-and-financial-aid",
      scope: "第七章直資學校比較；核對 SPCC 本地中學各年級及 DSE/IBDP 路線的 2026/27 年費。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育局：SPCC 2026/27 收費證明書",
      url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/510980.pdf",
      scope: "核對教育局收費證明書中四本地學費 HK$84,100 的總額及 2026-09-01 生效日；證書另列非本地中四及中五／中六 IBDP 費率，但沒有單列本地 F4 IBDP Preparatory Year，故不據此把一般中四收費套用至預備年。",
      sourceType: "government",
      academicYear: "2026/27；2026-09-01 生效",
      checkedOn: "2026-10-20",
    },
    {
      label: "聖保羅男女中學：課程概覽",
      url: "https://www.spcc.edu.hk/academic/overview",
      scope: "第七章直資學校比較；核對 SPCC HKDSE 與 IBDP 雙路線的官方課程說明。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖保羅男女中學：IBDP 課程入學",
      url: "https://www.spcc.edu.hk/admissions/local-admissions/secondary/ibdp",
      scope: "第七章直資學校比較；核對 F4 IBDP 預備年與 F5–F6 IBDP 的路線銜接，不推斷個別學生可自動轉入。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖士提反書院：課程與授課語言",
      url: "https://www.ssc.edu.hk/en/site/view?name=Studying+at+SSC",
      scope: "第七章直資學校比較；核對 HKDSE/IBDP 雙路線、主要英語授課及赤柱校址。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖士提反書院：2027/28 中一申請家長須知",
      url: "https://www.ssc.edu.hk/en/site/view?name=Notes+to+Parents_S1",
      scope: "第七章直資學校比較；核對 2026/27 香港永久居民中一參考年費 HK$76,000 及非派位招生。",
      sourceType: "school-official",
      academicYear: "2027/28 招生；2026/27 參考年費",
      checkedOn: "2026-10-17",
    },
    {
      label: "香港華人基督教聯會真道書院：2026/27 學費",
      url: "https://www.logosacademy.edu.hk/en/node/115",
      scope: "第七章直資學校比較；核對 DS4、MS3/4 HKDSE 與 IBDP 的 2026/27 年費，並注意其十一年一貫制年級命名。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "香港華人基督教聯會真道書院：中一入學與高中課程",
      url: "https://www.logosacademy.edu.hk/en/node/109",
      scope: "第七章直資學校比較；核對 DS4 中一外部申請、2027/28 申請期及直資一貫制背景。",
      sourceType: "school-official",
      academicYear: "2027/28 招生",
      checkedOn: "2026-10-20",
    },
    {
      label: "香港華人基督教聯會真道書院：通達階段課程",
      url: "https://www.logosacademy.edu.hk/index.php/en/mastery-stage",
      scope: "第七章直資學校比較；核對 HKDSE 與 IBDP 雙路線及該校特有的通達階段安排。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃男書院官方網站：2027/28 中一入學申請",
      url: "https://www.dbs.edu.hk/index.php?m=g7appc&s=admission",
      scope: "核對 2027/28 中一表格申領/遞交期、學業/活動/面試比重、甄選形式、結果日、校方不參與 SSPA 的安排及 need-blind 入學說明。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-20",
    },
    {
      label: "拔萃男書院：2027/28 G7 申請表及指南",
      url: "https://www.dbs.edu.hk/admission/2027G7/1.%20G7%20Application%20Form%20%26%20Guidelines.pdf",
      scope: "核對當屆申請文件清單、HK$75 支票及回郵信封、郵寄與收件／郵戳條文、P6 文件後到安排、面試通知時程、STRN/NCS 欄位和可選音樂錄像；均只適用 2027/28 G7。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院：2027/28 G7 學術獎學金說明與申請表",
      url: "https://www.dbs.edu.hk/admission/2027G7/7.%20DBS%20Academic%20Scholarship%20Info%20Sheet%20%26%20Application%20Form.pdf",
      scope: "核對學術獎學金申請資格、P4/P5 年級前 10% 及操行條件、G7/G8 學費支援、續領條件、需另交文件及仍參加正常中一招生評核；不視為獲取錄或得獎保證。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院官方網站：2026/27 學費",
      url: "https://www.dbs.edu.hk/index.php?s=admission&m=schoolfee",
      scope: "核對 2026/27 本地與非本地學生的中學及 IBDP 分年級年費；本地生 G7–G12/NSS 及 G10 IB Bridging Year HK$65,980，IB G11–G12 HK$151,180。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-16",
    },
    {
      label: "拔萃男書院官方網站：HKDSE Curriculum",
      url: "https://sites.google.com/dbs.edu.hk/nss",
      scope: "作為校方 HKDSE 課程及升學認受性資訊入口；當屆科目組合及開班須向學校核對。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "拔萃男書院 IB Diploma Programme",
      url: "https://ib.dbs.edu.hk/",
      scope: "核對學校 IB 課程入口及課程資訊；外校生資格、名額、分流及科目安排按當屆 IB 招生頁為準。",
      sourceType: "school-official",
      checkedOn: "2026-10-21",
    },
    {
      label: "拔萃男書院：Centre for Further Studies and Careers",
      url: "https://www.furtherstudies.dbs.edu.hk/",
      scope: "核對學校提供的升學及生涯規劃資訊入口；本報告不把未列完整分母的成績個案推算為錄取機會。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "拔萃男書院 IB 部門：University Offers",
      url: "https://www.ib.dbs.edu.hk/university-offers",
      scope: "核對 IB 大學 offer 清單明言全部為 conditional offers，且未列唯一學生數、接受與註冊結果；不得解讀為最終入讀比例。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃男書院：Prospectus 2025",
      url: "https://www.dbs.edu.hk/admission/Prospectus_2025.pdf",
      scope: "核對學校課程與校園資料，以及 prospectus 所列 Class of 2025 DSE 高分個案及 IBDP 平均 41.3/45。該 prospectus 未列完整 DSE/IB 考生分母或全體成績分布，不將個案轉為比例或錄取機會。",
      sourceType: "school-official",
      academicYear: "2025 招生簡介；Class of 2025 考試結果",
      checkedOn: "2026-10-16",
    },
    {
      label: "拔萃男書院 IB 部門：Admission to G10 Bridging Year Programme",
      url: "https://www.ib.dbs.edu.hk/admission-g10",
      scope: "核對 G10 Bridging Year 內外部申請者的英語及中文／法文評核；外校生另需數學測試。頁面亦列香港居留權、面試、財務責任、學額空缺、同意政策及成功完成後自動獲提供 IBDP 學位的規則；2027/28 當屆細則待公布。",
      sourceType: "school-official",
      academicYear: "現行一般規則；2027/28 招生細則待公布",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃男書院 IB 部門：Admission to G11 IBDP",
      url: "https://www.ib.dbs.edu.hk/admission-g11",
      scope: "核對外校 G11 IBDP 直入僅可能有少量學位，設英語、中文／法文、數學及認知評核；未達完整文憑要求者可能獲個案考慮 Diploma Courses，校方保留接納或拒絕權；科目受需求及教師供應影響，不視作 G10 Bridging 銜接政策。2027/28 當屆細則待公布。",
      sourceType: "school-official",
      academicYear: "現行一般規則；2027/28 招生細則待公布",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃男書院 IB 部門：May 2026 IB 成績公告",
      url: "https://www.ib.dbs.edu.hk/",
      scope: "核對首頁文字公告：May 2026 有 8 人獲 45 分、20 人獲 44 分，但未列 cohort 總人數或平均分，故不計算比例；成績專頁只顯示圖片。",
      sourceType: "school-official",
      academicYear: "May 2026 IB 考試結果",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院 IB 部門：IB Exam Results（2026 成績圖）",
      url: "https://www.ib.dbs.edu.hk/ib-exam-results",
      scope: "核對官方成績專頁目前以 IB results 2026 圖片呈現結果；頁面文字層未列總考生人數、均分或完整分數分布。圖片未能由本輪可用讀取方式可靠讀取，故不從圖片新增數值或推算分母。",
      sourceType: "school-official",
      academicYear: "May 2026 IB 考試結果",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男書院 IB 部門：Admission Application",
      url: "https://www.ib.dbs.edu.hk/admission-application",
      scope: "核對 2027–2028 G10 Bridging Year/G11 IBDP 申請日期尚待公布，以及已結束的 2026/27 申請時間線；不將已過日期沿用至下屆。",
      sourceType: "school-official",
      academicYear: "2027/28 入學資訊；2026/27 歷史申請期",
      checkedOn: "2026-10-16",
    },
    {
      label: "中學概覽 2025/26：拔萃男書院",
      url: "https://www.chsc.hk/datagovhk/ssp_2025_2026_tc.csv",
      scope: "核對學校類別、校址、年度課程、班級、支援、設施及收費欄位；資料是年度快照，不能取代 2027/28 校方公告。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-16",
    },
    {
      label: "HK Tutor Link：拔萃男書院 Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/diocesan-boys-school-6ecbdc0",
      scope: "非官方估算页将 DBS 标为 2023 年 Band 1B，并展示历史估算区间；方法及原始学校数据的独立性未完全说明，只用于呈现坊间 Band 1 范围的参考，不代表教育局或学生实际派位组别。",
      sourceType: "third-party-estimate",
      academicYear: "Banding 估算截至 2023 年；页面于 2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "StarSchools：拔萃男書院 Band 参考及课程资料",
      url: "https://starschools.hk/en/schools/diocesan-boys-school/secondary",
      scope: "该站以一颗星表示参考 Band，并注明教育局不公布学校 Banding；星级没有细分 1A/1B，数据为网站整理且不可视为官方评级或独立审计。只用于交代坊间 Band 1 范围定位，不用于平台评级。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年页面；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育王國：拔萃男書院（DBS）家長交流區",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2370697&extra=page%3D1&page=9",
      scope: "2013 年单一匿名/化名家庭讨论 IB 与 DSE 选择及课外活动时间投入；年代久远、身份和代表性未核实，仅作历史家长体验线索，不概括现况或整体口碑。",
      sourceType: "parent-discussion",
      academicYear: "2013 年讨论；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
  ],
"la-salle-secondary": [
    {
      label: "教育局：2025/2027 年度中學學位分配辦法",
      url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核對 2027/28 中一入學的共同 DP 申請期 2027 年 1 月 4 至 18 日、2027 年 3 月 31 日成功 DP 通知及 7 月 6 日派位結果；個別學校的評核細則另看校方公告。",
      sourceType: "government",
      academicYear: "2025/2027 SSPA；2027/28 入學",
      checkedOn: "2026-10-18",
    },
    {
      label: "九龍華仁書院：2027/28 中一招生",
      url: "https://wyk.edu.hk/academic/admission/s1-admissions-0/",
      scope: "第七章資助男校對照；核對華仁的 DP/CA 入口、2027/28 申請窗口及油麻地校址。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-17",
    },
    {
      label: "九龍華仁書院：課程科目",
      url: "https://wyk.edu.hk/subject-offered/",
      scope: "第七章資助男校對照；核對現行高中 HKDSE 科目資料，實際開班須以當屆確認。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖芳濟書院：學校基本資料",
      url: "https://www.sfxc.edu.hk/basic-information",
      scope: "第七章資助男校對照；核對聖芳濟的資助男校身份及大角咀校址。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖芳濟書院：中一招生資訊",
      url: "https://sfxc.edu.hk/component/content/category/90-admission",
      scope: "第七章資助男校對照；核對校方提供中一自行分配申請資料入口；現有詳細文件屬舊屆，下一屆須重查。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖芳濟書院：高中科目",
      url: "https://www.sfxc.edu.hk/subjects-offered",
      scope: "第七章資助男校對照；核對校方公開的高中 DSE 科目，科目清單不保證每種組合都可修讀。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "中學概覽 2025/26：資助男校類別",
      url: "https://www.chsc.hk/ssp2025/sch_list.php?district_id=11&frmMode=pagebreak&lang_id=2&li_id=2",
      scope: "第七章對照；交叉核對九龍華仁和聖芳濟書院的男校及資助類別。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "喇沙书院：2027/28 中一资讯日公告",
      url: "https://www.lasalle.edu.hk/community/news/form-one-information-day-2027-2028-admissions-2/",
      scope: "核对 2026-11-21 资讯日；截至 2026-10-21，网上登记仍未开放；校方预计 11 月初开放。公告没有公布完整的新一届 DP 申请规则。",
      sourceType: "school-official",
      academicYear: "2027/28 入学资讯",
      checkedOn: "2026-10-21",
    },
    {
      label: "喇沙书院：2026/27 中一申请规则",
      url: "https://www.lasalle.edu.hk/admissions/admission-to-form-1/",
      scope: "核对上一届 DP 名额、申请日期、评核比重、面试/笔试安排及 SSPA/喇沙小学 feeder 说明；不将历史规则套用至 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 入学（历史申请轮次）",
      checkedOn: "2026-10-16",
    },
    {
      label: "喇沙书院：学校课程及科目",
      url: "https://www.lasalle.edu.hk/our-college/academic/subject-offered/",
      scope: "核对学校当前公开的初中、高中课程与科目路径；实际开班组合以当届学校安排为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "喇沙书院：学生分班安排",
      url: "https://www.lasalle.edu.hk/our-college/administration/placement-of-students/",
      scope: "核对中一入学后的教育局评估测试与随机分班、中二至中三按学业及操行编班、高中按 HKDSE 选科及学位安排；不作为招生评核规则。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "喇沙書院：學生支援",
      url: "https://www.lasalle.edu.hk/our-college/pastoral/student-support/",
      scope: "核對生涯規劃、輔導、班主任課及學習支援服務組公開的項目，包括中一暑期銜接、中一至中五學習支援、中一至中三指定學生的大哥哥計劃、中三不及格學生暑期補課與考試及資優拓展；頁面未列資格、名額、服務時數、成效或適用學年，不推定個別學生必獲服務。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "喇沙书院：学校报告 2024/25",
      url: "https://www.lasalle.edu.hk/wp-content/uploads/2023/10/3-School-Report-2024-2025.pdf",
      scope: "核对 2025 届 HKDSE 考生人数及学校公布的学士/副学位一般入学资格指标；资格达标不等于录取或注册。",
      sourceType: "school-official",
      academicYear: "2024/25 报告；2025 届 HKDSE",
      checkedOn: "2026-10-16",
    },
    {
      label: "喇沙书院：2026 白袍典礼及医学院录取新闻",
      url: "https://www.lasalle.edu.hk/community/news/white-coat-ceremony-2026/",
      scope: "核对校方 2026-10-12 新闻所述 18 名 2026 届毕业生及 2 名往届毕业生获港大或中大医学院录取，并记录 HKU 8 名、CUHK 12 名典礼入学者的分开表述；不将 20 人全算作 2026 届或当作该届全部医科录取人数，新闻未提供毕业班分母或逐名校/届对应表。",
      sourceType: "school-official",
      academicYear: "Class of 2026 及往届毕业生；新闻发布于 2026-10-12",
      checkedOn: "2026-10-18",
    },
    {
      label: "中学概览 2025/26：喇沙书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=177",
      scope: "交叉核对资助学校类别、男校、校址、年度收费、班级结构、课程、支援及设施快照；不将历史资料表述为新一届保证。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-16",
    },
    {
      label: "Big Exam：喇沙书院 Band 估算与 HKDSE 资料",
      url: "https://dse.bigexam.hk/zh-hk/ssp/school/177",
      scope: "第三方按2025年DSE及升学公开资料估算Band 1B–1A；该页明确Band并非官方资料，并提示披露不足时含主观成分。估算只作定位参考，不是录取标准或概率。",
      sourceType: "third-party-estimate",
      academicYear: "2025 HKDSE 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "HK Tutor Link：喇沙书院 Band 估算",
      url: "https://hktutorlink.hk/secondary-schools/la-salle-college-f7bbbaa",
      scope: "平台列示2025年估算Band 1B–1A；与Big Exam的公开数据基础可能重叠，只可互相对读，不视作独立评审。",
      sourceType: "third-party-estimate",
      academicYear: "2025估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港01：喇沙书院2026 DSE高分学生访问",
      url: "https://www.hk01.com/DSE%E5%B0%88%E5%8D%80/60370020/dse%E6%94%BE%E6%A6%9C-%E5%96%87%E6%B2%99%E8%B6%85%E7%8B%80%E5%8F%8A%E7%8B%80%E5%85%83%E6%96%99%E8%AE%80%E9%86%AB-%E6%84%9B%E8%81%BDstray-kids%E5%8F%8A%E8%AD%9A%E8%A9%A0%E9%BA%9F%E6%B8%9B%E5%A3%93",
      scope: "2026-07-15访问两名状元，报道42名学生的最佳六科成绩达到38分的校方亮点，并记录个人备试压力、兴趣和生涯选择；不是完整成绩分布或普通学生口碑样本。",
      sourceType: "media-report",
      academicYear: "2026 HKDSE；2026-07-15报道",
      checkedOn: "2026-10-21",
    },
    {
      label: "灼见名家：喇沙书院2026 DSE放榜报道",
      url: "https://www.master-insight.com/article/49263",
      scope: "另一媒体报道同一场2026年放榜事件，并提到42名学生最佳六科取得38分及两名高分学生；与香港01为同一事件的报道，不能视作独立审计或第二组统计。原文未说明42人的精确门槛边界或全届分母，不推算比例。",
      sourceType: "media-report",
      academicYear: "2026 HKDSE；2026-07-15报道",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：喇沙书院家长交流区（2021）",
      url: "https://m.edu-kingdom.com/post.php?fid=715&page=152&tid=2218323",
      scope: "匿名家长讨论关于英语适应、分组教学、师兄学业支援和教师体验；帖龄较久且身份无法独立核验，只列为问题线索，不代表现届共识。",
      sourceType: "parent-discussion",
      academicYear: "2021年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：喇沙与林护中二插班择校讨论（2021）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3858681",
      scope: "一名家长称孩子同时获两校中二插班机会，匿名回帖围绕男女校、学术取向与课外活动作比较；样本过时且身份未核实，只作择校问题线索，不代表现届共识。",
      sourceType: "parent-discussion",
      academicYear: "2021年讨论",
      checkedOn: "2026-10-21",
    },
  ],
"dgs-secondary": [
    {
      label: "協恩中學：高中 HKDSE 與 IAL 課程",
      url: "https://hys.edu.hk/en/academic/curriculum/",
      scope: "第七章女校路線比較；核對協恩 2026/27 起開辦中五 IAL 並逐步延伸至中六。IAL 與 DGS GCE A-Level 不可直接視為相同課程。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "協恩中學：2026/27 學費與助學",
      url: "https://www.hys.edu.hk/en/admission/fees/school-fees/",
      scope: "第七章女校費用比較；核對中一 HK$45,585、中五 IAL HK$54,700，現行頁面未列待批註記，下一年度收費另核。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "協恩中學：2027/28 中一招生",
      url: "https://www.hys.edu.hk/en/admission/form1admissions/",
      scope: "第七章女校比較；核對直資女校身份及 2027/28 網申至 2026-10-22、紙本及費用至 2026-10-24 中午的安排。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-21",
    },
    {
      label: "德望學校：2026/27 學費",
      url: "https://www.ghs.edu.hk/admission/schoolFee",
      scope: "第七章女校費用比較；核對本地中一至中三 HK$38,290、中四至中六 HK$49,230 的官方年費。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "德望學校：2027/28 中一招生",
      url: "https://www2.ghs.edu.hk/admission",
      scope: "第七章女校比較；核對中一招生入口及 2026/27 參考收費。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-17",
    },
    {
      label: "德望學校：2025 HKDSE 成績公告",
      url: "https://www2.ghs.edu.hk/news/819/Our_achievement_in_HKDSE_2025",
      scope: "第七章女校路線比較；僅確認校方公開 HKDSE 考試路線，不以單年成績推算家庭的升學機會。",
      sourceType: "school-official",
      academicYear: "2025 HKDSE",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃女书院招生门户：截止后补交安排",
      url: "https://admission.dgs.edu.hk/",
      scope: "核对 2026-10-04 公告：只适用于已成功提交 2027/28 中一网申者，截止后线上更新与上传已关闭；如需补交只能邮寄指定封面纸本，不构成逾期申请入口。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "拔萃女书院：第三方 Band 估算（大考）",
      url: "https://dse.bigexam.hk/zh-cn/ssp/school/3",
      scope: "第 1 章坊间定位参考；网页按 2025 年 DSE 数据估算 Band 1A。属于第三方算法与发布者自述准确度，不是教育局分级，也不是本平台综合评级。",
      sourceType: "third-party-estimate",
      academicYear: "2025 HKDSE 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：2026 全港中学排名",
      url: "https://schoolbanding.com/rankings/2026",
      scope: "第 1 章坊间定位参考；榜单把 DGS 列为 Band 1A，称按 DSE 成绩、科目分布及英文授课指数综合计算。与其他第三方估算指标有重叠，不作为独立官方验证或录取概率。",
      sourceType: "third-party-estimate",
      academicYear: "2026 学年榜单",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：DGS 2nd in 讨论串",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2370111",
      scope: "第 6 章仅作历史个案：2012 年匿名用户讨论面试及功课压力；一则自称家长的回复描述孩子对压力的感受及作息差异。身份无法独立核实，不能代表当今在读家庭或现行校风。",
      sourceType: "parent-discussion",
      academicYear: "2012 年讨论；历史个案",
      checkedOn: "2026-10-21",
    },
    {
      label: "拔萃女书院：2027/28 中一申请及评选安排",
      url: "https://www.dgs.edu.hk/admissions/s1-application",
      scope: "核对校址为 1 Jordan Road, Kowloon，以及申请窗口、文件、申请费、三阶段评选、面试/技能测试、结果时间、录取后奖学金/分班评估日期、当前学费及中五课程路线；页面同时列入围通知在 11 月上旬和补件截止 11 月 3 日，报告提示先后关系不清并要求申请家庭向校方确认。非本地费率只适用于学生签证持有人，其他身份按教育局通告第 13/2026 号及校方审核。日期只适用于 2027/28 入学。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；当前学费按 2026/27 页面",
      checkedOn: "2026-10-21",
    },
    {
      label: "拔萃女書院：2027/28 中一申請（中文）",
      url: "https://www.dgs.edu.hk/admissions/s1-application-chi",
      scope: "核對 2027/28 申請期、第一階段網上及紙本文件清單、作品集頁碼標示、回郵信封、郵遞／郵戳限制、第二階段補件與各階段評選安排；資料只適用當屆。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃女書院：2027/28 中一重要日期（中文）",
      url: "https://www.dgs.edu.hk/school-profile/132-dgs/admissions/important-dates-chi",
      scope: "核對 2027/28 各階段日期、停課後備日、獎學金／編班試、迎新和註冊日；中文頁列第二階段結果為 2027 年 1 月上旬，第三階段於 2027 年 1–2 月面見校長、3 月上旬通知取錄；與中一申請流程頁對照時，1 月上旬對應的遴選階段標籤需留意。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃女書院：2027/28 中一重要日期（英文）",
      url: "https://www.dgs.edu.hk/admissions/important-dates",
      scope: "核對 2027/28 各階段日期；英文頁仍把第二階段結果列作 Early January 2026，中文頁列為 2027 年 1 月上旬但仍稱第二階段結果；中一招生流程頁則把 2027 年 1 月上旬列為第三階段入圍通知。日期相互吻合但階段標籤不一致，報告明列兩處差異並保留向校方確認邊界。",
      sourceType: "school-official",
      academicYear: "2027/28 入學；英文日期頁存在年份衝突",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃女书院：2026 届公开考试成绩",
      url: "https://www.dgs.edu.hk/achievements/results-of-public-examinations",
      scope: "核对 HKDSE 及 GCE A-Level 考生数、科目应考人次及等级分布；两种考试的统计口径不同，不作横向等值比较。",
      sourceType: "school-official",
      academicYear: "2026 届",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃女书院：2026 年本地及海外大学取录",
      url: "https://www.dgs.edu.hk/achievements",
      scope: "核对校方公布的大学取录项及页面统计日期；取录项不是独立学生人数或最终注册人数。",
      sourceType: "school-official",
      academicYear: "2026 年；海外取录截至 2026-05-12",
      checkedOn: "2026-10-19",
    },
    {
      label: "拔萃女书院：2026/27 学费减免及生活津贴",
      url: "https://www.dgs.edu.hk/admissions/information-on-fee-remission",
      scope: "核对 2026/27 学费减免家庭收入门槛、收入定义及每年最高 HK$6,000 的每日生活津贴用途。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-19",
    },
    {
      label: "中学概览 2025/26：拔萃女书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=3",
      scope: "交叉核对学校类别、性别、地址、2025/26 学费和年度课程概览；年度科目清单不视作 2027/28 开班保证。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育局通告第 13/2026 号：非本地儿童入读公营及非公营学校",
      url: "https://applications.edb.gov.hk/circular/upload/EDBC/EDBC26013E.pdf",
      scope: "核对非本地儿童入学身份及政府资助资格边界；个别学生是否符合资格须由教育局和学校按文件审核。",
      sourceType: "government",
      academicYear: "2026 年通告",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育局：2024/2026 年度中学学位分配办法常见问题",
      url: "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Apr_CA_TC.pdf",
      scope: "第 1 章用于区分教育局派位的学生 Band 1/2/3 与第三方对学校使用的 Band 1A 等非官方定位；学生派位组别不是学校评级。",
      sourceType: "government",
      academicYear: "2024/2026 年度中学学位分配办法",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：学校推荐直接录取计划",
      url: "https://www.edb.gov.hk/tc/edu-system/postsecondary/policy-doc/SNDAS/",
      scope: "第 4 章解释 SNDAS 的官方中文名称及其为学校提名的直接录取安排；不能把其录取与 JUPAS 取录项混作同一口径。",
      sourceType: "government",
      academicYear: "2026/27 计划；2026 届",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港城市大学：学生运动员学习支援及入学计划",
      url: "https://www.cityu.edu.hk/en/sds/physical-education-wellness-and-sports/student-athletes-admission/salsa",
      scope: "第 4 章解释 SALSA 的英文全称与运动员升学计划性质；校方取录摘要没有逐项给出由哪一计划录取的人数。",
      sourceType: "university-official",
      checkedOn: "2026-10-21",
    },
  ],
"queens-college-secondary": [
    {
      label: "中學概覽 2025/26：英皇書院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=419",
      scope: "第七章同派位制度男校比較；核對英皇為中西區官立男校及 2025/26 課程資料。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "英皇書院：中一入學資料入口",
      url: "https://www.kings.edu.hk/admission",
      scope: "第七章同派位制度比較；核對學校提供中一自行分配申請入口，現有文件輪次需按當屆更新。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "中學概覽 2025/26：聖若瑟書院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=309",
      scope: "第七章同派位制度男校比較；核對聖若瑟為中西區資助男校及高中 HKDSE 課程。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖若瑟書院：2025/26 招生簡介",
      url: "https://www.sjc.edu.hk/wp-content/uploads/2025/11/25-26-Prospectus_2.pdf",
      scope: "第七章同派位制度比較；核對校方公布的 S1 DP 入口及高中 HKDSE 科目，歷史簡介不作 2027/28 招生保證。",
      sourceType: "school-official",
      academicYear: "2025/26 招生簡介",
      checkedOn: "2026-10-17",
    },
    {
      label: "教育局：2025/2027 年度中學學位分配辦法",
      url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核對 2027 年參加 SSPA 學校的共同 DP 申請期 1 月 4 至 18 日、成功 DP 通知日 3 月 31 日、派位結果日 7 月 6 日及註冊日 7 月 8 至 9 日。皇仁校本招生頁於 2026-10-18 仍顯示 2026 入學輪次；2027/28 學額及評核另待公布。",
      sourceType: "government",
      academicYear: "2025/2027 SSPA；2027/28 入學",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：中一自行分配學位申請辦法（2026 入學，中文版）",
      url: "https://www.qc.edu.hk/uploads/files/Admission/S1_Admission/2026-09_Intake/02_%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E7%94%B3%E8%AB%8B%E8%BE%A6%E6%B3%95_(2026_intake).pdf",
      scope: "核對 2026 年 9 月入學上一輪 DP 學額、甄選比重、面試、文件及流程日期；這些規則不可視為 2027/28 保證。",
      sourceType: "school-official",
      academicYear: "2026/27 入學輪次（已結束）",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：S1 Admission Details（2026 入學，英文版）",
      url: "https://www.qc.edu.hk/uploads/files/Admission/S1_Admission/2026-09_Intake/01_S1_Admission_Details_%282026_intake%29.pdf",
      scope: "與中文版交叉核對 2026/27 DP 申請流程；英文版第 3 頁把面試通知日期寫為 early March 2025，與同頁流程日期及中文版 2026-03-07 不一致。",
      sourceType: "school-official",
      academicYear: "2026/27 入學輪次（已結束）",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：2026 入學中一自行分配學位申請表",
      url: "https://www.qc.edu.hk/uploads/files/Admission/S1_Admission/2026-09_Intake/05_%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E7%94%B3%E8%AB%8B%E8%A1%A8_2026_Intake.pdf",
      scope: "核對校方要求的小五及小六成績、活動與服務證明，以及不需小學推薦信的申請表註明；适用轮次为 2026 入学。",
      sourceType: "school-official",
      academicYear: "2026/27 入學輪次（已結束）",
      checkedOn: "2026-10-16",
    },
    {
      label: "皇仁書院：Class Structure & Curricula",
      url: "https://www.qc.edu.hk/en/site/view?name=Class+Structure+%26+Cu",
      scope: "核對校方 2026/27 班級結構與 S1–S6 課程科目；科目清單不等於所有選修組合均會開班。",
      sourceType: "school-official",
      academicYear: "2026/27 學年",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：School Plans and Reports 目錄",
      url: "https://www.qc.edu.hk/en/site/view?name=School+Plan%2C+Report",
      scope: "確認校方現行目錄仍列 2024/25 為最新完整 Annual School Report，並已上載 2026/27 Annual School Plan；計劃文件不代替新年度成績報告。",
      sourceType: "school-official",
      academicYear: "目錄狀態核對於 2026-10-18",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：初中學生其他語文試行計劃實施計劃 2025/26",
      url: "https://www.qc.edu.hk/uploads/files/School%20Plans%20and%20Reports%202526/0.%20Implementation%20Plan%20on%20Other%20Languages%20for%20Junior%20Sec%20Students.pdf",
      scope: "核對校方向教育局提交的 2025/26 初中日語課程計劃：S1 14 人、S2 6 人、S3 5 人；課後、校內授課、計劃 60 小時，平均費估算每人 HK$1,968、總估算 HK$49,200。此為實施計劃，不代表實際出席、完成或 2026/27 延續。",
      sourceType: "school-official",
      academicYear: "2025/26 學年實施計劃",
      checkedOn: "2026-10-19",
    },
    {
      label: "皇仁書院：Annual School Plan 2026/27",
      url: "https://www.qc.edu.hk/uploads/files/About_QC/School_Plans_and_Reports/2026-2027_test/Plan_AS.pdf",
      scope: "核對 2026/27 年度關注事項、學習小組與評估素養、資訊素養及 AI 輔助教學的計劃目標，以及心理健康和同伴支援安排；成功準則屬年度目標，不代表已達成結果、個人服務或名額。",
      sourceType: "school-official",
      academicYear: "2026/27 年度計劃",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：Language of Instruction & Admission System",
      url: "https://www.qc.edu.hk/en/site/view?name=Language+of+Instruct",
      scope: "核對英語授課例外科目及 S1 參加 SSPA 的校方說明。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "皇仁書院：School Report 2024/25",
      url: "https://www.qc.edu.hk/uploads/files/About_QC/School_Plans_and_Reports/2024-2025/School%20Report%2024-25.pdf",
      scope: "核對全校及 S6 在校人數、2025 屆 HKDSE 最低入學要求指標、學生支援和生涯規劃。年報未提供該成績表的考生分母；校內 S6 人數不可代作應考分母。",
      sourceType: "school-official",
      academicYear: "2024/25 年報；HKDSE 2025 屆",
      checkedOn: "2026-10-16",
    },
    {
      label: "皇仁書院：Results of Public Examinations",
      url: "https://www.qc.edu.hk/en/site/view?name=Results+of+Public+Ex",
      scope: "核對 2026 屆 HKDSE 官方圖片：110 名應考者、385 個跨科 5／5*／5** 等級及中文、英文、數學必修部分的 5 級或以上比率；數學必修與延伸部分分開計，各科應考分母及大學錄取／註冊人數未列；頁面分年設 2026 圖片入口，圖片資料仍需以原圖核讀。",
      sourceType: "school-official",
      academicYear: "2026 屆 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "皇仁書院：2026 HKDSE 成績圖片",
      url: "https://www.qc.edu.hk/uploads/images/DSE/2026_DSE_first_01.jpg",
      scope: "人工目視逐項核對 2026 屆 HKDSE 110 名應考生、385 個跨科 5／5*／5** 等級及中文 35%、英文 50.8%、數學必修部分 69.1% 的 5 級或以上科目比率；圖片未提供各科分母與升學去向。",
      sourceType: "school-official",
      academicYear: "2026 屆 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "中學概覽 2025/26：皇仁書院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=128",
      scope: "交叉核對官立男校、地址、2025/26 收費、教師、班級、授課語言、課程及設施快照；學校提供及核實的資料僅代表相應年度。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：公營教育及學位安排",
      url: "https://www.edb.gov.hk/en/student-parents/placement-assistance/about-placement-assistance/index.html",
      scope: "用於交代公營教育、SSPA 及可查詢的學生資助背景；個別家庭是否符合援助資格，須依教育局當屆規則核實。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "South China Morning Post：Students in elite Hong Kong secondary school caught cheating in test",
      url: "https://www.scmp.com/news/hong-kong/education/article/3309396/students-elite-hong-kong-secondary-school-caught-cheating-uniform-test",
      scope: "2025-05-07 報道皇仁中二中國歷史統一測驗事件及校方處理：涉事班別該次測驗不重考，成績不納入下學期評分。只用於呈現一宗有日期的評估公平個案，不推論全校校風或現屆家庭共識。",
      sourceType: "media-report",
      academicYear: "2025 年 4 月底事件；2025-05-07 報道",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港01：皇仁書院中二中史科測驗多名學生作弊",
      url: "https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/60235909/%E7%9A%87%E4%BB%81%E6%9B%B8%E9%99%A2%E4%B8%AD%E4%BA%8C%E4%B8%AD%E5%8F%B2%E7%A7%91%E6%B8%AC%E9%A9%97%E5%A4%9A%E5%90%8D%E5%AD%B8%E7%94%9F%E4%BD%9C%E5%BC%8A-%E6%B6%89%E4%BA%8B%E7%8F%AD%E5%88%A5%E6%88%90%E7%B8%BE%E4%BD%9C%E5%BB%A2%E4%B8%8D%E9%87%8D%E8%80%83",
      scope: "2025-05-06 報道同一宗中二中國歷史統一測驗事件，交叉核對事發時間、校方通告及涉事班別處理；與 SCMP 報道屬同一事件的媒體報道，不當作獨立案例或口碑樣本。",
      sourceType: "media-report",
      academicYear: "2025 年 4 月底事件；2025-05-06 報道",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：2026 全港中學排名",
      url: "https://schoolbanding.com/rankings/2026",
      scope: "第 1 章第三方學術組別參考；頁面把皇仁列為 Band 1A，並說明其估算以公開 DSE 成績、學科分佈及英文授課指數等綜合計算。這不是教育局官方評級，方法及資料口徑不代表全業一致。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "BigExam：皇仁書院 HKDSE 與 Banding 資料",
      url: "https://dse.bigexam.hk/en/ssp/school/128",
      scope: "第 1 章第三方估算；頁面稱皇仁為 Band 1A（2026，High accuracy），並說明估算參考學校歷年 HKDSE 成績。其分組算法屬平台估算，不是官方分類。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年估算；引用 2025 HKDSE 資料",
      checkedOn: "2026-10-21",
    },
    {
      label: "DseDse：灣仔區 Band 1 中學名單",
      url: "https://dsedse.com/band-1-secondary-school/wan-chai-district-band1-secondary-school/",
      scope: "第 1 章第三方地區名單；頁面列皇仁為 Band 1A。只作與其他估算的交叉參照，不視為官方排名或獨立測量。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年灣仔區名單",
      checkedOn: "2026-10-21",
    },
  ],
"heep-yunn-secondary": [
    {
      label: "中學概覽 2025/26：拔萃女書院（比較背景）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=3",
      scope: "第七章核直資女校身份、2025/26 中一年費及 DSE／GCE AL 科目；不作 2027/28 報價。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "中學概覽 2025/26：德望學校（比較背景）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=50",
      scope: "第七章核直資女校身份、2025/26 中一年費及 DSE 科目；不作 2027/28 報價。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃女書院：2027/28 中一招生與課程路線",
      url: "https://www.dgs.edu.hk/admissions/s1-application",
      scope: "第七章直資女校比較；核對 DGS 獨立招生、HKDSE/GCE A-Level 路線。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-17",
    },
    {
      label: "德望學校：2027/28 中一招生",
      url: "https://www2.ghs.edu.hk/admission",
      scope: "第七章直資女校比較；核對德望中一自行招生入口。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-17",
    },
    {
      label: "德望學校：2025 HKDSE 成績公告",
      url: "https://www2.ghs.edu.hk/news/819/Our_achievement_in_HKDSE_2025",
      scope: "第七章直資女校比較；僅核對校方公開 HKDSE 路線，不推斷沒有其他課程。",
      sourceType: "school-official",
      academicYear: "2025 HKDSE",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖保羅男女中學：課程概覽",
      url: "https://www.spcc.edu.hk/academic/overview",
      scope: "第七章直資學校比較；核對男女校及 HKDSE/IBDP 路線。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "協恩中學：2027/28 中一入學申請及時間表",
      url: "https://www.hys.edu.hk/en/admission/form1admissions/",
      scope: "核對 2027/28 申請窗口、紙本遞交截止、面試/技能評核時程、結果日，以及學校不參加 SSPA 的安排；2026-10-21 重訪確認網上截止 10-22、家長須親身交紙本及考試費並於 10-24 中午前完成。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-21",
    },
    {
      label: "協恩中學：2027 年 9 月入學中一網上申請指引（中文版）",
      url: "https://www.hys.edu.hk/upload/page/135/self/%E7%B6%B2%E4%B8%8A%E7%94%B3%E8%AB%8B%E8%A1%A8%E5%A1%AB%E5%AF%AB%E6%8C%87%E5%BC%95_2027%E5%B9%B49%E6%9C%88%E5%85%A5%E5%AD%B8.pdf",
      scope: "核對 Form A/B/C 用途、出生證明及小四/小五成績表、面試語言、活動/獎項文件限制，以及網上提交後仍須交紙本和考試費的要求；Part F 獎項證明只在獲邀第二次面試時提交，總量不超過 8 張 A4。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-18",
    },
    {
      label: "協恩中學：2027/28 Form One 網上申請指引（英文版）",
      url: "https://www.hys.edu.hk/upload/page/135/self/Guidelines_for_Online_Application.pdf",
      scope: "直接讀取 PDF 第 8 頁；英文版明言申請者家庭成員為校友不影響面試過程或申請結果。與中文版提示範圍不同，報告並列兩版，不外推至現任學生親屬或未明列關係。",
      sourceType: "school-official",
      academicYear: "2027/28 入學",
      checkedOn: "2026-10-18",
    },
    {
      label: "協恩中學：Curriculum Overview",
      url: "https://www.hys.edu.hk/en/academic/curriculum/",
      scope: "核對初中及高中 HKDSE/IAL 路線，以及學校自 2026/27 起開辦 IAL 的说明。",
      sourceType: "school-official",
      academicYear: "2026/27 起；IAL 逐年延伸至 F6",
      checkedOn: "2026-10-18",
    },
    {
      label: "協恩中學：Senior Curricula HKDSE / IAL 科目表",
      url: "https://www.hys.edu.hk/en/academic/curriculum/curriculum/",
      scope: "核對 DSE 選修清單與 IAL 路線的 Pearson Edexcel 學科、中文 GCE AL 和英文 IELTS；不將各學科一概稱作 IAL。",
      sourceType: "school-official",
      academicYear: "2026/27 起",
      checkedOn: "2026-10-18",
    },
    {
      label: "協恩中學：F4 IAL Bridging Programme 課程與招生",
      url: "https://www.hys.edu.hk/en/admission/transfer-ial/",
      scope: "核對 F4 bridging 作為升讀 F5–F6 IAL 的先修安排、2027/28 暫定插班申請時間及 IAL 經 non-JUPAS 申請的路徑說明。",
      sourceType: "school-official",
      academicYear: "2026/27 課程；2027/28 插班時間表屬暫定",
      checkedOn: "2026-10-16",
    },
    {
      label: "協恩中學：School Fees and Fee Remission Scheme 2026/27",
      url: "https://www.hys.edu.hk/fee-remission-scheme-2026-27/",
      scope: "核對 2026/27 F1–F5、F5 IAL、F6 年費及分期期數與金額；減免為 25%/50%/75%/100% 級別、一般申請須接受學位後辦理，另列同校姐妹、突發經濟困難全年申請及長期醫療支出酌情安排。以上只適用 2026/27，視乎家庭審查及計劃資金，不代表 2027/28 條款或保證獲批。",
      sourceType: "school-official",
      academicYear: "2026/27 學費及減免；F6 IAL 為 2027/28 預告",
      checkedOn: "2026-10-19",
    },
    {
      label: "協恩中學：Scholarships",
      url: "https://www.hys.edu.hk/en/admission/scholarships/",
      scope: "查閱校方公布的學術及非學術獎學金類別、約數及每年檢視名額的原則；不推算個別學生獲獎機會。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "協恩中學：2026 HKDSE Results",
      url: "https://www.hys.edu.hk/en/award-and-accolades/public-examination-results/",
      scope: "核對校方公布 2026 屆至少 11 科有一半考生達 Level 5+ 及高分個案；頁面未提供完整 cohort 分母或文字化全科分布，不作比例計算。",
      sourceType: "school-official",
      academicYear: "2026 屆 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "考評局：HKDSE School Statistical Report 服務說明",
      url: "https://www.hkeaa.edu.hk/en/our_services/exam_stat/",
      scope: "核對考評局校本統計報告涵蓋項目及存取限制：個別學校報告只供有關學校授權人員訂購作內部參考；不將非公開分母自行推算。",
      sourceType: "government",
      checkedOn: "2026-10-18",
    },
    {
      label: "協恩中學：School Report 2024/25",
      url: "https://www.hys.edu.hk/upload/plan/9/file0/HYS_Annual_School_Report_2024-25_19-12-2025_WEB_v_2.pdf",
      scope: "核對 2025 屆 150 名 HKDSE 考生、Level 5+ 科次、本地學士一般入學要求、畢業生去向與 JUPAS 取錄摘要；資格、選擇、取錄與最終註冊不可混為一項。",
      sourceType: "school-official",
      academicYear: "2024/25 年報；HKDSE 2025 屆",
      checkedOn: "2026-10-18",
    },
    {
      label: "中學概覽 2025/26：協恩中學",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=399",
      scope: "交叉核對直資女校、宗教、地址、2025/26 年費、班級、教師、課程、支援、評估和校園資料；該概覽按 2025 年 9 月學校情況核實。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-16",
    },
    {
      label: "香港01：協恩中學 2024/25 中一收生講座及校長談選生方向",
      url: "https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/1065605/%E4%B8%AD%E4%B8%80%E5%85%A5%E5%AD%B8-%E5%8D%94%E6%81%A9%E4%B8%AD%E5%AD%B8%E6%A0%A1%E9%95%B7-%E9%87%8D%E8%A6%96%E5%AD%B8%E7%94%9F%E8%87%AA%E5%AD%B8%E5%8A%9B-%E5%BF%83%E8%83%B8%E5%BB%A3%E9%97%8A-%E5%BF%8C%E5%94%94%E8%BC%B8%E5%BE%97",
      scope: "2024-10-12 對 2025/26 入學輪次的媒體報道；轉述校方當時強調自學、開放心態與合作，並報約 2,000 份申請及 180 個學額。只作歷史背景，不推算 2027/28 個人錄取率或現行評核權重。",
      sourceType: "media-report",
      academicYear: "2025/26 入學輪次；2024 年報道",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：協恩中學 2026 Banding 估算",
      url: "https://schoolbanding.com/rankings/2026",
      scope: "頁面列協恩 Band 1A；該站稱綜合校方公開 DSE、科目分布與英文指數。只作非官方估算；未能證實不同排名站底層數據完全獨立。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "Big Exam：協恩中學 2026 Banding 估算",
      url: "https://dse.bigexam.hk/en/ssp/school/399",
      scope: "頁面以 2025 HKDSE 資料估算協恩 Band 1A，並標示中等準確度；只作非官方參考，不等同教育局評級或派位組別。",
      sourceType: "third-party-estimate",
      academicYear: "基於 2025 HKDSE 的 2026 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "HK Tutor Link：協恩中學 Banding 資料頁",
      url: "https://hktutorlink.hk/secondary-schools/heep-yunn-school-29ba336",
      scope: "頁面列 2026 Band 1A 估算；計算資料獨立性未核實，只用作第三方估算範圍交叉參考，不引用其成績數字。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王國：協恩 Interview 家長討論串",
      url: "https://www.edu-kingdom.com/forum.php?goto=nextnewset&mod=redirect&tid=2280788",
      scope: "2011 年個別申請家庭回述面試感受；年代久遠、身份與代表性未核實，不作現屆面試規則或群體口碑證據。",
      sourceType: "parent-discussion",
      academicYear: "2011 年討論",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王國：協恩 200 個 Waiting List 討論串",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2793465",
      scope: "2014 年候補等待討論，為匿名個案與觀感；不代表現行候補安排、申請難度或家長整體意見。",
      sourceType: "parent-discussion",
      academicYear: "2014 年討論",
      checkedOn: "2026-10-21",
    },
  ],
"hkuga-college-secondary": [
    {
      label: "中学概览 2025/26：港大同学会书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=109",
      scope: "核对直资男女校、南区地址、费用、教师、班级、课程、学生支援及校园设施；概览为学校提供并核实的 2025/26 学年快照，须按栏位年度解读。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；部分科目表列 2026/27",
      checkedOn: "2026-10-16",
    },
    {
      label: "HKUGA College：2027/28 中一申请指引",
      url: "https://www.hkugac.edu.hk/engage/as-a-student/application-guidelines",
      scope: "核对 2027/28 中一申请窗口、申请费、首轮面试、第二轮甄选、成功通知、当前学费基线及资助入口；申请尚未开放时须复核更新。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；学费基线为 2026/27",
      checkedOn: "2026-10-21",
    },
    {
      label: "HKUGA College：2027/28 中一招生讲座",
      url: "https://www.hkugac.edu.hk/engage/as-a-student/admission-seminars",
      scope: "核对 2026-12-05 招生信息日安排：学习展示及校园导赏无需预先登记；三场招生讲座须登记，2026-11-02 开放、11-16 16:00 截止，电脑随机分配门票、11-23 电邮通知结果；每名学生最多一位家长陪同。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；讲座日期 2026-12-05",
      checkedOn: "2026-10-19",
    },
    {
      label: "HKUGA College：FAQ（2027/28 学额、评核与承诺）",
      url: "https://www.hkugac.edu.hk/engage/as-a-student/faq",
      scope: "核对 2027/28 共 198 个 S1 学额及 80 个公开学位、全港申请资格、年龄和接受直资学位后放弃官津学位的承诺安排；FAQ 列出的评核比重未注明学年，不能据此确认 2027/28 沿用。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "HKUGA College：School Fees 2026/27",
      url: "https://www.hkugac.edu.hk/engage/as-a-student/school-fees",
      scope: "核对 S1–S3 每年 HK$48,450、S4–S6 每年 HK$51,265 及分十期缴交安排；不可视作 2027/28 已定费用。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "HKUGA College：Financial Assistance 2026/27",
      url: "https://hkugac.edu.hk/engage/as-a-student/financial-assistance",
      scope: "核对 AFI 学费减免门槛、香港永久居民要求、通常申请时限及活动/教材等相关资助；门槛和日期只适用网页列出的 2026/27 学年。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "HKUGA College：My Alternative Curriculum（IAL）",
      url: "https://www.hkugac.edu.hk/nurture/quest-for-truth/the-quest/my-alternative-curriculum",
      scope: "核对 Pearson Edexcel International AS/A-Level 路线、学校称自 2024/25 升读 S5 学生可选 DSE 或 IAL，以及 IAL 学生参与校内活动的说明；选科组合和分流细节须查当届手册。",
      sourceType: "school-official",
      academicYear: "2024/25 起；课程页面现行版本",
      checkedOn: "2026-10-19",
    },
    {
      label: "HKUGA College：2026 HKDSE 成绩摘要",
      url: "https://www.hkugac.edu.hk/f/news/1194/4259/HKDSE_2026_v3.pdf",
      scope: "核对 2026 届 332A、含两科选修的指标、全科等级科次及全港比较；摘要未列考生人数，科次总数不可当作学生分母。",
      sourceType: "school-official",
      academicYear: "2026 届 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "HKUGA College：2025 HKDSE 成绩摘要",
      url: "https://www.hkugac.edu.hk/f/news/1112/3893/HKDSE_2025.pdf",
      scope: "提供 2025 届 HKDSE 校方公开比例和总科次作为往届比较；未公开 cohort 学生分母，不推算考生人数。",
      sourceType: "school-official",
      academicYear: "2025 届 HKDSE",
      checkedOn: "2026-10-16",
    },
    {
      label: "HKUGA College：2026 International A-Level Results",
      url: "https://www.hkugac.edu.hk/explore/our-updates/what-s-on/2026-international-a-level-results",
      scope: "核对首届 IAL cohort 公布的 A/A* 成绩比例和高分个案；公告没有列学生人数或总应考科次，不把百分比解释成学生比例。",
      sourceType: "school-official",
      academicYear: "2026 届 IAL",
      checkedOn: "2026-10-18",
    },
    {
      label: "HKUGA College：JUPAS Offer 2026 统计 PDF",
      url: "https://www.hkugac.edu.hk/f/news/1200/4255/JUPAS_2026.pdf",
      scope: "核对 120 名毕业生、104 名 JUPAS 申请者、85 名获 offer 学生、70 名获 UGC 资助学士 offer 学生及三所大学 offer；原表按学生人数列示获 offer 者，最终接受及注册人数未公布。",
      sourceType: "school-official",
      academicYear: "2026 届毕业生；统计更新于 2026-08-05",
      checkedOn: "2026-10-18",
    },
    {
      label: "圣保罗男女中学：2026/27 学费与学费减免",
      url: "https://www.spcc.edu.hk/admissions/fee-remission-and-financial-aid",
      scope: "核对 2026/27 中学各年级及路线学费、全免学费中学生最高 HK$12,000 助学金、四人家庭 2026/27 起 BDI 门槛与五档减免比例；首档为可动用收入不高于 HK$421,250。家庭收入定义、资产规则、单亲基准和年度申请程序另以 2026 年 5 月一般申请手册为准；不把当前门槛套用于 2027/28 个案。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-20",
    },
    {
      label: "保良局颜宝铃书院：2026/27 学费与课程",
      url: "https://www.npl.edu.hk/en/site/view?name=Scheme",
      scope: "第 7 章同为直资男女校的费用对照：2026/27 中一至中五 HKDSE 每年 HK$35,900，IBDP 每年 HK$98,400；入读与桥接年安排须另查校方课程说明。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "保良局颜宝铃书院：学校介绍与高中路线",
      url: "https://www.npl.edu.hk/en/site/view?name=Introduction",
      scope: "核对完成初中三年后可选本地 HKDSE 或 IBDP，选择 IBDP 者可修读桥接年；具体进入资格及桥接年收费另向学校确认。",
      sourceType: "school-official",
      academicYear: "现行课程介绍页",
      checkedOn: "2026-10-17",
    },
    {
      label: "保良局颜宝铃书院：2027/28 中一申请",
      url: "https://www.npl.edu.hk/en/site/view?name=F.1+Admission",
      scope: "核对 2027/28 网上申请日期为 2026-11-16 至 12-24，作为同届直资后备申请时间对照；须在实际申请前再次核对。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-17",
    },
    { label: "HKUGA College：Annual School Report 2024–25", url: "https://www.hkugac.edu.hk/f/news/1138/ASR_24-25_v2.pdf", scope: "校方年度自评：压力管理、心理健康活动后的校内指标变化；同时记载女生情绪需要和自律关注点。未公布可独立评估成效的完整调查分母，不当作独立满意度调查。", sourceType: "school-official", academicYear: "2024/25 学年", checkedOn: "2026-10-20" },
    { label: "HKUGA College：School Development Plan 2021–2024", url: "https://www.hkugac.edu.hk/f/news/734/SDP_21-24.pdf", scope: "校方 2021–2024 发展计划曾把高年级高期望与学生压力列作风险；为历史校方自评，不能代表当前比例或证明问题仍按同一程度存在。", sourceType: "school-official", academicYear: "2021–2024 发展计划", checkedOn: "2026-10-20" },
    { label: "Big Exam：港大同学会书院 2026 Banding 估算", url: "https://dse.bigexam.hk/zh-hk/ssp/school/109", scope: "第三方页面估为 Band 1B–1A；非教育局评级，计算细节和与其他网页的底层资料独立性未证实，不表示学生派位组别或录取概率。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-20" },
    { label: "SchoolBanding：港大同学会书院 2026 Banding 估算", url: "https://www.schoolbanding.com/s/hkuga-college", scope: "页面列 Band 1A；方法和与其他排名网站的资料独立性未充分公开，不作官方定位或独立多方验证。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-20" },
    { label: "教育王国：港大同学会书院升中讨论串", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3878856", scope: "2023-11 匿名家长自述孩子外校入读后对英文/数学要求、课程深度、压力及适应的体验；身份无法独立核实，单一讨论串非代表性样本，不概括现届或整体口碑。", sourceType: "parent-discussion", academicYear: "2023 年 11 月讨论", checkedOn: "2026-10-20" },
    { label: "香港中文大学：SALSA 计划简介", url: "https://admission.cuhk.edu.hk/application/salsa/overview/", scope: "解释 SALSA 是 Student-Athlete Learning Support and Admission Scheme（运动员学习支援及入学计划），用于辨认一则校方提及的个别非 JUPAS 录取案例；不据此推算学校整体升学结果。", sourceType: "school-official", academicYear: "现行计划介绍页", checkedOn: "2026-10-20" },
    { label: "教育局：HKDSE 332A 定义", url: "https://www.edb.gov.hk/tc/edu-system/postsecondary/policy-doc/musss/", scope: "确认332A中的A代表公民与社会发展科达标；2024年起该科成绩以达标/不达标汇报。此处用于解释成绩符号，不将一般入学门槛等同大学录取。", sourceType: "government", academicYear: "2024年起适用的文凭试成绩定义", checkedOn: "2026-10-20" },
    { label: "教育王国：港大同学会书院与传统学校择校讨论", url: "https://www.edu-kingdom.com/forum.php?extra=&mod=viewthread&page=6&tid=3880440", scope: "2024-04 匿名择校讨论中对学校理念、公开成绩资料及传统学校取向有不同意见；身份及在读关系无法核实，含推测，不作为学校实际表现、口碑共识或招生难度证据。", sourceType: "parent-discussion", academicYear: "2024 年 4 月讨论", checkedOn: "2026-10-21" },
  ],
"cis-secondary": [
    {
      label: "CIS：中学招生流程与 2027/28 资讯会",
      url: "https://www.cis.edu.hk/admissions/admissions-process/secondary",
      scope: "核对 Year 7–13 课程阶段、Y7 每年超过 50 个新位置、滚动申请、2027/28 资讯会日期及页面显示的报名入口、笔试面试安排、申请费与留位押金；报名入口本次打开返回 CSS Error，不能据此确认登记成功；申请分母未公开，不推算录取率。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-19",
    },
    {
      label: "CIS：中学与杭州申请 FAQ",
      url: "https://www.cis.edu.hk/admissions/admissions-faq",
      scope: "核对 Year 7–13 常规中学申请与 Year 10 CIS Hangzhou 申请的建议时间、评核时段、住宿项目属性及额外费用官方入口；杭州费用链接导向校方 2026/27 School Fees 页面，该可读页面未展示逐年级 tuition 或杭州逐项收费表。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；费用链接为 2026/27 学费页",
      checkedOn: "2026-10-19",
    },
    {
      label: "CIS：2026/27 学费与付款方式",
      url: "https://www.cis.edu.hk/admissions/school-fees",
      scope: "核对 2026/27 收费年度、2025/26 或以后入学者 Annual Capital Levy HK$30,200、HK$150,000 不可退留位押金含资本费并以余额抵扣学费/年费，以及每年十期缴费；逐年级学费以教育局 2026/27 收费证明为准。",
      sourceType: "school-official",
      academicYear: "2026/27 学年；资本费适用于 2025/26 或以后入学学生",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：汉基国际学校学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/6.html",
      scope: "核对学校身份、地址、类型、性别、课程、学校费用范围 HK$300,300–359,200、校车及 SEN 支援；简介费用未标收费学年或年级拆分，2026/27 分年级学费另以当届 Fees Certificate 为准。页面资料由学校提供并按年度调查汇编。",
      sourceType: "government",
      academicYear: "教育局现行国际学校资料页；费用范围未标收费年度或年级",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：汉基国际学校 2026/27 收费证明",
      url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/215589.pdf",
      scope: "核对收费证明自 2026-09-01 生效：Year 7–11 每年学费 HK$354,500（每期 HK$35,450，共 10 期）；Year 12–13 每年学费 HK$359,200（每期 HK$35,920，共 10 期）。该证明列 tuition/course fee，不与校方另列年度资本征费、Annual Fees、杭州及活动成本混为完整总账单。",
      sourceType: "government",
      academicYear: "2026/27 学年；收费证明生效日期 2026-09-01",
      checkedOn: "2026-10-21",
    },
    {
      label: "CIS：中学课程总览",
      url: "https://www.cis.edu.hk/academics/overview",
      scope: "核对中学 Y7–9 MYP、Y10–11 校本课程及 Y12–13 IBDP 的年级分布，以及中国历史与杭州课程的跨文化安排。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "CIS：Year 7–9 IB MYP",
      url: "https://www.cis.edu.hk/academics/secondary/overview/year-7-9",
      scope: "核对 Y7–9 MYP 项目范围；详细课程和评量以学校当届文件为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "CIS：Year 10–11 校本课程",
      url: "https://www.cis.edu.hk/academics/secondary/overview/year-10-11",
      scope: "核对杭州 Year 10 英中双语、跨学科项目式课程；Year 11 回港后课程、研究技能、DP 科目探索及衔接结构。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "CIS：Year 10 CIS Hangzhou 课程",
      url: "https://www.cis.edu.hk/academics/cis-hangzhou/overview",
      scope: "核对 Year 10 全年杭州驻校课程定位；具体住宿、医疗、生活与额外费用需以当届手册向学校确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "CIS：Year 12–13 IB Diploma Programme",
      url: "https://www.cis.edu.hk/academics/secondary/overview/year-12-13",
      scope: "核对 Years 12–13 IBDP 课程阶段；科目组合与开班情况以当届学校安排为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "CIS：IB DP Results（网页未标考试年份）",
      url: "https://www.cis.edu.hk/academics/secondary/overview/ib-dp-results",
      scope: "核对网页展示的 133 名应考学生、99% 通过率、平均 39.94/45、40+ 比例、双语文凭、科目均分及 bonus points；页面没有标明考试年份，也没有为所有百分比逐项重列分母，不与另链的 Class of 2026 大学去向自动合并。",
      sourceType: "school-official",
      academicYear: "网页未标考试年份；2026 届仅为相邻大学去向链接",
      checkedOn: "2026-10-20",
    },
    {
      label: "HK-Schools.com：2026 香港 IB 成绩整理",
      url: "https://www.hk-schools.com/post/hong-kong-ib-results-2026",
      scope: "第三方按学校自行公布的成绩整理，标注 CIS 为 2026 考试届：平均 39.94/45、65.4% 达 40 分、133 名考生及 99% 通过率；数字与 CIS 当前 IB 页面相同。校方原页未标考试年份，故只作年份线索和相对表现参考，不提升为官方评级或个人成绩预测。",
      sourceType: "third-party-estimate",
      academicYear: "2026 IB 考试结果；第三方汇编",
      checkedOn: "2026-10-20",
    },
    {
      label: "Good Schools Guide：CIS 独立校评",
      url: "https://www.goodschoolsguide.co.uk/international/review/chinese-international-school",
      scope: "页面标注 2026 年 4 月更新；单一专业校评对学术与双语特色作出正面判断，并描述家长群体相对富裕、本地家庭较多。评论无可复算抽样框，不代表全部在读家庭或最新学生构成。",
      sourceType: "media-report",
      academicYear: "2026 年 4 月更新的独立评论",
      checkedOn: "2026-10-20",
    },
    {
      label: "GeoExpat：CIS 家长社区讨论",
      url: "https://geoexpat.com/forum/71/thread366670.html",
      scope: "2023 年单一公开讨论串涉及学费、家庭社交背景与融入感；回复意见不同。匿名发帖者及其就读关系未核实，非中学专属或代表性样本，仅作访校问题线索。",
      sourceType: "parent-discussion",
      academicYear: "2023 年 12 月讨论",
      checkedOn: "2026-10-20",
    },
    {
      label: "CIS：Class of 2026 College/University Matriculation",
      url: "https://www.cis.edu.hk/fs/resource-manager/view/ab2d6a48-fa72-43dc-ba57-c5c50e07e40c",
      scope: "核对校方 2026-09-30 更新的大学 matriculation 名单及地区学生数；名单未提供完整申请、offer 接受、最终注册分母，地区及联合课程人数不合并为录取率。",
      sourceType: "school-official",
      academicYear: "Class of 2026；更新于 2026-09-30",
      checkedOn: "2026-10-19",
    },
    {
      label: "CIS：Financial Aid 财务资助",
      url: "https://www.cis.edu.hk/admissions/financial-aid",
      scope: "核对新入学 Year 8–12、入学时 12 岁及以上资助资格、家庭财务评估因素、无单一薪酬上限、2027-03-01 截止、同一招生标准和续领说明；Year 13 资格及资助名额与金额未公开。",
      sourceType: "school-official",
      academicYear: "2027 入学资助申请",
      checkedOn: "2026-10-19",
    },
    {
      label: "CIS：About CIS 学校概况",
      url: "https://www.cis.edu.hk/about-us/about-cis",
      scope: "核对创校、校址、学校规模快照、学生与教职员统计；各分部人数按校方页面标签原样分列，不把 Y10 杭州人数重复并入次级部总数。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：CDNIS 学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/61.html",
      scope: "同类课程比较：核对 CDNIS 的 MYP、DP 与 OSSD 年级结构及学校费用范围；费用为 EDB 学校简介快照，不作为当届年级报价。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：GSIS 英语部学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/12.html",
      scope: "同类课程比较：核对 GSIS 英语部 IGCSE→IBDP 路线及学校费用范围；费用为 EDB 学校简介快照。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：弘立书院学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/92.html",
      scope: "比较对象类别边界：弘立为私立独立学校，与国际学校类别不同；校方课程及当年度费用由学校官网另核。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "CDNIS：2026/27 按年级学费",
      url: "https://www.cdnis.edu.hk/en/admissions/tuition-fees/",
      scope: "第 7 章核对 G7–8、G9–10、G11–12 的 2026/27 tuition 与资本费另计说明；不可据此推算 2027/28 收费。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "GSIS：英语部中学课程",
      url: "https://www.gsis.edu.hk/en/academics/english-international-stream/secondary/",
      scope: "第 7 章核对英语部 Y7–9、Y10–11 IGCSE、Y12–13 IBDP 的课程阶段；德语部 DIA 另作路线区别。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "GSIS：学费、债券与资本费说明",
      url: "https://www.gsis.edu.hk/en/admissions/fees-and-debenture?section=school-fees",
      scope: "第 7 章提示学校除学费外还有债券或资本费及其他费用；网页可读文本未完整列出逐级年费，不能用 EDB 未标学年的范围代替账单。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "弘立书院：2026/27 学费及其他费用",
      url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/fees-tuition/",
      scope: "第 7 章核对 G6–10 每年 HK$291,770、G11–12 每年 HK$317,190，且资本供款与活动、DP 考试费用需另行核实。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "弘立书院：2026/27 招生手册与中学课程",
      url: "https://academy.isf.edu.hk/wp-content/uploads/Admissions-Information-2026-27_ENG.pdf",
      scope: "核对 G6–10 MYP、G11–12 DP 以及中文人文等校本课程；PDF 为 2026/27 招生手册，后续学年须复核。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
  ],
"harrow-secondary": [
    {
      label: "哈罗香港：Application Timeline 2027/28",
      url: "https://www.harrowhongkong.hk/his/admissions/application-timeline/",
      scope: "核对 2027 年 8 月入学各年级申请截止日、评核学期、逾期申请条件、学校关于本地学生比例及通常不招 Y11/Y13 的说明；页面称教育局规定可把 30% 学额给予持香港护照的本地学生，报告仅按校方原文转述，不推算年级配额或个别录取机会；截止日已于 2026-10-10 过去。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "哈罗香港：Admissions Process 与文件清单",
      url: "https://www.harrowhongkong.hk/his/admissions/admissions-process/",
      scope: "核对线上申请流程、护照/身份证/出生证明/最近三份学校报告及 HK$1,500 申请费；报名确认不构成录取。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "哈罗香港：Assessments 评核方式",
      url: "https://www.harrowhongkong.hk/his/admissions/assessments/",
      scope: "核对 Y6–Y10 约三小时、Y12 约三点五小时的评核组成，以及海外 Y3–Y13 线上评核说明；当届个别安排仍需招生处确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "哈罗香港：Age Guidelines",
      url: "https://www.harrowhongkong.hk/his/admissions/age-guidelines/",
      scope: "申请时依 2027/28 入学年核对 Year group 年龄及出生日期，不以香港年级名称直接换算。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-16",
    },
    {
      label: "哈罗香港：Upper School Curriculum",
      url: "https://www.harrowhongkong.hk/his/academic/upper-school/curriculum/",
      scope: "核对 Y6–Y8 Prep、Y9–Y11 GCSE 路线、Y10 选科及 AQA/CIE/Edexcel 考试局说明；科目开班按当届核实。",
      sourceType: "school-official",
      academicYear: "2026/27 课程资料",
      checkedOn: "2026-10-19",
    },
    {
      label: "哈罗香港：Sixth Form Curriculum",
      url: "https://www.harrowhongkong.hk/his/academic/sixth-form/curriculum/",
      scope: "核对 Y12–Y13 A-Level 课程结构及 EPQ；当届可选科目、先修要求和入学门槛须另查学校文件。",
      sourceType: "school-official",
      academicYear: "2026/27 课程资料",
      checkedOn: "2026-10-19",
    },
    {
      label: "哈罗香港：Public Exam Results 2026",
      url: "https://www.harrowhongkong.hk/his/theschool/examination-results/",
      scope: "逐项记录校方 2026 GCSE、A-Level 等级比例和 University 例子；页面 A-Level 表格 A*/A 为 77%、正文为 76%，A* 亦存在 38%/35%差异，且未给应考分母，报告并列并标待校方澄清。",
      sourceType: "school-official",
      academicYear: "Class of 2026",
      checkedOn: "2026-10-21",
    },
    {
      label: "哈罗香港：University Destinations",
      url: "https://www.harrowhongkong.hk/his/academic/sixth-form/university-destinations/",
      scope: "记录校方目的地信息；大学去向举例未同时提供 cohort、申请人数、offer、接受及最终注册分母，不换算为录取率。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "哈罗香港：Fees 2026/27",
      url: "https://www.harrowhongkong.hk/his/admissions/fees/",
      scope: "核对 Y6–Y11 学费 HK$238,687、Y12–Y13 学费 HK$248,155、申请费 HK$1,500、Capital Levy HK$60,000、寄宿费 HK$135,672 及额外收费；核实学费按学期缴付、同校兄弟姊妹学费折扣、退学需提前一学期书面通知，否则可收一学期代通知金；本页写周日 19:00 入舍，与 Boarding 页 20:00 不一致。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "哈罗香港：Capital Levy、Certificates 与 Debentures",
      url: "https://www.harrowhongkong.hk/his/admissions/capital-levy-certificates-and-debentures/",
      scope: "核对年费性质、现有证书/债券不再预期发行、候补池优先权不保证录取，以及 2027/28 入学证书转让日期。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；页面于 2026-10-16 查阅",
      checkedOn: "2026-10-16",
    },
    {
      label: "哈罗香港：Scholarships & Bursaries",
      url: "https://www.harrowhongkong.hk/his/admissions/scholarships-and-bursaries/",
      scope: "核对奖学金以学费 10% 为基准、bursary 经家庭经济审查、多数入学前申请且 Y6 起开放；最终资格与金额按当届手册确认。",
      sourceType: "school-official",
      academicYear: "2026/27 资料",
      checkedOn: "2026-10-16",
    },
    {
      label: "哈罗香港：Boarding",
      url: "https://www.harrowhongkong.hk/his/pastoral-boarding/boarding/",
      scope: "核对 Y6 起每周寄宿、House pastoral care、居住安排及寄宿申请；本页写周日 20:00 返校，与 Fees 页 19:00 不一致，实际时间需书面确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-21",
    },
    {
      label: "哈罗香港：Facing Challenges",
      url: "https://www.harrowhongkong.hk/his/pastoral-boarding/facing-challenges/",
      scope: "核对 Nursery–Y11 的 PSHE 项目及 Sixth Form Beyond Harrow；不据课程存在推定个别辅导服务名额或效果。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：哈罗香港国际学校目录",
      url: "https://internationalschools.edb.gov.hk/en/schools/14.html",
      scope: "核对国际学校属性、校址、课程、全校规模快照、学费范围、寄宿与入学政策；教育局说明简介由学校提供并根据年度调查编制。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "Independent Schools Inspectorate：Harrow Hong Kong BSO Report 2025",
      url: "https://www.harrowhongkong.hk/his/wp-content/uploads/2025/07/Harrow-Hong-Kong-BSO-report-v4.1-RW-2025-07-04-clean-2-2.pdf",
      scope: "记录 2025-03 检查、学校满足 BSO Standards、Upper School PSHE 教学一致性改进建议、检查时 1,642 名学生、279 名寄宿生及 73 名 SEND 学生；人数为检查时点数据。",
      sourceType: "independent-inspection",
      academicYear: "检查日 2025-03-11 至 2025-03-13；报告 2025 年发布",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育王國：Harrow International HK 家長討論",
      url: "https://m.edu-kingdom.com/post.php?closed=0&fid=43&page=1&tid=3886154",
      scope: "2025-11 至 2026-01 的匿名讨论；个别自称家长分享低年级反欺凌、纪律及学习体验，不能代表全校、当前学年或家长整体意见；提问内容不是已验证事实。",
      sourceType: "parent-discussion",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：Kellett School 国际学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/56.html",
      scope: "同类路径参考：核对英国国家课程、校址、招生与费用范围；EDB 资料为学校提供的简介快照，不作为当届年级报价。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：GSIS 英文部国际学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/12.html",
      scope: "同类路径参考：核对 IGCSE→IBDP、英文部与德文部并行、校址和费用范围；不把两部课程混为一条路线。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "教育局：CDNIS 国际学校简介",
      url: "https://internationalschools.edb.gov.hk/en/schools/61.html",
      scope: "同类路径参考：核对 PYP/MYP/DP 与 OSSD 选项、校址和费用范围；不同文凭体系不作单一成绩排名。",
      sourceType: "government",
      checkedOn: "2026-10-16",
    },
    {
      label: "Kellett：中学课程与 A-Level 路线",
      url: "https://www.kellettschool.com/senior-school/curriculum/academics",
      scope: "核对 Y7–9 英式课程、Y10–11 GCSE/IGCSE 与 Y12–13 A-Level 的路径；具体科目开班须以当届选课表为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "Kellett：2026/27 学费及年度 Capital Levy",
      url: "https://www.kellettschool.com/admissions/fees-debenture-information",
      scope: "核对 Y7–11 HK$271,300、Y12–13 HK$279,100、所有新录取年度 Capital Levy HK$40,000 及每家庭协会费 HK$500；不视为 2027/28 承诺。",
      sourceType: "school-official",
      academicYear: "2026/27 学年学费；Capital Levy 为页面当前安排",
      checkedOn: "2026-10-17",
    },
    {
      label: "GSIS：英语部中学课程",
      url: "https://www.gsis.edu.hk/en/academics/english-international-stream/secondary/",
      scope: "核对 Y7–9 校本课程、Y10–11 IGCSE、Y12–13 IBDP，与德语部 DIA 分开。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "CDNIS：2026/27 按年级学费",
      url: "https://www.cdnis.edu.hk/en/admissions/tuition-fees/",
      scope: "核对 G6–8 HK$223,100、G9–10 HK$244,800、G11–12 HK$261,500 的官方年费与资本费另列。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
  ],
"st-stephens-secondary": [
    {
      label: "圣士提反书院：2027/28 中一申请办法",
      url: "https://ssc.edu.hk/en/site/view?name=Application_S1",
      scope: "核对 2027/28 网上申请期 2026-10-10 至 2026-11-30、费用、申请文件、操行要求及学业/面试/课外活动/其他因素的评核权重；截至 2026-10-21 申请仍开放，日期和要求仅适用于该届。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "圣士提反书院：中一新生家长须知",
      url: "https://www.ssc.edu.hk/en/site/view?name=Notes+to+Parents_S1",
      scope: "核对学校不参加 SSPA、校网限制说明、2026/27 本地/非永久居民参考学费、资格及评核比重；校方注明 2027/28 学费可调整。",
      sourceType: "school-official",
      academicYear: "2026/27 费用；2027/28 招生说明",
      checkedOn: "2026-10-21",
    },
    {
      label: "圣士提反书院：2027/28 中一招生讲座及校园参观",
      url: "https://www.ssc.edu.hk/en/site/view?name=S1+Admission+Talk",
      scope: "核对 2026-10-10 与 10-24 两场招生讲座均已额满；礼堂约 800 席先到先得，另设现场直播溢出场地。讲座额满不等于中一申请结束。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "家校会《中学概览 2025/26》：圣士提反书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=312",
      scope: "核对学校类别、学校编号、课程、教师及班级快照、校园、2025/26 学费/寄宿费、非华语学生和学习支援资料；概览注明资料由学校提供。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-16",
    },
    {
      label: "圣士提反书院 School Report 2024–2025",
      url: "https://www.ssc.edu.hk/uploads/files/Download%20Area/School%20Report%202024-25(1).pdf",
      scope: "核对 2025 HKDSE 学科应考人数与 Level 2+ 比例、IBDP 登记/获文凭人数及均分原文、S6 去向表；不同统计单位和年报内部均分差异均在报告中标明。",
      sourceType: "school-official",
      academicYear: "2024/25 年报；2025 届考试与去向",
      checkedOn: "2026-10-16",
    },
    {
      label: "圣士提反书院：Studying at SSC",
      url: "https://www.ssc.edu.hk/en/site/view?name=Studying+at+SSC",
      scope: "核对校方公布的中学学习阶段、英语授课和 HKDSE/IBDP 路线介绍；具体年级课程及选科以当届校本资料为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：Junior S1–S3 课程",
      url: "https://www.ssc.edu.hk/en/site/view?name=Junior+%28S1-S3%29",
      scope: "核对 S1–S3 八大学习领域及逐年科目表；实际语言与课时安排以当届课表为准。",
      sourceType: "school-official",
      academicYear: "现行课程简介",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：IB Diploma Programme Subjects",
      url: "https://www.ssc.edu.hk/en/site/view?name=Subjects+OfferedIB",
      scope: "核对 IBDP 六学科组、HL/SL、核心要求及校方列出的科目；网页列科不代表每年每种组合都会开班。",
      sourceType: "school-official",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：HKDSE Subjects",
      url: "https://ssc.edu.hk/en/site/view?name=DSE_Subjects+Offered",
      scope: "核对 HKDSE 核心科、校方列出的选修科及课程说明；科目名额和当届开班情况仍须向学校确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：HKDSE FAQ",
      url: "https://www.ssc.edu.hk/en/site/view?name=DSE_FAQ",
      scope: "核对 S3 两学期成绩权重、S4 选科分配办法、热门科班额及 M1/M2、视觉艺术选科条件；该 DSE 分配规则不外推为 IBDP 选拔规则。",
      sourceType: "school-official",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：Fee Remission",
      url: "https://www.ssc.edu.hk/en/site/view?name=Fee+Remission",
      scope: "核对减免按家庭可支配收入和人数审查、同校第二及第三名子女加幅，以及本地学生资格；具体比例和年度门槛以独立年度指引为准。",
      sourceType: "school-official",
      academicYear: "现行 scheme 摘要",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：2026/27 Fee Remission Guideline",
      url: "https://www.ssc.edu.hk/uploads/files/Fee%20Remission%20Guideline%20-%20English%20Version%202026-2027.pdf",
      scope: "核对 2026/27 减免档位、家庭人数及可支配收入计算、单亲家庭加一规则、第二及第三名子女加幅和当年申请期限；2027/28 门槛与日期待校方另行公布。",
      sourceType: "school-official",
      academicYear: "2026/27 费用减免",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：寄宿简介",
      url: "https://www.ssc.edu.hk/en/site/view?name=Introduction",
      scope: "核对校方介绍的周寄宿、宿舍和住宿安排；实际申请资格、床位、费用及当届寄宿规则须另向学校确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：奖学金",
      url: "https://www.ssc.edu.hk/en/site/view?name=Scholarships",
      scope: "核对学术奖 100%/50% 及年级排名/续领条件，非学术奖固定金额与逐年申请；与家庭经济审查的 Fee Remission 分开记录。",
      sourceType: "school-official",
      checkedOn: "2026-10-20",
    },
    {
      label: "圣士提反书院：非本地学生计划公告",
      url: "https://www.ssc.edu.hk/uploads/files/2526-288_JMA.pdf",
      scope: "记录校方 2025-12-15 曾表示申请参加教育局非本地学生自资入学计划；该公告本身不证明最终批核、资格或现行学额。",
      sourceType: "school-official",
      academicYear: "2025/26 公告",
      checkedOn: "2026-10-16",
    },
    {
      label: "圣保罗男女中学：2026/27 学费及减免",
      url: "https://www.spcc.edu.hk/admissions/fee-remission-and-financial-aid",
      scope: "第 7 章同类直资男女校比较：2026/27 S1–3 HK$87,800、S5–6 DSE HK$79,000、IBDP HK$128,500；按级别与课程区分。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "保良局颜宝铃书院：2026/27 学费",
      url: "https://www.npl.edu.hk/en/site/view?name=Scheme",
      scope: "第 7 章同类直资男女校比较：2026/27 S1–5 DSE HK$35,900，IBDP 每年 HK$98,400；桥接年适用费用须向学校另问。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "保良局颜宝铃书院：DSE、IBDP 与桥接年",
      url: "https://www.npl.edu.hk/en/site/view?name=Introduction",
      scope: "核对初中后可选本地 DSE 或 IBDP，选 IBDP 者可修读桥接年；分流门槛和名额没有公开完整口径。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "保良局颜宝铃书院：2027/28 中一申请",
      url: "https://www.npl.edu.hk/en/site/view?name=F.1+Admission",
      scope: "核对 2027/28 网上申请期为 2026-11-16 至 12-24，作为同届直资后备申请时间线。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-17",
    },
    { label: "Big Exam：圣士提反书院 Band 1B 估算", url: "https://dse.bigexam.hk/en/ssp/school/312", scope: "第三方页面按 2025 DSE 结果粗估 Band 1B；其说明 Band 是家长用词、并非教育局学校评级，资料公开程度和 cohort 差异会影响估算精度。", sourceType: "third-party-estimate", academicYear: "2025 DSE 估算", checkedOn: "2026-10-20" },
    { label: "HK Tutor Link：圣士提反书院 Band 1B 估算", url: "https://hktutorlink.hk/secondary-schools/en/st-stephen-s-college-124e1c5", scope: "页面列 2025 估算 Band 1B 与历史区间；估算方法和底层数据与其他网站的独立性未充分披露，只作非官方参考。", sourceType: "third-party-estimate", academicYear: "2025 估算", checkedOn: "2026-10-20" },
    { label: "SchoolBanding：圣士提反书院 Band 1B 估算", url: "https://schoolbanding.com/s/st-stephens-college", scope: "页面按 DSE 2026 标示 Band 1B；排名与语言指数属平台估算，不能视为官方评级，也不能代表 IBDP 路线。", sourceType: "third-party-estimate", academicYear: "DSE 2026 估算", checkedOn: "2026-10-20" },
    { label: "StarSchools：圣士提反书院 Band 1 参考", url: "https://starschools.hk/en/schools/st-stephens-college", scope: "页面标作 indicative Band 1，未细分 1A/1B/1C；平台明确 EDB 不发布学校 Band，仅作宽范围参考。", sourceType: "third-party-estimate", academicYear: "2026 年参考", checkedOn: "2026-10-20" },
    { label: "教育王国：港大同学会与圣士提反书院比较讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3874890", scope: "2023 年匿名论坛讨论涉及 DSE/IB 学生构成与成绩可比性、校风和升学去向看法；发言身份及代表性无法核实，只用于形成家长核校问题，不作为普遍结论。", sourceType: "parent-discussion", academicYear: "2023-03 至 2023-04 讨论", checkedOn: "2026-10-20" },
    { label: "教育王国：圣士提反与汇基东九龙择校讨论", url: "https://m.edu-kingdom.com/post.php?fid=372&page=4&tid=3884260", scope: "2025 年匿名家长讨论提及通勤、寄宿、费用、校园/运动空间、英语环境与校风观感，评论存在不同意见；身份和样本不可核实，不代表现届家庭共识。", sourceType: "parent-discussion", academicYear: "2025-04 讨论", checkedOn: "2026-10-20" },
    { label: "教育王国：颜宝铃与圣士提反书院比较讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3852533", scope: "2021 年匿名家长讨论曾比较交通、学费、成绩、课程与寄宿；年代较早，仅作为长期择校关注点，不能代表当前价格、招生规则或现届口碑。", sourceType: "parent-discussion", academicYear: "2021-03 讨论", checkedOn: "2026-10-20" },
  ],
"kings-college-secondary": [
    {
      label: "英皇書院：中一招生入口",
      url: "https://www.kings.edu.hk/en/admission",
      scope: "核對 2026-10-21 網頁仍列 2026 年 9 月入學候補安排及上一輪中一自行分配學位時間表，尚未列 2027/28 校本學額、評核與文件。",
      sourceType: "school-official",
      checkedOn: "2026-10-21",
    },
    {
      label: "中学概览 2025/26：英皇书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=419",
      scope: "核对学校编号 419、官立男校、地区、校地、2025/26 收费、班级、教师、教学语言、课程、设施及支援快照；学费及堂费栏为「—」，S4–S6 课外活动费 HK$155 未另注明周期；页面收费表标 2025/26，同页另列 2026/27 科目。资料由学校提供及核实。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "英皇书院：School Curriculum 2026–27",
      url: "https://www.kings.edu.hk/en/school-curriculum-2025-26",
      scope: "核对 2026/27 S1–S6 班级与课程科目；S3 仍列综合科学，网页列 S6 学生参加 HKDSE。网页列科不表示任意选科组合保证开班。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "英皇书院：School Reports & Plans（含 2025/26 其他语文试行计划评估报告索引）",
      url: "https://www.kings.edu.hk/en/school-reports-plans",
      scope: "核对校方报告索引列出 2025/26 初中其他语文试行计划评估报告；本轮未能读取报告正文，因此不据此断言所教语种、年级、参与人数或评估结果，相关细节列为向校方确认事项。",
      sourceType: "school-official",
      academicYear: "2025/26 报告索引",
      checkedOn: "2026-10-21",
    },
    {
      label: "英皇书院：Annual School Report 2024/2025",
      url: "https://www.kings.edu.hk/sites/default/files/download/SMC_2_25-26_School%20Report%202024-25_r.pdf",
      scope: "核对 2024/25 全校 24 班 756 人、2025 届 HKDSE 120 名应考者、达到大学及副学位最低入学要求的人数与定义、2025 届去向图、学生支援和生涯规划；达标人数不等于录取或注册人数。",
      sourceType: "school-official",
      academicYear: "2024/25 年报；HKDSE 2025 届",
      checkedOn: "2026-10-17",
    },
    {
      label: "英皇書院：2026/27 放榜後中一候補申請指引",
      url: "https://www.kings.edu.hk/sites/default/files/download/Guidance%20Notes%20on%20Application.pdf",
      scope: "核對 2026 年 7 月 7 日起至學額額滿的放榜後候補程序、無空缺可暫停、學業及操行門檻、親身交件、筆試/面試和通知範圍；這是上一輪歷史機制，不作 2027/28 保證。",
      sourceType: "school-official",
      academicYear: "2026/27 入學輪次（已結束）",
      checkedOn: "2026-10-19",
    },
    {
      label: "英皇书院：S1 Application Guidelines 2026/27",
      url: "https://www.kings.edu.hk/sites/default/files/download/Application%20Guidelines.pdf",
      scope: "只记录已结束的 2026/27 轮次：43 个 DP 学额、面试安排、上一届评核权重及材料；明确不将这些历史规则套用至 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 入学轮次（历史资料）",
      checkedOn: "2026-10-17",
    },
    {
      label: "教育局：SSPA 2025/27 周期及 2027/28 中一时程",
      url: "https://www.edb.gov.hk/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对参加 SSPA 学校 2027/28 DP 申请窗口、成功 DP 通知、统一派位结果及注册日期、SSPA e-Platform 预计 2026 年 11 月中开放注册，以及已连结 iAM Smart+ 用户可线上提交等一般规则；英皇招生入口于 2026-10-21 仍列上一轮规则；学校校本学额和评核标准以新公告为准。",
      sourceType: "government",
      academicYear: "2027/28 中一派位周期",
      checkedOn: "2026-10-21",
    },
    {
      label: "英皇书院：School History",
      url: "https://www.kings.edu.hk/en/school-history",
      scope: "核对学校在现址创校年份与校舍历史；法定古蹟年份另據古物古蹟辦事處資料核對。",
      sourceType: "school-official",
      checkedOn: "2026-10-16",
    },
    {
      label: "古物古蹟辦事處：英皇書院法定古蹟",
      url: "https://www.amo.gov.hk/en/historic-buildings/monuments/hong-kong-island/monuments_101/index.html",
      scope: "核對英皇書院般咸道校舍相關建築於 2011 年列為法定古蹟；不把整個校地所有新建部分一概視為法定古蹟範圍。",
      sourceType: "government",
      checkedOn: "2026-10-17",
    },
    {
      label: "中學排名論壇：英皇書院與跨區申請討論",
      url: "https://schoolbanding.com/forum/post/237",
      scope: "2026-03 家長選校討論串共 19 條評論；其中一位留言者自述其子現讀英皇中二並提及同學來自多區，身份與內容未獨立核實。只作家庭關注與訪校問題線索，不代表全校家長意見、學生地域分布或取錄機率。",
      sourceType: "parent-discussion",
      academicYear: "2026-03 討論串",
      checkedOn: "2026-10-19",
    },
    {
      label: "Big Exam：英皇書院 Banding 估算",
      url: "https://dse.bigexam.hk/en/ssp/school/419",
      scope: "頁面按 2025 HKDSE 資料估算 Band 1A，並標示 High accuracy；平台說明此為根據校方公開 DSE 數據所作估算，不是教育局學校評級，逐屆表現與公開資料完整度會影響估算。",
      sourceType: "third-party-estimate",
      academicYear: "2025 DSE 估算；2026-10-20 查閱",
      checkedOn: "2026-10-20",
    },
    {
      label: "香港導師聯會：英皇書院 Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/king-s-college-004eb4c",
      scope: "頁面標示 2025 Band 1A 估算，列 2018–2025 歷年區間及排名範圍；估算方法與底層數據對其他網站的獨立性未完全披露，僅供坊間定位參考。",
      sourceType: "third-party-estimate",
      academicYear: "2025 估算；2026-10-20 查閱",
      checkedOn: "2026-10-20",
    },
    {
      label: "StarSchools：英皇書院 Band 1 參考",
      url: "https://starschools.hk/en/schools/kings-college",
      scope: "頁面只列 indicative Band 1（1*），不細分 1A/1B/1C；平台說明教育局按派位機制分學生組別，並無學校 Banding，該標示只作非官方寬檔參考。",
      sourceType: "third-party-estimate",
      academicYear: "頁面核對日 2026-10-20",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育局：中學派位組別與學校分類的區別",
      url: "https://www.edb.gov.hk/attachment/en/about-edb/press/legco/replies-to-fc/EDB-2-e1.pdf",
      scope: "教育局立法會答覆說明政府不按學生學業表現將中學分類；學生 Band 是 SSPA 派位機制的一部分，不是學校官方 Band 1A/1B 評級。",
      sourceType: "government",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育王國：英皇書院與聖保羅書院選校討論",
      url: "https://www.edu-kingdom.com/forum.php?extra=page%3D1%26mod=viewthread%26tid%3D3867165&mod=viewthread&page=2&tid=3867165",
      scope: "討論串始於 2022 年，家長按男校選擇、DSE/IAL 路線、學費及公開成績作比較，留言亦提及校舍與選科考量；匿名個案、年份較早且意見不一，不代表現時整體家長口碑，只用來形成訪校核對問題。",
      sourceType: "parent-discussion",
      academicYear: "2022 討論串；2026-10-20 查閱",
      checkedOn: "2026-10-20",
    },
    {
      label: "中学概览 2025/26：皇仁书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=128",
      scope: "第 7 章同 SSPA 男校比较：核官立身份、湾仔区校址、2025/26 课程及列示费用；不是学校质量排名。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-16",
    },
    {
      label: "中学概览 2025/26：喇沙书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=177",
      scope: "第 7 章同 SSPA 男校比较：核资助身份、九龙城校址、2025/26 课程及列示费用；六年家教会会费不作年费。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-16",
    },
    {
      label: "中学概览 2025/26：圣士提反书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=312",
      scope: "只作国际课程另组的直资男女校背景，不与 SSPA 男校混作同制度志愿；IBDP 和费用另以校方当届文件核实。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-16",
    },
  ],
"wah-yan-college-kowloon-secondary": [
    {
      label: "中学概览 2025/26：华仁书院（九龙）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=125",
      scope: "核对 WYK 学校身份、地区、办学类型、性别、宗教、规模、收费、班级、教学语言、课程、设施、支援与交通快照；资料由学校提供及核实。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；含 2026/27 拟开科目",
      checkedOn: "2026-10-17",
    },
    {
      label: "WYK：S1 Admissions 2027/28 Intake",
      url: "https://wyk.edu.hk/academic/admission/s1-admissions-0/",
      scope: "核对 2027/28 信息日：登记于 2026-10-23 12:00 开放、免费先到先得；另核对 DP 申请期、暂定面试、派位与注册日期、申请资料授权处理及派位结果公布后三个月销毁。截至 2026-10-21 复核页面仍未列新一届学额、评核权重和申请文件。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-21",
    },
    {
      label: "WYK：School Annual Report 2024/25",
      url: "https://wyk.edu.hk/wp-content/uploads/2026/04/Annual-School-Report-24-25-web.pdf",
      scope: "核对学校规模（概述 912 人与逐级表 889 人存在内部冲突）、课程、教学与学生支援，以及 2025 届 140 名 HKDSE 考生、139 名 JUPAS 申请者、校方所报约 80% offer rate 和科目表现；offer 数与最终注册分母未完整列明。",
      sourceType: "school-official",
      academicYear: "2024/25 年报；HKDSE 2025 届",
      checkedOn: "2026-10-17",
    },
    {
      label: "WYK：HKDSE – Class of 2026",
      url: "https://wyk.edu.hk/news/hkdse-class-of-2026/",
      scope: "核对校方 2026-07-15 届别公告；公告没有公布 2026 届考生数、成绩分布或升学统计，因此不用于推算 cohort 结果。",
      sourceType: "school-official",
      academicYear: "2025/26 学年；2026 届公告",
      checkedOn: "2026-10-19",
    },
    {
      label: "WYK：Subjects Offered",
      url: "https://wyk.edu.hk/subject-offered/",
      scope: "核对校方公布的各级科目、高中选修安排及选科分组条件；网站列出课程不代表所有科目组合都保证开办。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "WYK：Application Guidelines for Admission to S1 2025/26",
      url: "https://wyk.edu.hk/wp-content/uploads/2024/11/S1_DP_2025-2026_AppGuidelines_FINAL.pdf",
      scope: "只作已结束的 2025/26 轮次历史参考：评分项目、各部分最高分与英语个人/小组面试；不将旧规则套用至 2027/28。",
      sourceType: "school-official",
      academicYear: "2025/26 入学轮次（历史资料）",
      checkedOn: "2026-10-17",
    },
    {
      label: "教育局：SSPA 2025/27 周期及 2027/28 中一时程",
      url: "https://www.edb.gov.hk/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 DP 申请窗口、成功 DP 通知、统一派位结果、注册日期、最多两所 DP 学校及非参加 SSPA 小学学生的申请路径。",
      sourceType: "government",
      academicYear: "2027/28 中一派位周期",
      checkedOn: "2026-10-21",
    },
    {
      label: "WYK：Scholarships and Financial Aid",
      url: "https://wyk.edu.hk/scholarships-and-financial-aid1/",
      scope: "核对校方公布的入学奖、在校生表现奖自动考虑机制、需要型助学金的学年初申请窗口、升学奖助及海外交流/全年紧急援助；资格、金额与年度申请细节依校方通知。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "WYK：Support for NCS Students",
      url: "https://wyk.edu.hk/support-for-non-chinese-speaking-ncs-students/",
      scope: "核对学校面向非华语学生的中文小班、课后支援、教师支援、教材调适及共融活动说明。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "Big Exam：WYK 2025 Banding 估算",
      url: "https://dse.bigexam.hk/en/ssp/school/125",
      scope: "第三方将学校 2025 年 Banding 粗略估算为 Band 1B–1A；仅用于坊间学术定位，非教育局评级，不代表个人派位或录取机会。",
      sourceType: "third-party-estimate",
      academicYear: "2025 估算",
      checkedOn: "2026-10-20",
    },
    {
      label: "香港导师联会：WYK 2025 Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/wah-yan-college-kowloon-a246f2a",
      scope: "第三方学校资料页列 2025 年 Band 1B–1A 估算及估算排名范围；不视为官方评级或独立验证的精确学校等级。",
      sourceType: "third-party-estimate",
      academicYear: "2025 估算",
      checkedOn: "2026-10-20",
    },
    {
      label: "SchoolBanding：WYK 2026 Banding 参考",
      url: "https://schoolbanding.com/s/wah-yan-college-kowloon",
      scope: "第三方 2026 页面列 Band 1B–1A；其排名及英文指数未用于本报告评级，因方法与原始资料可比性不足。",
      sourceType: "third-party-estimate",
      academicYear: "2026 参考",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育局：2025/27 统一派位常见问题",
      url: "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_CA_EN.pdf",
      scope: "解释统一派位中学生组别的用途与限制；用来区分学生派位组别和坊间学校 Banding 估算。",
      sourceType: "government",
      academicYear: "2025/27 SSPA 周期",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育王国：2020–2021 九龙华仁书院交流区",
      url: "https://www.edu-kingdom.com/forum.php?extra=page%3D1&mod=viewthread&page=7&tid=3819648",
      scope: "第 6 章口碑样本：一名自称当年新生家长谈自主度、功课责任和家庭适应；仅作 2020 年个人经历及访校提问线索，不视为现行政策或家长共识。",
      sourceType: "parent-discussion",
      academicYear: "留言发表于 2020 年 12 月",
      checkedOn: "2026-10-20",
    },
    {
      label: "中学概览 2025/26：喇沙书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=177",
      scope: "仅用于比较资助男校、九龙城区与学校制度；不作学校质量或录取机会排名。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖芳濟書院：學校基本資料",
      url: "https://www.sfxc.edu.hk/basic-information",
      scope: "第七章同制度資助男校比較；核對聖芳濟的男校身份、大角咀校址及辦學背景。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "聖芳濟書院：高中科目",
      url: "https://www.sfxc.edu.hk/subjects-offered",
      scope: "第七章同制度比較；核對校方公布的高中 HKDSE 科目，實際開班組合須看當屆安排。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "長沙灣天主教英文中學：中一招生",
      url: "https://cswcss.edu.hk/admissions/",
      scope: "第七章同制度比較；核對學校招收男生及 2027/28 DP 細節預計 2026 年 11 月公布。",
      sourceType: "school-official",
      academicYear: "2027/28 入學資訊",
      checkedOn: "2026-10-17",
    },
    {
      label: "中學概覽 2025/26：長沙灣天主教英文中學",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=36",
      scope: "第七章同制度比較；核對資助男校、深水埗區、參加統一派位及 HKDSE 課程年度資料。",
      sourceType: "school-profile",
      academicYear: "2025/26 學年",
      checkedOn: "2026-10-17",
    },
  ],
"pui-ching-middle-school-secondary": [
    {
      label: "香港培正中学：2027/28 中一入学",
      url: "https://www.puiching.edu.hk/tc/%E4%B8%AD%E4%B8%80",
      scope: "核对 2027/28 DP 只接受香港培正小学学生、65 个名额、纸本申请、免笔试、面试语言/形式及两个阶段的甄选权重；申请人数未公开。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-21",
    },
    {
      label: "中学概览 2025/26：香港培正中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=379",
      scope: "核对学校身份、班级、教师、2025/26 费用、2025/26 及 2026/27 科目、教学语言、设施、教师培训与支援快照；资料由学校提供及核实。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；含 2026/27 拟开科目",
      checkedOn: "2026-10-18",
    },
    {
      label: "香港培正中学：开设科目",
      url: "https://www.puiching.edu.hk/tc/%E9%96%8B%E8%A8%AD%E7%A7%91%E7%9B%AE",
      scope: "校方现行按中一至中六列示有开设的科目，包括文学、M1/M2、设计科技、家政、戏剧与舞蹈等；页面未注明适用学年，不将科目表解释为当届必修、必开班或自由选科保证。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "香港培正中学：2024/25 年报",
      url: "https://www.puiching.edu.hk/sites/default/files/file/24-25annual_report.pdf",
      scope: "核对 2025 届中文、英文、数学、332A33、最佳五科及 JUPAS 派位指标，以及 2024/25 中五人文选修午间学习活动（每科 6 节）、数学增益课程总课堂时数（逾 490 小时）与每周出席人次（约 100）；部分逐科考生和 JUPAS 分母/定义未完整公开。",
      sourceType: "school-official",
      academicYear: "2024/25 年报；HKDSE 2025 届",
      checkedOn: "2026-10-19",
    },
    {
      label: "香港培正中学：2026 文凭试放榜",
      url: "https://www.puiching.edu.hk/tc/latest_news/2026-%E6%96%87%E6%86%91%E8%A9%A6%E6%94%BE%E6%A6%9C",
      scope: "校方公布两名学生各考获六科 5**，其中一人另在数学延伸部分考获 5**；公告未提供 2026 届考生总数、逐科分布或完整升学数据，仅作个人成绩个案记录。",
      sourceType: "school-official",
      academicYear: "2026 HKDSE 放榜公告",
      checkedOn: "2026-10-19",
    },
    {
      label: "Big Exam：培正中学 Banding 估算",
      url: "https://dse.bigexam.hk/zh-hk/ssp/school/379",
      scope: "第三方以 2025 HKDSE 公开表现估算学校学术位置为 Band 1A；网站说明其估算非官方，披露资料多少会影响估算准确性，不代表教育局校级评级或个人派位结果。",
      sourceType: "third-party-estimate",
      academicYear: "2025 估算；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "香港导师联会：培正中学 Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/pui-ching-middle-school-a5f8977",
      scope: "第三方页面列 2025 年 Band 1A 估算；其评级方法与 Big Exam 是否共享原始数据或权重未独立证实，不当作完全独立的测量。",
      sourceType: "third-party-estimate",
      academicYear: "2025 估算；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "SchoolBanding：培正中学 Banding 参考",
      url: "https://schoolbanding.com/s/pui-ching-middle-school",
      scope: "第三方 2026 页面列 Band 1B–1A；页面另列排名和英文指数，但方法与分母未充分披露，本报告只采用其 Band 区间，不引用排名或英文指数作事实。",
      sourceType: "third-party-estimate",
      academicYear: "2026 页面；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育局：中学学位分配常见问题（2025/27，2027年9月入学）",
      url: "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_EN.pdf",
      scope: "2025/27 周期一般问答；说明统一派位按学生 Net Band、家长选校及随机编号分配。用于区分官方学生派位组别与第三方学校 Banding 估算。",
      sourceType: "government",
      academicYear: "2025/27 SSPA 周期（2027年9月入学）",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港培正中学：2023/24 年报（持份者问卷与家校活动）",
      url: "https://www.puiching.edu.hk/sites/default/files/file/23-24annual_report.pdf",
      scope: "年报第 8 页列学生、家长问卷中的校园关爱、同学相处、教师支持和喜爱学校等正向比例，也记载家长小聚与沟通活动；属校方汇报的问卷结果，非独立口碑调查，报告未在此处给出所有问卷样本数。",
      sourceType: "school-official",
      academicYear: "2023/24 学年；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育王国：培正课程与学校优劣讨论",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2680022",
      scope: "2013 年一名自述两名子女就读培正、较年长孩子刚升中学的家长，分享其对校风、阅读兴趣、学习节奏与家庭配合的正面体验；年代久远、单一匿名自述，只用于提出访校问题，不代表现时家长共识。",
      sourceType: "parent-discussion",
      academicYear: "2013-10-05 家长发言；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育王国：外校学生申请培正中一讨论",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3866996",
      scope: "2022 年讨论围绕外校申请资格、中文授课与英文教材／考试语言的家庭疑问；论坛回帖包含未经核实的名额和路径说法，本报告仅记录疑问本身，并以校方 2027/28 招生资料及 2025/26 概览为准。",
      sourceType: "parent-discussion",
      academicYear: "2022-05 讨论；2026-10-20 查阅",
      checkedOn: "2026-10-20",
    },
    {
      label: "教育局：SSPA 2025/27 周期及 2027/28 中一时程",
      url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027/28 DP 申请日期、正取学生通知、派位结果和中一注册日期，以及 2026 年 11 月中旬电子平台登记及透过平台递交 DP 申请的安排；须与培正校方页面的纸本申请要求并列核实。",
      sourceType: "government",
      academicYear: "2027/28 中一派位周期",
      checkedOn: "2026-10-21",
    },
    {
      label: "中学概览 2025/26：民生书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=219",
      scope: "第 7 章比较：核对九龙城区资助男女校、2025/26 学科教学语言及学费/堂费/会费/核准项目；2026 年入学参加 DP 和统一派位的说明不得当作 2027/28 校本政策。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；含 2026 年入学资料",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：迦密中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=148",
      scope: "第 7 章比较：核对九龙城区资助男女校、2025/26 学科教学语言、S1 与 S4 收费区别；2026 年入学参加 DP 和统一派位的说明不得外推到 2027/28。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；含 2026 年入学资料",
      checkedOn: "2026-10-17",
    },
  ],
"maryknoll-convent-school-secondary": [
    {
      label: "瑪利諾修院學校：中一入學申請",
      url: "https://mcs.edu.hk/中一入學申請",
      scope: "核对 2027/28 详细规则预计于 2026 年 11 月公布、收集申请表日期为 2027-01-04 至 01-18；尚未公布新一届学额、文件、面试与权重。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-21",
    },
    {
      label: "瑪利諾修院學校：2026/27 中一 DP 申請指引與個人資料聲明（歷史輪次）",
      url: "https://www.mcs.edu.hk/~mcs/sites/default/files/pdf/2.1_Note_eng_2526.pdf",
      scope: "僅記錄已結束的 2026/27 輪次：5 班、54 個暫定 DP 學額、申請材料及 35/10/25/30 權重；校方聲明申請資料只用於處理申請、保密保存不超過 12 個月後連同材料銷毀，並要求資料準確完整及最新。2027/28 招生和隱私安排均待新指引確認，不沿用本輪規則。",
      sourceType: "school-official",
      academicYear: "2026/27 入學輪次（歷史資料）",
      checkedOn: "2026-10-18",
    },
    {
      label: "瑪利諾修院學校：2027/28 中二至中四插班申请",
      url: "https://mcs.edu.hk/中二至中四入學申請",
      scope: "核对校方公告 2027/28 插班资讯将于 2027 年 1 月公布、收集申请表日期为 2027-01-19 至 04-30；页面未说明各级空位、资格、材料、评核或最终提交截止日，收表期不等同递交截止日。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-21",
    },
    {
      label: "中学概览 2025/26：瑪利諾修院學校（中学部）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=213",
      scope: "核对学校编号 213、九龙塘校址、资助天主教女校、2025/26 实际开设科目、2026/27 拟开设科目、费用、教师、班级、设施与支援快照；学生会费 HK$20 未注明缴付周期，列示项目合计 HK$3,590 不视为每年固定金额。资料由学校提供及核实；拟开设科目不等同已落实课程。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；含 2026/27 拟开科目",
      checkedOn: "2026-10-19",
    },
    {
      label: "瑪利諾修院學校：Annual School Report 2024/25",
      url: "https://www.mcs.edu.hk/sites/default/files/download/schrep2425.pdf",
      scope: "直接打开并核对 2024/25 年报第 6、8–9、29–30、32 页：替代评估选择比例、按年级安排的身心健康及朋辈支援做法、2025 毕业去向和本地院校分布、2022–2025 四年 DSE 汇总；替代评估比例不代表学生成绩或个人参与比例；原表不列毕业去向人数及 DSE 汇总分母，四年合并方法未说明。",
      sourceType: "school-official",
      academicYear: "2024/25 年报；2025 届去向；HKDSE 2022–2025 汇总",
      checkedOn: "2026-10-18",
    },
    {
      label: "瑪利諾修院學校：Academic Performance",
      url: "https://www.mcs.edu.hk/academic-performance",
      scope: "重核校方现行学业表现页列有毕业去向调查及 2023–2026 境外大学 offer 栏目；可读取页面未提供逐年人数、完整分母或最终注册数据，报告仅作为后续核查入口，不将栏目标题当作统计结论。",
      sourceType: "school-official",
      academicYear: "页面含 2023–2026 境外 offer 栏目；具体统计口径未公开",
      checkedOn: "2026-10-19",
    },
    {
      label: "瑪利諾修院學校：Senior Curriculum",
      url: "https://mcs.edu.hk/senior-curriculum",
      scope: "核对高中核心科、一般三科选修与其他学习经历；实际组合及开班按当届校方通知。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "瑪利諾修院學校：School-based Curriculum",
      url: "https://mcs.edu.hk/school-based-curriculum",
      scope: "核对校本课程设计、F1 与 F4 衔接及课程实施理念。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育局：SSPA 2025/27 周期及 2027/28 中一时程",
      url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027/28 DP 申请 1/4–18、正取通知 3/31、放榜 7/6、注册 7/8–9，以及 2026 年 11 月中旬电子平台登记安排；具体校本表格及附件提交方式以学校新公告为准。",
      sourceType: "government",
      academicYear: "2027/28 中一派位周期",
      checkedOn: "2026-10-21",
    },
    {
      label: "中学概览 2025/26：嘉諾撒聖家書院（比较背景）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=152",
      scope: "仅用于同属资助天主教女校的学校类别、九龙城区校址、2025/26 授课语言、中一班数与列示收费对照；不据此推断 2027/28 录取机会。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；2026 年 9 月中一派位说明",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：嘉諾撒聖瑪利書院（比较背景）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=153",
      scope: "仅用于同属资助天主教女校的学校类别、油尖旺本区及九龙城他区、2025/26 授课语言、中一班数与列示收费对照；不据此推断 2027/28 统一派位资格或机会。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；2026 年 9 月中一派位说明",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：瑪利諾中學（学校编号 214）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=214",
      scope: "仅用于说明九龙塘瑪利諾修院學校（中学部，编号 213）与黄大仙瑪利諾中學（编号 214）是不同学校。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-16",
    },
    {
      label: "考評局：332A 文憑試成績定義",
      url: "https://www.hkeaa.edu.hk/tc/hkdse/faq/q2/",
      scope: "核对 332A 的科目门槛：中文及英文第 3 级、数学必修部分第 2 级、公民与社会发展科达标；这是符合申请资格的最低要求，不等于大学录取或入读。",
      sourceType: "government",
      academicYear: "自 2024/25 入学起适用的基本门槛；2026-10-21 核对",
      checkedOn: "2026-10-21",
    },
    {
      label: "Big Exam：瑪利諾修院學校（中学部）Banding 与 HKDSE 估算",
      url: "https://dse.bigexam.hk/zh-hk/ssp/school/213",
      scope: "第三方按 2025 HKDSE 资料估为 Band 1A，并给出全港排名区间 8–16；不是教育局评级。估算方法、排名分母及与其他估算站的数据独立性未充分披露，不能推算个人派位或取录机会。",
      sourceType: "third-party-estimate",
      academicYear: "2025 年估算；2026-10-21 核对",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港导师联会：瑪利諾修院學校（中学部）Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/maryknoll-convent-school-secondary-section-165cd87",
      scope: "页面列 2025 Band 1A 与排名范围 8–14；与 Big Exam 的方法及底层数据是否独立无法证实，不作为独立第二次测量或官方评等。",
      sourceType: "third-party-estimate",
      academicYear: "2025 年估算；2026-10-21 核对",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：瑪利諾修院學校（中学部）2026 Banding 估算",
      url: "https://schoolbanding.com/s/maryknoll-convent-school-secondary-section",
      scope: "页面列 2026 Band 1A、全港第 8 位及排名区间 8–16；排名方法和与其他估算站资料的独立性未充分披露。仅作坊间参考，不作官方评级或个人派位机会。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年估算；2026-10-21 核对",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：瑪利諾修院學校家长交流区",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2240201",
      scope: "早年匿名家长个人描述升中后的功课量与课外活动时间；身份、年级和样本代表性不能独立核实，年代较久，仅作访校追问线索，不概括当前校况。",
      sourceType: "parent-discussion",
      academicYear: "约 2010–2011 年讨论；2026-10-21 检索",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：协恩中学 vs 瑪利諾修院學校",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3762761",
      scope: "2019 年升中讨论中的原发帖以‘听说’描述 MCS 高中气氛与教学；属于转述而非可核实的在读者经验，不用于判断教师质量或现况。",
      sourceType: "parent-discussion",
      academicYear: "2019 年讨论；2026-10-21 检索",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：由德望插班瑪利諾",
      url: "https://www.edu-kingdom.com/forum.php?action=printable&mod=viewthread&tid=2368438",
      scope: "约 2012 年匿名用户自述转校取舍与个人功课体验；样本单一、身份无法核实、年代较久，只作为家庭关注议题，不推断两校当前差异。",
      sourceType: "parent-discussion",
      academicYear: "约 2012 年讨论；2026-10-21 检索",
      checkedOn: "2026-10-21",
    },
  ],
"good-hope-secondary": [
    {
      label: "Big Exam：德望学校 2025 年 Banding 估算",
      url: "https://dse.bigexam.hk/zh-cn/ssp/school/50",
      scope: "第三方按 2025 年公开 DSE 表现估算为 Band 1A；非官方评级，页面方法与排名区间不能用来推断个别学生取录机会。",
      sourceType: "third-party-estimate",
      academicYear: "2025 年估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港导师聯會：德望学校 Banding 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/good-hope-school-37f4f95",
      scope: "第三方列 2025 Band 1A、全港排名区间约 6–11；与其他估算来源方向一致，但底层数据是否独立未能确认。",
      sourceType: "third-party-estimate",
      academicYear: "2025 年估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：德望学校 2026 Banding 估算",
      url: "https://www.schoolbanding.com/s/good-hope-school",
      scope: "第三方 2026 页面列 Band 1A、全港第 6 位及约 6–12 排名区间；非教育局评级，估算方法及与其他平台数据独立性须保留限制。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王國：德望中學是否很谷（家長自述）",
      url: "https://www.edu-kingdom.com/forum.php?authorid=1485807&mod=viewthread&page=1&tid=3865992",
      scope: "2022 年匿名家長自述女兒從一般資助小學升讀後約用兩至三個月適應，之後校園生活愉快；單一自述、非當屆樣本，不代表目前整體功課量或學生感受。只用作提出適應期與學習支援的訪校問題。",
      sourceType: "parent-discussion",
      academicYear: "2022 年討論；中學部家庭個案",
      checkedOn: "2026-10-21",
    },
    {
      label: "Threads：德望校友公開陳述（由教育王國轉載討論）",
      url: "https://www.threads.com/share/BAWQ937y_j/",
      scope: "2026 年 9 月可檢索到一名自稱校友的負面個人陳述，提及紀律、同儕互動、心理壓力和工作量等憂慮；身份、情境與指控未獨立核實，也不能代表校方現行做法或學生整體經驗。報告只將其轉成訪校核查項，不作事實結論。",
      sourceType: "parent-discussion",
      academicYear: "2026 年 9 月公開討論；自述校友個案",
      checkedOn: "2026-10-21",
    },
    {
      label: "德望学校：2026/27 School Fee（本地及非本地费率）",
      url: "https://www.ghs.edu.hk/admission/schoolFee",
      scope: "核对 2026/27 本地生 S1–S3 HK$38,290、S4–S6 HK$49,230；非本地生分别 HK$114,516、HK$138,837；S1–S5 十期、S6 六期。非本地学费按 DSS 单位津贴每年调整。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育局通告第 13/2026 号：非本地儿童入学条件",
      url: "https://applications.edb.gov.hk/circular/upload/EDBC/EDBC26013E.pdf",
      scope: "核对 2026-07-13 通告第 3、5 段：直资等非公营学校可录取非本地儿童；持学生签证者的逗留仅适用于非公营学校，并须获入境处批准。不可单凭国籍/族裔推断学校费率类别。",
      sourceType: "government",
      academicYear: "2026-07-13 起行的通告；具体资格以入境文件与学校审核为准",
      checkedOn: "2026-10-18",
    },
    {
      label: "德望学校：2027–2028 S.1 Admission",
      url: "https://www2.ghs.edu.hk/admission",
      scope: "核对 2027/28 申请期、HK$75 申请费、材料、60/40 评核权重、面试流程、专项测试/试音日期及2026/27本地生学费；2026-10-19 官方索引仍列 11-28 与 12-05 测试日。搜索索引可读，网页直连未能完成（网页读取器返回 502，浏览器证书校验失败）。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次；2026/27 收费",
      checkedOn: "2026-10-21",
    },
    {
      label: "德望学校：New S1 Admission FAQ",
      url: "https://www2.ghs.edu.hk/admission/S1Admission/NewS1AdmissionFAQ",
      scope: "核对 S1 学额上限 246、无固定德望小学配额、面试语言、乐器要求、校巴覆盖及申请程序；未公布外校生实际名额。2026-10-18 官方索引正文复核，原站直连返回 502。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "中学概览 2025/26：德望学校",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=50",
      scope: "核对学校身份、黄大仙校址、直资天主教女校、2025/26费用、班级、教职员、课程、学生支援和交通快照；不以概览异常的核准编制栏推算师生比。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；收费为 2025/26 年费",
      checkedOn: "2026-10-17",
    },
    {
      label: "德望学校：Annual Report 2024–2025",
      url: "https://www2.ghs.edu.hk/sec_web_cms/uploads/editor/Annual%20REPORT%202024-2025_R.pdf",
      scope: "核对第 10 页 2023–2025 核心科目比例、JUPAS offer 比例及毕业去向人数；本轮按官方可读取文本核对，原 PDF 直连仍超时。年报未列逐科分母或完整 offer/注册定义，不据此计算转化率。",
      sourceType: "school-official",
      academicYear: "2024/25 年报；2023–2025 毕业去向",
      checkedOn: "2026-10-19",
    },
    {
      label: "考評局：HKDSE School Statistical Report 服務說明",
      url: "https://www.hkeaa.edu.hk/en/our_services/exam_stat/",
      scope: "核對校本統計報告包含全體表現與大學入學統計，但逐校報告只供有關學校授權人員訂購作內部參考；用以說明公開成績公告無逐校全屆分母。",
      sourceType: "government",
      checkedOn: "2026-10-18",
    },
    {
      label: "德望学校：Our achievement in HKDSE 2025",
      url: "https://www2.ghs.edu.hk/news/819/Our_achievement_in_HKDSE_2025",
      scope: "官方索引正文列 2025 届 95.2% 达 332A 门槛及 11 名学生取得六星或以上；六星不是六科均获 5**。公告未列上述比例的完整分母；原页本轮直连仍返回 502，不推算人数或录取率。",
      sourceType: "school-official",
      academicYear: "2025 HKDSE",
      checkedOn: "2026-10-19",
    },
    {
      label: "德望学校：Fee Remission Scheme",
      url: "https://www2.ghs.edu.hk/life/studentSupport/feeRemissionScheme",
      scope: "核对 2026/27 学费减免、AFI 评估及课外活动资助机制；家庭个别资格与金额由学校审核。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "德望学校：Scholarships and Awards",
      url: "https://www2.ghs.edu.hk/life/studentSupport/scholarshipsAndAwards",
      scope: "记录校方公开的奖学金和奖项入口；具体申请资格及金额以当届学校安排为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃女书院：2027/28 中一申请与当前学年学费",
      url: "https://www.dgs.edu.hk/admissions/s1-application",
      scope: "核对 2027/28 中一申请期、HKDSE 与 GCE A-Level 路线，以及网页所列当前学年本地生学费；非本地费率只适用于学生签证持有人，不把当前学费当作 2027/28 报价。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次；当前学年收费",
      checkedOn: "2026-10-18",
    },
    {
      label: "协恩中学：2026/27 学费",
      url: "https://www.hys.edu.hk/en/admission/fees/school-fees/",
      scope: "核对普通路线和中五 IAL 年费；中六 IAL 的 2027/28 确切费用未公布。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "协恩中学：课程总览",
      url: "https://www.hys.edu.hk/en/academic/curriculum/",
      scope: "核对 HKDSE 与 IAL 路线及开办节点；实际入轨和选科安排须按当届确认。",
      sourceType: "school-official",
      academicYear: "2026/27 至 2027/28 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "协恩中学：2027/28 中一申请",
      url: "https://www.hys.edu.hk/en/admission/form1admissions/",
      scope: "2026-10-19 重访核对 2026-10-10 至 10-22 网上申请期仍开放，以及 10-24 中午前亲身交件和缴费的独立步骤。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-19",
    },
  ],
"st-pauls-college-secondary": [
    {
      label: "圣保罗书院：F.1 Admissions",
      url: "https://app.spc.edu.hk/admissions/",
      scope: "通过校方招生页的官方搜索索引核对 2027/28 中一招生简介会日期为 2026-11-07、预约席位已满及会后发布简报；本轮直接打开超时，故不称为页面直连复核。正式申请规则尚未公布。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-19",
    },
    {
      label: "家校会《中学概览 2025/26》：圣保罗书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=276",
      scope: "2026-10-21 重开核对学校编号 276、般咸道校址、直资基督教男校、2025/26学费、36班、95名教师、课程、支援和交通快照；概览由学校提供及核实。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；2026/27 科目为拟开资料",
      checkedOn: "2026-10-21",
    },
    {
      label: "圣保罗书院：2025 HKDSE 与 IAL Examination Results",
      url: "https://www.spc.edu.hk/content.php?id=196&mid=228-234-267",
      scope: "核对 DSE 88.2% 门槛指标、两名六科及两名五科 5** 个案；IAL 27 名毕业生、109 个科目成绩、82 个 A* 及 97.2% A*/A 成绩。DSE 分母未列，IAL 科目比例不当作学生比例；达到课程入学要求不等于实际取录或注册。",
      sourceType: "school-official",
      academicYear: "2025 HKDSE／IAL",
      checkedOn: "2026-10-18",
    },
    {
      label: "圣保罗书院：2026 HKDSE Examination Results",
      url: "https://www.spc.edu.hk/content.php?id=213&mid=228-234-286",
      scope: "核对 2026 届平均每名学生 2.79 科达 5 级或以上、核心科平均 39.9%、全科 38.7%，以及七科 5** 一名、六科 5** 两名；页面未列全届人数及 2025 年同口径本科门槛比例。",
      sourceType: "school-official",
      academicYear: "2026 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "圣保罗书院：2026–2027 Fee Remission Calculator",
      url: "https://app.spc.edu.hk/fee_remission/index.html",
      scope: "核对 2026/27 资助计算器收入期为 2025-04-01 至 2026-03-31，资产/负债时点为 2026-03-31，并采家庭成员及月租/按揭（上限 HK$14,000）；该资料口径不等于减免获批或 2027/28 规则。",
      sourceType: "school-official",
      academicYear: "2026/27 资助申请",
      checkedOn: "2026-10-18",
    },
    {
      label: "家校会《小学概览 2026/27》：圣保罗书院小学",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=2",
      scope: "仅核对小学资料将圣保罗书院中学列为直属中学；不将直属字段解释成自动升中保证或特定优先名额。",
      sourceType: "school-profile",
      academicYear: "2026/27 小学概览",
      checkedOn: "2026-10-17",
    },
    {
      label: "HKEAA：公开 HKDSE 考试统计",
      url: "https://www.hkeaa.edu.hk/en/hkdse/assessment/exam_reports/exam_stat/",
      scope: "提供公开全港考试统计及学校统计报告说明；仅作统计制度背景，不引用未公开/内部学校级数据。",
      sourceType: "government",
      academicYear: "2025 HKDSE 公开统计",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃男书院：2027/28 中一招生",
      url: "https://www.dbs.edu.hk/index.php?m=latestnews&s=admission",
      scope: "核对 2026-10-17 至 11-17 招生文件提供期、2026-11-17 交回截止，以及校本收生安排。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男书院：2026/27 学费",
      url: "https://www.dbs.edu.hk/index.php?m=schoolfee&s=admission",
      scope: "核对本地生中一至中六 HK$65,980 年费，以及 IB 一、二年级 HK$151,180 年费；非本地生另有收费。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "英华书院：2027/28 中一招生",
      url: "https://www.yingwa.edu.hk/index.php?s=3_48",
      scope: "核对 2026-11-14 至 11-28 网上申请、60 个中一可申请学位，以及 2026/27 和 2027/28 中一 HK$27,000 年费。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次与中一学费",
      checkedOn: "2026-10-17",
    },
    {
      label: "英华书院：本地生申请",
      url: "https://www.yingwa.edu.hk/index.php?s=3_49",
      scope: "记录校方 2026/27 中五 IAL 申请入口；据此确认英华并非只提供 HKDSE，2027/28 实际 IAL 路线和费用需再问学校。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "Big Exam：圣保罗书院 Band 估算",
      url: "https://dse.bigexam.hk/en/ssp/school/276",
      scope: "第三方估算为 2026 Band 1A；网站说明 Band 为非官方估算、以学校公开 HKDSE 及升学信息为基础，且学校披露有限会影响准确度。不能作为教育局评级或独立学术评估。",
      sourceType: "third-party-estimate",
      academicYear: "2026估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港导师联会：圣保罗书院 Band 估算与 DSE 指标",
      url: "https://hktutorlink.hk/secondary-schools/st-paul-s-college-c76bfd7",
      scope: "网页标示 Band 1A（2026）及全港排名区间第 4–8；同时列校方 DSE 公布数据。其与其他网站均使用公开 DSE 数据，独立性有限，排名区间不作为稳定名次。",
      sourceType: "third-party-estimate",
      academicYear: "Band估算2026；DSE数据2025/26",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：圣保罗书院 Band 与论坛讨论",
      url: "https://www.schoolbanding.com/s/st-pauls-college",
      scope: "页面列 2026 Band 1A，并称综合 DSE、教学语言、派位和论坛讨论；权重及底层数据独立性未充分公开，只作为第三方旁证，不用其排名替代本平台评级。",
      sourceType: "third-party-estimate",
      academicYear: "2026估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：Paul boy vs LSC 家庭择校讨论",
      url: "https://www.edu-kingdom.com/forum.php?authorid=3395664&mod=viewthread&page=1&tid=3880403",
      scope: "2024 年一名择校家长描述孩子面试当日受高年级学生鼓励，作为单次申请体验线索；无法核实身份或代表性，不作现况与整体校风事实。",
      sourceType: "parent-discussion",
      academicYear: "2024讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding 论坛：培侨与圣保罗书院择校讨论",
      url: "https://www.schoolbanding.com/forum/post/230",
      scope: "2026 年 3 月公开择校串，页面列 18 条评论；意见涉及校园氛围、学术、校友传统与管理，部分基于传闻且账号身份未核实。仅转化为访校问题，不认定争议陈述为事实。",
      sourceType: "parent-discussion",
      academicYear: "2026讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "南元朗官立小学：直资中学申请资料汇总",
      url: "https://www.sylgps.edu.hk/dev/sylgps/%E7%9B%B4%E8%B3%87%E4%B8%AD%E5%AD%B8%E7%94%B3%E8%AB%8B",
      scope: "第三方学校资料汇总列圣保罗书院 2027/28 网上申请 2026-11-07 至 11-30、面试 2027-02-27；未由 SPC 当届正式招生通告确认，报告只作为待核线索。",
      sourceType: "media-report",
      academicYear: "2027/28入学轮次",
      checkedOn: "2026-10-21",
    },
  ],
"ying-wa-college-secondary": [
    {
      label: "英华书院：S.1 Admission Information and Procedures",
      url: "https://www.yingwa.edu.hk/index.php?s=3_48",
      scope: "核对 2027/28 中一申请门槛、60 个学位、申请期、申请费、面试与注册安排及 HK$27,000 学费（校方称与 2026/27 相同）；简介会预约总量 1,400 席，礼堂前 800 席、其余在校内其他场地观看直播，每家庭最多两人、先到先得。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次与学费",
      checkedOn: "2026-10-21",
    },
    {
      label: "英华书院：Local Student Applications",
      url: "https://www.yingwa.edu.hk/index.php?s=3_49",
      scope: "记录该页旧轮次的本地生申请资料和 2026/27 中五 IAL 申请入口；2027/28 中一日期应以 S.1 Admission Information and Procedures 页为准。",
      sourceType: "school-official",
      academicYear: "2026/27 入学轮次；部分旧轮次资料",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：英华书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=418",
      scope: "核对深水埗直资基督教男校身份、2025/26一般课程学费、S5 IAL学费、标为 permanent 的 HK$300 PTA 会费、全免或半免学费机制、教师/班级快照、课程、支援和交通；资料由学校提供及核实。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；IAL 首届正式 cohort 于该年入读 S5",
      checkedOn: "2026-10-18",
    },
    {
      label: "英华书院：Results of HKDSE 2025",
      url: "https://yingwa.edu.hk/school-news.php?n=792",
      scope: "核对 2025 年校方公开的高分个案；该公告没有全体考生人数或等级分布，不推算 cohort 表现。",
      sourceType: "school-official",
      academicYear: "2025 HKDSE",
      checkedOn: "2026-10-17",
    },
    {
      label: "英华书院：School Report 2024/25",
      url: "https://www.yingwa.edu.hk/listingscontent/eedafd0d93546c919c2d944b034979e0.pdf",
      scope: "核对报告第 11–12 页：2025 HKDSE 151 名应考者、86.1% 达学位最低入学要求、英文科等级指标；记录另一表 2022/23 至 2024/25 高等教育 offer 比例阈值分别超过 95%、90%、96%，未列精确值及分母；另列 S6 毕业生获学位或副学位 offer 比例 96.69%，该段未给可重算分母。不同表格对象/定义未明确，不合并指标，也不称为最终注册率。",
      sourceType: "school-official",
      academicYear: "2024/25 学年与毕业去向",
      checkedOn: "2026-10-18",
    },
    {
      label: "英华书院：2026 HKDSE",
      url: "https://www.yingwa.edu.hk/school-news.php?n=903",
      scope: "核对 2026-07-16 校方定性成绩公告及两名学生经 SNDAS 获港大 MBBS firm offer；页面未列当届全体考生人数与各科校本百分比。",
      sourceType: "school-official",
      academicYear: "2026 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育局：中学学位分配办法",
      url: "https://www.edb.gov.hk/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "提供 SSPA 制度背景及当届时间表查询入口；不替代学校自身直资申请规则。",
      sourceType: "government",
      checkedOn: "2026-10-17",
    },
    {
      label: "圣保罗书院：2027/28 中一简介会",
      url: "https://app.spc.edu.hk/admissions/",
      scope: "核对 2026-11-07 简介会及预约已满状态；正式 2027/28 申请安排仍待校方公布。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：圣保罗书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=276",
      scope: "核对圣保罗书院 HKDSE／IAL 路线及 2025/26 HK$44,000 年费；不当作 2027/28 报价。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "拔萃男书院：2027/28 中一招生",
      url: "https://www.dbs.edu.hk/index.php?m=latestnews&s=admission",
      scope: "核对 2026-11-17 交回申请截止与独立甄选流程。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "拔萃男书院：2026/27 学费",
      url: "https://www.dbs.edu.hk/index.php?m=schoolfee&s=admission",
      scope: "核对本地生中一至中六 HK$65,980 和 IB 一、二年级 HK$151,180 年费。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "Big Exam：英华书院 DSE 与 Band 估算（2025）",
      url: "https://dse.bigexam.hk/en/ssp/school/418",
      scope: "第三方按学校公开 HKDSE 与升学资料估为 Band 1B–1A；非官方估算，原站亦说明其估算受资料完整度与主观因素影响。",
      sourceType: "third-party-estimate",
      academicYear: "2025 HKDSE 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：英华书院学校页（2026）",
      url: "https://schoolbanding.com/s/ying-wa-college",
      scope: "列 Band 1B–1A 与英文授课指标；排名方法说明将 DSE、科目分布和英文指数综合计算，但不能证明与 Big Exam 使用独立底层资料；页面对教育局学生 Band 与学校 Band 的说法亦须谨慎理解。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港导师联会：英华书院 Band 估算（2025）",
      url: "https://hktutorlink.hk/secondary-schools/en/ying-wa-college-d3ce8e3",
      scope: "估算为 Band 1B–1A；其年份序列和 DSE 指标与 Big Exam 高度重合，作为同一方向的第三方参考，不视为独立统计验证。",
      sourceType: "third-party-estimate",
      academicYear: "2025 HKDSE 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "TOPick：英华书院校长访谈与上一轮中一申请资料",
      url: "https://topick.hket.com/article/4040313/?mtc=40001&srkw=DSE",
      scope: "报道上一轮约 2,200 份申请及约 80 个对外申请学位的媒体口径，并转述上一轮面试形式；仅供历史竞争与准备方式参考，不能外推到 2027/28。",
      sourceType: "media-report",
      academicYear: "2026/27 入学轮次报道；2025-11",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：英华 VS 保良局第一张永庆（2024-04）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3880489",
      scope: "匿名家长讨论对课外活动、乐团、师兄支援与学习节奏有不同个人描述；身份及代表性无法核实，只作为到访提问线索。",
      sourceType: "parent-discussion",
      academicYear: "2024 讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：英华书院升中讨论（2014-11）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2938871",
      scope: "历史匿名留言呈现家长对校园归属、活动及自理的个人看法；讨论中亦见招生制度误解，故只作历史背景，不作为现行规则或口碑共识。",
      sourceType: "parent-discussion",
      academicYear: "2014 讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "香港考评局：2024 HKDSE 本科入学门槛统计定义",
      url: "https://data.gov.hk/en-data/dataset/hkeaa-hkdesstat-result-table3-2024/resource/1fb40455-895a-49c9-9770-970343d9cdc9",
      scope: "经政府开放数据发布的考评局统计资料；核对 332A 核心科和两科选修科 Level 2+ 的统计口径。",
      sourceType: "exam-authority",
      academicYear: "2024 HKDSE 统计口径",
      checkedOn: "2026-10-21",
    },
  ],
"logos-academy-secondary": [
    {
      label: "真道书院：Secondary 1 (DS4)",
      url: "https://www.logosacademy.edu.hk/en/node/109",
      scope: "页面并列列出 2026/27 DS4 插班（2027年1月入学）与 2027/28 DS4 新生（2027年9月入学）；核对各轮资格、相同申请期、HK$75 不退还申请费、面试及结果日期、当前学费与资助入口；未公布 2027/28 新生外校申请名额。",
      sourceType: "school-official",
      academicYear: "2026/27 插班及 2027/28 新生；当前学费为页面当期列值",
      checkedOn: "2026-10-19",
    },
    {
      label: "真道书院：Admission Information",
      url: "https://www.logosacademy.edu.hk/en/node/114",
      scope: "分别核对 2027/28 S1(DS4)新生与 2026/27 S1-S4(DS4-MS2)插班轮次；两轮申请期同为 2026-10-13 09:00 至 2026-11-12 09:00，但入学时间分别为 2027-09 与 2027年1月，面试安排亦不同。",
      sourceType: "school-official",
      academicYear: "2026/27 插班及 2027/28 新生",
      checkedOn: "2026-10-19",
    },
    {
      label: "真道书院：DS4 Admission Criteria",
      url: "https://www.logosacademy.edu.hk/en/admission-criteria-development-stage-four-secondary-one",
      scope: "核对通常两阶段面试、第一阶段筛选、学生与家长面试考虑项目及表现接近时对在校兄弟姊妹的考虑；不推断评分权重。",
      sourceType: "school-official",
      academicYear: "现行招生准则；轮次须结合 2027/28 招生通知",
      checkedOn: "2026-10-19",
    },
    {
      label: "真道书院：2026–2027 School Fee",
      url: "https://www.logosacademy.edu.hk/index.php/tc/school-fee",
      scope: "核对 2026/27 DSE HK$32,300、IBDP HK$83,680：DS4–MS3 分十期，MS4 分七期；校方脚注承诺 2026/27 MS3 升至 2027/28 MS4 时同路线全年费率不变，不外推至其他 2027/28 新生年级。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "中学概览 2025/26：香港华人基督教联会真道书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=371",
      scope: "核对西贡区直资男女校、11年贯通教育、2025/26班级/全校教师人数/收费、课程/支援/交通；“外校学位取决于空缺”描述适用于该概览注明的 2026 入学轮次，不当作 2027/28 名额。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生备注标示适用于 2026 年 9 月入学",
      checkedOn: "2026-10-17",
    },
    {
      label: "真道书院：2026 HKDSE Examination Results",
      url: "https://www.logosacademy.edu.hk/en/news/2026-hkdse-examination-results",
      scope: "引用校方公布的各科 Level 3+ 或公民科 Attained 比例及最佳六科最高分；页面未列逐科人数或完整 cohort 分母，不反推人数或录取率。",
      sourceType: "school-official",
      academicYear: "2026 HKDSE",
      checkedOn: "2026-10-19",
    },
    {
      label: "真道书院：May 2026 IB Examination Results",
      url: "https://www.logosacademy.edu.hk/index.php/en/news/ib-examination-results-1",
      scope: "核对第十四届 37 人 cohort、通过率与双语文凭率 100%、均分 40.7 及各分数段比例；校方说明百分比四舍五入至最近 1%。",
      sourceType: "school-official",
      academicYear: "May 2026 IBDP",
      checkedOn: "2026-10-17",
    },
    {
      label: "真道书院：IB Curriculum",
      url: "https://www.logosacademy.edu.hk/en/ib-curriculum",
      scope: "核对 IBDP 两年制、核心部分、六科及三 HL/三 SL 要求与校方列出的科目；年度实际开班仍须确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "国际文凭组织：Diploma Programme curriculum",
      url: "https://ibo.org/programmes/diploma-programme/curriculum/",
      scope: "核对 TOK、Extended Essay、CAS、六科以及 HL/SL 的课程定义；真道当届实际可选科目仍以学校开班安排为准。",
      sourceType: "exam-authority",
      checkedOn: "2026-10-21",
    },
    {
      label: "真道书院：Graduate Articulation Overview",
      url: "https://www.logosacademy.edu.hk/en/graduate-articulation-overview",
      scope: "仅记录学校公开的历届曾入读大学/学科示例；页面没有各届人数、offer 或最终注册比例。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "真道书院：Fee Remission Scheme",
      url: "https://www.logosacademy.edu.hk/en/fee-remission-scheme",
      scope: "核对校方现行学费减免申请入口、2026/27 指引及纸本／电子提交方式；家庭资格及减免比例需按当届指引审核。旧 /en/admission/fee-remission-scheme 路径已失效。",
      sourceType: "school-official",
      academicYear: "2026/27 学年计划入口",
      checkedOn: "2026-10-18",
    },
    {
      label: "启思中学：2027/28 F1 招生",
      url: "https://www.css.edu.hk/admissions",
      scope: "核对 2027/28 中一首阶段申请开放状态；可读页面未列可靠截止日，不自行填写日期。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "启思中学：课程总览",
      url: "https://www.css.edu.hk/academics",
      scope: "核对 F1–F3 IB MYP 框架、F4 HKDSE 及 F5–F6 IBDP 选项；实际选拔条件另问校方。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "启思中学：2026/27 学费",
      url: "https://www.css.edu.hk/school-fee?lang=zh",
      scope: "核对校方标示已获教育局批核的 2026/27 收费页及本地/非本地学生定义；该页金额表为图像，具体金额另以教育局同年度《收费证明书》逐年级核对。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "教育局《收费证明书》：启思中学 2026/27 学年",
      url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/564419.pdf",
      scope: "核对 2026-09-01 生效的 2026/27 教育局批准课程总收费：本地与非本地 F1–F6 年费，以及 F5/F6 HKDSE 与 IBDP 路线差异和缴费期数。金额不外推至 2027/28；本地/非本地身份定义另见校方收费页。",
      sourceType: "government",
      academicYear: "2026/27 学年；2026-09-01 生效",
      checkedOn: "2026-10-19",
    },
    {
      label: "港大同学会书院：2027/28 S1 申请",
      url: "https://www.hkugac.edu.hk/engage/as-a-student/application-guidelines",
      scope: "核对 2026-11-13 10:00 至 12-14 23:59 网上申请及当前学年中一费用说明。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "港大同学会书院：2026/27 学费",
      url: "https://www.hkugac.edu.hk/engage/as-a-student/school-fees",
      scope: "核对 S1–S3 年费 HK$48,450、S4–S6 年费 HK$51,265；IAL 是否有另项收费未核实。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "港大同学会书院：IAL 课程",
      url: "https://hkugac.edu.hk/nurture/quest-for-truth/the-quest/my-alternative-curriculum",
      scope: "核对 S5 起可选 HKDSE 或 Pearson Edexcel IAL；实际入轨、科目及费用须按当届文件确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    { label: "班長幫：2026 中學 DSE 排名及真道 Band 估算", url: "https://hkdse.banzhang.org/", scope: "列 Band 2A–1C；估算跟 DSE 指標並列，不能作为教育局分类或包含 IBDP 全 cohort 的综合评级。", sourceType: "third-party-estimate", academicYear: "2026 DSE估算", checkedOn: "2026-10-21" },
    { label: "SchoolDays：真道书院 Band 估算及方法说明", url: "https://www.schooldays.com.hk/secondary/%E9%A6%99%E6%B8%AF%E8%8F%AF%E4%BA%BA%E5%9F%BA%E7%9D%A3%E6%95%99%E8%81%AF%E6%9C%83%E7%9C%9F%E9%81%93%E6%9B%B8%E9%99%A2", scope: "列 Band 1A，并称估算依教学语言与学位三等分推算；非官方，方法与 DSE 成绩型网站不同。", sourceType: "third-party-estimate", academicYear: "第三方估算", checkedOn: "2026-10-21" },
    { label: "Big Exam：真道书院 DSE 与 Band 估算（2026）", url: "https://dse.bigexam.hk/zh-hk/ssp/school/371", scope: "第三方估算列 Band 1C，基于公开 DSE 与升学资料；不覆盖 IB 学生的完整表现。", sourceType: "third-party-estimate", academicYear: "2026 DSE估算", checkedOn: "2026-10-21" },
    { label: "Charabox：真道书院学校资料", url: "https://charabox.com/en/hong-kong-school/secondary-school/hkcccu-logos-academy/", scope: "列 Band 1，未清楚交代可复核的分级方法；只作差异观察，不作为评级依据。", sourceType: "third-party-estimate", academicYear: "第三方资料页", checkedOn: "2026-10-21" },
    { label: "教育王国：真道 IB 与 DSE 课程体验讨论（2015）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3094096", scope: "匿名用户对探究式课程、补底和考试准备有不同看法；历史意见，不代表当前整体体验。", sourceType: "parent-discussion", academicYear: "2015年讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：真道 MS1 插班 2023/24 讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3879127", scope: "仅两条与面试通知相关的短留言；只能说明个别申请者等待通知，不能推算取录难度。", sourceType: "parent-discussion", academicYear: "2023年讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：真道、播道、陆庆涛择校讨论（约 2025）", url: "https://www.edu-kingdom.com/forum.php?extra=&mod=viewthread&ordertype=1&tid=3885266", scope: "家长对真道 DSE/IB 结果与坊间 Band 可比性有分歧；属于择校意见，不是独立成绩验证。", sourceType: "parent-discussion", academicYear: "约2025年讨论", checkedOn: "2026-10-21" },
  ],
"plk-ngan-po-ling-college-secondary": [
    {
      label: "颜宝铃书院：F.1 Admission 2027–2028",
      url: "https://www.npl.edu.hk/en/site/view?name=F.1+Admission",
      scope: "核对 2026-11-16 09:00 至 12-24 23:59 网上申请、11-21 开放日、评分权重、2027/28 中一申请者的全额/半额减免资格说明，以及历史 2025/26 学额和申请数；资格说明不代表个别申请获批，历史数字不当作 2027/28 名额或录取率。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次；2025/26 成就摘要另行注明",
      checkedOn: "2026-10-18",
    },
    {
      label: "中学概览 2025/26：保良局颜宝铃书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=18",
      scope: "核对九龙城直资男女校、地址、2025/26 班级/师资/课程/设施/收费及支援；该年度招生备注适用于 2026 年 9 月，不外推当届学额。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "颜宝铃书院：F.4 BYP / F.5 IB Admission",
      url: "https://www.npl.edu.hk/en/site/view?name=F.4-F.5+IB+Admission",
      scope: "核对 2027/28 中四 BYP 于 2027 年 3 月、中五 IB 于 5 月预计开放外部申请；细则和学额未公布。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "颜宝铃书院：IBDP Overview",
      url: "https://www.npl.edu.hk/en/site/view?name=IBDP+Overview",
      scope: "核对 BYP 与 IBDP 衔接、六科三 HL/三 SL、TOK/EE/CAS、科目列表与部分语言科资格限制；实际开班仍须逐年确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "颜宝铃书院：2026/27 学费与减免",
      url: "https://www.npl.edu.hk/en/site/view?name=Scheme",
      scope: "核对本地路线年费 HK$35,900、IBDP 年费 HK$98,400、缴费期数及减免计划；BYP 具体收费类别与 2027/28 费率仍须确认。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "颜宝铃书院：2026 HKDSE and IELTS Results",
      url: "https://www.npl.edu.hk/en/site/view?name=DSE+IELTS+Result",
      scope: "2026 成绩图片入口；报告所引可读文字摘要来自 F.1 Admission 成就栏目，完整考生分母未公开。该招生页高分个案英文写两科 5*、中文写两科 5，报告暂不采用。",
      sourceType: "school-official",
      academicYear: "2026 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "颜宝铃书院：2026 IBDP Results and News",
      url: "https://www.npl.edu.hk/en/site/view?name=News+%26+Events",
      scope: "核对 2026 IB 均分 41.7、结果表 40 分或以上 78.3%、文凭获授率 100%、大学 offer 摘要；新闻正文 over 40 与表格不一致，报告按表格口径；页面未明确列 2026 考生人数。",
      sourceType: "school-official",
      academicYear: "2026 IBDP 与毕业去向",
      checkedOn: "2026-10-18",
    },
    {
      label: "颜宝铃书院：JUPAS Result Release 2026",
      url: "https://www.npl.edu.hk/en/site/view?name=JUPAS+Result",
      scope: "校方 JUPAS 2026 图片入口；F.1 Admission 文字摘要称连同 SNDAS 约 84% 本地课程毕业生获本地学位 offer，未列完整分母。",
      sourceType: "school-official",
      academicYear: "2026 JUPAS/SNDAS",
      checkedOn: "2026-10-18",
    },
    {
      label: "真道书院：2027/28 中一招生",
      url: "https://www.logosacademy.edu.hk/en/node/114",
      scope: "核对 DS4 申请至 2026-11-12 09:00 截止及面试安排；外校生实际可申请学额未公布。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-19",
    },
    {
      label: "真道书院：2026/27 学费",
      url: "https://www.logosacademy.edu.hk/en/node/115",
      scope: "核对 2026/27 对应 DS／MS 年级的 HKDSE 与 IBDP 路线费用；学制与颜宝铃普通中学年级不同。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "启思中学：2027/28 中一招生",
      url: "https://www.css.edu.hk/admissions",
      scope: "核对 F1 首阶段申请开放状态；具体截止须查当届网申系统。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "启思中学：课程总览",
      url: "https://www.css.edu.hk/academics",
      scope: "核对 F1–F3 IB MYP 框架、F4 HKDSE 及 F5–F6 IBDP 选项；进入 IBDP 的校内选择规则另核。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "启思中学：2026/27 学费",
      url: "https://www.css.edu.hk/school-fee?lang=zh",
      scope: "记录校方 2026/27 收费页；图像表格金额未在本稿可靠转录，具体费用须核原表。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    { label: "Big Exam：颜宝铃书院 Band 估算（2025 DSE）", url: "https://dse.bigexam.hk/zh-cn/ssp/school/18", scope: "列出以校方公开 DSE 数据推算的非官方 Band 1B 估计；不是教育局学校分级，不能代表同时设 IBDP 路线的全校综合表现。", sourceType: "third-party-estimate", academicYear: "2025 DSE", checkedOn: "2026-10-21" },
    { label: "SchoolBanding：颜宝铃书院 Band 估算（2026）", url: "https://schoolbanding.com/s/po-leung-kuk-ngan-po-ling-college", scope: "学校页列 Band 1B 估值；网站方法及底层数据独立性未验证，仅作为坊间估值对照。", sourceType: "third-party-estimate", academicYear: "2026 页面", checkedOn: "2026-10-21" },
    { label: "教育王国：颜宝铃校园参观讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2942176", scope: "2014 年匿名参观者对学生主持活动、课室值勤与教师在场的观察；仅作开放日问题线索，不代表当前安排或整体口碑。", sourceType: "parent-discussion", academicYear: "2014 年讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：颜宝铃校风与课程提问", url: "https://www.edu-kingdom.com/forum.php?extra=&mod=viewthread&tid=3820653", scope: "2020 年家长提问涉及普通话中文教学、校风与课程；留言样本不足以代表现况，需以当届校方资料核实。", sourceType: "parent-discussion", academicYear: "2020 年讨论", checkedOn: "2026-10-21" },
    { label: "香港学校指南：颜宝铃论坛意见汇整", url: "https://hkschool.top/schools/524?lang=s", scope: "二次整理 2009–2026 年家长论坛讨论；含功课量、校风、语言及课后补课等意见摘要，未逐条验证留言身份与代表性，只作线索。", sourceType: "media-report", academicYear: "2009–2026 汇整", checkedOn: "2026-10-21" },
    { label: "颜宝铃书院：NPL Career Day 2026", url: "https://www.npl.edu.hk/en/photoAlbums/view?id=309&year=2026", scope: "核校方 2026-09-15 报道：11 所本地及海外大学参加大学展；另有 9 名大学代表于生命教育课分享招生程序及课程更新。两组数字对象不同，不推断全体学生参与、年度规模或录取结果。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },

  ],
"gsis-secondary": [
    {
      label: "GSIS 官方首页：学校规模、两学部及 2026 结果",
      url: "https://www.gsis.edu.hk/en/",
      scope: "核对学校中文名、两条课程出口、全校约 1,380 人，以及更正后 2026 IB／DIA 结果摘要；全校规模不作为中学录取分母。",
      sourceType: "school-official",
      academicYear: "2026 考试年；网站现况",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：How to Apply",
      url: "https://www.gsis.edu.hk/en/admissions/how-to-apply",
      scope: "核对全年申请、HK$3,700 中学申请费、评估流程、录取优先顺序、签证要求、校车及入学后不支持转换学部；另收评估费以 2026/27 正式条款为准。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "GSIS：2027/28 Application Status Quo",
      url: "https://gsis-r2.parallel-technology.com/prod/Application-Status-Quo_xKKhIDdWt4.pdf",
      scope: "校方 2026-09-01 状态快照，核对 GIS K05–K11（K12 不收）及 EIS 各年级 Open、Priority Holders only 或 Not accepted；状态可变。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；2026-09-01 更新",
      checkedOn: "2026-10-19",
    },
    {
      label: "GSIS：2027/28 EIS Assessment Schedule",
      url: "https://gsis-r2.parallel-technology.com/prod/EIS-Assessment-Schedule_XUGyWd3Bjc.pdf",
      scope: "校方 2026-08-25 日程，核对获邀 Y07、Y08–Y10、Y12 申请者的计划评估日期；申请不保证获评估邀请。",
      sourceType: "school-official",
      academicYear: "2027/28 入学；2026-08-25 更新",
      checkedOn: "2026-10-19",
    },
    {
      label: "GSIS：German International Stream Secondary",
      url: "https://www.gsis.edu.hk/en/academics/german-international-stream/secondary/",
      scope: "核对德英双语课程、第二外语、11–12 岁 Fast Track、ZKA／MSA 与 DIA 出口；实际入学年级和学额另确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：English International Stream Secondary",
      url: "https://www.gsis.edu.hk/en/academics/english-international-stream/secondary/",
      scope: "核对 Y07–Y09、Y10–Y11 IGCSE、Y12–Y13 IBDP 课程阶段与学科教学框架。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：EIS IGCSE",
      url: "https://www.gsis.edu.hk/en/academics/english-international-stream/secondary/IGCSE",
      scope: "核对公开 IGCSE 必修、选修和 Cambridge／Pearson 考试机构；科目清单不等于当届保证开班。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：EIS International Baccalaureate",
      url: "https://www.gsis.edu.hk/en/academics/english-international-stream/secondary/IB",
      scope: "核对 IB 六科、HL／SL 和 TOK／EE／CAS 结构与公开科目清单；实际组合须向学校确认。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：Fees & Debenture",
      url: "https://www.gsis.edu.hk/en/admissions/fees-and-debenture?section=debenture-and-capital-levy",
      scope: "当前网页动态表格列低／高年级中学 HK$251,300／HK$265,700、标准可退债券 HK$800,000、注册费及不含项目；页面本身未标适用学年，年份按校方 2026/27 正式 PDF 核定。",
      sourceType: "school-official",
      academicYear: "网页未明示适用学年；2026/27 正式条款另核",
      checkedOn: "2026-10-19",
    },
    {
      label: "GSIS：Admissions and Enrolment Information 2026–2027",
      url: "https://gsis-r2.parallel-technology.com/prod/ENG-School-Fees-and-Withdrawal-Terms-and-Conditions.pdf",
      scope: "校方正式 PDF 第 1 页明确中学申请费 HK$3,700、获安排评估后另缴 HK$4,300、2026/27 各年级学费及首年不提供学费减免；第 2–3 页列标准与发展债券、年度资本征费、提前退学和退款条件。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "GSIS：2026 IBDP 与 Abitur 更正后成绩",
      url: "https://www.gsis.edu.hk/de/school-life/news-and-events/news/6a9f76ee1f5fba6ff8941333",
      scope: "核对更正后 EIS IB 63 人、13 名满分、均分 42、全部获文凭及 GIS DIA 7 人、均分 1.79；两考试不直接比较。",
      sourceType: "school-official",
      academicYear: "2026 毕业考试",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：Celebrating IGCSE Success（2026）",
      url: "https://www.gsis.edu.hk/en/school-life/news-and-events/news/6a8cea7f1f5fba6ff8908a59",
      scope: "校方单篇新闻公布 2026 I/GCSE 结果：70 名 Year 11 学生、702 个成绩项、19 科；91% 为 A*/A 或相应 9/8/7，70% 为 A*/9/8；另有 64 名 Year 9–10 提前应考 German IGCSE 学生全部取得 A*。成绩百分比按 grades 成绩项口径，不换算成学生比例。",
      sourceType: "school-official",
      academicYear: "2026 I/GCSE 考试季；校方官网单篇新闻",
      checkedOn: "2026-10-19",
    },
    {
      label: "GSIS：Holistic Support",
      url: "https://www.gsis.edu.hk/en/academics/holistic-support?section=student-support",
      scope: "核对学习、福祉、大学／职业辅导的校方栏目；具体个案服务与容量未公开。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "汉基国际学校：课程总览",
      url: "https://www.cis.edu.hk/academics/overview",
      scope: "核对 Year 7–9 IB MYP、Year 10–11 校本课程与杭州年、Year 12–13 IBDP；与德瑞 GIS DIA 不同。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "汉基国际学校：Year 7–13 招生",
      url: "https://www.cis.edu.hk/admissions/admissions-process/secondary",
      scope: "核对 2027/28 Year 7–13 申请及建议时点；年级关闭随学额变化。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "汉基国际学校：2026/27 学费与资本征费",
      url: "https://www.cis.edu.hk/admissions/school-fees",
      scope: "核 2025/26 起入学者年度资本征费 HK$30,200、HK$150,000 留位款及抵扣条款；逐级学费数额未在本稿可靠取得。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "加拿大国际学校：2027/28 申请",
      url: "https://www.cdnis.edu.hk/en/admissions/key-dates/",
      scope: "核 2027/28 Grade 6–11 申请截至 2026-12-31；Grade 12 等其他年级另按当届条件确认，不把期限外推。",
      sourceType: "school-official",
      academicYear: "2027/28 入学轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "加拿大国际学校：2026/27 学费",
      url: "https://www.cdnis.edu.hk/admissions/tuition-fees",
      scope: "核 Grade 6–8、9–10、11–12 年费，已含项目、新生费用及资本安排；2027/28 收费另待公告。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "GSIS：2026 东亚运动会代表队消息",
      url: "https://www.gsis.edu.hk/en/school-life/news-and-events/news/69f1bb2d0ea3af786418c44e",
      scope: "核对校方单篇新闻：GSIS 代表队参加校方所称 2026 年 East Asia Games，获团队总排名第四；只代表参赛队表现，不外推为全校参与或常设机会。",
      sourceType: "school-official",
      academicYear: "2026 年赛事",
      checkedOn: "2026-10-19",
    },

    {
      label: "GeoExpat：Request GSIS feedback（匿名讨论）",
      url: "https://geoexpat.com/forum/71/thread361699.html",
      scope: "2021 年匿名讨论对 English Stream 的学术取向、教师、入学难度、家长竞争感和文化体验有不同意见；讨论年代较早、身份未核实，只作家长核校线索，不代表现届家庭共识。",
      sourceType: "parent-discussion",
      academicYear: "2021-09 讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "Reddit：What is like to study GSIS & CIS in Hong Kong?",
      url: "https://www.reddit.com/r/HongKong/comments/1osjwxo/what_is_like_to_study_gsis_cis_in_hong_kong/",
      scope: "2025 年讨论含自称现读 GSIS 学生与校友个别意见，涉及年级压力差异、活动、教师体验及粤语；匿名身份与代表性无法独立核实，不把个案推为全校日常事实。",
      sourceType: "parent-discussion",
      academicYear: "2025-11 讨论；留言更新至 2026-04",
      checkedOn: "2026-10-21",
    },


  ],
"munsang-college-secondary": [
    {
      label: "民生書院中學：2025 HKDSE 成績原圖",
      url: "https://www.munsang.edu.hk/secondary/attachment/upload/files/HKDSE_2025.jpg",
      scope: "核對 2025 屆英文、中文及數學必修各 131 名應考者的 Level 5+／Level 4+ 比例，以及視藝 7 人的例子；原圖標示截至 2025-08-13。僅與 2026 屆同科口徑並列，不推作同一學生進步或教學增值。",
      sourceType: "school-official",
      academicYear: "2025 HKDSE；截至 2025-08-13",
      checkedOn: "2026-10-19",
    },
    {
      label: "民生書院中學：Bring-Your-Own-Device Programme",
      url: "https://www.munsang.edu.hk/secondary/byod.php",
      scope: "核對校方公開 BYOD 規則：學生每日攜帶已充電裝置；頁面 FAQ 稱課堂使用 iPad 須使用校方購買裝置。頁面未標明適用學年、現屆新生規格或購置價，僅據此提醒家長核實設備與費用，不外推為 2026/27 新生已確認條款。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "民生书院中学：2026–2027 School Event Gallery",
      url: "https://www.munsang.edu.hk/secondary/gallery.php",
      scope: "核对 2026–2027 相册目录列有水运会、学生领袖就职礼等活动；目录本身不说明所有学生参与、名额或选拔规则。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "民生书院中学：2026/27 Swimming Gala 相册",
      url: "https://www.munsang.edu.hk/secondary/gallery_detail.php?id=402",
      scope: "核对水运会属于 2026–2027 学年活动；相册标题未提供参加范围或普及率。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "家校会《中学概览 2025/26》：民生书院（九龙城）",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=219",
      scope: "核对九龙城民生书院身份、资助类别、2025/26 收费、课程、旧轮次 DP 权重和学生支援；概览列有 2026/27 拟开科目与支援机制，不视作新学年服务保证；与港岛民生书院区分。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生栏目适用于 2026 年 9 月入学",
      checkedOn: "2026-10-19",
    },
    {
      label: "教育局：2025/2027 中学学位分配办法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027 年 1 月 4–18 日 DP 申请、3 月 31 日正取通知及 7 月 6 日派位结果；校本细则另待民生书院公布。",
      sourceType: "government",
      academicYear: "2025/2027 派位周期；2027 年 9 月入学",
      checkedOn: "2026-10-18",
    },
    {
      label: "民生书院中学：F.1 Admission",
      url: "https://www.munsang.edu.hk/secondary/f1_admission.php",
      scope: "中一申请官方入口；2026-10-19 重开时仍未见 2027/28 常规 DP 独立学额和权重公告，现页主要显示派位结果后的申请 iframe。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "民生书院中学：2025–2026 HKDSE Result",
      url: "https://www.munsang.edu.hk/secondary/hkdse.php",
      scope: "学校逐年成绩图片入口；2025 与 2026 分别以当届官方原图为准，不以第三方排名替代，也不混合两届分母。",
      sourceType: "school-official",
      academicYear: "2025、2026 HKDSE",
      checkedOn: "2026-10-19",
    },
    {
      label: "民生书院中学：2026 HKDSE 成绩原图",
      url: "https://www.munsang.edu.hk/secondary/attachment/upload/files/HKDSE%202026%20Exam%20Result.jpg",
      scope: "2026-10-19 已在浏览器直接放大目视核对原图全部 14 个等级制科目的应考人数、Level 5+ 和 Level 4+；图片标注结果截至 2026-08-14。各科分母不可相加，也不能推作大学升学率。",
      sourceType: "school-official",
      academicYear: "2026 HKDSE；截至 2026-08-14",
      checkedOn: "2026-10-19",
    },
    {
      label: "民生书院中学：2026/27 Curriculum Structure",
      url: "https://www.munsang.edu.hk/secondary/curriculum.php",
      scope: "核对 F1–F6 课程结构与数学延伸 M1／M2 选项；当届开科和选修组合需确认。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "民生书院中学：Senior Secondary Curriculum",
      url: "https://www.munsang.edu.hk/secondary/nss.php",
      scope: "核对 HKDSE 高中核心科、选修科及其他学习经历；不能保证每个组合当届均开班。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "民生书院：历史 2025/26 DP 文件",
      url: "https://www.munsang.edu.hk/secondary/pdf/info_for_public/Admission/S1_DP_Application_Procedure_2024_25.pdf",
      scope: "历史轮次列 54 个自行分配学额，明确不作为 2027 年学额或申请程序。",
      sourceType: "school-official",
      academicYear: "2025/26 中一入学历史轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：迦密中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=148",
      scope: "核对九龙城区资助男女校、科目教学语言、2025/26 收费及旧轮次 DP／统一派位说明；不外推评分权重。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生栏目适用于 2026 年入学",
      checkedOn: "2026-10-17",
    },
    {
      label: "中学概览 2025/26：基道中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=441",
      scope: "核对九龙城区资助男女校、按班别／组别教学语言、2025/26 收费及旧轮次派位说明；不外推校本规则。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生栏目适用于 2026 年入学",
      checkedOn: "2026-10-17",
    },
    { label: "HK Tutor Link：民生書院 2025/26 學校資料與 Band 估算", url: "https://hktutorlink.hk/secondary-schools/en/munsang-college-17be715", scope: "第三方估算列 2025 Band 1A；網站說明估算採公開 DSE 等資料，非教育局 Band 或官方排名。與另一估算出現 1B 差異，因此報告只下 Band 1 範圍、細分未定的判斷。", sourceType: "third-party-estimate", academicYear: "2025/26 estimate; checked 2026-10-21", checkedOn: "2026-10-21" },
    { label: "P1Tracker：Munsang College Banding estimate", url: "https://s1.p1tracker.com/en/school/munsang-college/", scope: "第三方頁面將 2026 估算列為 Band 1B；非官方算法，與其他平台的 Band 1A 估算不同，僅用來證明細分存在分歧。", sourceType: "third-party-estimate", academicYear: "2025/26 estimate; checked 2026-10-21", checkedOn: "2026-10-21" },
    { label: "教育王國：民生書院交流（匿名家庭討論，2011–12）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2322299", scope: "匿名自述家長／家庭經驗提到功課與測驗節奏、英文適應及校園歸屬感；只作歷史問題線索，不代表現屆或全體。", sourceType: "parent-discussion", academicYear: "2011-2020 forum posts", checkedOn: "2026-10-21" },
    { label: "教育王國：有冇民生書院（中學）分享（2016）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3209726", scope: "討論串曾將港島民生與九龍城民生混淆並由參與者更正；報告不採納誤指另一校的評價，只呈現辨識口碑的限制。", sourceType: "parent-discussion", academicYear: "2011-2020 forum posts", checkedOn: "2026-10-21" },
    { label: "教育王國：九龍城區民生小升民中討論（2017）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3421558", scope: "匿名家庭討論舊年度附小升中去向和分母；包含未核實轉述及用戶推算，只用來標示家長疑問，不作升中比例證據。", sourceType: "parent-discussion", academicYear: "2011-2020 forum posts", checkedOn: "2026-10-21" },
    { label: "教育王國：民生中學自行收生與附小升中討論（2020）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3808545", scope: "匿名討論附小家庭是否申請本校及自行學位安排；屬歷史擇校議題，留言不能代替當屆學校規則或實際統計。", sourceType: "parent-discussion", academicYear: "2011-2020 forum posts", checkedOn: "2026-10-21" },
  ],
"queen-elizabeth-school-secondary": [
    {
      label: "家校会《中学概览 2025/26》：伊利沙伯中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=413",
      scope: "核对官立男女校身份、2025/26 收费、学科、支援与旧轮次收生；与旧生会中学区分。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生栏目适用于 2026 年入学",
      checkedOn: "2026-10-17",
    },
    {
      label: "教育局：2025/2027 中学学位分配办法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027 年 DP、正取通知、CA、派位及注册日期。",
      sourceType: "government",
      academicYear: "2025/2027 派位周期",
      checkedOn: "2026-10-17",
    },
    {
      label: "伊利沙伯中学：2027/28 中一入学",
      url: "https://www.qes.edu.hk/Menu/admission/s1_admission/27-28/s1_admission_2728.html",
      scope: "学校当届入口及资讯日；页面预告 2026-10-29 10:00 开放登记，两场各 800 座位、每位最多 3 个座位，成功登记家庭预计 11-23 至 11-25 收到电邮；截至 2026-10-21 尚未开放。旧 FAQ 链接不代表当届校本规则已发布。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "伊利沙伯中学：2026/27 DP 申请须知",
      url: "https://www.qes.edu.hk/Menu/admission/s1_admission/26-27/application_guideline.pdf",
      scope: "历史 43 个学额、40/20/40、材料与面试；不得外推到 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "伊利沙伯中学：2026/27 中一入学 FAQ",
      url: "https://www.qes.edu.hk/Menu/admission/s1_admission/26-27/faq_c_2627.pdf",
      scope: "历史申请约数、面试形式、衔接、午膳与校内活动。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "伊利沙伯中学：2026/27 高中选科资讯",
      url: "https://www.qes.edu.hk/Menu/academic/nss/ss_2627/SS%20Subject%20Selection%20Info%202026-27.pdf",
      scope: "核对三个选修组、选科编配因素、至少 10 人开班与 36 人上限。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "伊利沙伯中学：2026 HKDSE／JUPAS／SNDAS 结果",
      url: "https://www.qes.edu.hk/Menu/academic/hkdse_jupas/hkdse_stat/2026/2026_statistics_20260812.pdf",
      scope: "核对 115 名考生、甲类各科及数学延伸模块的独立分母与成绩比例、丙类日语／法语小样本结果、跨科成绩项比例及 92 名有学位 offer 学生；原表把 88.7% 称为‘33222 in Core Subjects and 1 Elective’，不与现行 332A+2 一般要求混算；offer 不等于最终注册。",
      sourceType: "school-official",
      academicYear: "2026 届；统计日期 2026-08-12",
      checkedOn: "2026-10-19",
    },
    {
      label: "伊利沙伯中学：2025 HKDSE／JUPAS／SNDAS 更新版结果",
      url: "https://www.qes.edu.hk/Menu/academic/hkdse_jupas/hkdse_stat/2025/2025_statistics_20251128.pdf",
      scope: "核对 116 名考生、33222 指标、全体等级制科目成绩项及 101／116 人有学位 offer 的历史快照；与 2026 年 8 月版并列时须注明统计时点不同，不推断最终注册或教学增值。",
      sourceType: "school-official",
      academicYear: "2025 届；2025-11-28 更新版",
      checkedOn: "2026-10-19",
    },
    {
      label: "伊利沙伯中学：2026/27 校历及活动",
      url: "https://www.qes.edu.hk/Menu/stu_affair/sch_functions.html",
      scope: "2026/27 校历列 2026-12-05 中一资讯日，与学校 2027/28 中一页互核日期。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-19",
    },
    {
      label: "教育局：2026 中六学生多元出路及本地学士一般入学要求",
      url: "https://applications.edb.gov.hk/circular/upload/EDBCM/EDBCM26090E.pdf",
      scope: "核对 2026 年一般入学要求以四核心科 332A 加两科选修为基线；选修等级可因课程而异，课程另有要求，达最低要求不保证录取。",
      sourceType: "government",
      academicYear: "2026 入学指引",
      checkedOn: "2026-10-21",
    },
    {
      label: "Big Exam：伊利沙伯中学 2026 DSE 与 Band 估算",
      url: "https://dse.bigexam.hk/zh-hk/ssp/school/413",
      scope: "第三方页面列 2026 Band 1A，并公开说明 Band 为非官方估算；以 2026 DSE 数据形成估值，不视作教育局学校评级。",
      sourceType: "third-party-estimate",
      academicYear: "2026 estimate; checked 2026-10-21",
      checkedOn: "2026-10-21",
    },
    {
      label: "HK Tutor Link：伊利沙伯中学 2025/26 资料与 Band 估算",
      url: "https://hktutorlink.hk/secondary-schools/en/queen-elizabeth-school-cc02e50",
      scope: "第三方页面列 2025 Band 1A 估算；其公开学术数据与校方 DSE 结果部分重合，不能当作独立第二套学校结果。",
      sourceType: "third-party-estimate",
      academicYear: "2025 estimate; checked 2026-10-21",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：伊利沙伯中学 2026 估算",
      url: "https://www.schoolbanding.com/s/queen-elizabeth-school",
      scope: "第三方页面列 2026 Band 1A；其算法与底层数据独立性未获验证，只作为坊间估值样本。",
      sourceType: "third-party-estimate",
      academicYear: "2026 estimate; checked 2026-10-21",
      checkedOn: "2026-10-21",
    },
    {
      label: "选校通：伊利沙伯中学学校资料与 Band 估算",
      url: "https://hkschoolfacts.com/secondary-schools/queen-elizabeth-school",
      scope: "第三方页面列 1B，并声明学校 Band 非官方；与 1A 估算存在分歧，故报告用 1A–1B 范围，不定单一细分。",
      sourceType: "third-party-estimate",
      academicYear: "2025/26 profile; checked 2026-10-21",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：SPC 与 QES 择校讨论（匿名用户，2020）",
      url: "https://www.edu-kingdom.com/forum.php?action=printable&mod=viewthread&tid=3835265",
      scope: "一则匿名留言把 QES 学习描述为较靠学生自觉，并提到家庭自行安排额外支持；只作为自主学习适配问题线索，非现届调查。",
      sourceType: "parent-discussion",
      academicYear: "2020 forum discussion",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：伊利沙伯中学係 happy school（匿名讨论，2023）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3877714",
      scope: "匿名讨论串围绕校风、学生自主与家庭支持，观点分歧；身份未核、不能代表现届或家长共识。",
      sourceType: "parent-discussion",
      academicYear: "2023 forum discussion",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：有冇伊利沙伯中学用家，分享一下学校（匿名讨论，2023）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3877860",
      scope: "三条回复中家长提问集中在课业压力与活动机会；样本不足，身份未核，只转化为到校问题。",
      sourceType: "parent-discussion",
      academicYear: "2023 forum discussion",
      checkedOn: "2026-10-21",
    },
    { label: "家校会：赛马会官立中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=257", scope: "核九龙城官立男女校身份、九龙塘校址、数学科学按班别或组别决定教学语言及中一列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：何文田官立中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=124", scope: "核九龙城官立男女校身份、巴富街校址、初中分班授课语言及中一列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
  ],
"belilios-public-school-secondary": [
    {
      label: "家校会《中学概览 2025/26》：庇理罗士女子中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=27",
      scope: "核对官立女校身份、2025/26 课程、费用、支援、设施及旧轮次招生。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生适用于 2026 年入学",
      checkedOn: "2026-10-18",
    },
    {
      label: "教育局：2025/2027 中学学位分配办法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027 年 DP、正取通知、CA、派位及注册日期。",
      sourceType: "government",
      academicYear: "2025/2027 派位周期",
      checkedOn: "2026-10-18",
    },
    {
      label: "学校《2024/25 周年报告》",
      url: "https://www.bps.hk/sites/default/files/School%20Report%202024-2025.pdf",
      scope: "直接取得并目视核对原 PDF 印刷第 13 页：2025 届 HKDSE 103 人、大学最低资格 96/103（93.2%）、本地副学位最低资格 102/103（99.0%）及毕业路径各列项合计 103；脚注写明两项资格定义。该页无逐科等级表、毕业路径统计截点或最终注册定义，不据此计算录取率。",
      sourceType: "school-official",
      academicYear: "2024/25 学年；2025 毕业届",
      checkedOn: "2026-10-19",
    },
    {
      label: "学校《2023/24 周年报告》",
      url: "https://www.bps.hk/sites/default/files/School%20Report%202023-2024.pdf",
      scope: "直接取得并目视核对原 PDF 印刷第 8 页：2024 届 HKDSE 108 人、大学最低资格 105/108（97.2%）、本地副学位最低资格 106/108（98.1%）。两项资格定义与 2025 届年报相同；该页不提供逐科成绩或毕业路径最终注册定义。",
      sourceType: "school-official",
      academicYear: "2023/24 学年；2024 毕业届",
      checkedOn: "2026-10-19",
    },
    {
      label: "学校《Curriculum 2024/25》",
      url: "https://www.bps.hk/sites/default/files/5.01%20School%20Curriculum_24-25.pdf",
      scope: "历史逐年级学科设置，不能保证未来同样开班。",
      sourceType: "school-official",
      academicYear: "2024/25 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "学校：2026 入学 DP 日程",
      url: "https://www.bps.hk/sites/default/files/Schedule%20of%20Application%202025-2026.pdf",
      scope: "旧轮次 DP 申请与面试日程，不作为 2027/28 日期。",
      sourceType: "school-official",
      academicYear: "2026 入学历史轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "学校：2025 入学 DP 申请表",
      url: "https://bps.hk/sites/default/files/2025%20S1%20DP%20Application%20Form%20%28Chinese%29.pdf",
      scope: "更早轮次学额与面试形式，明确不作为 2027/28 规则。",
      sourceType: "school-official",
      academicYear: "2025 入学历史轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "学校：2024 招生册",
      url: "https://bps.hk/sites/default/files/School%20Prospectus_%E5%96%AE%E9%A0%81%E7%89%88.pdf",
      scope: "2024 逐科成绩年份边界，未与 2025／2026 数据混用。",
      sourceType: "school-official",
      academicYear: "2024 HKDSE 历史资料",
      checkedOn: "2026-10-17",
    },
    { label: "家校会：嘉诺撒书院 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=155", scope: "核东区资助天主教女校身份、校址、初中授课语言及列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：香港真光中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=389", scope: "核湾仔区资助基督教女校身份、校址、初中授课语言及列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：圣士提反女子中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=311", scope: "比较中西区资助基督教女校的课程语言、2025/26 堂费、办学类别及他区范围；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-21" },
    { label: "庇理罗士女子中学家长教师会：心声分享", url: "https://pta.bps.hk/school_albums", scope: "家教会精选两名家长参与义工和校园活动的个别经验；来源与样本具选择性，不代表全体家长。", sourceType: "parent-discussion", checkedOn: "2026-10-21" },
    { label: "Baby Kingdom：非港岛区的你，识唔识庇理罗士女子中学？", url: "https://www.baby-kingdom.com/forum.php?mod=viewthread&tid=23781347", scope: "2025 年匿名讨论学校知名度及声誉，意见有分歧；非在读家庭抽样调查，不能证明教学质量或当前 Band。", sourceType: "parent-discussion", academicYear: "2025 年讨论", checkedOn: "2026-10-21" },
    { label: "BigExam：庇理罗士女子中学 2026 Band 估算", url: "https://dse.bigexam.hk/en/ssp/school/27", scope: "网站按公开 2025 HKDSE 表现给出非官方 Band 1B–1A 估算；不代表教育局分级或精确排名。", sourceType: "third-party-estimate", academicYear: "2026 估算；参考 2025 HKDSE", checkedOn: "2026-10-21" },
    { label: "SchoolBanding：庇理罗士女子中学 2026 Band 估算", url: "https://www.schoolbanding.com/s/belilios-public-school", scope: "列出 Band 1A 与平台名次；方法及底层成绩资料可能与其他估算网站重叠，不作独立多方验证。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-21" },
  ],
"sha-tin-government-secondary-school-secondary": [
    {
      label: "家校会《中学概览 2025/26》：沙田官立中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=263",
      scope: "核对学校身份、2025/26 收费、科目、收生简介、校园、支援及交通；概览修订于 2025-12-05。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年；招生资料适用于 2026 年入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：2025/2027 中学学位分配办法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027 年 DP 申请、正取通知、统一派位结果及注册日期。",
      sourceType: "government",
      academicYear: "2025/2027 派位周期",
      checkedOn: "2026-10-21",
    },
    {
      label: "沙田官立中学：学校计划与报告索引",
      url: "https://www.stgss.edu.hk/school-plans-and-reports/",
      scope: "核对学校发布的 2024/25 年报、2025–2028 学校发展计划及 2026 校外评核报告索引；评核原 PDF 已另行直接核读。",
      sourceType: "school-official",
      academicYear: "2024/25 年报索引",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：沙田官立中学 2026 年校外评核报告（学校官网公开原 PDF）",
      url: "https://www.stgss.edu.hk/wp-content/uploads/2026/07/External-school-Review-Report-2026.pdf",
      scope: "2026 年 3 月评核、6 月报告；目视核对印刷第 6–10 页课堂观察、支援措施、近三年 HKDSE 学位及副学位最低资格高于全港日校平均的方向性判断，以及评核提出的教学和成效评估改善要求。未列逐届百分比、人数、分母、逐科成绩或最终注册。",
      sourceType: "independent-inspection",
      academicYear: "2025/26 学年；2026 年 3 月评核",
      checkedOn: "2026-10-21",
    },
    {
      label: "沙田官立中学《2024/25 年报》",
      url: "https://www.stgss.edu.hk/wp-content/uploads/2025/11/2.-Annual-Report-2024-2025-v4.pdf",
      scope: "核对 2025-08-01 在校人数、班级、2025 HKDSE Top 9 个案，以及第 7–8、11–14、30–32 页的学校自评、学生反馈和 SEN／非华语支援执行记录；相关百分比未列样本数与计算口径，言语治疗与中文支援属于 2024/25 项目快照。文件没有提供全届考试分母或完整毕业去向统计。",
      sourceType: "school-official",
      academicYear: "2024/25 学年；2025 届个案",
      checkedOn: "2026-10-21",
    },
    {
      label: "沙田官立中学：2026/27 中一自行分配学位申请须知（历史轮次）",
      url: "https://www.stgss.edu.hk/wp-content/uploads/2025/11/2026-2027-%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D-%E7%94%B3%E8%AB%8B%E8%80%85%E9%A0%88%E7%9F%A5-v2.pdf",
      scope: "核对 43 个历史学额、评分、文件与面談安排；只作为 2026/27 入学资料，不能外推到 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-21",
    },
    {
      label: "沙田官立中学：2026/27 DP 申请公告及个人资料声明（历史轮次）",
      url: "https://www.stgss.edu.hk/latest-news/%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E7%94%B3%E8%AB%8B%E8%A1%A8%E5%8F%8A%E9%A0%88%E7%9F%A5-s1-dp-application-form-and-information/",
      scope: "核对旧轮次申请资料用途、可能向教育局披露、申请人查阅及更正权；未列明确保存期限，不外推至 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-21",
    },
    {
      label: "沙田官立中学官方网站",
      url: "https://www.stgss.edu.hk/",
      scope: "当届招生、课程和最新公告入口；本次核到 2027/28 时间表，但没有完整甄选条件。",
      sourceType: "school-official",
      checkedOn: "2026-10-21",
    },
    {
      label: "沙田官立中学：2026/27 S4–S6 选修科目组合",
      url: "https://www.stgss.edu.hk/wp-content/uploads/2026/08/S4-6-Subject-List-26-27.pdf",
      scope: "核对 2026/27 中四至中六按班别列出的实际选修组合；不外推至 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    { label: "家校会：沙田崇真中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=262", scope: "核沙田区资助男女校身份、校址、初中语言、列示费用与小班费；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-21" },
    { label: "家校会：沙田培英中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=264", scope: "核沙田区资助男女校身份、校址、初中语言与列示费用；家教会会费按家庭计，不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-21" },
    { label: "SchoolDays：沙田官立中学 2026 Banding 估算", url: "https://www.schooldays.com.hk/secondary/%E6%B2%99%E7%94%B0%E5%AE%98%E7%AB%8B%E4%B8%AD%E5%AD%B8", scope: "第三方页面列 Band 1B，并说明其 Banding 属公开资料估算；不是教育局学校等级。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-21" },
    { label: "选校通（HKSchoolFacts）：沙田官立中学 Band 1B", url: "https://hkschoolfacts.com/secondary-schools/sha-tin-government-secondary-school", scope: "页面列 Band 1B，并说明参考坊间估算、教育局没有公布中学 Banding；估算方法与底层数据独立性未核。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-21" },
    { label: "SchoolBanding：沙田官立中学 2026 Band 估算", url: "https://www.schoolbanding.com/s/sha-tin-government-secondary-school", scope: "页面列 Band 1、排名区间和英文指数；没有将本校细分为 1A／1B／1C。算法和来源独立性未充分公开。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-21" },
    { label: "沙田官立中学：2027/28 中一自行分配学位申请时间表", url: "https://www.stgss.edu.hk/wp-content/uploads/2026/10/S1-DP-Schedule-of-Application-2027-2028.pdf", scope: "核对 2027/28 招生讲座预约、表格派发、申请、面谈、正取通知、叩门、注册及 Pre-S1 日期；文件没有列学额、甄选权重、面谈语言与评核范围。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "沙田官立中学：语言政策", url: "https://www.stgss.edu.hk/language-policy/", scope: "校方称除列明的中文科目外，其他科目以英语授课；每周设英语日及普通话日。该政策为校方说明，不独立证明每堂实际语码或学生语言成果。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "Big Exam：沙田官立中学 Band 估算", url: "https://dse.bigexam.hk/en/ssp/school/263", scope: "网页估算 2025 年约 Band 1B，并自行说明学校 Band 非官方、可能含主观估算；不可当作教育局分级。", sourceType: "third-party-estimate", academicYear: "2025 估算", checkedOn: "2026-10-21" },
    { label: "HK Tutor Link：沙田官立中学 Band 估算", url: "https://hktutorlink.hk/secondary-schools/en/sha-tin-government-secondary-school-7cf99c6", scope: "网页估算 2025 年 Band 1B；排名以范围呈现，为非官方参考，方法与其他估算是否独立未证。", sourceType: "third-party-estimate", academicYear: "2025 估算", checkedOn: "2026-10-21" },
    { label: "教育王国：请问沙田官立中学校风如何？", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3770337", scope: "2019 年匿名讨论的一条意见称校风 OK；身份、就读经历未核实，样本陈旧且极少，不代表当前家庭体验。", sourceType: "parent-discussion", academicYear: "2019 年讨论", checkedOn: "2026-10-21" },
    { label: "Baby Kingdom：派到沙官仍不满意", url: "https://www.baby-kingdom.com/forum.php?mod=viewthread&tid=12171951", scope: "2014 年匿名讨论中可见对学校的不同评价；意见陈旧、身份及亲身经历未核，不作当前口碑结论。", sourceType: "parent-discussion", academicYear: "2014 年讨论", checkedOn: "2026-10-21" },
  ],
"fanling-kau-yan-college-secondary": [
    {
      label: "家校会《中学概览 2025/26》：粉岭救恩书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=85",
      scope: "核对学校身份、班级、逐科授课语言、收费、设施与支援；年度快照。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "家校会《中学概览 2025/26》：中华基督教会基新中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=444",
      scope: "第 7 章同区资助男女校比较：学校身份、中一班数、授课语言、选科与列明收费；年度快照。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "家校会《中学概览 2025/26》：粉岭礼贤会中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=86",
      scope: "第 7 章同区资助男女校比较：学校身份、中一班数、授课语言、选科与列明收费；年度快照。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "教育局：2025/2027 中学学位分配办法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027 年 DP 申请、正取通知、派位结果与注册日期。",
      sourceType: "government",
      academicYear: "2025/2027 派位周期",
      checkedOn: "2026-10-17",
    },
    {
      label: "考评局：2026 HKDSE 参与学校名单",
      url: "https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Participating_School/2026_DSE_participating_school_list.pdf",
      scope: "核对学校编号 30673 有参加 2026 HKDSE；名单只证明有考生应考，不披露人数、成绩或毕业去向。",
      sourceType: "government",
      academicYear: "2026 HKDSE",
      checkedOn: "2026-10-18",
    },
    {
      label: "粉岭救恩书院：中一入学须知与申请表",
      url: "https://s1admission.fkyc.edu.hk/?page_id=1835",
      scope: "核对 2026/27 历史轮次的 30/30/40 权重、面谈、日期及个人资料声明；未获录取申请表销毁，但未列保存期限，不能外推至 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "粉岭救恩书院：2026/27 中一申请表",
      url: "https://s1admission.fkyc.edu.hk/wp-content/uploads/2025/12/%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E6%94%B6%E7%94%9F%E7%94%B3%E8%AB%8B%E8%A1%A8-26-27.pdf",
      scope: "旧轮次 51 个 DP 学额、材料和不需小学推荐信；学额注明待教育局批准。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-17",
    },
    {
      label: "粉岭救恩书院：计划与报告索引",
      url: "https://web2.fkyc.edu.hk/?page_id=1338",
      scope: "核对学校发布 2024/25 周年报告的入口。",
      sourceType: "school-official",
      academicYear: "2024/25 年报索引",
      checkedOn: "2026-10-17",
    },
    {
      label: "粉岭救恩书院《2024/25 周年报告》",
      url: "https://web2.fkyc.edu.hk/wp-content/uploads/2025/11/2024-2025%E5%B9%B4%E5%BA%A6%E5%91%A8%E5%B9%B4%E5%A0%B1%E5%91%8A.pdf",
      scope: "核对 2025 HKDSE 四科合格率原文及家校活动；逐科分母、合格门槛及去向图数字未能核实。",
      sourceType: "school-official",
      academicYear: "2024/25 学年；2025 考试届",
      checkedOn: "2026-10-17",
    },
    {
      label: "粉岭救恩书院《2025–2029 学校发展计划》",
      url: "https://web2.fkyc.edu.hk/wp-content/uploads/2025/11/2025-2029%E5%AD%B8%E6%A0%A1%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83_17NOV_IMC-version.pdf",
      scope: "核对 S2–S3 廿一世纪全人成长核心素养课程的四类学习范畴、高中所列 14 科甲类及 4 科乙类应用学习选择；属校方发展计划／自评记录，不保证每届选科组合或开班。",
      sourceType: "school-official",
      academicYear: "2025–2029 学校发展计划",
      checkedOn: "2026-10-19",
    },
    {
      label: "粉岭救恩书院《2025/26 初中语言先导计划》",
      url: "https://web2.fkyc.edu.hk/wp-content/uploads/2025/11/2025-2026%E5%B9%B4%E5%BA%A6%E5%88%9D%E4%B8%AD%E8%AA%9E%E8%A8%80%E5%85%88%E5%B0%8E%E8%A8%88%E5%8A%83%E4%B8%80%E7%AD%86%E9%81%8E%E6%B4%A5%E8%B2%BC%E8%A8%88%E5%8A%83.pdf",
      scope: "2025/26 计划拟在中三开设日语、韩语、法语、西班牙语，按25／1／1／2人编列预算；非实际修读人数或未来年度开班保证。",
      sourceType: "school-official",
      academicYear: "2025/26 计划",
      checkedOn: "2026-10-19",
    },
    {
      label: "粉岭救恩书院官方网站",
      url: "https://web2.fkyc.edu.hk/",
      scope: "当届招生、课程和最新公告入口；2026-10-19 复核仍显示 2026/27 旧轮次，未见 2027/28 正式申请细则。",
      sourceType: "school-official",
      checkedOn: "2026-10-19",
    },
    {
      label: "大考：粉岭救恩书院 HKDSE 数据与 Band 估算",
      url: "https://dse.bigexam.hk/zh-hk/ssp/school/85",
      scope: "第三方估算学校约 Band 2C–2B，页面自评准确性中等；其公开数据不足以还原学校同届完整分母，故仅作区间参考。",
      sourceType: "third-party-estimate",
      academicYear: "2025 DSE 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolFit HK：粉岭救恩书院 Band 参考与来源对照",
      url: "https://schoolfit.hk/schools/fanling-kau-yan-college",
      scope: "汇整不同第三方的 Band 参考（Band 2C 与 Band 2B），反映估算口径有差异；非官方评级，报告不据此给出精确分数。",
      sourceType: "third-party-estimate",
      academicYear: "页面注明 2026 年 10 月资料",
      checkedOn: "2026-10-21",
    },
    {
      label: "HKSCHOOL.TOP：粉岭救恩书院口碑与 Band 摘要",
      url: "https://hkschool.top/schools/585",
      scope: "提供第三方 Band 2B–2C（2024 口径）及 2006–2020 年匿名讨论摘要；评论年代较旧且部分为聚合转述，只用作待核问题，不代表现况或家长共识。",
      sourceType: "parent-discussion",
      academicYear: "历史评论摘要：2006–2020；Band 2024 口径",
      checkedOn: "2026-10-21",
    },
    {
      label: "粉岭救恩书院家校会：历届主席的话",
      url: "https://web2.fkyc.edu.hk/?page_id=3073",
      scope: "校方发布的家长代表个人经验，包含教师关顾、电子教学和学生自律要求；属带有正向选择偏差的个别经验，不视作独立满意度调查。",
      sourceType: "school-official",
      academicYear: "历届主席个人回顾；页面含第 21、22 届内容",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：粉岭救恩书院旧讨论帖",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=1252419",
      scope: "2008 年仅少量匿名发言，主要为询问学校评价及观察校长更替；年代久、样本极少，不能代表当前家长口碑。",
      sourceType: "parent-discussion",
      academicYear: "2008 年帖子",
      checkedOn: "2026-10-21",
    },
  ],
"hkbuas-wong-kam-fai-secondary": [
    {
      label: "家校会《中学概览 2025/26》：香港神托会培基书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=382",
      scope: "第 7 章比较：直资男女校身份、沙田校址、2025/26 中一及非本地课程学费。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "校方：培基书院非本地课程",
      url: "https://www.spkc.edu.hk/non-local-curriculum/",
      scope: "第 7 章比较：Pearson Edexcel IAL 科目、修读结构及科目人数；不当作总学额。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "家校会《中学概览 2025/26》：香港青年协会李兆基书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=380",
      scope: "第 7 章比较：直资男女校身份及天水围校址。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "校方：李兆基书院 2026/27 学费",
      url: "https://www.hlc.edu.hk/tuition-fees",
      scope: "第 7 章比较：本地生按年级及 DSE／IAL 路线列示的年度学费。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "校方：李兆基书院课程",
      url: "https://www.hlc.edu.hk/curriculum-overview",
      scope: "第 7 章比较：HKDSE、中四衔接及中五至中六 Pearson Edexcel IAL 数理科。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "教育局：中学学位分配办法",
      url: "https://www.edb.gov.hk/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/",
      scope: "核对 2027 周期及非参加派位直资学校的制度入口；承诺书细则与限期按当届文件复核。",
      sourceType: "government",
      academicYear: "2025/2027 派位周期",
      checkedOn: "2026-10-17",
    },
    {
      label: "校方：2027/28 七年级招生公告",
      url: "https://www.hkbuas.edu.hk/admissions/admissions/g7-admission",
      scope: "核对 2026-11-14 至 12-09 网上申请、资讯日自 10-20 10:00 起接受登记、先到先得及有限面对面席位安排；当届未列学额和评分细则。2026-10-20 校方页面已有资讯日登记链接；登记系统实际提交状态未独立核验。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-20",
    },
    {
      label: "校方：一般资料",
      url: "https://www.hkbuas.edu.hk/admissions/admissions/general-information",
      scope: "核对现行页面所列学费、班级和一条龙结构；收费栏未标适用学年。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "家校会《中学概览 2025/26》：王锦辉中小学",
      url: "https://www.hkbuas.edu.hk/sites/hkbuas/files/web/secondary_division/plans_reports/Secondary%20School%20Profile_Eng_0.pdf",
      scope: "核对直资身份、逐科语言、2025/26 学费及 2026/27 旧轮次约 40 学额与 50/50 评分。",
      sourceType: "school-profile",
      academicYear: "2025/26 概览；2026/27 历史招生",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：高中课程亮点",
      url: "https://www.hkbuas.edu.hk/en/ss/curriculum-highlights",
      scope: "核对 HKDSE／GCE 两条高中路线与教学语言。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：IGCSE 与 GCE A-Level 课程",
      url: "https://www.hkbuas.edu.hk/secondary/igcse-gcea-level/curriculum",
      scope: "核对 G11–G12 GCE 科目与结构；校方明确声明亦提供 OSSD，但公开页未列适用年级、课程结构、费用及去向。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：2026 HKDSE、GCE 与升学结果",
      url: "https://www.hkbuas.edu.hk/achievements/academic-examination-results-of-hkdse-and-gce-al-2026",
      scope: "核对校方公开比例、offer 数和个案；各指标分母与最终入学边界未完整公布。原路径迁移后改用校方现行 canonical URL。",
      sourceType: "school-official",
      academicYear: "2026 毕业届",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：2026 GCE A-Level 放榜公告",
      url: "https://hkbuas.edu.hk/en/ss/news/HKBUAS%20Celebrates%205A%2A%20Super%20Top%20Scorer%20for%20GCE%20A%E2%80%91Level%202026",
      scope: "核对 2026 GCE A-Level 成绩项中 A*、A*-A、A*-B 的比例及校方所称 50% cohort 获英国 G5 录取；公告未给成绩项分母、cohort 人数和完整录取定义。",
      sourceType: "school-official",
      academicYear: "2026 GCE A-Level 届",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：财务援助",
      url: "https://www.hkbuas.edu.hk/en/financial-assistance",
      scope: "核对学费减免、活动资助、申请期与网页中的旧版费用审批注释。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：资优与特殊教育",
      url: "https://www.hkbuas.edu.hk/en/gifted-education-special-educational-needs",
      scope: "核对 Excel 33、数学加速、跳级及个别支援描述。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：非华语学生支持",
      url: "https://www.hkbuas.edu.hk/en/support-non-chinese-speaking-ncs-students",
      scope: "核对中文抽离式学习组及课后支援。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：2026 七年级面谈新闻",
      url: "https://www.hkbuas.edu.hk/en/ss/news/grade-7-admission-interview",
      scope: "核对 2026/27 旧届超过 2,000 份首轮申请的校方说法；不据此计算录取率。",
      sourceType: "school-official",
      academicYear: "2026/27 入学历史轮次",
      checkedOn: "2026-10-18",
    },
    {
      label: "BigExam：王锦辉中小学中学部 Band 估算",
      url: "https://dse.bigexam.hk/zh-hk/ssp/school/375",
      scope: "第三方估算列约 Band 1C–1B（2026）；非官方且未能证明与同类网页估算相互独立。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "HK Tutor Link：王锦辉中学资料与 Band 参考",
      url: "https://www.hktutorlink.hk/secondary-schools/hkbu-affiliated-school-wong-kam-fai-secondary-primary-school-c3b4e07",
      scope: "列 Band 1C–1B 估算；方法及底层数据透明度有限，不作为独立评级。",
      sourceType: "third-party-estimate",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：王锦辉中学 Band 参考",
      url: "https://schoolbanding.com/s/hkbu-affiliated-school-wong-kam-fai-secondary-primary-school",
      scope: "列 Band 1C–1B 与排名；属网站估算，不是教育局评级，且不能确认独立资料来源。",
      sourceType: "third-party-estimate",
      academicYear: "2026 年估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolDays：王锦辉中学资料与 Band 估算",
      url: "https://www.schooldays.com.hk/secondary/08fa00c2",
      scope: "列 Band 2A；页面称主要依据概览教学语言推算并按学位分组，直资学校适用性有疑问。",
      sourceType: "third-party-estimate",
      academicYear: "2025/26 资料；第三方估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：王锦辉中学功课及上堂模式",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3736699",
      scope: "2019 年家长讨论功课、项目学习、初中适应和英语授课体验；单一匿名账号发言，不代表全体或现况。",
      sourceType: "parent-discussion",
      academicYear: "2019 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：王锦辉中小学交流区",
      url: "https://www.edu-kingdom.com/forum.php?action=printable&mod=viewthread&tid=2734593",
      scope: "2013–2014 年家长讨论项目学习、活动、学习压力和升学顾虑；年代久远，兼有小学部与传闻内容，只作为历史问题线索。",
      sourceType: "parent-discussion",
      academicYear: "2013–2014 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：王锦辉中小学教学讨论（2024）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3880143",
      scope: "小学部家长谈小学教师并询问中学情况；没有中学部亲历证据，仅用于说明为何不把小学评论外推为中学口碑。",
      sourceType: "parent-discussion",
      academicYear: "2024 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：微调中学教学语言常见问题（2026）",
      url: "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/applicable-to-secondary/moi/support-and-resources-for-moi-policy/FAQ_RP_SC_April_2026.pdf",
      scope: "直资学校在学生能力条件享有弹性；用于说明不能只凭英语授课推断学校 Band。",
      sourceType: "government",
      academicYear: "2026 年版本",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：2026/27 大学教育资助委员会资助本科课程一般入学要求",
      url: "https://applications.edb.gov.hk/circular/upload/EDBCM/EDBCM26090E.pdf",
      scope: "核对四个核心科目 332A 加两科选修科第 2 或第 3 级的一般入学要求；用于解释学校提到的 UGC entrance requirement，不代表该校 80% 指标已公开分母。",
      sourceType: "government",
      academicYear: "2026/27 入学",
      checkedOn: "2026-10-21",
    },
  ],
"creative-secondary-school-secondary": [
    {
      label: "家校会《中学概览 2025/26》：启思中学",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=239",
      scope: "第 7 章同制度比较：直资男女校、校址、课程及 2025/26 各年级历史学费。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "家校会《中学概览 2025/26》：真道书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=371",
      scope: "第 7 章同制度比较：十一年贯通结构、中一历史学费及 DSE／IBDP 资料。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "家校会《中学概览 2025/26》：颜宝铃书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=18",
      scope: "第 7 章同制度比较：校址、中一历史学费、中四 IB 预备课程及中五至中六 IBDP。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：2027/28 中一入学",
      url: "https://www.css.edu.hk/admission-to-secondary-1?lang=zh",
      scope: "核对 2027/28 两阶段申请日期、面试期、结果公布时间，以及资格、材料、评核与面谈通知规则。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-19",
    },
    {
      label: "啓思中学：中一至中三课程",
      url: "https://www.css.edu.hk/curriculum-brochure-s1-s3?lang=zh",
      scope: "核对 MYP 框架下的香港初中课程、学习领域和中三 Community Project。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：中四至中六课程",
      url: "https://www.css.edu.hk/curriculum-brochure-s4-s6?lang=zh",
      scope: "核对中四 DSE 及中五起 IBDP 筛选；网页仍有旧科名，逐科安排须另核。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：2026 IBDP 成绩",
      url: "https://www.css.edu.hk/post/excellent-results-in-the-ib-diploma-examinations-2026",
      scope: "核对 43 名考生、平均分、40 分以上人数、文凭率及双语文凭合资格分母边界。",
      sourceType: "school-official",
      academicYear: "2026 考试届",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：2026/27 学费",
      url: "https://www.css.edu.hk/school-fee?lang=zh",
      scope: "核对 2026/27 已批核本地／非本地各年级与 DSE／IBDP 费率、分期、身份类别和退学条款；不外推到 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：学费减免",
      url: "https://www.css.edu.hk/fee-remission-scheme?lang=zh",
      scope: "核对家庭人数、收入与资产审核；网页 2026-05-15 截止日属历史轮次。",
      sourceType: "school-official",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：2026 开放日",
      url: "https://www.css.edu.hk/css-open-day-2026-cn?lang=zh",
      scope: "核对 2026-10-31 11:00–15:30、坑口站 A 出口 10:30 起每 15 分钟免费接驳、步行约 15 分钟、校内不设泊车位及优先考虑 2027/28 申请家庭；网页列有 Google 报名表链接，但无法据公告确认表单当前是否开放或尚有名额，需向校方核实。",
      sourceType: "school-official",
      academicYear: "2026-10-31 活动",
      checkedOn: "2026-10-18",
    },
    {
      label: "啓思中学：2024/25 年度校务报告",
      url: "https://www.css.edu.hk/_files/ugd/611a22_9b52370e30134be289fbde9757b4fc07.pdf",
      scope: "核对 2025 HKDSE 指标、2025 IBDP 分母与文凭结果、2025 毕业去向陈述，以及 2024/25 中四升 IBDP 名额与筛选因素；原始分母未列处不作推算。",
      sourceType: "school-official",
      academicYear: "2024/25 年度报告；考试结果为 2025 届",
      checkedOn: "2026-10-19",
    },
    {
      label: "考评局：2025 HKDSE 啓思中学校本统计报告",
      url: "https://www.hkeaa.edu.hk/DocLibrary/HKDSE/exam_report/Examination_Statistics/2026_1SCH0123-DSE2025-SCHOOL-01-SSR.pdf",
      scope: "核对 2025 各学科应考人数与等级分布；逐科人数不能重算校方年报中的联合核心科指标。",
      sourceType: "exam-authority",
      academicYear: "2025 HKDSE",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育局：2026/27 一般大学入学要求",
      url: "https://applications.edb.gov.hk/circular/upload/EDBCM/EDBCM26090E.pdf",
      scope: "核对一般大学入学要求 332A+2 及各科等级定义；并非具体大学课程录取保证。",
      sourceType: "government",
      academicYear: "2026/27 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "Big Exam：啓思中学 2025 DSE Band 估算",
      url: "https://dse.bigexam.hk/en/ssp/school/239",
      scope: "页面按公开 DSE 资料粗估 Band 2B；第三方方法只基于有限路线数据，不属教育局评级。",
      sourceType: "third-party-estimate",
      academicYear: "2025 DSE 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "SchoolBanding：啓思中学 Band 估算",
      url: "https://schoolbanding.com/s/creative-secondary-school",
      scope: "页面列 Band 2B；资料和算法独立性未充分披露，不与共用数据的网站简单计票。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "选校通：啓思中学 Band 估算",
      url: "https://hkschoolfacts.com/secondary-schools/creative-secondary-school",
      scope: "页面列 Band 2A 并声明参考坊间估算；作为与 2B 估算存在差异的低置信度交叉参照。",
      sourceType: "third-party-estimate",
      academicYear: "2026 估算",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：啓思中学学术与校风讨论（2025）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&page=1&tid=3883631",
      scope: "2025 年讨论包含匿名家长对学费与 Band 的个人判断；不作为事实或代表性口碑。",
      sourceType: "parent-discussion",
      academicYear: "2025 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：啓思中学讨论（2017–2020）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3559503",
      scope: "含个别自述在读家庭体验；年代较早、身份无法独立核实，不外推为现况。",
      sourceType: "parent-discussion",
      academicYear: "2017–2020 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：收到啓思中学 Offer 讨论（2021）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3850874",
      scope: "申请家庭和网民的个别意见，不属于在读家庭体验样本。",
      sourceType: "parent-discussion",
      academicYear: "2021 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：啓思中学学术与校风提问（2025）",
      url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3886278",
      scope: "一则 IB/DSE 比较意见，没有附可核统计，不作家长共识判断。",
      sourceType: "parent-discussion",
      academicYear: "2025 年讨论",
      checkedOn: "2026-10-21",
    },
  ],
"hkma-david-li-kwok-po-secondary": [
    {
      label: "校方：李兆基书院 2026/27 学费",
      url: "https://www.hlc.edu.hk/tuition-fees",
      scope: "第 7 章比较本地生分年级与 IAL 路线费用。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：李兆基书院课程",
      url: "https://www.hlc.edu.hk/curriculum-overview",
      scope: "第 7 章比较 HKDSE、中四衔接及 Pearson Edexcel IAL。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "家校会《中学概览 2025/26》：培基书院",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=382",
      scope: "第 7 章比较学校性质、沙田校址及历史收费。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "校方：培基书院非本地课程",
      url: "https://www.spkc.edu.hk/non-local-curriculum/",
      scope: "第 7 章比较 Pearson Edexcel IAL 科目结构；科目人数不当作总学额。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "校方：2027/28 中一第一阶段招生",
      url: "https://www.hkmadavidli.edu.hk/admission/s1_admission/",
      scope: "核申请与两轮面试日期、不参加 SSPA、申请链接待公布；学额、权重和完整程序未列。",
      sourceType: "school-official",
      academicYear: "2027/28 入学",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：课程与教学语言",
      url: "https://www.hkmadavidli.edu.hk/academic/curriculum/",
      scope: "核中一至中三科目、DSE 与 Integrated Curriculum／IAL 路线及逐科语言例外；当届开班与分流条件待核。",
      sourceType: "school-official",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：2026/27 学费",
      url: "https://www.hkmadavidli.edu.hk/admission/school_fees/",
      scope: "核六个年级年度学费及校方对在校生余下学年的加费说明；不当作 2027/28 收费。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：2026 HKDSE 成绩",
      url: "https://www.hkmadavidli.edu.hk/achievements/public_examination_results/?achievement=17",
      scope: "核 UER、17 科比较及等级比例；整届与逐科人数未同列，不倒算原始人数。",
      sourceType: "school-official",
      academicYear: "2026 考试届",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：2024/25 学校年报",
      url: "https://www.hkmadavidli.edu.hk/upload/schooldoc/329/docfile/6926564c69638.pdf",
      scope: "核 2025 届 108 人、UER 84.3%、JUPAS offer 75% 及 2025 年 8 月在校生；均为历史届别。",
      sourceType: "school-official",
      academicYear: "2024/25 学年；2025 考试届",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：2025/26 年度计划",
      url: "https://www.hkmadavidli.edu.hk/upload/schooldoc/328/docfile/692655410d6c1.pdf",
      scope: "第 6 章核评估反馈、跨学科学习、自我管理及 AI 个别化反馈等年度目标，以及 70% 教师/学生问卷目标；目标不等于已实现成果或个别学生服务保证。",
      sourceType: "school-official",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：学费减免计划",
      url: "https://www.hkmadavidli.edu.hk/admission/financial_assistance_scheme/",
      scope: "核 2026/27 AFI 档位、全额／半额减免和八月交表说明；不可移作 2027/28 批核。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "校方：奖学金",
      url: "https://www.hkmadavidli.edu.hk/admission/scholarships/",
      scope: "奖学金申请入口；具体当届资格与名额须另核。",
      sourceType: "school-official",
      checkedOn: "2026-10-17",
    },
    {
      label: "家校会《中学概览 2025/26》公开资料",
      url: "https://www.chsc.hk/datagovhk/ssp_2025_2026_sc.csv",
      scope: "核学校类别、历史其他收费、学生支援与设施；不当作当前录取条件。",
      sourceType: "school-profile",
      academicYear: "2025/26 学年",
      checkedOn: "2026-10-17",
    },
    {
      label: "家校会《中学概览 2025/26》：李国宝中学学校资料页",
      url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=367",
      scope: "核直资男女校身份、2025/26 学费与 4 班结构、逐科语言、学生支援及 2026/27 旧轮次派位说明。",
      sourceType: "school-profile",
      academicYear: "2025/26 概览；2026/27 历史招生",
      checkedOn: "2026-10-18",
    },
    {
      label: "校方：2026/27 插班招生安排",
      url: "https://www.hkmadavidli.edu.hk/admission/admission_to_other_forms/",
      scope: "核校方当页说明 2026/27 学年不收插班生；仅适用于该学年，不外推 2027/28。",
      sourceType: "school-official",
      academicYear: "2026/27 学年",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：2025 中一派位讨论",
      url: "https://www.edu-kingdom.com/forum.php?extra=page%3D1&mod=viewthread&page=11&tid=3885016",
      scope: "第 6 章单一匿名申请讨论：英语及中文／普通话要求的个人判断；非校方录取规则、Band 定位或统计资料。",
      sourceType: "parent-discussion",
      academicYear: "2025 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "教育王国：2024 年李国宝与基崇讨论",
      url: "https://www.edu-kingdom.com/forum.php?extra=page%3D1&mod=viewthread&page=2&tid=3881723",
      scope: "第 6 章匿名留言对管理与教师流动有分歧；身份、人数、原因未核，不作事实结论。",
      sourceType: "parent-discussion",
      academicYear: "2024 年讨论",
      checkedOn: "2026-10-21",
    },
    {
      label: "Baby Kingdom：2016 年李国宝家长个案",
      url: "https://www.baby-kingdom.com/forum.php?mod=viewthread&tid=18281291",
      scope: "第 6 章较早单一自述，涉及活动环境、教师鼓励及中文补强；不代表现况或群体口碑。",
      sourceType: "parent-discussion",
      academicYear: "2016 年讨论",
      checkedOn: "2026-10-21",
    },
  ],
"isf-academy-secondary": [
    { label: "教育局：私立独立学校名单", url: "https://internationalschools.edb.gov.hk/en/schools/pis.html", scope: "第 7 章确认三校 PIS 类别及与国际学校的制度区别。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "教育局：沪江维多利亚学校资料", url: "https://internationalschools.edb.gov.hk/en/schools/93.html", scope: "第 7 章核 PIS、双语及 PYP／MYP／DP 路线。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：沪江维多利亚 2026/27 学费", url: "https://www.vsa.edu.hk/admissions/school-fees", scope: "第 7 章核 Y7 年费及新生可退还资本征费性质。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "教育局：保良局蔡继有学校资料", url: "https://internationalschools.edb.gov.hk/en/schools/90.html", scope: "第 7 章核 PIS、校本双语、IGCSE 与 IBDP 路线。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：保良局蔡继有 2026/27 学费", url: "https://www.cky.edu.hk/en/site/view?name=School+Fees", scope: "第 7 章核 Year 6–8 年费；其他费用另核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "教育局：弘立书院学校资料", url: "https://internationalschools.edb.gov.hk/en/schools/92.html", scope: "核 PIS 身份、地址、男女校、课程和学校支援；费用为名录快照，以校方 2026/27 收费页为准。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 招生政策", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/admissions-policy/", scope: "核居港身份及家长条件、Grade 与本地年级对应、语言要求、至少提前 90 日书面退学通知及 4 月 1 日离校通知节点；内部升读条件未列。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 招生时间线", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/admissions-policy/admissions-timeline/", scope: "核 Grade 6–11 常规申请截至 2026-11-22；有空位时 2027 年 1–4 月可能滚动招生。与评估页所列农历新年假期后首周关闭的本轮候补池分开表述。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "校方：Grade 6–11 评估流程", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/admissions-policy/admissions-assessment-process/", scope: "核笔试（2026-12-06）、口试（2027-01-11 至 15）、家长会面（2027 年 2–3 月）及最迟通知日（2027-03-25）；结果、改期和缺席边界。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "校方：申请材料与步骤", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/admissions-policy/how-to-apply/", scope: "核 Friends of ISF 申请系统、身份与学业材料、Grade 2–11 中英文写作样本及教师推荐。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：中学课程与教学语言", url: "https://academy.isf.edu.hk/index.php/learning/secondary-school-curriculum/", scope: "核中学 MYP／DP 课程领域；逐级授课语言比例另以 2026/27 At-a-Glance 与普通话和英语专页交叉说明，网页列有按课程选择变化的比例区间。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 At-a-Glance", url: "https://academy.isf.edu.hk/wp-content/uploads/2026-27-At-A-Glance.pdf", scope: "第 3 章核逐级授课语言近似比例：Grade 6–8 普通话 30%／英语 70%，Grade 9–10 为 20%／80%；与校方语言专页的课程选择区间并列披露，不将两种口径混为一谈。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "校方：普通话与英语教学说明", url: "https://academy.isf.edu.hk/index.php/learning/putonghua-and-english-mastery/", scope: "第 3 章核双语沉浸定位；网页同时列 Grade 6–8 普通话／英语基准 30%／70%及按课程选择变化的 20–24%／76–80%区间，校方未解释两表计算口径，报告保留差异并建议家庭核问目标年级实际课表。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "IB：弘立书院官方名录", url: "https://www.ibo.org/en/school/002876/", scope: "核 MYP 与 DP 授权；不把小学课程记为 PYP。", sourceType: "school-profile", checkedOn: "2026-10-18" },
    { label: "校方：2026 届 IBDP 成绩与升学成果", url: "https://academy.isf.edu.hk/index.php/achievements-and-news/class-of-2026-ibdp-results/", scope: "核 101 人毕业班、当前页面平均分 38.8／45、49 人（校方列 49%）40+、77% 双语文凭、735 份 offer 与 27 项奖学金；2026-10-18 留存的 38.7 历史核验值本轮未在当前页面复现。实际 IBDP 应考分母、通过率及最终入读未单列，认证标准、具体新增科目与开班条件亦未公开，offer 不等于录取人数。", sourceType: "school-official", academicYear: "2026 毕业届；页面复核 2026-10-21", checkedOn: "2026-10-21" },
    { label: "校方首页：Class of 2026 成绩摘要", url: "https://academy.isf.edu.hk/", scope: "当前首页摘要显示平均 IBDP 分数 38.8／45，与 2026-10-21 直接打开的成绩页面一致；此前记录的 38.7 为未复现的历史页面值。", sourceType: "school-official", academicYear: "2026 毕业届", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 学费", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/fees-tuition/", scope: "核 Grade 6–10 HK$291,770、Grade 11–12 HK$317,190、分 10 期缴付、HK$1,000 申请费和额外费用；当前页面未列录取押金金额，不作 2027/28 报价。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "校方：资本征费", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/fees-tuition/capital-contribution-scheme/", scope: "核每年 HK$40,000 ACL、不计息且不可转让／退款与 Capital Note 豁免条件；金额可调整，二手票据价格未公开。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 经济援助", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/fees-tuition/financial-aid/", scope: "核 Grade 6–11 2026-12-04 截止、need-blind 录取、学费减免 20–100%、资本征费及 CCA／ELP 费用范围；批核非保证。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "校方：「立人」中心", url: "https://academy.isf.edu.hk/index.php/learning/li-ren/?lang=zh", scope: "核预备班至 Grade 12 学习支援、心理辅导、社交情绪项目及家长服务；服务资格、等候时间和个案频率未公开。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "Baby Kingdom／教育王国：家长 Grade 4 插班经历", url: "https://m.edu-kingdom.com/post.php?fid=43&page=1&tid=3876522", scope: "单一匿名家长于 2023 年自述申请 2024 年 Grade 4 插班，经过笔试／面试及家长面谈后未获 offer；对落选原因的解释为猜测，其他用户的学额与资本票据说法未核实，不代表当届在读口碑。", sourceType: "parent-discussion", academicYear: "2023 申请 2024 入学", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 招生简章", url: "https://academy.isf.edu.hk/wp-content/uploads/143492_ISF_Admissions_2027-28_eng_12.pdf", scope: "复核 2027/28 招生、经济援助、学费及资本征费年份，并以助学金表确认 Grade 6–11 截止 2026-12-04。", sourceType: "school-official", academicYear: "2027/28 入学；2026/27 学费", checkedOn: "2026-10-21" },
  ],
"cdnis-secondary": [
    { label: "教育局：香港学堂资料", url: "https://internationalschools.edb.gov.hk/en/schools/15.html", scope: "第 7 章核国际学校身份、IB 三阶段课程与支援。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：香港学堂 2026/27 学费", url: "https://hkacademy.edu.hk/school-fees/", scope: "第 7 章核 G6–8 学费、资本征费与入学费。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "教育局：汉基国际学校资料", url: "https://internationalschools.edb.gov.hk/en/schools/6.html", scope: "第 7 章核国际学校身份、IB／校本课程及杭州安排。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：汉基 2026/27 收费说明", url: "https://www.cis.edu.hk/admissions/school-fees", scope: "第 7 章核新生年度资本征费及留位款抵扣；学费数值未在本次可靠核得。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "教育局：香港加拿大国际学校资料", url: "https://internationalschools.edb.gov.hk/en/schools/61.html", scope: "核国际学校身份、地点、男女校、MYP／DP／OSSD 年级与 SEN 栏；名录费用是历史快照。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 招生关键日期", url: "https://www.cdnis.edu.hk/en/admissions/key-dates/", scope: "核 Grade 6–11 2026-12-31 申请截止日。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 招生指南 PDF", url: "https://www.cdnis.edu.hk/upload/page/19/self/CDNIS_Admissions_eng.pdf", scope: "核资格、年级、材料、申请与评估费、筛选优先、候补、2026/27 费用；2026-08-01 版本列 G6–12 评估于 2027 年 2–4 月；当前 Key Dates 页未列评估月份。", sourceType: "school-official", academicYear: "2027/28 招生；2026/27 费用", checkedOn: "2026-10-18" },
    { label: "校方：申请入口说明", url: "https://www.cdnis.edu.hk/en/admissions/apply-now/", scope: "核线上申请系统与当届招生指南入口。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 申请与 G6–12 评估说明", url: "https://www.cdnis.edu.hk/admissions/apply-online/", scope: "核现行申请页列 Grade 6–12 于 2027 年 3–4 月评估；与 2026-08-01 指南所列 2–4 月有差异，具体安排以个人通知为准。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：Upper School 课程", url: "https://www.cdnis.edu.hk/en/our-programmes/upper-school/", scope: "核 Grade 6–12 结构与 Grade 9–11 转入学分审核说明；双文凭非个人保证。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：IB 课程", url: "https://www.cdnis.edu.hk/en/our-programmes/ib-programmes/", scope: "核 Grade 6–10 MYP、Grade 11–12 DP 及学校对全员 DP 的陈述。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：OSSD 课程与毕业条件", url: "https://www.cdnis.edu.hk/en/our-programmes/ossd/", scope: "核 Grade 9 起积累学分、30 学分、40 小时社区服务、OSSLT 等条件。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2026 IBDP 成绩 PDF", url: "https://resources.finalsite.net/images/v1783257760/cdniseduhk/tzni7xjsreehgorobwgf/CDNIS_IB_Results_2026_Eng_July5.pdf", scope: "核平均 39、69 人 40+、超过 1,000 份 offer；精确 IBDP 报考分母与最终入读人数未列。", sourceType: "school-official", academicYear: "2026 毕业届", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 学费", url: "https://www.cdnis.edu.hk/en/admissions/tuition-fees/", scope: "核各 Grade 年费、HK$43,000 资本征费待教育局批准，以及 Grade 3–12 Experience Week 项目费用 HK$1,500–60,000；该项目范围未按年级拆分且不能视为必缴固定金额。不作 2027/28 报价。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "校方：奖学金", url: "https://www.cdnis.edu.hk/en/admissions/scholarships/", scope: "核新生邀请制奖学金及赛马会奖学金适用对象；非普遍助学保证。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：大学升学辅导", url: "https://www.cdnis.edu.hk/en/our-programmes/graduate-outcomes/", scope: "核 Grade 9–11 规划与一对一大学辅导。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：学生指导辅导", url: "https://www.cdnis.edu.hk/en/student-life/wellbeing-pastoral-care/", scope: "核 Upper School 指导辅导员；不等同教育局名录的正式 SEN 支援。", sourceType: "school-official", checkedOn: "2026-10-18" },
  ],
"shatin-tsung-tsin-secondary": [
    { label: "教育局：2025/2027 中学学位分配办法", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027 年 1 月 4–18 日统一 DP 申请期；校本要求另核。", sourceType: "government", academicYear: "2027 年入学", checkedOn: "2026-10-19" },
    { label: "考评局：2026 HKDSE 参与学校名单", url: "https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Participating_School/2026_DSE_participating_school_list.pdf", scope: "核学校编号 30784 有学生参加 2026 HKDSE；名单不披露人数、成绩或毕业去向。", sourceType: "government", academicYear: "2026 HKDSE", checkedOn: "2026-10-18" },
    { label: "校方：2025–2026 全年学科表现优异学生名单", url: "https://sttss.edu.hk/hk/whatnews/20260710", scope: "核校方于 2026-07-10 发布 S1–S6 各级学科表扬名单；不是 HKDSE 全届成绩表，不提供可计算的考试分母。", sourceType: "school-official", academicYear: "2025/26 学年", checkedOn: "2026-10-18" },
    { label: "家校会：沙田崇真中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=262", scope: "核身份、课程语言、历史招生权重、2025/26 收费及五年 DSE 平均；另核 2026/27 初中中文以粤语或普通话授课的拟议安排（视乎报读人数）；原文未列逐年逐科分母。拟开科目不等同新学年实施结果。", sourceType: "school-profile", academicYear: "2025/26 学年；含 2026/27 拟开科目", checkedOn: "2026-10-19" },
    { label: "家校会：2025/26 学校 PDF", url: "https://preview.chsc.hk/pdf/ssp2025/262_2.pdf", scope: "核收费豁免、五年平均成绩原文及学校支援。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "校方：学校简介", url: "https://sttss.edu.hk/hk/school/school-profile", scope: "核创校及办学背景；班数以具体学年校务报告与中学概览分别呈现，不以简介页推算学额。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2024/25 校务报告", url: "https://sttss.edu.hk/our_school/Plans_and_Reports/2526/%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8A2425_CHI.pdf", scope: "搜索索引列明 2024/25 班數為中一至中三各 6 班、中四至中六各 5 班，共 33 班；PDF 約 36 MB，讀取器無法直接打開。本報告只引用索引清楚呈現的班數，不據此推算新屆學額。", sourceType: "school-official", academicYear: "2024/25 学年", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 中一招生旧轮次", url: "https://sttss.edu.hk/hk/school/s1admission", scope: "核旧轮次 50 个 DP、105 个 CA 学额、面谈；校方注明本页新生资讯每年 11 月中更新，当前页仍显示 2026/27 轮次，2027/28 规则未核实。旧数据不能作新届标准。", sourceType: "school-official", academicYear: "2026/27 入学；当前招生页快照", checkedOn: "2026-10-19" },
    { label: "校方：2025/26 课程与选修", url: "https://sttss.edu.hk/hk/teaching-learning/curriculum", scope: "核高中中四核心科与三栏选修的逐栏科目、初中课程及教学语言；科目栏只代表 2025/26 可选范围，不保证任意跨栏组合或未来年度开班。", sourceType: "school-official", academicYear: "2025/26 学年", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 中一普通话班公告", url: "https://sttss.edu.hk/hk/whatnews/20260715", scope: "校方称 2026/27 中一普通话班报名未达开班要求、不设该班并取消相关面试；结合概览，限制在中一普通话教学班，不推断普通话科或其他年级教学全部停开，也不推断 2027/28。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },
    { label: "校方：一人一体艺及中一乐器安排", url: "https://sttss.edu.hk/hk/student-support-ethos/strategies", scope: "核中一持续学习一项中西乐器及中二至中三体艺活动说明；新届执行及收费另核。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：校园与交通", url: "https://sttss.edu.hk/hk/school/campus", scope: "核校址及大围站 F/G 出口步行路线。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：计划与报告索引", url: "https://sttss.edu.hk/hk/school/plans-reports", scope: "重核目前列示最新 2024/25 校务报告；不据此声称已核 2026 届成绩。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "家校会：沙田培英中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=264", scope: "核沙田资助男女校身份、禾輋校址、中一科目教学语言及列示费用；家教会收费按家庭计，不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：沙田循道卫理中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=266", scope: "核沙田资助男女校身份、新田围校址、中一科目教学语言及列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
  ],
"tuen-mun-catholic-secondary": [
    { label: "教育局：2025/2027 中学学位分配办法", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027-01-04 至 01-18 DP 统一申请期、正取通知 03-31、派位 07-06、注册 07-08 至 09，以及 2026 年 11 月中旬电子平台安排；校本细则另核。", sourceType: "government", academicYear: "2027 年入学", checkedOn: "2026-10-21" },
    { label: "校方：入学资讯索引", url: "https://www.tmcss.edu.hk/tmcss/?lang=zh&page_id=14206", scope: "2026-10-21 重核校方现行入学资讯索引，当前列出的中一 DP 仍为 2026/27，未见 2027/28 校本规则；这仅说明该索引当前内容，不推断其他渠道绝无更新。", sourceType: "school-official", academicYear: "截至 2026-10-21 页面列项", checkedOn: "2026-10-21" },
    { label: "家校会：屯门天主教中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=346", scope: "核身份、课程、旧轮次招生、收费、支援及 2025 JUPAS 比率原文；分母未列。概览的全校语言政策与校方课程页星号说明存在需学校澄清的班别口径。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：2025/26 学校 PDF", url: "https://preview.chsc.hk/pdf/ssp2025/346_2.pdf", scope: "核四班结构、2025/26 收费、3X 及 2026/27 旧轮次评分。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "校方：2026/27 中一自行分配须知 PDF", url: "https://www.tmcss.edu.hk/tmcss/wp-content/uploads/2026/01/2026-2027-%E5%B9%B4%E5%BA%A6%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5-1.pdf", scope: "核旧轮次 40 学额、文件、两轮面谈、40/50/10 评分及日期；另核个人资料用途、招生程序结束后六个月内销毁及查阅/更正权；截至 2026-10-21 校方入学索引仍列旧轮次，不外推旧轮次。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 旧轮次网上入口", url: "https://web.tmcss.edu.hk/self_admission/", scope: "核入口仍写 2026-01-02 至 01-16 的旧轮次申请，不作为 2027/28 当届入口；截至 2026-10-19 页面仍未显示新届规则。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-19" },
    { label: "校方：开设科目", url: "https://www.tmcss.edu.hk/tmcss/?page_id=383&lang=zh", scope: "2026-10-21 重核初中课程、高中选修及星号所称全部班别英语教学；仍与概览全校语言政策部分学生表述存在口径差异，实际班别安排待校方澄清。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：2026／2025／2024 文凭试结果", url: "https://www.tmcss.edu.hk/tmcss/?page_id=14448&lang=zh", scope: "2026-10-21 复核 2026／2025／2024 指定核心科的校内比例及门槛；现行页面未列逐科人数、完整等级分布或高于全港对照的科目数，后者另据学校招生简报第 37 页限定说明。", sourceType: "school-official", academicYear: "2024–2026 HKDSE", checkedOn: "2026-10-21" },
    { label: "校方：2026 年学生 AI 项目展览记录", url: "https://www.tmcss.edu.hk/tmcss/?p=16413&lang=zh", scope: "校方 2026-07-02 消息称 JC GoAI 学生项目「星唤 Beckon Stars」及「乾坤 Sovereign」曾在学与教博览和香港创科展 2026 展示；仅证明该项目案例，不代表全体学生均可参与或为常设课程名额。", sourceType: "school-official", academicYear: "2025/26 学年项目；2026 年展示", checkedOn: "2026-10-19" },
    { label: "校方：2026 年网络安全挑战赛成绩报道", url: "https://www.tmcss.edu.hk/tmcss/?p=16067&lang=zh", scope: "核校方 2026-06-09 报道 4 名中四至中五学生参加 PolyU x NuttyShell Cybersecurity CTF 2026 并获中学组季军；属个别赛事，不代表常设课程或全体学生参赛机会。", sourceType: "school-official", academicYear: "2025/26 学年；赛事于 2026 年举行", checkedOn: "2026-10-19" },
    { label: "校方：2025/26 中一入学简介（2025／2024 DSE 全港对照）", url: "https://www.tmcss.edu.hk/tmcss/wp-content/uploads/2025/12/admission-talk_2025-2026.pdf", scope: "已下载原 PDF 并目视核对第 37–38 页：2025／2024 核心科校内及 Overall Hong Kong 比例、第 37 页的 16 科 3+、10 科 4+ 和 JUPAS 63%；原页未说明全港统计母体、校内逐科人数或 JUPAS 定义，2024 年 14／10 科数未在此原件核到。", sourceType: "school-official", academicYear: "2025/26 招生简介；2024／2025 考试届", checkedOn: "2026-10-19" },
    { label: "校方：计划与报告", url: "https://www.tmcss.edu.hk/tmcss/?page_id=3955&lang=zh", scope: "核 2024–2027 发展计划与校务报告索引；截至 2026-10-21 索引最新列出 2024–25 校务报告，不能据此推定其他渠道没有更新，也不等同成果统计。", sourceType: "school-official", academicYear: "2024–2027 计划；最新报告索引至 2024–25", checkedOn: "2026-10-21" },
    { label: "校方：学校简介", url: "https://www.tmcss.edu.hk/tmcss/?page_id=313&lang=zh", scope: "核 1987 创校、宗教与校址；“近年发展”班数教师数无学年且与概览不一致。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "家校会：明愛屯門馬登基金中學 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=227", scope: "核屯门资助天主教男女校的校址、班数、华语／非华语授课语言及列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年；2026 年 9 月中一派位说明", checkedOn: "2026-10-17" },
    { label: "家校会：保良局百周年李兆忠紀念中學 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=5", scope: "核屯门资助男女校的校址、班数、英语授课科目、3X／4X 和列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年；2026 年 9 月中一派位说明", checkedOn: "2026-10-17" },
  ],
"yuen-long-merchants-association-secondary": [
    { label: "教育局：2025/2027 中学学位分配办法", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027-01-04 至 01-18 DP 统一申请期；新届校本细则另核。", sourceType: "government", academicYear: "2027 年入学", checkedOn: "2026-10-17" },
    { label: "家校会：元朗商会中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=425", scope: "核资助校身份、2025/26 班数、课程语言、收费、支援、交通及适用于 2026 年 9 月入学的最终评选权重 50/30/20；该概览不列校方旧轮次初筛权重，也不代表 2027/28 规则。", sourceType: "school-profile", academicYear: "2025/26 学年；2026/27 入学旧轮次", checkedOn: "2026-10-21" },
    { label: "校方：2026 年入学中一自行分配须知（英文原页）", url: "https://ylmass.edu.hk/web/en/s1-admission", scope: "直接核对旧轮次 50 个 DP 学额、初筛 50/20/20/10、最终评选 50/30/20、两轮面谈、递交材料与个人资料处理声明；中文版原页仍为 403。所有细则仅适用于 2026 年 9 月入学，不得沿用至 2027/28。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-21" },
    { label: "校方：2026 年首轮面谈公告", url: "https://www.ylmass.edu.hk/web/tc/activity/secondary-one-discretionary-places-allocation-first-interview-0", scope: "核 2026 年中文短讲、英语小组及中文数学解难安排，均属旧轮次。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-17" },
    { label: "校方：班级结构与课程", url: "https://ylmass.edu.hk/web/tc/class-structure-curriculum", scope: "核各年级科目、M1／M2、其他语言、分组与暑期英语衔接；2026-10-21 重核与中三选科讲座分开，页面科目目录不等于当届开班组合。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：2024/25 校务报告 PDF（第 17、19 页）", url: "https://mail.ylmass.edu.hk/web/sites/default/files/files/school_report_2024-2025_0.pdf", scope: "第 17 页列 2025 HKDSE 17 科 4+、12 科 5+ 高于全港及六科比较；第 19 页称超过 96.4% 当届毕业生取得香港及海外专上院校 offer。逐科人数、毕业生人数、统计截止日、接受与最终注册均未列。", sourceType: "school-official", academicYear: "2024/25 校务报告；2025 HKDSE 与毕业生调查", checkedOn: "2026-10-18" },
    { label: "校方：2026 HKDSE 成绩公告", url: "https://www.ylmass.edu.hk/web/tc/activity/outstanding-massians-hkdse-2026", scope: "2026-10-21 重核全科 5+ 24.5%、2+ 97.6% 及六科校方／全港 4+ 比率对照；页面日期 2026-07-17，未列逐科应考人数、总报考人次或完整计算口径。", sourceType: "school-official", academicYear: "2026 HKDSE", checkedOn: "2026-10-21" },
    { label: "校方：2023–2025 JUPAS 尖子学系节录", url: "https://ylmass.edu.hk/web/tc/jupas-offer-results", scope: "核网页标题明确标为 2023–2025 尖子学系分布（节录）；不能代表全届大学去向或录取率。", sourceType: "school-official", academicYear: "2023–2025 个案", checkedOn: "2026-10-18" },
    { label: "校方：中一候补学位旧轮次页面", url: "https://ylmass.edu.hk/web/tc/application-s1-places-after-release-sspa-results", scope: "核旧轮次候补程序和年份；不代表 2027/28 空位。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-17" },
    { label: "家校会：天主教崇德英文書院 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=334", scope: "核同为元朗区资助男女校的 2025/26 校址、宗教、班数、授课语言与列示收费；不据此推断 2027/28 录取机会。", sourceType: "school-profile", academicYear: "2025/26 学年；2026 年 9 月中一派位说明", checkedOn: "2026-10-17" },
    { label: "家校会：中華基督教會基元中學 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=445", scope: "核同为元朗区资助男女校的 2025/26 校址、宗教、班数、授课语言与列示收费；不据此推断 2027/28 录取机会。", sourceType: "school-profile", academicYear: "2025/26 学年；2026 年 9 月中一派位说明", checkedOn: "2026-10-17" },
    { label: "校方：2026-09-11 天宫课堂学习活动", url: "https://www.ylmass.edu.hk/web/en/activity/%E5%BE%9E%E8%AA%B2%E5%AE%A4%E9%80%A3%E7%B5%90%E5%A4%AA%E7%A9%BA-%E6%8E%A2%E7%B4%A2%E8%88%AA%E5%A4%A9%E7%A7%91%E6%96%B0%E8%A6%96%E9%87%8E", scope: "核校方记录师生参加「天宫课堂·港澳专场」直播；是个别活动实例，不代表全体学生参与或每年固定提供。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "校方：2026-10-09 醉酒湾防线历史考察", url: "https://mail.ylmass.edu.hk/web/en/activity/world-war-ii-gin-drinkers-line-historical-reenactment-tour", scope: "核校方记录中文历史学会与历史学会成员参加城门水塘历史考察和历史重演；社团成员活动，不代表全级学生参与或固定服务。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 学会招募（2026-09-18）", url: "https://www.ylmass.edu.hk/web/tc/activity/chill-club-friday-recruitment", scope: "核校方报告本学年新成立拼字队、爆旋陀螺学会、同辈辅导员及生涯规划大使；报道不列各级资格、名额或时段。网页正文本次抓取 cache miss，使用官方搜索索引摘录。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },
    { label: "校方：中三选科家长讲座（2026-10-03）", url: "https://mail.ylmass.edu.hk/web/en/activity/secondary-3-elective-subject-selection", scope: "核官方报道讲座介绍生涯倾向与升学路径，以支持家庭作选科讨论；不提供当届 3X 栏位、成班门槛或可修组合。网页正文本次抓取 cache miss，使用官方搜索索引摘录。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },
    { label: "校方当前主页与入学栏目", url: "https://www.ylmass.edu.hk/web/tc", scope: "2026-10-21 重核当前导航仍显示中一候补与 2026/27 中二至中五插班；这不是 2027/28 中一 DP 须知。旧轮次中文版原页为 403，英文版可直接读取。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：周年计划及报告索引", url: "https://www.ylmass.edu.hk/web/tc/annual-plans-and-reports", scope: "2026-10-21 当前索引最新校务报告列为 2024/25；该索引未见 2025/26 校务报告或外评报告全文，仅描述已核索引内容。", sourceType: "school-official", academicYear: "最新列项 2024/25", checkedOn: "2026-10-21" },
    { label: "教育局：2025/26 外评报告名录", url: "https://www.edb.gov.hk/attachment/tc/sch-admin/sch-quality-assurance/reports/esr-report/2025_esr_report.html", scope: "核名录将元朗商会中学列于 2025/26 外评学校，并在报告发布栏标示由学校网站提供全文；教育局该页不提供本校结论章节或等级。", sourceType: "government", academicYear: "2025/26 外评", checkedOn: "2026-10-21" },
    { label: "教育局刊载：校长外评后记", url: "https://www.edb.gov.hk/tc/sch-admin/sch-quality-assurance/relevant_article_press_release/20260915_article.html", scope: "2026-09-15 校长撰文转述外评专家对服务学习、阅读推广及学生领袖培育的肯定，以及深化数据分析、课堂潜能和学生支援网络的建议；这是校长的转述，不代替完整外评报告。", sourceType: "government", academicYear: "2025/26 外评；2026/27 学年分享", checkedOn: "2026-10-21" },
    { label: "第三方学校资料：Banding 估算", url: "https://www.schoolbanding.com/s/yuen-long-merchants-association-secondary-school", scope: "网站将元朗商会中学估算为 Band 1C；该分类及排名为非官方平台估算，不是教育局结论或学生个人派位组别。", sourceType: "third-party-estimate", academicYear: "2026 估算", checkedOn: "2026-10-21" },
    { label: "Big Exam：Banding 估算", url: "https://dse.bigexam.hk/en/ssp/school/425", scope: "网站基于公开 HKDSE 资料将学校粗略估算为 Band 1C；算法和学校原始考生分母不在本页完整披露，作为独立平台参考而非官方评级。", sourceType: "third-party-estimate", academicYear: "截至 2025 HKDSE 的估算", checkedOn: "2026-10-21" },
    { label: "星岛头条：校内学生受伤事件与校方回应", url: "https://www.stheadline.com/edu-news/3566070/%E8%A2%AB%E6%8C%87%E5%86%B7%E8%99%95%E7%90%86%E5%AD%B8%E7%94%9F%E9%81%AD%E6%AC%BA%E5%87%8C-%E5%85%83%E6%9C%97%E5%95%86%E6%9C%83%E4%B8%AD%E5%AD%B8%E6%8C%89%E8%AD%A6%E6%96%B9%E5%BB%BA%E8%AD%B0%E6%9A%AB%E5%81%9C%E6%A0%A1%E5%85%A7%E8%AA%BF%E6%9F%A5", scope: "2026-04-26 报道并列家长对事件的说法、校方通告回应及教育局跟进；本报告只记录为单一公开事件，不裁定责任或调查结果。", sourceType: "media-report", academicYear: "2026 报道", checkedOn: "2026-10-21" },
    { label: "教育王国：2023 年家长讨论帖", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3878074", scope: "旧讨论串含身份未核实的个别负面留言及一次开放日正面体验；只能作为有限口碑样本，不能代表现况或家长共识。", sourceType: "parent-discussion", academicYear: "2023 年讨论", checkedOn: "2026-10-21" },
  ],
"st-peters-secondary": [
    { label: "教育局：2025/2027 中学学位分配办法", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027-01-04 至 01-18 DP 统一申请期；校本新届要求另核。", sourceType: "government", academicYear: "2027 年入学", checkedOn: "2026-10-17" },
    { label: "家校会：圣伯多禄中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=277", scope: "核学校身份、班级、课程语言、2026/27 历史甄选、收费及支援；课室数 32 与设施所述 30 间标准课室并列。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "校方：School Reports 索引", url: "https://stpeter.edu.hk/en/news.php?wid=35&cid=9", scope: "核截至 2026-10-19 最新列出的校务报告为 2024/25（发布日期 2025-08-31）；只说明官网索引当前列项。", sourceType: "school-official", academicYear: "最新列项 2024/25", checkedOn: "2026-10-19" },
    { label: "校方：2024/25 校务报告 PDF", url: "https://stpeter.edu.hk/en/news_detail.php?cid=9&id=355&wid=35", scope: "核 2024/25 全校 24 班、642 人（中一 125、中六 82）；2025 DSE 18 科平均合格率约 92% 及已回应毕业生出路调查比例。未列 DSE 逐科报考人数、调查回应人数与日期。", sourceType: "school-official", academicYear: "2024/25 学年；2025 HKDSE", checkedOn: "2026-10-19" },
    { label: "校方：2024/25 学生支援组年终检讨", url: "https://www2.stpeter.edu.hk/files/sch_report_2425_a02_32D563A5.pdf", scope: "年报附录二第 1、4 页：5 名第三层支援学生制定个别学习计划、约 80 名学生获校内测考调适，4 名中六学生的 DSE 调适申请获批。均为历史实施人数，未列全校 SEN 分母或个人服务保证。", sourceType: "school-official", academicYear: "2024/25 学年", checkedOn: "2026-10-19" },
    { label: "校方：2024/25 生涯规划组全年检讨", url: "https://www2.stpeter.edu.hk/files/sch_report_2425_a03_E4471D79.pdf", scope: "年报附录三第 3、5 页：中六 JUPAS／EAPP 指导、大学参观及 6 名学生参与 ERB 实习计划相关安排，文件称当时取录结果待公布。没有实习覆盖率或同届大学最终注册人数。", sourceType: "school-official", academicYear: "2024/25 学年", checkedOn: "2026-10-19" },
    { label: "校方：2025/26 学会及学生组织目录 PDF", url: "https://stpeter.edu.hk/attachment/upload/files/%E5%AD%B8%E6%9C%83%E5%8F%8A%E5%AD%B8%E7%B5%84%E7%B9%94%E8%B3%87%E6%96%99%E7%B0%A1%E4%BB%8B%282025-26%29.pdf", scope: "核 2025/26 带星号学会、乐器班及校队属会员制，中一、中二按目录只选一个团体；练习时段只作该年度活动规划参考，不推断新学年名额、收费或规则。", sourceType: "school-official", academicYear: "2025/26 学年", checkedOn: "2026-10-19" },
    { label: "校方：2025 HKDSE 成绩消息", url: "https://stpeter.edu.hk/en/news_detail.php?cid=1&id=333", scope: "核校方 2025 年平均合格率超过 90% 的新闻陈述；不替代年报分母。", sourceType: "school-official", academicYear: "2025 HKDSE", checkedOn: "2026-10-17" },
    { label: "校方：2025 学士课程消息", url: "https://stpeter.edu.hk/en/news_detail.php?cid=1&id=337", scope: "核校方 2025-08 新闻“逾 40%”文字；与年报“约 40%”分开记录。", sourceType: "school-official", academicYear: "2025 毕业届", checkedOn: "2026-10-17" },
    { label: "校方：2026 学生成就消息", url: "https://stpeter.edu.hk/en/news_detail.php?cid=1&id=415", scope: "核 2026-07-15 HKDSE 概述及校长推荐一名学生获港大人工智能及数据科学课程取录的个案；不推断全届 DSE 或升学率。", sourceType: "school-official", academicYear: "2026 毕业届", checkedOn: "2026-10-19" },
    { label: "校方：最新消息索引（入学公告）", url: "https://stpeter.edu.hk/en/news.php?cid=1", scope: "核截至 2026-10-21 所查栏目仍列 2026/27 中一候补及中二至中四插班旧轮次；不是 2027/28 DP 申请消息。", sourceType: "school-official", academicYear: "截至 2026-10-21 的公告索引", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 中一候补旧轮次消息", url: "https://stpeter.edu.hk/tc/news_detail.php?cid=1&id=409", scope: "核派位后补缺轮次；与 DP 不同且不得外推 2027/28。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-17" },
    { label: "校方：入学申请页", url: "https://stpeter.edu.hk/tc/content.php?wid=165", scope: "核当前链接为 2026/27 中二至中四插班资料，非 2027/28 中一申请。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "家校会：明愛莊月明中學 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=229", scope: "核同为南区资助天主教男女校、2025/26 中一班数、授课语言、选修路径与列示收费；不推断 2027/28 录取机会。", sourceType: "school-profile", academicYear: "2025/26 学年；2026 年 9 月中一派位说明", checkedOn: "2026-10-17" },
    { label: "家校会：余振強紀念第二中學 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=421", scope: "核同为南区资助天主教男女校、2025/26 中一班数、授课语言、选修路径与列示收费；不推断 2027/28 录取机会。", sourceType: "school-profile", academicYear: "2025/26 学年；2026 年 9 月中一派位说明", checkedOn: "2026-10-17" },
    { label: "家校会：香港南区 2025/26 学校名单（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_list.php?district_id=4&frmMode=pagebreak&lang_id=2&li_id=2", scope: "核三校本区、资助、天主教、男女校身份；个人统一派位资格与当届校网另核。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "校方：2026 珊瑚复育探索工作坊", url: "https://stpeter.edu.hk/en/album_detail.php?cid=1&id=421", scope: "核 2026-08-20 报道：中学生物、地理及 STEAM 部门为高中生物与地理学生合办工作坊，到海洋公园珊瑚培育设施并参加中大生命科学学院珊瑚学院工作坊；不外推为全校参与或常设课程。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },
    { label: "校方：2026 House Day 及委员宣誓", url: "https://stpeter.edu.hk/en/album_detail.php?cid=1&id=425", scope: "核 2026-09-17 House Day 活动，包括 House 委员宣誓、圣人及传统介绍和破冰活动；单次活动不保证每年形式、个人参与资格或名额。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },
    { label: "校方：当前主页及最新消息索引", url: "https://stpeter.edu.hk/tc/index.php", scope: "2026-10-21 重核，首页可见 2026/27 中一候补及中二至中四插班旧轮次入口；未见 2027/28 中一 DP 细则。只陈述所查栏目现况。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "HK Tutor Link：Banding 估算", url: "https://hktutorlink.hk/secondary-schools/en/st-peter-s-secondary-school-d6d3726", scope: "页面列 2025 年约 Band 2C–2B；为非官方估算，不是教育局评级或学生派位组别。", sourceType: "third-party-estimate", academicYear: "2025 估算", checkedOn: "2026-10-21" },
    { label: "MySchool：历史 Banding 估算", url: "https://www.myschool.hk/secondary-school/St.-Peter%27s-Secondary-School", scope: "页面列 2022 年 Band 3A；旧年度估算与近年第三方页面不同，不当作当前共识。", sourceType: "third-party-estimate", academicYear: "2022 估算", checkedOn: "2026-10-21" },
    { label: "SchoolDays：Banding 概括估算", url: "https://www.schooldays.com.hk/secondary/%E8%81%96%E4%BC%AF%E5%A4%9A%E7%A5%BF%E4%B8%AD%E5%AD%B8", scope: "页面概括列 Band 3；无细分字母或完整计算口径，与 HK Tutor Link 的 Band 2C–2B 估算并列显示。", sourceType: "third-party-estimate", checkedOn: "2026-10-21" },
    { label: "教育局：2025/2027 SSPA 常见问题（一般事项）", url: "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_SC.pdf", scope: "核 2025/2027 周期（适用于 2027 年 9 月升中）的一般派位事项；不能替代学校 2027/28 校本招生细则。", sourceType: "government", academicYear: "2025/2027 派位周期", checkedOn: "2026-10-21" },
    { label: "教育局：2024/2026 派位组别机制 FAQ", url: "https://www.edb.gov.hk/attachment/sc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_CA_SC.pdf", scope: "解释按经调整校内成绩划分派位组别，并明确单凭校内成绩／名次及往届同校表现不能精准预测个人组别；作为制度解释，不代表 2027/28 校本招生资料。", sourceType: "government", academicYear: "2024/2026 派位周期机制说明", checkedOn: "2026-10-21" },
    { label: "教育王国：2021 年跨区选校讨论串", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3853736", scope: "旧升中讨论中有家长把圣伯多禄列作跨区志愿及他人个人推测；不是在读家长口碑样本，不代表当前校风或录取机会。", sourceType: "parent-discussion", academicYear: "2021 年讨论", checkedOn: "2026-10-21" },
    { label: "am730：教师去留与校内沟通争议报道", url: "https://www.am730.com.hk/article/608090", scope: "2025-10-13 报道引述自称教师群体意见、校方通告及教育局回复；各方说法分开呈现，未发现公开调查结论，不推论因果或整体教学质量。", sourceType: "media-report", academicYear: "2025 年报道", checkedOn: "2026-10-21" },
    { label: "星岛头条：教师去留争议报道", url: "https://www.stheadline.com/edu-news/3507824/%E8%81%96%E4%BC%AF%E5%A4%9A%E7%A5%BF%E4%B8%AD%E5%AD%B8%E6%95%99%E5%B8%AB%E6%8D%AE%E5%A0%B1%E5%87%BD%E6%95%99%E8%82%B2%E5%B1%80%E5%86%80%E6%8F%9B%E6%A0%A1%E9%95%B7-%E6%8C%874%E5%B9%B4%E9%80%BE30%E4%BA%BA%E9%9B%A2%E8%81%B7-%E5%BD%B1%E9%9F%BF%E6%95%99%E5%AD%B8%E8%B3%AA%E7%B4%A0", scope: "2025-10-13 报道来信、校方及教育局回应；指称不作为已证实结论。", sourceType: "media-report", academicYear: "2025 年报道", checkedOn: "2026-10-21" },
  ],
"carmel-alison-lam-foundation-secondary": [
    { label: "教育局：2025/2027 中学学位分配办法", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027-01-04 至 01-18 自行分配申请、03-31 正取通知与 07-06 派位结果；校本要求另核。", sourceType: "government", academicYear: "2027 年入学", checkedOn: "2026-10-21" },
    { label: "教育局：2026/27 自行分配学位手册（葵青区）", url: "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/DPHB-NT1_KWT-2026.pdf", scope: "学校编号 306 列 2026/27 中一自行分配学额 40 个及统一申请日期；是历史轮次，不代表 2027/28。", sourceType: "government", academicYear: "2026/27 入学", checkedOn: "2026-10-21" },
    { label: "家校会：迦密爱礼信中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=144", scope: "核身份、班级、科目和语言、旧轮次 40/25/15/20 权重、2025/26 收费及学生支援；不含可核分母的 2026 DSE 全届结果。", sourceType: "school-profile", academicYear: "2025/26 学年；2026/27 旧轮次", checkedOn: "2026-10-21" },
    { label: "家校会：迦密爱礼信中学 2026/27 拟开设科目", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=3&sch_id=144", scope: "核家校会概览所列 2026/27 拟开设初高中科目及授课语言；“拟开设”不代表最终开班，不能外推至 2027/28。", sourceType: "school-profile", academicYear: "拟开 2026/27 学年", checkedOn: "2026-10-21" },
    { label: "家校会：中华传道会安柱中学 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=432", scope: "第 7 章核葵青区资助男女校身份、逐科教学语言、选修及 2025/26 列示收费；不推算 2027/28 录取机会。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：中华传道会李贤尧纪念中学 2025/26 概览 PDF（比较背景）", url: "https://preview.chsc.hk/pdf/ssp2025/433_1.pdf", scope: "第 7 章核葵青区资助男女校身份、初高中逐科教学语言、选修及 2025/26 列示收费；不推算 2027/28 录取机会。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "校方：2026/27 中一自行分配旧轮次页面", url: "https://sites.google.com/ge.calfss.edu.hk/s1-admission/home", scope: "核旧轮次 2026-01-02 至 01-16 申请、03-14 面谈和所有申请者均有面谈机会；本轮重查后仍未见 2027/28 校本细则，不代表确认其他渠道无公告。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-21" },
    { label: "校方：最新消息与校长通讯", url: "https://www.calfss.edu.hk/index/index12.aspx", scope: "核 2026-09-17 校监交接消息与 2026-10-05 校长通讯公告；不将领导变动推论为政策或成绩变化。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "校方：2026 资讯日页面", url: "https://sites.google.com/ge.calfss.edu.hk/info2023", scope: "核页面列 2026-12-05 资讯日及报名链接；未据此推断当前名额或报名状态。", sourceType: "school-official", academicYear: "2026-27 学年", checkedOn: "2026-10-21" },
    { label: "家校会：2026 资讯日记录", url: "https://www.chsc.hk/show_sch_open_day.php?id=5169&lang_id=2", scope: "核活动日期 2026-12-05、10:00–16:30 及活动说明；活动信息由校方提供，具体登记须查校方页面。", sourceType: "school-profile", academicYear: "2026 年活动", checkedOn: "2026-10-21" },
    { label: "SchoolDays：迦密爱礼信中学 Banding 估算", url: "https://www.schooldays.com.hk/secondary/0970ec4d", scope: "页面列 Band 1C；独立第三方估算，与若干 Band 2C 平台不同，不视为官方评级。", sourceType: "third-party-estimate", academicYear: "页面现值；核对于 2026-10-21", checkedOn: "2026-10-21" },
    { label: "SchoolBanding：迦密爱礼信中学 Banding 页面", url: "https://schoolbanding.com/s/carmel-alison-lam-foundation-secondary-school", scope: "页面列 Band 2C、全港排名第 246；排名与等级为平台估算，无公开官方口径验证。", sourceType: "third-party-estimate", academicYear: "2026 页面现值", checkedOn: "2026-10-21" },
    { label: "HKSchoolFacts：迦密爱礼信中学 Banding 估算", url: "https://hkschoolfacts.com/secondary-schools/carmel-alison-lam-foundation-secondary-school", scope: "页面列 Band 2C并声明参考坊间公开估算；非官方评级。", sourceType: "third-party-estimate", academicYear: "页面现值", checkedOn: "2026-10-21" },
    { label: "HKSchool.top：迦密爱礼信中学 Banding 页面", url: "https://hkschool.top/schools/639", scope: "页面列 Band 2B–2C（2024 年口径）；平台估算，不代表当前官方或家长共识。", sourceType: "third-party-estimate", academicYear: "页面标注 2024 口径", checkedOn: "2026-10-21" },
    { label: "教育王国：葵青区升中讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3846931", scope: "2020 年匿名家长讨论学校估级、通勤与个别升中经历；看法不一、没有分母或可核学生身份，不代表当前共识。", sourceType: "parent-discussion", academicYear: "2020 年讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：荔景迦密选校讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2848301", scope: "2014 年个别家长转述学校环境和通勤经验；二手、过时，权重很低。", sourceType: "parent-discussion", academicYear: "2014 年讨论", checkedOn: "2026-10-21" },
    { label: "Baby Kingdom：迦密爱礼信与伍若瑜选校讨论", url: "https://www.baby-kingdom.com/forum.php?mod=viewthread&tid=23684528", scope: "2023 年讨论主题提及本校；可见留言不足以构成直接在读经验或口碑样本，不计为好评／差评。", sourceType: "parent-discussion", academicYear: "2023 年讨论", checkedOn: "2026-10-21" },
    { label: "HK01：校长笔记“中中”人，学英文", url: "https://global.hk01.com/中小学学校园/60278867/校长笔记-中中-人-学英文", scope: "校长署名专栏分享中文中学学生学习英语的看法；属单一媒体观点，不代表独立评估或家长评价。", sourceType: "media-report", academicYear: "刊发年份待核", checkedOn: "2026-10-21" },
  ],
"st-pauls-convent-secondary": [
    { label: "校方：2027/28 中一资讯日与 STEM 展示会公告", url: "https://spcs.edu.hk/w/category/admissions/", scope: "校方招生分类页列 2026-10-10 13:00–16:00 举行资讯日暨 STEM 展示会、14:30 简介会及 2026-10-06 17:00 登记截止；按 2026-10-18 核对日标记为已举行。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 中一入学页", url: "https://spcs.edu.hk/w/2026/10/10/%E4%B8%AD%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B2027-2028%E5%B9%B4-2/", scope: "核直资女校独立申请、2026-12-01 17:00 截止；页面称所有在校生均可申请减免、按家庭经济情况评估，同时链接的自评平台仍标 2026/27，故不据此推断新届具体档位。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-19" },
    { label: "校方：2027/28 中一申请注意事项 PDF", url: "https://spcs.edu.hk/w/wp-content/uploads/2026/10/2027-28_Notes_on_Application_Chinese.pdf", scope: "核材料、两轮面谈、30/20/50 甄选、拟定 HK$32,500 年学费及待教育局批核条件；说明学费减免申请表须在学生入读后下载及申请；未列对外学额或新年度减免档位。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-19" },
    { label: "校方：中学部校长招聘公告", url: "https://spcs.edu.hk/w/2026/10/10/st-pauls-convent-school-9/", scope: "核校方于 2026-10-10 招聘中学部校长、职位生效日 2027-09-01；属招聘而非任命公告，未公布获选人及交接安排。", sourceType: "school-official", academicYear: "2027-09-01 起生效", checkedOn: "2026-10-18" },
    { label: "家校会：圣保禄学校 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=273", scope: "核身份、六班结构、旧学费、课程与授课语言、路线和学生支援；不作为新届学费。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-18" },
    { label: "家校会：德望学校 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=50", scope: "第 7 章核直资天主教女校身份、课程语言、DSE 路线及 2025/26 列示学费；不作新届报价。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "家校会：拔萃女书院 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=3", scope: "第 7 章核直资女校身份、DSE／GCE AL 路线与 2025/26 列示学费；不作新届报价。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "拔萃女书院：2027/28 中一招生", url: "https://www.dgs.edu.hk/admissions/s1-application", scope: "第 7 章核 2027/28 中一申请已截止、中五 DSE／GCE AL 选择及当前年费；页面列入围通知早于补件截止的时间次序不明，需向校方确认；学费以页面标示年份为准。", sourceType: "school-official", academicYear: "2027/28 入学；当前学费另列", checkedOn: "2026-10-18" },
    { label: "校方：2024/25 校务报告 PDF", url: "https://spcs.edu.hk/w/wp-content/uploads/2025/11/School-Report-2024-25.pdf", scope: "直接核对原件印刷第 9、36、38 页：2025 HKDSE 63 名、GCE IAS F5 82 名／IAL-GCE F6 68 名、IGCSE 132 名及成绩；分别记录印刷第 9 与第 38 页升学比例口径差异，不合并统计。", sourceType: "school-official", academicYear: "2024/25 学年；2025 考试", checkedOn: "2026-10-19" },
    { label: "校方：2025/26 学校计划 PDF", url: "https://spcs.edu.hk/w/wp-content/uploads/2025/11/School-Plan-2025-26.pdf", scope: "核 IGCSE、HKDSE、GCE／IAL、BTEC 及应用学习的课程规划；不据此保证个人转轨。", sourceType: "school-official", academicYear: "2025/26 学年", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 暂行奖学金计划（2027/28 发放）", url: "https://www.spcs.edu.hk/feeremission/scholarship_scheme.htm", scope: "核新生、小学部升中一学生的学术奖学金评审名次档及非学术教师提名规则；页面标明 Tentative，适用方法、奖项能否叠加及与减免关系须确认。", sourceType: "school-official", academicYear: "2026/27 暂行计划；注明 2027/28 发放", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 暂行学费减免规则", url: "https://www.spcs.edu.hk/feeremission/feeremission_scheme.htm", scope: "核已入读学生申请资格、家庭评估和临时困难机制；2027/28 新规则待核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "校方：2026 GCE／IAL 高分消息首页", url: "https://spcs.edu.hk/", scope: "核 2 人 6A*、11 人 5A*、16 人 4A* 的校方消息；总考生数及组别互斥性未列。", sourceType: "school-official", academicYear: "2026 GCE／IAL", checkedOn: "2026-10-18" },
    { label: "政府：教育局不公开中一入学组别排名的说明", url: "https://www.info.gov.hk/gia/general/201206/06/P201206060276.htm", scope: "说明 Band 属中一派位组别资料，教育局不公开学校排名；用于限定第三方 Band 估值的性质，不作学校质量判断。", sourceType: "government", checkedOn: "2026-10-21" },
    { label: "Big Exam：SPCS 2025 Band 粗略估值", url: "https://dse.bigexam.hk/en/ssp/school/273", scope: "第三方页面把学校粗略估为 Band 1A；算法与完整原始分母未公开，仅作非官方参考。", sourceType: "third-party-estimate", academicYear: "2025 估值", checkedOn: "2026-10-21" },
    { label: "HK Tutor Link：SPCS 2025 Band 估值", url: "https://hktutorlink.hk/secondary-schools/en/st-paul-s-convent-school-22cf514", scope: "第三方页面列 2025 Band 1A 估值；算法与完整原始分母未公开，仅作非官方参考。", sourceType: "third-party-estimate", academicYear: "2025 估值", checkedOn: "2026-10-21" },
    { label: "Schoolbanding：2026 第三方 Band 列表", url: "https://schoolbanding.com/rankings/2026", scope: "第三方列表将 SPCS 列为 Band 1A；排名指标与全校多课程表现的可比性未核实，不作官方评级。", sourceType: "third-party-estimate", academicYear: "2026 估值", checkedOn: "2026-10-21" },
    { label: "教育王国：SPCS 中一讲座讨论（2018）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3711671", scope: "匿名申请者讨论简介会与面谈准备；较旧且身份未独立核实，不代表在读体验或当届招生规则。", sourceType: "parent-discussion", academicYear: "2018 讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：2025 中一派位结果讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&page=12&tid=3885016", scope: "匿名用户转贴部分小学升中去向；非 SPCS 家长评价，原始分母需回到小学年报核对。", sourceType: "parent-discussion", academicYear: "2025 讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：2025 DSE 成绩讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3885382", scope: "匿名用户讨论公开成绩及排名口径；不能作为 SPCS 成绩或整体口碑证据。", sourceType: "parent-discussion", academicYear: "2025 讨论", checkedOn: "2026-10-21" },
  ],
"hkfyg-lee-shau-kee-secondary": [
    { label: "校方：2027/28 中一申请日程", url: "https://www.hlc.edu.hk/pre-s1-admission", scope: "核 2026-10-30 14:00 至 12-14 10:00 网上申请、12-19 面谈、2027-01-20 面谈结果和 04-30 最终通知；未列学额与评分权重。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 中一申请内容与所需文件 PDF", url: "https://www.hlc.edu.hk/sites/default/files/sites/default/files/%E4%B8%AD%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E5%85%A7%E5%AE%B9.pdf", scope: "核现届小六网上申请资格、必需与可选文件、补件截止；未列招生学额、评分权重及完整面谈形式。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：2026 中一入学简介会安排 PDF", url: "https://www.hlc.edu.hk/sites/default/files/sites/default/files/%E7%B0%A1%E4%BB%8B%E6%9C%83%E5%85%A7%E5%AE%B9.pdf", scope: "核 2026-11-15 实体场次、登记时段、名额和线上安排；简介会登记不等同中一申请。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 收费页", url: "https://www.hlc.edu.hk/tuition-fees", scope: "复核时页面标题已更新为 Tuition Fees (2026-2027)，列本地及非本地生各路线费用；教育局收费证明书注明相关金额自 2026-09-01 生效，页面底部历史拟议价不作现价。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "教育局：李兆基书院收费证明书", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/568287.pdf", scope: "正式收费证明书列出本地及非本地 DSE／GCE A-Level 课程收费，并注明自 2026-09-01 生效；这是 2026/27 收费依据。", sourceType: "government", academicYear: "2026/27 学年；2026-09-01 生效", checkedOn: "2026-10-19" },
    { label: "校方：课程及 DSE／IAL 路线", url: "https://www.hlc.edu.hk/curriculum-overview", scope: "核 DSE 科目和 M1／M2、中四衔接及中五至中六 Pearson Edexcel IAL 科目；实际开班与跨届规则待核。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：班级结构与语言政策", url: "https://www.hlc.edu.hk/class-structure-and-language-policy", scope: "核五班、每班不多于 33 人及各科授课语言与初中分组；不作为招生学额。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2024/25 学校年报 PDF", url: "https://www.hlc.edu.hk/sites/default/files/download/HLC%20Annual%20School%20Report%202024-25.pdf", scope: "核 789 人／86 名中六旧学年在读、2025 DSE 科目平均及 IAL 成绩；考试分路线及逐科分母未列。", sourceType: "school-official", academicYear: "2024/25 学年；2025 考试", checkedOn: "2026-10-18" },
    { label: "校方：2026 HKDSE 证书领取通知（非成绩表）", url: "https://www.hlc.edu.hk/latest_new/collecting-2026-hkdse-certificate-%E9%A0%98%E5%8F%962026%E5%B9%B4%E9%A6%99%E6%B8%AF%E4%B8%AD%E5%AD%B8%E6%96%87%E6%86%91%E8%A9%A6%E8%AD%89%E6%9B%B8", scope: "核 2026-10-14 证书领取消息；该通知不提供考试成绩、分母或升学统计。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-18" },
    { label: "家校会：2025/26 中学概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=1&sch_id=380", scope: "核学校身份、五班和上一学年学费历史快照；学费与 2026-09-01 生效的教育局收费证明分开标注。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-19" },
    { label: "校方：中一入学奖学金申请须知及申请表（文件未标学年）", url: "https://www.hlc.edu.hk/sites/default/files/Secondary%20One%20Entrance%20Scholarship%20Application%20Guidelines%20%26%20Application%20Form%20%E4%B8%AD%E4%B8%80%E5%85%A5%E5%AD%B8%E7%8D%8E%E5%AD%B8%E9%87%91%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5%E5%8F%8A%E7%94%B3%E8%AB%8B%E8%A1%A8.pdf", scope: "核 S1 入学奖学金名次金额、申请条件、奖学金与减免可并行申请及申请日；原文件未标适用学年，2027/28 适用性、名额与资金待校方确认。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 学费减免指引 PDF", url: "https://www.hlc.edu.hk/sites/default/files/Guidelines%20on%20Application%20for%20Fee%20Remission_2627.pdf", scope: "核注册资格、全免／半免、AFI 门槛例外和每月申请程序；2027/28 另核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "校方：学校计划与报告索引", url: "https://www.hlc.edu.hk/school-plans-and-reports", scope: "核目前可见 2024/25 年报及 2025/26 计划；不以计划代替 2026 届考试统计。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "香港管理专业协会李国宝中学：2026/27 学费（比较背景）", url: "https://www.hkmadavidli.edu.hk/admission/school_fees/", scope: "第 7 章核直资男女校中一 HK$40,570 年费；不可当作 IAL 路线总费用或 2027/28 报价。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-17" },
    { label: "香港管理专业协会李国宝中学：课程（比较背景）", url: "https://www.hkmadavidli.edu.hk/academic/curriculum/", scope: "第 7 章核 DSE 与 Integrated Curriculum／IAL 路线；入轨和实际开班另核。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "家校会：香港神托会培基书院 2025/26 概览（比较背景）", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=382", scope: "第 7 章核沙田直资男女校身份、2025/26 中一和高中非本地课程年费；不作 2027/28 报价。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "香港神托会培基书院：非本地课程（比较背景）", url: "https://www.spkc.edu.hk/non-local-curriculum/", scope: "第 7 章核 Pearson Edexcel IAL 科目，不把单科字段当全部路线学额或开班保证。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：中四至中六课程简介（2025/26）", url: "https://hlc.edu.hk/sites/default/files/20251003_Introduction%20of%20S4-6%20Curriculum.pdf", scope: "第 9 页列 2025/26 IAL 申请的中三英文、数学及科学门槛（各至少 50%），超额时总平均占 40%、数学及科学占 60%；不外推为 2027/28 已确认规则。", sourceType: "school-official", academicYear: "2025/26 课程说明", checkedOn: "2026-10-21" },
    { label: "教育局：立法会答复及 Band 资料公开原则", url: "https://www.edb.gov.hk/attachment/en/about-edb/press/legco/replies-to-fc/18-19-EDB-2-e1.pdf", scope: "说明派位组别属于学生资料，官方不公开学生或学校 Band 排名；报告把第三方估值明确标为坊间参考。", sourceType: "government", checkedOn: "2026-10-21" },
    { label: "Big Exam：李兆基书院 Band 估值", url: "https://dse.bigexam.hk/en/ssp/school/380", scope: "页面估作 2025 Band 1C；非官方估值，算法和独立数据来源未充分披露，不代表录取概率或直资校实际生源组别。", sourceType: "third-party-estimate", academicYear: "2025 估值", checkedOn: "2026-10-21" },
    { label: "HK Tutor Link：李兆基书院 Band 估值", url: "https://hktutorlink.hk/secondary-schools/en/hkfyg-lee-shau-kee-college-56a9997", scope: "页面估作约 Band 1C；非官方估值，与其他平台数据是否独立未能确认。", sourceType: "third-party-estimate", academicYear: "2025 估值", checkedOn: "2026-10-21" },
    { label: "Schoolbanding：李兆基书院 Band 估值", url: "https://www.schoolbanding.com/s/hkfyg-lee-shau-kee-college", scope: "页面标 2026 Band 1C；非官方估值，排名算法和样本口径有限。", sourceType: "third-party-estimate", academicYear: "2026 估值", checkedOn: "2026-10-21" },
    { label: "SchoolDays：李兆基书院 Band 估值", url: "https://www.schooldays.com.hk/secondary/%E9%A6%99%E6%B8%AF%E9%9D%92%E5%B9%B4%E5%8D%94%E6%9C%83%E6%9D%8E%E5%85%86%E5%9F%BA%E6%9B%B8%E9%99%A2", scope: "页面估作 Band 1B，并称依据授课语言等规则推定；非官方、其方法不等同教育局校本评级。", sourceType: "third-party-estimate", checkedOn: "2026-10-21" },
    { label: "MySchool.hk：李兆基书院学校概览", url: "https://www.myschool.hk/secondary-school/HKFYG-Lee-Shau-Kee-College", scope: "页面概括为 Band 1 而未细分；只作宽泛的第三方参照，不支持 1B 或 1C 定论。", sourceType: "third-party-estimate", checkedOn: "2026-10-21" },
    { label: "教育王国：李兆基书院课堂与家长讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3878910", scope: "2023-11 至 2024-03 匿名讨论含自述中一家长的课堂体验、分组意见及其他相反留言；身份和样本未核实，不代表当前全体家长。", sourceType: "parent-discussion", academicYear: "2023-2024 讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：2026/27 中一候补讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3886444", scope: "2026-02 少量匿名申请者自述收到候补通知；不推算取录率、候补范围或最终入读率。", sourceType: "parent-discussion", academicYear: "2026/27 申请讨论", checkedOn: "2026-10-21" },
    { label: "星岛头条：2026/27 中一简介会报道", url: "https://www.stheadline.com/edu-insights/3520567/%E6%9D%8E%E5%85%86%E5%9F%BA%E6%9B%B8%E9%99%A2%E4%B8%AD%E4%B8%80%E7%B0%A1%E4%BB%8B%E6%9C%83-%E9%80%BE1600%E5%AE%B6%E9%95%B7%E5%8F%96%E7%B6%93-%E6%A0%A1%E9%95%B7%E6%89%80%E6%9C%89%E7%94%B3%E8%AB%8B%E4%BA%BA%E7%8D%B2%E5%AE%89%E6%8E%92%E9%9D%A2%E8%A9%A6", scope: "2025-11-24 报道上一届简介会到场与网播人数、约 150 个 S1 学额及校长对当届面试甄选安排的说明；属往届招生背景，不等于 2027/28 学额、申请人数或录取概率。", sourceType: "media-report", academicYear: "2026/27 入学报道", checkedOn: "2026-10-21" },
  ],
"stewards-pooi-kei-secondary": [
    { label: "教育局：培基书院 2026/27 收费证明书", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/558567.pdf", scope: "2026-09-01 生效；核本地课程中一至中六各级年费，以及本地生中五／中六非本地课程各 HK$50,400。不能推作 2027/28 报价，亦不能混同非本地学生收费。", sourceType: "government", academicYear: "2026/27 学年", checkedOn: "2026-10-20" },
    { label: "教育局：派位组别不等于学校等级", url: "https://www.edb.gov.hk/attachment/en/about-edb/press/legco/replies-to-fc/EDB-2-e1.pdf", scope: "教育局财政委员会答复指出把学生或中学称作 Band 1/2/3 属误解；学校 Band 1A/1B 为坊间估计而非教育局分类。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "教育局：培基书院列于 2025/2027 非参加派位直资名单", url: "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/NDSS_List_SSPA2027.pdf", scope: "第 7 页列培基书院；说明接受该类直资学位并交承诺书及小六学生资料表正本后放弃其他政府资助学位。只用于说明一般制度，个别申请以当届表格和教育局通知为准。", sourceType: "government", academicYear: "2025/2027 SSPA 周期", checkedOn: "2026-10-21" },
    { label: "大考：培基书院 2026 Band 估计", url: "https://dse.bigexam.hk/zh-hk/ssp/school/382", scope: "坊间估计 Band 1C–1B；为非官方学校定位，不能用作学生派位组别、录取概率或大学去向结论。", sourceType: "third-party-estimate", academicYear: "2026 估计", checkedOn: "2026-10-20" },
    { label: "HK Tutor Link：培基书院 Band 估计", url: "https://hktutorlink.hk/secondary-schools/en/stewards-pooi-kei-college-821d143", scope: "平台标为 Band 1C–1B；评级方法及与其他平台的数据独立性未能充分核实，作为分歧记录而非独立投票。", sourceType: "third-party-estimate", academicYear: "2025 估计", checkedOn: "2026-10-20" },
    { label: "SchoolBanding：培基书院 2026 Band 估计", url: "https://www.schoolbanding.com/s/stewards-pooi-kei-college", scope: "坊间估计 Band 1C–1B；可能与其他排名平台共享底层资料，不作为完全独立验证。", sourceType: "third-party-estimate", academicYear: "2026 估计", checkedOn: "2026-10-20" },
    { label: "香港经济日报 TOPSchool：培基书院资料", url: "https://topschool.hket.com/secondary-school/370", scope: "页面标为 1C；资料展示与评级方法未见完整说明，只作非官方定位参照。", sourceType: "media-report", checkedOn: "2026-10-20" },
    { label: "SchoolDays：培基书院 Band 估计", url: "https://www.schooldays.com.hk/secondary/afd7ac4a", scope: "页面现列 Band 1C；其估算基于教学语言等代理指标，不能视为学校官方等级或独立验证。", sourceType: "third-party-estimate", checkedOn: "2026-10-21" },
    { label: "教育王国：2018 年升中家庭讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3713251", scope: "个别用户称同年入读学生功课适中、上学开心；匿名且年代较早，仅作访校线索。", sourceType: "parent-discussion", academicYear: "2018 年匿名讨论", checkedOn: "2026-10-20" },
    { label: "教育王国：2019 年培基招手区", url: "https://www.edu-kingdom.com/forum.php?archiver=1&mod=viewthread&page=2&tid=3746089", scope: "匿名／自称录取或在读家庭谈适应、功课及教师体验；身份和个案不能独立核实，不代表现届口碑共识。", sourceType: "parent-discussion", academicYear: "2019 年匿名讨论", checkedOn: "2026-10-21" },
    { label: "教育王国：2014 年在读家庭交流", url: "https://m.edu-kingdom.com/post.php?fid=715&page=98&tid=2379568", scope: "不同自称在读家庭对纪律、功课及综合人文资料搜集的体验相反；属于历史匿名个案，不代表当前校风或平均功课量。", sourceType: "parent-discussion", academicYear: "2014 年匿名讨论", checkedOn: "2026-10-20" },
    { label: "校方：2027/28 中一独立申请门户", url: "https://eadmission.spkc.edu.hk/", scope: "2026-10-21 重核：门户仍明确接受 2027/28 中一申请、须通过 eAdmission 提交，截止 2026-12-10，并显示报名入口；未代家长实际提交申请。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 中一申请", url: "https://www.spkc.edu.hk/s1-admission%E4%B8%AD%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B-2027/", scope: "核 2026-10-20 至 12-10 申请、11-21/22 简介日、2027-01 面谈与甄选因素；并核当届程序页称综援/学生资助处受助学生符合减免资格、其他有需要者可申请。未列学额、配分及新届减免门槛。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 中二至中四插班须知", url: "https://www.spkc.edu.hk/s2-s4-admission/", scope: "核当前年度 S2–S4 插班须经 eAdmission、获选者面试及/或中英数笔试、甄选因素、费用减免及中四课程说明；未列权重、下一轮日期或空缺。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 中二至中四 eAdmission 状态", url: "https://eadmission.spkc.edu.hk/site/S2to4/2025", scope: "截至 2026-10-21 当前门户显示 2026/27 S2–S4 申请已截止；不推断下一轮开放日期或申请机会。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "香港青年协会李兆基书院：2026/27 年费（比较背景）", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/568287.pdf", scope: "第 7 章以教育局收费证明核本地生中一至中三及中五至中六 IAL 路线费用；2027/28 另待新证明。", sourceType: "government", academicYear: "2026/27 学年", checkedOn: "2026-10-19" },
    { label: "香港青年协会李兆基书院：课程（比较背景）", url: "https://www.hlc.edu.hk/curriculum-overview", scope: "第 7 章核 DSE 与中四衔接、中五至中六 Pearson Edexcel IAL 科目；实际入轨另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "香港管理专业协会李国宝中学：2026/27 年费（比较背景）", url: "https://www.hkmadavidli.edu.hk/admission/school_fees/", scope: "第 7 章核直资男女校中一 HK$40,570 年费；未能由此推算 IAL 总费用。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "香港管理专业协会李国宝中学：课程（比较背景）", url: "https://www.hkmadavidli.edu.hk/academic/curriculum/", scope: "第 7 章核 DSE 与 Integrated Curriculum／IAL 及科目结构；开班与入轨另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：中一入学 FAQ", url: "https://www.spkc.edu.hk/faq/", scope: "核面谈、直资承诺、课程语言及支援；约 205 学额未标学年，联系小学中英文表述不一，六班资料与概览表不一。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "家校会：2025/26 中学概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=382", scope: "核身份、授课语言、班数表与备注冲突、2025/26 本地及非本地路线年费、学生支援。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-18" },
    { label: "校方：非本地课程", url: "https://www.spkc.edu.hk/non-local-curriculum/", scope: "核 Pearson Edexcel IAL 数学、化学、生物、物理及单科页面的 30 人字段；不作为总学额。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2025/26 中一收费", url: "https://www.spkc.edu.hk/school-fee/", scope: "只作为 2025/26 历史收费：S1 年费 HK$30,900、10 期；现价参考教育局 2026/27 收费证明。", sourceType: "school-official", academicYear: "2025/26 学年", checkedOn: "2026-10-18" },
    { label: "校方：学生奖助学金", url: "https://www.spkc.edu.hk/student-financial-assistance-and-scholarship-scheme-sfaa/", scope: "核约 200 万港元预算、援助种类及 2026/27 AFI 门槛；个人获批及 2027/28 规则另核。", sourceType: "school-official", academicYear: "2026/27 门槛", checkedOn: "2026-10-18" },
    { label: "校方：2026 HKDSE 成绩", url: "https://www.spkc.edu.hk/spkc-diary/commending-the-dedication-and-efforts-of-our-2026-hkdse-candidates/", scope: "核 332A+2、22222、科目与英文比例；考生、报考项及最终去向分母未列。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-18" },
    { label: "考评局：学士课程 332A 核心要求", url: "https://www.hkeaa.edu.hk/tc/hkdse/faq/q2/", scope: "核中文及英文第 3 级、数学第 2 级、公民科达标的 332A 定义，并说明大学及具体课程有附加选修科条件。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "考评局：332A 加选修科统计定义", url: "https://www.hkeaa.edu.hk/DocLibrary/HKDSE/exam_report/Examination_Statistics/2026_6SCH0123-DSE2025-CLASS-6A-SSR.pdf", scope: "核 {332A}n+ 表示核心达 332A 且一门选修科达第 n 级或以上；用于拆解校方 332A+2 写法，不把门槛当录取率。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "专上教育资讯平台：副学位五科入学要求", url: "https://www.cspe.edu.hk/sc/sssdp/faqs/sub-degree-programmes/", scope: "核副学位入学要求为包括中文及英文在内五科达第 2 级或以上；达到门槛不等于取录。", sourceType: "government", academicYear: "2026/27 学年", checkedOn: "2026-10-20" },
    { label: "校方：SPKC Diary 2026 年 8 月索引", url: "https://www.spkc.edu.hk/photo-story/page/2/", scope: "索引列 2026-08-13 IAS／IAL／GCE 成绩公告；对应届别正文 URL 与成绩数字尚未复核，报告不引用比例。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 运动季学生运动员会议（2026-09-30）", url: "https://www.spkc.edu.hk/spkc-diary/setting-the-standard-of-excellence-spkc-student-athlete-conference-2026-2027/", scope: "核校方所报开季会议逾 400 名运动员、15 支校队，以及上一季逾 50 项 HKSSF 校际比赛；为活动公告，不推作全校参与率或成绩。", sourceType: "school-official", academicYear: "2026/27 运动季；活动日期 2026-09-30", checkedOn: "2026-10-18" },
  ],
"victoria-shanghai-academy-secondary": [
    { label: "校方首页：2026 届大学 offer 宣传数据", url: "https://www.vsa.edu.hk/", scope: "核 Class of 2026 逾 550 个 offer、70% offer 来自世界前 100 大学；不是独立学生数、接受率或最终注册统计。", sourceType: "school-official", academicYear: "2026 届大学 offer", checkedOn: "2026-10-18" },
    { label: "教育局：VSA 国际学校资料", url: "https://internationalschools.edb.gov.hk/en/schools/93.html", scope: "核学校性质、校址、全校规模与教育局名录口径；名录费用未标当年，不用作现价。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 申请时间线", url: "https://www.vsa.edu.hk/admissions/how-to-apply/key-dates", scope: "核 Year 2–11 将于 2026 年 11 月开放、评估另行通知、评估后一个月内通知结果；目标年级空位／截止日未列。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-21" },
    { label: "校方：申请资格及评估", url: "https://www.vsa.edu.hk/admissions/how-to-apply", scope: "核居港条件、70% 整体学位规则、Year 6–11 中英数评估、申请材料、HK$2,000 费用和结果；不当作个人保证。", sourceType: "school-official", academicYear: "2027/28 申请须按系统复核", checkedOn: "2026-10-21" },
    { label: "校方：Year 6–11 信息活动", url: "https://www.vsa.edu.hk/admissions/booking-of-school-tour-information-session", scope: "核 2027/28 中学信息活动；活动报名不是正式入学申请。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "校方：年级最低年龄", url: "https://www.vsa.edu.hk/admissions/how-to-apply/age-requirements", scope: "核 Year 6–11 最低年龄；不能机械对应本地中一至中六。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：中学 MYP／DP 课程", url: "https://www.vsa.edu.hk/learning/secondary-school", scope: "核 MYP Year 6–10、DP Year 11–12、完整文凭与单科证书；实际组合与开班待核。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：双语与教学语言", url: "https://www.vsa.edu.hk/learning/bilingualism", scope: "核 MYP 主要英语授课、中文与第三语言路径及 DP 双语期望。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：2026 IB 成绩", url: "https://www.vsa.edu.hk/learning/academic-results/myp-dp-results", scope: "校方页称 122 人参加考试、10 人 45 分、11 人各得 44 和 43 分；表列 45 分占 8.5%、40 分以上 51%、均分 39.1。10／122 与 8.5% 不合，媒体另报 9 名满分者；完整文凭人数未列。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-21" },
    { label: "校方：大学去向页面", url: "https://www.vsa.edu.hk/learning/academic-results/university-placements", scope: "页面当前正文没有 2026 届最终注册表；与首页 offer 宣传分开理解。", sourceType: "school-official", academicYear: "2026 去向待核", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 收费", url: "https://www.vsa.edu.hk/admissions/school-fees", scope: "核 Y6–12 各级学费、分期、发展金入口和额外费用；不作 2027/28 报价。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "校方：Y2–11 发展金协议", url: "https://www.vsa.edu.hk/fs/resource-manager/view/96e4f3ad-c20d-4e68-b576-02a2e917d7b3", scope: "核 HK$60,000 缴付及分段退款；官网现行收费页链接，但模板未标 2027/28，签约前复核。", sourceType: "school-official", academicYear: "协议模板；当届待核", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 财政援助", url: "https://www.vsa.edu.hk/fs/resource-manager/view/6e27115f-003c-4f78-a9be-ea00c1571f4b", scope: "核 25%–75% 减免、收入与资产审查、年度复核及紧急申请；不保证个人获批。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "校方：Year 6–11 奖学金", url: "https://www.vsa.edu.hk/admissions/scholarship-opportunities", scope: "核 Year 6–11 外部申请、四分之一/半额/全额一年学费、通常 5 月底截止及 6 月底通知，并核中英数笔试和面试；页面无适用学年，非 2027/28 保证。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：中学新生 2026/27 MacBook 要求", url: "https://mlearning.vsa.edu.hk/new-sec-students", scope: "核 Year 6 及以上须拥有并使用 MacBook、2026/27 新生设备方案；设备选择和下一届流程另核。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-18" },
    { label: "校方：学生服务与大学辅导", url: "https://www.vsa.edu.hk/student-life/student-services", scope: "核学习、语言、心理和大学申请支持；实际个案安排另核。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "南华早报：2026 届 IB 成绩报道", url: "https://www.scmp.com/news/hong-kong/education/article/3359510/55-hong-kong-students-13-schools-score-perfect-ib-marks", scope: "2026-07-06 报道称 VSA 9 人获 45 分、8 人获 44 分、平均分 39；与校方成绩页 10 人获 45 分的表述不同，需保留来源冲突，不推算完整文凭人数。", sourceType: "media-report", academicYear: "2026 IB 考试", checkedOn: "2026-10-21" },
    { label: "香港电台：2026 届 IB 成绩报道", url: "https://news.rthk.hk/rthk/en/component/k2/1861198-20260706.htm", scope: "2026-07-06 报道称 VSA 9 人获 45 分、8 人获 44 分、平均分 39；同日媒体报道不是独立考试数据审计。", sourceType: "media-report", academicYear: "2026 IB 考试", checkedOn: "2026-10-21" },
    { label: "教育王国：2024 年 IB 届别与转校讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3881733", scope: "匿名讨论用户自称曾有孩子在 VSA 就读，回忆过往 Year 8／9 转校情况；样本、届别和人数未经核实，只能作为询问同届留校人数的线索。", sourceType: "parent-discussion", academicYear: "2024 年讨论；非当前统计", checkedOn: "2026-10-21" },
    { label: "教育王国：2024 年 VSA 家长择校讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3883178", scope: "小学选校帖提及学费、入学难度、中文及 IB；教师体验有相反个人意见。非中学在读代表性调查，不据以判断整体口碑。", sourceType: "parent-discussion", academicYear: "2024 年讨论", checkedOn: "2026-10-21" },
    { label: "国际文凭组织：DP 颁发标准", url: "https://www.ibo.org/about-the-ib/what-it-means-to-be-an-ib-student/recognizing-student-achievement/about-assessment/dp-passing-criteria/", scope: "核满分 45、最低 24 分仍须满足其他科目及核心要求；用于解释 VSA 成绩口径，不推算完整文凭人数。", sourceType: "exam-authority", checkedOn: "2026-10-20" },
    { label: "教育局：私立独立学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/pis.html", scope: "第 7 章同制度比较：核 VSA、弘立与英基启新均为私立独立学校；不据此推算逐级空位。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "弘立书院：2027/28 申请公告", url: "https://academy.isf.edu.hk/index.php/news/applications-for-the-2027-28-academic-year/", scope: "第 7 章核 Grade 6–11 申请截止 2026-11-22；空位与录取结果另核。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-18" },
    { label: "弘立书院：2026/27 学费", url: "https://academy.isf.edu.hk/index.php/welcome-from-dean-of-admissions/fees-tuition/", scope: "第 7 章核 Grade 6–10 和 Grade 11–12 年费；资本安排另计。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "弘立书院：2026/27 课程及教学语言", url: "https://academy.isf.edu.hk/wp-content/uploads/2026-27-At-A-Glance.pdf", scope: "第 7 章核 Grade 6–10 MYP、Grade 11–12 DP 及逐级语言近似比例；实际选科语言依个案。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
    { label: "英基启新书院：课程", url: "https://rchk.esf.edu.hk/en/outstanding_education/curriculum/", scope: "第 7 章核 Year 7–11 MYP 与 Year 12–13 DP／CP；Year 编号不可直接对应 VSA 或弘立。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "英基启新书院：教学语言", url: "https://rchk.esf.edu.hk/parent/learning/language/", scope: "第 7 章核英语为教学语言及中文学习安排。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "英基：启新书院 2026/27 学费公告", url: "https://www.esf.edu.hk/fee-levels-for-academic-year-2026-27-esf-rc/", scope: "第 7 章核 Year 7–11／12–13 公布收费；公告注明当时仍待教育局批准，资本征费另核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-18" },
  ],
"french-international-school-secondary": [
    { label: "教育局：FIS 国际部蓝塘道校区", url: "https://internationalschools.edb.gov.hk/en/schools/97.html", scope: "核非牟利国际男女校、地点、IS 与 FS 课程区别及 SEN 容量边界；教育局条目是校区资料，不推算目标年级空位。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：四校区与年级", url: "https://www.fis.edu.hk/campuses", scope: "核 IS Jardine’s Lookout Y2–Y7、Blue Pool Road Y8–Y13，以及 FS 校区分布。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：线上申请及文件", url: "https://www.fis.edu.hk/student-application", scope: "核 2026/27–2028/29 可申请、最近三份成绩和其他材料、进入申请池条件及特殊需要申请前沟通。", sourceType: "school-official", academicYear: "2027/28 可申请；年级空位待核", checkedOn: "2026-10-21" },
    { label: "校方：招生年历", url: "https://www.fis.edu.hk/admission-calendar", scope: "核 IS Y7–Y12 与 FS 中学一般评估月份、候补和有空位才发 offer；该页无明确适用学年。", sourceType: "school-official", academicYear: "常规月份；不等于 2027/28 固定日期", checkedOn: "2026-10-21" },
    { label: "校方：国际部 IB 课程", url: "https://www.fis.edu.hk/ibdp", scope: "核 IS 英语授课、iGCSE／IBDP、Y12–13 科目与支持以及有条件的双语文凭。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：2026 考试结果及大学去向", url: "https://www.fis.edu.hk/results-university", scope: "人工核对官网图片：2026 IB 98% 通过、均分 34.5、2 人 45 分；2026 iGCSE、Bac、DNB 结果。图片未列考试分母；大学示例及 2025 offer 不等于 2026 最终入读。", sourceType: "school-official", academicYear: "2026 考试；2025 大学 offer 图片", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 学费与债券", url: "https://www.fis.edu.hk/school-fees", scope: "核 IS／FS 逐阶段学费、三／四名子女学费折扣、HK$25,000 抵扣学费确认款、必持 Debenture、HK$5,000 管理费；考试费段落属 2025/26。", sourceType: "school-official", academicYear: "2026/27 学费；2025/26 考试费", checkedOn: "2026-10-21" },
    { label: "校方：奖学金及经济支持", url: "https://www.fis.edu.hk/scholarship-financial-support", scope: "核 FS 法国政府 School Grant、IS IB 学术奖学金及公司债券支持、两学部 Fond des Amis；金额和个人资格待核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：学生支援与升学辅导", url: "https://www.fis.edu.hk/student-support-care", scope: "核跨校区健康与辅导机制、五名大学升学顾问；个案支持程度另问。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：课外活动", url: "https://www.fis.edu.hk/extracurriculars", scope: "核中学 50 多项课外活动描述；当届具体项目和收费另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：校车与校服等生活事项", url: "https://www.fis.edu.hk/school-life-essentials", scope: "核校车、校服和餐食信息入口；选定校区后核个人路线及总成本。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2026/27 返校指南", url: "https://www.fis.edu.hk/back-to-school-2026-27", scope: "核 BPR、Jardine’s Lookout、TKO 中学校区时段与返校用品要求；属于 2026/27 安排，不代表未来年度固定课表。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-18" },
    { label: "教育局：国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/is.html", scope: "第 7 章核 FIS、德瑞及 CDNIS 均为国际学校；各校课程与空位另核。", sourceType: "government", checkedOn: "2026-10-17" },
    { label: "教育局：德瑞英语部资料", url: "https://internationalschools.edb.gov.hk/en/schools/12.html", scope: "第 7 章核英语部 IGCSE／IBDP 路线与德语部 DIA 分开；名录费用未标适用学年，不作 2026/27 定价。", sourceType: "government", checkedOn: "2026-10-17" },
    { label: "加拿大国际学校：Upper School", url: "https://www.cdnis.edu.hk/en/our-programmes/upper-school/", scope: "第 7 章核 Grade 6–12、IB 与 OSSD 路径及 Grade 9–11 转学分审核。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "加拿大国际学校：2026/27 学费", url: "https://www.cdnis.edu.hk/en/admissions/tuition-fees/", scope: "第 7 章核 Grade 6–12 学费与不持债券时资本征费；资本征费注明待教育局批准。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-17" },
    { label: "加拿大国际学校：2027/28 关键日期", url: "https://www.cdnis.edu.hk/en/admissions/key-dates/", scope: "第 7 章核 Grade 6–11 申请截止 2026-12-31；不证成逐级空位或取录。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-17" },
    { label: "校方：法语部课程", url: "https://www.fis.edu.hk/french-stream", scope: "核法语部按法国国家课程走 DNB、Baccalauréat 及国际路线；不将国际部 IB 成绩套入法语部。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "国际文凭组织：完整 DP 文凭颁发标准", url: "https://www.ibo.org/about-the-ib/what-it-means-to-be-an-ib-student/recognizing-student-achievement/about-assessment/dp-passing-criteria/", scope: "核 IB 满分 45、至少 24 分及核心和学科条件；不据校方均分推算完整文凭人数。", sourceType: "exam-authority", checkedOn: "2026-10-20" },
    { label: "法国教育部：DNB 初中毕业考试", url: "https://www.education.gouv.fr/le-diplome-national-du-brevet-10613", scope: "核 2026 起 DNB 为 20 分制及初中结束文凭性质；非高中毕业率。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "法国教育部：Bac 与优等等级", url: "https://www.education.gouv.fr/reussir-au-lycee/le-baccalaureat-general-10457", scope: "核 mention bien 与 mention très bien 分数范围；考试等级不等于大学录取。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "匿名家长评论：开学安排与支持", url: "https://www.international-schools-database.com/in/hong-kong/french-international-school-of-hong-kong/reviews/3exHbd", scope: "2025-11-03 自称家长的个别体验；平台注明评论未验证，不能作为全校共识。", sourceType: "parent-discussion", checkedOn: "2026-10-21" },
    { label: "匿名评论集合：校区设施与行政", url: "https://www.international-schools-database.com/in/hong-kong/french-international-school-of-hong-kong/reviews", scope: "2024–2026 年评论中的设施、教学及行政感受仅作访校问题线索，身份与学部未核。", sourceType: "parent-discussion", checkedOn: "2026-10-21" },
    { label: "GeoExpat：FIS 與 ESF 擇校討論", url: "https://geoexpat.com/forum/71/thread370123-2.html", scope: "2026-02-03 家庭比較討論；同頁含轉述及 ESF 經歷，帳號身份與 FIS 在讀情況未核，只作中文學習及評估規則的提問線索，不作口碑共識或收生難度證據。", sourceType: "parent-discussion", academicYear: "2026 討論", checkedOn: "2026-10-21" }
  ],
"aberdeen-technical-school-secondary": [
    { label: "SchoolBanding：2026 年坊间大类估计", url: "https://schoolbanding.com/s/aberdeen-technical-school", scope: "列 Band 3，属第三方估计，不是教育局学校等级；不据其排名推算个人录取。", sourceType: "media-report", academicYear: "2026 年网站估计", checkedOn: "2026-10-20" },
    { label: "StarSchools：2026 年南区派位分类", url: "https://starschools.hk/admissions/secondary/sspa-strategy", scope: "列本校 3*；与其他第三方资料只支持宽范围判断，不支持精确 3A／3B。", sourceType: "media-report", academicYear: "2026 年网站估计", checkedOn: "2026-10-20" },
    { label: "SchoolDays：分区与个页分类", url: "https://www.schooldays.com.hk/secondary/ac1c4dd3", scope: "个页与分区列表分类不一致，作为 Band 估计分歧证据，不作为学校成绩原始来源。", sourceType: "media-report", checkedOn: "2026-10-20" },
    { label: "GoodSchool：2021 年校方选编家长个案", url: "https://media.goodschool.hk/storage/upload/ebook/2021-11-02-175925-108203.pdf", scope: "两名署名家长谈寄宿自理和师长照顾；属于宣传册选编个案，不能代表现届家庭。", sourceType: "media-report", academicYear: "2021 年", checkedOn: "2026-10-20" },
    { label: "教育王国：2006 年匿名讨论", url: "https://m.edu-kingdom.com/post.php?fid=&page=2&tid=669545", scope: "历史匿名留言、身份及转述未核；仅说明旧时讨论主题，不推断 2026 校风。", sourceType: "parent-discussion", academicYear: "2006 年", checkedOn: "2026-10-20" },
    { label: "教育王国：2010 年匿名讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2259425", scope: "历史匿名留言、身份及转述未核；仅说明旧时讨论主题，不推断 2026 校风。", sourceType: "parent-discussion", academicYear: "2010 年", checkedOn: "2026-10-20" },
    { label: "GoodSchool：校方 2026 简介摘要", url: "https://www.goodschool.hk/ebook/qr/81005", scope: "校方称毕业生有本港、内地、海外升学路径，未列全届人数或最终注册去向。", sourceType: "media-report", academicYear: "2026 年", checkedOn: "2026-10-20" },
    { label: "低碳想创坊：2026 年绿色行业活动", url: "https://www.ccinnolab.org/zh/HangSengLowCarbonSchoolPost/HSLCF45", scope: "核校外机构发布的职业探索活动；非实习、就业或升学结果。", sourceType: "media-report", academicYear: "2026-07-06", checkedOn: "2026-10-20" },
    { label: "CHSC：香港仔工业学校 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=394", scope: "学校提供并核实的身份、课程、上一轮甄选比重、宿舍及费用快照；2026/27 科目为拟开设，非 2027/28 保证。该页宿费写每月HK$3,900、共十期；学校寄宿页的计价范围／单位不同，须书面确认。学校 DSE 分母及最终去向未列。", sourceType: "school-profile", academicYear: "2025/26；拟开 2026/27", checkedOn: "2026-10-21" },
    { label: "教育局：2027 年中学学位分配日期", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027-01-04 至 01-18 自行申请、03-31 正取名单通知、07-06 结果及 07-08/09 注册；不能证成学校 2027/28 自行学额。", sourceType: "government", academicYear: "2027 年 9 月入读中一", checkedOn: "2026-10-17" },
    { label: "校方：2027/28 中一招生须知", url: "http://www.ats.edu.hk/index.php/2018-11-26-06-17-11/f1admission/2018-11-26-06-21-54", scope: "中文正文核 30 个自行学额、2027-01-04 至 01-18 申请、25/20/10/40/5 比重、材料与交件方式；导航及英文备注仍有旧年份，面试月份与表格表述略异。官网 HTTPS 连接失败，HTTP 原页可读。", sourceType: "school-official", academicYear: "2027/28 中一招生", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 中一申请表", url: "http://www.ats.edu.hk/images/doc/2627/f1admission.pdf", scope: "两页 PDF 正文明确为 2027/28，核成绩表、活动证明、无推荐信及所有人获面试；文件目录名 2627 不代表 PDF 正文适用年份。官网 HTTPS 连接失败。", sourceType: "school-official", academicYear: "2027/28 中一招生", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 宿位申请表", url: "http://www.ats.edu.hk/images/doc/2627/BSAppForm.pdf", scope: "两页 PDF 核三批宿位申请期、甄选因素、减免证明及获宿位后入宿前健康证明；该表未列宿位总量及实际获批保证。校方寄宿网页另列150个年度总宿位，具体当届空缺仍须确认。官网 HTTPS 连接失败。", sourceType: "school-official", academicYear: "2027/28 宿位申请", checkedOn: "2026-10-21" },
    { label: "校方：寄宿部费用与生活安排", url: "http://www.ats.edu.hk/index.php/2018-12-05-07-42-24/2018-12-18-01-49-38", scope: "核校方寄宿部独立运作、年度150个总宿位、初中优先、宿舍日程、费用网页所列每期HK$600–3,900及十期、早晚餐／洗衣包括而午餐／个人用品不包括。页面另留2026旧申请批次；收费计价单位与CHSC写法不一致，须校方书面解释。", sourceType: "school-official", academicYear: "网页未标收费学年；申请日期栏仍为2026/27旧届", checkedOn: "2026-10-21" },
    { label: "教育局：南区公营中学学额空缺", url: "https://www.edb.gov.hk/attachment/sc/sch-admin/admin/about-sch/vacancy/Vacancy(Website)_sc_S.pdf", scope: "2026年9月空缺表将香港仔工业学校中一至中六列为‘有学额空缺’；为按月更新的区级快照，仅供参考，不等于学校仍有实际年级／选修空位或插班录取承诺。教育局提示公营学校按校本机制面见插班生，所给级别和选修未必符合意愿。", sourceType: "government", academicYear: "2026年9月快照", checkedOn: "2026-10-21" },
    { label: "教育王国：2021年香工寄宿与转读讨论", url: "https://www.edu-kingdom.com/forum.php?highlight=&mod=viewthread&tid=3857580", scope: "2021年匿名发帖家庭为拟升中三男生比较香港仔工业学校寄宿与留在原校；回帖提出基础学习和辅导意见。身份、最终去向和实际在读情况未核，只呈现个别选择顾虑，不作当前口碑或学业成效证据。", sourceType: "parent-discussion", academicYear: "2021年讨论", checkedOn: "2026-10-21" },
    { label: "校方：2024/25 学校周年报告", url: "http://www.ats.edu.hk/images/doc/2425/schreport2425.pdf", scope: "第 5 页核数学延伸单元和应用学习历史课程；第 6 页核 SEN 支援做法；第 26 页核四场 STEAM 行业讲座及选科活动。未列 2026 DSE 全届分母或去向。官网 HTTPS 连接失败。", sourceType: "school-official", academicYear: "2024/25 学年", checkedOn: "2026-10-19" },
    { label: "校方：学校计划与报告目录", url: "http://www.ats.edu.hk/index.php/intro/schdoc", scope: "核网站目前列 2025/26 年度计划及 2024/25 周年报告原件；不能把年度计划视为已完成报告。官网 HTTPS 连接失败。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "CHSC：香港航海学校 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=369", scope: "横向比较南区资助男校、海事课程和寄宿安排；不比较升学率。", sourceType: "school-profile", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "CHSC：圣伯多禄中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=277", scope: "横向比较南区天主教资助男女校及高中英语授课班别；当届开班另核。", sourceType: "school-profile", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "CHSC：香港仔浸信会吕明才书院 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=395", scope: "横向比较南区基督教资助男女校、鸭脷洲校址及 DSE 路线。", sourceType: "school-profile", academicYear: "2025/26", checkedOn: "2026-10-17" },
  ],
"stfa-leung-kau-kui-secondary": [
    { label: "CHSC：保良局董玉娣中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=8", scope: "第 7 章第三所屯门比较校：资助男女校、逐科教学语言、数学延伸与 2025/26 收费；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-20" },
    { label: "教育局：2026 年中六多元出路及学士一般要求", url: "https://applications.edb.gov.hk/circular/upload/EDBCM/EDBCM26090C.pdf", scope: "核 332A 的逐科含义，以及资助学士一般另要求两科选修达第 2 或第 3 级；个别院校课程要求须再查。校方 332A2 简写的选修口径不自行扩写。", sourceType: "government", academicYear: "2026 年", checkedOn: "2026-10-20" },
    { label: "校方：2026 年 9 月校务报告原 PDF", url: "https://www.lkkc.edu.hk/wp-content/uploads/schoolReports/Monthly/2026-09-upload.pdf", scope: "原始总表列 106 名毕业生、89 人获学位课程取录、14 人获副学位及文凭取录、3 人其他；逐校列港大 12、中大 12、科大 9。明细子表有内部加总及课程分类矛盾，不据子表修正总表；最终注册未列。", sourceType: "school-official", academicYear: "2026 届；2026 年 9 月报告", checkedOn: "2026-10-20" },
    { label: "校方：2024/25 综合年报", url: "https://www.lkkc.edu.hk/wp-content/uploads/2025/03/24-25_Final_combined.pdf", scope: "2024 届 99 名毕业生中 88 人实际入读学位、10 人入读副学位；属于入读口径，不与 2025／2026 取录直接比较。", sourceType: "school-official", academicYear: "2024 届去向", checkedOn: "2026-10-20" },
    { label: "大考：坊间 Band 估计", url: "https://dse.bigexam.hk/zh-hk/ssp/school/324", scope: "2025 年列 1B，非教育局学校评级；与其他站可能共用校方成绩底数。", sourceType: "media-report", academicYear: "2025 年估计", checkedOn: "2026-10-20" },
    { label: "SchoolBanding：坊间 Band 估计", url: "https://www.schoolbanding.com/s/shun-tak-fraternal-association-leung-kau-kui-college", scope: "2026 年列 1B；独立计算方法未完全公开，不作官方等级或个人录取推算。", sourceType: "media-report", academicYear: "2026 年估计", checkedOn: "2026-10-20" },
    { label: "CharaBox：较旧 Band 估计", url: "https://charabox.com/en/hong-kong-school/secondary-school/shun-tak-fraternal-association-leung-kau-kui-college/", scope: "较旧页面估 1A 且招生权重过时，只用来说明民间细分判断有分歧。", sourceType: "media-report", checkedOn: "2026-10-20" },
    { label: "星岛：学生电绘与参赛经历", url: "https://www.stheadline.com/knowledge/3570174/", scope: "2026 年具名中三学生一例；不能外推全校艺术机会或在读满意度。", sourceType: "media-report", academicYear: "2026 年 5 月", checkedOn: "2026-10-20" },
    { label: "教育王国：2004 年匿名家长讨论", url: "https://m.edu-kingdom.com/post.php?closed=0&fid=45&page=1&tid=191566", scope: "自称家长的师生关系及通勤体验，年代久远且身份未核；不用作现届口碑或招生规则。", sourceType: "parent-discussion", academicYear: "2004 年", checkedOn: "2026-10-20" },
    { label: "教育王国：2023 年匿名选校讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3877095", scope: "Band 与学科压力的匿名推测；作者在读身份未核，不作全校口碑共识。", sourceType: "parent-discussion", academicYear: "2023 年", checkedOn: "2026-10-20" },
    { label: "CHSC：梁銶琚中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=324", scope: "学校提供并核实的身份、逐科教学语言、2025/26 费用及拟开 2026/27 课程。", sourceType: "school-profile", academicYear: "2025/26；拟开 2026/27", checkedOn: "2026-10-17" },
    { label: "校方：2026/27 中一自行分配申请", url: "https://www.lkkc.edu.hk/2026-27-s1-admission-application/", scope: "旧轮次 40 个学额、2026 年申请期、60/40 甄选及英粤面见；不可沿用至 2027/28。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "校方：2026/27 中一申请 FAQ", url: "https://www.lkkc.edu.hk/2026-27-s1-admission-frequently-asked-questions/", scope: "直接核对旧轮次统一派位 84 席、21 席联系小学预留、其余 63 席不限，以及 40 个自行学额无联系预留；不用于推断 2027/28 学额。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-19" },
    { label: "校方：2026 年 7 月校务简报", url: "https://www.lkkc.edu.hk/wp-content/uploads/schoolReports/Monthly/2026-07_LKKC_upload.pdf", scope: "2026 HKDSE 106 人应考、86 人达校方所列 332A2 门槛及逐科比例；逐科应考分母未列。", sourceType: "school-official", academicYear: "2026 DSE", checkedOn: "2026-10-17" },
    { label: "校方：2026 年 9 月报告网页摘要", url: "https://www.lkkc.edu.hk/2026/10/13/2026%E5%B9%B49%E6%9C%88%E4%BB%BD%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8A/", scope: "网页摘要有 89／14 取录人数，但未列原 PDF 的 106 名毕业生分母；2026 届比例应以原 PDF 核。", sourceType: "school-official", academicYear: "2026 届；2026-10-13 发布", checkedOn: "2026-10-20" },
    { label: "校方：2025 年 8 月校务简报", url: "https://www.lkkc.edu.hk/wp-content/uploads/schoolReports/Monthly/2025-08-upload.pdf", scope: "2025 届 102 名毕业生、76 人经 JUPAS 获学位取录，其中 66 人资助、10 人自资；同份简报另列两名学生分别入读北京大学与清华大学。两者不混入 JUPAS 数字，也不是 2026 届结果。", sourceType: "school-official", academicYear: "2025 届", checkedOn: "2026-10-19" },
    { label: "校方：校务报告目录", url: "https://www.lkkc.edu.hk/%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8A/", scope: "核 2026 年 7 月、9 月及 2025 年 8 月校务简报索引；2026 届毕业生分母见 9 月原 PDF，最终注册仍待确认。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "教育局：2027 年中学学位分配安排", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027 年统一自行申请、正取通知、派位结果与注册日期；不能证成校本 2027/28 名额。", sourceType: "government", academicYear: "2027 年 9 月入学", checkedOn: "2026-10-17" },
    { label: "CHSC：谭伯羽中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=325", scope: "第 7 章同区资助男女校比较：逐科语言、2025/26 收费及高中课程；不外推新届招生。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "CHSC：保良局百周年李兆忠纪念中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=5", scope: "第 7 章同区资助男女校比较：逐科语言、2025/26 收费及高中课程；不外推新届招生。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "校方：2025/26 年度学校发展计划", url: "https://www.lkkc.edu.hk/wp-content/uploads/schoolReports/SchoolPlans/2025-26_Annual_School_Plan.pdf", scope: "核对 2025/26 学习支援津贴预算、S1–S5 导师计划及中一服务目标；预算与目标不等同实际服务人数、支出、成效或下一年度承诺。", sourceType: "school-official", academicYear: "2025/26 年度计划", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 中二至中五插班安排", url: "https://www.lkkc.edu.hk/26-27-s2-s5-admission/", scope: "第 5 章核最近已结束轮次：中二至中五、2026 年 7 月 2–9 日收件、中文／英文／数学笔试、筛选后面试及 40/30/20/10 甄选比重；不得当作 2027/28 现行规则。", sourceType: "school-official", academicYear: "2026/27；申请窗口已结束", checkedOn: "2026-10-21" },
    { label: "校方：2026/27 中二至中五插班申请表 PDF", url: "https://www.lkkc.edu.hk/wp-content/uploads/soa/26-27/2026-27_S2-5_ApplicationFormForAdmission.pdf", scope: "第 5 章直接核对申请等级、7 月 2–9 日交件、先电话筛选后笔试及面试、文件处理和甄选权重；只描述上一轮。", sourceType: "school-official", academicYear: "2026/27 插班", checkedOn: "2026-10-21" },
    { label: "教育局：屯门区中学空缺（截至 2026 年 9 月）", url: "https://www.edb.gov.hk/attachment/tc/sch-admin/admin/about-sch/vacancy/Vacancy(Website)_tc_TM.pdf", scope: "第 5 章显示梁銶琚中学中二至中五无空缺、中六仅余少量；教育局注明月度更新及只供参考，申请前须向学校确认。", sourceType: "government", academicYear: "2026 年 9 月快照", checkedOn: "2026-10-21" },
  ],
"st-stephens-church-college-secondary": [
    { label: "CHSC：圣士提反堂中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=313", scope: "核资助男女校身份、按组别教学语言、课程、支援与 2025/26 收费；2026/27 科目栏为拟开设。", sourceType: "school-profile", academicYear: "2025/26；拟开 2026/27", checkedOn: "2026-10-20" },
    { label: "校方：2027/28 中一招生页", url: "https://www.sscc.edu.hk/admission-2.php", scope: "校方招生入口链接英文新届办法、双语新届申请表及尚未更新的中文旧届办法；文件年份必须分别辨认。", sourceType: "school-official", academicYear: "2027/28 招生入口", checkedOn: "2026-10-20" },
    { label: "校方：中一至中四入学办法及申请表", url: "https://www.sscc.edu.hk/admission-3.php", scope: "现行页面列有中一至中四入学申请办法和申请表；页面未提供可读取的当届空缺、申请期、测试安排、甄选权重或结果时间，不据入口推断有位或录取机会。", sourceType: "school-official", checkedOn: "2026-10-21" },
    { label: "校方：2027/28 英文申请办法", url: "https://www.sscc.edu.hk/resources/others/S1_Application_Procedure_Eng.pdf", scope: "核 2027 年 1 月 4–18 日、31 个自行学额、学业／操行／面试／旧生联系 45／20／30／5、全员面试及纸本材料。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-20" },
    { label: "校方：2027/28 双语申请表", url: "https://www.sscc.edu.hk/resources/others/S1_Application_form.pdf", scope: "核 2027 年 3 月初面试窗口、2 月 27 日仍未收通知的查询提示及一个贴足邮资回邮信封。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-20" },
    { label: "校方：中文申请办法旧件", url: "https://www.sscc.edu.hk/resources/others/S1_Application_Procedure_Chi.pdf", scope: "正文仍是 2026/27；日期及两个信封要求不用于 2027/28。", sourceType: "school-official", academicYear: "2026/27 历史件", checkedOn: "2026-10-20" },
    { label: "校方：2023/24 周年报告", url: "https://www.sscc.edu.hk/resources/sch/plan/Annual_report2324.pdf", scope: "核 2024 届 55 名中六毕业生分层实际去向：本地学士 13、非本地学士 2、本地副学位／高文凭 27、其他文凭 10、重考 1、工作 2。", sourceType: "school-official", academicYear: "2023/24；2024 届", checkedOn: "2026-10-20" },
    { label: "校方：2024/25 学校周年报告", url: "https://www.sscc.edu.hk/resources/sch/plan/Annual_report2425.pdf", scope: "核 2025 届约 96.4% 继续升学、20% 达学士最低要求、超过 65% 达副学位最低要求，缺精确分母；另核课后活动可能致疲惫、跨文化尊重自评弱于全港及梦想启航课实际工作坊数。", sourceType: "school-official", academicYear: "2024/25；2025 届", checkedOn: "2026-10-20" },
    { label: "校方：2024/25 非华语学生支援小组工作报告", url: "https://www.sscc.edu.hk/resources/sch/plan/24-25nonchinesespeaking_report.pdf", scope: "核对 2024/25 实际开设中一至中三及中五至中六中文抽离班、两班课后支援、三次师生聚会，以及 APASO 尊重不同文化背景指标低于全港水平的自评。GCSE 两名学生成绩属于上学年；本学年五名应考者在报告撰写时成绩待公布。报告对应用学习中文人数分别写 5 和 7，故不引用该人数。", sourceType: "school-official", academicYear: "2024/25 工作报告；2025-07-31 签署", checkedOn: "2026-10-19" },
    { label: "校方：校务报告目录", url: "https://www.sscc.edu.hk/intro-7.php", scope: "核 2024/25 年报官方文件入口与 2025/26 计划；所查目录未见 2026 届完整考试与最终去向。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "校方：2025/26 学校周年发展计划", url: "https://www.sscc.edu.hk/resources/sch/plan/25-26schoolyear_plan.pdf", scope: "第 6 章核「梦想启航课」年度计划为 25 个、至少 5 个新增，以及至少 70% 学生认为课程丰富体验的目标；属于计划与评估目标，不是已实现成效或个人服务保证。", sourceType: "school-official", academicYear: "2025/26 计划", checkedOn: "2026-10-18" },
    { label: "校方：2025/26 全方位学习及姊妹学校津贴计划", url: "https://www.sscc.edu.hk/resources/sch/plan/25-26all_round_sub_sister_school_plan.pdf", scope: "核中一／中四大哥哥大姐姐项目预计约 90 人参与；属于计划人数，不等于实际参加。", sourceType: "school-official", academicYear: "2025/26 计划", checkedOn: "2026-10-20" },
    { label: "教育局：2027 年中学学位分配安排", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027 年自行申请、正取通知、最终派位和注册日期；不证明学校当届学额。", sourceType: "government", academicYear: "2027 年 9 月入学", checkedOn: "2026-10-17" },
    { label: "CHSC：乐善堂梁銶琚书院 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=182", scope: "第 7 章中西区资助男女校比较：办学团体、科目语言、分组与列示费用；与屯门同名梁銶琚中学区分。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "CHSC：高主教书院 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=116", scope: "第 7 章中西区资助男女校比较：逐科教学语言、M1／M2 与列示费用；不外推 2027/28。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "CHSC：高主教书院小学部 2025 概览", url: "https://www.chsc.hk/psp2025/sch_detail.php?lang_id=2&sch_id=409", scope: "第 7 章核其直属中学栏；新届具体收生安排仍以中学当届文件为准。", sourceType: "school-profile", academicYear: "2025 学年概览", checkedOn: "2026-10-17" },
    { label: "CHSC：圣公会吕明才中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=290", scope: "第 7 章南区资助男女校比较：中一至高中逐科语言、2025/26 堂费及列示会费；不是中西区同校网。", sourceType: "school-profile", academicYear: "2025/26", checkedOn: "2026-10-20" },
    { label: "SchoolDays：本校非官方 Band 估计", url: "https://www.schooldays.com.hk/secondary/94c86c90", scope: "估为 Band 2C，页面自述可信度低、在 Band 2／3 边界；不当官方收生组别。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "Big Exam：本校非官方 Band 估计", url: "https://dse.bigexam.hk/zh-hk/ssp/school/313", scope: "2025 粗估 Band 3A；与其他平台存在分歧，也不能把共享底层数据算独立共识。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "教育王国：2018 家长选校讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3663168", scope: "历史匿名选校意见，身份和在读经验不足，不能代表 2026 现届家长口碑。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2013 校风讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2709501", scope: "历史匿名正反体验，年代久远且身份未核，不作现届共识。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
  ],
"ccc-ming-kei-college-secondary": [
    { label: "校方：2026 文凭试成绩图", url: "https://www.cccmkc.edu.hk/sites/default/files/styles/events/public/dse2026-chi.png?itok=RTpbXz4T", scope: "核 2026 届学士最低资格 74%、副学位最低资格 100%、跨科 Level 5+ 平均 21.0% 及 Level 2+ 平均 99.5%；图片未列全级与逐科分母，不代表最终大学入读。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-20" },
    { label: "校方：2025/26 School Profile", url: "https://www.cccmkc.edu.hk/sites/default/files/mkc_flyer2526.pdf", scope: "核 2025 届 Degree Offer Rate 75% 及教资会资助学位录取通知院校构成；未明确每人多份 offer 的去重方法和最终注册人数。", sourceType: "school-official", academicYear: "2025 届结果；2025/26 宣传册", checkedOn: "2026-10-20" },
    { label: "CHSC：铭基书院 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=448", scope: "核身份、各级班数、科目语言、2025/26 收费、旧轮次甄选权重及支援；现行课程以校方 2026/27 页面为准。", sourceType: "school-profile", academicYear: "2025/26", checkedOn: "2026-10-18" },
    { label: "校方：2024/25 学校周年报告", url: "https://cccmkc.edu.hk/sites/default/files/files/annual_school_report_2024-2025_0.pdf", scope: "核 2025 DSE 112 人应考、跨科 Level 2+ 平均 99.67%、英文 Level 3+ 88.39%、112 名中六毕业生及课程／支援；逐科报考人数和最终升学去向未完整披露。", sourceType: "school-official", academicYear: "2024/25 学年；2025 考试", checkedOn: "2026-10-17" },
    { label: "校方：2024/25 全方位学习津贴实施报告", url: "https://cccmkc.edu.hk/sites/default/files/files/report_on_the_use_of_the_life-wide_learning_grant_2024-2025_0.pdf", scope: "第 1 页活动表核中一至中二主动学习课程参与数 260、中三生涯工作坊 122、中六 JUPAS 工作坊及相关活动 112；学校指出中三工作坊若更早举行更利于选科。参与数是活动记录，不等于独立学生总数、大学取录或个人服务成效。", sourceType: "school-official", academicYear: "2024/25 实施报告", checkedOn: "2026-10-19" },
    { label: "校方：学校周年报告目录", url: "https://cccmkc.edu.hk/tc/%E5%AD%B8%E6%A0%A1%E5%91%A8%E5%B9%B4%E5%A0%B1%E5%91%8A%E5%8F%8A%E8%A8%88%E5%8A%83", scope: "核目前可见 2024/25 周年报告，2025/26 报告尚未在该目录列出。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：中一自行分配页面", url: "https://cccmkc.edu.hk/tc/%E4%B8%AD%E4%B8%80%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D", scope: "目前页面仍列 2026/27 表格和 2026 年面试资料；未见 2027/28 校本文件。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 中一自行分配须知", url: "https://www.cccmkc.edu.hk/sites/default/files/files/zi_xing_fen_pei_xue_wei_shen_qing_zhi_yin_2026nian_9yue_ru_xue_.pdf", scope: "核旧轮次 40 席、50/30/10/10 权重、两轮面试和文件；不能沿用至 2027/28。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-17" },
    { label: "校方：2026/27 英文版招生须知", url: "https://www.cccmkc.edu.hk/sites/default/files/files/dp_application_guidelines_for_2026_admission.pdf", scope: "与中文版交叉核对 40 席、申请文件、英语考虑因素及面试日期。", sourceType: "school-official", academicYear: "2026/27 入学", checkedOn: "2026-10-17" },
    { label: "校方：课程页面", url: "https://cccmkc.edu.hk/tc/%E5%AD%B8%E6%A0%A1%E8%AA%B2%E7%A8%8B", scope: "2026-10-19 浏览器直接核到 Curriculum Information (2026-2027)、逐科语言星号说明及 2026/27 中四课程结构 PDF 入口；实际开班与个人组合按当届核。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-19" },
    { label: "校方：2026/27 中四课程结构", url: "https://cccmkc.edu.hk/sites/default/files/files/26-27_s4_curriculum.pdf", scope: "直接读取一页 PDF，核对 2026/27 S.4 四科核心、最少三科选修、4A/4B/4C/4D 班别及选科区块；原件未列各组合学额、每位学生分配或翌届延续保证。", sourceType: "school-official", academicYear: "2026/27 中四课程", checkedOn: "2026-10-20" },
    { label: "考评局：2026 HKDSE 参加学校名单", url: "https://www.hkeaa.edu.hk/DocLibrary/HKDSE/Participating_School/2026_DSE_participating_school_list.pdf", scope: "确认学校有派考生参加 2026 HKDSE；成绩摘要另见校方原始图片，本名单不含考生人数。", sourceType: "government", academicYear: "2026 HKDSE", checkedOn: "2026-10-20" },
    { label: "校方：中二至中四插班入口", url: "https://cccmkc.edu.hk/tc/%E4%B8%AD%E4%BA%8C%E8%87%B3%E4%B8%AD%E5%9B%9B%E6%8F%92%E7%8F%AD%E7%94%9F%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B", scope: "核插班表格和须知入口；不证明即时空位或下一学年资格。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局：2027 年中学学位分配安排", url: "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/", scope: "核 2027 年自行分配、正取通知、派位与注册统一日期；校本学额另核。", sourceType: "government", academicYear: "2027 年 9 月入学", checkedOn: "2026-10-17" },
    { label: "CHSC：基督教香港信义会信义中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=138", scope: "第 7 章同区资助男女校比较：班别教学语言、收费及高中选科；补发学生证为条件费用。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "CHSC：丽泽中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=190", scope: "第 7 章同区资助男女校比较：母语教学、科目清单及列示费用；实际新届开班另核。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-17" },
    { label: "CHSC：循道中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=412", scope: "第 7 章同区资助男女校比较：逐科授课语言及堂费、家教会费、设施费；新届课程另核。", sourceType: "school-profile", academicYear: "2025/26", checkedOn: "2026-10-20" },
    { label: "BigExam：铭基非官方 Band 估计", url: "https://dse.bigexam.hk/zh-hk/ssp/school/448", scope: "粗估 Band 1B；方法主要使用公开成绩和去向，不作官方收生组别。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "Schoolbanding：铭基非官方 Band 估计", url: "https://www.schoolbanding.com/s/ccc-ming-kei-college", scope: "估 Band 1B；与其他平台底层数据独立性未证明。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "选校通：铭基非官方 Band 估计", url: "https://hkschoolfacts.com/secondary-schools/the-church-of-christ-in-china-ming-kei-college", scope: "估 Band 1A，但未列可重算的原始分布；显示小级别分歧。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "教育王国：2022 年铭基家长讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3833330", scope: "一名自称中一家长谈活动与朋辈安排；身份未核、年份较旧，不构成全校口碑。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2020 年功课讨论", url: "https://www.edu-kingdom.com/forum.php?extra=&mod=viewthread&page=10&tid=3846421", scope: "匿名个人与二手功课评论，仅作访校问题线索。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2026 年升中讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3886337", scope: "以过往同学为例的二手适配意见，不能作为当届在读体验或成绩统计。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2024 年铭基与循道讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3882746", scope: "匿名 Band 与课程评价互有争论，不作为学校学术等级证据。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "香港文汇报：2026 年视障音乐考生访问", url: "https://cccmkc.edu.hk/sites/default/files/notice/you_pian_dsefang_bang_shi_ming_yong_duo_5ji_jia_ji_fang_xi_wen_yin_le_shi_kua_yue_hei_an_yin_lu_ming_deng_-_xiang_gang_-_xiang_gang_wen_hui_bao_.pdf", scope: "具名个案音乐科第 5 级及中大音乐系第一志愿；不是已获录取，也不能外推个别支援成效。", sourceType: "media-report", academicYear: "2026 考试个案", checkedOn: "2026-10-20" },
  ],
"plk-laws-foundation-college-secondary": [
    { label: "校方：2024/25 年报与学生情意指标", url: "https://www.plklfc.edu.hk/sites/default/files/download/2425%20School%20Report%20with%20Appendices.pdf", scope: "核初中教学语言、选科、2025 高分成绩项、科研项目人数和 APASO 指标；百分位非满意率。", sourceType: "school-official", academicYear: "2024/25 学年", checkedOn: "2026-10-20" },
    { label: "校方：2024 HKDSE 结果", url: "https://www.plklfc.edu.hk/en/hkdse-result-2024", scope: "核 2024 中英单科第 3 级或以上比例；逐科分母未列。", sourceType: "school-official", academicYear: "2024 考试", checkedOn: "2026-10-20" },
    { label: "校方：2025 HKDSE 结果", url: "https://www.plklfc.edu.hk/en/hkdse-result-2025", scope: "核 2025 中英单科第 3 级或以上比例；逐科分母未列。", sourceType: "school-official", academicYear: "2025 考试", checkedOn: "2026-10-20" },
    { label: "保良局：2026 超级状元新闻", url: "https://www.poleungkuk.org.hk/news/2026_dse", scope: "交叉确认罗氏 2026 七科 5** 学生个案，不外推整届升学率。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-20" },
    { label: "CHSC：中华基金中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=455", scope: "第 7 章同口径比较：地点、直资身份、逐科教学语言和旧学年学费。", sourceType: "school-profile", academicYear: "2025/26 学年", checkedOn: "2026-10-20" },
    { label: "大考：罗氏非官方 Band 估计", url: "https://dse.bigexam.hk/zh-hk/ssp/school/14", scope: "估 Band 1B，底层资料及方法不足以证明官方定位。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "Schoolbanding：罗氏非官方 Band 估计", url: "https://schoolbanding.com/s/plk-laws-foundation-college", scope: "估 Band 1B，不能与其他网站当独立多方验证。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "选校通：罗氏非官方 Band 估计", url: "https://hkschoolfacts.com/secondary-schools/po-leung-kuk-laws-foundation-college", scope: "估 Band 2A，显示坊间定位分歧。", sourceType: "third-party-estimate", checkedOn: "2026-10-20" },
    { label: "教育王国：2020 年匿名在读家长功课意见", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3833204", scope: "单一匿名自述，年份旧；仅作向现届核问功课的线索。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2022 年播道与罗氏比较", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3869292", scope: "申请者讨论数理兴趣与校风；不是在读体验。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2015 年在读家庭师生体验", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3088715", scope: "少数匿名留言者自述孩子开心、教师用心；仅是个别旧帖，不能代表现届或整体口碑。", sourceType: "parent-discussion", academicYear: "2015 讨论", checkedOn: "2026-10-22" },
    { label: "教育王国：2018 年功课、师资与生活讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3616194", scope: "包含体验课观感、申请家庭转述及当时午膳／测考讨论；发言身份及现行政策未核实，只作历史线索。", sourceType: "parent-discussion", academicYear: "2018 讨论", checkedOn: "2026-10-22" },
    { label: "教育王国：2024 年取录家庭功课压力讨论", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&page=1&pid=49315967&tid=3880555", scope: "取录家庭忧虑与匿名回复观点不一；回复者在读身份未确认，未证实的严重指控不作事实或校风结论。", sourceType: "parent-discussion", academicYear: "2024–2025 讨论", checkedOn: "2026-10-22" },
    { label: "教育王国：2008 年在读家庭沟通与测考回忆", url: "https://www.edu-kingdom.com/forum.php?from=space&mod=viewthread&page=2&tid=1209947", scope: "单一旧帖自述功课、测考和家校沟通感受；距今近二十年，不能代表现况。", sourceType: "parent-discussion", academicYear: "2008 讨论", checkedOn: "2026-10-22" },
    { label: "Schoolbanding 论坛：2025 年比校讨论", url: "https://www.schoolbanding.com/forum/post/91", scope: "匿名申请者及二手意见，不能形成现届口碑共识。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "CHSC：罗氏基金中学 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=14", scope: "核直资身份、地址、五班、2025/26 费用、逐科教学语言、2X／3X 及旧轮次甄选比重。", sourceType: "school-profile", academicYear: "2025/26；拟开 2026/27", checkedOn: "2026-10-22" },
    { label: "CHSC：播道书院 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=28", scope: "第 7 章同区直资男女校比较：HKDSE 科目与逐科教学语言、2025/26 学费及旧届入学方式；新届费用和招生另核。", sourceType: "school-profile", academicYear: "2025/26；拟开 2026/27", checkedOn: "2026-10-18" },
    { label: "CHSC：真道书院 2025/26 概览", url: "https://www.chsc.hk/ssp2025/sch_detail.php?lang_id=2&sch_id=371", scope: "第 7 章同区直资男女校比较：十一年一条龙、DSE／IBDP 课程分流、2025/26 学费与逐科教学语言；学段及新届费用另核。", sourceType: "school-profile", academicYear: "2025/26；拟开 2026/27", checkedOn: "2026-10-18" },
    { label: "校方：2027/28 中一申请", url: "https://www.plklfc.edu.hk/en/application-form-1-admission-academic-year-202728", scope: "核 2026-09-22 至 12-04 申请、亲身交件及 HK$75 现金费用、面试／结果日期；小六成绩文件措辞需学校确认。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-22" },
    { label: "校方：2027/28 中一 FAQ", url: "https://www.plklfc.edu.hk/sites/default/files/download/Frequently%20Asked%20Questions%20%28FAQ%29%20about%20the%20S.1%20Admission_2728%20%281%29.pdf", scope: "核一条龙注册、约 80–100 个外部席位、接受取录后放弃中央派位及新届学费可能调整。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-22" },
    { label: "校方：2026 HKDSE 结果", url: "https://www.plklfc.edu.hk/en/hkdse-result-2026", scope: "核英文 95.7%、中文 73.6%、数学 100%、公民科 99.3% 及高等级项数；全级和逐科分母未列，不能证成整体 332A 或大学入读率。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-22" },
    { label: "校方：2026 DSE 七科 5** 学生及中大医学取录个案（2026-10-01）", url: "https://plklfc.edu.hk/en/latest_new/our-schools-super-top-scorer-2026-hkdse", scope: "核一名学生 2026 DSE 七科 5** 与获中大 MBChB-GPS 取录的个案；不代表整届医学取录、总体大学率或最终注册率。", sourceType: "school-official", academicYear: "2026 DSE 与 2026/27 大学入学个案", checkedOn: "2026-10-18" },
    { label: "校方：高中课程", url: "https://www.plklfc.edu.hk/en/senior-secondary-education", scope: "核 HKDSE 核心、选修和其他学习经历；实际开班与组合另核。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "校方：课程与语言政策", url: "https://www.plklfc.edu.hk/en/curriculum", scope: "核英语为主及中文、历史、生命教育例外；校方旧清单混用通识／公民科，现行课程以高中页面和 CHSC 为准。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "校方：学费页", url: "https://www.plklfc.edu.hk/en/school-fees", scope: "列本地与非本地 S1–S3、S4–S6 学费，但页面未标适用学年，不当 2027/28 报价。", sourceType: "school-official", academicYear: "页面未标；本地生 CHSC 同额为 2025/26", checkedOn: "2026-10-18" },
    { label: "校方：学费减免", url: "https://www.plklfc.edu.hk/tc/school-fee-remission-scheme", scope: "核 AFI 与全免／半免机制；页面混有 2026/27 截止日与 2025/26 门槛，不引用为 2027/28 条件。", sourceType: "school-official", academicYear: "2025/26 门槛；2026/27 期限", checkedOn: "2026-10-18" },
    { label: "校方英文：2027/28 学费减免", url: "https://www.plklfc.edu.hk/en/node/830", scope: "搜索索引呈现 2027/28 截止日 2027-07-16；页内 AFI 表仍标 2025/26，须以学校新表确认门槛及递交要求。", sourceType: "school-official", academicYear: "2027/28 截止日；旧 AFI 表 2025/26", checkedOn: "2026-10-18" },
    { label: "校方：奖学金计划（页面未标适用学年）", url: "https://plklfc.edu.hk/en/scholarship-scheme", scope: "核中一新生按小六排名的减免档位、适用小学班数及四次考试加权排名说明；2027/28 适用性和续领条件须校方确认。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：中二至中五插班申请（2026/27，已截止）", url: "https://www.plklfc.edu.hk/tc/application-form-secondary-two-secondary-five-academic-year-202627", scope: "第 5 章核上一轮中二至中五申请截至 2026-06-22、2026-06-27 考试及约四周后书面结果；该轮已结束，不能外推 2027/28 空缺、日期、评核内容或录取机会。", sourceType: "school-official", academicYear: "2026/27 插班；2026-06-22 截止", checkedOn: "2026-10-22" },
  ],
"kellett-school-secondary": [
    { label: "校方：2025 年招生政策", url: "https://www.kellettschool.com/userfiles/kellettv2mvc/Document/Admissions/ADMISSIONS%20Policy%20-%2020250911.pdf", scope: "核中学评估步骤、申请材料、年龄与优先因素；申请日期条款内部不一致，须校方解释。", sourceType: "school-official", academicYear: "2025-09-11 版本", checkedOn: "2026-10-20" },
    { label: "校方：中学语言课程", url: "https://www.kellettschool.com/senior-school/curriculum/languages", scope: "核中一至中三普通话安排、中文作为第二语言及外语分路；逐周课时和转班条件未列。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "The Good Schools Guide：2026 启历中学评测", url: "https://www.goodschoolsguide.co.uk/international/review/kellett-senior-school", scope: "仅取公开可读的编辑到访和家长转述；考试比例与校方详表不一，成绩数字不采用媒体口径。", sourceType: "independent-inspection", academicYear: "2026-09 更新", checkedOn: "2026-10-20" },
    { label: "WhichSchoolAdvisor：少量家长评论", url: "https://whichschooladvisor.com/hong-kong/school-review/kellett-school-kowloon-bay/parent-opinion-survey-results", scope: "页面仅 7 条评论，年份及分项不可充分核实，不当现届整体满意度。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2021 年启历与 VSA 讨论", url: "https://www.edu-kingdom.com/forum.php?action=printable&mod=viewthread&tid=3856934", scope: "匿名旧讨论多涉及小学部，不外推中学部体验。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "VSA：2026/27 学费", url: "https://www.vsa.edu.hk/admissions/school-fees", scope: "第 7 章同年国际文凭路线比较：Year 7 学费及另设资本安排；不据学费单项比较总成本。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "哈罗香港：2026/27 学费", url: "https://www.harrowhongkong.hk/his/admissions/fees/", scope: "第 7 章国际学校对照：Y6–11、Y12–13 学费，Capital Levy 及可选寄宿另费；不当 2027/28 报价。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-17" },
    { label: "哈罗香港：2027/28 申请时间", url: "https://www.harrowhongkong.hk/his/admissions/application-timeline/", scope: "第 7 章 Plan B 核当届常规申请期限及迟交资格；不假定可获空位。", sourceType: "school-official", academicYear: "2027/28 入学", checkedOn: "2026-10-17" },
    { label: "德瑞国际学校：英语中学课程", url: "https://www.gsis.edu.hk/en/academics/english-international-stream/secondary/", scope: "第 7 章国际学校对照：英语部 Y7–9、IGCSE、Y12–13 IBDP；与启历和哈罗 A-Level 路线分开。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局：德瑞国际学校英语部名录", url: "https://internationalschools.edb.gov.hk/en/schools/12.html", scope: "核英语部国际学校身份、山顶校区及费用范围；页面范围未标学年及逐级价，不当当届报价。", sourceType: "government", academicYear: "费用范围学年未标", checkedOn: "2026-10-17" },
    { label: "教育局：Kellett Kowloon Bay 国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/56.html", scope: "核国际学校身份和九龙湾地址；整体学额范围不能当作目标年级空位。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：招生流程", url: "https://www.kellettschool.com/admissions/admissions-process", scope: "核全年滚动申请、2026/27 已满、Senior 可提前两年申请、文件和 Y5–13 申请费；2027/28 空位未列。", sourceType: "school-official", academicYear: "2026/27 状态；2027/28 空位待核", checkedOn: "2026-10-22" },
    { label: "校方：九龙湾中学校园参观", url: "https://www.kellettschool.com/admissions/tours-visits", scope: "校方页面列九龙湾 Senior 校区每周二 8:30 参观，名额有限需联络预约；页面另保留 2027/28 家庭 9 月恢复参观的旧提示，具体可预约日期应先向招生处确认。", sourceType: "school-official", academicYear: "2027/28 访校安排", checkedOn: "2026-10-22" },
    { label: "校方：入学 FAQ", url: "https://www.kellettschool.com/admissions/admission-faqs", scope: "核两校区三学部、Y6 到 Y7 历史续读平均和在校生奖学金限制；不作外部申请概率。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：学费与债券", url: "https://www.kellettschool.com/admissions/fees-debenture-information", scope: "核 2026/27 Senior／Sixth Form 学费、HK$40,000 新 offer ACL、家庭协会费及不含费用；2027/28 另核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-22" },
    { label: "校方：助学金", url: "https://www.kellettschool.com/admissions/bursaries", scope: "核入学助学金可最高覆盖学费及其他校本开支、助学申请费豁免；个人资格另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：Senior Academics", url: "https://www.kellettschool.com/senior-school/curriculum/academics", scope: "核 Y7–9、Y10–11 i/GCSE 科目及 2026/27 option block 入口；中学逐科授课媒介需学校确认。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：Kellett Assessed Programmes", url: "https://www.kellettschool.com/senior-school/curriculum/kellett-assessed-programmes", scope: "核 Oceanography and Innovation 100% coursework、传统 GCSE 替代定位、核心 GCSE 最低科数和后续校本课程计划；未来项目未有明确实施年份。", sourceType: "school-official", academicYear: "现行 Y10–11 课程；后续计划年份未列", checkedOn: "2026-10-19" },
    { label: "校方：A-Level 课程", url: "https://www.kellettschool.com/sixth-form/a-levels", scope: "核通常三科、最多 16 人班级和 22 科范围；当届开班与个人组合另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2026 考试结果与去向", url: "https://www.kellettschool.com/defining-kellett/results-accreditations/results", scope: "核 2026 A-Level、i/GCSE 与 Year 13 82 人；7／31／48 人所附 10／43／67% 不能用 82 作分母，大学去向图片未给完整注册分母。", sourceType: "school-official", academicYear: "2026 考试；2025 大学取录文字另列", checkedOn: "2026-10-22" },
    { label: "校方：2026 A-Level 结果新闻", url: "https://www.kellettschool.com/news/2026-08-19/a-level-results-2026", scope: "核 2026-08-19 新闻稿 83% A*–B 与结果详表 83.5% 的公开表述差异；列示大学名额和地区但无毕业生分母或最终注册数。", sourceType: "school-official", academicYear: "2026 届", checkedOn: "2026-10-18" },
    { label: "校方：Senior Additional Support", url: "https://www.kellettschool.com/senior-school/additional-support", scope: "核主流课程支援名额有限、个案评估及可能的校外专家合作。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：大学与生涯指导", url: "https://www.kellettschool.com/sixth-form/university-careers-guidance", scope: "核一对一大学辅导、大学展和 Y12 工作体验；非最终入读率。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：校区", url: "https://www.kellettschool.com/defining-kellett/campuses", scope: "核九龙湾中学与薄扶林小学区分、Sixth Form 校舍连接；不用于推断空位。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2026 年启用的 Sixth Form Centre", url: "https://www.kellettschool.com/news/2026-09-11/kellett-opens-new-sixth-form-centre", scope: "核 Year 12–13 中心位于 The Bay Hub、供 240 名学生使用，且经行人天桥连接九龙湾校舍；关注通勤与校园使用，不视为招生容量承诺。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-18" },  ],
"malvern-college-hong-kong-secondary": [
    { label: "校方：2025 届 IBDP 旧版专页", url: "https://www.malverncollege.org.hk/ibdq-exam-results/", scope: "核 2025 届逾 70 份大学录取通知、双语文凭及 TOK／EE 核心表现；不能与未注明届别的 150 份通知相加。", sourceType: "school-official", academicYear: "2025 届", checkedOn: "2026-10-20" },
    { label: "The Good Schools Guide：2026 香港墨尔文评测", url: "https://www.goodschoolsguide.co.uk/international/review/malvern-college-hong-kong", scope: "仅取公开可读家长与编辑节录；旧收费信息不用作当届预算。", sourceType: "independent-inspection", academicYear: "2026-03 更新", checkedOn: "2026-10-20" },
    { label: "教育王国：2025 年墨尔文讨论第 2 页", url: "https://www.edu-kingdom.com/forum.php?extra=&mod=viewthread&page=2&tid=3883889", scope: "匿名自称家长的同伴和 House 活动体验，身份未核、非全校样本。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "教育王国：2025 年墨尔文讨论第 3 页", url: "https://www.edu-kingdom.com/forum.php?extra=page%3D1&mod=viewthread&page=3&tid=3883889", scope: "参观者对高中空间的个人印象，不当校舍容量事实。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "GeoExpat：2025 年匿名前家长讨论", url: "https://geoexpat.com/forum/71/thread369248-4.html", scope: "个人对教师与透明度的批评，部分经验明确来自小学阶段，不能当中学部现届共识。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "VSA：2026/27 学费", url: "https://www.vsa.edu.hk/admissions/school-fees", scope: "第 7 章按同龄阶段比较 IB 路线收费；一次性资本安排金额另核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-21" },
    { label: "教育局：香港学堂国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/15.html", scope: "第 7 章同类对照：西贡非牟利 IB 国际学校及 G6–12 路线；全校学额不当目标年级空位。", sourceType: "government", checkedOn: "2026-10-17" },
    { label: "香港学堂：毕业路线", url: "https://hkacademy.edu.hk/pathways-to-graduation/", scope: "第 7 章核 HKA Diploma、Global Citizens Diploma 与多数学生修读 IBDP；不能把所有毕业生算作完整 DP 考生。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "香港学堂：2026/27 学费", url: "https://hkacademy.edu.hk/school-fees/", scope: "第 7 章核 G6–8、G9–10、G11–12 年费、年度资本征费和入学费；学段编号不可直接等同墨尔文 Year 编号。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-17" },
    { label: "加拿大国际学校：IB 与 OSSD 课程", url: "https://www.cdnis.edu.hk/en/our-programmes/ossd/", scope: "第 7 章核 G9–10 MYP／OSSD 学分和 G11–12 IBDP／OSSD 路径；个人毕业资格仍有学分和其他条件。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "加拿大国际学校：2026/27 学费", url: "https://www.cdnis.edu.hk/en/admissions/tuition-fees/", scope: "第 7 章核 G6–8、G9–10、G11–12 年费及待教育局批准的资本征费；2027/28 另核。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-17" },
    { label: "教育局：Malvern College Hong Kong 国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/30.html", scope: "核大埔白石角校址、非牟利国际男女校、全校学额范围、IB 课程及 SEN 个案支援；整体容量不等于目标年级空位。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：Admissions Process", url: "https://malverncollege.org.hk/admissions-process/", scope: "核 2026/27–2028/29 可申请、编级原则，以及招生页仍列的 2026/27 拟定 MYP／DP 学费 HK$238,840；该金额与费用页及 FAQ 的 HK$236,840 不一致，须确认最终获批价。", sourceType: "school-official", academicYear: "2026/27–2028/29 申请；2026/27 拟定学费", checkedOn: "2026-10-22" },
    { label: "校方：Apply Now", url: "https://malverncollege.org.hk/apply-now/", scope: "核滚动招生、评估／候补、英语要求、HK$1,800 申请费及优先评估类别；目标年级席位待核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：Documents Required", url: "https://malverncollege.org.hk/admissions-process/documents-required/", scope: "核证件照、身份证明、两学年成绩、翻译和个别教育报告要求；个人作品集不用于招生评估。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：Age Guidelines", url: "https://malverncollege.org.hk/admissions-process/age-guidelines/", scope: "核 2026/27–2028/29 出生日期与 Year 7–13 对照；最终编级仍需审核。", sourceType: "school-official", academicYear: "2026/27–2028/29 入学", checkedOn: "2026-10-18" },
    { label: "校方：MYP Curriculum", url: "https://malverncollege.org.hk/senior/myp-curriculum/", scope: "核 Year 7–11 MYP 学科、艺术／设计专攻、扩展数学和个人项目；开科／组合另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：IBDP Curriculum", url: "https://malverncollege.org.hk/sixth-form/ibdp-curriculum/", scope: "核六个学科组与 TOK／EE／CAS；具体 HL／SL 组合按当届确认。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：Frequently Asked Questions", url: "https://malverncollege.org.hk/faqs/", scope: "核英语为主要授课媒介、中文教学、MYP／DP 范围、班级最多 24 人、整体师生比约 1:10、上课与课外活动时段及 2026/27 校巴草拟路线；FAQ 列中学拟定学费 HK$236,840 且须教育局批准；这些校方总体描述不等同目标班级配置或个别路线承诺。", sourceType: "school-official", academicYear: "2026/27 学费及校巴；其他现行政策", checkedOn: "2026-10-22" },
    { label: "校方：2025 IBDP Results", url: "https://malverncollege.org.hk/academic-performance/", scope: "核 1／2／3 名高分生、40+ 超过三分之一及逾 150 份大学 offer；DP 全届人数和 offer 归属届别未明确。", sourceType: "school-official", academicYear: "2025 届成绩；大学 offer 期间未明确", checkedOn: "2026-10-22" },
    { label: "校方：Fees and Charges", url: "https://malverncollege.org.hk/fees-and-charges/", scope: "核 2026/27 MYP／DP HK$236,840、HK$42,000 年度资本征费、INR/CNR 豁免及其他费用；学费仍须确认 EDB 最终批准，招生页异值 HK$238,840 待书面厘清。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-22" },
    { label: "校方：Bursaries", url: "https://malverncollege.org.hk/fees-and-charges/bursaries/", scope: "核 Prep 1 以上家庭可按个案申请助学；具体金额和资格未公开。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：Academic Scholarship", url: "https://malverncollege.org.hk/malvern-scholars/academic/", scope: "核从 FY1／Year 7 开放学术奖学金；当届申请期限及续领规则另核。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：Malvern Scholars 2027/28 申请", url: "https://malverncollege.org.hk/malvern-scholars/", scope: "核 2027/28 各奖项申请表、资格路径与截止日期；具体个人获批金额及评审结果未公开。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-22" },
    { label: "校方：2027/28 奖学金申请表、资格与时间表", url: "https://malverncollege.org.hk/wp-content/uploads/2026/09/MCHK-Scholarship-Application-Form-2027-28.pdf", scope: "核 2026-10-23 申请截止、11 月评估及 11-07 入围者奖学金日；多类奖项最高减免学费 50%，类别最低年级不同。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-22" },
    { label: "校方：Pastoral Excellence", url: "https://malverncollege.org.hk/pastoral-excellence/", scope: "核导师与辅导机制；不能据此推定个案支持容量。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：Life Beyond Malvern", url: "https://malverncollege.org.hk/sixth-form/life-beyond-malvern/", scope: "核大学生涯指导、IB 选科和申请支援；不等于最终录取率。", sourceType: "school-official", checkedOn: "2026-10-17" },  ],
"kgv-esf-secondary": [
    { label: "KGV：Year 7–9 课程与语言", url: "https://kgv.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/years-7-9/", scope: "核 MYP、中文科及社区项目评核；逐周课时和个别分组另核。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "KGV：Year 10–11 课程", url: "https://kgv.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/years-10-11/", scope: "核英数科学核心与四科选择；不推定人人可独立报考三门科学 GCSE。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "英基：关联小学转衔规则", url: "https://join-us.esf.edu.hk/transitions-and-transfers/", scope: "核九龙小学、清水湾小学关联 KGV 及英基体系内学位保障边界。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "KGV：2026 年参观安排", url: "https://www.kgv.esf.edu.hk/en/admissions/Tours/", scope: "已公布参观日均已过去；参加参观不影响录取。", sourceType: "school-official", academicYear: "2026 参观安排", checkedOn: "2026-10-20" },
    { label: "International Schools Database：KGV 少量评论", url: "https://www.international-schools-database.com/in/hong-kong/king-george-v-school-hong-kong", scope: "仅两条未经验证评论，不能作在读家庭共识或课程事实。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "International Schools Database：KGV 2025 评论", url: "https://www.international-schools-database.com/in/hong-kong/king-george-v-school-hong-kong/reviews/htBKkA", scope: "一名自称学生对设施、管理和科学选科的个人意见；科学资格以校方当届表核。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "Reddit：2024 KGV 校友回忆", url: "https://www.reddit.com/r/HongKong/comments/1ewwy8z/international_schools_in_hk_hka_aishk_hkis_kellet/", scope: "未核身份的历史校友个人回忆，不当现届师资或成绩证明。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "GeoExpat：2021 KGV 讨论", url: "https://geoexpat.com/forum/71/thread361703.html", scope: "旧年个人校园及校友印象，不代表 2026 家庭共识。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "启历学校：2026/27 学费与资本费", url: "https://www.kellettschool.com/admissions/fees-debenture-information", scope: "第 7 章比较非英基 A-Level 备选的同年学费及年度资本安排。", sourceType: "school-official", academicYear: "2026/27 学年", checkedOn: "2026-10-20" },
    { label: "启历学校：中学课程", url: "https://www.kellettschool.com/senior-school/curriculum/academics", scope: "第 7 章比较 i/GCSE 至 A-Level 与 KGV 多路线差异。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "教育局：港岛中学名录", url: "https://internationalschools.edb.gov.hk/en/schools/44.html", scope: "第 7 章同属英基国际中学对照：学校身份及港岛区位置；全校学额不当可申请空位。", sourceType: "government", checkedOn: "2026-10-17" },
    { label: "港岛中学：课程", url: "https://island.esf.edu.hk/en/outstanding_education/curriculum/", scope: "第 7 章对照 Y7–9 MYP、Y10–11 GCSE／IGCSE、Y12–13 IBDP／IBCP；具体选科另核。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "教育局：沙田学院名录", url: "https://internationalschools.edb.gov.hk/en/schools/51.html", scope: "第 7 章同属英基国际中学对照：沙田火炭校址及 IB／IGCSE 路线；目标年级空位另核。", sourceType: "government", checkedOn: "2026-10-17" },
    { label: "沙田学院：Year 12–13 课程", url: "https://shatincollege.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/years-12-13/", scope: "第 7 章核 IBDP、IBCP 和单科课程选择；不把所有毕业生作为完整 DP 考生。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局：KGV 国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/47.html", scope: "核何文田非牟利国际男女中学、全校学额、课程、支援与费用范围；全校规模不等于指定年级空位。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：KGV 课程总览", url: "https://www.kgv.esf.edu.hk/en/", scope: "核 Year 7–9 MYP、Year 10–11 GCSE／IGCSE／BTEC、Year 12–13 IBDP／BTEC；不把所有学生视为完整 DP 考生。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：Year 12–13 课程", url: "https://kgv.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/years-12-13/", scope: "核 IBDP 六科、HL／SL、IBCP 核心与 BTEC 路线及 16 人班额上限；当届组合另核。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：2026 IBDP 初步成绩 PDF", url: "https://kgv.esf.edu.hk/upload/page/119/self/6a4da9f10267a.pdf", scope: "核完整 DP 214 人、获文凭 212 人、均分 36.7、7 人满分及各分数段；IBCP 全部获证但人数未列，结果仍为初步。", sourceType: "school-official", academicYear: "2026 May 初步考试结果", checkedOn: "2026-10-22" },
    { label: "校方：Student Success 结果目录", url: "https://www.kgv.esf.edu.hk/en/outstanding_education/student_success/", scope: "目录中 BTEC 2026 链接当前指向标题为 2024 的 PDF；不能以该文件代替 2026 成绩。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "校方：2026 GCSE 成绩公告", url: "https://kgv.esf.edu.hk/en/?style=flat", scope: "核 2026-08-25 公布的 2,513 个成绩项、达标比例和各考试局均分；分母为成绩项，未列考生数或各考试局分项人数。", sourceType: "school-official", academicYear: "2026 考试年度", checkedOn: "2026-10-19" },
    { label: "校方：University Destinations", url: "https://www.kgv.esf.edu.hk/en/outstanding_education/university_destinations/", scope: "列 2026 嵌入去向和 offer 文件，但已核页面正文未给全届最终注册人数和分路线分母。", sourceType: "school-official", academicYear: "2026 去向；分母待核", checkedOn: "2026-10-18" },
    { label: "英基：2027/28 中央申请", url: "https://join-us.esf.edu.hk/admissions-primary-secondary/", scope: "核 2026-09-01 至 09-30 Year 7 中央申请、迟交候补、当届面试和 offer 时程、关联小学表。", sourceType: "school-official", academicYear: "2027/28 Year 7 入学", checkedOn: "2026-10-19" },
    { label: "英基：中小学招生与年级要求", url: "https://join-us.esf.edu.hk/primary-secondary-admissions-process/", scope: "核 2027/28 Year 7 年龄、四校偏好、随机编号、优先类别、英语要求、Year 12 门槛及 12 月 1 日前小学升中保障。", sourceType: "school-official", academicYear: "2027/28 年级表；招生规则", checkedOn: "2026-10-22" },
    { label: "英基：Year 6 升中及关联学校", url: "https://join-us.esf.edu.hk/admissions/", scope: "核九龙小学和清水湾小学对应 KGV，学习支援及 12 月 1 日后入读者另按流程；不作无条件直升承诺。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "英基：2026/27 费用", url: "https://join-us.esf.edu.hk/school-fees/", scope: "核 Year 7–11 HK$188,300、Year 12–13 HK$174,200、HK$2,800 申请费、两个月学费订金及按年级递减一次性 NCL。", sourceType: "school-official", academicYear: "2026/27 学费；NCL 收费页现行规则", checkedOn: "2026-10-22" },
    { label: "英基：Learning Support 招生", url: "https://join-us.esf.edu.hk/learning-support/", scope: "核 LOA 1–6 和较高支援需要的中央审核流程；具体 KGV 容量未列。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "英基：财政援助计划", url: "https://www.esf.edu.hk/financial-assistance-scheme/", scope: "核突发困难援助及新生首年通常不获批；个人资格与金额另核。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：Student Support & Wellbeing", url: "https://www.kgv.esf.edu.hk/en/outstanding_education/student_support_wellbeing/", scope: "核导师、PHE／PSHE、辅导员与社工机制；不推断个别支援时数。", sourceType: "school-official", checkedOn: "2026-10-18" },
    { label: "校方：Admissions 联系方式", url: "https://www.kgv.esf.edu.hk/en/admissions/", scope: "核 KGV 入学由英基中央办理及中央与校方两组联络方式；空位须当届询问。", sourceType: "school-official", checkedOn: "2026-10-18" },  ],
"australian-international-school-hong-kong-secondary": [
    { label: "教育局：AISHK 国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/60.html", scope: "核正式中文地址、1995 年创校、非牟利男女校及学校规模；全校学额不等于目标年级席位。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "校方：招生与 2026 收费", url: "https://www.aishk.edu.hk/admissions", scope: "核澳洲 1–12 月学年、全年申请范围、评估规则、费用、资本征费、订金及退学条款；2027 报价待公布。", sourceType: "school-official", academicYear: "2026 日历年收费", checkedOn: "2026-10-22" },
    { label: "校方：中学课程", url: "https://www.aishk.edu.hk/learning/secondary-school", scope: "核 Year 7–10 NSW 课程与八大学习领域；校方列出的课程不保证每届开齐。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "校方：高中课程与选科", url: "https://www.aishk.edu.hk/learning/senior-years", scope: "核 HSC／IBDP 单位要求、学科选择和双路线；个别组合及转入资格另向校方核实。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "校方：Class of 2025 Results and Pathways", url: "https://www.aishk.edu.hk/learning/results-and-pathways", scope: "核 IBDP 均分 38、41% 40+、70% 至少一科 7，HSC entries 56% Band 5/6 与 ATAR 学生比例；未列各路线人数。", sourceType: "school-official", academicYear: "Class of 2025", checkedOn: "2026-10-22" },
    { label: "校方：Class of 2025 成绩公告", url: "https://dhanara.aishk.edu.hk/post/congratulations-to-the-class-of-2025", scope: "核 IB 文凭通过率 100%，HSC 56% 明确是考试成绩项；ATAR 中位数 86、33%／67% 是学生口径。", sourceType: "school-official", academicYear: "Class of 2025", checkedOn: "2026-10-22" },
    { label: "校方：Admissions Information", url: "https://support.aishk.edu.hk/portal/en/kb/articles/admissions-information", scope: "核 2027 Term 1／Term 3 建议申请时点、Year 11／12 限制及 AEAS 个案规则；建议时间不保证席位。", sourceType: "school-official", academicYear: "2027 入学", checkedOn: "2026-10-22" },
    { label: "校方：Teaching and Learning", url: "https://www.aishk.edu.hk/learning/teaching-and-learning", scope: "核家校反馈节点、英语／数学／中文分组、支援服务及 2027 ACER ISA 阶段测评安排。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "NSW NESA：理解 HSC 成绩", url: "https://www.nsw.gov.au/education-and-training/nesa/hsc/results-and-certificates/understanding-your-results", scope: "核 HSC Band 5 为 80–89、Band 6 为 90–100；单科成绩等级不是香港学校 Band。", sourceType: "exam-authority", checkedOn: "2026-10-20" },
    { label: "UAC：ATAR 说明", url: "https://uac.edu.au/future-applicants/atar", scope: "核 ATAR 是 NSW 同龄人口相对排名，不是百分制考试分数；ATAR 90 表示大约处于前 10%。", sourceType: "exam-authority", checkedOn: "2026-10-20" },
    { label: "Good Schools Guide：AISHK 访校评论", url: "https://www.goodschoolsguide.co.uk/international/review/australian-international-school-hong-kong", scope: "2026 独立访校公开摘要及少量受访家长意见；篇幅有限且部分经验涉及小学，不能当中学家长共识。", sourceType: "media-report", academicYear: "2026-04", checkedOn: "2026-10-20" },
    { label: "International Schools Database：用户评论页", url: "https://www.international-schools-database.com/in/hong-kong/australian-international-school-hong-kong/reviews", scope: "核查时评论数为零；不从无评论推断满意度。", sourceType: "parent-discussion", checkedOn: "2026-10-20" },
    { label: "Reddit：AISHK 教师匿名讨论", url: "https://www.reddit.com/r/Internationalteachers/comments/1dtd0sf/australian_international_school_hong_kong/", scope: "匿名自称教师／曾任教者对工作体验有不同意见，身份与任职时段未核；不转写成学生或家长事实。", sourceType: "parent-discussion", academicYear: "2024 讨论", checkedOn: "2026-10-20" },
    { label: "Reddit：AISHK 2025 教师匿名讨论", url: "https://www.reddit.com/r/Internationalteachers/comments/1lfbrqk/australian_international_school_hong_kong_warning/", scope: "单条匿名警示与后续回复；身份未核，只作询问师资稳定和投诉处理的线索，不视为事实或家长评论。", sourceType: "parent-discussion", academicYear: "2025 讨论", checkedOn: "2026-10-20" },
    { label: "教育局：KGV 国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/47.html", scope: "第 7 章对照何文田英基学校地点与课程；不推断目标年级席位。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "英基：2026/27 学费", url: "https://join-us.esf.edu.hk/school-fees/", scope: "第 7 章对照 KGV 的当期 Y7–11 与 Y12–13 收费；学年与 AISHK 日历年不同。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-20" },
    { label: "教育局：加拿大国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/61.html", scope: "第 7 章核 CDNIS 的课程体系与香港仔地点；不跨考试制度比较均分。", sourceType: "government", checkedOn: "2026-10-20" },
    { label: "CDNIS：2026/27 学费", url: "https://www.cdnis.edu.hk/en/admissions/tuition-fees/", scope: "第 7 章对照 Grade 7 收费与资本征费待批说明。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-20" },
    { label: "启历学校：2026/27 学费", url: "https://www.kellettschool.com/admissions/fees-debenture-information", scope: "第 7 章对照 Y7–11 当期学费及新生资本费规则；与 AISHK 学年不同。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-20" },
  ],
"island-school-esf-secondary": [
    { label: "教育局：Island School 国际学校名录", url: "https://internationalschools.edb.gov.hk/en/schools/44.html", scope: "核波老道校址、国际男女中学、全校规模、课程及 LOA 支援；全校数字不代表目标年级空位。", sourceType: "government", checkedOn: "2026-10-18" },
    { label: "校方：Island School 课程", url: "https://island.esf.edu.hk/en/outstanding_education/curriculum/", scope: "核 MYP、IGCSE、DP、CP，八大学习领域、Year 10–11 核心与选修、IBCP 可选三种 BTEC；当届开科另核。", sourceType: "school-official", checkedOn: "2026-10-22" },
    { label: "校方：2026 DP／CP 成绩页", url: "https://island.esf.edu.hk/en/outstanding_education/student_success/", scope: "核 2026 与 2025 图片所属年份；网页本身不列 DP／CP 考生人数。", sourceType: "school-official", academicYear: "2026 DP／CP；2025 IGCSE", checkedOn: "2026-10-22" },
    { label: "校方：Class of 2026 成绩公告", url: "https://island.esf.edu.hk/en/", scope: "官网 2026-07-08 新闻称 DP 与 CP 学生均通过，并列 DP 45/44/43/42 分高分人数与 6 名双语文凭学生；不披露考生总数或分数段分母。", sourceType: "school-official", academicYear: "2026 届 IB 结果", checkedOn: "2026-10-18" },
    { label: "校方：Class of 2026 结果图片", url: "https://island.esf.edu.hk/upload/files/1/file/6a7bc52b74606.jpg", scope: "人工核读 DP 100%、36.6、28% 40+、68% 35+、93% 30+、6 双语文凭及 CP 100%／76%；两路线人数未列。", sourceType: "school-official", academicYear: "2026 考试", checkedOn: "2026-10-22" },
    { label: "校方：2025 IGCSE 结果图片", url: "https://island.esf.edu.hk/upload/files/1/file/68b1737bb288d.jpg", scope: "人工核读成绩项 40%／64%／83% 与 32／35 名学生；总报考项及全届人数未列。", sourceType: "school-official", academicYear: "2025 考试", checkedOn: "2026-10-19" },
    { label: "校方：2026 大学去向页", url: "https://island.esf.edu.hk/en/outstanding_education/university_destinations/", scope: "核 Class of 2026 图片入口；网页正文未列完整毕业人数。", sourceType: "school-official", academicYear: "2026 毕业去向", checkedOn: "2026-10-22" },
    { label: "校方：Class of 2026 去向图片", url: "https://island.esf.edu.hk/upload/files/1/file/6abb02f1aa42a.jpg", scope: "人工核读香港 30.4%、英国 28.1%、美国／澳洲各 11.1%、加拿大 6.4%；毕业人数及分路线人数未列。", sourceType: "school-official", academicYear: "2026 毕业去向", checkedOn: "2026-10-22" },
    { label: "英基：2027/28 中央申请", url: "https://join-us.esf.edu.hk/admissions-primary-secondary/", scope: "核 Year 7 2026-09-01 至 09-30 申请期、迟交候补、当届面试和 offer 时程。", sourceType: "school-official", academicYear: "2027/28 Year 7 入学", checkedOn: "2026-10-19" },
    { label: "英基：中小学申请规则", url: "https://join-us.esf.edu.hk/primary-secondary-admissions-process/", scope: "核 2016 年出生对应 2027/28 Year 7、四校偏好、随机编号、Year 12 条件及 Year 6 升中边界。", sourceType: "school-official", academicYear: "2027/28 年级表；现行规则", checkedOn: "2026-10-22" },
    { label: "英基：关联小学升中表", url: "https://join-us.esf.edu.hk/admissions/", scope: "核 Glenealy、Peak、Beacon Hill 对应 Island School；学习支援及 12 月 1 日后入读者另按流程。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "英基：2026/27 学费及资本征费", url: "https://join-us.esf.edu.hk/school-fees/", scope: "核 Y7–11 HK$188,300、Y12–13 HK$174,200、HK$2,800 申请费、NCL 按年级及订金抵扣。", sourceType: "school-official", academicYear: "2026/27 学费；NCL 现行规则", checkedOn: "2026-10-22" },
    { label: "英基：Learning Support 入学", url: "https://join-us.esf.edu.hk/learning-support/", scope: "核 LOA 框架与较高支持需要的中央审核流程；港岛中学目标年级容量未公开。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "英基：财政援助计划", url: "https://www.esf.edu.hk/financial-assistance-scheme/", scope: "核突发困难援助和通常不在入学首年批出；个人资格另核。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：Island School Student Support & Wellbeing", url: "https://island.esf.edu.hk/en/outstanding_education/student_support_wellbeing/", scope: "核对校方公开的学生支援与身心健康服务；页面说明不代表个别学生可获服务强度、名额或时数。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "校方：Island School 招生联系", url: "https://island.esf.edu.hk/en/admissions/", scope: "核中央招生处理申请、校方与英基两组联系方式及访校需预约。", sourceType: "school-official", checkedOn: "2026-10-19" },
    { label: "英基：Year 6 关联校转衔", url: "https://join-us.esf.edu.hk/transitions-and-transfers/", scope: "核三所关联小学、12 月 1 日入读时点、体系学位保障与较晚加入者的不同安排。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "西岛中学：高中路线", url: "https://wis.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview/years-12-13/", scope: "第 7 章比较 DP、CP 与 BTEC 选项；不代表当届全部开科。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "南岛中学：学术路线", url: "https://sis.esf.edu.hk/en/outstanding_education/curriculum/academic_pathway/", scope: "第 7 章比较 IGCSE、DP、CP 和校本文凭选择。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "啓新书院：课程", url: "https://rchk.esf.edu.hk/en/outstanding_education/curriculum/curriculum_overview", scope: "第 7 章比较 Y7–11 MYP 连续性和高中 DP／CP；收生及费用另按英基当届页面。", sourceType: "school-official", checkedOn: "2026-10-20" },
    { label: "Reddit：前家长谈中文经验", url: "https://www.reddit.com/r/HongKong/comments/1603kpk/if_your_second_language_english_are_you_still/", scope: "2023 匿名自述旧家庭经历；不能代表现届中文教学质量或多数家长评价。", sourceType: "parent-discussion", academicYear: "2023 匿名讨论", checkedOn: "2026-10-20" },
    { label: "《英文虎报》：新校舍首日交通报道", url: "https://www.thestandard.com.hk/news/article/44931/ESF-school-under-fire-for-new-campus-snags", scope: "2022 校舍启用首日的采访与学校回应；不得推断问题延续到 2026 年。", sourceType: "media-report", academicYear: "2022-08-24 报道", checkedOn: "2026-10-20" },
  ],
"st-hilarys-kg": [
    { label: "教育王國：2019 年德萃幼稚園家長討論", url: "https://www.edu-kingdom.com/forum.php?goto=nextoldset&mod=redirect&tid=3739005", scope: "一位自述曾就讀德萃幼稚園家長的歷史經驗；未能明確對應現時馬鞍山或紅磡校舍，不作當屆滿意度估計。", sourceType: "parent-discussion", academicYear: "2019 年匿名討論", checkedOn: "2026-10-17" },
    { label: "2026/27 官方概览：德萃马鞍山", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6162900001", scope: "马鞍山校舍的师资、时段比例与服务，不能合并红磡。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "2026/27 官方概览：德萃红磡", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6044450001", scope: "红磡校舍的师资、时段比例与服务。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：德萃马鞍山收费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/616290.pdf", scope: "2026/27 K1–K3 每期 HK$6,980，11 期；PN 另计。", sourceType: "government", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：德萃红磡收费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/604445.pdf", scope: "2026/27 K1–K3 每期 HK$6,980，11 期；PN 另计。", sourceType: "government", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：K2／K3 專項及 K3–G1 銜接", url: "https://kindergarten.sthilarys.edu.hk/?page_id=6999", scope: "核對每週領導力活動、模擬面見及在小學校舍的一週銜接課；不代表小學錄取保證。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：2025/26 收費", url: "https://kindergarten.sthilarys.edu.hk/?page_id=359", scope: "歷史收費及當年每期 HK$80 補貼；不可推定延續至 2026/27。", sourceType: "school-official", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "教育局學校搜尋：德萃幼稚園（馬鞍山）", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=616290000111", scope: "校址、登記類別及服務時段；資料庫所列學費與師生比應按學年核實。", sourceType: "school-profile", checkedOn: "2026-10-17" },
    { label: "教育局學校搜尋：德萃幼稚園（紅磡）", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=604445000111", scope: "校址、登記類別及服務時段；不可與馬鞍山校舍混為同一校址。", sourceType: "school-profile", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：2027/28 招生程序", url: "https://kindergarten.sthilarys.edu.hk/?page_id=943", scope: "兩校舍分別面見日期、截止日及遲交安排。", sourceType: "school-official", academicYear: "2027/28 招生", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：課程特色", url: "https://kindergarten.sthilarys.edu.hk/?page_id=74", scope: "校方對閱讀、語言及探究課程的自述；具體課時須按校舍核實。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：2021/22 校訊", url: "https://kindergarten.sthilarys.edu.hk/wp-content/uploads/2021/10/2122_01Newsletter_Sept.pdf", scope: "歷史雙軌升小學位說明；不可直接當作 2027/28 入學家庭的現行承諾。", sourceType: "school-official", academicYear: "2021/22 歷史資料", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：2017 屆升小個案", url: "https://kindergarten.sthilarys.edu.hk/?p=4919", scope: "校方稱該屆 18 名 K3 學生獲多所小學取錄，列德萃、拔萃女小學、聖保羅男女中學附屬小學等；沒有逐校人數及最終就讀數。", sourceType: "school-official", academicYear: "2017 歷史結果", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：2016–2020 屆升小名錄", url: "https://kindergarten.sthilarys.edu.hk/?page_id=7028", scope: "歷史直私及官津小學名稱，沒有逐年分母、逐校人數或現屆結果。", sourceType: "school-official", academicYear: "2016–2020 歷史結果", checkedOn: "2026-10-17" },
    { label: "德萃幼稚園：升小喜訊", url: "https://kindergarten.sthilarys.edu.hk/?p=6416", scope: "校方歷史校訊列聖保羅男女中學附屬小學 4 人、拔萃女小學 1 人等；頁面只顯示 5 月 8 日，未顯示年份和畢業分母，不能當現屆取錄率。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：聖保羅男女中學附屬小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=246", scope: "2026 小學概覽列直資及一條龍中學；用於解釋歷史考獲學校層級，不代表現屆錄取率。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
    { label: "2026 小學概覽：拔萃女小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=528", scope: "2026 小學概覽列私立女校及一條龍中學；用於解釋歷史考獲學校層級。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
  ],
"catiline": [
    { label: "教育王國：2016 年嘉德麗 PN 匿名討論", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3266907", scope: "一名論壇用戶對 PN 課程和雜費的個人感受，身份、校區和就讀經驗未能獨立確認，不代表現時 K1–K3。", sourceType: "parent-discussion", academicYear: "2016 年匿名討論", checkedOn: "2026-10-17" },
    { label: "2026/27 官方概览：嘉德丽", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2312660001", scope: "K1–K3 学费、师资、时段比例；PN 费用不可套用。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：嘉德丽收费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/231266.pdf", scope: "K1–K3 半日 HK$64,200，全日 HK$85,560，膳食 HK$8,040。", sourceType: "government", academicYear: "2026/27 概览同价", checkedOn: "2026-10-17" },
    { label: "校方：经典诵读", url: "https://www.catiline.edu.hk/classicshk.html", scope: "强调反复诵读但不要求背诵，建议每日亲子共读 10–15 分钟。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：《翹楚啟蒙》", url: "https://www.catiline.edu.hk/nurturingelitehk.html", scope: "每级 12 册德育故事教材；教材数量不代表学习成效。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "校方：历年升小名单", url: "https://www.catiline.edu.hk/primary1hk.html", scope: "列小学名称但没有年度、毕业分母和最终入读人数；不可推算录取率。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "嘉德麗：學費減免計劃", url: "https://www.catiline.edu.hk/schemehk.html", scope: "個別審批減免，不應當成普遍可得學費。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局學校搜尋：嘉德麗中英文幼稚園", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=231266000113", scope: "核校址、辦學類別及登記資料。", sourceType: "school-profile", checkedOn: "2026-10-17" },
    { label: "嘉德麗官方網站：英語及普通話課程", url: "https://www.catiline.edu.hk/bilingualhk.html", scope: "核對校方公布的半日班英語及普通話時段、教材及教學方法；屬校方課程說明。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "嘉德麗官方網站：申請須知", url: "https://www.catiline.edu.hk/guidancenotehk-721767.html", scope: "核對 2026/27、2027/28 年級資格、申請步驟和助學金說明；招生資料會更新。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "嘉德麗官方網站：家長回饋", url: "https://www.catiline.edu.hk/testimonialscn.html", scope: "校方選載家長回饋，非獨立或具代表性的抽樣。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育王國：嘉德麗討論帖", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2667758", scope: "歷史家長討論；內容年代久遠，只作線索，不代表現況。", sourceType: "parent-discussion", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：拔萃女小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=528", scope: "私立女校及一條龍中學；嘉德麗歷年名單無年份、人數或沙田校舍拆分。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
    { label: "2026 小學概覽：保良局陳守仁小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=529", scope: "英文直資；嘉德麗歷年名單不能推算逐屆取錄比例。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
    { label: "2026 小學概覽：德望小學暨幼稚園", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=443", scope: "私立女校；嘉德麗歷年名單不能推算逐屆取錄比例。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
  ],
"plk-tam-au-yeung-siu-fong": [
    { label: "教育局：2026/27 九龍城區 K1-K3 學位空缺", url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf", scope: "截至 2026-10-13，本校 K1 為 P，即正處理候補名單；僅作上一輪收生鬆緊線索，不是 2027/28 取錄率。", sourceType: "government", academicYear: "2026/27；截至 2026-10-13", checkedOn: "2026-10-17" },
    { label: "教育王國：2022 年譚歐陽少芳畢業生家長討論", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3870599", scope: "同一位自述孩子約 2020 年畢業的家長多次回覆，僅按一名家長計；語境、教師關懷和數學深淺屬個人回憶。", sourceType: "parent-discussion", academicYear: "2022 年匿名討論；約 2020 年就讀經驗", checkedOn: "2026-10-17" },
    { label: "2026/27 官方概览：保良局谭欧阳少芳", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5391040001", scope: "K1–K3 半日收费 HK$6,620，非免费；师资与在读数据。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：保良局谭欧阳少芳收费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/539104.pdf", scope: "2026/27 扣资助后 HK$662 × 10 期。", sourceType: "government", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "校方：2025/26 小一结果", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/activities/show/107", scope: "附直私与官津两图；缺毕业分母、百分比口径和最终就读人数。", sourceType: "school-official", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "校方：2025/26 考获直资／私立小学原图", url: "https://www.plkkgs.edu.hk/plktaysfmkg/uploads/photo/17818326261965.jpg", scope: "林文灿 31%、国际基督教优质音乐 13%、陆庆涛 9%、陈守仁 8%；图注明部分学生获多校取录，比例不可相加。", sourceType: "school-official", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：保良局林文燦英文小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=116", scope: "直資、英文教學；沒有列出一條龍、直屬或聯繫中學。『中上層級英文直資』屬本報告的擇校判斷，並非官方評級。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：國際基督教優質音樂中學暨小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=454", scope: "私立、基督教音樂特色、一條龍中學為同校中學部；特色定位不能按考獲比例直接與英文直資排名。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：保良局陸慶濤小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=214", scope: "直資、一條龍中學為保良局羅氏基金中學；入讀小學條款仍以當屆公布為準。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：保良局陳守仁小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=529", scope: "直資、英文教學，為原圖考獲比例第 4 的目標校；沒有一條龍中學。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-17" },
    { label: "校方：2025/26 官立／资助小学原图", url: "https://www.plkkgs.edu.hk/plktaysfmkg/uploads/photo/17833143281970.jpg", scope: "奉基 15%、黄埔宣道 11%、云泉 11%、马头涌官立红磡湾 10%；图未给毕业分母及最终就读口径。", sourceType: "school-official", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "校方：2027/28 申请细则", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/custom/custom_page/33", scope: "出生资格、面见、结果和注册；旧流程图的网上首轮截止已被新通告调整。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-17" },
    { label: "教育局：保良局譚歐陽少芳紀念幼稚園質素評核", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PLK_TamAuYeungSiuFong.pdf", scope: "2020 年當時課堂、功課、評估及家長支援觀察，不能直接代表現況。", sourceType: "independent-inspection", academicYear: "2020 評核", checkedOn: "2026-10-17" },
    { label: "保良局譚歐陽少芳紀念幼稚園：升小園地", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/activities/20", scope: "逐年列示升小情況；須核對圖像內分母和口徑。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "保良局譚歐陽少芳紀念幼稚園：2024/25 派位圖", url: "https://www.plkkgs.edu.hk/plktaysfmkg/api/cms/pdf/file/1616", scope: "首三志願 82% 屬官津派位志願結果，不是直私錄取率。", sourceType: "school-official", academicYear: "2024/25", checkedOn: "2026-10-17" },
    { label: "校方：2027/28 K1 新生申請最新安排", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/news/article/142", scope: "第一階段截止日與第二階段面見日。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-17" },
    { label: "校方：收生資料簡介", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk/custom/custom_page/32", scope: "網上報名、註冊證、非華語面見支援及校方課程自述。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "保良局譚歐陽少芳紀念幼稚園官方網站", url: "https://www.plkkgs.edu.hk/plktaysfmkg/hk", scope: "校方公布的招生、校園生活及課程資訊；當屆安排以最新通告為準。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "保良局官方介紹：譚歐陽少芳紀念幼稚園—紅磡", url: "https://www.poleungkuk.org.hk/en/service/education/plktaysfmkg20241112", scope: "校方/辦學團體介紹紅磡校服務特色與語言環境；屬自述資料。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局學校搜尋：保良局譚歐陽少芳紀念幼稚園", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=539104000111", scope: "核校名、校址及註冊資料。", sourceType: "school-profile", checkedOn: "2026-10-17" },
  ],
"on-kei-nursery": [
    { label: "教育局：2026/27 九龍城區 K1-K3 學位空缺", url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf", scope: "截至 2026-10-13，本校 K1 為 Y，即有空缺；不包含延時服務學位，也不保證下一輪有位。", sourceType: "government", academicYear: "2026/27；截至 2026-10-13", checkedOn: "2026-10-17" },
    { label: "2026/27 官方概览：安基", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5637810001", scope: "K1–K3 全日 HK$27,948，PN 另为 HK$67,380；师资与注册学额。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：安基历史收费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/563781.pdf", scope: "2025/26 K1–K3 膳食 HK$5,676；不能当作 2026/27 膳食。", sourceType: "government", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "校方：2026/27 招生文件", url: "https://oi.ttmssd.org/wp-content/uploads/2025/06/OI_2627_admission_E.pdf", scope: "历史申请材料、面见与优先因素；2027/28 日期需新公告。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：安基幼兒學校質素評核", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TTMHK_OnKei.pdf", scope: "2023 年課堂、師資及家校支援的歷史觀察。", sourceType: "independent-inspection", academicYear: "2023 評核", checkedOn: "2026-10-17" },
    { label: "基督教香港崇真會社會服務部：嬰幼兒服務", url: "https://web.ttmssd.org/services/child", scope: "核幼兒學校宗旨、服務年齡、兼收服務及家校合作說明。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "基督教香港崇真會安基幼兒學校官方網站", url: "https://oi.ttmssd.org/", scope: "查閱安基校舍、課程及當屆招生資訊；收費須核對當屆批准資料。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局學校搜尋：基督教香港崇真會安基幼兒學校", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=563781000113", scope: "核校名、地址和註冊資料。", sourceType: "school-profile", checkedOn: "2026-10-17" },
  ],
"kowloon-city-baptist-kg": [
    { label: "教育局：2026/27 九龍城區 K1-K3 學位空缺", url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kowloon%20City_K1-K3%20Vacancy.pdf", scope: "截至 2026-10-13，本校 K1 為 Y，即有空缺；沒有分班別名額或下一輪預測。", sourceType: "government", academicYear: "2026/27；截至 2026-10-13", checkedOn: "2026-10-17" },
    { label: "2026/27 官方概览：九龙城浸信会", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3240780001", scope: "师资、时段比例、班别与收费。", sourceType: "school-profile", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "教育局：九龙城浸信会收费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/324078.pdf", scope: "半日免费；全日学费 HK$11,750，膳食 HK$7,000。", sourceType: "government", academicYear: "2026/27", checkedOn: "2026-10-17" },
    { label: "校方：2025/26 小一结果", url: "https://www.kcbckg.edu.hk/2025-26-%E5%B0%8F%E4%B8%80%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E7%B5%90%E6%9E%9C/", scope: "首三志愿 82% 包含自行分配，缺毕业分母与最终就读人数。", sourceType: "school-official", academicYear: "2025/26", checkedOn: "2026-10-17" },
    { label: "校方：2027/28 入学申请", url: "https://www.kcbckg.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/", scope: "全年收表、面见形式、优先因素、结果通知及注册费。", sourceType: "school-official", academicYear: "2027/28", checkedOn: "2026-10-17" },
    { label: "教育局：九龍城浸信會幼稚園質素評核", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KlnCityBaptist.pdf", scope: "2025 年課堂、英語與遊戲觀察及半日班自選區角時間建議。", sourceType: "independent-inspection", academicYear: "2025 評核", checkedOn: "2026-10-17" },
    { label: "九龍城浸信會幼稚園官方網站", url: "https://www.kcbckg.edu.hk/", scope: "查閱校方課程、招生及校園資料；當屆規則以公告為準。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "九龍城浸信會：2026 年招生及課程消息", url: "https://www.baptist.org.hk/content/view/weekly-news", scope: "核對校方公布的自主遊戲、英語、音樂、藝術及上午雙語班資訊。", sourceType: "school-official", checkedOn: "2026-10-17" },
    { label: "教育局學校搜尋：九龍城浸信會幼稚園", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=324078000111", scope: "核校名、校址、辦學及註冊資料。", sourceType: "school-profile", checkedOn: "2026-10-17" },
    { label: "教育王國：九龍城浸信會幼稚園討論", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2275384", scope: "僅少數且年代久遠的討論回覆，不代表當前家長整體意見。", sourceType: "parent-discussion", checkedOn: "2026-10-17" },
    { label: "2026 小學概覽：喇沙小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=87", scope: "資助男校；校方 2025/26 圖只列部分獲派學校，無逐校人數。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
    { label: "2026 小學概覽：拔萃小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=93", scope: "資助男女校，與拔萃女小學不同；校方圖所列為官津去向。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
    { label: "2026 小學概覽：協恩中學附屬小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=99", scope: "資助女校；校方 2025/26 圖無逐校人數。", sourceType: "school-profile", academicYear: "2026 小學概覽", checkedOn: "2026-10-18" },
  ],
"tak-sun-kg": [
  {
    "label": "教育局2026/27幼稚园概览：德信",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=1335820001",
    "scope": "核校址、半日班免费、2025年9月师生比和在读人数；K1在读45不是新生学额。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27；人数2025年9月"
  },
  {
    "label": "教育局收费证：德信",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/133582.pdf",
    "scope": "2026年9月生效，上午与下午K1-K3扣资助后免费；用品另计。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27"
  },
  {
    "label": "校方2027/28 K1收生网页",
    "url": "https://taksunkg.edu.hk/?page_id=3280",
    "scope": "官网正文的网申截止为10月15日；与下载须知10月16日不一致，报告保留差异。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-26",
    "academicYear": "2027/28"
  },
  {
    "label": "校方2027/28网上申请须知",
    "url": "https://taksunkg.edu.hk/?wpdmdl=3302",
    "scope": "网申细节、面见、优先因素、邮件结果及注册；下载文件写10月16日截止。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-26",
    "academicYear": "2027/28"
  },
  {
    "label": "校方2027/28亲临申请须知",
    "url": "https://taksunkg.edu.hk/?wpdmdl=3300",
    "scope": "纸本截至10月15日，面见、邮递结果、注册费与退学安排。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-26",
    "academicYear": "2027/28"
  },
  {
    "label": "校方2026/27 K2-K3插班须知",
    "url": "https://taksunkg.edu.hk/?wpdmdl=3224",
    "scope": "历史插班材料、40元及临时注册信要求；实时报读空位须向校方问。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27"
  },
  {
    "label": "校方课程与升小介绍",
    "url": "https://taksunkg.edu.hk/?page_id=40",
    "scope": "主题、英语及普通话活动；约60%毕业男生升德信学校未列学年与人数。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-26"
  },
  {
    "label": "教育局德信幼稚园质素评核",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TakSun.pdf",
    "scope": "2022年探究观察及K3课业、美艺选择的改善要求；非当前整改完成证明。",
    "sourceType": "independent-inspection",
    "checkedOn": "2026-10-26",
    "academicYear": "2022"
  },
  {
    "label": "教育局2026/27 K1-K3空缺CSV",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/K1-K3_vacancy_information_tc_202627.csv",
    "scope": "截至2026年10月13日德信K1-K3均有空缺；不推下一轮取录率。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27；截至2026-10-13"
  },
  {
    "label": "教育局2027/28电子注册及转校安排",
    "url": "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/2728_admission_arrangements.html",
    "scope": "与德信校方PDF的纸本退证文字交叉核对；当届转校须到原校扫描电子注册证二维码取消注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2027/28"
  },
  {
    "label": "2026小学概览：德信学校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=515",
    "scope": "资助男校、31校网；与德信中学为联系中学，不构成幼稚园直升小学。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-26",
    "academicYear": "2026"
  },
  {
    "label": "am730校长采访",
    "url": "https://www.am730.com.hk/article/607971",
    "scope": "2025年校长自述科探、K3计划书及面见观察，非独立成效统计。",
    "sourceType": "media-report",
    "checkedOn": "2026-10-26",
    "academicYear": "2025-10-13"
  },
  {
    "label": "教育王国：德信家长历史讨论",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2964791",
    "scope": "2014/15两位自述在读或毕业家长谈德育、英语及作业；不能代表现届。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2014–2015"
  },
  {
    "label": "教育王国：幼小升读讨论",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3604500",
    "scope": "2018历史讨论提醒同址不等于自动直升；录取规则仍按现行官方文件。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2018"
  },
  {
    "label": "小红书：德信面试个案",
    "url": "https://www.xiaohongshu.com/explore/636541c5000000000900662b",
    "scope": "2022年单一申请经历，不作为2027/28固定题库。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2022"
  },
  {
    "label": "小红书：德信与仁爱堂择校提问",
    "url": "https://www.xiaohongshu.com/explore/690b1c310000000004012b1e",
    "scope": "2025年申请家长的半日/全日取舍；语言频次未经校方核实，评论未能取得原文。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2025"
  }
],
"yot-chan-cheng-yuk-yee-kg": [
  {
    "label": "教育局2026/27幼稚园概览：仁爱堂陈郑玉而",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5642490001",
    "scope": "核全日班年费29808元、2025年9月K1在读27与师资；旧在读数不是新生名额。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27；人数2025年9月"
  },
  {
    "label": "教育局学校搜寻：564249",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=564249000113",
    "scope": "校号、地址及全日班身份；登记分类“私立”与概览非牟利属不同口径。",
    "sourceType": "government",
    "checkedOn": "2026-10-26"
  },
  {
    "label": "教育局2024质素评核",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/YOT_ChanChengYukYee.pdf",
    "scope": "2024年11月探究、表达、教师支持，以及K3课业、午睡和评价准则改善要求。",
    "sourceType": "independent-inspection",
    "checkedOn": "2026-10-26",
    "academicYear": "2024"
  },
  {
    "label": "教育大学校长访谈",
    "url": "https://www.lib.eduhk.hk/lver/interviews/yotccyy/",
    "scope": "2022年校长解释生命教育、亲子活动及3C理念；属校方解释而非效果实验。",
    "sourceType": "university-official",
    "checkedOn": "2026-10-26",
    "academicYear": "2022"
  },
  {
    "label": "校方署名账号：2025/26升小图",
    "url": "https://www.xiaohongshu.com/explore/6aa0f5db000000001401f3d1",
    "scope": "同名账号发布，官网未能确认账号归属。原图列入读比例，前三以官津为主；无毕业人数分母，直私比例不能换算人数。",
    "sourceType": "school-attributed-social",
    "checkedOn": "2026-10-26",
    "academicYear": "2025/26；发布2026-09-09"
  },
  {
    "label": "校方署名账号：2024/25升小图",
    "url": "https://www.xiaohongshu.com/explore/688052cc000000002203ccd5",
    "scope": "前届去向作历史对照；“心仪”无定义，不当作直私成功率。",
    "sourceType": "school-attributed-social",
    "checkedOn": "2026-10-26",
    "academicYear": "2024/25"
  },
  {
    "label": "教育局2026/27 K1-K3空缺CSV",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/K1-K3_vacancy_information_tc_202627.csv",
    "scope": "截至2026年10月13日K1/K2/K3为有/无/有；非实时学额及下一轮报录率。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27；截至2026-10-13"
  },
  {
    "label": "教育局2027/28 K1注册证提示",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/202728%20K1%20Admission%20Arrangements/Points%20to%20note_RC_TC_27_28_clean.pdf",
    "scope": "通用结果和注册流程，非本校面见日期或优先规则。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2027/28"
  },
  {
    "label": "教育王国：2024自述在读家长",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3879051",
    "scope": "单一现任家长的课程和教师观察；身份未独立核验，不当满意度样本。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2024"
  },
  {
    "label": "教育王国：2017在读及毕业家庭讨论",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3530301",
    "scope": "历史家庭体验与个别升小经历；不用于推断2026年课程或整届直私成果。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2017"
  },
  {
    "label": "教育王国：2022 N班申请者投诉",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3866894",
    "scope": "单一个案涉及申请沟通，无校方回应及独立裁定；不能概括学校对特殊需要幼儿的政策。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2022"
  },
  {
    "label": "小红书：2026开放日访客",
    "url": "https://www.xiaohongshu.com/explore/6a67480a0000000010026f66",
    "scope": "访客对校园和活动的短时观察，不等于长期在读体验。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2026"
  },
  {
    "label": "小红书：两校选择提问",
    "url": "https://www.xiaohongshu.com/explore/690b1c310000000004012b1e",
    "scope": "申请阶段家庭比较半日德信与全日仁爱堂，非两校课堂成效对照。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2025"
  }
],
"salvation-army-chan-kwan-tung-kg": [
  {
    "label": "教育局2026/27幼稚园概览：陈昆栋",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3251980001",
    "scope": "核免费半日、2025年9月K1在读49及师资；238是课室总容额，不是每年招生额。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27；人数2025年9月"
  },
  {
    "label": "教育局2026质素评核",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf",
    "scope": "2026年2月课堂和支援观察；亦要求调节过深课业、增加孩子主导性及中文交流。",
    "sourceType": "independent-inspection",
    "checkedOn": "2026-10-26",
    "academicYear": "2026-02"
  },
  {
    "label": "教育局收费证：陈昆栋",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/325198.pdf",
    "scope": "2020年生效的免费收费证；2026/27当前金额以当届概览交叉核。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2020生效；2026/27复核"
  },
  {
    "label": "概览链接的校方入学申请表",
    "url": "https://kgp2026.kindergartenprofile.com/wp-content/uploads/2026/04/ApplicationForm_CKTKG-4.pdf",
    "scope": "K1-K3、上下午及出生证明等材料与30元申请费；表本身未写2027/28面见日期。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-26"
  },
  {
    "label": "教育局2026/27油尖旺K1-K3空缺",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yau%20Tsim%20and%20Mong%20Kok_K1-K3%20Vacancy.pdf",
    "scope": "直接原件截至2026年10月13日K1-K3均有空缺；旧搜索摘要不适用。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27；截至2026-10-13"
  },
  {
    "label": "教育局2027/28收生指引",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/202728%20K1%20Admission%20Arrangements/202728_Admission%20Guidelines_TC.pdf",
    "scope": "通用最低年龄、面见起始和注册证规则；不当成本校面试时间。",
    "sourceType": "government",
    "checkedOn": "2026-10-26",
    "academicYear": "2027/28"
  },
  {
    "label": "教育王国：陈昆栋与同楼园比较",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2366756",
    "scope": "2012–2013旧讨论只反映半日/全日照顾取舍，非现届在读教学口碑。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2012–2013"
  },
  {
    "label": "2014个人导览及面试记录",
    "url": "http://amyandkit1226.blogspot.com/2014/10/blog-post_20.html",
    "scope": "同一申请家庭的历史参观经历；不是本校在读体验或现届面试题。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2014"
  },
  {
    "label": "亲子王国：九龙区择校提问",
    "url": "https://www.baby-kingdom.com/forum.php?mod=viewthread&tid=23515871",
    "scope": "2021年申请阶段比较，没有可用的近期在读教学评价。",
    "sourceType": "parent-discussion",
    "checkedOn": "2026-10-26",
    "academicYear": "2021"
  },
  {
    "label": "同楼卜凯赛琳幼稚园2026/27概览",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5665350001",
    "scope": "对照全日与PN服务；同楼二层不同校号，收费不与本校混算。",
    "sourceType": "school-profile",
    "checkedOn": "2026-10-26",
    "academicYear": "2026/27"
  }
],

"lh-sf": [
  {
    "label": "教育局《幼稚園概覽2026/27》：凯帆荟",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=5612070001",
    "scope": "核学段、班制、费用及2025年9月在读人数；全日班列为没有开办且人数为0。获批费率不代表实际招生。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "学之园：2026/27学费",
    "url": "https://www.learninghabitat.org/en/admission/fees",
    "scope": "凯帆荟半日英粤班每月$7,500、英普班每月$7,800，一年12期；只支持该届半日收费。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：凯帆荟收费证",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/561207.pdf",
    "scope": "列核准收费；全日班获批费率不代表当届实际开班，须与幼稚园概览的开办记录一并理解。",
    "sourceType": "government",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "学之园：凯帆荟校舍资料",
    "url": "https://www.learninghabitat.org/en/campus/tai-kok-tsui/hampton-loft-campus",
    "scope": "核校址及校方列出的校舍资料；不支持“全港唯一”或课程使用频率判断。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "学之园：2027/28申请及RIE意向登记",
    "url": "https://www.learninghabitat.org/en/admission/online-application",
    "scope": "官方正文实际重读；K1生于2023-09-01至2024-12-31，申请2026-08-01九时至10-16，面见11-09/10、10-23电邮；PN生于2024-08-15至2025-12-31，日期2026年12月公布；其他PN–K3只记RIE有位才联系。没有校本名额、录取率、双亲/简介会加分或分校较易证据。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28；其他年级2026/27"
  }
],
"wyps": [
  {
    "label": "《小學概覽2026》：番禺會所華仁小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=416",
    "scope": "学校提供并核实的资料，明确列香港华仁书院为直属中学；2026/27班级、收费及评估资料。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年度中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "直属中学保留学额规则及资格；85%是中学统一派位余下学额上限，不是小学毕业生直升比例。",
    "sourceType": "government",
    "academicYear": "2027/28",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "番禺会所华仁小学：学校网选择与直属学额说明",
    "url": "https://www.puwy.edu.hk/doc/%E4%B8%AD%E5%AD%B8%E5%AD%B8%E4%BD%8D%E5%88%86%E9%85%8D%E8%BE%A6%E6%B3%95%EF%BC%9A%E5%AD%B8%E6%A0%A1%E7%B6%B2%E9%81%B8%E6%93%87%E8%88%87%E7%9B%B4%E5%B1%AC%E4%B8%AD%E5%AD%B8%E5%AD%B8%E9%A1%8D%E4%BF%9D%E7%95%99%E7%9A%84%E5%AE%89%E6%8E%92.pdf",
    "scope": "校方较早说明以120名P6学生、79个直属学额作假设案例；不是现届名额或毕业生升读比例。",
    "sourceType": "school-official",
    "academicYear": "历史示例",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育王国：番禺会所华仁小学讨论",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3878263",
    "scope": "2023年匿名家长意见涉及功课体验且存在差异；不代表全体家庭或当前安排。",
    "sourceType": "parent-discussion",
    "academicYear": "2023",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2027年度小一入学常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/FAQ_TC.pdf",
    "scope": "完整五页读取；第8题明确甲类必收与乙类分数排序，同分超额由学校自行抽签或交教育局随机处理；第12题不设笔面试。第4题只交一份官津自行申请，重复电子/纸本亦不可；第7题接受直资学位的统筹后果。只支持制度，不证明本校某分数稳入。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；2026年9月更新"
  }
],
  "cmask": [
  {
    "label": "教育局《小學概覽2026》：基督教宣道會宣基小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=219",
    "scope": "核對校網95、資助男女校、基督教、中文授課、校舍與設施、2026/27班級數及2025/26教師資歷；2026/27學校發展基金$200。學校資料由校方提供及核實。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "基督教宣道會宣基小學：2025/26升中派位結果",
    "url": "https://www.sunkei.edu.hk/tc/%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D%E7%B5%90%E6%9E%9C",
    "scope": "校方公布自行分配及統一派位階段首三志願合計100%、首志願94%，並列出獲派中學名單舉隅；未見畢業生總數或每校人數，不能推算個人錄取率、Band 1比例或畢業生去向分布。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "基督教宣道會宣基小學：入學資訊",
    "url": "https://www.sunkei.edu.hk/tc/admission",
    "scope": "校方招生入口；入學年度、申請日期及收生細節須以當屆公告為準。僅作招生資料入口，不推斷錄取難度或面試題目。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  }
],
  "cneclmc": [
  {
    "label": "教育局《小學概覽2026》：中華傳道會呂明才小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=156",
    "scope": "核對校網66、資助男女校、青衣長發邨地址、辦學團體、中文授課、2026/27班級結構、費用及2025/26教師資料；三類中學關係欄均為「-」。學校資料由校方提供及核實。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "中華傳道會呂明才小學：2025/26年度升中派位資訊",
    "url": "https://www.cneclmc.edu.hk/page/index.php?lang=zh&mode=published&refid=3887",
    "scope": "校方列出2025/26年度獲派中學名單；未列逐校人數、畢業生總數或各志願比例。名單只證明校方列示的去向，不代表分布比例或Banding成績。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "中華傳道會呂明才小學：入學資訊",
    "url": "https://www.cneclmc.edu.hk/",
    "scope": "校方招生及公告入口；動態招生安排須按當屆校方公告核實。社交平台搜尋未找到足以形成該校近期家長口碑樣本的可核實公開討論。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  }
],
  "cps": [
  {
    "label": "教育局《小學概覽2026》：啟思小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=111",
    "scope": "核對私立男女校、校址、校訓、中文及英文、三類中學關係欄、2026/27班級結構、2025/26教師資料及校方提交的2026/27全年費用。概覽費用與校方現行學校資料頁不一致，報告須並列差異並提示向校方確認。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啟思小學：學校資料及2026/27收費",
    "url": "https://www.creativeprisch.edu.hk/%E5%AD%B8%E6%A0%A1%E8%B3%87%E6%96%99",
    "scope": "校方現行頁列明IB World School、24班、54名教師（包括全職輔導主任及6名資深英語母語教師）、2026/27學費小一至小三$151,580、小四至小六$154,880；與《小學概覽2026》所列學費有差異，不能將兩者合併成單一確定值。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啟思小學：2025/26學生獲派中學名單",
    "url": "https://www.creativeprisch.edu.hk/copy-of-%E6%A0%A1%E7%B6%B2%E6%B4%BE%E4%BD%8D-1",
    "scope": "校方列出2025/26學生獲派中學名單；未列逐校人數、畢業生總數或錄取率。學校與啟思中學列為聯繫學校不等同教育局正式直屬／一條龍關係，亦不保證升讀。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啟思小學：小一入學申請",
    "url": "https://www.creativeprisch.edu.hk/%E7%94%B3%E8%AB%8B%E5%85%A5%E5%AD%B8",
    "scope": "校方公開報名文件、報名費及分階段小組面見安排；具體日期按招生年度更新。未公開面見時長、題目或錄取權重，報告不沿用論壇傳聞作現行流程。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：啟思小學小一選校討論",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3862888",
    "scope": "單一討論串的家長個人意見，年份及家庭背景各異；只作有限口碑線索，不代表全體在讀家庭，也不支持正負面比例統計。",
    "sourceType": "parent-discussion",
    "academicYear": "2021/22前後討論",
    "checkedOn": "2026-10-28"
  }
],
"sscps": [
  {
    "label": "《小學概覽2026》：聖士提反書院附屬小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=252",
    "scope": "学校提供并核实：直属中学、2026/27学费、24班（每级4班）、30间课室及约20,000平方米校舍；课室数不等于班数。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：聖士提反書院附屬小學收费证",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/517372.pdf",
    "scope": "2026-09-01生效；小学每年学费$97,150，小六宿费另$51,250，合计$148,400。",
    "sourceType": "government",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "聖士提反書院附屬小學：学校简介",
    "url": "https://www.sscps.edu.hk/zh/schoolprofile",
    "scope": "校方介绍课程、1938年创校及小六一年寄宿；“本港唯一寄宿小学”属于校方自述。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "聖士提反書院附屬小學：2025/26寄宿课程",
    "url": "https://sscps.edu.hk/doc/Boarding_Programme1.pdf",
    "scope": "校方寄宿课程目标与内容，资料为2025/26；费用以2026/27收费证为准。",
    "sourceType": "school-official",
    "academicYear": "2025/26",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "聖士提反書院附屬小學：入学申请",
    "url": "https://www.sscps.edu.hk/zh/admission",
    "scope": "校方申请程序页面；动态日期需按当届公告核实。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2025/2027中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "公开curl下载并完整五页读取；一般参加派位直属/联系余额85%/25%须结合组别、乙部首选、超额及跨网条件；另区分参加派位与非参加派位直资。仅支持制度边界，不据此断定圣士提反书院当届校本保留人数或直接把85%套为其保证。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2025/2027升中周期；2026年9月版"
  }
],
"ssgps": [
  {
    "label": "《小學概覽2026》：聖士提反女子中學附屬小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=11",
    "scope": "校方资料：11校网、直属中学、2026/27收费；2025/26教师资料为47名，受师资培训100%、学士100%、硕博66%、特殊教育培训63%。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教师资料2025/26",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "聖士提反女子中學附屬小學：科目与教学语言",
    "url": "https://www.ssgps.edu.hk/article/16/37",
    "scope": "校方课程节数及教学语言；四至六年级中文科普教中。网页没有明确NET周课时。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年度中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "直属中学保留学额规则和适用条件；85%是统一派位余下学额上限，不是毕业生直升比例。",
    "sourceType": "government",
    "academicYear": "2027/28",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "聖士提反女子中學附屬小學：2026/27小一自行分配安排",
    "url": "https://www.ssgps.edu.hk/article/234",
    "scope": "校方公布2026/27申请年度的结果及注册流程；仅支持该年度安排。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  },
  {
    "label": "教育局：2027年度小一入学常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/FAQ_TC.pdf",
    "scope": "完整五页读取；第8题明确甲类必收与乙类分数排序，同分超额由学校自行抽签或交教育局随机处理；第12题不设笔面试。第4题只交一份官津自行申请，重复电子/纸本亦不可；第7题接受直资学位的统筹后果。只支持制度，不证明本校某分数稳入。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；2026年9月更新"
  }
],
"pt": [
  {
    "label": "教育局《幼稚園概覽2026/27》：香港培道小學幼稚園",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=3244770001",
    "scope": "核幼稚园部资料、免费计划、班制及2025年9月在读人数；历史人数不是新生学额。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；人数2025年9月",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "香港培道小學幼稚園：2027/28招生查询",
    "url": "https://kids.ptps.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=12&pageId=19&webPageId=5",
    "scope": "列2027/28 K1报名及面试安排；K1招生有面试，不证明升读小学的具体条件或比例。",
    "sourceType": "school-official",
    "academicYear": "2027/28",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "香港培道小學幼稚園：办学宗旨与课程简介",
    "url": "https://kids.ptps.edu.hk/",
    "scope": "校方课程理念及其对幼小关系的说明；升读比例仍需毕业届分母才能核实。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "《小學概覽2026》：香港培道小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=92",
    "scope": "小学校方资料：私立男女校、与香港培道中学的联系关系及2026/27学费；不支持幼稚园毕业生升读比例。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：香港培道小學收费证",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/324477.pdf",
    "scope": "第1页核2026/27小学学费$65,000；第2页幼稚园收费证生效于2020-09-01，不用于替代2026/27幼稚园概览。",
    "sourceType": "government",
    "academicYear": "2026/27小学；幼稚园收费证2020生效",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年度中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "联系中学保留学额的分母、资格及首选条件；25%是余下学额上限，不是毕业生录取率。",
    "sourceType": "government",
    "academicYear": "2027/28",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育王国：培道幼稚园升小讨论",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=2929314",
    "scope": "2014年匿名家长讨论只作为历史个别体验；不能证明现行课程、招生政策或普遍口碑。",
    "sourceType": "parent-discussion",
    "academicYear": "2014",
    "checkedOn": "2026-10-27"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "完整四页再次读取并保留本地原文；自行可跨网只申一所官津、甲类在读兄姊/父母任职必收与乙类计分分开；第1–5只取一项、6–7只取一项；同分处理另见官方FAQ。统一乙部按儿童住址，幼稚园校址不提供校网；直资接受学位后退出官津统筹，与私校获录名单送交私校参考及各校持位条款不同。2027统一结果6月2–3日、指定注册6月10–11日，非放榜当天注册。",
    "sourceType": "government",
    "checkedOn": "2026-10-28",
    "academicYear": "2027/28小一；8/2026版"
  }
],
  "cpskg": [
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：啓思小學附屬幼稚園",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6073",
    "scope": "核對學校編號544744、私立獨立、男女校、1985年創校、2025/26不參加幼稚園教育計劃、2024年9月容量495、教學人員27人、上午及下午師生比例1:7.1與1:1.2，以及全年學費$75,790（11期）。2024年9月在讀人數和容量不是下一屆招生名額。",
    "sourceType": "school-profile",
    "academicYear": "2025/26；在讀及師資資料為2024年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啓思小學附屬幼稚園：學校資料、語言、課程及收費",
    "url": "https://www.cpskg.edu.hk/shool-s-information?lang=zh",
    "scope": "校方頁列明廣東話、英文及普通話、上午及下午班時間、K1至K3、2025/26每月學費$6,890並分11期、約440名學生及校車等。此頁未稱每日各語言課時，也未公布錄取率或保證升讀比例。",
    "sourceType": "school-official",
    "academicYear": "2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啓思小學附屬幼稚園：2025/26畢業生升讀小一資料",
    "url": "https://www.cpskg.edu.hk/copy-of-p1-admission-result-4?lang=zh",
    "scope": "校方表示畢業生可優先升讀啓思小學，並列出多所畢業生升讀小學名稱；頁面註明資料截至2026年6月由學生家長提供，未列畢業生總數、逐校人數或優先取錄條件，不支持90%直升率或保證升讀。",
    "sourceType": "school-official",
    "academicYear": "2025/26畢業屆；名單截至2026年6月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啓思教育：三所連繫學校及課程概覽",
    "url": "https://www.creativeprisch.edu.hk/anniversariescelebration",
    "scope": "核對啓思中學、啓思小學及啓思小學附屬幼稚園為三所連繫學校及校方公開的課程理念；『連繫』不等同教育局定義的直屬或一條龍升學保證。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  }
],
  "creative": [
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：啓思幼稚園九龍塘校舍",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6072",
    "scope": "核對律倫街6號九龍塘校舍的校舍身份、2025/26教育計劃狀態及概覽所列班制、師資和收費範圍。報告涵蓋多個校舍，不能將此頁數據外推至所有分校。",
    "sourceType": "school-profile",
    "academicYear": "2025/26；在讀及師資資料為2024年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：啓思幼稚園九龍塘校舍登記資料",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=323926000112",
    "scope": "核對學校編號323926、校址、男女校、私立及註冊資料；該校舍與其他啓思品牌校舍須分開辨識。",
    "sourceType": "government",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啓思幼稚園九龍塘校舍：教育局收費證明書",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/323926.pdf",
    "scope": "收費證明書自2025年9月1日生效：半日每年$71,000、全日每年$89,900，另全日膳食費每年$9,000，均分10期；只適用於證書所列課程及校舍，不外推至其他分校或2026/27新年度。",
    "sourceType": "government",
    "academicYear": "2025/26；2025-09-01生效",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "啓思幼稚園：校方招生資訊",
    "url": "https://creative.edu.hk/2022/07/27/%E5%95%9F%E6%80%9D%E5%B9%BC%E7%A8%9A%E5%9C%92%E5%B9%BC%E5%85%92%E5%9C%92%E4%B9%9D%E9%BE%8D%E5%A1%98%E6%AD%A3%E6%A0%A1/",
    "scope": "校方提供的九龍塘校舍申請及聯絡入口；頁面內容含歷年招生資訊，所有日期、面試與年齡要求必須按當屆公告重核，不以舊年度流程描述現況。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育王國：請問啟思幼稚園係唔係好淺？（2020年九龍塘N班個案，明確非CPSKG）",
    "url": "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3846701",
    "scope": "已讀2020年10月原帖。起帖rainjam2007明確是九龍塘啟思N班，且不是啟思小學附屬幼稚園；kennyOnO於10月22日談半學年N班教材、自理與禮貌，bobingbokin於10月29日自稱前九龍塘N班家長，認為學術較淺但關顧好、重視自理及群體互動。只保留當年個別PN體驗，作者身份為自述；非九龍塘參與者不混計，原帖未足以獨立確認律倫街6號註冊校址，不推現屆K班課程、全體口碑或升小錄取率。",
    "sourceType": "parent-discussion",
    "academicYear": "2020年10月討論；個別N班經驗",
    "checkedOn": "2026-10-29"
  }
],
  "cypy": [
  {
    "label": "《小學概覽2026》：潮陽百欣小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=469",
    "scope": "核對校網72、資助男女校、中文授課、校址、校訓、辦學團體、三類中學關係、設施及2026/27收費；2025/26教師數55、師訓95%、學士98%、碩博20%、10年以上年資51%；班數由2024/25的27班、2025/26的25班至2026/27核准22班。班數不代表新生錄取率。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班數及收費；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "潮陽百欣小學：2025/26升中派位結果",
    "url": "https://www.cypy.edu.hk/tc/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B-1",
    "scope": "校方稱2025/26畢業生94%獲派首志願、33%獲派以英語為主要教學語言中學；未見畢業生分母及完整派位表，按校方公布口徑引用，不推算個人取錄率或Banding分布。此頁另列啟發潛能、愉快而有效學習、一年級評估安排、英文RWI、NET支援、種植及生態校園課程、全級STEM與高低小雙班主任等校方自述內容，不代替獨立成效評估。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "Baby Kingdom：潮陽百欣小學家長討論",
    "url": "https://m.edu-kingdom.com/post.php?fid=368&page=2&tid=2181414",
    "scope": "舊討論中的匿名家長個人意見，年份久遠且樣本有限；不作當前家長口碑共識或學校評分依據。",
    "sourceType": "parent-discussion",
    "academicYear": "約2010年討論",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  }
],
  "hkcwcyw": [
  {
    "label": "教育局《小學概覽2026》：香港中國婦女會丘佐榮學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=49",
    "scope": "核對16校網、校址、資助男女校、教學語言、校舍與設施、聯繫／直屬／一條龍中學欄位，以及2025/26教師58人與資歷；2025/26實際30班、2026/27核准29班，小一4班、小二至小六各5班。概覽列小二至小六各兩班普通話教中文班，但未說明其他班別的語言組合與編班方式。2026/27非標準項目核准收費$350，PTA費$80。",
    "sourceType": "school-profile",
    "academicYear": "2026/27核准班數及收費；教師與實際班數為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度16校網小一學校名冊",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net16.pdf",
    "scope": "確認香港中國婦女會丘佐榮學校（校號514497）2027年度自行分配學位配額為63個。此數只代表甲部配額，不是小一總招生數或個人錄取機會。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "香港中國婦女會丘佐榮學校：官方網站",
    "url": "https://www.hkcwc-htyps.edu.hk/",
    "scope": "校方公開網站作為學校活動及辦學資料補充；本輪未以首頁資料推算升中比例、招生概率或家長整體口碑。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对甲类必收、计分首五项互斥、宗教与主办社团成员互斥、同分甄选及2027年度自行/统一派位节点；不提供本校申请人数或胜算。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  }
],
  "honwah": [
  {
    "label": "教育局《小學概覽2026》：漢華中學（小學部）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=55",
    "scope": "核對直資男女校、校址、中文及英文教學、漢華中學一條龍欄位、校舍與班級；2025/26教師39人及資歷，2026/27學費$17,640、PTA費$60，無其他核准非標準收費。概覽列2025/26共18班，2026/27核准仍為18班。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費與核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "漢華中學：2027/28小一招生安排",
    "url": "https://www.honwah.edu.hk/en-hk/p1_admission/",
    "scope": "校方列明2027/28申請期至2026-10-11，面試於2026-10-21至24日，結果預計2026-11-20公布，註冊日期為2026-11-23至25日。申請及面試期在本報告更新日已結束；下一屆日期須以新公告為準。頁面亦列面試與申請文件安排。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：中學學位分配辦法常見問題",
    "url": "https://www.edb.gov.hk/tc/edu-system/primary-secondary/applicable-to-primary-secondary/through-train/faq-sch.html",
    "scope": "用於解釋一條龍學校學生的原校升讀選擇及制度條件；學校概覽的「一條龍」標示不等於中一總學額全部由本校學生佔用，應按當屆教育局規則與校方要求理解。",
    "sourceType": "government",
    "academicYear": "現行一條龍制度說明",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2026年中學學位分配辦法常見問題",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
    "scope": "核對一條龍中學須為其他小學申請者保留不少於總中一學額15%的規則，以及自行分配、統一派位與選擇原校升讀的相關條件。不得表述為中一學額全部預留或無條件直升。",
    "sourceType": "government",
    "academicYear": "2026年中學學位分配辦法",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对接受直资小学学位后不能获派POA学位，与已获私立小学录取仍可继续参加统筹的区别；不代替本校注册、退学或留位条款。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "核对直属85%、联系25%一般以扣除自行分配及重读生后的统一派位余额为分母；学校网组别、乙部首选、跨网和超额随机排序均影响资格，不是毕业生升读率。一条龙机制下申请其他参加派位中学自行、非派位直资或统一派位，即不保留原校直升权；汉华具体适用程序仍须两校书面确认，不把小学DSS接受学位的POA规则直接套到SSPA。",
    "sourceType": "government",
    "academicYear": "2027年9月中一入学；2026年9月发布",
    "checkedOn": "2026-10-28"
  }
],
  "hrgp": [
  {
    "label": "教育局《小學概覽2026》：軒尼詩道官立小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=421",
    "scope": "核對12校網、官立男女校、中文教學、校舍約4,000平方米、五所聯繫中學、2026/27免費及$200校本管理費；2025/26教師57人、核准教席54人，2025/26實際及2026/27核准均30班、小一至小六各5班。概覽不支持以教師總數換算班師比。中學Banding屬非官方判斷。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班數為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "軒尼詩道官立小學：2026年升中派位結果",
    "url": "https://www.hrgps.edu.hk/派位成績",
    "scope": "校方2026年7月資料列121名畢業生、首志願105人（約87%）、首三志願115人（約95%）、升讀皇仁書院34人。這是校方公布的單屆整體結果；不據此推算個人錄取率或未來屆別結果。",
    "sourceType": "school-official",
    "academicYear": "2025/26畢業屆升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度12校網小一學校名冊",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net12.pdf",
    "scope": "核對軒尼詩道官立小學（校號510084）2027年度自行分配學位配額63個；該配額不是小一總招生數或錄取概率。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：小一入學統籌辦法及2027年度時間表",
    "url": "https://www.edb.gov.hk/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/",
    "scope": "核對2027年度自行分配結果日為2026-11-23、註冊日為11-25至26；統一派位申請須於2027-01-22或之前提交。日期只適用指定年度，後續年度須重查教育局公告。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2026年中學學位分配辦法常見問題",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_TC.pdf",
    "scope": "核對聯繫中學保留學額的計算基數、25%比例及適用派位條件；比例以扣除重讀生和自行分配學位後的餘額為基數，不是中一總學額或畢業生比例。學生須符合派位組別、志願次序及當屆規則。",
    "sourceType": "government",
    "academicYear": "2026年中學學位分配辦法",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对甲类必收、计分首五项互斥、宗教与主办社团成员互斥、同分甄选及2027年度自行/统一派位节点；不提供本校申请人数或胜算。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "核对直属85%、联系25%一般以扣除自行分配及重读生后的统一派位余额为分母；学校网组别、乙部首选、跨网和超额随机排序均影响资格，不是毕业生升读率。",
    "sourceType": "government",
    "academicYear": "2027年9月中一入学；2026年9月发布",
    "checkedOn": "2026-10-28"
  }
],
  "hfc": [
  {
    "label": "《小學概覽2026》：嘉諾撒聖家學校（九龍城）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=85",
    "scope": "核對校址為九龍城聯合道102號、41校網、資助天主教女校、中文授課、嘉諾撒聖家書院為直屬中學（非一條龍）、校車、2026/27核准18班及2025/26教師39人與資歷、2026/27核准收費。概覽未公布班師比，不能以教師總數推算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費及核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度41校網小一學校名冊",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net41.pdf",
    "scope": "核對聯合道102號校址及2027年度自行分配學位學額45個。學額不是全級總收生人數；名冊亦說明最終開班數視乎實際需要。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：中學學位分配辦法常見問題（2026）",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_EN.pdf",
    "scope": "完整读取2026年9月FAQ：直属保留扣除重读及自行后的余额85%，联系为25%，不是联系一般85%。两所圣家小学均属直属；须符合组别及乙部首选等条件，超额按组别及随机编号，跨网影响资格。不是总学额85%、某小学毕业生85%或个人直升保证。",
    "sourceType": "government",
    "academicYear": "2026中學學位分配辦法",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：圣家九龙城（中文原件复核）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=85",
    "scope": "已读完整中文原件：直属中学栏为嘉诺撒圣家书院，联系中学及一条龙栏均为「-」，纠正原英语feeder误译。九龙城联合道102号、41网，2025/26教师39／师训97%／学士100%／硕博39%／10年以上52%，2026/27核准18班、PTA50及特定用途100。教师统计不能推出课堂比例或流动率。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班数收费；教师2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：德望小学部（竞品制度及费用复核）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=443",
    "scope": "已于2026-10-29读完整中文原件：私立全日女校、小一校网不适用；一条龙/直属/联系三栏均空，不能称直资一条龙或据品牌推升读。2026/27小一至三学费56500、小四至六57500，PTA100、30班，中文及英文；仅比较小学，不套中学IB/DSE课程。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "《小学概览2026》：协恩附小（竞品制度及费用复核）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=99",
    "scope": "已于2026-10-29读完整中文原件：资助全日女校、34网、农圃道1号；一条龙/直属/联系三栏均空，不称直资/一条龙/直属协恩中学。2026/27免学费但堂费3000、PTA50、核准450，18班，中文含普通话及英文。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "教育局：2025/2027升中FAQ（完整中文）",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "复用本组hacs阶段已读完整中文原件：直属85%及联系25%均以扣除自行及重读后的余额为分母；组别/乙部首选/超额随机及跨网条件，不是本校毕业生比例。本文不以两校班数推任何一校机会或编造95%Band1、58人、43人等结果。",
    "sourceType": "government",
    "academicYear": "2027中一入学；2026-09版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：另一所圣家（跨校比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=103",
    "scope": "复用本组前次已读完整中文原件；只比较两所独立圣家的校址、41网、直属书院、2026/27核准班数及收费。sch85联合道102号18班/PTA50及100；sch103添福道8号24班/PTA120及350。不由规模推社区感、英语效果、入读概率或性价比高低。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  }
],
  "hfcklt": [
  {
    "label": "《小學概覽2026》：嘉諾撒聖家學校（九龍塘）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=103",
    "scope": "核對添福道8號、41校網、資助天主教女校、中文授課、嘉諾撒聖家書院為直屬中學（非一條龍）、校車、2026/27核准24班及2025/26教師48人與資歷、2026/27核准收費。概覽未公布班師比，不能以教師總數推算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費及核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度41校網小一學校名冊",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net41.pdf",
    "scope": "核對添福道8號校址及2027年度自行分配學位學額60個。學額不是全級總收生人數；名冊亦說明最終開班數視乎實際需要。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：中學學位分配辦法常見問題（2026）",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_EN.pdf",
    "scope": "完整读取2026年9月FAQ：直属保留扣除重读及自行后的余额85%，联系为25%，不是联系一般85%。两所圣家小学均属直属；须符合组别及乙部首选等条件，超额按组别及随机编号，跨网影响资格。不是总学额85%、某小学毕业生85%或个人直升保证。",
    "sourceType": "government",
    "academicYear": "2026中學學位分配辦法",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年9月小一入学资料单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "已读四页原件：2027入学电子／纸本申请、公布及注册日期；同校在读兄姊或同校小学任职父母属甲类必收；首五项关系只选一，父母或兄姊旧生10分不可另加首名5分；宗教与主办社团成员两项只选一，适龄10分；统一派位按志愿及随机编号，不设111额外分数。不据配额推算个人取录概率。",
    "sourceType": "government",
    "academicYear": "2027/28入学；2026年8月出版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：圣家九龙塘（中文原件复核）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=103",
    "scope": "已读完整中文原件：直属中学栏为嘉诺撒圣家书院，联系中学及一条龙栏均为「-」，纠正原英语feeder误译。九龙塘添福道8号、41网，2025/26教师48／师训学士100%／硕博51%／10年以上73%，2026/27核准24班、PTA120及核准350。教师统计不能推出课堂比例或流动率。",
    "sourceType": "school-profile",
    "academicYear": "2026/27班数收费；教师2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：德望小学部（竞品制度及费用复核）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=443",
    "scope": "已于2026-10-29读完整中文原件：私立全日女校、小一校网不适用；一条龙/直属/联系三栏均空，不能称直资一条龙或据品牌推升读。2026/27小一至三学费56500、小四至六57500，PTA100、30班，中文及英文；仅比较小学，不套中学IB/DSE课程。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "《小学概览2026》：协恩附小（竞品制度及费用复核）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=99",
    "scope": "已于2026-10-29读完整中文原件：资助全日女校、34网、农圃道1号；一条龙/直属/联系三栏均空，不称直资/一条龙/直属协恩中学。2026/27免学费但堂费3000、PTA50、核准450，18班，中文含普通话及英文。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "教育局：2025/2027升中FAQ（完整中文）",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "复用本组hacs阶段已读完整中文原件：直属85%及联系25%均以扣除自行及重读后的余额为分母；组别/乙部首选/超额随机及跨网条件，不是本校毕业生比例。本文不以两校班数推任何一校机会或编造95%Band1、58人、43人等结果。",
    "sourceType": "government",
    "academicYear": "2027中一入学；2026-09版",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "《小学概览2026》：另一所圣家（跨校比较）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=85",
    "scope": "复用本组前次已读完整中文原件；只比较两所独立圣家的校址、41网、直属书院、2026/27核准班数及收费。sch85联合道102号18班/PTA50及100；sch103添福道8号24班/PTA120及350。不由规模推社区感、英语效果、入读概率或性价比高低。",
    "sourceType": "school-profile",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  }
],
  "ihm": [
  {
    "label": "聖母無玷聖心幼稚園：2026/27班級編制及師生比例",
    "url": "https://www.ihmk.edu.hk/tc/class-arrangement",
    "scope": "核對2026/27共25班、K1至K3上午及下午班班數、全日班8班，以及上午1:10、下午1:9的校方公布比例。班數不等於實際學生人數、招生人數或可供插班空缺。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "聖母無玷聖心幼稚園：專業團隊",
    "url": "https://www.ihmk.edu.hk/tc/professional-team",
    "scope": "核對校方列載教職員61名、教師40名、幼兒教育學歷比例及合格幼稚園教師資格100%，另有專職普通話教師及4位外籍英語教師。",
    "sourceType": "school-official",
    "academicYear": "校方現行頁面，核對日2026-10-28",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "聖母無玷聖心幼稚園：學校收費項目",
    "url": "https://www.ihmk.edu.hk/tc/school-fees",
    "scope": "校方目前頁面所列最新收費為2025/26：半日班學費全免；全日班每月學費$1,236、膳食$600，10期合計$18,360。未見2026/27更新，不把舊年度金額當作當前收費。",
    "sourceType": "school-official",
    "academicYear": "2025/26（校方頁面最新列載年度）",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "聖母無玷聖心幼稚園：2027/28 K1入學申請",
    "url": "https://www.ihmk.edu.hk/tc/application",
    "scope": "核對2027/28 K1申請期2026年9月10日至10月9日、入學年齡、全日班按家庭需要優先考慮但不保證取錄，以及校方預告2026年12月11日前通知結果。申請期於核對日已截止。",
    "sourceType": "school-official",
    "academicYear": "2027/28 K1招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "聖母無玷聖心幼稚園：升學概況",
    "url": "https://www.ihmk.edu.hk/tc/graduation-statistics",
    "scope": "核對校方頁面最新列出2024/25小一派位統計；頁面連結圖表，未以文字提供可核對的各校人數及畢業生分母，因此不轉錄或推算比例。",
    "sourceType": "school-official",
    "academicYear": "2024/25最新可見統計",
    "checkedOn": "2026-10-28"
  }
],
  "jrgps": [
  {
    "label": "《小學概覽2026》：佐敦道官立小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=512",
    "scope": "2026-10-29重读完整HTML：31网官立男女、2026/27共20班小一3班、2025/26教师43；小一1测1考、二至六1测2考；小一至三平均能力、高小成绩分班，部分高小班英数。小五六BYOD、校本中文、驻校言语治疗、导修及多元体艺/STEAM；初小普教中属发展计划，非全校已实行。教师总数不当课堂人手，官立类别不证明课程创新或活动较少。",
    "sourceType": "school-profile",
    "academicYear": "2026/27核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-29"
  },
  {
    "label": "佐敦道官立小學：2026年度升中派位公告",
    "url": "https://www.jrgps.edu.hk/tc/latest_new/2026%E5%B9%B4%E5%BA%A6%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D%E5%A0%B1%E6%8D%B7%EF%BC%81",
    "scope": "校方公布2026年度第一志願獲派率85.29%、首三志願獲派率98.53%，並列出部分升讀中學。公告未公布畢業生總人數，志願獲派率不等於聯繫中學錄取率或個別學生機率。",
    "sourceType": "school-official",
    "academicYear": "2026年度升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "佐敦道官立小學：小一入學資訊",
    "url": "https://www.jrgps.edu.hk/tc/primary-one-admission-information",
    "scope": "校方說明小一收生依教育局小一入學統籌辦法辦理；具體申請日期及派位安排以教育局當屆公告為準。",
    "sourceType": "school-official",
    "academicYear": "現行招生程序，核對日2026-10-28",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2026中學學位分配辦法常見問題",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2026_Sept_General_EN.pdf",
    "scope": "核對聯繫中學學位由合資格學生按派位組別、志願次序及隨機編號等規則競爭；不把共享聯繫學額換算成佐敦道官立的個別錄取比例。",
    "sourceType": "government",
    "academicYear": "2026中學學位分配辦法",
    "checkedOn": "2026-10-28"
  }
],
  "kau": [
    {
      label: "《小學概覽2026》：救恩學校",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=19",
      scope: "核對私立男女校、基督教、1946年創校、中文（包括普通話）授課、2026/27學費$75,550及2025/26教師46人與資歷。教育局列匯基書院（東九龍）為提名中學；概覽未公布固定預留學額、錄取比例或班師比。",
      sourceType: "school-profile",
      academicYear: "2026/27學費；教師資料為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "救恩學校小學部：升中概況",
      url: "https://kauyan.edu.hk/primary/our_student/%E5%8D%87%E4%B8%AD%E6%A6%82%E6%B3%81/",
      scope: "核對校方設有升中概況頁並展示圖像結果；目前頁面可讀文字未列出逐校人數或畢業生分母，本輪不從圖像推算或轉錄比例。",
      sourceType: "school-official",
      academicYear: "頁面所列最新升中概況；細項不可文字核驗",
      checkedOn: "2026-10-28",
    },
    {
      label: "救恩學校：小一入學及招生資訊",
      url: "https://www.kauyan.edu.hk/primary/admissions/p1/",
      scope: "作為核實小一當屆招生程序的校方入口；已公布年度的申請日期只適用於該屆，下一屆日期須待校方更新，不按舊日期推定。",
      sourceType: "school-official",
      academicYear: "當屆招生資訊，核對日2026-10-28",
      checkedOn: "2026-10-28",
    },
  ],
  "hrgps": [
  {
    "label": "教育局《小學概覽2026》：軒尼詩道官立小學（銅鑼灣）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=422",
    "scope": "核對灣仔區12校網、官立男女校、校址與校舍、聯繫中學名單、2026/27核准30班；2025/26教師55人（師資培訓100%、學士98%、碩博36%、特殊教育培訓77%、十年以上年資70%）。授課語言欄列中文，沒有據此推定各科實際教學語言；概覽未列班師比。",
    "sourceType": "school-profile",
    "academicYear": "2026/27核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度12校網小一學校名冊",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net12.pdf",
    "scope": "核對軒尼詩道官立小學（銅鑼灣）列於12校網及2027年度自行分配學位配額63個。這是自行分配配額，不是小一總招生數。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "軒尼詩道官立小學（銅鑼灣）：2027/28小一申請安排",
    "url": "https://www.hrgpscwb.edu.hk/CustomPage/paragraphGroup.aspx?cpmId=369&ct=customPage&pageId=417&webPageId=12",
    "scope": "校方列出2027/28小一自行分配申請日期為2026年9月17日至25日，已於本報告核對日截止。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "軒尼詩道官立小學（銅鑼灣）：升中派位公告",
    "url": "https://www.hrgpscwb.edu.hk/CustomPage/paragraphGroup.aspx?cpmId=382&ct=customPage&nnnid=13&pageId=429&webPageId=11",
    "scope": "校方公開2025/26年度升中派位結果頁，但沒有以文字列出逐校人數或可計算的畢業生分母；因此不把2024/25統計外推為最新一屆，也不推算2025/26比例。",
    "sourceType": "school-official",
    "academicYear": "2025/26升中派位結果公告",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对甲类必收、计分首五项互斥、宗教与主办社团成员互斥、同分甄选及2027年度自行/统一派位节点；不提供本校申请人数或胜算。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "核对直属85%、联系25%一般以扣除自行分配及重读生后的统一派位余额为分母；学校网组别、乙部首选、跨网和超额随机排序均影响资格，不是毕业生升读率。",
    "sourceType": "government",
    "academicYear": "2027年9月中一入学；2026年9月发布",
    "checkedOn": "2026-10-28"
  }
],
  "hy": [
  {
    "label": "協恩中學附屬幼稚園：官方課程及招生頁",
    "url": "https://www.hykg.edu.hk/",
    "scope": "核對校方頁面公布的辦學宗旨、課程特色及最近可讀取的2026/27幼兒班申請文件。未在校方網站找到2027/28申請人數或錄取率，故不採信坊間比例推算。",
    "sourceType": "school-official",
    "academicYear": "2026/27官方招生資訊",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：協恩中學附屬幼稚園",
    "url": "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6027",
    "scope": "核對教育局列載的2025/26學校註冊資料、已使用課室總容額240及教師／師生資料。總容額不等於單屆K1招生名額。",
    "sourceType": "school-profile",
    "academicYear": "2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2026/27幼稚園教育計劃參加名單（九龍城區）",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2627_KC.pdf",
    "scope": "確認協恩中學附屬幼稚園參加2026/27幼稚園教育計劃；不據此推定所有班別均免費，收費仍應按教育局核准表及班別核對。",
    "sourceType": "government",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "學好啲 GoStudy：協恩幼稚園2027/28收生資訊",
    "url": "https://www.gostudy.hk/5052/%E5%B9%BC%E7%A8%9A%E5%9C%92/%E5%8D%87%E5%B9%BC%E6%94%BB%E7%95%A5%EF%BD%9C%E5%8D%94%E6%81%A9%E4%B8%AD%E5%AD%B8%E9%99%84%E5%B1%AC%E5%B9%BC%E7%A8%9A%E5%9C%92%E8%81%AF%E7%B9%AB/",
    "scope": "2026年報道引用校方2027/28年度收生公告：招收66名女生、上午及下午班各33名，網上申請期2026年9月14日至10月5日。這是單一媒體轉述校方公告；未提供申請總人數，不可計算或宣稱錄取比例。",
    "sourceType": "media-report",
    "academicYear": "2027/28 K1招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "Shemom：協恩幼稚園2027/28收生資訊",
    "url": "https://www.shemom.com/motherhood/%E5%8D%94%E6%81%A9%E5%B9%BC%E7%A8%9A%E5%9C%92",
    "scope": "交叉核對2027/28 K1申請期及66名女生名額；報道未公開申請總人數或錄取率。",
    "sourceType": "media-report",
    "academicYear": "2027/28 K1招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《幼稚园概览2026/27》：协恩中学附属幼稚园",
    "url": "https://kgp2026.kindergartenprofile.com/school/?schid=1328700001",
    "scope": "全文核对非牟利女校、参加计划、2026/27已开办半日班免费、不设PN及全日/延长/暂托；2025年9月教学人员13、学位12、幼教证书或以上13、上午下午师生比1:7.6及1:7.5、K1在读33+33、课室总容额240与3间课室；主题活动、专科英文普通话、持续观察及不要求K1执笔/机械抄写。不是2027/28招生原件，不给申请总人数与录取率。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；人数与师资2025年9月",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对官津小一统筹资格按儿童真实住址所属校网；幼稚园地址或品牌不赋予指定小学学位，私校与直资接受学位规则分别理解。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  }
],
  "icqm": [
  {
    "label": "教育局《小學概覽2026》：國際基督教優質音樂中學暨小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=454",
    "scope": "核對私立獨立學校、校址、中文（包括普通話）及英文教學語言、音樂設施、一條龍中學關係、2026/27學費$67,000及家教會費$50；2025/26教師106人（師訓95%、學士100%、碩博35%、特殊教育培訓5%、十年以上年資38%）。概覽未公布申請人數、錄取率或班師比，不作推算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "音小：2027/28年度小一入學申請及面試安排",
    "url": "https://www.icqm.edu.hk/included/category/information/latestnews/",
    "scope": "校方最新公告列出申請截止日2026年4月26日及原定面試日期2026年6月18、20、26、27日，均已過；面試或有天氣改期安排，下一屆日期須待校方公布。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "音小：2027/28年度小一入學申請程序（PDF）",
    "url": "https://icqm.edu.hk/admission/2728_P1_info_r2.pdf",
    "scope": "核對小一申請費$150、申請文件及當屆申請流程；2027/28申請期已結束。文件沒有公布申請人數或錄取比例。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对接受直资小学学位后不能获派POA学位，与已获私立小学录取仍可继续参加统筹的区别；不代替本校注册、退学或留位条款。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  }
],
  "hkbaptist": [
  {
    "label": "《小學概覽2026》：香港浸信會聯會小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=385",
    "scope": "核對麗城花園麗順路2號、62校網、資助基督教男女校、中文授課、沒有一條龍／聯繫／直屬中學、校車、2026/27核准30班及2025/26教師62人與資歷、2026/27核准收費與校舍設施。概覽未公布班師比，不能以教師總數推算。",
    "sourceType": "school-profile",
    "academicYear": "2026/27收費及核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年度62校網小一學校名冊",
    "url": "https://www.edb.gov.hk/attachment/en/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net62.pdf",
    "scope": "核對香港浸信會聯會小學列於62校網，2027年度自行分配學位學額為63個。此數字不是全級總收生人數。",
    "sourceType": "government",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "香港浸信會聯會小學：小一及插班招生資訊",
    "url": "https://www.hkbcps.edu.hk/index.php?information_id=7&route=information",
    "scope": "核對校方公布的2027/28小一自行分配申請日期、候補生安排及小三起自攜平板電腦學習計劃（BYOD）。日期屬特定招生年度，發布前須重核。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一招生",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对甲类必收、计分首五项互斥、宗教与主办社团成员互斥、同分甄选及2027年度自行/统一派位节点；不提供本校申请人数或胜算。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  }
],
  "kcps": [
  {
    "label": "教育局《小學概覽2026》：蘇浙小學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=53",
    "scope": "核對私立男女校、東區清華街校址、1953年創校、中文（包括普通話）及英文、2026/27主流小學學費$58,000（十期）、2025/26教師56人及資歷、2026/27核准主流班30班（小一5班），並確認沒有一條龍／直屬／聯繫中學。概覽未列班師比，亦未提供可計算逐年Banding分布的升中人數及分母。",
    "sourceType": "school-profile",
    "academicYear": "2026/27學費及核准班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "蘇浙小學：學校資料及2026/27學校規模",
    "url": "https://www.kcs.edu.hk/schoolinfo.html",
    "scope": "校方確認辦學宗旨以普通話為教學語言、校訓、辦學團體、1953年創校、設有本地部與國際部；校方所列2026/27小學部31班與概覽核准30班口徑不同，報告不將兩者混作同一統計。",
    "sourceType": "school-official",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局核准收費證明書：蘇浙小學",
    "url": "https://applications.edb.gov.hk/schoolsearch/schoolfee/132730.pdf",
    "scope": "小學部小一至小六2026/27學費為每年$58,000、分十期；國際部為每年$104,500，兩軌收費分列，不以國際部收費替代主流班學費。",
    "sourceType": "government",
    "academicYear": "2026/27",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "蘇浙小學：小一入學申請頁",
    "url": "https://www.kcs.edu.hk/primary-apply.htm",
    "scope": "校方目前列出的內容是2026/27小一、小二插班申請；不以舊年份報名人數、學額或面試細節推算當屆錄取率。校方沒有在本頁公開申請人數及取錄分母。",
    "sourceType": "school-official",
    "academicYear": "頁面於2026-10-28查閱",
    "checkedOn": "2026-10-28"
  }
],
  "kcskps": [
    {
      label: "教育局《小學概覽2026》：基督教聖約教會堅樂小學",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&sch_id=122",
      scope: "核對48校網、秀茂坪邨秀明道77號、資助基督教男女校、中文授課、沒有一條龍／直屬／聯繫中學、2026/27核准27班（小一3班）及2025/26教師66人與資歷。概覽指資優班學生以普通話學習中文，不代表全校普教中；概覽未列班師比。",
      sourceType: "school-profile",
      academicYear: "2026/27核准班數；教師資料為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "基督教聖約教會堅樂小學：官方網站與入學資訊",
      url: "https://www.hgps.edu.hk/",
      scope: "校方公布可全年預約校園參觀及到校諮詢，並提供2027/28小一自行申請資訊入口；未以參觀安排推斷取錄機會或錄取率。",
      sourceType: "school-official",
      academicYear: "2027/28招生資訊",
      checkedOn: "2026-10-28",
    },
    {
      label: "基督教聖約教會堅樂小學：課程特色及目標",
      url: "https://www.hgps.edu.hk/tc/subject/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2%E7%9B%AE%E6%A8%99",
      scope: "校方說明二至六年級部分班別推行中文科普通話教學、四至六年級每周一天英文導讀，以及校本課程與閱讀安排。適用班別和比例未公開。",
      sourceType: "school-official",
      checkedOn: "2026-10-28",
    },
  ],
  "keenmind": [
    {
      label: "教育局：劍鳴幼稚園2026/27收費證明書",
      url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/537713.pdf",
      scope: "核對2026/27 K1至K3上午及下午班每年學費均為$77,462、分11期；此為幼稚園課程學費，不與附設幼兒中心2至3歲服務費混算。",
      sourceType: "government",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：劍鳴幼稚園",
      url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6079",
      scope: "核對學校地址、私立類別、幼稚園教育計劃參與情況、2024年9月師生比例1:8.8及附設幼兒中心資料。該比例有日期，不能當作2026/27最新比率；概覽中幼兒中心收費與幼稚園K1-K3學費是不同服務。",
      sourceType: "school-profile",
      academicYear: "2025/26；師生比例統計時點為2024年9月",
      checkedOn: "2026-10-28",
    },
    {
      label: "教育局：2026/27學年非參加幼稚園教育計劃幼稚園名單及K1收生安排",
      url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/202627%20K1%20Admission%20Arrangements/2026-27%20K1%20Admission%20Arrangements%20-%20list%20of%20local%20non-scheme%20KGs_EN.pdf",
      scope: "名單列有Keen Mind Kindergarten；確認其不參加幼稚園教育計劃。不可因此推斷其收生名額或PN直升安排。",
      sourceType: "government",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "劍鳴幼稚園：K1入學申請頁",
      url: "https://www.keenmind.com.hk/site/page2.php?id=40",
      scope: "校方頁面已列出2027/28學年K1入學申請入口；本輪未能讀取其附件內完整招生日期與面試細節，因此不引用第三方整理的日期作官方事實。",
      sourceType: "school-official",
      academicYear: "2027/28招生",
      checkedOn: "2026-10-28",
    },
  ],
  "kentville": [
    {
      label: "根德園幼稚園校方：停辦公告及2026年6月30日新聞稿",
      url: "https://kentville.com/",
      scope: "校方確認根德園幼稚園已於2026年6月30日正式停辦，並提供當日新聞稿。報告保留為歷史檔案，不作現行招生或替代學校學費的依據。",
      sourceType: "school-official",
      academicYear: "停辦日期：2026-06-30",
      checkedOn: "2026-10-28",
    },
    {
      label: "香港01：根德園宣布三年後停辦",
      url: "https://www.hk01.com/%E7%A4%BE%E6%9C%83%E6%96%B0%E8%81%9E/943748/%E6%A0%B9%E5%BE%B7%E5%9C%92%E5%B9%BC%E7%A8%9A%E5%9C%92%E4%B8%89%E5%B9%B4%E5%BE%8C%E5%81%9C%E8%BE%A6-%E4%B8%80%E6%96%87%E7%9C%8B%E6%B8%85%E5%8E%9F%E5%9B%A0-%E5%AE%B6%E9%95%B7%E9%A0%88%E7%9F%A5-%E5%AD%B8%E7%94%9F%E9%80%80%E5%AD%B8%E6%89%8B%E7%BA%8C",
      scope: "補充2023年校方公布逐步停辦安排與當時公開的停辦背景；對背景只作有來源的歷史摘要，不把單一報道轉成現況推斷。",
      sourceType: "media-report",
      academicYear: "2023年報道；最終停辦日期以校方公告為準",
      checkedOn: "2026-10-28",
    },
  ],
  "kiangsu": [
    {
      label: "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：蘇浙小學校幼稚園部",
      url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5926",
      scope: "核對非牟利、沒有參加免費計劃、地址及教育局概覽所列2024年9月師生比例（上午1:10.6、下午1:9.0），並分開K1-K3學費與N1幼兒園服務收費。K1-K3半日班2025/26學費為每年HK$50,800；HK$62,160是N1服務全年收費。2026/27學費調整通告已發布，但本輪無法讀取PDF內獲批金額。",
      sourceType: "school-profile",
      academicYear: "2025/26；師生比例統計時點為2024年9月",
      checkedOn: "2026-10-28",
    },
    {
      label: "蘇浙小學校：幼稚園及幼兒園學校資料",
      url: "https://www.kcs.edu.hk/schoolinfo.html",
      scope: "校方列示2026/27幼稚園K1-K3共20班、幼兒園N1共6班；校方資料表的班數不等於新生學額或每班實際人數。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "蘇浙小學校：幼稚園招生及學費公告",
      url: "https://www.kcs.edu.hk/news.htm",
      scope: "校方公開2027/28 K1及N1新生申請表，並於2026年7月發布2026/27學費調整通告。因通告PDF本輪無法讀取核准金額，報告只列有明確年度的上一期官方收費並標明新年度金額須查校方通告，不沿用舊額冒稱現價。",
      sourceType: "school-official",
      academicYear: "2026/27收費調整公告；2027/28招生資訊",
      checkedOn: "2026-10-28",
    },
    {
      label: "蘇浙小學校：2026/27幼稚園學費調整通告",
      url: "https://www.kcs.edu.hk/kinder/file/2026-2027/%E8%98%87%E6%B5%99%E5%B0%8F%E5%AD%B8%E5%B9%BC%E7%A8%9A%E5%9C%922026%E8%87%B32027%E5%AD%B8%E5%B9%B4%E5%AD%B8%E8%B2%BB%E8%AA%BF%E6%95%B4%E9%80%9A%E5%91%8A.pdf",
      scope: "校方PDF確認2026/27有調整通告；本輪無法從PDF取得獲批後的具體金額，因此不將未讀取到的費額寫成核實數字。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "蘇浙小學校：幼稚園新生申請表及入學資訊",
      url: "https://www.kcs.edu.hk/apply.htm",
      scope: "核對校方目前已發布2027/28 K1新生申請表及2026/27各級插班表格；不據此推斷面試形式、錄取率或全年有位。",
      sourceType: "school-official",
      academicYear: "2026/27插班；2027/28 K1招生",
      checkedOn: "2026-10-28",
    },
  ],
  "krs": [
    {
      label: "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：九龍禮賢學校",
      url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6436",
      scope: "核對非參加免費幼稚園教育計劃、非牟利、男女校、1959年創校、2024年9月註冊課室/容量/教職員及學生資料，以及師生比例1:7.6（上午）、1:3.6（下午）。比例及人數均為2024年9月快照；不當作現時學額或班級人數。",
      sourceType: "school-profile",
      academicYear: "2025/26；人數統計時點為2024年9月",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍禮賢學校幼稚園部：招生與2026/27學費",
      url: "https://krs.school.hk/~kindergarten/application/application.html",
      scope: "校方公布2026/27 K1-K3全年學費HK$44,000、分10期；2027/28 K1申請期為2026年8月20日至10月10日，2027/28招生申請期為2026年8月20日至10月10日，核對日已截止；2026/27校曆列出2026年11月7日至8日為該年度新生面談日。校方列出2026/27幼兒班及下午高班設英粵雙語班，不推廣為全校安排。",
      sourceType: "school-official",
      academicYear: "2026/27學費及班別；2027/28招生",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍禮賢學校幼稚園部：2026/27校曆",
      url: "https://www.krs.edu.hk/~kindergarten/calendar/file/2526_term1_calendar.pdf",
      scope: "校方2026/27年度上學期校曆列出2026年11月7日至8日為新生面談日；此日期只適用該年度安排，不推斷其他年度流程。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍禮賢學校幼稚園部：本園特點、語言及幼小銜接",
      url: "https://www.krs.edu.hk/~kindergarten/school_intro/advantage/advantage.html",
      scope: "校方列明中文為日常主要教學語言、每週多次英語會話/活動、每週一次普通話小組、持續性評估、多元學習日，以及K2優先取錄面談安排。此為校方設計描述，不代表任何語言能力結果或小學取錄承諾。",
      sourceType: "school-official",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍禮賢學校幼稚園部：官方升小統計",
      url: "https://www.krs.edu.hk/~kindergarten/school_intro/nextgrade/nextgrade.html",
      scope: "校方頁面列有2025/26高班學生升小派位概況及小學名稱，沒有列各校人數與畢業生分母；報告只呈現去向名單，不計算升讀率或保證比例。",
      sourceType: "school-official",
      academicYear: "2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍禮賢學校幼稚園部：課程與班級編制",
      url: "https://www.krs.edu.hk/~kindergarten/course/course_arrange/course_arrange.html",
      scope: "校方說明課程參照教育局課程指引，以兒童發展和興趣為中心，包含基礎、多元至多向度學習及德育/靈育；用於判讀課程定位，不作未公布課時的延伸推算。",
      sourceType: "school-official",
      checkedOn: "2026-10-28",
    },
  ],
  "ktbwcs": [
  {
    "label": "教育局《小學概覽2026》：九龍塘天主教華德學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=72",
    "scope": "核對校網41、資助男女校、天主教、創校年份、無直屬／聯繫／提名中學、中文（包括普通話）及英文為教學語言、2026/27收費、2025/26教師及兩學年班數；並核對評估、上課安排及學校特點。概覽沒有提供班師比或升中逐校分母，報告不推算比例。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘天主教華德學校：小一收生（2027/28入學）",
    "url": "https://ktbwcs.edu.hk/%E5%B0%8F%E4%B8%80%E6%94%B6%E7%94%9F",
    "scope": "核對小一校網41及2027/28招生時間表。2026年9月17日至25日為申請期；校方頁面列出自行分配名單、註冊、統一派位選校及放榜日期。當屆申請期已截止，報告不推算取錄概率。",
    "sourceType": "school-official",
    "academicYear": "2027/28入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘天主教華德學校：插班生申請",
    "url": "https://ktbwcs.edu.hk/%E6%8F%92%E7%8F%AD%E7%94%9F",
    "scope": "校方頁面說明只接受小二至小五插班，列出上下學期申請月份、筆試科目、面試及文件要求；屬校方公開程序，不外推錄取率或年級空缺。",
    "sourceType": "school-official",
    "academicYear": "以校方當屆公告為準",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对甲类必收、计分首五项互斥、宗教与主办社团成员互斥、同分甄选及2027年度自行/统一派位节点；不提供本校申请人数或胜算。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "核对直属85%、联系25%一般以扣除自行分配及重读生后的统一派位余额为分母；学校网组别、乙部首选、跨网和超额随机排序均影响资格，不是毕业生升读率。",
    "sourceType": "government",
    "academicYear": "2027年9月中一入学；2026年9月发布",
    "checkedOn": "2026-10-28"
  }
],
  "ktgps": [
  {
    "label": "教育局《小學概覽2026》：九龍塘官立小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=109",
    "scope": "核對校網41、官立男女校、創校年份、中文為教學語言、2026/27收費、設施、2025/26教師45人與資歷、兩學年24班、小四至小六分班、P1及P2-P6考核安排，以及教育局概覽所列三所提名中學；不以提名關係推算升中保障。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘官立小學：2024–2026年度中學學位分配結果",
    "url": "https://www.klntong.edu.hk/it-school/php/webcms/files/upload/tinymce//20252026/_1672026_1784700348.pdf",
    "scope": "校方列出2024–2026年度畢業生升讀的中學名稱，包括伊利沙伯中學、喇沙書院、瑪利諾修院學校（中學部）、華仁書院（九龍）、英華書院、迦密中學、黃笏南中學等；沒有逐校人數或畢業生分母，報告只作去向名單，不計算升讀率。",
    "sourceType": "school-official",
    "academicYear": "2024–2026",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘官立小學：升中資訊及聯繫中學",
    "url": "https://www.klntong.edu.hk/it-school/php/webcms/public/index.php3?lang=zh&mode=published&refid=3252",
    "scope": "校方列出伊利沙伯中學、何文田官立中學、賽馬會官立中學為聯繫中學，並連結2024–2026年度去向結果。校方提醒家庭留意各中學當屆收生安排；聯繫身份不代表個別學生獲保證學位。",
    "sourceType": "school-official",
    "academicYear": "2024–2026去向；升中制度以當屆為準",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍塘官立小學：2027年度小一自行分配學位申請須知",
    "url": "https://www.klntong.edu.hk/",
    "scope": "校方首頁新聞列出2026年9月9日發布的2027年度小一自行分配學位申請須知；本輪未能取得附件正文，報告只提醒家長依校方當屆公告核對，不轉述未讀到的申請細節。",
    "sourceType": "school-official",
    "academicYear": "2027年度小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对甲类必收、计分首五项互斥、宗教与主办社团成员互斥、同分甄选及2027年度自行/统一派位节点；不提供本校申请人数或胜算。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年中学学位分配常见问题",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "核对直属85%、联系25%一般以扣除自行分配及重读生后的统一派位余额为分母；学校网组别、乙部首选、跨网和超额随机排序均影响资格，不是毕业生升读率。",
    "sourceType": "government",
    "academicYear": "2027年9月中一入学；2026年9月发布",
    "checkedOn": "2026-10-28"
  }
],
  "ktl": [
  {
    "label": "教育局《小學概覽2026》：九龍真光中學（小學部）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=91",
    "scope": "核對私立男女校、創校年份、2026/27學費HK$68,270（十期）、2025/26教師22人及資歷、2025/26實際12班與2026/27的13班、中文及英文教學語言、每年三次考試及P1首學期多元評估；教育局列九龍真光中學為提名中學，並未列一條龍或直屬安排。",
    "sourceType": "school-profile",
    "academicYear": "2026/27學費及班數；教師資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍真光中學（小學部）：2027/28小一招生時間表",
    "url": "https://www.ktlsps.edu.hk/wp-content/uploads/2026/09/2027-2028-P1-Admission-Schedule-1.pdf",
    "scope": "校方列出2027/28申請期為2026年8月12日至9月27日，申請費HK$100須於9月30日前郵寄並由校方收妥才完成申請；首輪面試為10月24日至25日，首輪結果11月2日、次輪面試11月7日、結果11月18日。報告按2026年10月28日狀態標明已截止及待公布事項。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一入學",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍真光中學（小學部）：校方招生及語言安排",
    "url": "https://www.ktlsps.edu.hk/",
    "scope": "校方網站說明自2011/12學年起自小一起採用英語作教學語言，且已設2027/28小一招生頁。教育局概覽同時列中文及英文為教學語言；因未取得逐科當屆課時表，不寫成全科純英或語言沉浸比例。",
    "sourceType": "school-official",
    "academicYear": "2027/28招生；英語教學沿革始於2011/12",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "九龍真光中學（小學部）：插班申請",
    "url": "https://www.ktlsps.edu.hk/admission/primary-one-to-three-admission/",
    "scope": "校方列明小一至小三插班所需文件及按個案甄選、合資格者參加筆試；不由此推斷更高年級安排、面試形式或錄取概率。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2027年小一入学单张",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/EDB%20-%20P1Leaflet_TC.pdf",
    "scope": "核对接受直资小学学位后不能获派POA学位，与已获私立小学录取仍可继续参加统筹的区别；不代替本校注册、退学或留位条款。",
    "sourceType": "government",
    "academicYear": "2027年度小一入学",
    "checkedOn": "2026-10-28"
  }
],
  "kts": [
    {
      label: "九龍塘學校（小學部）：教育局《小學概覽2026》",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&sch_id=114",
      scope: "核對私立男女校、九龍城區且不適用小一校網、2026/27學費HK$69,000及家教會費HK$70、中文（包括普通話）和英語教學語言、2025/26師資及兩學年班級結構、課程語言安排、評估與課後作息；沒有列直属、联系或提名中學。",
      sourceType: "school-profile",
      academicYear: "2026/27；教師及實際班級資料為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍塘學校（小學部）：2026年升中派位結果",
      url: "https://www.ktsps.edu.hk/3/02_4.html",
      scope: "校方2026年8月26日更新的去向名單列出逐校人數及若干合併項目，但沒有畢業生總數或名單分母；報告僅呈現代表性人數與資料限制，不計升讀比例或推斷個人錄取概率。",
      sourceType: "school-official",
      academicYear: "2026屆",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍塘學校（小學部）：2027/28小一入學安排",
      url: "https://www.ktsps.edu.hk/9/01_2.html",
      scope: "核對2026年11月網上申請及交件日期、兩輪面試、語言、第二輪及結果日期；首輪面試安排適用所有申請者，不代表錄取。",
      sourceType: "school-official",
      academicYear: "2027/28入學",
      checkedOn: "2026-10-28",
    },
    {
      label: "九龍塘學校（小學部）：當屆插班申請入口",
      url: "https://www.ktsps.edu.hk/",
      scope: "校方首頁列出2026/27各級插班生申請入口；未在可訪問頁面找到固定申請期、年級空缺或統一考核科目，報告不作推測。",
      sourceType: "school-official",
      academicYear: "2026/27插班",
      checkedOn: "2026-10-28",
    },
  ],
  "ky": [
    {
      label: "救恩學校（幼稚園部）：2026/27學校基本資料（2026年10月12日版）",
      url: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/10/2026-27_%E5%AD%B8%E6%A0%A1%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99_r2_20261012.pdf",
      scope: "核對非牟利、半日制、男女校、參加幼稚園教育計劃、全年學費HK$10,930、上午/下午師生比例1:11及1:9、9班/半日、主要教學語言與專責語文教師配置、建構式專題課程、持續評估與設施。此版日期較先前校方資料更新。",
      sourceType: "school-official",
      academicYear: "2026/27",
      checkedOn: "2026-10-28",
    },
    {
      label: "救恩學校（幼稚園部）：2027/28 K1招生行事曆",
      url: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/08/2027-28_%E6%8B%9B%E6%94%B6%E5%B9%BC%E5%85%92%E7%8F%AD%E6%96%B0%E7%94%9F%E8%A1%8C%E4%BA%8B%E6%9B%86v2.pdf",
      scope: "核對申請截止、面試名單公布、面談日期、結果、候補及註冊期限；截至2026年10月28日申請已截止、面談及結果仍在未來。",
      sourceType: "school-official",
      academicYear: "2027/28 K1",
      checkedOn: "2026-10-28",
    },
    {
      label: "救恩學校（幼稚園部）：2027/28 K1收生準則",
      url: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/08/2027-28_K1-%E6%94%B6%E7%94%9F%E6%BA%96%E5%89%87Admission-criteria.pdf",
      scope: "核對優先參考原則及約800名預計面談人數；800是面談名單預計數而非招生學額，最終人數按實際申請調整。",
      sourceType: "school-official",
      academicYear: "2027/28 K1",
      checkedOn: "2026-10-28",
    },
    {
      label: "救恩學校（幼稚園部）：2025/26年度高班升小一統計",
      url: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2026/08/2025-2026%E5%B9%B4%E5%BA%A6%E9%AB%98%E7%8F%AD%E5%8D%87%E5%B0%8F%E4%B8%80%E7%B5%B1%E8%A8%88.pdf",
      scope: "校方列出官津、私立/直資及國際學校去向，沒有逐校人數或畢業生分母；報告僅呈現去向範圍，不計比例或推斷個人錄取層級。",
      sourceType: "school-official",
      academicYear: "2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "救恩學校（幼稚園部）：升小聯繫與插班FAQ",
      url: "https://www.kauyan.edu.hk/kindergarten/admissions/faq/",
      scope: "校方說明幼稚園部學生報讀私立小學部仍須參加同一標準面試，可獲額外分數但無固定年度取錄人數；插班須視乎學額。",
      sourceType: "school-official",
      checkedOn: "2026-10-28",
    },
  ],
  "lchhds": [
    {
      label: "獅子會何德心小學：教育局《小學概覽2026》",
      url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=1&return_page=sch_list.php%3Flang_id%3D1%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D18%26sort_id%3D-1&sch_id=474",
      scope: "核對72校網、資助男女校、免學費及2026/27核准收費、校舍、2025/26師資與2025/26及2026/27班數、7位外籍英語教師、低年級英語增潤安排、分班與評估、必修境外課程及校方所列學校特色；未列直屬、聯繫或提名中學。",
      sourceType: "school-profile",
      academicYear: "2026/27；教師資料為2025/26",
      checkedOn: "2026-10-28",
    },
    {
      label: "獅子會何德心小學：2024/25年度周年校務報告",
      url: "https://www.htsps.edu.hk/attachment/upload/files/01%E5%AD%B8%E6%A0%A1%E6%A6%82%E8%A6%BDPDF/%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83%E5%8F%8A%E5%A0%B1%E5%91%8A/%E5%91%A8%E5%B9%B4%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8A/2024-2025%E5%B9%B4%E5%BA%A6%E5%91%A8%E5%B9%B4%E6%A0%A1%E5%8B%99%E5%A0%B1%E5%91%8Aa.pdf",
      scope: "報告列出2023–2025年度參與中學學位分配的六年級學生107人，其中87人（81%）獲派第一志願或自行分配階段學位；該複合指標不是Band 1升讀率或單一派位類別比例，圖表沒有逐校人數。",
      sourceType: "school-official",
      academicYear: "2024/25校務報告；2023–2025派位年度",
      checkedOn: "2026-10-28",
    },
    {
      label: "獅子會何德心小學：入學申請入口及當屆公告",
      url: "https://www.htsps.edu.hk/tc/content.php?wid=135",
      scope: "核對校方現行入學申請入口，包含自行分配、候補及插班申請；當屆日期以最新公告為準，不沿用舊年度時間表。",
      sourceType: "school-official",
      checkedOn: "2026-10-28",
    },
    {
      label: "獅子會何德心小學：升中派位結果頁",
      url: "https://www.htsps.edu.hk/tc/content.php?wid=270",
      scope: "校方列有派位結果入口並連結年度資料；本次可複核的最新完整比例與分母來自2024/25周年校務報告，未把結果頁未讀到的未來年度數據寫入報告。",
      sourceType: "school-official",
      checkedOn: "2026-10-28",
    },
  ],
  "lh-hp": [
    { label: "教育局學校資料搜尋：學之園幼稚園（海翩康城）", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=612391000111", scope: "核對校址、學校身份、私立及男女校基本資料；不以未經核實的品牌宣傳推斷本校區招生名額或升小率。", sourceType: "government", academicYear: "2026/27", checkedOn: "2026-10-28" },
    { label: "教育局《幼稚園及幼稚園暨幼兒中心概覽2025/26》：學之園（海翩康城）", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=7007", scope: "核對2025/26概覽所列校舍容額、教職員與師生比例等基礎資料；相關人數欄註明為2024年9月數據，不代表2026/27實際班額。", sourceType: "school-profile", academicYear: "2025/26；人數快照為2024年9月", checkedOn: "2026-10-28" },
    { label: "學之園：2026/27學年學費與教材雜費", url: "https://www.learninghabitat.org/en/admission/fees", scope: "校方列出海翩康城PN半日班每月HK$7,800、K1-K3粵英班HK$7,500、普英班HK$7,800，全年12期；教材雜費分別列PN每學期HK$2,200、K1-K3每學期HK$2,500。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-28" },
    { label: "學之園：2027/28 K1申請及面試通知", url: "https://www.learninghabitat.org/en/admission/online-application", scope: "核對2027/28 K1申請期為2026-08-01至2026-10-16，面試安排為2026-11-09或10；校方未公開校區學額、申請人數或錄取率。", sourceType: "school-official", academicYear: "2027/28 K1", checkedOn: "2026-10-28" },
    { label: "學之園：課程班制及教學語言", url: "https://www.learninghabitat.org/en/admission/programmes", scope: "核對學校列出的粵英及普英班制、課程適用級別與師資配置；不把雙語課程推論成小學錄取優勢。", sourceType: "school-official", academicYear: "2026/27", checkedOn: "2026-10-28" },
    { label: "學之園：2025/26畢業生小一去向入口", url: "https://www.learninghabitat.org/en/p1-placement-results", scope: "校方發布品牌層面畢業生升小去向，未按海翩康城校區拆分分母與逐校人數；本報告不把品牌合計數當成本校升小率。", sourceType: "school-official", academicYear: "2025/26", checkedOn: "2026-10-28" },
  ],
  "lht": [
  {
    "label": "教育局《小學概覽2026》：靈糧堂秀德小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&return_page=sch_list.php%3Flang_id%3D2%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D3%26sort_id%3D-1&sch_id=68",
    "scope": "核對98校網、資助男女校、2026/27學費及特定用途費HK$350、2025/26教師資料、2025/26實際29班及2026/27核准30班、一條龍中學、教學語言及校車。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "靈糧堂秀德小學：一條龍升中銜接",
    "url": "https://www.llcst.edu.hk/primary/tc/secondary-cohesion",
    "scope": "校方確認與靈糧堂怡文中學為一條龍學校，並列出小六銜接體驗課；頁面沒有列明當屆資格細則或逐年升讀人數。",
    "sourceType": "school-official",
    "academicYear": "現行校方說明",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "靈糧堂秀德小學：升中派位結果頁",
    "url": "https://www.llcst.edu.hk/primary/tc/allocation-s1-places-result",
    "scope": "校方有升中派位結果入口；本次可讀內容未提供可核實的最新年度畢業生分母與逐校去向，故不採用舊報告的九成升讀說法。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "靈糧堂秀德小學：插班生申請程序",
    "url": "https://www.llcst.edu.hk/primary/tc/transfer-admission",
    "scope": "核對申請文件、中文英文數筆試及學生與家長面試；校方未列固定插班時段或各級空缺。",
    "sourceType": "school-official",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《小學概覽2026》：東涌天主教學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&return_page=sch_list.php%3Flang_id%3D2%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D3%26sort_id%3D-1&sch_id=58",
    "scope": "用於第七章比較東涌天主教學校校網、類別、宗教、2026/27收費、教師及班數、校舍面積、教學語言及概覽所列中學關係。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《小學概覽2026》：香港教育工作者聯會黃楚標學校",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&return_page=sch_list.php%3Flang_id%3D2%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D3%26sort_id%3D-1&sch_id=64",
    "scope": "用於第七章比較黃楚標學校校網、類別、宗教、2026/27收費、教師及班數、校舍面積、教學語言及概覽所列中學關係。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局《小學概覽2026》：嗇色園主辦可譽中學暨可譽小學",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=70",
    "scope": "用於第七章比較可譽小學校網、類別、宗教、2026/27收費、教師及班數、校舍面積、教學語言及概覽所列中學關係。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  }
],
  "lkps": [
  {
    "label": "教育局《小學概覽2026》：靈光小學（荃灣深井）",
    "url": "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=3&return_page=sch_list.php%3Flang_id%3D3%26search_mode%3D%26frmMode%3Dpagebreak%26district_id%3D16%26sort_id%3D-1&sch_id=393",
    "scope": "按校名與深井地址確認目標為荃灣區62校網的靈光小學，而非同名九龍靈光小學；核對免費資助男女校、2025/26教師資料、兩學年各6班、中文授課、保姆車、課程評估及校舍設施。",
    "sourceType": "school-profile",
    "academicYear": "2026/27；教師及實際班級資料為2025/26",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "靈光小學：2027年度自行分配學位安排",
    "url": "https://www.emm.edu.hk/%E8%87%AA%E8%A1%8C%E5%88%86%E9%85%8D%E5%AD%B8%E4%BD%8D-%E7%AC%AC%E4%B8%80%E9%9A%8E%E6%AE%B5",
    "scope": "核對2027年度自行分配學位申請日期及註冊安排；不把歷年自分學額直接當作當屆錄取率。",
    "sourceType": "school-official",
    "academicYear": "2027/28小一",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "靈光小學：升中派位資料入口",
    "url": "https://www.emm.edu.hk/%E5%8D%87%E4%B8%AD%E6%B4%BE%E4%BD%8D",
    "scope": "校方頁面列出2021至2025升中派位五年總結入口；本輪未能讀取附件表格，因此不引用其中未核實數字。",
    "sourceType": "school-official",
    "academicYear": "2021至2025升中派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2026年度62校網統一派位名冊",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/primary-1-admission/school-lists/Net62.pdf",
    "scope": "確認靈光小學在62校網及其地址；名冊數字屬2026年度暫定統一派位學額，不用作2027年度或自行分配學額。",
    "sourceType": "government",
    "academicYear": "2026年度小一統一派位",
    "checkedOn": "2026-10-28"
  },
  {
    "label": "教育局：2025/2027中学学位分配常见问题原件",
    "url": "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/FAQ_SSPA_2027_Sept_General_TC.pdf",
    "scope": "已读全文并复用同批政策原件：中一自行最多两所参加派位中学；统一按派位组别、家长志愿与随机编号，乙部中学学校网原则按小学行政区；不是小一网号。非派位直资及一条龙外报后果分别按条款，不能统一当所有私立路线。",
    "sourceType": "government",
    "academicYear": "2027年9月中一；2026年9月文件",
    "checkedOn": "2026-10-28"
  }
],
  "llc": [
    { label: "教育局《幼稚园概览2025/26》：香港靈糧堂幼稚園（133744）", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6669", scope: "核对铜锣湾注册学校身份、类别、2025/26教育计划参与、课程、2024年9月师生比例及班级人数快照；统计范围不包括2至3岁班，资料不代表其他灵粮堂校舍。", sourceType: "government", academicYear: "2025/26；人员数据为2024年9月", checkedOn: "2026-10-28" },
    { label: "香港靈糧堂：铜锣湾校舍资料", url: "https://response.lingliang.org.hk/campuses/causeway-bay", scope: "核对铜锣湾校舍地址、注册编号、班级安排及校方现行校园规模数据；页面数据与教育局2024年9月快照时间及统计范围不同，不混作同一口径。", sourceType: "school-official", academicYear: "校方现行网页资料", checkedOn: "2026-10-28" },
    { label: "香港靈糧堂：2027/28招生安排", url: "https://response.lingliang.org.hk/zh-CN/admission", scope: "核对报名、会见、结果、注册及费用安排；会见日期为2026年11月20至21日，报名已截止；校方列出会见观察维度，不支持固定时长或分组人数传闻。", sourceType: "school-official", academicYear: "2027/28入学", checkedOn: "2026-10-28" },
    { label: "教育王國：铜锣湾灵粮堂家长讨论（历史个案）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3809454", scope: "2019年前后家长比较铜锣湾灵粮堂与其他幼稚园的讨论，只作为历史个别意见；不能代表当前课程、招生难度或全体家庭体验。", sourceType: "parent-discussion", academicYear: "约2019年讨论", checkedOn: "2026-10-28" },
  ],
  "lmc": [
    { label: "教育局《小学概览2026》：浸信會呂明才小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=304", scope: "核对91校网、资助男女校、办学团体、收费、班数、教师资料、课程及联系中学；班数分别标示2025/26实际与2026/27核准，教师资料为2025/26。", sourceType: "school-profile", academicYear: "2026/27概览；教师与实际班数为2025/26", checkedOn: "2026-10-28" },
    { label: "浸信會呂明才小學：2025/26升中派位结果", url: "https://blmcps.edu.hk/news/detail?post_id=93", scope: "校方于2026-07-08公布该届毕业生120人、98人获校方归类英文中学取录（81.7%）及部分去向；取录不等于最终入读，不等于Band 1比例，亦不能推作个别学生概率。", sourceType: "school-official", academicYear: "2025/26届升中", checkedOn: "2026-10-28" },
    { label: "浸信會呂明才小學：2027/28小一招生", url: "https://www.blmcps.edu.hk/index.php?category_id=47&route=information", scope: "核对2027/28自行分配申请、结果、注册及统一派位申请日期；截至2026-10-28自行分配申请期已结束。学校没有公开可计算个别录取概率的申请人数或分阶段实际学额。", sourceType: "school-official", academicYear: "2027/28小一入学", checkedOn: "2026-10-28" },
    { label: "浸信會呂明才小學：插班生申请", url: "https://www.blmcps.edu.hk/%E6%8F%92%E7%8F%AD%E7%94%9F%E7%94%B3%E8%AB%8B", scope: "核对现行插班申请入口；空缺、年级、截止日期与评核按当届页面和校方回复为准，不将上一年度日期外推。", sourceType: "school-official", academicYear: "2027/28插班入口", checkedOn: "2026-10-28" },
    { label: "教育局：中学学位分配办法家长须知", url: "https://www.edb.gov.hk/attachment/tc/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/NotesForParents_tc_2025.pdf", scope: "核对联系小学保留学额的制度与限制；联系关系不等于自动直升，保留比例不是中学总学额的25%。", sourceType: "government", academicYear: "2025/27中学学位分配周期", checkedOn: "2026-10-28" },
    { label: "教育局《小学概览2026》：浸信會沙田圍呂明才小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=325", scope: "核对91校网、资助基督教男女校、2026/27核准30班、联系浸信会吕明才中学及平均分班安排；用作一吕对比，说明两校共同竞争联系学额。", sourceType: "school-profile", academicYear: "2026/27班数；教师资料为2025/26", checkedOn: "2026-10-28" },
    { label: "教育局《小学概览2026》：培基小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=323", scope: "核对91校网、资助基督教男女校、2026/27核准24班、未列直属或联系中学，以及数学和科学以英语为主的官方教学安排。", sourceType: "school-profile", academicYear: "2026/27班数；教师资料为2025/26", checkedOn: "2026-10-28" },
    { label: "教育局《小学概览2026》：沙田官立小學", url: "https://www.chsc.hk/psp2026/sch_detail.php?lang_id=2&sch_id=294", scope: "核对88校网、官立男女校、2026/27核准29班及两所联系中学；在对比中明确标作跨网参照，不作为91校网学校。", sourceType: "school-profile", academicYear: "2026/27班数；教师资料为2025/26", checkedOn: "2026-10-28" },
    { label: "教育王國：浸信會呂明才小學課程與家長體驗討論", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3828213", scope: "2020年家长讨论涉及普通话分班、功课量和学习压力，样本为个别留言且距今较久；只作为访校提问线索，不推断当前教学或整体家长共识。", sourceType: "parent-discussion", academicYear: "2020年讨论", checkedOn: "2026-10-28" },
  ],
  "ly": [
    { label: "教育局《幼稚园概览2025/26》：绿杨幼稚园", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6645", scope: "核对学校类别、班级及2024年9月学生/教师快照、师生比例、2025/26学费和课程摘要；比例包括2至3岁服务，不能解释为K1班额或K1名额。", sourceType: "government", academicYear: "2025/26；人员数据为2024年9月", checkedOn: "2026-10-28" },
    { label: "绿杨幼稚园：2027/28招生与候补安排", url: "https://www.lukyeungkg.edu.hk/lukyeung/reg-info.php", scope: "核对K1出生年份、会见通知安排、查询日期、N1及K2/K3特殊候补安排；页面未列K1学额、PN直升名额或标准申请截止日期。", sourceType: "school-official", academicYear: "2027/28入学", checkedOn: "2026-10-28" },
    { label: "绿杨幼稚园：课程与校方介绍", url: "https://www.lukyeungkg.edu.hk/lukyeung/", scope: "校方称课程开放灵活，英语课安排教师协同教学；没有公布各科语言比例、外籍教师比例或固定英语课时。", sourceType: "school-official", academicYear: "校方现行网页资料", checkedOn: "2026-10-28" },
    { label: "教育局：绿杨幼稚园2025/26学费证明", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/157716.pdf", scope: "核对历史收费证明的2025/26半日班学费HK$60,000；该收费文件不代表2026/27价格。", sourceType: "government", academicYear: "2025/26", checkedOn: "2026-10-28" },
    { label: "Schooland：绿杨幼稚园收费资料", url: "https://en.schooland.hk/kg/lyk", scope: "第三方学校资料页转录2026/27半日班年费HK$64,800；因未直接取得该年度校方收费证明，缴费前须向校方核对，不作为唯一收费凭据。", sourceType: "third-party-estimate", academicYear: "2026/27", checkedOn: "2026-10-28" },
    { label: "GoodSchool：绿杨幼稚园学校资料", url: "https://www.goodschool.hk/%E7%B6%A0%E6%A5%8A%E5%B9%BC%E7%A8%9A%E5%9C%92", scope: "独立学校资讯页亦转录2026/27半日班年费HK$64,800；属二手资料，缴费前向校方确认。", sourceType: "third-party-estimate", academicYear: "2026/27", checkedOn: "2026-10-28" },
    { label: "教育王國：荃灣幼稚園N班家長討論（含綠楊）", url: "https://www.edu-kingdom.com/forum.php?mod=viewthread&tid=3843105", scope: "2020年荃湾区N班择校讨论中出现绿杨，帖子包含个别家庭经历；年代较久、非抽样调查，不支持当前录取难度、课堂或服务质量结论。", sourceType: "parent-discussion", academicYear: "2020年讨论", checkedOn: "2026-10-28" },
  ],
};

export function getReportSourceReferences(slug: string): ReportSourceReference[] {
  return REPORT_SOURCES[slug] ?? [];
}
