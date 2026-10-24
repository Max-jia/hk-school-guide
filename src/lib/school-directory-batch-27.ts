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
  overrides: Partial<PilotSchool> = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear, sourceNote, appendDirectoryDetails: true, sources, detailSections, ...overrides };
}

/** Kindergarten profile batch 27: ten unique registered schools, excluding international schools. */
export const KINDERGARTEN_BATCH_27: PilotSchool[] = [
  profile("624918", "教育局位置及註冊資料：2026-10；校方公告：2026-07", "啓基幼稚園於2026年7月正式成立，現收2026/27插班及2027/28新生。教育局登記資料列臨時註冊；教育局《幼稚園概覽2026/27》未能配對出可核實的校址年度數據，因此不列班額、學費或師生比例。", [
    { label: "教育局《學校位置及資料》", scope: "校號624918、九龍界限街校址及登記類別。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號624918及校址0001的臨時註冊狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "啓基幼稚園：關於啓基", scope: "2026年7月成立、校方辦學理念及校址聯絡資料。", url: "https://ccskg.edu.hk/en/" },
    { label: "啓基幼稚園：入學申請", scope: "校方列示的2026/27插班及2027/28新生申請安排。", url: "https://ccskg.edu.hk/en/join-us/" },
  ], [{ title: "愉快體驗與探索學習", featured: true, note: "學校於2026年新成立，公開的幼稚園年度數據尚少；此頁只列教育局登記資料及校方目前公布的定位，不以同址小學資料代替幼稚園數據。", details: [
    { label: "從認識自己開始探索世界", value: "校方以「從我開始探索世界」概括辦學方向，並表示希望提供愉快、體驗式的學習環境。這是新校的理念陳述；家長參觀時可進一步看課堂如何安排幼兒動手、提問和回顧。", sourceUrl: "https://ccskg.edu.hk/en/" },
    { label: "新校與申請年度", value: "校方公告幼稚園部於2026年7月成立，現接受2026/27插班及2027/28入學申請。教育局登記狀態為臨時註冊；截至查核日，未能從2026/27《幼稚園概覽》核實該校址的班制、PN、學費或師生比例，報名前應直接確認最新註冊和開班安排。", period: "校方公告：2026-07；教育局資料查核：2026-10-23", sourceUrl: EDB_REGISTRY },
  ] }], { website: "https://ccskg.edu.hk/" }),

  profile("520144", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；辦學團體資料及校方網站查核：2026-10", "青松裕雅幼稚園原為青松興東幼稚園，2023年遷至東涌裕雅苑。年度概覽只對應校址0002；過往課程文字只作2025/26學年校方申報資料，不推斷為現屆逐科時數。", [
    { label: "教育局《學校位置及資料》", scope: "校號520144及東涌裕雅苑校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號520144、校址0002及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0002", scope: "校址0002的班制、授課語言、師生比例及學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5201440002" },
    { label: "青松觀：青松裕雅幼稚園", scope: "遷校日期、創校年份、地址和辦學團體介紹。", url: "https://www.ccta.com.hk/004_education_kg.htm" },
    { label: "青松裕雅幼稚園：學校背景", scope: "校方背景頁及聯絡資料。", url: "https://www.ccynkg.edu.hk/background" },
    { label: "教育局《幼稚園概覽2025/26》：校址0002", scope: "校方於該年度提交的課程方向和家校合作說明；不代表逐項活動的現屆頻率。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5911" },
  ], [{ title: "兒童本位與自主探索", featured: true, note: "以下課程內容按校方及教育局概覽所列年份標示；兩文三語是學習方向，未有公開逐語言課時比例。", details: [
    { label: "以遊戲、體驗和探索組織學習", value: "2025/26概覽所載校方課程方向以幼兒興趣、能力和生活經驗為起點，並提到自由遊戲、自選區及探索活動。對家庭而言，這類安排重視幼兒主動選擇和操作；參觀時可問各級自由遊戲如何安排、教師如何觀察並跟進學習。", period: "2025/26學年校方申報資料", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5911" },
    { label: "家校參與是校方所述的課程一環", value: "概覽提到家長可參與教學活動、故事分享和親子種植，並列家長日、茶聚及觀課日等溝通方式。這些是校方公布的合作形式，不代表每個家庭都必須承擔相同程度的校內義工投入；可在報名前問清當屆安排。", period: "2025/26學年校方申報資料", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5911" },
    { label: "概覽數據限於東涌校址0002", value: "教育局2026/27概覽對應校址0002，列上午、下午及全日班、粵語授課及師生比例約1:11.1。概覽語言分類不表示英語或普通話的每日時數；半日班學費按該年度概覽理解。", period: "2026/27學年；校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5201440002" },
  ] }], { website: "https://www.ccynkg.edu.hk/" }),

  profile("150860", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方班級編制：2025/26", "大埔禮賢會幼稚園有汀角路正校（校址0002）及富蝶分校（校址0003）。概覽及班級編制按校址分開呈列；2025/26在讀人數不是收生學額或空缺。", [
    { label: "教育局《學校位置及資料》", scope: "校號150860及汀角路、富蝶邨兩個登記校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "兩個Location ID及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：富蝶校址0003", scope: "富蝶分校的年度班制、語言、師生比例及收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1508600003" },
    { label: "大埔禮賢會幼稚園：學校資料", scope: "2025/26兩校址按級別和班制公布的學生人數與班數。", url: "https://www.rcktp.edu.hk/?page_id=11676" },
    { label: "大埔禮賢會幼稚園：課程編排", scope: "校本課程如何連結幼兒發展和生活經驗。", url: "https://www.rcktp.edu.hk/?page_id=706" },
    { label: "大埔禮賢會幼稚園：家長及學生支援", scope: "到校學前康復、駐校社工及校方所述家長支援。", url: "https://www.rcktp.edu.hk/?page_id=738" },
  ], [{ title: "生活經驗、兩校址與支援", featured: true, note: "正校與富蝶分校各有Location ID；除明確標為學校層面的校方安排外，班制和年度數據不可互相套用。", details: [
    { label: "兩個校址的在讀人數分別公布", value: "校方2025/26班級編制表列汀角路正校201名、富蝶分校136名在讀學生。這是該學年學生總數，不是K1招生額、尚餘學位或每年固定收生量；該表亦分列年級及班制。", period: "2025/26學年；校方公布", sourceUrl: "https://www.rcktp.edu.hk/?page_id=11676" },
    { label: "課程把新內容連回生活經驗", value: "校方表示依幼稚園課程指引設計校本課程，按幼兒發展特點逐步認識新事物，並連結生活經驗。家長可觀察教師是否提供實物操作、討論和回顧，了解孩子能否從熟悉的情境過渡到新的概念。", sourceUrl: "https://www.rcktp.edu.hk/?page_id=706" },
    { label: "校方列出跨專業支援", value: "校方表示兩個校址參與到校學前康復及第一層支援服務，另有駐校社工、家長事工主任和心理輔導員。服務是否適用於個別幼兒、評估和輪候安排，需直接向校方確認。", sourceUrl: "https://www.rcktp.edu.hk/?page_id=738" },
    { label: "富蝶分校概覽只適用於校址0003", value: "教育局2026/27概覽校址0003列上午、下午及全日班、粵語授課及師生比例約1:8.1。正校的班制和比例應另看校址0002，不能用富蝶分校數據替代。", period: "2026/27學年；校址0003", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1508600003" },
  ] }], { website: "https://www.rcktp.edu.hk/" }),

  profile("133779", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方網站查核：2026-10", "神召第一幼稚園位於九龍城亞皆老街。教育局概覽列粵語授課；校方課程頁介紹基督教教育、蒙特梭利和主題活動，沒有提供英語或普通話逐週課時。", [
    { label: "教育局《學校位置及資料》", scope: "校號133779及九龍亞皆老街校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號133779、校址0001及註冊狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和年度學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1337790001" },
    { label: "神召第一幼稚園：課程簡介", scope: "蒙特梭利、基督教教育、主題教學及非華語支援的校方說明。", url: "https://faogkg.edu.hk/curriculum-tc/" },
    { label: "神召第一幼稚園：校長的話", scope: "校方辦學理念、按兒童發展安排教學的自述。", url: "https://faogkg.edu.hk/principles-message/" },
    { label: "神召第一幼稚園：最新消息", scope: "校方目前列出的招生年度；申請時限以最新公告為準。", url: "https://faogkg.edu.hk/" },
  ], [{ title: "蒙特梭利操作與主題學習", featured: true, note: "蒙特梭利和基督教課程是校方自述的設計方向，不代表每項教材每日使用或已證明的發展成果。", details: [
    { label: "由實物操作走向抽象概念", value: "校方介紹蒙特梭利生活技能、感官、語文、數學及文化教育，安排幼兒親手操作教具。家長可在參觀時觀察孩子是否能自行取用和整理材料，以及教師如何在需要時介入，而非只按教具數量判斷課程深度。", sourceUrl: "https://faogkg.edu.hk/curriculum-tc/" },
    { label: "主題活動和自由遊戲並行", value: "校方表示按教育局課程指引設計主題方案，並列自由遊戲、繪本、方案教學和多元文化活動。這提供不同參與方式；公開頁未列各活動的每週時數，應直接問當屆課程時間表。", sourceUrl: "https://faogkg.edu.hk/curriculum-tc/" },
    { label: "粵語概覽與非華語支援分開理解", value: "教育局2026/27概覽列粵語授課。校方另公布可為非華語家庭安排英語溝通、傳譯，以及個別中文學習資源；這些支援的服務對象、當屆名額和實施方式宜向校方確認。", period: "教育局概覽：2026/27；校方課程頁查核：2026-10", sourceUrl: "https://faogkg.edu.hk/curriculum-tc/" },
  ] }], { website: "https://faogkg.edu.hk/" }),

  profile("325821", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方課程資料查核：2026-10", "保良局金卿幼稚園位於鑽石山鳳德邨。校方以高廣度教學、遊戲及正向教育描述課程；這是校方的課程定位，不作成效保證。", [
    { label: "教育局《學校位置及資料》", scope: "校號325821及鳳德邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號325821、校址0001及註冊狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及年度收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3258210001" },
    { label: "保良局金卿幼稚園：課程目標與架構", scope: "兒童本位、遊戲探索和校本課程的校方說明。", url: "https://www.plkkgs.edu.hk/plkkhkg/hk/about/101" },
    { label: "保良局金卿幼稚園：課程簡介", scope: "高廣度、全語文、遊戲教學和正向教育的校方簡介。", url: "https://www.plkkgs.edu.hk/plkkhkg/" },
  ], [{ title: "高廣度教學與幼兒自主", featured: true, note: "高廣度課程為校方公布的教學取向；適合度應看孩子在開放式活動中的投入、表達及需要的成人支援。", details: [
    { label: "課程重視計劃、執行和回顧", value: "校方以「計劃－執行－檢討回顧」描述高廣度教學，並把表達、探索、賦權、經驗和環境列為導向。對家長而言，可在參觀時看幼兒是否有時間先作選擇、完成活動，再用口語或作品整理經驗。", sourceUrl: "https://www.plkkgs.edu.hk/plkkhkg/hk/about/101" },
    { label: "全語文、遊戲和正向教育是課程元素", value: "校方網站把全語文活動、遊戲教學和正向教育列為特色，並提到互動遊戲和合作學習。頁面未提供各元素的課時或每班參與數據，家庭可問清不同年級如何實施。", sourceUrl: "https://www.plkkgs.edu.hk/plkkhkg/" },
    { label: "概覽授課語言及班制", value: "教育局2026/27概覽對應校址0001，列粵語授課、上午下午及全日班，師生比例約1:13.1。概覽語言分類不表示英語活動的比重；實際每日流程應按當屆校方資料確認。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3258210001" },
  ] }], { website: "https://www.plkkgs.edu.hk/plkkhkg/" }),

  profile("516384", "教育局位置資料：截至2026-09-30；幼稚園概覽：2026/27；校方課程及收費資料查核：2026-10", "保良局葉吳彬彬皇后山幼稚園位於粉嶺皇后山邨。教育局概覽按校址0002列示；校方另公布粵語為主及每日英語、普通話活動，沒有公開逐科語言時數。", [
    { label: "教育局《學校位置及資料》", scope: "校號516384及皇后山邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號516384、校址0002及註冊狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0002", scope: "校址0002的班制、概覽語言、師生比例及學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5163840002" },
    { label: "保良局葉吳彬彬皇后山幼稚園：學校簡介", scope: "主題教學、自由遊戲、戶外學習、戲劇和語言安排的校方自述。", url: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/about/10" },
    { label: "保良局葉吳彬彬皇后山幼稚園：學費與校址", scope: "2026/27半日、全日班費用和校方列示地址。", url: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/info/27" },
  ], [{ title: "體驗式課程與兩文三語", featured: true, note: "課程設計和語言活動按校方網頁整理；未公開逐科時數，不能把每日活動表述為英語或普通話主要授課。", details: [
    { label: "主題、自由遊戲和戶外學習", value: "校方表示課程重視幼兒親身體驗，透過主題教學、自由遊戲和戶外學習引發好奇心。家庭若重視孩子動手探索，可參觀時問教師如何從遊戲觀察學習，以及如何照顧較慢熱或需要較多引導的幼兒。", sourceUrl: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/about/10" },
    { label: "英語和普通話每天有活動時段", value: "校方列授課語言以廣東話為主，並稱每天安排英語及普通話授課和活動時間；同頁亦介紹戲劇式教學、音樂和校本語文課程。這些安排不能推導出各語言的具體時數，應向學校索取當屆時間表。", sourceUrl: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/about/10" },
    { label: "費用按2026/27校方資料", value: "校方列2026/27半日班學費全免；全日班扣除計劃資助後每月HK$1,175，另每月膳食費HK$563，全年繳交10個月。這是校方公布的年度費用，額外代辦項目另計。", period: "2026/27學年；校址0002", sourceUrl: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk/info/27" },
  ] }], { website: "https://www.plkkgs.edu.hk/plkynbbqhkg/hk" }),

  profile("523178", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方遷校公告：2026-04", "學校於2026年遷往油塘新校舍，校方公告更改名稱為「宣道會陳李詠貞幼稚園幼兒園（油塘）」；教育局2026/27概覽頁按校址0002配對。舊秀茂坪校址資料不代表現址安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號523178及油塘新登記校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號523178、校址0002及註冊狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0002", scope: "油塘校址的班制、PN、授課語言、師生比例和學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5231780002" },
    { label: "宣道會陳李詠貞幼稚園幼兒園（油塘）：最新公告", scope: "2026年遷校日期、新校址和校名更新。", url: "https://www.caclwtkg.edu.hk/" },
    { label: "宣道會陳李詠貞幼稚園幼兒園（油塘）：入學申請", scope: "校方公布的PN、K1及插班申請資訊；招生年度須按最新公告核對。", url: "https://www.caclwtkg.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ], [{ title: "遷校後的校址與PN安排", featured: true, note: "2026年完成搬遷後，應以油塘校舍資料為準。幼兒園部與幼稚園班級的收生級別及費用可能不同，申請前按孩子年齡核實。", details: [
    { label: "2026年4月起遷至油塘", value: "校方公告本園於2026年4月13日遷至油塘欣榮街131號高宏苑鯉魚門服務設施大樓一樓，並更改校名。網站同時提及2026/27新生均在油塘校舍上課；舊址照片、舊收生公告不應當成現屆地點。", period: "校方公告：2026-04-20", sourceUrl: "https://www.caclwtkg.edu.hk/" },
    { label: "PN與K1申請分開列示", value: "校方招生頁分別提供2026/27預備班（PN）及幼兒班（K1）申請須知，代表申請級別和程序應按年齡分開核對。頁面沒有證明當前尚有名額，也不代表不同級別有相同收生條件。", period: "2026/27學年招生頁；查核：2026-10", sourceUrl: "https://www.caclwtkg.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
    { label: "教育局概覽只引用新校址0002", value: "教育局2026/27概覽對應校址0002，列上午、下午及全日班，並標示PN班。詳細語言、師生比例和費用以該校址頁面為準；不要沿用秀茂坪舊址資料。", period: "2026/27學年；校址0002", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5231780002" },
  ] }], { website: "https://www.caclwtkg.edu.hk/", name: "宣道會陳李詠貞幼稚園幼兒園（油塘）" }),

  profile("595969", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方資料查核：2026-10", "香港靈糧堂荃灣幼稚園位於海濱花園，校方獨立列出此校址的開班、設施及入讀小一概況。靈糧堂集團課程理念屬辦學團體層級；校址資料則只用荃灣分校頁。", [
    { label: "教育局《學校位置及資料》", scope: "校號595969及海濱花園登記校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號595969、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "荃灣分校的班制、語言、比例和核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5959690001" },
    { label: "香港靈糧堂荃灣分校：學校概覽", scope: "分校校址、設施、班級學生人數與其展示的教育局概覽連結。", url: "https://www.lingliang.org.hk/campuses/tsuen-wan" },
    { label: "香港靈糧堂：學習與支援", scope: "辦學團體的課程理念、遊戲及英語課程描述，並非分校逐科課時表。", url: "https://lingliang.org.hk/programme" },
  ], [{ title: "分校資料與遊戲學習", featured: true, note: "荃灣分校的校舍、課室及班級數據按校方分校頁；課程理念引用辦學團體頁，頁面沒有分校逐科時數。", details: [
    { label: "分校公開設施與班級編制", value: "校方荃灣分校頁列出室內遊戲場、音樂室、兒童餐廳、自主遊戲區、攀爬區、探索區和圖書室，並列班級與在讀人數。這些是頁面公布的校舍和某學年資料；學生人數是存量，不是K1招生學額。", sourceUrl: "https://www.lingliang.org.hk/campuses/tsuen-wan" },
    { label: "遊戲與主題教學是辦學團體的課程方向", value: "靈糧堂課程頁以靈育、主題教學、高廣度教學法、方案教學及遊戲描述其課程設計，並提及按幼兒興趣與能力安排學習區。這是辦學團體公開的教學框架；家長宜在荃灣分校參觀時確認各級如何落實。", sourceUrl: "https://lingliang.org.hk/programme" },
    { label: "荃灣校址概覽數據單獨呈列", value: "教育局2026/27概覽只對應校址0001。校方分校頁另列班制和各級在讀人數；不同年度及概覽口徑不可混作當屆招生名額。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5959690001" },
  ] }], { website: "https://www.lingliang.org.hk/campuses/tsuen-wan" }),

  profile("156426", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方課程資料：2023/24", "崇基幼稚園位於葵盛西邨第六座，教育局資料配對校址0001。學校網站列出中華文化校本活動及課室外體驗學習；課程細節採用校方2023/24年概覽，故不當作現屆課時承諾。", [
    { label: "教育局《學校位置及資料》", scope: "校號156426、葵盛西邨第六座校址及授課資料。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號156426、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "校址0001的班制及概覽資料；不以舊年度學生數推算招生名額。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1564260001" },
    { label: "崇基幼稚園：校方網站", scope: "學校地址及中華文化校本活動、課室外體驗學習入口。", url: "https://www.sungkeikg.edu.hk/" },
    { label: "教育局《幼稚園概覽2023/24》：校方課程資料", scope: "校方當年提交的故事戲劇、自由遊戲和課程說明；明確標示為歷史資料。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/156426c-0001.pdf" },
  ], [{ title: "故事戲劇與體驗學習", featured: true, note: "2023/24課程細節只代表校方當年申報內容；學校網站現列活動入口，未提供當屆每週課時。", details: [
    { label: "故事戲劇與自由遊戲的歷史課程說明", value: "校方在2023/24教育局概覽中表示，以故事戲劇支援幼兒全人發展，並透過自由遊戲培養自主、探索和自學。這是有年份的校方描述；如重視這種教學方式，家長可確認現屆課堂中戲劇和自由遊戲的實際頻率。", period: "2023/24學年校方申報資料", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/156426c-0001.pdf" },
    { label: "校方持續展示中華文化及課室外體驗活動", value: "學校官方網站設有中華文化校本學習活動和課室外體驗式學習專頁。這表示校方把相關活動作為可辨識的課程項目；公開頁未交代各級參與頻率，參觀時可問活動如何連結日常課程。", sourceUrl: "https://www.sungkeikg.edu.hk/" },
    { label: "年度概覽與舊有學生數分開看", value: "教育局2026/27概覽對應校址0001，應用於現屆班制資料；2023/24概覽中的班級及學生數僅為當年紀錄，不能視為目前學額或招生規模。", period: "概覽：2026/27；歷史課程描述：2023/24", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1564260001" },
  ] }], { website: "https://www.sungkeikg.edu.hk/" }),

  profile("528811", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；辦學團體資料查核：2026-10", "真理浸信會恩典幼稚園位於沙田翠華花園，教育局資料配對校址0001。辦學團體沿革記錄幼稚園於1999年在翠華堂址成立；公開可核的當屆課程細節有限，因此本頁不補寫未能證實的教學法或面試安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號528811及沙田翠華花園校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號528811、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "校址0001班制及可公開配對的年度資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5288110001" },
    { label: "真理浸信會：教會沿革", scope: "辦學團體記錄1999年在翠華堂址成立真理浸信會恩典幼稚園。", url: "https://www.truthbaptist.org.hk/info_history.php" },
    { label: "真理浸信會恩典幼稚園：校方網站入口", scope: "幼稚園校務及活動頁入口；需以校方最新頁面確認當屆課程細節。", url: "http://www.truthbaptist.org.hk/SCH04HY" },
  ], [{ title: "教會辦學背景與現況核實", featured: true, note: "公開資料足以確認校址、登記及辦學團體沿革；未找到可核實的現屆課程細節，故不把一般浸信會教育理念當成該校具體教學安排。", details: [
    { label: "辦學團體沿革記錄創校背景", value: "真理浸信會沿革頁記錄，恩典幼稚園於1999年在翠華堂址成立。這提供辦學背景，但不能據此推斷現屆宗教活動頻率、課程內容或家長參與要求。", sourceUrl: "https://www.truthbaptist.org.hk/info_history.php" },
    { label: "以校址及年度概覽核對現況", value: "教育局位置及註冊資料把校號528811配對至翠華花園校址0001；2026/27概覽應用於該址的當屆班制及公開欄目。網上可查的校方課程資訊有限，報名前建議直接索取課程流程、語言安排和收費文件。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5288110001" },
  ] }], { website: "http://www.truthbaptist.org.hk/SCH04HY" }),
];
