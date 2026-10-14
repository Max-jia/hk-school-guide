import historyJson from "@/content/p1-allocation-history.json";

type NetAllocationResult = {
  net: number;
  typeA: number;
  typeB: number;
  discretionarySubtotal: number;
  unrestrictedTop3: number;
  homeNetTop3: number;
  homeNet4to10: number;
  homeNetBeyond10: number;
  centralSubtotal: number;
  totalAllocated: number;
};

type SystemAllocationTotal = {
  year: number;
  discretionaryAllocated: number;
  centralAllocated: number;
  totalAllocated: number;
};

type SchoolDemandEvidence = {
  schoolName: string;
  schoolNo: string;
  admissionYear: number;
  phase: "central-allocation" | "discretionary";
  metric: string;
  value: number;
  sourceTitle: string;
  sourceUrl: string;
  sourcePages: string;
  verifiedOn: string;
  scopeNote: string;
};

type AllocationHistory = {
  meta: {
    last_verified: string;
    sources: { year: number; title: string; url: string; table: string }[];
    rosterSource: { title: string; url: string; note: string };
    limitations: string[];
    schoolDemandDataStatus: {
      status: string;
      verifiedRecords: SchoolDemandEvidence[];
      note: string;
    };
  };
  systemTotals: SystemAllocationTotal[];
  netResultsByYear: Record<string, NetAllocationResult[]>;
};

export const P1_ALLOCATION_HISTORY = historyJson as AllocationHistory;

export function getNetAllocationHistory(net: string): (NetAllocationResult & { year: number })[] {
  return Object.entries(P1_ALLOCATION_HISTORY.netResultsByYear)
    .flatMap(([year, results]) => {
      const result = results.find((row) => String(row.net) === String(net));
      return result ? [{ ...result, year: Number(year) }] : [];
    })
    .sort((a, b) => a.year - b.year);
}

export function getSystemAllocationHistory(): SystemAllocationTotal[] {
  return P1_ALLOCATION_HISTORY.systemTotals;
}
