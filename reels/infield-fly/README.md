# SPO 펭귄즈 릴스 — "놓쳤는데 왜 아웃이야?"

SPOMOgrp 인스타그램 릴스 영상을 만드는 프롬프트입니다. 주제는 **인필드 플라이**입니다. 이 규칙이 왜 생겼는지, 언제 선언되는지, 선언된 공이 떨어지면 주자는 어떻게 되는지까지 설명합니다. 캐릭터와 형식은 낫아웃·보크·견제 편과 같습니다.

| 항목 | 내용 |
|---|---|
| 훅 | 내야 뜬공을 놓쳤는데, 타자가 아웃이라고? |
| 제목 | 놓쳤는데 왜 아웃이야? |
| 캐릭터 | SPO 펭귄즈 |
| 포맷 | 세로 9:16 · 1080×1920 · 30fps · 약 58초 |

## 0. 사용법

| 쓰는 도구 | 넣을 것 |
|---|---|
| 기획안 하나로 영상을 끝까지 만들어 주는 AI | **1. 마스터 프롬프트**를 그대로 붙여넣기 |
| 5~10초 컷을 하나씩 만드는 영상 생성 AI (Veo, Sora, Kling, Runway 등) | **2. 컷별 프롬프트**로 컷 11개 생성 → **3. 내레이션**을 TTS로 녹음 → 편집 앱(CapCut, Vrew 등)에서 자막·그래픽·BGM 합치기 |

- 이전 편에서 잘 나온 펭귄 컷이나 SPO 펭귄즈 공식 캐릭터 이미지를 레퍼런스 이미지로 함께 넣으면 시리즈 내내 펭귄 생김새가 맞춰집니다. 하늘색·네이비·빨간 유니폼은 임시로 정한 색이니, 공식 디자인이 있으면 그에 맞게 바꾸세요.
- 자막, 체크리스트 카드, 다이아몬드 그래픽, 화살표, 빨간 X, '인필드 플라이!'·'선언 없음' 배지는 영상 생성 AI가 그리게 하지 말고 편집 앱에서 텍스트·도형 레이어로 얹으세요. 영상 생성 AI가 만든 한글은 자주 깨집니다.
- 이번 편은 **심판이 인필드 플라이를 선언했는지**가 핵심입니다. 선언 동작은 모든 컷에서 '오른쪽 날개를 하늘로 쭉 뻗어 가리키기'로 통일하세요. 규칙이 없다고 가정한 S3(C4·C5)과 선언이 없었던 실제 장면 S7(C9)에서 심판이 날개를 들면 다시 만드세요.
- 생성된 컷이 **5. 팩트체크**와 다르면 그 컷만 다시 만드세요. 예를 들어 C5에서 유격수가 공을 잡았다가 떨어뜨리거나(공에 손대지 않고 땅에 떨어뜨려야 합니다), C7에서 포수가 주자를 태그하거나, C8에서 공이 페어 지역에 떨어지면 다시 만들어야 합니다.
- S7은 실제로 논란이 된 장면입니다. 팀·선수 이름을 쓰지 말고, 심판 판정이 틀렸다고 단정하는 자막이나 대사도 넣지 마세요.

## 1. 마스터 프롬프트

