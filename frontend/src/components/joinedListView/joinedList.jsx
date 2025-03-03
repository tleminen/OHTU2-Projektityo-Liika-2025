import { useEffect, useState } from "react"
import "./joinedView.css"
import { useSelector } from "react-redux"
import eventService from "../../services/eventService"
import { parseTimeAndDate } from "../../utils/helper"

const JoinedList = () => {
  const userID = useSelector((state) => state.user.user.userID)
  const [joinedEvents, setJoinedEvents] = useState([])

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        const events = await eventService.getUserJoinedEvents(userID)
        setJoinedEvents(events)
      } catch (error) {
        console.error("Virhe haettaessa käyttäjän tapahtumia: " + error)
      }
    }

    fetchJoinedEvents()
  }, [userID])

  const handleLeave = (EventID) => {
    console.log("Poistu tapahtumasta" + EventID)
  }

  const handleOnClickEvent = (EventID) => {
    console.log("painettiin" + EventID)
  }

  console.log(userID)
  console.log(joinedEvents)
  return (
    <div className="joined-view">
      <table className="event-container">
        <caption>
          <h1>Liitytyt tapahtumat</h1>
        </caption>
        <thead>
          <tr>
            <th>PVM</th>
            <th>AIKA</th>
            <th>Otsikko</th>
            <th>Osallistujia</th>
            <th>Poistu tapahtumasta</th>
          </tr>
        </thead>
        <tbody>
          {joinedEvents.map((event, index) => (
            <tr key={index} className="event-item">
              <th onClick={() => handleOnClickEvent(event.EventID)}>
                {parseTimeAndDate(event.StartTime)[1]}
              </th>
              <th onClick={() => handleOnClickEvent(event.EventID)}>
                {parseTimeAndDate(event.StartTime)[0]}
              </th>
              <th onClick={() => handleOnClickEvent(event.EventID)}>
                {event.Title}
              </th>
              <th onClick={() => handleOnClickEvent(event.EventID)}>
                {event.JoinedCount}
              </th>
              <th>
                <button onClick={() => handleLeave(event.EventID)}>Eroa</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JoinedList
