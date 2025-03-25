import { useEffect, useState } from "react"
import eventService from "../../services/eventService"
import Footer from "../footer"
import Header from "../header"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import translations from "../../assets/translation"
import "./eventView.css"
import { selectCategoryName } from "../../assets/icons"
import { addEvent, removeEvent } from "../../store/eventSlice"
import StaticMap from "../../utils/staticMap"
import { parseTimeAndDate } from "../../utils/helper"
import SendEmail from "../../utils/sendEmail.jsx"
import { addNotification } from "../../store/notificationSlice.js"
import {
  EventNotFound,
  EventJoinSuccess,
  EventJoinFailure,
  EventLeaveSuccess
  } from "../notification/notificationTemplates.js"
import NotificationContainer from "../notification/notificationContainer.jsx"



const EventView = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [times, setTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user?.user?.userID ?? null)
  const userEvents = useSelector((state) => state.event.events || [])
  const [selectedTime, setSelectedTime] = useState(null)
  const [email, setEmail] = useState("")
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const dispatch = useDispatch()
  const [unSignedJoined, setUnSignedJoined] = useState(false)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)

  useEffect(() => {
    const fetchEventInfo = async () => {
      try {
        const eventData = await eventService.getSingleEventWithTimes({
          EventID: id,
        })
        setEvent(eventData)
        setTimes(eventData.Times)
      } catch (error) {
        console.error(t.event_not_found + error)
        dispatch(addNotification(EventNotFound(t.event_not_found)))
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
      const response = await eventService.joinEvent(storedToken, {
        UserID: userID,
        EventID: id,
        TimeID: Number(selectedTime.TimeID),
      })
    
      console.log("join API response:", response) // TODO: Lisää notifikaatio?
      if (!response) {
        throw new Error(t.event_join_failure)
      }
      if (response && response.status >= 200 && response.status < 300) {
        dispatch(addNotification(EventJoinSuccess(t.event_joined)))
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
      } else {
        throw new Error(t.event_join_failure)
      }
    } catch (error) {
      console.error(t.event_join_failure + error)
      dispatch(addNotification(EventJoinFailure(t.event_join_failure)))
    }
  }
  //Kirjautumattoman tapahtumaan liitymisen painikkeen handleri
  const handleJoinUnSigned = async (email, id) => {
    console.log(email)
    console.log(selectedTime.id)
    try {
      const response = await eventService.joinEventUnSigned({
        Email: email,
        EventID: id,
        TimeID: Number(selectedTime.TimeID),
      })
      console.log(response) // TODO: Lisää notifikaatio?
      dispatch(addNotification(EventJoinSuccess(t.event_joined))),
      // Päivitä frontendin Times-tila
      setTimes((prevTimes) =>
        prevTimes.map((time) =>
          time.TimeID === selectedTime.TimeID
            ? { ...time, JoinedCount: (Number(time.JoinedCount) || 0) + 1 }
            : time
        )
      )
      setUnSignedJoined(true)
    } catch (error) {
      console.error(t.event_join_failure + error)
      dispatch(addNotification(EventJoinFailure(t.event_join_failure)))
      setUnSignedJoined(false)
    }
  }

  // Tapahtumasta eroamisen painikkeen handleri
  const handleLeave = async (userID, id) => {
    try {
      const response = await eventService.leaveEvent(storedToken, {
        UserID: userID,
        EventID: Number(id),
        TimeID: Number(selectedTime.TimeID),
      })
      console.log(response) // TODO: Lisää notifikaatio?
      dispatch(addNotification(EventLeaveSuccess(t.event_left)))
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
      console.error(t.event_join_failure + error)
      dispatch(addNotification(EventJoinFailure(t.event_join_failure)))
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
      ? `${baseClass} ${
          isJoined(time) ? "selected-not-joined" : "selected-joined"
        }`
      : baseClass
  }

  const showUsername = ({ user, club }) => {
    if (club) {
      return (
        <h1 style={{ textAlign: "center" }}>
          {club} {t.organizesEvent}:
        </h1>
      )
    }
    if (user.includes("@") || user.includes("-")) {
      return ""
    } else {
      return (
        <h1>
          {user} {t.organizesEvent}:
        </h1>
      )
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
        <NotificationContainer />
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

  //Kirjautumaton tarvittavat tiedot löydetty

  if (!userID) {
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
        <NotificationContainer />
        <div className="event-view">
          <img
            src={`/lajit/${selectCategoryName([event.CategoryID])}.png`}
            alt="Logo"
            width={100}
            height={100}
            className="event-view-icon" // Ei taida toimia tää className??
          />
          <h1>{event.Title}</h1>
          <h2>{t.chooseDate}</h2>
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
              </div>
            ))}
          </div>
          <h2>{t.time}</h2>
          <p style={{ fontWeight: "bold" }}>
            {parseTimeAndDate(times[0].StartTime)[0]} -{" "}
            {parseTimeAndDate(times[0].EndTime)[0]}
          </p>
          <h2>{t.location}</h2>
          <StaticMap mapCenter={event.Event_Location.coordinates} />

          <h2>{t.participantCount}</h2>
          <p>
            {event.ParticipantMin} - {event.ParticipantMax}
          </p>
          <h2>{t.joined}</h2>
          <p>{selectedTime && selectedTime.JoinedCount}</p>
          <h2>{t.description}</h2>
          <div style={{ maxWidth: "600px", marginBottom: "10px" }}>
            {event.Description}
          </div>
          <h3>{t.enterEmailToJoinEvent}</h3>
          <input
            type="text"
            value={email}
            name="email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            required={true}
          />

          <div>
            <SendEmail
              setIsOtpVerifiedFromParent={setIsOtpVerified}
              email={email}
            />
          </div>
          {selectedTime && isOtpVerified && !unSignedJoined && (
            <button
              className="join-btn"
              onClick={() => handleJoinUnSigned(email, id)}
            >
              {t.join}
            </button>
          )}
          {selectedTime && unSignedJoined && (
            <h3>{t.youHaveJoinedForTheEvent}</h3>
          )}
          <p style={{ fontWeight: "lighter" }}>{t.eventLastUpdated}</p>
          <p style={{ fontWeight: "lighter" }}>
            {parseTimeAndDate(event.updatedAt)[1]}{" "}
            {parseTimeAndDate(event.updatedAt)[0]}
          </p>
          <Link to={"/map"} className="back-btn">
            <span>{t.back}</span>
          </Link>
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
      <NotificationContainer/>
      <div className="event-view">
        <span className="spacer-line"></span>
        {showUsername({ user: event.Username, club: event.ClubName })}
        <img
          src={`/lajit/${selectCategoryName([event.CategoryID])}.png`}
          alt="Logo"
          width={100}
          height={100}
          className="event-view-icon" // Ei taida toimia tää className??
        />
        <h1>{event.Title}</h1>
        <h2>{t.chooseDate}</h2>
        <div className="time-parent">
          {times.map((time, index) => (
            <div key={index} className="time-child">
              <button
                onClick={() => handleTimeClick(time)}
                className={getTimeButtonClass(time)}
              >
                {parseTimeAndDate(time.StartTime)[1]}
              </button>
              <div className="counter-icon">
                <span>
                  {time.JoinedCount}/{event.ParticipantMax}
                </span>
              </div>
            </div>
          ))}
        </div>
        <h2>{t.time}</h2>
        <p style={{ fontWeight: "bold" }}>
          {parseTimeAndDate(times[0].StartTime)[0]} -{" "}
          {parseTimeAndDate(times[0].EndTime)[0]}
        </p>
        <h2>{t.location}</h2>
        <StaticMap mapCenter={event.Event_Location.coordinates} />

        <h2>{t.participants}</h2>
        <p>
          {event.ParticipantMin} - {event.ParticipantMax}
        </p>
        <h2>{t.joined}</h2>
        <p>{selectedTime && selectedTime.JoinedCount}</p>
        <h2>{t.description}</h2>
        <div style={{ maxWidth: "600px", marginBottom: "10px" }}>
          {event.Description}
        </div>
        {selectedTime && !isJoined(selectedTime) && (
          <button className="join-btn" onClick={() => handleJoin(userID, id)}>
            {t.join}
          </button>
        )}
        {selectedTime && isJoined(selectedTime) && (
          <button className="leave-btn" onClick={() => handleLeave(userID, id)}>
            {t.leaveEvent}
          </button>
        )}
        <p style={{ fontWeight: "lighter" }}>{t.eventLastUpdated}</p>
        <p style={{ fontWeight: "lighter" }}>
          {parseTimeAndDate(event.updatedAt)[1]}{" "}
          {parseTimeAndDate(event.updatedAt)[0]}
        </p>
        <Link to={"/map"} className="back-btn">
          <span>{t.back}</span>
        </Link>
        <span className="spacer-line"></span>
      </div>

      <Footer />
    </div>
  )
}

export default EventView