```text
너는 스포츠 규칙을 쉽고 재밌게 풀어주는 인스타그램 릴스 PD야.
아래 기획대로 SPOMOgrp 계정에 올릴 릴스 영상을 만들어줘.

■ 기본 정보
- 계정: SPOMOgrp / 캐릭터: SPO 펭귄즈
- 주제: 인필드 플라이 — 왜 생겼는지, 언제 선언되는지, 선언된 공이 떨어지면 어떻게 되는지
- 훅: "내야 뜬공을 놓쳤는데, 타자가 아웃이라고?"
- 제목: "놓쳤는데 왜 아웃이야?"
- 포맷: 세로 9:16, 1080×1920, 30fps, 60초 이내(목표 약 58초)
- 시청자: 야구는 좋아하지만 규칙은 헷갈리는 입문자
- 톤: 빠르고 유쾌한 반말 해설. 규칙 설명은 100% 정확하게.

■ 캐릭터 — SPO 펭귄즈 (공식 캐릭터 이미지를 첨부하면 그 디자인을 우선)
- 공통: 통통한 아기 펭귄, 부드러운 점토 질감의 3D 카툰, 큰 눈, 노란 부리. 사람 선수는 나오지 않음.
- 타자·주자 펭귄(SPO 펭귄즈): 하늘색 유니폼, 네이비 헬멧. 감독 펭귄(S7)은 하늘색 유니폼에 네이비 모자
- 투수·포수·내야수 펭귄(상대팀): 빨간 유니폼, 빨간 모자, 갈색 글러브. 포수는 검은 마스크와 프로텍터
- 심판 펭귄(주심·루심): 검은 셔츠, 회색 바지. 주심은 검은 마스크. 인필드 플라이를 선언할 때는 오른쪽 날개를 하늘로 쭉 뻗어 가리키며 외침
- 해설 펭귄: 네이비 모자, 헤드셋 마이크, 작은 화이트보드. 화면 앞쪽에서 설명
- 배경: 맑은 낮 야구장, 초록 잔디, 갈색 흙 내야, 흰 베이스와 흰 파울라인이 잘 보이게

■ 화면 고정 요소
- 상단 제목 바: "놓쳤는데 왜 아웃이야?" (끝까지 고정)
- 제목 바 아래 작은 상황판: S1 "무사 1·2루" / S3 "무사 1·2루" / S5 "1아웃 만루" / S6 "1아웃 1·2루" / S7 "2025 한국시리즈 3차전 · 1아웃 1·2루"
- 심판이 날개를 드는 순간 상황판 옆에 '인필드 플라이!' 배지. S3에서는 '규칙이 없다면?', S7에서는 '선언 없음' 배지

■ 씬 구성 (시간 / 화면 / 내레이션 / 핵심 자막)
※ 내레이션은 적힌 글자 그대로 읽기 (1·2루=일이루, 2루=이루, 3루=삼루, 2아웃=투아웃, TMI=티엠아이, 2025=이천이십오)

S1 0:00–0:04 훅
화면: 1·2루에 주자 펭귄 → 타자 펭귄이 친 공이 내야 위로 높이 뜸 → 주심이 바로 오른쪽 날개를 하늘로 쭉 뻗음 → 유격수 펭귄이 공 밑에 섰다가 놓쳐 공이 흙에 툭 → 1루로 뛰던 타자에게 주심이 아웃 콜 → 타자는 고개를 갸웃
내레이션: "내야 뜬공을 놓쳤는데… 타자가 아웃이라고?"
자막: 놓쳤는데 타자가 아웃?!

S2 0:04–0:09 정답
화면: 정지 화면 위로 해설 펭귄이 아래에서 '뿅' 튀어나와 고개를 끄덕이며 화이트보드를 톡 침 → 인서트: 심판이 날개를 하늘로 쭉 뻗는 선언 동작 클로즈업
내레이션: "응, 아웃 맞아! 이게 바로 인필드 플라이. 심판이 선언하면 잡든 놓치든 타자는 아웃!"
자막: 이게 바로 '인필드 플라이' / 선언되면 잡든 놓치든 타자 아웃! (페어일 때)

S3 0:09–0:19 왜 생겼을까
화면: 상단 라벨 "규칙이 없다면?" (심판은 아무 동작도 하지 않음) → 1·2루 주자들이 '잡히겠지' 하는 얼굴로 베이스에 한 발씩 붙이고 서 있음 → 공 밑에 선 유격수가 씩 웃더니 글러브를 빼고 공을 땅에 떨어뜨린 뒤 원바운드로 주움 → 당황한 주자들이 뒤늦게 뜀 → 3루로 송구, 3루수가 3루를 밟음(포스아웃) → 2루로 송구, 2루수가 2루를 밟음(포스아웃) → 큰 빨간 X와 "병살 꼼수!"
내레이션: "이 규칙이 없다면? 주자들은 잡힐 줄 알고 베이스에 붙어 있는데, 수비가 일부러 안 잡으면 3루, 2루 줄줄이 포스아웃! 이 병살 꼼수를 막으려고 타자를 먼저 아웃시키는 거야."
자막: 규칙이 없다면? / 일부러 안 잡으면 → 3루·2루 포스아웃 = 병살! / 그래서 타자를 먼저 아웃 → 주자들은 포스에서 해방

S4 0:19–0:30 조건 3가지
화면: 위에서 본 다이아몬드 그래픽. 체크리스트 카드 3장이 하나씩 켜짐 ① 아웃카운트 0·1 ② 1·2루, 만루일 때 해당 베이스에 불 ③ 내야 위로 높이 뜬 공 밑에 내야수가 여유 있게 자리 잡음. 마지막에 '2아웃'과 '1루 주자만' 카드에 회색 X
내레이션: "조건은 세 가지! 노아웃이나 원아웃, 주자는 1·2루나 만루, 그리고 내야수가 평범하게 잡을 수 있는 페어 뜬공! 투아웃이거나 1루 주자만 있으면? 꼼수가 안 통해서 해당 없음!"
자막:
  ① 0아웃·1아웃
  ② 주자 1·2루 또는 만루
  ③ 내야수가 평범한 수비로 잡을 수 있는 페어 뜬공 (라이너·번트 X)
  기준은 잔디·라인 같은 위치가 아니라 '평범한 수비' (투수·포수, 내야로 들어온 외야수도 내야수)
  2아웃 or 1루 주자만 → 꼼수가 안 통해서 해당 없음

S5 0:30–0:39 그래도 공은 살아 있다
화면: 만루에서 홈플레이트 앞으로 뜬 공 → 주심이 날개를 하늘로 → 투수와 포수가 서로 미루다 공이 둘 사이에 툭 → 3루 주자가 틈을 노려 홈으로 쇄도 → 포수가 공을 주워 주자를 태그하지 않고 홈플레이트만 쾅 밟음 → 주자가 미끄러져 들어오고 주심은 두 팔을 벌려 세이프 → 득점 (그래픽 "포스 아님 → 태그해야 아웃!")
내레이션: "단, 공은 살아 있어! 떨어진 틈에 뛰어도 되고, 타자가 이미 아웃이라 포스도 아니야. 베이스만 밟으면 안 되고 태그해야 아웃!"
자막: 공은 살아 있음! / 타자가 이미 아웃 → 주자는 포스 아님 → 태그해야 아웃 / (잡히면 평소 뜬공처럼 리터치 후 진루)

S6 0:39–0:44 이프 페어
화면: 1루 라인 근처로 높이 뜬 공 → 1루심이 날개를 하늘로 쭉 → 공이 아무도 안 건드린 채 라인 바깥 파울 지역에 떨어짐 → 1루심이 두 팔을 들어 파울 → 타자 펭귄이 안도하며 타석으로 돌아감
내레이션: "라인 근처 뜬공은 인필드 플라이 이프 페어! 파울 되면 그냥 파울, 타석 계속!"
자막: 라인 근처면 '인필드 플라이, 이프 페어' / 파울이 되면 그냥 파울 → 타석 계속

S7 0:44–0:52 TMI: 2025 한국시리즈
화면: 상황판 "2025 한국시리즈 3차전 · 1아웃 1·2루", 꽉 찬 관중석 → 내야와 외야 잔디 경계로 높이 뜬 공 → 심판들은 날개를 내린 채 지켜봄('선언 없음' 배지) → 유격수가 심판 쪽을 힐끗 본 뒤 일부러 원바운드로 받아 병살 → 하늘색 감독 펭귄이 뛰어나와 항의 → 심판들은 고개를 저음
내레이션: "TMI! 2025 한국시리즈에선 선언이 없자 유격수가 일부러 원바운드로 받아 병살! 감독 항의에도 판정은 그대로였어."
자막: 선언이 없으면 → 일부러 원바운드 → 병살 / 선언 여부는 심판 판단 ('평범한 수비'로 잡을 수 있나)

S8 0:52–0:58 결론
화면: 해설 펭귄이 카메라를 가리키며 윙크 → 뒤에서 높은 내야 뜬공이 떠도 SPO 펭귄즈 주자들은 베이스에 침착하게 서서 엄지척 → 엔딩 카드
내레이션: "결론! 투아웃 전, 1·2루나 만루에서 내야 뜬공 뜨면? 타자는 이미 아웃, 주자는 침착하게!"
자막: 결론: 2아웃 전 · 1·2루/만루 · 내야 뜬공 = 타자 아웃! / 주자는 침착하게 (공은 살아 있음)
엔딩 카드: SPO 펭귄즈 + "팔로우 @SPOMOgrp · 헷갈리는 규칙은 댓글로!"

■ 규칙 정확성 체크 (화면과 대사가 이것과 어긋나면 다시 만들 것)
1. 인필드 플라이는 0아웃·1아웃에 주자가 1·2루 또는 만루일 때, 내야수가 평범한 수비로 잡을 수 있는 페어 플라이에만 해당한다. 라이너와 번트 시도는 제외. 투수·포수, 그 플레이에서 내야에 자리 잡은 외야수도 내야수로 본다.
2. 심판은 인필드 플라이가 분명해 보이면 바로 선언한다(오른팔을 하늘로 들어 가리킴). 파울라인 근처 공이면 '인필드 플라이, 이프 페어'라고 선언한다.
3. 선언된 공이 페어면 잡든 못 잡든 타자는 아웃이다. 타자가 아웃이므로 주자들은 포스 상태가 아니다.
4. 볼 인플레이다. 주자는 위험을 안고 진루할 수 있다. 공이 잡히면 평소 뜬공처럼 리터치해야 하고, 잡히지 않으면 리터치 없이 진루할 수 있다. 진루하는 주자를 아웃시키려면 태그해야 한다.
5. 선언된 공이 파울이 되면 그냥 파울이다(타자 아웃 아님).
6. '평범한 수비'인지는 심판이 판단한다. 잔디나 베이스라인 같은 위치가 기준이 아니다.
7. S3은 '규칙이 없다면'을 가정한 장면이다. 유격수는 공에 손대지 않고 땅에 떨어뜨린 뒤 주워서 3루·2루 포스아웃으로 병살을 만든다. 심판은 아무 동작도 하지 않는다.
8. S5에서 포수가 홈플레이트만 밟으면 아웃이 아니다(태그해야 함). 3루 주자의 득점이 인정되고, 타자는 인필드 플라이로 아웃이다.
9. S7은 실제 기록이다: 2025년 10월 29일 한국시리즈 3차전 2회말 1아웃 1·2루, 내야와 외야 경계로 높이 뜬 공에 심판진이 인필드 플라이를 선언하지 않았고, 유격수가 일부러 원바운드로 처리해 병살을 만들었다. 감독이 항의했지만 판정은 그대로였다. 실제 팀·선수 이름과 유니폼은 쓰지 않고, 심판 판정이 틀렸다고 단정하지 않는다.
10. 인필드 플라이가 선언되는 장면(S1·S2·S5·S6)에서만 심판이 날개를 하늘로 든다. S3·S7에서는 어떤 심판도 날개를 들지 않는다.

■ 연출
- 첫 1초 안에 높이 뜬 공과 날개를 하늘로 든 심판, 제목이 함께 보이게. 컷은 1~3초 단위로 빠르게.
- 자막: 굵은 고딕(예: Pretendard ExtraBold), 흰 글자 + 검은 외곽선, 핵심 단어만 하늘색 강조. 한 화면 최대 2줄.
- '인필드 플라이!' 배지는 심판이 날개를 드는 순간에 맞춰 띄우고, S7의 '선언 없음' 배지도 같은 자리·같은 디자인으로.
- 다이아몬드, 체크리스트 카드, 화살표, 빨간 X는 깔끔한 플랫 모션그래픽으로.
- 화면 위·아래 약 15~20%와 오른쪽 가장자리(좋아요·댓글 버튼 자리)에는 핵심 자막을 두지 말 것.
- 효과음: 뜬공 '퐁', 심판 선언 외침, 낙구 '툭', 송구 '휙', 포구 '퍽', 슬라이딩 '촤악', 꼼수 '띠용', 정답 '딩동', 등장 '뿅', 득점 '와아', 항의 '삐익' 호루라기.
- BGM: 경쾌한 저작권 프리 음악, 내레이션보다 작게.
- 내레이션: 밝고 빠른 20대 목소리.

■ 금지
- 실제 구단·리그 로고와 유니폼, 실제 선수, 중계 화면, 응원가
- 영상 안에 AI로 그린 글자 (자막·표·그래픽 글자는 편집 텍스트 레이어로만)

■ 결과물
1. 완성 영상 (MP4, 9:16, 60초 이내)
2. 커버 이미지: 유격수 글러브에 맞고 튀는 공 + 날개를 하늘로 든 심판 + 1루로 뛰다 얼어붙은 타자 펭귄 + 제목 "놓쳐도 아웃?!"
3. 업로드용 캡션과 해시태그
```

