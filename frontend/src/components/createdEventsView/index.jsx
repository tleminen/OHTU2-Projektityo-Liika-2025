import { Link } from "react-router-dom"
import Header from "../header"
import EventList from "../../utils/eventList"
import Footer from "../footer"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"

const CreatedEvents = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  return (
    <div
      className="fullpage"
      style={{
        backgroundImage: "url('/backgroundpicture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header />
      <EventList listType="created" />
      <Footer />
    </div>
  )
}

export default CreatedEvents
