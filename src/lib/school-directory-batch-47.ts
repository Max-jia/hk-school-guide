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
  overrides: Partial<Pick<PilotSchool, "name" | "nameEn">> = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewSections = (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽"));
  return {
    ...school,
    ...overrides,
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

/** Kindergarten profile batch 47: school-published facts checked against the current EDB directory. */
export const KINDERGARTEN_BATCH_47: PilotSchool[] = [
  profile("210021", "按教育局校號210021及般咸道光景台校址識別；學校官方正式名稱為聖嘉勒小學暨幼稚園。2027/28招生資料只用於說明該屆安排，課程以校方現行課程頁為準。", "https://kg.scps.edu.hk/tc/", [
    { label: "聖嘉勒小學暨幼稚園：我們的課程", scope: "課程目標、主題活動、自由遊戲、語言活動與學習評估。", url: "https://kg.scps.edu.hk/tc/content.php?wid=131" },
    { label: "聖嘉勒小學暨幼稚園：2027/28 K1申請", scope: "該屆招生對象、程序和時間表；不推作其他年度安排。", url: "https://kg.scps.edu.hk/tc/content.php?wid=45" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "該校址年度班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2100210001" },
  ], [{ title: "遊戲探索、品德教育與女生教育", featured: true, note: "課程細節來自校方現行介紹；性別和招生流程按2027/28申請頁，年度安排可能調整。", details: [
    { label: "課程以故事、操作遊戲和主題探究連接六大範疇", value: "校方表示按幼兒發展設計故事及操作活動，並以主題教學、參觀、專題研習和設計活動培養觀察、表達與解難能力。家長可留意活動是否讓孩子提出問題和自己試做，而非只完成老師示範的成品。", sourceUrl: "https://kg.scps.edu.hk/tc/content.php?wid=131" },
    { label: "自由遊戲與天主教品德教育並行", value: "學校公布以自由遊戲支持自主學習和創意，並透過多元活動配合天主教教義培養品德；學習評估則包括持續觀察、總結性評估和幼兒學習歷程檔案。這種安排適合重視遊戲與價值教育的家庭，參觀時可詢問遊戲時段及家長如何閱讀孩子的學習檔案。", sourceUrl: "https://kg.scps.edu.hk/tc/content.php?wid=131" },
    { label: "2027/28 K1只接受女生申請", value: "校方該屆申請頁列明申請者須為女生，並公布當屆的申請與面見時間。這是明確的家庭篩選條件；日期和程序只適用2027/28年度，下一屆須重新查校方公告。", period: "2027/28招生", sourceUrl: "https://kg.scps.edu.hk/tc/content.php?wid=45" },
  ] }], { name: "聖嘉勒小學暨幼稚園", nameEn: "ST. CLARE'S PRIMARY SCHOOL – KINDERGARTEN" }),

  profile("608319", "按教育局校號608319及校址0001、0003分別列示。官方網站所述2025/26華德福幼稚園班級安排保留學年；概覽的授課語言與師生比例只對應校址0001，不套用到另一校址或蘭嶼活動安排。", "https://iws.edu.hk/", [
    { label: "香島華德福學校：幼稚園及遊戲小組", scope: "華德福幼兒教育方向及2025/26班級年齡、上課地點安排。", url: "https://iws.edu.hk/waldorf-education/kg/" },
    { label: "香島華德福學校：校園位置", scope: "校方對堅尼地城校園及南丫島活動地點的說明。", url: "https://iws.edu.hk/campuses/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "只列校址0001的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6083190001" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0003", scope: "校址0003另行登記；不得把校址0001的概覽欄位套用到此。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6083190003" },
  ], [{ title: "華德福節奏、自然經驗與多校址辨識", featured: true, note: "華德福課程內容為校方自述；2025/26班級地點安排已標年份。兩個教育局校址與校方活動地點須分開理解。", details: [
    { label: "教育局登記兩個校址，校方另公布南丫島課程地點", value: "教育局校址資料把學校分為校址0001（士美菲路）及0003（堅尼地城海傍路），其登記上課時間亦不同。校方2025/26幼稚園頁則列出堅尼地城及南丫島的混齡班安排；南丫島活動地點不能直接當成另一個教育局登記校址。查詢收生、語言或收費時應先確認具體班別與上課地點。", period: "教育局概覽：2026/27；校方班級介紹：2025/26", sourceUrl: "https://iws.edu.hk/campuses/" },
    { label: "華德福課程重視幼兒早期發展、自由遊戲與自然經驗", value: "校方把幼兒階段定位為尊重早期發展的教育，列出自然活動、由孩子主導的自由遊戲、真實自理任務，以及活動與安靜交替的日常節奏。這與較早安排學術操練的取向不同；家長可參加校方體驗活動，觀察孩子能否適應混齡、較長遊戲和自然環境。", sourceUrl: "https://iws.edu.hk/waldorf-education/kg/" },
    { label: "校方已公布的班級時段不可直接外推至新學年", value: "官方幼稚園頁記錄2025/26兩個堅尼地城班及一個南丫島幼稚園班，並列明混齡年齡與每週地點。這是特定學年的班級介紹；家長申請時應向學校確認2026/27或目標年度實際開班、交通安排和每日上課地點。", period: "2025/26學年", sourceUrl: "https://iws.edu.hk/waldorf-education/kg/" },
    { label: "英語及1:10比例只應理解為概覽校址0001資料", value: "教育局2026/27概覽按校址0001列出英語及師生比例1:10；該數據不代表校址0003、南丫島班別或整校所有班級的逐日語言安排。若家庭重視授課語言或師生比例，應把校址和班別寫入查詢。", period: "教育局概覽：2026/27，校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6083190001" },
  ] }]),

  profile("525731", "按教育局校號525731及西貢翠塘花園11座校址識別太陽島英文幼稚園西貢分校；不與同集團其他校舍合併。官方分校頁列明2026/27班別時段及分校特色，PN資訊指向土瓜灣幼兒中心。", "https://sunisland.edu.hk/zh/我們的分校/西貢分校/", [
    { label: "太陽島英文幼稚園：西貢分校", scope: "分校地址、校園特點、2026/27班別時間及PN服務說明。", url: "https://sunisland.edu.hk/zh/我們的分校/西貢分校/" },
    { label: "太陽島教育基金：分校校服招標文件（2023）", scope: "以校方文件交叉核對西貢分校名稱及翠塘花園校址；不作現行課程依據。", url: "https://sunisland.edu.hk/wp-content/uploads/2023/05/SITD-WU232420230502%E5%86%AC%E5%AD%A3%E6%A0%A1%E6%9C%8D%E4%BE%9B%E6%87%89%E6%A8%99%E6%9B%B8.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "西貢分校該校址的班制、語言、比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5257310001" },
  ], [{ title: "戶外遊戲、多元文化與西貢校址特色", featured: true, note: "分校特色及課程時間為校方自述，班別可能隨年度調整；PN由校方指向另一所幼兒中心，並非本分校提供。", details: [
    { label: "西貢分校把戶外遊樂和自然環境作為校園賣點", value: "校方介紹分校鄰近自然環境，設有戶外遊樂場和大肌肉活動設施，並把多元文化環境列為特色。這些條件可能增加幼兒在戶外活動和與不同背景同伴相處的機會，但實際頻率與照顧安排須按班級確認。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/西貢分校/" },
    { label: "校方列有半日及全日班，PN不在西貢分校", value: "2026/27分校頁列出全日班上午9時至下午4時30分、上午班9時至中午及下午班1時30分至4時30分；校方說明滿24個月幼兒可報讀土瓜灣幼兒中心的PN。這對需要PN的家庭很重要：應按校方指示查詢另一服務地點，不能把分校K1–K3資料理解為有PN。", period: "2026/27學年", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/西貢分校/" },
    { label: "教育局概覽資料只對應西貢校址0001", value: "教育局概覽按校址0001列出西貢分校班制、授課語言和師生比例。太陽島在港設有多個校舍，其他分校的課程、語言、費用和交通不能直接套用到西貢；家長應以此校址的當屆資料比較。", period: "教育局概覽：2026/27，校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5257310001" },
  ] }]),

  profile("543004", "按教育局校號543004及逸東邨2號停車場校址識別。校方現行課程頁公布親子閱讀、每週外籍英語及普通話教師活動、戲劇教學和學習區；活動頻率按頁面明文呈現。", "https://www.tungchungckg.edu.hk/", [
    { label: "東涌天主教幼稚園：課程簡介及學校特色", scope: "閱讀、語言教學、戲劇活動及生活化學習區的校方介紹。", url: "https://www.tungchungckg.edu.hk/chi/school-characteristic/course" },
    { label: "東涌天主教幼稚園：班級與上課時間", scope: "半日、全日班及校方當屆課堂安排。", url: "https://www.tungchungckg.edu.hk/chi/school-information/class" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "該校址班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5430040001" },
  ], [{ title: "親子閱讀、戲劇教學與生活學習區", featured: true, note: "課程內容來自校方公開介紹；「每週」語言安排按校方頁面用語，未將活動描述等同各語言主導授課比例。", details: [
    { label: "親子閱讀計劃讓家庭參與日常語言發展", value: "校方表示每週安排親子借閱，並邀請家長義工朗讀或說故事；課室也會按主題與幼兒差異提供圖書和閱讀時段。對希望在家校之間建立閱讀習慣的家庭，這項安排較具體；可問清借書頻率、家長參與是否必要及不同年級的閱讀要求。", sourceUrl: "https://www.tungchungckg.edu.hk/chi/school-characteristic/course" },
    { label: "每週英語及普通話活動，未公開兩種語言的完整課時比例", value: "校方介紹每星期安排外籍英語教師及普通話教師，以活動教學提升聽講興趣。這證明兩種語言有固定接觸，但頁面沒有公布每週完整課表或日常照顧用語，因此不能判定英語或普通話是主導語言。", sourceUrl: "https://www.tungchungckg.edu.hk/chi/school-characteristic/course" },
    { label: "戲劇與自選學習區把表達和解難放進情境活動", value: "校方與中英劇團合作發展戲劇教學，讓幼兒扮演故事角色、以肢體表達並嘗試提出解決方法；課室學習區則以包餃子、模擬餐廳和科學實驗等日常情境為例。家庭可觀察孩子是否能選擇活動、與同伴協作及向成人表達想法。", sourceUrl: "https://www.tungchungckg.edu.hk/chi/school-characteristic/course" },
  ] }]),

  profile("133850", "按教育局校號133850、又一村壽菊路校址及校方幼稚園課程頁識別。此校已有深度報告，本頁補充學校官方基本與課程資料；不重複報告中的升小分析。", "https://yycskg.edu.hk/", [
    { label: "又一村學校：教育課程", scope: "校本課程理念、班本活動、日常英語和普通話學習方式。", url: "https://yycskg.edu.hk/campus-life/educational-curriculum/" },
    { label: "又一村學校：學校簡介及聯絡資料", scope: "學校地址、聯絡及學校背景。", url: "https://yycskg.edu.hk/about-us/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "幼稚園校址的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1338500001" },
  ], [{ title: "兒童為本、班本探索與多語活動", featured: true, note: "課程理念和活動例子為校方自述；語言課時、活動頻率和個別支援細節須以目標年級當屆課表確認。", details: [
    { label: "校本課程按幼兒興趣和發展特徵設計", value: "學校稱以兒童為本，按幼兒興趣、發展特徵和個別特質規劃校本課程，再以班本活動安排教學、探索及遊戲。這種設計為教師因應班級需要調整活動留下空間；家長可在參觀時看老師如何回應不同孩子，而不是只看展示作品。", sourceUrl: "https://yycskg.edu.hk/campus-life/educational-curriculum/" },
    { label: "多感官及生活化活動強調解難與實作", value: "校方介紹以多元、多感官體驗讓幼兒在生活中學習解難和關愛生命，並公布昆蟲觀察、美食博覽會等英語活動例子。活動例子能說明校方如何設計學習入口，但不表示每名幼兒會以相同頻率參與每項活動。", sourceUrl: "https://yycskg.edu.hk/campus-life/educational-curriculum/" },
    { label: "英語和普通話均以遊戲及日常情境接觸", value: "校方稱英語透過故事、趣味活動和輕鬆對話培養聽說讀能力；普通話則按幼兒發展和興趣設計活動，以遊戲練習聽說讀。網站沒有列兩種語言的每週時數，若家庭需要明確語言比例，應索取當屆時間表。", sourceUrl: "https://yycskg.edu.hk/campus-life/educational-curriculum/" },
  ] }]),

  profile("555576", "按教育局校號555576及藍天海岸地下K01號舖識別太陽島幼稚園東涌分校；不與西貢分校或其他太陽島校舍合併。校方2026/27分校資料可作當屆班制及校舍特點依據。", "https://sunisland.edu.hk/zh/我們的分校/東涌分校/", [
    { label: "太陽島幼稚園：東涌分校", scope: "東涌分校校址、雙語班、多元文化、閱讀和2026/27課堂時間。", url: "https://sunisland.edu.hk/zh/我們的分校/東涌分校/" },
    { label: "太陽島教育基金：分校校服招標文件（2023）", scope: "以校方文件交叉核對東涌分校名稱及藍天海岸校址；不作現行課程依據。", url: "https://sunisland.edu.hk/wp-content/uploads/2023/05/SITD-WU232420230502%E5%86%AC%E5%AD%A3%E6%A0%A1%E6%9C%8D%E4%BE%9B%E6%87%89%E6%A8%99%E6%9B%B8.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "東涌分校校址0001班制、語言、比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5555760001" },
  ], [{ title: "雙語環境、閱讀習慣與東涌交通條件", featured: true, note: "以下分校特色及2026/27時間表為校方自述；PN服務由校方指向土瓜灣幼兒中心，不在東涌校址。", details: [
    { label: "東涌分校以多元文化環境和雙語班作為校園特色", value: "校方提到東涌區有不同國籍居民，並把雙語班和多元文化列為分校特點。這是校方的定位，不足以說明雙語班中英語的授課比例；家長可問清楚孩子入讀的是哪一班、兩種語言由誰教授及日常照顧用語。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/東涌分校/" },
    { label: "中英對照故事書與戶外遊戲是分校公開的學習資源", value: "校方稱提供中英對照故事書培養閱讀習慣，並設戶外遊樂場及天窗採光。這些條件可支持閱讀和活動體驗，但不能替代課程時數或日常使用安排；參觀時可觀察幼兒是否能自行取閱和使用活動空間。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/東涌分校/" },
    { label: "2026/27班別時間與PN服務地點需分開看", value: "東涌分校頁列全日班上午9時至下午4時30分、半日班上午或下午時段；PN則指向土瓜灣幼兒中心。若家庭需要兩歲班或校巴，應直接問清是否需要跨區到另一校舍，以及校車服務的實際接送範圍。", period: "2026/27學年", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/東涌分校/" },
  ] }]),

  profile("157732", "按教育局校號157732及元朗達輝徑校址識別。校方理念頁描述遊戲、學習中心及跨文化環境；2027/28招生頁作為下一屆申請入口，不把過往費用或流程當成現行固定安排。", "https://www.pristine.edu.hk/", [
    { label: "天純幼稚園：願景及使命", scope: "遊戲學習、學習中心、個別差異和跨文化校園理念。", url: "https://www.pristine.edu.hk/aboutus_c.php?type=2" },
    { label: "天純幼稚園：2027/28 K1入學申請", scope: "目標年度申請安排及校方最新招生入口。", url: "https://www.pristine.edu.hk/admission_c.php?type=10" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "元朗校址年度班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1577320001" },
  ], [{ title: "遊戲學習、個別發展與跨文化環境", featured: true, note: "理念來自校方願景頁，屬校方自述；教師支援、語言比例和實際活動頻率須按班級向校方確認。", details: [
    { label: "學校主張尊重不同學習風格，以遊戲和實作引導探索", value: "校方把孩子描述為好奇、有熱情和創意的自然學習者，並稱透過遊戲、實作和學習中心促進探索、創造及發現。對偏好動手和多種材料的幼兒，這提供了清楚的課程方向；家長可看孩子能否選擇活動，以及老師如何觀察和延伸學習。", sourceUrl: "https://www.pristine.edu.hk/aboutus_c.php?type=2" },
    { label: "校方重視個別差異、合作與跨文化相處", value: "學校表示會按孩子背景、興趣、經驗和需要設計課程，並鼓勵合作、分享想法和尊重差異。校長介紹多元文化同伴環境，但這些均為校方定位，不能直接推斷每班語言構成或個別支援時數；有相關需要的家庭應在申請前說明。", sourceUrl: "https://www.pristine.edu.hk/aboutus_c.php?type=2" },
    { label: "校方稱重視快樂學習，避免不必要的考試和壓力", value: "校監訊息稱希望幼兒在沒有不必要考試與壓力下學習，同時透過多元活動探索潛能。家長可在參觀時追問學習評估如何向家庭回饋，以及校方所說的課外活動是否另有費用或固定時數。", sourceUrl: "https://www.pristine.edu.hk/aboutus_c.php?type=2" },
  ] }]),

  profile("159158", "按教育局校號159158及元朗青山公路元朗段校址識別。校方有2026/27及2027/28現行資訊，課程介紹包括繪本、腦基礎教學、品格培養和課室外體驗；升小結果不在本頁推算比例。", "https://www.ylsyk.edu.hk/", [
    { label: "元朗三育幼稚園：課程特色", scope: "品格培養、腦基礎教學、繪本教學和中華文化活動入口。", url: "https://www.ylsyk.edu.hk/" },
    { label: "元朗三育幼稚園：2025/26體驗式學習活動", scope: "校方各級課室外體驗式學習活動示例。", url: "https://www.ylsyk.edu.hk/" },
    { label: "元朗三育幼稚園：2027/28入學摘要", scope: "下一屆申請年齡、流程及入學簡介會資料。", url: "https://www.ylsyk.edu.hk/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "校址0001班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1591580001" },
  ], [{ title: "繪本互動、腦基礎教學與品格培養", featured: true, note: "課程方向及體驗活動按校方網站所列學年呈現；班級活動和升小結果不可由公開個案推算成功率。", details: [
    { label: "繪本教學以故事情境連接遊戲和表達", value: "校方把繪本教學列作課程特色，並以故事人物及情節設計互動活動和區角，讓幼兒透過角色、遊戲和生活情境投入主題。對喜歡故事、需要具體情境理解概念的孩子，這是可觀察的教學入口；參觀時可問不同級別如何從繪本延伸至語文或數學活動。", sourceUrl: "https://www.ylsyk.edu.hk/" },
    { label: "校方同時列出腦基礎教學、品格與中華文化活動", value: "學校網站將腦基礎教學、德育培養及中華文化校本學習活動分列介紹，也提供多學年的體驗式學習相片。這表明課程重視多種學習主題，但名稱本身不能說明每天的時間比例；家長應索取當屆各級課程簡介會資料。", sourceUrl: "https://www.ylsyk.edu.hk/" },
    { label: "校方已發布當屆入學及課程簡介資料", value: "官方首頁設有2027/28 K1入學申請摘要與課程體驗日入口，另有2026/27各級課程簡介會資料。報名日期、年齡和活動名額會按年度更新，家庭應使用相應屆別公告，不以舊年度收生頁推斷現屆機會。", period: "校方網站：2026/27及2027/28", sourceUrl: "https://www.ylsyk.edu.hk/" },
  ] }]),

  profile("317403", "按教育局校號317403及長沙灣廣利道4號1樓識別。校方官方網站現列英文閱讀獎勵、非華語支援及2025/26校曆；教育局質素評核只反映該次評核觀察。", "https://www.sspbck.edu.hk/", [
    { label: "深水埗浸信會幼稚園：課程特色及辦學使命", scope: "英文閱讀、課程特色、非華語支援和家校合作頁面入口。", url: "https://www.sspbck.edu.hk/" },
    { label: "教育局《深水埗浸信會幼稚園質素評核報告》", scope: "教育局評核觀察；需保留評核年份，不作現屆教學評分。", url: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SSP_BaptistCh.pdf" },
    { label: "教育局收費證明書：深水埗浸信會幼稚園", scope: "核對正式校名、校址及該份證明書所示生效年度費目；費用不可當作新年度數字。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/317403.pdf" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "該校址年度班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3174030001" },
  ], [{ title: "英語閱讀、基督教辦學與家校同行", featured: true, note: "閱讀計劃及支援入口為校方自述；質素評核與收費證明均保留原文件年份，不代表本學年表現或收費。", details: [
    { label: "英文閱讀獎勵計劃以分段故事書建立聽說讀習慣", value: "校方介紹以生活化的英文故事書作閱讀材料，目標約每兩個月完成一本，由外籍教師透過全班、小組和個別互動教授內容，並鼓勵幼兒向家人、老師和同伴朗讀。對重視英語閱讀的家庭，這比只看「有外籍老師」更能說明活動形式；仍需確認各級實際執行安排。", sourceUrl: "https://www.sspbck.edu.hk/" },
    { label: "學校公開非華語支援及家校合作入口", value: "校方網站把非華語兒童支援、家長學堂和家長義工分別列為服務內容。這讓有語言適應或家校協作需要的家庭知道可向哪裡查詢，但網站入口本身不表示每名兒童獲固定個別支援時數；申請前宜直接說明需要並了解服務流程。", sourceUrl: "https://www.sspbck.edu.hk/" },
    { label: "教育局評核及收費文件用途不同", value: "教育局質素評核報告記錄評核時的觀察與建議，收費證明書則列出特定生效年度的批准費目；兩者都不應被解讀為本學年的即時評分或費用。報名前應向校方索取最新收費證明及課程資料。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/317403.pdf" },
  ] }]),

  profile("325694", "按教育局校號325694及觀塘彩霞邨平台校址識別天主教彩霞邨潔心幼稚園。校方現行課程與2027/28招生頁可查；課程理念屬校方自述，招生日期和費目均需按年度更新。", "https://www.sihm.edu.hk/", [
    { label: "天主教彩霞邨潔心幼稚園：課程特色", scope: "遊戲策略、校本課程、品德培育及校方列出的發展方向。", url: "https://www.sihm.edu.hk/課程特色/" },
    { label: "天主教彩霞邨潔心幼稚園：學校簡介及辦學使命", scope: "辦學團體、學校歷史、天主教教育及全人發展目標。", url: "https://www.sihm.edu.hk/學校簡介/" },
    { label: "天主教彩霞邨潔心幼稚園：2027/28 K1申請", scope: "當屆申請、面見、班級時段及註冊程序。", url: "https://www.sihm.edu.hk/入學申請/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "校址0001班制、授課語言、師生比例及核准費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3256940001" },
  ], [{ title: "自由遊戲、品德培養與全日班選擇", featured: true, note: "學校定位和課程為校方公開描述；2027/28入學資訊只適用該年度，不把優先考慮寫成錄取保證。", details: [
    { label: "校方以遊戲作為全面均衡課程的教學策略", value: "學校稱參考《幼稚園教育課程指引》設計校本課程，以遊戲提供全面、均衡且適切的學習；首頁另設自由遊戲、情緒教育和非華語學生支援資訊。對重視自主遊戲與情緒適應的家庭，參觀時可看孩子如何選擇遊戲、教師怎樣介入及家校如何跟進。", sourceUrl: "https://www.sihm.edu.hk/課程特色/" },
    { label: "天主教使命及正向品格教育是辦學定位的一部分", value: "校方以天主教教育和「愛主愛人」為使命，並列出感恩、積極樂觀、關心社會、尊重他人和責任感等品格目標。這是學校價值方向的自述；家庭可先了解宗教活動在日常課程中的安排，再判斷是否與家庭期望相符。", sourceUrl: "https://www.sihm.edu.hk/學校簡介/" },
    { label: "2027/28全日班申請會考慮家庭需要，但不保證取錄", value: "校方招生頁列出全日班申請者如有家庭需要可獲優先考慮，同時明言學額有限，符合優先因素不等於一定獲取錄。該頁亦分列半日和全日時間；家庭應按實際照顧需求申請並核實最新名額及收費。", period: "2027/28招生", sourceUrl: "https://www.sihm.edu.hk/入學申請/" },
  ] }]),
];
