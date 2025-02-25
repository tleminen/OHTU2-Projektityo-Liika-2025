import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // Localstorage on string-muotoinen, siksi stringify ja parse
  location: JSON.parse(localStorage.getItem("user")) || {
    userID: null,
    username: null,
    token: null,
    email: null,
  },
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (state, action) => {
      console.log(action.payload)
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    loadUserFromStorage: (state) => {
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser) {
        state.user = storedUser
      }
    },
  },
})

export const { changeUser, loadUserFromStorage } = userSlice.actions
export default userSlice.reducer
