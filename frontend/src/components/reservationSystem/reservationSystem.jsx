import { useEffect, useRef, useState } from 'react'
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
    // DaypilotNavigaattori
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

    /**
     * Sivupainikkeen painalluksella siirretään kalenterinäkymiä viikolla eteenpäin
     */
    const handleNextWeek = () => {
        if (startDate instanceof DayPilot.Date) {
            console.log(startDate)
            setStartDate(startDate.addDays(7))
        } else {
            setStartDate(startDate.setDate(startDate.getDate() + 7))
            setReload((prev) => !prev)
        }
    }

    /**
     * Sivupainikkeen painalluksella siirretään kalenterinäkymiä viikolla taaksepäin
     */
    const handlePrevWeek = () => {
        if (startDate instanceof DayPilot.Date) {
            console.log(startDate)
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
    const fields = (system) => {
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
                        <button className='field-calendar-navigation-button' onClick={handleNextWeek}>{"⇨"}</button>
                        <button className='field-calendar-navigation-button' onClick={handlePrevWeek}>{"⇦"}</button>
                    </div>
                    <div>
                        {system.Fields.map((field) => (
                            <div
                                key={field.FieldID}
                                className="system-item-container"
                            >
                                <div className="event-item">
                                    <div>
                                        <h3>{t.title}</h3>
                                        {field.Name}
                                    </div>
                                    <DesktopMiniCalendar field={field} startDate={startDate} reload={reload} />
                                </div>
                                <div className="event-item">

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
            <p>{system.Description}</p>
            {system.Rental ? (<div style={{
                display: "flex",
                alignItems: "anchor-center"
            }}>Tarjoamme vuokrausta {<img
                src={`/TEMPok.png`}
                alt="Logo"
                width={100}
                height={100}
                className="event-view-icon"
            />}</div>) : ("")}

            <div className='spacer-line' />
            <h2>Kentät</h2>
            <div className="event-list-items">


                {system.Fields.length === 0 ? (
                    <p>{"Ei näytettäviä kenttiä"}</p>
                ) : (

                    fields(system)
                )}
            </div>
            <em style={{ fontWeight: "lighter" }}>{t.lastUpdated} {" "}
                {parseTimeAndDate(system.updatedAt)[1]}{" "}
                {parseTimeAndDate(system.updatedAt)[0]}
            </em>
        </div>
    )
}

export default ReservationSystem