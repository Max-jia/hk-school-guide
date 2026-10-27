import { L, localeHref, type Locale } from "@/lib/i18n";
import type { BlogRelatedConfig } from "@/lib/blog-related-links";
import styles from "./BlogRelatedLinks.module.css";

type Props = {
  slug: string;
  locale: Locale;
  config: BlogRelatedConfig;
  compact?: boolean;
};

export default function BlogRelatedLinks({ slug, locale, config, compact = false }: Props) {
  const placement = compact ? "mobile" : "desktop";
  const headingId = `blog-related-${placement}-heading`;
  const links = <div data-blog-related-content data-blog-related-for={slug} data-blog-related-placement={placement}>
    <nav className={styles.groups} aria-label={L("与本文相关的阅读和选校入口", locale)}>
      {config.groups.map((group, groupIndex) => <section className={styles.group} key={group.id}>
        <h3 className={styles.groupTitle}><span className={styles.number} aria-hidden="true">0{groupIndex + 1}</span>{L(group.title, locale)}</h3>
        <ul className={`${styles.list} ${group.actions ? styles.actions : ""}`}>
          {group.links.map((link, index) => <li key={link.href}>
            <a
              href={localeHref(link.href, locale)}
              className={`${styles.link} ${group.actions ? `${styles.action} ${index === 0 ? styles.primaryAction : ""}` : ""}`}
              data-blog-related-target={link.href}
              data-blog-related-group={group.id}
              data-blog-related-position={index + 1}
            >
              <span><span className={styles.label}>{L(link.label, locale)}</span>{link.description && <span className={styles.description}>{L(link.description, locale)}</span>}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          </li>)}
        </ul>
      </section>)}
    </nav>
  </div>;

  if (compact) return <aside className={`${styles.panel} ${styles.mobile}`} aria-labelledby={headingId}>
    <h2 id={headingId} className={styles.screenReaderTitle}>{L("继续阅读与选校", locale)}</h2>
    <details className={styles.compact}>
      <summary><span>{L("继续阅读", locale)}<small>{L(config.summary, locale)}</small></span><span className={styles.chevron} aria-hidden="true">⌄</span></summary>
      {links}
    </details>
  </aside>;

  return <aside className={`${styles.panel} ${styles.desktop}`} aria-labelledby={headingId}>
    <header className={styles.heading}>
      <p className={styles.eyebrow}>{L(config.eyebrow, locale)}</p>
      <h2 id={headingId} className={styles.title}>{L("继续阅读", locale)}</h2>
    </header>
    {links}
  </aside>;
}
