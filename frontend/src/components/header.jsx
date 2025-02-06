import { useSelector } from 'react-redux'
import { useState } from 'react'
import translations from '../assets/translation'
import logo from '../assets/liika_logo.png'

const Header = () => {
    const language = useSelector((state) => state.language.language)
    const t = translations[language]

    return (
        <div>
        <img src= {logo} alt="Logo" width={300} height={200}/>
        </div>
        )
    
}



    export default Header