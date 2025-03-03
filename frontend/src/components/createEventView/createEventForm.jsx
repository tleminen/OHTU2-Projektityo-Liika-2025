import { useSelector } from "react-redux"
import { useState } from "react"
import translations from "../../assets/translation.js"
import LocationMap from "../locationMap.jsx"
import "./createEvent.css"
import Select from "react-select"
import eventService from "../../services/eventService.js"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-multi-date-picker"

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
  const userID = useSelector((state) => state.user?.user?.userID ?? null) // Tälleen saa hienosti kokeiltua onko undefined ja jos on nii chain-kysely jatkuu

  const handleSubmit = (event) => {
    const categoryID = activity.value
    event.preventDefault()

    try {
      eventService.createEvent({
        title,
        userID,
        categoryID,
        dates, // FIKSAA TÄÄLTÄ AINAKIN
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
        label: cat.Category,
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
    return (
      <div className="create-event-form">
        <form onSubmit={handleSubmitUnSigned}>
          <div>
            <div>
              <h3>{t.title}</h3>
              <input
                type="text"
                value={title}
                className="input-field"
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
            </div>
            <div>
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
          </div>
          <div>
            <h3>{t.date}</h3>
            <DatePicker
              value={dates}
              onChange={(newDates) =>
                setDates(
                  [...newDates].sort((a, b) => new Date(a) - new Date(b))
                )
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
            />
          </div>
          <div>
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
          <div>
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
          <div>
            <br />
            <h3>{t.setEventLocationInfo}</h3>
            <LocationMap onLocationChange={handleLocationChange} />
          </div>
          <div>
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
          <div>
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
          <div>
            <textarea
              type="description"
              value={description}
              name="description"
              className="input-field"
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t.description}
            />
          </div>
          <input
            type="text"
            value={email}
            name="email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            required={true}
          />

          <button type="submit" style={{ margin: "auto" }}>
            {t.createEvent}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="create-event-form">
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <h3>{t.title}</h3>
            <input
              type="text"
              value={title}
              className="input-field"
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div>
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
        </div>
        <div>
          <h3>{t.date}</h3>
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
          />
        </div>
        <div>
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
        <div>
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
        <div>
          <br />
          <h3>{t.setEventLocationInfo}</h3>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div>
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
        <div>
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
        <div>
          <textarea
            type="description"
            value={description}
            name="description"
            className="input-field"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.description}
          />
        </div>
        <button type="submit" style={{ margin: "auto" }}>
          {t.createEvent}
        </button>
      </form>
    </div>
  )
}

export default CreateEventForm
