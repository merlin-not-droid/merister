# SPO 펭귄즈 릴스 — "견제, 막 던져도 돼?"

SPOMOgrp 인스타그램 릴스 영상을 만드는 프롬프트입니다. 주제는 **다양한 견제 방법**입니다. 투수판을 밟고 있는지, 어느 베이스로 던지는지, 누가 던지는지에 따라 **던져도 되는 견제**와 **던지면 보크인 견제**를 나눠 설명합니다. 캐릭터와 형식은 낫아웃·보크 편과 같습니다.

| 항목 | 내용 |
|---|---|
| 훅 | 다리까지 들었는데 1루로 휙! 이거 보크 아니야? |
| 제목 | 견제, 막 던져도 돼? |
| 캐릭터 | SPO 펭귄즈 |
| 포맷 | 세로 9:16 · 1080×1920 · 30fps · 약 58초 |

## 0. 사용법

| 쓰는 도구 | 넣을 것 |
|---|---|
| 기획안 하나로 영상을 끝까지 만들어 주는 AI | **1. 마스터 프롬프트**를 그대로 붙여넣기 |
| 5~10초 컷을 하나씩 만드는 영상 생성 AI (Veo, Sora, Kling, Runway 등) | **2. 컷별 프롬프트**로 컷 14개 생성 → **3. 내레이션**을 TTS로 녹음 → 편집 앱(CapCut, Vrew 등)에서 자막·그래픽·BGM 합치기 |

- 낫아웃·보크 편에서 잘 나온 펭귄 컷이나 SPO 펭귄즈 공식 캐릭터 이미지를 레퍼런스 이미지로 함께 넣으면 시리즈 내내 펭귄 생김새가 맞춰집니다. 하늘색·네이비·빨간 유니폼은 임시로 정한 색이니, 공식 디자인이 있으면 그에 맞게 바꾸세요.
- 보크 편에서 만든 컷은 그대로 써도 됩니다. 보크 편 C11(2루로 던지는 척)은 이번 C5로, 보크 편 C10(발 빼고 1루로 던지는 척)은 이번 C8로 쓰면 됩니다. C8로 쓸 컷은 투수가 발을 먼저 뺀 다음 손을 푸는지 확인하세요.
- 자막, 규칙 카드, 판정 도장, 화살표, 견제 카운터, '오른손/왼손'·'투수판 밟음/뺌' 표시는 영상 생성 AI가 그리게 하지 말고 편집 앱에서 텍스트·도형 레이어로 얹으세요. 영상 생성 AI가 만든 한글은 자주 깨집니다.
- 이번 편은 **투수가 왼손인지 오른손인지**, **축발(투수판을 밟는 발)이 투수판에 붙어 있는지**가 핵심입니다. 투수의 발이 마운드에 가려 안 보이거나, 왼손 투수 컷(C1·C4)에서 글러브가 왼쪽 날개에 있거나 몸이 1루를 보고 있지 않으면 다시 만드세요. 좌우 반전으로 고치면 1루와 3루 위치까지 뒤바뀌니, 반전하지 말고 다시 생성하세요.
- 생성된 컷이 **5. 팩트체크**와 다르면 그 컷만 다시 만드세요. 예를 들어 C1에서 든 발이 투수판 뒤로 넘어가거나, C8에서 투수가 투수판을 밟은 채 먼저 손을 풀거나, C12에서 투수가 투수판을 밟고 있거나, OK 컷(C3·C5·C8·C9)에서 심판이 투수를 가리키면 다시 만들어야 합니다.
- S6의 KBO 내용은 2026 시즌 기준입니다. KBO가 1군 투수판 이탈 제한 도입을 검토하고 있으니, 올리기 전에 최신 발표를 확인하세요(**5. 팩트체크** 참고).

## 1. 마스터 프롬프트

