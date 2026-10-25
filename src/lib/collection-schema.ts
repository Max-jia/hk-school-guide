import { L, localeHref, type Locale } from "./i18n";
import { SITE_URL } from "./seo";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "./structured-data";

/** List only links a visitor can actually find on this page. */
export function collectionSchema({ path, title, description, locale, breadcrumbs, items }: {
  path: string; title: string; description?: string; locale: Locale;
  breadcrumbs: { name: string; path: string }[];
  items?: { name: string; path: string }[];
}) {
  const listId = `${SITE_URL}${localeHref(path, locale)}#items`;
  return jsonLdGraph(locale, [
    webPageJsonLd({ path, title, description, locale, type: "CollectionPage", mainEntity: items ? { "@id": listId } : undefined }),
    breadcrumbJsonLd(path, breadcrumbs, locale),
    ...(items ? [{ "@type": "ItemList", "@id": listId, numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: L(item.name, locale), url: `${SITE_URL}${localeHref(item.path, locale)}` })),
    }] : []),
  ]);
}
