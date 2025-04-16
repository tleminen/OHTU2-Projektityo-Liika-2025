const { Router } = require("express")
const ClubMembers = require("../models/clubMember")
const ReservationSystems = require("../models/reservationSystems")
const { Sequelize, where, Op } = require("sequelize")
const { userExtractor } = require("../utils/middleware")
const { getReservationSystemList } = require('../services/getReservationSystemList')

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
                    response.status(201).json({ SystemID: reservationSystem.dataValues.SystemID })
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
}) // Kenttävarausjärjestelmän luonti päättyy

reservationRouter.post("/get_list", userExtractor, async (request, response) => {
    const {
        clubs,
        userID
    } = request.body

    if (userID === request.user.dataValues.UserID) {
        // Eli userExtractorin tokenista ekstraktoima userID
        try {
            const rsList = await getReservationSystemList(clubs)
            response.status(200).json(rsList)
        } catch (error) {
            console.error("Problems with retreving joined evets for user: " + error)
            response.status(500).json({ error: "Internal Server Error" })
        }
    } else {
        console.error("Invalid token")
        response.status(401).json({ error: "Unauthorized" })
    }
}) // Kenttävarausjärjestelmän luonti päättyy

reservationRouter.post("/get_single", userExtractor, async (request, response) => {
    const {
        SystemID,
        userID
    } = request.body

    if (userID === request.user.dataValues.UserID) {
        // Eli userExtractorin tokenista ekstraktoima userID
        // Tarkastetaan vielä, että oli oikeus muokata
        try {
            const system = await ReservationSystems.findOne({
                where: {
                    SystemID: SystemID
                }
            })
            const result = await ClubMembers.findOne({
                where: {
                    UserID: userID,
                    ClubID: system.dataValues.ClubID,
                },
            })
            if (!result) {
                response.status(403).json({ error: "Not part of the club at request" })
            }
            response.status(200).json(system)
        } catch (error) {
            console.error("Problems with retreving joined evets for user: " + error)
            response.status(500).json({ error: "Internal Server Error" })
        }
    } else {
        console.error("Invalid token")
        response.status(401).json({ error: "Unauthorized" })
    }
}) // Kenttävarausjärjestelmän luonti päättyy

module.exports = reservationRouter
