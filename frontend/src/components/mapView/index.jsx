import { useDispatch, useSelector } from "react-redux"
import Map from "./map"
import "./mapView.css"
import eventService from "../../services/eventService"
import { changeCategories } from "../../store/categoriesSlice"
import { setEvents } from "../../store/eventSlice"

const MapView = () => {
  const startingLocation = useSelector((state) => state.location.location) // haetaan kartan aloituskohta
  const userID = useSelector((state) => state.user?.user?.userID ?? null)
  const dispatch = useDispatch()
  const categories = useSelector(
    (state) => state.categories?.categories ?? null
  )
  const event = useSelector((state) => state.event?.events ?? null)

  const loadData = async () => {
    try {
      if (!categories || categories.length() < 1) {
        const categories = await eventService.getCategories()
        dispatch(changeCategories(categories))
      }
    } catch (error) {
      console.log(error)
    }
    if (userID) {
      if (!event || event.length() < 1) {
        // Edelleen hakee liikaa jos käyttäjä ei ole liittynyt mihinkään
        const events = await eventService.getJoined({ UserID: userID })
        dispatch(setEvents(events))
      }
    }
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
