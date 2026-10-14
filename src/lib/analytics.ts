export type PlanningAnalyticsEvent =
  | "planning_start"
  | "stage_selected"
  | "route_selected"
  | "planning_result_viewed"
  | "tool_opened_from_home"
  | "tool_opened_from_planning"
  | "report_opened_from_home"
  | "report_opened_from_planning"
  | "shortlist_started"
  | "planning_profile_saved"
  | "planning_profile_resumed"
  | "planning_workspace_completed"
  | "planning_task_completed"
  | "planning_school_check_completed"
  | "planning_source_opened";

type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackPlanningEvent(event: PlanningAnalyticsEvent, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  const cleanParams = Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined));
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === "function") {
    gtag("event", event, cleanParams);
    return;
  }

  const dataLayer = ((window as Window & { dataLayer?: unknown[] }).dataLayer ||= []);
  dataLayer.push(["event", event, cleanParams]);
}
