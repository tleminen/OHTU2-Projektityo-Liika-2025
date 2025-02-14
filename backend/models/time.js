const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Events = require("./Events")

const Times = sequelize.define("Time", {
  StartTime: { type: DataTypes.DATE, allowNull: false },
  EndTime: { type: DataTypes.DATE, allowNull: false },
})

// Yhteys tapahtumiin
Times.belongsTo(Events, { foreignKey: "EventID" })

module.exports = Times
