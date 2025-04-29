import axios from "axios"
import { baseUrl } from "./utils"

let token = null
const setToken = (storedToken) => {
    token = `bearer ${storedToken}`
}

// Hakee aktiviteettikategoriat
const getSystemDescription = async (credentials) => {
    const response = await axios.post(baseUrl + "/translate/reservation_system/description", credentials)
    return response.data
}

// Hakee käännöksen
const getTranslation = async (storedToken, parameters) => {
    setToken(storedToken)
    const headers = {
        headers: { Authorization: token }, // Asetetaan token headeriin
    }
    const response = await axios.post(
        baseUrl + "/translate/",
        parameters,
        headers
    )
    return response.data
}

// Hakee käännöksen
const getTranslations = async (storedToken, parameters) => {
    setToken(storedToken)
    const headers = {
        headers: { Authorization: token }, // Asetetaan token headeriin
    }
    const response = await axios.post(
        baseUrl + "/translate/batch",
        parameters,
        headers
    )
    return response.data
}

export default { getSystemDescription, getTranslation, getTranslations }