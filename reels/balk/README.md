# SPO 펭귄즈 릴스 — "공도 안 던졌는데 왜 진루해?"

SPOMOgrp 인스타그램 릴스 영상을 만드는 프롬프트입니다. 주제는 **보크** 이고, **보크가 아닌 경우**(투수판에서 발을 뺐을 때, 2루로 던지는 척)도 함께 설명합니다. 캐릭터와 형식은 낫아웃 편과 같습니다.

| 항목 | 내용 |
|---|---|
| 훅 | 투수가 던지다 멈칫했을 뿐인데, 주자가 공짜로 2루에? |
| 제목 | 공도 안 던졌는데 왜 진루해? |
| 캐릭터 | SPO 펭귄즈 |
| 포맷 | 세로 9:16 · 1080×1920 · 30fps · 약 58초 |

## 0. 사용법

| 쓰는 도구 | 넣을 것 |
|---|---|
| 기획안 하나로 영상을 끝까지 만들어 주는 AI | **1. 마스터 프롬프트**를 그대로 붙여넣기 |
| 5~10초 컷을 하나씩 만드는 영상 생성 AI (Veo, Sora, Kling, Runway 등) | **2. 컷별 프롬프트**로 컷 13개 생성 → **3. 내레이션**을 TTS로 녹음 → 편집 앱(CapCut, Vrew 등)에서 자막·그래픽·BGM 합치기 |

- 낫아웃 편에서 잘 나온 펭귄 컷이나 SPO 펭귄즈 공식 캐릭터 이미지를 레퍼런스 이미지로 함께 넣으면 두 편의 펭귄 생김새가 맞춰집니다. 하늘색·네이비·빨간 유니폼은 임시로 정한 색이니, 공식 디자인이 있으면 그에 맞게 바꾸세요.
- 자막, 비교표, 번호 카드, 판정 도장, 화살표, 다이아몬드 그래픽은 영상 생성 AI가 그리게 하지 말고 편집 앱에서 텍스트·도형 레이어로 얹으세요. 영상 생성 AI가 만든 한글은 자주 깨집니다.
- 보크는 투수의 발이 투수판에 붙어 있는지가 핵심입니다. 생성된 컷에서 투수의 발이 마운드에 가려 안 보이면 다시 만드세요.
- 생성된 컷이 **5. 팩트체크**와 다르면 그 컷만 다시 만드세요. 예를 들어 C1에서 투수가 공을 던져 버리거나, '보크 아님' 컷(C10·C11)에서 심판이 투수를 가리키면 다시 만들어야 합니다.

## 1. 마스터 프롬프트

