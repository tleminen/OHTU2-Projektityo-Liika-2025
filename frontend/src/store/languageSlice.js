import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  language: localStorage.getItem("lang") || "fi",
}

const languageSlice = createSlice({
  name: "laguage",
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload
      localStorage.setItem("lang", action.payload)
    },
  },
})

export const { changeLanguage } = languageSlice.actions
export default languageSlice.reducer
