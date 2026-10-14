import { L, localeHref, type Locale } from "@/lib/i18n";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

type ActionStep = {
  title: string;
  description: string;
  href: string;
  action: string;
};

const STAGE_STEPS: Record<PlanningStage, ActionStep[]> = {
  kindergarten: [
    { title: "先列出自己的條件", description: "校網、預算、語言和上學路程，先分清哪些是一定要有。", href: "/tools", action: "打开择校工具" },
    { title: "看幾所幼稚園報告", description: "先看收生、學費和升小資料，再決定要不要深入了解。", href: "/reports", action: "查看幼稚園報告" },
    { title: "留下想再比較的學校", description: "不用一次選定，先把看過的學校放進候選清單。", href: "/shortlist", action: "打开候选清单" },
  ],
  "primary-one": [
    { title: "先確認計分和資格", description: "把自行分配的計分項目逐項對一遍，先知道自己站在哪裡。", href: "/tools/p1-self-check", action: "检查自行分配资格" },
    { title: "再看自行分配選擇", description: "按校網、性別和學校條件，整理可考慮的學校。", href: "/tools/p1-discretionary", action: "打开自行分配决策台" },
    { title: "最後再排統一派位", description: "把甲部、乙部和志願次序分開看，不要把兩套規則混在一起。", href: "/tools/p1-simulator", action: "打开统一派位模拟器" },
  ],
  primary: [
    { title: "先把學校放在一起比較", description: "先看入學途徑、收費、校網和升中安排有甚麼不同。", href: "/compare", action: "开始学校对比" },
    { title: "再看有興趣的學校報告", description: "報告會把公開資料、收生方式和需要留意的地方放在一起。", href: "/reports", action: "查看学校报告" },
    { title: "留下幾所候選學校", description: "把比較後仍然想看的學校留下，之後再逐間細看。", href: "/shortlist", action: "整理候选清单" },
  ],
  secondary: [
    { title: "先比較三條高中路線", description: "先看 DSE、IB、A-Level 的基本分別，再決定要深入哪一條。", href: "#planning-route-title", action: "比较三条路线" },
    { title: "先列出需要核實的資料", description: "中學學校資料正在建設，先記下課程、招生和升學出口要核對的問題。", href: "#planning-route-title", action: "查看路线资料" },
    { title: "留下值得再看的學校", description: "先保留選擇，等資料齊一點再作取捨。", href: "/shortlist", action: "整理候选清单" },
  ],
};

const ROUTE_STEPS: Record<EducationRoute, ActionStep[]> = {
  dse: [
    { title: "先看 DSE 和 JUPAS 怎麼接", description: "先把考試和升學出口的基本關係看清楚。", href: "#planning-route-title", action: "查看 DSE 资料" },
    { title: "找幾所學校比較", description: "再看學校的課程、升中安排和公開資料。", href: "/reports", action: "查看学校报告" },
    { title: "留下想深入看的學校", description: "把有興趣的學校先放進候選清單。", href: "/shortlist", action: "整理候选清单" },
  ],
  ib: [
    { title: "先看學校有沒有開辦 IB", description: "IB 不是每所學校都有，先確認課程和學段。", href: "/reports", action: "查看学校报告" },
    { title: "再看課程和評核方式", description: "不要只看名稱，還要看學校實際怎樣安排。", href: "/compare", action: "开始学校对比" },
    { title: "留下合適的學校", description: "先把候選學校留低，之後再比較學費和申請要求。", href: "/shortlist", action: "整理候选清单" },
  ],
  "a-level": [
    { title: "先看學校提供哪些科目", description: "選科會影響之後的申請方向，先看學校能提供甚麼。", href: "/reports", action: "查看学校报告" },
    { title: "對照目標地區要求", description: "再按想去的地方，檢查科目和成績要求。", href: "#planning-route-title", action: "查看 A-Level 资料" },
    { title: "留下想深入看的學校", description: "把仍然符合方向的學校放進候選清單。", href: "/shortlist", action: "整理候选清单" },
  ],
};

export default function PlanningActionChecklist({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const steps = stage ? STAGE_STEPS[stage] : route ? ROUTE_STEPS[route] : [];

  if (steps.length === 0) {
    return (
      <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-actions-title">
        <div className="border-t-2 border-[var(--p-fg)] pt-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">06 / {L("下一步", locale)}</p>
          <h2 id="planning-actions-title" className="mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
            {L("先选阶段，再开始看资料", locale)}
          </h2>
          <p className="mt-3 max-w-[640px] text-sm leading-relaxed text-[var(--p-secondary)]">
            {L("先选孩子现在的阶段，或先选一条高中路线。选好之后，下面会列出比较适合的工具和资料。", locale)}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-actions-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">06 / {L("下一步", locale)}</p>
        <h2 id="planning-actions-title" className="mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
          {L("按这个次序做，会比较清楚", locale)}
        </h2>
        <ol className="m-0 mt-6 grid list-none gap-3 p-0 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title} className="border border-[var(--p-gray-300)] bg-[var(--p-card)] p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[var(--p-fg)] bg-[var(--p-green)] font-mono text-xs font-bold text-[var(--p-gray-900)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{L(step.title, locale)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(step.description, locale)}</p>
                </div>
              </div>
              <a
                href={step.href.startsWith("#") ? step.href : localeHref(step.href, locale)}
                data-analytics-event={step.href.startsWith("/tools") ? "tool_opened_from_planning" : step.href === "/shortlist" ? "shortlist_started" : undefined}
                className="mt-5 inline-flex font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline"
              >
                {L(step.action, locale)} →
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
