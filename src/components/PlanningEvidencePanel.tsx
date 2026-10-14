import { L, type Locale } from "@/lib/i18n";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

type EvidenceStatus = "verified" | "school-check" | "research";

type EvidenceItem = {
  id: string;
  kind: "制度事实" | "公开要求" | "资料边界";
  title: string;
  scope: string;
  status: EvidenceStatus;
  href?: string;
  verifiedOn?: string;
};

const STAGE_SOURCES: Record<PlanningStage, EvidenceItem[]> = {
  kindergarten: [
    { id: "kg-admission", kind: "制度事实", title: "K1 收生安排与注册文件", scope: "教育局公布的年度收生安排、RC／AP及中央注册节点。", status: "verified", href: "https://www.edb.gov.hk/en/edu-system/preprimary-kindergarten/kindergarten-k1-admission-arrangements/front.html", verifiedOn: "2026-10-09" },
    { id: "kg-scheme", kind: "制度事实", title: "幼稚園教育計劃", scope: "用来核对参加计划资格、班别和费用边界，不等于所有家庭费用全免。", status: "verified", href: "https://www.edb.gov.hk/en/edu-system/preprimary-kindergarten/free-quality-kg-edu/index.html", verifiedOn: "2026-10-09" },
    { id: "kg-school", kind: "公开要求", title: "目标学校校本申请资料", scope: "申请截止、面见、班别、收费和支援必须逐校查当年度公告。", status: "school-check" },
  ],
  "primary-one": [
    { id: "poa-overview", kind: "制度事实", title: "小一入学统筹办法（POA）", scope: "先分清自行分配、统一派位、校网和不参加 POA 的学校。", status: "verified", href: "https://www.edb.gov.hk/en/edu-system/primary-secondary/spa-systems/primary-1-admission/index.html", verifiedOn: "2026-10-09" },
    { id: "poa-epoa", kind: "公开要求", title: "POA 电子平台与当届文件", scope: "账号、文件、申请窗口及选校操作必须按当届通知复核。", status: "verified", href: "https://epoa.edb.gov.hk/", verifiedOn: "2026-10-09" },
    { id: "poa-school", kind: "公开要求", title: "目标小学与校网资料", scope: "校网、性别、学额、联系关系和校本安排不能由热门度推断。", status: "school-check" },
  ],
  primary: [
    { id: "primary-curriculum", kind: "制度事实", title: "小学课程与评估资料", scope: "先区分教育局课程框架、学校实际安排和平台分析。", status: "research", href: "https://www.edb.gov.hk/tc/curriculum-development/major-level-of-edu/primary/curriculum-documents/Primary_Education_Curriculum_Guide.html", verifiedOn: "2026-10-09" },
    { id: "primary-school", kind: "公开要求", title: "目标小学公开资料", scope: "课程、語言、支援、升中安排和收费须逐校核对。", status: "school-check" },
    { id: "sspa-preview", kind: "制度事实", title: "中一派位制度入口", scope: "若开始规划升中，要把 SSPA、直资、私立和国际学校分开看。", status: "verified", href: "https://www.edb.gov.hk/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/index.html", verifiedOn: "2026-10-09" },
  ],
  secondary: [
    { id: "sspa-2027", kind: "制度事实", title: "中一派位（SSPA）当届入口", scope: "用于核对自行分配、统一派位、校网和当年度时间表。", status: "verified", href: "https://www.edb.gov.hk/en/edu-system/primary-secondary/spa-systems/secondary-spa/general-info/index.html", verifiedOn: "2026-10-09" },
    { id: "dse-official", kind: "制度事实", title: "HKDSE 官方资料", scope: "考试结构、科目和成绩解释须以考评局当届资料为准。", status: "verified", href: "https://www.hkeaa.edu.hk/en/hkdse/", verifiedOn: "2026-10-09" },
    { id: "secondary-school", kind: "公开要求", title: "学校课程与收生资料", scope: "实际开办的课程、科目、收生和升学出口目前仍需逐校建立资料。", status: "school-check" },
  ],
};

