import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import translations from "../assets/translation.js"
import "../components/registerView/register.css"
import eventService from "../services/eventService.js"

const SendEmail = ({ setIsOtpVerifiedFromParent, email }) => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState("") // OTP-tila
  const [otpSent, setOtpSent] = useState(false) // Tila OTP:n lähetyksen seuraamiseksi
  const [isOtpVerified, setIsOtpVerified] = useState(false) // Tila OTP:n vahvistuksen seuraamiseksi
  const [loader, setLoader] = useState(false)


  const otpInputRefs = useRef([]) // Luo ref-taulukko

  useEffect(() => {
    otpInputRefs.current = otpInputRefs.current.slice(0, 6) // Varmista, että ref-taulukko on oikean kokoinen
  }, [])

  const handleOtpChange = (index, value) => {
    const newOtp = otp.split("")
    newOtp[index] = value
    setOtp(newOtp.join(""))

    // Siirrä kohdistus seuraavaan kenttään, jos kentässä on arvo
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const sendOtp = async () => {
    setLoader(true)
    try {
      console.log("email: "+email)
      const response = await eventService.createEventEmailSend(email)
      console.log(response.data)
      alert(t.email_sent)

      // Jos OTP lähetettiin onnistuneesti, päivitä tila
      setOtpSent(true)
      setLoader(false)
    } catch (error) {
      console.error("Virhe sähköpostin lähetyksessä:", error)
      alert(t.email_send_error)
      setLoader(false)
    }
  }

  const verifyOtp = async () => {
    try {
      // Lähetä OTP backendille vahvistusta varten
      const response = await eventService.createEventVerifyOtp({ email, otp }) //TODO: backendiin otp vahvistus
      console.log(response.data)
      alert(t.email_confirmation)
      // Jos OTP on oikein, päivitä tila
      setIsOtpVerified(true)
      setIsOtpVerifiedFromParent(true);
    } catch (error) {
      // Käsittele virhe (esim. näytä virheilmoitus)
      console.error("Virhe OTP:n vahvistuksessa:", error)
      alert(t.otp_send_error)
    }
  }

  return (
    <div>
      {otpSent ? (
        isOtpVerified ? (
          <div>
            <img
              src={"/checkCropped.png"}
              alt="check"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <div>
            <h3>{t.otp_sent}</h3>{" "}
            <div className="otp-input-container" onPaste={handlePaste}>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={`otp-input ${errors.otp ? "error" : ""}`}
                  value={otp[index] || ""}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={(el) => (otpInputRefs.current[index] = el)} // Aseta ref
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[index]) {
                      if (index > 0) {
                        otpInputRefs.current[index - 1]?.focus()
                      }
                    } else if (e.key === "ArrowLeft" && index > 0) {
                      otpInputRefs.current[index - 1]?.focus()
                    } else if (e.key === "ArrowRight" && index < 5) {
                      otpInputRefs.current[index + 1]?.focus()
                    }
                  }}
                />
              ))}
            </div>
            {errors.otp && <div className="error-forms">{errors.otp}</div>}
            <button type="button" onClick={verifyOtp} className="btn">
              {t.confirm}
            </button>
          </div>
        )
      ) : (
        <div>
          <h3>{t.opt_robot_check}</h3>
          <h4>{t.otp_insert}</h4>
          {loader ? (
            <div className="loader"></div>
          ) : (
            <button
              type="button"
              onClick={sendOtp}
              disabled={!email}
              className="btn"
            >
              {t.send}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default SendEmail
