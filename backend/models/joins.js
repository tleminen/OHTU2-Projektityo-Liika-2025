const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Users = require("./users")
const Events = require("./Events")

const Joins = sequelize.define("Joins", {}, { timestamps: false })

// Moni-moneen yhteys käyttäjien ja tapahtumien välillä
Users.belongsToMany(Events, { through: Joins, foreignKey: "UserID" })
Events.belongsToMany(Users, { through: Joins, foreignKey: "EventID" })

module.exports = Joins
