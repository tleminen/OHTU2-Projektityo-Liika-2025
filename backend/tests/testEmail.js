require('dotenv').config(); // Lataa ympäristömuuttujat

const nodemailer = require('nodemailer');

//TODO: Pitää alkaa käyttämään modernia todennusta (OAuth 2.0)

const transporter = nodemailer.createTransport({
  /*
  service: 'outlook', // Vaihda oikeaan sähköpostipalveluun
  auth: {
    user: 'liika2025@outlook.com',
    pass: 'hkrcdcnunlnstnma', // Tai perussalasana, jos käytät sitä

  },
  */

  service: 'outlook',
    auth: {
        type: 'OAuth2',
        user: 'liika2025@outlook.com', // Sähköpostisi
        clientId: 'YOUR_CLIENT_ID', // Azure AD:sta
        clientSecret: 'YOUR_CLIENT_SECRET', // Azure AD:sta
        refreshToken: 'YOUR_REFRESH_TOKEN', // Hankittu aiemmin
        accessToken: 'YOUR_ACCESS_TOKEN', // Voit hankkia tämän refresh tokenilla
    },
  
});

const mailOptions = {
  from: 'liika2025@outlook.com',
  to: 'hopjippii@gmail.com', // Vaihda vastaanottajan sähköpostiosoitteeseen
  subject: 'Testisähköposti',
  text: 'Tämä on testisähköposti Nodemailerilla.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Virhe sähköpostin lähetyksessä:', error);
  } else {
    console.log('Sähköposti lähetetty: ' + info.response);
  }
});

transporter.set('DEBUG', true);