import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolDirectoryPage from "@/components/schools/SchoolDirectoryPage";
import { generateStaticParams } from "@/app/(tc)/schools/[stage]/directory/page";
import { languageAlternates, L } from "@/lib/i18n";
import { SCHOOL_STAGES } from "@/lib/school-directory-pilot";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  const config = SCHOOL_STAGES[stage as keyof typeof SCHOOL_STAGES];
  if (!config) return { title: L("找不到学校名录", "sc"), robots: { index: false, follow: false } };
  const path = `/schools/${stage}/directory`;
  return {
    title: L(`香港${config.label}学校名录｜按校名与地区搜索`, "sc"),
    description: L(`搜索香港${config.label}学校的基本资料、地区与官方来源。深度报告另列，方便先找学校，再比较课程、入学和升学安排。`, "sc"),
    alternates: { canonical: `/cn${path}`, languages: languageAlternates(path) },
  };
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  if (!Object.prototype.hasOwnProperty.call(SCHOOL_STAGES, stage)) notFound();
  return <SchoolDirectoryPage stage={stage as keyof typeof SCHOOL_STAGES} locale="sc" />;
}
