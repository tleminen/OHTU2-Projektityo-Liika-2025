import { useSelector } from "react-redux"
import { useState } from "react"
import translations from "../../assets/translation.js"
import LocationMap from "../locationMap.jsx"

const CreateEventForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [activity, setActivity] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [minParticipants, setMinParticipants] = useState("")
  const [maxParticipants, setMaxParticipants] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Create event attempt:", {
      activity,
      date,
      time,
      location,
      minParticipants,
      maxParticipants,
      description,
    })
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={activity}
            name="activity"
            onChange={(e) => setActivity(e.target.value)}
            placeholder={t.activity}
          />
        </div>
        <div>
          <input
            type="date"
            value={date}
            name="dateAndTime"
            onChange={(e) => setDate(e.target.value)}
            placeholder={t.dateAndTime}
          />
        </div>
        <div>
          <input
            type="time"
            value={time}
            name="dateAndTime"
            onChange={(e) => setTime(e.target.value)}
            placeholder={t.dateAndTime}
          />
        </div>
        <div>
          <br />
          <h2 style={{ textAlign: "center" }}>{t.setEventLocationInfo}</h2>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>
        <div>
          <input
            type="number"
            value={minParticipants}
            name="minParticipants"
            onChange={(e) => setMinParticipants(e.target.value)}
            placeholder={t.minParticipants}
          />
        </div>
        <div>
          <input
            type="number"
            value={maxParticipants}
            name="maxParticipants"
            onChange={(e) => setMaxParticipants(e.target.value)}
            placeholder={t.maxParticipants}
          />
        </div>
        <div>
          <textarea
            type="description"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.description}
          />
        </div>
        <button type="submit">{t.createEvent}</button>
      </form>
    </div>
  )
}

export default CreateEventForm