```text
너는 스포츠 규칙을 쉽고 재밌게 풀어주는 인스타그램 릴스 PD야.
아래 기획대로 SPOMOgrp 계정에 올릴 릴스 영상을 만들어줘.

■ 기본 정보
- 계정: SPOMOgrp / 캐릭터: SPO 펭귄즈
- 주제: 다양한 견제 방법 — 던져도 되는 견제와 던지면 보크인 견제
- 훅: "다리까지 들었는데 1루로 휙! 이거 보크 아니야?"
- 제목: "견제, 막 던져도 돼?"
- 포맷: 세로 9:16, 1080×1920, 30fps, 60초 이내(목표 약 58초)
- 시청자: 야구는 좋아하지만 규칙은 헷갈리는 입문자
- 톤: 빠르고 유쾌한 반말 해설. 규칙 설명은 100% 정확하게.

■ 캐릭터 — SPO 펭귄즈 (공식 캐릭터 이미지를 첨부하면 그 디자인을 우선)
- 공통: 통통한 아기 펭귄, 부드러운 점토 질감의 3D 카툰, 큰 눈, 노란 부리. 사람 선수는 나오지 않음.
- 주자·타자 펭귄(SPO 펭귄즈): 하늘색 유니폼, 네이비 헬멧
- 투수·포수·내야수 펭귄(상대팀): 빨간 유니폼, 빨간 모자, 갈색 글러브. 포수는 검은 마스크와 프로텍터
  · 오른손 투수: 글러브는 왼쪽 날개, 공은 오른쪽 날개. 세트 자세에서 3루 쪽을 보고 서서 1루를 등짐
  · 왼손 투수(S1·S3에만 등장): 글러브는 오른쪽 날개, 공은 왼쪽 날개. 세트 자세에서 1루를 정면으로 봄
- 심판 펭귄(주심·루심): 검은 셔츠, 회색 바지. 주심은 검은 마스크
- 해설 펭귄: 네이비 모자, 헤드셋 마이크, 작은 화이트보드. 화면 앞쪽에서 설명
- 배경: 맑은 낮 야구장, 초록 잔디, 갈색 흙 내야. 마운드 위 흰색 투수판과 투수의 발이 잘 보이게

■ 화면 고정 요소
- 상단 제목 바: "견제, 막 던져도 돼?" (끝까지 고정)
- 제목 바 아래 작은 상황판(주자 위치): S1·S3·S5 "1루 주자" / S4는 컷마다 "2루 주자", "3루 주자", "2루 주자 · 1루 비었음" / S6 "MLB" → "KBO 리그" / S7 "1루 주자" → "2025 MLB · 1아웃 2·3루"
- 상황판 옆 투수 표시(S1·S3·S4·S5): "오른손" 또는 "왼손" + 투수판 아이콘 "밟음" 또는 "뺌"

■ 씬 구성 (시간 / 화면 / 내레이션 / 핵심 자막)
※ 내레이션은 적힌 글자 그대로 읽기 (1루=일루, 2루=이루, 3루=삼루, KBO=케이비오, TMI=티엠아이, 오케이)

S1 0:00–0:04 훅
화면: 1루 주자 펭귄이 리드 중 → 왼손 투수 펭귄이 투수판을 밟고 세트 자세로 1루를 빤히 봄 → 앞다리를 높이 듦(든 발은 투수판 뒤쪽 끝을 넘지 않음) → 투구인 줄 안 주자가 2루 쪽으로 몸이 쏠림 → 투수가 1루 쪽으로 곧장 발을 내딛으며 1루로 송구 → 1루수가 귀루하는 주자를 태그, 1루심 아웃 콜 → 타자 펭귄은 입을 떡 벌림
내레이션: "다리까지 들었는데 1루로 휙! 이거 보크 아니야?"
자막: 다리 들고 견제?! 보크 아냐?

S2 0:04–0:08 정답
화면: 정지 화면 위로 해설 펭귄이 아래에서 '뿅' 튀어나와 씩 웃으며 고개를 젓고 화이트보드를 톡 침 → 초록 'OK' 도장
내레이션: "보크 아님! 견제는 언제, 어떻게 던지느냐가 핵심이야. 바로 정리!"
자막: 정답: 보크 아님! / 던져도 되는 견제 vs 보크 되는 견제

S3 0:08–0:20 1루 견제 (투수판을 밟고 있을 때)
화면:
  ① 규칙 카드 "투수판 밟고 견제 → 던질 베이스 쪽으로 발 먼저, 공은 나중"
  ② 오른손 투수: 1루를 등진 세트 자세에서 몸을 휙 돌려 1루 쪽으로 발을 내딛고 송구 → 주자 귀루, 1루심 세이프, 초록 'OK' 도장
  ③ 왼손 투수: S1 장면 다시 보기 + 1루 쪽 화살표, 'OK' 도장
  ④ 왼손 투수가 든 발을 투수판 뒤쪽 끝 너머로 넘겼다가(투수판 뒤쪽 끝에 빨간 선) 1루로 송구 → 심판이 투수를 가리킴, 빨간 '보크' 도장
내레이션: "투수판 밟고 견제할 땐 던질 베이스 쪽으로 발 먼저! 오른손 투수는 1루를 등지고 서서 휙 돌아서. 왼손 투수는 1루를 보고 서서 다리 들고도 오케이! 단, 든 발이 투수판 뒤로 넘어가면 타자한테 던져야 해."
자막:
  발 먼저, 공은 나중! (발 안 내딛고 던지면 보크)
  오른손: 1루를 등지고 → 휙 돌아서 OK
  왼손: 1루를 보고 → 다리 들고도 OK (1루 쪽으로 곧장)
  든 발이 투수판 뒤쪽 끝을 넘으면 → 타자에게! (견제하면 보크)
  ④ 도장 옆 작게: 보크 = 모든 주자 한 베이스 공짜 진루

S4 0:20–0:28 2루·3루, 그리고 빈 베이스
화면:
  ① "2루 주자": 투수판을 밟은 채 빙글 돌아 2루 쪽으로 발을 내딛으며 던지는 척 → 주자 귀루, 심판은 가만히, 'OK'
  ② "3루 주자": 투수판을 밟은 채 3루 쪽으로 발을 내딛으며 던지는 척만 함 → 심판이 투수를 가리킴, '보크'
  ③ "2루 주자 · 1루 비었음": 투수판을 밟은 채 주자 없는 1루로 송구 → 1루수 어리둥절, 심판이 투수를 가리킴, '보크'
내레이션: "2루는 빙글 돌아서 던지는 척만 해도 오케이. 3루는 척하면 보크, 진짜로 던져야 해! 주자 없는 베이스로 던져도 보크!"
자막: 2루: 던지는 척도 OK / 3루: 척은 보크, 진짜 송구만 OK / 빈 베이스로 송구 = 보크 (도루하는 주자 잡을 땐 OK)

S5 0:28–0:35 발 빼고 견제, 포수 견제
화면:
  ① 투수가 축발을 투수판 뒤로 빼서 내려선 다음(투수판 아이콘 '밟음' → '뺌') 손을 풀고 1루로 던지는 척 → 주자 화들짝 귀루, 심판은 가만히, 'OK'
  ② 포수가 공을 받자마자 벌떡 일어나 1루로 송구 → 주자가 슬라이딩으로 귀루, 1루심 세이프, 'OK'
내레이션: "투수판에서 발을 뒤로 빼면 그냥 내야수! 어디로 던지든, 척만 하든 오케이. 포수는 원래 자유! 공 받자마자 휙!"
자막: 발 빼면 내야수 → 어디든 던지기·척 OK / 포수 견제: 보크 규칙 없음 → 언제든 OK

S6 0:35–0:42 몇 번까지?
화면:
  ① "MLB": 투수가 1루 견제 → 카운터 ①, 또 견제 → ②, 세 번째 견제에도 주자 세이프 → 카운터 ③이 빨갛게 → 심판이 투수를 가리킴, '보크', 주자가 2루로 총총
  ② "KBO 리그": 투수가 계속 1루 견제, 주자는 매번 슬라이딩해 흙투성이로 헉헉, 카운터 숫자가 계속 올라가다 ∞
내레이션: "몇 번까지 던져도 될까? 메이저리그는 한 타석 두 번까지! 세 번째에 못 잡으면 보크. KBO 리그는 아직 제한 없어."
자막: MLB: 한 타석에 견제·발 빼기 합쳐 2번까지 (2023~) / 3번째에 못 잡으면 보크 / KBO 리그: 횟수 제한 없음 (2026 시즌 기준)

S7 0:42–0:51 TMI: 히든볼 트릭
화면:
  ① "1루 주자": 1루수가 공을 글러브 속에 몰래 숨김. 투수는 투수판에서 떨어진 잔디 위에서 빈 글러브를 만지작 → 주자가 리드하려고 베이스에서 발을 떼는 순간 1루수가 태그, 1루심 아웃 콜, 'OK'
  ② "2025 MLB · 1아웃 2·3루": 3루수가 숨긴 공으로 3루 주자를 태그 → 그런데 공 없는 투수가 투수판을 밟고 서 있음(빨간 원으로 강조) → 3루심이 투수를 가리키며 보크 → 3루 주자가 걸어 들어와 홈플레이트를 쾅, 2루 주자는 3루로, 3루수는 글러브로 얼굴을 가림
내레이션: "TMI! 공을 몰래 숨겼다가 태그하는 히든볼 트릭도 합법! 근데 실제로 메이저리그에서, 투수가 공 없이 투수판에 서 있다가 보크! 오히려 실점!"
자막: 히든볼 트릭(공 숨기기) = 합법! / 단, 공 없는 투수가 투수판 밟으면 보크 / 2025 MLB: 태그하고도 보크로 1실점

S8 0:51–0:58 결론
화면: 해설 펭귄이 카메라를 가리키며 윙크 → 뒤에서 투수가 또 1루 견제, 1루 주자 SPO 펭귄이 슬라이딩으로 세이프하고 씩 웃음, 더그아웃의 SPO 펭귄즈가 환호 → 엔딩 카드
내레이션: "결론! 견제도 막 던지면 보크! 투수판 밟았으면 발 먼저, 1루 3루는 진짜로. 발 뺐으면 뭐든 오케이!"
자막: 결론: 막 던지면 보크! / 밟았으면 발 먼저 · 1·3루는 진짜로 / 뺐으면 뭐든 OK
엔딩 카드: SPO 펭귄즈 + "팔로우 @SPOMOgrp · 헷갈리는 규칙은 댓글로!"

■ 규칙 정확성 체크 (화면과 대사가 이것과 어긋나면 다시 만들 것)
1. 견제와 관련된 보크는 주자가 있을 때만 성립한다. 보크가 선언되면 모든 주자가 한 베이스씩 진루한다.
2. 투수판을 밟은 채 견제할 때는 던질(또는 던지는 척할) 베이스 쪽으로 곧장 발을 내딛은 다음 던진다. 발을 내딛지 않고 던지면 보크.
3. 오른손 투수는 세트 자세에서 1루를 등지고 서므로, 몸을 돌려 1루 쪽으로 발을 내딛으며 던진다. 왼손 투수는 1루를 보고 서므로 다리를 든 뒤에도 1루로 견제할 수 있다. 단, 1루 쪽으로 곧장 내딛어야 하고, 든 발이 투수판 뒤쪽 끝을 넘어가면 타자에게 던져야 한다(2루 견제만 예외).
4. 투수판을 밟은 채 1루·3루로 던지는 척만 하면 보크. 2루는 2루에 주자가 있을 때 2루 쪽으로 발을 내딛으며 던지는 척해도 된다.
5. 투수판을 밟은 채 주자 없는 베이스로 던지거나 던지는 척하면 보크. 단, 플레이를 하려는 경우(예: 그 베이스로 뛰는 주자를 잡으려는 송구)는 예외.
6. 축발을 투수판 뒤로 빼면 내야수와 같아져서, 어느 베이스로든 던지거나 던지는 척해도 보크가 아니다. 세트 자세에서는 발을 먼저 빼고 나서 손을 푼다(투수판을 밟은 채 손을 풀면 보크).
7. 포수의 견제 송구에는 보크 규칙이 없다.
8. MLB는 2023년부터 한 타석에 투수판 이탈(견제·발 빼기)을 2번까지 허용하고, 3번째 이탈에서 아웃을 잡지 못하면 보크다(주자가 진루하면 횟수 초기화). KBO 리그(1군)는 2026 시즌 기준 횟수 제한이 없다.
9. 히든볼 트릭은 합법이다. 단, 공이 없는 투수가 투수판을 밟거나 걸쳐 서면(또는 투수판 밖에서 투구하는 척하면) 보크다. S7 ②는 실제 기록이다: 2025년 8월 MLB, 3회 1아웃 2·3루에서 3루수가 숨긴 공으로 3루 주자를 태그했지만, 구원투수가 공 없이 투수판에 서 있어 보크 → 3루 주자 득점, 2루 주자는 3루로. 실제 팀·선수 이름과 유니폼은 쓰지 않는다.
10. 'OK' 장면에서 심판은 투수를 가리키지 않는다(아웃·세이프 콜만 한다). '보크' 장면에서는 심판이 투수를 가리켜 보크를 선언한다.

■ 연출
- 첫 1초 안에 다리를 높이 든 왼손 투수와 제목이 함께 보이게. 컷은 1~3초 단위로 빠르게.
- 자막: 굵은 고딕(예: Pretendard ExtraBold), 흰 글자 + 검은 외곽선, 핵심 단어만 하늘색 강조. 한 화면 최대 2줄.
- 판정 도장: '보크'는 빨간 도장, 'OK'는 초록 도장. 보크 편과 같은 디자인으로 통일.
- 투수 표시: '오른손/왼손' 라벨과 투수판 아이콘('밟음/뺌')을 상황판 옆에 작게. 투수가 발을 빼는 순간 아이콘이 '밟음' → '뺌'으로 바뀌게.
- 1루 쪽 화살표, 투수판 뒤쪽 끝 빨간 선, 견제 카운터(①②③, ∞), 투수 강조용 빨간 원은 깔끔한 플랫 모션그래픽으로.
- 화면 위·아래 약 15~20%와 오른쪽 가장자리(좋아요·댓글 버튼 자리)에는 핵심 자막을 두지 말 것.
- 효과음: 견제 '휙', 포구 '퍽', 던지는 척 '슉', 보크 선언 '삐빅' 경고음, 태그 '탁', 슬라이딩 '촤악', 헉헉 숨소리, 정답 '딩동', 등장 '뿅', 실점 '와아'.
- BGM: 경쾌한 저작권 프리 음악, 내레이션보다 작게.
- 내레이션: 밝고 빠른 20대 목소리.

■ 금지
- 실제 구단·리그 로고와 유니폼, 실제 선수, 중계 화면, 응원가
- 영상 안에 AI로 그린 글자 (자막·표·그래픽 글자는 편집 텍스트 레이어로만)

■ 결과물
1. 완성 영상 (MP4, 9:16, 60초 이내)
2. 커버 이미지: 다리를 높이 든 채 1루를 노려보는 왼손 투수 펭귄 + 2루 쪽으로 몸이 쏠려 깜짝 놀란 1루 주자 펭귄 + 제목 "다리 들고 견제, 보크 아냐?!"
3. 업로드용 캡션과 해시태그
```

