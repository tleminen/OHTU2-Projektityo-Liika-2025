const { Sequelize } = require("sequelize")
const { POSTGRESQL_URI } = require("./config")

const sequelize = new Sequelize(POSTGRESQL_URI, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Pakotetaan SSL-yhteys
      rejectUnauthorized: false,
    },
  },
})

const queryInterface = sequelize.getQueryInterface()

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log(`PosgreSQL-tietokantayhteys luotu!`)

    // Luo PostGIS-laajennus, jos sitä ei ole
    await sequelize.query('CREATE EXTENSION IF NOT EXISTS "postgis";')
    console.log("✅ PostGIS extension created!")
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
