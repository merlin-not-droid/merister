# SPO 펭귄즈 릴스 — "어차피 아웃인데 왜 뛰지?"

SPOMOgrp 인스타그램 릴스 영상을 만드는 프롬프트입니다. 주제는 **낫아웃(스트라이크 낫아웃)** 이고, **파울팁과 무엇이 다른지**도 함께 설명합니다.

| 항목 | 내용 |
|---|---|
| 훅 | 2스트라이크에서 헛스윙, 분명 삼진인데 타자와 주자가 왜 뛸까? |
| 제목 | 어차피 아웃인데 왜 뛰지? |
| 캐릭터 | SPO 펭귄즈 |
| 포맷 | 세로 9:16 · 1080×1920 · 30fps · 약 58초 |

## 0. 사용법

| 쓰는 도구 | 넣을 것 |
|---|---|
| 기획안 하나로 영상을 끝까지 만들어 주는 AI | **1. 마스터 프롬프트**를 그대로 붙여넣기 |
| 5~10초 컷을 하나씩 만드는 영상 생성 AI (Veo, Sora, Kling, Runway 등) | **2. 컷별 프롬프트**로 컷 12개 생성 → **3. 내레이션**을 TTS로 녹음 → 편집 앱(CapCut, Vrew 등)에서 자막·그래픽·BGM 합치기 |

- SPO 펭귄즈 공식 캐릭터 이미지가 있으면 레퍼런스 이미지로 함께 넣고, 유니폼 색을 그 디자인에 맞게 바꾸세요. 하늘색·네이비 유니폼은 임시로 정한 색입니다.
- 자막, 비교표, 화살표, 다이아몬드 그래픽은 영상 생성 AI가 그리게 하지 말고 편집 앱에서 텍스트·도형 레이어로 얹으세요. 영상 생성 AI가 만든 한글은 자주 깨집니다.
- 생성된 컷이 **5. 팩트체크**와 다르면 그 컷만 다시 만드세요. 예를 들어 낫아웃 장면에서 주심이 아웃 동작을 하면 다시 만들어야 합니다.

## 1. 마스터 프롬프트

