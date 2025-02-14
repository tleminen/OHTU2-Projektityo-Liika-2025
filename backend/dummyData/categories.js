const Categories = require("../models/categories")
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        Categories: "Jalkapallo",
      },
      {
        Categories: "Jääkiekko",
      },
      {
        Categories: "Sulkapallo",
      },
      {
        Categories: "Tennis",
      },
      {
        Categories: "Koripallo",
      },
      {
        Categories: "Hiihto",
      },
      {
        Categories: "Luistelu",
      },
      {
        Categories: "Uinti",
      },
      {
        Categories: "Kuntosali",
      },
      {
        Categories: "Yleisurheilu",
      },
      {
        Categories: "Ratsastus",
      },
      {
        Categories: "Golf",
      },
      {
        Categories: "Baletti",
      },
    ])
  },

  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {})
  },
}
