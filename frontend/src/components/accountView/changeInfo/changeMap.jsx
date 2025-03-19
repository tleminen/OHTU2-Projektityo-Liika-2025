import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useDispatch, useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"
import userService from "../../../services/userService.js"
import LocationMap from "../../locationMap.jsx"
import { useState } from "react"
import { changeLocation } from "../../../store/locationSlice.js"

const ChangeMap = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)
  const dispatch = useDispatch()
  const [location, setLocation] = useState(null)
  const oldLocation = [
    useSelector((state) => state.location.location.o_lng),
    useSelector((state) => state.location.location.o_lat),
  ]
  const [brightness, setBrightness] = useState(100)
  const [saturate, setSaturate] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [hue, setHue] = useState(0)
  const [currentSetting, setCurrentSetting] = useState("brightness") // Asetus, jota säädetään (kirkkaus, äänenvoimakkuus, lämpötila)

  const saturateLimits = { min: 0, max: 300 } // Kylläisyys: 50%-300%
  const brightnessLimits = { min: 0, max: 200 } // Kirkkaus: 50%-150%
  const contrastLimits = { min: 0, max: 300 } // Kontrasti: 0%-300%
  const hueLimits = { min: -360, max: 360 }

  const updateValue = (value, min, max) => Math.min(Math.max(value, min), max)

  const handleOnLocationChange = (location) => {
    setLocation(location)
  }

  const saveHandler = async () => {
    console.warn(
      "Ominaisuuden toiminnallisuus puuttuu. Odottele muutama päivä tai viikko! :)"
    )
    console.log("Tallenna kartan sijainti ja kartan filtteri:") // TODO KESKEN
    if (storedToken) {
      console.log(location)
      try {
        const response = await userService.updateUserMapLocation(storedToken, {
          UserID: userID,
          location: location,
        })
        console.log("Vaihdettu" + response) //TODO lisää notifikaatio kun vaihdettu
        dispatch(
          changeLocation({
            o_lat: location.lat,
            o_lng: location.lng,
            lat: location.lat,
            lng: location.lng,
            zoom: location.zoom,
          })
        )
      } catch (error) {
        console.error("virhe kartan asetusten vaihdossa" + error)
      }
    } else {
      console.error("No token provided")
    }
  }

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value)
    if (currentSetting === "brightness") {
      setBrightness(
        updateValue(newValue, brightnessLimits.min, brightnessLimits.max)
      )
    } else if (currentSetting === "saturate") {
      setSaturate(updateValue(newValue, saturateLimits.min, saturateLimits.max))
    } else if (currentSetting === "contrast") {
      setContrast(updateValue(newValue, contrastLimits.min, contrastLimits.max))
    } else if (currentSetting === "hue") {
      setHue(updateValue(newValue, hueLimits.min, hueLimits.max))
    }
  }

  const toggleSlider = (setting) => {
    setCurrentSetting(currentSetting === setting ? null : setting)
  }

  // Määritetään aktiivinen sliderin min/max
  const getSliderLimits = () => {
    switch (currentSetting) {
      case "brightness":
        return brightnessLimits
      case "saturate":
        return saturateLimits
      case "contrast":
        return contrastLimits
      case "hue":
        return hueLimits
      default:
        return { min: 0, max: 100 }
    }
  }

  const sliderLimits = getSliderLimits()
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
                min={sliderLimits.min}
                max={sliderLimits.max}
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
                    Saturaatio: <span>{saturate}</span>%
                  </>
                )}
                {currentSetting === "contrast" && (
                  <>
                    Kontrasti: <span>{contrast}</span>%
                  </>
                )}
                {currentSetting === "hue" && (
                  <>
                    Hue: <span>{hue}</span>°
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
              <span>Kirkkaus</span>
            </div>
            <div
              className={`slider-toggle ${
                currentSetting === "saturate" ? "active" : ""
              }`}
              onClick={() => toggleSlider("saturate")}
            >
              <span>Saturaatio</span>
            </div>
            <div
              className={`slider-toggle ${
                currentSetting === "contrast" ? "active" : ""
              }`}
              onClick={() => toggleSlider("contrast")}
            >
              <span>Kontrasti</span>
            </div>
            <div
              className={`slider-toggle ${
                currentSetting === "hue" ? "active" : ""
              }`}
              onClick={() => toggleSlider("hue")}
            >
              <span>Hue</span>
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
