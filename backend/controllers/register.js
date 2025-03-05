const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Router } = require("express")
const Users = require("../models/users")
const { Sequelize, where, Op } = require("sequelize")
const { sendEmail } = require("../services/email") // Tuo sendEmail-funktio

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
      userID: savedUser.UserID,
      email: savedUser.Email,
      location: [location.lng, location.lat],
    })
  } catch (error) {
    console.log("PostgreSQL Error:", error)
    res.status(400).send({ error: `Error occured during user creation` })
  }
}) // Rekisteröinti päättyy

//Vahvistuskoodin luominen
const generateVerificationCode = () => {
  let code = ""
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10).toString()
  }
  return code
}

const verificationCodes = new Map() //----VOIDAAN VAIHTAA TIETOKANTAAN JOS HALUTAAN----

//Vahvistuskoodin lähetys sähköpostiin
registerRouter.post("/sendOtp", async (req, res) => {
  const { email } = req.body

  try {
    const verificationCode = generateVerificationCode()

    const success = await sendEmail(
      email,
      "Sähköpostin vahvistus",
      `Vahvistuskoodisi on: ${verificationCode}`
    )

    if (success) {
      res.status(200).json({ message: "Sähköposti lähetetty!" })

      verificationCodes.set(email, verificationCode) // Tallennetaan koodi karttaan sähköpostiosoitteen perusteella
    } else {
      res.status(500).json({ message: "Sähköpostin lähetys epäonnistui." })
    }
  } catch (error) {
    console.error("Virhe:", error)
    res.status(500).json({ message: "Sähköpostin lähetys epäonnistui." })
  }
})
//Vahvistuskoodin lähetys sähköpostiin päättyy

//Vahvistuskoodin vertailu

registerRouter.post("/verifyOtp", async (req, res) => {
  //const testCode = "123456"

  const { email, otp } = req.body
  console.log("VerifyOtp rq body : " + req.body)

  //verificationCodes.set(email, testCode);

  try {
    const storedCode = verificationCodes.get(email) //Hae tallennettu koodi

    console.log("storeCode: " + storedCode)

    if (!storedCode) {
      return res.status(400).json({ message: "Vahvistuskoodi ei löytynyt." })
    }

    if (storedCode === otp) {
      verificationCodes.delete(email) //Poistetaan koodi, kun se on vahvistettu
      res.status(200).json({ message: "Vahvistuskoodi oikein!" })
    } else {
      res.status(400).json({ message: "Vahvistuskoodi on virheellinen." })
    }
  } catch (error) {
    console.error("Virhe:", error)
    res.status(500).json({ message: "Vahvistus epäonnistui." })
  }
})

//Vahvistuskoodin vertailu päättyy
//..

module.exports = registerRouter
