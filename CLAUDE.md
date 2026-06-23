# 아이봄 프로젝트

## 하네스: 아이봄

**목표:** 어린이집·유치원 탐색 모바일 웹앱 프로토타입(아이봄.html) 개발·검토·기획

**트리거:** 아이봄 관련 작업 요청 시 반드시 `ibom` 스킬을 사용하라. 단순 질문만 직접 응답 가능.

**필수 규칙:**
- 아이봄.html 수정, 기능 구현, 버그 수정 → `ibom` 스킬 경유 필수 (ibom-dev 직접 호출 금지)
- 디자인 검토, 코드 리뷰 → `ibom` 스킬 경유 필수 (ibom-design-bridge 선행 필수)
- QA 테스트 → `ibom` 스킬 경유 필수 (ibom-qa 직접 호출 금지)
- v1.1 기획 → `ibom` 스킬 경유 필수 (ibom-planner 직접 호출 금지)
- 복합 작업(구현+검토+QA) → ibom-lead가 팀 리더로 TeamCreate 사용
- **코드 빌드와 시각화 검수를 항상 병행한다** — ibom-dev + ibom-qa 동시 실행

---

## MD 파일 구조 (마스터 → 하위)

이 파일(CLAUDE.md)이 마스터다. 새 세션 또는 아이봄 작업 시작 시 아래 순서대로 읽는다.

```
CLAUDE.md  ← 지금 이 파일 (마스터, 세션 시작 시 자동 로드)
│
├── 1순위  아이봄_디자인문서.md         ← 디자인 토큰·컴포넌트·데이터 모델·가설 플로우
├── 2순위  HANDOFF.md                  ← 기술 결정사항·구현 현황·다음 작업 목록
├── 3순위  _workspace/session-note.md  ← 직전 세션 상태 (없으면 건너뜀)
│
└── 작업 시 에이전트가 참조
    ├── .claude/agents/ibom-lead.md         ← 팀 리더 (TeamCreate 담당)
    ├── .claude/agents/ibom-dev.md          ← 구현 담당
    ├── .claude/agents/ibom-qa.md           ← 브라우저 QA 담당
    ├── .claude/agents/ibom-reviewer.md     ← 코드·디자인 검토 담당
    ├── .claude/agents/ibom-design-bridge.md← 디자인문서 → 코딩 지침 변환 담당
    ├── .claude/agents/ibom-planner.md      ← v1.1 기획 담당
    └── .claude/skills/ibom/SKILL.md        ← 오케스트레이터 (작업 라우팅)
```

### 읽기 규칙

| 상황 | 읽을 파일 |
|------|---------|
| 새 세션 시작 | CLAUDE.md → 아이봄_디자인문서.md → HANDOFF.md → session-note.md |
| 구현·버그 수정 시작 | ibom-design-bridge가 아이봄_디자인문서.md 읽고 design-context.md 생성 |
| QA 시작 | ibom-qa가 ibom-qa.md 체크리스트 참조 |
| 디자인 검토 | ibom-reviewer가 ibom-design-bridge 거쳐 아이봄_디자인문서.md 참조 |

---

## 에이전트 목록

`.claude/agents/` — ibom-lead, ibom-design-bridge, ibom-dev, ibom-qa, ibom-reviewer, ibom-planner

**오케스트레이터:** `.claude/skills/ibom/SKILL.md`

---

# 아이봄 디자인 시스템

> 출처: Claude Design 프로토타입 `디자인0615 (오프라인).html`  
> Claude Code가 UI 작업 시 **반드시** 이 가이드를 따라야 합니다.

## 1. 컬러 시스템

### Primary
| 이름 | 값 | 용도 |
|---|---|---|
| `--blue` | `#0066FF` | 주요 버튼, 강조, 링크 |
| `--blue-weak` | `#EAF2FE` | 파랑 계열 배경·뱃지 |
| `--blue-line` | `#C9DEFE` | 파랑 계열 테두리 |

### 텍스트
| 이름 | 값 | 용도 |
|---|---|---|
| `--text` | `rgba(46,47,51,0.88)` | 본문, 제목 |
| `--text-alt` | `rgba(55,56,60,0.61)` | 보조 설명, 날짜 |
| `--text-assist` | `rgba(55,56,60,0.28)` | 플레이스홀더, 힌트 |

### 배경·선
| 이름 | 값 | 용도 |
|---|---|---|
| `--bg` | `#FFFFFF` | 카드, 모달 |
| `--bg-alt` | `#F7F7F8` | 보조 배경, 입력 필드 |
| `--bg-page` | `#eceae5` | 전체 페이지 배경 (크림/베이지) |
| `--line` | `rgba(112,115,124,0.22)` | 구분선 |
| `--line-soft` | `rgba(112,115,124,0.12)` | 연한 구분선 |

### 시맨틱 컬러
| 이름 | 값 | 배경 | 텍스트 |
|---|---|---|---|
| 초록 (승인/인증) | `#00BF40` | `#E5FBEC` | `#006E25` |
| 주황 (주의/대기) | `#FF9200` | `#FEF4E6` | `#9C5800` |
| 빨강 (오류/경고) | `#FF4242` | `#FEECEC` | `#B20C0C` |
| 보라 (배지/인증) | `#7A3DF5` | — | — |
| 별점 | `#FFB200` | — | — |

