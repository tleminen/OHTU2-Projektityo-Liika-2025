import { Link, useNavigate, useParams } from "react-router-dom"
import Footer from "../footer"
import Header from "../header"
import Select from "react-select"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import translations from "../../assets/translation"
import eventService from "../../services/eventService"
import { addEvent, removeEvent } from "../../store/eventSlice"
import { selectCategoryName } from "../../assets/icons"
import { parseTimeAndDate } from "../../utils/helper"
import LocationMap from "../locationMap"
import "./modifyEventView.css"
import DatePicker from "react-multi-date-picker"
import NotificationContainer from "../notification/notificationContainer"
import { EmailSentSuccess, EmailSentFailure, OtpRobotCheck, OtpVerified, OtpNotVerified, UserFailure, EventNotFound, EventJoinSuccess, EventJoinFailure, EventCreated, EventDeletionWarning, EventDeletionFailure, EventLeaveSuccess} from "../notification/notificationTemplates.js"
import { addNotification } from "../../store/notificationSlice.js"

const ModifyEvent = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [times, setTimes] = useState([])
  const [loading, setLoading] = useState(true)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const userID = useSelector((state) => state.user.user.userID)
  const userEvents = useSelector((state) => state.event.events || [])
  const [selectedTime, setSelectedTime] = useState(null)
  // Uudet tiedot:
  const [event_location, setEventLocation] = useState(null)
  const [title, setTitle] = useState("")
  const [participantsMin, setParticipantsMin] = useState("")
  const [participantsMax, setParticipantsMax] = useState("")
  const [description, setDescription] = useState("")
  const [activity, setActivity] = useState({})
  const [dates, setDates] = useState([])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")

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
        setActivity({
          value: eventData.CategoryID,
          label: t[selectCategoryName([eventData.CategoryID])],
        })
      } catch (error) {
        dispatch(addNotification(EventJoinFailure(t.event_not_found)));
        console.error(t.event_not_found + error)
      } finally {
        setLoading(false)
      }
    }
    fetchEventInfo()
  }, [id, t])

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
      console.log(response) 
      dispatch(
        addEvent({
          UserID: userID,
          EventID: Number(id),
          TimeID: Number(selectedTime.TimeID),
        })
        
      );
      
      // Päivitä frontendin Times-tila
      setTimes((prevTimes) =>
        prevTimes.map((time) =>
          time.TimeID === selectedTime.TimeID
            ? { ...time, JoinedCount: (Number(time.JoinedCount) || 0) + 1 }
            : time
        )
      )
    } catch (error) {
      console.error(t.event_join_error + error) //TODO NOTIYFY
      dispatch(addNotification(EventCreated(t.event_join_error)));
    }
  }

  // Päivitä tapahtumaa
  const handleUpdateEvent = () => {
    const updatedtitle = title || event.Title

    const updatedStartTime =
      startTime || parseTimeAndDate(times[0].StartTime)[0]
    const updatedEndTime = endTime || parseTimeAndDate(times[0].EndTime)[0]
    const updatedParticipantsMin = participantsMin || event.ParticipantMin
    const updatedParticipantsMax = participantsMax || event.ParticipantMax
    const updatedDescription = description || event.Description
    const updatedCategoryID = activity.value || event.CategoryID // Jos kategoria on tyhjä, käytetään oletusarvoa

    eventService.modifyEvent(storedToken, {
      Title: updatedtitle,
      UserID: userID,
      CategoryID: updatedCategoryID,
      Dates: dates,
      StartTime: updatedStartTime,
      EndTime: updatedEndTime,
      Event_Location: event_location,
      ParticipantsMin: updatedParticipantsMin,
      ParticipantsMax: updatedParticipantsMax,
      Description: updatedDescription,
      EventID: id,
    })
  }

  // Poista tapahtuman päivä
  const handleCancelEvent = async (time) => {
    // TODO: Lisää alert: Haluatko poistaa tapahtuman esiintymän?
    try {
      dispatch(addNotification(EventDeletionWarning(t.event_deletion_warning)));
      var response = null
      if (times.length === 1) {
        response = await eventService.deleteEvent(storedToken, {
          UserID: userID,
          EventID: event.EventID,
          TimeID: time.TimeID,
          
        })
        navigate("/created_events")
      } else {
        response = await eventService.deleteEventTime(storedToken, {
          UserID: userID,
          TimeID: time.TimeID,
        })
        // Päivitä frontendin times-tila poistamalla kyseinen aika listasta
        setTimes((prevTimes) =>
          prevTimes.filter((t) => t.TimeID !== time.TimeID)
        )

        // Jos poistettiin valittu aika, asetetaan ensimmäinen jäljelle jäänyt valituksi
        if (selectedTime?.TimeID === time.TimeID) {
          setSelectedTime(times.find((t) => t.TimeID !== time.TimeID) || null)
        }
      }
      console.log(response)
    } catch (error) {
      console.error("Virhe poistettaessa tapahtumaa" + error) //TODO NOTIYFY
      dispatch(addNotification(EventDeletionFailure(t.event_deletion_failure)));
    }
  }

  const handleLocationChange = (newLocation) => {
    setEventLocation(newLocation)
  }

  // Tapahtumasta eroamisen painikkeen handleri
  const handleLeave = async (userID, id) => {
    try {
      const response = await eventService.leaveEvent(storedToken, {
        UserID: userID,
        EventID: Number(id),
        TimeID: Number(selectedTime.TimeID),
      })
      dispatch(addNotification(EventJoinSuccess(t.event_leave_success)));
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
      dispatch(addNotification(EventLeaveFailure(t.event__leave_failure)));
      console.error("Virhe poistuessa tapahumasta" + error)
      
    }
  }
  const handleChange = (selectedOption) => {
    setActivity(selectedOption)
  }

  const categories = useSelector((state) => state.categories.categories)

  const options = () => {
    try {
      return categories.map((cat) => ({
        value: cat.CategoryID,
        label: t[selectCategoryName([cat.CategoryID])],
      }))
    } catch (error) {
      console.log(error)
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
      <div className="modify-event-view">
        <h1>{t.event_editing}</h1>
        <p>
          Muokkaa tapahtuman tietoja tässä näkymässä
          <br />
          Syötä uusi tieto vain muokattaviin kenttiin
          <br />
          <br />
          Voit poistua tallentamatta muutoksia painamalla takaisin
        </p>
        <div>
          <h2>{t.currentActivity}</h2>
          <p className="old-event-value">
            {t[selectCategoryName([event.CategoryID])]}
          </p>
          <img
            src={`/lajit/${selectCategoryName([event.CategoryID])}.png`}
            alt="Logo"
            width={100}
            height={100}
            className="event-view-icon"
          />
          <h3>{t.activity}</h3>
          <Select
            className="input-field"
            placeholder={t.activity}
            value={activity}
            onChange={handleChange}
            options={options()}
            isSearchable={true}
            required={true}
          />
        </div>
        <div className="own-event-item">
          <h2>Nykyinen otsikko</h2>
          <p className="old-event-value">{event.Title}</p>
          <h3>Syötä uusi otsikko:</h3>
          <input
            type="text"
            value={title}
            placeholder={`${event.Title}`}
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
        <div className="own-event-item">
          <h2>Nykyiset esiintymät</h2>
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
                <button onClick={() => handleCancelEvent(time)}>
                  Poista Esiintymä
                </button>
              </div>
            ))}
          </div>
          {selectedTime && !isJoined(selectedTime) && (
            <button className="join-btn" onClick={() => handleJoin(userID, id)}>
              Ilmoittaudu
            </button>
          )}
          {selectedTime && isJoined(selectedTime) && (
            <button
              className="leave-btn"
              onClick={() => handleLeave(userID, id)}
            >
              Peru ilmoittautuminen
            </button>
          )}
          <h3>Lisää esiintymiä</h3>
          <DatePicker
            value={dates}
            onChange={(newDates) =>
              setDates([...newDates].sort((a, b) => new Date(a) - new Date(b)))
            }
            multiple
            style={{ textAlign: "center" }}
            minDate={Date.now()}
            zIndex={1005}
            displayWeekNumbers={true}
            render={(value, openCalendar) => (
              <div className="custom-date-display" onClick={openCalendar}>
                {Array.isArray(value) ? (
                  value.map((date, index) => <div key={index}>{date}</div>)
                ) : (
                  <span>{value || "Choose dates"}</span>
                )}
              </div>
            )}
            format="DD.MM.YYYY"
            weekStartDayIndex={1}
          />
        </div>
        <div className="own-event-item">
          <h2>Nykyinen ajankohta</h2>
          <p className="old-event-value">
            {parseTimeAndDate(times[0].StartTime)[0]} -{" "}
            {parseTimeAndDate(times[0].EndTime)[0]}
          </p>
          <h3>Uusi ajankohta</h3>
          <h3>{t.startTime}</h3>
          <input
            type="time"
            value={startTime}
            name="startTime"
            className="input-field"
            onChange={(e) => setStartTime(e.target.value)}
            placeholder={t.dateAndTime}
            required={true}
          />
          <h3>{t.endTime}</h3>
          <input
            type="time"
            value={endTime}
            name="endTime"
            className="input-field"
            onChange={(e) => setEndTime(e.target.value)}
            placeholder={t.dateAndTime}
            required={true}
          />
        </div>
        <div className="own-event-item">
          <h2>{t.location}</h2>
          <LocationMap
            onLocationChange={handleLocationChange}
            oldLocation={[
              event.Event_Location.coordinates[0],
              event.Event_Location.coordinates[1],
            ]}
          />
        </div>
        <div className="own-event-item">
          <h2>Nykyinen osallistujamäärä</h2>
          <p className="old-event-value">
            {event.ParticipantMin} - {event.ParticipantMax}
          </p>
          <h3>Uudet osallistujamäärät</h3>
          <input
            type="number"
            value={participantsMin}
            name="minParticipants"
            className="input-field"
            onChange={(e) => setParticipantsMin(e.target.value)}
            placeholder={t.minParticipants}
            required={true}
          />
          <input
            type="number"
            value={participantsMax}
            name="maxParticipants"
            className="input-field"
            onChange={(e) => setParticipantsMax(e.target.value)}
            placeholder={t.maxParticipants}
            required={true}
          />
        </div>
        <div className="own-event-item">
          <h2>Nykyinen kuvaus:</h2>
          <p className="old-event-value">{event.Description}</p>
          <h3>Uusi kuvaus:</h3>
          <textarea
            type="description"
            value={description}
            name="description"
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.description}
          />
        </div>
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
