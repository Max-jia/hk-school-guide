import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別及學位另確認";
const lhCurriculum = "https://www.learninghabitat.org/en/curriculum/school-based";
const lhFees = "https://www.learninghabitat.org/en/admission/fees";
const jingContact = "https://www.jingjing.edu.hk/contact";

export const KINDERGARTEN_BATCH_76: PilotSchool[] = [
  profile({
    schoolNumber: "578193", locationId: "0001", website: "https://discoverymind.edu.hk/", telephone: "29878070", schoolType: "私立獨立幼稚園", principal: "方俊雅", establishedYear: "2009", gradeSpan: grades,
    language: "校方列國際及英普雙語課程；東涌當屆班型、粵語角色及語言時數另確認",
    ratio: "上午1:10.7；下午1:7.3", ratioIncludesPn: true, teacherCount: 10, classroomCount: 5,
    spaces: "有室內、戶外遊戲場地及音樂室，另列多功能體能室及圖書閱讀廣場。",
    pn: "2025年9月提供2至3歲服務，收錄47人，半日全年86,350元，全日為「-」；沒有2歲以下服務、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "上午只列K1全年90,640元；下午K1、K2為90,640元，K3為99,330元，均11期",
    fees: "2026/27上午K1全年90,640元、11期，K2及K3為「-」；下午K1及K2為90,640元、K3為99,330元，均11期；全日為「-」。不要將一個年級費率套用所有時段；用品及交通另計。",
    sourceNote: "校號578193為東涌海濱路8號海堤灣畔商場地下；官網東涌幼稚園電話29878070吻合。集團自1996年辦學不是本校舍創校年份；同區集團小學的電話及升學條件另計，不推定直升。",
    sources: [{ label: "弘志：各校舍聯絡", scope: "分清東涌幼稚園、愉景灣幼稚園與東涌小學的地址電話。", url: "https://discoverymind.edu.hk/contact-us/" }],
    features: { title: "課程特色｜遊戲探究與成長觀察", featured: true, details: [
      { label: "以早期學習框架安排探索", value: "本校概覽以英國早期基礎階段框架（EYFS）規劃認知、技能及態度，列國際與英普雙語課程，透過探索、合作及生活情境學習。家庭可先了解東涌所選班型的語言分工，再觀察教師如何讓孩子提問與選擇材料。", sourceUrl: kgp("578193") },
      { label: "用觀察回饋孩子的適應", value: "校方列持續目標觀察、與孩子對話及每學期家長面談週，並有閱讀、美術塑形等活動。這些是校方所述的日常安排；家長可索取一份成長紀錄樣本，了解回饋是否涵蓋自理、合作與表達，而不只看語文進度。", sourceUrl: kgp("578193") },
    ] },
  }),
  profile({
    schoolNumber: "567892", locationId: "0002", website: "https://www.jingjing.edu.hk/", telephone: "24574666", principal: "張卓茹", gradeSpan: grades,
    language: "校方列中英雙教師及英語拼音；中文主課粵普分工、各語言時數另確認",
    ratio: "上午1:6.2；下午1:4.3", ratioIncludesPn: true, teacherCount: 9, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；其他特別室未列。",
    pn: "2025年9月提供2至3歲服務，收錄9人，半日全年37,860元、全日73,870元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3資助後半日全年5,210元、全日17,800元，均10期",
    fees: "2026/27 K1至K3上午下午扣減資助後全年5,210元、10期；全日17,800元、10期。參加幼稚園教育計劃不等於本校半日免費；PN、膳食及用品另計。",
    sourceNote: "本校為校號567892、校址0002金邦商場，非置樂花園的晶晶國際。原表登記單位為5、10至11、13至20、23至24號，官網聯絡頁簡寫14至20號，保留完整登記範圍。集團1969年歷史不直接當作這個校舍的啟用年。",
    sources: [{ label: "晶晶：分校聯絡", scope: "金邦校舍地址與24574666；與置樂花園國際校分開。", url: jingContact }],
    features: { title: "課程特色｜故事探索與幼兒適應", featured: true, details: [
      { label: "主題、故事與動手活動", value: "本校概覽列故事、主題及專題研習，中英文教師配合拼音教學；星期五安排實驗、烹飪及藝術等活動。家長可了解一個主題如何延伸到對話、數量及合作，並確認在沒有戶外遊戲場地下每天如何安排大肌肉活動。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5678920002" },
      { label: "K1先建立習慣，K3另作銜接", value: "校方申報K1不要求書寫，並列新生適應、正向價值與抗逆力、小學銜接及家長支援。家庭可問清由口語和操作走到書寫的進度，以及入學初期分離焦慮如何處理；不把課程目標解作每名孩子同速發展。", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=5678920002" },
    ] },
  }),
  profile({
    schoolNumber: "586625", locationId: "0001", website: "https://www.stcatherines.edu.hk/", telephone: "26706600", schoolType: "私立獨立幼稚園", principal: "伍詠怡", establishedYear: "2011",
    gradeSpan: "海濱南岸：概覽PN收錄382人，K1至K3各班人數為0；當屆實際開班及升班校舍另確認",
    language: "本校申報粵語、英語、普通話環境及中英文故事主題；未公開各語言時數",
    ratio: "上午1:5.4；下午1:5.8", ratioIncludesPn: true, teacherCount: 35,
    spaces: "有室內遊戲場地、音樂室及圖書區，沒有戶外遊戲場地；註冊課室數目未列。",
    pn: "2025年9月提供2至3歲服務，收錄382人，半日全年90,244元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。382是當時在讀人數，不是每年招生名額。",
    feeSummary: "概覽列K1至K3半日全年64,328元／11期；不代表海濱南岸當屆均開班",
    fees: "2026/27核准表列K1至K3上午下午全年64,328元、11期，全日為「-」；但2025年9月K1至K3各班人數均為0，不能由費表推定本校舍實際招收所有年級。PN適用另一費率，升班地點及當屆PN費表須分開核對。",
    sourceNote: "校號586625為紅磡愛景街8號海濱南岸1樓，非九龍塘國際英文校址。官方PN申請入口的地址及26706600吻合；主站資料未能完整取得，以概覽及官方PN通告為依據；2027/28申請通告與2025年統計不合併為當屆學額。",
    sources: [{ label: "國際英文海濱南岸：官方PN申請", scope: "校址電話及2027/28 PN通告；該輪2026年9月18日至29日申請，並非現在仍開放。", url: "https://admission.ekinder.com.hk/stcikghp" }],
    features: { title: "課程特色｜先分清PN與升班校舍", featured: true, details: [
      { label: "遊戲中的溝通、合作與表達", value: "本校概覽以兒童為中心，透過中英文故事、主題、感官活動及角色扮演，發展溝通、合作、創意、關懷和思考。三語環境是校方課程描述，未附時數；家庭可了解PN日常的安撫語言、班級教師分工及成長紀錄。", sourceUrl: kgp("586625") },
      { label: "PN申請年齡與K1安排分開查", value: "官方2027/28 PN通告接受2024年10月1日至2025年8月31日出生幼兒，該輪申請期已於2026年9月29日結束。準備後續學年的家庭應再看新通告，並向校方確認升K1的校舍、程序和條件，不能把海濱南岸的PN人數當作K1保留學額。", period: "2027/28 PN通告；查閱2026-10-24", sourceUrl: "https://admission.ekinder.com.hk/stcikghp" },
    ] },
  }),
  profile({
    schoolNumber: "587524", locationId: "0001", website: "https://www.jingjing.edu.hk/", telephone: "24045266", schoolType: "私立獨立幼稚園", principal: "MS JHAVERI, RESHMA MILIND", establishedYear: "2011", gradeSpan: grades,
    language: "校方列EYFS及Jolly Phonics英語拼音；中文、普通話安排及語言時數另確認",
    ratio: "上午1:7.2；下午1:2.0", ratioIncludesPn: true, teacherCount: 6, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；課程所述戶外探索不等於校內有註冊戶外場地。",
    pn: "2025年9月提供2至3歲服務，收錄11人，半日全年74,600元、全日109,350元；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年74,340元、全日104,640元，均10期",
    fees: "2026/27 K1至K3上午下午全年74,340元、10期，全日104,640元、10期；PN、膳食、用品另計。不使用同品牌金邦資助校的費率。",
    sourceNote: "校號587524為青海圍18號置樂花園47至54號地舖，官網24045266吻合；與金邦校舍分開。概覽本校創辦2011年與官網國際部發展歷史2006年口徑不同，不合併為同一校舍年份。",
    sources: [{ label: "晶晶：分校聯絡", scope: "置樂花園與24045266；有別於金邦校舍。", url: jingContact }],
    features: { title: "課程特色｜遊戲學習與英語拼音", featured: true, details: [
      { label: "英國早期框架配合多感官拼音", value: "本校概覽採英國早期基礎階段框架（EYFS）七個學習範疇，K1至K3用Jolly Phonics拼音，把聲音與動作、故事等連結，並以遊戲及探究帶動參與。家庭可看孩子如何從聽音走向閱讀，不將採用一套教材視為英語水平的保證。", sourceUrl: kgp("587524") },
      { label: "從每週家校紀錄看日常", value: "校方列每週電郵活動照片及學習計劃，校長訊息重視兒童發展與家校合作。家長可確認回饋能否說明孩子的互動、適應和下一步，而不只收到集體活動照片；中文及普通話在一日中的角色亦宜另外問清。", sourceUrl: kgp("587524") },
    ] },
  }),
  profile({
    schoolNumber: "609528", locationId: "0001", website: "https://www.learninghabitat.org/", telephone: "23631500", schoolType: "私立獨立幼稚園", principal: "張淇淇", establishedYear: "2004", gradeSpan: grades,
    language: "CE班以英語與粵語雙教師，另有普通話；PE班以英語與普通話雙教師；當屆年級班型另確認",
    ratio: "上午1:7.9；下午1:7.9", ratioIncludesPn: true, teacherCount: 29, classroomCount: 8,
    spaces: "有室內、戶外遊戲場地及音樂室，另列電腦、圖書及寧靜角。",
    pn: "2025年9月提供2至3歲服務，收錄112人，半日全年90,000元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。官網2026/27 CPLV的PN為每期7,800元、12期，共93,600元，勿混用兩個年度。",
    feeSummary: "K1至K3半日全年90,000至93,600元／12期；全日未列",
    fees: "2026/27概覽K1至K3上午下午全年90,000至93,600元、12期；官方分校表進一步列CPLV：CE每期7,500元（全年90,000元），PE每期7,800元（全年93,600元）。全日為「-」，用品交通另計。",
    sourceNote: "校號609528為紅磡漆咸道北388號昇御門地下G06至G26；官方Chatham LV聯絡23631500吻合。PN2025統計費與2026/27分校新表分開；不使用迎海的費率或設施。",
    sources: [
      { label: "學之園：昇御門校舍", scope: "紅磡校舍地址電話及校車入口；辦公時間不是上課時數。", url: "https://www.learninghabitat.org/en/campus/hung-hom/chatham-lv-campus" },
      { label: "學之園：校本課程", scope: "CE／PE語言分工、閱讀及社交情緒學習，屬共同課程說明。", url: lhCurriculum },
      { label: "學之園：2026/27分校收費", scope: "CPLV的PN、CE及PE每期金額與12期。", url: lhFees },
    ],
    features: { title: "課程特色｜按語言班型選擇", featured: true, details: [
      { label: "英粵與英普有不同中文路線", value: "校方CE課程由英語及粵語母語教師配合，另補普通話表達；PE由英語及普通話教師配合，並有拼音教材。家長宜按孩子現有中文口語與未來學校語言選班，再確認所申請年級提供哪一類，不由『雙語』兩字推算固定時數。", sourceUrl: lhCurriculum },
      { label: "主題探究與社交情緒一起看", value: "官網列生活主題、動手探索、校本拼音閱讀，以及認識情緒、建立關係和負責任選擇的社交情緒學習。家庭可了解如何透過故事分享和舞台表達觀察孩子的參與，也可索取一份評估樣本；這些安排不等於特定小學的錄取保障。", sourceUrl: lhCurriculum },
    ] },
  }),
  profile({
    schoolNumber: "601403", locationId: "0001", website: "http://www.hartspreschool.com/tc/curr.php", telephone: "23382878", schoolType: "私立獨立幼稚園", principal: "MRS LEWISLAY, VANESSA EIRLYS", establishedYear: "2015", gradeSpan: grades,
    language: "校方以英語、普通話、粵語培養三語能力；主要授課語言與各科時數未列",
    ratio: "上午1:7.3；下午1:2.8", ratioIncludesPn: true, teacherCount: 16, classroomCount: 6,
    spaces: "概覽未列室內外遊戲場地、音樂室等明細，不由藝術課程推定註冊專室配置。",
    pn: "2025年9月提供2至3歲服務，收錄53人，半日全年89,958元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日全年92,675元／11期；全日未列",
    fees: "2026/27 K1至K3上午下午全年92,675元、11期，全日為「-」。官網另列半日作息及外判校車，PN、用品、校車費另確認。",
    sourceNote: "校號601403為界限街68號曉珀御地下及1樓，與官網23382878及招生地址相符。主站入口錯誤，但中文課程及招生子頁可讀。官網未註年的1:9描述不替代概覽2025年分時段比率。",
    sources: [
      { label: "樂希：語文、音樂與體育", scope: "三語、拼音、音樂律動與體育安排，屬校方課程描述。", url: "http://www.hartspreschool.com/tc/curr.php?pid=7" },
      { label: "樂希：招生與作息", scope: "年級年齡、上午下午時間及外判校車；未註年比率不作現況統計。", url: "http://www.hartspreschool.com/tc/admissions.php" },
    ],
    features: { title: "課程特色｜藝術整合與三語表達", featured: true, details: [
      { label: "閱讀、故事與藝術串連", value: "校方以藝術整合課程，結合分級閱讀、創意故事，以及音樂律動與表達。家庭可看孩子在一個故事單元如何從聆聽走向創作和分享，並問清教師如何兼顧不愛上台、仍需時間適應的孩子。", sourceUrl: "http://www.hartspreschool.com/tc/curr.php" },
      { label: "三語目標需看每日實際安排", value: "官網列英語、普通話、粵語學習，配合拼音、音樂老師、藝術工作者及體育活動；上午9時至12時、下午1時至4時。家長宜索取所選班的日程及成長回饋，確認各語言的使用情境；三語流暢是教學目標，不是每名孩子的承諾。", sourceUrl: "http://www.hartspreschool.com/tc/curr.php?pid=7" },
    ] },
  }),
  profile({
    schoolNumber: "603643", locationId: "0001", website: "https://www.mightyoaks.edu.hk/", telephone: "28068383", schoolType: "私立獨立幼稚園", principal: "蔡慶菁", gradeSpan: grades,
    language: "校方列英語、粵語、普通話三語；未公布主要語言或時數比例",
    ratio: "上午1:1.8；下午為「-」", ratioIncludesPn: true, teacherCount: 12, classroomCount: 4,
    spaces: "有室內、戶外遊戲場地，沒有音樂室；另列圖書館及醫療室。",
    pn: "2025年9月提供2至3歲服務，收錄9人，半日全年79,970元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1半日全年81,180元／11期；K2及K3為73,800元／10期",
    fees: "2026/27 K1上午下午全年81,180元、11期；K2及K3上午下午全年73,800元、10期，全日為「-」。不同年級期數不同；用品及交通另計。",
    sourceNote: "校號603643為堅尼地城卑路乍街46A號隆基大廈1樓及平台；不套用官網籌備中的黃竹坑校舍。概覽創辦2016與官網2015歷史不同，未自行選一個當作確定創校年；上午比率屬舊統計，不是專人照顧承諾。",
    sources: [],
    features: { title: "課程特色｜品格教育與三語遊戲", featured: true, details: [
      { label: "把品格放進相處與生活", value: "校方以基督教價值及品格教育為核心，結合社交情緒、遊戲和三語學習；概覽以聖靈九果等價值作生活教育。家庭可了解教師如何處理分享、衝突及挫折，再判斷與家庭價值觀是否相合，而不只看品格詞彙。", sourceUrl: "https://www.mightyoaks.edu.hk/" },
      { label: "留意家長參與的具體方式", value: "本校申報家長義工訓練、社區參與和家庭支援活動。可問清哪些屬常規、是否需額外報名，以及孩子如何在三語環境中獲得協助；機構向社區開放的活動不等於每名在讀幼兒都有相同參與名額。", sourceUrl: kgp("603643") },
    ] },
  }),
  profile({
    schoolNumber: "604585", locationId: "0001", website: "https://www.gracegarden.edu.hk/", telephone: "27029778", schoolType: "私立獨立幼稚園", principal: "顧嘉麗", establishedYear: "2016", gradeSpan: grades,
    language: "校方列PN及幼稚園以英語和普通話雙語教學；粵語支援及時數另確認",
    ratio: "上午1:2.7；下午1:1.7", ratioIncludesPn: true, teacherCount: 3, classroomCount: 3,
    spaces: "有室內遊戲場地及感官室，沒有戶外遊戲場地及音樂室。",
    pn: "2025年9月提供2至3歲服務，收錄4人，半日全年66,000元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。Playgroup年齡不能當作本校註冊幼兒中心服務範圍。",
    feeSummary: "K1至K3上午全年71,500元、下午52,800元，均11期",
    fees: "2026/27 K1至K3上午全年71,500元、11期，下午52,800元、11期；全日為「-」。上午下午費率不同；PN、用品及其他活動另計。",
    sourceNote: "校號604585為太康街55號鯉景灣A區地下GA12B至14，官網27029778吻合。官網12名教師是兩校舍合計，不套成本校師資；Playgroup與PN／K班服務及語言範圍分開。",
    sources: [
      { label: "雅惠：課程框架", scope: "EYFS的兒童主導及遊戲學習理念；鯉景灣地址電話。", url: "https://www.gracegarden.edu.hk/curriculum" },
      { label: "雅惠：各年齡課程", scope: "PN及幼稚園英普雙語、每日活動及家校紀錄；Playgroup另有年齡範圍。", url: "https://www.gracegarden.edu.hk/programmes" },
    ],
    features: { title: "課程特色｜英普雙語與自主探索", featured: true, details: [
      { label: "遊戲框架中的雙語日常", value: "校方以英國早期基礎階段框架（EYFS）規劃，PN及幼稚園課程明列英語與普通話，結合幼兒自選遊戲、圍圈、成人引導活動及茶點。家庭可確認粵語初入學孩子如何適應，並觀察教師怎樣把孩子的興趣延伸成探索。", sourceUrl: "https://www.gracegarden.edu.hk/programmes" },
      { label: "看成長紀錄，不只看小比例", value: "官網列每月更新及個人成長紀錄，並可與教師討論發展。概覽分時段比率反映2025年9月規模，不代表當屆固定班額；家長可同時問清班組穩定性、同齡互動和教師回饋，判斷是否符合孩子需要。", sourceUrl: "https://www.gracegarden.edu.hk/programmes" },
    ] },
  }),
  profile({
    schoolNumber: "604291", locationId: "0001", website: "https://www.learninghabitat.org/", telephone: "25015850", schoolType: "私立獨立幼稚園", principal: "張婉雯", establishedYear: "2016", gradeSpan: grades,
    language: "CE班以英語與粵語雙教師，另有普通話；PE班以英語與普通話雙教師；當屆年級班型另確認",
    ratio: "上午1:8.0；下午1:8.0", ratioIncludesPn: true, teacherCount: 26, classroomCount: 7,
    spaces: "有室內及戶外遊戲場地，沒有音樂室；另列電腦、資源及閱讀角。",
    pn: "2025年9月提供2至3歲服務，收錄56人，半日全年84,000元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。官方2026/27迎海PN為每期7,300元、12期，全年87,600元，與舊統計分開。",
    feeSummary: "K1至K3半日全年87,600至91,200元／12期；全日未列",
    fees: "2026/27概覽K1至K3上午下午全年87,600至91,200元、12期；官方迎海分校表列CE每期7,300元（全年87,600元），PE每期7,600元（全年91,200元）。全日為「-」，用品交通另計。",
    sourceNote: "校號604291為烏溪沙路8號迎海3期1樓，官方Double Cove地址與25015850吻合。沒有音樂室不等於沒有音樂活動；師資、PN及費率不與紅磡昇御門互借。",
    sources: [
      { label: "學之園：迎海校舍", scope: "迎海3期1樓、25015850及校車入口；辦公時間不是課時。", url: "https://www.learninghabitat.org/en/campus/ma-on-shan/double-cove-campus" },
      { label: "學之園：校本課程", scope: "共同課程的CE／PE分工、探究、語文及社交情緒。", url: lhCurriculum },
      { label: "學之園：2026/27分校收費", scope: "Double Cove的PN、CE及PE每期金額與12期。", url: lhFees },
    ],
    features: { title: "課程特色｜雙語分流與生活主題", featured: true, details: [
      { label: "選班先看中文口語路線", value: "校方CE班以英語、粵語教師配合並補普通話；PE班以英語、普通話教師配合，另有拼音學習。迎海家庭可先確認所選年級班型，再比較孩子日常中文、接送和升小方向；同品牌課程不表示每校舍的開班及學費相同。", sourceUrl: lhCurriculum },
      { label: "語文練習連到分享與相處", value: "官網把生活主題、動手探究、校本拼音閱讀與社交情緒學習結合，透過故事及表達活動建立情緒辨識和合作。家長可索取迎海實際週課表，了解戶外活動、閱讀角和小組分享如何使用，不以課程項目數量代替每天體驗。", sourceUrl: lhCurriculum },
    ] },
  }),
  profile({
    schoolNumber: "605441", locationId: "0001", website: "https://www.york.edu.hk/", telephone: "23689738", schoolType: "私立獨立幼稚園", principal: "蘇綺華", establishedYear: "2017", gradeSpan: grades,
    language: "本校申報英語故事與拼音、本地及非本地課程；中文粵普分工及語言時數另確認",
    ratio: "上午1:7.9；下午1:6.9", ratioIncludesPn: true, teacherCount: 18,
    spaces: "有室內、戶外遊戲場地及音樂室，另列多用途、音樂遊戲空間及禮堂；註冊課室數目未列。",
    pn: "2025年9月提供2至3歲服務，收錄89人，半日全年102,000元，全日為「-」；沒有幼兒中心資助、暫託、延長或2歲以下服務。當屆PN費率另確認。",
    feeSummary: "K1半日全年60,000至87,600元；K2及K3為84,000至87,600元，均12期",
    fees: "2026/27 K1上午下午全年60,000至87,600元、12期；K2及K3上午下午84,000至87,600元、12期，全日為「-」。概覽未逐一解釋區間與班型對應，應索取所選課程費表；PN用品交通另計。",
    sourceNote: "校號605441為元朗潭尾青山公路18號峻巒商場幼稚園校舍，不與其他約克分校混用。名稱有Montessori不代表本次取得完整蒙特梭利工作週期證據；未採用缺年份、分母及分校範圍的升學百分比。",
    sources: [],
    features: { title: "課程特色｜語文故事與分階段回饋", featured: true, details: [
      { label: "先了解本地及非本地課程差異", value: "本校概覽列本地及非本地課程，英語以故事及Letterland拼音活動帶動。家長可要求比較兩類課程的日程、中文語音及升小銜接，再確認費率區間；不由學校名稱推定每天均有完整蒙特梭利自主工作時段。", sourceUrl: kgp("605441") },
      { label: "評估與家庭閱讀如何配合", value: "校方申報1月及5月評估、家校月報、家庭掃碼閱讀和小組活動。家庭可先看一份回饋樣本，了解是否能說明孩子的理解、參與和下一步，不把考核安排或集團選載成果當作本校每名學生的升學結果。", sourceUrl: kgp("605441") },
    ] },
  }),
];
