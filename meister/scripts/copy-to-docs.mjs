// 빌드 결과(dist/)를 저장소 루트의 docs/ 로 복사합니다.
// GitHub Pages 를 "Deploy from a branch → /docs" 로 설정했을 때 이 폴더가 그대로 공개됩니다.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const docs = path.resolve(root, '..', 'docs');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('dist/index.html 이 없습니다. 먼저 npm run build 를 실행하세요.');
  process.exit(1);
}

fs.rmSync(docs, { recursive: true, force: true });
fs.cpSync(dist, docs, { recursive: true });
// Jekyll 처리를 끄기 위한 파일 (프리렌더 단계에서도 만들지만 한 번 더 보장)
fs.writeFileSync(path.join(docs, '.nojekyll'), '');
console.log(`copied dist → ${path.relative(path.resolve(root, '..'), docs)}/`);
