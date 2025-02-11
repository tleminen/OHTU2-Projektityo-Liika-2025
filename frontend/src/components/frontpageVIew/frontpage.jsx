import Header from "../header"
import mapImage from "../../assets/map_kuvituskuva.png"
import Footer from "../footer"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import SignedOut from "./singedOut"
import SignedIn from "./signedIn"
const Frontpage = () => {
  const [user, setUser] = useState(window.localStorage.getItem("loggedUser"))
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(`/${path}`)
  }

  useEffect(() => {
    const loggedUserSTRING = window.localStorage.getItem("loggedUser")
    if (loggedUserSTRING) {
      const user = JSON.parse(loggedUserSTRING)
      setUser(user)
    }
  }, [])

  const singedOrNot = () => {
    if (user === null) {
      return <SignedOut />
    } else {
      console.log("tää on: " + user.token)
      return <SignedIn setUser={setUser} />
    }
  }

  return (
    <div>
      <Header />
      <div className="frontpage">
        <img
          src={mapImage}
          className="map-image"
          alt="Map"
          onClick={() => navigateTo("map")}
        />
        <SignedOut />
      </div>
      <Footer />
    </div>
  )
}

export default Frontpage
