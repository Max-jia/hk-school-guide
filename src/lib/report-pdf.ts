export async function downloadReportPdf(slug: string, schoolName: string, locale: string): Promise<void> {
  const response = await fetch(`/api/reports/${encodeURIComponent(slug)}/pdf?locale=${encodeURIComponent(locale)}`, {
    method: "GET",
  });

  if (!response.ok) {
    const details = await response.json().catch(() => null) as { reason?: string } | null;
    throw new Error(details?.reason || `PDF request failed (${response.status}).`);
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/pdf")) {
    throw new Error("The PDF endpoint returned an unexpected response.");
  }

  const blob = await response.blob();
  if (blob.size === 0) throw new Error("The PDF endpoint returned an empty file.");

  const disposition = response.headers.get("content-disposition") || "";
  const encodedName = disposition.match(/filename\*=UTF-8''([^;]+)/i)?.[1];
  const filename = encodedName
    ? decodeURIComponent(encodedName)
    : `${schoolName}-${slug}-报告.pdf`;
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}
