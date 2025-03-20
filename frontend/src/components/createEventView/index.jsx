import Footer from "../footer"
import Header from "../header"
import CreateEventForm from "./createEventForm"
import "./createEvent.css"
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
        <h1>{t.createEvent}</h1>
        <CreateEventForm />
      </div>
      <Footer />
    </div>
  )
}

export default CreateEventView
