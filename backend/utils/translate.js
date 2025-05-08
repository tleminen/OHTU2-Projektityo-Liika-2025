require("dotenv").config()

/**
 * Kääntää merkkijonon englanniksi
 * @param {String} text 
 * @returns tekstin käännettynä
 */
const translateText = async (text) => {
    const response = await globalThis.fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en', {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': `${process.env.TRANSLATION_API_KEY}`,
            'Ocp-Apim-Subscription-Region': `${process.env.TRANSLATION_RESOURCE_REGION}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([{ Text: text }])
    })

    const data = await response.json()
    return data[0].translations[0].text
}

/**
 * Kääntää tekstiä olion sisällä
 * @param {object} texts Syötetekstiolio sisältää avain:arvo pareja
 * @param {String} toLanguage Kieli, jolle käännetään
 * @returns Palauttaa objektin käännettynä
 */
const translateTexts = async (texts, toLanguage) => {
    const response = await globalThis.fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${toLanguage}`, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': `${process.env.TRANSLATION_API_KEY}`,
            'Ocp-Apim-Subscription-Region': `${process.env.TRANSLATION_RESOURCE_REGION}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(texts)
    })
    const data = await response.json()
    return data
}

module.exports = { translateText, translateTexts }