/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet.markercluster"
import "leaflet/dist/leaflet.css"
import "../../index.css"
import { useDispatch, useSelector } from "react-redux"
import { changeLocation } from "../../store/locationSlice"
import logo from "../../assets/liika_logo169.png"
import { useNavigate } from "react-router-dom"
import eventService from "../../services/eventService"
import { createRoot } from "react-dom/client"
import { selectIcon } from "../../assets/icons"
import { categories } from "./utils"
import ShortcutButtons from "./shortcutButtons"

const DEFAULT_DAYS = 31

const Map = ({ startingLocation }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [timeStamp, setTimeStamp] = useState("") // Aikaleima, milloin päivitetty
  const [isCategoryPanelOpen, setCategoryPanelOpen] = useState(false)
  const timestampRef = useRef(null)
  const markerClusterGroup = L.markerClusterGroup()
  const user = useSelector((state) => state.user?.user?.username ?? null)
  var first = true

  useEffect(() => {
    if (timestampRef.current) {
      timestampRef.current.render(
        <div className="refresh-stamp">
          <p>{timeStamp}</p>
        </div>
      )
    }
  }, [timeStamp])

  // Käsittele paneelin näkyvyys
  const toggleCategoryPanel = () => {
    setCategoryPanelOpen(!isCategoryPanelOpen)
  }

  // Kategorioiden suodatus (poisto)
  const removeCategoryMarkers = (categoryId) => {
    const category = categories[categoryId]
    if (category && category.markers.length > 0) {
      category.markers.forEach((marker) => {
        markerClusterGroup.removeLayer(marker)
      })
    }
  }

  // Kategorioiden suodatus (lisäys)
  const addCategoryMarkers = (categoryId) => {
    const category = categories[categoryId]
    if (category && category.markers.length > 0) {
      category.markers.forEach((marker) => {
        markerClusterGroup.addLayer(marker)
      })
    }
  }

  // Kategorian näkyvyyden käsittely
  const toggleCategory = (selectedCategories) => {
    let catSelected = []

    Object.entries(selectedCategories).forEach(([categoryId, isSelected]) => {
      // Käydään läpi paneelin valinnat
      // categoryId on kategoria-ID (esim. 1, 2, 3)
      // isSelected on Boolean-arvo (true tai false)
      if (isSelected) {
        // Käsitellään vain valittuja kategorioita
        console.log(`Kategoria ${categoryId} on valittu!`)
        catSelected.push(Number(categoryId))
      }
    })

    if (catSelected.length === 0) {
      showAllCategories(true)
    } else {
      showAllCategories(false)
      showCategories(catSelected)
    }
  }

  // Tämä funktio näyttää tai piilottaa kaikki kategoriat ja lisää tai poistaa niiden markkerit parametrin show mukaan
  const showAllCategories = (show) => {
    Object.keys(categories).forEach((categoryId) => {
      categories[categoryId].visible = show
      if (show) {
        addCategoryMarkers(categoryId) // Lisätään markkerit, jos show === true
      } else {
        removeCategoryMarkers(categoryId) // Poistetaan markkerit, jos show === false
      }
    })
  }

  // Tämä funktio näyttää vain valitut kategoriat ja lisää niiden markkerit
  const showCategories = (selectedCategories) => {
    selectedCategories.forEach((categoryId) => {
      categories[categoryId].visible = true
      addCategoryMarkers(categoryId) // Lisätään markkerit valituille kategorioille
    })
  }

  const showUsername = (username) => {
    if (username.includes("@")) {
      return ""
    } else {
      return username
    }
  }

  // Funktio, joka hakee tapahtumat ja lisää markerit layerGroupeihin kategorioittain
  const refreshMarkers = async (map, time) => {
    const center = map.getCenter()
    setTimeStamp(new Date().toLocaleTimeString().replaceAll(".", ":")) // Asetetaan milloin haettu viimeksi
    const bounds = map.getBounds() // Haetaan radiuksen laskemista varten rajat
    const northWest = bounds.getNorthWest()
    const southEast = bounds.getSouthEast()
    const width = northWest.distanceTo([northWest.lat, southEast.lng])
    const height = northWest.distanceTo([southEast.lat, northWest.lng])
    try {
      let startDay = new Date()
      let today = startDay.toISOString().split("T")[0] // Tämä himmeli tuottaa päivämäärän muotoa: YYYY-MM-DD
      let endDay = new Date(startDay)
      endDay.setDate(endDay.getDate() + DEFAULT_DAYS) // Asetettu komponentin alussa
      let endDate = endDay.toISOString().split("T")[0]
      let eventList
      if (!time || time.quickTime === -1) {
        // Haetaan normaali haku, refresh-nappulasta esimerkiksi. //TODO: Tallenna filtteri Reduksiin
        console.log("Haetaan default")
        eventList = await eventService.getEvents({
          latitude: center.lat,
          longitude: center.lng,
          radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
          startTime: "00:00",
          endTime: "23:59",
          startDate: today,
          endDate: endDate,
        })
      } else {
        switch (
          time.quickTime // Haetaan ajan mukaan filtteröidyt tapahtumat
        ) {
          case 1:
            {
              if (time.dates[1]) {
                // Päivämääräväli
                startDay = new Date(time.dates[0]).toISOString().split("T")[0] // Tämä himmeli tuottaa päivämäärän muotoa: YYYY-MM-DD
                endDay = new Date(time.dates[1]).toISOString().split("T")[0]
              } else if (time.dates[0]) {
                // Yksi päivä
                startDay = new Date(time.dates[0]).toISOString().split("T")[0]
                endDay = new Date(time.dates[0]).toISOString().split("T")[0]
              }
              let starts = time.startTime
              let ends = time.endTime
              if (starts === "") {
                // Asetellaan tapahtumalle kellonaikaväli
                starts = "00:00"
              }
              if (ends === "") {
                ends = "23:59"
              }
              console.log("refreshMarkers: " + JSON.stringify(time))
              eventList = await eventService.getEvents({
                latitude: center.lat,
                longitude: center.lng,
                radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
                startTime: starts,
                endTime: ends,
                startDate: startDay,
                endDate: endDay,
              })
            }
            break

          case 2:
            {
              endDay = new Date(startDay)
              endDay.setHours(endDay.getHours() + 3) // Haetaan nyt -> +3 h

              eventList = await eventService.getEventsQuick({
                latitude: center.lat,
                longitude: center.lng,
                radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
                startTimeDate: startDay,
                endTimeDate: endDay,
              })
            }
            break
          case 3:
            {
              endDay = new Date(startDay)
              endDay.setHours(endDay.getHours() + 24) // Haetaan nyt -> +24 h

              eventList = await eventService.getEventsQuick({
                latitude: center.lat,
                longitude: center.lng,
                radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
                startTimeDate: startDay,
                endTimeDate: endDay,
              })
            }
            break
          case 4:
            {
              endDay = new Date(startDay)
              endDay.setDate(endDay.getDate() + 7) // Haetaan nyt -> +7 päivää
              eventList = await eventService.getEventsQuick({
                latitude: center.lat,
                longitude: center.lng,
                radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
                startTimeDate: startDay,
                endTimeDate: endDay,
              })
            }
            break
          case 5:
            {
              endDay = new Date(startDay)
              endDay.setDate(endDay.getDate() + 31) // Haetaan nyt -> +31 päivää
              eventList = await eventService.getEventsQuick({
                latitude: center.lat,
                longitude: center.lng,
                radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
                startTimeDate: startDay,
                endTimeDate: endDay,
              })
            }
            break
        }
      }

      // Tyhjentää kaikki categoryGroupit ja poistaa ne kartalta
      markerClusterGroup.clearLayers()
      // Poistetaan ne myös categoriesLayereistä
      Object.keys(categories).forEach((categoryId) => {
        categories[categoryId].markers = []
      })
      // Lisätään markerit uudelleen
      eventList.forEach((tapahtuma) => {
        const { coordinates } = tapahtuma.Event_Location
        const lat = coordinates[1]
        const lng = coordinates[0]
        const marker = L.marker([lat, lng]).bindPopup(() => {
          const container = document.createElement("div")
          container.innerHTML = `
    <h1>${tapahtuma.Title} ${tapahtuma.JoinedCount}</h1>
    ${tapahtuma.Description || ""}<br/>
    <em>${showUsername(tapahtuma.Username)}</em> <br/>
    <a href="/events/${
      tapahtuma.EventID
    }" style="color: blue; text-decoration: underline;">
      Siirry tapahtumaan
    </a>
  `
          return container
        })
        const categoryID = tapahtuma.CategoryID

        marker.setIcon(selectIcon(categoryID))
        // Lisää marker oikeaan kategoriaan
        if (categories[categoryID]) {
          categories[categoryID].markers.push(marker)
          // Lisää markerClusterGroupiin vain, jos kategoria on asetettu näkyväksi
          if (categories[categoryID].visible) {
            markerClusterGroup.addLayer(marker)
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const onClickRefresh = async (map, time) => {
    await refreshMarkers(map, time)
  }

  const onClickCreateEvent = () => {
    navigate("/create_event")
  }

  const onClickListJoinedEvents = () => {
    navigate("/joined_events")
  }

  const onClickOwnInfo = () => {
    navigate("/own_info")
  }

  const onClickCreatedEvents = () => {
    navigate("/created_events")
  }

  useEffect(() => {
    // Luo karttaelementti kun komponentti mounttaa
    // Tarkastetaan ensin, että kartalla on aloitussijainti:
    if (!startingLocation.o_lat) {
      console.log("Ei aloituskordinaatteja..\nAsetetaan defaultit")
      ;(startingLocation.o_lat = 62.6013), (startingLocation.o_lng = 29.7639)
      startingLocation.zoom = 12
    }

    // Lisää karttalaatta OpenStreetMapista
    var osm = L.tileLayer(
      "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    )

    const map = L.map("map", {
      center: [startingLocation.o_lat, startingLocation.o_lng],
      zoom: startingLocation.zoom,
      layers: [osm],
    })

    const fetchEvents = (time) => {
      if (!time) {
        console.log("Virhe!")
      } else {
        if (time.quickTime) {
          onClickRefresh(map, time)
        } else {
          console.log("Virhe!" + JSON.stringify(time))
        }
      }
    }

    const mapFilterOverlay = L.control({ position: "bottomleft" })
    mapFilterOverlay.onAdd = () => {
      const container = L.DomUtil.create("div")
      const root = createRoot(container)
      root.render(
        <div className="blur-overlay">
          <p></p>
        </div>
      )
      return container
    }
    mapFilterOverlay.addTo(map)

    const pikapainikkeet = L.control({ position: "topleft" })

    pikapainikkeet.onAdd = () => {
      const container = L.DomUtil.create("div")
      L.DomEvent.disableClickPropagation(container)
      const root = createRoot(container)
      root.render(
        <div className="pikapainikkeet">
          <button
            className="pika-painike"
            onClick={() => onClickCreateEvent()}
            style={{
              backgroundImage: "url(/addeventCropped.png)", // Suora polku publicista
            }}
          ></button>
          {user && (
            <button
              className="pika-painike"
              onClick={() => onClickListJoinedEvents()}
              style={{
                backgroundImage: "url(/joinedeventsCropped.png)", // Suora polku publicista
              }}
            ></button>
          )}
          {user && (
            <button
              className="pika-painike"
              onClick={() => onClickCreatedEvents()}
              style={{
                backgroundImage: "url(/listedowneventsCropped.png)", // Suora polku publicista
              }}
            ></button>
          )}
          {user && (
            <button
              className="pika-painike"
              onClick={() => onClickOwnInfo()}
              style={{
                backgroundImage: "url(/personalinfoCropped.png)", // Suora polku publicista
              }}
            ></button>
          )}
        </div>
      )
      return container
    }
    pikapainikkeet.addTo(map)

    const shortcutbuttons = L.control({ position: "topleft" })
    shortcutbuttons.onAdd = () => {
      const container = L.DomUtil.create("div")
      L.DomEvent.disableClickPropagation(container)
      const root = createRoot(container)
      root.render(
        <ShortcutButtons
          isOpen={isCategoryPanelOpen}
          toggleCategory={toggleCategory}
          toggleCategoryPanel={toggleCategoryPanel}
          fetchEvents={fetchEvents}
          onClose={() => setCategoryPanelOpen(false)}
        />
      )
      return container
    }
    shortcutbuttons.addTo(map)

    const refreshEvents = L.control({ position: "topright" })
    refreshEvents.onAdd = () => {
      const container = L.DomUtil.create("div")
      L.DomEvent.disableClickPropagation(container)
      const root = createRoot(container)
      root.render(
        <div className="refresh-events">
          <button
            className="pika-painike"
            onClick={() => onClickRefresh(map, null)}
            style={{
              backgroundImage: "url(/refreshCropped.png)", // Suora polku publicista
            }}
          ></button>
        </div>
      )
      return container
    }
    refreshEvents.addTo(map)

    const refreshStamp = L.control({ position: "topright" })
    refreshStamp.onAdd = () => {
      const container = L.DomUtil.create("div")
      timestampRef.current = createRoot(container)
      timestampRef.current.render(
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

    map.addLayer(markerClusterGroup)
    if (first) {
      onClickRefresh(map)
      first = false
    }
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
          width={120}
          height={100}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  )
}

export default Map