```text
너는 스포츠 규칙을 쉽고 재밌게 풀어주는 인스타그램 릴스 PD야.
아래 기획대로 SPOMOgrp 계정에 올릴 릴스 영상을 만들어줘.

■ 기본 정보
- 계정: SPOMOgrp / 캐릭터: SPO 펭귄즈
- 주제: 낫아웃(스트라이크 낫아웃), 그리고 파울팁과의 차이
- 훅: "2스트라이크에서 헛스윙, 분명 삼진인데 타자와 주자가 왜 뛸까?"
- 제목: "어차피 아웃인데 왜 뛰지?"
- 포맷: 세로 9:16, 1080×1920, 30fps, 60초 이내(목표 약 58초)
- 시청자: 야구는 좋아하지만 규칙은 헷갈리는 입문자
- 톤: 빠르고 유쾌한 반말 해설. 규칙 설명은 100% 정확하게.

■ 캐릭터 — SPO 펭귄즈 (공식 캐릭터 이미지를 첨부하면 그 디자인을 우선)
- 공통: 통통한 아기 펭귄, 부드러운 점토 질감의 3D 카툰, 큰 눈, 노란 부리. 사람 선수는 나오지 않음.
- 타자·1루 주자 펭귄(SPO 펭귄즈): 하늘색 유니폼, 네이비 헬멧
- 투수·포수·1루수 펭귄(상대팀): 빨간 유니폼. 포수는 검은 마스크, 프로텍터, 갈색 미트
- 심판 펭귄(주심·1루심): 검은 셔츠, 회색 바지. 주심은 검은 마스크
- 해설 펭귄: 네이비 모자, 헤드셋 마이크, 작은 화이트보드. 화면 앞쪽에서 설명
- 배경: 맑은 낮 야구장, 초록 잔디, 갈색 흙 내야. 홈플레이트 주변 흙 원이 잘 보이게

■ 화면 고정 요소
- 상단 제목 바: "어차피 아웃인데 왜 뛰지?" (끝까지 고정)
- 제목 바 아래 작은 상황판: S1·S6은 "2아웃 · 1루 주자 · 2스트라이크", S5 코믹 장면은 "1아웃 · 1루 주자"

■ 씬 구성 (시간 / 화면 / 내레이션 / 핵심 자막)
※ 내레이션은 적힌 글자 그대로 읽기 (투아웃, 투스트라이크, 네 개)

S1 0:00–0:04 훅
화면: 투수 펭귄 투구 → 공이 홈플레이트 앞 흙에 원바운드 → 타자 펭귄 헛스윙 → 공이 포수 미트를 맞고 옆으로 굴러감 → 주심은 스트라이크 콜만 하고 아웃 동작은 없음 → 타자 펭귄이 배트를 놓고 1루로 전력 질주, 1루 주자 펭귄도 2루로 질주
내레이션: "투스트라이크 헛스윙! 분명 삼진인데… 타자도 주자도 왜 뛰지?"
자막: 분명 삼진인데 왜 뛰어?!

S2 0:04–0:08 정답
화면: 정지 화면 위로 해설 펭귄이 아래에서 '뿅' 튀어나와 날개를 좌우로 흔듦
내레이션: "어차피 아웃? 땡! 아직 아웃 아니야. 이게 바로 낫아웃!"
자막: 아직 아웃 아님! → 이게 바로 '낫아웃'

S3 0:08–0:16 삼진 ≠ 아웃
화면: 위아래 분할. 위: 포수가 공을 노바운드로 '퍽' 잡음 → 주심 아웃 콜. 아래: 공이 원바운드되거나 미트에서 빠짐 → 포수 당황, 주심은 공만 가리킴
내레이션: "삼진은 기록일 뿐! 아웃은 포수가 공을 땅에 닿기 전에 잡아야 완성. 놓치거나 원바운드면? 타자는 1루로 뛸 수 있어!"
자막: 노바운드로 잡으면 아웃 / 놓치거나 원바운드면 1루로! / (루킹 삼진도 똑같아요)

S4 0:16–0:24 그래서 뛴다
화면: 포수가 공을 주워 1루로 송구 vs 타자 질주 → 간발의 차로 세이프(1루심 세이프 동작). 짧은 인서트: 다른 타자 펭귄이 고개 숙이고 더그아웃 쪽으로 걸어가다 홈 주변 흙 원을 벗어나자 주심이 아웃 선언
내레이션: "수비는 타자를 태그하거나 1루에 먼저 던져야 아웃. 안 뛰고 홈 주변 흙 원을 벗어나면 그땐 진짜 아웃! 그러니 무조건 뛰어야지."
자막: 태그 or 1루 송구 = 아웃 / 안 뛰고 흙 원 밖으로 = 아웃

S5 0:24–0:32 조건
화면: 위에서 본 다이아몬드 그래픽, 조건마다 베이스에 불이 켜짐. 코믹 인서트: 1루에 주자가 있는데 포수 펭귄이 씩 웃으며 공을 일부러 떨어뜨림 → 주심이 날개를 흔들며 바로 타자 아웃 선언
내레이션: "단! 1루가 비었거나 투아웃일 때만! 1루에 주자 있고 투아웃 전이면 그냥 아웃! 일부러 떨어뜨려 병살 잡는 꼼수 방지!"
자막: ✔ 1루가 비었을 때 / ✔ 2아웃일 때 / ✖ 1루 주자 + 0·1아웃 → 그냥 아웃

S6 0:32–0:39 주자는 왜 뛸까
화면: S1 장면을 위에서 다시 보여주며 화살표 그래픽(타자 → 1루, 1루 주자 → 2루)
내레이션: "주자가 뛴 이유? 공이 살아 있는 인플레이라서! 게다가 타자가 1루로 오니까 1루 주자는 2루로 밀려나야 해."
자막: 볼 인플레이 = 주자도 진루 가능 / 타자가 1루로 오면 1루 주자는 2루로(포스)

S7 0:39–0:51 파울팁과의 차이
화면: ① 초슬로모션: 배트가 공을 '틱' 스침 → 공이 곧장 포수 미트로 들어가 잡힘 → 주심이 한 손으로 다른 손등을 스치는 파울팁 신호 후 삼진 콜 ② 같은 '틱'인데 포수가 놓쳐 공이 땅에 떨어짐 → 주심이 두 팔을 들어 파울 → 타자는 안도하며 다시 타석에 ③ 비교표
내레이션: "파울팁은 달라! 배트에 살짝 스친 공이 곧장 포수 미트에 잡히면 파울팁, 즉 스트라이크! 투스트라이크면 그대로 삼진 아웃. 못 잡으면? 그냥 파울, 타석 계속!"
비교표 자막:
  낫아웃 | 배트에 안 맞음 | 포수가 못 잡음 | 1루로 뛰어!
  파울팁 | 배트에 스침 | 포수가 잡음 | 스트라이크 (2S면 삼진 아웃)
  파울   | 배트에 스침 | 포수가 못 잡음 | 타석 계속
  → 배트에 맞은 공으로는 낫아웃이 없다!

S8 0:51–0:58 TMI + 결론
화면: 전광판 그래픽에 삼진 표시(K) 4개가 착착착착 켜짐 → 해설 펭귄이 카메라를 가리킴 → SPO 펭귄즈가 다 함께 1루로 신나게 달려감 → 엔딩 카드
내레이션: "TMI! 낫아웃으로 살아도 투수 기록은 삼진. 그래서 한 이닝 삼진 네 개도 가능! 결론, 공 빠지면? 일단 뛰어!"
자막: 한 이닝 4삼진도 가능?! / 결론: 공 빠지면 일단 뛰어!
엔딩 카드: SPO 펭귄즈 + "팔로우 @SPOMOgrp · 헷갈리는 규칙은 댓글로!"

■ 규칙 정확성 체크 (화면과 대사가 이것과 어긋나면 다시 만들 것)
1. 낫아웃 = 세 번째 스트라이크(헛스윙·루킹 모두)를 포수가 땅에 닿기 전에 잡지 못한 것. 원바운드로 잡은 것도 못 잡은 것으로 본다.
2. 타자가 1루로 뛸 수 있는 건 1루가 비어 있거나 2아웃일 때뿐. 1루에 주자가 있고 0·1아웃이면 타자는 바로 아웃.
3. 수비는 타자를 태그하거나, 공을 가진 수비수가 타자보다 먼저 1루를 밟으면 아웃.
4. 타자가 1루로 뛰지 않고 홈 주변 흙 원을 벗어나면 아웃.
5. 타자가 살아 나가도 투수 기록은 삼진.
6. 파울팁 = 배트에 스친 공이 곧장 포수에게 가서 땅에 닿기 전에 잡힌 것. 스트라이크이고 볼 인플레이. 2스트라이크면 삼진 아웃, 못 잡으면 그냥 파울. 배트에 맞은 공으로는 낫아웃이 생기지 않는다.
7. 타자가 뛸 수 있는 낫아웃 장면에서 주심은 아웃 동작을 하지 않는다.

■ 연출
- 첫 1초 안에 헛스윙 장면과 제목이 함께 보이게. 컷은 1~3초 단위로 빠르게.
- 자막: 굵은 고딕(예: Pretendard ExtraBold), 흰 글자 + 검은 외곽선, 핵심 단어만 하늘색 강조. 한 화면 최대 2줄.
- 화면 위·아래 약 15~20%와 오른쪽 가장자리(좋아요·댓글 버튼 자리)에는 핵심 자막을 두지 말 것.
- 다이아몬드, 화살표, 비교표, 전광판은 깔끔한 플랫 모션그래픽으로.
- 효과음: 헛스윙 '휙', 원바운드 '퉁', 포구 '퍽', 파울팁 '틱', 오답 '땡', 등장 '뿅'.
- BGM: 경쾌한 저작권 프리 음악, 내레이션보다 작게.
- 내레이션: 밝고 빠른 20대 목소리.

■ 금지
- 실제 구단·리그 로고와 유니폼, 실제 선수, 중계 화면, 응원가
- 영상 안에 AI로 그린 글자 (자막·표·그래픽 글자는 편집 텍스트 레이어로만)

■ 결과물
1. 완성 영상 (MP4, 9:16, 60초 이내)
2. 커버 이미지: 깜짝 놀란 얼굴로 1루로 질주하는 타자 펭귄 + 제목 "삼진인데 왜 뛰어?!"
3. 업로드용 캡션과 해시태그
```

