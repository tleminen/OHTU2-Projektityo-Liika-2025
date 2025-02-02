const Joins = sequelize.define(
  "Joins",
  {
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "UserID",
      },
      primaryKey: true,
    },
    EventID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Events",
        key: "EventID",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "Joins",
    timestamps: false,
  }
)

Joins.associate = (models) => {
  Joins.belongsTo(models.Users, {
    foreignKey: "UserID",
    as: "user",
  })
  Joins.belongsTo(models.Events, {
    foreignKey: "EventID",
    as: "event",
  })
}

module.exports = { Joins }
