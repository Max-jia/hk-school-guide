#!/usr/bin/env python3
"""Read the official English counterpart only for campus IDs explicitly identified
in the Chinese overview and registry. Keep English-only source claims for review.
"""
import argparse,concurrent.futures,gzip,hashlib,json,pathlib,re,time,urllib.request
from lxml import html
p=argparse.ArgumentParser();p.add_argument('--queue',required=True);p.add_argument('--cache',required=True);p.add_argument('--output',required=True);a=p.parse_args()
base=pathlib.Path(a.cache);base.mkdir(parents=True,exist_ok=True)
def one(eid):
 u=f'https://kgp2026.kindergartenprofile.com/en/school/?schid={eid}';f=base/(eid+'.html.gz');r={'campus':eid,'sourceUrl':u,'checkedAt':'2026-10-26'}
 try:
  if f.exists():raw=gzip.decompress(f.read_bytes())
  else:
   with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'SchoolProfileVerification/1.0'}),timeout=35)as response:raw=response.read()
  tree=html.fromstring(raw);hs=[' '.join(''.join(x.itertext()).split())for x in tree.xpath('//*[contains(@class,"elementor-heading-title")]')]
  assert hs[hs.index('School No.')+1]==eid[:6] and hs[hs.index('Location No.')+1]==eid[6:],'English source identity mismatch'
  if not f.exists():f.write_bytes(gzip.compress(raw))
  r.update({'sha256':hashlib.sha256(raw).hexdigest(),'passages':{}})
  for label in ['Curriculum planning','Learning / Teaching approach and activities']:
   if label in hs:r['passages'][label]=hs[hs.index(label)+1]
  time.sleep(.2)
 except Exception as e:r['error']=str(e)
 return r
out=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=4)as pool:
 for r in pool.map(one,json.load(open(a.queue))):
  out.append(r)
  if len(out)%10==0:print({'done':len(out)},flush=True)
pathlib.Path(a.output).write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print('finished',len(out),flush=True)
