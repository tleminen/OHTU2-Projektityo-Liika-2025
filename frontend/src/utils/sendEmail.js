const sendOtp = async (parameters) => {
    setLoader(true)
    try {
      const response = await parameters.sendOtp(email)
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

  const verifyOtp = async (parameters) => {
    try {
      // Lähetä OTP backendille vahvistusta varten
      const response = await parameters.verifyOtp({ email, otp }) //TODO: backendiin otp vahvistus
      console.log(response.data)
      alert(t.email_confirmation)
      // Jos OTP on oikein, päivitä tila
      setIsOtpVerified(true)
    } catch (error) {
      // Käsittele virhe (esim. näytä virheilmoitus)
      console.error("Virhe OTP:n vahvistuksessa:", error)
      alert(t.otp_send_error)
    }
  }

 export {sendOtp, verifyOtp}