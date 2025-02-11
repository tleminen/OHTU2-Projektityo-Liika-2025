import axios from "axios"
import { baseUrl } from "./utils"

const register = async (credentials) => {
  const response = await axios.post(baseUrl + "/register", credentials)
  return response.data
}

export default { register }
