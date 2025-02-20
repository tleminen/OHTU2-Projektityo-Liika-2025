import * as Yup from "yup"
import translations from "../assets/translation"
import { useSelector } from "react-redux"

const language = useSelector((state) => state.language.language)
const t = translations[language]
const loginValidation = Yup.object().shape({
  username: Yup.string()
    .min(5, t.validation_min_username)
    .max(16, t.validation_max_username),
  password: Yup.string()
    .min(8, validation_min_psw).max(32, validation_max_psw)
    .required("Salasana vaaditaan"),
})

const registerValidation = Yup.object().shape({
  username: Yup.string()
    .min(3, "Käyttäjätunnuksen on oltava vähintään 3 merkkiä")
    .required("Käyttäjätunnus vaaditaan"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti vaaditaan"),
  password: Yup.string()
    .min(8, "Salasanan on oltava vähintään 8 merkkiä")
    .required("Salasana vaaditaan"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Salasanat eivät täsmää")
    .required("Vahvista salasana"),
})

// Voit lisätä muita validaatioita tarpeen mukaan...

export { loginValidation, registerValidation }
