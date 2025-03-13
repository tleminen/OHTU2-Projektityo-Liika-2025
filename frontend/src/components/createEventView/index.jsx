import Footer from "../footer"
import Header from "../header"
import CreateEventForm from "./createEventForm"
import "./createEvent.css"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"

const CreateEventView = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/background-logandreg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <div className="create-event">
        <CreateEventForm />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CreateEventView
