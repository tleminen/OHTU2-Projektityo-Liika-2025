const { up: upCategories, down: downCategories } = require("./categories")
const { up: upClubs, down: downClubs } = require("./club")
const { up: upUsers, down: downUsers } = require("./users")
const { sequelize } = require("../utils/database")
const { queryInterface } = require("../utils/database")

module.exports = resetDB = () => {
  downCategories(queryInterface, sequelize)
  downClubs(queryInterface, sequelize)
  downUsers(queryInterface, sequelize)
  upCategories(queryInterface, sequelize)
  upClubs(queryInterface, sequelize)
  upUsers(queryInterface, sequelize)
}
