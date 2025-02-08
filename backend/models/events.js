const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Users = require("./users")
const Category = require("./category")

const Events = sequelize.define("Events", {
  EventID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Location: { type: DataTypes.GEOMETRY, allowNull: false },
  Status: { type: DataTypes.STRING(32), allowNull: false },
  Description: { type: DataTypes.STRING(1700), allowNull: true },
  ParticipantMax: { type: DataTypes.INTEGER, allowNull: true },
  Title: { type: DataTypes.STRING(25), allowNull: false },
  ParticipantMin: { type: DataTypes.INTEGER, allowNull: true },
})

// Yhteys käyttäjiin ja kategorioihin
Events.belongsTo(Users, { foreignKey: "UserID" })
Events.belongsTo(Category, { foreignKey: "CategoryID" })

module.exports = Events
