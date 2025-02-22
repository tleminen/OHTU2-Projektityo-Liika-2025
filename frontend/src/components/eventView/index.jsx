import { useEffect, useState } from "react"
import eventService from "../../services/eventService"
import Footer from "../footer"
import Header from "../header"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import "./eventView.css"
import { selectCategoryName } from "../../assets/icons"

const parseTimeAndDate = (isoDate) => {
  const date = new Date(isoDate)
  const time = `${date.getHours()}:${String(date.getMinutes()).padStart(
    2,
    "0"
  )}:${String(date.getSeconds()).padStart(2, "0")}`
  const dateStr = `${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}.${date.getFullYear()}`

  return [time, dateStr]
}

const handleJoin = () => {
  console.log("käyttäjä liittyy sit tästä näin")
}

const EventView = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const response = await eventService.getEvent({ EventID: id })
        setEvent(response)
        console.log(response)
      } catch (error) {
        console.error("Virhe hakiessa tapahtumaa: " + error)
      } finally {
        setLoading(false)
      }
    }
    fetchEventInfo()
  }, [id])

  if (loading) {
    // Tietokantahaku kesken
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
        <div className="event-view">
          <p>{t.loading_event}</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!event) {
    // Jos tapahtumaa ei löytynyt tietokantahaulla
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
        <div className="event-view">
          <p>{t.no_event_found}</p>
        </div>
        <Footer />
      </div>
    )
  }

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
      <div className="event-view">
        <img
          src={`/lajit/${selectCategoryName([event.CategoryID])}.png`}
          alt="Logo"
          width={100}
          height={100}
          className="event-view-icon" // Ei taida toimia tää className??
        />
        <h1>{event.Title}</h1>
        <p>Tähän väliin varmaa kartta et missä se on?</p>
        <h2>Kuvaus:</h2>
        <p>{event.Description}</p>
        <h2>osallistujamäärä</h2>
        <p>
          {event.ParticipantMin} - {event.ParticipantMax}
        </p>
        <button
          className="join-btn"
          onClick={() => {
            handleJoin()
          }}
        >
          liity
        </button>
        <p style={{ fontWeight: "lighter" }}>
          Tapahtuman kuvausta viimeksi päivitetty:
        </p>
        <p style={{ fontWeight: "lighter" }}>
          {parseTimeAndDate(event.updatedAt)[1]}{" "}
          {parseTimeAndDate(event.updatedAt)[0]}
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default EventView
