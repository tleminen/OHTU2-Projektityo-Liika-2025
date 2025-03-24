import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"

const ChangePassword = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [newPassword, setNewPassword] = useState("")
  const password = useSelector((state) => state.user.user.username)
  const [newPasswordAgain, setNewPasswordAgain] = useState("")
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)

  const handleChangePassword = () => {
    if (storedToken) {
      console.log("Create event attempt: UNDER CONSTRUCTION")
      console.log(password)
    } else {
      console.error("No token provided")
    }
  }

  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/backgroundpicture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="account-view">
        <div className="account-view-form">
          <h1>{t.ChangePassword}</h1>
          <h3>{t.newPassword}</h3>
          <input
            className="input-field"
            type="text"
            value={newPassword}
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t.newPassword}
            required={true}
          />
          <h3>{t.newPasswordAgain}</h3>
          <input
            className="input-field"
            type="text"
            value={newPasswordAgain}
            name="newPasswordAgain"
            onChange={(e) => setNewPasswordAgain(e.target.value)}
            placeholder={t.newPasswordAgain}
            required={true}
          />
          <button className="save-btn" onClick={() => handleChangePassword}>
            {t.save}
          </button>
        </div>
      </div>
      <Link
        to={"/own_info"}
        className="back-btn"
        style={{ alignSelf: "center" }}
      >
        <span>{t.back}</span>
      </Link>
      <Footer />
    </div>
  )
}

export default ChangePassword
