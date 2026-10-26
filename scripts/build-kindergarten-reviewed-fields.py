#!/usr/bin/env python3
"""Merge campus-matched primary-source evidence; never guess missing values.
Inputs are archived research ledgers, not search snippets. Output feeds both
concise profiles and directory facts. Reviewed manual exceptions remain explicit.
"""
import argparse,json,pathlib,re,unicodedata
DATE='2026-10-26'
def load(p):return json.loads(pathlib.Path(p).read_text())
def norm(s):return re.sub(r'[^a-z0-9\u3400-\u9fff]','',unicodedata.normalize('NFKC',s).lower())
def fmt(n):return f'{n:,}'
def amounts(s):
 if s=='免費':return [0]
 # Annual-fee cells can publish a range, including different instalment counts.
 # Only read a complete currency/instalment expression; '-' is not a zero.
 m=re.fullmatch(r'\$([\d,]+)(?:\.00)?(?:\s*\((\d+)\))?(?:\s*[-–至]\s*\$?([\d,]+)(?:\.00)?(?:\s*\((\d+)\))?)?',s)
 return [int(v.replace(',',''))for v in [m[1],m[3]]if v]if m else []

def language_fact(passages,url,period):
 # Literal sentences, no teacher nationality -> medium or mother tongue -> Cantonese conversion.
 clean=[re.sub(r'\s+',' ',p).strip()for p in passages]
 medium=[]
 for original in clean:
  p=original.replace('廣東話','粵語')
  if re.search(r'語言的(?:直資|國際|官立|資助)?小學|如計劃|不是|並非|不以',p):continue
  # A language used for an English/PE activity does not define the whole curriculum.
  if re.search(r'(?:英文活動|體能活動).*以(?:英語|普通話)為教學語言',p):continue
  if re.search(r'(?:教學語言|授課語言)[：:]\s*(?:粵語|英語|普通話)',p):
   clause=re.split(r'(?:教學語言|授課語言)[：:]',p)[-1].split('。')[0]
   medium=[x for x in ['粵語','普通話','英語']if x in clause]
  for lang in ['粵語','普通話','英語','英文']:
   if re.search(r'以'+lang+r'(?:作為|作|為)?(?:日常|主要)?(?:教學|授課)?(?:語言|為主)|以'+lang+r'為(?:主要|主)|'+lang+r'為主要(?:教學|授課)語言',p):
    medium.append('英語'if lang=='英文'else lang)
  if re.search(r'(?:English\s+is\s+the\s+(?:main|primary)\s+(?:medium|language)\s+of\s+instruction|(?:primary\s+)?(?:medium|language) of instruction\s*(?:is|:)\s*English)',p,re.I):medium.append('英語')
  if re.search(r'(?:mainly in Cantonese|medium of instruction\s*(?:is|:)\s*Cantonese)',p,re.I):medium.append('粵語')
  if re.search(r'全普通話及英文的教學語言環境',p):medium.extend(['普通話','英語'])
 # Retain explicit evidence even if a different sentence only lists other language activities.
 medium=list(dict.fromkeys(medium))
 if medium:
  text='／'.join(medium)+'授課'; mode='explicit-medium'
 elif any(re.search(r'中文(?:作為|為)(?:日常|主要)?教學語言|以中文為主要教學語言',p)for p in clean):text='中文授課；粵普未分';mode='chinese-unspecified'
 else:
  t=' '.join(clean)
  has_en=bool(re.search(r'英語|英文|English',t,re.I));has_pth='普通話'in t;has_can='粵語'in t
  if has_en or has_pth or has_can:
   text='、'.join(x for x,b in [('粵語',has_can),('英語',has_en),('普通話',has_pth)]if b)+'學習說明';mode='language-learning'
  elif '兩文三語'in t:text='兩文三語目標';mode='stated-aim'
  elif '雙語'in t or re.search('bilingual',t,re.I):text='雙語安排；語種待確認';mode='stated-aim'
  else:return None
 # Avoid padding long passages; preserve complete short sentences/clauses.
 selected=[]
 ranked=sorted(clean,key=lambda p:0 if re.search(r'教學語言|授課語言|以粵語|以普通話|medium of instruction|language of instruction',p,re.I)else 1)
 for p in ranked:
  if not re.search(r'粵語|廣東話|英語|英文|普通話|中文.*教學語言|兩文三語|雙語|English|Cantonese|Putonghua|bilingual',p,re.I):continue
  if len(p)>240:
   clauses=re.split(r'[；;]',p);p=next((c for c in clauses if re.search('粵語|英語|普通話|兩文三語',c)and len(c)<=240),'')
  if p and p not in selected:selected.append(p)
  if len(selected)==2:break
 if not selected:return None
 detail='校方公開說明：'+'；'.join(selected)+'。'
 if not medium:detail+='上述資料未明確分出主要授課語言；語言主次及每天課時仍須按所報班別向校方確認。'
 else:detail+='此為來源明示的授課語言，不代表各語種平均分配課時。'
 return {'text':text,'detail':detail,'values':medium,'period':period,'sourceUrl':url,'mode':mode,'evidence':selected}

