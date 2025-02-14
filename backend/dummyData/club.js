const Clubs = require("../models/club")
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.bulkInsert("Clubs", [
      {
        Name: "Joensuun Pallopojat",
        Email: "joepalpojat@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Joensuun Jalkapalloseura",
        Email: "joejalkpseur@hotmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Helsingin Jääkiekkoseura",
        Email: "heljaaseur@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Helsingin Jalkapalloseura",
        Email: "heljalkpseur@hotmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: "Helsingin Sulkapalloseura",
        Email: "helsulpalseur@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Clubs", null, {})
  },
}
