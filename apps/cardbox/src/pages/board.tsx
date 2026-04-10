import { useState, useRef, useEffect, useCallback } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd"
import { GripVertical } from "lucide-react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@cardbox/ui/components/ui/card"

interface KanbanCard {
  id: string
  title: string
  description?: string
}

interface Swimlane {
  id: string
  title: string
  cards: KanbanCard[]
}

const initialSwimlanes: Swimlane[] = [
  {
    id: "box1",
    title: "박스1",
    cards: [
      { id: "1", title: "Zettelkasten 원리 정리", description: "루만의 메모 방법론 핵심 요약" },
      { id: "2", title: "React 상태 관리 패턴", description: "Context vs Zustand 비교" },
      { id: "3", title: "pnpm workspace 설정 방법" },
      { id: "10", title: "Atomic Design 패턴", description: "컴포넌트 설계 방법론" },
      { id: "11", title: "CSS Container Query", description: "반응형 컴포넌트 구현" },
      { id: "12", title: "Web Component 표준" },
      { id: "13", title: "모노레포 빌드 캐싱", description: "Turborepo vs Nx 비교 분석" },
      { id: "14", title: "ESLint Flat Config 전환", description: "eslintrc에서 flat config로 마이그레이션" },
      { id: "15", title: "Vitest 설정 가이드" },
      { id: "16", title: "React Server Components", description: "RSC 동작 원리와 제약사항" },
      { id: "17", title: "번들 사이즈 최적화", description: "트리셰이킹과 코드 스플리팅 전략" },
      { id: "18", title: "Git Worktree 활용법" },
      { id: "25", title: "SWR vs React Query", description: "데이터 페칭 라이브러리 비교" },
      { id: "26", title: "WASM 기초", description: "WebAssembly 동작 원리" },
      { id: "27", title: "i18n 전략", description: "다국어 지원 아키텍처 설계" },
      { id: "28", title: "Storybook 컴포넌트 문서화" },
      { id: "29", title: "React Compiler", description: "자동 메모이제이션의 미래" },
      { id: "30", title: "Edge Runtime 이해하기" },
    ],
  },
  {
    id: "box2",
    title: "박스2",
    cards: [
      { id: "4", title: "Tailwind v4 마이그레이션", description: "v3에서 v4로 전환 시 주의점" },
      { id: "5", title: "TypeScript 6.0 변경사항" },
    ],
  },
  {
    id: "box3",
    title: "박스3",
    cards: [
      { id: "6", title: "shadcn/ui 모노레포 구성", description: "packages/ui 공유 패턴" },
      { id: "7", title: "Vite 빌드 최적화", description: "청크 분리 및 트리셰이킹" },
      { id: "8", title: "개인 지식 관리 워크플로우" },
      { id: "9", title: "Graph DB vs 관계형 DB", description: "지식 그래프에 적합한 저장소 비교" },
      { id: "19", title: "OAuth 2.0 플로우 정리", description: "Authorization Code Grant 중심" },
      { id: "20", title: "WebSocket vs SSE", description: "실시간 통신 방식 비교" },
      { id: "21", title: "Docker 멀티스테이지 빌드" },
      { id: "22", title: "Playwright E2E 테스트", description: "크로스 브라우저 자동화 테스트 구성" },
      { id: "23", title: "Zustand 미들웨어 패턴", description: "persist, devtools, immer 조합" },
      { id: "24", title: "DNS 동작 원리", description: "재귀 질의와 반복 질의의 차이" },
    ],
  },
]

function ScrollFade({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)

  const update = useCallback(() => {
    const el = targetRef.current
    if (!el) return
    setShowTop(el.scrollTop > 8)
    setShowBottom(el.scrollHeight - el.scrollTop - el.clientHeight > 8)
  }, [targetRef])

  useEffect(() => {
    const el = targetRef.current
    if (!el) return
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [targetRef, update])

  return (
    <>
      {showTop && (
        <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-6 rounded-t-lg bg-gradient-to-b from-background to-transparent" />
      )}
      {showBottom && (
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-6 rounded-b-lg bg-gradient-to-t from-background to-transparent" />
      )}
    </>
  )
}

function LaneDroppable({ lane }: { lane: Swimlane }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <Droppable droppableId={lane.id}>
      {(provided, snapshot) => (
        <div className="relative min-h-0 flex-1">
          <ScrollFade targetRef={scrollRef} />
          <div
            ref={(el) => {
              provided.innerRef(el)
              ;(scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = el
            }}
            {...provided.droppableProps}
            className={`scrollbar-thin flex h-full flex-col gap-2 overflow-y-auto rounded-lg p-1 transition-colors ${snapshot.isDraggingOver ? "bg-muted/60" : ""}`}
          >
            {lane.cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={provided.draggableProps.style}
                  >
                    <Card
                      size="sm"
                      className={`border border-border shadow-sm transition-shadow ${snapshot.isDragging ? "shadow-lg ring-2 ring-primary/30" : "hover:shadow-md"}`}
                    >
                      <CardHeader>
                        <div className="flex items-start gap-2">
                          <span
                            {...provided.dragHandleProps}
                            className="mt-0.5 shrink-0 cursor-grab text-muted-foreground/50 hover:text-muted-foreground active:cursor-grabbing"
                          >
                            <GripVertical className="size-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <CardTitle>{card.title}</CardTitle>
                            {card.description && (
                              <CardDescription>{card.description}</CardDescription>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default function BoardPage() {
  const [swimlanes, setSwimlanes] = useState<Swimlane[]>(initialSwimlanes)

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const next = swimlanes.map((lane) => ({ ...lane, cards: [...lane.cards] }))
    const srcLane = next.find((l) => l.id === source.droppableId)!
    const dstLane = next.find((l) => l.id === destination.droppableId)!
    const [moved] = srcLane.cards.splice(source.index, 1)
    dstLane.cards.splice(destination.index, 0, moved)
    setSwimlanes(next)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto p-4">
        {swimlanes.map((lane) => (
          <div
            key={lane.id}
            className="flex w-72 shrink-0 flex-col min-h-0"
          >
            <div className="flex items-center justify-between px-1 pb-3">
              <h2 className="text-sm font-semibold">{lane.title}</h2>
              <span className="text-xs text-muted-foreground">
                {lane.cards.length}
              </span>
            </div>
            <LaneDroppable lane={lane} />
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
