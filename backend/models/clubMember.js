const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Users = require("./users")
const Clubs = require("./club")

const ClubMembers = sequelize.define("ClubMembers", {}, { timestamps: false })

// Moni-moneen yhteys käyttäjien ja kerhojen välillä
Users.belongsToMany(Clubs, { through: ClubMembers, foreignKey: "UserID" })
Clubs.belongsToMany(Users, { through: ClubMembers, foreignKey: "ClubID" })

module.exports = ClubMembers
