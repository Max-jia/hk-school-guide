export type SecondaryTeachingMedium = { chinese: boolean; english: boolean } | null;
export type SecondarySchoolDistrictScope = { district: string; ageRange?: string; routes: string[] };

function normalizePlanningDistrict(value: string): string {
  const normalized = value.trim()
    .replaceAll("区", "區")
    .replaceAll("东", "東")
    .replaceAll("观", "觀")
    .replaceAll("黄", "黃")
    .replaceAll("龙", "龍")
    .replaceAll("离", "離")
    .replaceAll("湾", "灣")
    .replaceAll("门", "門")
    .replaceAll("贡", "貢");
  if (normalized === "香港東區" || normalized === "香港南區") return normalized.slice(2);
  return normalized;
}

export type SecondarySchoolFilterFacts = {
  district: string | null;
  districtScopes?: SecondarySchoolDistrictScope[] | null;
  gender: string | null;
  schoolType: string | null;
  teachingMedium: SecondaryTeachingMedium;
};

export type SecondarySchoolFilterCriteria = {
  route: string | "all";
  queryTerms: string[];
  district: string | "all";
  studentGender: "all" | "boy" | "girl";
  schoolType: string | "all";
  language: "all" | "chinese" | "english" | "bilingual";
};

export type SecondarySchoolFilterResult<T> = {
  baseMatches: T[];
  matches: T[];
  unclassifiedCount: number;
};

export type SecondarySchoolFilterRecord = {
  routes: string[];
  searchVariants: string[];
  facts: SecondarySchoolFilterFacts;
};

function genderMatches(gender: string, requested: "boy" | "girl"): boolean {
  if (requested === "boy") return gender === "Boys" || gender === "Co-ed";
  return gender === "Girls" || gender === "Co-ed";
}

function languageMatches(medium: SecondaryTeachingMedium, requested: SecondarySchoolFilterCriteria["language"]): boolean {
  if (requested === "all") return true;
  if (!medium) return false;
  if (requested === "chinese") return medium.chinese;
  if (requested === "english") return medium.english;
  return medium.chinese && medium.english;
}

export function filterSecondarySchools<T extends SecondarySchoolFilterRecord>(
  records: T[],
  criteria: SecondarySchoolFilterCriteria,
): SecondarySchoolFilterResult<T> {
  const baseMatches = records.filter((record) => {
    const matchesRoute = criteria.route === "all" || record.routes.includes(criteria.route);
    const matchesQuery = criteria.queryTerms.length === 0
      || criteria.queryTerms.some((term) => record.searchVariants.some((value) => value.includes(term)));
    return matchesRoute && matchesQuery;
  });

  const matches: T[] = [];
  let unclassifiedCount = 0;

  for (const record of baseMatches) {
    const { district, districtScopes, gender, schoolType, teachingMedium } = record.facts;
    let hasUnknownSelectedFact = false;
    let hasKnownMismatch = false;

    if (criteria.district !== "all") {
      if (districtScopes?.length) {
        const scopeMatches = districtScopes.some((scope) => normalizePlanningDistrict(scope.district) === normalizePlanningDistrict(criteria.district)
          && (criteria.route === "all" || scope.routes.includes(criteria.route)));
        if (!scopeMatches) hasKnownMismatch = true;
      } else if (!district) hasUnknownSelectedFact = true;
      else if (normalizePlanningDistrict(district) !== normalizePlanningDistrict(criteria.district)) hasKnownMismatch = true;
    }

    if (criteria.studentGender !== "all") {
      if (!gender) hasUnknownSelectedFact = true;
      else if (!genderMatches(gender, criteria.studentGender)) hasKnownMismatch = true;
    }

    if (criteria.schoolType !== "all") {
      if (!schoolType) hasUnknownSelectedFact = true;
      else if (schoolType !== criteria.schoolType) hasKnownMismatch = true;
    }

    if (criteria.language !== "all") {
      if (!teachingMedium) hasUnknownSelectedFact = true;
      else if (!languageMatches(teachingMedium, criteria.language)) hasKnownMismatch = true;
    }

    if (hasKnownMismatch) continue;
    if (hasUnknownSelectedFact) {
      unclassifiedCount += 1;
      continue;
    }
    matches.push(record);
  }

  return { baseMatches, matches, unclassifiedCount };
}
