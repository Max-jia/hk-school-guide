import { Converter } from "opencc-js/t2cn";
import { normalizeSearch } from "./normalize-search";

// Match the existing Hong Kong Traditional -> Simplified search semantics.
const toSimplified = Converter({ from: "hk", to: "cn" });
export function normalizeBlogQuery(value: string): string {
  return normalizeSearch(toSimplified(value).replace(/梁𨱇琚/g, "梁銶琚"));
}
