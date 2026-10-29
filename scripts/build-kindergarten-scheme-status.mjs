import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const members = JSON.parse(fs.readFileSync(path.join(root, "src/content/kindergarten-scheme-members-2026-27.json"), "utf8"));
const directory = JSON.parse(fs.readFileSync(path.join(root, "src/content/all-registered-school-directory.json"), "utf8"))
  .filter((school) => school.stage === "kindergarten");

const districts = {
  "中西區": "CW", "東區": "HKE", "離島區": "ISL", "南區": "SOU", "灣仔區": "WCH",
  "九龍城區": "KC", "觀塘區": "KT", "西貢區": "SK", "深水埗區": "SSP", "黃大仙區": "WTS",
  "油尖旺區": "YTM", "北區": "N", "沙田區": "ST", "大埔區": "TP", "葵青區": "KWT",
  "屯門區": "TM", "荃灣區": "TW", "元朗區": "YL",
};

// These official list entries use campus-specific or historical name variants.
// Each mapping is keyed by the exact English name in the EDB PDF and points to
// the EDB six-digit school number in the current registered-school directory.
const verifiedAliases = {
  "DOMINIC SAVIO KINDERGARTEN (LOCATION: HOI NING STREET)": "324230",
  "DOMINIC SAVIO KINDERGARTEN (LOCATION: SAI WAN HO STREET)": "324230",
  "LICK HANG KINDERGARTEN (LOCATION: NAM PIN WAI)": "155705",
  "LICK HANG KINDERGARTEN (LOCATION: RURAL COMMITTEE ROAD)": "155705",
  "ST CHRISTOPHER'S NURSERY (WAN CHAI)": "569712",
  "MAY NGA KINDERGARTEN (BRANCH) (LOCATION: 89 RURAL COMMITTEE ROAD)": "325775",
  "MAY NGA KINDERGARTEN (BRANCH) (LOCATION: 91 RURAL COMMITTEE ROAD)": "325775",
  "HOLY TRINITY CHURCH TSANG SHIU TIM KINDERGARTEN": "325600",
  "KINDLY LIGHT CHURCH HOLY CARPENTER KINDERGARTEN": "325937",
  "KINDLY LIGHT CHURCH HOLY CARPENTER KINDERGARTEN (BRANCH)": "607886",
  "CHE LOK KINDERGARTEN (LOCATION: NAM CHEONG STREET)": "532550",
  "CHE LOK KINDERGARTEN (LOCATION: TAI NAN STREET)": "532550",
  "DELIA ENGLISH PRIMARY SCHOOL & KINDERGARTEN (LOCATION: BROADWAY)": "216208",
  "DELIA ENGLISH PRIMARY SCHOOL & KINDERGARTEN (LOCATION: STAGE 8)": "216208",
  "LUTHERAN KINDERGARTEN": "323080",
  "ONE KINDERGARTEN": "316504",
  "KINDLY LIGHT CHURCH OR PUI CHEUNG KINDERGARTEN": "325546",
  "MONGKOK CHURCH JEANNETTE KINDERGARTEN": "547069",
  "GLORIA CREATIVE KINDERGARTEN": "597295",
  "THE EVANGELICAL LUTHERAN CHURCH OF HONG KONG CHEUNG WAH KINDERGARTEN (LOCATION: CHEUNG FUNG HOUSE)": "157627",
  "THE EVANGELICAL LUTHERAN CHURCH OF HONG KONG CHEUNG WAH KINDERGARTEN (LOCATION: CHEUNG YUE HOUSE)": "157627",
  "HOLY SPIRIT CHURCH KINDERGARTEN": "156493",
  "TAI PO RHENISH CHURCH KINDERGARTEN (LOCATION: TING KOK ROAD)": "150860",
  "TAI PO RHENISH CHURCH KINDERGARTEN (LOCATION: FU TIP ESTATE)": "150860",
  "ST CHRISTOPHER'S NURSERY (KWAI CHUNG)": "568104",
  "CROWN OF THORNS CHURCH KWAI CHUNG KINDERGARTEN": "526665",
  "CROWN OF THORNS CHURCH SADICK KINDERGARTEN": "153087",
  "MANJUSRI NURSERY SCHOOL": "565903",
  "ST. PETER'S CHURCH CASTLE PEAK SIU LUN COURT KINDERGARTEN": "159131",
  "ST. PETER'S CHURCH KINDERGARTEN (CASTLE PEAK)": "151947",
  "ST. PETER'S CHURCH SHAN KING ESTATE KINDERGARTEN": "157473",
  "HS. KO TECK KIN MEMORIAL KINDERGARTEN": "156744",
  "AVALOKITESVARA NURSERY SCHOOL": "565911",
  "MANTRA INSTITUTE NURSERY SCHOOL": "565890",
  "TREE OF LIFE KINDERGARTEN": "601497",
  "ABIDING KINDERGARTEN (LOCATION: LOT NO. 102)": "597384",
  "ABIDING KINDERGARTEN (LOCATION: LOT NO. 239)": "597384",
  "ST. JOSEPH'S CHURCH KINDERGARTEN - SAGARMATHA KINDERGARTEN": "154601",
};

