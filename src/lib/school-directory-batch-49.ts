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
  options: {
    overrides?: Partial<Pick<PilotSchool, "name" | "nameEn">>;
    scope?: "school" | "location";
  } = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewSections = (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽"));
  return {
    ...school,
    ...options.overrides,
    website,
    sourceNote: `${school.sourceNote} ${sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    directoryDetailScope: options.scope,
    sources: [...new Map([
      ...school.sources,
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的版本與更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記資料；本地名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: (school.registryLocations || 0) > 1 ? details : [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 49: exact registered school identities with scoped official evidence. */
export const KINDERGARTEN_BATCH_49: PilotSchool[] = [
  profile("523895", "按教育局校號523895及校址0001識別。校方公開2026/27 K1申請文件；招生日期、費用及面試安排均按該屆標示，不當作下一屆承諾。教育局概覽的課室容額是2024年9月統計，不等同K1學額。", "https://www.cmyl.edu.hk/", [
    { label: "路德會陳蒙恩幼稚園：校方首頁與課程入口", scope: "現行校址、聯絡資料、課程特色及活動資訊入口。", url: "https://www.cmyl.edu.hk/" },
    { label: "路德會陳蒙恩幼稚園：2026/27 K1入學注意事項", scope: "上一屆申請方式、面見形式、兄弟姊妹優先考慮及統一註冊費；不推定為2027/28安排。", url: "https://www.cmyl.edu.hk/wp-content/uploads/2025/07/202627%E5%85%A5%E5%AD%B8%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85.pdf" },
    { label: "教育局《幼稚園概覽2025/26》：路德會陳蒙恩幼稚園", scope: "校址0001、2024年9月課室容額與班級人數、2025/26班制和收費欄位。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6115" },
    { label: "教育局核准收費證明書：路德會陳蒙恩幼稚園", scope: "2025年9月生效的全日班學費及膳食費；半日班資助後學費以概覽欄位為準。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/523895.pdf" },
    { label: "教育局質素評核報告：路德會陳蒙恩幼稚園", scope: "評核結果及當次觀察；報告日期與後續改善情況需以原文及較新資料判讀。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/ChanMungYan_Lutheran.pdf" },
  ], [{ title: "全人發展、遊戲學習與觀塘校址", featured: true, note: "課程資料取自校方現行頁面入口及可核實的教育局文件。2026/27招生細節屬上一屆流程，申請下一屆前須等候新公告。", details: [
    { label: "校方以全人發展和六個學習範疇組織課程", value: "校方介紹以身體、認知與語言、情意與群性、美感作發展方向，並以體能與健康、語文、早期數學、科學與科技、個人與群體、藝術等範疇安排學習。頁面亦列出遊戲學習、社區參觀、表演與趣味語文活動。這種安排重視幼兒在活動中表達和探索；家長可參觀時了解不同年級的活動如何由遊戲逐步過渡到書寫與數概念。", sourceUrl: "https://www.cmyl.edu.hk/" },
    { label: "2026/27招生文件安排小組及個別面見", value: "上一屆文件表示所有K1申請兒童均獲安排面見，形式為小組及／或個別，家長須陪同；現有在讀兄弟姊妹獲優先考慮，但文件明言不保證一定獲學位。這能讓家庭了解學校曾採用的流程，不能代替新一屆招生公告，也不應把優先考慮理解成錄取承諾。", period: "入學年度：2026/27；文件發布：2025年", sourceUrl: "https://www.cmyl.edu.hk/wp-content/uploads/2025/07/202627%E5%85%A5%E5%AD%B8%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85.pdf" },
    { label: "全日班有額外學費與膳食支出，費用按年度看", value: "教育局2025/26概覽列上午及下午班扣除資助後學費免費；全日班每年學費為HK$11,000。2025年9月生效的收費證明書另列全日班每月膳食費HK$500（共10期）。半日與全日的家庭成本不同，報名前應按目標學年重新核對收費證明書及膳食安排。", period: "概覽：2025/26；收費證明書生效日：2025-09-01", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/523895.pdf" },
    { label: "課室容額不是K1招生名額", value: "教育局2025/26概覽記錄校址0001在2024年9月已使用課室總容額203，當時另列上午、下午及全日學生人數。這是當時校舍容量及在讀人數的統計，不等於新一屆K1學額或申請競爭程度；有意報讀時應向學校確認各班別實際收生名額。", period: "容量及在讀人數資料：2024-09；概覽年度：2025/26", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=6115" },
  ] }]),

  profile("215830", "按教育局校號215830及校址0002的東涌翔東邨地址識別；同一校號另列校址0001（杏花邨），不可把兩校舍的概覽數據互相套用。校方招生網頁將東涌校列作參加幼稚園教育計劃學校。", "https://creative.edu.hk/", [
    { label: "啟思幼稚園：參加幼稚園教育計劃分校名單", scope: "校方列明啟思中英文幼稚園（東涌）及其他不同分校；以正式分校名稱辨識。", url: "https://creative.edu.hk/admissions/" },
    { label: "啟思幼稚園：創校宗旨與教學理念", scope: "辦學團體層面的尊重孩子、遊戲學習、啟發思維及家校合作方向，不當作東涌校的獨有安排。", url: "https://creative.edu.hk/aboutus/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "此頁對應杏花邨校址，不用作東涌校址0002的班制、學費或師生比資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2158300001" },
  ], [{ title: "啟思辦學理念與東涌校資料範圍", note: "課程理念來源屬啟思辦學團體層面；教育局校址0002才是本頁的東涌分校。杏花邨校址0001概覽數字沒有移植到東涌。", details: [
    { label: "東涌校是校方明確列出的計劃參加校", value: "啟思招生頁把啟思中英文幼稚園（東涌）列在參加幼稚園教育計劃的學校名單，與同一團體內不參加計劃的九龍塘正校分開。這是家長比較學費時的重要分界；實際學費仍須按東涌校當年度收費證明確認。", sourceUrl: "https://creative.edu.hk/admissions/" },
    { label: "課程方向重視尊重孩子、遊戲與探索", value: "啟思辦學理念強調尊重孩子、培養愛心、激發潛能和啟發思維，並描述讓孩子從遊戲中學習。這些是集團的教育方向，不足以證明每個分校每天採用相同活動或課時；家長宜向東涌校查看實際週課表及幼兒班活動例子。", sourceUrl: "https://creative.edu.hk/aboutus/" },
    { label: "校號下有東涌及杏花邨兩個登記校址", value: "教育局註冊名錄將東涌翔東邨翔輝樓校址編為0002，另有杏花邨校址0001。東涌校的地址和課程應以0002及該分校公告為準；杏花邨概覽頁所列班制與語言不應當成東涌資料。", sourceUrl: "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml" },
  ] }], { scope: "location" }),

  profile("215589", "按教育局校號215589、北角寶馬山校園徑校址及校方Reception入學頁識別。Reception為半日入學課程，校方公布96個學額；此數字是課程招生名額，不等於每年實際錄取或空缺。", "https://www.cis.edu.hk/", [
    { label: "Chinese International School：Reception招生程序", scope: "Reception年齡、半日課程、96個名額、語言條件及分階段申請安排。", url: "https://www.cis.edu.hk/admissions/admissions-process/reception" },
    { label: "Chinese International School：入學語言要求", scope: "Reception與小學不同的語言門檻及評估形式。", url: "https://www.cis.edu.hk/admissions/entry-requirements" },
    { label: "Chinese International School：小學課程概覽", scope: "Reception至Year 6整體雙語及探究課程方向；以學校層面資料理解。", url: "https://www.cis.edu.hk/academics/primary/primary-programme" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "教育局校址級班制、授課語言及費用欄位；學費另以校方當屆收費表為準。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2155890001" },
  ], [{ title: "Reception半日課程與雙語銜接", featured: true, note: "本段只談CIS的Reception入學課程；名額和申請日期按校方招生頁，不延伸為其他年級的招生量。", details: [
    { label: "Reception是半日制，校方公布96個課程名額", value: "校方把Reception列為CIS入學課程，適用於入學年8月31日前滿4歲的孩子，並公布96個名額。這可以幫家庭判斷是否符合年齡及課程時段需要，但不能推算當年實際申請人數、錄取率或候補轉正機會。", sourceUrl: "https://www.cis.edu.hk/admissions/admissions-process/reception" },
    { label: "Reception要求至少一種語言有較強基礎，不要求先會普通話", value: "校方接受英語、普通話或廣東話其中一種有較強掌握的申請者，並明確表示不要求事先學過普通話。這與小一至小六需要符合英語和普通話程度的要求不同；家長可按孩子目前最穩定的語言準備自然互動，不必把雙語流利誤當Reception硬性門檻。", sourceUrl: "https://www.cis.edu.hk/admissions/entry-requirements" },
    { label: "入學程序包括家長了解學校使命與孩子觀察", value: "Reception程序設有家長簡介會、問卷與家長對話，合資格申請者再參加小組觀察。校方說明觀察活動模擬學前環境，並按孩子語言背景以英語或中文提問；家庭應同時評估學校的雙語辦學理念和學費承擔，而不只準備孩子作答。", sourceUrl: "https://www.cis.edu.hk/admissions/admissions-process/reception" },
  ] }]),

  profile("216011", "按教育局校號216011識別；幼兒教育中心位於黃竹坑THE SOUTHSIDE校址0006，與南朗山道主校區校址0005分開。課程、招生與費用只採Early Years Centre公布資料。", "https://www.cdnis.edu.hk/", [
    { label: "CDNIS Early Years Centre：Nursery及Early Years 1課程", scope: "THE SOUTHSIDE校址的2歲Nursery、3歲EY1、雙語探究課程、師生比例及時段。", url: "https://www.cdnis.edu.hk/academics/nursery-eng" },
    { label: "CDNIS：2027/28網上申請及評估", scope: "當屆年齡範圍、截止日期、候補池與Nursery/EY1評估安排。", url: "https://www.cdnis.edu.hk/admissions/apply-online/" },
    { label: "CDNIS：2026/27學費", scope: "Nursery及EY1年度學費；不包含所有家庭可能產生的其他支出。", url: "https://www.cdnis.edu.hk/admissions/tuition-fees" },
  ], [{ title: "雙語Early Years Centre：課程與家庭成本", featured: true, note: "以下只適用於黃竹坑THE SOUTHSIDE的幼兒教育中心。費用按2026/27學年；申請與面試安排按2027/28校方公告。", details: [
    { label: "2歲Nursery與3歲EY1均以半日雙語課程為主", value: "CDNIS在THE SOUTHSIDE設Nursery及Early Years 1，分別面向2歲和3歲幼兒。校方描述以英語和中文雙語、IB探究及遊戲為本環境，讓幼兒在感官探索和互動中學習；家長可實地了解中文活動與英語活動如何交替，而不是只看「雙語」標籤。", sourceUrl: "https://www.cdnis.edu.hk/academics/nursery-eng" },
    { label: "2026/27 Nursery學費為每年HK$142,780", value: "校方2026/27收費表列Nursery半日雙語學費每年HK$142,780，以11期繳付；Early Years 1同年學費為HK$161,000。這是學費，不包含校服、非課程活動及可選教材等家庭支出，亦不可套用至其他年級或後續年度。", period: "學費：2026/27學年", sourceUrl: "https://www.cdnis.edu.hk/admissions/tuition-fees" },
    { label: "Nursery升EY1並非自動直升，兩級評估時間不同", value: "校方說明Nursery學生升讀EY1須經內部評估；2027/28申請頁亦按年級安排不同評估月份，Nursery通常在1至2月，EY1通常在11至12月。家庭若以Nursery作起點，須把後續評估與可能無法升班的安排納入規劃。", period: "招生及評估：2027/28年度", sourceUrl: "https://www.cdnis.edu.hk/admissions/apply-online/" },
  ] }], { scope: "location" }),

  profile("627275", "按教育局校號627275及觀塘道55號校址識別。教育局截至2026-10-23列為臨時註冊；校方課程涵蓋3至5歲Nursery與Reception，2025/26學費只作有年份的參考。", "https://www.harrowhongkong.hk/hll", [
    { label: "Harrow Little Lions Kindergarten：課程架構", scope: "Little Lions Curriculum、年齡組別、學習領域及EYFS參照。", url: "https://www.harrowhongkong.hk/hll/academic/curriculum/" },
    { label: "Harrow Little Lions Kindergarten：常見問題", scope: "課堂主要語言、每週普通話、班級教學人員及2025/26學費。", url: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
    { label: "Harrow Little Lions Kindergarten：2027/28招生消息", scope: "校方近期招生公告；只反映申請開放資訊。", url: "https://www.harrowhongkong.hk/hll/news-events/school-news/" },
  ], [{ title: "英語主導、普通話每週一小時的早期課程", featured: true, note: "課程及語言由校方網站自述；2025/26學費標明年度。教育局登記狀態截至2026-10-23為臨時註冊，家庭可於申請時向校方確認最新註冊進度。", details: [
    { label: "Little Lions Curriculum將英國EYFS與學校價值融入課程", value: "校方稱Little Lions Curriculum為Harrow系統設計，參照並延伸英國早期基礎階段框架，涵蓋十個學習領域和五種學習習慣。這表示課程不只看識字算術，也安排溝通、身體、社交、文化及創意等領域；家長可觀察孩子是否有自主探索和持續完成活動的空間。", sourceUrl: "https://www.harrowhongkong.hk/hll/academic/curriculum/" },
    { label: "課堂以英語溝通，普通話每週一小時", value: "校方表示課堂主要使用英語，教師與助教以英語和孩子交流；普通話由專科教師每週教授一小時，透過歌曲、故事、韻律和遊戲接觸。若家庭希望孩子以普通話作主要學習語言，這個安排未必符合目標，宜先核對實際課時和家庭語言環境。", sourceUrl: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
    { label: "2025/26學費HK$235,818，非當屆報價", value: "官方FAQ列出Nursery及Reception在2025/26學年學費均為HK$235,818。這是歷史年度金額，預算時應以申請年度學費表重算；另要核實校方當前註冊狀況及任何新增費用。", period: "學費：2025/26學年", sourceUrl: "https://www.harrowhongkong.hk/hll/the-school/faqs/" },
  ] }]),

  profile("536067", "按教育局校號536067及大埔翠樂街富來花園校址識別。校方課程網頁描述「1+S」校本與STEAM設計，並提到每週STEAM Day；這是校方公布的課程安排，未外推到其他安基司校舍。", "http://www.anchors.edu.hk", [
    { label: "安基司幼稚園暨國際幼兒園：STEAM課程特色", scope: "校本課程、主題／設計活動、每週STEAM Day、閱讀及社交情智教育。", url: "https://www.anchors.edu.hk/steam%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "安基司幼稚園暨國際幼兒園：分校資料", scope: "分校和校舍地址入口；不同校址不互相代替。", url: "https://www.anchors.edu.hk/%E5%88%86%E6%A0%A1%E8%B3%87%E6%96%99/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "大埔校址的班制、授課語言、師生比例及收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5360670001" },
  ], [{ title: "校本課程加每週STEAM Day", featured: true, note: "STEAM及教學安排取自校方未標學年的特色頁；只描述校號536067所屬本校資訊，不把同辦學團體其他校舍安排併入。", details: [
    { label: "「1+S」把校本主題課程與STEAM活動並置", value: "校方把「1」解作校本課程，「S」解作科學、科技、工程、藝術與數學。頁面描述教師與孩子共同規劃主題，走出課室作校內外學習；每週另有STEAM Day，透過實驗、設計和互動科技引導幼兒提出問題和動手試。這類安排較適合喜歡操作和探索的孩子；可向校方了解活動如何按年齡調整。", sourceUrl: "https://www.anchors.edu.hk/steam%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "閱讀和社交情智教育同樣列入課程方向", value: "校方稱把情緒管理融入課程，並結合閱讀推動全校閱讀文化；另由體適能教師設計體能活動。這些是校方對課程的描述，不能直接視為每名幼兒都會獲得個別訓練。參觀時可問清每日戶外活動、閱讀共讀頻率及情緒支援的實際形式。", sourceUrl: "https://www.anchors.edu.hk/steam%E8%AA%B2%E7%A8%8B%E7%89%B9%E8%89%B2/" },
    { label: "語言欄位按教育局概覽年度理解，不推定課時比例", value: "2026/27概覽把大埔校址的授課語言和師生比例列作年度欄位；概覽不等同逐週時間表。家庭若要判斷英語、普通話或粵語在日常教學中的比重，應索取該校址目標年級的課程時間表。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5360670001" },
  ] }]),

  profile("325147", "按教育局校號325147及九龍塘森麻實道校址編號0006識別。耀中課程資料涵蓋幼兒教育多個年齡組別；本頁只摘錄校方明確對應九龍塘兩歲課程的資訊。", "https://www.ycis-hk.com/tc/academics", [
    { label: "香港耀中國際學校：幼兒教育課程", scope: "英中雙語、遊戲為本、雙教師合作及按年齡劃分的早期課程；校方層面資料。", url: "https://www.ycis-hk.com/tc/academics" },
    { label: "香港耀中國際學校：幼兒教育兩歲課程", scope: "九龍塘幼稚園校舍兩歲課程的半日／全日選擇、日常安排及師生比例。", url: "https://www.ycis-hk.com/tc/academics/early-childhood" },
    { label: "教育局《幼稚園概覽2026/27》：校址0006", scope: "本頁對應的九龍塘登記校址班制、授課語言、師生比例及收費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3251470006" },
  ], [{ title: "英中雙語、遊戲為本與雙教師合作", featured: true, note: "課程細節以校方幼兒教育頁所列年齡與校址為界；不可將兩歲班配置直接套用到三至四歲班或其他校舍。", details: [
    { label: "九龍塘兩歲課程以孩子主導遊戲建立探索與關係", value: "校方說明九龍塘幼稚園校舍的兩歲課程透過由孩子主導的遊戲和有意義活動，培養好奇心並建立師生關係；可選半日或全日，每週五天。這個方向為慢慢適應群體生活的幼兒提供較多遊戲入口，但家長應確認孩子可申請的年齡組別、每日作息與休息安排。", sourceUrl: "https://www.ycis-hk.com/tc/academics/early-childhood" },
    { label: "雙教師模式服務於英語與中文並行的環境", value: "YCIS介紹其幼兒課程由外籍英語教師及華籍教師協作，建立英語與中文（廣東話）雙語環境。這有助家庭理解學校的語言定位；頁面未提供目標年級逐週語言時數，不能推斷兩種語言平均分配，宜索取現行班級時間表。", sourceUrl: "https://www.ycis-hk.com/tc/academics" },
    { label: "勿把幼兒教育、兩歲課程和幼稚園課程的師生比混用", value: "校方頁面按課程年齡與時段列出不同人手配置；教育局2026/27概覽則按校址提供年度師生比例。比較時要確定孩子年齡及校址相同，再看課室實際配置，不能用兩歲課程比例代替整所幼稚園資料。", period: "概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=3251470006" },
  ] }]),

  profile("320544", "按教育局校號320544識別；截至2026-09-30的教育局北區學校名單列出上水寶石湖邨校址0002，校方原中環登記校址0001仍出現在註冊資料檔，現行使用狀態須向校方確認。課程質素評核於2021年在舊校址進行，已標明年份及位置背景。", "https://sfkg.caritas.org.hk/index.aspx", [
    { label: "教育局北區學校名單：明愛聖方濟各幼稚園", scope: "2026-09-30名單列出的現行北區校址0002及校方聯絡資料。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-n.html" },
    { label: "教育局《幼稚園概覽2025/26》：校址0002", scope: "上水校址的學生容量、課室和設施等2025/26年度公開欄位；名額非當屆錄取數。", url: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5866" },
    { label: "教育局質素評核報告：明愛聖方濟各幼稚園", scope: "評核於2021-12在中環舊校址進行；課程、支援和改進事項只按當時觀察理解。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_StFrancis.pdf" },
    { label: "香港明愛：明愛聖方濟各幼稚園", scope: "官方學校頁入口；目前無法讀取其課程內文，故未據此補寫現行細節。", url: "https://sfkg.caritas.org.hk/index.aspx" },
  ], [{ title: "上水校址與2021年課程評核的適用界線", note: "學校校號相同但登記地址不止一個。現行北區校址為0002；教育局質素評核記錄的是2021年中環舊址的觀察，不當作上水校舍現況或最新課程承諾。", details: [
    { label: "現行北區名單列上水校址，註冊檔仍保留舊址記錄", value: "教育局2026年9月的北區學校名單列明明愛聖方濟各幼稚園位於上水寶石湖邨服務設施大樓二樓KG01室（Location 0002）。註冊資料同時仍有中環堅道舊址0001，故現行上課校址以最新分區名單為主；如收到舊地址文件，應向校方確認是否仍有營運用途。", period: "教育局地區名單：2026-09-30", sourceUrl: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-n.html" },
    { label: "2021年評核記錄生活化主題、專題探究與遊戲角", value: "教育局質素評核記錄該校當時以生活主題綜合學習範疇，安排幼兒共同選題探究，並設興趣角和自選活動。報告亦指出高班下學期部分數學內容偏深，要求刪減；這是2021年舊址的評核記錄，不應視作目前上水校舍仍有相同問題。參觀時可索取最新課程大綱及評核跟進情況。", period: "教育局質素評核：2021-12；評核地址為中環舊址", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Caritas_StFrancis.pdf" },
    { label: "2025/26概覽列出123個已使用課室容額，不等於K1學位", value: "教育局概覽資料把上水校址2024年9月已使用課室總容額列為123，並列出註冊課室及設施。這是校址層面的課室容量，不是K1招生名額、實際在讀人數或可申請空缺；如家庭關心收生競爭，須另查當屆各級學額。", period: "課室容量：2024-09資料；概覽年度：2025/26", sourceUrl: "https://kgp2025.azurewebsites.net/edb/schoolinfo.php?schid=5866" },
  ] }], { scope: "location" }),

  profile("601861", "按教育局校號601861及深水埗荔枝角道873號校址識別。辦學團體官方校舍頁列出校舍班級、時段與設施；其師生比與2026/27教育局概覽口徑不同，頁面不合併成單一數字。", "https://www.lingliang.org.hk/", [
    { label: "香港靈糧堂：荔枝角分校2幼稚園部", scope: "校號601861、校舍地址、總容額、半日課程時段、課室及設施。", url: "https://response.lingliang.org.hk/campuses/sau-tak-2" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "教育局按校址年度公布的班制、語言、師生比例與費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6018610001" },
    { label: "教育局深水埗區學校名單：秀德幼稚園（二校）", scope: "校號、Location ID、區份、地址及聯絡資料；截至2026-09-30。", url: "https://www.edb.gov.hk/en/student-parents/sch-info/sch-search/schlist-by-district/school-list-ssp.html" },
  ], [{ title: "秀德二校：半日班配置與校園資源", featured: true, note: "官方校舍頁沒有標示資料年度；師生比與概覽2026/27數字不一致，暫並列來源口徑，不作二選一或推算。", details: [
    { label: "辦學團體列出上午、下午各257人總容額", value: "香港靈糧堂官方校舍頁列出上午班和下午班各257人總容額，並按幼兒班、低班、高班列有班級編制。這是校舍總容額，不是當屆K1招生名額，也不能直接推算空缺；家長宜向校方查詢申請年度各級新生及插班學額。", sourceUrl: "https://response.lingliang.org.hk/campuses/sau-tak-2" },
    { label: "上午與下午分班，固定放學時段不同於全日照顧", value: "校舍頁列上午班為9:00至12:00、下午班為13:30至16:30，並提供探索區、音樂室、圖書室及兒童餐廳等設施。這些資料適合用來評估接送和孩子作息；若家庭需要全日照顧，應另問有否延展照顧及額外費用。", sourceUrl: "https://response.lingliang.org.hk/campuses/sau-tak-2" },
    { label: "師生比需按來源年度核實，兩個官方欄位目前不同", value: "辦學團體校舍頁列師生比例1:11；教育局2026/27概覽頁列1:10。兩者可能對應不同資料年度或計算口徑，現階段不合併為一個確定數字。家長比較班級照顧密度時，可要求校方提供目標年級實際班額及成人配置。", period: "教育局概覽：2026/27；辦學團體校舍頁未標年份", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6018610001" },
  ] }]),

  profile("615366", "按教育局校號615366及將軍澳MONTEREY PLACE校址識別。校方現行課程頁公布Cambridge Early Years、六個發展範疇、中國語文安排及半日／全日時段；學費欄未以最新官方費表核實，不填推測金額。", "https://www.invictus.edu.hk/tko", [
    { label: "Invictus Kindergarten TKO：幼稚園課程", scope: "Cambridge Early Years、中文（繁體字）、數學、遊戲與探究課程及上課時段。", url: "https://www.invictus.edu.hk/campuses/tseung-kwan-o/kindergarten" },
    { label: "Invictus School Hong Kong：將軍澳聯絡資料", scope: "幼稚園校址、電話及校方聯絡方式。", url: "https://www.invictus.edu.hk/hong-kong/contact-us" },
    { label: "Invictus School Hong Kong：學校招生與校園近況", scope: "將軍澳幼稚園與小學、柴灣中學的學部地點區分。", url: "https://www.invictus.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "學校班制、授課語言、師生比例及費用年度欄位；私立學費以校方現行費表核實。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6153660001" },
  ], [{ title: "Cambridge Early Years與中英學習安排", featured: true, note: "校方頁面顯示幼稚園在將軍澳校舍；學費尚未從校方現行收費表核實，因此不列金額。", details: [
    { label: "六個發展範疇兼顧語文、數學、創意與身心社交", value: "校方採用Cambridge Early Years，按溝通與讀寫、數學、創意表達、認識世界、體能，以及個人社交情緒六個範疇設計學習。課程頁同時說明中文作第二語言、使用繁體字，數學採用新加坡數學的操作和概念理解方法。家庭可比較這種國際課程加本地中文的組合是否符合升小方向。", sourceUrl: "https://www.invictus.edu.hk/campuses/tseung-kwan-o/kindergarten" },
    { label: "半日與全日課程分段安排，下午延伸探究及創作", value: "校方列半日班8:30至11:45、全日班8:30至14:45；上午較集中語言和數學，下午安排體能、創意和探究學習。這讓家庭能按照顧需要選擇時段，但申請前宜核對各年齡班是否同時開辦兩種班制及膳食安排。", sourceUrl: "https://www.invictus.edu.hk/campuses/tseung-kwan-o/kindergarten" },
    { label: "英語為主的校園環境不等同沒有中文課程", value: "2026/27教育局概覽把該校址的授課語言列為英語；校方課程頁另列中文第二語言、繁體字學習。兩項資料反映不同層面的語言安排，不能簡化為「全日只用英語」；若家庭重視中文基礎，應問清楚日常中文課時與口語環境。", period: "教育局概覽：2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6153660001" },
  ] }]),
];
