const Events = require("../models").Events
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Events", [
      {
        Location: Sequelize.fn("ST_GeomFromtext", "POINT(62.6000 29.7639)"),
        Status: "Basic",
        Title: "Jalkapallo",
        UserID: 1,
        EventID: 1,
        CategoryID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Location: Sequelize.fn("ST_GeomFromText", "Point(60.1699 24.9384)"),
        Status: "Basic",
        Title: "Sulkapallo",
        UserID: 1,
        EventID: 2,
        CategoryID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Location: ("ST_GeomFromText", "POINT(62.6000 29.7599)"),
        Status: "Basic",
        Title: "Tennis",
        UserID: 4,
        EventID: 3,
        CategoryID: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Events", null, {})
  },
}
