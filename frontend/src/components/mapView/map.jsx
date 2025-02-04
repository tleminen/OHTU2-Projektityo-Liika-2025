import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../../index.css"
const Map = () => {
  useEffect(() => {
    const mapContainer = document.createElement("div")
    mapContainer.id = "map"
    document.body.appendChild(mapContainer)

    console.log(`map useEffect`)
    // Luo karttaelementti kun komponentti mounttaa
    const map = L.map("map", {
      center: [62.6013, 29.7639], // Joensuun koordinaatit
      zoom: 10,
    })

    // Lisää karttalaatta OpenStreetMapista
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    return () => {
      // Tuhoaa karttaelementin kun komponentti unmounttaa
      map.remove()
    }
  }, [])
}

export default Map
