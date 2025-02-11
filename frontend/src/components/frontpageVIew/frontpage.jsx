import Header from "../header"
import mapImage from "../../assets/map_kuvituskuva.png"
import Footer from "../footer"
import { useNavigate } from "react-router-dom"
import SignedOut from "./signedOut"
const Frontpage = () => {
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(`/${path}`)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <img
        src={mapImage}
        alt="Map"
        width={100}
        height={100}
        onClick={() => navigateTo("map")}
      />
      <SignedOut />

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Frontpage
