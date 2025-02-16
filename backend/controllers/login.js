const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
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

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: "60d",
    })

    res.status(200).send({ token, username: user.Username })
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
    const success = await sendEmail(
      email,
      "Salasanan palautus",
      "Linkki salasanan palauttamiseen: [Linkki]"
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
