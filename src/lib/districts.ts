import type { Metadata } from "next";
import districtsData from "@/content/districts.json";
import { L, localeHref, languageAlternates, type Locale } from "./i18n";

export type District = { slug: string; zh: string; en: string; blurb: string };

export const DISTRICTS = districtsData as District[];

export function findDistrict(slug: string): District | undefined {
  return DISTRICTS.find((d) => d.slug === slug);
}

export function districtMetadata(slug: string, locale: Locale): Metadata {
  const d = findDistrict(slug);
  if (!d) return {};
  return {
    title: L(`${d.zh}小学与幼稚园盘点：校网、评级、学费、师生比`, locale),
    description: L(
      `${d.zh}（${d.en}）小学与幼稚园完整盘点：学校清单、平台评级、学费与师生比。${d.blurb}`,
      locale
    ),
    alternates: {
      canonical: localeHref(`/districts/${slug}`, locale),
      languages: languageAlternates(`/districts/${slug}`),
    },
  };
}
