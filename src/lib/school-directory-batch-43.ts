import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const registered = registeredDirectory as PilotSchool[];
const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
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
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}登記資料；名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 43: campus-scoped public facts and school-published evidence. */
export const KINDERGARTEN_BATCH_43: PilotSchool[] = [
  profile("600377", "以教育局校號600377及天盛苑服務設施大樓校址識別。辦學團體與校方公開課程及校園特色；招生表格只作該年度流程參考。", "https://www.slyck.edu.hk/", [
    { label: "香港中文大學校友會聯會教育基金會：順龍仁澤幼稚園", scope: "創校、辦學宗旨、課程特色、校園環境、支援及家校合作。", url: "https://www.cuhkfaaef.org.hk/cuhkfaa-shun-lung-yan-chak-kindergarten/" },
    { label: "順龍仁澤幼稚園：學校網站", scope: "現行校址、聯絡及入學申請入口；年度招生日期以當屆公告為準。", url: "https://www.slyck.edu.hk/" },
    { label: "親子頭條：順龍仁澤幼稚園校園生活專訪", scope: "2025年媒體訪問中的校方課堂例子；屬校方受訪內容，不視為獨立學生成效評估。", url: "https://www.parentingheadline.com/article/15408" },
  ], [{ title: "故事主題、環境探索與全人培育", featured: true, note: "辦學團體公開課程和校園配置；媒體專訪只補充課堂例子，不能代表每個班級或每名幼兒的固定體驗。", details: [
    { label: "以生活主題和故事教學連結六大學習範疇", value: "辦學團體介紹以綜合課程為骨幹，透過故事和貼近生活的主題，連結語文、幼兒數學、大自然與生活、個人與群體、藝術與創意等範疇。對家庭而言，這種設計重視把語文和探索放進同一主題；家長可在參觀時觀察孩子有沒有實際操作、提問和表達，而不只看成果展板。", sourceUrl: "https://www.cuhkfaaef.org.hk/cuhkfaa-shun-lung-yan-chak-kindergarten/" },
    { label: "戶外園藝與魚菜共生提供自然觀察場景", value: "辦學團體列出戶外綠化園藝區和魚菜共生區，並說明用來讓幼兒接觸生態循環。這是校方對設施用途的描述；頁面沒有提供課程使用頻率或評估結果，報名前可詢問不同級別每週實際安排。", sourceUrl: "https://www.cuhkfaaef.org.hk/cuhkfaa-shun-lung-yan-chak-kindergarten/" },
    { label: "校方重視英語活動及家校協作", value: "辦學團體稱校本英語活動以故事教學呼應中文主題，並列家長講座、親子工作坊及家長參與活動。網站未公開各語言課時比例；若英語沉浸程度是你的首要條件，應向校方索取當屆課表確認。", sourceUrl: "https://www.cuhkfaaef.org.hk/cuhkfaa-shun-lung-yan-chak-kindergarten/" },
  ] }]),

  profile("542601", "按教育局校號542601及慈正邨正明樓地下地址識別。校方說明主題／繪本／遊戲教學及英語、普通話安排；課堂頻率以校方網頁列示為準。", "https://tcebsk.edu.hk/", [
    { label: "慈正邨菩提幼稚園：教育目標與課程特色", scope: "校方公開教育理念、課程模式、評估安排和每週語言／活動節數。", url: "https://tcebsk.edu.hk/" },
    { label: "EDB 質素評核報告：慈正邨菩提幼稚園", scope: "教育局對學校評核時觀察的課程與學習情況；報告年份較早，不能當作現況保證。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/TszChingEst_BodhiSiksa.pdf" },
    { label: "EDB 收費證明（2023/24）", scope: "歷史年度收費文件；頁面不把其數額當作現行學費。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/542601.pdf" },
  ], [{ title: "主題繪本、遊戲學習與語言課", featured: true, note: "語言節數和評估方式為校方自述；EDB 評核報告屬較早年度，只提供歷史觀察背景。", details: [
    { label: "以主題和繪本引出遊戲式自主學習", value: "校方稱按教育局課程指引培育德、智、體、群、美、靈六育，採用主題及繪本教學，透過遊戲引發興趣並照顧個別差異。對孩子而言，關鍵不是課程名稱，而是活動能否讓他自己嘗試和表達；家長可詢問老師如何記錄不同幼兒的進度。", sourceUrl: "https://tcebsk.edu.hk/" },
    { label: "校方列明每日英語課及每週兩節普通話課", value: "學校網站列每天由外籍英語老師教授英語、每週兩節普通話專科課，並安排每週一次多元智能課堂。這是校方公布的節數，尚非完整逐日課表；如果你在比較粵語、普通話和英語的主次，報名前應再確認班級實際語言安排。", sourceUrl: "https://tcebsk.edu.hk/" },
    { label: "持續評估涵蓋學習表現與身心發展", value: "校方表示會作持續性單元評估和學習表現評估，以掌握學習及身心發展。網站沒有公布評分量表或個別回饋頻率，家庭可問清楚評估如何回饋給家長、遇到學習需要時如何跟進。", sourceUrl: "https://tcebsk.edu.hk/" },
  ] }]),

  profile("158585", "按教育局校號158585及大埔寶雅苑家和閣地址識別。校方2026/27資料列上午及全日班、參加免費優質幼稚園教育計劃；費用以校方該學年公布為準。", "https://www.taipokg.edu.hk/", [
    { label: "天主教大埔幼稚園：學校資料與班制", scope: "創校年份、K1至K3班制及2026/27免費幼稚園教育計劃費用。", url: "https://www.taipokg.edu.hk/chi/about-us/general-information" },
    { label: "天主教大埔幼稚園：課程特色", scope: "宗教價值、主題／專題／戲劇、英文繪本和英語活動設計。", url: "https://www.taipokg.edu.hk/chi/about-us/characteristics" },
    { label: "天主教大埔幼稚園：2027/28入學安排", scope: "2027/28申請資格、面見形式、甄選考慮及註冊流程。", url: "https://www.taipokg.edu.hk/chi/admissions/information-on-admission" },
  ], [{ title: "宗教價值、戲劇學習與英語繪本", featured: true, note: "課程和費用均依校方公開資料；宗教教育是學校定位的一部分，家庭應按自身教育取向判斷適配。", details: [
    { label: "天主教價值融入主題和專題課程", value: "校方把真理、義德、愛德、生命和家庭等核心價值融入主題、專題研習及戲劇教育，並設宗教培育活動。這代表信仰教育並非只出現在節慶；若家庭希望孩子接觸天主教文化，可了解日常活動如何呈現，也應衡量是否符合家庭信念。", sourceUrl: "https://www.taipokg.edu.hk/chi/about-us/characteristics" },
    { label: "英語 Shared Reading 以繪本和遊戲延伸語言", value: "學校介紹把英語繪本融入主題，再用模仿、角色扮演等遊戲協助幼兒理解和使用詞語，也提供 Activity Kits 讓學習在家延續。這種安排有利於把英語放進情境；網站未列每週英語課時比例，若你追求英語主導環境，需要再索取時間表。", sourceUrl: "https://www.taipokg.edu.hk/chi/about-us/characteristics" },
    { label: "2026/27半日班免學費，全日班另有差額及膳食費", value: "校方公布已參加2026/27免費優質幼稚園教育計劃：半日班扣除資助後毋須繳學費；全日班每月差額630港元、十期，午膳費每月485港元。這些是該學年的公布額，下一年度收費和其他代辦費用仍需重新確認。", period: "2026/27學年；校方公布", sourceUrl: "https://www.taipokg.edu.hk/chi/about-us/general-information" },
    { label: "2027/28面見為個別形式，學童均獲面見機會", value: "校方招生頁列明已交申請的幼兒均獲面見，形式為個別面見並由一至兩位家長陪同；面見以粵語為主，按需要可輔以普通話或英語，非華語家庭可詢問傳譯支援。甄選會考慮兒童表現、兄姊、天主教、居住地及校友等因素；符合優先條件不等於保證取錄。", period: "2027/28入學；面見日期2026-10-31", sourceUrl: "https://www.taipokg.edu.hk/chi/admissions/information-on-admission" },
  ] }]),

  profile("324957", "按教育局校號324957及將軍澳彩明苑彩榮閣地址識別。校方2027/28收生頁公布面見及註冊安排；學校概覽中的舊年度師生比保留原年份，不當作現行數據。", "https://www.spykg.edu.hk/", [
    { label: "香港神託會培恩幼稚園：學校概覽", scope: "校方公布的創校、校舍和設施數據；師生比例為2024年9月，設施有各自資料年份。", url: "https://www.spykg.edu.hk/學校概覽" },
    { label: "香港神託會培恩幼稚園：2027/28報名需知", scope: "2027/28 K1申請、面見、優先考慮及統一註冊安排。", url: "https://www.spykg.edu.hk/報名需知" },
    { label: "香港神託會培恩幼稚園：專業團隊及培訓", scope: "校方披露的教師資歷與專業發展安排。", url: "https://www.spykg.edu.hk/專業團隊" },
    { label: "GoodSchool：培恩幼稚園到校專訪", scope: "2024年校長訪問中談及遊戲教學和兩文三語；屬校方受訪內容。", url: "https://www.goodschool.hk/news/邁向%2025%20周年　致力提供優質教育　助孩子健康成長" },
  ], [{ title: "遊戲探索、語文基礎與信望愛教育", featured: true, note: "校方提供的師生比和設施資料年份不同，頁面保留原日期；媒體專訪只補充校方的教學說明。", details: [
    { label: "校方以「自主學習、遊戲為本」安排探索活動", value: "校方理念及公開課程資源把遊戲、故事和學習環境連在一起，目標是提升幼兒興趣、溝通和合作；2021/22一份中大協作課程資源亦展示K2主題課例。這些材料說明設計取向，不等於對所有班級的觀課結果。參觀時可觀察孩子是否能自己選擇活動並與同伴協作。", sourceUrl: "https://play.fed.cuhk.edu.hk/download_teach/conclude2021/share01/KG48.pdf" },
    { label: "校方公布2027/28 K1面見及優先次序", value: "招生頁列2026年11月面見，形式可為個別或小組故事互動；優先次序包括在讀兄弟姊妹、校友家庭及面見表現，並提示學額有限、優先並非保證取錄。家長可按時間表備妥註冊證，並了解候補及全日班安排。", period: "2027/28入學；公告日期2026年", sourceUrl: "https://www.spykg.edu.hk/報名需知" },
    { label: "學校概覽的容量和設施數據須連同年份理解", value: "校方概覽列出113人課室總容額、6間課室及室內體能場等資料，其中師生比例標明為2024年9月、部分設施數據則為2023或2024年。這些資料可作校舍規模參考，不能當作當屆實際班額或師生配置。", period: "校方概覽：2024-09；部分設施為2023/24年", sourceUrl: "https://www.spykg.edu.hk/學校概覽" },
  ] }]),

  profile("519090", "按教育局校號519090及粉嶺景盛苑歡景閣地址識別。校方現行網站可核對地址、聯絡、班級及招生資訊；網頁更新較疏的課程細節不作超出來源的推斷。", "https://www.kingshingkg.edu.hk/", [
    { label: "景盛幼稚園：官方網站與招生資訊", scope: "學校地址、電話、班級編制、校園活動與2026/27招生公告。", url: "https://www.kingshingkg.edu.hk/" },
    { label: "教育局學校搜尋：景盛幼稚園校址及註冊資料", scope: "校號519090、校址、授課時段和登記狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=519090000112" },
    { label: "幼營喜動校園計劃：參與學校名單", scope: "校名與粉嶺景盛苑校址的政府計劃名單交叉核對。", url: "https://www.startsmart.gov.hk/tc/school_list.aspx" },
  ], [{ title: "粉嶺屋邨幼稚園的班級與校園活動", featured: true, note: "官方網站可確認學校、校址和招生公告；課程特色頁若未公開可核實的具體內容，不以第三方摘要代替校方證據。", details: [
    { label: "校方網站與教育局資料指向景盛苑歡景閣同一校址", value: "教育局學校搜尋列校號519090、歡景閣地下及下午授課時段；校方網站亦列同一地址、電話及聯絡方式。家長查詢報名時應直接確認希望申請的班制和當屆時間安排。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=519090000112" },
    { label: "校方公告2026/27 K1及各級插班申請", value: "官方首頁刊出2026/27招生及插班資訊，並提醒K1出生年份；這是特定學年資料，下一年度的出生日期、面見和註冊流程需以新公告為準。網站另設班級編制、課程特色、學生支援及校園活動專頁，可在申請前向校方索取當屆班級時間表。", period: "2026/27招生公告", sourceUrl: "https://www.kingshingkg.edu.hk/" },
  ] }]),

  profile("533351", "按教育局校號533351及將軍澳唐明苑唐富閣地下地址識別。校方現行網站列雙語班、2026/27招生及學生活動；授課時段仍以教育局概覽和校方班級安排分別呈現。", "https://www.elchktkokg.edu.hk/", [
    { label: "基督教香港信義會將軍澳幼稚園：官方網站", scope: "校址、創校年份、雙語班、班級活動和2026/27申請資訊。", url: "https://www.elchktkokg.edu.hk/" },
    { label: "基督教香港信義會將軍澳幼稚園：課程特色", scope: "校方對學習評估、兩文三語及多元智能的說明。", url: "https://www.elchktkokg.edu.hk/" },
    { label: "基督教香港信義會將軍澳幼稚園：申請入學", scope: "學校公布的2026/27註冊與報名程序；作過往年度參考。", url: "https://www.elchktkokg.edu.hk/申請入學/" },
  ], [{ title: "中英雙語班與多元活動", featured: true, note: "雙語班是校方公開的辦學安排；EDB 概覽語言欄和班型資訊按各自來源標示，不推算實際語言課時。", details: [
    { label: "校方設中英雙語班並稱每班有英文老師", value: "學校公開表示推行中英雙語班、每班安排一位英文老師，並提供校車和課後興趣班。這能說明雙語班是校方提供的選項，但未有逐日時間表或英語課時比例；如你以英語環境為主要考慮，應在報名前確認申請班型及授課分配。", sourceUrl: "https://www.elchktkokg.edu.hk/" },
    { label: "官方校園紀錄展示專題、親子及體驗活動", value: "校方2026年活動公告列親子運動會、幼兒班觀課、專題研習分享及校外體驗等例子。活動消息反映校園安排的公開樣本，不代表每名學生每年必定參與相同活動；家長可詢問活動頻率與校車接送配合。", period: "校方公告：2026年", sourceUrl: "https://www.elchktkokg.edu.hk/" },
    { label: "學校註冊資料確認校號與唐明苑地址", value: "校方聯絡頁列創校年份1999年、註冊編號533351及唐明苑唐富閣地址；EDB位置資料亦以校號533351識別此校。頁面上的2026/27申請程序已屬歷史年度，下一屆報名需等校方更新。", sourceUrl: "https://www.elchktkokg.edu.hk/" },
  ] }]),

  profile("152498", "按教育局校號152498及荃灣福來邨永康樓地下地址識別。校方公布2026/27校曆及課程活動；所見課程特色以校方現行資料為主，舊年度評核文件只作背景。", "https://www.kamchuenkg.edu.hk/", [
    { label: "福來邨錦全幼稚園：官方網站", scope: "現行地址、2026/27校曆、招生資訊和校園活動。", url: "https://www.kamchuenkg.edu.hk/" },
    { label: "EDB 學校搜尋：福來邨錦全幼稚園", scope: "校號152498、校址、電話及註冊狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=152498000111" },
    { label: "福來邨錦全幼稚園：2023/24學校報告", scope: "校方年度報告所記課程設計與活動；明確標註為2023/24學年。", url: "https://www.kamchuenkg.edu.hk/images/data/23-24%20學校報告_新版.pdf" },
  ], [{ title: "生活探究、遊戲教學與戶外體驗", featured: true, note: "校方網站當期活動和2023/24年度報告分開標示；活動示例不代表所有年級的固定安排。", details: [
    { label: "校方按教育局課程指引安排生活化探索", value: "2023/24學校報告稱課程按幼兒發展和興趣規劃，結合遊戲、故事及體驗，培養探究、創意和解難。這是該年度校方對課程的回顧，家長可把它當作校本教學方向，再透過最新校曆和到校參觀確認目前的活動形態。", period: "2023/24學年校方報告", sourceUrl: "https://www.kamchuenkg.edu.hk/images/data/23-24%20學校報告_新版.pdf" },
    { label: "2026年校方校曆呈現校內與戶外活動樣本", value: "校方網站2026年10月校曆列蜂蜜製作體驗、親子閱讀、非華語親子活動、小童軍及戶外體能活動。這些具體活動可幫家長理解校園生活的廣度，但不能視為每個級別相同的必修安排。", period: "校方校曆：2026年10月", sourceUrl: "https://www.kamchuenkg.edu.hk/" },
  ] }]),

  profile("614114", "按教育局校號614114及觀塘安泰邨和泰樓地下高層地址識別。校方網站可核對校名和地址；目前公開頁面沒有足夠課程細節，故只呈現可追溯底數及資料缺口。", "https://cmaontaikg.edu.hk/", [
    { label: "基督教宣道會安泰幼稚園：校方網站", scope: "校方公開的學校名稱、地址及聯絡資料；未見可核實的課程或收生細節。", url: "https://cmaontaikg.edu.hk/" },
    { label: "EDB 學校位置及資料", scope: "校號614114、安泰邨校址、學校類別與登記資料。", url: EDB_LOCATION },
    { label: "DATA.GOV.HK：教育局學校位置資料集", scope: "資料集版本和更新背景。", url: DATASET },
  ], [{ title: "公開資料範圍與家長核實事項", featured: true, note: "校方網站目前公開資料有限；不據校名或辦學團體推斷宗教課程、教學法、授課語言或招生條件。", details: [
    { label: "校方網站確認安泰邨和泰樓校址及聯絡方式", value: "校方網站列地址為九龍觀塘安泰邨和泰樓地下高層及電話2619 9393；EDB位置資料按校號614114列同一學校。學校網站目前沒有提供足夠課程、班制或招生細節，因此這些項目不作猜測。", sourceUrl: "https://cmaontaikg.edu.hk/" },
    { label: "報名前宜直接向校方確認班制、語言及當屆收生", value: "家長可致電校方查詢是否開設PN、K1至K3的班型，粵語、普通話和英語如何分配，面見與註冊時間，以及2026/27或2027/28的學費文件。由於網上尚無可核實的招生頁，電話確認比沿用第三方舊資料可靠。", sourceUrl: "https://cmaontaikg.edu.hk/" },
  ] }]),

  profile("605530", "按教育局校號605530及觀塘安達邨安達商場地下高層地址識別。校方公開主題／繪本教學和建構活動；其招生文件屬2026/27年度，其他年度不直接沿用。", "https://www.lucina-kindergarten.edu.hk/", [
    { label: "東華三院何藍瓊纓幼稚園：學校特色", scope: "校方公開課程理念、主題／繪本教學、兩文三語與建構活動。", url: "https://www.lucina-kindergarten.edu.hk/" },
    { label: "東華三院何藍瓊纓幼稚園：2026/27招生程序", scope: "公開資料中的招生程序與註冊安排；標註年度，避免作為下一屆日期。", url: "https://www.lucina-kindergarten.edu.hk/wp-content/uploads/2026/01/2N_2026-27-%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99-%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8FLLHKG_NEW.pdf" },
    { label: "東華三院：何藍瓊纓幼稚園五周年校慶", scope: "辦學團體對學校創辦和自由遊戲課程取向的介紹。", url: "https://www.tungwah.org.hk/press-release/東華三院何藍瓊纓幼稚園5周年校慶典禮/" },
  ], [{ title: "主題繪本、建構活動與思考能力", featured: true, note: "特色由校方自述，能力培養目標不等同獨立成效評估；招生資料須按年度查看。", details: [
    { label: "主題與繪本教學配合建構活動", value: "校方列出兩文三語、創意思維、邏輯推理和策略性思考，並採用主題與繪本教學，配合韓國磁石積木及日本積木活動。家長可觀察老師如何引導孩子由搭建走向解釋和合作；網站未提供各級課時比例或獨立學習成效數據。", sourceUrl: "https://www.lucina-kindergarten.edu.hk/" },
    { label: "校方及辦學團體均提到自由遊戲和自主學習", value: "學校網頁強調主動、愉快學習，東華三院校慶消息亦提及自由遊戲和解難能力。這反映辦學方對教學方向的定位，不足以證明每節課都採同一模式；參觀時可問清自由遊戲如何安排及教師如何支援。", sourceUrl: "https://www.tungwah.org.hk/press-release/東華三院何藍瓊纓幼稚園5周年校慶典禮/" },
    { label: "2026/27招生文件需與當屆流程分開", value: "校方公開2026/27年度招生程序文件，可作上一屆流程參考。該文件中的日期、註冊要求或費用不應直接套用到2027/28；申請前應查詢校方有否更新版本。", period: "2026/27入學資料", sourceUrl: "https://www.lucina-kindergarten.edu.hk/wp-content/uploads/2026/01/2N_2026-27-%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99-%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8FLLHKG_NEW.pdf" },
  ] }]),

  profile("319511", "按教育局校號319511及石硤尾窩仔街80號校址識別。校方網站有2027/28新生申請入口和非華語家長專線；過往派位消息只作歷史年份資料。", "https://www.sockg.edu.hk/", [
    { label: "中華基督教會深愛堂幼稚園：官方網站", scope: "校址、聯絡、非華語支援聯絡方式與2026/27、2027/28入學申請消息。", url: "https://www.sockg.edu.hk/" },
    { label: "EDB《幼稚園概覽》：深愛堂幼稚園", scope: "按校址列示班制、語言、師生比例和學費的年度資料。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/319511c-0001.pdf" },
  ], [{ title: "自主學習、家校溝通與非華語家庭支援", featured: true, note: "校方現行網站著重申請和聯絡資訊，較詳盡課程資料來自較早年度概覽；語言支援電話不代表面見安排已確認。", details: [
    { label: "校方以愉快自主學習和多元創意描述辦學方向", value: "學校網站以「非以役人，乃役於人」及「愉快自主學習，培育多元創意」呈現校方定位。現行頁面未詳列每日教學流程，因此家長應在參觀時了解遊戲、故事和小組活動如何融入K1至K3，而不只以標語判斷教學方式。", sourceUrl: "https://www.sockg.edu.hk/" },
    { label: "申請表要求家庭提交孩子遊戲或閱讀片段作參考", value: "校方申請頁列出可提交孩子在家遊戲或閱讀的短片作參考。這表示申請材料可能不只看紙本表格；家長宜依當屆要求提交自然、真實的片段，不必排練成表演，也不可假定片段是所有年度的必交項目。", sourceUrl: "https://www.sockg.edu.hk/" },
    { label: "校方設非華語家長專線和電郵", value: "網站公開非華語家長專線及專用電郵，家庭可用來確認申請表、面見語言和翻譯支援。網站同時列出2026/27及2027/28申請消息；具體截止日期、文件和面見方式應以所申請年度的最新通知為準。", sourceUrl: "https://www.sockg.edu.hk/" },
  ] }]),
];
