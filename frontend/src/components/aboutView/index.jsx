import { Link } from "react-router-dom";
import Header from "../header";
import Info from "./info";
import Footer from "../footer";
import { useSelector } from "react-redux";
import translations from "../../assets/translation";

const AboutView = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];

  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/alternativebackgroundpicture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <Info />
      <div className="about-details" style={{ textAlign: "center", margin: "20px" }}>
        <p>
          {t.about_us_text}
          {t.about_us_text2}
        </p>
        <h3>Yhteystiedot</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>Olli Hilke - h.illo@hotmail.com</li>
          <li>Tomi Leminen - tomppa600@gmail.com</li>
          <li>Elmeri Saurus - elmerisaurus25@gmail.com</li>
          <li>Annakaisa Turunen - turunenannakaisa@gmail.com</li>
          <li>Annukka Mäkinen - annuma@uef.fi</li>
          <li>Paulus Ollikainen - paulus.ollikainen@gmail.com</li>
        </ul>
      </div>
      <Link to={'/'} className="back-btn" style={{ alignSelf: "center" }}>
        <span>{t.back}</span>
      </Link>
      <Footer />
    </div>
  )
}
export default AboutView;
