"use client";

import { useEffect } from "react";
import { trackPlanningEvent, type PlanningAnalyticsEvent } from "@/lib/analytics";

export default function PlanningAnalytics({
  stage,
  route,
  surface,
}: {
  stage?: string;
  route?: string;
  surface: "home" | "planning";
}) {
  useEffect(() => {
    if (surface !== "planning") return;
    trackPlanningEvent("planning_result_viewed", { stage, route });
  }, [route, stage, surface]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-analytics-event]") : null;
      if (!target) return;

      const eventName = target.dataset.analyticsEvent as PlanningAnalyticsEvent | undefined;
      if (!eventName) return;

      trackPlanningEvent(eventName, {
        stage: target.dataset.planningStage,
        route: target.dataset.planningRoute,
        sourceId: target.dataset.planningSourceId,
        source: surface,
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [surface]);

  return null;
}
