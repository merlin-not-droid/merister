# DESIGN.md — Meister

> 경기장 조명 아래의 선명함과, 비즈니스 파트너의 절제. 장식이 아니라 타이포그래피·여백·리듬으로 역동성을 만든다.

실제 값은 `src/styles/tokens.css`가 기준입니다. 이 문서는 규칙과 의도를 설명합니다.

## 1. Visual Theme & Atmosphere

- **Style**: Dark Editorial × Stadium Signage
- **Keywords**: 조명, 대비, 전광판, 전술판, 에디토리얼, 정직함, 현장감
- **Tone**: 전문적·역동적 — NOT 화려함, 과장, 게임 같은 네온
- **Feel**: 야간 경기 직전, 조명이 켜지고 전광판에 오늘의 매치가 뜨는 순간
- **Interaction Tier**: L3 (WebGL 1개, 핀 스크롤 2개, 나머지는 CSS/IO 기반 L2)
- **Dependencies**: React 19 + TypeScript, GSAP(ScrollTrigger), Lenis, lucide-react

## 2. Color Palette & Roles

세 가지 방향(`data-direction="a|b|c"`)이 같은 이름의 원색 토큰을 정의하고, 섹션은 두 표면 중 하나를 선택합니다.

| 원색 토큰 | A Floodlight | B Matchday Paper | C Club Navy |
|---|---|---|---|
| `--ink` | #0B0D0B | #0F2A20 | #0A1430 |
| `--paper` | #F1F1EB | #F3EFE6 | #F4F6FA |
| `--accent` | #C6FF33 | #FF5B1F | #E9C25B |
| `--accent-on-paper` | #3D5A00 | #B83D0B | #7F5C0B |

| 역할 토큰 | `.surface-ink` | `.surface-paper` |
|---|---|---|
| `--bg` / `--bg-2` / `--bg-3` | ink / ink-2 / ink-3 | paper / paper-2 / paper-3 |
| `--text` | paper | ink |
| `--text-2` / `--text-3` | paper 74% / 52% | ink 76% / 56% |
| `--line` / `--line-strong` | paper 14% / 32% | ink 14% / 34% |
| `--accent-text` | accent | accent-on-paper |

**Color Rules**
- 컴포넌트는 역할 토큰만 사용한다. 원색 hex를 컴포넌트 CSS에 쓰지 않는다.
- 강조색은 한 화면에 한 가지. 밝은 배경 위 강조 텍스트는 반드시 `--accent-on-paper`(명도 대비 4.5:1 이상).
- 버튼 채움은 `--accent`, 그 위 글자는 `--accent-contrast`.

## 3. Typography Rules

| Role | Font | Size | Weight | Line Height | Tracking |
|---|---|---|---|---|---|
| Display (EN) | `--font-display` (A Archivo 72% / B Instrument Serif / C Unbounded) | `--fs-display` × `--display-scale` | 방향별 | 0.92 | 방향별 |
| H1 (KR) | Pretendard | `--fs-h1` | 800 | 1.12 | -0.035em |
| H2 (KR) | Pretendard | `--fs-h2` | 800 | 1.16 | -0.03em |
| H3 | Pretendard | `--fs-h3` | 700 | 1.4 | -0.02em |
| Body | Pretendard | 16px (본문 글 17px) | 400 | 1.75 | -0.005em |
| Label | JetBrains Mono | 12px | 500 | 1.4 | 0.14em, 대문자 |

- 폰트는 모두 npm 패키지로 자체 호스팅(Pretendard 동적 서브셋, @fontsource).
- 한글은 `word-break: keep-all`, 본문 행간 1.75 이상.
- 영문 디스플레이는 짧은 슬로건·섹션 라벨에만. 정보 전달 문장은 한국어 Pretendard.
- 방향마다 서체 폭이 달라 `--display-scale`(대형) / `--display-scale-sm`(소형)으로 크기를 보정.
- **Text decoration**: 그라디언트 텍스트·글로우 없음. 강조는 `<em>`(accent 색 + B 방향은 이탤릭)과 외곽선 텍스트(번호, 푸터 워드마크)만 사용.

## 4. Component Stylings

`src/styles/components.css`, `layout.css`에 정의.

