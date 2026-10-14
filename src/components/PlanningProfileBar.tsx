"use client";

import { useEffect, useMemo, useState } from "react";
import { L, localeHref, type Locale } from "@/lib/i18n";
import { trackPlanningEvent } from "@/lib/analytics";
import type { EducationRoute, PlanningStage } from "@/components/EducationPlanningPage";

const STORAGE_KEY = "hk-guide-planning-profile-v1";

type SavedProfile = {
  stage?: PlanningStage;
  route?: EducationRoute;
};

function readProfile(): SavedProfile | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as SavedProfile;
    if (!value || (typeof value.stage !== "string" && typeof value.route !== "string")) return null;
    return value;
  } catch {
    return null;
  }
}

function profileHref(locale: Locale, profile: SavedProfile) {
  const query = new URLSearchParams();
  if (profile.stage) query.set("stage", profile.stage);
  if (profile.route) query.set("route", profile.route);
  return localeHref(`/planning?${query.toString()}`, locale);
}

function sameProfile(left: SavedProfile | null, right: SavedProfile) {
  return left?.stage === right.stage && left?.route === right.route;
}

export default function PlanningProfileBar({
  locale = "tc",
  stage,
  route,
}: {
  locale?: Locale;
  stage?: PlanningStage;
  route?: EducationRoute;
}) {
  const current = useMemo(() => ({ stage, route }), [route, stage]);
  const [saved, setSaved] = useState<SavedProfile | null>(null);

  useEffect(() => {
    // Read browser-only storage after hydration to keep server/client markup aligned.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaved(readProfile());
  }, []);

  const saveCurrent = () => {
    if (!current.stage && !current.route) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      setSaved(current);
      trackPlanningEvent("planning_profile_saved", { stage, route, source: "planning" });
    } catch {
      // Local-only saving is optional; private browsing may disable storage.
    }
  };

  if (!current.stage && !current.route && !saved) return null;

  if (saved && !sameProfile(saved, current)) {
    return (
      <section className="mx-auto max-w-[1280px] px-4 pb-8" aria-labelledby="planning-profile-title">
        <div className="flex flex-col gap-3 border border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">{L("你的规划", locale)}</p>
            <h2 id="planning-profile-title" className="mt-1 font-serif text-xl font-bold text-[var(--p-fg)]">{L("可以继续上次的规划", locale)}</h2>
            <p className="mt-1 text-sm text-[var(--p-secondary)]">{L("规划只保存在这个浏览器，不会上传到服务器。", locale)}</p>
          </div>
          <a
            href={profileHref(locale, saved)}
            onClick={() => trackPlanningEvent("planning_profile_resumed", { stage: saved.stage, route: saved.route, source: "planning" })}
            className="inline-flex min-h-10 items-center border-2 border-[var(--p-fg)] px-4 py-2 font-mono text-xs font-bold text-[var(--p-fg)] no-underline transition-colors duration-100 hover:bg-[var(--p-fg)] hover:text-[var(--p-bg)]"
          >
            {L("继续上次规划", locale)} →
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1280px] px-4 pb-8" aria-labelledby="planning-profile-title">
      <div className="flex flex-col gap-3 border border-[var(--p-gray-300)] bg-[var(--p-gray-50)] px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--p-secondary)]">{L("你的规划", locale)}</p>
          <h2 id="planning-profile-title" className="mt-1 font-serif text-xl font-bold text-[var(--p-fg)]">{L("保存这次规划，下次接着看", locale)}</h2>
          <p className="mt-1 text-sm text-[var(--p-secondary)]">{L("只保存当前阶段和路线，资料留在这个浏览器。", locale)}</p>
        </div>
        <button
          type="button"
          onClick={saveCurrent}
          className="inline-flex min-h-10 items-center border-2 border-[var(--p-fg)] bg-[var(--p-fg)] px-4 py-2 font-mono text-xs font-bold text-[var(--p-bg)] transition-colors duration-100 hover:bg-transparent hover:text-[var(--p-fg)]"
        >
          {L("保存当前规划", locale)}
        </button>
      </div>
    </section>
  );
}
