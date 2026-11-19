import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
const require = createRequire(path.join(process.argv[2], 'package.json'));
const puppeteer = require('puppeteer-core');
const out = path.resolve(process.argv[3]);
await fs.mkdir(out,{recursive:true});
const browser = await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,protocolTimeout:20000,userDataDir:await fs.mkdtemp(path.join(os.tmpdir(),'hk-mobile-qa-')),args:['--disable-background-networking','--disable-component-update','--no-first-run','--disable-sync','--disable-extensions']});
const results=[];
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(String(e)));
await page.setRequestInterception(true);
page.on('request',req=>{const u=new URL(req.url());if(['http:','https:'].includes(u.protocol)&&u.hostname!=='127.0.0.1')void req.abort();else void req.continue();});
const assert=(ok,label)=>{if(!ok)throw Error(label);};
async function fill(target, selector, value) {
  await target.bringToFront();
  await target.$eval(selector,(input,next)=>{
    input.scrollIntoView({block:'center'}); input.focus();
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,next);
    input.dispatchEvent(new Event('input',{bubbles:true}));
  },value);
}

try {
 for (const locale of ['sc','tc']) {
  const prefix=locale==='sc'?'/cn':'';
  await page.setViewport({width:390,height:844,isMobile:true,deviceScaleFactor:1});
  await page.goto(`http://127.0.0.1:3452${prefix}/blog`,{waitUntil:'networkidle0',timeout:30000});
  const initial=await page.evaluate(()=>({text:document.body.innerText,h1:document.querySelector('h1')?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,links:[...document.querySelectorAll('h4')].map(h=>({text:h.textContent,href:h.closest('a')?.getAttribute('href')}))}));
  assert(!initial.overflow,`${locale} blog overflow`);
  await page.screenshot({path:path.join(out,`blog-${locale}-mobile.png`)});
  const baseline = await browser.newPage();
  await baseline.setViewport({width:390,height:844,isMobile:true,deviceScaleFactor:1});
  await baseline.setRequestInterception(true);baseline.on('request',req=>{const u=new URL(req.url());if(['http:','https:'].includes(u.protocol)&&u.hostname!=='127.0.0.1')void req.abort();else void req.continue();});
  // Compare the actual filtered links and JSON-LD with the original implementation.
  await baseline.goto(`http://127.0.0.1:3451${prefix}/blog`,{waitUntil:'networkidle0',timeout:30000});
  for (const query of ['學費','学费','K1 面试','九龍城','學费','st cat','梁銶琚','不存在的学校xyz']) {
    for(const target of [baseline,page]) {
      await fill(target,'#blog-search',query);
      await target.waitForFunction(q=>document.querySelector('#blog-search')?.value===q,{},query);
    }
    await page.waitForNetworkIdle({idleTime:100,timeout:10000});
    const get=target=>target.evaluate(()=>({text:document.querySelector('[aria-live="polite"]')?.textContent,links:[...document.querySelectorAll('h4')].map(h=>h.closest('a')?.getAttribute('href')),schema:[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent))}));
    const [a,b]=await Promise.all([get(baseline),get(page)]);
    assert(JSON.stringify(a)===JSON.stringify(b),`${locale} query mismatch: ${query}`);
    results.push({locale,test:'search parity',query,result:'PASS'}); console.log(locale,query,'PASS');
  }
  await baseline.close();
  await fill(page,'#blog-search','');
  await page.waitForNetworkIdle({idleTime:100,timeout:10000});
  for (const width of [375,768,1440]) {
    await page.setViewport({width,height:900,deviceScaleFactor:1});
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`${locale} overflow ${width}`);
    results.push({locale,test:'blog viewport',width,result:'PASS'});
  }
  await page.setViewport({width:390,height:844,isMobile:true,deviceScaleFactor:1});
  await page.reload({waitUntil:'networkidle0',timeout:30000});
  await page.locator('button[aria-controls="site-nav-menu"]').click();
  await page.waitForSelector('#site-nav-menu');
  const menuText=await page.$eval('#site-nav-menu',el=>el.textContent);
  assert(menuText.includes('239'),`${locale} report count missing`);
  await page.keyboard.press('Escape');
  await page.waitForSelector('#site-nav-menu',{hidden:true});
  results.push({locale,test:'navigation opens, count, Escape closes',result:'PASS'});
  await page.goto(`http://127.0.0.1:3452${prefix}/schools/kindergarten/directory`,{waitUntil:'networkidle0',timeout:30000});
  assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),`${locale} directory overflow`);
  await page.screenshot({path:path.join(out,`directory-${locale}-mobile.png`)});
  results.push({locale,test:'directory initial mobile render',result:'PASS'});
  const buttons=await page.$$eval('button',els=>els.filter(el=>el.getClientRects().length).map(el=>({text:el.textContent,aria:el.getAttribute('aria-label')})));
  const filterButton=buttons.find(b=>/篩選|筛选/.test(b.text));
  assert(filterButton,`${locale} filter button missing`);
  const filterHandle = await page.evaluateHandle(() => [...document.querySelectorAll('button')].find(el => el.getClientRects().length && /^(篩選|筛选)/.test(el.textContent)));
  await filterHandle.asElement().click();
  await page.waitForSelector('#kg-filter-heading');
  assert(await page.$eval('dialog[open]',el=>el.textContent.includes('PN')),`${locale} mobile filters missing`);
  await page.keyboard.press('Escape');
  await page.waitForSelector('dialog[open]',{hidden:true});
  await fill(page,'input[type="search"]','國際英文');
  await page.waitForFunction(()=>{const n=Number(document.querySelector('[class*="resultCount"]')?.textContent);return n>0&&n<50;},{timeout:20000});
  const names = await page.$$eval('a[class*="schoolName"]',els=>els.map(el=>el.textContent));
  assert(names.some(name=>/国际英文|國際英文/.test(name)),`${locale} directory global search`);
  results.push({locale,test:'directory mobile filter and full-dataset Traditional search',result:'PASS'});
  await fill(page,'input[type="search"]','');
  await page.waitForFunction(()=>Number(document.querySelector('[class*="resultCount"]')?.textContent)>50,{timeout:20000});
  const visibleChoices = await page.$$('input[type="checkbox"]');
  let selected=0;
  for(const checkbox of visibleChoices) {
    const canSelect=await checkbox.evaluate(el=>el.getClientRects().length && /^選擇|^选择/.test(el.getAttribute('aria-label')||''));
    if(canSelect){await checkbox.click();if(++selected===2)break;}
  }
  assert(selected===2,`${locale} comparison selection`);
  const compareHandle=await page.evaluateHandle(()=>[...document.querySelectorAll('button')].find(el=>el.getClientRects().length&&/比較學校|比较学校/.test(el.textContent)));
  await compareHandle.asElement().click();
  await page.waitForSelector('#kg-compare-heading');
  assert(await page.$$eval('dialog[open] thead th',els=>els.length)===3,`${locale} two-school comparison`);
  await page.keyboard.press('Escape');
  await page.waitForSelector('dialog[open]',{hidden:true});
  results.push({locale,test:'select two schools and compare',result:'PASS'});
 }
 await fs.writeFile(path.join(out,'browser-qa.json'),JSON.stringify({results,appErrors:errors,limits:['Local isolated browser; third-party requests blocked to avoid sending test analytics.','Responsive render and interaction checks do not establish field Core Web Vitals.']},null,2));
 assert(errors.length===0,'Browser application errors');
 console.log(JSON.stringify({checks:results.length,appErrors:errors},null,2));
} catch(error) { await page.screenshot({path:path.join(out,'qa-failure.png')}); await fs.writeFile(path.join(out,'qa-failure.json'),JSON.stringify({error:String(error),errors,url:page.url(),results},null,2)); throw error; } finally {await browser.close();}
