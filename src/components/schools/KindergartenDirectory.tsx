"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { DIRECTORY_PAGE_SIZE, directoryPagePath } from "@/lib/school-directory-pagination";
import { emptyKgFilters, filterKindergartens, kgQuery, readKgFilters, type DirectoryFact, type KindergartenFilters, type KindergartenRow } from "@/lib/kindergarten-directory";
import { updateDirectoryQuery, useDirectoryQuery } from "@/lib/use-directory-query";
import { readShortlist, shortlistId, writeShortlist } from "@/lib/shortlist";
import { SITE_URL } from "@/lib/seo";
import styles from "./KindergartenDirectory.module.css";

type Change = (patch: Partial<KindergartenFilters>) => void;
const profilePath = (row: KindergartenRow) => `/schools/kindergarten/${row.slug}`;
const labels = { session: "時段", pn: "PN班", language: "語言", curriculum: "課程", nature: "辦學性質", scheme: "計劃參與", q: "搜尋" };
const pnLabels: Record<string, string> = { yes: "當屆有PN班記錄", no: "當屆未開PN班", unknown: "當屆PN待確認" };
const schemeLabels: Record<string, string> = { yes: "參加（2026/27）", no: "未列入名單（2026/27）", unknown: "校號／校址待核" };
const languageLabels: Record<string, string> = { 粵語: "粵語為主", 英語: "英語為主", 普通話: "普通話為主", "英粵／英普班": "按班型分流：英粵／英普", unknown: "主導語言待確認" };

function SelectField({ label, value, options, onChange, locale }: { label: string; value: string; options: [string, string][]; onChange: (v: string) => void; locale: Locale }) {
  return <label className={styles.field}>{L(label, locale)}<select value={value} onChange={(e) => onChange(e.target.value)}>{options.map(([v, name]) => <option key={v} value={v}>{L(name, locale)}</option>)}</select></label>;
}

function Districts({ districts, value, onChange, locale, mobile = false }: { districts: string[]; value: string[]; onChange: (v: string[]) => void; locale: Locale; mobile?: boolean }) {
  const choices = <div className={styles.districtPanel}>{districts.map((d) => <label className={styles.check} key={d}><input type="checkbox" checked={value.includes(d)} onChange={(e) => onChange(e.target.checked ? [...value, d] : value.filter((x) => x !== d))} />{L(d, locale)}</label>)}</div>;
  return mobile ? <fieldset><legend>{L("地區（可多選）", locale)}</legend>{choices}</fieldset> : <div className={styles.field}><span>{L("地區", locale)}</span><details className={styles.district}><summary>{L(value.length ? `已選 ${value.length} 區` : "全部地區", locale)}<ChevronDown size={15} aria-hidden="true" /></summary>{choices}</details></div>;
}

function MainFilters({ filters, onChange, districts, locale, mobile = false }: { filters: KindergartenFilters; onChange: Change; districts: string[]; locale: Locale; mobile?: boolean }) {
  return <>
    <Districts districts={districts} value={filters.districts} onChange={(value) => onChange({ districts: value })} locale={locale} mobile={mobile} />
    <SelectField label="辦學性質" value={filters.nature} options={[["", "全部性質"], ["非牟利", "非牟利"], ["私立獨立", "私立獨立"], ["類別待核實", "待核實"]]} onChange={(nature) => onChange({ nature })} locale={locale} />
    <SelectField label="教育局免費優質幼稚園教育計劃" value={filters.scheme} options={[["", "全部計劃狀態"], ["yes", "參加（2026/27）"], ["no", "未列入名單（2026/27）"], ["unknown", "校號／校址待核"]]} onChange={(scheme) => onChange({ scheme })} locale={locale} />
    <SelectField label="上課時段" value={filters.session} options={[["", "全部時段"], ["上午", "上午"], ["下午", "下午"], ["全日", "全日"], ["長全日", "長全日"], ["unknown", "待確認／按校址查看"]]} onChange={(session) => onChange({ session })} locale={locale} />
    <SelectField label="PN班（約2–3歲；當屆狀態）" value={filters.pn} options={[["", "全部PN狀態"], ["yes", "當屆有班級記錄"], ["no", "當屆未開班"], ["unknown", "當屆待確認／按校址查看"]]} onChange={(pn) => onChange({ pn })} locale={locale} />
  </>;
}

