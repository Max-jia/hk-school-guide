import type { EducationRoute } from "@/components/EducationPlanningPage";

export type SecondaryAuditStatus = "system" | "school" | "annual";

export type SecondaryPlanningField = {
  id: string;
  label: string;
  question: string;
  status: SecondaryAuditStatus;
  routes: EducationRoute[];
  sourceRequirement: string;
};

// Public data contract: a school must have evidence for these fields before
// it enters route recommendations. This does not claim any school is complete.
export const SECONDARY_PLANNING_FIELDS: SecondaryPlanningField[] = [
  { id: "identity", label: "学校身份与收生路径", question: "学校类别、收生学段、性别、校网，以及是否参加 SSPA／自行分配／非派位。", status: "school", routes: ["dse", "ib", "a-level"], sourceRequirement: "学校官方资料 + 教育局当届制度文件" },
  { id: "programme", label: "实际开办的课程", question: "学校实际开办 DSE、IB 或 A-Level 的哪一个学段，是否有连续衔接。", status: "school", routes: ["dse", "ib", "a-level"], sourceRequirement: "学校课程文件／招生简章" },
  { id: "subjects", label: "科目与评核安排", question: "选修科、考试局、语言、评核方式及每年是否有变动。", status: "school", routes: ["dse", "ib", "a-level"], sourceRequirement: "学校 subject guide／考试局官方资料" },
  { id: "admission", label: "收生要求与时间线", question: "申请资格、文件、面试／测试、截止日期及结果通知时间。", status: "annual", routes: ["dse", "ib", "a-level"], sourceRequirement: "当届学校公告；日期必须逐年更新" },
  { id: "cost", label: "学费与全成本", question: "学费、考试费、校本收费、交通、住宿及额外支援成本。", status: "annual", routes: ["dse", "ib", "a-level"], sourceRequirement: "当届收费表 + 学校书面说明" },
  { id: "support", label: "语言与学习支援", question: "实际授课语言、转轨支援、SEN／NCS服务及家庭需要配合的部分。", status: "school", routes: ["dse", "ib", "a-level"], sourceRequirement: "学校支援政策 + 家长须向校方核实事项" },
  { id: "outcomes", label: "升学出口与限制", question: "本地、非联招、海外及职业专才出口；区分学校公布数据与个人机会。", status: "school", routes: ["dse", "ib", "a-level"], sourceRequirement: "学校年度报告 + 目标院校／JUPAS官方要求" },
  { id: "provenance", label: "来源与核验记录", question: "来源网址、资料类型、适用学年、核验日期、核验人及仍有疑问的地方。", status: "system", routes: ["dse", "ib", "a-level"], sourceRequirement: "每个学校字段都必须保留来源，不接受无出处摘要" },
];

export function getSecondaryPlanningFields(route?: EducationRoute): SecondaryPlanningField[] {
  return route ? SECONDARY_PLANNING_FIELDS.filter((field) => field.routes.includes(route)) : SECONDARY_PLANNING_FIELDS;
}
