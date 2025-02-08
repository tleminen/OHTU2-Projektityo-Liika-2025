const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Users = require("./users")
const Club = require("./club")

const ClubMember = sequelize.define("ClubMember", {}, { timestamps: false })

// Moni-moneen yhteys käyttäjien ja kerhojen välillä
Users.belongsToMany(Club, { through: ClubMember, foreignKey: "UserID" })
Club.belongsToMany(Users, { through: ClubMember, foreignKey: "ClubID" })

module.exports = ClubMember
