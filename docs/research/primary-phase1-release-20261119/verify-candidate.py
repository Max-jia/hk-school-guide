from pathlib import Path
import json,hashlib,sys
base=Path('docs/research/primary-phase1-release-20261119');old=json.load(open('/private/tmp/primary-release-baseline-tree.json'));new=json.load(open('/private/tmp/primary-release-candidate-tree.json'));expected=json.load(open(base/'expected-source-map.json'));snapshot=Path('/private/tmp/hk-primary-phase1-release-20261119')
def flat(items,prefix=''):
 result={}
 for r in items:
  p=prefix+r['name']
  if r['type']=='directory':result.update(flat(r.get('children',[]),p+'/'))
  else:result[p]=r.get('uid')
 return result
oldsrc=flat(next(r['children'] for r in old if r['name']=='src'));newsrc=flat(next(r['children'] for r in new if r['name']=='src'));assert newsrc==expected,'Uploaded source mismatch: '+str([(p,h,newsrc.get(p)) for p,h in expected.items() if newsrc.get(p)!=h][:8]);assert all(hashlib.sha1((snapshot/p).read_bytes()).hexdigest()==h for p,h in newsrc.items())
oldout=flat(next(r['children'] for r in old if r['name']=='out'));newout=flat(next(r['children'] for r in new if r['name']=='out'));missing=sorted(set(oldout)-set(newout));assert not missing,missing[:20]
result={'deploymentId':sys.argv[1],'sourceFilesVerified':len(newsrc),'baselineOutputPaths':len(oldout),'candidateOutputPaths':len(newout),'lostOutputPaths':missing,'addedOutputPaths':len(set(newout)-set(oldout)),'noResearchOrLocalReviewIndexUploaded':not any(p.startswith('docs/') or p.endswith('primary-phase1-review.html') for p in newsrc)};assert result['noResearchOrLocalReviewIndexUploaded'];(base/'candidate-verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(result)
