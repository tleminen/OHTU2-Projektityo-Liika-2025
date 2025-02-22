import eventService from "../../services/eventService"
import Footer from "../footer"
import Header from "../header"
import { useParams } from "react-router-dom"

const EventView = () => {
  const id = useParams().id

  const fetchEventInfo = async () => {
    const event = await eventService.getEvent({ EventID: id })
    console.log(event)
  }

  fetchEventInfo()
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
      <p>{id}</p>
      <div className="event-view">Tähän kontentti</div>
      <Footer />
    </div>
  )
}

export default EventView
