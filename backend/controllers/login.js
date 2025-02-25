const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const { Router } = require("express")
const User = require("../models/users")
const { sendEmail } = require("../services/email") // Tuo sendEmail-funktio

const loginRouter = Router()

// Kirjautuminen
loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  console.log(" req body username: " + username)
  try {
    const user = await User.findOne({
      where: {
        Username: username,
      },
    })
    console.log("Tietokannasta user: " + user)
    console.log("salasana: " + password)
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.Password)
    console.log("Salasana on true/false = " + passwordCorrect)
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      })
    }

    const userForToken = {
      username: user.Username,
      id: user.UserID,
    }

    console.log("JSON: " + JSON.stringify(userForToken))

    console.log(user)

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: "60d",
    })

    res.status(200).send({
      token,
      userID: user.UserID,
      username: user.Username,
      location: user.Location.coordinates,
      email: user.Email,
      language: "FI", // Kovakoodattu, laita kyselyyn populate with language jotenkin
    })
  } catch (error) {
    console.log(error)
  }
}) // Kirjautuminen päättyy

// Reitti salasanan palauttamiseen
loginRouter.post("/sendEmail", async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ where: { Email: email } })
    if (!user) {
      return res.status(404).json({ message: "Sähköpostia ei löydy." })
    }

    // 1. Luodaan kertakäyttöinen salasana
    const tempPassword = Math.random().toString(36).slice(2)
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10)

    // 2. Tallennetaan kertakäyttöinen salasana tietokantaan
    user.Password = hashedTempPassword
    await user.save()

    const success = await sendEmail(
      email,
      "Salasanan palautus",
      `Kertakäyttöinen salasanasi on: ${tempPassword}\n\nKäytä tätä salasanaa kirjautuessasi sisään. Muista vaihtaa salasanasi heti kirjautumisen jälkeen.`
    )

    if (success) {
      res.status(200).json({ message: "Sähköposti lähetetty!" })
    } else {
      res.status(500).json({ message: "Sähköpostin lähetys epäonnistui." })
    }
  } catch (error) {
    console.error("Virhe:", error)
    res.status(500).json({ message: "Sähköpostin lähetys epäonnistui." })
  }
}) // Salasanan palauttaminen päättyy

module.exports = loginRouter
