import schools from "@/content/schools.json";
import kindergartens from "@/content/kindergartens.json";
import { L, type Locale } from "@/lib/i18n";

export type ReportCommuteInfo = {
  district: string | null;
  address: string | null;
  schoolBus: string | null;
  mapQuery: string;
};

function plain(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function normalize(value: string): string {
  return value.replace(/[（）()·・\s]/g, "").toLowerCase();
}

function tableValue(html: string, labels: RegExp): string | null {
  const match = html.match(new RegExp(`<th[^>]*>\\s*${labels.source}[^<]*<\\/th>\\s*<td[^>]*>([\\s\\S]*?)<\\/td>`, "i"));
  return match?.[1] ? plain(match[1]) : null;
}

export function buildReportCommuteInfo(
  schoolName: string,
  body: string,
  kind: "primary" | "kindergarten",
  locale: Locale
): ReportCommuteInfo {
  const localizedName = L(schoolName, locale);
  const target = normalize(L(schoolName, "sc"));
  const districtFromBody = tableValue(body, /地区|地區/);
  const district = districtFromBody?.split(/[·•]/)[0]?.trim() || null;
  const pool = kind === "kindergarten" ? kindergartens : schools;
  const match = pool.find((item) => {
    const names = [item.name_zh, item.name_display, "simp" in item ? item.simp : undefined]
      .filter((value): value is string => Boolean(value))
      .map((value) => normalize(value));
    if (!names.includes(target)) return false;
    if (!district) return true;
    const itemDistrict = normalize("district_zh" in item ? item.district_zh || "" : "");
    return !itemDistrict || itemDistrict.includes(normalize(district)) || normalize(district).includes(itemDistrict);
  });

  const recordAddress = match && "address_zh" in match ? match.address_zh : null;
  const address = recordAddress || tableValue(body, /地址|地?址|校址|校舍地址/);
  const recordDistrict = match && "district_zh" in match ? match.district_zh : null;
  const finalDistrict = district || recordDistrict || null;
  const schoolBus = match && "school_bus" in match ? match.school_bus : null;
  const mapQuery = [localizedName, address || finalDistrict, "香港"].filter(Boolean).join(" ");

  return {
    district: finalDistrict ? L(finalDistrict, locale) : null,
    address: address ? L(address, locale) : null,
    schoolBus: schoolBus ? L(schoolBus, locale) : null,
    mapQuery,
  };
}
