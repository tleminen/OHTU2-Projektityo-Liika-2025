import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"

const ChangeEmail = () => {

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [newEmail, setNewEmail] = useState("")
  const email = useSelector((state) => state.user.user.email)

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
        Vaihda sähköposti
      </h1>
      <p>
        Nykyinen sähköpostiosoite: {email}
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
        <button type="submit">{t.save}</button>
        </form>
        </div>
        <Footer />
        </div>
        )
        }
      
    
export default ChangeEmail