function MoreFilters({ filters, onChange, locale }: { filters: KindergartenFilters; onChange: Change; locale: Locale }) {
  return <div className={styles.advancedGrid}>
    <SelectField label="課程" value={filters.curriculum} options={[["", "全部課程"], ["本地", "本地課程"], ["非本地", "非本地課程"]]} onChange={(curriculum) => onChange({ curriculum })} locale={locale} />
    <SelectField label="主要授課語言" value={filters.language} options={[["", "全部語言"], ["粵語", "粵語為主"], ["英語", "英語為主"], ["普通話", "普通話為主"], ["英粵／英普班", "按班型分流：英粵／英普"], ["unknown", "主導語言待確認"]]} onChange={(language) => onChange({ language })} locale={locale} />
    <label className={styles.check}><input type="checkbox" checked={filters.report} onChange={(e) => onChange({ report: e.target.checked })} />{L("已有深度報告", locale)}</label>
  </div>;
}

function Fact({ fact, locale }: { fact: DirectoryFact; locale: Locale }) {
  const period = fact.period?.includes("2025年9月") ? "2025年9月" : fact.period?.replace(/^教育局幼稚園概覽/, "");
  const datedSource = period?.match(/^(.*?)[・·](\d{4}-\d{2}-\d{2}.*)$/);
  return <><span className={styles.factValue}>{L(fact.text, locale)}</span>{period && <span className={styles.muted}>{datedSource ? <>{L(datedSource[1], locale)} · <span className={styles.sourceDate}>{L(datedSource[2], locale)}</span></> : L(period, locale)}</span>}</>;
}

function RowDetails({ row, locale }: { row: KindergartenRow; locale: Locale }) {
  return <div className={styles.detailGrid}>
    <div className={styles.wide}><h3>{L("校名與地址", locale)}</h3><p>{row.nameEn}<br />{L(row.address, locale)}</p>{row.multiCampus && <p>{L("本校有多個登記校址，班別、語言及收費須按校址核對。", locale)}</p>}</div>
    {([["免費優質幼稚園教育計劃", row.scheme], ["上課時段", row.sessions], ["PN班（約2–3歲）", row.pn], ["主要授課語言", row.language], ["收費與適用範圍", row.fee]] as [string, DirectoryFact][]).map(([title, fact]) => <div key={title}><h3>{L(title, locale)}</h3><p>{L(fact.detail, locale)}</p>{fact.period && <span className={styles.muted}>{L(fact.period, locale)}</span>}{fact.sourceUrl && <a href={fact.sourceUrl} target="_blank" rel="noopener noreferrer">{L("查看原始來源", locale)} ↗</a>}</div>)}
    <div className={styles.wide}><a href={localeHref(profilePath(row), locale)}>{L("查看完整學校資料與來源", locale)} →</a></div>
  </div>;
}

