import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
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

/** School-specific additions for ten further registered kindergarten profiles. */
export const KINDERGARTEN_BATCH_24: PilotSchool[] = [
  profile("158240", "教育局概覽：2026/27；校方課程及招生頁查核：2026-10", "保良局馮梁結紀念幼稚園的教育局資料按馬鞍山恆安邨校址配對。校方當屆招生頁另列全日班核定學額15名及申請考慮因素；這是全日班資料，不等於全園K1招生名額或現有空缺。", [
    { label: "教育局《學校位置及資料》", scope: "校號158240、馬鞍山恆安邨登記校址與學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：保良局馮梁結紀念幼稚園", scope: "校址0001的班制、授課語言、師生比例及年度學費資料；不代表現時空缺。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1582400001" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及校址註冊資料；每日更新資料不包括政府學校。", url: EDB_REGISTRY },
    { label: "保良局馮梁結紀念幼稚園：2026/27收生及全日班資料", scope: "全日班核定學額、上課時間、校方申請考慮及註冊安排。", url: "https://www.plkkgs.edu.hk/plkflkkg/hk/custom/custom_page/47" },
    { label: "保良局馮梁結紀念幼稚園：課程特色", scope: "校方課程自述、探究式活動、社區學習及家校活動。", url: "https://www.plkkgs.edu.hk/plkflkkg/hk/about/41" },
    { label: "保良局屬下幼稚園：校址名錄", scope: "保良局名錄所列學校名稱、地址及聯絡資料。", url: "https://www.plkkgs.edu.hk/hk" },
  ], [{ title: "探究式學習與全日照顧安排", featured: true, note: "課程與招生安排為校方公開資料；年度名額及甄選原則不代表取錄保證。", details: [
    { label: "以多元活動和探究學習帶出生活經驗", value: "校方稱課程配合幼兒身心發展，以兒童為主導，透過多元活動和探究式學習鼓勵思考、討論與參與，亦安排校外參觀及社區活動。這種描述適合轉化成校訪問題：活動後孩子有沒有機會表達觀察，教師如何把經驗連回語文、數概念或生活習慣？", sourceUrl: "https://www.plkkgs.edu.hk/plkflkkg/hk/about/41" },
    { label: "全日班的照顧需要列入甄選考慮", value: "校方2026/27頁列全日班核定學額15名，並稱會按家庭照顧需要等因素審視申請；全日班上課時間為08:45至16:30，校方表示沒有延展服務。這些資料只涉及該年度全日班安排，不能解讀為半日K1總收生數或目前仍有空位。", period: "2026/27學年", sourceUrl: "https://www.plkkgs.edu.hk/plkflkkg/hk/custom/custom_page/47" },
    { label: "非華語家庭可查詢傳譯支援", value: "學校另列有需要家庭可查詢傳譯服務。公開頁沒有說明所有語言、預約期限或服務頻率，家長宜在報名前直接確認。", sourceUrl: "https://www.plkkgs.edu.hk/plkflkkg/hk/custom/custom_page/48" },
  ] }]),

  profile("600601", "教育局概覽：2026/27；弘立幼稚園課程頁查核：2026-10", "弘立幼稚園以教育局校號600601及校址0002配對，地址為堅尼地城卑路乍街97號地下G01及1樓101號舖。教育局位置資料列上午、下午時段；校方另稱設半日及延展課程，實際當屆服務與費用應看校方最新安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號600601、校址0002、地址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：弘立幼稚園", scope: "校址0002的班制、授課語言、師生比例及年度資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6006010002" },
    { label: "教育局《學校基本註冊資料》", scope: "弘立幼稚園的學校及校址註冊資料。", url: EDB_REGISTRY },
    { label: "弘立幼稚園：課程與學習計劃", scope: "八德一智、沉浸式雙語比例、課程方式、評估及家長報告。", url: "https://preschool.isf.edu.hk/en/program/" },
    { label: "弘立幼稚園：學校首頁", scope: "學校聯絡及最新招生資訊入口。", url: "https://preschool.isf.edu.hk/en/" },
  ], [{ title: "普通話主導的雙語沉浸與探究課程", featured: true, note: "語言比例及課程內容為校方自述；並非獨立成效評估。", details: [
    { label: "校方公開列出普通話70%、英語30%", value: "弘立幼稚園課程頁把普通話（使用繁體字）列為70%、英語列為30%的沉浸式雙語模式。這是本批學校中少數直接公布語言比例的校方；以英語為主要家庭語言的家長，應在校訪時確認孩子初入學時的語言支援和適應安排。", sourceUrl: "https://preschool.isf.edu.hk/en/program/" },
    { label: "課程以概念、體驗和探究組織", value: "校方稱課程以「八德一智」為價值框架，採概念導向、體驗式及探究學習，並融合六個學習範疇。這表示家庭可重點了解單元如何延續數週、幼兒如何提出問題和回顧想法，而不只看活動數量。", sourceUrl: "https://preschool.isf.edu.hk/en/program/" },
    { label: "以作品集、報告和家長會呈現進度", value: "校方列出作品集、學習報告及家長教師會面作為進度溝通方式。家長可詢問回饋頻率，以及如何從作品集看見孩子的語言與概念發展；公開資料沒有呈列個別幼兒的成效數據。", sourceUrl: "https://preschool.isf.edu.hk/en/program/" },
  ] }]),

  profile("532550", "教育局概覽：2025/26；位置及註冊資料：2026-09/10；校方資料查核：2026-10", "智樂幼稚園以教育局校號532550、校址0001配對，現行登記地址為深水埗南昌街72號兆昌大廈地下及一樓舖位。教育局2025/26概覽列6間註冊課室及8名校長與教學人員（人數截至2024年9月）；校方網站另列大南街221號地下，但2026年教育局位置及註冊資料未列為獨立校址，本頁不把該地址當作現行登記校址或混合兩處數據。", [
    { label: "教育局《學校位置及資料》", scope: "校號532550、深水埗登記校址、學校類別及班制時段。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2025/26》：智樂幼稚園（校址0001）", scope: "非牟利類別、註冊課室數、校長及教學人員數；人員數據截至2024年9月。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=shamshuipo&lang=en&otherkeywords=&schid=6398&schoolname=&schoolno=&voucher=" },
    { label: "教育局《學校基本註冊資料》", scope: "校號532550及2026年10月配對到的校址0001登記資料。", url: EDB_REGISTRY },
    { label: "智樂幼稚園：辦學宗旨及學校資訊", scope: "校方所列遊戲學習理念，以及南昌街校址各舖位資料。", url: "https://www.chelok.edu.hk/" },
    { label: "智樂幼稚園：收生簡介", scope: "校方招生頁入口；當屆名額與程序以最新公告為準。", url: "https://www.chelok.edu.hk/收生簡介/" },
  ], [{ title: "遊戲學習與校址空間", featured: true, note: "教育局詳頁為2025/26學年；不要把2024年9月人員數視作現況，也不要把校方網站另列地址當作EDB目前的獨立登記校址。", details: [
    { label: "校方把遊戲列為主要學習途徑", value: "校方辦學宗旨稱會引導兒童從遊戲中學習，並希望孩子在愛與尊重的環境中成長。家長可在參觀時看教師如何設計遊戲、介入同伴互動，以及孩子是否有自由選擇和收拾材料的機會；校方理念本身不等同外部教學評估。", sourceUrl: "https://www.chelok.edu.hk/" },
    { label: "2025/26概覽提供舊年度校舍和人手底數", value: "教育局2025/26概覽列校址0001有6間註冊課室、校長及教學人員共8名（截至2024年9月），並列有戶外遊樂場。這些是指定校址的歷史資料，不能代表2026/27實際在讀人數、各級班額或教師配置。", period: "概覽：2025/26；人員數據截至2024-09", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?category=&ctype=&district=shamshuipo&lang=en&otherkeywords=&schid=6398&schoolname=&schoolno=&voucher=" },
    { label: "大南街221號的校方地址需另向學校核實", value: "校方網站的學校資訊另列深水埗大南街221號地下；教育局2026年位置名錄及註冊資料本次只配對到南昌街72號校址0001。使用接送、全日班或申請資料前，宜問校方此地址目前用途及是否屬本屆實際上課地點。", sourceUrl: "https://www.chelok.edu.hk/" },
    { label: "2026/27費用與最新班額仍待當屆文件", value: "本次未找到可配對的2026/27概覽詳頁。報名或比較全日班前，應向學校索取當屆收費表、班制和各級名額；不以歷年註冊課室數推算招生人數。", sourceUrl: "https://www.chelok.edu.hk/收生簡介/" },
  ] }]),

  profile("542199", "教育局概覽：2026/27；校方課程與班制頁查核：2026-10", "欣苗幼稚園位於筲箕灣愛蝶灣第三座地下。教育局概覽列粵語授課及上午、下午、全日班；校方課程頁另列每日英語活動及每週兩天普通話活動，但該頁未標學年，語言課時與服務延長至18:00等安排須向學校確認是否仍適用。", [
    { label: "教育局《學校位置及資料》", scope: "校號542199、筲箕灣愛蝶灣校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：欣苗幼稚園", scope: "校址0001班制、授課語言、師生比例及年度學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5421990001" },
    { label: "欣苗幼稚園：校長的話", scope: "校方對多元背景、做中學和校外活動的理念自述；頁面未標學年。", url: "https://www.springview.edu.hk/blank-8" },
    { label: "欣苗幼稚園：班級編制及收費", scope: "校方所列班制、時間、語言和收費；頁面版權標示2021–22，不能視作現行收費。", url: "https://www.springview.edu.hk/blank-18" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及校址註冊資料。", url: EDB_REGISTRY },
  ], [{ title: "做中學與三語接觸", featured: true, note: "教育局概覽支持粵語授課；校方較細的語言活動安排來自未標學年的網頁，需再核對當屆。", details: [
    { label: "校方以參與經驗帶動理解與回顧", value: "校長介紹指出，孩子透過參與、感受和理解，再重組經驗來鞏固學習，並安排校內及校外活動。家長可詢問參觀或比賽之後是否有分享、繪畫或故事整理，判斷經驗如何轉化為語言和思考，而非只看活動清單。", sourceUrl: "https://www.springview.edu.hk/blank-8" },
    { label: "粵語為主，另列英語及普通話活動", value: "教育局2026/27概覽把授課語言列為粵語；校方班制頁另稱每天有英語活動、每週兩天普通話活動。由於校方頁面未標明適用學年，活動頻率僅作待核線索，不代表2026/27班級課表或英語授課比例。", period: "教育局概覽：2026/27；校方頁面學年未標示", sourceUrl: "https://www.springview.edu.hk/blank-18" },
    { label: "全日與延長照顧要查當屆時間", value: "校方頁列全日班至16:30，並寫有按需要可延至18:00；但該頁版權為2021–22。需要長時間照顧的家庭應直接確認本學年是否仍提供、名額、費用及申請方法。", period: "校方頁面版權：2021–22；現況待核", sourceUrl: "https://www.springview.edu.hk/blank-18" },
  ] }]),

  profile("324809", "教育局概覽：2026/27；校方課程頁查核：2026-10", "中華基督教會基華幼稚園位於觀塘啟業邨啟寧樓地下。校方課程頁介紹兒童本位、區角遊戲、「聲情教學」與生命教育，並列英語及普通話教師；公開頁沒有各級語言課時。", [
    { label: "教育局《學校位置及資料》", scope: "校號324809、啟業邨校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：中華基督教會基華幼稚園", scope: "校址0001班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3248090001" },
    { label: "教育局《學校基本註冊資料》", scope: "校號及啟業邨校址登記資料。", url: EDB_REGISTRY },
    { label: "中華基督教會基華幼稚園：課程特色", scope: "聲情教學、區角遊戲、綜合識字、生命教育及語言教師安排。", url: "https://kwk.ccc.edu.hk/programs/" },
    { label: "中華基督教會基華幼稚園：關於我們", scope: "辦學團體、創校年份及校舍設施自述。", url: "https://kwk.ccc.edu.hk/about-overview/" },
  ], [{ title: "聲情教學、區角探索與生命教育", featured: true, note: "教學特色及語言教師安排均為校方自述；未據此推斷實際成果或語言比重。", details: [
    { label: "以「聲情教學」增加互動與同儕協作", value: "校方稱透過聲情教學增加師生互動和協作，並以讚賞文化支持幼兒參與。家長可以觀課時留意教師是否讓不同表達能力的孩子都有回應機會，讚賞是否具體指出孩子做了甚麼。", sourceUrl: "https://kwk.ccc.edu.hk/programs/" },
    { label: "區角遊戲讓孩子在活動中使用材料和生活經驗", value: "課程頁介紹班本區角遊戲，讓幼兒自由探索物料，並把觀察、思考、解難及表達放進活動。對重視自主探索的家庭，值得進一步了解教師如何設定區角任務、輪換材料，以及如何觀察孩子的學習。", sourceUrl: "https://kwk.ccc.edu.hk/programs/" },
    { label: "英語、普通話由專科教師參與，但課時未公開", value: "校方列有英語及普通話教師，並把生命教育和品格培養納入課程；頁面未公布兩種語言每週課時或日常授課語言比例。家長若追求特定語言強度，應索取當屆時間表確認。", sourceUrl: "https://kwk.ccc.edu.hk/programs/" },
  ] }]),

  profile("157309", "教育局概覽：2026/27；校方課程與語言頁查核：2026-10", "東華三院洪王家琪幼稚園位於大埔大元邨泰德樓。校方以繪本、建構及發現式學習組織課程，另列英語和普通話活動；校方提及全英語及全普通話情境，但沒有提供課時，不能推定兩種語言是全日主要授課語言。", [
    { label: "教育局《學校位置及資料》", scope: "校號157309、大埔大元邨校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：東華三院洪王家琪幼稚園", scope: "校址0001班制、授課語言、師生比例及年度學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1573090001" },
    { label: "教育局《學校基本註冊資料》", scope: "校號與大埔大元邨登記校址資料。", url: EDB_REGISTRY },
    { label: "東華三院洪王家琪幼稚園：學習特色", scope: "繪本教學、建構學習、發現式學習、做中學和家校合作的校方說明。", url: "https://www.twghhwkgkg.edu.hk/?p=382" },
    { label: "東華三院洪王家琪幼稚園：兩文三語", scope: "外籍英語教師、普通話教師和語文活動安排；公開頁未列課時。", url: "https://www.twghhwkgkg.edu.hk/兩文三語/" },
  ], [{ title: "繪本探究與兩文三語接觸", featured: true, note: "以下為東華三院及校方課程自述；未有逐級課時或獨立學習成效數據。", details: [
    { label: "繪本作為統整經驗的入口", value: "校方引用東華三院幼兒教育方向，介紹以繪本統整幼兒學習經驗，並透過建構情境、發現式學習和「做中學」發展課程。家長可問學校如何從故事延伸至探索、討論和孩子自己的表達，並了解不同年級的活動例子。", sourceUrl: "https://www.twghhwkgkg.edu.hk/?p=382" },
    { label: "英文和普通話各有專科教師活動", value: "校方稱安排以英語及普通話為母語的教師，透過遊戲、兒歌和故事與幼兒互動；另列全英語及全普通話的學習情境。這些描述不等於全日沉浸或課時比例，家庭應索取班級時間表核實頻率。", sourceUrl: "https://www.twghhwkgkg.edu.hk/兩文三語/" },
    { label: "校方提到課室本位和個別需要", value: "課程介紹稱會採用校本及課室本位策略，按幼兒個別需要發展課程。對較慢熱或語言背景不同的孩子，可在校訪時具體詢問教師如何觀察、調整活動和向家長回饋。", sourceUrl: "https://www.twghhwkgkg.edu.hk/?p=382" },
  ] }]),

  profile("324248", "教育局概覽：2026/27；校方課程頁查核：2026-10", "官塘浸信會幼稚園位於觀塘功樂道83號地下及4至5樓。教育局概覽列粵語授課和半日／全日班；校方課程介紹活動教學、生命教育及英語、普通話專科教師，未公布逐級語言課時。", [
    { label: "教育局《學校位置及資料》", scope: "校號324248、觀塘功樂道校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：官塘浸信會幼稚園", scope: "校址0001班制、授課語言、師生比例及年度學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3242480001" },
    { label: "教育局《學校基本註冊資料》", scope: "校號與功樂道校址註冊資料。", url: EDB_REGISTRY },
    { label: "官塘浸信會幼稚園：課程特色", scope: "活動教學、道德教育、語文、體能、社交情意及靈育的校方說明。", url: "https://www.ktbckg.edu.hk/?lang=en&page_id=80" },
    { label: "官塘浸信會幼稚園：生命教育", scope: "故事、思考討論及實踐如何連結接納和尊重的校方說明。", url: "https://www.ktbckg.edu.hk/?lang=zh&page_id=198" },
  ], [{ title: "活動教學、生命教育與語言接觸", featured: true, note: "課程與專科教師安排為校方自述；招生資料按年度變動，不在此沿用舊屆日期或名額。", details: [
    { label: "透過遊戲、探索和戶外觀察組織活動教學", value: "校方課程頁介紹以遊戲、探索、討論、戶外觀察、參觀和親子活動引發好奇與溝通。若孩子需要較明確的課堂結構，家長可在訪校時觀察活動由自由探索轉入集體整理的過程。", sourceUrl: "https://www.ktbckg.edu.hk/?lang=en&page_id=80" },
    { label: "生命教育以故事帶出討論和生活實踐", value: "校方稱透過故事、思考、討論和實踐，讓幼兒認識自己的獨特性並學習接納、愛惜和尊重自己與他人。家庭可詢問老師如何把價值教育延伸到同伴衝突或日常常規，而不只停留在主題活動。", sourceUrl: "https://www.ktbckg.edu.hk/?lang=zh&page_id=198" },
    { label: "校方列英語及普通話專科教師", value: "課程介紹稱安排外籍英語教師和普通話專科教師，透過遊戲和歌曲引起幼兒興趣；公開資料未列每級每週課時，也未支持英語或普通話為主的結論。", sourceUrl: "https://www.ktbckg.edu.hk/?lang=en&page_id=80" },
  ] }]),

  profile("159204", "教育局概覽：2026/27；校方辦學及課程資料查核：2026-10", "保良局方王換娣幼稚園位於將軍澳厚德邨TKO Gateway東翼。教育局概覽列上午及下午班；校方課程以兒童為主導，兼有探究式活動、品德健康教育和兩文三語安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號159204、將軍澳厚德邨校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：保良局方王換娣幼稚園", scope: "校址0001班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1592040001" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及將軍澳校址註冊資料。", url: EDB_REGISTRY },
    { label: "保良局方王換娣幼稚園：辦學理念與課程", scope: "兒童本位、探究式學習、品德健康教育、校外參觀與語言方向。", url: "https://www.plkkgs.edu.hk/plkfwwtkg/hk/about/25" },
    { label: "保良局屬下幼稚園：校址名錄", scope: "學校名稱、TKO Gateway校址與聯絡資料。", url: "https://www.plkkgs.edu.hk/hk" },
  ], [{ title: "探究活動、品德健康與兩文三語", featured: true, note: "課程定位來自學校自述；校外活動及語文安排不等同固定名額或特定課時。", details: [
    { label: "以兒童為主導，透過探究鼓勵主動思考", value: "校方稱課程配合兒童身心發展，以兒童為主導，透過多元及探究式活動讓幼兒思考、討論和參與。對重視主動表達的家庭，可追問不同年級如何由遊戲和觀察推進到描述、比較及解難。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwwtkg/hk/about/25" },
    { label: "社區參觀把課堂延伸到真實環境", value: "校方介紹會安排校外參觀和社區活動，讓幼兒親身觀察周圍環境。這是學習機會而非每級固定的活動保證；家長可核對當屆課程表、頻率、交通安排和是否另收費。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwwtkg/hk/about/25" },
    { label: "兩文三語是方向，公開頁未列課時比例", value: "校方把提升普通話及英語能力列入課程特色，但沒有公開各級課時和日常主導語言比例。以語言環境作重要選校條件的家庭，宜直接索取班級時間表確認。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwwtkg/hk/about/25" },
  ] }]),

  profile("324833", "教育局概覽：2026/27；校方理念及活動頁查核：2026-10", "天主教甘霖幼稚園位於黃大仙彩雲邨甘霖樓地下。校方資料稱創立於1982年、由香港天主教教區主辦，並以天主教核心價值和體驗活動作辦學內容；這些是校方定位，不是獨立評級。", [
    { label: "教育局《學校位置及資料》", scope: "校號324833、彩雲邨校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：天主教甘霖幼稚園", scope: "校址0001班制、授課語言、師生比例及年度學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3248330001" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及彩雲邨校址註冊資料。", url: EDB_REGISTRY },
    { label: "天主教甘霖幼稚園：學校資料與核心價值", scope: "創校年份、辦學團體、校訓及天主教核心價值。", url: "https://kamlamkg.edu.hk/zh-hant/about_us/general_information/" },
    { label: "天主教甘霖幼稚園：教師團隊", scope: "校方公布的英語及普通話教師姓名／職務；不代表逐級課時。", url: "https://kamlamkg.edu.hk/zh-hant/about_us/our_professional_team/" },
    { label: "天主教甘霖幼稚園：2027/28招生及最新消息", scope: "當屆招生公告入口及2026年校園活動。", url: "https://kamlamkg.edu.hk/zh-hant/" },
  ], [{ title: "天主教價值教育與體驗式活動", featured: true, note: "宗教定位及課程理念為校方自述；不把活動相片當作教學成果或語言課時證據。", details: [
    { label: "校方以尊重、愛德和生命價值界定辦學方向", value: "學校資料稱創立於1982年、由香港天主教教區主辦，並列出真理、正義、愛德、生命和家庭等核心價值。重視宗教教育的家庭可進一步了解祈禱、宗教故事及價值教育在普通課堂中的實際安排。", sourceUrl: "https://kamlamkg.edu.hk/zh-hant/about_us/general_information/" },
    { label: "近期活動展示體驗學習和生活應用", value: "學校2026年消息包括課室外體驗式學習、中文文化校本活動及K1超市購物活動。超市活動把認識錢幣連到購物經驗，是具體的生活學習例子；仍不能據此概括全年的課程比例或每名幼兒的學習成效。", period: "校方消息：2026年", sourceUrl: "https://kamlamkg.edu.hk/zh-hant/" },
    { label: "校方名冊列英語和普通話教師", value: "教師團隊頁列有英語老師及普通話老師。公開頁沒有交代各級每週課時、教師駐班時段或兩種語言是否用於其他學習範疇；語言輸入強度須按當屆課表核實。", sourceUrl: "https://kamlamkg.edu.hk/zh-hant/about_us/our_professional_team/" },
  ] }]),

  profile("325317", "教育局概覽：2026/27；校方課程頁查核：2026-10", "樂善堂顧李覺鮮幼稚園位於黃大仙竹園南邨雅園樓地下。校方2026/27招生資訊列出當屆招生入口，並介紹參照幼稚園教育課程指引的校本課程；本頁不把招生貼文中活動日期當成長期安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號325317、竹園南邨校址、電話及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：樂善堂顧李覺鮮幼稚園", scope: "校址0001班制、授課語言、師生比例及年度學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3253170001" },
    { label: "教育局《學校基本註冊資料》", scope: "學校及竹園南邨登記校址資料。", url: EDB_REGISTRY },
    { label: "樂善堂顧李覺鮮幼稚園：學校及課程資料", scope: "校方辦學宗旨、課程指引、校本課程、語言及特色活動自述。", url: "https://www.loksintongkg.edu.hk/lst_kuleekwoksin/tc/" },
    { label: "樂善堂顧李覺鮮幼稚園：校方首頁", scope: "2026/27招生公告與近期學校消息入口。", url: "https://lstklks.loksintongkg.edu.hk/" },
  ], [{ title: "遊戲探索、校本課程與家校核對", featured: true, note: "內容以校方公開課程及招生資訊為準；校方理念不等於外部成效評估。", details: [
    { label: "校本課程參照幼稚園教育課程指引", value: "校方稱以教育局《幼稚園教育課程指引（2017）》為藍本，並按幼兒發展安排學習活動。家庭可要求了解K1至K3如何由生活經驗建立語文、數概念和自理能力，確認各級銜接節奏。", sourceUrl: "https://www.loksintongkg.edu.hk/lst_kuleekwoksin/tc/" },
    { label: "樂善堂辦學脈絡中的品格與全人發展", value: "校方把德、智、體、群、美及良好生活習慣列為培育方向，並在2026/27招生資訊中持續更新校園活動。這些資料可幫助家長理解辦學取向，但不構成學習成果數據或升小去向證明。", period: "校方招生資訊：2026/27", sourceUrl: "https://lstklks.loksintongkg.edu.hk/" },
    { label: "當屆班制與費用以教育局概覽為準", value: "校方網站的舊內容可能保留歷年資訊；本頁班制、授課語言、師生比例及學費採教育局2026/27概覽的指定校址資料。報名前仍需查看校方最新收費表和申請指引。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3253170001" },
  ] }]),
];
