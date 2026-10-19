import { toCanvas } from "html-to-image";

const PDF_CAPTURE_WIDTH = 960;
const PAGE_MARGIN_MM = 12;
const JPEG_QUALITY = 0.94;

function addCanvasToPdf(pdf: import("jspdf").jsPDF, source: HTMLCanvasElement, pageState: { y: number }) {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PAGE_MARGIN_MM * 2;
  const contentHeight = pageHeight - PAGE_MARGIN_MM * 2;
  const ratio = contentWidth / source.width;
  const renderedHeight = source.height * ratio;

  if (renderedHeight <= contentHeight) {
    if (pageState.y + renderedHeight > pageHeight - PAGE_MARGIN_MM) {
      pdf.addPage();
      pageState.y = PAGE_MARGIN_MM;
    }
    pdf.addImage(source.toDataURL("image/jpeg", JPEG_QUALITY), "JPEG", PAGE_MARGIN_MM, pageState.y, contentWidth, renderedHeight);
    pageState.y += renderedHeight + 5;
    return;
  }

  const pageBottom = pageHeight - PAGE_MARGIN_MM;
  let sourceY = 0;
  let lastSliceHeight = 0;
  while (sourceY < source.height) {
    if (pageState.y >= pageBottom - 1) {
      pdf.addPage();
      pageState.y = PAGE_MARGIN_MM;
    }
    const availableHeight = pageBottom - pageState.y;
    const sliceHeight = Math.max(1, Math.floor(availableHeight / ratio));
    const height = Math.min(sliceHeight, source.height - sourceY);
    lastSliceHeight = height;
    const slice = document.createElement("canvas");
    slice.width = source.width;
    slice.height = height;
    const context = slice.getContext("2d");
    if (!context) throw new Error("Unable to prepare a PDF page image.");
    context.drawImage(source, 0, sourceY, source.width, height, 0, 0, source.width, height);
    pdf.addImage(slice.toDataURL("image/jpeg", JPEG_QUALITY), "JPEG", PAGE_MARGIN_MM, pageState.y, contentWidth, height * ratio);
    sourceY += height;
    pageState.y += height * ratio;
    if (sourceY < source.height) {
      pdf.addPage();
      pageState.y = PAGE_MARGIN_MM;
    }
  }
  pageState.y += 5;
}

export async function downloadReportPdf(slug: string, schoolName: string): Promise<void> {
  const report = document.querySelector<HTMLElement>(`[data-report-slug="${CSS.escape(slug)}"]`);
  const hero = report?.querySelector<HTMLElement>(".report-article");
  const body = report?.querySelector<HTMLElement>(".report-body");
  if (!report || !hero || !body) throw new Error("Report content is not ready for PDF export.");

  await document.fonts.ready;
  const captureRoot = document.createElement("div");
  captureRoot.className = "report-document-page report-page--editorial report-pdf-capture";
  captureRoot.style.width = `${PDF_CAPTURE_WIDTH}px`;
  captureRoot.style.position = "fixed";
  captureRoot.style.left = "-100000px";
  captureRoot.style.top = "0";
  captureRoot.style.zIndex = "-1";
  captureRoot.style.background = "#fff";
  document.body.appendChild(captureRoot);

  try {
    const blocks: HTMLElement[] = [];
    const heroClone = hero.cloneNode(true) as HTMLElement;
    captureRoot.appendChild(heroClone);
    blocks.push(heroClone);

    const contact = report.querySelector<HTMLElement>(".report-contact-cta");
    if (contact) {
      const contactClone = contact.cloneNode(true) as HTMLElement;
      captureRoot.appendChild(contactClone);
      blocks.push(contactClone);
    }

    const toc = report.querySelector<HTMLElement>(".toc");
    if (toc) {
      const tocWrapper = document.createElement("div");
      tocWrapper.className = "report-layout";
      const tocClone = toc.cloneNode(true) as HTMLElement;
      tocWrapper.appendChild(tocClone);
      captureRoot.appendChild(tocWrapper);
      blocks.push(tocWrapper);
    }

    const bodyClone = body.cloneNode(true) as HTMLElement;
    bodyClone.querySelectorAll<HTMLDetailsElement>("details").forEach((details) => {
      details.open = true;
    });
    captureRoot.appendChild(bodyClone);
    blocks.push(bodyClone);

    const sourceTitle = report.querySelector<HTMLElement>("#report-source-title");
    const sourcePanel = sourceTitle?.closest<HTMLElement>("section");
    if (sourcePanel) {
      const sourceClone = sourcePanel.cloneNode(true) as HTMLElement;
      captureRoot.appendChild(sourceClone);
      blocks.push(sourceClone);
    }

    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });
    const pageState = { y: PAGE_MARGIN_MM };
    let capturedBlock = false;

    for (const block of blocks) {
      const canvas = await toCanvas(block, {
        backgroundColor: "#ffffff",
        pixelRatio: 1.25,
        cacheBust: true,
      });
      if (canvas.width === 0 || canvas.height === 0) continue;
      addCanvasToPdf(pdf, canvas, pageState);
      capturedBlock = true;
    }

    if (!capturedBlock) throw new Error("No report content could be rendered into the PDF.");
    const safeName = schoolName.replace(/[\\/:*?"<>|]/g, "-").replace(/\s+/g, "-");
    pdf.save(`${safeName}-${slug}-报告.pdf`);
  } finally {
    captureRoot.remove();
  }
}
