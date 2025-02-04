import { use } from 'react'
import { useState } from 'react'

const LoginForm = () => {
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
                    <label>Käyttäjänimi:</label>
                    <input
                    type="text"
                    value={username}
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='kirjoita käyttäjänimi tähän'
                    />
                </div>
                <div>
                    <label>Salasana:</label>
                    <input
                    type= "password"
                    value={password}
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='kirjoita salasana tähän'
                    />
                    </div>
                <button type ="submit">Kirjaudu sisään</button>
            </form>
        </div>
    )
}

export default LoginForm