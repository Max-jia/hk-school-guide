"""Verify published versioned data and unchanged crawl configuration."""
import hashlib,json,re,subprocess,sys
from pathlib import Path
origin=sys.argv[1].rstrip('/');preview=Path(sys.argv[2]);out=Path(sys.argv[3])
def get(path,headers=False):
 cmd=['curl','-fsSL','--retry','2','--max-time','40']
 if headers:cmd+=['-D','-']
 return subprocess.check_output(cmd+[origin+path])
asset=json.loads((preview/'src/content/generated/blog-search-asset.json').read_text())
raw=get(asset['url']);expected=(preview/'public'/asset['url'].lstrip('/')).read_bytes();assert raw==expected
header=subprocess.check_output(['curl','-fsSI','--max-time','30',origin+asset['url']]).decode().lower()
assert 'application/json' in header and 'max-age=31536000' in header and 'immutable' in header
rows=json.loads(raw);assert len(rows)==asset['total']==175
sitemap=get('/sitemap.xml');robots=get('/robots.txt')
before=Path('/tmp/mobile-prod-before-sitemap.xml').read_bytes();old=set(re.findall(rb'<loc>(.*?)</loc>',before));new=set(re.findall(rb'<loc>(.*?)</loc>',sitemap));assert old==new
assert robots==Path('/tmp/mobile-prod-before-robots.txt').read_bytes()
result={'searchIndexUrl':asset['url'],'searchRows':len(rows),'searchIndexSha256':hashlib.sha256(raw).hexdigest(),'cacheControl':'PASS public max-age=31536000 immutable','sitemapBefore':len(old),'sitemapAfter':len(new),'lostUrls':len(old-new),'robotsUnchanged':True}
out.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(result)