```text
너는 스포츠 규칙을 쉽고 재밌게 풀어주는 인스타그램 릴스 PD야.
아래 기획대로 SPOMOgrp 계정에 올릴 릴스 영상을 만들어줘.

■ 기본 정보
- 계정: SPOMOgrp / 캐릭터: SPO 펭귄즈
- 주제: 보크(주자가 있을 때 투수의 반칙 동작), 그리고 보크가 아닌 경우
- 훅: "투수가 던지다 멈칫했을 뿐인데, 주자가 공짜로 2루에?"
- 제목: "공도 안 던졌는데 왜 진루해?"
- 포맷: 세로 9:16, 1080×1920, 30fps, 60초 이내(목표 약 58초)
- 시청자: 야구는 좋아하지만 규칙은 헷갈리는 입문자
- 톤: 빠르고 유쾌한 반말 해설. 규칙 설명은 100% 정확하게.

■ 캐릭터 — SPO 펭귄즈 (공식 캐릭터 이미지를 첨부하면 그 디자인을 우선)
- 공통: 통통한 아기 펭귄, 부드러운 점토 질감의 3D 카툰, 큰 눈, 노란 부리. 사람 선수는 나오지 않음.
- 주자·타자 펭귄(SPO 펭귄즈): 하늘색 유니폼, 네이비 헬멧
- 투수·포수·내야수 펭귄(상대팀): 빨간 유니폼, 빨간 모자, 갈색 글러브. 포수는 검은 마스크와 프로텍터
- 심판 펭귄(주심·루심): 검은 셔츠, 회색 바지. 주심은 검은 마스크
- 해설 펭귄: 네이비 모자, 헤드셋 마이크, 작은 화이트보드. 화면 앞쪽에서 설명
- 배경: 맑은 낮 야구장, 초록 잔디, 갈색 흙 내야. 마운드 위 흰색 투수판과 투수의 발이 잘 보이게

■ 화면 고정 요소
- 상단 제목 바: "공도 안 던졌는데 왜 진루해?" (끝까지 고정)
- 제목 바 아래 작은 상황판: S1·S4는 "1아웃 · 1루 주자", S7은 "9회말 · 동점 · 1아웃 1·3루"

■ 씬 구성 (시간 / 화면 / 내레이션 / 핵심 자막)
※ 내레이션은 적힌 글자 그대로 읽기 (열세 가지, 오케이)

S1 0:00–0:04 훅
화면: 1루 주자 펭귄이 리드 중 → 투수 펭귄이 투수판을 밟고 세트 자세에서 투구 동작을 시작(앞발을 듦) → 갑자기 멈칫하고 발을 내려놓음. 공은 끝까지 글러브 안 → 주심이 날개로 투수를 곧장 가리키며 외침 → 루심의 손짓에 1루 주자가 신나게 2루로 총총 → 타자 펭귄은 고개를 갸웃
내레이션: "던지다 멈칫했을 뿐인데… 주자가 그냥 2루로 간다고?"
자막: 공도 안 던졌는데 2루로?!

S2 0:04–0:08 정답
화면: 정지 화면 위로 해설 펭귄이 아래에서 '뿅' 튀어나와 고개를 끄덕이며 화이트보드를 톡 침
내레이션: "응, 진짜야! 이게 바로 보크! 주자가 있을 때 투수가 하는 반칙 동작이야."
자막: 이게 바로 '보크' / 주자 있을 때 투수의 반칙 동작

S3 0:08–0:15 벌칙
화면: 위에서 본 다이아몬드 그래픽. 1루·3루 주자에서 화살표가 한 칸씩 → 3루 주자 홈인(+1점), 1루 주자 2루로. 마운드의 투수 펭귄은 어깨가 축 처짐
내레이션: "보크가 선언되면 모든 주자가 한 베이스씩 공짜 진루! 3루 주자는 그대로 득점! 타자 볼카운트는 그대로야."
자막: 모든 주자 한 베이스씩 진루 / 3루 주자는 득점! / 볼카운트는 그대로 (볼 아님!)

S4 0:15–0:21 왜 반칙일까
화면: 상단 라벨 "만약 보크가 없다면?" → 투수 펭귄이 투수판을 밟은 채 홈으로 던지는 척 → 속은 1루 주자가 2루로 뛰기 시작 → 투수가 몸을 돌려 1루로 송구 → 1루수가 귀루하는 주자를 태그 → 깜짝 놀란 주자 위로 큰 빨간 X(편집 그래픽)
내레이션: "왜 반칙이냐고? 던지는 척에 속아 뛰면 주자는 그대로 견제사! 그래서 주자를 속이는 동작은 보크로 금지!"
자막: 만약 보크가 없다면? / 던지는 척에 속으면 견제사 / 그래서 주자 속이기 금지!

S5 0:21–0:35 대표 보크 5가지
화면: 번호 카드와 함께 3초 안팎의 컷 5개를 빠르게. 반칙하는 순간마다 심판 펭귄이 투수를 가리키고 빨간 '보크' 도장이 쾅
  ① 투수판을 밟은 채 투구 동작을 시작했다가 멈칫 (S1 장면 재사용)
  ② 세트 자세에서 두 날개를 모으자마자 멈춤 없이 바로 투구
  ③ 투수판을 밟은 채 1루 쪽으로 던지는 척만 하고 공은 안 던짐
  ④ 1루 쪽으로 발을 내딛지 않고 제자리에서 몸만 돌려 1루로 송구
  ⑤ 세트 자세에서 공이 글러브에서 미끄러져 툭 떨어짐
내레이션: "보크 종류는 무려 열세 가지! 대표적인 것만 보자. 하나, 던지다 멈추기. 둘, 세트 자세에서 안 멈추고 던지기. 셋, 1루나 3루로 던지는 척만 하기. 넷, 그 베이스 쪽으로 발 안 내딛고 견제하기. 다섯, 공 떨어뜨리기. 실수여도 보크!"
자막: 보크 13가지 중 대표 5개 (모두 투수판을 밟고 있을 때)
  ① 던지다 멈추기
  ② 세트에서 안 멈추고 던지기
  ③ 1·3루로 던지는 척만 하기
  ④ 발 안 내딛고 견제 → 발 먼저, 공은 나중!
  ⑤ 공 떨어뜨리기 (실수여도 보크)

S6 0:35–0:45 보크가 아닌 경우
화면: ① 투수가 축발을 투수판 뒤로 빼서 내려선 뒤 1루로 던지는 척 → 주자 화들짝 귀루 → 심판은 가만히, 초록 'OK' 도장 ② 2루 주자가 있을 때 투수판을 밟은 채 2루 쪽으로 발을 내딛으며 던지는 척 → 심판은 가만히, 'OK' 도장 ③ 비교표
내레이션: "보크 아닌 것도 있어! 투수판에서 발을 뒤로 빼면 그냥 내야수라, 베이스로 던지는 척해도 오케이. 2루 주자한텐 투수판 밟고도 오케이! 단, 타자한테 던지는 척은 무조건 보크!"
자막: 발 빼면 내야수!
비교표 자막:
  동작 | 투수판 밟고 | 투수판에서 발 빼고
  1·3루로 던지는 척 | 보크 | OK
  2루로 던지는 척 (2루 주자 있을 때) | OK | OK
  타자에게 던지는 척 | 보크 | 보크
  → 주자가 없으면 보크도 없다!

S7 0:45–0:52 TMI: 끝내기 보크
화면: 상황판 "9회말 · 동점 · 1아웃 1·3루", 관중이 모두 일어선 긴장된 분위기 → 막 마운드에 오른 상대팀 구원투수 펭귄이 투수판을 밟은 채 1루 쪽으로 던지는 척만 함 → 주심이 투수를 가리킴 → 3루 주자 SPO 펭귄이 천천히 걸어 들어와 홈플레이트를 쾅 밟음
내레이션: "TMI! KBO에선 9회말 동점에 올라온 투수가, 초구도 던지기 전에 발 안 빼고 1루로 던지는 척! 그 보크 하나로 경기 끝!"
자막: 초구도 안 던지고 끝내기 보크?! / 2019 KBO · 리그 최초

S8 0:52–0:58 결론
화면: 해설 펭귄이 카메라를 가리키며 윙크 → 뒤에서 SPO 펭귄즈가 더그아웃에서 뛰쳐나와 득점한 주자에게 물을 뿌리며 끝내기 축하 → 엔딩 카드
내레이션: "결론! 주자 있을 땐 투수 발을 잘 봐. 투수판 밟고 움찔하면? 보크, 공짜 진루!"
자막: 결론: 투수판 밟고 움찔하면 공짜 진루!
엔딩 카드: SPO 펭귄즈 + "팔로우 @SPOMOgrp · 헷갈리는 규칙은 댓글로!"

■ 규칙 정확성 체크 (화면과 대사가 이것과 어긋나면 다시 만들 것)
1. 보크는 주자가 있을 때만 성립한다. 보크가 선언되면 모든 주자가 한 베이스씩 안전하게 진루한다(3루 주자는 득점). 타자에게 볼을 주지 않고, 볼카운트는 그대로다.
2. S1의 투수는 공을 던지지 않는다. 투구 동작을 시작했다가 멈추고, 공은 끝까지 글러브 안에 있다.
3. S5의 보크 5가지는 모두 투수가 투수판을 밟고 있을 때다: ① 투구 동작을 시작했다가 멈춤 ② 세트포지션에서 완전히 멈추지 않고 투구 ③ 1루나 3루로 던지는 척만 하고 송구하지 않음 ④ 송구하기 전에 그 베이스 쪽으로 곧장 발을 내딛지 않음 ⑤ 공을 떨어뜨림(실수여도 보크).
4. 축발을 투수판 뒤로 빼면 내야수와 같아져서, 베이스로 던지는 척을 해도 보크가 아니다. 단, 투수판 밖에서도 타자에게 던지는 척(투구 흉내)은 보크다.
5. 투수판을 밟은 채 2루로 던지는 척은 2루 쪽으로 발을 내딛으면 보크가 아니다. 영상에는 2루에 주자가 있는 장면으로만 넣는다.
6. 반칙 장면(S1, S5, S7)에서는 심판이 투수를 가리켜 보크를 선언한다. '보크 아님' 장면(S6)에서는 심판이 아무 동작도 하지 않는다.
7. S7은 실제 기록이다: 2019년 KBO, 9회말 동점 1아웃 1·3루에서 막 등판한 구원투수가 초구를 던지기 전에 투수판에서 발을 빼지 않고 1루로 던지는 척만 해 보크 → 3루 주자 득점으로 경기 종료. 실제 팀·선수 이름과 유니폼은 쓰지 않는다.

■ 연출
- 첫 1초 안에 투수가 멈칫하는 장면과 제목이 함께 보이게. 컷은 1~3초 단위로 빠르게.
- 자막: 굵은 고딕(예: Pretendard ExtraBold), 흰 글자 + 검은 외곽선, 핵심 단어만 하늘색 강조. 한 화면 최대 2줄.
- 판정 도장: '보크'는 빨간 도장, 'OK'는 초록 도장. S5·S6에서 같은 디자인으로 통일.
- 화면 위·아래 약 15~20%와 오른쪽 가장자리(좋아요·댓글 버튼 자리)에는 핵심 자막을 두지 말 것.
- 다이아몬드, 화살표, 비교표, 번호 카드는 깔끔한 플랫 모션그래픽으로.
- 효과음: 멈칫 '끼익', 보크 선언 '삐빅' 경고음, 진루 '총총', 견제 '휙', 공 떨어짐 '툭', 도장 '쾅', 정답 '딩동', 등장 '뿅', 끝내기 '와아'.
- BGM: 경쾌한 저작권 프리 음악, 내레이션보다 작게.
- 내레이션: 밝고 빠른 20대 목소리.

■ 금지
- 실제 구단·리그 로고와 유니폼, 실제 선수, 중계 화면, 응원가
- 영상 안에 AI로 그린 글자 (자막·표·그래픽 글자는 편집 텍스트 레이어로만)

■ 결과물
1. 완성 영상 (MP4, 9:16, 60초 이내)
2. 커버 이미지: 한쪽 발을 든 채 멈칫 굳은 투수 펭귄 + 뒤에서 신나게 2루로 걸어가는 주자 펭귄 + 제목 "움찔하면 공짜 진루?!"
3. 업로드용 캡션과 해시태그
```

