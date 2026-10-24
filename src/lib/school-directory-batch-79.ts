import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及學位另確認";
const boxCurriculum = "https://boxhill.edu.hk/curriculum/";
const mynorsAbout = "https://mynors.edu.hk/about-mynors/";
const funCurriculum = "https://www.funcreative.edu.hk/%e5%ad%b8%e6%a0%a1%e8%b3%87%e6%96%99/%e8%aa%b2%e7%a8%8b%e7%b0%a1%e4%bb%8b/";

export const KINDERGARTEN_BATCH_79: PilotSchool[] = [
  profile({
    schoolNumber: "326003", locationId: "0001", website: "https://stpstkg.edu.hk/", telephone: "28136130", principal: "陳鳳賢", establishedYear: "1994", gradeSpan: grades,
    language: "本校列生活英語、字母拼音及普通話；中文主課粵普分工與時數另確認",
    ratio: "上午1:8.2；下午1:5.6", ratioIncludesPn: true, teacherCount: 9, classroomCount: 6,
    spaces: "有室內遊戲場地及資訊室，沒有戶外遊戲場地及音樂室。",
    pn: "2025年9月提供2至3歲服務，收錄13人，半日全年44,220元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另核對。",
    feeSummary: "上午K1/K2及下午K1至K3免費；全日全年14,025元／11期；K3上午未列",
    fees: "2026/27扣減資助後上午K1及K2免費，K3上午為「-」；下午K1至K3免費，全日各級全年14,025元、11期。PN、用品膳食另計，不能將K3下午安排填入上午。",
    sourceNote: "校號326003為赤柱馬坑邨健馬樓地下1號舖，官網28136130及校址吻合；不與香港仔同名聖彼得堂校舍混用。免費是資助後K半日學費，非所有家庭支出。",
    sources: [],
    features: { title: "課程特色｜故事戲劇與基督品格", featured: true, details: [
      { label: "小組故事與自選活動", value: "本校概覽以故事、戲劇和生活主題統整，讓幼兒在小組中表達，自選活動配計劃、工作與匯報，另列視藝及跳繩。家長可了解孩子如何選擇與回顧，以及K1先發展操作能力、不要求執筆的安排，判斷是否符合孩子節奏。", sourceUrl: kgp("326003") },
      { label: "新生適應與升小生活", value: "校方秉承基督精神，列家長陪同的新生適應、模擬小一、生活英語、拼音、普通話與非華語中文支援。家庭可先問當屆適應日期、實際語言分工和接送，再了解宗教與品格活動；模擬小一並非任何小學保留學額。", sourceUrl: kgp("326003") },
    ] },
  }),
  profile({
    schoolNumber: "601250", locationId: "0001", website: "https://mynors.edu.hk/", telephone: "23557500", schoolType: "私立獨立幼稚園", principal: "陳敏詩", establishedYear: "2015", gradeSpan: grades,
    language: "校方列粵語、英語、普通話浸潤環境及英語拼音閱讀；各班主課與時數另確認",
    ratio: "上午1:9.4；下午1:0.2", ratioIncludesPn: true, teacherCount: 12,
    spaces: "概覽未列註冊課室數及室內外、音樂室等明細；不以網頁通用嬰幼兒班表推定本校設施或班額。",
    pn: "2025年9月提供2至3歲服務，收錄80人，半日全年46,800元、全日92,400元；沒有幼兒中心資助、暫託、延長或2歲以下服務。官網低齡Playgroup不等同註冊嬰兒服務。",
    feeSummary: "K1至K3半日全年48,000元、全日84,000元，均10期",
    fees: "2026/27 K1至K3上午下午全年48,000元、10期，全日84,000元、10期；2025年下午及全日K在讀數為0，核准價不證明當屆已開班。PN、用品膳食及藝術中心課程分開核對。",
    sourceNote: "校號601250登記為粉嶺馬適路3號綠悠軒商場1樓1至11A舖，官網電話23557500一致但幼兒園聯絡寫地下，保留不同服務地址表述，實際到校位置先確認。網頁混有通用範本、舊2023/24招生與新藝術中心課程，不作本校當屆班額或註冊低齡證據。",
    sources: [
      { label: "麥克萊：理念及校本課程", scope: "本校EYFS、遊戲探究、品格及校本英語閱讀，非網頁通用模板成效。", url: mynorsAbout },
      { label: "麥克萊：PN課程", scope: "2至3歲的自理、語文、感官及社交活動；幼兒園聯絡表述。", url: "https://mynors.edu.hk/pre-nursery-curriculum/" },
    ],
    features: { title: "課程特色｜遊戲探究與生活自理", featured: true, details: [
      { label: "以英國早期框架設計校本活動", value: "校方參考英國早期基礎階段框架（EYFS），以主題遊戲、故事和藝術培養語文、思考、創意與自理，並列校本英語拼音和閱讀。家庭可要求一份當屆週課表及回饋樣本，了解孩子如何從提問、操作走到表達。", sourceUrl: mynorsAbout },
      { label: "PN與課外英語項目分清", value: "官方PN課程以2至3歲發展為中心，透過故事、音樂、拼砌和遊戲練習自理及交往。官網另有面向K班的藝術中心綜合課程，家長宜確認哪些是日常學費涵蓋、哪些須另報，不把課外考試準備視為所有學生的常規課程。", sourceUrl: "https://mynors.edu.hk/pre-nursery-curriculum/" },
    ] },
  }),
  profile({
    schoolNumber: "601497", locationId: "0001", website: "https://www.611tol.edu.hk/", telephone: "39568611", principal: "陳詩韻", establishedYear: "2015", gradeSpan: grades,
    language: "校方列兩文三語及故事主題；主要粵普語音、英語與普通話課時另確認",
    ratio: "上午1:9.2；下午1:3.8", ratioIncludesPn: true, teacherCount: 11, classroomCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有烘焙、閱讀、遊戲、生活學習、多元活動區及小禮堂。",
    pn: "2025年9月提供2至3歲服務，收錄43人，半日全年42,471元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日資助後免費；概覽列全日全年20,075元／11期，開班待確認",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，概覽另列全日全年20,075元、11期；但2025全日K人數0，末段又寫沒有全日班，實際當屆全日安排需校方確認。PN用品及膳食另計。",
    sourceNote: "校號601497為怡樂街2至12號海濱花園D平台，官方聯絡39568611吻合；舊/tc入口失效，改用現行官方根目錄與課程原頁。全日費表與文字衝突不自行刪去一方。",
    sources: [
      { label: "611生命樹：聯絡", scope: "海濱花園D平台、39568611及幼稚園／幼兒中心名稱。", url: "https://www.611tol.edu.hk/contact-us/contact-details/" },
      { label: "611生命樹：課程理念", scope: "聖經核心、主題、品格及思維與行動；兩文三語是目標。", url: "https://www.611tol.edu.hk/program-features/curriculum-rationale/" },
    ],
    features: { title: "課程特色｜聖經主題與生活實踐", featured: true, details: [
      { label: "信仰、品格與探索一起規劃", value: "校方以聖經為核心，延伸主題學習、品格教育及思維與行動，透過故事、藝術、歌曲舞蹈、實驗和體能遊戲整合學習。家庭可看一個單元如何把分享、責任或照顧環境化成日常行動，再判斷宗教教育與家庭價值是否相合。", sourceUrl: "https://www.611tol.edu.hk/program-features/curriculum-rationale/" },
      { label: "成長紀錄與家長參與", value: "本校概覽列日常觀察、主題持續評估和成長檔案，另有新生適應、駐校社工及小一體驗，家長可參與故事、烹飪與外出支援。家長宜確認參與是否自願、所需時間和個別回饋，不把有親職項目理解為固定家庭義工時數。", sourceUrl: kgp("601497") },
    ] },
  }),
  profile({
    schoolNumber: "559415", locationId: "0001", website: "https://boxhill.edu.hk/mos/", telephone: "27506323", schoolType: "私立獨立幼稚園", principal: "吳詠筠", establishedYear: "2004", gradeSpan: grades,
    language: "校方明列英語為教學及校內溝通語言，粵語與普通話為輔助課程；時數另確認",
    ratio: "上午1:9.4；下午1:3.4", ratioIncludesPn: true, teacherCount: 14,
    spaces: "概覽未列註冊課室、室內外遊戲場地及音樂室明細；不借用其他博士山校舍設施。",
    pn: "2025年9月提供2至3歲服務，收錄83人，半日全年79,200元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "上午K1/K2及下午K1至K3全年79,200元／11期；K3上午及全日未列",
    fees: "2026/27上午K1及K2全年79,200元、11期，K3上午為「-」；下午K1至K3均79,200元、11期，全日為「-」。PN用品交通另核對，不套用將軍澳或火炭費率。",
    sourceNote: "校號559415為馬鞍山恆明街2號聽濤雅苑1期10座地下，官方MOS頁地址一致，校長Luby Ng與概覽吳詠筠互相參考。官網2004首校歷史與本校相符；集團2025年有限學位消息不當作現在餘額。",
    sources: [
      { label: "博士山：共同課程", scope: "EYFS、英語主教、粵普補充及學習檔案，屬校方課程描述。", url: boxCurriculum },
      { label: "博士山馬鞍山：校長訊息", scope: "馬鞍山地址、2004創校及本校EYFS與粵普課程。", url: "https://boxhill.edu.hk/mos/principals-words/" },
    ],
    features: { title: "課程特色｜英語主教與粵普補充", featured: true, details: [
      { label: "語言主次有明確區別", value: "官方課程明列英語是教學及校內溝通語言，粵語和普通話為補充，並以主題活動接觸中文。家庭可先判斷孩子適應英語日常的需要，再問兩種中文的活動頻率及讀寫進度；有三語接觸不代表三語各佔三分之一。", sourceUrl: boxCurriculum },
      { label: "主題遊戲與個人發展檔案", value: "校方採英國早期基礎階段框架（EYFS），配每天故事、拼音、操作數學、角色扮演及合作遊戲，以日常觀察與作品建立個人檔案。家長可看一份回饋如何呈現孩子的自主、情緒和表達，不只看完成多少字詞。", sourceUrl: boxCurriculum },
    ] },
  }),
  profile({
    schoolNumber: "592080", locationId: "0001", website: "https://www.funcreative.edu.hk/", telephone: "27027838", principal: "李百儀", establishedYear: "2013", gradeSpan: grades,
    language: "本校列繪本及非華語中文支援；未公開主要粵普語音及英語、普通話課時",
    ratio: "上午1:8.8；下午1:5.0", ratioIncludesPn: true, teacherCount: 22, classroomCount: 8,
    spaces: "有室內、戶外遊戲場地及音樂室，另有圖書室、非華語教學資源室及童心閣特別遊戲室。",
    pn: "2025年9月提供2至3歲服務，收錄60人，半日全年35,208元、全日62,856元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費表另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年7,172元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年7,172元、11期；PN、用品膳食另計。2025下午K人數為0，核准下午免費不代表當屆仍開班或有學位。",
    sourceNote: "校號592080為將軍澳富寧花園1座地下，官網分校地址吻合；不是觀塘校號323055，兩校年度費率及人數分開。官網收生頁有2026/27標題與舊概覽連結，不沿用其歷史日期作2027/28時間線。",
    sources: [{ label: "歡樂創意：課程簡介", scope: "兒童中心、主題、遊戲及繪本閱讀；共同理念不等於兩校設施相同。", url: funCurriculum }],
    features: { title: "課程特色｜主題探究與多元共融", featured: true, details: [
      { label: "遊戲中觀察、分析與表達", value: "本校概覽以生活主題和專題研習帶動觀察、預測、比較及解難，官網另強調實物操作及繪本閱讀。家庭可看孩子如何在一次探究中提出問題、嘗試與分享，不把閱讀館藏或表演比賽數量當成每名幼兒的學習成果。", sourceUrl: kgp("592080") },
      { label: "非華語支援與成長回饋", value: "本校有非華語教學資源空間，校方申報中文學習支援、新生適應、持續主題與成長評估、駐校社工協作。家庭可確認翻譯與中文支援如何落實，以及多久收到個人回饋；理念共融不代表所有語言班型都已開設。", sourceUrl: kgp("592080") },
    ] },
  }),
  profile({
    schoolNumber: "231592", locationId: "0001", website: "https://www.agneskg.edu.hk/agnes/", telephone: "24588193", principal: "嚴文娟", establishedYear: "1996", gradeSpan: grades,
    language: "當屆概覽未列粵普／英語主課及時數；名稱有「英文」不等於全英教學，需向校方確認",
    ratio: "上午1:8.9；下午1:7.7", ratioIncludesPn: true, teacherCount: 16, classroomCount: 12,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有奧福音樂遊戲室、適體能活動場及圖書館。",
    pn: "2025年9月提供2至3歲服務，收錄60人，半日全年35,387元、全日62,788元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另核對。",
    feeSummary: "K1至K3半日資助後免費；全日全年10,538元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年10,538元、11期。PN與用品膳食另計；不借用同機構其他雅麗斯校舍資料。",
    sourceNote: "校號231592為屯門翠寧花園地下，官網獨立/agnes入口24588193與地址吻合；不是其他雅麗斯品牌校舍。課程按本校概覽，不能由英文校名判斷主要授課語言。",
    sources: [],
    features: { title: "課程特色｜感官探索與個別回饋", featured: true, details: [
      { label: "生活主題與小組討論", value: "本校概覽以兒童生活經驗為中心，用主題、遊戲、感官探索、參觀及小組討論引發學習，K1不要求執筆或機械操練。家庭可了解一次活動如何讓幼兒提出意見及解決問題，再看教師如何照顧不同參與程度。", sourceUrl: kgp("231592") },
      { label: "家長回饋納入學習檔案", value: "校方以持續觀察、學習檔案及報告記錄，邀請家長回饋，並列駐校社工與社區及早介入支援。需要個別協助的家庭可確認跟進及轉介方式；選校時另索取語言日程，不能單憑『英文幼稚園』判斷英語比重。", sourceUrl: kgp("231592") },
    ] },
  }),
  profile({
    schoolNumber: "611646", locationId: "0001", website: "https://iikg.edu.hk/en", telephone: "26623066", schoolType: "非牟利幼稚園（沒有參加幼稚園教育計劃）", principal: "鄒佩凌", establishedYear: "2019", gradeSpan: grades,
    language: "本校列英語、普通話、意大利語、粵語語境及雙語課程；當屆班型、主次與課時另確認",
    ratio: "上午1:5.3；下午1:1.7", ratioIncludesPn: true, teacherCount: 10, classroomCount: 7,
    spaces: "有室內遊戲場地、音樂室及圖書區，沒有戶外遊戲場地；官網6課室描述與概覽註冊7間口徑不同。",
    pn: "2025年9月提供2至3歲服務，收錄16人，半日全年78,892元、全日129,745元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費表另核對。",
    feeSummary: "K1至K3半日全年91,245元、全日140,382元，均11期",
    fees: "2026/27 K1至K3上午下午全年91,245元、11期，全日140,382元、11期。非牟利但未參加教育計劃，不當資助免費；PN、用品及膳食另計。",
    sourceNote: "校號611646為海怡半島1期4座平台1層，官網地址、26623066及2019創辦吻合。官網6課室與概覽註冊7間不混作同一數；2021/22雙軌小冊只作歷史線索，未當當屆仍全部開辦。",
    sources: [{ label: "意大利國際：課程與香港指引", scope: "本地化瑞吉歐、六個學習領域、參觀與家居活動，地址電話吻合。", url: "https://www.iikg.edu.hk/en/content.php?wid=75" }],
    features: { title: "課程特色｜瑞吉歐與多語文化", featured: true, details: [
      { label: "意大利教育理念在香港落實", value: "校方與Reggio Children合作，以瑞吉歐啟發的專題探索配合香港幼稚園課程指引，讓幼兒透過不同媒材表達、建構及與人合作。家長可看一份專題記錄，了解孩子的提問如何延伸，不能由合作關係推定獨立成效評級。", sourceUrl: "https://www.iikg.edu.hk/en/content.php?wid=75" },
      { label: "多語環境不代表意大利語主教", value: "本校概覽列英語、普通話、意大利語及粵語語境與雙語課程，持續觀察和作品納入成長檔案。家庭應按所選班確認主要語言、各語言教師及頻率；意大利校名或舊小冊班型不能代替當屆課表。", sourceUrl: kgp("611646") },
    ] },
  }),
  profile({
    schoolNumber: "158062", locationId: "0001", website: "https://www.yuenyuenkg.edu.hk/fushin/", telephone: "26614583", principal: "何雅斐", establishedYear: "1986", gradeSpan: grades,
    language: "本校列駐校英語及普通話教師與兩文三語；中文主課粵普分工及課時另確認",
    ratio: "上午1:10.9；下午1:9.2", ratioIncludesPn: true, teacherCount: 16, classroomCount: 7,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有圖書、電腦、語言及多功能室。",
    pn: "2025年9月提供2至3歲服務，收錄37人，半日全年29,315元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年7,293元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年7,293元、11期。PN與用品膳食另計；2025下午K人數為0，不以費表推定當屆全開班。",
    sourceNote: "校號158062為富善邨善美樓地下，EDB搜尋與概覽地址、26614583吻合；與其他圓玄校舍分開。官網讀取受限，課程用本校當屆申報；駐校英普老師不推定英普為主要授課語言。",
    sources: [{ label: "EDB：圓玄富善邨學校搜尋", scope: "校號158062、校址0001、善美樓及26614583。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=158062000113" }],
    features: { title: "課程特色｜道化品德與生活主題", featured: true, details: [
      { label: "品格、自由遊戲與三語接觸", value: "本校概覽以『明道立德』及道化教育為宗旨，以生活主題、繪本、音體美和自由遊戲培育價值與表達，配駐校英語及普通話教師。家長可了解日常品格活動及語言分工，判斷教育理念與家庭是否相合。", sourceUrl: kgp("158062") },
      { label: "成長觀察連到適應支援", value: "校方以持續觀察回饋學與教，列親子適應、K3小學體驗、駐校社工及非華語翻譯支援。家長可索取一份觀察記錄，問清孩子遇到困難時如何跟進；參觀與表演項目不等於每天固定安排或小學錄取保障。", sourceUrl: kgp("158062") },
    ] },
  }),
  profile({
    schoolNumber: "537098", locationId: "0001", website: "https://www.hk5skg.edu.hk/", telephone: "27210081", principal: "楊桂香", establishedYear: "2000", gradeSpan: grades,
    language: "本校列兩文三語環境；主要粵普語音、英語及普通話時數未公開",
    ratio: "上午1:12.0；下午1:7.1", ratioIncludesPn: true, teacherCount: 27, classroomCount: 12,
    spaces: "有室內遊戲場地、音樂室及自然角，沒有戶外遊戲場地。",
    pn: "2025年9月提供2至3歲服務，收錄53人，半日全年30,437元、全日66,583元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費表另核對。",
    feeSummary: "K1至K3半日資助後免費；全日全年10,945元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年10,945元、11期。PN、用品膳食另計；官網歷史開放日不是當屆申請限期。",
    sourceNote: "校號537098為綠悠軒商場2樓1至10號舖，不能與同商場麥克萊校號601250混用。五常法指生活整理及自律方法，非全港排名或官方評級；官網2023/24活動按歷史處理。",
    sources: [{ label: "香港五常法：學生支援", scope: "漸進適應、小一銜接、社工及到校康復，屬校方服務描述。", url: "https://www.hk5skg.edu.hk/l/faf48DgxX" }],
    features: { title: "課程特色｜五常習慣與主題探究", featured: true, details: [
      { label: "五常落在孩子日常行動", value: "本校概覽以整理、存放、清潔、標準及修養五項活動培育自理自律，再配生活主題、感官探索和專題研習。家庭可看幼兒如何選取、收拾材料及與同伴合作，不把五常名稱當成嚴格操練或官方優質認證。", sourceUrl: kgp("537098") },
      { label: "漸進適應與小一體驗", value: "官方支援頁列親子適應及漸進上課、小一模擬課程、親子參觀、社工與學前康復；概覽以持續觀察建立學習檔案。家長可先核對所需照顧時段，再問支援申請及回饋安排；有服務不代表當屆即有名額。", sourceUrl: "https://www.hk5skg.edu.hk/l/faf48DgxX" },
    ] },
  }),
  profile({
    schoolNumber: "325597", locationId: "0001", website: "https://www.cwbclmc.edu.hk/", telephone: "25580199", principal: "莫慧儀", establishedYear: "1988", gradeSpan: grades,
    language: "本校列兩文三語環境、繪本與閱讀；主要粵普語音及英語普通話時數另確認",
    ratio: "上午1:8.3；下午1:7.7", ratioIncludesPn: true, teacherCount: 7, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室，另有多功能圖書室；校方列天台體能與種植區。",
    pn: "2025年9月提供2至3歲服務，收錄5人，半日全年33,600元、全日45,600元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費表另核對。",
    feeSummary: "半日資助後免費；全日K1全年16,188元、K2/K3為16,404元，均12期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費；全日K1全年16,188元，K2及K3為16,404元，均12期。PN、用品膳食另計；不同年級全日費率不合成同一價。",
    sourceNote: "校號325597為翡翠道30號1樓及4樓天台（包括幼兒中心），現行學校官網地址電話25580199吻合；舊教會入口改用本校網站。官網指升降機入口在萃文道，到校可先確認動線；不把教會其他教育服務混入本校。",
    sources: [],
    features: { title: "課程特色｜親子閱讀與天台探索", featured: true, details: [
      { label: "圖書室把閱讀帶回家庭", value: "本校概覽以生活主題與繪本統整，另述放學時段開放多功能圖書室供親子共讀、借書及故事爸媽活動，配持續觀察和學習發展檔案。家庭可確認當屆開放時間及借閱安排，再衡量自己能否參與。", sourceUrl: kgp("325597") },
      { label: "宗教、種植與入學適應", value: "校方以基督精神作全人教育，天台安排體能與種植，讓幼兒觀察並品嚐時令蔬果；新生有逐步適應及駐校社工、升小體驗。家長可問清天台安全、天氣備案與當屆適應日程，並確認家庭對宗教生活的接受程度。", sourceUrl: kgp("325597") },
    ] },
  }),
];
