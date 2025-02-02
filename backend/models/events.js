const Events = sequelize.define(
  "Events",
  {
    EventID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Location: {
      type: DataTypes.GEOMETRY,
      allowNull: false,
    },
    Status: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(1700),
    },
    ParticipantMax: {
      type: DataTypes.INTEGER,
    },
    Title: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    ParticipantMin: {
      type: DataTypes.INTEGER,
    },
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "UserID",
      },
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Category",
        key: "CategoryID",
      },
    },
  },
  {
    tableName: "Events",
    timestamps: false,
  }
)

Events.associate = (models) => {
  Events.belongsTo(models.Users, {
    foreignKey: "UserID",
    as: "user",
  })
  Events.belongsTo(models.Category, {
    foreignKey: "CategoryID",
    as: "category",
  })
}

module.exports = { Events }
