/* eslint-disable @typescript-eslint/no-require-imports */
const fs=require('node:fs');const path=require('node:path');const Module=require('node:module');const assert=require('node:assert/strict');const ts=require('typescript');
const root=process.cwd();const base=process.argv[2];const resolve=Module._resolveFilename;
Module._resolveFilename=function(request,parent,...rest){return resolve.call(this,request.startsWith('@/')?path.join(root,'src',request.slice(2)):request,parent,...rest);};
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText,filename);
const before=require(path.join(base,'src/lib/i18n.ts'));const after=require(path.join(root,'src/lib/i18n.ts'));
const {normalizeBlogQuery}=require(path.join(root,'src/lib/blog-query-normalizer.ts'));
const {normalizeSearch}=require(path.join(root,'src/lib/normalize-search.ts'));
const copy=require(path.join(root,'src/lib/site-header-copy.json'));
for(const [key,locales]of Object.entries(copy))for(const locale of ['tc','sc'])assert.equal(locales[locale],before.L(key,locale));
const posts=require(path.join(root,'src/content/blog-meta.json'));
const queries=[...posts.flatMap(p=>[p.title,p.scTitle].filter(Boolean)),'學费','九龍城 學費','K1 面试','梁銶琚','般咸道','東涌'];
for(const q of queries){for(const locale of ['tc','sc'])assert.equal(after.L(q,locale),before.L(q,locale));assert.equal(normalizeBlogQuery(q),normalizeSearch(before.L(q,'sc')));}
const meta=require(path.join(root,'src/content/report-meta.json'));const count=require(path.join(root,'src/content/generated/report-count.json'));
assert.equal(count.total,meta.PS_REPORTS.length+meta.KG_REPORTS.length+meta.SS_REPORTS.length);
const asset=require(path.join(root,'src/content/generated/blog-search-asset.json'));const rows=JSON.parse(fs.readFileSync(path.join(root,'public',asset.url)));
assert.equal(rows.length,posts.length);assert.equal(new Set(rows.map(r=>r.slug)).size,posts.length);
const result={headerCopyChecks:Object.keys(copy).length*2,conversionInputs:queries.length,reportCount:count.total,indexRows:rows.length,result:'PASS'};
fs.writeFileSync('docs/research/mobile-performance-20261119/copy-and-data-checks.json',JSON.stringify(result,null,2)+'\n');console.log(result);
