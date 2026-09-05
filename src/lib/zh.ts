import { useSyncExternalStore } from "react";
import * as OpenCC from "opencc-js";

// 简繁转换引擎(opencc-js,纯前端,不动后端)
// cn = 简体 → hk = 香港繁体;两个方向都备好,搜索和切换都能用
export const s2t = OpenCC.Converter({ from: "cn", to: "hk" });
export const t2s = OpenCC.Converter({ from: "hk", to: "cn" });

// 语言偏好记在浏览器 localStorage,换设备默认简体
const KEY = "hkschool_lang";
let lang: "sc" | "tc" = "sc";
const listeners = new Set<() => void>();

function load() {
  try {
    const s = localStorage.getItem(KEY);
    if (s === "tc") lang = "tc";
  } catch {}
}
if (typeof window !== "undefined") load();

export function getLang() {
  return lang;
}

export function toggleLang() {
  lang = lang === "sc" ? "tc" : "sc";
  try {
    localStorage.setItem(KEY, lang);
  } catch {}
  listeners.forEach((l) => l());
  return lang;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

// 当前语言(简/繁),任何组件调用都会跟着切换实时更新
export function useLang(): ["sc" | "tc", () => void] {
  const v: "sc" | "tc" = useSyncExternalStore(subscribe, getLang, () => "sc");
  return [v, toggleLang];
}

// 搜索匹配:用户输入简体或繁体都能命中同一份内容
export function matchesZh(query: string, hay: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hayLo = hay.toLowerCase();
  const variants = new Set([q, s2t(q), t2s(q)]);
  for (const v of variants) {
    if (v.split("").every((c) => hayLo.includes(c))) return true;
  }
  return false;
}
