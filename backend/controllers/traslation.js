const { Router } = require("express")
const { translateTexts } = require('../utils/translate')
const { userExtractor } = require("../utils/middleware")
const { sequelize, Users } = require('../models')
const { where } = require('sequelize')

const translationRouter = Router()


// Hae käännös oliolle
translationRouter.post("/batch", userExtractor, async (req, res) => {
    const { inputObject, toLanguage, UserID } = req.body
    if (UserID === req.user?.dataValues?.UserID ?? "NAN") {
        if (typeof inputObject !== "object" || inputObject === null) {
            return res.status(400).json({ error: "Invalid input object" })
        }
        try {
            const translateHistory = await Users.findOne({
                where: {
                    UserID: UserID
                },
                attributes: ["TranslateTokens"],
            })
            console.log(translateHistory.dataValues.TranslateTokens)
            if (translateHistory.dataValues.TranslateTokens < 2000) {
                return res.status(429).json({ error: "Monthly translation limit reached" })
            }
            // Valmistellaan data
            const keys = Object.keys(inputObject)
            const texts = keys.map(key => ({ Text: inputObject[key] }))

            // Lasketaan merkkimäärä valmiiksi
            const totalCharacters = Object.values(inputObject)
                .reduce((sum, text) => sum + (text?.length || 0), 0)

            const translation = await translateTexts(texts, toLanguage)
            if (translation.error) {
                console.log("translation failed", translation)
                return res.status(500).json({ error: "Translation failed" })
            }
            const translatedObject = {}
            keys.forEach((key, index) => {
                translatedObject[key] = translation[index]?.translations?.[0]?.text || inputObject[key]
            })
            // Päivitetään jäljellä oleva käännösoikeus
            const tokensLeft = translateHistory.dataValues.TranslateTokens - totalCharacters
            const usertoken = await Users.update(
                {
                    TranslateTokens: tokensLeft
                },
                { where: { UserID: UserID } }
            )
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
