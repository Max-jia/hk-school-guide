import reportMeta from "@/content/report-meta.json";

export type BlogRelatedLink = { label: string; href: string; description?: string };
export type BlogRelatedGroup = { id: string; title: string; actions?: boolean; links: BlogRelatedLink[] };
export type BlogRelatedConfig = {
  stage: "kindergarten" | "primary" | "secondary" | "all";
  eyebrow: string;
  summary: string;
  groups: BlogRelatedGroup[];
};

const guide = (slug: string, label: string, description: string): BlogRelatedLink => ({ label, href: `/blog/${slug}`, description });
const topic = (slug: string, label: string, description: string): BlogRelatedLink => ({ label, href: `/blog/topics/${slug}`, description });
const G = {
  kTypes: guide("kg-school-types-guide", "幼稚园类型与免费计划", "把办学类别、课程和资助分别看"),
  kHours: guide("kg-school-hours-care-guide", "半日、全日与照顾安排", "核对接送、假期和加班时的照顾空档"),
  kWait: guide("kg-waitlist-transfer-guide", "没有offer、转校与停办后备", "确认空缺、取消注册和原校手续"),
  kResults: guide("kg-primary-outcomes-guide", "幼稚园升小成绩怎样读", "分清派位、考小、offer与实际入读"),
  pTypes: guide("school-types-guide", "官津、直资与私立怎样选", "比较收生方式、成本及升中路径"),
  pOffer: guide("p1-offer-registration-guide", "小一offer与注册怎样取舍", "先看保证书、派位资格与回复期限"),
  pInterview: guide("primary-interview-guide", "直私小一面试怎样准备", "材料、互动与校本要求分别核对"),
  pTransfer: guide("primary-transfer-guide", "小学插班与转校代价", "空缺、测试、课程与呈分时间"),
  pDaily: guide("primary-school-learning-guide", "语言、功课与测考节奏", "把学校安排放进孩子一周的生活"),
  sOverview: guide("secondary-admission-guide", "升中申请全流程", "自行、直资与统一派位两条线一起管理"),
  sBand: guide("secondary-banding-guide", "孩子组别与学校Banding", "分清学生分组与非官方学校定位"),
  sLanguage: guide("secondary-language-guide", "英中、中中与逐科语言", "逐科、班别及年级核对学习要求"),
  sSelf: guide("secondary-discretionary-guide", "中一自行两校与面试", "比较收生比重、材料及孩子的适配"),
  sCentral: guide("secondary-central-allocation-guide", "统一派位甲乙部与志愿", "看清处理顺序、校网与备选名单"),
  sCost: guide("secondary-school-cost-guide", "六年费用、奖学金与减免", "分开确定开支、预算假设与可申请支援"),
  sResults: guide("secondary-results-guide", "DSE成绩与升学比例读法", "理解术语、分母与达标的实际意义"),
  sCurriculum: guide("secondary-curriculum-pathways-guide", "DSE、IB与A-Level怎样选", "课程、中文与转轨代价一起比较"),
  sTransfer: guide("secondary-transfer-guide", "中一叩门与中学插班", "按年级核对空缺、课程及原校手续"),
  sSubject: guide("secondary-subject-choice-guide", "中三选科与大学先修", "按开科、能力与课程要求安排备选"),
  sNew: guide("secondary-new-arrival-guide", "新来港中学入学与资格", "把入学、学生资助与大学资格分开"),
  sSelectTopic: topic("secondary-selection", "中学选校与家庭条件专题", "比较组别、语言、成本与支援"),
  sCurriculumTopic: topic("secondary-curriculum", "中学课程与升学专题", "理解成绩、课程路线与选科"),
  k1: guide("hk-kg-k1-application-roadmap-2027-28", "K1申请时间与注册安排", "按申请、面试、注册顺序准备"),
  interview: guide("hk-kg-interview-prep-guide-2027-28", "幼稚园面试怎样准备", "观察孩子的表达、互动与自理"),
  open: guide("kg-open-day-guide-2026", "幼稚园开放日看什么", "访校时把教学与接送问清楚"),
  audit: guide("hk-kg-k1-transparency-audit-2027-28", "五所幼稚园招生资料对照", "查看公开信息与待向校方确认事项"),
  pn: guide("n-class-guide", "PN与K1：怎样安排入学", "年龄、照顾需要与家庭开支"),
  english: guide("kg-english-guide", "幼稚园教学语言怎么选", "结合孩子现有语言与家庭支持"),
  aid: guide("kg-subsidy-guide", "幼稚园学费与资助", "分清教育计划、学费减免与津贴"),
  sponsors: guide("plk-skh-kg-comparison", "保良局与圣公会幼稚园", "比较办学背景、费用与升小安排"),
  mos: guide("ma-on-shan-kg-2026", "马鞍山幼稚园比较", "同区比较班制、语言与接送"),
  stcat: guide("stcat-interview", "国际英文幼稚园面试", "查看学校申请与面试准备重点"),
  p1: guide("hk-p1-admission-guide-2027", "小一入学流程与时间线", "分清自行分配、统一派位与校本申请"),
  score: guide("p1-scoring-guide", "小一自行分配计分", "逐项核对身份与计分条件"),
  net: guide("hk-school-net-diy-analysis", "小学校网怎么选", "把地址、选择范围与家庭条件放在一起"),
  nets: guide("school-net-41-vs-12", "41与12校网怎么比较", "比较学校结构、性别与升中路径"),
  net40: guide("net40-ranking", "深水埗40校网选校", "了解区内学校与不同收生途径"),
  psp: guide("psp-2026-guide", "怎样读懂小学概览", "看清校网、语言及升中关系"),
  through: guide("through-train-guide", "一条龙、直属与联系", "升中衔接的条件与外报后果"),
  knock: guide("knocking-letter-guide", "小一叩门与求位信", "按学校要求准备材料与表达匹配度"),
  primary: guide("breakout-schools-2026", "小学选校案例与比较", "把讨论热度还原成家庭选校问题"),
  offer: guide("secondary-dss-offer-guide", "直资中学offer怎样取舍", "签字前核对派位、注册与退出安排"),
  agencies: guide("hk-school-agency-red-flags", "择校服务怎样核查", "识别承诺、费用与资料来源"),
  trueLight: guide("true-light-primary-search", "大坑与九龙真光先分清", "用完整校名核对校址与升中关系"),
  skhNames: guide("skh-same-name-schools", "圣公会同名小学辨别", "分清校址、校网与不同办学安排"),
  luiNames: guide("lui-ming-choi-5-schools", "五所吕明才小学辨别", "同名学校的地区与升中安排不同"),
  feesTopic: topic("kindergarten-fees-support", "幼稚园费用与照顾专题", "按预算、班制与照顾需要继续阅读"),
  kSelectTopic: topic("kindergarten-selection", "幼稚园选校与比较专题", "按地区与学校特点缩小选择"),
  kApplyTopic: topic("kindergarten-admission", "幼稚园申请与面试专题", "从访校到申请、面试与注册"),
  pApplyTopic: topic("primary-admission", "小一申请与叩门专题", "按当前申请阶段继续阅读"),
  pNetTopic: topic("primary-school-net", "校网与派位专题", "按地区与派位问题继续阅读"),
  pSchoolsTopic: topic("primary-school-profiles", "小学比较与学校专题", "比较课程、入读与升中路径"),
  sApplyTopic: topic("secondary-admission", "升中申请与直资取舍专题", "按眼前的问题继续阅读"),
};

