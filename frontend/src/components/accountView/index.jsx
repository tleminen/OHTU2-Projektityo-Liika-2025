import { useEffect, useState } from "react"
import Footer from "../footer"
import Header from "../header"
import "./accountView.css"
import userService from "../../services/userService"
import { useDispatch, useSelector } from "react-redux"
import { changeUser } from "../../store/userSlice"
import { Link } from "react-router-dom"
import "../../index.css"

const AccountView = () => {
  const [user, setUser] = useState(null)
  const userID = useSelector((state) => state.user?.user?.userID ?? null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userID) return // Ei tehdä pyyntöä jos userID ei ole saatavilla
      try {
        const response = await userService.getUserData(userID)

        if (!response) {
          console.error("Response tyhjä")
          return
        }
        const email = response.Email // EI VIELÄ TOIMI
        dispatch(changeUser(email))
        setUser(response)
      } catch (error) {
        console.error("Virhe hakiessa yksittäisen käyttäjän tietoja: " + error)
      }
    }
    fetchUserInfo()
  }, [userID, dispatch]) // Suoritetaan vain kun userID muuttuu

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
          <Link to={`/own_info/email`} className="button">
            Vaihda
          </Link>
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
