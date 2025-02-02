const Club = sequelize.define(
  "Club",
  {
    ClubID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
  },
  {
    tableName: "Club",
    timestamps: false,
  }
)

module.exports = { Club }
