import { useNavigate } from "react-router-dom"
import Header from "../header"
import TermsOfService from "./termsOfService"
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
      <TermsOfService />
      <button href="/" className="back-btn" onClick={handler}>
        <span>{t.back}</span>
      </button>
      <Footer />
    </div>
  )
}

export default TermsOfServiceView
