module.exports = { 
    up: async (queryInterface, Sequelize) => {
        //Fetch User and EventID's
        const users = await queryInterface.sequelize.query(
            'SELECT ID FROM "Users";',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        const events = await queryInterface.sequelize.query(
            'SELECT ID FROM "Events";',
            {type: queryInterface.sequelize.QueryTypes.SELECT}
        );
        return queryInterface.bulkInsert('Joins', [
            {
                UserId: users[0].ID,
                EventId: events[0].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: users[1].ID,
                EventId: events[1].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: users[2].ID,
                ClubId: events[2].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                UserId: users[3].ID,
                ClubId: events[3].ID,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Joins', null,{});
    }
};