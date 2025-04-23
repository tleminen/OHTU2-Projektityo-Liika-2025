import { useEffect, useState } from 'react'
import reservationService from '../../services/reservationService'
import { useSelector } from 'react-redux'
import translations from '../../assets/translation'
import { selectCategoryName } from '../../assets/icons'
import { parseTimeAndDate } from '../../utils/helper'
import DesktopMiniCalendar from '../../utils/dektopMiniCalendar'
import { DayPilot, DayPilotNavigator } from '@daypilot/daypilot-lite-react'

const ReservationSystem = (SystemID) => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language]
    const [loading, setLoading] = useState(true)
    const [system, setSystem] = useState(null)
    const [multiCalendarIsOpen, setMultiCalendarIsOpen] = useState(false)
    const [fieldsIsOpen, setFieldsIsOpen] = useState(false)
    const [openFieldId, setOpenFieldId] = useState(null)
    // DaypilotNavigaattori kalenterikomponenteille
    const date = new Date()
    const [startDate, setStartDate] = useState(date)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchEventInfo = async () => {
            try {
                const systemData = await reservationService.getSingleSystem({
                    SystemID: SystemID.id,
                })
                setSystem(systemData)
                console.log(systemData)
            } catch (error) {
                console.error(error)
                // TODO Notifikaatio ettei onnistunut
                // vähän niinkuin dispatch(addNotification(EventNotFound(t.event_not_found))) mutta kenttävarausjärjestelmää ei löytynyt
            } finally {
                setLoading(false)
            }
        }
        fetchEventInfo()
    }, [SystemID.id])

    // Yksittäisen kentän painallus. Jos painetaan uudelleen nii tulee null.
    const handleFieldClick = (field) => {
        setOpenFieldId((prevId) => (prevId === field.FieldID ? null : field.FieldID))
    }

    const toggleMultiCalendar = () => {
        setMultiCalendarIsOpen((prev) => !prev)
        //setDisableCreateField(false)
    }

    const toggleFields = () => {
        setFieldsIsOpen((prev) => !prev)
        //setDisableCreateField(false)
    }

    // Sivupainikkeen painalluksella siirretään kalenterinäkymiä viikolla eteenpäin
    const handleNextWeek = () => {
        if (startDate instanceof DayPilot.Date) {
            setStartDate(startDate.addDays(7))
        } else {
            setStartDate(startDate.setDate(startDate.getDate() + 7))
            setReload((prev) => !prev)
        }
    }

    // Sivupainikkeen painalluksella siirretään kalenterinäkymiä viikolla taaksepäin
    const handlePrevWeek = () => {
        if (startDate instanceof DayPilot.Date) {
            setStartDate(startDate.addDays(-7))
        } else {
            setStartDate(startDate.setDate(startDate.getDate() - 7))
            setReload((prev) => !prev)
        }
    }

    /**
     * 
     * @param {kenttävarausjärjestelmä} system 
     * @returns Näyttää kenttien varauskalenterit alekkain, navigointi sivupainikkeella tai kalenterilla
     */
    const multiCalendar = (system) => {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "anchor-center" }}>
                <DayPilotNavigator
                    selectMode={"Week"}
                    showMonths={1}
                    skipMonths={1}
                    selectionDay={startDate}
                    weekStarts={1}
                    onTimeRangeSelected={(args) => {
                        setStartDate(args.day)
                        setReload((prev) => !prev)
                    }}
                />
                <div className='field-calendar-container'>
                    <div className='field-calendar-navigation'>
                        <button className='field-calendar-navigation-button' onClick={handleNextWeek}>{<img
                            src="/weekArrowRight.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="event-view-icon"
                        />}</button>
                        <button className='field-calendar-navigation-button' onClick={handlePrevWeek}>{<img
                            src="/weekArrowLeft.png"
                            alt="Logo"
                            width={60}
                            height={60}
                            className="event-view-icon"
                        />}</button>
                    </div>
                    <div>
                        {system.Fields.map((field) => (
                            <div
                                key={field.FieldID}
                                className="system-item-container"
                            >
                                <div className="system-item">
                                    <div>
                                        <h3>{field.Name}</h3>
                                        <p style={{ marginBottom: "10px" }}>{field.Description}</p>
                                    </div>
                                    <DesktopMiniCalendar field={field} startDate={startDate} reload={reload} />
                                </div>
                                <div className="system-item">

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    const fields = (system) => {
        return (
            <div>
                {system.Fields.map((field) => (
                    <div
                        key={field.FieldID}
                        className="system-view-item-container"
                    >
                        <div className="system-view-item" style={{ display: "flex", flexDirection: "column" }}>
                            <h3>{field.Name}</h3>
                            <p style={{ marginBottom: "10px" }}>{field.Description}</p>
                        </div>
                        {openFieldId === field.FieldID && (
                            <button onClick={() => handleFieldClick(field)} className='btn'>
                                Sulje
                            </button>
                        )}
                        {openFieldId === field.FieldID && (
                            <div style={{ display: "flex", alignItems: "anchor-center", flexDirection: "row", gap: "10px" }}>
                                <DayPilotNavigator
                                    selectMode={"Week"}
                                    showMonths={1}
                                    skipMonths={1}
                                    selectionDay={startDate}
                                    weekStarts={1}
                                    onTimeRangeSelected={(args) => {
                                        setStartDate(args.day)
                                        setReload((prev) => !prev)
                                    }}
                                />
                                <DesktopMiniCalendar field={field} reload={reload} startDate={startDate} />
                            </div>
                        )}
                        {openFieldId !== field.FieldID && (
                            <button onClick={() => handleFieldClick(field)} className='btn'>
                                Avaa
                            </button>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    if (loading) {
        // Tietokantahaku kesken
        return (
            <div className="event-view">
                <p>{t.loading_event}</p>
            </div>
        )
    }

    if (!system) {
        // Jos kenttävarausjärjestelmää ei löytynyt tietokantahaulla
        return (

            <div className="event-view">
                <p>{"Kenttävarausjärjestelmän lataus epäonnistui" /*TODO: Kielellistä*/}</p>
            </div>
        )
    }


    return (
        <div className='event-view'>
            <img
                src={`/lajit/${selectCategoryName([
                    system.CategoryID,
                ])}.png`}
                alt="Logo"
                width={100}
                height={100}
                className="event-view-icon"
            />
            <h1>{system.Title}</h1>
            {system.Rental ? (<div style={{
                display: "flex",
                alignItems: "anchor-center"
            }}>Tarjoamme vuokrausta {<img
                src={`/rentalEquipmentAvailable.png`}
                alt="Logo"
                width={100}
                height={100}
                className="event-view-icon"
            />}</div>) : ("")}
            <div className='spacer-line' />
            <h2>Info</h2>
            <p style={{ textAlign: "center", maxWidth: "80%" }}>{system.Description}</p>
            <div className='spacer-line' />
            <h2>Kentät</h2>
            <em style={{ textAlign: "center", maxWidth: "80%" }}>Voit tarkastella yksittäistä kenttää painamalla sitä tai avata kaikkien kenttien kalenterit nähtäville samaan aikaan</em>
            <button className='link-btn' onClick={toggleFields}>
                {!fieldsIsOpen && "Näytä kentät"}
                {fieldsIsOpen && "Piilota kentät"}
            </button>
            <div className={`system-view-field-panel ${fieldsIsOpen ? "open" : ""}`}>
                <div className="event-list-items">
                    {system.Fields.length === 0 ? (
                        <p>{"Ei näytettäviä kenttiä"}</p>
                    ) : (
                        fields(system)
                    )}
                </div>
            </div>
            <button className='link-btn' onClick={toggleMultiCalendar}>
                {!multiCalendarIsOpen && "Avaa kenttien kalenterit"}
                {multiCalendarIsOpen && "Sulje kalenterit"}
            </button>
            <div className={`field-calendar-panel ${multiCalendarIsOpen ? "open" : ""}`}>

                <div className="event-list-items">
                    {system.Fields.length === 0 ? (
                        <p>{"Ei näytettäviä kenttiä"}</p>
                    ) : (
                        multiCalendar(system)
                    )}
                </div>
            </div>
            <em style={{ fontWeight: "lighter" }}>{t.lastUpdated} {" "}
                {parseTimeAndDate(system.updatedAt)[1]}{" "}
                {parseTimeAndDate(system.updatedAt)[0]}
            </em>
        </div>
    )
}

export default ReservationSystem