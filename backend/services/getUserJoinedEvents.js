const { sequelize } = require("../models")

const getUserJoinedEvents = async (UserID) => {
  try {
    const joinedEvents = await sequelize.query(
      `
      SELECT e.*, t."TimeID", t."StartTime", t."EndTime", COUNT(j."UserID") AS "JoinedCount"
      FROM "Joins" j
      JOIN "Times" t ON j."TimeID" = t."TimeID"
      JOIN "Events" e ON t."EventID" = e."EventID"
      WHERE j."UserID" = :UserID
      GROUP BY e."EventID", t."TimeID"
      ORDER BY t."StartTime" ASC;
      `,
      {
        replacements: { UserID },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    return joinedEvents
  } catch (error) {
    console.error("Virhe haettaessa käyttäjän liittymiä tapahtumia: " + error)
    throw new Error("Internal server error")
  }
}

module.exports = { getUserJoinedEvents }
