import translations from "../../assets/translation.js"
import { useSelector } from "react-redux"

const PrivacyStatement = () => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language]
    return (
        <div className="text-box">
            <h2> {t.privacy_statement}</h2>
            <div>{"This document is Liika’s registration and data protection statement following the EU General Data Protection Regulation (GDPR). Version 01/2025."}</div>
            <ol>
                <li>
                    Registrar<br />
                    Liika
                </li>
                <li>
                    Registrar contacts<br />
                    <p>Annakaisa Turunen</p>
                    <p><a href="mailto:annaturu@uef.fi">annaturu@uef.fi</a></p>
                    <p>Data Protection Officer</p>
                    <p>Paulus Ollikainen</p>
                    <p><a href="mailto:ollikpau@uef.fi">ollikpau@uef.fi</a></p>
                </li>
                <li>
                    Name of the register
                    <p>Liika-rekisteri</p>
                </li>
                <li>
                    Legal basis and the purpose of processing personal data
                </li>
                <p>
                    According to the EU’s General Data Protection Regulation, the legal basis for processing personal data is:
                </p>
                <ul>
                    <li>
                        Consent of the person (documented, voluntary, individualized, informed and unambigious)
                    </li>
                    <li>
                        An agreement, in which the person registered is a party
                    </li>
                </ul>
                <p>
                    Personal data is processed for several purposes:
                </p>
                <ul>
                    <li>Providing and developing our services</li>
                    <li>User relationship management</li>
                </ul>
                <p>
                    The information is not used for automated decision-making, profiling or selling.
                </p>
                <li>Data content of the register</li>
                <p>The information stored in the register includes:</p>
                <ul>
                    <li>
                        e-mail address
                    </li>
                    <li>
                        the IP address of the network connection
                    </li>
                    <li>
                        the location of a user's event
                    </li>
                </ul>
                <p>
                    IP addresses of website visitors and cookies necessary for the functioning of the service are processed based on legitimate interest, e.g. to take care of information security and for the collection of statistical data of website visitors in those cases when they can be considered as personal data. If necessary, consent is requested separately for third-party cookies.
                </p>
                <li>Regular transfers of data and transfer of data outside the EU or EEA</li>
                <p>Data is not regularly handed over to other parties.</p>
                <p>We store your data primarily in the European Economic Area.</p>
                <li>The principles of registry protection</li>
                <p>The register is handled carefully and the data processed with the help of information systems are properly protected. When registry data is stored on servers, the physical and digital security of the hardware is taken care of appropriately. The register holder ensures that correct measurements are taken to ensure that stored data, server access rights and other are handled confidentially and only by employees who deal with the data.</p>
                <li>The right to inspect and the right to demand correction of information</li>
                <p>Every person in the register has the right to check the data stored in the register and demand the correction of any incorrect information or the completion of incomplete information. If a person wants to check the data stored about them or demand correction the request must be sent in writing to the register holder. If necessary, the register holder can ask the requester to provide their identification. The register holder responds to the correction or inspection request within the time set in the EU Data Protection Regulation (usually within a month)</p>
                <li>Other rights related to the processing of personal data</li>
                <p>A person in the register has the right to request the removal of personal data about him/her from the register (“the right to be forgotten”). Requests must be sent in writing to the register holder. If necessary, the register holder can ask the requester to provide their identification. The register holder responds to the correction or inspection request within the time set in the EU Data Protection Regulation (usually within a month)</p>
            </ol>
        </div >
    )
}

export default PrivacyStatement
