const Joins = require('../models').Joins; 
module.exports = { 
    up: async (queryInterface, sequelize) => {
        await queryInterface.bulkInsert('Joins', [
            {
                UserId: 1,
                EventId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 2,
                EventId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 1,
                ClubId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: 1,
                ClubId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },
    down: async (queryInterface, sequelize) => {
        return queryInterface.bulkDelete('Joins', null,{});
    }
};