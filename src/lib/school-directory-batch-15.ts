import type { PilotSchool } from "./school-directory-pilot";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRATION = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";

/** Reviewed kindergarten profiles added in batch 15. */
export const KINDERGARTEN_BATCH_15: PilotSchool[] = [
  {
    stage: "kindergarten", slug: "evangelical-lutheran-church-of-hong-kong-nam-cheong-kindergarten-325635", name: "基督教香港信義會南昌幼稚園", nameEn: "EVANGELICAL LUTHERAN CHURCH OF HONG KONG NAM CHEONG KINDERGARTEN", district: "深水埗區", address: "九龍深水埗南昌邨第一座昌頌樓及ＫＧ０１室户外活動場地", schoolNumber: "325635", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://www.elchkkg.edu.hk/nam-cheong", dataYear: "教育局概覽：2026/27；課程資料：2023/24概覽及校方現行網頁；招生：按校方最新公告", sourceNote: "教育局概覽按校址0001列粵語及1:7.4師生比例；校方另列英語、普通話專科及自由遊戲等安排，沒有公布各語言總課時。較詳盡的課程申報可讀版本屬2023/24，按年份理解。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號325635、南昌邨校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001的班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3256350001" },
      { label: "基督教香港信義會南昌幼稚園", scope: "現行首頁、親子自由遊戲活動、支援服務及聯絡資料。", url: "https://www.elchkkg.edu.hk/" },
      { label: "校方支援服務", scope: "駐校社工、非華語學生支援及特殊學習需要服務說明。", url: "https://www.elchkkg.edu.hk/?page_id=1530" },
      { label: "教育局《幼稚園概覽 2023/24》", scope: "有年份的課程申報：主題活動、戲劇、自由遊戲與語文安排。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/325635c-0001.pdf" },
    ],
    detailSections: [{ title: "主題探究與自由遊戲", featured: true, note: "校方與教育局資料的年度不同；班制和比例按2026/27概覽，課程細節標作2023/24申報。", details: [
      { label: "主題活動連接生活經驗", value: "校方概覽資料記錄按幼兒年齡、興趣和生活經驗編訂主題活動，讓孩子透過探索建立知識、態度和技能。較詳盡的申報內容來自2023/24，不能直接視為現屆每級的週課表。", period: "2023/24課程申報", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/325635c-0001.pdf" },
      { label: "自由遊戲及專科語文活動", value: "較早的教育局概覽記錄自由遊戲、戲劇和實地參觀，並由專任教師教授英語與普通話；校方現行首頁亦持續公布自由遊戲親子體驗活動。概覽未提供各語言每週課時，不能據此判定英文或普通話是主要授課語言。", period: "課程申報：2023/24；活動公告查核：2026-10", sourceUrl: "https://www.elchkkg.edu.hk/" },
      { label: "家庭支援資訊較具體", value: "校方公布學前單位社工服務、非華語學生支援及有需要兒童的到校學前康復服務。家庭可直接確認服務對象、轉介程序及當屆可提供的支援時數。", sourceUrl: "https://www.elchkkg.edu.hk/?page_id=1530" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "cumberland-presbyterian-church-green-pasture-kindergarten-524123", name: "金巴崙長老會青草地幼稚園", nameEn: "CUMBERLAND PRESBYTERIAN CHURCH GREEN PASTURE KINDERGARTEN", district: "離島區", address: "新界大嶼山東涌富東邨富東廣場二樓", schoolNumber: "524123", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://www.gpkg.edu.hk", dataYear: "教育局概覽：2026/27；校方招生：2027/28；課程特色及校本活動：校方現行網站", sourceNote: "校方課程把遊戲探索、品格、正向情緒、藝術、英語及普通話活動並列，另公開非華語學生支援。2027/28招生頁與2026/27在讀班制分開理解；師生比例不是班額。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號524123、東涌富東邨校址、電話及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5241230001" },
      { label: "青草地幼稚園：課程特色", scope: "遊戲探索、品格與正向情緒、藝術、語言活動及非華語支援。", url: "https://www.gpkg.edu.hk/課程介紹/中文/" },
      { label: "青草地幼稚園：招生公告", scope: "2027/28 K1申請期；只適用公告所列學年。", url: "https://www.gpkg.edu.hk/" },
      { label: "青草地幼稚園：學生支援", scope: "新生適應、升小適應、課餘支援及駐校社工等校方說明。", url: "https://www.gpkg.edu.hk/課程介紹/奇趣科學/" },
    ],
    detailSections: [{ title: "遊戲探索與品格教育", featured: true, note: "語文活動與《幼稚園概覽》的主要授課語言欄是不同口徑；校方未公開全週語言比例。", details: [
      { label: "從遊戲和設計活動建構知識", value: "校方稱按兒童發展、能力、需要和興趣設計活動，透過討論、角色扮演、遊戲、美藝、參觀及品格實踐共同探索。這種安排把學習放在操作和互動中；參觀時可觀察教師如何把遊戲延伸成幼兒自己的提問。", sourceUrl: "https://www.gpkg.edu.hk/課程介紹/中文/" },
      { label: "品格及情緒教育連到日常實踐", value: "校方列有品格教育、正向情緒和家校實踐活動，並以宗教活動作為課程一部分。這是校方的課程設計方向，並非獨立評估結果；家長可問活動如何因應不同年齡和情緒需要安排。", sourceUrl: "https://www.gpkg.edu.hk/課程介紹/中文/" },
      { label: "支援資料包括新生適應與社工", value: "校方支援頁記錄K1新生適應安排、高班升小適應活動，以及駐校社工和非華語學生課餘中文支援。具體服務時數及本年度名額仍需向校方確認。", sourceUrl: "https://www.gpkg.edu.hk/課程介紹/奇趣科學/" },
      { label: "2027/28 K1招生已公布", value: "校方首頁公布2027/28年度K1申請安排；此公告屬新一屆招生資訊。家長應以申請頁的實際截止日期、面見方式及班別為準。", period: "2027/28招生", sourceUrl: "https://www.gpkg.edu.hk/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "melody-anglo-chinese-kindergarten-157503", name: "美樂中英文幼稚園", nameEn: "MELODY ANGLO-CHINESE KINDERGARTEN", district: "屯門區", address: "新界屯門湖翠路２號美樂花園地下１８０號舖", schoolNumber: "157503", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "http://www.melody.edu.hk", dataYear: "教育局概覽：2026/27；校方課程資料查核：2026-10；招生日期以當屆公告為準", sourceNote: "校方介紹自由遊戲、方案教學、情緒教育、生命教育、環保和資訊科技等校本內容；概覽語言欄列英語，校名中的「中英文」不等於公開的語言課時比例。幼兒園部是另一個登記單位，地址和收生安排不可混用。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號157503、美樂花園幼稚園校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1575030001" },
      { label: "美樂中英文幼稚園：校本課程", scope: "自由遊戲、方案教學、珍惜資源、情緒與生命教育及資訊科技。", url: "https://www.melody.edu.hk/校本課程/" },
      { label: "美樂中英文幼稚園：官方網站", scope: "學校聯絡、最新活動及校本課程入口。", url: "https://www.melody.edu.hk/" },
    ],
    detailSections: [{ title: "自由遊戲與方案教學", featured: true, note: "校方課程網頁未逐項標出適用年級與每週頻次；不將課程特色換算為每日固定課時。", details: [
      { label: "幼兒可參與選擇遊戲材料和玩法", value: "校方描述教師預備安全環境，讓幼兒按喜好、能力和生活經驗選擇玩具、邀請同伴並構思玩法。對重視自主探索的家庭，參觀時可看教師如何在自由活動中觀察、介入和延伸學習。", sourceUrl: "https://www.melody.edu.hk/校本課程/" },
      { label: "方案教學由幼兒共同討論主題", value: "校方稱幼兒可一起討論主題及為問題找答案，並透過合作、表達和分享成果培養主動學習。這是校方公布的課程方式；家長可詢問本年度不同級別的主題例子和家長參與方式。", sourceUrl: "https://www.melody.edu.hk/校本課程/" },
      { label: "情緒與環保教育有具體活動例子", value: "課程頁列高班情緒課程，以故事和角色扮演處理情感、溝通、衝突與改變；亦列環保物料創作、分類回收及親子活動。所列課程不代表每級都採相同單元。", sourceUrl: "https://www.melody.edu.hk/校本課程/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "the-church-of-christ-in-china-kei-chun-kindergarten-324795", name: "中華基督教會基真幼稚園", nameEn: "THE CHURCH OF CHRIST IN CHINA KEI CHUN KINDERGARTEN", district: "深水埗區", address: "九龍深水埗麗閣邨麗蘿樓地下１１４－１２７號", schoolNumber: "324795", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "http://kck.ccc.edu.hk", dataYear: "教育局概覽：2026/27；校方現行課程與2027/28招生資料查核：2026-10", sourceNote: "校方以CHEERFUL課程架構呈現品格、賦權、探索、信心、獨特與關愛；現正公布2027/28新生申請。部分學費及申請細節仍停留在2025/26頁面，未當作最新年度資料。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號324795、麗閣邨校址、電話及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3247950001" },
      { label: "基真幼稚園：學校課程", scope: "CHEERFUL理念、品格教育、兒童選擇、遊戲探索及個別差異。", url: "https://kck.ccc.edu.hk/課程特色/學校課程/" },
      { label: "基真幼稚園：學校簡介", scope: "創校、辦學團體、校舍及教育計劃身份。", url: "https://kck.ccc.edu.hk/introduction-2/school-introduction/" },
      { label: "基真幼稚園：2027/28招生", scope: "現行招生學年及申請對象；面試等細節按最新指引確認。", url: "https://kck.ccc.edu.hk/" },
    ],
    detailSections: [{ title: "CHEERFUL課程與遊戲探索", featured: true, note: "校方的理念框架說明教學方向；不能單憑理念名稱推定課堂效果或各級課時。", details: [
      { label: "課程把品格、探索和幼兒選擇放在一起", value: "校方以CHEERFUL表達品格、盼望、賦權、探索、歡樂、信心、獨特和關愛，並稱幼兒可按興趣選擇、表達意見，透過遊戲和環境設置探索。家長參觀時可看孩子是否真有選擇機會，以及教師怎樣提供引導。", sourceUrl: "https://kck.ccc.edu.hk/課程特色/學校課程/" },
      { label: "日常品格教育有固定的校本設計", value: "校方公布全年設四個品格主題，配合週會德育故事及品格獎勵計劃。家長可了解獎勵如何使用、如何照顧不同性格幼兒，以及家庭如何配合。", sourceUrl: "https://kck.ccc.edu.hk/課程特色/學校課程/" },
      { label: "2027/28申請已開放，逐年費用需更新核對", value: "校方首頁現正接受2027/28 K1申請；網站可讀的詳細費用表仍標示2025/26。家庭預算應另向校方索取2027/28學費、教材和膳食收費，不把舊年度金額當現價。", period: "招生：2027/28；可讀費用表：2025/26", sourceUrl: "https://kck.ccc.edu.hk/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "the-salvation-army-so-uk-kindergarten-615641", name: "救世軍蘇屋幼稚園", nameEn: "THE SALVATION ARMY SO UK KINDERGARTEN", district: "深水埗區", address: "九龍深水埗蘇屋邨彩雀樓地下", schoolNumber: "615641", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://www.salvationarmy.org.hk/esd/sukg/?langcode=zh-hant", dataYear: "教育局概覽：2026/27；校方可讀課程及校本活動資料：2023/24至2026年", sourceNote: "學校於蘇屋邨開辦，救世軍教育服務以全人教育為辦學方向。可讀的校本中國文化活動表為2023/24，故只作有年份的活動例子，不代表當屆每班安排；KGP師生比例不是班級人數。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號615641、蘇屋邨校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6156410001" },
      { label: "救世軍蘇屋幼稚園", scope: "校方辦學及聯絡資料、校本活動入口。", url: "https://www.salvationarmy.org.hk/esd/sukg/?langcode=zh-hant" },
      { label: "救世軍教育服務部：辦學方向", scope: "機構教育服務使命及全人教育取向，不作本校個別成效評價。", url: "https://www.salvationarmy.org.hk/esd/hk/" },
      { label: "校方2023/24中華文化校本活動表", scope: "標示年度的主題活動案例。", url: "https://www.salvationarmy.org.hk/esd/sukg/cms/sites/default/files/web/中華文化校本學習活動%20-%2023.24中國文化月.pdf" },
    ],
    detailSections: [{ title: "全人教育與校本活動", featured: true, note: "校方機構理念與本校可見活動紀錄分開呈現；不以機構理念代替當屆課程時間表。", details: [
      { label: "救世軍以全人教育作為辦學方向", value: "救世軍教育服務以基督教使命和重視人的價值作為機構方向。這提供辦學背景，但本校每日課程、宗教活動安排及家庭參與方式仍需查看校方當屆資料。", sourceUrl: "https://www.salvationarmy.org.hk/esd/hk/" },
      { label: "校本文化活動留有具體年度紀錄", value: "校方公開2023/24中華文化校本活動表，內容以節日活動、遊戲及生活體驗認識文化。這可說明學校曾採用的活動形式，不代表2026/27每個年級仍按相同項目進行。", period: "2023/24（歷史活動紀錄）", sourceUrl: "https://www.salvationarmy.org.hk/esd/sukg/cms/sites/default/files/web/中華文化校本學習活動%20-%2023.24中國文化月.pdf" },
      { label: "概覽資料可先確認基本班制和語言", value: "教育局《幼稚園概覽2026/27》按校址0001列上午、下午及全日班、粵語授課及1:9.6師生比例。比例是校址統計，不代表單班人數；報名前應再確認當屆開班時段和全日班收費。", period: "2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6156410001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "western-pacific-kindergarten-324264", name: "西太平洋幼稚園", nameEn: "WESTERN PACIFIC KINDERGARTEN", district: "深水埗區", address: "九龍南昌街1號南昌一號地下(樓梯及升降機)、1樓2號舖與1樓及2樓平台", schoolNumber: "324264", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；校方列上午及下午班；教育局概覽按校址0004列班制", website: "https://www.wpk.edu.hk", dataYear: "教育局概覽：2026/27（校址0004）；校方課程及招生資料查核：2026-10", sourceNote: "校方自述為多元文化非牟利幼稚園，採雙班主任制，由本地教師與外籍英語教師共同授課；官方頁未說明英語課時比例。教育局概覽校址0004資料不可與同號機構其他登記校址混用。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號324264、登記校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號324264、校址0004班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3242640004" },
      { label: "西太平洋幼稚園：課程", scope: "六大學習範疇、多元文化、品德及升小適應安排。", url: "https://wpk.edu.hk/zh/curriculum/" },
      { label: "西太平洋幼稚園：學校簡介", scope: "創校年份、非牟利身份、多國籍學生及雙班主任制。", url: "https://wpk.edu.hk/zh/home/" },
      { label: "西太平洋幼稚園：入學申請", scope: "當屆招生、面見形式及校方列出的收生考慮。", url: "https://wpk.edu.hk/zh/admission-2/" },
    ],
    detailSections: [{ title: "多元文化與雙班主任", featured: true, note: "外籍英語教師參與共同授課，不等於全日英語授課；班制資料限校址0004及概覽年度。", details: [
      { label: "課堂採雙班主任共同授課", value: "校方稱由外籍英語教師和本地幼稚園教師共同授課，並採主題、全語文和設計活動等教學法。這是教師配置和課程方式的描述，不代表全日英語沉浸；家長宜問K1日常照顧語言和每週英語時段。", sourceUrl: "https://wpk.edu.hk/zh/home/" },
      { label: "社區與多元文化被納入課程", value: "校方表示學生來自不同國籍，教師運用社區資源拓展學習，並以生活主題、故事和角色扮演讓孩子在實踐中學習。適合重視多元文化接觸的家庭，仍需了解班級實際語言組成及支援方式。", sourceUrl: "https://wpk.edu.hk/zh/curriculum/" },
      { label: "小一適應是高班的明確安排", value: "校方稱向高班家長提供升小資訊，並為學生安排小一適應課程。這是幼稚園階段的銜接活動，不等於對特定小學的升學通道或錄取優勢。", sourceUrl: "https://wpk.edu.hk/zh/curriculum/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "the-hong-kong-federation-of-youth-groups-kk-cheng-kindergarten-594130", name: "香港青年協會鄭堅固幼稚園", nameEn: "THE HONG KONG FEDERATION OF YOUTH GROUPS KK CHENG KINDERGARTEN", district: "觀塘區", address: "九龍牛頭角彩興路８號彩德邨彩誠樓地下１號舖", schoolNumber: "594130", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://kkc.hkfyg.org.hk", dataYear: "教育局概覽：2026/27；校方服務及團隊資料查核：2026-10；完整課程申報：2021/22（歷史資料）", sourceNote: "校方現行服務頁列全日和上午班及每天提供膳食，服務宗旨頁提及多元學習與專題研習；教師團隊頁列英語及普通話活動。詳細課程評估資料可讀版較舊，已標示年份。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號594130、彩德邨校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5941300001" },
      { label: "鄭堅固幼稚園：服務宗旨", scope: "主動學習、專題研習、討論、參觀、分享和實驗等辦學自述。", url: "https://kkc.hkfyg.org.hk/單位介紹/" },
      { label: "鄭堅固幼稚園：服務資料", scope: "現行公開班級、服務時段及膳食資訊。", url: "https://kkc.hkfyg.org.hk/服務資料/" },
      { label: "鄭堅固幼稚園：教師團隊", scope: "註冊教師、英語及普通話活動師資自述。", url: "https://kkc.hkfyg.org.hk/鄭堅固校園/本校團隊/" },
      { label: "教育局《幼稚園概覽 2021/22》", scope: "舊年度課程設計和持續觀察評估資料；只作歷史背景。", url: "https://kkc.hkfyg.org.hk/wp-content/uploads/sites/33/2023/01/594130c-0001.pdf" },
    ],
    detailSections: [{ title: "專題研習與家庭服務", featured: true, note: "校方服務頁與歷史教育局概覽分開引用；過往評估方法不代表現屆頻率。", details: [
      { label: "透過專題和實作引導幼兒探索", value: "香港青年協會的校方介紹稱，學校以多元學習和專題研習引發幼兒思考、探索、嘗試和發現，並透過討論、參觀、分享和實驗學習。家長可問當屆主題例子及幼兒實際參與方式。", sourceUrl: "https://kkc.hkfyg.org.hk/單位介紹/" },
      { label: "外語活動由專科教師支援", value: "校方團隊頁稱聘有外籍英語教師及合格普通話教師進行相應活動，另設藝術活動和學習支援。網站沒有列每週課時，不能將這些活動理解為全日英語或普通話授課。", sourceUrl: "https://kkc.hkfyg.org.hk/鄭堅固校園/本校團隊/" },
      { label: "現行服務頁列全日及膳食", value: "校方服務頁列K1至K3、上午及全日班，並稱每日提供均衡膳食。教育局概覽同時列下午班；報名前宜直接確認當屆是否開設各時段、收費及膳食安排。", sourceUrl: "https://kkc.hkfyg.org.hk/服務資料/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "star-of-the-sea-catholic-kindergarten-324094", name: "天主教海星幼稚園", nameEn: "STAR OF THE SEA CATHOLIC KINDERGARTEN", district: "東區", address: "香港柴灣道200號4樓及5樓部份範圍(包括521至525室)", schoolNumber: "324094", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "天主教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "http://www.starkg.edu.hk", dataYear: "教育局概覽：2026/27；校方簡介與課程資料查核：2026-10", sourceNote: "校方列出1976年創辦、天主教香港教區辦學、遊戲中學習及主動積極的教育目標，並在同一校舍另設幼兒園部。此頁只指幼稚園，不混入幼兒園部班額或服務。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號324094、柴灣道校址及幼稚園身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3240940001" },
      { label: "天主教海星幼稚園：學校簡介", scope: "創校、辦學團體、教育願景與使命、校舍及教師資料。", url: "https://www.starkg.edu.hk/chi/about-us/general-information" },
      { label: "天主教海星幼稚園官方網站", scope: "校方最新公告及課程資料入口。", url: "https://www.starkg.edu.hk/" },
    ],
    detailSections: [{ title: "天主教價值與遊戲學習", featured: true, note: "幼稚園部與同址幼兒園部為不同登記服務；本頁資料不跨單位合併。", details: [
      { label: "辦學理念以愛、服務和品格為主軸", value: "校方以天主教的愛與服務作辦學根基，列出愛主、謙遜、溫良和堅忍等德行，並希望幼兒以主動積極的態度面對困難。這是校方教育目標，不等同對兒童品格成效的外部評估。", sourceUrl: "https://www.starkg.edu.hk/chi/about-us/general-information" },
      { label: "遊戲是價值教育的日常載體", value: "校方提出讓幼兒在生活和遊戲中學習待人處事，校舍亦列音樂、圖書、語文、多元活動及室內外遊戲空間。家長可參觀時了解宗教活動如何按年齡進行，以及課堂如何平衡自由遊戲與教師帶領活動。", sourceUrl: "https://www.starkg.edu.hk/chi/about-us/general-information" },
      { label: "與幼兒園部同址但服務需分開問", value: "校方說明幼稚園與幼兒園部在同一校舍運作。教育局概覽及本頁所列班制、師生比例只對應幼稚園校址0001；如家庭需要兩歲服務，應另查幼兒園部的收生和服務資料。", period: "校址0001；2026/27概覽", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3240940001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "heep-hong-society-shanghai-fraternity-association-healthy-kids-kindergarten-612561", name: "協康會上海總會康苗幼稚園", nameEn: "HEEP HONG SOCIETY SHANGHAI FRATERNITY ASSOCIATION HEALTHY KIDS KINDERGARTEN", district: "葵青區", address: "新界葵涌葵芳邨葵德樓地下10—16號舖", schoolNumber: "612561", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；校方列上午及全日班，概覽按校址0001列班制", website: "https://www.heephong.org/sfahk", dataYear: "教育局概覽：2026/27；校方學費、班制與教學資料：2026/27", sourceNote: "協康會校方頁列蒙特梭利教學、探究和STEM活動、融合教育支援及駐校社工；2026/27學費和時段有校方當屆資料。班額、師生比例與服務名額是不同口徑，不互相替代。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號612561、葵芳邨校址及幼稚園身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6125610001" },
      { label: "協康會上海總會康苗幼稚園：學校簡介", scope: "兒童為本、蒙特梭利、探究、STEM、融合教育及全年招生說明。", url: "https://www.heephong.org/sfahk/about-us/school-profile" },
      { label: "協康會：服務與收生資料", scope: "K1至K3招生、服務時段及查詢方式。", url: "https://www.heephong.org/chs/page/detail/250040" },
      { label: "協康會上海總會康苗幼稚園：校園資訊", scope: "2025/26通訊、質素評核、校本概覽及活動紀錄入口。", url: "https://www.heephong.org/sfahk/school-information" },
    ],
    detailSections: [{ title: "蒙特梭利與融合教育支援", featured: true, note: "蒙特梭利與融合支援是校方公布的課程取向；個別服務安排須按孩子需要與當屆資源確認。", details: [
      { label: "孩子按步伐使用教具自主探索", value: "校方稱採蒙特梭利教學，讓幼兒按發展階段、興趣和能力操作教具，教師負責預備環境、觀察並適時引導。家長可看課室是否有安靜專注的個人操作時間，以及教師如何跟進孩子的進度。", sourceUrl: "https://www.heephong.org/sfahk/about-us/school-profile" },
      { label: "主題探究和STEM補充操作學習", value: "學校另列主題教學、探究和STEM活動，提供小組、生活體驗、自我照顧及社交適應訓練。校方公開的班額上限和師生比例有各自口徑；不能把其中一項當成個別班的實際人數。", sourceUrl: "https://www.heephong.org/sfahk/about-us/school-profile" },
      { label: "2026/27費用與服務時段可供家庭計算", value: "校方公布2026/27半日班免學費、全日班每月學費及膳食費，並列上午和全日班。家庭比較時應把全日服務的額外學費、膳食和交通一併計入，並確認孩子是否符合相關支援服務安排。", period: "2026/27學年", sourceUrl: "https://www.heephong.org/sfahk/about-us/school-profile" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "po-leung-kuk-mrs-tam-wah-ching-kindergarten-542768", name: "保良局譚華正夫人幼稚園", nameEn: "PO LEUNG KUK MRS TAM WAH CHING KINDERGARTEN", district: "葵青區", address: "九龍荔枝角華荔邨賞荔樓７字樓７０３室", schoolNumber: "542768", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://www.plkkgs.edu.hk/plkmtwckg", dataYear: "教育局概覽：2026/27；校方簡介、課程與師資資料查核：2026-10", sourceNote: "校方按六大學習範疇和幼兒生活經驗編排課程，聘有英語及普通話教師，並強調雙向溝通。外語教師配置不代表各語言課時相等；逐年招生、班別和全日費用應另看當屆公告。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號542768、華荔邨校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5427680001" },
      { label: "保良局譚華正夫人幼稚園：校園簡介", scope: "學校特色、課程規劃、班制及教師語言配置。", url: "https://www.plkkgs.edu.hk/plkmtwckg/hk/about/10" },
      { label: "保良局譚華正夫人幼稚園官方網站", scope: "校方最新校務及招生公告入口。", url: "https://www.plkkgs.edu.hk/plkmtwckg" },
    ],
    detailSections: [{ title: "六大範疇與兩文三語", featured: true, note: "教師配置是校方公開安排，未見各級語言週課時；不將其描述為沉浸式雙語課程。", details: [
      { label: "六大範疇按幼兒生活經驗編排", value: "校方列語文、幼兒數學、大自然與生活、個人與群體、體能與健康、藝術與創意六個範疇，並稱按幼兒能力、興趣和生活經驗編課。這有助家長了解課程覆蓋面，仍應問各級如何從主題活動落到日常學習。", sourceUrl: "https://www.plkkgs.edu.hk/plkmtwckg/hk/about/10" },
      { label: "外籍英語與普通話教師支援語言學習", value: "校方稱聘有外籍英語教師及普通話教師，並以雙向溝通促進思考與表達。沒有公布各語言的週課時或日常照顧語言；重視英文環境的家庭宜索取K1時間表。", sourceUrl: "https://www.plkkgs.edu.hk/plkmtwckg/hk/about/10" },
      { label: "班制選擇需與家庭照顧安排配對", value: "教育局概覽列上午、下午及全日班；各時段的開班和收費以校方當屆公告為準。若家庭需要全日照顧，應一併確認膳食、放學時間、延展照顧及相關費用。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5427680001" },
    ] }],
  },
];
