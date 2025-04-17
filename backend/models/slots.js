const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const ReservationSystems = require('./reservationSystems')
const Fields = require('./fields')

const Slots = sequelize.define("Slots", {
    SlotID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    Type: { type: DataTypes.STRING(32), allowNull: false },
    Text: { type: DataTypes.STRING(200), allowNull: true },
    StartTime: { type: DataTypes.DATE, allowNull: false },
    EndTime: { type: DataTypes.DATE, allowNull: false },

})

// Yhteys käyttäjiin ja kategorioihin
Slots.belongsTo(Fields, { foreignKey: "FieldID" })

module.exports = Slots
