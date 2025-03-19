const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Languages = require("./languages")

const Users = sequelize.define("Users", {
  UserID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Role: { type: DataTypes.INTEGER, allowNull: false },
  Password: { type: DataTypes.STRING(60), allowNull: false }, // HUOMAUTA TÄSTÄ!!
  Location: { type: DataTypes.GEOMETRY("POINT", 4326), allowNull: true },
  Email: { type: DataTypes.STRING(40), allowNull: false },
  Username: { type: DataTypes.STRING(40), allowNull: false, unique: true },
  LanguageID: {
    type: DataTypes.STRING(3),
    allowNull: true, // Voiko käyttäjällä olla NULL kieli?
    references: { model: Languages, key: "LanguageID" },
  },
  MapZoom: {
    type: DataTypes.INTEGER,
    allowNull: true, // Saa olla null
  },
  MapPreferences: {
    type: DataTypes.STRING(40),
    allowNull: true, // Saa olla null
  },
})

// Yhteys kieliin (Foreign Key)
Users.belongsTo(Languages, { foreignKey: "LanguageID" })

module.exports = Users