// EDB's entry does not distinguish the two current Wai Kwong campuses by name.
// Keep both unresolved instead of assigning a school-wide status by guesswork.
const unresolvedSchoolNumbers = new Set(["158720", "587141"]);
const normalize = (value) => String(value || "").normalize("NFKC").toLocaleLowerCase().replace(/[\s\p{P}\p{S}]+/gu, "");
const byChineseName = new Map();
const byEnglishName = new Map();
for (const school of directory) {
  const zh = normalize(school.name);
  const en = normalize(school.nameEn);
  if (zh) byChineseName.set(zh, [...(byChineseName.get(zh) || []), school]);
  if (en) byEnglishName.set(en, [...(byEnglishName.get(en) || []), school]);
}

const membersBySchool = new Map();
const unmatchedMemberEntries = [];
for (const member of members.schools) {
  const manualCode = verifiedAliases[member.nameEn];
  let candidates = manualCode ? directory.filter((school) => school.schoolNumber === manualCode) : [];
  if (!candidates.length) candidates = byChineseName.get(normalize(member.nameZh)) || byEnglishName.get(normalize(member.nameEn)) || [];
  const codes = [...new Set(candidates.map((school) => String(school.schoolNumber || "").match(/^\d{6}/)?.[0]).filter(Boolean))];
  if (codes.length !== 1) {
    unmatchedMemberEntries.push({ nameZh: member.nameZh, nameEn: member.nameEn, districtCode: member.districtCode, sourceUrl: member.sourceUrl, candidateCodes: codes });
    continue;
  }
  const code = codes[0];
  const school = directory.find((record) => record.schoolNumber === code);
  if (!school || school.district !== Object.keys(districts).find((district) => districts[district] === member.districtCode)) {
    if (school) unresolvedSchoolNumbers.add(code);
    unmatchedMemberEntries.push({ nameZh: member.nameZh, nameEn: member.nameEn, districtCode: member.districtCode, sourceUrl: member.sourceUrl, candidateCodes: codes, reason: "district-mismatch" });
    continue;
  }
  const existing = membersBySchool.get(code) || [];
  existing.push({ nameZh: member.nameZh, nameEn: member.nameEn, sourceUrl: member.sourceUrl });
  membersBySchool.set(code, existing);
}

const districtSource = new Map();
for (const member of members.schools) if (!districtSource.has(member.districtCode)) districtSource.set(member.districtCode, member.sourceUrl);
const monthNumbers = Object.fromEntries(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => [month, index + 1]));
const statusBySchoolNumber = {};
const locationScopeReview = [];
for (const school of directory) {
  const code = String(school.schoolNumber || "").match(/^\d{6}/)?.[0];
  if (!code) continue;
  const listed = membersBySchool.get(code) || [];
  const unknown = unresolvedSchoolNumbers.has(code);
  const locations = Math.max(1, Number(school.registryLocations) || 1);
  let value = listed.length ? (listed.length >= locations ? "yes" : "unknown") : "no";
  if (unknown) value = "unknown";
  if (listed.length && listed.length < locations) locationScopeReview.push({ schoolNumber: code, name: school.name, registryLocations: locations, listedEntries: listed.length });
  const districtPdf = listed[0]?.sourceUrl || districtSource.get(districts[school.district]) || members.sourcePage;
  const sourceUrl = value === "no" ? members.sourcePage : districtPdf;
  const dateMatch = districtPdf.match(/_(\d{1,2})([A-Za-z]{3})(\d{4})\.pdf$/);
  const sourceDate = dateMatch ? `${dateMatch[3]}年${monthNumbers[dateMatch[2]]}月${Number(dateMatch[1])}日` : "";
  const text = value === "yes" ? "參加計劃" : value === "no" ? "未列入參加名單" : "按校址待確認";
  const detail = value === "yes"
    ? `教育局${members.academicYear}學年名單列有本校。` + (listed.length > 1 ? `名單分列${listed.length}個校址／名稱記錄。` : "")
    : value === "no"
      ? `教育局${members.academicYear}學年參加計劃名單未列本校；這只代表計劃參與狀態，不代表任何班別免費。`
      : `教育局名單中的校址名稱無法與本頁學校編號完整配對，暫不判定全校參與狀態。請按校址核實。`;
  statusBySchoolNumber[code] = {
    value,
    text,
    detail,
    period: value === "no"
      ? `${members.academicYear}學年名單（教育局頁面截至2026年8月28日）`
      : `${members.academicYear}學年名單${sourceDate ? `（分區文件更新於${sourceDate}）` : ""}`,
    sourceUrl,
    listedCampusCount: listed.length,
    registeredLocationCount: locations,
  };
}

const output = {
  checkedAt: members.checkedAt,
  academicYear: members.academicYear,
  sourcePage: members.sourcePage,
  participantEntryCount: members.schools.length,
  matchedSchoolCount: Object.values(statusBySchoolNumber).filter((item) => item.value === "yes").length,
  nonParticipantSchoolCount: Object.values(statusBySchoolNumber).filter((item) => item.value === "no").length,
  unresolvedSchoolCount: Object.values(statusBySchoolNumber).filter((item) => item.value === "unknown").length,
  statusBySchoolNumber,
  unmatchedMemberEntries,
  locationScopeReview,
};
fs.writeFileSync(path.join(root, "src/content/kindergarten-scheme-status-2026-27.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ totalDirectorySchools: Object.keys(statusBySchoolNumber).length, matchedSchoolCount: output.matchedSchoolCount, nonParticipantSchoolCount: output.nonParticipantSchoolCount, unresolvedSchoolCount: output.unresolvedSchoolCount, unmatchedMemberEntries: unmatchedMemberEntries.length, locationScopeReview: locationScopeReview.length, unmatched: unmatchedMemberEntries, partial: locationScopeReview }, null, 2));
