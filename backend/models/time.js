const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Events = require("./events")

const Time = sequelize.define("Time", {
  StartTime: { type: DataTypes.DATE, allowNull: false },
  EndTime: { type: DataTypes.DATE, allowNull: false },
})

// Yhteys tapahtumiin
Time.belongsTo(Events, { foreignKey: "EventID" })

module.exports = Time