## 2. 컷별 영상 생성 프롬프트 (영어)

컷마다 **공통 블록을 앞에 붙여서** 넣으세요. 컷 길이는 편집에서 자르면 됩니다.

**공통 블록**

```text
3D animated short with cute, chubby baby-penguin characters: soft clay-like texture, big glossy eyes, small yellow beaks, rounded shapes. Sunny daytime baseball stadium, green grass, brown dirt infield, white bases and white foul lines clearly visible. Bright, playful, smooth motion, vertical 9:16.
Characters: the SPO Penguins team (batter, base runners) wear plain sky-blue jerseys and navy helmets; their manager wears a sky-blue jersey and a navy cap. The opposing team (pitcher, catcher, infielders) wear plain red jerseys and red caps, with brown leather gloves; the catcher also has a black mask and chest protector. Umpire penguins wear black shirts and gray pants; the plate umpire wears a black mask. The host penguin wears a navy cap and a headset microphone. No humans.
When an umpire declares an infield fly, it thrusts its right flipper straight up, pointing at the sky.
No text, letters, numbers, logos or watermarks anywhere in the frame.
```

**네거티브 프롬프트** (지원하는 도구만)

```text
text, letters, subtitles, numbers, watermark, logo, real team uniforms, human players, extra limbs, two balls, blurry, distorted faces
```

