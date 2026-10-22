import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { NextRequest, NextResponse } from "next/server";
import { EXCLUDED_SLUGS, listReportSlugs, loadReport } from "@/lib/reports";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function printOverrides(locale: "sc" | "tc") {
  const cjkFont = locale === "tc" ? "NotoSansHK-VF.otf" : "NotoSansSC-VF.otf";
  return `
  @font-face {
    font-family: "Report CJK";
    src: url("/fonts/${cjkFont}") format("opentype");
    font-style: normal;
    font-weight: 100 900;
    font-display: block;
  }
  @media print {
    .report-document-page {
      --p-sans: "Atlas Grotesk", "Report CJK", "Helvetica Neue", Helvetica, Arial, sans-serif;
      --p-serif: "Gooper SemiCondensed", "Report CJK", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
      --p-mono: "Atlas Typewriter", "Report CJK", Menlo, Consolas, Monaco, monospace;
      font-family: var(--p-sans) !important;
    }
    .report-document-page :is(h1, h2, h3, h4) {
      font-family: var(--p-serif) !important;
    }
    .pdf-brand-watermark {
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      z-index: 2147483647 !important;
      transform: translate(-50%, -50%) rotate(-28deg) !important;
      color: rgba(44, 62, 80, 0.12) !important;
      font-family: "Atlas Grotesk", "Report CJK", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
      font-size: 68pt !important;
      font-weight: 700 !important;
      line-height: 1 !important;
      letter-spacing: 0.12em !important;
      white-space: nowrap !important;
      pointer-events: none !important;
      user-select: none !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .report-body .report-table-scroll__viewport {
      width: 100% !important;
      max-width: none !important;
      overflow: visible !important;
    }
    .report-body .report-table-scroll table.report-scroll-table {
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      table-layout: fixed !important;
    }
    .report-body .report-table-scroll table.report-scroll-table th,
    .report-body .report-table-scroll table.report-scroll-table td {
      min-width: 0 !important;
      max-width: none !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
    }
    .report-table-scroll__hint,
    .report-table-scroll .scroll-note {
      display: none !important;
    }
    details:not([open]) > :not(summary) {
      display: block !important;
    }
    .report-body a { overflow-wrap: anywhere; }
  }
`;
}

function renderOrigin(request: NextRequest): string {
  if (process.env.VERCEL_ENV === "production") return SITE_URL;

  const deploymentHost = process.env.VERCEL_URL;
  if (deploymentHost) return `https://${deploymentHost}`;

  const configuredOrigin = process.env.REPORT_PDF_BASE_URL;
  if (configuredOrigin) return new URL(configuredOrigin).origin;

  const requestUrl = new URL(request.url);
  if (
    ["localhost", "127.0.0.1", "::1"].includes(requestUrl.hostname)
  ) {
    return requestUrl.origin;
  }

  throw new Error("PDF renderer base URL is not configured.");
}

function safeFilename(value: string): string {
  return value.replace(/[\\/:*?"<>|\r\n]/g, "-").replace(/\s+/g, "-").slice(0, 120);
}

async function launchBrowser() {
  if (process.platform === "darwin") {
    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH ??
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    return puppeteer.launch({
      executablePath,
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  return puppeteer.launch({
    args: await puppeteer.defaultArgs({ args: chromium.args, headless: "shell" }),
    executablePath: await chromium.executablePath(),
    headless: "shell",
  });
}

export async function GET(request: NextRequest, context: RouteContext<"/api/reports/[slug]/pdf">) {
  const { slug } = await context.params;
  if (!/^[a-z0-9-]+$/.test(slug) || EXCLUDED_SLUGS.has(slug) || !listReportSlugs().includes(slug)) {
    return NextResponse.json({ ok: false, reason: "not-found" }, { status: 404 });
  }

  const report = loadReport(slug);
  if (!report) return NextResponse.json({ ok: false, reason: "not-found" }, { status: 404 });

  const locale = request.nextUrl.searchParams.get("locale") === "tc" ? "tc" : "sc";
  const path = locale === "tc" ? `/reports/${slug}` : `/cn/reports/${slug}`;
  let browser: Awaited<ReturnType<typeof launchBrowser>> | undefined;

  try {
    const origin = renderOrigin(request);
    browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
    const requestCookies = request.headers.get("cookie");
    const protectionBypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    if (requestCookies || protectionBypass) {
      await page.setRequestInterception(true);
      page.on("request", (browserRequest) => {
        const headers = browserRequest.headers();
        let isSameOrigin = false;
        try {
          isSameOrigin = new URL(browserRequest.url()).origin === origin;
        } catch {
          // Leave non-HTTP resource headers untouched.
        }
        if (isSameOrigin) {
          if (requestCookies) headers.cookie = requestCookies;
          if (protectionBypass) headers["x-vercel-protection-bypass"] = protectionBypass;
        }
        void browserRequest.continue({ headers }).catch(() => undefined);
      });
    }
    await page.emulateMediaType("print");
    await page.goto(new URL(path, origin).toString(), {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await page.addStyleTag({ content: printOverrides(locale) });
    await page.waitForSelector(`[data-report-slug="${slug}"] .report-body`, { timeout: 20_000 });
    await page.evaluate(async () => {
      document.querySelectorAll<HTMLDetailsElement>("details").forEach((details) => {
        details.open = true;
      });
      await document.fonts.load('14px "Report CJK"', "学校報告資料");
      await document.fonts.ready;
      const watermark = document.createElement("div");
      watermark.className = "pdf-brand-watermark";
      watermark.setAttribute("aria-hidden", "true");
      watermark.textContent = "港学荟";
      document.body.append(watermark);
      const images = Array.from(document.querySelectorAll<HTMLImageElement>(".report-document-page img"));
      await Promise.all(images.map(async (image) => {
        image.loading = "eager";
        if (!image.complete) {
          await new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
            window.setTimeout(resolve, 8_000);
          });
        }
        await image.decode().catch(() => undefined);
      }));
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "14mm", right: "14mm", bottom: "14mm", left: "14mm" },
      displayHeaderFooter: false,
    });
    await page.close();

    const schoolName = report.title.replace(/\s*深度(?:择校|擇校)报告$/, "").trim() || slug;
    const filename = safeFilename(`${schoolName}-${slug}-报告.pdf`);
    const asciiFilename = `${slug}-report.pdf`;
    const encodedFilename = encodeURIComponent(filename).replace(/[!'()*]/g, (char) =>
      `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
    );
    const pdfBody = new ArrayBuffer(pdf.byteLength);
    new Uint8Array(pdfBody).set(pdf);

    return new Response(pdfBody, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${asciiFilename}"; filename*=UTF-8''${encodedFilename}`,
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Report PDF render failed", { slug, error });
    return NextResponse.json({ ok: false, reason: "render-failed" }, { status: 500 });
  } finally {
    await browser?.close().catch(() => undefined);
  }
}
