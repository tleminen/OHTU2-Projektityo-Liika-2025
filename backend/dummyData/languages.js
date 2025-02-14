const Language = require('../models').Language;
module.exports = {
    up: (queryInterface, Sequelize) =>{
        return queryInterface.bulkInsert('Language', [
            {
                Language: 'FI',
            },
            {
                Language: 'EN',
            },
            {
                Language: 'SE',
            },
        ]);
    },
    
    down: (queryInterface, Sequelize) =>{
        return queryInterface.bulkDelete('Language', null, {});
    }
};