| 컷 | 씬 | 길이 | 내용 |
|---|---|---|---|
| C1 | S1 | 4초 | 선언 → 유격수가 놓침 → 그래도 타자 아웃 |
| C2 | S2 | 3초 | 해설 펭귄 등장 |
| C3 | S2 | 2초 | 심판의 인필드 플라이 선언 동작 클로즈업 |
| C4 | S3 | 3초 | (규칙이 없다면) 주자들이 베이스에 붙어 기다림 |
| C5 | S3 | 4초 | (규칙이 없다면) 일부러 안 잡고 3루·2루 포스 병살 |
| C6 | S4 | 4초 | 부감: 1·2루, 내야 위 높은 뜬공 |
| C7 | S5 | 5초 | 만루, 떨어진 틈에 3루 주자 홈인 (포수가 홈만 밟음) |
| C8 | S6 | 4초 | 이프 페어 → 파울 지역에 떨어져 파울 |
| C9 | S7 | 5초 | (2025 한국시리즈) 선언 없음 → 원바운드 병살 |
| C10 | S7 | 3초 | 감독 항의, 심판은 고개 저음 |
| C11 | S8 | 4초 | 엔딩: 침착한 주자들의 엄지척 |

**C1 — 놓쳤는데 타자 아웃**
```text
Wide shot from behind home plate, sky-blue runner penguins on first and second base. The sky-blue batter penguin pops the ball high into the air above the infield, and the plate umpire penguin immediately thrusts its right flipper straight up, pointing at the sky. The red shortstop penguin settles under the ball, but it bounces off the glove and drops onto the dirt. As the batter jogs toward first base, the plate umpire points at it and makes a firm "out" fist. The batter stops and tilts its head in confusion. SFX: high pop, umpire shout, soft thud, puzzled "huh?".
```

