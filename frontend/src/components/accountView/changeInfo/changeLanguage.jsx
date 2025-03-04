import { useState } from "react"
import Footer from "../../footer"
import Header from "../../header"
import translations from "../../../assets/translation.js"
import { useSelector } from "react-redux"
import "../../../index.css"
import "../accountView.css"
import { Link } from "react-router-dom"
import FlagSelection from "../../flagSelection.jsx"
import userService from "../../../services/userService.js"


const ChangeLanguage = () => {

  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)

  
  const saveHandler = async() => {
    console.log("Change language attempt:", {
      language
    })
    try {
      const response = await userService.updateUserLanguage({UserID:userID, LanguageID: language})
      console.log("Vaihdettu"+response) //TODO lisää notifikaatio kun vaihdettu
    } catch (error) {
      console.error("virhe käyttäjätunnuksen vaihdossa"+error)
    }
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
       <button onClick={saveHandler}>{t.save}</button>
        </div>
        <Link to={"/own_info"} className="back-btn" style={{alignSelf:"center"}}>
          <span>{t.back}</span>
        </Link>
        <Footer />
        </div>
        )
        }
      
    
export default ChangeLanguage



