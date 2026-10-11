import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { insights } from './content/insights';
import { projects } from './content/work';
import { metaFor } from './lib/meta';

export const routes = [
  '/',
  '/about',
  '/services',
  '/work',
  ...projects.map((p) => `/work/${p.slug}`),
  '/insights',
  ...insights.map((i) => `/insights/${i.slug}`),
  '/contact',
  '/privacy',
];

export function render(url: string, basename: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={basename + url} basename={basename}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return { html, meta: metaFor(url) };
}
