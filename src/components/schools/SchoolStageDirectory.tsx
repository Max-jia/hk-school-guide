"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { DIRECTORY_PAGE_SIZE, directoryPageCount, directoryPagePath } from "@/lib/school-directory-pagination";
import { emptySchoolStageFilters, readSchoolStageFilters, schoolStageFiltersQuery, type DirectorySchoolStage, type SchoolStageDirectoryFilters } from "@/lib/school-stage-directory";
import { updateDirectoryQuery, useDirectoryQuery } from "@/lib/use-directory-query";
import { readShortlist, shortlistId, writeShortlist } from "@/lib/shortlist";
import styles from "./KindergartenDirectory.module.css";

export type SchoolStageDirectorySource = { label: string; scope?: string; url: string };
export type SchoolStageDirectoryRow = {
  stage: DirectorySchoolStage;
  slug: string;
  name: string;
  nameEn: string;
  district: string;
  districts: string[];
  address: string;
  schoolNumber: string;
  schoolType: string;
  categories: string[];
  gender: string;
  religion: string;
  schoolNet: string;
  language: string;
  tuition: string;
  gradeSpan: string;
  sponsoringBody: string;
  dataYear: string;
  reviewedAt: string;
  sourceNote: string;
  website: string;
  reportSlugs: string[];
  sources: SchoolStageDirectorySource[];
};

type Change = (patch: Partial<SchoolStageDirectoryFilters>) => void;
type ChipFilterKey = "q" | "category" | "gender" | "religion" | "schoolNet" | "tuition";
type DirectoryColumnKey = "schoolNet" | "gender" | "religion" | "language" | "tuition";
const profilePath = (row: SchoolStageDirectoryRow) => `/schools/${row.stage}/${row.slug}`;
const display = (value: string | undefined) => value?.trim() || "資料未列";
const normalized = (value: string) => value.normalize("NFKC").toLocaleLowerCase().replace(/[\s()（）]/g, "");

function matchesDirectorySchool(school: SchoolStageDirectoryRow, filters: SchoolStageDirectoryFilters): boolean {
  const schoolDistricts = school.districts.length ? school.districts : [school.district];
  const needle = normalized(L(filters.q, "sc"));
  const searchFields = [school.name, school.nameEn, school.district, ...schoolDistricts, school.schoolNumber, school.address, ...(school.stage === "primary" ? [school.schoolNet] : [])];
  const haystack = normalized(L(searchFields.filter(Boolean).join(" "), "sc"));
  return (!needle || haystack.includes(needle)) &&
    (!filters.districts.length || filters.districts.some((district) => schoolDistricts.includes(district))) &&
    (!filters.category || school.categories.includes(filters.category)) &&
    (!filters.gender || display(school.gender) === filters.gender) &&
    (!filters.religion || display(school.religion) === filters.religion) &&
    (!filters.schoolNet || display(school.schoolNet) === filters.schoolNet) &&
    (!filters.tuition || tuitionState(school.tuition) === filters.tuition) &&
    (!filters.report || school.reportSlugs.length > 0);
}

function SelectField({ label, value, options, onChange, locale }: { label: string; value: string; options: [string, string][]; onChange: (value: string) => void; locale: Locale }) {
  return <label className={styles.field}>{L(label, locale)}<select value={value} onChange={(event) => onChange(event.target.value)}><option value="">{L("全部", locale)}</option>{options.map(([optionValue, name]) => <option key={optionValue} value={optionValue}>{L(name, locale)}</option>)}</select></label>;
}

function Districts({ districts, value, onChange, locale, mobile = false }: { districts: string[]; value: string[]; onChange: (value: string[]) => void; locale: Locale; mobile?: boolean }) {
  const choices = <div className={styles.districtPanel}>{districts.map((district) => <label className={styles.check} key={district}><input type="checkbox" checked={value.includes(district)} onChange={(event) => onChange(event.target.checked ? [...value, district] : value.filter((item) => item !== district))} />{L(district, locale)}</label>)}</div>;
  return mobile
    ? <fieldset><legend>{L("地區（可多選）", locale)}</legend>{choices}</fieldset>
    : <div className={styles.field}><span>{L("地區", locale)}</span><details className={styles.district}><summary>{L(value.length ? `已選 ${value.length} 區` : "全部地區", locale)}<ChevronDown size={15} aria-hidden="true" /></summary>{choices}</details></div>;
}

