import fs from "node:fs";
import path from "node:path";
import * as OpenCC from "opencc-js";
import { getSecondaryTeachingMedium } from "./secondary-teaching-medium.mjs";

const root = process.cwd();
const planning = JSON.parse(fs.readFileSync(path.join(root, "src/content/secondary-school-planning.json"), "utf8"));
const directory = JSON.parse(fs.readFileSync(path.join(root, "src/content/secondary-school-directory-2025-2026.json"), "utf8"));
const facets = JSON.parse(fs.readFileSync(path.join(root, "src/content/secondary-school-planning-facets.json"), "utf8"));
const toTraditional = OpenCC.Converter({ from: "cn", to: "hk" });
const toSimplified = OpenCC.Converter({ from: "hk", to: "cn" });
const ROUTES = ["dse", "ib", "a-level"];
const ROUTE_MATCHERS = {
  dse: /\bDSE\b|HKDSE|Hong Kong Diploma of Secondary Education|香港中学文凭|香港中學文憑/i,
  ib: /\bIB\b|IBDP|International Baccalaureate|国际文凭|國際文憑|国际文凭大学预科/i,
  "a-level": /A\s*[-–]?\s*Level|IAL|International A.?Level|GCE A/i,
};
const aliases = { "creative-secondary-school": "creative-secondary-school-dc7ef8" };
const internationalSampleIds = new Set(facets.schools.filter((facet) => facet.schoolType === "international").map((facet) => facet.id));
const facetById = new Map(facets.schools.map((facet) => [facet.id, facet]));
const directoryById = new Map(directory.schools.map((school) => [school.id, school]));
const normalize = (value) => value.toLocaleLowerCase().replace(/[\s\p{P}\p{S}（）()·．.，,：:、]/gu, "");
const directoryByName = new Map();
for (const school of directory.schools) {
  for (const name of Object.values(school.names)) {
    if (!name) continue;
    for (const variant of [name, toTraditional(name), toSimplified(name)]) directoryByName.set(normalize(variant), school);
  }
}

function findDirectorySchool(profile) {
  return directoryById.get(profile.directoryId)
    ?? directoryById.get(profile.id)
    ?? directoryById.get(aliases[profile.id])
    ?? directoryByName.get(normalize(profile.name));
}

function schoolType(raw) {
  if (raw === "DSS") return "dss";
  if (raw === "Gov't" || raw === "Aided" || raw === "CAPUT") return "public-funded";
  return null;
}

function routeProfileSources(profile, route) {
  if (!profile) return [];
  return profile.snapshot
    .filter((item) => item.routeEvidence !== false)
    .filter((item) => ROUTE_MATCHERS[route].test(`${item.field} ${item.value}`))
    .map((item) => ({ field: item.field, sourceLabel: item.sourceLabel, sourceUrl: item.sourceUrl }));
}

const profileByDirectoryId = new Map();
const mappedProfiles = new Map();
for (const profile of planning.schools) {
  const directorySchool = findDirectorySchool(profile);
  if (directorySchool) {
    if (profileByDirectoryId.has(directorySchool.id)) {
      throw new Error(`Multiple curated school profiles map to ${directorySchool.id}`);
    }
    profileByDirectoryId.set(directorySchool.id, profile);
    mappedProfiles.set(profile.id, directorySchool);
  } else if (!internationalSampleIds.has(profile.id)) {
    throw new Error(`No CHSC directory mapping or explicit international classification for ${profile.id}`);
  }
}

const candidates = new Map();
for (const directorySchool of directory.schools) {
  if (!directorySchool.explicitRouteEvidence?.length) continue;
  const profile = profileByDirectoryId.get(directorySchool.id);
  const profileFacet = profile ? facetById.get(profile.id) : null;
  const hasTeachingMediumOverride = profileFacet?.teachingMediumOverride === true;
  const offerings = directorySchool.subjectOfferingsByMedium?.["2025_2026"];
  const directoryTeachingMedium = getSecondaryTeachingMedium(offerings);
  candidates.set(directorySchool.id, {
    id: directorySchool.id,
    profileId: profile?.id ?? null,
    names: directorySchool.names,
    fallbackName: null,
    routes: new Set(directorySchool.explicitRouteEvidence.map((entry) => entry.route)),
    directoryId: directorySchool.id,
    district: directorySchool.district.sc,
    districtScopes: null,
    districtNames: directorySchool.district,
    gender: directorySchool.studentGender,
    schoolType: schoolType(directorySchool.schoolType),
    teachingMedium: hasTeachingMediumOverride ? profileFacet.teachingMedium : directoryTeachingMedium,
    teachingMediumEvidence: hasTeachingMediumOverride
      ? profileFacet.teachingMediumEvidence
      : directoryTeachingMedium
        ? `中学概览 ${directory.metadata.sourceEdition} 按非语言科目授课语言列出的课程`
        : null,
    ...(hasTeachingMediumOverride && profileFacet.sourceUrl ? { teachingMediumSourceUrl: profileFacet.sourceUrl } : {}),
    s1Tuition: directorySchool.annualTuitionFeesHKD?.S1 ?? null,
    website: directorySchool.website || null,
    sourceKind: "chsc",
    sourceLabel: `中学概览 ${directory.metadata.sourceEdition} · CHSC`,
    sourceUrls: directory.metadata.sources,
    routeEvidence: directorySchool.explicitRouteEvidence.map((entry) => ({
      route: entry.route,
      sourceKind: "chsc",
      sourceLabel: `中学概览 ${directory.metadata.sourceEdition} · CHSC`,
      evidenceCount: entry.evidence.length,
      sources: [{ field: "课程路线标记", sourceLabel: `中学概览 ${directory.metadata.sourceEdition} · CHSC`, sourceUrl: directory.metadata.sources.sc }],
    })),
  });
}

