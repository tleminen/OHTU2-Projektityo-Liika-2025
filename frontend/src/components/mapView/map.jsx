/* eslint-disable react/prop-types */
import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../../index.css"
import { useDispatch } from "react-redux"
import { changeLocation } from "../../store/locationSlice"
import logo from "../../assets/liika_logo.png"
import { useNavigate } from "react-router-dom"

const Map = ({ startingLocation }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    // Luo karttaelementti kun komponentti mounttaa
    const map = L.map("map", {
      center: [startingLocation.o_lat, startingLocation.o_lng], // Joensuun koordinaatit
      zoom: startingLocation.zoom,
    })

    // Lisää karttalaatta OpenStreetMapista
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    map.on("moveend", () => {
      // Tallennetaan kartan nykyinen keskikohta reduxin storeen
      const newCenter = map.getCenter() // Kartan keskikohta
      const zoomLevel = map.getZoom() // Kartan zoom-level
      dispatch(
        changeLocation({
          o_lat: startingLocation.o_lat,
          o_lng: startingLocation.o_lng,
          lat: newCenter.lat,
          lng: newCenter.lng,
          zoom: zoomLevel,
        })
      )
    })

    return () => {
      // Tuhoaa karttaelementin kun komponentti unmounttaa
      map.remove()
    }
  }, [])

  return (
    <div className="map">
      <div id="map" className="map"></div>
      <div id="overlay">
        <img
          src={logo}
          alt="Logo"
          width={100}
          height={100}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  )
}

export default Map
