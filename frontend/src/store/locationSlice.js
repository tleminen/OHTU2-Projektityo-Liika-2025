import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  location: /*localStorage.getItem("location") ||*/ {
    o_lat: 62.6013,
    o_lng: 29.7639,
    lat: 62.6013,
    lng: 29.7639,
    zoom: 10,
  },
}

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    changeLocation: (state, action) => {
      console.log("vaihdossa: ")
      console.log(action.payload)
      state.location = action.payload
      localStorage.setItem("location", action.payload)
    },
  },
})

export const { changeLocation } = locationSlice.actions
export default locationSlice.reducer
