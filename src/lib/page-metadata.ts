import type { Metadata } from "next";
import { L, LOCALE_META, languageAlternates, localeHref, type Locale } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  indexable?: boolean;
};

/** Build consistent page-specific metadata instead of inheriting the homepage tags. */
export function createPageMetadata({
  title,
  description,
  path,
  locale,
  indexable = true,
}: PageMetadataInput): Metadata {
  const localizedTitle = L(title, locale);
  const localizedDescription = L(description, locale);
  const siteName = L("港学荟", locale);
  const url = localeHref(path, locale);
  const socialTitle = `${localizedTitle} | ${siteName}`;
  const socialImage = "/og-home.png";

  return {
    title: localizedTitle,
    description: localizedDescription,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    robots: { index: indexable, follow: true },
    openGraph: {
      type: "website",
      siteName,
      title: socialTitle,
      description: localizedDescription,
      url: `${SITE_URL}${url}`,
      images: [{ url: socialImage, width: 1200, height: 630, alt: siteName }],
      locale: LOCALE_META[locale].ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: localizedDescription,
      images: [socialImage],
    },
  };
}
