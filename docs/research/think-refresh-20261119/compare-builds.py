from pathlib import Path
import json,re,sys
module=Path('docs/research/mobile-performance-20261119/compare-builds.py').read_text().split('before,after=')[0]
exec(module)
a=Path(sys.argv[1])/'.next/server/app';b=Path(sys.argv[2])/'.next/server/app'
paths={p.relative_to(a) for p in a.rglob('*.html')};assert paths=={p.relative_to(b) for p in b.rglob('*.html')},'route inventory changed'
changes=[];unexpected=[]
oldcard='朗思品牌总览·国际课程·英语教学';newcard='三校区PN／K1·语言班·收费与升小'
oldloc='全港3校';newloc='丽港城／马鞍山／南昌'
# Use locale-specific replacements only for exact reviewed Think card text.
translations=[(oldcard,newcard),(oldloc,newloc),('朗思品牌總覽·國際課程·英語教學','三校區PN／K1·語言班·收費與升小'),('全港3校','麗港城／馬鞍山／南昌')]
for rel in sorted(paths):
 before=parse(a/rel).facts();after=parse(b/rel).facts();diff=[k for k in before if before[k]!=after[k]]
 if not diff:continue
 changes.append({'path':str(rel),'changed':diff})
 if str(rel) in ['reports/think.html','cn/reports/think.html']:
  # Think content/source/meta intentionally changes; public identity/alternates preserved.
  for key in ['fields','images']:assert before[key]==after[key],(rel,key)
  continue
 # All other differences must be the exact revised Think card sentence/location.
 old=json.dumps(before,ensure_ascii=False);new=json.dumps(after,ensure_ascii=False)
 if str(rel).startswith('cn/') or str(rel)=='cn.html':pairs=translations[:2]
 else:pairs=translations[2:]
 for x,y in pairs:old=old.replace(x,y)
 if old!=new:unexpected.append({'path':str(rel),'changed':diff});
result={'pagesCompared':len(paths),'changedPages':changes,'unexpectedDifferences':unexpected,'routeInventoryUnchanged':True}
Path('docs/research/think-refresh-20261119/build-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps({'pagesCompared':len(paths),'changedPages':changes[:20],'changedCount':len(changes),'unexpectedDifferences':unexpected[:12]},ensure_ascii=False));assert not unexpected
