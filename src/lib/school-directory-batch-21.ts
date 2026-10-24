import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  dataYear: string,
  sourceNote: string,
  sources: PilotSchool["sources"],
  detailSections: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear, sourceNote, appendDirectoryDetails: true, sources, detailSections };
}

/** Official-source profile supplements reviewed in kindergarten batch 21. */
export const KINDERGARTEN_BATCH_21: PilotSchool[] = [
  profile("133787", "教育局概覽：2026/27；政府及辦學團體資料查核：2026-10", "閩光書院（幼稚園部）的登記身份、校址及參加幼稚園教育計劃情況按教育局資料；基督教辦學理念按辦學團體申報，不等同外部成效評估。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號133787、校址0001及九龍城天光道14號登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：閩光書院", scope: "該校址當屆概覽欄位及校方提供的課程資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1337870001" },
    { label: "教育局：2026/27參加幼稚園教育計劃名單（九龍城區）", scope: "確認閩光書院列於當屆參加計劃名單；不是學額或收生結果資料。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2627_KC.pdf" },
    { label: "教育局：閩光書院質素評核報告索引", scope: "教育局提供的該校質素評核報告入口；報告年份及評核範圍須按原文理解。", url: "https://www.edb.gov.hk/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KLN.html" },
  ], [{ title: "基督教辦學與均衡發展", featured: true, note: "理念來自教育局概覽及辦學團體申報；公開資料不足以判斷課堂落實程度或幼兒發展成效。", details: [
    { label: "以基督教信念作辦學背景", value: "教育局概覽把閩光書院幼稚園部列為基督教非牟利幼稚園，辦學團體以基督的愛為教育理念。家庭如重視宗教氛圍，可在參觀時了解祈禱、聖經故事或宗教活動在一週生活中的安排；現有簡介沒有列明各項活動的固定時數。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1337870001" },
    { label: "校方以德智體群美靈作均衡發展目標", value: "概覽所載辦學目標涵蓋德、智、體、群、美及靈育。這是教育方向，不是學習成果數據；家長可進一步問各級課程如何安排體能、藝術、群體合作及語文活動，避免只憑理念文字判斷日常課堂。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1337870001" },
  ] }]),

  profile("539163", "教育局概覽：2026/27；辦學團體資料查核：2026-10", "按教育局名錄及嚴徐玉珊幼稚園指定校址核對校名、地址與課程；仁濟醫院集團頁面把本校列於和田邨和麗樓，採用校址編號0002的概覽資料。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號539163、校址0002及屯門和田邨和麗樓地下登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：仁濟醫院嚴徐玉珊幼稚園", scope: "指定校址0002的當屆班制、語言和課程申報，不以其他仁濟幼稚園資料代替。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5391630002" },
    { label: "仁濟醫院：學前教育服務概覽", scope: "嚴徐玉珊幼稚園地址、聯絡資料、兒童為本及專題／遊戲學習理念。", url: "https://www.yanchai.org.hk/services/education-services/services-overview/preschool-education" },
    { label: "仁濟醫院：嚴徐玉珊幼稚園新校舍啟用", scope: "2023年遷入和田新址及設施介紹；只作該次遷校的歷史記錄。", url: "https://www.yanchai.org.hk/f/education_plus/2264/ych-017.pdf" },
  ], [{ title: "主題探究與親身體驗", featured: true, note: "兒童為本、專題研習及外語教師安排均為辦學團體／校方公開描述；沒有公開逐日課時或獨立成效比較。", details: [
    { label: "以螺旋式主題和專題研習組織課程", value: "仁濟醫院介紹稱，課程按循序漸進的主題編排，讓幼兒透過體驗、自主探索、討論和互動學習，並自行設計、策劃和創作。這種設計預期讓孩子在活動中表達和建立概念；家長可參觀時看孩子是否真的有提問、選擇和回顧作品的機會。", sourceUrl: "https://www.yanchai.org.hk/services/education-services/services-overview/preschool-education" },
    { label: "語言課程包括外籍英語及普通話教師", value: "辦學團體資料稱安排外籍英語教師和普通話教師教授語文，並以多元活動支援語文能力。頁面未列明每週課時、班級分配或主要日常授課語言；重視英語或普通話的家庭應索取該校址當屆時間表。", sourceUrl: "https://www.yanchai.org.hk/services/education-services/services-overview/preschool-education" },
    { label: "2023年遷校資料可看設施，不可代替課程評估", value: "仁濟醫院記錄本校於2023年遷入和田新址，並介紹圖書區、STEM牆及攀爬設施。這些設施提供活動空間，但不直接證明每班使用頻率或學習效果；家長宜問各年級平日如何使用。", period: "遷校啟用資料：2023年", sourceUrl: "https://www.yanchai.org.hk/f/education_plus/2264/ych-017.pdf" },
  ] }]),

  profile("615633", "教育局概覽：2026/27；校方課程資料查核：2026-10", "艾蒙特國際幼稚園的註冊身份、全日制及新田校址由教育局核實；EYFS及自然／遊戲學習為校方自述，不能據此推定其符合某一海外認證或學習成效。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號615633、校址0001、全日制及新田新圍村校址資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：艾蒙特國際幼稚園", scope: "該校址當屆概覽資料；班級、語言及收費應按概覽年度理解。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6156330001" },
    { label: "教育局元朗區學校名單：艾蒙特國際幼稚園", scope: "學校名稱、學校／校址編號、地址及官方網站入口。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-yl.html" },
    { label: "Eminent Education：課程介紹", scope: "校方對EYFS、教師引導及兒童主導探索的課程描述。", url: "https://www.eminent-education.org/curriculum" },
    { label: "Eminent Education：官方首頁", scope: "校方對自然環境和遊戲學習的介紹；屬辦學團體自述。", url: "https://www.eminent-education.org/" },
  ], [{ title: "EYFS與戶外探索", featured: true, note: "課程框架及教學特色以校方網頁自述為依據；沒有公開逐班課時或第三方課程成效評估。", details: [
    { label: "校方稱課程參照EYFS框架", value: "Eminent Education介紹課程以英國Early Years Foundation Stage（EYFS）為參照，涵蓋個人社交情緒、溝通語言、讀寫、數學、世界認識、體能及藝術設計等學習範疇。這是校方課程定位，家長應確認日常授課語言、各範疇實際課時及幼小銜接安排。", sourceUrl: "https://www.eminent-education.org/curriculum" },
    { label: "教師以引導方式支持探索和遊戲", value: "校方把教師描述為學習引導者，鼓勵孩子在活動中探索並建立興趣。若家庭希望孩子有更多自主選擇，參觀時可觀察課堂是否有連續的自由探索時間，以及教師如何為較慢熱或需要額外支援的幼兒搭橋。", sourceUrl: "https://www.eminent-education.org/curriculum" },
    { label: "自然與戶外活動屬校方特色主張", value: "校方首頁以自然環境及戶外探索介紹學校特色。公開網頁未提供每週戶外活動時數或天氣安排；報名前宜向校方索取當屆日程，並了解雨天和高溫時的替代活動。", sourceUrl: "https://www.eminent-education.org/" },
  ] }]),

  profile("616001", "教育局概覽：2026/27；校方課程及收生資料查核：2026-10", "漢師幼稚園（龍總）按龍總校址0001的教育局資料與校方頁面核對；收生資訊只作2026/27年度說明，不套用至其他學年。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號616001、校址0001及何文田自由道地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：漢師幼稚園（龍總）", scope: "龍總校址的當屆班制、課程及支援資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6160010001" },
    { label: "漢師幼稚園（龍總）：學校簡介", scope: "非牟利辦學、CHILD核心價值及兒童為本課程的校方理念。", url: "https://www.hkvnsaaskg.edu.hk/學校簡介/" },
    { label: "漢師幼稚園（龍總）：2026/27入學申請", scope: "該年度全年收表、面見及非華語申請者語言安排；不代表下一屆日期。", url: "https://www.hkvnsaaskg.edu.hk/入學申請詳情/" },
  ], [{ title: "CHILD價值與多元活動", featured: true, note: "CHILD及兒童為本均為校方理念；招生流程按2026/27公告記錄，需以新一屆公告更新。", details: [
    { label: "以CHILD五大核心價值發展兒童為本課程", value: "校方簡介稱以CHILD五大核心價值發展全方位課程，透過多元活動培養活潑、自信、有責任感和獨立思考的孩子。這些是辦學目標，家庭可在參觀時了解孩子如何參與選擇、合作和整理活動，而不只把理念名稱當作教學成效。", sourceUrl: "https://www.hkvnsaaskg.edu.hk/學校簡介/" },
    { label: "2026/27接受全年申請，非華語面見提供語言協助", value: "校方2026/27招生頁列全年派發及接收申請表，並表示非華語幼兒可用英語面見，必要時可安排烏都語傳譯。這只反映該屆流程；家庭需確認下一屆申請費、面見語言和翻譯安排。", period: "2026/27 K1招生資料", sourceUrl: "https://www.hkvnsaaskg.edu.hk/入學申請詳情/" },
  ] }]),

  profile("618039", "教育局概覽：2026/27；校方校舍及課程資料查核：2026-10", "資料只描述維多利亞何文田校舍，不把集團其他校舍的班制或交通安排套用過來；IB PYP和兩文三語按校方公開頁面表述。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號618039、校址0001及何文田迦密村街9號君逸山登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：維多利亞（何文田）國際幼稚園", scope: "指定何文田校址當屆班制、語言和收費等概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6180390001" },
    { label: "維多利亞教育機構：何文田校舍", scope: "2005年辦學、年齡範圍、IB小學項目、英普粵及校長所述探究課程。", url: "https://www.victoria.edu.hk/zh-hk/campus/homantin-campus/" },
    { label: "維多利亞教育機構：課程及班級時間表", scope: "校方公開的校舍／年級課程與上課時間資料；須按學年及年級閱讀。", url: "https://www.victoria.edu.hk/zh-hk/programme-class-schedule/" },
  ], [{ title: "IB探究與英普粵並行", featured: true, note: "IB小學項目及語言模式是校方公開定位；網頁沒有列出三種語言的逐日課時比例。", details: [
    { label: "校方以IB小學項目及探究課程定位何文田校舍", value: "校方校舍介紹列出國際文憑小學項目（IB PYP），並稱以多元探究課程引導孩子認識周遭事物。對家庭而言，這通常意味著要關注孩子是否願意提問、表達和參與主題活動；家長宜索取年級課例，確認探究如何連接早期讀寫和數學。", sourceUrl: "https://www.victoria.edu.hk/zh-hk/campus/homantin-campus/" },
    { label: "校方列明英語、普通話及粵語教學", value: "何文田校舍資料列出兩文三語教學，包括英語、普通話及粵語，但沒有公布各語言逐日或逐科時數。若家庭希望孩子以英語為主要學習語言，應直接核實何文田校舍各級的語言分配，而不要以集團整體宣傳代替校址時間表。", sourceUrl: "https://www.victoria.edu.hk/zh-hk/campus/homantin-campus/" },
    { label: "校舍同時服務幼兒班至高班及較低齡班級", value: "官方頁列出未滿兩歲、兩歲以上小組班，以及幼兒班至高班，學生年齡範圍為1歲10個月至5歲11個月。不同課程組別的時段和收費會有差異，家長應按孩子年齡查閱最新班級時間表。", sourceUrl: "https://www.victoria.edu.hk/zh-hk/programme-class-schedule/" },
  ] }]),

  profile("159026", "教育局概覽：2026/27；校方課程及招生資料查核：2026-10", "荃灣商會朱昌幼稚園的地址、校址和教育局概覽按葵興邨指定校址；招生日期及費用只記錄校方2026/27公告。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號159026、校址0001及葵興邨興樂樓地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：荃灣商會朱昌幼稚園", scope: "本校址當屆課程、班制、師生比例及語言欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1590260001" },
    { label: "荃灣商會朱昌幼稚園：課程資料", scope: "六大學習範疇、遊戲和自我探索、課外活動及非華語幼兒中文支援。", url: "https://www.cckg93.edu.hk/feature/curriculum-information/" },
    { label: "荃灣商會朱昌幼稚園：官方首頁及2026/27招生公告", scope: "辦學宗旨、最新公告和該年度申請資料。", url: "https://www.cckg93.edu.hk/" },
  ], [{ title: "六大學習範疇與體驗活動", featured: true, note: "課程方向和活動由校方公布；特色班或課外活動的參加條件、頻率及額外費用應向學校核實。", details: [
    { label: "課程覆蓋六大學習範疇", value: "校方列出語文、幼兒數學、大自然與生活、體能與健康、藝術與創意、自我與社會六個範疇，並稱以遊戲和自我探索促進學習。家庭可了解這些範疇在每日課堂中的比重，以及教師如何記錄孩子由遊戲到概念理解的過程。", sourceUrl: "https://www.cckg93.edu.hk/feature/curriculum-information/" },
    { label: "課程外另列舞蹈、美藝、拼音和籃球活動", value: "校方課程頁列有舞蹈、美藝、英語拼音及幼兒籃球等活動，並提及童軍（小童軍）及升旗隊。公開資料未清楚說明哪些屬常規課程、選修或額外收費，報名前應問明參加對象、時段及費用。", sourceUrl: "https://www.cckg93.edu.hk/feature/curriculum-information/" },
    { label: "非華語幼兒中文支援採校本安排", value: "校方稱獲非華語學生支援津貼，安排額外教學人員和助教支援中文學習，並為教師提供專業發展。這是學校整體支援描述，不代表每名幼兒獲得固定個別時數；有需要的家庭可確認班內支援方式和家校溝通語言。", sourceUrl: "https://www.cckg93.edu.hk/feature/curriculum-information/" },
  ] }]),

  profile("523526", "教育局概覽：2026/27；校方校園資料查核：2026-10", "太陽島英文幼稚園樂民分校以指定分校教育局資料和校方頁面記錄；PN服務另有幼兒中心，不能與本幼稚園的登記班制或學額混為一談。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號523526、校址0002及九龍靠背壟道152號樂民新邨校址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：太陽島英文幼稚園（樂民）", scope: "樂民校址0002當屆課程、班制、語言和收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5235260002" },
    { label: "太陽島：樂民分校", scope: "指定分校環境、全日課程及校方公開的雙語與體驗學習描述。", url: "https://sunisland.edu.hk/zh/我們的分校/樂民分校/" },
    { label: "教育局：2026/27幼稚園概覽名單", scope: "教育局當屆概覽資料發布背景；班制與學費以該校址頁為準。", url: "https://www.edb.gov.hk/tc/student-parents/early-childhood-education/kindergarten-k1-admission-arrangements/index.html" },
  ], [{ title: "全日體驗學習與語言環境", featured: true, note: "全日、雙語和校外體驗均按樂民分校頁面描述；幼兒中心的PN班不併入幼稚園學額。", details: [
    { label: "樂民分校以全日課程及體驗學習為特色", value: "校方分校介紹稱樂民校舍提供全日課程，透過校園活動和外出體驗讓幼兒學習。家長可問明每日休息、膳食、戶外活動和校外參觀如何安排，並確認交通及延長照顧是否另計。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/樂民分校/" },
    { label: "雙語教學是校方描述，語言比例未公開", value: "樂民分校介紹以中英雙語描述學習環境，但未列出粵語、普通話和英語的逐日課時比例。若家庭關心英語沉浸程度或粵語基礎，宜向校方索取該年級時間表及語言安排。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/樂民分校/" },
    { label: "PN幼兒中心與本幼稚園登記項目分開核對", value: "辦學團體在樂民另設幼兒中心服務；幼兒中心的兩歲以下／PN課程、時段和收費不能直接當作太陽島英文幼稚園（樂民）的K1至K3學額。需要PN的家庭應向幼兒中心確認其登記、收費和銜接安排。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/樂民分校/" },
  ] }]),

  profile("608475", "教育局概覽：2026/27；校方課程與校舍資料查核：2026-10", "本頁描述Nord Anglia International Pre-School的西貢早期教育校址；以教育局登記資料辨認為幼稚園，以校方現行Early Years頁補充課程，避免和集團其他學段校舍混淆。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號608475、校址0001及西貢康健路285號登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：Nord Anglia International Pre-School（Sai Kung）", scope: "該幼稚園校址當屆登記和概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6084750001" },
    { label: "NAIS Hong Kong：Sai Kung Early Years Campus", scope: "西貢校舍地址、Early Years年齡層及室內外學習環境介紹。", url: "https://www.nordangliaeducation.com/nais-hong-kong/campuses/sai-kung-early-years-campus" },
    { label: "NAIS Hong Kong：Early Years課程", scope: "EYFS、七個學習範疇、遊戲和普通話接觸等課程自述。", url: "https://www.nordangliaeducation.com/nais-hong-kong/academic-excellence/early-years/eyfs-curriculum" },
    { label: "教育局西貢區學校名單：Nord Anglia International Pre-School", scope: "學校／校址編號及登記地址的區域名錄交叉核對。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-sk.html" },
  ], [{ title: "EYFS、遊戲與戶外探索", featured: true, note: "校方目前以NAIS Hong Kong Early Years介紹該西貢校舍；年齡分組、授課語言和招生入口應按個別校舍確認。", details: [
    { label: "課程以EYFS作早期教育框架", value: "NAIS現行Early Years課程頁以EYFS為基礎，列出個人社交情緒、溝通語言、數學、世界認識、體能、藝術設計及讀寫七個範疇。這是英國早期教育框架在校方課程中的呈現；家長應確認實際入讀組別、正式年齡分界和各語言授課安排。", sourceUrl: "https://www.nordangliaeducation.com/nais-hong-kong/academic-excellence/early-years/eyfs-curriculum" },
    { label: "校方強調室內外連通和探索活動", value: "西貢校舍介紹提到室內外相連的學習空間、遊戲與探索。環境可支持幼兒活動，但不能單靠設施判斷每日戶外時數；參觀時可詢問各年級出外活動頻率、惡劣天氣替代安排和接送路線。", sourceUrl: "https://www.nordangliaeducation.com/nais-hong-kong/campuses/sai-kung-early-years-campus" },
    { label: "普通話由Nursery起列入語言接觸", value: "校方EYFS頁表示從Nursery開始接觸普通話；頁面沒有說明普通話與英語的課時比例，也沒有把該課程定位為普通話沉浸。以語言為主要選校條件的家庭應核實當屆時間表。", sourceUrl: "https://www.nordangliaeducation.com/nais-hong-kong/academic-excellence/early-years/eyfs-curriculum" },
  ] }]),

  profile("593630", "教育局概覽：2026/27；校方理念與活動資料查核：2026-10", "こひつじ幼稚園以教育局登記校址及校方日文資料補充；校方的日本式學年與分齡、教會教育及活動安排按日文原文說明，報名前需確認對應香港年級。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號593630、校址0001及黃埔花園校址登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：Kohitsuji Kindergarten", scope: "本校址當屆班制、語言及概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5936300001" },
    { label: "こひつじ幼稚園：保育方針", scope: "校方關於品格、自由遊戲、混齡互動和生活習慣的理念。", url: "https://kohitsujiyouchien.com/about/idea.php" },
    { label: "こひつじ幼稚園：教育活動", scope: "日語及英語活動、繪本、律動與校園生活安排。", url: "https://kohitsujiyouchien.com/activity/" },
    { label: "こひつじ幼稚園：2026年度入園案內", scope: "2026年4月至2027年3月日本學年度的申請及面談說明。", url: "https://kohitsujiyouchien.com/enter/" },
  ], [{ title: "日語環境、混齡互動與生活教育", featured: true, note: "校方資訊以日本年度與日本年齡分組編寫；香港家長須直接核對孩子所屬班級、授課語言及相當年級。", details: [
    { label: "以品格、照顧與自由遊戲為教育重點", value: "校方保育方針重視孩子的善意、尊重和日常生活能力，同時指出自由遊戲須與集體生活規範並行。對家庭而言，這類安排較重視社群生活和自我管理；參觀時可觀察教師如何處理孩子意見不同、輪流和收拾等日常情境。", sourceUrl: "https://kohitsujiyouchien.com/about/idea.php" },
    { label: "日語是主要文化脈絡，英語活動以遊戲接觸", value: "校方活動頁列有日語故事、繪本及英語活動，並以聲音和遊戲接觸英語；公開頁未列出英語沉浸課時。若家庭希望孩子主要以英語或粵語學習，須先確認校方日常溝通語言及孩子入讀後的適應支援。", sourceUrl: "https://kohitsujiyouchien.com/activity/" },
    { label: "混齡互動延伸到日常生活", value: "校方稱不同年級幼兒會在用餐、更衣和自由遊戲等時段互相交流。混齡接觸可能提供模仿和照顧同伴的機會，但公開資料未提供活動比例或個別成效；家長可了解不同年齡如何分組教學和照顧。", sourceUrl: "https://kohitsujiyouchien.com/about/idea.php" },
    { label: "2026入園程序先參觀再申請及面談", value: "校方2026年度入園頁說明先安排參觀，再提交申請及進行面談，並按日本年度界定班級。資料的年度為2026年4月至2027年3月，不能當作2027年度程序；新年度日期及空缺應直接向校方確認。", period: "2026年度入園資料", sourceUrl: "https://kohitsujiyouchien.com/enter/" },
  ] }]),

  profile("609625", "教育局概覽：2026/27；校方校舍及收費資料查核：2026-10", "Guidepost Montessori Discovery Bay的教育局註冊資料與校方現行校舍、課程和2026/27收費頁交叉核對；校方課程定位屬其自我介紹，不代表獨立認證或升學保證。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號609625、校址0001及愉景灣海澄湖畔路92號登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：Guidepost Montessori International Kindergarten（Discovery Bay）", scope: "本校址當屆幼稚園登記及概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6096250001" },
    { label: "Guidepost Montessori：Discovery Bay校舍", scope: "愉景灣校址、Toddler及Children's House年齡組別和校方設施介紹。", url: "https://guidepostmontessori.hk/campuses/discovery-bay/" },
    { label: "Guidepost Montessori：Children's House課程", scope: "3至6歲Montessori班級、個別工作週期和混齡學習的校方說明。", url: "https://guidepostmontessori.hk/programs/childrens-house/" },
    { label: "Guidepost Montessori：2026/27時間表與收費", scope: "Discovery Bay校址按課程列出的時段和月費；費用不含未列出的交通等家庭開支。", url: "https://guidepostmontessori.hk/schedules-and-fees/" },
  ], [{ title: "Montessori自主工作與混齡學習", featured: true, note: "Montessori課程模式和日程為校方自述；該校是私立幼稚園，2026/27收費按校方頁面所列項目理解。", details: [
    { label: "Children's House面向3至6歲幼兒", value: "校方把Children's House界定為3至6歲的Montessori幼稚園課程，孩子按個別發展階段選擇工作材料，教師提供個別或小組示範。家庭可了解自由工作時段如何兼顧集體語言活動、課程進度和孩子需要成人協助的時刻。", sourceUrl: "https://guidepostmontessori.hk/programs/childrens-house/" },
    { label: "校方公開日程包含較長的Montessori工作時段", value: "校方示例半日時間表列出約兩小時的Montessori工作時段，孩子可選實用生活、感官、語言、數學和文化材料。這是樣本日程，不應視為每班每天固定實施；報名前可索取Discovery Bay校址當屆課表。", sourceUrl: "https://guidepostmontessori.hk/programs/childrens-house/" },
    { label: "Discovery Bay同時有Toddler和Children's House課程", value: "校舍頁列有2至3歲Toddler及3至6歲Children's House，另有過渡幼兒和增益活動。校方亦列有戶外遊戲空間；若孩子仍需較多照顧或午睡，應核實所選課程的時長、午膳和延長照顧安排。", sourceUrl: "https://guidepostmontessori.hk/campuses/discovery-bay/" },
    { label: "2026/27月費依課程和時段不同", value: "校方收費頁列Discovery Bay Toddler及Children's House的半日月費；例如Children's House上午班每月8,100港元，下午班每月7,450港元。這是校方頁列明的2026/27課程費用，報名前仍須核實註冊費、假期安排、膳食、校車及其他收費。", period: "2026/27收費頁", sourceUrl: "https://guidepostmontessori.hk/schedules-and-fees/" },
  ] }]),
];
