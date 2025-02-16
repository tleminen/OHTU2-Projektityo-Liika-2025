const Languages = require("../models").Languages
module.exports = {
  up: (queryInterface, sequelize) => {
    return queryInterface.bulkInsert("Languages", [
      {
        Language: "FI",
      },
      {
        Language: "EN",
      },
      {
        Language: "SE",
      },
    ])
  },

  down: (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Languages", null, {})
  },
}
