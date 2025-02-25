import { useState } from "react"
import Footer from "../footer"
import Header from "../header"
import translations from "../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../index.css"

const ChangeEmail = () => {

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [newEmail, setNewEmail] = useState("")

  const options = [
    { value: "FI", label: "Suomi" },
    { value: "EN", label: "English" },
    //Lisätään muita kieliä tarvittaessa
  ]

  const selectedOption = options.find(
    (option) => option.value === selectedLanguage
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Create event attempt:", {
      newEmail
    })
  

  return (
    
    <div className="fullpage">
      <Header />
      <h1>
        Vaihda sähköposti
      </h1>
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
        <Footer />
        </div>
        )
        }
      }
  
export default ChangeEmail



