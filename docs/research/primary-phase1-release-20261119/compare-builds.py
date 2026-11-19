from pathlib import Path
import json,sys,re
module=Path('docs/research/mobile-performance-20261119/compare-builds.py').read_text().split('before,after=')[0];exec(module)
before=Path('/private/tmp/hk-think-release-1tqvn94t/.next/server/app');after=Path('/private/tmp/hk-primary-phase1-release-20261119/.next/server/app');base=Path('docs/research/primary-phase1-release-20261119');slugs=json.load(open('docs/research/primary-phase1-20261119/batch-status.json'))['scope'];old={p.relative_to(before) for p in before.rglob('*.html')};new={p.relative_to(after) for p in after.rglob('*.html')};missing=old-new;added=new-old;expected={Path(prefix+'reports/'+s+'.html') for s in slugs[6:] for prefix in ['', 'cn/']};assert not missing,missing;assert added==expected,(added,expected)
changes=[];unexpected=[];relatedOnly=[];target={prefix+'reports/'+s+'.html' for s in slugs for prefix in ['', 'cn/']};listing={'reports.html','cn/reports.html'}
for rel in sorted(old):
 a=parse(before/rel).facts();b=parse(after/rel).facts();diff=[k for k in a if a[k]!=b[k]]
 if not diff:continue
 changes.append({'path':str(rel),'changed':diff})
 if str(rel) in target|listing:continue
 if str(rel) in {'index.html','cn.html'}:
  oldFacts=json.dumps(a,ensure_ascii=False).replace('查看全部 239 份','查看全部 243 份')
  if oldFacts==json.dumps(b,ensure_ascii=False):continue
 if str(rel).startswith(('reports/','cn/reports/')):
  def without_related(p):
   html=p.read_text();pattern=r'<section class="mt-14 border-t border-black/15 pt-7 dark:border-white/15[^"]*">[\s\S]*?</section>'
   clean,n=re.subn(pattern,'',html);assert n==1,(rel,'related section extraction')
   obj=Page();obj.feed(clean);return obj.facts()
  if without_related(before/rel)==without_related(after/rel):
   relatedOnly.append(str(rel));continue
 unexpected.append({'path':str(rel),'changed':diff})
result={'pagesCompared':len(old),'newBilingualPages':sorted(map(str,added)),'missingPages':list(map(str,missing)),'changedPages':changes,'unexpectedDifferences':unexpected,'relatedFooterOnlyChanges':relatedOnly};(base/'build-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False,indent=2));assert not unexpected,'Unrelated page changes require review'
