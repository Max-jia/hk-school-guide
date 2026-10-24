import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(schoolNumber: string, year: string, note: string, website: string, sources: PilotSchool["sources"], details: NonNullable<PilotSchool["detailSections"]>): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  return { ...school, dataYear: year, sourceNote: note, replaceDirectoryDetails: true, website, sources, detailSections: details };
}

/** Kindergarten profile batch 34: ten unique, locally registered schools. */
export const KINDERGARTEN_BATCH_34: PilotSchool[] = [
  profile("523445", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2027/28", "保良局張潘美意幼稚園以兒童為中心，校方公開的課程包括生活經驗、感官探索、動手實踐及STEAM活動，並有非華語幼兒支援。2027/28 K1招生已公布並在進行；入學日期與面見安排以校方最新通告為準。", "https://www.plkkgs.edu.hk/plkcpmykg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號523445、東涌富東廣場校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "按登記校址核對班制、授課語言、師生比例及核准費用；不據此推算每班實際人數。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5234450001" },
    { label: "保良局張潘美意幼稚園：課程與學校介紹", scope: "校方自述的兒童中心課程、生活經驗、STEAM及學習活動。", url: "https://www.plkkgs.edu.hk/plkcpmykg/hk/about/10" },
    { label: "保良局張潘美意幼稚園：2027/28招生須知", scope: "當屆申請期限、文件及面試安排；招生細節會隨通告更新。", url: "https://www.plkkgs.edu.hk/plkcpmykg/hk/news/article/81" },
    { label: "保良局張潘美意幼稚園：非華語學童支援", scope: "校方公布的中文學習及家校支援措施。", url: "https://www.plkkgs.edu.hk/plkcpmykg/hk/info/60" },
  ], [{ title: "生活經驗課程與招生準備", featured: true, note: "課程特色和招生日期均屬校方資料；實際活動時數、班內語言比例及錄取機會未有公開數據。", details: [
    { label: "課程由生活經驗延伸到動手探索", value: "校方描述課程以兒童為中心，結合感官探索、實作、STEAM和中華文化活動。對喜歡操作和體驗的孩子，這種課程提供較多由日常情境進入概念的機會；家長宜參觀時觀察孩子是否有自主嘗試和表達想法的時間，並詢問各級活動如何循序加深。", sourceUrl: "https://www.plkkgs.edu.hk/plkcpmykg/hk/about/10" },
    { label: "非華語支援有具體家校配套", value: "校方公布非華語支援小組、中文學習策略及家校協作安排。若家庭在家主要使用非中文，報名前可確認支援如何落到孩子所在級別、是否有傳譯服務，以及家長如何取得中文學習回饋。公布有支援不代表每項服務均按固定時數提供。", sourceUrl: "https://www.plkkgs.edu.hk/plkcpmykg/hk/info/60" },
    { label: "2027/28 K1申請按最新通告辦理", value: "校方2026年10月公布2027/28新生申請安排，列明網上申請及親身交表方式，所有申請者均安排面試。家長應依通告核對截止日和文件；這項流程不代表學位充足或取錄機會相同。", period: "2027/28 K1招生；校方通告發布於2026-10", sourceUrl: "https://www.plkkgs.edu.hk/plkcpmykg/hk/news/article/81" },
  ] }]),

  profile("158550", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程：網站查閱於2026-10", "救世軍吳國偉紀念幼稚園的校方課程頁介紹蒙特梭利元素與品德教育；這是課程取向，不代表每項活動的固定時數或個別幼兒學習成效。校方公開資料未能確認下一屆K1的完整日程，招生日期須直接向學校核實。", "https://www.salvationarmy.org.hk/esd/nkwkg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158550、荃灣祈德尊新邨登記校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "按校址核對班制、授課語言、師生比例及核准費用；比例不等於每班即時人數。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585500001" },
    { label: "救世軍吳國偉紀念幼稚園：課程", scope: "校方介紹蒙特梭利生活、感官、數學及地理文化內容與品德教育。", url: "https://salvationarmy.org.hk/esd/nkwkg/our-curriculum.html" },
    { label: "救世軍教育服務：辦學理念", scope: "辦學團體教育服務的自述；不作為本校具體課堂安排的證據。", url: "https://salvationarmy.org.hk/esd/hk/" },
  ], [{ title: "蒙特梭利元素與日常自理", featured: true, note: "課程細節來自校方課程介紹；校方未公開每日活動比例及新一屆招生細節。", details: [
    { label: "課程納入蒙特梭利學習材料", value: "校方指出課程包含日常生活、感官、數學及地理文化知識等蒙特梭利元素，並透過品德活動培養責任、感恩和關愛。家長可在參觀時看幼兒是否有自行選擇和整理教具的機會，並詢問教師如何記錄孩子的進度；網站未列各項內容的每週時數。", sourceUrl: "https://salvationarmy.org.hk/esd/nkwkg/our-curriculum.html" },
    { label: "辦學團體理念與學校課程要分開理解", value: "救世軍以全人教育和關懷兒童作為教育服務理念；這能說明辦學團體價值取向，但不能代替本校的班級安排。對家庭而言，應以校方課程頁、當屆概覽和實地參觀確認孩子每天接觸到的活動。", sourceUrl: "https://salvationarmy.org.hk/esd/hk/" },
    { label: "招生日期需向校方確認", value: "本輪可查到的官方頁面提供課程和聯絡入口，未能核對完整的2027/28 K1報名與面見日期。若準備申請，先致電學校索取當屆文件，避免套用舊年度時間表。", period: "招生資料查閱：2026-10", sourceUrl: "https://www.salvationarmy.org.hk/esd/nkwkg/" },
  ] }]),

  profile("158704", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2026/27歷史周期", "廣林浸信會呂郭碧鳳幼稚園位於沙田廣林苑，校方網站提供學校資訊及招生入口。可查到的2026/27申請文件屬已完成周期，不能當作下一屆日期；現行學費與全日班附加費亦應按當屆教育局核准文件確認。", "https://www.kwonglambaptist-kg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158704、廣林苑興林閣登記校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准收費；資料適用於2026/27概覽年度。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1587040001" },
    { label: "廣林浸信會呂郭碧鳳幼稚園：官方網站", scope: "校方資訊、最新通告和聯絡入口。", url: "https://www.kwonglambaptist-kg.edu.hk/" },
    { label: "廣林浸信會呂郭碧鳳幼稚園：2026/27申請表", scope: "該屆申請班別及表格欄位；已過招生周期，不代表新一屆安排。", url: "https://www.kwonglambaptist-kg.edu.hk/wp-content/uploads/2025/08/2026-2027%E5%AD%B8%E5%B9%B4%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A81.pdf" },
    { label: "教育局：學費證明書", scope: "校方核准費用及生效日；不同班別及膳食費分開列示。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/158704.pdf" },
  ], [{ title: "先核對半日與全日班成本", featured: true, note: "教育局費證列明的年度與班別需逐項查看；2026/27招生文件僅作歷史流程參考。", details: [
    { label: "全日班成本不能只看學費欄", value: "教育局費證分開列出半日及全日班，部分全日班費用以膳食費形式呈現。家庭應把課程費、膳食、校服和代辦項目分開核算，並以新學年費證及校方收費清單作最後依據；舊年度數字不應當成現行報價。", period: "費證生效日：2024-09；查看新年度核准資料", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/158704.pdf" },
    { label: "公開的2026/27申請資料已過期", value: "校方申請表顯示該屆曾接受K1至K3申請，但文件屬2026/27學年。下一屆家長應以官網最新招生通告確認申請期、面試形式和全日班安排，不宜沿用舊表日期。", period: "2026/27招生周期；已結束", sourceUrl: "https://www.kwonglambaptist-kg.edu.hk/wp-content/uploads/2025/08/2026-2027%E5%AD%B8%E5%B9%B4%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A81.pdf" },
    { label: "課程細節以學校直接說明為準", value: "校方網站設有校園資訊、家長園地和招生入口，但本輪可讀頁面未提供完整的每日課程比例。重視英語、普通話或戶外活動的家庭，應索取最新課程簡介及作息表再作比較。", sourceUrl: "https://www.kwonglambaptist-kg.edu.hk/" },
  ] }]),

  profile("152579", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2026/27歷史周期", "滿樂幼稚園由美差會潮浸服務聯會辦學，位於荃灣滿樂大廈。校方網站與招生文件可核對基本聯絡及申請資料；現行課程細節公開有限，因此不沿用第三方網站的歷史課程描述。", "https://moonlok.abmsbc.org.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號152579、荃灣滿樂大廈校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "按校址查看班制、授課語言、師生比例與核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1525790001" },
    { label: "滿樂幼稚園：2026/27招生詳情", scope: "該屆申請時段及文件；只作已完成周期的參考。", url: "https://moonlok.abmsbc.org.hk/wp-content/uploads/2025/09/2026-2027%E5%AD%B8%E5%B9%B4%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A9%B3%E6%83%85.pdf" },
    { label: "滿樂幼稚園：校方網站", scope: "校方最新通告、課程及聯絡資訊入口。", url: "https://moonlok.abmsbc.org.hk/" },
  ], [{ title: "荃灣校址與課程資訊邊界", featured: true, note: "學校身份與校址以教育局資料為準；可讀到的招生文件屬2026/27周期，不能推論下一屆安排。", details: [
    { label: "校址位於滿樂大廈，宜先實測接送路線", value: "教育局位置資料列出學校位於荃灣滿樂大廈。對住在荃灣的家庭，實際步行路線、上落客位置和放學接送安排可能比單看地區更影響日常；校車服務和適用範圍須直接向校方確認。", sourceUrl: EDB_LOCATION },
    { label: "招生PDF只代表2026/27流程", value: "校方公開2026/27入學申請詳情，該文件可用來了解當屆曾要求的材料和程序，但其日期已屬歷史資訊。下一屆報名前應查看校方最新公告，並確認K1適齡範圍、面見方式和學費。", period: "2026/27招生周期；已結束", sourceUrl: "https://moonlok.abmsbc.org.hk/wp-content/uploads/2025/09/2026-2027%E5%AD%B8%E5%B9%B4%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A9%B3%E6%83%85.pdf" },
    { label: "現行課程細節需向學校索取", value: "校方網站是現行公告入口，但本輪未能從可讀頁面核實完整的課程綱要和每日語言安排。若家庭重視教學理念、英語或普通話接觸量，應向校方索取本學年課程簡介，不以聚合頁面的舊文字代替。", sourceUrl: "https://moonlok.abmsbc.org.hk/" },
  ] }]),

  profile("325090", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2026/27歷史周期", "港澳信義會錫安紀念幼稚園位於黃大仙蒲崗村道，校方2026/27招生資料列出親子遊戲面見、居住地及家庭關係等考慮因素。相關招生周期已結束；優先考慮不代表保證取錄，下一屆須看新公告。", "https://www.hkmlcsok.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號325090、蒲崗村道錫安樓校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "校址班制、授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3250900001" },
    { label: "港澳信義會錫安紀念幼稚園：2026/27收生安排", scope: "該屆申請、親子遊戲面見、優先考慮和註冊安排。", url: "https://www.hkmlcsok.edu.hk/?lang=zh&page_id=41" },
    { label: "港澳信義會錫安紀念幼稚園：校方網站", scope: "學校最新消息、活動和招生資訊入口。", url: "https://www.hkmlcsok.edu.hk/" },
  ], [{ title: "親子遊戲面見與家庭配合", featured: true, note: "面見細節取自已完成的2026/27招生周期，不可直接視為下一屆政策。", details: [
    { label: "面見以家長陪同的遊戲形式進行", value: "校方2026/27文件表示會安排家長陪同幼兒，以遊戲形式面見；可按需要提供非華語家庭傳譯或翻譯服務。準備方向是讓孩子熟悉與家長一同參與活動，不是背熟答案。該年度流程已結束，新一屆形式待校方公布。", period: "2026/27招生周期；已結束", sourceUrl: "https://www.hkmlcsok.edu.hk/?lang=zh&page_id=41" },
    { label: "家庭背景與居住地屬考慮因素，但非錄取承諾", value: "該屆收生準則列出兄姊或家長就讀／畢業、本區居住、面見表現，以及全日班家庭需要等因素。校方同時提醒學額有限，符合優先考慮不保證取錄；家長宜把居住距離和照顧需要如實申報。", period: "2026/27招生準則", sourceUrl: "https://www.hkmlcsok.edu.hk/?lang=zh&page_id=41" },
    { label: "全日班額外成本應看最新費證", value: "校方公開的2025/26各項收費表並非當屆學費核准文件。比較半日和全日時，應分開查學費、膳食和代辦費，並以教育局最新概覽及校方新費表核實。", sourceUrl: "https://www.hkmlcsok.edu.hk/" },
  ] }]),

  profile("158313", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程：現行網站；招生：2026/27歷史周期", "新界神召會懷恩幼稚園位於元朗西菁街，校方課程涵蓋戲劇、數學、戶外體驗、英語、普通話及品德教育。校方招生頁可見2026/27資料，已屬過往周期；下一屆時間和準則應以新公告為準。", "https://www.waiyankin.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號158313、元朗西菁街興旺樓校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准費用；按該校址查看。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1583130001" },
    { label: "新界神召會懷恩幼稚園：課程", scope: "課程理念、戲劇、5E數學、戶外學習、英語、普通話和品德教育。", url: "https://www.waiyankin.edu.hk/" },
    { label: "新界神召會懷恩幼稚園：入學申請", scope: "校方招生準則與2026/27申請及註冊程序；日期屬已完成周期。", url: "https://www.waiyankin.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ], [{ title: "多元課程需要看孩子的實際參與", featured: true, note: "課程介紹來自校方；網站所列項目不代表每個級別同一頻率或相同比重。", details: [
    { label: "戲劇、數學與戶外體驗提供不同入口", value: "校方列有聲情教學、5E幼兒數學、戲劇、戶外體驗、區角及中華文化活動。這種安排對喜歡故事、角色扮演和動手探索的孩子較容易建立參與感；家長可詢問各級每週活動如何編排，以及教師如何把體驗連回語文和數學概念。", sourceUrl: "https://www.waiyankin.edu.hk/" },
    { label: "中英普教學資訊不等於語言時數", value: "學校課程頁分別設英語和普通話內容，2026/27教育局概覽亦按校址列授課語言資料。兩類資料都不足以推算每日英語或普通話比例；若家庭有明確語言目標，應索取本級時間表和教師配置。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1583130001" },
    { label: "2026/27申請程序已過期", value: "校方入學頁列出該屆面見和註冊流程，所載日期不能套用到下一屆。家長應查看最新學年公告，並核對全日班家庭優先考慮及註冊費是否有更新。", period: "2026/27招生周期；已結束", sourceUrl: "https://www.waiyankin.edu.hk/%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B/" },
  ] }]),

  profile("157813", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生及課程：2027/28", "保良局田家炳幼稚園位於青衣青盛苑，校方課程以兒童主導、主題和活動教學為主，並公布2027/28招生入口。注意同名的保良局田家炳兆康幼稚園是另一所學校，兩者校號、校址及招生資料不可混用。", "https://www.plkkgs.edu.hk/plktkpkg/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號157813、青衣青盛苑校址及登記狀態；與兆康分校區分。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例與核准費用，適用於青衣本校址。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1578130001" },
    { label: "保良局田家炳幼稚園：課程特色", scope: "兒童主導、主題／活動教學、語文發展、STEAM及正向教育的校方介紹。", url: "https://www.plkkgs.edu.hk/plktkpkg/hk/about/10" },
    { label: "保良局田家炳幼稚園：2027/28招生入口", scope: "當屆申請注意事項、流程及非華語支援入口。", url: "https://www.plkkgs.edu.hk/plktkpkg/hk/custom/custom_page/133" },
  ], [{ title: "同名校區分清，按青衣本校資料選擇", featured: true, note: "本頁只寫校號157813青衣校址，沒有移用兆康校址的課程或招生資訊。", details: [
    { label: "主題和活動教學強調從遊戲中學習", value: "校方以兒童為主導，透過主題、活動、小組、扮演、自選和探索活動，讓孩子在不同學習範疇均衡發展。對家長而言，可觀察孩子有沒有自主選擇和創作的空間，也要了解教師如何照顧不同步伐，而非只看活動名稱。", sourceUrl: "https://www.plkkgs.edu.hk/plktkpkg/hk/about/10" },
    { label: "英語與STEAM屬校方公布特色", value: "校方介紹外籍英語教師、K3雙語教學和STEAM探索活動。這說明學校的課程方向，不能推算英語課時或保證每名孩子都接受相同形式的專科教學；重視語言銜接的家庭應索取本級作息表。", sourceUrl: "https://www.plkkgs.edu.hk/plktkpkg/hk/about/10" },
    { label: "2027/28申請資料已上架", value: "校方收生頁設有2027/28申請表、流程和非華語支援資料。報名前核對本校號及青衣地址，避免誤入同名兆康幼稚園頁面；報名日期、費用和面見細節以當屆文件為準。", period: "2027/28招生", sourceUrl: "https://www.plkkgs.edu.hk/plktkpkg/hk/custom/custom_page/133" },
  ] }]),

  profile("311650", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方申請資料：2025/26歷史周期", "香港路德會觀塘幼稚園位於觀塘馬蹄徑，教育局資料確認校址與登記；校方網站可查招生入口。現時可讀到的申請表屬2025/26年度，課程及新一屆收生細節需向學校索取，不能把舊文件當成現行安排。", "http://ktlk.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號311650、觀塘馬蹄徑2號校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "按校址核對班制、授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3116500001" },
    { label: "香港路德會觀塘幼稚園：官方網站", scope: "校方學校資訊、招生入口及聯絡資料。", url: "http://ktlk.edu.hk/" },
    { label: "香港路德會觀塘幼稚園：2025/26申請表", scope: "舊年度的申請班別與文件欄位；不代表目前收生安排。", url: "https://www.ktlk.edu.hk/wp-content/uploads/2025/03/2025-2026%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8.pdf" },
  ], [{ title: "招生前先補齊現行課程資料", featured: true, note: "舊年度申請文件只作歷史參考；本輪未核實新一屆日期與課程比例。", details: [
    { label: "交通位置以觀塘馬蹄徑校址核對", value: "教育局列明學校位於觀塘馬蹄徑2號地下至一樓。居住在觀塘、牛頭角或九龍灣的家庭，宜在上學時段實走路線，確認過路、上落客及接送時間；校車服務須另向校方查問。", sourceUrl: EDB_LOCATION },
    { label: "目前可見的申請表屬2025/26", value: "校方網站公開的PDF列出該年度K1至K3班別及申請欄位，但已不是下一屆收生指南。不要據此推斷現時面試形式、截止日期或學額；先聯絡學校索取最新文件。", period: "2025/26申請文件；已過期", sourceUrl: "https://www.ktlk.edu.hk/wp-content/uploads/2025/03/2025-2026%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%A1%A8.pdf" },
    { label: "語言和課程時數尚待校方確認", value: "教育局概覽提供校址層面的班制和授課語言比較底數，但本輪未找到校方公開的每日課程比例。若家庭重視粵語、普通話或英語接觸量，應直接索取現行作息表和課程簡介。", period: "概覽：2026/27", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3116500001" },
  ] }]),

  profile("536709", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程：網站查閱於2026-10", "真理浸信會何袁惠琼幼稚園位於粉嶺雍盛苑，校方網站為課程及招生資訊入口。教育局資料可作校址及班制比較；本輪未取得足以確認當屆面試細節的完整校方文件，因此不推測錄取方式或學額。", "http://www.tbcas.edu.hk/SCH04HY", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號536709、粉嶺雍盛苑校址及登記狀態。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及核准費用；按校址配對。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5367090001" },
    { label: "真理浸信會何袁惠琼幼稚園：校方網站", scope: "學校資訊、課程及招生公告入口。", url: "http://www.tbcas.edu.hk/SCH04HY" },
    { label: "教育局《幼稚園概覽》入口", scope: "校方未公開項目的官方查詢入口；具體數值以2026/27校址頁為準。", url: "https://kgp2026.kindergartenprofile.com/" },
  ], [{ title: "以校方當屆資料確認課程和收生", featured: true, note: "不以其他真理浸信會幼稚園的課程或招生規則代替本校資料。", details: [
    { label: "粉嶺雍盛苑校址適合先做交通評估", value: "教育局登記資料列出本校位於雍盛苑商場109號舖。家長應按住址試走上學時段交通，並向校方確認上落客、校車覆蓋和雨天接送安排；同辦學團體其他分校的交通資訊不適用於本校。", sourceUrl: EDB_LOCATION },
    { label: "概覽數據能比較班制，不能代表實際班額", value: "2026/27教育局概覽按校址列出班制、授課語言、師生比例和費用。師生比例是概覽統計，不等於每班實際人數；家庭如重視全日照顧或語言教學，應向校方核對當屆日程及費用清單。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5367090001" },
    { label: "招生和課程細節以本校公告為準", value: "本輪未能核實完整的2027/28收生時間表及面試說明。建議家長從校方網站或電話確認新生申請、面見形式和候補安排，不把同辦學團體其他學校的做法套用至本校。", sourceUrl: "http://www.tbcas.edu.hk/SCH04HY" },
  ] }]),

  profile("215538", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生：2026/27歷史周期", "高主教書院幼稚園部位於北角建華街，與同名小學及書院處於同一教育體系，但幼稚園申請須按自身校方程序。公開的2026/27 K1報名日期已過；下一屆日期與優先考慮條件須等新公告。", "https://www.rckg.edu.hk/", [
    { label: "教育局《學校位置及資料》及《學校基本註冊資料》", scope: "校號215538、北角建華街校址及登記狀態；幼稚園部獨立識別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "幼稚園部班制、授課語言、師生比例及核准費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2155380001" },
    { label: "高主教書院幼稚園部：2026/27 K1申請", scope: "該屆網上申請、遞交證明、面試與已完成日程。", url: "https://www.rckg.edu.hk/?page_id=3933" },
    { label: "高主教書院幼稚園部：官方網站", scope: "招生、插班、校方資料及收費概覽入口。", url: "https://www.rckg.edu.hk/" },
  ], [{ title: "申請幼稚園部與升讀其他部別分開看", featured: true, note: "本頁只描述幼稚園部；同一教育體系不等於自動升讀或保證取錄。", details: [
    { label: "2026/27 K1申請有明確流程，但日期已過", value: "校方當屆流程為網上報名、遞交證明文件、面試、公布結果及註冊，並安排上午和下午班。2025年10月的網上申請期已結束，家長應等待下一屆公布，不要沿用舊出生日期範圍或面試日。", period: "2026/27 K1招生；已結束", sourceUrl: "https://www.rckg.edu.hk/?page_id=3933" },
    { label: "同一校系不等於幼稚園升小保證", value: "幼稚園部、小學部和書院雖同屬高主教教育體系，幼稚園申請文件所列校友或家庭關係只屬該年度的考慮因素，並非自動升讀承諾。若選校目標是銜接小學，應另外核對小學部當屆收生規則。", period: "依據2026/27招生文件理解；新年度待更新", sourceUrl: "https://www.rckg.edu.hk/?page_id=3933" },
    { label: "插班規則另有年級和時段限制", value: "校方曾公布2026/27下午班K2至K3插班申請，並按個案聯絡面試。這是過往學年資訊，不能視為目前有空缺；有意插班應直接向幼稚園部查詢當年級和班別。", period: "2026/27插班資訊；歷史資料", sourceUrl: "https://www.rckg.edu.hk/?page_id=4713" },
  ] }]),
];