## 2. 컷별 영상 생성 프롬프트 (영어)

컷마다 **공통 블록을 앞에 붙여서** 넣으세요. 컷 길이는 편집에서 자르면 됩니다.

**공통 블록**

```text
3D animated short with cute, chubby baby-penguin characters: soft clay-like texture, big glossy eyes, small yellow beaks, rounded shapes. Sunny daytime baseball stadium, green grass, brown dirt infield, a clearly visible circle of dirt around home plate. Bright, playful, smooth motion, vertical 9:16.
Characters: the SPO Penguins team (batter, runner) wear plain sky-blue jerseys and navy helmets. The opposing team (pitcher, catcher, first baseman) wear plain red jerseys; the catcher has a black mask, chest protector and a brown mitt. Umpire penguins wear black shirts and gray pants; the plate umpire wears a black mask. The host penguin wears a navy cap and a headset microphone. No humans.
No text, letters, numbers, logos or watermarks anywhere in the frame.
```

**네거티브 프롬프트** (지원하는 도구만)

```text
text, letters, subtitles, numbers, watermark, logo, real team uniforms, human players, extra limbs, two balls, broken bat, blurry, distorted faces
```

| 컷 | 씬 | 길이 | 내용 |
|---|---|---|---|
| C1 | S1 | 3초 | 원바운드 헛스윙, 포수가 놓침 |
| C2 | S1 | 2초 | 타자·1루 주자 질주 |
| C3 | S2 | 3초 | 해설 펭귄 등장 |
| C4 | S3 위 | 3초 | 노바운드 포구 = 아웃 |
| C5 | S3 아래 | 3초 | 원바운드·놓침 = 낫아웃 |
| C6 | S4 | 4초 | 1루 송구 vs 타자, 세이프 |
| C7 | S4 | 3초 | 안 뛰고 흙 원 밖으로 → 아웃 |
| C8 | S5 | 3초 | 포수의 고의 낙구 꼼수 → 그냥 아웃 |
| C9 | S6 | 4초 | 부감: 타자 → 1루, 주자 → 2루 |
| C10 | S7 | 4초 | 파울팁 포구 → 삼진 |
| C11 | S7 | 4초 | 스친 공을 놓침 → 파울 |
| C12 | S8 | 4초 | 엔딩: 다 함께 1루로 |

