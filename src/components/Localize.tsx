import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { L, type Locale } from "@/lib/i18n";

// 服务端渲染期把 JSX 里的文字节点转换到目标语言。
//
// 为什么用包装层而不是逐条改字符串:站点现有正文以简体为源,UI 文案散落在
// 十几个页面里。逐条包 L() 改动量大且容易漏;这里统一在渲染边界做一次转换,
// 页面代码保持原样。转换结果有 memo,重复字符串不会重复跑 OpenCC。
//
// 注意边界:
//   - 只处理 children 里的文字节点,不碰 props(alt / aria-label / placeholder 需自行 L())
//   - dangerouslySetInnerHTML 的内容不在 children 里,正文由页面显式调用 L()
//   - 客户端组件内部的文案不在服务端树里,由各组件接收 locale 自行转换

const SKIP_TAGS = new Set(["script", "style"]);

function walk(node: ReactNode, locale: Locale): ReactNode {
  if (typeof node === "string") return L(node, locale);
  if (typeof node === "number" || node === null || node === undefined || typeof node === "boolean") return node;
  if (Array.isArray(node)) return node.map((n) => walk(n, locale));
  if (!isValidElement(node)) return node;

  const el = node as ReactElement<{ children?: ReactNode }>;
  const type = el.type;
  if (typeof type === "string" && SKIP_TAGS.has(type)) return el;
  if (el.props?.children === undefined) return el;

  // 客户端组件(函数组件/对象类型)在服务端只是一层引用,内部文案由组件自己处理,
  // 只往下转换它接收到的 children。
  const children = Children.map(el.props.children, (c) => walk(c, locale));
  return cloneElement(el, {}, children);
}

export default function Localize({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <>{walk(children, locale)}</>;
}
