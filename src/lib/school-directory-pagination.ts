import type { SchoolStage } from "./school-directory-pilot";

export const DIRECTORY_PAGE_SIZE = 50;

export function directoryPagePath(stage: SchoolStage, page = 1): string {
  const base = `/schools/${stage}/directory`;
  return page === 1 ? base : `${base}/page/${page}`;
}

export function directoryPageCount(total: number): number {
  return Math.ceil(total / DIRECTORY_PAGE_SIZE);
}

export function validDirectoryPage(value: string, total: number): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) && page <= directoryPageCount(total) ? page : null;
}
