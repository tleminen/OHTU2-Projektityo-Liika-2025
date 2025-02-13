const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { Router } = require("express")
const User = require("../models/users")
const { sendEmail } = require("../services/email"); // Tuo sendEmail-funktio

const userRouter = Router()

/**
 * Uuden käyttäjän rekisteröinti
 */
userRouter.post("/", async (req, res) => {
  const { username, password, role, email } = req.body
  if (password.length >= 5 && password.length <= 32) {
    // pituusvaatimus v0.1

    const saltRounds = 10
    const passwordhash = await bcrypt.hash(password, saltRounds)

    try {
      const savedUser = await User.create({
        // Uuden käyttäjän rekisteröinti
        Username: username,
        Password: passwordhash,
        Role: role,
        Email: email,
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
      res.status(200).send({ token, username: savedUser.Username })
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

// Reitti salasanan palauttamiseen
userRouter.post('/login/sendEmail', async (req, res) => {
  const { email } = req.body;

  try {
    // Voit tässä vaiheessa tarkistaa, onko käyttäjä olemassa tietokannassa.
    // Esimerkiksi:
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(404).json({ message: 'Sähköpostia ei löydy.' });
    }
    const success = await sendEmail(email, 'Salasanan palautus', 'Linkki salasanan palauttamiseen: [Linkki]');
      if (success) {
        res.status(200).json({ message: 'Sähköposti lähetetty!' });
      } else {
        res.status(500).json({ message: 'Sähköpostin lähetys epäonnistui.' });
      }
  } catch (error) {
    console.error('Virhe:', error);
    res.status(500).json({ message: 'Sähköpostin lähetys epäonnistui.' });
  }
});

module.exports = userRouter
