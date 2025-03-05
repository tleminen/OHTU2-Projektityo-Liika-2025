const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Router } = require("express")
const Users = require("../models/users")
const { Sequelize, where, Op } = require("sequelize")

const userRouter = Router()

/**
 * Käyttäjän tietojen haku
 */
userRouter.post("/user", async (req, res) => {
  const { userID } = req.body

  try {
    const user = await Users.findOne({
      // Etsitään käyttäjä
      where: {
        UserID: userID,
      },
      attributes: ["UserID", "Username", "Email", "Location", "LanguageID"],
    })
    res.status(200).send({
      user,
    })
  } catch (error) {
    console.log("PostgreSQL Error:", error)
    res.status(400).send({ error: `User not found` })
  }
}) // Rekisteröinti päättyy

userRouter.post("/update/email", async (req, res) => {
  const { UserID, Email } = req.body

  try {
    const user = await Users.update(
      { Email: Email },
      { where: {UserID:UserID}}
    )
    console.log(user)
    if (!user) {
      res.status(500).json({error: "Internal server error"})
    }
    res.json(user)
  } catch (error) {
    console.error("Problems with updating email"+error)
    res.status(500).json({error: "Internal server error"})
  }
})

module.exports = userRouter

userRouter.post("/update/username", async (req, res) => {
  const { UserID, Username } = req.body

  try {
    const user = await Users.update(
      { Username: Username },
      { where: {UserID:UserID}}
    )
    console.log(user)
    if (!user) {
      res.status(500).json({error: "Internal server error"})
    }
    res.json(user)
  } catch (error) {
    console.error("Problems with updating email"+error)
    res.status(500).json({error: "Internal server error"})
  }
})

module.exports = userRouter

userRouter.post("/update/language", async (req, res) => {
  const { UserID, LanguageID } = req.body

  try {
    const user = await Users.update(
      { LanguageID: LanguageID },
      { where: {UserID:UserID}}
    )
    console.log(user)
    if (!user) {
      res.status(500).json({error: "Internal server error"})
    }
    res.json(user)
  } catch (error) {
    console.error("Problems with updating email"+error)
    res.status(500).json({error: "Internal server error"})
  }
})

module.exports = userRouter