const ROUTE_SOURCES: Record<EducationRoute, EvidenceItem[]> = {
  dse: [
    { id: "dse-hkeaa", kind: "制度事实", title: "考评局 HKDSE 资料", scope: "用于核对考试、科目和成绩制度，不代表个人录取机会。", status: "verified", href: "https://www.hkeaa.edu.hk/en/hkdse/", verifiedOn: "2026-10-09" },
    { id: "dse-jupas", kind: "公开要求", title: "JUPAS 当届申请入口", scope: "课程要求、申请程序和截止日期需要逐年复核。", status: "verified", href: "https://www.jupas.edu.hk/", verifiedOn: "2026-10-09" },
  ],
  ib: [
    { id: "ib-framework", kind: "制度事实", title: "IB 官方课程框架", scope: "先分清 PYP、MYP、DP 和学校实际开办阶段。", status: "research", href: "https://www.ibo.org/programmes/", verifiedOn: "2026-10-09" },
    { id: "ib-school", kind: "公开要求", title: "学校 IB 课程与申请要求", scope: "是否开办、语言、评核、衔接和费用须逐校查证。", status: "school-check" },
  ],
  "a-level": [
    { id: "alevel-framework", kind: "制度事实", title: "国际考试资格框架", scope: "先分清 IGCSE、AS、A-Level 和学校实际提供的科目。", status: "research", href: "https://www.cambridgeinternational.org/programmes-and-qualifications/", verifiedOn: "2026-10-09" },
    { id: "alevel-school", kind: "公开要求", title: "学校 A-Level 课程与申请要求", scope: "科目、考试局、语言、费用和海外申请要求须逐校查证。", status: "school-check" },
  ],
};

const STATUS_LABELS: Record<EvidenceStatus, string> = {
  verified: "官方入口已核验",
  "school-check": "需要逐校核实",
  research: "研究底稿入口",
};

const KIND_STYLES: Record<EvidenceItem["kind"], string> = {
  制度事实: "bg-[var(--p-bg-green)] text-[var(--p-gray-900)]",
  公开要求: "bg-[var(--p-bg-yellow)] text-[var(--p-gray-900)]",
  资料边界: "bg-[var(--p-gray-50)] text-[var(--p-secondary)]",
};

function unique(items: EvidenceItem[]) {
  return items.filter((item, index) => items.findIndex((candidate) => candidate.id === item.id) === index);
}

export default function PlanningEvidencePanel({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const items = unique([
    ...(stage ? STAGE_SOURCES[stage] : []),
    ...(route ? ROUTE_SOURCES[route] : []),
  ]);

  if (items.length === 0) return null;

  const verifiedCount = items.filter((item) => item.status === "verified").length;

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-evidence-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">09 / {L("资料与核验", locale)}</p>
            <h2 id="planning-evidence-title" className="mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">{L("每个结论，先看它能由什么资料支持", locale)}</h2>
          </div>
          <span className="font-mono text-xs text-[var(--p-secondary)]">{L(`官方入口已核验 ${verifiedCount} / ${items.length}`, locale)}</span>
        </div>
        <p className="mt-3 max-w-[760px] text-sm leading-relaxed text-[var(--p-secondary)]">{L("这里把制度事实、公开要求和待核实事项分开。核验日期只代表入口曾被检查，不代表学校当年度资料已经完成核对。", locale)}</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`px-2 py-1 font-mono text-[10px] font-bold ${KIND_STYLES[item.kind]}`}>{L(item.kind, locale)}</span>
                <span className="font-mono text-[10px] text-[var(--p-secondary)]">{L(STATUS_LABELS[item.status], locale)}</span>
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{L(item.title, locale)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(item.scope, locale)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    data-analytics-event="planning_source_opened"
                    data-planning-source-id={item.id}
                    className="font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline"
                  >
                    {L("打开官方入口", locale)} ↗
                  </a>
                ) : (
                  <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">{L("待逐校核实", locale)}</span>
                )}
                {item.verifiedOn && <span className="font-mono text-[10px] text-[var(--p-secondary)]">{L("入口核验", locale)}：{item.verifiedOn}</span>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