## 2. 컷별 영상 생성 프롬프트 (영어)

컷마다 **공통 블록을 앞에 붙여서** 넣으세요. 컷 길이는 편집에서 자르면 됩니다. S3 ③은 C1을 다시 씁니다.

**공통 블록**

```text
3D animated short with cute, chubby baby-penguin characters: soft clay-like texture, big glossy eyes, small yellow beaks, rounded shapes. Sunny daytime baseball stadium, green grass, brown dirt infield, a raised dirt pitcher's mound with a clearly visible white rectangular pitcher's rubber on top; whenever the pitcher is in frame, its feet and the rubber are clearly visible, so it is easy to see whether its back foot is on the rubber or off it. Bright, playful, smooth motion, vertical 9:16.
Characters: the SPO Penguins team (base runners, batter) wear plain sky-blue jerseys and navy helmets. The opposing team (pitcher, catcher, infielders) wear plain red jerseys and red caps, with a brown leather glove on one flipper; the catcher also has a black mask and chest protector. Umpire penguins wear black shirts and gray pants; the plate umpire wears a black mask. The host penguin wears a navy cap and a headset microphone. No humans.
Unless a shot says otherwise, the pitcher is right-handed: glove on its left flipper, throwing with its right flipper.
No text, letters, numbers, logos or watermarks anywhere in the frame.
```

