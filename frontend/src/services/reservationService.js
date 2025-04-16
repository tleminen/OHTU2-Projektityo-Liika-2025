import axios from "axios"
import { baseUrl } from "./utils"

let token = null
const setToken = (storedToken) => {
    token = `bearer ${storedToken}`
}

const createReservationSystem = async (storedToken, parameters) => {
    setToken(storedToken)
    const headers = {
        headers: { Authorization: token }, // Asetetaan token headeriin
    }
    const response = await axios.post(baseUrl + "/reservation/create", parameters,
        headers)
    return response
}

// Hakee yksittäisen tapahtuman tiedot
const getReservationSystem = async (storedToken, parameters) => {
    setToken(storedToken)
    const headers = {
        headers: { Authorization: token }, // Asetetaan token headeriin
    }
    const response = await axios.post(
        baseUrl + "/reservation/get_single",
        parameters,
        headers
    )
    return response.data
}

const getReservationSystems = async (storedToken, parameters) => {
    setToken(storedToken)
    const headers = {
        headers: { Authorization: token }, // Asetetaan token headeriin
    }
    const response = await axios.post(
        baseUrl + "/reservation/get_list",
        parameters,
        headers
    )
    return response.data
}

export default { createReservationSystem, getReservationSystem, getReservationSystems }