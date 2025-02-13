const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const middleware = require("./utils/middleware")
const { connectDB } = require("./utils/database")
const {
  sequelize,
  Users,
  Category,
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
const getEventsNearby = require("./services/getEventsNearby")
const email = require('./services/email');
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

// Mukautettu lokiformaatti
const customFormat =
  ':ip [:timestamp] ":method :url" :status - Body: :body - Agent: ":user-agent"'
const customFormat2 =
  ':ip [:timestamp] ":method :url" :status - Agent: ":user-agent"'

app.use(
  morgan(customFormat2, {
    stream: logStream,
  })
) // HTTP pyyntöjen logitus
app.use(morgan(customFormat)) // HTTP pyynnöt terminaaliin
app.use(middleware.tokenExtractor) // Ekstraktoi tokenin

app.use(`/api/register`, userRouter)
app.use(`/api/login`, loginRouter)
app.use(`/api/events`, eventRouter)

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus
app.use(middleware.unknownEndpoint)
// getEventsNearby(60.1699, 24.9384, 5000).then((events) => console.log(events))

module.exports = app
