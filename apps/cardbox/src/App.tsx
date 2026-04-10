import { BrowserRouter, Routes, Route } from "react-router"
import { DefaultLayout } from "./layouts/default-layout"
import BoardPage from "./pages/board"

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<BoardPage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default App
