const { Router } = require("express")
const { translateText } = require('../utils/translate')
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
        console.error("Problems with translation: " + error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}) // Käännöksen pyyntö päättyy

module.exports = translationRouter
