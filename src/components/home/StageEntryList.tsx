import Image from "next/image";
import { L, localeHref, type Locale } from "@/lib/i18n";

const ENTRIES = [
  { stage: "幼稚園择校", question: "校網、學費、語言，同升小安排", action: "开始阶段规划", href: "/planning?stage=kindergarten" },
  { stage: "小一自行分配", question: "校網、性別、學額和歷年派位結果", action: "看看自行分配", href: "/tools/p1-discretionary" },
  { stage: "小一統一派位", question: "甲部、乙部、志願次序和滑檔風險", action: "打开统一派位模拟器", href: "/tools/p1-simulator" },
  { stage: "小學階段", question: "比較學校，留下心儀選擇，準備升中", action: "比较学校", href: "/compare" },
  { stage: "中學路線", question: "先把 DSE、IB、A-Level 的分別看清楚", action: "先看路线", href: "/planning?stage=secondary" },
] as const;

export default function StageEntryList({ locale = "tc" }: { locale?: Locale }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="stage-entry-title">
      <div className="relative overflow-hidden border-t-2 border-[var(--p-fg)] pt-5">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block" aria-hidden="true">
          <Image
            src="/home/hk-campus-skyline.jpg"
            alt=""
            fill
            sizes="46vw"
            className="object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,248,241,0.98)_0%,rgba(250,248,241,0.64)_38%,rgba(250,248,241,0.14)_100%)]" />
        </div>
        <div className="relative grid gap-7 md:grid-cols-[0.75fr_1.25fr] md:gap-12">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
            01 / {L("按阶段深入", locale)}
          </p>
          <h2 id="stage-entry-title" className="mt-2 max-w-[360px] font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] md:text-4xl">
            {L("每个阶段，先处理什么", locale)}
          </h2>
          <p className="mt-4 max-w-[360px] text-sm leading-relaxed text-[var(--p-secondary)]">
            {L("不用一次决定十年后的事。先处理眼前的学校和申请安排，再看下一步。", locale)}
          </p>
        </div>
        <ol className="m-0 grid list-none gap-0 p-0 sm:grid-cols-2 sm:gap-x-7">
          {ENTRIES.map((entry, index) => (
            <li key={entry.stage} className="border-t border-[var(--p-gray-300)] py-4 first:border-t-0 sm:first:border-t sm:nth-[2]:border-t-0">
              <a href={localeHref(entry.href, locale)} className="group block no-underline">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold text-[var(--p-secondary)]">0{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-xl font-bold leading-tight text-[var(--p-fg)] group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">
                      {L(entry.stage, locale)}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-[var(--p-secondary)]">{L(entry.question, locale)}</span>
                    <span className="mt-3 block font-mono text-xs font-bold text-[var(--p-fg)]">{L(entry.action, locale)} →</span>
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  );
}
