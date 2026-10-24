import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及名額另確認";

export const KINDERGARTEN_BATCH_70: PilotSchool[] = [
  profile({
    schoolNumber: "622389", locationId: "0001", website: "https://www.puikiukg.edu.hk/", telephone: "37973599（校方網站）；35909990（概覽）", schoolType: "私立獨立幼稚園", principal: "葉淑娟", establishedYear: "2023", gradeSpan: grades,
    language: "本校申報國際PN及英普／英粵班，採全語文與校本英文；各級組別及時數另確認",
    ratio: "上午1:9.8；下午1:5.4", ratioIncludesPn: true, teacherCount: 9, classroomCount: 7, spaces: "有室內遊戲場地、音樂室及圖書館；戶外場地原表寫沒有資料。",
    pn: "2025年9月提供2至3歲服務，收錄8人，半日全年73,200元，全日為「-」；當屆PN費率及供應另核對。",
    feeSummary: "K1至K3半日全年68,200至71,500元；全日102,300元，均11期",
    fees: "2026/27 K1至K3上午下午全年68,200至71,500元、11期；全日102,300元、11期。區間未清楚對應語言組別，不自行拆價；PN及雜費另計。",
    sourceNote: "本頁為碧濤花園第二期、安景街23號、校號622389；官網另有富豪花園校舍，不混用。概覽電話35909990與官網碧濤37973599不同，並列來源，聯絡時按碧濤校舍確認。首頁已列2027/28 PN至K1申請，仍須確認空缺。",
    sources: [{ label: "培僑：碧濤聯絡及招生入口", scope: "碧濤安景街23號、37973599、2027/28申請入口及機構理念；與富豪花園分開。", url: "https://www.puikiukg.edu.hk/" }],
    features: { title: "課程特色｜英普英粵與專題", featured: true, details: [
      { label: "語言組合按孩子的中文背景選", value: "本校概覽列國際PN及英普、英粵班，結合全語文、專題研習和校本英文，透過主題參觀與真實生活探索學習。家庭可先確認所選年級的語音及教師配置，再比較將來本地或國際小學的需要；雙語名稱不代表兩種語言等量。", period: "2026/27概覽校方申報", sourceUrl: kgp("6223890001") },
      { label: "升小支援不等於同名學校直升", value: "校方列新生適應、家長講座、小學參觀及小一模擬，以持續觀察及主題檔案記錄發展。希望走培僑路線的家庭，應向目標小學核對當屆申請與評核；本校公開資料沒有列出每位孩子獲保留小學學位的制度。", period: "2026/27概覽校方申報", sourceUrl: kgp("6223890001") },
    ] },
  }),
  profile({
    schoolNumber: "215767", locationId: "0001", website: "https://www.magartedu.com/", telephone: "27869152", schoolType: "私立獨立幼稚園", principal: "柯欣彤", establishedYear: "2018", gradeSpan: grades,
    language: "機構列英語、普通話及粵語三語環境；康怡各班主課分工及時間另確認",
    ratio: "上午1:5.9；下午1:3.3", ratioIncludesPn: true, teacherCount: 8, classroomCount: 11, spaces: "室內及戶外遊戲場地、音樂室、圖書及舞蹈室、美術、陶藝、自然、木工、文化及家庭區。",
    pn: "2025年9月提供2至3歲服務，收錄27人，半日全年81,180元、全日150,260元。PN全日費率不能套到K1至K3，當屆供應另確認。",
    feeSummary: "K1至K3上午全年82,280元、下午54,450元，均11期；全日未列",
    fees: "2026/27 K1至K3上午全年82,280元、下午54,450元，均11期；全日為「-」。上午下午不同，不用單一半日價概括；PN與用品等另計。",
    sourceNote: "康盛街16號及27869152與官網康怡聯絡吻合。官網第二電話27869189與概覽另一號27869180不同，採雙方一致的主要號碼。官網50,000平方呎為多校舍宣傳，不當康怡單校面積。",
    sources: [
      { label: "MAGART：課程", scope: "英國早期基礎階段、瑞吉歐與探究、拼音讀寫、品格及無屏幕編程方向；康怡實際安排另確認。", url: "https://www.magartedu.com/en/curriculum/" },
      { label: "MAGART：康怡聯絡", scope: "康盛街16號及27869152，與黃埔及粉嶺分開。", url: "https://www.magartedu.com/en/inquiry/" },
    ],
    features: { title: "課程特色｜英國框架與探究藝術", featured: true, details: [
      { label: "從語言、身體和社交打基礎", value: "校方採調整至香港需要的英國早期基礎階段框架，加入瑞吉歐與探究方式，重視關係、環境及遊戲。英文列拼音、共讀和初步書寫，中文結合文化與生命教育；家庭可看孩子怎樣操作、提問和獲得回饋，並向康怡核對各語言時數。", sourceUrl: "https://www.magartedu.com/en/curriculum/" },
      { label: "藝術與編程也要問具體頻率", value: "機構列藝術家單元、材料共創、操作數學及無屏幕編程，透過實物、齒輪與遊戲學習次序和解難。家長可詢問康怡哪些年級定期參與、哪些另費，以及作品如何記錄過程；課程清單不等於每位幼兒每天都有全部活動。", sourceUrl: "https://www.magartedu.com/en/curriculum/" },
    ] },
  }),
  profile({
    schoolNumber: "611484", locationId: "0001", website: "https://guidepost.hk/locations/kennedy-town", telephone: "36191136", schoolType: "私立獨立幼稚園", principal: "劉恩佟", establishedYear: "2020", gradeSpan: grades,
    language: "本校概覽明列英語及普通話雙語蒙特梭利環境，未公開時間比例",
    ratio: "上午1:6.1；下午1:0.8", ratioIncludesPn: true, teacherCount: 9, classroomCount: 10, spaces: "概覽列室內遊戲場地及音樂室，沒有戶外及其他特別室；官網六間教室與註冊十間口徑不同。",
    pn: "2025年9月提供2至3歲服務，收錄25人，半日全年107,250元，全日為「-」；未列2歲以下服務。官網1至2歲過渡／Nido活動須另確認服務類型與登記範圍。",
    feeSummary: "K1至K3上午全年109,450元、下午99,000元，均11期；全日未列",
    fees: "2026/27 K1至K3上午全年109,450元、下午99,000元，均11期；全日為「-」。PN、延長活動、營隊及其他費用另計，營業08:00至17:00不等於全日學費。",
    sourceNote: "官網皇后大道西554至560號及36191136吻合，日富里為到訪入口，不與附近聖安多尼學校混合。官網六間教室與概覽註冊十間分列；下午1:0.8為統計，不是個別教學承諾。",
    sources: [{ label: "Guidepost：堅尼地城校舍", scope: "皇后大道西地址、日富里入口、電話、年齡組及校舍自述；不替代註冊課室數。", url: "https://guidepost.hk/locations/kennedy-town" }],
    features: { title: "課程特色｜英普混齡與工作循環", featured: true, details: [
      { label: "自主選擇有教師觀察和引導", value: "本校概覽採蒙特梭利工作循環，讓孩子按步伐選擇、規劃及反覆調整任務；兒童之家混齡組讓年長孩子示範及協作，日常置於英普環境。家庭可觀察連續操作時間、教師如何示範材料，以及孩子需要幫助時的回應。", period: "2026/27概覽校方申報", sourceUrl: kgp("6114840001") },
      { label: "用日常紀錄與面談了解適應", value: "校方列Transparent Classroom網上學習紀錄及每學年兩次報告與家長會，關注學習、社交和情緒。官網另有1至2歲、2至3歲及3至6歲組別，家長須先確認所選服務是親子、過渡或獨立上課，再核對費用與報告方式。", period: "2026/27概覽校方申報", sourceUrl: kgp("6114840001") },
    ] },
  }),
  profile({
    schoolNumber: "231517", locationId: "0001", website: "https://dek.edu.hk/", telephone: "26990100", schoolType: "私立獨立幼稚園", principal: "羅淑華", establishedYear: "1988", gradeSpan: "概覽列PN及K1至K3費率；當屆實際開班須確認",
    language: "官網舊申請頁列英語及普通話教師，但課表標2019/20；當屆語音與時數須重新確認",
    ratio: "上午1:1.8；下午未列", ratioIncludesPn: true, teacherCount: 4, spaces: "最新概覽未公開註冊課室、室內外遊戲及音樂室數據，不以舊宣傳補填。",
    pn: "2025年9月提供2至3歲服務，收錄2人，半日全年60,000元，全日為「-」；未列2歲以下服務。官網1歲以上playgroup與本校號幼兒服務範圍分開。",
    feeSummary: "K1至K3半日全年60,000元／10期；全日未列",
    fees: "2026/27 K1至K3上午下午全年60,000元、10期；全日為「-」。費率表不證明每級當屆都開辦；PN及其他費用另確認。",
    sourceNote: "新概覽列dek.edu.hk，無www網址可讀；舊davidexodus.edu.hk不穩定。官方申請頁26990100吻合，但其中2019/20課表、25人班額及1:9不能當作現況；本頁數字採最新概覽。",
    sources: [
      { label: "大衛：辦學理念", scope: "1988創辦、關注個別需要及全人方向；未把網站舊課表當現況。", url: "https://dek.edu.hk/" },
      { label: "大衛：申請及聯絡（含舊課表）", scope: "26990100及到訪聯絡；課表明標2019/20，班額、時段和語言須核對當屆。", url: "https://dek.edu.hk/application-details/" },
    ],
    features: { title: "課程資料｜個別發展與現況核對", featured: true, details: [
      { label: "理念重視個別需要與全人發展", value: "大衛官網自述以國際方向的學前課程照顧個別需要，發掘優勢及支持全面成長。最新概覽課程欄沒有詳細文本，家長可索取當屆日程、活動和學習回饋樣本，再了解探索、語言及自理在一日中如何安排。", sourceUrl: "https://dek.edu.hk/" },
      { label: "小規模歷史數字不代表現行班額", value: "2025年9月PN收錄2人、上午師生比1:1.8，是當時統計；官網申請頁另有2019/20課表及舊班額。家庭應直接確認現在各級是否開班、每班教師與孩子人數及語言安排，不能把任何一個歷史比例解作一對一照顧或容易錄取。", sourceUrl: kgp("2315170001") },
    ] },
  }),
  profile({
    schoolNumber: "564567", locationId: "0001", website: "https://mtwns.elchk.org.hk/", telephone: "27128648", principal: "鍾慧瑩", establishedYear: "1977", gradeSpan: grades,
    language: "本校官網明列主課粵語；另有外籍老師英語及專教老師普通話課，逐級時數另確認",
    ratio: "上午1:7.3；下午1:7.3", ratioIncludesPn: true, teacherCount: 3, spaces: "有室內遊戲場地、音樂室及多用途室；沒有戶外場地，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄4人，全日全年33,108元，半日為「-」；列有幼兒中心資助、暫託及延長時間服務。當屆資格、時段與費率另確認。",
    feeSummary: "K1至K3全日全年12,444元／12期；PN另計",
    fees: "2026/27 K1至K3全日扣減資助後全年12,444元、12期；上午下午為「-」。PN、膳食及暫託延長服務費另核對。",
    sourceNote: "馬頭圍邨夜合樓115、117及118號及27128648與本校新官網一致，取代舊共用機構網址；語言以本校課程專頁明確說明為準。",
    sources: [
      { label: "信義會馬頭圍：課程及服務", scope: "主課粵語、英普老師、主題與專題、全日照顧及18至19時延長服務；當屆資格另核對。", url: "https://mtwns.elchk.org.hk/en/curriculum/" },
      { label: "信義會馬頭圍：聯絡", scope: "夜合樓115、117及118號與27128648吻合。", url: "https://mtwns.elchk.org.hk/en/contact-us/" },
    ],
    features: { title: "課程特色｜粵語主課與生活探索", featured: true, details: [
      { label: "粵語日常，英語普通話另有教師", value: "官網明列主課以粵語為主，另由外籍英語老師及普通話專教帶領語言課。課程結合多元智能、主題、專題、生命及情緒學習，並有參觀體驗；對粵語家庭較易理解日常銜接，非粵語家庭則可詢問中文適應和輔導方式。", sourceUrl: "https://mtwns.elchk.org.hk/en/curriculum/" },
      { label: "全日、暫託與晚間服務分開辦理", value: "本校官網列全日照顧、2至6歲非在校兒童的暫託，以及18:00至19:00延長服務，另有經轉介的特殊需要支援。需要照顧配套的家庭可確認申請資格、餐膳、休息及各項收費；提供服務不等於隨時有名額。", sourceUrl: "https://mtwns.elchk.org.hk/en/curriculum/" },
    ] },
  }),
  profile({
    schoolNumber: "564575", locationId: "0001", website: "https://kyns.elchk.org.hk/zh/", telephone: "27579529", principal: "韓慧明", establishedYear: "1983（概覽）；官網簡介列1982", gradeSpan: grades,
    language: "本校官網列兩文三語及外籍英語老師；粵語／普通話主課與逐級時數另確認",
    ratio: "上午1:9.3；下午1:9.3", ratioIncludesPn: true, teacherCount: 4, classroomCount: 4, spaces: "有室內遊戲場地、音樂室及個別輔導室；沒有戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄15人，全日全年29,040元，半日為「-」；列有幼兒中心資助、暫託及延長時間服務。當屆費率和資格另核對。",
    feeSummary: "K1至K3全日全年5,016元／12期；PN另計",
    fees: "2026/27 K1至K3全日扣減資助後全年5,016元、12期，上午下午為「-」；PN、膳食、用品和延展等另確認。",
    sourceNote: "本頁為啟業邨啟寧樓、校號564575。新官網27579529吻合；網站簡介創立1982與概覽1983有差異，兩者並列，沒有把機構1968創立年套到本校。",
    sources: [{ label: "信義會啟業：課程", scope: "兩文三語、外籍英語老師、設計活動與探索；電話吻合。", url: "https://kyns.elchk.org.hk/zh/課程/" }],
    features: { title: "課程特色｜專題設計與小組遊戲", featured: true, details: [
      { label: "從探索、設計到實踐", value: "啟業官網列定期專題設計活動，讓幼兒從探索及實踐建立創意思維，配合兩文三語及外籍英語老師。概覽另列小組活動、觀察與討論；家長可請教師展示一個近期專題，了解孩子選擇和實作的空間。", sourceUrl: "https://kyns.elchk.org.hk/zh/課程/" },
      { label: "新生及小一適應有不同準備", value: "本校概覽列新生適應可由家長陪同，K3有模擬、參觀及小學體驗，K1至K3另可參與小綿羊制服隊。家庭可問清陪同長短、上課節奏及活動自願安排，再配合孩子分離適應與自理程度。", period: "2026/27概覽校方申報", sourceUrl: kgp("5645750001") },
    ] },
  }),
  profile({
    schoolNumber: "564583", locationId: "0001", website: "https://hmns.elchk.org.hk/zh/", telephone: "25588070", principal: "梁寶瑜", establishedYear: "1983", gradeSpan: grades,
    language: "本校官網列外籍英語老師及外聘普通話老師；主課語音與時間比例另確認",
    ratio: "上午1:7.3；下午1:6.3", ratioIncludesPn: true, teacherCount: 3, classroomCount: 5, spaces: "有室內及戶外遊戲場地、音樂室、多感官活動室、種植花圃及魚池；官網獨立課室3間與概覽註冊5間口徑不同。",
    pn: "2025年9月提供2至3歲服務，收錄3人，全日全年25,236元，半日為「-」；列有幼兒中心資助、暫託及延長時間服務。當屆費率及資格另確認。",
    feeSummary: "K1至K3上午免費；全日全年17,628元／12期，下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午格為「-」；全日全年17,628元、12期。不能概括上午下午都免費，PN及延展等另計。",
    sourceNote: "興民邨社區中心3樓、校號564583，25588070與新官網吻合。官網獨立課室3間不取代概覽註冊5間；1968為前機構背景，不當本校創校年。",
    sources: [{ label: "信義會興民：課程", scope: "生活主題、自由探索、外籍英語及普通話專教；電話與本校概覽一致。", url: "https://hmns.elchk.org.hk/zh/課程/" }],
    features: { title: "課程特色｜戶外自然與感官遊戲", featured: true, details: [
      { label: "花圃、魚池和體能結合生活學習", value: "本校概覽利用戶外種植、養魚、平衡單車及季節嬉水，結合桌上遊戲、角色角及多感官活動，讓幼兒透過操作和觀察探索自然。家長可了解各年齡實際使用頻率、天氣替代及安全安排，不能只由場地設備推定每天的活動時間。", period: "2026/27概覽校方申報", sourceUrl: kgp("5645830001") },
      { label: "語言與個別支援看小組安排", value: "概覽列非華語導師每日小組輔導廣東話、中文及家課，支援老師關顧個別差異。家庭可按孩子語言背景確認組別、轉介資格及家校溝通，再配合官網所列的英語及普通話活動；這些支援不等於主課轉為全英或全普。", period: "2026/27概覽校方申報", sourceUrl: kgp("5645830001") },
    ] },
  }),
  profile({
    schoolNumber: "564559", locationId: "0001", website: "https://olns.elchk.org.hk/", telephone: "26979238", principal: "陳婉貞", establishedYear: "1992", gradeSpan: grades,
    language: "本校公開資料未明確列主課語音、英語及普通話逐級時間，須直接確認",
    ratio: "上午1:7.5；下午1:7.5", ratioIncludesPn: true, teacherCount: 10, classroomCount: 4, spaces: "概覽列室內遊戲場地及兼收輔導室，沒有戶外場地及音樂室；官網戶外體能器材不等同有註冊戶外遊戲場。",
    pn: "2025年9月提供2至3歲服務，收錄18人，全日全年32,868元，半日為「-」；列有幼兒中心資助、暫託及延長時間服務。當屆資格和費率另確認。",
    feeSummary: "K1至K3全日全年8,220元／12期；PN另計",
    fees: "2026/27 K1至K3全日扣減資助後全年8,220元、12期，上午下午為「-」；PN、膳食及暫託延展等另核對。",
    sourceNote: "顯徑鄰里社區中心3樓、校號564559，新獨立官網26979238吻合；2024-10-17更名按本校官網，創校1992另列。未採用共用機構首頁的異常無關文字。",
    sources: [{ label: "信義會愛鄰：學校資訊", scope: "本校前身、1992創校、2024更名、四間獨立課室及電話，與現身分對應。", url: "https://olns.elchk.org.hk/學校簡介/" }],
    features: { title: "課程特色｜生活遊戲與生命教育", featured: true, details: [
      { label: "自由遊戲與生活主題互相延伸", value: "愛鄰本校概覽以生活學習、自由遊戲及主題綜合活動培養自主、探索和應變，生命教育結合基督教信仰及小綿羊活動。家長可問教師如何讓孩子選擇遊戲、處理同伴分歧，以及信仰內容在日常活動中的安排。", period: "2026/27概覽校方申報", sourceUrl: kgp("5645590001") },
      { label: "持續檔案配合小一模擬月", value: "校方列單元評估、發展報告及學習檔案，新生有適應期，K3則有小一模擬月與區內小學參觀。家庭可問清自理、作息和書寫怎樣逐步銜接，並確認需要個別支援時的服務資格，參觀小學不代表有保留學位。", period: "2026/27概覽校方申報", sourceUrl: kgp("5645590001") },
    ] },
  }),
  profile({
    schoolNumber: "562963", locationId: "0001", website: "https://www.salvationarmy.org.hk/esd/lmsns/?langcode=zh-hant", telephone: "24202491", principal: "曾順友", establishedYear: "1971", gradeSpan: grades,
    language: "本校概覽列英語聆聽、說話及拼讀；主課語音及普通話安排未明，須另確認",
    ratio: "上午1:7.4；下午1:7.4", ratioIncludesPn: true, teacherCount: 14, spaces: "有室內遊戲場地、音樂室、體能活動室及多用途室；沒有戶外場地，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄19人，全日全年41,484元，半日為「-」；有幼兒中心資助，沒有暫託及延長時間服務。當屆安排另確認。",
    feeSummary: "K1至K3全日全年22,128元／12期；PN另計",
    fees: "2026/27 K1至K3全日扣減資助後全年22,128元、12期，上午下午為「-」；PN、膳食和用品等另計，不能套用其他救世軍幼兒園。",
    sourceNote: "本頁為梨木樹楊樹樓B及C翼、校號562963。概覽所列官網本次顯示荔枝角校舍內容，未拿來更新梨木樹地址、課程及服務；按本校概覽和24202491確認。",
    sources: [{ label: "概覽所列官網（內容須確認）", scope: "本次首頁顯示荔枝角校舍，不作梨木樹事實來源；請按本校概覽及電話聯絡。", url: "https://www.salvationarmy.org.hk/esd/lmsns/?langcode=zh-hant" }],
    features: { title: "課程特色｜專題操作與生命教育", featured: true, details: [
      { label: "探索、蒙特梭利與英文拼讀並行", value: "梨木樹本校概覽列專題、蒙特梭利操作、英文聽說與拼讀、生命教育及中華文化，透過觀察、討論和實踐培養自理、專注與正向態度。家長可看一個主題如何連結操作和語言，而不是把列有蒙特梭利元素當作整校所有課程都採同一模式。", period: "2026/27概覽校方申報", sourceUrl: kgp("5629630001") },
      { label: "照顧與專業支援按個別需要安排", value: "校方列學生支援教師、駐校社工、兼收及到校康復，並以學習檔案、家長教師協會和家長教育維持聯繫。家庭可先確認孩子需要的支援、資格及接送時段；原表沒有延長服務，不能因是全日幼兒學校就假定可晚接送。", period: "2026/27概覽校方申報", sourceUrl: kgp("5629630001") },
    ] },
  }),
  profile({
    schoolNumber: "602256", locationId: "0001", website: "https://guidepost.hk/locations/repulse-bay", telephone: "28120274", schoolType: "私立獨立幼稚園", principal: "劉恩佟", establishedYear: "2024", gradeSpan: grades,
    language: "本校概覽明列英語及普通話雙語蒙特梭利，未列時間比例",
    ratio: "上午1:7.4；下午1:0.5", ratioIncludesPn: true, teacherCount: 9, classroomCount: 8, spaces: "有室內及戶外遊戲場地；沒有音樂室及其他特別室。",
    pn: "2025年9月提供2至3歲服務，收錄25人，半日全年154,200元，全日為「-」；未列2歲以下服務，官網1至2歲過渡活動須另確認親子及登記範圍。",
    feeSummary: "K1至K3上午全年158,400元、下午145,920元，均12期；全日未列",
    fees: "2026/27 K1至K3上午全年158,400元、下午145,920元，均12期；全日為「-」。PN、延伸活動及營隊另計，營業時間不等於全日課程或照顧承諾。",
    sourceNote: "海灘道35號2樓及28120274與本校官網吻合；2024為本校概覽創校欄，不以Woodland品牌年資替代。淺水灣多個同品牌或前身校址不合併，下午1:0.5不是一對一教學保證。",
    sources: [{ label: "Guidepost：淺水灣校舍", scope: "海灘道35號、28120274、室內外場地與年齡組；過渡親子活動不當幼稚園學位。", url: "https://guidepost.hk/locations/repulse-bay" }],
    features: { title: "課程特色｜英普自主與戶外空間", featured: true, details: [
      { label: "連續工作循環培養選擇與協作", value: "本校概覽採蒙特梭利工作循環，在英普環境讓孩子按步伐選擇材料及規劃任務；混齡兒童之家讓孩子示範、協作並照顧學習環境。家長可觀察教師如何平衡自由和引導，以及孩子怎樣完成、整理和再次嘗試。", period: "2026/27概覽校方申報", sourceUrl: kgp("6022560001") },
      { label: "戶外條件與年齡組要看實際安排", value: "校方淺水灣頁列獨立室內外遊戲空間、1至2歲過渡、2至3歲Toddler及3至6歲兒童之家，另有延伸及營隊。家庭可確認每天戶外使用、陪同或獨立上課要求、時長與接送，不能用校舍營業時間推定孩子每天上全日課。", sourceUrl: "https://guidepost.hk/locations/repulse-bay" },
    ] },
  }),
];