**C2 — 해설 펭귄 등장**
```text
The baseball field in the background is softly out of focus, as if paused. The host penguin, holding a small blank whiteboard, pops up into the foreground from the bottom of the frame with a springy bounce, nods firmly with a confident grin and taps the whiteboard with a flipper. SFX: cartoon boing, bright ding.
```

**C3 — 인필드 플라이 선언 동작**
```text
Low-angle close-up of an umpire penguin looking up at a high pop-up against the bright blue sky, then thrusting its right flipper straight up, pointing at the sky, while shouting with its beak wide open. SFX: firm umpire shout.
```

**C4 — (규칙이 없다면) 베이스에 붙어 기다리는 주자들**
```text
Wide shot from behind home plate. Sky-blue runner penguins stand on first and second base, each keeping one foot on the bag, calmly watching a high pop-up over the infield, sure it will be caught. The red shortstop penguin settles under the ball with a sneaky sideways grin. The umpire penguins just watch with their flippers down at their sides. SFX: crowd hush.
```

**C5 — (규칙이 없다면) 일부러 안 잡고 병살**
```text
Continuing the play, the umpire penguins keep their flippers down at their sides. At the last moment the red shortstop penguin pulls its glove away and lets the pop-up hit the dirt untouched, then scoops it up on the bounce. The startled sky-blue runners scramble off their bases. The shortstop throws to the red third-baseman penguin, who steps on third base, and the third baseman fires to the red second-baseman penguin, who steps on second base just ahead of the other runner: double play. SFX: thud, quick throws, mitt pops, comic "gotcha" sting.
```

**C6 — 부감: 인필드 플라이 조건**
```text
High aerial view of the whole baseball diamond with all four bases clearly visible: sky-blue runner penguins stand near first and second base while a high pop-up hangs above the infield and a red infielder penguin settles comfortably under it. Clean, readable composition with empty space for graphics. SFX: crowd building.
```

**C7 — 만루, 떨어진 틈에 홈인**
```text
Wide shot of the home-plate area with sky-blue runner penguins on first, second and third base. A high pop-up comes down in front of home plate, and the plate umpire penguin thrusts its right flipper straight up, pointing at the sky. The red pitcher penguin and the red catcher penguin both look up, each waiting for the other, and the ball drops between them. The sky-blue runner on third sprints home. The catcher grabs the ball and just stomps on home plate without tagging the runner, who slides across the plate. The plate umpire spreads both flippers wide: safe. SFX: thud, scrambling feet, slide, crowd roar.
```

