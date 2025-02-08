const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { Router } = require("express")
const User = require("../models/users")

const loginRouter = Router()

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(User && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: "1h",
  })

  res.status(200).send({ token, username: user.username })
})

module.exports = loginRouter
