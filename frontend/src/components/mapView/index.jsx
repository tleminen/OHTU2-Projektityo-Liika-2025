import { useDispatch, useSelector } from "react-redux"
import Map from "./map"
import "./mapView.css"
import eventService from "../../services/eventService"
import { changeCategories } from "../../store/categoriesSlice"
import { changeEvents } from "../../store/eventSlice"

const MapView = () => {
  const startingLocation = useSelector((state) => state.location.location) // haetaan kartan aloituskohta
  const userID = useSelector((state) => state.user.user.userID)
  const dispatch = useDispatch()

  const loadData = async () => {
    try {
      const categories = await eventService.getCategories()
      dispatch(changeCategories(categories))
    } catch (error) {
      console.log(error)
    }
    const events = await eventService.getJoined({ UserID: userID })
    dispatch(changeEvents(events))
  }

  loadData()

  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/background-logandreg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="map-container">
        <Map startingLocation={startingLocation} />
      </div>
    </div>
  )
}

export default MapView
