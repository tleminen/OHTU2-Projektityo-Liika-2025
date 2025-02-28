const Times = require("../models").Times
module.exports = {
  up: async (queryInterface, sequelize) => {
    await queryInterface.bulkInsert("Times", [
      {
        TimeID: 10000001,
        StartTime: "2025-02-16 14:34:47.191+02",
        EndTime: "2025-02-16 15:34:47.191+02",
        EventID: 10000001,
      },
      {
        TimeID: 10000002,
        StartTime: "2025-02-16 15:34:47.191+02",
        EndTime: "2025-02-16 16:34:47.191+02",
        EventID: 10000002,
      },
      {
        TimeID: 10000003,
        StartTime: "2025-02-16 15:35:47.191+02",
        EndTime: "2025-02-16 16:34:47.191+02",
        EventID: 10000003,
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Times", null, {})
  },
}
