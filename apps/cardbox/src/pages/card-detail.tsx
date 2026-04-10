import { useParams, useNavigate } from "react-router"
import { ArrowLeft } from "lucide-react"
import { Button } from "@cardbox/ui/components/ui/button"
import { Badge } from "@cardbox/ui/components/ui/badge"
import { Separator } from "@cardbox/ui/components/ui/separator"
import { initialSwimlanes, findCard, findLaneForCard } from "../data/sample-cards"

export default function CardDetailPage() {
  const { cardId } = useParams()
  const navigate = useNavigate()
  const card = cardId ? findCard(initialSwimlanes, cardId) : undefined
  const lane = cardId ? findLaneForCard(initialSwimlanes, cardId) : undefined

  if (!card) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">카드를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-4">
        <Button variant="ghost" size="icon-sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="size-4" />
        </Button>
        <div className="flex flex-1 items-center gap-3">
          <h1 className="text-lg font-semibold">{card.title}</h1>
          {lane && <Badge variant="secondary">{lane.title}</Badge>}
        </div>
      </div>
      <Separator />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="mx-auto max-w-2xl">
          {card.description && (
            <p className="mb-4 text-muted-foreground">{card.description}</p>
          )}
          {card.content && (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">
              {card.content}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
