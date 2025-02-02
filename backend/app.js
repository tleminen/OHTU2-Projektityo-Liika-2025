const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")

/**
 * Aluksi muodostetaan tietokantayhteys:
 */

//TODO: Muodosta tietokantayhteys

// Käynnistetään middlewaret
app.use(cors()) //cros-origin homma
app.use(express.json)
//morgan
//middleware.tokenExtractor

// Tähän tulee routerit kuten app.use('api/login', loginRouter)

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus

module.exports = app
