import { L, type Locale } from "@/lib/i18n";
import reportMeta from "@/content/report-meta.json";

/** Every report JSON, including the archived direct route, is admitted after content-parity checks. */
export const EDITORIAL_REPORT_SLUGS = [
  "alliance",
  "aogps",
  "aps",
  "aspcps",
  "braemar-hill",
  "brgps",
  "canaan",
  "canaan-cd",
  "canaan-klt",
  "catiline",
  "canossahk",
  "cblmc",
  "ccc",
  "cccwhcsw",
  "cckg",
  "cmask",
  "cneclmc",
  "cps",
  "cpskg",
  "creative",
  "cypy",
  "dbs",
  "dgjs",
  "edujcps",
  "evangel",
  "esf-kindergarten",
  "fkgs",
  "fssas",
  "ghps",
  "goodhealth",
  "gt",
  "hacs",
  "hfc",
  "hfcklt",
  "hkbaptist",
  "hksdgps",
  "hkcwcyw",
  "hkups",
  "honwah",
  "hrgp",
  "hrgps",
  "hy",
  "hyps",
  "icqm",
  "ihm",
  "jrgps",
  "kau",
  "kcps",
  "kcskps",
  "keenmind",
  "kowloon-city-baptist-kg",
  "kentville",
  "kiangsu",
  "krs",
  "ktbwcs",
  "ktgps",
  "ktl",
  "kts",
  "ky",
  "la",
  "lchhds",
  "lh",
  "lh-hp",
  "lh-sf",
  "lht",
  "luaaps",
  "lkps",
  "llc",
  "lmc",
  "logos",
  "lsps",
  "ltmps",
  "ly",
  "mc",
  "mcs",
  "mingwai",
  "mosllps",
  "mps",
  "mtc",
  "mtcps",
  "munsang",
  "munsangps",
  "ngwah",
  "on-kei-nursery",
  "our-ladys-kindergarten",
  "sacred-heart-canossian-kindergarten",
  "olps",
  "pb",
  "pc",
  "pcps",
  "pkcps",
  "pkps",
  "plkcastar",
  "plkcy",
  "plkflpy",
  "plklht",
  "plkshsn",
  "plk-tam-au-yeung-siu-fong",
  "pt",
  "puikei",
  "py2",
  "rc",
  "rcps",
  "scps",
  "sfa",
  "sfcs",
  "shck",
  "shckps",
  "sjacps",
  "sjps",
  "skh",
  "skhcf",
  "skhhs",
  "skhke",
  "skhkfp",
  "skhlmc",
  "skhlmcmps",
  "skhlsks",
  "skhmfps",
  "skhsas",
  "skhsc",
  "skhsm",
  "skhttlsks",
  "skhykkgps",
  "skhyl",
  "skhyl2",
  "sls",
  "smcs",
  "smm",
  "snicholas",
  "soka",
  "spc",
  "spccps",
  "spcc-secondary",
  "dbs-secondary",
  "dgs-secondary",
  "gsis-secondary",
  "harrow-secondary",
  "st-stephens-secondary",
  "spcps",
  "spcs",
  "spk",
  "sppcs",
  "sppcs2",
  "srl",
  "sscps",
  "ssgc",
  "ssgps",
  "stcat",
  "st-hilarys-kg",
  "st-stephens-church-kg",
  "stgps",
  "sts",
  "stts",
  "sylgps",
  "tak-sun-kg",
  "think",
  "tkocps",
  "tlps",
  "tmrgps",
  "topkids-yl",
  "tpom",
  "tsbcps",
  "tsl",
  "tswcs",
  "tt",
  "ttskg",
  "tutor",
  "tutor-klt",
  "twghscws",
  "twgps",
  "veo-bcy",
  "veo-cwb",
  "veo-hmt",
  "veo-op",
  "victoria",
  "wflst",
  "wkf",
  "wyps",
  "ycis",
  "ycis-kt",
  "ycmc",
  "ycmcj",
  "ycps",
  "ylaps",
  "yau-yat-chuen-school-kg",
  "yuen-yuen-kindergarten",
  "york",
  "york-klt",
  "york-montessori-yl",
  "ywps",
  "hk-true-light-caine-kg",
  "kowloon-true-light-kg",
] as const;

