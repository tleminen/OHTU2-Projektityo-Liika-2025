const { Op, fn, col, where } = require("sequelize")
const { Events } = require("../models/Events")
const { sequelize } = require("../models")

// Tapahtumien hakukyselyn luonti
const getEventsNearby = async (latitude, longitude, radius) => {
  try {
    const query = `
      WITH NextOrOngoingTime AS (
          SELECT DISTINCT ON (t."EventID") 
                 t."TimeID", 
                 t."EventID", 
                 t."StartTime", 
                 t."EndTime"
          FROM "Times" t
          WHERE (t."StartTime" <= NOW() AND t."EndTime" >= NOW())
             OR t."StartTime" > NOW()
          ORDER BY t."EventID",
                   (t."StartTime" <= NOW() AND t."EndTime" >= NOW()) DESC,  
                   t."StartTime" ASC
      )
      SELECT 
        e."EventID",
        e."Event_Location",
        e."Status",
        e."Description",
        e."ParticipantMax",
        e."ParticipantMin",
        e."Title",
        e."createdAt",
        e."updatedAt",
        e."UserID",
        e."CategoryID",
        t."TimeID",
        t."StartTime",
        t."EndTime",
        COUNT(j."UserID") AS "JoinedCount"
      FROM "Events" e
      LEFT JOIN NextOrOngoingTime t ON t."EventID" = e."EventID"
      LEFT JOIN "Joins" j ON j."TimeID" = t."TimeID"
      WHERE ST_DWithin(
              e."Event_Location",
              ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
              :radius
            )
      GROUP BY 
        e."EventID",
        e."Event_Location",
        e."Status",
        e."Description",
        e."ParticipantMax",
        e."ParticipantMin",
        e."Title",
        e."createdAt",
        e."updatedAt",
        e."UserID",
        e."CategoryID",
        t."TimeID",
        t."StartTime",
        t."EndTime"
      ORDER BY t."StartTime" ASC;
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
