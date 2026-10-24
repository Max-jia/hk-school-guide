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

/** Kindergarten profile batch 59: researched school and campus specific facts. */
export const KINDERGARTEN_BATCH_59: PilotSchool[] = [
  profile("549355", "按教育局校號549355及葵涌石籬（二）邨石榮樓地下識別荃浸石籬幼稚園。校方公布2027/28收生原則、名額和申請程序；課程介紹入口另列於網站，當屆課程細節應參加簡介會或向校方索取。", "https://www.twbcslk.edu.hk/", [
    { label: "荃浸石籬幼稚園：2027/28收生安排", scope: "2027/28 K1申請時間、面見方式、收生準則及校方公布名額；日期只適用該屆。", url: "https://www.twbcslk.edu.hk/tc/content.php?wid=33" },
    { label: "荃浸石籬幼稚園：入學申請及校方聯絡", scope: "校址、電話和校方列出的2026/27申請入口。", url: "https://www.twbcslk.edu.hk/tc/content.php?wid=35" },
  ], [{ title: "收生安排與家庭配合", featured: true, details: [
    { label: "面見兒童佔主要比重，家長表現亦列入評核", value: "校方2027/28收生安排把兒童面見表現列為80%、家長表現（包括禮貌及育兒理念）15%，兄姊在校或畢業生因素5%；面見採小組及個別形式，需一位家長陪同。這表示家庭不宜只練習孩子答題，也要讓孩子熟悉與成人互動、輪候和簡單表達；校方沒有公布分數細則，比例不等於錄取機率。", period: "校方公布：2027/28收生", sourceUrl: "https://www.twbcslk.edu.hk/tc/content.php?wid=33" },
    { label: "半日與全日名額各約29名，全日班另看家庭需要", value: "校方公布半日班和全日班收生名額各約29名，並表示全日班名額有限，除面見表現外會優先考慮有家庭需要的申請人。這是該屆公布的收生名額，不應理解為每年固定班額或仍有空缺；需要全日照顧的家庭宜在申請時說明實際安排，並先備妥接送及膳食預算。", period: "校方公布：2027/28收生", sourceUrl: "https://www.twbcslk.edu.hk/tc/content.php?wid=33" },
  ] }]),

  profile("523429", "按教育局校號523429及黃大仙慈雲山慈樂邨樂信樓地下識別嗇色園主辦可立幼稚園。嗇色園校方介紹頁列兒童為本、自主遊戲、品德教育及專科語言教師；本頁不把園方理念推斷為學生結果。", "https://www2.siksikyuen.org.hk/zh-HK/education-services/kindergartens-and-child-care-centres/ho-lap", [
    { label: "嗇色園主辦可立幼稚園：校方介紹", scope: "辦學方向、課程方式、品德教育及英語／普通話教學資源。", url: "https://www2.siksikyuen.org.hk/zh-CN/education-services/kindergartens-and-child-care-centres/ho-lap" },
    { label: "嗇色園主辦可立幼稚園：2026/27申請表", scope: "校方發布的2026/27年度招生文件；申請時程已屬歷史資料，不用作下一屆日期。", url: "https://www2.siksikyuen.org.hk/docs/default-source/kindergartens/ho-lap/application_form.pdf" },
  ], [{ title: "自主遊戲、品德與語文接觸", featured: true, details: [
    { label: "按孩子興趣安排自主探索，而非只看活動項目", value: "嗇色園介紹頁稱，課程參照教育局指引，按幼兒能力、興趣和需要設計活動，透過遊戲、科學實驗、音體美藝和戶外參觀學習；家長可據此在參觀時觀察孩子是否有操作、選擇和表達的空間，而不是只看活動名稱。這是辦學團體的課程自述，不是外部成效評估。", sourceUrl: "https://www2.siksikyuen.org.hk/zh-CN/education-services/kindergartens-and-child-care-centres/ho-lap" },
    { label: "有英語及普通話專科教師，實際課時仍須核對", value: "校方介紹列有駐校英語及普通話教師，並以故事閱讀加強語言表達；頁面沒有公布各級每週課時或主要教學語言比例。若家庭希望孩子以普通話或英語為主要接觸語言，宜向校方索取當屆時間表，避免把「兩文三語」目標理解成等量授課。", sourceUrl: "https://www2.siksikyuen.org.hk/zh-CN/education-services/kindergartens-and-child-care-centres/ho-lap" },
  ] }]),

  profile("519812", "按教育局校號519812及元朗洪水橋丹桂村路麗虹花園地舖識別晶晶中英文幼稚園洪水橋分校。分校官方頁具體列出遊戲與自主學習、每日英語、每週普通話、非華語支援和全日班時段；部分收費資料仍標示2024/25，故不當作現行收費。", "https://zh.jingjing.edu.hk/洪水橋校-hung-shui-kiu-branch", [
    { label: "晶晶中英文幼稚園：洪水橋分校", scope: "分校課程、語言活動、非華語支援、班級時間、招生準則與收費年份。", url: "https://zh.jingjing.edu.hk/洪水橋校-hung-shui-kiu-branch" },
    { label: "晶晶中英文幼稚園：分校申請", scope: "洪水橋分校K1至K3申請入口及不同校舍的申請資料。", url: "https://zh.jingjing.edu.hk/applications" },
  ], [{ title: "每日英語活動與分校支援", featured: true, details: [
    { label: "以遊戲、探索和生活主題組織六大學習範疇", value: "洪水橋分校頁說明課程涵蓋體能健康、語文、幼兒數學、大自然與生活、個人與群體、藝術與創意，透過遊戲和操作建立經驗；另列每日英語活動及每週兩次普通話活動。這給家庭一個比校名更具體的語言參考，但課程頁沒有列出整日授課語言分布，不能稱英語主導。", sourceUrl: "https://zh.jingjing.edu.hk/洪水橋校-hung-shui-kiu-branch" },
    { label: "非華語支援包含家課翻譯與接見傳譯", value: "校方列出雙語通告、家課英文翻譯、少數族裔教師協助家長溝通，以及新生接見即時傳譯；並稱會按個別需要調整語言教學。這對家中不常使用中文的家庭較有參考價值，申請前仍應確認當屆能提供的語種、支援頻率和聯絡方式。", sourceUrl: "https://zh.jingjing.edu.hk/洪水橋校-hung-shui-kiu-branch" },
    { label: "全日班時間長，現行費用要另行索取", value: "校方頁列半日班上午8時45分至11時45分、下午1時15分至4時15分，全日班上午8時至下午6時；頁面顯示的全日班學費明確標為2024/25學年度。比較家庭成本時，請向校方索取2026/27或2027/28收費表，並另計膳食、交通及延長照顧安排。", period: "校方網頁所列時間；收費數據標示2024/25", sourceUrl: "https://zh.jingjing.edu.hk/洪水橋校-hung-shui-kiu-branch" },
  ] }]),

  profile("323357", "按教育局校號323357及深水埗石硤尾邨第24座校址識別聖多馬堂幼稚園。校方公布2027/28收生資料和2026/27收費，並說明非華語支援與課程方向；2027/28申請時間已過，不把舊日期當下一屆安排。", "https://www.stckg.edu.hk/", [
    { label: "聖多馬堂幼稚園：2027/28招生詳情", scope: "當屆出生年齡、申請期、報名費、班別、非華語支援與2026/27收費。", url: "https://www.stckg.edu.hk/l/faaacDQ1T" },
    { label: "聖多馬堂幼稚園：辦學理念與課程", scope: "校方自述的學校目標、解難、合作學習及創意培養方向。", url: "https://www.stckg.edu.hk/l/fa41fDQpT" },
  ], [{ title: "合作學習與中文支援", featured: true, details: [
    { label: "課程目標包括解難、合作和創意", value: "校方課程理念頁稱，編訂課程重視孩子參與學習活動，以明確目標培養解決問題能力、合作學習和創意。對家長而言，參觀時可請教師舉例說明孩子如何在小組中表達、輪流和處理分歧；校方的目標描述不代表每名孩子都會以相同速度達成。", sourceUrl: "https://www.stckg.edu.hk/l/fa41fDQpT" },
    { label: "非華語支援有個別協助及課後中文小組", value: "2027/28招生頁稱，校方為非華語學生提供個別支援和課後中文學習小組，並可按需要安排傳譯或接受懂中文的親友陪同面見。這些安排對希望孩子逐步銜接中文學習的家庭有幫助；申請前應確認支援時段、名額和是否需另行申請。", period: "校方招生資料：2027/28", sourceUrl: "https://www.stckg.edu.hk/l/faaacDQ1T" },
    { label: "半日免費，全日班另有學費及膳食費", value: "校方列出的2026/27收費為上午班免費，全日班每期學費970元、膳食費490元，各十期；這是校方列示的年度金額，不包括家庭可能另付的交通及其他用品費。比較全日成本時應以新年度收費表為準。", period: "校方公布：2026/27", sourceUrl: "https://www.stckg.edu.hk/l/faaacDQ1T" },
  ] }]),

  profile("322580", "按教育局校號322580及觀塘坪石邨黃石樓地下識別鑽石山浸信會美欣幼稚園。校方網站以基督教價值、品格培育和家庭參與為主題，2026/27申請文件列有當屆收生程序；網站部分舊招生消息尚未更新，故不引用其日期。", "https://www.dhbcbbkg.edu.hk/", [
    { label: "鑽石山浸信會美欣幼稚園：學校網站", scope: "園訓、校園活動、家庭參與與學校聯絡資料；首頁舊招生消息不作當屆日期。", url: "https://www.dhbcbbkg.edu.hk/" },
    { label: "鑽石山浸信會美欣幼稚園：2026/27收生文件", scope: "該年度幼兒班申請程序；不作2027/28收生日期依據。", url: "https://www.dhbcbbkg.edu.hk/wp-content/uploads/2025/09/入學申請2627.pdf" },
    { label: "教育局：2025/26幼稚園教育計劃名單", scope: "校方參加免費優質幼稚園教育計劃的官方名單。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2526_KT_29Jul2025.pdf" },
  ], [{ title: "基督教品格教育與家校參與", featured: true, details: [
    { label: "園方以基督教價值和品格培育建立學校定位", value: "校方網站列出基督教園訓，並在辦學團體刊物中說明重視品格培育和社會責任。家庭可先判斷是否認同其價值取向，再參觀了解信仰教育在日常課程中的形式；網站沒有提供可量化的學生品格成效，不能把宗教背景直接視為適配保證。", sourceUrl: "https://www.dhbcbbkg.edu.hk/" },
    { label: "校方呈現親子活動，但活動參與頻率未說明", value: "校方首頁有家校會、親子團契和親子活動資訊，亦展示校園探索設施。這些內容說明家庭參與是校方公開生活的一部分，並不代表每個家庭都必須參與相同活動；雙職家長可在查詢時了解活動時段、頻率和是否有替代安排。", sourceUrl: "https://www.dhbcbbkg.edu.hk/" },
  ] }]),

  profile("323250", "按教育局校號323250及觀塘月華街34號識別中華基督教會基法幼稚園。校方網站詳述HighScope計劃－做－回顧、合作學習、多元感官和品格教育，另列班制及師生比例；班級人數和語言課時不可由比例推算。", "https://kfk.ccc.edu.hk/?lang=zh", [
    { label: "中華基督教會基法幼稚園：校本課程", scope: "HighScope、合作學習、品格教育、健康校園及多元感官教學的校方說明。", url: "https://kfk.ccc.edu.hk/?lang=zh&page_id=19" },
    { label: "中華基督教會基法幼稚園：班級編制", scope: "K1至K3班數、上課時段及校方公布的師生比例。", url: "https://kfk.ccc.edu.hk/?lang=zh&page_id=458" },
    { label: "中華基督教會基法幼稚園：聯絡資料", scope: "校名、月華街校址及電話。", url: "https://kfk.ccc.edu.hk/?lang=zh&page_id=33" },
  ], [{ title: "HighScope主動學習與品格培育", featured: true, details: [
    { label: "以「計劃—實踐—回顧」讓幼兒整理自己的學習", value: "校方課程頁介紹HighScope，讓孩子先計劃選擇活動，再在區角實踐，最後回顧經驗；另有合作學習、戲劇和多感官活動。這套流程較適合需要透過操作建立概念的孩子，參觀時可觀察教師如何提問和支持幼兒回顧，而不只看教具是否豐富。", sourceUrl: "https://kfk.ccc.edu.hk/?lang=zh&page_id=19" },
    { label: "品格與健康教育融入日常活動", value: "校方列出六項品格教育和健康校園安排，並以閱讀、角色遊戲及生活活動延伸討論。這反映學校希望把行為、情緒和健康習慣放入日常學習；家長可進一步了解校方如何處理同伴衝突、情緒調節和家庭延伸，不把獎勵計劃本身當作效果證據。", sourceUrl: "https://kfk.ccc.edu.hk/?lang=zh&page_id=19" },
    { label: "班級資料要與年度和校址一起看", value: "校方班級編制頁列K1一班、K2一班、K3兩班，並公布上午班師生比例1:10、下午班1:8。此數字是師生比例，不代表每班固定十人或八人；頁面顯示的班數和比例也應與教育局2026/27校址概覽分開閱讀。", sourceUrl: "https://kfk.ccc.edu.hk/?lang=zh&page_id=458" },
  ] }]),

  profile("312479", "按教育局校號312479及九龍界限街104A校址識別聖羅撒幼稚園。校方2026/27招生文件自述以兒童為中心、主要以粵語教學，並公布教材費參考；招生期已結束，頁面不把它當作下一屆時程。", "https://www.roselima.edu.hk/", [
    { label: "聖羅撒幼稚園：2026/27入學注意事項", scope: "該屆教學形式、語言、宗教背景、教材費參考及註冊安排。", url: "https://www.roselima.edu.hk/wp-content/uploads/2025/07/2026-27%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%8517.7.20251-.pdf" },
    { label: "聖羅撒幼稚園：學校簡介及2026/27資訊", scope: "辦學團體、教育方向、校址及當前插班資訊入口。", url: "https://www.roselima.edu.hk/" },
    { label: "聖羅撒幼稚園：學制", scope: "學制與招收K1學額的歷史頁；180人為2024/25年度參考，不當作現屆名額。", url: "https://www.roselima.edu.hk/%E6%A0%A1%E5%9C%92%E8%B3%87%E8%A8%8A/%E5%AD%B8%E5%88%B6/" },
  ], [{ title: "兒童為中心與家庭預算", featured: true, details: [
    { label: "校方自述以兒童為中心，粵語為主要教學語言", value: "聖羅撒2026/27入學注意事項把教學形式列為兒童為中心、教學語言列為主要粵語，宗教背景為天主教。這是校方當屆招生文件中的自述；有英語或普通話學習目標的家庭，仍應另問各級的課程安排，不能由語言標示推算其他語言的課時。", period: "校方招生文件：2026/27", sourceUrl: "https://www.roselima.edu.hk/wp-content/uploads/2025/07/2026-27%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%8517.7.20251-.pdf" },
    { label: "半日學費與教材雜費需分開計算", value: "學校參加幼稚園教育計劃，持有效註冊文件的半日班可免學費；2026/27招生文件另列全年書本及教材費約3,000元。過往學制頁所列K1招收180人明確屬2024/25年度，不能當作當前年度收生名額；家庭應以新年度收費表核對教材、校服及其他費用。", period: "招生及教材費：2026/27；K1名額參考：2024/25", sourceUrl: "https://www.roselima.edu.hk/wp-content/uploads/2025/07/2026-27%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%8517.7.20251-.pdf" },
  ] }]),

  profile("215899", "按教育局校號215899及鴨脷洲利東邨東昇樓校址識別聖文嘉中英文幼稚園；這是利東邨校舍，與校號215678的聖文嘉華貴邨校舍分開。校方利東網站有2025/26至2026年的親子、閱讀及創作活動，詳細課程時數未見公開。", "https://www.stmonicalt.edu.hk/", [
    { label: "教育局學校搜尋：聖文嘉中英文幼稚園（利東邨）", scope: "校號215899、校址、南區、下午授課、男女校及登記資料。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=215899000112" },
    { label: "聖文嘉中英文幼稚園（利東邨）：校方網站", scope: "利東校舍活動、家長教師會、招生入口和聯絡方式；頁面沒有列各級語言時數。", url: "https://www.stmonicalt.edu.hk/" },
    { label: "聖文嘉中英文幼稚園（利東邨）：中華文化校本活動", scope: "利東校舍K1農曆新年校本活動實例；2024年資料只作活動背景。", url: "https://www.stmonicalt.edu.hk/wp-content/uploads/2024/04/K1%E4%B8%AD%E8%8F%AF%E6%96%87%E5%8C%96%E6%A0%A1%E6%9C%AC%E5%AD%B8%E7%BF%92%E6%B4%BB%E5%8B%95-%E8%BE%B2%E6%9B%86%E6%96%B0%E5%B9%B4.pdf" },
  ], [{ title: "校舍辨識與親子活動", featured: true, note: "聖文嘉有不同校址。本頁只描述教育局校號215899的利東邨校舍，不套用華貴邨校舍資料。", details: [
    { label: "利東邨校舍為下午授課，勿與華貴邨分校混為一談", value: "教育局學校搜尋以校號215899識別利東邨東昇樓校舍，列南區、下午授課和校址資訊；這與華貴邨校舍是不同校號和地點。對需要上午照顧的家庭，時段差異會直接影響接送安排；報名時應確認所申請的確為利東校舍。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=215899000112" },
    { label: "網站展示親子閱讀與創作，課程時數未公開", value: "利東校方網站近期發布親子創作、環保設計及親子閱讀活動；一份2024年校本文化學習文件也展示K1透過節日食品和感官探索認識農曆新年。這些資料能說明校方曾安排的活動形式，但不能據此推斷每級每週頻率或當屆中英普比例；有語言考量的家庭需直接索取課程表。", period: "校方活動消息：2025/26至2026年；文化活動文件：2024年", sourceUrl: "https://www.stmonicalt.edu.hk/" },
  ] }]),

  profile("159140", "按教育局校號159140及天水圍天耀邨耀澤樓地下識別元朗公立中學校友會劉良驤紀念幼稚園。校方網站列生活化主題、自由探索、品德教育、Cambridge English及家長支援資訊；頁面未提供英語總課時。", "https://www.ylallsk.edu.hk/", [
    { label: "元朗公立中學校友會劉良驤紀念幼稚園：課程特色", scope: "生活化主題、遊戲與自由探索、英語活動和品德教育的課程入口。", url: "https://www.ylallsk.edu.hk/" },
    { label: "元朗公立中學校友會劉良驤紀念幼稚園：辦學宗旨", scope: "校訓、五育並重、培育潛能和服務精神的校方自述。", url: "https://www.ylallsk.edu.hk/l/fab54CQpWAA" },
    { label: "教育局：2026/27元朗區K1至K3學位空缺摘要", scope: "截至發布時的學位空缺概況；不等同學校固定學額或實時剩餘名額。", url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Yuen%20Long_K1-K3%20Vacancy.pdf" },
  ], [{ title: "生活化主題、自由探索與家長觀察", featured: true, details: [
    { label: "以生活主題和自由探索建立學習經驗", value: "校方課程架構列生活化主題學習、遊戲中的自由探索、積木活動和品德教育，並有Cambridge English及低高班英語故事教學入口。這組安排適合家長進一步了解孩子如何從玩和生活經驗轉入語文、數概念；網站沒有列英語總時數，因此不能簡化為英語主導課程。", sourceUrl: "https://www.ylallsk.edu.hk/" },
    { label: "有情緒社交及家長活動資訊，服務資格需逐項確認", value: "校方近期通告列情緒社交小組、駐校社工服務、家長講座和親子故事活動等。這表示家校支援有公開入口，但網站通告不代表每名學生均自動獲同一服務；如孩子需要個別支援，申請時應問清服務對象、轉介方式與頻率。", period: "校方通告：2026年", sourceUrl: "https://www.ylallsk.edu.hk/" },
  ] }]),

  profile("159131", "按教育局校號159131及屯門兆麟苑商場地下識別聖公會青山聖彼得堂兆麟苑幼稚園。校方課程頁詳細說明小組教學及粵語、英語、普通話三語主題學習；網頁未標明最近更新日期，當屆作息和活動須向校方確認。", "https://www.spckg.edu.hk/siulun/siulun.html", [
    { label: "聖公會青山聖彼得堂兆麟苑幼稚園：校本課程", scope: "小組教學、三語浸入式綜合課程、主題活動、藝術與校外體驗的校方說明。", url: "https://spckg.edu.hk/siulun/intro/curriculum.php" },
    { label: "教育局：2024/25幼稚園教育計劃參加名單", scope: "教育局列載該校參加幼稚園教育計劃；年度資料不代表未來收費。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/free-quality-kg-edu/2425_TM_2May2024.pdf" },
  ], [{ title: "小組教學與三語浸入式課程", featured: true, note: "校方課程頁描述的模式未標更新年度，申請前請核對當屆時間表及實際安排。", details: [
    { label: "粵語、英語和普通話圍繞同一主題學習", value: "校方課程頁稱兒童每日以粵語、英語和普通話接觸同一主題；星期一至四設英語時段、中文時段和藝術時段，英語小組由英語教師帶領，中文時段由普通話教師及班主任交替使用普通話和粵語。這比單寫「兩文三語」更能幫家長理解課堂形式，但頁面未標更新年度，應先確認當屆安排。", sourceUrl: "https://spckg.edu.hk/siulun/intro/curriculum.php" },
    { label: "主題延伸至自主探索、藝術和生活體驗", value: "校方亦列出課室探索區、走廊活動、藝術課、主題參觀和特別活動日。對語言敏感或較需要活動轉換的孩子，家長可詢問不同語言時段的銜接方式、教師如何協助慢熱幼兒，以及全日班下午活動是否只適用於部分年級。", sourceUrl: "https://spckg.edu.hk/siulun/intro/curriculum.php" },
  ] }]),
];
