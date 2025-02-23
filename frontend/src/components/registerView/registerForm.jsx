import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import translations from "../../assets/translation.js"
import { useNavigate } from "react-router-dom"
import registerService from "../../services/registerService.js"
import LocationMap from "../locationMap.jsx"
import "./register.css"
import { changeLocation } from "../../store/locationSlice.js"
import { changeUser } from "../../store/userSlice.js"
import { registerValidation } from "../../utils/validationSchemas.js"

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
  const [errors, setErrors] = useState({})

  const schema = registerValidation()

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await schema.validate(
        { username, email, password, passwordAgain },
        { abortEarly: false }
      )
      setErrors({})

      console.log("Register attempt:", {
        username,
        email,
        password,
        passwordAgain,
        location,
        language, // KATSO MITÄ LÄHTEE
      })

      console.log("Login attempt:", { username, password })
      try {
        const user = await registerService.register({
          username,
          email,
          password,
          role: 0,
          location,
          language,
        })
        console.log("token saatu:" + user.token)
        window.localStorage.setItem("loggedUser", JSON.stringify(user))

        dispatch(
          changeUser({
            userID: user.userID,
            username: user.username,
            token: user.token,
          })
        )
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
    } catch (err) {
      if (err.inner) {
        const errorMap = {}
        err.inner.forEach((error) => {
          errorMap[error.path] = error.message
        })
        setErrors(errorMap)

        console.log("Validation errors:", errorMap)
      }
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
          <h3>{t.username}</h3>
          <input
            ref={inputRef}
            type="text"
            className={`input-field ${errors.username ? "error" : ""}`}
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
            autoComplete="nickname"
          />
        </div>
        {errors.username && (
          <div className="error-forms">{errors.username}</div>
        )}
        <div>
          <h3>{t.email}</h3>
          <input
            type="text"
            className={`input-field ${errors.email ? "error" : ""}`}
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            autoComplete="email"
          />
        </div>
        {errors.email && <div className="error-forms">{errors.email}</div>}
        <h3>{t.password}</h3>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            className={`input-field ${errors.password ? "error" : ""}`}
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
        {errors.password && (
          <div className="error-forms">{errors.password}</div>
        )}
        <h3>{t.passwordAgain}</h3>
        <div className="password-input-container">
          <input
            type={showPasswordAgain ? "text" : "password"}
            className={`input-field ${errors.passwordAgain ? "error" : ""}`}
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
        {errors.passwordAgain && (
          <div className="error-forms">{errors.passwordAgain}</div>
        )}
        <div>
          <h3>{t.setStartLocationInfo}</h3>
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
