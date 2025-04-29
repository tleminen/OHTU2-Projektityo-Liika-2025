const { Router } = require("express")
const { translateText } = require('../utils/translate')
const { userExtractor } = require("../utils/middleware")
const { ReservationSystems, sequelize } = require('../models')

const translationRouter = Router()

/**
 * Käännöksen pyyntö
 */
translationRouter.post("/reservation_system/description", async (req, res) => {
    const {
        SystemID
    } = req.body

    // Eli userExtractorin tokenista ekstraktoima userID
    // Tarkastetaan vielä, että oli oikeus muokata
    try {
        const system = await ReservationSystems.findOne({
            where: {
                SystemID: SystemID.id
            },
            attributes: ["Description"],
        })
        try {
            const traslation = await translateText(system.dataValues.Description)
            res.status(200).json(traslation)
        } catch (e) {
            res.status(500).json({ error: "Internal Server Error" })
        }
    } catch (error) {
        console.error("Problems with translation: ", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}) // Käännöksen pyyntö päättyy

// Hae käännös tekstille
translationRouter.post("/", userExtractor, async (req, res) => {
    const { text, UserID } = req.body
    if (UserID === req.user?.dataValues?.UserID ?? "NAN") {
        try {
            const translateHistory = 10
            if (translateHistory > 2000) {
                res.status(429).json({ error: "Monthly translation limit reached" })
            }
            const traslation = await translateText(text)
            res.status(200).json(traslation)
        } catch (error) {
            console.error("Problems with translation: ", error)
            res.status(500).json({ error: "Internal Server Error" })
        }
    } else {
        console.error("Invalid token")
        res.status(401).json({ error: "Unauthorized" })
    }
})

module.exports = translationRouter
