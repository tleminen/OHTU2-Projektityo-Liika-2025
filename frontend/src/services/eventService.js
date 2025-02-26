import axios from "axios"
import { baseUrl } from "./utils"

// Hakee aktiviteettikategoriat
const getCategories = async () => {
  const response = await axios.get(baseUrl + "/events/categories")
  return response.data
}

// Hakee tapahtumat lähistölä (kartta)
const getEvents = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/nearby", parameters)
  return response.data
}

// Hakee yksittäisen tapahtuman tiedot
const getEvent = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/singleEvent", parameters)
  return response.data
}

// Luo tapahtuman
const createEvent = async (parameters) => {
  const response = await axios.post(
    baseUrl + "/events/create_event",
    parameters
  )
  return response.data
}

// Liittyy tapahtumaan
const joinEvent = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/join_event", parameters)
  return response.data
}

// Poistuu tapahtumasta
const leaveEvent = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/leave_event", parameters)
  return response.data
}

// Hakee käyttäjän liitytyt tapahtumat
const getJoined = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/joined", parameters)
  return response.data
}

export default {
  getCategories,
  getEvents,
  createEvent,
  joinEvent,
  getEvent,
  getJoined,
  leaveEvent,
}
