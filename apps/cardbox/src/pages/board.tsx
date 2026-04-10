import { useState } from "react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd"
import { GripVertical } from "lucide-react"
import { ScrollArea } from "@cardbox/ui/components/ui/scroll-area"
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
    ],
  },
]

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
      <ScrollArea className="h-full">
        <div className="flex h-full gap-4 p-4">
          {swimlanes.map((lane) => (
            <Droppable key={lane.id} droppableId={lane.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex w-72 shrink-0 flex-col gap-3 rounded-lg p-2 transition-colors ${snapshot.isDraggingOver ? "bg-muted/60" : ""}`}
                >
                  <div className="flex items-center justify-between px-1">
                    <h2 className="text-sm font-semibold">{lane.title}</h2>
                    <span className="text-xs text-muted-foreground">
                      {lane.cards.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
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
          ))}
        </div>
      </ScrollArea>
    </DragDropContext>
  )
}
