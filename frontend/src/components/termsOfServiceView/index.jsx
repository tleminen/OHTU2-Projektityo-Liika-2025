import { useNavigate } from "react-router-dom"
import Header from "../header"
import TermsOfService from "./termsOfService"
import Footer from "../footer"

const TermsOfServiceView = () => {
    const navigate = useNavigate()
  const handler = () => {
    navigate("/")
  }
    return (
        <div>
            <Header/>
            <TermsOfService/>
            <button href="/" className="back-btn" onClick={handler}></button>
            <Footer/>
        </div>
    )
}

export default TermsOfServiceView