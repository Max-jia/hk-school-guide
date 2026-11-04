import { BLOG_CLUSTERS } from "@/lib/blog-clusters";
import { L, localeHref, type Locale } from "@/lib/i18n";

export default function BlogClusterCards({ locale }: { locale: Locale }) {
  return (
    <section className="mb-10" aria-labelledby="blog-clusters-heading">
      <div className="mb-4 border-b border-[var(--p-gray-300)] pb-3">
        <h2 id="blog-clusters-heading" className="m-0 font-serif text-2xl font-bold text-[var(--p-fg)]">
          {L("按择校问题看专题", locale)}
        </h2>
        <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">
          {L("初次了解制度，可先读幼稚园或小学的三篇系列；已有具体问题，可按申请、选校和费用查看专题。", locale)}
        </p>
      </div>
      <ul className="grid gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
        {BLOG_CLUSTERS.map((cluster) => (
          <li key={cluster.slug} className="list-none">
            <a href={localeHref(`/blog/topics/${cluster.slug}`, locale)} className="block h-full rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4 no-underline transition-colors hover:bg-[var(--p-bg-yellow)]">
              <h3 className="m-0 font-serif text-lg font-bold text-[var(--p-fg)]">{L(cluster.title, locale)}</h3>
              <p className="mb-0 mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--p-secondary)]">{L(cluster.description, locale)}</p>
              <span className="mt-3 inline-block text-sm font-bold text-[var(--p-fg)]">{L(cluster.kind === "series" ? "查看系列目录 · 3篇" : "打开专题", locale)} →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
