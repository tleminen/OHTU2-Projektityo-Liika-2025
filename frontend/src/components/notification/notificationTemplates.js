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

  const EventNotFound = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",
  })
  
  const EventJoinSuccess = (t) => ({ 
    id: Date.now(),
    message: t,
    type: "success",
  })

  const EventJoinFailure = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",
  })

  const EventCreated = (t) => ({
    id: Date.now(),
    message: t,
    type: "success",
  })

  const EventDeletionWarning = (t) => ({
    id: Date.now(),
    message: t,
    type: "warning",
  })

  const EventDeletionFailure = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",
  })


  const EventLeaveSuccess = (t) => ({
    id: Date.now(),
    message: t,
    type: "success",
  })

  const EventLeaveFailure = (t) => ({
    id: Date.now(),
    message: t,
    type: "error",
  })

  


export {EmailSentSuccess, EmailSentFailure, OtpRobotCheck, OtpVerified, OtpNotVerified, UserFailure, EventNotFound, EventCreated, EventJoinSuccess, EventJoinFailure, EventDeletionWarning, EventDeletionFailure, EventLeaveSuccess, EventLeaveFailure}
