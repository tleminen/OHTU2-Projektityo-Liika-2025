import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUsername: (state, action) => {
      return action.payload
    },
    resetUsername() {
      return null
    },
  },
})

export const { setUsername, resetUsername } = userSlice.actions
export default userSlice.reducer
