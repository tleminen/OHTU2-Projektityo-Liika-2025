import { Link } from "react-router-dom"
import Header from "../header"
import TermsOfService from "./termsOfService"
import Footer from "../footer"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"

const TermsOfServiceView = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  return (
    <div className="fullpage">
      <Header />
      <TermsOfService />
      <Link to={"/"} className="back-btn" style={{ alignSelf: "center" }}>
        <span>{t.back}</span>
      </Link>
      <Footer />
    </div>
  )
}

export default TermsOfServiceView
