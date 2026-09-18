import TcHome from "@/app/(tc)/page";

// 简体版首页:复用主版本组件,locale 驱动繁简转换。
export default function Page() {
  return <TcHome locale="sc" />;
}
