import Header from "../header";
import mapImage from "../../assets/map_kuvituskuva.png";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SignedOut from "./singedOut";
import SignedIn from "./signedIn";
import translations from "../../assets/translation";
const Frontpage = () => {
  const [user, setUser] = useState(window.localStorage.getItem("loggedUser"));
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(`/${path}`);
  };
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  useEffect(() => {
    const loggedUserSTRING = window.localStorage.getItem("loggedUser");
    if (loggedUserSTRING) {
      const user = JSON.parse(loggedUserSTRING);
      setUser(user);
    }
  }, []);

  const singedOrNot = () => {
    if (user === null) {
      return <SignedOut />;
    } else {
      return <SignedIn setUser={setUser} />;
    }
  };

  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/backgroundpicture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="frontpage">
        <div className="map-container">
          <div className="image-wrapper">
            <span
              href="/map"
              className="placeholder"
              onClick={() => navigate("/map")}
            >
              {t.start}
            </span>
            <img
              src={mapImage}
              className="map-image"
              alt="Map"
              onClick={() => navigateTo("map")}
            />
          </div>
          <div className="button-container">{singedOrNot(user)}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Frontpage;
