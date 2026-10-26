"use client";

import { useSyncExternalStore } from "react";

const EVENT = "hksg:directory-query";
function subscribe(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(EVENT, callback);
  return () => { window.removeEventListener("popstate", callback); window.removeEventListener(EVENT, callback); };
}
const snapshot = () => window.location.search;
const serverSnapshot = () => "";

/** Keep initial HTML crawlable; read shared filters only after hydration. */
export function useDirectoryQuery() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

export function updateDirectoryQuery(query: string, replace = false) {
  const url = `${window.location.pathname}${query}`;
  window.history[replace ? "replaceState" : "pushState"](null, "", url);
  window.dispatchEvent(new Event(EVENT));
}
