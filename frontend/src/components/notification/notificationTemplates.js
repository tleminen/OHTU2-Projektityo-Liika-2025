  const EmailSentSuccess = (t) => ({
    id: Date.now(),
    message: t,
    type: "success",
  })

  const EmailSentFailure = (t, error) => ({
    id: Date.now(),
    message: `${t}: ${error.message}`,
    type: "error",
  })

  const OtpRobotCheck = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",  
  })

  const OtpVerified = (t) => ({
    id: Date.now(),
    message: t,
    type: "success",
  })
  
  const OtpNotVerified = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",
  })
  
  const UserFailure = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",
  })


export {EmailSentSuccess, EmailSentFailure, OtpRobotCheck, OtpVerified, OtpNotVerified, UserFailure}
