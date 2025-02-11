const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const middleware = require("./utils/middleware")
const { connectDB, sequelize } = require("./utils/database")
const fs = require("fs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")

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
app.use(morgan(customFormat))
app.use(middleware.tokenExtractor) // Ekstraktoi tokenin

// Tähän tulee routerit kuten app.use('api/login', loginRouter)
//app.use(`/api/login`,)
app.use(`/api/users`, userRouter)
app.use(`/api/login`, loginRouter)

// Testi1, voi poistaa
app.get("/", (request, response) => {
  response.send("<h1>Hello World from backend!</h1>")
}) // Testi1 päättyy

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus
app.use(middleware.unknownEndpoint)

module.exports = app
