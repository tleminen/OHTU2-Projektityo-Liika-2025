import translations from "../../assets/translation"
import Header from "../header"
import LoginForm from "./LoginForm"
import Footer from "../footer"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import loginService from "../../services/loginService.js" // Tuo loginService

const Login = () => {
  const navigate = useNavigate()
  const [emailForm, setEmailForm] = useState(false)
  const [email, setEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")
  const handler = () => {
    navigate("/")
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()

    try {
      console.log("Sähköposti: "+email)
      const response = await loginService.sendEmail(email) 
      console.log("SendEmail response "+response)
      if (response.message === "Sähköposti lähetetty!") {
        setResetMessage(t.email_sent)
        setEmail("") // Tyhjennä sähköposti-kenttä
      } else {
        setResetMessage(response.message || t.email_not_found)
      }
    } catch (error) {
      console.error("Virhe sähköpostin lähetyksessä:", error)
      setResetMessage(t.email_send_error)
    }
  }

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <div>
      <Header />
      <div className="login">
        <LoginForm />
        <div className="forgot-password-text">
          <a href="#" onClick={() => setEmailForm(!emailForm)}>
            {t.forgot_pw}
          </a>
        </div>
        {emailForm && (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              name="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">{t.reset_pw}</button>
            {resetMessage && <p>{resetMessage}</p>}
          </form>
        )}

        <button className="back-btn" onClick={handler}>
          <span>{t.back}</span>
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Login
