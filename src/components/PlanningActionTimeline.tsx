import { L, localeHref, type Locale } from "@/lib/i18n";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

type TimelineStep = {
  phase: string;
  title: string;
  description: string;
  href: string;
  action: string;
};

const STAGE_TIMELINES: Record<PlanningStage, TimelineStep[]> = {
  kindergarten: [
    { phase: "现在", title: "先把家庭条件列清楚", description: "校網、預算、語言和上學路程，先分清哪些是一定要有。", href: "/tools", action: "打开择校工具" },
    { phase: "下一步", title: "看幾所幼稚園報告", description: "先核對收生、學費和升小資料，再決定要不要深入了解。", href: "/reports", action: "查看幼稚園報告" },
    { phase: "之后", title: "留下值得再比較的學校", description: "先保留選擇，之後再逐間比較，不用一次作出最後決定。", href: "/shortlist", action: "打开候选清单" },
  ],
  "primary-one": [
    { phase: "现在", title: "先確認計分和資格", description: "把自行分配的計分項目逐項對一遍，先知道自己站在哪裡。", href: "/tools/p1-self-check", action: "检查自行分配资格" },
    { phase: "下一步", title: "分開看自行分配與統一派位", description: "校網、性別、甲部、乙部和志願次序，按制度分開處理。", href: "/tools/p1-discretionary", action: "打开自行分配决策台" },
    { phase: "之后", title: "再用模擬器整理志願", description: "把可接受、想試和保底選擇放在一起檢查，留意滑檔風險。", href: "/tools/p1-simulator", action: "打开统一派位模拟器" },
  ],
  primary: [
    { phase: "现在", title: "先把學校放在一起比較", description: "先看入學途徑、收費、校網和升中安排有甚麼不同。", href: "/compare", action: "开始学校对比" },
    { phase: "下一步", title: "再看有興趣的學校報告", description: "把公開資料、收生方式和需要留意的地方放在一起看。", href: "/reports", action: "查看学校报告" },
    { phase: "之后", title: "留下幾所候選學校", description: "把比較後仍然想看的學校留下，之後再逐間細看。", href: "/shortlist", action: "整理候选清单" },
  ],
  secondary: [
    { phase: "现在", title: "先比較 DSE、IB、A-Level", description: "先看三條路線的基本分別，再決定要深入哪一條。", href: "#planning-route-title", action: "比较三条路线" },
    { phase: "下一步", title: "先列出需要核實的資料", description: "中學學校資料正在建設，先記下課程、招生和升學出口要核對的問題。", href: "#planning-route-title", action: "查看路线资料" },
    { phase: "之后", title: "留下值得再看的學校", description: "先保留選擇，等資料齊一點再作取捨。", href: "/shortlist", action: "整理候选清单" },
  ],
};

const ROUTE_TIMELINES: Record<EducationRoute, TimelineStep[]> = {
  dse: [
    { phase: "现在", title: "先把 DSE 和 JUPAS 的關係看清楚", description: "先了解考試、選科和本地及海外升學出口怎樣接起來。", href: "#planning-route-title", action: "查看 DSE 资料" },
    { phase: "下一步", title: "找幾所學校核對課程", description: "再看學校的課程、升中安排和公開資料，不只看路線名稱。", href: "/reports", action: "查看学校报告" },
    { phase: "之后", title: "留下想深入看的學校", description: "把有興趣的學校先放進候選清單，之後再比較。", href: "/shortlist", action: "整理候选清单" },
  ],
  ib: [
    { phase: "现在", title: "先確認學校是否開辦 IB", description: "IB 不是每所學校都有，先確認課程和適用學段。", href: "/reports", action: "查看学校报告" },
    { phase: "下一步", title: "再看課程和評核方式", description: "核對學校實際怎樣安排課程、銜接和家庭配合成本。", href: "/compare", action: "开始学校对比" },
    { phase: "之后", title: "留下合適的學校", description: "先把候選學校留低，之後再比較學費和申請要求。", href: "/shortlist", action: "整理候选清单" },
  ],
  "a-level": [
    { phase: "现在", title: "先看學校提供哪些科目", description: "選科會影響之後的申請方向，先核對學校能提供甚麼。", href: "/reports", action: "查看学校报告" },
    { phase: "下一步", title: "對照目標地區要求", description: "再按想去的地方，檢查科目、成績和申請安排。", href: "#planning-route-title", action: "查看 A-Level 资料" },
    { phase: "之后", title: "留下仍然符合方向的學校", description: "把候選學校放進清單，之後再比較學費和申請要求。", href: "/shortlist", action: "整理候选清单" },
  ],
};

function analyticsEvent(href: string) {
  if (href.startsWith("/tools")) return "tool_opened_from_planning" as const;
  if (href === "/reports") return "report_opened_from_planning" as const;
  if (href === "/shortlist") return "shortlist_started" as const;
  return undefined;
}

export default function PlanningActionTimeline({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const steps = stage ? STAGE_TIMELINES[stage] : route ? ROUTE_TIMELINES[route] : [];
  if (steps.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="planning-timeline-title">
      <div className="border-t-2 border-[var(--p-fg)] pt-5">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">10 / {L("行动时间线", locale)}</p>
        <h2 id="planning-timeline-title" className="scroll-mt-20 mt-2 font-serif text-3xl font-bold text-[var(--p-fg)] md:text-4xl">
          {L("先做眼前的一步，不用一次决定全部", locale)}
        </h2>
        <p className="mt-3 max-w-[720px] text-sm leading-relaxed text-[var(--p-secondary)]">
          {L("这是按当前阶段整理的行动顺序，不是学校当年度申请日程。具体日期、资格和名额仍要以教育局及学校最新公告为准。", locale)}
        </p>
        <ol className="m-0 mt-6 grid list-none gap-0 border-y border-[var(--p-gray-300)] p-0 md:grid-cols-3 md:border-l">
          {steps.map((step) => {
            const event = analyticsEvent(step.href);
            return (
              <li key={step.phase} className="border-b border-[var(--p-gray-300)] px-4 py-5 last:border-b-0 md:border-b-0 md:border-r">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">{L(step.phase, locale)}</p>
                <h3 className="mt-3 font-serif text-xl font-bold leading-tight text-[var(--p-fg)]">{L(step.title, locale)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">{L(step.description, locale)}</p>
                <a
                  href={step.href.startsWith("#") ? step.href : localeHref(step.href, locale)}
                  data-analytics-event={event}
                  className="mt-5 inline-flex font-mono text-xs font-bold text-[var(--p-fg)] no-underline hover:underline"
                >
                  {L(step.action, locale)} →
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
