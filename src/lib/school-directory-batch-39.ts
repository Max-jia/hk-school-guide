import type { PilotSchool } from "./school-directory-pilot";
import registeredDirectory from "@/content/all-registered-school-directory.json";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRY = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";
const DATASET = "https://data.gov.hk/tc-data/dataset/hk-edb-schinfo-school-location-and-information";
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
    .filter((detail) => ["班制與 PN", "授課語言", "師生比例", "學費"].includes(detail.label))
    .map((detail) => ({ label: detail.label, value: detail.value, period: "教育局幼稚園概覽2026/27", sourceUrl: detail.sourceUrl }));
  const sources: PilotSchool["sources"] = [
    { label: "教育局《學校位置及資料》", scope: `校號${schoolNumber}、校址、學校類別、地址及聯絡資料；位置資料截至2026-09-30。`, url: EDB_LOCATION },
    { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局位置資料集的版本及更新背景。", url: DATASET },
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

/** Kindergarten profile batch 39: ten unique registered schools matched to their EDB kindergarten location. */
export const KINDERGARTEN_BATCH_39: PilotSchool[] = [
  profile("539155", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程及招生：2026/27", "按校號539155及西貢惠民路登記校址識別。香港學堂國際學校以Pre-K及Kindergarten稱幼兒階段，校方年齡對照表才把Pre-K對應本地K1/K2、Kindergarten對應本地K3；不按名稱自行換算。", "https://hkacademy.edu.hk/", [
    { label: "香港學堂國際學校：Early Childhood", scope: "幼兒階段課程及校方描述的遊戲、探究和發展取向。", url: "https://hkacademy.edu.hk/early-childhood/" },
    { label: "香港學堂國際學校：年級對照與申請", scope: "各年齡年級對照、全年申請和學位有空時安排評估的條件。", url: "https://hkacademy.edu.hk/application-process/" },
    { label: "香港學堂國際學校：2026/27費用", scope: "Pre-K1–Pre-K2及Kindergarten分組學費、申請費和入學費；不可與本地半日班資助後學費直接相比。", url: "https://hkacademy.edu.hk/school-fees/" },
  ], [{ title: "探究式幼兒課程與年級對照", featured: true, note: "以下課程和入學內容是校方自述；學費分組按校方國際學制列示，不把教育局班制數字解讀為招生名額。", details: [
    { label: "Pre-K以遊戲和探究組織幼兒學習", value: "校方把Early Childhood課程描述為以遊戲、探究和適齡發展為主。這類安排較重視孩子如何提出問題、與同伴合作和表達發現；參觀時可請校方展示觀察紀錄或學習作品，了解教師如何由遊戲判斷下一步學習需要。", sourceUrl: "https://hkacademy.edu.hk/early-childhood/" },
    { label: "Pre-K與本地K級的對應以校方年齡表為準", value: "校方年級表按8月31日年齡列明：3歲Pre-K對應本地K1、4歲Pre-K對應K2、5歲Kindergarten對應K3。若孩子在入學年度接近生日界線，應讓招生處按出生日期確認，而不要只用班名比較。", sourceUrl: "https://hkacademy.edu.hk/application-process/" },
    { label: "全年收申請仍受年級空位限制", value: "校方接受全年申請，但新生是在有學位時安排入學評估；2027/28招生頁稱申請多於可提供學位。對家庭而言，全年可遞表不等於全年有位，應同步安排可負擔的備選校及通勤方案。", period: "校方招生頁查閱於2026-10", sourceUrl: "https://hkacademy.edu.hk/admissions/" },
    { label: "2026/27學費需連同入學和其他費用看", value: "校方列Pre-K1至Pre-K2年學費HK$119,000，Kindergarten至G5為HK$229,500；另有一次性申請費及入學費，校車、校服和膳食等不包含在學費內。這是兩組不同校方年級的收費，家庭應先確認孩子申請級別及當屆費用表。", period: "2026/27學年；港幣", sourceUrl: "https://hkacademy.edu.hk/school-fees/" },
  ] }]),

  profile("325848", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與招生：網站查閱於2026-10", "按校號325848及跑馬地成和道81號登記校址識別。校方稱以日本幼稚園教育要領為基礎、日語為保育語言，並按日本學年運作；教育局概覽語言欄另列英語，兩者口徑不同，家長應向校方確認班內實際使用語言。", "https://www.teikyo.edu.hk/", [
    { label: "帝京香港幼稚園：園舍與課程", scope: "日本學年、日語保育、日本幼稚園教育要領、年齡和課程安排。", url: "https://www.teikyo.edu.hk/schooloutline.html" },
    { label: "帝京香港幼稚園：入園資訊", scope: "日語保育時段、一般班及短期班的校方說明。", url: "https://www.teikyo.edu.hk/entrance.html" },
    { label: "帝京香港幼稚園：一般班入園程序", scope: "參觀、交表、面談和學位空缺條件；不把未標年度的頁面視為新年度保證。", url: "https://www.teikyo.edu.hk/regularclass.html" },
  ], [{ title: "日本學年與日語保育", featured: true, note: "官方校方網頁稱以日語保育；教育局概覽2026/27授課語言欄列英語，公開資料存在差異，以下保留兩方口徑。", details: [
    { label: "校方以日本幼稚園教育要領安排日常保育", value: "校方介紹以日本文部科學省幼稚園教育要領為基礎，按健康、人際關係、環境、語言和表達五範疇編排課程，學年由4月開始。對家庭來說，這會影響入學月份、年級節奏及日後回日就學的銜接；報名前要按出生年月與校方確認班級。", sourceUrl: "https://www.teikyo.edu.hk/schooloutline.html" },
    { label: "主要保育語言的官方資料有差異", value: "校方入園頁明言平日以日語保育；教育局《幼稚園概覽2026/27》同校址語言欄則列英語。兩者可能採用不同資料口徑，現有頁面不足以判定各活動、科目或整日語言比例。若家長重視日語沉浸或英語接觸，應索取當屆時間表並向校方確認。", period: "教育局概覽：2026/27；校方頁查閱：2026-10", sourceUrl: "https://www.teikyo.edu.hk/entrance.html" },
    { label: "入園前須先參觀並由校方確認空位", value: "校方一般班程序列先預約參觀，確定有意入讀後再提交申請，之後安排面談；校方Q&A說明如班級有空位可中途入園。這是流程描述，不代表當前有位或必然獲取錄；家庭宜先問清當屆名額、校車範圍和年度收費。", sourceUrl: "https://www.teikyo.edu.hk/regularclass.html" },
  ] }]),

  profile("590800", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方Early Years及2026/27學費", "按校號590800及屯門青盈路38號登記校址識別，介紹哈羅香港國際學校Gold Coast校址的Early Years，不與九龍城道的Harrow Little Lions幼稚園校址混為一校。校方說明Nursery／Reception採EYFS，並在Gold Coast保留幼兒班。", "https://www.harrowhongkong.hk/his/", [
    { label: "哈羅香港國際學校：常見問題", scope: "Early Years課程、授課語言、校日及Gold Coast幼兒服務的校方說明。", url: "https://www.harrowhongkong.hk/his/theschool/faqs/" },
    { label: "Harrow Little Lions：Gold Coast幼兒服務說明", scope: "校方說明Gold Coast仍提供Nursery和Reception班；僅用作確認服務與校址區分。", url: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
    { label: "哈羅香港國際學校：2026/27學費", scope: "Nursery及Reception學費及學年；不涵蓋其他非學費支出。", url: "https://www.harrowhongkong.hk/his/admissions/fees/" },
  ], [{ title: "屯門校址的英式Early Years", featured: true, note: "只採用屯門青盈路Gold Coast校址的Early Years資訊；九龍城Harrow Little Lions是另一幼稚園地址，不將其學費或課室數據套用於本頁。", details: [
    { label: "Nursery與Reception採英國EYFS課程", value: "校方把Early Years分為Nursery及Reception，並稱課程依英格蘭及威爾斯的Early Years Foundation Stage。這類英式學前階段與本地K級名稱並非一對一同名；家庭應依出生日期和校方年齡指引確認申請級別。", sourceUrl: "https://www.harrowhongkong.hk/his/theschool/faqs/" },
    { label: "英語是校方所稱的共通課堂語言", value: "校方表示英語是課堂、遊樂場及寄宿舍的共通語言。若孩子尚未熟悉英語，家長應詢問幼兒階段的語言支援、入學評估方式和孩子日常適應安排；網站沒有提供每週語言課時比例。", sourceUrl: "https://www.harrowhongkong.hk/his/theschool/faqs/" },
    { label: "先核對屯門Gold Coast與九龍城校址", value: "校方資料指出Gold Coast保留Nursery及Reception班；Harrow Little Lions則在九龍城道另設幼稚園。兩個登記校址的年齡、班額和日常安排不可混用。家長應在申請及繳費文件上確認校址，並按屯門通勤路線評估接送負擔。", sourceUrl: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
    { label: "2026/27學費以校方年度表為準", value: "哈羅香港國際學校公布2026/27 Nursery及Reception年度學費均為HK$182,493，按學期收取；資本徵費、校車和其他額外項目需另看校方收費說明。此數字適用於HISHK校方年級，不套用Harrow Little Lions的費用。", period: "2026/27學年；港幣", sourceUrl: "https://www.harrowhongkong.hk/his/admissions/fees/" },
  ] }]),

  profile("540560", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方網址查閱於2026-10", "按校號540560及天水圍天悅邨服務設施大樓登記校址識別。教育局概覽列上午、下午及全日班、粵語、師生比例和免費計劃資料；校方網站目前無法讀取，故不把非官方學校介紹中的教學特色或招生安排寫成已核實校方事實。", "http://tytatswk.edu.hk", [
    { label: "青衣商會天水圍幼稚園：校方網站", scope: "教育局位置資料所列官方網站；查閱時網站未能載入，未據此確認課程或當屆招生。", url: "http://tytatswk.edu.hk" },
    { label: "教育局校舍容額及註冊搜尋", scope: "校號、校址及登記資料；不把核准容額當作實際招生名額。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=540560000111" },
  ], [{ title: "以教育局校址資料為主的基本檔案", featured: true, note: "官方學校網站目前回應無法讀取；未能從校方直接來源驗證教學特色、英語活動、家長支援或新一屆招生日期。", details: [
    { label: "教育局概覽列上午、下午及全日班", value: "教育局《幼稚園概覽2026/27》按天悅邨校址列出三種班制。班制表示校址有相關登記資料，不代表每一年度均開辦所有時段或尚有空缺；如家庭需要全日照顧，應向校方確認當屆開班與膳食安排。", period: "教育局概覽2026/27；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5405600001" },
    { label: "概覽授課語言欄列粵語", value: "教育局資料把粵語列作授課語言。這可以作為理解主要學習媒介的起點，但沒有提供英語或普通話的課時表；重視雙語安排的家庭應直接向學校索取當屆班級時間表。", period: "教育局概覽2026/27；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5405600001" },
    { label: "免費計劃學費與全日額外收費需分開看", value: "概覽列半日班參加幼稚園教育計劃，半日學費為免費計劃資助後金額；全日班則可能有膳食或額外收費。家長應以教育局當屆核准收費證明及校方書面通知核對總支出，不應把「半日免費」理解為全日沒有費用。", period: "教育局概覽2026/27；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5405600001" },
  ] }]),

  profile("325368", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程資料：網站查閱於2026-10；招生資料：2026/27", "按校號325368及跑馬地樂活道2A聖瑪加利大堂區中心登記校址識別。校方課程頁明列教育局六大範疇、自由遊戲、戲劇教學和專科語言活動；目前可見K1申請文件屬2026/27年度，相關日期已過。", "https://www.stmkg.edu.hk/", [
    { label: "天主教聖瑪加利大幼稚園：課程", scope: "主題體驗、自由遊戲、戲劇教學、英語及普通話活動和持續評估。", url: "https://www.stmkg.edu.hk/我們的課程/主題體驗式學習-自由遊戲-戲劇教學/" },
    { label: "天主教聖瑪加利大幼稚園：遠景與使命", scope: "校方公布的天主教價值、辦學遠景及培育方向。", url: "https://www.stmkg.edu.hk/" },
    { label: "天主教聖瑪加利大幼稚園：2026/27招生申請表", scope: "2026/27申請年級、年齡門檻與已過的申請日期；不外推至下一屆。", url: "https://stmkg.edu.hk/frontend/web/custom_uploads/申請表.pdf" },
  ], [{ title: "自由遊戲、戲劇與天主教價值", featured: true, note: "教學方法取自校方課程介紹；K1招生細節只作2026/27歷史周期資料，不推斷2027/28程序。", details: [
    { label: "課程以主題體驗、自由遊戲和戲劇教學連接六大範疇", value: "校方稱課程按教育局學前教育課程指引設計，透過主題體驗、自由遊戲和戲劇教學發展幼兒表達、探索與解難。對喜歡角色扮演和動手探索的孩子，家長可觀課時留意教師是否讓孩子延伸情節、提出問題，而非只完成預設作品。", sourceUrl: "https://www.stmkg.edu.hk/我們的課程/主題體驗式學習-自由遊戲-戲劇教學/" },
    { label: "語言由專科教師帶領，但公開頁沒有時數", value: "校方介紹英語由外籍及本地英語教師教授，普通話由母語教師帶領，活動包括故事、遊戲、拼音及朗讀。這表明語言活動的師資安排，不足以判定英語或普通話在整體日常中的比例；報名前可索取當屆時間表。", sourceUrl: "https://www.stmkg.edu.hk/我們的課程/主題體驗式學習-自由遊戲-戲劇教學/" },
    { label: "持續觀察評估包含家長面談", value: "校方說明會以觀察、軼事紀錄和相片作幼兒發展評估，每學期末安排個別家長面談。若家長期待清晰了解孩子的社交或學習進度，可以在面談中詢問觀察如何轉化為支援；這是校方公布的評估方式，不是獨立成效評價。", sourceUrl: "https://www.stmkg.edu.hk/我們的課程/主題體驗式學習-自由遊戲-戲劇教學/" },
    { label: "2026/27招生日期已過，等候新一屆公告", value: "校方2026/27申請表列幼兒班最低入學年齡2歲8個月、低班及高班的申請條件，以及2025年10月申請日期。這些日期已過，不能據此安排下一屆申請；應等待校方公布新年度時程和班額。", period: "2026/27招生周期；歷史資料", sourceUrl: "https://stmkg.edu.hk/frontend/web/custom_uploads/申請表.pdf" },
  ] }]),

  profile("216216", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方幼稚園課程：2026學年", "按校號216216及西灣河鯉景道55號登記校址識別。校方明確把韓國部與國際部列為不同課程；校方歷史稱幼稚園設於韓國部。教育局概覽授課語言欄列英語，故本頁把概覽欄位和韓國部課程分開呈現，不視為相同口徑。", "https://www.kis.edu.hk/", [
    { label: "韓國國際學校：部門與課程架構", scope: "校方說明韓國部與國際部課程分立，及幼稚園最初設於韓國部。", url: "https://www.kis.edu.hk/governance/" },
    { label: "韓國國際學校韓國部：2027入學指引", scope: "校方列出幼兒班／幼稚班年齡範圍、韓國Nuri課程及英語、中文活動；申請年度按韓國學年。", url: "https://ks.kis.edu.hk/admission-guide/" },
    { label: "教育局學校搜尋：KIS校址及登記", scope: "校號216216、校址0001、幼稚園類別及登記狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=216216000113" },
  ], [{ title: "韓國部幼稚園與雙部門校制", featured: true, note: "校方公開說明兩部課程分開；教育局概覽授課語言欄與校方韓國部幼稚園課程語境不同，勿將國際部英語課程套用於韓國部幼稚園。", details: [
    { label: "先辨認韓國部和國際部的申請路線", value: "校方治理資料指出，韓國部採韓國教育部國家課程，國際部採英國／劍橋路線，兩部有各自的管理安排；校方沿革資料把1994年幼稚園設立記在韓國部。家長應先確認孩子申請哪一部，再比較課程、語言和升學銜接。", sourceUrl: "https://www.kis.edu.hk/governance/" },
    { label: "韓國部幼稚園以Nuri課程為基礎", value: "校方2027入學指引把幼稚園列為幼兒班及幼稚班，課程依韓國Nuri curriculum，並列英語、普通話及遊戲、藝術、體育和游泳活動。這是韓國部校方資料；若家庭希望孩子以韓語為主要日常語言，應直接確認當屆班級的語言安排，並索取完整時間表。", period: "校方2027學年入學指引", sourceUrl: "https://ks.kis.edu.hk/admission-guide/" },
    { label: "教育局語言欄列英語，與校方課程呈現方式不同", value: "教育局概覽2026/27同一登記校址授課語言欄列英語；校方則分別介紹兩部課程，且幼稚園沿革對應韓國部。這可能反映資料欄位涵蓋口徑不同；公開資料不足以核實幼稚園每週語言比例，家長應向校方詢問具體班別。", period: "教育局概覽2026/27；校方指引2027學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2162160001" },
  ] }]),

  profile("526665", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程與收費：2025/26及網站查閱於2026-10", "按校號526665及葵涌邨春葵樓校址識別。校方課程網頁描述兒童本位、活動教學、延展任務和基督教品格培育；可讀的完整費用表為2025/26年度，僅作上一年度成本參考。", "https://skhcotkc.edu.hk/", [
    { label: "聖公會荊冕堂葵涌幼稚園：校方課程與辦學理念", scope: "校方使命、課程、教學模式、六大範疇和持續評估。", url: "https://skhcotkc.edu.hk/" },
    { label: "聖公會荊冕堂葵涌幼稚園：2025/26費用", scope: "校方公布上一年度半日及全日學費、膳食及雜費；不能當作2026/27現行收費。", url: "https://skhcotkc.edu.hk/wp-content/uploads/2025/09/2025-2026%E5%B9%B4%E5%BA%A6%E8%B2%BB%E7%94%A8.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：質素與校址資料", scope: "校址0001當屆班制、語言、師生比例、支援和學校自述資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5266650001" },
  ], [{ title: "活動教學與延展任務", featured: true, note: "特色按校方自述整理；費用表為2025/26，家長需另索取當屆正式收費通知。", details: [
    { label: "課程以兒童發展需要和六大學習範疇為基礎", value: "校方稱課程依教育局指引編寫，按幼兒發展需要提供多元經驗，幼兒班不要求機械式抄寫或操練式計算。這種取向把早期學習重點放在理解和興趣；若家庭特別重視紙筆預備，可詢問K3如何銜接小一的閱讀、書寫和數感。", sourceUrl: "https://skhcotkc.edu.hk/" },
    { label: "活動教學後接延展任務和參觀體驗", value: "校方介紹以結構式活動鞏固知識，再用資料搜集、延展設計活動及參觀鼓勵幼兒探索和多角度思考。家長可觀察孩子是否有機會自己提出問題，以及延展活動是否照顧不同能力；校方公布的安排不等於每名孩子有相同活動頻率。", sourceUrl: "https://skhcotkc.edu.hk/" },
    { label: "基督教品格培育融入日常", value: "辦學團體和校方以基督教價值、關愛、感恩及互助描述校園方向。重視宗教教育的家庭可再了解祈禱、聖經故事和崇拜活動的日常安排；這些是辦學理念自述，不代表家長須有同一信仰背景。", sourceUrl: "https://skhcotkc.edu.hk/" },
    { label: "全日班支出高於半日班免費額", value: "校方2025/26費用表列半日班免學費，全日班每期另收膳食費和學費，另有教材、茶點等項目；數字屬上一學年。若全日照顧是主要考慮，應索取2026/27核准收費表，按11或10期及必需雜費計算全年預算。", period: "校方2025/26費用表；歷史年度", sourceUrl: "https://skhcotkc.edu.hk/wp-content/uploads/2025/09/2025-2026%E5%B9%B4%E5%BA%A6%E8%B2%BB%E7%94%A8.pdf" },
  ] }]),

  profile("231371", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程及招生：2026/27", "按校號231371及西貢輋徑篤村159號登記校址識別。Sai Kung Pre-school Group（SKIP）提供兩年幼稚園和Playgroup，校方稱採英國EYFS及森林學校取向；2026/27空位頁只反映該學年查閱時的班別狀態。", "https://www.skip.edu.hk/", [
    { label: "SKIP：幼稚園課程", scope: "EYFS、森林學校、英語教學及課堂活動。", url: "https://www.skip.edu.hk/classes/kindergarten/" },
    { label: "SKIP：課程理念", scope: "校方對遊戲式探索和幼兒發展的課程說明。", url: "https://www.skip.edu.hk/about-us/curriculum/" },
    { label: "SKIP：招生及年齡準則", scope: "2026/27 K1/K2年齡、申請和優先安排；不是新年度政策承諾。", url: "https://www.skip.edu.hk/admissions/admissions-process/" },
    { label: "SKIP：2026/27現有空位", scope: "頁面列明2026/27上午班已滿、下午班有位；僅適用當時及該年度。", url: "https://www.skip.edu.hk/admissions/current-vacancies/" },
  ], [{ title: "英語EYFS與森林學習", featured: true, note: "SKIP校址位於西貢郊野公園入口附近；上課與校巴安排須按班別及當屆通知確認。", details: [
    { label: "兩年幼稚園按EYFS和森林學習組織", value: "校方稱幼稚園採改編的英國EYFS，課程聚焦溝通、身體發展、社交情緒、讀寫、數學、世界認識和藝術；校外自然環境用於探索活動。這適合重視英語遊戲學習與戶外體驗的家庭，也要接受活動受天氣與戶外安全安排影響。", sourceUrl: "https://www.skip.edu.hk/about-us/curriculum/" },
    { label: "班級規模與每日活動有明確說明", value: "校方目前幼稚園頁列每班最多20名兒童、兩位註冊幼稚園教師，成人與兒童比例1:10；上午班每週五天，下午混齡班每週三天，部分活動包括圖書、園藝、烘焙及附近戶外場地。這些是校方頁面公布的編班和活動，需按孩子申請的班別確認。", sourceUrl: "https://www.skip.edu.hk/classes/kindergarten/" },
    { label: "招生按申請日期及校方優先條件處理", value: "校方接受全年申請，按申請日期分配位置，並優先考慮曾就讀SKIP playgroup的兒童及舊生兄弟姊妹；非playgroup申請人可能獲邀參加遊戲時段。這是校方公布的準則，不能推算錄取概率；若目標是下一學年，應先核對年齡和申請截止日期。", period: "校方2026/27招生頁；查閱於2026-10", sourceUrl: "https://www.skip.edu.hk/admissions/admissions-process/" },
    { label: "2026/27空位公告不能當作當前名額", value: "校方空位頁曾列2026/27上午班已滿、下午班有位。這只反映該學年特定查閱時點，不能代表目前仍有位置或2027/28名額；申請前應以校方最新空位通知為準。", period: "2026/27；歷史時點資料", sourceUrl: "https://www.skip.edu.hk/admissions/current-vacancies/" },
  ] }]),

  profile("579149", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；英基課程與招生：網站查閱於2026-10", "按校號579149及司徒拔道43B號登記校址識別。英基校方介紹曉新幼稚園提供K1、K2英語授課及IB PYP，並使用一份中央申請表選擇最多四所英基幼稚園；志願安排不保證獲得指定校址。", "https://hillside.esf.edu.hk/en/", [
    { label: "英基曉新幼稚園：課程與教學", scope: "遊戲式探究、IB PYP、家校合作及學習支援的校方說明。", url: "https://hillside.esf.edu.hk/en/" },
    { label: "英基曉新幼稚園：課程與學習", scope: "PYP跨學科探究、學習評估與家庭溝通。", url: "https://hillside.esf.edu.hk/en/outstanding_education/" },
    { label: "英基幼稚園中央申請程序", scope: "一份表格選最多四所幼稚園及候補安排；不等於四個校址同時有位。", url: "https://join-us.esf.edu.hk/kindergarten-admissions-process/" },
    { label: "英基曉新幼稚園：校址聯絡資料", scope: "官方校址、地址與聯絡方式，供與教育局校址核對。", url: "https://hillside.esf.edu.hk/en/about_us/campus_find_us/" },
  ], [{ title: "IB PYP遊戲探究與英基升學網絡", featured: true, note: "課程與申請資料為英基校方自述；升讀關聯小學及申請優先安排須按英基當屆政策確認。", details: [
    { label: "遊戲式探究配合跨學科PYP", value: "校方稱孩子透過遊戲和探究學習，PYP以跨學科主題連接知識與概念，並以整體評估和家校溝通追蹤成長。對喜歡動手、提問和表達的孩子，這種安排值得透過觀課了解；家長可問清教師如何記錄進度及支援語言發展。", sourceUrl: "https://hillside.esf.edu.hk/en/outstanding_education/" },
    { label: "K1及K2以英語授課", value: "英基招生資料列曉新為3至5歲幼稚園，K1及K2採英語授課並提供IB PYP。這不代表所有孩子都以相同速度適應英語；若孩子需要支援，宜在申請時詢問語言支援方式和課室溝通安排。", sourceUrl: "https://join-us.esf.edu.hk/schools/esf-hillside-international-kindergarten/" },
    { label: "幼稚園申請可選最多四所，但名額逐校安排", value: "英基中央申請允許家長選擇最多四所幼稚園；若首選等校址沒有位置，候補排序和處理方式按英基政策，不代表四個志願都獲面見或學位。選擇前應先按住址、校車和日常接送挑出可實際接受的校址。", sourceUrl: "https://join-us.esf.edu.hk/kindergarten-admissions-process/" },
    { label: "關聯小學銜接要看英基當屆規則", value: "曉新校方介紹列有與英基小學的關聯安排；這是英基網絡內的升學路徑，不應理解成任何情況下可自動選入指定小學。申請前需核對最新資格、學位安排及家庭對應校區。", sourceUrl: "https://hillside.esf.edu.hk/en/outstanding_education/" },
  ] }]),

  profile("564770", "教育局位置及註冊資料：2026-09/10；概覽：2026/27；校方課程及理念：網站查閱於2026-10", "按校號564770及西貢北潭涌村11號登記校址識別。校方以自然環境、遊戲和個別興趣描述幼兒學習；教育局概覽授課語言欄列英語，班制、比例和學費則按該校址2026/27資料呈現。", "https://leapfrog.edu.hk/", [
    { label: "Leapfrog Kindergarten：校方使命及環境", scope: "北潭涌校址、自然環境和以孩子興趣、能力為本的學習理念。", url: "https://leapfrog.edu.hk/" },
    { label: "Leapfrog Kindergarten：幼稚園課程", scope: "校方課程及教學模式；現行課程細節以網站可讀內容為限。", url: "https://leapfrog.edu.hk/kindergarten" },
  ], [{ title: "自然環境與遊戲式學習", featured: true, note: "課程理念取自校方網站；戶外空間和活動接觸的實際安排應按班級、天氣及校方當屆通知確認。", details: [
    { label: "校方把自然環境和遊戲視為學習條件", value: "校方介紹學校位於西貢郊野公園內，讓孩子在自然環境中透過遊戲成長；其使命強調尊重個別差異、情緒社交和創意發展。對喜歡戶外探索的孩子，環境可能有吸引力；家長可參觀時了解日常外出範圍、天雨安排和安全界線。", sourceUrl: "https://leapfrog.edu.hk/" },
    { label: "以孩子優勢、興趣和好奇心帶動探索", value: "校方表示教師會從孩子已有優勢和興趣出發，引導他們探索周遭並建立能力與關係。這種取向較看重個別觀察和孩子主動投入；家長可詢問教師如何把自由探索連到語言、數感和小一準備，而不是只看戶外活動照片。", sourceUrl: "https://leapfrog.edu.hk/" },
    { label: "課程與接送要按北潭涌位置一併評估", value: "教育局概覽列該校址上午、下午班及英語授課；校址位於北潭涌，通勤時間可能比市區校園更依賴巴士或家長接送。報名前應實測上下學路線、確認校巴服務範圍和班別時段。", period: "教育局概覽2026/27；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5647700001" },
  ] }]),
];