**C1 — 원바운드 헛스윙**
```text
Low-angle shot from behind home plate, slight slow motion. The red pitcher penguin throws; the ball dives and bounces in the dirt just in front of home plate. The sky-blue batter penguin swings hard and misses completely. The ball glances off the catcher penguin's mitt and rolls a few feet to the side. The plate umpire penguin signals strike three with a fist but makes no "out" gesture. SFX: bat whoosh, dull thud in the dirt, crowd "ooh".
```

**C2 — 질주**
```text
Fast side tracking shot: the sky-blue batter penguin drops the bat and sprints up the first-base line, flippers pumping, eyes wide with determination. In the background the sky-blue runner penguin on first base dashes toward second base. Quick whip pan. SFX: pattering footsteps, rising crowd roar.
```

**C3 — 해설 펭귄 등장**
```text
The baseball field in the background is softly out of focus, as if paused. The host penguin, holding a small blank whiteboard, pops up into the foreground from the bottom of the frame with a springy bounce, wags one flipper side to side meaning "nope", then grins at the camera. SFX: cartoon boing.
```

**C4 — 노바운드 포구 = 아웃**
```text
Tight shot at home plate: the pitch smacks cleanly into the red catcher penguin's mitt in mid-air without touching the ground, with a loud pop. The catcher squeezes the mitt shut and holds it up. The plate umpire penguin punches out emphatically. SFX: crisp leather pop.
```

**C5 — 원바운드·놓침 = 낫아웃**
```text
Tight shot at home plate: the pitch bounces once in the dirt before reaching the catcher, deflects off the mitt and rolls behind him. The red catcher penguin's eyes go wide in panic. The plate umpire penguin points at the loose ball and makes no "out" gesture. SFX: thud, rolling ball, comic "uh-oh" sting.
```

**C6 — 1루 승부**
```text
Wide shot down the first-base line: the red catcher penguin scrambles, grabs the loose ball and throws to the red first-baseman penguin stretching at first base, while the sky-blue batter penguin sprints and dives for the bag. The batter's flipper touches the base a split second before the ball arrives; the first-base umpire penguin spreads both flippers wide: safe. Puff of dust. SFX: throw whoosh, mitt pop, crowd cheer.
```

**C7 — 안 뛰면 아웃**
```text
Medium shot: a sky-blue batter penguin, thinking it is out, hangs its head and waddles toward the dugout, stepping outside the circle of dirt around home plate while the ball lies loose near the backstop. The plate umpire penguin calls it out with a firm fist. SFX: comic sad trombone.
```

