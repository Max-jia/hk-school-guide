import type { PilotSchool } from "./school-directory-pilot";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";
const EDB_REGISTRATION = "https://applications.edb.gov.hk/datagovhk/data/SchoolBasicInfo.xml";

export const KINDERGARTEN_BATCH_13: PilotSchool[] = [
  {
    stage: "kindergarten", slug: "american-international-school-primary-branch-527882", name: "AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)", nameEn: "AMERICAN INTERNATIONAL SCHOOL (PRIMARY BRANCH)", district: "九龍城區", address: "九龍窩打老道131號地下及1樓", schoolNumber: "527882", schoolType: "私立國際幼稚園（教育局登記名稱：Primary Branch）", gender: "男女校", gradeSpan: "幼兒班級；按 AIS 年級對照，Early Childhood 1 約對應香港 K1、Early Childhood 2 約對應 K2", website: "https://www.ais.edu.hk/", dataYear: "教育局位置及登記資料：2026-09／2026-10；AIS課程及收生頁：2026-27", sourceNote: "教育局登記名稱及地址與AIS網站展示的校園入口地址寫法不同；頁面保留教育局登記資料，校園參觀或郵寄前應向校方確認實際入口。AIS按美國年級編制Early Childhood，並非本地K1-K3制度。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號527882、教育局登記校址及學段身份。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "學校編號與登記狀態，資料截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "AIS Early Childhood課程", scope: "校方對遊戲課程、社交情緒學習及校內升讀安排的說明。", url: "https://www.ais.edu.hk/learning/early-childhood/" },
      { label: "AIS Admissions", scope: "2026-27年級對照、學校時間及英語要求；招生安排按屆別變動。", url: "https://www.ais.edu.hk/admissions/" },
      { label: "AIS applying to AIS", scope: "滾動招生、申請流程及Early Childhood面見／評估說明。", url: "https://www.ais.edu.hk/admissions/applying-to-ais/" },
    ],
    detailSections: [{ title: "美式 Early Childhood 課程與銜接", featured: true, note: "下列課程和招生資訊是AIS校方自述；不等同本地幼稚園概覽的班制或學費口徑。", details: [
      { label: "Early Childhood 以遊戲和社交情緒學習為核心", value: "校方介紹課程採遊戲學習，並使用 Second Step 社交情緒課程；幼兒可與高年級學生參與跨年級活動。這描述課程設計，不是每名學生的發展成效保證。", sourceUrl: "https://www.ais.edu.hk/learning/early-childhood/" },
      { label: "銜接小學可在校內延續", value: "AIS表示完成Early Childhood後可銜接本校Elementary School，無需另考入學試。對家庭而言，這減少一次轉校申請，但仍須留意學費、名額和家庭是否打算沿用美式課程。", period: "AIS現行課程說明；入學條件以校方當屆通知為準", sourceUrl: "https://www.ais.edu.hk/learning/early-childhood/" },
      { label: "年級採美國制並以英語為主", value: "校方把Early Childhood 1列為約3歲、對應香港K1；Early Childhood 2約4歲、對應K2。招生頁要求幼兒能理解並回應簡單英語指示；申請前宜先確認孩子能否適應全英語日常環境。", period: "2026-27年級對照", sourceUrl: "https://www.ais.edu.hk/admissions/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "les-petits-lascars-french-international-preschool-614904", name: "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL", nameEn: "LES PETITS LASCARS FRENCH INTERNATIONAL PRESCHOOL", district: "中西區", address: "香港中環威靈頓街56及58號威寧大廈3樓301及302室", telephone: "25268666", schoolNumber: "614904", schoolType: "私立國際幼稚園", gender: "男女校", gradeSpan: "幼稚園3至6歲；另有2至3歲PN課程（按校方課程頁）", website: "https://hkkidsacademy.edu.hk/les-petits-lascars", dataYear: "教育局位置及登記資料：2026-09／2026-10；校方課程：現行頁面（2026-10查閱）", sourceNote: "本頁只指教育局登記的中環校址。校方另有將軍澳校園，兩校區地址、交通與活動不能互相替代；校方頁稱中央校舍正進行AEFE認證程序，不能寫成已獲認證。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "中環登記校址、學校編號614904及校址身份。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "校址登記資料截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "Les Petits Lascars Nursery and Kindergarten", scope: "法國課程領域、3至6歲班級、班額上限及法語／雙語／三語選項。", url: "https://hkkidsacademy.edu.hk/les-petits-lascars-nursery-and-kindergarten" },
      { label: "Les Petits Lascars Our School", scope: "法國及國際課程分流、學校背景與校方自述教學理念。", url: "https://hkkidsacademy.edu.hk/les-petits-lascars-our-school" },
      { label: "校方聯絡及校址", scope: "中環與將軍澳兩校區地址；本頁採用中環校址。", url: "https://hkkidsacademy.edu.hk/les-petits-lascars-contact-us" },
    ],
    detailSections: [{ title: "法國課程與多語分流", featured: true, note: "校方提供不同語言組合；入讀前要先確認申請校區、所選分流及後續小學銜接。", details: [
      { label: "法國課程以五個學習領域組織", value: "校方列出語言、身體活動、藝術活動、思考基礎和探索世界五個領域，並介紹遊戲、實作和問題解決。這是法國學前課程的校方描述，與本地K1至K3課程架構不宜直接等同。", sourceUrl: "https://hkkidsacademy.edu.hk/les-petits-lascars-nursery-and-kindergarten" },
      { label: "語言分流需在申請時選定", value: "校方列法語單語、法英雙語、法英加普通話三語等選項；另在學校介紹中列出以英語國際早期課程為主的另一分流。家長應確認中環校區該學年實際開班、授課語言和收生名額。", sourceUrl: "https://hkkidsacademy.edu.hk/les-petits-lascars-our-school" },
      { label: "班額和年齡層按課程區分", value: "校方列幼稚園每班最多15人、PN每班最多14人；這是校方公布的班額上限，不能視作當屆實際人數或剩餘學額。", sourceUrl: "https://hkkidsacademy.edu.hk/les-petits-lascars-nursery-and-kindergarten" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "guidepost-montessori-international-pre-school-sai-kung-578630", name: "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)", nameEn: "GUIDEPOST MONTESSORI INTERNATIONAL PRE-SCHOOL (SAI KUNG)", district: "西貢區", address: "新界西貢匡湖居購物中心地下D1、D2號舖及後院", telephone: "25594855", schoolNumber: "578630", schoolType: "私立國際幼稚園／蒙特梭利學前學校", gender: "男女校", gradeSpan: "校方列Toddler 2至3歲及Children’s House 3至6歲；並有不同幼兒課程", website: "https://guidepostmontessori.hk/campuses/sai-kung/", dataYear: "教育局位置及登記資料：2026-09／2026-10；西貢校區課程頁：2026-06查閱", sourceNote: "教育局登記與校方網站均指向匡湖居西貢校址；EdB登記名稱中的舖位描述較長，精確範圍以登記記錄為準。其他Guidepost校區不在本頁範圍。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "西貢校址及學校編號578630。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "登記校址、狀態及校址編號截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "Guidepost Montessori 西貢校區", scope: "校區地址、課程年齡及校方所列課程類別。", url: "https://guidepostmontessori.hk/campuses/sai-kung/" },
      { label: "Guidepost Montessori 課程", scope: "蒙特梭利課程範疇與校方教學理念。", url: "https://guidepostmontessori.com/curriculum/" },
    ],
    detailSections: [{ title: "西貢校區的蒙特梭利課程", featured: true, note: "課程名稱和年齡來自校方網站；實際班級編制、收費和可用學位須向西貢校區確認。", details: [
      { label: "校區服務1至6歲不同階段", value: "校方列有Transitional Toddler、Nido、Toddler、Children’s House及Enrichment等項目；其中Children’s House為3至6歲。課程名不等同教育局本地K1至K3分班，家長應按孩子生日詢問適合組別。", sourceUrl: "https://guidepostmontessori.hk/campuses/sai-kung/" },
      { label: "學習以個別操作和自主進度為主", value: "校方課程頁描述幼兒按自身節奏操作教具，涵蓋語言、數學、生活實踐、感官、科學、文化研究與藝術。這反映教學取向，不代表每個孩子都會按相同速度完成特定能力目標。", sourceUrl: "https://guidepostmontessori.com/curriculum/" },
      { label: "校園設室內及戶外遊戲空間", value: "西貢校區介紹列自然採光課室、私人室內與戶外活動空間。家長參觀時可實地確認日常使用時段、戶外活動安排和接送動線。", sourceUrl: "https://guidepostmontessori.hk/campuses/sai-kung/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "mulberry-house-international-kindergarten-southside-578053", name: "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE", nameEn: "MULBERRY HOUSE INTERNATIONAL KINDERGARTEN SOUTHSIDE", district: "南區", address: "香港香港仔海傍道3號逸港居地下1及2號舖", telephone: "35911065 / 55980555", schoolNumber: "578053", schoolType: "私立國際幼稚園", gender: "男女校", gradeSpan: "幼稚園及Playgroup；年齡和班別按校方當屆課程公布", website: "https://mulberryhousekg.com/en/southside-campus/", dataYear: "教育局位置及登記資料：2026-09／2026-10；南區校區課程頁：2026-10查閱", sourceNote: "本頁對應南區逸港居校區，不把大埔校區的安排套用。校方以Reggio Emilia為靈感描述學習環境，並介紹英語及中文教師協作；沒有公布各語言統一課時比例。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "南區校址、學校編號578053及校址身份。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "登記校址及狀態截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "Mulberry House Southside Campus", scope: "南區校區環境、雙語共教、延伸活動及課程特色。", url: "https://mulberryhousekg.com/en/southside-campus/" },
      { label: "Mulberry House", scope: "學校整體課程方向及校方自述的學習方式。", url: "https://mulberryhousekg.com/en/" },
    ],
    detailSections: [{ title: "南區校區與雙語共教", featured: true, note: "以下為校方對南區校區的介紹，活動種類是選擇機會，不代表每名學生均可參與全部項目。", details: [
      { label: "環境被視作學習的一部分", value: "校方以Reggio Emilia理念描述南區校區，設明亮課室、室內活動區、雙語圖書角和遊樂場，並鼓勵幼兒想像、探索、提問及操作。這是校方設計理念，實際日程和場地使用可在參觀時核實。", sourceUrl: "https://mulberryhousekg.com/en/southside-campus/" },
      { label: "英語與中文教師共同帶班", value: "校方稱課堂採英語和中文教師共同教學，日常活動讓孩子在兩種語言中探索；頁面沒有公布每日各語言分鐘數，因此不能據此判斷英語或普通話為主。", sourceUrl: "https://mulberryhousekg.com/en/southside-campus/" },
      { label: "延伸活動涵蓋語言、STEAM和運動", value: "校方列出語言藝術、STEAM、音樂劇、烹飪、舞蹈和多項運動等活動。活動供應和時段可能按學期改變，報名前應索取南區校區最新時間表及收費。", sourceUrl: "https://mulberryhousekg.com/en/southside-campus/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "wilderness-international-kindergarten-607215", name: "WILDERNESS INTERNATIONAL KINDERGARTEN", nameEn: "WILDERNESS INTERNATIONAL KINDERGARTEN", district: "中西區", address: "香港堅尼地城士美菲路85號寶德大廈地下", telephone: "25959066", schoolNumber: "607215", schoolType: "私立國際幼稚園", gender: "男女校", gradeSpan: "幼稚園3至5歲；上午及下午班（校方課程頁）", website: "https://www.wilderness.asia/wilderness-kindergarten-programs", dataYear: "教育局位置及登記資料：2026-09／2026-10；課程頁：2026-10查閱", sourceNote: "學校提供英語分流和英語／普通話雙語分流，課時安排不同；不要只用『雙語』概括或推算整體語言比例。校巴須視乎同區需求達到最低人數。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "堅尼地城登記校址及學校編號607215。", url: EDB_LOCATION },
      { label: "教育局《學校基本註冊資料》", scope: "登記校址和狀態截至2026-10-23。", url: EDB_REGISTRATION },
      { label: "Wilderness Kindergarten Programs", scope: "Reggio Emilia靈感課程、英語與雙語班、每日普通話安排及校巴條件。", url: "https://www.wilderness.asia/wilderness-kindergarten-programs" },
    ],
    detailSections: [{ title: "兩種語言分流，課時設計不同", featured: true, note: "語言安排按校方對各分流的說明；實際班別和師資以當屆校方確認為準。", details: [
      { label: "課程由幼兒興趣延伸成專題探索", value: "校方以Reggio Emilia為靈感，教師透過提問和材料延伸孩子的想法，再以跨學科主題發展專題。這種安排較重視持續探索；家長可索取孩子作品或一週課程例子，了解日常如何落地。", sourceUrl: "https://www.wilderness.asia/wilderness-kindergarten-programs" },
      { label: "英語班每日有30分鐘普通話", value: "校方說明英語班由英語母語教師帶領，另設每日30分鐘普通話活動。這並不等同普通話為主要教學語言。", sourceUrl: "https://www.wilderness.asia/wilderness-kindergarten-programs" },
      { label: "雙語班由普通話教師共同承擔約一半課程", value: "校方稱雙語班除英語教師外另有普通話教師，約一半課程以中文進行。家長若重視識字或本地小學銜接，應進一步詢問中文使用方式和本地語文準備內容。", sourceUrl: "https://www.wilderness.asia/wilderness-kindergarten-programs" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "christian-and-missionary-alliance-tai-o-kindergarten-155233", name: "基督教宣道會大澳幼稚園", nameEn: "CHRISTIAN & MISSIONARY ALLIANCE TAI O KINDERGARTEN", district: "離島區", address: "課室B位於大嶼山大澳永安街81號", telephone: "29856202", schoolNumber: "155233", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "幼稚園K1至K3；上午及全日班以教育局當屆概覽為準", website: "https://www.cmataiokg.com/", dataYear: "教育局概覽：2026/27；校方招生及費用頁：2026/27", sourceNote: "校方頁列繪本、遊戲、樂高、宗教德育、英語及普通話等特色；沒有公開各語言課時比例。校方2026/27招生頁的收費與校巴資訊均有明確適用年度，不延伸至後續年度。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號155233相應校址的班制、授課語言、費用及師生資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1552330002" },
      { label: "教育局《學校位置及資料》", scope: "大澳登記課室、校址與學校編號。", url: EDB_LOCATION },
      { label: "基督教宣道會大澳幼稚園", scope: "校方列示課程特色、地址、聯絡及活動資訊。", url: "https://www.cmataiokg.com/" },
      { label: "校方2026/27入學安排", scope: "2026/27註冊、收費和校巴安排；只適用該屆。", url: "https://www.cmataiokg.com/en/admission/" },
    ],
    detailSections: [{ title: "繪本、遊戲與社區生活", featured: true, note: "學校位於大澳；通勤可行性和校巴服務應按當屆路線及家庭住址單獨確認。", details: [
      { label: "課程特色包括繪本、遊戲和樂高", value: "校方課程入口列繪本教學、遊戲活動、樂高課程、宗教及德育活動，並稱會為家長和幼兒提供學習歷程檔案。頁面未量化各活動頻率，家長可向校方索取一週作息及學習檔案例子。", sourceUrl: "https://www.cmataiokg.com/" },
      { label: "校方列有英語和普通話活動", value: "官網把英語及普通話列為課程特色，但未公開語言課時或班別分流；不宜據此假設英語或普通話是主要授課語言。", sourceUrl: "https://www.cmataiokg.com/" },
      { label: "2026/27全日班有額外費用及校巴條件", value: "校方2026/27入學頁列半日班扣減資助後免費，全日班每月HK$730、午膳每月HK$350；校巴收費每月HK$700，並明言服務安排按學年提供。申請其他年度要重新索取費用表和路線。", period: "校方2026/27招生頁", sourceUrl: "https://www.cmataiokg.com/en/admission/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "fuk-loy-chuen-kam-chuen-kindergarten-152498", name: "福來邨錦全幼稚園", nameEn: "FUK LOY CHUEN KAM CHUEN KINDERGARTEN", district: "荃灣區", address: "新界荃灣福來邨永康樓地下", telephone: "24905871", schoolNumber: "152498", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；半日及全日班以教育局概覽和當屆安排為準", website: "https://www.kamchuenkg.edu.hk/", dataYear: "教育局位置及登記資料：2026-09／2026-10；校方活動及招生頁：2026/27", sourceNote: "官網近期公告顯示親子閱讀、社區活動、禮貌／安全大使及小童軍等校園活動；課程特色子頁內容需以校方當屆資料確認，本頁不以活動照片推論每日教學模式。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號152498相應校址的班制、語言、費用及師生資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1524980001" },
      { label: "教育局學校搜尋", scope: "核對152498／0001登記校址、電話、授課時段及登記狀態。", url: "https://applications.edb.gov.hk/schoolsearch/schoolinfo.aspx?langno=2&scrn=152498000111" },
      { label: "福來邨錦全幼稚園官方網站", scope: "校訓、近期校園活動及2026/27入學資訊入口。", url: "https://www.kamchuenkg.edu.hk/" },
      { label: "校方2021/22學校報告", scope: "標明年份的歷史課程及校本檢視資料，不當作現行課程證明。", url: "https://www.kamchuenkg.edu.hk/images/data/%E9%8C%A6%E5%85%A8%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    ],
    detailSections: [{ title: "在地活動與校園參與", featured: true, note: "課程詳細頁未能由可讀頁面核實，以下只寫有日期的官網內容。", details: [
      { label: "官網持續更新家校和社區活動", value: "校方近期公告包括親子閱讀、非華語親子活動、小童軍、禮貌／安全大使及社區參與。這表示家庭可從官網掌握當期活動，但不能據此推定每名幼兒都會參與所有項目。", period: "校方官網2026年10月公告", sourceUrl: "https://www.kamchuenkg.edu.hk/" },
      { label: "校方公布2026/27 K1申請資料", value: "官網設有2026/27年度入學申請注意事項和表格入口；每年報名流程會變動，家長應直接查看該屆通告，不沿用舊年度報名費或日期。", period: "2026/27招生資料", sourceUrl: "https://www.kamchuenkg.edu.hk/" },
      { label: "可取得的課程報告屬2021/22學年", value: "校方歷史報告提及按幼稚園課程指引設計主題課程及品德教育；資料年代較早，本頁不據此代表2026/27課堂仍完全相同。", period: "2021/22學校報告（歷史資料）", sourceUrl: "https://www.kamchuenkg.edu.hk/images/data/%E9%8C%A6%E5%85%A8%E5%AD%B8%E6%A0%A1%E5%A0%B1%E5%91%8A.pdf" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "shun-tak-fraternal-association-tuen-mun-leung-lee-sau-yu-kindergarten-157090", name: "順德聯誼總會屯門梁李秀娛幼稚園", nameEn: "SHUN TAK FRATERNAL ASSOCIATION TUEN MUN LEUNG LEE SAU YU KINDERGARTEN", district: "屯門區", address: "新界屯門安定邨定康樓地下", telephone: "24502519", schoolNumber: "157090", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；上午、下午及全日班按教育局概覽和當屆安排", website: "https://tmllsykg.edu.hk/", dataYear: "教育局概覽：2026/27；校方課程與招生：2026/27、2027/28", sourceNote: "校方描述生活化、感官探索及趣味學習，並公布2027/28 K1招生時段和名額；招生數字是特定年度的申請資訊，不代表錄取概率。校方2025/26免費及雜費安排不可外推至其他年度。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號157090相應校址的班制、授課語言、費用及師生資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=1570900001" },
      { label: "教育局《學校位置及資料》", scope: "安定邨登記校址、學校編號及聯絡資料。", url: EDB_LOCATION },
      { label: "校方簡介及課程目標", scope: "校方自述教學特色、學習目標、上課時間及家校合作。", url: "https://tmllsykg.edu.hk/about-us/" },
      { label: "校方入學申請", scope: "2027/28 K1招生時間線、申請方式和面見安排；只適用該屆。", url: "https://tmllsykg.edu.hk/admission/" },
      { label: "校方最新消息", scope: "核對2026年校園活動更新。", url: "https://tmllsykg.edu.hk/news/" },
    ],
    detailSections: [{ title: "生活化探索與K1申請", featured: true, note: "招生規則與名額每屆更新；家長要把年度、上午／下午選擇和面見安排一起核對。", details: [
      { label: "課程強調生活經驗和感官探索", value: "校方列出品德、認知與語言、身體、情意群性及美感發展，並以生活化、感官探索和趣味活動培養學習興趣、自理及信心。家長可參觀時觀察孩子是否有自主操作和表達的機會。", sourceUrl: "https://tmllsykg.edu.hk/about-us/" },
      { label: "2027/28 K1分上午和下午各99名申請名額", value: "校方當屆招生頁列上午班99名、下午班99名，並安排所有申請K1幼兒面見。這是2027年9月入學一屆的校方名額資訊，不等於最終錄取數或個人成功率。", period: "2027/28 K1招生頁；申請流程於2026年公布", sourceUrl: "https://tmllsykg.edu.hk/admission/" },
      { label: "校方公開面見和兄姊優先條件", value: "2027/28頁面稱會面見所有申請者，兄姊在讀可獲優先考慮，但須與兄姊同一晝別或選擇下午班。申請前宜先確認家庭可接受的上課時段及面見日期。", period: "2027/28招生安排", sourceUrl: "https://tmllsykg.edu.hk/admission/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "twghs-lucina-laam-ho-kindergarten-605530", name: "東華三院何藍瓊纓幼稚園", nameEn: "TWGHS LUCINA LAAM HO KINDERGARTEN", district: "觀塘區", address: "九龍觀塘安達邨安達商場地下高層", telephone: "29769935", schoolNumber: "605530", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；半日及全日班按當屆資料", website: "https://www.lucina-kindergarten.edu.hk/", dataYear: "教育局位置及登記資料：2026-09／2026-10；校方招生文件：2026/27", sourceNote: "校方介紹繪本綜合教學、韓國磁石積木及日本積木課程；另有英粵雙語班資料。網站仍保留較早年度招生訊息，故不把過期日期或舊班制列作現況。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號605530相應校址的班制、語言、費用及師生資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6055300001" },
      { label: "教育局《學校位置及資料》", scope: "安達邨登記校址與學校身份。", url: EDB_LOCATION },
      { label: "東華三院何藍瓊纓幼稚園官方網站", scope: "校方公布的課程特色、教學法及家校合作。", url: "https://www.lucina-kindergarten.edu.hk/" },
      { label: "東華三院2023年校慶資料", scope: "校方集團對繪本、自由遊戲和英粵雙語班的2023年介紹，標明年份。", url: "https://www.tungwah.org.hk/press-release/%E6%9D%B1%E8%8F%AF%E4%B8%89%E9%99%A2%E4%BD%95%E8%97%8D%E7%93%8A%E7%BA%93%E5%B9%BC%E7%A8%9A%E5%9C%925%E5%91%A8%E5%B9%B4%E6%A0%A1%E6%85%B6%E5%85%B8%E7%A6%AE/" },
      { label: "校方2026/27招生程序", scope: "該屆招生程序說明，不代表後續年度安排。", url: "https://www.lucina-kindergarten.edu.hk/wp-content/uploads/2026/01/2N_2026-27-%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99-%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8FLLHKG_NEW.pdf" },
    ],
    detailSections: [{ title: "繪本、建構活動與雙語班", featured: true, note: "校方公開的語言與課程介紹涵蓋不同年份；實際班別、課時和服務要以當屆招生資料為準。", details: [
      { label: "以繪本和主題教學串連學習", value: "校方介紹以繪本、主題教學和資訊科技輔助幼兒學習，並列韓國磁石積木及日本積木課程，設計目標包括創意思維、邏輯推理和策略性思考。家長可詢問各班實際使用教材和每週活動安排。", sourceUrl: "https://www.lucina-kindergarten.edu.hk/" },
      { label: "英粵雙語班有校方公開的分時說明", value: "東華三院2023年校慶介紹提及英粵雙語班及英語教師安排；該資料不是逐班當年時間表，不能視作2026/27每班仍採完全相同課時。", period: "2023年校方集團新聞稿", sourceUrl: "https://www.tungwah.org.hk/press-release/%E6%9D%B1%E8%8F%AF%E4%B8%89%E9%99%A2%E4%BD%95%E8%97%8D%E7%93%8A%E7%BA%8C%E5%B9%BC%E7%A8%9A%E5%9C%925%E5%91%A8%E5%B9%B4%E6%A0%A1%E6%85%B6%E5%85%B8%E7%A6%AE/" },
      { label: "新生程序可先看校方當屆文件", value: "校方有2026/27招生程序文件；網站其他頁面亦可能保留更早年度消息。申請前應以最新招生程序、學費證明和收生表格為準。", period: "2026/27招生文件", sourceUrl: "https://www.lucina-kindergarten.edu.hk/wp-content/uploads/2026/01/2N_2026-27-%E5%85%AC%E9%96%8B%E8%B3%87%E6%96%99-%E6%94%B6%E7%94%9F%E7%A8%8B%E5%BA%8FLLHKG_NEW.pdf" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "christian-and-missionary-alliance-on-tai-kindergarten-614114", name: "基督教宣道會安泰幼稚園", nameEn: "CHRISTIAN & MISSIONARY ALLIANCE ON TAI KINDERGARTEN", district: "觀塘區", address: "九龍觀塘安泰邨和泰樓地下高層", telephone: "26199393", schoolNumber: "614114", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；校方2026/27表格列上午及全日班申請", website: "https://cmaontaikg.edu.hk/", dataYear: "教育局概覽：2026/27；校方申請表：2026/27；課程PDF：2021/22（歷史資料）", sourceNote: "現行可讀官網主要公布聯絡資料；課程和校園特色所能找到的詳細官方概覽較舊，頁面明確標註年份，不把歷史班額、師生比或學費當作當前數據。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號614114相應校址的當屆班制、語言、費用及師生資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6141140001" },
      { label: "教育局《學校位置及資料》", scope: "安泰邨登記校址、電話及學校身份。", url: EDB_LOCATION },
      { label: "基督教宣道會安泰幼稚園官方網站", scope: "目前可讀的校方地址及聯絡資料。", url: "https://cmaontaikg.edu.hk/" },
      { label: "校方2026/27申請表", scope: "該屆申請級別及時段選項；不是課程時間表或收生承諾。", url: "https://kgp2025.azurewebsites.net/downloadfile.php?filename=7004_20250415092558.pdf" },
      { label: "教育局2021/22質素評核報告", scope: "歷史質素評核觀察，僅作有年份的背景資料。", url: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_OnTai.pdf" },
    ],
    detailSections: [{ title: "安泰邨登記校址與資料年份", featured: true, note: "公開資料有限；此頁保留可核實事項，不以舊概覽替代現行課程說明。", details: [
      { label: "教育局登記校址與校方聯絡地址相符", value: "教育局位置資料和校方首頁均列觀塘安泰邨和泰樓地下高層，學校編號614114；可用校名及地址辨識，不與其他同名宣道會幼稚園混淆。", sourceUrl: EDB_LOCATION },
      { label: "校方公開2026/27申請級別和時段", value: "校方提供的2026/27申請表列K1、K2、K3及上午／全日選項。文件用於該屆招生，下一屆班制和申請安排仍需另查。", period: "2026/27申請表", sourceUrl: "https://kgp2025.azurewebsites.net/downloadfile.php?filename=7004_20250415092558.pdf" },
      { label: "詳細課程和評核材料年代較早", value: "可讀的2021/22教育局評核報告可作歷史背景，但不能證明現屆教學做法或支援服務仍相同。若家長重視課程理念、班額或每日語言，應直接向校方索取現行資料。", period: "2021/22評核（歷史資料）", sourceUrl: "https://www.edb.gov.hk/attachment/tc/edu-system/preprimary-kindergarten/quality-assurance-framework/qr/qr-report/CMA_OnTai.pdf" },
    ] }],
  },
];
