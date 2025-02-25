import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  events: JSON.parse(localStorage.getItem("events")) || [],
}

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    changeEvents: (state, action) => {
      state.events = action.payload
      localStorage.setItem("events", JSON.stringify(state.events))
    },
  },
})

export const { changeEvents } = eventSlice.actions
export default eventSlice.reducer
