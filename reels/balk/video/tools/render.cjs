// Render every frame and pipe JPEGs into ffmpeg -> build/video.mp4 ; also writes build/sfx.json and build/cover.png
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs'); const { spawn } = require('child_process');
(async () => {
  const build = path.resolve(process.argv[2] || 'build');
  const tl = JSON.parse(fs.readFileSync(path.join(build, 'timeline.json'), 'utf8'));
  const fps = tl.fps, n = Math.round(tl.duration * fps);
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  pg.on('pageerror', e => { console.log('ERR', e.message); process.exit(1); });
  await pg.goto('file://' + path.resolve(__dirname, '../src/index.html'));
  const sfx = await pg.evaluate(async (tl) => { for (const w of [700, 800, 900]) await document.fonts.load(`${w} 40px Pretendard`); setup(tl); return getSfx(); }, tl);
  fs.writeFileSync(path.join(build, 'sfx.json'), JSON.stringify(sfx, null, 1));
  if (process.argv[3] === '--sfx-only') { await b.close(); console.log('sfx', sfx.length); return; }
  const cover = await pg.evaluate(() => { renderCover(); return document.getElementById('c').toDataURL('image/png'); });
  fs.writeFileSync(path.join(build, 'cover.png'), Buffer.from(cover.split(',')[1], 'base64'));
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(fps), path.join(build, 'video.mp4')], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const data = await pg.evaluate((t) => { render(t); return document.getElementById('c').toDataURL('image/jpeg', .95); }, i / fps);
    const buf = Buffer.from(data.split(',')[1], 'base64');
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`frame ${i}/${n} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close();
  console.log('done', n, 'frames');
})();