**네거티브 프롬프트** (지원하는 도구만)

```text
text, letters, subtitles, numbers, watermark, logo, real team uniforms, human players, extra limbs, two balls, blurry, distorted faces, feet hidden behind the mound, glove on the wrong flipper
```

| 컷 | 씬 | 길이 | 내용 |
|---|---|---|---|
| C1 | S1 · S3 ③ | 4초 | 왼손 투수가 다리 들고 1루 견제 → 견제사 |
| C2 | S2 | 3초 | 해설 펭귄 등장 |
| C3 | S3 ② | 3초 | 오른손 투수: 휙 돌아 1루 견제 = OK |
| C4 | S3 ④ | 3초 | 왼손 투수: 든 발이 투수판 뒤로 넘어간 뒤 1루 견제 = 보크 |
| C5 | S4 ① | 3초 | 2루로 빙글 돌아 던지는 척 = OK |
| C6 | S4 ② | 3초 | 3루로 던지는 척 = 보크 |
| C7 | S4 ③ | 3초 | 주자 없는 1루로 송구 = 보크 |
| C8 | S5 ① | 3초 | 발 빼고 1루로 던지는 척 = OK |
| C9 | S5 ② | 3초 | 포수 견제 = OK |
| C10 | S6 ① | 4초 | (MLB) 세 번째 견제도 세이프 → 보크 |
| C11 | S6 ② | 3초 | (KBO 리그) 끝없는 견제, 지친 주자 |
| C12 | S7 ① | 4초 | 히든볼 트릭 성공 (투수는 투수판 밖) |
| C13 | S7 ② | 5초 | (2025 MLB) 투수가 투수판 위 → 보크 → 실점 |
| C14 | S8 | 4초 | 엔딩: 슬라이딩 세이프와 환호 |

