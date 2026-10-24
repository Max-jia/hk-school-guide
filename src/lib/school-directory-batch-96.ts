import type { PilotSchool } from "./school-directory-pilot";
import { reviewedKindergartenProfile as profile } from "./school-directory-reviewed-kindergarten";

const kgp = (id: string) => `https://kgp2026.kindergartenprofile.com/school/?schid=${id}0001`;
const grades = "PN／2至3歲及K1至K3；當屆班別與空缺另確認";
const lui = "https://www.poleungkuk.org.hk/child-care-services/lktkgn";
const huang = "https://www.poleungkuk.org.hk/child-care-services/khkgn/school-info";
const huangFee = "https://applications.edb.gov.hk/schoolsearch/schoolfee/563790.pdf";
const chun = "https://ssd.fmchk.org/cln/cln-contact-us?nid=9";

export const KINDERGARTEN_BATCH_96: PilotSchool[] = [
  profile({
    schoolNumber: "563625", locationId: "0001", website: "https://www.newklnwa.edu.hk", telephone: "26482509", principal: "鄭淑玲", establishedYear: "1986", gradeSpan: grades,
    language: "沙角本校未明列中文主教粵普及英語普通話教師／時數，不借其他分校",
    ratio: "上午1:6.8；下午1:6.8", ratioIncludesPn: true, teacherCount: 8, classroomCount: 3,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；其他特別室列沒有。",
    pn: "2025年9月提供2至3歲服務，收錄10人，半日「-」、全日全年37,992元；沒有2歲以下，有幼兒中心資助及暫託，沒有延長服務。當屆新費、資格與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年2,760元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年2,760元、12期。這是全年而非月費，也不是免費；PN、膳食用品及暫託另計。",
    sourceNote: "563625為沙角邨美雁樓地下28至40號26482509，與登記概覽配對；沒有套樂華、慈雲山全日免費或新翠3300。聯校網站活動不作每園固定課程。",
    sources: [],
    features: { title: "課程特色｜小組體驗與持續調整", featured: true, details: [
      { label: "從故事實驗建立生活經驗", value: "沙角概覽以兒童發展和興趣設計活動及主題教學，配小組、故事、實驗和參觀。家庭可看同一課題如何照顧不同孩子，另問語言日程和雨天體能；同機構校名相近，場地與語言安排仍須按本校看。", sourceUrl: kgp("563625") },
      { label: "學習檔案連到支援", value: "本校把主題、六大範疇及總結評估結合歷程檔案，列新生適應、個別輔導、社工、兼收及到校康復。家長可看記錄如何改變教學進度，再核對暫託條件；本校沒有延長服務，低學費不表示接送可延後。", sourceUrl: kgp("563625") },
    ] },
  }),
  profile({
    schoolNumber: "563820", locationId: "0001", website: lui, telephone: "23953623", principal: "莫詠圓", establishedYear: "1990（2012命名，非新創校）", gradeSpan: grades,
    language: "呂錦泰本校列外籍教師英語及奧福活動；中文主教粵普、普通話與時數未列",
    ratio: "上午1:7.5；下午1:7.5", ratioIncludesPn: true, teacherCount: 12, classroomCount: 4,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有小組學習室。",
    pn: "2025年9月提供2至3歲服務，收錄18人，半日「-」、全日全年39,336元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。官網費表仍2025/26，當屆新費與資格時段另確認。",
    feeSummary: "K1至K3全日資助後全年16,836元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年16,836元、12期。官網K月1,384元是2025/26舊費，不覆蓋本屆費；PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "563820為鐵樹街43號海康大廈2座2樓23953623，登記概覽匹配；1990開辦與2012命名分開，舊大角咀沿革不當另一新校。機構總機不當校電話。",
    sources: [],
    features: { title: "課程特色｜多感官探索與每月評估", featured: true, details: [
      { label: "科學體藝與社區生活", value: "呂錦泰概覽結合科學探究、戲劇、奧福及美術，配個別小組、專題、社區探訪和外籍英語。家庭可看孩子如何選擇、動手與分享，另問英語頻率；興趣班不是全部已包含在全日學費內的固定課程。", sourceUrl: kgp("563820") },
      { label: "每月記錄與學期總結", value: "本校每月學習評估、每學期總結並設歷程檔案，列社工轉介、治療及心理支援和輔助醫療計劃。家長可問對象、名額和家居跟進，再索取當屆完整費表；支援資源不代表每人獲配，官網舊年度費不當新報價。", sourceUrl: kgp("563820") },
    ] },
  }),
  profile({
    schoolNumber: "563854", locationId: "0001", website: chun, telephone: "26416338", principal: "趙玉雲", establishedYear: "1989", gradeSpan: grades,
    language: "本校列探究全語文及英語普通話活動；中文主教粵普、教師與課時未列",
    ratio: "上午1:6.8；下午1:6.8", ratioIncludesPn: true, teacherCount: 14,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有多用途活動室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄19人，半日「-」、全日全年27,048元；沒有2歲以下，有幼兒中心資助及延長服務，沒有暫託。當屆新費、資格與時段另確認。",
    feeSummary: "K1至K3全日資助後全年4,320元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年4,320元、12期；PN、膳食用品及延長服務另費另核對，不把4,320元當月費。",
    sourceNote: "563854為耀安邨耀和樓2樓4至9室26416338，官方學校聯絡專頁同址同電話；概覽網址www.cln.fmchk缺後綴，改用已找到學校專頁，機構27856740不當本校。",
    sources: [{ label: "循理會：本校聯絡及服務時間", scope: "同址26416338，學校開放與接送時段，不是北角總部。", url: chun }],
    features: { title: "課程特色｜探究全語文與基督生活", featured: true, details: [
      { label: "小組與制服團隊活動", value: "本校概覽列探究式全語文、參觀、小組、英普活動及基督少年軍小綿羊第290分隊，重視群體生活和積極學習。家庭可看所選年齡實際參與方式及宗教日常，另問語言班表；制服活動不表示全部年級均可參加。", sourceUrl: kgp("563854") },
      { label: "接送與額外照顧分清", value: "官方本校頁列平日開放8至18時、週六8至13時，並分列早上到校與下午接走時段；當屆具體課節和延時資格另問。概覽有新生、升小適應、社工及到校康復，沒有暫託，不能把開放時間當隨到照顧。", sourceUrl: chun },
    ] },
  }),
  profile({
    schoolNumber: "563781", locationId: "0001", website: "https://oi.ttmssd.org/", telephone: "27647050", principal: "黃雪麗", establishedYear: "1993", gradeSpan: grades,
    language: "安基本校列外籍英語老師及普通話老師；中文主教粵普與時數未列",
    ratio: "上午1:7.9；下午1:7.9", ratioIncludesPn: true, teacherCount: 8,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有輔導室、多功能室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄13人，半日「-」、全日全年67,380元；沒有2歲以下及幼兒中心資助，有暫託及延長服務。當屆新費、資格、時間與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年27,948元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年27,948元、12期；PN、膳食用品及暫託延長另費另核對。K教育計劃不等於PN有幼兒中心資助。",
    sourceNote: "563781是黃埔花園5期青樺苑9座平台27647050，非安怡或安強；新oi域取自概覽。現有on-kei-nursery報告入口保留，本次只改簡明資料頁。",
    sources: [],
    features: { title: "課程特色｜生命教育與文化探索", featured: true, details: [
      { label: "英普語境配社區學習", value: "安基概覽以生命教育統整文化、藝術及科技，設外籍英語與普通話老師，配主題、作品及觀察評估。官網有非遺及社區參觀活動。家庭可看孩子如何在日常使用語言，不能由外籍配置推全英或三語相等。", sourceUrl: kgp("563781") },
      { label: "申請年度與支援要分開", value: "官網寫明2027/28申請自2026年7月2日開始；這不是即時空缺表。概覽另列社工、言語治療、按需心理支援及到校康復，家庭可先核對PN及額外照顧費、資格，再看支援怎樣接到家庭日常。", sourceUrl: "https://oi.ttmssd.org/" },
    ] },
  }),
  profile({
    schoolNumber: "563790", locationId: "0001", website: huang, telephone: "23206671", principal: "姚婉雯", establishedYear: "1975（2012命名，非新創校）", gradeSpan: grades,
    language: "黃樹雄本校列外籍教師英語及奧福；中文主教粵普、普通話與時數未列",
    ratio: "上午1:8.8；下午1:8.8", ratioIncludesPn: true, teacherCount: 11, classroomCount: 3,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有小組輔導室。",
    pn: "2025年9月提供2至3歲服務，收錄19人，半日「-」、全日全年33,564元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。官網2026/27 N月2,805元，按12期33,660元，與舊統計分開。",
    feeSummary: "概覽K全日資助後全年17,316元／12期；官網同學年月1,843元口徑不同，總費須核對",
    fees: "2026/27概覽K1至K3半日「-」、全日扣減資助後全年17,316元、12期；官網同年度K月1,843元、12期按此為22,116元，未拆膳費。兩項不能直接互換，須向校方索取當屆學費與膳費分項；本次可讀證明書是2025-09-01舊版，不用其17,088元替換新概覽。",
    sourceNote: "563790為坪石邨黃石樓125至132號23206671，登記概覽一致；1975開辦、2012命名。概覽17316、官網1843×12口徑不同，舊2025證明書學費17088加膳4740不可冒作2026新費。差異並列，不推自行已解決。",
    sources: [{ label: "教育局：黃樹雄舊收費證明書", scope: "生效2025-09-01，學費與膳費分項；不當2026/27新批核。", url: huangFee }],
    features: { title: "課程特色｜科學體藝與畢業生支援", featured: true, details: [
      { label: "個別小組與社區探索", value: "黃樹雄概覽列探究科學、戲劇、奧福、情意、美術、外籍英語及小童軍，配專題和社區探訪。家長可看課程如何照顧不同能力，並問語言日程；校外探索不等於校內有戶外場。", sourceUrl: kgp("563790") },
      { label: "先核對當屆完整費單", value: "校網2026/27 N月2,805元、K月1,843元；K月費與概覽純學費數字不同，應先索取分項，不能擅稱差額全部是餐費。本校另列畢業生免費多元興趣活動及按需專業支援，對象、名額和條件仍須確認，並非全體自動享有。", sourceUrl: huang },
    ] },
  }),
  profile({
    schoolNumber: "563633", locationId: "0001", website: "https://www.newklnwa.edu.hk", telephone: "26992386", principal: "梁明慧", establishedYear: "1985", gradeSpan: grades,
    language: "新翠本校未明列中文主教粵普及英語普通話教師／時數，不借其他分校",
    ratio: "上午1:5.8；下午1:5.8", ratioIncludesPn: true, teacherCount: 4, classroomCount: 3,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；其他特別室列沒有。",
    pn: "2025年9月提供2至3歲服務，收錄5人，半日「-」、全日全年40,320元；沒有2歲以下，有幼兒中心資助及暫託，沒有延長服務。當屆新費、資格與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年3,300元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年3,300元、12期，是年費而非月費；PN、膳食用品及暫託另計，不套樂華／慈雲山免費。",
    sourceNote: "563633為新翠邨新偉樓地下1至8號26992386，登記概覽配對，與沙角26482509分開。少量在讀不推當屆易入或保證個別教學。",
    sources: [],
    features: { title: "課程特色｜小組操作與個別進展", featured: true, details: [
      { label: "從故事實驗累積經驗", value: "新翠概覽以兒童中心、活動和主題互動教學，配小組遊戲、故事、實驗和參觀。家庭可看教師怎樣調節活動，另問英普接觸及雨天體能；不由同品牌聯校活動推每園相同日程。", sourceUrl: kgp("563633") },
      { label: "檔案回饋與兼收支援", value: "本校將六大範疇、主題與總結評估加入歷程檔案，列新生適應、個別輔導、社工、兼收及到校康復。家長可看回饋如何形成下一步，並確認暫託資格；本校沒有延長服務，低學費不能替代接送安排。", sourceUrl: kgp("563633") },
    ] },
  }),
  profile({
    schoolNumber: "563714", locationId: "0001", website: "http://www.alcnursery.org.hk", telephone: "25543470", principal: "袁淑雯", establishedYear: "1979", gradeSpan: grades,
    language: "本校列受訓導師英語及普通話活動；中文主教粵普和各語言時數未列",
    ratio: "上午1:7.5；下午1:7.5", ratioIncludesPn: true, teacherCount: 8, classroomCount: 9,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；另有輔導室。課室9間按概覽，不由容額推改。",
    pn: "2025年9月提供2至3歲服務，收錄8人，半日「-」、全日全年37,284元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格、時段與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年3,600元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年3,600元、12期，是年費而非月費；PN、膳食用品及暫託延長費另核對。",
    sourceNote: "563714為鴨脷洲邨利寧樓地下1至12號25543470，官網同址電話；概覽9課室照原表。舊文三文兩語未照抄為語言定義，保留有據的英普導師及未列時數。",
    sources: [],
    features: { title: "課程特色｜感官體驗與制服活動", featured: true, details: [
      { label: "繪本與生活操作並行", value: "鴨脷洲邨本校概覽結合主題、繪本、設計活動、感官操作及戶外參觀，英普由受訓導師帶活動，另有制服團體培養品格。家長可問各級參與及語言日程，觀察是否鼓勵孩子主動探索，不只看活動數目。", sourceUrl: kgp("563714") },
      { label: "照顧與專業轉介", value: "本校列新生及小一適應、社工、社區合作及到校康復，提供按需諮詢、訓練及轉介。家庭可先確認低年級作息、暫託延時費和資格，再看持續及總結評估如何跟進；服務存在不等於隨時有空缺。", sourceUrl: kgp("563714") },
    ] },
  }),
  profile({
    schoolNumber: "564060", locationId: "0001", website: "https://ok.ttmssd.org/", telephone: "23210580", principal: "陳淑萍", establishedYear: "1963", gradeSpan: grades,
    language: "安強本校列外籍英語老師及普通話老師；中文主教粵普與各語言時數未列",
    ratio: "上午1:7.8；下午1:7.8", ratioIncludesPn: true, teacherCount: 12,
    spaces: "有戶外遊戲場地及音樂室，室內遊戲場地欄列沒有；另有多用途室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日「-」、全日全年63,024元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格、時段與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年16,680元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年16,680元、12期；PN、膳食用品及暫託延長另費另核對。",
    sourceNote: "564060為鳳德邨社區中心5樓23210580，登記概覽配對，非黃埔安基。室內場沒有、戶外有照原表，不套其他崇真園；新ok域及本校活動可讀。",
    sources: [],
    features: { title: "課程特色｜生命教育與生活語境", featured: true, details: [
      { label: "文化藝術與社區接觸", value: "安強概覽以基督生命教育統整文化、藝術及科技，設英普教師；官網可見親子瑜伽、繪本劇場及社區參觀。家庭可看宗教和自由遊戲日程、雨天活動安排，不把跨校畢業典禮當日常課程或升學保障。", sourceUrl: kgp("564060") },
      { label: "定期支援與家校觀課", value: "本校列社工、言語治療師定期到校，心理支援按需，並有家長教師會、觀課、面談及到校康復。家長可問支援對象、轉介和等候，再核對延時暫託條件；專業資源不是每童固定時數。", sourceUrl: kgp("564060") },
    ] },
  }),
  profile({
    schoolNumber: "564150", locationId: "0001", website: "https://ftylns.tungwahcsd.org/tc", telephone: "24610774", principal: "陳麗琼", establishedYear: "1991", gradeSpan: grades,
    language: "東華方譚遠良列全語文故事教學；中文主教粵普及英語普通話教師／時數未列",
    ratio: "上午1:7.6；下午1:7.6", ratioIncludesPn: true, teacherCount: 9, classroomCount: 3,
    spaces: "有室內遊戲場地及音樂室，沒有戶外遊戲場地；其他特別室列沒有。",
    pn: "2025年9月提供2至3歲服務，收錄20人，半日「-」、全日全年37,800元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格、時段與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年16,092元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年16,092元、12期；PN、膳食用品及暫託延長費另核對。",
    sourceNote: "564150為屯門田景邨田裕樓地下1至5室24610774，非保良局慈雲山方譚遠良563943；校網本次逾時，課程取本校概覽，未搬保良局英語及培育活動。",
    sources: [],
    features: { title: "課程特色｜故事生活與家長支援", featured: true, details: [
      { label: "螺旋課程按需要深化", value: "東華方譚遠良概覽以故事、全語文及生活訓練，配教育心理諮詢設計螺旋式綜合課程，逐步建立獨立性和主動學習。家長可看不同年級怎樣增加挑戰，不能由同名捐款人推與保良局園共用課程。", sourceUrl: kgp("564150") },
      { label: "育兒壓力與個別需要一起跟進", value: "本校列社工、特殊幼兒工作員、按需治療及兼收到校康復；家長義工和社工小組支援新來港及有壓力家庭。家長可問如何轉介、實際名額和家居跟進，再核對額外照顧；專業名單不等於無條件免費訓練。", sourceUrl: kgp("564150") },
    ] },
  }),
  profile({
    schoolNumber: "564087", locationId: "0001", website: "https://oy.ttmssd.org/", telephone: "26612866", principal: "謝雅雯", establishedYear: "1976", gradeSpan: grades,
    language: "安仁本校列外籍英語及普通話老師；中文主教粵普與各語言時數未列",
    ratio: "上午1:8.7；下午1:8.7", ratioIncludesPn: true, teacherCount: 17,
    spaces: "有室內、戶外遊戲場地及音樂室；另有科探室、多功能室，註冊課室數未列。",
    pn: "2025年9月提供2至3歲服務，收錄29人，半日「-」、全日全年59,412元；沒有2歲以下，有幼兒中心資助、暫託及延長服務。當屆新費、資格、時間與空缺另確認。",
    feeSummary: "K1至K3全日資助後全年21,384元／12期；半日未列",
    fees: "2026/27 K1至K3半日均「-」，全日扣減資助後全年21,384元、12期；PN、膳食用品及暫託延長費另核對。",
    sourceNote: "564087為大埔富善邨明雅苑停車場側26612866，登記概覽配對，非明雅國際。官網新oy域，本次可讀活動但首頁仍2025/26招生，不當當屆仍有位。",
    sources: [],
    features: { title: "課程特色｜科探空間與生命教育", featured: true, details: [
      { label: "把文化藝術與探索連起來", value: "安仁概覽以生命教育、文化藝術及科技統整學習，設英普教師與科探空間；官網可見紮染、愛護動物及公共機構參觀。家庭可看孩子如何動手、提問和表達，另問語言時數；校外活動不代表每童同樣參與量。", sourceUrl: kgp("564087") },
      { label: "家校與專業支援條件", value: "本校列社工、言語治療、按需心理支援、兼收和到校康復，並有家長教師會、面談及觀課。家庭可先問孩子所需支援的轉介、等候與家居建議，再核對額外照顧費及資格；舊年度招生字句不作即時空缺依據。", sourceUrl: kgp("564087") },
    ] },
  }),
];
