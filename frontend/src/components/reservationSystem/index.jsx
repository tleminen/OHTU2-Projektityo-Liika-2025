import { useSelector } from 'react-redux'
import translations from '../../assets/translation'
import Header from '../header'
import NotificationContainer from '../notification/notificationContainer'
import Footer from '../footer'

const CreateReservationSystem = () => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language]

    return (
        <div
            className="fullpage"
            style={{
                backgroundImage: "url('/background-logandreg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Header />
            <NotificationContainer />
            <div className="create-event">
            </div>
            <Footer />
        </div>
    )
}

export default CreateReservationSystem