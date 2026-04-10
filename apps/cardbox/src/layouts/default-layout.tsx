import type { ReactNode } from "react"
import { Settings } from "lucide-react"
import { Button } from "@cardbox/ui/components/ui/button"
import { Separator } from "@cardbox/ui/components/ui/separator"

export function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex h-12 items-center justify-between px-4">
        <span className="text-base font-semibold tracking-tight">Cardbox</span>
        <Button variant="ghost" size="icon">
          <Settings className="size-4" />
          <span className="sr-only">설정</span>
        </Button>
      </header>
      <Separator />
      <main className="flex-1">{children}</main>
    </div>
  )
}
