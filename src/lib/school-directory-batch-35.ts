import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(schoolNumber: string, year: string, note: string, website: string, extraSources: PilotSchool["sources"], details: NonNullable<PilotSchool["detailSections"]>): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewUrl = school.sources.find((source) => source.label.includes("幼稚園概覽") && source.url.includes(`schid=${schoolNumber}`))?.url;
  const schid = overviewUrl?.split("schid=")[1] || "";
  const locationId = schid.match(/^\d{6}(\d{4})$/)?.[1] || "0001";
  const sourceYear = school.dataYear.match(/幼稚園概覽\s*([^（(；]+)/)?.[1]?.trim() || "2026/27";
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: `校號${schoolNumber}、登記校址及狀態；位置資料和註冊資料日期按名冊快照列示。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information" },
    { label: `教育局《幼稚園概覽${sourceYear}》`, scope: `按校址${locationId}配對班制、語言、師生比例及核准費用；概覽年度不代表現屆實際班額。`, url: overviewUrl || `https://kgp2026.kindergartenprofile.com/school/?schid=${schoolNumber}0001` },
    { label: "教育局《學校基本註冊資料》", scope: "每日更新的非政府學校註冊狀態及校址識別；政府學校不在這份資料內。", url: EDB_REGISTRY },
    ...extraSources,
  ];
  return {
    ...school,
    dataYear: year,
    sourceNote: note,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    website,
    sources: [...new Map(sources.map((source) => [source.url, source])).values()],
    detailSections: details,
  };
}

