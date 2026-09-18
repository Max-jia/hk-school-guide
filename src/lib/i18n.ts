import * as OpenCC from "opencc-js";

// 站点双语架构:繁體(香港)为主版本 + 简体并行版本
//
// 内容源以简体为主(既有 41 篇热文、127 份报告),渲染时按 locale 转换:
//   tc = 繁體(香港)  ← 主版本,占根路径,canonical / x-default 都指向它
//   sc = 简体        ← /cn 前缀,给内地来港家庭
//
// 站点既有 lib/zh.ts 是纯浏览器端切换,Google 抓不到;这里是服务端渲染期的转换,
// 两个语言各自有可抓取的 URL 和 hreflang 配对。

export type Locale = "tc" | "sc";
export const DEFAULT_LOCALE: Locale = "tc";
export const LOCALES: readonly Locale[] = ["tc", "sc"] as const;

type LocaleMeta = {
  /** <html lang> 用值 */
  htmlLang: string;
  /** hreflang 用值 */
  hreflang: string;
  /** URL 前缀(主版本为空) */
  prefix: string;
  /** 语言切换器上显示的本语言名 */
  label: string;
  /** openGraph locale */
  ogLocale: string;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  tc: { htmlLang: "zh-Hant-HK", hreflang: "zh-Hant-HK", prefix: "", label: "繁體", ogLocale: "zh_HK" },
  sc: { htmlLang: "zh-Hans-CN", hreflang: "zh-Hans", prefix: "/cn", label: "简体", ogLocale: "zh_CN" },
};

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "tc" || v === "sc";
}

// ── 简繁转换 ─────────────────────────────────────────────
// s2hk 而非 s2tw:这是香港站,用香港字形标准(裏/為/着),避免台湾用词。
const _toTrad = OpenCC.Converter({ from: "cn", to: "hk" });
const _toSimp = OpenCC.Converter({ from: "hk", to: "cn" });

// OpenCC 的 s2hk 输出采用「日式」字形:説 / 税 / 脱 / 悦 / 兑 / 麪。
// 香港报刊、教育局文件和一般家长读到的是 說 / 稅 / 脫 / 悅 / 兌 / 麵。
// 这里回正,避免整站繁体看起来像日文用字(实测未回正前站内有 1590 处「説」)。
const HK_GLYPH_FIX: Record<string, string> = {
  "説": "說",
  "税": "稅",
  "脱": "脫",
  "悦": "悅",
  "兑": "兌",
  "麪": "麵",
};
const HK_GLYPH_RE = /[説税脱悦兑麪]/g;

// 另有两类 s2hk 处理不了的情况:
//   1. 户 / 钟 完全不转换(户→戶、分钟→分鐘)
//   2. 钟 有歧义:粤语「钟意」要作「鍾意」,其余(分钟/钟表/时钟)作「鐘」
// 先把粤语词挑出来,再做无条件替换。这两个字都属简体专用字,
// 对已经是繁体的文本不会造成误伤。
const HK_PHRASE_FIX: [RegExp, string][] = [
  [/钟意/g, "鍾意"],
  [/钟/g, "鐘"],
  [/户/g, "戶"],
];

function normalizeHk(s: string): string {
  let out = s.replace(HK_GLYPH_RE, (c) => HK_GLYPH_FIX[c] ?? c);
  for (const [re, to] of HK_PHRASE_FIX) out = out.replace(re, to);
  return out;
}

const memo = new Map<string, string>();

/**
 * 把一段文字转换到目标 locale。
 * 内容源简繁混杂(旧标题有繁体、正文以简体为主),两个方向都做归一化:
 *   tc → s2hk(已是繁体的部分原样保留)
 *   sc → t2s(把残留的繁体归一化)
 */
export function L<T extends string | undefined | null>(text: T, locale: Locale): T {
  if (!text) return text;
  const key = locale + "\u0000" + text;
  const hit = memo.get(key);
  if (hit !== undefined) return hit as T;
  let out: string;
  try {
    out = locale === "tc" ? normalizeHk(_toTrad(text)) : _toSimp(text);
  } catch {
    out = text;
  }
  memo.set(key, out);
  return out as T;
}

/** 递归转换对象里所有字符串(用于 schools / report-meta 这类数据文件) */
export function localizeDeep<T>(value: T, locale: Locale): T {
  if (typeof value === "string") return L(value, locale) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => localizeDeep(v, locale)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = localizeDeep(v, locale);
    return out as T;
  }
  return value;
}

// ── 路径 ────────────────────────────────────────────────

/** 把站内路径映射到指定语言的 URL: localeHref("/blog/x", "sc") → "/cn/blog/x" */
export function localeHref(path: string, locale: Locale): string {
  const clean = "/" + path.replace(/^\/+/, "");
  const bare = clean === "/" ? "" : clean;
  const url = LOCALE_META[locale].prefix + bare;
  return url === "" ? "/" : url;
}

/** 语言切换目标:同一页面切到另一种语言 */
export function otherLocale(locale: Locale): Locale {
  return locale === "tc" ? "sc" : "tc";
}

/**
 * hreflang 配对。canonical 由各页面自己指定(当前语言),
 * 这里给出各语言版本 + x-default(指向主版本繁體)。
 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    "zh-Hant-HK": localeHref(path, "tc"),
    "zh-Hans": localeHref(path, "sc"),
    "x-default": localeHref(path, DEFAULT_LOCALE),
  };
}

// ── 站内 UI 文案 ─────────────────────────────────────────
// 统一用简体书写,渲染时按 locale 转换,避免同一句话维护两份。

export const UI = {
  siteName: "港学荟",
  home: "首页",
  reports: "深度报告",
  districts: "分区盘点",
  tools: "择校工具",
  compare: "学校对比",
  questions: "面试题库",
  blog: "热文",
  readMore: "阅读",
} as const;

/** 取 UI 文案并转换到目标语言 */
export function t(key: keyof typeof UI, locale: Locale): string {
  return L(UI[key], locale);
}
