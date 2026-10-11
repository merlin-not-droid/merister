import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { metaFor } from './meta';

/** 클라이언트 라우팅 시 title / description 을 갱신합니다. (첫 로딩은 프리렌더된 HTML 이 담당) */
export function useDocumentMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = metaFor(pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.description);
  }, [pathname]);
}
