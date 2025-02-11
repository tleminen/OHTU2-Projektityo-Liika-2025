import { useSelector } from "react-redux"
import { useState } from "react"
import translations from "../../assets/translation.js"

const RegisterForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Register attempt:", {
      username,
      email,
      password,
      passwordAgain,
    })
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
            type="text"
            className="input-field"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
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
