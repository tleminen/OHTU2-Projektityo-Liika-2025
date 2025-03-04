import { useEffect, useState } from "react"
import Footer from "../footer"
import Header from "../header"
import "./accountView.css"
import userService from "../../services/userService"
import { useDispatch, useSelector } from "react-redux"
import { changeUser } from "../../store/userSlice"
import { Link } from "react-router-dom"
import "../../index.css"
import translations from "../../assets/translation"


const AccountView = () => {
  const [user, setUser] = useState(null)
  const userID = useSelector((state) => state.user?.user?.userID ?? null)
  const dispatch = useDispatch()
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

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
        <h1>{t.accountInformation}</h1>
        <div className="information-row">
          <div className="information">
            <h3>{t.email} </h3>
            {user.user.Email}
          </div>
          <div className="information">
            <Link to={`/own_info/email`} className="link-btn">
              {t.change}
            </Link>
          </div>
        </div>
        <div className="information-row">
          <div className="information">
            <h3>{t.username}</h3>
            {user.user.Username}
          </div>
          <div className="information">
            <Link to={"/own_info/username"} className="link-btn">
              {t.change}
            </Link>
          </div>
        </div>
        <div className="information-row">
          <div className="information">
            <h3>{t.password} </h3>
            <p>
            ••••••••
            </p>
          </div>
          <div className="information">
            <Link to={`/own_info/password`} className="link-btn">
              {t.change}
            </Link>
          </div>
        </div>
        <div className="information-row">
          <div className="information">
            <h3>{t.language} </h3>
            {user.user.LanguageID}
          </div>
          <div className="information">
            <Link to={`/own_info/language`} className="link-btn">
             {t.change}
            </Link>
          </div>
        </div>
      </div>
      <Link to={"/map"} className="back-btn" style={{alignSelf:"center"}}>
          <span>{t.back}</span>
        </Link>
      <Footer />
    </div>
  )
}

export default AccountView
