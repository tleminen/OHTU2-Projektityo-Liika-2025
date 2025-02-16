import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../index.css"

// eslint-disable-next-line react/prop-types
const LocationMap = ({ onLocationChange }) => {
  useEffect(() => {
    console.log("map useEffect")

    // Luo karttaelementti kun komponentti mounttaa
    const map = L.map("map", {
      center: [62.6013, 29.7639], // Joensuun koordinaatit
      zoom: 10,
    })

    // Lisää OpenStreetMap-laatta
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Luo marker, joka asetetaan kartan keskelle
    const centerMarker = L.marker(map.getCenter(), {
      icon: L.icon({
        iconUrl: "/items.png", // Varmista, että kuva löytyy public-kansiosta
        iconSize: [64, 64],
        iconAnchor: [16, 32],
      }),
    }).addTo(map)

    // Päivittää markerin sijainnin aina, kun karttaa siirretään

    map.on("click", (e) => {
      const { lat, lng } = e.latlng // Sijainti, johon kartalle on klikattu
      centerMarker.setLatLng([lat, lng]) // Asetetaan marker klikatulle paikalle
      onLocationChange({ lat, lng }) // Päivitetään sijainti vanhemman komponentin tilassa
    })

    return () => {
      map.off("move")
      map.remove()
    }
  }, [])

  return (
    <div
      id="map"
      className="map"
      style={{ minHeight: "40vh", flex: "1" }}
    ></div>
  )
}

export default LocationMap
