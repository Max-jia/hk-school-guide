import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const registered = registeredDirectory as PilotSchool[];
const DATASET = "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";

function profile(
  schoolNumber: string,
  sourceNote: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewSections = (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽"));
  return {
    ...school,
    website,
    sourceNote: `${school.sourceNote} ${sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    sources: [...new Map([
      ...school.sources,
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的資料版本與更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記資料；本地名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: (school.registryLocations || 0) > 1 ? details : [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 46: source-traced facts for schools not covered by earlier reviewed batches. */
export const KINDERGARTEN_BATCH_46: PilotSchool[] = [
  profile("159000", "按教育局校號159000、青衣青綠街1號偉景花園及註冊校址識別。現行校方網站展示遊戲、閱讀與共同成長方向；2027/28招生頁的收生數字和日期只適用該屆。", "https://www.coekg.edu.hk/", [
    { label: "香港聖公會基督顯現堂幼稚園：官方首頁", scope: "校名、青衣地址、遊戲學習與閱讀方向及最新校務公告。", url: "https://www.coekg.edu.hk/" },
    { label: "香港聖公會基督顯現堂幼稚園：校舍環境及設施", scope: "校方列出的活動場、課室數、室內遊戲場和語文室等設施。", url: "https://www.coekg.edu.hk/l/fa85bDghV" },
    { label: "香港聖公會基督顯現堂幼稚園：2027/28招生程序", scope: "該屆面見及招生安排；不推作其他年度的固定流程。", url: "https://www.coekg.edu.hk/l/fa09cCQ9VAQ" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1590000001" },
  ], [{ title: "遊戲探索、閱讀與校園支援", featured: true, note: "課程方向及設施由校方自述；概覽數據限青衣偉景花園校址及2026/27學年。", details: [
    { label: "遊戲學習與閱讀是校方公開的教育方向", value: "校方首頁以「遊戲學習」、「共同成長」和「喜愛閱讀」介紹本園方向。這讓家長初步看到學校對遊戲與閱讀的重視，但首頁沒有說明各級每週安排；參觀時可請教師示範一個近期遊戲活動如何延伸到語言表達或同伴合作。", sourceUrl: "https://www.coekg.edu.hk/" },
    { label: "活動角與室內場地提供多種探索入口", value: "校方設施頁列出10間註冊課室、約929平方米校舍、約400平方米室內遊戲場，另有音樂室、語文室、耕種小園地及親子圖書角。這些設施能支持不同類型活動；面積與場地存在不代表每級每天都使用，家長可問幼兒實際使用節奏。", sourceUrl: "https://www.coekg.edu.hk/l/fa85bDghV" },
    { label: "校方公布駐校社工及家長支援服務", value: "校方列出學前單位社工服務，包括幼兒情緒和行為支援、新生適應、家長諮詢及親子活動。這反映校方有相關支援渠道，不代表每名幼兒均會接受個別介入；如家庭有具體需要，應先了解轉介、評估和服務安排。", sourceUrl: "https://www.coekg.edu.hk/l/fa34cCQ9TDw" },
  ] }]),

  profile("159166", "按教育局校號159166及大埔運頭塘邨運亨樓校址識別分校，不與大埔浸信會幼稚園其他校址合併。校方現行頁提供招生與辦學方向；細節課程另有2022/23教育局概覽，已標歷史年度。", "https://www.wtt-baptistkg.edu.hk/", [
    { label: "大埔浸信會幼稚園運頭塘邨分校：官方網站", scope: "分校名稱、校址、最新招生公告與辦學宗旨。", url: "https://www.wtt-baptistkg.edu.hk/" },
    { label: "教育局《幼稚園概覽 2022/23》：運頭塘邨分校", scope: "校方當年申報的主題教學、遊戲活動、學習支援與家校工作；只作有年份資料。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/159166c-0001.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本分校年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1591660001" },
  ], [{ title: "生活主題、遊戲與家校同行", featured: true, note: "現行辦學方向來自校方網站；下列具體教學例子來自2022/23學年校方概覽，不能當作2026/27課程頻率。", details: [
    { label: "學校以基督教全人培育作辦學方向", value: "分校網站表示以基督的愛培育幼兒德、智、體、群、美、靈均衡發展，並希望孩子建立獨立思考和主動學習態度。這是校方的教育目標；家長可觀察老師如何在日常活動中讓孩子作選擇、表達想法並練習自理。", sourceUrl: "https://www.wtt-baptistkg.edu.hk/" },
    { label: "2022/23概覽記錄主題教學配合遊戲和探索", value: "教育局《幼稚園概覽2022/23》中的校方資料提到以生活經驗設計主題活動，配合遊戲、探索、綜合活動和正向教育；當時亦列出情緒課程、親子閱讀及新生適應家長會。這些可作該年度課程實例，不代表目前每級的固定安排。", period: "校方提供資料：2022/23學年", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/159166c-0001.pdf" },
    { label: "分校網站已發布2026/27收生資訊", value: "校方網站可查到2026/27 K1報名與取錄公告。招生日期和程序隨年度調整，家長應以準備申請當屆的公告為準；不要把舊年度表格或日期直接沿用。", period: "2026/27招生資料", sourceUrl: "https://www.wtt-baptistkg.edu.hk/" },
  ] }]),

  profile("214868", "按教育局校號214868及九龍塘金巴倫道57號識別。校方明確說明本地課程含蒙特梭利五個領域但並非完整蒙特梭利體系；其語言、班制與PN說明均按校方公開FAQ表述。", "https://www.stnicholas.edu.hk/zh-hant/", [
    { label: "金巴倫英文幼稚園：蒙特梭利教學法", scope: "校方對蒙特梭利五領域、教具、自主練習和教師引導方式的自述。", url: "https://www.stnicholas.edu.hk/zh-hant/蒙特梭利教學法/" },
    { label: "金巴倫英文幼稚園：常見問題", scope: "校方說明PN、班制、日常三語課堂及其蒙特梭利實施範圍。", url: "https://www.stnicholas.edu.hk/zh-hant/入學申請/常見問題/" },
    { label: "金巴倫英文幼稚園：校長訊息", scope: "全人教育、英語及普通話教師、三語學習與校方教學取向。", url: "https://www.stnicholas.edu.hk/about-2/principals-message/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2148680001" },
  ], [{ title: "蒙特梭利元素與三語課堂", featured: true, note: "蒙特梭利和語言安排是校方自述；校方亦明確指出本園並非完整實施整套蒙特梭利教學法。", details: [
    { label: "課程納入蒙特梭利五領域，但不是完整體系", value: "校方FAQ說明，N1至U3課程包括生活訓練、感官、數學、語文和文化五個蒙特梭利領域，但沒有實施整套蒙特梭利教學法；課室配備相關教具，老師會按校方方式安排操作。家長如重視孩子自主選擇程度，可觀察自由工作時段及教師介入方式。", sourceUrl: "https://www.stnicholas.edu.hk/zh-hant/入學申請/常見問題/" },
    { label: "校方描述日常課堂接觸英語、粵語和普通話", value: "校方表示英語、粵語和普通話會出現在日常課堂，並由外籍英語教師、普通話教師與本地教師合作。頁面未列各語言每週課時，不能據此判斷哪種語言佔主導；有特定語言目標的家庭宜索取當屆時間表。", sourceUrl: "https://www.stnicholas.edu.hk/about-2/principals-message/" },
    { label: "校方不提供PN或全日幼稚園班", value: "校方FAQ稱沒有PN，常規幼稚園設N1至U3，沒有全日制課程；另有年齡和服務時段不同的遊戲小組。這對需要兩歲常規學位或全日照顧的家庭是直接篩選條件，報名前仍應按當屆招生頁確認。", sourceUrl: "https://www.stnicholas.edu.hk/zh-hant/入學申請/常見問題/" },
  ] }]),

  profile("325252", "按教育局校號325252及李鄭屋邨忠孝樓第1座識別。學校有現行官方網站，但目前可讀頁面未提供足以確認的課程細節；教育局質素評核報告為2016年，只呈現為歷史觀察，沒有以同區其他聖公會幼稚園代替。", "https://www.skhkock.edu.hk/", [
    { label: "聖公會深水埗基愛堂幼稚園：官方網站", scope: "校方首頁、招生、校園活動及家長資訊入口；網站目前未能讀取可確認的現行課程細節。", url: "https://www.skhkock.edu.hk/" },
    { label: "教育局深水埗區學校名冊：基愛堂幼稚園", scope: "核對校名、校號325252、李鄭屋邨校址、電話及2026-09-30名冊狀態。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-ssp.html" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3252520001" },
    { label: "教育局《基愛堂幼稚園質素評核報告》", scope: "教育局2016年評核時的課程、教學和支援觀察；只作歷史背景，不代表目前表現。", url: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SSP_KeiOiCh.pdf" },
    { label: "香港聖公會教育服務：幼稚園名錄", scope: "交叉核對校名、聯絡資料與辦學團體所列單位身份。", url: "https://hkskheducation.org/content.php?wid=323" },
  ], [{ title: "教育局公開資料與可用證據邊界", featured: true, note: "未找到可讀的本校現行校本課程頁。質素評核報告距今較久，只能說明2016年視察內容，不作目前課程或教學質素判斷。", details: [
    { label: "教育局名冊確認校址與在冊身份", value: "教育局深水埗區名冊列出聖公會深水埗基愛堂幼稚園，地址在李鄭屋邨忠孝樓第1座，電話2361 2184；2026/27概覽按校址0001列班制、粵語及師生比例資料。選校時應以校號325252及該校址辨識，避免與同名幼兒學校混淆。", period: "教育局名冊：2026-09-30；概覽：2026/27學年", sourceUrl: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-ssp.html" },
    { label: "目前可讀的質素評核材料來自2016年", value: "教育局2016年評核報告記錄當時的課程和教學情況。報告可作歷史背景，但相隔多年，不能據此判斷目前教師安排、活動設計或幼兒支援；家長宜直接向學校索取最新校本課程和收生資料。", period: "教育局質素評核：2016年", sourceUrl: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SKH_SSP_KeiOiCh.pdf" },
  ] }]),

  profile("325600", "按教育局校號325600及九龍馬頭涌道135號校址識別。校方現行網站列出生活經驗、主題小組互動、體能與生命教育；2026年9月公告顯示正式開辦全日制，概覽現有班制仍須按年度和校址核對。", "https://tstkg.edu.hk/", [
    { label: "聖公會聖三一堂曾肇添幼稚園：教學理念", scope: "由做中學、生活經驗、主題小組及全人教育的校方自述。", url: "https://tstkg.edu.hk/edu-idea/" },
    { label: "聖公會聖三一堂曾肇添幼稚園：官方首頁", scope: "2026/27招生、開辦全日制公告與近期校園活動。", url: "https://tstkg.edu.hk/" },
    { label: "教育局學校搜尋：校號325600", scope: "交叉核對學校編號、馬頭涌道校址、電話及註冊身份。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=325600000111" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3256000001" },
  ], [{ title: "從生活經驗學習與小一銜接", featured: true, note: "課程和生命教育安排來自校方自述；全日制為2026年9月公告，家長仍應確認目標級別的當屆班制。", details: [
    { label: "主題及小組活動讓幼兒從做中學", value: "校方表示以兒童生活經驗作起點，透過感官探索、觀察、思考、解難和求證拓展理解；主題教學配合小組互動，鼓勵幼兒表達意見。家長可問近期主題例子，觀察活動是否留有兒童提問和自主探索的空間。", sourceUrl: "https://tstkg.edu.hk/edu-idea/" },
    { label: "體能元素納入正規課程", value: "校方列花式跳繩、體適能舞蹈及循環體能遊戲等活動，並把身體健康、堅毅和創意列為培育目標。這是校方公布的課程設計，未說明每週總時數；如孩子對體能活動敏感或特別有興趣，可詢問各級安排。", sourceUrl: "https://tstkg.edu.hk/" },
    { label: "全日班已於2026年9月正式開辦", value: "校方2026年9月公告全日制正式開辦。這與年度概覽按校址列出的班制欄位可能因更新時點不同而有差異；報名前應確認目標年級的全日名額、膳食與收費，不把開辦公告理解為仍有空缺。", period: "校方公告：2026-09-04；概覽：2026/27學年", sourceUrl: "https://tstkg.edu.hk/" },
  ] }]),

  profile("312134", "按教育局校號312134及石排灣邨碧輝樓校址識別。校方公開2025/26校務計劃及2024/25學校報告，另公布2027/28招生程序；報告中的活動和發展方向均保留原學年，不推作當前成效。", "https://www.sppkg.edu.hk/", [
    { label: "天主教聖伯多祿幼稚園：學校發展及報告", scope: "2025/26校務計劃及歷年學校報告，供核對校本發展方向與已公布工作。", url: "https://www.sppkg.edu.hk/chi/school-planning-and-reports/school-plans" },
    { label: "天主教聖伯多祿幼稚園：2027/28招生程序", scope: "2027/28報名、面見及註冊安排；只適用該屆。", url: "https://www.sppkg.edu.hk/chi/admissions/registration-and-admission-procedure" },
    { label: "天主教聖伯多祿幼稚園：2024/25學校報告", scope: "校方記錄的2024/25課程發展、自由遊戲及教學工作坊等事項。", url: "https://www.sppkg.edu.hk/frontend/web/custom_uploads/2023_2024%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "石排灣校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3121340002" },
  ], [{ title: "自由遊戲、天主教辦學與家長配合", featured: true, note: "自由遊戲例子引用校方2024/25學校報告；招生條件和日期以校方2027/28公告為準。", details: [
    { label: "2024/25校務報告記錄持續發展自由遊戲", value: "校方2024/25學校報告提到延續自由遊戲理念，安排教師透過備課、觀課和工作坊優化遊戲教學，並把中華文化元素融入主題和區角活動。這說明校方當年的發展重點，不是對目前每班實施情況的外部評估；參觀時可詢問孩子如何選擇材料及教師怎樣延伸遊戲。", period: "校方學校報告：2024/25學年", sourceUrl: "https://www.sppkg.edu.hk/frontend/web/custom_uploads/2023_2024%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    { label: "家長認同辦學理念是校方列出的考慮條件之一", value: "2027/28招生頁列出兄姊就讀或畢業、與辦學團體同一宗教信仰及家長認同學校理念等優先考慮；全日班申請亦會考慮家庭需要。這些屬校方公布的考慮因素，不是取錄保證；宗教背景不同的家庭可先了解學校的天主教活動和日常安排。", period: "2027/28招生", sourceUrl: "https://www.sppkg.edu.hk/chi/admissions/registration-and-admission-procedure" },
    { label: "2027/28面見形式為家長陪同的個人面見", value: "校方公告列出個人面見，家長陪同；未能參加指定日期須與校方聯絡。這是當屆程序而非長期固定形式，家長可按校方說明準備孩子熟悉的溝通與生活情境，不宜把面試班訓練當成必要條件。", period: "2027/28招生", sourceUrl: "https://www.sppkg.edu.hk/chi/admissions/registration-and-admission-procedure" },
  ] }]),

  profile("524026", "按教育局校號524026及將軍澳茵怡花園第7座平台校址識別。校方現行課程頁說明視藝切入的主題、英語拼音與普通話活動；教育局質素評核在2021年，僅作歷史背景。", "https://www.cmvkg.edu.hk/", [
    { label: "基督教宣道會茵怡幼稚園：課程規劃", scope: "校本主題課程、遊戲、綜合活動及各學習範疇的校方說明。", url: "https://www.cmvkg.edu.hk/course.php?type=15" },
    { label: "基督教宣道會茵怡幼稚園：英語及普通話", scope: "外語教師、Jolly Phonics、英語共讀及普通話活動安排。", url: "https://www.cmvkg.edu.hk/course.php?type=15" },
    { label: "教育局《茵怡幼稚園質素評核報告》", scope: "教育局2021年10月視察記錄；只作該次評核的歷史觀察。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_Verbena.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5240260001" },
  ], [{ title: "藝術主題課程與英語共讀", featured: true, note: "英語和普通話的描述來自校方課程頁；未公開各語言每週課時，不能由活動名稱推算主導語言。", details: [
    { label: "以視藝作切入點串連主題學習", value: "校方課程頁說明以視藝為切入點，結合宗教、品格、音體、語文、數學和科學等範疇，並以主題活動、遊戲及小組方式組織學習。對喜歡動手創作的幼兒，這提供了不同於紙筆練習的參與入口；家長可看作品是否反映孩子的想法，而非只按範本完成。", sourceUrl: "https://www.cmvkg.edu.hk/course.php?type=15" },
    { label: "英語拼音與共讀由校方分別安排", value: "校方介紹採用Jolly Phonics及音樂律動，並有K2、K3英語共讀活動；普通話活動則按主題營造生活化語境。公開頁面沒有列每週課時或日常照顧時使用的語言，若家庭重視英語沉浸或普通話比例，需另索取當屆時間表。", sourceUrl: "https://www.cmvkg.edu.hk/course.php?type=15" },
    { label: "教育局評核報告記錄於2021年", value: "教育局質素評核報告是在2021年10月視察後形成；報告可供了解當時的課程和學習支援，但距今已有數年，不能直接代表2026/27課堂現況。家長宜結合當屆校方課程頁和參觀觀察判斷。", period: "教育局質素評核：2021-10", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMAC_Verbena.pdf" },
  ] }]),

  profile("534153", "按教育局校號534153及將軍澳和明苑和逸閣校址識別。校方現行網站提供課程規劃、體驗式學習、非華語及特殊需要支援資訊；只將教育局2021年評核作歷史資料。", "https://www.tsingyitko.edu.hk/", [
    { label: "青衣商會將軍澳幼稚園：課程規劃", scope: "校方課程規劃與學習領域說明。", url: "https://www.tsingyitko.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B-3/%E8%AA%B2%E7%A8%8B%E8%A8%AD%E8%A8%88-2/" },
    { label: "青衣商會將軍澳幼稚園：特殊需要及非華語支援", scope: "校方公布的特殊學習需要及非華語幼兒支援入口；具體服務須按孩子需要向校方確認。", url: "https://www.tsingyitko.edu.hk/%E8%AA%B2%E7%A8%8B%E8%A8%AD%E8%A8%88/%E5%B0%8D%E6%9C%89%E7%89%B9%E6%AE%8A%E9%9C%80%E8%A6%81%E7%9A%84%E5%AD%B8%E7%AB%A5%E7%9A%84%E6%94%AF%E6%8F%B4/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5341530001" },
    { label: "青衣商會將軍澳幼稚園：教育局質素評核報告（2021）", scope: "校方提供的2021年教育局質素評核報告；只反映當次視察內容，不代表目前評核結果。", url: "https://www.tsingyitko.edu.hk/wp-content/uploads/2022/04/%E8%B3%AA%E7%B4%A0%E8%A9%95%E6%A0%B8%E5%A0%B1%E5%91%8A2021.pdf" },
  ], [{ title: "體驗學習、閱讀與個別支援", featured: true, note: "課程活動及支援措施為校方自述；2021年質素評核已標明年份，不以舊報告推斷現況。", details: [
    { label: "戶外體驗與主題閱讀延伸課堂學習", value: "校方網站設有課程規劃、課室外體驗式學習及年度圖書推薦頁，並發布2026/27學年活動。這為家庭提供了比單看課程口號更具體的學習例子；可進一步問K1幼兒參與戶外活動的頻率及安全照顧安排。", sourceUrl: "https://www.tsingyitko.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B-3/%E8%AA%B2%E7%A8%8B%E8%A8%AD%E8%A8%88-2/" },
    { label: "校方公布特殊需要及非華語幼兒支援頁", value: "網站列有特殊需要和非華語學生支援的獨立資訊入口，說明學校有相關支援安排可供家長查詢。頁面沒有承諾每名幼兒獲得固定個別時數；申請前宜直接說明孩子需要，了解評估、家校溝通和外部服務如何銜接。", sourceUrl: "https://www.tsingyitko.edu.hk/%E8%AA%B2%E7%A8%8B%E8%A8%AD%E8%A8%88/%E5%B0%8D%E6%9C%89%E7%89%B9%E6%AE%8A%E9%9C%80%E8%A6%81%E7%9A%84%E5%AD%B8%E7%AB%A5%E7%9A%84%E6%94%AF%E6%8F%B4/" },
    { label: "小一去向頁不能當作升小保證", value: "校方網站設有小一入學結果頁，可供家長了解學校所公布的升小資訊；該頁的名單或結果不等於每名幼兒均能升讀相同學校，也不能單憑公布案例推算成功率。若升小銜接是主要考慮，應一併問清統計年份、分母及資料定義。", sourceUrl: "https://www.tsingyitko.edu.hk/" },
  ] }]),

  profile("542830", "按教育局校號542830及將軍澳彩明苑彩耀閣校址識別。可讀官方資料包括教育局2025/26概覽及質素評核報告；目前校方網站未能找到可讀的課程詳情頁，未以第三方介紹補寫校本理念。", "http://www.choiming.edu.hk", [
    { label: "教育局《幼稚園概覽 2025/26》：校址0001", scope: "校方當年申報的班制、設施、師資、學生資料及校網連結；人數只適用2024年9月。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6308" },
    { label: "教育局《彩明幼稚園質素評核報告》", scope: "教育局質素評核記錄；作為當次視察資料，不當作本學年的外部評分。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTBC_ChoiMing.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5428300001" },
    { label: "教育局《學校位置及資料》", scope: "交叉核對校號、彩耀閣校址、電話及學校網址。", url: "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv" },
  ], [{ title: "場地資料與課程證據邊界", featured: true, note: "目前可讀的課程細節以教育局概覽和質素評核為主；未找到可讀的現行校本課程頁，故不推斷教學理念、活動頻率或支援成效。", details: [
    { label: "概覽列出桌遊、模擬遊戲與STEM牆等設施", value: "教育局《幼稚園概覽2025/26》列出桌上遊戲區、模擬遊戲區、Lego牆、STEM牆、觸感牆、塗鴉牆和圖書角。這些設施能讓家長看到校方提供的活動資源，但清單不能說明各級的日常使用頻率；參觀時可詢問孩子是否能自主選擇及操作。", period: "教育局概覽：2025/26學年；人數資料截至2024-09", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6308" },
    { label: "教育局質素評核可補充校方公開資料", value: "彩明幼稚園有教育局質素評核報告可查；評核報告描述的是當次觀察和建議，不是排名或持續有效的評分。由於現行校方課程頁暫未能核實，家長可向校方索取最新課程、班級語言和支援安排，再與現場觀察互相印證。", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/KTBC_ChoiMing.pdf" },
  ] }]),

  profile("541389", "按教育局校號541389及屯門富泰邨服務設施大樓校址識別。校方現行頁明列以品格教育為主軸及3至5歲班別；收費頁面目前只顯示至2025/26，未將舊費用當作現行數字。", "https://www.tbcft.edu.hk/", [
    { label: "真理浸信會富泰幼稚園：品格教育", scope: "校方公布的品格主題、生活實踐例子及社交情緒課程歷史。", url: "https://www.tbcft.edu.hk/品格教育/" },
    { label: "真理浸信會富泰幼稚園：學校簡介與招生", scope: "校方宗旨、3至5歲班別和2026/27招生入口。", url: "https://www.tbcft.edu.hk/收生安排/" },
    { label: "真理浸信會富泰幼稚園：2026/27招生公告", scope: "當屆K1報名入口；不代表仍有學位或取錄機會。", url: "https://www.tbcft.edu.hk/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5413890001" },
  ], [{ title: "品格實踐與情緒教育", featured: true, note: "品格課程由校方自述；社交情緒計劃的具體年份較早，按歷史項目呈現，不推斷目前服務頻率。", details: [
    { label: "品格主題落在日常生活任務中", value: "校方以「品格第一」為辦學方向，每年訂定喜樂、尊重、感恩、自律、解難等品格主題，列出整理用品、分享和社區關懷等生活例子。對重視習慣養成的家庭，這比抽象品格標語更值得追問：教師如何處理孩子做不到或與同伴衝突的情況。", sourceUrl: "https://www.tbcft.edu.hk/品格教育/" },
    { label: "校方曾把社交情緒課程轉化為校本工作", value: "學校頁記錄2017年參與香港教育大學3Es情緒及社交發展計劃，並於2018年把內容轉化為校本品格發展目標。這是已公布的歷史發展，不能據此推斷目前每週課程或個別支援時數；如孩子有情緒支援需要，應確認當屆的服務流程。", period: "校方公布的計劃歷史：2017–2018年", sourceUrl: "https://www.tbcft.edu.hk/品格教育/" },
    { label: "現行招生頁列3至5歲幼稚園班別", value: "校方收生頁把幼稚園組別列為3至5歲，並提供2026/27申請資料。該頁的費用清單尚未更新到2026/27完整數字，因此本頁不沿用2025/26價格；家長應向校方索取當屆收費證明和膳食費。", period: "招生：2026/27；公開費目：截至2025/26", sourceUrl: "https://www.tbcft.edu.hk/收生安排/" },
  ] }]),
];
