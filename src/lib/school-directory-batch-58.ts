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
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的版本與更新資訊。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記狀態及校址識別；名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 58: official, campus-specific evidence. */
export const KINDERGARTEN_BATCH_58: PilotSchool[] = [
  profile("324884", "按教育局校號324884及沙田水泉澳邨映泉樓二樓識別樂善堂李賢義幼稚園。校方課程頁列遊戲、主題教學、外籍英語教師及關愛文化；具體課時未公開。", "https://lstlyy.loksintongkg.edu.hk/", [
    { label: "樂善堂李賢義幼稚園：課程簡介", scope: "校本遊戲及主題教學、英語課程和關愛校園活動的校方描述。", url: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
    { label: "樂善堂李賢義幼稚園：校方首頁", scope: "校址、校訓、近年校園活動和聯絡資料。", url: "https://lstlyy.loksintongkg.edu.hk/" },
  ], [{ title: "自由遊戲與英語接觸", featured: true, details: [
    { label: "主題活動和遊戲配合，教師按幼兒需要設計活動", value: "校方課程頁稱會按幼兒能力和需要安排主題教學、設計活動及自由遊戲，讓孩子探索、思考、合作和解難；另列「愛心小天使」等關愛活動。這是校方公布的課程方向，並非對每位幼兒學習成效的外部評估。參觀時可觀察自由遊戲的選擇空間，以及教師如何支援較慢熱的孩子。", sourceUrl: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
    { label: "英語融入活動，但公開頁沒有逐級時數", value: "校方表示由駐校外籍英語教師設計和教授課程，透過故事、拼音、唱遊、遊戲和創作接觸英語。頁面沒有列全日中英授課比例或各級周課時，因此不能據此稱英語主導；若家庭有明確語言目標，應向學校索取當屆時間表。", sourceUrl: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
  ] }]),

  profile("215872", "按教育局校號215872及北角英皇道955至957號惠芳閣2至3樓A、B室識別怡寶中英文幼稚園。校方網站列三個年級的上午、下午及全日班時段，並以品格、三語和潛能發展描述辦學方向；舊年度申請日期不作現屆安排。", "https://www.epochkg.edu.hk/", [
    { label: "怡寶中英文幼稚園：班級安排", scope: "K1至K3半日及全日班的校方列示時間；安排變更仍應向校方核實。", url: "https://www.epochkg.edu.hk/班級安排/" },
    { label: "怡寶中英文幼稚園：校方首頁", scope: "校方自述的品格、文化、三語與潛能培育方向及當前資訊入口。", url: "https://www.epochkg.edu.hk/" },
    { label: "怡寶中英文幼稚園：2026/27入學資訊", scope: "只作校方招生入口參考；頁面部分申請日期已過，不作下一屆時程依據。", url: "https://www.epochkg.edu.hk/入學申請程序/" },
  ], [{ title: "班制與三語教育方向", featured: true, details: [
    { label: "同一校舍提供上午、下午及全日班", value: "校方班級安排頁列K1至K3均設上午班、下午班和全日班；上午為9時至12時、下午為1時30分至4時30分，全日班為9時至4時30分，頁面並稱學生可在早上8時30分後回校、下午5時前放學。這有助家庭評估照顧時段，但報名前仍須確認當屆各級開班及延長接送安排。", sourceUrl: "https://www.epochkg.edu.hk/班級安排/" },
    { label: "校方重視品格、文化與三語，課時比例未公開", value: "校方首頁以「知孝禮、惜文化、重三語、啟潛能」概括培育方向。網站目前可見的入學頁仍有2026/27年度舊日期，故不沿用其面試日程；對語言安排有要求的家庭，宜直接索取各級當屆中、英、普時間表。", sourceUrl: "https://www.epochkg.edu.hk/" },
  ] }]),

  profile("325856", "按教育局校號325856及九龍塘慕禮道4號識別香港創價幼稚園。校方現列2027/28招生資訊、非華語面見翻譯安排和不設校車的接送說明；官方教育理念強調愉快、開放及多元的學習環境。", "https://www.soka.edu.hk/zh", [
    { label: "香港創價幼稚園：幼稚園簡介", scope: "創校背景、非牟利性質及校方教育理念。", url: "https://soka.edu.hk/about-us" },
    { label: "香港創價幼稚園：2027/28招生詳情", scope: "當屆班制與申請安排、非華語面見支援及接送／保姆車說明；報名前重核最新通告。", url: "https://soka.edu.hk/admission" },
  ], [{ title: "開放學習與接送安排", featured: true, details: [
    { label: "校方希望建立愉快、開放和多元的學習環境", value: "學校簡介稱以全面、均衡及適切的課程支持兒童發揮潛能。這是學校的教育理念，不等於外部評級或對個別孩子的成果保證。家長可參觀時了解課堂如何安排自主探索、合作與表達，並確認日常作息是否符合孩子的適應節奏。", sourceUrl: "https://soka.edu.hk/about-us" },
    { label: "學校沒有校車，須自行核實保姆車路線", value: "校方2027/28招生資訊說明學校本身不提供校車，每年會向新生及在校家庭派發曾服務學生的保姆車營運商資料；實際路線和是否有位由營運商決定。住得較遠的家庭應先確認上落車點、服務時段及備用接送方案，再考慮申請。", period: "校方招生資訊：2027/28", sourceUrl: "https://soka.edu.hk/admission" },
  ] }]),

  profile("231347", "按教育局校號231347及葵興新葵興花園平台識別太陽島英文幼稚園（葵興分校）。分校頁列2026/27班制、全日班時段、戶外遊樂場、英語教師及校巴服務；土瓜灣中心PN服務不視作葵興校舍課程。", "https://sunisland.edu.hk/zh/我們的分校/葵興分校/", [
    { label: "太陽島英文幼稚園：葵興分校", scope: "葵興校址、2026/27班制、設施、語言支援及聯絡資料。", url: "https://sunisland.edu.hk/zh/我們的分校/葵興分校/" },
    { label: "太陽島英文幼稚園：分校駐校社工服務", scope: "2024年各分校社工服務對應機構；不當作2026/27服務時數承諾。", url: "https://sunisland.edu.hk/wp-content/uploads/2024/10/太陽島駐校社工服務詳情.pdf" },
  ], [{ title: "英語接觸與分校安排", featured: true, details: [
    { label: "葵興校舍以日常英語接觸和戶外活動作特色", value: "分校頁列外籍英語教師、戶外遊樂場和大肌肉活動設施，並列有校巴服務。校方把雙語班與全日班列為校園特色，但沒有在頁面公布每級實際開班名額及語言課時。安排接送前應先確認本分校的路線、服務範圍和當屆班別。", period: "校方分校資料：2026/27", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/葵興分校/" },
    { label: "PN在土瓜灣幼兒中心，不等於葵興分校有PN校舍", value: "分校頁明確指出，年滿24個月的PN兒童可報讀土瓜灣幼兒中心。這是機構另一服務地點，不能把該PN課程、地址或接送安排當作葵興分校的一部分；若幼兒仍未滿K1入學年齡，家長須另行確認PN報讀校址。", period: "校方分校資料：2026/27", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/葵興分校/" },
  ] }]),

  profile("216038", "按教育局校號216038及香港奇力灣華貴邨第2期華賢樓地下識別聖文嘉中英文幼稚園（華貴邨）。校方現行網站有課程、學生支援、家長教育和2026年活動資訊；可讀到的完整教學報告較舊，故舊語言或班級資料不作現況。", "https://www.stmonicawk.edu.hk/", [
    { label: "聖文嘉中英文幼稚園（華貴邨）：校方網站", scope: "華貴校舍地址、現行課程與教學入口、學生支援及近期校園活動。", url: "https://www.stmonicawk.edu.hk/" },
    { label: "聖文嘉中英文幼稚園（華貴邨）：2021/22學校報告", scope: "歷史辦學及課程背景；班級數、學生人數和語言安排不作現況引用。", url: "https://www.stmonicawk.edu.hk/wp-content/uploads/2022/11/2021-2022-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
  ], [{ title: "課程理念與支援服務", featured: true, note: "校方公開的詳細報告為2021/22年度；本頁不把其中班級、人數或語言安排寫成現行資料。", details: [
    { label: "現行網站保留課程理念及學生支援入口", value: "華貴邨校方網站提供課程與教學、非華語學生支援、到校學前康復服務和駐校社工等專頁，並刊出2026年的親子創作及種植活動。這些資料顯示家校和支援服務是校方公開資訊的一部分，但服務資格、時數及當屆安排仍須向學校查詢。", sourceUrl: "https://www.stmonicawk.edu.hk/" },
    { label: "舊報告只作背景，不用來判斷當前班級規模", value: "校方可讀到的完整學校報告是2021/22年度。該年度的班級、學生人數或語言安排都不能當成2026/27數據；如家長需要了解現時英文、普通話的課堂安排，或社工和復康服務的接觸方式，應索取最新校本資料。", period: "校方報告：2021/22；近期活動更新：2026年", sourceUrl: "https://www.stmonicawk.edu.hk/wp-content/uploads/2022/11/2021-2022-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
  ] }]),

  profile("554251", "按教育局校號554251及東涌逸東商場三樓6號校舍識別基督徒信望愛堂逸東幼稚園。校方現有網站列信仰、品格與家校合作方向；可讀到的詳細課程資訊來自2023/24概覽，因此明確標舊年度並提示向校方核實。", "https://www.yatungkg.edu.hk/", [
    { label: "基督徒信望愛堂逸東幼稚園：校方網站", scope: "校方辦學方向、家庭與信仰教育自述及校園消息。", url: "https://www.yatungkg.edu.hk/" },
    { label: "基督徒信望愛堂逸東幼稚園：教育局概覽2023/24", scope: "當年學校申報的課程規劃與學習模式；不是現屆教學承諾。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/554251c-0001.pdf" },
    { label: "基督徒信望愛堂逸東幼稚園：聯絡我們", scope: "逸東商場二期三樓6號校舍地址和聯絡資料。", url: "https://www.yatungkg.edu.hk/language/zh/聯絡我們/" },
  ], [{ title: "信仰教育與課程年份", featured: true, note: "具體學習模式取自2023/24教育局概覽中的學校申報，現屆安排須向校方確認。", details: [
    { label: "校方以基督教信仰、品格和全人發展作辦學方向", value: "學校網站表示秉承信望愛堂宗旨，以信仰、關愛及家校聯繫培養品格和全人發展。家長可在參觀時了解祈禱、聖經故事和節日活動如何安排，也可確認日常品德教育是否符合家庭期望。這是校方自我定位，不代表家庭必須有相同宗教背景。", sourceUrl: "https://www.yatungkg.edu.hk/" },
    { label: "舊概覽記載探索與實踐，現屆需索取課程簡介", value: "教育局2023/24概覽中的校方資料描述，課程以探索、實踐和創意活動為主，涵蓋語文、數學、大自然與生活、個人群體及藝術等學習範疇。這是有年份的資料快照，不足以確認2026/27課程細節或教師配置；報名前應索取最新課程簡介。", period: "教育局概覽：2023/24", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/554251c-0001.pdf" },
  ] }]),

  profile("543616", "按教育局校號543616及屯門富泰邨服務設施大樓1樓2號幼稚園校舍識別樂善堂鄧德濂幼稚園。校方網站近期列正向教育、情智發展、處處是教室和多元活動；語言環境與興趣班以校方自述呈現，不作成果保證。", "https://www.lstkgttl.edu.hk/zh-hant", [
    { label: "樂善堂鄧德濂幼稚園：校方首頁及校園消息", scope: "創校背景、校訓、近期活動及校方教育方向。", url: "https://www.lstkgttl.edu.hk/zh-hant" },
    { label: "樂善堂鄧德濂幼稚園：學習特色", scope: "情智發展課程、社區實踐、遊戲學習和家長教育的校方介紹。", url: "https://www.lstkgttl.edu.hk/zh-hant/school_info/news/news/14" },
    { label: "樂善堂鄧德濂幼稚園：語言及活動介紹", scope: "校方列舉的廣東話、英語、普通話接觸、興趣班和戶外體驗例子。", url: "https://www.lstkgttl.edu.hk/zh-hant/school_info/news/news/13" },
  ], [{ title: "正向教育與社區體驗", featured: true, details: [
    { label: "校方把情智發展和正向教育放入幼兒生活", value: "學校近期介紹按年齡安排情智發展課程、遊戲活動和家長講座；另以「處處是教室」描述社區考察，讓孩子把課堂主題連到生活。這些是校方公布的教學理念和活動例子。家庭可詢問K1至K3的情緒表達、同伴衝突和戶外活動如何逐級安排。", period: "校方消息：2025-12至2026年", sourceUrl: "https://www.lstkgttl.edu.hk/zh-hant/school_info/news/news/14" },
    { label: "校方列多語和興趣活動，並未公布實際語言比例", value: "學校介紹廣東話、英語和普通話環境，也列鼓樂、小童軍、陶藝、平衡車和戶外參觀等例子。網頁沒有分列各語言的每日課時或活動是否每名學生都參加；若家長重視英語或普通話學習，應先確認各級實際安排和是否另收費。", sourceUrl: "https://www.lstkgttl.edu.hk/zh-hant/school_info/news/news/13" },
  ] }]),

  profile("542547", "按教育局校號542547及葵涌石籬（二）邨石富樓地下識別東華三院王胡麗明幼稚園。校方網站列學生為本、繪本和兩文三語課程方向，包含外籍英語教師與普通話專科教師；課時比例未公開。", "https://www.twghwwlmkg.edu.hk/", [
    { label: "東華三院王胡麗明幼稚園：課程與教學", scope: "學生為本、六大學習範疇、繪本教學及語言環境的校方介紹。", url: "https://www.twghwwlmkg.edu.hk/" },
    { label: "東華三院王胡麗明幼稚園：聯絡資料", scope: "石籬（二）邨石富樓地下校址及聯絡方式。", url: "https://www.twghwwlmkg.edu.hk/contact/" },
  ], [{ title: "繪本教學與語言接觸", featured: true, details: [
    { label: "繪本從朗讀延伸詞彙、表達和主題活動", value: "校方稱教師會按繪本故事設計活動，讓幼兒由口語表達和閱讀興趣延伸至思考、詞彙和共同能力。對重視語言發展的家庭，參觀時可觀察教師是否安排孩子重述、提問和創作，而非只聽故事。", sourceUrl: "https://www.twghwwlmkg.edu.hk/" },
    { label: "英語和普通話有專科教師，但並非全天外語授課", value: "學校網站表示設外籍英語教師及普通話專科教師，透過活動營造外語交流機會；校方概覽同時把主要授課語言列作粵語。沒有公開各級逐週語言時數，因此不能把兩文三語目標等同英語或普通話主導。", sourceUrl: "https://www.twghwwlmkg.edu.hk/" },
  ] }]),

  profile("524328", "按教育局校號524328及馬鞍山錦豐苑錦萱閣地下識別基督教宣道會頌安幼稚園。校方提供K1至K3半日及全日班；全日班有兩個放學時間，家庭安排照顧時應向校方核對適用級別和當屆作息。", "https://www.joyfulk.edu.hk/", [
    { label: "基督教宣道會頌安幼稚園：班級編制及費用", scope: "K1至K3半日、全日班及日常上課時段；費用頁的年度需逐年核對。", url: "https://www.joyfulk.edu.hk/admission/class-structure-tuition-fee/" },
    { label: "基督教宣道會頌安幼稚園：校方首頁", scope: "校方辦學與活動資訊入口、聯絡及校址。", url: "https://www.joyfulk.edu.hk/" },
  ], [{ title: "班制與全日照顧安排", featured: true, details: [
    { label: "K1至K3均有半日及全日班", value: "校方列上午班為9時至中午12時，全日班第一輪為上午8時至下午4時15分、第二輪為上午8時至下午5時30分。這個時間差會直接影響接送與延長照顧安排；家長應確認自己申請的級別是否兩種放學時段都適用，以及午膳、午睡與延展服務的細節。", sourceUrl: "https://www.joyfulk.edu.hk/admission/class-structure-tuition-fee/" },
    { label: "網站費用頁標示2025/26雜費，下一年度須重核", value: "校方班級與費用頁目前仍顯示2025/26雜項收費入口。該年度金額不能當作2026/27或2027/28報價；家庭比較全日成本時，應向校方索取當屆學費、膳食、教材和延長照顧收費。", period: "校方費用頁：2025/26資料入口", sourceUrl: "https://www.joyfulk.edu.hk/admission/class-structure-tuition-fee/" },
  ] }]),

  profile("517127", "按教育局校號517127及觀塘翠屏邨翠樂樓A、B翼地下識別東華三院黃士心幼稚園。校方網站列六大學習範疇、繪本及中英普語言活動，並有2026/27招生入口；不能由「兩文三語」推算各語言時數。", "https://www.twghwsskg.edu.hk/", [
    { label: "東華三院黃士心幼稚園：課程及教學", scope: "六大學習範疇、兩文三語活動、繪本教學和學校理念。", url: "https://www.twghwsskg.edu.hk/" },
    { label: "東華三院黃士心幼稚園：學校簡介", scope: "1995年創校、翠屏邨校址、辦學團體和校園設施。", url: "https://www.twghwsskg.edu.hk/學校簡介/" },
    { label: "東華三院黃士心幼稚園：收生指南", scope: "申請入口與非華語面見傳譯／翻譯安排；具體年度日期以最新公告為準。", url: "https://www.twghwsskg.edu.hk/收生指南/" },
  ], [{ title: "六大學習範疇與兩文三語", featured: true, details: [
    { label: "課程涵蓋健康、語文、數學、自然、群體和藝術", value: "校方將課程列為六個學習範疇，並介紹透過繪本朗讀延伸口語、思考和詞彙，再以故事發展活動。家長可在校園參觀時了解孩子如何在活動中接觸數概念、自然觀察和同伴合作，不必只看學科名稱或設施數量。", sourceUrl: "https://www.twghwsskg.edu.hk/" },
    { label: "母語教學之外安排英語與普通話活動", value: "校方稱由外籍英語教師和普通話教師帶領相關活動，另以母語教授日常課程。官方頁沒有列各級每週節數，故不能推斷英語或普通話佔主導；對語言銜接有明確要求的家庭，應索取當屆時間表。", sourceUrl: "https://www.twghwsskg.edu.hk/" },
  ] }]),
];
