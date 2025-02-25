/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { changeLocation } from "../../store/locationSlice";
import logo from "../../assets/liika_logo.png";
import { useNavigate } from "react-router-dom";
import eventService from "../../services/eventService";
import { createRoot } from "react-dom/client";
import { selectIcon } from "../../assets/icons";
import { categoryGroups } from "./categoryGroups";

const Map = ({ startingLocation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timeStamp, setTimeStamp] = useState(""); // Aikaleima, milloin päivitetty
  const timestampRef = useRef(null);
  const markerClusterGroup = L.markerClusterGroup();
  const user = useSelector((state) => state.user?.user?.username ?? null);

  useEffect(() => {
    if (timestampRef.current) {
      timestampRef.current.render(
        <div className="refresh-stamp">
          <p>{timeStamp}</p>
        </div>
      );
    }
  }, [timeStamp]);

  // Funktio, joka hakee tapahtumat ja lisää markerit layerGroupeihin kategorioittain
  const refreshMarkers = async (map) => {
    const center = map.getCenter();
    setTimeStamp(new Date().toLocaleTimeString().replaceAll(".", ":")); // Asetetaan milloin haettu viimeksi
    const bounds = map.getBounds(); // Haetaan radiuksen laskemista varten rajat
    const northWest = bounds.getNorthWest();
    const southEast = bounds.getSouthEast();
    const width = northWest.distanceTo([northWest.lat, southEast.lng]);
    const height = northWest.distanceTo([southEast.lat, northWest.lng]);

    try {
      const eventList = await eventService.getEvents({
        latitude: center.lat,
        longitude: center.lng,
        radius: Math.max(Math.max(width, height) / 2, 10000), // Haetaan kartallinen tapahtumia, kuitenkin vähintään 10km
      });

      // Tyhjentää kaikki categoryGroupit ja poistaa ne kartalta
      markerClusterGroup.clearLayers();
      // Lisätään markerit uudelleen
      eventList.forEach((tapahtuma) => {
        console.log(tapahtuma.EventID);
        const { coordinates } = tapahtuma.Event_Location;
        const lat = coordinates[1];
        const lng = coordinates[0];
        const marker = L.marker([lat, lng]).bindPopup(() => {
          const container = document.createElement("div");
          container.innerHTML = `
    <strong>${tapahtuma.Title}</strong><br>
    ${tapahtuma.Description || ""}<br>
    <a href="/events/${
      tapahtuma.EventID
    }" style="color: blue; text-decoration: underline;">
      Siirry tapahtumaan
    </a>
  `;
          return container;
        });
        const categoryID = tapahtuma.CategoryID;

        marker.setIcon(selectIcon(categoryID));
        if (categoryGroups[categoryID]) {
          categoryGroups[categoryID].push(marker); // Lisätään markkeri oman categorian ryhmäänsä
        }
        markerClusterGroup.addLayer(marker);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickRefresh = async (map) => {
    await refreshMarkers(map);
  };

  const onClickCreateEvent = () => {
    navigate("/create_event");
  };

  const onClickListJoinedEvents = () => {
    console.log("Listaa liitytyt click");
  };

  const onClickOwnInfo = () => {
    console.log("Omat tiedot click");
    navigate("/own_info");
  };

  useEffect(() => {
    // Luo karttaelementti kun komponentti mounttaa
    // Tarkastetaan ensin, että kartalla on aloitussijainti:
    if (!startingLocation.o_lat) {
      console.log("Ei aloituskordinaatteja..\nAsetetaan defaultit");
      (startingLocation.o_lat = 62.6013), (startingLocation.o_lng = 29.7639);
      startingLocation.zoom = 12;
    }
    const map = L.map("map", {
      center: [startingLocation.o_lat, startingLocation.o_lng],
      zoom: startingLocation.zoom,
    });

    // Lisää karttalaatta OpenStreetMapista
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const pikapainikkeet = L.control({ position: "topleft" });
    pikapainikkeet.onAdd = () => {
      const container = L.DomUtil.create("div");
      L.DomEvent.disableClickPropagation(container);
      const root = createRoot(container);
      root.render(
        <div className="pikapainikkeet">
          <button
            onClick={() => onClickCreateEvent()}
            style={{
              backgroundImage: "url(/addIcon.png)", // Suora polku publicista
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "40px",
              height: "40px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          ></button>
          {user && (
            <button
              onClick={() => onClickListJoinedEvents()}
              style={{
                backgroundImage: "url(/listedEventsIcon.png)", // Suora polku publicista
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "40px",
                height: "40px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            ></button>
          )}
          {user && (
            <button
              onClick={() => onClickOwnInfo()}
              style={{
                backgroundImage: "url(/personalInfoIcon.png)", // Suora polku publicista
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "40px",
                height: "40px",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
              }}
            ></button>
          )}
        </div>
      );
      return container;
    };
    pikapainikkeet.addTo(map);

    const refreshEvents = L.control({ position: "topright" });
    refreshEvents.onAdd = () => {
      const container = L.DomUtil.create("div");
      L.DomEvent.disableClickPropagation(container);
      const root = createRoot(container);
      root.render(
        <div className="refresh-events">
          <button
            onClick={() => onClickRefresh(map)}
            style={{
              backgroundImage: "url(/refreshIcon.png)", // Suora polku publicista
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "40px",
              height: "40px",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          ></button>
        </div>
      );
      return container;
    };
    refreshEvents.addTo(map);

    const refreshStamp = L.control({ position: "topright" });
    refreshStamp.onAdd = () => {
      const container = L.DomUtil.create("div");
      timestampRef.current = createRoot(container);
      timestampRef.current.render(
        <div className="refresh-events">
          <p>{timeStamp}</p>
        </div>
      );
      return container;
    };
    refreshStamp.addTo(map);

    map.on("moveend", () => {
      // Tallennetaan kartan nykyinen keskikohta reduxin storeen
      const newCenter = map.getCenter(); // Kartan keskikohta
      const zoomLevel = map.getZoom(); // Kartan zoom-level
      dispatch(
        changeLocation({
          o_lat: startingLocation.o_lat,
          o_lng: startingLocation.o_lng,
          lat: newCenter.lat,
          lng: newCenter.lng,
          zoom: zoomLevel,
        })
      );
    });

    map.addLayer(markerClusterGroup);

    return () => {
      // Tuhoaa karttaelementin kun komponentti unmounttaa
      map.remove();
    };
  }, []);

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
  );
};

export default Map;
