import { useEffect, useState } from 'react'
import reservationService from '../../services/reservationService'
import { useSelector } from 'react-redux'
import translations from '../../assets/translation'

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


    return (
        <div>
            Tähän tulee yksittäisen näkymä
            {SystemID.id}
        </div>
    )
}

export default ReservationSystem