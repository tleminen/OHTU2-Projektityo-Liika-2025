import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"
import FlagSelection from "../../flagSelection.jsx"

const ChangeLanguage = () => {

  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Create event attempt:", {
      newEmail
    })
  }
  

  return (
    
    <div className="fullpage"
    style={{
      backgroundImage: "url('/backgroundpicture.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      <Header />
      <div className="account-view">
      <h1>
       {t.ChangeLanguage}      
       </h1>
       <FlagSelection menuPlacement="bottom"/>
       <button type="submit">{t.save}</button>
        </div>
        <Link to={"/own_info"} className="back-btn" style={{alignSelf:"center"}}>
          <span>{t.back}</span>
        </Link>
        <Footer />
        </div>
        )
        }
      
    
export default ChangeLanguage



