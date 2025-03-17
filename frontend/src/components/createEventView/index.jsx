import Footer from "../footer"
import Header from "../header"
import CreateEventForm from "./createEventForm"
import "./createEvent.css"

const CreateEventView = () => {
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
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CreateEventView
