import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  note: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewUrl = school.detailSections
    ?.flatMap((section) => section.details)
    .find((detail) => detail.label === "班制與 PN" && detail.sourceUrl?.includes(`schid=${schoolNumber}`))?.sourceUrl;
  if (!overviewUrl) throw new Error(`EDB Kindergarten Profile missing for ${schoolNumber}`);
  const locationId = overviewUrl.match(/schid=\d{6}(\d{4})/)?.[1];
  if (!locationId) throw new Error(`EDB location id missing for ${schoolNumber}`);
  const overviewDetails = school.detailSections
    ?.find((section) => section.title.startsWith("幼稚園概覽"))?.details ?? [];
  const publishedOverviewDetails = overviewDetails
    .filter((detail) => detail.label === "班制與 PN" || detail.label === "師生比例")
    .map((detail) => ({
      label: detail.label,
      value: detail.value,
      period: "教育局幼稚園概覽2026/27",
      sourceUrl: detail.sourceUrl,
    }));
  const reviewedDetails = [
    ...details,
    {
      title: "班制與師生比例",
      note: "以下為教育局《幼稚園概覽2026/27》按本校址列出的資料；師生比例不是每班實際人數，PN未列亦不等同確認沒有PN班。",
      details: publishedOverviewDetails,
    },
  ];
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》", scope: `校號${schoolNumber}、校址、學校類別、地址及聯絡資料；位置資料截至2026-09-30。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information" },
    { label: "教育局《幼稚園概覽2026/27》", scope: `按校址${locationId}查閱班制、語言、師生比例及學費；概覽數字不代表現屆實際招生名額。`, url: overviewUrl },
    { label: "教育局《學校基本註冊資料》", scope: "非政府學校每日更新的登記狀態及校址識別資料；政府學校不在此檔案內。", url: EDB_REGISTRY },
    ...extraSources,
  ];
  return {
    ...school,
    dataYear: "教育局位置及註冊資料：2026-09/10；幼稚園概覽：2026/27；校方網站查閱：2026-10",
    sourceNote: note,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    website,
    sources: [...new Map(sources.map((source) => [source.url, source])).values()],
    detailSections: reviewedDetails,
  };
}

