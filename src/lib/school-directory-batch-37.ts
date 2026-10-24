import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const registered = registeredDirectory as PilotSchool[];

function profile(
  schoolNumber: string,
  year: string,
  note: string,
  website: string,
  extraSources: PilotSchool["sources"],
  details: NonNullable<PilotSchool["detailSections"]>,
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewUrl = school.detailSections
    ?.flatMap((section) => section.details)
    .find((detail) => detail.label === "班制與 PN" && detail.sourceUrl?.includes(`schid=${schoolNumber}`))?.sourceUrl;
  if (!overviewUrl) throw new Error(`EDB Kindergarten Profile missing for ${schoolNumber}`);
  const locationId = overviewUrl.match(/schid=\d{6}(\d{4})/)?.[1];
  if (!locationId) throw new Error(`EDB location id missing for ${schoolNumber}`);
  const overviewDetails = school.detailSections
    ?.find((section) => section.title.startsWith("幼稚園概覽"))?.details ?? [];
  const publishedOverviewDetails = overviewDetails
    .filter((detail) => detail.label === "班制與 PN" || detail.label === "授課語言" || detail.label === "師生比例" || detail.label === "學費")
    .map((detail) => ({ label: detail.label, value: detail.value, period: "教育局幼稚園概覽2026/27", sourceUrl: detail.sourceUrl }));
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》", scope: `校號${schoolNumber}、校址、學校類別、地址及聯絡資料；位置資料截至2026-09-30。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information" },
    { label: "教育局《幼稚園概覽2026/27》", scope: `按校址${locationId}查閱班制、授課語言、師生比例及學費；概覽數字不代表現屆實際招生名額。`, url: overviewUrl },
    { label: "教育局《學校基本註冊資料》", scope: "非政府學校每日更新的登記狀態及校址識別資料；政府學校不在此檔案內。", url: EDB_REGISTRY },
    ...extraSources,
  ];
  return {
    ...school,
    dataYear: year,
    sourceNote: note,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    website,
    sources: [...new Map(sources.map((source) => [source.url, source])).values()],
    detailSections: [
      ...details,
      {
        title: "班制與師生比例",
        note: "以下為教育局《幼稚園概覽2026/27》按本校址列出的資料；師生比例不是每班實際人數，PN未列亦不等同確認沒有PN班。",
        details: publishedOverviewDetails,
      },
    ],
  };
}

