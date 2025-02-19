import logo from "../../public/liika_logo.png"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  return (
    <div className="header">
      <img
        src={logo}
        alt="Logo"
        width={100}
        height={100}
        className="logo"
        onClick={() => navigate("/")}
      />
    </div>
  )
}

export default Header
