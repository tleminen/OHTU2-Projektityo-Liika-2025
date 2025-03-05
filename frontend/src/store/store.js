import { configureStore } from "@reduxjs/toolkit"
import languageReducer from "./languageSlice"
import locationReducer from "./locationSlice"
import categoriesReducer from "./categoriesSlice"
import userReducer from "./userSlice"
import eventReducer from "./eventSlice"
import notificationReducer from "./notificationSlice"

export const store = configureStore({
  reducer: {
    language: languageReducer,
    location: locationReducer,
    categories: categoriesReducer,
    user: userReducer,
    event: eventReducer,
    notifications: notificationReducer,
  },
})

export default store
