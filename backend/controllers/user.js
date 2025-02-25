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

module.exports = userRouter
