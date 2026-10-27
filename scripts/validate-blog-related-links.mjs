import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
const meta = readJson("src/content/blog-meta.json");
const reportMeta = readJson("src/content/report-meta.json");
const reportIds = new Set([...(reportMeta.KG_REPORTS ?? []), ...(reportMeta.PS_REPORTS ?? []), ...(reportMeta.SS_REPORTS ?? [])].map((r) => r.c));
const source = fs.readFileSync(path.join(root, "src/lib/blog-related-links.ts"), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2020 } }).outputText;
const exports = {};
vm.runInNewContext(code, { exports, require: (name) => {
  if (name === "@/content/report-meta.json") return reportMeta;
  throw new Error(`Unexpected dependency: ${name}`);
} });
const configs = exports.BLOG_RELATED_LINKS;
const errors = [];
const rows = [];
const slugs = new Set(meta.map((row) => row.slug));
const clusterSource = fs.readFileSync(path.join(root, "src/lib/blog-clusters.ts"), "utf8");
const topicIds = new Set([...clusterSource.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]));
const allowedActions = new Set(["/schools", "/planning", "/shortlist", "/tools/p1-school-net", "/tools/p1-discretionary", "/tools/p1-simulator"]);

for (const article of meta) {
  const config = configs[article.slug];
  if (!config) { errors.push(`Missing sidebar: ${article.slug}`); continue; }
  const seen = new Set();
  const links = config.groups.flatMap((group) => group.links);
  if (links.length < 4 || links.length > 6) errors.push(`Unexpected link count: ${article.slug}`);
  for (const group of config.groups) {
    if (!group.title || !group.links.length) errors.push(`Empty group: ${article.slug}`);
    for (const link of group.links) {
      const url = new URL(link.href, "https://hkschool.guide");
      if (!link.href.startsWith("/") || link.href.startsWith("//")) errors.push(`Nonlocal URL: ${link.href}`);
      if (!link.label || seen.has(link.href)) errors.push(`Empty or duplicate link: ${article.slug} ${link.href}`);
      if (url.pathname === `/blog/${article.slug}`) errors.push(`Self link: ${article.slug}`);
      seen.add(link.href);
      let exists = false;
      if (url.pathname.startsWith("/blog/topics/")) exists = topicIds.has(url.pathname.slice(13));
      else if (url.pathname.startsWith("/blog/")) exists = slugs.has(url.pathname.slice(6));
      else if (url.pathname.startsWith("/reports/")) exists = reportIds.has(url.pathname.slice(9));
      // Profile aliases are resolved by the production build. Verify their actual
      // statically generated files with --build; raw registration slugs can differ.
      else if (/^\/schools\/(kindergarten|primary|secondary)\//.test(url.pathname)) exists = true;
      else exists = allowedActions.has(url.pathname);
      if (!exists) errors.push(`Unknown target: ${article.slug} ${link.href}`);
      rows.push({ article: article.slug, stage: config.stage, group: group.title, label: link.label, href: link.href });
    }
  }
}
for (const slug of Object.keys(configs)) if (!slugs.has(slug)) errors.push(`Orphan sidebar: ${slug}`);

const buildIndex = process.argv.indexOf("--build");
if (buildIndex >= 0) {
  const buildRoot = path.resolve(process.argv[buildIndex + 1]);
  const appPaths = JSON.parse(fs.readFileSync(path.join(buildRoot, ".next/server/app-paths-manifest.json"), "utf8"));
  const dynamicRoutes = new Set(Object.keys(appPaths).map((route) => route.replace(/\/\([^/]+\)/g, "").replace(/\/page$/, "")));
  for (const prefix of ["", "/cn"]) {
    for (const article of meta) {
      const filename = path.join(buildRoot, ".next/server/app", `${prefix}/blog/${article.slug}.html`);
      if (!fs.existsSync(filename)) { errors.push(`Missing rendered blog: ${filename}`); continue; }
      const html = fs.readFileSync(filename, "utf8");
      const modules = [...html.matchAll(/<div[^>]*data-blog-related-content="(?:true)?"[^>]*>/g)];
      if (modules.length !== 2) errors.push(`Expected desktop and compact modules: ${prefix}/${article.slug}`);
      if ((html.match(/<h1[ >]/g) ?? []).length !== 1) errors.push(`Invalid H1: ${prefix}/${article.slug}`);
      for (const row of rows.filter((row) => row.article === article.slug)) {
        const target = new URL(row.href, "https://hkschool.guide");
        const targetFile = path.join(buildRoot, ".next/server/app", `${prefix}${target.pathname}.html`);
        if (!fs.existsSync(targetFile) && !dynamicRoutes.has(`${prefix}${target.pathname}`)) errors.push(`Missing built target: ${prefix}${target.pathname}`);
        const escapedHref = `${prefix}${row.href}`.replaceAll("&", "&amp;");
        if (!html.includes(`href="${escapedHref}"`)) errors.push(`Link not server rendered: ${prefix}/${article.slug} ${row.href}`);
      }
    }
  }
}

const outIndex = process.argv.indexOf("--output");
if (outIndex >= 0) fs.writeFileSync(process.argv[outIndex + 1], JSON.stringify({ articles: meta.length, links: rows.length, uniqueTargets: new Set(rows.map((r) => r.href)).size, errors, rows }, null, 2) + "\n");
console.log(JSON.stringify({ articles: meta.length, links: rows.length, uniqueTargets: new Set(rows.map((r) => r.href)).size, errors }, null, 2));
if (errors.length) process.exitCode = 1;
