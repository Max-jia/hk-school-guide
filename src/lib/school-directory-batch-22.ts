import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
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

/** School-specific additions for the next ten active kindergarten profiles. */
export const KINDERGARTEN_BATCH_22: PilotSchool[] = [
  profile("607290", "教育局概覽：2026/27；校方課程及費用頁查核：2026-10", "保良局建造商會學校幼稚園部採用非本地課程，與同址小學屬同一校園但入學級別、收費及安排須按各自資料理解。IB PYP、雙語和探究式學習為校方公開定位；費用以校方現行頁面為準。", [
    { label: "教育局《學校位置及資料》", scope: "校號607290、校址0001、灣仔天后廟道62號及學校類別。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：保良局建造商會學校", scope: "校址0001當屆班制、語言及其他概覽欄位；不把小學資料當作幼稚園統計。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6072900001" },
    { label: "HKCA PLK School：Early Years in the PYP", scope: "校方對幼稚園早期教育、遊戲、探究及PYP框架的介紹。", url: "https://www.plkis.edu.hk/our-primary-school-programme/" },
    { label: "HKCA PLK School：課程", scope: "幼稚園及小學採用的課程框架、科目連結與探究式跨學科學習。", url: "https://www.plkis.edu.hk/our-curriculum/" },
    { label: "HKCA PLK School：收費及其他費用", scope: "校方列出的幼稚園學費、雜費及申請費；實際年度與核准以校方最新通知為準。", url: "https://www.plkis.edu.hk/our-fees-other-costs/" },
  ], [{ title: "幼稚園部的PYP與雙語環境", featured: true, note: "PYP及教學理念屬校方資料；學校亦營辦小學，這不等於幼稚園學生自動獲得特定小學學位。", details: [
    { label: "以探究及跨學科方式組織早期學習", value: "校方將幼稚園列入IB小學項目（PYP）框架，描述幼兒透過提問、操作、遊戲和與同伴合作來建構理解。家長參觀時可觀察自由探索與教師直接指導如何銜接，也可索取幼稚園階段的單元例子，確認語文、數學、藝術和體能如何落到日常活動。", sourceUrl: "https://www.plkis.edu.hk/our-primary-school-programme/" },
    { label: "課程重視英語及普通話", value: "校方課程頁把英語及普通話列入幼稚園課程，並按PYP單元發展不同學科經驗。公開頁面沒有列出當屆逐日語言時數；若家庭以英語沉浸程度作主要考慮，應向校方索取目前班級時間表。", sourceUrl: "https://www.plkis.edu.hk/our-curriculum/" },
    { label: "學費與雜費分開計算", value: "校方收費頁列幼稚園學費及一筆涵蓋學習材料、文具、美術用品和外出活動的雜費；另有申請費。申請費不保證錄取，家庭宜按當屆費用頁確認金額與付款期數。", sourceUrl: "https://www.plkis.edu.hk/our-fees-other-costs/" },
  ] }]),

  profile("621366", "教育局概覽：2026/27；校方課程頁查核：2026-10", "資料指香港西區婦女福利會何瑞棠紀念中英文幼稚園，校址為大埔逸雅苑。學校網站公布以遊戲、專題和體驗活動配合持續評估，並稱每月安排1至2次Eduplay Day；活動頻率為校方自述。", [
    { label: "教育局《學校位置及資料》", scope: "校號621366、校址0001及大埔逸雅苑逸欣閣地下。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：何瑞棠紀念中英文幼稚園", scope: "大埔校址當屆班制、授課語言、師生比例及收費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6213660001" },
    { label: "校方：課程與學習", scope: "螺旋課程、小組及專題學習、持續評估、Eduplay Day與校方語言安排。", url: "https://www.dwmackg.edu.hk/課程與學習/" },
    { label: "校方：學校背景", scope: "辦學宗旨、創校及家校合作等學校自述。", url: "https://www.dwmackg.edu.hk/關於我們/" },
  ], [{ title: "遊戲、專題研習與兩文三語", featured: true, note: "以下教學安排來自校方課程頁；活動描述不構成外部成效評估。", details: [
    { label: "以遊戲、專題和小組活動帶動學習", value: "校方稱課程按幼兒能力與興趣採螺旋式設計，結合小組學習、專題研習、高廣度及設計教學等方式，並透過實驗、討論、扮演和參觀等活動實踐。家長可藉此了解學校提供的活動類型，入學前仍宜查看孩子所屬年級的實際課程例子。", sourceUrl: "https://www.dwmackg.edu.hk/課程與學習/" },
    { label: "每月安排1至2次Eduplay Day", value: "校方介紹每月安排一至兩次遊學日，以預設情境和遊戲活動延伸學習。這是校方列出的活動節奏；家長可確認各級是否一致、活動地點及交通安排。", sourceUrl: "https://www.dwmackg.edu.hk/課程與學習/" },
    { label: "粵語、英語及普通話均有課堂接觸", value: "學校稱以粵語及英語教學，並輔以普通話活動，也希望在校園增加英語使用機會。公開頁沒有列各語言的逐日課時，不能單憑「兩文三語」推定英語為主要教學語言。", sourceUrl: "https://www.dwmackg.edu.hk/課程與學習/" },
  ] }]),

  profile("558346", "教育局概覽：2026/27；校方課程頁查核：2026-10", "Little Buds Kindergarten位於佐敦，學校自述主要服務尼泊爾及其他族裔家庭，同時歡迎本地及新來港家庭。校方課程頁介紹兒童自主活動區及為非華語幼兒設計的校本中文學習。", [
    { label: "教育局《學校位置及資料》", scope: "校號558346、校址0001及佐敦渡船街金霞閣地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：Little Buds Kindergarten", scope: "校址0003當屆班制、語言及教育計劃等概覽欄位；教育局概覽校址編號與基本註冊資料的校址編號分開標示。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5583460003" },
    { label: "Little Buds Kindergarten：Curriculum", scope: "兒童中心課程、活動中心、生活主題、雙語安排及校本中文課程。", url: "https://littlebuds.edu.hk/?page_id=6536" },
    { label: "Little Buds Kindergarten：About Us", scope: "校方自述的創校、服務社群、辦學使命及價值觀。", url: "https://littlebuds.edu.hk/?page_id=6517" },
  ], [{ title: "多元文化社群與兒童自主學習", featured: true, note: "服務對象及課程理念為校方自述；中文支援方式和班內語言安排應按孩子情況向校方確認。", details: [
    { label: "兒童在不同學習區自主選擇活動", value: "校方介紹課室設有美術、音樂、積木和閱讀等活動中心，孩子可在區域間選擇，並透過歌曲、遊戲和對話學習。這種設計讓家庭可觀察孩子是否適應自主轉換活動；家長亦可了解老師如何支援仍需要較多引導的幼兒。", sourceUrl: "https://littlebuds.edu.hk/?page_id=6536" },
    { label: "主題由幼兒日常生活經驗出發", value: "學校以學校、家庭和食物等生活主題規劃活動，並把讀寫預備、數學、科學、感官遊戲、戲劇、美術和音樂帶入學習區。校方稱會按個別幼兒及小組需要編排主題計劃；這是校本課程說明，不代表每級每週課表完全相同。", sourceUrl: "https://littlebuds.edu.hk/?page_id=6536" },
    { label: "設有非華語幼兒校本中文課程", value: "校方說明會按非華語學生需要設計中文材料，並透過歌曲、動作及活動學習；同時稱課堂語言分為英語與中文。對以中文融入為目標的家庭，宜問清孩子入學時的中文基礎如何評估，以及支援如何按進度調整。", sourceUrl: "https://littlebuds.edu.hk/?page_id=6536" },
  ] }]),

  profile("532541", "教育局概覽：2026/27；ESF校方資料查核：2026-10", "本頁只指英基青衣國際幼稚園。校方描述以遊戲及探究為本；英基2026年起更新幼稚園升小安排，關聯小學按年度及學額分配，不能把「英基網絡」理解為任選小學。", [
    { label: "教育局《學校位置及資料》", scope: "校號532541、校址0001及青衣青敬路33號登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：英基青衣國際幼稚園", scope: "青衣校址當屆班制、語言及教育局概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5325410001" },
    { label: "ESF Tsing Yi Kindergarten：學校及教學", scope: "校方對遊戲探究、學習支援、校園及家庭合作的現行介紹。", url: "https://tyk.esf.edu.hk/en/" },
    { label: "ESF：2026起幼稚園升小新安排", scope: "2026年起關聯小學安排、分配方式與適用出生年份。", url: "https://join-us.esf.edu.hk/earlyyearsnewapproach/" },
    { label: "ESF：2026/27學費", scope: "青衣幼稚園2026/27學費及收費說明。", url: "https://join-us.esf.edu.hk/school-fees/" },
  ], [{ title: "遊戲探究與英基升小銜接", featured: true, note: "課程描述以青衣校方頁面為準；升小安排按英基2026年公布的年度政策理解。", details: [
    { label: "透過遊戲與探究培養表達和社交", value: "青衣校方把課程描述為遊戲式探究，重視好奇心、創意、溝通和社交發展，並設圖書館及室內外探索空間。家長參觀時可留意活動如何由孩子提問延伸，以及教師如何支持語言或學習步伐不同的幼兒。", sourceUrl: "https://tyk.esf.edu.hk/en/" },
    { label: "升小關聯學校按年度分配", value: "英基公布自2026年起更新幼稚園升小安排：青衣幼稚園可關聯九龍小學、愉景灣小學及畢架山小學，分配依關聯安排、申請年份和適用規則進行。家長須核實孩子入學屆別和當屆分配細則；這不代表可保證獲派首選校舍。", sourceUrl: "https://join-us.esf.edu.hk/earlyyearsnewapproach/" },
    { label: "2026/27學費另作年度預算", value: "英基收費頁列青衣幼稚園2026/27年度學費HK$112,800。另需確認申請費、註冊及可能調整的項目，避免只用學費比較整體支出。", period: "2026/27學年", sourceUrl: "https://join-us.esf.edu.hk/school-fees/" },
  ] }]),

  profile("532355", "教育局概覽：2025/26（數據截至2024/25）；校方活動頁查核：2026-10", "小蜜蜂幼稚園仍列教育局2025/26概覽及2026/27收生入口；現行可讀校方網站以校園活動為主，課程細節採用有年份的教育局校方申報並明確標示，收費及班額不當作2026/27現值。", [
    { label: "教育局《學校位置及資料》", scope: "校號532355、校址0001及香港科技大學校園地址。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2025/26》：小蜜蜂幼稚園", scope: "校址0001的2025/26概覽、截至2024年9月的班級及師資資料、2026/27招生申請入口和校方課程申報。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?district=saikung&lang=en&schid=6338" },
    { label: "教育局《幼稚園概覽 2023/24》：小蜜蜂幼稚園", scope: "學校提交的早期課程說明及2022年統計；只作歷史參照。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/532355e-0001.pdf" },
    { label: "小蜜蜂幼稚園：校園活動", scope: "校方公布的活動相片及校園生活記錄；不據此推算固定課程時數。", url: "https://busybees.webhost.ust.hk/children_websites.html" },
  ], [{ title: "EYFS與雙語學習的資料年份", featured: true, note: "目前能讀到的課程申報來自2025/26概覽；家長應向校方索取2026/27課程與收費文件核實更新。", details: [
    { label: "教育局概覽記錄EYFS及遊戲探究", value: "校方在2025/26教育局概覽中申報參照Early Years Foundation Stage（EYFS），以遊戲、探究、藝術手作和主題活動組織學習，並提及早期數學、讀寫及中英文理解。該課程資料有年度邊界，不能據此保證2026/27每班做法完全相同。", period: "教育局概覽：2025/26；課程資料為校方申報", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?district=saikung&lang=en&schid=6338" },
    { label: "概覽的班額與費用不是本年度報價", value: "2025/26概覽的學生人數與師生比例按2024年9月統計，當屆學費亦有單獨年度；不代表現時空缺或2026/27費用。報名前應向校方查明目前開辦的年級、上午／下午班和實際學費。", period: "統計截至2024年9月；收費資料為2025/26", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?district=saikung&lang=en&schid=6338" },
  ] }]),

  profile("518247", "教育局概覽：2026/27；校方課程及支援頁查核：2026-10", "穆斯林幼稚園由香港伊斯蘭信託基金總會董事會贊助；校方服務本地及多元文化家庭。英語、中文和伊斯蘭宗教教育按校方課程頁描述，宗教課程對象為K2及K3。", [
    { label: "教育局《學校位置及資料》", scope: "校號518247、校址0001及灣仔愛群道40號登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：穆斯林幼稚園", scope: "校址0001當屆班制、授課語言及教育計劃資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5182470001" },
    { label: "穆斯林幼稚園：Our Curriculum", scope: "校本中文、英語閱讀及K2/K3伊斯蘭宗教課程介紹。", url: "https://www.mck.edu.hk/index.php/our-curriculum" },
    { label: "穆斯林幼稚園：About Us", scope: "辦學團體、服務社群、學校願景及多元文化校園自述。", url: "https://www.mck.edu.hk/index.php/about-us" },
    { label: "穆斯林幼稚園：Admission", scope: "校方現行申請表與班級選擇入口；實際收生須按年度確認。", url: "https://www.mck.edu.hk/index.php/admission/2-uncategorised/12-application-form" },
  ], [{ title: "多元文化支援與中英文學習", featured: true, note: "文化融合及課程安排是校方自述；不據此推定孩子的語言進度或適應結果。", details: [
    { label: "以兒童需要及文化融合作課程起點", value: "校方稱課程以兒童為本，按發展、經驗與能力調整，並希望協助非華語幼兒融入社區。對家中不常用中文的家庭，入學前可確認中文支援如何分級，以及家長可用哪種語言溝通。", sourceUrl: "https://www.mck.edu.hk/index.php/our-curriculum" },
    { label: "英語閱讀與校本中文學習並行", value: "學校介紹以故事和拼音培養英語閱讀，中文則使用按幼兒能力、需要和興趣編寫的材料，並透過遊戲、歌曲及故事練習聽說讀寫。公開頁沒有列明各語言的課時比例。", sourceUrl: "https://www.mck.edu.hk/index.php/our-curriculum" },
    { label: "K2、K3設伊斯蘭宗教課程", value: "校方說明K2及K3設宗教課，內容包括伊斯蘭信仰、禮儀和阿拉伯字母讀寫基礎。這是家庭選校時應預先了解的課程組成；可向校方查問課堂形式及家庭配合方式。", sourceUrl: "https://www.mck.edu.hk/index.php/our-curriculum" },
  ] }]),

  profile("316504", "教育局概覽：2026/27；校方費用與課程頁查核：2026-10", "第一幼稚園校址為彩虹邨金漢樓地下。校方列普通話及英語專科課程、親子活動和課室外體驗；2026年9月生效的全日班費用另包括膳食，與半日免費資助分開呈列。", [
    { label: "教育局《學校位置及資料》", scope: "校號316504、校址0001及彩虹邨金漢樓地下登記資料。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：第一幼稚園", scope: "校址0001當屆班制、授課語言及概覽資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3165040001" },
    { label: "第一幼稚園：課程特色", scope: "英語及普通話專科課、親子活動和社區參觀等校方介紹。", url: "https://www.a-onekg.edu.hk/tc/課程特色" },
    { label: "第一幼稚園：學費資料", scope: "2026年9月1日起生效的半日班、全日班及膳食收費。", url: "https://www.a-onekg.edu.hk/tc/學費資料" },
    { label: "第一幼稚園：課室外體驗活動", scope: "校方2025/26年度K1外出學習活動範例；不等於每級固定活動頻率。", url: "https://www.a-onekg.edu.hk/tc/out_door_activity_form01" },
  ], [{ title: "語言課程與半日／全日費用", featured: true, note: "專科語言課和活動按校方介紹；收費以2026年9月生效表列示。", details: [
    { label: "普通話及英語由專科教師教授", value: "校方課程特色頁稱普通話及英語課程由專科教師教授，並安排旅行、參觀、社區探訪及親子活動。頁面沒有列出兩種語言的每週時數，若重視英語或普通話主導程度，應向學校索取年級時間表。", sourceUrl: "https://www.a-onekg.edu.hk/tc/課程特色" },
    { label: "課室外活動有明確年級例子", value: "校方公開2025/26年度K1到九龍寨城公園認識香港歷史和傳統建築的活動。這提供了文化體驗式學習的例子，但不能據此推定K2、K3或每學期的活動安排相同。", period: "2025/26年度K1活動", sourceUrl: "https://www.a-onekg.edu.hk/tc/out_door_activity_form01" },
    { label: "半日免費與全日支出不同", value: "校方費用表自2026年9月1日起列K1至K3半日班扣資助後免費；全日班每月學費HK$1,000，膳食費每月HK$440，按10期計收。家庭比較時應將全日學費與膳食分開計算，並再核實當屆代辦項目。", period: "生效日：2026年9月1日", sourceUrl: "https://www.a-onekg.edu.hk/tc/學費資料" },
  ] }]),

  profile("519863", "教育局概覽：2026/27；校方幼兒課程頁查核：2026-10", "京斯敦國際幼稚園的資料只指九龍塘金巴倫道校址。校方介紹幼稚園為3至5歲兒童提供英語及普通話雙語環境，並以四個PYP探究單元組織課程；各級課時及最新費用另按當屆文件核實。", [
    { label: "教育局《學校位置及資料》", scope: "校號519863、校址0001及九龍塘金巴倫道12號。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：京斯敦國際幼稚園", scope: "校址0003當屆幼稚園概覽資料；教育局概覽校址編號與基本註冊資料的校址編號分開標示。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5198630003" },
    { label: "Kingston：Early Years at Kingston", scope: "幼稚園年齡、英語／普通話環境、PYP探究單元及每週活動安排。", url: "https://www.kingston.edu.hk/learning-at-kingston/early-years-at-kingston" },
    { label: "Kingston：Life at Kingston", scope: "幼稚園設施與校園生活空間的校方介紹。", url: "https://www.kingston.edu.hk/life-at-kingston" },
  ], [{ title: "英語與普通話並行的PYP幼兒課程", featured: true, note: "雙語環境、單元數目和每週活動來自校方現行介紹；不代表英普兩語時數相等。", details: [
    { label: "以四個雙語探究單元串連學習", value: "校方稱幼稚園以四個概念導向PYP單元作課程框架，孩子在英語及普通話環境中提問、探索和建構理解。家庭若希望了解語言比例，宜向學校索取各級時間表；「雙語」本身不說明兩種語言各佔多少課時。", sourceUrl: "https://www.kingston.edu.hk/learning-at-kingston/early-years-at-kingston" },
    { label: "每週包括閱讀、遊戲與專科活動", value: "幼兒課程頁列出每日英語及普通話圈時間、探究學習、遊戲、美術館、音樂和體育專科課、戶外遊樂及圖書館等活動。這有助家長了解校方提供的學習範圍；實際分組與活動時數仍應按孩子年級確認。", sourceUrl: "https://www.kingston.edu.hk/learning-at-kingston/early-years-at-kingston" },
    { label: "幼稚園與小學課程框架相連", value: "校方把幼稚園階段描述為孩子開始PYP學習旅程，並說明課程重視發展適切、主動學習。這表示家庭可以考慮校內課程銜接，但不取代對升小安排、學額及當屆收費的核對。", sourceUrl: "https://www.kingston.edu.hk/learning-at-kingston/early-years-at-kingston" },
  ] }]),

  profile("537594", "教育局概覽：2026/27；校方2026/27收生及課程資料查核：2026-10", "翰林幼稚園（天水圍）設上午及全日等班制，校方2026/27招生資料列小組面見及非華語家庭支援；報名日期和註冊費只適用於該入學年度。", [
    { label: "教育局《學校位置及資料》", scope: "校號537594、校址0001及天水圍天頌苑服務設施大樓地下。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：翰林幼稚園（天水圍）", scope: "校址0001當屆班制、師生比例、授課語言及收費概覽。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5375940001" },
    { label: "翰林幼稚園：校監分享", scope: "校方所述遊戲及探索課程、兒童發展和家校社區合作理念。", url: "https://www.academy.edu.hk/en/school-supervisors-jot/" },
    { label: "翰林幼稚園：2026/27申請程序", scope: "該屆報名、面見、非華語支援、取錄及註冊安排。", url: "https://www.academy.edu.hk/en/application-procedures/" },
    { label: "翰林幼稚園：2026/27收生申請表", scope: "校方該年度申請文件及學校地址。", url: "https://www.academy.edu.hk/wp-content/uploads/2025/08/26-27新生報名表-網上報名表.pdf" },
  ], [{ title: "探索式課程與多元語言支援", featured: true, note: "課程及收生流程按校方公開頁面；申請日期、費用和名額每屆需重新核對。", details: [
    { label: "校方以開放、探索和遊戲作課程方向", value: "校監分享稱課程面向3至6歲兒童，採開放、探索和遊戲式學習，並希望配合幼兒發展與幼小銜接。這是辦學方向的自述；家長可參觀時了解教師如何把自由探索連到語文、數學和生活常規。", sourceUrl: "https://www.academy.edu.hk/en/school-supervisors-jot/" },
    { label: "英語、普通話與非華語中文支援分開安排", value: "校方2026/27申請頁列外籍教師英語會話、專業普通話教師，以及為非華語幼兒設計的中文故事閱讀和延展遊戲。下午另有雙語班安排；家庭應確認目標班別、語言時間表及支援方式。", period: "2026/27招生資訊", sourceUrl: "https://www.academy.edu.hk/en/application-procedures/" },
    { label: "K1小組面見及社工支援", value: "校方當屆安排列K1小組面見，並稱可按需要為非華語申請者安排傳譯；駐校社工每週在校兩天。這些措施只反映2026/27公告，申請下一屆前須核對新安排。", period: "2026/27招生資訊", sourceUrl: "https://www.academy.edu.hk/en/application-procedures/" },
  ] }]),

  profile("569569", "教育局概覽：2026/27；校方課程及收費頁查核：2026-10", "香港宣教會優質幼兒學校位於粉嶺欣盛苑，設半日及全日班。宗教教育、繪本、自由遊戲及英語專科教學為校方公開特色；2026/27半日與全日收費分開列示。", [
    { label: "教育局《學校位置及資料》", scope: "校號569569、校址0001及粉嶺欣盛苑商場KG01號舖。", url: EDB_LOCATION },
    { label: "教育局《幼稚園概覽 2026/27》：香港宣教會優質幼兒學校", scope: "校址0001當屆班制、授課語言、師生比例及教育計劃資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5695690001" },
    { label: "香港宣教會優質幼兒學校：課程特色", scope: "繪本、品德及宗教教育、自由遊戲、英語和普通話教學、藝術與科普活動。", url: "https://www.elite-kg.edu.hk/?page_id=5195" },
    { label: "香港宣教會優質幼兒學校：2026/27資料", scope: "班級、上課時段、2026/27學費及主要代辦項目。", url: "https://www.elite-kg.edu.hk/?page_id=8270" },
  ], [{ title: "繪本、宗教教育與多元活動", featured: true, note: "宗教及課程安排屬校方自述；英語接觸不等同全日英語授課。", details: [
    { label: "以校本繪本串連認知、語文與品德", value: "校方稱由專業團隊發展K1至K3校本繪本，按螺旋架構延伸故事和生活經驗，並用於培養想像、思考、專注及人際相處。家庭可詢問繪本如何連結日常主題與幼兒表達，避免只看教材名稱。", sourceUrl: "https://www.elite-kg.edu.hk/?page_id=5195" },
    { label: "設自由遊戲、宗教教育及藝術活動", value: "校方列自由遊戲、聖經故事及祈禱、音樂與美藝、體能和科普體驗等內容。這些是學校課程安排的公開描述；宗教活動對家庭是否合適，以及各活動頻率，宜在校訪時確認。", sourceUrl: "https://www.elite-kg.edu.hk/?page_id=5195" },
    { label: "2026/27全日班學費與代辦費", value: "校方列半日班免費、全日班全年HK$28,138並分11期收費；另有按學期收取的課本、練習簿、文具及茶點等項目。家庭預算時要把全日學費與代辦項目分開計算。", period: "2026/27學年", sourceUrl: "https://www.elite-kg.edu.hk/?page_id=8270" },
  ] }]),
];
