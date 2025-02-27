Bugit

Kartta:
Leveys ei toimi kunnolla

Tapahtumien luonti:
-Kirjautumaton:
-css-poikkeamia

Tapahtumanäkymä:
// TODO: Jos mennään suoraan linkillä tapahtumaan niin userEvents ei ole haettu vielä reduxiin!

Login:

Muita huomioita:
Laita toimimaan kaikki tokenilla

Azure:
Tomille- Vaihda sprintistä 4 v2 -> v1, sprintistä 5 v3 -> v2 jne..

Kysymyksiä:

1. Miten rakennetaan toistuvat tapahtumat?
   Eventteihin ei voi nykyratkaisussa liittyä kuin kerran.
   Vaihtoehtoja:
   Joins-tauluun timeID?(mahdollisesti yksinkertainen muuten paitsi frontti on sit vaikeampi ehkä)
   Erilliset eventit (mahdollisesti yksinkertainen?)
   Joins nollaantuu kun ohitetaan tapaamiskerta (ei mahdollista liittymistä tuleviin tapahtumiin).

2.
