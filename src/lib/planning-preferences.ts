export type PlanningSchoolType = "all" | "public-funded" | "dss" | "international";
export type PlanningStudentGender = "all" | "boy" | "girl";
export type KindergartenPlanningType = "all" | "voucher" | "private" | "international";
export type KindergartenPlanningSession = "all" | "上午" | "下午" | "全日";
export type PrimaryPlanningFinance = "all" | "funded" | "direct-subsidy" | "private" | "international";
export type PrimaryPlanningRoster = "all" | "listed" | "not-listed";

export type PlanningPreferences = {
  destination: "hong-kong" | "overseas" | "both";
  language: "all" | "chinese" | "bilingual" | "english";
  budget: "controlled" | "flexible" | "international";
  flexibility: "stable" | "open";
  district: string;
  studentGender: PlanningStudentGender;
  schoolType: PlanningSchoolType;
  kindergartenType: KindergartenPlanningType;
  kindergartenSession: KindergartenPlanningSession;
  primaryFinance: PrimaryPlanningFinance;
  primarySchoolNet: string;
  primaryP1Participation: PrimaryPlanningRoster;
};

export const DEFAULT_PLANNING_PREFERENCES: PlanningPreferences = {
  destination: "hong-kong",
  language: "all",
  budget: "controlled",
  flexibility: "stable",
  district: "all",
  studentGender: "all",
  schoolType: "all",
  kindergartenType: "all",
  kindergartenSession: "all",
  primaryFinance: "all",
  primarySchoolNet: "all",
  primaryP1Participation: "all",
};

export const PLANNING_PREFERENCES_STORAGE_KEY = "hk-guide-planning-decision-v1";
