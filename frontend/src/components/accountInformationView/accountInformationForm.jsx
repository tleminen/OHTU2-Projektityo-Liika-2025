import { useSelector } from "react-redux"
import { useState } from "react"
import LocationMap from "../locationMap.jsx"
import Select from "react-select"
import translations from "../../assets/translation.js"


const AccountInformationForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [startLocation, setStartLocation] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")

  const options = [
    { value: "fi", label: "Suomi" },
    { value: "en", label: "Englanti" },
    //Lisätään muita kieliä tarvittaessa
  ]

  const handleChange = (selectedOption) => {
    console.log(selectedOption.value)
  }
  
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
  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
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
            type="text"
            value={newPassword}
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t.newPassword}
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
        <br />
        <div>
          <h2 style={{ textAlign: "center" }}>{t.setStartLocationInfo}</h2>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div>
        <Select
        value=""
        onChange={handleChange}
        options={options}
      />
        </div>
        <button type="submit">{t.save}</button>
      </form>
    </div>
    
  )
}

export default AccountInformationForm
