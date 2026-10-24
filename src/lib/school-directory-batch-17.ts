import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_KGP = (number: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${number}0001`;
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

/** Official-source profile supplements reviewed in kindergarten batch 17. */
export const KINDERGARTEN_BATCH_17: PilotSchool[] = [
  profile("605735", "教育局概覽：2026/27；校方招生及校務查核：2026-10", "校方設有校本課程、兒童評估檔案、非華語支援和駐校社工等資料入口；招生頁已更新至2027/28。本頁只概述可見的校方服務，不把活動相片當成每班固定課程。", [
    { label: "保良局郭羅桂珍幼稚園：學校資訊", scope: "校本課程、非華語學童支援、兒童評估與檔案、家長支援及駐校社工等入口。", url: "https://www.plkkgs.edu.hk/plkeklkckg/hk/info/6" },
    { label: "保良局郭羅桂珍幼稚園：活動紀錄", scope: "校方公開的自由遊戲講座、方案活動、參觀和小一體驗等活動例子。", url: "https://www.plkkgs.edu.hk/plkeklkckg/hk/activities/37" },
    { label: "保良局郭羅桂珍幼稚園：聯絡資料", scope: "洪福邨校址及交通資料。", url: "https://www.plkkgs.edu.hk/plkeklkckg/contact" },
  ], [{ title: "方案活動與家校支援", featured: true, note: "校方網站列服務入口和活動例子；並未公開各級每週課程時間表。", details: [
    { label: "校方設校本課程及兒童學習檔案", value: "學校資訊頁設有校本課程、兒童評估與檔案等專頁，並列駐校社工、非華語學童支援及家長服務。這些是可供家長進一步查詢的服務項目；申請前可問支援對象、轉介方式和回饋頻率。", sourceUrl: "https://www.plkkgs.edu.hk/plkeklkckg/hk/info/6" },
    { label: "活動紀錄可看見課堂外的生活經驗", value: "校方活動頁記錄自由遊戲家長講座、方案活動、參觀公園／圖書館／濕地公園及小一體驗等項目。它們是不同年份的活動紀錄，不能推作每級每學年必定相同；家長可詢問當屆活動如何連回課堂主題。", sourceUrl: "https://www.plkkgs.edu.hk/plkeklkckg/hk/activities/37" },
  ] }]),
  profile("543861", "教育局概覽：2026/27；學校提供的詳細課程資料：2023/24", "教育局概覽為2026/27校址資料；可讀的校方課程說明來自教育局2023/24概覽，已明確標作歷史資料，不用作當屆課時或成效推算。", [
    { label: "基督教神召會合一堂幼稚園：教育局概覽校方課程資料", scope: "學校提供的2023/24課程理念、教學活動、書寫操練及語文活動說明。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/543861c-0001.pdf" },
    { label: "基督教神召會合一堂幼稚園：官方網站", scope: "校方現行校務及招生入口；需按當屆公告確認。", url: "https://www.aoguck.edu.hk/zh" },
  ], [{ title: "遊戲探究與生活主題", featured: true, note: "課程細節是校方在2023/24概覽中提供的歷史資料，現行安排需向學校確認。", details: [
    { label: "課程以生活主題貫通六大範疇", value: "校方在2023/24教育局概覽中表示，以幼兒發展需要和興趣設計課程，結合生活化主題及六大學習範疇。該份資料可以說明當時的課程設計方向，不能代替現屆課程手冊。", period: "2023/24學年校方資料", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/543861c-0001.pdf" },
    { label: "校方當時強調遊戲而非機械抄寫", value: "同一份校方資料稱會透過自由遊戲和探究活動學習，並表示不要求幼兒班兒童機械抄寫或操練式計算。這是2023/24的公開做法說明；家長可直接詢問現屆K1紙筆活動與家庭練習安排。", period: "2023/24學年校方資料", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/543861c-0001.pdf" },
  ] }]),
  profile("325708", "教育局概覽：2026/27；校方課程及班級資料查核：2026-10", "校方課程頁列自主學習區、小組研習、繪本體驗和英語／普通話活動；2027/28招生頁的日期及學額只按該屆理解。", [
    { label: "天主教聖雅各伯幼稚園：學校簡介及課程特色", scope: "自主學習、學習區、小組研習、繪本教學、語文活動及班級時間。", url: "https://www.sjck.edu.hk/zh-hant/about/" },
    { label: "天主教聖雅各伯幼稚園：2027/28入學申請", scope: "當屆面見方式、班額資訊及註冊安排。", url: "https://www.sjck.edu.hk/zh-hant/admission/" },
  ], [{ title: "自主學習、繪本與生命教育", featured: true, note: "課程和面見資料均為校方自述；招生細節須按年度更新。", details: [
    { label: "學習區讓孩子自選活動", value: "校方表示以多元學習區和自選活動培養自主學習，並以小組研習和生動教學配合英語、普通話學習。公開頁沒有列各語言的週課時；家長可索取目標年級時間表，確認主要授課語言和活動分布。", sourceUrl: "https://www.sjck.edu.hk/zh-hant/about/" },
    { label: "繪本延伸為互動體驗", value: "校方以繪本故事設計體驗式活動，並把責任、關愛和尊重融入主題教學；校園亦設有有機種植園圃，作生命、環保和綠藝教育的場地。這些是校方公布的設計，不代表每名孩子參與頻率相同。", sourceUrl: "https://www.sjck.edu.hk/zh-hant/about/" },
    { label: "2027/28全日班有獨立收生條件", value: "校方當屆招生頁列出面見和全日班考慮條件；全日服務的家庭優先條件屬2027/28公告，不等於一般半日班取錄規則。", period: "2027/28招生", sourceUrl: "https://www.sjck.edu.hk/zh-hant/admission/" },
  ] }]),
  profile("158410", "教育局概覽：2026/27；校方課程及招生資料查核：2026-10", "校方以兒童能力、經驗和興趣組織六大範疇，並公布自由遊戲、戲劇、社區參觀和非華語面見支援。招生日期按2026/27頁面標示。", [
    { label: "朗屏邨聖恩幼稚園：課程設計理念", scope: "兒童本位、生活化活動、戶外參觀、感官探索、自由遊戲、戲劇及品德教育。", url: "https://singyan.edu.hk/tc/content.php?wid=11" },
    { label: "朗屏邨聖恩幼稚園：入學申請", scope: "2026/27收生流程及非華語兒童面見支援。", url: "https://singyan.edu.hk/tc/content.php?wid=18" },
  ], [{ title: "生活探索與關愛教育", featured: true, note: "課程方向來自校方介紹；招生資料標示2026/27，下一屆需重新核對。", details: [
    { label: "從幼兒興趣出發做生活化探索", value: "校方稱課程以兒童能力、經驗及興趣為起點，結合六大範疇，運用校園和社區資源安排參觀及感官探索。家長可了解當屆主題活動怎樣由觀察延伸至語言表達和概念整理。", sourceUrl: "https://singyan.edu.hk/tc/content.php?wid=11" },
    { label: "自由遊戲和戲劇承載關愛教育", value: "校方把自由遊戲、戲劇教育及繪本列為建立關愛、尊重和包容氣氛的方式，另設制服團隊、跳繩、舞蹈和藝術興趣班。課外班名單不等於每位兒童均參加，名額和收費應向學校確認。", sourceUrl: "https://singyan.edu.hk/tc/content.php?wid=11" },
    { label: "非華語兒童面見可申請語言協助", value: "校方入學頁表示，面見非華語兒童時可按需要安排傳譯／翻譯，亦可由懂中文親友陪同協助溝通。這是程序支援，不代表課程會以英語授課。", period: "2026/27招生頁", sourceUrl: "https://singyan.edu.hk/tc/content.php?wid=18" },
  ] }]),
  profile("158720", "教育局概覽：2026/27；校方課程資訊查核：2026-10", "校方公開佛化教育、體驗探索、5E數學探究及體能課程介紹；課程效益描述屬校方目標，未作獨立成效推論。", [
    { label: "佛教慧光明慧幼稚園：學校簡介", scope: "辦學理念、佛化教育、校園學習空間及聯絡地址。", url: "https://www.bwkk.edu.hk/學校簡介" },
    { label: "佛教慧光明慧幼稚園：5E數學探究式教學法", scope: "校方介紹數學概念、探究步驟和涵蓋範疇。", url: "https://www.bwkk.edu.hk/5e數學探究式教學法" },
    { label: "佛教慧光明慧幼稚園：體能課程", scope: "綜合體能、體適能及遊戲化活動的校方介紹。", url: "https://www.bwkk.edu.hk/體能課程" },
  ], [{ title: "佛化教育、數學探究與體能", featured: true, note: "此頁整理校方公開的課程方向，不視作對學習成果的第三方評價。", details: [
    { label: "佛教教育與自主探索並行", value: "校方以佛化教育和慈悲精神作辦學背景，並表示重視實際操作、探索、同儕合作和溝通。校園介紹列閱讀花園、攀爬牆、STEM牆及藝術科探室等學習空間；設施清單本身不能說明各級使用頻率。", sourceUrl: "https://www.bwkk.edu.hk/學校簡介" },
    { label: "5E數學課以概念和問題解決為主軸", value: "校方把5E探究方式用於數學，列數數、運算與數據、圖形與空間、度量及早期代數思考等範疇。這比單看「數學課」更能理解其課程方向；家庭仍應確認活動是否符合孩子當前發展階段。", sourceUrl: "https://www.bwkk.edu.hk/5e數學探究式教學法" },
    { label: "體能課把技巧放進合作遊戲", value: "校方稱體能課結合綜合體能和體適能活動，並把技巧練習放進遊戲及合作情境。官網未在該頁列每週課時或各年級實施表，家長可向校方了解實際安排。", sourceUrl: "https://www.bwkk.edu.hk/體能課程" },
  ] }]),
  profile("156230", "教育局概覽：2026/27；校方課程計劃參考：2018/19", "校方可讀的探究課程文件為2018/19年度計劃，已清楚標示歷史年份；沒有將其直接描述為現屆課程。", [
    { label: "粉嶺浸信會呂明才幼稚園：2018/19周年計劃", scope: "當年以5E步驟推行探究教學的計劃和目標。", url: "https://www.fbclmckg.edu.hk/wp-content/uploads/2019/05/2018-19%E5%B9%B4%E5%BA%A6%E9%80%B1%E5%B9%B4%E8%A8%88%E5%8A%83.pdf" },
    { label: "粉嶺浸信會呂明才幼稚園：官方網站", scope: "學校入口、當前公告及聯絡資訊。", url: "http://www.fbclmckg.edu.hk" },
  ], [{ title: "探究教學的歷史校本方向", featured: true, note: "以下課程例子來自2018/19周年計劃；應向學校索取現屆課程文件，勿當作現行課堂安排。", details: [
    { label: "舊計劃以問題帶動5E探索", value: "校方2018/19周年計劃提出以參與、探索、解釋、延展和評鑑五步設計探究活動，從幼兒好奇心和生活問題出發，讓孩子嘗試找答案。這可反映當時的教學發展方向，但不能證明本學年仍按同一流程施行。", period: "2018/19學年計劃", sourceUrl: "https://www.fbclmckg.edu.hk/wp-content/uploads/2019/05/2018-19%E5%B9%B4%E5%BA%A6%E9%80%B1%E5%B9%B4%E8%A8%88%E5%8A%83.pdf" },
    { label: "報名前應補問現屆課程和作業安排", value: "由於可公開讀取的詳盡探究教學資料年份較早，選校時應直接索取當屆主題例子、課堂觀察和K1書寫練習說明；不可只憑舊計劃推定今天的課程深度。", period: "資料缺口：2026/27現屆課程文件未在所查頁面找到", sourceUrl: "http://www.fbclmckg.edu.hk" },
  ] }]),
  profile("564680", "教育局概覽：2026/27；教育局質素評核：2023-11", "以2023年教育局質素評核報告補充課程例子；評核描述反映當次視察所見，不能當作2026/27的即時成效。", [
    { label: "中華基督教青年會葵涌幼稚園：教育局質素評核報告", scope: "2023年視察對主題綜合課程、閱讀、小組討論、戲劇、活動日程與持續評估的觀察。", url: "https://www.kccymca.edu.hk/wp-content/uploads/2024/04/CYMCA_KwaiChung.pdf" },
    { label: "中華基督教青年會葵涌幼稚園：官方課程資料", scope: "校方課程方向、班制和活動資料入口。", url: "https://www.kccymca.edu.hk/" },
  ], [{ title: "主題閱讀與每日均衡活動", featured: true, note: "教育局報告記錄2023年11月視察情況；當屆教師、課表及現行執行情況需再向校方確認。", details: [
    { label: "生活主題結合閱讀和表達", value: "教育局2023年質素評核記錄學校以生活化主題綜合設計課程，增加閱讀資源和親子共讀，並安排小組討論、匯報及戲劇表演。評核指出高班部分語文課業需要檢視；家長可問校方後續如何按幼兒發展調整。", period: "教育局質素評核：2023-11", sourceUrl: "https://www.kccymca.edu.hk/wp-content/uploads/2024/04/CYMCA_KwaiChung.pdf" },
    { label: "持續觀察與學習檔案形成回饋", value: "同一份評核記錄校方透過觀察、作品和活動相片建立學習歷程檔案，並定期向家長回饋及整理評估資料。家長可索取現行回饋樣本，了解如何由觀察轉成個別跟進。", period: "教育局質素評核：2023-11", sourceUrl: "https://www.kccymca.edu.hk/wp-content/uploads/2024/04/CYMCA_KwaiChung.pdf" },
  ] }]),
  profile("559962", "教育局概覽：2026/27；校方學校報告：2023/24", "詳細教學內容來自校方2023/24學校報告，當作有年份的課程例子，不代表2026/27每班同一安排。", [
    { label: "中華基督教會全完幼稚園：2023/24學校報告", scope: "主題共同備課、可操作教具、自選層次、社區活動及兒童學習檔案。", url: "https://www.ccccyk.edu.hk/wp-content/uploads/2024/11/2023-2024-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%EF%BC%88%E6%95%B4%E5%90%88%EF%BC%89%E7%B6%B2%E9%A0%81%E7%89%88.pdf" },
    { label: "中華基督教會全完幼稚園：校方課程頁", scope: "辦學宗旨、課程頁及現行公告入口。", url: "https://www.ccccyk.edu.hk/?lang=zh" },
  ], [{ title: "主題共備與可操作教具", featured: true, note: "細節來自2023/24校方報告；不能代替現屆課程或教具使用情況。", details: [
    { label: "教師按主題共同備課並因應反應調整", value: "校方2023/24報告記錄教師在主題開始前共同備課，推行時會按兒童反應調整活動。當年亦為主題加入可操作、自我核對及不同層次的教具，讓孩子按進度選擇。家長可了解當屆是否仍保留這種選擇和調整方式。", period: "2023/24學年校方報告", sourceUrl: "https://www.ccccyk.edu.hk/wp-content/uploads/2024/11/2023-2024-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%EF%BC%88%E6%95%B4%E5%90%88%EF%BC%89%E7%B6%B2%E9%A0%81%E7%89%88.pdf" },
    { label: "學習延伸至附近社區", value: "報告列出到訪郵局、市場、超市、竹林及博物館等活動，並安排親子故事、體適能和桌遊活動。這是該學年的例子；活動地點和頻率會隨年度調整。", period: "2023/24學年校方報告", sourceUrl: "https://www.ccccyk.edu.hk/wp-content/uploads/2024/11/2023-2024-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A%EF%BC%88%E6%95%B4%E5%90%88%EF%BC%89%E7%B6%B2%E9%A0%81%E7%89%88.pdf" },
  ] }]),
  profile("541230", "教育局概覽：2026/27；辦學團體通訊：2026-03", "中華基督教青年會2026年通訊報導青幼探索角落及「米」主題展出；此為辦學團體對其幼稚園的報導，不據此推定每班使用頻率或幼兒成果。", [
    { label: "香港中華基督教青年會：學校及教育服務", scope: "中華基督教青年會幼稚園天悅邨校址及聯絡資料。", url: "https://ymca.org.hk/service/school/" },
    { label: "香港中華基督教青年會：2026年通訊第1639期", scope: "中華基督教青年會幼稚園的探索角落、自選探索及「米」主題展出報導。", url: "https://ymca.org.hk/wp-content/uploads/2026/03/%E7%B0%A1%E8%A8%8A1639%E6%9C%9Fwebsite.pdf" },
    { label: "中華基督教青年會幼稚園：官方網站", scope: "學校公告及家校聯絡入口。", url: "https://www.tswcymca.edu.hk" },
  ], [{ title: "自選探索角落與生活主題", featured: true, note: "2026年通訊是辦學團體報導；沒有公布天水圍校舍各年級探索角落的使用時段。", details: [
    { label: "自選探索角落鼓勵動手和觀察", value: "香港中華基督教青年會2026年通訊報導其幼稚園設置多元學習角，讓學生在自選時段操作和探索，並提及觀察、推理與社交等學習目標。這是辦學團體報導，家長可到校確認天悅邨校舍現行角落設置及每天開放時間。", period: "辦學團體通訊：2026-03", sourceUrl: "https://ymca.org.hk/wp-content/uploads/2026/03/%E7%B0%A1%E8%A8%8A1639%E6%9C%9Fwebsite.pdf" },
    { label: "「米」主題展示如何串連多種材料", value: "通訊以「米」為展出主題，列出小實驗、故事書、仿真材料和工具，讓幼兒探索米的來源和用途。這是一項展出活動例子，不是全校課程成效或固定主題安排的統計。", period: "辦學團體通訊：2026-03", sourceUrl: "https://ymca.org.hk/wp-content/uploads/2026/03/%E7%B0%A1%E8%A8%8A1639%E6%9C%9Fwebsite.pdf" },
  ] }]),
  profile("158380", "教育局概覽：2026/27；校方課程頁查核：2026-10", "校方以兒童本位、遊戲、感官探索和生活化經驗作課程方向，並公開非華語兒童支援。授課語言欄和雙語課程名稱不等同實際語言課時比例。", [
    { label: "世界龍岡學校朱瑞蘭幼稚園：課程及教學", scope: "兒童本位、循序課程、遊戲、多元教學策略及生活探索。", url: "https://www.cslkg.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8-curriculum-and-teaching" },
    { label: "世界龍岡學校朱瑞蘭幼稚園：學校支援", scope: "非華語兒童小組支援、家校溝通及駐校社工／融合教育服務。", url: "https://www.cslkg.edu.hk/%E5%AD%B8%E6%A0%A1%E6%94%AF%E6%8F%B4-support-for-schools" },
    { label: "世界龍岡學校朱瑞蘭幼稚園：收生安排", scope: "註冊文件和非華語申請家庭的溝通支援。", url: "https://www.cslkg.edu.hk/%E6%94%B6%E7%94%9F%E5%AE%89%E6%8E%92-admission-arrangements" },
  ], [{ title: "感官探索與多元支援", featured: true, note: "授課語言依教育局概覽欄列示；校方課程介紹未提供逐語言課時。", details: [
    { label: "以兒童發展和遊戲組織課程", value: "校方以兒童為本，稱會尊重幼兒個別發展規律，循序安排生活化、具感官探索和趣味的遊戲學習，並以德、智、體、群、美均衡發展為方向。這是學校的課程取向，不是外部成效評估。", sourceUrl: "https://www.cslkg.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8-curriculum-and-teaching" },
    { label: "非華語兒童可獲小組中文支援", value: "校方支援頁稱會安排抽離式小組協助非華語兒童學中文，並把中文家課及通告翻譯成英文供家長參考。支援服務的年級、名額和申請方式應按當屆與校方確認。", sourceUrl: "https://www.cslkg.edu.hk/%E5%AD%B8%E6%A0%A1%E6%94%AF%E6%8F%B4-support-for-schools" },
    { label: "另有駐校社工及融合教育服務入口", value: "校方列駐校社工、到校學前康復和跨專業支援團隊等服務。這些服務有特定對象和申請安排，家長應查詢轉介流程及目前可用的支援，而非假設每名兒童都會接受個別治療。", sourceUrl: "https://www.cslkg.edu.hk/%E5%AD%B8%E6%A0%A1%E6%94%AF%E6%8F%B4-support-for-schools" },
  ] }]),
];
