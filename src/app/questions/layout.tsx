import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "香港小学及幼稚园面试题库",
  description:
    "按学校、类型、评级筛选香港小学及幼稚园面试真题：直资、私立、资助与名幼面试经验，家长可逐题对照准备。",
  alternates: { canonical: "/questions" },
};

export default function QuestionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
