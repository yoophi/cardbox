import { BrowserRouter, Routes, Route } from "react-router"
import { DefaultLayout } from "./layouts/default-layout"
import BoardPage from "./pages/board"
import CardDetailPage from "./pages/card-detail"

function App() {
  return (
    <BrowserRouter>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<BoardPage />} />
          <Route path="/cards/:cardId" element={<CardDetailPage />} />
        </Routes>
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default App
