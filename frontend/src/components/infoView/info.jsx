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
          Kartta
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_login", 100)}
          className="smooth-navigate-link"
        >
          Sisäänkirjautuminen
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_register", 100)}
          className="smooth-navigate-link"
        >
          Rekisteröityminen
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_map_usage", 100)}
          className="smooth-navigate-link"
        >
          Kartan käyttö
        </button>
      </div>
      <div>
        <button
          onClick={() => scrollToSection("info_filter", 100)}
          className="smooth-navigate-link"
        >
          Tapahtumien suodatus
        </button>
      </div>
      <br />
      <div>
        <h2>Yleiskatsaus</h2>
        <p>
          Liika.eu on palvelu, joka tuo tapahtumat lähellesi ja antaa
          mahdollisuuden luoda omia tapahtumia. Sivustolla voit kirjautua
          sisään, rekisteröityä uudeksi käyttäjäksi ja selata tapahtumia
          kartalta.
        </p>
        <br />
        <h2>Päätoiminnot</h2>
        <div id="info_map">
          <h3>Kartta</h3>
          <ul>
            <li>Voit selata tulevia tapahtumia Joensuun alueella.</li>
            <li>Tapahtumiin voi ilmoittautua ilman kirjautumista.</li>
            <li>
              Tapahtuman lisätiedot näkyvät kartalla olevan laji-ikonin kautta.
            </li>
            <li>
              Voit siirtyä tapahtuman tietoihin painamalle "Siirry tapahtumaan"
              -painiketta.
            </li>
          </ul>
        </div>
        <h3 id="info_login">Kirjautuminen</h3>
        <ol>
          <li>
            Syötä käyttäjätunnuksesi tai sähköpostiosoitteesi sekä salasana.
          </li>
          <li>Paina "Kirjaudu" ja sinut siirretään etusivulle.</li>
        </ol>

        <h3 id="info_register">Rekisteröityminen</h3>
        <ol>
          <li>
            Syötä sähköpostiosoitteesi, haluamasi käyttäjätunnus ja salasana.
          </li>
          <li>Vahvista salasana kirjoittamalla se uudelleen.</li>
          <li>Valitse tapahtumakartan aloitussijainti.</li>
          <li>Paina "Lähetä" saadaksesi vahvistuskoodin sähköpostiisi.</li>
          <li>Syötä saamasi vahvistuskoodi ja hyväksy käyttöehdot.</li>
          <li>Paina "Rekisteröidy" viimeistelläksesi rekisteröitymisen.</li>
        </ol>
        <br />
        <h2>Etusivu</h2>
        <ul>
          <li>Etusivulta löydät kirjautumisen ja rekisteröitymisen</li>
          <li>
            Voit siirtyä karttanäkymään painamalla etusivulla näkyvää
            karttakuvaa
          </li>
        </ul>
        <br />
        <h2 id="info_map_usage">Kartan käyttö</h2>
        <p>Löydät karttanäkymästä painikkeita kartan reunoilta</p>
        <p>
          Näkymä vaihtelee hieman sen mukaan oletko kirjautunut sisään vai et
        </p>
        <p>Myös yhteistyökumppanin näkymä näyttää hieman erilaiselta</p>
        <br />
        <h4>Sisäänkirjautuneen karttanäkymä</h4>
        <h3>Vasen reuna:</h3>
        <ul>
          <li>Luo uusia tapahtumia.</li>
          <li>Näe tapahtumat, joihin olet ilmoittautunut.</li>
          <li>Näe itse luomasi tapahtumat.</li>
          <li>Muokkaa omia tietojasi.</li>
        </ul>

        <h3>Oikea reuna:</h3>
        <ul>
          <li>Hae sijaintia kartalta.</li>
          <li>
            Vaihda kartan ulkoasua.
            <p>
              <em>Voit muokata omaa kartan ulkoasuasi omista tiedoistasi</em>
            </p>
          </li>
          <li>
            Päivitä kartan tapahtumat.{" "}
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
