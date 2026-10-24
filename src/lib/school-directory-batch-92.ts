import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile, reviewedKindergartenWithoutOverview as limited } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲及K1至K3；當屆班別與空缺另確認";
const creative = "https://skg.creative.edu.hk/";
const ycis = "https://www.ycis-hk.com/en/academics/early-childhood";
const chiu = "https://cyk.edu.hk/";
const tivoli = "https://www.kindergarten.edu.hk/campuses?lang=zh";
const tivoliCf = "https://www.kindergarten.edu.hk/tivolinurseryandkindergartencf?lang=zh";
const chiuReg = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=564648000113";
const tivoliReg = "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=564761000111";
const fee = (id: string) => `https://applications.edb.gov.hk/schoolsearch/schoolfee/${id}.pdf`;
const kwan = "https://kfns.tungwahcsd.org/tc/page/home";

export const KINDERGARTEN_BATCH_92: PilotSchool[] = [
  profile({
    schoolNumber: "566071", locationId: "0001", website: creative, telephone: "27178811", principal: "馮慧敏", establishedYear: "1992", gradeSpan: grades,
    language: "匯景幼兒園列中英閱讀與英語園地；中文主教粵普、英普教師及課時未列，不套非本地班",
    ratio: "上午1:9.6；下午1:7.2", ratioIncludesPn: true, teacherCount: 19, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室；另有禮堂、英語小園地。官網一樓幼兒園7課室與概覽吻合，不合併地下幼稚園6課室。",
    pn: "2025年9月提供2至3歲服務，收錄92人，半日全年36,520元、全日60,900元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆校網新費仍標待批，見上方。",
    feeSummary: "K1至K3半日資助後免費；全日純學費全年6,680元／10期，膳費另列",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日純學費全年6,680元、10期。教育局2026-09-01證明書另列全日膳費927元×10期=9,270元，兩項合計15,950元；校網另有不同班部待批費，須核對校號及班別。",
    sourceNote: "566071為匯景花園一樓幼兒園27178811，非地下幼稚園27178686。官網兩部及非本地課程同頁，沒有混用費表；全日K費由概覽及教育局證明書交叉確認，校網34030待批未覆蓋本校已核准6680加9270。",
    sources: [{ label: "啟思匯景：校園、班部及2026/27費表", scope: "幼兒園一樓、電話27178811、PN待批新費；地下幼稚園及非本地班分開。", url: creative }, { label: "教育局：566071收費證明書", scope: "2026-09-01生效，K半日免費，全日學費6680及膳費9270分開。", url: fee("566071") }],
    features: { title: "課程特色｜戶外探索與生活主題", featured: true, details: [
      { label: "一樓幼兒園有自己的戶外空間", value: "匯景官網將地下幼稚園與一樓幼兒園分開，幼兒園有7課室及戶外遊戲場，配自選區、種植觀察、藝術和建構遊戲。概覽另列計劃、實踐及回顧的學習過程。家庭可看自己申請的班部空間與日程，不能把全校設施數相加當單一註冊校舍。", sourceUrl: creative },
      { label: "PN新費與K班部要問清", value: "校網2026/27 PN半日37,030元、全日連膳63,870元，均10期並標待批；與2025 PN費分年。頁內K全日連膳34,030元在幼稚園部欄，不能直接套到566071幼兒園。家長應帶校號核對最新批核及完整費單，再選班制。", period: "校網2026/27待批費表", sourceUrl: creative },
    ] },
  }),
  profile({
    schoolNumber: "566110", locationId: "0001", website: "https://www.ycis-hk.com/", telephone: "23374240", schoolType: "非牟利國際幼稚園；沒有參加幼稚園教育計劃", principal: "羅少容", establishedYear: "1932（耀中辦學沿革，非本校舍落成年）", gradeSpan: "2歲以下、2至3歲及幼兒教育；本校K1／K2費列，K3適用校舍另確認",
    language: "耀中ECE官方列英語與粵語雙語協作教學，3／4歲另有普通話教師入班；本校班表另確認",
    ratio: "上午1:3.7；下午1:3.4", ratioIncludesPn: true, teacherCount: 20,
    spaces: "有戶外遊戲場地及音樂室，室內遊戲場地欄列沒有，其他特別室列沒有；註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄21人，半日全年146,355元、全日223,036元；有2歲以下服務，沒有幼兒中心資助、暫託及延長服務。官網6個月至2歲ITLP須家庭成人陪同，各校舍分配另確認。",
    feeSummary: "K1全日全年235,730元、K2全日244,233元／11期；K3未列，膳費另計",
    fees: "2026/27本校K1全日全年235,730元、K2全日244,233元，均11期，K3及半日「-」，沒有教育計劃。教育局2026-08-01證明書另列膳費673元×11=7,403元；PN、用品及其他費另確認，不能把K3缺值當免費。",
    sourceNote: "566110是窩打老道151至153號地下23374240，與登記／概覽配對，非招生總部多福道3號23387106。概覽課程空白用官方ECE補充並限定機構課程範圍；官網全校9:1不覆蓋本校分時段統計。",
    sources: [{ label: "耀中ECE：雙語與年齡課程", scope: "英語粵語Co-Teachers、3／4歲普通話、ITLP成人陪同及年齡班制；校舍配置另核對。", url: ycis }, { label: "教育局：耀中窩打老道收費證明書", scope: "2026-08-01生效，K1／K2及獨立膳費，僅151至153號校舍。", url: fee("566110") }],
    features: { title: "課程特色｜英粵雙語與協作教學", featured: true, details: [
      { label: "英語與粵語同受重視", value: "耀中ECE官網列中外教師協作，幼兒在英語及粵語情境中遊戲、提問和探索；3／4歲課程另有普通話教師到班，4歲開始小提琴。家庭可核對本校實際年齡與語言班表；中文不等於普通話主教，機構各年齡課程也不表示全部在151至153號開辦。", sourceUrl: ycis },
      { label: "低齡陪同與升小銜接分開看", value: "官網6個月至2歲ITLP為須家庭成人陪同的半日遊戲服務；2歲可選半日或全日，3／4歲列全日及個人檔案，4歲有升小銜接。家庭應先確認校舍、照顧是否須陪同和完整費用，再考慮長期國際路線；不能由銜接活動推定保證升班或小學學位。", sourceUrl: ycis },
    ] },
  }),
  profile({
    schoolNumber: "564397", locationId: "0001", website: "http://lfc.ppe.rhenish.org", telephone: "23380538", principal: "陳杰樺", establishedYear: "1994", gradeSpan: grades,
    language: "樂富本校列外籍英語及普通話導師、語音認知訓練；中文主教粵普及課時未列",
    ratio: "上午1:7.6；下午1:7.0", ratioIncludesPn: true, teacherCount: 15,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有活動室及大肌肉室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄22人，半日全年30,480元、全日50,712元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆資格、時間與新費另確認。",
    feeSummary: "K1至K3全日資助後全年11,748元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年11,748元、12期；PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "564397為橫頭磡邨宏祖樓地下23380538，與登記及概覽配對；概覽新入口lfc.ppe.rhenish.org，本次405，不用舊lfkg域資料冒充新核實。",
    sources: [],
    features: { title: "課程特色｜社區探究與語文支援", featured: true, details: [
      { label: "群體合作和個人自選並行", value: "樂富概覽以生活經驗為主題，結合小組、實驗、自選區與社區參觀，按孩子需要調整，並列英普導師。家庭可看一週語言安排和雨天體能活動；走出校園不等於校內有戶外場地，兩文三語也沒有公開時數比例。", sourceUrl: kgp("564397") },
      { label: "寫前課程不等於提早操寫", value: "本校列機構寫前、書寫及語音認知課程，同時明列幼兒班不要求執筆；教師家長孩子資料匯入發展檔案，另有新生、升小適應及到校康復。家庭可問各年齡操作內容及延時資格，而不是從課程名稱推每天抄寫。", sourceUrl: kgp("564397") },
    ] },
  }),
  profile({
    schoolNumber: "564800", locationId: "0001", website: "http://hwns.elchk.org.hk", telephone: "24215859", principal: "梁寶瑜", establishedYear: "2000", gradeSpan: grades,
    language: "興華本校未明列中文主教粵普及英語普通話教師／課時，不借其他信義會園",
    ratio: "上午1:9.2；下午1:9.2", ratioIncludesPn: true, teacherCount: 5, classroomCount: 4,
    spaces: "有室內、戶外遊戲場地及音樂室；另有小組輔導室。",
    pn: "2025年9月提供2至3歲服務，收錄3人，半日「-」、全日全年52,752元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格、時段與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年16,500元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年16,500元、12期；PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "564800為柴灣興華一邨美華樓地下，概覽及登記電話24215859，未因區號看似異常自行改碼；校網本次逾時，未補猜語言比例。",
    sources: [],
    features: { title: "課程特色｜生活遊戲與生命教育", featured: true, details: [
      { label: "觀察與同伴互動帶動學習", value: "興華概覽以自由遊戲、生活、主題或專題研習及社區接觸安排課程，配生命教育及基督全人發展理念。家庭可看教師如何由孩子興趣展開活動，也了解宗教日常；校方列丹尼遜健腦操，僅作活動描述，不推為已證實改善腦力。", sourceUrl: kgp("564800") },
      { label: "適應與兼收支援", value: "本校列新生及小一適應、兼收、暑期聖經班和到校康復，以持續觀察、主題及身心發展報告回饋。家長可問孩子需要支援時的具體跟進、轉介及照顧時間；少量PN在讀人數不代表當屆招生額或必然有位。", sourceUrl: kgp("564800") },
    ] },
  }),
  limited("564648", {
    website: chiu, telephone: "25436796", schoolType: "非牟利幼稚園；當屆概覽資料待補", gradeSpan: "校方介紹全日幼兒教育；當屆年齡班別另確認", tuition: "最近取得證明書2025-09-01生效；不作2026/27新報價",
    dataYear: "2026-10-24核對登記及官網；費表生效2025-09-01，未取得當屆個校概覽",
    sourceNote: "564648登記仍列德輔道西38號2樓，官網同址A室及25436796。當屆概覽返回目錄，不據此判停辦，也不沿用2024師資為現況；官網有暫託延時介紹，與2025/26概覽舊申報有差異，當屆資格時段另問。",
    sources: [{ label: "潮陽：官方全日及照顧介紹", scope: "同址同電話，列全日、暫託及延長服務；未列當屆時段費。", url: chiu }, { label: "教育局：潮陽登記", scope: "564648／0001、德輔道西38號及25436796，登記不等於即時空缺。", url: chiuReg }, { label: "教育局：潮陽收費證明書", scope: "2025-09-01生效的學費與膳費，不當2026/27新批核。", url: fee("564648") }],
    detailSections: [{ title: "辦學與照顧｜以當屆確認為先", featured: true, details: [
      { label: "全日教育及附加照顧", value: "潮陽官網列全日教育及照顧，以均衡發展為方向，並介紹暫託及延長服務；地址為上環德輔道西38號2樓A室，與教育局登記及25436796吻合。需要照顧的家庭可先問當屆開班、延時時段、資格及費率，不把網站有項目等同仍有空缺。", sourceUrl: chiu },
      { label: "可讀費表的日期較早", value: "教育局現可取得證明書生效日為2025年9月1日：K全日資助後學費每年14,340元、12期，另膳費5,280元。這是已取得文件的日期，不能保證即為2026/27新收費；本次未取得當屆概覽，師資、師生比、語言主次及PN費不沿用舊數。", period: "證明書2025-09-01", sourceUrl: fee("564648") },
    ] }],
  }),
  profile({
    schoolNumber: "563420", locationId: "0001", website: "http://ychnlkg.edu.hk", telephone: "24452110", principal: "林瑞貞", establishedYear: "1992", gradeSpan: grades,
    language: "本校未明列中文主教粵普及英語普通話教師／時數；按年級班表核對",
    ratio: "上午1:9.6；下午1:8.9", ratioIncludesPn: true, teacherCount: 14,
    spaces: "有室內、戶外遊戲場地及音樂室；註冊課室與其他特別室未列資料。",
    pn: "2025年9月提供2至3歲服務，收錄27人，半日「-」、全日全年41,160元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格與時段另確認。",
    feeSummary: "K1至K3全日資助後全年11,748元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年11,748元、12期；PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "563420為天水圍天河路6號仁濟第24屆董事局社會服務中心地下24452110，與登記概覽配對，非其他仁濟林李園；校網本次405。",
    sources: [],
    features: { title: "課程特色｜操作提問與親子閱讀", featured: true, details: [
      { label: "重視孩子怎樣探索和提問", value: "林李婉冰概覽以生活經驗、興趣和能力設課，讓孩子從活動、操作、體驗及提問學習，觀察和作品連同家長意見整理成檔案。家庭可看教師如何回應孩子的問題，而不只比較識字量；參與表演比賽不等於每人必須參賽。", sourceUrl: kgp("563420") },
      { label: "家長閱讀參與與適應支援", value: "本校列親子閱讀計劃家長籌委會、義工、面談及季刊，另有新生適應、小一家長會、駐校社工與到校康復。家庭可問自己可負擔的參與方式、照顧時段及轉介條件；有小一活動不代表有直升學額。", sourceUrl: kgp("563420") },
    ] },
  }),
  profile({
    schoolNumber: "563226", locationId: "0001", website: "http://www.ceces-aetna.edu.hk", telephone: "22542442", principal: "鄧凱汶", establishedYear: "2000", gradeSpan: grades,
    language: "安泰本校未明列中文主教粵普及英語普通話教師／課時；戲劇活動不當語言比例證據",
    ratio: "上午1:10.2；下午1:10.2", ratioIncludesPn: true, teacherCount: 11, classroomCount: 4,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；另有遊戲室、音樂區與兒童圖書室。",
    pn: "2025年9月提供2至3歲服務，收錄31人，半日「-」、全日全年27,564元；沒有2歲以下，有幼兒中心資助及延長服務，沒有暫託。當屆資格、時間與新費另確認。",
    feeSummary: "K1至K3全日扣減政府資助後免費；半日未列",
    fees: "2026/27 K1至K3全日扣減政府資助後免費，上午下午均「-」。PN、膳食用品及延時另費另核對；全日學費免費不等於所有照顧費用免費。",
    sourceNote: "563226為天盛苑天盛商場附翼地下22542442，與登記概覽一致；原表K全日免費明確確認，不把擷取空白作缺費。官網本次405。",
    sources: [],
    features: { title: "課程特色｜做中學與戲劇解難", featured: true, details: [
      { label: "把戲劇放進探索活動", value: "安泰概覽強調創意活動和做中學，以社區實地參觀、小組、友校活動及戲劇元素培養解難、表達和自信。家庭可看老師怎樣引導孩子扮演與討論，也問體能安排；有音樂區而無獨立音樂室，兩項不矛盾。", sourceUrl: kgp("563226") },
      { label: "延長服務與暫託分開", value: "本校以促進學習評估和主題報告回饋，列新生適應、駐校社工、到校康復及轉介，另有家長觀課和義工。需要長時照顧的家庭可問延時資格與另費；本校有延長服務但沒有申報暫託，不能當臨時隨到照顧選項。", sourceUrl: kgp("563226") },
    ] },
  }),
  limited("564761", {
    website: "https://www.kindergarten.edu.hk/", telephone: "24322223", schoolType: "宏福幼稚園登記資料；當屆校舍招生須確認", gradeSpan: "舊青怡廣場登記與現青富招生校舍分開核對", tuition: "只取得2023-09-01生效舊校舍費表；不當現行報價",
    dataYear: "2026-10-24核對登記及官方現校園介紹；未取得564761當屆概覽",
    sourceNote: "564761登記仍列青怡廣場1樓21至25號；現官網僅列宏福中英文及青富幼稚園／幼兒園，青富另名另址2024開幕，同用24322223不能推同一登記已遷移。保留原校址，不套青富或519103的師資費率；未取得停辦公告，亦不判停辦。",
    sources: [{ label: "教育局：宏福564761登記", scope: "青怡廣場舊註冊校址及24322223，不代表當屆仍在原址招生。", url: tivoliReg }, { label: "宏福：現校園列表", scope: "中英文校與青富兩種校名，青富2024開幕；不自行推校號延續。", url: tivoli }, { label: "宏福青富：現校舍聯絡", scope: "青富苑A座、24322223及PN至K3；與舊登記分開。", url: tivoliCf }, { label: "教育局：宏福舊校舍費表", scope: "生效2023-09-01，非現行2026/27新報價。", url: fee("564761") }],
    detailSections: [{ title: "校舍辨認｜先確認青怡或青富", featured: true, details: [
      { label: "同一電話未必是同一註冊校舍", value: "教育局564761登記仍列青怡廣場1樓21至25號；現官網青富校頁列青富苑A座地下、PN至K3及24322223，校園列表指青富2024開幕。家長應先向校方確認報讀名稱、校號與地址，不把青富新班制套到舊登記頁，也不把宏福中英文校當本校。", sourceUrl: tivoliCf },
      { label: "現行年度資料未確認", value: "本次未取得564761當屆概覽，舊校舍收費證明書生效日為2023年9月1日，不作現報價；師資、語言主次、PN及設施也不借青富填寫。官網全人、自信及責任感理念可了解品牌方向，實際班制、照顧與收費應先以所選校舍書面資料確認。", sourceUrl: tivoli },
    ] }],
  }),
  profile({
    schoolNumber: "563536", locationId: "0001", website: "https://chns.tungwahcsd.org/tc", telephone: "23405982", principal: "萬美貞", establishedYear: "1979", gradeSpan: grades,
    language: "陳嫺本校列全語文教學；中文主教粵普及英語普通話教師／時數未列",
    ratio: "上午1:7.6；下午1:7.6", ratioIncludesPn: true, teacherCount: 7,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有輔導室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄14人，半日「-」、全日全年48,852元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格、時段與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年20,040元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年20,040元、12期；PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "563536為秀茂坪秀富樓地下2室23405982，概覽新校網chns.tungwahcsd.org/tc，本次逾時。未以東華群芳的育嬰或蒙氏資料填陳嫺。",
    sources: [],
    features: { title: "課程特色｜方案研究與成長檔案", featured: true, details: [
      { label: "同一概念按發展逐步深化", value: "陳嫺概覽以兒童主動性為中心，結合活動、方案研究及全語文，採綜合及螺旋式課程，讓遊戲經驗逐步深化。家庭可看不同年級如何處理相近主題，以及老師如何記錄語言、情緒與社交，避免只用工作紙難度判斷學習。", sourceUrl: kgp("563536") },
      { label: "專業支援按個別需要安排", value: "本校列社工輔導轉介、特殊幼兒導師個別教育計劃及心理與治療專業定期到訪，並參與到校康復。家長可問資格、等候、實際訓練及家居跟進，再比較延長照顧；機構專業資源不等於每位孩子固定獲配治療時數。", sourceUrl: kgp("563536") },
    ] },
  }),
  profile({
    schoolNumber: "564176", locationId: "0001", website: kwan, telephone: "23516718", principal: "梁淑懿", establishedYear: "1995（遷黃大仙）；1988暫託中心、2005註冊幼稚園另計", gradeSpan: "育嬰、PN／2至3歲及K1至K3；當屆資格與空缺另確認",
    language: "群芳官網列中英文全語文故事閱讀；中文主教粵普與英普時數未列",
    ratio: "上午1:5.7；下午1:5.7", ratioIncludesPn: true, teacherCount: 7, classroomCount: 3,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；其他特別室未列具體項目。",
    pn: "2025年9月提供2至3歲服務，收錄16人，全日全年63,492元、半日「-」；有2歲以下、幼兒中心資助、暫託及延長服務。育嬰費率、當屆資格、時段與空缺另確認；教師統計不含0至2歲人員。",
    feeSummary: "K1至K3全日資助後全年25,404元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年25,404元、12期；育嬰、PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "564176為竹園南邨富園樓地下120至129號23516718，官網同址同電話。官網沿革1988暫託、1995遷址、2005註冊幼稚園分開；育嬰有獨立課程，不將K班師資統計當育嬰人手。",
    sources: [],
    features: { title: "課程特色｜生活自理與育嬰照顧", featured: true, details: [
      { label: "把照顧自己和環境放進日常", value: "群芳官網列全語文、方案、蒙特梭利理念、感知肌能及情緒教育，重視照顧自己、他人與環境；育嬰部另有感官探索和SIME課程。家庭可看所選年齡實際活動與照顧人手，校方感官課程的描述不直接當治療或腦力提升證據。", sourceUrl: kwan },
      { label: "服務時間與上課時間分開", value: "本校官網日間服務週一至五8至18時、週六8至13時，課節另列週一至五9至16時半。家庭可先核對育嬰、暫託和延展服務資格、另費與接送，再了解社工及到校康復安排；網站有服務不保證即時有位，校外公園活動亦非校內戶外場地。", sourceUrl: kwan },
    ] },
  }),
];
