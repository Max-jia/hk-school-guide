import type { PilotSchool } from "./school-directory-pilot";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRATION = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";

export const KINDERGARTEN_BATCH_14: PilotSchool[] = [
  {
    stage: "kindergarten", slug: "victoria-international-kindergarten-harbour-heights-629758", name: "維多利亞（海峰園）國際幼稚園", nameEn: "VICTORIA INTERNATIONAL KINDERGARTEN (HARBOUR HEIGHTS)", district: "東區", address: "香港北角福蔭道5號海峰園高峰閣", schoolNumber: "629758", schoolType: "私立幼稚園", gender: "男女校", gradeSpan: "PN、K1至K3；實際校舍及年級安排按2026/27校方課表", website: "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/", dataYear: "教育局登記資料：2026-10；校方校舍、班制與收費：2026/27", sourceNote: "教育局每日登記資料將本校址列為臨時註冊；不可與同一教育機構其他校舍的登記狀態混為一談。2026/27課表列海峰園有PN、K1及K2上午／下午班、K3下午班；校方註明各校舍班別可能調整。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號629758、校址及學段身份。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "校址註冊狀態及校址編號；資料截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "海峰園校舍介紹", scope: "校舍課程、年齡層和兩文三語班資料。", url: "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/" },
      { label: "2026/27級別及活動時段", scope: "各校舍班別和授課時段；僅適用2026/27。", url: "https://www.victoria.edu.hk/zh-hk/programme-class-schedule/" },
      { label: "2026/27學費", scope: "海峰園校舍各級年度學費；按校方表列年度理解。", url: "https://www.victoria.edu.hk/zh-hk/tution/" },
    ],
    detailSections: [{ title: "海峰園校舍課程與班制", featured: true, note: "本頁只整理北角海峰園校舍；入學、班別和費用須與其他維多利亞校舍分開核對。", details: [
      { label: "海峰園校舍採IB小學項目課程", value: "校方把海峰園列為提供IB Primary Years Programme的校舍，並設兩文三語班。這是校方公布的課程及班別安排，不代表各語言有相同課時。", sourceUrl: "https://www.victoria.edu.hk/zh-hk/campus/harbour-heights-campus/" },
      { label: "2026/27級別時段按校舍安排", value: "校方課表列海峰園有PN、K1和K2上午／下午班，K3只列下午班。報名前要確認孩子年齡、所選級別是否在該校舍開班，以及當年班別有否調整。", period: "2026/27學年", sourceUrl: "https://www.victoria.edu.hk/zh-hk/programme-class-schedule/" },
      { label: "當屆費用應按年級查表", value: "校方2026/27學費表按校舍、級別和時段分列年度學費。家長應把學費、分期數和可能另收的項目一併核對，不宜直接套用其他校舍的收費。", period: "2026/27學年", sourceUrl: "https://www.victoria.edu.hk/zh-hk/tution/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "la-petite-enfance-kindergarten-590029", name: "LA PETITE ENFANCE KINDERGARTEN", nameEn: "LA PETITE ENFANCE KINDERGARTEN", district: "離島區", address: "新界大嶼山愉景灣海澄湖畔路92號一座寫字樓地下低層5、6及8號舖", telephone: "61677746", schoolNumber: "590029", schoolType: "私立獨立幼稚園", gender: "男女校", gradeSpan: "《幼稚園概覽2026/27》列上午、下午及全日班；PN未列", website: "http://www.ecole-discovery.com", dataYear: "教育局位置及登記資料：2026-09／2026-10；《幼稚園概覽》：2026/27；可讀課程資料：2023/24", sourceNote: "教育局登記網站為校方所列網站，但本輪未能從該站核實現行課程理念或招生細節。可讀的校方課程說明來自較早《幼稚園概覽》；頁面只保留可核對的官方基礎資料並標出課程資料年份。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號590029、愉景灣校址及學段身份。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "登記校址及狀態；資料截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001的班制、授課語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5900290001" },
      { label: "教育局《幼稚園概覽 2023/24》", scope: "學校提供的歷史課程及辦學資料；不作現況證明。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/590029e-0001.pdf" },
    ],
    detailSections: [{ title: "校方課程資料的年份界線", featured: true, note: "現行可核對的校址和班制以教育局資料為主；公開課程介紹較舊，不能代表現屆教學細節。", details: [
      { label: "教育局概覽列英語授課及三種班制", value: "《幼稚園概覽2026/27》按校址0001列上午、下午及全日班，授課語言欄列英語，PN欄未列資料。師生比例為概覽統計，不等同每班人數。", period: "2026/27學年", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5900290001" },
      { label: "歷史概覽曾列親身探究和活動學習", value: "2023/24概覽記錄學校以綜合活動、親身探究和師生互動安排學習，並提及故事閱讀及社區活動。這是該年度校方申報資料，是否仍按相同方式實施須向校方查詢。", period: "2023/24（歷史資料）", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/590029e-0001.pdf" },
      { label: "報名前確認現行校方資料", value: "本輪未能由校方現行公開頁核實課程分流、班額、招生條件或學費。家長可按教育局列出的電話和校址聯絡學校，確認當屆課程與交通安排。", sourceUrl: EDB_REGISTRATION },
    ] }],
  },
  {
    stage: "kindergarten", slug: "the-church-of-christ-in-china-shum-oi-church-kindergarten-319511", name: "中華基督教會深愛堂幼稚園", nameEn: "THE CHURCH OF CHRIST IN CHINA SHUM OI CHURCH KINDERGARTEN", district: "深水埗區", address: "九龍石硤尾窩仔街80號地下", telephone: "27770986", schoolNumber: "319511", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://www.sockg.edu.hk/", dataYear: "教育局位置及登記資料：2026-09／2026-10；課程詳情：2022/23；招生公告：2026-27及2027-28", sourceNote: "校方現行首頁公布正接受2026/27及2027/28新生與插班申請，並以「愉快自主學習、培育多元創意」描述方向。詳細課程政策可讀版本來自2022/23概覽，已按年份標示。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號319511、石硤尾校址、電話及學段身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例與費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3195110001" },
      { label: "中華基督教會深愛堂幼稚園", scope: "現行招生公告、校方課程方向和聯絡資料。", url: "https://www.sockg.edu.hk/" },
      { label: "教育局《幼稚園概覽 2022/23》", scope: "有年份的校方課程申報資料。", url: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/319511c-0001.pdf" },
    ],
    detailSections: [{ title: "自主學習方向與課程證據", featured: true, note: "招生資訊已更新至2026/27及2027/28；課程細節則需留意來源年度。", details: [
      { label: "校方以愉快自主學習作方向", value: "學校首頁以「愉快自主學習、培育多元創意」描述辦學方向，並公布2026/27及2027/28新生和插班申請。這是校方公開定位，不能單憑標語推斷課堂每天的自主選擇比例。", period: "招生公告查核：2026-10", sourceUrl: "https://www.sockg.edu.hk/" },
      { label: "2022/23概覽列主題及遊戲活動", value: "教育局概覽的歷史版記錄校方按幼兒發展和興趣編訂課程，採活動與遊戲，並提及英語、普通話及舞蹈。校方明言不要求幼兒班機械式抄寫或操練計算；這些內容不能自動視為2026/27現行安排。", period: "2022/23（歷史課程資料）", sourceUrl: "https://kgp2022.azurewebsites.net/edb/SchoolPDF/319511c-0001.pdf" },
      { label: "申請時可先問面試及學習展示要求", value: "校方當前公告要求家長留意申請文件和面試通知；網站亦提到可提交幼兒在家遊戲或閱讀的短片作參考。提交方式和適用屆別應以校方最新申請指引為準。", period: "2026/27及2027/28招生公告", sourceUrl: "https://www.sockg.edu.hk/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "tseung-kwan-o-methodist-kindergarten-530417", name: "將軍澳循道衛理幼稚園", nameEn: "TSEUNG KWAN O METHODIST KINDERGARTEN", district: "西貢區", address: "新界將軍澳尚德邨尚禮樓（第六座）四樓平台A、B及C翼", telephone: "27060880", schoolNumber: "530417", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；上午、下午及全日班以當屆概覽為準", website: "https://www.tkomkg.edu.hk/", dataYear: "教育局概覽：2026/27；校方課程與使命頁：2026-10查閱", sourceNote: "校方列英語及廣東話共同授課，並另有普通話專科課；沒有公布每種語言每週總課時。課程頁仍引用2017年課程指引，故只描述校方公布的校本做法，不將其當成最新政府政策。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號530417、尚德邨校址、電話與類別。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5304170001" },
      { label: "校方課程介紹", scope: "六個學習範疇、雙語教學、主題教學、體能及藝術安排。", url: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
      { label: "校方辦學使命及校園資料", scope: "基督教辦學使命、校舍設施及家校合作。", url: "https://www.tkomkg.edu.hk/?lang=en&page_id=951" },
    ],
    detailSections: [{ title: "英粵雙語與活動課程", featured: true, note: "概覽的授課語言欄與校方列出的英粵雙語課程屬不同資料層次，不能換算成語言比例。", details: [
      { label: "每天有英語及廣東話教師共同帶領", value: "校方稱每天由廣東話教師及外籍英語教師共同帶領幼兒，以兩種語言互動；另設普通話專科課。沒有公布普通話、英語和粵語的整體課時比例，家長可索取當屆週課表。", sourceUrl: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
      { label: "主題故事、區角和體能活動並行", value: "學校介紹以繪本或故事引出主題，配合遊戲和課室區角；另列每日體能活動及奧福音樂。這些是校方公布的課程安排，實際年級頻率可在參觀時確認。", sourceUrl: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
      { label: "數學以生活情境和教具呈現", value: "校方描述使用蒙特梭利教具協助幼兒把抽象數學概念連到生活。家長可了解K1至K3如何逐步調整教具操作、語文活動和書寫要求。", sourceUrl: "https://www.tkomkg.edu.hk/?lang=zh&page_id=40" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "lock-tao-christian-kindergarten-554901", name: "基督教樂道幼稚園", nameEn: "LOCK TAO CHRISTIAN KINDERGARTEN", district: "西貢區", address: "新界將軍澳健明邨彩明商場1號平台1號幼稚園校舍", telephone: "27069951", schoolNumber: "554901", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；上午、下午及全日班按2026/27概覽", website: "https://kindergarten.locktao.org/", dataYear: "教育局概覽：2026/27；校方公告：2026；質素評核材料：2018-20", sourceNote: "校方2026年公告記錄探索式學習及多元文化活動；較完整的教育局質素評核資料為2018-20週期，作歷史背景而非現屆成效證明。學校自述重視非華語學生，不代表每名學生均使用相同支援服務。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號554901、彩明商場校址及類別。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5549010001" },
      { label: "基督教樂道幼稚園官方網站", scope: "校方2026年活動公告、學校定位與聯絡資料。", url: "https://kindergarten.locktao.org/" },
      { label: "校方探索式學習公告", scope: "2026年校方對教師專業發展及探索式學習的說明。", url: "https://kindergarten.locktao.org/article/1341" },
      { label: "教育局2018-20質素評核報告", scope: "歷史評核觀察，不能代表目前教學成效。", url: "https://kindergarten.locktao.org/upload/2020/09/e6e2eb700e47a617e1c327053e16899a.pdf" },
    ],
    detailSections: [{ title: "多元文化校園與探索學習", featured: true, note: "現行課程頁資料有限；以下區分2026年公告和歷史評核，避免把過往觀察當成現況。", details: [
      { label: "校方公開重視多元文化及非華語學生", value: "學校首頁列出來自多個國家和地區的學生，並公布中華文化開放日及幼小交流活動。這可作校園多元文化取向的參考，不能代替各班語言支援人手和服務時數資料。", period: "校方公告查核：2026-10", sourceUrl: "https://kindergarten.locktao.org/" },
      { label: "校方2026年提及探索式學習專業發展", value: "校方公告稱校長獲委任為賽馬會『智・幼・趣』計劃第二階段探索式學習教育大使。這是教師專業發展及校方參與資訊，不是對全校學習成效的獨立評級。", period: "2026年公告", sourceUrl: "https://kindergarten.locktao.org/article/1341" },
      { label: "舊評核報告只用作歷史參考", value: "教育局可讀評核文件涵蓋2018至2020週期。家長若要判斷目前課堂中的自主探索、語言及非華語支援，應直接向學校索取2026/27安排。", period: "2018-20（歷史評核）", sourceUrl: "https://kindergarten.locktao.org/upload/2020/09/e6e2eb700e47a617e1c327053e16899a.pdf" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "yuen-long-church-church-of-christ-in-china-long-ping-estate-chan-kwong-kindergarten-158500", name: "中華基督教會元朗堂朗屏邨真光幼稚園", nameEn: "YUEN LONG CHURCH (CCC) LONG PING ESTATE CHAN KWONG KINDERGARTEN", district: "元朗區", address: "新界元朗朗屏邨喜屏樓地下", telephone: "24759462", schoolNumber: "158500", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；上午、下午及全日班按2026/27概覽", website: "https://www.lpeckk.edu.hk/", dataYear: "教育局概覽：2026/27；校方課程與2025/26發展計劃：校方現行網站", sourceNote: "校方課程頁列生命教育、繪本、戲劇、自由遊戲和兩文三語；這是學校的課程自述。校方發展計劃涵蓋2025-27項目，未把計劃目標寫成幼兒已取得的學習成效。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號158500、朗屏邨喜屏樓校址及類別。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1585000001" },
      { label: "校方課程介紹", scope: "生命教育、自由遊戲、身體故事及兩文三語課程。", url: "https://www.lpeckk.edu.hk/?page_id=1015" },
      { label: "校方2025/26發展計劃", scope: "該年度發展項目及活動方向。", url: "https://www.lpeckk.edu.hk/%E5%AD%B8%E6%A0%A1%E7%89%B9%E8%89%B2/%E6%88%91%E5%80%91%E7%9A%84%E8%AA%B2%E7%A8%8B/%E5%B9%B4%E5%BA%A6%E9%87%8D%E9%BB%9E%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83/2025-2026%E5%B9%B4%E5%BA%A6/" },
      { label: "校方2026/27入學申請", scope: "2026/27招生流程和申請資料；僅適用該屆。", url: "https://www.lpeckk.edu.hk/wp-content/uploads/2025/09/2026-2027%E5%B9%B4%E5%BA%A6%E6%8B%9B%E7%94%9F%E6%96%B0%E7%94%9F%E5%85%A5%E5%AD%B8%E7%94%B3%E8%AB%8B%E8%AB%8B%E5%BA%8F_CHI2_NEW.pdf" },
    ],
    detailSections: [{ title: "生命教育、自由遊戲與語言", featured: true, note: "校方按不同課程說明學習方式；概覽的粵語授課欄不代表英語及普通話課時。", details: [
      { label: "生命教育以四個生活向度組織", value: "校方以『我與自己、我與他人、我與大自然、我的生活』為主題框架，結合繪本和戲劇教學，並設自由遊戲和身體故事課。家長可觀察孩子是否有選擇、表達及同伴互動的機會。", sourceUrl: "https://www.lpeckk.edu.hk/?page_id=1015" },
      { label: "校方列兩文三語循序教學", value: "學校介紹趣味互動、情境化及循序漸進的語文安排；教育局概覽授課語言欄列粵語。公開頁沒有逐語言週課時，因此不能據此判定英語或普通話在每日課程中的比重。", sourceUrl: "https://www.lpeckk.edu.hk/?page_id=1015" },
      { label: "2025-27自然表達藝術計劃屬發展項目", value: "校方年度發展計劃記錄申請優質教育基金推行『樂在自然』幼兒表達藝術計劃。這是項目方向，具體參與班級、頻率和成果需看校方後續公告。", period: "2025-2027發展計劃", sourceUrl: "https://www.lpeckk.edu.hk/%E5%AD%B8%E6%A0%A1%E7%89%B9%E8%89%B2/%E6%88%91%E5%80%91%E7%9A%84%E8%AA%B2%E7%A8%8B/%E5%B9%B4%E5%BA%A6%E9%87%8D%E9%BB%9E%E7%99%BC%E5%B1%95%E8%A8%88%E5%8A%83/2025-2026%E5%B9%B4%E5%BA%A6/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "the-salvation-army-chan-kwan-tung-kindergarten-325198", name: "救世軍陳昆棟幼稚園", nameEn: "THE SALVATION ARMY CHAN KWAN TUNG KINDERGARTEN", district: "油尖旺區", address: "九龍油麻地永星里11號救世軍總部地下及1樓", telephone: "23847831", schoolNumber: "325198", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；上午及下午班按2026/27概覽", website: "https://www.salvationarmy.org.hk/esd/cktkg/", dataYear: "教育局概覽：2026/27；可讀詳細課程資料：2023/24；校方活動頁查核：2026-10", sourceNote: "校方公開頁可核對學校身份、活動和招生資料；較完整的課程說明出自2023/24《幼稚園概覽》，已標示歷史年度。不可把救助軍其他幼稚園的課程直接套用至本校。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號325198、油麻地校址及類別。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3251980001" },
      { label: "救世軍陳昆棟幼稚園活動頁", scope: "學校活動、地址及聯絡資料。", url: "https://www.salvationarmy.org.hk/esd/cktkg/activities-and-events.html" },
      { label: "教育局《幼稚園概覽 2023/24》", scope: "有年份的課程、主題教學及社區活動資料。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/325198c-0001.pdf" },
      { label: "救世軍教育服務", scope: "辦學團體教育服務使命，不代表本校個別課程成效。", url: "https://salvationarmy.org.hk/esd/hk/" },
    ],
    detailSections: [{ title: "綜合活動與閱讀經驗", featured: true, note: "課程細節取自有年份的官方概覽；活動頁不等於完整現行課程表。", details: [
      { label: "2023/24概覽列故事、專題和社區活動", value: "當年度校方資料記錄按兒童興趣和生活經驗設計主題，以故事綜合教學和專題研習延伸，並安排參觀及社區活動。這些是2023/24校方申報內容，不代表每學年頻率相同。", period: "2023/24（歷史課程資料）", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/325198c-0001.pdf" },
      { label: "校方列活動以豐富幼兒經驗", value: "校方活動頁列主題參觀、旅行、話劇及攤位遊戲等活動。活動剪影證明校方曾安排相關體驗，不能推算每名學生的參與次數或學習成效。", sourceUrl: "https://www.salvationarmy.org.hk/esd/cktkg/activities-and-events.html" },
      { label: "招生時可先確認候補及班別", value: "校方申請表提示家長報名前可先查詢輪候情況，並分上午／下午及K1至K3申請。該表格只說明表格欄位和申請注意事項；最新名額、輪候及費用須按當屆通知確認。", sourceUrl: "https://salvationarmy.org.hk/esd/cktkg/cms/sites/default/files/web/ApplicationForm_CKTKG.final1_.pdf" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "po-leung-kuk-mrs-fong-wong-kam-chuen-kindergarten-516309", name: "保良局方王錦全幼稚園", nameEn: "PO LEUNG KUK MRS FONG WONG KAM CHUEN KINDERGARTEN", district: "觀塘區", address: "九龍油塘高超道高俊苑C座地下", telephone: "23482144", schoolNumber: "516309", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；上午、下午及全日班按2026/27概覽", website: "https://www.plkkgs.edu.hk/plkfwkckg/", dataYear: "教育局概覽：2026/27；校方課程及招生公告：2026-27、2027-28", sourceNote: "校方列主題、探索和沉浸式語言環境、科技探知遊戲、自主區角及正向教育；每班英語教師／非華語助教配置按校方頁面描述，不代表固定的英語授課比例。2027/28招生資訊已發布，申請安排按該屆理解。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號516309、油塘高俊苑校址與類別。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5163090001" },
      { label: "校方學校簡介及課程編排", scope: "辦學宗旨、主題活動、正向教育及英語支援方式。", url: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
      { label: "校方2027/28招生公告", scope: "該屆K1招生及簡介會資訊。", url: "https://www.plkkgs.edu.hk/plkfwkckg/" },
      { label: "保良局學校服務介紹", scope: "校方團體2026/27服務及共融文化介紹。", url: "https://www.poleungkuk.org.hk/en/service/education/plkfwkckg20240926" },
    ],
    detailSections: [{ title: "探索活動、正向教育與語言環境", featured: true, note: "校方公布的是教學設計與資源配置；家長仍需了解孩子所在班級的實際安排。", details: [
      { label: "主題活動和區角讓幼兒參與探索", value: "校方稱按幼兒興趣、能力和生活經驗設計主題活動，配合探索、沉浸式語言環境、科技探知遊戲和區角自主學習。這些是校方列出的教學方式，並非每名幼兒學習成果的保證。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
      { label: "正向教育和入學適應有具體活動", value: "校方介紹以正向故事、正向區角和親子活動培養面對挑戰的態度，並提供已報名幼兒參與的免費英語遊戲班及入學前適應班。家長宜確認當屆名額、日期和適用對象。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
      { label: "英語支援安排不等於英語沉浸", value: "校方稱每班有三位老師，至少一位英語專科導師或非華語助教，透過課堂遊戲和日常互動接觸英語。頁面未提供每週語言課時或各班人手配置，應按孩子所申請班別查問。", sourceUrl: "https://www.plkkgs.edu.hk/plkfwkckg/hk/about/10" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "lick-hang-kindergarten-155705", name: "力行幼稚園", nameEn: "LICK HANG KINDERGARTEN", district: "離島區", address: "新界大嶼山梅窩南便圍3號；另有鄉事會路72-74號C、D座地下校址", telephone: "29848239", schoolNumber: "155705", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；同校兩個登記校址，概覽班制須按校址分開核對", website: "https://www.lickhang.edu.hk/", dataYear: "教育局位置及登記資料：2026-09／2026-10；校方課程和支援頁：2026-10查閱；概覽：2026/27", sourceNote: "教育局列正校0001及分校0002兩個校址；本頁把兩址同校關係列明，概覽數字按址分開。校方介紹專題研習、自由遊戲、戶外社區學習、每月Messy Play及非華語廣東話支援，不把服務描述推為每名學生的固定個別配額。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號155705及兩個登記校址0001、0002。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "正校及分校登記資料；資料截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "教育局《幼稚園概覽 2026/27》校址0001", scope: "正校班制、語言、師生比例和費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1557050001" },
      { label: "教育局《幼稚園概覽 2026/27》校址0002", scope: "分校班制、語言、師生比例和費用欄；不可與0001混用。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1557050002" },
      { label: "校方學習與教學模式", scope: "專題研習、自由遊戲、戶外體驗、閱讀和體能活動。", url: "https://www.lickhang.edu.hk/zh-hant/%E5%AD%B8%E7%BF%92-%E6%95%99%E5%AD%B8%E6%A8%A1%E5%BC%8F%E5%8F%8A%E6%B4%BB%E5%8B%95/" },
      { label: "校方非華語支援措施", scope: "校方列出的廣東話遊戲學習、師資培訓和支援方式。", url: "https://www.lickhang.edu.hk/zh-hant/%E9%9D%9E%E8%8F%AF%E8%AA%9E%E6%94%AF%E6%8F%B4%E6%8E%AA%E6%96%BD/" },
    ],
    detailSections: [{ title: "梅窩兩校址與生活化學習", featured: true, note: "班制、師生比例和費用必須按0001正校或0002分校分別核對。", details: [
      { label: "學校編號下有兩個登記校址", value: "教育局列南便圍3號正校及鄉事會路72-74號C、D座分校。兩址不能當作一個課室或同一班制；查詢接送、入讀地點和概覽數據時，應先確認孩子就讀哪個校址。", sourceUrl: EDB_LOCATION },
      { label: "專題研習連結幼兒生活經驗", value: "校方稱課程從幼兒興趣和生活經驗出發，透過提問、觀察、討論和動手實驗進行專題研習，並結合自由遊戲、小組互動及社區戶外體驗。家長可查看孩子如何從觀察延伸至表達或作品。", sourceUrl: "https://www.lickhang.edu.hk/zh-hant/%E5%AD%B8%E7%BF%92-%E6%95%99%E5%AD%B8%E6%A8%A1%E5%BC%8F%E5%8F%8A%E6%B4%BB%E5%8B%95/" },
      { label: "非華語支援以遊戲和生活情境建立廣東話", value: "校方介紹角色扮演、故事、圖卡及生活用語等活動，並稱教師接受相關培訓、按幼兒語言程度調整輸入。這是校方服務方式的說明；個別支援頻率和兩校址安排須向校方確認。", sourceUrl: "https://www.lickhang.edu.hk/zh-hant/%E9%9D%9E%E8%8F%AF%E8%AA%9E%E6%94%AF%E6%8F%B4%E6%8E%AA%E6%96%BD/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "tsuen-wan-baptist-church-kindergarten-158496", name: "荃灣浸信會幼稚園", nameEn: "TSUEN WAN BAPTIST CHURCH KINDERGARTEN", district: "荃灣區", address: "新界荃灣青山道99號地下及2樓", telephone: "24133819", schoolNumber: "158496", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；上午、下午及全日班按2026/27概覽", website: "https://www.tsuenwanbckg.edu.hk/", dataYear: "教育局概覽：2026/27；校方課程、支援及招生：2026-27、2027-28", sourceNote: "校方課程頁列基督教德育、自由遊戲、戲劇、閱讀、肢體協調及戶外體驗；2027/28 K1入學資料另列申請流程及非華語面談支援。課程介紹是校方自述，活動安排按年度確認。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號158496、荃灣青山道校址及學校類別。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例和費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1584960001" },
      { label: "荃灣浸信會幼稚園官方網站", scope: "辦學使命、課程架構和校方公告。", url: "https://www.tsuenwanbckg.edu.hk/" },
      { label: "校方基督教教育及德育課程", scope: "校方對宗教教育、德育故事和日常活動的介紹。", url: "https://www.tsuenwanbckg.edu.hk/%E6%88%91%E5%80%91%E7%9A%84%E8%AA%B2%E7%A8%8B/%E6%A0%A1%E6%9C%AC%E8%AA%B2%E7%A8%8B/%E5%9F%BA%E7%9D%A3%E6%95%99%E6%95%99%E8%82%B2/" },
      { label: "校方2027/28入學申請", scope: "該屆K1申請、報名費及非華語面談支援。", url: "https://www.tsuenwanbckg.edu.hk/%E6%94%B6%E7%94%9F%E7%B0%A1%E4%BB%8B/%E7%94%B3%E8%AB%8B%E8%A9%B3%E8%AB%8B/" },
      { label: "校方非華語兒童支援措施", scope: "校方列出的教師培訓和校園融入支援。", url: "https://www.tsuenwanbckg.edu.hk/%E5%AD%B8%E6%A0%A1%E7%B0%A1%E4%BB%8B/%E9%9D%9E%E8%8F%AF%E8%AA%9E%E5%85%92%E7%AB%A5%E6%94%AF%E6%8F%B4%E6%8E%AA%E6%96%BD/" },
    ],
    detailSections: [{ title: "基督教德育、自由遊戲與家庭配合", featured: true, note: "學校特色是校方公布的課程方向；申請和支援條件按當屆文件核對。", details: [
      { label: "校方把品德教育放入日常活動", value: "學校透過崇拜、早午會、聖經故事、話劇和德育活動談感恩、關懷及生活品德。重視基督教教育的家庭可了解活動頻率，也可確認家庭宗教背景是否影響申請。", sourceUrl: "https://www.tsuenwanbckg.edu.hk/%E6%88%91%E5%80%91%E7%9A%84%E8%AA%B2%E7%A8%8B/%E6%A0%A1%E6%9C%AC%E8%AA%B2%E7%A8%8B/%E5%9F%BA%E7%9D%A3%E6%95%99%E6%95%99%E8%82%B2/" },
      { label: "課程包括自由遊戲與戲劇教育", value: "校方課程架構另設小跳豆肢體協調、戲劇、自由遊戲、閱讀計劃和戶外體驗。家長可在簡介會詢問一天中教師帶領活動與幼兒自主遊戲如何平衡。", sourceUrl: "https://www.tsuenwanbckg.edu.hk/" },
      { label: "2027/28提供非華語面談支援資訊", value: "校方當屆申請頁稱非華語幼兒可由懂中文的親友陪同面談；如需傳譯或翻譯服務，家長應先聯絡學校。這是2027/28申請安排，不可外推至其他屆別。", period: "2027/28 K1招生", sourceUrl: "https://www.tsuenwanbckg.edu.hk/%E6%94%B6%E7%94%9F%E7%B0%A1%E4%BB%8B/%E7%94%B3%E8%AB%8B%E8%A9%B3%E8%AB%8B/" },
    ] }],
  },
];
