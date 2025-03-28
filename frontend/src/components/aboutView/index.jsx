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
          <h1 style={{ marginTop: "20px" }}>{t.contact_info}</h1>
          <div style={{ marginTop: "20px" }} >
            <p style={{ marginBottom: "4px" }}>Olli Hilke - <a href="mailto:h.illo@hotmail.com">h.illo@hotmail.com</a></p>
            <p style={{ marginBottom: "4px" }}>Tomi Leminen - <a href="mailto:tomppa600@gmail.com">tomppa600@gmail.com</a></p>
            <p style={{ marginBottom: "4px" }}>Elmeri Saurus - <a href="mailto:elmerisaurus25@gmail.com">elmerisaurus25@gmail.com</a></p>
            <p style={{ marginBottom: "4px" }}>Annakaisa Turunen - <a href="mailto:turunenannakaisa@gmail.com">turunenannakaisa@gmail.com</a></p>
            <p style={{ marginBottom: "4px" }}>Annukka Mäkinen - <a href="mailto:annuma@uef.fi">annuma@uef.fi</a></p>
            <p style={{ marginBottom: "4px" }}>Paulus Ollikainen - <a href="mailto:paulus.ollikainen@gmail.com">paulus.ollikainen@gmail.com</a></p>
          </div>
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