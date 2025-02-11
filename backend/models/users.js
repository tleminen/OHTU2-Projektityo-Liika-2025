const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Languages = require("./languages")

const Users = sequelize.define("Users", {
  UserID: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Role: { type: DataTypes.INTEGER, allowNull: false },
  Password: { type: DataTypes.STRING(60), allowNull: false }, // HUOMAUTA TÄSTÄ!!
  Location: { type: DataTypes.GEOMETRY, allowNull: true },
  Email: { type: DataTypes.STRING(40), allowNull: false },
  Username: { type: DataTypes.STRING(16), allowNull: false, unique: true },
  LanguageID: {
    type: DataTypes.INTEGER,
    allowNull: true, // Voiko käyttäjällä olla NULL kieli?
    references: { model: Languages, key: "LanguageID" },
  },
})

// Yhteys kieliin (Foreign Key)
Users.belongsTo(Languages, { foreignKey: "LanguageID" })

module.exports = Users
