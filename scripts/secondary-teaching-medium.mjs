// CHSC can list English/Chinese language classes under those medium columns;
// don't mistake language-learning courses alone for a broader MOI signal.
const LANGUAGE_ONLY_COURSE = /^(?:(?:\d+|[a-z])\.\s*)?(?:(?:core\s+)?subjects?\s*:\s*)?(?:chinese(?:\s+(?:language(?:\s+arts)?|literature|as\s+a\s+second\s+language))?|english(?:\s+(?:language(?:\s+arts)?|literature|as\s+a\s+second\s+language))?|putonghua|mandarin|french|japanese|spanish|german|korean|urdu|hindi|arabic|russian|thai|nepali|tagalog|indonesian|malay|other languages?)(?:\s+language)?$/i;

function cleanCourseLabel(value) {
  return value
    .replace(/\([^)]*\)/g, " ")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/[：:]\s*$/, "")
    .trim();
}

function isLanguageOnlyEntry(value) {
  let cleaned = cleanCourseLabel(value);
  // CHSC sometimes prefixes an otherwise standalone language course with a form label.
  cleaned = cleaned.replace(/^(?:S\.?\s*\d+(?:\s*(?:to|[-–])\s*S?\.?\s*\d+)?|F\.?\s*\d+)\s*:\s*/i, "");
  return LANGUAGE_ONLY_COURSE.test(cleaned);
}

function hasSubstantiveCourse(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const entries = value.split(/[,;，；]+/).map(cleanCourseLabel).filter(Boolean);
  return entries.some((entry) => !isLanguageOnlyEntry(entry));
}

export function getSecondaryTeachingMedium(offerings) {
  const hasMedium = (medium) => ["junior", "senior"].some((level) =>
    hasSubstantiveCourse(offerings?.[level]?.[medium])
  );
  const chinese = hasMedium("chinese");
  const english = hasMedium("english");
  return chinese || english ? { chinese, english } : null;
}
