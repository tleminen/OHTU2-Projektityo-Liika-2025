import { configureStore } from "@reduxjs/toolkit"
import languageReducer from "./languageSlice"
import locationReducer from "./locationSlice"
import categoriesReducer from "./categoriesSlice"
import userSlice from "./userSlice"

export const store = configureStore({
  reducer: {
    language: languageReducer,
    location: locationReducer,
    categories: categoriesReducer,
    user: userSlice,
  },
})

export default store
