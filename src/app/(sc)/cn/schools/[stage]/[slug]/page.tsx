import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolProfilePage from "@/components/schools/SchoolProfilePage";
import { generateStaticParams } from "@/app/(tc)/schools/[stage]/[slug]/page";
import { DIRECTORY_SCHOOLS, type SchoolStage } from "@/lib/school-directory-pilot";
import { schoolProfileMetadata } from "@/components/schools/SchoolProfilePage";

export { generateStaticParams };

export async function generateMetadata({ params }: { params: Promise<{ stage: string; slug: string }> }): Promise<Metadata> {
  const { stage, slug } = await params;
  return schoolProfileMetadata(stage, slug, "sc");
}

export default async function Page({ params }: { params: Promise<{ stage: string; slug: string }> }) {
  const { stage, slug } = await params;
  const school = DIRECTORY_SCHOOLS.find((entry) => entry.stage === stage && entry.slug === slug);
  if (!school) notFound();
  return <SchoolProfilePage stage={stage as SchoolStage} slug={slug} locale="sc" />;
}
