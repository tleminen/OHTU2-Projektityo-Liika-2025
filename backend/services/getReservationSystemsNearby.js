const { Op, fn, col, where } = require("sequelize")
const { Events } = require("../models/Events")
const { sequelize } = require("../models")

// Tapahtumien hakukyselyn luonti
const getReservationSystemsNearby = async (
  latitude,
  longitude,
  radius,
) => {
  try {
    const query = `
      SELECT 
        rs."SystemID",
        rs."Establishment_Location",
        rs."Description",
        rs."Title",
        rs."ClubID",
        rs."Rental",
        rs."PopUpText",
        rs."CategoryID",
        c."Name" AS "ClubName"
      FROM "ReservationSystems" rs
      LEFT JOIN "Clubs" c ON rs."ClubID" = c."ClubID"
      WHERE ST_DWithin(
              rs."Establishment_Location",
              ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
              :radius
            )
    `

    const events = await sequelize.query(query, {
      replacements: {
        latitude,
        longitude,
        radius,
      },
      type: sequelize.QueryTypes.SELECT,
    })

    return events
  } catch (error) {
    console.error("❌ Virhe haettaessa tapahtumia:", error)
    return []
  }
}


module.exports = { getReservationSystemsNearby, }
