import * as Yup from "yup"
import translations from "../assets/translation"
import { useSelector } from "react-redux"

const language = useSelector((state) => state.language.language)
const t = translations[language]
const loginValidation = Yup.object().shape({
  username: Yup.string()
    .min(5, t.validation_min_username)
    .max(16, t.validation_max_username).required(t.validation_username),
  password: Yup.string()
    .min(8, t.validation_min_psw).max(32, t.validation_max_psw)
    .required(t.validation_psw),
})

const registerValidation = Yup.object().shape({
  username: Yup.string()
    .min(3, t.validation_min_username).max(16, t.validation_max_username)
    .required(t.validation_username),
  email: Yup.string()
    .email(t.validation_email_at_sign).min(5, t.validation_min_email).max(40, t.validation_max_email)
    .required(t.validation_email),
  password: Yup.string()
    .min(8, t.validation_min_psw).max(32, t.validation_max_psw)
    .required(t.validation_psw),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Salasanat eivät täsmää")
    .required("Vahvista salasana"),
})

// Voit lisätä muita validaatioita tarpeen mukaan...

export { loginValidation, registerValidation }
