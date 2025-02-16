const { sequelize } = require("../utils/database")
const Users = require("./users")
const Categories = require("./categories")
const Times = require("./time")
const Events = require("./Events")
const Clubs = require("./club")
const ClubMembers = require("./clubMember")
const Joins = require("./joins")
const Languages = require("./languages")

// Määrittelemällä relaatiot ja viemällä kaikki mallit kerralla, tietokanta rakentuu oikein
Users.hasMany(Events, { foreignKey: "UserID" })
Events.belongsTo(Users, { foreignKey: "UserID" })

Categories.hasMany(Events, { foreignKey: "CategoryID" })
Events.belongsTo(Categories, { foreignKey: "CategoryID" })

Events.hasMany(Times, { foreignKey: "EventID" })
Times.belongsTo(Events, { foreignKey: "EventID" })

Users.belongsToMany(Clubs, { through: ClubMembers, foreignKey: "UserID" })
Clubs.belongsToMany(Users, { through: ClubMembers, foreignKey: "ClubID" })

Users.belongsToMany(Events, { through: Joins, foreignKey: "UserID" })
Events.belongsToMany(Users, { through: Joins, foreignKey: "EventID" })

Users.belongsTo(Languages, { foreignKey: "LanguageID" })

// Viedään kaikki mallit kerralla
module.exports = {
  sequelize,
  Users,
  Categories,
  Times,
  Events,
  Clubs,
  ClubMembers,
  Joins,
  Languages,
}
