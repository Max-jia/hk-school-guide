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

/** Kindergarten profile batch 56: official, campus-specific evidence. */
export const KINDERGARTEN_BATCH_56: PilotSchool[] = [
  profile("532800", "按教育局校號532800及長沙灣元州邨元盛樓地下識別。校方現行網站列辦學理念、課程和2026/27招生入口；宗教辦學方向不推斷為家庭信仰或學生必須參與的程度。", "https://www.calcklkg.edu.hk/tc/", [
    { label: "宣道會雷蔡群樂幼稚園：校方網站", scope: "元州邨校舍身份、辦學宗旨、校訓、課程活動及最新招生年度入口。", url: "https://www.calcklkg.edu.hk/tc/" },
    { label: "宣道會雷蔡群樂幼稚園：2026/27入學申請須知", scope: "當屆申請方式及校方公布的申請要求；臨近申請前仍需重核公告。", url: "https://www.calcklkg.edu.hk/attachment/upload/files/Admission_Form/en/ApplicationForm_en.pdf" },
  ], [{ title: "主題活動與信仰教育", featured: true, details: [
    { label: "校方以基督教校訓和全人發展作辦學方向", value: "學校網站列出箴言校訓，並展示多元活動、學習分享和校園藝術牆。這些是校方的辦學表述與活動例子，不等於每名幼兒的學習成果。家長可在參觀時了解宗教故事、節日活動和日常品格教育如何融入課程，也可觀察孩子是否有創作和表達空間。", sourceUrl: "https://www.calcklkg.edu.hk/tc/" },
    { label: "招生程序按年度更新，勿把過往日期當作下一屆安排", value: "校方網站已設2026/27申請入口，並提供入學申請須知；申請日程、報名費及註冊要求會按年度調整。家庭如正在準備下一屆，應以校方新公告為準，並確認面見形式和要帶的文件。", period: "校方招生資料：2026/27", sourceUrl: "https://www.calcklkg.edu.hk/attachment/upload/files/Admission_Form/en/ApplicationForm_en.pdf" },
  ] }]),

  profile("535583", "按教育局校號535583及天水圍天華邨服務設施大樓3樓2號幼稚園識別。教育局概覽提供現屆基本和課程資料；可讀到的詳細教學說明來自2022/23概覽，故本頁明確標年，不把當時人員、容量或費用當作現況。", "http://www.bcsgkg.edu.hk", [
    { label: "教育局《幼稚園概覽2022/23》：浸信會華恩幼稚園", scope: "校方當時提供的課程規劃、學習模式、設施及年度人員資料；不是現屆人手或學額。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/535583c-0001.pdf" },
    { label: "教育局：2026/27幼稚園概覽", scope: "校號535583校址當屆班制、語言、師生比例和學費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5355830001" },
    { label: "浸信會華恩幼稚園：官方網站", scope: "校方網站入口；若課程頁或招生資訊更新，以校方當屆公告為準。", url: "http://www.bcsgkg.edu.hk" },
  ], [{ title: "主題課程與兒童自主", featured: true, note: "細節取自教育局2022/23概覽中的學校申報資料，屬有年份的課程快照。", details: [
    { label: "舊版概覽記錄以生活經驗和興趣設計主題課程", value: "教育局2022/23概覽中的校方資料描述，課程按兒童身心發展、生活經驗和興趣安排，透過主題及多元活動培養自主、自理和自學。這是該學年學校申報的方向，不代表2026/27仍完全相同；家長宜索取新課程簡介，並觀察教師如何支持不同步伐的孩子。", period: "教育局概覽：2022/23", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/535583c-0001.pdf" },
    { label: "過往設施和容量數字不可當作現屆學額", value: "同一份概覽列出2021年課室容量、教職員數和設施，均屬歷史資料；它們不等於目前學生人數、K1招生名額或可用空缺。若家庭要評估班級規模，應向校方確認當屆各級班數和學生人數。", period: "教育局概覽：2022/23；容量與人員數據為2021年資料", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/535583c-0001.pdf" },
  ] }]),

  profile("231657", "按教育局校號231657及馬鞍山錦英路富寶花園校址識別康傑中英文幼稚園（馬鞍山）。校方網站明確說明雙語班、英語拼音和普通話活動；語言課程比重為校方自述，並非外部課時審計。", "https://mos.good-health.edu.hk/", [
    { label: "康傑中英文幼稚園（馬鞍山）：學制與語言", scope: "馬鞍山正校的半日／全日班、英粵雙語教學、普通話活動和英語拼音介紹。", url: "https://mos.good-health.edu.hk/class/" },
    { label: "康傑中英文幼稚園（馬鞍山）：課程策略", scope: "興趣、遊戲、觀察探究、生活經驗和家校合作等校方理念。", url: "https://mos.good-health.edu.hk/" },
    { label: "康傑教育機構：聯絡資料", scope: "馬鞍山校舍地址、電話及電郵。", url: "https://mos.good-health.edu.hk/contact-us/" },
  ], [{ title: "英粵雙語與生活化課程", featured: true, details: [
    { label: "校方稱中英文學習比重大致相等，另設普通話活動", value: "馬鞍山正校校方介紹半日及全日班均以廣東話和英語授課，稱中英文學習比重大致相等，中文課程另有普通話活動，英語課程由外籍教師教授並著重拼音。這是校方公開的課程描述，頁面沒有逐級每週時間表；重視語言比例的家庭應索取當屆課表確認實際時數。", sourceUrl: "https://mos.good-health.edu.hk/class/" },
    { label: "興趣和遊戲是課程策略，家長可觀察孩子的主動程度", value: "校方把興趣、遊戲、觀察、探究和思考列為學習方法，並稱課程會連結生活經驗和社區資源。家長參觀時可留意教師如何從遊戲延伸詞彙、數感和解難，亦可確認半日與全日班在活動、午膳和休息安排上的差異。", sourceUrl: "https://mos.good-health.edu.hk/" },
  ] }]),

  profile("158976", "按教育局校號158976及天水圍天耀邨耀康樓地下識別。校方現行頁列繪本以情啟學、幼兒本位、英語與普通話活動；具體教學觀察另有2018/19報告，僅按歷史年度理解。", "https://www.twghwcwfkg.edu.hk/", [
    { label: "東華三院黃朱惠芬幼稚園：課程及教學特色", scope: "繪本教學、生活經驗、兩文三語及校方課程介紹。", url: "https://www.twghwcwfkg.edu.hk/?p=524" },
    { label: "東華三院黃朱惠芬幼稚園：聯絡資料", scope: "天水圍校址、聯絡方式及校方2026/27招生入口。", url: "https://www.twghwcwfkg.edu.hk/contact/" },
    { label: "東華三院：黃朱惠芬幼稚園30周年校慶資料", scope: "2023年機構對繪本綜合課程、情境學習及遊戲英語的介紹。", url: "https://www.tungwah.org.hk/press-release/東華三院黃朱惠芬幼稚園30周年校慶典禮/" },
    { label: "東華三院黃朱惠芬幼稚園：2018/19學校報告", scope: "當年課程與評估記錄；不作現屆教學成果證據。", url: "https://www.twghwcwfkg.edu.hk/wp-content/uploads/2020/09/2018-2019-School-Report.pdf" },
  ], [{ title: "繪本以情啟學與生活連結", featured: true, details: [
    { label: "繪本把情感、生活經驗和活動串起來", value: "校方現行介紹以幼兒生活經驗、能力和興趣作課程基礎，並以繪本強調愛的教育，透過故事連結生活情境。東華三院2023年校慶資料也提及繪本綜合課程和遊戲英語。這些資料說明校方的課程取向，不代表每節課都採用同一模式；家長可觀察孩子是否有討論、創作和把故事用於生活的機會。", period: "機構資料：2023；校方課程頁現行版本", sourceUrl: "https://www.twghwcwfkg.edu.hk/?p=524" },
    { label: "兩文三語接觸不等於公開了語言時數", value: "校方介紹到校普通話和外籍英語教師，並以遊戲、角色扮演、兒歌和故事引起幼兒學習外語的興趣。公開頁沒有列逐級課時或日常語言比例，不宜把「兩文三語」解讀成三種語言平均授課；家庭可索取當屆時間表和語言活動安排。", sourceUrl: "https://www.twghwcwfkg.edu.hk/?p=524" },
  ] }]),

  profile("158828", "按教育局校號158828及大埔富亨邨亨隆樓地下識別。校方聯絡頁確認地址和電話；當屆班制、語言、比例及費用取自教育局2026/27概覽，課程申報也在同一年度概覽中，未引用舊招生表作現況。", "https://www.tpmak.edu.hk/?lang=zh", [
    { label: "大埔商會幼稚園：校方聯絡資料", scope: "富亨邨校址、電話、郵箱和辦公時間。", url: "https://www.tpmak.edu.hk/?lang=zh&page_id=60" },
    { label: "教育局：2026/27幼稚園概覽", scope: "校號158828校址當屆班制、課程申報、授課語言、師生比例及費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1588280001" },
    { label: "大埔商會幼稚園：校方首頁", scope: "校方公告與辦學資訊入口；具體招生安排按當屆通知核實。", url: "https://www.tpmak.edu.hk/?lang=zh" },
  ], [{ title: "課程與家庭日常安排", featured: true, details: [
    { label: "以當屆教育局概覽核對課程和班制", value: "教育局2026/27概覽按校號158828列出本校課程與班制資料，是目前較新的校址匹配來源。家長比較時應把上午、下午或全日安排與接送、午膳和家庭照顧時間一起考慮；同一頁上的學生數或課室資料不等於K1收生名額。", period: "教育局概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1588280001" },
    { label: "校方網站可核對聯絡與行政時間，招生細節需看當屆文件", value: "校方聯絡頁列富亨邨校址、電話和辦公時間；這些是家長直接查詢的可靠入口。現有舊招生表的日期和費用已過適用期，因此本頁不沿用；有意申請者宜向校方索取最新收費證明和K1程序。", sourceUrl: "https://www.tpmak.edu.hk/?lang=zh&page_id=60" },
  ] }]),

  profile("158984", "按教育局校號158984及將軍澳浩明苑地下識別東華三院力勤幼稚園。校方目前可見的詳細課程頁最後更新較早，頁面已標註其證據限制；2026/27招生文件只作申請入口，不套用已過期日期。", "https://www.twghnkkg.edu.hk/", [
    { label: "東華三院力勤幼稚園：課程及教學特色", scope: "校方公布的繪本教學、循環再用物料及日常英語互動例子。", url: "https://www.twghnkkg.edu.hk/" },
    { label: "東華三院力勤幼稚園：2026/27收生程序", scope: "當屆招生程序官方文件；不在頁面重述已過日期。", url: "https://www.twghnkkg.edu.hk/wp-content/uploads/2025/09/NKKG_2_2026-27-%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99-%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8F.pdf" },
    { label: "教育局：2026/27幼稚園概覽", scope: "浩明苑校址當屆班制、語言、師生比例及收費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1589840001" },
  ], [{ title: "繪本、閱讀與環保創作", featured: true, note: "校方詳細特色頁含較早年度案例，本頁只描述校方曾公開的做法；家庭應向校方核對當屆更新。", details: [
    { label: "繪本可延伸成手作和生活情境活動", value: "校方課程頁舉例，教師曾用繪本情節引導幼兒討論派對，再製作帽子和食物；頁面亦展示以糖紙和循環再用物料作創作的例子。這些是校方公布的教學片段，不足以證明現屆頻率。若家庭重視閱讀或環保教育，可詢問各級閱讀計劃和材料探索如何安排。", sourceUrl: "https://www.twghnkkg.edu.hk/" },
    { label: "校方曾提供課外英語互動，公開資料未列當屆時數", value: "學校網站提及外籍教師曾在課堂以外與幼兒交談，讓孩子有更多日常英語接觸。該頁最後更新較早，不能據此斷定2026/27師資和英語安排；報名前可向校方確認現行語言教學、教師配置和不同級別時間表。", sourceUrl: "https://www.twghnkkg.edu.hk/" },
  ] }]),

  profile("540498", "按教育局校號540498及葵涌石蔭邨石蔭商場平台B及C單位識別主蔭幼稚園。校方官方網站列各級上課時間、接送及校務規則；教育局概覽補足年度資料，頁面未由過期招生資料推算申請時程。", "https://www.anani.edu.hk/", [
    { label: "主蔭幼稚園：校方家長通知", scope: "K1至K3半日班和全日班時間及接送、安全規則；以校方最新通知核實。", url: "https://www.anani.edu.hk/notice-to-parents/?lang=en" },
    { label: "主蔭幼稚園：收生簡介", scope: "招生和註冊資料入口；頁面出生年份與日期需按當屆更新。", url: "https://www.anani.edu.hk/收生簡介/" },
    { label: "教育局：2026/27幼稚園概覽", scope: "石蔭校址當屆班制、語言、師生比例及收費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5404980001" },
  ], [{ title: "班級作息與接送安全", featured: true, details: [
    { label: "各級半日班下課時間並不完全相同", value: "校方家長通知列出K1、K2和K3半日班各自的上課時間，全日班則至下午4時30分。不同年級的上午時段略有差異，接送家庭應按孩子級別安排交通和照顧；如考慮全日班，亦要另行核對午膳、午睡和延長照顧服務。", sourceUrl: "https://www.anani.edu.hk/notice-to-parents/?lang=en" },
    { label: "校方設學生證核對接送身份", value: "家長通知要求接送者出示學生證或有效身份證明，若由非家庭成員接送須事先通知。這類安排對需要由祖父母、保姆或輪班家長接送的家庭尤其實際；報名前可確認臨時代接、校車接送和惡劣天氣時的最新流程。", sourceUrl: "https://www.anani.edu.hk/notice-to-parents/?lang=en" },
  ] }]),

  profile("324426", "按教育局校號324426及觀塘順安邨安逸樓地下至一樓識別善一堂安逸幼稚園。校方課程頁列主題／方案教學、遊戲探索與持續觀察；非華語支援資料包含部分舊措施，特定服務頻率不作現況承諾。", "https://www.syt.edu.hk/sytoyk/", [
    { label: "善一堂安逸幼稚園：課程規劃", scope: "校本課程、主題與方案教學、遊戲探索和持續觀察評估。", url: "https://www.syt.edu.hk/sytoyk/aboutus.php?type=5" },
    { label: "善一堂安逸幼稚園：非華語幼兒支援", scope: "校方公布的中文學習支援資源和家校溝通措施；部分項目未標出當屆頻率。", url: "https://www.syt.edu.hk/sytoyk/information.php?type=3" },
    { label: "善一堂安逸幼稚園：2025/26核准收費通知", scope: "2025/26核准半日及全日班學費、全日班膳食費；不是2026/27報價。", url: "https://www.syt.edu.hk/sytoyk/assets/common_uploaded/3023/2391_euq.pdf" },
  ], [{ title: "主題探索與語文支援", featured: true, details: [
    { label: "幼兒從遊戲、探索和分享累積學習經驗", value: "校方按幼兒發展、生活經驗和興趣設計主題及方案教學，透過探索、遊戲、實驗、參觀、資料搜集和討論學習。學校也描述以觀察、習作和家長／幼兒會談了解發展。家長可留意教師如何記錄孩子進步，以及如何為較慢熱或需要額外引導的幼兒調整活動。", sourceUrl: "https://www.syt.edu.hk/sytoyk/aboutus.php?type=5" },
    { label: "非華語支援以圖書、遊戲和溝通渠道為核心", value: "校方支援頁提及以繪本和遊戲引發中文學習、提供通告英文版本及協助家長理解學習表現，也列教學助理和小組支援等做法。頁面部分措施未標明適用學年或服務時數；有需要的家庭應直接確認本年度支援語言、頻率和聯絡安排。", sourceUrl: "https://www.syt.edu.hk/sytoyk/information.php?type=3" },
  ] }]),

  profile("231690", "按教育局校號231690及深井海韻花園第一座一樓識別栢基海韻幼稚園，與第五座平台的國際幼兒園分開。校方2026/27招生頁列本地幼稚園部的語言、班制和費用，沒有把幼兒園部PN收費或課程套用至K1-K3。", "https://www.pipsrg.edu.hk/", [
    { label: "栢基海韻幼稚園：幼稚園部招生與課程", scope: "第一座校舍K1至K3班制、英粵雙語、課程活動、2026/27費用和上課時間。", url: "https://www.pipsrg.edu.hk/tc/admissions_kg.asp" },
    { label: "栢基海韻幼稚園：校本主題課程", scope: "幼稚園部主題內容、自然觀察、語文、創作和體驗活動。", url: "https://www.pipsrg.edu.hk/tc/teaching_ourprogramme.asp" },
    { label: "栢基海韻幼稚園：官方聯校開放日資料", scope: "幼稚園部與第五座國際幼兒園的分址及課程體驗分開列示。", url: "https://www.pipsrg.edu.hk/document/OpenDay.pdf" },
  ], [{ title: "英粵雙語與主題探索", featured: true, details: [
    { label: "幼稚園部以英語和廣東話授課，另有英語堂及普通話堂", value: "校方2026/27招生頁明確把幼稚園部列為英語及廣東話雙語授課，另設英語堂和普通話堂。課程活動包括閱讀、語文、創作、體能、音樂、探索和參觀；頁面未列逐級語言時數，故不能判斷英語佔全天比例。", period: "校方招生資料：2026/27", sourceUrl: "https://www.pipsrg.edu.hk/tc/admissions_kg.asp" },
    { label: "主題設計包含生活和自然觀察，校舍身份要填對", value: "校方主題課程展示「奇妙的我」、自然、動物、香港和健康等生活主題，並列觀察大自然、種植和小實驗等內容。幼稚園部位於第一座一樓；第五座平台的國際幼兒園屬另一服務部門，PN年齡和收費不應直接套到本頁K1至K3。", sourceUrl: "https://www.pipsrg.edu.hk/tc/teaching_ourprogramme.asp" },
  ] }]),

  profile("231533", "按教育局校號231533及荃灣麗城薈二期三座地下11號識別聖文嘉中英文幼稚園（荃灣）。校方網站有2026/27申請資訊和近期校園活動；本頁以教育局及校方目前公布的麗城薈地址為準，家長應以報名前校方最新通知確認上課地點。", "https://www.stmonicakg.edu.hk/", [
    { label: "聖文嘉中英文幼稚園（荃灣）：校方首頁", scope: "校方公布的課程特色、校園動態、麗城薈地址及聯絡資料。", url: "https://www.stmonicakg.edu.hk/" },
    { label: "聖文嘉中英文幼稚園（荃灣）：2026/27入學須知", scope: "指定年度申請、註冊和校址資料；申請程序按當屆通告為準。", url: "https://www.stmonicakg.edu.hk/入學申請須知/" },
    { label: "教育局：2026/27幼稚園概覽", scope: "荃灣麗城薈校址當屆班制、語言、比例和收費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2315330001" },
  ], [{ title: "正向學習與申請核實", featured: true, details: [
    { label: "校方把正向思維、主動學習和多元智能列作課程特色", value: "學校網站以正向思維、主動學習、多元智能、家校合作和教師培訓介紹課程，也展示朗誦、表演及校園活動。這些屬校方公布的教育方向和活動，不代表每名幼兒都參與相同項目；家庭可了解各級課程如何安排遊戲、表達和情緒支援。", sourceUrl: "https://www.stmonicakg.edu.hk/" },
    { label: "申請資料應以當屆校方公告和教育局校址為準", value: "教育局現有校址與校方2026/27申請資料均列荃灣麗城薈二期三座地下11號。招生程序或上課地點如有更新，應以校方新公告為準；安排通勤前，家長可直接確認申請表上的校舍地址和面見地點。", period: "教育局名錄：2026-09-30；校方申請資料：2026/27", sourceUrl: "https://www.stmonicakg.edu.hk/入學申請須知/" },
  ] }]),
];