## 2. 컷별 영상 생성 프롬프트 (영어)

컷마다 **공통 블록을 앞에 붙여서** 넣으세요. 컷 길이는 편집에서 자르면 됩니다. S5 ①은 C1을 다시 씁니다.

**공통 블록**

```text
3D animated short with cute, chubby baby-penguin characters: soft clay-like texture, big glossy eyes, small yellow beaks, rounded shapes. Sunny daytime baseball stadium, green grass, brown dirt infield, a raised dirt pitcher's mound with a clearly visible white rectangular pitcher's rubber on top; whenever the pitcher is in frame, its feet and the rubber are clearly visible. Bright, playful, smooth motion, vertical 9:16.
Characters: the SPO Penguins team (base runners, batter) wear plain sky-blue jerseys and navy helmets. The opposing team (pitcher, catcher, infielders) wear plain red jerseys and red caps, with a brown leather glove on one flipper; the catcher also has a black mask and chest protector. Umpire penguins wear black shirts and gray pants; the plate umpire wears a black mask. The host penguin wears a navy cap and a headset microphone. No humans.
No text, letters, numbers, logos or watermarks anywhere in the frame.
```

**네거티브 프롬프트** (지원하는 도구만)

```text
text, letters, subtitles, numbers, watermark, logo, real team uniforms, human players, extra limbs, two balls, blurry, distorted faces, feet hidden behind the mound
```