**C8 — 고의 낙구 꼼수**
```text
Comedic close-up at home plate, with a sky-blue runner penguin standing on first base in the background: the red catcher penguin glances sideways with a sneaky grin and deliberately lets the third-strike pitch drop into the dirt instead of catching it. The plate umpire penguin immediately wags a flipper "no way" and calls the batter out with a fist. SFX: tsk-tsk whistle, comic sting.
```

**C9 — 부감 (포스)**
```text
High aerial view of the whole baseball diamond with all four bases clearly visible: the sky-blue batter penguin runs from home plate toward first base while the sky-blue runner penguin sprints from first base toward second base, both kicking up small dust trails. Clean, readable composition with empty space for graphics. SFX: crowd building.
```

**C10 — 파울팁 포구 = 삼진**
```text
Extreme close-up in super slow motion: the sky-blue batter penguin swings and the bat barely grazes the bottom of the ball with a tiny spark; the ball zips sharply and directly back into the red catcher penguin's mitt and stays there, never touching the ground. Back to normal speed: the plate umpire penguin brushes one flipper across the back of the other, then punches out for strike three. SFX: tiny "tick", leather pop.
```

**C11 — 스친 공을 놓침 = 파울**
```text
Extreme close-up: the bat grazes the ball with a tiny "tick", the ball hits the catcher's mitt, pops out and drops to the dirt. The plate umpire penguin raises both flippers high: foul ball. The sky-blue batter penguin exhales in relief and steps back into the batter's box. SFX: tick, thud, relieved sigh.
```

**C12 — 엔딩**
```text
Sunny wide shot: in the foreground the host penguin points at the camera and winks; behind it the whole sky-blue SPO Penguins team runs happily toward first base with flippers in the air. Warm golden light, sparkling dust. SFX: crowd cheer, upbeat music swell.
```

**커버 이미지**
```text
Vertical 9:16 poster in the same 3D cute penguin style: the sky-blue batter penguin sprinting toward first base with a shocked but determined face, the baseball rolling in the dirt behind, dramatic low angle, bright sunny stadium. Keep the top third clean and empty for a title. No text.
```

커버 제목은 편집에서 얹기: **삼진인데 왜 뛰어?!** (작은 글씨: 낫아웃 1분 정리)

## 3. 내레이션 대본 (TTS용)

TTS가 숫자를 잘못 읽지 않도록 한글로 풀어 썼습니다. 예: 2아웃 → 투아웃, 4개 → 네 개.

```text
[S1 0:00] 투스트라이크 헛스윙! 분명 삼진인데… 타자도 주자도 왜 뛰지?
[S2 0:04] 어차피 아웃? 땡! 아직 아웃 아니야. 이게 바로 낫아웃!
[S3 0:08] 삼진은 기록일 뿐! 아웃은 포수가 공을 땅에 닿기 전에 잡아야 완성. 놓치거나 원바운드면? 타자는 일루로 뛸 수 있어!
[S4 0:16] 수비는 타자를 태그하거나 일루에 먼저 던져야 아웃. 안 뛰고 홈 주변 흙 원을 벗어나면 그땐 진짜 아웃! 그러니 무조건 뛰어야지.
[S5 0:24] 단! 일루가 비었거나 투아웃일 때만! 일루에 주자 있고 투아웃 전이면 그냥 아웃! 일부러 떨어뜨려 병살 잡는 꼼수 방지!
[S6 0:32] 주자가 뛴 이유? 공이 살아 있는 인플레이라서! 게다가 타자가 일루로 오니까, 일루 주자는 이루로 밀려나야 해.
[S7 0:39] 파울팁은 달라! 배트에 살짝 스친 공이 곧장 포수 미트에 잡히면 파울팁, 즉 스트라이크! 투스트라이크면 그대로 삼진 아웃. 못 잡으면? 그냥 파울, 타석 계속!
[S8 0:51] 티엠아이! 낫아웃으로 살아도 투수 기록은 삼진. 그래서 한 이닝 삼진 네 개도 가능! 결론, 공 빠지면? 일단 뛰어!
```

## 4. 업로드 캡션 · 해시태그

