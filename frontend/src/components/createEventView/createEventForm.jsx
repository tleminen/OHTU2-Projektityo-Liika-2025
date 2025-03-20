import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import translations from "../../assets/translation.js"
import LocationMap from "../locationMap.jsx"
import "./createEvent.css"
import Select from "react-select"
import eventService from "../../services/eventService.js"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker"
import SendEmail from "../../utils/sendEmail.jsx"
import { selectCategoryName } from "../../assets/icons.js"

const CreateEventForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const navigate = useNavigate()
  const [activity, setActivity] = useState({})
  const [dates, setDates] = useState([])
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [event_location, setEventLocation] = useState("")
  const [title, setTitle] = useState("")
  const [participantsMin, setParticipantsMin] = useState("")
  const [participantsMax, setParticipantsMax] = useState("")
  const [description, setDescription] = useState("")
  const [email, setEmail] = useState("")
  const [isOtpVerified, setIsOtpVerified] = useState(false)
  const [blockRegister, setBlockCreate] = useState(true)
  const userID = useSelector((state) => state.user?.user?.userID ?? null)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const handleSubmit = (event) => {
    const categoryID = activity.value
    event.preventDefault()

    if (!isOtpVerified) {
      alert(t.opt_robot_check)
    }

    try {
      eventService.createEvent(storedToken, {
        title,
        userID,
        categoryID,
        dates,
        startTime,
        endTime,
        event_location,
        participantsMin,
        participantsMax,
        description,
      })
    } catch (error) {
      console.error("Erron while creating event: " + error)
    }

    navigate(`/map`)
  }

  const handleLocationChange = (newLocation) => {
    setEventLocation(newLocation)
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

  const handleChange = (selectedOption) => {
    setActivity(selectedOption)
  }

  const handleSubmitUnSigned = (event) => {
    const categoryID = activity.value
    event.preventDefault()

    try {
      eventService.createEventUnSigned({
        // TODO: Tee varmennus, että kyselyn tekijä on sama joka varmensi emailin
        title,
        categoryID,
        dates,
        startTime,
        endTime,
        event_location,
        participantsMin,
        participantsMax,
        description,
        email,
      })
    } catch (error) {
      console.error("Erron while creating event (unsigned): " + error)
    }
    navigate(`/map`)
  }

  if (!userID) {
    // Ei-kirjautuneen käyttäjän näkymä
    return (
      <div className="create-event-form">
        <div className="form-item">
          <h3>{t.title}</h3>
          <input
            type="text"
            value={title}
            placeholder={t.title}
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
        <div className="form-item">
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
        <div className="form-item">
          <h3>{t.date}</h3>
          <DatePicker
            value={dates}
            sort
            onChange={setDates}
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
        <div className="form-item">
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
        </div>
        <div className="form-item">
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
        <div className="form-item">
          <br />
          <h3>{t.setEventLocationInfo}</h3>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div className="form-item">
          <h3>{t.minParticipants}</h3>
          <input
            type="number"
            value={participantsMin}
            name="minParticipants"
            className="input-field"
            onChange={(e) => setParticipantsMin(e.target.value)}
            placeholder={t.minParticipants}
            required={true}
          />
        </div>
        <div className="form-item">
          <h3>{t.maxParticipants}</h3>
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
        <div className="form-item">
          <h3>{t.description}</h3>
          <textarea
            type="description"
            value={description}
            name="description"
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.description}
          />
        </div>
        <div className="form-item">
          <h3>{t.email}</h3>
          <input
            type="text"
            value={email}
            name="email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            required={true}
          />
        </div>

        <div>
          <SendEmail
            setIsOtpVerifiedFromParent={setIsOtpVerified}
            email={email}
            setDisableButton={setBlockCreate}
          />
        </div>

        <button
          className={`forms-btn`}
          disabled={blockRegister}
          onClick={handleSubmitUnSigned}
        >
          <span>{t.createEvent}</span>
        </button>
      </div>
    )
  }

  return (
    // Kirjautuneen käyttäjän näkymä
    <div className="create-event-form">
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <h3>{t.title}</h3>
          <input
            type="text"
            value={title}
            placeholder={t.title}
            className="input-field"
            onChange={(e) => setTitle(e.target.value)}
            required={true}
          />
        </div>
        <div className="form-item">
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
        <div className="form-item">
          <h3>{t.date}</h3>
          <DatePicker
            value={dates}
            sort
            onChange={setDates}
            multiple
            style={{ textAlign: "center" }}
            minDate={yesterday}
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
        <div className="form-item">
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
        </div>
        <div className="form-item">
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
        <div className="form-item">
          <h3>{t.setEventLocationInfo}</h3>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div className="form-item">
          <h3>{t.minParticipants}</h3>
          <input
            type="number"
            value={participantsMin}
            name="minParticipants"
            className="input-field"
            onChange={(e) => setParticipantsMin(e.target.value)}
            placeholder={t.minParticipants}
            required={true}
          />
        </div>
        <div className="form-item">
          <h3>{t.maxParticipants}</h3>
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
        <div className="form-item">
          <h3>{t.description}</h3>
          <textarea
            type="description"
            value={description}
            name="description"
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.description}
          />
        </div>
        <button className={`forms-btn`} onClick={handleSubmit}>
          <span>{t.createEvent}</span>
        </button>
      </form>
    </div>
  )
}

export default CreateEventForm
