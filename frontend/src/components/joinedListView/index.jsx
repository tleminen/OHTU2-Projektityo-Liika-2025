import { Link } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import EventList from "../../utils/eventList"

const JoinedView = () => {
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
      <EventList listType="joined" />
      <Footer />
    </div>
  )
}

export default JoinedView
