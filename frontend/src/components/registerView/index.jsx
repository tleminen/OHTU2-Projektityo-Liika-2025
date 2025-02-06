import { useSelector } from "react-redux"
import Footer from "../footer"
import Header from "../header"
import translations from "../../assets/translation"

const Register = () => {
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
      <p></p>
      <Footer />
    </div>
  )
}

export default Register
