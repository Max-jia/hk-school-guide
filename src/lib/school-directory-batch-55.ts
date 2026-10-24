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

/** Kindergarten profile batch 55: campus-matched EDB and school evidence. */
export const KINDERGARTEN_BATCH_55: PilotSchool[] = [
  profile("158461", "按教育局校號158461及青衣長安邨安清樓登記校址識別。中華回教博愛社辦學介紹與校方活動材料提供課程背景；不把伊斯蘭身份推演成每名學生的宗教實踐或家庭要求。", "https://www.islamicpokoikg.edu.hk/", [
    { label: "伊斯蘭博愛幼稚園：校方收生安排", scope: "學校只提供半日及全日課程；網頁含特定學年的日期和收費，不作現屆招生時間依據。", url: "https://www.islamicpokoikg.edu.hk/收生安排/" },
    { label: "中華回教博愛社：伊斯蘭博愛幼稚園介紹", scope: "辦學團體對兒童本位、愉快學習及全人發展的介紹；屬團體自述。", url: "https://www.cmcfa.org.hk/mechanism1/2025-02-05/152.html" },
    { label: "伊斯蘭博愛幼稚園：2023/24中華文化校本活動", scope: "K1至K3以成語故事延伸文化活動的歷史例子；不代表每年相同安排。", url: "https://www.islamicpokoikg.edu.hk/wp-content/uploads/2024/10/中華文化活動展示資料.pdf" },
    { label: "教育局：伊斯蘭博愛幼稚園註冊搜尋", scope: "校號158461及青衣長安邨安清樓登記校址。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=158461000112" },
  ], [{ title: "兒童本位與文化學習", featured: true, details: [
    { label: "辦學團體以兒童為本，重視愉快學習", value: "辦學團體介紹學校以兒童為主導，透過愉快學習發展潛能、創作精神和溝通能力。這是辦學團體對教育方向的描述，不是對學習成果的獨立評估。家長可在參觀時觀察教師如何按孩子的興趣和能力調整活動，並了解全日班與半日班的日常節奏。", sourceUrl: "https://www.cmcfa.org.hk/mechanism1/2025-02-05/152.html" },
    { label: "文化活動有官方例子，屬特定學期的安排", value: "校方2023/24下學期的中華文化活動資料記錄，K1至K3曾以成語故事作主題，再延伸不同活動。這能說明學校曾採用故事帶動文化學習，但不能推定現屆活動頻率或各級課時；如這是家庭重視的特色，可向校方索取本年度課程計劃。", period: "校方材料：2023/24下學期", sourceUrl: "https://www.islamicpokoikg.edu.hk/wp-content/uploads/2024/10/中華文化活動展示資料.pdf" },
  ] }]),

  profile("158526", "按教育局校號158526及將軍澳寶林邨寶德樓校址識別，與同辦學團體的馬鞍山校舍分開。校方網站列出現行班制、校車及2026年活動；網站招生頁中的年齡和日期屬指定學年，不沿用作下屆安排。", "https://www.ttmgkg.edu.hk/tc", [
    { label: "崇真會美善幼稚園：基本資料", scope: "寶林校舍班級、上課時段及服務時間；頁面收費表只列2023/24及2024/25，未當作現屆收費。", url: "https://www.ttmgkg.edu.hk/tc/基本資料" },
    { label: "崇真會美善幼稚園：幼兒天地", scope: "校方公布的各級活動，例如2025/26文化、故事和社區參觀活動。", url: "https://www.ttmgkg.edu.hk/tc/school_albums/全校活動" },
    { label: "崇真會美善幼稚園：收生指南", scope: "申請程序入口；頁面含指定學年出生年份，不將該年度條件挪用至未來學年。", url: "https://ttmgkg.edu.hk/tc/收生指南" },
  ], [{ title: "社區體驗與混合學習節奏", featured: true, details: [
    { label: "寶林校舍設半日及全日班，日程跨度不同", value: "校方基本資料列出上午班、下午班和全日班，也列服務時間為上午8時至下午6時。半日班與全日班的在校時間差異，會直接影響家庭接送、午膳和孩子休息安排；頁面收費表只到2024/25，預算應以校方當屆核准收費為準。", sourceUrl: "https://www.ttmgkg.edu.hk/tc/基本資料" },
    { label: "近年活動包括社區參觀、故事和親子體驗", value: "校方活動頁列有寶林邨設施、小學參觀、繪本工作坊及親子活動等項目。這些頁面證明相關活動曾舉行，並非每名幼兒必定參加或每年固定重辦；家長可詢問各級活動頻率、交通安排和家長參與要求。", period: "校方活動頁：2025–2026", sourceUrl: "https://www.ttmgkg.edu.hk/tc/school_albums/全校活動" },
  ] }]),

  profile("156191", "按教育局校號156191及上水金錢村第92號地段識別。校方現行網站說明兒童中心、主題和活動教學，以及H.A.P.P.Y愉快學習方向；校方2024/25報告提供當年關注事項，不據此推斷當屆成果。", "https://www.ktvhtkg.edu.hk/", [
    { label: "金錢村何東幼稚園：校方理念與課程", scope: "兒童中心、主題設計、活動教學、探索及英語課程的校方介紹。", url: "https://www.ktvhtkg.edu.hk/" },
    { label: "金錢村何東幼稚園：2024/25學校報告", scope: "該年度中華文化主題關注事項；只作年度課程例子。", url: "https://www.ktvhtkg.edu.hk/wp-content/uploads/2025/06/30d18d3fb00dc962395a737ab0d6269e.pdf" },
  ], [{ title: "愉快學習與親身探索", featured: true, details: [
    { label: "課程按兒童發展、興趣和能力編排", value: "校方表示依照《學前教育課程指引》，以兒童為中心，結合主題設計和活動教學，並透過親身體驗、探索和實地參觀豐富學習。這種設計重視幼兒主動參與；參觀時可看教師如何把孩子的提問延伸成語言、數概念或生活觀察，而不只看活動種類。", sourceUrl: "https://www.ktvhtkg.edu.hk/" },
    { label: "H.A.P.P.Y是學校理念標籤，應看日常教學如何落實", value: "學校以H.A.P.P.Y代表愉快學習，並連結品格、分享、關愛和迎接挑戰等目標。這些是校方設定的教育方向，不等於可量化的性格成效；家長可進一步了解幼兒如何獲得選擇、嘗試和表達的機會，以及英語課程在不同年級如何安排。", sourceUrl: "https://www.ktvhtkg.edu.hk/" },
  ] }]),

  profile("575666", "按教育局校號575666及天水圍天晴邨綜合大樓校址識別。課程特色使用校方2026年年度報告，校舍地址及年度收費另以教育局資料核對；報告中的招生壓力描述只代表學校當年度背景。", "http://www.peck.edu.hk/tinshuiwai/?lang=zh", [
    { label: "平安福音堂幼稚園（天水圍）：2026年學校報告", scope: "天水圍校舍的蒙特梭利五區、自選混齡活動、戶外體驗和全日班活動安排。", url: "https://www.tmpec.org/files/2026/Y2026PEC.pdf" },
    { label: "教育局：2025/26收費證明書", scope: "該學年度天水圍校舍核准費用；不代表2026/27收費。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/575666.pdf" },
    { label: "教育局：2026/27幼稚園概覽", scope: "天水圍校址的年度班制、語言、師生比例及收費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5756660001" },
  ], [{ title: "蒙特梭利自選與全日活動", featured: true, details: [
    { label: "混齡自選時段讓幼兒操作教具和觀察同伴", value: "校方2026年報告列出日常生活、感官、數學、語文和文化五個蒙特梭利學習區，並描述混齡自選時段，讓幼兒選擇教具操作。這是校方年度材料所述的教學安排；家長可觀察教師如何示範教具、追蹤孩子進度，以及不同年齡幼兒如何共同使用空間。", period: "校方報告：2026", sourceUrl: "https://www.tmpec.org/files/2026/Y2026PEC.pdf" },
    { label: "全日班下午另有興趣活動，需與半日課程分開理解", value: "同一份報告列出全日班下午曾安排英語、中華文化手工藝、體能、語文和雙語故事等活動。這些是天水圍校舍的校方資料，不能套用到平安福音堂其他分校，也不代表每個項目每週同等頻率；申請前宜核對當屆全日班作息及額外費用。", period: "校方報告：2026", sourceUrl: "https://www.tmpec.org/files/2026/Y2026PEC.pdf" },
  ] }]),

  profile("550663", "按教育局校號550663及牛頭角上邨常滿樓地下識別，與天水圍、青衣兩所同名分校分開。現有詳細官方評核材料為2024年重點視學報告；未找到可核實的分校課程細節時，只保留當屆教育局概覽資料，不借用其他分校的課程描述。", "http://www.peck.edu.hk/", [
    { label: "教育局：平安福音堂幼稚園（牛頭角）重點視學報告", scope: "校號550663的教育局重點視學結果；只按報告時間理解，不將其作排名。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FI_PEC_NTK.pdf" },
    { label: "教育局：牛頭角區學校名單（2026-09-30）", scope: "牛頭角校舍校號、校址、電話、授課時段和官方網站登記。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kt.html" },
    { label: "教育局：2026/27幼稚園概覽", scope: "牛頭角校舍當屆班制、語言、師生比例及學費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5506630001" },
  ], [{ title: "分校資料邊界與家長核對重點", featured: true, details: [
    { label: "牛頭角校舍的身分及基本資料可由教育局分校條目核對", value: "教育局2026年9月區內學校名單列出牛頭角上邨常滿樓地下、校號550663、上午／下午／全日班及聯絡電話。這些資料只指牛頭角校舍；平安福音堂其他地區分校的地址、活動和課程材料不應直接套用。", period: "教育局學校名單：2026-09-30", sourceUrl: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-kt.html" },
    { label: "重點視學報告是特定時點觀察，不能當作即時表現排名", value: "教育局有校號550663的重點視學報告，但報告呈現的是當時視學觀察，不是排名，也不能單獨代表2026/27每班的日常教學。若家長希望比較其課程特色，建議直接索取牛頭角校舍現行課程簡介、作息表與全日班活動表，並確認校方如何支持不同步伐的幼兒。", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/FI_PEC_NTK.pdf" },
  ] }]),

  profile("550035", "按教育局校號550035及彩雲邨紫霄樓地下識別。辦學宗旨與課程主題引用香港幼稚園協會校方資料；2025/26招生程序只作歷史年期材料，沒有沿用其收生人數、校車或收費作現況。", "https://www.hkkaps.edu.hk/", [
    { label: "香港幼稚園協會幼兒學校：辦學宗旨與課程", scope: "兒童中心、家長本位、探索、多媒體教材、兩文三語及多元智能的校方介紹。", url: "https://www.hkkaps.edu.hk/" },
    { label: "香港幼稚園協會幼兒學校：2025/26招生程序", scope: "指定學年度的地址、課室、課程和招生資料；不代表下屆名額或收費。", url: "https://www.hkkaps.edu.hk/wp-content/uploads/2024/08/2025-2026年度招生程序.pdf" },
    { label: "教育局：2026/27幼稚園概覽", scope: "彩雲邨校址的當屆班制、語言、師生比例及費用概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5500350001" },
  ], [{ title: "兒童探索與家校延伸", featured: true, details: [
    { label: "以幼兒為中心，也把家長納入學習支持", value: "校方以「幼兒為中心、家長為本位」描述辦學方向，並把探索精神、正向價值和全人發展列為目標。對家長而言，值得確認的是家庭參與是否有彈性、教師會用甚麼方式回饋幼兒進度，以及多媒體教材如何配合課堂而非增加家庭額外負擔。", sourceUrl: "https://www.hkkaps.edu.hk/" },
    { label: "校方提供兩文三語和多元智能項目介紹，未提供語言時數", value: "學校網站列出兩文三語、多元智能和多媒體教材等課程方向，但首頁沒有列出各語言逐日或每週授課時數。這些標籤說明校方規劃方向，不足以判斷英語或普通話的比重；有明確語言目標的家庭可索取當屆時間表及活動語言安排。", sourceUrl: "https://www.hkkaps.edu.hk/" },
  ] }]),

  profile("536482", "按教育局校號536482及石硤尾白田邨盛田樓地下識別，與同辦學團體其他美善校舍分開。採用白田校方現行課程頁，涵蓋自主學習、體驗／遊戲教學和中英表達；入學日期只連結最新公告，不在本頁重述舊年度流程。", "https://www.ptgraceful.edu.hk/", [
    { label: "崇真會白田美善幼稚園：課程", scope: "白田校舍主題統整、體驗及遊戲學習、語文發展和生命教育。", url: "https://www.ptgraceful.edu.hk/site/page2.php?id=14" },
    { label: "崇真會白田美善幼稚園：聯絡我們", scope: "白田校舍官方地址和聯絡方式。", url: "https://www.ptgraceful.edu.hk/site/contactus.php" },
    { label: "教育局：2026/27幼稚園概覽", scope: "白田校址當屆班制、語言、師生比例及費用概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5364820001" },
  ], [{ title: "體驗式學習與中英表達", featured: true, details: [
    { label: "主題學習從探索、經驗走向表達", value: "白田校方課程頁把自主學習和中英表達列為課程發展核心，並以主題統整、體驗式及遊戲學習連結幼兒生活經驗。教師描述的學習歷程包括探索、經驗和表達，也有社區參觀、情境模擬等延伸活動。參觀時可看孩子是否有機會自行嘗試、分享發現，而不只跟隨示範完成作品。", sourceUrl: "https://www.ptgraceful.edu.hk/site/page2.php?id=14" },
    { label: "英語包括拼音和情境活動，課時仍應以當屆時間表核對", value: "校方表示會在課堂、主題情境和英語學習週營造英語語境，並安排系統化拼音教學。頁面沒有逐級列出每週英語課時，也沒有獨立成效數據；若家庭想銜接特定小學或希望孩子增加英語接觸，宜核對K1至K3的實際安排與家庭配合要求。", sourceUrl: "https://www.ptgraceful.edu.hk/site/page2.php?id=14" },
  ] }]),

  profile("543390", "按教育局校號543390及秀茂坪寶達邨達峰樓地下識別。校方現行網站包含校園簡介、體驗式學習活動、升小資訊與收生入口；不把活動展示等同每名幼兒可參加或固定課時。", "https://www.stfalkwkg.edu.hk/", [
    { label: "順德聯誼總會梁潔華幼稚園：校方首頁", scope: "校址、聯絡資料和校方最新消息。", url: "https://www.stfalkwkg.edu.hk/" },
    { label: "順德聯誼總會梁潔華幼稚園：課室外體驗學習活動", scope: "校方展示的校外體驗學習活動，反映曾公布的活動形式。", url: "https://www.stfalkwkg.edu.hk/index.php/section/notice/2164" },
    { label: "教育局：2026/27幼稚園概覽", scope: "寶達邨校址當屆班制、語言、師生比例及費用概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5433900001" },
  ], [{ title: "校外體驗與升小銜接資訊", featured: true, details: [
    { label: "學校展示校外體驗式學習，家長可追問各級參與情況", value: "校方網站設有「課室外進行的體驗式學習活動天地」，並持續刊載校園動態。這表明學校曾安排課室以外的學習活動，但公開頁沒有完整列出每級頻率、交通方式或所有幼兒參與比例。若家庭重視體驗學習，可詢問當屆活動如何融入主題，以及是否涉及額外費用或家長陪同。", sourceUrl: "https://www.stfalkwkg.edu.hk/index.php/section/notice/2164" },
    { label: "校方設升小資訊入口，但不等於公布升學結果", value: "網站有獨立的升小資訊版面，可作家長了解銜接安排的入口；目前不以這個入口推斷各校錄取率、升學去向或保證銜接。報名前可向校方詢問升小支援的具體內容、何時開始，以及家長需要配合的部分。", sourceUrl: "https://www.stfalkwkg.edu.hk/" },
  ] }]),

  profile("546127", "按教育局校號546127及青衣長宏邨宏正樓、宏毅樓地下識別青衣校舍，與牛頭角及天水圍分校分開。教育局註冊名錄和2025/26概覽可核實校舍資料；質素評核報告為較早年度，僅作歷史記錄，未把其他分校課程套用到青衣。", "http://www.peck.edu.hk/", [
    { label: "教育局：平安福音堂幼稚園（青衣）質素評核報告", scope: "青衣校舍歷史評核觀察；報告年份較早，不是現況排名。", url: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/PEC_TY.pdf" },
    { label: "教育局：2025/26青衣校舍幼稚園概覽", scope: "2025/26該校舍的班制、語言、師生比例和收費資料；不冒充2026/27數值。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6206" },
    { label: "教育局：2026/27葵涌及青衣K1至K3空缺摘要", scope: "教育局在2026年公布的該學年度各級空缺狀態；只供該公告時點參考，非招生承諾。", url: "https://www.edb.gov.hk/attachment/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/Vacancy%20Info_Districts/TC/Kwai%20Chung%20and%20Tsing%20Yi_K1-K3%20Vacancy.pdf" },
  ], [{ title: "青衣校舍資料與現況核對", featured: true, note: "教育局可核對青衣校舍註冊地址和年度資料；可取得的校舍專屬教學觀察屬舊年度，因此本頁不以平安福音堂其他分校的課程報告代替。", details: [
    { label: "三個分校的課程資料不可互相代用", value: "青衣校舍登記於長宏邨宏正樓及宏毅樓地下。雖然同屬平安福音堂幼稚園，天水圍校方2026年報告和牛頭角的教育局視學材料都只對應各自校舍，不能作青衣現行課程證據。家長可向青衣校舍索取當屆課程簡介，確認語言活動、班級安排和全日班作息。", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
    { label: "教育局歷史評核和年度概覽各自有適用範圍", value: "青衣校舍有教育局質素評核報告，但屬較早年度；另可查到2025/26概覽以及教育局2026/27空缺摘要。空缺摘要是發布時點的名額狀態，不代表全年空位或錄取承諾；比較師生比例、費用和課程時也要分開年份。", period: "教育局材料：質素評核歷史報告；概覽2025/26；空缺摘要2026/27", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6206" },
  ] }]),

  profile("517518", "按教育局校號517518及大嶼山大澳龍田邨第二期幼稚園座KG01室識別。校方教育目標和課程特色按現行網站呈現，2024年招生資料僅作班制及家庭支援條件參考，不將其舊收費、名額或日期當作現況。", "https://www.bcmk.edu.hk/", [
    { label: "佛教張梅桂幼稚園：教育目標與課程特色", scope: "全人教育、遊戲教學、美藝探索及持續評估的校方自述。", url: "https://www.bcmk.edu.hk/" },
    { label: "佛教張梅桂幼稚園：2024新生報名資料", scope: "特定年度班制、上課時段、費用和收生名額；全部不視為現屆資料。", url: "https://www.bcmk.edu.hk/upload/images/1722831398818.pdf" },
    { label: "教育局：離島區學校名單（2026-09-30）", scope: "校號517518、校址、電話、授課時段及官方網站。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-i.html" },
  ], [{ title: "遊戲探索與全人發展", featured: true, details: [
    { label: "校方以遊戲教學和美藝元素引導探索", value: "學校把佛教慈悲精神、全人發展和五育並重列為教育目標，並介紹以美藝元素培養觀察與創造力，以及以遊戲策略帶動主題探索和自主學習。這是校方描述的課程方向；家長可留意孩子是否有機會選擇材料、表達想法，並了解不同年級如何安排遊戲與語文、數概念活動。", sourceUrl: "https://www.bcmk.edu.hk/" },
    { label: "全日班與家庭支援需按當屆政策確認", value: "校方2024年招生資料曾列半日及全日班，並說明申請全日服務會考慮家庭需要；文件中的費用、名額和出生年份屬該年度，不可沿用至現屆。大澳通勤和接送對家庭尤其實際，建議直接確認現行班制、交通服務及家庭支援安排。", period: "校方招生資料：2024年", sourceUrl: "https://www.bcmk.edu.hk/upload/images/1722831398818.pdf" },
  ] }]),
];
