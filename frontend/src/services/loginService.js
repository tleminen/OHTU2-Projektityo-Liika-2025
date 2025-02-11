import axios from "axios"
import { baseUrl } from "./utils"

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }
