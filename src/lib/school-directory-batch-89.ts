import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲及K1至K3；當屆班別與名額另確認";
const fullGrades = "PN／2至3歲及K1至K3全日；當屆名額、服務資格另確認";
const veo = "https://www.victoria.edu.hk/campus/belcher-campus/";
const lhFee = "https://www.learninghabitat.org/en/admission/fees";
const lhProgram = "https://www.learninghabitat.org/en/admission/programmes";
const saiCourse = "https://www.sssk.edu.hk/tc/content.php?wid=17";
const taiCourse = "https://www.ssth.edu.hk/tc/content.php?wid=93";
const taiCare = "https://www.ssth.edu.hk/tc/content.php?wid=61";
const leungCourse = "https://www.sslk.edu.hk/tc/content.php?wid=85";

export const KINDERGARTEN_BATCH_89: PilotSchool[] = [
  profile({
    schoolNumber: "542164", locationId: "0001", website: veo, telephone: "25427001", schoolType: "私立獨立幼稚園", principal: "何綺玲", establishedYear: "2001", gradeSpan: grades,
    language: "寶翠園官網列英普粵三語及英普雙語班；各年級班型、課時另確認",
    ratio: "上午1:6.7；下午1:5.9", ratioIncludesPn: true, teacherCount: 25, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有兒童圖書館、光影探究室、創客實驗室及家長休閒座。",
    pn: "2025年9月提供2至3歲服務，收錄71人，半日全年139,579元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認，不借其他維多利亞園低齡服務。",
    feeSummary: "K1半日133,100元／11期；K2半日118,740元、K3半日120,970元／10期；K3全日226,540元／10期",
    fees: "2026/27 K1上午下午全年133,100元、11期，K2為118,740元、10期，K3為120,970元、10期；全日K1／K2「-」、K3列226,540元、10期，實際開班另確認。PN、膳食用品及交通另計。",
    sourceNote: "542164為卑路乍街8號西寶城3樓25427001，與官網校舍頁、2001創辦吻合。雙語與三語由寶翠頁明列，不把中康怡低齡服務或其他分校費率搬入；保留原深度報告入口。",
    sources: [],
    features: { title: "課程特色｜寶翠雙語／三語與探究", featured: true, details: [
      { label: "先選語言路線，再看探究內容", value: "寶翠園官方頁列英普粵三語及英普雙語，K1至K3採IB PYP（國際文憑小學項目，以探究統整學習）；本校概覽配創客、閱讀寫作工作坊及指導閱讀。家庭可看所選年級語言日程及一個探究單元，不把雙語與三語班視為相同中文語音安排。", sourceUrl: veo },
      { label: "家長參助和個別回饋", value: "概覽列持續觀察、學習檔案、新生漸進適應及學習支援同事，家長可伴讀、課堂協助和參與分享。家庭可了解參助是否自願、回饋如何針對孩子，以及K3全日是否實際提供；機構資源不構成指定小學錄取保障。", sourceUrl: kgp("542164") },
    ] },
  }),
  profile({
    schoolNumber: "325880", locationId: "0001", website: "http://www.grace.edu.hk", telephone: "23204188", principal: "張詠儀", establishedYear: "1993", gradeSpan: grades,
    language: "本校概覽未列中文主教粵普及英語普通話時數；按當屆班表確認",
    ratio: "上午1:6.4；下午1:8.8", ratioIncludesPn: true, teacherCount: 8, classroomCount: 6,
    spaces: "有室內、戶外遊戲場地及音樂室；另有禮堂、平台活動場、小組學習室、個別輔導室及音樂區。",
    pn: "2025年9月提供2至3歲服務，收錄5人，半日全年40,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率及空缺另核對。",
    feeSummary: "K1至K3上午資助後免費；全日全年11,836元／11期；下午未列",
    fees: "2026/27 K1至K3上午扣減資助後免費，下午為「-」，全日全年11,836元、11期；PN、膳食用品另計。不能因有全日K班便補PN全日或延時服務。",
    sourceNote: "325880為馬仔坑天宏苑停車場大廈2樓23204188，與官網聯絡吻合，現有2027/28招生公告。當屆細項採本校概覽，未將另一循道園語言教師配置套入。",
    sources: [],
    features: { title: "課程特色｜生活繪本與螺旋主題", featured: true, details: [
      { label: "按興趣把生活問題帶入課堂", value: "主恩堂概覽以基督全人教育為方向，透過螺旋主題、設計活動及繪本，按孩子能力延伸探索與戶外參觀。家庭可看一個主題如何由實物或生活經驗展開，再了解宗教與語言日程，不只比較教了多少知識。", sourceUrl: kgp("325880") },
      { label: "教師、家長與孩子共同回饋", value: "校方每主題持續觀察，讓家長孩子參與，另列社工、到校學前康復、親子教育及小一模擬週。家長可看觀察如何形成可執行建議，再確認PN接送、全日午睡及支援資格；小一模擬沒有保證錄取關係。", sourceUrl: kgp("325880") },
    ] },
  }),
  profile({
    schoolNumber: "516910", locationId: "0001", website: "http://www.elementiedu.org", telephone: "25693112", principal: "林仲欣", establishedYear: "1995", gradeSpan: grades,
    language: "本校列普通話結合奧福音樂、英語故事歌曲及拼音；主教中文粵普和時數未列",
    ratio: "上午1:7.2；下午1:7.8", ratioIncludesPn: true, teacherCount: 6, classroomCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有圖書館、互聯網教學課室、蒙特梭利教學活動區及禮堂。",
    pn: "2025年9月提供2至3歲服務，收錄4人，半日全年34,490元、全日59,301元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年11,814元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年11,814元、11期。PN、膳食用品另計；機構親子體驗與正式照顧班年齡分開。",
    sourceNote: "516910為南安街103號地下及1樓25693112，與登記及本校概覽配對；集團網站列本校為屬下園，但總部地址電話不當校址。蒙特梭利活動區有本校申報，不把集團藝術治療直接當本園固定服務。",
    sources: [],
    features: { title: "課程特色｜正向繪本與音樂語言", featured: true, details: [
      { label: "品德故事連到日常選擇", value: "張錦添紀念概覽以生命和正向教育、培元創意繪本系列為核心，配生活主題及小組自選，讓教師按孩子特質引導，K1不要求執筆或機械操練。家庭可看一個故事怎樣連到分享、輪候和情緒，而不只看完成了多少書頁。", sourceUrl: kgp("516910") },
      { label: "奧福普通話與英語活動", value: "校方把普通話融入奧福節奏樂器，英語配故事、遊戲、歌曲與拼音，建立觀察及成長檔案，另有新生適應及到校康復。家長可問清粵普主次、全日作息及支援資格；機構共同理念不代表各園同樣教師數和語言時數。", sourceUrl: kgp("516910") },
    ] },
  }),
  profile({
    schoolNumber: "325899", locationId: "0001", website: "https://www.evmck.edu.hk", telephone: "25572373", principal: "鄭惠燕", establishedYear: "1993", gradeSpan: grades,
    language: "本校概覽未列中文主教粵普及英語普通話安排／時數；按年級班表核對",
    ratio: "上午1:7.0；下午1:4.3", ratioIncludesPn: true, teacherCount: 4, classroomCount: 6,
    spaces: "有室內、戶外遊戲場地及音樂室；其他特別室欄只填0，未作具體場地解讀。",
    pn: "2025年9月提供2至3歲服務，收錄4人，半日全年36,000元、全日55,680元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年20,966元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年20,966元、11期；PN、膳食用品另計。低在讀人數或比例不能直接推算空缺或個別教學時數。",
    sourceNote: "325899為柴灣道100號1樓25572373，與登記及本校概覽配對；官網本次405，採當屆校方申報，不借主恩堂等循道園配置。其他場地欄0未擴寫成特別設施。",
    sources: [],
    features: { title: "課程特色｜混齡戲劇與節氣生活", featured: true, details: [
      { label: "計劃、實踐後再反思", value: "愛華村堂概覽把宗教、生命品格、環保、二十四節氣飲食及戲劇放進生活主題，配混齡創意活動，每周五另有創意時段。家庭可看孩子如何先計劃、實踐後分享反思，並了解教師怎樣照顧不同年齡，不能只按活動多寡判斷課程適合度。", sourceUrl: kgp("325899") },
      { label: "家庭探訪與觀察跟進", value: "校方列新生適應、家庭探訪、社工及到校學前康復，以持續質性與量化記錄調整教學，另有兩個月一次愛華家樂園。家長可先確認活動是否自願、支援資格及全日午睡膳食，再問清語言安排；這些是支援機制，並非已核實的效果。", sourceUrl: kgp("325899") },
    ] },
  }),
  profile({
    schoolNumber: "613169", locationId: "0001", website: "https://oh.ttmssd.org/", telephone: "27796861", principal: "林越珍", establishedYear: "1968（概覽所列沿革）", gradeSpan: fullGrades,
    language: "原校概覽列外籍英語及普通話老師創設語境；新校班表與中文主教粵普另確認",
    ratio: "原校2025年9月上午1:8.8；下午1:8.8", ratioIncludesPn: true, teacherCount: 11, classroomCount: 8,
    spaces: "原順寧道概覽有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有面談及訓練室。這些數字與設施不直接代表油塘新校舍。",
    pn: "原校2025年9月提供2至3歲服務，收錄16人，半日「-」、全日全年59,592元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。搬遷後資格、時段與新費須另確認，不將原校服務直接搬入新校。",
    feeSummary: "原校2026/27 K1至K3全日資助後全年21,864元／12期；計劃2026年11月遷油塘，新校費表另確認",
    fees: "順寧道2026/27概覽K1至K3上午下午均「-」，全日扣減資助後全年21,864元、12期。官網公告計劃2026年11月遷油塘，不直接將此表當新校核准報價；PN、膳食用品及新校服務另確認。",
    sourceNote: "613169目前登記及概覽為順寧道273號日輝商場1樓27796861；截至2026-10-24官方公告計劃11月遷欣榮街131號高宏苑，面試在油塘新校。保留原校號／校址辨認，原師資、8課室及服務統計不轉成新校數據，開課日與註冊另核實。",
    sources: [],
    features: { title: "搬遷提示｜先確認油塘新校安排", featured: true, details: [
      { label: "計劃2026年11月由深水埗遷油塘", value: "安康官網公告計劃2026年11月遷往油塘欣榮街131號鯉魚門附屬設施大樓地下（高宏苑）；2027/28申請沿現行指引，但面試在油塘新校進行。家庭應先確認實際搬遷及開課日、面試地址和通勤，再申請，不能照舊搜尋結果前往順寧道。", period: "2026-10-24讀取校方公告", sourceUrl: "https://oh.ttmssd.org/" },
      { label: "生命教育及原校支援另標範圍", value: "原校概覽以生命教育、基督品格與生活探究為軸，列英普老師、社工、定期言語治療師及按需臨床心理支援，另有兼收、暫託和延長時間。重視照顧的家庭宜向新校逐項確認是否延續、申請資格及收費；不能由原校介紹保證搬遷後同樣服務。", sourceUrl: kgp("613169") },
    ] },
  }),
  profile({
    schoolNumber: "617474", locationId: "0001", website: "https://www.learninghabitat.org/en/campus/tai-kok-tsui/olympic-campus", telephone: "25015560", schoolType: "私立獨立幼稚園", principal: "孔詠賢", establishedYear: "2021", gradeSpan: grades,
    language: "奧運PN粵英；K可選粵英／普英雙教師共教，當屆各班日程另確認",
    ratio: "上午1:7.9；下午1:7.9", ratioIncludesPn: true, teacherCount: 15, classroomCount: 4,
    spaces: "有室內遊戲場地；戶外遊戲場地及音樂室均標沒有資料，另列圖書館及電腦角。",
    pn: "2025年9月提供2至3歲服務，收錄56人，半日全年90,000元，全日「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。官網2026/27 PN新費見上方，不能沿用舊90,000元報價。",
    feeSummary: "K粵英半日全年90,000元、普英93,600元；PN93,600元，均12期；全日未列",
    fees: "2026/27 K1至K3上午下午概覽全年90,000至93,600元、12期，全日均「-」。官網奧運K粵英每月7,500元、普英7,800元，12期相應90,000／93,600元；PN及教材用品交通另計。",
    sourceNote: "617474是凱帆薈5樓1A號25015560，非同樓2號凱帆校561207。官網開放8:30至17:15不是學生全日課程；班型Full-Time immersion指上課期間沉浸，不作全日照顧。",
    sources: [{ label: "學之園：2026/27奧運班型費表", scope: "PN7800、K粵英7500／普英7800月費，全年12期，教材另收。", url: lhFee }, { label: "學之園：雙語班型與時間", scope: "PN至K3粵英、K1至K3普英，雙教師及半日日程。", url: lhProgram }],
    features: { title: "課程特色｜奧運雙語選班與拼音", featured: true, details: [
      { label: "中文語音與教師分工先選清", value: "機構官方班型列PN至K3粵英、K1至K3普英，每班一位英語及一位相應中文教師共同帶班；粵英補普通話，普英配普通話拼音。家庭可按家中用語及目標小學選班，再問奧運所選年級日程，不將『全程沉浸』理解為全天照顧。", sourceUrl: lhProgram },
      { label: "當屆PN及教材開支", value: "2026/27奧運PN月費7,800元，全年12期計93,600元；K粵英月7,500、普英7,800元。官網另列PN每學期教材雜費2,200元、K班2,500元（每半年），校服交通另計。家長可先算全年總開支，再看本校主題、拼音及評估回饋。", sourceUrl: lhFee },
    ] },
  }),
  profile({
    schoolNumber: "566179", locationId: "0001", website: "https://www.skhspcmain.edu.hk/", telephone: "24683237", principal: "梁慧珠", establishedYear: "1999（青雲路本校概覽）", gradeSpan: fullGrades,
    language: "青雲路本校列英語及普通話專科老師；中文主教粵普及各語言時數未列",
    ratio: "上午1:7.1；下午1:7.4", ratioIncludesPn: true, teacherCount: 11, classroomCount: 3,
    spaces: "有室內、戶外遊戲場地及音樂室；另列電腦、圖書、舞蹈、遊戲室、小禮堂、綠田園及創意廊，專用共用範圍另確認。",
    pn: "2025年9月提供2至3歲服務，收錄62人，半日全年38,665元、全日80,355元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN班別及服務適用註冊單位另確認。",
    feeSummary: "K1至K3全日資助後全年20,768元／11期；半日未列",
    fees: "2026/27青雲路K1至K3上午下午均「-」，全日扣減資助後全年20,768元、11期。PN、膳食用品另計；共用網站有其他註冊園，不將其半日班費表套入本校。",
    sourceNote: "566179為青雲路22號C座1樓及部分地下24683237，與登記配對；官網同時涵蓋1962原校及幼兒中心，11課室／60教職／750容額未直接當青雲路566179。按本校1999、3註冊課室及11教師列，需確認共用範圍。",
    sources: [],
    features: { title: "課程特色｜青雲路專科與奧福音樂", featured: true, details: [
      { label: "宗教、小組與探究並行", value: "青雲路概覽以基督全人教育、螺旋進度及小組活動，配角色扮演、奧福音樂、科學與主題探研，專科老師教英語及普通話。家庭可看所選年級日程和作品，了解宗教、語言及活動的實際分配，不借共同網站總人手推算本校配置。", sourceUrl: kgp("566179") },
      { label: "全日生活與家校檔案", value: "本校列親子迎新適應、社工轉介、到校康復及小一模擬；歷程檔案包括評量、作品、活動分析和家長回饋。需要全日照顧的家庭可先問實際時間、膳食午睡及幼兒中心服務邊界，再看評估如何提出下一步；全日並不代表延長服務。", sourceUrl: kgp("566179") },
    ] },
  }),
  profile({
    schoolNumber: "563269", locationId: "0001", website: "http://www.sssk.edu.hk", telephone: "27920047", principal: "范曉晴", establishedYear: "1994", gradeSpan: fullGrades,
    language: "西貢官網列英語及普通話專科課、故事唱遊拼音；主教中文粵普及時數未列",
    ratio: "上午1:8.6；下午1:8.6", ratioIncludesPn: true, teacherCount: 7, classroomCount: 4,
    spaces: "有戶外遊戲場地，沒有室內遊戲場地及獨立音樂室；另有家長資源室。課室內活動區不等於註冊室內遊戲場地。",
    pn: "2025年9月提供2至3歲服務，收錄10人，半日「-」、全日全年59,268元；沒有2歲以下，有幼兒中心資助及暫託，沒有延長服務。資格、空缺及當屆費率另確認。",
    feeSummary: "K1至K3全日資助後全年20,388元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年20,388元、12期；PN、膳食用品另計。暫託、資助和全日學額為不同資格與服務，不因有其中一項推定全部可用。",
    sourceNote: "563269為西貢頓場村DD215地段27920047，官網同址同電話；其英普專科、水墨畫及社區特色用西貢獨立頁，不搬大興／良景課程。概覽沒有室內遊戲場地，不由室內區角相片改寫為有。",
    sources: [{ label: "聖西門西貢：課程與生活", scope: "藝術、社區、自然感官、英普專科及K2/K3水墨畫，校方安排非成效證明。", url: saiCourse }],
    features: { title: "課程特色｜社區藝術與自然感官", featured: true, details: [
      { label: "從街市到種植和水墨畫", value: "西貢官方頁列社區參觀後觀察記錄及回校匯報、按季節種植、輪流照顧動物，配感官玩沙水；K2和K3有國畫導師水墨課。家長可了解出行安全、戶外頻率與天氣替代，看看孩子的觀察如何延伸成作品，而非只比較活動相片。", sourceUrl: saiCourse },
      { label: "語言課與全日照顧分開核對", value: "本校聘英語及普通話專科導師，用故事、唱遊、拼音及會話學語言，並有混齡關愛活動。家庭可索取一週語言日程，再確認全日膳食午睡及暫託資格；有暫託不等於有延長服務，也不把水墨或劍橋活動相片當每屆固定時數。", sourceUrl: saiCourse },
    ] },
  }),
  profile({
    schoolNumber: "563307", locationId: "0001", website: "http://www.ssth.edu.hk", telephone: "24623856", principal: "湯文雅", establishedYear: "1980", gradeSpan: fullGrades,
    language: "大興本校未列中文主教粵普及英語普通話專科／課時；不套西貢語言配置",
    ratio: "上午1:8.4；下午1:8.4", ratioIncludesPn: true, teacherCount: 7, classroomCount: 4,
    spaces: "有室內、戶外遊戲場地及音樂室；另有兒童圖書室、輔導室及電腦室。",
    pn: "2025年9月提供2至3歲服務，收錄13人，半日「-」、全日全年51,696元；沒有2歲以下，有幼兒中心資助及暫託，沒有延長服務。當屆資格、空缺及新費另確認。",
    feeSummary: "K1至K3全日資助後全年11,796元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年11,796元、12期。PN、膳食用品另計；官網餐單可查不表示所有餐食已包括在此學費。",
    sourceNote: "563307為屯門大興邨第一期商場地下24623856，官網中文校名及聯絡配對；網站英文頁籤沿用Sai Kung模板標題，未把本校改作西貢。生活與照顧頁已有2026/27秋季餐單，但舊校曆不能當新招生表。",
    sources: [{ label: "聖西門大興：課程理念", scope: "兒童興趣、生活經驗及自由遊戲，教師適時介入。", url: taiCourse }, { label: "聖西門大興：生活與照顧", scope: "2026/27秋季餐單入口、早餐、活動、午餐午睡、茶點與自由遊戲；未列逐時段時間。", url: taiCare }],
    features: { title: "課程特色｜把全日生活變成學習", featured: true, details: [
      { label: "自由探索配適時介入", value: "大興官網以幼兒興趣、生活經驗和能力設計主題，重自由遊戲及教師適時引導；概覽列生活實境、小食嘗試、科學及外出參觀。家庭可看教師何時介入、怎樣幫孩子表達及協商，不把『自由』理解成沒有觀察和教學。", sourceUrl: taiCourse },
      { label: "先看餐食午睡與一天節奏", value: "本校生活頁列早餐早會、小組、體能音樂美藝、午餐午睡、茶點與自由遊戲，並有2026/27秋季餐單入口。家庭可按接送、過敏餐食和午睡需要核對實際時間；有全日和暫託不等於延時服務，餐食是否另計亦需查費表。", sourceUrl: taiCare },
    ] },
  }),
  profile({
    schoolNumber: "563277", locationId: "0001", website: "http://www.sslk.edu.hk", telephone: "24646939", principal: "朱靜盈", establishedYear: "1988", gradeSpan: fullGrades,
    language: "良景本校未列主要中文粵普及英語普通話教師／時數；按當屆班表確認",
    ratio: "上午1:9.1；下午1:9.1", ratioIncludesPn: true, teacherCount: 9,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有兒童輔導室。概覽未列註冊課室數。",
    pn: "2025年9月提供2至3歲服務，收錄18人，半日「-」、全日全年43,536元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。服務資格、時間、名額及另收費用須確認，不套另外兩校沒有延時的資料。",
    feeSummary: "K1至K3全日資助後全年12,000元／12期；半日未列",
    fees: "2026/27 K1至K3上午下午均「-」，全日扣減資助後全年12,000元、12期。PN、膳食用品及暫託延長費另確認，不把全日學費當全部照顧費。",
    sourceNote: "563277為良景邨良智樓9至16號地下24646939，中文校名、地址及電話與官網配對，英文模板頁籤不作校名依據。課室原表沒有資料，未由容額推算；全腦等說法是校方教學理念，不作腦功能提升的科學結論。",
    sources: [{ label: "聖西門良景：課程特色", scope: "故事綜合、感官活動、四級混齡運動及基督品格；全腦相關效能為校方主張，未作實證採用。", url: leungCourse }],
    features: { title: "課程特色｜故事情感與混齡運動", featured: true, details: [
      { label: "故事先理解人物感受", value: "良景官網故事綜合教學重人物情感而非只講教訓，讓孩子投入角色和表達，另以四級混齡運動自選同伴器材、學習照顧分享；每天早會唱詩、金句和代禱。家庭可了解宗教參與及不同年齡看顧，從活動例子判斷適配度。", sourceUrl: leungCourse },
      { label: "延時有申報，仍需核對可用性", value: "本校概覽列幼兒中心資助、暫託及延長服務，並有新生家訪、社工及到校康復。需要較長照顧的家庭宜先問資格、實際時間、空缺和另收費用；校方『全腦學習』等名稱僅作理念介紹，不能代替可核查的教學成效。", sourceUrl: kgp("563277") },
    ] },
  }),
];
