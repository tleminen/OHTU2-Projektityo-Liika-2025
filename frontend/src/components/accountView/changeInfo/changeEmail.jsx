import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"
import userService from "../../../services/userService.js"

const ChangeEmail = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [newEmail, setNewEmail] = useState("")
  const Email = useSelector((state) => state.user.user.email)
  const userID = useSelector((state) => state.user.user.userID)
  const [newEmailAgain, setNewEmailAgain] = useState("")
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Change Email attempt:" + newEmail)
    if (storedToken) {
      try {
        const response = await userService.updateUserEmail(storedToken, {
          UserID: userID,
          Email: newEmail,
        })
        console.log("Vaihdettu" + response) //TODO lisää notifikaatio kun vaihdettu
      } catch (error) {
        console.error("virhe sähköpostin vaihdossa" + error)
      }
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
        <h1>{t.changeEmail}</h1>
        <p>
          {t.currentEmail} {Email}
        </p>
        <form onSubmit={handleSubmit}>
          <div>
            <h3>{t.newEmail}</h3>
            <input
              className="input-field"
              type="text"
              value={newEmail}
              name="newEmail"
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder={t.newEmail}
              required={true}
            />
          </div>
          <div>
            <h3>{t.newEmailAgain}</h3>
            <input
              className="input-field"
              type="text"
              value={newEmailAgain}
              name="newEmailAgain"
              onChange={(e) => setNewEmailAgain(e.target.value)}
              placeholder={t.newEmailAgain}
              required={true}
            />
          </div>
          <button type="submit">{t.save}</button>
        </form>
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

export default ChangeEmail
