const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")

const Club = sequelize.define("Club", {
  ClubID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Name: { type: DataTypes.STRING(80), allowNull: false },
  Email: { type: DataTypes.STRING(40), allowNull: false },
})

module.exports = Club
