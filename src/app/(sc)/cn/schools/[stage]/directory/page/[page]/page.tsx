import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import SchoolDirectoryPage, { schoolDirectoryMetadata } from "@/components/schools/SchoolDirectoryPage";
import { localeHref } from "@/lib/i18n";
import { directoryPagePath } from "@/lib/school-directory-pagination";
import { resolveDirectoryPage, directoryStaticPages } from "@/lib/school-directory-pages";

export function generateStaticParams() { return directoryStaticPages(); }
export const dynamicParams = false;
type Props = { params: Promise<{ stage: string; page: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stage, page } = await params;
  const resolved = resolveDirectoryPage(stage, page);
  return resolved ? schoolDirectoryMetadata(resolved.stage, "sc", resolved.page) : { robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { stage, page } = await params;
  const resolved = resolveDirectoryPage(stage, page);
  if (!resolved) notFound();
  if (resolved.page === 1) permanentRedirect(localeHref(directoryPagePath(resolved.stage), "sc"));
  return <SchoolDirectoryPage stage={resolved.stage} page={resolved.page} locale="sc" />;
}
