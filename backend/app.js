const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")

/**
 * Aluksi muodostetaan tietokantayhteys:
 */

//TODO: Muodosta tietokantayhteys

// Käynnistetään middlewaret
app.use(cors()) //cros-origin homma
app.use(express.json)
app.use(
  morgan(
    "\n---morgan\nMetodi\tStatus\tVastausaika \n:method\t:status\t:response-time ms\n-\nPituus\tUrl\n:res[content-length]\t:url\n-\nSisältö: :kontentti\n---morgan\n"
  )
) // HTTP pyyntöjen logitus

//morgan
//middleware.tokenExtractor

// Tähän tulee routerit kuten app.use('api/login', loginRouter)

// Loppuun laitetaan unknownEndpoint ja virheenKorjaus

module.exports = app
