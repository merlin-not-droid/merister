import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index';

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');
const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// 프리렌더된 HTML 이 현재 주소와 같은 페이지일 때만 hydrate 합니다.
// (로컬 preview 서버의 SPA fallback 처럼 다른 페이지 HTML 이 내려온 경우 새로 렌더링)
const current = location.pathname.slice(basename.length).replace(/\/+$/, '') || '/';
const rendered = root.dataset.path;
if (root.hasChildNodes() && (rendered === current || rendered === '/404')) hydrateRoot(root, app);
else {
  root.innerHTML = '';
  createRoot(root).render(app);
}
