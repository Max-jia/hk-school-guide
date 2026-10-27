import { L, localeHref, type Locale } from "@/lib/i18n";
import type { SchoolStage } from "@/lib/school-directory-pilot";
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

const PRIMARY_GUIDES: GuideGroup[] = [
  {
    title: "先看怎樣選",
    links: [
      { label: "校網與地區選校專題", href: "/blog/topics/primary-school-net" },
      { label: "官津、直資與私立怎樣分", href: "/blog/school-types-guide" },
      { label: "小學專題與學校比較", href: "/blog/topics/primary-school-profiles" },
    ],
  },
  {
    title: "準備小一申請",
    links: [
      { label: "小一申請與派位流程", href: "/blog/hk-p1-admission-guide-2027", year: "2027/28" },
      { label: "自行分配學位怎樣計分", href: "/blog/p1-scoring-guide" },
      { label: "叩門、求位信與後備準備", href: "/blog/knocking-letter-guide" },
    ],
  },
  {
    title: "校網與升中銜接",
    links: [
      { label: "41 校網與 12 校網怎樣比較", href: "/blog/school-net-41-vs-12" },
      { label: "小學概覽的資料怎樣讀", href: "/blog/psp-2026-guide" },
      { label: "一條龍、直屬與聯繫的分別", href: "/blog/through-train-guide" },
    ],
  },
];

const SECONDARY_GUIDES: GuideGroup[] = [
  {
    title: "先看怎樣選",
    links: [
      { label: "中學選校入口與資料", href: "/schools/secondary" },
      { label: "一條龍、直屬與聯繫的分別", href: "/blog/through-train-guide" },
    ],
  },
  {
    title: "升中資料與準備",
    links: [
      { label: "中一派位與升學官方資料入口", href: "/planning?stage=secondary#planning-evidence-title" },
      { label: "按地區、課程與學費找候選學校", href: "/planning?stage=secondary#planning-secondary-samples-title" },
    ],
  },
  {
    title: "比較課程路線",
    links: [
      { label: "DSE、IB 與 A-Level 比較", href: "/planning?stage=secondary#planning-route-matrix-title" },
      { label: "各校課程與申請核對清單", href: "/planning?stage=secondary#planning-school-route-title" },
    ],
  },
];

const GUIDES: Record<SchoolStage, { label: string; summary: string; description: string; groups: GuideGroup[] }> = {
  kindergarten: { label: "幼稚園", summary: "選校 · 申請 · 費用與升小", description: "從選校、申請到升小，按需要閱讀。", groups: KINDERGARTEN_GUIDES },
  primary: { label: "小學", summary: "選校 · 小一申請 · 校網與升中", description: "從校網、小一申請到升中銜接，按需要閱讀。", groups: PRIMARY_GUIDES },
  secondary: { label: "中學", summary: "選校 · 升中準備 · 課程路線", description: "先看升中資料，再比較課程與候選學校。", groups: SECONDARY_GUIDES },
};

function GuideLinks({ locale, stage }: { locale: Locale; stage: SchoolStage }) {
  const config = GUIDES[stage];
  return <>
    <nav aria-label={L(`${config.label}擇校攻略`, locale)}>
      {config.groups.map((group, index) => <section className={styles.group} key={group.title}>
        <h3><span className={styles.groupNumber} aria-hidden="true">0{index + 1}</span>{L(group.title, locale)}</h3>
        <ul>{group.links.map((link) => <li key={link.href}>
          <a href={localeHref(link.href, locale)}>
            <span>{L(link.label, locale)}{link.year && <small>{link.year} {L("學年", locale)}</small>}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </li>)}</ul>
      </section>)}
    </nav>
    <a className={styles.reportLink} href={localeHref(`/schools/${stage}/directory?report=1`, locale)}>
      {L(`查看有深度報告的${config.label}`, locale)} <span aria-hidden="true">→</span>
    </a>
  </>;
}

export default function SchoolDirectoryGuides({ locale, stage = "kindergarten", compact = false }: { locale: Locale; stage?: SchoolStage; compact?: boolean }) {
  const config = GUIDES[stage];
  const title = `${config.label}擇校指南`;
  return <aside className={`${styles.guides} ${compact ? styles.compactGuides : styles.desktopGuides}`} aria-label={L(title, locale)}>
    {compact ? <><h2 className="sr-only">{L(title, locale)}</h2><details className={styles.compact}>
      <summary><span>{L(title, locale)}<small>{L(config.summary, locale)}</small></span><span className={styles.chevron} aria-hidden="true">⌄</span></summary>
      <div className={styles.compactContent}><GuideLinks locale={locale} stage={stage} /></div>
    </details></> : <>
      <header className={styles.heading}>
        <h2>{L(title, locale)}</h2>
        <p>{L(config.description, locale)}</p>
      </header>
      <GuideLinks locale={locale} stage={stage} />
    </>}
  </aside>;
}
