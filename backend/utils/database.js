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
  DELETE FROM "ClubMembers";
DELETE FROM "Clubs";
  INSERT INTO "Clubs" ("Name", "Email", "createdAt", "updatedAt")
VALUES ('Liika', 'liikaservice@gmail.com', NOW(), NOW());
INSERT INTO "ClubMembers" ("ClubID", "UserID")
SELECT 
    (SELECT "ClubID" FROM "Clubs" WHERE "Name" = 'Liika' LIMIT 1), 
    (SELECT "UserID" FROM "Users" WHERE "Email" = 'h.illo@hotmail.com' LIMIT 1);
INSERT INTO "ClubMembers" ("ClubID", "UserID")
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
