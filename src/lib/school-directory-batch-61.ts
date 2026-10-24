import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const registered = registeredDirectory as PilotSchool[];
const DATASET = "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";

type ReviewedAnnualData = {
  ratio: string;
  fees: string;
  feeSummary: string;
  classrooms: number;
  teachers: number;
  spaces: string;
  principal: string;
  opened: string;
  telephone: string;
};

// Read against the actual 2026/27 KGP tables on 2026-10-24. Staffing and PN
// measurements are dated September 2025; fees are for academic year 2026/27.
// These replace legacy directory values whose original year was not retained.
const REVIEWED_ANNUAL_DATA: Record<string, ReviewedAnnualData> = {
  "158259": { ratio: "上午1:7.0；下午1:2.3", fees: "沙田校址K1至K3上午及下午班扣減政府資助後免費；概覽未列全日班學費，其他費用另計。校方招生頁另列全日班時間，實際是否開班須向校方確認。", feeSummary: "沙田校址半日班免費；全日班安排須確認", classrooms: 6, teachers: 9, spaces: "多功能活動區、探索角、幼兒藝術區", principal: "任淑芳", opened: "1987", telephone: "26063933" },
  "156698": { ratio: "上午1:7.0；下午1:4.0", fees: "概覽列K1上午班、K3上午班及K2下午班扣減政府資助後全年1,375元、11期；其餘級別／時段未列費用，不推定開班或免費。", feeSummary: "已列半日班全年1,375元／11期，級別與時段見下方", classrooms: 4, teachers: 3, spaces: "特別活動室", principal: "羅海彤", opened: "1979", telephone: "29838811" },
  "158658": { ratio: "上午1:11.1；下午1:8.9", fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年13,332元、11期。膳食、校服、書簿等費用另核對。", feeSummary: "半日班免費；全日班全年13,332元／11期", classrooms: 8, teachers: 11, spaces: "家長資源室、輔導組活動室、多元智能室", principal: "甘愷琴", opened: "1990", telephone: "24607778" },
  "159050": { ratio: "上午1:9.9；下午1:8.0", fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年3,530元、10期。校方網站目前只列上午及全日時間，下午班實際開設情況需另問校方。", feeSummary: "半日班免費；全日班全年3,530元／10期", classrooms: 6, teachers: 7, spaces: "唱遊及體能室、自由遊戲區、多用途學習室", principal: "陳慧雯", opened: "1993", telephone: "24480368" },
  "158747": { ratio: "上午1:9.4；下午1:8.1", fees: "K1至K3上午班扣減政府資助後免費；全日班各級全年11,660元、11期。概覽未列下午班學費，不以登記時段推定當屆開班。", feeSummary: "上午班免費；全日班全年11,660元／11期", classrooms: 8, teachers: 11, spaces: "室內禮堂", principal: "陳孟宜", opened: "1990", telephone: "24557187" },
  "158739": { ratio: "上午1:5.7；下午1:4.6", fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年18,000元、10期。其他雜費及校車費另核對。", feeSummary: "半日班免費；全日班全年18,000元／10期", classrooms: 8, teachers: 7, spaces: "禮堂、輔導室、多用途室、體能遊戲室及不同主題學習區", principal: "范翠霞", opened: "1990", telephone: "27030981" },
  "158119": { ratio: "上午1:7.2；下午1:6.8", fees: "K1至K3上午及下午班扣減政府資助後免費；全日班各級全年8,200元、10期。膳食、延展服務及其他雜費另核對。", feeSummary: "半日班免費；全日班全年8,200元／10期", classrooms: 6, teachers: 9, spaces: "多用途活動室、體能室、音樂室、英文室及圖書室", principal: "辛文貞", opened: "1986", telephone: "26511778" },
  "158054": { ratio: "上午1:8.9；下午1:6.9", fees: "K1至K3上午班扣減政府資助後免費；全日班各級全年14,900元、10期。概覽未列下午班學費，班別供應須按當屆招生確認。", feeSummary: "上午班免費；全日班全年14,900元／10期", classrooms: 8, teachers: 8, spaces: "體能室、圖書室、資源室", principal: "勞麗雲", opened: "1986", telephone: "24617380" },
  "215724": { ratio: "上午1:8.1；下午1:3.1", fees: "概覽及校方招生頁均列半日班全年78,100元、10期；沒有參加幼稚園教育計劃。校方另列申請費600元，其他費用按當屆收費表。", feeSummary: "半日班全年78,100元／10期；申請費600元", classrooms: 6, teachers: 10, spaces: "概覽未列其他特別室資料；校園空間以校方導賞核對", principal: "Maria Teresa J Baguio", opened: "1986", telephone: "25250922" },
  "520071": { ratio: "上午1:8.3；下午1:6.5", fees: "概覽列K1至K3上午及下午班扣減政府資助後免費，另列各級全日班全年21,000元、10期；校方校舍頁目前只列上午及下午班作息，全日班是否實際開設需先確認。", feeSummary: "半日班免費；全日班是否開設及費用須核對", classrooms: 6, teachers: 19, spaces: "小組活動室、多用途室、探索區", principal: "謝佩珊", opened: "1996", telephone: "28817848" },
};

const LANGUAGE_NOTES: Record<string, string> = {
  "158259": "校方強調兩文三語；各級課時比例未公開",
  "156698": "公開課程資料未列主要授課語言及逐級課時，請向校方確認",
  "158658": "未公開逐級語言課時，粵語／普通話／英語安排須另核對",
  "159050": "校方列粵語、英語及普通話；課時比例未公開",
  "158747": "校方申報每日有外籍教師英語活動；主要授課語言與比例另核對",
  "158739": "校方設語文／雙語班；語言組合及比例按班別核對",
  "158119": "設外籍英語及普通話教師；逐級課時未公開",
  "158054": "校方2026/27申請表列全校雙語班；語言比例按班別核對",
  "215724": "英語及普通話課程；按校方當屆課程與年級確認語言安排",
  "520071": "設外籍教師英語活動；粵語／普通話／英語課時比例未公開",
};

function profile(
  schoolNumber: string,
  sourceNote: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
  overrides: Partial<PilotSchool> = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const annual = REVIEWED_ANNUAL_DATA[schoolNumber];
  if (!annual) throw new Error(`Verified annual data ${schoolNumber} not found`);
  const overviewUrl = `https://kgp2026.kindergartenprofile.com/school/?schid=${schoolNumber}0001`;
  const overview: NonNullable<PilotSchool["detailSections"]>[number] = {
    title: "幼稚園概覽2026/27｜校址0001",
    note: "教職員、師生比例及幼兒服務統計截至2025年9月；學費為2026/27學年。師生比例按時段統計，並非每班人數；核准收費表不等於仍有學位或每個班別均實際開設。",
    details: [
      { label: "PN／2至3歲服務", value: "概覽列明未有提供2至3歲幼兒服務；此項為2025年9月資料。申請其他年齡級別前仍須確認當屆安排。", period: "2025年9月", sourceUrl: overviewUrl },
      { label: "分時段師生比例", value: `${annual.ratio}。這是該時段整體師生比例，不代表每班由一位教師照顧相同人數。`, period: "2025年9月", sourceUrl: overviewUrl },
      { label: "師資與課室", value: `校長及教學人員共${annual.teachers}人（不包括任職0至2歲級別的教師）；註冊課室${annual.classrooms}間。`, period: "人員統計：2025年9月；課室按2026/27概覽", sourceUrl: overviewUrl },
      { label: "校舍學習空間", value: annual.spaces, period: "2026/27概覽所列資料", sourceUrl: overviewUrl },
      { label: "全年學費與期數", value: annual.fees, period: "2026/27學年", sourceUrl: overviewUrl },
    ],
  };
  return {
    ...school,
    schoolType: "非牟利幼稚園",
    telephone: annual.telephone,
    principal: (school.registryLocations || 1) > 1 ? undefined : annual.principal,
    establishedYear: annual.opened,
    gradeSpan: "K1至K3；班別按校方當屆安排",
    tuition: `2026/27：${annual.feeSummary}`,
    language: LANGUAGE_NOTES[schoolNumber],
    website,
    ...overrides,
    omitDirectoryDetailTitles: (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽") || section.title === "聯絡與授課資料").map((section) => section.title),
    sourceNote: `${school.sourceNote} ${sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    sources: [...new Map([
      ...school.sources.filter((source) => source.label !== "學校官方網站" && !source.url.includes("kgp2026.kindergartenprofile.com")),
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "資料集版本與教育局學校位置資料的更新資訊。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}及註冊校址識別；資料快照截至2026-10-23。`, url: EDB_REGISTRY },
      { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "2025年9月師資、分時段師生比及幼兒服務統計；2026/27核准學費。班別供應與空缺須另問校方。", url: overviewUrl },
      { label: "學校官方網站", scope: "本頁採用的校方課程、招生及聯絡資料入口；年度安排以當屆文件為準。", url: website },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [...details, overview],
  };
}

/** Kindergarten profile batch 61: school-specific details tied to EDB school/location records. */
export const KINDERGARTEN_BATCH_61: PilotSchool[] = [
  profile("158259", "按教育局校號158259識別真理浸信會幼稚園；本校號有沙田偉華中心（校址0001）及觀塘宏緻苑（校址0002）兩個登記校址。校方現行招生頁的地址與班級資料對應沙田校址；課程及時段不推及觀塘校址。", "https://www.tbcww.edu.hk/", [
    { label: "教育局沙田區學校名錄（2026-09-30）", scope: "校號158259、校址0001地址、聯絡及當期授課時段。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-st.html" },
    { label: "真理浸信會幼稚園：學校願景及使命", scope: "校方自述的基督教價值、品德教育、兒童興趣及家校合作方向。", url: "https://www.tbcww.edu.hk/學校願景及使命/" },
    { label: "真理浸信會幼稚園：入學申請及班級資料", scope: "校方公布的沙田校址、班級時段及2027/28 K1申請流程；日期只適用該屆。", url: "https://www.tbcww.edu.hk/入學申請/" },
    { label: "真理浸信會幼稚園：活動影片及校本活動", scope: "校方公開的K1至K3主題活動示例；不代表每名學生或每週均參與相同活動。", url: "https://www.tbcww.edu.hk/活動影片/" },
  ], [{ title: "基督教品格教育與活動學習", featured: true, details: [
    { label: "以品格、兒童興趣和家校夥伴為辦學主軸", value: "校方使命頁提出以基督教精神培養品格，按兒童能力和興趣設計有啟發性的活動，並與家長建立夥伴關係。對家庭而言，參觀時可直接追問理念如何呈現在日常規則、情緒引導和家校溝通，而不是只看宗教標籤；這是校方自述，並非外部成效評估。", sourceUrl: "https://www.tbcww.edu.hk/學校願景及使命/" },
    { label: "校方展示主題活動，但不等同固定課時", value: "校方影片頁可見K2方案教學、K3書法等活動示例，反映課程有主題探索與作品表達的安排。頁面沒有列每級活動頻率或普通話、英語課時；若家庭重視語言比例或課程密度，應索取沙田校址所申請班別的現行時間表。", sourceUrl: "https://www.tbcww.edu.hk/活動影片/" },
    { label: "全日班安排有資料差異，須連同校址確認", value: "校方招生頁地址仍列沙田偉華中心，並列全日班作息；2026/27概覽的沙田校址卻未列全日班學費，註冊費欄亦寫沒有開辦全日班。教育局另有觀塘宏緻苑校址0002登記，需要全日照顧的家庭應直接確認申請校址及當屆班別。登記表單一時段也不能當作完整開班名單。", period: "教育局概覽：2026/27；校方招生頁查閱：2026-10-24", sourceUrl: "https://www.tbcww.edu.hk/入學申請/" },
  ] }]),

  profile("156698", "按教育局校號156698及坪洲永興街67號識別南英幼稚園。教育局2026/27名錄仍列該校；校方官網自述採活動、體驗與遊戲學習及高瞻教學法。官網課程頁未標資料學年，故不把收費或招生細節推作現況。", "https://www.namying.edu.hk/", [
    { label: "教育局離島區學校名錄（2026-09-30）", scope: "校號156698、校址0001、電話、官方網站及在冊名錄狀態。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-i.html" },
    { label: "南英幼稚園：課程特色", scope: "校方自述的六大學習範疇、活動／體驗學習及高瞻教學法。頁面未標學年。", url: "https://www.namying.edu.hk/" },
    { label: "南英幼稚園：2023/24學校報告", scope: "該學年的社區主題及體驗活動例子；不當作本學年活動表。", url: "https://www.namying.edu.hk/wp-content/uploads/2024/10/2023-2024%E5%AD%B8%E5%B9%B4%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%E5%AE%8C%E6%88%90.pdf" },
  ], [{ title: "體驗學習、高瞻教學與坪洲生活", featured: true, details: [
    { label: "把坪洲日常經驗帶入主題活動", value: "南英2023/24學年學校報告記錄，教師曾以坪洲流浪動物議題設計主題，安排幼兒認識動物照顧與領養。這類地方連結能讓孩子把課堂概念接到熟悉的社區情境；它是該學年活動例子，不代表每年固定安排或所有級別都參加。", period: "校方學校報告：2023/24學年", sourceUrl: "https://www.namying.edu.hk/wp-content/uploads/2024/10/2023-2024%E5%AD%B8%E5%B9%B4%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%E5%AE%8C%E6%88%90.pdf" },
    { label: "校方採用學習區和幼兒主導探索", value: "校方課程頁稱以六個學習範疇統整活動教學、參觀、小組活動及遊戲，並採用高瞻教學法，在課室設置閱讀、探索、積木和扮演等學習區。家長可在參觀時觀察幼兒是否有選擇材料、提出問題和回顧活動的機會；頁面沒有提供各活動的每週時數。", sourceUrl: "https://www.namying.edu.hk/" },
    { label: "入學年齡和申請方式先向校方確認", value: "校方網站列出入學年齡為2歲8個月及全年接受申請，但未標明資料學年。這可作聯絡校方的起點，不宜直接視為下一屆收生條款；坪洲家庭也應一併確認渡船、放學時間和缺席時的照顧安排。", sourceUrl: "https://www.namying.edu.hk/" },
  ] }]),

  profile("158658", "按教育局校號158658、校址編號0001及屯門建生邨裕生樓A、B翼地下識別佳寶幼稚園第二分校（建生邨）。校方網站本次瀏覽器未能驗證網站憑證，課程、支援及收費以可查閱的2026/27教育局概覽為主要依據。", "http://www.guideposts.edu.hk", [
    { label: "教育局屯門區學校名錄（2026-09-30）", scope: "校號158658、校址0001、建生邨地址、電話及班制登記。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tm.html" },
    { label: "教育局《幼稚園教育計劃》2026/27參加名單：屯門區", scope: "校號158658所屬的建生分校參加計劃名單。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2627_TM_23Apr2026.pdf" },
  ], [{ title: "操作探索、主題教學與持續觀察", featured: true, details: [
    { label: "用主題和操作活動連結生活技能", value: "2026/27概覽所載校方資料列出主題綜合教學，透過分組、遊戲、角色扮演、實物觀察和戶外參觀，讓幼兒接觸科學探索、生活技能、解難及情緒處理。家庭參觀時可看材料是否容許孩子反覆操作，以及教師如何回應不同進度。", period: "教育局概覽：2026/27校方申報", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1586580001" },
    { label: "用持續觀察記錄跟進學習", value: "校方在概覽中申報以持續觀察記錄評估幼兒進度，並列有家長觀課、家長教育講座和月刊等溝通方式。家長可了解觀察紀錄多久回饋一次、如何討論孩子的需要；公開資料沒有逐級英語或普通話課時，語言安排仍須另問校方。", period: "教育局概覽：2026/27校方申報", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1586580001" },
    { label: "非華語及有需要幼兒有支援安排", value: "概覽列出非華語中文學習支援、傳譯／翻譯，以及教育心理學家、到校學前康復等支援途徑。有需要的家庭應了解評估、轉介、輪候和可提供的頻率；服務名稱不能當作每位學生自動獲得個別訓練的承諾。", period: "教育局概覽：2026/27校方申報", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1586580001" },
  ] }]),

  profile("159050", "按教育局校號159050及天水圍天瑞邨瑞勝樓校址識別嗇色園主辦可瑞幼稚園。課程描述採用校方自述；2026/27招生文件的日期屬該學年，不能當作下一屆時間表。", "https://www.hoshuikg.edu.hk/", [
    { label: "教育局元朗區學校名錄（2026-09-30）", scope: "校號159050、校址0001、電話、網站與班制登記。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-yl.html" },
    { label: "嗇色園主辦可瑞幼稚園：認識可瑞", scope: "校方自述的學生為本、因材施教、遊戲探索和品德教育方向。", url: "https://www.hoshuikg.edu.hk/ho-lap/" },
    { label: "嗇色園主辦可瑞幼稚園：2026/27 K1收生資料", scope: "當屆收生準則、面見形式及申請要求；日期只適用2026/27年度。", url: "https://www.hoshuikg.edu.hk/wp-content/uploads/2025/10/2026-27%E5%AD%B8%E5%B9%B4%E5%B9%BC%E5%85%92%E7%8F%AD%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%B3%87%E6%96%99.pdf" },
  ], [{ title: "幼兒主導探索與語言安排", featured: true, details: [
    { label: "課程自述以遊戲、思考和探索為主線", value: "可瑞介紹頁稱，校本課程按幼兒發展需要設計，透過遊戲、思考、探索及戶外體驗引導學習，並重視品德和學習態度。對孩子來說，這種定位適合喜歡動手和在活動中理解概念的家庭；參觀時可觀察教師如何把自由遊戲轉成有目的的提問和回顧。這是校方理念，不是獨立成效評估。", sourceUrl: "https://www.hoshuikg.edu.hk/ho-lap/" },
    { label: "校方列粵語、英語和普通話，但沒有公開比例", value: "校方網站列出兩文三語及粵語、英語、普通話，沒有公開各級課時或哪一種語言佔主導。若家庭特別在意英語或普通話輸入量，應索取申請級別的時間表，不要把「兩文三語」理解成三種語言平均分配。", sourceUrl: "https://www.hoshuikg.edu.hk/" },
    { label: "上午班／全日班時段資訊需核對當屆安排", value: "校方網站首頁列上午班和全日班時間；2026/27教育局概覽則列上午、下午及全日班。兩者列示不完全一致，申請前應向校方確認目標級別當屆是否開設下午班及實際放學時間。", period: "校方網站及教育局概覽：2026/27", sourceUrl: "https://www.hoshuikg.edu.hk/" },
  ] }]),

  profile("158747", "按教育局校號158747、校址編號0001及屯門兆邦苑地下單位1至10識別田景邨浸信會呂郭碧鳳幼稚園。現行特色採用校方2025/26活動資料；較早概覽中的費用與人數不作現況。", "https://www.tkkg.edu.hk/", [
    { label: "教育局屯門區學校名錄（2026-09-30）", scope: "校號158747、校址0001、地址、電話及授課時段。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tm.html" },
    { label: "田景邨浸信會呂郭碧鳳幼稚園：2025/26中華文化校本活動", scope: "校方公布的K1至K3節慶、文化和主題學習活動例子；不是每週固定課時。", url: "https://www.tkkg.edu.hk/?lang=zh&page_id=7778" },
    { label: "田景邨浸信會呂郭碧鳳幼稚園：校園消息", scope: "校方公開的戶外環境學習和環保活動；只反映所列學年及參與年級。", url: "https://www.tkkg.edu.hk/" },
    { label: "教育局《幼稚園概覽》：校號158747、校址0001", scope: "按校址列出的2026/27班制、語言、師生比例及收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1587470001" },
  ], [{ title: "主題探究、文化活動與語言課程邊界", featured: true, details: [
    { label: "從孩子共同建構的主題看學習方式", value: "校方2025/26活動資料記錄，K3學生曾以「田景體育館」為主題建構場景，再把健康知識和運動活動放入其中。這提供了比活動清單更具體的課堂例子：孩子有機會把主題、製作和角色體驗連在一起；但這是校方公布的特定活動，不能推論為每個單元都採相同方法。", period: "校方活動資料：2025/26學年", sourceUrl: "https://www.tkkg.edu.hk/?lang=zh&page_id=7778" },
    { label: "課外文化活動需確認參與方式", value: "校方同一年度資料列出粵劇、中國舞等興趣班或體驗項目，其中部分活動按報名或年級安排。家庭若希望孩子固定參加，應查清頻率、名額、費用和是否屬常規課堂；不要把興趣活動等同全體學生的日常課時。", period: "校方活動資料：2025/26學年", sourceUrl: "https://www.tkkg.edu.hk/?lang=zh&page_id=7778" },
    { label: "校方申報每日有外籍教師英語活動", value: "2026/27概覽所載校方資料稱，英、美外籍教師每天以小組及大班形式教授英語，並透過歌曲、故事、遊戲和戶外觀察練習使用。這是具體的語言接觸安排；文件仍未列每節長度、粵語／普通話比例或各班差異，家長應按申請級別查詢。", period: "教育局概覽：2026/27校方申報", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1587470001" },
  ] }]),

  profile("158739", "按教育局校號158739、校址編號0001及將軍澳景林邨景楠樓地下識別香港浸信會聯會香港西北扶輪社幼稚園。校方有語文／雙語班等不同安排，必須按申請班別核對，不能由校名推斷授課語言比例。", "https://www.bcrotaryclubkg.edu.hk/", [
    { label: "教育局西貢區學校名錄（2026-09-30）", scope: "校號158739、校址0001、景林邨校址、電話及授課班制。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-sk.html" },
    { label: "香港浸信會聯會香港西北扶輪社幼稚園：課程特色", scope: "校方自述的遊戲學習、語文／雙語班、藝術、戶外學習及共融方向。", url: "https://www.bcrotaryclubkg.edu.hk/" },
    { label: "香港浸信會聯會香港西北扶輪社幼稚園：2026/27 K1申請", scope: "當屆面見形式、收生準則和申請條件；不表示下一屆流程不變。", url: "https://www.bcrotaryclubkg.edu.hk/?lang=en&page_id=1899" },
  ], [{ title: "遊戲學習、雙語班與收生條件", featured: true, details: [
    { label: "校方把遊戲、戶外和藝術活動列為課程特色", value: "校方課程頁列出遊戲學習、藝術活動、戶外學習、品德繪本及共融文化等方向。對孩子的實際價值要看活動如何進入日常教學；參觀時可觀察是否有幼兒主動選擇和表達的空間，而不是只按特色標籤判斷。", sourceUrl: "https://www.bcrotaryclubkg.edu.hk/" },
    { label: "有語文／雙語班，申請前要問清班別", value: "校方網站把語文／雙語班列為特色，但沒有在首頁說明不同班別的逐科語言比例。若家庭目標是粵語、普通話或英語沉浸，應確認所申請級別開設哪種班、授課語言和每週安排。", sourceUrl: "https://www.bcrotaryclubkg.edu.hk/" },
    { label: "2026/27申請曾列兄姊、本區及家庭需要等因素", value: "校方當屆文件列出兄姊在校、全日班家庭需要、本區居住及面見表現等考慮，並說明學額有限；這是2026/27 K1的規則，不代表2027/28完全相同，也不能換算成錄取機率。", period: "校方公布：2026/27 K1收生", sourceUrl: "https://www.bcrotaryclubkg.edu.hk/wp-content/uploads/2025/07/2026-27%E5%B9%B4%E5%BA%A6%E5%B9%BC%E5%85%92%E7%8F%ADK1%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85.pdf" },
  ] }]),

  profile("158119", "按教育局校號158119及大埔廣福邨廣仁樓210至219號識別聖公會救主堂幼稚園。校方網站現列半日及全日制、英語教師和普通話課；部分頁面有未清理的範例區塊，本頁只採用校址、班制和課程主頁中可辨識的學校資料。", "https://saviourkg.edu.hk/", [
    { label: "教育局大埔區學校名錄（2026-09-30）", scope: "校號158119、校址0001、地址、電話及AM／PM／全日班標示。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tp.html" },
    { label: "聖公會救主堂幼稚園：關於我們", scope: "校方自述的辦學宗旨、活動教學、課程年級與語言教師資料。", url: "https://saviourkg.edu.hk/about/" },
    { label: "聖公會救主堂幼稚園：校園生活及2025/26活動", scope: "校方按年級公布的課室外體驗活動入口；活動範圍依當屆公告。", url: "https://saviourkg.edu.hk/about/" },
    { label: "教育局《幼稚園概覽》：校號158119、校址0001", scope: "2026/27該校址班制、授課語言、師生比例及收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1581190001" },
  ], [{ title: "活動教學、語言接觸與全日照顧", featured: true, details: [
    { label: "以活動教學和基督教全人教育作定位", value: "校方介紹頁稱，以基督教價值培養靈、德、智、體、群、美發展，並透過活動教學讓孩子主動探索。家長可以觀察教師是否讓幼兒操作、提問和分享，而不只看課室設備；這屬校方教育理念，不能直接當作學習成效。", sourceUrl: "https://saviourkg.edu.hk/about/" },
    { label: "校方列英語教師和普通話教師，但沒公布語言比例", value: "校方介紹頁列有外籍英語教師及普通話老師，教育局概覽另按校址列示授課語言。現有公開資料沒有各級每週語言時數；家長若重視英語或普通話輸入，應問清教師進班頻率、授課形式及是否所有班別相同。", sourceUrl: "https://saviourkg.edu.hk/about/" },
    { label: "全日班可能較配合雙職家庭，但要看照顧內容", value: "教育局名錄列上午、下午及全日班，校方頁面亦表示K1至K3設半日和全日制。全日選擇對工作時間較長的家庭較實用，但膳食、延展服務、放學接送和額外收費仍需逐項確認。", period: "教育局名錄：2026-09-30；校方頁面查閱：2026-10-24", sourceUrl: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tp.html" },
  ] }]),

  profile("158054", "按教育局校號158054、校址編號0001及屯門山景邨景麗樓A、B翼地下識別東華三院李黃慶祥紀念幼稚園。校方2026/27申請文件稱全校為雙語班；英語課程細節採用校方課程介紹，實際課時仍需按年級核對。", "https://www.twghlwhckg.edu.hk/", [
    { label: "教育局屯門區學校名錄（2026-09-30）", scope: "校號158054、校址0001、地址、電話與登記班制。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tm.html" },
    { label: "東華三院李黃慶祥紀念幼稚園：課程及收生指南", scope: "校方自述的繪本、遊戲、生活情境、英語活動及非華語支援。", url: "https://www.twghlwhckg.edu.hk/收生指南/" },
    { label: "東華三院幼稚園：2026/27入學申請表", scope: "文件列明該校全校均為雙語班及申請級別；不代表粵普英課時比例。", url: "https://www.twghlwhckg.edu.hk/wp-content/uploads/2025/08/5_2026-27-%E5%85%A5%E5%AD%B8%E5%A0%B1%E5%90%8D%E8%A1%A8-docx.pdf" },
    { label: "教育局《幼稚園概覽》：校號158054、校址0001", scope: "2026/27該校址班制、授課語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1580540001" },
  ], [{ title: "繪本情境、英語接觸與中文支援", featured: true, details: [
    { label: "用繪本和遊戲把六大範疇串成學習情境", value: "校方課程頁說明，以繪本和遊戲建立與日常生活相關的情境，再連結語文、幼兒數學、大自然與生活、體能健康、個人群體及藝術創意。這類安排可讓孩子在故事中接觸不同概念；家庭可追問各級如何延伸閱讀和讓孩子表達，而不是只看繪本數量。", sourceUrl: "https://www.twghlwhckg.edu.hk/收生指南/" },
    { label: "校方以伴讀和生活活動增加英語接觸", value: "校方介紹外籍英語教師團隊，並稱透過繪本、伴讀、討論和生活自理增加英語使用機會；2026/27申請表把所有班別列為雙語班。公開文件未提供英語課時比例，不能據此說英語主導，家長應索取所申請年級時間表。", period: "校方申請表：2026/27年度", sourceUrl: "https://www.twghlwhckg.edu.hk/wp-content/uploads/2025/08/5_2026-27-%E5%85%A5%E5%AD%B8%E5%A0%B1%E5%90%8D%E8%A1%A8-docx.pdf" },
    { label: "非華語支援包括中文共讀和書面翻譯", value: "校方列出在自選區角時段以圖書共讀支援非華語幼兒中文學習，並為家長通告、工作紙及評估報告等安排翻譯。家庭可進一步確認支援語種、服務頻率，以及個別孩子是否需經評估或另作安排。", sourceUrl: "https://www.twghlwhckg.edu.hk/收生指南/" },
  ] }]),

  profile("215724", "按教育局校號215724、校址編號0001及中環波老道10號識別Small World Christian Kindergarten。這是採用國際幼兒課程的私立基督教幼稚園；其Junior／Senior分級不同於本地K1至K3慣例，學費和收生條件按校方當屆文件。", "https://smallworld.edu.hk/", [
    { label: "教育局中西區學校名錄（2026-09-30）", scope: "校號215724、校址0001、地址、電話、英文校名及班制登記。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-cw.html" },
    { label: "Small World Christian Kindergarten：Learning", scope: "校方自述的IEYC、遊戲式學習、全人教育、家校合作和故事式普通話課程。", url: "https://smallworld.edu.hk/learning/" },
    { label: "Small World Christian Kindergarten：2026/27入學及學費", scope: "當屆Junior／Senior年齡、遊戲式面見、滾動收生、申請費及學費。", url: "https://smallworld.edu.hk/admission/" },
  ], [{ title: "IEYC遊戲探索、普通話與國際學前路線", featured: true, details: [
    { label: "以IEYC和遊戲式探究組織學習", value: "校方稱採用國際幼兒課程IEYC及基督教課程，透過教師支架和幼兒發起的探索，涵蓋溝通、探究、身心健康與社交情緒等面向。對家庭而言，這不是本地K1至K3的直接替代品；若孩子稍後轉入本地小學，應額外了解中文識字、書寫和課程銜接安排。", sourceUrl: "https://smallworld.edu.hk/learning/" },
    { label: "普通話以故事書和有意義的遊戲教學", value: "校方介紹其普通話課程以故事書為核心，並稱課程曾與香港教育大學及香港大學合作發展；網站描述聽故事、遊戲和創作等活動。實際每日時數、班級分流和普通話熟練度要求仍應直接向校方確認。", sourceUrl: "https://smallworld.edu.hk/learning/" },
    { label: "2026/27收費及面見流程公開", value: "校方公布2026/27學費每年港幣78,100元、分十期繳付，另列港幣600元申請費；面見採遊戲形式，並按有空位情況全年收生。私立國際課程的總支出還要核對其他雜費、校車和課後安排，全年收生也不代表當下必有學位。", period: "校方公布：2026/27學年", sourceUrl: "https://smallworld.edu.hk/admission/" },
  ] }], { schoolType: "私立國際幼稚園", language: "英語及普通話課程；按校方當屆課程與年級確認語言安排", gradeSpan: "Junior／Senior Kindergarten；年齡及入學級別按校方當屆安排" }),

  profile("520071", "按教育局校號520071及馬鞍山頌安邨頌德樓地下識別馬鞍山靈糧幼稚園。教育局名錄列上午及下午班；校方校舍頁提供2026/27收費入口及班制資料。頁面中的班額和學生數須保留其原始口徑，不當作K1學位空缺。", "https://www.lingliang.org.hk/campuses/ma-on-shan", [
    { label: "教育局沙田區學校名錄（2026-09-30）", scope: "校號520071、校址0001、頌安邨地址、電話及班制。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-st.html" },
    { label: "馬鞍山靈糧幼稚園：校舍資料", scope: "校方列出的校址、班級編制、班額、師生比例、設施及2026/27收費入口。", url: "https://www.lingliang.org.hk/campuses/ma-on-shan" },
    { label: "靈糧堂：學習與支援", scope: "校方課程自述的兒童主導學習、學習區、校本教材及遊戲式英語活動。", url: "https://www.lingliang.org.hk/programme" },
    { label: "靈糧堂：語文課程", scope: "英語活動和普通話課程的校方介紹；沒有公開逐級課時比例。", url: "https://lingliang.org.hk/programme/languages" },
  ], [{ title: "兒童主導學習區、英語活動與班額解讀", featured: true, details: [
    { label: "以有組織的學習區支持孩子自主探索", value: "校方課程頁稱尊重孩子選擇和好奇心，設計校本教材及有標示的學習區，讓幼兒從生活經驗出發探索和建構知識。參觀時家長可看孩子是否能選擇材料、與同伴協作並向教師表達想法；這是校方的課程理念，不是外部評估的學習成效。", sourceUrl: "https://www.lingliang.org.hk/programme" },
    { label: "英語以互動遊戲和歌曲建立接觸", value: "校方語文頁稱英語課程重視趣味和互動，透過遊戲、歌曲提升幼兒接觸英語的興趣。頁面沒有公布英語課時或全日授課語言比例，因此不能據此判定英語主導；若孩子需要較密集英語輸入，應查詢所申請班別時間表。", sourceUrl: "https://lingliang.org.hk/programme/languages" },
    { label: "音樂與自主遊戲也是校方申報的課程內容", value: "2026/27概覽的校方資料列出奧福音樂教學，以及讓幼兒自行選擇、規劃和設計的自主遊戲；學習歷程包括計劃、進行和經驗分享。家長可在參觀時觀察音樂、遊戲和回顧活動如何融入一日課程，並確認各級實際安排。", period: "教育局概覽：2026/27校方申報", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5200710001" },
  ] }]),
];
