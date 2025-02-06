import translations from "../../assets/translation"
import Header from "../header"
import LoginForm from "./LoginForm"
import Footer from "../footer"
import { useSelector } from "react-redux"

const Login = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <div className="Login">
      <Header />
      <LoginForm />
      <div class="forgot-password-text"><ul>{t.forgot_pw}</ul></div>
      <button className="back-btn"></button>
      <Footer />
    </div>
  )
}

export default Login