**C1 — 왼손 투수, 다리 들고 1루 견제**
```text
Elevated wide shot from behind home plate: the mound in the center, first base on the right side of the frame, and the pitcher's feet and the white rubber clearly visible. A sky-blue runner penguin leads off first base. The red pitcher penguin is LEFT-handed: glove on its right flipper, ball in its left flipper. It stands in the set position with its back foot on the white rubber, its body and eyes facing first base. It lifts its front leg high — the raised knee and foot stay on the home-plate side of the rubber and never swing back behind it — and the runner leans toward second base, thinking it is a pitch. The pitcher then strides directly toward first base and throws to the red first-baseman penguin, who tags the runner as it dives back. The first-base umpire penguin punches out with a fist. At home plate the sky-blue batter penguin's jaw drops. SFX: whoosh, mitt pop, crowd "ooh".
```

**C2 — 해설 펭귄 등장**
```text
The baseball field in the background is softly out of focus, as if paused. The host penguin, holding a small blank whiteboard, pops up into the foreground from the bottom of the frame with a springy bounce, grins and shakes its head as if to say "nope, not a balk", then taps the whiteboard confidently. SFX: cartoon boing, bright ding.
```

**C3 — 오른손 투수, 휙 돌아 1루 견제 = OK**
```text
Elevated wide shot from behind home plate, first base on the right side of the frame. A sky-blue runner penguin leads off first base. The right-handed red pitcher penguin stands in the set position with its back foot on the white rubber, its body facing the third-base side and its back to first base. Suddenly it spins toward first base, plants its front foot in a step directly toward first base, and fires a throw to the red first-baseman penguin. The runner dives back to the bag just in time, and the first-base umpire penguin spreads both flippers wide: safe. SFX: quick spin whoosh, mitt pop.
```

**C4 — 든 발이 투수판 뒤로 넘어간 뒤 1루 견제 = 보크**
```text
Low side shot from the first-base side, close on the mound so the white rubber, its front and back edges, and the pitcher's feet are clearly visible. The LEFT-handed red pitcher penguin (glove on its right flipper, ball in its left flipper) stands with its back foot on the rubber, facing first base. It lifts its front leg and swings the raised foot backward, clearly past the back edge of the rubber toward second base — then, instead of pitching, it turns and throws to first base. A base umpire penguin immediately points a flipper straight at the pitcher. SFX: whoosh, sharp umpire shout.
```

**C5 — 2루로 빙글 돌아 던지는 척 = OK** (보크 편 C11과 같은 장면)
```text
Wide shot from behind home plate: a sky-blue runner penguin leads off second base while a red shortstop penguin creeps toward the bag. The red pitcher penguin, back foot still on the white rubber, spins around, steps directly toward second base and fakes a throw, keeping the ball. The runner hurries back to second base. The umpire penguins make no call. SFX: whoosh, calm crowd.
```

**C6 — 3루로 던지는 척 = 보크**
```text
Medium shot from the first-base side so the mound, the pitcher's feet and third base are all visible. A sky-blue runner penguin leads off third base. The right-handed red pitcher penguin keeps its back foot planted on the white rubber, steps toward third base and fakes a throw, but the ball stays in its glove. The runner scrambles back, and a base umpire penguin points a flipper straight at the pitcher. SFX: whoosh of a fake throw, sharp umpire shout.
```

**C7 — 주자 없는 1루로 송구 = 보크**
```text
Elevated wide shot from behind home plate. A sky-blue runner penguin leads off second base; there is no runner on first base, only the red first-baseman penguin standing next to the bag. The red pitcher penguin, back foot on the white rubber, steps toward first base and throws the ball there anyway. The first baseman catches it with a puzzled look, and a base umpire penguin points a flipper straight at the pitcher. SFX: mitt pop, sharp umpire shout, comic "huh?" sting.
```

**C8 — 발 빼고 1루로 던지는 척 = OK** (보크 편 C10과 같은 장면)
```text
Medium shot from behind the mound. A sky-blue runner penguin leads off first base. The red pitcher penguin, flippers together in the set position, first steps its back foot backward off the white rubber so it is clearly standing off the rubber, and only then separates its flippers, turns and fakes a throw to first base without releasing the ball. The runner flinches back to the bag. The umpire penguins stay perfectly still and make no call. SFX: light footstep, whoosh, calm crowd.
```

