"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type DirectoryAsset = {
  url: string;
  total: number;
  options: { districts: string[]; categories?: string[]; genders?: string[]; religions?: string[]; schoolNets?: string[] };
};
type State = { rows?: unknown[]; status: "idle" | "loading" | "ready" | "error" };
type Store = { state: State; listeners: Set<() => void>; pending?: Promise<void> };
const stores = new Map<string, Store>();
const serverState: State = { status: "idle" };
function getStore(url: string): Store {
  let store = stores.get(url);
  if (!store) { store = { state: serverState, listeners: new Set() }; stores.set(url, store); }
  return store;
}
function publish(store: Store, state: State) {
  store.state = state;
  store.listeners.forEach(listener => listener());
}

/** Share one immutable dataset across filters; never put it back into route props. */
export function useDirectoryData<T extends { slug: string }>(asset: DirectoryAsset, query: string) {
  const store = getStore(asset.url);
  const subscribe = useCallback((listener: () => void) => {
    store.listeners.add(listener);
    return () => { store.listeners.delete(listener); };
  }, [store]);
  const snapshot = useCallback(() => store.state, [store]);
  const state = useSyncExternalStore(subscribe, snapshot, () => serverState);
  const load = useCallback((): Promise<void> => {
    if (store.state.status === "ready") return Promise.resolve();
    if (store.pending) return store.pending;
    const retry = store.state.status === "error";
    publish(store, { status: "loading" });
    store.pending = (async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(asset.url, { cache: retry ? "reload" : "force-cache", signal: controller.signal });
        if (!response.ok) throw new Error("Directory unavailable");
        const rows: unknown = await response.json();
        if (!Array.isArray(rows) || rows.length !== asset.total || !rows.every(row => row && typeof row.slug === "string")) throw new Error("Invalid directory");
        publish(store, { rows, status: "ready" });
      } catch {
        publish(store, { status: "error" });
      } finally {
        clearTimeout(timeout);
        store.pending = undefined;
      }
    })();
    return store.pending;
  }, [asset.url, asset.total, store]);
  // Shared filter URLs restore only after hydration, keeping initial HTML static.
  useEffect(() => { if (query && store.state.status === "idle") void load(); }, [query, load, store]);
  return { schools: state.rows as T[] | undefined, status: state.status, load };
}
