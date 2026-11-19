import fs from 'node:fs';
import sharp from 'sharp';
import * as OpenCC from 'opencc-js';
const tc=OpenCC.Converter({from:'cn',to:'hk'}),sc=OpenCC.Converter({from:'hk',to:'cn'});
const rows=JSON.parse(fs.readFileSync('docs/research/primary-phase1-20261119/batch-cards.json','utf8'));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
fs.mkdirSync('public/covers/reports',{recursive:true});
for(const [slug,row] of Object.entries(rows)){
 for(const locale of ['tc','sc']){
  const conv=locale==='tc'?tc:sc,title=conv(row.n), lines=Array.from(title).reduce((a,c,i)=>{if(i%14===0)a.push('');a[a.length-1]+=c;return a},[]);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f4ea"/><rect width="18" height="630" fill="#204f49"/><g font-family="PingFang ${locale==='tc'?'TC':'SC'},sans-serif" fill="#204f49"><text x="76" y="95" font-size="28">${conv('港学荟 · 小学深度报告')}</text>${lines.map((s,i)=>`<text x="76" y="${235+i*78}" font-size="58" font-weight="700">${esc(s)}</text>`).join('')}<text x="76" y="405" font-size="30">${conv('课程与语言 · 报名与插班 · 学费与升中')}</text><path d="M76 460H1124" stroke="#204f49"/><text x="76" y="515" font-size="24">${conv('适用学年与官方来源见正文')}</text><text x="76" y="570" font-size="23">hkschool.guide</text></g></svg>`;
  fs.writeFileSync(`public/covers/reports/${slug}-${locale}.svg`,svg);await sharp(Buffer.from(svg)).png().toFile(`public/covers/reports/${slug}-${locale}.png`);
 }
 const title=tc(row.n),lines=Array.from(title).reduce((a,c,i)=>{if(i%8===0)a.push('');a[a.length-1]+=c;return a},[]);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="700"><rect width="600" height="700" fill="#f7f4ea"/><rect width="14" height="700" fill="#204f49"/><g font-family="PingFang TC,sans-serif" fill="#204f49"><text x="48" y="83" font-size="23">港學薈 · 小學深度報告</text>${lines.map((s,i)=>`<text x="48" y="${225+i*65}" font-size="48" font-weight="700">${esc(s)}</text>`).join('')}<path d="M48 440H552" stroke="#204f49"/><text x="48" y="500" font-size="27">課程與語言 · 報名與插班</text><text x="48" y="548" font-size="27">學費與升中 · 家庭選擇</text><text x="48" y="627" font-size="21">適用學年與官方來源見正文</text></g></svg>`;
 fs.writeFileSync(`public/covers/${slug}.svg`,svg);await sharp(Buffer.from(svg)).png().toFile(`public/covers/${slug}.png`);
}console.log('10 covers and 20 localized share images generated');
