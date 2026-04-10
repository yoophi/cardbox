export interface KanbanCard {
  id: string
  title: string
  description?: string
  content?: string
}

export interface Swimlane {
  id: string
  title: string
  cards: KanbanCard[]
}

export const initialSwimlanes: Swimlane[] = [
  {
    id: "box1",
    title: "박스1",
    cards: [
      { id: "1", title: "Zettelkasten 원리 정리", description: "루만의 메모 방법론 핵심 요약", content: "니클라스 루만(Niklas Luhmann)은 약 90,000장의 카드를 사용하여 70권의 책과 400편 이상의 논문을 저술했다. 그의 제텔카스텐 시스템의 핵심 원리는 다음과 같다:\n\n1. 원자성(Atomicity): 하나의 카드에는 하나의 아이디어만 담는다\n2. 자율성(Autonomy): 각 카드는 독립적으로 이해 가능해야 한다\n3. 연결(Connectivity): 카드 간 링크를 통해 지식 네트워크를 형성한다\n4. 고유 ID: 각 카드에 고유 식별자를 부여하여 참조를 가능하게 한다" },
      { id: "2", title: "React 상태 관리 패턴", description: "Context vs Zustand 비교", content: "React 상태 관리 선택지:\n\n- Context API: 빌트인, 간단한 전역 상태에 적합. 리렌더링 최적화가 어려움\n- Zustand: 경량, 보일러플레이트 최소. selector 기반 리렌더링 최적화\n- Jotai: 원자적 상태 관리, bottom-up 접근\n- Redux Toolkit: 복잡한 상태 로직, 미들웨어 생태계" },
      { id: "3", title: "pnpm workspace 설정 방법", content: "pnpm-workspace.yaml 파일에 패키지 경로를 지정하고, workspace: 프로토콜로 내부 패키지를 참조한다." },
      { id: "10", title: "Atomic Design 패턴", description: "컴포넌트 설계 방법론", content: "Brad Frost의 Atomic Design은 UI를 5단계로 분류한다:\n\nAtoms → Molecules → Organisms → Templates → Pages" },
      { id: "11", title: "CSS Container Query", description: "반응형 컴포넌트 구현", content: "미디어 쿼리는 뷰포트 기준이지만, 컨테이너 쿼리는 부모 요소 크기 기준으로 스타일을 적용한다. @container 규칙 사용." },
      { id: "12", title: "Web Component 표준", content: "Custom Elements, Shadow DOM, HTML Templates의 세 가지 표준으로 구성된다." },
      { id: "13", title: "모노레포 빌드 캐싱", description: "Turborepo vs Nx 비교 분석", content: "Turborepo: 설정 간단, 원격 캐싱 지원. Nx: 더 많은 기능, 의존성 그래프 시각화, 영향 분석." },
      { id: "14", title: "ESLint Flat Config 전환", description: "eslintrc에서 flat config로 마이그레이션", content: "ESLint 9부터 flat config가 기본. eslint.config.js에서 배열로 설정을 export한다." },
      { id: "15", title: "Vitest 설정 가이드", content: "Vite 기반 테스트 러너. vite.config.ts의 설정을 공유하며, Jest 호환 API를 제공한다." },
      { id: "16", title: "React Server Components", description: "RSC 동작 원리와 제약사항", content: "서버에서 렌더링되어 직렬화된 형태로 클라이언트에 전달. useState/useEffect 사용 불가." },
      { id: "17", title: "번들 사이즈 최적화", description: "트리셰이킹과 코드 스플리팅 전략", content: "ESM 사용, side-effect-free 마킹, dynamic import로 코드 스플리팅, 번들 분석기 활용." },
      { id: "18", title: "Git Worktree 활용법", content: "git worktree add로 동일 저장소의 다른 브랜치를 별도 디렉토리에 체크아웃할 수 있다." },
      { id: "25", title: "SWR vs React Query", description: "데이터 페칭 라이브러리 비교", content: "SWR: stale-while-revalidate 전략, 가벼움. React Query: 더 풍부한 캐시 제어, mutation 지원, devtools." },
      { id: "26", title: "WASM 기초", description: "WebAssembly 동작 원리", content: "바이너리 포맷의 저수준 언어로, 브라우저에서 네이티브에 가까운 성능을 제공한다." },
      { id: "27", title: "i18n 전략", description: "다국어 지원 아키텍처 설계", content: "react-intl 또는 i18next를 사용. 번역 키 관리와 날짜/숫자 포맷팅이 핵심." },
      { id: "28", title: "Storybook 컴포넌트 문서화", content: "컴포넌트를 독립적으로 개발하고 문서화할 수 있는 UI 워크벤치." },
      { id: "29", title: "React Compiler", description: "자동 메모이제이션의 미래", content: "React Compiler가 useMemo, useCallback, React.memo를 자동으로 처리하여 수동 최적화 부담을 줄인다." },
      { id: "30", title: "Edge Runtime 이해하기", content: "CDN 엣지에서 실행되는 경량 런타임. Node.js API 일부만 사용 가능." },
    ],
  },
  {
    id: "box2",
    title: "박스2",
    cards: [
      { id: "4", title: "Tailwind v4 마이그레이션", description: "v3에서 v4로 전환 시 주의점", content: "Tailwind v4는 설정 파일 대신 CSS @theme 지시어를 사용. OKLCH 컬러, 네이티브 CSS 변수 기반." },
      { id: "5", title: "TypeScript 6.0 변경사항", content: "baseUrl deprecated, erasableSyntaxOnly 도입. ignoreDeprecations: '6.0'으로 마이그레이션 기간 확보 가능." },
    ],
  },
  {
    id: "box3",
    title: "박스3",
    cards: [
      { id: "6", title: "shadcn/ui 모노레포 구성", description: "packages/ui 공유 패턴", content: "packages/ui에 컴포넌트를 배치하고, workspace: 프로토콜로 앱에서 참조. @source CSS import로 Tailwind 클래스 스캔." },
      { id: "7", title: "Vite 빌드 최적화", description: "청크 분리 및 트리셰이킹", content: "manualChunks로 벤더 분리, rollupOptions으로 세밀한 청크 제어. 사전 번들링으로 개발 서버 속도 향상." },
      { id: "8", title: "개인 지식 관리 워크플로우", content: "수집 → 처리 → 연결 → 창조의 4단계 워크플로우. 제텔카스텐은 '연결' 단계에 특화되어 있다." },
      { id: "9", title: "Graph DB vs 관계형 DB", description: "지식 그래프에 적합한 저장소 비교", content: "관계형 DB: 정형 데이터, JOIN 기반. Graph DB(Neo4j 등): 관계 중심, 탐색 쿼리에 강점. 지식 그래프는 Graph DB가 자연스럽다." },
      { id: "19", title: "OAuth 2.0 플로우 정리", description: "Authorization Code Grant 중심", content: "Authorization Code Grant + PKCE가 현재 권장 플로우. Implicit Grant는 보안상 deprecated." },
      { id: "20", title: "WebSocket vs SSE", description: "실시간 통신 방식 비교", content: "WebSocket: 양방향, 바이너리 지원. SSE: 서버→클라이언트 단방향, HTTP 기반으로 인프라 친화적." },
      { id: "21", title: "Docker 멀티스테이지 빌드", content: "빌드 단계와 실행 단계를 분리하여 최종 이미지 크기를 줄이는 기법." },
      { id: "22", title: "Playwright E2E 테스트", description: "크로스 브라우저 자동화 테스트 구성", content: "Chromium, Firefox, WebKit을 하나의 API로 테스트. codegen으로 테스트 코드 자동 생성." },
      { id: "23", title: "Zustand 미들웨어 패턴", description: "persist, devtools, immer 조합", content: "create(devtools(persist(immer(...)))) 형태로 미들웨어를 조합하여 상태 관리를 강화한다." },
      { id: "24", title: "DNS 동작 원리", description: "재귀 질의와 반복 질의의 차이", content: "재귀 질의: 리졸버가 최종 답을 반환. 반복 질의: 클라이언트가 각 네임서버에 직접 질의." },
    ],
  },
]

export function findCard(swimlanes: Swimlane[], cardId: string): KanbanCard | undefined {
  for (const lane of swimlanes) {
    const card = lane.cards.find((c) => c.id === cardId)
    if (card) return card
  }
}

export function findLaneForCard(swimlanes: Swimlane[], cardId: string): Swimlane | undefined {
  return swimlanes.find((lane) => lane.cards.some((c) => c.id === cardId))
}
