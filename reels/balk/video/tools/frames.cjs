// Render selected times to JPEGs: node frames.cjs timeline.json outdir t1 t2 ...  (or 'cover')
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const [,, tlPath, outDir, ...times] = process.argv;
  const tl = JSON.parse(fs.readFileSync(tlPath, 'utf8')); fs.mkdirSync(outDir, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  pg.on('pageerror', e => console.log('ERR', e.message)); pg.on('console', m => console.log('console:', m.text()));
  await pg.goto('file://' + path.resolve(__dirname, '../src/index.html'));
  await pg.evaluate(async (tl) => { for (const w of [700, 800, 900]) await document.fonts.load(`${w} 40px Pretendard`); setup(tl); }, tl);
  for (const t of times) {
    const data = await pg.evaluate((t) => { if (t === 'cover') renderCover(); else render(+t); return document.getElementById('c').toDataURL('image/jpeg', .9); }, t);
    fs.writeFileSync(path.join(outDir, `f_${t}.jpg`), Buffer.from(data.split(',')[1], 'base64'));
  }
  await b.close();
})();
