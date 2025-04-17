import React, { useState, useEffect } from "react"
import {
  DayPilotCalendar,
  DayPilotNavigator,
  DayPilot,
} from "@daypilot/daypilot-lite-react"
import "./calendar.css"

const styles = {
  wrap: {
    display: "flex",
  },
  left: {
    marginRight: "10px",
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

const Calendar = () => {
  const date = new Date()
  const [calendar, setCalendar] = useState(null)
  const [startDate, setStartDate] = useState(date)
  const [events, setEvents] = useState([])
  const [selectedRange, setSelectedRange] = useState(null)

  const config = {
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    timeFormat: "Clock24Hours",

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
          text: "-",
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

  useEffect(() => {
    // Alkuperäiset tapahtumat
    const initialEvents = [
      {
        id: 1,
        text: "Event 1",
        start: "2025-04-16T10:30:00",
        end: "2025-04-16T13:00:00",
        participants: 2,
      },
      {
        id: 2,
        text: "Event 2",
        start: "2025-04-17T09:30:00",
        end: "2025-04-17T11:30:00",
        backColor: "#6aa84f",
        participants: 1,
      },
      {
        id: 3,
        text: "Event 3",
        start: "2025-04-17T12:00:00",
        end: "2025-04-17T15:00:00",
        backColor: "#f1c232",
        participants: 3,
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

  const handleVaraaClick = async () => {
    if (selectedRange) {
      const modal = await DayPilot.Modal.prompt("Create a new event..:")
      if (modal.result) {
        calendar.events.add({
          start: selectedRange.start,
          end: selectedRange.end,
          id: DayPilot.guid(),
          text: modal.result,
        })
      }
      setSelectedRange(null)
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
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={1}
          skipMonths={1}
          selectionDay={startDate}
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
          <button style={styles.button} onClick={handleVaraaClick}>
            Varaa
          </button>
        )}
        {!selectedRange && <p>Valitse ensin aika kalenterista</p>}
      </div>
    </div>
  )
}

export default Calendar