| 컷 | 씬 | 길이 | 내용 |
|---|---|---|---|
| C1 | S1 · S5 ① | 3초 | 던지다 멈칫, 심판이 투수를 가리킴 |
| C2 | S1 | 2초 | 1루 주자가 2루로 총총 |
| C3 | S2 | 3초 | 해설 펭귄 등장 |
| C4 | S3 | 4초 | 부감: 3루 주자 홈인, 1루 주자 2루로 |
| C5 | S4 | 4초 | (만약) 던지는 척에 속은 주자 견제사 |
| C6 | S5 ② | 3초 | 세트에서 안 멈추고 투구 |
| C7 | S5 ③ | 3초 | 투수판 밟고 1루로 던지는 척 |
| C8 | S5 ④ | 3초 | 발 안 내딛고 1루 송구 |
| C9 | S5 ⑤ | 3초 | 공 떨어뜨림 |
| C10 | S6 | 4초 | 발 빼고 1루로 던지는 척 = OK |
| C11 | S6 | 3초 | 2루로 던지는 척 = OK |
| C12 | S7 | 5초 | 끝내기 보크 |
| C13 | S8 | 4초 | 엔딩: 끝내기 축하 |

**C1 — 던지다 멈칫**
```text
Medium shot from the third-base side so the mound, the pitcher's feet and first base are all visible. A sky-blue runner penguin leads off a few steps from first base. The red pitcher penguin stands with its back foot on the white rubber, flippers together at its chest in the set position, then starts its delivery by lifting its front foot toward home plate — and suddenly freezes in mid-motion, wobbles, and sets the foot back down without throwing. The ball never leaves its glove. The plate umpire penguin immediately points a flipper straight at the pitcher. SFX: squeaky brake screech, sharp umpire shout.
```