def fee_fact(k,registered_sessions):
 if k.get('feePeriod')!='2026/27' or not k.get('fees'):return None
 data=[];display=[];approved=[];warnings=[]
 reg=k.get('registration',{})
 for r in k['fees']:
  vals=[amounts(r[g])for g in ['K1','K2','K3']]
  if not any(vals):continue
  session=r['session'];no=reg.get('全日班'if session=='全日班'else'半日班','')
  unsupported='沒有開辦'in no
  same=all(r[g]==r['K1']for g in ['K1','K2','K3'])
  if same:line=f'{session}K1–K3：'+r['K1']+'（全年；括號內為期數）'
  else:line=f'{session}：'+'、'.join(g+' '+r[g]for g in ['K1','K2','K3']if amounts(r[g]))+'（全年；括號內為期數）'
  data.append(line);approved.extend(v for vs in vals for v in vs)
  if unsupported:warnings.append(f'註冊費欄另列「{no}」，上述{session}收費記錄不作正在開辦或可報名的證據。')
  elif session.removesuffix('班')in registered_sessions:display.extend(v for vs in vals for v in vs)
 if not data:
  pending=any('申請審核中'in r[g]for r in k['fees']for g in ['K1','K2','K3'])
  return {'text':'學費審核中'if pending else'概覽未列核准金額','detail':('2026/27概覽全年學費格列「申請審核中」，尚不能據此確定核准費率。'if pending else'2026/27概覽未列可確認的K1–K3全年學費金額；空白或「-」不代表免費。')+'報名前須索取校方當屆收費表及教育局核准文件。','period':'2026/27學年','sourceUrl':k['sourceUrl'],'annualAmounts':[],'basis':k['feeBasis'],'rows':k['fees'],'warnings':[],'status':'pending'if pending else'not-published'}
 if display:
  mn,mx=min(display),max(display)
  compact=f'${fmt(mn)}'+(f'–${fmt(mx)}'if mx!=mn else'')+'／年'
 else:
  mn,mx=min(approved),max(approved);compact='核准$'+fmt(mn)+(f'–${fmt(mx)}'if mx!=mn else'')+'／年'
  warnings.append('費表與可核實的登記班別未能完整對應；上述金額僅作核准費表記錄，開班安排仍須確認。')
 detail=k['feeBasis']+'：'+'；'.join(data)+'。'+' '.join(warnings)+' 書本、校服、膳食及交通等費用須另核對；不把PN的歷史費率併入K1–K3。'
 return {'text':compact,'detail':detail,'period':'2026/27學年'+('・扣資助後'if'扣減'in k['feeBasis']else''),'sourceUrl':k['sourceUrl'],'annualAmounts':sorted(set(display)),'basis':k['feeBasis'],'rows':k['fees'],'warnings':warnings,'status':'numeric'}

