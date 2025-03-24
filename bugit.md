Bugit

TODO: Jos ei tarvittavia tietoja lataamiseen (redux) niin navigate("/") ja localstorage.clear()

MapView:

-Kirjautumaton:

- css-poikkeamia
- Notifikaatio kirjautumattoman tapahtumaluonnille jos jo rekisteröity! (error)

Yksittäisen tapahtuman näkymä:

- Poista menneiden tapahtumien haku!
- // TODO: Jos mennään suoraan linkillä tapahtumaan niin userEvents ei ole haettu vielä reduxiin!

Oman tapahtuman muokkaus:

- Vanhat tapahtumat listana jossa osallistujamäärä, ei voi enää perua tapahtumaa

Login:

CreateEvent:
Tapahtuman kesto pitäisi olla yli 0min?
Validate tehtävä. Nyt voi luoda tapahtumia miten sattuu

EventView: 
Kun rämppää osallistu/poistu näppäintä jää näkymään, että olisi tapahtumassa vaikka sieltä on poistunut. 
Notifikaatiot eivät lataudu kunnolla, koodi valmis muuten Chatti(enkä mä) ymmärrä mistä ongelma kiikastaa. 

Backend:

Liika ei toimi FireFoxissa
Chatin vastaus:
"Näyttää siltä, että Frontpage-komponentissa on virhe ja että Leaflet-kirjaston resurssit eivät lataudu oikein.
🔍 Mitä virheilmoitukset kertovat?

    "An error occurred in the <Frontpage> component."
        Jokin virhe tapahtui Frontpage-komponentissa. Tämä voi johtua virheellisestä datasta, puuttuvasta riippuvuudesta tai koodausvirheestä.
        Kannattaa lisätä Error Boundary -komponentti sovellukseen virheiden käsittelemiseksi.

    "Source map error: NetworkError when attempting to fetch resource."
        Leafletin ja sen marker cluster -lisäosan tiedostot eivät lataudu.
        Tämä voi johtua verkko-ongelmista, palvelimen estosta, tai CDN-ongelmista."

Kysymyksiä ja muita huomioita:
Järjestäjän nimi, mihin kaikkialle näkyviin?

Yhteistyökumppanien tapahtumat:
Nyt muokkausoikeus vain tapahtuman luoneella. Varmaan jää niin? Hieman monimutkainen toteuttaa muuten.
