import EducationPlanningPage from "@/components/EducationPlanningPage";

export default async function Page({ searchParams }: PageProps<"/planning">) {
  const query = await searchParams;
  return <EducationPlanningPage locale="tc" stage={query.stage} route={query.route} />;
}
