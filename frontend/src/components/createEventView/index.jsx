import Footer from "../footer"
import Header from "../header"
import CreateEventForm from "./createEventForm"
import "./createEvent.css"

const CreateEventView = () => {
  return (
    <div className="fullpage">
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
