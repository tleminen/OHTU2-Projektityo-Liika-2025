import { Link, useParams } from "react-router-dom"
import Header from "../header"
import Footer from "../footer"
import Select from "react-select"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import { useEffect, useState } from 'react'
import reservationService from '../../services/reservationService'
import NotificationContainer from '../notification/notificationContainer'
import { selectCategoryName } from '../../assets/icons'
import LocationMap from '../locationMap'

const ModifyFieldView = () => {
    const { id } = useParams()
    const language = useSelector((state) => state.language.language)
    const storedToken = useSelector((state) => state.user?.user?.token ?? null)
    const userID = useSelector((state) => state.user?.user?.userID ?? null)
    const t = translations[language]
    const [loading, setLoading] = useState(true)
    // Perustietojen muokkaus
    const [modifyIsOpen, setModifyIsOpen] = useState(false)
    const [disableModifyField, setDisableModifyField] = useState(true)
    // Kentät
    const [field, setField] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [liikaAvailable, setLiikaAvailable] = useState(true)
    const [link, setLink] = useState("")
    const [hours, setHours] = useState({
        mon: { open: "", close: "", closed: false },
        tue: { open: "", close: "", closed: false },
        wed: { open: "", close: "", closed: false },
        thu: { open: "", close: "", closed: false },
        fri: { open: "", close: "", closed: false },
        sat: { open: "", close: "", closed: false },
        sun: { open: "", close: "", closed: false }
    })
    // Dynaamista renderöintiä varten viikonpäivät. TODO: Tee labeleille kielellistys
    const weekdays = [
        { key: "mon", label: "Monday" },
        { key: "tue", label: "Tuesday" },
        { key: "wed", label: "Wednesday" },
        { key: "thu", label: "Thursday" },
        { key: "fri", label: "Friday" },
        { key: "sat", label: "Saturday" },
        { key: "sun", label: "Sunday" }
    ]

    useEffect(() => {
        const fetchFieldData = async () => {
            try {
                // Haetaan kenttävarausjärjestelmän tiedot
                const response = await reservationService.getField({ // Haetaan kenttävarausjärjestelmän tiedot
                    FieldID: id
                })
                console.log(response)
                setField(response.field)
            } catch (error) {
                console.error(error)
                // TODO: dispatch kun ei löydy varausjärjestelmää
            } finally {
                setLoading(false)
            }
        }
        fetchFieldData()
    }, [id, storedToken, userID])

    const handleSaveChanges = async () => {
        console.log("Tallennetaan muutokset tehtävä")
        const updatedName = name || field.Title
        const updatedDescription = description || field.Description
        const updatedLiikaAvailable = liikaAvailable || field.liikaAvailable
        const updatedLink = link || field.link // Jos kategoria on tyhjä, käytetään oletusarvoa
        const updatedHours = hours || field.Opening_Hours

        /*
        try {
            const response = await reservationService.modifyRS(storedToken, {
                UserID: userID,
                Name: updatedName,
                Description: updatedDescription,
                Liika: updatedLiikaAvailable,
                Link: updatedLink,
                FieldID: id,
            })
            setDescription("")
            setName("")
            setLink("")
        } catch (error) {
            console.error(error)
        }
            */
    }

    const toggleAddNew = () => {
        setModifyIsOpen((prev) => !prev)
        setDisableModifyField(false)
    }

    if (loading) {
        // Tietokantahaku kesken
        return (
            <div
                className="fullpage"
                style={{
                    backgroundImage: "url('/alternativebackgroundpicture.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Header />
                <NotificationContainer />
                <div className="event-view">
                    <p>{t.loading_event}</p>
                </div>
                <Footer />
            </div>
        )
    }

    if (!field) {
        // Jos kenttävarausjärjestelmää ei löytynyt tietokantahaulla
        return (
            <div
                className="fullpage"
                style={{
                    backgroundImage: "url('/alternativebackgroundpicture.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Header />
                <div className="event-view">
                    <p>{"No reservation system found"}</p>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div
            className="fullpage"
            style={{
                backgroundImage: "url('/alternativebackgroundpicture.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header />
            <NotificationContainer />
            <div className='about-container'>
                <div className="system-modify-item">
                    <h1>{"Kentän muokkaus"}</h1>
                    <p>
                        {"Muokkaa blaa blaa..."}
                        <br />
                        {t.exitWithoutSave}
                    </p>
                </div>
                <div className='system-modify-item'>
                    <span className="spacer-line"></span>
                    <button className='link-btn' onClick={toggleAddNew}>
                        {!modifyIsOpen && "Muokkaa kentän perustietoja"}
                        {modifyIsOpen && "Sulje"}
                    </button>
                    <div className={`add-new-panel ${modifyIsOpen ? "open" : ""}`}>
                        <div className='modify-item'>
                            <h2>{"Kentän nimi"}</h2>
                            <h1>{field.Name}</h1>
                            <h2>{"Syötä kentän uusi nimi"}</h2>
                            <input
                                type="text"
                                value={name}
                                placeholder={`Kentän nimi`}
                                className="input-field"
                                onChange={(e) => setName(e.target.value)}
                                required={true}
                            />
                            <em>Kentän nimi, kuten esimerkiksi &quot;Kenttä 1&quot;</em>
                        </div>
                        <span className="spacer-line"></span>
                        <div className='modify-item'>
                            <h2>{"Nykyinen kuvaus"}</h2>
                            <p>{field.Description}</p>
                            <h2>{"Uusi kuvaus"}</h2>
                            <textarea
                                type="text"
                                value={description}
                                placeholder={`...pidetään ympäristö siistinä... ...nelinpelikenttä...`}
                                className="input-field"
                                onChange={(e) => setDescription(e.target.value)}
                                required={true}
                            />
                            <em>Voit kirjoittaa tähän esimerkiksi kenttään liittyviä erityispiirteitä ja käyttöehtoja</em>
                        </div>
                        <span className="spacer-line"></span>
                        <div className='modify-item'>
                            <h2>{"Kentällä saattaa olla Liika-vuoroja"}</h2>
                            <input
                                type="checkbox"
                                checked={liikaAvailable}
                                className="input-field"
                                onChange={(e) => setLiikaAvailable(e.target.value)}
                            />
                            <em>Tämän merkinnän avulla käyttäjät näkevät, että kyseisellä kentällä saattaa olla tarjolla Liika-vuoroja. Merkitseminen ei velvoita järjestämään Liika-vuoroja. Merkki on tarkoitettu helpottamaan käyttäjiä Liika-vuorojen etsimisessä.</em>
                        </div>
                        <span className="spacer-line"></span>
                        <div className='modify-item'>
                            <h2>{"Nykyinen varausjärjestelmäsi linkki"}</h2>
                            {field.URL && <a href={`${field.URL}`} style={{ wordBreak: "break-all" }} target="_blank"
                                rel="noopener">{field.URL}</a> || <em>ei linkkiä</em>}
                            <h2>{"Uusi varausjärjestelmäsi linkki"}</h2>
                            <textarea
                                type="text"
                                value={link}
                                placeholder={`https://...`}
                                className="input-field"
                                onChange={(e) => setLink(e.target.value)}
                                required={true}
                            />
                            <em>Mikäli käytössänne on oma varausjärjestelmä, voit lisätä tähän linkin omaan varausjärjestemäänne.</em><em>Linkistä käyttäjä voi siirtyä tekemään varauksia teidän palveluunne.</em>
                        </div>
                        <span className="spacer-line"></span>
                        <div className='modify-item'>
                            <h2>{"Nykyiset aukioloajat"}</h2>
                            <p>{field.Opening_Hours || "Kenttä on aina auki"}</p>
                            <h2>{"Uudet aukioloajat"}</h2>

                            <div>
                                {weekdays.map(({ key, label }) => (
                                    <div key={key} style={{ marginBottom: "1rem" }}>
                                        <strong>{label}</strong>
                                        <div className='single-weekday'>
                                            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span>Open:</span>
                                                <input
                                                    type="time"
                                                    value={hours[key].open}
                                                    disabled={hours[key].closed}
                                                    onChange={(e) =>
                                                        setHours((prev) => ({
                                                            ...prev,
                                                            [key]: { ...prev[key], open: e.target.value }
                                                        }))
                                                    }
                                                />
                                            </label>
                                            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                                <span>Close:</span>
                                                <input
                                                    type="time"
                                                    value={hours[key].close}
                                                    disabled={hours[key].closed}
                                                    onChange={(e) =>
                                                        setHours((prev) => ({
                                                            ...prev,
                                                            [key]: { ...prev[key], close: e.target.value }
                                                        }))
                                                    }
                                                />
                                            </label>
                                            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                                <input
                                                    type="checkbox"
                                                    checked={hours[key].closed}
                                                    onChange={(e) =>
                                                        setHours((prev) => ({
                                                            ...prev,
                                                            [key]: { ...prev[key], closed: e.target.checked }
                                                        }))
                                                    }
                                                />
                                                Closed
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <em>Kentän normaalit aukioloajat. Voit lisätä poikkeuksia lisäämällä &quot;suljettu&quot; tai &quot;avoinna&quot; vuoroja kalenterissa</em>
                        </div>
                        <span className="spacer-line"></span>
                        <button className='forms-btn' style={{ marginBottom: "40px" }} onClick={handleSaveChanges} disabled={false}>
                            Tallenna muutokset
                        </button>
                    </div>
                    <span className="spacer-line"></span>
                </div>
            </div>
            <Link to={-1} className="back-btn" style={{ alignSelf: "center" }}>
                <span>{t.back}</span>
            </Link>
            <Footer />
        </div >
    )
}

export default ModifyFieldView