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

/** Kindergarten profile batch 51: registered school numbers and campus-scoped official evidence. */
export const KINDERGARTEN_BATCH_51: PilotSchool[] = [
  profile("594130", "按教育局校號594130及牛頭角彩德邨彩誠樓校址識別。課程以校方資料及教育局概覽為準；校方舊概覽的課程說明保留原年度。", "https://kkc.hkfyg.org.hk/", [
    { label: "香港青年協會鄭堅固幼稚園：學校官方網站", scope: "彩德邨校址、校方聯絡及近期校務消息。", url: "https://kkc.hkfyg.org.hk/" },
    { label: "香港青年協會鄭堅固幼稚園：2024/25幼稚園概覽", scope: "校號594130、校址0001、當年度班制與學費，以及校方提供的課程、教學方式及家長支援。", url: "https://kkc.hkfyg.org.hk/wp-content/uploads/sites/33/2025/10/%E5%B9%BC%E7%A8%9A%E5%9C%92%E5%8F%8A%E5%B9%BC%E7%A8%9A%E5%9C%92%E6%9A%A8%E5%B9%BC%E5%85%92%E4%B8%AD%E5%BF%83%E6%A6%82%E8%A6%BD-2024_25-%E5%AD%B8%E5%B9%B4.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、主要授課語言、師生比例及概覽年度學費。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5941300001" },
  ], [{ title: "建構式學習與社區體驗", details: [
    { label: "校方以主題、專題和繪本活動組織課程", value: "校方2024/25概覽描述循序漸進的課程規劃，透過主題教學、專題研習和繪本教學安排多元活動，讓幼兒從遊戲中學習並主動探索。這種安排重視幼兒的參與；家長可參觀時留意孩子是否有機會提出問題、表達觀察，而非只完成教師預設的成品。", period: "校方概覽：2024/25；當屆安排需再向校方確認", sourceUrl: "https://kkc.hkfyg.org.hk/wp-content/uploads/sites/33/2025/10/%E5%B9%BC%E7%A8%9A%E5%9C%92%E5%8F%8A%E5%B9%BC%E7%A8%9A%E5%9C%92%E6%9A%A8%E5%B9%BC%E5%85%92%E4%B8%AD%E5%BF%83%E6%A6%82%E8%A6%BD-2024_25-%E5%AD%B8%E5%B9%B4.pdf" },
    { label: "校方公布課室外體驗活動，但不代表每個孩子參與相同活動", value: "校方網站持續發布校外體驗活動與年度學習紀錄；這能證明活動曾被安排，不能推算每級的頻率或每名幼兒的參與機會。若家庭重視戶外和社區學習，可向校方問清各級活動安排及家長是否需要額外陪同。", sourceUrl: "https://kkc.hkfyg.org.hk/category/%E9%AB%94%E9%A9%97%E5%AD%B8%E7%BF%92/" },
  ] }]),

  profile("324094", "按教育局校號324094及柴灣道200號登記校址識別。宗教教育、設施和師資為校方自述；師生比例及年度收費另按教育局概覽列示。", "https://www.starkg.edu.hk/", [
    { label: "天主教海星幼稚園：學校簡介與教育目標", scope: "辦學背景、天主教教育理念、校舍設施和班級編制。", url: "https://www.starkg.edu.hk/chi/about-us/general-information" },
    { label: "天主教海星幼稚園：教育方向", scope: "校方對遊戲學習、品格和價值觀的說明。", url: "https://www.starkg.edu.hk/chi/about-us/general-information" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例及當年度費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3240940001" },
  ], [{ title: "天主教品格教育與遊戲學習", details: [
    { label: "校方把愛與服務、謙遜和堅忍放進教育目標", value: "天主教海星幼稚園由天主教香港教區辦學，校方以愛與服務為教育根基，並以愛主、謙遜、溫良和堅忍等價值作育人方向。校方表示讓幼兒在生活和遊戲中學習待人處事；家庭可衡量宗教氛圍是否合適，也可參觀觀察價值教育如何落在日常班級生活。", sourceUrl: "https://www.starkg.edu.hk/chi/about-us/general-information" },
    { label: "柴灣校舍兼設幼稚園與幼兒園服務", value: "校方資料指出，幼稚園於1976年創辦、1995年遷至現址，並於2010年在同一校舍開設幼兒園部。這說明同一地址有不同服務單位；申請前應確認孩子年齡、班級和所選服務，避免把幼稚園班制與幼兒園服務混為一談。", sourceUrl: "https://www.starkg.edu.hk/chi/about-us/general-information" },
  ] }]),

  profile("612561", "按教育局校號612561及葵芳邨葵德樓校址識別。蒙特梭利、共融支援和小組探究為協康會校方自述；教職員比例採2026/27教育局概覽而非較早校方頁數字。", "https://www.heephong.org/sfahk", [
    { label: "協康會上海總會康苗幼稚園：學校簡介", scope: "蒙特梭利、融合教育、探究及STEM等校方課程描述。", url: "https://www.heephong.org/sfahk/about-us/school-profile" },
    { label: "協康會上海總會康苗幼稚園：服務簡介", scope: "校方公布的課程指引、班級服務、家校協作及收生程序。", url: "https://www.heephong.org/page/detail/250040" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "葵芳校址班制、授課語言、師生比例和學費年度欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6125610001" },
  ], [{ title: "蒙特梭利、自主探索與共融支援", featured: true, details: [
    { label: "幼兒可按自己的步伐操作教具和探索", value: "協康會介紹，學校採用蒙特梭利教學，讓幼兒依發展階段、興趣和能力選擇工作，教師安排環境並觀察、適時引導。校方亦強調較少依賴紙筆操練。這較適合重視自主操作的家庭；如果家長期待大量書寫和可見的操練進度，應先了解各級實際功課與記錄方式。", sourceUrl: "https://www.heephong.org/sfahk/about-us/school-profile" },
    { label: "主題探究、STEM和專業支援並行", value: "校方把主題教學、探究活動和STEM融入學習，並由協康會專業團隊提供融合教育支援與家長服務。這些是學校及辦學團體公布的服務框架，不等於每名兒童都會接受治療或個別服務；有具體需要的家庭宜在報名前確認轉介、名額和服務時段。", sourceUrl: "https://www.heephong.org/sfahk/about-us/school-profile" },
  ] }]),

  profile("614106", "按教育局校號614106及沙田碩門邨二期喜碩樓校址識別，與九龍的雋樂幼稚園分開。辦學團體頁涵蓋雋樂兩所幼稚園，凡非沙田校舍專屬內容均明示其團體層級。", "http://pokgst.hkcschild.edu.hk", [
    { label: "香港基督教服務處：雋樂幼稚園辦學及課程方向", scope: "辦學團體對轄下幼稚園的共同課程取向，並非沙田校舍逐班課表。", url: "https://www.hkcs.org/tc/services/pariokindergarten" },
    { label: "教育局《幼稚園概覽2026/27》：沙田校址0001", scope: "沙田校舍的班制、授課語言、師生比例和年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6141060001" },
    { label: "社會福利署：沙田校舍參與學前單位社工服務", scope: "校號614106、校址0001及沙田碩門邨二期校址配對；服務清單不代表個別幼兒服務安排。", url: "https://www.swd.gov.hk/storage/asset/section/270/tc/List%20of%20Participating%20Pre-primary%20Institutions_TC_as%20at%2010_2_2026.pdf" },
  ], [{ title: "幼兒為本課程與校舍資料界線", details: [
    { label: "辦學團體重視全人發展與主題探究", value: "香港基督教服務處介紹，轄下雋樂幼稚園以幼兒為本，透過螺旋式課程、主題單元、專題研習和生活體驗培養自主學習。該頁同時涵蓋九龍及沙田兩所幼稚園，因此這是辦學團體層面的共同方向；沙田校舍每級的實際活動和語言時數仍應向校方確認。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
    { label: "沙田校址與九龍校址不可混用", value: "本頁依教育局校號614106及碩門邨喜碩樓校址識別；香港基督教服務處另有位於牛頭角的雋樂幼稚園。兩校的概覽班制、收費和校舍安排須分開查看，不能因同名或同辦學團體而互相套用。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6141060001" },
  ] }]),

  profile("619787", "按教育局校號619787及日出康城第九期校址識別。迦南網站描述屬辦學團體層級；本頁不把其他校舍的概覽或費用移植至將軍澳校址。", "https://www.cannan.edu.hk/", [
    { label: "迦南幼稚園及幼兒園：課程與學習活動", scope: "辦學團體公開的兒童為本、主題學習、英語/普通話活動及家校參與方向。", url: "https://www.cannan.edu.hk/" },
    { label: "教育局學校搜尋：迦南幼稚園（將軍澳）校址0001", scope: "校號619787、校址0001及日出康城第九期校址配對。", url: "https://applications.edb.gov.hk/schoolsearch/registeredpremises.aspx?langno=2&scrn=619787000112" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "將軍澳校址班制、授課語言、師生比例和當年費用資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6197870001" },
  ], [{ title: "康城校舍與迦南課程方向", details: [
    { label: "教育局資料將本校址列於日出康城第九期", value: "教育局登記校舍資料把校號619787、校址0001對應至將軍澳康城路1號日出康城第九期3樓幼稚園。這是校址識別依據；迦南另有多個校舍，班制、師生比例及收費應按這個校址的概覽頁核對。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/registeredpremises.aspx?langno=2&scrn=619787000112" },
    { label: "迦南辦學方向強調兒童為本與多元活動", value: "迦南網站介紹兒童為本課程、主題學習、自選活動、戶外參觀，以及英語和普通話活動。網站列出的是辦學團體課程方向和近期活動，未有在此頁按將軍澳校址列明各語言課時；若語言比例是主要考慮，應向康城校舍索取目標級別時間表。", sourceUrl: "https://www.cannan.edu.hk/" },
  ] }]),

  profile("612936", "按教育局校號612936及東涌迎東邨迎悅樓校址識別。救世軍專題研習、蒙特梭利及品格教育介紹針對源林潔和幼稚園；不把其他救世軍校舍課程或語言安排併入。", "https://www.salvationarmy.org.hk/esd/rykg", [
    { label: "救世軍源林潔和幼稚園：課程特色報導", scope: "校方管理層介紹專題研習、蒙特梭利、Team BRAVO和分級發展重點。", url: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/?lang=zh-hans" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "東涌校址班制、授課語言、師生比例及年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6129360001" },
    { label: "救世軍源林潔和幼稚園：官方網站", scope: "校方當屆校曆、招生消息和聯絡入口；動態日期需每屆重核。", url: "https://www.salvationarmy.org.hk/esd/rykg" },
  ], [{ title: "生活專題、蒙特梭利與分級發展", featured: true, details: [
    { label: "專題研習把生活經驗帶進課堂", value: "救世軍對源林潔和幼稚園的介紹指出，課程以兒童感興趣的生活事物作主題，透過觀察、探索、討論和實驗連結語文、數學、自然、音樂、體能與美術。這種設計讓家庭可從孩子如何描述、比較和解釋事物觀察學習過程；文章所述活動不等於每級每年固定安排。", sourceUrl: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/?lang=zh-hans" },
    { label: "K1與K2-K3訓練重點不同", value: "校方管理層介紹K1較着重感官刺激、寫前訓練和建立自主能力；K2至K3則加強數學邏輯、思維和解難。家庭可按孩子當前發展與適應情況了解教師如何調整活動，不必把這些重點理解成提早操練小學課程。", sourceUrl: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/?lang=zh-hans" },
  ] }]),

  profile("542768", "按教育局校號542768及華荔邨賞荔樓校址識別。課程及兩文三語取自保良局譚華正夫人幼稚園官方頁；招生及收費不沿用過期公告。", "https://www.plkkgs.edu.hk/plkmtwckg/hk", [
    { label: "保良局譚華正夫人幼稚園：課程特色及學校簡介", scope: "六大學習範疇、生活教育、粵音正音、環保與情意品德教育。", url: "https://www.plkkgs.edu.hk/plkmtwckg/hk/about/10" },
    { label: "保良局譚華正夫人幼稚園：學校官方首頁", scope: "校舍動態、學校報告與聯絡資料；入學年度日期按新公告更新。", url: "https://www.plkkgs.edu.hk/plkmtwckg/hk" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和年度學費資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5427680001" },
  ], [{ title: "生活教育、語文與情意品德培育", featured: true, details: [
    { label: "課程結合生活經驗與六大學習範疇", value: "學校按教育局幼稚園課程指引，結合孩子能力、興趣和生活經驗設計課程，並透過參觀、小組活動和開放式提問鼓勵思考。校方亦列出環保實踐、情緒教育和家長義工等安排。家長可留意活動能否讓孩子自己觀察和表達，而非只看校方列出的活動名稱。", sourceUrl: "https://www.plkkgs.edu.hk/plkmtwckg/hk/about/10" },
    { label: "兩文三語是方向，粵語正音另有校本資源", value: "校方提到聘請英語及普通話教師，也使用粵音故事教材、繪本、分層圖書和遊戲推進語文學習。不同語言活動的存在不能換算成等量授課時間；若家庭比較語言環境，應詢問當屆各級每週安排，以及粵語、普通話和英語分別在什麼活動中使用。", sourceUrl: "https://www.plkkgs.edu.hk/plkmtwckg/hk/about/10" },
  ] }]),

  profile("231134", "按教育局校號231134及大埔新興花園地下校址識別。主流課程和品德教育為校方自述；概覽授課語言列作英語，不能據此推算各語種課時。", "https://www.mink.edu.hk/", [
    { label: "明雅中英文幼稚園：主流課程", scope: "兒童本位、螺旋式發展、主題活動、兩文三語及品德教育。", url: "https://www.mink.edu.hk/%E4%B8%BB%E6%B5%81%E8%AA%B2%E7%A8%8B/" },
    { label: "明雅中英文幼稚園：學校官方首頁", scope: "大埔新興花園校址和學校公告。", url: "https://www.mink.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "班制、授課語言、師生比例和當年度收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2311340001" },
  ], [{ title: "兒童本位課程與語言環境", details: [
    { label: "螺旋式課程配合年齡和生活題材", value: "明雅以兒童發展階段為基礎，按年齡與需要安排主題課程，涵蓋語文、數學、大自然、個人與群體、體能及藝術等範疇；活動包括專題研習、參觀、模擬情境和角色扮演。家長可了解不同年級如何重訪同一主題並加深能力，而不只比較活動數量。", sourceUrl: "https://www.mink.edu.hk/%E4%B8%BB%E6%B5%81%E8%AA%B2%E7%A8%8B/" },
    { label: "普通話與英語由專科教師帶領，概覽授課語言另列英語", value: "校方表示安排專科教師以遊戲和活動教授英語及普通話；教育局2026/27概覽的授課語言欄列英語。這兩類資料描述的層次不同，不能直接推算每日語言比例；若家庭在意中文或普通話銜接，應索取班級時間表及了解粵語日常溝通情況。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2311340001" },
  ] }]),

  profile("536768", "按教育局校號536768及屯門鄉事會路康利中心校址識別。校方目前公布2027/28新生報名資訊和25/26升小派位結果公告；公告標題不提供名校比例，故不作結果推算。", "https://www.karlam.edu.hk/tuenmun/", [
    { label: "珈琳幼稚園屯門分校：學校官方網站", scope: "屯門分校地址、聯絡、課程特色及當屆招生消息。", url: "https://www.karlam.edu.hk/tuenmun/" },
    { label: "珈琳幼稚園屯門分校：2025/26升小派位結果公告", scope: "校方發布結果公告的存在與年份；不據標題推算錄取比例或學校層級。", url: "https://www.karlam.edu.hk/tuenmun/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "屯門校址的班制、授課語言、師生比例及年度費用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5367680001" },
  ], [{ title: "屯門分校與升小資訊的判讀界線", details: [
    { label: "校方已公布新生報名及升小派位公告", value: "屯門分校官方網站列出2027/28年度新生報名消息，也發布2025/26年度小一派位結果公告。後者只證明校方公布了結果，頁面標題本身未列人數、分母或學校去向；在取得逐年數字前，不應把公告描述成升讀名校比例或升小保證。", period: "校方消息：2025/26及2027/28", sourceUrl: "https://www.karlam.edu.hk/tuenmun/" },
    { label: "課程特色須以屯門分校的當屆安排確認", value: "屯門分校有獨立校方頁面，地址列為屯門鄉事會路94至110號康利中心地下及一樓。家長比較珈琳不同校舍時，應以這一分校的概覽和當屆校方通告核對班制、語言和接送；不把總校或其他分校的活動安排直接套用。", sourceUrl: "https://www.karlam.edu.hk/tuenmun/" },
  ] }]),

  profile("610771", "按教育局校號610771及黃埔花園第七期校址識別。校方網域指向國際課程網站，但教育局另列本地與非本地課程；本頁不混合兩種課程的學費或課程資料。", "http://www.william-inter-kg.edu.hk", [
    { label: "教育局學校搜尋：威廉（睿智）幼稚園（黃埔）", scope: "校號、校址、註冊資料及批准課程入口。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=610771000113" },
    { label: "教育局《幼稚園概覽》：黃埔本地課程校址0001", scope: "2022/23學校提供的本地課程與校本理念歷史資料；不代表現行課程完整版本。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/610771c-0001Y.pdf" },
    { label: "教育局收費證明書：黃埔校址", scope: "非本地課程費用證明自2025-09-01生效；不可套用到本地課程或後續學年。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/610771.pdf" },
  ], [{ title: "本地與非本地課程需分開比較", details: [
    { label: "同一校號下需先確認報讀課程", value: "教育局資料把校號610771對應至黃埔花園第七期校址，並列有本地及非本地課程相關資料。兩者的課程和收費不可混為一談；家長查詢時宜先說明申請哪一個課程，再核對目標學年課表、授課語言和學費。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=610771000113" },
    { label: "較早教育局概覽記錄本地課程以遊戲和全人發展為主", value: "教育局2022/23概覽中由學校提供的資料，以幼兒身心、語言、情意社群、美感和品德發展為課程方向，並提到透過遊戲、活動和生活經驗學習。這是有年份的舊版資料；當屆課程、教學語言與評估方式應以校方最新文件為準。", period: "校方資料年份：2022/23", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/610771c-0001Y.pdf" },
  ] }]),
];
