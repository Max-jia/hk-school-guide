import type { Locale } from "@/lib/locale";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogListFilters from "@/components/BlogListFilters";

export default function BlogList({ locale = "tc" }: { locale?: Locale }) {
  return <main className="w-full">
    <SiteHeader locale={locale} />
    <BlogListFilters locale={locale} />
    <SiteFooter locale={locale} />
  </main>;
}
