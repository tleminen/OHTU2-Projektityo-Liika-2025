import { useSelector } from "react-redux"
import translations from "../../assets/translation"

const SignedIn = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  const handler = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  return (
    <div>
      <button className="registerandlogin-btn" onClick={() => handler()}>
        {t.logOut}
      </button>
    </div>
  )
}

export default SignedIn
