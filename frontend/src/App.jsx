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
import CreatedEvents from "./components/createdEventsView"
import ModifyEvent from "./components/modifyEventView"
import ChangeLanguage from "./components/accountView/changeInfo/changeLanguage"
import { changeLanguage } from "./store/languageSlice"

const App = () => {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App;
