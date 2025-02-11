import "../index.css";
import { useSelector } from "react-redux";
import translations from "../assets/translation.js";
import Select from "react-select";
import { useState } from "react";
import FlagSelection from "./flagSelection.jsx";

const Footer = () => {
  const language = useSelector((state) => state.language.language);
  const t = translations[language];
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="flag-selection">
          {/* Lippuvalintakomponentti tähän */}
          <FlagSelection />{" "}
        </div>
        <div className="footer-text">
        <a href="/termsOfService">{t.terms_of_service}</a> {/* linkki käyttöehtoihin */}
        </div>
        <div className="info">
          {/* Infokomponentti tähän */}
          <Info /> {/* Oletetaan, että komponentin nimi on Info */}
        </div>
      </div>
    </footer>
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
