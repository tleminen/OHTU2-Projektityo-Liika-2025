import { useDispatch, useSelector } from "react-redux"
import Map from "./map"
import "./mapView.css"
import eventService from "../../services/eventService"
import { changeCategories } from "../../store/categoriesSlice"

const MapView = () => {
  const startingLocation = useSelector((state) => state.location.location) // haetaan kartan aloituskohta
  const dispatch = useDispatch()

  const loadData = async () => {
    try {
      const categories = await eventService.getCategories()
      console.log(categories)
      dispatch(changeCategories(categories))
    } catch (error) {
      console.log(error)
    }
  }

  loadData()

  return (
    <div className="map-container">
      <Map startingLocation={startingLocation} />
    </div>
  )
}

export default MapView
