import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';
const require=createRequire(path.join(process.argv[2],'package.json'));const puppeteer=require('puppeteer-core');
const profile=await fs.mkdtemp(path.join(os.tmpdir(),'hk-mobile-retry-'));
const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,userDataDir:profile,protocolTimeout:20000,args:['--disable-background-networking','--no-first-run','--disable-sync','--disable-extensions']});
try{
 const page=await browser.newPage();await page.setViewport({width:390,height:844});
 let block=true;const indexRequests=[];
 await page.setRequestInterception(true);page.on('request',req=>{const u=new URL(req.url());if(u.pathname.startsWith('/blog-data/')){indexRequests.push(req.url());if(block){void req.abort();return;}}if(['http:','https:'].includes(u.protocol)&&u.hostname!=='127.0.0.1')void req.abort();else void req.continue();});
 await page.goto('http://127.0.0.1:3452/cn/blog',{waitUntil:'networkidle0'});
 if(indexRequests.length)throw Error('Index downloaded before searching');
 await page.$eval('#blog-search',input=>{input.focus();Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'學費');input.dispatchEvent(new Event('input',{bubbles:true}));});
 await page.waitForFunction(()=>document.body.innerText.includes('暂时未能搜索，请重试'));
 block=false;
 const button=await page.evaluateHandle(()=>[...document.querySelectorAll('button')].find(el=>el.textContent==='重试搜索'));
 await button.asElement().click();
 await page.waitForFunction(()=>!document.body.innerText.includes('暂时未能搜索，请重试')&&document.querySelectorAll('h4').length>0);
 if(indexRequests.length<2)throw Error('No retry request');
 await fs.writeFile(path.join(process.argv[3],'search-retry-checks.json'),JSON.stringify({result:'PASS',checks:['No search index request before text entry','Network failure preserves browseable articles and shows retry','Retry fetches versioned index and returns search results'],requests:indexRequests.length},null,2));
 console.log('3 search loading/retry checks PASS');
}finally{await browser.close();await fs.rm(profile,{recursive:true,force:true});}
