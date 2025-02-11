import { useNavigate } from "react-router-dom"
import Header from "../header"
import Info from "./info"
import Footer from "../footer"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"

const TermsOfServiceView = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  const navigate = useNavigate()
  const handler = () => {
    navigate("/")
  }
  return (
    <div>
      <Header />
      <Info />
      <button href="/" className="back-btn" onClick={handler}>
        <span>{t.back}</span>
      </button>
      <Footer />
    </div>
  )
}

export default TermsOfServiceView
