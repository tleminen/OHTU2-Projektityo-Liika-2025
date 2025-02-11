import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { setUser } from "../../store/userSlice.js"
import translations from "../../assets/translation.js"
import loginService from "../../services/loginService.js"

const LoginForm = () => {
  const dispatch = useDispatch()
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

      console.log("teksti" + user)

      dispatch(setUser(user.username))
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
