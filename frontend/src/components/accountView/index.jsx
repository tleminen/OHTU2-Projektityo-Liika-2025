import { useEffect, useState } from "react"
import Footer from "../footer"
import Header from "../header"
import "./accountView.css"
import userService from "../../services/userService"
import { useSelector } from "react-redux"

const AccountView = () => {
  const [user, setUser] = useState(null)
  const userID = useSelector((state) => state.user?.user?.userID ?? null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userID) return // Ei tehdä pyyntöä jos userID ei ole saatavilla
      try {
        console.log(userID)
        const response = await userService.getUserData(userID)
        console.log(response)
        setUser(response)
      } catch (error) {
        console.error("Virhe hakiessa yksittäisen käyttäjän tietoja: " + error)
      }
    }

    fetchUserInfo()
  }, [userID]) // Suoritetaan vain kun userID muuttuu

  if (!user) {
    // Tietokantahaku kesken
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
          <p>Lataa...</p>
        </div>
        <Footer />
      </div>
    )
  }
  console.log(user.user)
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
      <div className="account-view">
        <h1>Käyttäjätiedot</h1>
        <div className="information-field">
          <h3>Sähköposti: </h3>
          {user.user.Email}
        </div>
        <div className="information-field">
          <h3>Kayttäjätunnus: </h3>
          {user.user.Username}
        </div>
        <div className="information-field">
          <h3>Kieli: </h3>
          {user.user.LanguageID}
        </div>
        <div className="information-field">
          <h3>Sähköposti: </h3>
          {user.user.Email}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AccountView
