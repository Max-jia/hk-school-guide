import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile, type ReviewedKindergartenSpec } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string, location = "0001") => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}${location}`;
const grades = "PN／2至3歲服務及K1至K3；當屆班別與名額另確認";
const cast = "https://cast.creative.edu.hk/";
const highgateCourse = "https://www.highgatehouse.edu.hk/curriculum/";
const highgateClass = "https://www.highgatehouse.edu.hk/project/kindergarten-mon-fri/";
function profile(spec: ReviewedKindergartenSpec): PilotSchool {
  const school = reviewedKindergartenProfile(spec);
  if (spec.schoolNumber !== "545589") return school;
  return { ...school, detailSections: school.detailSections?.map((section) => ({ ...section, details: section.details.map((detail) => detail.label === "師資與課室" ? { ...detail, value: "校長及教學人員共5人（不包括任職0至2歲級別的教師）；概覽註冊課室欄出現負數，未作有效課室數使用，實際數目須向校方確認。" } : detail) })) };
}

export const KINDERGARTEN_BATCH_88: PilotSchool[] = [
  profile({
    schoolNumber: "524034", locationId: "0002", website: "https://www.lingliang.org.hk/campuses/lam-tin", telephone: "28056699", principal: "陳穎雯", establishedYear: "1997", gradeSpan: grades,
    language: "藍田概覽列外語老師生活化語文及拼音，未明列主教粵普及英語時數",
    ratio: "上午1:8.8；下午1:6.7", ratioIncludesPn: true, teacherCount: 30, classroomCount: 10,
    spaces: "有室內、戶外遊戲場地及音樂室；另列科學區、積木區、圖書館、小禮堂、視藝室及傳道室。",
    pn: "2025年9月提供2至3歲服務，收錄113人，半日全年56,290元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認，113人不是學額。",
    feeSummary: "K1至K3半日資助後免費；全日未列",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日均「-」，註冊費欄列沒有開辦全日班；PN、用品交通另計，不把學校總容額當每年K1招生數。",
    sourceNote: "524034校址0002為麗港街12號A區地下，藍田官網同校號、創辦1997及28056699吻合。官網未標年的容額及約1:11不覆蓋2025年9月概覽分時段比例，也不當當屆招生額。",
    sources: [],
    features: { title: "課程特色｜高廣度、方案與音樂", featured: true, details: [
      { label: "先計劃，再做和分享", value: "藍田概覽以靈育、主題、高廣度及方案教學結合，讓孩子經歷計劃、進行與經驗分享，自選學習區並追問問題，配奧福音樂與自主遊戲。家長可看孩子的一次計劃如何實踐及修正，而不只看完成作品；這是校方設計，非已核實的學習成果。", sourceUrl: kgp("524034", "0002") },
      { label: "閱讀寫字與宗教生活", value: "本校列『請聽我讀』、自由寫字、生活化外語及拼音，同時明列K1不要求執筆或機械操練，另有宣教師、社工與到校康復。家庭可問清不同年級讀寫如何自願漸進、宗教活動及支援資格，也需安排半日以外的照顧。", sourceUrl: kgp("524034", "0002") },
    ] },
  }),
  profile({
    schoolNumber: "526010", locationId: "0001", website: "https://www.cannan.edu.hk", telephone: "24068111", principal: "陳偉琳", establishedYear: "1998", gradeSpan: grades,
    language: "海濱校列雙語發展及兩文三語活動；中文主教粵普、專科教師與時數未列",
    ratio: "上午1:8.2；下午1:7.9", ratioIncludesPn: true, teacherCount: 16, classroomCount: 6,
    spaces: "有室內遊戲場地，沒有戶外遊戲場地及獨立音樂室；另有大肌肉室和感官遊戲區。",
    pn: "2025年9月提供2至3歲服務，收錄62人，半日全年88,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。PN數值按本校原表保留，當屆報價及適用班型須另索取，不借其他迦南分校。",
    feeSummary: "K1至K3半日資助後全年3,280元／10期；全日未列",
    fees: "2026/27 K1至K3上午下午扣減資助後全年3,280元、10期，全日為「-」。本校參加計劃但並非學費全免；PN、用品交通另計，不能將3,280元年費誤寫月費。",
    sourceNote: "526010為怡康街2至12號海濱花園平台B、24068111，與登記／本校概覽配對；未借同品牌其他園免費安排或低齡資料。PN半日88000為2025年9月原表，費率適用另核對。",
    sources: [],
    features: { title: "課程特色｜繪本、興趣角與親子閱讀", featured: true, details: [
      { label: "用故事引發探索和選擇", value: "海濱概覽以生活主題與繪本引發解難，課室設不同物料興趣角，讓孩子用五感探索及自選分組，配網上中英文親子閱讀指引。家庭可看所選年級的讀本、語言班表和自選時間，不因集團雙語宣傳推定本校每天英語時數。", sourceUrl: kgp("526010") },
      { label: "檔案不只放相片", value: "本校列主題、繪本、行為觀察與作品分析，學年兩次總結，社工教師跟進及到校學前康復。家長可看一份記錄是否指出具體下一步，再確認新生適應和PN費用；有資助不等於免費，低年齡和K班收費也不能混算。", sourceUrl: kgp("526010") },
    ] },
  }),
  profile({
    schoolNumber: "325589", locationId: "0001", website: "http://www.elementiedu.org", telephone: "28979157", principal: "杜小圓", establishedYear: "1988", gradeSpan: grades,
    language: "本校普通話結合奧福音樂、英語故事歌曲及拼音；中文主教粵普與課時未列",
    ratio: "上午1:7.1；下午1:6.7", ratioIncludesPn: true, teacherCount: 11, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室；另有圖書館與禮堂。",
    pn: "2025年9月提供2至3歲服務，收錄4人，半日全年45,390元、全日70,378元；沒有2歲以下、幼兒中心資助、暫託或延長服務。4人是統計人數，不直接表示現有空缺。",
    feeSummary: "K1至K3半日資助後免費；全日全年12,056元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年12,056元、11期。PN、膳食用品另計；機構體驗活動1歲可參加並非1歲照顧服務。",
    sourceNote: "325589為柴灣吉勝街新翠商場政府大樓4樓及5樓遊戲場28979157；集團總部北角28063870不是本校。集團蒙特梭利、藝術治療等標籤未直接當本校每班提供的服務，課程取本校概覽。",
    sources: [],
    features: { title: "課程特色｜正向繪本與音樂語文", featured: true, details: [
      { label: "以故事和小組培養正向習慣", value: "新翠培元概覽以生命品德故事、正向教育及『培元創意繪本系列』為核心，配自由遊戲與小組自選，K1用小肌肉及手眼活動代替執筆。家長可看故事如何連到孩子的情緒、自理及同伴相處，不將集團療育或教學法標籤視為每個班的固定配置。", sourceUrl: kgp("325589") },
      { label: "音樂普通話與英語故事", value: "校方把奧福音樂、節奏和肢體結合普通話學習，英語則配故事、歌曲、遊戲及拼音，以觀察檔案回饋，另列到校學前康復。家庭可了解每天中文粵普分工、PN全日作息與支援資格；體驗活動開放1歲不代表可以1歲正式入讀照顧班。", sourceUrl: kgp("325589") },
    ] },
  }),
  profile({
    schoolNumber: "522953", locationId: "0001", website: "http://www.hkpreschool.edu.hk", telephone: "23332939", schoolType: "私立獨立幼稚園", principal: "伍慧詩", establishedYear: "1997", gradeSpan: grades,
    language: "駿景校列英普專科導師、兩文三語及雙班主任；各班中文粵普主次與課時未列",
    ratio: "上午1:8.0；下午1:8.0", ratioIncludesPn: true, teacherCount: 21, classroomCount: 7,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有音樂、藝術、閱讀、科學區和磁石壁報板。",
    pn: "2025年9月提供2至3歲服務，收錄95人，半日全年69,800元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。Toddler Programme不直接等於2歲以下日常照顧。",
    feeSummary: "K1至K3半日全年67,500至71,900元／10期；全日未列",
    fees: "2026/27 K1至K3上午下午全年67,500至71,900元、10期，全日為「-」。區間適用課程班型未逐項列明，報名前須核對；PN、用品交通另計，不把低價端當所有班報價。",
    sourceNote: "522953是駿景道1號駿景園地下23332939，官網地址電話吻合。網站有Toddler Programme，未因此改概覽2歲以下『沒有』；沒有從舊九龍塘樂基班型推駿景現行語言。",
    sources: [],
    features: { title: "課程特色｜雙班主任與多領域體驗", featured: true, details: [
      { label: "德育先行，也有閱讀科技", value: "駿景樂基概覽以德育及人際尊重為首，列每週閱讀、不定期國際視野及人工智能／資訊科技活動，涵蓋語文、數理、藝術和體能。家長可看科技活動是動手操作還是屏幕展示，以及如何配合年齡，不把活動名稱當學術或升小成果。", sourceUrl: kgp("522953") },
      { label: "先看雙班主任怎樣分工", value: "本校列雙班主任、駐校護士，英普、體能、美術及音樂專科導師，用檢核表和學習檔案持續觀察。家庭可了解班主任與專科教師的接觸時段、回饋及照顧流程，再核對所選課程費率；有人員配置不等於每位孩子獲相同專科時數。", sourceUrl: kgp("522953") },
    ] },
  }),
  profile({
    schoolNumber: "537578", locationId: "0001", website: cast, telephone: "28822005", principal: "馮慧敏", establishedYear: "2000（幼稚園）；2004（幼兒園，官網所列）", gradeSpan: "官網列PN、K1至K3半日及K2／K3全日；當屆班別另確認",
    language: "帝堡城官網列粵語、普通話、英語及西班牙語；主次與各級時數未列",
    ratio: "上午1:8.6；下午1:4.6", ratioIncludesPn: true, teacherCount: 24, classroomCount: 6,
    spaces: "有室內、戶外遊戲場地，沒有獨立音樂室；另有多功能禮堂。概覽註冊6課室與官網校舍7課室口徑不同，實際用途另核對。",
    pn: "2025年9月提供2至3歲服務，收錄74人，半日全年32,650元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。官網2026/27 PN33,100元／10期仍待批，與舊統計分開。",
    feeSummary: "K半日資助後免費，全日純學費8,060元／10期；官網K2／K3連餐18,140元／10期待批",
    fees: "2026/27概覽K1至K3上午下午資助後免費，全日純學費各級8,060元、10期；官網實際班制只列K2／K3全日，連餐18,140元／10期仍待批。K1全日是否開辦須確認，PN及用品另計。",
    sourceNote: "537578為小瀝源路69號帝堡城L5校舍及L6入口大堂，官網簡寫L6平台、電話28822005吻合，完整登記保留。官網『約400名』未標年不作現讀人數；6註冊與7校舍課室差異保留，不把核准費當所有年級開全日。",
    sources: [],
    features: { title: "課程特色｜四語、體藝與生命教育", featured: true, details: [
      { label: "體藝專科與探究相連", value: "帝堡城官網列粵普英西四語、音體藝專科，透過主題故事、自由自選、動物照顧及社區活動學習；校方鼓勵孩子計劃、實踐和回顧。家長可看一週語言和體藝日程，了解西班牙語頻率，不由『四語』推定四種語言同等熟練。", sourceUrl: cast },
      { label: "全日年級及新費要先核實", value: "官網2026/27 PN半日33,100元、K2／K3全日連餐18,140元，均10期且仍待批，K1未列全日班型。家庭可先確認照顧年級、實際餐食午睡及核准總費，再看家長工作坊和參與時間；往屆升小名單無逐校人數，不計錄取率。", sourceUrl: cast },
    ] },
  }),
  profile({
    schoolNumber: "554383", locationId: "0001", website: "https://www.agneskg.edu.hk/agnesgt/", telephone: "34018128", principal: "范秀芳", establishedYear: "2003", gradeSpan: grades,
    language: "俊宏軒本校概覽未明列中文主教粵普及英普教師課時；不借其他雅麗斯園",
    ratio: "上午1:10.4；下午1:6.1", ratioIncludesPn: true, teacherCount: 18, classroomCount: 8,
    spaces: "有室內、戶外遊戲場地及音樂室；另列閱讀天地、STEM遊戲區、LEGO牆及戶外農莊。",
    pn: "2025年9月提供2至3歲服務，收錄31人，半日全年35,387元、全日62,986元；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年11,693元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年11,693元、11期。PN、膳食用品另計；樂思等分校費率不套本校。",
    sourceNote: "554383為天水圍俊宏軒校舍，官網補天瑞路88號，電話34018128及電郵與概覽吻合；課程採俊宏軒本校申報，沒有借樂思奧福配置或其他分校語言。",
    sources: [],
    features: { title: "課程特色｜感官建構與日常技能", featured: true, details: [
      { label: "用操作和互動發現問題", value: "俊宏軒概覽以主題、遊戲、感官探索和建構活動，讓孩子與人事物互動、表達和解難；配戶外農莊、STEM及LEGO牆。家長可了解不同年齡如何使用空間，教師怎樣從遊戲觀察生活技能，而不把設施名單當效果證明。", sourceUrl: kgp("554383") },
      { label: "家庭回饋連到課程調適", value: "本校以日常觀察、學習檔案和家長回饋跟進差異，與社區合作及早介入，並參與到校學前康復。家庭可看一份評估如何調整學習，再問清語言、全日作息及支援資格；高班參觀小學是適應活動，並沒有保證升讀關係。", sourceUrl: kgp("554383") },
    ] },
  }),
  profile({
    schoolNumber: "528366", locationId: "0001", website: "https://www.yuenyuenkg.edu.hk/pingtin", telephone: "22437116", principal: "鄭月蘭", establishedYear: "1998", gradeSpan: grades,
    language: "平田校列2位英語及1位普通話老師駐校、Jolly Phonics；中文主教粵普和時數另確認",
    ratio: "上午1:9.5；下午1:7.8", ratioIncludesPn: true, teacherCount: 11, classroomCount: 6,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有圖書室、多功能活動室及英語活動室。",
    pn: "2025年9月提供2至3歲服務，收錄6人，半日全年34,690元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費率及空缺另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年11,748元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年11,748元、11期。PN、膳食用品另計，不套其他圓玄園費用。",
    sourceNote: "528366為藍田平田邨平善樓地下22437116，與登記及本校概覽配對；pingtin官網本次405。兩英一普教師及芬蘭科探均本校申報，不當獨立驗證成效，亦不外推所有圓玄園。",
    sources: [],
    features: { title: "課程特色｜英語融入活動與科探", featured: true, details: [
      { label: "語言不只留在語文課", value: "平田概覽列2位英語及1位普通話老師駐校，採Jolly Phonics（英語拼音教學）及繪本，外籍教師參與音體、科學、美藝，全日班再用故事角色扮演和小食製作延伸。家庭可索取實際日程，看語言如何跨活動使用，不由教師數目推每班課時。", sourceUrl: kgp("528366") },
      { label: "探究與道化品格一起看", value: "本校列芬蘭科探活動、動手實驗、開心Share及社區服務，秉承明道立德，並有社工、親子適應及到校康復。家長可看孩子如何提出問題和驗證，了解宗教文化與支援資格；引入海外教學名稱不等於取得成效認證。", sourceUrl: kgp("528366") },
    ] },
  }),
  profile({
    schoolNumber: "325791", locationId: "0001", website: "http://hongyingkinder.edu.hk/", telephone: "27723243", principal: "盧承依", establishedYear: "1991", gradeSpan: grades,
    language: "本校列受訓外籍教師英語活動及拼音；主要中文粵普、普通話安排與時數未列",
    ratio: "上午1:7.4；下午1:9.6", ratioIncludesPn: true, teacherCount: 7, classroomCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有藝術廊、遊戲區、科學探索、電腦及閱讀區。",
    pn: "2025年9月提供2至3歲服務，收錄4人，半日全年28,292元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。辦學團體課餘託管不等於本園延長服務。",
    feeSummary: "K1至K3半日資助後免費；全日全年10,800元／12期，實際半日開班另確認",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年10,800元、12期。2025年9月K班在讀皆全日，但不能據此推2026/27半日仍無招生；PN、膳食用品與團體課餘託管費另確認。",
    sourceNote: "325791為德田邨康盈苑地下；概覽27723243，現官網同址但電話27723163，兩組並列邊界。新域hongyingkinder.edu.hk取代舊hongyingkid.edu.hk；團體學前託管須另確認地點年齡資格，不改本校延時欄『沒有』。",
    sources: [],
    features: { title: "課程特色｜螺旋主題與情緒運動", featured: true, details: [
      { label: "按能力加深活動難度", value: "康盈概覽以活動和主題、螺旋進度設計課程，外籍教師用分組遊戲、故事和歌曲帶英語拼音，另配科學、體能、音樂及藝術。家庭可看同一主題如何按孩子能力調整，再了解每天語言時段，不把校名中英文直接解讀成一半英語課時。", sourceUrl: kgp("325791") },
      { label: "照顧安排分清園內與團體", value: "本校列社工、系統化情緒課、新興運動及幼小模擬；辦學團體另有學前課餘託管。需要延後接送的家庭宜先問託管地址、對象、時段與費用，再確認能否銜接所選班；這不等於概覽所指本園已提供延長服務。", sourceUrl: kgp("325791") },
    ] },
  }),
  profile({
    schoolNumber: "545589", locationId: "0001", website: "https://www.highgatehouse.edu.hk/", telephone: "28496336", schoolType: "私立獨立幼稚園", principal: "朱璐怡", establishedYear: "1992", gradeSpan: "官網幼稚園3至6歲混齡；概覽另有2至3歲PN，親子活動年齡不作照顧資格",
    language: "官網幼稚園為英語／普通話雙語，透過生活互動；未列兩語課時比例",
    ratio: "上午1:3.0；下午為「-」", ratioIncludesPn: true, teacherCount: 5,
    spaces: "概覽有戶外遊戲場地，沒有室內遊戲場地及獨立音樂室；其他特別室未列。註冊課室欄原表為-3，屬異常，未採作有效數值。",
    pn: "2025年9月提供2至3歲服務，收錄4人，半日全年140,000元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。親子課或嬰幼活動不等於本註冊幼稚園提供2歲以下照顧。",
    feeSummary: "概覽K1至K3半日全年140,000元／10期；官網幼稚園列上午9至12時，全日未列",
    fees: "2026/27概覽K1至K3上午下午全年140,000元、10期，全日為「-」。官網3至6歲幼稚園列星期一至五上午9至12時、月費14,000元，實際下午是否開班及適用課程另確認；PN與其他親子課程費用須分開。",
    sourceNote: "545589為山頂道100至104號牛奶公司商場B座2樓6號舖28496336，官網山頂100號同電話吻合，完整登記保留。KGP課室-3為原表異常，沒有自改正3；概覽課程空白，以校方英普混齡及Steiner／Pikler說明補，不把網站家長薦語當獨立口碑。",
    sources: [{ label: "Highgate：教學理念及語言", scope: "Steiner及Pikler啟發、英普生活互動與藝術實作；機構年齡論述不等同註冊照顧年齡。", url: highgateCourse }, { label: "Highgate：幼稚園班型及日程", scope: "3至6歲英普混齡、星期一至五9至12時、月費14000及示例作息；非保證每日固定安排。", url: highgateClass }],
    features: { title: "課程特色｜英普混齡與生活實作", featured: true, details: [
      { label: "華德福與Pikler啟發的節奏", value: "校方課程受Rudolf Steiner（華德福）及Emmi Pikler幼兒教育理念啟發，重類家庭環境、動作探索、藝術和日常實作，用英語普通話自然互動。3至6歲幼稚園採混齡，家庭可先了解這種節奏與自己對讀寫操練的期望是否相符，再問小學轉銜準備。", sourceUrl: highgateCourse },
      { label: "從示例半日生活看選擇", value: "幼稚園官網示例有創作遊戲、烹飪、手作、收拾、茶點、普通話圓圈、戶外及故事，星期一至五9至12時，月費14,000元。家長可了解不同年齡如何分工、下雨替代和評估回饋，並先核對實際時段與年費；示例作息並非每一天的固定承諾。", sourceUrl: highgateClass },
    ] },
  }),
  profile({
    schoolNumber: "545333", locationId: "0001", website: "https://www.yuenyuenkg.edu.hk/tinyat/", telephone: "21463111", principal: "許佩芬", establishedYear: "2002", gradeSpan: grades,
    language: "天逸校本概覽未列主要中文粵普及英普教師時數；不套平田兩英一普安排",
    ratio: "上午1:11.1；下午1:6.8", ratioIncludesPn: true, teacherCount: 18, classroomCount: 7,
    spaces: "有室內、戶外遊戲場地及音樂室；另有才藝舞台、藝術活動、多用途、閱讀及大肌肉活動空間。",
    pn: "2025年9月提供2至3歲服務，收錄22人，半日全年38,500元，全日為「-」；沒有2歲以下、幼兒中心資助、暫託或延長服務。當屆PN費表另確認。",
    feeSummary: "K1至K3半日資助後免費；全日全年11,473元／11期",
    fees: "2026/27 K1至K3上午下午扣減資助後免費，全日全年11,473元、11期；PN、膳食用品另計，不借平田或其他圓玄分校費率。",
    sourceNote: "545333為天逸邨停車場大樓地下21463111，與登記及本校概覽吻合，tinyat官網本次405。課程有本校當屆申報，未把其他圓玄園科探品牌、英普教師數套入。",
    sources: [],
    features: { title: "課程特色｜恆常自由遊戲與自然生活", featured: true, details: [
      { label: "按興趣做方案，也練習協商", value: "天逸概覽以生活主題、小組、方案及混齡遊戲，鼓勵孩子討論和協商；自由遊戲恆常化，配大自然與生活探索，秉承道化教育及明道立德。家庭可看孩子每天有多少自主選擇，教師如何幫忙處理同伴衝突，不把母會共同理念當所有園同一實際課表。", sourceUrl: kgp("545333") },
      { label: "基金與支援先確認資格", value: "校方列緊急援助基金、親子學前遊戲班、高班生活體驗週及到校學前康復，以成長檔案跟進，家長教師會及義工促進溝通。家庭可了解支援申請條件、觀課及回饋例子，再問清語言和全日作息；有基金不表示人人獲資助。", sourceUrl: kgp("545333") },
    ] },
  }),
];
