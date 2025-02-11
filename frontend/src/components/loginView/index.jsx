import translations from "../../assets/translation"
import Header from "../header"
import LoginForm from "./LoginForm"
import Footer from "../footer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Login = () => {
  const navigate = useNavigate()
  const [emailForm, setEmailForm] = useState(false)
  const handler = () => {
    navigate("/")
  };

  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  return (
    <div className="Login">
      <Header />
      <LoginForm />
      <div className="forgot-password-text">
        <a href="#" onClick={() => setEmailForm(!emailForm)}>
          {t.forgot_pw}
        </a>
      </div>
      {emailForm && (
        <form>
          <input type="text" name="changePassword" placeholder={t.email} />
          <button>{t.reset_pw}</button>
        </form>
      )}

      <button className="back-btn" onClick={handler}>
        <span>{t.back}</span>
      </button>
      <Footer />
    </div>
  )
}

export default Login
