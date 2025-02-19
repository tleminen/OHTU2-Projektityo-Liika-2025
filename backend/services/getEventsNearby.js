const { Op, fn, col, where } = require("sequelize")
const { Events } = require("../models/Events")
const { sequelize } = require("../models")

// Tapahtumien hakukyselyn luonti
const getEventsNearby = async (latitude, longitude, radius) => {
  try {
    const query = `
      SELECT * FROM "Events"
      WHERE ST_DWithin(
        "Event_Location",
        ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
        :radius
      )
    `

    const events = await sequelize.query(query, {
      replacements: { latitude, longitude, radius },
      type: sequelize.QueryTypes.SELECT,
    })

    return events
  } catch (error) {
    console.error("❌ Virhe haettaessa tapahtumia:", error)
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
