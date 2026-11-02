// Renders banner.html to exact-size PNGs: node render.js
const { chromium } = require('playwright');
const path = require('path');
const sizes = { youtube: [2560, 1440], chzzk: [1920, 480] };
(async () => {
  const browser = await chromium.launch();
  for (const [key, [w, h]] of Object.entries(sizes)) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto('file://' + path.join(__dirname, 'banner.html') + '?size=' + key, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.__ready);
    await page.waitForTimeout(300);
    await page.locator('#stage').screenshot({ path: path.join(__dirname, `${key}_banner_${w}x${h}.png`) });
    console.log('wrote', key);
  }
  await browser.close();
})();
