import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import TouchVisualizer from './touchLogger'
import MapView from '../mapView'

const GenAIView = () => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language]

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
            <MapView />
            <TouchVisualizer isVisible={true} />

        </div>
    )
}

export default GenAIView
