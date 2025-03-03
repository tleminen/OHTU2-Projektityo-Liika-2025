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

// Luo tapahtuman kirjautumattomalle käyttäjälle
const createEventUnSigned = async (parameters) => {
  console.log("tapahtuman luonti: " + parameters)
  const response = await axios.post(
    baseUrl + "/events/create_event_unsigned",
    parameters
  )
  return response.data
}

// Sähköpostivahvistus tapahtuman luonnissa kirjautumattomalle käyttäjälle
const createEventEmailSend = async (email) => {
  const respone = await axios.post(baseUrl+ "/events/sendEmail", email)
  return respone.data
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

const getEventTimes = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/event_times", parameters)
  return response.data
}

export default {
  getCategories,
  getEvents,
  createEvent,
  createEventUnSigned,
  joinEvent,
  getEvent,
  getJoined,
  leaveEvent,
  getEventTimes,
}
