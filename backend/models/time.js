const Time = sequelize.define(
  "Time",
  {
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    EventID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Events",
        key: "EventID",
      },
    },
  },
  {
    tableName: "Time",
    timestamps: false,
  }
)

Time.associate = (models) => {
  Time.belongsTo(models.Events, {
    foreignKey: "EventID",
    as: "event",
  })
}

module.exports = { Time }
