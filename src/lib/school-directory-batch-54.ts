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

/** Kindergarten profile batch 54: official, dated school and EDB evidence. */
export const KINDERGARTEN_BATCH_54: PilotSchool[] = [
  profile("528161", "按教育局校號528161及田灣邨田健樓校址識別。課程方向引用東華三院幼稚園教育介紹，田灣校方頁的招生內容含舊年度資訊，不把過期日期當成本屆安排。", "https://www.twghtwkg.edu.hk/", [
    { label: "東華三院田灣幼稚園：校方網站及課程介紹", scope: "田灣校舍身分、活動入口及課程介紹；招生日期需依當屆公告。", url: "https://www.twghtwkg.edu.hk/收生指南/" },
    { label: "東華三院：幼稚園教育理念", scope: "辦學團體公布的遊戲、繪本、探索及全人發展方向；屬機構層面介紹。", url: "https://www.tungwah.org.hk/education/overview-of-tung-wah-schools/kindergarten-education/" },
    { label: "教育局：學校註冊搜尋", scope: "校號528161及登記校址。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=528161000111" },
  ], [{ title: "繪本引導與生活探索", featured: true, details: [
    { label: "辦學團體以遊戲和繪本連接幼兒生活經驗", value: "東華三院幼稚園教育介紹把遊戲中學習、繪本教學、創意藝術、德育與群性發展等列為課程方向；田灣校方亦展示自然探索和繪本教學短片。對喜歡故事、觀察和動手活動的孩子，這提供了可觀察的課程線索；機構理念不等於每校每級的實際課時，家長應在參觀時確認田灣校舍當屆的主題和活動安排。", sourceUrl: "https://www.tungwah.org.hk/education/overview-of-tung-wah-schools/kindergarten-education/" },
    { label: "自然探索活動可作觀察點，不代表每年固定安排", value: "校方頁面展示「大自然寶藏探索之旅」及繪本教學介紹，但沒有公開活動頻率、每級參與比例或本年度完整日程。若家長重視戶外體驗，可詢問活動是否按級別舉行、交通和費用如何安排，以及幼兒在活動中有多少自主探索時間。", sourceUrl: "https://www.twghtwkg.edu.hk/收生指南/" },
  ] }]),

  profile("542296", "按教育局校號542296及東涌逸東邨2號停車場4樓識別。官方可核實地址及2025年9月生效的費用證明；課程細節採用2020/21校方報告並標明年期，不推定為現屆完整做法。", "https://www.tcbaptkg.edu.hk/", [
    { label: "東涌浸信會幼稚園：校方首頁", scope: "校址、聯絡方式、校園導賞及校務入口。", url: "https://www.tcbaptkg.edu.hk/" },
    { label: "東涌浸信會幼稚園：2020/21學校報告", scope: "該年度的兒童本位及遊戲教學描述；屬歷史辦學材料。", url: "https://www.tcbaptkg.edu.hk/wp-content/uploads/2021/09/整合2-2.pdf" },
    { label: "教育局：2025/26收費證明書", scope: "全日班學費和膳食費；只適用於2025/26。", url: "https://applications.edb.gov.hk/schoolsearch/schoolfee/542296.pdf" },
  ], [{ title: "兒童本位與遊戲學習", featured: true, note: "課程細節引用校方2020/21學校報告，應向校方確認當屆更新。", details: [
    { label: "校方報告曾以遊戲教學和兒童本位設計課程", value: "2020/21學校報告記錄學校以兒童為本，透過遊戲教學推進課程，並按幼兒發展需要規劃學習經驗。這份材料可說明當年的課程取向，不能當作2026/27每週課表或現屆教學成效。若這種教學方式是你選校的關鍵，建議索取最新課程簡介並觀察教師怎樣從遊戲延伸語言、數概念和合作。", period: "校方報告：2020/21", sourceUrl: "https://www.tcbaptkg.edu.hk/wp-content/uploads/2021/09/整合2-2.pdf" },
    { label: "全日班費用須把學費和膳食分開計算", value: "教育局收費證明書列出2025年9月生效的全日班學費每月998元，膳食費每月362元，合計每月1,360元，適用期為該證明書所列學年。這是歷史收費參考，不應直接當作2026/27報價；報名或比較預算前要向學校索取當屆核准收費表。", period: "教育局收費證明：2025/26", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/schoolfee/542296.pdf" },
  ] }]),

  profile("519103", "按教育局校號519103及青衣宏福花園4座校址識別宏福中英文幼稚園。校方現行頁面與教育局質素評核報告均指向該校址；質素評核描述標明來源年期，不延伸為現況評級。", "https://www.kindergarten.edu.hk/tivoli-anglo-chinese-kindergarten?lang=zh", [
    { label: "宏福中英文幼稚園：Tivoli校舍頁", scope: "校址、K1至K3、自由探索、探究式學習和活動介紹。", url: "https://www.kindergarten.edu.hk/tivoli-anglo-chinese-kindergarten?lang=zh" },
    { label: "教育局：宏福中英文幼稚園質素評核報告", scope: "質素評核當時的主題、繪本、考察和學習歷程描述；按原報告理解。", url: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Tivoli_AC.pdf" },
  ], [{ title: "自由探索與生活化主題", featured: true, details: [
    { label: "校方把自由探索和探究式學習列作現行課程特色", value: "宏福校舍頁以自由探索、探究式學習和大肌肉活動介紹課程，並列出K1至K3及親子活動。這些是校方自述的方向；家長可進一步觀察孩子能否自己選擇材料、教師如何引導發問，以及探索活動如何回到語文、數感和生活主題。", sourceUrl: "https://www.kindergarten.edu.hk/tivoli-anglo-chinese-kindergarten?lang=zh" },
    { label: "教育局報告記錄繪本、主題和親子考察的連結", value: "教育局質素評核報告描述學校以幼兒興趣和生活經驗設計主題，透過繪本引入活動，並安排考察讓兒童觀察社區、記錄發現和分享。這是評核時的觀察，不代表每學年固定行程；家長宜查詢當屆考察安排、家長參與要求和額外支出。", sourceUrl: "https://www.edb.gov.hk/attachment/sc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Tivoli_AC.pdf" },
  ] }]),

  profile("325970", "按教育局校號325970及中環羅便臣道10號2至5樓識別嘉諾撒聖心幼稚園，不與同址其他聖心學校混為一談。語言、班制與全人教育依校方幼稚園頁；費用等年度欄位以教育局概覽為準。", "https://www.shck.edu.hk/?lang=zh", [
    { label: "嘉諾撒聖心幼稚園：幼稚園資料", scope: "幼稚園班制、主要授課語言、師生比例及年度收費。", url: "https://www.shck.edu.hk/?lang=en&page_id=13438" },
    { label: "嘉諾撒聖心幼稚園：教學模式", scope: "兒童本位、故事教學、探索及持續觀察評估的校方描述。", url: "https://www.shck.edu.hk/?lang=en&page_id=13439" },
    { label: "教育局：嘉諾撒聖心幼稚園質素評核報告", scope: "2024年1月評核內容；不是排名或現屆保證。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/SacredHeart_Canossian.pdf" },
  ], [{ title: "故事教學與多語接觸", featured: true, details: [
    { label: "故事教學把語文放進探索和遊戲情境", value: "校方以兒童本位設計課程，透過經驗、探索、討論、觀察和記錄培養興趣與信心，並以故事作為課程骨幹，延伸遊戲活動和語言學習。對喜歡聽故事和表達的孩子，這有助家長觀察其參與方式；如孩子需要較多個別引導，可問清教師如何記錄進展和跟進不同步伐。", sourceUrl: "https://www.shck.edu.hk/?lang=en&page_id=13439" },
    { label: "主要以粵語授課，英語和普通話作補充", value: "校方資料列明主要授課語言為粵語，並以英語和普通話補充；公開頁沒有列出逐科課時，因此不能據此推斷每日英語或普通話時數。若家庭有明確語言目標，參觀時應索取目標級別時間表並確認日常活動中的實際語言使用。", sourceUrl: "https://www.shck.edu.hk/?lang=en&page_id=13438" },
  ] }]),

  profile("326011", "按教育局校號326011及筲箕灣耀東邨耀富樓校址識別。課程方法與非華語支援引用學校簡介；時間及費用有年度差異，正文不沿用舊年度招生日期。", "https://www.yiutung-bapkg.edu.hk/", [
    { label: "耀東浸信會幼稚園：學校簡介及課程特色", scope: "辦學宗旨、主題活動、互動建構、啟發式教學、全日班特色及非華語支援。", url: "https://www.yiutung-bapkg.edu.hk/?page_id=6" },
    { label: "耀東浸信會幼稚園：學校報告", scope: "年度學校報告及計劃入口；個別數據須按報告年份引用。", url: "https://www.yiutung-bapkg.edu.hk/?page_id=3027" },
  ], [{ title: "主題活動與互動建構", featured: true, details: [
    { label: "主題教學以遊戲整合內容，教師與幼兒共同建構", value: "校方介紹主題活動教學會把不同範疇與主題連結，並透過師生互動設計活動；啟發式教學則以實物引導注意、思考、記憶和創造。全日班另列LEGO STEM、混齡活動、水墨畫和小食體驗。這些是學校公布的課程項目，不代表每個班別每週都有相同頻次，家長可確認半日與全日班的差別。", sourceUrl: "https://www.yiutung-bapkg.edu.hk/?page_id=6" },
    { label: "學校設有非華語學生語文支援，但服務對象需按校方確認", value: "校方表示會為錄取的非華語學生安排額外語文支援，包括翻譯、義工溝通和教材。此描述沒有列明名額、服務時數或所有年級的實施細節；如家庭需要相關支援，申請前應直接確認語言種類、安排方式及家校溝通渠道。", sourceUrl: "https://www.yiutung-bapkg.edu.hk/?page_id=6" },
  ] }]),

  profile("325678", "按教育局校號325678及黃大仙下邨龍逸樓校址識別。課程資料採用校方現行課程與年度關注事項；校史頁較早更新，創校年份不作本頁重點。", "https://bfhkwts.edu.hk/", [
    { label: "佛教傅康幼稚園：校方首頁及課程資料", scope: "辦學宗旨、年度關注事項及各級課程介紹。", url: "https://bfhkwts.edu.hk/" },
    { label: "佛教傅康幼稚園：校園簡介", scope: "辦學團體、非牟利背景及校方教育使命。", url: "https://www.bfhkwts.edu.hk/about-us/" },
  ], [{ title: "感官探索與自主學習", featured: true, details: [
    { label: "校方把好奇心和探索列為本年度課程關注", value: "校方首頁列出本年度關注事項為優化校本課程、提升幼兒好奇心及探索精神；課程介紹按不同年齡階段安排感官接觸、觀察和操作，逐步建立自主學習。這反映學校目前公開的方向，家長可參觀時留意活動是否讓孩子動手、提問和重試，而不只看成果作品。", sourceUrl: "https://bfhkwts.edu.hk/" },
    { label: "佛教辦學方向著重慈悲與品德，家庭可了解日常呈現方式", value: "校方以佛陀慈悲精神和「明、智、顯、悲」校訓說明辦學方向。宗教背景不表示幼兒須已有特定信仰；如家長關心宗教活動內容，可向學校了解故事、節日和日常品德教育如何安排，以及是否有不同信仰家庭的溝通方式。", sourceUrl: "https://www.bfhkwts.edu.hk/about-us/" },
  ] }]),

  profile("321192", "按教育局校號321192及九龍睦鄰街校址識別路德會救恩幼稚園。課程與語文方向引用校方現行特色頁；歷史年份資料不延伸推算現行班制或收生難度。", "https://www.rlk.edu.hk/", [
    { label: "路德會救恩幼稚園：課程特色", scope: "班本探索、聖經品格教育及語文發展。", url: "https://www.rlk.edu.hk/" },
    { label: "路德會救恩幼稚園：辦學宗旨與歷史", scope: "校方公布的辦學背景、兒童本位和六育發展方向。", url: "https://www.rlk.edu.hk/辦學宗旨/" },
  ], [{ title: "班本探索與品格教育", featured: true, details: [
    { label: "探索課題由幼兒興趣和能力出發", value: "校方介紹鼓勵幼兒以小組活動進行班本探索，按孩子興趣和能力開展主題課題；辦學宗旨亦強調以幼兒為中心，讓孩子在愉快學習中主動探索、溝通和解決問題。這種安排可能較依賴孩子參與討論和小組互動，家長可觀察教師怎樣支援慢熱幼兒，並如何平衡自選探索與教師示範。", sourceUrl: "https://www.rlk.edu.hk/" },
    { label: "聖經品格教育是辦學內容之一，宜先了解家庭適配", value: "校方把聖經品格教育列為課程特色，目標包括關愛、合群及愛護自然。這是校方的宗教教育方向；若家長重視日常宗教活動或家庭信仰適配，可在面談時了解故事、祈禱、節日和家長參與方式，再判斷與家庭期待是否相符。", sourceUrl: "https://www.rlk.edu.hk/" },
  ] }]),

  profile("319775", "按教育局校號319775及觀塘花園大廈玉蓮臺第三座校址識別。引用最近可取得的2024/25校方報告及2025/26發展計劃，所有成效數字與流程均限於原報告年度。", "https://www.ktmk.edu.hk/", [
    { label: "觀塘循道幼稚園：2024/25學校報告及2025/26發展計劃", scope: "學習歷程檔案、持續評估和家校溝通；校方報告數據限於相應年度。", url: "https://www.ktmk.edu.hk/wp-content/uploads/2025/10/2024-2025學校報告及2025-2026學校發展計劃.pdf" },
    { label: "觀塘循道幼稚園：官方首頁", scope: "校址、校務公告及學校背景。", url: "https://www.ktmk.edu.hk/" },
  ], [{ title: "學習歷程記錄與家校跟進", featured: true, details: [
    { label: "學校報告記錄以學習檔案追蹤多個發展面向", value: "2024/25校方報告提及兒童學習歷程檔案會收錄主題學習、英文、體能、作品和學期評估等資料，並安排教師觀察、分析和向家長分享。這可幫助家庭了解孩子在校表現，但報告內的家長和教師問卷比例只代表該年度受訪樣本；家長可確認當屆檔案多久更新、如何討論個別進展。", period: "校方報告：2024/25", sourceUrl: "https://www.ktmk.edu.hk/wp-content/uploads/2025/10/2024-2025學校報告及2025-2026學校發展計劃.pdf" },
    { label: "家長參與渠道較多，需評估家庭可投入程度", value: "報告列出家長觀課、家長日、表演和日常溝通等渠道，並描述有特殊學習需要幼兒的家校協作。這有助家庭及早掌握孩子的狀況，同時也意味家長要留意活動通知與跟進建議；若工時或接送安排緊張，可先問清觀課、面談和支援服務的實際頻率。", period: "校方報告：2024/25", sourceUrl: "https://www.ktmk.edu.hk/wp-content/uploads/2025/10/2024-2025學校報告及2025-2026學校發展計劃.pdf" },
  ] }]),

  profile("321087", "按教育局校號321087及北角七姊妹道2至8號2樓識別明慧幼稚園，與同區不同校號的明慧國際幼稚園分開。課程細節來自2023/24教育局概覽，當屆是否仍相同須向校方確認。", "https://www.mingwai.edu.hk/", [
    { label: "明慧幼稚園：北角校舍聯絡頁", scope: "明慧幼稚園與相鄰明慧國際幼稚園地址及電話區分。", url: "https://www.mingwai.edu.hk/contact-us/north-point-campus/" },
    { label: "教育局《幼稚園概覽2023/24》：明慧幼稚園", scope: "學校提供的課程規劃及持續評估資料；屬2023/24版本。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/321087c-0001.pdf" },
  ], [{ title: "雙語教師配置與課程核對", featured: true, note: "本頁只指校號321087、七姊妹道2至8號2樓的明慧幼稚園；不應把旁邊明慧國際幼稚園的課程或招生條件套用過來。", details: [
    { label: "相鄰校舍名稱相近，申請前先核對學校名稱和地址", value: "明慧官方北角校舍頁分別列出明慧幼稚園（七姊妹道2至8號1樓）及明慧國際幼稚園（七姊妹道10至12號地下及1樓等），兩者名稱相似但校號、校址和課程不同。教育局登記的本頁學校地址為2至8號2樓；家長填表和查詢前宜用校號321087確認，避免把國際部資訊混入。", sourceUrl: "https://www.mingwai.edu.hk/contact-us/north-point-campus/" },
    { label: "2023/24概覽曾列多語教師和持續評估，當屆安排要重問", value: "教育局2023/24概覽記錄該校課程曾融合劍橋英語評估，並描述由英語與普通話或粵語教師以雙班主任形式授課，另有日語課程和持續觀察評估。這是舊版學校提供資料，不能當作現屆語言時數或現行課程承諾；若家長重視英語、普通話或日語，應索取2026/27課表和各語言每週時數。", period: "教育局概覽：2023/24", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/321087c-0001.pdf" },
  ] }]),

  profile("214248", "按教育局校號214248及中環堅道129至133號校址識別偉思幼稚園。校方理念和時間資料以官方簡介為準；教育局質素評核報告為2016年材料，不作現況評級。", "https://www.wisely.edu.hk/", [
    { label: "偉思幼稚園：學校簡介", scope: "創校、班級、上課時段和學校基本資料；費用依當屆教育局批核。", url: "https://www.wisely.edu.hk/學校簡介/" },
    { label: "偉思幼稚園：辦學理念", scope: "啟發愛心、思維、潛能和創造力的校方教育理念。", url: "https://www.wisely.edu.hk/en/our-philosophy/" },
    { label: "教育局：偉思幼稚園質素評核報告", scope: "2016年評核報告；作歷史參考，不代表現況評級。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/Wisely.pdf" },
  ], [{ title: "啟發思維與多元潛能", featured: true, details: [
    { label: "校方以活動學習培養思考和創造力", value: "校方把啟發愛心、思維、潛能和創造力列為理念，並描述以活動式學習支持孩子探索、判斷、組織和創作；學校亦設創意空間展示幼兒作品。這是學校的教育目標，不等於每名孩子都會有相同成果。參觀時可觀察孩子是否有選擇材料和反覆嘗試的時間，以及教師如何回應不同興趣。", sourceUrl: "https://www.wisely.edu.hk/en/our-philosophy/" },
    { label: "官網涵蓋幼兒園和幼稚園，報名前須確認服務類別", value: "學校官方簡介同時列幼兒小組N1及K1至K3，也分上午、下午和全日服務；教育局校號214248對應本頁幼稚園登記。不同年齡和服務類別的收費、註冊和名額不能混為一談，尤其全日幼兒服務並非幼稚園教育計劃下的半日K班費用。", sourceUrl: "https://www.wisely.edu.hk/學校簡介/" },
  ] }]),
];
