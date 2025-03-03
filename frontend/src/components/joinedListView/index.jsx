import { Link } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import "./joinedView.css"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"

const JoinedView = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/backgroundpicture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="joined-view">
        <p>placeHolder</p>
      </div>
      <Link to={"/map"} className="back-btn" style={{ alignSelf: "center" }}>
        <span>{t.back}</span>
      </Link>
      <Footer />
    </div>
  )
}

export default JoinedView
