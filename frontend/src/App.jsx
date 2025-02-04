import { Route, Routes } from "react-router-dom"
import Frontpage from "./components/frontpageVIew/frontpage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
    </Routes>
  )
}

export default App
