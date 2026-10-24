import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolStageHub from "@/components/schools/SchoolStageHub";
import { generateStaticParams } from "@/app/(tc)/schools/[stage]/page";
import { languageAlternates, L } from "@/lib/i18n";
import { SCHOOL_STAGES } from "@/lib/school-directory-pilot";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  const config = SCHOOL_STAGES[stage as keyof typeof SCHOOL_STAGES];
  if (!config) return { title: L("找不到学段", "sc"), robots: { index: false, follow: false } };
  const path = `/schools/${stage}`;
  return {
    title: L(`香港${config.label}选校指南｜学校名录、入学攻略与深度报告`, "sc"),
    description: L(`按${config.label}阶段浏览香港学校基本资料、选校攻略与深度报告。地址、办学类别和年度资料附官方来源，方便家长逐项核对。`, "sc"),
    alternates: { canonical: `/cn${path}`, languages: languageAlternates(path) },
  };
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const config = SCHOOL_STAGES[stage as keyof typeof SCHOOL_STAGES];
  if (!config) notFound();
  return <SchoolStageHub stage={stage as keyof typeof SCHOOL_STAGES} locale="sc" />;
}