```text
2스트라이크 헛스윙 = 무조건 아웃? ❌
포수가 공을 못 잡으면 '낫아웃'! 타자는 1루로 뛸 수 있어요 🐧⚾

✔ 놓치거나 원바운드로 잡으면 낫아웃
✔ 1루가 비었거나 2아웃일 때만
✔ 파울팁은 잡으면 스트라이크(2S면 삼진), 놓치면 그냥 파울

직관 가기 전에 저장해 두고, 헷갈리는 야구 규칙은 댓글로 알려주세요 👇

#낫아웃 #스트라이크낫아웃 #파울팁 #야구규칙 #야구룰 #야구입문 #야구초보 #프로야구 #KBO #야구직관 #스포츠상식 #SPO펭귄즈 #SPOMO
```

## 5. 팩트체크 메모

조항 번호는 MLB 공식야구규칙(Official Baseball Rules) 기준입니다. KBO 리그도 같은 내용이지만, 올리기 전에 최신 KBO 규칙집으로 한 번 더 확인하면 좋습니다.

| 영상 속 설명 | 근거 |
|---|---|
| 세 번째 스트라이크를 포수가 잡지 못하면 타자가 주자가 된다. 단, 1루가 비었거나 2아웃일 때만 | 5.05(a)(2) |
| 헛스윙이 아니라 루킹 삼진이어도 똑같다 (조문이 '심판이 선언한 제3스트라이크') | 5.05(a)(2) |
| '잡았다' = 땅에 닿기 전에 포수 미트(손)로 잡은 것. 원바운드 후에 잡으면 잡은 게 아님 | 5.09(a)(2) 원주 |
| 1루에 주자가 있고 0·1아웃이면 포수가 못 잡아도 타자 아웃 (고의로 떨어뜨려 병살을 노리는 걸 막는 장치) | 5.09(a)(3) |
| 수비는 타자를 태그하거나, 타자보다 먼저 1루를 찍으면 아웃 | 5.09(a)(10) |
| 낫아웃인 줄 모르고 1루로 가지 않은 채 홈 주변 흙 원을 벗어나면 아웃 | 5.05(a)(2) 원주 |
| 낫아웃이어도 투수에게는 삼진이 기록되고, 출루는 보통 폭투나 포일로 기록 → 한 이닝 4삼진 가능 | 9.15(a), 9.13 |
| 파울팁 = 배트에 맞은 공이 날카롭고 곧바로 포수에게 가서 정규로 잡힌 것. 스트라이크이며 볼 인플레이. 잡지 못하면 파울 | 용어의 정의 'FOUL TIP' |
| 2스트라이크에서 파울팁이 잡히면 삼진 아웃 | 5.09(a)(2) |

- MLB는 최근 파울팁 정의의 '포수의 손으로'를 '포수에게'로 바꿔서, 마스크나 몸에 먼저 맞고 잡혀도 파울팁이 될 수 있습니다. 영상에는 어느 리그 기준으로도 맞는 '미트로 곧장 들어가는' 장면만 넣었습니다.
- 주심의 파울팁 신호(한 손으로 다른 손등을 스치기)는 리그와 심판마다 조금 다를 수 있습니다.

**S8에 바꿔 넣을 수 있는 TMI**

- 2아웃 만루에서 낫아웃이 나오면 모든 주자가 밀려나는 상황이라, 포수는 공을 잡고 홈플레이트만 밟아도 포스아웃입니다.
- 유래: 1845년 니커보커 규칙은 "세 번 헛스윙하고 마지막 공이 잡히면 아웃, 잡히지 않으면 페어로 보고 타자는 뛰어야 한다"고 정했습니다.

**참고 자료**

- [Uncaught third strike — Wikipedia](https://en.wikipedia.org/wiki/Uncaught_third_strike)
- [Foul tip — Wikipedia](https://en.wikipedia.org/wiki/Foul_tip)
- [Abandoning base path (including after third strike not caught) — Baseball Rules Academy](https://baseballrulesacademy.com/official-rule/mlb-umpire-manual/abandoning-base-path-including-after-third-strike-not-caught/)
- [Baseball's foul tip rules change — Close Call Sports](https://www.closecallsports.com/2021/09/baseballs-foul-tip-rules-change-in-real.html)
- [Foul tip mechanic — Little League](https://www.littleleague.org/university/articles/foul-tip-mechanic/)
- [윤병웅의 야구 기록과 기록 사이: 김영진의 '낫 아웃' 해프닝 — OSEN](https://osen.co.kr/article/Y1001050001)
