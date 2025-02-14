const Categories = require("../models/categories")
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.bulkInsert("Categories", [
      {
        CategoryID: 1,
        Category: "Jalkapallo",
      },
      {
        CategoryID: 2,
        Category: "Jääkiekko",
      },
      {
        CategoryID: 3,
        Category: "Sulkapallo",
      },
      {
        CategoryID: 4,
        Category: "Tennis",
      },
      {
        CategoryID: 5,
        Category: "Koripallo",
      },
      {
        CategoryID: 6,
        Category: "Hiihto",
      },
      {
        CategoryID: 7,
        Category: "Luistelu",
      },
      {
        CategoryID: 8,
        Category: "Uinti",
      },
      {
        CategoryID: 9,
        Category: "Kuntosali",
      },
      {
        CategoryID: 10,
        Category: "Yleisurheilu",
      },
      {
        CategoryID: 11,
        Category: "Ratsastus",
      },
      {
        CategoryID: 12,
        Category: "Golf",
      },
      {
        CategoryID: 13,
        Category: "Baletti",
      },
    ])
  },

  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("Categories", null, {})
  },
}
