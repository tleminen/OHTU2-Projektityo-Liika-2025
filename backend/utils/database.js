const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(process.env.POSTGRESQL_URI, {
  dialect: "postgres",
  logging: false,
})

const queryInterface = sequelize.getQueryInterface()

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log(`PosgreSQL-tietokantayhteys luotu!`)
  } catch (error) {
    console.error(`PostgreSQL-yhteys epäonnistu`, error)
  }
}

const initializeDB = async (alustetaan) => {
  await connectDB().then(() => {
    if (alustetaan) {
      sequelize.sync({ alter: true, force: true }).then(() => resetDB())
    }
  })
}

module.exports = { sequelize, connectDB, queryInterface, initializeDB }
