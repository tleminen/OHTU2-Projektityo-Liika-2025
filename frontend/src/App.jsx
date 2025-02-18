import { Route, Routes } from "react-router-dom"
import Frontpage from "./components/frontpageVIew/frontpage"
import Register from "./components/registerView"
import Login from "./components/loginView"
import MapView from "./components/mapView"
import TermsOfServiceView from "./components/termsOfServiceView"
import InfoView from "./components/infoView"
import CreateEventView from "./components/createEventView"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/termsOfService" element={<TermsOfServiceView />} />
      <Route path="/info" element={<InfoView />} />
      <Route path="/create_event" element={<CreateEventView />} />
    </Routes>
  )
}

export default App
