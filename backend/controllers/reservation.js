const { Router } = require("express")
const ClubMembers = require("../models/clubMember")
const ReservationSystems = require("../models/reservationSystems")
const { Sequelize, where, Op } = require("sequelize")
const { userExtractor } = require("../utils/middleware")

const reservationRouter = Router()

/**
 * Kenttävarausjärjestelmän luonti
 */
reservationRouter.post("/create", userExtractor, async (request, response) => {
    const {
        title,
        categoryID,
        popUpText,
        event_location,
        description,
        rentalAvailable,
        userID,
        clubID,
    } = request.body

    if (userID === request.user.dataValues.UserID) {
        // Eli userExtractorin tokenista ekstraktoima userID
        if (clubID) {
            // Tarkastetaan onko oikeus luoda yhteistyökumppanille tapahtumia (eli ei ole feikattu postpyyntö tavallisella käyttäjällä)
            try {
                const result = await ClubMembers.findOne({
                    where: {
                        UserID: userID,
                        ClubID: clubID,
                    },
                })
                if (!result) {
                    response.status(403).json({ error: "Not part of the club at request" })
                } else {
                    const reservationSystem = await ReservationSystems.create({
                        Establishment_Location: Sequelize.fn(
                            "ST_SetSRID",
                            Sequelize.fn(
                                "ST_MakePoint",
                                event_location.lng,
                                event_location.lat
                            ),
                            4326
                        ),
                        Description: description,
                        Title: title,
                        ClubID: clubID,
                        Rental: rentalAvailable,
                        PopUpText: popUpText,
                        CategoryID: categoryID
                    })
                    console.log(reservationSystem)
                    response.status(201).send()
                }
            } catch (e) {
                console.error(e)
                response.status(500).send()
            }
        }
    } else {
        console.error("Invalid token")
        response.status(401).json({ error: "Unauthorized" })
    }
}) // Tietojen haku päättyy

module.exports = reservationRouter
