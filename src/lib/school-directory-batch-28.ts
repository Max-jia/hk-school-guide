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

/** Kindergarten profile batch 28: ten unique, locally registered schools. */
export const KINDERGARTEN_BATCH_28: PilotSchool[] = [
  profile("324922", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方課程資料：2023/24", "愛群道浸信會呂郭碧鳳幼稚園位於灣仔愛群道。教育局概覽按校址0001列班制與語言；課程細節引用學校2023/24年度申報，不能當作現屆課時或收生安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號324922及愛群道登記校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號324922、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3249220001" },
    { label: "教育局《幼稚園概覽2023/24》：校方課程資料", scope: "校方當年申報的兒童本位、主題及小組教學、自由遊戲與評估方式。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/324922c-0001.pdf" },
    { label: "愛群道浸信會：教會歷史", scope: "教會記錄1983年開辦呂郭碧鳳幼稚園。", url: "https://oikwan.org.hk/history/" },
    { label: "教育局收費證明書", scope: "該證明書所載全日班費用及生效年度；不替代2026/27最新收費。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/324922.pdf" },
  ], [{ title: "兒童本位與主題探索", featured: true, note: "以下課程元素來自校方2023/24教育局概覽申報；如需了解現行做法，應問校方確認。", details: [
    { label: "主題、小組與方案教學並行", value: "校方當年描述以主題活動和小組教學為主，配合全語文及方案教學整合課程。對家庭而言，重點可放在孩子是否有討論、操作和表達的機會；這是舊年度課程說明，不代表各級現行時數。", period: "2023/24學年校方申報資料", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/324922c-0001.pdf" },
    { label: "自由遊戲與持續觀察", value: "同份資料列自由遊戲、自選活動、情緒教育及奧福音樂，並稱以持續觀察和個人學習檔案了解幼兒發展。這可作為參觀時的核對問題：現屆如何記錄孩子在自選活動中的學習，而不是直接假設每項活動仍以同一方式執行。", period: "2023/24學年校方申報資料", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/324922c-0001.pdf" },
    { label: "現屆班制與語言按0001校址概覽", value: "教育局2026/27概覽對應校址0001，列上午、下午和全日班、粵語授課及約1:10.1師生比例。概覽語言欄不提供英語或普通話的每日比例。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3249220001" },
  ] }], { website: "http://www.lkpfkg.edu.hk" }),

  profile("519448", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方網站查核：2026-10", "青衣商會石蔭幼稚園位於葵涌石蔭東邨。教育局2026/27概覽可配對校址0001；校方網站設中華文化校本活動及課室外體驗學習專頁，現有公開內容沒有逐年級課時資料。", [
    { label: "教育局《學校位置及資料》", scope: "校號519448及石蔭東邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號519448、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址的班制與年度概覽欄目。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5194480001" },
    { label: "青衣商會石蔭幼稚園：校方網站", scope: "學校簡介、家校園地、中華文化校本學習及課室外體驗活動入口。", url: "https://www.sykg.edu.hk/" },
    { label: "教育局《幼稚園概覽2022/23》：校方課程資料", scope: "歷史課程與語文活動說明，不作現屆逐項安排推斷。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/519448c-0001.pdf" },
  ], [{ title: "校本文化與課室外體驗", featured: true, note: "網站列出活動專頁，但公開索引未提供各級活動頻率；舊概覽細節保留年份。", details: [
    { label: "校方分設中華文化與體驗學習內容", value: "學校網站把中華文化校本學習和課室外體驗式學習分為獨立專頁，顯示這兩類內容是校方公開的課程／活動板塊。家長可參觀時了解活動如何連回課堂主題，以及不同級別是否有差異。", sourceUrl: "https://www.sykg.edu.hk/" },
    { label: "課程細節以有年份資料為界", value: "教育局2026/27概覽可用於校址0001班制等年度欄目；語言或課程細節如取自舊年度校方申報，不能視作目前固定安排。學校網站未公開逐語言課時，應直接索取現行課程表。", period: "概覽：2026/27；歷史申報：2022/23", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5194480001" },
  ] }], { website: "https://www.sykg.edu.hk/" }),

  profile("157376", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方課程頁查核：2026-10", "保良局田家炳兆康幼稚園位於屯門兆康苑，教育局概覽對應校址0001。校方公布品格教育、生活化探索及雙語全語文教學；班級人數與代辦價目頁有較早年度，本文不當作現行學額或收費。", [
    { label: "教育局《學校位置及資料》", scope: "校號157376及兆康苑校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號157376、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1573760001" },
    { label: "保良局田家炳兆康幼稚園：學校簡介", scope: "辦學目標、環境、班制與校方公布的師生比例。", url: "https://www.plkkgs.edu.hk/plktkpshkg/hk/about/10" },
    { label: "保良局田家炳兆康幼稚園：課程簡介", scope: "六大學習範疇、生活化探索、語文及校本課程方向。", url: "https://www.plkkgs.edu.hk/plktkpshkg/hk/info/28" },
  ], [{ title: "品格培育與生活化探索", featured: true, note: "校方強調正向、關懷和集體生活；現有班級人數及代辦費用欄有舊年度，故只引用當屆概覽核准資料。", details: [
    { label: "從集體活動建立生活習慣", value: "校方把愉快、安全和關懷的校園，以及集體活動和師生互動作為辦學描述。這類環境對剛入學、需要適應團體生活的孩子較值得觀察；家長可問教師如何支持慢熱幼兒，而不只看活動種類。", sourceUrl: "https://www.plkkgs.edu.hk/plktkpshkg/hk/about/10" },
    { label: "課程重視生活化、感官探索和語文", value: "課程頁列出六個學習範疇，並描述生活化活動、感官探索、全語文及英普班。家長要分清校方所稱語文課程與整日主要授課語言；具體年級安排可向校方索取當屆時間表。", sourceUrl: "https://www.plkkgs.edu.hk/plktkpshkg/hk/info/28" },
    { label: "當屆概覽只對應校址0001", value: "教育局2026/27概覽對應校址0001，列上午及下午班、粵語授課和約1:9.9師生比例。校方網頁上的舊學生人數不是招生名額。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1573760001" },
  ] }], { website: "https://www.plkkgs.edu.hk/plktkpshkg" }),

  profile("157449", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方課程及招生頁查核：2026-10", "保良局鄧碧雲紀念幼稚園位於大埔廣福邨，2027/28招生頁已列面見及註冊安排。校方以問題導向的「問題－探索－經驗」描述教學；不把校方自稱的區內定位當成獨立排名。", [
    { label: "教育局《學校位置及資料》", scope: "校號157449及廣福邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號157449、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1574490001" },
    { label: "保良局鄧碧雲紀念幼稚園：教學理念與特色", scope: "QEE問題導向探索、戶外參觀、情緒品德及家校協作。", url: "https://www.plkkgs.edu.hk/plktbwmkg/hk/about/10" },
    { label: "保良局鄧碧雲紀念幼稚園：2027/28招生", scope: "最新入學申請、面見及註冊資料；以頁面年度為準。", url: "https://www.plkkgs.edu.hk/plktbwmkg/hk/custom/custom_page/226" },
  ], [{ title: "問題探索與戶外經驗", featured: true, note: "QEE課程是校方對自身設計的命名與說明；觀察重點是幼兒如何提問、動手和整理經驗。", details: [
    { label: "QEE以問題、探索和經驗串接學習", value: "校方把問題導向學習描述為由提問、探索到經驗建構知識，教師以開放式問題引導討論和解難。這種課程不只看孩子完成了什麼作品，也要看教師如何讓孩子說出嘗試、修正和發現。", sourceUrl: "https://www.plkkgs.edu.hk/plktbwmkg/hk/about/10" },
    { label: "戶外參觀連接社區和主題", value: "校方列文化、科學、社區等參觀學習，並包括戶外活動和生活經驗。家庭可詢問外出活動在不同級別的安排、交通及家長配合要求；公開頁沒有每名幼兒的參與頻率統計。", sourceUrl: "https://www.plkkgs.edu.hk/plktbwmkg/hk/about/10" },
    { label: "2027/28申請已公布具體步驟", value: "校方招生頁列申請、面見和註冊資訊，也說明全日班家庭需要可獲優先考慮但受學位所限。這不是錄取保證，家長應按頁面更新核對日期及文件。", period: "2027/28招生資料；查核：2026-10", sourceUrl: "https://www.plkkgs.edu.hk/plktbwmkg/hk/custom/custom_page/226" },
  ] }], { website: "https://www.plkkgs.edu.hk/plktbwmkg" }),

  profile("157252", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方網站查核：2026-10", "佛教沈東福幼稚園位於上水彩園邨，創辦背景和佛教聯合會辦學身份可由校方網站核實。教育局概覽列粵語、上午下午及全日班；佛化教育為校方理念，不作孩子成效推斷。", [
    { label: "教育局《學校位置及資料》", scope: "校號157252及彩園邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號157252、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1572520001" },
    { label: "佛教沈東福幼稚園：學校簡介", scope: "1982年創辦、辦學宗旨、教育目標和校址。", url: "https://sumtungfookkg.edu.hk/about-us/" },
    { label: "佛教沈東福幼稚園：課程特色", scope: "兒童本位、混合式、生活化及遊戲化課程的校方說明。", url: "https://sumtungfookkg.edu.hk/course-features/" },
  ], [{ title: "佛教德育與生活化遊戲", featured: true, note: "宗教教育和課程方式均依校方自述；家長可確認宗教活動形式，以及遊戲活動如何連到學習目標。", details: [
    { label: "佛教聯合會辦學背景與德慧目標", value: "校方記錄學校由香港佛教聯合會於1982年創辦，辦學宗旨是秉承慈悲精神、培育良好德慧，教育目標涵蓋德育、智育、健康和美藝。對家庭來說，應把佛教教育的日常呈現納入參觀考量。", sourceUrl: "https://sumtungfookkg.edu.hk/about-us/" },
    { label: "感官操作和遊戲化活動是課程特色", value: "校方表示採用兒童本位的混合式教學，安排生活化及遊戲化活動，透過感官操作促進創意思維和解難。網站沒有列每級活動時數或外部成效評估，不應把理念等同每堂固定流程。", sourceUrl: "https://sumtungfookkg.edu.hk/course-features/" },
    { label: "概覽列粵語及三種班制", value: "教育局2026/27概覽對應校址0001，列上午、下午及全日班、粵語授課和約1:13.9師生比例。英語或普通話活動如未列在概覽授課語言欄，不推作主要授課語言。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1572520001" },
  ] }], { website: "https://sumtungfookkg.edu.hk/" }),

  profile("157031", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方網站查核：2026-10", "仁愛堂顏寶鈴幼稚園位於屯門友愛邨。校方自述以學生為本、五育和多元校本課程為骨架，另公布2025至2027年部分書簿美勞茶點費用全免；這些不等同學費、入學保證或所有家庭的實際總開支。", [
    { label: "教育局《學校位置及資料》", scope: "校號157031及友愛邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號157031、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、概覽授課語言、師生比例和核准收費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1570310001" },
    { label: "仁愛堂顏寶鈴幼稚園：校方網站", scope: "辦學宗旨、課程和2025至2027年度費用公告。", url: "https://www.yotnpl.edu.hk/" },
  ], [{ title: "學生本位與多元校本課程", featured: true, note: "校方課程目標與費用公告按校方頁面呈列；面試取錄、班額及家庭總支出不可由此推斷。", details: [
    { label: "五育與獨立思考是校方課程目標", value: "校方以學生為本，將德、智、體、群、美五育作課程綱領，並提到培育獨立思考、創新能力和正確價值觀。家長可進一步看課堂中孩子是否有表達、選擇和合作的機會。", sourceUrl: "https://www.yotnpl.edu.hk/" },
    { label: "費用優惠不等於全免入學成本", value: "校方公告2025至2027連續兩學年書簿、美勞及茶點費用全免。此項公告不代表學費、校服、交通或其他代辦支出均為零；應以當屆收費表和個人選擇計算預算。", period: "校方公告：2025-09；適用期至2027年", sourceUrl: "https://www.yotnpl.edu.hk/" },
    { label: "當屆概覽校址0001列粵語和班制", value: "教育局2026/27概覽對應校址0001，列上午、下午及全日班、粵語授課和約1:9.7師生比例。外語教學時間未從該語言欄推算。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1570310001" },
  ] }], { website: "https://www.yotnpl.edu.hk/" }),

  profile("157279", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方網站查核：2026-10", "仁愛堂葉德海幼稚園位於屯門湖景邨。校方以「以孩子為本、以孩子為先」描述共同策劃課程的方向；與同一辦學團體其他幼稚園共用部分理念，不將其視為本校獨有的課堂安排。", [
    { label: "教育局《學校位置及資料》", scope: "校號157279及湖景邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號157279、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例與年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1572790001" },
    { label: "仁愛堂葉德海幼稚園：校方網站", scope: "學校地址、學校課程入口及學校最新消息。", url: "https://www.yotay.edu.hk/" },
  ], [{ title: "孩子本位與校本教學", featured: true, note: "網站辦學宗旨屬校方及辦學團體的課程方向；本輪可核的公開頁未提供該校現屆逐級課程活動或課時表。", details: [
    { label: "校方強調以孩子為本共同策劃課程", value: "校方表示由團隊共同策劃課程大綱，再按各校特色制定校本教學計劃。這是辦學團體的共同方向；家長可參觀時問本園如何呈現孩子的提問、選擇和個別需要。", sourceUrl: "https://www.yotay.edu.hk/" },
    { label: "學校活動消息可確認日常校園生活", value: "校方網站更新活動、校園和學生成就消息；本輪公開頁未見可核實的逐級課時或語言比例。報名前宜索取現屆課程摘要及班級流程，不以其他仁愛堂幼稚園資料代替。", period: "校方網站查核：2026-10", sourceUrl: "https://www.yotay.edu.hk/" },
    { label: "2026/27概覽屬湖景邨校址0001", value: "教育局概覽列上午、下午及全日班、粵語授課及約1:11師生比例。這是概覽統計口徑，並不等於實際每班固定人數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1572790001" },
  ] }], { website: "https://www.yotay.edu.hk/" }),

  profile("157236", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方學校資料查核：2026-10", "青松湖景幼稚園位於屯門湖景邨湖光樓。校方網站公開班制、上課時間、收費及註冊費，但展示的費用為2025/26；當屆收費以2026/27概覽為準。", [
    { label: "教育局《學校位置及資料》", scope: "校號157236及湖景邨湖光樓校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號157236、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1572360001" },
    { label: "青松湖景幼稚園：學校資料", scope: "班制、年齡、上課時間、2025/26費用及校址。", url: "https://www.ccwkk.edu.hk/?lang=zh&page_id=67" },
    { label: "青松湖景幼稚園：官方網站", scope: "校方課程與最新校務資訊入口。", url: "https://www.ccwkk.edu.hk/" },
  ], [{ title: "班制透明與年度費用辨識", featured: true, note: "校方頁面給出2025/26費用，須與2026/27教育局概覽分開閱讀；網站未提供完整的現屆逐週教學時數。", details: [
    { label: "上午班及全日班上課時段已公開", value: "校方資料列上午班上午9時至中午12時45分、全日班上午9時至下午4時30分，並說明2026年9月入讀K1的出生日期要求。這些資料方便家庭先核對接送與孩子年齡；實際班制仍以當屆招生公告為準。", sourceUrl: "https://www.ccwkk.edu.hk/?lang=zh&page_id=67" },
    { label: "舊費用表不能代替當屆總成本", value: "校方費用頁標示2025/26學年學費和教材等項目，部分用品屬自願訂購。家庭應以2026/27概覽和最新代辦清單重算，並把膳食、校服和交通分開核對。", period: "校方費用頁：2025/26；教育局概覽：2026/27", sourceUrl: "https://www.ccwkk.edu.hk/?lang=zh&page_id=67" },
    { label: "教育局概覽列粵語和約1:10.6", value: "教育局2026/27概覽對應校址0001，列上午、下午及全日班、粵語授課和約1:10.6師生比例。這不代表全天只使用粵語，也不代表每班恆定學生人數。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1572360001" },
  ] }], { website: "https://www.ccwkk.edu.hk/" }),

  profile("156744", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方課程資料：2022/23", "東華三院高德根紀念幼稚園位於屯門友愛邨。教育局現屆概覽按校址0001列班制等資料；公開可核的細節課程PDF為2022/23校方申報，故只作歷史課程參考。", [
    { label: "教育局《學校位置及資料》", scope: "校號156744及友愛邨校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號156744、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "現屆班制、授課語言、比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1567440001" },
    { label: "教育局《幼稚園概覽2022/23》：校方課程資料", scope: "繪本主題、自由遊戲、藝術和語文活動的舊年度校方申報。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/156744c-0001.pdf" },
    { label: "東華三院幼稚園名錄", scope: "高德根紀念幼稚園地址及辦學團體聯絡資料。", url: "https://www.twghskg.edu.hk/" },
  ], [{ title: "繪本主題與綜合藝術", featured: true, note: "可核的詳細課程來自2022/23學年校方申報；不將舊課程細節說成現行固定安排。", details: [
    { label: "舊年度課程以繪本和主題教學為核心", value: "校方在2022/23教育局概覽中描述，按幼兒能力、興趣和需要，透過自由遊戲、繪本及綜合藝術安排學習，並列英語、普通話及奇趣課程。家長可用此作背景，再向校方確認現屆課程有否調整。", period: "2022/23學年校方申報資料", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/156744c-0001.pdf" },
    { label: "現屆年度資料須與舊課程頁分開", value: "教育局2026/27概覽對應校址0001，列上午、下午及全日班、粵語授課和約1:9.5師生比例。概覽授課語言不表示不設英語或普通話活動；現屆課時應向校方確認。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1567440001" },
  ] }], { website: "http://www.twghktkkg.edu.hk" }),

  profile("156795", "教育局位置及註冊資料：2026-10；幼稚園概覽：2026/27；校方網站查核：2026-10", "聖馬提亞堂肖珍幼稚園位於元朗媽廟路，官方網站近期更新2026/27活動、2027/28招生及2026年小一派位資訊。升小結果只屬校方公布的畢業生去向，不作未有分母的比例推算。", [
    { label: "教育局《學校位置及資料》", scope: "校號156795及媽廟路校址。", url: EDB_LOCATION },
    { label: "教育局《學校基本註冊資料》", scope: "校號156795、校址0001及登記狀態；查核日期2026-10-23。", url: EDB_REGISTRY },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1567950001" },
    { label: "聖馬提亞堂肖珍幼稚園：課程及費用", scope: "校方公布的課程特色、核准課程、學費與校舍設施。", url: "https://www.chiuchunkg.edu.hk/學校簡介/核准課程及學費/" },
    { label: "聖馬提亞堂肖珍幼稚園：2026/27校園活動", scope: "現屆各級活動花絮及學習活動例子。", url: "https://www.chiuchunkg.edu.hk/活動花絮/2026-27/幼兒班/" },
    { label: "聖馬提亞堂肖珍幼稚園：非華語家庭支援", scope: "多元文化、中文支援及家長小冊子等校方安排。", url: "https://www.chiuchunkg.edu.hk/家校合作/對非華語學生和家庭的支援/" },
  ], [{ title: "聖公會辦學與主動學習", featured: true, note: "校方現有課程頁、校長信和活動花絮可交叉閱讀；自我評價不當作外部評級，派位名單不推算比例。", details: [
    { label: "全人教育、生命教育與自主性", value: "校方以基督精神和全人教育為辦學宗旨；校長信強調培養幼兒主動性和學習方法。家長可從幼兒是否能選擇活動、提出問題及在挫折後繼續嘗試，觀察理念在課堂中的呈現。", sourceUrl: "https://www.chiuchunkg.edu.hk/學校簡介/校長的話/" },
    { label: "2026/27活動可看到不同學習型態", value: "本學年幼兒班頁面列全語文、圖工、自選及體能活動例子；校方課程頁另列主題教學、方案教學和戶外學習。活動花絮說明曾發生的校園活動，未提供全體幼兒參與頻率或每週課時。", period: "2026/27學年校方活動資料", sourceUrl: "https://www.chiuchunkg.edu.hk/活動花絮/2026-27/幼兒班/" },
    { label: "非華語家庭可查看具體支援入口", value: "校方列出多元文化活動、課堂小組或個別中文支援及不同語文家長小冊子。服務安排需按幼兒需要與當屆資源向學校確認。", sourceUrl: "https://www.chiuchunkg.edu.hk/家校合作/對非華語學生和家庭的支援/" },
  ] }], { website: "https://www.chiuchunkg.edu.hk/" }),
];
