const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")

const Languages = sequelize.define(
  "Languages",
  {
    LanguageID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Language: { type: DataTypes.STRING(3), allowNull: false },
  },
  { timestamps: false }
)

module.exports = Languages
