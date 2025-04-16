import "./partnerChoises.css"
import { Link } from 'react-router-dom'

const PartnerChoises = () => {

    return (
        <div className='partner-choises-view'>

            <Link to={"/create_club_event"} className="link-btn">
                {"Luo yhteistyökumppanitapahtuma"}
            </Link>
            <Link to={"/create_reservation_system"} className="link-btn">
                {"Luo kenttävarausjärjestelmä"}
            </Link>
        </div>
    )
}

export default PartnerChoises