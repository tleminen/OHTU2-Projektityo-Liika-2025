const ClubMember = sequelize.define(
  "ClubMember",
  {
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "UserID",
      },
      primaryKey: true,
    },
    ClubID: {
      type: DataTypes.INTEGER,
      references: {
        model: "Club",
        key: "ClubID",
      },
      primaryKey: true,
    },
  },
  {
    tableName: "ClubMember",
    timestamps: false,
  }
)

ClubMember.associate = (models) => {
  ClubMember.belongsTo(models.Users, {
    foreignKey: "UserID",
    as: "user",
  })
  ClubMember.belongsTo(models.Club, {
    foreignKey: "ClubID",
    as: "club",
  })
}

module.exports = { ClubMember }
