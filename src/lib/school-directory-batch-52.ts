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
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的版本與更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記資料；名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 52: registered school numbers, dated official sources, and campus-scoped facts. */
export const KINDERGARTEN_BATCH_52: PilotSchool[] = [
  profile("311910", "按教育局校號311910及西灣河街175至181號校址識別。校方兼有小學部；本頁只整理幼稚園登記及幼稚園課程資料，小學部資料不作幼稚園收生保證。", "https://www.puili.edu.hk/tc/", [
    { label: "浸信會培理學校：學校官方網站", scope: "幼稚園部校務、課程、招生和家校資訊；按該校幼稚園頁面理解。", url: "https://www.puili.edu.hk/tc/" },
    { label: "浸信會培理學校：55周年特刊", scope: "辦學背景與校方所述基督教全人教育方向；屬校方歷史材料。", url: "https://www.puili.edu.hk/attachment/upload/files/%E6%B5%B8%E4%BF%A1%E6%9C%83%E5%9F%B9%E7%90%86%E5%AD%B8%E6%A0%A155%E5%91%A8%E5%B9%B4%E7%89%B9%E5%88%8AFINAL.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3119100001" },
  ], [{ title: "基督教全人教育與幼小銜接", featured: true, note: "學校同時設小學部；幼稚園部入學與升讀小學屬不同程序，應分開核實。", details: [
    { label: "校方把全人教育與品格培養列為辦學方向", value: "校方特刊以「樂於學習、善於溝通、勇於承擔、敢於創新」概括辦學宗旨，並把靈、德、智、體、群、美納入全人教育。這是校方教育目標，不等於外部評核結果；家長可在參觀時觀察日常活動如何讓幼兒表達、合作和承擔小任務。", period: "校方特刊：55周年版本", sourceUrl: "https://www.puili.edu.hk/attachment/upload/files/%E6%B5%B8%E4%BF%A1%E6%9C%83%E5%9F%B9%E7%90%86%E5%AD%B8%E6%A0%A155%E5%91%A8%E5%B9%B4%E7%89%B9%E5%88%8AFINAL.pdf" },
    { label: "幼稚園和小學同校，不代表升小有自動學位", value: "校方網站分列幼稚園K1收生、幼稚園畢業生升讀小一統計及小學資訊。家長宜分別查明當屆幼稚園取錄流程、小一申請資格與畢業生去向統計的年度及分母；不可把小學部存在理解成幼稚園生必然直升。", sourceUrl: "https://www.puili.edu.hk/tc/" },
  ] }]),

  profile("138177", "按教育局校號138177及又一村石竹路2A號識別幼稚園部。該校另設小學部；私立收費、課程及優先取錄安排均按幼稚園部官方公告，不與小學部混用。", "https://www.krs.edu.hk/~kindergarten/", [
    { label: "九龍禮賢學校幼稚園部：官方首頁", scope: "幼稚園部當屆公告、課程活動及收生資訊。", url: "https://www.krs.edu.hk/~kindergarten/index.html" },
    { label: "九龍禮賢學校幼稚園部：本園特點", scope: "教學語言、閱讀、品德靈育、持續評估與小一適應安排。", url: "https://www.krs.edu.hk/~kindergarten/school_intro/advantage/advantage.html" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言及師生比例等概覽欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1381770001" },
  ], [{ title: "中文主課、閱讀與小一銜接", featured: true, note: "校方公布有小學部優先取錄安排，但仍須符合當屆條件及程序。", details: [
    { label: "日常以中文為主，另有固定英語與普通話活動", value: "幼稚園部介紹日常課堂以中文為主要教學語言，每週安排多次英語會話和英文活動，並設每週普通話小組。這比單看教育局概覽的主要語言欄更能說明語言結構；如家庭重視英語沉浸程度，仍應索取目標級別的課表和活動時數。", sourceUrl: "https://www.krs.edu.hk/~kindergarten/school_intro/advantage/advantage.html" },
    { label: "優先取錄是校方公布的制度安排，不等於保證升讀", value: "校方表示低班下學期末由小學部老師與幼兒進行輕鬆面談，並設小學部優先取錄計劃。家長應確認當屆資格、名額、評估與註冊條件；即使有優先安排，也不宜把它當作無條件直升承諾。", sourceUrl: "https://www.krs.edu.hk/~kindergarten/school_intro/advantage/advantage.html" },
  ] }]),

  profile("158887", "按教育局校號158887及馬鞍山錦英苑校址識別。課程特色以張煊昌幼稚園官方課程頁為準；舊生或校友聯會關係不推論為升學優勢。", "https://www.cuhkfaatckg.edu.hk/", [
    { label: "香港中文大學校友會聯會張煊昌幼稚園：課程簡介", scope: "六大學習範疇、語文課程、STEAM解難與藝術課程的校方說明。", url: "https://www.cuhkfaatckg.edu.hk/?page_id=108" },
    { label: "香港中文大學校友會聯會張煊昌幼稚園：學校簡介", scope: "辦學團體及創辦年份背景。", url: "https://www.cuhkfaatckg.edu.hk/?page_id=106" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及年度學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1588870001" },
  ], [{ title: "生活主題、語文與STEAM探索", featured: true, details: [
    { label: "校本課程以生活主題串連六個學習範疇", value: "校方按教育局2017課程指引設計六個學習範疇，透過生活化主題和遊戲作綜合學習。這種編排把語文、數學、自然、體能、藝術和群體生活放在日常情境中；家長可問清課堂是否留有足夠時間讓幼兒提問、操作和分享，而非只完成預設作品。", sourceUrl: "https://www.cuhkfaatckg.edu.hk/?page_id=108" },
    { label: "英語、普通話及STEAM安排應按級別理解", value: "校方列明K1採用劍橋英語教材與外籍教師互動，K2及K3另有自然拼音教材；普通話及STEAM元素亦見於課程介紹。這些資料呈現校方課程安排，但不能推算每天各語言課時或孩子的結果，報名前宜索取當屆時間表。", sourceUrl: "https://www.cuhkfaatckg.edu.hk/?page_id=108" },
  ] }]),

  profile("158160", "按教育局校號158160及沙田顯徑邨顯德樓校址識別。校方公布的招生名額僅適用於所列學年，不可外推至其他年度。", "https://www.stfa-llsystkg.edu.hk/", [
    { label: "順德聯誼總會梁李秀娛沙田幼稚園：官方網站", scope: "辦學宗旨、課程方向、招生及校舍聯絡資料。", url: "https://www.stfa-llsystkg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1581600001" },
    { label: "教育局《學校位置及資料》", scope: "校號、校址與學校身份。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=158160000111" },
  ], [{ title: "文行忠信與生活體驗課程", featured: true, details: [
    { label: "辦學價值把知識、品行與責任感放在一起", value: "學校以母會校訓「文、行、忠、信」作育人綱要，課程介紹另列語文、歷奇、體驗和潛能發展四個方向。家長可觀察價值教育是否落在幼兒可理解的日常情境，例如合作、守信和照顧物品，而不只看校訓文字。", sourceUrl: "https://www.stfa-llsystkg.edu.hk/" },
    { label: "招生名額須按年度及班別核實", value: "校方網頁會公布特定年度的招生安排和名額，這只能反映該年度公布的班別計劃，不能直接當作當前K1實際空缺或錄取機率。查詢時應同時確認半日／全日班、出生日期範圍、註冊費與全日膳食費。", sourceUrl: "https://www.stfa-llsystkg.edu.hk/" },
  ] }]),

  profile("158208", "按教育局校號158208及上水天平邨天祥樓校址識別「分校」，不與上水惠州幼稚園其他校址混為一頁。設施與容額資料保留原概覽統計年份。", "https://www.sswckge.edu.hk/", [
    { label: "上水惠州幼稚園（分校）：校方網站", scope: "分校身份、聯絡、上課時間、收費和入學資訊。", url: "https://www.sswckge.edu.hk/" },
    { label: "上水惠州幼稚園（分校）：教育局2025/26概覽", scope: "校號158208、校址0001、創校年份、2024年9月課室容額與設施；數據按原年度標記。", url: "https://www.sswckge.edu.hk/wp-content/uploads/2025/10/%E5%B9%BC%E7%A8%9A%E5%9C%92%E5%8F%8A%E5%B9%BC%E7%A8%9A%E5%9C%92%E6%9A%A8%E5%B9%BC%E5%85%92%E4%B8%AD%E5%BF%83%E6%A6%82%E8%A6%BD-2025_26-%E5%AD%B8%E5%B9%B4.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "當屆班制、語言、師生比例與收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1582080001" },
  ], [{ title: "分校身份、校舍容量與資料年份", featured: true, details: [
    { label: "這是天平邨分校，資料不能與其他校址互換", value: "教育局及校方資料均將本校址列為上水惠州幼稚園（分校），地址為天平邨天祥樓地下。申請前要確認孩子報讀的確是此校址，因為同一辦學團體的校舍可能有不同班制、交通及收費。", sourceUrl: "https://www.sswckge.edu.hk/" },
    { label: "概覽課室容額不是當屆招生名額", value: "校方刊載的2025/26概覽列出課室容額279人，該項統計標示為2024年9月資料，反映校舍課室核准容量，不等於當屆K1學額或仍有空缺。實際班數和收生安排須看最新招生公告或直接向校方查詢。", period: "概覽：2025/26；課室容量統計：2024年9月", sourceUrl: "https://www.sswckge.edu.hk/wp-content/uploads/2025/10/%E5%B9%BC%E7%A8%9A%E5%9C%92%E5%8F%8A%E5%B9%BC%E7%A8%9A%E5%9C%92%E6%9A%A8%E5%B9%BC%E5%85%92%E4%B8%AD%E5%BF%83%E6%A6%82%E8%A6%BD-2025_26-%E5%AD%B8%E5%B9%B4.pdf" },
  ] }]),

  profile("157511", "按教育局校號157511及沙田隆亨邨賞心樓校址識別。課程與語言特色採用呂馮鳳紀念幼稚園官方說明；活動例子不推論為每名幼兒的固定參與安排。", "https://www.twghlffkg.edu.hk/", [
    { label: "東華三院呂馮鳳紀念幼稚園：官方網站", scope: "校方課程、繪本教學、語言活動、招生和聯絡資料。", url: "https://www.twghlffkg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1575110001" },
    { label: "教育局《學校位置及資料》", scope: "校號157511、隆亨邨校址及學校身份。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=157511000111" },
  ], [{ title: "遊戲啟迪潛能與繪本語文", featured: true, details: [
    { label: "校方以遊戲和多媒體支持幼兒建構知識", value: "學校以「創新幼兒教學、遊戲啟迪潛能」作特色定位，並表示使用不同媒體協助幼兒從多方面建構知識。這是課程理念說明；家長可在參觀時留意教師如何提問、延伸遊戲，以及孩子有沒有足夠自主探索時間。", sourceUrl: "https://www.twghlffkg.edu.hk/" },
    { label: "繪本與日常英語是校方明確提及的語言接觸方式", value: "官方介紹指出學校利用繪本增加聆聽和閱讀經驗，並安排外籍教師在課堂及日常交流中提供英語接觸。這不能替代按級別課表確認語言比例；家長若以英語輸入為主要目標，應問清每週活動頻次及中文、普通話的安排。", sourceUrl: "https://www.twghlffkg.edu.hk/" },
  ] }]),

  profile("157597", "按教育局校號157597及沙田隆亨邨慧心樓校址識別。官方活動頁顯示主題式生活體驗與社區參訪；活動紀錄不代表每級每年均安排相同項目。", "https://www.sfckglh.edu.hk/web/index.php", [
    { label: "港九街坊婦女會孫方中幼稚園：官方首頁", scope: "校方最新活動、招生及校務公告。", url: "https://www.sfckglh.edu.hk/web/index.php" },
    { label: "港九街坊婦女會孫方中幼稚園：活動紀錄", scope: "主題教學、社區參訪、生活實踐及幼小體驗的校方活動紀錄。", url: "https://www.sfckglh.edu.hk/web/activities.php?tab=3" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1575970001" },
  ], [{ title: "主題教學與社區體驗", featured: true, details: [
    { label: "活動紀錄呈現把學習帶到社區的做法", value: "校方活動頁記錄幼兒到街市、消防局、科學館及文化場館參觀，也列出配合主題進行購物、環保和小學體驗的活動。這些例子顯示生活經驗可成為課程素材，但不能據此推斷每個年級的固定頻率；家長可查詢當屆校曆和活動是否涉及額外費用或家長陪同。", sourceUrl: "https://www.sfckglh.edu.hk/web/activities.php?tab=3" },
    { label: "小學參訪有助熟悉環境，並不等於升學安排", value: "校方活動紀錄包含幼兒參觀小學及體驗課堂。這有助孩子接觸小學環境，但不是直升或取錄證據；家長應另查學校是否有關聯小學、當屆申請機制和畢業生去向。", sourceUrl: "https://www.sfckglh.edu.hk/web/activities.php?tab=3" },
  ] }]),

  profile("325864", "按教育局校號325864及藍田匯景花園校址識別啟思幼稚園幼兒園（匯景）。校方同一校址有幼稚園、幼兒園與非本地課程，費用及年齡按課程分開核實。", "https://skg.creative.edu.hk/", [
    { label: "啟思幼稚園幼兒園（匯景）：校舍官方頁", scope: "匯景校舍設施、校本課程、班別、上課時間及2026/27收費。", url: "https://skg.creative.edu.hk/" },
    { label: "啟思幼稚園：課程特色", scope: "幼兒班至高班的課程設計及探索式學習。", url: "https://creative.edu.hk/curriculum/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "登記班制、授課語言及概覽欄位；不取代校方不同課程的收費頁。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3258640001" },
  ], [{ title: "生活主題、自由選擇與校址課程分流", featured: true, note: "匯景校方頁將幼稚園部、幼兒園部和非本地課程分列；比較前須先確定申請課程。", details: [
    { label: "主題學習配合自選活動，強調從生活中應用", value: "匯景校舍介紹以幼兒為本、生活主題和自選學習活動作課程特點，讓孩子在遊戲和操作中練習概念；校舍亦公布戶外遊戲場地及藝術活動。這種環境適合重視探索和創作的家庭，參觀時可觀察不同年齡孩子是否都能使用活動區，而非只看設施數量。", sourceUrl: "https://skg.creative.edu.hk/" },
    { label: "同校址不同課程的年齡和費用不同", value: "官方頁把參加幼稚園教育計劃的本地半日／全日班、非本地課程及幼兒園服務分開列出；2026/27費用亦因課程而異。申請前要確認課程名稱、學籍類別、全日膳食費和收費是否已獲批，不能以集團其他校舍或課程費用代替。", period: "校方校舍頁：2026/27", sourceUrl: "https://skg.creative.edu.hk/" },
  ] }]),

  profile("159220", "按教育局校號159220及荃灣柴灣角安賢街校址識別。辦學理念採用領報幼稚園校方年度報告，並標明年份；舊計劃不直接代表現屆日常做法。", "https://www.ack.edu.hk/", [
    { label: "天主教領報幼稚園：官方網站", scope: "學校身份、校方消息及幼稚園聯絡入口。", url: "https://www.ack.edu.hk/" },
    { label: "天主教領報幼稚園：2019/20學校報告", scope: "該年度遊戲教學、自主學習及課程檢視紀錄；不當作現屆成效。", url: "https://www.ack.edu.hk/uploads/sub_menu_file/413/2020-11-06_19-20%20School%20Report%20%26%2020-21%20School%20Plan.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及年度學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1592200001" },
  ], [{ title: "遊戲教學與幼兒自主學習", featured: true, note: "課程例子來自2019/20校方報告，作為歷史做法參考；當屆實施須向學校確認。", details: [
    { label: "校方曾以遊戲教學提升自主學習", value: "2019/20校方報告記錄了參與「遊戲·學習·成長」計劃、共同備課、觀課和課後檢討，並讓幼兒在自選活動中按Plan-Do-Review進行。這可作為學校曾採用的課程方法，不應直接推定2026/27仍以相同頻次或版本實施。", period: "校方報告：2019/20", sourceUrl: "https://www.ack.edu.hk/uploads/sub_menu_file/413/2020-11-06_19-20%20School%20Report%20%26%2020-21%20School%20Plan.pdf" },
    { label: "參觀時可核對遊戲區與教師介入方式", value: "對重視自主探索的家庭，最有用的不是只確認學校是否採用遊戲教學，而是觀察幼兒能否選擇材料、教師如何追問和延伸想法，以及活動後是否有分享或回顧。建議向校方索取當屆課程安排和幼兒班適應支援資料。", sourceUrl: "https://www.ack.edu.hk/" },
  ] }]),

  profile("158895", "按教育局校號158895及大埔富亨邨亨翠樓校址識別。課程、支援和語言按大埔循道衛理幼稚園官方頁；招生日期與費用須按申請年度更新。", "https://tpmk.edu.hk/zh-hant/", [
    { label: "大埔循道衛理幼稚園：課程與教學資料", scope: "生活化、感官探索、專題學習、語言課程與持續評估。", url: "https://tpmk.edu.hk/course-information/" },
    { label: "大埔循道衛理幼稚園：辦學理念", scope: "基督教全人教育與家庭、社區合作方向。", url: "https://tpmk.edu.hk/zh-hant/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1588950001" },
  ], [{ title: "感官探索、專題學習與兩文三語", featured: true, details: [
    { label: "專題學習重過程，讓孩子從生活經驗建構理解", value: "校方以兒童為本設計生活化和感官探索活動，專題學習以幼兒興趣為起點，包含資料蒐集、討論、分析和反思，並強調學習過程由幼兒參與推動。這種課程需要孩子表達觀察和持續投入；家長可了解教師如何支援較慢熱或需要更多語言協助的幼兒。", sourceUrl: "https://tpmk.edu.hk/course-information/" },
    { label: "粵語為日常溝通基礎，英語及普通話另有專科活動", value: "校方描述幼兒以粵語作主要溝通語言，並由專科教師每週安排英語和普通話活動。網站沒有足以推算全日語言比例的逐日課表；若家庭期待高密度英語或普通話，應先確認班別、活動時長和日常語境。", sourceUrl: "https://tpmk.edu.hk/course-information/" },
  ] }]),
];
