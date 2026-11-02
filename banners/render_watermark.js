// Renders watermark.html to transparent PNGs: node render_watermark.js
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const shoot = async (sel, file, scale) => {
    const page = await browser.newPage({ viewport: { width: 1300, height: 1300 }, deviceScaleFactor: scale });
    await page.goto('file://' + path.join(__dirname, 'watermark.html'), { waitUntil: 'networkidle' });
    await page.evaluate(() => window.__ready);
    await page.locator(sel).screenshot({ path: path.join(__dirname, file), omitBackground: true });
    await page.close();
    console.log('wrote', file);
  };
  await shoot('#badge', 'watermark_youtube_600x600.png', 1);
  await shoot('#badge', 'watermark_youtube_150x150.png', 0.25);
  await shoot('#text', 'watermark_text_1200x420.png', 1);
  await browser.close();
})();