**C2 — 공짜 진루**
```text
The sky-blue runner penguin happily trots from first base to second base with a smug little grin, flippers swinging, as a base umpire penguin calmly waves it on toward second. At home plate the sky-blue batter penguin tilts its head in confusion. SFX: cheerful pitter-patter footsteps, crowd murmurs.
```

**C3 — 해설 펭귄 등장**
```text
The baseball field in the background is softly out of focus, as if paused. The host penguin, holding a small blank whiteboard, pops up into the foreground from the bottom of the frame with a springy bounce, nods firmly with a confident grin and taps the whiteboard with a flipper. SFX: cartoon boing, bright ding.
```

**C4 — 한 베이스씩 진루**
```text
High aerial view of the whole baseball diamond with all four bases clearly visible. A sky-blue runner penguin on third base jogs home and steps on home plate, while another sky-blue runner penguin jogs from first base to second base. On the mound, the red pitcher penguin's shoulders droop. Clean, readable composition with empty space for graphics. SFX: crowd cheer.
```

**C5 — 만약 보크가 없다면**
```text
Medium-wide shot showing the mound and first base. The sky-blue runner penguin leads off from first base. The red pitcher penguin, back foot on the white rubber, fakes a pitch toward home plate; fooled, the runner sprints toward second base. The pitcher instantly spins and throws to the red first-baseman penguin, who chases down and tags the runner as it scrambles back. The runner's eyes go wide in shock. SFX: whoosh, mitt pop, comic "uh-oh" sting.
```

**C6 — 세트에서 안 멈추고 투구**
```text
Side view of the mound with a sky-blue runner leading off first base in the background. The red pitcher penguin, back foot on the white rubber, swings both flippers together at its chest and, without any pause at all, immediately fires the pitch toward home plate in one rushed, continuous motion. A base umpire penguin points a flipper straight at the pitcher. SFX: quick whoosh, sharp umpire shout.
```

**C7 — 투수판 밟고 1루로 던지는 척**
```text
Medium shot from behind the mound. The red pitcher penguin keeps its back foot planted on the white rubber, turns toward first base and fakes a throw, but the ball stays in its glove. The sky-blue runner penguin dives back to first base. A base umpire penguin points a flipper straight at the pitcher. SFX: whoosh of a fake throw, sharp umpire shout.
```

**C8 — 발 안 내딛고 1루 송구**
```text
Low shot starting on the pitcher's feet, then tilting up to the full body: the red pitcher penguin's feet stay planted on the mound, back foot on the white rubber, and without stepping toward first base it just whips its upper body around and snaps a throw to the red first-baseman penguin. A base umpire penguin points a flipper straight at the pitcher. SFX: snap throw, mitt pop, sharp umpire shout.
```

**C9 — 공 떨어뜨림**
```text
Close-up: the red pitcher penguin stands with its back foot on the white rubber in the set position; the ball slips out of its glove and drops onto the dirt with a soft thud. The pitcher's eyes go wide, and a base umpire penguin points a flipper straight at it. In the background the sky-blue runner penguin grins. SFX: soft thud, comic "oops" sting.
```

