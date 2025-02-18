import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import translations from "../../assets/translation.js"
import loginService from "../../services/loginService.js"
import { useNavigate } from "react-router-dom"
import "./login.css"
import { changeLocation } from "../../store/locationSlice.js"

const LoginForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const inputRef = useRef(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Login attempt:", { username, password })
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(`Tokeni: ${user.token} Käyttäjätunnus: ${user.username}`)
      console.log(user)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      dispatch(
        changeLocation({
          o_lat: user.location[1],
          o_lng: user.location[0],
          lat: user.location[1],
          lng: user.location[0],
          zoom: 14, // Kovakoodattu etäisyys
        })
      )
      navigate(`/`)
    } catch (error) {
      console.log(error)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="login-form">
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
            autoComplete="text"
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
            autoComplete="current-password"
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
        <button type="submit" className="forms-btn">
          <span>{t.login}</span>
        </button>
      </form>
    </div>
  )
}

export default LoginForm
