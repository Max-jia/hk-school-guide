import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile, reviewedKindergartenWithoutOverview as exceptionalProfile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string, location = "0001") => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}${location}`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與名額另確認";
const middle = "https://www.victoria.edu.hk/campus/middle-kornhill-campus/";
const lower = "https://www.victoria.edu.hk/campus/lower-kornhill-campus/";
const harbour = "https://www.victoria.edu.hk/campus/harbour-green-campus/";
const creative = "https://ty.creative.edu.hk/";
const keen = "http://www.keenmind.com.hk/site/page2.php?id=12";
const cherishNews = "https://hk.epochtimes.com/news/2024-10-16/6716244";

export const KINDERGARTEN_BATCH_85: PilotSchool[] = [
  profile({
    schoolNumber: "569828", locationId: "0001", website: middle, telephone: "28851888", schoolType: "私立獨立幼稚園", principal: "黃敏儀", establishedYear: "2007", gradeSpan: "官網列1歲10個月至5歲11個月；有2歲以下、PN及K1至K3，班別按當屆安排",
    language: "中康怡列英普粵三語班及英普雙語班；各級班型與語言時數另確認",
    ratio: "上午1:3.8；下午1:3.0", ratioIncludesPn: true, teacherCount: 26, classroomCount: 4,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有圖書室。",
    pn: "2025年9月提供2至3歲服務，收錄43人，半日全年117,656元，全日為「-」；有2歲以下服務，沒有幼兒中心資助、暫託或延長服務。官網低齡起點1歲10個月，實際入讀資格與當屆費表另確認。",
    feeSummary: "K1半日111,221元／11期；K2半日101,290元／10期；K3下午102,210元／10期",
    fees: "2026/27 K1上午下午全年111,221元、11期；K2上午下午101,290元、10期；K3上午為「-」、下午102,210元、10期；全日各級均「-」。PN及低齡班、用品與交通另計；不把兩個康怡校舍的費率混用。",
    sourceNote: "569828為康安街18號2樓中康怡28851888，與登記及官網配對，不是R座下康怡28853331。概覽課程欄未填，理念及班型改取中康怡官方專頁；師資不包括0至2歲教師。",
    sources: [],
    features: { title: "課程特色｜中康怡雙語與三語選擇", featured: true, details: [
      { label: "先分清語言班型及入讀年齡", value: "中康怡官網列英普粵三語班及英普雙語班，K1至K3採IB PYP（國際文憑小學項目，以探究統整學習）；另列1歲10個月起低齡班。家長可按孩子家中用語確認所選級別提供哪一班型，再看一週日程，不能由機構三語宣傳推定每班均等課時。", sourceUrl: middle },
      { label: "關愛、堅持與合作落到日常", value: "本校校長介紹以關愛、堅持、開放與合作為方向，讓孩子接觸不同文化、觀點並與同伴互動。家庭可看一次具體探究或衝突處理的例子，了解教師如何引導孩子再次嘗試；這些是校方教學方向，並非已核實的能力成果。", sourceUrl: middle },
    ] },
  }),
  profile({
    schoolNumber: "598623", locationId: "0001", website: "https://www.agneskg.edu.hk/agneswise/", telephone: "35202342", principal: "李家敏", establishedYear: "2014", gradeSpan: grades,
    language: "樂思本校未列中文主教粵普及英語普通話時數；不借雅麗斯其他分校班型",
    ratio: "上午1:7.7；下午1:4.8", ratioIncludesPn: true, teacherCount: 9, classroomCount: 4,
    spaces: "有室內、戶外遊戲場地及音樂室；另列科學探索天地、音樂遊戲場及體能活動場。",
    pn: "2025年9月提供2至3歲服務，收錄15人，半日全年36,740元、全日58,927元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另核對。",
    feeSummary: "K1至K3上午資助後免費；全日全年11,748元／11期；下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午為「-」，全日全年11,748元、11期；PN、膳食及用品另計。全日學費不等於家庭全部開支。",
    sourceNote: "598623為洪水橋青山公路600號尚城地下及1樓，電話35202342；官網樂思專頁聯絡吻合。課程取本校當屆概覽，不套機構其他分校的語言、低齡服務及教師。",
    sources: [],
    features: { title: "課程特色｜奧福音樂與親身探索", featured: true, details: [
      { label: "音樂、戲劇與生活探究", value: "樂思概覽列校本奧福音樂、設計活動及故事戲劇，讓孩子透過科學探索、情景扮演和親子設計親身實踐；亦明列不要求K1執筆寫字及機械式操練。家長可看一個單元的作品和觀察記錄，再判斷是否符合對幼兒學習節奏的期望。", sourceUrl: kgp("598623") },
      { label: "新生適應與全日安排", value: "校方列開學初家長陪同、短課時逐步增加、持續觀察及到校學前康復服務；高班有模擬小一與參觀。需要全日照顧的家庭，可先核對適應期接送、午睡膳食與支援資格，再問清語言日程；參觀小學不等於獲保留學額。", sourceUrl: kgp("598623") },
    ] },
  }),
  profile({
    schoolNumber: "574708", locationId: "0001", website: harbour, telephone: "28851928", schoolType: "私立獨立幼稚園", principal: "陳建雯", establishedYear: "2008", gradeSpan: grades,
    language: "君匯港列英語、普通話、粵語三語班；各語言時數及年級日程另確認",
    ratio: "上午1:6.0；下午1:5.8", ratioIncludesPn: true, teacherCount: 36, classroomCount: 9,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另列建構、沙水、創客、圖書、光影、科學及種植區。",
    pn: "2025年9月提供2至3歲服務，收錄94人，半日全年135,707元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆費率與班別另確認，94人不是PN招生名額。",
    feeSummary: "K1半日118,327元／11期；K2半日107,930元、K3半日111,940元／10期；K3全日210,810元／10期",
    fees: "2026/27 K1上午下午全年118,327元、11期；K2為107,930元、10期；K3為111,940元、10期。全日K1／K2「-」、K3列210,810元、10期，實際開班另確認；PN、膳食用品及交通另計。",
    sourceNote: "574708為深旺道8號君匯港地下28851928，官網校舍頁配對；2歲以下服務沒有，未借中康怡或海峰園低齡班。全年費表按級與期數保留，沒有以低師生比推定班額或錄取難度。",
    sources: [],
    features: { title: "課程特色｜三語探究與創客學習", featured: true, details: [
      { label: "讓孩子參與問題與製作", value: "君匯港官網列K1至K3採IB PYP（國際文憑小學項目）與創客學習，透過設計、製作、實驗及合作，讓孩子主動提出問題；語言班型列英普粵三語。家庭可看一個實際探究單元如何同時帶出閱讀與表達，不只按IB或合作機構名號判斷成效。", sourceUrl: harbour },
      { label: "看作品回饋，也看家長投入", value: "本校概覽列日常觀察、個人學習檔案及定期電子評估，並有家長伴讀、課堂協助與個別跟進。家長可了解回饋是否具體、參助是否自願，以及課後閱讀需要多少時間；有支援安排並不代表每位孩子享有同樣服務時數。", sourceUrl: kgp("574708") },
    ] },
  }),
  profile({
    schoolNumber: "564753", locationId: "0002", website: "http://www.tbcas.edu.hk/SCH06GN/", telephone: "26359706", principal: "朱裘萱", establishedYear: "1999", gradeSpan: grades,
    language: "本校以故事兒歌學英語及普通話；中文主教粵普、各語言時數未列",
    ratio: "上午1:7.9；下午1:6.9", ratioIncludesPn: true, teacherCount: 16, classroomCount: 6,
    spaces: "有室內、戶外遊戲場地及音樂室；另有戶外單車場、圖書館及多功能活動室。",
    pn: "2025年9月提供2至3歲服務，收錄40人，半日全年52,620元、全日93,204元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年27,648元／12期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年27,648元、12期；PN、膳食用品另計。核准費率不代表仍有空缺。",
    sourceNote: "564753校址0002為沙田圍路9至11號田園閣2樓平台26359706，與登記／概覽配對；榮光官方專頁本次405，課程採本校概覽，不把真理其他園或學校關係當升小保證。",
    sources: [],
    features: { title: "課程特色｜圖書語文與感覺統合", featured: true, details: [
      { label: "閱讀和身體探索一起安排", value: "榮光概覽列圖書語文、故事兒歌、英語及普通話週，配主題與方案活動；日常融入感覺統合，並以生命教育培養品格。家庭可看一週課表，了解閱讀、體能和自由活動如何分配；『感統課程』是校方教學安排，不直接等同治療或醫療成效。", sourceUrl: kgp("564753", "0002") },
      { label: "宗教生活與適應支援", value: "校方列駐校社工、校牧、新生親子遊戲小組、適應期及到校學前康復服務，並用持續觀察報告與家庭交流。家長可先確認宗教活動、服務資格和全日作息，再看教師如何把觀察轉成協助；升小模擬及參觀並非特定小學錄取承諾。", sourceUrl: kgp("564753", "0002") },
    ] },
  }),
  profile({
    schoolNumber: "550892", locationId: "0001", website: "http://www.jingjing.edu.hk", telephone: "34094481", principal: "張卓茹", establishedYear: "2001", gradeSpan: grades,
    language: "順利校列中英文教師共同任教及英語拼音；中文粵普主次和時數未列",
    ratio: "上午1:5.5；下午為「-」，不作零學生或比例推算", ratioIncludesPn: true, teacherCount: 8, classroomCount: 4,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄8人，半日全年39,170元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。PN費率與K班申請審核中分開。",
    feeSummary: "K1至K3各時段均列「申請審核中」，須索取當屆核准費表",
    fees: "2026/27 K1至K3上午、下午及全日各格均為「申請審核中」。不能因參加幼稚園教育計劃便補成免費，也不沿用舊費；請向順利分校索取核准學費及膳食用品表，再確認實際開班。",
    sourceNote: "550892為利安道32號順利紀律部隊宿舍2樓15A、34094481；課程取本校概覽，未把集團1969年創立、其他校長或屯門國際班當順利校資料。當屆學費仍待批，沒有填零。",
    sources: [],
    features: { title: "課程特色｜中英共教與Fun Friday", featured: true, details: [
      { label: "繪本、拼音與每週綜合活動", value: "順利校概覽列中英文教師共同任教，以繪本、主題及方案學習，英語拼音循序教授；每週Fun Friday（綜合學習日）以實驗、烹飪及美藝等活動探索。家長可看中英文教師如何配合，另問中文粵普分工，不能由雙語標籤推定英語時數一半。", sourceUrl: kgp("550892") },
      { label: "從成長冊看支援是否具體", value: "本校以主題評估、觀察和成長冊回饋，列新生適應、社工、專注及社交情緒小組、到校學前康復。家庭可確認資格及跟進方式，也宜先拿到當屆核准費表；申報有支援服務不等於所有學生均獲相同安排。", sourceUrl: kgp("550892") },
    ] },
  }),
  profile({
    schoolNumber: "534226", locationId: "0001", website: creative, telephone: "29428818", principal: "羅敏兒", establishedYear: "1999（幼稚園）；2003（幼兒園，校方所列）", gradeSpan: grades,
    language: "青衣校未列中文主教粵普及英語普通話時數；按本校年級班表確認",
    ratio: "上午1:10.5；下午1:5.9", ratioIncludesPn: true, teacherCount: 23, classroomCount: 9,
    spaces: "有室內、戶外遊戲場地及音樂室；官網列Reading Garden、建構區、小農莊與生態科學園。",
    pn: "2025年9月提供2至3歲服務，收錄58人，半日全年36,130元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。官網2026/27半日PN新報價36,630元／10期仍標待批，與舊統計分開。",
    feeSummary: "K半日資助後免費，全日純學費7,900元／10期；官網全日連膳食17,240元／10期待批",
    fees: "2026/27概覽K1至K3上午下午資助後免費，全日純學費全年7,900元、10期。官網當屆全日學費連茶點、午膳及下午茶合計17,240元、10期，標『待批』；PN半日36,630元、10期亦待批。兩表口徑不同，不把連餐總額與純學費當同一數字。",
    sourceNote: "534226是青衣寮肚路3號曉峰園，官網同址同電話29428818；校方明列幼兒園2003，未沿用其他分校年份。官網當屆兩項新費仍待批，保留概覽與申報狀態，不冒稱已核准；升小名單沒有逐校人數，不計比例。",
    sources: [],
    features: { title: "課程特色｜自然、建構與自主遊戲", featured: true, details: [
      { label: "從真實環境動手學", value: "青衣官網列鄰近自然教育徑，校內有小農莊、生態科學園及建構區，讓孩子種植、觀察、試驗與重新設計；戶外遊戲亦鼓勵自己選工具、方法及玩伴。家長可了解天氣不佳時如何安排活動，以及教師如何記錄探索過程，不以校舍面積代替教學質素。", sourceUrl: creative },
      { label: "家長參與與收費要分清", value: "本校列家長工作坊、義務工作及社區參觀，並發布2024/25入讀較多的十所小學名單，未附逐校人數。家庭可看家校溝通方式、參與是否自願，再索取核准PN及全日連餐費表；小學名單並不建立直升或保證錄取關係。", sourceUrl: creative },
    ] },
  }),
  profile({
    schoolNumber: "537713", locationId: "0001", website: "http://www.keenmind.com.hk", telephone: "23380832", schoolType: "私立獨立幼稚園", principal: "朱彩燕", establishedYear: "2000", gradeSpan: grades,
    language: "官網列英語、粵語、普通話及中英文班／雙語國際班；各班主次與時數另確認",
    ratio: "上午1:7.8；下午1:7.7", ratioIncludesPn: true, teacherCount: 32, classroomCount: 9,
    spaces: "有室內、戶外遊戲場地及音樂室，另有電腦室。",
    pn: "2025年9月提供2至3歲服務，收錄152人，半日全年69,355元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認，152人不是招生名額。",
    feeSummary: "K1至K3半日全年77,462元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年77,462元、11期，全日為「-」。PN、用品及交通另計；不把較早入學表格的班型或舊月費當現行安排。",
    sourceNote: "537713是金巴倫道13號地下23380832，與登記／概覽吻合；概覽課程欄空白，採官方Teaching專頁補理念與班型。官網舊外籍教師比例及2019表格未當現行配置。",
    sources: [{ label: "劍鳴：學制與教學", scope: "兩條課程路線、教學語言、主題／方案及蒙特梭利基礎、半日時間及觀察評估；未列各班當屆時數。", url: keen }],
    features: { title: "課程特色｜兩條路線與統整學習", featured: true, details: [
      { label: "先問所選班的語言配置", value: "官網列中英文班及雙語國際班，教學語言包括英語、粵語和普通話；課程結合主題、設計活動及蒙特梭利教育基礎。這說明選擇不只一條，卻未交代每班三種語言時數；家長宜索取所選班日程及一個實際單元，再判斷是否符合升小語言目標。", sourceUrl: keen },
      { label: "半日生活與成長檔案", value: "官方教學頁列上午9時至12時、下午1時半至4時半，以日常表現及每學期學習檔案評估。家庭可了解教師如何提出具體下一步、家中是否需要額外閱讀和接送；採用某種教學法並不直接證明考小成果，實際當屆時間仍須確認。", sourceUrl: keen },
    ] },
  }),
  exceptionalProfile("215929", {
    website: "", telephone: undefined, schoolType: "已公布2025年8月1日停辦；歷史學校資料", gradeSpan: "停辦公告資料，不作現行招生學校", principal: undefined, establishedYear: "1988（停辦報道所載）", tuition: "不提供現行學費；舊費與舊班別不作當屆選校比較", language: undefined,
    dataYear: "2024-10-16停辦報道／所引停辦日期2025-08-01；登記快照2026-09／10；2026-10-24核對",
    sourceNote: "卓基215929校址0002是堅尼地城西環邨東苑台地下及閣樓KG01。2024-10-16報道引校方通告指2025-08-01停辦，並引教育局回覆已接獲通知；2026/27概覽個校返回目錄，舊官網本次502。保留歷史登記，不把登記快照留名當仍招生，也不由此推論撤銷註冊日期。",
    sources: [{ label: "2024-10-16：卓基停辦通告報道及教育局回覆", scope: "引校方2024-10-15通告：2025-08-01停辦；教育局已收到通知。非原始公告，保留報道日期及歸屬。", url: cherishNews }],
    detailSections: [{ title: "辦學狀態｜已公布停辦", featured: true, details: [
      { label: "先看停辦日期，再看舊資料", value: "2024年10月16日報道引述校方通知，因收生不足及財政虧損，決定於2025年8月1日結束辦學，並引教育局回覆已接獲通知。本頁作歷史學校辨認，不把過去免費半日班、PN或全日服務繼續列作可申請選項。", period: "報道2024-10-16；所引停辦日2025-08-01", sourceUrl: cherishNews },
      { label: "登記留名不代表仍有學位", value: "現有登記快照仍可辨認堅尼地城校址，但本次未取得當屆個校概覽及可讀校網。家長如在舊搜尋結果看到招生或學費，應先向教育局確認辦學狀態，再比較仍營運的區內學校；不沿用過往聯絡資料作現行招生承諾。", sourceUrl: cherishNews },
    ] }],
  }),
  profile({
    schoolNumber: "325481", locationId: "0001", website: lower, telephone: "28853331", schoolType: "私立獨立幼稚園", principal: "黃麗琳", establishedYear: "1988（下康怡官網）；概覽列1965，兩者範圍不同", gradeSpan: grades,
    language: "下康怡列英普粵三語班；概覽列每班中英普三語班主任，課時主次另確認",
    ratio: "上午1:6.7；下午1:5.1", ratioIncludesPn: true, teacherCount: 32, classroomCount: 9,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；另列多媒體圖書館。",
    pn: "2025年9月提供2至3歲服務，收錄127人，半日全年118,228元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。不借中康怡1歲10個月起班。",
    feeSummary: "K1半日115,346元／11期；K2半日102,390元、K3下午103,940元／10期；K3全日費列191,470元，開班另核實",
    fees: "2026/27 K1上午下午全年115,346元、11期；K2上午下午102,390元、10期；K3上午「-」、下午103,940元、10期。費表K3全日列191,470元、10期，但同頁註冊費欄又寫沒有開辦全日班，資料有分歧，應先向校方確認實際班制；PN及用品交通另計。",
    sourceNote: "325481為康安街2至8號R座地下及地下下層28853331，不是海峰園25717888，也非中康怡18號。分校官網辦學1988與概覽1965並列，不把機構／登記沿革等同本校舍成立年；全日費與未開辦註記矛盾已明示。",
    sources: [],
    features: { title: "課程特色｜下康怡三語與創客探究", featured: true, details: [
      { label: "探究同時連到閱讀與表達", value: "下康怡官方頁列K1至K3 IB PYP（國際文憑小學項目）、英普粵三語班及創客學習，強調孩子提問、製作和反思；概覽列每班三語班主任。家庭可看一個單元如何連到中文閱讀及英語交流，再確認所選年級語言日程，不由三語配置推算時數比例。", sourceUrl: lower },
      { label: "品格、環境與持續回饋", value: "本校以品格和環境教育培養關懷及珍惜資源，概覽另列學習支援協調員、日常觀察、家長交流及學習展示。家長可了解孩子不適應時如何跟進，並先確認K3是否實際提供全日制；機構資源和校友關係不等於保證升入指定小學。", sourceUrl: kgp("325481") },
    ] },
  }),
  profile({
    schoolNumber: "325180", locationId: "0001", website: "http://www.htckg.edu.hk", telephone: "27154265", principal: "呂婉婉", establishedYear: "1984", gradeSpan: "PN／2至3歲及K1至K3全日；各屆招生狀態另確認",
    language: "本校列兩文三語方向，未列主教粵普及英語普通話時數",
    ratio: "上午1:6.8；下午1:6.8", ratioIncludesPn: true, teacherCount: 29, classroomCount: 11,
    spaces: "有室內、戶外遊戲場地及音樂室；另有陶藝室、舞蹈室、親子圖書館及室內遊戲室。",
    pn: "2025年9月提供2至3歲服務，收錄27人，半日為「-」、全日全年78,485元；沒有2歲以下、幼兒中心資助、暫託或延長服務。全日制不代表有延時照顧，當屆費率與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年19,900元／10期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年19,900元、10期。PN、膳食用品另計；全日學費不等於家庭總開支或仍有學位。",
    sourceNote: "325180是馬頭涌道139號地下至2樓，校號、校長及創辦1984與官網吻合；概覽電話27154265，官網另列27600189／27600832，聯絡前可核對。2026-03-20名額公告限定學年與刊登時間，不當即時空缺表。",
    sources: [],
    features: { title: "課程特色｜設計活動與基督全人教育", featured: true, details: [
      { label: "讓孩子帶着問題找資料", value: "本校概覽以Project Approach（設計活動）按孩子興趣展開生活主題，結連社區資源及專家，鼓勵小組提問、找資料、分析和合作；基督教教育重視良善勇敢與尊重個別氣質。家庭可看教師如何引導不同能力孩子參與，而不只看主題成果展。", sourceUrl: kgp("325180") },
      { label: "全日、適應與招生要分開看", value: "校方列新生適應、持續觀察、情緒輔導及轉介，另與聖公會和區內小學安排銜接活動。官網2026年3月20日曾公布2026/27 K1及PN額滿，現時候補須另詢；全日作息、額滿公告與延時照顧是不同問題，小學合作也不構成直升保障。", sourceUrl: "http://www.htckg.edu.hk" },
    ] },
  }),
];