**C9 — 포수 견제 = OK**
```text
Low shot from behind the catcher. A sky-blue runner penguin takes a big lead off first base. The pitch pops into the red catcher penguin's mitt; the catcher instantly springs up and fires a throw down to first base. The runner dives back headfirst in a puff of dust just in time, and the first-base umpire penguin spreads both flippers wide: safe. SFX: mitt pop, snap throw whoosh, dust puff.
```

**C10 — (MLB) 세 번째 견제도 세이프 → 보크**
```text
Medium-wide shot showing the mound and first base. The red pitcher penguin, back foot on the white rubber, throws over to first base once more with a frustrated face, and the sky-blue runner penguin dives back safely. The first-base umpire penguin signals safe, then turns and points a flipper straight at the pitcher. The runner gets up, dusts itself off and trots happily to second base. SFX: mitt pop, sharp umpire shout, cheerful footsteps.
```

**C11 — (KBO 리그) 끝없는 견제**
```text
Comic shot from the first-base side: the red pitcher penguin, back foot on the white rubber, throws over to first base again and again, and every time the sky-blue runner penguin flops back onto the bag. With each dive the runner gets dustier and more exhausted, panting with its tongue out, while the red first-baseman penguin keeps tossing the ball back to the mound. SFX: repeated mitt pops, tired panting, crowd groan.
```

**C12 — 히든볼 트릭 성공**
```text
Medium shot of first base with the mound in the background. The red pitcher penguin stands on the grass in front of the mound, well away from the white rubber, pretending to rub up a ball inside its empty glove. The red first-baseman penguin quietly hides the ball in its own glove. The sky-blue runner penguin, thinking the pitcher has the ball, steps off first base to take a lead — the first baseman reaches out and tags it with the hidden ball. The first-base umpire penguin punches out, and the runner's eyes pop wide open. SFX: sneaky tiptoe music, soft tag, comic "gotcha" sting.
```

**C13 — (2025 MLB) 공 없는 투수가 투수판 위 → 보크 → 실점**
```text
Wide shot of the left side of the infield showing the mound, third base and home plate, with sky-blue runner penguins on second and third base. The red third-baseman penguin secretly keeps the ball in its glove and tags the runner on third as it steps off the bag. But the red relief pitcher penguin is standing on the white rubber with an empty glove, looking in as if ready to pitch. The third-base umpire penguin points a flipper straight at the pitcher. The runner on third trots home and stomps on home plate, the runner on second jogs to third, and the third baseman covers its face with its glove. SFX: soft tag, sharp umpire shout, crowd roar.
```

**C14 — 엔딩**
```text
Sunny wide shot: in the foreground the host penguin points at the camera and winks; behind it the red pitcher penguin throws over to first base once more, but the sky-blue runner penguin slides back safely with a big grin, and the sky-blue SPO Penguins team cheers from the dugout. Sparkling dust, warm golden light. SFX: crowd cheer, upbeat music swell.
```

**커버 이미지**
```text
Vertical 9:16 poster in the same 3D cute penguin style: a LEFT-handed red pitcher penguin on the mound (glove on its right flipper) with its front leg raised high, staring sideways at first base with a sly grin, while the sky-blue runner penguin at first base leans toward second base with a shocked face. Bright sunny stadium, dramatic low angle. Keep the top third clean and empty for a title. No text.
```

커버 제목은 편집에서 얹기: **다리 들고 견제, 보크 아냐?!** (작은 글씨: 견제 1분 정리)

## 3. 내레이션 대본 (TTS용)

TTS가 숫자와 영어 약자를 잘못 읽지 않도록 한글로 풀어 썼습니다. 예: 1루 → 일루, 2루 → 이루, 3루 → 삼루, KBO → 케이비오, TMI → 티엠아이.

```text
[S1 0:00] 다리까지 들었는데 일루로 휙! 이거 보크 아니야?
[S2 0:04] 보크 아님! 견제는 언제, 어떻게 던지느냐가 핵심이야. 바로 정리!
[S3 0:08] 투수판 밟고 견제할 땐 던질 베이스 쪽으로 발 먼저! 오른손 투수는 일루를 등지고 서서 휙 돌아서. 왼손 투수는 일루를 보고 서서 다리 들고도 오케이! 단, 든 발이 투수판 뒤로 넘어가면 타자한테 던져야 해.
[S4 0:20] 이루는 빙글 돌아서 던지는 척만 해도 오케이. 삼루는 척하면 보크, 진짜로 던져야 해! 주자 없는 베이스로 던져도 보크!
[S5 0:28] 투수판에서 발을 뒤로 빼면 그냥 내야수! 어디로 던지든, 척만 하든 오케이. 포수는 원래 자유! 공 받자마자 휙!
[S6 0:35] 몇 번까지 던져도 될까? 메이저리그는 한 타석 두 번까지! 세 번째에 못 잡으면 보크. 케이비오 리그는 아직 제한 없어.
[S7 0:42] 티엠아이! 공을 몰래 숨겼다가 태그하는 히든볼 트릭도 합법! 근데 실제로 메이저리그에서, 투수가 공 없이 투수판에 서 있다가 보크! 오히려 실점!
[S8 0:51] 결론! 견제도 막 던지면 보크! 투수판 밟았으면 발 먼저, 일루 삼루는 진짜로. 발 뺐으면 뭐든 오케이!
```

## 4. 업로드 캡션 · 해시태그