**C8 — 이프 페어 → 파울**
```text
Medium shot along the first-base line. A high pop-up drifts near the white foul line, and the first-base umpire penguin thrusts its right flipper straight up, pointing at the sky. The ball floats over the line and lands untouched in foul territory, and the umpire raises both flippers high: foul ball. The sky-blue batter penguin exhales in relief and walks back to the batter's box. SFX: soft thud, relieved sigh.
```

**C9 — (2025 한국시리즈) 선언 없이 원바운드 병살**
```text
Big-game atmosphere with a packed, roaring crowd. Sky-blue runner penguins on first and second base. A high pop-up drifts toward the edge where the dirt infield meets the outfield grass; every umpire penguin watches with its flippers down at its sides. The red shortstop penguin drifts back under it, glances at the umpires, then lets the ball bounce once on purpose, scoops it up and quickly turns a double play against the confused runners. SFX: crowd gasp, quick throws, mitt pops.
```

**C10 — 감독 항의**
```text
The sky-blue manager penguin in a navy cap hurries out of the dugout, flapping its flippers and arguing with the umpire penguins, who calmly shake their heads. SFX: crowd boos, whistle.
```

**C11 — 엔딩**
```text
Sunny wide shot: in the foreground the host penguin points at the camera and winks; behind it a high pop-up hangs over the infield while the sky-blue SPO Penguins runners stay calmly on their bases and give a big thumbs-up with their flippers. Warm golden light, sparkles. SFX: crowd cheer, upbeat music swell.
```

**커버 이미지**
```text
Vertical 9:16 poster in the same 3D cute penguin style: a baseball bouncing off a red shortstop penguin's glove, an umpire penguin thrusting its right flipper straight up at the sky, and the sky-blue batter penguin frozen halfway to first base with a shocked face. Bright sunny stadium, dramatic low angle. Keep the top third clean and empty for a title. No text.
```

커버 제목은 편집에서 얹기: **놓쳐도 아웃?!** (작은 글씨: 인필드 플라이 1분 정리)

## 3. 내레이션 대본 (TTS용)

TTS가 숫자와 영어 약자를 잘못 읽지 않도록 한글로 풀어 썼습니다. 예: 1·2루 → 일이루, 3루 → 삼루, 2아웃 → 투아웃, TMI → 티엠아이, 2025 → 이천이십오.

```text
[S1 0:00] 내야 뜬공을 놓쳤는데… 타자가 아웃이라고?
[S2 0:04] 응, 아웃 맞아! 이게 바로 인필드 플라이. 심판이 선언하면 잡든 놓치든 타자는 아웃!
[S3 0:09] 이 규칙이 없다면? 주자들은 잡힐 줄 알고 베이스에 붙어 있는데, 수비가 일부러 안 잡으면 삼루, 이루 줄줄이 포스아웃! 이 병살 꼼수를 막으려고 타자를 먼저 아웃시키는 거야.
[S4 0:19] 조건은 세 가지! 노아웃이나 원아웃, 주자는 일이루나 만루, 그리고 내야수가 평범하게 잡을 수 있는 페어 뜬공! 투아웃이거나 일루 주자만 있으면? 꼼수가 안 통해서 해당 없음!
[S5 0:30] 단, 공은 살아 있어! 떨어진 틈에 뛰어도 되고, 타자가 이미 아웃이라 포스도 아니야. 베이스만 밟으면 안 되고 태그해야 아웃!
[S6 0:39] 라인 근처 뜬공은 인필드 플라이 이프 페어! 파울 되면 그냥 파울, 타석 계속!
[S7 0:44] 티엠아이! 이천이십오 한국시리즈에선 선언이 없자 유격수가 일부러 원바운드로 받아 병살! 감독 항의에도 판정은 그대로였어.
[S8 0:52] 결론! 투아웃 전, 일이루나 만루에서 내야 뜬공 뜨면? 타자는 이미 아웃, 주자는 침착하게!
```

## 4. 업로드 캡션 · 해시태그

```text
내야 뜬공을 놓쳤는데 타자가 아웃? 🐧⚾
이게 바로 '인필드 플라이'예요!

✔ 2아웃 전 + 주자 1·2루나 만루 + 내야수가 평범하게 잡을 수 있는 페어 뜬공
✔ 선언되면 잡든 놓치든 타자 아웃 → 일부러 떨어뜨려 병살 잡는 꼼수 방지
✔ 공은 살아 있어서 주자는 뛸 수 있고, 포스가 아니라 태그해야 아웃

'삼진인데 아웃 아님' 낫아웃이랑 정반대인 규칙! 헷갈리는 야구 규칙은 댓글로 알려주세요 👇

#인필드플라이 #인필드플라이규칙 #야구규칙 #야구룰 #야구입문 #야구초보 #프로야구 #KBO #한국시리즈 #야구직관 #스포츠상식 #SPO펭귄즈 #SPOMO
```

