"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  DEFAULT_PLANNING_PREFERENCES,
  PLANNING_PREFERENCES_STORAGE_KEY,
  type PlanningPreferences,
} from "@/lib/planning-preferences";
import { normalizePlanningDistrict } from "@/lib/planning-district";

type PlanningPreferencesContextValue = {
  profile: PlanningPreferences;
  updateProfile: <K extends keyof PlanningPreferences>(key: K, value: PlanningPreferences[K]) => void;
  saveProfile: () => void;
  saved: boolean;
};

const PlanningPreferencesContext = createContext<PlanningPreferencesContextValue | null>(null);

function readProfile(): PlanningPreferences {
  try {
    const raw = window.localStorage.getItem(PLANNING_PREFERENCES_STORAGE_KEY);
    if (!raw) return DEFAULT_PLANNING_PREFERENCES;
    const value = JSON.parse(raw) as Partial<PlanningPreferences>;
    const profile = { ...DEFAULT_PLANNING_PREFERENCES, ...value };
    return { ...profile, district: normalizePlanningDistrict(profile.district) };
  } catch {
    return DEFAULT_PLANNING_PREFERENCES;
  }
}

export default function PlanningPreferencesProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(DEFAULT_PLANNING_PREFERENCES);
  const [saved, setSaved] = useState(false);
  const profileInitializedRef = useRef(false);

  useEffect(() => {
    // Load the browser-local planning profile after hydration.
    if (profileInitializedRef.current) return;
    profileInitializedRef.current = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(readProfile());
  }, []);

  const updateProfile = useCallback(<K extends keyof PlanningPreferences>(key: K, value: PlanningPreferences[K]) => {
    const nextValue = (key === "district"
      ? normalizePlanningDistrict(value as string)
      : value) as PlanningPreferences[K];
    if (!profileInitializedRef.current) {
      profileInitializedRef.current = true;
      setProfile({ ...readProfile(), [key]: nextValue });
    } else {
      setProfile((current) => ({ ...current, [key]: nextValue }));
    }
    setSaved(false);
  }, []);

  const saveProfile = useCallback(() => {
    try {
      window.localStorage.setItem(PLANNING_PREFERENCES_STORAGE_KEY, JSON.stringify(profile));
      setSaved(true);
    } catch {
      setSaved(false);
    }
  }, [profile]);

  const value = useMemo(() => ({ profile, updateProfile, saveProfile, saved }), [profile, updateProfile, saveProfile, saved]);
  return <PlanningPreferencesContext.Provider value={value}>{children}</PlanningPreferencesContext.Provider>;
}

export function usePlanningPreferences(): PlanningPreferencesContextValue {
  const value = useContext(PlanningPreferencesContext);
  if (!value) throw new Error("usePlanningPreferences must be used inside PlanningPreferencesProvider");
  return value;
}
