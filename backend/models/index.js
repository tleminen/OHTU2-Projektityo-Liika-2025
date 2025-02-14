const { sequelize } = require("../utils/database")
const Users = require("./users")
const Category = require("./category")
const Times = require("./time")
const Events = require("./Events")
const Club = require("./club")
const ClubMember = require("./clubMember")
const Joins = require("./joins")
const Languages = require("./languages")

// Määritellään relaatiot
Users.hasMany(Events, { foreignKey: "UserID" })
Events.belongsTo(Users, { foreignKey: "UserID" })

Category.hasMany(Events, { foreignKey: "CategoryID" })
Events.belongsTo(Category, { foreignKey: "CategoryID" })

Events.hasMany(Times, { foreignKey: "EventID" })
Times.belongsTo(Events, { foreignKey: "EventID" })

Users.belongsToMany(Club, { through: ClubMember, foreignKey: "UserID" })
Club.belongsToMany(Users, { through: ClubMember, foreignKey: "ClubID" })

Users.belongsToMany(Events, { through: Joins, foreignKey: "UserID" })
Events.belongsToMany(Users, { through: Joins, foreignKey: "EventID" })

Users.belongsTo(Languages, { foreignKey: "LanguageID" })

// Viedään kaikki mallit kerralla
module.exports = {
  sequelize,
  Users,
  Category,
  Times,
  Events,
  Club,
  ClubMember,
  Joins,
  Languages,
}
