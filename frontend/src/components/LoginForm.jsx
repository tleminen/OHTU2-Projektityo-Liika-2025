import { useSelector } from 'react-redux'
import { useState } from 'react'
import translations from "../assets/translation.js"

const LoginForm = () => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language] 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('Login attempt:', { username, password })
    }

    return (
        <div>

            <form OnSubmit={handleSubmit}>
                <div>
                    <label>{t.username}</label>
                    <input
                    type="text"
                    value={username}
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t.username_ph}
                    />
                </div>
                <div>
                    <label>{t.password}</label>
                    <input
                    type= "password"
                    value={password}
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.password_ph}
                    />
                    </div>
                <button type ="submit">{t.login}</button>
            </form>
        </div>
    )
}

export default LoginForm