export default function KindergartenDirectory({ schools, locale, initialPage = 1 }: { schools: KindergartenRow[]; locale: Locale; initialPage?: number }) {
  const query = useDirectoryQuery();
  const filters = useMemo(() => readKgFilters(query, initialPage), [initialPage, query]);
  const [advanced, setAdvanced] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [savedMessage, setSavedMessage] = useState("");
  const [draft, setDraft] = useState(emptyKgFilters());
  const [columns, setColumns] = useState({ scheme: true, pn: true, language: true, fee: true });
  const filterDialog = useRef<HTMLDialogElement>(null);
  const compareDialog = useRef<HTMLDialogElement>(null);
  const resultToolbar = useRef<HTMLDivElement>(null);
  const resultTable = useRef<HTMLDivElement>(null);
  const districts = useMemo(() => [...new Set(schools.flatMap((s) => s.districts))].sort((a, b) => a.localeCompare(b, "zh-Hant")), [schools]);
  const normalize = (v: string) => L(v, "sc").toLowerCase().replace(/[\s()（）]/g, "");
  const filtered = useMemo(() => filterKindergartens(schools, filters, L(filters.q, "sc").toLowerCase().replace(/[\s()（）]/g, "")), [schools, filters]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / DIRECTORY_PAGE_SIZE));
  const currentPage = Math.min(filters.page, pageCount);
  const start = (currentPage - 1) * DIRECTORY_PAGE_SIZE;
  const visible = filtered.slice(start, start + DIRECTORY_PAGE_SIZE);
  const chosen = schools.filter((s) => selected.includes(s.slug));
  const activeCount = filters.districts.length + [filters.q.trim(), filters.nature, filters.scheme, filters.session, filters.pn, filters.language, filters.curriculum, filters.report].filter(Boolean).length;
  const isDefault = !activeCount && filters.sort === "name";
  const setFilters: Change = (patch) => updateDirectoryQuery(kgQuery({ ...filters, ...patch, page: patch.page || 1 }, initialPage), "q" in patch);
  useEffect(() => { resultTable.current?.scrollTo({ top: 0 }); }, [query]);
  const reset = () => updateDirectoryQuery(kgQuery(emptyKgFilters(1), initialPage));
  const toggle = (slug: string) => { setSavedMessage(""); setSelected((value) => value.includes(slug) ? value.filter((s) => s !== slug) : value.length < 4 ? [...value, slug] : value); };
  const expand = (slug: string) => setExpanded((value) => value.includes(slug) ? value.filter((s) => s !== slug) : [...value, slug]);
  const choice = (row: KindergartenRow) => <label className={styles.choice}><input type="checkbox" aria-label={L(`選擇${row.name}`, locale)} checked={selected.includes(row.slug)} disabled={!selected.includes(row.slug) && selected.length === 4} onChange={() => toggle(row.slug)} /></label>;
  const reports = (row: KindergartenRow, compact = false) => (compact ? row.reports.slice(0, 1) : row.reports).map((slug, index) => <a className={styles.reportBadge} href={localeHref(`/reports/${slug}`, locale)} key={slug}>{L(compact ? "深度報告" : row.reports.length > 1 ? `報告 ${index + 1}` : "深度報告", locale)}</a>);
  const chips: { key: string; text: string; remove: () => void }[] = [
    ...filters.districts.map((d) => ({ key: d, text: d, remove: () => setFilters({ districts: filters.districts.filter((v) => v !== d) }) })),
    ...(["q", "nature", "scheme", "session", "pn", "language", "curriculum"] as const).filter((key) => filters[key]).map((key) => ({ key, text: `${labels[key]}：${key === "pn" ? pnLabels[filters[key]] || filters[key] : key === "scheme" ? schemeLabels[filters[key]] || filters[key] : key === "language" ? languageLabels[filters[key]] || filters[key] : filters[key] === "unknown" ? "待確認" : filters[key]}`, remove: () => setFilters({ [key]: "" }) })),
    ...(filters.report ? [{ key: "report", text: "已有深度報告", remove: () => setFilters({ report: false }) }] : []),
  ];
  function saveCandidates() {
    const existing = readShortlist();
    const additions = chosen.filter((row) => !existing.some((entry) => entry.id === shortlistId("kindergarten", row.name))).map((row) => ({ id: shortlistId("kindergarten", row.name), name: row.name, kind: "kindergarten" as const, href: profilePath(row), addedAt: Date.now() }));
    try {
      writeShortlist([...existing, ...additions]);
      const stored = readShortlist();
      setSavedMessage(chosen.every((row) => stored.some((entry) => entry.id === shortlistId("kindergarten", row.name))) ? "已保存至我的候選（本機）" : "候選已達上限，請先整理我的候選");
    } catch { setSavedMessage("瀏覽器未能保存，請檢查儲存設定後重試"); }
  }
  const schema = { "@context": "https://schema.org", "@type": "ItemList", "@id": `${SITE_URL}${localeHref(directoryPagePath("kindergarten", initialPage), locale)}#schools`, numberOfItems: visible.length, itemListElement: visible.map((row, i) => ({ "@type": "ListItem", position: start + i + 1, name: L(row.name, locale), url: `${SITE_URL}${localeHref(profilePath(row), locale)}` })) };
  const pagination = (page: number) => isDefault ? localeHref(directoryPagePath("kindergarten", page), locale) : `${localeHref(directoryPagePath("kindergarten", initialPage), locale)}${kgQuery({ ...filters, page }, initialPage)}`;

  return <div className={`${styles.directory} ${styles.brandedDirectory}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className={styles.searchPanel} aria-labelledby="kg-search-title">
    <div className={styles.searchHeading}><h2 id="kg-search-title">{L("按條件找學校", locale)}</h2><span>{L("先選地區，再收窄選擇", locale)}</span></div>
    <label className={styles.search}><Search size={20} aria-hidden="true" /><span className="sr-only">{L("搜尋幼稚園名稱或地區", locale)}</span><input type="search" value={filters.q} onChange={(e) => setFilters({ q: e.target.value })} placeholder={L("搜尋校名、英文名、社區或地址", locale)} /></label>
    <div className={styles.filters}><MainFilters filters={filters} onChange={setFilters} districts={districts} locale={locale} /><button type="button" className={styles.button} onClick={() => setAdvanced(!advanced)} aria-expanded={advanced} aria-controls="kg-more-filters"><SlidersHorizontal size={16} aria-hidden="true" />{L("更多篩選", locale)}</button></div>
    {advanced && <div className={`${styles.advanced} ${styles.desktop}`} id="kg-more-filters"><MoreFilters filters={filters} onChange={setFilters} locale={locale} /></div>}
    <div className={styles.mobileTools}><button className={styles.button} onClick={() => { setDraft(filters); filterDialog.current?.showModal(); }}><SlidersHorizontal size={16} aria-hidden="true" />{L(`篩選${activeCount ? `（${activeCount}）` : ""}`, locale)}</button></div>
    {chips.length > 0 && <div className={styles.chips}>{chips.map((chip) => <button key={chip.key} className={styles.chip} onClick={chip.remove} aria-label={L(`移除${chip.text}`, locale)}>{L(chip.text, locale)}<X size={14} aria-hidden="true" /></button>)}<button className={styles.textButton} onClick={reset}>{L("清除全部", locale)}</button></div>}
    <details className={styles.dataNote}><summary>{L("資料日期與欄位說明", locale)}<ChevronDown size={14} aria-hidden="true" /></summary><p className={styles.note}>{L("教育局計劃參與狀態按2026/27學年名單；參加計劃不等於所有班別免學費。PN班只在當屆校址資料明確列出時標為已確認，2025年9月服務記錄會保留作歷史參考，不代表現屆仍開班。教學語言以主要授課語言標示，兩文三語或語言活動不代表課時比例；學費另按班別及資助後金額列示。", locale)}</p></details>
    </section>
    <div className={styles.toolbar} ref={resultToolbar}><div className={styles.resultSummary}><h2>{L("學校名單", locale)}</h2><p aria-live="polite"><span className={styles.resultCount}>{filtered.length}</span> {L("所符合條件", locale)}<span className={styles.muted}>{L(filtered.length ? `顯示 ${start + 1}–${start + visible.length} 所，共 ${pageCount} 頁` : "請調整條件，或查看資料待確認的學校", locale)}</span></p></div><div className={styles.tools}>
      <label><span className="sr-only">{L("排序", locale)}</span><select value={filters.sort} onChange={(e) => setFilters({ sort: e.target.value })}><option value="name">{L("校名順序", locale)}</option><option value="name-desc">{L("校名倒序", locale)}</option><option value="district">{L("按地區排列", locale)}</option></select></label>
      <details className={styles.columns}><summary>{L("顯示欄目", locale)}<ChevronDown size={14} aria-hidden="true" /></summary><div className={styles.columnPanel}>{(["scheme", "pn", "language", "fee"] as const).map((key) => <label key={key} className={styles.check}><input type="checkbox" checked={columns[key]} onChange={(e) => setColumns({ ...columns, [key]: e.target.checked })} />{L({ scheme: "教育局計劃", pn: "PN班", language: "教學語言", fee: "學費" }[key], locale)}</label>)}</div></details>
    </div></div>
    {filtered.length ? <>
      <div className={`${styles.tableWrap} ${styles.desktop}`} ref={resultTable} tabIndex={0} aria-label={L("幼稚園名錄，可捲動查看", locale)}><table className={styles.table}>
        <caption className="sr-only">{L("香港幼稚園名錄：教育局計劃參與、上課時段、PN班、主要授課語言與學費", locale)}</caption>
        <colgroup><col style={{ width: 42 }} /><col style={{ width: 220 }} /><col style={{ width: 85 }} />{columns.scheme && <col style={{ width: 125 }} />}<col style={{ width: 125 }} />{columns.pn && <col style={{ width: 135 }} />}{columns.language && <col style={{ width: 145 }} />}{columns.fee && <col style={{ width: 165 }} />}<col style={{ width: 110 }} /></colgroup>
        <thead><tr><th scope="col"><span className="sr-only">{L("選擇", locale)}</span></th><th scope="col" aria-sort={filters.sort === "name" ? "ascending" : filters.sort === "name-desc" ? "descending" : "none"}><button className={styles.sortHeader} onClick={() => setFilters({ sort: filters.sort === "name" ? "name-desc" : "name" })}>{L("學校及地區", locale)}<span aria-hidden="true">{filters.sort === "name-desc" ? "↑" : "↓"}</span></button></th><th scope="col">{L("辦學性質", locale)}</th>{columns.scheme && <th scope="col">{L("教育局計劃", locale)}</th>}<th scope="col">{L("上課時段", locale)}</th>{columns.pn && <th scope="col">{L("PN班（當屆）", locale)}</th>}{columns.language && <th scope="col">{L("主要授課語言", locale)}</th>}{columns.fee && <th scope="col">{L("學費", locale)}</th>}<th scope="col">{L("資料入口", locale)}</th></tr></thead>
        <tbody>{visible.map((row) => <Fragment key={row.slug}><tr><td>{choice(row)}</td><td><a className={styles.schoolName} href={localeHref(profilePath(row), locale)}>{L(row.name, locale)}</a><span className={styles.muted}>{L(row.district, locale)}{row.multiCampus ? L(" · 多校址", locale) : ""}</span></td><td>{row.nature.map((n) => <span className={styles.nature} key={n}>{L(n, locale)}</span>)}{row.curriculum.includes("非本地") && <span className={styles.muted}>{L("非本地課程", locale)}</span>}</td>{columns.scheme && <td><Fact fact={row.scheme} locale={locale} /></td>}<td><Fact fact={row.sessions} locale={locale} /></td>{columns.pn && <td><Fact fact={row.pn} locale={locale} /></td>}{columns.language && <td><Fact fact={row.language} locale={locale} /></td>}{columns.fee && <td><Fact fact={row.fee} locale={locale} /></td>}<td><div className={styles.links}><a href={localeHref(profilePath(row), locale)} aria-label={L(`查看${row.name}資料`, locale)}>{L("資料", locale)}</a>{reports(row, true)}<button aria-expanded={expanded.includes(row.slug)} aria-controls={`kg-detail-${row.slug}`} onClick={() => expand(row.slug)}>{L(expanded.includes(row.slug) ? "收起" : "展開", locale)}<ChevronDown size={13} aria-hidden="true" /></button></div></td></tr><tr hidden={!expanded.includes(row.slug)} id={`kg-detail-${row.slug}`}><td className={styles.detailCell} colSpan={4 + Object.values(columns).filter(Boolean).length}>{expanded.includes(row.slug) && <RowDetails row={row} locale={locale} />}</td></tr></Fragment>)}</tbody>
      </table></div>
      <div className={styles.mobile}><ul className={styles.mobileList}>{visible.map((row) => <li className={styles.mobileRow} key={row.slug}><div className={styles.mobileTitle}><div><a className={styles.schoolName} href={localeHref(profilePath(row), locale)}>{L(row.name, locale)}</a><span className={styles.muted}>{L(`${row.district} · ${row.nature.join("／")}${row.multiCampus ? " · 多校址" : ""}`, locale)}</span></div>{choice(row)}</div><dl className={styles.mobileFacts}>{([["計劃參與", row.scheme], ["時段", row.sessions], ["PN班（當屆）", row.pn], ["主要授課語言", row.language], ["學費", row.fee]] as [string, DirectoryFact][]).map(([title, fact]) => <div key={title}><dt>{L(title, locale)}</dt><dd><Fact fact={fact} locale={locale} /></dd></div>)}</dl><div className={styles.mobileLinks}><a href={localeHref(profilePath(row), locale)}>{L("學校資料", locale)}</a>{reports(row)}<button aria-expanded={expanded.includes(row.slug)} aria-controls={`kg-mobile-${row.slug}`} onClick={() => expand(row.slug)}>{L(expanded.includes(row.slug) ? "收起資料" : "展開資料", locale)}</button></div>{expanded.includes(row.slug) && <div className={styles.mobileDetail} id={`kg-mobile-${row.slug}`}><RowDetails row={row} locale={locale} /></div>}</li>)}</ul></div>
    </> : <div className={styles.empty}><strong>{L("沒有符合全部條件的學校", locale)}</strong><p className={styles.note}>{L("部分學校的時段、PN或主要語言仍待確認；你可以移除一項條件再比較。", locale)}</p><button className={styles.button} onClick={reset}>{L("清除篩選", locale)}</button></div>}
    {filtered.length > DIRECTORY_PAGE_SIZE && <nav className={styles.pagination} aria-label={L("學校名錄分頁", locale)}>{[...(currentPage > 1 ? [currentPage - 1] : []), ...Array.from({ length: pageCount }, (_, i) => i + 1), ...(currentPage < pageCount ? [currentPage + 1] : [])].map((page, i, all) => <a key={`${i}-${page}`} className={styles.page} href={pagination(page)} aria-current={page === currentPage && i !== 0 && i !== all.length - 1 ? "page" : (page === currentPage ? "page" : undefined)} aria-label={L(i === 0 && currentPage > 1 ? "上一頁" : i === all.length - 1 && currentPage < pageCount ? "下一頁" : `第 ${page} 頁`, locale)} onClick={isDefault ? undefined : (e) => { e.preventDefault(); setFilters({ page }); window.requestAnimationFrame(() => resultToolbar.current?.scrollIntoView({ block: "start" })); }}>{L(i === 0 && currentPage > 1 ? "上一頁" : i === all.length - 1 && currentPage < pageCount ? "下一頁" : String(page), locale)}</a>)}</nav>}
    <p className={styles.note}>{L("每頁50所。可以勾選2–4所作同欄比較；候選只保存在目前瀏覽器。", locale)}</p>
    {selected.length > 0 && <div className={styles.selection} role="region" aria-label={L("已選學校操作", locale)}><div><strong>{L(`已選 ${selected.length}／4 所`, locale)}</strong><span className={styles.muted} role="status">{L(savedMessage || (selected.length < 2 ? "再選一所，即可比較" : "可跨頁選擇，條件改變不會清空"), locale)}</span></div><div className={styles.selectionActions}><button className={styles.textButton} onClick={() => { setSelected([]); setSavedMessage(""); }}>{L("清除", locale)}</button><button className={styles.button} onClick={saveCandidates}>{L("加入候選", locale)}</button><button className={`${styles.button} ${styles.primary}`} disabled={selected.length < 2} onClick={() => compareDialog.current?.showModal()}>{L("比較學校", locale)}</button>{savedMessage.startsWith("已保存") && <a className={styles.button} href={localeHref("/shortlist", locale)}>{L("查看候選", locale)}</a>}</div></div>}
    <dialog ref={filterDialog} className={styles.dialog} aria-labelledby="kg-filter-heading"><div className={styles.dialogHeader}><h2 id="kg-filter-heading">{L("篩選幼稚園", locale)}</h2><button onClick={() => filterDialog.current?.close()} aria-label={L("關閉篩選", locale)}><X size={20} /></button></div><MainFilters filters={draft} onChange={(patch) => setDraft({ ...draft, ...patch })} districts={districts} locale={locale} mobile /><MoreFilters filters={draft} onChange={(patch) => setDraft({ ...draft, ...patch })} locale={locale} /><p className={styles.note}>{L("有服務記錄不代表當屆仍有學位；資料日期可在結果中查看。", locale)}</p><div className={styles.dialogFooter}><button className={styles.textButton} onClick={() => setDraft(emptyKgFilters())}>{L("重設條件", locale)}</button><button className={`${styles.button} ${styles.primary}`} onClick={() => { setFilters({ ...draft, page: 1 }); filterDialog.current?.close(); }}>{L(`查看 ${filterKindergartens(schools, draft, normalize(draft.q)).length} 所學校`, locale)}</button></div></dialog>
    <dialog ref={compareDialog} className={styles.dialog} aria-labelledby="kg-compare-heading"><div className={styles.dialogHeader}><h2 id="kg-compare-heading">{L("幼稚園同欄比較", locale)}</h2><button onClick={() => compareDialog.current?.close()} aria-label={L("關閉比較", locale)}><X size={20} /></button></div><p className={styles.note}>{L("比較的是各校公開資料記錄，請一併看日期；空缺資料保留待確認，並非沒有服務。窄螢幕可左右捲動。", locale)}</p><div className={styles.compareWrap}><table className={styles.compare}><thead><tr><th scope="col">{L("比較項目", locale)}</th>{chosen.map((row) => <th scope="col" key={row.slug}><a href={localeHref(profilePath(row), locale)}>{L(row.name, locale)}</a></th>)}</tr></thead><tbody>{["地區", "辦學性質", "課程", "計劃參與", "時段", "PN當屆狀態", "主要授課語言", "學費"].map((label, i) => <tr key={label}><th scope="row">{L(label, locale)}</th>{chosen.map((row) => { const value: string | DirectoryFact = [row.district, row.nature.join("／"), row.curriculum.join("／") || "待確認", row.scheme, row.sessions, row.pn, row.language, row.fee][i]; return <td key={row.slug}>{typeof value === "string" ? L(value, locale) : <><Fact fact={value} locale={locale} />{value.sourceUrl && <a className={styles.muted} href={value.sourceUrl} target="_blank" rel="noopener noreferrer">{L("來源", locale)} ↗</a>}</>}</td>; })}</tr>)}</tbody></table></div></dialog>
  </div>;
}
