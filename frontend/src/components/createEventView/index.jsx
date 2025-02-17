import Footer from "../footer"
import Header from "../header"
import CreateEventForm from "./createEventForm"

const CreateEventView = () => {
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <CreateEventForm />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CreateEventView
