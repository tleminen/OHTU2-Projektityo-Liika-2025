/* eslint-disable react/prop-types */
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../index.css";
import { useDispatch } from "react-redux";
import { changeLocation } from "../../store/locationSlice";
import logo from "../../assets/liika_logo.png";
import { useNavigate } from "react-router-dom";
import eventService from "../../services/eventService";

const Map = ({ startingLocation }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const fetchEvents = async () => {
    const events = await eventService.getEvents(startingLocation);
    console.log(events); // TODO: HAE SOPIVALTA ALUEELTA TAPAHTUMAT VAI MITEN KANNATTAISI TEHDÄ??
  };

  useEffect(() => {
    // Luo karttaelementti kun komponentti mounttaa
    const map = L.map("map", {
      center: [startingLocation.o_lat, startingLocation.o_lng], // Joensuun koordinaatit
      zoom: startingLocation.zoom,
    });

    // Lisää karttalaatta OpenStreetMapista
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const createEvent = L.control({ position: "topleft" });
    createEvent.onAdd = () => {
      const buttonDiv = L.DomUtil.create("div", "button-wrapper");

      buttonDiv.innerHTML = `<button>Lisää tapahtuma</button>`;
      buttonDiv.addEventListener("click", () => onClickCreateEvent());
      return buttonDiv;
    };
    createEvent.addTo(map);

    const listJoinedEvents = L.control({ position: "topleft" });
    listJoinedEvents.onAdd = () => {
      const buttonDiv = L.DomUtil.create("div", "button-wrapper");

      buttonDiv.innerHTML = `<button>Liityttyjen lista</button>`;
      buttonDiv.addEventListener("click", () => onClickListJoinedEvents());
      return buttonDiv;
    };
    listJoinedEvents.addTo(map);

    const ownInfo = L.control({ position: "topleft" });
    ownInfo.onAdd = () => {
      const buttonDiv = L.DomUtil.create("div", "button-wrapper");

      buttonDiv.innerHTML = `<button>Omat tiedot</button>`;
      buttonDiv.addEventListener("click", () => onClickOwnInfo());
      return buttonDiv;
    };
    ownInfo.addTo(map);

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
