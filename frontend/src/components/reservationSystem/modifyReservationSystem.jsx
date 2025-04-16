import { Link, useParams } from "react-router-dom"
import Header from "../header"
import Footer from "../footer"
import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import { useEffect, useState } from 'react'
import reservationService from '../../services/reservationService'
import NotificationContainer from '../notification/notificationContainer'

const ModifyReservationSystemView = () => {
    const { id } = useParams()
    const language = useSelector((state) => state.language.language)
    const storedToken = useSelector((state) => state.user?.user?.token ?? null)
    const t = translations[language]
    const [loading, setLoading] = useState(true)
    const [reservationSystem, setReservationSystem] = useState(null)

    useEffect(() => {
        const fetchEventInfo = async () => {
            try {
                const response = await reservationService.getReservationSystem(storedToken, {
                    SystemID: id,
                })
                console.log(response)
                setReservationSystem(response.data)
            } catch (error) {
                console.error(error)
                // TODO: dispatch kun ei löydy varausjärjestelmää
            } finally {
                setLoading(false)
            }
        }
        fetchEventInfo()
    }, [id])

    if (loading) {
        // Tietokantahaku kesken
        return (
            <div
                className="fullpage"
                style={{
                    backgroundImage: "url('/backgroundpicture.jpg')",
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

    if (!reservationSystem) {
        // Jos kenttävarausjärjestelmää ei löytynyt tietokantahaulla
        return (
            <div
                className="fullpage"
                style={{
                    backgroundImage: "url('/backgroundpicture.jpg')",
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
                tähän tulee kenttävarausjärjestelmän muokkaus
            </div>
            <Link to={'/'} className="back-btn" style={{ alignSelf: "center" }}>
                <span>{t.back}</span>
            </Link>
            <Footer />
        </div>
    )
}

export default ModifyReservationSystemView