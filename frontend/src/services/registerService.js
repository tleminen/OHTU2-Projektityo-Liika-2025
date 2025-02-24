import axios from "axios"
import { baseUrl } from "./utils"

const register = async (credentials) => {
  const response = await axios.post(baseUrl + "/register", credentials)
  return response.data
}

const sendOtp = async (email) => {
  console.log("SendEmail funktion email "+email)
  try {
      const response = await axios.post(baseUrl + "/register/sendOtp", { email })
      return response.data;
    } catch (error) {
      console.error("Virhe sähköpostin lähetyksessä:", error);
      throw error; // Heitetään virhe uudelleen, jotta komponentti voi käsitellä sen
    }
};

const verifyOtp = async (credentials) => {
  console.log("Credentials verifyotp: "+credentials)
  try {
      const response = await axios.post(baseUrl + "/register/verifyOtp", credentials)
      return response.data;
    } catch (error) {
      console.error("Virhe koodin vahvistuksessa:", error);
      throw error; // Heitetään virhe uudelleen, jotta komponentti voi käsitellä sen
    }
};

export default { register, sendOtp, verifyOtp }
