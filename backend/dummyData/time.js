const Time = require('../models').Time;
module.exports = {
    up: async (queryInterface, Sequelize) => {
        //Fetch EventID's
        const events = await queryInterface.sequelize.query(
            'SELECT ID FROM Events;',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        await queryInterface.bulkInsert('Time', [
            { 
                StartTime: '14:00:00',
                EndTime: '17:00:00',
                EventID: events[0].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                StartTime: '12:30:00',
                EndTime: '13:30:00',
                EventID: events[1].ID,
                createdAt: new Date(),
                updatedAt: new Date()   
            },
            {
                StartTime: '18:00:00',
                EndTime: '21:00:00',
                EventID: events[2].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            ]); 
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Time', null,{});
    }
};