import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from /<repo>/. Override with BASE_PATH=/ for a custom domain.
const base = process.env.BASE_PATH ?? '/merister/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // 자주 바뀌지 않는 라이브러리를 분리해 재방문 시 캐시를 활용합니다.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) return 'react';
          if (/[\\/](gsap|lenis)[\\/]/.test(id)) return 'motion';
          if (id.includes('lucide-react')) return 'icons';
        },
      },
    },
  },
});
