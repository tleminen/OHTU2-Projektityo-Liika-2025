import Header from "../header";
import mapImage from "../../assets/map_kuvituskuva.png";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import SignedOut from "./signedOut";
const Frontpage = () => {
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(`/${path}`);
  };

  return (
    <div>
      <Header />
      <div className="frontpage">
        <img
          src={mapImage}
          className="map-image"
          alt="Map"
          onClick={() => navigateTo("map")}
        />
        <SignedOut />
      </div>
      <Footer />
    </div>
  );
};

export default Frontpage;
