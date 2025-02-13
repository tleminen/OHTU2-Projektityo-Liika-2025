const { Router } = require("express")
const getEventsNearby = require("../services/getEventsNearby")

const eventRouter = Router()

eventRouter.post("/nearby", async (req, res) => {
  const { latitude, longitude, radius } = req.body
  try {
    const events = await getEventsNearby(latitude, longitude, radius)
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: "Jotain meni pieleen" })
  }
})

module.exports = eventRouter
