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
import {
  initialSwimlanes,
  findLaneForCard,
  type Swimlane,
  type KanbanCard,
} from "../data/sample-cards"
import { CardDetailDialog } from "../components/card-detail-dialog"

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

function LaneDroppable({ lane, onCardClick }: { lane: Swimlane; onCardClick: (card: KanbanCard) => void }) {
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
                      className={`border border-border shadow-sm transition-shadow ${snapshot.isDragging ? "shadow-lg ring-2 ring-primary/30" : "cursor-pointer hover:shadow-md"}`}
                      onClick={() => { if (!snapshot.isDragging) onCardClick(card) }}
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
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null)

  const selectedLane = selectedCard
    ? findLaneForCard(swimlanes, selectedCard.id)
    : undefined

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
    <>
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
              <LaneDroppable lane={lane} onCardClick={setSelectedCard} />
            </div>
          ))}
        </div>
      </DragDropContext>

      <CardDetailDialog
        card={selectedCard}
        laneName={selectedLane?.title}
        open={!!selectedCard}
        onOpenChange={(open) => { if (!open) setSelectedCard(null) }}
      />
    </>
  )
}
