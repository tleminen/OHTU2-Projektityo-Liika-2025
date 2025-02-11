import Header from "../header";
import mapImage from "../../assets/map_kuvituskuva.png";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import translations from "../../assets/translation";
const Frontpage = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(`/${path}`);
  };
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <img
        src={mapImage}
        className="map-image"
        alt="Map"
        onClick={() => navigateTo("map")}
      />
      <div className="containerX">
        <button onClick={() => navigateTo("login")}>{t.login}</button>
        <button onClick={() => navigateTo("register")}>{t.register}</button>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Frontpage;
