const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Router } = require("express")
const Users = require("../models/users")
const { Sequelize } = require("sequelize")

const userRouter = Router()

/**
 * Uuden käyttäjän rekisteröinti
 */
userRouter.post("/", async (req, res) => {
  const { username, password, role, email, location } = req.body
  if (password.length >= 5 && password.length <= 32) {
    // pituusvaatimus v0.1

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password, saltRounds)

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
  } else {
    res
      .status(400)
      .send({ error: `Invalid password length of ${password.length}` })
  }
}) // Rekisteröinti päättyy

module.exports = userRouter