## 5. 팩트체크 메모

조항 번호는 MLB 공식야구규칙(Official Baseball Rules) 기준입니다. KBO 리그도 같은 내용이지만, 올리기 전에 최신 KBO 규칙집으로 한 번 더 확인하면 좋습니다.

| 영상 속 설명 | 근거 |
|---|---|
| 인필드 플라이 = 2아웃 전, 주자 1·2루 또는 만루일 때 내야수가 평범한 수비로 잡을 수 있는 페어 플라이. 라이너와 번트 시도는 제외 | 용어의 정의 'INFIELD FLY' |
| 투수·포수, 그 플레이에서 내야에 자리 잡은 외야수도 내야수로 본다 | 용어의 정의 'INFIELD FLY' |
| 심판은 인필드 플라이가 분명해 보이면 바로 선언하고, 파울라인 근처 공이면 '인필드 플라이, 이프 페어'라고 선언한다. 보통 오른팔을 하늘로 들어 가리키며 외친다 | 용어의 정의 'INFIELD FLY', 심판 메커닉 |
| 인필드 플라이가 선언되면 타자는 아웃 (공을 잡든 못 잡든) | 5.09(a)(5) |
| 볼 인플레이. 주자는 공이 잡힐 위험을 안고 진루하거나, 공이 잡히면 리터치한 뒤 진루할 수 있다(평소 뜬공과 같음) | 용어의 정의 'INFIELD FLY' |
| 타자가 아웃되므로 주자들은 포스 상태가 아니다. 진루하는 주자를 아웃시키려면 태그해야 한다 | 용어의 정의 'FORCE PLAY' (타자가 주자가 되어야 포스가 생김) |
| 선언된 공이 파울이 되면 그냥 파울이다. 아무도 건드리지 않은 공이 1·3루를 지나기 전에 파울 지역으로 나가면 파울, 라인 밖에 떨어졌다가 1·3루 전에 페어 지역으로 들어오면 인필드 플라이 | 용어의 정의 'INFIELD FLY' |
| '평범한 수비'인지는 심판이 판단한다. 잔디나 베이스라인 같은 경계가 기준이 아니며, 외야수가 처리했더라도 내야수가 쉽게 잡을 수 있었다면 인필드 플라이다. 어필 플레이가 아니다 | 용어의 정의 'INFIELD FLY' 원주 |
| 인필드 플라이가 선언된 공을 내야수가 일부러 떨어뜨려도 볼 인플레이 (인필드 플라이가 고의낙구 규칙보다 우선) | 5.09(a)(12), 용어의 정의 'INFIELD FLY' 원주 |
| 규칙이 생긴 이유: 내야 뜬공을 일부러 떨어뜨려 병살(또는 삼중살)을 잡는 수비를 막으려고 1890년대에 생겼다 | Wikipedia, SABR (참고 자료) |
| 2아웃이면 아웃 하나로 이닝이 끝나서, 1루 주자만 있으면 타자와 1루 주자를 맞바꾸는 정도라서 수비가 얻는 이득이 없다 | Wikipedia, 리틀리그 해설 (참고 자료) |
| 2025년 10월 29일 대전 한화생명볼파크, LG–한화 한국시리즈 3차전 2회말 1사 1·2루. 한화 이도윤의 타구가 내야와 외야 경계로 높이 떴지만 심판진은 인필드 플라이를 선언하지 않았고, LG 유격수 오지환이 일부러 원바운드로 처리해 병살을 만들었다. 한화 김경문 감독이 항의했지만 판정은 바뀌지 않았고, 경기 뒤 김 감독은 영상으로 보니 심판도 판단하기 애매한 위치였다는 취지로 말했다. 오지환은 심판의 콜이 없는 걸 확인하고 한 플레이라고 설명했다 | 당시 보도 (참고 자료) |

- 1·3루, 2·3루, 주자가 한 명뿐일 때도 인필드 플라이가 아닙니다. 포스될 수 있는 주자가 두 명 이상이어야 수비가 일부러 떨어뜨려 이득을 볼 수 있기 때문입니다.
- 2025년 한국시리즈 장면은 기사마다 타구를 뜬공, 유격수 땅볼, 2루수 앞 땅볼 등으로 다르게 적었고, 3루심이 손을 들다가 내렸다는 보도도 있습니다. 그래서 영상에서는 '내야와 외야 경계로 높이 뜬 공, 선언 없음, 원바운드 처리, 병살'까지만 보여 줍니다.
- 고의낙구 규칙(5.09(a)(12))은 다른 규칙입니다. 2아웃 전에 1루에 주자가 있을 때 내야수가 뜬공이나 라이너를 일부러 떨어뜨리면 볼 데드, 타자 아웃, 주자는 원래 베이스로 돌아갑니다. 공에 손대지 않고 그냥 떨어지게 두는 건 고의낙구가 아니라서, S3은 유격수가 공에 손대지 않는 장면으로 만들었습니다.

