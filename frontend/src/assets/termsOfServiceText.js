class termsOfServiceText {
    constructor() {
        this.enText = `
          This is the English terms of service text.
          You can write long text here. `;
    
        this.fiText = `
          Tämä on suomenkielinen käyttöehtojen teksti.
          Voit kirjoittaa pitkää tekstiä tähän.`;
      };
    
      getText(language) {
        if (language === 'en') {
          return this.enText;
        } else if (language === 'fi') {
          return this.fiText;
        } else {
          return this.fiText;
        }
      }
}

export default new termsOfServiceText