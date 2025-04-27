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

export default { getSystemDescription }