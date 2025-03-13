import Header from "../header"
import EventList from "../../utils/eventList"
import Footer from "../footer"

const CreatedEvents = () => {
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
