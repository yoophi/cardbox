import { useState } from 'react'
import { Button } from '@cardbox/ui/components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Cardbox</h1>
      <p className="text-muted-foreground">Zettelkasten knowledge management</p>
      <div className="flex gap-2">
        <Button onClick={() => setCount((c) => c + 1)}>
          Count is {count}
        </Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
    </div>
  )
}

export default App
