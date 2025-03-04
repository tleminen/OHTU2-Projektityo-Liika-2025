const { Router } = require("express")
const getEventsNearby = require("../services/getEventsNearby")
const {
  getSingleEventWithTimes,
} = require("../services/getSingleEventWithTimes")
const { Categories, Events, Times, Joins, sequelize } = require("../models")
const { Sequelize } = require("sequelize")
const Users = require("../models/users")
const { sendEmail } = require("../services/email")
const {
  getUserJoinedEvents,
  getUserCreatedEvents,
} = require("../services/getUserJoinedEvents")

const eventRouter = Router()

// Hae yksittäinen tapahtuma aikoineen ja osallistujamäärineen
eventRouter.post("/singleEventWithTimes", async (req, res) => {
  const { EventID } = req.body
  try {
    const event = await getSingleEventWithTimes(EventID)
    if (!event) {
      return res.status(404).json({ error: "Eventtiä ei löytynyt" })
    }
    res.json(event)
  } catch (error) {
    console.error("Virhe haettaessa tapahtumaa:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * Hakee tapahtumat alueelta
 * Parametrina leveys- ja pituuspiiri, sekä maksimietäisyys pisteestä
 * Palauttaa tapahtuman tiedot, sekä osallistujamäärän (aktiivinen tai seuraava esiintymä tapahtumasta)
 */
eventRouter.post("/nearby", async (req, res) => {
  const { latitude, longitude, radius } = req.body
  try {
    const events = await getEventsNearby(latitude, longitude, radius)
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: "Jotain meni pieleen" })
  }
}) // Tapahtumahaku päättyy

// Hae kaikki kategoriat
eventRouter.get("/categories", async (req, res) => {
  try {
    const categories = await Categories.findAll()
    res.json(categories)
  } catch (error) {
    console.error("Virhe haettaessa kategorioita:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}) // Kategoriahaku päättyy

// Luo tapahtuma
eventRouter.post("/create_event", async (req, res) => {
  const {
    event_location,
    title,
    userID,
    categoryID,
    participantsMax,
    participantsMin,
    description,
    dates,
    startTime,
    endTime,
  } = req.body
  try {
    // luodaan event
    const event = await Events.create({
      Event_Location: Sequelize.fn(
        "ST_SetSRID",
        Sequelize.fn("ST_MakePoint", event_location.lng, event_location.lat),
        4326
      ),
      Status: "Basic", // Tee erikoistapahtumajuttu joskus
      Title: title,
      UserID: userID,
      CategoryID: categoryID,
      ParticipantMax: participantsMax,
      ParticipantMin: participantsMin,
      Description: description,
    })

    try {
      await Promise.all(
        dates.map(async (timestamp) => {
          const date = new Date(timestamp).toISOString().split("T")[0] // Muuntaa muotoon YYYY-MM-DD

          await Times.create({
            StartTime: `${date} ${startTime}:00.000+2`,
            EndTime: `${date} ${endTime}:00.000+2`,
            EventID: event.EventID,
          })
        })
      )

      res.status(201).send()
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Internal Server Error" })
      try {
        //await Events.destroy({where: })
        console.log("toteuta rollback!!")
      } catch (error) {
        console.error("Problems on rollback, create event: " + error)
        res.status(500).json({ error: "Internal Server Error" })
      }
    }
  } catch (error) {
    console.error(error)
  }
}) // Tapahtuman luonti päättyy

//Tapahtuman luonti kirjautumaton
eventRouter.post("/create_event_unsigned", async (req, res) => {
  const {
    title,
    categoryID,
    date,
    startTime,
    endTime,
    event_location,
    participantsMin,
    participantsMax,
    description,
    email,
  } = req.body

  // Luodaan salasana
  const randomString = (pituus) => {
    const merkit =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/[!"#¤%&/()=?+><_]/'
    return Array.from(
      { length: pituus },
      () => merkit[Math.floor(Math.random() * merkit.length)]
    ).join("")
  }
  const password = randomString(12)

  try {
    const user = await Users.create({
      Username: email,
      Password: password,
      Role: 2,
      Email: email,
      Location: Sequelize.fn("ST_GeomFromText", "POINT(29.7639 62.6000)"),
      LanguageID: "FI",
    })

    try {
      // luodaan event
      const event = await Events.create({
        Event_Location: Sequelize.fn(
          "ST_SetSRID",
          Sequelize.fn("ST_MakePoint", event_location.lng, event_location.lat),
          4326
        ),
        Status: "Basic",
        Title: title,
        UserID: user.UserID,
        CategoryID: categoryID,
        ParticipantMax: participantsMax,
        ParticipantMin: participantsMin,
        Description: description,
      })

      try {
        // Lisätään eventin aika
        const timeResponse = await Times.create({
          StartTime: `${date} ${startTime}:00.000+2`,
          EndTime: `${date} ${endTime}:00.000+2`,
          EventID: event.EventID,
        })
        res.status(201).send
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" })
        try {
          //await Events.destroy({where: })
          console.log("toteuta rollback!!")
        } catch (error) {
          console.error("Problems on rollback, create event: " + error)
          res.status(500).json({ error: "Internal Server Error" })
        }
      }
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    console.log("PostgreSQL Error:", error)
    res.status(400).send({ error: `Error occured during user creation` })
  }
})
//Tapahtuman luonti kirjautumaton päättyy

// Liity tapahtumaan
eventRouter.post("/join_event", async (req, res) => {
  const { UserID, EventID, TimeID } = req.body
  try {
    const response = await Joins.create({
      UserID: UserID,
      EventID: EventID,
      TimeID: TimeID,
    })
    res.status(200).send()
  } catch (error) {
    console.error("Problems when joining event: " + error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Poistu tapahtumasta
eventRouter.post("/leave_event", async (req, res) => {
  const { UserID, EventID, TimeID } = req.body
  try {
    const deletedRows = await Joins.destroy({
      where: {
        UserID: UserID,
        EventID: EventID,
        TimeID: TimeID,
      },
    })
    if (deletedRows > 0) {
      res.status(200).json({ message: "Left event successfully" })
    } else {
      res.status(404).json({ error: "Event not found or already left" })
    }
  } catch (error) {
    console.error("Problems when leaving event: " + error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Hae käyttäjän liitytyt tapahtumat (id:t joinsista)
eventRouter.post("/joined", async (req, res) => {
  const { UserID } = req.body
  try {
    const response = await Joins.findAll({
      where: { UserID: UserID },
    })
    res.status(200).json(response)
  } catch (error) {
    console.error("Problems with retreving joined evets for user: " + error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Hakee käyttäjän liitytyt tapahtumat (data)
eventRouter.post("/userJoinedEvents", async (req, res) => {
  const { UserID } = req.body
  try {
    const events = await getUserJoinedEvents(UserID)
    res.json(events)
  } catch (error) {
    console.error("Problems with retreving joined events with full data")
    res.status(500).json({ error: "Internal Server Error" })
  }
})

eventRouter.post("/userCreatedEvents", async (req, res) => {
  const { UserID } = req.body
  try {
    const events = await getUserCreatedEvents(UserID)
    res.json(events)
  } catch (error) {
    console.error("Problems with retreving joined events with full data")
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Poistetaan yksittäinen aika. (Käyttää cascade-metodia)
eventRouter.post("/delete/time", async (req, res) => {
  const { TimeID } = req.body
  try {
    const deletedRows = await Times.destroy({ where: { TimeID: TimeID } })
    if (deletedRows > 0) {
      res.status(200).json({ message: "Time deleted successfully" })
    } else {
      res
        .status(404)
        .json({ error: "Time for event not found or already deleted" })
    }
  } catch (error) {
    console.error("Problems with deleting time")
  }
})

// Poistetaan koko tapahtuma
eventRouter.post("/delete/event", async (req, res) => {
  const { EventID, TimeID } = req.body
  const transaction = await sequelize.transaction()
  try {
    await Times.destroy({ where: { TimeID: TimeID }, transaction })
    await Events.destroy({ where: { EventID: EventID }, transaction })

    await transaction.commit()
    console.log(`Event ${EventID} and related joins deleted.`)
    res.status(200).json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Problems with deleting event" + error)
    await transaction.rollback()
  }
})

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
eventRouter.post("/sendOtp", async (req, res) => {
  const { email } = req.body

  console.log("email " + email)

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
eventRouter.post("/verifyOtp", async (req, res) => {
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

module.exports = eventRouter
