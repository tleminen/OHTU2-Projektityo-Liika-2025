const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Router } = require("express")
const Users = require("../models/users")
const { Sequelize, where, Op } = require("sequelize")

const registerRouter = Router()

/**
 * Uuden käyttäjän rekisteröinti
 */
registerRouter.post("/", async (req, res) => {
  const { username, password, role, email, location, language } = req.body

  const existingUser = await Users.findOne({
    // Tarkastetaan ensin löytyykö jo sama käyttäjänimi tai sähköpostiosoite
    where: {
      [Op.or]: [{ Username: username }, { Email: email }],
    },
  })

  if (existingUser) {
    if (existingUser.Username === username) {
      return res.status(400).json({ message: "Käyttäjänimi on jo käytössä" })
    }
    if (existingUser.Email === email) {
      return res.status(400).json({ message: "Sähköposti on jo käytössä" })
    }
  }

  const saltRounds = 10
  const passwordhash = await bcrypt.hash(password, saltRounds)

  console.log("nyt lokaatioksi saatu; " + location)
  try {
    const savedUser = await Users.create({
      // Uuden käyttäjän rekisteröinti
      Username: username,
      Password: passwordhash,
      Role: role,
      Email: email,
      Location: Sequelize.fn(
        "ST_SetSRID",
        Sequelize.fn("ST_MakePoint", location.lng, location.lat),
        4326
      ),
      LanguageID: language,
    })

    const userForToken = {
      // Luodaan tokeni käyttäjänimen ja id:n mukaan
      username: savedUser.Username,
      id: savedUser.UserID,
    }

    console.log(JSON.stringify(userForToken))
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      // Luodaan tokeni uudelle käyttäjälle heti
      expiresIn: "60d",
    })
    res.status(200).send({
      token,
      username: savedUser.Username,
      location: [location.lng, location.lat],
    })
  } catch (error) {
    console.log("PostgreSQL Error:", error)
    res.status(400).send({ error: `Error occured during user creation` })
  }
}) // Rekisteröinti päättyy

module.exports = registerRouter
