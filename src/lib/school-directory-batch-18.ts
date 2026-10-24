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

/** Official-source profile supplements reviewed in kindergarten batch 18. */
export const KINDERGARTEN_BATCH_18: PilotSchool[] = [
  profile("324930", "教育局概覽：2026/27；迦南課程頁查核：2026-10", "學校身份及地址按教育局學校編號324930配對；教學特色來自迦南集團課程頁，屬校方整體課程說明，未把不同校址的班額、課表或招生安排混為一談。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號324930、九龍城道校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：九龍迦南中英文幼稚園", scope: "學校編號324930的校址、當屆班制及概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3249300001" },
    { label: "迦南幼稚園：幼稚園課程", scope: "迦南課程理念、語文活動、學習模式、評估和家校聯繫；屬集團層級公開說明。", url: "https://www.cannan.edu.hk/kindergarten" },
  ], [{ title: "繪本、遊戲與主動學習", featured: true, note: "教育局資料對應九龍迦南中英文幼稚園；課程頁介紹迦南整體做法，實際班級安排應向本校址確認。", details: [
    { label: "從做中學，讓主題連結生活", value: "校方稱課程以兒童為本，綜合六大學習範疇，透過生活主題、專題研習、多感官操作和興趣角，讓幼兒計劃、動手、回顧。這類設計較重視參與和表達；家長可問九龍城校址各級如何安排主題研習。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "英語拼音與普通話均有專門活動", value: "課程頁說明英語採原音拼合法，由專任外籍教師教授；普通話由專任教師設計教材，透過遊戲和生活用語接觸。網站沒有公布每週課時比例，因此不能據此判斷全日主要授課語言。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "評估以觀察及學習檔案為主", value: "校方表示會持續觀察並記錄幼兒學習，每學年作兩次總結評估，亦把活動紀錄納入學習歷程檔案。家長可查詢家長會或個別面談頻率，以及如何取得孩子的具體學習回饋。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
  ] }]),

  profile("627178", "教育局概覽：2026/27；校方馬鞍山校舍頁查核：2026-10", "馬鞍山校舍頁介紹戶外植物區、小菜園、魚菜共生和感官探索；學費表仍屬2021/22，故不列入現況。校方頁面的班級和活動資訊不等於當屆可用學額。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號627178、馬鞍山中心校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：啟思馬鞍山", scope: "馬鞍山校址當屆班制與教育局概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6271780001" },
    { label: "啟思幼稚園：馬鞍山校舍", scope: "本校舍環境、設施、年齡組別和上課時段；校方列出的收費為2021/22歷史資料。", url: "https://creative.edu.hk/ckmos/" },
    { label: "啟思幼稚園：課程簡介", scope: "集團課程所述的母語、英語、普通話及外語活動，以及不同年級的學習方式。", url: "https://creative.edu.hk/curriculum/" },
  ], [{ title: "自然探索與藝術表達", featured: true, note: "學校環境與活動安排為校方自述；校舍頁列出的學費年份較舊，不作當前費用參考。", details: [
    { label: "校園把自然觀察放進日常環境", value: "馬鞍山校舍介紹室外植物區、小菜園和魚菜共生設施，並以觸感牆、音樂互動等安排作感官探索。對喜歡動手和觀察的孩子，這些環境提供了可延伸的題材；家長宜確認各級使用頻率及戶外活動安排。", sourceUrl: "https://creative.edu.hk/ckmos/" },
    { label: "藝術活動強調創作和多元媒介", value: "校方列名畫欣賞、自由創作藝術廊、音樂律動、戲劇和舞蹈，並以多元文化活動認識不同地方。這些是校方公布的課程機會，並非每名幼兒參與比賽或每週固定接觸所有項目的保證。", sourceUrl: "https://creative.edu.hk/ckmos/" },
    { label: "語言活動與主要授課語言要分開看", value: "啟思集團課程頁分別介紹母語教學、英語活動、K1起普通話接觸和部分外語課程；這些文字未提供馬鞍山校舍各語言的時間比例。若家庭重視英語或普通話環境，應索取當屆班級時間表。", sourceUrl: "https://creative.edu.hk/curriculum/" },
  ] }]),

  profile("323055", "教育局概覽：2026/27；校方觀塘分校及2027/28招生頁查核：2026-10", "本頁只對應觀塘分校坪石邨金石樓校址。校方招生頁同時列將軍澳和觀塘分校；招生條件按觀塘分校聯絡方式理解，課程頁則是校方共同課程介紹。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號323055、觀塘分校註冊校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：歡樂創意觀塘分校", scope: "觀塘校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3230550001" },
    { label: "歡樂創意幼稚園：課程特色與教學目標", scope: "校方所述兒童本位、遊戲、主題活動和繪本閱讀方向。", url: "https://www.funcreative.edu.hk/en/our-school/curriculum/" },
    { label: "歡樂創意幼稚園：2027/28收生簡介", scope: "兩個分校的當屆申請資訊、面見支援和家庭優先條件；須按分校確認。", url: "https://www.funcreative.edu.hk/收生事項/收生簡介/" },
    { label: "歡樂創意幼稚園：觀塘分校聯絡資料", scope: "觀塘分校地址、電話和電郵。", url: "https://www.funcreative.edu.hk/聯絡我們/觀塘分校/" },
  ], [{ title: "遊戲探索與多元共融", featured: true, note: "校方網站分別列將軍澳和觀塘分校；此頁只呈現觀塘分校，申請與服務細節應直接向該校址確認。", details: [
    { label: "以遊戲、生活經驗和主題引導探索", value: "校方課程頁以兒童本位和「從遊戲中學習」為方向，透過主題及自訂活動讓孩子操作教材、探索環境和表達想法。這種描述可作課程取向參考；觀塘班級每日如何實施，仍要以校舍參觀和當屆課程資料核實。", sourceUrl: "https://www.funcreative.edu.hk/en/our-school/curriculum/" },
    { label: "提供英文資料及面見溝通支援", value: "2027/28收生頁列出可為非華語申請人安排翻譯／傳譯，也提及英文通告和評估資料。若家庭需要特定語言協助，應在遞交申請前聯絡觀塘分校確認可提供的語種和安排。", period: "2027/28招生資料", sourceUrl: "https://www.funcreative.edu.hk/收生事項/收生簡介/" },
    { label: "全日班取錄會考慮家庭需要", value: "校方當屆招生說明把全日班服務需要列為考慮因素之一，並指出優先考慮不代表保證取錄。這是特定年度的收生政策；家庭應按觀塘校舍的當屆學額和文件要求申請。", period: "2027/28招生資料", sourceUrl: "https://www.funcreative.edu.hk/收生事項/收生簡介/" },
  ] }]),

  profile("325619", "教育局概覽：2026/27；校方課程頁查核：2026-10", "校方公開繪本、每日英語、每週普通話及JELIC腦思維活動等課程說明；這些是校方自述的教學設計，不是獨立成效評估。舊招生PDF未用來推斷本年度學額或收生機會。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號325619、翠灣邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：勵志會陳鄭潔雲幼稚園", scope: "本校址當屆概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3256190001" },
    { label: "勵志會陳鄭潔雲幼稚園：課程結構與設計", scope: "繪本教學、遊戲、英語及普通話活動、認知發展和家長參與。", url: "https://www.tekg.edu.hk/structure-and-design/?lang=en" },
    { label: "勵志會陳鄭潔雲幼稚園：課程特色", scope: "自主學習、繪本、5G英語課程及腦思維學習的校方介紹。", url: "https://www.tekg.edu.hk/" },
  ], [{ title: "繪本閱讀與腦思維活動", featured: true, note: "英語及普通話頻率按校方公開課程說明呈現；未有課時總表，不推算語言比例。", details: [
    { label: "繪本串連六大學習範疇", value: "校方把繪本教學列為課程重點，並連結德育、認知與語言、健康、群性、藝術和幼兒數學。家長可問孩子是否有機會重述故事、延伸創作，以及教師如何記錄閱讀理解，而不只看識字量。", sourceUrl: "https://www.tekg.edu.hk/structure-and-design/?lang=en" },
    { label: "英語每日、普通話每週有安排說明", value: "校方課程頁稱由外籍英語教師每日授課，並由合資格教師每週教授普通話；亦設個別或小組活動。公開頁沒有列每節時長和班級差異，不能據此換算成全天語言比例。", sourceUrl: "https://www.tekg.edu.hk/structure-and-design/?lang=en" },
    { label: "JELIC以遊戲材料練習思考", value: "學校介紹JELIC多元智能活動、棋類遊戲和個別／小組探索，重點是自我學習、邏輯思考和創意。這是校方描述的課程目的；家長可查詢每級活動頻率及教師如何按幼兒能力調整難度。", sourceUrl: "https://www.tekg.edu.hk/cognitive-development/?lang=en" },
  ] }]),

  profile("325767", "教育局概覽：2026/27；校方課程頁查核：2026-10", "校方課程頁介紹全人發展、繪本融入藝術和戲劇，以及外籍英語教師和普通話專科教師；收費和班額採用的頁面仍有較早年度資料，未列作現行數據。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號325767、皇后山邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：東華三院文頴怡幼稚園", scope: "皇后山校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3257670001" },
    { label: "東華三院文頴怡幼稚園：課程及教學", scope: "全人發展、正向學習、解難、繪本、藝術和戲劇教學。", url: "https://www.twghsgmk.edu.hk/" },
    { label: "東華三院文頴怡幼稚園：2026/27招生資料", scope: "該年度班級及非華語兒童面見支援；頁中部分學費資料屬2024/25，不能當作現行收費。", url: "https://www.twghsgmk.edu.hk/en/admission/?lang=en" },
  ], [{ title: "繪本教學與兩文三語", featured: true, note: "校方招生頁含不同年度資料；本頁只採用可辨認年度的安排，不沿用舊費用。", details: [
    { label: "繪本延伸藝術與戲劇活動", value: "校方表示以繪本設計多元活動，加入藝術和戲劇元素，並希望促進語文及共通能力。這提供了理解課堂設計的線索；家長可問每週繪本活動如何銜接角色扮演、創作和幼兒口語表達。", sourceUrl: "https://www.twghsgmk.edu.hk/" },
    { label: "英語及普通話由專科教師支援", value: "學校稱以母語教授為基礎，另設外籍英語教師及普通話專科教師。公開頁沒有列每週時數或主要溝通語言，若家庭希望加強某一語言，應索取目標級別課表。", sourceUrl: "https://www.twghsgmk.edu.hk/" },
    { label: "非華語面見可安排翻譯協助", value: "校方招生資料說明，非華語兒童面見時有需要可安排傳譯／翻譯，亦可由懂中文的親友陪同。該頁其他班制和費用標示為2024/25，申請前要以當屆公告重新確認。", period: "2026/27招生頁；部分附帶數據為2024/25", sourceUrl: "https://www.twghsgmk.edu.hk/en/admission/?lang=en" },
  ] }]),

  profile("532533", "教育局概覽：2026/27；校方費用與班級資料：2026/27；招生資料：2027/28", "聖多默校方已公布2026/27班級、學費和雜費，也已發布2027/28 K1招生安排。免費只適用持有效註冊證的半日班；全日班仍有學費及膳食費。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號532533、青衣青綠街校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：天主教聖多默幼稚園", scope: "本校址當屆班制、授課語言和概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5325330001" },
    { label: "天主教聖多默幼稚園：學校簡介及收費", scope: "校園設施、2026/27班級、學費、書簿美勞費和膳食費。", url: "https://www.stthomas.edu.hk/chi/about-us/general-information" },
    { label: "天主教聖多默幼稚園：2027/28招生", scope: "當屆申請時間、面見安排、公布學額和收生準則。", url: "https://www.stthomas.edu.hk/admissions" },
  ], [{ title: "班制、費用與宗教教育", featured: true, note: "學費、班級和附加費均標明2026/27；招生流程和K1學額只適用2027/28。", details: [
    { label: "半日與全日費用差異明確", value: "校方列2026/27持有效註冊證學童的半日班學費為零，全日班全年學費11,200元、分10期；另有書簿、美勞和膳食費。比較預算時需把全日服務和附加項目一併計算，不能只看半日資助後學費。", period: "2026/27學年", sourceUrl: "https://www.stthomas.edu.hk/chi/about-us/general-information" },
    { label: "2026/27開班情況不等於下一屆收生名額", value: "校方資料列該年度K1上午班1班、全日班1班，K2和K3亦分別列班數。班級編制說明校方當年運作，不代表2027/28每班學生人數或空缺；申請人數和錄取機會沒有在此公布。", period: "2026/27學年", sourceUrl: "https://www.stthomas.edu.hk/chi/about-us/general-information" },
    { label: "天主教信仰是校園生活的一部分", value: "校名與校方身份資料確認其天主教辦學背景；2027/28收生頁把已領洗天主教學生列為其中一項優先考慮因素，同時列出其他收生準則。家長如申請全日班，可一併確認校方對家庭需要的證明要求。", period: "2027/28招生資料", sourceUrl: "https://www.stthomas.edu.hk/admissions" },
  ] }]),

  profile("158623", "教育局概覽：2026/27；保良局校方課程及活動頁查核：2026-10", "本頁對應屯門菁田邨校址。校方資訊頁列校本課程、非華語支援和戶外體驗；活動紀錄跨不同年份，僅作活動例子，不推斷為每年固定項目。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號158623、菁田邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：保良局廖烈正幼稚園", scope: "菁田邨校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1586230001" },
    { label: "保良局廖烈正幼稚園：學校資訊", scope: "校本課程、非華語學童支援、兒童評估、家長支援和駐校社工入口。", url: "https://www.plkkgs.edu.hk/plktllckg/hk/info/82" },
    { label: "保良局廖烈正幼稚園：活動紀錄", scope: "校方公開的環保、戶外學習及校園活動例子。", url: "https://www.plkkgs.edu.hk/plktllckg/hk/activities" },
  ], [{ title: "校本課程與社區體驗", featured: true, note: "校方資訊頁列出服務入口；活動頁為跨年度紀錄，不代表每屆活動相同。", details: [
    { label: "家長可查閱校本課程與兒童評估安排", value: "校方資訊頁分列校本課程、兒童評估與檔案、非華語學童支援、家長服務和駐校社工。對家長而言，這些頁面提供了了解孩子進展和支援渠道的入口；建議查詢評估回饋頻率及支援服務的申請方式。", sourceUrl: "https://www.plkkgs.edu.hk/plktllckg/hk/info/82" },
    { label: "戶外活動有助了解課程如何連結生活", value: "校方活動紀錄列有環保及戶外學習例子。活動相片能反映曾舉行的經驗，不能證明每級每年都有相同安排；參觀時可問活動如何接回課堂主題，以及孩子能否親自觀察和操作。", sourceUrl: "https://www.plkkgs.edu.hk/plktllckg/hk/activities" },
    { label: "非華語支援須問清適用對象", value: "校方網站設非華語學童支援入口，但公開摘要未交代每種支援的名額、語言或個別化程度。若家庭需要語言支援，應直接詢問菁田邨校舍服務內容及轉介流程。", sourceUrl: "https://www.plkkgs.edu.hk/plktllckg/hk/info/82" },
  ] }]),

  profile("319813", "教育局概覽：2026/27；校方課程與班級資料查核：2026-10", "聖馬太堂校方介紹主題及活動教學、遊戲學習，並列K1至K3上午班和全日班時間。網站部分招生PDF屬過往年度，未用作推斷本年度名額或費用。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號319813、荷李活道校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：聖馬太堂幼稚園", scope: "本校址當屆班制與概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3198130001" },
    { label: "聖馬太堂幼稚園：學校簡介與課程", scope: "辦學團體、啟發性活動教學、主題教學、分組和遊戲學習。", url: "https://stmattkg.edu.hk/" },
    { label: "聖馬太堂幼稚園：班級及上課時間", scope: "K1至K3班級及上午、全日班的上課時間。", url: "https://stmattkg.edu.hk/%E7%8F%AD%E7%B4%9A%E5%8F%8A%E4%B8%8A%E8%AA%B2%E6%99%82%E9%96%93/" },
  ], [{ title: "主題活動與遊戲學習", featured: true, note: "教學介紹為校方自述；網站公開的班級時間頁沒有標明最新招生學額，名額需向校方確認。", details: [
    { label: "透過實物和分組活動學習", value: "校方介紹以主題及活動教學為主，運用實物教具和益智玩具，讓幼兒在分組活動中學習思考、記憶、創造和判斷。這種模式重視操作過程，家長可觀察教師如何引導孩子分享做法，而非只看完成作品。", sourceUrl: "https://stmattkg.edu.hk/" },
    { label: "K1至K3有上午及全日班時間資料", value: "校方班級頁列K1至K3均有上午班和全日班，上午約8:45至中午，全日約8:45至下午4:30；下午班時間沒有列出。這是上課時段資訊，不等於當屆每級都尚有學額。", sourceUrl: "https://stmattkg.edu.hk/%E7%8F%AD%E7%B4%9A%E5%8F%8A%E4%B8%8A%E8%AA%B2%E6%99%82%E9%96%93/" },
    { label: "全人和德育是校方自述方向", value: "學校簡介稱重視幼兒全面發展及德育培養，並以啟發性活動教學奠定學習基礎。這是校方的辦學定位；家長可進一步了解日常生活常規、品德主題和家校溝通方式。", sourceUrl: "https://stmattkg.edu.hk/" },
  ] }]),

  profile("158593", "教育局概覽：2026/27；太平幼稚園課程頁查核：2026-10", "校方公開以故事教學、活動和主題研習為主的課程說明，並稱以持續觀察評估。頁面未提供最新學費及語言課時，本資料不作推算。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號158593、上水太平邨校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：太平幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585930001" },
    { label: "太平幼稚園：課程特色", scope: "兒童本位、方案和主題活動、故事教學、戶外觀察及持續評估。", url: "https://www.taiping.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
  ], [{ title: "故事教學與主動探索", featured: true, note: "課程和評估內容均為校方公開的教學說明；頁面未列語言課時及當屆費用。", details: [
    { label: "故事由聽說延伸至閱讀和書寫", value: "校方以故事教學作語文學習起點，再透過朗讀延伸至讀寫範疇，目標是提高幼兒興趣和語文發展。家長可詢問各級使用繪本的方式，以及書寫活動如何配合孩子年齡，而不是只看識字或抄寫量。", sourceUrl: "https://www.taiping.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "主題、方案和戶外觀察相互配合", value: "校方表示會採用活動教學、方案研習、主題活動、資料搜集、討論、戶外觀察和課外參觀，培養主動學習、合作和解難。這些是課程設計方向；家長可了解本學年各級主題及孩子實際參與形式。", sourceUrl: "https://www.taiping.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "學習評估採持續觀察記錄", value: "校方稱以持續觀察記錄幼兒學習成效。網站未說明書面報告頻率、家長面談節奏或語言政策；這幾項如影響家庭選擇，應向校方查問。", sourceUrl: "https://www.taiping.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
  ] }]),

  profile("159255", "教育局概覽：2026/27；校方課程及2027/28招生頁查核：2026-10", "校方介紹專題研習、基督教生命教育、外籍英語和普通話教師，並已發布2027/28 K1流程。全日班名額有限，校方列明家庭需要只屬優先考慮，不保證取錄。", [
    { label: "教育局《學校位置及資料》", scope: "學校編號159255、裕明苑校址及學校身份。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：將軍澳宣道幼稚園", scope: "本校址當屆概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1592550001" },
    { label: "將軍澳宣道幼稚園：課程模式", scope: "基督教教育、生命教育、專題研習和幼兒探索方式。", url: "https://www.cmatkokg.edu.hk/%E8%AA%B2%E7%A8%8B%E6%A8%A1%E5%BC%8F/" },
    { label: "將軍澳宣道幼稚園：2027/28報名方法", scope: "當屆申請、面見、收生優先條件、非華語面見支援和全日班家庭需要安排。", url: "https://www.cmatkokg.edu.hk/%E5%A0%B1%E5%90%8D%E6%96%B9%E6%B3%95/" },
    { label: "將軍澳宣道幼稚園：學生及家長支援", scope: "校方公布的到校學前康復服務和家庭支援入口。", url: "https://www.cmatkokg.edu.hk/%E5%AD%B8%E7%94%9F%E5%8F%8A%E5%AE%B6%E9%95%B7%E6%94%AF%E6%8F%B4/" },
  ], [{ title: "專題研習與生命教育", featured: true, note: "課程描述為校方自述；招生日期和優先條件只適用2027/28。", details: [
    { label: "專題由幼兒興趣和生活環境出發", value: "校方稱以幼兒興趣選題，透過觀察、搜集資料、討論、科學實驗和藝術創作推動專題研習。對喜歡動手探索的孩子，重點是能否提出問題並參與找答案；家長可詢問各級的研習例子和成果呈現方式。", sourceUrl: "https://www.cmatkokg.edu.hk/%E8%AA%B2%E7%A8%8B%E6%A8%A1%E5%BC%8F/" },
    { label: "宗教和生命教育融入校園活動", value: "校方課程頁列聖經故事、宗教週會、祈禱和角色扮演等活動，並把愛、尊重和互助列為培育方向。若家庭在意宗教教育的日常比重，可向校方了解活動安排及家庭參與方式。", sourceUrl: "https://www.cmatkokg.edu.hk/%E8%AA%B2%E7%A8%8B%E6%A8%A1%E5%BC%8F/" },
    { label: "2027/28全日班優先考慮家庭需要", value: "校方招生頁說明，全日班學位有限，家庭照顧需要會列入考慮，但優先考慮不等於保證取錄；面見可安排翻譯支援。這些條件只適用該屆申請，應按校方公告提交證明並確認時間表。", period: "2027/28招生", sourceUrl: "https://www.cmatkokg.edu.hk/%E5%A0%B1%E5%90%8D%E6%96%B9%E6%B3%95/" },
  ] }]),
];
