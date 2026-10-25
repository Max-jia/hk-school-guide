import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolDirectoryPage, { schoolDirectoryMetadata } from "@/components/schools/SchoolDirectoryPage";
import { generateStaticParams } from "@/app/(tc)/schools/[stage]/directory/page";
import { L } from "@/lib/i18n";
import { SCHOOL_STAGES } from "@/lib/school-directory-pilot";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }): Promise<Metadata> {
  const { stage } = await params;
  const config = SCHOOL_STAGES[stage as keyof typeof SCHOOL_STAGES];
  if (!config) return { title: L("找不到学校名录", "sc"), robots: { index: false, follow: false } };
  return schoolDirectoryMetadata(stage as keyof typeof SCHOOL_STAGES, "sc");
}

export default async function Page({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  if (!Object.prototype.hasOwnProperty.call(SCHOOL_STAGES, stage)) notFound();
  return <SchoolDirectoryPage stage={stage as keyof typeof SCHOOL_STAGES} locale="sc" />;
}
