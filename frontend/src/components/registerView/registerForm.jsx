import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import translations from "../../assets/translation.js"
import { useNavigate } from "react-router-dom"
import registerService from "../../services/registerService.js"

const RegisterForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)

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
    })
    event.preventDefault()
    console.log("Login attempt:", { username, password })
    try {
      const user = await registerService.register({
        username,
        email,
        password,
        role: 0,
      })
      console.log("token saatu:" + user.token)
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
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

  return (
    <div>
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
        <button type="submit">{t.register}</button>
      </form>
    </div>
  )
}

export default RegisterForm
