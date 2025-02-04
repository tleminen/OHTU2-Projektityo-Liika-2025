import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../../App.css"

const Map = () => {
  
  useEffect(() => {
    
    /*
    const mapContainer = document.createElement("div")
    mapContainer.id = "map"
    mapContainer.style.height = "400px"
    mapContainer.style.width = "100%"
    document.body.appendChild(mapContainer)
    */
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
      // Tuhoa karttaelementti kun komponentti unmounttaa
      map.remove()
    }
  }, [])
  return <div id="map"></div>
}

export default Map
