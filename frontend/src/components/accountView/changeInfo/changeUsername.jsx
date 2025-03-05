import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"
import userService from "../../../services/userService.js"

const ChangeUsername = () => {

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [newUsername, setNewUsername] = useState("")
  const username = useSelector((state) => state.user.user.username)
  const userID = useSelector((state) => state.user.user.userID)
  const [newUserNameAgain, setNewUserNameAgain] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Change Username attempt:" +
      newUsername
    )
    try {
      const response = await userService.updateUserUsername({UserID:userID, Username:newUsername})
      console.log("Vaihdettu"+response) //TODO lisää notifikaatio kun vaihdettu
    } catch (error) {
      console.error("virhe käyttäjätunnuksen vaihdossa"+error)
    }
  } 
  

  return (
    
    <div className="fullpage"
    style={{
      backgroundImage: "url('/backgroundpicture.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      <Header />
      <div className="account-view">
      <h1>
        {t.changeUsername}
      </h1>
      <p>
       {t.currentUsername} {username}
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>{t.newUsername}</h3>
          <input
            className="input-field"
            type="text"
            value={newUsername}
            name="newUsername"
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder={t.newUsername}
            required={true}
          />
        </div>
        <div>
          <h3>{t.newUsernameAgain}</h3>
          <input
            className="input-field"
            type="text"
            value={newUserNameAgain}
            name="newUserNameAgain"
            onChange={(e) => setNewUserNameAgain(e.target.value)}
            placeholder={t.newUsernameAgain}
            required={true}
          />
        </div>
        <button type="submit">{t.save}</button>
        </form>
        </div>
        <Link to={"/own_info"} className="back-btn" style={{alignSelf:"center"}}>
          <span>{t.back}</span>
        </Link>
        <Footer />
        </div>
        )
        }
      
    
export default ChangeUsername



