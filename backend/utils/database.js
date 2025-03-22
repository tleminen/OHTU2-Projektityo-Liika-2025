const { Sequelize } = require("sequelize")
const { POSTGRESQL_URI, SSL } = require("./config")

var sequelize

if (SSL) {
  sequelize = new Sequelize(POSTGRESQL_URI, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true, // Pakotetaan SSL-yhteys
        rejectUnauthorized: false,
      },
    },
  })
} else {
  sequelize = new Sequelize(POSTGRESQL_URI, {
    dialect: "postgres",
    logging: false,
  })
}

const queryInterface = sequelize.getQueryInterface()

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log(`PosgreSQL-tietokantayhteys luotu!`)

    try {
      await sequelize.query(`
  ALTER TABLE "Users" ALTER COLUMN "MapPreferences" TYPE VARCHAR(160);
`)
    } catch (e) {
      console.warn(e)
    }

    // Luo PostGIS-laajennus, jos sitä ei ole
    // await sequelize.query('CREATE EXTENSION IF NOT EXISTS "postgis";')
    console.log("✅ connectDB suoritettu!")
  } catch (error) {
    console.error(`PostgreSQL-yhteys epäonnistui`, error)
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
