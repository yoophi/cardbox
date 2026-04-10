import { useNavigate } from "react-router"
import { Maximize2 } from "lucide-react"
import { Button } from "@cardbox/ui/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@cardbox/ui/components/ui/dialog"
import { Badge } from "@cardbox/ui/components/ui/badge"
import type { KanbanCard } from "../data/sample-cards"

interface CardDetailDialogProps {
  card: KanbanCard | null
  laneName?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CardDetailDialog({ card, laneName, open, onOpenChange }: CardDetailDialogProps) {
  const navigate = useNavigate()

  if (!card) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[400px] w-[560px] max-w-[calc(100%-2rem)] flex-col sm:max-w-[560px]">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 pr-6">
            <div className="flex flex-col gap-2">
              <DialogTitle>{card.title}</DialogTitle>
              {card.description && (
                <DialogDescription>{card.description}</DialogDescription>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {laneName && <Badge variant="secondary">{laneName}</Badge>}
          </div>
        </DialogHeader>
        {card.content && (
          <div className="flex-1 overflow-y-auto whitespace-pre-wrap text-sm text-foreground/80 leading-relaxed">
            {card.content}
          </div>
        )}
        <div className="flex shrink-0 justify-end pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              onOpenChange(false)
              navigate(`/cards/${card.id}`)
            }}
          >
            <Maximize2 className="size-3.5" />
            전체 화면
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
