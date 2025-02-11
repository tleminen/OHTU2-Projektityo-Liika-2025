const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Router } = require("express")
const User = require("../models/users")

const loginRouter = Router()

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.Password)
    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: "invalid username or password",
      })
    }

    const userForToken = {
      username: user.Username,
      id: user.UserID,
    }

    console.log(JSON.stringify(userForToken))

    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
      expiresIn: "60d",
    })

    res.status(200).send({ token, username: user.Username })
  } catch (error) {
    console.log(error)
  }
})

module.exports = loginRouter
