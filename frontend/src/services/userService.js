import axios from "axios"
import { baseUrl } from "./utils"

const getUserData = async (userID) => {
  const data = { userID: userID }
  const response = await axios.post(baseUrl + "/users/user", data)
  return response.data
}

export default { getUserData }
