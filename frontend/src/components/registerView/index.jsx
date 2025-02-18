import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import translations from "../../assets/translation"
import RegisterForm from "./registerForm"
import "../../index.css"

const Register = () => {
  const navigate = useNavigate()
  const handler = () => {
    navigate("/")
  }
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  return (
    <div className="fullpage">
      <Header />
      <div className="register">
        <RegisterForm />
        <p style={{ textAlign: "center" }}>
          {t.ready_account}
          <br />
          <a href="/login">{t.login2}</a>
        </p>
        <button href="/" className="back-btn" onClick={handler}>
          <span>{t.back}</span>
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Register
