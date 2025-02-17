const { Op, fn, col, where } = require("sequelize")
const { Events } = require("../models/Events")

// Tapahtumien hakukyselyn luonti
const getEventsNearby = async (latitude, longitude, radius) => {
  try {
    const events = await Events.findAll({
      where: where(
        fn(
          "ST_DWithin",
          col("Location"),
          fn("ST_SetSRID", fn("ST_MakePoint", longitude, latitude), 4326),
          radius
        ),
        true
      ),
    })

    return events
  } catch (error) {
    console.error("Virhe haettaessa tapahtumia:", error)
    return []
  }
}

module.exports = getEventsNearby
/*

// Esimerkki: Hae tapahtumat 5 km säteellä koordinaateista (60.1699, 24.9384) (Helsinki)
getEventsNearby(60.1699, 24.9384, 5000).then((events) =>
  console.log(events)
)
*/