/** Kindergarten profile batch 37: ten unique, currently registered schools with one EDB location. */
export const KINDERGARTEN_BATCH_37: PilotSchool[] = [
  profile("552739", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方分校與班制：2026/27", "按校號552739及皇后大道西登記校址識別。西營盤分校校方頁列中文班與英語雙語班、全日班和上課時間；PN頁面指向土瓜灣幼兒中心，不把PN服務寫成西營盤校舍開辦。", "https://sunisland.edu.hk/zh/我們的分校/西營盤分校/", [
    { label: "太陽島英文幼稚園：西營盤分校", scope: "分校地址、中文班與雙語班語言描述、2026/27班制及PN服務地點。", url: "https://sunisland.edu.hk/zh/我們的分校/西營盤分校/" },
    { label: "太陽島：報名程序", scope: "校方對2027/28統一註冊及候補安排的說明；各分校實際空缺須另行查詢。", url: "https://sunisland.edu.hk/zh/報名程序/" },
  ], [{ title: "語言班別與校址選擇", featured: true, note: "分校頁把中文班與雙語班分開描述；語言接觸不等同各科授課比例。", details: [
    { label: "中文班與雙語班的語言安排不同", value: "校方表示中文班以廣東話為主要教學語言，雙語班則以英語教學。若家庭以英語環境為主要考慮，報名前應確認申請的是哪一班、當屆是否開班，以及日常活動中各語言的使用方式。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/西營盤分校/" },
    { label: "全日服務與PN須分校址核對", value: "校方分校頁列西營盤上午、下午及全日班時段，並說明PN可報讀土瓜灣幼兒中心。這表示家長要分開計算西營盤K1至K3的接送與另一校址PN服務；不要因同屬一個辦學團體而假設PN就在西營盤。", period: "校方2026/27班制資料", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/西營盤分校/" },
    { label: "先確認目標班別當屆開辦情況", value: "校方提醒最新開班詳情須向分校查詢。分校頁列出的班別和時間可作初步規劃，但不能據此判斷尚有學額；遞交申請前宜同時確認語言班、全日班和校車路線是否適用於孩子的入學年度。", sourceUrl: "https://sunisland.edu.hk/zh/我們的分校/西營盤分校/" },
  ] }]),

  profile("157406", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方招生頁含2026/27程序", "按校號157406及上水彩園邨登記校址識別。教育局概覽中的校方自述提到遊戲、多元教材、英語及普通話活動；校方申請頁仍可見2026/27程序，因此不把舊招生日期當作下一屆安排。", "https://sskg.ppe.rhenish.org/", [
    { label: "上水禮賢會幼稚園：學校網站", scope: "校方校址、課程入口、教學特色及入學資訊。", url: "https://sskg.ppe.rhenish.org/" },
    { label: "上水禮賢會幼稚園：教育局概覽2025/26", scope: "校方自述的課程指引、遊戲學習、兩文三語和體能活動；屬該概覽年度。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6278" },
    { label: "上水禮賢會幼稚園：入學程序", scope: "校方頁列2026/27申請程序與收生準則；該招生周期已過。", url: "https://sskg.ppe.rhenish.org/en/application-information/" },
  ], [{ title: "遊戲學習與日常支援", featured: true, note: "課程特色取自教育局概覽內校方自述，申請頁日期按招生年度理解。", details: [
    { label: "校方自述不要求幼兒班機械式抄寫操練", value: "教育局2025/26概覽所載校方資料表示，課程依幼稚園課程指引規劃，不要求幼兒班執筆抄寫或做操練式計算，並以多元教材和遊戲培養主動學習。這對希望孩子先建立學習興趣的家庭有參考價值；若家長期待大量紙筆練習，應先了解校方對幼小銜接的做法。", period: "教育局概覽2025/26；校方自述", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6278" },
    { label: "課程包括英語、普通話和體能活動", value: "概覽描述外語老師帶領英語及普通話活動，並由體適能導師設計活動，另有宗教課程及週會。這些資料說明校方公布的課程構成，並沒有提供各語言每週時數；重視語言比例的家庭應索取當屆時間表。", period: "教育局概覽2025/26；校方自述", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6278" },
    { label: "招生日期須等候新一屆更新", value: "校方現可讀取的申請頁列出2026/27收生安排，相關日期已過。頁面也提到兄姊及家庭需要等考慮因素；這些只適用於該屆公告，家長應直接向校方確認2027/28是否沿用相同程序。", period: "2026/27招生頁；歷史資料", sourceUrl: "https://sskg.ppe.rhenish.org/en/application-information/" },
  ] }]),

  profile("216135", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與招生：2027/28", "按校號216135及杏花邨登記校址識別。校方課程頁列小組教學、每日英語活動、普通話、自由遊戲和音體活動；招生頁已公布2027/28流程，不能把申請資格或面見安排解讀為取錄保證。", "https://www.scholarskg.edu.hk/", [
    { label: "宣道會上書房中英文幼稚園：課程理念與編排", scope: "小組教學、語言活動、自由遊戲、音體活動及校方教育理念。", url: "https://www.scholarskg.edu.hk/course/" },
    { label: "宣道會上書房中英文幼稚園：2027/28入學查詢", scope: "校方公布的申請年級、面見、收生準則及註冊安排。", url: "https://www.scholarskg.edu.hk/query/" },
  ], [{ title: "小組教學與多語接觸", featured: true, note: "英語與普通話均有活動，但公開資料沒有列出每日各語言完整課時。", details: [
    { label: "小組教學與操作活動是課程重點", value: "校方表示透過小組教學掌握幼兒進度，並安排操作活動、每日自由遊戲和活動後分享。這種節奏給幼兒練習表達和同伴互動的空間；家長可觀課時留意分享是否由孩子主導，以及教師如何照顧不同步調。", sourceUrl: "https://www.scholarskg.edu.hk/course/" },
    { label: "中文與英文教師分任班主任，另有普通話活動", value: "校方課程頁表示上午、下午班各由中文及英文教師擔任班主任，另以兒歌、音樂和遊戲進行普通話教學。這提供多語接觸，但不等同每一科均以英語授課；家長應按班別確認日常語言使用與活動時數。", sourceUrl: "https://www.scholarskg.edu.hk/course/" },
    { label: "2027/28面見讓家長陪同", value: "校方招生頁表示2027/28申請者會獲安排個別或小組面見，家長可陪同，並可選擇粵語、英語或普通話面見。校方列有兄姊就讀／畢業等優先因素，同時明言學位有限；提交申請不代表獲取錄。", period: "2027/28招生公告；查閱於2026-10", sourceUrl: "https://www.scholarskg.edu.hk/query/" },
  ] }]),

  profile("216259", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方網站與教育局質素評核：2025-2026", "按校號216259及慈安苑登記校址識別。學校官方頁目前可讀取的招生資訊仍以2026/27為主；教育局2025年完成質素評核。本頁不沿用過期申請日期，也不把評核結果當作排名。", "https://ssack.edu.hk/", [
    { label: "基督教信生會信生中英文幼稚園：官方網站", scope: "學校名稱、登記地址、聯絡方式及校方發布的招生消息。", url: "https://ssack.edu.hk/" },
    { label: "信生中英文幼稚園：教育局質素評核報告", scope: "教育局於2025年5月26、27及29日進行評核的報告；內容用於了解質素評核觀察，不轉換為分數或排名。", url: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShunSang_AC.pdf" },
    { label: "信生中英文幼稚園：2026/27收費證明書", scope: "教育局核准收費文件；費用只適用文件列明的生效年度。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/216259.pdf" },
  ], [{ title: "學校現況與資料邊界", featured: true, note: "校方網站更新較少，故本頁只呈現可確認的登記、概覽與評核資料。", details: [
    { label: "教育局概覽列出校址層面的班制與師生比例", value: "2026/27概覽按慈安苑校址列出上午、下午班及師生比例。比例是時段層面的師生資料，不代表每班實際人數，也不能單獨作為教學質素評價；若家庭需要全日照顧，應先確認本校當屆是否有相關班別。", period: "教育局概覽2026/27", sourceUrl: overviewUrlFor("216259") },
    { label: "網站上的招生消息仍屬上一年度", value: "校方網站目前可讀取的招生消息標示2026/27年度，申請日期不應套用到2027/28。家長宜致電學校詢問新一屆開放申請時間、班別和面見安排；在未有新公告前，不推斷收生難度。", period: "校方網站查閱於2026-10；最新可見消息為2026/27", sourceUrl: "https://ssack.edu.hk/" },
    { label: "教育局評核報告應看觀察內容而非單一結果", value: "教育局於2025年完成質素評核並公開報告。家長可閱讀學與教、管理及兒童支援等具體觀察，再把關注點帶到參觀或面談；「通過評核」不是官方排名，也不能替代家庭對課程、交通和照顧安排的判斷。", period: "教育局質素評核；2025-05", sourceUrl: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ShunSang_AC.pdf" },
  ] }]),

  profile("325651", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方IB、語言政策與招生：2027/28", "按校號325651及興發街登記校址識別，只介紹銅鑼灣維多利亞國際幼稚園，不混同同址的銅鑼灣維多利亞幼稚園及國際幼兒園其他校號。校方公布IB PYP、探究式課程及2027/28 PN招生；K1對外招生安排有限，須按校方公告理解。", "https://www.cbvictoria.edu.hk/tc/", [
    { label: "銅鑼灣維多利亞：IB課程", scope: "校方對IB PYP、探究式學習和雙語／三語環境的介紹。", url: "https://www.cbvictoria.edu.hk/tc/ib/" },
    { label: "銅鑼灣維多利亞：學校一瞥", scope: "校方列出的校名、校號、登記地址、創校資料、班制及學制入口；多個校號需與本頁校號325651區分。", url: "https://www.cbvictoria.edu.hk/tc/quick_facts/" },
    { label: "銅鑼灣維多利亞：2027/28 PN招生", scope: "校方公布PN報名日期、面見及K1對外招生限制。", url: "https://www.cbvictoria.edu.hk/tc/pn_application/" },
  ], [{ title: "IB探究式學習與語言班別", featured: true, note: "校方課程介紹涵蓋同址不同註冊校號；本頁僅採用與325651國際幼稚園相符的課程和招生說明。", details: [
    { label: "IB PYP以探究活動組織學習", value: "校方稱課程以IB小學項目為基礎，由幼兒提問、蒐集和整理資料，教師擔任引導角色。對喜歡探索、表達和合作的孩子，這種學習方式可能更合拍；家長應觀察教師如何為孩子搭架，而不是只看活動名稱是否新穎。", sourceUrl: "https://www.cbvictoria.edu.hk/tc/ib/" },
    { label: "語言安排因班別而異", value: "校方公布不同班別的語言政策，涵蓋英語、粵語和普通話組合；家長可按孩子現有語言和家庭升學方向比較，而不要把「兩文三語」視作每班、每科相同的授課比例。", sourceUrl: "https://www.cbvictoria.edu.hk/uploaded_files/page/35/Stream%20TC%2022-23.pdf" },
    { label: "2027/28先有PN公開招生，K1另按校方安排", value: "校方2026年9月公布2027/28 PN申請，並明言因在讀PN學生升讀K1，K1對外學位有限、沒有公開招生。這對希望由PN連讀的家庭更關鍵；如直接申請K1，須按校方指定登記方式詢問空缺，不把PN面試當作K1錄取承諾。", period: "2027/28招生；校方公告2026-09-14", sourceUrl: "https://www.cbvictoria.edu.hk/tc/pn_application/" },
  ] }]),

  profile("609641", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；迦南集團課程與招生：2027/28", "按校號609641及景峰花園登記校址識別。校方有景峰花園分校入口和集團課程資料，近期活動頁反映遊戲、繪本、感官探索與語言活動；集團共用課程不等同此校舍每週課時表。", "https://www.cannan.edu.hk/", [
    { label: "迦南幼稚園：景峰花園分校入口", scope: "校方分校名錄與景峰花園分校資訊入口；地址以教育局登記資料配對。", url: "https://www.cannan.edu.hk/campuses/" },
    { label: "迦南幼稚園：辦學理念與課程目標", scope: "校方集團的遊戲學習、全人發展、雙語及兒童本位課程方向。", url: "https://www.cannan.edu.hk/about" },
    { label: "迦南幼稚園：2027/28招生及近期活動", scope: "校方首頁公布的新生申請入口及近期學習活動；不把其他分校安排套用至景峰花園。", url: "https://www.cannan.edu.hk/" },
  ], [{ title: "遊戲、感官探索與語言表達", featured: true, note: "校方課程方向為集團層面；景峰花園個別班別和課時仍須向校舍確認。", details: [
    { label: "校方課程以遊戲和感官探索培養主動學習", value: "迦南的辦學目標提到遊戲學習、思考與解難、感官探索和全人發展；近期活動包括泡泡探索、繪本互動和體能遊戲。這些例子能讓家長看到課程如何落到活動，但活動紀錄不能證明每級固定課時或每年必然重複。", sourceUrl: "https://www.cannan.edu.hk/about" },
    { label: "英語及普通話活動要看分校實際安排", value: "校方近期頁面有英語律動、普通話繪本和主題教學活動，顯示語言接觸與遊戲探索並行。網站沒有列景峰花園各級逐科時數；若家庭重視英語或普通話比例，應在參觀時索取當屆作息表。", sourceUrl: "https://www.cannan.edu.hk/" },
    { label: "2027/28申請按目標分校核對", value: "校方首頁列有2027/28新生申請入口，集團名錄包含多個校舍。家長提交前要確認景峰花園可申請年級、班制、面見地點和交通；不可把其他分校的PN、費用或空缺資料併入本校。", period: "2027/28招生入口；查閱於2026-10", sourceUrl: "https://www.cannan.edu.hk/campuses/" },
  ] }]),

  profile("525758", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；辦學團體課程資料：網站查閱於2026-10", "按校號525758及廣明苑登記校址識別。嗇色園官方單位頁提供可正幼稚園的辦學與課程介紹，包括兒童本位、戶外學習、英語及普通話專科教師；本頁不把辦學團體的其他校舍資料合併。", "https://www.hochingkg.edu.hk/", [
    { label: "嗇色園：可正幼稚園官方介紹", scope: "校址、電話、創校年份、辦學理念、課程、語言活動及家校合作。", url: "https://www2.siksikyuen.org.hk/education-services/kindergartens-and-child-care-centres/ho-ching" },
    { label: "可正幼稚園：校方首頁", scope: "校方網站入口及與嗇色園官方介紹相連的校務資訊。", url: "https://www.hochingkg.edu.hk/" },
    { label: "嗇色園：可正幼稚園戶外體驗報道", scope: "校方公布的校外學習例子及其課程目的；案例不等同每週固定安排。", url: "https://www2.siksikyuen.org.hk/religious-affairs/news/content/2022/08/19/16364096-0838-4827-8e5e-c6233d6abedf" },
  ], [{ title: "兒童本位與戶外探索", featured: true, note: "辦學團體官方頁明確對應可正幼稚園及廣明苑校址；活動例子不推作固定課時。", details: [
    { label: "生活化主題鼓勵幼兒提問和求證", value: "嗇色園官方介紹表示，課程以兒童為中心，透過生活主題、多元活動和戶外學習，引導幼兒思考、探索和解難。這種方向適合重視操作與真實經驗的家庭；可正是否每級都有相同外出安排，仍要按當屆課程向校方查問。", sourceUrl: "https://www2.siksikyuen.org.hk/education-services/kindergartens-and-child-care-centres/ho-ching" },
    { label: "英語及普通話有專科教師支援", value: "校方列出英語及普通話專科教師和閱讀計劃，說明學校提供相關語言接觸，但未公布各語言每週課時。若家庭希望強化其中一種語言，建議在參觀時確認班別安排及回家延伸方式。", sourceUrl: "https://www2.siksikyuen.org.hk/education-services/kindergartens-and-child-care-centres/ho-ching" },
    { label: "戶外課程要連同交通與天氣安排評估", value: "辦學團體曾記錄幼兒走出課室參觀和延伸學習，活動後由老師協助整理經驗。家長可詢問校外活動頻率、交通安排、家長參與要求和惡劣天氣替代方案，從而判斷這種教學對家庭接送與時間安排的實際影響。", sourceUrl: "https://www2.siksikyuen.org.hk/religious-affairs/news/content/2022/08/19/16364096-0838-4827-8e5e-c6233d6abedf" },
  ] }]),

  profile("158321", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與申請：官方網站查閱於2026-10", "按校號158321及元朗八鄉元崗村登記校址識別。校方網站介紹主題教學、蒙特梭利操作、混齡互動及中華文化活動；入學頁稱全年接受申請但未標明年度，實際招生年級須電話確認。", "https://sites.google.com/view/yuenkongkg/", [
    { label: "元岡幼稚園：宗旨和理念", scope: "校方自述的主題課程、蒙特梭利教學及混齡學習。", url: "https://sites.google.com/view/yuenkongkg/首頁/關於我們about-us/宗旨和理念-aim-and-goal" },
    { label: "元岡幼稚園：中華文化及藝術教育", scope: "校方公布的2025/26中華文化、藝術及社區探索活動例子。", url: "https://sites.google.com/view/yuenkongkg/首頁/關於我們about-us/中華文化及藝術教育-chinese-culture-and-art-education-activities" },
    { label: "元岡幼稚園：報名程序", scope: "校方申請方式及全年接受申請的網頁說明；頁面未標明適用年度，須向校方確認。", url: "https://sites.google.com/view/yuenkongkg/首頁/報名詳情details-of-application/報名程序application-procedure" },
  ], [{ title: "混齡探索與鄉郊社區經驗", featured: true, note: "混齡、蒙特梭利與文化活動均為校方自述；活動案例按校方標示年度理解。", details: [
    { label: "主題教學結合蒙特梭利操作與混齡互動", value: "校方表示以主題和螺旋式課程循序學習，使用蒙特梭利教學法鼓勵探索，並安排混齡教學促進互動。對需要較多動手和同伴觀察機會的孩子，這種環境值得參觀；家長應確認不同年齡如何分組、教師如何照顧能力差異。", sourceUrl: "https://sites.google.com/view/yuenkongkg/首頁/關於我們about-us/宗旨和理念-aim-and-goal" },
    { label: "社區與文化活動把學習帶出校園", value: "校方公開2025/26活動例子，包括認識錦田社區、傳統文化和藝術創作。這些紀錄顯示課程會使用周邊環境作學習材料，但不是每名幼兒每年固定參加相同活動的保證；可向校方了解外出安排和安全流程。", period: "校方2025/26活動紀錄", sourceUrl: "https://sites.google.com/view/yuenkongkg/首頁/關於我們about-us/中華文化及藝術教育-chinese-culture-and-art-education-activities" },
    { label: "全年申請不等於全年均有學位", value: "校方報名頁稱全年接受申請，並列親身或郵寄交表方式，但未在頁面標註適用年度或各級空缺。遞表前應確認目標入學年度、班別和面見安排；元崗村校址亦應納入家庭的校車或日常接送計劃。", sourceUrl: "https://sites.google.com/view/yuenkongkg/首頁/報名詳情details-of-application/報名程序application-procedure" },
  ] }]),

  profile("575429", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程依據：2022/23年度報告", "按校號575429及上水清河邨登記校址識別。青年會上水幼稚園官方網站可核對校址、辦學宗旨及教學理念；目前可取得的詳細學校報告為2022/23，故只作有年份的校方自述，不推作現屆師資或學生人數。", "https://www.sscymca.edu.hk/", [
    { label: "中華基督教青年會上水幼稚園：教學理念與校務", scope: "校方介紹辦學宗旨、教學理念和聯絡資料。", url: "https://www.sscymca.edu.hk/" },
    { label: "中華基督教青年會上水幼稚園：2022/23學校報告", scope: "當年度課程實施、班級及教職員資料；所有人數只按報告所標年度引用。", url: "https://www.sscymca.edu.hk/wp-content/uploads/2023/11/22-23%E5%AD%B8%E5%B9%B4-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    { label: "香港中華基督教青年會：學校及教育服務", scope: "辦學團體名錄核對上水幼稚園校址、電話及校網入口。", url: "https://ymca.org.hk/service/school/" },
  ], [{ title: "全人教育與遊戲活動", featured: true, note: "課程深度資料來自校方2022/23年度報告；不把當年人手及班額視作現況。", details: [
    { label: "校方以靈、智、體三方面說明辦學方向", value: "2022/23學校報告將辦學理念分為靈育、智育和體育，並表示參考教育局六大發展範疇，以遊戲及設計活動提供學習經驗。這有助家長了解青年會辦學取向；報告年份較早，應參觀核實目前課程和校園生活是否仍按相同方式實施。", period: "校方學校報告2022/23", sourceUrl: "https://www.sscymca.edu.hk/wp-content/uploads/2023/11/22-23%E5%AD%B8%E5%B9%B4-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    { label: "報告中的班級及教職員數字不可當成現屆規模", value: "2022/23報告記錄當年班級、學生和人手配置，只能解讀為該年度快照，不宜直接用來估計2026/27班額或師生安排。教育局2026/27概覽的師生比例也不是每班實際人數；如照顧比例是關鍵條件，應向校方索取最新編班資料。", period: "學校報告2022/23；概覽2026/27", sourceUrl: "https://www.sscymca.edu.hk/wp-content/uploads/2023/11/22-23%E5%AD%B8%E5%B9%B4-%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    { label: "招生安排應以新一屆頁面或校方回覆為準", value: "官方網站目前可讀到的完整K1流程主要是2026/27年度資料，已不適用於下一招生周期。家庭可先用網站核對半日、全日班申請方向，再致電確認2027/28日期、面見方式、非華語支援和學位狀況。", period: "校方招生頁查閱於2026-10；最新完整程序為2026/27", sourceUrl: "https://www.sscymca.edu.hk/?page_id=721" },
  ] }]),

  profile("155233", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與招生：網站查閱於2026-10", "按校號155233及大澳永安街登記校址識別。校方公開繪本、遊戲、樂高、英語及普通話等課程入口，並有2027/28校車服務資料；招生頁部分費用資訊仍標示2025/26，故不作現行費用依據。", "https://www.cmataiokg.com/", [
    { label: "基督教宣道會大澳幼稚園：課程特色與校方消息", scope: "校方列出的繪本、遊戲、樂高、英語、普通話及宗教德育課程入口。", url: "https://www.cmataiokg.com/" },
    { label: "基督教宣道會大澳幼稚園：入學申請", scope: "校方招生資訊；頁內部分學費資料標示2025/26，不能當作當屆核准費用。", url: "https://www.cmataiokg.com/en/admission/" },
    { label: "基督教宣道會大澳幼稚園：校方歷史", scope: "校方自述的辦學背景及學校歷史。", url: "https://www.cmataiokg.com/en/school-history/" },
  ], [{ title: "繪本、遊戲與社區環境", featured: true, note: "課程項目取自校方網站；活動欄目不代表每週固定課時。", details: [
    { label: "繪本、遊戲與樂高活動提供不同學習入口", value: "校方把繪本教學、遊戲活動、樂高課程和英語／普通話列為課程特色。這讓家庭看到孩子可能透過故事、操作和語言活動接觸學習；網站沒有列明各項活動的固定頻率，參觀時可問清楚平日課堂和延伸活動的比例。", sourceUrl: "https://www.cmataiokg.com/" },
    { label: "大澳校址的交通要先做日常測試", value: "教育局登記校址位於大澳永安街，校方公布2027/28學年提供校車服務。家庭應確認校車服務範圍、車程和候車安排，也要評估沒有校車時的接送備案；偏遠校址的通勤可行性是選校成本的一部分。", period: "校方2027/28校車公告；查閱於2026-10", sourceUrl: "https://www.cmataiokg.com/en/admission/" },
    { label: "招生和收費資料按年度拆開核對", value: "校方招生頁可讀到歷屆註冊與收費說明，其中部分費用明確標示2025/26，不能當作現行費用。申請前應向校方索取2027/28班制、全日班收費和代辦項目清單；教育局概覽中的師生比例也不是每班人數。", period: "校方招生頁含2025/26費用資料", sourceUrl: "https://www.cmataiokg.com/en/admission/" },
  ] }]),
];

function overviewUrlFor(schoolNumber: string): string {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  const url = school?.detailSections
    ?.flatMap((section) => section.details)
    .find((detail) => detail.label === "班制與 PN" && detail.sourceUrl?.includes(`schid=${schoolNumber}`))?.sourceUrl;
  if (!url) throw new Error(`EDB Kindergarten Profile missing for ${schoolNumber}`);
  return url;
}