- **Button** `.btn--primary / --ghost`: 높이 54px, hover 시 아래에서 채움이 올라오고 화살표가 대각선으로 교체, active scale .97, disabled 투명도 .55, focus-visible 2px 아웃라인.
- **Card** `.pcard`: 1px 라인, hover 시 라인 강조 + 3D 기울기(최대 5°) + 포인터 조명 + 화살표 회전.
- **Navigation**: 투명 → 스크롤 시 ink 82% + blur(12px). 아래로 스크롤하면 숨고 위로 스크롤하면 나타남. 링크 hover 시 EN → KO 라벨 교체.
- **Tags**: 제안 프로젝트(accent 채움), 창업자 경험(text 채움), 회사 프로젝트(라인).
- **Pending** `[자료 필요]`: 점선 테두리 칩. 실제 자료가 들어오면 값만 교체.
- **Form field**: 56px 높이, focus 시 accent 링 3px, 오류 시 테두리·메시지 `--error-text`.

## 5. Layout Principles

- Container 1360px, 좌우 여백 `--gutter`(16–40px), 본문 글 860px.
- Section 상하 여백 `--section-y`(80–160px).
- Ink / Paper 섹션 교차로 리듬을 만든다. 하위 페이지 상단은 항상 Ink.
- 그리드: 서비스 상세 1:1, 제안 프로젝트 6열 벤토(4·2 / 3·3), 인사이트 2열(첫 글 2행).

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | 1px 라인 | 기본 카드, 리스트 |
| Lifted | translateY(-4px) + 라인 강조 | 카드 hover |
| Floating | `0 24px 60px rgba(0,0,0,.35)` + blur(10px) | 예시 화면 속 UI 카드, 검토용 패널 |

## 7. Animation & Interaction

**Philosophy**: 읽기를 방해하지 않는다. opacity·transform만, 대부분 한 번 재생 후 멈춘다.

| 종류 | 위치 | 구현 |
|---|---|---|
| Background | Home Hero 경기장 조명 | WebGL 프래그먼트 셰이더(의존성 없음), 화면 밖·탭 숨김 시 정지, 모바일 해상도 0.75배 |
| Hero H1 | 슬로건·국문 헤드라인 | 단어 마스크 리빌(CSS transition, SSR 동일 마크업) |
| Section H2 | 모든 섹션 제목 | 화면 진입 시 단어 리빌 |
| Body | Our Position / About 문단 | 스크롤에 따라 단어가 밝아짐(GSAP scrub) |
| Element | CTA | 마그네틱 버튼, 포인터 조명 |
| Component | 서비스 | 핀 + 스크롤 전환(데스크톱 ≥1025px) |
| Scroll story | Playbook | 핀 + 전술판 패스 경로 드로잉 |
| Signature | 전광판 스플릿 플랩, 스크롤 = 경기 시간 스코어보드(90:00 FULL TIME) | |

- **Smooth scroll**: Lenis(lerp .12), ScrollTrigger와 동기화. 모션 최소화 시 비활성.
- **Reduced motion**: 모든 transition/animation 0.001ms, WebGL 정지 프레임, 플랩은 단어만 교체, 플레이북은 전체 경로를 한 번에 표시.

## 8. Do's and Don'ts

### Do
- 실적이 없는 영역은 ‘제안 프로젝트 · 미실행’, ‘기대 효과(실제 결과 아님)’처럼 상태를 명시한다.
- 서비스 설명은 ‘누구 → 문제 → 업무 → 산출물’ 순서를 지킨다.
- 모든 주요 화면에 문의 CTA를 둔다(헤더, 섹션, 페이지 하단).
- 사진에는 사용 권한 기록을 남긴다.
- 새 섹션은 Ink/Paper 교차 규칙을 따른다.

### Don't
- ❌ 존재하지 않는 고객사 로고, 수치, 수상, 후기를 넣지 않는다.
- ❌ 방송 중계 화면 캡처를 쓰지 않는다.
- ❌ 컴포넌트 CSS에 hex 색상을 직접 쓰지 않는다.
- ❌ 움직이는 요소에 `filter: blur()`를 쓰지 않는다.
- ❌ WebGL 장면을 페이지에 2개 이상 두지 않는다.
- ❌ 핀 스크롤 섹션을 한 페이지에 3개 이상 두지 않는다.
- ❌ 강조색을 본문 문단 전체에 쓰지 않는다.
- ❌ 영어 문장으로 핵심 정보를 전달하지 않는다(한국어가 기본).
- ❌ 이모지를 아이콘으로 쓰지 않는다(lucide-react / 인라인 SVG).

## 9. Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Desktop | ≥ 1025px | 서비스·플레이북 핀 스크롤, 헤더 전체 메뉴 |
| Tablet | 641–1024px | 핀 해제(세로 나열), 햄버거 메뉴 |
| Mobile | ≤ 640px | 헤더 CTA 숨김(메뉴 안에 Contact), 경기 시간만 표시, CTA 버튼 전체 폭 |

- 터치 영역 최소 44×44px.
- 600px 이하 가로 스크롤 없음(Playwright로 390px 확인).
