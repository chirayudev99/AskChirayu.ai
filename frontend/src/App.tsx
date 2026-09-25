import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Chat from "./pages/Chat"
import NotFound from "./pages/NotFound"


function App() {

  return (
  <main className="app-shell">
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
  </main>
  )
}

export default App
