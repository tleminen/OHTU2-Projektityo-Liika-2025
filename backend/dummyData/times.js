const Times = require("../models").Times
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.bulkInsert("Times", [
      {
        StartTime: "2025-02-16 14:34:47.191+02",
        EndTime: "2025-02-16 15:34:47.191+02",
        EventID: 1,
      },
      {
        StartTime: "2025-02-16 15:34:47.191+02",
        EndTime: "2025-02-16 16:34:47.191+02",
        EventID: 2,
      },
      {
        StartTime: "2025-02-16 15:35:47.191+02",
        EndTime: "2025-02-16 16:34:47.191+02",
        EventID: 3,
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Times", null, {})
  },
}
