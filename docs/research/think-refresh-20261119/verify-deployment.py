from pathlib import Path
import json,hashlib,sys
before=json.load(open('/private/tmp/think-baseline-files.json'));after=json.load(open('/private/tmp/think-candidate-files.json'));snapshot=Path('/private/tmp/think-release-path').read_text().strip()
def flat(items,prefix=''):
 out={}
 for item in items:
  k=prefix+item['name']
  if item['type']=='directory':out.update(flat(item.get('children',[]),k+'/'))
  else:out[k]=item.get('uid')
 return out
oldsrc=flat(next(x['children'] for x in before if x['name']=='src'));newsrc=flat(next(x['children'] for x in after if x['name']=='src'));generated='public/blog-data/search.67928881fd932a03.json'
assert set(newsrc)-set(oldsrc)=={generated} and not(set(oldsrc)-set(newsrc))
assert (Path(snapshot)/generated).read_bytes()==Path('/private/tmp/think-baseline-search-index.json').read_bytes(), 'generated index changed'
for k,sha in newsrc.items():assert hashlib.sha1((Path(snapshot)/k).read_bytes()).hexdigest()==sha,k
oldout=flat(next(x['children'] for x in before if x['name']=='out'));newout=flat(next(x['children'] for x in after if x['name']=='out'));missing=set(oldout)-set(newout);assert not missing,sorted(missing)[:10]
result={'deploymentId':'dpl_9twCnWSaBsMEM8arVbrrt4hUP3Cm','sourceFilesVerified':len(newsrc),'generatedSearchIndexUnchanged':True,'baselineOutputPaths':len(oldout),'candidateOutputPaths':len(newout),'lostOutputPaths':len(missing),'newOutputPaths':sorted(set(newout)-set(oldout))}
Path('docs/research/think-refresh-20261119/candidate-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(result)
