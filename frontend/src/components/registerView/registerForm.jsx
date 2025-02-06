import { useSelector } from "react-redux"
import { useState } from "react"
import translations from "../../assets/translation.js"

const LoginForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Register attempt:", {
      username,
      email,
      password,
      passwordAgain,
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t.username}</label>
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
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
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
          <label>{t.passwordAgain}</label>
          <input
            type="password"
            value={passwordAgain}
            name="passwordAgain"
            onChange={(e) => setPasswordAgain(e.target.value)}
            placeholder={t.passwordAgain}
          />
        </div>
        <button type="submit">{t.register}</button>
      </form>
    </div>
  )
}

export default RegisterForm
