const Category = sequelize.define(
  "Category",
  {
    CategoryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Category: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  },
  {
    tableName: "Category",
    timestamps: false,
  }
)

module.exports = { Category }
