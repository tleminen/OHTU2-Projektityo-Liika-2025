import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"

const ChangeUsername = () => {

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [newUsername, setNewUsername] = useState("")
  const username = useSelector((state) => state.user.user.username)
  const [newUserNameAgain, setNewUserNameAgain] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Create event attempt:", {
      newEmail
    })
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
        Vaihda käyttäjänimi
      </h1>
      <p>
        Nykyinen käyttäjänimi: {username}
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
          <h3>{t.newUserNameAgain}</h3>
          <input
            className="input-field"
            type="text"
            value={newUserNameAgain}
            name="newUserNameAgain"
            onChange={(e) => setNewUserNameAgain(e.target.value)}
            placeholder={t.newUserNameAgain}
            required={true}
          />
        </div>
        <button type="submit">{t.save}</button>
        </form>
        </div>
        <Footer />
        </div>
        )
        }
      
    
export default ChangeUsername