function MainFilters({ filters, onChange, districts, categories, genders, locale, mobile = false }: {
  filters: SchoolStageDirectoryFilters; onChange: Change; districts: string[]; categories: string[]; genders: string[]; locale: Locale; mobile?: boolean;
}) {
  return <>
    <Districts districts={districts} value={filters.districts} onChange={(value) => onChange({ districts: value })} locale={locale} mobile={mobile} />
    <SelectField label="學校類別" value={filters.category} options={categories.map((item) => [item, item])} onChange={(category) => onChange({ category })} locale={locale} />
    <SelectField label="學校性別" value={filters.gender} options={genders.map((item) => [item, item])} onChange={(gender) => onChange({ gender })} locale={locale} />
  </>;
}

function AdditionalFilters({ stage, filters, onChange, religions, schoolNets, locale }: {
  stage: DirectorySchoolStage; filters: SchoolStageDirectoryFilters; onChange: Change; religions: string[]; schoolNets: string[]; locale: Locale;
}) {
  return <div className={styles.advancedGrid}>
    <SelectField label="宗教背景" value={filters.religion} options={religions.map((item) => [item, item])} onChange={(religion) => onChange({ religion })} locale={locale} />
    {stage === "primary" && <SelectField label="校網" value={filters.schoolNet} options={schoolNets.map((item) => [item, item])} onChange={(schoolNet) => onChange({ schoolNet })} locale={locale} />}
    <SelectField label="收費資料" value={filters.tuition} options={[["free", "來源明示免學費／免費"], ["amount", "來源列有收費或資助說明"], ["unknown", "來源未列收費資料"]]} onChange={(tuition) => onChange({ tuition })} locale={locale} />
    <label className={styles.check}><input type="checkbox" checked={filters.report} onChange={(event) => onChange({ report: event.target.checked })} />{L("已有深度報告", locale)}</label>
  </div>;
}

function tuitionState(value: string): "free" | "amount" | "unknown" {
  if (!value || value.trim() === "-" || /資料未列|待確認|不適用/.test(value)) return "unknown";
  if (/免費|免學費|免繳學費/.test(value)) return "free";
  return "amount";
}

function rowFacts(row: SchoolStageDirectoryRow): [string, string][] {
  return [
    ["地區", row.district], ["辦學類別", row.schoolType], ...(row.stage === "primary" ? [["校網", row.schoolNet] as [string, string]] : []),
    ["學校性別", row.gender], ["宗教背景", row.religion], ["授課語言", row.language], ["學費／收費", row.tuition], ["授課年級", row.gradeSpan],
  ];
}

function Fact({ value, locale, compact = false }: { value: string; locale: Locale; compact?: boolean }) {
  const text = L(display(value), locale);
  return <span title={text} className={compact ? styles.compactFact : styles.factValue}>{text}</span>;
}

function SchoolDetails({ row, locale }: { row: SchoolStageDirectoryRow; locale: Locale }) {
  return <div className={styles.detailGrid}>
    <div className={styles.wide}><h3>{L("學校及聯絡資料", locale)}</h3><p>{L(row.nameEn, locale)}<br />{L(row.address, locale)}{row.schoolNumber ? ` · ${L("學校編號", locale)} ${row.schoolNumber}` : ""}</p>{row.sponsoringBody && <p>{L("辦學團體", locale)}：{L(row.sponsoringBody, locale)}</p>}{row.website && <a href={row.website} target="_blank" rel="noopener noreferrer">{L("學校網站", locale)} ↗</a>}</div>
    {rowFacts(row).slice(1).map(([label, value]) => <div key={label}><h3>{L(label, locale)}</h3><p>{L(value, locale)}</p></div>)}
    <div><h3>{L("資料年度", locale)}</h3><p>{L(display(row.dataYear), locale)}{row.reviewedAt ? ` · ${L("核對", locale)} ${row.reviewedAt}` : ""}</p></div>
    {row.sourceNote && <div><h3>{L("名錄資料說明", locale)}</h3><p>{L(row.sourceNote, locale)}</p></div>}
    {row.sources.length > 0 && <div className={styles.wide}><h3>{L("來源入口", locale)}</h3><ul className={styles.sourceList}>{row.sources.map((source) => <li key={`${source.url}-${source.label}`}><a href={source.url} target="_blank" rel="noopener noreferrer">{L(source.label, locale)} ↗</a>{source.scope && <span>{L(source.scope, locale)}</span>}</li>)}</ul></div>}
    <div className={styles.wide}><a href={localeHref(profilePath(row), locale)}>{L("查看完整學校資料與來源", locale)} →</a></div>
  </div>;
}

