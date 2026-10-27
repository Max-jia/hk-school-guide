/* Check factual boundaries rather than prescribing one sentence template. */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import Module, { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";
const load = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  return originalResolve.call(this, request.startsWith("@/") ? path.join(root, "src", request.slice(2)) : request, parent, ...rest);
};
Module._extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);

const { blogTitle, blogDescription, BLOG_META, getBlogPost, blogPostJsonLd } = load("../src/lib/blog.ts");
const { L } = load("../src/lib/i18n.ts");
const rows = [];
for (const meta of BLOG_META) {
  const post = getBlogPost(meta.slug);
  assert.ok(post, meta.slug);
  for (const locale of ["tc", "sc"]) {
    const title = blogTitle(post, locale);
    const description = blogDescription(post, locale);
    assert.equal(title, L(title, locale), `Mixed-script title: ${meta.slug} ${locale}`);
    assert.equal(description, L(description, locale), `Mixed-script description: ${meta.slug} ${locale}`);
    const article = blogPostJsonLd(post, locale)["@graph"].find((n) => n["@type"] === "Article");
    assert.equal(article.headline, title, `Schema title drift: ${meta.slug}`);
    assert.equal(article.description, description, `Schema description drift: ${meta.slug}`);
    if (locale === "tc" && meta.seoTitle) assert.equal(title.replace(/ \| 港[學学][薈荟]$/, ""), L(meta.seoTitle, locale).replace(/ \| 港[學学][薈荟]$/, ""));
    rows.push({slug: meta.slug, locale, title, description});
  }
}
const arg = process.argv.indexOf("--output");
if (arg >= 0) fs.writeFileSync(process.argv[arg + 1], JSON.stringify({articles:BLOG_META.length, localeCases:rows.length, errors:[], rows}, null, 2)+"\n");
console.log(JSON.stringify({articles:BLOG_META.length, localeCases:rows.length, errors:[]}));
