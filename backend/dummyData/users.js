const User = require('../models').User;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            { 
                Role: 1, 
                Password:'Salasana123*', 
                Location: Sequelize.fn('ST_GeomFromText', 'POINT(62.6000 29.7639)'),
                Email:'minervalliko@sapo.fi',
                Username:'minall',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                Role :1,
                Password: '#Salasana123',
                Location: Sequelize.fn('ST_GeomFromText', 'POINT(60.1699 24.9384)'),
                Email:'jorijokine@sapo.fi',
                Username: 'Jokine',
                createdAt: new Date(),
                updatedAt: new Date()   
            },
            ]); 
        },
};
   down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null,{});
   };