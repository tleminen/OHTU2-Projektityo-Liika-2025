
const EmailSentSuccess = () => ({
  id: Date.now(),
  message: "Sähköposti lähetetty onnistuneesti!",
  type: "success",
})

const EmailSentFailure = (error) => ({
  id: Date.now(),
  message: `Sähköpostin lähetys epäonnistui: ${error.message}`,
  type: "error",
})

export {EmailSentSuccess, EmailSentFailure}
