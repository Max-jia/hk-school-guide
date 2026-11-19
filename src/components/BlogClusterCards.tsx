import type { Locale } from "@/lib/locale";
import { clusterCardsData } from "@/lib/blog-cluster-cards-data";
import BlogClusterCardsView from "./BlogClusterCardsView";

export default function BlogClusterCards({ locale }: { locale: Locale }) {
  return <BlogClusterCardsView {...clusterCardsData(locale)} />;
}
