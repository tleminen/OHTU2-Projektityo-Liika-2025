import translations from "../../assets/translation"
import Header from "../header"
import LoginForm from "./LoginForm"
import Footer from "../footer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const handler = () => {
    navigate("/")
  }

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <div className="Login">
      <Header />
      <LoginForm />
      <div className="forgot-password-text">
        <ul>{t.forgot_pw}</ul>
      </div>
      <button className="back-btn" onClick={handler}></button>
      <Footer />
    </div>
  )
}

export default Login
