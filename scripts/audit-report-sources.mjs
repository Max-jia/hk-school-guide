import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const rootDir = process.cwd();
const registryPath = path.join(rootDir, "src/lib/report-sources.ts");
const sourceText = fs.readFileSync(registryPath, "utf8");
const sourceFile = ts.createSourceFile(
  registryPath,
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TS
);

let registryNode;
function findRegistry(node) {
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.name.text === "REPORT_SOURCES"
  ) {
    registryNode = node.initializer;
  }
  ts.forEachChild(node, findRegistry);
}
findRegistry(sourceFile);

if (!registryNode || !ts.isObjectLiteralExpression(registryNode)) {
  throw new Error("Could not locate REPORT_SOURCES object in source registry.");
}

const registry = new Map();
for (const property of registryNode.properties) {
  if (!ts.isPropertyAssignment(property) || !ts.isArrayLiteralExpression(property.initializer)) continue;
  const slug = ts.isIdentifier(property.name)
    ? property.name.text
    : ts.isStringLiteral(property.name)
      ? property.name.text
      : null;
  if (!slug) throw new Error(`Unsupported report source key: ${property.name.getText(sourceFile)}`);

  const refs = [];
  for (const item of property.initializer.elements) {
    if (!ts.isObjectLiteralExpression(item)) throw new Error(`${slug}: source reference must be an object.`);
    const ref = {};
    for (const field of item.properties) {
      if (!ts.isPropertyAssignment(field)) continue;
      const name = ts.isIdentifier(field.name) ? field.name.text : ts.isStringLiteral(field.name) ? field.name.text : null;
      if (name && ts.isStringLiteral(field.initializer)) ref[name] = field.initializer.text;
    }
    refs.push(ref);
  }
  registry.set(slug, refs);
}

function decodeHtml(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
}

function fail(message) {
  throw new Error(message);
}

function isAllowedSourceUrl(url, slug) {
  if (/^https:\/\//.test(url ?? "")) return true;
  // This school's official CHSC-listed site serves its 2027/28 originals over HTTP;
  // its HTTPS endpoint currently fails. Keep the exception pinned to this school.
  return slug === "aberdeen-technical-school-secondary" &&
    /^http:\/\/www\.ats\.edu\.hk(?:\/|$)/.test(url ?? "");
}

for (const [slug, refs] of registry) {
  if (refs.length === 0) fail(`${slug}: source list is empty.`);
  const urls = new Set();
  for (const [index, ref] of refs.entries()) {
    const prefix = `${slug} source ${index + 1}`;
    if (!ref.label?.trim() || !ref.scope?.trim()) fail(`${prefix}: label and scope are required.`);
    if (!isAllowedSourceUrl(ref.url, slug)) fail(`${prefix}: URL must use HTTPS or the pinned official-school exception.`);
    if (urls.has(ref.url)) fail(`${prefix}: duplicate source URL ${ref.url}.`);
    urls.add(ref.url);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(ref.checkedOn ?? "")) fail(`${prefix}: checkedOn must use YYYY-MM-DD.`);
    if (!fs.existsSync(path.join(rootDir, `src/content/reports/${slug}.json`))) {
      fail(`${slug}: source registry entry has no corresponding report JSON.`);
    }
  }

  for (const [locale, htmlPath] of [
    ["tc", `.next/server/app/reports/${slug}.html`],
    ["sc", `.next/server/app/cn/reports/${slug}.html`],
  ]) {
    const absolutePath = path.join(rootDir, htmlPath);
    if (!fs.existsSync(absolutePath)) fail(`${locale}/${slug}: built HTML not found; run the production build first.`);
    const html = fs.readFileSync(absolutePath, "utf8");
    const sectionStart = html.indexOf('aria-labelledby="report-source-title"');
    if (sectionStart < 0) fail(`${locale}/${slug}: visible source panel is missing.`);
    const sectionEnd = html.indexOf("</section>", sectionStart);
    const section = html.slice(sectionStart, sectionEnd < 0 ? undefined : sectionEnd);
    const visibleUrls = [...section.matchAll(/href="([^"]+)"/g)]
      .map((match) => decodeHtml(match[1]))
      .filter((url) => isAllowedSourceUrl(url, slug));
    if (visibleUrls.length !== refs.length || refs.some((ref) => !visibleUrls.includes(ref.url))) {
      fail(`${locale}/${slug}: visible source links do not match the registry.`);
    }

    const jsonLdScripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
    const citations = [];
    for (const [, rawJson] of jsonLdScripts) {
      try {
        const parsed = JSON.parse(rawJson);
        if (Array.isArray(parsed.citation)) citations.push(...parsed.citation);
      } catch {
        // The report's other structured-data blocks may have unrelated payloads.
      }
    }
    if (citations.length !== refs.length || refs.some((ref) => !citations.includes(ref.url))) {
      fail(`${locale}/${slug}: JSON-LD citations do not match the registry.`);
    }
  }
}

for (const [locale, htmlPath] of [
  ["tc", ".next/server/app/reports/aps.html"],
  ["sc", ".next/server/app/cn/reports/aps.html"],
]) {
  const absolutePath = path.join(rootDir, htmlPath);
  if (!fs.existsSync(absolutePath)) fail(`${locale}/aps control: built HTML not found.`);
  if (fs.readFileSync(absolutePath, "utf8").includes('aria-labelledby="report-source-title"')) {
    fail(`${locale}/aps control: unregistered report unexpectedly has a source panel.`);
  }
}

console.log(
  `PASS: ${registry.size} reports, ${registry.size * 2} bilingual pages, visible links and JSON-LD citations match; unregistered control unchanged.`
);
