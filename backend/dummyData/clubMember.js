const { Clubs } = require("../models")
const ClubMembers = require("../models/clubMember")
module.exports = {
  up: async (queryInterface, sequelize) => {
    return queryInterface.bulkInsert("ClubMembers", [
      {
        ClubID: 1,
        UserID: 1000000,
      },
      {
        ClubID: 2,
        UserID: 1000004,
      },
    ])
  },
  down: async (queryInterface, sequelize) => {
    return queryInterface.bulkDelete("ClubMembers", null, {})
  },
}
