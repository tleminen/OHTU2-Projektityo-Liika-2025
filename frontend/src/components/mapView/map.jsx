/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../../index.css"
import { useDispatch } from "react-redux"
import { changeLocation } from "../../store/locationSlice"
import logo from "../../assets/liika_logo.png"
import { useNavigate } from "react-router-dom"
import eventService from "../../services/eventService"
import { createRoot } from "react-dom/client"

const Map = ({ startingLocation }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [timeStamp, setTimeStamp] = useState("") // Aikaleima, milloin päivitetty
  var layer = []
  const refreshRef = useRef(null)

  useEffect(() => {
    if (refreshRef.current) {
      refreshRef.current.render(
        <div className="refresh-stamp">
          <p>{timeStamp}</p>
        </div>
      )
    }
  }, [timeStamp])

  // Funktio, joka hakee tapahtumat ja lisää markerit layerGroupeihin kategorioittain
  const refreshMarkers = async (map) => {
    const center = map.getCenter()
    setTimeStamp(new Date().toLocaleTimeString().replaceAll(".", ":")) // Asetetaan milloin haettu viimeksi
    const bounds = map.getBounds() // Haetaan radiuksen laskemista varten rajat
    const northWest = bounds.getNorthWest()
    const southEast = bounds.getSouthEast()
    const width = northWest.distanceTo([northWest.lat, southEast.lng])
    const height = northWest.distanceTo([southEast.lat, northWest.lng])

    try {
      const eventList = await eventService.getEvents({
        latitude: center.lat,
        longitude: center.lng,
        radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
      })

      // Poistetaan kaikki vanhat layerGroupit kartalta
      layer.forEach((layer) => {
        map.removeLayer(layer)
      })
      // Tyhjennetään layerGroupjen tila
      layer = []

      // Lisätään markerit uudelleen
      eventList.forEach((tapahtuma) => {
        const { coordinates } = tapahtuma.Event_Location
        const lat = coordinates[1]
        const lng = coordinates[0]
        const marker = L.marker([lat, lng]).bindPopup(
          `<strong>${tapahtuma.Title}</strong><br>${
            tapahtuma.Description || ""
          }`
        )
        const categoryID = tapahtuma.CategoryID
        let layerG
        // Jos kyseistä kategorian layerGroupia ei vielä ole, luodaan se
        if (!layer[categoryID]) {
          layerG = L.layerGroup().addTo(map)
          // Päivitetään tila, mutta huomaa, että tämä on asynkronista
          layer[categoryID] = layerG
        } else {
          layerG = layer[categoryID]
        }
        layerG.addLayer(marker)
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onClickRefresh = async (map) => {
    await refreshMarkers(map)
  }

  const onClickCreateEvent = () => {
    navigate("/create_event")
  }

  const onClickListJoinedEvents = () => {
    console.log("Listaa liitytyt click")
  }

  const onClickOwnInfo = () => {
    console.log("Omat tiedot click")
    navigate("/own_info")
  }

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

    const pikapainikkeet = L.control({ position: "topleft" })
    pikapainikkeet.onAdd = () => {
      const container = L.DomUtil.create("div")
      const root = createRoot(container)
      root.render(
        <div className="pikapainikkeet">
          <button onClick={() => onClickCreateEvent()}>+_+</button>
          <button onClick={() => onClickListJoinedEvents()}>\- _-\</button>
          <button onClick={() => onClickOwnInfo()}>i-i</button>
        </div>
      )
      return container
    }
    pikapainikkeet.addTo(map)

    const refreshEvents = L.control({ position: "topright" })
    refreshEvents.onAdd = () => {
      const container = L.DomUtil.create("div")
      const root = createRoot(container)
      root.render(
        <div className="refresh-events">
          <button onClick={() => onClickRefresh(map)}>*Päivitä*</button>
        </div>
      )
      return container
    }
    refreshEvents.addTo(map)

    const refreshStamp = L.control({ position: "topright" })
    refreshStamp.onAdd = () => {
      const container = L.DomUtil.create("div")
      refreshRef.current = createRoot(container)
      refreshRef.current.render(
        <div className="refresh-events">
          <p>{timeStamp}</p>
        </div>
      )
      return container
    }
    refreshStamp.addTo(map)

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
