import { L, localeHref, type Locale } from "@/lib/i18n";
import type { SchoolStage } from "@/lib/school-directory-pilot";
import { coreGuidesForStage } from "@/lib/core-guides";
import styles from "./SchoolDirectoryGuides.module.css";

type GuideLink = { label: string; href: string; year?: string };
type GuideGroup = { title: string; links: GuideLink[] };

// Curated links to existing articles and topic pages; keep labels tied to each destination's scope.
const KINDERGARTEN_GUIDES: GuideGroup[] = [
  { title: "先看怎样选", links: [
    { label: "私立、非牟利与国际怎样分", href: "/blog/kg-school-types-guide" },
    { label: "半日、全日与照顾安排", href: "/blog/kg-school-hours-care-guide" },
    { label: "N班要读吗", href: "/blog/n-class-guide" },
  ] },
  { title: "申请与后备", links: [
    { label: "K1报名、注册与候补", href: "/blog/hk-kg-k1-application-roadmap-2027-28", year: "2027/28" },
    { label: "K1面试与家庭准备", href: "/blog/hk-kg-interview-prep-guide-2027-28" },
    { label: "没有offer、转校与停办后备", href: "/blog/kg-waitlist-transfer-guide" },
  ] },
  { title: "语言、费用与升小", links: [
    { label: "粤语、普通话与英语怎样看", href: "/blog/kg-english-guide" },
    { label: "实际花费、资助与家庭预算", href: "/blog/kg-subsidy-guide" },
    { label: "升小成绩与考小成果怎样读", href: "/blog/kg-primary-outcomes-guide" },
  ] },
];
const PRIMARY_GUIDES: GuideGroup[] = [
  { title: "先看怎样选", links: [
    { label: "官津、直资与私立取舍", href: "/blog/school-types-guide" },
    { label: "校网、地址与当届学额", href: "/blog/hk-school-net-diy-analysis" },
    { label: "语言、功课与测考节奏", href: "/blog/primary-school-learning-guide" },
  ] },
  { title: "准备小一申请", links: [
    { label: "小一申请与派位流程", href: "/blog/hk-p1-admission-guide-2027", year: "2027/28" },
    { label: "自行分配怎样计分", href: "/blog/p1-scoring-guide" },
    { label: "多个offer、注册与派位资格", href: "/blog/p1-offer-registration-guide" },
  ] },
  { title: "面试、后备与升中", links: [
    { label: "直资、私立小一面试准备", href: "/blog/primary-interview-guide" },
    { label: "叩门、求位信与候补", href: "/blog/knocking-letter-guide" },
    { label: "一条龙、直属与联系", href: "/blog/through-train-guide" },
  ] },
];
const SECONDARY_GUIDES: GuideGroup[] = [
  { title: "先看怎样选", links: [
    { label: "孩子组别与学校Banding", href: "/blog/secondary-banding-guide" },
    { label: "英中、中中与逐科教学语言", href: "/blog/secondary-language-guide" },
    { label: "DSE成绩与升学比例怎样读", href: "/blog/secondary-results-guide" },
  ] },
  { title: "准备升中申请", links: [
    { label: "升中申请全流程", href: "/blog/secondary-admission-guide", year: "2027/28" },
    { label: "中一自行两校与面试", href: "/blog/secondary-discretionary-guide" },
    { label: "直资offer与官津派位取舍", href: "/blog/secondary-dss-offer-guide" },
  ] },
  { title: "课程、成本与派位", links: [
    { label: "DSE、IB与A-Level取舍", href: "/blog/secondary-curriculum-pathways-guide" },
    { label: "六年费用、奖学金与减免", href: "/blog/secondary-school-cost-guide" },
    { label: "统一派位甲乙部与志愿", href: "/blog/secondary-central-allocation-guide" },
  ] },
];

const GUIDES: Record<SchoolStage, { label: string; summary: string; description: string; groups: GuideGroup[] }> = {
  kindergarten: { label: "幼稚園", summary: "選校 · 申請 · 費用與升小", description: "從選校、申請到升小，按需要閱讀。", groups: KINDERGARTEN_GUIDES },
  primary: { label: "小學", summary: "選校 · 小一申請 · 校網與升中", description: "從校網、小一申請到升中銜接，按需要閱讀。", groups: PRIMARY_GUIDES },
  secondary: { label: "中學", summary: "選校 · 升中準備 · 課程路線", description: "先看升中資料，再比較課程與候選學校。", groups: SECONDARY_GUIDES },
};

function GuideLinks({ locale, stage }: { locale: Locale; stage: SchoolStage }) {
  const config = GUIDES[stage];
  const ready = new Set(coreGuidesForStage(stage).map((guide) => `/blog/${guide.slug}`));
  return <>
    <nav aria-label={L(`${config.label}擇校攻略`, locale)}>
      {config.groups.map((group, index) => <section className={styles.group} key={group.title}>
        <h3><span className={styles.groupNumber} aria-hidden="true">0{index + 1}</span>{L(group.title, locale)}</h3>
        <ul>{group.links.filter((link) => ready.has(link.href)).map((link) => <li key={link.href}>
          <a href={localeHref(link.href, locale)}>
            <span>{L(link.label, locale)}{link.year && <small>{link.year} {L("學年", locale)}</small>}</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
        </li>)}</ul>
      </section>)}
    </nav>
    <a className={styles.reportLink} href={localeHref(`/schools/${stage}#guides`, locale)}>
      {L(`查看全部${coreGuidesForStage(stage).length}篇核心指南`, locale)} <span aria-hidden="true">→</span>
    </a>
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
