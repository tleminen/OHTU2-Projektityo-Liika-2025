const bcrypt = require("bcryptjs")
const { Router } = require("express")
const User = require("../models/users")

const userRouter = Router()

/**
 * Käyttäjän luonti
 */
userRouter.post("/", async (req, res) => {
  const { username, password, role, email } = req.body
  if (password.length >= 5 && password.length <= 32) {
    // pituusvaatimus v0.1

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password, saltRounds)

    try {
      const savedUser = await User.create({
        Username: username,
        Password: passwordhash,
        Role: role,
        Email: email,
      })
      res.status(201).json(savedUser)
    } catch (error) {
      console.log("PostgreSQL Error:", error)
      res.status(400).send({ error: `Error occured during user creation` })
    }
  } else {
    res
      .status(400)
      .send({ error: `Invalid password length of ${password.length}` })
  }
})

module.exports = userRouter
