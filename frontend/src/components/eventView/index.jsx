import { useEffect, useState } from "react"
import eventService from "../../services/eventService"
import Footer from "../footer"
import Header from "../header"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import translations from "../../assets/translation"
import "./eventView.css"
import { selectCategoryName } from "../../assets/icons"
import { addEvent, removeEvent } from "../../store/eventSlice"

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

const EventView = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  //const [times, setTimes] = useState(null)
  const [loading, setLoading] = useState(true)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)
  const userEvents = useSelector((state) => state.event.events || [])
  const [joined, setJoined] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userEvents || userEvents.length === 0) {
      console.log("Pitää hakea userEvents!!") // TODO: Jos mennään suoraan linkillä tapahtumaan niin userEvents ei ole haettu vielä reduxiin!
    } else {
      const isJoined = userEvents.some(
        (event) => String(event.EventID) === String(id)
      )
      if (isJoined) {
        setJoined(true)
      }
    }

    const fetchEventInfo = async () => {
      try {
        const response = await eventService.getEvent({ EventID: id })
        setEvent(response)
        //const responseTimes = await eventService.getTimesForEvent({
        //  EventID: id,
        //})
        //setTimes(responseTimes)
      } catch (error) {
        console.error("Virhe hakiessa tapahtumaa: " + error)
      } finally {
        setLoading(false)
      }
    }
    fetchEventInfo()
  }, [userEvents, id])

  // Tapahtumaan liittymisen painikkeen handleri
  const handleJoin = async (userID, id) => {
    try {
      const response = await eventService.joinEvent({
        UserID: userID,
        EventID: id,
      })
      console.log(response) // TODO: Lisää notifikaatio?
      setJoined(true)
      dispatch(addEvent({ UserID: userID, EventID: Number(id) }))
    } catch (error) {
      console.error("Virhe liityttäessä tapahtumaan" + error)
    }
  }

  // Tapahtumasta eroamisen painikkeen handleri
  const handleLeave = async (userID, id) => {
    try {
      const response = await eventService.leaveEvent({
        UserID: userID,
        EventID: Number(id),
      })
      console.log(response) // TODO: Lisää notifikaatio?
      setJoined(false)
      dispatch(removeEvent({ EventID: Number(id) }))
    } catch (error) {
      console.error("Virhe poistuessa tapahumasta" + error)
    }
  }

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
  console.log(event)

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
        {!joined && (
          <button
            className="join-btn"
            onClick={() => {
              handleJoin(userID, id)
            }}
          >
            Ilmoittaudu
          </button>
        )}
        {joined && (
          <button
            className="leave-btn"
            onClick={() => {
              handleLeave(userID, id)
            }}
          >
            Peru ilmoittautuminen
          </button>
        )}
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
