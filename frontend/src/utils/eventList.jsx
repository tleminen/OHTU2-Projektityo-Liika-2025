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
        const clubIds = clubs.map((club) => club.ClubID) // Tehdään taulukko clubIDitä
        const groupedEvents = clubIds.map((clubId) => {
          const club = clubs.find((c) => c.ClubID === clubId)
          return {
            club: {
              ClubID: clubId,
              clubName: club?.Name || "Tuntematon klubi",
            },
            events: clubEvents.filter((event) => event.ClubID === clubId),
          }
        })
        setClubEvents(groupedEvents)
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
                  <h2>{t.title}</h2>
                  {event.Title}
                </div>
                <div>
                  <h2>{t.time}</h2>
                  {parseTimeAndDate(event.StartTime)[1].slice(0, -4)} {""}
                  {parseTimeAndDate(event.StartTime)[0]}
                </div>

                <div>
                  <h2>{t.participants}</h2>
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
        {listType.listType === "created" && clubEvents[0] && (
          <div>
            {clubEvents.map(({ club, events }) => (
              <div key={club.ClubID} className="event-container">
                <div className="spacer-line"></div>
                <h1>{club.clubName}</h1>
                <div className="spacer-line"></div>
                <div className="event-list-items">
                  {events.length === 0 ? (
                    <p>{t.no_upcoming_events}</p>
                  ) : (
                    events.map((event, index) => (
                      <Link
                        to={`${parseLink()}${event.EventID}`}
                        key={index}
                        className="event-item-container"
                      >
                        <div className="event-item">
                          <div>
                            <em>{club.clubName}</em>
                            <h3>{t.title}</h3>
                            {event.Title}
                          </div>
                          <div>
                            <h3>{t.time}</h3>
                            {parseTimeAndDate(event.StartTime)[1].slice(
                              0,
                              -4
                            )}{" "}
                            {parseTimeAndDate(event.StartTime)[0]}
                          </div>
                          <div>
                            <h3>{t.participants}</h3>
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
                            className="event-view-icon"
                          />
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default EventList
