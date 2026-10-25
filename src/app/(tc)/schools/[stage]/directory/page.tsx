import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolDirectoryPage, { schoolDirectoryMetadata } from "@/components/schools/SchoolDirectoryPage";
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
  return schoolDirectoryMetadata(stage, "tc");
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  if (!isStage(stage)) notFound();
  return <SchoolDirectoryPage stage={stage} locale="tc" />;
}
