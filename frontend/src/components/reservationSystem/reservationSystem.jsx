import { useEffect, useState } from 'react'
import reservationService from '../../services/reservationService'
import { useSelector } from 'react-redux'
import translations from '../../assets/translation'
import { selectCategoryName } from '../../assets/icons'

const ReservationSystem = (SystemID) => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language]
    const [loading, setLoading] = useState(true)
    const [system, setSystem] = useState(null)

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
                    system.Fields.map((field) => (
                        <div
                            key={field.FieldID}
                            className="system-item-container"
                        >
                            <div className="event-item">
                                <div>
                                    <h3>{t.title}</h3>
                                    {field.Name}
                                </div>
                            </div>
                            <div className="event-item">

                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ReservationSystem