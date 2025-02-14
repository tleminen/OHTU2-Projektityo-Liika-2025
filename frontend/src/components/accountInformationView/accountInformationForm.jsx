import { useSelector } from "react-redux"
import { useState } from "react"
import translations from "../../assets/translation.js"

const AccountInformationForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Create event attempt:", {
      email,
      username,
      password,
      startLocation,
      selectedLanguage
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
          />
        </div>
        <div>
          <input
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
          />
        </div>
        <div>
          <input
            type="startLocation"
            value={startLocation}
            name="startLocation"
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder={t.startLocation}
          />
        </div>
        <div>
          <input
            type="selectedLanguage"
            value={selectedLanguage}
            name="selectedLanguage"
            onChange={(e) => setSelectedLanguage(e.target.value)}
            placeholder={t.selectedLanguage}
          />
        </div>
        <button type="submit">{t.save}</button>
      </form>
    </div>
  )
}

export default AccountInformationForm
