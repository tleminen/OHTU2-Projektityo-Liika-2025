import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import translations from "../../assets/translation"

const SignedOut = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  const navigate = useNavigate()
  const navigateTo = (path) => {
    navigate(`/${path}`)
  }
  return (
    <div className="containerX">
      <button className="registerandlogin-btn" onClick={() => navigateTo("login")}>{t.login}</button>
      <button className="registerandlogin-btn" onClick={() => navigateTo("register")}>{t.register}</button>
    </div>
  )
}

export default SignedOut
