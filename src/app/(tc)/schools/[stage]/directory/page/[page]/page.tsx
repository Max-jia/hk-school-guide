import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import SchoolDirectoryPage, { schoolDirectoryMetadata } from "@/components/schools/SchoolDirectoryPage";
import { directoryPagePath } from "@/lib/school-directory-pagination";
import { directoryStaticPages, resolveDirectoryPage } from "@/lib/school-directory-pages";

export const dynamicParams = false;
type Props = { params: Promise<{ stage: string; page: string }> };

export function generateStaticParams() {
  return directoryStaticPages();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stage, page } = await params;
  const resolved = resolveDirectoryPage(stage, page);
  return resolved ? schoolDirectoryMetadata(resolved.stage, "tc", resolved.page) : { robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { stage, page } = await params;
  const resolved = resolveDirectoryPage(stage, page);
  if (!resolved) notFound();
  if (resolved.page === 1) permanentRedirect(directoryPagePath(resolved.stage));
  return <SchoolDirectoryPage stage={resolved.stage} page={resolved.page} locale="tc" />;
}
