import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"
import userService from "../../../services/userService.js"
import LocationMap from "../../locationMap.jsx"
import { useState } from "react"

const ChangeMap = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)
  const [location, setLocation] = useState(null)
  const oldLocation = [
    useSelector((state) => state.location.location.o_lng),
    useSelector((state) => state.location.location.o_lat),
  ]
  const [brightness, setBrightness] = useState(50) // Kirkkaus
  const [saturate, setSaturate] = useState(50) // Äänenvoimakkuus
  const [contrast, setContrast] = useState(20) // Lämpötila
  const [hue, setHue] = useState(30)
  const [currentSetting, setCurrentSetting] = useState("brightness") // Asetus, jota säädetään (kirkkaus, äänenvoimakkuus, lämpötila)

  console.log(oldLocation)

  const handleOnLocationChange = (location) => {
    setLocation(location)
  }

  const saveHandler = async () => {
    console.log("Tallenna kartan sijainti ja kartan filtteri:", {
      location,
    })
    if (storedToken) {
      try {
        console.log("Vaihdettu") //TODO lisää notifikaatio kun vaihdettu
      } catch (error) {
        console.error("virhe kartan asetusten vaihdossa" + error)
      }
    } else {
      console.error("No token provided")
    }
  }

  const handleSliderChange = (e) => {
    const newValue = e.target.value
    if (currentSetting === "brightness") {
      setBrightness(newValue)
    } else if (currentSetting === "saturate") {
      setSaturate(newValue)
    } else if (currentSetting === "contrast") {
      setContrast(newValue)
    } else if (currentSetting === "hue") {
      setHue(newValue)
    }
  }
  const toggleSlider = (setting) => {
    setCurrentSetting(currentSetting === setting ? null : setting)
  }

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
        <h1>{t.mapSettings}</h1>

        <div className="account-view-form">
          <div
            className="blur-overlay set-overlay"
            style={{
              backdropFilter: `saturate(${saturate}%) brightness(${brightness}%) contrast(${contrast}%) hue-rotate(${hue}deg)`,
            }}
          />
          <LocationMap
            onLocationChange={handleOnLocationChange}
            oldLocation={oldLocation}
          />
        </div>
        <div className="slider-panel">
          {/* Slider only appears when one of the buttons is clicked */}
          {currentSetting && (
            <div className="slider-wrapper">
              <input
                type="range"
                min="0"
                max="300"
                value={
                  currentSetting === "brightness"
                    ? brightness
                    : currentSetting === "saturate"
                    ? saturate
                    : currentSetting === "contrast"
                    ? contrast
                    : hue
                }
                onChange={handleSliderChange}
                className={`slider-input ${currentSetting}`}
              />
              <p>
                {currentSetting === "brightness" && (
                  <>
                    Kirkkaus: <span>{brightness}</span>%
                  </>
                )}
                {currentSetting === "saturate" && (
                  <>
                    saturaatio: <span>{saturate}</span>%
                  </>
                )}
                {currentSetting === "contrast" && (
                  <>
                    kontrasti: <span>{contrast}</span>%
                  </>
                )}
                {currentSetting === "hue" && (
                  <>
                    hue: <span>{hue}</span>deg
                  </>
                )}
              </p>
            </div>
          )}
          <div className="slider-container">
            {/* Buttons to toggle settings */}
            <div
              className={`slider-toggle ${
                currentSetting === "brightness" ? "active" : ""
              }`}
              onClick={() => toggleSlider("brightness")}
            >
              <span>Säädä kirkkaus</span>
            </div>
            <div
              className={`slider-toggle ${
                currentSetting === "saturate" ? "active" : ""
              }`}
              onClick={() => toggleSlider("saturate")}
            >
              <span>Säädä saturaatio</span>
            </div>
            <div
              className={`slider-toggle ${
                currentSetting === "contrast" ? "active" : ""
              }`}
              onClick={() => toggleSlider("contrast")}
            >
              <span>Säädä kontrasti</span>
            </div>
            <div
              className={`slider-toggle ${
                currentSetting === "hue" ? "active" : ""
              }`}
              onClick={() => toggleSlider("hue")}
            >
              <span>Säädä hue</span>
            </div>
          </div>
        </div>
        <button className="save-btn" onClick={saveHandler}>
          {t.save}
        </button>
      </div>
      <Link
        to={"/own_info"}
        className="back-btn"
        style={{ alignSelf: "center" }}
      >
        <span>{t.back}</span>
      </Link>
      <Footer />
    </div>
  )
}

export default ChangeMap