export default function SchoolStageDirectory({ schools, stage, locale, initialPage = 1 }: { schools: SchoolStageDirectoryRow[]; stage: DirectorySchoolStage; locale: Locale; initialPage?: number }) {
  const query = useDirectoryQuery();
  const filters = useMemo(() => readSchoolStageFilters(query, initialPage), [initialPage, query]);
  const [advanced, setAdvanced] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [savedMessage, setSavedMessage] = useState("");
  const [draft, setDraft] = useState(emptySchoolStageFilters(initialPage));
  const [columns, setColumns] = useState<Record<DirectoryColumnKey, boolean>>({ schoolNet: true, gender: true, religion: true, language: true, tuition: false });
  const filterDialog = useRef<HTMLDialogElement>(null);
  const compareDialog = useRef<HTMLDialogElement>(null);
  const resultToolbar = useRef<HTMLDivElement>(null);
  const resultTable = useRef<HTMLDivElement>(null);
  const districts = useMemo(() => [...new Set(schools.flatMap((school) => school.districts.length ? school.districts : [school.district]).filter(Boolean))].sort((a, b) => L(a, "sc").localeCompare(L(b, "sc"), "zh-Hans")), [schools]);
  const categories = useMemo(() => [...new Set(schools.flatMap((school) => school.categories))].sort((a, b) => a.localeCompare(b, "zh-Hant")), [schools]);
  const genders = useMemo(() => [...new Set(schools.map((school) => display(school.gender)))].sort((a, b) => a.localeCompare(b, "zh-Hant")), [schools]);
  const religions = useMemo(() => [...new Set(schools.map((school) => display(school.religion)))].sort((a, b) => a.localeCompare(b, "zh-Hant")), [schools]);
  const schoolNets = useMemo(() => [...new Set(schools.map((school) => display(school.schoolNet)))].sort((a, b) => a.localeCompare(b, "zh-Hant")), [schools]);
  const filtered = useMemo(() => {
    const result = schools.filter((school) => matchesDirectorySchool(school, filters));
    if (filters.sort === "name" || filters.sort === "name-desc") result.sort((a, b) => a.name.localeCompare(b.name, locale === "sc" ? "zh-Hans" : "zh-Hant") * (filters.sort === "name-desc" ? -1 : 1));
    if (filters.sort === "district") result.sort((a, b) => a.district.localeCompare(b.district, "zh-Hant") || a.name.localeCompare(b.name, "zh-Hant"));
    if (filters.sort === "category") result.sort((a, b) => a.categories.join("/").localeCompare(b.categories.join("/"), "zh-Hant") || a.name.localeCompare(b.name, "zh-Hant"));
    return result;
  }, [filters, locale, schools]);
  const draftCount = useMemo(() => schools.filter((school) => matchesDirectorySchool(school, draft)).length, [draft, schools]);
  const pageCount = Math.max(1, directoryPageCount(filtered.length));
  const currentPage = Math.min(filters.page, pageCount);
  const start = (currentPage - 1) * DIRECTORY_PAGE_SIZE;
  const visible = filtered.slice(start, start + DIRECTORY_PAGE_SIZE);
  const chosen = schools.filter((school) => selected.includes(school.slug));
  const activeCount = filters.districts.length + [filters.q.trim(), filters.category, filters.gender, filters.religion, filters.schoolNet, filters.tuition, filters.report].filter(Boolean).length;
  const isDefault = !activeCount && filters.sort === "name";
  const setFilters: Change = (patch) => updateDirectoryQuery(schoolStageFiltersQuery({ ...filters, ...patch, page: patch.page || 1 }, initialPage), "q" in patch);
  const reset = () => updateDirectoryQuery(schoolStageFiltersQuery(emptySchoolStageFilters(initialPage), initialPage));
  const toggle = (slug: string) => { setSavedMessage(""); setSelected((value) => value.includes(slug) ? value.filter((item) => item !== slug) : value.length < 4 ? [...value, slug] : value); };
  const expand = (slug: string) => setExpanded((value) => value.includes(slug) ? value.filter((item) => item !== slug) : [...value, slug]);
  const choice = (school: SchoolStageDirectoryRow) => <label className={styles.choice}><input type="checkbox" aria-label={L(`選擇${school.name}`, locale)} checked={selected.includes(school.slug)} disabled={!selected.includes(school.slug) && selected.length === 4} onChange={() => toggle(school.slug)} /></label>;
  const reports = (school: SchoolStageDirectoryRow, compact = false) => (compact ? school.reportSlugs.slice(0, 1) : school.reportSlugs).map((slug, index) => <a className={styles.reportBadge} href={localeHref(`/reports/${slug}`, locale)} key={slug}>{L(compact ? "報告" : school.reportSlugs.length > 1 ? `深度報告 ${index + 1}` : "深度報告", locale)}</a>);
  const chipFilterKeys: ChipFilterKey[] = ["q", "category", "gender", "religion", ...(stage === "primary" ? ["schoolNet" as const] : []), "tuition"];
  const chipLabels: Record<ChipFilterKey, string> = { q: "搜尋", category: "類別", gender: "性別", religion: "宗教", schoolNet: "校網", tuition: "收費" };
  const chips: { key: string; text: string; remove: () => void }[] = [
    ...filters.districts.map((district) => ({ key: `district-${district}`, text: district, remove: () => setFilters({ districts: filters.districts.filter((item) => item !== district) }) })),
    ...chipFilterKeys.filter((key) => filters[key]).map((key) => ({ key, text: `${chipLabels[key]}：${key === "tuition" ? ({ free: "來源明示免學費／免費", amount: "來源列有收費或資助說明", unknown: "來源未列收費資料" } as const)[filters.tuition as "free" | "amount" | "unknown"] : filters[key]}`, remove: () => setFilters({ [key]: "" }) })),
    ...(filters.report ? [{ key: "report", text: "已有深度報告", remove: () => setFilters({ report: false }) }] : []),
  ];
  const addToShortlist = () => {
    const existing = readShortlist();
    const additions = chosen.filter((school) => !existing.some((entry) => entry.id === shortlistId(stage, school.name))).map((school) => ({ id: shortlistId(stage, school.name), name: school.name, kind: stage, href: profilePath(school), addedAt: Date.now() }));
    try {
      writeShortlist([...existing, ...additions]);
      const stored = readShortlist();
      setSavedMessage(chosen.every((school) => stored.some((entry) => entry.id === shortlistId(stage, school.name))) ? "已保存至我的候選（本機）" : "候選已達上限，請先整理我的候選");
    } catch { setSavedMessage("瀏覽器未能保存，請檢查儲存設定後重試"); }
  };
  const visibleColumns: DirectoryColumnKey[] = [
    ...(stage === "primary" && columns.schoolNet ? ["schoolNet" as const] : []),
    "gender" as const, ...(columns.religion ? ["religion" as const] : []), ...(columns.language ? ["language" as const] : []), ...(columns.tuition ? ["tuition" as const] : []),
  ];
  const configurableColumns = [...(stage === "primary" ? ["schoolNet" as const] : []), "religion", "language", "tuition"] as DirectoryColumnKey[];
  const columnLabels: Record<DirectoryColumnKey, string> = { schoolNet: "校網", gender: "性別", religion: "宗教背景", language: "教學語言", tuition: "收費" };
  const columnLabel = (key: DirectoryColumnKey) => columnLabels[key];
  const columnValue = (school: SchoolStageDirectoryRow, key: DirectoryColumnKey) => display(school[key]);
  const pagination = (page: number) => isDefault ? localeHref(directoryPagePath(stage, page), locale) : `${localeHref(directoryPagePath(stage, initialPage), locale)}${schoolStageFiltersQuery({ ...filters, page }, initialPage)}`;
  useEffect(() => { resultTable.current?.scrollTo({ top: 0 }); }, [query]);

  return <div className={`${styles.directory} ${styles.stageDirectory} ${styles.brandedDirectory}`}>
    <section className={styles.searchPanel} aria-labelledby="stage-search-title">
    <div className={styles.searchHeading}><h2 id="stage-search-title">{L("按條件找學校", locale)}</h2><span>{L(stage === "primary" ? "先看地區與校網，再收窄選擇" : "先看地區與類別，再收窄選擇", locale)}</span></div>
    <label className={styles.search}><Search size={20} aria-hidden="true" /><span className="sr-only">{L(`搜尋${stage === "primary" ? "小學" : "中學"}名稱或地區`, locale)}</span><input type="search" value={filters.q} onChange={(event) => setFilters({ q: event.target.value })} placeholder={L(stage === "primary" ? "搜尋校名、英文名、地區、地址、校網或學校編號" : "搜尋校名、英文名、地區、地址或學校編號", locale)} /></label>
    <div className={styles.filters}><MainFilters filters={filters} onChange={setFilters} districts={districts} categories={categories} genders={genders} locale={locale} /><button type="button" className={styles.button} onClick={() => setAdvanced(!advanced)} aria-expanded={advanced} aria-controls="stage-more-filters"><SlidersHorizontal size={16} aria-hidden="true" />{L("更多篩選", locale)}</button></div>
    {advanced && <div className={`${styles.advanced} ${styles.desktop}`} id="stage-more-filters"><AdditionalFilters stage={stage} filters={filters} onChange={setFilters} religions={religions} schoolNets={schoolNets} locale={locale} /></div>}
    <div className={styles.mobileTools}><button className={styles.button} onClick={() => { setDraft(filters); filterDialog.current?.showModal(); }}><SlidersHorizontal size={16} aria-hidden="true" />{L(`篩選${activeCount ? `（${activeCount}）` : ""}`, locale)}</button></div>
    {chips.length > 0 && <div className={styles.chips}>{chips.map((chip) => <button key={chip.key} className={styles.chip} onClick={chip.remove} aria-label={L(`移除${chip.text}`, locale)}>{L(chip.text, locale)}<X size={14} aria-hidden="true" /></button>)}<button className={styles.textButton} onClick={reset}>{L("清除全部", locale)}</button></div>}
    <details className={styles.dataNote}><summary>{L("資料日期與收費說明", locale)}<ChevronDown size={14} aria-hidden="true" /></summary><p className={styles.note}>{L(stage === "primary" ? "辦學類別、校網及性別按學校資料所列；私立、國際及英基學校不一定適用本地校網。收費只按已列來源呈現，來源未列不等於免費。教學語言欄保留原始公開說明，不推算各科課時。" : "辦學類別、宗教及授課語言按各校公開資料列示，語言政策可能按年級或科目不同。收費只按已列來源呈現，來源未列不等於免費；名錄不推算官方 Banding 或個人錄取機會。展開資料可查看來源年度與連結。", locale)}</p></details>
    </section>
    <div className={styles.toolbar} ref={resultToolbar}><div className={styles.resultSummary}><h2>{L("學校名單", locale)}</h2><p aria-live="polite"><span className={styles.resultCount}>{filtered.length}</span> {L("所符合條件", locale)}<span className={styles.muted}>{L(filtered.length ? `顯示 ${start + 1}–${start + visible.length} 所，共 ${pageCount} 頁` : "請調整條件，或清除部分篩選", locale)}</span></p></div><div className={styles.tools}>
      <label><span className="sr-only">{L("排序", locale)}</span><select value={filters.sort} onChange={(event) => setFilters({ sort: event.target.value as SchoolStageDirectoryFilters["sort"] })}><option value="name">{L("校名順序", locale)}</option><option value="name-desc">{L("校名倒序", locale)}</option><option value="district">{L("按地區排列", locale)}</option><option value="category">{L("按類別排列", locale)}</option></select></label>
      <details className={styles.columns}><summary>{L("顯示欄目", locale)}<ChevronDown size={14} aria-hidden="true" /></summary><div className={styles.columnPanel}>{configurableColumns.map((key) => <label key={key} className={styles.check}><input type="checkbox" checked={columns[key]} onChange={(event) => setColumns({ ...columns, [key]: event.target.checked })} />{L(columnLabel(key), locale)}</label>)}</div></details>
    </div></div>
    {filtered.length ? <>
      <div className={`${styles.tableWrap} ${styles.desktop}`} ref={resultTable} tabIndex={0} aria-label={L(`${stage === "primary" ? "小學" : "中學"}名錄，可捲動查看`, locale)}><table className={styles.table}>
        <caption className="sr-only">{L(`香港${stage === "primary" ? "小學" : "中學"}名錄：按地區、類別、性別及公開學校資料篩選`, locale)}</caption>
        <colgroup><col style={{ width: 42 }} /><col style={{ width: 230 }} /><col style={{ width: 95 }} />{visibleColumns.map((key) => <col key={key} style={{ width: key === "language" ? 175 : key === "tuition" ? 170 : key === "religion" ? 100 : 75 }} />)}<col style={{ width: 140 }} /></colgroup>
        <thead><tr><th scope="col"><span className="sr-only">{L("選擇", locale)}</span></th><th scope="col">{L("學校及地區", locale)}</th><th scope="col">{L("辦學類別", locale)}</th>{visibleColumns.map((key) => <th scope="col" key={key}>{L(columnLabel(key), locale)}</th>)}<th scope="col">{L("資料入口", locale)}</th></tr></thead>
        <tbody>{visible.map((school) => <Fragment key={school.slug}><tr><td>{choice(school)}</td><td><a className={styles.schoolName} href={localeHref(profilePath(school), locale)}>{L(school.name, locale)}</a><span className={styles.muted}>{L(school.district, locale)}{school.districts.length > 1 ? L(" · 多區", locale) : ""}</span></td><td><span className={styles.nature}>{L(school.categories.join("／") || school.schoolType, locale)}</span></td>{visibleColumns.map((key) => <td key={key}><Fact value={columnValue(school, key)} locale={locale} compact={key === "language" || key === "tuition"} /></td>)}<td><div className={styles.links}><a href={localeHref(profilePath(school), locale)} aria-label={L(`查看${school.name}資料`, locale)}>{L("資料", locale)}</a>{reports(school, true)}<button aria-expanded={expanded.includes(school.slug)} aria-controls={`stage-detail-${school.slug}`} onClick={() => expand(school.slug)}>{L(expanded.includes(school.slug) ? "收起" : "展開", locale)}<ChevronDown size={13} aria-hidden="true" /></button></div></td></tr><tr hidden={!expanded.includes(school.slug)} id={`stage-detail-${school.slug}`}><td className={styles.detailCell} colSpan={4 + visibleColumns.length}>{expanded.includes(school.slug) && <SchoolDetails row={school} locale={locale} />}</td></tr></Fragment>)}</tbody>
      </table></div>
      <div className={styles.mobile}><ul className={styles.mobileList}>{visible.map((school) => <li className={styles.mobileRow} key={school.slug}><div className={styles.mobileTitle}><div><a className={styles.schoolName} href={localeHref(profilePath(school), locale)}>{L(school.name, locale)}</a><span className={styles.muted}>{L(`${school.district} · ${school.categories.join("／")}`, locale)}</span></div>{choice(school)}</div><dl className={styles.mobileFacts}>{rowFacts(school).slice(2, stage === "primary" ? 7 : 6).map(([label, value]) => <div key={label}><dt>{L(label, locale)}</dt><dd><Fact value={value} locale={locale} compact /></dd></div>)}</dl><div className={styles.mobileLinks}><a href={localeHref(profilePath(school), locale)}>{L("學校資料", locale)}</a>{reports(school)}<button aria-expanded={expanded.includes(school.slug)} aria-controls={`stage-mobile-${school.slug}`} onClick={() => expand(school.slug)}>{L(expanded.includes(school.slug) ? "收起資料" : "展開資料", locale)}</button></div>{expanded.includes(school.slug) && <div className={styles.mobileDetail} id={`stage-mobile-${school.slug}`}><SchoolDetails row={school} locale={locale} /></div>}</li>)}</ul></div>
    </> : <div className={styles.empty}><strong>{L("沒有符合篩選條件的學校", locale)}</strong><p className={styles.note}>{L("移除一項條件，或清除篩選後重新查看名錄。", locale)}</p><button className={styles.button} onClick={reset}>{L("清除篩選", locale)}</button></div>}
    {filtered.length > DIRECTORY_PAGE_SIZE && <nav className={styles.pagination} aria-label={L("學校名錄分頁", locale)}><p className={styles.note}>{L(`每頁 ${DIRECTORY_PAGE_SIZE} 所；搜尋和篩選涵蓋整份名錄。`, locale)}</p>{[...(currentPage > 1 ? [currentPage - 1] : []), ...Array.from({ length: pageCount }, (_, index) => index + 1), ...(currentPage < pageCount ? [currentPage + 1] : [])].map((page, index, all) => <a key={`${index}-${page}`} className={styles.page} href={pagination(page)} aria-current={page === currentPage ? "page" : undefined} aria-label={L(index === 0 && currentPage > 1 ? "上一頁" : index === all.length - 1 && currentPage < pageCount ? "下一頁" : `第 ${page} 頁`, locale)} onClick={isDefault ? undefined : (event) => { event.preventDefault(); setFilters({ page }); window.requestAnimationFrame(() => resultToolbar.current?.scrollIntoView({ block: "start" })); }}>{L(index === 0 && currentPage > 1 ? "上一頁" : index === all.length - 1 && currentPage < pageCount ? "下一頁" : String(page), locale)}</a>)}</nav>}
    <p className={styles.note}>{L("每頁50所。可以跨頁勾選2–4所比較；加入候選的資料只保存在目前瀏覽器。", locale)}</p>
    {selected.length > 0 && <div className={styles.selection} role="region" aria-label={L("已選學校操作", locale)}><div><strong>{L(`已選 ${selected.length}／4 所`, locale)}</strong><span className={styles.muted} role="status">{L(savedMessage || (selected.length < 2 ? "再選一所，即可比較" : "可跨頁選擇，條件改變不會清空"), locale)}</span></div><div className={styles.selectionActions}><button className={styles.textButton} onClick={() => { setSelected([]); setSavedMessage(""); }}>{L("清除", locale)}</button><button className={styles.button} onClick={addToShortlist}>{L("加入候選", locale)}</button><button className={`${styles.button} ${styles.primary}`} disabled={selected.length < 2} onClick={() => compareDialog.current?.showModal()}>{L("比較學校", locale)}</button>{savedMessage.startsWith("已保存") && <a className={styles.button} href={localeHref("/shortlist", locale)}>{L("查看候選", locale)}</a>}</div></div>}
    <dialog ref={filterDialog} className={styles.dialog} aria-labelledby="stage-filter-heading"><div className={styles.dialogHeader}><h2 id="stage-filter-heading">{L(`篩選${stage === "primary" ? "小學" : "中學"}`, locale)}</h2><button onClick={() => filterDialog.current?.close()} aria-label={L("關閉篩選", locale)}><X size={20} /></button></div><MainFilters filters={draft} onChange={(patch) => setDraft({ ...draft, ...patch })} districts={districts} categories={categories} genders={genders} locale={locale} mobile /><AdditionalFilters stage={stage} filters={draft} onChange={(patch) => setDraft({ ...draft, ...patch })} religions={religions} schoolNets={schoolNets} locale={locale} /><p className={styles.note}>{L("未列欄位表示目前名錄來源沒有提供，不代表學校沒有該項安排。", locale)}</p><div className={styles.dialogFooter}><button className={styles.textButton} onClick={() => setDraft(emptySchoolStageFilters(initialPage))}>{L("重設條件", locale)}</button><button className={`${styles.button} ${styles.primary}`} onClick={() => { setFilters({ ...draft, page: initialPage }); filterDialog.current?.close(); }}>{L(`查看 ${draftCount} 所學校`, locale)}</button></div></dialog>
    <dialog ref={compareDialog} className={styles.dialog} aria-labelledby="stage-compare-heading"><div className={styles.dialogHeader}><h2 id="stage-compare-heading">{L(`${stage === "primary" ? "小學" : "中學"}同欄比較`, locale)}</h2><button onClick={() => compareDialog.current?.close()} aria-label={L("關閉比較", locale)}><X size={20} /></button></div><p className={styles.note}>{L("比較的是名錄已列的公開資料；資料未列時保留空缺，詳情請開啟學校資料頁核對來源。", locale)}</p><div className={styles.compareWrap}><table className={styles.compare}><thead><tr><th scope="col">{L("比較項目", locale)}</th>{chosen.map((school) => <th scope="col" key={school.slug}><a href={localeHref(profilePath(school), locale)}>{L(school.name, locale)}</a></th>)}</tr></thead><tbody>{rowFacts(schools[0]).map(([label]) => <tr key={label}><th scope="row">{L(label, locale)}</th>{chosen.map((school) => <td key={school.slug}>{L(rowFacts(school).find(([field]) => field === label)?.[1] || "資料未列", locale)}</td>)}</tr>)}</tbody></table></div></dialog>
  </div>;
}
