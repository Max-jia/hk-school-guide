import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolStageHub from "@/components/schools/SchoolStageHub";
import { L, languageAlternates } from "@/lib/i18n";
import { SCHOOL_STAGES, type SchoolStage } from "@/lib/school-directory-pilot";

function isStage(stage: string): stage is SchoolStage {
  return Object.prototype.hasOwnProperty.call(SCHOOL_STAGES, stage);
}

export function generateStaticParams() {
  return Object.keys(SCHOOL_STAGES).map((stage) => ({ stage }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  if (!isStage(stage)) return { title: L("找不到學段", "tc"), robots: { index: false, follow: false } };
  const config = SCHOOL_STAGES[stage];
  const title = `香港${config.label}選校指南｜學校名錄、入學攻略與深度報告`;
  const description = `按${config.label}階段瀏覽香港學校基本資料、選校攻略與深度報告。地址、辦學類別和年度資料附官方來源，方便家長逐項核對。`;
  const path = `/schools/${stage}`;
  return { title, description, alternates: { canonical: path, languages: languageAlternates(path) } };
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  if (!isStage(stage)) notFound();
  return <SchoolStageHub stage={stage} locale="tc" />;
}
