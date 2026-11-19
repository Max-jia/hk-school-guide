// Lightweight locale and URL helpers: safe to import in interactive navigation.
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
