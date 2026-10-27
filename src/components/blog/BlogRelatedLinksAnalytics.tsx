"use client";

import { useEffect } from "react";
import { trackBlogRelatedEvent } from "@/lib/analytics";

export default function BlogRelatedLinksAnalytics({ slug }: { slug: string }) {
  useEffect(() => {
    const roots = Array.from(document.querySelectorAll<HTMLElement>("[data-blog-related-content]"))
      .filter((element) => element.dataset.blogRelatedFor === slug);
    const viewed = new Set<string>();
    const observer = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.25) continue;
        const element = entry.target as HTMLElement;
        const details = element.closest("details");
        if (details && !details.open) continue;
        const placement = element.dataset.blogRelatedPlacement;
        if (!placement || viewed.has(placement)) continue;
        viewed.add(placement);
        trackBlogRelatedEvent("blog_related_view", { article_slug: slug, placement });
      }
    }, { threshold: 0.25 }) : null;
    const disclosures: { details: HTMLDetailsElement; onToggle: () => void }[] = [];
    roots.forEach((element) => {
      const details = element.closest("details");
      if (!details) {
        observer?.observe(element);
        return;
      }
      const onToggle = () => {
        observer?.unobserve(element);
        if (details.open) observer?.observe(element);
      };
      details.addEventListener("toggle", onToggle);
      disclosures.push({ details, onToggle });
      if (details.open) observer?.observe(element);
    });

    function onClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[data-blog-related-target]");
      const root = link?.closest<HTMLElement>("[data-blog-related-content]");
      if (!link || root?.dataset.blogRelatedFor !== slug) return;
      trackBlogRelatedEvent("blog_related_click", {
        article_slug: slug,
        placement: root.dataset.blogRelatedPlacement,
        target_path: link.dataset.blogRelatedTarget,
        group: link.dataset.blogRelatedGroup,
        position: Number(link.dataset.blogRelatedPosition),
        transport_type: "beacon",
      });
    }

    document.addEventListener("click", onClick);
    return () => {
      observer?.disconnect();
      disclosures.forEach(({ details, onToggle }) => details.removeEventListener("toggle", onToggle));
      document.removeEventListener("click", onClick);
    };
  }, [slug]);

  return null;
}
