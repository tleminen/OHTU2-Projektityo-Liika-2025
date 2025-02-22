import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import translations from "../../assets/translation"
import RegisterForm from "./registerForm"
import "../../index.css"

const Register = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/background-logandreg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="register">
        <RegisterForm />
        <p style={{ textAlign: "center" }}>
          {t.ready_account}
          <br />
          <a href="/login">{t.login2}</a>
        </p>
        <Link to={"/"} className="back-btn">
          <span>{t.back}</span>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default Register
