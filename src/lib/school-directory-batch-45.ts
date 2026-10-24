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
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的資料集版本與更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記資料；本地名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: (school.registryLocations || 0) > 1 ? details : [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 45: verified registry identity and school-published facts. */
export const KINDERGARTEN_BATCH_45: PilotSchool[] = [
  profile("156728", "按教育局校號156728及三聖邨滿漁樓地址識別天后中英文幼稚園（二校），不與大興邨校址的同名學校混為一校。教育局分區名冊列有本校；校方課程資料來自2023/24概覽，故只作有年份的課程說明。", "http://www.rck.edu.hk", [
    { label: "教育局屯門區學校名冊", scope: "核對天后中英文幼稚園（二校）校名、校號及在冊校址；名冊版本截至2026-09-30。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-tm.html" },
    { label: "教育局《幼稚園概覽 2023/24》：校方課程資料", scope: "學校當年提供的課程規劃、語言和活動；不將舊資料當作現行年度班制或收費。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/156728c-0001.pdf" },
    { label: "教育局收費證明書：天后中英文幼稚園（二校）", scope: "證明書所載校址及2024年起生效的歷史收費；本頁不以該數額代表當前學費。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/156728.pdf" },
  ], [{ title: "遊戲探索與多元語言接觸", featured: true, note: "課程描述取自校方提供的2023/24概覽；班制、語言實際課時和最新收費須按當屆資料向校方確認。", details: [
    { label: "校方曾以遊戲學習和高瞻課程組織活動", value: "教育局《幼稚園概覽2023/24》的校方資料提到按幼兒經驗、能力和興趣設計遊戲學習，並列高瞻課程、專題研習、小組討論、探索、反思和實驗。這些安排較著重幼兒參與和表達；材料沒有說明各級每週實施頻率，參觀時可請校方示範一個近期主題如何由遊戲延伸到語文或數概念。", period: "校方提供資料：2023/24學年", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/156728c-0001.pdf" },
    { label: "校方資料列中、英文及普通話活動", value: "同一份校方概覽列出兩文三語、多媒體互動學習及閱讀計劃。這只能說明三種語言都曾出現在校方課程介紹中，不能判斷粵語、普通話或英語哪種是日常主導，也不能替代現行班級課表。若家庭有明確語言目標，應詢問當屆各級的授課語言與教師安排。", period: "校方提供資料：2023/24學年", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/156728c-0001.pdf" },
    { label: "在冊校址與另一所天后中英文幼稚園要分開核對", value: "教育局屯門區名冊及收費證明書均把（二校）列在屯門三聖邨滿漁樓地下11至16號；同名的大興邨校址屬另一登記校號。選校或查交通時，應以校號156728和滿漁樓地址確認，避免把另一校舍的班制或收費套用到本校。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/156728.pdf" },
  ] }]),

  profile("158500", "按教育局校號158500及元朗朗屏邨喜屏樓地址識別；以中華基督教會元朗堂辦學團體名錄交叉核對屬會身份，課程和活動按該校官方網站描述。", "https://www.lpeckk.edu.hk/", [
    { label: "朗屏邨真光幼稚園：官方網站", scope: "校方使命、課程特色、幼兒班活動及2025/26至2026/27校園資訊。", url: "https://www.lpeckk.edu.hk/" },
    { label: "朗屏邨真光幼稚園：校本課程", scope: "生命教育、繪本與戲劇、自由遊戲、身體故事及兩文三語課程。", url: "https://www.lpeckk.edu.hk/?page_id=1015" },
    { label: "中華基督教會元朗堂：轄下單位", scope: "辦學團體所列屬會單位及學校身份交叉核對。", url: "https://ylcccc.org/轄下單位/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址的年度班制、授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585000001" },
  ], [{ title: "繪本生命教育與自由遊戲", featured: true, note: "課程特色為校方自述；教育局年度概覽數據只對應朗屏邨喜屏樓校址。", details: [
    { label: "生命教育以繪本和戲劇情境帶出生活議題", value: "校方課程頁把生命教育分為「我與自己、我與他人、我與大自然、我的生活」等主題，運用繪本故事和戲劇元素引導幼兒表達、想像和理解他人。對重視情緒與社交成長的家庭，值得觀察孩子是否有機會參與角色扮演和分享感受；校方頁面說明的是課程設計，不是成效評估。", sourceUrl: "https://www.lpeckk.edu.hk/?page_id=1015" },
    { label: "自由遊戲與身體故事提供不同的表達入口", value: "校方另列自由遊戲和身體故事課：前者讓幼兒選擇材料、遊戲伙伴和玩法，後者以身體動作探索及表達。這種組合對喜歡動手、動身體表達的幼兒較容易進入；家長可問清各級每週安排及教師如何支持較慢熱的孩子加入活動。", sourceUrl: "https://www.lpeckk.edu.hk/?page_id=1015" },
    { label: "兩文三語是課程方向，不等於英語或普通話沉浸比例", value: "校方課程介紹提到中、英文及普通話的情境化、循序漸進教學，目標是培養基礎語文意識。資料沒有列出各語言每週課時，因此不宜單憑「兩文三語」判斷哪種語言佔主導；若孩子需銜接特定語言環境，應索取當屆課表。", sourceUrl: "https://www.lpeckk.edu.hk/?page_id=1015" },
    { label: "教育局概覽資料對應朗屏邨喜屏樓地下", value: "校方聯絡資料及教育局登記均指向元朗朗屏邨喜屏樓地下。教育局2026/27概覽列粵語為授課語言、師生比例1:8.8，並列半日班免費計劃資料；這些是年度校址資料，不代表沒有英語或普通話活動，也不是個別班級的實際人數。", period: "教育局概覽：2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1585000001" },
  ] }]),

  profile("325198", "以教育局校號325198及油麻地永星里11號救世軍總部地址識別。課程資料以教育局2025/26概覽中的校方申報及2026年2月質素評核報告為主；不引用頁尾校名與陳昆棟幼稚園不一致的課程頁內容。", "https://salvationarmy.org.hk/esd/cktkg/", [
    { label: "教育局《陳昆棟幼稚園質素評核報告》", scope: "教育局於2026年2月視察後記錄的課程實施、學習活動、兒童支援及待改善項目。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf" },
    { label: "教育局《幼稚園概覽 2025/26》：陳昆棟幼稚園", scope: "校號325198、校址0001、課程類別和校方提供的課程規劃；學生人數及師生比例為2024年9月資料。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6821" },
    { label: "救世軍陳昆棟幼稚園：入學申請表", scope: "校名、油麻地地址、電話及表格所列班級申請資訊；不代表學額或取錄機會。", url: "https://salvationarmy.org.hk/esd/cktkg/cms/sites/default/files/web/ApplicationForm_CKTKG.final1_.pdf" },
    { label: "救世軍教育服務：學前教育理念", scope: "辦學團體層面的兒童本位及全人教育價值；不當作本校獨有課堂安排。", url: "https://salvationarmy.org.hk/esd/lckns/mission-and-values.html" },
    { label: "救世軍教育服務單位名錄", scope: "交叉核對陳昆棟幼稚園屬救世軍學前教育服務。", url: "https://salvationarmy.org.hk/esd/hk/" },
  ], [{ title: "專題研習、支援與課程調整", featured: true, note: "以下同時呈現教育局質素評核的肯定與改善建議。報告記錄的是2026年2月視察情況，不等同其後每學年的最新課堂安排。", details: [
    { label: "專題研習由幼兒感興趣的生活題材切入", value: "教育局2026年質素評核記錄，學校近兩年改以專題研習引導幼兒探索生活題材，並透過中國月的麵粉公仔、青花瓷和水墨畫等活動接觸傳統藝術。這讓孩子有動手和感官體驗；教育局同時指出教師帶領探究時仍可增加幼兒主導性。參觀時可留意孩子是否有機會提出問題、選擇材料和講述發現。", period: "教育局質素評核：2026年2月", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf" },
    { label: "日常活動涵蓋音樂、體能、美藝和自選活動", value: "教育局視察報告記錄校方每天安排音樂、體能、美藝及自選活動，課室也設有圖書、扮演和圖工等區角，觀察到幼兒與同伴溝通及操作小肌肉教具。報告亦指出部分區角探索元素仍可加強，部分專題活動中教師直接指導較多。這表示課程有多元活動基礎，但探索深度可能因活動和班級而異。", period: "教育局質素評核：2026年2月", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf" },
    { label: "照顧多樣需要包括安靜角和分層教具", value: "教育局記錄學校增設安靜角、不同層次遊戲和感官支援座椅，部分幼兒會主動到安靜角休息或與同伴交談；報告也指出仍需按兒童學習狀況調整部分任務，並加強支援有特殊需要幼兒融入活動。若孩子較易受刺激或需要額外支援，家長應把個別需要告訴學校，並確認實際支援流程。", period: "教育局質素評核：2026年2月", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf" },
    { label: "課程評估重視持續觀察，中文環境仍可加強", value: "2025/26概覽所載校方資料稱以持續觀察及發展性評估了解幼兒學習；最新評核報告補充，學校已取消評級和平均分，但總結性評估準則仍可更清晰。報告亦指出教師常中英夾雜，非華語幼兒普遍用英語與同伴溝通，學校可進一步建立中文交流信心。若你重視語言銜接，宜直接問清粵語、普通話及英語在不同活動中的使用情境。", period: "教育局概覽：2025/26；質素評核：2026年2月", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SA_ChanKwanTung.pdf" },
  ] }]),

  profile("516309", "按教育局校號516309及油塘高俊苑C座地下識別。保良局屬下幼稚園官方頁確認辦學身份；學校現行介紹頁列出課程、師資配置及新生適應安排。", "https://www.plkkgs.edu.hk/plkfwkckg/", [
    { label: "方王錦全幼稚園：學校簡介與課程", scope: "創校資料、主題課程、探索式語言、科技探知遊戲、正向教育和師資安排。", url: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
    { label: "方王錦全幼稚園：2027/28招生安排", scope: "校方當屆年齡資格、申請步驟及入學前適應安排；不作競爭程度推斷。", url: "https://www.plkkgs.edu.hk/plkfwkckg/hk/custom/custom_page/41" },
    { label: "保良局屬下幼稚園名錄", scope: "校名及辦學團體身份交叉核對。", url: "https://www.plkkgs.edu.hk/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "年度班制、授課語言、師生比例與費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5163090001" },
  ], [{ title: "主題探究、雙語互動與入學適應", featured: true, note: "課程與師資為校方自述；年度班制和費用按教育局概覽的校址及學年閱讀。", details: [
    { label: "主題教學把興趣、生活經驗與探索活動連起來", value: "學校稱按幼兒興趣、能力和生活經驗設計主題活動，並融入探索式和沉浸式語言環境、科技探知遊戲、藝術及區角自主學習。對喜歡動手試和從生活情境學習的孩子，這種課程安排值得實地觀察；家長可請校方舉一個近期主題，了解孩子實際做甚麼，而不是只看展示成果。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
    { label: "校方稱每班設三位老師，至少一位英語專科導師或非華語助教", value: "學校介紹頁列每班三位老師，當中至少一位為英語專科導師或非華語助教，並透過課堂遊戲和日常互動培養語言興趣。這是校方公布的配置原則，不代表每班同時設兩種專職支援；如孩子有特定語言需要，應確認當屆班級實際配置。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
    { label: "入學前英語遊戲班和適應班可讓家庭先看校園節奏", value: "校方稱已報名幼兒可參加免費英語遊戲班，並設入學前適應班；家長亦可在2027/28招生頁核對當屆安排。這些活動提供熟悉校園和教師的機會，但不能據此推斷錄取後每名幼兒的適應速度，宜詢問到校次數、家長是否陪同及日常分離支援。", period: "校方招生資料：2027/28入學", sourceUrl: "https://www.plkkgs.edu.hk/plkfwkckg/hk/custom/custom_page/41" },
    { label: "2026/27概覽班制及語言屬校址年度資料", value: "教育局概覽對應高俊苑C座地下校址列上午、下午和全日班，授課語言欄為粵語，師生比例為1:8.8。語言欄並不等同完全沒有英語接觸；校方另稱有英語專科導師。比例是年度概覽資料，不是本屆每班的實際師生人數。", period: "教育局概覽：2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5163090001" },
  ] }]),

  profile("155705", "按教育局校號155705保留梅窩兩個登記校址：0001南便圍3號、0002鄉事會路72至74號。校方現行課程及NCS支援頁明確列南便圍3號；不把該頁的課程或支援細節無差別套用到另一登記校址。", "https://www.lickhang.edu.hk/", [
    { label: "力行幼稚園：學習／教學模式及活動", scope: "校方現行頁面列出的專題研習、安吉遊戲、瑞吉歐理念、戶外體驗和Messy Play Day。", url: "https://www.lickhang.edu.hk/zh-hant/學習-教學模式及活動/" },
    { label: "力行幼稚園：非華語支援措施", scope: "校方對非華語幼兒粵語支援和教學支援方式的說明；該頁列南便圍3號地址。", url: "https://www.lickhang.edu.hk/zh-hant/非華語支援措施/" },
    { label: "力行幼稚園：校方網站及聯絡", scope: "校方現列的南便圍3號主要聯絡地址與現行課程入口；不能單獨證明另一登記校址當前運作細節。", url: "https://www.lickhang.edu.hk/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "南便圍3號年度班制、語言和師生比例。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1557050001" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0002", scope: "鄉事會路72至74號年度班制、語言和師生比例。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1557050002" },
  ], [{ title: "生活專題、自由遊戲與梅窩校址核對", featured: true, note: "教育局登記有兩個校址；所引課程及非華語支援頁面標示南便圍3號。另一登記地址的現行班級和接收安排應直接向校方確認。", details: [
    { label: "以幼兒興趣和生活經驗展開專題研習", value: "校方稱課程從孩子的興趣和生活經驗出發，透過提問、觀察、討論和動手實驗建構理解。這種專題取向適合願意反覆探索同一問題的幼兒；家長可問老師如何把孩子的問題延伸成活動，以及如何支持較少主動發問的孩子參與。", sourceUrl: "https://www.lickhang.edu.hk/zh-hant/學習-教學模式及活動/" },
    { label: "安吉遊戲與瑞吉歐理念被用於自由探索", value: "校方表示融合安吉遊戲和瑞吉歐理念，在安全環境中讓孩子嘗試、挑戰和合作，並每月舉辦Messy Play Day。對偏好自主活動、感官探索的孩子是值得了解的課程特點；網站描述的是校方安排，家長可確認活動是否分級及每名幼兒實際參與方式。", sourceUrl: "https://www.lickhang.edu.hk/zh-hant/學習-教學模式及活動/" },
    { label: "校方列出非華語幼兒粵語支援", value: "非華語支援頁稱會透過生活和遊戲建立語言學習，並有非華語老師支援幼兒學習粵語。頁面所列主要校址為梅窩南便圍3號；若申請另一登記地址，應先核實支援是否同樣提供、由誰負責及具體安排。", sourceUrl: "https://www.lickhang.edu.hk/zh-hant/非華語支援措施/" },
    { label: "兩個教育局登記校址須分別確認現行開班", value: "教育局名錄列南便圍3號校址0001及鄉事會路72至74號校址0002；校方現行聯絡頁則明確列出南便圍3號。2026/27概覽對校址0002的班制資料不能直接證明校方網站所列活動也在該址進行，報名前宜致電確認兩址各自的開班、接送和收生安排。", period: "教育局登記及概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1557050001" },
  ] }]),

  profile("158496", "以教育局校號158496及荃灣青山公路99至113號登記校址識別，校方網站和聯絡頁對照地址、電話及課程特色。", "https://www.tsuenwanbckg.edu.hk/", [
    { label: "荃灣浸信會幼稚園：課程特色與校本課程", scope: "課程編排、戲劇、自由遊戲、閱讀、基督教教育、肢體活動及戶外體驗。", url: "https://www.tsuenwanbckg.edu.hk/" },
    { label: "荃灣浸信會幼稚園：基督教教育及德育", scope: "校方描述的宗教教育方式與德育活動。", url: "https://www.tsuenwanbckg.edu.hk/我們的課程/校本課程/基督教教育/" },
    { label: "荃灣浸信會幼稚園：閱讀計劃", scope: "繪本選讀、教師共讀及校外閱讀合作例子。", url: "https://www.tsuenwanbckg.edu.hk/我們的課程/校本課程/閱讀計劃/" },
    { label: "荃灣浸信會幼稚園：2025/26中華文化活動", scope: "當年度列出的學生文化體驗活動例子。", url: "https://www.tsuenwanbckg.edu.hk/我們的課程/中華文化校本學習活動/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "年度班制、授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1584960001" },
  ], [{ title: "自由遊戲、閱讀與基督教品格教育", featured: true, note: "課程和活動屬校方自述；2025/26文化活動只作有年份的例子，不代表每年安排相同。", details: [
    { label: "校本課程同時安排自由遊戲、戲劇和肢體活動", value: "校方課程目錄列自由遊戲、戲劇教育和小跳豆肢體協調活動，另外設戶外體驗。這組合把語言表達、身體活動和同伴互動放在不同情境中；家長可參觀時觀察自由遊戲是否有教師引導，以及安靜或慢熱幼兒如何加入。", sourceUrl: "https://www.tsuenwanbckg.edu.hk/" },
    { label: "閱讀計劃讓孩子從選書和共讀建立興趣", value: "學校稱每年選購不同類型圖書，讓幼兒按興趣借書回家，並由教師朗讀、說故事和安排繪本活動。這較著重閱讀經驗與興趣，不應解讀成提早識字要求；家長可詢問借閱頻率、家長參與方式及語言類別。", sourceUrl: "https://www.tsuenwanbckg.edu.hk/我們的課程/校本課程/閱讀計劃/" },
    { label: "基督教教育貫穿早午會和日常教學", value: "校方表示透過崇拜、早午會和日常教學介紹禱告、感恩與關懷，並以聖經故事、話劇等延伸德育主題。若家庭重視宗教氛圍，可了解活動在每週生活中的比重，以及非基督教家庭如何參與。", sourceUrl: "https://www.tsuenwanbckg.edu.hk/我們的課程/校本課程/基督教教育/" },
    { label: "2025/26文化活動包括外出參觀與社區接觸", value: "校方當年度活動頁列出高班探訪長者、中班參觀稻鄉飲食文化博物館、粵劇互動劇場等項目。這些是2025/26公布的活動例子，讓家長看到課程有走出課室的可能；不能推斷每個孩子都參加每項活動，應按年級確認。", period: "校方公布：2025/26學年", sourceUrl: "https://www.tsuenwanbckg.edu.hk/我們的課程/中華文化校本學習活動/" },
  ] }]),

  profile("524123", "按教育局校號524123及東涌富東廣場二樓校址識別。學校現行網頁刊載2027/28招生與新生適應資訊，課程理念取自校方課程頁。", "https://www.gpkg.edu.hk/", [
    { label: "青草地幼稚園：課程介紹", scope: "校方對按幼兒發展設計課程、遊戲教學、普通話和英語拼音活動的說明。", url: "https://www.gpkg.edu.hk/課程介紹/中文/" },
    { label: "青草地幼稚園：2027/28收生簡介", scope: "當屆新生適應活動、面見和申請資訊；不據此推算競爭程度。", url: "https://www.gpkg.edu.hk/收生簡介/" },
    { label: "青草地幼稚園：官方首頁", scope: "東涌地址、聯絡和最近校方公告。", url: "https://www.gpkg.edu.hk/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "年度班制、授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5241230001" },
  ], [{ title: "遊戲學習與漸進式新生適應", featured: true, note: "教育理念、適應活動及招生資料均以校方自述呈現；報名年度和個別班別安排每年可能改動。", details: [
    { label: "課程按幼兒發展、能力和興趣設計", value: "校方表示會因應兒童發展階段、能力、需要及興趣設計活動，並採遊戲教學、普通話和英語拼音活動。這能讓家庭理解課程不是只按單一教材推進；網站沒有列各語言每週節數，若你關心英語或普通話的實際比重，應索取班級課表。", sourceUrl: "https://www.gpkg.edu.hk/課程介紹/中文/" },
    { label: "新生適應分成入學前、開學初和家長溝通", value: "校方2027/28收生頁列新生Playday、開學初適應週及8月新生家長會，讓幼兒預先熟悉校園並讓家庭了解教師與課程。若孩子較慢熱，這類安排值得詢問細節：陪同時間、分離過渡和適應困難時的聯絡方式。", period: "校方公布：2027/28入學安排", sourceUrl: "https://www.gpkg.edu.hk/收生簡介/" },
    { label: "東涌校址和全日班對家庭時間安排有直接影響", value: "教育局登記地址為東涌富東廣場二樓，校方頁面也列出同一地址。教育局2026/27概覽列上午、下午及全日班；實際班別是否在目標年度開辦、校車路線與接送時間仍需向學校確認，尤其要與家庭工作和交通安排一併考慮。", period: "教育局概覽：2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5241230001" },
  ] }]),

  profile("157503", "按教育局校號157503識別美樂中英文幼稚園；校方頁面另列同一花園的美樂幼兒園，兩者分別位於180及181號地下，本頁只用180號幼稚園課程資料。", "https://www.melody.edu.hk/", [
    { label: "美樂中英文幼稚園：校本課程", scope: "自由遊戲、方案教學、環保教育、情緒課程、生命教育及資訊科技。", url: "https://www.melody.edu.hk/校本課程/" },
    { label: "美樂中英文幼稚園：官方網站及校址", scope: "幼稚園180號及幼兒園181號校址、聯絡資料與近期校園資訊。", url: "https://www.melody.edu.hk/" },
    { label: "美樂中英文幼稚園：校園生活", scope: "校方刊載的不同班級和日常校園安排；時段資料無標學年，須以當屆公告確認。", url: "https://www.melody.edu.hk/校園生活/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "年度班制、授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1575030001" },
  ], [{ title: "自由遊戲、方案學習與情緒教育", featured: true, note: "課程為校方自述；同址的美樂幼兒園是不同註冊單位，不能以181號幼兒園資料代替本校。", details: [
    { label: "自由遊戲和方案教學讓幼兒參與設計學習", value: "校方稱課程按學前教育課程指引設計，結合幼兒生活經驗和興趣；自由遊戲讓孩子選玩具、伙伴和玩法，方案教學則由幼兒共同討論主題並尋找答案。對主動探索和表達的孩子，這種安排提供較多參與空間；參觀時可看教師如何把孩子的想法延伸成學習，而非只讓活動停在玩樂。", sourceUrl: "https://www.melody.edu.hk/校本課程/" },
    { label: "高班情緒課程處理溝通、衝突和改變", value: "校方列出高班「比比和朋友」情緒課程，包含情感、溝通、關係、衝突、改變與失去等主題，透過故事和角色扮演練習處理情緒。這是校方公布的高班課程例子；如家庭正關注孩子表達情緒或同伴衝突，可詢問低班是否有相應支援及家校如何配合。", sourceUrl: "https://www.melody.edu.hk/校本課程/" },
    { label: "校方也把環保和生命教育放入日常活動", value: "課程頁提到環保物料創作、分類回收、親子環保活動及親近自然等生命教育內容。這讓幼兒在生活例子中接觸珍惜資源和關懷生命；網頁沒有列活動次數或成果指標，家長可確認各級每年的參與方式。", sourceUrl: "https://www.melody.edu.hk/校本課程/" },
    { label: "180號幼稚園與181號幼兒園須分開看", value: "校方聯絡頁把美樂中英文幼稚園列在美樂花園180號地下，另將美樂幼兒園列在181號地下，兩者電話和服務階段不同。教育局概覽的授課語言為英語、師生比例1:10.1，是校址0001的2026/27年度資料；不能據此推斷各級英語課時或幼兒園班別內容。", period: "教育局概覽：2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=1575030001" },
  ] }]),

  profile("615641", "按教育局校號615641及深水埗蘇屋邨彩雀樓地下識別。學校專屬現行課程頁未能從公開搜尋結果中核實；只引用救世軍學前教育團體理念並清楚標記其機構層級，另用校方表格確認本校地址與申請聯絡資料。", "https://www.salvationarmy.org.hk/esd/sukg/?langcode=zh-hant", [
    { label: "救世軍蘇屋幼稚園：官方入學申請表", scope: "本校名稱、蘇屋邨彩雀樓地址、電話、電郵及學位查詢提示。", url: "https://salvationarmy.org.hk/esd/sukg/cms/sites/default/files/web/admission/入學申請表(中英對照).pdf" },
    { label: "救世軍蘇屋幼稚園：2023/24中華文化活動", scope: "校方曾公布的文化活動例子；只作有年份的歷史資訊，不代表現行年度安排。", url: "https://www.salvationarmy.org.hk/esd/sukg/cms/sites/default/files/web/中華文化校本學習活動%20-%2023.24中國文化月.pdf" },
    { label: "救世軍教育服務：學前教育理念", scope: "辦學團體層面的兒童本位和全人發展價值，不當作蘇屋校舍已核實的個別課堂設計。", url: "https://salvationarmy.org.hk/esd/lckns/mission-and-values.html" },
    { label: "救世軍教育服務單位名錄", scope: "交叉核對蘇屋幼稚園為救世軍學前教育服務單位。", url: "https://salvationarmy.org.hk/esd/hk/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "本校址年度班制、授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6156410001" },
  ], [{ title: "蘇屋校址、救世軍辦學理念與資料邊界", featured: true, note: "校方可核實資料目前集中於身份、聯絡、招生表及過往活動；救世軍理念屬辦學團體自述，不等同本校現行課堂特色。", details: [
    { label: "校方申請文件確認蘇屋邨彩雀樓校址與聯絡方式", value: "蘇屋幼稚園官方申請表列地址為蘇屋邨彩雀樓地下，並提供校方電話和電郵；表格提醒家長報名前可先查詢輪候情況。這有助家庭直接確認申請和交通校址，但不能據此推斷目前空缺或取錄機率。", sourceUrl: "https://salvationarmy.org.hk/esd/sukg/cms/sites/default/files/web/admission/入學申請表(中英對照).pdf" },
    { label: "救世軍學前教育團體理念以兒童本位和全人發展為主", value: "救世軍學前教育服務的理念頁強調按兒童身心發展需要設計學習環境，培養自主、探索、獨立思考和家校夥伴關係。這是辦學團體層級的共同價值，並非蘇屋校舍對每項課堂的具體承諾；參觀時應向校方確認校本課程如何落實。", sourceUrl: "https://salvationarmy.org.hk/esd/lckns/mission-and-values.html" },
    { label: "蘇屋校方曾公布中華文化校本活動", value: "校方公開的2023/24中國文化月材料列出水墨畫欣賞、十字繡體驗、普通話兒歌比賽及新春活動等例子。這能說明學校曾以活動接觸中華文化，但材料年份較早，不能當作2026/27固定課程；家長可詢問今年活動及普通話課堂安排。", period: "校方活動材料：2023/24學年", sourceUrl: "https://www.salvationarmy.org.hk/esd/sukg/cms/sites/default/files/web/中華文化校本學習活動%20-%2023.24中國文化月.pdf" },
    { label: "2026/27概覽列上午、下午及全日班資料", value: "教育局概覽對應彩雀樓校址列上午、下午及全日班，授課語言欄為粵語，師生比例為1:9.6。這些數據屬年度概覽分類，不表示每一級都同時設三種時段，也不能推算每班實際人數；報名前應確認目標級別的當屆班制。", period: "教育局概覽：2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6156410001" },
  ] }]),

  profile("324264", "按教育局校號324264及南昌街1號南昌一號地址識別。校方現行頁面說明多元文化、雙班主任與主題教學；教育局概覽另列本校址的年度班制和比例。", "https://wpk.edu.hk/zh/home/", [
    { label: "西太平洋幼稚園：官方首頁及辦學特色", scope: "創校年份、多元文化、雙班主任、主題教學、品德教育和校址。", url: "https://wpk.edu.hk/zh/home/" },
    { label: "教育局《幼稚園概覽 2026/27》：校址0001", scope: "年度班制、授課語言、師生比例和費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3242640001" },
  ], [{ title: "多元文化、雙班主任與主題學習", featured: true, note: "教師配置、課程方向和支援措施為校方自述；教育局班制與師生比例只對應本校址及指定年度。", details: [
    { label: "校方以不同國籍學生構成多元文化環境", value: "西太平洋幼稚園官方介紹稱學生來自不同國籍，並以社區資源拓展幼兒學習空間。對希望孩子在多元同伴環境中成長的家庭，這是值得實地觀察的定位；頁面沒有公布學生國籍比例，不能由「多元」推算班級構成。", sourceUrl: "https://wpk.edu.hk/zh/home/" },
    { label: "雙班主任由外籍英語教師與本地幼稚園教師共同授課", value: "校方稱採雙班主任制，由外籍英語教師和本地幼稚園教師共同授課。這表示課堂有兩位不同背景的教師參與，並不等於全日英語沉浸或英語佔一半課時；關心語言環境的家庭應再問各級授課語言和兩位教師的日常分工。", sourceUrl: "https://wpk.edu.hk/zh/home/" },
    { label: "主題和全語文教學結合生活經驗", value: "校方列主題教學、全語文教學和設計活動，並稱以孩子生活經驗引導探索、自理和表達。家長可看課堂是否容許幼兒動手和提出問題，也可問教師如何兼顧自由探索與日常規律。", sourceUrl: "https://wpk.edu.hk/zh/home/" },
    { label: "南昌街校址只開上午及下午班", value: "校方網站列本園地址為深水埗南昌街1號南昌一號1樓2號舖，並說明設上午及下午班；教育局2026/27概覽對應登記校址列下午班資料，師生比例1:9.2。校方介紹和概覽班制的表述不同，報讀前應直接核對目標年度各級實際開辦的時段。", period: "教育局概覽：2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3242640001" },
  ] }]),
];
