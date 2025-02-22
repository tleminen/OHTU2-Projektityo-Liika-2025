import axios from "axios"
import { baseUrl } from "./utils"

const getCategories = async () => {
  const response = await axios.get(baseUrl + "/events/categories")
  return response.data
}

const getEvents = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/nearby", parameters)
  return response.data
}

const getEvent = async (parameters) => {
  const response = await axios.post(baseUrl + "/events/singleEvent", parameters)
  return response.data
}

const createEvent = async (parameters) => {
  const response = await axios.post(
    baseUrl + "/events/create_event",
    parameters
  )
  return response.data
}

export default { getCategories, getEvents, createEvent, getEvent }
