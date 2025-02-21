import Footer from "../footer"
import Header from "../header"

const EventView = () => {
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
      <div className="event-view">Tähän kontentti</div>
      <Footer />
    </div>
  )
}

export default EventView
