import translations from "../../assets/translation.js"
import { useSelector } from "react-redux"

const Info = () => {
  const language = useSelector((state) => state.language.language)
  const t = translations[language]

  const scrollToSection = (id, offset = 0) => {
    const section = document.getElementById(id)
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="text-box">
      <h1>{t.info}</h1>
      <br />
      <div>
        <button
          onClick={() => scrollToSection("info_map", 100)}
          className="smooth-navigate-link"
        >
          {t.map}
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_login", 100)}
          className="smooth-navigate-link"
        >
          {t.login}
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_register", 100)}
          className="smooth-navigate-link"
        >
          {t.register}
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_map_usage", 100)}
          className="smooth-navigate-link"
        >
          {t.mapUsage}
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_filter", 100)}
          className="smooth-navigate-link"
        >
          {t.eventFiltering}
        </button>
      </div>
      <br />
      <div>
        <h2>{t.overview}</h2>
        <p>
          {t.liikaDescription}
        </p>
        <br />
        <h2>{t.mainFunctions}</h2>
        <div id="info_map">
          <h3>{t.map}</h3>
          <ul>
            <li>{t.browseEvents}</li>
            <li>{t.evenrRegistrationNoLogin}</li>
            <li>
              {t.evenDetailsIcon}
            </li>
            <li>
              {t.eventDetailsButton}
            </li>
          </ul>
        </div>
        <h3 id="info_login">{t.login}</h3>
        <ol>
          <li>
            {t.loginPrompt}
          </li>
          <li>{t.loginButton}</li>
        </ol>

        <h3 id="info_register">{t.login}</h3>
        <ol>
          <li>
            {t.registerPrompt}
          </li>
          <li>{t.confirmPassword}</li>
          <li>{t.selectStartLocation}</li>
          <li>{t.senConfirmationCode}</li>
          <li>{t.enterConfirmationCode}</li>
          <li>{t.completeRegistration}</li>
        </ol>
        <br />
        <h2>{t.homepage}</h2>
        <ul>
          <li>{t.homepageDescription}</li>
          <li>
            {t.goToMapView}
          </li>
        </ul>
        <br />
        <h2 id="info_map_usage">{t.mapUsage}</h2>
        <p>{t.mapButtons}</p>
        <p>
          {t.viewVariation}
        </p>
        <p>{t.partnerViewVariation}</p>
        <br />
        <h4>{t.loggedInMapView}</h4>
        <h3>{t.leftEdge}</h3>
        <ul>
          <li>{t.createEvents}</li>
          <li>{t.registeredEvents}</li>
          <li>{t.createdEvents}</li>
          <li>{t.editProfile}</li>
        </ul>

        <h3>{t.rightEdge}</h3>
        <ul>
          <li>{t.searchLocation}</li>
          <li>
            {t.changeMapAppearance}
            <p>
              <em>{t.editMapAppearance}</em>
            </p>
          </li>
          <li>
            {t.updateMapEvents}{" "}
            <p>
              <em>
                Hakee kartalla näkyvän alueen tapahtumat, kuitenkin vähintään
                10km etäisyydeltä
              </em>
            </p>
          </li>
        </ul>

        <h3>Alareuna:</h3>
        <ul>
          <li id="info_filter">
            Suodata tapahtumia lajin mukaan.
            <p>
              <em>
                Valitse näytettävät kategoriat painamalla niitä. Kaikki
                kategoriat ovat nähtävillä, mikäli yhtään valintaa ei ole tehty
              </em>
            </p>
          </li>
          <li>
            Suodata tapahtumia ajankohdan mukaan.
            <p>
              <em>
                • Voit valita painikkeista ehdotettuja hakuja kuten 7 d. Tällöin
                kartalla näkyvät seuraavan seitsemän päivän tapahtumat
              </em>
            </p>
            <p>
              <em>
                • Voit kalenterin kuvaa painamalla rajata haun tietylle
                ajanjaksolle seuraavasti
              </em>
              <br />
              <em>
                {"\t"}1. Valitse hakualueen alkupäivä
                {"\n\t"}2. Valitse hakualueen loppupäivä
                {"\n\t"}3. Paina "filtteröi"
              </em>
              <br />
              <em>
                • Voit rajata myös tapahtuman kellonajan mukaan kellopainiketta
                painamalla{"\n\t"}Muista myös tällöin painaa "filtteröi"
              </em>
              <br />
              <em>
                • Voit myös yhdistellä hakuasi esimerkiksi seuraavasti:{"\n"}
                Etsi tapahtumat ajalta 25.6.2025-7.7.2025 jotka järjestetään
                kello 10 ja 12 välillä
              </em>
            </p>
          </li>
        </ul>

        <h2>Omien tapahtumien luonti</h2>
        <ol>
          <li>Syötä tapahtuman nimi ja valitse laji.</li>
          <li>
            Valitse tapahtuman ajankohta (päivämäärä, aloitus- ja lopetusaika).
          </li>
          <li>Aseta tapahtuman sijainti kartalta.</li>
          <li>Määritä osallistujamäärä (vähimmäismäärä ja maksimimäärä).</li>
          <li>Kirjoita kuvaus tapahtumasta.</li>
          <li>Paina "Luo tapahtuma" lisätäksesi tapahtuman kartalle.</li>
        </ol>

        <h2>Omat tiedot</h2>
        <ul>
          <li>Voit muokata omia tietojasi ja kartan asetuksia.</li>
          <li>Voit poistaa käyttäjätilisi "Omat tiedot" -osiosta.</li>
        </ul>

        <h2>Yhteystiedot ja lisäasetukset</h2>
        <ul>
          <li>Ota yhteyttä: liikaservice@gmail.com</li>
          <li>Käyttöehdot löytyvät alapalkista.</li>
          <li>Voit vaihtaa kielen vasemman alareunan valikosta.</li>
        </ul>
        <br />
        {t.info_txt}
      </div>
    </div>
  )
}

export default Info
