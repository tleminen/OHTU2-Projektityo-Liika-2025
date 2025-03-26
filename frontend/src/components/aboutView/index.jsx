import { Link } from "react-router-dom"
import Header from "../header"
import Footer from "../footer"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import "./about.css"

const AboutView = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

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
      <div className='about-container'>
        <div className="about-text-box">
          <h1>Liika</h1>
          <p style={{ marginTop: "20px" }}>
            {t.about_us_text}<br />
            {t.about_us_text_2}
          </p>
          <h1 style={{ marginTop: "20px" }}>Yhteystiedot</h1>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }} >
            <li>Olli Hilke - h.illo@hotmail.com</li>
            <li>Tomi Leminen - tomppa600@gmail.com</li>
            <li>Elmeri Saurus - elmerisaurus25@gmail.com</li>
            <li>Annakaisa Turunen - turunenannakaisa@gmail.com</li>
            <li>Annukka Mäkinen - annuma@uef.fi</li>
            <li>Paulus Ollikainen - paulus.ollikainen@gmail.com</li>
          </ul>
        </div>
      </div>
      <Link to={'/'} className="back-btn" style={{ alignSelf: "center" }}>
        <span>{t.back}</span>
      </Link>
      <Footer />
    </div>
  )
}

export default AboutView