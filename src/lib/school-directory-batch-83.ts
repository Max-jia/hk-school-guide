import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與名額另確認";
const lhFees = "https://www.learninghabitat.org/en/admission/fees";
const lhProgram = "https://www.learninghabitat.org/en/admission/programmes";
const lhCurriculum = "https://www.learninghabitat.org/en/curriculum/school-based";
const plk = "https://www.poleungkuk.org.hk/child-care-services/alokkgn";
const adrianne = "https://www.christianadrianne.edu.hk/christianadrianne_belvedere/";

export const KINDERGARTEN_BATCH_83: PilotSchool[] = [
  profile({
    schoolNumber: "559385", locationId: "0001", website: "https://www.twghlcmkg.edu.hk", telephone: "31883565", principal: "馮佩珊", establishedYear: "2004", gradeSpan: grades,
    language: "本校列遊戲與體驗式英語、普通話學習；主要中文粵普分工及當屆教師課時另確認",
    ratio: "上午1:9.5；下午1:7.8", ratioIncludesPn: true, teacherCount: 13, classroomCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另列美藝創作廊、電腦室、體能、唱遊舞蹈及閱讀園地。",
    pn: "2025年9月提供2至3歲服務，收錄27人，半日全年28,400元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費表另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年12,020元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年12,020元、10期。PN、膳食用品及額外項目另計，免費不等於全部開支為0。",
    sourceNote: "校號559385為健明邨明宙樓地下31883565；課程取本校概覽及官網課程頁。官網課程頁發布於2020年，未以其中兩位外籍教師等數字充當2026現任配置；師資統計採2025年9月。",
    sources: [{ label: "華都獅子會：課程及教學", scope: "2020發布課程方向、繪本、英語與音藝；教師舊數不當現況。", url: "https://www.twghlcmkg.edu.hk/%E8%AA%B2%E7%A8%8B%E5%8F%8A%E6%95%99%E5%AD%B8/?lang=en" }],
    features: { title: "課程特色｜繪本、音藝與語文", featured: true, details: [
      { label: "繪本連到探究與創作", value: "本校概覽結合繪本、藝術及英語教學，按孩子興趣與能力設計參與、遊戲及操作活動，K1不要求執筆或機械抄算。家長可看一個繪本單元如何走到提問、音樂、美藝和孩子自己的表達。", sourceUrl: kgp("559385") },
      { label: "英普體驗與成長回饋", value: "校方以遊戲和經驗活動讓孩子使用英語及普通話，以持續及總結評估建立學習檔案，另列入學前親子遊戲、新生家長會和小一模擬。家庭可問清當屆教師日程及回饋頻率，不把網站舊教師數或課外訓練當每名孩子固定配置。", sourceUrl: kgp("559385") },
    ] },
  }),
  profile({
    schoolNumber: "575640", locationId: "0001", website: adrianne, telephone: "24981200", principal: "周綺杏", establishedYear: "2008", gradeSpan: grades,
    language: "麗城校列英語拼音及普通話語音、全語文教材；中文主課粵普及各語言時數未列",
    ratio: "上午1:10.2；下午1:5.0", ratioIncludesPn: true, teacherCount: 10, classroomCount: 6,
    spaces: "有室內、戶外遊戲場地及音樂室，另有視聽、大肌肉室及電腦、運動、圖書角。",
    pn: "2025年9月提供2至3歲服務，收錄14人，半日全年45,860元、全日70,290元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年15,750元／10期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年15,750元、10期。PN、膳食用品與其他項目另核對，不借用灣景校費率。",
    sourceNote: "校號575640是麗城花園第一期第一座，官網麗城專頁24981200吻合，與灣景校24991233分開；登記概覽寫閣樓、官網平台，保留原登記範圍。",
    sources: [],
    features: { title: "課程特色｜安吉遊戲與基督品格", featured: true, details: [
      { label: "讓孩子試做、討論與解難", value: "麗城官網及概覽列安吉自由遊戲、專題與體驗參觀，重邏輯和創意思考，配音樂、體能及美藝。家庭可觀察教師如何在自主遊戲中引導合作及情緒，而不把自由遊戲誤解為完全沒有教學安排。", sourceUrl: adrianne },
      { label: "語文教材與宗教生活", value: "本校以活動教材接觸英語及普通話，另有聖經、金句與宗教活動培養品格；持續觀察、談話及作品記錄成長。家長可核對每天語言分工、宗教參與及適應支援，判斷是否符合家庭習慣。", sourceUrl: adrianne },
    ] },
  }),
  profile({
    schoolNumber: "133280", locationId: "0001", website: "https://wck.ccc.edu.hk", telephone: "25279615", principal: "莫苑萍", establishedYear: "1954", gradeSpan: grades,
    language: "校方列非華語中文學習支援；主教粵普、英語及普通話教師日程未明列",
    ratio: "上午1:8.0；下午1:6.6", ratioIncludesPn: true, teacherCount: 24, classroomCount: 10,
    spaces: "有室內及戶外遊戲場地，沒有獨立音樂室，另有禮堂及小禮堂。",
    pn: "2025年9月提供2至3歲服務，收錄36人，半日全年51,370元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年18,304元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年18,304元、11期；PN、膳食用品另計，K全日不直接代表PN也有同一班制。",
    sourceNote: "校號133280，春園街竹居台及25279615與官網春園街77號竹居台吻合。官網註冊號簡寫13328，不改六位校號133280；已見2027/28招生，沒有把非華語支援推定全英教學。",
    sources: [],
    features: { title: "課程特色｜主題體驗與共融支援", featured: true, details: [
      { label: "主題、活動與自選學習", value: "本校以主題結合活動、自選學習及專題研習，透過觀察、探究與想像建構經驗，配單元總結及持續觀察建立檔案。家庭可看孩子如何由一個問題走到試做與表達，而不只比較書寫作業。", sourceUrl: kgp("133280") },
      { label: "基督精神與多元家庭", value: "校方設園牧、駐校社工、新生適應及幼小銜接，另列非華語中文人手與家長合作，官網與概覽均提及2024/25種族友善活動獎。家長可了解日常共融及語言支援如何落實；獎項不是每名幼兒適應成效的保證。", sourceUrl: kgp("133280") },
    ] },
  }),
  profile({
    schoolNumber: "591777", locationId: "0001", website: "http://www.joyfulenglish.edu.hk", telephone: "24939009", schoolType: "私立獨立幼稚園", principal: "張冠芬", establishedYear: "2012", gradeSpan: grades,
    language: "沙田本校概覽明列英語和普通話教學；粵語支援與各語言時數另確認",
    ratio: "上午1:4.9；下午1:2.7", ratioIncludesPn: true, teacherCount: 19, classroomCount: 6,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；另有圖書、科學及探索角。",
    pn: "2025年9月提供2至3歲服務，收錄47人，半日全年73,480元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。2026/27官網沙田PN月費6,880元另列，不與舊統計混年。",
    feeSummary: "沙田K1至K3半日全年73,480元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年73,480元、11期，與官網沙田K每月6,680元吻合，全日為「-」。官網另列PN每月6,880元及各級上下學期書簿雜費，不借屯門全日費率。",
    sourceNote: "校號591777為火炭銀禧薈7樓701號24939009，官網沙田聯絡吻合；本校沒有獨立音樂室，不套用麗城或荃景設施。",
    sources: [{ label: "心怡天地：分校聯絡", scope: "沙田銀禧薈701號及24939009。", url: "http://www.joyfulenglish.edu.hk/tc/contact.html" }, { label: "心怡天地：2026/27費表", scope: "沙田K每月6680、PN6880及各級雜費。", url: "http://www.joyfulenglish.edu.hk/tc/admission3.html" }],
    features: { title: "課程特色｜英普與繪本探索", featured: true, details: [
      { label: "英普活動須配合家庭用語", value: "沙田概覽以英語和普通話教學，透過校本材料、活動及繪本鼓勵獨立、創意和解難。家庭可先核對初入學溝通支援，再看所選班如何帶孩子說故事與參與遊戲；沒有資料支持固定英普課時比例。", sourceUrl: kgp("591777") },
      { label: "看回饋，也看下午照顧", value: "校方以學習檔案和持續進度報告與家長交流，列家長講故事、義工及親子活動。家長可看具體回饋及教師安排；本校未列全日和延長服務，需要下午照顧時要另作安排，不能因同品牌有全日班就直接套用。", sourceUrl: kgp("591777") },
    ] },
  }),
  profile({
    schoolNumber: "596116", locationId: "0001", website: plk, telephone: "27787182", principal: "巫凱儀", establishedYear: "2014（本址概覽；較早辦學年份有來源差異）", gradeSpan: "2至3歲及K1至K3全日服務；暫託與延長資格另確認",
    language: "本校列外籍教師英語活動；主教粵普及普通話安排未列，不由英文活動推全英主教",
    ratio: "上午1:7.1；下午1:7.1", ratioIncludesPn: true, teacherCount: 10, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另有小組活動室。",
    pn: "2025年9月提供2至3歲服務，收錄7人，半日為「-」、全日全年47,748元；有幼兒中心資助、暫託及延長服務，沒有2歲以下服務。新官網2026/27 N每月3,632元、12期，與舊統計分開；申請年齡12個月不等於12個月可入讀。",
    feeSummary: "K1至K3全日資助後全年23,544元／12期；半日未列",
    fees: "2026/27 K1至K3全日扣減資助後全年23,544元、12期，與現官網每月1,962元吻合，上午下午為「-」。N、膳食用品與額外照顧費另核對，資助資格不保證自動符合。",
    sourceNote: "校號596116，石硤尾邨美盛樓1樓27787182與現官網匹配。概覽本址2014；現官網述1987開辦、2017命名，舊kgn網站卻述1979及其他命名歷史，未拼接為同一完整校史。舊2022/23申請及18個月申請年齡不代現頁12個月申請；服務入讀仍按2至6歲。",
    sources: [{ label: "梁安琪：現行聯絡", scope: "美盛樓1樓27787182；不採集團總機22778888。", url: `${plk}/contact-us` }],
    features: { title: "課程特色｜探索音藝與全日照顧", featured: true, details: [
      { label: "多感官探索與創意音樂", value: "本校概覽結合探究科學、戲劇、奧福音樂、情意及創意美術，採個別、小組與社區體驗，以學習檔案和發展報告追蹤。家長可看全日日程如何交替活動、休息和自由探索，而不只看照顧時數。", sourceUrl: kgp("596116") },
      { label: "照顧服務按家庭需要核對", value: "現官網服務對象2至6歲，列平日8時至18時、週六8時至13時，設廚房與膳食；概覽另列暫託和延長服務。家庭須分清正常服務、個別延長資格、是否另收費及可用名額；可提前申請不等於低於服務年齡即可入讀。", sourceUrl: plk },
    ] },
  }),
  profile({
    schoolNumber: "584517", locationId: "0001", website: "http://www.manhabit.edu.hk", telephone: "23369638", schoolType: "私立獨立幼稚園", principal: "曾韻芝", establishedYear: "2011", gradeSpan: grades,
    language: "本校概覽列中英雙班主任及專科普通話教師；中文主課粵普與時數另確認",
    ratio: "上午1:7.6；下午1:3.8", ratioIncludesPn: true, teacherCount: 5, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室，另有圖書館及軟墊遊戲室。",
    pn: "2025年9月提供2至3歲服務，收錄9人，半日全年73,568元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年73,568元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年73,568元、11期，全日為「-」。PN統計與K費同數仍分開年度，膳食用品及額外項目另核對。",
    sourceNote: "校號584517、金巴倫道43號23369638與登記及概覽對應。官網目前顯示Under Maintenance，沒有因網站維護推定停辦，亦沒有借維護頁外的舊品牌宣傳補當屆課程；現有課程取當屆本校申報。",
    sources: [],
    features: { title: "課程特色｜圖書探究與雙班主任", featured: true, details: [
      { label: "從圖書到角色扮演與參觀", value: "本校概覽以主題圖書配角色扮演、設計活動及參觀，鼓勵孩子探究和體驗，另由專科教師帶音藝。家庭可看一個故事如何延伸成孩子自己提問、操作及表達的活動，判斷與孩子興趣是否相合。", sourceUrl: kgp("584517") },
      { label: "語言及適應安排有待落實到班", value: "校方列中英雙班主任、專科普通話及持續觀察檔案，另有新生適應和高班參觀小學。官網維護期間，家長宜直接向本校索取當屆班表、教師分工和費用；雙班主任不直接等於每天兩位教師全程同時在班。", sourceUrl: kgp("584517") },
    ] },
  }),
  profile({
    schoolNumber: "597295", locationId: "0001", website: "https://gciedu.hk/home", telephone: "26697009", principal: "林玉萍", establishedYear: "2014", gradeSpan: grades,
    language: "上水校列兩文三語及情境學習；主教粵普與英普教師時數未明列",
    ratio: "上午1:7.3；下午1:5.6", ratioIncludesPn: true, teacherCount: 15, classroomCount: 9,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地，另有圖書室、家庭室及多元智能室。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日全年52,580元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3資助後半日全年5,500元、全日28,390元，均10期",
    fees: "2026/27 K1至K3上午下午扣減資助後全年5,500元、10期，全日28,390元、10期。參加教育計劃不等於本校半日免學費；PN、膳食用品另計。",
    sourceNote: "校號597295、上水翠麗花園23至24號26697009與官網及2025非華語公告匹配；不是粉嶺校26697339。早期頁腳傳真與現公告有差異，主聯絡採穩定匹配的電話。面試傳譯不當課堂教學語言。",
    sources: [{ label: "耀基：非華語申請安排", scope: "2025-09-01公告，分清上水及粉嶺聯絡、按需翻譯或親友協助。", url: "https://gciedu.hk/home/2025/15223/" }],
    features: { title: "課程特色｜情境語文與基督生命教育", featured: true, details: [
      { label: "用主題、戲劇與參觀學習", value: "上水概覽採螺旋活動課程，以情境接觸兩文三語，結合專題、戲劇與參觀，鼓勵從做和遊戲中建構經驗。家長可核對所選班具體語言日程，再看孩子如何在活動中表達，不把三語比賽參與當作全體成果。", sourceUrl: kgp("597295") },
      { label: "信望愛與日常家校聯絡", value: "校方以聖經、生命教育及基督少年軍小綿羊培養品格，列閱讀獎勵、新生適應與升小體驗，以成長檔案持續回饋。家長可了解宗教活動及家校聯絡頻率；非華語面試支援按需要安排，不能直接推定日常全英教學。", sourceUrl: kgp("597295") },
    ] },
  }),
  profile({
    schoolNumber: "537950", locationId: "0001", website: "https://www.agneskg.edu.hk/agnestalent/", telephone: "31522600", principal: "范秀芳", establishedYear: "2000", gradeSpan: grades,
    language: "本校當屆概覽未明列主教粵普及英語普通話教師時數；不借雅麗斯其他校舍安排",
    ratio: "上午1:10.0；下午1:7.4", ratioIncludesPn: true, teacherCount: 45, classroomCount: 17,
    spaces: "有室內、戶外遊戲場地及音樂室；另有多元智能室、戶外農莊、建構區、水管牆、Lego牆、藝術及閱讀區。",
    pn: "2025年9月提供2至3歲服務，收錄118人，半日全年44,583元、全日70,008元；沒有2歲以下、幼兒中心資助、暫託或延長服務。收錄118人不是當屆招生名額。",
    feeSummary: "K1至K3半日資助後免費；全日全年11,748元／12期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年11,748元、12期。PN、膳食用品另計；不借用屯門雅麗斯或俊宏軒費表。",
    sourceNote: "校號537950為天龍路2號嘉湖山莊景湖居31522600，集團與天樂專頁均吻合；同集團四校不互借資料。班額、空缺和語言日程不由45人師資或598容額推算。",
    sources: [{ label: "雅麗斯集團：天樂及各校聯絡", scope: "天樂景湖居31522600，與其餘三校分辨。", url: "http://www.agneskg.edu.hk" }],
    features: { title: "課程特色｜感官建構與戶外探索", featured: true, details: [
      { label: "在環境中試做和解難", value: "本校概覽以主題、遊戲、感官和建構活動讓孩子與人事物互動，透過實際操作練習探究、表達和解難，校舍列戶外農莊與建構區。家庭可了解這些區域每天如何使用，以及教師如何支持不同程度孩子參與。", sourceUrl: kgp("537950") },
      { label: "觀察回饋與幼小過渡", value: "校方用日常觀察、個人檔案和評估報告調整教學，高班配參觀小學及體驗，家長可參與故事、義工和觀課。家庭宜問清語言日程、當屆全日照顧與支援資格；升小體驗不是考入特定小學的承諾。", sourceUrl: kgp("537950") },
    ] },
  }),
  profile({
    schoolNumber: "567329", locationId: "0001", website: "https://www.mingwai.edu.hk", telephone: "29040638", schoolType: "私立獨立幼稚園", principal: "梁嘉慧", establishedYear: "2000", gradeSpan: grades,
    language: "本北角分校列英普／英粵為主，三語母語教師協作，另有日語；按班型核對課時",
    ratio: "上午1:9.7；下午1:5.8", ratioIncludesPn: true, teacherCount: 7, classroomCount: 7,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另列閱讀、科學、創意、音樂、遊戲及攀爬區。",
    pn: "2025年9月提供2至3歲服務，收錄28人，半日全年75,240元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另核對。",
    feeSummary: "本北角分校K1至K3半日全年78,980元、全日136,972元，均11期",
    fees: "2026/27 K1至K3上午下午全年78,980元、11期，全日136,972元、11期。PN、膳食用品及課後項目另計；七姊妹道10至12號另一校舍與太子分校不互用費表。",
    sourceNote: "校號567329為七姊妹道5至13號昌輝閣地下1號及1樓，非雅利閣10至12號。概覽29040638、官網同址25908038不同，保留差異以概覽為主聯絡；品牌1968非本分校2000。",
    sources: [{ label: "明慧：分校聯絡", scope: "昌輝閣地址、官網25908038；與概覽29040638不同，未混成另一校舍。", url: "https://www.mingwai.edu.hk/%e8%81%af%e7%b5%a1%e6%88%91%e5%80%91/?lang=zh-hant" }],
    features: { title: "課程特色｜英普／英粵與多語活動", featured: true, details: [
      { label: "按所選班確認中文語音", value: "本分校概覽明列英普或英粵教學、三語母語教師協作及日語，融合繪本、拼音與STEAM活動。家庭先按孩子家中用語及目標小學選班，再核對日程；三文四語是課程接觸範圍，不能當作四種語言平均熟練。", sourceUrl: kgp("567329") },
      { label: "小組探索與升小準備", value: "校方重小組聆聽、提問、嘗試及群體生活，列模擬面試、小一課程和參觀，以六大範疇建立持續評估檔案。家長可比較課堂及課後項目的投入；融合考試內容不等於所有幼兒均報考或達到某個等級。", sourceUrl: kgp("567329") },
    ] },
  }),
  profile({
    schoolNumber: "534200", locationId: "0001", website: "https://www.learninghabitat.org/en/campus/tsing-yi/villa-esplanada-campus", telephone: "25015500", schoolType: "私立獨立幼稚園", principal: "郭希文", establishedYear: "2000", gradeSpan: grades,
    language: "灝景校設粵英及普英K班；PN粵英。雙教師共教，粵英班另有普通話補充課",
    ratio: "上午1:7.5；下午1:7.5", ratioIncludesPn: true, teacherCount: 23, classroomCount: 6,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；另有電腦室與閱讀天地，不把集團農莊當本校自設校園。",
    pn: "2025年9月提供2至3歲服務，收錄56人，半日全年90,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。官網2026/27灝景PN每月7,800元、12期，見上方新年度班型費率。",
    feeSummary: "灝景K粵英全年90,000元、普英93,600元，均12期；全日未列",
    fees: "2026/27概覽K1至K3上午下午全年90,000元、12期，全日為「-」；官網同年灝景費表進一步分粵英每月7,500元、普英7,800元，見上方班型及費用。PN與教材雜費另列。",
    sourceNote: "校號534200為青衣牙鷹洲街8號灝景灣商場第1層25015500，官方英文專頁Level 1吻合，中文專頁曾簡寫地下，保留登記地址。官網英文費表2026/27新、中文仍2025/26，採有明確新年度的英文表；概覽90000只對應官網粵英，不漏普英班。原深度報告連結保留，沒有改報告。",
    sources: [{ label: "學之園：2026/27英文費表", scope: "灝景PN7800、K粵英7500／普英7800每月、全年12期，與其他校舍分開。", url: lhFees }, { label: "學之園：班型及教學語言", scope: "PN粵英、K粵英／普英、雙教師與普通話補充課；Full-Time immersion非全日制班。", url: lhProgram }, { label: "學之園：校本課程", scope: "兒童主導、語文、探究及社交情緒學習；集團農莊非本校自設場地。", url: lhCurriculum }],
    features: { title: "課程特色｜先選中文語音，再核對費用", featured: true, details: [
      { label: "粵英與普英是兩個班型", value: "官方課程頁列PN至K3粵英班，每班一位英語、一位粵語教師，另補充普通話；K1至K3亦可選普英，配普通話拼音。『Full-Time immersion』指上課期間沉浸式用語，實際上午及下午各3小時，不解作全日照顧班。", sourceUrl: lhProgram },
      { label: "灝景2026/27班型費率", value: "官網灝景PN每月7,800元、K粵英7,500元、K普英7,800元，全年12期，對應93,600／90,000／93,600元；這是按官方月費與期數計算。教材雜費、校服及交通另計，PN舊統計90,000元不作當屆報價。", period: "2026/27官網費表", sourceUrl: lhFees },
      { label: "探究、表達與情緒管理", value: "校本課程結合主題、兒童主導專題、科學建構及社交情緒活動，以主題與期終評估回饋。家長可看孩子如何提問、輪候、面對挫折及展示作品，並確認本校活動日程；雙語配置與升小活動不等於特定小學的學額保障。", sourceUrl: lhCurriculum },
    ] },
  }),
];