/** Kindergarten profile batch 35: ten unique, locally registered schools. */
export const KINDERGARTEN_BATCH_35: PilotSchool[] = [
  profile("516376", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與招生：網站查閱於2026-10", "迦南幼稚園（荃灣）按獨立校號及荃灣登記校址列示。校方網站提供集團課程及2027/28招生入口；課程頁未逐校舍列明差異，不能把集團教學介紹當作荃灣校舍獨有安排。", "https://www.cannan.edu.hk/", [
    { label: "迦南幼稚園：荃灣校舍資料入口", scope: "校方校舍列表及荃灣分校入口；地址以教育局登記資料配對。", url: "https://www.cannan.edu.hk/campuses/" },
    { label: "迦南幼稚園：幼稚園課程", scope: "校方集團層面的兒童本位、語言活動及遊戲學習介紹；未分列荃灣校舍差異。", url: "https://www.cannan.edu.hk/kindergarten" },
    { label: "迦南幼稚園：2027/28招生入口", scope: "校方現行招生公告與流程入口；申請批次和校舍可開班情況以最新公告為準。", url: "https://www.cannan.edu.hk/" },
  ], [{ title: "兒童本位課程與語言接觸", featured: true, note: "以下課程資料來自迦南校方統一介紹，並非荃灣校舍的獨立課時表。", details: [
    { label: "以操作、遊戲和生活主題組織學習", value: "校方課程頁以兒童本位及動手經驗為主軸，列出故事、遊戲、主題活動和多感官探索。這種安排較適合願意透過操作和談話學習的孩子；家長參觀時可觀察幼兒有多少自主選擇和回顧活動的時間。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "英語及普通話均有校方課程介紹", value: "校方介紹英語拼音、故事活動及普通話互動學習，但未提供荃灣校舍各級每週課時比例。重視某一語言的家庭，應向分校索取當屆作息表，不應把「有語言活動」理解為主要授課語言。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "2027/28招生須按分校和批次確認", value: "校方首頁已列2027/28新生申請入口。申請批次、可報班級及面見安排須查看最新流程圖，並向荃灣校舍確認當屆開班情況；不以其他迦南校舍的PN或班額資料代替。", period: "2027/28招生入口；查閱於2026-10", sourceUrl: "https://www.cannan.edu.hk/" },
  ] }]),

  profile("531910", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與招生：網站查閱於2026-10", "迦南幼稚園（九龍塘）按校號531910和金巴倫道登記校址識別。校方課程介紹及招生入口為集團共用頁；其課程方向可作了解，但校舍可開班、語言安排及申請批次仍須按九龍塘校舍確認。", "https://www.cannan.edu.hk/", [
    { label: "迦南幼稚園：九龍塘校舍資料入口", scope: "校方校舍列表及九龍塘校舍入口；登記地址以教育局資料為準。", url: "https://www.cannan.edu.hk/campuses/" },
    { label: "迦南幼稚園：幼稚園課程", scope: "校方集團層面的課程目標、英語／普通話活動及遊戲學習；未分列校舍課時。", url: "https://www.cannan.edu.hk/kindergarten" },
    { label: "迦南幼稚園：2027/28招生入口", scope: "新生申請公告和流程入口；各校舍開班安排應直接核對。", url: "https://www.cannan.edu.hk/" },
  ], [{ title: "集團課程與九龍塘校舍選擇", featured: true, note: "校方公開課程未逐校舍拆分；下列內容不能替代九龍塘校舍的作息表或班級安排。", details: [
    { label: "校方重視兒童主動探索", value: "迦南課程介紹以兒童本位、主題學習和動手探索作為設計方向，並包括故事、遊戲及多感官活動。家長可觀察孩子在較開放的活動中是否願意表達、嘗試和整理材料；公開資料沒有列出各活動每週時數。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "語言項目不等於語言授課比例", value: "校方列有英語和普通話活動，也以雙語發展作為辦學方向；但沒有公開九龍塘各級英語、普通話和粵語的逐科時數。若家庭以英文環境為主要考慮，應先確認班別、教師配置和每日語言使用情況。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "申請時先核對目標校舍和批次", value: "官方首頁列有2027/28新生申請入口及流程公告。集團設多個校舍，家長應以九龍塘登記校址確認可申請班級、面見場地及交通安排，不把其他分校的資料合併作為本校承諾。", period: "2027/28招生入口；查閱於2026-10", sourceUrl: "https://www.cannan.edu.hk/" },
  ] }]),

  profile("132047", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；官方網站查閱：2026-10", "香港真光中學附屬小學暨幼稚園以獨立幼稚園校號及大坑道校址列示。校方網站目前無法穩定讀取；本頁只用教育局幼稚園概覽中的校方自述整理課程，不將同名中學或小學資料當成幼稚園部的現行安排。", "http://www.tlmshkps.edu.hk/kindergarten", [
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "教育局概覽中的學校自述、課程規劃、教學模式和評估；原文屬校方申報資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1320470001" },
    { label: "香港真光中學附屬小學暨幼稚園：幼稚園部網站", scope: "校方幼稚園部資訊入口；本輪讀取受限，未用其未能核對的內容補充細節。", url: "http://www.tlmshkps.edu.hk/kindergarten" },
  ], [{ title: "幼稚園部課程與家長核對事項", featured: true, note: "課程描述來自教育局概覽中的校方自述；校方網站本輪讀取受限，未核實最新作息和招生細節。", details: [
    { label: "校方自述以兒童發展和探索為本", value: "2026/27教育局概覽所載校方資料，描述課程按幼兒身心發展設計，並以全班、小組和個別活動進行討論、分享、觀察及探索。這反映學校申報的課程方向，不能單靠文字判斷實際課堂比例；家長可在參觀時觀察幼兒是否有表達和自主探索機會。", period: "教育局概覽2026/27；校方自述", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1320470001" },
    { label: "持續評估重日常表現", value: "概覽列出以幼兒日常表現和發展作持續評估。家庭可詢問學校如何向家長回饋語言、社交和自理進度，以及在孩子需要支援時如何溝通；本頁不把評估描述推論為學業排名或升小結果。", period: "教育局概覽2026/27；校方自述", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1320470001" },
    { label: "幼稚園、小學和中學部須分開看待", value: "校名包含附屬小學及中學，但這不構成自動升讀或保證取錄。若家庭把銜接真光小學列為目標，應另行查核小學部當屆收生政策；本輪未能從幼稚園部可讀資料確認現行優先或銜接條件。", sourceUrl: "http://www.tlmshkps.edu.hk/kindergarten" },
  ] }]),

  profile("524360", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程頁查閱：2026-10", "殷翠幼稚園以校號524360及元朗大棠道校址列示。校方課程和班級頁提供教學及班制資料，但招生頁仍展示2026/27日期；該周期已過，不能把舊面見和優先準則當作下一屆現行安排。", "https://www.jadekg.edu.hk/", [
    { label: "殷翠幼稚園：課程特色", scope: "校方自述的活動教學、遊戲、探索、故事及音樂律動。", url: "https://www.jadekg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "殷翠幼稚園：班級編制", scope: "校方網頁列出的K1至K3及上午、下午班資料；頁面未標註學年，使用前應向校方確認。", url: "https://www.jadekg.edu.hk/%E7%8F%AD%E7%B4%9A%E7%B7%A8%E5%88%B6/" },
    { label: "殷翠幼稚園：2026/27入學申請", scope: "已完成周期的申請日期、面見方式及非華語支援；不得作新一屆日期依據。", url: "https://www.jadekg.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ], [{ title: "活動教學與資料更新狀態", featured: true, note: "校方課程頁可作課程方向參考；招生頁日期屬2026/27，已過期。", details: [
    { label: "以遊戲、故事和探索組織活動", value: "校方介紹以活動教學、遊戲學習、室內外探索、故事和音樂律動貫通六大學習範疇。若孩子喜歡動手和故事情境，家長可進一步了解主題活動怎樣連接語文、自理與同伴互動；網站未列各項課程比例。", sourceUrl: "https://www.jadekg.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "校方列有上午及下午班", value: "班級編制頁列K1、K2及K3上午和下午各一班，並提供上課時間，但沒有標註該頁適用年度。報名前應向學校確認當屆是否有相同班別、開班數及是否有全日安排，不以網頁舊資訊推斷學額。", sourceUrl: "https://www.jadekg.edu.hk/%E7%8F%AD%E7%B4%9A%E7%B7%A8%E5%88%B6/" },
    { label: "2026/27招生頁不能代替新一屆公告", value: "校方可讀到的申請頁列出2025年11月交表和面見、2026年1月註冊，現已屬過往周期。頁面所列小組面見及優先考慮只可作歷史流程參考；家長應等待新通告並確認非華語支援是否延續。", period: "2026/27招生；歷史資料", sourceUrl: "https://www.jadekg.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ] }]),

  profile("514659", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生與課程：2027/28及校網資料查閱於2026-10", "崇真小學暨幼稚園位於大埔道，校方同一校址設幼稚園不同語言課程／組別。頁面將幼稚園資料與小學部、英文普通話課程分開引用；收生和聯繫小學安排不等於自動升讀保證。", "https://www.ttpskg.edu.hk/", [
    { label: "崇真小學暨幼稚園：幼稚園部課程及校務資料", scope: "校方公開的幼稚園課程、語言組別、支援服務及活動入口；須留意資料適用學部和年度。", url: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/site_map.php?menuid=4&mode=published" },
    { label: "崇真小學暨幼稚園：2027/28 K1招生資訊", scope: "校方幼稚園部當屆報名入口與時間表；面試名額和收生結果以學校通知為準。", url: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/school.php3?menuid=4&mode=published" },
  ], [{ title: "幼稚園課程組別與銜接", featured: true, note: "校方同址設不同幼稚園課程組別；報名前要確認所申請的組別和日常語言安排。", details: [
    { label: "同址課程組別要分開理解", value: "校方網站分別列出幼稚園部課程、英語普通話幼稚園組別及活動安排。這代表家庭須先確認申請的是哪一組別，再比較其語言環境和費用；不可把某一組的英語安排推廣至全校幼稚園班。", sourceUrl: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/site_map.php?menuid=4&mode=published" },
    { label: "校方設幼小及中小聯繫資訊", value: "校方介紹幼稚園、小學及中學的聯繫安排，並設幼稚園部小一過渡資訊。聯繫可提供了解和銜接活動，但不是自動升讀或保證取錄；若目標是直升小學，應讀該年度小一收生規則。", sourceUrl: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/site_map.php?menuid=4&mode=published" },
    { label: "2027/28 K1按當屆校方通知辦理", value: "校方網站已列2027/28幼兒班入學資訊和重要日期入口。家長應以幼稚園部當屆頁面確認申請文件、面試安排和組別，並留意名額限制；不從小學部招生日期推斷幼稚園時間表。", period: "2027/28 K1招生入口；查閱於2026-10", sourceUrl: "https://www.ttpskg.edu.hk/it-school/php/webcms/public/mainpage/school.php3?menuid=4&mode=published" },
  ] }]),

  profile("607886", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程：網站查閱於2026-10", "聖公會慈光堂聖匠幼稚園（分校）按分校專屬校號607886及藍田康栢苑校址列示。校方網站同時介紹正校與分校；頁面只採用可確認適用於兩校的辦學方向，不把正校地址、班額或個別設施誤列為分校資料。", "https://skhklchc.edu.hk/", [
    { label: "聖公會慈光堂聖匠幼稚園：校方網站", scope: "辦學宗旨、課程方向、校園活動；網站同時包含正校與分校內容。", url: "https://skhklchc.edu.hk/" },
    { label: "聖公會慈光堂聖匠幼稚園：教育局概覽校址0001", scope: "按校號及登記校址核對分校的班制、語言比例和核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6078860001" },
  ], [{ title: "遊戲學習與分校校址核對", featured: true, note: "辦學方向取自校方共用網站；地址和年度數據以分校登記校址為準。", details: [
    { label: "校方重視遊戲、探索和家校合作", value: "學校網站列出主題探索、閱讀、外出參觀、遊戲學習及家校活動，並以全人發展作辦學方向。家庭可參觀分校時觀察室內遊戲和戶外活動如何安排，並確認孩子實際就讀校舍的設施；共用網站的照片不能單獨證明每項設施均在分校。", sourceUrl: "https://skhklchc.edu.hk/" },
    { label: "本頁地址只對應藍田分校", value: "教育局登記資料把分校列於藍田康柏苑停車場大廈；校方網站亦分別標示正校和分校。接送、設施和校車服務應直接向分校核實，不沿用正校資訊。", sourceUrl: EDB_LOCATION },
    { label: "班制、語言與收費按校址年度看", value: "2026/27教育局概覽可用來比較校址層面的班制、授課語言、師生比例和核准費用。師生比例不是每班實際人數；如家庭要計算全日照顧成本，還須索取最新費證及代辦項目清單。", period: "2026/27概覽；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6078860001" },
  ] }]),

  profile("231010", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方校舍及費用：2026/27", "太陽島英文幼稚園（元朗分校）按校號231010、校址0002配對。校方公布2026/27上午、下午及全日班時段、班級與收費；PN頁面指向土瓜灣幼兒中心，不能寫成元朗校舍設有PN。", "https://sunisland.edu.hk/zh/我們的分校/元朗分校/", [
    { label: "太陽島：元朗分校及2026/27班制", scope: "元朗校舍地址、上課時間、班級及PN服務地點說明。", url: "https://sunisland.edu.hk/zh/%E6%88%91%E5%80%91%E7%9A%84%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1/" },
    { label: "太陽島：元朗分校學費", scope: "2026/27報名註冊費、免費計劃後學費及其他用品／膳食費；項目與年度分開列示。", url: "https://sunisland.edu.hk/zh/%E6%88%91%E5%80%91%E7%9A%84%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1%E5%AD%B8%E8%B2%BB/" },
    { label: "太陽島：教育理念及課程", scope: "辦學團體的教學理念和課程設計；不取代元朗分校的開班安排。", url: "https://sunisland.edu.hk/zh/%E5%AD%B8%E6%A0%A1%E8%AA%B2%E7%A8%8B/%E6%95%99%E5%AD%B8%E7%90%86%E5%BF%B5/" },
  ], [{ title: "班別、語言課程與家庭成本", featured: true, note: "下列時段和收費為校方公布的2026/27資料；新學年應重新核對。", details: [
    { label: "元朗校舍提供雙語班及全日選項", value: "校方列出元朗分校上午班9:00至12:00、下午班13:30至16:30和全日班9:00至16:30，並列K1至K3及雙語班。PN則可報讀土瓜灣幼兒中心，不是此元朗校址的PN班。最新開班情況仍須向分校確認。", period: "2026/27學年", sourceUrl: "https://sunisland.edu.hk/zh/%E6%88%91%E5%80%91%E7%9A%84%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1/" },
    { label: "半日學費免費不等於沒有其他成本", value: "校方2026/27費用表列半日班扣除資助後免費，並另列註冊費、校服、書包和課本費；K2及K3全日班另有膳食費。家庭應把一次性用品、學費和膳食分項計算，並留意全日班並非所有級別皆有。", period: "2026/27學年", sourceUrl: "https://sunisland.edu.hk/zh/%E6%88%91%E5%80%91%E7%9A%84%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1%E5%AD%B8%E8%B2%BB/" },
    { label: "校方強調校外體驗與活動", value: "元朗分校介紹提到參觀和校外活動，並列校巴服務及大肌肉活動設施。家庭可再問清楚校巴路線、收費和活動頻率；網站未公布每名幼兒可參與的固定次數。", sourceUrl: "https://sunisland.edu.hk/zh/%E6%88%91%E5%80%91%E7%9A%84%E5%88%86%E6%A0%A1/%E5%85%83%E6%9C%97%E5%88%86%E6%A0%A1/" },
  ] }]),

  profile("156841", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2027/28公告發布於2026-07", "聖斯德望天主教幼稚園按葵涌榮芳路校址及校號156841列示。校方2026年7月已發布2027/28新生招生公告，公開核心價值和活動入口；報名頁未能從文字版確認完整面見流程，應下載當屆文件核實。", "http://www.stepckg.edu.hk/", [
    { label: "聖斯德望天主教幼稚園：校方首頁與公告", scope: "2027/28新生招生公告、校址、聯絡資料及天主教教育核心價值。", url: "https://www.stepckg.edu.hk/" },
    { label: "聖斯德望天主教幼稚園：2027/28招生消息", scope: "校方公布開始招生及表格索取方法；詳細程序以附件或最新校方通知為準。", url: "https://www.stepckg.edu.hk/chi/whats-new/news/4" },
    { label: "聖斯德望天主教幼稚園：教育局概覽校址0001", scope: "班制、授課語言、師生比例與核准費用的年度底數。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1568410001" },
  ], [{ title: "天主教核心價值與招生核對", featured: true, note: "校方公告列有招生年度，但報名程序的完整文字內容有限；不推測面試形式或錄取難度。", details: [
    { label: "學校以天主教五大核心價值作定位", value: "校方列出真理、生命、愛德、義德及家庭五項核心價值，並公開祈禱聚會、戲劇教育、戶外學習、親子活動和中華文化活動入口。這能說明學校的價值取向；家庭仍應參觀了解宗教活動在日常課程中的實際安排。", sourceUrl: "https://www.stepckg.edu.hk/" },
    { label: "2027/28招生公告已公布", value: "校方於2026年7月發布招收2027/28年度新生公告，並提供網上或到校索取報名表方式。可讀文字未完整列出面見流程、截止日期和班級空缺，家長應打開附件或致電學校核對，不沿用舊年度流程。", period: "2027/28招生；公告日期2026-07-17", sourceUrl: "https://www.stepckg.edu.hk/chi/whats-new/news/4" },
    { label: "先按校址核對每日交通與班制", value: "登記地址為下葵涌榮芳路，教育局概覽可核對本校班制、語言和費用。接送路線、校巴服務及當屆課室安排需直接向學校確認；概覽中的師生比例不代表每班人數。", period: "教育局概覽2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1568410001" },
  ] }]),

  profile("157384", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2026/27文件；課程及活動：網站查閱於2026-10", "東華三院馬陳景霞幼稚園位於沙田新翠邨，課程以六大學習範疇和繪本教學為校方特色。公開收生程序目前可見2026/27周期；面見服務、報名期和收費不可當成2027/28現行安排。", "https://www.twghckhkg.edu.hk/", [
    { label: "東華三院馬陳景霞幼稚園：學校介紹與課程", scope: "校方介紹六大學習範疇、繪本教學及學校設施。", url: "https://www.twghckhkg.edu.hk/" },
    { label: "東華三院馬陳景霞幼稚園：收生指南", scope: "校方公開的2026/27報名流程及非華語面見支援；屬上一招生周期。", url: "https://www.twghckhkg.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
    { label: "東華三院馬陳景霞幼稚園：校舍資料", scope: "地址、接送位置及校園設施的校方說明。", url: "https://www.twghckhkg.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/" },
  ], [{ title: "繪本教學與生活化英語", featured: true, note: "課程特色來自校方介紹；面見和報名日期依據2026/27文件，已過期。", details: [
    { label: "以繪本連接語文、思考與表達", value: "校方表示會以多元繪本培養閱讀興趣和語文能力，並讓幼兒在故事情境中思考和創作。家長可詢問老師如何從共讀延伸到幼兒口語表達及親子閱讀，而不只看閱讀材料數量。", sourceUrl: "https://www.twghckhkg.edu.hk/" },
    { label: "英語活動放進生活情境", value: "校方舉例以超級市場、海濱公園和博物館等生活場景接觸英語，目標是鼓勵幼兒在活動中開口使用。網站未提供每週英語課時或各班授課語言比例；若家庭重視英語沉浸程度，應索取作息表。", sourceUrl: "https://www.twghckhkg.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
    { label: "2026/27招生文件只作歷史參考", value: "校方現可查閱的收生指南列出2026/27流程和可按需要提供傳譯或翻譯服務。該學年申請期已過，下一屆面見日期和支援安排須以新通告或學校直接回覆為準。", period: "2026/27招生；歷史資料", sourceUrl: "https://www.twghckhkg.edu.hk/%E6%94%B6%E7%94%9F%E6%8C%87%E5%8D%97/" },
  ] }]),

  profile("159212", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2027/28網頁含未更新舊流程；課程：網站查閱於2026-10", "香港神託會培真幼稚園位於馬鞍山利安邨，校方課程頁列活動教學、故事、遊戲及音樂律動。招生頁已稱接受2027/28申請，但同頁仍保留2025年面見日期；本頁只引用其2027/28招生活動入口，不把舊日期當作新流程。", "https://www.pooichun.edu.hk/", [
    { label: "香港神託會培真幼稚園：課程特色", scope: "活動教學、遊戲、探索、故事、閱讀及音樂活動的校方介紹。", url: "https://www.pooichun.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2" },
    { label: "香港神託會培真幼稚園：報名需知", scope: "頁面已列2027/28招生入口和註冊費，但面見日期等欄位仍有2025年舊資訊；按項目和年份分開閱讀。", url: "https://www.pooichun.edu.hk/%E5%A0%B1%E5%90%8D%E9%9C%80%E7%9F%A5" },
    { label: "香港神託會培真幼稚園：學制", scope: "校方公布的K1至K3年齡及半日、全日班時間；如學年未標示，報名前再向校方確認。", url: "https://www.pooichun.edu.hk/%E5%AD%B8%E5%88%B6" },
  ], [{ title: "活動課程與招生頁更新邊界", featured: true, note: "校方招生頁混有2027/28程序和2025年面見日期；日期矛盾已明確標出，報名前須直接向學校核對。", details: [
    { label: "活動教學包含故事、探索和音樂律動", value: "校方課程頁列多元學習區角、閱讀計劃、遊戲、戶內外探索、故事教學和音樂律動，並稱課程貫通德、智、體、群、美、靈六方面。這些是校方公布的課程取向；家庭可參觀時觀察活動是否照顧不同年齡幼兒的節奏。", sourceUrl: "https://www.pooichun.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2" },
    { label: "全日班提供較長照顧時段", value: "校方學制頁列上午班9:00至12:00、全日班8:45至16:30，另列早餐和延展放學服務時段。這可協助家庭初步評估接送配合，但頁面未標明最新生效年度，應確認當屆供應、費用及延展服務名額。", sourceUrl: "https://www.pooichun.edu.hk/%E5%AD%B8%E5%88%B6" },
    { label: "2027/28申請開放，但面見欄仍舊", value: "校方報名頁寫明現正接受2027/28申請，並列2027年統一註冊日期和註冊費；同頁的面見日期與結果通知卻仍為2025年。家長應先致電確認當屆交表、面見和結果日期，不按舊日程安排行程。", period: "2027/28招生頁查閱於2026-10；部分欄位仍標2025", sourceUrl: "https://www.pooichun.edu.hk/%E5%A0%B1%E5%90%8D%E9%9C%80%E7%9F%A5" },
  ] }]),
];
