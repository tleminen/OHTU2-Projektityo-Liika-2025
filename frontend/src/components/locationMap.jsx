import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../index.css"
import { useSelector } from "react-redux"

// eslint-disable-next-line react/prop-types
const LocationMap = ({ onLocationChange, oldLocation }) => {
  var startingLocation = useSelector((state) => state.location.location)
  if (oldLocation) {
    startingLocation = {
      lat: oldLocation[1],
      lng: oldLocation[0],
      zoom: 14,
    }
  }
  useEffect(() => {
    // Luo karttaelementti kun komponentti mounttaa
    const map = L.map("map", {
      center: [startingLocation.lat, startingLocation.lng],
      zoom: startingLocation.zoom,
    })
    // Tarkastetaan ensin, että kartalla on aloitussijainti:
    if (!startingLocation.o_lat) {
      console.log("Ei aloituskordinaatteja..\nAsetetaan defaultit")
      ;(startingLocation.o_lat = 62.6013), (startingLocation.o_lng = 29.7639)
      startingLocation.zoom = 14
    }
    // Asetetaan nämä aluksi, jos käyttäjä unohtaakin klikata karttaa
    onLocationChange({
      lat: startingLocation.lat,
      lng: startingLocation.lng,
      zoom: startingLocation.zoom,
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
        iconAnchor: [32, 62],
      }),
    }).addTo(map)

    // Päivittää markerin sijainnin aina, kun karttaa siirretään

    map.on("click", (e) => {
      const { lat, lng } = e.latlng // Sijainti, johon kartalle on klikattu
      const zoom = map.getZoom()
      centerMarker.setLatLng([lat, lng]) // Asetetaan marker klikatulle paikalle
      onLocationChange({ lat, lng, zoom }) // Päivitetään sijainti vanhemman komponentin tilassa
    })

    return () => {
      map.off("move")
      map.remove()
    }
  }, [])

  return (
    <div
      id="map"
      className="map-location-setter"
      style={{ minHeight: "40vh", flex: "1" }}
    ></div>
  )
}

export default LocationMap
