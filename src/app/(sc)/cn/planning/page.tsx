import EducationPlanningPage from "@/components/EducationPlanningPage";

export default async function Page({ searchParams }: PageProps<"/cn/planning">) {
  const query = await searchParams;
  return <EducationPlanningPage locale="sc" stage={query.stage} route={query.route} />;
}
