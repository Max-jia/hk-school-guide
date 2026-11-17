import fs from 'node:fs';
import sharp from 'sharp';
const out='public/covers/reports';fs.mkdirSync(out,{recursive:true});
const rows=[
 {slug:'pc',tc:'培正幼稚園',sc:'培正幼稚园',tcSub:'課程、學費與入學申請',scSub:'课程、学费与入学申请'},
 {slug:'canaan',tc:'迦南幼稚園',sc:'迦南幼稚园',tcSub:'各校舍、班次與申請安排分開核對',scSub:'各校舍、班次与申请安排分开核对'},
 {slug:'rc',tc:'高主教書院幼稚園部',sc:'高主教书院幼稚园部',tcSub:'幼小另行申請 · 面試與插班',scSub:'幼小另行申请 · 面试与插班'},
];
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
for(const row of rows)for(const locale of ['tc','sc']){
 const tc=locale==='tc';
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f4ea"/><rect x="0" width="20" height="630" fill="#204f49"/><g font-family="PingFang ${tc?'TC':'SC'},Noto Sans CJK ${tc?'TC':'SC'},sans-serif" fill="#204f49"><text x="76" y="105" font-size="30">${tc?'港學薈 · 學校擇校報告':'港学荟 · 学校择校报告'}</text><text x="76" y="265" font-size="60" font-weight="700">${esc(row[locale])}</text><text x="76" y="357" font-size="32">${esc(tc?row.tcSub:row.scSub)}</text><path d="M76 432H1124" stroke="#204f49" stroke-width="2"/><text x="76" y="500" font-size="26">${tc?'適用學年、日期與來源見正文':'适用学年、日期与来源见正文'}</text><text x="76" y="565" font-size="23">hkschool.guide</text><text x="1124" y="565" text-anchor="end" font-size="23">${tc?'編輯整理 · 非校方公告':'编辑整理 · 非校方公告'}</text></g></svg>`;
 fs.writeFileSync(`${out}/${row.slug}-${locale}.svg`,svg);
 await sharp(Buffer.from(svg)).png().toFile(`${out}/${row.slug}-${locale}.png`);
 console.log(`${row.slug}-${locale}: 1200x630`);
}
