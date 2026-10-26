import { L, localeHref, type Locale } from "@/lib/i18n";
import styles from "./SchoolDirectoryGuides.module.css";

type GuideLink = { label: string; href: string; year?: string };
type GuideGroup = { title: string; links: GuideLink[] };

// Curated links to existing articles and topic pages; keep labels tied to each destination's scope.
const KINDERGARTEN_GUIDES: GuideGroup[] = [
  {
    title: "先看怎樣選",
    links: [
      { label: "幼稚園比較與升小銜接", href: "/blog/topics/kindergarten-selection" },
      { label: "英語教學與語言環境怎樣看", href: "/blog/kg-english-guide" },
      { label: "N 班需要讀嗎？", href: "/blog/n-class-guide" },
    ],
  },
  {
    title: "準備申請",
    links: [
      { label: "K1 報名、註冊與候補流程", href: "/blog/hk-kg-k1-application-roadmap-2027-28", year: "2027/28" },
      { label: "面試前，孩子與家長怎樣準備", href: "/blog/hk-kg-interview-prep-guide-2027-28" },
      { label: "K1 申請與面試專題", href: "/blog/topics/kindergarten-admission" },
    ],
  },
  {
    title: "費用與升小準備",
    links: [
      { label: "學費減免與就學開支津貼", href: "/blog/kg-subsidy-guide", year: "2026/27" },
      { label: "幼稚園學費與資助預算專題", href: "/blog/topics/kindergarten-fees-support" },
      { label: "先了解小一派位與入學路線", href: "/blog/topics/primary-admission" },
    ],
  },
];

function GuideLinks({ locale }: { locale: Locale }) {
  return <>
    <nav aria-label={L("幼稚園擇校攻略", locale)}>
      {KINDERGARTEN_GUIDES.map((group, index) => <section className={styles.group} key={group.title}>
        <h3><span className={styles.groupNumber} aria-hidden="true">0{index + 1}</span>{L(group.title, locale)}</h3>
        <ul>{group.links.map((link) => <li key={link.href}>
          <a href={localeHref(link.href, locale)}>
            <span>{L(link.label, locale)}{link.year && <small>{link.year} {L("學年", locale)}</small>}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </li>)}</ul>
      </section>)}
    </nav>
    <a className={styles.reportLink} href={localeHref("/schools/kindergarten/directory?report=1", locale)}>
      {L("查看有深度報告的幼稚園", locale)} <span aria-hidden="true">→</span>
    </a>
  </>;
}

export default function SchoolDirectoryGuides({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  return <aside className={`${styles.guides} ${compact ? styles.compactGuides : styles.desktopGuides}`} aria-label={L("幼稚園擇校指南", locale)}>
    {compact ? <><h2 className="sr-only">{L("幼稚園擇校指南", locale)}</h2><details className={styles.compact}>
      <summary><span>{L("幼稚園擇校指南", locale)}<small>{L("選校 · 申請 · 費用與升小", locale)}</small></span><span className={styles.chevron} aria-hidden="true">⌄</span></summary>
      <div className={styles.compactContent}><GuideLinks locale={locale} /></div>
    </details></> : <>
      <header className={styles.heading}>
        <h2>{L("幼稚園擇校指南", locale)}</h2>
        <p>{L("從選校、申請到升小，按需要閱讀。", locale)}</p>
      </header>
      <GuideLinks locale={locale} />
    </>}
  </aside>;
}
