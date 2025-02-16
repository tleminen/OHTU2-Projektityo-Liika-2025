const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const middleware = require("./utils/middleware")
const resetDB = require("./dummyData/index")
const { connectDB } = require("./utils/database")
const {
  sequelize,
  Users,
  Categories,
  Times,
  Events,
  Club,
  ClubMember,
  Joins,
  Languages,
} = require("./models/index")
const fs = require("fs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const eventRouter = require("./controllers/events")
const email = require("./services/email")
const logStream = fs.createWriteStream("./logs/access.log", { flags: "a" })
connectDB() // Muodostetaan tietokantayhteys
sequelize.sync({ alter: true }) // Tietokannan synkronointi

// Käynnistetään middlewaret
app.use(cors()) //cros-origin homma
app.use(express.json()) // JSON-body parseri

// Mukautetut tokenit Morganille
morgan.token("ip", (req) => req.ip) // IP-osoite
morgan.token("timestamp", () => new Date().toISOString()) // Aikaleima ISO-muodossa
morgan.token("body", (req) => JSON.stringify(req.body)) // Pyynnön body
morgan.token("user-agent", (req) => req.headers["user-agent"]) // User-Agent

const customFormat = // Mukautettu lokiformaatti terminaaliin
  ':ip [:timestamp] ":method :url" :status - Body: :body - Agent: ":user-agent"'
const customFormat2 = // Mukautettu lokiformaatti tiedostoon
  ':ip [:timestamp] ":method :url" :status - Agent: ":user-agent"'

app.use(
  morgan(customFormat2, {
    stream: logStream,
  })
) // HTTP pyyntöjen logitus
app.use(morgan(customFormat)) // HTTP pyynnöt terminaaliin
app.use(middleware.tokenExtractor) // Ekstraktoi tokenin

// API routerit
app.use(`/api/register`, userRouter)
app.use(`/api/login`, loginRouter)
app.use(`/api/events`, eventRouter)

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus
app.use(middleware.unknownEndpoint)

// End to end testaus:
//resetDB()
module.exports = app
