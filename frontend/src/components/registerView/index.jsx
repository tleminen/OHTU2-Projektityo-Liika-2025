import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import translations from "../../assets/translation"

const Register = () => {
  const navigate = useNavigate()
  const handler = () => {
    navigate("/")
  }
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  return (
    <div>
      <Header />
      <p>Placeholder formille</p>
      <p>
        {t.ready_account}
        <br />
        {t.login2}
      </p>
      <button href="/" className="back-btn" onClick={handler}></button>
      <Footer />
    </div>
  )
}

export default Register
