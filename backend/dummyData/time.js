const Time = require('../models').Time;
module.exports = {
    up: async (queryInterface, Sequelize) => {
           await queryInterface.bulkInsert('Time', [
            { 
                StartTime: '14:00:00',
                EndTime: '17:00:00',
                EventID: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                StartTime: '12:30:00',
                EndTime: '13:30:00',
                EventID: 2,
                createdAt: new Date(),
                updatedAt: new Date()   
            },
            {
                StartTime: '18:00:00',
                EndTime: '21:00:00',
                EventID: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            ]); 
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Time', null,{});
    }
};