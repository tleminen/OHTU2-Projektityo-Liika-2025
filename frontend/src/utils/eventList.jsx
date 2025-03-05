import { useEffect, useState } from "react"
import "./eventList.css"
import { useSelector } from "react-redux"
import eventService from "../services/eventService"
import { parseTimeAndDate } from "./helper"
import { Link } from "react-router-dom"

const EventList = (listType) => {
  const userID = useSelector((state) => state.user.user.userID)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      if (listType.listType === "created") {
        console.log("luodut!")
        try {
          const events = await eventService.getUserCreatedEvents(userID)
          if (events) {
            setEvents(events)
          }
          console.log(events)
        } catch (error) {
          console.error("Virhe haettaessa käyttäjän tapahtumia: " + error)
        }
      } else if (listType.listType === "joined") {
        console.log("liitytyt")
        try {
          const events = await eventService.getUserJoinedEvents(userID)
          if (events) {
            setEvents(events)
          }
        } catch (error) {
          console.error("Virhe haettaessa käyttäjän tapahtumia: " + error)
        }
      }
    }
    fetchEvents()
  }, [userID])

  const header = () => {
    if (listType.listType === "created") {
      return <h1>Luodut tapahtumat</h1>
    } else {
      return <h1>Liitytyt tapahtumat</h1>
    }
  }

  const parseLink = () => {
    if (listType.listType === "created") {
      return "/events/own/"
    } else {
      return "/events/"
    }
  }

  return (
    <div className="joined-view">
      <table className="event-container">
        <caption>{header()}</caption>
        <thead>
          <tr>
            <th>PVM</th>
            <th>AIKA</th>
            <th>Otsikko</th>
            <th>Osallistujia</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index} className="event-item">
              <th>
                <Link to={`${parseLink()}${event.EventID}`}>
                  {parseTimeAndDate(event.StartTime)[1].slice(0, -4)}
                </Link>
              </th>
              <th>
                <Link to={`${parseLink()}${event.EventID}`}>
                  {parseTimeAndDate(event.StartTime)[0]}
                </Link>
              </th>
              <th>
                <Link to={`${parseLink()}${event.EventID}`}>{event.Title}</Link>
              </th>
              <th>
                <Link to={`${parseLink()}${event.EventID}`}>
                  {event.JoinedCount}
                </Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventList
