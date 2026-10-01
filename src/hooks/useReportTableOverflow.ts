"use client";

import { useEffect, type RefObject } from "react";

export function useReportTableOverflow(rootRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observers: ResizeObserver[] = [];
    const cleanups: (() => void)[] = [];
    const attached = new WeakSet<HTMLElement>();

    const attach = (wrapper: HTMLElement) => {
      if (attached.has(wrapper)) return;
      const viewport = wrapper.querySelector<HTMLElement>(".report-table-scroll__viewport");
      const table = viewport?.querySelector("table");
      if (!viewport || !table) return;
      attached.add(wrapper);

      const updateOverflow = () => {
        wrapper.classList.toggle("is-overflowing", table.scrollWidth > viewport.clientWidth + 1);
      };
      const markScrolled = () => {
        if (viewport.scrollLeft > 4) wrapper.classList.add("has-scrolled");
      };

      updateOverflow();
      viewport.addEventListener("scroll", markScrolled, { passive: true });
      cleanups.push(() => viewport.removeEventListener("scroll", markScrolled));

      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(updateOverflow);
        observer.observe(viewport);
        observer.observe(table);
        observers.push(observer);
      } else {
        window.addEventListener("resize", updateOverflow);
        cleanups.push(() => window.removeEventListener("resize", updateOverflow));
      }
    };

    const scan = () => root.querySelectorAll<HTMLElement>(".report-table-scroll").forEach(attach);
    scan();

    const mutationObserver = typeof MutationObserver === "undefined"
      ? null
      : new MutationObserver(scan);
    mutationObserver?.observe(root, { childList: true, subtree: true });

    return () => {
      mutationObserver?.disconnect();
      observers.forEach((observer) => observer.disconnect());
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [rootRef]);
}
