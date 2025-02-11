import "../index.css";
import { useSelector } from "react-redux";
import translations from "../assets/translation.js";
import Select from "react-select";
import { useState } from "react";

const Footer = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="flag-selection">
          {/* Lippuvalintakomponentti tähän */}
          <Lippuvalinta />{" "}
          {/* Oletetaan, että komponentin nimi on Lippuvalinta */}
        </div>
        <div className="footer-text">
          <ul>{t.terms_of_service}</ul> {/* linkki käyttöehtoihin */}
        </div>
        <div className="info">
          {/* Infokomponentti tähän */}
          <Info /> {/* Oletetaan, että komponentin nimi on Info */}
        </div>
      </div>
    </footer>
  );
};

// Esimerkki lippuvalintakomponentista (korvaa omalla toteutuksellasi)
const Lippuvalinta = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "fi", label: "Suomi" },
    { value: "en", label: "Englanti" },
    // TODO: Vaihda hakemaan kielet
  ];

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Valittu kieli: ${selectedOption.value}`);
    // Tässä voitaisiin tehdä toimintoja, jotka liittyvät kielen vaihtamiseen
  };

  return (
    <div>
      <Select
        menuPlacement="top"
        value={selectedOption}
        onChange={handleChange}
        options={options}
      />
    </div>
  );
};

// Esimerkki infokomponentista (korvaa omalla toteutuksellasi)
const Info = () => {
  return (
    <div>
      <info-btn>i</info-btn>
      {/* Tähän inforakenteen logiikka ja ulkoasu */}
    </div>
  );
};

export default Footer;
