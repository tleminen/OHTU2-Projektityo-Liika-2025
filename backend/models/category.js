const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")

const Category = sequelize.define("Category", {
  CategoryID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Category: { type: DataTypes.STRING(32), allowNull: false },
})

module.exports = Category