```text
다리까지 들고 1루로 휙! 이거 보크 아니에요? 🐧⚾
견제에도 '던져도 되는 방법'이 정해져 있어요.

✔ 투수판을 밟고 있으면 던질 베이스 쪽으로 발 먼저 (왼손 투수는 다리 들고도 1루 견제 OK)
✔ 1·3루는 진짜로 던져야 OK, 2루는 던지는 척도 OK, 주자 없는 베이스로 던지면 보크
✔ 투수판에서 발을 빼면 내야수 → 어디든 OK, 포수 견제도 OK
✔ MLB는 한 타석 견제·발 빼기 2번까지, KBO 리그는 제한 없음 (2026 시즌 기준)

직관 가기 전에 저장해 두고, 헷갈리는 야구 규칙은 댓글로 알려주세요 👇

#견제 #견제구 #견제사 #보크 #히든볼트릭 #야구규칙 #야구룰 #야구입문 #야구초보 #프로야구 #KBO #MLB #야구직관 #스포츠상식 #SPO펭귄즈 #SPOMO
```

## 5. 팩트체크 메모

조항 번호는 MLB 공식야구규칙(Official Baseball Rules) 기준입니다. KBO 리그도 같은 내용이지만, 올리기 전에 최신 KBO 규칙집으로 한 번 더 확인하면 좋습니다.

| 영상 속 설명 | 근거 |
|---|---|
| 견제와 관련된 보크는 주자가 있을 때만 성립하고, 보크가 선언되면 모든 주자가 한 베이스씩 진루한다 | 용어의 정의 'BALK', 6.02(a) 벌칙 |
| 투수판을 밟은 채 베이스로 송구하려면 먼저 그 베이스 쪽으로 곧장 발을 내딛어야 한다 | 6.02(a)(3) |
| 던지는 척할 때도 그 베이스 쪽으로 곧장 발을 내딛어야 한다 | MLB 심판 매뉴얼 |
| 오른손 투수는 세트 자세에서 1루를 등지고, 왼손 투수는 1루를 보고 선다 | 투구 자세 설명 (규칙 조항 아님) |
| 왼손 투수는 다리를 든 뒤에도 1루로 견제할 수 있다. 단, 든 발(자유발)이 투수판 뒤쪽 끝을 넘어가면 타자에게 던져야 한다(2루 견제만 예외) | 6.02(a)(1) 원주 |
| '1루 쪽으로 곧장'인지는 심판이 판단한다. 흔히 '45도 룰'이라고 부르지만 공식야구규칙에는 각도 숫자가 없고, 45도를 명시한 건 미국 고교야구(NFHS) 해석이다. 그래서 영상에서는 각도를 말하지 않았다 | 6.02(a)(3), NFHS 케이스북 |
| 투수판을 밟은 채 1루·3루로 던지는 척만 하면 보크. 3루는 MLB 2013년, KBO 2014년부터 | 6.02(a)(2) |
| 투수판을 밟은 채 2루로는 던지는 척해도 된다(2루 쪽으로 발을 내딛을 때) | 6.02(a)(2)는 1·3루만 해당 |
| 투수판을 밟은 채 주자 없는 베이스로 던지거나 던지는 척하면 보크. 단, 플레이를 하려는 경우(예: 그 베이스로 뛰는 주자를 잡으려는 송구)는 예외 | 6.02(a)(4) |
| 축발을 투수판 뒤로 빼면 내야수가 되어, 어느 베이스로든 던지거나 던지는 척해도 보크가 아니다 | 5.07(e). 6.02(a)(2)~(4)는 모두 '투수판을 밟은 채'일 때만 적용 |
| 세트 자세에서 손을 모은 뒤 투수판을 밟은 채 한 손을 공에서 떼면(투구·송구가 아닐 때) 보크. 그래서 C8은 발을 먼저 빼고 손을 푼다 | 6.02(a)(10) |
| 포수의 견제 송구에는 보크 규칙이 없다 | 6.02(a)는 투수의 반칙 행위만 정함 |
| MLB는 2023년부터 한 타석에 투수판 이탈(견제·발 빼기)을 2번까지 허용한다. 3번째 이탈에서 아웃을 잡지 못하면 보크 | MLB 2023 규칙 변경 (피치 타이머) |
| KBO 리그(1군)는 2026 시즌에 투수판 이탈 제한을 적용하지 않는다 | KBO 2026 규정·규칙 변화 |
| 히든볼 트릭은 합법. 단, 공이 없는 투수가 투수판을 밟거나 걸쳐 서면, 또는 투수판 밖에서 투구하는 척하면 보크 | 6.02(a)(9) |
| 2025년 8월 9일 샌디에이고 펫코파크, 보스턴–샌디에이고 3회 1사 2·3루. 샌디에이고 3루수 매니 마차도가 숨겨 둔 공으로 3루 주자 재런 듀랜을 태그했지만, 구원투수 완디 페랄타가 공 없이 투수판에 서 있어 3루심 스콧 배리가 보크를 선언했다. 듀랜이 득점해 보스턴이 2-1로 앞섰고, 2루 주자 트레버 스토리는 3루로 가서 뒤이은 땅볼 때 득점했다. 경기는 샌디에이고가 연장 10회 5-4로 이겼다 | 당시 보도 (참고 자료) |

