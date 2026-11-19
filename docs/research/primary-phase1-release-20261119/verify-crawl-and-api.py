from pathlib import Path
import json,subprocess,hashlib,xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor
root=Path('docs/research/primary-phase1-release-20261119');slugs=json.load(open('docs/research/primary-phase1-20261119/batch-status.json'))['scope']
def curl(*args):return subprocess.check_output(['curl','-fsSL','--retry','2','--max-time','40',*args])
def verify(s):
 data=json.loads(curl('-X','POST','-H','Content-Type: application/json','--data',json.dumps({'slug':s}),'https://hkschool.guide/api/report-content'));expected=json.load(open('src/content/reports/'+s+'.json'))['premiumHtml'];assert data.get('ok') and data.get('html')==expected,s;return {'slug':s,'exactContentMatch':True,'sha256':hashlib.sha256(expected.encode()).hexdigest()}
with ThreadPoolExecutor(3) as pool:rows=list(pool.map(verify,slugs))
after=curl('https://hkschool.guide/sitemap.xml');robots=curl('https://hkschool.guide/robots.txt');before=Path('/private/tmp/primary-before-sitemap.xml').read_bytes();oldrobots=Path('/private/tmp/primary-before-robots.txt').read_bytes();locs=lambda x:{e.text for e in ET.fromstring(x).iter() if e.tag.endswith('loc')};a,b=locs(before),locs(after);expected={'https://hkschool.guide'+prefix+'/reports/'+s for prefix in ['', '/cn'] for s in slugs[6:]};assert a-b==set() and b-a==expected,{'missing':sorted(a-b),'extra':sorted(b-a)};assert robots==oldrobots
(root/'production-crawl-and-api.json').write_text(json.dumps({'runtimeReportContent':rows,'sitemapBefore':len(a),'sitemapAfter':len(b),'missingUrls':sorted(a-b),'newUrls':sorted(b-a),'robotsUnchanged':True},ensure_ascii=False,indent=2)+'\n');print('PASS 10 runtime report-content payloads; sitemap',len(a),'→',len(b),'; robots unchanged')
