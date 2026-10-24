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

/** Kindergarten profile batch 42: ten records with school- and campus-scoped sources. */
export const KINDERGARTEN_BATCH_42: PilotSchool[] = [
  profile("527882", "教育局將校號527882列為AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)，登記地址為窩打老道131號；AIS現行官方校址頁列123–125號，公開資料未能證明兩址與幼兒部的對應。故只呈現登記資料與差異，不移植125號幼兒部課程或收費。", "https://www.ais.edu.hk/", [
    { label: "American International School：聯絡與校址", scope: "AIS官網公開的校園地址為123–125 Waterloo Road，並列Early Childhood 1上課時段；不能據此證明與EDB 131號登記校址相同。", url: "https://www.ais.edu.hk/about/contact/" },
    { label: "教育局《學校位置及資料》", scope: "校號527882登記校名及131 Waterloo Road校址；與AIS現行官網地址差異需核實。", url: EDB_LOCATION },
  ], [{ title: "登記校址與AIS幼兒部資料的對照", featured: true, note: "教育局登記與校方現行頁面地址不一致；本頁不把AIS另一地址的招生、學費、班額或課程數字當作校號527882的資料。", details: [
    { label: "教育局記錄為Primary Branch，登記校址131號", value: "教育局位置名錄將校號527882列作幼稚園類別，地址為九龍窩打老道131號地下及1樓，授課時間列全日。這是名錄登記資料，不足以說明該校址目前實際開辦哪些幼兒班。", period: "位置資料截至2026-09-30；註冊資料截至2026-10-23", sourceUrl: EDB_LOCATION },
    { label: "AIS官網列出的校園地址是123–125號", value: "AIS現行聯絡頁列123–125 Waterloo Road，並列Early Childhood 1半日及全日時間。由於與EDB校號527882的131號地址不同，家長應先向校方及教育局確認兩者的校號／校址關係，再查詢幼兒班申請。", sourceUrl: "https://www.ais.edu.hk/about/contact/" },
  ] }]),

  profile("513423", "按教育局校號513423及般咸道86號A來恩樓登記校址識別。校方區會頁確認同一校名、地址及電話；教育局2026/27概覽的班制、粵語及師生比例按此校址列出。", "https://rhenish.edu.hk/", [
    { label: "中華基督教禮賢會香港區會：禮賢會學校（幼稚園）", scope: "同一幼稚園的校名、般咸道86A地址、電話及辦學理念。", url: "https://www.rhenish.org/Common/Reader/Channel/ShowPage.jsp?Charset=big5_hkscs&Cid=119&Pid=8&Version=9&page=0" },
    { label: "禮賢會學校：各級校園活動", scope: "校方公開的主題活動例子與現行登記校址。", url: "https://rhenish.edu.hk/校園生活/各級校園活動/" },
  ], [{ title: "基督教全人培育與活動教學", featured: true, note: "辦學理念採辦學團體及校方自述；活動頁展示的是活動例子，不代表每名幼兒都參與相同項目。", details: [
    { label: "辦學團體以基督教「愛」為教育精神", value: "禮賢會香港區會介紹，學校以基督教的愛為教育精神，重視五育與靈育均衡，並透過多元學習活動建立兒童自信。對家庭而言，這意味宗教價值教育是學校自述定位的一部分；參觀時可了解日常生活如何落實，而不只看節慶活動。", sourceUrl: "https://www.rhenish.org/Common/Reader/Channel/ShowPage.jsp?Charset=big5_hkscs&Cid=119&Pid=8&Version=9&page=0" },
    { label: "校方展示各級主題活動及生活體驗", value: "校方活動頁按級別展示校園活動。這可供家長觀察活動如何配合幼兒年齡，但網頁未提供各級活動頻率或每名學生的參與比例，應向學校索取當屆課程表和活動安排。", sourceUrl: "https://rhenish.edu.hk/校園生活/各級校園活動/" },
  ] }]),

  profile("619841", "按教育局校號619841及中環堅道99號豐樂閣登記校址識別。迦南官方網站設香港校舍頁及2027/28招生資訊；2026/27教育局概覽所列上午、下午班、粵語及師生比例按校號對應校址理解。", "https://www.cannan.edu.hk/", [
    { label: "迦南幼稚園：幼稚園課程", scope: "兒童為本、六大學習範疇、英語與普通話活動、評估及家校溝通；屬校方自述。", url: "https://www.cannan.edu.hk/kindergarten" },
    { label: "迦南幼稚園：閱讀發展", scope: "閱讀鴨計劃與繪本活動的校方說明。", url: "https://www.cannan.edu.hk/development" },
  ], [{ title: "主題探索、閱讀與多語活動", featured: true, note: "校方同時經營多個校舍；以下特色引用機構課程頁，不推定每校舍每級的實際語言課時相同。", details: [
    { label: "課程以兒童為本，透過主題和體驗活動引導學習", value: "迦南官方課程頁列出六大學習範疇、主題延伸、專題活動及遊戲探索，並以英語和普通話活動培養語文能力。這些是學校提供的活動類型，不能換算成主要授課語言或每週課時；家庭若重視語言比例，應索取堅道校舍當屆時間表。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "校方以繪本活動和閱讀計劃培養語文興趣", value: "校方介紹以繪本延伸主題教學、閱讀鴨計劃和親子閱讀，並透過家長會、觀課及學習報告協助家長了解孩子進度。家長可詢問觀課頻率、學習記錄和不同語言起點的跟進方式。", sourceUrl: "https://www.cannan.edu.hk/development" },
    { label: "網站已刊出2027/28新生資訊", value: "迦南官方首頁已刊出2027/28新生資訊，並設多個校舍。申請時須確認表格選擇的是中環堅道校址，並以該校舍當屆收生和面見安排為準；首頁公告未能替代目標校舍的個別名額資料。", period: "2027/28學年招生資訊", sourceUrl: "https://www.cannan.edu.hk/" },
  ] }]),

  profile("156493", "按教育局校號156493及沙田禾輋邨順和樓登記校址識別。教育局2026/27概覽及校方網站分別支持班制、粵語、師生比例和課程描述；招生細節按校方公布年度標示。", "https://www.skhhsckg.edu.hk/", [
    { label: "聖公會靈風堂幼稚園：課程理念", scope: "六大學習範疇、故事主題、遊戲、專題及道德教育；屬校方課程自述。", url: "https://www.skhhsckg.edu.hk/curriculum-philosophy/?lang=en" },
    { label: "聖公會靈風堂幼稚園：辦學願景", scope: "聖公會精神及基督教價值教育。", url: "https://www.skhhsckg.edu.hk/our-vision/?lang=en" },
    { label: "聖公會靈風堂幼稚園：收生安排", scope: "校方已公布招生年度、申請及面見規則；逾期年度只作歷史流程參考。", url: "https://www.skhhsckg.edu.hk/admission/?lang=en" },
    { label: "社會福利署幼稚園名單", scope: "校名及禾輋邨校址的第二權威來源核對。", url: "https://www.swd.gov.hk/oprs/common_file/OPRS_KG_List.pdf" },
  ], [{ title: "故事、遊戲與雙語三語環境", featured: true, note: "靈風堂網站詳述課程設計，但實際語言接觸時數未公開；校方理念不是獨立成效評估。", details: [
    { label: "以故事主題連結六大學習範疇", value: "校方列出體能與健康、語文、早期數學、大自然與生活、自我與社會、藝術與創意六個範疇，並用故事、專題、參觀和小組活動延伸學習。家長可了解不同年齡的活動如何由遊戲過渡至孩子表達和探索，而不是只看單次表演。", sourceUrl: "https://www.skhhsckg.edu.hk/curriculum-philosophy/" },
    { label: "校方提供英語及普通話學習機會", value: "學校稱由英語及普通話教師透過故事、角色扮演、遊戲和活動營造語言環境。教育局概覽仍把粵語列為授課語言；兩類資料不能合併成英語或普通話為主，也沒有公開各語言課時比例。", sourceUrl: "https://www.skhhsckg.edu.hk/curriculum-philosophy/" },
    { label: "面見以遊戲形式進行，設非華語家庭溝通支援", value: "校方2026/27招生頁列面見以遊戲形式進行，並可安排英文面試及按需要提供傳譯支援。這是已公布年度的做法；下一屆日期、年齡界線及文件要求需查閱更新公告。", period: "2026/27招生資料", sourceUrl: "https://www.skhhsckg.edu.hk/admission/?lang=en" },
  ] }]),

  profile("614904", "教育局校號614904的註冊名及舊登記地址為中環威靈頓街56–58號；校方2026年9月公告稱已遷往大坑。保留註冊地址作身份依據，另列現址；舊址KGP與收費文件不當作大坑校舍當前數據。", "https://hkkidsacademy.edu.hk/les-petits-lascars", [
    { label: "Les Petits Lascars：2026年遷址公告", scope: "校方於2026-09-25公布由中環遷往大坑及新校址。", url: "https://hkkidsacademy.edu.hk/1956/a-new-chapter-for-les-petits-lascars" },
    { label: "Les Petits Lascars：辦學及課程", scope: "法國課程、英語國際課程、語言班型、班級人數及校方自述的教學理念。", url: "https://hkkidsacademy.edu.hk/les-petits-lascars-our-school" },
    { label: "教育局學校收費證明（校號614904）", scope: "原中環登記校址截至2025-09-01生效的收費證明；不代表遷址後現行費用。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/614904.pdf" },
  ], [{ title: "法國課程、多語班型與遷址核對", featured: true, note: "校方已公布由中環遷往大坑；EDB登記地址及2025年收費證明仍是舊址資料。申請前應核實大坑校址的註冊更新與當屆收費。", details: [
    { label: "校方2026年9月宣布由中環遷往大坑", value: "校方公告列新址為大坑勵德邨勵德坊第8座地下及低層地下2號舖。教育局名錄及2025年收費證明仍對應中環威靈頓街舊址；家長應先核對現址登記及所選課程的實際上課校舍。", period: "校方公告：2026-09-25", sourceUrl: "https://hkkidsacademy.edu.hk/1956/a-new-chapter-for-les-petits-lascars" },
    { label: "校方提供法國課程與英語國際課程兩條課程線", value: "學校自述提供法國國民教育課程及English International Early Years Curriculum，並有法語、英語雙語及加入普通話的多語班型。這些是課程種類，不等於各語言在每日課堂的固定比例；應按大坑校址索取實際時間表。", sourceUrl: "https://hkkidsacademy.edu.hk/les-petits-lascars-our-school" },
    { label: "校方稱幼稚園班每班最多14至15人", value: "官方學校介紹列幼稚園小班規模上限14至15人，並以法國課程、主動學習和幼兒自主為特色。此為校方公布的班額上限，不代表每班實際人數或師生比例；遷址後的班級安排仍應向校方確認。", sourceUrl: "https://hkkidsacademy.edu.hk/les-petits-lascars-our-school" },
  ] }]),

  profile("578630", "按教育局校號578630及西貢匡湖居購物中心地下D舖登記校址識別。Guidepost現行網站已改用新網域；其2026年活動文件仍以Sai Kung校址命名，未能取得精確對應當屆K1–K3課程的校舍專頁，故只列網絡課程理念及校址相符活動。", "https://guidepostmontessori.hk/campuses/sai-kung/", [
    { label: "Guidepost Montessori：Sai Kung校舍", scope: "Sai Kung校舍地址、幼兒至3–6歲課程類別及聯絡資料。", url: "https://guidepostmontessori.hk/campuses/sai-kung/" },
    { label: "Guidepost Montessori Hong Kong：課程理念", scope: "蒙特梭利工作環境、混齡、自我修正材料及兒童自主；屬機構自述，不能直接證明西貢每班執行情況。", url: "https://guidepostmontessori.hk/" },
  ], [{ title: "蒙特梭利自主學習與西貢校址", featured: true, note: "Guidepost是多校舍機構；網站內容以網絡層面為主。本頁不把其他校舍班額或費用套用到西貢。", details: [
    { label: "Sai Kung校舍招收幼兒至3–6歲Children's House", value: "校方Sai Kung頁列半獨立及獨立Toddler、2–3歲Toddler及3–6歲Children's House等課程，地址為匡湖居購物中心地下D舖。校方沒有在校舍頁列各班額或語言課時，需按孩子年齡向招生處索取。", sourceUrl: "https://guidepostmontessori.hk/campuses/sai-kung/" },
    { label: "機構課程以孩子自主操作和自我修正為核心", value: "Guidepost把課室描述為由兒童選擇有序教材、按自己的進度工作，並透過材料自我檢查；也提到混齡及教師觀察。這是機構對蒙特梭利模式的說明，家長可在西貢校舍參觀時確認實際班級運作。", sourceUrl: "https://guidepostmontessori.hk/" },
  ] }]),

  profile("578053", "按教育局校號578053及香港仔逸港居地下1、2號舖識別；Mulberry House官方Southside頁標示Ocean Court同一街道及G/F 1、2號舖。教育局2026/27概覽資料按此校址列示，不混用大埔校舍資料。", "https://mulberryhousekg.com/en/southside-campus/", [
    { label: "Mulberry House：Southside校舍", scope: "Ocean Court香港仔校舍地址、設施與校舍介紹。", url: "https://mulberryhousekg.com/en/southside-campus/" },
    { label: "Mulberry House：雙語沉浸課程", scope: "英語與普通話課程、EYFS及探究學習；課程比例採校方自述。", url: "https://mulberryhousekg.com/en/dual-language-immersion/" },
    { label: "Mulberry House：申請及入學年齡", scope: "2026/27及2027/28年齡指引、課程班型和申請安排。", url: "https://mulberryhousekg.com/en/how-to-apply/" },
  ], [{ title: "英普雙語沉浸與探究式學習", featured: true, note: "Southside與大埔校舍課程理念相近，但地址、班級與收費仍須按校舍確認；50/50是校方課程定位，非本輪獨立課時測量。", details: [
    { label: "Southside校舍位於香港仔海傍道逸港居", value: "校方列地址為Ocean Court Block 3、香港仔海傍道3號，G/F Shops 1及2，與教育局登記的逸港居地下1、2號舖相符。校舍頁另列電話5598 0555。", sourceUrl: "https://mulberryhousekg.com/en/southside-campus/" },
    { label: "課程以英語及普通話雙語沉浸為主軸", value: "校方稱課程以英語和普通話雙語共同授課，採探究學習、EYFS及遊戲、故事、藝術、感官活動；並稱雙語班目標為50/50。這是校方的課程設計目標，家長仍應確認孩子所報班型及實際語言時間表。", sourceUrl: "https://mulberryhousekg.com/en/dual-language-immersion/" },
    { label: "2026/27與2027/28均列PN及K1至K3班型", value: "校方申請頁列出兩個學年的PN、K1、K2及K3年齡指引，並提供半日及延長時段班型。出生年份和班級界線須以申請年度為準；教育局登記上午／下午時段不等於所有班型均在Southside開辦。", period: "2026/27及2027/28", sourceUrl: "https://mulberryhousekg.com/en/how-to-apply/" },
  ] }]),

  profile("607215", "按教育局校號607215及堅尼地城士美菲路85號寶德大廈地下識別。Wilderness官方K1頁與校址一致，列遊戲核心課程及每日讀寫、數學、中文；教育局概覽另列授課語言與師生比例，兩者不轉換成課時比例。", "https://www.wilderness.asia/", [
    { label: "Wilderness Kindergarten：K1 Foundation", scope: "K1年齡、遊戲核心、日常語文數學中文及士美菲路校址。", url: "https://www.wilderness.asia/wilderness-kindergarten-programs/k1" },
    { label: "Wilderness Kindergarten：學校理念", scope: "Reggio Emilia啟發、自然連結、社交情緒及幼兒參與；屬校方自述。", url: "https://www.wilderness.asia/" },
  ], [{ title: "遊戲、探究與日常中文學習", featured: true, note: "K1頁明列日常中文課程，但EDB概覽將英語列為授課語言；來源描述層次不同，不能據此判斷中英課時比例。", details: [
    { label: "K1以遊戲作為課程核心，適合重視探索的家庭了解", value: "校方把K1 Foundation定位為3至4歲課程，透過遊戲鼓勵幼兒探索、提問、表達及建立社交技巧。這種設計通常需要孩子在活動中主動參與；參觀時可觀察教師如何引導較慢熱或較需要結構的幼兒。", sourceUrl: "https://www.wilderness.asia/wilderness-kindergarten-programs/k1" },
    { label: "讀寫、數學及中文融入每日單元", value: "K1官方頁稱每日讀寫、數學和中文課融入主題單元；EDB概覽則把授課語言列為英語。兩者說明的不是相同指標，沒有公開各科或中英文課時比例，應索取校舍當屆時間表。", sourceUrl: "https://www.wilderness.asia/wilderness-kindergarten-programs/k1" },
    { label: "Reggio Emilia啟發及自然連結是校方定位", value: "校方強調遊戲、與自然連結、社交情緒健康和幼兒主動參與。家長可留意孩子是否有持續專題、作品展示及反思機會，並問清每日戶外活動安排；學校理念不能替代個別孩子實際適應評估。", sourceUrl: "https://www.wilderness.asia/" },
  ] }]),

  profile("607150", "按教育局校號607150及紅磡黃埔花園第七期地下識別。校方2027/28招生章程列聯繫小學、申請與面試日期及課程取向；EDB 2026/27概覽資料按該校址列示，學費以校方公告年度標明。", "https://www.ktlks.edu.hk/", [
    { label: "九龍真光中學（幼稚園部）：2027/28招生章程", scope: "入學年齡、班級時段、面試日期、公布結果及聯繫小學安排。", url: "https://www.ktlks.edu.hk/" },
    { label: "九龍真光中學（幼稚園部）：課程", scope: "主題課程、探索體驗、閱讀、體能音樂與品格教育。", url: "https://www.ktlks.edu.hk/curriculum-tc/" },
    { label: "九龍真光中學（幼稚園部）：校址及聯絡", scope: "黃埔花園第七期登記校址、電話及小學部聯繫資訊。", url: "https://www.ktlks.edu.hk/contact-us/" },
  ], [{ title: "真光小學銜接與主題體驗課程", featured: true, note: "聯繫小學提供升學銜接資訊，但仍須按招生章程和小學規則理解；校方列出的「至少四成」不是每名K3學生的保證學位。", details: [
    { label: "2027/28招生章程列K1至K3及面試日程", value: "校方章程列明2027年9月開辦幼兒班、低班及高班，面試日期為2026年11月7日，結果於11月18日或之前通知。這是特定入學年度安排；家長應直接按校方公告完成報名和註冊。", period: "2027/28入學；公告日期2026年", sourceUrl: "https://www.ktlks.edu.hk/" },
    { label: "校方公布小學部優先考慮幼稚園畢業生", value: "校方章程稱小學部先取錄該年高班至少四成學生，其後遇面試同分時優先考慮幼稚園部學生。這描述校方公布的銜接規則，不代表每名幼稚園生自動獲位；家長應確認具體資格、申請程序及當年小學學額。", sourceUrl: "https://www.ktlks.edu.hk/" },
    { label: "課程以主題探索、閱讀及品格培育組合", value: "校方列主題課程、探索與體驗、個人化中英文閱讀、體能音樂及基督教品格教育。對重視校本價值和活動學習的家庭，值得在參觀時看孩子如何操作材料、表達想法，以及閱讀計劃如何配合不同程度。", sourceUrl: "https://www.ktlks.edu.hk/curriculum-tc/" },
    { label: "校方列2026/27每月學費港幣6,865元，收11期", value: "此為校方公布的2026/27年度金額，公告註明仍以教育局正式批核數目為準。申請時須確認當屆核准收費及其他校本費用，不把舊年度費用當作下一屆價格。", period: "2026/27學年；校方公布，待教育局批核", sourceUrl: "https://www.ktlks.edu.hk/" },
  ] }]),

  profile("590029", "按教育局校號590029及愉景灣海澄湖畔路92號校址識別。校方網站說明法語學習及法國課程取向；教育局2026/27概覽按該址列英語授課與師生比例，應理解為兩種不同來源描述，不推定法英實際課時。", "https://ecole-discovery.com/kindergarten", [
    { label: "La Petite Enfance Kindergarten：使命與課程", scope: "法語學習使命、法國課程銜接及課程活動範疇。", url: "https://ecole-discovery.com/kindergarten" },
    { label: "教育局《幼稚園概覽2026/27》：校址5900290001", scope: "該校址班制、授課語言及師生比例；以教育局年度數據為準。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5900290001" },
    { label: "教育局香港教育機會資料", scope: "La Petite Enfance法語教學及愉景灣校址的第二官方來源。", url: "https://www.edb.gov.hk/attachment/tc/student-parents/ncs-students/overview/Edu_Opportunities_in_HK_TC.pdf" },
  ], [{ title: "法語啟蒙與愉景灣校址資料", featured: true, note: "學校自述以法語課程為核心；EDB 2026/27概覽將授課語言列為英語。兩者均照原來源呈現，未有可用時間表判斷語言比例。", details: [
    { label: "校方使命是讓幼兒學習法語並接觸法國課程", value: "學校稱希望幼兒透過語言、寫字啟蒙、成為學習者、動作活動、認識世界及感官創意等範疇接觸法語，並為日後以法語或法語為重要語言的學習作準備。這是校方課程定位，家長須確認所報班別的實際語言安排。", sourceUrl: "https://ecole-discovery.com/kindergarten" },
    { label: "EDB概覽列此校址授課語言為英語", value: "2026/27教育局概覽按校址5900290001列上午、下午及全日班、英語授課和1:5師生比例；校方頁則強調法語課程。由於沒有公開每週課時分配，不應簡化成法語或英語單語主導，報名前宜索取當屆課表。", period: "2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5900290001" },
    { label: "課程涵蓋語言、書寫、動作與感官探索", value: "校方列出的課程範疇涵蓋語言、初步書寫、成為學習者、動作技能、認識世界及感官與創意。家庭可按孩子興趣及語言目標了解活動如何安排；網站未列該址學費，不能由其他學校或機構推算。", sourceUrl: "https://ecole-discovery.com/kindergarten" },
  ] }]),
];