/** Kindergarten profile batch 36: ten single-location registered schools. */
export const KINDERGARTEN_BATCH_36: PilotSchool[] = [
  profile("157295", "按教育局校號157295及博康邨登記校址識別。校方網頁提供創意藝術活動及申請表；本頁只將可核對的課程方向列作校方資料，不推算當屆學額、面試內容或升小去向。", "https://stcphk.edu.hk/", [
    { label: "中華基督教會沙田堂博康幼稚園：親子創意藝術創作", scope: "校方介紹藝術創作、親子參與及接納幼兒不同表達方式；屬課程理念介紹，不是成效評估。", url: "https://www.stcphk.edu.hk/?p=5412" },
    { label: "中華基督教會沙田堂博康幼稚園：入學申請表", scope: "校方申請表列出可申請K1至K3及上午、下午或全日班；表格未標明當屆學額與收生日期。", url: "https://stcphk.edu.hk/wp-content/uploads/2025/08/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8%E4%B8%AD%E8%8B%B1%E6%96%87%E7%89%88.pdf" },
  ], [{ title: "藝術活動與幼兒表達", featured: true, note: "以下為校方公開的課程理念及申請資料，未有把活動描述推作全校每日課時安排。", details: [
    { label: "校方以親子藝術創作談表達與接納", value: "校方文章把藝術活動連繫到聆聽、接納幼兒不同創意表達，以及親子共同體驗。這可作為了解學校如何看待創作和家庭參與的線索；家長參觀時可再問藝術活動在各級課程中的安排，因網頁未列每週時數。", sourceUrl: "https://www.stcphk.edu.hk/?p=5412" },
    { label: "申請表列有上午、下午及全日班選項", value: "校方申請表提供K1、K2、K3及上午、下午、全日班選項。表格本身不是當屆開班與空缺公告，報名前應向校方確認目前招生年級、班制及申請日期。", sourceUrl: "https://stcphk.edu.hk/wp-content/uploads/2025/08/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8%E4%B8%AD%E8%8B%B1%E6%96%87%E7%89%88.pdf" },
  ] }]),

  profile("567051", "按教育局校號567051及海麗邨登記校址識別。校方課程頁、服務範圍及師資頁可讀；招生頁同時保留舊年度收費，故本頁不把舊收費當作現行費用。", "https://www.yotplsy.edu.hk/", [
    { label: "仁愛堂龐盧淑燕幼稚園：學校課程", scope: "校方以故事和問題情境介紹活動教學，並列出探究、分析及表達的學習步驟。", url: "https://www.yotplsy.edu.hk/learning-and-teaching/school-curriculum/" },
    { label: "仁愛堂龐盧淑燕幼稚園：服務範圍", scope: "列出K1至K3上午、下午及全日班時間；未列實際空缺。", url: "https://www.yotplsy.edu.hk/introduction/service-scope/" },
    { label: "仁愛堂龐盧淑燕幼稚園：教師師資", scope: "校方公布的師資配置，包括英語及普通話專科教師；不等同每班師生比例。", url: "https://www.yotplsy.edu.hk/%E5%AD%B8%E6%A0%A1%E4%BB%8B%E7%B4%B9/%E6%95%99%E5%B8%AB%E5%B8%AB%E8%B3%87/" },
  ], [{ title: "活動教學與語言支援", featured: true, note: "校方公布的課程和人手資料反映設計方向，實際班級安排須以當屆通告為準。", details: [
    { label: "故事引導幼兒提問和解難", value: "校方把故事情境作為活動教學的起點，再安排討論、思考、解難、整理及匯報。對喜歡動手和追問的孩子，這種設計提供由故事走向實際探索的學習脈絡；公開頁未列各級每週活動比例。", sourceUrl: "https://www.yotplsy.edu.hk/learning-and-teaching/school-curriculum/" },
    { label: "校方列出英語及普通話專科人手", value: "師資頁列有外籍英語教師、英語專科教師及普通話專科教師。這說明校方安排相關教學人手，但不能據此推算孩子每日使用各語言的比例；重視語言環境的家庭宜索取當屆時間表。", sourceUrl: "https://www.yotplsy.edu.hk/%E5%AD%B8%E6%A0%A1%E4%BB%8B%E7%B4%B9/%E6%95%99%E5%B8%AB%E5%B8%AB%E8%B3%87/" },
    { label: "班制包含上午、下午及全日", value: "校方服務範圍列明K1至K3各有上午、下午及全日班，並公開上課時間。班制不代表各級每種班別均有空位，報名前需直接確認招生年度和剩餘學額。", sourceUrl: "https://www.yotplsy.edu.hk/introduction/service-scope/" },
  ] }]),

  profile("157856", "按教育局校號157856及石籬一邨石秀樓登記校址識別。校方公開辦學宗旨及班級編制；可見招生頁仍載2025/26日期與收費，本頁不當作新一屆安排。", "https://www.roalk.edu.hk/", [
    { label: "路德會恩石幼稚園：辦學宗旨", scope: "校方自述以基督教關愛、愉快學習及幼兒均衡發展為辦學方向。", url: "https://www.roalk.edu.hk/" },
    { label: "路德會恩石幼稚園：班級編制", scope: "校方列出上午及全日班和三級安排；頁面未標註現行學年，須向校方確認。", url: "https://www.roalk.edu.hk/?page_id=262" },
    { label: "路德會恩石幼稚園：入學申請", scope: "頁面含2025/26申請日期及收費，僅作歷史流程參考，不能用作新一屆日程。", url: "https://www.roalk.edu.hk/?page_id=318" },
  ], [{ title: "辦學方向與招生資訊更新", featured: true, note: "校方公開的入學頁仍保留過去年度日期，當屆申請安排須重新向校方核實。", details: [
    { label: "校方重視關愛與均衡發展", value: "校方以基督教關愛為本，提出在愉快環境中培育幼兒德、智、體、群、美及靈性發展，並養成生活習慣。這是學校自述的教育取向；家長可在參觀時觀察日常活動是否兼顧遊戲、自理和群體互動。", sourceUrl: "https://www.roalk.edu.hk/" },
    { label: "校方列有上午及全日班", value: "班級編制頁列出上午及全日班、K1至K3安排，但未見清楚年度標示。報名前應向校方確認本年度班制、全日班收費及有否PN，不能用舊申請頁的日期作安排。", sourceUrl: "https://www.roalk.edu.hk/?page_id=262" },
  ] }]),

  profile("158364", "按教育局校號158364及上水馬會道登記校址識別。校方有校本特色、校園及學校資訊頁，另有2027/28招生資料；招生時間已按頁面日期保留，不推算取錄機會。", "https://fkkgfungkai.edu.hk/", [
    { label: "鳳溪幼稚園：校本特色", scope: "校方介紹遊戲教學、正向教育、兩文三語、戶外活動及社工服務。", url: "https://fkkgfungkai.edu.hk/%E6%A0%A1%E6%9C%AC%E7%89%B9%E8%89%B2/" },
    { label: "鳳溪幼稚園：認識本校及校園資料", scope: "校方自述創校沿革、上課時間、設施及辦學宗旨；未獨立核實校方宣稱的設施使用頻率。", url: "https://fkkgfungkai.edu.hk/about-fkkg/" },
    { label: "鳳溪幼稚園：2027/28 K1招生安排", scope: "校方公布的2027/28申請日期、文件及收生流程；日程過後需留意更新。", url: "https://fkkgfungkai.edu.hk/%E5%AD%B8%E7%94%9F%E6%8C%87%E5%8D%97-%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ], [{ title: "遊戲教學、語言接觸與校園空間", featured: true, note: "課程特點及設施由校方公開；英語和普通話活動不代表各科授課比例。", details: [
    { label: "以遊戲、主題及專題研習組織課程", value: "校方列出綜合教學、主題教學及專題研習，並把正向教育和故事、角色扮演等活動結合。對家長而言，重點是課堂是否讓幼兒動手、協作和表達，而不只是聽講；校方資料未提供各活動的課時分配。", sourceUrl: "https://fkkgfungkai.edu.hk/%E6%A0%A1%E6%9C%AC%E7%89%B9%E8%89%B2/" },
    { label: "兩文三語有專科教師參與", value: "校方表示設外籍英語教師和普通話教師，透過嘗試、探索和互動發展語文能力。這代表有相關語言接觸安排，但不是英語或普通話作主要授課語言的證據；可向校方查詢各級每週時數。", sourceUrl: "https://fkkgfungkai.edu.hk/%E6%A0%A1%E6%9C%AC%E7%89%B9%E8%89%B2/" },
    { label: "2027/28 K1申請資料已公布", value: "校方列明2027/28年度K1的索取和遞交申請日期及所需文件。頁面所列申請窗口已於2026年10月結束，後續家庭應查詢候補安排或下一輪更新，不要把提交申請等同獲取學位。", period: "2027/28招生公告；查閱於2026-10", sourceUrl: "https://fkkgfungkai.edu.hk/%E5%AD%B8%E7%94%9F%E6%8C%87%E5%8D%97-%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ] }]),

  profile("534790", "按教育局校號534790及天水圍天華邨登記校址識別；同一辦學團體另有梨木樹校舍，以下只引用天水圍校址資料。校方公布2027/28招生和課程特色；不可把另一校舍的地址或安排合併。", "https://castar.edu.hk/", [
    { label: "世德幼稚園：課程特色", scope: "校方介紹體驗式學習、混齡學習、雙語課程及每日英語活動；屬校方課程說明。", url: "https://castar.edu.hk/%E6%88%91%E5%80%91%E7%9A%84%E5%AD%B8%E6%A0%A1/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "世德幼稚園：學校簡介", scope: "校方列出辦學使命、主題／方案教學及體驗式活動。", url: "https://castar.edu.hk/%E6%88%91%E5%80%91%E7%9A%84%E5%AD%B8%E6%A0%A1/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/" },
    { label: "世德幼稚園：招生訊息", scope: "校方公布2027/28申請安排及兩個校址聯絡資料；此頁只採用天水圍校址。", url: "https://castar.edu.hk/%E6%8B%9B%E7%94%9F%E8%A8%8A%E6%81%AF/" },
  ], [{ title: "體驗式學習與雙語安排", featured: true, note: "校方同一網站介紹天水圍及梨木樹校舍，這裡只採用明確對應天水圍地址的招生和校址資訊。", details: [
    { label: "課程以體驗、主題及方案教學為主軸", value: "校方介紹幼兒透過觀察、操作、思考和應用建立經驗，並採用主題及方案教學。這種設計把學習放在具體活動中，適合重視實作和探索的家庭；家長可參觀時確認混齡活動在天水圍各級的實施方式。", sourceUrl: "https://castar.edu.hk/%E6%88%91%E5%80%91%E7%9A%84%E5%AD%B8%E6%A0%A1/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/" },
    { label: "校方安排每日英語活動及混齡學習", value: "課程頁表示英文活動由外籍教師於星期一至五帶領，並描述混齡學習安排。這是校方對課程的介紹，不等於英語作主要教學語言；家庭應再確認所報班別及當屆課時。", sourceUrl: "https://castar.edu.hk/%E6%88%91%E5%80%91%E7%9A%84%E5%AD%B8%E6%A0%A1/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "2027/28招生按校址分別聯絡", value: "校方招生頁列出天水圍校和梨木樹校的地址及聯絡電話，並接受各級申請。家長須選定天水圍校址後確認可報年級和學位情況，不能以另一校址的空缺代替。", period: "2027/28招生；校方公告查閱於2026-10", sourceUrl: "https://castar.edu.hk/%E6%8B%9B%E7%94%9F%E8%A8%8A%E6%81%AF/" },
  ] }]),

  profile("157090", "按教育局校號157090及屯門安定邨登記校址識別。校方2027/28入學申請頁和課程介紹可讀；校方網頁另有歷年活動，未把活動照片當作每年固定安排。", "https://tmllsykg.edu.hk/", [
    { label: "順德聯誼總會屯門梁李秀娛幼稚園：本校簡介", scope: "校方介紹課程目標、感官探索、生活化學習、語言教師配置和校舍；人手及人數資料可能隨年度改變。", url: "https://tmllsykg.edu.hk/about-us/" },
    { label: "順德聯誼總會屯門梁李秀娛幼稚園：入學申請", scope: "校方首頁及招生頁公布2027/28申請資訊；具體班別與收生名額以校方回覆為準。", url: "https://tmllsykg.edu.hk/admission/" },
    { label: "順德聯誼總會屯門梁李秀娛幼稚園：上課時間", scope: "列出上午及下午班上課時間，不代表招生名額或當屆空缺。", url: "https://tmllsykg.edu.hk/" },
  ], [{ title: "生活化探索與多語言接觸", featured: true, note: "師資、學生人數及活動資料來自校方頁面，可能按學年調整；未把人數作為當屆學額。", details: [
    { label: "課程以生活經驗和感官探索為主", value: "校方表示以幼兒為主動學習者，安排生活化、感官探索和趣味學習經驗，並涵蓋品德、語言認知、身體、群性和美感發展。家庭可據此了解其課程取向，再觀察活動是否讓孩子親自操作和表達。", sourceUrl: "https://tmllsykg.edu.hk/about-us/" },
    { label: "英語及普通話有專科教師支援", value: "校方介紹聘有外籍英語教師及普通話教師，透過故事、兒歌、遊戲和小組活動支援聽說。這不代表全日使用英語或普通話授課；家長應問清目標級別的語言時間和教師安排。", sourceUrl: "https://tmllsykg.edu.hk/about-us/" },
    { label: "校方已公布2027/28入學申請", value: "校方於2026年9月發布2027/28年度入學申請表。網站列上午和下午班時間；當屆是否仍收表、各級班別及候補安排要直接向校方確認。", period: "2027/28招生入口；查閱於2026-10", sourceUrl: "https://tmllsykg.edu.hk/admission/" },
  ] }]),

  profile("530417", "按教育局校號530417及將軍澳登記校址識別。校方課程頁提供雙語、生命教育、主題教學及體能／音樂課程方向；頁面未公開各語言或課程的週課時。", "https://www.tkomkg.edu.hk/", [
    { label: "將軍澳循道衛理幼稚園：課程介紹", scope: "校方介紹六大學習範疇、英語與廣東話雙語、主題教學、生命教育、體能及奧福音樂。", url: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
    { label: "將軍澳循道衛理幼稚園：官方首頁", scope: "校方最新消息、校務和招生入口；以當屆公告為準。", url: "https://www.tkomkg.edu.hk/" },
  ], [{ title: "雙語教學與活動課程", featured: true, note: "下述為校方對課程設計的描述，沒有公開可量化的語言課時或各級分配。", details: [
    { label: "英語與廣東話由教師共同帶領", value: "校方表示每天由廣東話教師和外籍英語教師共同帶領幼兒，在兩種語言環境中學習。這比單列「有英語課」更能說明課堂接觸方式，但仍不能推算英語佔主要授課比例；建議家長索取班級作息表。", sourceUrl: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
    { label: "故事、遊戲、體能及奧福音樂構成活動課程", value: "課程頁列有主題教學、區角遊戲、每日體能活動、奧福音樂及生活化數學。這表示學習形式不只圍繞紙筆練習；家長可再確認校本功課的頻率和孩子在家需要投入的時間。", sourceUrl: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
    { label: "普通話另設專科課程", value: "校方另列普通話專科課程，透過故事、兒歌及歌曲培養聽說和初步認讀。學校同時明確介紹英語和廣東話雙語日常安排；普通話專科課不等於以普通話作主要授課語言。", sourceUrl: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
  ] }]),

  profile("554901", "按教育局校號554901及將軍澳健明邨登記校址識別。校方網站於2026年10月仍發布校園活動及兩個學年申請表入口；較早年度的招生日期和費用未列為現況。", "https://kindergarten.locktao.org/", [
    { label: "基督教樂道幼稚園：官方網站及最新校務消息", scope: "校方於2026年發布的課程、校園活動與多元文化資訊；活動資料不代表固定課堂比例。", url: "https://kindergarten.locktao.org/" },
    { label: "基督教樂道幼稚園：教師專業及探究式學習", scope: "2026年校方介紹教師培訓和探究式、體驗式課程方向。", url: "https://kindergarten.locktao.org/article/1341" },
    { label: "基督教樂道幼稚園：2026年校園開放日", scope: "校方介紹校園導賞、課程簡介及多元文化家庭支援；只作活動資訊，不代表招生標準。", url: "https://kindergarten.locktao.org/article/1343" },
  ], [{ title: "探究式活動與共融校園", featured: true, note: "校方網頁的理念描述和活動公告屬校方自述；家長宜到校觀察課室與支援安排。", details: [
    { label: "校方強調做中學和探究式活動", value: "校方近期介紹把探究式、體驗式學習融入日常課堂，鼓勵幼兒觀察、嘗試和探索。這種取向適合希望孩子有較多實際參與的家庭；目前公開資料沒有列出各級的活動時數或評估安排。", period: "校方文章發布於2026-10", sourceUrl: "https://kindergarten.locktao.org/article/1341" },
    { label: "公開活動呈現多元文化和親子參與", value: "校方2026年開放日安排傳統文化親子活動、校園參觀及課程簡介，並表示重視多元文化背景。這可作為參觀時詢問共融支援的入口，但一次開放日不能證明日常教學的完整做法。", period: "校方活動公告發布於2026-10", sourceUrl: "https://kindergarten.locktao.org/article/1343" },
    { label: "入學日期及收費須按最新表格核對", value: "校方網站提供2026/27及2027/28申請表入口；舊招生說明仍可能顯示上一年度日期和收費。提交前應使用當屆表格確認申請窗口、面見和班制，不能沿用舊日期。", sourceUrl: "https://kindergarten.locktao.org/" },
  ] }]),

  profile("325635", "按教育局校號325635及南昌邨昌頌樓登記校址識別。校方公開課程、班制、服務和費用頁；收費及代辦費標示為2025/26，不當作2026/27已核准金額。", "https://www.elchkkg.edu.hk/", [
    { label: "基督教香港信義會南昌幼稚園：課程及辦學方向", scope: "校方自述孩童為本、愛心為本、美育為本的理念，並介紹親子自由遊戲活動。", url: "https://www.elchkkg.edu.hk/" },
    { label: "基督教香港信義會南昌幼稚園：班制及費用", scope: "列出K1至K3半日及全日班時間；所列學費和雜費以頁面標示年度為準。", url: "https://www.elchkkg.edu.hk/?page_id=1542" },
    { label: "基督教香港信義會南昌幼稚園：支援服務", scope: "校方列出駐校社工、特殊學習需要到校支援及非華語學童支援方式。", url: "https://www.elchkkg.edu.hk/?page_id=1530" },
  ], [{ title: "自由遊戲與家庭支援", featured: true, note: "校方理念、服務及費用均按其網頁標示年度引用；家長需確認下一學年費用和個別支援名額。", details: [
    { label: "辦學理念以兒童、愛心和美育為本", value: "校方以孩童為本、愛心為本、美育為本描述教育理念，網站亦持續舉辦親子自由遊戲體驗日。這個方向值得家長在導賞時觀察：幼兒是否有自主選擇和探索材料的時間，以及教師如何介入和延伸學習。", sourceUrl: "https://www.elchkkg.edu.hk/" },
    { label: "各級設上午、下午及全日班", value: "校方班制頁列出K1至K3上午、下午和全日班時間。費用頁的全日學費、膳食及代辦費有年度標籤，報名前應索取新學年收費表，並把學費與其他家庭支出分開比較。", sourceUrl: "https://www.elchkkg.edu.hk/?page_id=1542" },
    { label: "學前社工及到校支援服務已列明", value: "校方表示每週有駐校社工，並與協康會合作提供特殊學習需要幼兒的到校訓練，亦採全校參與方式支援非華語家庭。具體服務須視乎評估、轉介及當屆資源，報名前可直接詢問申請流程。", sourceUrl: "https://www.elchkkg.edu.hk/?page_id=1530" },
  ] }]),

  profile("324795", "按教育局校號324795及麗閣邨麗蘿樓登記校址識別。校方網站提供2027/28 K1申請、課程及校舍資訊；小一入學統籌安排只作制度資訊，不視為幼稚園直升承諾。", "https://kck.ccc.edu.hk/", [
    { label: "中華基督教會基真幼稚園：學校課程", scope: "校方介紹兒童本位、遊戲學習、四個品格主題及愉快學習課程設計。", url: "https://kck.ccc.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/%E5%AD%B8%E6%A0%A1%E8%AA%B2%E7%A8%8B/" },
    { label: "中華基督教會基真幼稚園：官方首頁及招生公告", scope: "校方公布2027/28 K1申請、創校年份、辦學團體、校舍地址及設施。", url: "https://kck.ccc.edu.hk/" },
    { label: "中華基督教會基真幼稚園：2026/27入學申請流程", scope: "上一年度申請步驟和文件，只作歷史流程參考；當屆日期以最新通告為準。", url: "https://kck.ccc.edu.hk/26-27-application/" },
  ], [{ title: "遊戲學習與品格培育", featured: true, note: "學校名稱中的「中華基督教會」反映辦學團體關係，不等同保證升讀任何小學。", details: [
    { label: "以兒童本位和遊戲學習培養主動性", value: "校方按《幼稚園教育課程指引》規劃兒童本位課程，透過多元活動和遊戲培養學習興趣。課程設計亦強調幼兒選擇、表達和探索；家庭可觀察孩子是否適應較重視參與的學習方式。", sourceUrl: "https://kck.ccc.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/%E5%AD%B8%E6%A0%A1%E8%AA%B2%E7%A8%8B/" },
    { label: "全年設四個品格主題", value: "校方表示透過週會德育故事及品格獎勵計劃推行四個品格主題。這能讓家長了解學校把品格教育放在明確課程位置，但公開頁未交代評量方式和每項活動的頻率。", sourceUrl: "https://kck.ccc.edu.hk/%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/%E5%AD%B8%E6%A0%A1%E8%AA%B2%E7%A8%8B/" },
    { label: "校方已發布2027/28 K1申請入口", value: "首頁列出2027/28 K1招生，並說明出生日期資格；申請步驟另見招生頁。家長仍需核實面見與註冊安排，幼稚園與關聯小學之間是否有銜接或優先安排，不能只憑校名推定。", period: "2027/28招生公告；查閱於2026-10", sourceUrl: "https://kck.ccc.edu.hk/" },
  ] }]),
];