**S7에 바꿔 넣을 수 있는 TMI**

- 2012년 10월 5일, 처음 열린 MLB 내셔널리그 와일드카드 결정전(애틀랜타 터너필드, 세인트루이스–애틀랜타). 8회말 1사 1·2루에서 짧은 좌익수 앞에 떨어진 공에 좌익선심 샘 홀브룩이 인필드 플라이를 선언했습니다. 유격수가 공 밑까지 가서 평범하게 잡을 수 있었다는 판단이었습니다. 화난 관중들이 병과 쓰레기를 던져 경기가 19분 중단됐고, 애틀랜타의 제소는 '심판 판단 사항'이라 기각됐습니다. 경기는 세인트루이스가 6-3으로 이겼습니다.
- 2015년 5월 일본 프로야구 히로시마–요미우리전. 9회말 2-2, 1사 만루에서 홈플레이트 앞 뜬공이 떨어졌고, 요미우리 1루수가 포스아웃인 줄 알고 홈플레이트만 밟았습니다. 주심은 처음에 3루 주자를 아웃으로 봤지만, 히로시마 3루 코치가 "인필드 플라이라 포스가 아니고 태그도 안 했다"고 짚자 세이프로 바꿨고, 그 득점으로 경기가 끝났습니다. 주심이 인필드 플라이를 제대로 알리지 않았다는 비판도 나왔습니다. S5와 같은 장면이 실제로 나온 사례입니다.
- 1975년 미국 펜실베이니아대 법학 학술지에 「인필드 플라이 규칙의 커먼로 기원」이라는 글이 실렸습니다. 법학 논문 문체를 패러디한 글인데, 실제 판결문에도 인용될 만큼 유명해졌습니다.
- 2014년 9월 7일 대전 LG–한화전에서도 오지환이 높은 뜬공을 원바운드로 처리해 병살을 만들어 인필드 플라이·고의낙구 논란이 있었습니다.

**참고 자료**

- [Infield fly rule — Wikipedia](https://en.wikipedia.org/wiki/Infield_fly_rule)
- [Infield Fly Rule — Umpire Bible](https://umpirebible.com/rules/iff.htm)
- [Explaining the infield fly rule — MLB.com](https://www.mlb.com/news/the-infield-fly-rule-a-history-and-explanation)
- [Explanation of the infield fly rule — Little League](https://www.littleleague.org/university/articles/explanation-of-the-infield-fly-rule/)
- [Revisiting the Origin of the Infield Fly Rule — SABR](https://sabr.org/research/revisiting-origin-infield-fly-rule)
- [Inside the rules: The infield fly — The Hardball Times](https://tht.fangraphs.com/rules-the-infield-fly/)
- 2025년 한국시리즈 3차전 보도: [뉴시스](https://www.newsis.com/view/NISX20251030_0003384088), [OSEN](https://osen.co.kr/article/G1112687117), [OSEN](https://osen.co.kr/article/G1112687398), [다음 뉴스](https://v.daum.net/v/20251029194222369), [다음 뉴스 (영상)](https://v.daum.net/v/8XjTKle4vG)
- 2012년 와일드카드 결정전: [Wikipedia](https://en.wikipedia.org/wiki/2012_National_League_Wild_Card_Game), [MLB.com](https://www.mlb.com/news/infield-fly-ruling-disrupts-cardinals-braves-wild-card-game-c39509938), [ESPN](https://www.espn.com/mlb/playoffs/2012/story/_/id/8467263/st-louis-cardinals-atlanta-braves-nl-wild-card-game-halted-fans-protest-infield-fly-call)
- 2015년 일본 프로야구: [Japan Times](https://japantimes.co.jp/sports/2015/05/17/baseball/japanese-baseball/botched-call-serves-wakeup-call-npb-umps)
- [The Common Law Origins of the Infield Fly Rule — Wikipedia](https://en.wikipedia.org/wiki/The_Common_Law_Origins_of_the_Infield_Fly_Rule)
- 2014년 LG–한화전: [OSEN](https://osen.co.kr/article/G1109949569)
