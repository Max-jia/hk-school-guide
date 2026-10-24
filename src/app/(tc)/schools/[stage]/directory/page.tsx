import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolDirectoryPage from "@/components/schools/SchoolDirectoryPage";
import { languageAlternates } from "@/lib/i18n";
import { SCHOOL_STAGES, type SchoolStage } from "@/lib/school-directory-pilot";

function isStage(stage: string): stage is SchoolStage {
  return Object.prototype.hasOwnProperty.call(SCHOOL_STAGES, stage);
}

export function generateStaticParams() {
  return Object.keys(SCHOOL_STAGES).map((stage) => ({ stage }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  if (!isStage(stage)) return { title: "找不到學校名錄", robots: { index: false, follow: false } };
  const label = SCHOOL_STAGES[stage].label;
  const path = `/schools/${stage}/directory`;
  return {
    title: `香港${label}學校名錄｜按校名與地區搜尋`,
    description: `搜尋香港${label}學校的基本資料、地區與官方來源。深度報告另列，方便先找學校，再比較課程、入學和升學安排。`,
    alternates: { canonical: path, languages: languageAlternates(path) },
  };
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  if (!isStage(stage)) notFound();
  return <SchoolDirectoryPage stage={stage} locale="tc" />;
}
