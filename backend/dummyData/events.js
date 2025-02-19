const Events = require("../models").Events
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Events", [
      {
        Event_Location: Sequelize.fn(
          "ST_GeomFromtext",
          "POINT(29.7639 62.6000)"
        ),
        Status: "Basic",
        Title: "Jalkapallo",
        UserID: 1,
        EventID: 10000001,
        CategoryID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Event_Location: Sequelize.fn(
          "ST_GeomFromText",
          "Point(24.9384 60.1699)"
        ),
        Status: "Basic",
        Title: "Sulkapallo",
        UserID: 1,
        EventID: 10000002,
        CategoryID: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Event_Location: ("ST_GeomFromText", "POINT(29.7599 62.6000)"),
        Status: "Basic",
        Title: "Tennis",
        UserID: 4,
        EventID: 10000003,
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
