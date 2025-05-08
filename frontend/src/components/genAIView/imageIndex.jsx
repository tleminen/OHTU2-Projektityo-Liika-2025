import { useSelector } from "react-redux"
import translations from "../../assets/translation"
import ImageDrawing from './ImageDrawing'

const GenAIImageView = () => {
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
            <ImageDrawing />

        </div>
    )
}

export default GenAIImageView
