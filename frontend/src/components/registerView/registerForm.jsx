import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import translations from "../../assets/translation.js"
import { useNavigate } from "react-router-dom"
import registerService from "../../services/registerService.js"
import LocationMap from "../locationMap.jsx"
import "./register.css"
import { changeLocation } from "../../store/locationSlice.js"

const RegisterForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)
  const [location, setLocation] = useState("")

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Register attempt:", {
      username,
      email,
      password,
      passwordAgain,
      location,
    })
    event.preventDefault()
    console.log("Login attempt:", { username, password })
    try {
      const user = await registerService.register({
        username,
        email,
        password,
        role: 0,
        location,
      })
      console.log("token saatu:" + user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))

      dispatch(
        changeLocation({
          o_lat: user.location[1],
          o_lng: user.location[0],
          lat: user.location[1],
          lng: user.location[0],
          zoom: 14,
        })
      ) // Kovakoodattu etäisyys

      navigate(`/`)
    } catch (error) {
      console.log(error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibilityAgain = () => {
    setShowPasswordAgain(!showPasswordAgain)
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            ref={inputRef}
            type="text"
            className="input-field"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
            autoComplete="nickname"
          />
        </div>
        <div>
          <input
            type="email"
            className="input-field"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            autoComplete="email"
          />
        </div>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            className="input-field"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            <span className="material-symbols-outlined">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        <div className="password-input-container">
          <input
            type={showPasswordAgain ? "text" : "password"}
            className="input-field"
            value={passwordAgain}
            name="passwordAgain"
            onChange={(e) => setPasswordAgain(e.target.value)}
            placeholder={t.passwordAgain}
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibilityAgain}
          >
            <span className="material-symbols-outlined">
              {showPasswordAgain ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        <br />
        <div>
          <h2 style={{ textAlign: "center" }}>{t.setStartLocationInfo}</h2>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <button type="submit" className="forms-btn">
          <span>{t.register}</span>
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
