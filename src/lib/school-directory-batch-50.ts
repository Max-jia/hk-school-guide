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

/** Kindergarten profile batch 50: matched school numbers with dated, campus-scoped official evidence. */
export const KINDERGARTEN_BATCH_50: PilotSchool[] = [
  profile("522910", "按教育局校號522910及秀茂坪秀康樓校址識別。校方網站顯示2026年社區活動及校園資訊；概覽班制、語言、師生比和收費只採2026/27校址資料。", "https://cnecckg.edu.hk/", [
    { label: "中華傳道會基石幼稚園：校方官方網站", scope: "校名、秀康樓校址、聯絡方式、校園與社區活動；校方頁面近期更新至2026年。", url: "https://cnecckg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及收費年度欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5229100001" },
  ], [{ title: "秀茂坪校址與社區活動", note: "校方網站近期展示壁畫工作坊、校外活動及校園設施；這些是公開活動，不代表每名幼兒均參與或可取得相同機會。", details: [
    { label: "校方近期活動連結秀茂坪社區", value: "校方在2026年公布秀茂坪邨壁畫工作坊、校外填色比賽及聯校北京遊學團等消息。這些內容顯示學校有對外活動紀錄；家長可進一步了解活動是否按年級安排、參與人數及日常課程如何延伸社區觀察。", period: "校方消息：2026年", sourceUrl: "https://cnecckg.edu.hk/" },
    { label: "教學語言欄列粵語，並不代表沒有其他語言活動", value: "教育局2026/27概覽將校址授課語言列為粵語。這個欄位說明主要授課語言，不能據此推斷英語或普通話的教學時數；如家庭希望孩子有固定外語接觸，宜向校方索取目標班級時間表。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5229100001" },
  ] }]),

  profile("325236", "按教育局校號325236及牛頭角樂華北邨勤華樓校址識別。校方另有慈愛分校等辦學單位；此頁只採樂華正校官方課程及概覽資料。", "https://www.sharonlutheran.edu.hk/lokwah/", [
    { label: "路德會沙崙堂幼稚園樂華正校：課程簡介", scope: "樂華校址的兒童為本、主題教學、遊戲與親身探索等校本課程自述。", url: "https://www.sharonlutheran.edu.hk/lokwah/?lang=zh&page_id=30" },
    { label: "路德會沙崙堂幼稚園樂華正校：聯絡資料", scope: "樂華正校名稱、電話及勤華樓校址，與慈愛分校區分。", url: "https://www.sharonlutheran.edu.hk/lokwah/?lang=zh&page_id=32" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "樂華校址班制、語言、師生比例和收費年度欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3252360001" },
  ], [{ title: "兒童為本與親身探索的校本課程", featured: true, note: "課程和語言特色按樂華正校官方課程頁；不把慈愛分校的招生、地址或課程資料混入。", details: [
    { label: "校本課程按發展階段由淺入深編排", value: "樂華正校介紹以兒童為本，按孩子發展、興趣、能力和需要編排課程，透過主題教學、親身探索和體驗活動，鼓勵合作、表達與思考。這類安排較重視幼兒參與過程；家長可參觀時看孩子是否有自主操作材料和分享想法的空間。", sourceUrl: "https://www.sharonlutheran.edu.hk/lokwah/?lang=zh&page_id=30" },
    { label: "兩文三語是教學方向，概覽語言欄仍以粵語為主", value: "校方課程頁提到兩文三語及主題學習，教育局2026/27概覽則把授課語言列為粵語。兩者描述層次不同，不能由「兩文三語」推算每日英語或普通話課時；如這是家庭的主要考慮，應索取目標級別時間表。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3252360001" },
  ] }]),

  profile("325929", "按教育局校號325929及橫頭磡邨宏偉樓校址識別。禮賢會香港區會頁確認校名、地址與辦學方向；概覽數字按校址0001及2026/27年度列示。", "https://lfkg.ppe.rhenish.org/", [
    { label: "中華基督教禮賢會香港區會：樂富禮賢會幼稚園", scope: "校名、地址、聯絡方式、建校背景及辦學團體公開的教育方向。", url: "https://www.rhenish.org/Common/Reader/Channel/ShowPage.jsp?Charset=big5_hkscs&Cid=112&Pid=6&Version=0&page=0" },
    { label: "樂富禮賢會幼稚園：學生支援", scope: "校方描述非華語學生支援、在校學前康復服務和小學適應活動。", url: "https://lfkg.ppe.rhenish.org/en/student-support/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例與概覽年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3259290001" },
  ], [{ title: "基督教全人教育與入學適應支援", note: "辦學團體自述的教育方向與校方支援頁分開標示；支援項目不等於每名學生均需要或必然接受服務。", details: [
    { label: "辦學團體以基督教價值和全人發展定位學校", value: "禮賢會香港區會介紹樂富禮賢會幼稚園以基督教信仰和幼兒聖經基礎課程為辦學特色，並重視德、智、體、群、美及靈育。這是辦學團體的教育定位；家長可衡量宗教教育是否符合家庭期待，並了解日常活動如何呈現這一理念。", sourceUrl: "https://www.rhenish.org/Common/Reader/Channel/ShowPage.jsp?Charset=big5_hkscs&Cid=112&Pid=6&Version=0&page=0" },
    { label: "校方列出非華語支援與小學適應活動", value: "校方支援頁說明會透過同儕互動支持非華語幼兒，並設有校本學前康復服務及K3小學適應遊戲。家庭若需要相關支援，應直接確認服務轉介條件、名額、服務時段及與小學銜接的實際安排。", sourceUrl: "https://lfkg.ppe.rhenish.org/en/student-support/" },
  ] }]),

  profile("322270", "按教育局校號322270及薄扶林道54號校址識別。校方已公布2026/27 K1招生文件；招生時間表屬該屆，不能當作下一屆日期。", "https://lyskg.caritas.org.hk/", [
    { label: "明愛凌月仙幼稚園：2026/27幼兒班招生程序", scope: "2026/27申請時程、文件和學校聯絡資訊；已過日期只作上一屆流程參考。", url: "https://lyskg.caritas.org.hk/userfiles/news/%E6%98%8E%E6%84%9B%E5%87%8C%E6%9C%88%E4%BB%99%E5%B9%BC%E7%A8%9A%E5%9C%9225-26%E5%B9%BC%E5%85%92%E7%8F%AD%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8F%E5%8F%8A%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "薄扶林道校址的班制、授課語言、師生比例及學費年度欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3222700001" },
    { label: "教育局質素評核報告：明愛凌月仙幼稚園", scope: "教育局公開的質素評核報告；本次報告於2024年11月進行，僅反映當次觀察，不外推為本學年表現。", url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_LingYuetSin.pdf" },
  ], [{ title: "K1招生安排需按屆更新", note: "校方公布的2026/27程序用來了解上一屆申請順序；下一屆日期、文件及面見形式須等候新通告。", details: [
    { label: "2026/27招生文件說明申請表派發及遞交時段", value: "校方2026/27招生文件列明申請表可由2025年9月起索取，並載有遞交、面見及註冊步驟。這可作家庭整理文件順序的參考，但相關日期已屬上一屆；下一屆申請前應重新核對校方公告和教育局註冊證安排。", period: "入學年度：2026/27；日期屬上一屆", sourceUrl: "https://lyskg.caritas.org.hk/userfiles/news/%E6%98%8E%E6%84%9B%E5%87%8C%E6%9C%88%E4%BB%99%E5%B9%BC%E7%A8%9A%E5%9C%9225-26%E5%B9%BC%E5%85%92%E7%8F%AD%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8F%E5%8F%8A%E5%A0%B1%E5%90%8D%E8%A1%A8.pdf" },
    { label: "半日及全日班安排要連同照顧需要比較", value: "教育局2026/27概覽列校址設上午及全日班，沒有列下午班。全日班與半日班對家庭接送、午膳和每日作息的要求不同；如需全日照顧，宜向校方核實實際開班年級、服務時間及膳食費。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3222700001" },
  ] }]),

  profile("158429", "按教育局校號158429及沙田偉華中心校址識別。教育局官方學校頁可讀取年度概覽和質素評核；校方網站在本次研究期間逾時，故不以未能讀取的校方自述補寫現行課程細節。", "https://www.peck.edu.hk/", [
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "沙田校址的班制、語言、師生比例與收費年度資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1584290001" },
    { label: "教育局質素評核報告：平安福音堂幼稚園", scope: "教育局對校號158429該次評核的觀察；只可作報告日期對應的歷史資料。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC.pdf" },
    { label: "平安福音堂幼稚園：校方網站入口", scope: "校方官方網站入口；本次研究無法讀取頁面內文，未據此撰寫現行特色。", url: "https://www.peck.edu.hk/" },
  ], [{ title: "只列可查證的校址與概覽資料", note: "校方網站本次連線逾時；質素評核為歷史觀察，不代表目前課程或服務現況。", details: [
    { label: "概覽列班制與師生比例，但不公布K1空缺", value: "教育局2026/27概覽按校址列上午、下午及全日班，授課語言為粵語，師生比例為1:10.6。這些是校址和年度資料，不能用來推算K1收生名額；有意報讀全日班的家庭，應再向校方核實當屆開班與收費。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1584290001" },
    { label: "質素評核需按報告日期理解", value: "教育局曾就校號158429發布質素評核報告，可供家長了解評核制度及當次課程觀察。報告不是當屆評級，也不能代替目前校方課程資料；本次未能讀取學校網站內文，因此不對現行教學特色作推斷。", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC.pdf" },
  ] }]),

  profile("151203", "按教育局校號151203及大圍銅鑼灣山路校址識別。校方已發布2027/28 K1申請資訊和同年度費用；金額按該學年列示，其他收費項目另見校方文件。", "https://www.stlkg.edu.hk/", [
    { label: "基督教香港信義會沙田信義幼稚園：收生與費用", scope: "2027/28申請條件、面見安排、非華語支援及學費/茶點/膳食費。", url: "https://www.stlkg.edu.hk/" },
    { label: "基督教香港信義會沙田信義幼稚園：課程特色", scope: "校方課程理念、遊戲學習及課室外體驗活動。", url: "https://www.stlkg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及概覽年度學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1512030001" },
  ], [{ title: "大圍校址：遊戲學習與全日照顧成本", featured: true, note: "費用與申請流程按校方2027/28資訊；校方說明符合優先考慮不代表一定獲取錄。", details: [
    { label: "2027/28全日班費用由學費和膳食費組成", value: "校方列上午班每月學費為$0、茶點費$214；全日班每月學費$1,432、膳費$550，另有教材等項目。比較時應把膳食和學習用品一併計入，不能只看免費計劃下的半日學費。", period: "學費及收費：2027/28學年", sourceUrl: "https://www.stlkg.edu.hk/" },
    { label: "校方會面試所有申請者，優先條件不等於保證錄取", value: "校方2027/28收生資訊稱會面見所有申請兒童，現讀學生兄弟姊妹或校友子女可獲優先考慮；全日班亦優先考慮雙職或有特殊照顧需要家庭。校方同時提醒學額有限，符合優先條件仍不保證取錄。", period: "入學年度：2027/28", sourceUrl: "https://www.stlkg.edu.hk/" },
    { label: "非華語家庭可先確認翻譯與中文支援安排", value: "校方表示可為非華語兒童和家長提供協助及翻譯，並有教師相關培訓及支援教師。家庭可在申請前致電非華語查詢專線，確認面見語言和入學後支援的實際形式。", sourceUrl: "https://www.stlkg.edu.hk/" },
  ] }]),

  profile("153036", "按教育局校號153036及西貢普通道19E校址識別。校方公開教育理念、2025/26收費及收生考慮；費用和優先條件均標明所屬年度/來源。", "https://www.sklokyuk.edu.hk/", [
    { label: "西貢樂育幼稚園：學校理念與簡介", scope: "校方辦學方向、社區定位及全人發展自述。", url: "https://www.sklokyuk.edu.hk/tc/about_us.php?id=13" },
    { label: "西貢樂育幼稚園：收生安排", scope: "校方列出的收生優先考慮及全日班家庭需要。", url: "https://sklokyuk.edu.hk/tc/about_us.php?id=17" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例與概覽年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1530360001" },
  ], [{ title: "西貢社區校舍與全日班選擇", note: "課程理念是校方自述；收費頁反映2025/26，而非2026/27或下一屆報價。", details: [
    { label: "校方定位重視六育與積極的人生態度", value: "學校簡介以基督教精神為基礎，表示希望發展孩子靈、德、智、體、群、美六育，並建立積極、正確和快樂的人生觀。這是校方的教育目標；家長可了解宗教活動、生活教育和日常課程如何落地。", sourceUrl: "https://www.sklokyuk.edu.hk/tc/about_us.php?id=13" },
    { label: "2025/26半日班免學費，全日班另有學費與膳食費", value: "校方列2025年9月至2026年7月半日班扣資助後免學費；全日班每月學費$1,540，另加$324膳食費。這是2025/26費用，家庭預算下一屆時須重查最新收費證明及膳食安排。", period: "收費期間：2025-09至2026-07", sourceUrl: "https://www.sklokyuk.edu.hk/tc/about_us.php?id=13" },
    { label: "全日班取錄會優先考慮有照顧需要的家庭", value: "校方收生頁列出全日班會優先考慮有需要該服務或特殊情況的家庭，也列有校友和在校生親屬等優先情形。這些是校方公開的考慮因素，不是錄取承諾；申請前應按當屆文件確認。", sourceUrl: "https://sklokyuk.edu.hk/tc/about_us.php?id=17" },
  ] }]),

  profile("150843", "按教育局校號150843及上水馬會道23號校址識別。校方公開2027/28 K1全年收表、級別班制及兒童中心課程理念；教育局概覽數據另按年度列示。", "https://www.ssckg.edu.hk/", [
    { label: "中華基督教會上水堂幼稚園：課程簡介", scope: "兒童中心、遊戲探索、實物操作、合作與自發學習等校方課程說明。", url: "https://www.ssckg.edu.hk/%E5%AD%B8%E6%A0%A1%E7%89%B9%E8%89%B2/%E8%AA%B2%E7%A8%8B%E7%B0%A1%E4%BB%8B/" },
    { label: "中華基督教會上水堂幼稚園：班級編制", scope: "校方公布十班、半日課程時段及總學額；總學額不等於新一屆K1名額。", url: "https://www.ssckg.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/%E7%8F%AD%E7%B4%9A%E7%B7%A8%E5%88%B6/" },
    { label: "中華基督教會上水堂幼稚園：2027/28入學資訊", scope: "現屆申請接受時間、文件及報名費；需在招生年度內再核對更新。", url: "https://www.ssckg.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "上水校址班制、語言、師生比例和概覽年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1508430001" },
  ], [{ title: "兒童中心課程與校方公布的班額", featured: true, note: "校方公開總學額345及十班編制；總學額是校舍資料，不代表每年K1招生位或現有空缺。", details: [
    { label: "以遊戲、實物和親身探索支持主動學習", value: "校方課程簡介表示按兒童發展和生活經驗設計課程，透過有趣遊戲、群體合作、實物操作和探索活動，培養自發學習、表達及解難能力。家庭可觀察孩子是否喜歡動手和小組互動，再問學校各級如何逐步建立書寫與數學基礎。", sourceUrl: "https://www.ssckg.edu.hk/%E5%AD%B8%E6%A0%A1%E7%89%B9%E8%89%B2/%E8%AA%B2%E7%A8%8B%E7%B0%A1%E4%BB%8B/" },
    { label: "校方列十班、總學額345，不能當作年度K1收生位", value: "班級編制頁公布上、下午班合共十班，總學額345人，並提供上午9時至12時、下午1時15分至4時15分時段。這反映校方公布的整體編制；實際K1學額、候補情況和新年度班數仍須直接向學校確認。", sourceUrl: "https://www.ssckg.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/%E7%8F%AD%E7%B4%9A%E7%B7%A8%E5%88%B6/" },
    { label: "2027/28 K1接受全年遞交申請，備妥身份文件和回郵信封", value: "校方2027/28 K1資訊稱自2026年9月8日起全年派表和收表，需提交申請表、身份證明副本、兩個回郵信封及$40報名費。這是目前該屆公布程序；遞交申請不等於取得面見或學位，家庭應按校方最新通告核對資料。", period: "入學年度：2027/28", sourceUrl: "https://www.ssckg.edu.hk/" },
  ] }]),

  profile("549169", "按教育局校號549169及慈雲山慈康邨校址識別。校方近期有2026年消息並公開普通話、英語、自由遊戲及持續評估等特色；不由「雙語/多語」推算每日課時。", "https://ecfbck.edu.hk/", [
    { label: "恩恩創意幼稚園：校園特色及課程", scope: "主題教學、普通話教師、英語教師、自由遊戲、多元體驗和持續評估等校方自述。", url: "https://ecfbck.edu.hk/" },
    { label: "恩恩創意幼稚園：2026/27 K1入學須知", scope: "上一屆申請、面見及註冊流程；不推定為下一屆日期。", url: "https://ecfbck.edu.hk/wp-content/uploads/2025/10/K1%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E9%A0%88%E7%9F%A5_%E4%B8%AD%E6%96%8726-27-1-1.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及學費年度欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5491690001" },
  ], [{ title: "主題教學、自由遊戲與多語接觸", featured: true, note: "語言教師與課程特色由校方公布；課時比例、班級師生安排及成效未作推算。招生文件只作上一屆流程參考。", details: [
    { label: "校方列出普通話教師、英語教師與自由遊戲", value: "恩恩創意幼稚園官方網站列主題教學、駐校普通話教師、外籍英語教師、自由遊戲、多元學習體驗及持續評估。這為家庭了解課程接觸面提供線索，但不代表中英普三種語言平均分配；可向學校索取年級時間表和持續評估樣例。", sourceUrl: "https://ecfbck.edu.hk/" },
    { label: "校方近期活動包含社區參觀與生活主題", value: "校方2025/26活動紀錄列出參觀回收站、理財教育體驗館和公園等活動。這類外出學習可讓幼兒把主題內容連到生活環境；家長可問清活動頻率、各級安排和安全照顧方式。", period: "活動紀錄：2025/26學年", sourceUrl: "https://ecfbck.edu.hk/" },
  ] }]),

  profile("537349", "按教育局校號537349及何文田冠熹苑校址識別，與其他同名聖文嘉校舍分開。校方課程頁以何文田校名發布SMILE、自由遊戲和幼小銜接資訊。", "https://www.stmonica.edu.hk/", [
    { label: "聖文嘉幼稚園（何文田）：課程特色", scope: "何文田校舍的SMILE學習、情緒社交、探索活動、自由遊戲及小學適應自述。", url: "https://www.stmonica.edu.hk/?lang=en&page_id=4379" },
    { label: "聖文嘉幼稚園（何文田）：校方網站", scope: "學校校名及官方入口；按學校具體校名避免與其他分校混淆。", url: "https://www.stmonica.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "何文田校址班制、語言、師生比例及收費年度欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5373490001" },
    { label: "教育局幼稚園概覽歷史資料：聖文嘉幼稚園", scope: "校方當時提交的課程及支援描述；PDF屬較早期資料，不當作現行校本安排。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/537349e-0001.pdf" },
  ], [{ title: "SMILE、探索學習與小學適應", note: "課程特色按校方對何文田校舍頁面的自述；個別活動、學習機會和支援需向學校了解當屆安排。", details: [
    { label: "SMILE把社交、禮貌、探索和情緒教育放進日常學習", value: "校方以SMILE概念描述愉快學習，並列社交技巧、禮貌、探索、情緒管理、藝術、正向教育和自由遊戲等課程面向。這反映學校希望兼顧群體相處與情緒發展；家庭可參觀時觀察教師如何在日常活動中引導輪流、溝通和處理挫折。", sourceUrl: "https://www.stmonica.edu.hk/?lang=en&page_id=4379" },
    { label: "K3小學銜接包含家長資訊和模擬適應活動", value: "校方課程頁列出小學校長分享、家長講座、校本升小資料，以及參觀小學和模擬面試等K3銜接活動。這些屬學校公布的銜接機會，不表示能提高特定小學錄取率；家長可確認當屆活動內容及是否全級參與。", sourceUrl: "https://www.stmonica.edu.hk/?lang=en&page_id=4379" },
    { label: "早期教育局概覽可作歷史脈絡，不能替代現行資料", value: "教育局較早期的校方資料列主題教學和非華語支援等內容；由於該PDF年度較早，頁面不把它當成2026/27現行政策。若家庭重視特定支援或課程安排，應以校方當屆書面資料為準。", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/537349e-0001.pdf" },
  ] }]),
];
