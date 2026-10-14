import Image from "next/image";
import { L, localeHref, type Locale } from "@/lib/i18n";

const ROUTES = [
  {
    label: "DSE",
    title: "香港常见的公开考试路线",
    description: "先了解 DSE、JUPAS，以及本地和海外升学选择。",
    href: "/planning?stage=secondary&route=dse",
    bg: "bg-[var(--p-bg-yellow)]",
  },
  {
    label: "IB",
    title: "国际课程路线",
    description: "先看课程内容、评核方式，以及学校有没有开办。",
    href: "/planning?stage=secondary&route=ib",
    bg: "bg-[var(--p-bg-purple)]",
  },
  {
    label: "A-Level",
    title: "科目组合与海外升学路线",
    description: "先比较选科组合、考试安排和目标地区的要求。",
    href: "/planning?stage=secondary&route=a-level",
    bg: "bg-[var(--p-bg-blue)]",
  },
] as const;

export default function CoreRouteCards({ locale = "tc" }: { locale?: Locale }) {
  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-14" aria-labelledby="core-route-title">
      <div className="relative border-t-2 border-[var(--p-fg)] pt-5">
        <div className="pointer-events-none absolute right-0 top-0 hidden h-36 w-[34%] overflow-hidden md:block" aria-hidden="true">
          <Image
            src="/home/hong-kong-school-building.jpg"
            alt=""
            fill
            sizes="34vw"
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0.4)_58%,rgba(255,255,255,0.08)_100%)]" />
        </div>
        <div className="relative z-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--p-secondary)]">
              02 / {L("主要升学方向", locale)}
            </p>
            <h2 id="core-route-title" className="mt-2 font-serif text-3xl font-bold leading-tight text-[var(--p-fg)] md:text-4xl">
            {L("DSE、IB、A-Level，放在一起比较", locale)}
            </h2>
          </div>
          <a href={localeHref("/planning?stage=secondary", locale)} className="font-mono text-sm font-bold text-[var(--p-fg)] no-underline hover:underline">
            {L("还没想好？先看三条路线 →", locale)}
          </a>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {ROUTES.map((route) => (
            <a
              key={route.label}
              href={localeHref(route.href, locale)}
              data-analytics-event="route_selected"
              data-planning-route={route.href.split("route=")[1]}
              className={`group block border-2 border-[var(--p-fg)] p-5 no-underline transition-transform duration-100 hover:-translate-y-1 md:p-6 ${route.bg}`}
            >
              <span className="font-mono text-sm font-bold text-[var(--p-gray-900)]">{route.label}</span>
              <h3 className="mt-8 font-serif text-2xl font-bold leading-tight text-[var(--p-gray-900)]">{L(route.title, locale)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--p-gray-700)]">{L(route.description, locale)}</p>
              <span className="mt-7 block font-mono text-xs font-bold text-[var(--p-gray-900)]">{L("查看路线", locale)} →</span>
            </a>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
