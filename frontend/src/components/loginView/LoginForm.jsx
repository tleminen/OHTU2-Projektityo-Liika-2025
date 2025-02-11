import { useSelector } from "react-redux";
import { useState } from "react";
import translations from "../../assets/translation.js";

const LoginForm = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Login attempt:", { username, password });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            class="input-field"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
          />
        </div>
        <div>
          <input
            type="password"
            class="input-field"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
          />
        </div>
        <button type="submit">{t.login}</button>
      </form>
    </div>
  );
};

export default LoginForm;