def build(a):
 schools=load(a.schools); registry=load(a.registry); kgp=load(a.kgp);sites=load(a.sites);overrides=load(a.overrides)
 sites_by={s['number']:s for s in sites};kgp_by={k['campus']:k for k in kgp if'error'not in k};records={};issues=[]
 for s in schools:
  n=s['schoolNumber'][:6];cs=registry['schools'].get(n,{})
  known_closed=n in ['231398','322300','527211','541613','215929']
  campus=[]
  for cid,r in cs.items():
   eid=n+cid;k=kgp_by.get(eid);values=sorted(set(r['locationSessions'])&set(r['registrationSessions']))if r['locationSessions']and r['registrationSessions']else r['registrationSessions']or r['locationSessions']
   ordered=[x for x in ['上午','下午','全日','長全日']if x in values]
   detail=f'校址{cid}（{r["address"]}）：'
   conflict=bool(r['locationSessions']and r['registrationSessions']and r['locationSessions']!=r['registrationSessions'])
   if conflict:detail+='位置資料列'+ '／'.join(r['locationSessions'])+'；每日註冊資料列'+'／'.join(r['registrationSessions'])+'。兩份資料的差異班別仍須校方確認。'
   else:detail+='教育局登記'+ '／'.join(ordered)+'。登記班制不等於當屆招生、現有學位或延長照顧服務。'
   sessions={'text':'／'.join(ordered)+('；另有差異'if conflict else''),'values':ordered,'detail':detail,'period':f'教育局登記・{DATE}讀取','sourceUrl':registry['registrationSource'],'conflict':conflict}
   c={'campus':eid,'address':r['address'],'sessions':sessions}
   if k:
    c['kgpHash']=k['sha256']
    for session,statement in k.get('registration',{}).items():
     if '沒有開辦'in statement:
      relevant=bool(set(ordered)&({'上午','下午'}if session=='半日班'else{'全日'}))
      if relevant:
       c['sessions']['detail']+=f' 2026/27概覽另列「{statement}」，與登記班制的適用範圍不同；實際當屆開班須校方確認。'
       c['sessions']['conflict']=True
    if k.get('name')and norm(k['name'])!=norm(r['name']):issues.append({'number':n,'campus':cid,'kind':'name-variation','registry':r['name'],'kgp':k['name']})
    texts=list(k.get('curriculumText',{}).values());passages=[p.strip()for t in texts for p in re.split(r'[。！？\n]',t)if re.search('粵語|廣東話|英語|英文|普通話|中文.*教學語言|兩文三語|雙語',p)]
    lang=language_fact(passages,k['sourceUrl'],'2026/27概覽・校方申報')
    if lang:c['language']=lang
    if k.get('pnProvision')in['有','沒有']:
     c['pn']={'text':'有記錄'if k['pnProvision']=='有'else'未提供','value':'yes'if k['pnProvision']=='有'else'no','detail':f'本校址概覽的幼兒服務欄在{k["pnPeriod"]}列提供2–3歲服務：{k["pnProvision"]}。這是該日期的服務記錄，不等同當屆招生或PN學位。','period':k['pnPeriod']+'統計','sourceUrl':k['sourceUrl']}
    fee=fee_fact(k,ordered)
    if fee:c['fee']=fee
    for w in fee.get('warnings',[])if fee else[]:issues.append({'number':n,'campus':cid,'kind':'fee-vs-operating-session','detail':w})
   if eid in overrides.get(n,{}).get('campusFees',{}):
    c['fee']=dict(overrides[n]['campusFees'][eid])
    notes=[v for v in (k or {}).get('registration',{}).values()if'沒有開辦'in v]
    if notes:c['fee']['detail']+=' 概覽註冊費欄另列「'+'／'.join(notes)+'」；核准費表不等同正在開班或尚有學位。'
   campus.append(c)
  rec={'campuses':campus,'sources':[]}
  if campus:
   facts=[c['sessions']for c in campus];same=all(f['values']==facts[0]['values']for f in facts)
   if same:rec['sessions']={**facts[0],'detail':'\n'.join(f['detail']for f in facts)}
   else:rec['sessions']={'text':'按校址列明','values':[],'detail':'\n'.join(f['detail']for f in facts),'period':f'教育局登記・{DATE}讀取','sourceUrl':registry['registrationSource']}
  for field in ['fee','language','pn']:
   fs=[c[field]for c in campus if field in c]
   if len(fs)==len(campus)and fs:
    same=all((f['text'],f.get('values'),f.get('annualAmounts'),f.get('value'))==(fs[0]['text'],fs[0].get('values'),fs[0].get('annualAmounts'),fs[0].get('value'))for f in fs)
    if len(fs)==1:rec[field]=fs[0]
    elif same:rec[field]={**fs[0],'detail':'\n'.join('校址'+c['campus'][6:]+'：'+c[field]['detail']for c in campus)}
    else:rec[field]={'text':'按校址列明','detail':'\n'.join('校址'+c['campus'][6:]+'：'+c[field]['detail']for c in campus),'period':fs[0]['period']+'・分校址','sourceUrl':fs[0]['sourceUrl'],**({'values':[]}if field=='language'else{'value':'unknown'}if field=='pn'else{})}
   elif fs:rec[field]={'text':'按校址核對','detail':'\n'.join('校址'+c['campus'][6:]+'：'+(c[field]['detail']if field in c else'尚未取得可核實資料。')for c in campus),'period':fs[0]['period']+'・部分校址','sourceUrl':fs[0]['sourceUrl'],**({'values':[]}if field=='language'else{'value':'unknown'}if field=='pn'else{})}
  site=sites_by.get(n)
  # A multi-campus organisation homepage cannot silently establish each campus's medium.
  if site and site.get('identityInPage')and len(campus)==1 and not known_closed:
   sf=language_fact(site.get('passages',[]),site.get('finalUrl',site['url']),'校方網頁・2026-10-26核對')
   if sf and sf.get('values') and rec.get('language',{}).get('values') and set(sf['values'])!=set(rec['language']['values']):
    issues.append({'number':n,'kind':'language-source-difference','site':sf,'overview':rec['language']})
    rec['language']={'text':'語言資料需分清適用範圍','values':[],'detail':'概覽：'+rec['language']['detail']+' 校方網頁：'+sf['detail'],'period':'概覽2026/27／校網2026-10-26','sourceUrl':sf['sourceUrl'],'mode':'source-difference'}
   elif sf and (not rec.get('language')or(sf['mode']in['explicit-medium','chinese-unspecified']and rec['language'].get('mode')not in['explicit-medium','chinese-unspecified'])):
    rec['language']=sf
  if not known_closed and 'language'not in rec:
   su=next((kgp_by[c['campus']]['sourceUrl']for c in campus if c['campus']in kgp_by),s.get('website')or registry['registrationSource'])
   rec['language']={'text':'主要語言待核實','values':[],'mode':'unresolved','detail':'暫未取得該校址主要授課語言及英語、普通話課時的明確說明；報名前可向校方索取所報班別的語言安排。','period':'2026-10-26核對','sourceUrl':su}
  for field,v in overrides.get(n,{}).items():
   if field!='campusFees':rec[field]=v
  if known_closed:
   rec['sessions']={'text':'已停辦；不列現行班制','values':[],'detail':s.get('sourceNote','')+' 教育局登記的歷史時段不等同重新招生。','period':'停辦狀態按校方公告','sourceUrl':next((x['url']for x in s['sources']if re.search('停辦|停办',x['scope'])),s.get('website',''))}
   rec.pop('fee',None);rec.pop('language',None);rec['closed']=True
  for field in ['sessions','language','fee','pn']:
   if field in rec:
    f=rec[field];rec['sources'].append({'label':{'sessions':'教育局登記班制','language':'校方語言說明','fee':('收費核對狀態／資料入口'if f.get('status')=='unresolved'else'核准收費資料'),'pn':'概覽幼兒服務記錄'}[field],'url':f['sourceUrl'],'scope':f['period']+'；按本校及校址理解，不代表招生學位。'})
  for c in campus:
   for field in ['fee','language']:
    if field in c:rec['sources'].append({'label':f'校址{c["campus"][6:]}資料','url':c[field]['sourceUrl'],'scope':c[field]['period']+'；只適用此校址及所列班別，不推算招生。'})
  rec['sources']=list({x['url']:x for x in rec['sources']}.values())
  records[n]=rec
 out={'checkedAt':DATE,'method':'班制逐校址交叉讀取EDB位置及每日註冊資料；學費保留K1–K3逐級全年/期數/資助基礎；語言只引用當屆概覽及匹配校方網頁的明文。空白不當零，活動不當主要授課語言。','schools':records}
 pathlib.Path(a.output).write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n')
 pathlib.Path(a.audit).write_text(json.dumps({'checkedAt':DATE,'issues':issues,'kgpErrors':[k for k in kgp if'error'in k],'siteOutcomes':[{k:v for k,v in s.items()if k in['number','url','error','identityInPage','sha256']}for s in sites]},ensure_ascii=False,indent=2)+'\n')
 print({'schools':len(records),'sessions':sum(bool(r.get('sessions',{}).get('values'))for r in records.values()),'fees':sum('fee'in r for r in records.values()),'languageStatements':sum('language'in r for r in records.values()),'explicitMedium':sum(bool(r.get('language',{}).get('values'))for r in records.values()),'issues':len(issues)})
if __name__=='__main__':
 p=argparse.ArgumentParser()
 for x in ['schools','registry','kgp','sites','overrides','output','audit']:p.add_argument('--'+x,required=True)
 build(p.parse_args())
