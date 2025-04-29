const { Router } = require("express")
const { translateText, translateTexts } = require('../utils/translate')
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
            return res.status(200).json(traslation)
        } catch (e) {
            return res.status(500).json({ error: "Internal Server Error" })
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
            const translateHistory = 100
            if (translateHistory > 2000) {
                return res.status(429).json({ error: "Monthly translation limit reached" })
            }
            const traslation = await translateText(text)
            return res.status(200).json(traslation)
        } catch (error) {
            console.error("Problems with translation: ", error)
            return res.status(500).json({ error: "Problems with translation" })
        }
    } else {
        console.error("Invalid token")
        res.status(401).json({ error: "Unauthorized" })
    }
})

// Hae käännös oliolle
translationRouter.post("/batch", userExtractor, async (req, res) => {
    const { inputObject, toLanguage, UserID } = req.body
    if (UserID === req.user?.dataValues?.UserID ?? "NAN") {
        if (typeof inputObject !== "object" || inputObject === null) {
            return res.status(400).json({ error: "Invalid input object" })
        }
        try {
            const translateHistory = 100
            if (translateHistory > 2000) {
                return res.status(429).json({ error: "Monthly translation limit reached" })
            }
            // Valmistellaan data
            const keys = Object.keys(inputObject)
            const texts = keys.map(key => ({ Text: inputObject[key] }))
            const translation = await translateTexts(texts, toLanguage)
            if (translation.error) {
                console.log("translation failed", translation)
                return res.status(500).json({ error: "Translation failed" })
            }
            const translatedObject = {}
            keys.forEach((key, index) => {
                translatedObject[key] = translation[index]?.translations?.[0]?.text || inputObject[key]
            })
            return res.status(200).json(translatedObject)
        } catch (error) {
            console.error("Problems with translation: ", error)
            return res.status(500).json({ error: "Translation failed" })
        }
    } else {
        console.error("Invalid token")
        res.status(401).json({ error: "Unauthorized" })
    }
})


module.exports = translationRouter
