import React from "react"
import translations from "../../assets/translation.js"
import { useSelector } from "react-redux"

const Info = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]
  return (
    <div className="text-box">
      <h2> {t.info}</h2>
      <div>{t.info_txt}</div>
    </div>
  )
}

export default Info