**C10 — 발 빼고 1루로 던지는 척 = OK**
```text
Medium shot from behind the mound. The red pitcher penguin first steps its back foot backward off the white rubber, so it is clearly standing off the rubber, then turns and fakes a throw to first base without releasing the ball. The sky-blue runner penguin flinches back to the bag. The umpire penguins stay perfectly still and make no call. SFX: light footstep, whoosh, calm crowd.
```

**C11 — 2루로 던지는 척 = OK**
```text
Wide shot from behind home plate: a sky-blue runner penguin leads off second base while a red shortstop penguin creeps toward the bag. The red pitcher penguin, back foot still on the white rubber, spins around, steps directly toward second base and fakes a throw, keeping the ball. The runner hurries back to second base. The umpire penguins make no call. SFX: whoosh, calm crowd.
```

**C12 — 끝내기 보크**
```text
Tense wide shot of the diamond, sky-blue runner penguins on first and third base, the crowd on its feet. The red relief pitcher penguin, who has just jogged to the mound, sets its back foot on the white rubber, turns toward first base and fakes a throw without releasing the ball. The plate umpire penguin instantly points a flipper straight at the pitcher; the runner on third walks home and stomps on home plate. SFX: crowd gasp, sharp umpire shout, huge roar.
```

**C13 — 엔딩**
```text
Sunny wide shot: in the foreground the host penguin points at the camera and winks; behind it the whole sky-blue SPO Penguins team pours out of the dugout, jumping and splashing the runner who scored with water from bottles. Sparkling water droplets, warm golden light. SFX: crowd cheer, upbeat music swell.
```

**커버 이미지**
```text
Vertical 9:16 poster in the same 3D cute penguin style: the red pitcher penguin frozen mid-delivery on the mound, one foot raised and a startled face, while behind it the sky-blue runner penguin skips happily toward second base. Bright sunny stadium, dramatic low angle. Keep the top third clean and empty for a title. No text.
```

커버 제목은 편집에서 얹기: **움찔하면 공짜 진루?!** (작은 글씨: 보크 1분 정리)

## 3. 내레이션 대본 (TTS용)

TTS가 숫자와 영어 약자를 잘못 읽지 않도록 한글로 풀어 썼습니다. 예: 2루 → 이루, 13가지 → 열세 가지, KBO → 케이비오.

```text
[S1 0:00] 던지다 멈칫했을 뿐인데… 주자가 그냥 이루로 간다고?
[S2 0:04] 응, 진짜야! 이게 바로 보크! 주자가 있을 때 투수가 하는 반칙 동작이야.
[S3 0:08] 보크가 선언되면 모든 주자가 한 베이스씩 공짜 진루! 삼루 주자는 그대로 득점! 타자 볼카운트는 그대로야.
[S4 0:15] 왜 반칙이냐고? 던지는 척에 속아 뛰면 주자는 그대로 견제사! 그래서 주자를 속이는 동작은 보크로 금지!
[S5 0:21] 보크 종류는 무려 열세 가지! 대표적인 것만 보자. 하나, 던지다 멈추기. 둘, 세트 자세에서 안 멈추고 던지기. 셋, 일루나 삼루로 던지는 척만 하기. 넷, 그 베이스 쪽으로 발 안 내딛고 견제하기. 다섯, 공 떨어뜨리기. 실수여도 보크!
[S6 0:35] 보크 아닌 것도 있어! 투수판에서 발을 뒤로 빼면 그냥 내야수라, 베이스로 던지는 척해도 오케이. 이루 주자한텐 투수판 밟고도 오케이! 단, 타자한테 던지는 척은 무조건 보크!
[S7 0:45] 티엠아이! 케이비오에선 구회말 동점에 올라온 투수가, 초구도 던지기 전에 발 안 빼고 일루로 던지는 척! 그 보크 하나로 경기 끝!
[S8 0:52] 결론! 주자 있을 땐 투수 발을 잘 봐. 투수판 밟고 움찔하면? 보크, 공짜 진루!
```

## 4. 업로드 캡션 · 해시태그

