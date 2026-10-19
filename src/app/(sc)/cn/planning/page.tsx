import { createPageMetadata } from "@/lib/page-metadata";
import EducationPlanningPage from "@/components/EducationPlanningPage";

export const metadata = createPageMetadata({
  title: "香港升学规划：先看 DSE、IB、A-Level 方向，再选学校",
  description: "从幼儿园、小学到中学，先了解 DSE、IB 或 A-Level 路线，再按阶段、地区和课程方向查找学校与规划下一步。",
  path: "/planning",
  locale: "sc",
});

export default async function Page({ searchParams }: PageProps<"/cn/planning">) {
  const query = await searchParams;
  return <EducationPlanningPage locale="sc" stage={query.stage} route={query.route} />;
}
