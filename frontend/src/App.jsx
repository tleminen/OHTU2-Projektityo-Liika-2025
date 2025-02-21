import { Route, Routes } from "react-router-dom"
import Frontpage from "./components/frontpageVIew/frontpage"
import Register from "./components/registerView"
import Login from "./components/loginView"
import MapView from "./components/mapView"
import TermsOfServiceView from "./components/termsOfServiceView"
import InfoView from "./components/infoView"
import CreateEventView from "./components/createEventView"
import AccountInformationForm from "./components/accountInformationView/accountInformationForm"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { loadUserFromStorage } from "./store/userSlice"
import EventView from "./components/eventView"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUserFromStorage())
  }, [dispatch])
  return (
    <Routes>
      <Route path="/" element={<Frontpage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/termsOfService" element={<TermsOfServiceView />} />
      <Route path="/info" element={<InfoView />} />
      <Route path="/create_event" element={<CreateEventView />} />
      <Route path="/own_info" element={<AccountInformationForm />} />
      <Route path="/events/:id" element={<EventView />} />
    </Routes>
  )
}

export default App
