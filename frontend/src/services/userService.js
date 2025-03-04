import axios from "axios"
import { baseUrl } from "./utils"

// Hakee käyttäjän tiedot
const getUserData = async (userID) => {
  const data = { userID: userID }
  const response = await axios.post(baseUrl + "/users/user", data)
  return response.data
}

const updateUserEmail = async (parameters) => {
  const response = await axios.post(baseUrl + "/users/update/email", parameters)
  return response.data
}

const updateUserUsername = async (parameters) => {
  const response = await axios.post(baseUrl + "/users/update/username", parameters)
  return response.data
}

const updateUserLanguage = async (parameters) => {
  const response = await axios.post(baseUrl + "/users/update/language", parameters)
  return response.data
}

export default { getUserData, updateUserEmail,updateUserUsername, updateUserLanguage }
