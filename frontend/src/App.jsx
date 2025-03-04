import { Route, Routes } from "react-router-dom"
import Frontpage from "./components/frontpageVIew/frontpage"
import Register from "./components/registerView"
import Login from "./components/loginView"
import MapView from "./components/mapView"
import TermsOfServiceView from "./components/termsOfServiceView"
import InfoView from "./components/infoView"
import CreateEventView from "./components/createEventView"
import EventView from "./components/eventView"
import AccountView from "./components/accountView"
import ChangeEmail from "./components/accountView/changeInfo/changeEmail"
import ChangeUsername from "./components/accountView/changeInfo/changeUsername"
import JoinedView from "./components/joinedListView"
import ChangePassword from "./components/accountView/changeInfo/changePassword"

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
      <Route path="/own_info" element={<AccountView />} />
      <Route path="/events/:id" element={<EventView />} />
      <Route path="/own_info/email" element={<ChangeEmail />} />
      <Route path="/own_info/username" element={<ChangeUsername />} />
      <Route path="/joined_events" element={<JoinedView />} />
      <Route path="/own_info/password" element={<ChangePassword />} />
    </Routes>
  )
}

export default App
