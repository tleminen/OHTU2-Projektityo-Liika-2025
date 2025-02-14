require('dotenv').config(); // Lataa ympäristömuuttujat

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'outlook', // Vaihda oikeaan sähköpostipalveluun
  auth: {
    user: 'liika2025@outlook.com',
    pass: 'hkrcdcnunlnstnma', // Tai perussalasana, jos käytät sitä

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