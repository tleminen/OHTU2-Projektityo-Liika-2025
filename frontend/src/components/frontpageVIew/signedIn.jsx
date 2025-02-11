import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const SignedIn = ({ setUser }) => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const navigate = useNavigate()

  const handler = () => {
    window.localStorage.setItem("loggedUser", "")
    setUser(null)
    navigate("/")
  }

  return (
    <div>
      <button onClick={() => handler()}>{t.logOut}</button>
    </div>
  )
}

export default SignedIn
