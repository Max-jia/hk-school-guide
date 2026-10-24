import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲及K1至K3；實際班別與空缺另確認";
const fullGrades = "PN／2至3歲及K1至K3全日；當屆資格與名額另確認";
const mosClass = "https://mos.good-health.edu.hk/class/";
const mosCourse = "https://mos.good-health.edu.hk/curriculum/";
const plk = "https://www.poleungkuk.org.hk/child-care-services/wykgn/school-info";
const bgca = "https://nursery.bgca.org.hk/?page_id=14735";

export const KINDERGARTEN_BATCH_90: PilotSchool[] = [
  profile({
    schoolNumber: "565130", locationId: "0001", website: "https://www.cannan.edu.hk", telephone: "23360006", principal: "滕綺雯", establishedYear: "2006", gradeSpan: grades,
    language: "窩打老道校列雙語與兩文三語活動；中文主教粵普、英普教師時數未列",
    ratio: "上午1:8.7；下午1:9.3", ratioIncludesPn: true, teacherCount: 19, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室；其他特別室欄列沒有。",
    pn: "2025年9月提供2至3歲服務，收錄43人，半日全年51,700元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN新費另確認。",
    feeSummary: "K1至K3半日資助後全年9,800元／10期；全日未列",
    fees: "2026/27 K1至K3上午下午扣減資助後全年9,800元、10期，全日均「-」，另列沒有開辦全日班。參加教育計劃不等於免費，9,800元是年費；PN、用品交通另計。",
    sourceNote: "565130為窩打老道111號23360006，與登記／本校概覽配對；與113等鄰校及其他迦南分校分開，沒有套海濱全年3280或私立園費率。",
    sources: [],
    features: { title: "課程特色｜繪本主題與自選探索", featured: true, details: [
      { label: "由故事引發生活問題", value: "本校概覽用生活主題、繪本、五感興趣角與自選分組引導探索，配網上中英文親子閱讀指引。家庭可看所選年級語言日程及一個故事單元，了解教師如何接續孩子問題；集團兩文三語標籤沒有交代本校英普時數。", sourceUrl: kgp("565130") },
      { label: "每年兩次總結並有日常記錄", value: "校方列主題及繪本報告、行為觀察與作品分析，每學年兩次總結，社工跟進、新生適應及到校康復。家長可看回饋是否提出具體下一步，再比較半日外照顧及費用；模擬和參觀小學不代表考小或派位保證。", sourceUrl: kgp("565130") },
    ] },
  }),
  profile({
    schoolNumber: "563463", locationId: "0001", website: bgca, telephone: "22164216", principal: "梁芷惠", establishedYear: "2001", gradeSpan: fullGrades,
    language: "黃大仙本校未明列中文主教粵普及英語普通話時數；不借其他樂緻園",
    ratio: "上午1:7.3；下午1:6.9", ratioIncludesPn: true, teacherCount: 10,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有兼收服務輔導室、活動室及繪本圖書館。註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄15人，半日全年34,764元、全日45,660元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。費率、資格、時段與空缺另確認，不因K全日推PN只全日。",
    feeSummary: "K1至K3全日資助後全年13,320元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年13,320元、12期。PN、膳食用品及暫託延長費另確認；家庭支援基金須按資格申請。",
    sourceNote: "563463為黃大仙上邨達善樓地下22164216，機構入學頁分校聯絡可交叉配對；沒有套灣仔25298484或九龍灣27962122。官網申請表分年度列，未由將軍澳27/28表推黃大仙同一招生時間。",
    sources: [],
    features: { title: "課程特色｜自由遊戲與家庭支援", featured: true, details: [
      { label: "用強項支持不同學習步伐", value: "黃大仙樂緻概覽以多元智能為基礎，按孩子強弱項及能力安排小組，配實物、自由遊戲與主題參觀，培養自理及生活習慣。家長可看老師怎樣調整同一活動，了解孩子是否有足夠選擇和互動，而不以教學理論名稱代替實際觀察。", sourceUrl: kgp("563463") },
      { label: "先確認照顧及基金資格", value: "本校列社工、家庭支援基金學費援助、到校康復與新生適應，另有PN資助、暫託和延長服務。需要較長照顧的家庭可先問時段、空缺、另費及基金條件，再看成長檔案回饋；設有基金不表示每位家庭都可獲批。", sourceUrl: kgp("563463") },
    ] },
  }),
  profile({
    schoolNumber: "565431", locationId: "0001", website: "http://www.hobns.edu.hk", telephone: "26428939", principal: "陳倩瑜", establishedYear: "1988", gradeSpan: fullGrades,
    language: "本校列外籍英語及普通話老師帶生活化活動；中文主教粵普與課時未列",
    ratio: "上午1:7.8；下午1:7.8", ratioIncludesPn: true, teacherCount: 13, classroomCount: 5,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有音體／多用途室。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日「-」、全日全年54,780元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆資格、時間、空缺和新費另確認。",
    feeSummary: "K1至K3全日資助後全年13,452元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年13,452元、12期。PN、膳食用品及暫託延長收費另核對，不把全日學費視為全部照顧費。",
    sourceNote: "565431為馬鞍山恒安邨恒星樓地下1至5號26428939，與登記及本校概覽配對；官網本次405，以本校當屆申報補課程及服務，未借同區其他浸信園。",
    sources: [],
    features: { title: "課程特色｜戲劇表達與感恩品格", featured: true, details: [
      { label: "以角色和動作練習表達", value: "恒安概覽以戲劇為主要教學媒介，配生活主題、小組、語言及肢體動作，讓孩子抒發情緒與建立溝通；基督品格教育重感恩及面對挑戰，外籍英語及普通話老師帶生活活動。家庭可看慢熱孩子如何參與，而不把戲劇等同強迫上台。", sourceUrl: kgp("565431") },
      { label: "觀課和真實情境回饋", value: "本校以真實學習環境的觀察識別需要，列學前社工及到校康復，邀家長觀課、懇談及參與活動。家長可索取一份具體回饋，另核對延長照顧時段、資格與費用；有服務申報不代表隨時可用，語言主次也須看班表。", sourceUrl: kgp("565431") },
    ] },
  }),
  profile({
    schoolNumber: "565113", locationId: "0001", website: "https://mos.good-health.edu.hk/", telephone: "26411717", schoolType: "私立獨立幼稚園", principal: "何鳳冠", establishedYear: "1984", gradeSpan: grades,
    language: "馬鞍山官網列粵英雙語比重大致相等，普通話補充；外籍老師英語拼音，實際課時另確認",
    ratio: "上午1:9.8；下午1:8.0", ratioIncludesPn: true, teacherCount: 16, classroomCount: 8,
    spaces: "有室內、戶外遊戲場地及音樂室；另有圖書館、思維遊戲室、戶外種植及創意藝術園地。",
    pn: "2025年9月提供2至3歲服務，收錄89人，半日全年52,481元、全日81,279元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年27,478元、全日73,700元，均11期；未參加免費計劃",
    fees: "2026/27 K1至K3上午下午全年27,478元、11期，全日73,700元、11期，沒有參加幼稚園教育計劃。費率按原表，不改成其他康傑分校數字；PN、膳食用品交通另計。",
    sourceNote: "565113為富寶花園1樓馬鞍台26411717，官網補錦英路6號同址同電話。頁內tel連結尾多一個8，沒有照抄錯碼；2025 K皆全日不推當屆無半日，亦不借青衣沒有全日的安排。",
    sources: [{ label: "康傑馬鞍山：學制與語言", scope: "本校粵英大致相等、普通話補充及英語教師；未標課時比例。", url: mosClass }, { label: "康傑馬鞍山：校本課程", scope: "故事、漢字、數學、情緒品格與體藝，為校方自述。", url: mosCourse }],
    features: { title: "課程特色｜粵英雙語與生活品格", featured: true, details: [
      { label: "粵語母語配英語，不忽略普通話", value: "馬鞍山官方學制明列粵英雙語、學習比重大致相等，英語由外籍教師負責並重拼音，另有普通話活動。家庭可按所選年級看讀本及一週日程，判斷家中中文語音和升小目標是否一致；『大致相等』是校方說明，沒有逐時段課時表。", sourceUrl: mosClass },
      { label: "學習與情緒有具體安排", value: "本校課程列故事、漢字遊戲、小作家、操作數學、比比和朋友情緒課及體藝；概覽每週觀察、每主題評估及學期總結。家長可看回饋如何處理孩子挫折與自理，再確認全日午睡餐食；校方『卓越升小』宣傳沒有分母，不作成果保證。", sourceUrl: mosCourse },
    ] },
  }),
  profile({
    schoolNumber: "565024", locationId: "0001", website: "http://www.yymmps.edu.hk", telephone: "22510866", principal: "葉惠麗", establishedYear: "1967", gradeSpan: fullGrades,
    language: "本校概覽未明列中文主教粵普及英語普通話時數；按當屆年級班表核對",
    ratio: "上午1:7.7；下午1:7.7", ratioIncludesPn: true, teacherCount: 10,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；其他特別室與註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄8人，半日「-」、全日全年46,692元；沒有2歲以下，有幼兒中心資助及暫託，沒有延長服務。當屆資格、空缺及新費另確認。",
    feeSummary: "K1至K3全日資助後全年14,340元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年14,340元、12期。PN、膳食用品及暫託另費另核對；全日或暫託不等於可延後接送。",
    sourceNote: "565024為油麻地窩打老道54號3樓22510866，與登記及本校概覽吻合；官網本次405，未與其他楊震學校的課程／收費互換。",
    sources: [],
    features: { title: "課程特色｜故事戲劇與生命教育", featured: true, details: [
      { label: "遊戲和藝術連到真實情緒", value: "油麻地楊震概覽以生命教育、故事戲劇綜合課程，配小組、戶外參觀、制服團隊、情緒小組及感官活動。家庭可看一個故事如何連到孩子的生活和同伴互動，再了解宗教參與；感統及歷奇是校方活動描述，不直接當治療成效。", sourceUrl: kgp("565024") },
      { label: "有暫託，沒有申報延時", value: "本校列新生生活體驗與適應、小一預備、社工情緒輔導、到校康復及家長資源中心。家長可先確認全日作息、暫託資格和接送截止，再看學期評估如何形成具體建議；圖書親職資源可借用，不代表每項支援無條件提供。", sourceUrl: kgp("565024") },
    ] },
  }),
  profile({
    schoolNumber: "569712", locationId: "0001", website: "http://www.skhwcn.edu.hk", telephone: "28327101", principal: "岑婉霞", establishedYear: "2006", gradeSpan: fullGrades,
    language: "灣仔本校列專任外籍英語及普通話教師；中文主教粵普與各語言時數未列",
    ratio: "上午1:9.9；下午1:9.9", ratioIncludesPn: true, teacherCount: 8, classroomCount: 4,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有閱覽室。",
    pn: "2025年9月提供2至3歲服務，收錄15人，半日「-」、全日全年57,720元；沒有2歲以下，有幼兒中心資助及延長服務，沒有暫託。資格、時間及新費另確認，不套葵涌園。",
    feeSummary: "K1至K3全日資助後全年7,080元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年7,080元、12期；PN、膳食用品及延長服務費另核對。不能因年費較低就推全部照顧開支均已包括。",
    sourceNote: "569712是灣仔道3號3樓28327101，概覽現官方入口skhwcn.edu.hk；舊skhsch.org.hk是機構25201056，不當學校電話。校網本次405，課程取灣仔本校申報，與葵涌服務分開。",
    sources: [],
    features: { title: "課程特色｜繪本、蒙氏教具與混齡", featured: true, details: [
      { label: "讓孩子在區角選擇和操作", value: "灣仔概覽以繪本整合課程，配蒙特梭利教具學數學、感官與自理，自由分組時各級可進智力、藝術、自然和語文區互相學習，另有英普專任教師。家庭可看教師如何照顧混齡差異，不能僅由教具名稱推為完整蒙氏教育體系。", sourceUrl: kgp("569712") },
      { label: "語言小組與延長照顧", value: "本校列非華語語文小組、社工、到校康復、新生適應及每學期面談，並由教師家長孩子共同建立檔案。家長可問支援和延時資格、時段及另費，再核對日常語言安排；延時有申報並不表示同時有暫託服務。", sourceUrl: kgp("569712") },
    ] },
  }),
  profile({
    schoolNumber: "567345", locationId: "0001", website: plk, telephone: "25906332", principal: "溫翠慧", establishedYear: "2005", gradeSpan: "2至6歲、PN至K3全日；可12個月起申請不等於12個月入讀",
    language: "本校列外籍教師英語教學；主要中文粵普、普通話教師及時數未列",
    ratio: "上午1:9.3；下午1:9.3", ratioIncludesPn: true, teacherCount: 18, classroomCount: 5,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有小組活動室。",
    pn: "2025年9月提供2至3歲服務，收錄32人，半日「-」、全日全年38,580元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。2026/27官網PN新月費見上方，舊統計不當新報價。",
    feeSummary: "K1至K3全日資助後全年16,092元／12期；官網當屆PN月費2,675元、12期",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年16,092元、12期，與官網K月費1,341元吻合。PN新費、膳食用品、暫託及延長服務應按校方完整費表核對，資格另確認。",
    sourceNote: "567345為鰂魚涌基利路1號社區綜合大樓1樓A、25906332，校方專頁明列2005及服務2至6歲；頁尾22778888為保良局總機，不覆蓋本校。12個月可申請不是低齡入讀；新PN月2675與2025概覽38580分年。",
    sources: [],
    features: { title: "課程特色｜探究體藝與全日照顧", featured: true, details: [
      { label: "科學、戲劇和音樂一起學", value: "慧妍雅集概覽以孩子生活興趣設課，列探究科學、戲劇、奧福、情意及美術，外籍教師教英語；另有兼收與按需輔助醫療支援。家長可看實際作品和教師回饋，確認治療轉介條件，不把機構資源當每人固定服務時數。", sourceUrl: kgp("567345") },
      { label: "當屆PN新費及服務時間", value: "官網2026/27 PN月費2,675元、全年12期，按此計全年32,100元；K月1,341元。服務時間列星期一至五8時至18時、星期六8時至13時，實際年級作息另問；有廚房提供早餐午餐水果茶點，但是否另計應看費表。12個月可申請，正式服務對象仍2至6歲。", period: "2026/27官網費表及服務介紹", sourceUrl: plk },
    ] },
  }),
  profile({
    schoolNumber: "568104", locationId: "0001", website: "http://www.skhkckg.edu.hk", telephone: "22579331", principal: "關烯妍", establishedYear: "2006", gradeSpan: fullGrades,
    language: "葵涌官網列兩文三語，未明列主要中文粵普及英語普通話教師／時數",
    ratio: "上午1:13.6；下午1:13.6", ratioIncludesPn: true, teacherCount: 7,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有駐校社工室。註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄24人，半日「-」、全日全年65,004元；沒有2歲以下，有幼兒中心資助，沒有暫託或延長服務。實際當屆費率及資助資格另確認。",
    feeSummary: "K1至K3全日資助後全年10,368元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年10,368元、12期；PN、膳食用品另計，不套灣仔7,080元或其延時服務。",
    sourceNote: "568104是葵涌商場3樓平台1號22579331，校方官網同址同電話；不同於灣仔569712。專業支援按機構及個別需要，不由申報心理及治療資源推定每童直接獲配。",
    sources: [],
    features: { title: "課程特色｜小組探究與個別面談", featured: true, details: [
      { label: "按興趣和能力設計探索", value: "葵涌概覽以主題和專題、小組討論、遊戲及戶外觀察統整六大範疇，並融入基督靈育。家庭可看教師如何按不同孩子能力調整活動，另問清語言日程；校外觀察不等於校內有註冊戶外遊戲場地。", sourceUrl: kgp("568104") },
      { label: "全日並沒有延長服務", value: "本校以成長檔案及每學期家長個別面談回饋，列社工、到校康復及機構心理和治療資源。家長可問轉介資格、實際可用時段與日常接送；原表沒有暫託及延長服務，不能因同品牌灣仔園有延時就假設葵涌也可延後接送。", sourceUrl: kgp("568104") },
    ] },
  }),
  profile({
    schoolNumber: "563498", locationId: "0001", website: "http://www.mccsan.edu.hk", telephone: "27010939", principal: "鄭敏慧", establishedYear: "1988", gradeSpan: grades,
    language: "本校列兩文三語及英文活動，未明列中文主教粵普與各語言時數",
    ratio: "上午1:5.3；下午1:4.3", ratioIncludesPn: true, teacherCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；註冊課室數及其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄11人，半日全年38,748元、全日39,252元；沒有2歲以下，有幼兒中心資助，沒有暫託或延長服務。兩種費率差額按原表保留，當屆適用資格及餐費另確認。",
    feeSummary: "K1至K3上午資助後免費；全日全年14,400元／12期；下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午為「-」，全日全年14,400元、12期。PN、膳食用品另計；低在讀或師生比例不能直接當個別教學或錄取機會。",
    sourceNote: "563498為寶林邨寶泰樓地下A翼及B翼1號及8號27010939，與登記／概覽匹配；官網本次405，課程採本校申報，不借同機構其他幼稚園。課室缺值不由容額65推算。",
    sources: [],
    features: { title: "課程特色｜基督生活與設計活動", featured: true, details: [
      { label: "由自理到專題與小食製作", value: "司務道概覽以基督愛人、兒童中心與設計活動，配專題、生命教育、小食製作、電腦及語文遊戲，把常規、自理和群體生活一起學。家庭可看孩子怎樣選擇和動手，確認宗教與語言日程，不以科目名稱數目代替課程深度。", sourceUrl: kgp("563498") },
      { label: "家長陪同適應與持續跟進", value: "本校列新生家長陪伴適應、個別輔導與到校康復，以主題和學期觀察回饋，並安排高班參觀及模擬小一。家長可先核對半日或全日作息、PN資助和膳食費，再看教師的具體建議；參觀小學沒有保證錄取關係。", sourceUrl: kgp("563498") },
    ] },
  }),
  profile({
    schoolNumber: "564486", locationId: "0001", website: "http://stc.ppe.rhenish.org", telephone: "27902765", principal: "李素貞", establishedYear: "1985", gradeSpan: fullGrades,
    language: "本校列外籍英語及普通話導師、英語語音認知課；中文主教粵普與時數未列",
    ratio: "上午1:8.6；下午1:8.4", ratioIncludesPn: true, teacherCount: 13,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有小組活動室及多元智能遊戲室。註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄23人，半日全年29,760元、全日40,860元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆資格、空缺及新費另確認。",
    feeSummary: "K1至K3全日資助後全年11,628元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年11,628元、12期。PN、膳食用品及暫託延長費另核對；支援諮詢與治療名額須按個別條件確認。",
    sourceNote: "564486為順天邨天韻樓低座地下19至31號27902765，登記／本校概覽一致；官網新入口stc.ppe.rhenish.org，舊wd域本次不可讀。新站本次405，未借其他禮賢園課程數字。",
    sources: [],
    features: { title: "課程特色｜生活自選與寫前訓練", featured: true, details: [
      { label: "合作與個人探索都有位置", value: "順天概覽按孩子發展及興趣設計群體、小組和自選活動，走到社區真實情境學習；英普導師及機構寫前、書寫、英語語音認知課程提供語文支援。家庭可看年齡如何分階段進行，校方明列K1不要求執筆，不能把『書寫課程』解讀為提早操寫。", sourceUrl: kgp("564486") },
      { label: "照顧與專業諮詢要逐項問", value: "本校用老師家長孩子三方資料建立檔案，列新生適應、到校康復和語言、職業、物理治療諮詢，另有PN資助、暫託和延長服務。需要支援的家庭可先核對資格、時段及另費，再看如何跟進；可諮詢不等於人人取得固定治療名額。", sourceUrl: kgp("564486") },
    ] },
  }),
];
