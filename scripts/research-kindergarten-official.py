#!/usr/bin/env python3
"""Read-only official KGP evidence collector. Raw HTML preserves blank cells.
Run with the bundled Python (lxml) and an explicit campus-ID queue, never guessed IDs.
No session inference from fee amounts or teacher ratios. No inferred language shares.
"""
import argparse, concurrent.futures, datetime, gzip, hashlib, json, pathlib, re, time, urllib.request
from lxml import html
UA = 'SchoolProfileVerification/1.0 (user-requested public school information check)'
C = 'contains(concat(" ",normalize-space(@class)," ")," %s ")'
def text(e): return re.sub(r'\s+', ' ', ''.join(e.itertext())).strip()
def headings(e): return e.xpath('.//*[' + C % 'elementor-heading-title' + ']')
def cells(r): return [' / '.join(text(v) for v in headings(c)) for c in r.xpath('./div[@data-element_type="container"]')]
def rows(b):
    return [cells(r) for r in b.xpath('.//div[@data-element_type="container"]') if len(r.xpath('./div[@data-element_type="container"]')) >= 2]
def parse(raw, campus, url):
    p = html.fromstring(raw)
    blocks = p.xpath('//div[' + C % 'inner-wrap' + ']')
    parsed = {'campus':campus, 'sourceUrl':url, 'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(), 'sha256':hashlib.sha256(raw).hexdigest()}
    sections = {}
    for b in blocks:
        hs=headings(b)
        if hs: sections[text(hs[0])] = {'block':b,'rows':rows(b),'headings':[text(h) for h in hs]}
    general=next((s for t,s in sections.items() if t=='學校資料'),None)
    if general:
        for row in general['rows']:
            if row[0] in ['學校網址']: parsed['website']=row[-1]
    # Identity is not accepted merely because the URL contains an ID.
    all_values=[text(h) for h in headings(p)]
    if '地址:' in all_values: parsed['address']=all_values[all_values.index('地址:')+1]
    titles=p.xpath('//h2[' + C % 'elementor-heading-title' + ']')
    if len(titles)>=3: parsed['name']=text(titles[2])
    for label,key,expected in [('學校編號','schoolNumber',campus[:6]),('校址編號','locationId',campus[6:])]:
        if label in all_values:
            val=all_values[all_values.index(label)+1]
            parsed[key]=val
            if val != expected: raise ValueError(f'identity mismatch {label}: {val} != {expected}')
        else: raise ValueError(f'missing identity {label}')
    fee=next(((t,s) for t,s in sections.items() if t.startswith('全年學費')),None)
    if fee:
        title,s=fee
        year=re.search(r'20\d{2}/\d{2}',title)
        parsed['feePeriod']=year.group() if year else None
        joining=s['block'].xpath('.//*[@data-joining]/@data-joining')
        parsed['feeBasis']='扣減政府資助後全年學費' if joining==['Y'] else '全年學費'
        parsed['fees']=[{'session':r[1], 'K1':r[2], 'K2':r[3], 'K3':r[4]} for r in s['rows'] if len(r)==5 and r[1] in ['上午班','下午班','全日班']]
        parsed['feeCertificate']=next(iter(s['block'].xpath('.//a[contains(@href,"schoolfee")]/@href')),None)
    enrolled=next(((t,s) for t,s in sections.items() if t.startswith('學生人數')),None)
    if enrolled:
        title,s=enrolled
        parsed['enrolmentPeriod']=re.search(r'20\d{2}年\d{1,2}月',title).group()
        parsed['enrolment']=[{'session':r[0], 'K1':r[1], 'K2':r[2], 'K3':r[3], 'total':r[4]} for r in s['rows'] if len(r)==5 and r[0] in ['上午班','下午班','全日班']]
    approved=next(((t,s) for t,s in sections.items() if t.startswith('其他核准收費')),None)
    if approved:
        title,s=approved; parsed['registrationPeriod']=re.search(r'20\d{2}/\d{2}',title).group()
        rs=s['rows']
        for i,r in enumerate(rs):
            if r==['半日班','全日班'] and i+1<len(rs) and len(rs[i+1])==2:
                parsed['registration']={'半日班':rs[i+1][0],'全日班':rs[i+1][1]}
    nursery=next(((t,s) for t,s in sections.items() if t.startswith('幼兒服務')),None)
    if nursery:
        title,s=nursery;hs=s['headings']
        parsed['pnPeriod']=re.search(r'20\d{2}年\d{1,2}月',title).group()
        if '提供2-3歲幼兒服務' in hs: parsed['pnProvision']=hs[hs.index('提供2-3歲幼兒服務')+1]
    curriculum=next((s for t,s in sections.items() if t=='以下資料由學校提供。'),None)
    if curriculum:
        hs=curriculum['headings']
        parsed['curriculumText']={label:hs[hs.index(label)+1] for label in ['課程規劃','學習 / 教學模式及活動'] if label in hs and hs.index(label)+1<len(hs)}
    return parsed

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--queue',required=True);ap.add_argument('--cache',required=True);ap.add_argument('--output',required=True);ap.add_argument('--workers',type=int,default=4);ap.add_argument('--limit',type=int);ap.add_argument('--parse-only',action='store_true'); a=ap.parse_args()
    cache=pathlib.Path(a.cache);cache.mkdir(parents=True,exist_ok=True)
    ids=json.loads(pathlib.Path(a.queue).read_text());ids=ids[:a.limit] if a.limit else ids
    assert all(re.fullmatch(r'\d{10}',i) for i in ids)
    def one(campus):
        u=f'https://kgp2026.kindergartenprofile.com/school/?schid={campus}'
        f=cache/f'{campus}.html.gz'
        try:
            if f.exists(): raw=gzip.decompress(f.read_bytes())
            elif a.parse_only: return {'campus':campus,'error':'not cached'}
            else:
                for attempt in range(3):
                    try:
                        with urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':UA}),timeout=35) as r: raw=r.read()
                        # Parse and identity-check before caching to avoid storing an error page.
                        parse(raw,campus,u);f.write_bytes(gzip.compress(raw));break
                    except ValueError:
                        raise
                    except Exception:
                        if attempt==2:raise
                        time.sleep(1+attempt*2)
                time.sleep(.3)
            return parse(raw,campus,u)
        except Exception as ex:return {'campus':campus,'sourceUrl':u,'error':f'{type(ex).__name__}: {ex}'}
    result=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=min(a.workers,6)) as pool:
        for item in pool.map(one,ids):
            result.append(item)
            if len(result)%25==0:
                pathlib.Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
                print(json.dumps({'done':len(result),'total':len(ids),'errors':sum('error'in r for r in result)}),flush=True)
    pathlib.Path(a.output).write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'done':len(result),'errors':sum('error'in r for r in result)}),flush=True)
if __name__=='__main__':main()
