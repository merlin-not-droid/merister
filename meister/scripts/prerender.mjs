// 빌드 후 각 경로를 정적 HTML 로 미리 렌더링합니다.
// GitHub Pages 에서도 /about/ 같은 주소가 200 으로 응답하고, 검색엔진이 본문을 읽을 수 있습니다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = (process.env.BASE_PATH ?? '/merister/').replace(/\/?$/, '/');
const basename = base.replace(/\/$/, '');
const siteUrl = (process.env.SITE_URL ?? 'https://merlin-not-droid.github.io/merister').replace(/\/$/, '');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(url, { noindex = false } = {}) {
  const { html, meta } = render(url, basename);
  const canonical = `${siteUrl}${url === '/' ? '/' : `${url}/`}`;
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : '',
    url === '/'
      ? `<script type="application/ld+json">${JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Meister',
          url: `${siteUrl}/`,
          logo: `${siteUrl}/favicon.svg`,
          description: meta.description,
        })}</script>`
      : '',
  ].join('\n    ');
  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${esc(meta.description)}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${esc(meta.title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${esc(meta.description)}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/, `<meta property="og:image" content="${siteUrl}/og.png" />`)
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-path="${url}">${html}</div>`);
}

for (const url of routes) {
  const out = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(url));
  console.log('prerendered', url);
}

fs.writeFileSync(path.join(dist, '404.html'), page('/404', { noindex: true }));
console.log('prerendered 404');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((u) => `  <url><loc>${siteUrl}${u === '/' ? '/' : `${u}/`}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('sitemap.xml, robots.txt written');