### 카테고리 컬러 (커뮤니티)
```
입소 Q&A  → #0066FF
생활 정보  → #00A36B
나눔·생활  → #FF9200
기타      → #5856D6
```

## 2. 타이포그래피

### 폰트
```css
font-family: "Pretendard Variable", "Pretendard", -apple-system,
             "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
```

### 폰트 크기 스케일
| 용도 | 크기 | 굵기 |
|---|---|---|
| 대형 제목 | `22~24px` | `800` |
| 중형 제목 | `18~20px` | `700~800` |
| 소형 제목 | `15.5~16px` | `700` |
| 본문 | `14~15px` | `400~500` |
| 보조 본문 | `13~13.5px` | `400~600` |
| 캡션/라벨 | `11~12px` | `600~700` |
| 뱃지/태그 | `10~11px` | `700~800` |

### 줄 간격
- 제목: `1.3~1.4`
- 본문: `1.55~1.65`
- 버튼: `1` (단행)

## 3. 간격 시스템

기본 단위: **4px 배수**

```
4px  — 아이콘·텍스트 사이 최소 간격
6px  — 태그·뱃지 내부 패딩
8px  — 소형 요소 간격
10px — 카드 내부 소형 gap
12px — 기본 gap, 카드 내부 패딩
14px — 리스트 아이템 gap
16px — 화면 좌우 여백 (page padding)
20px — 버튼 내부 좌우 패딩
24px — 섹션 내부 패딩
32px — 대형 섹션 좌우 여백
```

## 4. 보더 반경

```
4px        — 진행 바, 얇은 구분 요소
8px        — 소형 버튼, 인풋 보조
10~12px    — 기본 카드, 입력 필드
14~16px    — 주요 카드, 바텀시트 내부
24~28px    — 프로필 이미지, 큰 아이콘 컨테이너
1000px     — 알약형 태그, 뱃지, 둥근 버튼
```

## 5. 컴포넌트 규칙

### 버튼
```css
/* Primary (solid) */
background: #0066FF;  color: #fff;
border-radius: 12px;  padding: 15px 20px;
font-size: 16px;      font-weight: 700;

/* Light */
background: #EAF2FE;  color: #0066FF;

/* Assistive */
background: #F7F7F8;  color: rgba(46,47,51,0.88);
```

### 카드
```css
background: #fff;
border-radius: 14~16px;  padding: 14~16px;
/* 그림자 없음 — 구분선(border-bottom) 또는 배경색 차이로 구분 */
border-bottom: 1px solid rgba(112,115,124,0.12);
```

### 입력 필드
```css
border: 1.5px solid rgba(112,115,124,0.22);
border-radius: 12px;  padding: 14px 16px;
font-size: 15.5px;    font-weight: 600;
background: #fff;
```

### 태그 / 뱃지
```css
/* 카테고리 태그 */
font-size: 11px;  font-weight: 700;
padding: 2px 8px;  border-radius: 6px;

/* 알약형 뱃지 */
padding: 2px 9px;  border-radius: 1000px;
font-size: 10~11px;  font-weight: 700~800;
```

### 바텀 네비게이션
```css
position: fixed;  bottom: 0;
background: rgba(255,255,255,0.92);
backdrop-filter: blur(12px);
border-top: 1px solid rgba(112,115,124,0.12);
padding-bottom: env(safe-area-inset-bottom);
```

## 6. 애니메이션

**타이밍**: `cubic-bezier(.2,.8,.3,1)` (iOS 느낌, 부드럽고 빠른 감속)  
**전환 시간**: `0.2~0.3s`

## 7. 아이콘

- SVG 인라인 아이콘 사용, `currentColor`로 색상 제어
- 기본 사이즈: `22~24px` / 소형: `14~18px` / 탭바: `24~26px`

## 8. 금지 사항

```
✗ Bootstrap, Tailwind 등 외부 CSS 프레임워크 사용 금지
✗ 인라인 스타일 남발 금지 (클래스 기반 스타일 권장)
✗ 그림자(box-shadow) 과도한 사용 금지 — 구분선으로 대체
✗ #000 / #fff 직접 사용 금지 — 컬러 변수 사용
✗ 컬러 하드코딩 금지 — CSS 변수 사용
✗ 한 화면에 3가지 이상 폰트 굵기 혼용 금지
✗ border-radius를 픽셀 기준 없이 임의 사용 금지
```

---

## 변경 이력

| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-05-31 | 초기 구성 | 전체 | 아이봄 프로젝트 하네스 신규 구축 |
| 2026-06-06 | MD 구조화, 코드+시각화 병행 규칙 추가 | CLAUDE.md | 세션 시작 시 하위 MD 누락 없이 로드하도록 구조화 |
| 2026-06-06 | 디자인문서 v1.1 업데이트 | 아이봄_디자인문서.md | JSX 클로드 디자인 통합 (kit.jsx, flowA/B/C.jsx, data.jsx) |
| 2026-06-06 | QA 체크리스트 현행화 | ibom-qa.md | 250ms 타이밍, GPS 핀, 정렬 바텀시트, 리뷰 시트 반영 |
| 2026-06-23 | 디자인 시스템 전면 교체 | CLAUDE.md | 디자인0615 기반 종합 가이드 반영 (컬러·타이포·간격·컴포넌트 전체) |