// Exact report IDs and campus URLs are reviewed editorially. Do not infer them
// from title keywords: St Catherine's, St Clare's and St Margaret's are different schools.
const reports = [...reportMeta.KG_REPORTS, ...reportMeta.PS_REPORTS, ...reportMeta.SS_REPORTS];
function report(code: string, label?: string, description = "教学、收生与升学资料"): BlogRelatedLink {
  const school = reports.find((row) => row.c === code);
  if (!school) throw new Error(`Unknown related report: ${code}`);
  return { label: label ?? school.n, href: `/reports/${code}`, description };
}
const profile = (slug: string, label: string, stage = "kindergarten"): BlogRelatedLink => ({ label, href: `/schools/${stage}/${slug}`, description: stage === "kindergarten" ? "核对该校区的班制、语言与收费资料" : "核对校址、办学类别与课程资料" });
const action = (href: string, label: string): BlogRelatedLink => ({ href, label });
const A = {
  kg: action("/schools/kindergarten/directory", "查看幼稚园名录"),
  primary: action("/schools/primary/directory", "查看小学名录"),
  secondary: action("/schools/secondary/directory", "查看中学名录"),
  all: action("/schools", "按学段查学校"),
  plan: action("/planning", "制定升学规划"),
  shortlist: action("/shortlist", "整理候选学校"),
  score: action("/tools/p1-discretionary", "核对自行分配计分"),
  net: action("/tools/p1-school-net", "查询小一校网"),
  simulator: action("/tools/p1-simulator", "试排小一派位志愿"),
};
function entry(stage: BlogRelatedConfig["stage"], focus: string, guides: BlogRelatedLink[], resources: BlogRelatedLink[], resourceTitle = "相关学校报告", actions?: BlogRelatedLink[]): BlogRelatedConfig {
  const stageName = { kindergarten: "幼稚园", primary: "小学", secondary: "升中", all: "跨学段" }[stage];
  const hasSchools = resources.some((link) => /^\/(reports|schools)\//.test(link.href));
  return {
    stage,
    eyebrow: `${stageName} · ${focus}`,
    summary: hasSchools ? "相关攻略 · 学校资料 · 选校入口" : "相关指南 · 专题阅读 · 选校入口",
    groups: [
      { id: "guides", title: `继续了解${stageName === "跨学段" ? "选校" : stageName}`, links: guides },
      { id: hasSchools ? "schools" : "topics", title: resourceTitle, links: resources },
      { id: "next-step", title: "开始选校", actions: true, links: actions ?? [A[stage === "kindergarten" ? "kg" : stage], action(`/planning${stage === "all" ? "" : `?stage=${stage}`}`, stage === "secondary" ? "制定升中规划" : "制定选校规划")] },
    ],
  };
}

// One reviewed selection per article; deliberately no same-stage first-N fallback.
// New articles must be added here and pass scripts/validate-blog-related-links.mjs.
export const BLOG_RELATED_LINKS: Record<string, BlogRelatedConfig> = {
  "kg-school-types-guide": entry("kindergarten", "办学类型 · 教育路线", [G.kHours, G.english], [G.aid, G.kResults], "从类型走向实际选择"),
  "kg-school-hours-care-guide": entry("kindergarten", "班制 · 家庭照顾", [G.pn, G.aid], [G.open, G.kTypes], "访校与第一轮筛选"),
  "kg-waitlist-transfer-guide": entry("kindergarten", "候补 · 转校与后备", [G.k1, G.kHours], [G.open, G.aid], "重新核对家庭安排"),
  "kg-primary-outcomes-guide": entry("kindergarten", "升小数据 · 家庭判断", [G.p1, G.kTypes], [report("yot-chan-cheng-yuk-yee-kg"), report("tak-sun-kg")], "有升小资料的学校实例"),
  "p1-offer-registration-guide": entry("primary", "offer · 注册与派位资格", [G.p1, G.pTypes], [G.through, G.pDaily], "接受前比较学校日常"),
  "primary-interview-guide": entry("primary", "小一面试 · 校本准备", [G.p1, G.pOffer], [G.pDaily, G.knock], "适配与后备安排"),
  "primary-transfer-guide": entry("primary", "插班 · 课程与适应", [G.pDaily, G.through], [G.psp, G.sTransfer], "核对学校与下一阶段", [A.primary, A.shortlist]),
  "primary-school-learning-guide": entry("primary", "课堂日常 · 家庭投入", [G.pTypes, G.pInterview], [G.psp, G.through], "把课程与升中分开核对"),
  "secondary-admission-guide": entry("secondary", "升中流程 · 家庭部署", [G.sSelf, G.sCentral], [G.offer, G.sBand], "申请前先判断与取舍"),
  "secondary-banding-guide": entry("secondary", "学生组别 · 学校定位", [G.sResults, G.sLanguage], [G.sSelf, G.sCentral], "从定位落实申请"),
  "secondary-language-guide": entry("secondary", "教学语言 · 学习衔接", [G.sCurriculum, G.sBand], [G.sTransfer, G.sNew], "转校与来港家庭"),
  "secondary-discretionary-guide": entry("secondary", "自行两校 · 材料与面试", [G.sOverview, G.sBand], [G.offer, G.sCentral], "两校以外的后备路线"),
  "secondary-central-allocation-guide": entry("secondary", "统一派位 · 志愿次序", [G.sOverview, G.sBand], [G.through, G.sTransfer], "关系学额与派位后行动"),
  "secondary-school-cost-guide": entry("secondary", "家庭预算 · 费用支援", [G.sCurriculum, G.offer], [G.sNew, G.sSelectTopic], "资格与选校继续阅读"),
  "secondary-results-guide": entry("secondary", "成绩与去向 · 统计口径", [G.sBand, G.sCurriculum], [G.sSubject, G.sCurriculumTopic], "从成绩读法到选科"),
  "secondary-curriculum-pathways-guide": entry("secondary", "课程路线 · 中文与转轨", [G.sResults, G.sLanguage], [G.sSubject, G.sCost], "选科与家庭预算"),
  "secondary-transfer-guide": entry("secondary", "叩门插班 · 年级衔接", [G.sLanguage, G.sCurriculum], [G.sSubject, G.sNew], "高中与来港资格核对", [A.secondary, A.shortlist]),
  "secondary-subject-choice-guide": entry("secondary", "中三选科 · 大学先修", [G.sCurriculum, G.sResults], [G.sLanguage, G.sTransfer], "语言与跨校衔接"),
  "secondary-new-arrival-guide": entry("secondary", "来港入学 · 资格与支援", [G.sOverview, G.sTransfer], [G.sLanguage, G.sCost], "语言适应与家庭开支"),
  "secondary-dss-offer-guide": entry("secondary", "申请 · 学校比较", [G.through, G.sApplyTopic], [report("dgs-secondary", "拔萃女書院", "课程、收生与家庭适配"), report("stewards-pooi-kei-secondary", "香港神託會培基書院", "教学、升学与入读取舍")], "文中学校报告"),
  "true-light-primary-search": entry("primary", "同名辨别 · 升中路径", [G.through, G.psp], [report("tlps"), report("ktl")], "两所真光小学"),
  "munsang-kg-search": entry("kindergarten", "民生 · 幼小衔接", [G.k1, G.english], [report("munsang"), report("munsangps")], "民生幼稚园与小学"),
  "soka-kg-search": entry("kindergarten", "创价 · 访校与申请", [G.open, G.interview], [report("soka"), G.kApplyTopic], "学校报告与申请专题"),
  "gt-primary-guide": entry("primary", "优才 · 课程与升学", [G.through, G.p1], [report("gt"), G.pSchoolsTopic], "优才报告与同类比较"),
  "skh-same-name-schools": entry("primary", "同名辨别 · 校网", [G.luiNames, G.psp], [report("skhlsks"), report("skhttlsks")], "文中李兆强系小学"),
  "psp-2026-guide": entry("primary", "官方资料 · 选校", [G.net, G.through], [G.pNetTopic, G.pSchoolsTopic], "按问题继续阅读", [A.primary, A.net]),
  "lui-ming-choi-5-schools": entry("primary", "同名辨别 · 升中", [G.skhNames, G.through], [report("lmc"), report("skhlmc")], "文中沙田两所吕明才"),
  "pooi-to-kg": entry("kindergarten", "培道 · 幼小衔接", [G.k1, G.english], [report("pt", "香港培道小學（幼稚园部）"), report("py2")], "培道幼稚园与小学"),
  "skh-kg": entry("kindergarten", "圣公会 · 申请与选择", [G.interview, G.sponsors], [report("skh"), G.kApplyTopic], "学校报告与申请专题"),
  "lh-kg": entry("kindergarten", "学之园 · 语言与费用", [G.english, G.aid], [report("lh-sf"), report("lh-hp")], "学之园两校区报告"),
  "spcps-primary": entry("primary", "圣保罗男女 · 小一申请", [G.p1, G.through], [report("spccps"), report("spcc-secondary")], "小学与对应中学报告"),
  "ling-liang-kg-search-2026": entry("kindergarten", "灵粮堂 · 校区辨别", [G.open, G.english], [report("llc"), G.mos], "学校报告与地区比较"),
  "hk-school-agency-red-flags": entry("all", "择校服务 · 资料核查", [G.psp, G.audit], [G.pApplyTopic, G.kApplyTopic], "自己核对申请流程", [A.all, A.plan]),
  "hk-school-net-diy-analysis": entry("primary", "校网 · 家庭取舍", [G.nets, G.score], [G.psp, G.pNetTopic], "读懂学校与派位资料", [A.net, A.simulator]),
  "kg-open-day-guide-2026": entry("kindergarten", "访校 · 比较与申请", [G.english, G.kHours], [G.k1, G.kTypes], "访校前后继续阅读"),
  "hk-kg-k1-transparency-audit-2027-28": entry("kindergarten", "招生资料 · 对照核查", [G.k1, G.interview], [report("munsang"), report("soka")], "审计涉及学校报告"),
  "hk-kg-k1-application-roadmap-2027-28": entry("kindergarten", "申请 · 面试与注册", [G.interview, G.kWait], [G.audit, G.aid], "申请前补齐信息"),
  "hk-kg-interview-prep-guide-2027-28": entry("kindergarten", "面试 · 家庭准备", [G.k1, G.open], [G.stcat, G.kWait], "校本面试与申请专题"),
  "ma-on-shan-kg-2026": entry("kindergarten", "马鞍山 · 同区比较", [G.english, G.aid], [report("st-hilarys-kg"), profile("think-international-kindergarten-ma-on-shan-533360", "朗思国际幼稚园（马鞍山）")], "文中学校与校区资料"),
  "hy-kg-search-2026": entry("kindergarten", "协恩 · 升小取舍", [G.k1, G.sponsors], [report("hy"), report("hyps")], "幼稚园与小学分别看"),
  "hk-p1-admission-guide-2027": entry("primary", "小一申请 · 派位", [G.score, G.net], [G.pOffer, G.knock], "申请下一步", [A.score, A.net]),
  "school-net-41-vs-12": entry("primary", "校网比较 · 升中路径", [G.net, G.psp], [report("lsps"), report("sjps")], "文中两校网学校示例", [A.net, A.simulator]),
  "plk-skh-kg-comparison": entry("kindergarten", "办学团体 · 幼小衔接", [G.aid, G.open], [report("plk-tam-au-yeung-siu-fong"), report("skh")], "两类学校的具体示例"),
  "n-class-guide": entry("kindergarten", "PN · 入学与照顾", [G.kHours, G.aid], [G.k1, G.open], "照顾需要与选校"),
  "kg-english-guide": entry("kindergarten", "教学语言 · 家庭支持", [G.open, G.kResults], [report("lh"), report("stcat")], "语言环境学校示例"),
  "eduhk-jcps-guide": entry("primary", "教大赛马会 · 课程", [G.psp, G.net], [report("edujcps"), G.pSchoolsTopic], "学校报告与同类比较"),
  "good-hope-primary-guide": entry("primary", "德望 · 费用与升学", [G.through, G.p1], [report("ghps"), report("good-hope-secondary")], "德望小学与中学"),
  "kg-subsidy-guide": entry("kindergarten", "学费 · 资助与照顾", [G.kHours, G.pn], [G.kTypes, G.k1], "预算与访校继续阅读"),
  "rainstorm-class-guide": entry("all", "天气 · 上学安排", [G.pn, G.open], [G.kApplyTopic, G.pApplyTopic], "照顾与开学准备", [A.all, A.shortlist]),
  "st-margaret-kg": entry("kindergarten", "圣玛加利大 · 访校", [G.k1, G.open], [report("smm"), G.english], "学校报告与语言选择"),
  "p1-scoring-guide": entry("primary", "自行分配 · 计分", [G.p1, G.net], [G.psp, G.pApplyTopic], "计分以外还要看什么", [A.score, A.primary]),
  "st-margaret-primary": entry("primary", "圣玛加利 · 课程与升学", [G.through, G.p1], [profile("st-margaret-s-co-educational-english-secondary-and-primary-school-542105", "圣玛加利男女英文中小学", "primary"), G.pSchoolsTopic], "该校资料与小学比较"),
  "net40-ranking": entry("primary", "40校网 · 地区选择", [G.net, G.score], [report("skhkfp"), report("cccwhcsw")], "文中40校网学校示例", [A.net, A.simulator]),
  "funful-kg": entry("kindergarten", "海滨方方乐趣 · 班制", [G.pn, G.english], [profile("riviera-funful-kindergarten-565105", "海滨方方乐趣幼稚园"), G.aid], "该校资料与费用规划"),
  "wellcome-kg": entry("kindergarten", "宏广 · 语言与费用", [G.english, G.pn], [profile("wellcome-international-kindergarten-590401", "宏广国际幼稚园"), G.aid], "该校资料与费用规划"),
  "zenith-kg": entry("kindergarten", "英艺 · 校区与费用", [G.english, G.aid], [profile("zenith-kindergarten-shatin-593680", "英艺幼稚园（沙田）"), profile("zenith-kindergarten-siu-hong-624829", "英艺幼稚园（兆康）")], "文中校区分别核对"),
  "cheungchau-kg": entry("kindergarten", "长洲 · 照顾与通勤", [G.pn, G.aid], [profile("cheung-chau-sacred-heart-kindergarten-152978", "长洲圣心幼稚园"), profile("the-church-of-christ-in-china-cheung-chau-church-kam-kong-kindergarten-151424", "中华基督教会长洲堂锦江幼稚园")], "文中长洲学校资料"),
  "hyps-primary": entry("primary", "协恩 · 升中安排", [G.through, G.score], [report("hyps"), report("heep-yunn-secondary")], "小学与对应中学报告"),
  "dgs-primary": entry("primary", "女拔 · 小一申请", [G.p1, G.knock], [report("dgjs"), report("dgs-secondary", "拔萃女書院")], "女拔小学与中学"),
  "lht-primary": entry("primary", "陆庆涛 · 课程与升学", [G.through, G.p1], [report("plklht"), G.pSchoolsTopic], "学校报告与同类比较"),
  "delia-primary": entry("primary", "地利亚 · 语言与收生", [G.p1, G.psp], [profile("delia-english-primary-school-and-kindergarten-216208", "地利亚英文小学暨幼稚园", "primary"), G.pSchoolsTopic], "该校资料与小学比较"),
  "mulberry-kg": entry("kindergarten", "懋柏礼 · 校区辨别", [G.english, G.open], [profile("mulberry-house-international-kindergarten-601721", "懋柏礼国际幼稚园"), G.aid], "该校资料与费用规划"),
  "plk-camoes-primary": entry("primary", "陈守仁 · 语言与申请", [G.p1, G.knock], [report("tsl"), G.through], "学校报告与升中安排"),
  "hkuga-primary": entry("primary", "港大同学会 · 升学路径", [G.through, G.p1], [report("hkups"), G.pSchoolsTopic], "学校报告与同类比较"),
  "st-joseph-primary": entry("primary", "圣若瑟 · 校网与升中", [G.score, G.nets], [report("sjps"), profile("st-joseph-s-college-510459", "圣若瑟书院", "secondary")], "小学报告与对应中学资料"),
  "knocking-letter-guide": entry("primary", "叩门 · 材料与取舍", [G.p1, G.pInterview], [G.pOffer, G.pTransfer], "申请与备选学校", [A.primary, A.shortlist]),
  "talent-scheme-school-guide": entry("all", "来港插班 · 语言衔接", [G.psp, G.knock], [G.pSchoolsTopic, G.english], "小学选择与语言准备", [A.all, A.plan]),
  "trending-kindergartens-2026": entry("kindergarten", "学校比较 · 升小选择", [G.open, G.english], [report("munsang"), report("canaan-klt")], "文中学校报告"),
  "breakout-schools-2026": entry("primary", "学校比较 · 家庭适配", [G.net, G.through], [report("hkups"), report("tsl")], "文中学校报告"),
  "primary-rankings-2026": entry("primary", "评价标准 · 学校比较", [G.through, G.psp], [G.pSchoolsTopic, G.net], "从排名回到家庭选择"),
  "stcat-interview": entry("kindergarten", "国际英文 · 面试准备", [G.interview, G.k1], [report("stcat"), G.audit], "学校报告与招生资料核查"),
  "through-train-guide": entry("primary", "升中衔接 · 制度取舍", [G.offer, G.psp], [report("spccps"), report("spcc-secondary")], "文中衔接学校示例", [A.primary, A.secondary]),
  "school-types-guide": entry("primary", "办学类别 · 入读方式", [G.p1, G.pOffer], [G.pDaily, G.through], "按学校与地区继续比较"),
  "hot-schools-2026-07": entry("primary", "苏浙与王锦辉 · 比较", [G.through, G.p1], [report("kcps"), report("wkf")], "文中两校报告"),
};

// Weather closures apply differently to the three stages. There is no second
// weather article yet, so show relevant school contacts instead of unrelated reads.
BLOG_RELATED_LINKS["rainstorm-class-guide"] = {
  stage: "all",
  eyebrow: "天气与停课 · 学校联络",
  summary: "各学段学校资料 · 接送与照顾",
  groups: [
    { id: "schools", title: "查学校联络与班制", links: [
      { ...A.kg, description: "核对班制与校方联络资料" },
      { ...A.primary, description: "查询学校资料与联络方式" },
      { ...A.secondary, description: "查询学校资料与联络方式" },
    ] },
    { id: "next-step", title: "整理家庭安排", actions: true, links: [A.shortlist, A.plan] },
  ],
};

// Preserve the approved pilot wording exactly.
BLOG_RELATED_LINKS["secondary-dss-offer-guide"].eyebrow = "升中申请 · 学校比较";
BLOG_RELATED_LINKS["secondary-dss-offer-guide"].summary = "相关攻略 · 学校报告 · 选校入口";
export function blogRelatedLinks(slug: string): BlogRelatedConfig | undefined {
  return BLOG_RELATED_LINKS[slug];
}
