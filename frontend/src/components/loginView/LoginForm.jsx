import { useSelector } from "react-redux"
import { useState } from "react"
import translations from "../../assets/translation.js"
import loginService from "../../services/loginService.js"

const LoginForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("Login attempt:", { username, password })
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem("loggedUser", JSON.stringify(user)) // TÄmä pois ja tallennus storeen!!
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
          />
        </div>
        <button type="submit">{t.login}</button>
      </form>
    </div>
  )
}

export default LoginForm
