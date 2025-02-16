import { useSelector } from "react-redux"
import Map from "./map"

const MapView = () => {
  const startingLocation = useSelector((state) => state.location.location) // haetaan kartan aloituskohta

  return (
    <div>
      <p>Testi</p>
      <Map startingLocation={startingLocation} />
    </div>
  )
}

export default MapView