- MLB 투수판 이탈 제한은 주자가 진루하면 횟수가 초기화됩니다. 마운드 방문, 부상 타임, 공격팀 타임은 횟수에 들어가지 않습니다.
- KBO 퓨처스리그는 2026 시즌에도 기존 규정을 유지합니다. 견제, 견제구 던지는 시늉, 주자 있을 때 발 빼기를 이탈로 세어 3번까지 허용하고, 4번째부터 보크입니다(그 이탈로 아웃이나 진루가 나오면 보크 없음). 주자가 진루하면 횟수가 초기화됩니다. KBO는 2025년에 1군에는 제한을 두지 않기로 하면서, 다양한 전략 활용과 자연스러운 경기 흐름을 이유로 들었습니다(MLB 2번, CPBL 3번).
- 2026년 10월 KBO 이사회 관련 보도에 따르면, 1군 투수판 이탈 제한 신설이 승부치기 도입·피치클락 조정 등과 함께 2027~2029년 추진 과제로 거론됐습니다. 아직 확정된 내용은 아닙니다. 올리기 전에 KBO 발표를 확인하고, 제한이 생기면 S6의 KBO 부분만 고치세요. 예: 내레이션 "케이비오도 ○번까지!", 자막 "KBO 리그: ○번까지 (20○○~)".
- 2루 견제에서 투수는 어느 쪽으로 돌아도 됩니다. 규칙은 도는 방향을 정하지 않고, 2루 쪽으로 곧장 발을 내딛는 것만 요구합니다.
- 히든볼 트릭은 볼 인플레이 중에만 성립합니다. 타임이 걸린 동안 공 없이 투수판에 서는 건 보크가 아닙니다.

**S7에 바꿔 넣을 수 있는 TMI**

- 1·3루에서 투수판을 밟은 채 3루로 던지는 척하다가 1루로 던지는 '3루 페이크 1루 견제'는 예전엔 합법이었습니다. MLB 2013년, KBO 2014년부터 3루로 던지는 척이 보크가 되면서 사라졌습니다.
- 견제 악송구: 투수판을 밟은 채 던진 견제구가 관중석이나 더그아웃으로 들어가면 모든 주자가 한 베이스(5.06(b)(4)(H))를 갑니다. 발을 확실히 뺀 뒤 던졌다면 내야수의 송구로 보아 두 베이스(5.07(e), 5.06(b)(4)(G))입니다.
- 은닉구(히든볼 트릭)에 당한 한국 선수도 있습니다. 2006년 4월 2일 일본 프로야구에서 요미우리 이승엽이 요코하마 1루수에게 은닉구로 태그아웃됐습니다(OSEN 칼럼).

**참고 자료**

- [Balk — Wikipedia](https://en.wikipedia.org/wiki/Balk)
- [Hidden ball trick — Wikipedia](https://en.wikipedia.org/wiki/Hidden_ball_trick)
- [6.02 Pitcher Illegal Action — Baseball Rules Academy](https://baseballrulesacademy.com/?p=17922)
- [Stepping to a Base (MLB Umpire Manual) — Baseball Rules Academy](https://baseballrulesacademy.com/official-rule/mlb-umpire-manual/stepping-to-a-base/)
- [Left Handed Pick Off at 1st — Baseball Rules Academy](https://baseballrulesacademy.com/?p=45441)
- [Rules Reference: Pitching — Umpire Bible](https://umpirebible.com/ruleRefs/ref_pitching.htm)
- [Breaking down Julio Urias' filthy pickoff move — CBS Sports (2016)](https://www.cbssports.com/mlb/news/mlb-playoffs-2016-breaking-down-julio-urias-filthy-pickoff-move-before-nlcs-game-4)
- [Rule change turns trick pickoff move into balk — CBS Detroit (2013)](https://www.cbsnews.com/detroit/news/rule-change-turns-trick-pickoff-move-into-balk)
- [올해부터 머리 맞히면 즉시 퇴장…3루 가짜 견제 금지 — 스포츠경향 (2014)](https://sports.khan.co.kr/article/201401031005163)
- [All of your questions about the new baseball rules, answered — MLB.com (2023)](https://www.mlb.com/news/mlb-new-rules-for-2023-faq)
- [Balk (BK) & Disengagement Violation — MLB.com Glossary](https://www.mlb.com/glossary/rules/balk)
- [2026 규정∙규칙 변화 — KBO](https://www.koreabaseball.com/Kbo/League/GameManage2026.aspx)
- [2025 규정∙규칙 변화 — KBO](https://www.koreabaseball.com/Kbo/League/GameManage2025.aspx)
- [스트라이크존, 내년엔 1㎝ 아래로…피치클록은 ML과 차별화, 견제 제한 없다 — 스포츠경향 (2024)](https://sports.khan.co.kr/article/202412041831003)
- 2026년 10월 KBO 이사회 보도: [MK스포츠](https://www.mksports.co.kr/news/sports/12171736), [마이데일리](https://www.mydaily.co.kr/page/view/2026100815264767795), [서플](https://supple.kr/news/cmuz6km1d008kzmtjqauz0ux1), [엑스포츠뉴스](https://www.xportsnews.com/article/2205770)
- 2025년 마차도 히든볼 트릭 보도: [ESPN](https://www.espn.com/mlb/story/_/id/45935722/manny-machado-failed-hidden-ball-trick-costs-padres-one-run), [CBS Sports](https://www.cbssports.com/mlb/news/watch-manny-machados-failed-hidden-ball-trick-costs-padres-a-run-in-win-over-red-sox)
- [이승엽이 겪은 추한 일본야구, 황당 사건 — OSEN (2007)](https://osen.co.kr/article/C0709100001)
