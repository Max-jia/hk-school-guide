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

/** Kindergarten profile batch 53: registered school numbers, official evidence, and campus-scoped descriptions. */
export const KINDERGARTEN_BATCH_53: PilotSchool[] = [
  profile("158070", "按教育局校號158070及青衣青華苑校址識別。課程理念、活動與設施採用校方自述；不把目標陳述當作外部成效。", "https://tytakg.edu.hk/", [
    { label: "青衣商會幼稚園：辦學理念、課程目標及設施", scope: "校方對幼兒發展、學習態度和校舍設施的介紹。", url: "https://tytakg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例和年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1580700001" },
  ], [{ title: "多元活動與自主學習", featured: true, details: [
    { label: "校方把感官、潛能和自主學習列為課程目標", value: "校方表示會以多元活動啟發幼兒感官與潛能，並培養學習興趣和自主學習態度；學習目標涵蓋語文、數感、藝術、體能及人際互動。這是辦學方向而非成效評估。若孩子需要較多成人提示，參觀時可留意活動選擇、教師引導及幼兒輪候的情況。", sourceUrl: "https://tytakg.edu.hk/" },
    { label: "校舍配置以活動空間和基本教學設備為主", value: "校方列出六個課室、禮堂大肌肉活動場地、音樂活動室及圖書區，課室設有視聽和教學設備。設施清單只能說明校方公布的空間配置，不能單憑設備推斷課程質素；家長可進一步了解各級如何使用活動區，以及每日戶外或體能活動的安排。", sourceUrl: "https://tytakg.edu.hk/" },
  ] }]),

  profile("570885", "按教育局校號570885及元朗屏信街9號識別真光幼稚園二校，與屏信街5至7號正校分開整理。二校活動資料不推套至正校，兩校招生及班制須分別確認。", "https://chankwong.edu.hk/en/home2/", [
    { label: "中華基督教會元朗堂真光幼稚園二校：校方頁面", scope: "二校身份、校園消息及二校活動。", url: "https://chankwong.edu.hk/en/home2/" },
    { label: "真光幼稚園二校：2024/25中華文化校本活動", scope: "二校K1至K3的文化體驗活動例子；只代表該學年校方記錄。", url: "https://chankwong.edu.hk/wp-content/uploads/ck/chinese_culture/2024_chinese_culture_ck2_k1.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "二校登記校址的班制、授課語言、師生比例及收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5708850001" },
  ], [{ title: "分校識別與文化體驗", featured: true, note: "此頁只指元朗屏信街9號二校；不能以正校的時間表、收生資料或活動代替。", details: [
    { label: "申請時要確認校址是屏信街9號二校", value: "教育局登記校址與校方二校頁面均指向屏信街9號。真光幼稚園另有屏信街5至7號正校；兩者名稱接近但校號和校址不同。填表、查詢學額和安排接送前，應核對完整校名及校址，避免把正校公告誤當成二校資料。", sourceUrl: "https://chankwong.edu.hk/en/home2/" },
    { label: "二校記錄以文化體驗及動手創作為例", value: "校方2024/25中華文化活動表記錄K1製作香包、K2認識中國建築、K3剪紙等活動，讓幼兒接觸傳統文化並透過操作和分享學習。這是特定年度活動紀錄，不等於每年固定課程或每名學生的參與頻率；可向校方索取本年度校曆及級別活動安排。", period: "校方活動記錄：2024/25", sourceUrl: "https://chankwong.edu.hk/wp-content/uploads/ck/chinese_culture/2024_chinese_culture_ck2_k1.pdf" },
  ] }]),

  profile("532169", "按教育局校號532169及觀塘油塘道1號1樓識別。課程與語言細節以聖安當幼稚園官方課程頁為準；不從晨操安排推算全日語言比例。", "https://www.stakg.edu.hk/", [
    { label: "聖安當幼稚園：課程評估及課程理念", scope: "主題與專題學習、遊戲活動、語言晨操和品德教育。", url: "https://www.stakg.edu.hk/index/learning-teaching/course-evaluation" },
    { label: "聖安當幼稚園：班級編制與收費", scope: "上午及全日班安排；所載費用屬2025/26，不作本年度收費依據。", url: "https://stakg.edu.hk/index/school-information/class-preparation-fee" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例和年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5321690001" },
  ], [{ title: "主題專題學習與多語接觸", featured: true, details: [
    { label: "從生活主題和遊戲引導探索及表達", value: "校方描述以兒童為本，把主題教學與專題研習結合生活經驗，透過親身體驗和遊戲鼓勵幼兒探索、表達及解難。對喜歡動手和提問的孩子，這類安排提供參與入口；若孩子較慢熱，家長可了解教師怎樣分組、提示和照顧不同發展步伐。", sourceUrl: "https://www.stakg.edu.hk/index/learning-teaching/course-evaluation" },
    { label: "粵語、英語和普通話出現在每日早操，不代表三語授課等量", value: "校方表示每日早會以不同語言進行音樂律動早操，亦在課堂安排體能和音樂活動。公開頁面沒有列出逐科課時或三種語言的比例，因此不宜稱為英語或普通話沉浸式教學；重視語言輸入的家庭宜索取目標級別時間表。", sourceUrl: "https://www.stakg.edu.hk/index/learning-teaching/course-evaluation" },
  ] }]),

  profile("319562", "按教育局校號319562及觀塘瑞和街71號校址識別。創校年份和宗教辦學方向為校方自述；不以教會背景推論家庭必須具宗教信仰。", "https://www.sbckg.edu.hk/", [
    { label: "聖公會聖巴拿巴堂幼稚園：學校歷史、辦學宗旨及校訓", scope: "校方公布的創校年份、辦學團體和全人教育目標。", url: "https://www.sbckg.edu.hk/學校歷史、辦學宗旨及校訓/" },
    { label: "聖公會聖巴拿巴堂幼稚園：官方首頁", scope: "校園生活、設施、入學及校務資訊入口。", url: "https://www.sbckg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例及年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3195620001" },
  ], [{ title: "聖公會背景與全人教育", featured: true, details: [
    { label: "校方把信仰、品格和六育發展連在一起", value: "校方資料記錄幼稚園於1965年成立，辦學團體為香港聖公會聖巴拿巴堂；宗旨以基督教仁愛精神和全人教育為核心，涵蓋靈、德、智、體、群、美。這反映學校公開的價值取向，不是外部教學成效評級。家長可在參觀時了解宗教活動如何融入日常，以及學校如何回應不同信仰背景家庭。", sourceUrl: "https://www.sbckg.edu.hk/學校歷史、辦學宗旨及校訓/" },
    { label: "校方公開頁面較多呈現辦學宗旨，日常細節宜直接核對", value: "現有官方資料可確認辦學背景和校園資訊入口，但僅憑宗旨頁不能判斷功課量、教師溝通頻率或個別孩子的適應經驗。若這些因素影響選校，建議家長參觀時詢問每日流程、家校聯絡方式及新生適應安排，再與概覽中的班制和收費一併比較。", sourceUrl: "https://www.sbckg.edu.hk/" },
  ] }]),

  profile("151629", "按教育局校號151629及元朗屏信街5至7號識別真光幼稚園正校，與屏信街9號二校分開整理。課程和收生資料以正校公告為準。", "https://chankwong.edu.hk/home/", [
    { label: "中華基督教會元朗堂真光幼稚園正校：官方首頁", scope: "正校身份、校園及校務資訊。", url: "https://chankwong.edu.hk/home/" },
    { label: "真光幼稚園：入學申請與非華語支援", scope: "校方公開的收生程序入口和非華語兒童支援資訊。", url: "https://chankwong.edu.hk/application/" },
    { label: "真光幼稚園：2024/25課室外體驗學習", scope: "高班社區與校外體驗活動例子；屬該學年活動。", url: "https://chankwong.edu.hk/en/%E8%AA%B2%E5%AE%A4%E5%A4%96%E9%80%B2%E8%A1%8C%E7%9A%84%E9%AB%94%E9%A9%97%E5%BC%8F%E5%AD%B8%E7%BF%92%E5%A4%A9%E5%9C%B02024-25/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "正校登記校址的班制、授課語言、師生比例及年度收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1516290001" },
  ], [{ title: "正校校址、收生與體驗學習", featured: true, note: "此頁只指屏信街5至7號正校；二校的校址、校號及活動資料另頁整理。", details: [
    { label: "正校與二校必須分開查招生及日常安排", value: "正校登記於元朗屏信街5至7號，另有屏信街9號二校。兩校共用網站，但教育局校號及校址不同；查詢時要明確說明申請正校還是二校，並逐一核對班制、面見、交通和收費，不能把同一網站的公告自動視為兩校完全相同。", sourceUrl: "https://chankwong.edu.hk/home/" },
    { label: "校外體驗能補充課堂，但公開紀錄不代表固定頻率", value: "校方2024/25活動頁記錄高班外出體驗和社區學習。對重視生活經驗的家庭，這些活動可作課程觀察線索；但家長仍需確認當屆每級活動次數、費用、交通安排，以及幼兒缺席時有沒有替代學習。", period: "校方活動頁：2024/25", sourceUrl: "https://chankwong.edu.hk/en/%E8%AA%B2%E5%AE%A4%E5%A4%96%E9%80%B2%E8%A1%8C%E7%9A%84%E9%AB%94%E9%A9%97%E5%BC%8F%E5%AD%B8%E7%BF%92%E5%A4%A9%E5%9C%B02024-25/" },
  ] }]),

  profile("151564", "按教育局校號151564及南丫島校址識別。學校使命頁與年度報告包含舊年份資料，課程細節須按原年期理解；地理位置對通勤安排的影響由家庭按實際路線評估。", "https://www.ololckg.edu.hk/", [
    { label: "天主教露德聖母幼稚園：願景、使命及學校概況", scope: "校方價值方向；所列概況數據屬2022/23，不作現屆數據。", url: "https://ololckg.edu.hk/eng/school-information/vision-mission-and-profile-of-kindergartens" },
    { label: "天主教露德聖母幼稚園：2020/21學校報告", scope: "主題綜合課程、遊戲及環境教學的歷史紀錄，不代表現屆完整安排。", url: "https://www.ololckg.edu.hk/uploads/sub_menu_file/127/2021-10-16_School%20Report%20%26%20Plan%202020-2021%20%26%202021-2022.pdf" },
    { label: "天主教露德聖母幼稚園：2027/28收生程序", scope: "新一屆收生程序、平等面見安排和註冊要求；日期只適用於該屆。", url: "https://www.ololckg.edu.hk/chi/admissions/admission-procedure-%282027-2028%29" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "學校登記、班制、主要授課語言、師生比例和年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1515640001" },
  ], [{ title: "天主教價值、環境探索與離島通勤", featured: true, details: [
    { label: "校方使命強調信望愛、服務和均衡發展", value: "校方使命以信、望、愛為核心，提到關懷、自信、感恩、克服困難及服務社群。2020/21學校報告曾記錄主題綜合課程、遊戲學習和戶外環境探索；這是歷史做法，不能直接當成現屆的課程頻率。參觀時可向校方核實現行戶外活動、宗教教育和新生適應方式。", period: "學校報告：2020/21；使命頁另列2022/23概況", sourceUrl: "https://www.ololckg.edu.hk/uploads/sub_menu_file/127/2021-10-16_School%20Report%20%26%20Plan%202020-2021%20%26%202021-2022.pdf" },
    { label: "南丫島校址使日常接送成為重要的家庭條件", value: "教育局登記地址位於南丫島。即使課程和班制適合孩子，家庭仍要按居住地、船班接駁、天氣和照顧者時間實測上學路線；通勤成本是地理位置帶來的家庭評估項目，不是學校質素判斷。校方2027/28收生頁列有面見及註冊程序，報名前應以該屆公告確認日期和文件。", period: "收生頁：2027/28", sourceUrl: "https://www.ololckg.edu.hk/chi/admissions/admission-procedure-%282027-2028%29" },
  ] }]),

  profile("560740", "按教育局校號560740及天水圍天恩商場頂層校址識別。語文及支援細節為校方自述；未公開逐科課時，故不標示語言比例。", "https://www.cchk.edu.hk/", [
    { label: "香港中文大學校友會聯會陳震夏幼稚園：學校特色", scope: "繪本綜合課程、英語小組、JELIC、ICAN、延展服務及駐校社工。", url: "https://www.cchk.edu.hk/學校特色/" },
    { label: "陳震夏幼稚園：非華語兒童支援措施", scope: "校方公布的中文學習、家校溝通及個別支援方法。", url: "https://www.cchk.edu.hk/學校對非華語兒童的支援措施/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例和年度收費欄位；優先於未標年份的校方比例數字。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5607400001" },
  ], [{ title: "繪本遊戲、語言支援與全人發展", featured: true, details: [
    { label: "以繪本和生活主題串連六個學習範疇", value: "校方說明課程涵蓋語文、幼兒數學、大自然與生活、體能與健康、藝術與創意及個人與群體，並以繪本和遊戲作綜合學習入口。課程名稱本身不能反映每天的實際節奏；參觀時可問孩子有多少時間操作、講述故事、自由選擇和回顧。", sourceUrl: "https://www.cchk.edu.hk/學校特色/" },
    { label: "校方列有英語小組及非華語支援，但沒有公開語言課時比例", value: "校方表示由外語教師與本地教師以小組形式促進英語運用，也列有非華語兒童中文支援、家長溝通、駐校社工和課後延展服務。這些是校方公布的服務框架，不代表每名幼兒都會獲同等個別時數；有特定語言或照顧需要的家庭，宜先確認服務對象、名額和時段。", sourceUrl: "https://www.cchk.edu.hk/學校對非華語兒童的支援措施/" },
  ] }]),

  profile("543918", "按教育局校號543918及天水圍天恒邨恒健樓地下校址識別。辦學宗旨和非華語支援按仁濟醫院明德幼稚園校方網站；招生日期不沿用已過的2026/27週期。", "https://www.ychmtk.edu.hk/", [
    { label: "仁濟醫院明德幼稚園：官方首頁及辦學宗旨", scope: "人本教育理念、校址、設施和最新校方消息入口。", url: "https://www.ychmtk.edu.hk/" },
    { label: "仁濟醫院明德幼稚園：收生簡介與非華語支援", scope: "面見和註冊流程樣例及非華語支援措施；收生細節頁目前以2026/27為主，勿沿用至新一屆。", url: "https://www.ychmtk.edu.hk/收生簡介/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例和年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5439180001" },
  ], [{ title: "人本教育與個別支援", featured: true, details: [
    { label: "校方把每名兒童視為獨特個體", value: "仁濟醫院明德幼稚園以「人本教育」為辦學宗旨，並表明相信每位兒童都有獨特發展潛能。校方介紹六間課室、音樂室、體能活動室、家長資源角及戶外活動空間。對家庭而言，關鍵是理念如何落在教師觀察、回饋和課堂調整上，參觀時可詢問孩子遇到適應或發展困難時的溝通流程。", sourceUrl: "https://www.ychmtk.edu.hk/" },
    { label: "非華語支援有公開項目，具體服務安排需逐年確認", value: "校方收生資料列有非華語小組或個別支援、有趣學中文、家長小組、興趣班及文化交流等項目。該頁目前詳列2026/27週期的招生日期，時間已屬上一輪；新申請家庭應待校方公布目標學年的程序，並另問支援的適用對象、頻率和名額。", period: "校方收生頁：2026/27（已屆過往週期）", sourceUrl: "https://www.ychmtk.edu.hk/收生簡介/" },
  ] }]),

  profile("543012", "按教育局校號543012及天水圍天美街6號校址識別。宗教教育及全人發展理念為校方自述；招生程序以官方現行版本為準，不推算錄取機率。", "https://www.stjeromesckg.edu.hk/", [
    { label: "天主教聖葉理諾幼稚園：願景、使命及核心價值", scope: "天主教教育方向、六育發展與校方價值。", url: "https://www.stjeromesckg.edu.hk/chi/about-us/vision-mission" },
    { label: "天主教聖葉理諾幼稚園：2025學校報告及計劃", scope: "學校發展及課程近年檢視；內容按報告年度理解。", url: "https://www.stjeromesckg.edu.hk/uploads/sub_menu_file/178/2025-10-23_School%20Reports%20%26%20Plans%202025.pdf" },
    { label: "天主教聖葉理諾幼稚園：收生程序", scope: "校方當屆K1申請安排；日期和要求會隨學年更新。", url: "https://www.stjeromesckg.edu.hk/chi/admissions/application-procedure" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例和年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5430120001" },
  ], [{ title: "天主教全人教育與家庭配合", featured: true, details: [
    { label: "宗教價值融入靈、德、智、體、群、美發展", value: "校方以天主教教育為辦學基礎，願景與使命頁列出六育發展及核心價值；2025學校報告可用來了解學校近期的自我檢視方向。這些都是辦學方資料，不是獨立評級。若家庭希望宗教教育與日常生活相連，可在參觀時了解祈禱、節期活動及品德學習如何安排。", period: "學校報告：2025", sourceUrl: "https://www.stjeromesckg.edu.hk/uploads/sub_menu_file/178/2025-10-23_School%20Reports%20%26%20Plans%202025.pdf" },
    { label: "收生步驟需以申請年度公告為準", value: "校方設有獨立K1申請程序頁，申請日期、文件及註冊安排會按學年更新。家長可先備妥幼兒基本資料和教育局註冊文件，再按新一屆公告確認面見方式；公開程序不能推算競爭程度或錄取機會。", sourceUrl: "https://www.stjeromesckg.edu.hk/chi/admissions/application-procedure" },
  ] }]),

  profile("543489", "按教育局校號543489及天水圍天恒邨恆富樓校址識別。課程目標及學生支援採用天水圍宣道幼稚園官方頁；服務資格及當屆安排須向校方確認。", "https://www.ttkg.edu.hk/", [
    { label: "天水圍宣道幼稚園：課程簡介", scope: "全人發展和生活習慣等課程目標。", url: "https://www.ttkg.edu.hk/課程簡介" },
    { label: "天水圍宣道幼稚園：學生支援", scope: "校方列出的社工、教育心理學家、學前康復及非華語支援。", url: "https://www.ttkg.edu.hk/學生支援" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例和年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5434890001" },
  ], [{ title: "全人發展與校本支援", featured: true, details: [
    { label: "課程目標由六育發展延伸至學習態度和生活習慣", value: "校方課程簡介以靈、德、智、體、群、美發展為方向，並提到培養良好生活習慣、學習興趣和正面學習態度。這說明學校希望建立的幼兒發展面向；家長可觀察日常流程是否給孩子練習自理、合作和表達的機會。", sourceUrl: "https://www.ttkg.edu.hk/課程簡介" },
    { label: "支援項目較完整，但不等於每名兒童自動取得個別服務", value: "校方支援頁列有學校社工、駐校教育心理學家、到校學前康復服務及非華語兒童支援。項目是否適用、需否評估或轉介、名額及服務時段均要按孩子情況確認；有明確需要的家庭宜在申請前直接與校方討論支援銜接。", sourceUrl: "https://www.ttkg.edu.hk/學生支援" },
  ] }]),
];
