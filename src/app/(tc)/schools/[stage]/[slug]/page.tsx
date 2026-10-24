import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolProfilePage, { schoolProfileMetadata } from "@/components/schools/SchoolProfilePage";
import { DIRECTORY_SCHOOLS, type SchoolStage } from "@/lib/school-directory-pilot";

export const dynamicParams = false;

export function generateStaticParams() {
  return DIRECTORY_SCHOOLS.map(({ stage, slug }) => ({ stage, slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ stage: string; slug: string }> }): Promise<Metadata> {
  const { stage, slug } = await params;
  return schoolProfileMetadata(stage, slug, "tc");
}

export default async function Page({ params }: { params: Promise<{ stage: string; slug: string }> }) {
  const { stage, slug } = await params;
  const school = DIRECTORY_SCHOOLS.find((entry) => entry.stage === stage && entry.slug === slug);
  if (!school) notFound();
  return <SchoolProfilePage stage={stage as SchoolStage} slug={slug} locale="tc" />;
}
