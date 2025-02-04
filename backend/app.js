const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const middleware = require("./utils/middleware")
const { connectDB, sequelize } = require("./utils/database")

connectDB() // Muodostetaan tietokantayhteys

// Käynnistetään middlewaret
app.use(cors()) //cros-origin homma
app.use(
  morgan(
    "\n---morgan\nMetodi\tStatus\tVastausaika \n:method\t:status\t:response-time ms\n-\nPituus\tUrl\n:res[content-length]\t:url\n---morgan\n"
  )
) // HTTP pyyntöjen logitus, tässä voidaan pyytää

//middleware.tokenExtractor

// Tähän tulee routerit kuten app.use('api/login', loginRouter)

// Testi1, voi poistaa
app.get("/", (request, response) => {
  response.send("<h1>Hello World from backend!</h1>")
}) // Testi1 päättyy

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus
app.use(middleware.unknownEndpoint)

sequelize.sync() // Tietokannan synkronointi

module.exports = app