```text
투수가 던지다 멈칫했을 뿐인데 주자가 공짜로 2루에? 🐧⚾
이게 바로 '보크'예요!

✔ 주자가 있을 때 투수의 반칙 동작 → 모든 주자 한 베이스씩 진루
✔ 던지다 멈추기 · 세트에서 안 멈추기 · 1·3루로 던지는 척 · 발 안 내딛고 견제 · 공 떨어뜨리기
✔ 투수판에서 발을 빼면 던지는 척 OK, 2루 주자한테는 밟고도 OK

직관 가기 전에 저장해 두고, 헷갈리는 야구 규칙은 댓글로 알려주세요 👇

#보크 #보크규칙 #견제 #끝내기보크 #야구규칙 #야구룰 #야구입문 #야구초보 #프로야구 #KBO #야구직관 #스포츠상식 #SPO펭귄즈 #SPOMO
```

## 5. 팩트체크 메모

조항 번호는 MLB 공식야구규칙(Official Baseball Rules) 기준입니다. KBO 리그도 같은 내용이지만, 올리기 전에 최신 KBO 규칙집으로 한 번 더 확인하면 좋습니다. KBO 규칙집은 한동안 예전 번호를 써서, 2014년·2019년 기사에는 보크 조항이 8.05로 나옵니다.

| 영상 속 설명 | 근거 |
|---|---|
| 보크 = 주자가 있을 때 투수의 반칙 행위. 모든 주자가 한 베이스씩 진루한다 | 용어의 정의 'BALK' |
| 보크가 선언되면 모든 주자가 한 베이스씩 안전 진루 (3루 주자는 득점) | 6.02(a) 벌칙, 5.06(c) |
| 보크는 볼이 아니다. 보크를 적용하면 타자는 이전 볼카운트 그대로 타석에 선다 | 6.02(a) 벌칙, MLB 심판 매뉴얼 |
| 보크 규칙의 목적은 투수가 주자를 고의로 속이지 못하게 하는 것 | 6.02(a) 원주 |
| 보크 조항은 (1)~(13) 모두 열세 가지 | 6.02(a)(1)~(13) |
| ① 투수판을 밟은 채 투구 동작을 시작했다가 멈춤 | 6.02(a)(1) |
| ② 세트포지션에서 멈추지 않고 투구 | 6.02(a)(13), 5.07(a)(2) |
| ③ 투수판을 밟은 채 1루나 3루로 던지는 척만 하고 송구하지 않음. 3루는 MLB 2013년, KBO 2014년부터 | 6.02(a)(2) |
| ④ 투수판을 밟은 채 그 베이스 쪽으로 곧장 발을 내딛기 전에 송구 | 6.02(a)(3) |
| ⑤ 투수판을 밟은 채 공을 떨어뜨림 (일부러든 실수든) | 6.02(a)(11) |
| 축발을 투수판 뒤로 빼면 내야수가 되어, 베이스로 던지는 척을 할 수 있다 | 5.07(e) |
| 투수판 밖에서도 타자에게 던지는 척(투구 흉내)은 보크 | 6.02(a)(7), 6.02(a)(9) |
| 투수판을 밟은 채 2루로 던지는 척은 가능. 단, 주자가 없는 베이스로 던지거나 던지는 척하면 보크(플레이를 하려는 경우는 예외) | 6.02(a)(2)는 1·3루만 해당, 6.02(a)(4) |
| 주자가 없으면 보크도 없다. 주자가 없을 때 반칙투구는 볼 하나 | 용어의 정의 'BALK', 6.02(b) |
| 2019년 9월 14일 인천 SK–두산, 9회말 6-6 1사 1·3루. 막 등판한 두산 구원투수 배영수가 초구 전에 중심발을 투수판에서 떼지 않고 1루 견제 동작만 해 보크 → 3루 주자 김강민 득점, SK 7-6 승리. 공을 하나도 던지지 않은 끝내기 보크는 KBO 최초(스포츠투아이 기준), 끝내기 보크로는 역대 6번째 | 당시 보도 (참고 자료) |

