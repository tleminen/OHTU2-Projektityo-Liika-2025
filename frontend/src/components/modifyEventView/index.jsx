import { Link, useNavigate, useParams } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import translations from "../../assets/translation"
import eventService from "../../services/eventService"
import { addEvent, removeEvent } from "../../store/eventSlice"
import { selectCategoryName } from "../../assets/icons"
import { parseTimeAndDate } from "../../utils/helper"
import LocationMap from "../locationMap"
import "./modifyEventView.css"

const ModifyEvent = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [times, setTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)
  const userEvents = useSelector((state) => state.event.events || [])
  const [selectedTime, setSelectedTime] = useState(null)
  const [eventLocation, setEventLocation] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const eventData = await eventService.getSingleEventWithTimes({
          EventID: id,
        })
        console.log(eventData)
        setEvent(eventData)
        setTimes(eventData.Times)
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
      // Päivitä frontendin Times-tila
      setTimes((prevTimes) =>
        prevTimes.map((time) =>
          time.TimeID === selectedTime.TimeID
            ? { ...time, JoinedCount: (Number(time.JoinedCount) || 0) + 1 }
            : time
        )
      )
    } catch (error) {
      console.error("Virhe liityttäessä tapahtumaan" + error) //TODO NOTIYFY
    }
  }

  // Päivitä tapahtumaa
  const handleUpdateEvent = () => {
    console.log(eventLocation)
  }

  // Poista tapahtuman päivä
  const handleCancelEvent = async (time) => {
    console.log(time)
    try {
      var response = null
      if (times.length === 1) {
        response = await eventService.deleteEvent({
          EventID: event.EventID,
          TimeID: time.TimeID,
        })
        navigate("/created_events")
      } else {
        response = await eventService.deleteEventTime({ TimeID: time.TimeID })
      }
      console.log(response)
    } catch (error) {
      console.error("Virhe poistettaessa tapahtumaa" + error) //TODO NOTIYFY
    }
  }

  const handleLocationChange = (newLocation) => {
    setEventLocation(newLocation)
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
      // Päivitä frontendin Times-tila
      setTimes((prevTimes) =>
        prevTimes.map((time) =>
          time.TimeID === selectedTime.TimeID
            ? {
                ...time,
                JoinedCount: Math.max((Number(time.JoinedCount) || 0) - 1, 0),
              }
            : time
        )
      )
    } catch (error) {
      console.error("Virhe poistuessa tapahumasta" + error)
    }
  }

  // Päivämäärän valinnan handleri
  const handleTimeClick = (time) => {
    setSelectedTime(time)
  }

  // Tarkistaa onko käyttäjä liittynyt tiettyyn aikaan
  const isJoined = (time) => {
    return userEvents.some(
      (userEvent) =>
        String(userEvent.EventID) === String(id) &&
        Number(userEvent.TimeID) === Number(time.TimeID)
    )
  }

  const getTimeButtonClass = (time) => {
    let baseClass = isJoined(time) ? "joined-time-btn" : "not-joined-time-btn"
    return selectedTime && selectedTime.TimeID === time.TimeID
      ? `${baseClass} selected-time`
      : baseClass
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

  // Kaikki tarvittavat tiedont löydetty. Näytetään...
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
        <h2>{t.date}</h2>
        <div className="time-parent">
          {times.map((time, index) => (
            <div key={index} className="time-child">
              <button
                onClick={() => handleTimeClick(time)}
                className={getTimeButtonClass(time)}
              >
                {parseTimeAndDate(time.StartTime)[1]}
              </button>
              <p>{time.JoinedCount}</p>
              <button onClick={() => handleCancelEvent(time)}>Poista</button>
            </div>
          ))}
        </div>
        <h2>{t.time}</h2>
        <p style={{ fontWeight: "bold" }}>
          {parseTimeAndDate(times[0].StartTime)[0]} -{" "}
          {parseTimeAndDate(times[0].EndTime)[0]}
        </p>
        <h2>{t.location}</h2>
        <LocationMap
          onLocationChange={handleLocationChange}
          oldLocation={[
            event.Event_Location.coordinates[0],
            event.Event_Location.coordinates[1],
          ]}
        />

        <h2>Osallistujamäärä</h2>
        <p>
          {event.ParticipantMin} - {event.ParticipantMax}
        </p>
        <h2>Liittyneitä</h2>
        <p>{selectedTime && selectedTime.JoinedCount}</p>
        <h2>Kuvaus:</h2>
        <p>{event.Description}</p>
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
        <p style={{ fontWeight: "lighter" }}>Tapahtumaa viimeksi päivitetty:</p>
        <p style={{ fontWeight: "lighter" }}>
          {parseTimeAndDate(event.updatedAt)[1]}{" "}
          {parseTimeAndDate(event.updatedAt)[0]}
        </p>
        <button className="modify-event-btn" onClick={handleUpdateEvent}>
          Tallenna muutokset
        </button>
        <Link to={"/map"} className="back-btn">
          <span>{t.back}</span>
        </Link>
      </div>

      <Footer />
    </div>
  )
}

export default ModifyEvent
