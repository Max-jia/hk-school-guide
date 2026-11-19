from pathlib import Path
import json,subprocess,re,hashlib
from html.parser import HTMLParser
out=Path('docs/research/think-refresh-20261119/qa');out.mkdir(exist_ok=True)
old=lambda f:subprocess.check_output(['git','show','HEAD:'+f],text=True)
path='src/content/report-meta.json';a=json.loads(old(path));b=json.loads(Path(path).read_text())
def strip(x):
 if isinstance(x,list):return [strip(v) for v in x if not(isinstance(v,dict) and v.get('c')=='think')]
 if isinstance(x,dict):return {k:strip(v) for k,v in x.items()}
 return x
assert strip(a)==strip(b),'other report cards changed'
p='src/lib/report-sources.ts';pattern=r'  "think": \[[\s\S]*?\n  \],';assert re.sub(pattern,'THINK',old(p))==re.sub(pattern,'THINK',Path(p).read_text()),'other report sources changed'
d=json.loads(Path('src/content/reports/think.json').read_text());before=json.loads(old('src/content/reports/think.json'))
for k in ['slug','premium','free','allAccessUrl','singleUrl']:assert d[k]==before[k],k
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.stack=[];self.sections=[];self.tables=0
 def handle_starttag(self,tag,attrs):
  if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(tag)
  if tag=='section':self.sections.append(dict(attrs))
  if tag=='table':self.tables+=1
 def handle_endtag(self,tag):
  assert self.stack and self.stack[-1]==tag,(tag,self.stack[-5:]);self.stack.pop()
x=Parser();x.feed(d['hero']+d['body']+d['premiumHtml']);assert not x.stack;assert len(x.sections)==8;assert x.tables==12
assert [int(s) for s in re.findall(r'<span class="num">(\d)</span>',d['body']+d['premiumHtml'])]==list(range(1,9))
sources=json.loads(Path('docs/research/think-refresh-20261119/report-source-ledger.json').read_text());assert len(sources)==24
assert all(x['checkedOn']=='2026-11-19' and x['url'].startswith('https://') for x in sources)
# Archive all original official materials and audit evidence with hashes for reproducibility.
root=Path('docs/research/think-refresh-20261119');files=[]
for p in sorted(root.rglob('*')):
 if p.is_file() and p.name!='artifact-manifest.json':files.append({'path':str(p.relative_to(root)),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(root/'artifact-manifest.json').write_text(json.dumps(files,ensure_ascii=False,indent=2)+'\n')
result={'reportCardsOtherThanThink':'unchanged','sourceBlocksOtherThanThink':'unchanged','identityAndFlags':'unchanged','balancedHTML':True,'chapters':8,'tables':12,'officialSourceReferences':len(sources)}
(out/'scope-checks.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False))
