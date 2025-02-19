const Joins = require("../models").Joins
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.bulkInsert("Joins", [
      {
        UserID: 1,
        EventID: 10000001,
      },
      {
        UserID: 4,
        EventID: 10000001,
      },
      {
        UserID: 1,
        EventID: 10000003,
      },
      {
        UserID: 1,
        EventID: 10000002,
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Joins", null, {})
  },
}
