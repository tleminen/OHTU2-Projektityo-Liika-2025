const { Router, request } = require("express")
const ClubMembers = require("../models/clubMember")
const Fields = require("../models/fields")
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

// "Omien" kenttävarausjärjestelmien listaus
reservationRouter.post("/get_list", userExtractor, async (request, response) => {
    const {
        clubs,
        userID
    } = request.body

    if (userID === request.user.dataValues.UserID) {
        // Eli userExtractorin tokenista ekstraktoima userID
        // TODO: Tee tarkastus saako käyttäjä hakea juuri näitä clubeja!
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
}) // Kenttävarausjärjestelmien listaus päättyy

// Yksittäisen kenttävarausjärjestelmän tietojen haku
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
}) // Yksittäisen haku päättyy

// Kenttävarausjärjestelmän päivittäminen
reservationRouter.post("/update_system", userExtractor, async (request, response) => {
    const {
        UserID,
        Title,
        CategoryID,
        Establishment_Location,
        Description,
        Rental,
        PopUpText,
        SystemID,
        ClubID,
    } = request.body

    if (UserID === request.user?.dataValues?.UserID ?? "NAN") {
        // Eli userExtractorin tokenista ekstraktoima userID
        try {
            const result = await ClubMembers.findOne({
                where: {
                    UserID: UserID,
                    ClubID: ClubID,
                },
            })
            if (!result) {
                response.status(403).json({ error: "Not part of the club at request" })
            }
            const newRS = await ReservationSystems.update(
                {
                    Title: Title,
                    CategoryID: CategoryID,
                    PopUpText: PopUpText,
                    Description: Description,
                    Rental: Rental,
                    Establishment_Location: Sequelize.fn(
                        "ST_SetSRID",
                        Sequelize.fn(
                            "ST_MakePoint",
                            Establishment_Location.lng,
                            Establishment_Location.lat
                        ),
                        4326
                    ),
                },
                { where: { SystemID: SystemID } }
            )

            response.status(200).send({ message: "Reservation system updated succesfully." })
        } catch (error) {
            console.error("Error updating reservation system: " + error)
            response.status(500).json({ error: "Internal Server Error" })
        }
    } else {
        console.error("Invalid token")
        response.status(401).json({ error: "Unauthorized" })
    }
}) // Kenttävarausjärjestelmän päivittäminen päättyy

// Kentän lisääminen
reservationRouter.post("/create_field", userExtractor, async (request, response) => {
    const {
        userID,
        Name,
        Description,
        Liika,
        URL,
        SystemID,
        ClubID,
    } = request.body

    if (userID === request.user.dataValues.UserID) {
        // Eli userExtractorin tokenista ekstraktoima userID
        // Tarkastetaan onko oikeus luoda yhteistyökumppanille tapahtumia (eli ei ole feikattu postpyyntö tavallisella käyttäjällä)
        try {
            const system = await ReservationSystems.findOne({ // Varmistetaan ensin clubin liittyminen Järjestelmään
                where: {
                    SystemID: SystemID,
                    ClubID: ClubID,
                },
            })
            console.log(system)
            if (!system) {
                response.status(403).json({ error: "User not part of the System at request" })
            }
            const clubMem = await ClubMembers.findOne({ // Ja varmistetaan, että henkilö kuuluu clubiin
                where: {
                    ClubID: ClubID,
                    UserID: userID
                },
            })
            console.log(clubMem)
            if (!clubMem) {
                response.status(403).json({ error: "User not part of the System at request" })
            }
            const newField = await Fields.create({
                Description: Description,
                Name: Name,
                Liika: Liika,
                URL: URL,
                SystemID: SystemID,
            })
            console.log(newField)
            response.status(201).json({ NewField: newField })
        } catch (e) {
            console.error(e)
            response.status(500).send()
        }
    } else {
        console.error("Invalid token")
        response.status(401).json({ error: "Unauthorized" })
    }
}) // Kenttävarausjärjestelmän luonti päättyy

// "Omien" kenttävarausjärjestelmien listaus
reservationRouter.post("/get_fields", userExtractor, async (request, response) => {
    const {
        SystemID,
        userID
    } = request.body

    if (userID === request.user.dataValues.UserID) {
        // Eli userExtractorin tokenista ekstraktoima userID
        // TODO: Tee tarkastus saako käyttäjä hakea juuri näitä clubeja!
        try {
            const fields = await Fields.findAll({
                where: {
                    SystemID: SystemID
                }
            })
            response.status(200).json(fields)
        } catch (error) {
            console.error("Problems with retreving fields" + error)
            response.status(500).json({ error: "Internal Server Error" })
        }
    } else {
        console.error("Invalid token")
        response.status(401).json({ error: "Unauthorized" })
    }
}) // Kenttävarausjärjestelmien listaus päättyy

// Yksittäisen kentän tietojen haku (haku ei vaadi kirjautumista)
reservationRouter.post("/get_field", async (request, response) => {
    const { FieldID } = request.body
    try {
        const field = await Fields.findOne({
            // Etsitään kenttä
            where: {
                FieldID: FieldID,
            },
            attributes: ["FieldID", "Name", "Description", "Liika", "URL", "Opening_Hours", "SystemID"],
        })
        response.status(200).json({
            field,
        })
    } catch (error) {
        console.log("PostgreSQL Error:", error)
        response.status(400).send({ error: `User not found` })
    }
})

module.exports = reservationRouter
