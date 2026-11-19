// Local, isolated Chrome only. Never attaches to the user's browser/profile.
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { gzipSync } from 'node:zlib';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require=createRequire(path.join(process.argv[2],'package.json'));
const puppeteer=require('puppeteer-core');
const {default:lighthouse}=await import(pathToFileURL('/tmp/hk-mobile-audit-tools/node_modules/lighthouse/core/index.js'));
const out=path.resolve(process.argv[3]);await fs.mkdir(out,{recursive:true});
const rows=[];
const paths=['/cn/blog','/cn/schools/kindergarten/directory','/schools/kindergarten/directory'];
for(let run=1;run<=3;run++)for(const target of paths)for(const version of (run%2?['before','after']:['after','before'])){
 const profile=await fs.mkdtemp(path.join(os.tmpdir(),'hk-mobile-lh-'));
 const browser=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,userDataDir:profile,args:['--disable-background-networking','--disable-component-update','--no-first-run','--disable-sync','--disable-extensions']});
 try{
  const port=Number(new URL(browser.wsEndpoint()).port);
  const result=await lighthouse(`http://127.0.0.1:${version==='before'?3451:3452}${target}`,{port,onlyCategories:['performance'],output:'json',logLevel:'error',formFactor:'mobile',blockedUrlPatterns:['https://*'],maxWaitForLoad:30000});
  const lhr=result.lhr; if(lhr.runtimeError)throw Error(JSON.stringify(lhr.runtimeError));
  const number=id=>lhr.audits[id]?.numericValue;
  const row={run,version,path:target,lighthouse:lhr.lighthouseVersion,performance:Math.round(lhr.categories.performance.score*100),fcpMs:number('first-contentful-paint'),lcpMs:number('largest-contentful-paint'),tbtMs:number('total-blocking-time'),cls:number('cumulative-layout-shift'),speedIndexMs:number('speed-index'),mainThreadMs:number('mainthread-work-breakdown'),jsExecutionMs:number('bootup-time'),warnings:lhr.runWarnings};
  rows.push(row);
  await fs.writeFile(path.join(out,`${version}-${target.replaceAll('/','_')}-${run}.json.gz`),gzipSync(result.report));
  await fs.writeFile(path.join(out,'mobile-lab-results.json'),JSON.stringify({measuredOn:'2026-11-19',environment:'Same Mac, Chrome and Lighthouse 13.6.0; simulated mobile slow 4G and 4x CPU slowdown; cold profile per run; run order alternates',scope:'Local first-party comparison. All HTTPS third-party requests blocked equally to avoid test analytics and advertising variability.',rows,limits:['Not comparable to the previous production PSI run with third-party scripts enabled.','Not field data, INP, or a Core Web Vitals pass.','Local origin omits real network distance/CDN effects.']},null,2));
  console.log(JSON.stringify(row));
 }finally{await browser.close();await fs.rm(profile,{recursive:true,force:true});}
}
