const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const middleware = require("./utils/middleware")
const { connectDB, sequelize } = require("./utils/database")
const fs = require("fs")
const userRouter = require("./controllers/users")

const logStream = fs.createWriteStream("./logs/access.log", { flags: "a" })
connectDB() // Muodostetaan tietokantayhteys
sequelize.sync({ alter: true }) // Tietokannan synkronointi

// Käynnistetään middlewaret
app.use(cors()) //cros-origin homma
app.use(express.json()) // JSON-body parseri
app.use(
  morgan("combined", {
    stream: logStream,
  })
) // HTTP pyyntöjen logitus

//middleware.tokenExtractor

// Tähän tulee routerit kuten app.use('api/login', loginRouter)
//app.use(`/api/login`,)
app.use(`/api/users`, userRouter)

// Testi1, voi poistaa
app.get("/", (request, response) => {
  response.send("<h1>Hello World from backend!</h1>")
}) // Testi1 päättyy

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus
app.use(middleware.unknownEndpoint)

module.exports = app
