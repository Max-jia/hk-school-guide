import type { PilotSchool } from "./school-directory-pilot";

const EDB_LOCATION = "https://www.edb.gov.hk/attachment/en/student-parents/sch-info/sch-search/sch-location-info/SCH_LOC_EDB.csv";

/** Reviewed kindergarten profiles added in batch 16. */
export const KINDERGARTEN_BATCH_16: PilotSchool[] = [
  {
    stage: "kindergarten", slug: "hong-kong-christian-service-pario-kindergarten-shatin-614106", name: "香港基督教服務處雋樂幼稚園（沙田）", nameEn: "HONG KONG CHRISTIAN SERVICE PARIO KINDERGARTEN (SHATIN)", district: "沙田區", address: "新界沙田碩門邨2期喜碩樓地下", schoolNumber: "614106", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "http://pokgst.hkcschild.edu.hk", dataYear: "教育局概覽：2026/27；香港基督教服務處課程介紹查核：2026-10", sourceNote: "辦學團體介紹以幼兒為本的螺旋課程、單元主題、專題研習和生活體驗；該機構頁同時介紹沙田及牛頭角兩園，學校身份和本頁基本數據仍按沙田校址0001配對。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號614106、沙田碩門邨校址及身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例和費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6141060001" },
      { label: "香港基督教服務處：雋樂幼稚園服務介紹", scope: "課程理念、教學活動及兩間雋樂幼稚園校址。", url: "https://www.hkcs.org/tc/services/pariokindergarten" },
      { label: "雋樂幼稚園（沙田）校方網站", scope: "沙田校舍的招生與校務資訊入口。", url: "http://pokgst.hkcschild.edu.hk" },
    ],
    detailSections: [{ title: "主題探究與生活學習", featured: true, note: "香港基督教服務處的介紹涵蓋兩所雋樂幼稚園；沙田班制及年度數據則按本校址獨立呈現。", details: [
      { label: "單元主題配合專題研習", value: "香港基督教服務處稱課程以幼兒為本，循序漸進地採螺旋式教學，並以單元主題和專題研習連結生活體驗、語文分享、戶外考察及專家到校活動。家長可問當屆各級正在研習的主題，以及孩子怎樣參與提問和記錄。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
      { label: "藝術活動補足探究課程", value: "機構亦列創意美術、戲劇、舞蹈和音樂，目標是讓幼兒在探索之外接觸多種表達方式。這是辦學團體公開的課程方向，未公布每種活動的週頻率或個別班安排。", sourceUrl: "https://www.hkcs.org/tc/services/pariokindergarten" },
      { label: "概覽的比例與實際班額要分開", value: "教育局《幼稚園概覽2026/27》按沙田校址0001列1:12.5師生比例。這是師生比例，不是每班12.5人；實際班額、每日時段和全日收費應直接向沙田校舍查詢。", period: "2026/27學年；沙田校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6141060001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "canaan-87", name: "迦南幼稚園（將軍澳）", nameEn: "CANAAN KINDERGARTEN (TSEUNG KWAN O)", district: "西貢區", address: "新界將軍澳康城路1號日出康城第九期3樓幼稚園", schoolNumber: "619787", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午及下午班", website: "http://www.cannan.edu.hk", dataYear: "教育局概覽：2026/27；校方辦學資料及活動：2026-10查核；招生公告：2027/28", sourceNote: "迦南集團自述從遊戲中學習、培養分析和解難；其現行網站公開多校舍及2027/28招生。課程理念是集團層級說明，將軍澳校舍當屆班別、語言活動和名額需按該校舍確認。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號619787、日出康城校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6197870001" },
      { label: "迦南幼稚園：我們的學校", scope: "集團辦學目標、遊戲中學習及全人發展方向。", url: "https://www.cannan.edu.hk/about" },
      { label: "迦南幼稚園：最新活動", scope: "校方2026年公開的繪本、普通話、感官遊戲及體能活動例子。", url: "https://www.cannan.edu.hk/latest_events" },
      { label: "迦南幼稚園官方網站", scope: "2027/28招生入口及各校舍頁面。", url: "https://www.cannan.edu.hk/" },
    ],
    detailSections: [{ title: "從遊戲、故事到生活探究", featured: true, note: "迦南有多所分校；集團課程理念不等於將軍澳校舍每班的時間表。", details: [
      { label: "辦學目標重視遊戲、思考和解難", value: "迦南把全人發展拆為品德、認知與語言、身體、情意與群性、美感等範疇，並稱透過遊戲培養學習興趣、分析推理和解決問題能力。家長可看將軍澳校舍的遊戲活動如何延伸到語言和數學表達。", sourceUrl: "https://www.cannan.edu.hk/about" },
      { label: "近期活動提供可觀察的課堂例子", value: "校方2026年活動頁展示繪本共讀、普通話互動、體能路線設計及傳統文化主題活動。這些是校方公布的活動案例，不代表所有班級固定採用同一頻率或內容。", period: "校方活動查核：2026-10", sourceUrl: "https://www.cannan.edu.hk/latest_events" },
      { label: "幼稚園與幼兒園部是兩種服務", value: "迦南在部分分校另設兩歲幼兒園部；本頁只指教育局登記的將軍澳幼稚園校址，PN未列於2026/27概覽。需要兩歲服務的家庭應另行確認該校址是否提供及其服務時間。", period: "2026/27學年；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6197870001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "the-salvation-army-rosita-yuen-kindergarten-612936", name: "救世軍源林潔和幼稚園", nameEn: "THE SALVATION ARMY ROSITA YUEN KINDERGARTEN", district: "離島區", address: "新界東涌迎東邨迎悅樓地下", schoolNumber: "612936", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "https://www.salvationarmy.org.hk/esd/rykg", dataYear: "教育局概覽：2026/27；救世軍校方集團課程介紹及現行招生頁：2026-10", sourceNote: "救世軍校方訪問介紹專題研習、蒙特梭利、Team BRAVO品德教育和持續評估，並按年級設定發展重點。該訪問為辦學團體介紹，非獨立學生成效評估；招生與活動須按源林潔和校舍公告。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號612936、迎東邨校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6129360001" },
      { label: "救世軍：源林潔和幼稚園課程訪問", scope: "專題研習、蒙特梭利、品德計劃、評估及分級發展重點。", url: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/" },
      { label: "救世軍源林潔和幼稚園官方網站", scope: "本校舍招生、校務和活動公告入口。", url: "https://www.salvationarmy.org.hk/esd/rykg" },
      { label: "救世軍教育服務部", scope: "機構學前服務與辦學使命背景，不作個別成效評級。", url: "https://www.salvationarmy.org.hk/esd/hk/" },
    ],
    detailSections: [{ title: "專題研習與分級發展重點", featured: true, note: "課程描述來自救世軍的校方訪問；不是對幼兒學習成效的獨立評估。", details: [
      { label: "生活主題走出校園再回到課堂", value: "救世軍介紹源林潔和以幼兒感興趣的生活事物作專題，透過觀察、探索、討論和實驗建構知識，並把語文、數學、自然、音樂、體能和美術連回生活。家長可了解校外考察的安排和孩子如何整理所見。", sourceUrl: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/" },
      { label: "K1與K2至K3的訓練側重不同", value: "同一篇校方介紹稱K1較重感官刺激、寫前訓練及自主能力；K2至K3則較重數學邏輯、思維和解難。這是校方公布的年級設計重點，家長可再問每日活動如何平衡自由遊戲和教師帶領。", sourceUrl: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/" },
      { label: "品德及持續評估屬校方公布配套", value: "校方同時提及蒙特梭利教學、Team BRAVO品德計劃及持續性評估。家長可索取當屆評估回饋樣本，了解教師如何把觀察結果用於個別支援。", sourceUrl: "https://salvationarmy.org.hk/our_story/kindergartens-offer-education-with-love/" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "mink-anglo-chinese-kindergarten-231134", name: "明雅中英文幼稚園", nameEn: "MINK ANGLO-CHINESE KINDERGARTEN", district: "大埔區", address: "新界大埔大埔市地段第２６號第１７區新興花園地下", schoolNumber: "231134", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；教育局《幼稚園概覽2026/27》列上午、下午及全日班", website: "http://www.mink.edu.hk", dataYear: "教育局概覽：2026/27；校方主流課程與學校介紹查核：2026-10", sourceNote: "教育局概覽授課語言欄列英語；校方主流課程說明以中文環境為主，另設英語及普通話專科教師。校方有主流、雙語及國際課程的介紹，應先向學校確認大埔新興花園校址當屆實際開辦課程。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號231134、新興花園校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2311340001" },
      { label: "明雅中英文幼稚園：主流課程", scope: "主題綜合課程、專題研習、參觀、角色扮演及語文安排。", url: "https://www.mink.edu.hk/主流課程/" },
      { label: "明雅中英文幼稚園：學校首頁", scope: "校方課程入口、校園活動及家長聯絡資訊。", url: "https://www.mink.edu.hk/" },
    ],
    detailSections: [{ title: "主題課程與語文分流", featured: true, note: "校方網站展示多種課程類別；以下主流課程內容不代表雙語或國際班安排。", details: [
      { label: "主題課程按幼兒發展循序編排", value: "校方主流課程以語文、幼兒數學、大自然與生活、個人與群體、體能與健康、藝術與創意六個範疇編排，並以主題、專題研習、參觀和角色扮演連接生活經驗。可向學校索取當屆主題示例，了解孩子如何由活動走向表達和概念整理。", sourceUrl: "https://www.mink.edu.hk/主流課程/" },
      { label: "英語與普通話由專科教師帶領", value: "校方稱主流班設英語及普通話專科教師，透過遊戲和活動讓幼兒使用語言。教育局概覽欄列英語，校方的課程說明則區分中文環境與外語活動；兩者口徑不同，不足以判斷日常照顧語言或各語言課時比例。", sourceUrl: "https://www.mink.edu.hk/主流課程/" },
      { label: "報名時先確認校舍和課程類別", value: "明雅網站同時介紹不同課程選項；此頁的教育局數據對應新興花園校址0001。家庭若比較主流與雙語／國際課程，應確認該校址、該屆年級是否實際開班及各自費用。", period: "2026/27概覽；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2311340001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "karlam-kindergarten-tuen-mun-branch-536768", name: "珈琳幼稚園（屯門分校）", nameEn: "KARLAM KINDERGARTEN (TUEN MUN BRANCH)", district: "屯門區", address: "新界屯門鄉事會路94—110號康利中心地下入口及一樓全層", schoolNumber: "536768", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；概覽按校址0003列上午、下午及全日班", website: "https://www.karlam.edu.hk/tuenmun", dataYear: "教育局概覽：2026/27（校址0003）；校方招生：2027/28；課程頁查核：2026-10", sourceNote: "屯門分校官方網站公布2027/28申請、半日／全日費用和外語教師團隊；學費與膳食資料分年度列示。校方網頁只描述分校課程入口，未把集團其他校舍資料套用到屯門。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號536768、屯門康利中心校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號536768、校址0003班制、授課語言及比例。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=5367680003" },
      { label: "珈琳幼稚園（屯門分校）：2027/28招生簡介", scope: "當屆申請級別、日期及費用，按年度理解。", url: "https://www.karlam.edu.hk/tuenmun/?page_id=255" },
      { label: "珈琳幼稚園（屯門分校）：校方首頁", scope: "最新校務、課程特色及學校活動入口。", url: "https://www.karlam.edu.hk/tuenmun/" },
      { label: "珈琳幼稚園（屯門分校）：教師團隊", scope: "校方列出的K1-K3教師及英語會話、普通話教師。", url: "https://www.karlam.edu.hk/tuenmun/?page_id=1485" },
    ],
    detailSections: [{ title: "語言師資與全日班成本", featured: true, note: "招生費用按2026/27或2027/28分開標記；外語教師配置不代表各語言有相同課時。", details: [
      { label: "屯門校舍列英語會話及普通話教師", value: "校方教師團隊頁列K1至K3教師，另列英語會話及普通話教師。這證明校方安排相關師資，不代表英語或普通話是主要授課語言；家長可索取K1週課表及日常班主任用語。", sourceUrl: "https://www.karlam.edu.hk/tuenmun/?page_id=1485" },
      { label: "全日班費用應把學費和膳食合計", value: "校方2026/27招生頁列全日班每月學費2,133元、膳食費855元，均收11期；半日班免學費。另有書簿、茶點、校服等代辦項目，應以當屆費目表計算完整支出。", period: "2026/27學年費用；2027/28招生", sourceUrl: "https://www.karlam.edu.hk/tuenmun/?page_id=255" },
      { label: "2027/28申請與註冊安排已更新", value: "屯門校舍已發布2027/28 K1申請資訊，包含申請文件及註冊證要求；動態日期、班別和候補安排應以該頁最新版本確認。", period: "2027/28招生", sourceUrl: "https://www.karlam.edu.hk/tuenmun/?page_id=255" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "william-smart-kindergarten-whampoa-610771", name: "威廉（睿智）幼稚園（黃埔）", nameEn: "WILLIAM (SMART) KINDERGARTEN (WHAMPOA)", district: "九龍城區", address: "九龍紅磡黃埔花園第七期地下Ｇ３Ｃ（２）號舖", schoolNumber: "610771", schoolType: "幼稚園；校方同時提供本地及國際課程選項", gender: "男女校", gradeSpan: "教育局概覽列上午、下午及全日班；年齡及課程按本地／國際班分別核實", website: "http://www.william-inter-kg.edu.hk", dataYear: "教育局概覽：2026/27；校方班級編制、理念及招生：2027/28", sourceNote: "威廉（睿智）官方資料把本地幼稚園課程、國際課程和幼兒英語班分開列示；本頁只以黃埔登記校址作身份。課程類別、年齡、時段和費用須按申請的具體班別確認。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號610771、黃埔花園登記校址及身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001的班制、授課語言及登記資料。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=6107710001" },
      { label: "威廉（睿智）：課程理念", scope: "兒童親身探索、六大學習範疇及學習者發展方向。", url: "https://www.william-inter-kg.edu.hk/課程理念/" },
      { label: "威廉（睿智）：班級編制", scope: "本地、國際及幼兒英語班的年齡和上課時段差異。", url: "https://www.william-inter-kg.edu.hk/班級編制/" },
      { label: "威廉（睿智）：辦學宗旨", scope: "CHILD辦學框架、遊戲學習及兩文三語方向。", url: "https://www.william-inter-kg.edu.hk/辦學宗旨/" },
    ],
    detailSections: [{ title: "本地與國際課程要分開比較", featured: true, note: "本地課程、國際課程及幼兒英語班年齡與班制不同；勿用集團統一宣傳概括黃埔校址實際開班。", details: [
      { label: "課程理念強調親身探索", value: "校方稱透過幼兒親身探索和六大學習範疇，建立知識、態度、價值觀及應用能力；其辦學宗旨以CHILD概括創意、愉快學習、智能、語言和全人發展。家長可觀察孩子在班上是如何選擇活動、操作材料和分享發現。", sourceUrl: "https://www.william-inter-kg.edu.hk/課程理念/" },
      { label: "不同班別的年齡和時段並不相同", value: "官方班級編制把3至6歲本地課程、2至5歲國際課程及2至3歲英語班分開；國際課程部分年級只列上午及下午，全日班另有限定。申請前必須問清黃埔校址是否開設目標年級和課程。", sourceUrl: "https://www.william-inter-kg.edu.hk/班級編制/" },
      { label: "概覽的授課語言不能代表所有課程分流", value: "教育局概覽按校址0001列當屆基本欄位；校方同時營辦多種課程類別。應按本地或國際班別索取課表、教學語言、學費和膳食明細，不能把同校不同課程視為同一收費與授課安排。", period: "2026/27概覽；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=6107710001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "lok-sin-tong-lee-yin-yee-kindergarten-324884", name: "樂善堂李賢義幼稚園", nameEn: "LOK SIN TONG LEE YIN YEE KINDERGARTEN", district: "沙田區", address: "新界沙田水泉澳邨映泉樓二樓", schoolNumber: "324884", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；概覽按校址0002列上午、下午及全日班", website: "http://presch-cms.pehk.com.hk/website/lst/index.php", dataYear: "教育局概覽：2026/27（校址0002）；校方課程頁查核：2026-10", sourceNote: "校方公布遊戲、主題和設計活動，並以啟發潛能教育推動關愛文化；繪本創作、英語、自由遊戲和高班升小銜接均有獨立說明。曾獲獎項或外部認證按校方公開頁描述，不推作目前學習成效。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號324884、水泉澳邨校址及身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "學校編號324884、校址0002班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3248840002" },
      { label: "樂善堂李賢義幼稚園：課程簡介", scope: "遊戲與主題課程、設計活動、繪本創作、關愛及自由遊戲。", url: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
      { label: "樂善堂李賢義幼稚園官方網站", scope: "校方辦學方向、校訓及校務入口。", url: "https://lstlyy.loksintongkg.edu.hk/" },
    ],
    detailSections: [{ title: "自由遊戲與啟發潛能教育", featured: true, note: "獎項和認證是校方列出的歷史紀錄；不等同本學年課堂效果的獨立評估。", details: [
      { label: "主題加設計活動讓孩子參與解題", value: "校方以幼兒發展和個別需要設計活動，配合主題教學、設計活動和綜合體驗，鼓勵幼兒提問、協作和解難。家長可問課堂如何讓幼兒選擇、試錯和重述自己的想法。", sourceUrl: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
      { label: "自由遊戲及繪本創作都有校本說明", value: "校方表示透過自由遊戲滿足幼兒探索需要，並安排繪本創作讓孩子說自己的話、畫自己的畫和分享作品。這類安排重視表達過程；如家長關心書寫操練量，可直接問K1各類紙筆活動的頻率。", sourceUrl: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
      { label: "英語由外籍教師設計和任教", value: "校方稱駐校外籍英語老師設計並教授生活化主題課，配合故事、拼音、唱遊、遊戲和創作。校方沒有列出英語每週總課時，也未說明全日照顧時段的主要溝通語言。", sourceUrl: "https://lstlyy.loksintongkg.edu.hk/zh-hant/about_us/courses" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "epoch-anglo-chinese-kindergarten-215872", name: "怡寶中英文幼稚園", nameEn: "EPOCH ANGLO-CHINESE KINDERGARTEN", district: "東區", address: "香港英皇道９５５－９５７號惠芳閣２－３樓Ａ及Ｂ室", schoolNumber: "215872", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；校方列上午、下午及全日班", website: "http://www.epochkg.edu.hk", dataYear: "教育局概覽：2026/27；校方班級安排及課程資料查核：2026-10", sourceNote: "校方現行班級安排頁列三個年級均設上午、下午及全日班；首頁表述重品格、三語和啟發潛能。可讀的招生公告有舊年度內容，未把其日期或費用當作當前資料。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號215872、惠芳閣校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=2158720001" },
      { label: "怡寶中英文幼稚園：班級安排", scope: "K1至K3半日及全日上課時段。", url: "https://www.epochkg.edu.hk/班級安排/" },
      { label: "怡寶中英文幼稚園：官方首頁", scope: "校方教育價值、校園活動及招生入口。", url: "https://www.epochkg.edu.hk/" },
    ],
    detailSections: [{ title: "品格教育與班制選擇", featured: true, note: "校方班級安排頁確認各級時段；語言細節和最新招生費用需另向校方核實。", details: [
      { label: "辦學方向重品格、文化和三語", value: "校方首頁把教育目標概括為培養優良品格、珍惜文化、重視三語和啟發潛能。這是校方的方向描述，家長可再問英語、普通話和粵語在日常活動中的實際使用方式。", sourceUrl: "https://www.epochkg.edu.hk/" },
      { label: "各級均列半日和全日班時段", value: "校方班級安排頁列K1、K2、K3均有上午、下午和全日班；上午為9時至12時、下午為1時30分至4時30分，全日為9時至4時30分，並註明可於8時30分後返校、下午5時前離校。申請前仍要確認目標級別當屆班額。", sourceUrl: "https://www.epochkg.edu.hk/班級安排/" },
      { label: "概覽語言欄需與校方語言活動分辨", value: "教育局概覽按校址0001列英語授課；這是概覽欄位，不表示整個上課日只用英語。若家庭需要了解中文、英語和普通話的日常比例，應索取當屆課表。", period: "2026/27概覽；校址0001", sourceUrl: "https://kgp2026.kindergartenprofile.com/school/?schid=2158720001" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "hong-kong-y-w-c-a-athena-kindergarten-325953", name: "香港基督教女青年會宏恩幼稚園", nameEn: "HONG KONG Y.W.C.A. ATHENA KINDERGARTEN", district: "深水埗區", address: "九龍深水埗長沙灣道311號怡靖苑閑靜閣地下1至8室", schoolNumber: "325953", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", gradeSpan: "K1至K3；教育局概覽2026/27按校址0001列班制", website: "https://kga.ywca.org.hk", dataYear: "教育局概覽：2026/27；校方課程、支援及2027/28招生資料查核：2026-10", sourceNote: "YWCA宏恩頁面公布遊戲和探索、閱讀、家庭支援及駐校社工，並有2027/28招生資訊。校方稱低收費全日班，但現行全日費用須以當屆正式收費表為準；半日資助不可理解為所有費用全免。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號325953、怡靖苑校址及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、語言、師生比例及學費欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3259530001" },
      { label: "宏恩幼稚園：學校特色", scope: "遊戲學習、好奇探索、閱讀及解難能力方向。", url: "https://kga.ywca.org.hk/tc/Curriculum-Features/School-Features.html" },
      { label: "宏恩幼稚園：學校簡介", scope: "1993創校、辦學宗旨與教學重點。", url: "https://kga.ywca.org.hk/tc/About-Us/Introduction.html" },
      { label: "宏恩幼稚園：學校首頁", scope: "2027/28招生、支援服務及校園活動入口。", url: "https://kga.ywca.org.hk/tc/index.html" },
    ],
    detailSections: [{ title: "遊戲、閱讀與家庭支援", featured: true, note: "校方把遊戲探索和家庭協作列為方向；當屆全日班收費和服務範圍需看最新公告。", details: [
      { label: "從生活題材引出提問和解難", value: "校方描述以生活經驗和幼兒能力設計活動，鼓勵孩子遊戲、提出問題、動手查證和尋找答案。家長可在參觀時留意教師是否給孩子充分嘗試時間，及如何協助孩子把發現說出來。", sourceUrl: "https://kga.ywca.org.hk/tc/Curriculum-Features/School-Features.html" },
      { label: "閱讀與語文基礎是校方教學重點", value: "校方介紹培養閱讀習慣和語文基礎，並在簡介中把中文、英文、思考與創意列為發展重點。這不代表雙語課時相等；若以英文環境作主要選校條件，應核對實際課表和日常照顧語言。", sourceUrl: "https://kga.ywca.org.hk/tc/About-Us/Introduction.html" },
      { label: "招生和支援入口可供家長查詢", value: "校方網站列2027/28 K1招生入口，並設駐校社工、融合服務和非華語學生支援等專頁。家庭可直接確認服務對象、申請方式及當屆可提供的安排。", period: "2027/28招生", sourceUrl: "https://kga.ywca.org.hk/tc/index.html" },
    ] }],
  },
  {
    stage: "kindergarten", slug: "kowloon-city-baptist-kg", name: "九龍城浸信會幼稚園", nameEn: "KOWLOON CITY BAPTIST CHURCH KINDERGARTEN", district: "九龍城區", address: "九龍城亞皆老街206號2樓及3樓", schoolNumber: "324078", schoolType: "非牟利幼稚園；參加幼稚園教育計劃", gender: "男女校", religion: "基督教", gradeSpan: "K1至K3；教育局概覽按校址0001列班制", website: "https://www.kcbckg.edu.hk", dataYear: "教育局概覽：2026/27；校方課程和2027/28 K1收生安排查核：2026-10", sourceNote: "校方以兒童為本和品德教育作課程中心，列有藝術、戲劇、雙語、自由遊戲及奧福音樂。網站同時公布2027/28 K1流程；面試和申請日期只按該招生年度理解。", appendDirectoryDetails: true,
    sources: [
      { label: "教育局《學校位置及資料》", scope: "學校編號324078、亞皆老街校址、電話及學校身份。", url: EDB_LOCATION },
      { label: "教育局《幼稚園概覽 2026/27》", scope: "校址0001班制、授課語言、師生比例及費用欄。", url: "https://kgp2026.kindergartenprofile.com/school/?schid=3240780001" },
      { label: "九龍城浸信會幼稚園：課程特色", scope: "兒童為本、品德教育、藝術、戲劇、雙語、自由遊戲及奧福音樂。", url: "https://www.kcbckg.edu.hk/課程特色/" },
      { label: "九龍城浸信會幼稚園：2027/28收生", scope: "當屆申請、面見、註冊及非華語家庭支援。", url: "https://www.kcbckg.edu.hk/入學申請/" },
      { label: "九龍城浸信會幼稚園：主頁", scope: "聯絡資料、2026校務公告和招生入口。", url: "https://www.kcbckg.edu.hk/" },
    ],
    detailSections: [{ title: "品德教育與多元體驗", featured: true, note: "招生程序引用2027/28校方頁；課程特色為校方自述，不作第三方教學評級。", details: [
      { label: "品德教育置於課程中心", value: "校方稱以兒童為本、重視全方位發展，並以品德教育為課程中心，按幼兒興趣、能力和生活經驗設計活動。可參觀時觀察孩子有沒有表達、分享和自行嘗試的空間。", sourceUrl: "https://www.kcbckg.edu.hk/課程特色/" },
      { label: "藝術、戲劇、雙語和自由遊戲並列", value: "校方列出藝術、戲劇、雙語、自由遊戲及奧福音樂課程入口，亦有課室外體驗式學習活動。這些是可了解的學習機會，實際年級安排、活動頻率及語言比例需向校方確認。", sourceUrl: "https://www.kcbckg.edu.hk/課程特色/" },
      { label: "2027/28面見支援有清楚程序", value: "校方2027/28收生頁列兒童面見、家長陪同和遊戲／交談形式，並說明可為非華語兒童安排傳譯。該頁的日期、註冊費和流程只適用該屆，後續年度需重看新公告。", period: "2027/28招生", sourceUrl: "https://www.kcbckg.edu.hk/入學申請/" },
    ] }],
  },
];
