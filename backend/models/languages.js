const Languages = sequelize.define(
  "Languages",
  {
    LanguageID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Language: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
  },
  {
    tableName: "Languages",
    timestamps: false,
  }
)

module.exports = { Languages }
