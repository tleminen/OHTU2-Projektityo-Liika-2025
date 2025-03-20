import { useEffect, useState } from "react"
import "./eventList.css"
import { useSelector } from "react-redux"
import eventService from "../services/eventService"
import { parseTimeAndDate } from "./helper"
import { Link } from "react-router-dom"

import translations from "../assets/translation"
import { selectCategoryName } from "../assets/icons"

const EventList = (listType) => {
  const userID = useSelector((state) => state.user.user.userID)
  const clubs = useSelector((state) => state.user.user.clubs)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [events, setEvents] = useState([])
  const [clubEvents, setClubEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      if (listType.listType === "created") {
        try {
          const events = await eventService.getUserCreatedEvents(
            storedToken,
            userID
          )
          if (events) {
            setEvents(events)
          }
        } catch (error) {
          console.error("Virhe haettaessa käyttäjän tapahtumia: " + error)
        }
        // TODO: Hae käyttäjän clubiroolin tapahtumat
        const clubEvents = await eventService.getClubCreatedEvents(
          storedToken,
          { UserID: userID, Clubs: clubs }
        )
        setClubEvents(clubEvents)
      } else if (listType.listType === "joined") {
        try {
          const events = await eventService.getUserJoinedEvents(
            storedToken,
            userID
          )
          if (events) {
            setEvents(events)
          }
        } catch (error) {
          console.error("Virhe haettaessa käyttäjän tapahtumia: " + error)
        }
      }
    }
    fetchEvents()
  }, [userID, storedToken, listType])

  const header = () => {
    if (listType.listType === "created") {
      return <h1 className="h1-resizeable">{t.createdEvents}:</h1>
    } else {
      return <h1 className="h1-resizeable">{t.joinedEvents}:</h1>
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
      <div className="event-container">
        {header()}

        <div className="event-list-items">
          {events.map((event, index) => (
            <Link
              to={`${parseLink()}${event.EventID}`}
              key={index}
              className="event-item-container"
            >
              <div className="event-item">
                <div>
                  <h2>Otsikko</h2>
                  {event.Title}
                </div>
                <div>
                  <h2>Aika</h2>
                  {parseTimeAndDate(event.StartTime)[1].slice(0, -4)} {""}
                  {parseTimeAndDate(event.StartTime)[0]}
                </div>

                <div>
                  <h2>Osallistujat</h2>
                  {event.JoinedCount}
                </div>
              </div>

              <div className="event-item">
                <img
                  src={`/lajit/${selectCategoryName([event.CategoryID])}.png`}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="event-view-icon" // Ei taida toimia tää className??
                />
              </div>
            </Link>
          ))}
        </div>
        {listType.listType === "created" && (
          <div className="event-container">
            <h1>Yhteistyö</h1>
            <div className="event-list-items">
              {clubEvents.map((event, index) => (
                <Link
                  to={`${parseLink()}${event.EventID}`}
                  key={index}
                  className="event-item-container"
                >
                  <div className="event-item">
                    <div>
                      <h2>Otsikko</h2>
                      {event.Title}
                    </div>
                    <div>
                      <h2>Aika</h2>
                      {parseTimeAndDate(event.StartTime)[1].slice(0, -4)} {""}
                      {parseTimeAndDate(event.StartTime)[0]}
                    </div>

                    <div>
                      <h2>Osallistujat</h2>
                      {event.JoinedCount}
                    </div>
                  </div>

                  <div className="event-item">
                    <img
                      src={`/lajit/${selectCategoryName([
                        event.CategoryID,
                      ])}.png`}
                      alt="Logo"
                      width={100}
                      height={100}
                      className="event-view-icon" // Ei taida toimia tää className??
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList
