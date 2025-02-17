const Joins = require("../models").Joins
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.bulkInsert("Joins", [
      {
        UserID: 1,
        EventID: 1,
      },
      {
        UserID: 4,
        EventID: 2,
      },
      {
        UserID: 1,
        EventID: 3,
      },
      {
        UserID: 1,
        EventID: 2,
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Joins", null, {})
  },
}
