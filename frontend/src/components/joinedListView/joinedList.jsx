import { useEffect, useState } from "react"
import "./joinedView.css"
import { useSelector } from "react-redux"
import eventService from "../../services/eventService"
import { parseTimeAndDate } from "../../utils/helper"
import { Link } from "react-router-dom"

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
          </tr>
        </thead>
        <tbody>
          {joinedEvents.map((event, index) => (
            <tr key={index} className="event-item">
              <th>
                <Link to={`/events/${event.EventID}`}>
                  {parseTimeAndDate(event.StartTime)[1].slice(0, -4)}
                </Link>
              </th>
              <th>
                <Link to={`/events/${event.EventID}`}>
                  {parseTimeAndDate(event.StartTime)[0]}
                </Link>
              </th>
              <th>
                <Link to={`/events/${event.EventID}`}>{event.Title}</Link>
              </th>
              <th>
                <Link to={`/events/${event.EventID}`}>{event.JoinedCount}</Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default JoinedList
