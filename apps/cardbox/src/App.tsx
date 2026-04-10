import { useState } from 'react'
import { Button } from '@cardbox/ui/components/ui/button'
import { DefaultLayout } from './layouts/default-layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center gap-4 py-20">
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
    </DefaultLayout>
  )
}

export default App
