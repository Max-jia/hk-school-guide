import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import puppeteer from 'puppeteer-core';
const origin=process.env.THINK_QA_ORIGIN||'http://127.0.0.1:3454';
const out=path.resolve(process.env.THINK_QA_OUTPUT||'docs/research/think-refresh-20261119/qa');await fs.mkdir(out,{recursive:true});
const profile=await fs.mkdtemp(path.join(os.tmpdir(),'think-report-qa-'));
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,userDataDir:profile,protocolTimeout:30000,args:['--no-first-run','--disable-sync','--disable-extensions','--disable-background-networking']});
const checks=[];const assert=(v,s)=>{if(!v)throw Error(s)};
try{
 const errors=[];
 for(const locale of ['sc','tc']){
  const url=origin+(locale==='sc'?'/cn':'')+'/reports/think';
  for(const width of [390,1440]){
   const page=await browser.newPage();await page.setCacheEnabled(false);page.on('pageerror',e=>errors.push(String(e)));
   await page.setRequestInterception(true);page.on('request',r=>{const u=new URL(r.url());if(['http:','https:'].includes(u.protocol)&&u.origin!==new URL(origin).origin)void r.abort();else void r.continue()});
   console.log('Checking',locale,width);
   await page.setViewport({width,height:width===390?844:1000,deviceScaleFactor:1,isMobile:width===390});
   const res=await page.goto(url,{waitUntil:'networkidle2',timeout:35000});assert(res.status()===200,url+' status '+res.status());
   const data=await page.evaluate(()=>({h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),chapters:[...document.querySelectorAll('section.editorial-chapter')].map(x=>({id:x.id,title:x.querySelector('h2')?.textContent})),headings:[...document.querySelectorAll('h2')].map(x=>x.textContent),text:document.body.innerText,overflow:document.documentElement.scrollWidth>innerWidth,description:document.querySelector('meta[name="description"]')?.content,canonical:document.querySelector('link[rel="canonical"]')?.href,alternates:[...document.querySelectorAll('link[hreflang]')].map(x=>x.href),facts:[...document.querySelectorAll('.fact-ribbon')].map(x=>x.innerText),toc:[...document.querySelectorAll('a[href^="#chapter-"]')].map(a=>a.getAttribute('href')),tables:document.querySelectorAll('table').length,sources:[...document.querySelectorAll('a[href]')].filter(a=>/概览|概覽|证明书|證明書|校方|收费|收費/.test(a.textContent)).map(a=>a.href)}));
   assert(data.h1.length===1,'one h1');assert(data.chapters.length===8,'eight chapters '+JSON.stringify(data.headings));assert(!data.overflow,'no overflow '+locale+width);assert(data.tables>=10,'tables');assert(data.text.includes('86,400')&&data.text.includes('156,035'),'fees');assert(data.text.includes('2026年10月31日'),'past interview');assert(!/面试及收费图片未读|面試及收費圖片未讀|原有分析评分|原有分析評分/.test(data.text),'obsolete text removed');assert(data.description.includes('2027/28'),'description');assert(data.canonical.endsWith((locale==='sc'?'/cn':'')+'/reports/think'),'canonical');assert(data.toc.length>=8,'TOC');
   const base=`${locale}-${width}`;await page.screenshot({path:path.join(out,base+'-top.png')});
   for(const num of [3,8]){
    const selector='#chapter-'+num;await page.$eval(selector,el=>el.scrollIntoView({block:'start'}));await page.screenshot({path:path.join(out,base+'-chapter-'+num+'.png')});
   }
   checks.push({locale,width,...data,text:undefined,result:'PASS'});console.log('PASS',locale,width);await page.close();
  }
 }
 assert(errors.length===0,'browser runtime errors '+errors.join(';'));
 await fs.writeFile(path.join(out,'browser-checks.json'),JSON.stringify({checks,errors},null,2));console.log(JSON.stringify(checks.map(({locale,width,chapters,tables,result,facts})=>({locale,width,chapters:chapters.length,tables,result,facts})),null,2));
}finally{await browser.close();await fs.rm(profile,{recursive:true,force:true})}
