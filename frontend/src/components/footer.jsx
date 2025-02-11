import "../index.css"
import { useSelector } from "react-redux"
import translations from "../assets/translation.js"
import FlagSelection from "./flagSelection.jsx"
import { useNavigate } from "react-router-dom"

const Footer = () => {
  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(`/${path}`)
  }
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="flag-selection">
          <FlagSelection />
        </div>
        <div className="footer-text">
          <a href="/termsOfService">{t.terms_of_service}</a>
        </div>
        <div>
          <button className="info-btn" onClick={() => navigateTo("info")}>i</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
