import React, { useState, useEffect } from "react"
import {
  DayPilotCalendar,
  DayPilotNavigator,
  DayPilot,
} from "@daypilot/daypilot-lite-react"
import "./calendar.css"
import reservationService from '../services/reservationService'
import { useSelector } from 'react-redux'
import translations from '../assets/translation'

const styles = {
  wrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px"
  },
  main: {
    flexGrow: "1",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    cursor: "pointer",
    color: "black",
  },
}

// eslint-disable-next-line react/prop-types
const DesktopCalendar = ({ field }) => {
  const date = new Date()
  const language = useSelector((state) => state.language.language)
  const storedToken = useSelector((state) => state.user?.user?.token ?? null)
  const userID = useSelector((state) => state.user?.user?.userID ?? null)
  const t = translations[language]
  const [loading, setLoading] = useState(true)
  const [calendar, setCalendar] = useState(null)
  const [startDate, setStartDate] = useState(date)
  const [events, setEvents] = useState([])
  const [selectedRange, setSelectedRange] = useState(null)

  const config = { //TODO: Edit ja delete varaus
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    timeFormat: "Clock24Hours",
    headerDateFormat: "dddd",
    weekStarts: 1,

    onTimeRangeSelected: (args) => {
      setSelectedRange({ start: args.start, end: args.end })
    },
    onEventClick: async (args) => {
      await editEvent(args.e)
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async (args) => {
            calendar.events.remove(args.source)
          },
        },
        {
          text: "Edit...",
          onClick: async (args) => {
            await editEvent(args.source)
          },
        },
      ],
    }),
    eventRender: (args) => {
      if (selectedRange && args.data.id === "selected-range") {
        args.data.backColor = styles.selectedHighlight.backgroundColor
        args.data.opacity = styles.selectedHighlight.opacity
      }
    },
  }

  useEffect(() => {// TODO: Hae tapahtumat
    // Alkuperäiset tapahtumat

    const initialEvents = [
      {
        id: 1,
        text: "Event 1",
        start: "2025-04-16T10:30:00",
        end: "2025-04-16T13:00:00",
      },
      {
        id: 2,
        text: "Event 2",
        start: "2025-04-17T09:30:00",
        end: "2025-04-17T11:30:00",
        backColor: "#6aa84f",
      },
      {
        id: 3,
        text: "Event 3",
        start: "2025-04-17T12:00:00",
        end: "2025-04-17T15:00:00",
        backColor: "#f1c232",
      },
    ]
    setEvents(initialEvents)
  }, [])

  useEffect(() => {
    // Päivitä korostusvalinta, kun selectedRange muuttuu
    if (selectedRange && calendar) {
      const startTime = selectedRange.start.toString("H:mm")
      const endTime = selectedRange.end.toString("H:mm")
      const highlightText = `${startTime} - ${endTime}`

      const highlightEvent = {
        id: "selected-range",
        start: selectedRange.start,
        end: selectedRange.end,
        text: highlightText,
        cssClass: "selected-highlight", // Voit myös käyttää CSS-luokkaa
        moveDisabled: true,
        resizeDisabled: true,
        clickDisabled: true,
      }
      const existingHighlight = calendar.events.find("selected-range")
      if (existingHighlight) {
        calendar.events.update(highlightEvent)
      } else {
        calendar.events.add(highlightEvent)
      }
    } else if (calendar) {
      calendar.events.remove("selected-range")
    }
  }, [selectedRange, calendar])

  const handleDoSlot = async () => {//TODO: Tallenna varaus tietokantaan
    if (selectedRange) {
      try {
        //TODO: Tallenna varaus tietokantaan
        const modal = await DayPilot.Modal.prompt("Create a new event..:")
        if (modal.result) {
          console.log(selectedRange)
          const response = await reservationService.createSlot(storedToken, {
            UserID: userID,
            Type: "Liika",
            StartTime: selectedRange.start.value,
            EndTime: selectedRange.end.value,
            Text: modal.result,
            SystemID: field.SystemID,
            FieldID: field.FieldID
          })
          console.log(response)

          calendar.events.add({
            start: selectedRange.start,
            end: selectedRange.end,
            id: DayPilot.guid(),
            text: modal.result,
          })
        }
        setSelectedRange(null)
      } catch (e) {
        console.error(e)
      }
    } else {
      alert("Please select a time range first.")
    }
  }

  const editEvent = async (e) => {
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text())
    if (!modal.result) {
      return
    }
    e.data.text = modal.result
    calendar.events.update(e)
  }

  return (
    <div style={styles.wrap}>
      <div>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={1}
          skipMonths={1}
          selectionDay={startDate}
          weekStarts={1}
          onTimeRangeSelected={(args) => {
            setStartDate(args.day)
          }}
        />
      </div>
      <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          events={events}
          startDate={startDate}
          controlRef={setCalendar}
        />
        {selectedRange && (
          <button style={styles.button} onClick={handleDoSlot}>
            Merkitse vuoro
          </button>
        )}
        {!selectedRange && <p>Valitse ensin aika kalenterista</p>}
      </div>
    </div>
  )
}

export default DesktopCalendar
