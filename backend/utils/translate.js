require("dotenv").config()

const translateText = async (text) => {
    const response = await fetch('https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=en', {
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

module.exports = { translateText }