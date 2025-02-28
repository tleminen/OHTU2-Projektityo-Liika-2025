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
  )}`
  const dateStr = `${String(date.getDate()).padStart(2, "0")}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${date.getFullYear()}`
  return [time, dateStr]
}

const EventView = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [times, setTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)
  const userEvents = useSelector((state) => state.event.events || [])
  const [selectedTime, setSelectedTime] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const response = await eventService.getEvent({ EventID: id })
        setEvent(response)
        const responseTimes = await eventService.getEventTimes({
          EventID: id,
        })
        setTimes(responseTimes)
      } catch (error) {
        console.error("Virhe hakiessa tapahtumaa: " + error)
      } finally {
        setLoading(false)
      }
    }
    fetchEventInfo()
  }, [id])

  // Kun times latautuu, asetetaan ensimmäinen aika selectedTime:ksi, jos sitä ei vielä ole
  useEffect(() => {
    if (times.length > 0 && !selectedTime) {
      setSelectedTime(times[0])
    }
  }, [times, selectedTime])

  // Tapahtumaan liittymisen painikkeen handleri
  const handleJoin = async (userID, id) => {
    console.log(selectedTime.id)
    try {
      const response = await eventService.joinEvent({
        UserID: userID,
        EventID: id,
        TimeID: Number(selectedTime.TimeID),
      })
      console.log(response) // TODO: Lisää notifikaatio?
      dispatch(
        addEvent({
          UserID: userID,
          EventID: Number(id),
          TimeID: Number(selectedTime.TimeID),
        })
      )
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
        TimeID: Number(selectedTime.TimeID),
      })
      console.log(response) // TODO: Lisää notifikaatio?
      dispatch(
        removeEvent({
          EventID: Number(id),
          UserID: userID,
          TimeID: selectedTime.TimeID,
        })
      )
    } catch (error) {
      console.error("Virhe poistuessa tapahumasta" + error)
    }
  }

  // Päivämäärän vaihdon handleri
  const handleTimeClick = (time) => {
    setSelectedTime(time)
    console.log(time.TimeID)
  }

  // Tarkistaa onko käyttäjä liittynyt tiettyyn aikaan
  const isJoined = (time) => {
    console.log(userEvents)
    return userEvents.some(
      (userEvent) =>
        String(userEvent.EventID) === String(id) &&
        Number(userEvent.TimeID) === Number(time.TimeID)
    )
  }

  const getTimeButtonClass = (time) => {
    return isJoined(time) ? "joined-time-btn" : "not-joined-time-btn"
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
        <h2>Päivä</h2>
        <div className="time-parent">
          {times.map((time, index) => (
            <div key={index} className="time-child">
              <button
                onClick={() => handleTimeClick(time)}
                className={getTimeButtonClass(time)}
              >
                {parseTimeAndDate(time.StartTime)[1]}
              </button>
            </div>
          ))}
        </div>
        <h2>Kellonaika</h2>
        <p style={{ fontWeight: "bold" }}>
          {parseTimeAndDate(times[0].StartTime)[0]}
        </p>
        <p>Tähän väliin varmaa kartta et missä se on?</p>
        <h2>Kuvaus:</h2>
        <p>{event.Description}</p>
        <h2>Osallistujamäärä</h2>
        <p>
          {event.ParticipantMin} - {event.ParticipantMax}
        </p>
        {selectedTime && !isJoined(selectedTime) && (
          <button className="join-btn" onClick={() => handleJoin(userID, id)}>
            Ilmoittaudu
          </button>
        )}
        {selectedTime && isJoined(selectedTime) && (
          <button className="leave-btn" onClick={() => handleLeave(userID, id)}>
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
