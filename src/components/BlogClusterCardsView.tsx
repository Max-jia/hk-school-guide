export type ClusterCardsData = {
  heading: string; description: string;
  items: { slug: string; title: string; description: string; href: string; label: string }[];
};

export default function BlogClusterCardsView({ heading, description, items }: ClusterCardsData) {
  return (
    <section className="mb-10" aria-labelledby="blog-clusters-heading">
      <div className="mb-4 border-b border-[var(--p-gray-300)] pb-3">
        <h2 id="blog-clusters-heading" className="m-0 font-serif text-2xl font-bold text-[var(--p-fg)]">
          {heading}
        </h2>
        <p className="mb-0 mt-2 text-sm leading-relaxed text-[var(--p-secondary)]">
          {description}
        </p>
      </div>
      <ul className="grid gap-3 p-0 md:grid-cols-2 xl:grid-cols-3">
        {items.map((cluster) => (
          <li key={cluster.slug} className="list-none">
            <a href={cluster.href} className="block h-full rounded-xl border border-[var(--p-gray-300)] bg-[var(--p-bg)] p-4 no-underline transition-colors hover:bg-[var(--p-bg-yellow)]">
              <h3 className="m-0 font-serif text-lg font-bold text-[var(--p-fg)]">{cluster.title}</h3>
              <p className="mb-0 mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--p-secondary)]">{cluster.description}</p>
              <span className="mt-3 inline-block text-sm font-bold text-[var(--p-fg)]">{cluster.label} →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
