const { DataTypes } = require("sequelize")
const { sequelize } = require("../utils/database")
const Users = require("./users")
const Events = require("./Events")
const Times = require("./times")

const Joins = sequelize.define(
  "Joins",
  {
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Users,
        key: "UserID",
      },
    },
    EventID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Events,
        key: "EventID",
      },
      onDelete: "CASCADE",
    },
    TimeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Times,
        key: "TimeID",
      },
      onDelete: "CASCADE",
    },
  },
  { timestamps: false }
)

// Määritellään moni-moneen yhteydet
Users.belongsToMany(Events, {
  through: { model: Joins, unique: false },
  foreignKey: "UserID",
})

Events.belongsToMany(Users, {
  through: { model: Joins, unique: false },
  foreignKey: "EventID",
})

Times.hasMany(Joins, { foreignKey: "TimeID" })
Joins.belongsTo(Times, { foreignKey: "TimeID" })

module.exports = Joins
