# Meister — 공식 홈페이지

스포츠 마케팅 에이전시 Meister의 홈페이지입니다. React 19 + TypeScript(TSX) + Vite로 만들었고, 모든 페이지를 빌드 시점에 HTML로 미리 렌더링해 GitHub Pages에 배포합니다.

- 기획안: [`docs/PLANNING.md`](docs/PLANNING.md) — 핵심 메시지, 사이트맵, 섹션 구성, 디자인 방향, 준비 자료, 공개 범위
- 디자인 규칙: [`docs/DESIGN.md`](docs/DESIGN.md)

## 실행

```bash
cd meister
npm install
npm run dev        # 개발 서버 http://localhost:5173/merister/
npm run build      # 타입 검사 → 빌드 → 프리렌더(dist/)
npm run preview    # 빌드 결과 확인 http://localhost:4173/merister/
```

## 배포 (GitHub Pages)

1. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 바꿉니다. (이 설정 전에는 빌드만 검증되고 배포 단계가 실패합니다. 설정 후 Actions 탭에서 워크플로를 다시 실행하세요)
2. `main` 또는 `claude/meister-homepage-planning-mlx3gx` 브랜치에 `meister/` 변경을 push하면 `.github/workflows/meister-pages.yml`이 빌드·배포합니다. Actions 탭에서 수동 실행(`workflow_dispatch`)도 가능합니다.
3. `github-pages` 환경에 배포 브랜치 제한이 걸려 있으면 **Settings → Environments → github-pages**에서 해당 브랜치를 허용합니다.
4. 주소: `https://merlin-not-droid.github.io/merister/` (커스텀 도메인을 연결하면 경로가 자동으로 `/`로 바뀝니다)

## 설정 (저장소 Settings → Secrets and variables → Actions → Variables)

| 이름 | 설명 |
|---|---|
| `VITE_FORM_ENDPOINT` | 문의 폼을 받을 주소. Formspree·Web3Forms·Getform 등 JSON POST를 받는 엔드포인트. 비워두면 데모 모드(전송하지 않고 결과 화면과 메일 앱 열기만 안내) |
| `VITE_SHOW_DIRECTION_SWITCHER` | `false`로 설정하면 검토용 디자인 방향 전환 버튼을 숨깁니다 |

로컬에서는 `.env.example`을 `.env.local`로 복사해 사용합니다.

## 콘텐츠 수정

| 바꿀 내용 | 파일 |
|---|---|
| 이메일, SNS, 법인 정보 | `src/content/site.ts` (`null`이면 화면에 [자료 필요] 표시) |
| 서비스 설명·업무·산출물 | `src/content/services.ts` (`status: 'proposal'`이면 ‘제안’ 표시) |
| 프로젝트 | `src/content/work.ts` — 객체를 추가하면 목록·상세 페이지·sitemap 자동 생성 |
| 인사이트 글 | `src/content/insights.ts` — 위와 동일 |
| 방문자 유형 | `src/content/audiences.ts` |
| 일하는 4단계 | `src/content/playbook.ts` |
| 페이지 제목·설명(SEO) | `src/lib/meta.ts` |
| 색상·서체 | `src/styles/tokens.css` |

## 구조

```
meister/
├─ index.html               # 메타 태그, 첫 페인트 전 디자인 방향 적용 스크립트
├─ scripts/prerender.mjs    # 경로별 HTML, 404.html, sitemap.xml, robots.txt 생성
├─ src/
│  ├─ entry-client.tsx      # hydrate
│  ├─ entry-server.tsx      # 프리렌더 대상 경로 목록 + renderToString
│  ├─ App.tsx               # 라우팅
│  ├─ content/              # 모든 문구와 데이터
│  ├─ components/           # SplitText, SplitFlap, FloodlightCanvas(WebGL), MatchClock, Magnetic, Spotlight …
│  ├─ sections/             # 홈 섹션, 공통 CTA
│  ├─ pages/                # 페이지
│  ├─ lib/                  # 모션·스크롤·메타·디자인 방향·문의 전송
│  └─ styles/               # tokens / base / components / layout / home / pages
└─ docs/                    # 기획안, 디자인 규칙
```

## 크레딧

- 폰트: Pretendard (SIL OFL), Archivo · Instrument Serif · Unbounded · JetBrains Mono (SIL OFL, via Fontsource)
- 아이콘: lucide (ISC)
- 이미지: 현재 외부 사진을 쓰지 않습니다. 사진을 추가할 때는 `docs/PLANNING.md` 7-2의 권한 확인 기준을 따르세요.
