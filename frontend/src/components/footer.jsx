import "../index.css"
import { useSelector } from "react-redux"
import translations from "../assets/translation.js"

const Footer = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="flag-selection">
          {/* Lippuvalintakomponentti tähän */}
          <Lippuvalinta />{" "}
          {/* Oletetaan, että komponentin nimi on Lippuvalinta */}
        </div>
        <div className="footer-text">
          <ul>{t.terms_of_service}</ul> {/* linkki käyttöehtoihin */}
        </div>
        <div className="info">
          {/* Infokomponentti tähän */}
          <Info /> {/* Oletetaan, että komponentin nimi on Info */}
        </div>
      </div>
    </footer>
  )
}

// Esimerkki lippuvalintakomponentista (korvaa omalla toteutuksellasi)
const Lippuvalinta = () => {
  return (
    <div>
      {/* Tähän lippuvalinnan logiikka ja ulkoasu */}
      <p>Lippuvalinta tulossa...</p>
    </div>
  )
}

// Esimerkki infokomponentista (korvaa omalla toteutuksellasi)
const Info = () => {
  return (
    <div>
      {/* Tähän inforakenteen logiikka ja ulkoasu */}
      <p>Info tulossa...</p>
    </div>
  )
}

export default Footer
