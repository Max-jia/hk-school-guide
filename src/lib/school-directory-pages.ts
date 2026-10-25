import { SCHOOL_STAGES, schoolsForStage, type SchoolStage } from "./school-directory-pilot";
import { directoryPageCount, validDirectoryPage } from "./school-directory-pagination";

export function directoryStaticPages() {
  return (Object.keys(SCHOOL_STAGES) as SchoolStage[]).flatMap((stage) =>
    Array.from({ length: directoryPageCount(schoolsForStage(stage).length) }, (_, i) => ({ stage, page: String(i + 1) })));
}

export function resolveDirectoryPage(stage: string, value: string) {
  if (!Object.prototype.hasOwnProperty.call(SCHOOL_STAGES, stage)) return null;
  const schoolStage = stage as SchoolStage;
  const page = validDirectoryPage(value, schoolsForStage(schoolStage).length);
  return page ? { stage: schoolStage, page } : null;
}
