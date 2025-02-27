const { Router } = require("express")
const getEventsNearby = require("../services/getEventsNearby")
const { Categories, Events, Times, Joins } = require("../models")
const { Sequelize } = require("sequelize")
const Users = require("../models/users")

const eventRouter = Router()

// Hae yksittäinen tapahtuma
eventRouter.post("/singleEvent", async (req, res) => {
  try {
    const event = await Events.findByPk(req.body.EventID)
    res.json(event)
  } catch (error) {
    console.error("Virhe haettaessa yksittäistä eventtiä: " + error)
    res.status(500).json({ error: "Internal server error" })
  }
})

/**
 * Hakee tapahtumat alueelta
 * Parametrina leveys- ja pituuspiiri, sekä maksimietäisyys pisteestä
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
    date,
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
      // Lisätään eventin aika
      const timeResponse = await Times.create({
        StartTime: `${date} ${startTime}:00.000+2`,
        EndTime: `${date} ${endTime}:00.000+2`,
        EventID: event.EventID,
      })
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
  const { UserID, EventID } = req.body
  try {
    const response = await Joins.create({
      UserID: UserID,
      EventID: EventID,
    })
    res.status(200).send()
  } catch (error) {
    console.error("Problems when joining event: " + error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// Tapahtuman ajan haku
eventRouter.post("/event_times", async (req, res) => {
  const { EventID } = req.body
  try {
    const times = await Times.findAll({
      where: {
        EventID: EventID,
      },
    })
    res.json(times)
  } catch (error) {
    console.error("Problem with fetching event times: " + error)
    res.status(500).json({ error: "Error with times" })
  }
})

// Poistu tapahtumasta
eventRouter.post("/leave_event", async (req, res) => {
  const { UserID, EventID } = req.body
  try {
    const deletedRows = await Joins.destroy({
      where: {
        UserID: UserID,
        EventID: EventID,
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

// Hae liitytyt tapahtumat
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

module.exports = eventRouter
