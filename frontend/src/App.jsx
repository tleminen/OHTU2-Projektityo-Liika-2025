import { Route, Routes } from "react-router-dom"
import Frontpage from "./components/frontpageVIew/frontpage"
import Login from "./components/loginView"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
