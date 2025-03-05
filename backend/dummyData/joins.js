const Joins = require("../models").Joins
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.bulkInsert("Joins", [
      {
        TimeID: 10000001,
        UserID: 1000000,
        EventID: 10000001,
      },
      {
        TimeID: 10000003,
        UserID: 1000000,
        EventID: 10000003,
      },
      {
        TimeID: 10000002,
        UserID: 1000004,
        EventID: 10000002,
      },
      {
        TimeID: 10000002,
        UserID: 1000000,
        EventID: 10000002,
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Joins", null, {})
  },
}
