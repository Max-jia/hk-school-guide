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
  overrides: Partial<Pick<PilotSchool, "name" | "nameEn">> = {},
): PilotSchool {
  const school = registered.find((item) => item.stage === "kindergarten" && item.schoolNumber === schoolNumber);
  if (!school) throw new Error(`Registered kindergarten ${schoolNumber} not found`);
  const overviewSections = (school.detailSections || []).filter((section) => section.title.includes("幼稚園概覽"));
  return {
    ...school,
    ...overrides,
    website,
    sourceNote: `${school.sourceNote} ${sourceNote}`,
    replaceDirectoryDetails: true,
    replaceDirectorySources: true,
    sources: [...new Map([
      ...school.sources,
      { label: "DATA.GOV.HK 教育局學校位置資料集", scope: "教育局學校位置資料集的版本與更新背景。", url: DATASET },
      { label: "教育局《學校基本註冊資料》", scope: `校號${schoolNumber}的登記資料；本地名錄快照截至2026-10-23。`, url: EDB_REGISTRY },
      ...extraSources,
    ].map((source) => [source.url, source])).values()],
    detailSections: (school.registryLocations || 0) > 1 ? details : [...details, ...overviewSections],
  };
}

/** Kindergarten profile batch 48: registered identities paired with school-published details. */
export const KINDERGARTEN_BATCH_48: PilotSchool[] = [
  profile("528625", "按教育局校號528625及黃大仙沙田坳道校址識別。校方2025/26教育目標與現行課程策劃頁分開引用；課程頁沒有公布各語言每週課時。", "https://www.olk.edu.hk/", [
    { label: "聖母幼稚園：課程策劃及編排", scope: "校本綜合課程、幼兒興趣及生活經驗如何納入課程。", url: "https://www.olk.edu.hk/CP/pG/10/9/16" },
    { label: "聖母幼稚園：學校特色", scope: "宗教、生命及德育培育方向；頁面列出2025/26教育目標。", url: "https://www.olk.edu.hk/CP/pG/4/4/10" },
    { label: "聖母幼稚園：班級編制及上課時間", scope: "班級、半日／全日及校方公布的課堂時段。", url: "https://www.olk.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=34&pageId=21&webPageId=16" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址的班制、語言、師生比例及學費欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5286250001" },
  ], [{ title: "綜合探索、生命教育與群體生活", featured: true, note: "課程及價值教育依校方介紹；培育重點所引教育目標為2025/26年度，實際語言課時及班級安排應查當屆資料。", details: [
    { label: "以幼兒經驗設計綜合課程，重點在探索而非單科操練", value: "校方表示教師依循教育局學前課程指引，按幼兒能力、興趣和生活經驗設計校本綜合課程，並用多元活動推動螺旋式學習。對希望孩子先理解、表達和嘗試的家庭，參觀時可看老師如何把一次探索延伸為後續活動，而不只看課室成品。", sourceUrl: "https://www.olk.edu.hk/CP/pG/10/9/16" },
    { label: "基督徒價值教育落在關懷、感恩與守規等日常目標", value: "校方把生命、德育和靈性培育列為辦學重點，透過公民教育、宗教課和禮儀活動培養幼兒。2025/26目標具體提到友誼、感恩、求助、參與群體及自律；有意申請的家庭可了解宗教活動在一週課程中的安排，判斷是否符合家庭期望。", period: "教育目標：2025/26學年", sourceUrl: "https://www.olk.edu.hk/CP/pG/4/4/10" },
    { label: "半日與全日班並行，選班前要核實實際照顧時段", value: "校方班級資料列有半日班及全日班，並公布全日班由上午至下午的時段。這為需要較長照顧時間的家庭提供另一選項，但頁面沒有交代各級當屆名額；報名時宜確認目標級別是否開全日班、膳食與費用，以及放學接送時間。", sourceUrl: "https://www.olk.edu.hk/CustomPage/paragraphGroup.aspx?nnnid=34&pageId=21&webPageId=16" },
  ] }]),

  profile("536024", "按教育局校號536024及何文田南邨適文樓校址識別。校方課程頁介紹主題教學、繪本設計、戲劇、自由遊戲及兩文三語活動；頁面未列完整語言課時。", "https://www.hmtbck.edu.hk/", [
    { label: "何文田浸信會幼稚園：課程特色", scope: "主題、繪本設計、宗教品格、語言及自由遊戲的校方說明。", url: "https://www.hmtbck.edu.hk/課程特色/" },
    { label: "何文田浸信會幼稚園：官方首頁", scope: "學校公告與校方課程、活動入口。", url: "https://www.hmtbck.edu.hk/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址年度班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5360240001" },
  ], [{ title: "繪本探究、自由遊戲與三語接觸", featured: true, note: "教學特色為校方自述；語言課程與自由遊戲的實際時數未公開，不能據此判定英語或普通話為主導授課語言。", details: [
    { label: "主題教學連接六大範疇，從生活題材引導主動發現", value: "校方把語文、體能健康、數學、自然生活、個人群體及藝術創意整合在主題活動中，並稱按幼兒能力與興趣選題。對喜歡把生活經驗帶進學習的孩子，這種設計能提供多個參與入口；家長可問近期主題如何從提問延伸到觀察、討論或作品。", sourceUrl: "https://www.hmtbck.edu.hk/課程特色/" },
    { label: "繪本設計活動要求孩子搜集、整理和表達想法", value: "校方描述以繪本引出兒童主導的設計活動，讓幼兒搜集資料、分析、討論、動手探究，再把故事連結生活經驗創作戲劇。這比單看「有繪本」更能反映學習過程；參觀時可留意孩子是否有選擇和表達空間，或主要跟隨成人指示完成任務。", sourceUrl: "https://www.hmtbck.edu.hk/課程特色/" },
    { label: "英文及普通話有專科活動，但課時比例未公開", value: "學校稱由外籍英語教師和普通話教師以故事、遊戲、歌曲等進行語言活動，並安排自由遊戲。這證明兩種語言都有接觸渠道，不能推成英語或普通話主導整日教學；如家庭有語言目標，應索取當屆每週時間表並詢問日常照顧用語。", sourceUrl: "https://www.hmtbck.edu.hk/課程特色/" },
  ] }]),

  profile("559768", "按教育局校號559768及將軍澳常寧路校址識別。校方已公布2027/28入學安排；班級面見、兄姊優先考慮及非華語溝通支援均按該校公告描述。", "https://www.sackg.edu.hk/", [
    { label: "天主教聖安德肋幼稚園：2027/28報名須知", scope: "當屆申請材料、面見形式、兄姊優先考慮和註冊安排。", url: "https://www.sackg.edu.hk/it-school/php/webcms/public/index.php?lang=zh&mode=published&refid=1615" },
    { label: "天主教聖安德肋幼稚園：非華語兒童支援", scope: "中文語文環境、課程教具及面見翻譯支援。", url: "https://www.sackg.edu.hk/it-school/php/webcms/public/mainpage/tpl.php?component_id=0&lang=zh&mode=published&refid=1630" },
    { label: "天主教聖安德肋幼稚園：2021/22學校報告", scope: "宗教融入課程與英語活動的歷史記錄；只作該年度背景。", url: "https://www.sackg.edu.hk/it-school/php/webcms/public/mainpage/file_download.php?fileid=136&pdf=1" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5597680001" },
  ], [{ title: "天主教培育、入學面見與中文支援", featured: true, note: "招生程序按校方2027/28公告；較具體的課程例子來自2021/22學校報告，不代表目前活動頻率或成效。", details: [
    { label: "校方對所有申請者安排面見，兄姊只屬優先考慮因素", value: "2027/28報名須知列明會面見所有申請兒童，形式為小組或個別；目前在校兄姊獲優先考慮，另一項收生因素是面見表現。這說明有兄姊並非保證取錄。家長應先按當屆公告備齊材料，並讓孩子熟悉與成人互動和簡單表達需要。", period: "2027/28招生", sourceUrl: "https://www.sackg.edu.hk/it-school/php/webcms/public/index.php?lang=zh&mode=published&refid=1615" },
    { label: "非華語兒童有中文環境與面見溝通支援入口", value: "校方稱以中文語言環境、合適課程和教具、專業教師及同伴互動支援非華語兒童；面見時可按需要安排傳譯或翻譯。這是可查詢的支援安排，不代表每名孩子固定獲得個別教學時數，家庭宜在申請前說明孩子的語言背景和需要。", sourceUrl: "https://www.sackg.edu.hk/it-school/php/webcms/public/mainpage/tpl.php?component_id=0&lang=zh&mode=published&refid=1630" },
    { label: "英語活動例子有年份，不能當成目前課程保證", value: "校方2021/22報告記錄低、高班曾使用英文常見字親子遊戲，並把宗教元素融入課程。這可說明校方當年的做法，但距今已有數年，不能推斷今天仍按相同教材、班級或頻率實施；家長可直接索取現行課程簡介。", period: "校方學校報告：2021/22學年", sourceUrl: "https://www.sackg.edu.hk/it-school/php/webcms/public/mainpage/file_download.php?fileid=136&pdf=1" },
  ] }]),

  profile("316660", "按教育局校號316660及英皇道275號校址識別。校方介紹啟發式小組教學、兩文三語及半日上課時段；未公布各語言的每週課時。", "https://www.zionlutheran.edu.hk/?lang=zh", [
    { label: "路德會錫安堂幼稚園：課程特色", scope: "啟發式小組教學、語言活動及校方公布的上課時段。", url: "https://www.zionlutheran.edu.hk/?page_id=57&lang=zh" },
    { label: "路德會錫安堂幼稚園：學校簡介與聯絡", scope: "校方身份及登記校址、聯絡資料。", url: "https://www.zionlutheran.edu.hk/?lang=zh&page_id=29" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址年度班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3166600001" },
  ], [{ title: "啟發式小組教學與兩文三語", featured: true, note: "教學方向和時段來自校方課程頁；外語活動不等同整日以英語或普通話授課，比例需向學校查詢。", details: [
    { label: "啟發式小組教學以幼兒參與作為課堂入口", value: "校方稱採用啟發式小組教學，目標是促進身、心、靈健康成長。小組安排理論上較容易讓教師看見個別幼兒的反應，但頁面沒有公布組別大小或每日比例；參觀時可觀察教師是否邀請孩子提問、嘗試及輪流表達。", sourceUrl: "https://www.zionlutheran.edu.hk/?page_id=57&lang=zh" },
    { label: "英語及普通話由專業教師設計活動", value: "課程頁說明英語和普通話活動由外籍及普通話導師負責授課和編排，並以輕鬆環境協助幼兒接觸外語。這不代表兩種語言是主導教學語言，因校方沒有公開逐週課時；家長應索取目標年級的時間表再作比較。", sourceUrl: "https://www.zionlutheran.edu.hk/?page_id=57&lang=zh" },
    { label: "半日班時間清楚，全日照顧需求需另作安排", value: "校方公布上午班9時至12時、下午班1時30分至4時30分。若家庭需要全日照顧，不能把上午、下午兩個時段理解為全日班，應向校方確認是否提供其他託管安排及其時段。", sourceUrl: "https://www.zionlutheran.edu.hk/?page_id=57&lang=zh" },
  ] }]),

  profile("595144", "按教育局校號595144及鑽石山龍蟠苑商場校址識別。詳細課程材料引用教育局2023/24概覽中的校方自述，已明確標註學年；校方現行網站仍公開近期校務消息。", "https://www.joninnoschool.hk/", [
    { label: "永樂創新英文幼稚園：官方聯絡資料", scope: "校方公布的龍蟠苑商場KG01地址及聯絡方式。", url: "https://www.joninnoschool.hk/contact_us.php" },
    { label: "教育局《幼稚園概覽2023/24》：校號595144", scope: "2023/24校方自述的主題綜合教學、互動課程及幼兒班教學安排。", url: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/595144c-0001.pdf" },
    { label: "教育局質素評核報告：永樂創新英文幼稚園", scope: "教育局質素評核觀察；只按原報告日期理解。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/JonathanInnovative.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址年度班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5951440001" },
  ], [{ title: "主題綜合課程與數碼互動的歷史資料", featured: true, note: "具體教學方式來自2023/24教育局概覽內校方自述，不能直接視作2026/27現況；目前可讀的官方首頁未提供同等詳細的現行課程說明。", details: [
    { label: "2023/24校方資料記錄主題式綜合教學與平板互動課程", value: "該年度概覽稱課程依循教育局幼稚園課程指引，以主題式綜合教學結合校方平板互動課程和多感官策略。這可作為了解校方曾公開的課程方向，卻不足以證明現屆設備、課時或教材維持不變；參觀時應要求看最新課程簡介及實際課堂示例。", period: "校方資料：2023/24學年", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/595144c-0001.pdf" },
    { label: "幼兒班不執筆寫字的說明同樣限於該年度概覽", value: "2023/24概覽寫明當時不要求幼兒班兒童執筆寫字，也不要求做相關操練。若家庭特別關心學術準備或書寫進度，這項歷史自述值得帶到參觀時核實，但不應當作目前承諾。", period: "校方資料：2023/24學年", sourceUrl: "https://kgp2023.azurewebsites.net/edb/SchoolPDF/595144c-0001.pdf" },
    { label: "現行網站有校務消息，但課程細節需向校方更新確認", value: "校方網站近期仍有校務消息，聯絡頁確認學校位於鑽石山龍蟠苑商場KG01；然而可讀頁面中的詳細課程描述較舊。報名家庭可直接詢問現屆英語教學、電子教材使用方式、評估及書寫安排，避免以舊概覽替代最新資料。", sourceUrl: "https://www.joninnoschool.hk/contact_us.php" },
  ] }]),

  profile("512273", "按教育局校號512273及西營盤高街校址識別，校方正式名稱為救恩學校（幼稚園部），與同址小學部有聯繫。課程細節引用2025/26校方基本資料，班制與費用以網站最新年度資料為準。", "https://www.kauyan.edu.hk/kindergarten/", [
    { label: "救恩學校（幼稚園部）：2025/26學校基本資料", scope: "建構式專題研習、教學語言、人員、班級、師生比例及設施；標明年度。", url: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2025/08/2025-26_%E5%AD%B8%E6%A0%A1%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99.pdf" },
    { label: "救恩學校（幼稚園部）：學校基本資料", scope: "校址、班制、2026/27學費及校方公布的支援服務。", url: "https://www.kauyan.edu.hk/kindergarten/aboutschool/school_info/" },
    { label: "救恩學校（幼稚園部）：入學申請", scope: "當屆招生公告及申請入口；日期僅適用頁面所示屆別。", url: "https://www.kauyan.edu.hk/kindergarten/admissions/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址年度班制、語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5122730001" },
  ], [{ title: "建構式專題研習與親手探究", featured: true, note: "具體課程描述取自校方2025/26基本資料；學費使用校方2026/27公布數字，招生細節按當屆公告更新。", details: [
    { label: "從幼兒問題出發，以專題研習串連觀察、操作和討論", value: "2025/26校方資料稱課程以聖經真理及建構理論為基礎，幼兒會與教師共同擬訂學習內容，再進行資料搜集、感官探索、實驗及討論。這種做法重視過程中的提問和解難，適合願意動手探索的孩子；家長可了解主題如何評估，以及較慢熱的幼兒如何獲得引導。", period: "校方基本資料：2025/26學年", sourceUrl: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2025/08/2025-26_%E5%AD%B8%E6%A0%A1%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99.pdf" },
    { label: "主要授課語言為廣東話，另設英語及普通話課程", value: "2025/26資料把教學語言列為廣東話，並說明另聘英語和普通話教師。這是重要的語言定位：不應把三種語言活動理解為三語等量授課。家庭若希望知道英語或普通話的實際密度，宜索取目標年級時間表。", period: "校方基本資料：2025/26學年", sourceUrl: "https://www.kauyan.edu.hk/kindergarten/wp-content/uploads/2025/08/2025-26_%E5%AD%B8%E6%A0%A1%E5%9F%BA%E6%9C%AC%E8%B3%87%E6%96%99.pdf" },
    { label: "2026/27費用及非華語支援可在校方基本資料查核", value: "校方最新基本資料公布2026/27年度學費和雜費，並列出面談翻譯、英文家長手冊、中文語言環境及共融支援等措施。這些資料對家庭預算和語言適應有直接用途；如孩子有個別學習需要，仍應在申請前與學校確認實際支援方式。", period: "學費／支援資料：2026/27學年", sourceUrl: "https://www.kauyan.edu.hk/kindergarten/aboutschool/school_info/" },
  ] }], { name: "救恩學校（幼稚園部）", nameEn: "KAU YAN SCHOOL (KINDERGARTEN DEPARTMENT)" }),

  profile("582530", "按教育局校號582530及葵涌荔景邨風景樓校址識別。校方課程頁詳述自由遊戲、經驗學習、英語和普通話活動；首頁另列半日、全日及支援服務。", "https://www.sck.edu.hk/zh-hant/", [
    { label: "善正幼稚園：課程特色", scope: "自由遊戲、經驗學習、英語／普通話活動及專科課程方向。", url: "https://www.sck.edu.hk/zh-hant/introduction/characteristic/" },
    { label: "善正幼稚園：首頁與班制", scope: "當前公布的半日／全日時間、校車及校內支援服務。", url: "https://www.sck.edu.hk/zh-hant/" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址年度班制、語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5825300001" },
  ], [{ title: "自由遊戲、經驗學習與語言活動", featured: true, note: "課程細節為校方現行網站自述；首頁公布服務可能隨學年調整，申請前應確認目標級別班制。", details: [
    { label: "自由遊戲讓幼兒練習選擇、協商和解難", value: "校方描述幼兒可決定玩甚麼、怎樣玩及與誰一起玩，並在過程中練習計劃、組織、合作和溝通。對需要較多自主探索的孩子，這是值得觀察的課堂特點；家長可看老師如何在保留選擇權的同時處理衝突和安全。", sourceUrl: "https://www.sck.edu.hk/zh-hant/introduction/characteristic/" },
    { label: "主題活動從親身經驗走向反思和應用", value: "校方以參觀探索、科學實驗和訪問作為經驗學習例子，並描述由經驗、觀察反思、概念整理到新情境應用的學習循環。這意味着活動不止於外出或動手，家庭可進一步詢問孩子如何回顧經驗、教師如何跟進不同理解。", sourceUrl: "https://www.sck.edu.hk/zh-hant/introduction/characteristic/" },
    { label: "英語和普通話都有專科教師，校方另提供全日班", value: "課程頁稱由英籍英語教師及具普通話資格的教師設計活動；首頁列上午、全日與延長服務時段，並提及校車、駐校社工及到校學前康復服務。網站沒有公布各語言完整課時；家庭可同時核實全日班名額、收費及語言時間表。", sourceUrl: "https://www.sck.edu.hk/zh-hant/" },
  ] }]),

  profile("541427", "按教育局校號541427及天水圍天悅邨服務設施大樓校址識別。校方網頁介紹佛教辦學宗旨、主題區與非華語中文支援，但未標示該頁內容年度；2025/26報名表只作近期招生文件佐證。", "https://www.bckkg.edu.hk/", [
    { label: "佛教慈光幼稚園：學校簡介及支援資料", scope: "辦學背景、設施、主題學習區及非華語兒童支援；頁面未列學年。", url: "https://www.bckkg.edu.hk/special/9" },
    { label: "佛教慈光幼稚園：2025/26報名表", scope: "校方近期招生文件，用於核對校名和班別選擇；日期只適用該年度。", url: "https://www.bckkg.edu.hk/upload/news/file/25-26new_36cf77bf-0267-4260-8b9c-5a28baabf675.pdf" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "該校址年度班制、語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5414270001" },
  ], [{ title: "佛教品格培育與探索式學習環境", featured: true, note: "課程及支援細節取自校方網頁，該頁未標示年度；不把過往免費計劃或收生細節當作當年現況。", details: [
    { label: "佛教辦學團體以慈悲與全人發展為教育方向", value: "校方介紹本園由香港佛教聯合會創辦，目標涵蓋倫理、智能、體能、社交和美感發展，並希望幼兒建立正向價值。這是學校的宗旨自述；重視宗教教育的家庭可詢問佛教活動如何融入一週生活，以及家長是否需要配合相關活動。", sourceUrl: "https://www.bckkg.edu.hk/special/9" },
    { label: "主題中心、戲劇遊戲與感官材料提供探索機會", value: "校方列出主題學習中心、戲劇區、圖書、感官角和操作材料，並描述以愉快、關愛的氛圍培養學習興趣。這些設置說明校園提供何種活動入口，不能單憑設施推斷每名幼兒每日的使用時數；參觀時可看老師如何陪伴孩子選擇與收拾。", sourceUrl: "https://www.bckkg.edu.hk/special/9" },
    { label: "非華語支援有中文環境與家長親子學習安排", value: "校方稱為非華語兒童提供中文語言環境、課程與教具，並舉辦親子中文班。這對家庭評估中文適應支援有參考價值，但頁面未列服務年度、時數或名額；有需要者應直接確認本學年是否仍提供及如何申請。", sourceUrl: "https://www.bckkg.edu.hk/special/9" },
  ] }]),

  profile("530379", "按教育局校號530379及鑽石山星河明居校址識別靈糧堂鑽石山分校。校方分校頁提供2026/27班級及師生資料，幼教課程方向則來自辦學團體層級頁面。", "https://www.lingliang.org.hk/en/campuses/diamond-hill", [
    { label: "鑽石山靈糧幼稚園：分校資料", scope: "校號、地址、班級、師生比例、設施與2026/27費目入口。", url: "https://www.lingliang.org.hk/en/campuses/diamond-hill" },
    { label: "靈糧堂幼稚園：2027/28入學安排", scope: "集團現行年度申請流程及各分校開辦級別；鑽石山校址列K1至K3。", url: "https://www.lingliang.org.hk/en/admission" },
    { label: "靈糧堂幼稚園：課程方向", scope: "辦學團體層級的課程方法；不代表此分校已公布逐日課表。", url: "https://response.lingliang.org.hk/zh-CN/programme" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "教育局該校址的班制、授課語言、師生比例及費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5303790001" },
  ], [{ title: "分校班額清晰，課程重視自選遊戲", featured: true, note: "班級與容量按校方鑽石山分校頁；課程理念引用辦學團體層級資料，未公開分校逐級課時。", details: [
    { label: "鑽石山分校公布半日班及各級學生數", value: "校方分校頁列上午、下午各175個學位，K1至K3每級各兩班，並公布師生比例約1:11。這是該分校頁所列的班級資料，不能直接當成下一屆招生名額；家長應詢問目標年度級別的實際空缺和班額。", period: "校方分校資料：頁面列2026/27雜費", sourceUrl: "https://www.lingliang.org.hk/en/campuses/diamond-hill" },
    { label: "辦學團體的課程介紹把自主遊戲與主題探索並列", value: "靈糧堂課程頁描述以主題、遊戲及幼兒自選活動支持探索；這是辦學團體層級課程方向，並非鑽石山分校公布的逐日課程表。參觀時可看幼兒有多少時間自行選擇，以及教師如何把遊戲連接到語言、數學或生活概念。", sourceUrl: "https://response.lingliang.org.hk/zh-CN/programme" },
    { label: "2027/28招生表顯示鑽石山設K1至K3，未列PN", value: "辦學團體當屆校園表把鑽石山列為K1、K2、K3，未列N班。需要兩歲班的家庭不宜把集團其他分校服務套用到此校址；需留意目標年級、校巴及當屆收生安排。", period: "2027/28招生安排", sourceUrl: "https://www.lingliang.org.hk/en/admission" },
  ] }]),

  profile("216054", "按教育局校號216054及麗港城第二期校址識別迦南幼稚園麗港城分校，不與幼兒中心或集團其他分校合併。課程理念引用集團幼稚園課程頁，班制及語言另按教育局該校址概覽列示。", "https://www.cannan.edu.hk/", [
    { label: "迦南幼稚園：幼稚園課程", scope: "兒童為本、六大範疇、英語活動與全語文教學的集團課程介紹。", url: "https://www.cannan.edu.hk/kindergarten" },
    { label: "迦南幼稚園：麗港城分校資料", scope: "麗港城分校名錄與聯絡入口；分校細節以校址資料為準。", url: "https://cannan.veeotech.com/campuses" },
    { label: "教育局註冊校舍資料：校址2160540001", scope: "交叉核對正式分校名稱、校址代碼與地址；校址不包括幼兒中心。", url: "https://applications.edb.gov.hk/schoolsearch/registeredpremises.aspx?langno=2&scrn=216054000112" },
    { label: "教育局《幼稚園概覽2026/27》：校址0001", scope: "麗港城校址的班制、授課語言、師生比例及核准費用欄位。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2160540001" },
  ], [{ title: "兒童本位、雙語發展與校址核對", featured: true, note: "課程方向為迦南集團幼稚園課程自述；教育局註冊校舍資料明確排除幼兒中心，集團其他校址資料不套用至麗港城。", details: [
    { label: "課程以兒童發展和生活經驗為起點", value: "迦南課程頁稱以兒童為本，整合六個學習範疇，重視知識、技能、價值觀和態度，並容許按幼兒能力、興趣和經驗調整。這是集團課程方向；家長應進一步確認麗港城校址如何落實，以及各級課程表和評估如何向家庭回饋。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "校方以英語活動和閱讀支持雙語發展", value: "集團課程頁介紹以故事、英語活動及閱讀環境培養幼兒語言興趣，也列出普通話活動入口。網站沒有提供麗港城逐週語言課時，因此不宜把集團的雙語目標等同本分校英語主導；申請前可要求查看該校址當屆時間表。", sourceUrl: "https://www.cannan.edu.hk/kindergarten" },
    { label: "麗港城幼稚園校址不包括同址幼兒中心", value: "教育局註冊校舍頁列明校號2160540001及麗港城第二期地下低層地址，並註明不包括幼兒中心。因迦南同時經營幼兒園和多個幼稚園校址，查詢PN、K1或交通時應說明是麗港城幼稚園，不把幼兒中心服務、其他校舍班制或收費直接套用。", sourceUrl: "https://applications.edb.gov.hk/schoolsearch/registeredpremises.aspx?langno=2&scrn=216054000112" },
  ] }]),
];
