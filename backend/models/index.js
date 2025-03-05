const { sequelize } = require("../utils/database")
const Users = require("./users")
const Categories = require("./categories")
const Times = require("./times")
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

// Lisätään TimeID yhteys Joins-tauluun
Users.belongsToMany(Events, {
  through: { model: Joins, unique: false },
  foreignKey: "UserID",
})

Events.belongsToMany(Users, {
  through: { model: Joins, unique: false },
  foreignKey: "EventID",
})
// Joins- ja Times-taulut yhdistetään TimeID-viittauksella
Joins.belongsTo(Times, { foreignKey: "TimeID" })
Times.hasMany(Joins, { foreignKey: "TimeID" })

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
