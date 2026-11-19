import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import puppeteer from 'puppeteer-core';
import * as OpenCC from 'opencc-js';
const origin=process.env.PRIMARY_QA_ORIGIN||'http://127.0.0.1:3456',out=path.resolve(process.env.PRIMARY_QA_OUTPUT||'docs/research/primary-phase1-20261119/qa');
const {scope:slugs}=JSON.parse(await fs.readFile('docs/research/primary-phase1-20261119/batch-status.json','utf8'));
await fs.mkdir(out,{recursive:true});const profile=await fs.mkdtemp(path.join(os.tmpdir(),'primary-phase1-browser-'));
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,userDataDir:profile,args:['--no-first-run','--disable-sync','--disable-extensions','--disable-background-networking']});
const checks=[],errors=[],failures=[];const assert=(v,s)=>{if(!v)throw Error(s)};
try{
 for(const slug of slugs)for(const locale of ['tc','sc'])for(const width of [390,1440]){
  const label=`${slug}-${locale}-${width}`,page=await browser.newPage();
  try{
   await page.setCacheEnabled(false);page.on('pageerror',e=>errors.push({label,error:String(e)}));await page.setRequestInterception(true);page.on('request',r=>{const u=new URL(r.url());if(['http:','https:'].includes(u.protocol)&&u.origin!==origin)void r.abort();else void r.continue()});
   await page.setViewport({width,height:width===390?844:1000,deviceScaleFactor:1,isMobile:width===390});
   const route=(locale==='sc'?'/cn':'')+'/reports/'+slug;const response=await page.goto(origin+route,{waitUntil:'networkidle2',timeout:45000});assert(response.status()===200,'HTTP');
   const data=await page.evaluate(()=>({h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),chapters:[...document.querySelectorAll('section.editorial-chapter')].map(x=>({id:x.id,title:x.querySelector('h2')?.textContent,text:x.innerText.length})),overflow:document.documentElement.scrollWidth>innerWidth,description:document.querySelector('meta[name="description"]')?.content,ogDescription:document.querySelector('meta[property="og:description"]')?.content,twitterDescription:document.querySelector('meta[name="twitter:description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,alternates:[...document.querySelectorAll('link[hreflang]')].map(x=>({lang:x.hreflang,url:x.href})),facts:[...document.querySelectorAll('.fact-ribbon')].map(x=>x.innerText),toc:[...document.querySelectorAll('a[href^="#chapter-"]')].map(x=>x.getAttribute('href')),tables:document.querySelectorAll('table').length,ogImage:document.querySelector('meta[property="og:image"]')?.content,sources:[...document.querySelectorAll('section[aria-labelledby="report-source-title"] a[target="_blank"]')].map(x=>x.href),text:document.body.innerText,jsonLd:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>x.textContent)}));
   assert(data.h1.length===1,'one H1');assert(data.chapters.length===8,'8 editorial chapters');assert(data.chapters.every(c=>c.text>100),'all chapter content');assert(!data.overflow,'no viewport overflow');assert(new Set(data.toc).size===8,'8 TOC destinations');assert(data.canonical==='https://hkschool.guide'+route,'canonical');assert(data.alternates.some(x=>x.lang==='zh-Hant-HK')&&data.alternates.some(x=>x.lang==='zh-Hans'),'bilingual alternates');assert(data.description===data.ogDescription&&data.description===data.twitterDescription,'description/OG/twitter same');assert(data.description?.length>40,'reviewed description');assert(data.ogImage?.endsWith(`/covers/reports/${slug}-${locale}.png`),'localized OG image');assert(data.jsonLd.some(t=>t.includes('2026-11-19')),'revision schema');assert(data.facts.length===1,'fact ribbon');const refs=JSON.parse(await fs.readFile('docs/research/primary-phase1-20261119/'+slug+'/source-list.json','utf8'));assert(data.sources.length===refs.length,'all official source references rendered');assert(!/35:1|全港第3|面试及收费图片未读|原有分析评分|哈佛大学附小/.test(data.text),'old unsupported claims removed');
   await page.screenshot({path:path.join(out,label+'-top.png')});
   for(const num of [2,4,8]){await page.$eval('#chapter-'+num,el=>el.scrollIntoView({block:'start'}));await page.screenshot({path:path.join(out,label+'-chapter-'+num+'.png')});}
   checks.push({...data,text:undefined,jsonLd:undefined,label,locale,width,slug,result:'PASS'});console.log('PASS',label);
  }catch(e){failures.push({label,error:String(e)});console.log('FAIL',label,String(e));await page.screenshot({path:path.join(out,label+'-FAIL.png')}).catch(()=>{});}finally{await page.close()}
 }
 await fs.writeFile(path.join(out,'browser-checks.json'),JSON.stringify({checks,errors,failures},null,2));assert(failures.length===0&&errors.length===0,JSON.stringify({failures,errors}));console.log('PASS all 40 bilingual/viewport report pages');
}finally{await browser.close();await fs.rm(profile,{recursive:true,force:true})}
