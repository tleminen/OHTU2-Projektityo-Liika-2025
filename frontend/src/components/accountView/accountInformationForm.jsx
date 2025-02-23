import { useSelector } from "react-redux"
import { useState } from "react"
import LocationMap from "../locationMap.jsx"
import Select from "react-select"
import translations from "../../assets/translation.js"
import Header from "../header.jsx"
import Footer from "../footer.jsx"

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
    { value: "en", label: "English" },
    //Lisätään muita kieliä tarvittaessa
  ]

  const selectedOption = options.find(
    (option) => option.value === selectedLanguage
  )

  const handleChange = (selectedOption) => {
    console.log(selectedOption.label)
    setSelectedLanguage(selectedOption.selectedOption)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Create event attempt:", {
      email,
      username,
      password,
      startLocation,
      selectedLanguage,
    })
  }
  const handleLocationChange = (newLocation) => {
    setStartLocation(newLocation)
  }

  return (
    <div className="fullpage">
      <Header />
      <h1>
        Voit muokata omia tietoja täyttämällä ja tallentamalla lomakkeen tiedot
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>{t.email}</h3>
          <input
            className="input-field"
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            required={true}
          />
        </div>
        <div>
          <h3>{t.username}</h3>
          <input
            className="input-field"
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
            required={true}
          />
        </div>
        <div>
          <h3>{t.newPassword}</h3>
          <input
            className="input-field"
            type="text"
            value={newPassword}
            name="newPassword"
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t.newPassword}
            autoComplete="new-password"
          />
        </div>
        <br />
        <div style={{ margin: "10px" }}>
          <h3>{t.setStartLocationInfo}</h3>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div>
          <h3>{t.language}</h3>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </div>
        <div>
          <input
            className="input-field"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            required={true}
            autoComplete="password"
          />
        </div>
        <button type="submit">{t.save}</button>
      </form>
      <Footer />
    </div>
  )
}

export default AccountInformationForm