- 투수가 보크를 하고도 그대로 투구하면 플레이는 일단 계속되고, 심판이 타임을 건 뒤 보크를 적용합니다. 이때 타자가 안타·실책·볼넷·몸에 맞는 공 등으로 1루에 가고 다른 주자도 모두 한 베이스 이상 가면 보크는 없던 일로 하고 그 플레이를 그대로 인정합니다. S1은 투수가 공을 던지지 않는 장면이라 바로 진루권이 주어집니다.
- 세트포지션에서 '완전히 멈춤'이 몇 초인지는 규칙에 없고 심판이 판단합니다.
- MLB는 2023년부터 피치클락과 함께 한 타석에 투수판 이탈(견제·발 빼기)을 2번으로 제한하고, 3번째에 주자를 잡지 못하면 보크로 처리합니다. KBO는 2025년에 피치클락을 정식 도입했지만 투수판 이탈 제한은 적용하지 않습니다(2026 시즌 KBO 규정 기준). 그래서 영상에는 넣지 않았습니다.
- 심판의 보크 선언 동작(투수를 가리키며 외치기)은 리그와 심판마다 조금 다를 수 있습니다.

**S7에 바꿔 넣을 수 있는 TMI**

- 보크가 선언된 공을 타자가 쳐서 홈런이 되면? 타자와 주자 모두 한 베이스 이상 갔으니 보크는 없던 일, 홈런 그대로 인정입니다.
- 1961년 MLB 올스타전(샌프란시스코 캔들스틱 파크) 9회, 강풍에 몸이 흔들린 스투 밀러에게 보크가 선언됐습니다. '바람에 마운드에서 날아갔다'는 이야기는 과장이고, 본인은 몸이 몇 인치 흔들린 정도였다고 회고했습니다. 그날 승리투수는 밀러였습니다.
- MLB 기록: 통산 최다 보크는 스티브 칼턴(90개), 한 시즌 최다는 데이브 스튜어트(1988년 16개), 한 경기 최다는 밥 쇼(1963년 5개)입니다.

**참고 자료**

- [Balk — Wikipedia](https://en.wikipedia.org/wiki/Balk)
- [6.02 Pitcher Illegal Action — Baseball Rules Academy](https://baseballrulesacademy.com/?p=17922)
- [Penalty for a Balk (MLB Umpire Manual) — Baseball Rules Academy](https://baseballrulesacademy.com/official-rule/mlb-umpire-manual/penalty-for-a-balk/)
- [Calling "Time" after a Balk (MLB Umpire Manual) — Baseball Rules Academy](https://baseballrulesacademy.com/official-rule/mlb-umpire-manual/calling-time-after-a-balk/)
- [Stepping to a Base (MLB Umpire Manual) — Baseball Rules Academy](https://baseballrulesacademy.com/official-rule/mlb-umpire-manual/stepping-to-a-base/)
- [5.07(a)(2) The Set Position — Baseball Rules Academy](https://baseballrulesacademy.com/official-rule/mlb/5-07a2-set-position/)
- [Rules Reference: Pitching — Umpire Bible](https://umpirebible.com/ruleRefs/ref_pitching.htm)
- [올해부터 머리 맞히면 즉시 퇴장…3루 가짜 견제 금지 — 스포츠경향 (2014)](https://sports.khan.co.kr/article/201401031005163)
- [2026 주요 규정∙규칙 — KBO](https://www.koreabaseball.com/Kbo/League/GameManage2026.aspx)
- [스트라이크존, 내년엔 1㎝ 아래로…피치클록은 ML과 차별화, 견제 제한 없다 — 스포츠경향 (2024)](https://sports.khan.co.kr/article/202412041831003)
- [All of your questions about the new baseball rules, answered — MLB.com (2023)](https://www.mlb.com/news/mlb-new-rules-for-2023-faq)
- 2019년 끝내기 보크 보도: [데일리안](https://m.dailian.co.kr/news/view/825834), [데일리안](https://m.dailian.co.kr/news/view/826026), [문화일보](https://www.munhwa.com/article/11151474)
- [July 11, 1961: Clemente delivers a walk-off win for NL stars in 10th inning — SABR](https://sabr.org/gamesproj/game/july-11-1961-clemente-delivers-a-walk-off-win-for-nl-stars-in-10th-inning/)
- [Did Stu Miller really get blown off the mound at Candlestick Park? — KQED](https://www.kqed.org/news/10400321/did-stu-miller-really-get-blown-off-the-mound-at-candlestick-park)