const SECONDARY_REPORT_SLUGS = new Set(reportMeta.SS_REPORTS.map((report) => report.c));
const SECONDARY_REPORT_META = new Map(reportMeta.SS_REPORTS.map((report) => [report.c, report]));

export function usesEditorialReportLayout(slug: string): boolean {
  return (EDITORIAL_REPORT_SLUGS as readonly string[]).includes(slug) || SECONDARY_REPORT_SLUGS.has(slug);
}

function findMatchingTagEnd(html: string, start: number, tagName: "div" | "table" | "section"): number {
  const tags = new RegExp(`<\\/?${tagName}\\b[^>]*>`, "gi");
  tags.lastIndex = start;
  let depth = 0;
  let match: RegExpExecArray | null;

  while ((match = tags.exec(html))) {
    if (match[0].startsWith("</")) depth -= 1;
    else if (!match[0].endsWith("/>")) depth += 1;
    if (depth === 0) return tags.lastIndex;
  }

  return -1;
}

function compactReliabilityNotice(html: string, locale: Locale): string {
  const callouts = /<div\b(?=[^>]*\bclass=(['"])[^'"]*\bcallout\b[^'"]*\bwarn\b[^'"]*\1)[^>]*>/gi;
  let opening: RegExpExecArray | null;

  while ((opening = callouts.exec(html))) {
    const end = findMatchingTagEnd(html, opening.index, "div");
    if (end < 0) continue;

    const contentStart = opening.index + opening[0].length;
    const contentEnd = end - "</div>".length;
    const inner = html.slice(contentStart, contentEnd);
    const heading = inner.match(/^\s*<strong>([^<]*)<\/strong>\s*<br\s*\/?>/i);
    if (!heading || !/(?:數據|数据|資料|资料)可靠性(?:聲明|声明)/.test(heading[1])) continue;

    const details = inner.slice(heading[0].length);
    const compacted = `<details class="callout warn report-data-reliability"><summary><strong>${heading[1]}</strong><span>${L("展開查看資料來源與核實標準", locale)}</span></summary><div class="report-data-reliability__content">${details}</div></details>`;
    return `${html.slice(0, opening.index)}${compacted}${html.slice(end)}`;
  }

  return html;
}

type TableRow = ("th" | "td")[];

function getDirectTableRows(contents: string): TableRow[] {
  const tags = /<\/?(table|tr|th|td)\b[^>]*>/gi;
  const rows: TableRow[] = [];
  let tableDepth = 0;
  let currentRow: TableRow | null = null;
  let match: RegExpExecArray | null;

  while ((match = tags.exec(contents))) {
    const tagName = match[1].toLowerCase();
    const isClosing = match[0].startsWith("</");
    if (tagName === "table") {
      tableDepth += isClosing ? -1 : 1;
      continue;
    }
    if (tableDepth > 0) continue;

    if (tagName === "tr") {
      if (isClosing && currentRow) {
        rows.push(currentRow);
        currentRow = null;
      } else if (!isClosing) {
        currentRow = [];
      }
    } else if (!isClosing && currentRow) {
      currentRow.push(tagName as "th" | "td");
    }
  }

  return rows;
}

function enhanceTables(html: string, locale: Locale, editorial = false): string {
  const opening = /<table\b([^>]*)>/i.exec(html);
  if (!opening) return html;

  const start = opening.index;
  const end = findMatchingTagEnd(html, start, "table");
  if (end < 0) return html;

  const openingEnd = start + opening[0].length;
  const contentsEnd = end - "</table>".length;
  const contents = html.slice(openingEnd, contentsEnd);
  const enhancedContents = enhanceTables(contents, locale, editorial);
  let attributes = opening[1];
  let classMatch = attributes.match(/\bclass=(['"])(.*?)\1/i);
  if (editorial && !classMatch) {
    attributes += ' class="dt"';
    classMatch = attributes.match(/\bclass=(['"])(.*?)\1/i);
  } else if (editorial && classMatch && !classMatch[2].split(/\s+/).includes("dt")) {
    attributes = attributes.replace(classMatch[0], `class=${classMatch[1]}${classMatch[2]} dt${classMatch[1]}`);
    classMatch = attributes.match(/\bclass=(['"])(.*?)\1/i);
  }
  let table = `<table${attributes}>${enhancedContents}</table>`;

  if (classMatch && classMatch[2].split(/\s+/).includes("dt")) {
    const rows = getDirectTableRows(contents);
    const columnCount = Math.max(0, ...rows.map((row) => row.length));
    const isKeyValue = rows.length > 0 && rows.every((row) => row.length === 2 && row[0] === "th" && row[1] === "td");
    const markerClasses = editorial
      ? isKeyValue ? "key-value" : ""
      : rows.length >= 2 && isKeyValue ? "report-summary-table" : "report-scroll-table";
    const nextAttributes = markerClasses
      ? attributes.replace(classMatch[0], `class=${classMatch[1]}${classMatch[2]} ${markerClasses}${classMatch[1]}`)
      : attributes;
    table = `<table${nextAttributes}>${enhancedContents}</table>`;

    if (editorial) {
      const wrapperClass = isKeyValue ? "is-key-value" : `is-wide${columnCount >= 5 ? ` report-columns-${columnCount}` : ""}`;
      const scrollHint = isKeyValue ? "" : `<p class="scroll-note">${L("表格內容較寬，請在表格內向左或向右拖動查看其他欄位。", locale)}</p>`;
      const scrollLabel = L("可左右滑動查看其他欄位的表格", locale);
      table = `<div class="table-scroll ${wrapperClass} report-table-scroll"><div class="report-table-scroll__viewport" role="region" tabindex="0" aria-label="${scrollLabel}">${table}</div>${scrollHint}</div>`;
    } else if (!isKeyValue && rows.length >= 2) {
      const scrollHint = L("表格內容較寬，請在表格內向左或向右拖動查看其他欄位。", locale);
      const scrollLabel = L("可左右滑動查看其他欄位的表格", locale);
      table = `<div class="report-table-scroll"><p class="report-table-scroll__hint" aria-hidden="true">${scrollHint}</p><div class="report-table-scroll__viewport" role="region" tabindex="0" aria-label="${scrollLabel}">${table}</div></div>`;
    }
  }

  return `${html.slice(0, start)}${table}${enhanceTables(html.slice(end), locale, editorial)}`;
}

/** Add accessible horizontal scrolling to wide report tables without changing report copy. */
export function enhanceReportTables(html: string, locale: Locale, editorial = false): string {
  return enhanceTables(html, locale, editorial);
}

function cleanText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(text: string): string {
  const entities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (character) => entities[character] ?? character);
}

function renderEditorialTopics(html: string): string {
  const headings = [...html.matchAll(/<h3\b[^>]*>[\s\S]*?<\/h3>/gi)];
  if (headings.length === 0) return html;

  let result = html.slice(0, headings[0].index);
  for (let index = 0; index < headings.length; index += 1) {
    const heading = headings[index];
    const headingStart = heading.index ?? 0;
    const headingEnd = headingStart + heading[0].length;
    const bodyEnd = headings[index + 1]?.index ?? html.length;
    result += `<div class="topic-block"><div class="topic-heading">${heading[0]}</div><div class="topic-body">${html.slice(headingEnd, bodyEnd)}</div></div>`;
  }
  return result;
}

function renderEditorialChapter(section: string, index: number): string {
  const opening = section.match(/^<section\b([^>]*)>/i);
  const heading = section.match(/<h2\b[^>]*>[\s\S]*?<\/h2>/i);
  if (!opening || !heading) return section;

  const originalAttributes = opening[1];
  const originalClass = originalAttributes.match(/\bclass=(['"])(.*?)\1/i);
  const classNames = originalClass?.[2].split(/\s+/).filter(Boolean) ?? [];
  if (!classNames.includes("editorial-chapter")) classNames.push("editorial-chapter");
  const originalId = originalAttributes.match(/\bid=(['"])(.*?)\1/i)?.[2];
  const number = heading[0].match(/<[^>]*class=(['"])[^'"]*\bnum\b[^'"]*\1[^>]*>\s*(\d+)/i)?.[2];
  const id = originalId || `chapter-${number || index + 1}`;
  let attributes = originalAttributes;
  if (originalClass) {
    attributes = attributes.replace(originalClass[0], `class=${originalClass[1]}${classNames.join(" ")}${originalClass[1]}`);
  } else {
    attributes += ` class="${classNames.join(" ")}"`;
  }
  if (/\bid=(['"])[^'"]*\1/i.test(attributes)) {
    attributes = attributes.replace(/\bid=(['"])[^'"]*\1/i, `id="${id}"`);
  } else {
    attributes += ` id="${id}"`;
  }

  const railHeading = heading[0];
  const content = section.slice(opening[0].length, section.lastIndexOf("</section>"));
  const withoutHeading = content.replace(heading[0], "");
  const body = renderEditorialTopics(withoutHeading);
  return `<section${attributes}><aside class="chapter-rail">${railHeading}</aside><div class="chapter-main">${body}</div></section>`;
}

function renderEditorialChapters(html: string): string {
  const sectionOpen = /<section\b(?=[^>]*\bclass=(['"])[^'"]*\bchapter\b[^'"]*\1)[^>]*>/gi;
  const chapters: { start: number; end: number; html: string }[] = [];
  let match: RegExpExecArray | null;

  while ((match = sectionOpen.exec(html))) {
    const end = findMatchingTagEnd(html, match.index, "section");
    if (end < 0) continue;
    chapters.push({ start: match.index, end, html: html.slice(match.index, end) });
    sectionOpen.lastIndex = end;
  }

  let output = "";
  let cursor = 0;
  chapters.forEach((chapter, index) => {
    output += html.slice(cursor, chapter.start);
    output += renderEditorialChapter(chapter.html, index);
    cursor = chapter.end;
  });
  output += html.slice(cursor);
  return output;
}

function getReportFacts(body: string): { label: string; value: string }[] {
  const tables = [...body.matchAll(/<table\b([^>]*)>/gi)];
  let rows: RegExpMatchArray[] = [];

  for (const opening of tables) {
    if (!/\bclass=(['"])[^'"]*\bdt\b[^'"]*\1/i.test(opening[1])) continue;
    const start = opening.index ?? 0;
    const end = findMatchingTagEnd(body, start, "table");
    if (end < 0) continue;
    const contents = body.slice(start + opening[0].length, end - "</table>".length);
    const directRows = getDirectTableRows(contents);

    // A summary table has exactly one label/value pair per row. Comparison
    // tables can contain more <tr><th><td> matches by accident because their
    // rows have several cells, so they must never drive the hero fact ribbon.
    const isSummaryTable =
      directRows.length >= 3 &&
      directRows.every((row) => row.length === 2 && row[0] === "th" && row[1] === "td");
    if (!isSummaryTable) continue;

    const keyValueRows = [...contents.matchAll(/<tr\b[^>]*>\s*<th\b[^>]*>([\s\S]*?)<\/th>\s*<td\b[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi)];
    if (keyValueRows.length > rows.length) rows = keyValueRows;
  }
  if (rows.length === 0) return [];

  const wanted = [
    /地區|地区|校網|校网|地址|校址/,
    /類型|类型|性別|性别|辦學類別|办学类别/,
    /學費|学费|收費|收费/,
    /創校年份|创校年份|創立年份|创立年份|成立年份/,
  ];
  const selected = wanted.flatMap((pattern) => {
    const row = rows.find((item) => pattern.test(cleanText(item[1])));
    return row ? [row] : [];
  });

  // Keep the hero ribbon school-specific: the rating and full name already
  // appear elsewhere in the hero, so prefer distinct facts from the source table.
  const fallbackPriorities = [
    /學段|学段/,
    /師生比|师生比|班師比|班师比/,
    /升中|聯繫|联系|一條龍|一条龙|附屬中學|附属中学|關聯中學|关联中学|關聯小學|关联小学|直属中学|直屬中學/,
    /教學語言|教学语言|授課語言|授课语言/,
    /班級結構|班级结构|校舍\s*\/\s*班級|校舍\s*\/\s*班级/,
    /PN\s*班|幼兒班|幼儿班/,
    /雙軌制|双轨制/,
    /師資|师资|教職員|教职员|教師人數|教师人数/,
    /分校|校區網絡|校区网络|品牌規模|品牌规模/,
    /校舍設施|校舍设施|校舍面積|校舍面积|學校設施|学校设施|校舍地址|校舍/,
    /學生規模|学生规模|學額|学额/,
  ];
  for (const pattern of fallbackPriorities) {
    if (selected.length >= 4) break;
    const row = rows.find((item) => pattern.test(cleanText(item[1])) && !selected.includes(item));
    if (row) selected.push(row);
  }

  return selected.map((row) => ({ label: cleanText(row[1]), value: row[2] }));
}

function getEditorialFactValue(fact: { label: string; value: string }): string {
  const plainValue = cleanText(fact.value).replace(/\s*(?:✅|✔️)\s*[\s\S]*$/, "").trim();
  const segments = plainValue.split(/\s*[·•]\s*/).filter(Boolean);
  const firstSegment = segments[0] ?? plainValue;

  if (/地區|地区|校網|校网|創校年份|创校年份|創立年份|创立年份|成立年份|學段|学段/.test(fact.label)) {
    return firstSegment;
  }
  if (/學費|学费|收費|收费/.test(fact.label)) {
    return firstSegment.replace(/[（(][^）)]*[）)]/g, "").trim();
  }
  if (/類型|类型|性別|性别|辦學類別|办学类别/.test(fact.label)) {
    return segments.slice(0, 3).join(" · ");
  }
  return plainValue;
}

function getSecondaryHeroFacts(slug: string, hero: string, locale: Locale): { label: string; value: string }[] {
  const report = SECONDARY_REPORT_META.get(slug);
  if (!report) return [];

  const subtitle = hero.match(/<p\b[^>]*class=(['"])[^'"]*\bsub\b[^'"]*\1[^>]*>([\s\S]*?)<\/p>/i)?.[2] ?? "";
  const coursePattern = /HKDSE|IBDP?|MYP|IAL|A-Level|GCSE|HSC|DIA|Baccalaur[eé]at|BTEC/i;
  const courseParts = report.h.split(/\s*·\s*/).filter((part) => coursePattern.test(part));
  const fallbackParts = cleanText(subtitle).split(/\s*·\s*/).filter((part) => coursePattern.test(part));
  const course = (courseParts.length ? courseParts : fallbackParts).slice(0, 2).join(" · ");

  return [
    { label: L("地區", locale), value: L(report.d, locale) },
    { label: L("辦學類型", locale), value: L(report.h.split(/\s*·\s*/)[0], locale) },
    ...(course ? [{ label: L("課程路線", locale), value: L(course, locale) }] : []),
  ];
}

function getSchoolNetwork(facts: { label: string; value: string }[]): { fact: { label: string; value: string }; number: string; caption: string } | null {
  const fact = facts.find(({ label, value }) => /校網|校网/.test(label) && /\d+\s*(?:校網|校网)/.test(cleanText(value)));
  if (!fact) return null;

  const value = cleanText(fact.value);
  const number = value.match(/(\d+)\s*(?:校網|校网)/)?.[1];
  if (!number) return null;

  const caption = value
    .split(/\s*[·•]\s*/)
    .filter((part) => !new RegExp(`${number}\\s*(?:校網|校网)`).test(part))
    .map((part) => part.replace(/\s*✅.*$/, "").trim())
    .filter(Boolean)
    .slice(0, 2)
    .join(" · ");

  return { fact, number, caption };
}

export function buildEditorialHeroHtml(hero: string, body: string, locale: Locale, free: boolean, slug = ""): string {
  const tier = hero.match(/<div\b[^>]*class=(['"])[^'"]*\btier-mega\b[^'"]*\1[^>]*>([\s\S]*?)<\/div>/i)?.[2] ?? "";
  const originalTitle = hero.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "";
  const title = cleanText(originalTitle)
    .replace(/\s*深度择校报告\s*$/i, "")
    .replace(/\s*深度擇校報告\s*$/i, "")
    .trim();
  const subtitle = hero.match(/<p\b[^>]*class=(['"])[^'"]*\bsub\b[^'"]*\1[^>]*>([\s\S]*?)<\/p>/i)?.[2] ?? "";
  const [englishName, ...details] = cleanText(subtitle).split(/\s*·\s*/);
  const isUnrated = /暂缓评级|暂不评级|未作评级|未评级|暂无评级|暫緩評級|暫不評級|未作評級|未評級|暫無評級/i.test(cleanText(tier));
  const tierGrade = isUnrated ? null : cleanText(tier).match(/S|A\+?|B|C/i)?.[0] ?? "—";
  const isSecondaryReport = /中学|中學/.test(`${title} ${cleanText(tier)}`);
  const facts = isSecondaryReport ? getSecondaryHeroFacts(slug, hero, locale) : getReportFacts(body);
  const schoolNetwork = getSchoolNetwork(facts);
  const freeBadge = free ? `<span class="hero-free-badge">${L("本报告完全免费", locale)}</span>` : "";
  const secondaryRatingStatus = isSecondaryReport
    ? `<span class="hero-rating-status" aria-label="${escapeHtml(L("中学评级状态：暂不评级；统一评级方法仍在研究与校准中，这不代表学校质量结论", locale))}">${escapeHtml(L("评级状态：暂不评级", locale))}</span>`
    : "";
  const titleMarkup = escapeHtml(title).replace(
    /^(.*?)(官立小學|官立小学)$/,
    (_match, prefix: string, suffix: string) => `${prefix}<br>${suffix}`
  );
  const ribbonFacts = schoolNetwork
    ? facts.filter((fact) => fact !== schoolNetwork.fact).slice(0, 4)
    : isSecondaryReport
      ? facts.slice(0, 4)
      : facts;
  const factMarkup = ribbonFacts.map((fact) => {
    const fullValue = cleanText(fact.value);
    const summaryValue = getEditorialFactValue(fact);
    return `<div class="fact"><span class="fact-label">${escapeHtml(fact.label)}</span><span class="fact-value" aria-label="${escapeHtml(`${fact.label}：${fullValue}`)}">${escapeHtml(summaryValue)}</span></div>`;
  }).join("");
  const secondaryFactClass = isSecondaryReport ? " fact-ribbon--secondary" : "";
  const factsRibbon = factMarkup ? `<div class="fact-ribbon fact-ribbon--${ribbonFacts.length}${secondaryFactClass}">${factMarkup}</div>` : "";
  const indexLabel = schoolNetwork ? L("所屬校網", locale) : L(isUnrated ? "暂缓评级" : "報告評級", locale);
  const indexNumber = schoolNetwork
    ? schoolNetwork.number
    : isUnrated
      ? L("暂缓", locale)
      : tierGrade ?? "—";
  const indexCaption = schoolNetwork?.caption
      ? `<span class="hero-index-caption">${escapeHtml(schoolNetwork.caption)}</span>`
      : "";

  return `<section class="shell hero"><div class="hero-grid${isSecondaryReport ? " hero-grid--secondary" : ""}"><div><div class="hero-kicker">${tier}${secondaryRatingStatus}${freeBadge}</div><h1 id="school-title">${titleMarkup}</h1><div class="english-name">${escapeHtml(englishName ?? "")}</div>${details.length ? `<p class="dek">${escapeHtml(details.join(" · "))}</p>` : ""}</div>${isSecondaryReport ? "" : `<aside class="hero-index${isUnrated ? " hero-index--unrated" : ""}" aria-label="${escapeHtml(indexLabel)}"><span class="hero-index-label">${escapeHtml(indexLabel)}</span><span class="hero-index-number">${escapeHtml(indexNumber)}</span>${indexCaption}</aside>`}</div>${factsRibbon}</section>`;
}

export function reportChapterItems(html: string): { id: string; title: string }[] {
  const items: { id: string; title: string }[] = [];
  const chapterRegex = /<section\b[^>]*\bid=(['"])(chapter-\d+)\1[^>]*>[\s\S]*?<aside\b[^>]*class=(['"])[^'"]*\bchapter-rail\b[^'"]*\3[^>]*>([\s\S]*?)<\/aside>/gi;
  let match: RegExpExecArray | null;
  while ((match = chapterRegex.exec(html))) {
    const heading = match[4].match(/<h2\b[^>]*>([\s\S]*?)<\/h2>/i)?.[1] ?? "";
    const withoutBadges = heading
      .replace(/<[^>]*class=(['"])[^'"]*\bnum\b[^'"]*\1[^>]*>[\s\S]*?<\/[^>]+>/i, "")
      .replace(/<[^>]*class=(['"])[^'"]*\bcal-badge\b[^'"]*\1[^>]*>[\s\S]*?<\/[^>]+>/i, "")
      .replace(/<[^>]*class=(['"])[^'"]*\bexpert-tag\b[^'"]*\1[^>]*>[\s\S]*?<\/[^>]+>/i, "");
    // 章节号统一写在 <span class="num"> 里（全站 1935 个标题皆如此），
    // 因此不能再按「标题开头的数字」剥编号——否则像「2027/28 K1 报名」这类
    // 以年份开头的标题会被截成「/28 K1 报名」。
    const title = cleanText(withoutBadges);
    if (title) items.push({ id: match[2], title });
  }
  return items;
}

function simplifyRadarCharts(html: string): string {
  return html.replace(
    /<svg\b([^>]*\bclass=(['"])[^'"]*\bradar-svg\b[^'"]*\2[^>]*)>([\s\S]*?)<\/svg>/gi,
    (match: string, attributes: string, _quote: string, contents: string) => {
      const labels = [...contents.matchAll(/<text\b[^>]*>([\s\S]*?)<\/text>/gi)]
        .map((text) => cleanText(text[1]))
        .filter(Boolean);
      if (labels.length === 0) return match;

      // Keep the five axis labels on the chart, but keep them inside the SVG
      // canvas so they cannot spill into the adjacent legend on narrow screens.
      const chartWithLabels = contents.replace(
        /<text\b([^>]*)>([\s\S]*?)<\/text>/gi,
        (_textMatch: string, textAttributes: string, text: string) => {
          const label = cleanText(text);
          if (!label) return "";
          const characters = [...label];
          const compactLabel = characters.length > 4 ? `${characters.slice(0, 4).join("")}…` : label;
          const xMatch = textAttributes.match(/\bx=(['"])(-?[\d.]+)\1/i);
          const anchor = textAttributes.match(/\btext-anchor=(['"])([^'"]+)\1/i)?.[2] ?? "start";
          let adjustedAttributes = textAttributes;
          if (xMatch) {
            const x = Number(xMatch[2]);
            const nextX =
              anchor === "start" && x > 210 ? 210 :
              anchor === "end" && x < 66 ? 66 :
              x;
            if (nextX !== x) {
              adjustedAttributes = textAttributes.replace(xMatch[0], `x=${xMatch[1]}${nextX}${xMatch[1]}`);
            }
          }
          return `<text${adjustedAttributes}>${escapeHtml(compactLabel)}</text>`;
        }
      );
      const accessibleAttributes = attributes.includes("aria-label")
        ? attributes
        : `${attributes} aria-label="${escapeHtml(labels.join("、"))}"`;
      return `<svg${accessibleAttributes}>${chartWithLabels}</svg>`;
    }
  );
}

function annotateEvidenceMarkers(html: string, locale: Locale): string {
  const sourceLabel = escapeHtml(L("來源說明", locale));
  const communityLabel = escapeHtml(L("公開分享", locale));
  const pendingLabel = escapeHtml(L("待核", locale));
  let result = html.replace(
    /<p\b([^>]*\bsource-note\b[^>]*)>(\s*)/gi,
    (_match, attributes: string, whitespace: string) =>
      `<p${attributes}>${whitespace}<span class="report-evidence-label report-evidence-label--source" aria-label="${sourceLabel}">${sourceLabel}</span> `
  );

  result = result.replace(
    /<span\b([^>]*class=(['"])[^'"]*\b(?:expert-tag|cal-badge)\b[^'"]*\2[^>]*)>/gi,
    (_match, attributes: string) => {
      if (/\bdata-evidence-kind=/.test(attributes)) return `<span${attributes}>`;
      return `<span${attributes} data-evidence-kind="analysis" aria-label="${escapeHtml(L("平台分析", locale))}">`;
    }
  );

  result = result.replace(
    /(?<![\p{L}])家長分享(?![\p{L}])/gu,
    `<span class="report-evidence-label report-evidence-label--community" aria-label="${communityLabel}">${communityLabel}</span>`
  );
  result = result.replace(
    /(?<![\p{L}])家长分享(?![\p{L}])/gu,
    `<span class="report-evidence-label report-evidence-label--community" aria-label="${communityLabel}">${communityLabel}</span>`
  );
  result = result.replace(
    /(?<![\p{L}])待核(?![\p{L}])/gu,
    `<span class="report-evidence-label report-evidence-label--pending" aria-label="${pendingLabel}">${pendingLabel}</span>`
  );
  return result;
}

/** Presentation-only enhancements shared by free content and authorized premium content. */
export function enhanceReportHtml(html: string, locale: Locale, editorial = false): string {
  const simplifiedRadar = simplifyRadarCharts(html);
  const compacted = compactReliabilityNotice(simplifiedRadar, locale);
  const tables = enhanceReportTables(compacted, locale, editorial);
  const chapters = editorial ? renderEditorialChapters(tables) : tables;
  return annotateEvidenceMarkers(chapters, locale);
}
