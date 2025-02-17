import { useSelector } from "react-redux"
import Map from "./map"
import "./mapView.css"

const MapView = () => {
  const startingLocation = useSelector((state) => state.location.location) // haetaan kartan aloituskohta

  return (
    <div className="map-container">
      <Map startingLocation={startingLocation} />
    </div>
  )
}

export default MapView