for (const profile of planning.schools) {
  const directorySchool = findDirectorySchool(profile);
  const candidateId = directorySchool?.id ?? profile.id;
  let candidate = candidates.get(candidateId);
  if (!candidate) {
    const facet = facetById.get(profile.id);
    candidate = {
      id: candidateId,
      profileId: profile.id,
      names: null,
      fallbackName: profile.name,
      routes: new Set(),
      directoryId: null,
      district: facet?.district ?? null,
      districtScopes: facet?.districtScopes ?? null,
      districtNames: null,
      gender: facet?.gender ?? null,
      schoolType: facet?.schoolType ?? null,
      teachingMedium: facet?.teachingMedium ?? null,
      teachingMediumEvidence: facet?.teachingMediumEvidence ?? null,
      s1Tuition: null,
      website: null,
      sourceKind: "school-profile",
      sourceLabel: facet?.sourceLabel ?? profile.snapshot[0]?.sourceLabel ?? "学校资料样本",
      sourceUrls: null,
      routeEvidence: [],
    };
    candidates.set(candidateId, candidate);
  } else {
    candidate.profileId = profile.id;
    candidate.fallbackName = profile.name;
  }

  for (const route of profile.routes) {
    if (!ROUTES.includes(route)) throw new Error(`Unsupported route ${route} in ${profile.id}`);
    candidate.routes.add(route);
    const matchingDirectoryRoute = directorySchool?.explicitRouteEvidence?.find((entry) => entry.route === route);
    const sources = routeProfileSources(profile, route);
    if (!matchingDirectoryRoute && sources.length === 0) {
      throw new Error(`Missing route-specific evidence for ${profile.id} (${route})`);
    }
    if (sources.length > 0) {
      const existing = candidate.routeEvidence.find((entry) => entry.route === route && entry.sourceKind === "school-profile");
      if (existing) {
        existing.sources = [...new Map([...existing.sources, ...sources].map((source) => [source.sourceUrl, source])).values()];
      } else {
        candidate.routeEvidence.push({ route, sourceKind: "school-profile", sourceLabel: "已整理的学校路线资料样本", evidenceCount: sources.length, sources });
      }
    }
  }
}

const schools = [...candidates.values()].map((candidate) => ({
  ...candidate,
  routes: [...candidate.routes].filter((route) => ROUTES.includes(route)).sort((a, b) => ROUTES.indexOf(a) - ROUTES.indexOf(b)),
  routeEvidence: candidate.routeEvidence.sort((a, b) => ROUTES.indexOf(a.route) - ROUTES.indexOf(b.route) || a.sourceKind.localeCompare(b.sourceKind)),
})).sort((a, b) => {
  const nameA = a.names?.sc ?? a.fallbackName ?? a.id;
  const nameB = b.names?.sc ?? b.fallbackName ?? b.id;
  return nameA.localeCompare(nameB, "zh-Hans");
});

const routeCounts = Object.fromEntries([
  ["all", schools.length],
  ...ROUTES.map((route) => [route, schools.filter((school) => school.routes.includes(route)).length]),
]);
const metadata = {
  verifiedOn: directory.metadata.latestEditionCheckedOn,
  sourceEdition: directory.metadata.sourceEdition,
  sourceUrl: directory.metadata.sources.sc,
  scopeNote: `候选资料池合并了《中学概览》2025/2026明确列出路线线索的本地中学，以及${planning.schools.length}所已整理的路线资料样本（含国际学校）。目录标签只表示来源中出现过明确线索；未标路线不等于学校没有提供该课程，计划开办路线也不会当作现行课程。此清单用于进一步筛选，不是排名或录取机会判断。`,
  sourceMethod: directory.metadata.routeTagMethod,
  directoryTaggedSchoolCount: directory.schools.filter((school) => school.explicitRouteEvidence?.length).length,
  curatedProfileCount: planning.schools.length,
  mappedCuratedLocalCount: mappedProfiles.size,
  profileOnlyLocalCount: [...mappedProfiles.values()].filter((school) => !school.explicitRouteEvidence?.length).length,
  internationalProfileCount: internationalSampleIds.size,
  routeCounts,
};

const expectedCandidateCount = metadata.directoryTaggedSchoolCount + metadata.profileOnlyLocalCount + metadata.internationalProfileCount;
if (metadata.internationalProfileCount !== 24 || schools.length !== expectedCandidateCount) {
  throw new Error(`Unexpected candidate pool size: ${JSON.stringify({ total: schools.length, expected: expectedCandidateCount, mappedLocal: metadata.mappedCuratedLocalCount, international: metadata.internationalProfileCount })}`);
}
for (const school of schools) {
  if (school.routes.length === 0) throw new Error(`Candidate has no active route evidence: ${school.id}`);
  if (school.routes.some((route) => !school.routeEvidence.some((item) => item.route === route))) {
    throw new Error(`Candidate is missing evidence references: ${school.id}`);
  }
  if (school.routeEvidence.some((item) => item.sources.length === 0 || item.sources.some((source) => !source.sourceUrl))) {
    throw new Error(`Candidate route evidence is missing a source URL: ${school.id}`);
  }
}

const result = { metadata, schools };
const output = path.join(root, "src/content/secondary-school-planning-candidates.json");
fs.writeFileSync(output, `${JSON.stringify(result, null, 2)}\n`);
console.log(`Wrote ${schools.length} candidates; routes: ${JSON.stringify(routeCounts)}; ${metadata.directoryTaggedSchoolCount} CHSC-tagged, ${metadata.profileOnlyLocalCount} curated local without a CHSC route tag, ${metadata.internationalProfileCount} international profiles.`);
