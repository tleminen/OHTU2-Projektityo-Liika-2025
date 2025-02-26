import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  events: JSON.parse(localStorage.getItem("events")) || [],
}

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload
      localStorage.setItem("events", JSON.stringify(state.events))
    },

    // Lisätään yksi tapahtuma, jos sitä ei ole vielä listassa
    addEvent: (state, action) => {
      const eventExists = state.events.some(
        (event) => event.EventID === action.payload.EventID
      )
      if (!eventExists) {
        state.events.push(action.payload)
        localStorage.setItem("events", JSON.stringify(state.events))
      }
    },

    // Poistetaan tapahtuma EventID:n perusteella
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.EventID !== action.payload.EventID
      )
      localStorage.setItem("events", JSON.stringify(state.events))
    },
  },
})

export const { setEvents, addEvent, removeEvent } = eventSlice.actions
export default eventSlice.reducer
