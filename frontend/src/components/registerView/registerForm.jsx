import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import translations from "../../assets/translation.js"
import { useNavigate } from "react-router-dom"
import registerService from "../../services/registerService.js"
import LocationMap from "../locationMap.jsx"
import "./register.css"
import { changeLocation } from "../../store/locationSlice.js"
import { changeUser } from "../../store/userSlice.js"
import { registerValidation } from "../../utils/validationSchemas.js"

const RegisterForm = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordAgain, setPasswordAgain] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordAgain, setShowPasswordAgain] = useState(false)
  const [location, setLocation] = useState()
  const [errors, setErrors] = useState({})
  const [otp, setOtp] = useState("") // OTP-tila
  const [otpSent, setOtpSent] = useState(false) // Tila OTP:n lähetyksen seuraamiseksi
  const [isOtpVerified, setIsOtpVerified] = useState(false) // Tila OTP:n vahvistuksen seuraamiseksi
  const [loader, setLoader] = useState(false)

  const schema = registerValidation()

  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
      const response = await registerService.sendOtp(email)
      console.log(response.data)
      alert(t.email_sent) //TODO: Kovakoodaus pois

      // Jos OTP lähetettiin onnistuneesti, päivitä tila
      setOtpSent(true)
      setLoader(false)
    } catch (error) {
      console.error("Virhe sähköpostin lähetyksessä:", error)
      alert(t.email_send_error) //TODO: Kovakoodaus pois
      setLoader(false)
    }
  }

  const verifyOtp = async () => {
    try {
      // Lähetä OTP backendille vahvistusta varten
      const response = await registerService.verifyOtp({ email, otp }) //TODO: backendiin otp vahvistus
      console.log(response.data)
      alert(t.email_confirmation) //TODO: kovakoodaus pois
      // Jos OTP on oikein, päivitä tila
      setIsOtpVerified(true)
    } catch (error) {
      // Käsittele virhe (esim. näytä virheilmoitus)
      console.error("Virhe OTP:n vahvistuksessa:", error)
      alert(t.otp_send_error) //TODO: kovakoodaus pois
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!isOtpVerified) {
      alert(t.opt_robot_check) //TODO: Kovakoodaus pois
    }

    try {
      await schema.validate(
        { username, email, password, passwordAgain, otp },
        { abortEarly: false }
      )
      setErrors({})
      console.log("Register attempt:", {
        username,
        email,
        password,
        passwordAgain,
        location,
        language, // KATSO MITÄ LÄHTEE
      })

      console.log("register attempt:", { username, password })
      try {
        const user = await registerService.register({
          username,
          email,
          password,
          role: 0,
          location,
          language,
        })
        console.log("token saatu:" + user.token)

        dispatch(
          changeUser({
            userID: user.userID,
            username: user.username,
            token: user.token,
            email: user.email,
          })
        )
        dispatch(
          changeLocation({
            o_lat: user.location[1],
            o_lng: user.location[0],
            lat: user.location[1],
            lng: user.location[0],
            zoom: 14,
          })
        ) // Kovakoodattu etäisyys

        navigate(`/`)
      } catch (error) {
        console.log(error)
      }
    } catch (err) {
      if (err.inner) {
        const errorMap = {}
        err.inner.forEach((error) => {
          errorMap[error.path] = error.message
        })
        setErrors(errorMap)

        console.log("Validation errors:", errorMap)
      }
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const togglePasswordVisibilityAgain = () => {
    setShowPasswordAgain(!showPasswordAgain)
  }

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text")
    const pasteArray = paste.split("").slice(0, 6) // Rajoitetaan 6 merkkiin

    setOtp(pasteArray.join("")) // Asetetaan koko OTP-arvo kerralla

    // Täytetään input-kentät ja siirretään focus viimeiseen
    pasteArray.forEach((value, index) => {
      if (otpInputRefs.current[index]) {
        otpInputRefs.current[index].value = value
      }
    })

    if (otpInputRefs.current[pasteArray.length - 1]) {
      otpInputRefs.current[pasteArray.length - 1].focus()
    }
  }

  return (
    <div className="register-form">
      <form onSubmit={handleSubmit}>
        <div>
          <h3>{t.username}</h3>
          <input
            ref={inputRef}
            type="text"
            className={`input-field ${errors.username ? "error" : ""}`}
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t.username}
            autoComplete="nickname"
          />
        </div>
        {errors.username && (
          <div className="error-forms">{errors.username}</div>
        )}
        <div>
          <h3>{t.email}</h3>
          <input
            type="text"
            className={`input-field ${errors.email ? "error" : ""}`}
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.email}
            autoComplete="email"
          />
        </div>
        {errors.email && <div className="error-forms">{errors.email}</div>}

        <h3>{t.password}</h3>
        <div className="password-input-container">
          <input
            type={showPassword ? "text" : "password"}
            className={`input-field ${errors.password ? "error" : ""}`}
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.password}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibility}
          >
            <span className="material-symbols-outlined">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        {errors.password && (
          <div className="error-forms">{errors.password}</div>
        )}
        <h3>{t.passwordAgain}</h3>
        <div className="password-input-container">
          <input
            type={showPasswordAgain ? "text" : "password"}
            className={`input-field ${errors.passwordAgain ? "error" : ""}`}
            value={passwordAgain}
            name="passwordAgain"
            onChange={(e) => setPasswordAgain(e.target.value)}
            placeholder={t.passwordAgain}
          />
          <button
            type="button"
            className="password-toggle-button"
            onClick={togglePasswordVisibilityAgain}
          >
            <span className="material-symbols-outlined">
              {showPasswordAgain ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
        {errors.passwordAgain && (
          <div className="error-forms">{errors.passwordAgain}</div>
        )}
        <div>
          <h3>{t.setStartLocationInfo}</h3>
          <LocationMap onLocationChange={handleLocationChange} />
        </div>

        {otpSent ? (
          isOtpVerified ? (
            <div>
              <h3>Sähköposti vahvistettu!</h3>
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

        <button type="submit" className="forms-btn">
          <span>{t.register}</span>
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
